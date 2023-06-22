use std::env;
use aws_sdk_dynamodb::{model::AttributeValue, Client};
use lambda_http::{service_fn, Body, Error, Request, RequestExt, Response, aws_lambda_events::serde_json};
use http::header::{ACCESS_CONTROL_ALLOW_ORIGIN, HeaderValue};
use serde::{Deserialize, Serialize};
use serde_json::json;

#[derive(Debug, Deserialize)]
struct Event {
}

#[derive(Debug, Serialize)]
struct Res {
    message: String,
}

struct LabContent {
    header: String,
    questions: Vec<String>,
    footer: String,
}

struct Lab {
    lab_id: String,
    title: String,
    lab_start_body: String,
    lab_content: LabContent,
    lab_finished_body: String,
}

/// Main function
#[tokio::main]
async fn main() -> Result<(), Error> {
    // Initialize the AWS SDK for Rust
    let config = aws_config::load_from_env().await;
    let table_name = env::var("TABLE_NAME").expect("TABLE_NAME must be set");
    let dynamodb_client = Client::new(&config);

    // Register the Lambda handler
    //
    // We use a closure to pass the `dynamodb_client` and `table_name` as arguments
    // to the handler function.
    lambda_http::run(service_fn(|request: Request| {
        event_handler(&dynamodb_client, &table_name, request)
    }))
    .await?;

    Ok(())
}

fn handle_route_a(_event: Event) -> Result<Res, String>{
    // Route A logic
    // get json data here from table

    let response = Res {
        message: "Route A processed successfully".to_string(),
    };
    Ok(response)
}

/// Lambda function handler
///
/// This function will run for every invoke of the Lambda function.
async fn event_handler(
    client: &Client,
    table_name: &str,
    request: Request,
) -> Result<Response<Body>, Error> {
    // Extract path parameter from request
    let path = request.uri().path();

    match path{
        "/Prod/" => {
            Ok(Response::builder().status(200).body("heartbeat".into())?)
        }
        "/Prod/v1/labs/all" => {
            /* Get the item in the DynamoDB table instead of hardcoding JSON
            let tableItems = client
                .scan()
                .table_name(table_name);
            */
            let json = r#"
                {
                "exercise10": {
                    "title": "Exercise #10: Bacterial Transformations",
                    "labStartBody": "<h2>Learning Objectives</h2>\n\n<p>At the end of the activity, you will be able to:</p>\n\n<ul>\n<li>Understand the theory behind bacterial transformations</li>\n<li>Perform a bacterial transformation using E.coli cells</li>\n</ul>\n\n<h3>Abilities:</h3>\n\n<ul>\n<li>Accurate pipetting</li>\n<li>Performing a bacterial transformation</li>\n</ul>\n\n<h3>Skills:</h3>\n\n<ul>\n<li>Spotting and streaking cells on agar plates</li>\n<li>Determining proper controls and antibiotic selections.</li>\n</ul>",
                    "labContent": {
                    "header": "<h2>Instructions</h2>\n\n<p>For this experiment we will be doing two transformations using the ligation product we produced in Exercise 9. We will be doing another transformation with a plasmid that we know has been successfully been transformed in the past from our samples in the freezer (your positive control).</p>",
                    "questions": [
                        "<p>1. Retrieve the appropriate number of tubes containing competent E. coli cells from the -80°C freezer. Place the tubes in the ice bucket and thaw for 10-15 min.</p>",
                        "<p>2. Turn on your flame before opening the tubes and <strong>ensure the following steps are done in a sterile environment (See exercise 1).</strong></p>",
                        "<p>3. On ice, mix 50µL of competent cells and 2µl of the plasmid DNA. The concentration of plasmid DNA should be in the 20-200 ng/µL range, - mix with pipette</p>",
                        "<p>4. Incubate on ice for 20 minutes</p>",
                        "<p>5. Heat shock at 42˚ for 45 seconds. Return to ice.</p>",
                        "<p>6. Add 1ml of LB media. Under a flame with sterile technique</p>",
                        "<p>7. Move tubes to 37˚ - rolling or shaking it best, but just sitting in a rack is OK. Incubate for 1 hr.</p>",
                        "<p>8. Spin down cells at in a microfuge at top speed for 10-30 seconds.</p>",
                        "<p><strong>Turn on your flame for the next steps</strong></p>",
                        "<p>9. Remove all but ~50µl of the media using a pipette.</p>",
                        "<p>10. Resuspend the cells by pipetting up and down, and plate on LB + selection. (Selection is the antibiotic resistance of your plasmid). To plate the cell suspension, just take it up with a pipette and pipette it into the middle of the plate.</p>",
                        "<p>11. Retrieve a vial of beads and add approximately 6-10 beads to your plate. Make sure all the beads have passed through the sample in the middle of the plate by tilting the plate.</p>",
                        "<p>12. Now shake your plate on the lab bench to ensure that the cell suspension is spread over the plate</p>",
                        "<p>13. Put the plates upside down (agar side up) in the 37°C incubator.</p>",
                        "<p>14. Incubate for 14-18 hours until distinct colonies are clearly visible. Do not overgrow. Selection may be lost over time as the antibiotic starts to break down.</p>"
                    ],
                    "footer": "<p>Note-- if it is your first time conducting a bacterial transformation, do the experiment with a positive and a negative control. The positive and negative controls. The positive control experiment is a transformation with stock DNA plasmid. Your negative control experiment is a mock transformation with water</p>"
                    },
                    "labFinishedBody": "<h2>Lab finished</h2>\n\n<p>Please show this page to your instructor</p>"
                },
                "exercise11": {
                    "title": "Exercise #11: Another Exercise",
                    "labStartBody": "<h2>Learning Objectives</h2>",
                    "labContent": {
                    "header": "<h2>head</h2>",
                    "questions": [
                        "<p>1. Example Question 1</p>"
                    ],
                    "footer": "<p>footer</p>"
                    },
                    "labFinishedBody": "<h2>Lab finished</h2>"
                }
                }
            "#;

            let labs: serde_json::Value = serde_json::from_str(json).unwrap();
            let labs_json = json!(labs).to_string();


            Ok(Response::builder()
                .status(200)
                .header("Content-Type", "application/json")
                .header(ACCESS_CONTROL_ALLOW_ORIGIN, HeaderValue::from_static("*"))
                .body(Body::from(labs_json))
                .unwrap())
        }
        "/Prod/v1/createLab/" => {
            // Send data through body

            let path_parameters = request.path_parameters();
            // Send the computations to other places depending on path


            let id = match path_parameters.first("id") {
                Some(id) => id,
                None => return Ok(Response::builder().status(400).body("id is required".into())?),
            };

            // Extract body from request
            let body = match request.body() {
                Body::Empty => "".to_string(),
                Body::Text(body) => body.clone(),
                Body::Binary(body) => String::from_utf8_lossy(body).to_string(),
            };

            // Put the item in the DynamoDB table
            let res = client
                .put_item()
                .table_name(table_name)
                .item("id", AttributeValue::S(id.to_string()))
                .item("payload", AttributeValue::S(body))
                .send()
                .await;

            // Return a response to the end-user
            match res {
                Ok(_) => Ok(Response::builder().status(200).body("item saved".into())?),
                Err(_) => Ok(Response::builder().status(500).body("internal error".into())?),
            }
        }
        _ => Ok(Response::builder()
            .status(404)
            .body(Body::from("Path not found: ".to_owned() + path))
            .unwrap()),
    }
}


/// Unit tests
///
/// These tests are run using the `cargo test` command.
#[cfg(test)]
mod tests {
    use super::*;
    use aws_sdk_dynamodb::{Client, Config, Credentials, Region};
    use aws_smithy_client::{erase::DynConnector, test_connection::TestConnection};
    use aws_smithy_http::body::SdkBody;
    use std::collections::HashMap;

    // Helper function to create a mock AWS configuration
    async fn get_mock_config(conn: &TestConnection<SdkBody>) -> Config {
        let cfg = aws_config::from_env()
            .region(Region::new("eu-west-1"))
            .http_connector(DynConnector::new(conn.clone()))
            .credentials_provider(Credentials::new(
                "access_key",
                "privatekey",
                None,
                None,
                "dummy",
            ))
            .load()
            .await;

        Config::new(&cfg)
    }

    /// Helper function to generate a sample DynamoDB request
    fn get_request_builder() -> http::request::Builder {
        http::Request::builder()
            .header("content-type", "application/x-amz-json-1.0")
            .uri(http::uri::Uri::from_static(
                "https://dynamodb.eu-west-1.amazonaws.com/",
            ))
    }

    #[tokio::test]
    async fn test_put_item() {
        // Mock DynamoDB client
        //
        // `TestConnection` takes a vector of requests and responses, allowing us to
        // simulate the behaviour of the DynamoDB API endpoint. Since we are only
        // making a single request in this test, we only need to provide a single
        // entry in the vector.
        let conn = TestConnection::new(vec![(
            get_request_builder()
                .header("x-amz-target", "DynamoDB_20120810.PutItem")
                .body(SdkBody::from(
                    r#"{"TableName":"test","Item":{"id":{"S":"1"},"payload":{"S":"test1"}}}"#,
                ))
                .unwrap(),
            http::Response::builder()
                .status(200)
                .body(SdkBody::from(
                    r#"{"Attributes": {"id": {"S": "1"}, "payload": {"S": "test1"}}}"#,
                ))
                .unwrap(),
        )]);
        let client = Client::from_conf(get_mock_config(&conn).await);

        let table_name = "test_table";

        // Mock API Gateway request
        let mut path_parameters = HashMap::new();
        path_parameters.insert("id".to_string(), vec!["1".to_string()]);

        let request = http::Request::builder()
            .method("PUT")
            .uri("/1")
            .body(Body::Text("test1".to_string()))
            .unwrap()
            .with_path_parameters(path_parameters);

        // Send mock request to Lambda handler function
        let response = event_handler(&client, table_name, request)
            .await
            .unwrap();
        
        // Assert that the response is correct
        assert_eq!(response.status(), 200);
        assert_eq!(response.body(), &Body::Text("item saved".to_string()));
    }
}