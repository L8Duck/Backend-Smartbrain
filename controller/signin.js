const handleSignin =(db, bcrypt) => (req, res) => {
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
}

export default handleSignin;