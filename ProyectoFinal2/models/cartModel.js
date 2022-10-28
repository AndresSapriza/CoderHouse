import mongoose from 'mongoose';

const Schema  = mongoose.Schema;

const CartSchema = new Schema({
	timeStamp: {
		type: Date,
		required: true,
		default: Date.now,
	},
	products: {
		type: [mongoose.Schema.Types.ObjectId],
        ref: 'ProductModel'
	}
}, { collection: 'carts' });

export default mongoose.model('carts', CartSchema);