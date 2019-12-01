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

/*
 Modernizr 3.0.0pre (Custom Build) | MIT
*/
"use strict";
var React = require("react"),
  Scheduler = require("scheduler"),
  tracing = require("scheduler/tracing");
function formatProdErrorMessage(code) {
  for (
    var url = "https://reactjs.org/docs/error-decoder.html?invariant=" + code,
      i = 1;
    i < arguments.length;
    i++
  )
    url += "&args[]=" + encodeURIComponent(arguments[i]);
  return (
    "Minified React error #" +
    code +
    "; visit " +
    url +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
require("warning");
var ReactSharedInternals =
  React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
ReactSharedInternals.hasOwnProperty("ReactCurrentDispatcher") ||
  (ReactSharedInternals.ReactCurrentDispatcher = { current: null });
ReactSharedInternals.hasOwnProperty("ReactCurrentBatchConfig") ||
  (ReactSharedInternals.ReactCurrentBatchConfig = { suspense: null });
var hasSymbol = "function" === typeof Symbol && Symbol.for,
  REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103,
  REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106,
  REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107,
  REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108,
  REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114,
  REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109,
  REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110,
  REACT_CONCURRENT_MODE_TYPE = hasSymbol
    ? Symbol.for("react.concurrent_mode")
    : 60111,
  REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112,
  REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 60113,
  REACT_SUSPENSE_LIST_TYPE = hasSymbol
    ? Symbol.for("react.suspense_list")
    : 60120,
  REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115,
  REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116;
hasSymbol && Symbol.for("react.fundamental");
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for("react.responder") : 60118,
  REACT_SCOPE_TYPE = hasSymbol ? Symbol.for("react.scope") : 60119,
  MAYBE_ITERATOR_SYMBOL = "function" === typeof Symbol && Symbol.iterator;
function getIteratorFn(maybeIterable) {
  if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
  maybeIterable =
    (MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL]) ||
    maybeIterable["@@iterator"];
  return "function" === typeof maybeIterable ? maybeIterable : null;
}
function initializeLazyComponentType(lazyComponent) {
  if (-1 === lazyComponent._status) {
    lazyComponent._status = 0;
    var ctor = lazyComponent._ctor;
    ctor = ctor();
    lazyComponent._result = ctor;
    ctor.then(
      function(moduleObject) {
        0 === lazyComponent._status &&
          ((moduleObject = moduleObject.default),
          (lazyComponent._status = 1),
          (lazyComponent._result = moduleObject));
      },
      function(error) {
        0 === lazyComponent._status &&
          ((lazyComponent._status = 2), (lazyComponent._result = error));
      }
    );
  }
}
function getComponentName(type) {
  if (null == type) return null;
  if ("function" === typeof type) return type.displayName || type.name || null;
  if ("string" === typeof type) return type;
  switch (type) {
    case REACT_FRAGMENT_TYPE:
      return "Fragment";
    case REACT_PORTAL_TYPE:
      return "Portal";
    case REACT_PROFILER_TYPE:
      return "Profiler";
    case REACT_STRICT_MODE_TYPE:
      return "StrictMode";
    case REACT_SUSPENSE_TYPE:
      return "Suspense";
    case REACT_SUSPENSE_LIST_TYPE:
      return "SuspenseList";
  }
  if ("object" === typeof type)
    switch (type.$$typeof) {
      case REACT_CONTEXT_TYPE:
        return "Context.Consumer";
      case REACT_PROVIDER_TYPE:
        return "Context.Provider";
      case REACT_FORWARD_REF_TYPE:
        var innerType = type.render;
        innerType = innerType.displayName || innerType.name || "";
        return (
          type.displayName ||
          ("" !== innerType ? "ForwardRef(" + innerType + ")" : "ForwardRef")
        );
      case REACT_MEMO_TYPE:
        return getComponentName(type.type);
      case REACT_LAZY_TYPE:
        if ((type = 1 === type._status ? type._result : null))
          return getComponentName(type);
    }
  return null;
}
var _require = require("ReactFeatureFlags"),
  disableInputAttributeSyncing = _require.disableInputAttributeSyncing,
  enableTrustedTypesIntegration = _require.enableTrustedTypesIntegration,
  enableSelectiveHydration = _require.enableSelectiveHydration,
  enableUserTimingAPI = !1,
  refCount = 0,
  timeout = null;
function updateFlagOutsideOfReactCallStack() {
  timeout ||
    (timeout = setTimeout(function() {
      timeout = null;
      enableUserTimingAPI = 0 < refCount;
    }));
}
function getNearestMountedFiber(fiber) {
  var node = fiber,
    nearestMounted = fiber;
  if (fiber.alternate) for (; node.return; ) node = node.return;
  else {
    fiber = node;
    do
      (node = fiber),
        0 !== (node.effectTag & 1026) && (nearestMounted = node.return),
        (fiber = node.return);
    while (fiber);
  }
  return 3 === node.tag ? nearestMounted : null;
}
function getSuspenseInstanceFromFiber(fiber) {
  if (13 === fiber.tag) {
    var suspenseState = fiber.memoizedState;
    null === suspenseState &&
      ((fiber = fiber.alternate),
      null !== fiber && (suspenseState = fiber.memoizedState));
    if (null !== suspenseState) return suspenseState.dehydrated;
  }
  return null;
}
function assertIsMounted(fiber) {
  if (getNearestMountedFiber(fiber) !== fiber)
    throw Error(formatProdErrorMessage(188));
}
function findCurrentFiberUsingSlowPath(fiber) {
  var alternate = fiber.alternate;
  if (!alternate) {
    alternate = getNearestMountedFiber(fiber);
    if (null === alternate) throw Error(formatProdErrorMessage(188));
    return alternate !== fiber ? null : fiber;
  }
  for (var a = fiber, b = alternate; ; ) {
    var parentA = a.return;
    if (null === parentA) break;
    var parentB = parentA.alternate;
    if (null === parentB) {
      b = parentA.return;
      if (null !== b) {
        a = b;
        continue;
      }
      break;
    }
    if (parentA.child === parentB.child) {
      for (parentB = parentA.child; parentB; ) {
        if (parentB === a) return assertIsMounted(parentA), fiber;
        if (parentB === b) return assertIsMounted(parentA), alternate;
        parentB = parentB.sibling;
      }
      throw Error(formatProdErrorMessage(188));
    }
    if (a.return !== b.return) (a = parentA), (b = parentB);
    else {
      for (var didFindChild = !1, _child = parentA.child; _child; ) {
        if (_child === a) {
          didFindChild = !0;
          a = parentA;
          b = parentB;
          break;
        }
        if (_child === b) {
          didFindChild = !0;
          b = parentA;
          a = parentB;
          break;
        }
        _child = _child.sibling;
      }
      if (!didFindChild) {
        for (_child = parentB.child; _child; ) {
          if (_child === a) {
            didFindChild = !0;
            a = parentB;
            b = parentA;
            break;
          }
          if (_child === b) {
            didFindChild = !0;
            b = parentB;
            a = parentA;
            break;
          }
          _child = _child.sibling;
        }
        if (!didFindChild) throw Error(formatProdErrorMessage(189));
      }
    }
    if (a.alternate !== b) throw Error(formatProdErrorMessage(190));
  }
  if (3 !== a.tag) throw Error(formatProdErrorMessage(188));
  return a.stateNode.current === a ? fiber : alternate;
}
function findCurrentHostFiber(parent) {
  parent = findCurrentFiberUsingSlowPath(parent);
  if (!parent) return null;
  for (var node = parent; ; ) {
    if (5 === node.tag || 6 === node.tag) return node;
    if (node.child) (node.child.return = node), (node = node.child);
    else {
      if (node === parent) break;
      for (; !node.sibling; ) {
        if (!node.return || node.return === parent) return null;
        node = node.return;
      }
      node.sibling.return = node.return;
      node = node.sibling;
    }
  }
  return null;
}
var Scheduler_runWithPriority = Scheduler.unstable_runWithPriority,
  Scheduler_scheduleCallback = Scheduler.unstable_scheduleCallback,
  Scheduler_cancelCallback = Scheduler.unstable_cancelCallback,
  Scheduler_shouldYield = Scheduler.unstable_shouldYield,
  Scheduler_requestPaint = Scheduler.unstable_requestPaint,
  Scheduler_now = Scheduler.unstable_now,
  Scheduler_getCurrentPriorityLevel =
    Scheduler.unstable_getCurrentPriorityLevel,
  Scheduler_ImmediatePriority = Scheduler.unstable_ImmediatePriority,
  Scheduler_UserBlockingPriority = Scheduler.unstable_UserBlockingPriority,
  Scheduler_NormalPriority = Scheduler.unstable_NormalPriority,
  Scheduler_LowPriority = Scheduler.unstable_LowPriority,
  Scheduler_IdlePriority = Scheduler.unstable_IdlePriority;
if (
  null == tracing.__interactionsRef ||
  null == tracing.__interactionsRef.current
)
  throw Error(formatProdErrorMessage(302));
var fakeCallbackNode = {},
  requestPaint =
    void 0 !== Scheduler_requestPaint ? Scheduler_requestPaint : function() {},
  syncQueue = null,
  immediateQueueCallbackNode = null,
  isFlushingSyncQueue = !1,
  initialTimeMs = Scheduler_now(),
  now =
    1e4 > initialTimeMs
      ? Scheduler_now
      : function() {
          return Scheduler_now() - initialTimeMs;
        };
function getCurrentPriorityLevel() {
  switch (Scheduler_getCurrentPriorityLevel()) {
    case Scheduler_ImmediatePriority:
      return 99;
    case Scheduler_UserBlockingPriority:
      return 98;
    case Scheduler_NormalPriority:
      return 97;
    case Scheduler_LowPriority:
      return 96;
    case Scheduler_IdlePriority:
      return 95;
    default:
      throw Error(formatProdErrorMessage(332));
  }
}
function reactPriorityToSchedulerPriority(reactPriorityLevel) {
  switch (reactPriorityLevel) {
    case 99:
      return Scheduler_ImmediatePriority;
    case 98:
      return Scheduler_UserBlockingPriority;
    case 97:
      return Scheduler_NormalPriority;
    case 96:
      return Scheduler_LowPriority;
    case 95:
      return Scheduler_IdlePriority;
    default:
      throw Error(formatProdErrorMessage(332));
  }
}
function runWithPriority(reactPriorityLevel, fn) {
  reactPriorityLevel = reactPriorityToSchedulerPriority(reactPriorityLevel);
  return Scheduler_runWithPriority(reactPriorityLevel, fn);
}
function scheduleCallback(reactPriorityLevel, callback, options) {
  reactPriorityLevel = reactPriorityToSchedulerPriority(reactPriorityLevel);
  return Scheduler_scheduleCallback(reactPriorityLevel, callback, options);
}
function scheduleSyncCallback(callback) {
  null === syncQueue
    ? ((syncQueue = [callback]),
      (immediateQueueCallbackNode = Scheduler_scheduleCallback(
        Scheduler_ImmediatePriority,
        flushSyncCallbackQueueImpl
      )))
    : syncQueue.push(callback);
  return fakeCallbackNode;
}
function flushSyncCallbackQueue() {
  if (null !== immediateQueueCallbackNode) {
    var node = immediateQueueCallbackNode;
    immediateQueueCallbackNode = null;
    Scheduler_cancelCallback(node);
  }
  flushSyncCallbackQueueImpl();
}
function flushSyncCallbackQueueImpl() {
  if (!isFlushingSyncQueue && null !== syncQueue) {
    isFlushingSyncQueue = !0;
    var i = 0;
    try {
      var queue = syncQueue;
      runWithPriority(99, function() {
        for (; i < queue.length; i++) {
          var callback = queue[i];
          do callback = callback(!0);
          while (null !== callback);
        }
      });
      syncQueue = null;
    } catch (error) {
      throw (null !== syncQueue && (syncQueue = syncQueue.slice(i + 1)),
      Scheduler_scheduleCallback(
        Scheduler_ImmediatePriority,
        flushSyncCallbackQueue
      ),
      error);
    } finally {
      isFlushingSyncQueue = !1;
    }
  }
}
var randomKey = Math.random()
    .toString(36)
    .slice(2),
  internalInstanceKey = "__reactInternalInstance$" + randomKey,
  internalEventHandlersKey = "__reactEventHandlers$" + randomKey,
  internalContainerInstanceKey = "__reactContainere$" + randomKey;
function getClosestInstanceFromNode(targetNode) {
  var targetInst = targetNode[internalInstanceKey];
  if (targetInst) return targetInst;
  for (var parentNode = targetNode.parentNode; parentNode; ) {
    if (
      (targetInst =
        parentNode[internalContainerInstanceKey] ||
        parentNode[internalInstanceKey])
    ) {
      parentNode = targetInst.alternate;
      if (
        null !== targetInst.child ||
        (null !== parentNode && null !== parentNode.child)
      )
        for (
          targetNode = getParentSuspenseInstance(targetNode);
          null !== targetNode;

        ) {
          if ((parentNode = targetNode[internalInstanceKey])) return parentNode;
          targetNode = getParentSuspenseInstance(targetNode);
        }
      return targetInst;
    }
    targetNode = parentNode;
    parentNode = targetNode.parentNode;
  }
  return null;
}
function getInstanceFromNode$1(node) {
  node = node[internalInstanceKey] || node[internalContainerInstanceKey];
  return !node ||
    (5 !== node.tag && 6 !== node.tag && 13 !== node.tag && 3 !== node.tag)
    ? null
    : node;
}
function getNodeFromInstance(inst) {
  if (5 === inst.tag || 6 === inst.tag) return inst.stateNode;
  throw Error(formatProdErrorMessage(33));
}
function getFiberCurrentPropsFromNode(node) {
  return node[internalEventHandlersKey] || null;
}
var BEFORE_SLASH_RE = /^(.*)[\\\/]/;
function getStackByFiberInDevAndProd(workInProgress) {
  var info = "";
  do {
    a: switch (workInProgress.tag) {
      case 3:
      case 4:
      case 6:
      case 7:
      case 10:
      case 9:
        var JSCompiler_inline_result = "";
        break a;
      default:
        var owner = workInProgress._debugOwner,
          source = workInProgress._debugSource,
          name = getComponentName(workInProgress.type);
        JSCompiler_inline_result = null;
        owner && (JSCompiler_inline_result = getComponentName(owner.type));
        owner = name;
        name = "";
        source
          ? (name =
              " (at " +
              source.fileName.replace(BEFORE_SLASH_RE, "") +
              ":" +
              source.lineNumber +
              ")")
          : JSCompiler_inline_result &&
            (name = " (created by " + JSCompiler_inline_result + ")");
        JSCompiler_inline_result = "\n    in " + (owner || "Unknown") + name;
    }
    info += JSCompiler_inline_result;
    workInProgress = workInProgress.return;
  } while (workInProgress);
  return info;
}
var eventPluginOrder = null,
  namesToPlugins = {};
function recomputePluginOrdering() {
  if (eventPluginOrder)
    for (var pluginName in namesToPlugins) {
      var pluginModule = namesToPlugins[pluginName],
        pluginIndex = eventPluginOrder.indexOf(pluginName);
      if (!(-1 < pluginIndex))
        throw Error(formatProdErrorMessage(96, pluginName));
      if (!plugins[pluginIndex]) {
        if (!pluginModule.extractEvents)
          throw Error(formatProdErrorMessage(97, pluginName));
        plugins[pluginIndex] = pluginModule;
        pluginIndex = pluginModule.eventTypes;
        for (var eventName in pluginIndex) {
          var JSCompiler_inline_result = void 0;
          var dispatchConfig = pluginIndex[eventName],
            pluginModule$jscomp$0 = pluginModule,
            eventName$jscomp$0 = eventName;
          if (eventNameDispatchConfigs.hasOwnProperty(eventName$jscomp$0))
            throw Error(formatProdErrorMessage(99, eventName$jscomp$0));
          eventNameDispatchConfigs[eventName$jscomp$0] = dispatchConfig;
          var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;
          if (phasedRegistrationNames) {
            for (JSCompiler_inline_result in phasedRegistrationNames)
              phasedRegistrationNames.hasOwnProperty(
                JSCompiler_inline_result
              ) &&
                publishRegistrationName(
                  phasedRegistrationNames[JSCompiler_inline_result],
                  pluginModule$jscomp$0,
                  eventName$jscomp$0
                );
            JSCompiler_inline_result = !0;
          } else
            dispatchConfig.registrationName
              ? (publishRegistrationName(
                  dispatchConfig.registrationName,
                  pluginModule$jscomp$0,
                  eventName$jscomp$0
                ),
                (JSCompiler_inline_result = !0))
              : (JSCompiler_inline_result = !1);
          if (!JSCompiler_inline_result)
            throw Error(formatProdErrorMessage(98, eventName, pluginName));
        }
      }
    }
}
function publishRegistrationName(registrationName, pluginModule, eventName) {
  if (registrationNameModules[registrationName])
    throw Error(formatProdErrorMessage(100, registrationName));
  registrationNameModules[registrationName] = pluginModule;
  registrationNameDependencies[registrationName] =
    pluginModule.eventTypes[eventName].dependencies;
}
var plugins = [],
  eventNameDispatchConfigs = {},
  registrationNameModules = {},
  registrationNameDependencies = {},
  canUseDOM = !(
    "undefined" === typeof window ||
    "undefined" === typeof window.document ||
    "undefined" === typeof window.document.createElement
  ),
  ReactFbErrorUtils = require("ReactFbErrorUtils");
if ("function" !== typeof ReactFbErrorUtils.invokeGuardedCallback)
  throw Error(formatProdErrorMessage(255));
function invokeGuardedCallbackImpl(name, func, context, a, b, c, d, e, f) {
  ReactFbErrorUtils.invokeGuardedCallback.apply(this, arguments);
}
var hasError = !1,
  caughtError = null,
  hasRethrowError = !1,
  rethrowError = null,
  reporter = {
    onError: function(error) {
      hasError = !0;
      caughtError = error;
    }
  };
function invokeGuardedCallback(name, func, context, a, b, c, d, e, f) {
  hasError = !1;
  caughtError = null;
  invokeGuardedCallbackImpl.apply(reporter, arguments);
}
function invokeGuardedCallbackAndCatchFirstError(
  name,
  func,
  context,
  a,
  b,
  c,
  d,
  e,
  f
) {
  invokeGuardedCallback.apply(this, arguments);
  if (hasError) {
    if (hasError) {
      var error = caughtError;
      hasError = !1;
      caughtError = null;
    } else throw Error(formatProdErrorMessage(198));
    hasRethrowError || ((hasRethrowError = !0), (rethrowError = error));
  }
}
var getFiberCurrentPropsFromNode$1 = null,
  getInstanceFromNode$2 = null,
  getNodeFromInstance$1 = null;
function executeDispatch(event, listener, inst) {
  var type = event.type || "unknown-event";
  event.currentTarget = getNodeFromInstance$1(inst);
  invokeGuardedCallbackAndCatchFirstError(type, listener, void 0, event);
  event.currentTarget = null;
}
var restoreImpl = null,
  restoreTarget = null,
  restoreQueue = null;
function restoreStateOfTarget(target) {
  if ((target = getInstanceFromNode$2(target))) {
    if ("function" !== typeof restoreImpl)
      throw Error(formatProdErrorMessage(280));
    var props = getFiberCurrentPropsFromNode$1(target.stateNode);
    restoreImpl(target.stateNode, target.type, props);
  }
}
function enqueueStateRestore(target) {
  restoreTarget
    ? restoreQueue
      ? restoreQueue.push(target)
      : (restoreQueue = [target])
    : (restoreTarget = target);
}
function restoreStateIfNeeded() {
  if (restoreTarget) {
    var target = restoreTarget,
      queuedTargets = restoreQueue;
    restoreQueue = restoreTarget = null;
    restoreStateOfTarget(target);
    if (queuedTargets)
      for (target = 0; target < queuedTargets.length; target++)
        restoreStateOfTarget(queuedTargets[target]);
  }
}
function batchedUpdatesImpl(fn, bookkeeping) {
  return fn(bookkeeping);
}
function discreteUpdatesImpl(fn, a, b, c) {
  return fn(a, b, c);
}
function flushDiscreteUpdatesImpl() {}
var batchedEventUpdatesImpl = batchedUpdatesImpl,
  isInsideEventHandler = !1,
  isBatchingEventUpdates = !1;
function finishEventHandler() {
  if (null !== restoreTarget || null !== restoreQueue)
    flushDiscreteUpdatesImpl(), restoreStateIfNeeded();
}
function batchedEventUpdates$1(fn, a, b) {
  if (isBatchingEventUpdates) return fn(a, b);
  isBatchingEventUpdates = !0;
  try {
    return batchedEventUpdatesImpl(fn, a, b);
  } finally {
    (isBatchingEventUpdates = !1), finishEventHandler();
  }
}
function executeUserEventHandler(fn, value) {
  var previouslyInEventHandler = isInsideEventHandler;
  try {
    (isInsideEventHandler = !0),
      invokeGuardedCallbackAndCatchFirstError(
        "object" === typeof value && null !== value ? value.type : "",
        fn,
        void 0,
        value
      );
  } finally {
    isInsideEventHandler = previouslyInEventHandler;
  }
}
function discreteUpdates$1(fn, a, b, c) {
  var prevIsInsideEventHandler = isInsideEventHandler;
  isInsideEventHandler = !0;
  try {
    return discreteUpdatesImpl(fn, a, b, c);
  } finally {
    (isInsideEventHandler = prevIsInsideEventHandler) || finishEventHandler();
  }
}
var lastFlushedEventTimeStamp = 0;
function flushDiscreteUpdatesIfNeeded(timeStamp) {
  isInsideEventHandler ||
    (0 !== timeStamp && lastFlushedEventTimeStamp === timeStamp) ||
    ((lastFlushedEventTimeStamp = timeStamp), flushDiscreteUpdatesImpl());
}
var UserBlockingPriority$1 = Scheduler.unstable_UserBlockingPriority,
  runWithPriority$1 = Scheduler.unstable_runWithPriority,
  listenToResponderEventTypesImpl,
  rootEventTypesToEventResponderInstances = new Map(),
  currentTimeStamp = 0,
  currentInstance = null,
  currentDocument = null,
  currentPropagationBehavior = 0,
  eventResponderContext = {
    dispatchEvent: function(eventValue, eventListener, eventPriority) {
      validateResponderContext();
      validateEventValue(eventValue);
      switch (eventPriority) {
        case 0:
          flushDiscreteUpdatesIfNeeded(currentTimeStamp);
          discreteUpdates$1(function() {
            return executeUserEventHandler(eventListener, eventValue);
          });
          break;
        case 1:
          runWithPriority$1(UserBlockingPriority$1, function() {
            return executeUserEventHandler(eventListener, eventValue);
          });
          break;
        case 2:
          executeUserEventHandler(eventListener, eventValue);
      }
    },
    isTargetWithinResponder: function(target) {
      validateResponderContext();
      if (null != target) {
        target = getClosestInstanceFromNode(target);
        for (var responderFiber = currentInstance.fiber; null !== target; ) {
          if (target === responderFiber || target.alternate === responderFiber)
            return !0;
          target = target.return;
        }
      }
      return !1;
    },
    isTargetWithinResponderScope: function(target) {
      validateResponderContext();
      var responder = currentInstance.responder;
      if (null != target) {
        target = getClosestInstanceFromNode(target);
        for (var responderFiber = currentInstance.fiber; null !== target; ) {
          if (target === responderFiber || target.alternate === responderFiber)
            return !0;
          a: {
            var JSCompiler_inline_result = target.tag;
            if (
              5 === JSCompiler_inline_result ||
              21 === JSCompiler_inline_result
            )
              if (
                ((JSCompiler_inline_result = target.dependencies),
                null !== JSCompiler_inline_result &&
                  ((JSCompiler_inline_result =
                    JSCompiler_inline_result.responders),
                  null !== JSCompiler_inline_result &&
                    JSCompiler_inline_result.has(responder)))
              ) {
                JSCompiler_inline_result = !0;
                break a;
              }
            JSCompiler_inline_result = !1;
          }
          if (JSCompiler_inline_result) break;
          target = target.return;
        }
      }
      return !1;
    },
    isTargetWithinNode: function(childTarget, parentTarget) {
      validateResponderContext();
      var childFiber = getClosestInstanceFromNode(childTarget),
        parentFiber = getClosestInstanceFromNode(parentTarget);
      if (null != childFiber && null != parentFiber) {
        for (childTarget = parentFiber.alternate; null !== childFiber; ) {
          if (childFiber === parentFiber || childFiber === childTarget)
            return !0;
          childFiber = childFiber.return;
        }
        return !1;
      }
      return parentTarget.contains(childTarget);
    },
    addRootEventTypes: function(rootEventTypes) {
      validateResponderContext();
      listenToResponderEventTypesImpl(rootEventTypes, currentDocument);
      for (var i = 0; i < rootEventTypes.length; i++)
        registerRootEventType(rootEventTypes[i], currentInstance);
    },
    removeRootEventTypes: function(rootEventTypes) {
      validateResponderContext();
      for (var i = 0; i < rootEventTypes.length; i++) {
        var rootEventType = rootEventTypes[i],
          rootEventResponders = rootEventTypesToEventResponderInstances.get(
            rootEventType
          ),
          rootEventTypesSet = currentInstance.rootEventTypes;
        null !== rootEventTypesSet && rootEventTypesSet.delete(rootEventType);
        void 0 !== rootEventResponders &&
          rootEventResponders.delete(currentInstance);
      }
    },
    getActiveDocument: getActiveDocument,
    objectAssign: Object.assign,
    getTimeStamp: function() {
      validateResponderContext();
      return currentTimeStamp;
    },
    isTargetWithinHostComponent: function(target, elementType) {
      validateResponderContext();
      for (target = getClosestInstanceFromNode(target); null !== target; ) {
        if (5 === target.tag && target.type === elementType) return !0;
        target = target.return;
      }
      return !1;
    },
    continuePropagation: function() {
      currentPropagationBehavior = 1;
    },
    enqueueStateRestore: enqueueStateRestore,
    getResponderNode: function() {
      validateResponderContext();
      var responderFiber = currentInstance.fiber;
      return 21 === responderFiber.tag ? null : responderFiber.stateNode;
    }
  };
function validateEventValue(eventValue) {
  if ("object" === typeof eventValue && null !== eventValue) {
    var type = eventValue.type,
      timeStamp = eventValue.timeStamp;
    if (null == eventValue.target || null == type || null == timeStamp)
      throw Error(
        'context.dispatchEvent: "target", "timeStamp", and "type" fields on event object are required.'
      );
    eventValue.isDefaultPrevented = function() {};
    eventValue.isPropagationStopped = function() {};
    Object.defineProperty(eventValue, "nativeEvent", { get: function() {} });
  }
}
function getActiveDocument() {
  return currentDocument;
}
function mountEventResponder(responder, responderInstance, props, state) {
  var onMount = responder.onMount;
  if (null !== onMount) {
    responder = currentInstance;
    currentInstance = responderInstance;
    try {
      batchedEventUpdates$1(function() {
        onMount(eventResponderContext, props, state);
      });
    } finally {
      currentInstance = responder;
    }
  }
}
function unmountEventResponder(responderInstance) {
  var onUnmount = responderInstance.responder.onUnmount;
  if (null !== onUnmount) {
    var props = responderInstance.props,
      state = responderInstance.state,
      previousInstance = currentInstance;
    currentInstance = responderInstance;
    try {
      batchedEventUpdates$1(function() {
        onUnmount(eventResponderContext, props, state);
      });
    } finally {
      currentInstance = previousInstance;
    }
  }
  previousInstance = responderInstance.rootEventTypes;
  if (null !== previousInstance) {
    previousInstance = Array.from(previousInstance);
    for (var i = 0; i < previousInstance.length; i++) {
      var rootEventResponderInstances = rootEventTypesToEventResponderInstances.get(
        previousInstance[i]
      );
      void 0 !== rootEventResponderInstances &&
        rootEventResponderInstances.delete(responderInstance);
    }
  }
}
function validateResponderContext() {
  if (null === currentInstance) throw Error(formatProdErrorMessage(346));
}
function dispatchEventForResponderEventSystem(
  topLevelType,
  targetFiber,
  nativeEvent,
  nativeEventTarget,
  eventSystemFlags
) {
  var previousInstance = currentInstance,
    previousTimeStamp = currentTimeStamp,
    previousDocument = currentDocument,
    previousPropagationBehavior = currentPropagationBehavior;
  currentPropagationBehavior = 0;
  currentDocument =
    9 === nativeEventTarget.nodeType
      ? nativeEventTarget
      : nativeEventTarget.ownerDocument;
  currentTimeStamp = nativeEvent.timeStamp;
  try {
    batchedEventUpdates$1(function() {
      var isPassiveEvent = 0 !== (eventSystemFlags & 4),
        isPassiveSupported = 0 === (eventSystemFlags & 16),
        eventType =
          isPassiveEvent || !isPassiveSupported
            ? topLevelType
            : topLevelType + "_active",
        visitedResponders = new Set(),
        buttons = nativeEvent.buttons,
        pointerType = nativeEvent.pointerType,
        eventPointerType = "";
      void 0 !== pointerType
        ? (eventPointerType = pointerType)
        : void 0 !== nativeEvent.key
          ? (eventPointerType = "keyboard")
          : void 0 !== buttons
            ? (eventPointerType = "mouse")
            : void 0 !== nativeEvent.changedTouches &&
              (eventPointerType = "touch");
      isPassiveEvent = {
        nativeEvent: nativeEvent,
        passive: isPassiveEvent,
        passiveSupported: isPassiveSupported,
        pointerType: eventPointerType,
        target: nativeEventTarget,
        type: topLevelType
      };
      isPassiveSupported = targetFiber;
      for (buttons = !1; null !== isPassiveSupported; ) {
        eventPointerType = isPassiveSupported;
        pointerType = eventPointerType.dependencies;
        eventPointerType = eventPointerType.tag;
        if (4 === eventPointerType) buttons = !0;
        else if (
          (5 === eventPointerType || 21 === eventPointerType) &&
          null !== pointerType &&
          ((pointerType = pointerType.responders), null !== pointerType)
        )
          for (
            var responderInstances = Array.from(pointerType.values()),
              i = 0,
              length = responderInstances.length;
            i < length;
            i++
          ) {
            var responderInstance = responderInstances[i];
            pointerType = responderInstance.props;
            var responder = responderInstance.responder;
            eventPointerType = responderInstance.state;
            var JSCompiler_temp;
            if ((JSCompiler_temp = !visitedResponders.has(responder)))
              if (
                ((JSCompiler_temp = responder.targetEventTypes),
                null !== JSCompiler_temp)
              )
                a: {
                  for (
                    var i$jscomp$0 = 0, len = JSCompiler_temp.length;
                    i$jscomp$0 < len;
                    i$jscomp$0++
                  )
                    if (JSCompiler_temp[i$jscomp$0] === eventType) {
                      JSCompiler_temp = !0;
                      break a;
                    }
                  JSCompiler_temp = !1;
                }
              else JSCompiler_temp = !1;
            !JSCompiler_temp ||
              (buttons && !responder.targetPortalPropagation) ||
              (visitedResponders.add(responder),
              (JSCompiler_temp = responder.onEvent),
              null !== JSCompiler_temp &&
                ((currentInstance = responderInstance),
                JSCompiler_temp(
                  isPassiveEvent,
                  eventResponderContext,
                  pointerType,
                  eventPointerType
                ),
                1 === currentPropagationBehavior &&
                  (visitedResponders.delete(responder),
                  (currentPropagationBehavior = 0))));
          }
        isPassiveSupported = isPassiveSupported.return;
      }
      eventType = rootEventTypesToEventResponderInstances.get(eventType);
      if (void 0 !== eventType)
        for (
          eventType = Array.from(eventType), visitedResponders = 0;
          visitedResponders < eventType.length;
          visitedResponders++
        )
          (isPassiveSupported = eventType[visitedResponders]),
            (pointerType = isPassiveSupported.props),
            (responder = isPassiveSupported.responder),
            (eventPointerType = isPassiveSupported.state),
            (buttons = responder.onRootEvent),
            null !== buttons &&
              ((currentInstance = isPassiveSupported),
              buttons(
                isPassiveEvent,
                eventResponderContext,
                pointerType,
                eventPointerType
              ));
    });
  } finally {
    (currentInstance = previousInstance),
      (currentTimeStamp = previousTimeStamp),
      (currentDocument = previousDocument),
      (currentPropagationBehavior = previousPropagationBehavior);
  }
}
function registerRootEventType(rootEventType, eventResponderInstance) {
  var rootEventResponderInstances = rootEventTypesToEventResponderInstances.get(
    rootEventType
  );
  void 0 === rootEventResponderInstances &&
    ((rootEventResponderInstances = new Set()),
    rootEventTypesToEventResponderInstances.set(
      rootEventType,
      rootEventResponderInstances
    ));
  var rootEventTypesSet = eventResponderInstance.rootEventTypes;
  null === rootEventTypesSet &&
    (rootEventTypesSet = eventResponderInstance.rootEventTypes = new Set());
  if (rootEventTypesSet.has(rootEventType))
    throw Error(formatProdErrorMessage(325, rootEventType));
  rootEventTypesSet.add(rootEventType);
  rootEventResponderInstances.add(eventResponderInstance);
}
var VALID_ATTRIBUTE_NAME_REGEX = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  hasOwnProperty = Object.prototype.hasOwnProperty,
  illegalAttributeNameCache = {},
  validatedAttributeNameCache = {};
function isAttributeNameSafe(attributeName) {
  if (hasOwnProperty.call(validatedAttributeNameCache, attributeName))
    return !0;
  if (hasOwnProperty.call(illegalAttributeNameCache, attributeName)) return !1;
  if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName))
    return (validatedAttributeNameCache[attributeName] = !0);
  illegalAttributeNameCache[attributeName] = !0;
  return !1;
}
function shouldRemoveAttributeWithWarning(
  name,
  value,
  propertyInfo,
  isCustomComponentTag
) {
  if (null !== propertyInfo && 0 === propertyInfo.type) return !1;
  switch (typeof value) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      if (isCustomComponentTag) return !1;
      if (null !== propertyInfo) return !propertyInfo.acceptsBooleans;
      name = name.toLowerCase().slice(0, 5);
      return "data-" !== name && "aria-" !== name;
    default:
      return !1;
  }
}
function shouldRemoveAttribute(
  name,
  value,
  propertyInfo,
  isCustomComponentTag
) {
  if (
    null === value ||
    "undefined" === typeof value ||
    shouldRemoveAttributeWithWarning(
      name,
      value,
      propertyInfo,
      isCustomComponentTag
    )
  )
    return !0;
  if (isCustomComponentTag) return !1;
  if (null !== propertyInfo)
    switch (propertyInfo.type) {
      case 3:
        return !value;
      case 4:
        return !1 === value;
      case 5:
        return isNaN(value);
      case 6:
        return isNaN(value) || 1 > value;
    }
  return !1;
}
function PropertyInfoRecord(
  name,
  type,
  mustUseProperty,
  attributeName,
  attributeNamespace,
  sanitizeURL
) {
  this.acceptsBooleans = 2 === type || 3 === type || 4 === type;
  this.attributeName = attributeName;
  this.attributeNamespace = attributeNamespace;
  this.mustUseProperty = mustUseProperty;
  this.propertyName = name;
  this.type = type;
  this.sanitizeURL = sanitizeURL;
}
var properties = {},
  reservedProps = "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(
    " "
  );
reservedProps.push("DEPRECATED_flareListeners");
reservedProps.forEach(function(name) {
  properties[name] = new PropertyInfoRecord(name, 0, !1, name, null, !1);
});
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"]
].forEach(function(_ref) {
  var name = _ref[0];
  properties[name] = new PropertyInfoRecord(name, 1, !1, _ref[1], null, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(name) {
  properties[name] = new PropertyInfoRecord(
    name,
    2,
    !1,
    name.toLowerCase(),
    null,
    !1
  );
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha"
].forEach(function(name) {
  properties[name] = new PropertyInfoRecord(name, 2, !1, name, null, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function(name) {
    properties[name] = new PropertyInfoRecord(
      name,
      3,
      !1,
      name.toLowerCase(),
      null,
      !1
    );
  });
["checked", "multiple", "muted", "selected"].forEach(function(name) {
  properties[name] = new PropertyInfoRecord(name, 3, !0, name, null, !1);
});
["capture", "download"].forEach(function(name) {
  properties[name] = new PropertyInfoRecord(name, 4, !1, name, null, !1);
});
["cols", "rows", "size", "span"].forEach(function(name) {
  properties[name] = new PropertyInfoRecord(name, 6, !1, name, null, !1);
});
["rowSpan", "start"].forEach(function(name) {
  properties[name] = new PropertyInfoRecord(
    name,
    5,
    !1,
    name.toLowerCase(),
    null,
    !1
  );
});
var CAMELIZE = /[\-:]([a-z])/g;
function capitalize(token) {
  return token[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function(attributeName) {
    var name = attributeName.replace(CAMELIZE, capitalize);
    properties[name] = new PropertyInfoRecord(
      name,
      1,
      !1,
      attributeName,
      null,
      !1
    );
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function(attributeName) {
    var name = attributeName.replace(CAMELIZE, capitalize);
    properties[name] = new PropertyInfoRecord(
      name,
      1,
      !1,
      attributeName,
      "http://www.w3.org/1999/xlink",
      !1
    );
  });
["xml:base", "xml:lang", "xml:space"].forEach(function(attributeName) {
  var name = attributeName.replace(CAMELIZE, capitalize);
  properties[name] = new PropertyInfoRecord(
    name,
    1,
    !1,
    attributeName,
    "http://www.w3.org/XML/1998/namespace",
    !1
  );
});
["tabIndex", "crossOrigin"].forEach(function(attributeName) {
  properties[attributeName] = new PropertyInfoRecord(
    attributeName,
    1,
    !1,
    attributeName.toLowerCase(),
    null,
    !1
  );
});
properties.xlinkHref = new PropertyInfoRecord(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0
);
["src", "href", "action", "formAction"].forEach(function(attributeName) {
  properties[attributeName] = new PropertyInfoRecord(
    attributeName,
    1,
    !1,
    attributeName.toLowerCase(),
    null,
    !0
  );
});
var isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
function getToStringValue(value) {
  switch (typeof value) {
    case "boolean":
    case "number":
    case "object":
    case "string":
    case "undefined":
      return value;
    default:
      return "";
  }
}
function toStringOrTrustedType(value) {
  return "" + value;
}
enableTrustedTypesIntegration &&
  "undefined" !== typeof trustedTypes &&
  (toStringOrTrustedType = function(value) {
    return "object" === typeof value &&
      (trustedTypes.isHTML(value) ||
        trustedTypes.isScript(value) ||
        trustedTypes.isScriptURL(value) ||
        (trustedTypes.isURL && trustedTypes.isURL(value)))
      ? value
      : "" + value;
  });
function setValueForProperty(node, name, value, isCustomComponentTag) {
  var propertyInfo = properties.hasOwnProperty(name) ? properties[name] : null;
  var JSCompiler_inline_result =
    null !== propertyInfo
      ? 0 === propertyInfo.type
      : isCustomComponentTag
        ? !1
        : !(2 < name.length) ||
          ("o" !== name[0] && "O" !== name[0]) ||
          ("n" !== name[1] && "N" !== name[1])
          ? !1
          : !0;
  if (!JSCompiler_inline_result)
    if (
      (shouldRemoveAttribute(name, value, propertyInfo, isCustomComponentTag) &&
        (value = null),
      isCustomComponentTag || null === propertyInfo)
    )
      isAttributeNameSafe(name) &&
        (null === value
          ? node.removeAttribute(name)
          : ((propertyInfo = toStringOrTrustedType(value)),
            node.setAttribute(name, propertyInfo)));
    else if (propertyInfo.mustUseProperty)
      node[propertyInfo.propertyName] =
        null === value ? (3 === propertyInfo.type ? !1 : "") : value;
    else if (
      ((name = propertyInfo.attributeName),
      (isCustomComponentTag = propertyInfo.attributeNamespace),
      null === value)
    )
      node.removeAttribute(name);
    else {
      JSCompiler_inline_result = propertyInfo.type;
      if (
        3 === JSCompiler_inline_result ||
        (4 === JSCompiler_inline_result && !0 === value)
      )
        value = "";
      else if (
        ((value = toStringOrTrustedType(value)),
        propertyInfo.sanitizeURL && isJavaScriptProtocol.test(value.toString()))
      )
        throw Error(formatProdErrorMessage(323, ""));
      isCustomComponentTag
        ? node.setAttributeNS(isCustomComponentTag, name, value)
        : node.setAttribute(name, value);
    }
}
function isCheckable(elem) {
  var type = elem.type;
  return (
    (elem = elem.nodeName) &&
    "input" === elem.toLowerCase() &&
    ("checkbox" === type || "radio" === type)
  );
}
function trackValueOnNode(node) {
  var valueField = isCheckable(node) ? "checked" : "value",
    descriptor = Object.getOwnPropertyDescriptor(
      node.constructor.prototype,
      valueField
    ),
    currentValue = "" + node[valueField];
  if (
    !node.hasOwnProperty(valueField) &&
    "undefined" !== typeof descriptor &&
    "function" === typeof descriptor.get &&
    "function" === typeof descriptor.set
  ) {
    var get = descriptor.get,
      set = descriptor.set;
    Object.defineProperty(node, valueField, {
      configurable: !0,
      get: function() {
        return get.call(this);
      },
      set: function(value) {
        currentValue = "" + value;
        set.call(this, value);
      }
    });
    Object.defineProperty(node, valueField, {
      enumerable: descriptor.enumerable
    });
    return {
      getValue: function() {
        return currentValue;
      },
      setValue: function(value) {
        currentValue = "" + value;
      },
      stopTracking: function() {
        node._valueTracker = null;
        delete node[valueField];
      }
    };
  }
}
function track(node) {
  node._valueTracker || (node._valueTracker = trackValueOnNode(node));
}
function updateValueIfChanged(node) {
  if (!node) return !1;
  var tracker = node._valueTracker;
  if (!tracker) return !0;
  var lastValue = tracker.getValue();
  var value = "";
  node &&
    (value = isCheckable(node)
      ? node.checked
        ? "true"
        : "false"
      : node.value);
  node = value;
  return node !== lastValue ? (tracker.setValue(node), !0) : !1;
}
function getHostProps(element, props) {
  var checked = props.checked;
  return Object.assign({}, props, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: null != checked ? checked : element._wrapperState.initialChecked
  });
}
function initWrapperState(element, props) {
  var defaultValue = null == props.defaultValue ? "" : props.defaultValue,
    JSCompiler_temp_const =
      null != props.checked ? props.checked : props.defaultChecked;
  defaultValue = getToStringValue(
    null != props.value ? props.value : defaultValue
  );
  element._wrapperState = {
    initialChecked: JSCompiler_temp_const,
    initialValue: defaultValue,
    controlled:
      "checkbox" === props.type || "radio" === props.type
        ? null != props.checked
        : null != props.value
  };
}
function updateChecked(element, props) {
  props = props.checked;
  null != props && setValueForProperty(element, "checked", props, !1);
}
function updateWrapper(element, props) {
  updateChecked(element, props);
  var value = getToStringValue(props.value),
    type = props.type;
  if (null != value)
    if ("number" === type) {
      if ((0 === value && "" === element.value) || element.value != value)
        element.value = "" + value;
    } else element.value !== "" + value && (element.value = "" + value);
  else if ("submit" === type || "reset" === type) {
    element.removeAttribute("value");
    return;
  }
  disableInputAttributeSyncing
    ? props.hasOwnProperty("defaultValue") &&
      setDefaultValue(element, props.type, getToStringValue(props.defaultValue))
    : props.hasOwnProperty("value")
      ? setDefaultValue(element, props.type, value)
      : props.hasOwnProperty("defaultValue") &&
        setDefaultValue(
          element,
          props.type,
          getToStringValue(props.defaultValue)
        );
  disableInputAttributeSyncing
    ? null == props.defaultChecked
      ? element.removeAttribute("checked")
      : (element.defaultChecked = !!props.defaultChecked)
    : null == props.checked &&
      null != props.defaultChecked &&
      (element.defaultChecked = !!props.defaultChecked);
}
function postMountWrapper(element, props, isHydrating) {
  if (props.hasOwnProperty("value") || props.hasOwnProperty("defaultValue")) {
    var type = props.type;
    if (
      (type = "submit" === type || "reset" === type) &&
      (void 0 === props.value || null === props.value)
    )
      return;
    var initialValue = "" + element._wrapperState.initialValue;
    if (!isHydrating)
      if (disableInputAttributeSyncing) {
        var value = getToStringValue(props.value);
        null == value ||
          (!type && value === element.value) ||
          (element.value = "" + value);
      } else initialValue !== element.value && (element.value = initialValue);
    disableInputAttributeSyncing
      ? ((type = getToStringValue(props.defaultValue)),
        null != type && (element.defaultValue = "" + type))
      : (element.defaultValue = initialValue);
  }
  type = element.name;
  "" !== type && (element.name = "");
  disableInputAttributeSyncing
    ? (isHydrating || updateChecked(element, props),
      props.hasOwnProperty("defaultChecked") &&
        ((element.defaultChecked = !element.defaultChecked),
        (element.defaultChecked = !!props.defaultChecked)))
    : ((element.defaultChecked = !element.defaultChecked),
      (element.defaultChecked = !!element._wrapperState.initialChecked));
  "" !== type && (element.name = type);
}
function setDefaultValue(node, type, value) {
  if ("number" !== type || node.ownerDocument.activeElement !== node)
    null == value
      ? (node.defaultValue = "" + node._wrapperState.initialValue)
      : node.defaultValue !== "" + value && (node.defaultValue = "" + value);
}
function flattenChildren(children) {
  var content = "";
  React.Children.forEach(children, function(child) {
    null != child && (content += child);
  });
  return content;
}
function getHostProps$1(element, props) {
  element = Object.assign({ children: void 0 }, props);
  if ((props = flattenChildren(props.children))) element.children = props;
  return element;
}
function updateOptions(node, multiple, propValue, setDefaultSelected) {
  node = node.options;
  if (multiple) {
    multiple = {};
    for (var i = 0; i < propValue.length; i++)
      multiple["$" + propValue[i]] = !0;
    for (propValue = 0; propValue < node.length; propValue++)
      (i = multiple.hasOwnProperty("$" + node[propValue].value)),
        node[propValue].selected !== i && (node[propValue].selected = i),
        i && setDefaultSelected && (node[propValue].defaultSelected = !0);
  } else {
    propValue = "" + getToStringValue(propValue);
    multiple = null;
    for (i = 0; i < node.length; i++) {
      if (node[i].value === propValue) {
        node[i].selected = !0;
        setDefaultSelected && (node[i].defaultSelected = !0);
        return;
      }
      null !== multiple || node[i].disabled || (multiple = node[i]);
    }
    null !== multiple && (multiple.selected = !0);
  }
}
function getHostProps$3(element, props) {
  if (null != props.dangerouslySetInnerHTML)
    throw Error(formatProdErrorMessage(91));
  return Object.assign({}, props, {
    value: void 0,
    defaultValue: void 0,
    children: "" + element._wrapperState.initialValue
  });
}
function initWrapperState$2(element, props) {
  var initialValue = props.value;
  if (null == initialValue) {
    initialValue = props.defaultValue;
    props = props.children;
    if (null != props) {
      if (null != initialValue) throw Error(formatProdErrorMessage(92));
      if (Array.isArray(props)) {
        if (!(1 >= props.length)) throw Error(formatProdErrorMessage(93));
        props = props[0];
      }
      initialValue = props;
    }
    null == initialValue && (initialValue = "");
  }
  element._wrapperState = { initialValue: getToStringValue(initialValue) };
}
function updateWrapper$1(element, props) {
  var value = getToStringValue(props.value),
    defaultValue = getToStringValue(props.defaultValue);
  null != value &&
    ((value = "" + value),
    value !== element.value && (element.value = value),
    null == props.defaultValue &&
      element.defaultValue !== value &&
      (element.defaultValue = value));
  null != defaultValue && (element.defaultValue = "" + defaultValue);
}
function postMountWrapper$3(element) {
  var textContent = element.textContent;
  textContent === element._wrapperState.initialValue &&
    "" !== textContent &&
    null !== textContent &&
    (element.value = textContent);
}
var Namespaces = {
  html: "http://www.w3.org/1999/xhtml",
  mathml: "http://www.w3.org/1998/Math/MathML",
  svg: "http://www.w3.org/2000/svg"
};
function getIntrinsicNamespace(type) {
  switch (type) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function getChildNamespace(parentNamespace, type) {
  return null == parentNamespace ||
    "http://www.w3.org/1999/xhtml" === parentNamespace
    ? getIntrinsicNamespace(type)
    : "http://www.w3.org/2000/svg" === parentNamespace &&
      "foreignObject" === type
      ? "http://www.w3.org/1999/xhtml"
      : parentNamespace;
}
var reusableSVGContainer,
  setInnerHTML = (function(func) {
    return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction
      ? function(arg0, arg1, arg2, arg3) {
          MSApp.execUnsafeLocalFunction(function() {
            return func(arg0, arg1, arg2, arg3);
          });
        }
      : func;
  })(function(node, html) {
    if (node.namespaceURI !== Namespaces.svg || "innerHTML" in node)
      node.innerHTML = html;
    else {
      reusableSVGContainer =
        reusableSVGContainer || document.createElement("div");
      reusableSVGContainer.innerHTML =
        "<svg>" + html.valueOf().toString() + "</svg>";
      for (html = reusableSVGContainer.firstChild; node.firstChild; )
        node.removeChild(node.firstChild);
      for (; html.firstChild; ) node.appendChild(html.firstChild);
    }
  }),
  COMMENT_NODE = 8;
function setTextContent(node, text) {
  if (text) {
    var firstChild = node.firstChild;
    if (
      firstChild &&
      firstChild === node.lastChild &&
      3 === firstChild.nodeType
    ) {
      firstChild.nodeValue = text;
      return;
    }
  }
  node.textContent = text;
}
function makePrefixMap(styleProp, eventName) {
  var prefixes = {};
  prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
  prefixes["Webkit" + styleProp] = "webkit" + eventName;
  prefixes["Moz" + styleProp] = "moz" + eventName;
  return prefixes;
}
var vendorPrefixes = {
    animationend: makePrefixMap("Animation", "AnimationEnd"),
    animationiteration: makePrefixMap("Animation", "AnimationIteration"),
    animationstart: makePrefixMap("Animation", "AnimationStart"),
    transitionend: makePrefixMap("Transition", "TransitionEnd")
  },
  prefixedEventNames = {},
  style = {};
canUseDOM &&
  ((style = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete vendorPrefixes.animationend.animation,
    delete vendorPrefixes.animationiteration.animation,
    delete vendorPrefixes.animationstart.animation),
  "TransitionEvent" in window ||
    delete vendorPrefixes.transitionend.transition);
function getVendorPrefixedEventName(eventName) {
  if (prefixedEventNames[eventName]) return prefixedEventNames[eventName];
  if (!vendorPrefixes[eventName]) return eventName;
  var prefixMap = vendorPrefixes[eventName],
    styleProp;
  for (styleProp in prefixMap)
    if (prefixMap.hasOwnProperty(styleProp) && styleProp in style)
      return (prefixedEventNames[eventName] = prefixMap[styleProp]);
  return eventName;
}
var TOP_ANIMATION_END = getVendorPrefixedEventName("animationend"),
  TOP_ANIMATION_ITERATION = getVendorPrefixedEventName("animationiteration"),
  TOP_ANIMATION_START = getVendorPrefixedEventName("animationstart"),
  TOP_TRANSITION_END = getVendorPrefixedEventName("transitionend"),
  mediaEventTypes = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  );
function accumulateInto(current, next) {
  if (null == next) throw Error(formatProdErrorMessage(30));
  if (null == current) return next;
  if (Array.isArray(current)) {
    if (Array.isArray(next)) return current.push.apply(current, next), current;
    current.push(next);
    return current;
  }
  return Array.isArray(next) ? [current].concat(next) : [current, next];
}
function forEachAccumulated(arr, cb, scope) {
  Array.isArray(arr) ? arr.forEach(cb, scope) : arr && cb.call(scope, arr);
}
var eventQueue = null;
function executeDispatchesAndReleaseTopLevel(e) {
  if (e) {
    var dispatchListeners = e._dispatchListeners,
      dispatchInstances = e._dispatchInstances;
    if (Array.isArray(dispatchListeners))
      for (
        var i = 0;
        i < dispatchListeners.length && !e.isPropagationStopped();
        i++
      )
        executeDispatch(e, dispatchListeners[i], dispatchInstances[i]);
    else
      dispatchListeners &&
        executeDispatch(e, dispatchListeners, dispatchInstances);
    e._dispatchListeners = null;
    e._dispatchInstances = null;
    e.isPersistent() || e.constructor.release(e);
  }
}
function runEventsInBatch(events) {
  null !== events && (eventQueue = accumulateInto(eventQueue, events));
  events = eventQueue;
  eventQueue = null;
  if (events) {
    forEachAccumulated(events, executeDispatchesAndReleaseTopLevel);
    if (eventQueue) throw Error(formatProdErrorMessage(95));
    if (hasRethrowError)
      throw ((events = rethrowError),
      (hasRethrowError = !1),
      (rethrowError = null),
      events);
  }
}
var injection = {
  injectEventPluginOrder: function(injectedEventPluginOrder) {
    if (eventPluginOrder) throw Error(formatProdErrorMessage(101));
    eventPluginOrder = Array.prototype.slice.call(injectedEventPluginOrder);
    recomputePluginOrdering();
  },
  injectEventPluginsByName: function(injectedNamesToPlugins) {
    var isOrderingDirty = !1,
      pluginName;
    for (pluginName in injectedNamesToPlugins)
      if (injectedNamesToPlugins.hasOwnProperty(pluginName)) {
        var pluginModule = injectedNamesToPlugins[pluginName];
        if (
          !namesToPlugins.hasOwnProperty(pluginName) ||
          namesToPlugins[pluginName] !== pluginModule
        ) {
          if (namesToPlugins[pluginName])
            throw Error(formatProdErrorMessage(102, pluginName));
          namesToPlugins[pluginName] = pluginModule;
          isOrderingDirty = !0;
        }
      }
    isOrderingDirty && recomputePluginOrdering();
  }
};
function getListener(inst, registrationName) {
  var listener = inst.stateNode;
  if (!listener) return null;
  var props = getFiberCurrentPropsFromNode$1(listener);
  if (!props) return null;
  listener = props[registrationName];
  a: switch (registrationName) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
      (props = !props.disabled) ||
        ((inst = inst.type),
        (props = !(
          "button" === inst ||
          "input" === inst ||
          "select" === inst ||
          "textarea" === inst
        )));
      inst = !props;
      break a;
    default:
      inst = !1;
  }
  if (inst) return null;
  if (listener && "function" !== typeof listener)
    throw Error(formatProdErrorMessage(231, registrationName, typeof listener));
  return listener;
}
var attemptSynchronousHydration,
  attemptUserBlockingHydration,
  attemptContinuousHydration,
  attemptHydrationAtCurrentPriority,
  hasScheduledReplayAttempt = !1,
  queuedDiscreteEvents = [],
  queuedFocus = null,
  queuedDrag = null,
  queuedMouse = null,
  queuedPointers = new Map(),
  queuedPointerCaptures = new Map(),
  queuedExplicitHydrationTargets = [],
  discreteReplayableEvents = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput close cancel copy cut paste click change contextmenu reset submit".split(
    " "
  ),
  continuousReplayableEvents = "focus blur dragenter dragleave mouseover mouseout pointerover pointerout gotpointercapture lostpointercapture".split(
    " "
  );
function trapReplayableEvent(topLevelType, document, listeningSet) {
  listenToTopLevel(topLevelType, document, listeningSet);
  var passiveEventKey = topLevelType + "_passive";
  listeningSet.has(passiveEventKey) ||
    (trapEventForResponderEventSystem(document, topLevelType, !0),
    listeningSet.add(passiveEventKey));
  passiveEventKey = topLevelType + "_active";
  listeningSet.has(passiveEventKey) ||
    (trapEventForResponderEventSystem(document, topLevelType, !1),
    listeningSet.add(passiveEventKey));
}
function eagerlyTrapReplayableEvents(document) {
  var listeningSet = getListeningSetForElement(document);
  discreteReplayableEvents.forEach(function(topLevelType) {
    trapReplayableEvent(topLevelType, document, listeningSet);
  });
  continuousReplayableEvents.forEach(function(topLevelType) {
    trapReplayableEvent(topLevelType, document, listeningSet);
  });
}
function createQueuedReplayableEvent(
  blockedOn,
  topLevelType,
  eventSystemFlags,
  nativeEvent
) {
  return {
    blockedOn: blockedOn,
    topLevelType: topLevelType,
    eventSystemFlags: eventSystemFlags | 32,
    nativeEvent: nativeEvent
  };
}
function queueDiscreteEvent(
  blockedOn,
  topLevelType,
  eventSystemFlags,
  nativeEvent
) {
  blockedOn = createQueuedReplayableEvent(
    blockedOn,
    topLevelType,
    eventSystemFlags,
    nativeEvent
  );
  queuedDiscreteEvents.push(blockedOn);
  if (enableSelectiveHydration && 1 === queuedDiscreteEvents.length)
    for (; null !== blockedOn.blockedOn; ) {
      topLevelType = getInstanceFromNode$1(blockedOn.blockedOn);
      if (null === topLevelType) break;
      attemptSynchronousHydration(topLevelType);
      if (null === blockedOn.blockedOn) replayUnblockedEvents();
      else break;
    }
}
function clearIfContinuousEvent(topLevelType, nativeEvent) {
  switch (topLevelType) {
    case "focus":
    case "blur":
      queuedFocus = null;
      break;
    case "dragenter":
    case "dragleave":
      queuedDrag = null;
      break;
    case "mouseover":
    case "mouseout":
      queuedMouse = null;
      break;
    case "pointerover":
    case "pointerout":
      queuedPointers.delete(nativeEvent.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      queuedPointerCaptures.delete(nativeEvent.pointerId);
  }
}
function accumulateOrCreateContinuousQueuedReplayableEvent(
  existingQueuedEvent,
  blockedOn,
  topLevelType,
  eventSystemFlags,
  nativeEvent
) {
  if (
    null === existingQueuedEvent ||
    existingQueuedEvent.nativeEvent !== nativeEvent
  )
    return (
      (existingQueuedEvent = createQueuedReplayableEvent(
        blockedOn,
        topLevelType,
        eventSystemFlags,
        nativeEvent
      )),
      null !== blockedOn &&
        ((blockedOn = getInstanceFromNode$1(blockedOn)),
        null !== blockedOn && attemptContinuousHydration(blockedOn)),
      existingQueuedEvent
    );
  existingQueuedEvent.eventSystemFlags |= eventSystemFlags;
  return existingQueuedEvent;
}
function queueIfContinuousEvent(
  blockedOn,
  topLevelType,
  eventSystemFlags,
  nativeEvent
) {
  switch (topLevelType) {
    case "focus":
      return (
        (queuedFocus = accumulateOrCreateContinuousQueuedReplayableEvent(
          queuedFocus,
          blockedOn,
          topLevelType,
          eventSystemFlags,
          nativeEvent
        )),
        !0
      );
    case "dragenter":
      return (
        (queuedDrag = accumulateOrCreateContinuousQueuedReplayableEvent(
          queuedDrag,
          blockedOn,
          topLevelType,
          eventSystemFlags,
          nativeEvent
        )),
        !0
      );
    case "mouseover":
      return (
        (queuedMouse = accumulateOrCreateContinuousQueuedReplayableEvent(
          queuedMouse,
          blockedOn,
          topLevelType,
          eventSystemFlags,
          nativeEvent
        )),
        !0
      );
    case "pointerover":
      var pointerId = nativeEvent.pointerId;
      queuedPointers.set(
        pointerId,
        accumulateOrCreateContinuousQueuedReplayableEvent(
          queuedPointers.get(pointerId) || null,
          blockedOn,
          topLevelType,
          eventSystemFlags,
          nativeEvent
        )
      );
      return !0;
    case "gotpointercapture":
      return (
        (pointerId = nativeEvent.pointerId),
        queuedPointerCaptures.set(
          pointerId,
          accumulateOrCreateContinuousQueuedReplayableEvent(
            queuedPointerCaptures.get(pointerId) || null,
            blockedOn,
            topLevelType,
            eventSystemFlags,
            nativeEvent
          )
        ),
        !0
      );
  }
  return !1;
}
function attemptExplicitHydrationTarget(queuedTarget) {
  var targetInst = getClosestInstanceFromNode(queuedTarget.target);
  if (null !== targetInst) {
    var nearestMounted = getNearestMountedFiber(targetInst);
    if (null !== nearestMounted)
      if (((targetInst = nearestMounted.tag), 13 === targetInst)) {
        if (
          ((targetInst = getSuspenseInstanceFromFiber(nearestMounted)),
          null !== targetInst)
        ) {
          queuedTarget.blockedOn = targetInst;
          Scheduler.unstable_runWithPriority(queuedTarget.priority, function() {
            attemptHydrationAtCurrentPriority(nearestMounted);
          });
          return;
        }
      } else if (3 === targetInst && nearestMounted.stateNode.hydrate) {
        queuedTarget.blockedOn =
          3 === nearestMounted.tag
            ? nearestMounted.stateNode.containerInfo
            : null;
        return;
      }
  }
  queuedTarget.blockedOn = null;
}
function attemptReplayContinuousQueuedEvent(queuedEvent) {
  if (null !== queuedEvent.blockedOn) return !1;
  var nextBlockedOn = attemptToDispatchEvent(
    queuedEvent.topLevelType,
    queuedEvent.eventSystemFlags,
    queuedEvent.nativeEvent
  );
  if (null !== nextBlockedOn) {
    var _fiber3 = getInstanceFromNode$1(nextBlockedOn);
    null !== _fiber3 && attemptContinuousHydration(_fiber3);
    queuedEvent.blockedOn = nextBlockedOn;
    return !1;
  }
  return !0;
}
function attemptReplayContinuousQueuedEventInMap(queuedEvent, key, map) {
  attemptReplayContinuousQueuedEvent(queuedEvent) && map.delete(key);
}
function replayUnblockedEvents() {
  for (hasScheduledReplayAttempt = !1; 0 < queuedDiscreteEvents.length; ) {
    var nextDiscreteEvent = queuedDiscreteEvents[0];
    if (null !== nextDiscreteEvent.blockedOn) {
      nextDiscreteEvent = getInstanceFromNode$1(nextDiscreteEvent.blockedOn);
      null !== nextDiscreteEvent &&
        attemptUserBlockingHydration(nextDiscreteEvent);
      break;
    }
    var nextBlockedOn = attemptToDispatchEvent(
      nextDiscreteEvent.topLevelType,
      nextDiscreteEvent.eventSystemFlags,
      nextDiscreteEvent.nativeEvent
    );
    null !== nextBlockedOn
      ? (nextDiscreteEvent.blockedOn = nextBlockedOn)
      : queuedDiscreteEvents.shift();
  }
  null !== queuedFocus &&
    attemptReplayContinuousQueuedEvent(queuedFocus) &&
    (queuedFocus = null);
  null !== queuedDrag &&
    attemptReplayContinuousQueuedEvent(queuedDrag) &&
    (queuedDrag = null);
  null !== queuedMouse &&
    attemptReplayContinuousQueuedEvent(queuedMouse) &&
    (queuedMouse = null);
  queuedPointers.forEach(attemptReplayContinuousQueuedEventInMap);
  queuedPointerCaptures.forEach(attemptReplayContinuousQueuedEventInMap);
}
function scheduleCallbackIfUnblocked(queuedEvent, unblocked) {
  queuedEvent.blockedOn === unblocked &&
    ((queuedEvent.blockedOn = null),
    hasScheduledReplayAttempt ||
      ((hasScheduledReplayAttempt = !0),
      Scheduler.unstable_scheduleCallback(
        Scheduler.unstable_NormalPriority,
        replayUnblockedEvents
      )));
}
function retryIfBlockedOn(unblocked) {
  function unblock(queuedEvent) {
    return scheduleCallbackIfUnblocked(queuedEvent, unblocked);
  }
  if (0 < queuedDiscreteEvents.length) {
    scheduleCallbackIfUnblocked(queuedDiscreteEvents[0], unblocked);
    for (var i = 1; i < queuedDiscreteEvents.length; i++) {
      var queuedEvent$jscomp$0 = queuedDiscreteEvents[i];
      queuedEvent$jscomp$0.blockedOn === unblocked &&
        (queuedEvent$jscomp$0.blockedOn = null);
    }
  }
  null !== queuedFocus && scheduleCallbackIfUnblocked(queuedFocus, unblocked);
  null !== queuedDrag && scheduleCallbackIfUnblocked(queuedDrag, unblocked);
  null !== queuedMouse && scheduleCallbackIfUnblocked(queuedMouse, unblocked);
  queuedPointers.forEach(unblock);
  queuedPointerCaptures.forEach(unblock);
  for (i = 0; i < queuedExplicitHydrationTargets.length; i++)
    (queuedEvent$jscomp$0 = queuedExplicitHydrationTargets[i]),
      queuedEvent$jscomp$0.blockedOn === unblocked &&
        (queuedEvent$jscomp$0.blockedOn = null);
  for (
    ;
    0 < queuedExplicitHydrationTargets.length &&
    ((i = queuedExplicitHydrationTargets[0]), null === i.blockedOn);

  )
    attemptExplicitHydrationTarget(i),
      null === i.blockedOn && queuedExplicitHydrationTargets.shift();
}
var EventListenerWWW = require("EventListener");
function getEventTarget(nativeEvent) {
  nativeEvent = nativeEvent.target || nativeEvent.srcElement || window;
  nativeEvent.correspondingUseElement &&
    (nativeEvent = nativeEvent.correspondingUseElement);
  return 3 === nativeEvent.nodeType ? nativeEvent.parentNode : nativeEvent;
}
function getParent(inst) {
  do inst = inst.return;
  while (inst && 5 !== inst.tag);
  return inst ? inst : null;
}
function accumulateDirectionalDispatches(inst, phase, event) {
  if (
    (phase = getListener(
      inst,
      event.dispatchConfig.phasedRegistrationNames[phase]
    ))
  )
    (event._dispatchListeners = accumulateInto(
      event._dispatchListeners,
      phase
    )),
      (event._dispatchInstances = accumulateInto(
        event._dispatchInstances,
        inst
      ));
}
function accumulateTwoPhaseDispatchesSingle(event) {
  if (event && event.dispatchConfig.phasedRegistrationNames) {
    for (var inst = event._targetInst, path = []; inst; )
      path.push(inst), (inst = getParent(inst));
    for (inst = path.length; 0 < inst--; )
      accumulateDirectionalDispatches(path[inst], "captured", event);
    for (inst = 0; inst < path.length; inst++)
      accumulateDirectionalDispatches(path[inst], "bubbled", event);
  }
}
function accumulateDispatches(inst, ignoredDirection, event) {
  inst &&
    event &&
    event.dispatchConfig.registrationName &&
    (ignoredDirection = getListener(
      inst,
      event.dispatchConfig.registrationName
    )) &&
    ((event._dispatchListeners = accumulateInto(
      event._dispatchListeners,
      ignoredDirection
    )),
    (event._dispatchInstances = accumulateInto(
      event._dispatchInstances,
      inst
    )));
}
function accumulateDirectDispatchesSingle(event) {
  event &&
    event.dispatchConfig.registrationName &&
    accumulateDispatches(event._targetInst, null, event);
}
function accumulateTwoPhaseDispatches(events) {
  forEachAccumulated(events, accumulateTwoPhaseDispatchesSingle);
}
function functionThatReturnsTrue() {
  return !0;
}
function functionThatReturnsFalse() {
  return !1;
}
function SyntheticEvent(
  dispatchConfig,
  targetInst,
  nativeEvent,
  nativeEventTarget
) {
  this.dispatchConfig = dispatchConfig;
  this._targetInst = targetInst;
  this.nativeEvent = nativeEvent;
  dispatchConfig = this.constructor.Interface;
  for (var propName in dispatchConfig)
    dispatchConfig.hasOwnProperty(propName) &&
      ((targetInst = dispatchConfig[propName])
        ? (this[propName] = targetInst(nativeEvent))
        : "target" === propName
          ? (this.target = nativeEventTarget)
          : (this[propName] = nativeEvent[propName]));
  this.isDefaultPrevented = (null != nativeEvent.defaultPrevented
  ? nativeEvent.defaultPrevented
  : !1 === nativeEvent.returnValue)
    ? functionThatReturnsTrue
    : functionThatReturnsFalse;
  this.isPropagationStopped = functionThatReturnsFalse;
  return this;
}
Object.assign(SyntheticEvent.prototype, {
  preventDefault: function() {
    this.defaultPrevented = !0;
    var event = this.nativeEvent;
    event &&
      (event.preventDefault
        ? event.preventDefault()
        : "unknown" !== typeof event.returnValue && (event.returnValue = !1),
      (this.isDefaultPrevented = functionThatReturnsTrue));
  },
  stopPropagation: function() {
    var event = this.nativeEvent;
    event &&
      (event.stopPropagation
        ? event.stopPropagation()
        : "unknown" !== typeof event.cancelBubble && (event.cancelBubble = !0),
      (this.isPropagationStopped = functionThatReturnsTrue));
  },
  persist: function() {
    this.isPersistent = functionThatReturnsTrue;
  },
  isPersistent: functionThatReturnsFalse,
  destructor: function() {
    var Interface = this.constructor.Interface,
      propName;
    for (propName in Interface) this[propName] = null;
    this.nativeEvent = this._targetInst = this.dispatchConfig = null;
    this.isPropagationStopped = this.isDefaultPrevented = functionThatReturnsFalse;
    this._dispatchInstances = this._dispatchListeners = null;
  }
});
SyntheticEvent.Interface = {
  type: null,
  target: null,
  currentTarget: function() {
    return null;
  },
  eventPhase: null,
  bubbles: null,
  cancelable: null,
  timeStamp: function(event) {
    return event.timeStamp || Date.now();
  },
  defaultPrevented: null,
  isTrusted: null
};
SyntheticEvent.extend = function(Interface) {
  function E() {}
  function Class() {
    return Super.apply(this, arguments);
  }
  var Super = this;
  E.prototype = Super.prototype;
  var prototype = new E();
  Object.assign(prototype, Class.prototype);
  Class.prototype = prototype;
  Class.prototype.constructor = Class;
  Class.Interface = Object.assign({}, Super.Interface, Interface);
  Class.extend = Super.extend;
  addEventPoolingTo(Class);
  return Class;
};
addEventPoolingTo(SyntheticEvent);
function getPooledEvent(dispatchConfig, targetInst, nativeEvent, nativeInst) {
  if (this.eventPool.length) {
    var instance = this.eventPool.pop();
    this.call(instance, dispatchConfig, targetInst, nativeEvent, nativeInst);
    return instance;
  }
  return new this(dispatchConfig, targetInst, nativeEvent, nativeInst);
}
function releasePooledEvent(event) {
  if (!(event instanceof this)) throw Error(formatProdErrorMessage(279));
  event.destructor();
  10 > this.eventPool.length && this.eventPool.push(event);
}
function addEventPoolingTo(EventConstructor) {
  EventConstructor.eventPool = [];
  EventConstructor.getPooled = getPooledEvent;
  EventConstructor.release = releasePooledEvent;
}
var SyntheticAnimationEvent = SyntheticEvent.extend({
    animationName: null,
    elapsedTime: null,
    pseudoElement: null
  }),
  SyntheticClipboardEvent = SyntheticEvent.extend({
    clipboardData: function(event) {
      return "clipboardData" in event
        ? event.clipboardData
        : window.clipboardData;
    }
  }),
  SyntheticUIEvent = SyntheticEvent.extend({ view: null, detail: null }),
  SyntheticFocusEvent = SyntheticUIEvent.extend({ relatedTarget: null });
function getEventCharCode(nativeEvent) {
  var keyCode = nativeEvent.keyCode;
  "charCode" in nativeEvent
    ? ((nativeEvent = nativeEvent.charCode),
      0 === nativeEvent && 13 === keyCode && (nativeEvent = 13))
    : (nativeEvent = keyCode);
  10 === nativeEvent && (nativeEvent = 13);
  return 32 <= nativeEvent || 13 === nativeEvent ? nativeEvent : 0;
}
var normalizeKey = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  },
  translateToKey = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  },
  modifierKeyToProp = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
function modifierStateGetter(keyArg) {
  var nativeEvent = this.nativeEvent;
  return nativeEvent.getModifierState
    ? nativeEvent.getModifierState(keyArg)
    : (keyArg = modifierKeyToProp[keyArg])
      ? !!nativeEvent[keyArg]
      : !1;
}
function getEventModifierState() {
  return modifierStateGetter;
}
var SyntheticKeyboardEvent = SyntheticUIEvent.extend({
    key: function(nativeEvent) {
      if (nativeEvent.key) {
        var key = normalizeKey[nativeEvent.key] || nativeEvent.key;
        if ("Unidentified" !== key) return key;
      }
      return "keypress" === nativeEvent.type
        ? ((nativeEvent = getEventCharCode(nativeEvent)),
          13 === nativeEvent ? "Enter" : String.fromCharCode(nativeEvent))
        : "keydown" === nativeEvent.type || "keyup" === nativeEvent.type
          ? translateToKey[nativeEvent.keyCode] || "Unidentified"
          : "";
    },
    location: null,
    ctrlKey: null,
    shiftKey: null,
    altKey: null,
    metaKey: null,
    repeat: null,
    locale: null,
    getModifierState: getEventModifierState,
    charCode: function(event) {
      return "keypress" === event.type ? getEventCharCode(event) : 0;
    },
    keyCode: function(event) {
      return "keydown" === event.type || "keyup" === event.type
        ? event.keyCode
        : 0;
    },
    which: function(event) {
      return "keypress" === event.type
        ? getEventCharCode(event)
        : "keydown" === event.type || "keyup" === event.type
          ? event.keyCode
          : 0;
    }
  }),
  previousScreenX = 0,
  previousScreenY = 0,
  isMovementXSet = !1,
  isMovementYSet = !1,
  SyntheticMouseEvent = SyntheticUIEvent.extend({
    screenX: null,
    screenY: null,
    clientX: null,
    clientY: null,
    pageX: null,
    pageY: null,
    ctrlKey: null,
    shiftKey: null,
    altKey: null,
    metaKey: null,
    getModifierState: getEventModifierState,
    button: null,
    buttons: null,
    relatedTarget: function(event) {
      return (
        event.relatedTarget ||
        (event.fromElement === event.srcElement
          ? event.toElement
          : event.fromElement)
      );
    },
    movementX: function(event) {
      if ("movementX" in event) return event.movementX;
      var screenX = previousScreenX;
      previousScreenX = event.screenX;
      return isMovementXSet
        ? "mousemove" === event.type
          ? event.screenX - screenX
          : 0
        : ((isMovementXSet = !0), 0);
    },
    movementY: function(event) {
      if ("movementY" in event) return event.movementY;
      var screenY = previousScreenY;
      previousScreenY = event.screenY;
      return isMovementYSet
        ? "mousemove" === event.type
          ? event.screenY - screenY
          : 0
        : ((isMovementYSet = !0), 0);
    }
  }),
  SyntheticPointerEvent = SyntheticMouseEvent.extend({
    pointerId: null,
    width: null,
    height: null,
    pressure: null,
    tangentialPressure: null,
    tiltX: null,
    tiltY: null,
    twist: null,
    pointerType: null,
    isPrimary: null
  }),
  SyntheticDragEvent = SyntheticMouseEvent.extend({ dataTransfer: null }),
  SyntheticTouchEvent = SyntheticUIEvent.extend({
    touches: null,
    targetTouches: null,
    changedTouches: null,
    altKey: null,
    metaKey: null,
    ctrlKey: null,
    shiftKey: null,
    getModifierState: getEventModifierState
  }),
  SyntheticTransitionEvent = SyntheticEvent.extend({
    propertyName: null,
    elapsedTime: null,
    pseudoElement: null
  }),
  SyntheticWheelEvent = SyntheticMouseEvent.extend({
    deltaX: function(event) {
      return "deltaX" in event
        ? event.deltaX
        : "wheelDeltaX" in event
          ? -event.wheelDeltaX
          : 0;
    },
    deltaY: function(event) {
      return "deltaY" in event
        ? event.deltaY
        : "wheelDeltaY" in event
          ? -event.wheelDeltaY
          : "wheelDelta" in event
            ? -event.wheelDelta
            : 0;
    },
    deltaZ: null,
    deltaMode: null
  }),
  eventTuples = [
    ["blur", "blur", 0],
    ["cancel", "cancel", 0],
    ["click", "click", 0],
    ["close", "close", 0],
    ["contextmenu", "contextMenu", 0],
    ["copy", "copy", 0],
    ["cut", "cut", 0],
    ["auxclick", "auxClick", 0],
    ["dblclick", "doubleClick", 0],
    ["dragend", "dragEnd", 0],
    ["dragstart", "dragStart", 0],
    ["drop", "drop", 0],
    ["focus", "focus", 0],
    ["input", "input", 0],
    ["invalid", "invalid", 0],
    ["keydown", "keyDown", 0],
    ["keypress", "keyPress", 0],
    ["keyup", "keyUp", 0],
    ["mousedown", "mouseDown", 0],
    ["mouseup", "mouseUp", 0],
    ["paste", "paste", 0],
    ["pause", "pause", 0],
    ["play", "play", 0],
    ["pointercancel", "pointerCancel", 0],
    ["pointerdown", "pointerDown", 0],
    ["pointerup", "pointerUp", 0],
    ["ratechange", "rateChange", 0],
    ["reset", "reset", 0],
    ["seeked", "seeked", 0],
    ["submit", "submit", 0],
    ["touchcancel", "touchCancel", 0],
    ["touchend", "touchEnd", 0],
    ["touchstart", "touchStart", 0],
    ["volumechange", "volumeChange", 0],
    ["drag", "drag", 1],
    ["dragenter", "dragEnter", 1],
    ["dragexit", "dragExit", 1],
    ["dragleave", "dragLeave", 1],
    ["dragover", "dragOver", 1],
    ["mousemove", "mouseMove", 1],
    ["mouseout", "mouseOut", 1],
    ["mouseover", "mouseOver", 1],
    ["pointermove", "pointerMove", 1],
    ["pointerout", "pointerOut", 1],
    ["pointerover", "pointerOver", 1],
    ["scroll", "scroll", 1],
    ["toggle", "toggle", 1],
    ["touchmove", "touchMove", 1],
    ["wheel", "wheel", 1],
    ["abort", "abort", 2],
    [TOP_ANIMATION_END, "animationEnd", 2],
    [TOP_ANIMATION_ITERATION, "animationIteration", 2],
    [TOP_ANIMATION_START, "animationStart", 2],
    ["canplay", "canPlay", 2],
    ["canplaythrough", "canPlayThrough", 2],
    ["durationchange", "durationChange", 2],
    ["emptied", "emptied", 2],
    ["encrypted", "encrypted", 2],
    ["ended", "ended", 2],
    ["error", "error", 2],
    ["gotpointercapture", "gotPointerCapture", 2],
    ["load", "load", 2],
    ["loadeddata", "loadedData", 2],
    ["loadedmetadata", "loadedMetadata", 2],
    ["loadstart", "loadStart", 2],
    ["lostpointercapture", "lostPointerCapture", 2],
    ["playing", "playing", 2],
    ["progress", "progress", 2],
    ["seeking", "seeking", 2],
    ["stalled", "stalled", 2],
    ["suspend", "suspend", 2],
    ["timeupdate", "timeUpdate", 2],
    [TOP_TRANSITION_END, "transitionEnd", 2],
    ["waiting", "waiting", 2]
  ],
  eventTypes = {},
  topLevelEventsToDispatchConfig = {},
  i = 0;
for (; i < eventTuples.length; i++) {
  var eventTuple = eventTuples[i],
    topEvent = eventTuple[0],
    event = eventTuple[1],
    eventPriority = eventTuple[2],
    onEvent = "on" + (event[0].toUpperCase() + event.slice(1)),
    config = {
      phasedRegistrationNames: {
        bubbled: onEvent,
        captured: onEvent + "Capture"
      },
      dependencies: [topEvent],
      eventPriority: eventPriority
    };
  eventTypes[event] = config;
  topLevelEventsToDispatchConfig[topEvent] = config;
}
var SimpleEventPlugin = {
    eventTypes: eventTypes,
    getEventPriority: function(topLevelType) {
      topLevelType = topLevelEventsToDispatchConfig[topLevelType];
      return void 0 !== topLevelType ? topLevelType.eventPriority : 2;
    },
    extractEvents: function(
      topLevelType,
      targetInst,
      nativeEvent,
      nativeEventTarget
    ) {
      var dispatchConfig = topLevelEventsToDispatchConfig[topLevelType];
      if (!dispatchConfig) return null;
      switch (topLevelType) {
        case "keypress":
          if (0 === getEventCharCode(nativeEvent)) return null;
        case "keydown":
        case "keyup":
          topLevelType = SyntheticKeyboardEvent;
          break;
        case "blur":
        case "focus":
          topLevelType = SyntheticFocusEvent;
          break;
        case "click":
          if (2 === nativeEvent.button) return null;
        case "auxclick":
        case "dblclick":
        case "mousedown":
        case "mousemove":
        case "mouseup":
        case "mouseout":
        case "mouseover":
        case "contextmenu":
          topLevelType = SyntheticMouseEvent;
          break;
        case "drag":
        case "dragend":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "dragstart":
        case "drop":
          topLevelType = SyntheticDragEvent;
          break;
        case "touchcancel":
        case "touchend":
        case "touchmove":
        case "touchstart":
          topLevelType = SyntheticTouchEvent;
          break;
        case TOP_ANIMATION_END:
        case TOP_ANIMATION_ITERATION:
        case TOP_ANIMATION_START:
          topLevelType = SyntheticAnimationEvent;
          break;
        case TOP_TRANSITION_END:
          topLevelType = SyntheticTransitionEvent;
          break;
        case "scroll":
          topLevelType = SyntheticUIEvent;
          break;
        case "wheel":
          topLevelType = SyntheticWheelEvent;
          break;
        case "copy":
        case "cut":
        case "paste":
          topLevelType = SyntheticClipboardEvent;
          break;
        case "gotpointercapture":
        case "lostpointercapture":
        case "pointercancel":
        case "pointerdown":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "pointerup":
          topLevelType = SyntheticPointerEvent;
          break;
        default:
          topLevelType = SyntheticEvent;
      }
      targetInst = topLevelType.getPooled(
        dispatchConfig,
        targetInst,
        nativeEvent,
        nativeEventTarget
      );
      accumulateTwoPhaseDispatches(targetInst);
      return targetInst;
    }
  },
  passiveBrowserEventsSupported = !1;
if (canUseDOM)
  try {
    var options = {};
    Object.defineProperty(options, "passive", {
      get: function() {
        passiveBrowserEventsSupported = !0;
      }
    });
    window.addEventListener("test", options, options);
    window.removeEventListener("test", options, options);
  } catch (e) {
    passiveBrowserEventsSupported = !1;
  }
var UserBlockingPriority$2 = Scheduler.unstable_UserBlockingPriority,
  runWithPriority$2 = Scheduler.unstable_runWithPriority,
  getEventPriority = SimpleEventPlugin.getEventPriority,
  CALLBACK_BOOKKEEPING_POOL_SIZE = 10,
  callbackBookkeepingPool = [];
function handleTopLevel(bookKeeping) {
  var targetInst = bookKeeping.targetInst,
    ancestor = targetInst;
  do {
    if (!ancestor) {
      bookKeeping.ancestors.push(ancestor);
      break;
    }
    var root = ancestor;
    if (3 === root.tag) root = root.stateNode.containerInfo;
    else {
      for (; root.return; ) root = root.return;
      root = 3 !== root.tag ? null : root.stateNode.containerInfo;
    }
    if (!root) break;
    targetInst = ancestor.tag;
    (5 !== targetInst && 6 !== targetInst) ||
      bookKeeping.ancestors.push(ancestor);
    ancestor = getClosestInstanceFromNode(root);
  } while (ancestor);
  for (ancestor = 0; ancestor < bookKeeping.ancestors.length; ancestor++) {
    targetInst = bookKeeping.ancestors[ancestor];
    var eventTarget = getEventTarget(bookKeeping.nativeEvent);
    root = bookKeeping.topLevelType;
    for (
      var nativeEvent = bookKeeping.nativeEvent,
        eventSystemFlags = bookKeeping.eventSystemFlags,
        events = null,
        i = 0;
      i < plugins.length;
      i++
    ) {
      var possiblePlugin = plugins[i];
      possiblePlugin &&
        (possiblePlugin = possiblePlugin.extractEvents(
          root,
          targetInst,
          nativeEvent,
          eventTarget,
          eventSystemFlags
        )) &&
        (events = accumulateInto(events, possiblePlugin));
    }
    runEventsInBatch(events);
  }
}
var _enabled = !0;
function trapBubbledEvent(topLevelType, element) {
  trapEventForPluginEventSystem(element, topLevelType, !1);
}
function trapEventForResponderEventSystem(element, topLevelType, passive) {
  var eventFlags = 2;
  passive
    ? passiveBrowserEventsSupported
      ? (eventFlags |= 4)
      : ((eventFlags |= 24), (passive = !1))
    : (eventFlags |= 8);
  eventFlags = dispatchEvent.bind(null, topLevelType, eventFlags);
  passiveBrowserEventsSupported
    ? EventListenerWWW.captureWithPassiveFlag(
        element,
        topLevelType,
        eventFlags,
        passive
      )
    : EventListenerWWW.capture(element, topLevelType, eventFlags);
}
function trapEventForPluginEventSystem(element, topLevelType, capture) {
  switch (getEventPriority(topLevelType)) {
    case 0:
      var listener = dispatchDiscreteEvent.bind(null, topLevelType, 1);
      break;
    case 1:
      listener = dispatchUserBlockingUpdate.bind(null, topLevelType, 1);
      break;
    default:
      listener = dispatchEvent.bind(null, topLevelType, 1);
  }
  capture
    ? EventListenerWWW.capture(element, topLevelType, listener)
    : EventListenerWWW.listen(element, topLevelType, listener);
}
function dispatchDiscreteEvent(topLevelType, eventSystemFlags, nativeEvent) {
  flushDiscreteUpdatesIfNeeded(nativeEvent.timeStamp);
  discreteUpdates$1(dispatchEvent, topLevelType, eventSystemFlags, nativeEvent);
}
function dispatchUserBlockingUpdate(
  topLevelType,
  eventSystemFlags,
  nativeEvent
) {
  runWithPriority$2(
    UserBlockingPriority$2,
    dispatchEvent.bind(null, topLevelType, eventSystemFlags, nativeEvent)
  );
}
function dispatchEventForPluginEventSystem(
  topLevelType,
  eventSystemFlags,
  nativeEvent,
  targetInst
) {
  if (callbackBookkeepingPool.length) {
    var instance = callbackBookkeepingPool.pop();
    instance.topLevelType = topLevelType;
    instance.eventSystemFlags = eventSystemFlags;
    instance.nativeEvent = nativeEvent;
    instance.targetInst = targetInst;
    topLevelType = instance;
  } else
    topLevelType = {
      topLevelType: topLevelType,
      eventSystemFlags: eventSystemFlags,
      nativeEvent: nativeEvent,
      targetInst: targetInst,
      ancestors: []
    };
  try {
    batchedEventUpdates$1(handleTopLevel, topLevelType);
  } finally {
    (topLevelType.topLevelType = null),
      (topLevelType.nativeEvent = null),
      (topLevelType.targetInst = null),
      (topLevelType.ancestors.length = 0),
      callbackBookkeepingPool.length < CALLBACK_BOOKKEEPING_POOL_SIZE &&
        callbackBookkeepingPool.push(topLevelType);
  }
}
function dispatchEvent(topLevelType, eventSystemFlags, nativeEvent) {
  if (_enabled)
    if (
      0 < queuedDiscreteEvents.length &&
      -1 < discreteReplayableEvents.indexOf(topLevelType)
    )
      queueDiscreteEvent(null, topLevelType, eventSystemFlags, nativeEvent);
    else {
      var blockedOn = attemptToDispatchEvent(
        topLevelType,
        eventSystemFlags,
        nativeEvent
      );
      null === blockedOn
        ? clearIfContinuousEvent(topLevelType, nativeEvent)
        : -1 < discreteReplayableEvents.indexOf(topLevelType)
          ? queueDiscreteEvent(
              blockedOn,
              topLevelType,
              eventSystemFlags,
              nativeEvent
            )
          : queueIfContinuousEvent(
              blockedOn,
              topLevelType,
              eventSystemFlags,
              nativeEvent
            ) ||
            (clearIfContinuousEvent(topLevelType, nativeEvent),
            eventSystemFlags & 1 &&
              dispatchEventForPluginEventSystem(
                topLevelType,
                eventSystemFlags,
                nativeEvent,
                null
              ),
            eventSystemFlags & 2 &&
              dispatchEventForResponderEventSystem(
                topLevelType,
                null,
                nativeEvent,
                getEventTarget(nativeEvent),
                eventSystemFlags
              ));
    }
}
function attemptToDispatchEvent(topLevelType, eventSystemFlags, nativeEvent) {
  var nativeEventTarget = getEventTarget(nativeEvent),
    targetInst = getClosestInstanceFromNode(nativeEventTarget);
  if (null !== targetInst) {
    var nearestMounted = getNearestMountedFiber(targetInst);
    if (null === nearestMounted) targetInst = null;
    else {
      var tag = nearestMounted.tag;
      if (13 === tag) {
        targetInst = getSuspenseInstanceFromFiber(nearestMounted);
        if (null !== targetInst) return targetInst;
        targetInst = null;
      } else if (3 === tag) {
        if (nearestMounted.stateNode.hydrate)
          return 3 === nearestMounted.tag
            ? nearestMounted.stateNode.containerInfo
            : null;
        targetInst = null;
      } else nearestMounted !== targetInst && (targetInst = null);
    }
  }
  eventSystemFlags & 1 &&
    dispatchEventForPluginEventSystem(
      topLevelType,
      eventSystemFlags,
      nativeEvent,
      targetInst
    );
  eventSystemFlags & 2 &&
    dispatchEventForResponderEventSystem(
      topLevelType,
      targetInst,
      nativeEvent,
      nativeEventTarget,
      eventSystemFlags
    );
  return null;
}
function isEventSupported(eventNameSuffix) {
  if (!canUseDOM) return !1;
  eventNameSuffix = "on" + eventNameSuffix;
  var isSupported = eventNameSuffix in document;
  isSupported ||
    ((isSupported = document.createElement("div")),
    isSupported.setAttribute(eventNameSuffix, "return;"),
    (isSupported = "function" === typeof isSupported[eventNameSuffix]));
  return isSupported;
}
var elementListeningSets = new ("function" === typeof WeakMap
  ? WeakMap
  : Map)();
function getListeningSetForElement(element) {
  var listeningSet = elementListeningSets.get(element);
  void 0 === listeningSet &&
    ((listeningSet = new Set()),
    elementListeningSets.set(element, listeningSet));
  return listeningSet;
}
function listenToTopLevel(topLevelType, mountAt, listeningSet) {
  if (!listeningSet.has(topLevelType)) {
    switch (topLevelType) {
      case "scroll":
        trapEventForPluginEventSystem(mountAt, "scroll", !0);
        break;
      case "focus":
      case "blur":
        trapEventForPluginEventSystem(mountAt, "focus", !0);
        trapEventForPluginEventSystem(mountAt, "blur", !0);
        listeningSet.add("blur");
        listeningSet.add("focus");
        break;
      case "cancel":
      case "close":
        isEventSupported(topLevelType) &&
          trapEventForPluginEventSystem(mountAt, topLevelType, !0);
        break;
      case "invalid":
      case "submit":
      case "reset":
        break;
      default:
        -1 === mediaEventTypes.indexOf(topLevelType) &&
          trapBubbledEvent(topLevelType, mountAt);
    }
    listeningSet.add(topLevelType);
  }
}
var isUnitlessNumber = {
    animationIterationCount: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  },
  prefixes = ["Webkit", "ms", "Moz", "O"];
Object.keys(isUnitlessNumber).forEach(function(prop) {
  prefixes.forEach(function(prefix) {
    prefix = prefix + prop.charAt(0).toUpperCase() + prop.substring(1);
    isUnitlessNumber[prefix] = isUnitlessNumber[prop];
  });
});
function dangerousStyleValue(name, value, isCustomProperty) {
  return null == value || "boolean" === typeof value || "" === value
    ? ""
    : isCustomProperty ||
      "number" !== typeof value ||
      0 === value ||
      (isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name])
      ? ("" + value).trim()
      : value + "px";
}
function setValueForStyles(node, styles) {
  node = node.style;
  for (var styleName in styles)
    if (styles.hasOwnProperty(styleName)) {
      var isCustomProperty = 0 === styleName.indexOf("--"),
        styleValue = dangerousStyleValue(
          styleName,
          styles[styleName],
          isCustomProperty
        );
      "float" === styleName && (styleName = "cssFloat");
      isCustomProperty
        ? node.setProperty(styleName, styleValue)
        : (node[styleName] = styleValue);
    }
}
var voidElementTags = Object.assign(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0
  }
);
function assertValidProps(tag, props) {
  if (props) {
    if (
      voidElementTags[tag] &&
      (null != props.children || null != props.dangerouslySetInnerHTML)
    )
      throw Error(formatProdErrorMessage(137, tag, ""));
    if (null != props.dangerouslySetInnerHTML) {
      if (null != props.children) throw Error(formatProdErrorMessage(60));
      if (
        !(
          "object" === typeof props.dangerouslySetInnerHTML &&
          "__html" in props.dangerouslySetInnerHTML
        )
      )
        throw Error(formatProdErrorMessage(61));
    }
    if (null != props.style && "object" !== typeof props.style)
      throw Error(formatProdErrorMessage(62, ""));
  }
}
function isCustomComponent(tagName, props) {
  if (-1 === tagName.indexOf("-")) return "string" === typeof props.is;
  switch (tagName) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
function ensureListeningTo(rootContainerElement, registrationName) {
  rootContainerElement =
    9 === rootContainerElement.nodeType || 11 === rootContainerElement.nodeType
      ? rootContainerElement
      : rootContainerElement.ownerDocument;
  var listeningSet = getListeningSetForElement(rootContainerElement);
  registrationName = registrationNameDependencies[registrationName];
  for (var i = 0; i < registrationName.length; i++)
    listenToTopLevel(registrationName[i], rootContainerElement, listeningSet);
}
function noop() {}
function listenToEventResponderEventTypes(eventTypes, element) {
  for (
    var listeningSet = getListeningSetForElement(element),
      i = 0,
      length = eventTypes.length;
    i < length;
    ++i
  ) {
    var eventType = eventTypes[i],
      length$jscomp$0 = eventType.length,
      eventKey = (length$jscomp$0 =
        "_active" !== eventType.substring(length$jscomp$0 - 7, length$jscomp$0))
        ? eventType + "_passive"
        : eventType;
    eventType = length$jscomp$0
      ? eventType
      : eventType.substring(0, eventType.length - 7);
    listeningSet.has(eventKey) ||
      (trapEventForResponderEventSystem(element, eventType, length$jscomp$0),
      listeningSet.add(eventKey));
  }
}
listenToResponderEventTypesImpl = listenToEventResponderEventTypes;
function getActiveElement(doc) {
  doc = doc || ("undefined" !== typeof document ? document : void 0);
  if ("undefined" === typeof doc) return null;
  try {
    return doc.activeElement || doc.body;
  } catch (e) {
    return doc.body;
  }
}
function getLeafNode(node) {
  for (; node && node.firstChild; ) node = node.firstChild;
  return node;
}
function getNodeForCharacterOffset(root, offset) {
  var node = getLeafNode(root);
  root = 0;
  for (var nodeEnd; node; ) {
    if (3 === node.nodeType) {
      nodeEnd = root + node.textContent.length;
      if (root <= offset && nodeEnd >= offset)
        return { node: node, offset: offset - root };
      root = nodeEnd;
    }
    a: {
      for (; node; ) {
        if (node.nextSibling) {
          node = node.nextSibling;
          break a;
        }
        node = node.parentNode;
      }
      node = void 0;
    }
    node = getLeafNode(node);
  }
}
function containsNode(outerNode, innerNode) {
  return outerNode && innerNode
    ? outerNode === innerNode
      ? !0
      : outerNode && 3 === outerNode.nodeType
        ? !1
        : innerNode && 3 === innerNode.nodeType
          ? containsNode(outerNode, innerNode.parentNode)
          : "contains" in outerNode
            ? outerNode.contains(innerNode)
            : outerNode.compareDocumentPosition
              ? !!(outerNode.compareDocumentPosition(innerNode) & 16)
              : !1
    : !1;
}
function getActiveElementDeep() {
  for (
    var win = window, element = getActiveElement();
    element instanceof win.HTMLIFrameElement;

  ) {
    try {
      var JSCompiler_inline_result =
        "string" === typeof element.contentWindow.location.href;
    } catch (err) {
      JSCompiler_inline_result = !1;
    }
    if (JSCompiler_inline_result) win = element.contentWindow;
    else break;
    element = getActiveElement(win.document);
  }
  return element;
}
function hasSelectionCapabilities(elem) {
  var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
  return (
    nodeName &&
    (("input" === nodeName &&
      ("text" === elem.type ||
        "search" === elem.type ||
        "tel" === elem.type ||
        "url" === elem.type ||
        "password" === elem.type)) ||
      "textarea" === nodeName ||
      "true" === elem.contentEditable)
  );
}
var SUSPENSE_START_DATA = "$",
  SUSPENSE_END_DATA = "/$",
  SUSPENSE_PENDING_START_DATA = "$?",
  SUSPENSE_FALLBACK_START_DATA = "$!",
  eventsEnabled = null,
  selectionInformation = null;
function shouldAutoFocusHostComponent(type, props) {
  switch (type) {
    case "button":
    case "input":
    case "select":
    case "textarea":
      return !!props.autoFocus;
  }
  return !1;
}
function shouldSetTextContent(type, props) {
  return (
    "textarea" === type ||
    "option" === type ||
    "noscript" === type ||
    "string" === typeof props.children ||
    "number" === typeof props.children ||
    ("object" === typeof props.dangerouslySetInnerHTML &&
      null !== props.dangerouslySetInnerHTML &&
      null != props.dangerouslySetInnerHTML.__html)
  );
}
var scheduleTimeout = "function" === typeof setTimeout ? setTimeout : void 0,
  cancelTimeout = "function" === typeof clearTimeout ? clearTimeout : void 0;
function beforeRemoveInstance(instance) {
  if (selectionInformation && instance === selectionInformation.focusedElem) {
    var targetInstance = getClosestInstanceFromNode(instance);
    selectionInformation.activeElementDetached = instance;
    dispatchEventForResponderEventSystem(
      "beforeblur",
      targetInstance,
      { target: instance, timeStamp: Date.now() },
      instance,
      6
    );
  }
}
function clearSuspenseBoundary(parentInstance, suspenseInstance) {
  var node = suspenseInstance,
    depth = 0;
  do {
    var nextNode = node.nextSibling;
    parentInstance.removeChild(node);
    if (nextNode && nextNode.nodeType === COMMENT_NODE)
      if (((node = nextNode.data), node === SUSPENSE_END_DATA)) {
        if (0 === depth) {
          parentInstance.removeChild(nextNode);
          retryIfBlockedOn(suspenseInstance);
          return;
        }
        depth--;
      } else
        (node !== SUSPENSE_START_DATA &&
          node !== SUSPENSE_PENDING_START_DATA &&
          node !== SUSPENSE_FALLBACK_START_DATA) ||
          depth++;
    node = nextNode;
  } while (node);
  retryIfBlockedOn(suspenseInstance);
}
function getNextHydratable(node) {
  for (; null != node; node = node.nextSibling) {
    var nodeType = node.nodeType;
    if (1 === nodeType || 3 === nodeType) break;
    if (
      nodeType === COMMENT_NODE &&
      ((nodeType = node.data),
      nodeType === SUSPENSE_START_DATA ||
        nodeType === SUSPENSE_FALLBACK_START_DATA ||
        nodeType === SUSPENSE_PENDING_START_DATA)
    )
      break;
  }
  return node;
}
function getParentSuspenseInstance(targetInstance) {
  targetInstance = targetInstance.previousSibling;
  for (var depth = 0; targetInstance; ) {
    if (targetInstance.nodeType === COMMENT_NODE) {
      var data = targetInstance.data;
      if (
        data === SUSPENSE_START_DATA ||
        data === SUSPENSE_FALLBACK_START_DATA ||
        data === SUSPENSE_PENDING_START_DATA
      ) {
        if (0 === depth) return targetInstance;
        depth--;
      } else data === SUSPENSE_END_DATA && depth++;
    }
    targetInstance = targetInstance.previousSibling;
  }
  return null;
}
var ContinuousHydration = 3;
function computeExpirationBucket(currentTime, expirationInMs, bucketSizeMs) {
  bucketSizeMs /= 10;
  return (
    1073741821 -
    ((((1073741821 - currentTime + expirationInMs / 10) / bucketSizeMs) | 0) +
      1) *
      bucketSizeMs
  );
}
function inferPriorityFromExpirationTime(currentTime, expirationTime) {
  if (1073741823 === expirationTime) return 99;
  if (1 === expirationTime || 2 === expirationTime) return 95;
  currentTime =
    10 * (1073741821 - expirationTime) - 10 * (1073741821 - currentTime);
  return 0 >= currentTime
    ? 99
    : 250 >= currentTime
      ? 98
      : 5250 >= currentTime
        ? 97
        : 95;
}
function FiberRootNode(containerInfo, tag, hydrate) {
  this.tag = tag;
  this.current = null;
  this.containerInfo = containerInfo;
  this.pingCache = this.pendingChildren = null;
  this.finishedExpirationTime = 0;
  this.finishedWork = null;
  this.timeoutHandle = -1;
  this.pendingContext = this.context = null;
  this.hydrate = hydrate;
  this.callbackNode = null;
  this.callbackPriority = 90;
  this.lastExpiredTime = this.lastPingedTime = this.nextKnownPendingLevel = this.lastSuspendedTime = this.firstSuspendedTime = this.firstPendingTime = 0;
  this.interactionThreadID = tracing.unstable_getThreadID();
  this.memoizedInteractions = new Set();
  this.pendingInteractionMap = new Map();
  this.hydrationCallbacks = null;
}
function isRootSuspendedAtTime(root, expirationTime) {
  var firstSuspendedTime = root.firstSuspendedTime;
  root = root.lastSuspendedTime;
  return (
    0 !== firstSuspendedTime &&
    firstSuspendedTime >= expirationTime &&
    root <= expirationTime
  );
}
function markRootSuspendedAtTime(root, expirationTime) {
  var firstSuspendedTime = root.firstSuspendedTime,
    lastSuspendedTime = root.lastSuspendedTime;
  firstSuspendedTime < expirationTime &&
    (root.firstSuspendedTime = expirationTime);
  if (lastSuspendedTime > expirationTime || 0 === firstSuspendedTime)
    root.lastSuspendedTime = expirationTime;
  expirationTime <= root.lastPingedTime && (root.lastPingedTime = 0);
  expirationTime <= root.lastExpiredTime && (root.lastExpiredTime = 0);
}
function markRootUpdatedAtTime(root, expirationTime) {
  expirationTime > root.firstPendingTime &&
    (root.firstPendingTime = expirationTime);
  var firstSuspendedTime = root.firstSuspendedTime;
  0 !== firstSuspendedTime &&
    (expirationTime >= firstSuspendedTime
      ? (root.firstSuspendedTime = root.lastSuspendedTime = root.nextKnownPendingLevel = 0)
      : expirationTime >= root.lastSuspendedTime &&
        (root.lastSuspendedTime = expirationTime + 1),
    expirationTime > root.nextKnownPendingLevel &&
      (root.nextKnownPendingLevel = expirationTime));
}
function markRootExpiredAtTime(root, expirationTime) {
  var lastExpiredTime = root.lastExpiredTime;
  if (0 === lastExpiredTime || lastExpiredTime > expirationTime)
    root.lastExpiredTime = expirationTime;
}
function is(x, y) {
  return (x === y && (0 !== x || 1 / x === 1 / y)) || (x !== x && y !== y);
}
var is$1 = "function" === typeof Object.is ? Object.is : is,
  hasOwnProperty$2 = Object.prototype.hasOwnProperty;
function shallowEqual(objA, objB) {
  if (is$1(objA, objB)) return !0;
  if (
    "object" !== typeof objA ||
    null === objA ||
    "object" !== typeof objB ||
    null === objB
  )
    return !1;
  var keysA = Object.keys(objA),
    keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return !1;
  for (keysB = 0; keysB < keysA.length; keysB++)
    if (
      !hasOwnProperty$2.call(objB, keysA[keysB]) ||
      !is$1(objA[keysA[keysB]], objB[keysA[keysB]])
    )
      return !1;
  return !0;
}
var lowPriorityWarningWithoutStack = require("lowPriorityWarning"),
  supportsUserTiming =
    "undefined" !== typeof performance &&
    "function" === typeof performance.mark &&
    "function" === typeof performance.clearMarks &&
    "function" === typeof performance.measure &&
    "function" === typeof performance.clearMeasures,
  currentFiber = null,
  currentPhase = null,
  currentPhaseFiber = null,
  isCommitting = !1,
  hasScheduledUpdateInCurrentCommit = !1,
  hasScheduledUpdateInCurrentPhase = !1,
  commitCountInCurrentWorkLoop = 0,
  effectCountInCurrentCommit = 0,
  labelsInCurrentCommit = new Set();
function beginMark(markName) {
  performance.mark("\u269b " + markName);
}
function endMark(label, markName, warning) {
  markName = "\u269b " + markName;
  label =
    (warning ? "\u26d4 " : "\u269b ") +
    label +
    (warning ? " Warning: " + warning : "");
  try {
    performance.measure(label, markName);
  } catch (err) {}
  performance.clearMarks(markName);
  performance.clearMeasures(label);
}
function getFiberLabel(componentName, isMounted, phase) {
  return null === phase
    ? componentName + " [" + (isMounted ? "update" : "mount") + "]"
    : componentName + "." + phase;
}
function beginFiberMark(fiber, phase) {
  var componentName = getComponentName(fiber.type) || "Unknown",
    debugID = fiber._debugID;
  fiber = getFiberLabel(componentName, null !== fiber.alternate, phase);
  if (isCommitting && labelsInCurrentCommit.has(fiber)) return !1;
  labelsInCurrentCommit.add(fiber);
  beginMark(fiber + " (#" + debugID + ")");
  return !0;
}
function clearFiberMark(fiber, phase) {
  var componentName = getComponentName(fiber.type) || "Unknown",
    debugID = fiber._debugID;
  fiber =
    getFiberLabel(componentName, null !== fiber.alternate, phase) +
    " (#" +
    debugID +
    ")";
  performance.clearMarks("\u269b " + fiber);
}
function endFiberMark(fiber, phase, warning) {
  var componentName = getComponentName(fiber.type) || "Unknown",
    debugID = fiber._debugID;
  fiber = getFiberLabel(componentName, null !== fiber.alternate, phase);
  endMark(fiber, fiber + " (#" + debugID + ")", warning);
}
function shouldIgnoreFiber(fiber) {
  switch (fiber.tag) {
    case 3:
    case 5:
    case 6:
    case 4:
    case 7:
    case 10:
    case 9:
    case 8:
      return !0;
    default:
      return !1;
  }
}
function resumeTimersRecursively(fiber) {
  null !== fiber.return && resumeTimersRecursively(fiber.return);
  fiber._debugIsCurrentlyTiming && beginFiberMark(fiber, null);
}
function startWorkTimer(fiber) {
  enableUserTimingAPI &&
    supportsUserTiming &&
    !shouldIgnoreFiber(fiber) &&
    ((currentFiber = fiber),
    beginFiberMark(fiber, null) && (fiber._debugIsCurrentlyTiming = !0));
}
function cancelWorkTimer(fiber) {
  enableUserTimingAPI &&
    supportsUserTiming &&
    !shouldIgnoreFiber(fiber) &&
    ((fiber._debugIsCurrentlyTiming = !1), clearFiberMark(fiber, null));
}
function stopWorkTimer(fiber) {
  enableUserTimingAPI &&
    supportsUserTiming &&
    !shouldIgnoreFiber(fiber) &&
    ((currentFiber = fiber.return),
    fiber._debugIsCurrentlyTiming &&
      ((fiber._debugIsCurrentlyTiming = !1), endFiberMark(fiber, null, null)));
}
function startPhaseTimer(fiber, phase) {
  enableUserTimingAPI &&
    supportsUserTiming &&
    (null !== currentPhase &&
      null !== currentPhaseFiber &&
      clearFiberMark(currentPhaseFiber, currentPhase),
    (currentPhase = currentPhaseFiber = null),
    (hasScheduledUpdateInCurrentPhase = !1),
    beginFiberMark(fiber, phase) &&
      ((currentPhaseFiber = fiber), (currentPhase = phase)));
}
function stopPhaseTimer() {
  enableUserTimingAPI &&
    supportsUserTiming &&
    (null !== currentPhase &&
      null !== currentPhaseFiber &&
      endFiberMark(
        currentPhaseFiber,
        currentPhase,
        hasScheduledUpdateInCurrentPhase ? "Scheduled a cascading update" : null
      ),
    (currentPhaseFiber = currentPhase = null));
}
function startWorkLoopTimer(nextUnitOfWork) {
  enableUserTimingAPI &&
    ((currentFiber = nextUnitOfWork),
    supportsUserTiming &&
      ((commitCountInCurrentWorkLoop = 0),
      beginMark("(React Tree Reconciliation)"),
      null !== currentFiber && resumeTimersRecursively(currentFiber)));
}
function stopWorkLoopTimer(interruptedBy, didCompleteRoot) {
  if (enableUserTimingAPI && supportsUserTiming) {
    var warning = null;
    null !== interruptedBy
      ? (warning =
          3 === interruptedBy.tag
            ? "A top-level update interrupted the previous render"
            : "An update to " +
              (getComponentName(interruptedBy.type) || "Unknown") +
              " interrupted the previous render")
      : 1 < commitCountInCurrentWorkLoop &&
        (warning = "There were cascading updates");
    commitCountInCurrentWorkLoop = 0;
    interruptedBy = didCompleteRoot
      ? "(React Tree Reconciliation: Completed Root)"
      : "(React Tree Reconciliation: Yielded)";
    for (didCompleteRoot = currentFiber; didCompleteRoot; )
      didCompleteRoot._debugIsCurrentlyTiming &&
        endFiberMark(didCompleteRoot, null, null),
        (didCompleteRoot = didCompleteRoot.return);
    endMark(interruptedBy, "(React Tree Reconciliation)", warning);
  }
}
function startCommitSnapshotEffectsTimer() {
  enableUserTimingAPI &&
    supportsUserTiming &&
    ((effectCountInCurrentCommit = 0),
    beginMark("(Committing Snapshot Effects)"));
}
function stopCommitSnapshotEffectsTimer() {
  if (enableUserTimingAPI && supportsUserTiming) {
    var count = effectCountInCurrentCommit;
    effectCountInCurrentCommit = 0;
    endMark(
      "(Committing Snapshot Effects: " + count + " Total)",
      "(Committing Snapshot Effects)",
      null
    );
  }
}
function startCommitHostEffectsTimer() {
  enableUserTimingAPI &&
    supportsUserTiming &&
    ((effectCountInCurrentCommit = 0), beginMark("(Committing Host Effects)"));
}
function stopCommitHostEffectsTimer() {
  if (enableUserTimingAPI && supportsUserTiming) {
    var count = effectCountInCurrentCommit;
    effectCountInCurrentCommit = 0;
    endMark(
      "(Committing Host Effects: " + count + " Total)",
      "(Committing Host Effects)",
      null
    );
  }
}
function startCommitLifeCyclesTimer() {
  enableUserTimingAPI &&
    supportsUserTiming &&
    ((effectCountInCurrentCommit = 0),
    beginMark("(Calling Lifecycle Methods)"));
}
function stopCommitLifeCyclesTimer() {
  if (enableUserTimingAPI && supportsUserTiming) {
    var count = effectCountInCurrentCommit;
    effectCountInCurrentCommit = 0;
    endMark(
      "(Calling Lifecycle Methods: " + count + " Total)",
      "(Calling Lifecycle Methods)",
      null
    );
  }
}
var valueStack = [],
  index = -1;
function pop(cursor) {
  0 > index ||
    ((cursor.current = valueStack[index]), (valueStack[index] = null), index--);
}
function push(cursor, value) {
  index++;
  valueStack[index] = cursor.current;
  cursor.current = value;
}
var emptyContextObject = {},
  contextStackCursor = { current: emptyContextObject },
  didPerformWorkStackCursor = { current: !1 },
  previousContext = emptyContextObject;
function getMaskedContext(workInProgress, unmaskedContext) {
  var contextTypes = workInProgress.type.contextTypes;
  if (!contextTypes) return emptyContextObject;
  var instance = workInProgress.stateNode;
  if (
    instance &&
    instance.__reactInternalMemoizedUnmaskedChildContext === unmaskedContext
  )
    return instance.__reactInternalMemoizedMaskedChildContext;
  var context = {},
    key;
  for (key in contextTypes) context[key] = unmaskedContext[key];
  instance &&
    ((workInProgress = workInProgress.stateNode),
    (workInProgress.__reactInternalMemoizedUnmaskedChildContext = unmaskedContext),
    (workInProgress.__reactInternalMemoizedMaskedChildContext = context));
  return context;
}
function isContextProvider(type) {
  type = type.childContextTypes;
  return null !== type && void 0 !== type;
}
function popContext(fiber) {
  pop(didPerformWorkStackCursor, fiber);
  pop(contextStackCursor, fiber);
}
function popTopLevelContextObject(fiber) {
  pop(didPerformWorkStackCursor, fiber);
  pop(contextStackCursor, fiber);
}
function pushTopLevelContextObject(fiber, context, didChange) {
  if (contextStackCursor.current !== emptyContextObject)
    throw Error(formatProdErrorMessage(168));
  push(contextStackCursor, context, fiber);
  push(didPerformWorkStackCursor, didChange, fiber);
}
function processChildContext(fiber, type, parentContext) {
  var instance = fiber.stateNode,
    childContextTypes = type.childContextTypes;
  if ("function" !== typeof instance.getChildContext) return parentContext;
  startPhaseTimer(fiber, "getChildContext");
  fiber = instance.getChildContext();
  stopPhaseTimer();
  for (var contextKey in fiber)
    if (!(contextKey in childContextTypes))
      throw Error(
        formatProdErrorMessage(
          108,
          getComponentName(type) || "Unknown",
          contextKey
        )
      );
  return Object.assign({}, parentContext, {}, fiber);
}
function pushContextProvider(workInProgress) {
  var instance = workInProgress.stateNode;
  instance =
    (instance && instance.__reactInternalMemoizedMergedChildContext) ||
    emptyContextObject;
  previousContext = contextStackCursor.current;
  push(contextStackCursor, instance, workInProgress);
  push(
    didPerformWorkStackCursor,
    didPerformWorkStackCursor.current,
    workInProgress
  );
  return !0;
}
function invalidateContextProvider(workInProgress, type, didChange) {
  var instance = workInProgress.stateNode;
  if (!instance) throw Error(formatProdErrorMessage(169));
  didChange
    ? ((type = processChildContext(workInProgress, type, previousContext)),
      (instance.__reactInternalMemoizedMergedChildContext = type),
      pop(didPerformWorkStackCursor, workInProgress),
      pop(contextStackCursor, workInProgress),
      push(contextStackCursor, type, workInProgress))
    : pop(didPerformWorkStackCursor, workInProgress);
  push(didPerformWorkStackCursor, didChange, workInProgress);
}
var valueCursor = { current: null },
  currentlyRenderingFiber = null,
  lastContextDependency = null,
  lastContextWithAllBitsObserved = null;
function resetContextDependencies() {
  lastContextWithAllBitsObserved = lastContextDependency = currentlyRenderingFiber = null;
}
function pushProvider(providerFiber, nextValue) {
  var context = providerFiber.type._context;
  push(valueCursor, context._currentValue, providerFiber);
  context._currentValue = nextValue;
}
function popProvider(providerFiber) {
  var currentValue = valueCursor.current;
  pop(valueCursor, providerFiber);
  providerFiber.type._context._currentValue = currentValue;
}
function scheduleWorkOnParentPath(parent, renderExpirationTime) {
  for (; null !== parent; ) {
    var alternate = parent.alternate;
    if (parent.childExpirationTime < renderExpirationTime)
      (parent.childExpirationTime = renderExpirationTime),
        null !== alternate &&
          alternate.childExpirationTime < renderExpirationTime &&
          (alternate.childExpirationTime = renderExpirationTime);
    else if (
      null !== alternate &&
      alternate.childExpirationTime < renderExpirationTime
    )
      alternate.childExpirationTime = renderExpirationTime;
    else break;
    parent = parent.return;
  }
}
function prepareToReadContext(workInProgress, renderExpirationTime) {
  currentlyRenderingFiber = workInProgress;
  lastContextWithAllBitsObserved = lastContextDependency = null;
  workInProgress = workInProgress.dependencies;
  null !== workInProgress &&
    null !== workInProgress.firstContext &&
    (workInProgress.expirationTime >= renderExpirationTime &&
      (didReceiveUpdate = !0),
    (workInProgress.firstContext = null));
}
function readContext(context, observedBits) {
  if (
    lastContextWithAllBitsObserved !== context &&
    !1 !== observedBits &&
    0 !== observedBits
  ) {
    if ("number" !== typeof observedBits || 1073741823 === observedBits)
      (lastContextWithAllBitsObserved = context), (observedBits = 1073741823);
    observedBits = { context: context, observedBits: observedBits, next: null };
    if (null === lastContextDependency) {
      if (null === currentlyRenderingFiber)
        throw Error(formatProdErrorMessage(308));
      lastContextDependency = observedBits;
      currentlyRenderingFiber.dependencies = {
        expirationTime: 0,
        firstContext: observedBits,
        responders: null
      };
    } else lastContextDependency = lastContextDependency.next = observedBits;
  }
  return context._currentValue;
}
var hasForceUpdate = !1;
function createUpdateQueue(baseState) {
  return {
    baseState: baseState,
    firstUpdate: null,
    lastUpdate: null,
    firstCapturedUpdate: null,
    lastCapturedUpdate: null,
    firstEffect: null,
    lastEffect: null,
    firstCapturedEffect: null,
    lastCapturedEffect: null
  };
}
function cloneUpdateQueue(currentQueue) {
  return {
    baseState: currentQueue.baseState,
    firstUpdate: currentQueue.firstUpdate,
    lastUpdate: currentQueue.lastUpdate,
    firstCapturedUpdate: null,
    lastCapturedUpdate: null,
    firstEffect: null,
    lastEffect: null,
    firstCapturedEffect: null,
    lastCapturedEffect: null
  };
}
function createUpdate(expirationTime, suspenseConfig) {
  return {
    expirationTime: expirationTime,
    suspenseConfig: suspenseConfig,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
    nextEffect: null
  };
}
function appendUpdateToQueue(queue, update) {
  null === queue.lastUpdate
    ? (queue.firstUpdate = queue.lastUpdate = update)
    : ((queue.lastUpdate.next = update), (queue.lastUpdate = update));
}
function enqueueUpdate(fiber, update) {
  var alternate = fiber.alternate;
  if (null === alternate) {
    var queue1 = fiber.updateQueue;
    var queue2 = null;
    null === queue1 &&
      (queue1 = fiber.updateQueue = createUpdateQueue(fiber.memoizedState));
  } else
    (queue1 = fiber.updateQueue),
      (queue2 = alternate.updateQueue),
      null === queue1
        ? null === queue2
          ? ((queue1 = fiber.updateQueue = createUpdateQueue(
              fiber.memoizedState
            )),
            (queue2 = alternate.updateQueue = createUpdateQueue(
              alternate.memoizedState
            )))
          : (queue1 = fiber.updateQueue = cloneUpdateQueue(queue2))
        : null === queue2 &&
          (queue2 = alternate.updateQueue = cloneUpdateQueue(queue1));
  null === queue2 || queue1 === queue2
    ? appendUpdateToQueue(queue1, update)
    : null === queue1.lastUpdate || null === queue2.lastUpdate
      ? (appendUpdateToQueue(queue1, update),
        appendUpdateToQueue(queue2, update))
      : (appendUpdateToQueue(queue1, update), (queue2.lastUpdate = update));
}
function enqueueCapturedUpdate(workInProgress, update) {
  var workInProgressQueue = workInProgress.updateQueue;
  workInProgressQueue =
    null === workInProgressQueue
      ? (workInProgress.updateQueue = createUpdateQueue(
          workInProgress.memoizedState
        ))
      : ensureWorkInProgressQueueIsAClone(workInProgress, workInProgressQueue);
  null === workInProgressQueue.lastCapturedUpdate
    ? (workInProgressQueue.firstCapturedUpdate = workInProgressQueue.lastCapturedUpdate = update)
    : ((workInProgressQueue.lastCapturedUpdate.next = update),
      (workInProgressQueue.lastCapturedUpdate = update));
}
function ensureWorkInProgressQueueIsAClone(workInProgress, queue) {
  var current = workInProgress.alternate;
  null !== current &&
    queue === current.updateQueue &&
    (queue = workInProgress.updateQueue = cloneUpdateQueue(queue));
  return queue;
}
function getStateFromUpdate(
  workInProgress,
  queue,
  update,
  prevState,
  nextProps,
  instance
) {
  switch (update.tag) {
    case 1:
      return (
        (workInProgress = update.payload),
        "function" === typeof workInProgress
          ? workInProgress.call(instance, prevState, nextProps)
          : workInProgress
      );
    case 3:
      workInProgress.effectTag = (workInProgress.effectTag & -4097) | 64;
    case 0:
      workInProgress = update.payload;
      nextProps =
        "function" === typeof workInProgress
          ? workInProgress.call(instance, prevState, nextProps)
          : workInProgress;
      if (null === nextProps || void 0 === nextProps) break;
      return Object.assign({}, prevState, nextProps);
    case 2:
      hasForceUpdate = !0;
  }
  return prevState;
}
function processUpdateQueue(
  workInProgress,
  queue,
  props,
  instance,
  renderExpirationTime
) {
  hasForceUpdate = !1;
  queue = ensureWorkInProgressQueueIsAClone(workInProgress, queue);
  for (
    var newBaseState = queue.baseState,
      newFirstUpdate = null,
      newExpirationTime = 0,
      update = queue.firstUpdate,
      resultState = newBaseState;
    null !== update;

  ) {
    var updateExpirationTime = update.expirationTime;
    updateExpirationTime < renderExpirationTime
      ? (null === newFirstUpdate &&
          ((newFirstUpdate = update), (newBaseState = resultState)),
        newExpirationTime < updateExpirationTime &&
          (newExpirationTime = updateExpirationTime))
      : (markRenderEventTimeAndConfig(
          updateExpirationTime,
          update.suspenseConfig
        ),
        (resultState = getStateFromUpdate(
          workInProgress,
          queue,
          update,
          resultState,
          props,
          instance
        )),
        null !== update.callback &&
          ((workInProgress.effectTag |= 32),
          (update.nextEffect = null),
          null === queue.lastEffect
            ? (queue.firstEffect = queue.lastEffect = update)
            : ((queue.lastEffect.nextEffect = update),
              (queue.lastEffect = update))));
    update = update.next;
  }
  updateExpirationTime = null;
  for (update = queue.firstCapturedUpdate; null !== update; ) {
    var _updateExpirationTime = update.expirationTime;
    _updateExpirationTime < renderExpirationTime
      ? (null === updateExpirationTime &&
          ((updateExpirationTime = update),
          null === newFirstUpdate && (newBaseState = resultState)),
        newExpirationTime < _updateExpirationTime &&
          (newExpirationTime = _updateExpirationTime))
      : ((resultState = getStateFromUpdate(
          workInProgress,
          queue,
          update,
          resultState,
          props,
          instance
        )),
        null !== update.callback &&
          ((workInProgress.effectTag |= 32),
          (update.nextEffect = null),
          null === queue.lastCapturedEffect
            ? (queue.firstCapturedEffect = queue.lastCapturedEffect = update)
            : ((queue.lastCapturedEffect.nextEffect = update),
              (queue.lastCapturedEffect = update))));
    update = update.next;
  }
  null === newFirstUpdate && (queue.lastUpdate = null);
  null === updateExpirationTime
    ? (queue.lastCapturedUpdate = null)
    : (workInProgress.effectTag |= 32);
  null === newFirstUpdate &&
    null === updateExpirationTime &&
    (newBaseState = resultState);
  queue.baseState = newBaseState;
  queue.firstUpdate = newFirstUpdate;
  queue.firstCapturedUpdate = updateExpirationTime;
  markUnprocessedUpdateTime(newExpirationTime);
  workInProgress.expirationTime = newExpirationTime;
  workInProgress.memoizedState = resultState;
}
function commitUpdateQueue(finishedWork, finishedQueue, instance) {
  null !== finishedQueue.firstCapturedUpdate &&
    (null !== finishedQueue.lastUpdate &&
      ((finishedQueue.lastUpdate.next = finishedQueue.firstCapturedUpdate),
      (finishedQueue.lastUpdate = finishedQueue.lastCapturedUpdate)),
    (finishedQueue.firstCapturedUpdate = finishedQueue.lastCapturedUpdate = null));
  commitUpdateEffects(finishedQueue.firstEffect, instance);
  finishedQueue.firstEffect = finishedQueue.lastEffect = null;
  commitUpdateEffects(finishedQueue.firstCapturedEffect, instance);
  finishedQueue.firstCapturedEffect = finishedQueue.lastCapturedEffect = null;
}
function commitUpdateEffects(effect, instance) {
  for (; null !== effect; ) {
    var callback = effect.callback;
    if (null !== callback) {
      effect.callback = null;
      var context = instance;
      if ("function" !== typeof callback)
        throw Error(formatProdErrorMessage(191, callback));
      callback.call(context);
    }
    effect = effect.nextEffect;
  }
}
var ReactCurrentBatchConfig = ReactSharedInternals.ReactCurrentBatchConfig;
function updateContainer(element, container, parentComponent, callback) {
  var current$$1 = container.current,
    currentTime = requestCurrentTimeForUpdate(),
    suspenseConfig = ReactCurrentBatchConfig.suspense;
  currentTime = computeExpirationForFiber(
    currentTime,
    current$$1,
    suspenseConfig
  );
  a: if (parentComponent) {
    parentComponent = parentComponent._reactInternalFiber;
    b: {
      if (
        getNearestMountedFiber(parentComponent) !== parentComponent ||
        1 !== parentComponent.tag
      )
        throw Error(formatProdErrorMessage(170));
      var parentContext = parentComponent;
      do {
        switch (parentContext.tag) {
          case 3:
            parentContext = parentContext.stateNode.context;
            break b;
          case 1:
            if (isContextProvider(parentContext.type)) {
              parentContext =
                parentContext.stateNode
                  .__reactInternalMemoizedMergedChildContext;
              break b;
            }
        }
        parentContext = parentContext.return;
      } while (null !== parentContext);
      throw Error(formatProdErrorMessage(171));
    }
    if (1 === parentComponent.tag) {
      var Component = parentComponent.type;
      if (isContextProvider(Component)) {
        parentComponent = processChildContext(
          parentComponent,
          Component,
          parentContext
        );
        break a;
      }
    }
    parentComponent = parentContext;
  } else parentComponent = emptyContextObject;
  null === container.context
    ? (container.context = parentComponent)
    : (container.pendingContext = parentComponent);
  container = createUpdate(currentTime, suspenseConfig);
  container.payload = { element: element };
  callback = void 0 === callback ? null : callback;
  null !== callback && (container.callback = callback);
  enqueueUpdate(current$$1, container);
  scheduleUpdateOnFiber(current$$1, currentTime);
  return currentTime;
}
function getPublicRootInstance(container) {
  container = container.current;
  if (!container.child) return null;
  switch (container.child.tag) {
    case 5:
      return container.child.stateNode;
    default:
      return container.child.stateNode;
  }
}
function markRetryTimeImpl(fiber, retryTime) {
  fiber = fiber.memoizedState;
  null !== fiber &&
    null !== fiber.dehydrated &&
    fiber.retryTime < retryTime &&
    (fiber.retryTime = retryTime);
}
function markRetryTimeIfNotHydrated(fiber, retryTime) {
  markRetryTimeImpl(fiber, retryTime);
  (fiber = fiber.alternate) && markRetryTimeImpl(fiber, retryTime);
}
function resolveDefaultProps(Component, baseProps) {
  if (Component && Component.defaultProps) {
    baseProps = Object.assign({}, baseProps);
    Component = Component.defaultProps;
    for (var propName in Component)
      void 0 === baseProps[propName] &&
        (baseProps[propName] = Component[propName]);
  }
  return baseProps;
}
var emptyRefsObject = new React.Component().refs;
function applyDerivedStateFromProps(
  workInProgress,
  ctor,
  getDerivedStateFromProps,
  nextProps
) {
  ctor = workInProgress.memoizedState;
  getDerivedStateFromProps = getDerivedStateFromProps(nextProps, ctor);
  getDerivedStateFromProps =
    null === getDerivedStateFromProps || void 0 === getDerivedStateFromProps
      ? ctor
      : Object.assign({}, ctor, getDerivedStateFromProps);
  workInProgress.memoizedState = getDerivedStateFromProps;
  nextProps = workInProgress.updateQueue;
  null !== nextProps &&
    0 === workInProgress.expirationTime &&
    (nextProps.baseState = getDerivedStateFromProps);
}
var classComponentUpdater = {
  isMounted: function(component) {
    return (component = component._reactInternalFiber)
      ? getNearestMountedFiber(component) === component
      : !1;
  },
  enqueueSetState: function(inst, payload, callback) {
    inst = inst._reactInternalFiber;
    var currentTime = requestCurrentTimeForUpdate(),
      suspenseConfig = ReactCurrentBatchConfig.suspense;
    currentTime = computeExpirationForFiber(currentTime, inst, suspenseConfig);
    suspenseConfig = createUpdate(currentTime, suspenseConfig);
    suspenseConfig.payload = payload;
    void 0 !== callback &&
      null !== callback &&
      (suspenseConfig.callback = callback);
    enqueueUpdate(inst, suspenseConfig);
    scheduleUpdateOnFiber(inst, currentTime);
  },
  enqueueReplaceState: function(inst, payload, callback) {
    inst = inst._reactInternalFiber;
    var currentTime = requestCurrentTimeForUpdate(),
      suspenseConfig = ReactCurrentBatchConfig.suspense;
    currentTime = computeExpirationForFiber(currentTime, inst, suspenseConfig);
    suspenseConfig = createUpdate(currentTime, suspenseConfig);
    suspenseConfig.tag = 1;
    suspenseConfig.payload = payload;
    void 0 !== callback &&
      null !== callback &&
      (suspenseConfig.callback = callback);
    enqueueUpdate(inst, suspenseConfig);
    scheduleUpdateOnFiber(inst, currentTime);
  },
  enqueueForceUpdate: function(inst, callback) {
    inst = inst._reactInternalFiber;
    var currentTime = requestCurrentTimeForUpdate(),
      suspenseConfig = ReactCurrentBatchConfig.suspense;
    currentTime = computeExpirationForFiber(currentTime, inst, suspenseConfig);
    suspenseConfig = createUpdate(currentTime, suspenseConfig);
    suspenseConfig.tag = 2;
    void 0 !== callback &&
      null !== callback &&
      (suspenseConfig.callback = callback);
    enqueueUpdate(inst, suspenseConfig);
    scheduleUpdateOnFiber(inst, currentTime);
  }
};
function checkShouldComponentUpdate(
  workInProgress,
  ctor,
  oldProps,
  newProps,
  oldState,
  newState,
  nextContext
) {
  var instance = workInProgress.stateNode;
  return "function" === typeof instance.shouldComponentUpdate
    ? (startPhaseTimer(workInProgress, "shouldComponentUpdate"),
      (workInProgress = instance.shouldComponentUpdate(
        newProps,
        newState,
        nextContext
      )),
      stopPhaseTimer(),
      workInProgress)
    : ctor.prototype && ctor.prototype.isPureReactComponent
      ? !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState)
      : !0;
}
function constructClassInstance(workInProgress, ctor, props) {
  var isLegacyContextConsumer = !1,
    unmaskedContext = emptyContextObject;
  var context = ctor.contextType;
  "object" === typeof context && null !== context
    ? (context = readContext(context))
    : ((unmaskedContext = isContextProvider(ctor)
        ? previousContext
        : contextStackCursor.current),
      (isLegacyContextConsumer = ctor.contextTypes),
      (context = (isLegacyContextConsumer =
        null !== isLegacyContextConsumer && void 0 !== isLegacyContextConsumer)
        ? getMaskedContext(workInProgress, unmaskedContext)
        : emptyContextObject));
  ctor = new ctor(props, context);
  workInProgress.memoizedState =
    null !== ctor.state && void 0 !== ctor.state ? ctor.state : null;
  ctor.updater = classComponentUpdater;
  workInProgress.stateNode = ctor;
  ctor._reactInternalFiber = workInProgress;
  isLegacyContextConsumer &&
    ((workInProgress = workInProgress.stateNode),
    (workInProgress.__reactInternalMemoizedUnmaskedChildContext = unmaskedContext),
    (workInProgress.__reactInternalMemoizedMaskedChildContext = context));
  return ctor;
}
function callComponentWillReceiveProps(
  workInProgress,
  instance,
  newProps,
  nextContext
) {
  var oldState = instance.state;
  startPhaseTimer(workInProgress, "componentWillReceiveProps");
  "function" === typeof instance.componentWillReceiveProps &&
    instance.componentWillReceiveProps(newProps, nextContext);
  "function" === typeof instance.UNSAFE_componentWillReceiveProps &&
    instance.UNSAFE_componentWillReceiveProps(newProps, nextContext);
  stopPhaseTimer();
  instance.state !== oldState &&
    classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
}
function mountClassInstance(
  workInProgress,
  ctor,
  newProps,
  renderExpirationTime
) {
  var instance = workInProgress.stateNode;
  instance.props = newProps;
  instance.state = workInProgress.memoizedState;
  instance.refs = emptyRefsObject;
  var contextType = ctor.contextType;
  "object" === typeof contextType && null !== contextType
    ? (instance.context = readContext(contextType))
    : ((contextType = isContextProvider(ctor)
        ? previousContext
        : contextStackCursor.current),
      (instance.context = getMaskedContext(workInProgress, contextType)));
  contextType = workInProgress.updateQueue;
  null !== contextType &&
    (processUpdateQueue(
      workInProgress,
      contextType,
      newProps,
      instance,
      renderExpirationTime
    ),
    (instance.state = workInProgress.memoizedState));
  contextType = ctor.getDerivedStateFromProps;
  "function" === typeof contextType &&
    (applyDerivedStateFromProps(workInProgress, ctor, contextType, newProps),
    (instance.state = workInProgress.memoizedState));
  "function" === typeof ctor.getDerivedStateFromProps ||
    "function" === typeof instance.getSnapshotBeforeUpdate ||
    ("function" !== typeof instance.UNSAFE_componentWillMount &&
      "function" !== typeof instance.componentWillMount) ||
    (startPhaseTimer(workInProgress, "componentWillMount"),
    (ctor = instance.state),
    "function" === typeof instance.componentWillMount &&
      instance.componentWillMount(),
    "function" === typeof instance.UNSAFE_componentWillMount &&
      instance.UNSAFE_componentWillMount(),
    stopPhaseTimer(),
    ctor !== instance.state &&
      classComponentUpdater.enqueueReplaceState(instance, instance.state, null),
    (contextType = workInProgress.updateQueue),
    null !== contextType &&
      (processUpdateQueue(
        workInProgress,
        contextType,
        newProps,
        instance,
        renderExpirationTime
      ),
      (instance.state = workInProgress.memoizedState)));
  "function" === typeof instance.componentDidMount &&
    (workInProgress.effectTag |= 4);
}
var isArray = Array.isArray;
function coerceRef(returnFiber, current$$1, element) {
  returnFiber = element.ref;
  if (
    null !== returnFiber &&
    "function" !== typeof returnFiber &&
    "object" !== typeof returnFiber
  ) {
    if (element._owner) {
      element = element._owner;
      if (element) {
        if (1 !== element.tag) throw Error(formatProdErrorMessage(309));
        var inst = element.stateNode;
      }
      if (!inst) throw Error(formatProdErrorMessage(147, returnFiber));
      var stringRef = "" + returnFiber;
      if (
        null !== current$$1 &&
        null !== current$$1.ref &&
        "function" === typeof current$$1.ref &&
        current$$1.ref._stringRef === stringRef
      )
        return current$$1.ref;
      current$$1 = function(value) {
        var refs = inst.refs;
        refs === emptyRefsObject && (refs = inst.refs = {});
        null === value ? delete refs[stringRef] : (refs[stringRef] = value);
      };
      current$$1._stringRef = stringRef;
      return current$$1;
    }
    if ("string" !== typeof returnFiber)
      throw Error(formatProdErrorMessage(284));
    if (!element._owner) throw Error(formatProdErrorMessage(290, returnFiber));
  }
  return returnFiber;
}
function throwOnInvalidObjectType(returnFiber, newChild) {
  if ("textarea" !== returnFiber.type)
    throw Error(
      formatProdErrorMessage(
        31,
        "[object Object]" === Object.prototype.toString.call(newChild)
          ? "object with keys {" + Object.keys(newChild).join(", ") + "}"
          : newChild,
        ""
      )
    );
}
function ChildReconciler(shouldTrackSideEffects) {
  function deleteChild(returnFiber, childToDelete) {
    if (shouldTrackSideEffects) {
      var last = returnFiber.lastEffect;
      null !== last
        ? ((last.nextEffect = childToDelete),
          (returnFiber.lastEffect = childToDelete))
        : (returnFiber.firstEffect = returnFiber.lastEffect = childToDelete);
      childToDelete.nextEffect = null;
      childToDelete.effectTag = 8;
    }
  }
  function deleteRemainingChildren(returnFiber, currentFirstChild) {
    if (!shouldTrackSideEffects) return null;
    for (; null !== currentFirstChild; )
      deleteChild(returnFiber, currentFirstChild),
        (currentFirstChild = currentFirstChild.sibling);
    return null;
  }
  function mapRemainingChildren(returnFiber, currentFirstChild) {
    for (returnFiber = new Map(); null !== currentFirstChild; )
      null !== currentFirstChild.key
        ? returnFiber.set(currentFirstChild.key, currentFirstChild)
        : returnFiber.set(currentFirstChild.index, currentFirstChild),
        (currentFirstChild = currentFirstChild.sibling);
    return returnFiber;
  }
  function useFiber(fiber, pendingProps, expirationTime) {
    fiber = createWorkInProgress(fiber, pendingProps, expirationTime);
    fiber.index = 0;
    fiber.sibling = null;
    return fiber;
  }
  function placeChild(newFiber, lastPlacedIndex, newIndex) {
    newFiber.index = newIndex;
    if (!shouldTrackSideEffects) return lastPlacedIndex;
    newIndex = newFiber.alternate;
    if (null !== newIndex)
      return (
        (newIndex = newIndex.index),
        newIndex < lastPlacedIndex
          ? ((newFiber.effectTag = 2), lastPlacedIndex)
          : newIndex
      );
    newFiber.effectTag = 2;
    return lastPlacedIndex;
  }
  function placeSingleChild(newFiber) {
    shouldTrackSideEffects &&
      null === newFiber.alternate &&
      (newFiber.effectTag = 2);
    return newFiber;
  }
  function updateTextNode(
    returnFiber,
    current$$1,
    textContent,
    expirationTime
  ) {
    if (null === current$$1 || 6 !== current$$1.tag)
      return (
        (current$$1 = createFiberFromText(
          textContent,
          returnFiber.mode,
          expirationTime
        )),
        (current$$1.return = returnFiber),
        current$$1
      );
    current$$1 = useFiber(current$$1, textContent, expirationTime);
    current$$1.return = returnFiber;
    return current$$1;
  }
  function updateElement(returnFiber, current$$1, element, expirationTime) {
    if (null !== current$$1 && current$$1.elementType === element.type)
      return (
        (expirationTime = useFiber(current$$1, element.props, expirationTime)),
        (expirationTime.ref = coerceRef(returnFiber, current$$1, element)),
        (expirationTime.return = returnFiber),
        expirationTime
      );
    expirationTime = createFiberFromTypeAndProps(
      element.type,
      element.key,
      element.props,
      null,
      returnFiber.mode,
      expirationTime
    );
    expirationTime.ref = coerceRef(returnFiber, current$$1, element);
    expirationTime.return = returnFiber;
    return expirationTime;
  }
  function updatePortal(returnFiber, current$$1, portal, expirationTime) {
    if (
      null === current$$1 ||
      4 !== current$$1.tag ||
      current$$1.stateNode.containerInfo !== portal.containerInfo ||
      current$$1.stateNode.implementation !== portal.implementation
    )
      return (
        (current$$1 = createFiberFromPortal(
          portal,
          returnFiber.mode,
          expirationTime
        )),
        (current$$1.return = returnFiber),
        current$$1
      );
    current$$1 = useFiber(current$$1, portal.children || [], expirationTime);
    current$$1.return = returnFiber;
    return current$$1;
  }
  function updateFragment(
    returnFiber,
    current$$1,
    fragment,
    expirationTime,
    key
  ) {
    if (null === current$$1 || 7 !== current$$1.tag)
      return (
        (current$$1 = createFiberFromFragment(
          fragment,
          returnFiber.mode,
          expirationTime,
          key
        )),
        (current$$1.return = returnFiber),
        current$$1
      );
    current$$1 = useFiber(current$$1, fragment, expirationTime);
    current$$1.return = returnFiber;
    return current$$1;
  }
  function createChild(returnFiber, newChild, expirationTime) {
    if ("string" === typeof newChild || "number" === typeof newChild)
      return (
        (newChild = createFiberFromText(
          "" + newChild,
          returnFiber.mode,
          expirationTime
        )),
        (newChild.return = returnFiber),
        newChild
      );
    if ("object" === typeof newChild && null !== newChild) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return (
            (expirationTime = createFiberFromTypeAndProps(
              newChild.type,
              newChild.key,
              newChild.props,
              null,
              returnFiber.mode,
              expirationTime
            )),
            (expirationTime.ref = coerceRef(returnFiber, null, newChild)),
            (expirationTime.return = returnFiber),
            expirationTime
          );
        case REACT_PORTAL_TYPE:
          return (
            (newChild = createFiberFromPortal(
              newChild,
              returnFiber.mode,
              expirationTime
            )),
            (newChild.return = returnFiber),
            newChild
          );
      }
      if (isArray(newChild) || getIteratorFn(newChild))
        return (
          (newChild = createFiberFromFragment(
            newChild,
            returnFiber.mode,
            expirationTime,
            null
          )),
          (newChild.return = returnFiber),
          newChild
        );
      throwOnInvalidObjectType(returnFiber, newChild);
    }
    return null;
  }
  function updateSlot(returnFiber, oldFiber, newChild, expirationTime) {
    var key = null !== oldFiber ? oldFiber.key : null;
    if ("string" === typeof newChild || "number" === typeof newChild)
      return null !== key
        ? null
        : updateTextNode(returnFiber, oldFiber, "" + newChild, expirationTime);
    if ("object" === typeof newChild && null !== newChild) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return newChild.key === key
            ? newChild.type === REACT_FRAGMENT_TYPE
              ? updateFragment(
                  returnFiber,
                  oldFiber,
                  newChild.props.children,
                  expirationTime,
                  key
                )
              : updateElement(returnFiber, oldFiber, newChild, expirationTime)
            : null;
        case REACT_PORTAL_TYPE:
          return newChild.key === key
            ? updatePortal(returnFiber, oldFiber, newChild, expirationTime)
            : null;
      }
      if (isArray(newChild) || getIteratorFn(newChild))
        return null !== key
          ? null
          : updateFragment(
              returnFiber,
              oldFiber,
              newChild,
              expirationTime,
              null
            );
      throwOnInvalidObjectType(returnFiber, newChild);
    }
    return null;
  }
  function updateFromMap(
    existingChildren,
    returnFiber,
    newIdx,
    newChild,
    expirationTime
  ) {
    if ("string" === typeof newChild || "number" === typeof newChild)
      return (
        (existingChildren = existingChildren.get(newIdx) || null),
        updateTextNode(
          returnFiber,
          existingChildren,
          "" + newChild,
          expirationTime
        )
      );
    if ("object" === typeof newChild && null !== newChild) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return (
            (existingChildren =
              existingChildren.get(
                null === newChild.key ? newIdx : newChild.key
              ) || null),
            newChild.type === REACT_FRAGMENT_TYPE
              ? updateFragment(
                  returnFiber,
                  existingChildren,
                  newChild.props.children,
                  expirationTime,
                  newChild.key
                )
              : updateElement(
                  returnFiber,
                  existingChildren,
                  newChild,
                  expirationTime
                )
          );
        case REACT_PORTAL_TYPE:
          return (
            (existingChildren =
              existingChildren.get(
                null === newChild.key ? newIdx : newChild.key
              ) || null),
            updatePortal(
              returnFiber,
              existingChildren,
              newChild,
              expirationTime
            )
          );
      }
      if (isArray(newChild) || getIteratorFn(newChild))
        return (
          (existingChildren = existingChildren.get(newIdx) || null),
          updateFragment(
            returnFiber,
            existingChildren,
            newChild,
            expirationTime,
            null
          )
        );
      throwOnInvalidObjectType(returnFiber, newChild);
    }
    return null;
  }
  function reconcileChildrenArray(
    returnFiber,
    currentFirstChild,
    newChildren,
    expirationTime
  ) {
    for (
      var resultingFirstChild = null,
        previousNewFiber = null,
        oldFiber = currentFirstChild,
        newIdx = (currentFirstChild = 0),
        nextOldFiber = null;
      null !== oldFiber && newIdx < newChildren.length;
      newIdx++
    ) {
      oldFiber.index > newIdx
        ? ((nextOldFiber = oldFiber), (oldFiber = null))
        : (nextOldFiber = oldFiber.sibling);
      var newFiber = updateSlot(
        returnFiber,
        oldFiber,
        newChildren[newIdx],
        expirationTime
      );
      if (null === newFiber) {
        null === oldFiber && (oldFiber = nextOldFiber);
        break;
      }
      shouldTrackSideEffects &&
        oldFiber &&
        null === newFiber.alternate &&
        deleteChild(returnFiber, oldFiber);
      currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
      null === previousNewFiber
        ? (resultingFirstChild = newFiber)
        : (previousNewFiber.sibling = newFiber);
      previousNewFiber = newFiber;
      oldFiber = nextOldFiber;
    }
    if (newIdx === newChildren.length)
      return (
        deleteRemainingChildren(returnFiber, oldFiber), resultingFirstChild
      );
    if (null === oldFiber) {
      for (; newIdx < newChildren.length; newIdx++)
        (oldFiber = createChild(
          returnFiber,
          newChildren[newIdx],
          expirationTime
        )),
          null !== oldFiber &&
            ((currentFirstChild = placeChild(
              oldFiber,
              currentFirstChild,
              newIdx
            )),
            null === previousNewFiber
              ? (resultingFirstChild = oldFiber)
              : (previousNewFiber.sibling = oldFiber),
            (previousNewFiber = oldFiber));
      return resultingFirstChild;
    }
    for (
      oldFiber = mapRemainingChildren(returnFiber, oldFiber);
      newIdx < newChildren.length;
      newIdx++
    )
      (nextOldFiber = updateFromMap(
        oldFiber,
        returnFiber,
        newIdx,
        newChildren[newIdx],
        expirationTime
      )),
        null !== nextOldFiber &&
          (shouldTrackSideEffects &&
            null !== nextOldFiber.alternate &&
            oldFiber.delete(
              null === nextOldFiber.key ? newIdx : nextOldFiber.key
            ),
          (currentFirstChild = placeChild(
            nextOldFiber,
            currentFirstChild,
            newIdx
          )),
          null === previousNewFiber
            ? (resultingFirstChild = nextOldFiber)
            : (previousNewFiber.sibling = nextOldFiber),
          (previousNewFiber = nextOldFiber));
    shouldTrackSideEffects &&
      oldFiber.forEach(function(child) {
        return deleteChild(returnFiber, child);
      });
    return resultingFirstChild;
  }
  function reconcileChildrenIterator(
    returnFiber,
    currentFirstChild,
    newChildrenIterable,
    expirationTime
  ) {
    var iteratorFn = getIteratorFn(newChildrenIterable);
    if ("function" !== typeof iteratorFn)
      throw Error(formatProdErrorMessage(150));
    newChildrenIterable = iteratorFn.call(newChildrenIterable);
    if (null == newChildrenIterable) throw Error(formatProdErrorMessage(151));
    for (
      var previousNewFiber = (iteratorFn = null),
        oldFiber = currentFirstChild,
        newIdx = (currentFirstChild = 0),
        nextOldFiber = null,
        step = newChildrenIterable.next();
      null !== oldFiber && !step.done;
      newIdx++, step = newChildrenIterable.next()
    ) {
      oldFiber.index > newIdx
        ? ((nextOldFiber = oldFiber), (oldFiber = null))
        : (nextOldFiber = oldFiber.sibling);
      var newFiber = updateSlot(
        returnFiber,
        oldFiber,
        step.value,
        expirationTime
      );
      if (null === newFiber) {
        null === oldFiber && (oldFiber = nextOldFiber);
        break;
      }
      shouldTrackSideEffects &&
        oldFiber &&
        null === newFiber.alternate &&
        deleteChild(returnFiber, oldFiber);
      currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
      null === previousNewFiber
        ? (iteratorFn = newFiber)
        : (previousNewFiber.sibling = newFiber);
      previousNewFiber = newFiber;
      oldFiber = nextOldFiber;
    }
    if (step.done)
      return deleteRemainingChildren(returnFiber, oldFiber), iteratorFn;
    if (null === oldFiber) {
      for (; !step.done; newIdx++, step = newChildrenIterable.next())
        (step = createChild(returnFiber, step.value, expirationTime)),
          null !== step &&
            ((currentFirstChild = placeChild(step, currentFirstChild, newIdx)),
            null === previousNewFiber
              ? (iteratorFn = step)
              : (previousNewFiber.sibling = step),
            (previousNewFiber = step));
      return iteratorFn;
    }
    for (
      oldFiber = mapRemainingChildren(returnFiber, oldFiber);
      !step.done;
      newIdx++, step = newChildrenIterable.next()
    )
      (step = updateFromMap(
        oldFiber,
        returnFiber,
        newIdx,
        step.value,
        expirationTime
      )),
        null !== step &&
          (shouldTrackSideEffects &&
            null !== step.alternate &&
            oldFiber.delete(null === step.key ? newIdx : step.key),
          (currentFirstChild = placeChild(step, currentFirstChild, newIdx)),
          null === previousNewFiber
            ? (iteratorFn = step)
            : (previousNewFiber.sibling = step),
          (previousNewFiber = step));
    shouldTrackSideEffects &&
      oldFiber.forEach(function(child) {
        return deleteChild(returnFiber, child);
      });
    return iteratorFn;
  }
  return function(returnFiber, currentFirstChild, newChild, expirationTime) {
    var isUnkeyedTopLevelFragment =
      "object" === typeof newChild &&
      null !== newChild &&
      newChild.type === REACT_FRAGMENT_TYPE &&
      null === newChild.key;
    isUnkeyedTopLevelFragment && (newChild = newChild.props.children);
    var isObject = "object" === typeof newChild && null !== newChild;
    if (isObject)
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          a: {
            isObject = newChild.key;
            for (
              isUnkeyedTopLevelFragment = currentFirstChild;
              null !== isUnkeyedTopLevelFragment;

            ) {
              if (isUnkeyedTopLevelFragment.key === isObject)
                if (
                  7 === isUnkeyedTopLevelFragment.tag
                    ? newChild.type === REACT_FRAGMENT_TYPE
                    : isUnkeyedTopLevelFragment.elementType === newChild.type
                ) {
                  deleteRemainingChildren(
                    returnFiber,
                    isUnkeyedTopLevelFragment.sibling
                  );
                  currentFirstChild = useFiber(
                    isUnkeyedTopLevelFragment,
                    newChild.type === REACT_FRAGMENT_TYPE
                      ? newChild.props.children
                      : newChild.props,
                    expirationTime
                  );
                  currentFirstChild.ref = coerceRef(
                    returnFiber,
                    isUnkeyedTopLevelFragment,
                    newChild
                  );
                  currentFirstChild.return = returnFiber;
                  returnFiber = currentFirstChild;
                  break a;
                } else {
                  deleteRemainingChildren(
                    returnFiber,
                    isUnkeyedTopLevelFragment
                  );
                  break;
                }
              else deleteChild(returnFiber, isUnkeyedTopLevelFragment);
              isUnkeyedTopLevelFragment = isUnkeyedTopLevelFragment.sibling;
            }
            newChild.type === REACT_FRAGMENT_TYPE
              ? ((currentFirstChild = createFiberFromFragment(
                  newChild.props.children,
                  returnFiber.mode,
                  expirationTime,
                  newChild.key
                )),
                (currentFirstChild.return = returnFiber),
                (returnFiber = currentFirstChild))
              : ((expirationTime = createFiberFromTypeAndProps(
                  newChild.type,
                  newChild.key,
                  newChild.props,
                  null,
                  returnFiber.mode,
                  expirationTime
                )),
                (expirationTime.ref = coerceRef(
                  returnFiber,
                  currentFirstChild,
                  newChild
                )),
                (expirationTime.return = returnFiber),
                (returnFiber = expirationTime));
          }
          return placeSingleChild(returnFiber);
        case REACT_PORTAL_TYPE:
          a: {
            for (
              isUnkeyedTopLevelFragment = newChild.key;
              null !== currentFirstChild;

            ) {
              if (currentFirstChild.key === isUnkeyedTopLevelFragment)
                if (
                  4 === currentFirstChild.tag &&
                  currentFirstChild.stateNode.containerInfo ===
                    newChild.containerInfo &&
                  currentFirstChild.stateNode.implementation ===
                    newChild.implementation
                ) {
                  deleteRemainingChildren(
                    returnFiber,
                    currentFirstChild.sibling
                  );
                  currentFirstChild = useFiber(
                    currentFirstChild,
                    newChild.children || [],
                    expirationTime
                  );
                  currentFirstChild.return = returnFiber;
                  returnFiber = currentFirstChild;
                  break a;
                } else {
                  deleteRemainingChildren(returnFiber, currentFirstChild);
                  break;
                }
              else deleteChild(returnFiber, currentFirstChild);
              currentFirstChild = currentFirstChild.sibling;
            }
            currentFirstChild = createFiberFromPortal(
              newChild,
              returnFiber.mode,
              expirationTime
            );
            currentFirstChild.return = returnFiber;
            returnFiber = currentFirstChild;
          }
          return placeSingleChild(returnFiber);
      }
    if ("string" === typeof newChild || "number" === typeof newChild)
      return (
        (newChild = "" + newChild),
        null !== currentFirstChild && 6 === currentFirstChild.tag
          ? (deleteRemainingChildren(returnFiber, currentFirstChild.sibling),
            (currentFirstChild = useFiber(
              currentFirstChild,
              newChild,
              expirationTime
            )),
            (currentFirstChild.return = returnFiber),
            (returnFiber = currentFirstChild))
          : (deleteRemainingChildren(returnFiber, currentFirstChild),
            (currentFirstChild = createFiberFromText(
              newChild,
              returnFiber.mode,
              expirationTime
            )),
            (currentFirstChild.return = returnFiber),
            (returnFiber = currentFirstChild)),
        placeSingleChild(returnFiber)
      );
    if (isArray(newChild))
      return reconcileChildrenArray(
        returnFiber,
        currentFirstChild,
        newChild,
        expirationTime
      );
    if (getIteratorFn(newChild))
      return reconcileChildrenIterator(
        returnFiber,
        currentFirstChild,
        newChild,
        expirationTime
      );
    isObject && throwOnInvalidObjectType(returnFiber, newChild);
    if ("undefined" === typeof newChild && !isUnkeyedTopLevelFragment)
      switch (returnFiber.tag) {
        case 1:
        case 0:
          throw ((returnFiber = returnFiber.type),
          Error(
            formatProdErrorMessage(
              152,
              returnFiber.displayName || returnFiber.name || "Component"
            )
          ));
      }
    return deleteRemainingChildren(returnFiber, currentFirstChild);
  };
}
var reconcileChildFibers = ChildReconciler(!0),
  mountChildFibers = ChildReconciler(!1),
  NO_CONTEXT = {},
  contextStackCursor$1 = { current: NO_CONTEXT },
  contextFiberStackCursor = { current: NO_CONTEXT },
  rootInstanceStackCursor = { current: NO_CONTEXT };
function requiredContext(c) {
  if (c === NO_CONTEXT) throw Error(formatProdErrorMessage(174));
  return c;
}
function pushHostContainer(fiber, nextRootInstance) {
  push(rootInstanceStackCursor, nextRootInstance, fiber);
  push(contextFiberStackCursor, fiber, fiber);
  push(contextStackCursor$1, NO_CONTEXT, fiber);
  var type = nextRootInstance.nodeType;
  switch (type) {
    case 9:
    case 11:
      nextRootInstance = (nextRootInstance = nextRootInstance.documentElement)
        ? nextRootInstance.namespaceURI
        : getChildNamespace(null, "");
      break;
    default:
      (type =
        type === COMMENT_NODE ? nextRootInstance.parentNode : nextRootInstance),
        (nextRootInstance = type.namespaceURI || null),
        (type = type.tagName),
        (nextRootInstance = getChildNamespace(nextRootInstance, type));
  }
  pop(contextStackCursor$1, fiber);
  push(contextStackCursor$1, nextRootInstance, fiber);
}
function popHostContainer(fiber) {
  pop(contextStackCursor$1, fiber);
  pop(contextFiberStackCursor, fiber);
  pop(rootInstanceStackCursor, fiber);
}
function pushHostContext(fiber) {
  requiredContext(rootInstanceStackCursor.current);
  var context = requiredContext(contextStackCursor$1.current);
  var nextContext = getChildNamespace(context, fiber.type);
  context !== nextContext &&
    (push(contextFiberStackCursor, fiber, fiber),
    push(contextStackCursor$1, nextContext, fiber));
}
function popHostContext(fiber) {
  contextFiberStackCursor.current === fiber &&
    (pop(contextStackCursor$1, fiber), pop(contextFiberStackCursor, fiber));
}
var SubtreeSuspenseContextMask = 1,
  InvisibleParentSuspenseContext = 1,
  ForceSuspenseFallback = 2,
  suspenseStackCursor = { current: 0 };
function findFirstSuspended(row) {
  for (var node = row; null !== node; ) {
    if (13 === node.tag) {
      var state = node.memoizedState;
      if (
        null !== state &&
        ((state = state.dehydrated),
        null === state ||
          state.data === SUSPENSE_PENDING_START_DATA ||
          state.data === SUSPENSE_FALLBACK_START_DATA)
      )
        return node;
    } else if (19 === node.tag && void 0 !== node.memoizedProps.revealOrder) {
      if (0 !== (node.effectTag & 64)) return node;
    } else if (null !== node.child) {
      node.child.return = node;
      node = node.child;
      continue;
    }
    if (node === row) break;
    for (; null === node.sibling; ) {
      if (null === node.return || node.return === row) return null;
      node = node.return;
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
  return null;
}
var emptyObject = {},
  isArray$2 = Array.isArray;
function updateEventListener(
  listener,
  fiber,
  visistedResponders,
  respondersMap,
  rootContainerInstance
) {
  if (listener) {
    var responder = listener.responder;
    var props = listener.props;
  }
  if (!responder || responder.$$typeof !== REACT_RESPONDER_TYPE)
    throw Error(formatProdErrorMessage(339));
  listener = props;
  if (!visistedResponders.has(responder))
    if (
      (visistedResponders.add(responder),
      (visistedResponders = respondersMap.get(responder)),
      void 0 === visistedResponders)
    ) {
      visistedResponders = rootContainerInstance;
      props = emptyObject;
      rootContainerInstance = responder.getInitialState;
      null !== rootContainerInstance &&
        (props = rootContainerInstance(listener));
      rootContainerInstance = {
        fiber: fiber,
        props: listener,
        responder: responder,
        rootEventTypes: null,
        state: props
      };
      if (!visistedResponders)
        for (; null !== fiber; ) {
          var tag = fiber.tag;
          if (5 === tag) {
            visistedResponders = fiber.stateNode;
            break;
          } else if (3 === tag) {
            visistedResponders = fiber.stateNode.containerInfo;
            break;
          }
          fiber = fiber.return;
        }
      fiber = props;
      visistedResponders = visistedResponders.ownerDocument;
      props = responder.rootEventTypes;
      tag = responder.targetEventTypes;
      null !== tag && listenToEventResponderEventTypes(tag, visistedResponders);
      if (null !== props) {
        for (tag = 0; tag < props.length; tag++)
          registerRootEventType(props[tag], rootContainerInstance);
        listenToEventResponderEventTypes(props, visistedResponders);
      }
      mountEventResponder(responder, rootContainerInstance, listener, fiber);
      respondersMap.set(responder, rootContainerInstance);
    } else
      (visistedResponders.props = listener), (visistedResponders.fiber = fiber);
}
function updateLegacyEventListeners(listeners, fiber, rootContainerInstance) {
  var visistedResponders = new Set(),
    dependencies = fiber.dependencies;
  if (null != listeners) {
    null === dependencies &&
      (dependencies = fiber.dependencies = {
        expirationTime: 0,
        firstContext: null,
        responders: new Map()
      });
    var respondersMap = dependencies.responders;
    null === respondersMap &&
      (dependencies.responders = respondersMap = new Map());
    if (isArray$2(listeners))
      for (var i = 0, length = listeners.length; i < length; i++)
        updateEventListener(
          listeners[i],
          fiber,
          visistedResponders,
          respondersMap,
          rootContainerInstance
        );
    else
      updateEventListener(
        listeners,
        fiber,
        visistedResponders,
        respondersMap,
        rootContainerInstance
      );
  }
  if (
    null !== dependencies &&
    ((listeners = dependencies.responders), null !== listeners)
  )
    for (
      fiber = Array.from(listeners.keys()),
        rootContainerInstance = 0,
        dependencies = fiber.length;
      rootContainerInstance < dependencies;
      rootContainerInstance++
    )
      (respondersMap = fiber[rootContainerInstance]),
        visistedResponders.has(respondersMap) ||
          ((i = listeners.get(respondersMap)),
          unmountEventResponder(i),
          listeners.delete(respondersMap));
}
function createResponderListener(responder, props) {
  return { responder: responder, props: props };
}
function unmountResponderListeners(fiber) {
  fiber = fiber.dependencies;
  if (null !== fiber) {
    var respondersMap = fiber.responders;
    if (null !== respondersMap) {
      respondersMap = Array.from(respondersMap.values());
      for (var i = 0, length = respondersMap.length; i < length; i++)
        unmountEventResponder(respondersMap[i]);
      fiber.responders = null;
    }
  }
}
var NoEffect$1 = 0,
  UnmountSnapshot = 2,
  UnmountMutation = 4,
  MountMutation = 8,
  UnmountLayout = 16,
  MountLayout = 32,
  MountPassive = 64,
  UnmountPassive = 128,
  ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher,
  ReactCurrentBatchConfig$1 = ReactSharedInternals.ReactCurrentBatchConfig,
  renderExpirationTime$1 = 0,
  currentlyRenderingFiber$1 = null,
  currentHook = null,
  nextCurrentHook = null,
  firstWorkInProgressHook = null,
  workInProgressHook = null,
  nextWorkInProgressHook = null,
  remainingExpirationTime = 0,
  componentUpdateQueue = null,
  sideEffectTag = 0,
  didScheduleRenderPhaseUpdate = !1,
  renderPhaseUpdates = null,
  numberOfReRenders = 0;
function throwInvalidHookError() {
  throw Error(formatProdErrorMessage(321));
}
function areHookInputsEqual(nextDeps, prevDeps) {
  if (null === prevDeps) return !1;
  for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++)
    if (!is$1(nextDeps[i], prevDeps[i])) return !1;
  return !0;
}
function renderWithHooks(
  current,
  workInProgress,
  Component,
  props,
  refOrContext,
  nextRenderExpirationTime
) {
  renderExpirationTime$1 = nextRenderExpirationTime;
  currentlyRenderingFiber$1 = workInProgress;
  nextCurrentHook = null !== current ? current.memoizedState : null;
  ReactCurrentDispatcher$1.current =
    null === nextCurrentHook ? HooksDispatcherOnMount : HooksDispatcherOnUpdate;
  workInProgress = Component(props, refOrContext);
  if (didScheduleRenderPhaseUpdate) {
    do
      (didScheduleRenderPhaseUpdate = !1),
        (numberOfReRenders += 1),
        (nextCurrentHook = null !== current ? current.memoizedState : null),
        (nextWorkInProgressHook = firstWorkInProgressHook),
        (componentUpdateQueue = workInProgressHook = currentHook = null),
        (ReactCurrentDispatcher$1.current = HooksDispatcherOnUpdate),
        (workInProgress = Component(props, refOrContext));
    while (didScheduleRenderPhaseUpdate);
    renderPhaseUpdates = null;
    numberOfReRenders = 0;
  }
  ReactCurrentDispatcher$1.current = ContextOnlyDispatcher;
  current = currentlyRenderingFiber$1;
  current.memoizedState = firstWorkInProgressHook;
  current.expirationTime = remainingExpirationTime;
  current.updateQueue = componentUpdateQueue;
  current.effectTag |= sideEffectTag;
  current = null !== currentHook && null !== currentHook.next;
  renderExpirationTime$1 = 0;
  nextWorkInProgressHook = workInProgressHook = firstWorkInProgressHook = nextCurrentHook = currentHook = currentlyRenderingFiber$1 = null;
  remainingExpirationTime = 0;
  componentUpdateQueue = null;
  sideEffectTag = 0;
  if (current) throw Error(formatProdErrorMessage(300));
  return workInProgress;
}
function resetHooks() {
  ReactCurrentDispatcher$1.current = ContextOnlyDispatcher;
  renderExpirationTime$1 = 0;
  nextWorkInProgressHook = workInProgressHook = firstWorkInProgressHook = nextCurrentHook = currentHook = currentlyRenderingFiber$1 = null;
  remainingExpirationTime = 0;
  componentUpdateQueue = null;
  sideEffectTag = 0;
  didScheduleRenderPhaseUpdate = !1;
  renderPhaseUpdates = null;
  numberOfReRenders = 0;
}
function mountWorkInProgressHook() {
  var hook = {
    memoizedState: null,
    baseState: null,
    queue: null,
    baseUpdate: null,
    next: null
  };
  null === workInProgressHook
    ? (firstWorkInProgressHook = workInProgressHook = hook)
    : (workInProgressHook = workInProgressHook.next = hook);
  return workInProgressHook;
}
function updateWorkInProgressHook() {
  if (null !== nextWorkInProgressHook)
    (workInProgressHook = nextWorkInProgressHook),
      (nextWorkInProgressHook = workInProgressHook.next),
      (currentHook = nextCurrentHook),
      (nextCurrentHook = null !== currentHook ? currentHook.next : null);
  else {
    if (null === nextCurrentHook) throw Error(formatProdErrorMessage(310));
    currentHook = nextCurrentHook;
    var newHook = {
      memoizedState: currentHook.memoizedState,
      baseState: currentHook.baseState,
      queue: currentHook.queue,
      baseUpdate: currentHook.baseUpdate,
      next: null
    };
    workInProgressHook =
      null === workInProgressHook
        ? (firstWorkInProgressHook = newHook)
        : (workInProgressHook.next = newHook);
    nextCurrentHook = currentHook.next;
  }
  return workInProgressHook;
}
function basicStateReducer(state, action) {
  return "function" === typeof action ? action(state) : action;
}
function updateReducer(reducer) {
  var hook = updateWorkInProgressHook(),
    queue = hook.queue;
  if (null === queue) throw Error(formatProdErrorMessage(311));
  queue.lastRenderedReducer = reducer;
  if (0 < numberOfReRenders) {
    var _dispatch = queue.dispatch;
    if (null !== renderPhaseUpdates) {
      var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);
      if (void 0 !== firstRenderPhaseUpdate) {
        renderPhaseUpdates.delete(queue);
        var newState = hook.memoizedState;
        do
          (newState = reducer(newState, firstRenderPhaseUpdate.action)),
            (firstRenderPhaseUpdate = firstRenderPhaseUpdate.next);
        while (null !== firstRenderPhaseUpdate);
        is$1(newState, hook.memoizedState) || (didReceiveUpdate = !0);
        hook.memoizedState = newState;
        hook.baseUpdate === queue.last && (hook.baseState = newState);
        queue.lastRenderedState = newState;
        return [newState, _dispatch];
      }
    }
    return [hook.memoizedState, _dispatch];
  }
  _dispatch = queue.last;
  var baseUpdate = hook.baseUpdate;
  newState = hook.baseState;
  null !== baseUpdate
    ? (null !== _dispatch && (_dispatch.next = null),
      (_dispatch = baseUpdate.next))
    : (_dispatch = null !== _dispatch ? _dispatch.next : null);
  if (null !== _dispatch) {
    var newBaseUpdate = (firstRenderPhaseUpdate = null),
      _update = _dispatch,
      didSkip = !1;
    do {
      var updateExpirationTime = _update.expirationTime;
      updateExpirationTime < renderExpirationTime$1
        ? (didSkip ||
            ((didSkip = !0),
            (newBaseUpdate = baseUpdate),
            (firstRenderPhaseUpdate = newState)),
          updateExpirationTime > remainingExpirationTime &&
            ((remainingExpirationTime = updateExpirationTime),
            markUnprocessedUpdateTime(remainingExpirationTime)))
        : (markRenderEventTimeAndConfig(
            updateExpirationTime,
            _update.suspenseConfig
          ),
          (newState =
            _update.eagerReducer === reducer
              ? _update.eagerState
              : reducer(newState, _update.action)));
      baseUpdate = _update;
      _update = _update.next;
    } while (null !== _update && _update !== _dispatch);
    didSkip ||
      ((newBaseUpdate = baseUpdate), (firstRenderPhaseUpdate = newState));
    is$1(newState, hook.memoizedState) || (didReceiveUpdate = !0);
    hook.memoizedState = newState;
    hook.baseUpdate = newBaseUpdate;
    hook.baseState = firstRenderPhaseUpdate;
    queue.lastRenderedState = newState;
  }
  return [hook.memoizedState, queue.dispatch];
}
function mountState(initialState) {
  var hook = mountWorkInProgressHook();
  "function" === typeof initialState && (initialState = initialState());
  hook.memoizedState = hook.baseState = initialState;
  initialState = hook.queue = {
    last: null,
    dispatch: null,
    lastRenderedReducer: basicStateReducer,
    lastRenderedState: initialState
  };
  initialState = initialState.dispatch = dispatchAction.bind(
    null,
    currentlyRenderingFiber$1,
    initialState
  );
  return [hook.memoizedState, initialState];
}
function updateState(initialState) {
  return updateReducer(basicStateReducer, initialState);
}
function pushEffect(tag, create, destroy, deps) {
  tag = { tag: tag, create: create, destroy: destroy, deps: deps, next: null };
  null === componentUpdateQueue
    ? ((componentUpdateQueue = { lastEffect: null }),
      (componentUpdateQueue.lastEffect = tag.next = tag))
    : ((create = componentUpdateQueue.lastEffect),
      null === create
        ? (componentUpdateQueue.lastEffect = tag.next = tag)
        : ((destroy = create.next),
          (create.next = tag),
          (tag.next = destroy),
          (componentUpdateQueue.lastEffect = tag)));
  return tag;
}
function mountEffectImpl(fiberEffectTag, hookEffectTag, create, deps) {
  var hook = mountWorkInProgressHook();
  sideEffectTag |= fiberEffectTag;
  hook.memoizedState = pushEffect(
    hookEffectTag,
    create,
    void 0,
    void 0 === deps ? null : deps
  );
}
function updateEffectImpl(fiberEffectTag, hookEffectTag, create, deps) {
  var hook = updateWorkInProgressHook();
  deps = void 0 === deps ? null : deps;
  var destroy = void 0;
  if (null !== currentHook) {
    var prevEffect = currentHook.memoizedState;
    destroy = prevEffect.destroy;
    if (null !== deps && areHookInputsEqual(deps, prevEffect.deps)) {
      pushEffect(NoEffect$1, create, destroy, deps);
      return;
    }
  }
  sideEffectTag |= fiberEffectTag;
  hook.memoizedState = pushEffect(hookEffectTag, create, destroy, deps);
}
function mountEffect(create, deps) {
  return mountEffectImpl(516, UnmountPassive | MountPassive, create, deps);
}
function updateEffect(create, deps) {
  return updateEffectImpl(516, UnmountPassive | MountPassive, create, deps);
}
function imperativeHandleEffect(create, ref) {
  if ("function" === typeof ref)
    return (
      (create = create()),
      ref(create),
      function() {
        ref(null);
      }
    );
  if (null !== ref && void 0 !== ref)
    return (
      (create = create()),
      (ref.current = create),
      function() {
        ref.current = null;
      }
    );
}
function mountDebugValue() {}
function mountCallback(callback, deps) {
  mountWorkInProgressHook().memoizedState = [
    callback,
    void 0 === deps ? null : deps
  ];
  return callback;
}
function updateCallback(callback, deps) {
  var hook = updateWorkInProgressHook();
  deps = void 0 === deps ? null : deps;
  var prevState = hook.memoizedState;
  if (
    null !== prevState &&
    null !== deps &&
    areHookInputsEqual(deps, prevState[1])
  )
    return prevState[0];
  hook.memoizedState = [callback, deps];
  return callback;
}
function startTransition(setPending, config, callback) {
  var priorityLevel = getCurrentPriorityLevel();
  runWithPriority(98 > priorityLevel ? 98 : priorityLevel, function() {
    setPending(!0);
  });
  runWithPriority(97 < priorityLevel ? 97 : priorityLevel, function() {
    var previousConfig = ReactCurrentBatchConfig$1.suspense;
    ReactCurrentBatchConfig$1.suspense = void 0 === config ? null : config;
    try {
      setPending(!1), callback();
    } finally {
      ReactCurrentBatchConfig$1.suspense = previousConfig;
    }
  });
}
function dispatchAction(fiber, queue, action) {
  if (!(25 > numberOfReRenders)) throw Error(formatProdErrorMessage(301));
  var alternate = fiber.alternate;
  if (
    fiber === currentlyRenderingFiber$1 ||
    (null !== alternate && alternate === currentlyRenderingFiber$1)
  )
    if (
      ((didScheduleRenderPhaseUpdate = !0),
      (fiber = {
        expirationTime: renderExpirationTime$1,
        suspenseConfig: null,
        action: action,
        eagerReducer: null,
        eagerState: null,
        next: null
      }),
      null === renderPhaseUpdates && (renderPhaseUpdates = new Map()),
      (action = renderPhaseUpdates.get(queue)),
      void 0 === action)
    )
      renderPhaseUpdates.set(queue, fiber);
    else {
      for (queue = action; null !== queue.next; ) queue = queue.next;
      queue.next = fiber;
    }
  else {
    var currentTime = requestCurrentTimeForUpdate(),
      suspenseConfig = ReactCurrentBatchConfig.suspense;
    currentTime = computeExpirationForFiber(currentTime, fiber, suspenseConfig);
    suspenseConfig = {
      expirationTime: currentTime,
      suspenseConfig: suspenseConfig,
      action: action,
      eagerReducer: null,
      eagerState: null,
      next: null
    };
    var last = queue.last;
    if (null === last) suspenseConfig.next = suspenseConfig;
    else {
      var first = last.next;
      null !== first && (suspenseConfig.next = first);
      last.next = suspenseConfig;
    }
    queue.last = suspenseConfig;
    if (
      0 === fiber.expirationTime &&
      (null === alternate || 0 === alternate.expirationTime) &&
      ((alternate = queue.lastRenderedReducer), null !== alternate)
    )
      try {
        var currentState = queue.lastRenderedState,
          eagerState = alternate(currentState, action);
        suspenseConfig.eagerReducer = alternate;
        suspenseConfig.eagerState = eagerState;
        if (is$1(eagerState, currentState)) return;
      } catch (error) {
      } finally {
      }
    scheduleUpdateOnFiber(fiber, currentTime);
  }
}
var ContextOnlyDispatcher = {
    readContext: readContext,
    useCallback: throwInvalidHookError,
    useContext: throwInvalidHookError,
    useEffect: throwInvalidHookError,
    useImperativeHandle: throwInvalidHookError,
    useLayoutEffect: throwInvalidHookError,
    useMemo: throwInvalidHookError,
    useReducer: throwInvalidHookError,
    useRef: throwInvalidHookError,
    useState: throwInvalidHookError,
    useDebugValue: throwInvalidHookError,
    useResponder: throwInvalidHookError,
    useDeferredValue: throwInvalidHookError,
    useTransition: throwInvalidHookError
  },
  HooksDispatcherOnMount = {
    readContext: readContext,
    useCallback: mountCallback,
    useContext: readContext,
    useEffect: mountEffect,
    useImperativeHandle: function(ref, create, deps) {
      deps = null !== deps && void 0 !== deps ? deps.concat([ref]) : null;
      return mountEffectImpl(
        4,
        UnmountMutation | MountLayout,
        imperativeHandleEffect.bind(null, create, ref),
        deps
      );
    },
    useLayoutEffect: function(create, deps) {
      return mountEffectImpl(4, UnmountMutation | MountLayout, create, deps);
    },
    useMemo: function(nextCreate, deps) {
      var hook = mountWorkInProgressHook();
      deps = void 0 === deps ? null : deps;
      nextCreate = nextCreate();
      hook.memoizedState = [nextCreate, deps];
      return nextCreate;
    },
    useReducer: function(reducer, initialArg, init) {
      var hook = mountWorkInProgressHook();
      initialArg = void 0 !== init ? init(initialArg) : initialArg;
      hook.memoizedState = hook.baseState = initialArg;
      reducer = hook.queue = {
        last: null,
        dispatch: null,
        lastRenderedReducer: reducer,
        lastRenderedState: initialArg
      };
      reducer = reducer.dispatch = dispatchAction.bind(
        null,
        currentlyRenderingFiber$1,
        reducer
      );
      return [hook.memoizedState, reducer];
    },
    useRef: function(initialValue) {
      var hook = mountWorkInProgressHook();
      initialValue = { current: initialValue };
      return (hook.memoizedState = initialValue);
    },
    useState: mountState,
    useDebugValue: mountDebugValue,
    useResponder: createResponderListener,
    useDeferredValue: function(value, config) {
      var _mountState = mountState(value),
        prevValue = _mountState[0],
        setValue = _mountState[1];
      mountEffect(
        function() {
          var previousConfig = ReactCurrentBatchConfig$1.suspense;
          ReactCurrentBatchConfig$1.suspense =
            void 0 === config ? null : config;
          try {
            setValue(value);
          } finally {
            ReactCurrentBatchConfig$1.suspense = previousConfig;
          }
        },
        [value, config]
      );
      return prevValue;
    },
    useTransition: function(config) {
      var _mountState2 = mountState(!1),
        isPending = _mountState2[0];
      _mountState2 = _mountState2[1];
      return [
        mountCallback(startTransition.bind(null, _mountState2, config), [
          _mountState2,
          config
        ]),
        isPending
      ];
    }
  },
  HooksDispatcherOnUpdate = {
    readContext: readContext,
    useCallback: updateCallback,
    useContext: readContext,
    useEffect: updateEffect,
    useImperativeHandle: function(ref, create, deps) {
      deps = null !== deps && void 0 !== deps ? deps.concat([ref]) : null;
      return updateEffectImpl(
        4,
        UnmountMutation | MountLayout,
        imperativeHandleEffect.bind(null, create, ref),
        deps
      );
    },
    useLayoutEffect: function(create, deps) {
      return updateEffectImpl(4, UnmountMutation | MountLayout, create, deps);
    },
    useMemo: function(nextCreate, deps) {
      var hook = updateWorkInProgressHook();
      deps = void 0 === deps ? null : deps;
      var prevState = hook.memoizedState;
      if (
        null !== prevState &&
        null !== deps &&
        areHookInputsEqual(deps, prevState[1])
      )
        return prevState[0];
      nextCreate = nextCreate();
      hook.memoizedState = [nextCreate, deps];
      return nextCreate;
    },
    useReducer: updateReducer,
    useRef: function() {
      return updateWorkInProgressHook().memoizedState;
    },
    useState: updateState,
    useDebugValue: mountDebugValue,
    useResponder: createResponderListener,
    useDeferredValue: function(value, config) {
      var _updateState = updateState(value),
        prevValue = _updateState[0],
        setValue = _updateState[1];
      updateEffect(
        function() {
          var previousConfig = ReactCurrentBatchConfig$1.suspense;
          ReactCurrentBatchConfig$1.suspense =
            void 0 === config ? null : config;
          try {
            setValue(value);
          } finally {
            ReactCurrentBatchConfig$1.suspense = previousConfig;
          }
        },
        [value, config]
      );
      return prevValue;
    },
    useTransition: function(config) {
      var _updateState2 = updateState(!1),
        isPending = _updateState2[0];
      _updateState2 = _updateState2[1];
      return [
        updateCallback(startTransition.bind(null, _updateState2, config), [
          _updateState2,
          config
        ]),
        isPending
      ];
    }
  },
  now$1 = Scheduler.unstable_now,
  commitTime = 0,
  profilerStartTime = -1;
function stopProfilerTimerIfRunningAndRecordDelta(fiber, overrideBaseTime) {
  if (0 <= profilerStartTime) {
    var elapsedTime = now$1() - profilerStartTime;
    fiber.actualDuration += elapsedTime;
    overrideBaseTime && (fiber.selfBaseDuration = elapsedTime);
    profilerStartTime = -1;
  }
}
var ReactCurrentOwner$2 = ReactSharedInternals.ReactCurrentOwner,
  didReceiveUpdate = !1;
function reconcileChildren(
  current$$1,
  workInProgress,
  nextChildren,
  renderExpirationTime
) {
  workInProgress.child =
    null === current$$1
      ? mountChildFibers(
          workInProgress,
          null,
          nextChildren,
          renderExpirationTime
        )
      : reconcileChildFibers(
          workInProgress,
          current$$1.child,
          nextChildren,
          renderExpirationTime
        );
}
function updateForwardRef(
  current$$1,
  workInProgress,
  Component,
  nextProps,
  renderExpirationTime
) {
  Component = Component.render;
  var ref = workInProgress.ref;
  prepareToReadContext(workInProgress, renderExpirationTime);
  nextProps = renderWithHooks(
    current$$1,
    workInProgress,
    Component,
    nextProps,
    ref,
    renderExpirationTime
  );
  if (null !== current$$1 && !didReceiveUpdate)
    return (
      (workInProgress.updateQueue = current$$1.updateQueue),
      (workInProgress.effectTag &= -517),
      current$$1.expirationTime <= renderExpirationTime &&
        (current$$1.expirationTime = 0),
      bailoutOnAlreadyFinishedWork(
        current$$1,
        workInProgress,
        renderExpirationTime
      )
    );
  workInProgress.effectTag |= 1;
  reconcileChildren(
    current$$1,
    workInProgress,
    nextProps,
    renderExpirationTime
  );
  return workInProgress.child;
}
function updateMemoComponent(
  current$$1,
  workInProgress,
  Component,
  nextProps,
  updateExpirationTime,
  renderExpirationTime
) {
  if (null === current$$1) {
    var type = Component.type;
    if (
      "function" === typeof type &&
      !shouldConstruct(type) &&
      void 0 === type.defaultProps &&
      null === Component.compare &&
      void 0 === Component.defaultProps
    )
      return (
        (workInProgress.tag = 15),
        (workInProgress.type = type),
        updateSimpleMemoComponent(
          current$$1,
          workInProgress,
          type,
          nextProps,
          updateExpirationTime,
          renderExpirationTime
        )
      );
    current$$1 = createFiberFromTypeAndProps(
      Component.type,
      null,
      nextProps,
      null,
      workInProgress.mode,
      renderExpirationTime
    );
    current$$1.ref = workInProgress.ref;
    current$$1.return = workInProgress;
    return (workInProgress.child = current$$1);
  }
  type = current$$1.child;
  if (
    updateExpirationTime < renderExpirationTime &&
    ((updateExpirationTime = type.memoizedProps),
    (Component = Component.compare),
    (Component = null !== Component ? Component : shallowEqual),
    Component(updateExpirationTime, nextProps) &&
      current$$1.ref === workInProgress.ref)
  )
    return bailoutOnAlreadyFinishedWork(
      current$$1,
      workInProgress,
      renderExpirationTime
    );
  workInProgress.effectTag |= 1;
  current$$1 = createWorkInProgress(type, nextProps, renderExpirationTime);
  current$$1.ref = workInProgress.ref;
  current$$1.return = workInProgress;
  return (workInProgress.child = current$$1);
}
function updateSimpleMemoComponent(
  current$$1,
  workInProgress,
  Component,
  nextProps,
  updateExpirationTime,
  renderExpirationTime
) {
  return null !== current$$1 &&
    shallowEqual(current$$1.memoizedProps, nextProps) &&
    current$$1.ref === workInProgress.ref &&
    ((didReceiveUpdate = !1), updateExpirationTime < renderExpirationTime)
    ? bailoutOnAlreadyFinishedWork(
        current$$1,
        workInProgress,
        renderExpirationTime
      )
    : updateFunctionComponent(
        current$$1,
        workInProgress,
        Component,
        nextProps,
        renderExpirationTime
      );
}
function markRef(current$$1, workInProgress) {
  var ref = workInProgress.ref;
  if (
    (null === current$$1 && null !== ref) ||
    (null !== current$$1 && current$$1.ref !== ref)
  )
    workInProgress.effectTag |= 128;
}
function updateFunctionComponent(
  current$$1,
  workInProgress,
  Component,
  nextProps,
  renderExpirationTime
) {
  var context = isContextProvider(Component)
    ? previousContext
    : contextStackCursor.current;
  context = getMaskedContext(workInProgress, context);
  prepareToReadContext(workInProgress, renderExpirationTime);
  Component = renderWithHooks(
    current$$1,
    workInProgress,
    Component,
    nextProps,
    context,
    renderExpirationTime
  );
  if (null !== current$$1 && !didReceiveUpdate)
    return (
      (workInProgress.updateQueue = current$$1.updateQueue),
      (workInProgress.effectTag &= -517),
      current$$1.expirationTime <= renderExpirationTime &&
        (current$$1.expirationTime = 0),
      bailoutOnAlreadyFinishedWork(
        current$$1,
        workInProgress,
        renderExpirationTime
      )
    );
  workInProgress.effectTag |= 1;
  reconcileChildren(
    current$$1,
    workInProgress,
    Component,
    renderExpirationTime
  );
  return workInProgress.child;
}
function updateClassComponent(
  current$$1,
  workInProgress,
  Component,
  nextProps,
  renderExpirationTime
) {
  if (isContextProvider(Component)) {
    var hasContext = !0;
    pushContextProvider(workInProgress);
  } else hasContext = !1;
  prepareToReadContext(workInProgress, renderExpirationTime);
  if (null === workInProgress.stateNode)
    null !== current$$1 &&
      ((current$$1.alternate = null),
      (workInProgress.alternate = null),
      (workInProgress.effectTag |= 2)),
      constructClassInstance(
        workInProgress,
        Component,
        nextProps,
        renderExpirationTime
      ),
      mountClassInstance(
        workInProgress,
        Component,
        nextProps,
        renderExpirationTime
      ),
      (nextProps = !0);
  else if (null === current$$1) {
    var instance = workInProgress.stateNode,
      oldProps = workInProgress.memoizedProps;
    instance.props = oldProps;
    var oldContext = instance.context,
      contextType = Component.contextType;
    "object" === typeof contextType && null !== contextType
      ? (contextType = readContext(contextType))
      : ((contextType = isContextProvider(Component)
          ? previousContext
          : contextStackCursor.current),
        (contextType = getMaskedContext(workInProgress, contextType)));
    var getDerivedStateFromProps = Component.getDerivedStateFromProps,
      hasNewLifecycles =
        "function" === typeof getDerivedStateFromProps ||
        "function" === typeof instance.getSnapshotBeforeUpdate;
    hasNewLifecycles ||
      ("function" !== typeof instance.UNSAFE_componentWillReceiveProps &&
        "function" !== typeof instance.componentWillReceiveProps) ||
      ((oldProps !== nextProps || oldContext !== contextType) &&
        callComponentWillReceiveProps(
          workInProgress,
          instance,
          nextProps,
          contextType
        ));
    hasForceUpdate = !1;
    var oldState = workInProgress.memoizedState;
    oldContext = instance.state = oldState;
    var updateQueue = workInProgress.updateQueue;
    null !== updateQueue &&
      (processUpdateQueue(
        workInProgress,
        updateQueue,
        nextProps,
        instance,
        renderExpirationTime
      ),
      (oldContext = workInProgress.memoizedState));
    oldProps !== nextProps ||
    oldState !== oldContext ||
    didPerformWorkStackCursor.current ||
    hasForceUpdate
      ? ("function" === typeof getDerivedStateFromProps &&
          (applyDerivedStateFromProps(
            workInProgress,
            Component,
            getDerivedStateFromProps,
            nextProps
          ),
          (oldContext = workInProgress.memoizedState)),
        (oldProps =
          hasForceUpdate ||
          checkShouldComponentUpdate(
            workInProgress,
            Component,
            oldProps,
            nextProps,
            oldState,
            oldContext,
            contextType
          ))
          ? (hasNewLifecycles ||
              ("function" !== typeof instance.UNSAFE_componentWillMount &&
                "function" !== typeof instance.componentWillMount) ||
              (startPhaseTimer(workInProgress, "componentWillMount"),
              "function" === typeof instance.componentWillMount &&
                instance.componentWillMount(),
              "function" === typeof instance.UNSAFE_componentWillMount &&
                instance.UNSAFE_componentWillMount(),
              stopPhaseTimer()),
            "function" === typeof instance.componentDidMount &&
              (workInProgress.effectTag |= 4))
          : ("function" === typeof instance.componentDidMount &&
              (workInProgress.effectTag |= 4),
            (workInProgress.memoizedProps = nextProps),
            (workInProgress.memoizedState = oldContext)),
        (instance.props = nextProps),
        (instance.state = oldContext),
        (instance.context = contextType),
        (nextProps = oldProps))
      : ("function" === typeof instance.componentDidMount &&
          (workInProgress.effectTag |= 4),
        (nextProps = !1));
  } else
    (instance = workInProgress.stateNode),
      (oldProps = workInProgress.memoizedProps),
      (instance.props =
        workInProgress.type === workInProgress.elementType
          ? oldProps
          : resolveDefaultProps(workInProgress.type, oldProps)),
      (oldContext = instance.context),
      (contextType = Component.contextType),
      "object" === typeof contextType && null !== contextType
        ? (contextType = readContext(contextType))
        : ((contextType = isContextProvider(Component)
            ? previousContext
            : contextStackCursor.current),
          (contextType = getMaskedContext(workInProgress, contextType))),
      (getDerivedStateFromProps = Component.getDerivedStateFromProps),
      (hasNewLifecycles =
        "function" === typeof getDerivedStateFromProps ||
        "function" === typeof instance.getSnapshotBeforeUpdate) ||
        ("function" !== typeof instance.UNSAFE_componentWillReceiveProps &&
          "function" !== typeof instance.componentWillReceiveProps) ||
        ((oldProps !== nextProps || oldContext !== contextType) &&
          callComponentWillReceiveProps(
            workInProgress,
            instance,
            nextProps,
            contextType
          )),
      (hasForceUpdate = !1),
      (oldContext = workInProgress.memoizedState),
      (oldState = instance.state = oldContext),
      (updateQueue = workInProgress.updateQueue),
      null !== updateQueue &&
        (processUpdateQueue(
          workInProgress,
          updateQueue,
          nextProps,
          instance,
          renderExpirationTime
        ),
        (oldState = workInProgress.memoizedState)),
      oldProps !== nextProps ||
      oldContext !== oldState ||
      didPerformWorkStackCursor.current ||
      hasForceUpdate
        ? ("function" === typeof getDerivedStateFromProps &&
            (applyDerivedStateFromProps(
              workInProgress,
              Component,
              getDerivedStateFromProps,
              nextProps
            ),
            (oldState = workInProgress.memoizedState)),
          (getDerivedStateFromProps =
            hasForceUpdate ||
            checkShouldComponentUpdate(
              workInProgress,
              Component,
              oldProps,
              nextProps,
              oldContext,
              oldState,
              contextType
            ))
            ? (hasNewLifecycles ||
                ("function" !== typeof instance.UNSAFE_componentWillUpdate &&
                  "function" !== typeof instance.componentWillUpdate) ||
                (startPhaseTimer(workInProgress, "componentWillUpdate"),
                "function" === typeof instance.componentWillUpdate &&
                  instance.componentWillUpdate(
                    nextProps,
                    oldState,
                    contextType
                  ),
                "function" === typeof instance.UNSAFE_componentWillUpdate &&
                  instance.UNSAFE_componentWillUpdate(
                    nextProps,
                    oldState,
                    contextType
                  ),
                stopPhaseTimer()),
              "function" === typeof instance.componentDidUpdate &&
                (workInProgress.effectTag |= 4),
              "function" === typeof instance.getSnapshotBeforeUpdate &&
                (workInProgress.effectTag |= 256))
            : ("function" !== typeof instance.componentDidUpdate ||
                (oldProps === current$$1.memoizedProps &&
                  oldContext === current$$1.memoizedState) ||
                (workInProgress.effectTag |= 4),
              "function" !== typeof instance.getSnapshotBeforeUpdate ||
                (oldProps === current$$1.memoizedProps &&
                  oldContext === current$$1.memoizedState) ||
                (workInProgress.effectTag |= 256),
              (workInProgress.memoizedProps = nextProps),
              (workInProgress.memoizedState = oldState)),
          (instance.props = nextProps),
          (instance.state = oldState),
          (instance.context = contextType),
          (nextProps = getDerivedStateFromProps))
        : ("function" !== typeof instance.componentDidUpdate ||
            (oldProps === current$$1.memoizedProps &&
              oldContext === current$$1.memoizedState) ||
            (workInProgress.effectTag |= 4),
          "function" !== typeof instance.getSnapshotBeforeUpdate ||
            (oldProps === current$$1.memoizedProps &&
              oldContext === current$$1.memoizedState) ||
            (workInProgress.effectTag |= 256),
          (nextProps = !1));
  return finishClassComponent(
    current$$1,
    workInProgress,
    Component,
    nextProps,
    hasContext,
    renderExpirationTime
  );
}
function finishClassComponent(
  current$$1,
  workInProgress,
  Component,
  shouldUpdate,
  hasContext,
  renderExpirationTime
) {
  markRef(current$$1, workInProgress);
  var didCaptureError = 0 !== (workInProgress.effectTag & 64);
  if (!shouldUpdate && !didCaptureError)
    return (
      hasContext && invalidateContextProvider(workInProgress, Component, !1),
      bailoutOnAlreadyFinishedWork(
        current$$1,
        workInProgress,
        renderExpirationTime
      )
    );
  shouldUpdate = workInProgress.stateNode;
  ReactCurrentOwner$2.current = workInProgress;
  if (
    didCaptureError &&
    "function" !== typeof Component.getDerivedStateFromError
  ) {
    var nextChildren = null;
    profilerStartTime = -1;
  } else nextChildren = shouldUpdate.render();
  workInProgress.effectTag |= 1;
  null !== current$$1 && didCaptureError
    ? ((didCaptureError = nextChildren),
      (workInProgress.child = reconcileChildFibers(
        workInProgress,
        current$$1.child,
        null,
        renderExpirationTime
      )),
      (workInProgress.child = reconcileChildFibers(
        workInProgress,
        null,
        didCaptureError,
        renderExpirationTime
      )))
    : reconcileChildren(
        current$$1,
        workInProgress,
        nextChildren,
        renderExpirationTime
      );
  workInProgress.memoizedState = shouldUpdate.state;
  hasContext && invalidateContextProvider(workInProgress, Component, !0);
  return workInProgress.child;
}
function pushHostRootContext(workInProgress) {
  var root = workInProgress.stateNode;
  root.pendingContext
    ? pushTopLevelContextObject(
        workInProgress,
        root.pendingContext,
        root.pendingContext !== root.context
      )
    : root.context &&
      pushTopLevelContextObject(workInProgress, root.context, !1);
  pushHostContainer(workInProgress, root.containerInfo);
}
var SUSPENDED_MARKER = { dehydrated: null, retryTime: 0 };
function updateSuspenseComponent(
  current$$1,
  workInProgress,
  renderExpirationTime
) {
  var mode = workInProgress.mode,
    nextProps = workInProgress.pendingProps,
    suspenseContext = suspenseStackCursor.current,
    nextDidTimeout = !1,
    didSuspend = 0 !== (workInProgress.effectTag & 64),
    JSCompiler_temp;
  (JSCompiler_temp = didSuspend) ||
    (JSCompiler_temp =
      0 !== (suspenseContext & ForceSuspenseFallback) &&
      (null === current$$1 || null !== current$$1.memoizedState));
  JSCompiler_temp
    ? ((nextDidTimeout = !0), (workInProgress.effectTag &= -65))
    : (null !== current$$1 && null === current$$1.memoizedState) ||
      void 0 === nextProps.fallback ||
      !0 === nextProps.unstable_avoidThisFallback ||
      (suspenseContext |= InvisibleParentSuspenseContext);
  suspenseContext &= SubtreeSuspenseContextMask;
  push(suspenseStackCursor, suspenseContext, workInProgress);
  if (null === current$$1) {
    if (
      void 0 !== nextProps.fallback &&
      (tryToClaimNextHydratableInstance(workInProgress),
      (current$$1 = workInProgress.memoizedState),
      null !== current$$1 &&
        ((current$$1 = current$$1.dehydrated), null !== current$$1))
    )
      return (
        0 === (workInProgress.mode & 2)
          ? (workInProgress.expirationTime = 1073741823)
          : current$$1.data === SUSPENSE_FALLBACK_START_DATA
            ? ((renderExpirationTime = requestCurrentTimeForUpdate()),
              (renderExpirationTime = computeExpirationBucket(
                renderExpirationTime,
                5e3,
                250
              )),
              markSpawnedWork(renderExpirationTime),
              (workInProgress.expirationTime = renderExpirationTime))
            : ((workInProgress.expirationTime = 1), markSpawnedWork(1)),
        null
      );
    if (nextDidTimeout) {
      nextDidTimeout = nextProps.fallback;
      nextProps = createFiberFromFragment(null, mode, 0, null);
      nextProps.return = workInProgress;
      if (0 === (workInProgress.mode & 2))
        for (
          current$$1 =
            null !== workInProgress.memoizedState
              ? workInProgress.child.child
              : workInProgress.child,
            nextProps.child = current$$1;
          null !== current$$1;

        )
          (current$$1.return = nextProps), (current$$1 = current$$1.sibling);
      renderExpirationTime = createFiberFromFragment(
        nextDidTimeout,
        mode,
        renderExpirationTime,
        null
      );
      renderExpirationTime.return = workInProgress;
      nextProps.sibling = renderExpirationTime;
      workInProgress.memoizedState = SUSPENDED_MARKER;
      workInProgress.child = nextProps;
      return renderExpirationTime;
    }
    mode = nextProps.children;
    workInProgress.memoizedState = null;
    return (workInProgress.child = mountChildFibers(
      workInProgress,
      null,
      mode,
      renderExpirationTime
    ));
  }
  suspenseContext = current$$1.memoizedState;
  if (null !== suspenseContext) {
    JSCompiler_temp = suspenseContext.dehydrated;
    if (null !== JSCompiler_temp) {
      if (didSuspend) {
        if (null !== workInProgress.memoizedState)
          return (
            (workInProgress.child = current$$1.child),
            (workInProgress.effectTag |= 64),
            null
          );
        nextDidTimeout = nextProps.fallback;
        nextProps = createFiberFromFragment(null, mode, 0, null);
        nextProps.return = workInProgress;
        nextProps.child = null;
        if (0 === (workInProgress.mode & 2))
          for (
            current$$1 = nextProps.child = workInProgress.child;
            null !== current$$1;

          )
            (current$$1.return = nextProps), (current$$1 = current$$1.sibling);
        else
          reconcileChildFibers(
            workInProgress,
            current$$1.child,
            null,
            renderExpirationTime
          );
        if (workInProgress.mode & 8) {
          current$$1 = 0;
          for (didSuspend = nextProps.child; null !== didSuspend; )
            (current$$1 += didSuspend.treeBaseDuration),
              (didSuspend = didSuspend.sibling);
          nextProps.treeBaseDuration = current$$1;
        }
        renderExpirationTime = createFiberFromFragment(
          nextDidTimeout,
          mode,
          renderExpirationTime,
          null
        );
        renderExpirationTime.return = workInProgress;
        nextProps.sibling = renderExpirationTime;
        renderExpirationTime.effectTag |= 2;
        nextProps.childExpirationTime = 0;
        workInProgress.memoizedState = SUSPENDED_MARKER;
        workInProgress.child = nextProps;
        return renderExpirationTime;
      }
      if (0 === (workInProgress.mode & 2))
        workInProgress = retrySuspenseComponentWithoutHydrating(
          current$$1,
          workInProgress,
          renderExpirationTime
        );
      else if (JSCompiler_temp.data === SUSPENSE_FALLBACK_START_DATA)
        workInProgress = retrySuspenseComponentWithoutHydrating(
          current$$1,
          workInProgress,
          renderExpirationTime
        );
      else if (
        ((mode = current$$1.childExpirationTime >= renderExpirationTime),
        didReceiveUpdate || mode)
      )
        1073741823 > renderExpirationTime &&
          suspenseContext.retryTime <= renderExpirationTime &&
          ((mode = renderExpirationTime + 1),
          (suspenseContext.retryTime = mode),
          scheduleUpdateOnFiber(current$$1, mode)),
          renderDidSuspendDelayIfPossible(),
          (workInProgress = retrySuspenseComponentWithoutHydrating(
            current$$1,
            workInProgress,
            renderExpirationTime
          ));
      else if (JSCompiler_temp.data === SUSPENSE_PENDING_START_DATA)
        (workInProgress.effectTag |= 64),
          (workInProgress.child = current$$1.child),
          (workInProgress = retryDehydratedSuspenseBoundary.bind(
            null,
            current$$1
          )),
          (JSCompiler_temp._reactRetry = workInProgress),
          (workInProgress = null);
      else {
        nextHydratableInstance = getNextHydratable(JSCompiler_temp.nextSibling);
        popToNextHostParent(workInProgress);
        isHydrating = !0;
        for (
          mode = renderExpirationTime = mountChildFibers(
            workInProgress,
            null,
            workInProgress.pendingProps.children,
            renderExpirationTime
          );
          mode;

        )
          (mode.effectTag |= 1024), (mode = mode.sibling);
        workInProgress.child = renderExpirationTime;
        workInProgress = workInProgress.child;
      }
      return workInProgress;
    }
    current$$1 = current$$1.child;
    mode = current$$1.sibling;
    if (nextDidTimeout) {
      nextProps = nextProps.fallback;
      renderExpirationTime = createWorkInProgress(
        current$$1,
        current$$1.pendingProps,
        0
      );
      renderExpirationTime.return = workInProgress;
      if (
        0 === (workInProgress.mode & 2) &&
        ((nextDidTimeout =
          null !== workInProgress.memoizedState
            ? workInProgress.child.child
            : workInProgress.child),
        nextDidTimeout !== current$$1.child)
      )
        for (
          renderExpirationTime.child = nextDidTimeout;
          null !== nextDidTimeout;

        )
          (nextDidTimeout.return = renderExpirationTime),
            (nextDidTimeout = nextDidTimeout.sibling);
      if (workInProgress.mode & 8) {
        nextDidTimeout = 0;
        for (current$$1 = renderExpirationTime.child; null !== current$$1; )
          (nextDidTimeout += current$$1.treeBaseDuration),
            (current$$1 = current$$1.sibling);
        renderExpirationTime.treeBaseDuration = nextDidTimeout;
      }
      mode = createWorkInProgress(mode, nextProps, mode.expirationTime);
      mode.return = workInProgress;
      renderExpirationTime.sibling = mode;
      renderExpirationTime.childExpirationTime = 0;
      workInProgress.memoizedState = SUSPENDED_MARKER;
      workInProgress.child = renderExpirationTime;
      return mode;
    }
    renderExpirationTime = reconcileChildFibers(
      workInProgress,
      current$$1.child,
      nextProps.children,
      renderExpirationTime
    );
    workInProgress.memoizedState = null;
    return (workInProgress.child = renderExpirationTime);
  }
  current$$1 = current$$1.child;
  if (nextDidTimeout) {
    nextDidTimeout = nextProps.fallback;
    nextProps = createFiberFromFragment(null, mode, 0, null);
    nextProps.return = workInProgress;
    nextProps.child = current$$1;
    null !== current$$1 && (current$$1.return = nextProps);
    if (0 === (workInProgress.mode & 2))
      for (
        current$$1 =
          null !== workInProgress.memoizedState
            ? workInProgress.child.child
            : workInProgress.child,
          nextProps.child = current$$1;
        null !== current$$1;

      )
        (current$$1.return = nextProps), (current$$1 = current$$1.sibling);
    if (workInProgress.mode & 8) {
      current$$1 = 0;
      for (didSuspend = nextProps.child; null !== didSuspend; )
        (current$$1 += didSuspend.treeBaseDuration),
          (didSuspend = didSuspend.sibling);
      nextProps.treeBaseDuration = current$$1;
    }
    renderExpirationTime = createFiberFromFragment(
      nextDidTimeout,
      mode,
      renderExpirationTime,
      null
    );
    renderExpirationTime.return = workInProgress;
    nextProps.sibling = renderExpirationTime;
    renderExpirationTime.effectTag |= 2;
    nextProps.childExpirationTime = 0;
    workInProgress.memoizedState = SUSPENDED_MARKER;
    workInProgress.child = nextProps;
    return renderExpirationTime;
  }
  workInProgress.memoizedState = null;
  return (workInProgress.child = reconcileChildFibers(
    workInProgress,
    current$$1,
    nextProps.children,
    renderExpirationTime
  ));
}
function retrySuspenseComponentWithoutHydrating(
  current$$1,
  workInProgress,
  renderExpirationTime
) {
  workInProgress.memoizedState = null;
  reconcileChildren(
    current$$1,
    workInProgress,
    workInProgress.pendingProps.children,
    renderExpirationTime
  );
  return workInProgress.child;
}
function scheduleWorkOnFiber(fiber, renderExpirationTime) {
  fiber.expirationTime < renderExpirationTime &&
    (fiber.expirationTime = renderExpirationTime);
  var alternate = fiber.alternate;
  null !== alternate &&
    alternate.expirationTime < renderExpirationTime &&
    (alternate.expirationTime = renderExpirationTime);
  scheduleWorkOnParentPath(fiber.return, renderExpirationTime);
}
function initSuspenseListRenderState(
  workInProgress,
  isBackwards,
  tail,
  lastContentRow,
  tailMode,
  lastEffectBeforeRendering
) {
  var renderState = workInProgress.memoizedState;
  null === renderState
    ? (workInProgress.memoizedState = {
        isBackwards: isBackwards,
        rendering: null,
        last: lastContentRow,
        tail: tail,
        tailExpiration: 0,
        tailMode: tailMode,
        lastEffect: lastEffectBeforeRendering
      })
    : ((renderState.isBackwards = isBackwards),
      (renderState.rendering = null),
      (renderState.last = lastContentRow),
      (renderState.tail = tail),
      (renderState.tailExpiration = 0),
      (renderState.tailMode = tailMode),
      (renderState.lastEffect = lastEffectBeforeRendering));
}
function updateSuspenseListComponent(
  current$$1,
  workInProgress,
  renderExpirationTime
) {
  var nextProps = workInProgress.pendingProps,
    revealOrder = nextProps.revealOrder,
    tailMode = nextProps.tail;
  reconcileChildren(
    current$$1,
    workInProgress,
    nextProps.children,
    renderExpirationTime
  );
  nextProps = suspenseStackCursor.current;
  if (0 !== (nextProps & ForceSuspenseFallback))
    (nextProps =
      (nextProps & SubtreeSuspenseContextMask) | ForceSuspenseFallback),
      (workInProgress.effectTag |= 64);
  else {
    if (null !== current$$1 && 0 !== (current$$1.effectTag & 64))
      a: for (current$$1 = workInProgress.child; null !== current$$1; ) {
        if (13 === current$$1.tag)
          null !== current$$1.memoizedState &&
            scheduleWorkOnFiber(current$$1, renderExpirationTime);
        else if (19 === current$$1.tag)
          scheduleWorkOnFiber(current$$1, renderExpirationTime);
        else if (null !== current$$1.child) {
          current$$1.child.return = current$$1;
          current$$1 = current$$1.child;
          continue;
        }
        if (current$$1 === workInProgress) break a;
        for (; null === current$$1.sibling; ) {
          if (
            null === current$$1.return ||
            current$$1.return === workInProgress
          )
            break a;
          current$$1 = current$$1.return;
        }
        current$$1.sibling.return = current$$1.return;
        current$$1 = current$$1.sibling;
      }
    nextProps &= SubtreeSuspenseContextMask;
  }
  push(suspenseStackCursor, nextProps, workInProgress);
  if (0 === (workInProgress.mode & 2)) workInProgress.memoizedState = null;
  else
    switch (revealOrder) {
      case "forwards":
        renderExpirationTime = workInProgress.child;
        for (revealOrder = null; null !== renderExpirationTime; )
          (current$$1 = renderExpirationTime.alternate),
            null !== current$$1 &&
              null === findFirstSuspended(current$$1) &&
              (revealOrder = renderExpirationTime),
            (renderExpirationTime = renderExpirationTime.sibling);
        renderExpirationTime = revealOrder;
        null === renderExpirationTime
          ? ((revealOrder = workInProgress.child),
            (workInProgress.child = null))
          : ((revealOrder = renderExpirationTime.sibling),
            (renderExpirationTime.sibling = null));
        initSuspenseListRenderState(
          workInProgress,
          !1,
          revealOrder,
          renderExpirationTime,
          tailMode,
          workInProgress.lastEffect
        );
        break;
      case "backwards":
        renderExpirationTime = null;
        revealOrder = workInProgress.child;
        for (workInProgress.child = null; null !== revealOrder; ) {
          current$$1 = revealOrder.alternate;
          if (null !== current$$1 && null === findFirstSuspended(current$$1)) {
            workInProgress.child = revealOrder;
            break;
          }
          current$$1 = revealOrder.sibling;
          revealOrder.sibling = renderExpirationTime;
          renderExpirationTime = revealOrder;
          revealOrder = current$$1;
        }
        initSuspenseListRenderState(
          workInProgress,
          !0,
          renderExpirationTime,
          null,
          tailMode,
          workInProgress.lastEffect
        );
        break;
      case "together":
        initSuspenseListRenderState(
          workInProgress,
          !1,
          null,
          null,
          void 0,
          workInProgress.lastEffect
        );
        break;
      default:
        workInProgress.memoizedState = null;
    }
  return workInProgress.child;
}
function bailoutOnAlreadyFinishedWork(
  current$$1,
  workInProgress,
  renderExpirationTime
) {
  cancelWorkTimer(workInProgress);
  null !== current$$1 &&
    (workInProgress.dependencies = current$$1.dependencies);
  profilerStartTime = -1;
  var updateExpirationTime = workInProgress.expirationTime;
  0 !== updateExpirationTime && markUnprocessedUpdateTime(updateExpirationTime);
  if (workInProgress.childExpirationTime < renderExpirationTime) return null;
  if (null !== current$$1 && workInProgress.child !== current$$1.child)
    throw Error(formatProdErrorMessage(153));
  if (null !== workInProgress.child) {
    current$$1 = workInProgress.child;
    renderExpirationTime = createWorkInProgress(
      current$$1,
      current$$1.pendingProps,
      current$$1.expirationTime
    );
    workInProgress.child = renderExpirationTime;
    for (
      renderExpirationTime.return = workInProgress;
      null !== current$$1.sibling;

    )
      (current$$1 = current$$1.sibling),
        (renderExpirationTime = renderExpirationTime.sibling = createWorkInProgress(
          current$$1,
          current$$1.pendingProps,
          current$$1.expirationTime
        )),
        (renderExpirationTime.return = workInProgress);
    renderExpirationTime.sibling = null;
  }
  return workInProgress.child;
}
var emptyObject$1 = {};
function collectScopedNodesFromChildren(
  startingChild,
  fn$jscomp$0,
  scopedNodes$jscomp$0
) {
  for (; null !== startingChild; ) {
    var node = startingChild,
      fn = fn$jscomp$0,
      scopedNodes = scopedNodes$jscomp$0;
    if (5 === node.tag) {
      var _type = node.type,
        memoizedProps = node.memoizedProps,
        _instance = node.stateNode;
      null !== _instance &&
        !0 === fn(_type, memoizedProps || emptyObject$1, _instance) &&
        scopedNodes.push(_instance);
    }
    _type = node.child;
    13 === node.tag &&
      null !== node.memoizedState &&
      (_type = node.child.sibling.child);
    null !== _type && collectScopedNodesFromChildren(_type, fn, scopedNodes);
    startingChild = startingChild.sibling;
  }
}
function collectFirstScopedNodeFromChildren(startingChild, fn$jscomp$0) {
  for (; null !== startingChild; ) {
    a: {
      var scopedNode = startingChild;
      var fn = fn$jscomp$0;
      if (5 === scopedNode.tag) {
        var _type2 = scopedNode.type,
          memoizedProps = scopedNode.memoizedProps,
          _instance2 = scopedNode.stateNode;
        if (
          null !== _instance2 &&
          !0 === fn(_type2, memoizedProps, _instance2)
        ) {
          scopedNode = _instance2;
          break a;
        }
      }
      _type2 = scopedNode.child;
      13 === scopedNode.tag &&
        null !== scopedNode.memoizedState &&
        (_type2 = scopedNode.child.sibling.child);
      scopedNode =
        null !== _type2 ? collectFirstScopedNodeFromChildren(_type2, fn) : null;
    }
    if (null !== scopedNode) return scopedNode;
    startingChild = startingChild.sibling;
  }
  return null;
}
function collectNearestChildScopeMethods(
  startingChild,
  scope$jscomp$0,
  childrenScopes$jscomp$0
) {
  for (; null !== startingChild; ) {
    var node = startingChild,
      scope = scope$jscomp$0,
      childrenScopes = childrenScopes$jscomp$0;
    if (21 === node.tag && node.type === scope && null !== node.stateNode)
      childrenScopes.push(node.stateNode.methods);
    else {
      var child = node.child;
      13 === node.tag &&
        null !== node.memoizedState &&
        (child = node.child.sibling.child);
      null !== child &&
        collectNearestChildScopeMethods(child, scope, childrenScopes);
    }
    startingChild = startingChild.sibling;
  }
}
function createScopeMethods(scope, instance) {
  return {
    getChildren: function() {
      var child = instance.fiber.child,
        childrenScopes = [];
      null !== child &&
        collectNearestChildScopeMethods(child, scope, childrenScopes);
      return 0 === childrenScopes.length ? null : childrenScopes;
    },
    getChildrenFromRoot: function() {
      for (var node = instance.fiber; null !== node; ) {
        var parent = node.return;
        if (null === parent) break;
        node = parent;
        if (21 === node.tag && node.type === scope) break;
      }
      parent = [];
      collectNearestChildScopeMethods(node.child, scope, parent);
      return 0 === parent.length ? null : parent;
    },
    getParent: function() {
      for (var node = instance.fiber.return; null !== node; ) {
        if (21 === node.tag && node.type === scope)
          return node.stateNode.methods;
        node = node.return;
      }
      return null;
    },
    getProps: function() {
      return instance.fiber.memoizedProps;
    },
    queryAllNodes: function(fn) {
      var child = instance.fiber.child,
        scopedNodes = [];
      null !== child && collectScopedNodesFromChildren(child, fn, scopedNodes);
      return 0 === scopedNodes.length ? null : scopedNodes;
    },
    queryFirstNode: function(fn) {
      var child = instance.fiber.child;
      return null !== child
        ? collectFirstScopedNodeFromChildren(child, fn)
        : null;
    },
    containsNode: function(node) {
      for (node = getClosestInstanceFromNode(node) || null; null !== node; ) {
        if (
          21 === node.tag &&
          node.type === scope &&
          node.stateNode === instance
        )
          return !0;
        node = node.return;
      }
      return !1;
    }
  };
}
function markUpdate(workInProgress) {
  workInProgress.effectTag |= 4;
}
var appendAllChildren,
  updateHostContainer,
  updateHostComponent$1,
  updateHostText$1;
appendAllChildren = function(parent, workInProgress) {
  for (var node = workInProgress.child; null !== node; ) {
    if (5 === node.tag || 6 === node.tag) parent.appendChild(node.stateNode);
    else if (4 !== node.tag && null !== node.child) {
      node.child.return = node;
      node = node.child;
      continue;
    }
    if (node === workInProgress) break;
    for (; null === node.sibling; ) {
      if (null === node.return || node.return === workInProgress) return;
      node = node.return;
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
};
updateHostContainer = function() {};
updateHostComponent$1 = function(
  current,
  workInProgress,
  type,
  newProps,
  rootContainerInstance
) {
  var oldProps = current.memoizedProps;
  if (oldProps !== newProps) {
    var instance = workInProgress.stateNode;
    requiredContext(contextStackCursor$1.current);
    current = null;
    switch (type) {
      case "input":
        oldProps = getHostProps(instance, oldProps);
        newProps = getHostProps(instance, newProps);
        current = [];
        break;
      case "option":
        oldProps = getHostProps$1(instance, oldProps);
        newProps = getHostProps$1(instance, newProps);
        current = [];
        break;
      case "select":
        oldProps = Object.assign({}, oldProps, { value: void 0 });
        newProps = Object.assign({}, newProps, { value: void 0 });
        current = [];
        break;
      case "textarea":
        oldProps = getHostProps$3(instance, oldProps);
        newProps = getHostProps$3(instance, newProps);
        current = [];
        break;
      default:
        "function" !== typeof oldProps.onClick &&
          "function" === typeof newProps.onClick &&
          (instance.onclick = noop);
    }
    assertValidProps(type, newProps);
    var propKey, styleName;
    type = null;
    for (propKey in oldProps)
      if (
        !newProps.hasOwnProperty(propKey) &&
        oldProps.hasOwnProperty(propKey) &&
        null != oldProps[propKey]
      )
        if ("style" === propKey)
          for (styleName in ((instance = oldProps[propKey]), instance))
            instance.hasOwnProperty(styleName) &&
              (type || (type = {}), (type[styleName] = ""));
        else
          "dangerouslySetInnerHTML" !== propKey &&
            "children" !== propKey &&
            "DEPRECATED_flareListeners" !== propKey &&
            "suppressContentEditableWarning" !== propKey &&
            "suppressHydrationWarning" !== propKey &&
            "autoFocus" !== propKey &&
            (registrationNameModules.hasOwnProperty(propKey)
              ? current || (current = [])
              : (current = current || []).push(propKey, null));
    for (propKey in newProps) {
      var nextProp = newProps[propKey];
      instance = null != oldProps ? oldProps[propKey] : void 0;
      if (
        newProps.hasOwnProperty(propKey) &&
        nextProp !== instance &&
        (null != nextProp || null != instance)
      )
        if ("style" === propKey)
          if (instance) {
            for (styleName in instance)
              !instance.hasOwnProperty(styleName) ||
                (nextProp && nextProp.hasOwnProperty(styleName)) ||
                (type || (type = {}), (type[styleName] = ""));
            for (styleName in nextProp)
              nextProp.hasOwnProperty(styleName) &&
                instance[styleName] !== nextProp[styleName] &&
                (type || (type = {}), (type[styleName] = nextProp[styleName]));
          } else
            type || (current || (current = []), current.push(propKey, type)),
              (type = nextProp);
        else
          "dangerouslySetInnerHTML" === propKey
            ? ((nextProp = nextProp ? nextProp.__html : void 0),
              (instance = instance ? instance.__html : void 0),
              null != nextProp &&
                instance !== nextProp &&
                (current = current || []).push(
                  propKey,
                  toStringOrTrustedType(nextProp)
                ))
            : "children" === propKey
              ? instance === nextProp ||
                ("string" !== typeof nextProp &&
                  "number" !== typeof nextProp) ||
                (current = current || []).push(propKey, "" + nextProp)
              : "DEPRECATED_flareListeners" !== propKey &&
                "suppressContentEditableWarning" !== propKey &&
                "suppressHydrationWarning" !== propKey &&
                (registrationNameModules.hasOwnProperty(propKey)
                  ? (null != nextProp &&
                      ensureListeningTo(rootContainerInstance, propKey),
                    current || instance === nextProp || (current = []))
                  : (current = current || []).push(propKey, nextProp));
    }
    type && (current = current || []).push("style", type);
    rootContainerInstance = current;
    (workInProgress.updateQueue = rootContainerInstance) &&
      markUpdate(workInProgress);
  }
};
updateHostText$1 = function(current, workInProgress, oldText, newText) {
  oldText !== newText && markUpdate(workInProgress);
};
function cutOffTailIfNeeded(renderState, hasRenderedATailFallback) {
  switch (renderState.tailMode) {
    case "hidden":
      hasRenderedATailFallback = renderState.tail;
      for (var lastTailNode = null; null !== hasRenderedATailFallback; )
        null !== hasRenderedATailFallback.alternate &&
          (lastTailNode = hasRenderedATailFallback),
          (hasRenderedATailFallback = hasRenderedATailFallback.sibling);
      null === lastTailNode
        ? (renderState.tail = null)
        : (lastTailNode.sibling = null);
      break;
    case "collapsed":
      lastTailNode = renderState.tail;
      for (var _lastTailNode = null; null !== lastTailNode; )
        null !== lastTailNode.alternate && (_lastTailNode = lastTailNode),
          (lastTailNode = lastTailNode.sibling);
      null === _lastTailNode
        ? hasRenderedATailFallback || null === renderState.tail
          ? (renderState.tail = null)
          : (renderState.tail.sibling = null)
        : (_lastTailNode.sibling = null);
  }
}
function completeWork(current, workInProgress, renderExpirationTime) {
  var newProps = workInProgress.pendingProps;
  switch (workInProgress.tag) {
    case 2:
      break;
    case 16:
      break;
    case 15:
    case 0:
      break;
    case 1:
      isContextProvider(workInProgress.type) && popContext(workInProgress);
      break;
    case 3:
      popHostContainer(workInProgress);
      popTopLevelContextObject(workInProgress);
      newProps = workInProgress.stateNode;
      newProps.pendingContext &&
        ((newProps.context = newProps.pendingContext),
        (newProps.pendingContext = null));
      (null === current || null === current.child) &&
        popHydrationState(workInProgress) &&
        markUpdate(workInProgress);
      updateHostContainer(workInProgress);
      break;
    case 5:
      popHostContext(workInProgress);
      renderExpirationTime = requiredContext(rootInstanceStackCursor.current);
      var type = workInProgress.type;
      if (null !== current && null != workInProgress.stateNode)
        updateHostComponent$1(
          current,
          workInProgress,
          type,
          newProps,
          renderExpirationTime
        ),
          current.memoizedProps.DEPRECATED_flareListeners !==
            newProps.DEPRECATED_flareListeners && markUpdate(workInProgress),
          current.ref !== workInProgress.ref &&
            (workInProgress.effectTag |= 128);
      else if (newProps) {
        current = requiredContext(contextStackCursor$1.current);
        if (popHydrationState(workInProgress)) {
          type = workInProgress.stateNode;
          var type$jscomp$0 = workInProgress.type;
          current = workInProgress.memoizedProps;
          type[internalInstanceKey] = workInProgress;
          type[internalEventHandlersKey] = current;
          switch (type$jscomp$0) {
            case "iframe":
            case "object":
            case "embed":
              trapBubbledEvent("load", type);
              break;
            case "video":
            case "audio":
              for (var i = 0; i < mediaEventTypes.length; i++)
                trapBubbledEvent(mediaEventTypes[i], type);
              break;
            case "source":
              trapBubbledEvent("error", type);
              break;
            case "img":
            case "image":
            case "link":
              trapBubbledEvent("error", type);
              trapBubbledEvent("load", type);
              break;
            case "form":
              trapBubbledEvent("reset", type);
              trapBubbledEvent("submit", type);
              break;
            case "details":
              trapBubbledEvent("toggle", type);
              break;
            case "input":
              initWrapperState(type, current);
              trapBubbledEvent("invalid", type);
              ensureListeningTo(renderExpirationTime, "onChange");
              break;
            case "select":
              type._wrapperState = { wasMultiple: !!current.multiple };
              trapBubbledEvent("invalid", type);
              ensureListeningTo(renderExpirationTime, "onChange");
              break;
            case "textarea":
              initWrapperState$2(type, current),
                trapBubbledEvent("invalid", type),
                ensureListeningTo(renderExpirationTime, "onChange");
          }
          assertValidProps(type$jscomp$0, current);
          i = null;
          for (var propKey in current)
            if (current.hasOwnProperty(propKey)) {
              var nextProp = current[propKey];
              "children" === propKey
                ? "string" === typeof nextProp
                  ? type.textContent !== nextProp &&
                    (i = ["children", nextProp])
                  : "number" === typeof nextProp &&
                    type.textContent !== "" + nextProp &&
                    (i = ["children", "" + nextProp])
                : registrationNameModules.hasOwnProperty(propKey) &&
                  null != nextProp &&
                  ensureListeningTo(renderExpirationTime, propKey);
            }
          switch (type$jscomp$0) {
            case "input":
              track(type);
              postMountWrapper(type, current, !0);
              break;
            case "textarea":
              track(type);
              postMountWrapper$3(type, current);
              break;
            case "select":
            case "option":
              break;
            default:
              "function" === typeof current.onClick && (type.onclick = noop);
          }
          type = i;
          workInProgress.updateQueue = type;
          null !== type && markUpdate(workInProgress);
          newProps = newProps.DEPRECATED_flareListeners;
          null != newProps &&
            updateLegacyEventListeners(
              newProps,
              workInProgress,
              renderExpirationTime
            );
        } else {
          propKey =
            9 === renderExpirationTime.nodeType
              ? renderExpirationTime
              : renderExpirationTime.ownerDocument;
          current === Namespaces.html &&
            (current = getIntrinsicNamespace(type));
          current === Namespaces.html
            ? "script" === type
              ? ((current = propKey.createElement("div")),
                (current.innerHTML = "<script>\x3c/script>"),
                (current = current.removeChild(current.firstChild)))
              : "string" === typeof newProps.is
                ? (current = propKey.createElement(type, { is: newProps.is }))
                : ((current = propKey.createElement(type)),
                  "select" === type &&
                    ((propKey = current),
                    newProps.multiple
                      ? (propKey.multiple = !0)
                      : newProps.size && (propKey.size = newProps.size)))
            : (current = propKey.createElementNS(current, type));
          current[internalInstanceKey] = workInProgress;
          current[internalEventHandlersKey] = newProps;
          appendAllChildren(current, workInProgress, !1, !1);
          workInProgress.stateNode = current;
          propKey = newProps.DEPRECATED_flareListeners;
          null != propKey &&
            updateLegacyEventListeners(
              propKey,
              workInProgress,
              renderExpirationTime
            );
          propKey = isCustomComponent(type, newProps);
          switch (type) {
            case "iframe":
            case "object":
            case "embed":
              trapBubbledEvent("load", current);
              i = newProps;
              break;
            case "video":
            case "audio":
              for (i = 0; i < mediaEventTypes.length; i++)
                trapBubbledEvent(mediaEventTypes[i], current);
              i = newProps;
              break;
            case "source":
              trapBubbledEvent("error", current);
              i = newProps;
              break;
            case "img":
            case "image":
            case "link":
              trapBubbledEvent("error", current);
              trapBubbledEvent("load", current);
              i = newProps;
              break;
            case "form":
              trapBubbledEvent("reset", current);
              trapBubbledEvent("submit", current);
              i = newProps;
              break;
            case "details":
              trapBubbledEvent("toggle", current);
              i = newProps;
              break;
            case "input":
              initWrapperState(current, newProps);
              i = getHostProps(current, newProps);
              trapBubbledEvent("invalid", current);
              ensureListeningTo(renderExpirationTime, "onChange");
              break;
            case "option":
              i = getHostProps$1(current, newProps);
              break;
            case "select":
              current._wrapperState = { wasMultiple: !!newProps.multiple };
              i = Object.assign({}, newProps, { value: void 0 });
              trapBubbledEvent("invalid", current);
              ensureListeningTo(renderExpirationTime, "onChange");
              break;
            case "textarea":
              initWrapperState$2(current, newProps);
              i = getHostProps$3(current, newProps);
              trapBubbledEvent("invalid", current);
              ensureListeningTo(renderExpirationTime, "onChange");
              break;
            default:
              i = newProps;
          }
          assertValidProps(type, i);
          nextProp = i;
          for (type$jscomp$0 in nextProp)
            if (nextProp.hasOwnProperty(type$jscomp$0)) {
              var nextProp$jscomp$0 = nextProp[type$jscomp$0];
              "style" === type$jscomp$0
                ? setValueForStyles(current, nextProp$jscomp$0)
                : "dangerouslySetInnerHTML" === type$jscomp$0
                  ? ((nextProp$jscomp$0 = nextProp$jscomp$0
                      ? nextProp$jscomp$0.__html
                      : void 0),
                    null != nextProp$jscomp$0 &&
                      setInnerHTML(current, nextProp$jscomp$0))
                  : "children" === type$jscomp$0
                    ? "string" === typeof nextProp$jscomp$0
                      ? ("textarea" !== type || "" !== nextProp$jscomp$0) &&
                        setTextContent(current, nextProp$jscomp$0)
                      : "number" === typeof nextProp$jscomp$0 &&
                        setTextContent(current, "" + nextProp$jscomp$0)
                    : "DEPRECATED_flareListeners" !== type$jscomp$0 &&
                      "suppressContentEditableWarning" !== type$jscomp$0 &&
                      "suppressHydrationWarning" !== type$jscomp$0 &&
                      "autoFocus" !== type$jscomp$0 &&
                      (registrationNameModules.hasOwnProperty(type$jscomp$0)
                        ? null != nextProp$jscomp$0 &&
                          ensureListeningTo(renderExpirationTime, type$jscomp$0)
                        : null != nextProp$jscomp$0 &&
                          setValueForProperty(
                            current,
                            type$jscomp$0,
                            nextProp$jscomp$0,
                            propKey
                          ));
            }
          switch (type) {
            case "input":
              track(current);
              postMountWrapper(current, newProps, !1);
              break;
            case "textarea":
              track(current);
              postMountWrapper$3(current, newProps);
              break;
            case "option":
              null != newProps.value &&
                current.setAttribute(
                  "value",
                  "" + getToStringValue(newProps.value)
                );
              break;
            case "select":
              current.multiple = !!newProps.multiple;
              renderExpirationTime = newProps.value;
              null != renderExpirationTime
                ? updateOptions(
                    current,
                    !!newProps.multiple,
                    renderExpirationTime,
                    !1
                  )
                : null != newProps.defaultValue &&
                  updateOptions(
                    current,
                    !!newProps.multiple,
                    newProps.defaultValue,
                    !0
                  );
              break;
            default:
              "function" === typeof i.onClick && (current.onclick = noop);
          }
          shouldAutoFocusHostComponent(type, newProps) &&
            markUpdate(workInProgress);
        }
        null !== workInProgress.ref && (workInProgress.effectTag |= 128);
      } else if (null === workInProgress.stateNode)
        throw Error(formatProdErrorMessage(166));
      break;
    case 6:
      if (current && null != workInProgress.stateNode)
        updateHostText$1(
          current,
          workInProgress,
          current.memoizedProps,
          newProps
        );
      else {
        if ("string" !== typeof newProps && null === workInProgress.stateNode)
          throw Error(formatProdErrorMessage(166));
        renderExpirationTime = requiredContext(rootInstanceStackCursor.current);
        requiredContext(contextStackCursor$1.current);
        popHydrationState(workInProgress)
          ? ((newProps = workInProgress.stateNode),
            (renderExpirationTime = workInProgress.memoizedProps),
            (newProps[internalInstanceKey] = workInProgress),
            newProps.nodeValue !== renderExpirationTime &&
              markUpdate(workInProgress))
          : ((newProps = (9 === renderExpirationTime.nodeType
              ? renderExpirationTime
              : renderExpirationTime.ownerDocument
            ).createTextNode(newProps)),
            (newProps[internalInstanceKey] = workInProgress),
            (workInProgress.stateNode = newProps));
      }
      break;
    case 11:
      break;
    case 13:
      pop(suspenseStackCursor, workInProgress);
      newProps = workInProgress.memoizedState;
      if (null !== newProps && null !== newProps.dehydrated) {
        if (null === current) {
          if (!popHydrationState(workInProgress))
            throw Error(formatProdErrorMessage(318));
          newProps = workInProgress.memoizedState;
          newProps = null !== newProps ? newProps.dehydrated : null;
          if (!newProps) throw Error(formatProdErrorMessage(317));
          newProps[internalInstanceKey] = workInProgress;
          markSpawnedWork(1);
        } else
          resetHydrationState(),
            0 === (workInProgress.effectTag & 64) &&
              (workInProgress.memoizedState = null),
            (workInProgress.effectTag |= 4);
        break;
      }
      if (0 !== (workInProgress.effectTag & 64))
        return (
          (workInProgress.expirationTime = renderExpirationTime), workInProgress
        );
      newProps = null !== newProps;
      renderExpirationTime = !1;
      null === current
        ? void 0 !== workInProgress.memoizedProps.fallback &&
          popHydrationState(workInProgress)
        : ((type = current.memoizedState),
          (renderExpirationTime = null !== type),
          newProps ||
            null === type ||
            ((type = current.child.sibling),
            null !== type &&
              ((type$jscomp$0 = workInProgress.firstEffect),
              null !== type$jscomp$0
                ? ((workInProgress.firstEffect = type),
                  (type.nextEffect = type$jscomp$0))
                : ((workInProgress.firstEffect = workInProgress.lastEffect = type),
                  (type.nextEffect = null)),
              (type.effectTag = 8))));
      newProps &&
        !renderExpirationTime &&
        0 !== (workInProgress.mode & 2) &&
        ((null === current &&
          !0 !== workInProgress.memoizedProps.unstable_avoidThisFallback) ||
        0 !== (suspenseStackCursor.current & InvisibleParentSuspenseContext)
          ? workInProgressRootExitStatus === RootIncomplete &&
            (workInProgressRootExitStatus = RootSuspended)
          : renderDidSuspendDelayIfPossible());
      if (newProps || renderExpirationTime) workInProgress.effectTag |= 4;
      null !== workInProgress.updateQueue &&
        null != workInProgress.memoizedProps.suspenseCallback &&
        (workInProgress.effectTag |= 4);
      break;
    case 7:
      break;
    case 8:
      break;
    case 12:
      break;
    case 4:
      popHostContainer(workInProgress);
      updateHostContainer(workInProgress);
      break;
    case 10:
      popProvider(workInProgress);
      break;
    case 9:
      break;
    case 14:
      break;
    case 17:
      isContextProvider(workInProgress.type) && popContext(workInProgress);
      break;
    case 19:
      pop(suspenseStackCursor, workInProgress);
      newProps = workInProgress.memoizedState;
      if (null === newProps) break;
      type = 0 !== (workInProgress.effectTag & 64);
      type$jscomp$0 = newProps.rendering;
      if (null === type$jscomp$0)
        if (type) cutOffTailIfNeeded(newProps, !1);
        else {
          if (
            workInProgressRootExitStatus !== RootIncomplete ||
            (null !== current && 0 !== (current.effectTag & 64))
          )
            for (
              type$jscomp$0 = workInProgress.child;
              null !== type$jscomp$0;

            ) {
              current = findFirstSuspended(type$jscomp$0);
              if (null !== current) {
                workInProgress.effectTag |= 64;
                cutOffTailIfNeeded(newProps, !1);
                type = current.updateQueue;
                null !== type &&
                  ((workInProgress.updateQueue = type),
                  (workInProgress.effectTag |= 4));
                null === newProps.lastEffect &&
                  (workInProgress.firstEffect = null);
                workInProgress.lastEffect = newProps.lastEffect;
                newProps = renderExpirationTime;
                for (
                  renderExpirationTime = workInProgress.child;
                  null !== renderExpirationTime;

                )
                  (type = renderExpirationTime),
                    (current = newProps),
                    (type.effectTag &= 2),
                    (type.nextEffect = null),
                    (type.firstEffect = null),
                    (type.lastEffect = null),
                    (type$jscomp$0 = type.alternate),
                    null === type$jscomp$0
                      ? ((type.childExpirationTime = 0),
                        (type.expirationTime = current),
                        (type.child = null),
                        (type.memoizedProps = null),
                        (type.memoizedState = null),
                        (type.updateQueue = null),
                        (type.dependencies = null),
                        (type.selfBaseDuration = 0),
                        (type.treeBaseDuration = 0))
                      : ((type.childExpirationTime =
                          type$jscomp$0.childExpirationTime),
                        (type.expirationTime = type$jscomp$0.expirationTime),
                        (type.child = type$jscomp$0.child),
                        (type.memoizedProps = type$jscomp$0.memoizedProps),
                        (type.memoizedState = type$jscomp$0.memoizedState),
                        (type.updateQueue = type$jscomp$0.updateQueue),
                        (current = type$jscomp$0.dependencies),
                        (type.dependencies =
                          null === current
                            ? null
                            : {
                                expirationTime: current.expirationTime,
                                firstContext: current.firstContext,
                                responders: current.responders
                              }),
                        (type.selfBaseDuration =
                          type$jscomp$0.selfBaseDuration),
                        (type.treeBaseDuration =
                          type$jscomp$0.treeBaseDuration)),
                    (renderExpirationTime = renderExpirationTime.sibling);
                push(
                  suspenseStackCursor,
                  (suspenseStackCursor.current & SubtreeSuspenseContextMask) |
                    ForceSuspenseFallback,
                  workInProgress
                );
                return workInProgress.child;
              }
              type$jscomp$0 = type$jscomp$0.sibling;
            }
        }
      else {
        if (!type)
          if (
            ((current = findFirstSuspended(type$jscomp$0)), null !== current)
          ) {
            if (
              ((workInProgress.effectTag |= 64),
              (type = !0),
              (renderExpirationTime = current.updateQueue),
              null !== renderExpirationTime &&
                ((workInProgress.updateQueue = renderExpirationTime),
                (workInProgress.effectTag |= 4)),
              cutOffTailIfNeeded(newProps, !0),
              null === newProps.tail &&
                "hidden" === newProps.tailMode &&
                !type$jscomp$0.alternate)
            ) {
              workInProgress = workInProgress.lastEffect = newProps.lastEffect;
              null !== workInProgress && (workInProgress.nextEffect = null);
              break;
            }
          } else
            now() > newProps.tailExpiration &&
              1 < renderExpirationTime &&
              ((workInProgress.effectTag |= 64),
              (type = !0),
              cutOffTailIfNeeded(newProps, !1),
              --renderExpirationTime,
              (workInProgress.expirationTime = workInProgress.childExpirationTime = renderExpirationTime),
              markSpawnedWork(renderExpirationTime));
        newProps.isBackwards
          ? ((type$jscomp$0.sibling = workInProgress.child),
            (workInProgress.child = type$jscomp$0))
          : ((renderExpirationTime = newProps.last),
            null !== renderExpirationTime
              ? (renderExpirationTime.sibling = type$jscomp$0)
              : (workInProgress.child = type$jscomp$0),
            (newProps.last = type$jscomp$0));
      }
      if (null !== newProps.tail)
        return (
          0 === newProps.tailExpiration &&
            (newProps.tailExpiration = now() + 500),
          (renderExpirationTime = newProps.tail),
          (newProps.rendering = renderExpirationTime),
          (newProps.tail = renderExpirationTime.sibling),
          (newProps.lastEffect = workInProgress.lastEffect),
          (renderExpirationTime.sibling = null),
          (newProps = suspenseStackCursor.current),
          (newProps = type
            ? (newProps & SubtreeSuspenseContextMask) | ForceSuspenseFallback
            : newProps & SubtreeSuspenseContextMask),
          push(suspenseStackCursor, newProps, workInProgress),
          renderExpirationTime
        );
      break;
    case 20:
      break;
    case 21:
      null === current
        ? ((renderExpirationTime = workInProgress.type),
          (type = { fiber: workInProgress, methods: null }),
          (workInProgress.stateNode = type),
          (type.methods = createScopeMethods(renderExpirationTime, type)),
          (newProps = newProps.DEPRECATED_flareListeners),
          null != newProps &&
            ((renderExpirationTime = requiredContext(
              rootInstanceStackCursor.current
            )),
            updateLegacyEventListeners(
              newProps,
              workInProgress,
              renderExpirationTime
            )),
          null !== workInProgress.ref &&
            ((workInProgress.effectTag |= 128), markUpdate(workInProgress)))
        : ((current.memoizedProps.DEPRECATED_flareListeners ===
            newProps.DEPRECATED_flareListeners &&
            null === workInProgress.ref) ||
            markUpdate(workInProgress),
          current.ref !== workInProgress.ref &&
            (workInProgress.effectTag |= 128));
      break;
    default:
      throw Error(formatProdErrorMessage(156, workInProgress.tag));
  }
  return null;
}
function unwindWork(workInProgress) {
  switch (workInProgress.tag) {
    case 1:
      isContextProvider(workInProgress.type) && popContext(workInProgress);
      var effectTag = workInProgress.effectTag;
      return effectTag & 4096
        ? ((workInProgress.effectTag = (effectTag & -4097) | 64),
          workInProgress)
        : null;
    case 3:
      popHostContainer(workInProgress);
      popTopLevelContextObject(workInProgress);
      effectTag = workInProgress.effectTag;
      if (0 !== (effectTag & 64)) throw Error(formatProdErrorMessage(285));
      workInProgress.effectTag = (effectTag & -4097) | 64;
      return workInProgress;
    case 5:
      return popHostContext(workInProgress), null;
    case 13:
      pop(suspenseStackCursor, workInProgress);
      effectTag = workInProgress.memoizedState;
      if (null !== effectTag && null !== effectTag.dehydrated) {
        if (null === workInProgress.alternate)
          throw Error(formatProdErrorMessage(340));
        resetHydrationState();
      }
      effectTag = workInProgress.effectTag;
      return effectTag & 4096
        ? ((workInProgress.effectTag = (effectTag & -4097) | 64),
          workInProgress)
        : null;
    case 19:
      return pop(suspenseStackCursor, workInProgress), null;
    case 4:
      return popHostContainer(workInProgress), null;
    case 10:
      return popProvider(workInProgress), null;
    default:
      return null;
  }
}
function createCapturedValue(value, source) {
  return {
    value: value,
    source: source,
    stack: getStackByFiberInDevAndProd(source)
  };
}
var ReactFiberErrorDialogWWW = require("ReactFiberErrorDialog");
if ("function" !== typeof ReactFiberErrorDialogWWW.showErrorDialog)
  throw Error(formatProdErrorMessage(320));
function logCapturedError(capturedError) {
  !1 !== ReactFiberErrorDialogWWW.showErrorDialog(capturedError) &&
    console.error(capturedError.error);
}
var PossiblyWeakSet = "function" === typeof WeakSet ? WeakSet : Set;
function logError(boundary, errorInfo) {
  var source = errorInfo.source,
    stack = errorInfo.stack;
  null === stack &&
    null !== source &&
    (stack = getStackByFiberInDevAndProd(source));
  errorInfo = {
    componentName: null !== source ? getComponentName(source.type) : null,
    componentStack: null !== stack ? stack : "",
    error: errorInfo.value,
    errorBoundary: null,
    errorBoundaryName: null,
    errorBoundaryFound: !1,
    willRetry: !1
  };
  null !== boundary &&
    1 === boundary.tag &&
    ((errorInfo.errorBoundary = boundary.stateNode),
    (errorInfo.errorBoundaryName = getComponentName(boundary.type)),
    (errorInfo.errorBoundaryFound = !0),
    (errorInfo.willRetry = !0));
  try {
    logCapturedError(errorInfo);
  } catch (e) {
    setTimeout(function() {
      throw e;
    });
  }
}
function safelyCallComponentWillUnmount(current$$1, instance) {
  try {
    startPhaseTimer(current$$1, "componentWillUnmount"),
      (instance.props = current$$1.memoizedProps),
      (instance.state = current$$1.memoizedState),
      instance.componentWillUnmount(),
      stopPhaseTimer();
  } catch (unmountError) {
    captureCommitPhaseError(current$$1, unmountError);
  }
}
function safelyDetachRef(current$$1) {
  var ref = current$$1.ref;
  if (null !== ref)
    if ("function" === typeof ref)
      try {
        ref(null);
      } catch (refError) {
        captureCommitPhaseError(current$$1, refError);
      }
    else ref.current = null;
}
function commitBeforeMutationLifeCycles(current$$1, finishedWork) {
  switch (finishedWork.tag) {
    case 0:
    case 11:
    case 15:
      commitHookEffectList(UnmountSnapshot, NoEffect$1, finishedWork);
      break;
    case 1:
      if (finishedWork.effectTag & 256 && null !== current$$1) {
        var prevProps = current$$1.memoizedProps,
          prevState = current$$1.memoizedState;
        startPhaseTimer(finishedWork, "getSnapshotBeforeUpdate");
        current$$1 = finishedWork.stateNode;
        finishedWork = current$$1.getSnapshotBeforeUpdate(
          finishedWork.elementType === finishedWork.type
            ? prevProps
            : resolveDefaultProps(finishedWork.type, prevProps),
          prevState
        );
        current$$1.__reactInternalSnapshotBeforeUpdate = finishedWork;
        stopPhaseTimer();
      }
      break;
    case 3:
    case 5:
    case 6:
    case 4:
    case 17:
      break;
    default:
      throw Error(formatProdErrorMessage(163));
  }
}
function commitHookEffectList(unmountTag, mountTag, finishedWork) {
  finishedWork = finishedWork.updateQueue;
  finishedWork = null !== finishedWork ? finishedWork.lastEffect : null;
  if (null !== finishedWork) {
    var effect = (finishedWork = finishedWork.next);
    do {
      if ((effect.tag & unmountTag) !== NoEffect$1) {
        var destroy = effect.destroy;
        effect.destroy = void 0;
        void 0 !== destroy && destroy();
      }
      (effect.tag & mountTag) !== NoEffect$1 &&
        ((destroy = effect.create), (effect.destroy = destroy()));
      effect = effect.next;
    } while (effect !== finishedWork);
  }
}
function commitUnmount(finishedRoot, current$$1$jscomp$0, renderPriorityLevel) {
  "function" === typeof onCommitFiberUnmount &&
    onCommitFiberUnmount(current$$1$jscomp$0);
  switch (current$$1$jscomp$0.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      finishedRoot = current$$1$jscomp$0.updateQueue;
      if (
        null !== finishedRoot &&
        ((finishedRoot = finishedRoot.lastEffect), null !== finishedRoot)
      ) {
        var firstEffect = finishedRoot.next;
        runWithPriority(
          97 < renderPriorityLevel ? 97 : renderPriorityLevel,
          function() {
            var effect = firstEffect;
            do {
              var destroy = effect.destroy;
              if (void 0 !== destroy) {
                var current$$1 = current$$1$jscomp$0;
                try {
                  destroy();
                } catch (error) {
                  captureCommitPhaseError(current$$1, error);
                }
              }
              effect = effect.next;
            } while (effect !== firstEffect);
          }
        );
      }
      break;
    case 1:
      safelyDetachRef(current$$1$jscomp$0);
      renderPriorityLevel = current$$1$jscomp$0.stateNode;
      "function" === typeof renderPriorityLevel.componentWillUnmount &&
        safelyCallComponentWillUnmount(
          current$$1$jscomp$0,
          renderPriorityLevel
        );
      break;
    case 5:
      unmountResponderListeners(current$$1$jscomp$0);
      beforeRemoveInstance(current$$1$jscomp$0.stateNode);
      safelyDetachRef(current$$1$jscomp$0);
      break;
    case 4:
      unmountHostComponents(
        finishedRoot,
        current$$1$jscomp$0,
        renderPriorityLevel
      );
      break;
    case 18:
      renderPriorityLevel = finishedRoot.hydrationCallbacks;
      null !== renderPriorityLevel &&
        (renderPriorityLevel = renderPriorityLevel.onDeleted) &&
        renderPriorityLevel(current$$1$jscomp$0.stateNode);
      break;
    case 21:
      unmountResponderListeners(current$$1$jscomp$0),
        safelyDetachRef(current$$1$jscomp$0);
  }
}
function detachFiber(current$$1) {
  var alternate = current$$1.alternate;
  current$$1.return = null;
  current$$1.child = null;
  current$$1.memoizedState = null;
  current$$1.updateQueue = null;
  current$$1.dependencies = null;
  current$$1.alternate = null;
  current$$1.firstEffect = null;
  current$$1.lastEffect = null;
  current$$1.pendingProps = null;
  current$$1.memoizedProps = null;
  null !== alternate && detachFiber(alternate);
}
function isHostParent(fiber) {
  return 5 === fiber.tag || 3 === fiber.tag || 4 === fiber.tag;
}
function commitPlacement(finishedWork) {
  a: {
    for (var parent = finishedWork.return; null !== parent; ) {
      if (isHostParent(parent)) {
        var parentFiber = parent;
        break a;
      }
      parent = parent.return;
    }
    throw Error(formatProdErrorMessage(160));
  }
  parent = parentFiber.stateNode;
  switch (parentFiber.tag) {
    case 5:
      var isContainer = !1;
      break;
    case 3:
      parent = parent.containerInfo;
      isContainer = !0;
      break;
    case 4:
      parent = parent.containerInfo;
      isContainer = !0;
      break;
    default:
      throw Error(formatProdErrorMessage(161));
  }
  parentFiber.effectTag & 16 &&
    (setTextContent(parent, ""), (parentFiber.effectTag &= -17));
  a: b: for (parentFiber = finishedWork; ; ) {
    for (; null === parentFiber.sibling; ) {
      if (null === parentFiber.return || isHostParent(parentFiber.return)) {
        parentFiber = null;
        break a;
      }
      parentFiber = parentFiber.return;
    }
    parentFiber.sibling.return = parentFiber.return;
    for (
      parentFiber = parentFiber.sibling;
      5 !== parentFiber.tag && 6 !== parentFiber.tag && 18 !== parentFiber.tag;

    ) {
      if (parentFiber.effectTag & 2) continue b;
      if (null === parentFiber.child || 4 === parentFiber.tag) continue b;
      else
        (parentFiber.child.return = parentFiber),
          (parentFiber = parentFiber.child);
    }
    if (!(parentFiber.effectTag & 2)) {
      parentFiber = parentFiber.stateNode;
      break a;
    }
  }
  for (var node = finishedWork; ; ) {
    var isHost = 5 === node.tag || 6 === node.tag;
    if (isHost) {
      var stateNode = isHost ? node.stateNode : node.stateNode.instance;
      if (parentFiber)
        if (isContainer) {
          isHost = parent;
          var child = stateNode;
          stateNode = parentFiber;
          isHost.nodeType === COMMENT_NODE
            ? isHost.parentNode.insertBefore(child, stateNode)
            : isHost.insertBefore(child, stateNode);
        } else parent.insertBefore(stateNode, parentFiber);
      else
        isContainer
          ? ((child = parent),
            child.nodeType === COMMENT_NODE
              ? ((isHost = child.parentNode),
                isHost.insertBefore(stateNode, child))
              : ((isHost = child), isHost.appendChild(stateNode)),
            (child = child._reactRootContainer),
            (null !== child && void 0 !== child) ||
              null !== isHost.onclick ||
              (isHost.onclick = noop))
          : parent.appendChild(stateNode);
    } else if (4 !== node.tag && null !== node.child) {
      node.child.return = node;
      node = node.child;
      continue;
    }
    if (node === finishedWork) break;
    for (; null === node.sibling; ) {
      if (null === node.return || node.return === finishedWork) return;
      node = node.return;
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
}
function unmountHostComponents(
  finishedRoot$jscomp$0,
  current$$1,
  renderPriorityLevel$jscomp$0
) {
  for (
    var node = current$$1,
      currentParentIsValid = !1,
      currentParent,
      currentParentIsContainer;
    ;

  ) {
    if (!currentParentIsValid) {
      currentParentIsValid = node.return;
      a: for (;;) {
        if (null === currentParentIsValid)
          throw Error(formatProdErrorMessage(160));
        currentParent = currentParentIsValid.stateNode;
        switch (currentParentIsValid.tag) {
          case 5:
            currentParentIsContainer = !1;
            break a;
          case 3:
            currentParent = currentParent.containerInfo;
            currentParentIsContainer = !0;
            break a;
          case 4:
            currentParent = currentParent.containerInfo;
            currentParentIsContainer = !0;
            break a;
        }
        currentParentIsValid = currentParentIsValid.return;
      }
      currentParentIsValid = !0;
    }
    if (5 === node.tag || 6 === node.tag) {
      a: for (
        var finishedRoot = finishedRoot$jscomp$0,
          root = node,
          renderPriorityLevel = renderPriorityLevel$jscomp$0,
          node$jscomp$0 = root;
        ;

      )
        if (
          (commitUnmount(finishedRoot, node$jscomp$0, renderPriorityLevel),
          null !== node$jscomp$0.child && 4 !== node$jscomp$0.tag)
        )
          (node$jscomp$0.child.return = node$jscomp$0),
            (node$jscomp$0 = node$jscomp$0.child);
        else {
          if (node$jscomp$0 === root) break;
          for (; null === node$jscomp$0.sibling; ) {
            if (null === node$jscomp$0.return || node$jscomp$0.return === root)
              break a;
            node$jscomp$0 = node$jscomp$0.return;
          }
          node$jscomp$0.sibling.return = node$jscomp$0.return;
          node$jscomp$0 = node$jscomp$0.sibling;
        }
      currentParentIsContainer
        ? ((finishedRoot = currentParent),
          (root = node.stateNode),
          finishedRoot.nodeType === COMMENT_NODE
            ? finishedRoot.parentNode.removeChild(root)
            : finishedRoot.removeChild(root))
        : currentParent.removeChild(node.stateNode);
    } else if (18 === node.tag)
      (finishedRoot = finishedRoot$jscomp$0.hydrationCallbacks),
        null !== finishedRoot &&
          (finishedRoot = finishedRoot.onDeleted) &&
          finishedRoot(node.stateNode),
        currentParentIsContainer
          ? ((finishedRoot = currentParent),
            (root = node.stateNode),
            finishedRoot.nodeType === COMMENT_NODE
              ? clearSuspenseBoundary(finishedRoot.parentNode, root)
              : 1 === finishedRoot.nodeType &&
                clearSuspenseBoundary(finishedRoot, root),
            retryIfBlockedOn(finishedRoot))
          : clearSuspenseBoundary(currentParent, node.stateNode);
    else if (4 === node.tag) {
      if (null !== node.child) {
        currentParent = node.stateNode.containerInfo;
        currentParentIsContainer = !0;
        node.child.return = node;
        node = node.child;
        continue;
      }
    } else if (
      (commitUnmount(finishedRoot$jscomp$0, node, renderPriorityLevel$jscomp$0),
      null !== node.child)
    ) {
      node.child.return = node;
      node = node.child;
      continue;
    }
    if (node === current$$1) break;
    for (; null === node.sibling; ) {
      if (null === node.return || node.return === current$$1) return;
      node = node.return;
      4 === node.tag && (currentParentIsValid = !1);
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
}
function commitWork(current$$1, finishedWork) {
  switch (finishedWork.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      commitHookEffectList(UnmountMutation, MountMutation, finishedWork);
      break;
    case 1:
      break;
    case 5:
      var instance = finishedWork.stateNode;
      if (null != instance) {
        var newProps = finishedWork.memoizedProps;
        current$$1 = null !== current$$1 ? current$$1.memoizedProps : newProps;
        var type = finishedWork.type,
          updatePayload = finishedWork.updateQueue;
        finishedWork.updateQueue = null;
        if (null !== updatePayload) {
          instance[internalEventHandlersKey] = newProps;
          "input" === type &&
            "radio" === newProps.type &&
            null != newProps.name &&
            updateChecked(instance, newProps);
          isCustomComponent(type, current$$1);
          for (
            var isCustomComponentTag = isCustomComponent(type, newProps), i = 0;
            i < updatePayload.length;
            i += 2
          ) {
            var propKey = updatePayload[i],
              propValue = updatePayload[i + 1];
            "style" === propKey
              ? setValueForStyles(instance, propValue)
              : "dangerouslySetInnerHTML" === propKey
                ? setInnerHTML(instance, propValue)
                : "children" === propKey
                  ? setTextContent(instance, propValue)
                  : setValueForProperty(
                      instance,
                      propKey,
                      propValue,
                      isCustomComponentTag
                    );
          }
          switch (type) {
            case "input":
              updateWrapper(instance, newProps);
              break;
            case "textarea":
              updateWrapper$1(instance, newProps);
              break;
            case "select":
              (type = instance._wrapperState.wasMultiple),
                (instance._wrapperState.wasMultiple = !!newProps.multiple),
                (updatePayload = newProps.value),
                null != updatePayload
                  ? updateOptions(
                      instance,
                      !!newProps.multiple,
                      updatePayload,
                      !1
                    )
                  : type !== !!newProps.multiple &&
                    (null != newProps.defaultValue
                      ? updateOptions(
                          instance,
                          !!newProps.multiple,
                          newProps.defaultValue,
                          !0
                        )
                      : updateOptions(
                          instance,
                          !!newProps.multiple,
                          newProps.multiple ? [] : "",
                          !1
                        ));
          }
        }
        instance = newProps.DEPRECATED_flareListeners;
        current$$1.DEPRECATED_flareListeners !== instance &&
          updateLegacyEventListeners(instance, finishedWork, null);
      }
      break;
    case 6:
      if (null === finishedWork.stateNode)
        throw Error(formatProdErrorMessage(162));
      finishedWork.stateNode.nodeValue = finishedWork.memoizedProps;
      break;
    case 3:
      finishedWork = finishedWork.stateNode;
      finishedWork.hydrate &&
        ((finishedWork.hydrate = !1),
        retryIfBlockedOn(finishedWork.containerInfo));
      break;
    case 12:
      break;
    case 13:
      instance = finishedWork.memoizedState;
      newProps = finishedWork;
      null === instance
        ? (current$$1 = !1)
        : ((current$$1 = !0),
          (newProps = finishedWork.child),
          (globalMostRecentFallbackTime = now()));
      if (null !== newProps)
        a: for (type = newProps; ; ) {
          if (5 === type.tag)
            (updatePayload = type.stateNode),
              current$$1
                ? ((updatePayload = updatePayload.style),
                  "function" === typeof updatePayload.setProperty
                    ? updatePayload.setProperty("display", "none", "important")
                    : (updatePayload.display = "none"))
                : ((updatePayload = type.stateNode),
                  (isCustomComponentTag = type.memoizedProps.style),
                  (isCustomComponentTag =
                    void 0 !== isCustomComponentTag &&
                    null !== isCustomComponentTag &&
                    isCustomComponentTag.hasOwnProperty("display")
                      ? isCustomComponentTag.display
                      : null),
                  (updatePayload.style.display = dangerousStyleValue(
                    "display",
                    isCustomComponentTag
                  )));
          else if (6 === type.tag)
            type.stateNode.nodeValue = current$$1 ? "" : type.memoizedProps;
          else if (
            13 === type.tag &&
            null !== type.memoizedState &&
            null === type.memoizedState.dehydrated
          ) {
            updatePayload = type.child.sibling;
            updatePayload.return = type;
            type = updatePayload;
            continue;
          } else if (null !== type.child) {
            type.child.return = type;
            type = type.child;
            continue;
          }
          if (type === newProps) break a;
          for (; null === type.sibling; ) {
            if (null === type.return || type.return === newProps) break a;
            type = type.return;
          }
          type.sibling.return = type.return;
          type = type.sibling;
        }
      null !== instance &&
        ((instance = finishedWork.memoizedProps.suspenseCallback),
        "function" === typeof instance &&
          ((newProps = finishedWork.updateQueue),
          null !== newProps && instance(new Set(newProps))));
      attachSuspenseRetryListeners(finishedWork);
      break;
    case 19:
      attachSuspenseRetryListeners(finishedWork);
      break;
    case 17:
      break;
    case 20:
      break;
    case 21:
      finishedWork.stateNode.fiber = finishedWork;
      instance = finishedWork.memoizedProps;
      newProps = instance.DEPRECATED_flareListeners;
      (null !== current$$1 ? current$$1.memoizedProps : instance)
        .DEPRECATED_flareListeners !== newProps &&
        updateLegacyEventListeners(newProps, finishedWork, null);
      break;
    default:
      throw Error(formatProdErrorMessage(163));
  }
}
function attachSuspenseRetryListeners(finishedWork) {
  var thenables = finishedWork.updateQueue;
  if (null !== thenables) {
    finishedWork.updateQueue = null;
    var retryCache = finishedWork.stateNode;
    null === retryCache &&
      (retryCache = finishedWork.stateNode = new PossiblyWeakSet());
    thenables.forEach(function(thenable) {
      var retry = resolveRetryThenable.bind(null, finishedWork, thenable);
      retryCache.has(thenable) ||
        (!0 !== thenable.__reactDoNotTraceInteractions &&
          (retry = tracing.unstable_wrap(retry)),
        retryCache.add(thenable),
        thenable.then(retry, retry));
    });
  }
}
var PossiblyWeakMap$1 = "function" === typeof WeakMap ? WeakMap : Map;
function createRootErrorUpdate(fiber, errorInfo, expirationTime) {
  expirationTime = createUpdate(expirationTime, null);
  expirationTime.tag = 3;
  expirationTime.payload = { element: null };
  var error = errorInfo.value;
  expirationTime.callback = function() {
    hasUncaughtError || ((hasUncaughtError = !0), (firstUncaughtError = error));
    logError(fiber, errorInfo);
  };
  return expirationTime;
}
function createClassErrorUpdate(fiber, errorInfo, expirationTime) {
  expirationTime = createUpdate(expirationTime, null);
  expirationTime.tag = 3;
  var getDerivedStateFromError = fiber.type.getDerivedStateFromError;
  if ("function" === typeof getDerivedStateFromError) {
    var error = errorInfo.value;
    expirationTime.payload = function() {
      logError(fiber, errorInfo);
      return getDerivedStateFromError(error);
    };
  }
  var inst = fiber.stateNode;
  null !== inst &&
    "function" === typeof inst.componentDidCatch &&
    (expirationTime.callback = function() {
      "function" !== typeof getDerivedStateFromError &&
        (null === legacyErrorBoundariesThatAlreadyFailed
          ? (legacyErrorBoundariesThatAlreadyFailed = new Set([this]))
          : legacyErrorBoundariesThatAlreadyFailed.add(this),
        logError(fiber, errorInfo));
      var stack = errorInfo.stack;
      this.componentDidCatch(errorInfo.value, {
        componentStack: null !== stack ? stack : ""
      });
    });
  return expirationTime;
}
var ceil = Math.ceil,
  ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher,
  ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner,
  NoContext = 0,
  LegacyUnbatchedContext = 8,
  RenderContext = 16,
  CommitContext = 32,
  RootIncomplete = 0,
  RootFatalErrored = 1,
  RootErrored = 2,
  RootSuspended = 3,
  RootSuspendedWithDelay = 4,
  RootCompleted = 5,
  executionContext = NoContext,
  workInProgressRoot = null,
  workInProgress = null,
  renderExpirationTime = 0,
  workInProgressRootExitStatus = RootIncomplete,
  workInProgressRootFatalError = null,
  workInProgressRootLatestProcessedExpirationTime = 1073741823,
  workInProgressRootLatestSuspenseTimeout = 1073741823,
  workInProgressRootCanSuspendUsingConfig = null,
  workInProgressRootNextUnprocessedUpdateTime = 0,
  workInProgressRootHasPendingPing = !1,
  globalMostRecentFallbackTime = 0,
  FALLBACK_THROTTLE_MS = 500,
  nextEffect = null,
  hasUncaughtError = !1,
  firstUncaughtError = null,
  legacyErrorBoundariesThatAlreadyFailed = null,
  rootDoesHavePassiveEffects = !1,
  rootWithPendingPassiveEffects = null,
  pendingPassiveEffectsRenderPriority = 90,
  pendingPassiveEffectsExpirationTime = 0,
  rootsWithPendingDiscreteUpdates = null,
  nestedUpdateCount = 0,
  rootWithNestedUpdates = null,
  interruptedBy = null,
  spawnedWorkDuringRender = null,
  currentEventTime = 0;
function requestCurrentTimeForUpdate() {
  return (executionContext & (RenderContext | CommitContext)) !== NoContext
    ? 1073741821 - ((now() / 10) | 0)
    : 0 !== currentEventTime
      ? currentEventTime
      : (currentEventTime = 1073741821 - ((now() / 10) | 0));
}
function computeExpirationForFiber(currentTime, fiber, suspenseConfig) {
  fiber = fiber.mode;
  if (0 === (fiber & 2)) return 1073741823;
  var priorityLevel = getCurrentPriorityLevel();
  if (0 === (fiber & 4)) return 99 === priorityLevel ? 1073741823 : 1073741822;
  if ((executionContext & RenderContext) !== NoContext)
    return renderExpirationTime;
  if (null !== suspenseConfig)
    currentTime = computeExpirationBucket(
      currentTime,
      suspenseConfig.timeoutMs | 0 || 5e3,
      250
    );
  else
    switch (priorityLevel) {
      case 99:
        currentTime = 1073741823;
        break;
      case 98:
        currentTime = computeExpirationBucket(currentTime, 150, 100);
        break;
      case 97:
      case 96:
        currentTime = computeExpirationBucket(currentTime, 5e3, 250);
        break;
      case 95:
        currentTime = 2;
        break;
      default:
        throw Error(formatProdErrorMessage(326));
    }
  null !== workInProgressRoot &&
    currentTime === renderExpirationTime &&
    --currentTime;
  return currentTime;
}
function scheduleUpdateOnFiber(fiber, expirationTime) {
  if (50 < nestedUpdateCount)
    throw ((nestedUpdateCount = 0),
    (rootWithNestedUpdates = null),
    Error(formatProdErrorMessage(185)));
  var root = markUpdateTimeFromFiberToRoot(fiber, expirationTime);
  null !== root &&
    (enableUserTimingAPI &&
      null !== workInProgressRoot &&
      expirationTime > renderExpirationTime &&
      (interruptedBy = fiber),
    enableUserTimingAPI &&
      (isCommitting && (hasScheduledUpdateInCurrentCommit = !0),
      null !== currentPhase &&
        "componentWillMount" !== currentPhase &&
        "componentWillReceiveProps" !== currentPhase &&
        (hasScheduledUpdateInCurrentPhase = !0)),
    (fiber = getCurrentPriorityLevel()),
    1073741823 === expirationTime
      ? (executionContext & LegacyUnbatchedContext) !== NoContext &&
        (executionContext & (RenderContext | CommitContext)) === NoContext
        ? (schedulePendingInteractions(root, expirationTime),
          performSyncWorkOnRoot(root))
        : (ensureRootIsScheduled(root),
          schedulePendingInteractions(root, expirationTime),
          executionContext === NoContext && flushSyncCallbackQueue())
      : (ensureRootIsScheduled(root),
        schedulePendingInteractions(root, expirationTime)),
    (executionContext & 4) === NoContext ||
      (98 !== fiber && 99 !== fiber) ||
      (null === rootsWithPendingDiscreteUpdates
        ? (rootsWithPendingDiscreteUpdates = new Map([[root, expirationTime]]))
        : ((fiber = rootsWithPendingDiscreteUpdates.get(root)),
          (void 0 === fiber || fiber > expirationTime) &&
            rootsWithPendingDiscreteUpdates.set(root, expirationTime))));
}
function markUpdateTimeFromFiberToRoot(fiber, expirationTime) {
  fiber.expirationTime < expirationTime &&
    (fiber.expirationTime = expirationTime);
  var alternate = fiber.alternate;
  null !== alternate &&
    alternate.expirationTime < expirationTime &&
    (alternate.expirationTime = expirationTime);
  var node = fiber.return,
    root = null;
  if (null === node && 3 === fiber.tag) root = fiber.stateNode;
  else
    for (; null !== node; ) {
      alternate = node.alternate;
      node.childExpirationTime < expirationTime &&
        (node.childExpirationTime = expirationTime);
      null !== alternate &&
        alternate.childExpirationTime < expirationTime &&
        (alternate.childExpirationTime = expirationTime);
      if (null === node.return && 3 === node.tag) {
        root = node.stateNode;
        break;
      }
      node = node.return;
    }
  null !== root &&
    (workInProgressRoot === root &&
      (markUnprocessedUpdateTime(expirationTime),
      workInProgressRootExitStatus === RootSuspendedWithDelay &&
        markRootSuspendedAtTime(root, renderExpirationTime)),
    markRootUpdatedAtTime(root, expirationTime));
  return root;
}
function getNextRootExpirationTimeToWorkOn(root) {
  var lastExpiredTime = root.lastExpiredTime;
  if (0 !== lastExpiredTime) return lastExpiredTime;
  lastExpiredTime = root.firstPendingTime;
  if (!isRootSuspendedAtTime(root, lastExpiredTime)) return lastExpiredTime;
  lastExpiredTime = root.lastPingedTime;
  root = root.nextKnownPendingLevel;
  return lastExpiredTime > root ? lastExpiredTime : root;
}
function ensureRootIsScheduled(root) {
  if (0 !== root.lastExpiredTime)
    (root.callbackExpirationTime = 1073741823),
      (root.callbackPriority = 99),
      (root.callbackNode = scheduleSyncCallback(
        performSyncWorkOnRoot.bind(null, root)
      ));
  else {
    var expirationTime = getNextRootExpirationTimeToWorkOn(root),
      existingCallbackNode = root.callbackNode;
    if (0 === expirationTime)
      null !== existingCallbackNode &&
        ((root.callbackNode = null),
        (root.callbackExpirationTime = 0),
        (root.callbackPriority = 90));
    else {
      var currentTime = requestCurrentTimeForUpdate();
      currentTime = inferPriorityFromExpirationTime(
        currentTime,
        expirationTime
      );
      if (null !== existingCallbackNode) {
        var existingCallbackPriority = root.callbackPriority;
        if (
          root.callbackExpirationTime === expirationTime &&
          existingCallbackPriority >= currentTime
        )
          return;
        existingCallbackNode !== fakeCallbackNode &&
          Scheduler_cancelCallback(existingCallbackNode);
      }
      root.callbackExpirationTime = expirationTime;
      root.callbackPriority = currentTime;
      expirationTime =
        1073741823 === expirationTime
          ? scheduleSyncCallback(performSyncWorkOnRoot.bind(null, root))
          : scheduleCallback(
              currentTime,
              performConcurrentWorkOnRoot.bind(null, root),
              { timeout: 10 * (1073741821 - expirationTime) - now() }
            );
      root.callbackNode = expirationTime;
    }
  }
}
function performConcurrentWorkOnRoot(root, didTimeout) {
  currentEventTime = 0;
  if (didTimeout)
    return (
      (didTimeout = requestCurrentTimeForUpdate()),
      markRootExpiredAtTime(root, didTimeout),
      ensureRootIsScheduled(root),
      null
    );
  var expirationTime = getNextRootExpirationTimeToWorkOn(root);
  if (0 !== expirationTime) {
    didTimeout = root.callbackNode;
    if ((executionContext & (RenderContext | CommitContext)) !== NoContext)
      throw Error(formatProdErrorMessage(327));
    flushPassiveEffects();
    if (root !== workInProgressRoot || expirationTime !== renderExpirationTime)
      prepareFreshStack(root, expirationTime),
        startWorkOnPendingInteractions(root, expirationTime);
    if (null !== workInProgress) {
      var prevExecutionContext = executionContext;
      executionContext |= RenderContext;
      var prevDispatcher = pushDispatcher(root),
        prevInteractions = pushInteractions(root);
      startWorkLoopTimer(workInProgress);
      do
        try {
          workLoopConcurrent();
          break;
        } catch (thrownValue) {
          handleError(root, thrownValue);
        }
      while (1);
      resetContextDependencies();
      executionContext = prevExecutionContext;
      ReactCurrentDispatcher.current = prevDispatcher;
      tracing.__interactionsRef.current = prevInteractions;
      if (workInProgressRootExitStatus === RootFatalErrored)
        throw ((didTimeout = workInProgressRootFatalError),
        stopWorkLoopTimer(interruptedBy, !1),
        (interruptedBy = null),
        prepareFreshStack(root, expirationTime),
        markRootSuspendedAtTime(root, expirationTime),
        ensureRootIsScheduled(root),
        didTimeout);
      if (null !== workInProgress)
        stopWorkLoopTimer(interruptedBy, !1), (interruptedBy = null);
      else
        switch (
          (stopWorkLoopTimer(interruptedBy, !0),
          (interruptedBy = null),
          (prevDispatcher = root.finishedWork = root.current.alternate),
          (root.finishedExpirationTime = expirationTime),
          (prevExecutionContext = workInProgressRootExitStatus),
          (workInProgressRoot = null),
          prevExecutionContext)
        ) {
          case RootIncomplete:
          case RootFatalErrored:
            throw Error(formatProdErrorMessage(345));
          case RootErrored:
            markRootExpiredAtTime(
              root,
              2 < expirationTime ? 2 : expirationTime
            );
            break;
          case RootSuspended:
            markRootSuspendedAtTime(root, expirationTime);
            prevExecutionContext = root.lastSuspendedTime;
            expirationTime === prevExecutionContext &&
              (root.nextKnownPendingLevel = getRemainingExpirationTime(
                prevDispatcher
              ));
            if (
              1073741823 === workInProgressRootLatestProcessedExpirationTime &&
              ((prevDispatcher =
                globalMostRecentFallbackTime + FALLBACK_THROTTLE_MS - now()),
              10 < prevDispatcher)
            ) {
              if (
                workInProgressRootHasPendingPing &&
                ((prevInteractions = root.lastPingedTime),
                0 === prevInteractions || prevInteractions >= expirationTime)
              ) {
                root.lastPingedTime = expirationTime;
                prepareFreshStack(root, expirationTime);
                break;
              }
              prevInteractions = getNextRootExpirationTimeToWorkOn(root);
              if (0 !== prevInteractions && prevInteractions !== expirationTime)
                break;
              if (
                0 !== prevExecutionContext &&
                prevExecutionContext !== expirationTime
              ) {
                root.lastPingedTime = prevExecutionContext;
                break;
              }
              root.timeoutHandle = scheduleTimeout(
                commitRoot.bind(null, root),
                prevDispatcher
              );
              break;
            }
            commitRoot(root);
            break;
          case RootSuspendedWithDelay:
            markRootSuspendedAtTime(root, expirationTime);
            prevExecutionContext = root.lastSuspendedTime;
            expirationTime === prevExecutionContext &&
              (root.nextKnownPendingLevel = getRemainingExpirationTime(
                prevDispatcher
              ));
            if (
              workInProgressRootHasPendingPing &&
              ((prevDispatcher = root.lastPingedTime),
              0 === prevDispatcher || prevDispatcher >= expirationTime)
            ) {
              root.lastPingedTime = expirationTime;
              prepareFreshStack(root, expirationTime);
              break;
            }
            prevDispatcher = getNextRootExpirationTimeToWorkOn(root);
            if (0 !== prevDispatcher && prevDispatcher !== expirationTime)
              break;
            if (
              0 !== prevExecutionContext &&
              prevExecutionContext !== expirationTime
            ) {
              root.lastPingedTime = prevExecutionContext;
              break;
            }
            1073741823 !== workInProgressRootLatestSuspenseTimeout
              ? (prevExecutionContext =
                  10 * (1073741821 - workInProgressRootLatestSuspenseTimeout) -
                  now())
              : 1073741823 === workInProgressRootLatestProcessedExpirationTime
                ? (prevExecutionContext = 0)
                : ((prevExecutionContext =
                    10 *
                      (1073741821 -
                        workInProgressRootLatestProcessedExpirationTime) -
                    5e3),
                  (prevDispatcher = now()),
                  (expirationTime =
                    10 * (1073741821 - expirationTime) - prevDispatcher),
                  (prevExecutionContext =
                    prevDispatcher - prevExecutionContext),
                  0 > prevExecutionContext && (prevExecutionContext = 0),
                  (prevExecutionContext =
                    (120 > prevExecutionContext
                      ? 120
                      : 480 > prevExecutionContext
                        ? 480
                        : 1080 > prevExecutionContext
                          ? 1080
                          : 1920 > prevExecutionContext
                            ? 1920
                            : 3e3 > prevExecutionContext
                              ? 3e3
                              : 4320 > prevExecutionContext
                                ? 4320
                                : 1960 * ceil(prevExecutionContext / 1960)) -
                    prevExecutionContext),
                  expirationTime < prevExecutionContext &&
                    (prevExecutionContext = expirationTime));
            if (10 < prevExecutionContext) {
              root.timeoutHandle = scheduleTimeout(
                commitRoot.bind(null, root),
                prevExecutionContext
              );
              break;
            }
            commitRoot(root);
            break;
          case RootCompleted:
            if (
              1073741823 !== workInProgressRootLatestProcessedExpirationTime &&
              null !== workInProgressRootCanSuspendUsingConfig
            ) {
              prevInteractions = workInProgressRootLatestProcessedExpirationTime;
              var suspenseConfig = workInProgressRootCanSuspendUsingConfig;
              prevExecutionContext = suspenseConfig.busyMinDurationMs | 0;
              0 >= prevExecutionContext
                ? (prevExecutionContext = 0)
                : ((prevDispatcher = suspenseConfig.busyDelayMs | 0),
                  (prevInteractions =
                    now() -
                    (10 * (1073741821 - prevInteractions) -
                      (suspenseConfig.timeoutMs | 0 || 5e3))),
                  (prevExecutionContext =
                    prevInteractions <= prevDispatcher
                      ? 0
                      : prevDispatcher +
                        prevExecutionContext -
                        prevInteractions));
              if (10 < prevExecutionContext) {
                markRootSuspendedAtTime(root, expirationTime);
                root.timeoutHandle = scheduleTimeout(
                  commitRoot.bind(null, root),
                  prevExecutionContext
                );
                break;
              }
            }
            commitRoot(root);
            break;
          default:
            throw Error(formatProdErrorMessage(329));
        }
      ensureRootIsScheduled(root);
      if (root.callbackNode === didTimeout)
        return performConcurrentWorkOnRoot.bind(null, root);
    }
  }
  return null;
}
function performSyncWorkOnRoot(root) {
  var lastExpiredTime = root.lastExpiredTime;
  lastExpiredTime = 0 !== lastExpiredTime ? lastExpiredTime : 1073741823;
  if (root.finishedExpirationTime === lastExpiredTime) commitRoot(root);
  else {
    if ((executionContext & (RenderContext | CommitContext)) !== NoContext)
      throw Error(formatProdErrorMessage(327));
    flushPassiveEffects();
    if (root !== workInProgressRoot || lastExpiredTime !== renderExpirationTime)
      prepareFreshStack(root, lastExpiredTime),
        startWorkOnPendingInteractions(root, lastExpiredTime);
    if (null !== workInProgress) {
      var prevExecutionContext = executionContext;
      executionContext |= RenderContext;
      var prevDispatcher = pushDispatcher(root),
        prevInteractions = pushInteractions(root);
      startWorkLoopTimer(workInProgress);
      do
        try {
          workLoopSync();
          break;
        } catch (thrownValue) {
          handleError(root, thrownValue);
        }
      while (1);
      resetContextDependencies();
      executionContext = prevExecutionContext;
      ReactCurrentDispatcher.current = prevDispatcher;
      tracing.__interactionsRef.current = prevInteractions;
      if (workInProgressRootExitStatus === RootFatalErrored)
        throw ((prevExecutionContext = workInProgressRootFatalError),
        stopWorkLoopTimer(interruptedBy, !1),
        (interruptedBy = null),
        prepareFreshStack(root, lastExpiredTime),
        markRootSuspendedAtTime(root, lastExpiredTime),
        ensureRootIsScheduled(root),
        prevExecutionContext);
      if (null !== workInProgress) throw Error(formatProdErrorMessage(261));
      stopWorkLoopTimer(interruptedBy, !0);
      interruptedBy = null;
      root.finishedWork = root.current.alternate;
      root.finishedExpirationTime = lastExpiredTime;
      workInProgressRoot = null;
      commitRoot(root);
      ensureRootIsScheduled(root);
    }
  }
  return null;
}
function flushRoot(root, expirationTime) {
  markRootExpiredAtTime(root, expirationTime);
  ensureRootIsScheduled(root);
  (executionContext & (RenderContext | CommitContext)) === NoContext &&
    flushSyncCallbackQueue();
}
function flushDiscreteUpdates() {
  (executionContext & (1 | RenderContext | CommitContext)) === NoContext &&
    (flushPendingDiscreteUpdates(), flushPassiveEffects());
}
function flushPendingDiscreteUpdates() {
  if (null !== rootsWithPendingDiscreteUpdates) {
    var roots = rootsWithPendingDiscreteUpdates;
    rootsWithPendingDiscreteUpdates = null;
    roots.forEach(function(expirationTime, root) {
      markRootExpiredAtTime(root, expirationTime);
      ensureRootIsScheduled(root);
    });
    flushSyncCallbackQueue();
  }
}
function batchedUpdates(fn, a) {
  var prevExecutionContext = executionContext;
  executionContext |= 1;
  try {
    return fn(a);
  } finally {
    (executionContext = prevExecutionContext),
      executionContext === NoContext && flushSyncCallbackQueue();
  }
}
function discreteUpdates(fn, a, b, c) {
  var prevExecutionContext = executionContext;
  executionContext |= 4;
  try {
    return runWithPriority(98, fn.bind(null, a, b, c));
  } finally {
    (executionContext = prevExecutionContext),
      executionContext === NoContext && flushSyncCallbackQueue();
  }
}
function unbatchedUpdates(fn, a) {
  var prevExecutionContext = executionContext;
  executionContext &= -2;
  executionContext |= LegacyUnbatchedContext;
  try {
    return fn(a);
  } finally {
    (executionContext = prevExecutionContext),
      executionContext === NoContext && flushSyncCallbackQueue();
  }
}
function flushSync(fn, a) {
  if ((executionContext & (RenderContext | CommitContext)) !== NoContext)
    throw Error(formatProdErrorMessage(187));
  var prevExecutionContext = executionContext;
  executionContext |= 1;
  try {
    return runWithPriority(99, fn.bind(null, a));
  } finally {
    (executionContext = prevExecutionContext), flushSyncCallbackQueue();
  }
}
function prepareFreshStack(root, expirationTime) {
  root.finishedWork = null;
  root.finishedExpirationTime = 0;
  var timeoutHandle = root.timeoutHandle;
  -1 !== timeoutHandle &&
    ((root.timeoutHandle = -1), cancelTimeout(timeoutHandle));
  if (null !== workInProgress)
    for (timeoutHandle = workInProgress.return; null !== timeoutHandle; ) {
      var interruptedWork = timeoutHandle;
      switch (interruptedWork.tag) {
        case 1:
          var childContextTypes = interruptedWork.type.childContextTypes;
          null !== childContextTypes &&
            void 0 !== childContextTypes &&
            popContext(interruptedWork);
          break;
        case 3:
          popHostContainer(interruptedWork);
          popTopLevelContextObject(interruptedWork);
          break;
        case 5:
          popHostContext(interruptedWork);
          break;
        case 4:
          popHostContainer(interruptedWork);
          break;
        case 13:
          pop(suspenseStackCursor, interruptedWork);
          break;
        case 19:
          pop(suspenseStackCursor, interruptedWork);
          break;
        case 10:
          popProvider(interruptedWork);
      }
      timeoutHandle = timeoutHandle.return;
    }
  workInProgressRoot = root;
  workInProgress = createWorkInProgress(root.current, null, expirationTime);
  renderExpirationTime = expirationTime;
  workInProgressRootExitStatus = RootIncomplete;
  workInProgressRootFatalError = null;
  workInProgressRootLatestSuspenseTimeout = workInProgressRootLatestProcessedExpirationTime = 1073741823;
  workInProgressRootCanSuspendUsingConfig = null;
  workInProgressRootNextUnprocessedUpdateTime = 0;
  workInProgressRootHasPendingPing = !1;
  spawnedWorkDuringRender = null;
}
function handleError(root$jscomp$0, thrownValue) {
  do {
    try {
      resetContextDependencies();
      resetHooks();
      if (null === workInProgress || null === workInProgress.return)
        return (
          (workInProgressRootExitStatus = RootFatalErrored),
          (workInProgressRootFatalError = thrownValue),
          null
        );
      workInProgress.mode & 8 &&
        stopProfilerTimerIfRunningAndRecordDelta(workInProgress, !0);
      a: {
        var root = root$jscomp$0,
          returnFiber = workInProgress.return,
          sourceFiber = workInProgress,
          value = thrownValue;
        thrownValue = renderExpirationTime;
        sourceFiber.effectTag |= 2048;
        sourceFiber.firstEffect = sourceFiber.lastEffect = null;
        if (
          null !== value &&
          "object" === typeof value &&
          "function" === typeof value.then
        ) {
          var thenable = value,
            hasInvisibleParentBoundary =
              0 !==
              (suspenseStackCursor.current & InvisibleParentSuspenseContext),
            _workInProgress = returnFiber;
          do {
            var JSCompiler_temp;
            if ((JSCompiler_temp = 13 === _workInProgress.tag)) {
              var nextState = _workInProgress.memoizedState;
              if (null !== nextState)
                JSCompiler_temp = null !== nextState.dehydrated ? !0 : !1;
              else {
                var props = _workInProgress.memoizedProps;
                JSCompiler_temp =
                  void 0 === props.fallback
                    ? !1
                    : !0 !== props.unstable_avoidThisFallback
                      ? !0
                      : hasInvisibleParentBoundary
                        ? !1
                        : !0;
              }
            }
            if (JSCompiler_temp) {
              var thenables = _workInProgress.updateQueue;
              if (null === thenables) {
                var updateQueue = new Set();
                updateQueue.add(thenable);
                _workInProgress.updateQueue = updateQueue;
              } else thenables.add(thenable);
              if (0 === (_workInProgress.mode & 2)) {
                _workInProgress.effectTag |= 64;
                sourceFiber.effectTag &= -2981;
                if (1 === sourceFiber.tag)
                  if (null === sourceFiber.alternate) sourceFiber.tag = 17;
                  else {
                    var update = createUpdate(1073741823, null);
                    update.tag = 2;
                    enqueueUpdate(sourceFiber, update);
                  }
                sourceFiber.expirationTime = 1073741823;
                break a;
              }
              value = void 0;
              sourceFiber = thrownValue;
              var pingCache = root.pingCache;
              null === pingCache
                ? ((pingCache = root.pingCache = new PossiblyWeakMap$1()),
                  (value = new Set()),
                  pingCache.set(thenable, value))
                : ((value = pingCache.get(thenable)),
                  void 0 === value &&
                    ((value = new Set()), pingCache.set(thenable, value)));
              if (!value.has(sourceFiber)) {
                value.add(sourceFiber);
                var ping = pingSuspendedRoot.bind(
                  null,
                  root,
                  thenable,
                  sourceFiber
                );
                thenable.then(ping, ping);
              }
              _workInProgress.effectTag |= 4096;
              _workInProgress.expirationTime = thrownValue;
              break a;
            }
            _workInProgress = _workInProgress.return;
          } while (null !== _workInProgress);
          value = Error(
            (getComponentName(sourceFiber.type) || "A React component") +
              " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display." +
              getStackByFiberInDevAndProd(sourceFiber)
          );
        }
        workInProgressRootExitStatus !== RootCompleted &&
          (workInProgressRootExitStatus = RootErrored);
        value = createCapturedValue(value, sourceFiber);
        _workInProgress = returnFiber;
        do {
          switch (_workInProgress.tag) {
            case 3:
              thenable = value;
              _workInProgress.effectTag |= 4096;
              _workInProgress.expirationTime = thrownValue;
              var _update = createRootErrorUpdate(
                _workInProgress,
                thenable,
                thrownValue
              );
              enqueueCapturedUpdate(_workInProgress, _update);
              break a;
            case 1:
              thenable = value;
              var ctor = _workInProgress.type,
                instance = _workInProgress.stateNode;
              if (
                0 === (_workInProgress.effectTag & 64) &&
                ("function" === typeof ctor.getDerivedStateFromError ||
                  (null !== instance &&
                    "function" === typeof instance.componentDidCatch &&
                    (null === legacyErrorBoundariesThatAlreadyFailed ||
                      !legacyErrorBoundariesThatAlreadyFailed.has(instance))))
              ) {
                _workInProgress.effectTag |= 4096;
                _workInProgress.expirationTime = thrownValue;
                var _update2 = createClassErrorUpdate(
                  _workInProgress,
                  thenable,
                  thrownValue
                );
                enqueueCapturedUpdate(_workInProgress, _update2);
                break a;
              }
          }
          _workInProgress = _workInProgress.return;
        } while (null !== _workInProgress);
      }
      workInProgress = completeUnitOfWork(workInProgress);
    } catch (yetAnotherThrownValue) {
      thrownValue = yetAnotherThrownValue;
      continue;
    }
    break;
  } while (1);
}
function pushDispatcher() {
  var prevDispatcher = ReactCurrentDispatcher.current;
  ReactCurrentDispatcher.current = ContextOnlyDispatcher;
  return null === prevDispatcher ? ContextOnlyDispatcher : prevDispatcher;
}
function pushInteractions(root) {
  var prevInteractions = tracing.__interactionsRef.current;
  tracing.__interactionsRef.current = root.memoizedInteractions;
  return prevInteractions;
}
function markRenderEventTimeAndConfig(expirationTime, suspenseConfig) {
  expirationTime < workInProgressRootLatestProcessedExpirationTime &&
    2 < expirationTime &&
    (workInProgressRootLatestProcessedExpirationTime = expirationTime);
  null !== suspenseConfig &&
    expirationTime < workInProgressRootLatestSuspenseTimeout &&
    2 < expirationTime &&
    ((workInProgressRootLatestSuspenseTimeout = expirationTime),
    (workInProgressRootCanSuspendUsingConfig = suspenseConfig));
}
function markUnprocessedUpdateTime(expirationTime) {
  expirationTime > workInProgressRootNextUnprocessedUpdateTime &&
    (workInProgressRootNextUnprocessedUpdateTime = expirationTime);
}
function renderDidSuspendDelayIfPossible() {
  if (
    workInProgressRootExitStatus === RootIncomplete ||
    workInProgressRootExitStatus === RootSuspended
  )
    workInProgressRootExitStatus = RootSuspendedWithDelay;
  0 !== workInProgressRootNextUnprocessedUpdateTime &&
    null !== workInProgressRoot &&
    (markRootSuspendedAtTime(workInProgressRoot, renderExpirationTime),
    markRootUpdatedAtTime(
      workInProgressRoot,
      workInProgressRootNextUnprocessedUpdateTime
    ));
}
function workLoopSync() {
  for (; null !== workInProgress; )
    workInProgress = performUnitOfWork(workInProgress);
}
function workLoopConcurrent() {
  for (; null !== workInProgress && !Scheduler_shouldYield(); )
    workInProgress = performUnitOfWork(workInProgress);
}
function performUnitOfWork(unitOfWork) {
  var current$$1 = unitOfWork.alternate;
  startWorkTimer(unitOfWork);
  0 !== (unitOfWork.mode & 8)
    ? ((profilerStartTime = now$1()),
      0 > unitOfWork.actualStartTime && (unitOfWork.actualStartTime = now$1()),
      (current$$1 = beginWork$$1(current$$1, unitOfWork, renderExpirationTime)),
      stopProfilerTimerIfRunningAndRecordDelta(unitOfWork, !0))
    : (current$$1 = beginWork$$1(current$$1, unitOfWork, renderExpirationTime));
  unitOfWork.memoizedProps = unitOfWork.pendingProps;
  null === current$$1 && (current$$1 = completeUnitOfWork(unitOfWork));
  ReactCurrentOwner$1.current = null;
  return current$$1;
}
function completeUnitOfWork(unitOfWork) {
  workInProgress = unitOfWork;
  do {
    var current$$1 = workInProgress.alternate;
    unitOfWork = workInProgress.return;
    if (0 === (workInProgress.effectTag & 2048)) {
      if (0 === (workInProgress.mode & 8))
        current$$1 = completeWork(
          current$$1,
          workInProgress,
          renderExpirationTime
        );
      else {
        var fiber = workInProgress;
        profilerStartTime = now$1();
        0 > fiber.actualStartTime && (fiber.actualStartTime = now$1());
        current$$1 = completeWork(
          current$$1,
          workInProgress,
          renderExpirationTime
        );
        stopProfilerTimerIfRunningAndRecordDelta(workInProgress, !1);
      }
      stopWorkTimer(workInProgress);
      fiber = workInProgress;
      if (1 === renderExpirationTime || 1 !== fiber.childExpirationTime) {
        var newChildExpirationTime = 0;
        if (0 !== (fiber.mode & 8)) {
          for (
            var actualDuration = fiber.actualDuration,
              treeBaseDuration = fiber.selfBaseDuration,
              shouldBubbleActualDurations =
                null === fiber.alternate ||
                fiber.child !== fiber.alternate.child,
              child = fiber.child;
            null !== child;

          ) {
            var childUpdateExpirationTime = child.expirationTime,
              childChildExpirationTime = child.childExpirationTime;
            childUpdateExpirationTime > newChildExpirationTime &&
              (newChildExpirationTime = childUpdateExpirationTime);
            childChildExpirationTime > newChildExpirationTime &&
              (newChildExpirationTime = childChildExpirationTime);
            shouldBubbleActualDurations &&
              (actualDuration += child.actualDuration);
            treeBaseDuration += child.treeBaseDuration;
            child = child.sibling;
          }
          fiber.actualDuration = actualDuration;
          fiber.treeBaseDuration = treeBaseDuration;
        } else
          for (actualDuration = fiber.child; null !== actualDuration; )
            (treeBaseDuration = actualDuration.expirationTime),
              (shouldBubbleActualDurations =
                actualDuration.childExpirationTime),
              treeBaseDuration > newChildExpirationTime &&
                (newChildExpirationTime = treeBaseDuration),
              shouldBubbleActualDurations > newChildExpirationTime &&
                (newChildExpirationTime = shouldBubbleActualDurations),
              (actualDuration = actualDuration.sibling);
        fiber.childExpirationTime = newChildExpirationTime;
      }
      if (null !== current$$1) return current$$1;
      null !== unitOfWork &&
        0 === (unitOfWork.effectTag & 2048) &&
        (null === unitOfWork.firstEffect &&
          (unitOfWork.firstEffect = workInProgress.firstEffect),
        null !== workInProgress.lastEffect &&
          (null !== unitOfWork.lastEffect &&
            (unitOfWork.lastEffect.nextEffect = workInProgress.firstEffect),
          (unitOfWork.lastEffect = workInProgress.lastEffect)),
        1 < workInProgress.effectTag &&
          (null !== unitOfWork.lastEffect
            ? (unitOfWork.lastEffect.nextEffect = workInProgress)
            : (unitOfWork.firstEffect = workInProgress),
          (unitOfWork.lastEffect = workInProgress)));
    } else {
      current$$1 = unwindWork(workInProgress, renderExpirationTime);
      if (0 !== (workInProgress.mode & 8)) {
        stopProfilerTimerIfRunningAndRecordDelta(workInProgress, !1);
        fiber = workInProgress.actualDuration;
        for (
          newChildExpirationTime = workInProgress.child;
          null !== newChildExpirationTime;

        )
          (fiber += newChildExpirationTime.actualDuration),
            (newChildExpirationTime = newChildExpirationTime.sibling);
        workInProgress.actualDuration = fiber;
      }
      if (null !== current$$1)
        return (
          (unitOfWork = workInProgress),
          enableUserTimingAPI &&
            supportsUserTiming &&
            !shouldIgnoreFiber(unitOfWork) &&
            ((currentFiber = unitOfWork.return),
            unitOfWork._debugIsCurrentlyTiming &&
              ((unitOfWork._debugIsCurrentlyTiming = !1),
              endFiberMark(
                unitOfWork,
                null,
                13 === unitOfWork.tag
                  ? "Rendering was suspended"
                  : "An error was thrown inside this error boundary"
              ))),
          (current$$1.effectTag &= 2047),
          current$$1
        );
      stopWorkTimer(workInProgress);
      null !== unitOfWork &&
        ((unitOfWork.firstEffect = unitOfWork.lastEffect = null),
        (unitOfWork.effectTag |= 2048));
    }
    current$$1 = workInProgress.sibling;
    if (null !== current$$1) return current$$1;
    workInProgress = unitOfWork;
  } while (null !== workInProgress);
  workInProgressRootExitStatus === RootIncomplete &&
    (workInProgressRootExitStatus = RootCompleted);
  return null;
}
function getRemainingExpirationTime(fiber) {
  var updateExpirationTime = fiber.expirationTime;
  fiber = fiber.childExpirationTime;
  return updateExpirationTime > fiber ? updateExpirationTime : fiber;
}
function commitRoot(root) {
  var renderPriorityLevel = getCurrentPriorityLevel();
  runWithPriority(99, commitRootImpl.bind(null, root, renderPriorityLevel));
  return null;
}
function commitRootImpl(root, renderPriorityLevel) {
  do flushPassiveEffects();
  while (null !== rootWithPendingPassiveEffects);
  if ((executionContext & (RenderContext | CommitContext)) !== NoContext)
    throw Error(formatProdErrorMessage(327));
  var finishedWork = root.finishedWork,
    expirationTime = root.finishedExpirationTime;
  if (null === finishedWork) return null;
  root.finishedWork = null;
  root.finishedExpirationTime = 0;
  if (finishedWork === root.current) throw Error(formatProdErrorMessage(177));
  root.callbackNode = null;
  root.callbackExpirationTime = 0;
  root.callbackPriority = 90;
  root.nextKnownPendingLevel = 0;
  enableUserTimingAPI &&
    supportsUserTiming &&
    ((isCommitting = !0),
    (hasScheduledUpdateInCurrentCommit = !1),
    labelsInCurrentCommit.clear(),
    beginMark("(Committing Changes)"));
  var remainingExpirationTimeBeforeCommit = getRemainingExpirationTime(
    finishedWork
  );
  root.firstPendingTime = remainingExpirationTimeBeforeCommit;
  expirationTime <= root.lastSuspendedTime
    ? (root.firstSuspendedTime = root.lastSuspendedTime = root.nextKnownPendingLevel = 0)
    : expirationTime <= root.firstSuspendedTime &&
      (root.firstSuspendedTime = expirationTime - 1);
  expirationTime <= root.lastPingedTime && (root.lastPingedTime = 0);
  expirationTime <= root.lastExpiredTime && (root.lastExpiredTime = 0);
  root === workInProgressRoot &&
    ((workInProgress = workInProgressRoot = null), (renderExpirationTime = 0));
  1 < finishedWork.effectTag
    ? null !== finishedWork.lastEffect
      ? ((finishedWork.lastEffect.nextEffect = finishedWork),
        (remainingExpirationTimeBeforeCommit = finishedWork.firstEffect))
      : (remainingExpirationTimeBeforeCommit = finishedWork)
    : (remainingExpirationTimeBeforeCommit = finishedWork.firstEffect);
  if (null !== remainingExpirationTimeBeforeCommit) {
    var prevExecutionContext = executionContext;
    executionContext |= CommitContext;
    var prevInteractions = pushInteractions(root);
    ReactCurrentOwner$1.current = null;
    startCommitSnapshotEffectsTimer();
    eventsEnabled = _enabled;
    var focusedElem = getActiveElementDeep();
    if (hasSelectionCapabilities(focusedElem)) {
      if ("selectionStart" in focusedElem)
        var JSCompiler_temp = {
          start: focusedElem.selectionStart,
          end: focusedElem.selectionEnd
        };
      else
        a: {
          JSCompiler_temp =
            ((JSCompiler_temp = focusedElem.ownerDocument) &&
              JSCompiler_temp.defaultView) ||
            window;
          var selection =
            JSCompiler_temp.getSelection && JSCompiler_temp.getSelection();
          if (selection && 0 !== selection.rangeCount) {
            JSCompiler_temp = selection.anchorNode;
            var anchorOffset = selection.anchorOffset,
              focusNode = selection.focusNode;
            selection = selection.focusOffset;
            try {
              JSCompiler_temp.nodeType, focusNode.nodeType;
            } catch (e) {
              JSCompiler_temp = null;
              break a;
            }
            var length = 0,
              start = -1,
              end = -1,
              indexWithinAnchor = 0,
              indexWithinFocus = 0,
              node = focusedElem,
              parentNode = null;
            b: for (;;) {
              for (var next; ; ) {
                node !== JSCompiler_temp ||
                  (0 !== anchorOffset && 3 !== node.nodeType) ||
                  (start = length + anchorOffset);
                node !== focusNode ||
                  (0 !== selection && 3 !== node.nodeType) ||
                  (end = length + selection);
                3 === node.nodeType && (length += node.nodeValue.length);
                if (null === (next = node.firstChild)) break;
                parentNode = node;
                node = next;
              }
              for (;;) {
                if (node === focusedElem) break b;
                parentNode === JSCompiler_temp &&
                  ++indexWithinAnchor === anchorOffset &&
                  (start = length);
                parentNode === focusNode &&
                  ++indexWithinFocus === selection &&
                  (end = length);
                if (null !== (next = node.nextSibling)) break;
                node = parentNode;
                parentNode = node.parentNode;
              }
              node = next;
            }
            JSCompiler_temp =
              -1 === start || -1 === end ? null : { start: start, end: end };
          } else JSCompiler_temp = null;
        }
      JSCompiler_temp = JSCompiler_temp || { start: 0, end: 0 };
    } else JSCompiler_temp = null;
    selectionInformation = {
      activeElementDetached: null,
      focusedElem: focusedElem,
      selectionRange: JSCompiler_temp
    };
    _enabled = !1;
    nextEffect = remainingExpirationTimeBeforeCommit;
    do
      try {
        commitBeforeMutationEffects();
      } catch (error) {
        if (null === nextEffect) throw Error(formatProdErrorMessage(330));
        captureCommitPhaseError(nextEffect, error);
        nextEffect = nextEffect.nextEffect;
      }
    while (null !== nextEffect);
    stopCommitSnapshotEffectsTimer();
    commitTime = now$1();
    startCommitHostEffectsTimer();
    nextEffect = remainingExpirationTimeBeforeCommit;
    do
      try {
        for (
          focusedElem = root, JSCompiler_temp = renderPriorityLevel;
          null !== nextEffect;

        ) {
          var effectTag = nextEffect.effectTag;
          effectTag & 16 && setTextContent(nextEffect.stateNode, "");
          if (effectTag & 128) {
            var current$$1 = nextEffect.alternate;
            if (null !== current$$1) {
              var currentRef = current$$1.ref;
              null !== currentRef &&
                ("function" === typeof currentRef
                  ? currentRef(null)
                  : (currentRef.current = null));
            }
          }
          switch (effectTag & 1038) {
            case 2:
              commitPlacement(nextEffect);
              nextEffect.effectTag &= -3;
              break;
            case 6:
              commitPlacement(nextEffect);
              nextEffect.effectTag &= -3;
              commitWork(nextEffect.alternate, nextEffect);
              break;
            case 1024:
              nextEffect.effectTag &= -1025;
              break;
            case 1028:
              nextEffect.effectTag &= -1025;
              commitWork(nextEffect.alternate, nextEffect);
              break;
            case 4:
              commitWork(nextEffect.alternate, nextEffect);
              break;
            case 8:
              (anchorOffset = nextEffect),
                unmountHostComponents(
                  focusedElem,
                  anchorOffset,
                  JSCompiler_temp
                ),
                detachFiber(anchorOffset);
          }
          enableUserTimingAPI && effectCountInCurrentCommit++;
          nextEffect = nextEffect.nextEffect;
        }
      } catch (error) {
        if (null === nextEffect) throw Error(formatProdErrorMessage(330));
        captureCommitPhaseError(nextEffect, error);
        nextEffect = nextEffect.nextEffect;
      }
    while (null !== nextEffect);
    stopCommitHostEffectsTimer();
    currentRef = selectionInformation;
    current$$1 = getActiveElementDeep();
    effectTag = currentRef.focusedElem;
    JSCompiler_temp = currentRef.selectionRange;
    if (
      current$$1 !== effectTag &&
      effectTag &&
      effectTag.ownerDocument &&
      containsNode(effectTag.ownerDocument.documentElement, effectTag)
    ) {
      null !== JSCompiler_temp &&
        hasSelectionCapabilities(effectTag) &&
        ((current$$1 = JSCompiler_temp.start),
        (currentRef = JSCompiler_temp.end),
        void 0 === currentRef && (currentRef = current$$1),
        "selectionStart" in effectTag
          ? ((effectTag.selectionStart = current$$1),
            (effectTag.selectionEnd = Math.min(
              currentRef,
              effectTag.value.length
            )))
          : ((currentRef =
              ((current$$1 = effectTag.ownerDocument || document) &&
                current$$1.defaultView) ||
              window),
            currentRef.getSelection &&
              ((currentRef = currentRef.getSelection()),
              (anchorOffset = effectTag.textContent.length),
              (focusedElem = Math.min(JSCompiler_temp.start, anchorOffset)),
              (JSCompiler_temp =
                void 0 === JSCompiler_temp.end
                  ? focusedElem
                  : Math.min(JSCompiler_temp.end, anchorOffset)),
              !currentRef.extend &&
                focusedElem > JSCompiler_temp &&
                ((anchorOffset = JSCompiler_temp),
                (JSCompiler_temp = focusedElem),
                (focusedElem = anchorOffset)),
              (anchorOffset = getNodeForCharacterOffset(
                effectTag,
                focusedElem
              )),
              (focusNode = getNodeForCharacterOffset(
                effectTag,
                JSCompiler_temp
              )),
              anchorOffset &&
                focusNode &&
                (1 !== currentRef.rangeCount ||
                  currentRef.anchorNode !== anchorOffset.node ||
                  currentRef.anchorOffset !== anchorOffset.offset ||
                  currentRef.focusNode !== focusNode.node ||
                  currentRef.focusOffset !== focusNode.offset) &&
                ((current$$1 = current$$1.createRange()),
                current$$1.setStart(anchorOffset.node, anchorOffset.offset),
                currentRef.removeAllRanges(),
                focusedElem > JSCompiler_temp
                  ? (currentRef.addRange(current$$1),
                    currentRef.extend(focusNode.node, focusNode.offset))
                  : (current$$1.setEnd(focusNode.node, focusNode.offset),
                    currentRef.addRange(current$$1))))));
      current$$1 = [];
      for (currentRef = effectTag; (currentRef = currentRef.parentNode); )
        1 === currentRef.nodeType &&
          current$$1.push({
            element: currentRef,
            left: currentRef.scrollLeft,
            top: currentRef.scrollTop
          });
      "function" === typeof effectTag.focus && effectTag.focus();
      for (effectTag = 0; effectTag < current$$1.length; effectTag++)
        (currentRef = current$$1[effectTag]),
          (currentRef.element.scrollLeft = currentRef.left),
          (currentRef.element.scrollTop = currentRef.top);
    }
    _enabled = !!eventsEnabled;
    eventsEnabled = null;
    effectTag = selectionInformation.activeElementDetached;
    null !== effectTag &&
      dispatchEventForResponderEventSystem(
        "blur",
        null,
        { isTargetAttached: !1, target: effectTag, timeStamp: Date.now() },
        effectTag,
        6
      );
    selectionInformation = null;
    root.current = finishedWork;
    startCommitLifeCyclesTimer();
    nextEffect = remainingExpirationTimeBeforeCommit;
    do
      try {
        for (
          effectTag = root, current$$1 = expirationTime;
          null !== nextEffect;

        ) {
          var effectTag$jscomp$0 = nextEffect.effectTag;
          if (effectTag$jscomp$0 & 36) {
            enableUserTimingAPI && effectCountInCurrentCommit++;
            JSCompiler_temp = effectTag;
            var current$$1$jscomp$0 = nextEffect.alternate;
            currentRef = nextEffect;
            focusedElem = current$$1;
            switch (currentRef.tag) {
              case 0:
              case 11:
              case 15:
                commitHookEffectList(UnmountLayout, MountLayout, currentRef);
                break;
              case 1:
                var instance = currentRef.stateNode;
                if (currentRef.effectTag & 4) {
                  if (null === current$$1$jscomp$0)
                    startPhaseTimer(currentRef, "componentDidMount"),
                      instance.componentDidMount();
                  else {
                    var prevProps =
                        currentRef.elementType === currentRef.type
                          ? current$$1$jscomp$0.memoizedProps
                          : resolveDefaultProps(
                              currentRef.type,
                              current$$1$jscomp$0.memoizedProps
                            ),
                      prevState = current$$1$jscomp$0.memoizedState;
                    startPhaseTimer(currentRef, "componentDidUpdate");
                    instance.componentDidUpdate(
                      prevProps,
                      prevState,
                      instance.__reactInternalSnapshotBeforeUpdate
                    );
                  }
                  stopPhaseTimer();
                }
                var updateQueue = currentRef.updateQueue;
                null !== updateQueue &&
                  commitUpdateQueue(
                    currentRef,
                    updateQueue,
                    instance,
                    focusedElem
                  );
                break;
              case 3:
                var _updateQueue = currentRef.updateQueue;
                if (null !== _updateQueue) {
                  JSCompiler_temp = null;
                  if (null !== currentRef.child)
                    switch (currentRef.child.tag) {
                      case 5:
                        JSCompiler_temp = currentRef.child.stateNode;
                        break;
                      case 1:
                        JSCompiler_temp = currentRef.child.stateNode;
                    }
                  commitUpdateQueue(
                    currentRef,
                    _updateQueue,
                    JSCompiler_temp,
                    focusedElem
                  );
                }
                break;
              case 5:
                var _instance2 = currentRef.stateNode;
                null === current$$1$jscomp$0 &&
                  currentRef.effectTag & 4 &&
                  shouldAutoFocusHostComponent(
                    currentRef.type,
                    currentRef.memoizedProps
                  ) &&
                  _instance2.focus();
                break;
              case 6:
                break;
              case 4:
                break;
              case 12:
                var onRender = currentRef.memoizedProps.onRender;
                "function" === typeof onRender &&
                  onRender(
                    currentRef.memoizedProps.id,
                    null === current$$1$jscomp$0 ? "mount" : "update",
                    currentRef.actualDuration,
                    currentRef.treeBaseDuration,
                    currentRef.actualStartTime,
                    commitTime,
                    JSCompiler_temp.memoizedInteractions
                  );
                break;
              case 13:
                if (null === currentRef.memoizedState) {
                  var current$$1$jscomp$1 = currentRef.alternate;
                  if (null !== current$$1$jscomp$1) {
                    var prevState$jscomp$0 = current$$1$jscomp$1.memoizedState;
                    if (null !== prevState$jscomp$0) {
                      var suspenseInstance = prevState$jscomp$0.dehydrated;
                      if (null !== suspenseInstance) {
                        retryIfBlockedOn(suspenseInstance);
                        var hydrationCallbacks =
                          JSCompiler_temp.hydrationCallbacks;
                        if (null !== hydrationCallbacks) {
                          var onHydrated = hydrationCallbacks.onHydrated;
                          onHydrated && onHydrated(suspenseInstance);
                        }
                      }
                    }
                  }
                }
                break;
              case 19:
              case 17:
              case 20:
              case 21:
                break;
              default:
                throw Error(formatProdErrorMessage(163));
            }
          }
          if (effectTag$jscomp$0 & 128) {
            enableUserTimingAPI && effectCountInCurrentCommit++;
            currentRef = void 0;
            var ref = nextEffect.ref;
            if (null !== ref) {
              var instance$jscomp$0 = nextEffect.stateNode;
              switch (nextEffect.tag) {
                case 5:
                  currentRef = instance$jscomp$0;
                  break;
                default:
                  currentRef = instance$jscomp$0;
              }
              21 === nextEffect.tag && (currentRef = instance$jscomp$0.methods);
              "function" === typeof ref
                ? ref(currentRef)
                : (ref.current = currentRef);
            }
          }
          nextEffect = nextEffect.nextEffect;
        }
      } catch (error) {
        if (null === nextEffect) throw Error(formatProdErrorMessage(330));
        captureCommitPhaseError(nextEffect, error);
        nextEffect = nextEffect.nextEffect;
      }
    while (null !== nextEffect);
    stopCommitLifeCyclesTimer();
    nextEffect = null;
    requestPaint();
    tracing.__interactionsRef.current = prevInteractions;
    executionContext = prevExecutionContext;
  } else
    (root.current = finishedWork),
      startCommitSnapshotEffectsTimer(),
      stopCommitSnapshotEffectsTimer(),
      (commitTime = now$1()),
      startCommitHostEffectsTimer(),
      stopCommitHostEffectsTimer(),
      startCommitLifeCyclesTimer(),
      stopCommitLifeCyclesTimer();
  enableUserTimingAPI &&
    supportsUserTiming &&
    ((effectTag$jscomp$0 = null),
    hasScheduledUpdateInCurrentCommit
      ? (effectTag$jscomp$0 = "Lifecycle hook scheduled a cascading update")
      : 0 < commitCountInCurrentWorkLoop &&
        (effectTag$jscomp$0 = "Caused by a cascading update in earlier commit"),
    (hasScheduledUpdateInCurrentCommit = !1),
    commitCountInCurrentWorkLoop++,
    (isCommitting = !1),
    labelsInCurrentCommit.clear(),
    endMark(
      "(Committing Changes)",
      "(Committing Changes)",
      effectTag$jscomp$0
    ));
  if ((effectTag$jscomp$0 = rootDoesHavePassiveEffects))
    (rootDoesHavePassiveEffects = !1),
      (rootWithPendingPassiveEffects = root),
      (pendingPassiveEffectsExpirationTime = expirationTime),
      (pendingPassiveEffectsRenderPriority = renderPriorityLevel);
  else
    for (
      nextEffect = remainingExpirationTimeBeforeCommit;
      null !== nextEffect;

    )
      (renderPriorityLevel = nextEffect.nextEffect),
        (nextEffect.nextEffect = null),
        (nextEffect = renderPriorityLevel);
  renderPriorityLevel = root.firstPendingTime;
  if (0 !== renderPriorityLevel) {
    if (null !== spawnedWorkDuringRender)
      for (
        remainingExpirationTimeBeforeCommit = spawnedWorkDuringRender,
          spawnedWorkDuringRender = null,
          current$$1$jscomp$0 = 0;
        current$$1$jscomp$0 < remainingExpirationTimeBeforeCommit.length;
        current$$1$jscomp$0++
      )
        scheduleInteractions(
          root,
          remainingExpirationTimeBeforeCommit[current$$1$jscomp$0],
          root.memoizedInteractions
        );
    schedulePendingInteractions(root, renderPriorityLevel);
  } else legacyErrorBoundariesThatAlreadyFailed = null;
  effectTag$jscomp$0 || finishPendingInteractions(root, expirationTime);
  1073741823 === renderPriorityLevel
    ? root === rootWithNestedUpdates
      ? nestedUpdateCount++
      : ((nestedUpdateCount = 0), (rootWithNestedUpdates = root))
    : (nestedUpdateCount = 0);
  "function" === typeof onCommitFiberRoot &&
    onCommitFiberRoot(finishedWork.stateNode, expirationTime);
  ensureRootIsScheduled(root);
  if (hasUncaughtError)
    throw ((hasUncaughtError = !1),
    (root = firstUncaughtError),
    (firstUncaughtError = null),
    root);
  if ((executionContext & LegacyUnbatchedContext) !== NoContext) return null;
  flushSyncCallbackQueue();
  return null;
}
function commitBeforeMutationEffects() {
  for (; null !== nextEffect; ) {
    var effectTag = nextEffect.effectTag;
    0 !== (effectTag & 256) &&
      (enableUserTimingAPI && effectCountInCurrentCommit++,
      commitBeforeMutationLifeCycles(nextEffect.alternate, nextEffect));
    0 === (effectTag & 512) ||
      rootDoesHavePassiveEffects ||
      ((rootDoesHavePassiveEffects = !0),
      scheduleCallback(97, function() {
        flushPassiveEffects();
        return null;
      }));
    nextEffect = nextEffect.nextEffect;
  }
}
function flushPassiveEffects() {
  if (90 !== pendingPassiveEffectsRenderPriority) {
    var priorityLevel =
      97 < pendingPassiveEffectsRenderPriority
        ? 97
        : pendingPassiveEffectsRenderPriority;
    pendingPassiveEffectsRenderPriority = 90;
    return runWithPriority(priorityLevel, flushPassiveEffectsImpl);
  }
}
function flushPassiveEffectsImpl() {
  if (null === rootWithPendingPassiveEffects) return !1;
  var root = rootWithPendingPassiveEffects,
    expirationTime = pendingPassiveEffectsExpirationTime;
  rootWithPendingPassiveEffects = null;
  pendingPassiveEffectsExpirationTime = 0;
  if ((executionContext & (RenderContext | CommitContext)) !== NoContext)
    throw Error(formatProdErrorMessage(331));
  var prevExecutionContext = executionContext;
  executionContext |= CommitContext;
  for (
    var prevInteractions = pushInteractions(root),
      effect = root.current.firstEffect;
    null !== effect;

  ) {
    try {
      var finishedWork = effect;
      if (0 !== (finishedWork.effectTag & 512))
        switch (finishedWork.tag) {
          case 0:
          case 11:
          case 15:
            commitHookEffectList(UnmountPassive, NoEffect$1, finishedWork),
              commitHookEffectList(NoEffect$1, MountPassive, finishedWork);
        }
    } catch (error) {
      if (null === effect) throw Error(formatProdErrorMessage(330));
      captureCommitPhaseError(effect, error);
    }
    finishedWork = effect.nextEffect;
    effect.nextEffect = null;
    effect = finishedWork;
  }
  tracing.__interactionsRef.current = prevInteractions;
  finishPendingInteractions(root, expirationTime);
  executionContext = prevExecutionContext;
  flushSyncCallbackQueue();
  return !0;
}
function captureCommitPhaseErrorOnRoot(rootFiber, sourceFiber, error) {
  sourceFiber = createCapturedValue(error, sourceFiber);
  sourceFiber = createRootErrorUpdate(rootFiber, sourceFiber, 1073741823);
  enqueueUpdate(rootFiber, sourceFiber);
  rootFiber = markUpdateTimeFromFiberToRoot(rootFiber, 1073741823);
  null !== rootFiber &&
    (ensureRootIsScheduled(rootFiber),
    schedulePendingInteractions(rootFiber, 1073741823));
}
function captureCommitPhaseError(sourceFiber, error) {
  if (3 === sourceFiber.tag)
    captureCommitPhaseErrorOnRoot(sourceFiber, sourceFiber, error);
  else
    for (var fiber = sourceFiber.return; null !== fiber; ) {
      if (3 === fiber.tag) {
        captureCommitPhaseErrorOnRoot(fiber, sourceFiber, error);
        break;
      } else if (1 === fiber.tag) {
        var instance = fiber.stateNode;
        if (
          "function" === typeof fiber.type.getDerivedStateFromError ||
          ("function" === typeof instance.componentDidCatch &&
            (null === legacyErrorBoundariesThatAlreadyFailed ||
              !legacyErrorBoundariesThatAlreadyFailed.has(instance)))
        ) {
          sourceFiber = createCapturedValue(error, sourceFiber);
          sourceFiber = createClassErrorUpdate(fiber, sourceFiber, 1073741823);
          enqueueUpdate(fiber, sourceFiber);
          fiber = markUpdateTimeFromFiberToRoot(fiber, 1073741823);
          null !== fiber &&
            (ensureRootIsScheduled(fiber),
            schedulePendingInteractions(fiber, 1073741823));
          break;
        }
      }
      fiber = fiber.return;
    }
}
function pingSuspendedRoot(root, thenable, suspendedTime) {
  var pingCache = root.pingCache;
  null !== pingCache && pingCache.delete(thenable);
  workInProgressRoot === root && renderExpirationTime === suspendedTime
    ? workInProgressRootExitStatus === RootSuspendedWithDelay ||
      (workInProgressRootExitStatus === RootSuspended &&
        1073741823 === workInProgressRootLatestProcessedExpirationTime &&
        now() - globalMostRecentFallbackTime < FALLBACK_THROTTLE_MS)
      ? prepareFreshStack(root, renderExpirationTime)
      : (workInProgressRootHasPendingPing = !0)
    : isRootSuspendedAtTime(root, suspendedTime) &&
      ((thenable = root.lastPingedTime),
      (0 !== thenable && thenable < suspendedTime) ||
        ((root.lastPingedTime = suspendedTime),
        root.finishedExpirationTime === suspendedTime &&
          ((root.finishedExpirationTime = 0), (root.finishedWork = null)),
        ensureRootIsScheduled(root),
        schedulePendingInteractions(root, suspendedTime)));
}
function retryTimedOutBoundary(boundaryFiber, retryTime) {
  0 === retryTime &&
    ((retryTime = requestCurrentTimeForUpdate()),
    (retryTime = computeExpirationForFiber(retryTime, boundaryFiber, null)));
  boundaryFiber = markUpdateTimeFromFiberToRoot(boundaryFiber, retryTime);
  null !== boundaryFiber &&
    (ensureRootIsScheduled(boundaryFiber),
    schedulePendingInteractions(boundaryFiber, retryTime));
}
function retryDehydratedSuspenseBoundary(boundaryFiber) {
  var suspenseState = boundaryFiber.memoizedState,
    retryTime = 0;
  null !== suspenseState && (retryTime = suspenseState.retryTime);
  retryTimedOutBoundary(boundaryFiber, retryTime);
}
function resolveRetryThenable(boundaryFiber, thenable) {
  var retryTime = 0;
  switch (boundaryFiber.tag) {
    case 13:
      var retryCache = boundaryFiber.stateNode;
      var suspenseState = boundaryFiber.memoizedState;
      null !== suspenseState && (retryTime = suspenseState.retryTime);
      break;
    case 19:
      retryCache = boundaryFiber.stateNode;
      break;
    default:
      throw Error(formatProdErrorMessage(314));
  }
  null !== retryCache && retryCache.delete(thenable);
  retryTimedOutBoundary(boundaryFiber, retryTime);
}
var beginWork$$1;
beginWork$$1 = function(current$$1, workInProgress, renderExpirationTime) {
  var updateExpirationTime = workInProgress.expirationTime;
  if (null !== current$$1) {
    var newProps = workInProgress.pendingProps;
    if (
      current$$1.memoizedProps !== newProps ||
      didPerformWorkStackCursor.current
    )
      didReceiveUpdate = !0;
    else {
      if (updateExpirationTime < renderExpirationTime) {
        didReceiveUpdate = !1;
        switch (workInProgress.tag) {
          case 3:
            pushHostRootContext(workInProgress);
            resetHydrationState();
            break;
          case 5:
            pushHostContext(workInProgress);
            if (
              workInProgress.mode & 4 &&
              1 !== renderExpirationTime &&
              newProps.hidden
            )
              return (
                markSpawnedWork(1),
                (workInProgress.expirationTime = workInProgress.childExpirationTime = 1),
                null
              );
            break;
          case 1:
            isContextProvider(workInProgress.type) &&
              pushContextProvider(workInProgress);
            break;
          case 4:
            pushHostContainer(
              workInProgress,
              workInProgress.stateNode.containerInfo
            );
            break;
          case 10:
            pushProvider(workInProgress, workInProgress.memoizedProps.value);
            break;
          case 12:
            workInProgress.childExpirationTime >= renderExpirationTime &&
              (workInProgress.effectTag |= 4);
            break;
          case 13:
            updateExpirationTime = workInProgress.memoizedState;
            if (null !== updateExpirationTime) {
              if (null !== updateExpirationTime.dehydrated) {
                push(
                  suspenseStackCursor,
                  suspenseStackCursor.current & SubtreeSuspenseContextMask,
                  workInProgress
                );
                workInProgress.effectTag |= 64;
                break;
              }
              updateExpirationTime = workInProgress.child.childExpirationTime;
              if (
                0 !== updateExpirationTime &&
                updateExpirationTime >= renderExpirationTime
              )
                return updateSuspenseComponent(
                  current$$1,
                  workInProgress,
                  renderExpirationTime
                );
              push(
                suspenseStackCursor,
                suspenseStackCursor.current & SubtreeSuspenseContextMask,
                workInProgress
              );
              workInProgress = bailoutOnAlreadyFinishedWork(
                current$$1,
                workInProgress,
                renderExpirationTime
              );
              return null !== workInProgress ? workInProgress.sibling : null;
            }
            push(
              suspenseStackCursor,
              suspenseStackCursor.current & SubtreeSuspenseContextMask,
              workInProgress
            );
            break;
          case 19:
            updateExpirationTime =
              workInProgress.childExpirationTime >= renderExpirationTime;
            if (0 !== (current$$1.effectTag & 64)) {
              if (updateExpirationTime)
                return updateSuspenseListComponent(
                  current$$1,
                  workInProgress,
                  renderExpirationTime
                );
              workInProgress.effectTag |= 64;
            }
            newProps = workInProgress.memoizedState;
            null !== newProps &&
              ((newProps.rendering = null), (newProps.tail = null));
            push(
              suspenseStackCursor,
              suspenseStackCursor.current,
              workInProgress
            );
            if (!updateExpirationTime) return null;
        }
        return bailoutOnAlreadyFinishedWork(
          current$$1,
          workInProgress,
          renderExpirationTime
        );
      }
      didReceiveUpdate = !1;
    }
  } else didReceiveUpdate = !1;
  workInProgress.expirationTime = 0;
  switch (workInProgress.tag) {
    case 2:
      updateExpirationTime = workInProgress.type;
      null !== current$$1 &&
        ((current$$1.alternate = null),
        (workInProgress.alternate = null),
        (workInProgress.effectTag |= 2));
      current$$1 = workInProgress.pendingProps;
      newProps = getMaskedContext(workInProgress, contextStackCursor.current);
      prepareToReadContext(workInProgress, renderExpirationTime);
      newProps = renderWithHooks(
        null,
        workInProgress,
        updateExpirationTime,
        current$$1,
        newProps,
        renderExpirationTime
      );
      workInProgress.effectTag |= 1;
      if (
        "object" === typeof newProps &&
        null !== newProps &&
        "function" === typeof newProps.render &&
        void 0 === newProps.$$typeof
      ) {
        workInProgress.tag = 1;
        resetHooks();
        if (isContextProvider(updateExpirationTime)) {
          var hasContext = !0;
          pushContextProvider(workInProgress);
        } else hasContext = !1;
        workInProgress.memoizedState =
          null !== newProps.state && void 0 !== newProps.state
            ? newProps.state
            : null;
        var getDerivedStateFromProps =
          updateExpirationTime.getDerivedStateFromProps;
        "function" === typeof getDerivedStateFromProps &&
          applyDerivedStateFromProps(
            workInProgress,
            updateExpirationTime,
            getDerivedStateFromProps,
            current$$1
          );
        newProps.updater = classComponentUpdater;
        workInProgress.stateNode = newProps;
        newProps._reactInternalFiber = workInProgress;
        mountClassInstance(
          workInProgress,
          updateExpirationTime,
          current$$1,
          renderExpirationTime
        );
        workInProgress = finishClassComponent(
          null,
          workInProgress,
          updateExpirationTime,
          !0,
          hasContext,
          renderExpirationTime
        );
      } else
        (workInProgress.tag = 0),
          reconcileChildren(
            null,
            workInProgress,
            newProps,
            renderExpirationTime
          ),
          (workInProgress = workInProgress.child);
      return workInProgress;
    case 16:
      newProps = workInProgress.elementType;
      null !== current$$1 &&
        ((current$$1.alternate = null),
        (workInProgress.alternate = null),
        (workInProgress.effectTag |= 2));
      current$$1 = workInProgress.pendingProps;
      cancelWorkTimer(workInProgress);
      initializeLazyComponentType(newProps);
      if (1 !== newProps._status) throw newProps._result;
      newProps = newProps._result;
      workInProgress.type = newProps;
      hasContext = workInProgress.tag = resolveLazyComponentTag(newProps);
      startWorkTimer(workInProgress);
      current$$1 = resolveDefaultProps(newProps, current$$1);
      switch (hasContext) {
        case 0:
          workInProgress = updateFunctionComponent(
            null,
            workInProgress,
            newProps,
            current$$1,
            renderExpirationTime
          );
          break;
        case 1:
          workInProgress = updateClassComponent(
            null,
            workInProgress,
            newProps,
            current$$1,
            renderExpirationTime
          );
          break;
        case 11:
          workInProgress = updateForwardRef(
            null,
            workInProgress,
            newProps,
            current$$1,
            renderExpirationTime
          );
          break;
        case 14:
          workInProgress = updateMemoComponent(
            null,
            workInProgress,
            newProps,
            resolveDefaultProps(newProps.type, current$$1),
            updateExpirationTime,
            renderExpirationTime
          );
          break;
        default:
          throw Error(formatProdErrorMessage(306, newProps, ""));
      }
      return workInProgress;
    case 0:
      return (
        (updateExpirationTime = workInProgress.type),
        (newProps = workInProgress.pendingProps),
        (newProps =
          workInProgress.elementType === updateExpirationTime
            ? newProps
            : resolveDefaultProps(updateExpirationTime, newProps)),
        updateFunctionComponent(
          current$$1,
          workInProgress,
          updateExpirationTime,
          newProps,
          renderExpirationTime
        )
      );
    case 1:
      return (
        (updateExpirationTime = workInProgress.type),
        (newProps = workInProgress.pendingProps),
        (newProps =
          workInProgress.elementType === updateExpirationTime
            ? newProps
            : resolveDefaultProps(updateExpirationTime, newProps)),
        updateClassComponent(
          current$$1,
          workInProgress,
          updateExpirationTime,
          newProps,
          renderExpirationTime
        )
      );
    case 3:
      pushHostRootContext(workInProgress);
      updateExpirationTime = workInProgress.updateQueue;
      if (null === updateExpirationTime)
        throw Error(formatProdErrorMessage(282));
      newProps = workInProgress.memoizedState;
      newProps = null !== newProps ? newProps.element : null;
      processUpdateQueue(
        workInProgress,
        updateExpirationTime,
        workInProgress.pendingProps,
        null,
        renderExpirationTime
      );
      updateExpirationTime = workInProgress.memoizedState.element;
      if (updateExpirationTime === newProps)
        resetHydrationState(),
          (workInProgress = bailoutOnAlreadyFinishedWork(
            current$$1,
            workInProgress,
            renderExpirationTime
          ));
      else {
        if ((newProps = workInProgress.stateNode.hydrate))
          (nextHydratableInstance = getNextHydratable(
            workInProgress.stateNode.containerInfo.firstChild
          )),
            (hydrationParentFiber = workInProgress),
            (newProps = isHydrating = !0);
        if (newProps)
          for (
            renderExpirationTime = mountChildFibers(
              workInProgress,
              null,
              updateExpirationTime,
              renderExpirationTime
            ),
              workInProgress.child = renderExpirationTime;
            renderExpirationTime;

          )
            (renderExpirationTime.effectTag =
              (renderExpirationTime.effectTag & -3) | 1024),
              (renderExpirationTime = renderExpirationTime.sibling);
        else
          reconcileChildren(
            current$$1,
            workInProgress,
            updateExpirationTime,
            renderExpirationTime
          ),
            resetHydrationState();
        workInProgress = workInProgress.child;
      }
      return workInProgress;
    case 5:
      return (
        pushHostContext(workInProgress),
        null === current$$1 && tryToClaimNextHydratableInstance(workInProgress),
        (updateExpirationTime = workInProgress.type),
        (newProps = workInProgress.pendingProps),
        (hasContext = null !== current$$1 ? current$$1.memoizedProps : null),
        (getDerivedStateFromProps = newProps.children),
        shouldSetTextContent(updateExpirationTime, newProps)
          ? (getDerivedStateFromProps = null)
          : null !== hasContext &&
            shouldSetTextContent(updateExpirationTime, hasContext) &&
            (workInProgress.effectTag |= 16),
        markRef(current$$1, workInProgress),
        workInProgress.mode & 4 && 1 !== renderExpirationTime && newProps.hidden
          ? (markSpawnedWork(1),
            (workInProgress.expirationTime = workInProgress.childExpirationTime = 1),
            (workInProgress = null))
          : (reconcileChildren(
              current$$1,
              workInProgress,
              getDerivedStateFromProps,
              renderExpirationTime
            ),
            (workInProgress = workInProgress.child)),
        workInProgress
      );
    case 6:
      return (
        null === current$$1 && tryToClaimNextHydratableInstance(workInProgress),
        null
      );
    case 13:
      return updateSuspenseComponent(
        current$$1,
        workInProgress,
        renderExpirationTime
      );
    case 4:
      return (
        pushHostContainer(
          workInProgress,
          workInProgress.stateNode.containerInfo
        ),
        (updateExpirationTime = workInProgress.pendingProps),
        null === current$$1
          ? (workInProgress.child = reconcileChildFibers(
              workInProgress,
              null,
              updateExpirationTime,
              renderExpirationTime
            ))
          : reconcileChildren(
              current$$1,
              workInProgress,
              updateExpirationTime,
              renderExpirationTime
            ),
        workInProgress.child
      );
    case 11:
      return (
        (updateExpirationTime = workInProgress.type),
        (newProps = workInProgress.pendingProps),
        (newProps =
          workInProgress.elementType === updateExpirationTime
            ? newProps
            : resolveDefaultProps(updateExpirationTime, newProps)),
        updateForwardRef(
          current$$1,
          workInProgress,
          updateExpirationTime,
          newProps,
          renderExpirationTime
        )
      );
    case 7:
      return (
        reconcileChildren(
          current$$1,
          workInProgress,
          workInProgress.pendingProps,
          renderExpirationTime
        ),
        workInProgress.child
      );
    case 8:
      return (
        reconcileChildren(
          current$$1,
          workInProgress,
          workInProgress.pendingProps.children,
          renderExpirationTime
        ),
        workInProgress.child
      );
    case 12:
      return (
        (workInProgress.effectTag |= 4),
        reconcileChildren(
          current$$1,
          workInProgress,
          workInProgress.pendingProps.children,
          renderExpirationTime
        ),
        workInProgress.child
      );
    case 10:
      a: {
        updateExpirationTime = workInProgress.type._context;
        newProps = workInProgress.pendingProps;
        getDerivedStateFromProps = workInProgress.memoizedProps;
        hasContext = newProps.value;
        pushProvider(workInProgress, hasContext);
        if (null !== getDerivedStateFromProps) {
          var oldValue = getDerivedStateFromProps.value;
          hasContext = is$1(oldValue, hasContext)
            ? 0
            : ("function" === typeof updateExpirationTime._calculateChangedBits
                ? updateExpirationTime._calculateChangedBits(
                    oldValue,
                    hasContext
                  )
                : 1073741823) | 0;
          if (0 === hasContext) {
            if (
              getDerivedStateFromProps.children === newProps.children &&
              !didPerformWorkStackCursor.current
            ) {
              workInProgress = bailoutOnAlreadyFinishedWork(
                current$$1,
                workInProgress,
                renderExpirationTime
              );
              break a;
            }
          } else
            for (
              getDerivedStateFromProps = workInProgress.child,
                null !== getDerivedStateFromProps &&
                  (getDerivedStateFromProps.return = workInProgress);
              null !== getDerivedStateFromProps;

            ) {
              var list = getDerivedStateFromProps.dependencies;
              if (null !== list) {
                oldValue = getDerivedStateFromProps.child;
                for (
                  var dependency = list.firstContext;
                  null !== dependency;

                ) {
                  if (
                    dependency.context === updateExpirationTime &&
                    0 !== (dependency.observedBits & hasContext)
                  ) {
                    1 === getDerivedStateFromProps.tag &&
                      ((dependency = createUpdate(renderExpirationTime, null)),
                      (dependency.tag = 2),
                      enqueueUpdate(getDerivedStateFromProps, dependency));
                    getDerivedStateFromProps.expirationTime <
                      renderExpirationTime &&
                      (getDerivedStateFromProps.expirationTime = renderExpirationTime);
                    dependency = getDerivedStateFromProps.alternate;
                    null !== dependency &&
                      dependency.expirationTime < renderExpirationTime &&
                      (dependency.expirationTime = renderExpirationTime);
                    scheduleWorkOnParentPath(
                      getDerivedStateFromProps.return,
                      renderExpirationTime
                    );
                    list.expirationTime < renderExpirationTime &&
                      (list.expirationTime = renderExpirationTime);
                    break;
                  }
                  dependency = dependency.next;
                }
              } else if (10 === getDerivedStateFromProps.tag)
                oldValue =
                  getDerivedStateFromProps.type === workInProgress.type
                    ? null
                    : getDerivedStateFromProps.child;
              else if (18 === getDerivedStateFromProps.tag) {
                oldValue = getDerivedStateFromProps.return;
                if (null === oldValue) throw Error(formatProdErrorMessage(341));
                oldValue.expirationTime < renderExpirationTime &&
                  (oldValue.expirationTime = renderExpirationTime);
                list = oldValue.alternate;
                null !== list &&
                  list.expirationTime < renderExpirationTime &&
                  (list.expirationTime = renderExpirationTime);
                scheduleWorkOnParentPath(oldValue, renderExpirationTime);
                oldValue = getDerivedStateFromProps.sibling;
              } else oldValue = getDerivedStateFromProps.child;
              if (null !== oldValue) oldValue.return = getDerivedStateFromProps;
              else
                for (oldValue = getDerivedStateFromProps; null !== oldValue; ) {
                  if (oldValue === workInProgress) {
                    oldValue = null;
                    break;
                  }
                  getDerivedStateFromProps = oldValue.sibling;
                  if (null !== getDerivedStateFromProps) {
                    getDerivedStateFromProps.return = oldValue.return;
                    oldValue = getDerivedStateFromProps;
                    break;
                  }
                  oldValue = oldValue.return;
                }
              getDerivedStateFromProps = oldValue;
            }
        }
        reconcileChildren(
          current$$1,
          workInProgress,
          newProps.children,
          renderExpirationTime
        );
        workInProgress = workInProgress.child;
      }
      return workInProgress;
    case 9:
      return (
        (newProps = workInProgress.type),
        (hasContext = workInProgress.pendingProps),
        (updateExpirationTime = hasContext.children),
        prepareToReadContext(workInProgress, renderExpirationTime),
        (newProps = readContext(newProps, hasContext.unstable_observedBits)),
        (updateExpirationTime = updateExpirationTime(newProps)),
        (workInProgress.effectTag |= 1),
        reconcileChildren(
          current$$1,
          workInProgress,
          updateExpirationTime,
          renderExpirationTime
        ),
        workInProgress.child
      );
    case 14:
      return (
        (newProps = workInProgress.type),
        (hasContext = resolveDefaultProps(
          newProps,
          workInProgress.pendingProps
        )),
        (hasContext = resolveDefaultProps(newProps.type, hasContext)),
        updateMemoComponent(
          current$$1,
          workInProgress,
          newProps,
          hasContext,
          updateExpirationTime,
          renderExpirationTime
        )
      );
    case 15:
      return updateSimpleMemoComponent(
        current$$1,
        workInProgress,
        workInProgress.type,
        workInProgress.pendingProps,
        updateExpirationTime,
        renderExpirationTime
      );
    case 17:
      return (
        (updateExpirationTime = workInProgress.type),
        (newProps = workInProgress.pendingProps),
        (newProps =
          workInProgress.elementType === updateExpirationTime
            ? newProps
            : resolveDefaultProps(updateExpirationTime, newProps)),
        null !== current$$1 &&
          ((current$$1.alternate = null),
          (workInProgress.alternate = null),
          (workInProgress.effectTag |= 2)),
        (workInProgress.tag = 1),
        isContextProvider(updateExpirationTime)
          ? ((current$$1 = !0), pushContextProvider(workInProgress))
          : (current$$1 = !1),
        prepareToReadContext(workInProgress, renderExpirationTime),
        constructClassInstance(
          workInProgress,
          updateExpirationTime,
          newProps,
          renderExpirationTime
        ),
        mountClassInstance(
          workInProgress,
          updateExpirationTime,
          newProps,
          renderExpirationTime
        ),
        finishClassComponent(
          null,
          workInProgress,
          updateExpirationTime,
          !0,
          current$$1,
          renderExpirationTime
        )
      );
    case 19:
      return updateSuspenseListComponent(
        current$$1,
        workInProgress,
        renderExpirationTime
      );
    case 21:
      return (
        reconcileChildren(
          current$$1,
          workInProgress,
          workInProgress.pendingProps.children,
          renderExpirationTime
        ),
        workInProgress.child
      );
  }
  throw Error(formatProdErrorMessage(156, workInProgress.tag));
};
function markSpawnedWork(expirationTime) {
  null === spawnedWorkDuringRender
    ? (spawnedWorkDuringRender = [expirationTime])
    : spawnedWorkDuringRender.push(expirationTime);
}
function scheduleInteractions(root, expirationTime, interactions) {
  if (0 < interactions.size) {
    var pendingInteractionMap = root.pendingInteractionMap,
      pendingInteractions = pendingInteractionMap.get(expirationTime);
    null != pendingInteractions
      ? interactions.forEach(function(interaction) {
          pendingInteractions.has(interaction) || interaction.__count++;
          pendingInteractions.add(interaction);
        })
      : (pendingInteractionMap.set(expirationTime, new Set(interactions)),
        interactions.forEach(function(interaction) {
          interaction.__count++;
        }));
    pendingInteractionMap = tracing.__subscriberRef.current;
    if (null !== pendingInteractionMap)
      pendingInteractionMap.onWorkScheduled(
        interactions,
        1e3 * expirationTime + root.interactionThreadID
      );
  }
}
function schedulePendingInteractions(root, expirationTime) {
  scheduleInteractions(root, expirationTime, tracing.__interactionsRef.current);
}
function startWorkOnPendingInteractions(root, expirationTime) {
  var interactions = new Set();
  root.pendingInteractionMap.forEach(function(
    scheduledInteractions,
    scheduledExpirationTime
  ) {
    scheduledExpirationTime >= expirationTime &&
      scheduledInteractions.forEach(function(interaction) {
        return interactions.add(interaction);
      });
  });
  root.memoizedInteractions = interactions;
  if (0 < interactions.size) {
    var subscriber = tracing.__subscriberRef.current;
    if (null !== subscriber) {
      root = 1e3 * expirationTime + root.interactionThreadID;
      try {
        subscriber.onWorkStarted(interactions, root);
      } catch (error) {
        scheduleCallback(99, function() {
          throw error;
        });
      }
    }
  }
}
function finishPendingInteractions(root, committedExpirationTime) {
  var earliestRemainingTimeAfterCommit = root.firstPendingTime;
  try {
    var subscriber = tracing.__subscriberRef.current;
    if (null !== subscriber && 0 < root.memoizedInteractions.size)
      subscriber.onWorkStopped(
        root.memoizedInteractions,
        1e3 * committedExpirationTime + root.interactionThreadID
      );
  } catch (error) {
    scheduleCallback(99, function() {
      throw error;
    });
  } finally {
    var pendingInteractionMap = root.pendingInteractionMap;
    pendingInteractionMap.forEach(function(
      scheduledInteractions,
      scheduledExpirationTime
    ) {
      scheduledExpirationTime > earliestRemainingTimeAfterCommit &&
        (pendingInteractionMap.delete(scheduledExpirationTime),
        scheduledInteractions.forEach(function(interaction) {
          interaction.__count--;
          if (null !== subscriber && 0 === interaction.__count)
            try {
              subscriber.onInteractionScheduledWorkCompleted(interaction);
            } catch (error) {
              scheduleCallback(99, function() {
                throw error;
              });
            }
        }));
    });
  }
}
var onCommitFiberRoot = null,
  onCommitFiberUnmount = null,
  isDevToolsPresent = "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__;
function injectInternals(internals) {
  if ("undefined" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) return !1;
  var hook = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (hook.isDisabled || !hook.supportsFiber) return !0;
  try {
    var rendererID = hook.inject(internals);
    onCommitFiberRoot = function(root, expirationTime) {
      try {
        var didError = 64 === (root.current.effectTag & 64),
          currentTime = 1073741821 - ((now() / 10) | 0),
          priorityLevel = inferPriorityFromExpirationTime(
            currentTime,
            expirationTime
          );
        hook.onCommitFiberRoot(rendererID, root, priorityLevel, didError);
      } catch (err) {}
    };
    onCommitFiberUnmount = function(fiber) {
      try {
        hook.onCommitFiberUnmount(rendererID, fiber);
      } catch (err) {}
    };
  } catch (err) {}
  return !0;
}
var debugCounter = 1;
function FiberNode(tag, pendingProps, key, mode) {
  this.tag = tag;
  this.key = key;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = pendingProps;
  this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = mode;
  this.effectTag = 0;
  this.lastEffect = this.firstEffect = this.nextEffect = null;
  this.childExpirationTime = this.expirationTime = 0;
  this.alternate = null;
  this.treeBaseDuration = this.selfBaseDuration = this.actualStartTime = this.actualDuration =
    Number.NaN;
  this.actualDuration = 0;
  this.actualStartTime = -1;
  this.treeBaseDuration = this.selfBaseDuration = 0;
  enableUserTimingAPI &&
    ((this._debugID = debugCounter++), (this._debugIsCurrentlyTiming = !1));
}
function createFiber(tag, pendingProps, key, mode) {
  return new FiberNode(tag, pendingProps, key, mode);
}
function shouldConstruct(Component) {
  Component = Component.prototype;
  return !(!Component || !Component.isReactComponent);
}
function resolveLazyComponentTag(Component) {
  if ("function" === typeof Component)
    return shouldConstruct(Component) ? 1 : 0;
  if (void 0 !== Component && null !== Component) {
    Component = Component.$$typeof;
    if (Component === REACT_FORWARD_REF_TYPE) return 11;
    if (Component === REACT_MEMO_TYPE) return 14;
  }
  return 2;
}
function createWorkInProgress(current, pendingProps) {
  var workInProgress = current.alternate;
  null === workInProgress
    ? ((workInProgress = createFiber(
        current.tag,
        pendingProps,
        current.key,
        current.mode
      )),
      (workInProgress.elementType = current.elementType),
      (workInProgress.type = current.type),
      (workInProgress.stateNode = current.stateNode),
      (workInProgress.alternate = current),
      (current.alternate = workInProgress))
    : ((workInProgress.pendingProps = pendingProps),
      (workInProgress.effectTag = 0),
      (workInProgress.nextEffect = null),
      (workInProgress.firstEffect = null),
      (workInProgress.lastEffect = null),
      (workInProgress.actualDuration = 0),
      (workInProgress.actualStartTime = -1));
  workInProgress.childExpirationTime = current.childExpirationTime;
  workInProgress.expirationTime = current.expirationTime;
  workInProgress.child = current.child;
  workInProgress.memoizedProps = current.memoizedProps;
  workInProgress.memoizedState = current.memoizedState;
  workInProgress.updateQueue = current.updateQueue;
  pendingProps = current.dependencies;
  workInProgress.dependencies =
    null === pendingProps
      ? null
      : {
          expirationTime: pendingProps.expirationTime,
          firstContext: pendingProps.firstContext,
          responders: pendingProps.responders
        };
  workInProgress.sibling = current.sibling;
  workInProgress.index = current.index;
  workInProgress.ref = current.ref;
  workInProgress.selfBaseDuration = current.selfBaseDuration;
  workInProgress.treeBaseDuration = current.treeBaseDuration;
  return workInProgress;
}
function createFiberFromTypeAndProps(
  type,
  key,
  pendingProps,
  owner,
  mode,
  expirationTime
) {
  var fiberTag = 2;
  owner = type;
  if ("function" === typeof type) shouldConstruct(type) && (fiberTag = 1);
  else if ("string" === typeof type) fiberTag = 5;
  else
    a: switch (type) {
      case REACT_FRAGMENT_TYPE:
        return createFiberFromFragment(
          pendingProps.children,
          mode,
          expirationTime,
          key
        );
      case REACT_CONCURRENT_MODE_TYPE:
        fiberTag = 8;
        mode |= 7;
        break;
      case REACT_STRICT_MODE_TYPE:
        fiberTag = 8;
        mode |= 1;
        break;
      case REACT_PROFILER_TYPE:
        return (
          (type = createFiber(12, pendingProps, key, mode | 8)),
          (type.elementType = REACT_PROFILER_TYPE),
          (type.type = REACT_PROFILER_TYPE),
          (type.expirationTime = expirationTime),
          type
        );
      case REACT_SUSPENSE_TYPE:
        return (
          (type = createFiber(13, pendingProps, key, mode)),
          (type.type = REACT_SUSPENSE_TYPE),
          (type.elementType = REACT_SUSPENSE_TYPE),
          (type.expirationTime = expirationTime),
          type
        );
      case REACT_SUSPENSE_LIST_TYPE:
        return (
          (type = createFiber(19, pendingProps, key, mode)),
          (type.elementType = REACT_SUSPENSE_LIST_TYPE),
          (type.expirationTime = expirationTime),
          type
        );
      default:
        if ("object" === typeof type && null !== type)
          switch (type.$$typeof) {
            case REACT_PROVIDER_TYPE:
              fiberTag = 10;
              break a;
            case REACT_CONTEXT_TYPE:
              fiberTag = 9;
              break a;
            case REACT_FORWARD_REF_TYPE:
              fiberTag = 11;
              break a;
            case REACT_MEMO_TYPE:
              fiberTag = 14;
              break a;
            case REACT_LAZY_TYPE:
              fiberTag = 16;
              owner = null;
              break a;
            case REACT_SCOPE_TYPE:
              return (
                (key = createFiber(21, pendingProps, key, mode)),
                (key.type = type),
                (key.elementType = type),
                (key.expirationTime = expirationTime),
                key
              );
          }
        throw Error(
          formatProdErrorMessage(130, null == type ? type : typeof type, "")
        );
    }
  key = createFiber(fiberTag, pendingProps, key, mode);
  key.elementType = type;
  key.type = owner;
  key.expirationTime = expirationTime;
  return key;
}
function createFiberFromFragment(elements, mode, expirationTime, key) {
  elements = createFiber(7, elements, key, mode);
  elements.expirationTime = expirationTime;
  return elements;
}
function createFiberFromText(content, mode, expirationTime) {
  content = createFiber(6, content, null, mode);
  content.expirationTime = expirationTime;
  return content;
}
function createFiberFromPortal(portal, mode, expirationTime) {
  mode = createFiber(
    4,
    null !== portal.children ? portal.children : [],
    portal.key,
    mode
  );
  mode.expirationTime = expirationTime;
  mode.stateNode = {
    containerInfo: portal.containerInfo,
    pendingChildren: null,
    implementation: portal.implementation
  };
  return mode;
}
var hydrationParentFiber = null,
  nextHydratableInstance = null,
  isHydrating = !1;
function deleteHydratableInstance(returnFiber, instance) {
  var fiber = createFiber(5, null, null, 0);
  fiber.elementType = "DELETED";
  fiber.type = "DELETED";
  fiber.stateNode = instance;
  fiber.return = returnFiber;
  fiber.effectTag = 8;
  null !== returnFiber.lastEffect
    ? ((returnFiber.lastEffect.nextEffect = fiber),
      (returnFiber.lastEffect = fiber))
    : (returnFiber.firstEffect = returnFiber.lastEffect = fiber);
}
function tryHydrate(fiber, nextInstance) {
  switch (fiber.tag) {
    case 5:
      var type = fiber.type;
      nextInstance =
        1 !== nextInstance.nodeType ||
        type.toLowerCase() !== nextInstance.nodeName.toLowerCase()
          ? null
          : nextInstance;
      return null !== nextInstance
        ? ((fiber.stateNode = nextInstance), !0)
        : !1;
    case 6:
      return (
        (nextInstance =
          "" === fiber.pendingProps || 3 !== nextInstance.nodeType
            ? null
            : nextInstance),
        null !== nextInstance ? ((fiber.stateNode = nextInstance), !0) : !1
      );
    case 13:
      return (
        (nextInstance =
          nextInstance.nodeType !== COMMENT_NODE ? null : nextInstance),
        null !== nextInstance
          ? ((fiber.memoizedState = { dehydrated: nextInstance, retryTime: 1 }),
            (type = createFiber(18, null, null, 0)),
            (type.stateNode = nextInstance),
            (type.return = fiber),
            (fiber.child = type),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function tryToClaimNextHydratableInstance(fiber) {
  if (isHydrating) {
    var nextInstance = nextHydratableInstance;
    if (nextInstance) {
      var firstAttemptedInstance = nextInstance;
      if (!tryHydrate(fiber, nextInstance)) {
        nextInstance = getNextHydratable(firstAttemptedInstance.nextSibling);
        if (!nextInstance || !tryHydrate(fiber, nextInstance)) {
          fiber.effectTag = (fiber.effectTag & -1025) | 2;
          isHydrating = !1;
          hydrationParentFiber = fiber;
          return;
        }
        deleteHydratableInstance(hydrationParentFiber, firstAttemptedInstance);
      }
      hydrationParentFiber = fiber;
      nextHydratableInstance = getNextHydratable(nextInstance.firstChild);
    } else
      (fiber.effectTag = (fiber.effectTag & -1025) | 2),
        (isHydrating = !1),
        (hydrationParentFiber = fiber);
  }
}
function popToNextHostParent(fiber) {
  for (
    fiber = fiber.return;
    null !== fiber && 5 !== fiber.tag && 3 !== fiber.tag && 13 !== fiber.tag;

  )
    fiber = fiber.return;
  hydrationParentFiber = fiber;
}
function popHydrationState(fiber) {
  if (fiber !== hydrationParentFiber) return !1;
  if (!isHydrating) return popToNextHostParent(fiber), (isHydrating = !0), !1;
  var type = fiber.type;
  if (
    5 !== fiber.tag ||
    ("head" !== type &&
      "body" !== type &&
      !shouldSetTextContent(type, fiber.memoizedProps))
  )
    for (type = nextHydratableInstance; type; )
      deleteHydratableInstance(fiber, type),
        (type = getNextHydratable(type.nextSibling));
  popToNextHostParent(fiber);
  if (13 === fiber.tag) {
    fiber = fiber.memoizedState;
    fiber = null !== fiber ? fiber.dehydrated : null;
    if (!fiber) throw Error(formatProdErrorMessage(317));
    a: {
      fiber = fiber.nextSibling;
      for (type = 0; fiber; ) {
        if (fiber.nodeType === COMMENT_NODE) {
          var data = fiber.data;
          if (data === SUSPENSE_END_DATA) {
            if (0 === type) {
              nextHydratableInstance = getNextHydratable(fiber.nextSibling);
              break a;
            }
            type--;
          } else
            (data !== SUSPENSE_START_DATA &&
              data !== SUSPENSE_FALLBACK_START_DATA &&
              data !== SUSPENSE_PENDING_START_DATA) ||
              type++;
        }
        fiber = fiber.nextSibling;
      }
      nextHydratableInstance = null;
    }
  } else
    nextHydratableInstance = hydrationParentFiber
      ? getNextHydratable(fiber.stateNode.nextSibling)
      : null;
  return !0;
}
function resetHydrationState() {
  nextHydratableInstance = hydrationParentFiber = null;
  isHydrating = !1;
}
if (!React) throw Error(formatProdErrorMessage(227));
var root = null,
  startText = null,
  fallbackText = null;
function getData() {
  if (fallbackText) return fallbackText;
  var start,
    startValue = startText,
    startLength = startValue.length,
    end,
    endValue = "value" in root ? root.value : root.textContent,
    endLength = endValue.length;
  for (
    start = 0;
    start < startLength && startValue[start] === endValue[start];
    start++
  );
  var minEnd = startLength - start;
  for (
    end = 1;
    end <= minEnd &&
    startValue[startLength - end] === endValue[endLength - end];
    end++
  );
  return (fallbackText = endValue.slice(start, 1 < end ? 1 - end : void 0));
}
var SyntheticCompositionEvent = SyntheticEvent.extend({ data: null }),
  SyntheticInputEvent = SyntheticEvent.extend({ data: null }),
  END_KEYCODES = [9, 13, 27, 32],
  canUseCompositionEvent = canUseDOM && "CompositionEvent" in window,
  documentMode = null;
canUseDOM &&
  "documentMode" in document &&
  (documentMode = document.documentMode);
var canUseTextInputEvent = canUseDOM && "TextEvent" in window && !documentMode,
  useFallbackCompositionData =
    canUseDOM &&
    (!canUseCompositionEvent ||
      (documentMode && 8 < documentMode && 11 >= documentMode)),
  SPACEBAR_CHAR = String.fromCharCode(32),
  eventTypes$1 = {
    beforeInput: {
      phasedRegistrationNames: {
        bubbled: "onBeforeInput",
        captured: "onBeforeInputCapture"
      },
      dependencies: ["compositionend", "keypress", "textInput", "paste"]
    },
    compositionEnd: {
      phasedRegistrationNames: {
        bubbled: "onCompositionEnd",
        captured: "onCompositionEndCapture"
      },
      dependencies: "blur compositionend keydown keypress keyup mousedown".split(
        " "
      )
    },
    compositionStart: {
      phasedRegistrationNames: {
        bubbled: "onCompositionStart",
        captured: "onCompositionStartCapture"
      },
      dependencies: "blur compositionstart keydown keypress keyup mousedown".split(
        " "
      )
    },
    compositionUpdate: {
      phasedRegistrationNames: {
        bubbled: "onCompositionUpdate",
        captured: "onCompositionUpdateCapture"
      },
      dependencies: "blur compositionupdate keydown keypress keyup mousedown".split(
        " "
      )
    }
  },
  hasSpaceKeypress = !1;
function isFallbackCompositionEnd(topLevelType, nativeEvent) {
  switch (topLevelType) {
    case "keyup":
      return -1 !== END_KEYCODES.indexOf(nativeEvent.keyCode);
    case "keydown":
      return 229 !== nativeEvent.keyCode;
    case "keypress":
    case "mousedown":
    case "blur":
      return !0;
    default:
      return !1;
  }
}
function getDataFromCustomEvent(nativeEvent) {
  nativeEvent = nativeEvent.detail;
  return "object" === typeof nativeEvent && "data" in nativeEvent
    ? nativeEvent.data
    : null;
}
var isComposing = !1;
function getNativeBeforeInputChars(topLevelType, nativeEvent) {
  switch (topLevelType) {
    case "compositionend":
      return getDataFromCustomEvent(nativeEvent);
    case "keypress":
      if (32 !== nativeEvent.which) return null;
      hasSpaceKeypress = !0;
      return SPACEBAR_CHAR;
    case "textInput":
      return (
        (topLevelType = nativeEvent.data),
        topLevelType === SPACEBAR_CHAR && hasSpaceKeypress ? null : topLevelType
      );
    default:
      return null;
  }
}
function getFallbackBeforeInputChars(topLevelType, nativeEvent) {
  if (isComposing)
    return "compositionend" === topLevelType ||
      (!canUseCompositionEvent &&
        isFallbackCompositionEnd(topLevelType, nativeEvent))
      ? ((topLevelType = getData()),
        (fallbackText = startText = root = null),
        (isComposing = !1),
        topLevelType)
      : null;
  switch (topLevelType) {
    case "paste":
      return null;
    case "keypress":
      if (
        !(nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) ||
        (nativeEvent.ctrlKey && nativeEvent.altKey)
      ) {
        if (nativeEvent.char && 1 < nativeEvent.char.length)
          return nativeEvent.char;
        if (nativeEvent.which) return String.fromCharCode(nativeEvent.which);
      }
      return null;
    case "compositionend":
      return useFallbackCompositionData && "ko" !== nativeEvent.locale
        ? null
        : nativeEvent.data;
    default:
      return null;
  }
}
var BeforeInputEventPlugin = {
    eventTypes: eventTypes$1,
    extractEvents: function(
      topLevelType,
      targetInst,
      nativeEvent,
      nativeEventTarget
    ) {
      var composition;
      if (canUseCompositionEvent)
        b: {
          switch (topLevelType) {
            case "compositionstart":
              var eventType = eventTypes$1.compositionStart;
              break b;
            case "compositionend":
              eventType = eventTypes$1.compositionEnd;
              break b;
            case "compositionupdate":
              eventType = eventTypes$1.compositionUpdate;
              break b;
          }
          eventType = void 0;
        }
      else
        isComposing
          ? isFallbackCompositionEnd(topLevelType, nativeEvent) &&
            (eventType = eventTypes$1.compositionEnd)
          : "keydown" === topLevelType &&
            229 === nativeEvent.keyCode &&
            (eventType = eventTypes$1.compositionStart);
      eventType
        ? (useFallbackCompositionData &&
            "ko" !== nativeEvent.locale &&
            (isComposing || eventType !== eventTypes$1.compositionStart
              ? eventType === eventTypes$1.compositionEnd &&
                isComposing &&
                (composition = getData())
              : ((root = nativeEventTarget),
                (startText = "value" in root ? root.value : root.textContent),
                (isComposing = !0))),
          (eventType = SyntheticCompositionEvent.getPooled(
            eventType,
            targetInst,
            nativeEvent,
            nativeEventTarget
          )),
          composition
            ? (eventType.data = composition)
            : ((composition = getDataFromCustomEvent(nativeEvent)),
              null !== composition && (eventType.data = composition)),
          accumulateTwoPhaseDispatches(eventType),
          (composition = eventType))
        : (composition = null);
      (topLevelType = canUseTextInputEvent
        ? getNativeBeforeInputChars(topLevelType, nativeEvent)
        : getFallbackBeforeInputChars(topLevelType, nativeEvent))
        ? ((targetInst = SyntheticInputEvent.getPooled(
            eventTypes$1.beforeInput,
            targetInst,
            nativeEvent,
            nativeEventTarget
          )),
          (targetInst.data = topLevelType),
          accumulateTwoPhaseDispatches(targetInst))
        : (targetInst = null);
      return null === composition
        ? targetInst
        : null === targetInst
          ? composition
          : [composition, targetInst];
    }
  },
  supportedInputTypes = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
function isTextInputElement(elem) {
  var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
  return "input" === nodeName
    ? !!supportedInputTypes[elem.type]
    : "textarea" === nodeName
      ? !0
      : !1;
}
var eventTypes$2 = {
  change: {
    phasedRegistrationNames: {
      bubbled: "onChange",
      captured: "onChangeCapture"
    },
    dependencies: "blur change click focus input keydown keyup selectionchange".split(
      " "
    )
  }
};
function createAndAccumulateChangeEvent(inst, nativeEvent, target) {
  inst = SyntheticEvent.getPooled(
    eventTypes$2.change,
    inst,
    nativeEvent,
    target
  );
  inst.type = "change";
  enqueueStateRestore(target);
  accumulateTwoPhaseDispatches(inst);
  return inst;
}
var activeElement = null,
  activeElementInst = null;
function runEventInBatch(event) {
  runEventsInBatch(event);
}
function getInstIfValueChanged(targetInst) {
  var targetNode = getNodeFromInstance(targetInst);
  if (updateValueIfChanged(targetNode)) return targetInst;
}
function getTargetInstForChangeEvent(topLevelType, targetInst) {
  if ("change" === topLevelType) return targetInst;
}
var isInputEventSupported = !1;
canUseDOM &&
  (isInputEventSupported =
    isEventSupported("input") &&
    (!document.documentMode || 9 < document.documentMode));
function stopWatchingForValueChange() {
  activeElement &&
    (activeElement.detachEvent("onpropertychange", handlePropertyChange),
    (activeElementInst = activeElement = null));
}
function handlePropertyChange(nativeEvent) {
  if (
    "value" === nativeEvent.propertyName &&
    getInstIfValueChanged(activeElementInst)
  )
    if (
      ((nativeEvent = createAndAccumulateChangeEvent(
        activeElementInst,
        nativeEvent,
        getEventTarget(nativeEvent)
      )),
      isInsideEventHandler)
    )
      runEventsInBatch(nativeEvent);
    else {
      isInsideEventHandler = !0;
      try {
        batchedUpdatesImpl(runEventInBatch, nativeEvent);
      } finally {
        (isInsideEventHandler = !1), finishEventHandler();
      }
    }
}
function handleEventsForInputEventPolyfill(topLevelType, target, targetInst) {
  "focus" === topLevelType
    ? (stopWatchingForValueChange(),
      (activeElement = target),
      (activeElementInst = targetInst),
      activeElement.attachEvent("onpropertychange", handlePropertyChange))
    : "blur" === topLevelType && stopWatchingForValueChange();
}
function getTargetInstForInputEventPolyfill(topLevelType) {
  if (
    "selectionchange" === topLevelType ||
    "keyup" === topLevelType ||
    "keydown" === topLevelType
  )
    return getInstIfValueChanged(activeElementInst);
}
function getTargetInstForClickEvent(topLevelType, targetInst) {
  if ("click" === topLevelType) return getInstIfValueChanged(targetInst);
}
function getTargetInstForInputOrChangeEvent(topLevelType, targetInst) {
  if ("input" === topLevelType || "change" === topLevelType)
    return getInstIfValueChanged(targetInst);
}
var ChangeEventPlugin = {
    eventTypes: eventTypes$2,
    _isInputEventSupported: isInputEventSupported,
    extractEvents: function(
      topLevelType,
      targetInst,
      nativeEvent,
      nativeEventTarget
    ) {
      var targetNode = targetInst ? getNodeFromInstance(targetInst) : window,
        nodeName = targetNode.nodeName && targetNode.nodeName.toLowerCase();
      if (
        "select" === nodeName ||
        ("input" === nodeName && "file" === targetNode.type)
      )
        var getTargetInstFunc = getTargetInstForChangeEvent;
      else if (isTextInputElement(targetNode))
        if (isInputEventSupported)
          getTargetInstFunc = getTargetInstForInputOrChangeEvent;
        else {
          getTargetInstFunc = getTargetInstForInputEventPolyfill;
          var handleEventFunc = handleEventsForInputEventPolyfill;
        }
      else
        (nodeName = targetNode.nodeName) &&
          "input" === nodeName.toLowerCase() &&
          ("checkbox" === targetNode.type || "radio" === targetNode.type) &&
          (getTargetInstFunc = getTargetInstForClickEvent);
      if (
        getTargetInstFunc &&
        (getTargetInstFunc = getTargetInstFunc(topLevelType, targetInst))
      )
        return createAndAccumulateChangeEvent(
          getTargetInstFunc,
          nativeEvent,
          nativeEventTarget
        );
      handleEventFunc && handleEventFunc(topLevelType, targetNode, targetInst);
      "blur" === topLevelType &&
        (topLevelType = targetNode._wrapperState) &&
        topLevelType.controlled &&
        "number" === targetNode.type &&
        (disableInputAttributeSyncing ||
          setDefaultValue(targetNode, "number", targetNode.value));
    }
  },
  eventTypes$3 = {
    mouseEnter: {
      registrationName: "onMouseEnter",
      dependencies: ["mouseout", "mouseover"]
    },
    mouseLeave: {
      registrationName: "onMouseLeave",
      dependencies: ["mouseout", "mouseover"]
    },
    pointerEnter: {
      registrationName: "onPointerEnter",
      dependencies: ["pointerout", "pointerover"]
    },
    pointerLeave: {
      registrationName: "onPointerLeave",
      dependencies: ["pointerout", "pointerover"]
    }
  },
  lastNativeEvent,
  EnterLeaveEventPlugin = {
    eventTypes: eventTypes$3,
    extractEvents: function(
      topLevelType,
      targetInst,
      nativeEvent,
      nativeEventTarget,
      eventSystemFlags
    ) {
      var isOverEvent =
          "mouseover" === topLevelType || "pointerover" === topLevelType,
        isOutEvent =
          "mouseout" === topLevelType || "pointerout" === topLevelType;
      if (
        (isOverEvent &&
          0 === (eventSystemFlags & 32) &&
          (nativeEvent.relatedTarget || nativeEvent.fromElement)) ||
        (!isOutEvent && !isOverEvent)
      )
        return null;
      eventSystemFlags =
        nativeEventTarget.window === nativeEventTarget
          ? nativeEventTarget
          : (eventSystemFlags = nativeEventTarget.ownerDocument)
            ? eventSystemFlags.defaultView || eventSystemFlags.parentWindow
            : window;
      if (isOutEvent) {
        if (
          ((isOutEvent = targetInst),
          (targetInst = (targetInst =
            nativeEvent.relatedTarget || nativeEvent.toElement)
            ? getClosestInstanceFromNode(targetInst)
            : null),
          null !== targetInst &&
            ((isOverEvent = getNearestMountedFiber(targetInst)),
            targetInst !== isOverEvent ||
              (5 !== targetInst.tag && 6 !== targetInst.tag)))
        )
          targetInst = null;
      } else isOutEvent = null;
      if (isOutEvent === targetInst) return null;
      if ("mouseout" === topLevelType || "mouseover" === topLevelType) {
        var eventInterface = SyntheticMouseEvent;
        var leaveEventType = eventTypes$3.mouseLeave;
        var enterEventType = eventTypes$3.mouseEnter;
        var eventTypePrefix = "mouse";
      } else if (
        "pointerout" === topLevelType ||
        "pointerover" === topLevelType
      )
        (eventInterface = SyntheticPointerEvent),
          (leaveEventType = eventTypes$3.pointerLeave),
          (enterEventType = eventTypes$3.pointerEnter),
          (eventTypePrefix = "pointer");
      topLevelType =
        null == isOutEvent ? eventSystemFlags : getNodeFromInstance(isOutEvent);
      eventSystemFlags =
        null == targetInst ? eventSystemFlags : getNodeFromInstance(targetInst);
      leaveEventType = eventInterface.getPooled(
        leaveEventType,
        isOutEvent,
        nativeEvent,
        nativeEventTarget
      );
      leaveEventType.type = eventTypePrefix + "leave";
      leaveEventType.target = topLevelType;
      leaveEventType.relatedTarget = eventSystemFlags;
      nativeEventTarget = eventInterface.getPooled(
        enterEventType,
        targetInst,
        nativeEvent,
        nativeEventTarget
      );
      nativeEventTarget.type = eventTypePrefix + "enter";
      nativeEventTarget.target = eventSystemFlags;
      nativeEventTarget.relatedTarget = topLevelType;
      eventInterface = isOutEvent;
      eventTypePrefix = targetInst;
      if (eventInterface && eventTypePrefix)
        a: {
          enterEventType = eventInterface;
          topLevelType = eventTypePrefix;
          isOutEvent = 0;
          for (
            targetInst = enterEventType;
            targetInst;
            targetInst = getParent(targetInst)
          )
            isOutEvent++;
          targetInst = 0;
          for (
            eventSystemFlags = topLevelType;
            eventSystemFlags;
            eventSystemFlags = getParent(eventSystemFlags)
          )
            targetInst++;
          for (; 0 < isOutEvent - targetInst; )
            (enterEventType = getParent(enterEventType)), isOutEvent--;
          for (; 0 < targetInst - isOutEvent; )
            (topLevelType = getParent(topLevelType)), targetInst--;
          for (; isOutEvent--; ) {
            if (
              enterEventType === topLevelType ||
              enterEventType === topLevelType.alternate
            )
              break a;
            enterEventType = getParent(enterEventType);
            topLevelType = getParent(topLevelType);
          }
          enterEventType = null;
        }
      else enterEventType = null;
      topLevelType = enterEventType;
      for (
        enterEventType = [];
        eventInterface && eventInterface !== topLevelType;

      ) {
        isOutEvent = eventInterface.alternate;
        if (null !== isOutEvent && isOutEvent === topLevelType) break;
        enterEventType.push(eventInterface);
        eventInterface = getParent(eventInterface);
      }
      for (
        eventInterface = [];
        eventTypePrefix && eventTypePrefix !== topLevelType;

      ) {
        isOutEvent = eventTypePrefix.alternate;
        if (null !== isOutEvent && isOutEvent === topLevelType) break;
        eventInterface.push(eventTypePrefix);
        eventTypePrefix = getParent(eventTypePrefix);
      }
      for (
        eventTypePrefix = 0;
        eventTypePrefix < enterEventType.length;
        eventTypePrefix++
      )
        accumulateDispatches(
          enterEventType[eventTypePrefix],
          "bubbled",
          leaveEventType
        );
      for (eventTypePrefix = eventInterface.length; 0 < eventTypePrefix--; )
        accumulateDispatches(
          eventInterface[eventTypePrefix],
          "captured",
          nativeEventTarget
        );
      if (nativeEvent === lastNativeEvent)
        return (lastNativeEvent = null), [leaveEventType];
      lastNativeEvent = nativeEvent;
      return [leaveEventType, nativeEventTarget];
    }
  },
  skipSelectionChangeEvent =
    canUseDOM && "documentMode" in document && 11 >= document.documentMode,
  eventTypes$4 = {
    select: {
      phasedRegistrationNames: {
        bubbled: "onSelect",
        captured: "onSelectCapture"
      },
      dependencies: "blur contextmenu dragend focus keydown keyup mousedown mouseup selectionchange".split(
        " "
      )
    }
  },
  activeElement$1 = null,
  activeElementInst$1 = null,
  lastSelection = null,
  mouseDown = !1;
function constructSelectEvent(nativeEvent, nativeEventTarget) {
  var doc =
    nativeEventTarget.window === nativeEventTarget
      ? nativeEventTarget.document
      : 9 === nativeEventTarget.nodeType
        ? nativeEventTarget
        : nativeEventTarget.ownerDocument;
  if (
    mouseDown ||
    null == activeElement$1 ||
    activeElement$1 !== getActiveElement(doc)
  )
    return null;
  doc = activeElement$1;
  "selectionStart" in doc && hasSelectionCapabilities(doc)
    ? (doc = { start: doc.selectionStart, end: doc.selectionEnd })
    : ((doc = (
        (doc.ownerDocument && doc.ownerDocument.defaultView) ||
        window
      ).getSelection()),
      (doc = {
        anchorNode: doc.anchorNode,
        anchorOffset: doc.anchorOffset,
        focusNode: doc.focusNode,
        focusOffset: doc.focusOffset
      }));
  return lastSelection && shallowEqual(lastSelection, doc)
    ? null
    : ((lastSelection = doc),
      (nativeEvent = SyntheticEvent.getPooled(
        eventTypes$4.select,
        activeElementInst$1,
        nativeEvent,
        nativeEventTarget
      )),
      (nativeEvent.type = "select"),
      (nativeEvent.target = activeElement$1),
      accumulateTwoPhaseDispatches(nativeEvent),
      nativeEvent);
}
var SelectEventPlugin = {
  eventTypes: eventTypes$4,
  extractEvents: function(
    topLevelType,
    targetInst,
    nativeEvent,
    nativeEventTarget
  ) {
    var doc =
        nativeEventTarget.window === nativeEventTarget
          ? nativeEventTarget.document
          : 9 === nativeEventTarget.nodeType
            ? nativeEventTarget
            : nativeEventTarget.ownerDocument,
      JSCompiler_temp;
    if (!(JSCompiler_temp = !doc)) {
      a: {
        doc = getListeningSetForElement(doc);
        JSCompiler_temp = registrationNameDependencies.onSelect;
        for (var i = 0; i < JSCompiler_temp.length; i++)
          if (!doc.has(JSCompiler_temp[i])) {
            doc = !1;
            break a;
          }
        doc = !0;
      }
      JSCompiler_temp = !doc;
    }
    if (JSCompiler_temp) return null;
    doc = targetInst ? getNodeFromInstance(targetInst) : window;
    switch (topLevelType) {
      case "focus":
        if (isTextInputElement(doc) || "true" === doc.contentEditable)
          (activeElement$1 = doc),
            (activeElementInst$1 = targetInst),
            (lastSelection = null);
        break;
      case "blur":
        lastSelection = activeElementInst$1 = activeElement$1 = null;
        break;
      case "mousedown":
        mouseDown = !0;
        break;
      case "contextmenu":
      case "mouseup":
      case "dragend":
        return (
          (mouseDown = !1), constructSelectEvent(nativeEvent, nativeEventTarget)
        );
      case "selectionchange":
        if (skipSelectionChangeEvent) break;
      case "keydown":
      case "keyup":
        return constructSelectEvent(nativeEvent, nativeEventTarget);
    }
    return null;
  }
};
injection.injectEventPluginOrder(
  "ResponderEventPlugin SimpleEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(
    " "
  )
);
getFiberCurrentPropsFromNode$1 = getFiberCurrentPropsFromNode;
getInstanceFromNode$2 = getInstanceFromNode$1;
getNodeFromInstance$1 = getNodeFromInstance;
injection.injectEventPluginsByName({
  SimpleEventPlugin: SimpleEventPlugin,
  EnterLeaveEventPlugin: EnterLeaveEventPlugin,
  ChangeEventPlugin: ChangeEventPlugin,
  SelectEventPlugin: SelectEventPlugin,
  BeforeInputEventPlugin: BeforeInputEventPlugin
});
function ReactDOMRoot(container, options) {
  this._internalRoot = createRootImpl(container, 2, options);
}
function ReactDOMBlockingRoot(container, tag, options) {
  this._internalRoot = createRootImpl(container, tag, options);
}
ReactDOMRoot.prototype.render = ReactDOMBlockingRoot.prototype.render = function(
  children,
  callback
) {
  updateContainer(
    children,
    this._internalRoot,
    null,
    void 0 === callback ? null : callback
  );
};
ReactDOMRoot.prototype.unmount = ReactDOMBlockingRoot.prototype.unmount = function(
  callback
) {
  var root = this._internalRoot,
    cb = void 0 === callback ? null : callback,
    container = root.containerInfo;
  updateContainer(null, root, null, function() {
    container[internalContainerInstanceKey] = null;
    null !== cb && cb();
  });
};
function createRootImpl(container, tag, options) {
  var hydrate = null != options && !0 === options.hydrate,
    hydrationCallbacks = (null != options && options.hydrationOptions) || null;
  options = new FiberRootNode(container, tag, hydrate);
  options.hydrationCallbacks = hydrationCallbacks;
  hydrationCallbacks = 2 === tag ? 7 : 1 === tag ? 3 : 0;
  isDevToolsPresent && (hydrationCallbacks |= 8);
  hydrationCallbacks = createFiber(3, null, null, hydrationCallbacks);
  options.current = hydrationCallbacks;
  hydrationCallbacks.stateNode = options;
  container[internalContainerInstanceKey] = options.current;
  hydrate &&
    0 !== tag &&
    eagerlyTrapReplayableEvents(
      9 === container.nodeType ? container : container.ownerDocument
    );
  return options;
}
function isValidContainer(node) {
  return !(
    !node ||
    (1 !== node.nodeType &&
      9 !== node.nodeType &&
      11 !== node.nodeType &&
      (node.nodeType !== COMMENT_NODE ||
        " react-mount-point-unstable " !== node.nodeValue))
  );
}
function legacyCreateRootFromDOMContainer(container, forceHydrate) {
  forceHydrate ||
    ((forceHydrate = container
      ? 9 === container.nodeType
        ? container.documentElement
        : container.firstChild
      : null),
    (forceHydrate = !(
      !forceHydrate ||
      1 !== forceHydrate.nodeType ||
      !forceHydrate.hasAttribute("data-reactroot")
    )));
  if (!forceHydrate)
    for (var rootSibling; (rootSibling = container.lastChild); )
      container.removeChild(rootSibling);
  return new ReactDOMBlockingRoot(
    container,
    0,
    forceHydrate ? { hydrate: !0 } : void 0
  );
}
function legacyRenderSubtreeIntoContainer(
  parentComponent,
  children,
  container,
  forceHydrate,
  callback
) {
  var root = container._reactRootContainer;
  if (root) {
    var fiberRoot = root._internalRoot;
    if ("function" === typeof callback) {
      var _originalCallback = callback;
      callback = function() {
        var instance = getPublicRootInstance(fiberRoot);
        _originalCallback.call(instance);
      };
    }
    updateContainer(children, fiberRoot, parentComponent, callback);
  } else {
    root = container._reactRootContainer = legacyCreateRootFromDOMContainer(
      container,
      forceHydrate
    );
    fiberRoot = root._internalRoot;
    if ("function" === typeof callback) {
      var originalCallback = callback;
      callback = function() {
        var instance = getPublicRootInstance(fiberRoot);
        originalCallback.call(instance);
      };
    }
    unbatchedUpdates(function() {
      updateContainer(children, fiberRoot, parentComponent, callback);
    });
  }
  return getPublicRootInstance(fiberRoot);
}
function createPortal$1(children, containerInfo, implementation) {
  var key =
    3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
  return {
    $$typeof: REACT_PORTAL_TYPE,
    key: null == key ? null : "" + key,
    children: children,
    containerInfo: containerInfo,
    implementation: implementation
  };
}
attemptSynchronousHydration = function(fiber) {
  switch (fiber.tag) {
    case 3:
      var root = fiber.stateNode;
      root.hydrate && flushRoot(root, root.firstPendingTime);
      break;
    case 13:
      flushSync(function() {
        return scheduleUpdateOnFiber(fiber, 1073741823);
      }),
        (root = computeExpirationBucket(
          requestCurrentTimeForUpdate(),
          150,
          100
        )),
        markRetryTimeIfNotHydrated(fiber, root);
  }
};
attemptUserBlockingHydration = function(fiber) {
  if (13 === fiber.tag) {
    var expTime = computeExpirationBucket(
      requestCurrentTimeForUpdate(),
      150,
      100
    );
    scheduleUpdateOnFiber(fiber, expTime);
    markRetryTimeIfNotHydrated(fiber, expTime);
  }
};
attemptContinuousHydration = function(fiber) {
  if (13 === fiber.tag) {
    requestCurrentTimeForUpdate();
    var expTime = ContinuousHydration++;
    scheduleUpdateOnFiber(fiber, expTime);
    markRetryTimeIfNotHydrated(fiber, expTime);
  }
};
attemptHydrationAtCurrentPriority = function(fiber) {
  if (13 === fiber.tag) {
    var currentTime = requestCurrentTimeForUpdate();
    currentTime = computeExpirationForFiber(currentTime, fiber, null);
    scheduleUpdateOnFiber(fiber, currentTime);
    markRetryTimeIfNotHydrated(fiber, currentTime);
  }
};
var didWarnAboutUnstableCreatePortal = !1;
restoreImpl = function(domElement, tag, props) {
  switch (tag) {
    case "input":
      updateWrapper(domElement, props);
      tag = props.name;
      if ("radio" === props.type && null != tag) {
        for (props = domElement; props.parentNode; ) props = props.parentNode;
        props = props.querySelectorAll(
          "input[name=" + JSON.stringify("" + tag) + '][type="radio"]'
        );
        for (tag = 0; tag < props.length; tag++) {
          var otherNode = props[tag];
          if (otherNode !== domElement && otherNode.form === domElement.form) {
            var otherProps = getFiberCurrentPropsFromNode(otherNode);
            if (!otherProps) throw Error(formatProdErrorMessage(90));
            updateValueIfChanged(otherNode);
            updateWrapper(otherNode, otherProps);
          }
        }
      }
      break;
    case "textarea":
      updateWrapper$1(domElement, props);
      break;
    case "select":
      (tag = props.value),
        null != tag && updateOptions(domElement, !!props.multiple, tag, !1);
  }
};
batchedUpdatesImpl = batchedUpdates;
discreteUpdatesImpl = discreteUpdates;
flushDiscreteUpdatesImpl = flushDiscreteUpdates;
batchedEventUpdatesImpl = function(fn, a) {
  var prevExecutionContext = executionContext;
  executionContext |= 2;
  try {
    return fn(a);
  } finally {
    (executionContext = prevExecutionContext),
      executionContext === NoContext && flushSyncCallbackQueue();
  }
};
function createPortal$$1(children, container) {
  var key =
    2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
  if (!isValidContainer(container)) throw Error(formatProdErrorMessage(200));
  return createPortal$1(children, container, null, key);
}
var ReactDOM$1 = {
  createPortal: createPortal$$1,
  findDOMNode: function(componentOrElement) {
    if (null == componentOrElement) return null;
    if (1 === componentOrElement.nodeType) return componentOrElement;
    var fiber = componentOrElement._reactInternalFiber;
    if (void 0 === fiber) {
      if ("function" === typeof componentOrElement.render)
        throw Error(formatProdErrorMessage(188));
      throw Error(formatProdErrorMessage(268, Object.keys(componentOrElement)));
    }
    componentOrElement = findCurrentHostFiber(fiber);
    componentOrElement =
      null === componentOrElement ? null : componentOrElement.stateNode;
    return componentOrElement;
  },
  hydrate: function(element, container, callback) {
    if (!isValidContainer(container)) throw Error(formatProdErrorMessage(200));
    return legacyRenderSubtreeIntoContainer(
      null,
      element,
      container,
      !0,
      callback
    );
  },
  render: function(element, container, callback) {
    if (!isValidContainer(container)) throw Error(formatProdErrorMessage(200));
    return legacyRenderSubtreeIntoContainer(
      null,
      element,
      container,
      !1,
      callback
    );
  },
  unstable_renderSubtreeIntoContainer: function(
    parentComponent,
    element,
    containerNode,
    callback
  ) {
    if (!isValidContainer(containerNode))
      throw Error(formatProdErrorMessage(200));
    if (
      null == parentComponent ||
      void 0 === parentComponent._reactInternalFiber
    )
      throw Error(formatProdErrorMessage(38));
    return legacyRenderSubtreeIntoContainer(
      parentComponent,
      element,
      containerNode,
      !1,
      callback
    );
  },
  unmountComponentAtNode: function(container) {
    if (!isValidContainer(container)) throw Error(formatProdErrorMessage(40));
    return container._reactRootContainer
      ? (unbatchedUpdates(function() {
          legacyRenderSubtreeIntoContainer(
            null,
            null,
            container,
            !1,
            function() {
              container._reactRootContainer = null;
              container[internalContainerInstanceKey] = null;
            }
          );
        }),
        !0)
      : !1;
  },
  unstable_createPortal: function() {
    didWarnAboutUnstableCreatePortal ||
      ((didWarnAboutUnstableCreatePortal = !0),
      lowPriorityWarningWithoutStack(
        !1,
        'The ReactDOM.unstable_createPortal() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactDOM.createPortal() instead. It has the exact same API, but without the "unstable_" prefix.'
      ));
    return createPortal$$1.apply(void 0, arguments);
  },
  unstable_batchedUpdates: batchedUpdates,
  flushSync: flushSync,
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
    Events: [
      getInstanceFromNode$1,
      getNodeFromInstance,
      getFiberCurrentPropsFromNode,
      injection.injectEventPluginsByName,
      eventNameDispatchConfigs,
      accumulateTwoPhaseDispatches,
      function(events) {
        forEachAccumulated(events, accumulateDirectDispatchesSingle);
      },
      enqueueStateRestore,
      restoreStateIfNeeded,
      dispatchEvent,
      runEventsInBatch,
      flushPassiveEffects,
      { current: !1 }
    ]
  },
  createRoot: function(container, options) {
    if (!isValidContainer(container)) throw Error(formatProdErrorMessage(299));
    return new ReactDOMRoot(container, options);
  },
  createBlockingRoot: function(container, options) {
    if (!isValidContainer(container)) throw Error(formatProdErrorMessage(299));
    return new ReactDOMBlockingRoot(container, 1, options);
  }
};
ReactDOM$1.unstable_discreteUpdates = discreteUpdates;
ReactDOM$1.unstable_flushDiscreteUpdates = flushDiscreteUpdates;
ReactDOM$1.unstable_flushControlled = function(fn) {
  var prevExecutionContext = executionContext;
  executionContext |= 1;
  try {
    runWithPriority(99, fn);
  } finally {
    (executionContext = prevExecutionContext),
      executionContext === NoContext && flushSyncCallbackQueue();
  }
};
ReactDOM$1.unstable_scheduleHydration = function(target) {
  if (target && enableSelectiveHydration) {
    var priority = Scheduler.unstable_getCurrentPriorityLevel();
    target = { blockedOn: null, target: target, priority: priority };
    for (
      var i = 0;
      i < queuedExplicitHydrationTargets.length &&
      !(priority <= queuedExplicitHydrationTargets[i].priority);
      i++
    );
    queuedExplicitHydrationTargets.splice(i, 0, target);
    0 === i && attemptExplicitHydrationTarget(target);
  }
};
(function(devToolsConfig) {
  var findFiberByHostInstance = devToolsConfig.findFiberByHostInstance;
  return injectInternals(
    Object.assign({}, devToolsConfig, {
      overrideHookState: null,
      overrideProps: null,
      setSuspenseHandler: null,
      scheduleUpdate: null,
      currentDispatcherRef: ReactSharedInternals.ReactCurrentDispatcher,
      findHostInstanceByFiber: function(fiber) {
        fiber = findCurrentHostFiber(fiber);
        return null === fiber ? null : fiber.stateNode;
      },
      findFiberByHostInstance: function(instance) {
        return findFiberByHostInstance
          ? findFiberByHostInstance(instance)
          : null;
      },
      findHostInstancesForRefresh: null,
      scheduleRefresh: null,
      scheduleRoot: null,
      setRefreshHandler: null,
      getCurrentFiber: null
    })
  );
})({
  findFiberByHostInstance: getClosestInstanceFromNode,
  bundleType: 0,
  version: "16.12.0",
  rendererPackageName: "react-dom"
});
Object.assign(ReactDOM$1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, {
  ReactBrowserEventEmitter: {
    isEnabled: function() {
      return _enabled;
    }
  },
  ReactFiberTreeReflection: {
    findCurrentFiberUsingSlowPath: findCurrentFiberUsingSlowPath
  },
  ReactDOMComponentTree: {
    getClosestInstanceFromNode: getClosestInstanceFromNode
  },
  ReactInstanceMap: {
    get: function(key) {
      return key._reactInternalFiber;
    }
  },
  addUserTimingListener: function() {
    refCount++;
    updateFlagOutsideOfReactCallStack();
    return function() {
      refCount--;
      updateFlagOutsideOfReactCallStack();
    };
  },
  getIsHydrating: function() {
    return isHydrating;
  }
});
var ReactDOMFB = { default: ReactDOM$1 },
  ReactDOMFB$1 = (ReactDOMFB && ReactDOM$1) || ReactDOMFB;
module.exports = ReactDOMFB$1.default || ReactDOMFB$1;
