const express = require('express');

const app = express();

const port = process.env.PORT || 8080;


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
	res.send('Hello world');
});


app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});