var Bullet = (function () {
	function Bullet (style, angle, step, shootRange, belongToPlayer) {
		var  s = this;
		LExtends(s, LSprite, []);

		s.belongToPlayer = belongToPlayer || false;

		if(s.belongToPlayer){
			soundBullet.play();
		}
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
	}

	Bullet.prototype.loop = function () {
		var s = this, bg = gameLayer.bg, rml = new Array(), m = 10;

		s.x += s.stepX;
		s.y += s.stepY;

		s.rotate = s.angle;

		s.changeX += s.stepX;
		s.changeY += s.stepY;

		if (gameLayer.quadTree) {
			var cl = gameLayer.quadTree.getDataInRect(new LRectangle(s.x - 20, s.y - 20, 68, 52));

			for (var i = 0, l = cl.length; i < l; i++) {
				var o = cl[i];

				if (s.hitTestObject(o) && o.isPlayer == !s.belongToPlayer) {
					if (o.reduceHp(1)) {
						rml.push(o);
					}

					s.remove();
				}
			}

			for (var j = 0, m = rml.length; j < m; j++) {
				var item = rml[j];

				gameLayer.quadTree.remove(item);

				item.remove();
			}
		}

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
