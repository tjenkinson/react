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
  hasPointerEvents =
    "undefined" !== typeof window && void 0 !== window.PointerEvent,
  rootEventTypes = hasPointerEvents
    ? ["pointercancel", "pointerup"]
    : ["touchcancel", "touchend"];
function isFunction(obj) {
  return "function" === typeof obj;
}
function dispatchEvent(event, listener, context, state, name, eventPriority) {
  var target = state.scrollTarget,
    pointerType = state.pointerType;
  state = state.direction;
  var clientX = null,
    clientY = null,
    pageX = null,
    pageY = null,
    screenX = null,
    screenY = null;
  event &&
    ((event = event.nativeEvent),
    (clientX = event.clientX),
    (clientY = event.clientY),
    (pageX = event.pageX),
    (pageY = event.pageY),
    (screenX = event.screenX),
    (screenY = event.screenY));
  name = {
    target: target,
    type: name,
    pointerType: pointerType,
    direction: state,
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
  context.dispatchEvent(name, listener, eventPriority);
}
var ScrollResponder = React.unstable_createResponder("Scroll", {
  targetEventTypes: hasPointerEvents
    ? ["scroll", "pointerdown", "keyup", "wheel"]
    : ["scroll", "mousedown", "touchstart", "keyup", "wheel"],
  getInitialState: function() {
    return {
      direction: "",
      isTouching: !1,
      pointerType: "",
      prevScrollTop: 0,
      prevScrollLeft: 0,
      scrollTarget: null
    };
  },
  onEvent: function(event, context, props, state) {
    var pointerType = event.pointerType,
      target = event.target,
      type = event.type;
    if (props.disabled)
      state.isTouching &&
        ((state.isTouching = !1),
        (state.scrollTarget = null),
        (state.isDragging = !1),
        (state.direction = ""),
        context.removeRootEventTypes(rootEventTypes));
    else
      switch (type) {
        case "scroll":
          pointerType = state.scrollTarget;
          var scrollTop = (type = 0);
          if (9 === target.nodeType) {
            var bodyNode = target.body;
            null !== bodyNode &&
              ((type = bodyNode.offsetLeft), (scrollTop = bodyNode.offsetTop));
          } else (type = target.scrollLeft), (scrollTop = target.scrollTop);
          state.direction =
            null !== pointerType
              ? scrollTop === state.scrollTop
                ? type > state.scrollLeft
                  ? "right"
                  : "left"
                : scrollTop > state.scrollTop
                  ? "down"
                  : "up"
              : "";
          state.scrollTarget = target;
          state.scrollLeft = type;
          state.scrollTop = scrollTop;
          state.isTouching &&
            !state.isDragging &&
            ((state.isDragging = !0),
            (target = props.onScrollDragStart),
            isFunction(target) &&
              dispatchEvent(
                event,
                target,
                context,
                state,
                "scrolldragstart",
                1
              ));
          props = props.onScroll;
          isFunction(props) &&
            dispatchEvent(event, props, context, state, "scroll", 1);
          break;
        case "keyup":
          state.pointerType = pointerType;
          break;
        case "mousedown":
        case "wheel":
          state.pointerType = "mouse";
          break;
        case "pointerdown":
          state.pointerType = pointerType;
          "touch" !== pointerType ||
            state.isTouching ||
            ((state.isTouching = !0),
            context.addRootEventTypes(rootEventTypes));
          break;
        case "touchstart":
          state.isTouching ||
            ((state.isTouching = !0),
            (state.pointerType = "touch"),
            context.addRootEventTypes(rootEventTypes));
      }
  },
  onRootEvent: function(event, context, props, state) {
    switch (event.type) {
      case "pointercancel":
      case "pointerup":
      case "touchcancel":
      case "touchend":
        state.isTouching &&
          ((props = props.onScrollDragEnd),
          state.isDragging &&
            isFunction(props) &&
            dispatchEvent(event, props, context, state, "scrolldragend", 1),
          (state.isTouching = !1),
          (state.isDragging = !1),
          (state.scrollTarget = null),
          (state.pointerType = ""),
          context.removeRootEventTypes(rootEventTypes));
    }
  },
  onUnmount: function() {}
});
module.exports = {
  ScrollResponder: ScrollResponder,
  useScroll: function(props) {
    return React.unstable_useResponder(ScrollResponder, props);
  }
};
