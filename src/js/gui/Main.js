LInit(1000 / 60, "mygame", 960, 640, main);

var dataList;
var stageLayer;
var player;
var leapED;

function main () {
	LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
	LGlobal.screen(LGlobal.FULL_SCREEN);

	loadResource();

	LGlobal.stage.addEventListener(LEvent.WINDOW_RESIZE, function () {
		LGlobal.screen(LGlobal.FULL_SCREEN);
	});
}

function loadResource () {
	var loadList = [
		{path : "./data/aircraft_animation_data.js"},

		{path : "./js/gui/GameLayer.js"},
		{path : "./js/gui/Background.js"},
		{path : "./js/gui/Aircraft.js"},
		{path : "./js/gui/Player.js"},
		{path : "./js/gui/Enemy.js"},

		{path : "./js/leapMotion/LeapEventDispatcher.js"},

		{name : "bg", path : "./images/bg.png"},
		{name : "player", path : "./images/player.png"},
		{name : "enemy1", path : "./images/enemy1.png"}
	];

	LLoadManage.load(loadList, null, function (result) {
		gameInit(result);
	});
}

function gameInit (result) {
	dataList = result;

	leapED = new LeapEventDispatcher();
	leapED.addEventListener(LeapEventDispatcher.EVENT_HAND_FOUND, handFound);
	leapED.addEventListener(LeapEventDispatcher.EVENT_HAND_LOST, handLost);
	leapED.addEventListener(LeapEventDispatcher.EVENT_HAND_MOVE, handMove);

	stageLayer = new LSprite();
	addChild(stageLayer);

	var fps = new FPS();
	addChild(fps);

	startGame();
}

function startGame () {
	var gameLayer = new GameLayer();
	stageLayer.addChild(gameLayer);
}

function handFound () {
	alert("hand found");
}

function handLost () {
	alert("hand lost");
}

function handMove (e) {
}
