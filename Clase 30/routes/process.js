import express from 'express';
import {fork} from 'child_process';

const processRouter = express.Router();
// calcular randoms
processRouter.get('/:cant?', (req, res) => {
	const numAleatorio = fork('./scripts/numeroAleatorios');
    if (!req.params.cant) req.params.cant = 100000000;
    numAleatorio.send(req.params.cant);
    numAleatorio.on("message", result => {
        console.log(result);
        res.send(result);
    });
});

export default processRouter;
