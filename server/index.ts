import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { Credentials } from './src/utils/interfaces';
const cors = require('cors');

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server is running');
});

app.use('/login', (req, res) => {
  const creds: Credentials = {
    username: req.body.username,
    password: req.body.password
  }

  console.log("Credentials ", creds)
  
  if (creds.username === "user" && creds.password === "pass" ){
    res.send({
      token: 'test123'
    });
  }else{
    res
      .status(400)
      .json({ error: "Invalid username or password." })
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
