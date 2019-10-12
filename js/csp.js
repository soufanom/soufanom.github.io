function traverseNet() {
  var s = new sigma('container');
  sigInst.graph.nodes().forEach(function (n) {
    console.log(n);
  });
}
