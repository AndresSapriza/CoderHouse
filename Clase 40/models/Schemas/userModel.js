import mongoose from 'mongoose';
import { validateEmail, validatePhoneNumber } from '../../services/utils/validation.js';

const Schema  = mongoose.Schema;

const UserSchema = new Schema({
	name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        validate: [validatePhoneNumber, `Invalid phone number`]
    },
    avatar: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: [validateEmail, `Invalid email address.`]
    },
    password: {
        type: String,
        required: true
    }
}, { collection: 'users' });

export default mongoose.model('users', UserSchema);