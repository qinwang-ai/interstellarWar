var Player = (function () {
	function Player () {
		var  s = this;
		var bmpd = new LBitmapData(dataList["player"]),
		frameList = aircraft_animation_data["player"];
		LExtends(s, Aircraft, [bmpd, frameList]);

		s.step = 5;
		s.angle = -90;
		s.isPlayer = true;
		s.isShoot = true;
		s.bulletStyle = 1;
		s.bulletStep = 15;

		s.addEventListener(LEvent.ENTER_FRAME, s.loop);
	}

	Player.prototype.loop = function (e) {
		var s = e.currentTarget, bg = s.parent.parent.parent.bg;
		leftEdge = bg.x + 80,
		rightEdge = bg.x + bg.w - 80,
		topEdge = bg.y + 80,
		bottomEdge = bg.y + bg.h - 80;

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

		s.callParent("loop", arguments);
	};

	Player.prototype.addBullet = function () {
		var s = this,
		bulletNum = 4,
		d = 20,
		p = d * ((bulletNum / 2) >>> 0),
		rad = (s.angle / 180) * Math.PI;

		for (var i = 0; i < bulletNum; i++) {
			var b = new Bullet(s.bulletStyle, s.angle, s.bulletStep);
			b.x = s.x + p * Math.sin(rad);
			b.y = s.y - p * Math.cos(rad);
			s.parent.parent.parent.bulletLayer.addChild(b);
			
			p -= d;
		}
	}

	return Player;
})();