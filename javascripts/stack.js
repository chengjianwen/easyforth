function StackUnderflowError() {
  this.message = "栈已空";
}

function Stack(name) {
  var arr = [];

  return {
    push: function (item) {
      arr.push(item);
    },
    peek: function (offset) {
      offset = offset || 1;
      return arr[arr.length - offset];
    },
    pop: function () {
      if (arr.length > 0) {
        return arr.pop();
      } else {
        console.warn("取“" + name + "”时发现栈已空");
        throw new StackUnderflowError();
      }
    },
    print: function () {
      alert(arr.length);
      return arr.join(" ");
    }
  };
}
