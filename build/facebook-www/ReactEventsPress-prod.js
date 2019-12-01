/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 * @preventMunge
 * @preserve-invariant-messages
 */

"use strict";
var React = require("react"),
  ReactEventsTap = require("ReactEventsTap"),
  ReactEventsKeyboard = require("ReactEventsKeyboard");
require("warning");
var ReactSharedInternals =
  React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
ReactSharedInternals.hasOwnProperty("ReactCurrentDispatcher") ||
  (ReactSharedInternals.ReactCurrentDispatcher = { current: null });
ReactSharedInternals.hasOwnProperty("ReactCurrentBatchConfig") ||
  (ReactSharedInternals.ReactCurrentBatchConfig = { suspense: null });
var emptyObject = {};
function createGestureState(e, type) {
  return {
    altKey: e.altKey,
    buttons: "tap:auxiliary" === e.type ? 4 : 1,
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
    preventDefault: function() {},
    stopPropagation: function() {}
  };
}
function isValidKey(e) {
  var key = e.key,
    _ref = e.target;
  e = _ref.tagName;
  _ref = _ref.isContentEditable;
  return (
    ("Enter" === key || " " === key || "Spacebar" === key) &&
    "INPUT" !== e &&
    "TEXTAREA" !== e &&
    !0 !== _ref
  );
}
function handlePreventDefault(preventDefault, e) {
  var key = e.key;
  !1 === preventDefault ||
    (" " !== key && "Enter" !== key && "Spacebar" !== key) ||
    e.preventDefault();
}
module.exports = {
  usePress: function(props) {
    var safeProps = props || emptyObject;
    props = safeProps.disabled;
    var preventDefault = safeProps.preventDefault,
      onPress = safeProps.onPress,
      onPressChange = safeProps.onPressChange,
      onPressEnd = safeProps.onPressEnd,
      onPressMove = safeProps.onPressMove,
      onPressStart = safeProps.onPressStart,
      activeResponder = React.useRef(null);
    safeProps = ReactEventsTap.useTap({
      disabled: props || "keyboard" === activeResponder.current,
      preventDefault: preventDefault,
      onAuxiliaryTap: function(e) {
        null != onPressStart &&
          onPressStart(createGestureState(e, "pressstart"));
        null != onPressEnd && onPressEnd(createGestureState(e, "pressend"));
        null != onPress &&
          (e.metaKey || e.shiftKey) &&
          onPress(createGestureState(e, "press"));
      },
      onTapStart: function(e) {
        null == activeResponder.current &&
          ((activeResponder.current = "tap"),
          null != onPressStart &&
            onPressStart(createGestureState(e, "pressstart")));
      },
      onTapChange: onPressChange,
      onTapUpdate: function(e) {
        "tap" === activeResponder.current &&
          null != onPressMove &&
          onPressMove(createGestureState(e, "pressmove"));
      },
      onTapEnd: function(e) {
        "tap" === activeResponder.current &&
          (null != onPressEnd && onPressEnd(createGestureState(e, "pressend")),
          null != onPress && onPress(createGestureState(e, "press")),
          (activeResponder.current = null));
      },
      onTapCancel: function(e) {
        "tap" === activeResponder.current &&
          (null != onPressEnd && onPressEnd(createGestureState(e, "pressend")),
          (activeResponder.current = null));
      }
    });
    props = ReactEventsKeyboard.useKeyboard({
      disabled: props || "tap" === activeResponder.current,
      onClick: function(e) {
        !1 !== preventDefault && e.preventDefault();
        null == activeResponder.current &&
          null != onPress &&
          onPress(createGestureState(e, "press"));
      },
      onKeyDown: function(e) {
        null == activeResponder.current &&
          isValidKey(e) &&
          (handlePreventDefault(preventDefault, e),
          (activeResponder.current = "keyboard"),
          null != onPressStart &&
            onPressStart(createGestureState(e, "pressstart")),
          null != onPressChange && onPressChange(!0));
      },
      onKeyUp: function(e) {
        "keyboard" === activeResponder.current &&
          isValidKey(e) &&
          (handlePreventDefault(preventDefault, e),
          null != onPressChange && onPressChange(!1),
          null != onPressEnd && onPressEnd(createGestureState(e, "pressend")),
          null != onPress && onPress(createGestureState(e, "press")),
          (activeResponder.current = null));
      }
    });
    return [safeProps, props];
  }
};
