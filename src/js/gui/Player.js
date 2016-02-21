var Player = (function () {
	function Player () {
		var  s = this;
		var bmpd = new LBitmapData(dataList["player"]),
		frameList = LGlobal.divideCoordinate(292, 126, 1, 2);
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
		var s = e.currentTarget;
	};

	return Player;
})();