function addPredefinedWords(addToDictionary, readLines, next) {
  function controlCode(code) {
    return {
      isControlCode: true,
      code: code
    };
  }

  [
    "定", "毕", "若", "否", "则", "复", "返",
    "直", "返", "变", "常"
  ].forEach(function (code) {
    addToDictionary(code, controlCode(code));
  });

  addToDictionary("印",  function (context) {
    return context.stack.pop() + " ";
  });

  addToDictionary("行",  function (context) {
    return "\n";
  });

  addToDictionary("空",  function (context) {
    return "";
  });

  addToDictionary("跳",  function (context) {
    return "\t";
  });

  addToDictionary("栈", function (context) {
    return "\n" + context.stack.print();
  });

  addToDictionary("和", function (context) {
    context.stack.push(context.stack.pop() + context.stack.pop());
  });

  addToDictionary("差", function (context) {
    var a = context.stack.pop(), b = context.stack.pop();
    context.stack.push(b - a);
  });

  addToDictionary("积", function (context) {
    context.stack.push(context.stack.pop() * context.stack.pop());
  });

  addToDictionary("商", function (context) {
    var a = context.stack.pop(), b = context.stack.pop();
    context.stack.push(Math.floor(b / a));
  });

  addToDictionary("除", function (context) {
    var a = context.stack.pop(), b = context.stack.pop();
    context.stack.push(Math.floor(b % a));
    context.stack.push(Math.floor(b / a));
  });

  addToDictionary("余", function (context) {
    var a = context.stack.pop(), b = context.stack.pop();
    context.stack.push(Math.floor(b % a));
  });

  addToDictionary("增", function (context) {
    context.stack.push(context.stack.pop() + 1);
  });

  addToDictionary("减", function (context) {
    context.stack.push(context.stack.pop() - 1);
  });

  addToDictionary("倍", function (context) {
    context.stack.push(context.stack.pop() * 2);
  });

  addToDictionary("衰", function (context) {
    context.stack.push(context.stack.pop() / 2);
  });

  addToDictionary("负", function (context) {
    context.stack.push(-context.stack.pop());
  });

  addToDictionary("方", function (context) {
    var a = context.stack.pop();
    context.stack.push(a * a);
  });

  addToDictionary("根", function (context) {
    var a = context.stack.pop();
    context.stack.push(Math.floor(Math.sqrt(a)));
  });

  addToDictionary("幂", function (context) {
    var a = context.stack.pop();
    var b = context.stack.pop();
    context.stack.push(Math.pow(b, a));
  });

  addToDictionary("等", function (context) {
    context.stack.push(context.stack.pop() == context.stack.pop() ? TRUE : FALSE);
  });

  addToDictionary("是", function (context) {
    context.stack.push(context.stack.pop() != FALSE ? TRUE : FALSE);
  });

  addToDictionary("非", function (context) {
    context.stack.push(context.stack.pop() == FALSE ? TRUE : FALSE);
  });

  addToDictionary("小", function (context) {
    var a = context.stack.pop(), b = context.stack.pop();
    context.stack.push(b < a ? TRUE : FALSE);
  });

  addToDictionary("大", function (context) {
    var a = context.stack.pop(), b = context.stack.pop();
    context.stack.push(b > a ? TRUE : FALSE);
  });

  addToDictionary("且", function (context) {
    var a = context.stack.pop(), b = context.stack.pop();
    context.stack.push(b & a);
  });

  addToDictionary("或", function (context) {
    var a = context.stack.pop(), b = context.stack.pop();
    context.stack.push(b | a);
  });

  addToDictionary("非", function (context) {
    // invert is bitwise not
    context.stack.push(~context.stack.pop());
  });

  addToDictionary("报", function (context) {
    context.stack.push(context.returnStack.peek(1));
  });

  addToDictionary("止", function (context) {
    context.stack.push(context.returnStack.peek(2));
  });

  addToDictionary("字", function (context) {
    return String.fromCharCode(context.stack.pop());
  });

  addToDictionary("换", function (context) {
    var a = context.stack.pop(), b = context.stack.pop();
    context.stack.push(a);
    context.stack.push(b);
  });

  addToDictionary("重", function (context) {
    var a = context.stack.pop();
    context.stack.push(a);
    context.stack.push(a);
  });

  addToDictionary("挖", function (context) {
    var a = context.stack.pop(), b = context.stack.pop(), c = context.stack.pop();
    context.stack.push(b);
    context.stack.push(a);
    context.stack.push(c);
  });

  addToDictionary("弃", function (context) {
    context.stack.pop();
  });

  addToDictionary("写", function (context) {
    var address = context.stack.pop();
    var value = context.stack.pop();
    context.memory.setValue(address, value);
    context.onMemoryChange && context.onMemoryChange(address, value);
  });

  addToDictionary("读", function (context) {
    var address = context.stack.pop();
    context.stack.push(context.memory.getValue(address));
  });

  addToDictionary("扩", function (context) {
    context.memory.allot(context.stack.pop());
  });

  addToDictionary("随", function (context) {
    var range = context.stack.pop();
    context.stack.push(Math.floor(Math.random() * range));
  });

  addToDictionary("key", function (context) {
    context.pause = true;

    // set callback for when key is pressed
    context.keydown = function (keyCode) {
      context.pause = false;
      context.keydown = null;
      context.stack.push(keyCode);
      context.onContinue();
    };
  });

  readLines([
    "定啥读印毕",

    "变像", // start of graphics memory
    "575扩", // graphics memory takes 24 * 24 = 576 cells altogether
    "变lastkey", // start of graphics memory
  ], next);
}
