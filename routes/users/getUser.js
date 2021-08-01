const { USER_MODEL } = require('../../models/users');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const staticFilesPath = path.join(__dirname, '../static/');

module.exports = {

    fetchFromMongo: async (req, res, next) => {

        req._userDetails = await  USER_MODEL.findOne({ 'username': req.params.username })
        .then(result => {
            return { status: 200, error: null, data: result, msg: 'User Found' }
        })
        .catch(err => {
            return { status: 400, error: err, data: null, msg: 'Error in fetching user' }
        })

        next();
    },

    downloadPhoto: (req, res, next) => {
        console.log(req._userDetails);

        const _imagePath = staticFilesPath + `${req._userDetails.data._id}.jpg`;

        req._image = fs.readFileSync(_imagePath, { 'Content-Type': 'image/jpg' });
        
        next();
    },

    response: (req, res, next) => {
        const { status, error, data, msg } = req._userDetails;
        const image = req._image;

        res.status(status).json({ error, data, msg, image }).end();

        next();
    }
}