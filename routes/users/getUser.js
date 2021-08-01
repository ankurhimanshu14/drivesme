const { USER_MODEL } = require('../../models/users');
require('dotenv').config();

module.exports = {

    fetchFromMongo: async (req, res, next) => {

        req._userDetails = await  USER_MODEL.findOne({ 'username': req.params.username })
        .then(result => {
            return { status: 200, error: null, data: [result], msg: 'User Found' }
        })
        .catch(err => {
            return { status: 400, error: err, data: null, msg: 'Error in fetching user' }
        })

        next();
    },

    response: (req, res, next) => {
        const { status, error, data, msg } = req._userDetails;
        res.status(status).json({ error, data, msg }).end();

        next();
    }
}