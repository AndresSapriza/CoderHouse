import mongoose from 'mongoose';

const Schema  = mongoose.Schema;

const ProductSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	description: {
		type: String,
	},
	code: {
		type: String,
		required: true,
	},
	photo: {
		type: String,
	},
	price: {
		type: Number,
	},
	stock: {
		type: Number,
	},
}, { collection: 'products' });

export default mongoose.model('products', ProductSchema);