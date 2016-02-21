var GameLayer = (function () {
	function GameLayer (index) {
		var  s = this;
		LExtends(s, LSprite, []);

		player = null;

		var bg = new LBitmap(new LBitmapData(dataList["bg"]));
		s.addChild(bg);

		s.player = null;
		s.enemyLayer = null;

		s.addEnemySpeed = 45;
		s.addEnemyIndex = 0;

		s.createPlayer();
		s.createEnmeyLayer();

		s.addEventListener(LMouseEvent.MOUSE_MOVE, function (e) {
			s.player.moveTo(e.selfX, e.selfY);
			s.player.setRotation(Math.atan((player.y - e.selfY) / (player.x - e.selfX)) * 180 / Math.PI);
		});

		s.addEventListener(LEvent.ENTER_FRAME, s.loop);
	}

	GameLayer.prototype.createPlayer = function () {
		var s = this;

		s.player = new Player();
		s.player.x = 30;
		s.player.y = (LGlobal.height - s.player.getHeight()) / 2;
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

		if (s.addEnemyIndex++ < s.addEnemySpeed) {
			return;
		}

		s.addEnemyIndex = 0;

		var enemy = new Enemy(1);
		enemy.x = LGlobal.width + 100;
		enemy.y = 100 + ((Math.random() * (LGlobal.height - 100)) >>> 0);
		s.enemyLayer.addChild(enemy);
	};

	return GameLayer;
})();