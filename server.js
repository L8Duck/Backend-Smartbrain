import express, { response } from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';

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
    res.json(database.user);
})

app.post('/signin',(req,res) => {
    const {email, password} = req.body;
    db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
        const isValid = bcrypt.compareSync(password, data[0].hash)
        if(isValid){
            db.select('*').from('users')
            .where('email', email)
            .then(user => {
                res.json(user)
            })
            .catch(err => res.status(400).json('unable to get user')) //db get user error
        }
        else {
            res.json('wrong email or password') //wrong password
        }
    })
    .catch(err => res.status(400).json('something went wrong!')) //db get email or hash error
})

app.post('/register',(req,res) => {
    const {name, email, password} = req.body;
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            hash:hash, 
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
             trx('users')
            .returning('*')
            .insert({
                email: loginEmail[0].email,
                name: name,
                joined: new Date()
            }).then(user => {
                res.json(user)
            })
        })
        .then(trx.commit)
        .then(trx.rollback)
        .catch(err => res.status(400).json("unable to register!"))
    })
})

app.get('/profile/:id',(req, res) => {
    const {id} = req.params;
    db('*').from('users').where('id', id)
    .then(user => {
        if(user.length){
            res.json(user);
        }  
        else {
            res.status(400).json('something went wrong ...');
        }
    }).catch(err => {
        res.status(400).json(err);
    })
});

app.put('/image',(req, res) => {
    const {id} = req.body;
    db('users').where('id', id)
    .increment('entries', 1)
    .returning('entries')
    .then(user => {
        res.json(user[0].entries);
    })
    .catch(err => res.status(400).json('unable to get entries.'))
});

app.listen(3001, () =>{
});
