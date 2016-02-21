var Player = (function () {
	function Player () {
		var  s = this;
		var bmpd = new LBitmapData(dataList["player"]),
		frameList = LGlobal.divideCoordinate(292, 126, 1, 2);
		LExtends(s, Aircraft, [bmpd, frameList]);
	}

	Player.prototype.moveTo = function (x, y) {
		var s = this;
		
		s.x = x;
		s.y = y;
	};

	Player.prototype.setRotation = function (a) {
		var  s = this;

		s.rotate = a;
	};

	return Player;
})();