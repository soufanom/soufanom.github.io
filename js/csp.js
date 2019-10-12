var colors = ['red', 'green', 'blue'];

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function traverseNet(){
  var sigInst;
  var state = ['red', 'green', 'green', 'blue', 'green', 'green'];
  viewNet(state);
}

function viewNet(state) {
  $.getJSON('data.json', function (data) {
    var sigInst = new sigma({
        renderers: [
            {
                container: document.getElementById('container'),
                type: 'canvas' // sigma.renderers.canvas works as well
            }
        ],
        settings: {
          defaultNodeColor: '#989898',
          defaultLabelSize: 11,
          minNodeSize: 0,
          maxNodeSize: 25,
          animationsTime: 1000
        }
    });
    
    var nodes = data['nodes'];
    var edges = data['edges'];
    
    for (var i = 0; i < nodes.length; i++) {
      var nd = nodes[i];
      nd.color = '#989898';
      sigInst.graph.addNode(nd);
    }
    for (var j = 0; j < edges.length; j++) {
      sigInst.graph.addEdge(edges[j]);
    }
    
    setInterval(function() {
      sigma.plugins.animate(
          sigInst,
          {
            color: state
          },
          {
            easing: 'cubicInOut',
            duration: 1000
          }
        );
    }, 2000);
    

    //var nodes = sigInst.graph.nodes();
    //var edges = sigInst.graph.edges();
    //console.log(nodes);
    //console.log(edges);
  });
}
