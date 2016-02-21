var LeapEventDispatcher = (function () {
	function LeapEventDispatcher (index) {
		var  s = this;
		LExtends(s, LEventDispatcher, []);
	}

	LeapEventDispatcher.EVENT_HAND_FOUND = "handFound";
	LeapEventDispatcher.EVENT_HAND_LOST = "handLost";
	LeapEventDispatcher.EVENT_HAND_MOVE = "handMove";

	return LeapEventDispatcher;
})();