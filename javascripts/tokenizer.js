'use strict';

function Tokenizer(input) {
  var index = 0;
  var length = input.length;

  function processMore(pcre) {
    var value = "";
    while (pcre.test(input[index]) && index < length) {
      value += input[index];
      index++;
    }
    return value;
  }

  function getNextToken() {
    var han = /[\u4E00-\uFA29]/;
    var english = /[a-z]/i;
    var digital = /[0-9]-/;

    var isWord = false;
    var value = "";

    if (han.test(input[index]) && index < length) {
      value = input[index];
      index++;
      isWord = true;
    }
    else if (digital.test(input[index]) && index < length) {
      value = input[index];
      index++;
      value += processMore(digital);
      isWord = false;
    }
    else if (english.test(input[index]) && index < length) {
      value = input[index];
      index++;
      value += processMore(english);
      isWord = true;
    } else if (index < length) {
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
