var Enemy = (function () {
	function Enemy (style) {
		var  s = this;
		var bmpd = new LBitmapData(dataList["enemy" + style]),
		frameList = aircraft_animation_data["enemy" + style];
		LExtends(s, Aircraft, [bmpd, frameList]);

		s.index = null;
		s.useTween = true;
		s.step = 3;
		s.angle = 0;
		s.findPathSpeed = 20;
		s.findPathIndex = 0;

		s.addEventListener(LEvent.ENTER_FRAME, s.loop);
	}

	Enemy.prototype.getRandomPosition = function () {
		var s = this, bg = s.parent.parent.bg, rand = Math.random(), m = 100;

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

		s.angle = Math.atan2(-(s.y - bg.h / 2), -(s.x - bg.w / 2)) * 180 / Math.PI;
	};

	Enemy.prototype.loop = function (e) {
		var s = e.currentTarget, gameLayer = s.parent.parent, bg = gameLayer.bg;

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

		if (s.x < -100 || s.x > bg.w + 100 || s.y < -100 || s.y > bg.h + 100) {
			s.remove();

			if (s.index != null) {
				gameLayer.enemyList.splice(s.index, 1);
			}
		}
	};

	return Enemy;
})();