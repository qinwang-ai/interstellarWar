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
		s.hpBar = null;
		s.addEnemySpeed = 45;
		s.addEnemyIndex = 0;
		s.isPause = false;
		s.pauseLayer = null;
		s.point = 0;
		s.pointTxt = null;
		s.skillList = new Array();

		s.createBg();
		s.createQuadTree();

		s.bulletLayer = new LSprite();
		s.sceneLayer.addChild(s.bulletLayer);

		s.aircraftLayer = new LSprite();
		s.sceneLayer.addChild(s.aircraftLayer);

		s.createPauseLayer();
		s.createPlayer();
		s.createHpBar();
		s.createSkillBtnLayer();
		s.createPointTxt();
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

	GameLayer.prototype.createHpBar = function () {
		var s = this;

		s.hpBar = new HpBar(s.player.hp);
		s.hpBar.x = 20;
		s.hpBar.y = 20;
		s.overLayer.addChild(s.hpBar);
	};

	GameLayer.prototype.createBg = function () {
		var s = this;

		s.bg = new Background();
		s.sceneLayer.addChild(s.bg);
	};

	GameLayer.prototype.createPauseLayer = function () {
		var s = this;
		s.pauseLayer = new LSprite();
		s.pauseLayer.visible = false;
		s.pauseLayer.alpha = 1;
		s.pauseLayer.graphics.drawRect(0, "", [0, 0, LGlobal.width, LGlobal.height]);
		s.overLayer.addChild(s.pauseLayer);

		var hint = new LTextField();

		hint.text = "";
		hint.size = 50;
		hint.color = "black";
		hint.textAlign = "center";
		hint.textBaseline = "middle";
		hint.x = LGlobal.width / 2;
		hint.y = LGlobal.height / 2;
		s.pauseLayer.addChild(hint);
	};

	// TODO 优化
	GameLayer.prototype.setHintText = function( pauseHintText){
		gameLayer.pauseLayer.childList[0].text = pauseHintText;
	};

	GameLayer.prototype.createPlayer = function () {
		var s = this;

		s.player = new Player();
		s.player.x = s.bg.w / 2;
		s.player.y = s.bg.h / 2;
		s.aircraftLayer.addChild(s.player);

		s.quadTree.add(s.player, s.player.x, s.player.y);
	};

	GameLayer.prototype.createSkillBtnLayer = function () {
		var s = this, toY = 0;

		var skillBtnLayer = new LSprite();
		skillBtnLayer.x = 830;
		skillBtnLayer.y = 300;
		s.overLayer.addChild(skillBtnLayer);

		for (var k in skill_data) {
			var d = skill_data[k];

			var skillBtn = new SkillButton(k, d.delay, d.effect);
			skillBtn.y = toY;
			skillBtnLayer.addChild(skillBtn);

			s.skillList.push(skillBtn);

			toY += 120;
		}
	};

	GameLayer.prototype.createPointTxt = function () {
		var s = this;

		s.pointTxt = new LTextField();
		s.pointTxt.size = 40;
		s.pointTxt.text = s.point;
		s.pointTxt.textAlign = "center";
		s.pointTxt.x = LGlobal.width / 2;
		s.pointTxt.y = 30;
		s.overLayer.addChild(s.pointTxt);
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

		s.pauseLayer.visible = s.isPause;

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

		if (!isStartGame) {
			return;
		}

		isStartGame = false;
		soundBack.stop();
		soundPlayerDead.play();

		s.player = null;

		var curtain = new LShape();
		curtain.alpha = 0;
		curtain.graphics.drawRect(0, "", [0, 0, LGlobal.width, LGlobal.height], true, "#000000");
		s.addChild(curtain);

		LTweenLite.to(curtain, 3, {
			alpha : 0.6,
			onComplete : function () {
				var temp = new LTextField();
				temp.color = "white";
				temp.textAlign = "center";
				temp.x = LGlobal.width / 2;
				temp.alpha = 0;

				var title = temp.clone();
				title.text = "Game Over~";
				title.size = 60;
				title.textBaseline = "middle";
				title.y = 270;
				title.weight = "bold";
				s.addChild(title);

				var pointTxt = temp.clone();
				pointTxt.lineColor = "#CCCCCC";
				pointTxt.lineWidth = 2;
				pointTxt.stroke = true;
				pointTxt.text = "Final Point: " + s.point;
				pointTxt.y = 340;
				pointTxt.size = 40;
				s.addChild(pointTxt);

				var rankingTxt = temp.clone();
				rankingTxt.size = 40;
				rankingTxt.text = "Getting Ranking...";
				rankingTxt.y = 410;
				s.addChild(rankingTxt);

				LAjax.post(
					"http://yuehaowang.applinzi.com/ranking",
					{
						cmd : "set",
						gameName : "interstellarWar",
						level : 0,
						sortMethod : "DESC",
						username : "id" + Math.floor(Math.random() * 100000) + (new Date()).getTime(),
						grade : parseInt(s.point)
					},
					function (d) {
						var ranking = GameLayer.getStr(d);

						if (ranking > 10000) {
							ranking = "> 10000";
						}

						s.ranking = ranking;

						rankingTxt.text = "Universe Ranking: " + ranking;
					},
					function () {
						rankingTxt.text = "Error! Please check your Network.";
					}
				);

				var hint = temp.clone();
				hint.text = "Rotate Your Index Finger Counterclockwise to Restart";
				hint.size = 30;
				hint.y = 480;
				s.addChild(hint);
				
				LTweenLite.to(title, 1, {
					alpha : 1,
					y : title.y - 50
				});

				LTweenLite.to(pointTxt, 1, {
					alpha : 1,
					y : pointTxt.y - 60
				});

				LTweenLite.to(rankingTxt, 1, {
					alpha : 1,
					y : rankingTxt.y - 70
				});

				LTweenLite.to(hint, 1, {
					alpha : 1,
					y : hint.y - 80
				});
			}
		});
	};

	GameLayer.getStr = function (data) {
		var splitList = data.split("<script");

		data = splitList[0];

		return data;
	};

	return GameLayer;
})();
