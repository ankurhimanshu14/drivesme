const { USER_FIELDS, USER_MODEL } = require('../../models/users');

module.exports = {
    fetchData: async (req, res, next) => {
        req._newUser = await new USER_MODEL({
            [USER_FIELDS.PHOTO]: req.body.photo,
            [USER_FIELDS.FIRST_NAME]: req.body.firstName,
            [USER_FIELDS.MIDDLE_NAME]: req.body.middleName,
            [USER_FIELDS.LAST_NAME]: req.body.lastName,
            [USER_FIELDS.AGE]: req.body.age,
            [USER_FIELDS.DOB]: req.body.dob,
            [USER_FIELDS.EMAIL]: req.body.email,
            [USER_FIELDS.USERNAME]: req.body.username,
            [USER_FIELDS.PASSWORD]: req.body.password
        });

        console.log(req._newUser);
        next();
    },

    saveToMongo: async(req, res, next) => {
        req._savedUser = await req._newUser.save()
            .then(result => { return { status: 201, data: result, error: null, msg: 'Account created!'}; })
            .catch(error => { return { status: 400, data: null, error: error, msg: 'Account not created!'}; });
        
        next();
    },

    response: (req, res, next) => {
        const { status, data, error, msg } = req._savedUser;

        res.status(status).json({ error, data, msg }).end();
        next();
    }
}