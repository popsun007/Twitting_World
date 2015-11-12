var width = 960,
    height = 960,
    speed = -1e-2,
    start = Date.now();

var sphere = {type: "Sphere"};

var projection = d3.geo.orthographic()
    .scale(width / 2.1)
    .translate([width / 2, height / 2])
    .precision(.5);

var graticule = d3.geo.graticule();

var canvas = d3.select("body").append("canvas")
    .attr("width", width)
    .attr("height", height);

var context = canvas.node().getContext("2d");

var path = d3.geo.path()
    .projection(projection)
    .context(context);

d3.json("/globe_data", function(error, topo) {
  if (error) throw error;



  var land = topojson.feature(topo, topo.objects.land),
      grid = graticule();

  d3.timer(function() {

    context.clearRect(0, 0, width, height);
    projection.rotate([speed * (Date.now() - start), -15]).clipAngle(90);

    context.beginPath();
    path(sphere);
    context.lineWidth = 3;
    context.strokeStyle = "#000";
    context.stroke();
    context.fillStyle = "#fff";
    context.fill();

    projection.clipAngle(180);

    context.beginPath();
    path(land);
    context.fillStyle = "#dadac4";
    context.fill();

    context.beginPath();
    path(grid);
    context.lineWidth = .5;
    context.strokeStyle = "rgba(119,119,119,.5)";
    context.stroke();

    projection.clipAngle(90);

    context.beginPath();
    path(land);
    context.fillStyle = "#737368";
    context.fill();
    context.lineWidth = .5;
    context.strokeStyle = "#000";
        // // points
    aa = [124, 335];
    bb = [-122.389809, 37.72728];
    console.log("----")
    console.log(projection(aa),projection(bb));

    // add circles to canvas
    canvas.selectAll("circle")
        .data([aa,bb]).enter()
        .append("circle")
        .attr("cx", function(d) {
               return projection(d)[0];
            })
        .attr("cy", function(d) {
               return projection(d)[1];
            })
        .attr("r", "19px")
        .attr("fill", "red");
    context.stroke();



  });

});

d3.select(self.frameElement).style("height", height + "px");