var TRANSITION_TIME = 750;

var palette = d3.scale.category20();

var range = function(n){
  var points = [];
  for(var i = 0; i < n; i++){
    points.push(i);
  }
  return points;
}

function ViewModel(){
  var self = this;
  var modelGraphSVG = null;
  self.intersectionGraphSVG = null;

  self.permutationString = ko.observable('7,1,3,2,5,4,6,10,9,8');

  self.permutation = ko.computed(function(){

    var numbers = self.permutationString()
                      .split(',')
                      .map(function(s){return parseInt(s)});

    //validation
    for(var i = 1; i <= numbers.length; i++){
      if(numbers.indexOf(i) == -1){
        return null;
      }
    }

    return numbers;
  });



  self.permutation.subscribe(function(newValue, oldValue){
    self.drawModelGraph();
    self.drawIntersectionGraph();
  });



  self.drawModelGraph = function(){
    var permutation = self.permutation();
    permutation = permutation ? permutation : [];

    var width = $("#model-graph").width();
    var height = $(window).height() * 0.8;
    var radius = 10;

    var numPoints = permutation.length;

    self.modelGraphSVG.attr('width', width).attr('height', height);

    var topCircles = self.modelGraphSVG.selectAll('.top-circle')
                         .data(permutation);

    topCircles.enter()
      .append('circle');

    topCircles.attr('cy', function(d, i){return height * 0.2})
      .attr('class', 'top-circle')
      .attr('r', function(d, i){return radius})
      .transition().duration(TRANSITION_TIME)
      .attr('cx', function(d, i){return i * width / numPoints + radius});

    var bottomCircles = self.modelGraphSVG.selectAll('.bottom-circle')
                      .data(permutation);

    bottomCircles.enter()
      .append('circle');

    bottomCircles.attr('cy', function(d, i){return height * 0.8})
      .attr('class', 'bottom-circle')
      .attr('r', function(d, i){return radius})
      .transition().duration(TRANSITION_TIME)
      .attr('cx', function(d, i){return i * width / numPoints + radius});

    var lines = self.modelGraphSVG.selectAll(".edge")
                      .data(permutation);
    lines.enter()
      .append("line");

    lines.transition().duration(TRANSITION_TIME)
      .attr("x1", function(d, i){return i * width / numPoints + radius})
      .attr("y1", function(d, i){return height * 0.2})
      .attr("x2", function(d, i){return (d-1) * width / numPoints + radius})
      .attr("y2", function(d, i){return height * 0.8})
      .attr("stroke-width", 2)
      .attr("class", "edge")
      .attr("stroke", function(d, i){return palette(i%20)});

      lines.exit().remove();
      topCircles.exit().remove();
      bottomCircles.exit().remove();
  };

  self.drawIntersectionGraph = function(){
    var permutation = self.permutation();
    var intersectionGraph = computeIntersectionGraph(self.permutation());
    var width = $("#model-graph").width();
    var height = $(window).height() * 0.8;
    var radius = 10;
    var linkDistance = 30;
    var charge = -100;

    self.intersectionGraphSVG.attr('width', width).attr('height', height);
    var forceField = d3.layout.force()
      .charge(charge)
      .linkDistance(linkDistance)
      .size([width, height]);

    forceField.nodes(intersectionGraph.getNodes())
      .links(intersectionGraph.getEdges())
      .start();

    var links = self.intersectionGraphSVG.selectAll(".link")
      .data(intersectionGraph.getEdges());

    links.enter().append("line");

    links.attr("stroke-width", 2)
      .attr("stroke", "black")
      .attr("class", "link");

    links.exit().remove();

    var nodes = self.intersectionGraphSVG.selectAll(".node")
      .data(intersectionGraph.getNodes());

    nodes.enter().append("circle");

    nodes.attr("class", "node")
      .attr("r", radius)
      .call(forceField.drag);

    nodes.exit().remove();

    forceField.on("tick", function() {

      links.attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });

      nodes.attr("cx", function(d) { return d.x; })
          .style('fill', function(d, i){return palette(i%20)})
          .attr("cy", function(d) { return d.y; });

    });

  };
}

$(function(){
  var viewModel = new ViewModel();
  viewModel.modelGraphSVG = d3.select("#model-graph").append('svg');
  viewModel.intersectionGraphSVG = d3.select("#intersection-graph").append('svg');
  viewModel.drawModelGraph();
  viewModel.drawIntersectionGraph();

  $(window).on('resize', function(){
    viewModel.drawModelGraph();
    viewModel.drawIntersectionGraph();
  });
  ko.applyBindings(viewModel);
});
