var Bullet = (function () {
	function Bullet (style, angle, step, shootRange) {
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
		s.changeX = 0;
		s.changeY = 0;
		s.shootRange = shootRange;

		s.addEventListener(LEvent.ENTER_FRAME, s.loop);
	}

	Bullet.prototype.loop = function (e) {
		var s = e.currentTarget, bg = gameLayer.bg, m = 10;

		s.x += s.stepX;
		s.y += s.stepY;

		s.rotate = s.angle;

		s.changeX += s.stepX;
		s.changeY += s.stepY;

		if (s.shootRange) {
			if (Math.sqrt(s.changeY * s.changeY + s.changeX * s.changeX) > s.shootRange) {
				s.remove();
			}

			return;
		}

		if (s.x < -m || s.x > bg.w + m || s.y < -m || s.y > bg.h + m) {
			s.remove();
		}
	};

	return Bullet;
})();