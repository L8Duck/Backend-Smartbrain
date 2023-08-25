const handleImage = (db) =>(req, res) =>{
    const {id} = req.body;
    db('users').where('id', id)
    .increment('entries', 1)
    .returning('entries')
    .then(user => {
        res.json(user[0].entries);
    })
    .catch(err => res.status(400).json('unable to get entries.'))
}

export default handleImage;
