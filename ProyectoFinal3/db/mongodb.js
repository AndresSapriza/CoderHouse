import mongoose from 'mongoose';

async function startDb(){
    const mongoUri = process.env.MONGOURI || 'mongodb://localhost:27017';
    const uri = `${mongoUri}/${process.env.DBNAME}?retryWrites=true&w=majority`;
    mongoose.connect(uri,{
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
    .then(() => {console.log(" Mongoose is connected"); return uri;})
	.catch((err) => console.log(err));
}

export default startDb;