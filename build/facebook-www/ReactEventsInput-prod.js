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
  supportedInputTypes = new Set(
    "color date datetime datetime-local email month number password range search tel text time url week".split(
      " "
    )
  );
function isCheckable(elem) {
  var nodeName = elem.nodeName && elem.nodeName.toLowerCase();
  elem = elem.type;
  return "input" === nodeName && ("checkbox" === elem || "radio" === elem);
}
function dispatchBothChangeEvents(event, context, props, target) {
  context.enqueueStateRestore(target);
  var onChange = props.onChange;
  "function" === typeof onChange &&
    ((event = event.nativeEvent),
    (event = {
      data: event.data,
      dataTransfer: event.dataTransfer,
      inputType: event.inputType,
      isComposing: event.isComposing,
      target: target,
      timeStamp: context.getTimeStamp(),
      type: "change"
    }),
    context.dispatchEvent(event, onChange, 0));
  props = props.onValueChange;
  "function" === typeof props &&
    ((target = getValueFromNode(target)),
    context.dispatchEvent(target, props, 0));
}
function updateValueIfChanged(elem) {
  var valueTracker = elem._valueTracker;
  if (null == valueTracker) return !0;
  var prevValue = valueTracker.getValue();
  elem = getValueFromNode(elem);
  return prevValue !== elem ? (valueTracker.setValue(elem), !0) : !1;
}
function getValueFromNode(node) {
  var value = "";
  return node
    ? (value = isCheckable(node)
        ? node.checked
          ? "true"
          : "false"
        : node.value)
    : value;
}
var InputResponder = React.unstable_createResponder("Input", {
  targetEventTypes: ["input", "change", "beforeinput", "click"],
  onEvent: function(event, context, props) {
    var type = event.type,
      target = event.target;
    if (!props.disabled) {
      var currentTarget = context.getResponderNode();
      if (target === currentTarget && null !== currentTarget) {
        var nodeName = target.nodeName && target.nodeName.toLowerCase();
        if (
          ("select" === nodeName ||
            ("input" === nodeName && "file" === target.type)) &&
          "change" === type
        )
          dispatchBothChangeEvents(event, context, props, currentTarget);
        else {
          nodeName = target.nodeName && target.nodeName.toLowerCase();
          var type$jscomp$0 = target.type;
          ("textarea" !== nodeName &&
            ("input" !== nodeName ||
              (null != type$jscomp$0 &&
                !supportedInputTypes.has(type$jscomp$0)))) ||
          ("input" !== type && "change" !== type) ||
          !updateValueIfChanged(target)
            ? isCheckable(target) &&
              "click" === type &&
              updateValueIfChanged(target) &&
              dispatchBothChangeEvents(event, context, props, currentTarget)
            : dispatchBothChangeEvents(event, context, props, currentTarget);
        }
      }
    }
  }
});
module.exports = {
  InputResponder: InputResponder,
  useInput: function(props) {
    return React.unstable_useResponder(InputResponder, props);
  }
};
