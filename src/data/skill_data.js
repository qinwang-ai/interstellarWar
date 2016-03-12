var skill_data = {
	bomb : {
		delay : 30,
		effect : function () {
			if (gameLayer && gameLayer.overLayer) {
				var effectLayer = new LShape();
				effectLayer.graphics.drawRect(0, "", [0, 0, LGlobal.width, LGlobal.height], true, "white");
				gameLayer.overLayer.addChild(effectLayer);

				LTweenLite.to(effectLayer, 0.2, {
					alpha : 0.2
				}).to(effectLayer, 0.2, {
					alpha : 0.8
				}).to(effectLayer, 0.2, {
					alpha : 0.2
				}).to(effectLayer, 0.2, {
					alpha : 0.8
				}).to(effectLayer, 0.2, {
					alpha : 0.2
				}).to(effectLayer, 0.2, {
					alpha : 0.8,
					onComplete : function () {
						effectLayer.remove();

						if (gameLayer.player) {
							gameLayer.player.useBomb();
						}
					}
				});
			}
		}
	}

	// flash : {
	// 	delay : 20,
	// 	effect : function () {
	// 		if (gameLayer && gameLayer.player) {
	// 			gameLayer.player.originStep = gameLayer.player.step;
	//
	// 			gameLayer.player.step *= 1.5;
	//
	// 			var timer = new LTimer(10000, 1);
	// 			timer.addEventListener(LTimerEvent.TIMER_COMPLETE, function () {
	// 				if (gameLayer.player) {
	// 					gameLayer.player.step = gameLayer.player.originStep;
	//
	// 					delete gameLayer.player.originStep;
	// 				}
	// 			});
	// 			timer.start();
	// 		}
	// 	}
	// }
};
