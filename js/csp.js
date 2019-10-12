var colors = ['red', 'green', 'blue'];

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function traverseNet(sigInst) {
  $.getJSON('data.json', function (data) {
    var nodes = data['nodes'];
    var edges = data['edges'];
    for (var i = 0; i < nodes.length; i++) {
      sigInst.graph.addNode(nodes[i]);
    }
    for (var j = 0; j < edges.length; j++) {
      sigInst.graph.addEdge(edges[j]);
    }

    sigInst.graph.nodes().forEach(function (n) {
      n.color = colors[1];
      sigInst.refresh();
      sleep(1000);
    });
    
    var nodes = sigInst.graph.nodes();
    var edges = sigInst.graph.edges;
    console.log(nodes);
    console.log(edges);
    
    
    
  });
  
}
