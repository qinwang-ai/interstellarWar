var Bullet = (function () {
	function Bullet (style, angle, step) {
		var  s = this;
		LExtends(s, LSprite, []);

		var bmp = new LBitmap(new LBitmapData(dataList["bullet" + style]));
		bmp.x = -bmp.getWidth() / 2;
		bmp.y = -bmp.getHeight() / 2;
		s.addChild(bmp);

		var rad = angle * Math.PI / 180;
		
		s.angle = angle;
		s.stepX = step * Math.cos(rad);
		s.stepY = step * Math.sin(rad);

		s.addEventListener(LEvent.ENTER_FRAME, s.loop);
	}

	Bullet.prototype.loop = function (e) {
		var s = e.currentTarget, bg = gameLayer.bg, m = 10;

		s.x += s.stepX;
		s.y += s.stepY;

		s.rotate = s.angle;

		if (s.x < -m || s.x > bg.w + m || s.y < -m || s.y > bg.h + m) {
			s.remove();
		}
	};

	return Bullet;
})();