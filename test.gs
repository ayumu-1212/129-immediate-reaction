function myFunction() {
  // var values = {"one": 1, "two": 2};
  var values = {"one": 1, "two": 2, "three": 3};
  branch(values);
}

function branch(values) {
  // var invalues = {"one": 1, "two": 2};
  var invalues = {"one": 1, "two": 2, "three": 3};
  if("three" in invalues){
    if(invalues["three"] === 3){
      Logger.log(1); 
    };
  }
}