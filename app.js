var TRANSITION_TIME = 750;


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

  self.permutationString = ko.observable('1,5,3,2,4');

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
      .attr("stroke", "black");

      lines.exit().remove();
      topCircles.exit().remove();
      bottomCircles.exit().remove();
  };

}

$(function(){
  var viewModel = new ViewModel();
  viewModel.modelGraphSVG = d3.select("#model-graph").append('svg');
  viewModel.drawModelGraph();
  ko.applyBindings(viewModel);
});
