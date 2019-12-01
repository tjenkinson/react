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
function formatChunkAsString(type, props) {
  var str = "<" + type + ">";
  "string" === typeof props.children && (str += props.children);
  return str + ("</" + type + ">");
}
var REACT_ELEMENT_TYPE =
  "function" === typeof Symbol && Symbol.for
    ? Symbol.for("react.element")
    : 60103;
function flushCompletedChunks(request) {
  var destination = request.destination,
    chunks = request.completedChunks;
  request.completedChunks = [];
  "function" === typeof destination.cork && destination.cork();
  try {
    for (request = 0; request < chunks.length; request++)
      destination.write(chunks[request]);
  } finally {
    "function" === typeof destination.uncork && destination.uncork();
  }
  destination.end();
}
function startWork(request) {
  request.flowing = !0;
  setImmediate(function() {
    var element = request.children;
    request.children = null;
    if (!element || element.$$typeof === REACT_ELEMENT_TYPE) {
      var type = element.type;
      element = element.props;
      "string" === typeof type &&
        (request.completedChunks.push(
          Buffer.from(formatChunkAsString(type, element), "utf8")
        ),
        request.flowing && flushCompletedChunks(request),
        (type = request.destination),
        "function" === typeof type.flush &&
          "function" !== typeof type.flushHeaders &&
          type.flush());
    }
  });
}
function createDrainHandler(destination, request) {
  return function() {
    request.flowing = !1;
    flushCompletedChunks(request);
  };
}
var ReactDOMFizzServerNode = {
    pipeToNodeWritable: function(children, destination) {
      children = {
        destination: destination,
        children: children,
        completedChunks: [],
        flowing: !1
      };
      destination.on("drain", createDrainHandler(destination, children));
      startWork(children);
    }
  },
  ReactDOMFizzServerNode$1 = { default: ReactDOMFizzServerNode },
  ReactDOMFizzServerNode$2 =
    (ReactDOMFizzServerNode$1 && ReactDOMFizzServerNode) ||
    ReactDOMFizzServerNode$1;
module.exports = ReactDOMFizzServerNode$2.default || ReactDOMFizzServerNode$2;
