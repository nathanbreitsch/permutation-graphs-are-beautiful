module.exports = {};

module.exports.parse = function(str){

  try{
    permArray = str.split(',').map(function(s){
      return parseInt(s.trim().strip());
    });
  }
  catch(e){
    return "there was a problem parsing your permutation";
  }

  if(checkValidPermutation(permArray)){
    return permArray;
  }
  else{
    return "your permutation does not include all numbers from 1 to " + permArray.length;
  }

};

var checkValidPermutation = function(permArray){
  for(var i = 1; i <= permArray.length; i++){
    if(permArray.indexOf(i) == -1){ return false; }
  }
  return true;
};
