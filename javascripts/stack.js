function StackUnderflowError() {
  this.message = "栈已空！";
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
        throw new StackUnderflowError();
      }
    },
    print: function () {
      return "&nbsp;" + arr.join(" ");
    }
  };
}
