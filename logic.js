
//input: (permutation) array of integers from 1 to permutation.length
//output: Graph instance representing intersections from model of input permutation
var computeIntersectionGraph = function(permutation){
  var intersectionGraph = new Graph(permutation.length);
  for(var i = 0; i < permutation.length; i++){
    for(var j = i + 1; j < permutation.length; j++){
      if(linesIntersect(i, permutation[i], j, permutation[j])){
        intersectionGraph.setSymmetricAdjacency(i,j);
      }
    }
  }
  return intersectionGraph;
}

//a1, a2 are indices in permutation (nodes on top line of model graph)
//b1, b2 are images in permutation of a1 and a2 (nodes on bottom line of model graph)
var linesIntersect = function(a1, b1, a2, b2){
  return (a1 - a2) * (b1 - b2); // iff lines cross, this product will be negative
}

//Matrix representation of graph
//construct from n nodes
function Graph(n){
  var self = this;
  self.matrix = [];
  for(var i = 0; i < n; i++){
    var row = [];
    for(var j = 0; j < n; j++){
      row.push(false)
    }
    self.matrix.push(row);
  }
};

//return true iff i adj to j
Graph.prototype.adjacent = function(i, j){
  return self.matrix[i][j];
};

//keeping code simple at expense of a little memory
//ideally, we only store edge list or trangular matrix
Graph.prototype.setSymmetricAdjacency = function(i,j){
  self.matrix[i][j] = true;
  self.matrix[j][i] = true;
};
