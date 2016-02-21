var Player = (function () {
	function Player () {
		var  s = this;
		var bmpd = new LBitmapData(dataList["player"]),
		frameList = aircraft_animation_data["player"];
		LExtends(s, Aircraft, [bmpd, frameList]);

		s.addEventListener(LEvent.ENTER_FRAME, s.loop);
	}

	Player.prototype.moveTo = function (x, y) {
		var s = this;
		
		LTweenLite.to(player, 0.3, {
			x : x,
			y : y,
			ease : LEasing.Strong.easeOut
		});
	};

	Player.prototype.setRotation = function (a) {
		var s = this;

		LTweenLite.to(player, 1, {
			rotate : a,
			ease : LEasing.Strong.easeOut
		});
	};

	Player.prototype.loop = function (e) {
		var s = e.currentTarget,
		leftEdge = 80,
		rightEdge = LGlobal.width - 80,
		topEdge = 80,
		bottomEdge = LGlobal.height - 80;

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
	};

	return Player;
})();