var cats = {};
var isStartGame = false;
var isSuperKill = false;

Leap.loop(function(frame) {
	frame.hands.forEach(function(hand, index) {
		var cat = ( cats[index] || (cats[index] = new Cat()) );

		//attack control
		if(hand.type == "left"){
			cat.setTransform(hand.screenPosition(), hand.roll(), "attack");
		}

		//move control
		if(hand.type == "right") {
			cat.setTransform(hand.screenPosition(), hand.roll(), "move");
		}

		//start and attack super kill controll
		if(hand.type == "right" && frame.valid && frame.gestures.length > 0){
		    frame.gestures.forEach(function(gesture){
		        switch (gesture.type){
		          case "circle":
		              console.log("Circle Gesture");
//					  if(leapED && !isStartGame) leapED.dispatchEvent(LeapEventDispatcher.EVENT_START_GAME);
		              break;
		          case "keyTap":
		              console.log("Key Tap Gesture");
		              break;
		          case "screenTap":
		              console.log("Screen Tap Gesture");
		              break;
		          case "swipe":
		              console.log("Swipe Gesture");
					  if(leapED && !isSuperKill) leapED.dispatchEvent(LeapEventDispatcher.EVENT_SUPER_KILL);
		              break;
		        }
	    	});
	  }
	});

})
.use('screenPosition', {scale: 0.25})
.use('handEntry')
.on('handFound', function(hand){
	if(leapED) {
//		leapED.dispatchEvent(LeapEventDispatcher.EVENT_HAND_FOUND);
	}
})
.on('handLost', function(hand){
	if(leapED) {
//		leapED.dispatchEvent(LeapEventDispatcher.EVENT_HAND_LOST);
	}
});



var Cat = function() {
	var cat = this;
	cat.setTransform = function(position, rotation, type) {
		if (leapED) {
			var degree = rotation * (180/Math.PI);
			var rate = 1;
			if(type == "move"){
				var eve = new LEvent(LeapEventDispatcher.EVENT_HAND_MOVE);
				eve.angle = degree;
				leapED.dispatchEvent(eve);
			}
			if(type == "attack"){
				var eve_attack = new LEvent(LeapEventDispatcher.EVENT_PLAYER_ATTACK);
				eve_attack.angle = degree;
				leapED.dispatchEvent(eve_attack);
			}
		}
	};
};

cats[0] = new Cat();

// This allows us to move the cat even whilst in an iFrame.
Leap.loopController.setBackground(true)
