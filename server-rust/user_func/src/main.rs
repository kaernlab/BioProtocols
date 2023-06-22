use lambda_http::{run, service_fn, Body, Error, Request, Response, http};
use serde::Deserialize;
use serde_json::{from_slice};

/// This is the main body for the function.
/// Write your code inside it.
/// There are some code example in the following URLs:
/// - https://github.com/awslabs/aws-lambda-rust-runtime/tree/main/examples
#[derive(Deserialize)]
struct LoginRequest {
    username: String,
    password: String,
}

fn check_login_credentials(username: &str, password: &str) -> bool {
    // Example: Compare the username and password against a database
    // or an authentication service
    username == "user" && password == "pass"
}

async fn handle_login(body: Body) -> Result<Response<Body>, Error> {
    /* Only accepts valid JSON in format
    {
        "username": "example",
        "password": "example"
    }
    */
    let bytes = hyper::body::to_bytes(body).await?;
    let login_request: LoginRequest = from_slice(&bytes)?;

    // Access the username and password fields
    let username = login_request.username;
    let password = login_request.password;

    let valid_creds: bool = check_login_credentials(&username, &password);

    if valid_creds{
        Ok(Response::builder().status(200).body(r#"{"token": "123"}"#.into())?)
    }else{
        Ok(Response::builder().status(400).body("Invalid credentials".into())?)
    }
    
}

async fn handle_test(_request: &Request) -> Result<Response<Body>, Error> {
    Ok(Response::builder().status(200).body("Test Complete".into())?)
}

async fn handle_not_found(_request: &Request, path: &str) -> Result<Response<Body>, Error> {
    Ok(
        Response::builder()
        .status(404)
        .body(("Path not found".to_owned() + path)
        .into())?)
}

async fn router(request: Request) -> Result<Response<Body>, Error> {
    let method = request.method();
    let path = request.uri().path();

    match (method, path) {
        (&http::Method::GET, "/Prod/v1/user/test") => handle_test(&request).await,
        (&http::Method::POST, "/Prod/v1/user/login") => handle_login(request.into_body()).await,
        _ => handle_not_found(&request, &path).await,
    }
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    tracing_subscriber::fmt()
        .with_max_level(tracing::Level::INFO)
        // disable printing the name of the module in every log line.
        .with_target(false)
        // disabling time is handy because CloudWatch will add the ingestion time.
        .without_time()
        .init();

    run(service_fn(router)).await
}
