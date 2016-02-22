var Aircraft = (function () {
	function Aircraft (bmpd, frameList) {
		var  s = this;
		LExtends(s, LSprite, []);

		s.angle = 0;
		s.step = 0;
		s.useTween = false;
		s.isPlayer = false;
		s.isShoot = false;
		s.shootIndex = 0;
		s.shootSpeed = null;
		s.bulletStyle = null;
		s.bulletStep = null;
		s.bulletNum = null;
		s.shootRange = null;

		s.animation = new LAnimationTimeline(bmpd, frameList);
		s.animation.x = -bmpd.width / 2;
		s.animation.y = -bmpd.height / 2;
		s.addChild(s.animation);

		s.animation.play();
	}

	Aircraft.prototype.moveTowards = function (a) {
		this.angle = a;
	};

	Aircraft.prototype.loop = function (e) {
		var s = e.currentTarget;

		var rad = s.angle * Math.PI / 180;

		s.x += s.step * Math.cos(rad);
		s.y += s.step * Math.sin(rad);

		if (!s.useTween) {
			s.rotate = s.angle;
		} else {
			LTweenLite.to(s, 0.5, {
				rotate : s.angle,
				ease : LEasing.Quad.easeOut
			});
		}

		if (s.isShoot && s.shootSpeed && s.bulletNum && s.bulletStep && s.bulletStyle) {
			if (s.shootIndex++ < s.shootSpeed) {
				return;
			}

			s.shootIndex = 0;

			s.addBullet();
		}
	};

	Aircraft.prototype.addBullet = function () {
		var s = this,
		bulletNum = s.bulletNum,
		d = 20,
		p = d * (bulletNum - 1) / 2,
		rad = (s.angle / 180) * Math.PI;

		for (var i = 0; i < bulletNum; i++) {
			var b = new Bullet(s.bulletStyle, s.angle, s.bulletStep, s.shootRange);
			b.x = s.x + p * Math.sin(rad);
			b.y = s.y - p * Math.cos(rad);
			gameLayer.bulletLayer.addChild(b);
			
			p -= d;
		}
	};

	return Aircraft;
})();