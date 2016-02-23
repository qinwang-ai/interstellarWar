var HpBar = (function () {
	function HpBar (hp) {
		var  s = this;
		LExtends(s, LSprite, []);

		s.originHp = hp;

		var hpTxt = new LTextField();
		hpTxt.size = 40;
		hpTxt.y = 5;
		hpTxt.weight = "bold";
		hpTxt.text = "HP";
		s.addChild(hpTxt);

		var barLayer = new LSprite();
		barLayer.x = hpTxt.getWidth() + 10;
		barLayer.alpha = 0.7;
		s.addChild(barLayer);

		var bmp = new LBitmap(new LBitmapData(dataList["bar"]));
		bmp.scaleX = 0.6
		bmp.scaleY = 0.6;
		barLayer.addChild(bmp);

		s.barW = bmp.getWidth();
		s.barH = bmp.getHeight();

		var mask = new LShape();
		mask.x = barLayer.x;
		mask.graphics.drawRoundRect(2, "#000000", [0, 0, s.barW, s.barH, 10]);
		barLayer.mask = mask;

		s.barContent = new LShape();
		barLayer.addChild(s.barContent);

		s.update(hp);
	}

	HpBar.prototype.update = function (v) {
		var s = this;

		s.barContent.graphics.clear();
		s.barContent.graphics.drawRect(0, "", [0, 0, s.barW * (v / s.originHp), s.barH], true, "#FF0000");
	};

	return HpBar;
})();