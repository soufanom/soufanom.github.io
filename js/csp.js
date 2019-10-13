var colors = ['#e7453c', '#3aa757', '#4688f1'];
var s = null;
function viewMap(state) {
    var i,
            g = {
                nodes: [],
                edges: []
            },
            g2 = {
                nodes: [],
                edges: []
            };

    // Generate graph:
    g.nodes.push({id: "WA", label: "Western Australia", x: 0, y: 1, size: 20, color: '#989898'});
    g.nodes.push({id: "NT", label: "Northern Territory", x: 1, y: -1.5, size: 20, color: '#989898'});
    g.nodes.push({id: "SA", label: "South Australia", x: 1, y: 2, size: 20, color: '#989898'});
    g.nodes.push({id: "QLD", label: "Queensland", x: 3, y: -1, size: 20, color: '#989898'});
    g.nodes.push({id: "NSW", label: "New South Wales", x: 3, y: 1, size: 20, color: '#989898'});
    g.nodes.push({id: "VIC", label: "Victoria", x: 3, y: 3, size: 20, color: '#989898'});
    //edges
    g.edges.push({id: "e0", source: "WA", target: "NT"});
    g.edges.push({id: "e1", source: "WA", target: "SA"});
    g.edges.push({id: "e2", source: "NT", target: "SA"});
    g.edges.push({id: "e3", source: "NT", target: "QLD"});
    g.edges.push({id: "e4", source: "QLD", target: "SA"});
    g.edges.push({id: "e5", source: "SA", target: "NSW"});
    g.edges.push({id: "e6", source: "SA", target: "VIC"});
    g.edges.push({id: "e7", source: "QLD", target: "NSW"});
    g.edges.push({id: "e8", source: "NSW", target: "VIC"});

    if (s == null) {
        s = new sigma({
            graph: g,
            container: 'container',
            settings: {
                defaultNodeColor: '#989898',
                defaultLabelSize: 11,
                minNodeSize: 0,
                maxNodeSize: 25
            }
        });
    }
    for (var i = 0; i < s.graph.nodes().length; i++) {
        s.graph.nodes()[i].color = state[i];
    }
    s.refresh();
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// GraphColoring class 
class Map {

    // Array is used to implement stack 
    constructor(vertices, graph)
    {
        this.V = vertices;
        this.graph = graph;
        this.solution = [];
    }

    // A utility function to check if the current color assignment 
    // is safe for vertex v 
    // v: vertex index
    // color: assigned colors array for each node (current state)
    // c: color value to check for
    isSafe(v, color, c) {
        for (var i = 0; i < this.V; i++) {
            if ((this.graph[v][i] === 1) && (color[i] === c)) {
                return false;
            }
        }
        return true;
    }

    isNaiveSafe(color) {
        for (var i = 0; i < this.V; i++) {
            for (var j = (i + 1); j < this.V; j++) {
                if ((this.graph[i][j] === 1) && (color[i] === color[j])) {
                    return false;
                }
            }
        }
        return true;
    }

    // A recursive utility function to solve m 
    // coloring  problem 
    // m: number of colors or domain size
    // color: assigned colors array for each node (current state)
    graphColourUtil(m, color, v) {
        // base case: when the last node is reached
        if (v === this.V) {
            return true;
        }

        for (var i = 0; i < m; i++) {
            var c = colors[i]

            if (this.isSafe(v, color, c)) {
                color[v] = c
                console.log(color);
                this.solution.push([...color]);
                /* recur to assign colors to rest of the vertices */
                if (this.graphColourUtil(m, color, v + 1)) {
                    return true;
                }
                //backtrack-step: put 0 back to the assignment
                color[v] = '#989898'
            }
        }

        /* If no color can be assigned to this vertex 
         then return false */
        return false;
    }

    // A recursive utility function to solve m 
    // coloring  problem 
    // m: number of colors or domain size
    // color: assigned colors array for each node (current state)
    graphColourUtil2(m, color, v) {
        // base case: when the last node is reached
        if (v === this.V) {
            return true;
        }

        for (var i = 0; i < m; i++) {
            var c = colors[i]

            color[v] = c
            console.log(color);
            this.solution.push([...color]);
            if (this.isSafe(v, color, c)) {
                //backtrack-step: put 0 back to the assignment
                break
            }
            console.log(color);
            this.solution.push([...color]);
        }
        /* recur to assign colors to rest of the vertices */
        if (this.graphColourUtil2(m, color, v + 1)) {
            return true;
        }

        /* If no color can be assigned to this vertex 
         then return false */
        return false;
    }

    // A recursive utility function to solve m 
    // coloring  problem 
    // m: number of colors or domain size
    // color: assigned colors array for each node (current state)
    graphColourUtil3(m, state, i, v) {
        // base case: when the last node is reached
        console.log(state);
        this.solution.push([...state]);
        if (this.isNaiveSafe(state)) {
            return true;
        } else if (v >= this.V) {
            return true;
        } else if (i === m) {
            return true;
        }

        state[v] = colors[i]
        this.graphColourUtil3(m, state, i, v + 1);
        this.graphColourUtil3(m, state, i, v + 2);
        this.graphColourUtil3(m, state, i + 1, v);
        this.graphColourUtil3(m, state, i + 1, v + 1);

        return false;

    }

    naiveColoring(m) {
        var color = []
        for (var i = 0; i < this.V; i++) {
            color.push('#989898')
        }

        if (!(this.graphColourUtil3(m, color, 0, 0))) {
            console.log("No solution");
            return this.solution;
        }

        // Print the solution 
        console.log(color)

        return this.solution;
    }

    graphColouringBTFC(m) {
        var color = []
        for (var i = 0; i < this.V; i++) {
            color.push('#989898')
        }

        if (!(this.graphColourUtil(m, color, 0))) {
            console.log("No solution");
            return false
        }

        // Print the solution 
        console.log(color)

        return this.solution;
    }

    stepsColoring(m) {
        var color = []
        for (var i = 0; i < this.V; i++) {
            color.push('#989898')
        }

        if (!(this.graphColourUtil2(m, color, 0))) {
            console.log("No solution");
            return false
        }

        // Print the solution 
        console.log(color)

        return this.solution;
    }

}

function naiveGraphColoring() {
    //nodes in order: WA, NT, SA, QLD, NSW, VIC
    graph = [[0, 1, 1, 0, 0, 0],
        [1, 0, 1, 1, 0, 0],
        [1, 1, 1, 1, 1, 1],
        [0, 1, 1, 0, 1, 0],
        [0, 0, 1, 1, 0, 1],
        [0, 0, 1, 0, 1, 0]]
    g = new Map(6, graph);
    m = 3
    colors = shuffle(colors)
    var solution = g.naiveColoring(m)

    i = 0;
    var interval = null;

    interval = setInterval(function changeColors(s) {
        if (i < solution.length) {
            viewMap(solution[i]);
            i++;
            document.getElementById('steps').innerHTML = 'Number of steps is: ' + i;
        } else {
            clearInterval(interval);
        }
    }, 100);

}

function stepsGraphColoring() {
    //nodes in order: WA, NT, SA, QLD, NSW, VIC
    graph = [[0, 1, 1, 0, 0, 0],
        [1, 0, 1, 1, 0, 0],
        [1, 1, 1, 1, 1, 1],
        [0, 1, 1, 0, 1, 0],
        [0, 0, 1, 1, 0, 1],
        [0, 0, 1, 0, 1, 0]]
    g = new Map(6, graph);
    m = 3
    colors = shuffle(colors)
    var solution = g.stepsColoring(m)

    i = 0;
    var interval = null;

    interval = setInterval(function changeColors(s) {
        if (i < solution.length) {
            viewMap(solution[i]);
            i++;
            //document.getElementById('steps').innerHTML = 'Number of steps is: ' + i;
        } else {
            clearInterval(interval);
        }
    }, 750);

}

function btfcGraphColoring() {
    //nodes in order: WA, NT, SA, QLD, NSW, VIC
    graph = [[0, 1, 1, 0, 0, 0],
        [1, 0, 1, 1, 0, 0],
        [1, 1, 1, 1, 1, 1],
        [0, 1, 1, 0, 1, 0],
        [0, 0, 1, 1, 0, 1],
        [0, 0, 1, 0, 1, 0]]
    g = new Map(6, graph);
    m = 3
    colors = shuffle(colors)
    var solution = g.graphColouringBTFC(m)

    i = 0;
    var interval = null;

    interval = setInterval(function changeColors(s) {
        if (i < solution.length) {
            viewMap(solution[i]);
            i++;
            document.getElementById('steps').innerHTML = 'Number of steps is: ' + i;
        } else {
            clearInterval(interval);
        }
    }, 750);

}



















