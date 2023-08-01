import express, { response } from 'express';
import fs from 'fs';

const app = express();
app.use(express.json());
const database ={
    user: [
        {
            id: '123',
            name:'Khoa',
            email:'khoa@gmail.com',
            password:'biscuit',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name:'Than',
            email:'than@gmail.com',
            password:'donut',
            entries: 0,
            joined: new Date()
        }
    ]
}
app.get('/', (req,res)=>{
    res.json(database.user);
})

app.post('/signin',(req,res) => {
    if(req.body.email === database.user[0].email ){
        res.json("success");
    } else res.status(400).json("fail");
})

app.post('/register',(req,res) => {
    const {name, email, password} = req.body;
    database.user.push({
        id: '125',
            name:name,
            email: email,
            password: password,
            entries: 0,
            joined: new Date()
    });
    res.json(database.user[database.user.length-1]);
})

app.listen(3000, () =>{
});
/*
    /signin --> POST: success/fail
    /register --> POST: user
    /profile/userID --> GET = user => rank
    /image --> PUT = user

*/