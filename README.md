# Twitting_World
Live on: http://twitting-world.heroku.com
<br>
A map that allows users to visualize real time tweets from all over the world on a map

![alt tag](https://s3.amazonaws.com/poly-screenshots.angel.co/Project/0f/163992/3ac8ab2d7b498df9b3b6122bd82c3c50-original.png)

# Server
* The server is built using [node.js](https://nodejs.org/) and [socket.io](http://socket.io/).

# Config file format
------------------
  * In server.js, change code below with your information. Create your own key and secret at https://apps.twitter.com/

  var twit = new twitter({
      consumer_key: 'YOUR_CONSUMER_KEY'
    , consumer_secret: 'YOUR_CONSUMER_SECRET'
    , access_token: 'YOUR_ACCESS_TOKEN'
    , access_token_secret: 'YOUR_ACCESS_TOKEN_SECRET'
  })

# Client
* The client visualization is built using [D3.js](http://d3js.org/) and socket.io.
* The index file draws the visualization based on received JSON object from the server.

# Usage
  * Clone this repository
  * Run server.js using node 
  * Open http://localhost:8888/ in a browser.
