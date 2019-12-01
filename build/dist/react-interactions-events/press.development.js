/** @license React vundefined
 * react-interactions-events/press.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('react-interactions/events/tap'), require('react-interactions/events/keyboard')) :
	typeof define === 'function' && define.amd ? define(['react', 'react-interactions/events/tap', 'react-interactions/events/keyboard'], factory) :
	(global.ReactEventsPress = factory(global.React,global.ReactEventsTap,global.ReactEventsKeyboard));
}(this, (function (React,tap,keyboard) { 'use strict';

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */
var warningWithoutStack = function () {};

{
  warningWithoutStack = function (condition, format) {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    if (format === undefined) {
      throw new Error('`warningWithoutStack(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (args.length > 8) {
      // Check before the condition to catch violations early.
      throw new Error('warningWithoutStack() currently supports at most 8 arguments.');
    }

    if (condition) {
      return;
    }

    if (typeof console !== 'undefined') {
      var argsWithFormat = args.map(function (item) {
        return '' + item;
      });
      argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
      // breaks IE9: https://github.com/facebook/react/issues/13610

      Function.prototype.apply.call(console.error, console, argsWithFormat);
    }

    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      throw new Error(message);
    } catch (x) {}
  };
}

var warningWithoutStack$1 = warningWithoutStack;

var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED; // Prevent newer renderers from RTE when used with older react package versions.
// Current owner and dispatcher used to share the same ref,
// but PR #14548 split them out to better support the react-debug-tools package.

if (!ReactSharedInternals.hasOwnProperty('ReactCurrentDispatcher')) {
  ReactSharedInternals.ReactCurrentDispatcher = {
    current: null
  };
}

if (!ReactSharedInternals.hasOwnProperty('ReactCurrentBatchConfig')) {
  ReactSharedInternals.ReactCurrentBatchConfig = {
    suspense: null
  };
}

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = warningWithoutStack$1;

{
  warning = function (condition, format) {
    if (condition) {
      return;
    }

    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
    var stack = ReactDebugCurrentFrame.getStackAddendum(); // eslint-disable-next-line react-internal/warning-and-invariant-args

    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    warningWithoutStack$1.apply(void 0, [false, format + '%s'].concat(args, [stack]));
  };
}

var warning$1 = warning;

var emptyObject = {};

function createGestureState(e, type) {
  return {
    altKey: e.altKey,
    buttons: e.type === 'tap:auxiliary' ? 4 : 1,
    ctrlKey: e.ctrlKey,
    defaultPrevented: e.defaultPrevented,
    key: e.key,
    metaKey: e.metaKey,
    pageX: e.pageX,
    pageY: e.pageX,
    pointerType: e.pointerType,
    shiftKey: e.shiftKey,
    target: e.target,
    timeStamp: e.timeStamp,
    type: type,
    x: e.x,
    y: e.y,
    preventDefault: function () {
      // NO-OP, we should remove this in the future
      {
        warning$1(false, 'preventDefault is not available on event objects created from event responder modules (React Flare). ' + 'Try wrapping in a conditional, i.e. `if (event.type !== "press") { event.preventDefault() }`');
      }
    },
    stopPropagation: function () {
      // NO-OP, we should remove this in the future
      {
        warning$1(false, 'stopPropagation is not available on event objects created from event responder modules (React Flare). ' + 'Try wrapping in a conditional, i.e. `if (event.type !== "press") { event.stopPropagation() }`');
      }
    }
  };
}

function isValidKey(e) {
  var key = e.key,
      target = e.target;
  var _ref = target,
      tagName = _ref.tagName,
      isContentEditable = _ref.isContentEditable;
  return (key === 'Enter' || key === ' ' || key === 'Spacebar') && tagName !== 'INPUT' && tagName !== 'TEXTAREA' && isContentEditable !== true;
}

function handlePreventDefault(preventDefault, e) {
  var key = e.key;

  if (preventDefault !== false && (key === ' ' || key === 'Enter' || key === 'Spacebar')) {
    e.preventDefault();
  }
}
/**
 * The lack of built-in composition for gesture responders means we have to
 * selectively ignore callbacks from useKeyboard or useTap if the other is
 * active.
 */


function usePress(props) {
  var safeProps = props || emptyObject;
  var disabled = safeProps.disabled,
      preventDefault = safeProps.preventDefault,
      onPress = safeProps.onPress,
      onPressChange = safeProps.onPressChange,
      onPressEnd = safeProps.onPressEnd,
      onPressMove = safeProps.onPressMove,
      onPressStart = safeProps.onPressStart;
  var activeResponder = React.useRef(null);
  var tap$$1 = tap.useTap({
    disabled: disabled || activeResponder.current === 'keyboard',
    preventDefault: preventDefault,
    onAuxiliaryTap: function (e) {
      if (onPressStart != null) {
        onPressStart(createGestureState(e, 'pressstart'));
      }

      if (onPressEnd != null) {
        onPressEnd(createGestureState(e, 'pressend'));
      } // Here we rely on Tap only calling 'onAuxiliaryTap' with modifiers when
      // the primary button is pressed


      if (onPress != null && (e.metaKey || e.shiftKey)) {
        onPress(createGestureState(e, 'press'));
      }
    },
    onTapStart: function (e) {
      if (activeResponder.current == null) {
        activeResponder.current = 'tap';

        if (onPressStart != null) {
          onPressStart(createGestureState(e, 'pressstart'));
        }
      }
    },
    onTapChange: onPressChange,
    onTapUpdate: function (e) {
      if (activeResponder.current === 'tap') {
        if (onPressMove != null) {
          onPressMove(createGestureState(e, 'pressmove'));
        }
      }
    },
    onTapEnd: function (e) {
      if (activeResponder.current === 'tap') {
        if (onPressEnd != null) {
          onPressEnd(createGestureState(e, 'pressend'));
        }

        if (onPress != null) {
          onPress(createGestureState(e, 'press'));
        }

        activeResponder.current = null;
      }
    },
    onTapCancel: function (e) {
      if (activeResponder.current === 'tap') {
        if (onPressEnd != null) {
          onPressEnd(createGestureState(e, 'pressend'));
        }

        activeResponder.current = null;
      }
    }
  });
  var keyboard$$1 = keyboard.useKeyboard({
    disabled: disabled || activeResponder.current === 'tap',
    onClick: function (e) {
      if (preventDefault !== false) {
        e.preventDefault();
      }

      if (activeResponder.current == null && onPress != null) {
        onPress(createGestureState(e, 'press'));
      }
    },
    onKeyDown: function (e) {
      if (activeResponder.current == null && isValidKey(e)) {
        handlePreventDefault(preventDefault, e);
        activeResponder.current = 'keyboard';

        if (onPressStart != null) {
          onPressStart(createGestureState(e, 'pressstart'));
        }

        if (onPressChange != null) {
          onPressChange(true);
        }
      }
    },
    onKeyUp: function (e) {
      if (activeResponder.current === 'keyboard' && isValidKey(e)) {
        handlePreventDefault(preventDefault, e);

        if (onPressChange != null) {
          onPressChange(false);
        }

        if (onPressEnd != null) {
          onPressEnd(createGestureState(e, 'pressend'));
        }

        if (onPress != null) {
          onPress(createGestureState(e, 'press'));
        }

        activeResponder.current = null;
      }
    }
  });
  return [tap$$1, keyboard$$1];
}

var Press = Object.freeze({
	usePress: usePress
});

var press = Press;

return press;

})));
