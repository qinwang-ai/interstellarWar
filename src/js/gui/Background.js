var Background = (function () {
	function Background () {
		var  s = this;
		LExtends(s, LSprite, []);

		var bmp = new LBitmap(new LBitmapData(dataList["bg"]));

		s.bmpW = bmp.getWidth();
		s.bmpH = bmp.getHeight();

		var ln = 4;

		for (var i = 0, xI = 0, yI = 0; i < ln * ln; i++) {
			var b = bmp.clone();
			b.x = xI * s.bmpW;
			b.y = yI * s.bmpH;
			s.addChild(b);

			if (++xI >= ln) {
				xI = 0;
				yI++;
			}
		}

		s.w = s.getWidth();
		s.h = s.getHeight();
	}

	return Background;
})();