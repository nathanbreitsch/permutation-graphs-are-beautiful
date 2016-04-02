var React = require('react');
var ReactDOM = require('react-dom');

var EntryForm = React.createClass({
  render: function(){
    var placeholder = "Specify a permutation by ordering integers from 1 to n separated by commas.  For example: 1, 3, 5, 2, 4"
    return (
      <div>
        <input className="form-control" type="text" placeholder={placeholder}/>
      </div>
    );
  }
});

var ModelGraph = React.createClass({
  render: function(){
    var width = this.props.width;
    var height = this.props.height;
    var x_top = 50;
    var x_bottom = height - 50;
    var radius = 25;
    var centers = [1,2,3,4,5,6,7,8]
    centers = centers.map(function(x){ return x / 8 - 1/16; });
    centers = centers.map(function(x){ return x * width; });

    var topCircles = centers.map(function(x){
      return (
        <circle cx={x} cy={x_top} r={radius}></circle>
      );
    });

    var bottomCircles = centers.map(function(x){
      return (
        <circle cx={x} cy={x_bottom} r={radius}></circle>
      );
    });

    return (
      <svg width={width} height={height}>
        {topCircles}
        {bottomCircles}
      </svg>
    );
  }
});

var IntersectionGraph = React.createClass({
  render: function(){
    var width = this.props.width;
    var height = this.props.height;

    return (
      <svg width={width} height={height}>

      </svg>
    );
  }
})

var Root = React.createClass({
  render: function(){

    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;

    var leftWidth = windowWidth / 2 - 50;
    var rightWidth = windowWidth / 2 - 50;
    var leftHeight = windowHeight - 150;
    var rightHeight = windowHeight - 150;

    return (
      <div>
        <div className="row">
          <EntryForm />
        </div>
        <div className="row">
          <div className="col-sm-6">
            <ModelGraph width={leftWidth} height={leftHeight} />
          </div>
          <div className="col-sm-6">
            <IntersectionGraph  width={rightWidth} height={rightHeight}/>
          </div>
        </div>
      </div>
    )
  }
});

ReactDOM.render(
  <Root />,
  document.getElementById('app')
)
