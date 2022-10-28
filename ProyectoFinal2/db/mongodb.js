import mongoose from 'mongoose';

async function startDb(){
    // const db = 'mongodb://localhost:27017/ecommerce';
    // const uri = 'mongodb+srv://coderuser:coderpassword@clustercoder.tlelpdp.mongodb.net/ecommerce?retryWrites=true&w=majority';
    const mongoUri = process.env.MONGOURI || 'mongodb://localhost:27017';
    const uri = `${mongoUri}/${process.env.DBNAME}?retryWrites=true&w=majority`
    mongoose.connect(uri,{
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
    .then(() => console.log(" Mongoose is connected"))
	.catch((err) => console.log(err));
}

export default startDb;