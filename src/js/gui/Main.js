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
		{path : "./js/gui/Bullet.js"},
		{path : "./js/gui/SceneThumbnail.js"},

		{path : "./js/leapMotion/LeapEventDispatcher.js"},

		{name : "bg", path : "./images/bg.png"},
		{name : "player", path : "./images/player.png"},
		{name : "enemy1", path : "./images/enemy1.png"},
		{name : "enemy2", path : "./images/enemy2.png"},
		{name : "enemy3", path : "./images/enemy3.png"},
		{name : "bullet1", path : "./images/bullet1.png"},
		{name : "bullet2", path : "./images/bullet2.png"}
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
	leapED.addEventListener(LeapEventDispatcher.EVENT_START_GAME, startGame);
	leapED.addEventListener(LeapEventDispatcher.EVENT_SUPER_KILL, superKill);
	leapED.addEventListener(LeapEventDispatcher.EVENT_PLAYER_ATTACK, playerAttack);

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
	// do sth...
}

function handLost () {
	alert("hand lost");
	// do sth...
}

function handMove (e) {
	if (player) {
		player.moveTowards(e.angle);
	}
}

function startGame () {
	console.log("startGame");
	isStartGame = true;
	// do sth...
}

function superKill () {
	console.log("superkill is running");
	isSuperKill = true;
}

function playerAttack () {
	console.log("play is shotting");

	//do sth....
}
