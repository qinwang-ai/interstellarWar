var GameLayer = (function () {
	function GameLayer (index) {
		var  s = this;
		LExtends(s, LSprite, []);

		s.sceneLayer = new LSprite();
		s.addChild(s.sceneLayer);

		s.overLayer = new LSprite();
		s.addChild(s.overLayer);

		s.bg = null;
		s.quadTree = null;
		s.player = null;
		s.hpTxt = null;
		s.addEnemySpeed = 45;
		s.addEnemyIndex = 0;
		s.isPause = false;

		s.createBg();
		s.createQuadTree();

		s.bulletLayer = new LSprite();
		s.sceneLayer.addChild(s.bulletLayer);

		s.aircraftLayer = new LSprite();
		s.sceneLayer.addChild(s.aircraftLayer);

		s.createPlayer();
		s.createHpTxt();
		s.createSceneThumbnail();

		s.sceneLayer.addEventListener(LMouseEvent.MOUSE_MOVE, function (e) {
			if (!s.player) {
				return;
			}
			var sx = (e.selfX - s.player.x), sy = -(e.selfY - s.player.y);

			s.player.moveTowards(-Math.atan2(sy, sx) * 180 / Math.PI);
			s.player.atkTowards(s.player.angle);
		});

		s.sceneLayer.addEventListener(LMouseEvent.MOUSE_DOWN, function (e) {
			if (!s.player) {
				return;
			}
			var sx = (e.selfX - s.player.x), sy = -(e.selfY - s.player.y);

			s.player.moveTowards(Math.atan2(sy, sx) * 180 / Math.PI);
			s.player.atkTowards(s.player.angle);
		});

		s.addEventListener(LEvent.ENTER_FRAME, s.loop);
	}

	GameLayer.prototype.createQuadTree = function () {
		var s = this;

		s.quadTree = new LQuadTree(new LRectangle(0, 0, s.bg.w, s.bg.h));
		s.quadTree.createChildren(3);
	};

	GameLayer.prototype.createHpTxt = function () {
		var s = this;

		s.hpTxt = new LTextField();
		s.hpTxt.size = 30;
		s.hpTxt.text = "Hp: " + s.player.hp;
		s.hpTxt.x = 20;
		s.hpTxt.y = LGlobal.height - s.hpTxt.getHeight() - 20;
		s.overLayer.addChild(s.hpTxt);
	};

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
		s.aircraftLayer.addChild(s.player);

		s.quadTree.add(s.player, s.player.x, s.player.y);
	};

	GameLayer.prototype.createSceneThumbnail = function () {
		var s = this;

		s.sceneThumbnail = new SceneThumbnail(s.bg);
		s.sceneThumbnail.x = LGlobal.width - s.sceneThumbnail.w - 20;
		s.sceneThumbnail.y = 20;
		s.overLayer.addChild(s.sceneThumbnail);
	};

	GameLayer.prototype.loop = function (e) {
		var s = e.currentTarget, i, l;

		if (s.isPause) {
			return;
		}

		for (i = 0, l = s.bulletLayer.numChildren; i < l; i++) {
			var o = s.bulletLayer.getChildAt(i);

			if (o) {
				o.loop();
			}
		}

		for (i = 0, l = s.aircraftLayer.numChildren; i < l; i++) {
			var o = s.aircraftLayer.getChildAt(i);

			if (o) {
				o.loop();
			}
		}

		if (s.player) {
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
		}

		s.sceneThumbnail.update(s.aircraftLayer.childList);

		if (s.addEnemyIndex++ < s.addEnemySpeed) {
			return;
		}

		s.addEnemyIndex = 0;

		var rand = Math.random(), index;

		if (rand < 0.6) {
			index = 1;
		} else if (rand < 0.9) {
			index = 2;
		} else {
			index = 3;
		}

		var enemy = new Enemy(index);
		s.aircraftLayer.addChild(enemy);
		enemy.getRandomPosition();

		s.quadTree.add(enemy, enemy.x, enemy.y);
	};

	GameLayer.prototype.gameOver = function () {
		var s = this;

		s.player = null;

		var curtain = new LShape();
		curtain.alpha = 0;
		curtain.graphics.drawRect(0, "", [0, 0, LGlobal.width, LGlobal.height], true, "#000000");
		s.addChild(curtain);

		LTweenLite.to(curtain, 3, {
			alpha : 0.6,
			onComplete : function () {
				var hint = new LTextField();
				hint.color = "white";
				hint.text = "Game Over~";
				hint.size = 50;
				hint.textAlign = "center";
				hint.textBaseline = "middle";
				hint.x = LGlobal.width / 2;
				hint.y = LGlobal.height / 2;
				s.addChild(hint);
			}
		});
	};

	return GameLayer;
})();