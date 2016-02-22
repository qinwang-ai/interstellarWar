# interstellarWar


# 如何使用拼图工具
进入stitching_animation/index.html，更改imgList数组，把动画图片路径按顺序加到这个数组中。打开index.html。得到含有动画的画布，对画布右键：Save image as... 就能保存画布中的图片。

# 几个变量需要调整
我觉得几个开关如isStartGame需要加到一个叫SwitchVar的类中保管，避免全局变量太多。这块你可以暂时不用动。我明天下午说不定可以搞定。


时间有限，没来得及加注释，不过你可以多看lufylegend的文档，看了之后更容易了解。（一切L开头的类都是lufylegend提供的）地址lufylegend.com/lufylegend



# 如何控制人物

```
// leap.js

// 当leap motion接口检测到手移动时，执行以下函数
var eve = new LEvent(LeapEventDispatcher.EVENT_HAND_MOVE);
eve.angle = 角度;
leapED.dispatchEvent(eve);
```
角度说明，这个角度的坐标轴如下：
o ---> x
| \ )a
|  \
V y \

o是飞机位置，可以看到，和平时数学作业中的笛卡尔坐标的y是反的。a就是角度。


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
	alert(e.angle);
}
```

```
// leap.js

// 当leap motion接口检测到手移动时，执行以下函数
var eve = new LEvent(LeapEventDispatcher.EVENT_HAND_MOVE);
eve.angle = sin值;
leapED.dispatchEvent(eve);
```

你可以直接使用dispatchEvent触发上述三个事件，看看是否奏效。

注意，使用leapED前请检测是否定义leapED：

```
if (leapED) {
	// do sth...
}
```