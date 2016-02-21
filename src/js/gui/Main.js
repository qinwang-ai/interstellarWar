LInit(1000 / 60, "mygame", 800, 480, main);

var dataList;
var stageLayer;
var player;

function main () {
	LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
	LGlobal.screen(LGlobal.FULL_SCREEN);

	loadResource();
}

function loadResource () {
	var loadList = [
	 	{path : "./js/gui/Aircraft.js"},
	 	{path : "./js/gui/Player.js"},

		{name : "bg", path : "./images/bg.png"},
		{name : "player", path : "./images/player.png"}
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

	player = new Player();
	stageLayer.addChild(player);

	stageLayer.addEventListener(LMouseEvent.MOUSE_MOVE, function (e) {
		player.moveTo(e.selfX, e.selfY);
	});
}
