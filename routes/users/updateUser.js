const { USER_MODEL } = require('../../models/users');
require('dotenv').config();

module.exports = {

    updateInMongo: async (req, res, next) => {

        const filter = { username: req.params.username };
        const update = req.body;

        req._userDetails = await USER_MODEL.findOneAndUpdate(filter, update, {
            new: true,
            rawResult: true
          })
        .then(result => {
            return { status: 200, error: null, data: result, msg: 'User Updated' }
        })
        .catch(err => {
            return { status: 400, error: err, data: null, msg: 'Error in updating user' }
        })

        next();
    },

    response: (req, res, next) => {
        const { status, error, data, msg } = req._userDetails;
        if (status === 400) {
            res.status(status).json(msg).end();
        } else {
            console.log(data)
            res.redirect(200, `/${data.value.username}`);
        }

        next();
    }
}