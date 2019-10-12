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
      n.color = 'red';
    });
    
    
    sigInst.refresh();
  });
  
}
