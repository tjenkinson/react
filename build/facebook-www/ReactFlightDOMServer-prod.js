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
var ReactDOMServer = require("react-dom/server"),
  REACT_ELEMENT_TYPE =
    "function" === typeof Symbol && Symbol.for
      ? Symbol.for("react.element")
      : 60103,
  stringify = JSON.stringify;
function createRequest(model, destination) {
  var pingedSegments = [],
    request = {
      destination: destination,
      nextChunkId: 0,
      pendingChunks: 0,
      pingedSegments: pingedSegments,
      completedJSONChunks: [],
      completedErrorChunks: [],
      flowing: !1,
      toJSON: function(key, value) {
        return resolveModelToJSON(request, value);
      }
    };
  request.pendingChunks++;
  model = createSegment(request, model);
  pingedSegments.push(model);
  return request;
}
function attemptResolveModelComponent(element) {
  var type = element.type,
    props = element.props;
  if ("function" === typeof type) return type(props);
  if ("string" === typeof type)
    return ReactDOMServer.renderToStaticMarkup(element);
  throw Error("Unsupported type.");
}
function pingSegment(request, segment) {
  var pingedSegments = request.pingedSegments;
  pingedSegments.push(segment);
  1 === pingedSegments.length &&
    setImmediate(function() {
      return performWork(request);
    });
}
function createSegment(request, model) {
  var segment = {
    id: request.nextChunkId++,
    model: model,
    ping: function() {
      return pingSegment(request, segment);
    }
  };
  return segment;
}
function resolveModelToJSON(request, value) {
  if ("string" === typeof value)
    return (request = "$" === value[0] ? "$" + value : value), request;
  for (
    ;
    "object" === typeof value &&
    null !== value &&
    value.$$typeof === REACT_ELEMENT_TYPE;

  ) {
    var element = value;
    try {
      value = attemptResolveModelComponent(element);
    } catch (x) {
      if ("object" === typeof x && null !== x && "function" === typeof x.then)
        return (
          request.pendingChunks++,
          (request = createSegment(request, element)),
          (value = request.ping),
          x.then(value, value),
          "$" + request.id.toString(16)
        );
      request.pendingChunks++;
      value = request.nextChunkId++;
      emitErrorChunk(request, value, x);
      return "$" + value.toString(16);
    }
  }
  return value;
}
function emitErrorChunk(request, id, error) {
  var stack = "";
  try {
    if (error instanceof Error) {
      var message = "" + error.message;
      stack = "" + error.stack;
    } else message = "Error: " + error;
  } catch (x) {
    message = "An error occurred but serializing the error message failed.";
  }
  error = { message: message, stack: stack };
  id = "E" + id.toString(16) + ":" + stringify(error) + "\n";
  request.completedErrorChunks.push(Buffer.from(id, "utf8"));
}
function performWork(request$jscomp$0) {
  var pingedSegments = request$jscomp$0.pingedSegments;
  request$jscomp$0.pingedSegments = [];
  for (var i = 0; i < pingedSegments.length; i++) {
    var row = void 0,
      request = request$jscomp$0,
      segment = pingedSegments[i],
      value = segment.model;
    try {
      for (
        ;
        "object" === typeof value &&
        null !== value &&
        value.$$typeof === REACT_ELEMENT_TYPE;

      ) {
        var element = value;
        segment.model = element;
        value = attemptResolveModelComponent(element);
      }
      var json = stringify(value, request.toJSON),
        id = segment.id;
      row = 0 === id ? json + "\n" : "J" + id.toString(16) + ":" + json + "\n";
      request.completedJSONChunks.push(Buffer.from(row, "utf8"));
    } catch (x) {
      "object" === typeof x && null !== x && "function" === typeof x.then
        ? ((row = segment.ping), x.then(row, row))
        : emitErrorChunk(request, segment.id, x);
    }
  }
  request$jscomp$0.flowing && flushCompletedChunks(request$jscomp$0);
}
var reentrant = !1;
function flushCompletedChunks(request) {
  if (!reentrant) {
    reentrant = !0;
    var destination = request.destination;
    "function" === typeof destination.cork && destination.cork();
    try {
      for (
        var jsonChunks = request.completedJSONChunks, i = 0;
        i < jsonChunks.length;
        i++
      )
        if ((request.pendingChunks--, !destination.write(jsonChunks[i]))) {
          request.flowing = !1;
          i++;
          break;
        }
      jsonChunks.splice(0, i);
      var errorChunks = request.completedErrorChunks;
      for (i = 0; i < errorChunks.length; i++)
        if ((request.pendingChunks--, !destination.write(errorChunks[i]))) {
          request.flowing = !1;
          i++;
          break;
        }
      errorChunks.splice(0, i);
    } finally {
      (reentrant = !1),
        "function" === typeof destination.uncork && destination.uncork();
    }
    "function" === typeof destination.flush &&
      "function" !== typeof destination.flushHeaders &&
      destination.flush();
    0 === request.pendingChunks && destination.end();
  }
}
function startWork(request) {
  request.flowing = !0;
  setImmediate(function() {
    return performWork(request);
  });
}
function createDrainHandler(destination, request) {
  return function() {
    request.flowing = !0;
    flushCompletedChunks(request);
  };
}
var ReactFlightDOMServerNode = {
    pipeToNodeWritable: function(model, destination) {
      model = createRequest(model, destination);
      destination.on("drain", createDrainHandler(destination, model));
      startWork(model);
    }
  },
  ReactFlightDOMServerNode$1 = { default: ReactFlightDOMServerNode },
  ReactFlightDOMServerNode$2 =
    (ReactFlightDOMServerNode$1 && ReactFlightDOMServerNode) ||
    ReactFlightDOMServerNode$1;
module.exports =
  ReactFlightDOMServerNode$2.default || ReactFlightDOMServerNode$2;
