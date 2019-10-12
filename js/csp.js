var colors = ['red', 'green', 'blue'];

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function initNet(){
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
  return sigInst;
}

function traverseNet(){
  var sigInst;
  sigInst = initNet();
  var state = ['red', 'green', 'green', 'blue', 'green', 'green'];
  viewNet(sigInst, state);
  sleep(2000);
  sigInst.graph.clear(); sigInst = null;
  sigInst = initNet();
  var state = ['red', 'red', 'red', 'blue', 'green', 'red'];
  viewNet(sigInst, state);
  sleep(2000);
  sigInst.graph.clear(); sigInst = null;
  sigInst = initNet();
  var state = ['blue', 'blue', 'blue', 'blue', 'green', 'red'];
  viewNet(sigInst, state);
}

function viewNet(sigInst, state) {
  $.getJSON('data.json', function (data) {
    var nodes = data['nodes'];
    var edges = data['edges'];
    
    for (var i = 0; i < nodes.length; i++) {
      var nd = nodes[i];
      nd.color = state[i];
      sigInst.graph.addNode(nd);
    }
    for (var j = 0; j < edges.length; j++) {
      sigInst.graph.addEdge(edges[j]);
    }
    sigInst.refresh();
    
    sigma.plugins.animate(
        sigInst,
        {
          color: state
        },
        {
          easing: 'cubicInOut',
          duration: 300
        }
      );
    
    var nodes = sigInst.graph.nodes();
    var edges = sigInst.graph.edges();
    console.log(nodes);
    console.log(edges);
  });
}
