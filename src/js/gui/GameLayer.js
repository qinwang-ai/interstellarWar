var GameLayer = (function () {
	function GameLayer (index) {
		var  s = this;
		LExtends(s, LSprite, []);

		player = null;

		s.sceneLayer = new LSprite();
		s.addChild(s.sceneLayer);

		s.overLayer = new LSprite();
		s.addChild(s.overLayer);

		s.bg = null;
		s.player = null;

		s.enemyList = [];

		s.addEnemySpeed = 45;
		s.addEnemyIndex = 0;

		s.createBg();
		s.createPlayer();
		s.createSceneThumbnail();

		s.sceneLayer.addEventListener(LMouseEvent.MOUSE_MOVE, function (e) {
			var sx = (e.selfX - s.player.x), sy = -(e.selfY - s.player.y);

			s.player.moveTowards(-Math.atan2(sy, sx) * 180 / Math.PI);
		});

		s.sceneLayer.addEventListener(LMouseEvent.MOUSE_DOWN, function (e) {
			var sx = (e.selfX - s.player.x), sy = -(e.selfY - s.player.y);

			s.player.moveTowards(Math.atan2(sy, sx) * 180 / Math.PI);
		});

		s.addEventListener(LEvent.ENTER_FRAME, s.loop);
	}

	GameLayer.prototype.createBg = function () {
		var s = this;

		s.bg = new Background();
		s.sceneLayer.addChild(s.bg);
	};

	GameLayer.prototype.createPlayer = function () {
		var s = this;

		s.player = new Player();
		s.player.x = s.bg.w / 2;
		s.player.y = s.bg.h / 2;
		s.sceneLayer.addChild(s.player);

		player = s.player;
	};

	GameLayer.prototype.createSceneThumbnail = function () {
		var s = this;

		s.sceneThumbnail = new SceneThumbnail(s.bg);
		s.sceneThumbnail.x = LGlobal.width - s.sceneThumbnail.w - 20;
		s.sceneThumbnail.y = 20;
		s.overLayer.addChild(s.sceneThumbnail);
	};

	GameLayer.prototype.loop = function (e) {
		var s = e.currentTarget;

		s.sceneLayer.x = LGlobal.width / 2 - s.player.x;
		s.sceneLayer.y = LGlobal.height / 2 - s.player.y;

		var maxX = 0, minX = LGlobal.width - s.bg.w;
		var maxY = 0, minY = LGlobal.height - s.bg.h;

		if (s.sceneLayer.x < minX) {
			s.sceneLayer.x = minX;
		} else if (s.sceneLayer.x > maxX) {
			s.sceneLayer.x = maxX;
		}

		if (s.sceneLayer.y < minY) {
			s.sceneLayer.y = minY;
		} else if (s.sceneLayer.y > maxY) {
			s.sceneLayer.y = maxY;
		}

		s.sceneThumbnail.update(s.sceneLayer.childList);

		if (s.addEnemyIndex++ < s.addEnemySpeed) {
			return;
		}

		s.addEnemyIndex = 0;

		var enemy = new Enemy(1);
		enemy.index = s.enemyList.length;
		s.sceneLayer.addChild(enemy);
		enemy.getRandomPosition();

		s.enemyList.push(enemy);
	};

	return GameLayer;
})();