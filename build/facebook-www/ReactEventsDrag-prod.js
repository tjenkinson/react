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
  targetEventTypes = ["pointerdown"],
  rootEventTypes = ["pointerup", "pointercancel", "pointermove_active"];
"undefined" !== typeof window &&
  void 0 === window.PointerEvent &&
  (targetEventTypes.push("touchstart", "mousedown"),
  rootEventTypes.push(
    "mouseup",
    "mousemove",
    "touchend",
    "touchcancel",
    "touchmove_active"
  ));
function isFunction(obj) {
  return "function" === typeof obj;
}
function dispatchDragEvent(
  context,
  listener,
  name,
  state,
  eventPriority,
  eventData
) {
  name = Object.assign(
    { target: state.dragTarget, type: name, timeStamp: context.getTimeStamp() },
    eventData
  );
  context.dispatchEvent(name, listener, eventPriority);
}
var DragResponder = React.unstable_createResponder("Drag", {
  targetEventTypes: targetEventTypes,
  getInitialState: function() {
    return {
      dragTarget: null,
      isPointerDown: !1,
      isDragging: !1,
      startX: 0,
      startY: 0,
      x: 0,
      y: 0
    };
  },
  onEvent: function(event, context, props, state) {
    var target = event.target,
      type = event.type;
    event = event.nativeEvent;
    switch (type) {
      case "touchstart":
      case "mousedown":
      case "pointerdown":
        state.isDragging ||
          ((event = "touchstart" === type ? event.changedTouches[0] : event),
          (type = state.startX = event.screenX),
          (event = state.startY = event.screenY),
          (state.x = type),
          (state.y = event),
          (state.dragTarget = target),
          (state.isPointerDown = !0),
          (props = props.onDragStart),
          isFunction(props) &&
            dispatchDragEvent(context, props, "dragstart", state, 0),
          context.addRootEventTypes(rootEventTypes));
    }
  },
  onRootEvent: function(event, context, props, state) {
    var type = event.type,
      nativeEvent = event.nativeEvent;
    switch (type) {
      case "touchmove":
      case "mousemove":
      case "pointermove":
        if (event.passive) break;
        state.isPointerDown &&
          ((type =
            "touchmove" === type ? nativeEvent.changedTouches[0] : nativeEvent),
          (event = type.screenX),
          (type = type.screenY),
          (state.x = event),
          (state.y = type),
          event !== state.startX || type !== state.startY) &&
          (state.isDragging
            ? ((props = props.onDragMove),
              isFunction(props) &&
                dispatchDragEvent(context, props, "dragmove", state, 1, {
                  diffX: event - state.startX,
                  diffY: type - state.startY
                }),
              nativeEvent.preventDefault())
            : ((state.isDragging = !0),
              (state = props.onDragChange),
              isFunction(state) && context.dispatchEvent(!0, state, 1)));
        break;
      case "pointercancel":
      case "touchcancel":
      case "touchend":
      case "mouseup":
      case "pointerup":
        state.isDragging &&
          ((nativeEvent = props.onDragEnd),
          isFunction(nativeEvent) &&
            dispatchDragEvent(context, nativeEvent, "dragend", state, 0),
          (props = props.onDragChange),
          isFunction(props) && context.dispatchEvent(!1, props, 1),
          (state.isDragging = !1)),
          state.isPointerDown &&
            ((state.dragTarget = null),
            (state.isPointerDown = !1),
            context.removeRootEventTypes(rootEventTypes));
    }
  }
});
module.exports = {
  DragResponder: DragResponder,
  useDrag: function(props) {
    return React.unstable_useResponder(DragResponder, props);
  }
};
