'use strict';

function Tokenizer(input) {
  var index = 0;
  var length = input.length;

  function processString(pcre) {
    var value = "";
    while (pcre.test(input[index]) && index < length) {
      value += input[index];
      index++;
    }
    index++; // skip over final "
    return value;
  }

  function processParenComment() {
    index += 2; // skip over ( and space
    while (input[index] !== ')' && index < length) {
      index++;
    }

    index++; // skip over final )
  }

  function processNormalToken() {
    var value = "";
    while (validToken.test(input[index]) && index < length) {
      value += input[index];
      index++;
    }
    return value;
  }

  function getNextToken() {
    var whitespace = /\s+/;
    var han = /[\u4E00-\uFA29]/;
    var english = /[a-z]/i;
    var digital = /[0-9]/;

    var value = "";

    if (han.test(input[index]) && index < length)
      value = input[index];
    else if (digital.test(input[index]) && index < length)
      value = processString(digital);
    else if (english.test(input[index]) && index < length)
      value = processString(english);
    }
    else if (whitespace.test(input[index]) && index < length)
      processString(whitespace);

    if (isStringLiteral) {
      value = processString();
    } else if (isParenComment) {
      processParenComment();
      return getNextToken(); // ignore this token and return the next one
    } else if (isSlashComment) {
      value = null
    } else {
      value = processNormalToken();
    }

    if (!value) {
      return null;
    }

    return {
      value: value,
      isStringLiteral: isStringLiteral
    };
  }

  function nextToken() {
    return getNextToken();
  }

  return {
    nextToken: nextToken
  };
}
