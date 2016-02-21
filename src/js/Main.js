LInit(1000 / 60, "mygame", 800, 480, main);

var dataList;
var stageLayer;

function main () {
	LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
	LGlobal.screen(LGlobal.FULL_SCREEN);

	loadResource();
}

function loadResource () {
	var loadList = [
		{name : "bg", path : "./images/bg.png"}
	];

	LLoadManage.load(loadList, null, function (result) {
		gameInit(result);
	});
}

function gameInit (result) {
	dataList = result;

	stageLayer = new LSprite();
	addChild(stageLayer);

	var bg = new LBitmap(new LBitmapData(dataList["bg"]));
	stageLayer.addChild(bg);

	var txt = new LTextField();
	txt.text = "Hello Interstellar War";
	txt.size = 40;
	txt.x = (LGlobal.width - txt.getWidth()) / 2;
	txt.y = (LGlobal.height - txt.getHeight()) / 2;
	stageLayer.addChild(txt);
}