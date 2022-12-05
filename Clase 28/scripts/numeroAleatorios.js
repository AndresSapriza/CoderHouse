process.on("message", cant => {
    let randomsNum = {};
    console.log(cant);
    for(let i =1; i<=cant; i++){
        let randomNum = between(1,1000);
        if (!randomsNum[randomNum]) randomsNum[randomNum] = 0;
        randomsNum[randomNum] += 1;
    }
    process.send(randomsNum);
    process.exit();
});

function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min + 1) + min
    )
  }