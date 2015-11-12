var socket = io.connect();
var width = 960,
    height = 700;

var projection = d3.geo.miller()
    .scale(153)
    .translate([width / 2, height / 2])
    .precision(.1);

var path = d3.geo.path()
    .projection(projection);

var graticule = d3.geo.graticule();

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

svg.append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path);

d3.json("/globe_data", function(error, world) {
  if (error) throw error;

  svg.insert("path", ".graticule")
      .datum(topojson.feature(world, world.objects.land))
      .attr("class", "land")
      .attr("d", path);

  svg.insert("path", ".graticule")
      .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
      .attr("class", "boundary")
      .attr("d", path);

  socket.on('stream', function(tweets){

    console.log("ahha");
    console.log(tweets[0].geo);
      // add circles to svg
  svg.selectAll("circle")
      .data([tweets[0].geo]).enter()
      .append("circle")
      .attr("cx", function(d) {
             return projection(d)[0];
          })
      .attr("cy", function(d) {
             return projection(d)[1];
          })
      .attr("r", "5px")
      .attr("fill", "red");
    
  });
});

d3.select(self.frameElement).style("height", height + "px");