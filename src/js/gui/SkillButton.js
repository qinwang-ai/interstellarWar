var SkillButton = (function () {
	function SkillButton (img, t, effect) {
		var  s = this;
		LExtends(s, LSprite, []);

		var bmp = new LBitmap(new LBitmapData(dataList[img]));
		s.addChild(bmp);

		s.effect = effect;
		s.delay = t;

		s.startDelay();

		s.addEventListener(LMouseEvent.MOUSE_UP, function () {
			if (s.alpha < 1) {
				return;
			}

			s.effect();

			s.startDelay();
		});
	}

	SkillButton.prototype.startDelay = function () {
		var s = this;

		s.alpha = 0.2;

		LTweenLite.to(s, s.delay, {
			alpha : 0.8,
			onComplete : function () {
				LTweenLite.to(s, 0.2, {
					alpha : 0.2
				}).to(s, 0.2, {
					alpha : 0.9
				}).to(s, 0.2, {
					alpha : 0.2
				}).to(s, 0.2, {
					alpha : 0.9
				}).to(s, 0.2, {
					alpha : 0.2
				}).to(s, 0.2, {
					alpha : 0.9
				}).to(s, 0.2, {
					alpha : 0.2
				}).to(s, 0.2, {
					alpha : 0.9
				}).to(s, 0.2, {
					alpha : 0.2
				}).to(s, 0.2, {
					alpha : 0.9,
					onComplete : function () {
						s.alpha = 1;
					}
				});
			}
		});
	};

	return SkillButton;
})();