import express from 'express';
import fs from 'fs';

const app = express();

app.get('/', (req,res)=>{
    res.send('success at root');
})

app.listen(3000, () =>{
});