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
var decoderOptions = { stream: !0 };
function createResponse(source) {
  var modelRoot = {},
    rootChunk = createPendingChunk();
  definePendingProperty(modelRoot, "model", rootChunk);
  var chunks = new Map();
  chunks.set(0, rootChunk);
  var response = {
    source: source,
    partialRow: "",
    modelRoot: modelRoot,
    chunks: chunks,
    fromJSON: function(key, value) {
      a: {
        var response$jscomp$0 = response;
        if ("string" === typeof value && "$" === value[0])
          if ("$" === value[1]) key = value.substring(1);
          else {
            value = parseInt(value.substring(1), 16);
            response$jscomp$0 = response$jscomp$0.chunks;
            var chunk = response$jscomp$0.get(value);
            if (!chunk)
              (chunk = createPendingChunk()),
                response$jscomp$0.set(value, chunk);
            else if (1 === chunk.status) {
              key = chunk.value;
              break a;
            }
            definePendingProperty(this, key, chunk);
            key = void 0;
          }
        else key = value;
      }
      return key;
    }
  };
  response.stringDecoder = new TextDecoder();
  return response;
}
function createPendingChunk() {
  var resolve = null;
  return {
    status: 0,
    value: new Promise(function(r) {
      return (resolve = r);
    }),
    resolve: resolve
  };
}
function triggerErrorOnChunk(chunk, error) {
  if (0 === chunk.status) {
    var resolve = chunk.resolve;
    chunk.status = 2;
    chunk.value = error;
    chunk.resolve = null;
    resolve();
  }
}
function reportGlobalError(response, error) {
  response.chunks.forEach(function(chunk) {
    triggerErrorOnChunk(chunk, error);
  });
}
function definePendingProperty(object, key, chunk) {
  Object.defineProperty(object, key, {
    configurable: !1,
    enumerable: !0,
    get: function() {
      if (1 === chunk.status) return chunk.value;
      throw chunk.value;
    }
  });
}
function resolveJSONRow(response, id, json) {
  json = JSON.parse(json, response.fromJSON);
  var chunks = response.chunks;
  (response = chunks.get(id))
    ? 0 === response.status &&
      ((id = response.resolve),
      (response.status = 1),
      (response.value = json),
      (response.resolve = null),
      id())
    : chunks.set(id, { status: 1, value: json, resolve: null });
}
function processFullRow(response, row) {
  if ("" !== row)
    switch (row[0]) {
      case "J":
        var colon = row.indexOf(":", 1),
          id = parseInt(row.substring(1, colon), 16);
        row = row.substring(colon + 1);
        resolveJSONRow(response, id, row);
        break;
      case "E":
        colon = row.indexOf(":", 1);
        id = parseInt(row.substring(1, colon), 16);
        row = row.substring(colon + 1);
        colon = JSON.parse(row);
        row = Error(colon.message);
        row.stack = colon.stack;
        response = response.chunks;
        (colon = response.get(id))
          ? triggerErrorOnChunk(colon, row)
          : response.set(id, { status: 2, value: row, resolve: null });
        break;
      default:
        resolveJSONRow(response, 0, row);
    }
}
function complete(response) {
  reportGlobalError(response, Error("Connection closed."));
}
function startReadingFromStream(response, stream) {
  function progress(_ref) {
    var value = _ref.value;
    if (_ref.done) complete(response);
    else {
      _ref = value;
      value = response.stringDecoder;
      for (var linebreak = _ref.indexOf(10); -1 < linebreak; ) {
        var JSCompiler_temp_const = response.partialRow;
        var JSCompiler_inline_result = _ref.subarray(0, linebreak);
        JSCompiler_inline_result = value.decode(JSCompiler_inline_result);
        processFullRow(
          response,
          JSCompiler_temp_const + JSCompiler_inline_result
        );
        response.partialRow = "";
        _ref = _ref.subarray(linebreak + 1);
        linebreak = _ref.indexOf(10);
      }
      response.partialRow += value.decode(_ref, decoderOptions);
      return reader.read().then(progress, error);
    }
  }
  function error(e) {
    reportGlobalError(response, e);
  }
  var reader = stream.getReader();
  reader.read().then(progress, error);
}
var ReactFlightDOMClient = {
    readFromXHR: function(request) {
      function progress() {
        for (
          var chunk = request.responseText,
            response = response$jscomp$0,
            offset = processedLength,
            linebreak = chunk.indexOf("\n", offset);
          -1 < linebreak;

        )
          (offset = response.partialRow + chunk.substring(offset, linebreak)),
            processFullRow(response, offset),
            (response.partialRow = ""),
            (offset = linebreak + 1),
            (linebreak = chunk.indexOf("\n", offset));
        response.partialRow += chunk.substring(offset);
        processedLength = chunk.length;
      }
      function error() {
        reportGlobalError(response$jscomp$0, new TypeError("Network error"));
      }
      var response$jscomp$0 = createResponse(request),
        processedLength = 0;
      request.addEventListener("progress", progress);
      request.addEventListener("load", function(e) {
        progress(e);
        complete(response$jscomp$0);
      });
      request.addEventListener("error", error);
      request.addEventListener("abort", error);
      request.addEventListener("timeout", error);
      return response$jscomp$0.modelRoot;
    },
    readFromFetch: function(promiseForResponse) {
      var response = createResponse(promiseForResponse);
      promiseForResponse.then(
        function(r) {
          startReadingFromStream(response, r.body);
        },
        function(e) {
          reportGlobalError(response, e);
        }
      );
      return response.modelRoot;
    },
    readFromReadableStream: function(stream) {
      var response = createResponse(stream);
      startReadingFromStream(response, stream);
      return response.modelRoot;
    }
  },
  ReactFlightDOMClient$1 = { default: ReactFlightDOMClient },
  ReactFlightDOMClient$2 =
    (ReactFlightDOMClient$1 && ReactFlightDOMClient) || ReactFlightDOMClient$1;
module.exports = ReactFlightDOMClient$2.default || ReactFlightDOMClient$2;
