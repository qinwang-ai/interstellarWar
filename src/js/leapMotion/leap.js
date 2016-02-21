var cats = {};

Leap.loop(function(frame) {
	frame.hands.forEach(function(hand, index) {
		var cat = ( cats[index] || (cats[index] = new Cat()) );
		cat.setTransform(hand.screenPosition(), hand.roll());
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
	cat.setTransform = function(position, rotation) {

		if (leapED) {
			var degree = rotation * (180/Math.PI);
			var rate = 1;
			console.log(degree);
			var eve = new LEvent(LeapEventDispatcher.EVENT_HAND_MOVE);
			eve.angle = degree;
		//	ABOUNDAND eve.x = (position[0]/window.screen.width)*LGlobal.width*rate - 600;
		//	ABOUNDAND eve.y = (position[1]/window.screen.height)*LGlobal.height*rate - 300;
			leapED.dispatchEvent(eve);
		}
	};

};

cats[0] = new Cat();

// This allows us to move the cat even whilst in an iFrame.
Leap.loopController.setBackground(true)
