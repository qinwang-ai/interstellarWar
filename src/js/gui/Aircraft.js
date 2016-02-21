var Aircraft = (function () {
	function Aircraft (bmpd, frameList) {
		var  s = this;
		LExtends(s, LSprite, []);

		s.animation = new LAnimationTimeline(bmpd, frameList);
		s.addChild(s.animation);

		s.animation.play();
	}

	return Aircraft;
})();