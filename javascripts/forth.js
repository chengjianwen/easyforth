'use strict';

var FALSE = 0;
var TRUE = -1;

function Forth(next) {
  // Core structures
  var context = {
    stack: Stack('Argument Stack'),
    returnStack: Stack('Return Stack'),
    dictionary: Dictionary(),
    memory: Memory(),
    // This is set within readLine as a callback to continue processing tokens
    pause: false,
    // once sleep has finished
    onContinue: null
  };

  // This variable is shared across multiple calls to readLine,
  // as definitions can span multiple lines
  var currentDefinition = null;

  function MissingWordError(word) {
    this.message = "“" + word + "”未定义！";
  }

  function namedFunction(name, func) {
    func._name = name;
    return func;
  }

  // Convert token into an action that executes that token's behavior
  function tokenToAction(token) {
    var word = token.value;

    if (token.isWord) {
      var definition = context.dictionary.lookup(word);
      if (definition !== null)
          return definition;
      else
          throw new MissingWordError(word);
    } else if (isFinite(word)) {
      return namedFunction("Number: " + word, function (context) {
        context.stack.push(+word);
      });
    } else
      throw new MissingWordError(word);

    return function () {
      return "";
    };
  }

  function addToDictionary(name, definition) {
    context.dictionary.add(name, namedFunction(name, definition));
  }

  // compile actions into definition and add definition to dictionary
  function compileAndAddToDictionary(name, actions) {
    var definition = compile(context.dictionary, actions);
    addToDictionary(name, definition);
  }

  function createVariable(name) {
    var pointer = context.memory.addVariable(name);
    addToDictionary(name, function (context) {
      context.stack.push(pointer);
    });
  }

  function createConstant(name, value) {
    addToDictionary(name, function (context) {
      context.stack.push(value);
    });
  }

  function startDefinition(name) {
    currentDefinition = { name: name, actions: [] };
  }

  function endDefinition() {
    compileAndAddToDictionary(currentDefinition.name, currentDefinition.actions);
    currentDefinition = null;
  }

  function addActionToCurrentDefinition(action) {
    if (action.code === "毕") {
      endDefinition();
    } else {
      currentDefinition.actions.push(action);
    }
  }

  function executeRuntimeAction(tokenizer, action, next) {
    switch (action.code) {
    case "变":
      createVariable(tokenizer.nextToken().value);
      break;
    case "常":
      createConstant(tokenizer.nextToken().value, context.stack.pop());
      break;
    case "定":
      startDefinition(tokenizer.nextToken().value);
      break;
    default:
      if (action.length == 2) { // has next callback
        action(context, next);
      } else {
        next(action(context));
      }
      return;
    }

    next("");
  }

  // Read a line of input. Callback is called with output for this line.
  function readLine(line, outputCallback, next) {
    if (!next) {
      next = outputCallback;
      outputCallback = null;
    }
    context.addOutput = outputCallback || function () {};
    var tokenizer = Tokenizer(line);

    // processNextToken recursively executes tokens
    function processNextToken() {
      var nextToken = tokenizer.nextToken();

      if (!nextToken) { // reached end of line
        if (!currentDefinition) { // don't append output while definition is in progress
          context.addOutput(" 完成！");
        }
        next();
        return;
      }

      var action = tokenToAction(nextToken)

      if (currentDefinition) { // Are we currently defining a definition?
        addActionToCurrentDefinition(action);
        processTokens();
      } else {
        executeRuntimeAction(tokenizer, action, function (output) {
          context.addOutput(output);

          if (context.pause) {
            context.onContinue = processTokens;
          } else {
            processTokens();
          }
        });
      }
    }

    function processTokens() {
      try {
        processNextToken();
      } catch (e) {
        currentDefinition = null;
        context.addOutput(" " + e.message);
        next();
      }
    }

    processTokens();
  }

  function readLines(codeLines, callbacks, next) {
    if (callbacks && !next) {
      next = callbacks;
      callbacks = null;
    }

    if (codeLines.length == 0) {
      next();
      return;
    }

    var codeLine = codeLines[0]

    callbacks && callbacks.lineCallback(codeLine);
    readLine(codeLine, callbacks && callbacks.outputCallback, function () {
      readLines(codeLines.slice(1), callbacks, next);
    });
  }

  addPredefinedWords(addToDictionary, readLines, function () {
    next({
      readLine: readLine,
      readLines: readLines,
      keydown: function (keyCode) {
        context.memory.setValue(context.memory.getVariable("lastkey"), keyCode);
        context.keydown && context.keydown(keyCode);
      },
      getStack: function () {
        return context.stack.print();
      },
      popStack: function () {
        return context.stack.pop();
      },
      pushStack: function (item) {
        context.stack.push(item);
      },
      setMemoryHandler: function (cb) {
        context.onMemoryChange = function (address, value) {
          cb(address, value, context.memory.getVariable("像"));
        };
      }
    });
  });
}
