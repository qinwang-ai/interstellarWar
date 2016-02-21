# interstellarWar

# How to Control Player

```
if (player) {
	player.moveTo(x, y);
	player.setRotation(angle);
}
```

# 如何使用事件驱动
我写了一个类LeapEventDispatcher，用于触发事件，在Main.js中我写了

```
leapED = new LeapEventDispatcher();
```
在你的代码中这么写触发事件

```
leapED.dispatchEvent(event_name);
```

event_name是一个标识事件的字符串，在LeapEventDispatcher中我暂时定义了

```
LeapEventDispatcher.EVENT_HAND_FOUND = "handFound";
LeapEventDispatcher.EVENT_HAND_LOST = "handLost";
LeapEventDispatcher.EVENT_HAND_MOVE = "handMove";
```
这三个事件，你可以自己再写一些事件。

我在我的代码里加入事件后，你用触发事件的函数就能让我的相应函数被执行。这里是例子：

```
// Main.js

leapED.addEventListener(LeapEventDispatcher.EVENT_HAND_FOUND, handFound);

function handFound () {
	alert("hand found");
}
```

```
// leap.js

// 当leap motion接口检测到手时，执行以下函数
leapED.dispatchEvent(LeapEventDispatcher.EVENT_HAND_FOUND);
```
dispatchEvent方法可以传入一个LEvent作为参数，然后可以通过它代参：

```
// Main.js

leapED.addEventListener(LeapEventDispatcher.EVENT_HAND_MOVE, handMove);

function handMove (e) {
	alert(e.x + "," + e.y);
}
```

```
// leap.js

// 当leap motion接口检测到手移动时，执行以下函数
var eve = new LEvent(LeapEventDispatcher.EVENT_HAND_MOVE);
eve.x = leap motion得到的x;
eve.y = leap motion得到的y;
leapED.dispatchEvent(eve);
```

你可以直接使用dispatchEvent触发上述三个事件，看看是否奏效。

注意，使用leapED前请检测是否定义leapED：

```
if (leapED) {
	// do sth...
}
```