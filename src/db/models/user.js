import {model, Schema} from 'mongoose';

export const usersSchema = new Schema({
name: {
    type: String,
    required: true
},
email: {
    type: String,
    unique: true,
    required: true},
password: {
    type: String,
    required: true},
createdAt: {
    timestamps: true,
},
updatedAt: {
    timestamps: true,
},
versionKey: false,
});

export const UsersCollection = model('users', usersSchema)
