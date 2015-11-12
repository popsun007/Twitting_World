var socket = io.connect();
var width = 960,
    height = 700;

var projection = d3.geo.miller()
    .scale(153)
    .translate([width / 2, height / 2])
    .precision(.1);

var path = d3.geo.path()
    .projection(projection);
var tweetsWrapper = d3.select('.tweets');
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

function renderTweets(data)
{
  var tweets = tweetsWrapper.selectAll('div.tweet').data(data);

  tweets.exit().remove();

  var divWrapper = tweets.enter().insert("div", ":first-child");
  divWrapper.classed('tweet', true);

  divWrapper.append('div')
    .classed('user', true)
    .html(function(t){return '@'+t.screen_name + ' - ' + t.created_at.toLocaleString();;});
  divWrapper.append('div')
    .classed('text', true)
    .html(function(t){return t.text;});
  divWrapper.append('a')
    .attr('href',function(t){return 'https://twitter.com/'+t.screen_name+'/status/'+t.id_str;})
    .html(function(t){return 'https://twitter.com/'+t.screen_name+'/status/'+t.id_str;});
}

// var tip = d3.tip().attr('class', 'd3-tip tweet').offset([-10, 0]).html(generateTipHtml);
  socket.on('stream', function(tweets){
    var tweet_geos = [];
    for(var i = 0; i < tweets.length; i++){
      if (tweets[i].geo){
        tweet_geos.push(tweets[i].geo);
      }
    }
    console.log(tweet_geos);
    // draw points:
    svg.selectAll("circle")
    .data(tweet_geos).enter()
    .append("circle")
    .attr("cx", function(d) {
           return projection(d)[0];
        })
    .attr("cy", function(d) {
           return projection(d)[1];
        })
    .attr("r", "5px")
    .attr("fill", "rgb(255,140,0)")
    .transition()
    .delay(300000)
    .remove();

    // append tweets:
    renderTweets(tweets);
  });
});

d3.select(self.frameElement).style("height", height + "px");