var ko = require('knockout');
var $ = require('jquery');
var d3 = require('d3');



function ViewModel(){
  var self = this;
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

  };

}

$(function(){
  var viewModel = new ViewModel();
  ko.applyBindings(viewModel);
});
