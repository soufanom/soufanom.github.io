function traverseNet(s) {
  console.log(s);
  s.graph.nodes().forEach(function (n) {
    console.log(n);
  });
}
