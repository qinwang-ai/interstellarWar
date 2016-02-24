var Aircraft = (function () {
	function Aircraft (bmpd, frameList) {
		var  s = this;
		LExtends(s, LSprite, []);

		s.angle = 0;
		s.atkAngle = 0;
		s.step = 0;
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

		s.w = bmpd.width;
		s.h = bmpd.height;

		s.animation.play();
	}

	Aircraft.prototype.addShapes = function (li) {
		var s = this, res = new Array();

		for (var i = 0, l = li.length; i < l; i++) {
			var item = li[i];

			res.push({type : LShape.RECT, arg : item});
		}

		s.animation.callParent("addShapes", [res]);
	};

	Aircraft.prototype.moveTowards = function (a) {
		this.angle = a;
	};

	Aircraft.prototype.atkTowards = function (a) {
		this.atkAngle = a;
	};

	Aircraft.prototype.moveStep = function (a) {
		this.step = a;
	};

	Aircraft.prototype.loop = function () {
		var s = this;

		if (gameLayer.quadTree) {
			gameLayer.quadTree.remove(s);
			gameLayer.quadTree.add(s, s.x, s.y);
		}

		var rad = s.angle * Math.PI / 180;

		s.x += s.step * Math.cos(rad);
		s.y += s.step * Math.sin(rad);

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
			var b = new Bullet(s.bulletStyle, s.atkAngle, s.bulletStep, s.shootRange, s.isPlayer);
			b.x = s.x + p * Math.sin(rad);
			b.y = s.y - p * Math.cos(rad);
			gameLayer.bulletLayer.addChild(b);

			p -= d;
		}
	};

	Aircraft.prototype.reduceHp = function (v) {
		var s = this;

		s.hp -= v;

		if (s.hp <= 0) {
			if (gameLayer && gameLayer.sceneLayer) {
				var bmpd = new LBitmapData(dataList["explosion"]),
				frameList = LGlobal.divideCoordinate(468, 125, 1, 4);
				var explosion = new LAnimationTimeline(bmpd, frameList);
				explosion.scaleX = s.w / bmpd.width;
				explosion.scaleY = s.h / bmpd.height;
				explosion.x = s.x - s.w / 2;
				explosion.y = s.y - s.h / 2;
				explosion.speed = 3;
				gameLayer.sceneLayer.addChild(explosion);

				explosion.play();

				if(s.isPlayer) {
					soundPlayerDead.play();
				} else {
					if( s.style == 3){
						soundBigEnemyDead.play();
					} else {
						soundEnemyDead.play();
					}
				}

				explosion.addEventListener(LEvent.COMPLETE, function () {
					explosion.remove();
				});
			}

			return true;
		}

		LTweenLite.to(s, 0.1, {
			alpha : 0.2,
			ease : LEasing.Quad.easeIn
		}).to(s, 0.1, {
			alpha : 1,
			ease : LEasing.Quad.easeOut
		});

		return false;
	};

	return Aircraft;
})();
