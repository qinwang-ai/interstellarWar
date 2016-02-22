var Background = (function () {
	function Background () {
		var  s = this;
		LExtends(s, LSprite, []);

		s.bmp = new LBitmap(new LBitmapData(dataList["bg"]));
		s.bmpW = s.bmp.getWidth();
		s.bmpH = s.bmp.getHeight();

		for (var i = 0, xI = 0, yI = 0; i < 9; i++) {
			var b = s.bmp.clone();
			b.x = xI * s.bmpW;
			b.y = yI * s.bmpH;
			s.addChild(b);

			if (++xI >= 3) {
				xI = 0;
				yI++;
			}
		}

		s.w = s.getWidth();
		s.h = s.getHeight();
	}

	return Background;
})();