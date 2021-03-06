'use strict';

function Tokenizer(input) {
  var index = 0;
  var length = input.length;

  function processMore(r) {
    var v = "";
    while (r.test(input[index]) && index < length) {
      v += input[index];
      index++;
    }
    return v;
  }

  function getNextToken() {
    var cjkWord = {
        beginWith: /[\u4E00-\uFA29]/,
        contWith: null
    }
    var engWord = {
        beginWith: /[a-z]/i,
        contWith: /[a-z]/i
    }
    var numStr = {
        beginWith: /[0-9]|-/,
        contWith: /[0-9]|e|\./
    }
    var spaceStr = {
        beginWith: / /,
        contWith: / /
    }

    var isWord = false;
    var value = "";

    if (cjkWord.beginWith.test(input[index]) && index < length) {
      value = input[index];
      index++;
      isWord = true;
    }
    else if (engWord.beginWith.test(input[index]) && index < length) {
      value = input[index];
      index++;
      value += processMore(engWord.contWith);
      isWord = true;
    }
    else if (numStr.beginWith.test(input[index]) && index < length) {
      value = input[index];
      index++;
      value += processMore(numStr.contWith);
      isWord = false;
    } 
    else if (spaceStr.beginWith.test(input[index]) && index < length) {
      index++;
      processMore(spaceStr.contWith);
      return getNextToken(); // ignore this token and return the next one
    } 
    else if (index < length) {
      // THIS INVALID CHARACTER WAS IGNORED!
      index++;
      return getNextToken(); // ignore this token and return the next one
    }

    if (!value) {
      return null;
    }
    return {
      value: value,
      isWord: isWord
    };
  }

  function nextToken() {
    return getNextToken();
  }

  return {
    nextToken: nextToken
  };
}

/*
var token = Tokenizer("你好100印english 好不好");
var word = token.nextToken();
while (word) {
    console.log(word.value);
    word = token.nextToken();
}
*/
