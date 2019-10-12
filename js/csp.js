function traverseNet() {
  var s = new sigma('container');
  s.graph.nodes().forEach(function (n) {
    console.log(n);
  });
}
