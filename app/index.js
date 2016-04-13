var React = require('react');
var ReactDOM = require('react-dom');
var logic = require('./logic.js');
var PropTypes = React.PropTypes;


var EntryForm = React.createClass({
  propTypes:{
    updatePermutation: PropTypes.func.isRequired
  },
  render: function(){
    var placeholder = "Specify a permutation by ordering integers from 1 to n separated by commas.  For example: 1, 3, 5, 2, 4"
    return (
      <div>
        <input className="form-control"
            type="text"
            placeholder={placeholder}
            onChange={this.props.updatePermutation}/>
      </div>
    );
  }

});

var ModelGraph = React.createClass({
  render: function(){
    var perm = this.props.perm;
    if(typeof(perm) == 'str'){
        return (
          <span>{perm}</span>
        );
    }

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

  getInitialState: function() {
    return {
      permutation: '1,2,3,4,5'
    };
  },


  render: function(){
    var self = this;
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;

    var leftWidth = windowWidth / 2 - 50;
    var rightWidth = windowWidth / 2 - 50;
    var leftHeight = windowHeight - 150;
    var rightHeight = windowHeight - 150;

    var updatePermutation = function(e){
      console.log(e.target.value);
      self.setState({
        permutation: e.target.value
      });
    };

    return (
      <div>
        <div className="row">
          <EntryForm updatePermutation={updatePermutation}/>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <ModelGraph width={leftWidth}
                        height={leftHeight}
                        perm={self.state.permutation}/>
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
