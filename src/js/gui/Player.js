var Player = (function () {
	function Player () {
		var  s = this;
		var bmpd = new LBitmapData(dataList["player"]),
		frameList = aircraft_animation_data["player"];
		LExtends(s, Aircraft, [bmpd, frameList]);

		s.step = 7;
		s.angle = -90;
		s.atkAngle = s.angle;
		s.isShoot = false;
		s.isPlayer = true;
		s.shootSpeed = 10;
		s.shootRange = 900;
		s.bulletStyle = 1;
		s.bulletStep = 15;
		s.bulletNum = 4;
		s.hp = 50;
		s.isHit = false;
	}

	Player.prototype.loop = function () {
		var s = this, bg = gameLayer.bg, rml = new Array();
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

		s.rotate = s.atkAngle;

		if (gameLayer.quadTree && gameLayer.aircraftLayer) {
			var cl = gameLayer.quadTree.getDataInRect(new LRectangle(s.x - 150, s.y - 150, s.w + 300, s.h + 300));
			var notHitNum = 0;

			for (var i = 0, l = cl.length; i < l; i++) {
				var o = cl[i];

				if (o.objectIndex == s.objectIndex) {
					continue;
				}

				if (s.hitTestObject(o)) {
					if (!s.isHit) {
						if (o.reduceHp(3)) {
							rml.push(o);
						}

						if (s.reduceHp(3)) {
							rml.push(s);
						}
					}
				} else {
					notHitNum++;
				}
			}

			if (notHitNum >= cl.length - 1) {
				s.isHit = false;
			} else {
				s.isHit = true;
			}

			for (var j = 0, m = rml.length; j < m; j++) {
				rml[j].remove();

				gameLayer.quadTree.remove(o);
			}
		}
	};

	Player.prototype.remove = function () {
		var s = this;

		s.callParent("remove", arguments);

		if (gameLayer) {
			gameLayer.gameOver();
		}
	};

	Player.prototype.reduceHp = function (v) {
		var s = this;

		var v = s.callParent("reduceHp", arguments);

		if (gameLayer) {
			gameLayer.hpTxt.text = "Hp: " + s.hp;
		}

		return v;
	};

	return Player;
})();
