var LeapEventDispatcher = (function () {
	function LeapEventDispatcher (index) {
		var  s = this;
		LExtends(s, LEventDispatcher, []);
	}

	LeapEventDispatcher.EVENT_HAND_FOUND = "handFound";
	LeapEventDispatcher.EVENT_HAND_LOST = "handLost";
	LeapEventDispatcher.EVENT_HAND_MOVE = "handMove";
	LeapEventDispatcher.EVENT_START_GAME = "startGame";
	LeapEventDispatcher.EVENT_START_SKILL = "startSkill";
	LeapEventDispatcher.EVENT_PLAYER_ATTACK = "playerAttack";
	LeapEventDispatcher.EVENT_PLAYER_DISABLE_ATTACK = "playerDisableAttack";

	return LeapEventDispatcher;
})();
