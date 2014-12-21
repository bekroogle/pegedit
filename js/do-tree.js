debugData = '';
function doTree() {
  $('#treediv').html('');
  // ************** Generate the tree diagram  *****************
  var margin = {
      top: 80,
      right: 120,
      bottom: 20,
      left: 120
    };
  console.log("height: "+ $('#treediv').height());
  console.log("width: "+ $('#treediv').width());
  
  var width = $('#treediv').width() - margin.right - margin.left,
      height = $('#treediv').height() - margin.top - margin.bottom;

  var i = 0;

  var tree = d3.layout.tree()
    .size([height, width]);

  var diagonal = d3.svg.diagonal()
    .projection(function(d) {
      return [d.x, d.y];
    });

  var svg = d3.select("#treediv").append("svg")
      .attr("width", width + margin.right + margin.left)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")  
      .attr("transform", "translate(" + width/2 + "," + margin.top + ")")
      .call(d3.behavior.zoom().scaleExtent([0.5, 3]).on("zoom", zoom))
    .append("g");
  
  svg.append("rect")
    .attr("class", "overlay")
    .attr("width", width * 10)
    .attr("height", height * 10)
    .attr("transform", "translate("+ width * -5 +","+ height * -5 + ")");
  
  root = treeData;

  update(root);

  function update(source) {

      // Compute the new tree layout.
      var nodes = tree.nodes(root).reverse(),
        links = tree.links(nodes);

      // Normalize for fixed-depth.
      nodes.forEach(function(d) {
        d.y = d.depth * 50;
      });

      // Declare the nodesâ€¦
      var node = svg.selectAll("g.node")
        .data(nodes, function(d) {
          return d.id || (d.id = ++i);
        });

      // Enter the nodes.
      var nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
        });

      nodeEnter.append("circle")
        .attr("r", 10)
        .style("fill", "#fff");

      nodeEnter.append("text")
        .attr("y", function(d) {
          return d.children || d._children ? -18 : 18;
        })
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .text(function(d) {
          return d.name;
        })
        .style("fill-opacity", 1);

      // Declare the linksâ€¦
      var link = svg.selectAll("path.link")
        .data(links, function(d) {
          return d.target.id;
        });

      // Enter the links.
      link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("d", diagonal);

    }

  function zoom() {
    svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
  }

};