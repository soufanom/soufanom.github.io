var colors = ['red', 'green', 'blue'];

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function traverseNet(g){
  // Instantiate sigma:  
  var s = new sigma({
      renderers: [
          {
              container: document.getElementById('container'),
              graph: g,
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
  
  var s = new sigma({
    graph: g,
    container: 'graph'
  });

  
}
