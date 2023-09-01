import express, { response } from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import handleRegister from "./controller/register.js";
import handleSignin from './controller/signin.js';
import handleImage from './controller/image.js';
import handleApi from './controller/API.js';
import handleProfile from './controller/profile.js';
import dotenv from "dotenv";

dotenv.config();
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
const db = knex ({
    client: 'pg',
    connection: {
      host: process.env.DATABASE_URL,
      ssl: {rejectUnauthorized: false},
      port: 5432,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PW,
      database: process.env.DATABASE_DB
    }
  });

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

app.get('/', (req,res)=>{
    res.json('hello');
})

app.post('/signin',handleSignin(db, bcrypt))

app.post('/register',handleRegister(db, bcrypt))

app.get('/profile/:id',handleProfile(db));

app.put('/image',handleImage(db));

app.post('/api',handleApi());

app.listen(PORT, () =>{
  console.log(`app is running on port ${PORT}`)
});
