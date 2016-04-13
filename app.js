
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

  self.modelGraphEdges = ko.computed(function(){
    return self.permutation().map(function(d, i){
      return [i, d];
    });
  });

  self.drawModelGraph = function(){
    var width = $("#model-graph").width();
    var height = $(window).height() * 0.8;
    self.modelGraphSVG.attr('width', width).attr('height', height);
    self.modelGraphSVG.selectAll('.top-circle')
                      .data([1,2,3,4])
                      .enter()
                      .append('circle')
                      .attr('cx', function(d, i){return i * width / 4})
                      .attr('cy', function(d, i){return i * height / 4})
                      .attr('r', function(d, i){return 30});
  };

}

$(function(){
  var viewModel = new ViewModel();
  viewModel.modelGraphSVG = d3.select("#model-graph").append('svg');
  viewModel.drawModelGraph();
  ko.applyBindings(viewModel);
});
