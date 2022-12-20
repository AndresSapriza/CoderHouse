import express from 'express';

const processRouter = express.Router();
// calcular randoms
processRouter.get('/:cant?', (req, res) => {
    const cant = req.params.cant;
    let randomsNum = {};
    console.log(cant);
    for(let i =1; i<=cant; i++){
        let randomNum = between(1,1000);
        if (!randomsNum[randomNum]) randomsNum[randomNum] = 0;
        randomsNum[randomNum] += 1;
    }
    res.send(randomsNum);
	
});

function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min + 1) + min
    )
  }

export default processRouter;
