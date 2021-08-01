const Schema = require('../config/db');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userVal = require('../validators/usersValidator');

const FIELDS = {
    FIRST_NAME: 'firstName',
    MIDDLE_NAME: 'middleName',
    LAST_NAME: 'lastName',
    AGE: 'age',
    DOB: 'dob',
    EMAIL: 'email',
    USERNAME: 'username',
    PASSWORD: 'password',
    CREATED_ON: 'createdOn',
    UPDATED_BY: 'updatedBy',
    UPDATED_ON: 'updatedOn'
};

const SCHEMA = {
    [FIELDS.FIRST_NAME]: {
        type: String,
        required: true,
        validate: {
            validator: userVal.validateNames,
            message: props => `${props.value} is not a valid name string!`
        }
    },
    [FIELDS.MIDDLE_NAME]: {
        type: String,
        validate: {
            validator: userVal.validateNames,
            message: props => `${props.value} is not a valid name string!`
        }
    },
    [FIELDS.LAST_NAME]: {
        type: String,
        required: true,
        validate: {
            validator: userVal.validateNames,
            message: props => `${props.value} is not a valid name string!`
        }
    },
    [FIELDS.AGE]: {
        type: Number,
        required: true,
        min: 18,
        max: 100
    },
    [FIELDS.DOB]: {
        type: Date,
        required: true
    },
    [FIELDS.EMAIL]: {
        type: String,
        required: true,
        unique: true
    },
    [FIELDS.USERNAME]: {
        type: String,
        required: true,
        unique: true
    },
    [FIELDS.PASSWORD]: {
        type: String,
        required: true,
        min: 8
    },
    [FIELDS.CREATED_ON]: {
        type: Date,
        default: Date.now
    },
    [FIELDS.UPDATED_BY]: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    [FIELDS.UPDATED_ON]: {
        type: Date
    }
};

const userSchema = new Schema(SCHEMA);

//Password encryption
userSchema.pre('save', async function(next) {
    await bcrypt.hash(this.password, 10)
    .then(hash => {
        this.password = hash;
        next();
    })
    .catch(err => {
        return next(err);
    })
});

userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret) {
        delete ret._id;
    }
});

module.exports = {
    USER_FIELDS: FIELDS,
    USER_MODEL: mongoose.model('User', userSchema)
};