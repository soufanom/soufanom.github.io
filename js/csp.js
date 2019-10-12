var colors = ['red', 'green', 'blue'];

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function traverseNet(sigInst){
  var state = ['red', 'green', 'green', 'blue', 'green', 'green'];
  viewNet(sigInst, state);
  sleep(2000);
  var state = ['red', 'red', 'red', 'blue', 'green', 'red'];
  viewNet(sigInst, state);
  sleep(2000);
  var state = ['blue', 'blue', 'blue', 'blue', 'green', 'red'];
  viewNet(sigInst, state);
}

function viewNet(sigInst, state) {
  sigInst.graph.clear();
  $.getJSON('data.json', function (data) {
    var nodes = data['nodes'];
    var edges = data['edges'];
    for (var i = 0; i < nodes.length; i++) {
      var nd = nodes[i];
      nd.color = 'red';
      sigInst.graph.addNode(nd);
    }
    for (var j = 0; j < edges.length; j++) {
      sigInst.graph.addEdge(edges[j]);
    }
    sigInst.refresh();
    
    var state = ['red', 'green', 'green', 'blue', 'green', 'green'];
    var i = 0;
    sigInst.graph.nodes().forEach(function (n) {
      n.color = state[i];
      i = i + 1;
      sigInst.refresh();
    });
    
    var nodes = sigInst.graph.nodes();
    var edges = sigInst.graph.edges();
    console.log(nodes);
    console.log(edges);
    
    
    
  });
  
}
