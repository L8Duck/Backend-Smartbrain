import express, { response } from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import handleRegister from "./controller/register.js";
import handleSignin from './controller/signin.js';
import handleImage from './controller/image.js';
import handleProfile from './controller/profile.js';

const db = knex ({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : '020804',
      database : 'smart-brain'
    }
  });

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req,res)=>{
    res.json('hello');
})

app.post('/signin',handleSignin(db, bcrypt))

app.post('/register',handleRegister(db, bcrypt))

app.get('/profile/:id',handleProfile(db));

app.put('/image',handleImage(db));

app.listen(3001, () =>{
});
