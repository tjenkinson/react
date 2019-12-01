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
var React = require("react");
function isFunction(obj) {
  return "function" === typeof obj;
}
function createHoverEvent(event, context, type, target) {
  var clientX = null,
    clientY = null,
    pageX = null,
    pageY = null,
    screenX = null,
    screenY = null,
    pointerType = "";
  event &&
    ((screenY = event.nativeEvent),
    (pointerType = event.pointerType),
    (clientX = screenY.clientX),
    (clientY = screenY.clientY),
    (pageX = screenY.pageX),
    (pageY = screenY.pageY),
    (screenX = screenY.screenX),
    (screenY = screenY.screenY));
  return {
    pointerType: pointerType,
    target: target,
    type: type,
    timeStamp: context.getTimeStamp(),
    clientX: clientX,
    clientY: clientY,
    pageX: pageX,
    pageY: pageY,
    screenX: screenX,
    screenY: screenY,
    x: clientX,
    y: clientY
  };
}
function dispatchHoverStartEvents(event, context, props, state) {
  var target = state.hoverTarget;
  if (
    null === event ||
    !context.isTargetWithinResponderScope(event.nativeEvent.relatedTarget)
  )
    if (((state.isHovered = !0), !state.isActiveHovered)) {
      state.isActiveHovered = !0;
      var onHoverStart = props.onHoverStart;
      isFunction(onHoverStart) &&
        ((event = createHoverEvent(event, context, "hoverstart", target)),
        context.dispatchEvent(event, onHoverStart, 1));
      props = props.onHoverChange;
      isFunction(props) &&
        context.dispatchEvent(state.isActiveHovered, props, 1);
    }
}
function dispatchHoverMoveEvent(event, context, props, state) {
  state = state.hoverTarget;
  props = props.onHoverMove;
  isFunction(props) &&
    ((event = createHoverEvent(event, context, "hovermove", state)),
    context.dispatchEvent(event, props, 1));
}
function dispatchHoverEndEvents(event, context, props, state) {
  var target = state.hoverTarget;
  if (
    null === event ||
    !context.isTargetWithinResponderScope(event.nativeEvent.relatedTarget)
  )
    if (((state.isHovered = !1), state.isActiveHovered)) {
      state.isActiveHovered = !1;
      var onHoverEnd = props.onHoverEnd;
      isFunction(onHoverEnd) &&
        ((event = createHoverEvent(event, context, "hoverend", target)),
        context.dispatchEvent(event, onHoverEnd, 1));
      props = props.onHoverChange;
      isFunction(props) &&
        context.dispatchEvent(state.isActiveHovered, props, 1);
      state.hoverTarget = null;
      state.isTouched = !1;
    }
}
function unmountResponder(context, props, state) {
  state.isHovered && dispatchHoverEndEvents(null, context, props, state);
}
var hoverResponderImpl = {
    targetEventTypes: [
      "pointerover",
      "pointermove",
      "pointerout",
      "pointercancel"
    ],
    getInitialState: function() {
      return { isActiveHovered: !1, isHovered: !1 };
    },
    allowMultipleHostChildren: !1,
    allowEventHooks: !0,
    onEvent: function(event, context, props, state) {
      var pointerType = event.pointerType,
        type = event.type;
      if (props.disabled)
        state.isHovered && dispatchHoverEndEvents(event, context, props, state);
      else
        switch (type) {
          case "pointerover":
            state.isHovered ||
              "touch" === pointerType ||
              ((state.hoverTarget = context.getResponderNode()),
              dispatchHoverStartEvents(event, context, props, state));
            break;
          case "pointermove":
            state.isHovered &&
              null !== state.hoverTarget &&
              dispatchHoverMoveEvent(event, context, props, state);
            break;
          case "pointerout":
          case "pointercancel":
            state.isHovered &&
              dispatchHoverEndEvents(event, context, props, state);
        }
    },
    onUnmount: unmountResponder
  },
  hoverResponderFallbackImpl = {
    targetEventTypes: ["mouseover", "mousemove", "mouseout", "touchstart"],
    getInitialState: function() {
      return {
        isActiveHovered: !1,
        isHovered: !1,
        isTouched: !1,
        ignoreEmulatedMouseEvents: !1
      };
    },
    allowMultipleHostChildren: !1,
    allowEventHooks: !0,
    onEvent: function(event, context, props, state) {
      var type = event.type;
      if (props.disabled)
        state.isHovered &&
          (dispatchHoverEndEvents(event, context, props, state),
          (state.ignoreEmulatedMouseEvents = !1)),
          (state.isTouched = !1);
      else
        switch (type) {
          case "mouseover":
            state.isHovered ||
              state.ignoreEmulatedMouseEvents ||
              ((state.hoverTarget = context.getResponderNode()),
              dispatchHoverStartEvents(event, context, props, state));
            break;
          case "mousemove":
            state.isHovered &&
            null !== state.hoverTarget &&
            !state.ignoreEmulatedMouseEvents
              ? dispatchHoverMoveEvent(event, context, props, state)
              : state.isHovered ||
                "mousemove" !== type ||
                ((state.ignoreEmulatedMouseEvents = !1),
                (state.isTouched = !1));
            break;
          case "mouseout":
            state.isHovered &&
              dispatchHoverEndEvents(event, context, props, state);
            break;
          case "touchstart":
            state.isHovered ||
              ((state.isTouched = !0), (state.ignoreEmulatedMouseEvents = !0));
        }
    },
    onUnmount: unmountResponder
  },
  HoverResponder = React.unstable_createResponder(
    "Hover",
    "undefined" !== typeof window && null != window.PointerEvent
      ? hoverResponderImpl
      : hoverResponderFallbackImpl
  );
module.exports = {
  HoverResponder: HoverResponder,
  useHover: function(props) {
    return React.unstable_useResponder(HoverResponder, props);
  }
};
