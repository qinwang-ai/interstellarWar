var Player = (function () {
	function Player () {
		var  s = this;
		var bmpd = new LBitmapData(dataList["player"]),
		frameList = aircraft_animation_data["player"];
		LExtends(s, Aircraft, [bmpd, frameList]);

		s.useTween = false;
		s.step = 5;
		s.angle = -90;
		s.isPlayer = true;

		s.addEventListener(LEvent.ENTER_FRAME, s.loop);
	}

	Player.prototype.loop = function (e) {
		var s = e.currentTarget, gameLayer = s.parent.parent;
		leftEdge = gameLayer.bg.x + 80,
		rightEdge = gameLayer.bg.x + gameLayer.bg.w - 80,
		topEdge = gameLayer.bg.y + 80,
		bottomEdge = gameLayer.bg.y + gameLayer.bg.h - 80;

		if (s.x < leftEdge) {
			s.x = leftEdge;
		} else if (s.x > rightEdge) {
			s.x = rightEdge;
		}

		if (s.y < topEdge) {
			s.y = topEdge;
		} else if (s.y > bottomEdge) {
			s.y = bottomEdge;
		}

		s.callParent("loop", arguments);
	};

	return Player;
})();