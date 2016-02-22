var Background = (function () {
	function Background () {
		var  s = this;
		LExtends(s, LSprite, []);

		s.bmp = new LBitmap(new LBitmapData(dataList["bg"]));
		s.bmpW = s.bmp.getWidth();
		s.bmpH = s.bmp.getHeight();

		var ln = 4;

		for (var i = 0, xI = 0, yI = 0; i < ln * ln; i++) {
			var b = s.bmp.clone();
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