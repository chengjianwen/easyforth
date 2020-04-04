---
layout: default
---

<div markdown="1" class="toc">
  * toc
  {:toc}
</div>


## 写在前面的话

一年以前，我想我不得不为教育做些事情，所以我编写了一本《编程入门》的教材，并开始给一些希望学习电脑编程知识的孩子们授课。在此期间，我发现国内有一些媒体平台（例如哔哩哔哩、西瓜网、头条等等）上有一些视频教程，我觉得这是个好办法，也就开始录制自己的视频教程。然而我发现W3School这样的站点通过一种交互式网页进行教学，可汗学院则通过一系列各种形式的内容形成一个课程，它们都会让学生随时随地的学习。所以我开始想办法将我写的教材通过便于随时随地学习的方式发布到网站上。

以前我认为学习编程首先应该学习英语，这不仅仅是因为计算机是西方人发明的，更主要的是所有计算机编程语言都是脱胎于英语，或者更准确的说，它们都是由数十个英文字母构成的单词和数十个符号来编写的。不掌握这些，简直无法进行编程学习。不过后来，我觉得可以想想为什么不使用汉字进行编程呢？当然现在有一些汉字编程的软件，然而它们仅仅是将编程过程汉化而已，这让我无法选择它们作为编程的教学工具。

Forth是一个非常简单的，甚至没有什么语法定义的语言，它将指令或者数据输送给计算机，而计算机则一个一个的执行它们（或者保存它们），仅此而已。所以我觉得如果想用汉字进行编程，Forth是一个很好的语言。这样我找到了这个[Easy Forth](https://skilldrick.github.io/easyforth/)。我觉得它非常符合我对汉字编程的理解，所以我迫不及待的先将它翻译为中文，同时在翻译的过程中做了一些汉字编程的工作。

下面开始的内容，就是这本我翻译并做了一些汉字改造（实际上就是定义汉字字典）的工作结果，并希望你有一个愉快的学习过程。

## 介绍

这本小手册指导你来学习一门新的编程语言：Forth。Forth是一门不同于其它语言的编程语言，它既不是函数式，也不是面向对象的，它没有类型检查，它甚至没有任何语法可言。它产生于上个世纪的七十年代，现在仍然在[这里](http://www.forth.com/resources/apps/more-applications.html)使用着。

为什么你需要学习一门新的语言？因为新的语言会让你用新的思路来考虑问题。Forth不但很容易学习，而且它能让你用不同于以往任何方式来考虑问题，它是一门能够拓展你思路的非常好的语言。

这本手册包括了一个简单的基于JavaScript实现的第一代Forth。它并不怎么好，缺少很多Forth系统中应有的功能。它仅仅能够让你很容易的对这本书中的示例进行演示而已。如果你已经非常熟悉Forth了，这应该不是你的菜。

本书需要你学习过其它至少一门编程语言，对“栈”这种数据结构已经有了最基本的了解。

## 输入一些值

Forth与其它编程语言的区别在于它对栈的使用。在Forth中，一切都是围绕着栈进行。任何时候你输入一个值，它就会被放入栈中。如果你想将两个值相加，那么输入“和”（这是一个令）就可以将栈最后面的两个值取出来进行相加，然后将结果再放入栈中。

我们可以来看一个例子。把下面的内容依次输入（不能拷贝/粘贴）到解释器中，在每一行的最后按“回车”键。

    1
    2
    3

{% include editor.html %}

每次你通过“回车”键输入一行，Forth解释器就会执行这一行中的内容，然后会有一句“完成”告诉你没有发生错误。在执行每一行内容时，你还应该注意到最上面的一行内容在不断得发生变化，它就是Forth中栈的当前状态，它看起来应该是这样的：

{% include stack.html stack="1 2 3" %}

继续在这个解释器里输入令字“和”，然后按“回车”键，栈最后面的两个值“2”和“3”，就会被“5”替代。

{% include stack.html stack="1 5" %}

这个时候，你的编辑器窗口应该是这个样子：

<div class="editor-preview editor-text">1  <span class="output">完成</span>
2  <span class="output">完成</span>
3  <span class="output">完成</span>
+  <span class="output">完成</span>
</div>

再次输入“和”，并按“回车”键，最后面的两个值会又被替换为6。如果你输入更多的“和”，尽管堆栈中只剩一个值，Forth仍然会试图从堆栈中获取两个值，这样就会产生“栈已空”的错误：

<div class="editor-preview editor-text">1  <span class="output">完成</span>
2  <span class="output">完成</span>
3  <span class="output">完成</span>
+  <span class="output">完成</span>
+  <span class="output">完成</span>
+  <span class="output">栈已空</span>
</div>

Forth不是必须把每个要输入的值作为单独的一行进行输入。在下面的编辑器中，输入下面的内容，并按“回车”键：

    123 456 和

{% include editor.html size="small"%}

现在堆栈的状态应该显示为：

{% include stack.html stack="579" %}

我们可以看一些更为复杂的例子，比如计算“10 × (5 + 2)”。在解释器中输入下面的内容：

    5
    2
    和
    10
    积

{% include editor.html size="small"%}

Forth完全按照输入的顺序执行。例如当执行“5 2 和 10 积”时，解释器先将5入栈，然后再将2入栈，然后将它们出栈相加，并将结果7入栈，然后将10入栈，然后将7和10出栈并相乘，并将结果70入栈。因此，在Forth中永远不需要使用括号这样将语句进行分组的内容。

### 栈情

大多数的Forth令会对栈进行操作，有些令需要出栈，而有些则需要入栈，还有一些既要出栈还要入栈。这些“栈情”我们用“(出栈|入栈)”的方式来表示。例如“和”的栈情为“(值值|值)”。位于“|”之前有两个“值”，这表示“和”需要出栈两个值，“|”之后有一个“值”，这表示“和”需要入栈一个值。

## 令规

Forth的规则非常简单，它的内容被解释为按行分隔的值或者令。所有字都可以作为令来使用。当Forth解释器读取到一个字时，它在内部的规典中查找是否存在这个字的令规。如果找到这个字的令规，那这个字的令规就会被执行；如果失败，就会发生错误。

你可以在下面试着输入“晕”（一个没有令规的字）然后按“回车”键。

{% include editor.html size="small"%}

你就会看到这样的结果：

<div class="editor-preview editor-text">晕  <span class="output">晕 未定义</span></div>

“晕 不存在”的意思是Forth没有找到“晕”的令规。

我们可以用“令”和“。”为“晕”进行令规定义。“令”告诉Forth我们要定义一个新的令规，其后的第一个字就是需要定义令规的字，剩下的内容（直到“。”为止）就是为它定义的内容。通常我们将所定义的内容前面加一些缩进。试一下下面的语句：

    令晕
       100
       和
    。
    1000
    晕
    晕
    晕
    晕

{% include editor.html size="small"%}

“晕”给堆栈最后面的值增加100，尽管这很简单，但它让你明白创建一个新的令规是如何进行的。

## 栈管理

现在我们可以说一下Forth语言中预先定义了哪些令字。首先，我们看看那些能够操作栈的令字：

### 重 值|值值

“重”的意思就是重复，它出栈一个值，然后将它复制为两个值，并将其入栈。例如：

    1
    2
    3
    重

{% include editor.html size="small" %}

结束后你会看到下面的栈情：

{% include stack.html stack="1 2 3 3" %}

### 弃 值|

“弃”简单的出栈一个值，试一下下面的例子：

    1
    2
    3
    弃

会得到如下的栈情：

{% include stack.html stack="1 2" %}

{% include editor.html size="small"%}

### 换 值值|值值

“换”，正如你猜的那样，它出栈两个值，然后把它们交换一下后入栈。例如：

    1
    2
    3
    4
    换

得到栈情：

{% include stack.html stack="1 2 4 3" %}

{% include editor.html size="small"%}

### 导 值1值2|值1值2值1

“导”的意思是，它将栈中的倒数第二个值进行复制，然后将其入栈。运行下面的例子：

    1
    2
    3
    导

会产生这样的结果：

{% include stack.html stack="1 2 3 2" %}

{% include editor.html size="small"%}

### 翻 值1 值2 值3 | 值2 值3 值1

最后的“翻”就是把栈中的倒数第三个值翻到倒数第一的位置。

    1
    2
    3
    翻

得到：

{% include stack.html stack="2 3 1" %}

{% include editor.html size="small"%}


## 输出

下面我们来看看哪些令是用来在计算机上输出（显示）的。

### 印 值 --  (period)

最简单的显示方法就是“印”，你可以通过它出栈一个值，并将其显示在终端上。试着输入下面的内容：

    1
    印
    2
    印
    3
    印
    4
    5
    6
    印
    印
    印

{% include editor.html size="small"%}

你会看到这样的栈情：

<div class="editor-preview editor-text">1 . 2 . 3 . 4 5 6 . . . <span class="output">1 2 3 6 5 4  完成</span></div>

我们看一下它的执行过程：想将“1”入栈，然后将其出栈并显示；然后对“2”和“3”重复这样的过程。最后将“4”、“5”和“6”依次入栈，再将它们出栈并显示。最后这三个值的顺序被颠倒的原因是栈是一个后进先出的容器：最后入栈的值总是最先出栈。

### 字 值 |

“字”能够出栈一个值，将其转换为它所表示的字，并显示出来。例如：

     31243
     32534
     字
     字

{% include editor.html size="small"%}

这里就不告诉你它会产生怎么样的结果了，剧透不利于惊喜。这段内容也可以写成：

     32534
     字
     31243
     字

不像“印”，“字”不会在显示的内容后面增加任何东西，这让你能够完整的显示一句话。

### 回 |

“回”是回车键的缩写，它显示新的一行：

    回
    100
    印
    回
    200
    印
    300
    印

{% include editor.html size="small"%}

得到下面的结果：

<div class="editor-preview editor-text">回\100\印\回\200\印\回\300\印  <span class="output">
100
200
300  完成</span></div>

## 循环控制

和其它编程语言一样，现在我们开始学习循环控制的内容。首先我们需要Forth语言中的是非值。

### 理值

理值即对错值。在Forth语言中没有专用于表示对错的值，数值“0”被认为是“错”，其它数值则被认为是“对”，尽管Forth语言中常常使用“-1”来表示“对”。

比如想比较两个值是否相同，可以使用“同”：

    3
    4
    同
    印
    5
    5
    同
    印

将会产生：

<div class="editor-preview editor-text">3  <span class="output">完成</span>
4  <span class="output">完成</span>
同  <span class="output">完成</span>
印 -1  <span class="output">完成</span>
5  <span class="output">完成</span>
5  <span class="output">完成</span>
同  <span class="output">-1  ok</span>
印 0  <span class="output">完成</span></div>

{% include editor.html size="small"%}

还可以使用“大”和“小”来比较两个值。“大”会比较栈中的（倒数）第二个值是否大于第一个值，“小”则会做相反的比较：

    3\4\小\印
    3\4\大\印

<div class="editor-preview editor-text">3\4\小\印 <span class="output">-1  完成</span>
3\4\大\印 <span class="output">0  完成</span></div>

{% include editor.html size="small"%}

理值的运算包括并且、或者和不是，它们分别用“且”、“或”、“非”来实现：

    3\4\小\20\30小\且\印
    3\4\小\20\30大\或\印
    3\4\小\非\印

第一行内容等同于“3小于4并且20小于30”，第二行内容等同于“3小于4或者20小于30”，第三行内容等同于“不是3小于4”。

“且”、“或”和“非”都属于位运算，如果一切正常的话，它们会进行正确的判断。然而如果它的值表示不当，就会产生错误的判断结果。

{% include editor.html size="small"%}

### 若则

我们现在进入最终的条理控制内容。在Forth语言中条理控制只在令规中出现，最简单的条理控制是“若则”，它等同于我们常说的“如果…”。在下面这个“若则”的令规例子中，我们使用了“余”来判断出栈的值是否是5的倍数（同5相除，余数为0），来决定是否显示“是”。

    令倍
      5
      mod
      0
      同
      若
      26159
      字
      则
    毕
    3\倍
    4\倍
    5\倍

{% include editor.html size="small"%}

结果如下：

<div class="editor-preview editor-text">3 倍<span class="output">  完成</span>
4 倍<span class="output">  完成</span>
5 倍<span class="output"> 是 ok</span></div>

需要注意的是“则”表示“若”条理的结束。之后Forth不再受之前条理的约束而继续执行后面的内容。

另外一个需要注意事项是“若则”会根据出栈的理值是来形成条理约束。

### 若否则

“若否则”等同于“如果/否则”这样的情况，这里有一个例子：

    令零 0\同\若\26159\字\否\21542\字\则\毕
    0\零
    1\零
    2\零

{% include editor.html size="small"%}

结果：

<div class="editor-preview editor-text">0 零<span class="output"> 是 完成</span>
1 零<span class="output"> 否 完成</span>
2 零<span class="output"> 否 完成</span></div>

在这种情况下，符合条理的内容为“若”和“否”之间的内容，不符合条理的内容则为“否”和“则”之间的内容。

### 复返

“复返”在Forth中用于运行反复性内容。在循环内容中，“报”可以将当前的反复值入栈。

栈最后的两个值指定了反复的开始值和结束值，先出栈的为开始值，这里有一个例子：

    令工 10\0\复\报\印\返\毕
    工

{% include editor.html size="small"%}

它会产生下面的结果：

<div class="editor-preview editor-text">工<span class="output"> 0 1 2 3 4 5 6 7 8 9  完成</span></div>

程序“10\0\报\印\返”等同于“反复值依次从0到10运行：显示反复值”。

### 数七游戏

拍七令是一个多人玩的报数游戏，当报到含有7的数，或者能被7整出的数时，报数人必须喊“过”（或者用其它动作替代），否则即认为是犯规。

我们可以用“复返”编写一个拍七令游戏：

    99/1/复
      报
      7/余/0/同
      报
      10/商/7/同
      报
      10/余/7/同
      或或
      若
        36987
        字
      否
        报
        印
      则
    返

{% include editor.html %}

“7/余/0/同”判断当前反复值是否能被7整除，“10/商/7/同”判断当前反复值除以10以后是否得到7，“10/余/7/同”则判断当前反复值除以10以后是否余数为7。如果符合这其中任何一个条件，则会显示“过”字；否则则会显示当前的反复值。

{% include editor.html %}

## 变数和常数

Forth语言还可以将值保存在一个变数或者常数中。保存在变数中的值可以进行更改，而保存在常数中的值则不可以进行修改。

### 变数

栈通常用于保存当前正在处理的一些值，Forth中的变数常常被用来在各个处理过程之间需要共同使用的一些值。

用“变”来定义一个新的变数：

    变通

这里定义的“通”既不是一个令，也不是一个值，它是一个代表计算机中某个位置的名，通过它可以对该位置中所保存的信息进行修改和读取。当我们输入一个被定义了的名时，它做的仅仅是将它所代表的计算机中的位置入栈，例如：

    变通
    通

{% include editor.html size="small"%}

我们看到栈中会出现一个数值，它表示“通”所代表的计算机中的一个位置的值。

“设”会将一个值保存在这样的一个计算机位置中，“取”则会从这样的计算机地址中获取它所保存的值。

    变通
    123\通\设
    通\取

{% include editor.html size="small"%}

最后你应该能在栈中看到“123”这个值。“123\通”会将值和保存这个值的内存地址入栈，然后“设”就将它们分别出栈，并将值保存在这个地址中。同样的，“取”则基于所给出的内存地址获取到所保存的值，并将它入栈。

“啥”被定义为“取\印”，它会将变数的值显示出来；“增”用来对变数的值进行增加，“减”则用来对变数的值进行减少；“倍”用来对变数的值进行加倍，“衰”则用来对变数的值进行减倍。

    变通
    123\通\设
    通\啥
    50\通\增
    通\啥

{% include editor.html size="small"%}

运行这段内容，你会看到这样的结果：

<div class="editor-preview editor-text">变\通<span class="output">  完成</span>
123\通\设 <span class="output"> 完成</span>
通\啥 <span class="output">123  完成</span>
50\通\增 <span class="output"> 完成</span>
通\啥 <span class="output">173  完成</span>
</div>

### 常数

如果你有一个常数，你可以把它保存到一个常数中。“常”用来定义一个常数：

    42
    常
    答

这样就定义了一个新的常数“答”，它代表的值为“42”。和变数不同，常数只是代表这个值，它不是内存中的一个地址，所以不需要使用“取”来获取它所代表的值。

    42\常\答
    2\答\积

{% include editor.html size="small"%}

这段内容会在栈中生成值“84”，“答”被用于表示它所代表的那个值。

## 组数

Forth可以通过对变数进行扩展，使其能够支持组数。

    变\组
    3\扩
    10\组\0\和\设
    20\组\1\和\设
    30\组\2\和\设
    40\组\3\和\设

{% include editor.html size="small"%}

这个例子定义了一个变数“组”，然后又扩展了3个内存单元，这样通过变数“组”就成为了一个组数，我们可以通过这个组数所代表的内存地址和一个顺序号的和，来得到相应的内存地址。“组\0\和”得到组数的第一个的地址，“组\1\和”则得到组数的第二个地址，以此类推，我们可以得到这个组数所有（4个）的地址。

我们可以很简单的定义一个组数的存取令：

    变\组
    3\元\扩
    令量 值 | 值
      组\和
    毕
    10\0\量\设
    20\1\量\设
    30\2\量\设
    40\3\量\设

    2\量\啥

{% include editor.html size="small"%}

“量”通过出栈获取一个偏移位置，然后同“组”所代表的内存地址相加，从而得到这个偏移位置的内存地址。“30\2\量\设”则将30保存在组数的第二个偏移位置中。

## 输入

Forth有一个特殊的令“键”，它可以收到从键盘输入的任何信息。当输入“键”时，计算机停止了反应，它在等待我们按下键盘上的某一个键以后才会继续运行，这时栈中会有所按下键的码值。试试下面的例子：

    键\印\键\印\键\印

{% include editor.html size="small"%}

当你运行这段代码时，你会注意到开始时没有任何反应，这是因为Forth解释器正在等待来自键盘的输入信息。试着按一下“A”键，然后你就会在当前行看到这个键的码值“65”出现了。然后你可以按“B”，然后按“C”，你可以看到下面的内容：

<div class="editor-preview editor-text">键\印\键\印\键\印<span class="output">65 66 67  完成</span></div>


### 利用无限复返令实现键盘码值打印

Forth还提供有另一种反复令“直返”，它也被称为“无限反复”。每次执行到“返”时，Forth会出栈一个值，然后检查它是否为“对”。如果是，则程序会返回到“直”的位置再次运行，否则程序会结束反复运行状态，继续运行后面的代码。

下面是一个利用“直返”打印键盘码值的代码：

    令工
      直
        键
        重\印
        32\同\非
      返
    毕
    工

{% include editor.html size="small"%}

这段代码会一直显示输入键的码值，直到你按下空格键（它的码值为32）。你应该看到类似这样的结果：

<div class="editor-preview editor-text">工 <span class="output">80 82 73 78 84 189 75 69 89 67 79 68 69 32  完成</span></div>

“键”等待来自键盘的输入，然后“重”会生成所得到键码值的拷贝，我们用“印”将其显示到终端。“32\同\非”则检查收到键的码值是否等于32，如果是，则会退出反复；否则会回到“直”的地方继续反复运行。

## Snake!

Now it's time to put it all together and make a game! Rather than having you type
all the code, I've pre-loaded it into the editor.

Before we look at the code, try playing the game. To start the game, execute the
word `start`. Then use the arrow keys to move the snake. If you lose, you can run
`start` again.

{% include editor.html canvas=true game=true %}

Before we delve too deeply into this code, two disclaimers. First, this is terrible
Forth code. I'm by no means a Forth expert, so there's probably all kinds of things
I'm doing in completely the wrong way. Second, this game uses a few non-standard
techniques in order to interface with JavaScript. I'll go through these now.

### Non-Standard Additions

#### The Canvas

You may have noticed that this editor is different from the others: it has an HTML5
Canvas element built in. I've created a very simple memory-mapped interface for
drawing onto this canvas. The canvas is split up into 24 x 24 "pixels" which can
be black or white. The first pixel is found at the memory address given by the
variable `graphics`, and the rest of the pixels are offsets from the variable. So,
for example, to draw a white pixel in the top-left corner you could run

    1 graphics !

{% include editor.html size="small" canvas=true %}

The game uses the following words to draw to the canvas:

    : convert-x-y ( x y -- offset )  24 cells * + ;
    : draw ( color x y -- )  convert-x-y graphics + ! ;
    : draw-white ( x y -- )  1 rot rot draw ;
    : draw-black ( x y -- )  0 rot rot draw ;

For example, `3 4 draw-white` draws a white pixel at the coordinates (3, 4). The
y coordinate is multiplied by 24 to get the row, then the x coordinated is added
to get the column.

#### Non-Blocking Keyboard Input

The Forth word `key` blocks, so is unsuitable for a game like this. I've added
a variable called `last-key` which always holds the value of the last key to be
pressed. `last-key` is only updated while the interpreter is running Forth code.

#### Random Number Generation

The Forth standard doesn't define a way of generating random numbers, so I've
added a word called `random ( range -- n )` that takes a range and returns a
random number from 0 to range - 1. For example, `3 random` could
return `0`, `1`, or `2`.

#### `sleep ( ms -- )`

Finally, I've added a blocking `sleep` word that pauses execution for the
number of milliseconds given.

### The Game Code

Now we can work through the code from start to finish.

#### Variables and Constants

The start of the code just sets up some variables and constants:

    variable snake-x-head
    500 cells allot

    variable snake-y-head
    500 cells allot

    variable apple-x
    variable apple-y

    0 constant left
    1 constant up
    2 constant right
    3 constant down

    24 constant width
    24 constant height

    variable direction
    variable length

`snake-x-head` and `snake-y-head` are memory locations used to store the x and
y coordinates of the head of the snake. 500 cells of memory are alloted after
these two locations to store the coordinates of the tail of the snake.

Next we define two words for accessing memory locations representing the body
of the snake.

    : snake-x ( offset -- address )
      cells snake-x-head + ;

    : snake-y ( offset -- address )
      cells snake-y-head + ;

Just like the `number` word earlier, these two words are used to access
elements in the arrays of snake segments. After this come some words for
drawing to the canvas, described above.

We use constants to refer to the four directions (`left`, `up`, `right`, and
`down`), and a variable `direction` to store the current direction.

#### Initialization

After this we initialize everything:

    : draw-walls
      width 0 do
        i 0 draw-black
        i height 1 - draw-black
      loop
      height 0 do
        0 i draw-black
        width 1 - i draw-black
      loop ;

    : initialize-snake
      4 length !
      length @ 1 + 0 do
        12 i - i snake-x !
        12 i snake-y !
      loop
      right direction ! ;

    : set-apple-position apple-x ! apple-y ! ;

    : initialize-apple  4 4 set-apple-position ;

    : initialize
      width 0 do
        height 0 do
          j i draw-white
        loop
      loop
      draw-walls
      initialize-snake
      initialize-apple ;

`draw-walls` uses two `do/loop`s to draw the horizontal and vertical walls,
respectively.

`initialize-snake` sets the `length` variable to `4`, then loops from `0` to
`length + 1` filling in the starting snake positions. The snake positions are
always kept one longer than the length so we can grow the snake easily.

`set-apple-position` and `initialize-apple` set the initial position of the
apple to (4,4).

Finally, `initialize` fills everything in white and calls the three
initialization words.

#### Moving the Snake

Here's the code for moving the snake based on the current value of `direction`:

    : move-up  -1 snake-y-head +! ;
    : move-left  -1 snake-x-head +! ;
    : move-down  1 snake-y-head +! ;
    : move-right  1 snake-x-head +! ;

    : move-snake-head  direction @
      left over  = if move-left else
      up over    = if move-up else
      right over = if move-right else
      down over  = if move-down
      then then then then drop ;

    \ Move each segment of the snake forward by one
    : move-snake-tail  0 length @ do
        i snake-x @ i 1 + snake-x !
        i snake-y @ i 1 + snake-y !
      -1 +loop ;

`move-up`, `move-left`, `move-down`, and `move-right` just add or subtract one
from the x or y coordinate of the snake head. `move-snake-head` inspects the
value of `direction` and calls the appropriate `move-*` word. This `over = if`
pattern is an idiomatic way of doing case statements in Forth.

`move-snake-tail` goes through the array of snake positions backwards, copying
each value forward by 1 cell. This is called before we move the snake head, to
move each segment of the snake forward one space. It uses a `do/+loop`, a
variation of a `do/loop` that pops the stack on every iteration and adds that
value to the next index, instead of incrementing by 1 each time. So `0 length @
do -1 +loop` loops from `length` to `0` in increments of `-1`.

#### Keyboard Input

The next section of code takes the keyboard input and changes the snake direction
if appropriate.

    : is-horizontal  direction @ dup
      left = swap
      right = or ;

    : is-vertical  direction @ dup
      up = swap
      down = or ;

    : turn-up     is-horizontal if up direction ! then ;
    : turn-left   is-vertical if left direction ! then ;
    : turn-down   is-horizontal if down direction ! then ;
    : turn-right  is-vertical if right direction ! then ;

    : change-direction ( key -- )
      37 over = if turn-left else
      38 over = if turn-up else
      39 over = if turn-right else
      40 over = if turn-down
      then then then then drop ;

    : check-input
      last-key @ change-direction
      0 last-key ! ;

`is-horizontal` and `is-vertical` check the current status of the `direction`
variable to see if it's a horizontal or vertical direction.

The `turn-*` words are used to set a new direction, but use `is-horizontal` and
`is-vertical` to check the current direction first to see if the new direction
is valid. For example, if the snake is moving horizontally, setting a new
direction of `left` or `right` doesn't make sense.

`change-direction` takes a key and calls the appropriate `turn-*` word if the
key was one of the arrow keys. `check-input` does the work of getting the last
key from the `last-key` pseudo-variable, calling `change-direction`, then setting
`last-key` to 0 to indicate that the most recent keypress has been dealt with.

#### The Apple

The next code is used for checking to see if the apple has been eaten, and if so,
moving it to a new (random) location. Also, if the apple has been eaten we grow
the snake.

    \ get random x or y position within playable area
    : random-position ( -- pos )
      width 4 - random 2 + ;

    : move-apple
      apple-x @ apple-y @ draw-white
      random-position random-position
      set-apple-position ;

    : grow-snake  1 length +! ;

    : check-apple ( -- flag )
      snake-x-head @ apple-x @ =
      snake-y-head @ apple-y @ =
      and if
        move-apple
        grow-snake
      then ;

`random-position` generates a random x or y coordinate in the range of `2` to
`width - 2`. This prevents the apple from ever appearing right next to the wall.

`move-apple` erases the current apple (using `draw-white`) then creates a new
pair of x/y coordinates for the apple using `random-position` twice. Finally,
it calls `set-apple-position` to move the apple to the new coordinates.

`grow-snake` simply adds one to the `length` variable.

`check-apple` compares the x/y coordinates of the apple and the snake head to
see if they're the same (using `=` twice and `and` to combine the two
booleans). If the coordinates are the same, we call `move-apple` to move the
apple to a new position and `grow-snake` to make the snake 1 segment longer.

#### Collision Detection

Next we see if the snake has collided with the walls or itself.

    : check-collision ( -- flag )
      \ get current x/y position
      snake-x-head @ snake-y-head @

      \ get color at current position
      convert-x-y graphics + @

      \ leave boolean flag on stack
      0 = ;

`check-collision` checks to see if the new snake head position is already black
(this word is called _after_ updating the snake's position but _before_ drawing
it at the new position). We leave a boolean on the stack to say whether a
collision has occured or not.

#### Drawing the Snake and Apple

The next two words are responsible for drawing the snake and apple.

    : draw-snake
      length @ 0 do
        i snake-x @ i snake-y @ draw-black
      loop
      length @ snake-x @
      length @ snake-y @
      draw-white ;

    : draw-apple
      apple-x @ apple-y @ draw-black ;

`draw-snake` loops through each cell in the snake arrays, drawing a black pixel
for each one. After that it draws a white pixel at an offset of `length`. The
last part of the tail is at `length - 1` into the array so `length` holds the
previous last tail segment.

`draw-apple` simply draws a black pixel at the apple's current location.

#### The Game Loop

The game loop constantly loops until a collision occurs, calling each of the
words defined above in turn.

    : game-loop ( -- )
      begin
        draw-snake
        draw-apple
        100 sleep
        check-input
        move-snake-tail
        move-snake-head
        check-apple
        check-collision
      until
      ." Game Over" ;

    : start  initialize game-loop ;

The `begin/until` loop uses the boolean returned by `check-collision` to see
whether to continue looping or to exit the loop. When the loop is exited the
string `"Game Over"` is printed. We use `100 sleep` to pause for 100 ms every
iteration, making the game run at rougly 10 fps.

`start` just calls `initialize` to reset everything, then kicks off `game-loop`.
Because all the initialization happens in the `initialize` word, you can call
`start` again after game over.

------

And that's it! Hopefully all the code in the game made sense. If not, you can
try running individual words to see their effect on the stack and/or on the
variables.


## The End

真正的Forth要比我在这里说的（以及我编写的这个解释器）强大得多。一个真正的Forth系统能让你修改编译器如何工作，建立新的令字，以及让你完全定义你的环境，甚至基于Forth创建你自己的语言。

一个更好的学习Forth的书是Leo Brodie编写的[Forth起步](http://www.forth.com/starting-forth/)，它在线免费，告诉你很多这里没有的有趣的东西。它还有一些很好的练习题，让你测试一下你的水平。你可能需要下载安装[SwiftForth](http://www.forth.com/swiftforth/dl.html)来运行书中的代码。 
