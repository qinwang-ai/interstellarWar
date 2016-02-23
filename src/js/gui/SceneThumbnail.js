var SceneThumbnail = (function () {
	function SceneThumbnail (bg) {
		var  s = this;
		LExtends(s, LSprite, []);

		s.w = 200;
		s.h = s.w * (bg.h / bg.w);
		s.ratio = s.w / bg.w;

		var bg = new LShape();
		bg.alpha = 0.5;
		bg.graphics.drawRect(2, "#BBBBBB", [0, 0, s.w, s.h], true, "#EEEEEE");
		s.addChild(bg);

		s.drawLayer = new LSprite();
		s.addChild(s.drawLayer);

		var mask = new LShape();
		mask.graphics.drawRect(2, "#BBBBBB", [0, 0, s.w, s.h]);

		s.drawLayer.mask = mask;
	}

	SceneThumbnail.prototype.update = function (d) {
		var s = this;

		s.drawLayer.graphics.clear();

		s.drawLayer.graphics.add(function () {
			var c = LGlobal.canvas;

			for (var i = 0, l = d.length; i < l; i++) {
				var o = d[i], r = 3;

				c.beginPath();

				if (o.isPlayer) {
					c.fillStyle = "#87E22E";

					r = 5;
				} else {
					if (o.style == 1) {
						c.fillStyle = "#FD9720";
					} else if (o.style == 2) {
						c.fillStyle = "#54D9EF";
					}else if (o.style == 3) {
						c.fillStyle = "#A349A4";
						
						r = 4;
					}
				}

				c.arc(o.x * s.ratio, o.y * s.ratio, r, 0, Math.PI * 2);
				c.fill();
			}
		});
	};

	return SceneThumbnail;
})();