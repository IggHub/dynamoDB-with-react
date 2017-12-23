const randomPinGenerator = function(){
  let pinStr = "";
  for(let i = 0; i < 4; i++){
    const randomNum = Math.floor(Math.random() * 10);
    pinStr += randomNum;
  }
  return pinStr;
}

export default randomPinGenerator;
