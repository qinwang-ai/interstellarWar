var Enemy = (function () {
	function Enemy (style) {
		var  s = this;
		var name = "enemy" + style;
		var bmpd = new LBitmapData(dataList[name]),
		frameList = aircraft_animation_data[name];
		LExtends(s, Aircraft, [bmpd, frameList]);

		if (style == 1) {
			s.step = 3;
		} else if (style == 2) {
			s.step = 8;
		} else if (style == 3) {
			s.step = 5;
		}

		s.data = enemy_data[name];
		s.useTween = true;
		s.findPathIndex = 0;
		s.bulletStyle = 2;
		s.step = s.data.step;
		s.findPathSpeed = s.data.findPathSpeed;
		s.bulletNum = s.data.bulletNum;
		s.sightRange = s.data.sightRange;
		s.shootRange = s.data.shootRange;
		s.shootSpeed = s.data.shootSpeed;
		s.bulletStep = s.data.bulletStep;

		s.addEventListener(LEvent.ENTER_FRAME, s.loop);
	}

	Enemy.prototype.getRandomPosition = function () {
		var s = this, bg = gameLayer.bg, rand = Math.random(), m = 100;

		if (rand < 0.5) {
			s.x = m + Math.floor(Math.random() * (bg.w - m * 2));
			
			if (rand < 0.25) {
				s.y = m;
			} else {
				s.y = bg.h - m;
			}
		} else {
			s.y = m + Math.floor(Math.random() * (bg.h - m * 2));
			
			if (rand < 0.75) {
				s.x = m;
			} else {
				s.x = bg.w - m;
			}
		}

		s.angle = Math.atan2(bg.h / 2 - s.y, bg.w / 2 - s.x) * 180 / Math.PI;
	};

	Enemy.prototype.loop = function (e) {
		var s = e.currentTarget, bg = gameLayer.bg, m = 100;

		s.callParent("loop", arguments);

		if (s.findPathIndex++ < s.findPathSpeed) {
			return;
		}

		s.findPathIndex = 0;

		if (Math.random() < 0.5) {
			s.angle += Math.floor(Math.random() * 40);
		} else {
			s.angle -= Math.floor(Math.random() * 40)
		}

		if (s.x < -m || s.x > bg.w + m || s.y < -m || s.y > bg.h + m) {
			s.remove();
		}
	};

	return Enemy;
})();