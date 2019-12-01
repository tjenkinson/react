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
    "undefined" !== typeof window && void 0 !== window.PointerEvent;
"undefined" !== typeof window &&
  null != window.navigator &&
  /^Mac/.test(window.navigator.platform);
var buttonsEnum = { none: 0, primary: 1, secondary: 2, auxiliary: 4 };
function getTouchById(nativeEvent, pointerId) {
  if (null != pointerId) {
    nativeEvent = nativeEvent.changedTouches;
    for (var i = 0; i < nativeEvent.length; i++) {
      var touch = nativeEvent[i];
      if (touch.identifier === pointerId) return touch;
    }
  }
  return null;
}
function hasModifierKey(event) {
  event = event.nativeEvent;
  var ctrlKey = event.ctrlKey,
    metaKey = event.metaKey,
    shiftKey = event.shiftKey;
  return (
    !0 === event.altKey || !0 === ctrlKey || !0 === metaKey || !0 === shiftKey
  );
}
var rootEventTypes = hasPointerEvents
  ? "click_active contextmenu pointerup pointermove pointercancel scroll".split(
      " "
    )
  : "click_active contextmenu mouseup mousemove dragstart touchend touchmove touchcancel scroll".split(
      " "
    );
function createPointerEventGestureState(context, props, state, event) {
  context = context.getTimeStamp();
  event = event.nativeEvent;
  return {
    altKey: event.altKey,
    ctrlKey: event.ctrlKey,
    height: event.height,
    metaKey: event.metaKey,
    pageX: event.pageX,
    pageY: event.pageY,
    pointerType: event.pointerType,
    pressure: event.pressure,
    screenX: event.screenX,
    screenY: event.screenY,
    shiftKey: event.shiftKey,
    tangentialPressure: event.tangentialPressure,
    target: state.responderTarget,
    tiltX: event.tiltX,
    tiltY: event.tiltY,
    timeStamp: context,
    twist: event.twist,
    width: event.width,
    x: event.clientX,
    y: event.clientY
  };
}
function createFallbackGestureState(context, props, state, event) {
  context = context.getTimeStamp();
  var nativeEvent = event.nativeEvent,
    eType = event.type;
  props = nativeEvent.altKey;
  var ctrlKey = nativeEvent.ctrlKey,
    metaKey = nativeEvent.metaKey,
    shiftKey = nativeEvent.shiftKey,
    isCancelType = "dragstart" === eType || "touchcancel" === eType;
  eType = "mouseup" === eType || "touchend" === eType;
  var isTouchEvent = "touch" === event.pointerType,
    pointerEvent = nativeEvent;
  !hasPointerEvents &&
    isTouchEvent &&
    ((nativeEvent = getTouchById(nativeEvent, state.activePointerId)),
    null != nativeEvent && (pointerEvent = nativeEvent));
  var _pointerEvent = pointerEvent;
  nativeEvent = _pointerEvent.pageX;
  pointerEvent = _pointerEvent.pageY;
  var radiusX = _pointerEvent.radiusX,
    radiusY = _pointerEvent.radiusY,
    rotationAngle = _pointerEvent.rotationAngle,
    screenX = _pointerEvent.screenX,
    screenY = _pointerEvent.screenY,
    clientX = _pointerEvent.clientX;
  _pointerEvent = _pointerEvent.clientY;
  return {
    altKey: props,
    ctrlKey: ctrlKey,
    height: isCancelType || null == radiusY ? 1 : 2 * radiusY,
    metaKey: metaKey,
    pageX: isCancelType ? 0 : nativeEvent,
    pageY: isCancelType ? 0 : pointerEvent,
    pointerType: event.pointerType,
    pressure: eType || isCancelType ? 0 : isTouchEvent ? 1 : 0.5,
    screenX: isCancelType ? 0 : screenX,
    screenY: isCancelType ? 0 : screenY,
    shiftKey: shiftKey,
    tangentialPressure: 0,
    target: state.responderTarget,
    tiltX: 0,
    tiltY: 0,
    timeStamp: context,
    twist: null != rotationAngle ? rotationAngle : 0,
    width: isCancelType || null == radiusX ? 1 : 2 * radiusX,
    x: isCancelType ? 0 : clientX,
    y: isCancelType ? 0 : _pointerEvent
  };
}
var createGestureState = hasPointerEvents
  ? createPointerEventGestureState
  : createFallbackGestureState;
function removeRootEventTypes(context, state) {
  null != state.rootEvents &&
    (context.removeRootEventTypes(state.rootEvents), (state.rootEvents = null));
}
function isActivePointer(event, state) {
  var nativeEvent = event.nativeEvent,
    activePointerId = state.activePointerId;
  return hasPointerEvents
    ? ((nativeEvent = nativeEvent.pointerId),
      null != activePointerId && null != nativeEvent
        ? state.pointerType === event.pointerType &&
          activePointerId === nativeEvent
        : !0)
    : "touch" === event.pointerType
      ? null != getTouchById(nativeEvent, activePointerId)
      : !0;
}
function isAuxiliary(buttons, event) {
  var nativeEvent = event.nativeEvent;
  event = buttons === buttonsEnum.primary || "touch" === event.pointerType;
  return (
    buttons === buttonsEnum.auxiliary ||
    (event && nativeEvent.metaKey) ||
    (event && nativeEvent.shiftKey)
  );
}
function dispatchChange(context, props, state) {
  props = props.onTapChange;
  null != props && context.dispatchEvent(state.isActive, props, 0);
}
function dispatchCancel(context, props, state) {
  var onTapCancel = props.onTapCancel;
  dispatchChange(context, props, state);
  null != onTapCancel &&
    ((props = context.objectAssign({}, state.gestureState, {
      type: "tap:cancel"
    })),
    context.dispatchEvent(props, onTapCancel, 0));
}
function dispatchAuxiliaryTap(context, props, state) {
  props = props.onAuxiliaryTap;
  null != props &&
    ((state = context.objectAssign({}, state.gestureState, {
      defaultPrevented: !1,
      type: "tap:auxiliary"
    })),
    context.dispatchEvent(state, props, 0));
}
var TapResponder = React.unstable_createResponder("Tap", {
  targetEventTypes: hasPointerEvents
    ? ["pointerdown"]
    : ["mousedown", "touchstart"],
  getInitialState: function() {
    return {
      activePointerId: null,
      buttons: 0,
      ignoreEmulatedEvents: !1,
      isActive: !1,
      isAuxiliaryActive: !1,
      initialPosition: { x: 0, y: 0 },
      pointerType: "",
      responderTarget: null,
      rootEvents: null,
      shouldPreventDefault: !0,
      gestureState: {
        altKey: !1,
        ctrlKey: !1,
        height: 1,
        metaKey: !1,
        pageX: 0,
        pageY: 0,
        pointerType: "",
        pressure: 0,
        screenX: 0,
        screenY: 0,
        shiftKey: !1,
        tangentialPressure: 0,
        target: null,
        tiltX: 0,
        tiltY: 0,
        timeStamp: 0,
        twist: 0,
        width: 1,
        x: 0,
        y: 0
      }
    };
  },
  onEvent: function(event, context, props, state) {
    if (props.disabled)
      removeRootEventTypes(context, state),
        state.isActive &&
          ((state.isActive = !1), dispatchCancel(context, props, state));
    else {
      var nativeEvent = event.nativeEvent,
        eventTarget = nativeEvent.target,
        eventType = event.type;
      switch (eventType) {
        case "pointerdown":
        case "mousedown":
        case "touchstart":
          if ("mousedown" !== eventType || !state.ignoreEmulatedEvents)
            if (!state.isActive) {
              if (hasPointerEvents) {
                var pointerId = nativeEvent.pointerId;
                state.activePointerId = pointerId;
                eventTarget.releasePointerCapture(pointerId);
              } else if ("touchstart" === eventType)
                if (
                  ((eventTarget = nativeEvent.targetTouches),
                  1 === eventTarget.length)
                )
                  state.activePointerId = eventTarget[0].identifier;
                else break;
              eventTarget =
                (event.nativeEvent.buttons === buttonsEnum.primary ||
                  "touch" === event.pointerType) &&
                !hasModifierKey(event);
              pointerId = isAuxiliary(nativeEvent.buttons, event);
              if (eventTarget || pointerId)
                (state.buttons = nativeEvent.buttons),
                  (state.pointerType = event.pointerType),
                  (state.responderTarget = context.getResponderNode()),
                  state.rootEvents ||
                    ((state.rootEvents = rootEventTypes),
                    context.addRootEventTypes(state.rootEvents)),
                  hasPointerEvents ||
                    "touchstart" !== eventType ||
                    (state.ignoreEmulatedEvents = !0);
              pointerId
                ? (state.isAuxiliaryActive = !0)
                : eventTarget &&
                  ((event = createGestureState(context, props, state, event)),
                  (state.isActive = !0),
                  (state.shouldPreventDefault = !1 !== props.preventDefault),
                  (state.gestureState = event),
                  (state.initialPosition.x = event.x),
                  (state.initialPosition.y = event.y),
                  (event = props.onTapStart),
                  null != event &&
                    ((nativeEvent = context.objectAssign(
                      {},
                      state.gestureState,
                      { type: "tap:start" }
                    )),
                    context.dispatchEvent(nativeEvent, event, 0)),
                  dispatchChange(context, props, state));
            } else if (
              !isActivePointer(event, state) ||
              ("touchstart" === eventType &&
                1 < nativeEvent.targetTouches.length)
            )
              (state.isActive = !1), dispatchCancel(context, props, state);
      }
    }
  },
  onRootEvent: function(event, context, props, state) {
    var nativeEvent = event.nativeEvent,
      eventType = event.type;
    if (hasPointerEvents || "touch" !== event.pointerType)
      var hitTarget = event.target;
    else {
      hitTarget = context.getActiveDocument();
      var touch = getTouchById(event.nativeEvent, state.activePointerId);
      hitTarget =
        null != touch
          ? hitTarget.elementFromPoint(touch.clientX, touch.clientY)
          : null;
    }
    switch (eventType) {
      case "pointermove":
      case "mousemove":
      case "touchmove":
        if (
          !hasPointerEvents &&
          "mousemove" === eventType &&
          state.ignoreEmulatedEvents
        )
          break;
        state.isActive &&
          isActivePointer(event, state) &&
          ((state.gestureState = createGestureState(
            context,
            props,
            state,
            event
          )),
          (eventType = !0),
          context.isTargetWithinResponder(hitTarget)
            ? null != props.maximumDistance &&
              10 <= props.maximumDistance &&
              ((nativeEvent = state.initialPosition),
              (hitTarget = state.gestureState),
              (event = nativeEvent.x - hitTarget.x),
              (nativeEvent = nativeEvent.y - hitTarget.y),
              Math.sqrt(event * event + nativeEvent * nativeEvent) >
                props.maximumDistance && (eventType = !1))
            : (eventType = !1),
          eventType
            ? ((props = props.onTapUpdate),
              null != props &&
                ((state = context.objectAssign({}, state.gestureState, {
                  type: "tap:update"
                })),
                context.dispatchEvent(state, props, 1)))
            : ((state.isActive = !1), dispatchCancel(context, props, state)));
        break;
      case "pointerup":
      case "mouseup":
      case "touchend":
        state.isActive && isActivePointer(event, state)
          ? ((state.gestureState = createGestureState(
              context,
              props,
              state,
              event
            )),
            (state.isActive = !1),
            isAuxiliary(state.buttons, event)
              ? (dispatchCancel(context, props, state),
                dispatchAuxiliaryTap(context, props, state),
                removeRootEventTypes(context, state))
              : !context.isTargetWithinResponder(hitTarget) ||
                hasModifierKey(event)
                ? dispatchCancel(context, props, state)
                : ((event = props.onTapEnd),
                  dispatchChange(context, props, state),
                  null != event &&
                    ((props = context.objectAssign({}, state.gestureState, {
                      defaultPrevented: !0 === state.shouldPreventDefault,
                      type: "tap:end"
                    })),
                    context.dispatchEvent(props, event, 0))))
          : state.isAuxiliaryActive &&
            isAuxiliary(state.buttons, event) &&
            ((state.isAuxiliaryActive = !1),
            (state.gestureState = createGestureState(
              context,
              props,
              state,
              event
            )),
            dispatchAuxiliaryTap(context, props, state),
            removeRootEventTypes(context, state));
        hasPointerEvents ||
          "mouseup" !== eventType ||
          (state.ignoreEmulatedEvents = !1);
        break;
      case "contextmenu":
      case "pointercancel":
      case "touchcancel":
      case "dragstart":
        state.isActive &&
          isActivePointer(event, state) &&
          ((state.gestureState = createGestureState(
            context,
            props,
            state,
            event
          )),
          (state.isActive = !1),
          dispatchCancel(context, props, state),
          removeRootEventTypes(context, state));
        break;
      case "scroll":
        state.isActive &&
          null != state.responderTarget &&
          "mouse" !== state.pointerType &&
          context.isTargetWithinNode(
            state.responderTarget,
            nativeEvent.target
          ) &&
          ((state.gestureState = createGestureState(
            context,
            props,
            state,
            event
          )),
          (state.isActive = !1),
          dispatchCancel(context, props, state),
          removeRootEventTypes(context, state));
        break;
      case "click":
        state.shouldPreventDefault && nativeEvent.preventDefault(),
          removeRootEventTypes(context, state);
    }
  },
  onUnmount: function(context, props, state) {
    removeRootEventTypes(context, state);
    state.isActive &&
      ((state.isActive = !1), dispatchCancel(context, props, state));
  }
});
module.exports = {
  TapResponder: TapResponder,
  useTap: function(props) {
    return React.unstable_useResponder(TapResponder, props);
  }
};
