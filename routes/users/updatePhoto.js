const { USER_MODEL } = require('../../models/users');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const staticFilesPath = path.join(__dirname, '../static/');

module.exports = {

    deleteOldImage: async (req, res, next) => {

        const filter = { username: req.params.username };

        req._userDetails = await USER_MODEL.findOne(filter, update, {
            new: true,
            rawResult: true
          })
        .then(result => {
            return { status: 200, error: null, data: result, msg: 'User Updated' }
        })
        .catch(err => {
            return { status: 400, error: err, data: null, msg: 'Error in updating user' }
        })

        req._userId = req._userDetails.data._id;

        try {
            fs.unlinkSync(staticFilesPath + `${req._userId}.jpg`)
            console.log("Image deleted");
            next();
        }
        catch(err) {
            throw err
        }
    },

    uploadNewImage: (req, res, next) => {

        const photoPath = req.body.photo;

        const newFilePath = staticFilesPath + `${userId}.jpg`;

        try {
            fs.copyFileSync(photoPath, newFilePath)
            console.log("File Uploaded")
        }
        catch(err) {
            throw err
        }

        next();
    }
}