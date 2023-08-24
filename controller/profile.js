const handleProfile = (db) =>(req, res) => {
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
}

export default handleProfile;