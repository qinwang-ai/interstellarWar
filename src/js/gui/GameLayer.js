var GameLayer = (function () {
	function GameLayer (index) {
		var  s = this;
		LExtends(s, LSprite, []);

		player = null;

		s.bg = new Background();
		s.addChild(s.bg);

		s.x = s.bg 

		s.player = null;
		s.enemyLayer = null;

		s.addEnemySpeed = 45;
		s.addEnemyIndex = 0;

		s.moveToCenter();
		s.createPlayer();
		s.createEnmeyLayer();

		s.addEventListener(LMouseEvent.MOUSE_MOVE, function (e) {
			var sx = (e.selfX - s.player.x), sy = -(e.selfY - s.player.y);

			s.player.moveTowards(-Math.atan2(sy, sx) * 180 / Math.PI);
		});

		s.addEventListener(LMouseEvent.MOUSE_DOWN, function (e) {
			var sx = (e.selfX - s.player.x), sy = -(e.selfY - s.player.y);

			s.player.moveTowards(Math.atan2(sy, sx) * 180 / Math.PI);
		});

		s.addEventListener(LEvent.ENTER_FRAME, s.loop);
	}

	GameLayer.prototype.moveToCenter = function () {
		var s = this;

		s.x -= s.bg.bmpW * 2;
		s.y -= s.bg.bmpH * 2;
	};

	GameLayer.prototype.createPlayer = function () {
		var s = this;

		s.player = new Player();
		s.player.x = s.bg.w / 2;
		s.player.y = s.bg.h / 2;
		s.addChild(s.player);

		player = s.player;
	};

	GameLayer.prototype.createEnmeyLayer = function () {
		var s = this;
		
		s.enemyLayer = new LSprite();
		s.addChild(s.enemyLayer);
	};

	GameLayer.prototype.loop = function (e) {
		var s = e.currentTarget;

		s.x = LGlobal.width / 2 - s.player.x;
		s.y = LGlobal.height / 2 - s.player.y;

		var maxX = 0, minX = LGlobal.width - s.bg.w;
		var maxY = 0, minY = LGlobal.height - s.bg.h;

		if (s.x < minX) {
			s.x = minX;
		} else if (s.x > maxX) {
			s.x = maxX;
		}

		if (s.y < minY) {
			s.y = minY;
		} else if (s.y > maxY) {
			s.y = maxY;
		}

		if (s.addEnemyIndex++ < s.addEnemySpeed) {
			return;
		}

		s.addEnemyIndex = 0;

		// var enemy = new Enemy(1);
		// s.enemyLayer.addChild(enemy);
	};

	return GameLayer;
})();