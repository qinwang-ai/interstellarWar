LInit(1000 / 60, "mygame", 960, 640, main);

var dataList = {};
var stageLayer = null;
var gameLayer = null;
var leapED = null;

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
		{path : "./lib/lufylegend.LQuadTree-0.1.1.min.js"},

		{path : "./data/aircraft_animation_data.js"},
		{path : "./data/enemy_data.js"},
		{path : "./data/skill_data.js"},

		{path : "./js/gui/GameLayer.js"},
		{path : "./js/gui/Background.js"},
		{path : "./js/gui/Aircraft.js"},
		{path : "./js/gui/Player.js"},
		{path : "./js/gui/Enemy.js"},
		{path : "./js/gui/Bullet.js"},
		{path : "./js/gui/HpBar.js"},
		{path : "./js/gui/SceneThumbnail.js"},
		{path : "./js/gui/SkillButton.js"},

		{path : "./js/leapMotion/LeapEventDispatcher.js"},

		{name : "bg", path : "./images/bg.png"},
		{name : "player", path : "./images/player.png"},
		{name : "enemy1", path : "./images/enemy1.png"},
		{name : "enemy2", path : "./images/enemy2.png"},
		{name : "enemy3", path : "./images/enemy3.png"},
		{name : "bullet1", path : "./images/bullet1.png"},
		{name : "bullet2", path : "./images/bullet2.png"},
		{name : "explosion", path : "./images/explosion.png"},
		{name : "bar", path : "./images/bar.png"},
		{name : "bomb", path : "./images/bomb.png"},
		{name : "flash", path : "./images/flash.png"},
		{name : "start_game", path : "./images/start_game.png"}
	];

	LLoadManage.load(loadList, null, function (result) {
		gameInit(result);
	});

	soundBack = new LSound();
    soundBack.load("./images/background.mp3");
	soundBack.loopLength = 999999999;

	soundBullet = new LSound();
    soundBullet.load("./images/bullet.mp3");

	soundPlayerDead = new LSound();
    soundPlayerDead.load("./images/player_dead.wav");

	soundEnemyDead = new LSound();
    soundEnemyDead.load("./images/plane_bomb.wav");

	soundBigEnemyDead = new LSound();
    soundBigEnemyDead.load("./images/bigplane_bomb.mp3");

	soundPause = new LSound();
    soundPause.load("./images/pause.wav");
}

function gameInit (result) {
	dataList = result;

	leapED = new LeapEventDispatcher();
	leapED.addEventListener(LeapEventDispatcher.EVENT_HAND_FOUND, handFound);
	leapED.addEventListener(LeapEventDispatcher.EVENT_HAND_LOST, handLost);
	leapED.addEventListener(LeapEventDispatcher.EVENT_HAND_MOVE, handMove);
	leapED.addEventListener(LeapEventDispatcher.EVENT_START_GAME, startGame);
	leapED.addEventListener(LeapEventDispatcher.EVENT_START_SKILL, startSkill);
	leapED.addEventListener(LeapEventDispatcher.EVENT_PLAYER_ATTACK, playerAttack);
	leapED.addEventListener(LeapEventDispatcher.EVENT_PLAYER_DISABLE_ATTACK, playerDisableAttack);

	stageLayer = new LSprite();
	addChild(stageLayer);

	// var fps = new FPS();
	// addChild(fps);

	beginningLayer = new LSprite();
	stageLayer.addChild(beginningLayer);

	var bg = new LBitmap(new LBitmapData(dataList["bg"]));
	beginningLayer.addChild(bg);

	setTimeout("checkLeapState()", 500);
}

function checkLeapState(){
	// init CHECK allow web apps
	if( !Controller.connected()){
		var hint = new LTextField();
		hint.text = "Please set the 'Allow Web Apps' to ON in settings then refresh this page";
		hint.textAlign = "center";
		hint.size = 20;
		hint.x = LGlobal.width / 2;
		hint.y = 300;
		beginningLayer.addChild(hint);
	} else {
		// Leap motion controller not connected    init CHECK
		if(!Controller.streaming()){
			if(leapED) {
				var hint = new LTextField();
				hint.text = "Please connect Leap Motion Controller";
				hint.textAlign = "center";
				hint.size = 20;
				hint.x = LGlobal.width / 2;
				hint.y = 300;
				beginningLayer.addChild(hint);
			}
		} else {
			addBeginningText();
		}
	}
}

function addBeginningText () {
	beginningLayer.removeAllChild();
	var bg = new LBitmap(new LBitmapData(dataList["bg"]));
	beginningLayer.addChild(bg);
	var hint = new LTextField();
	hint.text = "Rotate Your Index Finger Counterclockwise to ";
	hint.textAlign = "center";
	hint.size = 30;
	hint.x = LGlobal.width / 2;
	hint.y = 250;
	beginningLayer.addChild(hint);

	var hint = new LTextField();
	hint.text = "Instructions: Rotate right hand: move (fist to speed up);   Rotate left hand: attack;   Swipe gesture: bomb;";
	hint.textAlign = "center";
	hint.size = 15;
	hint.x = LGlobal.width / 2;
	hint.y = 500;
	beginningLayer.addChild(hint);

	var startGameBmp = new LBitmap(new LBitmapData(dataList["start_game"]));
	startGameBmp.x = (LGlobal.width - startGameBmp.getWidth()) / 2;
	startGameBmp.y = 330;
	beginningLayer.addChild(startGameBmp);

//	leapED.dispatchEvent(LeapEventDispatcher.EVENT_START_GAME);
}

function startGame () {
	stageLayer.removeAllChild();

	isStartGame = true;

	gameLayer = new GameLayer();
	stageLayer.addChild(gameLayer);
	soundBack.play();

}

var leapPlugIn = true;
function handFound () {
	if (gameLayer && leapPlugIn) {
		gameLayer.isPause = false;
		soundBack.play();
	}
}

//TODO : bomb timeout stop when pause

function handLost () {
	if (gameLayer && isStartGame) {
		if( !Controller.streaming()) {
			leapPlugIn = false;
			gameLayer.setHintText( "Please connect Leap Motion Controller");
		} else {
			gameLayer.setHintText( "Please put your hands on the Controller");
		}
		gameLayer.isPause = true;
		soundBack.stop();
		soundPause.play();
	}
}

function handMove (e) {
	if (gameLayer && gameLayer.player) {
		gameLayer.player.moveTowards(e.angle);
		gameLayer.player.moveStep(e.step);
	}
}

function startSkill (e) {
	if (gameLayer && gameLayer.skillList && isStartGame) {
		gameLayer.skillList[e.index].startSkill();
	}
}

function playerAttack (e) {
	if (gameLayer && gameLayer.player) {
		gameLayer.player.isShoot = true;
		gameLayer.player.atkTowards(e.angle);
	}
}

function playerDisableAttack () {
	if (gameLayer && gameLayer.player) {
		gameLayer.player.isShoot = false;
	}
}
