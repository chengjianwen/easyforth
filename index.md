---
layout: default
---

<div markdown="1" class="toc">
  * toc
  {:toc}
</div>


## 介绍

这本小手册指导你来学习一门新的编程语言：Forth。Forth是一门不同于其它语言的编程语言，它既不是函数式，也不是面向对象的，它没有类型检查，它甚至没有任何语法可言。它产生于上个世纪的七十年代，现在仍然在[这些领域](http://www.forth.com/resources/apps/more-applications.html)使用。

为什么你需要学习一门新的语言？因为每一门新的编程语言都会教给你如何用新的角度来思考问题。Forth不但很容易学习，而且它教给了你用不同于以往所有的角度来思考问题，它是一门能够拓展你编程思路的优秀语言。

这本手册包括了一个简单的基于JavaScript实现的Forth I。它显然并不完美，缺少很多Forth系统中应该有的功能。它唯一的作用就是能够让你很容易的进行示例演示（如果你非常熟悉Forth，请[移步到这里](https://github.com/skilldrick/easyforth)以获得更好的体验。

本书假设你已经学习过其它至少一门编程语言，对堆栈这种数据结构已经有了最基本的了解。

## 输入一些值

Forth与其它编程语言的区别在于堆栈的使用。在Forth中，一切都是围绕着堆栈工作。任何时候你输入一个数值，它就会被放入堆栈中。如果你想将两个数值相加，输入“+”可以将堆栈最上面的两个数值取出来进行相加，然后将结果再放入堆栈。

我们可以来看一个例子。把下面的内容输入（不能拷贝/粘贴）到解释器中，在每一行的最后按“回车”键。
    1
    2
    3

{% include editor.html %}

每次你通过“回车”键输入一行，Forth解释器就会执行这一行内容，然后会有一句“完成”告诉你没有发生错误。在执行每一行内容时，你还应该注意到最上面一行不断得在补充数字，它就是Forth中堆栈的当前状态，它看起来应该是这样的：

{% include stack.html stack="1 2 3" %}

现在，仍然在这个解释器里，输入“和”然后按“回车”键，堆栈最外面的两个值，“2”和“3”，就会被“5”替代。

{% include stack.html stack="1 5" %}

这个时候，你的编辑器窗口应该是这个样子：

<div class="editor-preview editor-text">1  <span class="output">ok</span>
2  <span class="output">ok</span>
3  <span class="output">ok</span>
+  <span class="output">ok</span>
</div>

再次输入“和”，并按“回车”键，最外面的两个值会被替换为6。如果你输入更多的“和”，尽管堆栈中只有一个值，Forth仍然会试图从堆栈中获取两个值，这样就会产生“堆栈已空”的错误：

<div class="editor-preview editor-text">1  <span class="output">ok</span>
2  <span class="output">ok</span>
3  <span class="output">ok</span>
+  <span class="output">ok</span>
+  <span class="output">ok</span>
+  <span class="output">堆栈已空</span>
</div>

Forth不是必须把每个要输入的值作为单独的一行进行输入。在下面的编辑器中，输入下面的内容，并按“回车”键：

    123 456 +

{% include editor.html size="small"%}

现在堆栈的状态应该显示为：

{% include stack.html stack="579" %}

这种操作符位于操作数之后的形式被成为[逆波兰表示法](https://zh.wikipedia.org/wiki/%E9%80%86%E6%B3%A2%E5%85%B0%E8%A1%A8%E7%A4%BA%E6%B3%95)。让我们试一些更为复杂的例子，比如计算“10 * (5 + 2)”。在解释器中输入下面的内容：

    5 2 + 10 *

{% include editor.html size="small"%}

Forth的一个优点在于执行的顺序完全按照先后顺序进行。例如当执行“5 2 + 10 *”时，解释器先将5放入堆栈，然后是2，然后将它们相加，并将结果7放入堆栈，然后放入10，然后将7和10相乘。因此，不需要使用括号这样的符号将语句进行分组。

### 堆栈差异

大多数的Forth操作字会以各自的方式影响到堆栈的内容，一些从堆栈中取走值，一些把新的值放入堆栈，还有一些两者兼具。这些“堆栈差异”一般会用“(前 -- 后)”的形式来表示。例如“+”的堆栈差异为“(值 值 -- 值)”——位于“--”之前的两个值是堆栈最外面的两个值，“--”之后的值则是最后留在堆栈中的值。

## 字定义

Forth的语法非常简单。Forth代码被解释为一系列用空格分隔的字。几乎所有不是空格的符号都可以作为字来使用。当Forth解释器读取一个字时，它在内部的一个众所周知的字典中查找是否存在这个字的定义。如果找到这个字的定义，那它就会被执行。否则，这个字就会试图被作为一个值被放入堆栈，如果失败，就会发生错误。

你可以在下面试一下，输入“晕”（一个未经定义的字）然后按“回车”键。

{% include editor.html size="small"%}

你就会看到这样的结果：

<div class="editor-preview editor-text">晕  <span class="output">晕 ?</span></div>

“晕 ?”的意思是Forth没有找到“晕”字的定义，而且它也不是一个数值。

我们可以用“:”（冒号）和“;”（分号）为“晕”创建一个定义。“:”告诉Forth我们想定义一个新的字，其后的第一个字就是需要定义的新字，其余的内容（截止至“;”为止）就是为它定义的内容。通常我们在所定义的字和定义的内容之间用两个空格进行分隔。试一下下面的语句：

    : 晕  100 + ;
    1000 晕
    晕 晕 晕

**警告:** 一个常见的错误是“;”前面一定要有空格，因为Forth中的字需要用空格分隔，很多符号可以作为字来使用，而“+;”就是一个合法的字，所以它不会被解释为两个字。

{% include editor.html size="small"%}

正如你希望的那样，“晕”字仅仅是给堆栈最外面的值增加100。尽管很简单，但它能够让你明白定义一个新的字是如何运行的。

## 堆栈管理

Now we can start taking a look at some of Forth's predefined words. First,
let's look at some words for manipulating the elements at the top of the stack.

### `dup ( n -- n n )`

`dup` is short for "duplicate" -- it duplicates the top element of the stack. For example,
try this out:

    1 2 3 dup

{% include editor.html size="small" %}

You should end up with the following stack:

{% include stack.html stack="1 2 3 3" %}

### `drop ( n -- )`

`drop` simply drops the top element of the stack. Running:

    1 2 3 drop

gives you a stack of:

{% include stack.html stack="1 2" %}

{% include editor.html size="small"%}

### `swap ( n1 n2 -- n2 n1 )`

`swap`, as you may have guessed, swaps the top two elements of the stack. For example:

    1 2 3 4 swap

will give you:

{% include stack.html stack="1 2 4 3" %}

{% include editor.html size="small"%}

### `over ( n1 n2 -- n1 n2 n1 )`

`over` is a bit less obvious: it takes the second element from the top of the
stack and duplicates it to the top of the stack. Running this:

    1 2 3 over

will result in this:

{% include stack.html stack="1 2 3 2" %}

{% include editor.html size="small"%}

### `rot ( n1 n2 n3 -- n2 n3 n1 )`

Finally, `rot` "rotates" the top _three_ elements of the stack. The third
element from the top of the stack gets moved to the top of the stack, pushing
the other two elements down.

    1 2 3 rot

gives you:

{% include stack.html stack="2 3 1" %}

{% include editor.html size="small"%}


## Generating Output

Next, let's look at some words for outputting text to the console.

### `. ( n -- )` (period)

The simplest output word in Forth is `.`. You can use `.` to output the top of
the stack in the output of the current line. For example, try running this
(make sure to include all the spaces!):

    1 . 2 . 3 . 4 5 6 . . .

{% include editor.html size="small"%}

You should see this:

<div class="editor-preview editor-text">1 . 2 . 3 . 4 5 6 . . . <span class="output">1 2 3 6 5 4  ok</span></div>

Going through this in order, we push `1`, then pop it off and output it. Then
we do the same with `2` and `3`. Next we push `4`, `5`, and `6` onto the stack.
We then pop them off and output them one-by-one. That's why the last three
numbers in the output are reversed: the stack is last in, first out.

### `emit ( c -- )`

`emit` can be used to output numbers as ascii characters. Just like `.` outputs
the number at the top of the stack, `emit` outputs that number as an ascii
character. For example:

     33 119 111 87 emit emit emit emit

{% include editor.html size="small"%}

I won't give the output here so as to not ruin the surprise. This could also be
written as:

    87 emit 111 emit 119 emit 33 emit

Unlike `.`, `emit` doesn't output any space after each character, enabling you
to build up arbitrary strings of output.

### `cr ( -- )`

`cr` is short for carriage return -- it simply outputs a newline:

    cr 100 . cr 200 . cr 300 .

{% include editor.html size="small"%}

This will output:

<div class="editor-preview editor-text">cr 100 . cr 200 . cr 300 .<span class="output">
100
200
300  ok</span></div>

### `." ( -- )`

Finally we have `."` -- a special word for outputting strings. The `."` word works
differently inside definitions to interactive mode. `."` marks the beginning of
a string to output, and the end of the string is marked by `"`. The closing `"`
isn't a word, and so doesn't need to be space-delimited. Here's an example:

    : say-hello  ." Hello there!" ;
    say-hello

{% include editor.html size="small"%}

You should see the following output

<div class="editor-preview editor-text">say-hello <span class="output">Hello there! ok</span></div>

We can combine `."`, `.`, `cr`, and `emit` to build up more complex output:

    : print-stack-top  cr dup ." The top of the stack is " .
      cr ." which looks like '" dup emit ." ' in ascii  " ;
    48 print-stack-top

{% include editor.html size="small"%}

Running this should give you the following output:

<div class="editor-preview editor-text">48 print-stack-top <span class="output">
The top of the stack is 48
which looks like '0' in ascii   ok</span></div>


## Conditionals and Loops

Now onto the fun stuff! Forth, like most other languages, has conditionals and
loops for controlling the flow of your program. To understand how they work,
however, first we need to understand booleans in Forth.

### Booleans

There's actually no boolean type in Forth. The number `0` is treated as false,
and any other number is true, although the canonical true value is `-1` (all
boolean operators return `0` or `-1`).

To test if two numbers are equal, you can use `=`:

    3 4 = .
    5 5 = .

This should output:

<div class="editor-preview editor-text">3 4 = . <span class="output">0  ok</span>
5 5 = . <span class="output">-1  ok</span></div>

{% include editor.html size="small"%}

You can use `<` and `>` for less than and greater than. `<` checks to see if the
second item from the top of the stack is less than the top item of the stack, and
vice versa for `>`:

    3 4 < .
    3 4 > .

<div class="editor-preview editor-text">3 4 < . <span class="output">-1  ok</span>
3 4 > . <span class="output">0  ok</span></div>

{% include editor.html size="small"%}

The boolean operators And, Or, and Not are available as `and`, `or`, and `invert`:

    3 4 < 20 30 < and .
    3 4 < 20 30 > or .
    3 4 < invert .

The first line is the equivalent of `3 < 4 & 20 < 30` in a C-based language.
The second line is the equivalent of `3 < 4 | 20 > 30`. The third line is the
equivalent of `!(3 < 4)`.

`and`, `or`, and `invert` are all bitwise operations. For well-formed flags
(`0` and `-1`) they'll work as expected, but they'll give incorrect results for
arbitrary numbers.

{% include editor.html size="small"%}

### `if then`

Now we can finally get onto conditionals. Conditionals in Forth can only be
used inside definitions. The simplest conditional statement in Forth is `if
then`, which is equivalent to a standard `if` statement in most languages.
Here's an example of a definition using `if then`. In this example, we're also
using the `mod` word, which returns the modulo of the top two numbers on the
stack. In this case, the top number is 5, and the other is whatever was placed
on the stack before calling `buzz?`. Therefore, `5 mod 0 =` is a boolean
expression that checks to see if the top of the stack is divisible by 5.

    : buzz?  5 mod 0 = if ." Buzz" then ;
    3 buzz?
    4 buzz?
    5 buzz?

{% include editor.html size="small"%}

This will output:

<div class="editor-preview editor-text">3 buzz?<span class="output">  ok</span>
4 buzz?<span class="output">  ok</span>
5 buzz?<span class="output"> Buzz ok</span></div>

It's important to note that the `then` word marks the end of the `if` statement.
This makes it equivalent to `fi` in Bash or `end` in Ruby, for example.

Another important thing to realize is that `if` consumes the top value on the
stack when it checks to see if it's true or false.

### `if else then`

`if else then` is equivalent to an `if/else` statement in most languages. Here's
an example of its use:

    : is-it-zero?  0 = if ." Yes!" else ." No!" then ;
    0 is-it-zero?
    1 is-it-zero?
    2 is-it-zero?

{% include editor.html size="small"%}

This outputs:

<div class="editor-preview editor-text">0 is-it-zero?<span class="output"> Yes! ok</span>
1 is-it-zero?<span class="output"> No! ok</span>
2 is-it-zero?<span class="output"> No! ok</span></div>

This time, the if clause (consequent) is everything between `if` and `else`,
and the else clause (alternative) is everything between `else` and `then`.

### `do loop`

`do loop` in Forth most closely resembles a `for` loop in most C-based languages.
In the body of a `do loop`, the special word `i` pushes the current loop index
onto the stack.

The top two values on the stack give the starting value (inclusive) and ending
value (exclusive) for the `i` value. The starting value is taken from the top
of the stack. Here's an example:

    : loop-test  10 0 do i . loop ;
    loop-test

{% include editor.html size="small"%}

This should output:

<div class="editor-preview editor-text">loop-test<span class="output"> 0 1 2 3 4 5 6 7 8 9  ok</span></div>

The expression `10 0 do i . loop` is roughly equivalent to:

    for (int i = 0; i < 10; i++) {
      print(i);
    }

### Fizz Buzz

We can write the classic [Fizz Buzz](https://en.wikipedia.org/wiki/Fizz_buzz)
program easily using a `do loop`:

    : fizz?  3 mod 0 = dup if ." Fizz" then ;
    : buzz?  5 mod 0 = dup if ." Buzz" then ;
    : fizz-buzz?  dup fizz? swap buzz? or invert ;
    : do-fizz-buzz  25 1 do cr i fizz-buzz? if i . then loop ;
    do-fizz-buzz

{% include editor.html %}

`fizz?` checks to see if the top of the stack is divisible by 3 using `3 mod 0
=`. It then uses `dup` to duplicate this result. The top copy of the value is
consumed by `if`.  The second copy is left on the stack and acts as the return
value of `fizz?`.

If the number on top of the stack is divisible by 3, the string `"Fizz"` will
be output, otherwise there will be no output.

`buzz?` does the same thing but with 5, and outputs the string `"Buzz"`.

`fizz-buzz?` calls `dup` to duplicate the value on top of the stack, then calls
`fizz?`, converting the top copy into a boolean. After this, the top of the
stack consists of the original value, and the boolean returned by `fizz?`.
`swap` swaps these, so the original top-of-stack value is back on top, and the
boolean is underneath. Next we call `buzz?`, which replaces the top-of-stack
value with a boolean flag. Now the top two values on the stack are booleans
representing whether the number was divisible by 3 or 5.  After this, we call
`or` to see if either of these is true, and `invert` to negate this value.
Logically, the body of `fizz-buzz?` is equivalent to:

    !(x % 3 == 0 || x % 5 == 0)

Therefore, `fizz-buzz?` returns a boolean indicating if the argument is not
divisible by 3 or 5, and thus should be printed.  Finally, `do-fizz-buzz` loops
from 1 to 25, calling `fizz-buzz?` on `i`, and outputting `i` if `fizz-buzz?`
returns true.

If you're having trouble figuring out what's going on inside `fizz-buzz?`, the
example below might help you to understand how it works. All we're doing here
is executing each word of the definition of `fizz-buzz?` on a separate line. As
you execute each line, watch the stack to see how it changes:

    : fizz?  3 mod 0 = dup if ." Fizz" then ;
    : buzz?  5 mod 0 = dup if ." Buzz" then ;
    4
    dup
    fizz?
    swap
    buzz?
    or
    invert

{% include editor.html %}

Here's how each line affects the stack:

    4         4 <- Top
    dup       4 4 <- Top
    fizz?     4 0 <- Top
    swap      0 4 <- Top
    buzz?     0 0 <- Top
    or        0 <- Top
    invert    -1 <- Top

Remember, the final value on the stack is the return value of the `fizz-buzz?`
word. In this case, it's true, because the number was not divisible by 3 or 5,
and so _should_ be printed.

Here's the same thing but starting with 5:

    5         5 <- Top
    dup       5 5 <- Top
    fizz?     5 0 <- Top
    swap      0 5 <- Top
    buzz?     0 -1 <- Top
    or        -1 <- Top
    invert    0 <- Top

In this case the original top-of-stack value was divisible by 5, so nothing
should be printed.


## Variables and Constants

Forth also allows you to save values in variables and constants. Variables allow
you to keep track of changing values without having to store them on the stack.
Constants give you a simple way to refer to a value that won't change.

### Variables

Because the role of local variables is generally played by the stack, variables
in Forth are used more to store state that may be needed across multiple
words.

Defining variables is simple:

    variable balance

This basically associates a particular memory location with the name `balance`.
`balance` is now a word, and all it does is to push its memory location onto the
stack:

    variable balance
    balance

{% include editor.html size="small"%}

You should see the value `1000` on the stack. This Forth implementation arbitrarily
starts storing variables at the memory location `1000`.

The word `!` stores a value at the memory location referenced by a variable, and the
word `@` fetches the value from a memory location:

    variable balance
    123 balance !
    balance @

{% include editor.html size="small"%}

This time you should see the value `123` on the stack. `123 balance` pushes the
value and the memory location onto the stack, and `!` stores that value at that
memory location. Likewise, `@` retrieves the value based on the memory location,
and pushes that value onto the stack. If you've used C or C++, you can think of
`balance` as a pointer that is dereferenced by `@`.

The word `?` is defined as `@ .` and it prints the current value of a variable.
The word `+!` is used to increase the value of a variable by a certain amount
(like `+=` in C-based languages).

    variable balance
    123 balance !
    balance ?
    50 balance +!
    balance ?

{% include editor.html size="small"%}

Run this code and you should see:

<div class="editor-preview editor-text">variable balance<span class="output">  ok</span>
123 balance ! <span class="output"> ok</span>
balance ? <span class="output">123  ok</span>
50 balance +! <span class="output"> ok</span>
balance ? <span class="output">173  ok</span>
</div>

### Constants

If you have a value that doesn't change, you can store it as a constant. Constants
are defined in one line, like this:

    42 constant answer

This creates a new constant called `answer` with the value `42`. Unlike variables,
constants just represent values, rather than memory locations, so there's no need
to use `@`.

    42 constant answer
    2 answer *

{% include editor.html size="small"%}

Running this will push the value `84` on the stack. `answer` is treated as if it
was the number it represents (just like constants and variables in other languages).


## Arrays

Forth doesn't exactly support arrays, but it does allow you to allocate a zone of
contiguous memory, a lot like arrays in C. To allocate this memory, use the `allot`
word.

    variable numbers
    3 cells allot
    10 numbers 0 cells + !
    20 numbers 1 cells + !
    30 numbers 2 cells + !
    40 numbers 3 cells + !

{% include editor.html size="small"%}

This example creates a memory location called `numbers`, and reserves three extra
memory cells after this location, giving a total of four memory cells. (`cells`
just multiplies by the cell-width, which is 1 in this implementation.)

`numbers 0 +` gives the address of the first cell in the array. `10 numbers 0 + !`
stores the value `10` in the first cell of the array.

We can easily write words to simplify array access:

    variable numbers
    3 cells allot
    : number  ( offset -- addr )  cells numbers + ;

    10 0 number !
    20 1 number !
    30 2 number !
    40 3 number !

    2 number ?

{% include editor.html size="small"%}

`number` takes an offset into `numbers` and returns the memory address at that
offset. `30 2 number !` stores `30` at offset `2` in `numbers`, and `2 number ?`
prints the value at offset `2` in `numbers`.


## Keyboard Input

Forth has a special word called `key`, which is used for accepting keyboard input.
When the `key` word is executed, execution is paused until a key is pressed. Once
a key is pressed, the key code of that key is pushed onto the stack. Try out the
following:

    key . key . key .

{% include editor.html size="small"%}

When you run this line, you'll notice that at first nothing happens. This is because
the interpreter is waiting for your keyboard input. Try hitting the `A` key, and
you should see the keycode for that key, `65`, appear as output on the current line.
Now hit `B`, then `C`, and you should see the following:

<div class="editor-preview editor-text">key . key . key . <span class="output">65 66 67  ok</span></div>


### Printing keys with `begin until`

Forth has another kind of loop called `begin until`. This works like a `while`
loop in C-based languages. Every time the word `until` is hit, the interpreter
checks to see if the top of the stack is non-zero (true). If it is, it jumps
back to the matching `begin`. If not, execution continues.

Here's an example of using `begin until` to print key codes:

    : print-keycode  begin key dup . 32 = until ;
    print-keycode

{% include editor.html size="small"%}

This will keep printing key codes until you press space. You should see something like this:

<div class="editor-preview editor-text">print-keycode <span class="output">80 82 73 78 84 189 75 69 89 67 79 68 69 32  ok</span></div>

 `key` waits for key input, then `dup` duplicates the keycode from `key`. We
then use `.` to output the top copy of the keycode, and `32 =` to check to see
if the keycode is equal to 32. If it is, we break out of the loop, otherwise we
loop back to `begin`.


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

Forth is actually much more powerful than what I've taught here (and what I
implemented in my interpreter). A true Forth system allows you to modify how
the compiler works and create new defining words, allowing you to completely
customize your environment and create your own languages within Forth.

A great resource for learning the full power of Forth is the short book
["Starting Forth"](http://www.forth.com/starting-forth/) by Leo Brodie. It's
available for free online and teaches you all the fun stuff I left out. It also
has a good set of exercises for you to test out your knowledge. You'll need to
download a copy of [SwiftForth](http://www.forth.com/swiftforth/dl.html) to run
the code though.