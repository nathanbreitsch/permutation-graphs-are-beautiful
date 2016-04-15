
//input: (permutation) array of integers from 1 to permutation.length
//output: Graph instance representing intersections from model of input permutation
var computeIntersectionGraph = function(permutation){
  var intersectionGraph = new Graph(permutation.length);
  for(var i = 0; i < permutation.length; i++){
    for(var j = i + 1; j < permutation.length; j++){
      if(linesIntersect(i, permutation[i], j, permutation[j])){
        intersectionGraph.setAdjacency(i,j);
      }
    }
  }
  return intersectionGraph;
}

//a1, a2 are indices in permutation (nodes on top line of model graph)
//b1, b2 are images in permutation of a1 and a2 (nodes on bottom line of model graph)
var linesIntersect = function(a1, b1, a2, b2){
  return (a1 - a2) * (b1 - b2) < 0; // iff lines cross, this product will be negative
}

//Matrix representation of graph
//construct from n nodes
function Graph(n){
  var self = this;
  self.nodes = range(n).map(function(d){return {name: d}});
  self.edges = [];
};


function Edge(i, j){
  this.source = i;
  this.target = j;
}


//keeping code simple at expense of a little memory
//ideally, we only store edge list or trangular matrix
Graph.prototype.setAdjacency = function(i,j){
  this.edges.push(new Edge(i,j));
};

Graph.prototype.getNodes = function(){ return this.nodes; }
Graph.prototype.getEdges = function(){ return this.edges; }

var range = function(n){
  var arrayRtn = [];
  for(var i = 0; i < n; i++){
    arrayRtn.push(i);
  }
}
