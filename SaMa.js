var five = require("johnny-five"),
    twitter = require('ntwitter');
 var board, motion, myLed, myLed2, tweetWalkers =0;

board = new five.Board();

board.on("ready", function() {

  // Create a new `motion` hardware instance.
  motion = new five.IR.Motion(7);
  myLed= new five.Led(13);
  myLed2= new five.Led(8);
  var twit = new twitter({
//The real keys have removed because they are private information.
  consumer_key: 'fhfhf6ffjkffks89jjkdkjsd',
  consumer_secret: 'hsdfhgshjgskskjskksksksss',
  access_token_key: 'dsjbdbsd674hbhf83dnbhbsfh',
  access_token_secret: 'sjsjssbsjbfjbfhbsh744hhjssjshs'
  });
  // Inject the `motion` hardware into
  // the Repl instance's context;
  // allows direct command line access
  this.repl.inject({
    motion: motion,
     twitter:twit,
    led: myLed,led2:myLed2
  });

  // Pir Event API

  // "calibrated" occurs once, at the beginning of a session,
  motion.on("calibrated", function(err, ts) {
    console.log("calibrated", ts);
      twit.verifyCredentials(function (err, data) {
      console.log( "data : " + data + " error : " + err);
      console.log("twitter setup done...")
    });
  });

  // "motionstart" events are fired when the "calibrated"
  // proximal area is disrupted, generally by some form of movement
  motion.on("motionstart", function(err, ts) {
    console.log("motionstart", ts);
    myLed.on();
    myLed2.strobe(50);
     tweetWalkers++;


    
    twit.updateStatus('Someone walked pass the pamphlets ' + tweetWalkers +' at ' + new Date().toString(),
      function (err, data) {
        console.log( "error : " + err);
      });

  });

  // "motionstart" events are fired following a "motionstart event
  // when no movement has occurred in X ms
  motion.on("motionend", function(err, ts) {
    console.log("motionend", ts);
    
    myLed.off();
    
    myLed2.stop();
    myLed2.off();
  });
});
