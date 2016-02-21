var cats = {};

Leap.loop(function(frame) {

	frame.hands.forEach(function(hand, index) {

		var cat = ( cats[index] || (cats[index] = new Cat()) );
		cat.setTransform(hand.screenPosition(), hand.roll());
	});

}).use('screenPosition', {scale: 0.25})
.use('handEntry')
.on('handFound', function(hand){
    console.log( 'hand found', hand );
})
.on('handLost', function(hand){
    console.log( 'hand Lost', hand );
});



var Cat = function() {
	var cat = this;
	cat.setTransform = function(position, rotation) {

//		Leap.vec3.subtract(position, position, this.frame.interactionBox.center)
		if (player) {
    		console.log( 'hand Lost', position[1] );
			var degree = rotation * (180/Math.PI);
			player.moveTo( position[0], position[1]);
			player.setRotation(degree);
		}
	};

};

cats[0] = new Cat();

// This allows us to move the cat even whilst in an iFrame.
Leap.loopController.setBackground(true)
