var Player = (function () {
	function Player () {
		var  s = this;
		var bmpd = new LBitmapData(dataList["player"]),
		frameList = aircraft_animation_data["player"];
		LExtends(s, Aircraft, [bmpd, frameList]);

		s.step = 5;
		s.angle = -90;

		s.addEventListener(LEvent.ENTER_FRAME, s.loop);
	}

	Player.prototype.moveTowards = function (a) {
		this.angle = a;
	};

	Player.prototype.loop = function (e) {
		var s = e.currentTarget,
		leftEdge = s.parent.bg.x + 80,
		rightEdge = s.parent.bg.x + s.parent.bg.w - 80,
		topEdge = s.parent.bg.y + 80,
		bottomEdge = s.parent.bg.y + s.parent.bg.h - 80;

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

		var rad = s.angle * Math.PI / 180;

		s.x += s.step * Math.cos(rad);
		s.y += s.step * Math.sin(rad);

		s.rotate = s.angle;
	};

	return Player;
})();