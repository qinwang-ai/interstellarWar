var Player = (function () {
	function Player () {
		var  s = this;
		var bmpd = new LBitmapData(dataList["player"]),
		frameList = aircraft_animation_data["player"];
		LExtends(s, Aircraft, [bmpd, frameList]);

		s.step = 7;
		s.angle = -90;
		s.atkAngle = -90;
		s.isShoot = true;
		s.isPlayer = true;
		s.shootSpeed = 10;
		s.shootRange = 900;
		s.bulletStyle = 1;
		s.bulletStep = 15;
		s.bulletNum = 4;

		s.addEventListener(LEvent.ENTER_FRAME, s.loop);
	}

	Player.prototype.loop = function (e) {
		var s = e.currentTarget, bg = gameLayer.bg;
		leftEdge = bg.x + 80,
		rightEdge = bg.x + bg.w - 80,
		topEdge = bg.y + 80,
		bottomEdge = bg.y + bg.h - 80;

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