(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){  (function (global){  "use strict";require("core-js/shim");require("regenerator-runtime/runtime");require("core-js/fn/regexp/escape");if(global._babelPolyfill){throw new Error("only one instance of babel-polyfill is allowed");}
  global._babelPolyfill=true;var DEFINE_PROPERTY="defineProperty";
  function define(O, key, value){O[key] || Object[DEFINE_PROPERTY](O, key, {writable: true,
configurable: true,
  value:value
});}
  define(String.prototype, "padLeft", "".padStart);
  define(String.prototype, "padRight", "".padEnd);"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key){[][key] && define(Array, key, Function.call.bind([][key]));});}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"core-js/fn/regexp/escape":4,"core-js/shim":332,"regenerator-runtime/runtime":344}],2:[function(require,module,exports){  
var objectCreate=Object.create || objectCreatePolyfill
var objectKeys=Object.keys || objectKeysPolyfill
var bind=Function.prototype.bind || functionBindPolyfill
  
  function EventEmitter(){if(!this._events || !Object.prototype.hasOwnProperty.call(this, '_events')){this._events=objectCreate(null);
this._eventsCount=0;
}
this._maxListeners=this._maxListeners || undefined;}
  module.exports=EventEmitter;
  EventEmitter.EventEmitter=EventEmitter;EventEmitter.prototype._events=undefined;
  EventEmitter.prototype._maxListeners=undefined;var defaultMaxListeners=10;var hasDefineProperty;
try{var o={};if(Object.defineProperty) Object.defineProperty(o, 'x', { value: 0 });
hasDefineProperty=o.x===0;}catch(err){ hasDefineProperty=false }
if(hasDefineProperty){Object.defineProperty(EventEmitter, 'defaultMaxListeners', {enumerable: true,
get: function(){ return defaultMaxListeners;
},
set: function(arg){if(typeof arg !== 'number' || arg < 0 || arg !== arg)
throw new TypeError('"defaultMaxListeners" must be a positive number');
  defaultMaxListeners=arg;
}});}else{EventEmitter.defaultMaxListeners=defaultMaxListeners;}
  EventEmitter.prototype.setMaxListeners=function setMaxListeners(n){if(typeof n !== 'number' || n < 0 || isNaN(n))
throw new TypeError('"n" argument must be a positive number');
this._maxListeners=n;
 return this;};function $getMaxListeners(that){if(that._maxListeners===undefined)
  return EventEmitter.defaultMaxListeners;
 return that._maxListeners;}
  EventEmitter.prototype.getMaxListeners=function getMaxListeners(){ return $getMaxListeners(this);};
  function emitNone(handler, isFn, self){if(isFn)
handler.call(self);
else{var len=handler.length;var listeners=arrayClone(handler, len);
for(var i=0;i<len; ++i)
  listeners[i].call(self);
}}
  function emitOne(handler, isFn, self, arg1){if(isFn)
handler.call(self, arg1);
else{var len=handler.length;var listeners=arrayClone(handler, len);
for(var i=0;i<len; ++i)
  listeners[i].call(self, arg1);
}}
  function emitTwo(handler, isFn, self, arg1, arg2){if(isFn)
handler.call(self, arg1, arg2);
else{var len=handler.length;var listeners=arrayClone(handler, len);
for(var i=0;i<len; ++i)
  listeners[i].call(self, arg1, arg2);
}}
  function emitThree(handler, isFn, self, arg1, arg2, arg3){if(isFn)
handler.call(self, arg1, arg2, arg3);
else{var len=handler.length;var listeners=arrayClone(handler, len);
for(var i=0;i<len; ++i)
  listeners[i].call(self, arg1, arg2, arg3);
}}
  function emitMany(handler, isFn, self, args){if(isFn)
handler.apply(self, args);
else{var len=handler.length;var listeners=arrayClone(handler, len);
for(var i=0;i<len; ++i)
  listeners[i].apply(self, args);
}}
  EventEmitter.prototype.emit=function emit(type){var er, handler, len, args, i, events;var doError=(type==='error');  events=this._events;if(events)
doError=(doError && events.error == null);
else if(!doError)
  return false;if(doError){if(arguments.length > 1)
  er=arguments[1];if(er instanceof Error){  throw er;
}else{var err=new Error('Unhandled "error" event. (' + er + ')');
  err.context=er;
  throw err;
}
  return false;
}
handler=events[type];if(!handler)
  return false;var isFn=typeof handler==='function';
len=arguments.length;
switch (len){case 1:
  emitNone(handler, isFn, this);
  break;
case 2:
  emitOne(handler, isFn, this, arguments[1]);
  break;
case 3:
  emitTwo(handler, isFn, this, arguments[1], arguments[2]);
  break;
case 4:
  emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
  break;
default:
  args=new Array(len - 1);
  for(i=1; i < len; i++)
args[i - 1]=arguments[i];
  emitMany(handler, isFn, this, args);
}
 return true;};function _addListener(target, type, listener, prepend){var m;var events;var existing;if(typeof listener !== 'function')
throw new TypeError('"listener" argument must be a function');  events=target._events;if(!events){events=target._events=objectCreate(null);
target._eventsCount=0;
}else{if(events.newListener){  target.emit('newListener', type,
listener.listener ? listener.listener : listener);
  events=target._events;
}
existing=events[type];
}
if(!existing){existing=events[type]=listener;
++target._eventsCount;
}else{if(typeof existing==='function'){  existing=events[type] =
prepend ? [listener, existing] : [existing, listener];
}else{if(prepend){existing.unshift(listener);
}else{existing.push(listener);
}}
if(!existing.warned){  m=$getMaxListeners(target);if(m && m > 0 && existing.length > m){existing.warned=true;var w=new Error('Possible EventEmitter memory leak detected. ' +
  existing.length + ' "' + String(type) + '" listeners ' +
  'added. Use emitter.setMaxListeners() to ' +
  'increase limit.');
w.name='MaxListenersExceededWarning';
w.emitter=target;
w.type=type;
w.count=existing.length;if(typeof console==='object' && console.warn){  console.warn('%s: %s', w.name, w.message);}}
}}
 return target;}
  EventEmitter.prototype.addListener=function addListener(type, listener){ return _addListener(this, type, listener, false);};EventEmitter.prototype.on=EventEmitter.prototype.addListener;EventEmitter.prototype.prependListener =
function prependListener(type, listener){ return _addListener(this, type, listener, true);};function onceWrapper(){if(!this.fired){this.target.removeListener(this.type, this.wrapFn);
this.fired=true;
switch (arguments.length){case 0:
   return this.listener.call(this.target);
case 1:
   return this.listener.call(this.target, arguments[0]);
case 2:
   return this.listener.call(this.target, arguments[0], arguments[1]);
case 3:
   return this.listener.call(this.target, arguments[0], arguments[1],
  arguments[2]);
  default:
var args=new Array(arguments.length);
for(var i=0;i<args.length; ++i)
args[i]=arguments[i];
  this.listener.apply(this.target, args);
}}
}
  function _onceWrap(target, type, listener){var state={ fired: false, wrapFn: undefined, target: target, type: type, listener: listener };var wrapped=bind.call(onceWrapper, state);
wrapped.listener=listener;
state.wrapFn=wrapped;
 return wrapped;}
  EventEmitter.prototype.once=function once(type, listener){if(typeof listener !== 'function')
throw new TypeError('"listener" argument must be a function');
this.on(type, _onceWrap(this, type, listener));
 return this;};EventEmitter.prototype.prependOnceListener =
function prependOnceListener(type, listener){if(typeof listener !== 'function')
throw new TypeError('"listener" argument must be a function');
this.prependListener(type, _onceWrap(this, type, listener));
 return this;};
  EventEmitter.prototype.removeListener =
function removeListener(type, listener){var list, events, position, i, originalListener;if(typeof listener !== 'function')
throw new TypeError('"listener" argument must be a function');events=this._events;if(!events)
   return this;list=events[type];if(!list)
   return this;if(list===listener || list.listener===listener){if(--this._eventsCount===0)
this._events=objectCreate(null);
else{  delete events[type];if(events.removeListener)
this.emit('removeListener', type, list.listener || listener);}}else if(typeof list !== 'function'){position=-1;  for(i=list.length - 1; i >= 0; i--){if(list[i]===listener || list[i].listener===listener){originalListener=list[i].listener;
  position=i;
  break;
}}
if(position < 0)
  return this;if(position===0)
list.shift();
else
spliceOne(list, position);if(list.length===1)
events[type]=list[0];if(events.removeListener)
this.emit('removeListener', type, originalListener || listener);
}
 return this;};EventEmitter.prototype.removeAllListeners =
function removeAllListeners(type){var listeners, events, i;events=this._events;if(!events)
   return this;if(!events.removeListener){if(arguments.length===0){this._events=objectCreate(null);
this._eventsCount=0;}else if(events[type]){if(--this._eventsCount===0)
this._events=objectCreate(null);
else
  delete events[type];}
   return this;
}
if(arguments.length===0){var keys=objectKeys(events);var key;
for(i=0;i<keys.length; ++i){  key=keys[i];if(key==='removeListener') continue;
this.removeAllListeners(key);}
  this.removeAllListeners('removeListener');
  this._events=objectCreate(null);
  this._eventsCount=0;
   return this;
}
  listeners=events[type];if(typeof listeners==='function'){this.removeListener(type, listeners);
}else if(listeners){for(i=listeners.length - 1; i >= 0; i--){this.removeListener(type, listeners[i]);}}
 return this;};function _listeners(target, type, unwrap){var events=target._events;if(!events)
  return [];var evlistener=events[type];if(!evlistener)
  return [];if(typeof evlistener==='function')
  return unwrap ? [evlistener.listener || evlistener] : [evlistener]; return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);}
  EventEmitter.prototype.listeners=function listeners(type){ return _listeners(this, type, true);};EventEmitter.prototype.rawListeners=function rawListeners(type){ return _listeners(this, type, false);};EventEmitter.listenerCount=function(emitter, type){if(typeof emitter.listenerCount==='function'){  return emitter.listenerCount(type);
}else{  return listenerCount.call(emitter, type);
}};EventEmitter.prototype.listenerCount=listenerCount;
  function listenerCount(type){var events=this._events;if(events){var evlistener=events[type];if(typeof evlistener==='function'){ return 1;
}else if(evlistener){ return evlistener.length;
}}
 return 0;}
  EventEmitter.prototype.eventNames=function eventNames(){ return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];};
  function spliceOne(list, index){for(var i=index, k=i + 1, n=list.length; k < n; i += 1, k += 1)
list[i]=list[k];
list.pop();}
  function arrayClone(arr, n){var copy=new Array(n);
for(var i=0;i<n; ++i)
copy[i]=arr[i];
 return copy;}
  function unwrapListeners(arr){var ret=new Array(arr.length);
for(var i=0;i<ret.length; ++i){ret[i]=arr[i].listener || arr[i];
}
 return ret;}
  function objectCreatePolyfill(proto){var F=function(){};
F.prototype=proto;
 return new F;}
  function objectKeysPolyfill(obj){var keys=[];
for(var k in obj) if(Object.prototype.hasOwnProperty.call(obj, k)){keys.push(k);
}
 return k;}
  function functionBindPolyfill(context){var fn=this;
 return function (){  return fn.apply(context, arguments);
};}},{}],3:[function(require,module,exports){  'use strict';var AUDIO=new Blob([new Uint8Array([255, 227, 24, 196, 0, 0, 0, 3, 72, 1, 64, 0, 0, 4, 132, 16, 31, 227, 192, 225, 76, 255, 67, 12, 255, 221, 27, 255, 228, 97, 73, 63, 255, 195, 131, 69, 192, 232, 223, 255, 255, 207, 102, 239, 255, 255, 255, 101, 158, 206, 70, 20, 59, 255, 254, 95, 70, 149, 66, 4, 16, 128, 0, 2, 2, 32, 240, 138, 255, 36, 106, 183, 255, 227, 24, 196, 59, 11, 34, 62, 80, 49, 135, 40, 0, 253, 29, 191, 209, 200, 141, 71, 7, 255, 252, 152, 74, 15, 130, 33, 185, 6, 63, 255, 252, 195, 70, 203, 86, 53, 15, 255, 255, 247, 103, 76, 121, 64, 32, 47, 255, 34, 227, 194, 209, 138, 76, 65, 77, 69, 51, 46, 57, 55, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 255, 227, 24, 196, 73, 13, 153, 210, 100, 81, 135, 56, 0, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170])], { type: 'audio/mpeg' });var VIDEO=new Blob([new Uint8Array([0, 0, 0, 28, 102, 116, 121, 112, 105, 115, 111, 109, 0, 0, 2, 0, 105, 115, 111, 109, 105, 115, 111, 50, 109, 112, 52, 49, 0, 0, 0, 8, 102, 114, 101, 101, 0, 0, 2, 239, 109, 100, 97, 116, 33, 16, 5, 32, 164, 27, 255, 192, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 55, 167, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 112, 33, 16, 5, 32, 164, 27, 255, 192, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 55, 167, 128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 112, 0, 0, 2, 194, 109, 111, 111, 118, 0, 0, 0, 108, 109, 118, 104, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 232, 0, 0, 0, 47, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1, 236, 116, 114, 97, 107, 0, 0, 0, 92, 116, 107, 104, 100, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 47, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 36, 101, 100, 116, 115, 0, 0, 0, 28, 101, 108, 115, 116, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 47, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 100, 109, 100, 105, 97, 0, 0, 0, 32, 109, 100, 104, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 172, 68, 0, 0, 8, 0, 85, 196, 0, 0, 0, 0, 0, 45, 104, 100, 108, 114, 0, 0, 0, 0, 0, 0, 0, 0, 115, 111, 117, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 83, 111, 117, 110, 100, 72, 97, 110, 100, 108, 101, 114, 0, 0, 0, 1, 15, 109, 105, 110, 102, 0, 0, 0, 16, 115, 109, 104, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 36, 100, 105, 110, 102, 0, 0, 0, 28, 100, 114, 101, 102, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 12, 117, 114, 108, 32, 0, 0, 0, 1, 0, 0, 0, 211, 115, 116, 98, 108, 0, 0, 0, 103, 115, 116, 115, 100, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 87, 109, 112, 52, 97, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 16, 0, 0, 0, 0, 172, 68, 0, 0, 0, 0, 0, 51, 101, 115, 100, 115, 0, 0, 0, 0, 3, 128, 128, 128, 34, 0, 2, 0, 4, 128, 128, 128, 20, 64, 21, 0, 0, 0, 0, 1, 244, 0, 0, 1, 243, 249, 5, 128, 128, 128, 2, 18, 16, 6, 128, 128, 128, 1, 2, 0, 0, 0, 24, 115, 116, 116, 115, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 4, 0, 0, 0, 0, 28, 115, 116, 115, 99, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 28, 115, 116, 115, 122, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 115, 0, 0, 1, 116, 0, 0, 0, 20, 115, 116, 99, 111, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 44, 0, 0, 0, 98, 117, 100, 116, 97, 0, 0, 0, 90, 109, 101, 116, 97, 0, 0, 0, 0, 0, 0, 0, 33, 104, 100, 108, 114, 0, 0, 0, 0, 0, 0, 0, 0, 109, 100, 105, 114, 97, 112, 112, 108, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 45, 105, 108, 115, 116, 0, 0, 0, 37, 169, 116, 111, 111, 0, 0, 0, 29, 100, 97, 116, 97, 0, 0, 0, 1, 0, 0, 0, 0, 76, 97, 118, 102, 53, 54, 46, 52, 48, 46, 49, 48, 49])], { type: 'video/mp4' });
  function setupDefaultValues(options){ return Object.assign({muted: false,
timeout: 250,
inline: false
}, options);}
  function startPlayback(_ref, elementCallback){var muted=_ref.muted,
  timeout=_ref.timeout,
  inline=_ref.inline;var _elementCallback=elementCallback(),
  element=_elementCallback.element,
  source=_elementCallback.source;var playResult=void 0;var timeoutId=void 0;var sendOutput=void 0;  element.muted=muted;if(muted===true){element.setAttribute('muted', 'muted');
}
if(inline===true){element.setAttribute('playsinline', 'playsinline');
}
element.src=source; return new Promise(function (resolve){playResult=element.play();
timeoutId=setTimeout(function (){  sendOutput(false, new Error('Timeout ' + timeout + ' ms has been reached'));
}, timeout);
sendOutput=function sendOutput(result){var error=arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;clearTimeout(timeoutId);
  resolve({ result: result, error: error });};if(playResult !== undefined){  playResult.then(function (){return sendOutput(true);
}).catch(function (playError){return sendOutput(false, playError);
});}else{  sendOutput(true);
}});}
  function video(options){options=setupDefaultValues(options);
 return startPlayback(options, function (){  return {  element: document.createElement('video'),
  source: URL.createObjectURL(VIDEO)};
});}
  function audio(options){options=setupDefaultValues(options);
 return startPlayback(options, function (){  return {  element: document.createElement('audio'),
  source: URL.createObjectURL(AUDIO)};
});}
var index={ audio: audio, video: video };module.exports=index;},{}],4:[function(require,module,exports){require('../../modules/core.regexp.escape');
  module.exports=require('../../modules/_core').RegExp.escape;},{"../../modules/_core":26,"../../modules/core.regexp.escape":134}],5:[function(require,module,exports){  module.exports=function (it){if(typeof it != 'function') throw TypeError(it + ' is not a function!');
 return it;};},{}],6:[function(require,module,exports){var cof=require('./_cof');
  module.exports=function (it, msg){if(typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
 return +it;};},{"./_cof":21}],7:[function(require,module,exports){var UNSCOPABLES=require('./_wks')('unscopables');var ArrayProto=Array.prototype;if(ArrayProto[UNSCOPABLES] == undefined) require('./_hide')(ArrayProto, UNSCOPABLES, {});
  module.exports=function (key){ArrayProto[UNSCOPABLES][key]=true;};},{"./_hide":46,"./_wks":132}],8:[function(require,module,exports){  'use strict';var at=require('./_string-at')(true);
  module.exports=function (S, index, unicode){ return index + (unicode ? at(S, index).length : 1);};},{"./_string-at":109}],9:[function(require,module,exports){  module.exports=function (it, Constructor, name, forbiddenField){if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){throw TypeError(name + ': incorrect invocation!');
} return it;};},{}],10:[function(require,module,exports){var isObject=require('./_is-object');
  module.exports=function (it){if(!isObject(it)) throw TypeError(it + ' is not an object!');
 return it;};},{"./_is-object":55}],11:[function(require,module,exports){  'use strict';var toObject=require('./_to-object');var toAbsoluteIndex=require('./_to-absolute-index');var toLength=require('./_to-length');module.exports=[].copyWithin || function copyWithin(target , start ){var O=toObject(this);var len=toLength(O.length);var to=toAbsoluteIndex(target, len);var from=toAbsoluteIndex(start, len);var end=arguments.length > 2 ? arguments[2] : undefined;var count=Math.min((end===undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);var inc=1;if(from < to && to < from + count){inc=-1;
from += count - 1;
to += count - 1;
}
while (count-- > 0){if(from in O) O[to]=O[from];
else delete O[to];
to += inc;
from += inc;
} return O;};},{"./_to-absolute-index":117,"./_to-length":121,"./_to-object":122}],12:[function(require,module,exports){  'use strict';var toObject=require('./_to-object');var toAbsoluteIndex=require('./_to-absolute-index');var toLength=require('./_to-length');
  module.exports=function fill(value ){var O=toObject(this);var length=toLength(O.length);var aLen=arguments.length;var index=toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);var end=aLen > 2 ? arguments[2] : undefined;var endPos=end===undefined ? length : toAbsoluteIndex(end, length);
while (endPos > index) O[index++]=value;
 return O;};},{"./_to-absolute-index":117,"./_to-length":121,"./_to-object":122}],13:[function(require,module,exports){var forOf=require('./_for-of');module.exports=function (iter, ITERATOR){var result=[];
forOf(iter, false, result.push, result, ITERATOR);
 return result;};},{"./_for-of":42}],14:[function(require,module,exports){var toIObject=require('./_to-iobject');var toLength=require('./_to-length');var toAbsoluteIndex=require('./_to-absolute-index');
  module.exports=function (IS_INCLUDES){ return function ($this, el, fromIndex){var O=toIObject($this);var length=toLength(O.length);var index=toAbsoluteIndex(fromIndex, length);var value;if(IS_INCLUDES && el != el) while (length > index){  value=O[index++];if(value != value) return true;
}else for(;length > index; index++) if(IS_INCLUDES || index in O){if(O[index]===el) return IS_INCLUDES || index || 0;
} return !IS_INCLUDES && -1;
};};},{"./_to-absolute-index":117,"./_to-iobject":120,"./_to-length":121}],15:[function(require,module,exports){var ctx=require('./_ctx');var IObject=require('./_iobject');var toObject=require('./_to-object');var toLength=require('./_to-length');var asc=require('./_array-species-create');
  module.exports=function (TYPE, $create){var IS_MAP=TYPE == 1;var IS_FILTER=TYPE == 2;var IS_SOME=TYPE == 3;var IS_EVERY=TYPE == 4;var IS_FIND_INDEX=TYPE == 6;var NO_HOLES=TYPE == 5 || IS_FIND_INDEX;var create=$create || asc;
 return function ($this, callbackfn, that){var O=toObject($this);var self=IObject(O);var f=ctx(callbackfn, that, 3);var length=toLength(self.length);var index=0;var result=IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;var val, res;
for(;length > index; index++) if(NO_HOLES || index in self){  val=self[index];
  res=f(val, index, O);if(TYPE){if(IS_MAP) result[index]=res;
else if(res) switch (TYPE){case 3: return true;
  case 5: return val;
  case 6: return index;
  case 2: result.push(val);}else if(IS_EVERY) return false;
}}
  return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
};};},{"./_array-species-create":18,"./_ctx":28,"./_iobject":51,"./_to-length":121,"./_to-object":122}],16:[function(require,module,exports){var aFunction=require('./_a-function');var toObject=require('./_to-object');var IObject=require('./_iobject');var toLength=require('./_to-length');module.exports=function (that, callbackfn, aLen, memo, isRight){aFunction(callbackfn);var O=toObject(that);var self=IObject(O);var length=toLength(O.length);var index=isRight ? length - 1 : 0;var i=isRight ? -1 : 1;if(aLen < 2) for(;;){if(index in self){  memo=self[index];
  index += i;
  break;
}
index += i;if(isRight ? index < 0 : length <= index){  throw TypeError('Reduce of empty array with no initial value');
}}
for(;isRight ? index >= 0 : length > index; index += i) if(index in self){memo=callbackfn(memo, self[index], index, O);
}
 return memo;};},{"./_a-function":5,"./_iobject":51,"./_to-length":121,"./_to-object":122}],17:[function(require,module,exports){var isObject=require('./_is-object');var isArray=require('./_is-array');var SPECIES=require('./_wks')('species');module.exports=function (original){var C;if(isArray(original)){C=original.constructor;if(typeof C == 'function' && (C===Array || isArray(C.prototype))) C=undefined;if(isObject(C)){  C=C[SPECIES];if(C===null) C=undefined;
}} return C===undefined ? Array : C;};},{"./_is-array":53,"./_is-object":55,"./_wks":132}],18:[function(require,module,exports){var speciesConstructor=require('./_array-species-constructor');module.exports=function (original, length){ return new (speciesConstructor(original))(length);};},{"./_array-species-constructor":17}],19:[function(require,module,exports){  'use strict';var aFunction=require('./_a-function');var isObject=require('./_is-object');var invoke=require('./_invoke');var arraySlice=[].slice;var factories={};var construct=function (F, len, args){if(!(len in factories)){for(var n=[], i=0;i<len; i++) n[i]='a[' + i + ']';
factories[len]=Function('F,a', 'return new F(' + n.join(',') + ')');
} return factories[len](F, args);};module.exports=Function.bind || function bind(that ){var fn=aFunction(this);var partArgs=arraySlice.call(arguments, 1);var bound=function (){var args=partArgs.concat(arraySlice.call(arguments));
  return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
};if(isObject(fn.prototype)) bound.prototype=fn.prototype;
 return bound;};},{"./_a-function":5,"./_invoke":50,"./_is-object":55}],20:[function(require,module,exports){var cof=require('./_cof');var TAG=require('./_wks')('toStringTag');var ARG=cof(function (){ return arguments;}()) == 'Arguments';var tryGet=function (it, key){  try{  return it[key];
}catch(e){}};module.exports=function (it){var O, T, B;
 return it===undefined ? 'Undefined' : it===null ? 'Null'
: typeof (T=tryGet(O=Object(it), TAG)) == 'string' ? T
: ARG ? cof(O)
: (B=cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;};},{"./_cof":21,"./_wks":132}],21:[function(require,module,exports){var toString={}.toString;module.exports=function (it){ return toString.call(it).slice(8, -1);};},{}],22:[function(require,module,exports){  'use strict';var dP=require('./_object-dp').f;var create=require('./_object-create');var redefineAll=require('./_redefine-all');var ctx=require('./_ctx');var anInstance=require('./_an-instance');var forOf=require('./_for-of');var $iterDefine=require('./_iter-define');var step=require('./_iter-step');var setSpecies=require('./_set-species');var DESCRIPTORS=require('./_descriptors');var fastKey=require('./_meta').fastKey;var validate=require('./_validate-collection');var SIZE=DESCRIPTORS ? '_s' : 'size';var getEntry=function (that, key){var index=fastKey(key);var entry;if(index !== 'F') return that._i[index];
for(entry=that._f; entry; entry=entry.n){if(entry.k == key) return entry;
}};module.exports={getConstructor: function (wrapper, NAME, IS_MAP, ADDER){var C=wrapper(function (that, iterable){  anInstance(that, C, NAME, '_i');
  that._t=NAME;
  that._i=create(null);
  that._f=undefined;
  that._l=undefined;
  that[SIZE]=0;if(iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
});
redefineAll(C.prototype, {  clear: function clear(){for(var that=validate(this, NAME), data=that._i, entry=that._f; entry; entry=entry.n){  entry.r=true;if(entry.p) entry.p=entry.p.n=undefined;
delete data[entry.i];}
that._f=that._l=undefined;
that[SIZE]=0;
},
  'delete': function (key){var that=validate(this, NAME);var entry=getEntry(that, key);if(entry){var next=entry.n;var prev=entry.p;
delete that._i[entry.i];
entry.r=true;if(prev) prev.n=next;if(next) next.p=prev;if(that._f == entry) that._f=next;if(that._l == entry) that._l=prev;
that[SIZE]--;} return !!entry;
},
  forEach: function forEach(callbackfn ){validate(this, NAME);var f=ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);var entry;
while (entry=entry ? entry.n : this._f){  f(entry.v, entry.k, this);
while (entry && entry.r) entry=entry.p;}},
  has: function has(key){return !!getEntry(validate(this, NAME), key);
}});if(DESCRIPTORS) dP(C.prototype, 'size', {  get: function (){return validate(this, NAME)[SIZE];
}});
  return C;
},
def: function (that, key, value){var entry=getEntry(that, key);var prev, index;if(entry){  entry.v=value;
}else{  that._l=entry={i: index=fastKey(key, true),
k: key,
v: value,
p: prev=that._l,
n: undefined,
r: false
};if(!that._f) that._f=entry;if(prev) prev.n=entry;
  that[SIZE]++;if(index !== 'F') that._i[index]=entry;
} return that;
},
getEntry: getEntry,
setStrong: function (C, NAME, IS_MAP){$iterDefine(C, NAME, function (iterated, kind){this._t=validate(iterated, NAME);
this._k=kind;
this._l=undefined;
}, function (){var that=this;var kind=that._k;var entry=that._l;
  while (entry && entry.r) entry=entry.p;if(!that._t || !(that._l=entry=entry ? entry.n : that._t._f)){that._t=undefined;
   return step(1);
}
if(kind == 'keys') return step(0, entry.k);if(kind == 'values') return step(0, entry.v);
 return step(0, [entry.k, entry.v]);
}, IS_MAP ? 'entries' : 'values', !IS_MAP, true);
setSpecies(NAME);
}};},{"./_an-instance":9,"./_ctx":28,"./_descriptors":32,"./_for-of":42,"./_iter-define":59,"./_iter-step":61,"./_meta":69,"./_object-create":74,"./_object-dp":75,"./_redefine-all":94,"./_set-species":103,"./_validate-collection":129}],23:[function(require,module,exports){var classof=require('./_classof');var from=require('./_array-from-iterable');
  module.exports=function (NAME){ return function toJSON(){if(classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
  return from(this);
};};},{"./_array-from-iterable":13,"./_classof":20}],24:[function(require,module,exports){  'use strict';var redefineAll=require('./_redefine-all');var getWeak=require('./_meta').getWeak;var anObject=require('./_an-object');var isObject=require('./_is-object');var anInstance=require('./_an-instance');var forOf=require('./_for-of');var createArrayMethod=require('./_array-methods');var $has=require('./_has');var validate=require('./_validate-collection');var arrayFind=createArrayMethod(5);var arrayFindIndex=createArrayMethod(6);var id=0;var uncaughtFrozenStore=function (that){ return that._l || (that._l=new UncaughtFrozenStore());};var UncaughtFrozenStore=function (){this.a=[];};var findUncaughtFrozen=function (store, key){ return arrayFind(store.a, function (it){  return it[0]===key;
});};
  UncaughtFrozenStore.prototype={get: function (key){var entry=findUncaughtFrozen(this, key);if(entry) return entry[1];
},
has: function (key){  return !!findUncaughtFrozen(this, key);
},
set: function (key, value){var entry=findUncaughtFrozen(this, key);if(entry) entry[1]=value;
else this.a.push([key, value]);
},
'delete': function (key){var index=arrayFindIndex(this.a, function (it){ return it[0]===key;
});if(~index) this.a.splice(index, 1);
  return !!~index;
}};module.exports={getConstructor: function (wrapper, NAME, IS_MAP, ADDER){var C=wrapper(function (that, iterable){  anInstance(that, C, NAME, '_i');
  that._t=NAME;
  that._i=id++;
  that._l=undefined;if(iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
});
redefineAll(C.prototype, {  'delete': function (key){if(!isObject(key)) return false;var data=getWeak(key);if(data===true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
   return data && $has(data, this._i) && delete data[this._i];
},
  has: function has(key){if(!isObject(key)) return false;var data=getWeak(key);if(data===true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
   return data && $has(data, this._i);
}});
  return C;
},
def: function (that, key, value){var data=getWeak(anObject(key), true);if(data===true) uncaughtFrozenStore(that).set(key, value);
else data[that._i]=value;
  return that;
},
ufstore: uncaughtFrozenStore
};},{"./_an-instance":9,"./_an-object":10,"./_array-methods":15,"./_for-of":42,"./_has":45,"./_is-object":55,"./_meta":69,"./_redefine-all":94,"./_validate-collection":129}],25:[function(require,module,exports){  'use strict';var global=require('./_global');var $export=require('./_export');var redefine=require('./_redefine');var redefineAll=require('./_redefine-all');var meta=require('./_meta');var forOf=require('./_for-of');var anInstance=require('./_an-instance');var isObject=require('./_is-object');var fails=require('./_fails');var $iterDetect=require('./_iter-detect');var setToStringTag=require('./_set-to-string-tag');var inheritIfRequired=require('./_inherit-if-required');module.exports=function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK){var Base=global[NAME];var C=Base;var ADDER=IS_MAP ? 'set' : 'add';var proto=C && C.prototype;var O={};var fixMethod=function (KEY){var fn=proto[KEY];
redefine(proto, KEY,
  KEY == 'delete' ? function (a){return IS_WEAK && !isObject(a) ? false : fn.call(this, a===0 ? 0 : a);
} : KEY == 'has' ? function has(a){return IS_WEAK && !isObject(a) ? false : fn.call(this, a===0 ? 0 : a);
} : KEY == 'get' ? function get(a){return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a===0 ? 0 : a);
} : KEY == 'add' ? function add(a){ fn.call(this, a===0 ? 0 : a); return this;}
: function set(a, b){ fn.call(this, a===0 ? 0 : a, b); return this;}
  );
};if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function (){new C().entries().next();
}))){C=common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
redefineAll(C.prototype, methods);
meta.NEED=true;
}else{var instance=new C();var HASNT_CHAINING=instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;var THROWS_ON_PRIMITIVES=fails(function (){ instance.has(1);});var ACCEPT_ITERABLES=$iterDetect(function (iter){ new C(iter);});var BUGGY_ZERO=!IS_WEAK && fails(function (){var $instance=new C();var index=5;
  while (index--) $instance[ADDER](index, index);
 return !$instance.has(-0);
});if(!ACCEPT_ITERABLES){  C=wrapper(function (target, iterable){anInstance(target, C, NAME);var that=inheritIfRequired(new Base(), target, C);if(iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
   return that;
});
  C.prototype=proto;
  proto.constructor=C;
}
if(THROWS_ON_PRIMITIVES || BUGGY_ZERO){  fixMethod('delete');
  fixMethod('has');
  IS_MAP && fixMethod('get');
}
if(BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);if(IS_WEAK && proto.clear) delete proto.clear;
}
setToStringTag(C, NAME);  O[NAME]=C;
$export($export.G + $export.W + $export.F * (C != Base), O);if(!IS_WEAK) common.setStrong(C, NAME, IS_MAP); return C;};},{"./_an-instance":9,"./_export":36,"./_fails":38,"./_for-of":42,"./_global":44,"./_inherit-if-required":49,"./_is-object":55,"./_iter-detect":60,"./_meta":69,"./_redefine":95,"./_redefine-all":94,"./_set-to-string-tag":104}],26:[function(require,module,exports){var core=module.exports={ version: '2.6.10' };if(typeof __e == 'number') __e=core;},{}],27:[function(require,module,exports){  'use strict';var $defineProperty=require('./_object-dp');var createDesc=require('./_property-desc');module.exports=function (object, index, value){if(index in object) $defineProperty.f(object, index, createDesc(0, value));
else object[index]=value;};},{"./_object-dp":75,"./_property-desc":93}],28:[function(require,module,exports){var aFunction=require('./_a-function');
  module.exports=function (fn, that, length){aFunction(fn);if(that===undefined) return fn;
switch (length){case 1: return function (a){ return fn.call(that, a);};
case 2: return function (a, b){ return fn.call(that, a, b);};
case 3: return function (a, b, c){ return fn.call(that, a, b, c);};
}
 return function (){  return fn.apply(that, arguments);
};};},{"./_a-function":5}],29:[function(require,module,exports){  'use strict';var fails=require('./_fails');var getTime=Date.prototype.getTime;var $toISOString=Date.prototype.toISOString;var lz=function (num){ return num > 9 ? num : '0' + num;};
  module.exports=(fails(function (){ return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';}) || !fails(function (){$toISOString.call(new Date(NaN));})) ? function toISOString(){if(!isFinite(getTime.call(this))) throw RangeError('Invalid time value');var d=this;var y=d.getUTCFullYear();var m=d.getUTCMilliseconds();var s=y < 0 ? '-' : y > 9999 ? '+' : '';
 return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
'-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';} : $toISOString;},{"./_fails":38}],30:[function(require,module,exports){  'use strict';var anObject=require('./_an-object');var toPrimitive=require('./_to-primitive');var NUMBER='number';module.exports=function (hint){if(hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
 return toPrimitive(anObject(this), hint != NUMBER);};},{"./_an-object":10,"./_to-primitive":123}],31:[function(require,module,exports){  module.exports=function (it){if(it == undefined) throw TypeError("Can't call method on  " + it);
 return it;};},{}],32:[function(require,module,exports){  module.exports=!require('./_fails')(function (){ return Object.defineProperty({}, 'a', { get: function (){ return 7;}}).a != 7;});},{"./_fails":38}],33:[function(require,module,exports){var isObject=require('./_is-object');var document=require('./_global').document;var is=isObject(document) && isObject(document.createElement);
  module.exports=function (it){ return is ? document.createElement(it) : {};};},{"./_global":44,"./_is-object":55}],34:[function(require,module,exports){  module.exports=(
'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
  ).split(',');},{}],35:[function(require,module,exports){var getKeys=require('./_object-keys');var gOPS=require('./_object-gops');var pIE=require('./_object-pie');
  module.exports=function (it){var result=getKeys(it);var getSymbols=gOPS.f;if(getSymbols){var symbols=getSymbols(it);var isEnum=pIE.f;var i=0;var key;
while (symbols.length > i) if(isEnum.call(it, key=symbols[i++])) result.push(key);
} return result;};},{"./_object-gops":81,"./_object-keys":84,"./_object-pie":85}],36:[function(require,module,exports){var global=require('./_global');var core=require('./_core');var hide=require('./_hide');var redefine=require('./_redefine');var ctx=require('./_ctx');var PROTOTYPE='prototype';var $export=function (type, name, source){var IS_FORCED=type & $export.F;var IS_GLOBAL=type & $export.G;var IS_STATIC=type & $export.S;var IS_PROTO=type & $export.P;var IS_BIND=type & $export.B;var target=IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name]={}) : (global[name] || {})[PROTOTYPE];var exports=IS_GLOBAL ? core : core[name] || (core[name]={});var expProto=exports[PROTOTYPE] || (exports[PROTOTYPE]={});var key, own, out, exp;if(IS_GLOBAL) source=name;
for(key in source){own=!IS_FORCED && target && target[key] !== undefined;
out=(own ? target : source)[key];
exp=IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;if(target) redefine(target, key, out, type & $export.U);if(exports[key] != out) hide(exports, key, exp);if(IS_PROTO && expProto[key] != out) expProto[key]=out;
}};
  global.core=core;
  $export.F=1;
  $export.G=2;
  $export.S=4;
  $export.P=8;
  $export.B=16;
  $export.W=32;
  $export.U=64;
  $export.R=128;
  module.exports=$export;},{"./_core":26,"./_ctx":28,"./_global":44,"./_hide":46,"./_redefine":95}],37:[function(require,module,exports){var MATCH=require('./_wks')('match');
  module.exports=function (KEY){var re=/./;
  try{'/./'[KEY](re);
}catch(e){try{  re[MATCH]=false;
 return !'/./'[KEY](re);
}catch(f){}} return true;};},{"./_wks":132}],38:[function(require,module,exports){  module.exports=function (exec){  try{  return !!exec();
}catch(e){  return true;
}};},{}],39:[function(require,module,exports){  'use strict';
require('./es6.regexp.exec');var redefine=require('./_redefine');var hide=require('./_hide');var fails=require('./_fails');var defined=require('./_defined');var wks=require('./_wks');var regexpExec=require('./_regexp-exec');var SPECIES=wks('species');var REPLACE_SUPPORTS_NAMED_GROUPS=!fails(function (){var re=/./;
re.exec=function (){var result=[];
result.groups={ a: '7' };
  return result;
};
 return ''.replace(re, '$<a>') !== '7';});var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC=(function (){var re=/(?:)/;var originalExec=re.exec;
re.exec=function (){ return originalExec.apply(this, arguments);};var result='ab'.split(re);
 return result.length===2 && result[0]==='a' && result[1]==='b';})();module.exports=function (KEY, length, exec){var SYMBOL=wks(KEY);var DELEGATES_TO_SYMBOL=!fails(function (){var O={};
O[SYMBOL]=function (){ return 7;};
  return ''[KEY](O) != 7;
});var DELEGATES_TO_EXEC=DELEGATES_TO_SYMBOL ? !fails(function (){var execCalled=false;var re=/a/;
re.exec=function (){ execCalled=true; return null;};if(KEY==='split'){  re.constructor={};
  re.constructor[SPECIES]=function (){ return re;};
}
re[SYMBOL]('');
  return !execCalled;
}) : undefined;if(
!DELEGATES_TO_SYMBOL ||
!DELEGATES_TO_EXEC ||
(KEY==='replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
(KEY==='split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
){var nativeRegExpMethod=/./[SYMBOL];var fns=exec(
  defined,
  SYMBOL,
  ''[KEY],
  function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod){if(regexp.exec===regexpExec){if(DELEGATES_TO_SYMBOL && !forceStringMethod){return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
}
  return { done: true, value: nativeMethod.call(str, regexp, arg2) };}
   return { done: false };
}
  );var strfn=fns[0];var rxfn=fns[1];redefine(String.prototype, KEY, strfn);
hide(RegExp.prototype, SYMBOL, length == 2
  ? function (string, arg){ return rxfn.call(string, this, arg);}
  : function (string){ return rxfn.call(string, this);}
  );
}};},{"./_defined":31,"./_fails":38,"./_hide":46,"./_redefine":95,"./_regexp-exec":97,"./_wks":132,"./es6.regexp.exec":229}],40:[function(require,module,exports){  'use strict';var anObject=require('./_an-object');
  module.exports=function (){var that=anObject(this);var result='';if(that.global) result += 'g';if(that.ignoreCase) result += 'i';if(that.multiline) result += 'm';if(that.unicode) result += 'u';if(that.sticky) result += 'y';
 return result;};},{"./_an-object":10}],41:[function(require,module,exports){  'use strict';var isArray=require('./_is-array');var isObject=require('./_is-object');var toLength=require('./_to-length');var ctx=require('./_ctx');var IS_CONCAT_SPREADABLE=require('./_wks')('isConcatSpreadable');function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg){var targetIndex=start;var sourceIndex=0;var mapFn=mapper ? ctx(mapper, thisArg, 3) : false;var element, spreadable;  while (sourceIndex < sourceLen){if(sourceIndex in source){  element=mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];spreadable=false;if(isObject(element)){spreadable=element[IS_CONCAT_SPREADABLE];
spreadable=spreadable !== undefined ? !!spreadable : isArray(element);
}
if(spreadable && depth > 0){targetIndex=flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
}else{if(targetIndex >= 0x1fffffffffffff) throw TypeError();
target[targetIndex]=element;
}
  targetIndex++;
}
sourceIndex++;
}
 return targetIndex;}
  module.exports=flattenIntoArray;},{"./_ctx":28,"./_is-array":53,"./_is-object":55,"./_to-length":121,"./_wks":132}],42:[function(require,module,exports){var ctx=require('./_ctx');var call=require('./_iter-call');var isArrayIter=require('./_is-array-iter');var anObject=require('./_an-object');var toLength=require('./_to-length');var getIterFn=require('./core.get-iterator-method');var BREAK={};var RETURN={};var exports=module.exports=function (iterable, entries, fn, that, ITERATOR){var iterFn=ITERATOR ? function (){ return iterable;} : getIterFn(iterable);var f=ctx(fn, that, entries ? 2 : 1);var index=0;var length, step, iterator, result;if(typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');if(isArrayIter(iterFn)) for(length=toLength(iterable.length); length > index; index++){result=entries ? f(anObject(step=iterable[index])[0], step[1]) : f(iterable[index]);if(result===BREAK || result===RETURN) return result;
}else for(iterator=iterFn.call(iterable); !(step=iterator.next()).done;){result=call(iterator, f, step.value, entries);if(result===BREAK || result===RETURN) return result;
}};
  exports.BREAK=BREAK;
  exports.RETURN=RETURN;},{"./_an-object":10,"./_ctx":28,"./_is-array-iter":52,"./_iter-call":57,"./_to-length":121,"./core.get-iterator-method":133}],43:[function(require,module,exports){  module.exports=require('./_shared')('native-function-to-string', Function.toString);},{"./_shared":106}],44:[function(require,module,exports){var global=module.exports=typeof window != 'undefined' && window.Math == Math
? window : typeof self != 'undefined' && self.Math == Math ? self
: Function('return this')();if(typeof __g == 'number') __g=global;},{}],45:[function(require,module,exports){var hasOwnProperty={}.hasOwnProperty;
  module.exports=function (it, key){ return hasOwnProperty.call(it, key);};},{}],46:[function(require,module,exports){var dP=require('./_object-dp');var createDesc=require('./_property-desc');
  module.exports=require('./_descriptors') ? function (object, key, value){ return dP.f(object, key, createDesc(1, value));} : function (object, key, value){object[key]=value;
 return object;};},{"./_descriptors":32,"./_object-dp":75,"./_property-desc":93}],47:[function(require,module,exports){var document=require('./_global').document;
  module.exports=document && document.documentElement;},{"./_global":44}],48:[function(require,module,exports){  module.exports=!require('./_descriptors') && !require('./_fails')(function (){ return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function (){ return 7;}}).a != 7;});},{"./_descriptors":32,"./_dom-create":33,"./_fails":38}],49:[function(require,module,exports){var isObject=require('./_is-object');var setPrototypeOf=require('./_set-proto').set;
  module.exports=function (that, target, C){var S=target.constructor;var P;if(S !== C && typeof S == 'function' && (P=S.prototype) !== C.prototype && isObject(P) && setPrototypeOf){setPrototypeOf(that, P);
} return that;};},{"./_is-object":55,"./_set-proto":102}],50:[function(require,module,exports){  module.exports=function (fn, args, that){var un=that===undefined;
switch (args.length){case 0: return un ? fn()
  : fn.call(that);
case 1: return un ? fn(args[0])
  : fn.call(that, args[0]);
case 2: return un ? fn(args[0], args[1])
  : fn.call(that, args[0], args[1]);
case 3: return un ? fn(args[0], args[1], args[2])
  : fn.call(that, args[0], args[1], args[2]);
case 4: return un ? fn(args[0], args[1], args[2], args[3])
  : fn.call(that, args[0], args[1], args[2], args[3]);
} return fn.apply(that, args);};},{}],51:[function(require,module,exports){var cof=require('./_cof');
  module.exports=Object('z').propertyIsEnumerable(0) ? Object : function (it){ return cof(it) == 'String' ? it.split('') : Object(it);};},{"./_cof":21}],52:[function(require,module,exports){var Iterators=require('./_iterators');var ITERATOR=require('./_wks')('iterator');var ArrayProto=Array.prototype;module.exports=function (it){ return it !== undefined && (Iterators.Array===it || ArrayProto[ITERATOR]===it);};},{"./_iterators":62,"./_wks":132}],53:[function(require,module,exports){var cof=require('./_cof');
  module.exports=Array.isArray || function isArray(arg){ return cof(arg) == 'Array';};},{"./_cof":21}],54:[function(require,module,exports){var isObject=require('./_is-object');var floor=Math.floor;
  module.exports=function isInteger(it){ return !isObject(it) && isFinite(it) && floor(it)===it;};},{"./_is-object":55}],55:[function(require,module,exports){  module.exports=function (it){ return typeof it==='object' ? it !== null : typeof it==='function';};},{}],56:[function(require,module,exports){var isObject=require('./_is-object');var cof=require('./_cof');var MATCH=require('./_wks')('match');
  module.exports=function (it){var isRegExp;
 return isObject(it) && ((isRegExp=it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');};},{"./_cof":21,"./_is-object":55,"./_wks":132}],57:[function(require,module,exports){var anObject=require('./_an-object');
  module.exports=function (iterator, fn, value, entries){  try{  return entries ? fn(anObject(value)[0], value[1]) : fn(value);
}catch(e){var ret=iterator['return'];if(ret !== undefined) anObject(ret.call(iterator));
throw e;
}};},{"./_an-object":10}],58:[function(require,module,exports){  'use strict';var create=require('./_object-create');var descriptor=require('./_property-desc');var setToStringTag=require('./_set-to-string-tag');var IteratorPrototype={};
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function (){ return this;});module.exports=function (Constructor, NAME, next){Constructor.prototype=create(IteratorPrototype, { next: descriptor(1, next) });
setToStringTag(Constructor, NAME + ' Iterator');};},{"./_hide":46,"./_object-create":74,"./_property-desc":93,"./_set-to-string-tag":104,"./_wks":132}],59:[function(require,module,exports){  'use strict';var LIBRARY=require('./_library');var $export=require('./_export');var redefine=require('./_redefine');var hide=require('./_hide');var Iterators=require('./_iterators');var $iterCreate=require('./_iter-create');var setToStringTag=require('./_set-to-string-tag');var getPrototypeOf=require('./_object-gpo');var ITERATOR=require('./_wks')('iterator');var BUGGY=!([].keys && 'next' in [].keys());var FF_ITERATOR='@@iterator';var KEYS='keys';var VALUES='values';var returnThis=function (){ return this;};module.exports=function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){$iterCreate(Constructor, NAME, next);var getMethod=function (kind){if(!BUGGY && kind in proto) return proto[kind];
switch (kind){case KEYS: return function keys(){ return new Constructor(this, kind);};
case VALUES: return function values(){ return new Constructor(this, kind);};
} return function entries(){ return new Constructor(this, kind);};
};var TAG=NAME + ' Iterator';var DEF_VALUES=DEFAULT == VALUES;var VALUES_BUG=false;var proto=Base.prototype;var $native=proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];var $default=$native || getMethod(DEFAULT);var $entries=DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;var $anyNative=NAME == 'Array' ? proto.entries || $native : $native;var methods, key, IteratorPrototype;if($anyNative){IteratorPrototype=getPrototypeOf($anyNative.call(new Base()));if(IteratorPrototype !== Object.prototype && IteratorPrototype.next){  setToStringTag(IteratorPrototype, TAG, true);if(!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
}}
if(DEF_VALUES && $native && $native.name !== VALUES){VALUES_BUG=true;
$default=function values(){ return $native.call(this);};
}
if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){hide(proto, ITERATOR, $default);
}
Iterators[NAME]=$default;
Iterators[TAG]=returnThis;if(DEFAULT){methods={  values: DEF_VALUES ? $default : getMethod(VALUES),
  keys: IS_SET ? $default : getMethod(KEYS),
  entries: $entries};if(FORCED) for(key in methods){if(!(key in proto)) redefine(proto, key, methods[key]);
}else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
}
 return methods;};},{"./_export":36,"./_hide":46,"./_iter-create":58,"./_iterators":62,"./_library":63,"./_object-gpo":82,"./_redefine":95,"./_set-to-string-tag":104,"./_wks":132}],60:[function(require,module,exports){var ITERATOR=require('./_wks')('iterator');var SAFE_CLOSING=false;try{var riter=[7][ITERATOR]();
riter['return']=function (){ SAFE_CLOSING=true;};
Array.from(riter, function (){ throw 2;});}catch(e){}
  module.exports=function (exec, skipClosing){if(!skipClosing && !SAFE_CLOSING) return false;var safe=false;
  try{var arr=[7];var iter=arr[ITERATOR]();
iter.next=function (){ return { done: safe=true };};
arr[ITERATOR]=function (){ return iter;};
exec(arr);
}catch(e){}
 return safe;};},{"./_wks":132}],61:[function(require,module,exports){  module.exports=function (done, value){ return { value: value, done: !!done };};},{}],62:[function(require,module,exports){  module.exports={};},{}],63:[function(require,module,exports){  module.exports=false;},{}],64:[function(require,module,exports){var $expm1=Math.expm1;
  module.exports=(!$expm1
|| $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
|| $expm1(-2e-17) != -2e-17
  ) ? function expm1(x){ return (x=+x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;} : $expm1;},{}],65:[function(require,module,exports){var sign=require('./_math-sign');var pow=Math.pow;var EPSILON=pow(2, -52);var EPSILON32=pow(2, -23);var MAX32=pow(2, 127) * (2 - EPSILON32);var MIN32=pow(2, -126);var roundTiesToEven=function (n){ return n + 1 / EPSILON - 1 / EPSILON;};module.exports=Math.fround || function fround(x){var $abs=Math.abs(x);var $sign=sign(x);var a, result;if($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
a=(1 + EPSILON32 / EPSILON) * $abs;
result=a - (a - $abs);if(result > MAX32 || result != result) return $sign * Infinity;
 return $sign * result;};},{"./_math-sign":68}],66:[function(require,module,exports){  module.exports=Math.log1p || function log1p(x){ return (x=+x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);};},{}],67:[function(require,module,exports){  module.exports=Math.scale || function scale(x, inLow, inHigh, outLow, outHigh){if(
arguments.length===0
  || x != x
  || inLow != inLow
  || inHigh != inHigh
  || outLow != outLow
  || outHigh != outHigh
) return NaN;if(x===Infinity || x===-Infinity) return x;
 return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;};},{}],68:[function(require,module,exports){  module.exports=Math.sign || function sign(x){ return (x=+x) == 0 || x != x ? x : x < 0 ? -1 : 1;};},{}],69:[function(require,module,exports){var META=require('./_uid')('meta');var isObject=require('./_is-object');var has=require('./_has');var setDesc=require('./_object-dp').f;var id=0;var isExtensible=Object.isExtensible || function (){ return true;};var FREEZE=!require('./_fails')(function (){ return isExtensible(Object.preventExtensions({}));});var setMeta=function (it){setDesc(it, META, { value: {i: 'O' + ++id,
w: {}}});};var fastKey=function (it, create){if(!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;if(!has(it, META)){if(!isExtensible(it)) return 'F';if(!create) return 'E';
setMeta(it);
} return it[META].i;};var getWeak=function (it, create){if(!has(it, META)){if(!isExtensible(it)) return true;if(!create) return false;
setMeta(it);
} return it[META].w;};var onFreeze=function (it){if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
 return it;};var meta=module.exports={KEY: META,
NEED: false,
fastKey: fastKey,
getWeak: getWeak,
onFreeze: onFreeze
};},{"./_fails":38,"./_has":45,"./_is-object":55,"./_object-dp":75,"./_uid":127}],70:[function(require,module,exports){var Map=require('./es6.map');var $export=require('./_export');var shared=require('./_shared')('metadata');var store=shared.store || (shared.store=new (require('./es6.weak-map'))());var getOrCreateMetadataMap=function (target, targetKey, create){var targetMetadata=store.get(target);if(!targetMetadata){if(!create) return undefined;
store.set(target, targetMetadata=new Map());
}
var keyMetadata=targetMetadata.get(targetKey);if(!keyMetadata){if(!create) return undefined;
targetMetadata.set(targetKey, keyMetadata=new Map());
} return keyMetadata;};var ordinaryHasOwnMetadata=function (MetadataKey, O, P){var metadataMap=getOrCreateMetadataMap(O, P, false);
 return metadataMap===undefined ? false : metadataMap.has(MetadataKey);};var ordinaryGetOwnMetadata=function (MetadataKey, O, P){var metadataMap=getOrCreateMetadataMap(O, P, false);
 return metadataMap===undefined ? undefined : metadataMap.get(MetadataKey);};var ordinaryDefineOwnMetadata=function (MetadataKey, MetadataValue, O, P){getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);};var ordinaryOwnMetadataKeys=function (target, targetKey){var metadataMap=getOrCreateMetadataMap(target, targetKey, false);var keys=[];if(metadataMap) metadataMap.forEach(function (_, key){ keys.push(key);});
 return keys;};var toMetaKey=function (it){ return it===undefined || typeof it == 'symbol' ? it : String(it);};var exp=function (O){$export($export.S, 'Reflect', O);};module.exports={store: store,
map: getOrCreateMetadataMap,
has: ordinaryHasOwnMetadata,
get: ordinaryGetOwnMetadata,
set: ordinaryDefineOwnMetadata,
keys: ordinaryOwnMetadataKeys,
key: toMetaKey,
exp: exp
};},{"./_export":36,"./_shared":106,"./es6.map":164,"./es6.weak-map":271}],71:[function(require,module,exports){var global=require('./_global');var macrotask=require('./_task').set;var Observer=global.MutationObserver || global.WebKitMutationObserver;var process=global.process;var Promise=global.Promise;var isNode=require('./_cof')(process) == 'process';module.exports=function (){var head, last, notify;var flush=function (){var parent, fn;if(isNode && (parent=process.domain)) parent.exit();
while (head){  fn=head.fn;
  head=head.next;
  try{fn();
}catch(e){if(head) notify();
else last=undefined;
throw e;
}} last=undefined;if(parent) parent.enter();
};if(isNode){notify=function (){  process.nextTick(flush);};
}else if(Observer && !(global.navigator && global.navigator.standalone)){var toggle=true;var node=document.createTextNode('');
new Observer(flush).observe(node, { characterData: true });
notify=function (){  node.data=toggle=!toggle;};
}else if(Promise && Promise.resolve){var promise=Promise.resolve(undefined);
notify=function (){  promise.then(flush);};
}else{notify=function (){  macrotask.call(global, flush);};
}
 return function (fn){var task={ fn: fn, next: undefined };if(last) last.next=task;if(!head){  head=task;
  notify();
} last=task;
};};},{"./_cof":21,"./_global":44,"./_task":116}],72:[function(require,module,exports){  'use strict';var aFunction=require('./_a-function');function PromiseCapability(C){var resolve, reject;
this.promise=new C(function ($$resolve, $$reject){if(resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
resolve=$$resolve;
reject=$$reject;
});
this.resolve=aFunction(resolve);
this.reject=aFunction(reject);}
  module.exports.f=function (C){ return new PromiseCapability(C);};},{"./_a-function":5}],73:[function(require,module,exports){  'use strict';var DESCRIPTORS=require('./_descriptors');var getKeys=require('./_object-keys');var gOPS=require('./_object-gops');var pIE=require('./_object-pie');var toObject=require('./_to-object');var IObject=require('./_iobject');var $assign=Object.assign;
  module.exports=!$assign || require('./_fails')(function (){var A={};var B={};var S=Symbol();var K='abcdefghijklmnopqrst';
A[S]=7;
K.split('').forEach(function (k){ B[k]=k;});
 return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;}) ? function assign(target, source){var T=toObject(target);var aLen=arguments.length;var index=1;var getSymbols=gOPS.f;var isEnum=pIE.f;
while (aLen > index){var S=IObject(arguments[index++]);var keys=getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);var length=keys.length;var j=0;var key;
while (length > j){  key=keys[j++];if(!DESCRIPTORS || isEnum.call(S, key)) T[key]=S[key];
}} return T;} : $assign;},{"./_descriptors":32,"./_fails":38,"./_iobject":51,"./_object-gops":81,"./_object-keys":84,"./_object-pie":85,"./_to-object":122}],74:[function(require,module,exports){var anObject=require('./_an-object');var dPs=require('./_object-dps');var enumBugKeys=require('./_enum-bug-keys');var IE_PROTO=require('./_shared-key')('IE_PROTO');var Empty=function (){};var PROTOTYPE='prototype';var createDict=function (){var iframe=require('./_dom-create')('iframe');var i=enumBugKeys.length;var lt='<';var gt='>';var iframeDocument;
iframe.style.display='none';
  require('./_html').appendChild(iframe);
iframe.src='javascript:';
iframeDocument=iframe.contentWindow.document;
iframeDocument.open();
iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
iframeDocument.close();
createDict=iframeDocument.F;
while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
 return createDict();};module.exports=Object.create || function create(O, Properties){var result;if(O !== null){Empty[PROTOTYPE]=anObject(O);
result=new Empty();
Empty[PROTOTYPE]=null;
result[IE_PROTO]=O;
}else result=createDict();
 return Properties===undefined ? result : dPs(result, Properties);};},{"./_an-object":10,"./_dom-create":33,"./_enum-bug-keys":34,"./_html":47,"./_object-dps":76,"./_shared-key":105}],75:[function(require,module,exports){var anObject=require('./_an-object');var IE8_DOM_DEFINE=require('./_ie8-dom-define');var toPrimitive=require('./_to-primitive');var dP=Object.defineProperty;exports.f=require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes){anObject(O);
P=toPrimitive(P, true);
anObject(Attributes);if(IE8_DOM_DEFINE) try{  return dP(O, P, Attributes);
}catch(e){}
if('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');if('value' in Attributes) O[P]=Attributes.value;
 return O;};},{"./_an-object":10,"./_descriptors":32,"./_ie8-dom-define":48,"./_to-primitive":123}],76:[function(require,module,exports){var dP=require('./_object-dp');var anObject=require('./_an-object');var getKeys=require('./_object-keys');module.exports=require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties){anObject(O);var keys=getKeys(Properties);var length=keys.length;var i=0;var P;
while (length > i) dP.f(O, P=keys[i++], Properties[P]);
 return O;};},{"./_an-object":10,"./_descriptors":32,"./_object-dp":75,"./_object-keys":84}],77:[function(require,module,exports){  'use strict';
  module.exports=require('./_library') || !require('./_fails')(function (){var K=Math.random();
__defineSetter__.call(null, K, function (){});
delete require('./_global')[K];});},{"./_fails":38,"./_global":44,"./_library":63}],78:[function(require,module,exports){var pIE=require('./_object-pie');var createDesc=require('./_property-desc');var toIObject=require('./_to-iobject');var toPrimitive=require('./_to-primitive');var has=require('./_has');var IE8_DOM_DEFINE=require('./_ie8-dom-define');var gOPD=Object.getOwnPropertyDescriptor;exports.f=require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P){O=toIObject(O);
P=toPrimitive(P, true);if(IE8_DOM_DEFINE) try{  return gOPD(O, P);
}catch(e){}
if(has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);};},{"./_descriptors":32,"./_has":45,"./_ie8-dom-define":48,"./_object-pie":85,"./_property-desc":93,"./_to-iobject":120,"./_to-primitive":123}],79:[function(require,module,exports){var toIObject=require('./_to-iobject');var gOPN=require('./_object-gopn').f;var toString={}.toString;var windowNames=typeof window == 'object' && window && Object.getOwnPropertyNames
? Object.getOwnPropertyNames(window) : [];var getWindowNames=function (it){  try{  return gOPN(it);
}catch(e){  return windowNames.slice();
}};module.exports.f=function getOwnPropertyNames(it){ return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));};},{"./_object-gopn":80,"./_to-iobject":120}],80:[function(require,module,exports){var $keys=require('./_object-keys-internal');var hiddenKeys=require('./_enum-bug-keys').concat('length', 'prototype');exports.f=Object.getOwnPropertyNames || function getOwnPropertyNames(O){ return $keys(O, hiddenKeys);};},{"./_enum-bug-keys":34,"./_object-keys-internal":83}],81:[function(require,module,exports){  exports.f=Object.getOwnPropertySymbols;},{}],82:[function(require,module,exports){var has=require('./_has');var toObject=require('./_to-object');var IE_PROTO=require('./_shared-key')('IE_PROTO');var ObjectProto=Object.prototype;module.exports=Object.getPrototypeOf || function (O){O=toObject(O);if(has(O, IE_PROTO)) return O[IE_PROTO];if(typeof O.constructor == 'function' && O instanceof O.constructor){  return O.constructor.prototype;
} return O instanceof Object ? ObjectProto : null;};},{"./_has":45,"./_shared-key":105,"./_to-object":122}],83:[function(require,module,exports){var has=require('./_has');var toIObject=require('./_to-iobject');var arrayIndexOf=require('./_array-includes')(false);var IE_PROTO=require('./_shared-key')('IE_PROTO');module.exports=function (object, names){var O=toIObject(object);var i=0;var result=[];var key;
for(key in O) if(key != IE_PROTO) has(O, key) && result.push(key);
while (names.length > i) if(has(O, key=names[i++])){~arrayIndexOf(result, key) || result.push(key);
}
 return result;};},{"./_array-includes":14,"./_has":45,"./_shared-key":105,"./_to-iobject":120}],84:[function(require,module,exports){var $keys=require('./_object-keys-internal');var enumBugKeys=require('./_enum-bug-keys');module.exports=Object.keys || function keys(O){ return $keys(O, enumBugKeys);};},{"./_enum-bug-keys":34,"./_object-keys-internal":83}],85:[function(require,module,exports){  exports.f={}.propertyIsEnumerable;},{}],86:[function(require,module,exports){var $export=require('./_export');var core=require('./_core');var fails=require('./_fails');
  module.exports=function (KEY, exec){var fn=(core.Object || {})[KEY] || Object[KEY];var exp={};
exp[KEY]=exec(fn);
$export($export.S + $export.F * fails(function (){ fn(1);}), 'Object', exp);};},{"./_core":26,"./_export":36,"./_fails":38}],87:[function(require,module,exports){var DESCRIPTORS=require('./_descriptors');var getKeys=require('./_object-keys');var toIObject=require('./_to-iobject');var isEnum=require('./_object-pie').f;
  module.exports=function (isEntries){ return function (it){var O=toIObject(it);var keys=getKeys(O);var length=keys.length;var i=0;var result=[];var key;
while (length > i){  key=keys[i++];if(!DESCRIPTORS || isEnum.call(O, key)){result.push(isEntries ? [key, O[key]] : O[key]);
}}
  return result;
};};},{"./_descriptors":32,"./_object-keys":84,"./_object-pie":85,"./_to-iobject":120}],88:[function(require,module,exports){var gOPN=require('./_object-gopn');var gOPS=require('./_object-gops');var anObject=require('./_an-object');var Reflect=require('./_global').Reflect;
  module.exports=Reflect && Reflect.ownKeys || function ownKeys(it){var keys=gOPN.f(anObject(it));var getSymbols=gOPS.f;
 return getSymbols ? keys.concat(getSymbols(it)) : keys;};},{"./_an-object":10,"./_global":44,"./_object-gopn":80,"./_object-gops":81}],89:[function(require,module,exports){var $parseFloat=require('./_global').parseFloat;var $trim=require('./_string-trim').trim;module.exports=1 / $parseFloat(require('./_string-ws') + '-0') !== -Infinity ? function parseFloat(str){var string=$trim(String(str), 3);var result=$parseFloat(string);
 return result===0 && string.charAt(0) == '-' ? -0 : result;} : $parseFloat;},{"./_global":44,"./_string-trim":114,"./_string-ws":115}],90:[function(require,module,exports){var $parseInt=require('./_global').parseInt;var $trim=require('./_string-trim').trim;var ws=require('./_string-ws');var hex=/^[-+]?0[xX]/;module.exports=$parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix){var string=$trim(String(str), 3);
 return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));} : $parseInt;},{"./_global":44,"./_string-trim":114,"./_string-ws":115}],91:[function(require,module,exports){  module.exports=function (exec){  try{  return { e: false, v: exec() };
}catch(e){  return { e: true, v: e };
}};},{}],92:[function(require,module,exports){var anObject=require('./_an-object');var isObject=require('./_is-object');var newPromiseCapability=require('./_new-promise-capability');module.exports=function (C, x){anObject(C);if(isObject(x) && x.constructor===C) return x;var promiseCapability=newPromiseCapability.f(C);var resolve=promiseCapability.resolve;
resolve(x);
 return promiseCapability.promise;};},{"./_an-object":10,"./_is-object":55,"./_new-promise-capability":72}],93:[function(require,module,exports){  module.exports=function (bitmap, value){ return {enumerable: !(bitmap & 1),
configurable: !(bitmap & 2),
writable: !(bitmap & 4),
  value:value
};};},{}],94:[function(require,module,exports){var redefine=require('./_redefine');
  module.exports=function (target, src, safe){for(var key in src) redefine(target, key, src[key], safe);
 return target;};},{"./_redefine":95}],95:[function(require,module,exports){var global=require('./_global');var hide=require('./_hide');var has=require('./_has');var SRC=require('./_uid')('src');var $toString=require('./_function-to-string');var TO_STRING='toString';var TPL=('' + $toString).split(TO_STRING);require('./_core').inspectSource=function (it){ return $toString.call(it);};(module.exports=function (O, key, val, safe){var isFunction=typeof val == 'function';if(isFunction) has(val, 'name') || hide(val, 'name', key);if(O[key]===val) return;if(isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));if(O===global){O[key]=val;
}else if(!safe){delete O[key];
hide(O, key, val);
}else if(O[key]){O[key]=val;
}else{hide(O, key, val);
}})(Function.prototype, TO_STRING, function toString(){ return typeof this == 'function' && this[SRC] || $toString.call(this);});},{"./_core":26,"./_function-to-string":43,"./_global":44,"./_has":45,"./_hide":46,"./_uid":127}],96:[function(require,module,exports){  'use strict';var classof=require('./_classof');var builtinExec=RegExp.prototype.exec;
  module.exports=function (R, S){var exec=R.exec;if(typeof exec==='function'){var result=exec.call(R, S);if(typeof result !== 'object'){  throw new TypeError('RegExp exec method returned something other than an Object or null');
}
  return result;
}
if(classof(R) !== 'RegExp'){throw new TypeError('RegExp#exec called on incompatible receiver');
}
 return builtinExec.call(R, S);};},{"./_classof":20}],97:[function(require,module,exports){  'use strict';var regexpFlags=require('./_flags');var nativeExec=RegExp.prototype.exec;var nativeReplace=String.prototype.replace;var patchedExec=nativeExec;var LAST_INDEX='lastIndex';var UPDATES_LAST_INDEX_WRONG=(function (){var re1=/a/,
  re2=/b*/g;
nativeExec.call(re1, 'a');
nativeExec.call(re2, 'a');
 return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;})();var NPCG_INCLUDED=/()??/.exec('')[1] !== undefined;var PATCH=UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;if(PATCH){patchedExec=function exec(str){var re=this;var lastIndex, reCopy, match, i;if(NPCG_INCLUDED){  reCopy=new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
}
if(UPDATES_LAST_INDEX_WRONG) lastIndex=re[LAST_INDEX];match=nativeExec.call(re, str);if(UPDATES_LAST_INDEX_WRONG && match){  re[LAST_INDEX]=re.global ? match.index + match[0].length : lastIndex;
}
if(NPCG_INCLUDED && match && match.length > 1){  nativeReplace.call(match[0], reCopy, function (){for(i=1; i < arguments.length - 2; i++){if(arguments[i]===undefined) match[i]=undefined;}});}
  return match;
};}
  module.exports=patchedExec;},{"./_flags":40}],98:[function(require,module,exports){  module.exports=function (regExp, replace){var replacer=replace===Object(replace) ? function (part){  return replace[part];
} : replace;
 return function (it){  return String(it).replace(regExp, replacer);
};};},{}],99:[function(require,module,exports){  module.exports=Object.is || function is(x, y){ return x===y ? x !== 0 || 1 / x===1 / y : x != x && y != y;};},{}],100:[function(require,module,exports){  'use strict';var $export=require('./_export');var aFunction=require('./_a-function');var ctx=require('./_ctx');var forOf=require('./_for-of');module.exports=function (COLLECTION){$export($export.S, COLLECTION, { from: function from(source ){var mapFn=arguments[1];var mapping, A, n, cb;
aFunction(this);
mapping=mapFn !== undefined;if(mapping) aFunction(mapFn);if(source == undefined) return new this();
A=[];if(mapping){  n=0;
  cb=ctx(mapFn, arguments[2], 2);
  forOf(source, false, function (nextItem){A.push(cb(nextItem, n++));
});}else{  forOf(source, false, A.push, A);
}
  return new this(A);
}});};},{"./_a-function":5,"./_ctx":28,"./_export":36,"./_for-of":42}],101:[function(require,module,exports){  'use strict';var $export=require('./_export');module.exports=function (COLLECTION){$export($export.S, COLLECTION, { of: function of(){var length=arguments.length;var A=new Array(length);
while (length--) A[length]=arguments[length];
  return new this(A);
}});};},{"./_export":36}],102:[function(require,module,exports){  
var isObject=require('./_is-object');var anObject=require('./_an-object');var check=function (O, proto){anObject(O);if(!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");};
  module.exports={set: Object.setPrototypeOf || ('__proto__' in {} ?
function (test, buggy, set){  try{set=require('./_ctx')(Function.call, require('./_object-gopd').f(Object.prototype, '__proto__').set, 2);
set(test, []);
buggy=!(test instanceof Array);
}catch(e){ buggy=true;}
 return function setPrototypeOf(O, proto){check(O, proto);if(buggy) O.__proto__=proto;
else set(O, proto);
   return O;
};
}({}, false) : undefined),
check: check
};},{"./_an-object":10,"./_ctx":28,"./_is-object":55,"./_object-gopd":78}],103:[function(require,module,exports){  'use strict';var global=require('./_global');var dP=require('./_object-dp');var DESCRIPTORS=require('./_descriptors');var SPECIES=require('./_wks')('species');module.exports=function (KEY){var C=global[KEY];if(DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {configurable: true,
get: function (){ return this;}});};},{"./_descriptors":32,"./_global":44,"./_object-dp":75,"./_wks":132}],104:[function(require,module,exports){var def=require('./_object-dp').f;var has=require('./_has');var TAG=require('./_wks')('toStringTag');module.exports=function (it, tag, stat){if(it && !has(it=stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });};},{"./_has":45,"./_object-dp":75,"./_wks":132}],105:[function(require,module,exports){var shared=require('./_shared')('keys');var uid=require('./_uid');
  module.exports=function (key){ return shared[key] || (shared[key]=uid(key));};},{"./_shared":106,"./_uid":127}],106:[function(require,module,exports){var core=require('./_core');var global=require('./_global');var SHARED='__core-js_shared__';var store=global[SHARED] || (global[SHARED]={});(module.exports=function (key, value){ return store[key] || (store[key]=value !== undefined ? value : {});})('versions', []).push({version: core.version,
mode: require('./_library') ? 'pure' : 'global',
copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});},{"./_core":26,"./_global":44,"./_library":63}],107:[function(require,module,exports){var anObject=require('./_an-object');var aFunction=require('./_a-function');var SPECIES=require('./_wks')('species');
  module.exports=function (O, D){var C=anObject(O).constructor;var S;
 return C===undefined || (S=anObject(C)[SPECIES]) == undefined ? D : aFunction(S);};},{"./_a-function":5,"./_an-object":10,"./_wks":132}],108:[function(require,module,exports){  'use strict';var fails=require('./_fails');module.exports=function (method, arg){ return !!method && fails(function (){arg ? method.call(null, function (){}, 1) : method.call(null);
});};},{"./_fails":38}],109:[function(require,module,exports){var toInteger=require('./_to-integer');var defined=require('./_defined');
  module.exports=function (TO_STRING){ return function (that, pos){var s=String(defined(that));var i=toInteger(pos);var l=s.length;var a, b;if(i < 0 || i >= l) return TO_STRING ? '' : undefined;
a=s.charCodeAt(i);
  return a < 0xd800 || a > 0xdbff || i + 1===l || (b=s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
  ? TO_STRING ? s.charAt(i) : a
  : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
};};},{"./_defined":31,"./_to-integer":119}],110:[function(require,module,exports){var isRegExp=require('./_is-regexp');var defined=require('./_defined');module.exports=function (that, searchString, NAME){if(isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
 return String(defined(that));};},{"./_defined":31,"./_is-regexp":56}],111:[function(require,module,exports){var $export=require('./_export');var fails=require('./_fails');var defined=require('./_defined');var quot=/"/g;var createHTML=function (string, tag, attribute, value){var S=String(defined(string));var p1='<' + tag;if(attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
 return p1 + '>' + S + '</' + tag + '>';};
  module.exports=function (NAME, exec){var O={};
O[NAME]=exec(createHTML);
$export($export.P + $export.F * fails(function (){var test=''[NAME]('"');
  return test !== test.toLowerCase() || test.split('"').length > 3;
}), 'String', O);};},{"./_defined":31,"./_export":36,"./_fails":38}],112:[function(require,module,exports){var toLength=require('./_to-length');var repeat=require('./_string-repeat');var defined=require('./_defined');module.exports=function (that, maxLength, fillString, left){var S=String(defined(that));var stringLength=S.length;var fillStr=fillString===undefined ? ' ' : String(fillString);var intMaxLength=toLength(maxLength);if(intMaxLength <= stringLength || fillStr == '') return S;var fillLen=intMaxLength - stringLength;var stringFiller=repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));if(stringFiller.length > fillLen) stringFiller=stringFiller.slice(0, fillLen);
 return left ? stringFiller + S : S + stringFiller;};},{"./_defined":31,"./_string-repeat":113,"./_to-length":121}],113:[function(require,module,exports){  'use strict';var toInteger=require('./_to-integer');var defined=require('./_defined');module.exports=function repeat(count){var str=String(defined(this));var res='';var n=toInteger(count);if(n < 0 || n == Infinity) throw RangeError("Count can't be negative");
for(;n > 0; (n >>>= 1) && (str += str)) if(n & 1) res += str;
 return res;};},{"./_defined":31,"./_to-integer":119}],114:[function(require,module,exports){var $export=require('./_export');var defined=require('./_defined');var fails=require('./_fails');var spaces=require('./_string-ws');var space='[' + spaces + ']';var non='\u200b\u0085';var ltrim=RegExp('^' + space + space + '*');var rtrim=RegExp(space + space + '*$');var exporter=function (KEY, exec, ALIAS){var exp={};var FORCE=fails(function (){  return !!spaces[KEY]() || non[KEY]() != non;
});var fn=exp[KEY]=FORCE ? exec(trim) : spaces[KEY];if(ALIAS) exp[ALIAS]=fn;
$export($export.P + $export.F * FORCE, 'String', exp);};var trim=exporter.trim=function (string, TYPE){string=String(defined(string));if(TYPE & 1) string=string.replace(ltrim, '');if(TYPE & 2) string=string.replace(rtrim, '');
 return string;};module.exports=exporter;},{"./_defined":31,"./_export":36,"./_fails":38,"./_string-ws":115}],115:[function(require,module,exports){  module.exports='\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
'\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';},{}],116:[function(require,module,exports){var ctx=require('./_ctx');var invoke=require('./_invoke');var html=require('./_html');var cel=require('./_dom-create');var global=require('./_global');var process=global.process;var setTask=global.setImmediate;var clearTask=global.clearImmediate;var MessageChannel=global.MessageChannel;var Dispatch=global.Dispatch;var counter=0;var queue={};var ONREADYSTATECHANGE='onreadystatechange';var defer, channel, port;var run=function (){var id=+this;if(queue.hasOwnProperty(id)){var fn=queue[id];
delete queue[id];
fn();
}};var listener=function (event){run.call(event.data);};if(!setTask || !clearTask){setTask=function setImmediate(fn){var args=[];var i=1;
while (arguments.length > i) args.push(arguments[i++]);
queue[++counter]=function (){  invoke(typeof fn == 'function' ? fn : Function(fn), args);};
defer(counter);
  return counter;
};
clearTask=function clearImmediate(id){delete queue[id];
};if(require('./_cof')(process) == 'process'){defer=function (id){  process.nextTick(ctx(run, id, 1));};
}else if(Dispatch && Dispatch.now){defer=function (id){  Dispatch.now(ctx(run, id, 1));};
}else if(MessageChannel){channel=new MessageChannel();
port=channel.port2;
channel.port1.onmessage=listener;
defer=ctx(port.postMessage, port, 1);
}else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){defer=function (id){  global.postMessage(id + '', '*');};
global.addEventListener('message', listener, false);
}else if(ONREADYSTATECHANGE in cel('script')){defer=function (id){  html.appendChild(cel('script'))[ONREADYSTATECHANGE]=function (){html.removeChild(this);
run.call(id);
};};
}else{defer=function (id){  setTimeout(ctx(run, id, 1), 0);};
}}
  module.exports={set: setTask,
clear: clearTask
};},{"./_cof":21,"./_ctx":28,"./_dom-create":33,"./_global":44,"./_html":47,"./_invoke":50}],117:[function(require,module,exports){var toInteger=require('./_to-integer');var max=Math.max;var min=Math.min;
  module.exports=function (index, length){index=toInteger(index);
 return index < 0 ? max(index + length, 0) : min(index, length);};},{"./_to-integer":119}],118:[function(require,module,exports){var toInteger=require('./_to-integer');var toLength=require('./_to-length');
  module.exports=function (it){if(it===undefined) return 0;var number=toInteger(it);var length=toLength(number);if(number !== length) throw RangeError('Wrong length!');
 return length;};},{"./_to-integer":119,"./_to-length":121}],119:[function(require,module,exports){var ceil=Math.ceil;var floor=Math.floor;
  module.exports=function (it){ return isNaN(it=+it) ? 0 : (it > 0 ? floor : ceil)(it);};},{}],120:[function(require,module,exports){var IObject=require('./_iobject');var defined=require('./_defined');
  module.exports=function (it){ return IObject(defined(it));};},{"./_defined":31,"./_iobject":51}],121:[function(require,module,exports){var toInteger=require('./_to-integer');var min=Math.min;
  module.exports=function (it){ return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0;};},{"./_to-integer":119}],122:[function(require,module,exports){var defined=require('./_defined');
  module.exports=function (it){ return Object(defined(it));};},{"./_defined":31}],123:[function(require,module,exports){var isObject=require('./_is-object');
  module.exports=function (it, S){if(!isObject(it)) return it;var fn, val;if(S && typeof (fn=it.toString) == 'function' && !isObject(val=fn.call(it))) return val;if(typeof (fn=it.valueOf) == 'function' && !isObject(val=fn.call(it))) return val;if(!S && typeof (fn=it.toString) == 'function' && !isObject(val=fn.call(it))) return val;
throw TypeError("Can't convert object to primitive value");};},{"./_is-object":55}],124:[function(require,module,exports){  'use strict';if(require('./_descriptors')){var LIBRARY=require('./_library');var global=require('./_global');var fails=require('./_fails');var $export=require('./_export');var $typed=require('./_typed');var $buffer=require('./_typed-buffer');var ctx=require('./_ctx');var anInstance=require('./_an-instance');var propertyDesc=require('./_property-desc');var hide=require('./_hide');var redefineAll=require('./_redefine-all');var toInteger=require('./_to-integer');var toLength=require('./_to-length');var toIndex=require('./_to-index');var toAbsoluteIndex=require('./_to-absolute-index');var toPrimitive=require('./_to-primitive');var has=require('./_has');var classof=require('./_classof');var isObject=require('./_is-object');var toObject=require('./_to-object');var isArrayIter=require('./_is-array-iter');var create=require('./_object-create');var getPrototypeOf=require('./_object-gpo');var gOPN=require('./_object-gopn').f;var getIterFn=require('./core.get-iterator-method');var uid=require('./_uid');var wks=require('./_wks');var createArrayMethod=require('./_array-methods');var createArrayIncludes=require('./_array-includes');var speciesConstructor=require('./_species-constructor');var ArrayIterators=require('./es6.array.iterator');var Iterators=require('./_iterators');var $iterDetect=require('./_iter-detect');var setSpecies=require('./_set-species');var arrayFill=require('./_array-fill');var arrayCopyWithin=require('./_array-copy-within');var $DP=require('./_object-dp');var $GOPD=require('./_object-gopd');var dP=$DP.f;var gOPD=$GOPD.f;var RangeError=global.RangeError;var TypeError=global.TypeError;var Uint8Array=global.Uint8Array;var ARRAY_BUFFER='ArrayBuffer';var SHARED_BUFFER='Shared' + ARRAY_BUFFER;var BYTES_PER_ELEMENT='BYTES_PER_ELEMENT';var PROTOTYPE='prototype';var ArrayProto=Array[PROTOTYPE];var $ArrayBuffer=$buffer.ArrayBuffer;var $DataView=$buffer.DataView;var arrayForEach=createArrayMethod(0);var arrayFilter=createArrayMethod(2);var arraySome=createArrayMethod(3);var arrayEvery=createArrayMethod(4);var arrayFind=createArrayMethod(5);var arrayFindIndex=createArrayMethod(6);var arrayIncludes=createArrayIncludes(true);var arrayIndexOf=createArrayIncludes(false);var arrayValues=ArrayIterators.values;var arrayKeys=ArrayIterators.keys;var arrayEntries=ArrayIterators.entries;var arrayLastIndexOf=ArrayProto.lastIndexOf;var arrayReduce=ArrayProto.reduce;var arrayReduceRight=ArrayProto.reduceRight;var arrayJoin=ArrayProto.join;var arraySort=ArrayProto.sort;var arraySlice=ArrayProto.slice;var arrayToString=ArrayProto.toString;var arrayToLocaleString=ArrayProto.toLocaleString;var ITERATOR=wks('iterator');var TAG=wks('toStringTag');var TYPED_CONSTRUCTOR=uid('typed_constructor');var DEF_CONSTRUCTOR=uid('def_constructor');var ALL_CONSTRUCTORS=$typed.CONSTR;var TYPED_ARRAY=$typed.TYPED;var VIEW=$typed.VIEW;var WRONG_LENGTH='Wrong length!';var $map=createArrayMethod(1, function (O, length){  return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
});var LITTLE_ENDIAN=fails(function (){  return new Uint8Array(new Uint16Array([1]).buffer)[0]===1;
});var FORCED_SET=!!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function (){new Uint8Array(1).set({});});var toOffset=function (it, BYTES){var offset=toInteger(it);if(offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
  return offset;
};var validate=function (it){if(isObject(it) && TYPED_ARRAY in it) return it;
throw TypeError(it + ' is not a typed array!');
};var allocate=function (C, length){if(!(isObject(C) && TYPED_CONSTRUCTOR in C)){  throw TypeError('It is not a typed array constructor!');
} return new C(length);
};var speciesFromList=function (O, list){  return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
};var fromList=function (C, list){var index=0;var length=list.length;var result=allocate(C, length);
while (length > index) result[index]=list[index++];
  return result;
};var addGetter=function (it, key, internal){dP(it, key, { get: function (){ return this._d[internal];}});};var $from=function from(source ){var O=toObject(source);var aLen=arguments.length;var mapfn=aLen > 1 ? arguments[1] : undefined;var mapping=mapfn !== undefined;var iterFn=getIterFn(O);var i, length, values, result, step, iterator;if(iterFn != undefined && !isArrayIter(iterFn)){  for(iterator=iterFn.call(O), values=[], i=0; !(step=iterator.next()).done; i++){values.push(step.value);
} O=values;
}
if(mapping && aLen > 2) mapfn=ctx(mapfn, arguments[2], 2);
for(i=0, length=toLength(O.length), result=allocate(this, length); length > i; i++){  result[i]=mapping ? mapfn(O[i], i) : O[i];
}
  return result;
};var $of=function of(){var index=0;var length=arguments.length;var result=allocate(this, length);
while (length > index) result[index]=arguments[index++];
  return result;
};var TO_LOCALE_BUG=!!Uint8Array && fails(function (){ arrayToLocaleString.call(new Uint8Array(1));});var $toLocaleString=function toLocaleString(){  return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
};var proto={copyWithin: function copyWithin(target, start ){ return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
},
every: function every(callbackfn ){ return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
},
fill: function fill(value ){ return arrayFill.apply(validate(this), arguments);
},
filter: function filter(callbackfn ){ return speciesFromList(this, arrayFilter(validate(this), callbackfn,
arguments.length > 1 ? arguments[1] : undefined));
},
find: function find(predicate ){ return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
},
findIndex: function findIndex(predicate ){ return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
},
forEach: function forEach(callbackfn ){  arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
},
indexOf: function indexOf(searchElement ){ return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
},
includes: function includes(searchElement ){ return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
},
join: function join(separator){ return arrayJoin.apply(validate(this), arguments);
},
lastIndexOf: function lastIndexOf(searchElement ){ return arrayLastIndexOf.apply(validate(this), arguments);
},
map: function map(mapfn ){ return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
},
reduce: function reduce(callbackfn ){ return arrayReduce.apply(validate(this), arguments);
},
reduceRight: function reduceRight(callbackfn ){ return arrayReduceRight.apply(validate(this), arguments);
},
reverse: function reverse(){var that=this;var length=validate(that).length;var middle=Math.floor(length / 2);var index=0;var value;
  while (index < middle){value=that[index];
that[index++]=that[--length];
that[length]=value;
} return that;
},
some: function some(callbackfn ){ return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
},
sort: function sort(comparefn){ return arraySort.call(validate(this), comparefn);
},
subarray: function subarray(begin, end){var O=validate(this);var length=O.length;var $begin=toAbsoluteIndex(begin, length);
 return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
O.buffer,
O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
toLength((end===undefined ? length : toAbsoluteIndex(end, length)) - $begin)
);
}};var $slice=function slice(start, end){  return speciesFromList(this, arraySlice.call(validate(this), start, end));
};var $set=function set(arrayLike ){validate(this);var offset=toOffset(arguments[1], 1);var length=this.length;var src=toObject(arrayLike);var len=toLength(src.length);var index=0;if(len + offset > length) throw RangeError(WRONG_LENGTH);
while (index < len) this[offset + index]=src[index++];
};var $iterators={entries: function entries(){ return arrayEntries.call(validate(this));
},
keys: function keys(){ return arrayKeys.call(validate(this));
},
values: function values(){ return arrayValues.call(validate(this));
}};var isTAIndex=function (target, key){  return isObject(target)
  && target[TYPED_ARRAY]
  && typeof key != 'symbol'
  && key in target
  && String(+key) == String(key);
};var $getDesc=function getOwnPropertyDescriptor(target, key){  return isTAIndex(target, key=toPrimitive(key, true))
  ? propertyDesc(2, target[key])
  : gOPD(target, key);
};var $setDesc=function defineProperty(target, key, desc){if(isTAIndex(target, key=toPrimitive(key, true))
  && isObject(desc)
  && has(desc, 'value')
  && !has(desc, 'get')
  && !has(desc, 'set')
  && !desc.configurable
  && (!has(desc, 'writable') || desc.writable)
  && (!has(desc, 'enumerable') || desc.enumerable)
){  target[key]=desc.value;
 return target;
} return dP(target, key, desc);
};if(!ALL_CONSTRUCTORS){$GOPD.f=$getDesc;
$DP.f=$setDesc;
}
$export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {getOwnPropertyDescriptor: $getDesc,
defineProperty: $setDesc
});if(fails(function (){ arrayToString.call({});})){arrayToString=arrayToLocaleString=function toString(){ return arrayJoin.call(this);};
}
var $TypedArrayPrototype$=redefineAll({}, proto);
redefineAll($TypedArrayPrototype$, $iterators);
hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
redefineAll($TypedArrayPrototype$, {slice: $slice,
set: $set,
constructor: function (){},
toString: arrayToString,
toLocaleString: $toLocaleString
});
addGetter($TypedArrayPrototype$, 'buffer', 'b');
addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
addGetter($TypedArrayPrototype$, 'byteLength', 'l');
addGetter($TypedArrayPrototype$, 'length', 'e');
dP($TypedArrayPrototype$, TAG, {get: function (){ return this[TYPED_ARRAY];}});
module.exports=function (KEY, BYTES, wrapper, CLAMPED){CLAMPED=!!CLAMPED;var NAME=KEY + (CLAMPED ? 'Clamped' : '') + 'Array';var GETTER='get' + KEY;var SETTER='set' + KEY;var TypedArray=global[NAME];var Base=TypedArray || {};var TAC=TypedArray && getPrototypeOf(TypedArray);var FORCED=!TypedArray || !$typed.ABV;var O={};var TypedArrayPrototype=TypedArray && TypedArray[PROTOTYPE];var getter=function (that, index){var data=that._d;
 return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);};var setter=function (that, index, value){var data=that._d;if(CLAMPED) value=(value=Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
  data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);};var addElement=function (that, index){  dP(that, index, {get: function (){ return getter(this, index);},
set: function (value){ return setter(this, index, value);},
enumerable: true
});};if(FORCED){  TypedArray=wrapper(function (that, data, $offset, $length){anInstance(that, TypedArray, NAME, '_d');var index=0;var offset=0;var buffer, byteLength, length, klass;if(!isObject(data)){  length=toIndex(data);
byteLength=length * BYTES;
buffer=new $ArrayBuffer(byteLength);}else if(data instanceof $ArrayBuffer || (klass=classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){  buffer=data;
offset=toOffset($offset, BYTES);var $len=data.byteLength;if($length===undefined){if($len % BYTES) throw RangeError(WRONG_LENGTH);
  byteLength=$len - offset;if(byteLength < 0) throw RangeError(WRONG_LENGTH);
}else{byteLength=toLength($length) * BYTES;if(byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
}
length=byteLength / BYTES;}else if(TYPED_ARRAY in data){ return fromList(TypedArray, data);}else{ return $from.call(TypedArray, data);}
hide(that, '_d', {  b: buffer,
o: offset,
l: byteLength,
e: length,
v: new $DataView(buffer)
});
while (index < length) addElement(that, index++);
});
  TypedArrayPrototype=TypedArray[PROTOTYPE]=create($TypedArrayPrototype$);
  hide(TypedArrayPrototype, 'constructor', TypedArray);
}else if(!fails(function (){  TypedArray(1);
}) || !fails(function (){  new TypedArray(-1);
}) || !$iterDetect(function (iter){  new TypedArray();
  new TypedArray(null);
  new TypedArray(1.5);
  new TypedArray(iter);
}, true)){  TypedArray=wrapper(function (that, data, $offset, $length){anInstance(that, TypedArray, NAME);var klass;if(!isObject(data)) return new Base(toIndex(data));if(data instanceof $ArrayBuffer || (klass=classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){ return $length !== undefined
  ? new Base(data, toOffset($offset, BYTES), $length)
  : $offset !== undefined
? new Base(data, toOffset($offset, BYTES))
: new Base(data);}
if(TYPED_ARRAY in data) return fromList(TypedArray, data);
   return $from.call(TypedArray, data);
});
  arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key){if(!(key in TypedArray)) hide(TypedArray, key, Base[key]);
});
  TypedArray[PROTOTYPE]=TypedArrayPrototype;if(!LIBRARY) TypedArrayPrototype.constructor=TypedArray;
}
var $nativeIterator=TypedArrayPrototype[ITERATOR];var CORRECT_ITER_NAME=!!$nativeIterator
  && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);var $iterator=$iterators.values;
hide(TypedArray, TYPED_CONSTRUCTOR, true);
hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
hide(TypedArrayPrototype, VIEW, true);
hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);if(CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)){  dP(TypedArrayPrototype, TAG, {get: function (){ return NAME;}});}
O[NAME]=TypedArray;$export($export.G + $export.W + $export.F * (TypedArray != Base), O);$export($export.S, NAME, {  BYTES_PER_ELEMENT: BYTES
});$export($export.S + $export.F * fails(function (){ Base.of.call(TypedArray, 1);}), NAME, {  from: $from,
  of: $of
});if(!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);$export($export.P, NAME, proto);setSpecies(NAME);$export($export.P + $export.F * FORCED_SET, NAME, { set: $set });$export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);if(!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString=arrayToString;$export($export.P + $export.F * fails(function (){  new TypedArray(1).slice();
}), NAME, { slice: $slice });$export($export.P + $export.F * (fails(function (){ return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
}) || !fails(function (){  TypedArrayPrototype.toLocaleString.call([1, 2]);
})), NAME, { toLocaleString: $toLocaleString });Iterators[NAME]=CORRECT_ITER_NAME ? $nativeIterator : $iterator;if(!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
};}else module.exports=function (){};},{"./_an-instance":9,"./_array-copy-within":11,"./_array-fill":12,"./_array-includes":14,"./_array-methods":15,"./_classof":20,"./_ctx":28,"./_descriptors":32,"./_export":36,"./_fails":38,"./_global":44,"./_has":45,"./_hide":46,"./_is-array-iter":52,"./_is-object":55,"./_iter-detect":60,"./_iterators":62,"./_library":63,"./_object-create":74,"./_object-dp":75,"./_object-gopd":78,"./_object-gopn":80,"./_object-gpo":82,"./_property-desc":93,"./_redefine-all":94,"./_set-species":103,"./_species-constructor":107,"./_to-absolute-index":117,"./_to-index":118,"./_to-integer":119,"./_to-length":121,"./_to-object":122,"./_to-primitive":123,"./_typed":126,"./_typed-buffer":125,"./_uid":127,"./_wks":132,"./core.get-iterator-method":133,"./es6.array.iterator":145}],125:[function(require,module,exports){  'use strict';var global=require('./_global');var DESCRIPTORS=require('./_descriptors');var LIBRARY=require('./_library');var $typed=require('./_typed');var hide=require('./_hide');var redefineAll=require('./_redefine-all');var fails=require('./_fails');var anInstance=require('./_an-instance');var toInteger=require('./_to-integer');var toLength=require('./_to-length');var toIndex=require('./_to-index');var gOPN=require('./_object-gopn').f;var dP=require('./_object-dp').f;var arrayFill=require('./_array-fill');var setToStringTag=require('./_set-to-string-tag');var ARRAY_BUFFER='ArrayBuffer';var DATA_VIEW='DataView';var PROTOTYPE='prototype';var WRONG_LENGTH='Wrong length!';var WRONG_INDEX='Wrong index!';var $ArrayBuffer=global[ARRAY_BUFFER];var $DataView=global[DATA_VIEW];var Math=global.Math;var RangeError=global.RangeError;var Infinity=global.Infinity;var BaseBuffer=$ArrayBuffer;var abs=Math.abs;var pow=Math.pow;var floor=Math.floor;var log=Math.log;var LN2=Math.LN2;var BUFFER='buffer';var BYTE_LENGTH='byteLength';var BYTE_OFFSET='byteOffset';var $BUFFER=DESCRIPTORS ? '_b' : BUFFER;var $LENGTH=DESCRIPTORS ? '_l' : BYTE_LENGTH;var $OFFSET=DESCRIPTORS ? '_o' : BYTE_OFFSET;
  function packIEEE754(value, mLen, nBytes){var buffer=new Array(nBytes);var eLen=nBytes * 8 - mLen - 1;var eMax=(1 << eLen) - 1;var eBias=eMax >> 1;var rt=mLen===23 ? pow(2, -24) - pow(2, -77) : 0;var i=0;var s=value < 0 || value===0 && 1 / value < 0 ? 1 : 0;var e, m, c;
value=abs(value);if(value != value || value===Infinity){m=value != value ? 1 : 0;
e=eMax;
}else{e=floor(log(value) / LN2);if(value * (c=pow(2, -e)) < 1){  e--;
  c *= 2;
}
if(e + eBias >= 1){  value += rt / c;
}else{  value += rt * pow(2, 1 - eBias);
}
if(value * c >= 2){  e++;
  c /= 2;
}
if(e + eBias >= eMax){  m=0;
  e=eMax;
}else if(e + eBias >= 1){  m=(value * c - 1) * pow(2, mLen);
  e=e + eBias;
}else{  m=value * pow(2, eBias - 1) * pow(2, mLen);
  e=0;
}}
for(; mLen >= 8; buffer[i++]=m & 255, m /= 256, mLen -= 8);
e=e << mLen | m;
eLen += mLen;
for(; eLen > 0; buffer[i++]=e & 255, e /= 256, eLen -= 8);
buffer[--i] |= s * 128;
 return buffer;}
  function unpackIEEE754(buffer, mLen, nBytes){var eLen=nBytes * 8 - mLen - 1;var eMax=(1 << eLen) - 1;var eBias=eMax >> 1;var nBits=eLen - 7;var i=nBytes - 1;var s=buffer[i--];var e=s & 127;var m;
s >>= 7;
for(; nBits > 0; e=e * 256 + buffer[i], i--, nBits -= 8);
m=e & (1 << -nBits) - 1;
e >>= -nBits;
nBits += mLen;
for(; nBits > 0; m=m * 256 + buffer[i], i--, nBits -= 8);if(e===0){e=1 - eBias;
}else if(e===eMax){  return m ? NaN : s ? -Infinity : Infinity;
}else{m=m + pow(2, mLen);
e=e - eBias;
} return (s ? -1 : 1) * m * pow(2, e - mLen);}
  function unpackI32(bytes){ return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];}
  function packI8(it){ return [it & 0xff];}
  function packI16(it){ return [it & 0xff, it >> 8 & 0xff];}
  function packI32(it){ return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];}
  function packF64(it){ return packIEEE754(it, 52, 8);}
  function packF32(it){ return packIEEE754(it, 23, 4);}
  function addGetter(C, key, internal){dP(C[PROTOTYPE], key, { get: function (){ return this[internal];}});}
  function get(view, bytes, index, isLittleEndian){var numIndex=+index;var intIndex=toIndex(numIndex);if(intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);var store=view[$BUFFER]._b;var start=intIndex + view[$OFFSET];var pack=store.slice(start, start + bytes);
 return isLittleEndian ? pack : pack.reverse();}
  function set(view, bytes, index, conversion, value, isLittleEndian){var numIndex=+index;var intIndex=toIndex(numIndex);if(intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);var store=view[$BUFFER]._b;var start=intIndex + view[$OFFSET];var pack=conversion(+value);
for(var i=0;i<bytes; i++) store[start + i]=pack[isLittleEndian ? i : bytes - i - 1];}
if(!$typed.ABV){$ArrayBuffer=function ArrayBuffer(length){anInstance(this, $ArrayBuffer, ARRAY_BUFFER);var byteLength=toIndex(length);
this._b=arrayFill.call(new Array(byteLength), 0);
this[$LENGTH]=byteLength;
};  $DataView=function DataView(buffer, byteOffset, byteLength){anInstance(this, $DataView, DATA_VIEW);
anInstance(buffer, $ArrayBuffer, DATA_VIEW);var bufferLength=buffer[$LENGTH];var offset=toInteger(byteOffset);if(offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
byteLength=byteLength===undefined ? bufferLength - offset : toLength(byteLength);if(offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
this[$BUFFER]=buffer;
this[$OFFSET]=offset;
this[$LENGTH]=byteLength;
};if(DESCRIPTORS){addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
addGetter($DataView, BUFFER, '_b');
addGetter($DataView, BYTE_LENGTH, '_l');
addGetter($DataView, BYTE_OFFSET, '_o');
}
redefineAll($DataView[PROTOTYPE], {getInt8: function getInt8(byteOffset){ return get(this, 1, byteOffset)[0] << 24 >> 24;
},
getUint8: function getUint8(byteOffset){ return get(this, 1, byteOffset)[0];
},
getInt16: function getInt16(byteOffset ){var bytes=get(this, 2, byteOffset, arguments[1]);
 return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
},
getUint16: function getUint16(byteOffset ){var bytes=get(this, 2, byteOffset, arguments[1]);
 return bytes[1] << 8 | bytes[0];
},
getInt32: function getInt32(byteOffset ){ return unpackI32(get(this, 4, byteOffset, arguments[1]));
},
getUint32: function getUint32(byteOffset ){ return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
},
getFloat32: function getFloat32(byteOffset ){ return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
},
getFloat64: function getFloat64(byteOffset ){ return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
},
setInt8: function setInt8(byteOffset, value){  set(this, 1, byteOffset, packI8, value);
},
setUint8: function setUint8(byteOffset, value){  set(this, 1, byteOffset, packI8, value);
},
setInt16: function setInt16(byteOffset, value ){  set(this, 2, byteOffset, packI16, value, arguments[2]);
},
setUint16: function setUint16(byteOffset, value ){  set(this, 2, byteOffset, packI16, value, arguments[2]);
},
setInt32: function setInt32(byteOffset, value ){  set(this, 4, byteOffset, packI32, value, arguments[2]);
},
setUint32: function setUint32(byteOffset, value ){  set(this, 4, byteOffset, packI32, value, arguments[2]);
},
setFloat32: function setFloat32(byteOffset, value ){  set(this, 4, byteOffset, packF32, value, arguments[2]);
},
setFloat64: function setFloat64(byteOffset, value ){  set(this, 8, byteOffset, packF64, value, arguments[2]);
}});}else{if(!fails(function (){$ArrayBuffer(1);
}) || !fails(function (){new $ArrayBuffer(-1);
}) || fails(function (){new $ArrayBuffer();
new $ArrayBuffer(1.5);
new $ArrayBuffer(NaN);
  return $ArrayBuffer.name != ARRAY_BUFFER;
})){$ArrayBuffer=function ArrayBuffer(length){  anInstance(this, $ArrayBuffer);
 return new BaseBuffer(toIndex(length));};var ArrayBufferProto=$ArrayBuffer[PROTOTYPE]=BaseBuffer[PROTOTYPE];
for(var keys=gOPN(BaseBuffer), j=0, key; keys.length > j;){if(!((key=keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
}
if(!LIBRARY) ArrayBufferProto.constructor=$ArrayBuffer;
}
var view=new $DataView(new $ArrayBuffer(2));var $setInt8=$DataView[PROTOTYPE].setInt8;
view.setInt8(0, 2147483648);
view.setInt8(1, 2147483649);if(view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {setInt8: function setInt8(byteOffset, value){  $setInt8.call(this, byteOffset, value << 24 >> 24);
},
setUint8: function setUint8(byteOffset, value){  $setInt8.call(this, byteOffset, value << 24 >> 24);
}}, true);}
  setToStringTag($ArrayBuffer, ARRAY_BUFFER);
  setToStringTag($DataView, DATA_VIEW);
  hide($DataView[PROTOTYPE], $typed.VIEW, true);
  exports[ARRAY_BUFFER]=$ArrayBuffer;
  exports[DATA_VIEW]=$DataView;},{"./_an-instance":9,"./_array-fill":12,"./_descriptors":32,"./_fails":38,"./_global":44,"./_hide":46,"./_library":63,"./_object-dp":75,"./_object-gopn":80,"./_redefine-all":94,"./_set-to-string-tag":104,"./_to-index":118,"./_to-integer":119,"./_to-length":121,"./_typed":126}],126:[function(require,module,exports){var global=require('./_global');var hide=require('./_hide');var uid=require('./_uid');var TYPED=uid('typed_array');var VIEW=uid('view');var ABV=!!(global.ArrayBuffer && global.DataView);var CONSTR=ABV;var i=0;var l=9;var Typed;var TypedArrayConstructors=(
'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
  ).split(',');while (i < l){if(Typed=global[TypedArrayConstructors[i++]]){hide(Typed.prototype, TYPED, true);
hide(Typed.prototype, VIEW, true);
}else CONSTR=false;}
  module.exports={ABV: ABV,
CONSTR: CONSTR,
TYPED: TYPED,
VIEW: VIEW
};},{"./_global":44,"./_hide":46,"./_uid":127}],127:[function(require,module,exports){var id=0;var px=Math.random();
  module.exports=function (key){ return 'Symbol('.concat(key===undefined ? '' : key, ')_', (++id + px).toString(36));};},{}],128:[function(require,module,exports){var global=require('./_global');var navigator=global.navigator;module.exports=navigator && navigator.userAgent || '';},{"./_global":44}],129:[function(require,module,exports){var isObject=require('./_is-object');
  module.exports=function (it, TYPE){if(!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
 return it;};},{"./_is-object":55}],130:[function(require,module,exports){var global=require('./_global');var core=require('./_core');var LIBRARY=require('./_library');var wksExt=require('./_wks-ext');var defineProperty=require('./_object-dp').f;
  module.exports=function (name){var $Symbol=core.Symbol || (core.Symbol=LIBRARY ? {} : global.Symbol || {});if(name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });};},{"./_core":26,"./_global":44,"./_library":63,"./_object-dp":75,"./_wks-ext":131}],131:[function(require,module,exports){  exports.f=require('./_wks');},{"./_wks":132}],132:[function(require,module,exports){var store=require('./_shared')('wks');var uid=require('./_uid');var Symbol=require('./_global').Symbol;var USE_SYMBOL=typeof Symbol == 'function';var $exports=module.exports=function (name){ return store[name] || (store[name] =
USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));};$exports.store=store;},{"./_global":44,"./_shared":106,"./_uid":127}],133:[function(require,module,exports){var classof=require('./_classof');var ITERATOR=require('./_wks')('iterator');var Iterators=require('./_iterators');
  module.exports=require('./_core').getIteratorMethod=function (it){if(it != undefined) return it[ITERATOR]
|| it['@@iterator']
|| Iterators[classof(it)];};},{"./_classof":20,"./_core":26,"./_iterators":62,"./_wks":132}],134:[function(require,module,exports){var $export=require('./_export');var $re=require('./_replacer')(/[\\^$*+?.()|[\]{}]/g, '\\$&');$export($export.S, 'RegExp', { escape: function escape(it){ return $re(it);}});},{"./_export":36,"./_replacer":98}],135:[function(require,module,exports){var $export=require('./_export');$export($export.P, 'Array', { copyWithin: require('./_array-copy-within') });require('./_add-to-unscopables')('copyWithin');},{"./_add-to-unscopables":7,"./_array-copy-within":11,"./_export":36}],136:[function(require,module,exports){  'use strict';var $export=require('./_export');var $every=require('./_array-methods')(4);$export($export.P + $export.F * !require('./_strict-method')([].every, true), 'Array', {every: function every(callbackfn ){  return $every(this, callbackfn, arguments[1]);
}});},{"./_array-methods":15,"./_export":36,"./_strict-method":108}],137:[function(require,module,exports){var $export=require('./_export');$export($export.P, 'Array', { fill: require('./_array-fill') });require('./_add-to-unscopables')('fill');},{"./_add-to-unscopables":7,"./_array-fill":12,"./_export":36}],138:[function(require,module,exports){  'use strict';var $export=require('./_export');var $filter=require('./_array-methods')(2);$export($export.P + $export.F * !require('./_strict-method')([].filter, true), 'Array', {filter: function filter(callbackfn ){  return $filter(this, callbackfn, arguments[1]);
}});},{"./_array-methods":15,"./_export":36,"./_strict-method":108}],139:[function(require,module,exports){  'use strict';var $export=require('./_export');var $find=require('./_array-methods')(6);var KEY='findIndex';var forced=true;if(KEY in []) Array(1)[KEY](function (){forced=false;});
  $export($export.P + $export.F * forced, 'Array', {findIndex: function findIndex(callbackfn ){  return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
}});
require('./_add-to-unscopables')(KEY);},{"./_add-to-unscopables":7,"./_array-methods":15,"./_export":36}],140:[function(require,module,exports){  'use strict';var $export=require('./_export');var $find=require('./_array-methods')(5);var KEY='find';var forced=true;if(KEY in []) Array(1)[KEY](function (){forced=false;});
  $export($export.P + $export.F * forced, 'Array', {find: function find(callbackfn ){  return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
}});
require('./_add-to-unscopables')(KEY);},{"./_add-to-unscopables":7,"./_array-methods":15,"./_export":36}],141:[function(require,module,exports){  'use strict';var $export=require('./_export');var $forEach=require('./_array-methods')(0);var STRICT=require('./_strict-method')([].forEach, true);$export($export.P + $export.F * !STRICT, 'Array', {forEach: function forEach(callbackfn ){  return $forEach(this, callbackfn, arguments[1]);
}});},{"./_array-methods":15,"./_export":36,"./_strict-method":108}],142:[function(require,module,exports){  'use strict';var ctx=require('./_ctx');var $export=require('./_export');var toObject=require('./_to-object');var call=require('./_iter-call');var isArrayIter=require('./_is-array-iter');var toLength=require('./_to-length');var createProperty=require('./_create-property');var getIterFn=require('./core.get-iterator-method');$export($export.S + $export.F * !require('./_iter-detect')(function (iter){ Array.from(iter);}), 'Array', {from: function from(arrayLike ){var O=toObject(arrayLike);var C=typeof this == 'function' ? this : Array;var aLen=arguments.length;var mapfn=aLen > 1 ? arguments[1] : undefined;var mapping=mapfn !== undefined;var index=0;var iterFn=getIterFn(O);var length, result, step, iterator;if(mapping) mapfn=ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){  for(iterator=iterFn.call(O), result=new C(); !(step=iterator.next()).done; index++){createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
}}else{  length=toLength(O.length);
  for(result=new C(length); length > index; index++){createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
}}
result.length=index;
  return result;
}});},{"./_create-property":27,"./_ctx":28,"./_export":36,"./_is-array-iter":52,"./_iter-call":57,"./_iter-detect":60,"./_to-length":121,"./_to-object":122,"./core.get-iterator-method":133}],143:[function(require,module,exports){  'use strict';var $export=require('./_export');var $indexOf=require('./_array-includes')(false);var $native=[].indexOf;var NEGATIVE_ZERO=!!$native && 1 / [1].indexOf(1, -0) < 0;$export($export.P + $export.F * (NEGATIVE_ZERO || !require('./_strict-method')($native)), 'Array', {indexOf: function indexOf(searchElement ){  return NEGATIVE_ZERO
  ? $native.apply(this, arguments) || 0
  : $indexOf(this, searchElement, arguments[1]);
}});},{"./_array-includes":14,"./_export":36,"./_strict-method":108}],144:[function(require,module,exports){var $export=require('./_export');$export($export.S, 'Array', { isArray: require('./_is-array') });},{"./_export":36,"./_is-array":53}],145:[function(require,module,exports){  'use strict';var addToUnscopables=require('./_add-to-unscopables');var step=require('./_iter-step');var Iterators=require('./_iterators');var toIObject=require('./_to-iobject');
  module.exports=require('./_iter-define')(Array, 'Array', function (iterated, kind){this._t=toIObject(iterated);
this._i=0;
this._k=kind;}, function (){var O=this._t;var kind=this._k;var index=this._i++;if(!O || index >= O.length){this._t=undefined;
  return step(1);
}
if(kind == 'keys') return step(0, index);if(kind == 'values') return step(0, O[index]);
 return step(0, [index, O[index]]);}, 'values');
  Iterators.Arguments=Iterators.Array;addToUnscopables('keys');
  addToUnscopables('values');
  addToUnscopables('entries');},{"./_add-to-unscopables":7,"./_iter-define":59,"./_iter-step":61,"./_iterators":62,"./_to-iobject":120}],146:[function(require,module,exports){  'use strict';var $export=require('./_export');var toIObject=require('./_to-iobject');var arrayJoin=[].join;
  $export($export.P + $export.F * (require('./_iobject') != Object || !require('./_strict-method')(arrayJoin)), 'Array', {join: function join(separator){  return arrayJoin.call(toIObject(this), separator===undefined ? ',' : separator);
}});},{"./_export":36,"./_iobject":51,"./_strict-method":108,"./_to-iobject":120}],147:[function(require,module,exports){  'use strict';var $export=require('./_export');var toIObject=require('./_to-iobject');var toInteger=require('./_to-integer');var toLength=require('./_to-length');var $native=[].lastIndexOf;var NEGATIVE_ZERO=!!$native && 1 / [1].lastIndexOf(1, -0) < 0;$export($export.P + $export.F * (NEGATIVE_ZERO || !require('./_strict-method')($native)), 'Array', {lastIndexOf: function lastIndexOf(searchElement ){if(NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;var O=toIObject(this);var length=toLength(O.length);var index=length - 1;if(arguments.length > 1) index=Math.min(index, toInteger(arguments[1]));if(index < 0) index=length + index;
for(;index >= 0; index--) if(index in O) if(O[index]===searchElement) return index || 0;
  return -1;
}});},{"./_export":36,"./_strict-method":108,"./_to-integer":119,"./_to-iobject":120,"./_to-length":121}],148:[function(require,module,exports){  'use strict';var $export=require('./_export');var $map=require('./_array-methods')(1);$export($export.P + $export.F * !require('./_strict-method')([].map, true), 'Array', {map: function map(callbackfn ){  return $map(this, callbackfn, arguments[1]);
}});},{"./_array-methods":15,"./_export":36,"./_strict-method":108}],149:[function(require,module,exports){  'use strict';var $export=require('./_export');var createProperty=require('./_create-property');
  $export($export.S + $export.F * require('./_fails')(function (){function F(){}
 return !(Array.of.call(F) instanceof F);}), 'Array', {of: function of(){var index=0;var aLen=arguments.length;var result=new (typeof this == 'function' ? this : Array)(aLen);
while (aLen > index) createProperty(result, index, arguments[index++]);
result.length=aLen;
  return result;
}});},{"./_create-property":27,"./_export":36,"./_fails":38}],150:[function(require,module,exports){  'use strict';var $export=require('./_export');var $reduce=require('./_array-reduce');$export($export.P + $export.F * !require('./_strict-method')([].reduceRight, true), 'Array', {reduceRight: function reduceRight(callbackfn ){  return $reduce(this, callbackfn, arguments.length, arguments[1], true);
}});},{"./_array-reduce":16,"./_export":36,"./_strict-method":108}],151:[function(require,module,exports){  'use strict';var $export=require('./_export');var $reduce=require('./_array-reduce');$export($export.P + $export.F * !require('./_strict-method')([].reduce, true), 'Array', {reduce: function reduce(callbackfn ){  return $reduce(this, callbackfn, arguments.length, arguments[1], false);
}});},{"./_array-reduce":16,"./_export":36,"./_strict-method":108}],152:[function(require,module,exports){  'use strict';var $export=require('./_export');var html=require('./_html');var cof=require('./_cof');var toAbsoluteIndex=require('./_to-absolute-index');var toLength=require('./_to-length');var arraySlice=[].slice;
  $export($export.P + $export.F * require('./_fails')(function (){if(html) arraySlice.call(html);}), 'Array', {slice: function slice(begin, end){var len=toLength(this.length);var klass=cof(this);
end=end===undefined ? len : end;if(klass == 'Array') return arraySlice.call(this, begin, end);var start=toAbsoluteIndex(begin, len);var upTo=toAbsoluteIndex(end, len);var size=toLength(upTo - start);var cloned=new Array(size);var i=0;
for(; i < size; i++) cloned[i]=klass == 'String'
  ? this.charAt(start + i)
  : this[start + i];
  return cloned;
}});},{"./_cof":21,"./_export":36,"./_fails":38,"./_html":47,"./_to-absolute-index":117,"./_to-length":121}],153:[function(require,module,exports){  'use strict';var $export=require('./_export');var $some=require('./_array-methods')(3);$export($export.P + $export.F * !require('./_strict-method')([].some, true), 'Array', {some: function some(callbackfn ){  return $some(this, callbackfn, arguments[1]);
}});},{"./_array-methods":15,"./_export":36,"./_strict-method":108}],154:[function(require,module,exports){  'use strict';var $export=require('./_export');var aFunction=require('./_a-function');var toObject=require('./_to-object');var fails=require('./_fails');var $sort=[].sort;var test=[1, 2, 3];$export($export.P + $export.F * (fails(function (){test.sort(undefined);}) || !fails(function (){test.sort(null);}) || !require('./_strict-method')($sort)), 'Array', {sort: function sort(comparefn){  return comparefn===undefined
  ? $sort.call(toObject(this))
  : $sort.call(toObject(this), aFunction(comparefn));
}});},{"./_a-function":5,"./_export":36,"./_fails":38,"./_strict-method":108,"./_to-object":122}],155:[function(require,module,exports){require('./_set-species')('Array');},{"./_set-species":103}],156:[function(require,module,exports){var $export=require('./_export');$export($export.S, 'Date', { now: function (){ return new Date().getTime();}});},{"./_export":36}],157:[function(require,module,exports){var $export=require('./_export');var toISOString=require('./_date-to-iso-string');
  $export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {toISOString: toISOString
});},{"./_date-to-iso-string":29,"./_export":36}],158:[function(require,module,exports){  'use strict';var $export=require('./_export');var toObject=require('./_to-object');var toPrimitive=require('./_to-primitive');$export($export.P + $export.F * require('./_fails')(function (){ return new Date(NaN).toJSON() !== null
|| Date.prototype.toJSON.call({ toISOString: function (){ return 1;}}) !== 1;}), 'Date', {toJSON: function toJSON(key){var O=toObject(this);var pv=toPrimitive(O);
  return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
}});},{"./_export":36,"./_fails":38,"./_to-object":122,"./_to-primitive":123}],159:[function(require,module,exports){var TO_PRIMITIVE=require('./_wks')('toPrimitive');var proto=Date.prototype;if(!(TO_PRIMITIVE in proto)) require('./_hide')(proto, TO_PRIMITIVE, require('./_date-to-primitive'));},{"./_date-to-primitive":30,"./_hide":46,"./_wks":132}],160:[function(require,module,exports){var DateProto=Date.prototype;var INVALID_DATE='Invalid Date';var TO_STRING='toString';var $toString=DateProto[TO_STRING];var getTime=DateProto.getTime;if(new Date(NaN) + '' != INVALID_DATE){  require('./_redefine')(DateProto, TO_STRING, function toString(){var value=getTime.call(this);
  return value===value ? $toString.call(this) : INVALID_DATE;
});}},{"./_redefine":95}],161:[function(require,module,exports){var $export=require('./_export');$export($export.P, 'Function', { bind: require('./_bind') });},{"./_bind":19,"./_export":36}],162:[function(require,module,exports){  'use strict';var isObject=require('./_is-object');var getPrototypeOf=require('./_object-gpo');var HAS_INSTANCE=require('./_wks')('hasInstance');var FunctionProto=Function.prototype;if(!(HAS_INSTANCE in FunctionProto)) require('./_object-dp').f(FunctionProto, HAS_INSTANCE, { value: function (O){if(typeof this != 'function' || !isObject(O)) return false;if(!isObject(this.prototype)) return O instanceof this;
while (O=getPrototypeOf(O)) if(this.prototype===O) return true;
 return false;}});},{"./_is-object":55,"./_object-dp":75,"./_object-gpo":82,"./_wks":132}],163:[function(require,module,exports){var dP=require('./_object-dp').f;var FProto=Function.prototype;var nameRE=/^\s*function ([^ (]*)/;var NAME='name';
  NAME in FProto || require('./_descriptors') && dP(FProto, NAME, {configurable: true,
get: function (){try{ return ('' + this).match(nameRE)[1];
}catch(e){ return '';
}}
});},{"./_descriptors":32,"./_object-dp":75}],164:[function(require,module,exports){  'use strict';var strong=require('./_collection-strong');var validate=require('./_validate-collection');var MAP='Map';
  module.exports=require('./_collection')(MAP, function (get){ return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined);};}, {get: function get(key){var entry=strong.getEntry(validate(this, MAP), key);
  return entry && entry.v;
},
set: function set(key, value){  return strong.def(validate(this, MAP), key===0 ? 0 : key, value);
}}, strong, true);},{"./_collection":25,"./_collection-strong":22,"./_validate-collection":129}],165:[function(require,module,exports){var $export=require('./_export');var log1p=require('./_math-log1p');var sqrt=Math.sqrt;var $acosh=Math.acosh;$export($export.S + $export.F * !($acosh
&& Math.floor($acosh(Number.MAX_VALUE)) == 710
&& $acosh(Infinity) == Infinity
  ), 'Math', {acosh: function acosh(x){  return (x=+x) < 1 ? NaN : x > 94906265.62425156
  ? Math.log(x) + Math.LN2
  : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
}});},{"./_export":36,"./_math-log1p":66}],166:[function(require,module,exports){var $export=require('./_export');var $asinh=Math.asinh;function asinh(x){ return !isFinite(x=+x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));}
  $export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });},{"./_export":36}],167:[function(require,module,exports){var $export=require('./_export');var $atanh=Math.atanh;
  $export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {atanh: function atanh(x){  return (x=+x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
}});},{"./_export":36}],168:[function(require,module,exports){var $export=require('./_export');var sign=require('./_math-sign');$export($export.S, 'Math', {cbrt: function cbrt(x){  return sign(x=+x) * Math.pow(Math.abs(x), 1 / 3);
}});},{"./_export":36,"./_math-sign":68}],169:[function(require,module,exports){var $export=require('./_export');$export($export.S, 'Math', {clz32: function clz32(x){  return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
}});},{"./_export":36}],170:[function(require,module,exports){var $export=require('./_export');var exp=Math.exp;$export($export.S, 'Math', {cosh: function cosh(x){  return (exp(x=+x) + exp(-x)) / 2;
}});},{"./_export":36}],171:[function(require,module,exports){var $export=require('./_export');var $expm1=require('./_math-expm1');$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });},{"./_export":36,"./_math-expm1":64}],172:[function(require,module,exports){var $export=require('./_export');$export($export.S, 'Math', { fround: require('./_math-fround') });},{"./_export":36,"./_math-fround":65}],173:[function(require,module,exports){var $export=require('./_export');var abs=Math.abs;$export($export.S, 'Math', {hypot: function hypot(value1, value2){var sum=0;var i=0;var aLen=arguments.length;var larg=0;var arg, div;
while (i < aLen){  arg=abs(arguments[i++]);if(larg < arg){div=larg / arg;
sum=sum * div * div + 1;
larg=arg;
}else if(arg > 0){div=arg / larg;
sum += div * div;
}else sum += arg;
}
  return larg===Infinity ? Infinity : larg * Math.sqrt(sum);
}});},{"./_export":36}],174:[function(require,module,exports){var $export=require('./_export');var $imul=Math.imul;
  $export($export.S + $export.F * require('./_fails')(function (){ return $imul(0xffffffff, 5) != -5 || $imul.length != 2;}), 'Math', {imul: function imul(x, y){var UINT16=0xffff;var xn=+x;var yn=+y;var xl=UINT16 & xn;var yl=UINT16 & yn;
  return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
}});},{"./_export":36,"./_fails":38}],175:[function(require,module,exports){var $export=require('./_export');$export($export.S, 'Math', {log10: function log10(x){  return Math.log(x) * Math.LOG10E;
}});},{"./_export":36}],176:[function(require,module,exports){var $export=require('./_export');$export($export.S, 'Math', { log1p: require('./_math-log1p') });},{"./_export":36,"./_math-log1p":66}],177:[function(require,module,exports){var $export=require('./_export');$export($export.S, 'Math', {log2: function log2(x){  return Math.log(x) / Math.LN2;
}});},{"./_export":36}],178:[function(require,module,exports){var $export=require('./_export');$export($export.S, 'Math', { sign: require('./_math-sign') });},{"./_export":36,"./_math-sign":68}],179:[function(require,module,exports){var $export=require('./_export');var expm1=require('./_math-expm1');var exp=Math.exp;
  $export($export.S + $export.F * require('./_fails')(function (){ return !Math.sinh(-2e-17) != -2e-17;}), 'Math', {sinh: function sinh(x){  return Math.abs(x=+x) < 1
  ? (expm1(x) - expm1(-x)) / 2
  : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
}});},{"./_export":36,"./_fails":38,"./_math-expm1":64}],180:[function(require,module,exports){var $export=require('./_export');var expm1=require('./_math-expm1');var exp=Math.exp;$export($export.S, 'Math', {tanh: function tanh(x){var a=expm1(x=+x);var b=expm1(-x);
  return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
}});},{"./_export":36,"./_math-expm1":64}],181:[function(require,module,exports){var $export=require('./_export');$export($export.S, 'Math', {trunc: function trunc(it){  return (it > 0 ? Math.floor : Math.ceil)(it);
}});},{"./_export":36}],182:[function(require,module,exports){  'use strict';var global=require('./_global');var has=require('./_has');var cof=require('./_cof');var inheritIfRequired=require('./_inherit-if-required');var toPrimitive=require('./_to-primitive');var fails=require('./_fails');var gOPN=require('./_object-gopn').f;var gOPD=require('./_object-gopd').f;var dP=require('./_object-dp').f;var $trim=require('./_string-trim').trim;var NUMBER='Number';var $Number=global[NUMBER];var Base=$Number;var proto=$Number.prototype;var BROKEN_COF=cof(require('./_object-create')(proto)) == NUMBER;var TRIM='trim' in String.prototype;var toNumber=function (argument){var it=toPrimitive(argument, false);if(typeof it == 'string' && it.length > 2){it=TRIM ? it.trim() : $trim(it, 3);var first=it.charCodeAt(0);var third, radix, maxCode;if(first===43 || first===45){  third=it.charCodeAt(2);if(third===88 || third===120) return NaN;
}else if(first===48){  switch (it.charCodeAt(1)){case 66: case 98: radix=2; maxCode=49; break;
case 79: case 111: radix=8; maxCode=55; break;
default: return +it;
}
  for(var digits=it.slice(2), i=0, l=digits.length, code; i < l; i++){code=digits.charCodeAt(i);if(code < 48 || code > maxCode) return NaN;
} return parseInt(digits, radix);
}} return +it;};if(!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')){$Number=function Number(value){var it=arguments.length < 1 ? 0 : value;var that=this;
  return that instanceof $Number
  && (BROKEN_COF ? fails(function (){ proto.valueOf.call(that);}) : cof(that) != NUMBER)
? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
};
for(var keys=require('./_descriptors') ? gOPN(Base) : (
'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
).split(','), j=0, key; keys.length > j; j++){if(has(Base, key=keys[j]) && !has($Number, key)){  dP($Number, key, gOPD(Base, key));
}}
$Number.prototype=proto;
proto.constructor=$Number;
  require('./_redefine')(global, NUMBER, $Number);}},{"./_cof":21,"./_descriptors":32,"./_fails":38,"./_global":44,"./_has":45,"./_inherit-if-required":49,"./_object-create":74,"./_object-dp":75,"./_object-gopd":78,"./_object-gopn":80,"./_redefine":95,"./_string-trim":114,"./_to-primitive":123}],183:[function(require,module,exports){var $export=require('./_export');$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });},{"./_export":36}],184:[function(require,module,exports){var $export=require('./_export');var _isFinite=require('./_global').isFinite;$export($export.S, 'Number', {isFinite: function isFinite(it){  return typeof it == 'number' && _isFinite(it);
}});},{"./_export":36,"./_global":44}],185:[function(require,module,exports){var $export=require('./_export');$export($export.S, 'Number', { isInteger: require('./_is-integer') });},{"./_export":36,"./_is-integer":54}],186:[function(require,module,exports){var $export=require('./_export');$export($export.S, 'Number', {isNaN: function isNaN(number){  return number != number;
}});},{"./_export":36}],187:[function(require,module,exports){var $export=require('./_export');var isInteger=require('./_is-integer');var abs=Math.abs;$export($export.S, 'Number', {isSafeInteger: function isSafeInteger(number){  return isInteger(number) && abs(number) <= 0x1fffffffffffff;
}});},{"./_export":36,"./_is-integer":54}],188:[function(require,module,exports){var $export=require('./_export');$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });},{"./_export":36}],189:[function(require,module,exports){var $export=require('./_export');$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });},{"./_export":36}],190:[function(require,module,exports){var $export=require('./_export');var $parseFloat=require('./_parse-float');
  $export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });},{"./_export":36,"./_parse-float":89}],191:[function(require,module,exports){var $export=require('./_export');var $parseInt=require('./_parse-int');
  $export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });},{"./_export":36,"./_parse-int":90}],192:[function(require,module,exports){  'use strict';var $export=require('./_export');var toInteger=require('./_to-integer');var aNumberValue=require('./_a-number-value');var repeat=require('./_string-repeat');var $toFixed=1.0.toFixed;var floor=Math.floor;var data=[0, 0, 0, 0, 0, 0];var ERROR='Number.toFixed: incorrect invocation!';var ZERO='0';var multiply=function (n, c){var i=-1;var c2=c;
while (++i < 6){c2 += n * data[i];
data[i]=c2 % 1e7;
c2=floor(c2 / 1e7);
}};var divide=function (n){var i=6;var c=0;
while (--i >= 0){c += data[i];
data[i]=floor(c / n);
c=(c % n) * 1e7;
}};var numToString=function (){var i=6;var s='';
while (--i >= 0){if(s !== '' || i===0 || data[i] !== 0){var t=String(data[i]);
  s=s==='' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
}} return s;};var pow=function (x, n, acc){ return n===0 ? acc : n % 2===1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);};var log=function (x){var n=0;var x2=x;
while (x2 >= 4096){n += 12;
x2 /= 4096;
}
while (x2 >= 2){n += 1;
x2 /= 2;
} return n;};$export($export.P + $export.F * (!!$toFixed && (
0.00008.toFixed(3) !== '0.000' ||
0.9.toFixed(0) !== '1' ||
1.255.toFixed(2) !== '1.25' ||
1000000000000000128.0.toFixed(0) !== '1000000000000000128'
  ) || !require('./_fails')(function (){$toFixed.call({});})), 'Number', {toFixed: function toFixed(fractionDigits){var x=aNumberValue(this, ERROR);var f=toInteger(fractionDigits);var s='';var m=ZERO;var e, z, j, k;if(f < 0 || f > 20) throw RangeError(ERROR);if(x != x) return 'NaN';if(x <= -1e21 || x >= 1e21) return String(x);if(x < 0){  s='-';
  x=-x;
}
if(x > 1e-21){  e=log(x * pow(2, 69, 1)) - 69;
  z=e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
  z *= 0x10000000000000;
  e=52 - e;if(e > 0){multiply(0, z);
j=f;
while (j >= 7){  multiply(1e7, 0);
j -= 7;}
multiply(pow(10, j, 1), 0);
j=e - 1;
while (j >= 23){  divide(1 << 23);
j -= 23;}
divide(1 << j);
multiply(1, 1);
divide(2);
m=numToString();
}else{multiply(0, z);
multiply(1 << -e, 0);
m=numToString() + repeat.call(ZERO, f);
}}
if(f > 0){  k=m.length;
  m=s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
}else{  m=s + m;
} return m;
}});},{"./_a-number-value":6,"./_export":36,"./_fails":38,"./_string-repeat":113,"./_to-integer":119}],193:[function(require,module,exports){  'use strict';var $export=require('./_export');var $fails=require('./_fails');var aNumberValue=require('./_a-number-value');var $toPrecision=1.0.toPrecision;$export($export.P + $export.F * ($fails(function (){ return $toPrecision.call(1, undefined) !== '1';}) || !$fails(function (){$toPrecision.call({});})), 'Number', {toPrecision: function toPrecision(precision){var that=aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
  return precision===undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
}});},{"./_a-number-value":6,"./_export":36,"./_fails":38}],194:[function(require,module,exports){var $export=require('./_export');$export($export.S + $export.F, 'Object', { assign: require('./_object-assign') });},{"./_export":36,"./_object-assign":73}],195:[function(require,module,exports){var $export=require('./_export');
  $export($export.S, 'Object', { create: require('./_object-create') });},{"./_export":36,"./_object-create":74}],196:[function(require,module,exports){var $export=require('./_export');
  $export($export.S + $export.F * !require('./_descriptors'), 'Object', { defineProperties: require('./_object-dps') });},{"./_descriptors":32,"./_export":36,"./_object-dps":76}],197:[function(require,module,exports){var $export=require('./_export');
  $export($export.S + $export.F * !require('./_descriptors'), 'Object', { defineProperty: require('./_object-dp').f });},{"./_descriptors":32,"./_export":36,"./_object-dp":75}],198:[function(require,module,exports){var isObject=require('./_is-object');var meta=require('./_meta').onFreeze;require('./_object-sap')('freeze', function ($freeze){ return function freeze(it){  return $freeze && isObject(it) ? $freeze(meta(it)) : it;
};});},{"./_is-object":55,"./_meta":69,"./_object-sap":86}],199:[function(require,module,exports){var toIObject=require('./_to-iobject');var $getOwnPropertyDescriptor=require('./_object-gopd').f;require('./_object-sap')('getOwnPropertyDescriptor', function (){ return function getOwnPropertyDescriptor(it, key){  return $getOwnPropertyDescriptor(toIObject(it), key);
};});},{"./_object-gopd":78,"./_object-sap":86,"./_to-iobject":120}],200:[function(require,module,exports){require('./_object-sap')('getOwnPropertyNames', function (){ return require('./_object-gopn-ext').f;});},{"./_object-gopn-ext":79,"./_object-sap":86}],201:[function(require,module,exports){var toObject=require('./_to-object');var $getPrototypeOf=require('./_object-gpo');require('./_object-sap')('getPrototypeOf', function (){ return function getPrototypeOf(it){  return $getPrototypeOf(toObject(it));
};});},{"./_object-gpo":82,"./_object-sap":86,"./_to-object":122}],202:[function(require,module,exports){var isObject=require('./_is-object');require('./_object-sap')('isExtensible', function ($isExtensible){ return function isExtensible(it){  return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
};});},{"./_is-object":55,"./_object-sap":86}],203:[function(require,module,exports){var isObject=require('./_is-object');require('./_object-sap')('isFrozen', function ($isFrozen){ return function isFrozen(it){  return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
};});},{"./_is-object":55,"./_object-sap":86}],204:[function(require,module,exports){var isObject=require('./_is-object');require('./_object-sap')('isSealed', function ($isSealed){ return function isSealed(it){  return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
};});},{"./_is-object":55,"./_object-sap":86}],205:[function(require,module,exports){var $export=require('./_export');
  $export($export.S, 'Object', { is: require('./_same-value') });},{"./_export":36,"./_same-value":99}],206:[function(require,module,exports){var toObject=require('./_to-object');var $keys=require('./_object-keys');require('./_object-sap')('keys', function (){ return function keys(it){  return $keys(toObject(it));
};});},{"./_object-keys":84,"./_object-sap":86,"./_to-object":122}],207:[function(require,module,exports){var isObject=require('./_is-object');var meta=require('./_meta').onFreeze;require('./_object-sap')('preventExtensions', function ($preventExtensions){ return function preventExtensions(it){  return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
};});},{"./_is-object":55,"./_meta":69,"./_object-sap":86}],208:[function(require,module,exports){var isObject=require('./_is-object');var meta=require('./_meta').onFreeze;require('./_object-sap')('seal', function ($seal){ return function seal(it){  return $seal && isObject(it) ? $seal(meta(it)) : it;
};});},{"./_is-object":55,"./_meta":69,"./_object-sap":86}],209:[function(require,module,exports){var $export=require('./_export');
  $export($export.S, 'Object', { setPrototypeOf: require('./_set-proto').set });},{"./_export":36,"./_set-proto":102}],210:[function(require,module,exports){  'use strict';var classof=require('./_classof');var test={};
  test[require('./_wks')('toStringTag')]='z';if(test + '' != '[object z]'){  require('./_redefine')(Object.prototype, 'toString', function toString(){  return '[object ' + classof(this) + ']';
}, true);}},{"./_classof":20,"./_redefine":95,"./_wks":132}],211:[function(require,module,exports){var $export=require('./_export');var $parseFloat=require('./_parse-float');
  $export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });},{"./_export":36,"./_parse-float":89}],212:[function(require,module,exports){var $export=require('./_export');var $parseInt=require('./_parse-int');
  $export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });},{"./_export":36,"./_parse-int":90}],213:[function(require,module,exports){  'use strict';var LIBRARY=require('./_library');var global=require('./_global');var ctx=require('./_ctx');var classof=require('./_classof');var $export=require('./_export');var isObject=require('./_is-object');var aFunction=require('./_a-function');var anInstance=require('./_an-instance');var forOf=require('./_for-of');var speciesConstructor=require('./_species-constructor');var task=require('./_task').set;var microtask=require('./_microtask')();var newPromiseCapabilityModule=require('./_new-promise-capability');var perform=require('./_perform');var userAgent=require('./_user-agent');var promiseResolve=require('./_promise-resolve');var PROMISE='Promise';var TypeError=global.TypeError;var process=global.process;var versions=process && process.versions;var v8=versions && versions.v8 || '';var $Promise=global[PROMISE];var isNode=classof(process) == 'process';var empty=function (){};var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;var newPromiseCapability=newGenericPromiseCapability=newPromiseCapabilityModule.f;var USE_NATIVE=!!function (){  try{var promise=$Promise.resolve(1);var FakePromise=(promise.constructor={})[require('./_wks')('species')]=function (exec){  exec(empty, empty);};
  return (isNode || typeof PromiseRejectionEvent == 'function')
  && promise.then(empty) instanceof FakePromise
  && v8.indexOf('6.6') !== 0
  && userAgent.indexOf('Chrome/66')===-1;
}catch(e){}}();var isThenable=function (it){var then;
 return isObject(it) && typeof (then=it.then) == 'function' ? then : false;};var notify=function (promise, isReject){if(promise._n) return;
promise._n=true;var chain=promise._c;
microtask(function (){var value=promise._v;var ok=promise._s == 1;var i=0;var run=function (reaction){var handler=ok ? reaction.ok : reaction.fail;var resolve=reaction.resolve;var reject=reaction.reject;var domain=reaction.domain;var result, then, exited;
  try{if(handler){if(!ok){if(promise._h == 2) onHandleUnhandled(promise);
  promise._h=1;
}
if(handler===true) result=value;
else{if(domain) domain.enter();
  result=handler(value);if(domain){  domain.exit();
exited=true;}}
if(result===reaction.promise){reject(TypeError('Promise-chain cycle'));
}else if(then=isThenable(result)){then.call(result, resolve, reject);
}else resolve(result);}else reject(value);
}catch(e){if(domain && !exited) domain.exit();
reject(e);
}};
while (chain.length > i) run(chain[i++]);
promise._c=[];
promise._n=false;if(isReject && !promise._h) onUnhandled(promise);
});};var onUnhandled=function (promise){task.call(global, function (){var value=promise._v;var unhandled=isUnhandled(promise);var result, handler, console;if(unhandled){  result=perform(function (){if(isNode){  process.emit('unhandledRejection', value, promise);}else if(handler=global.onunhandledrejection){  handler({ promise: promise, reason: value });}else if((console=global.console) && console.error){  console.error('Unhandled promise rejection', value);}});
  promise._h=isNode || isUnhandled(promise) ? 2 : 1;
} promise._a=undefined;if(unhandled && result.e) throw result.v;
});};var isUnhandled=function (promise){ return promise._h !== 1 && (promise._a || promise._c).length===0;};var onHandleUnhandled=function (promise){task.call(global, function (){var handler;if(isNode){  process.emit('rejectionHandled', promise);
}else if(handler=global.onrejectionhandled){  handler({ promise: promise, reason: promise._v });}});};var $reject=function (value){var promise=this;if(promise._d) return;
promise._d=true;
promise=promise._w || promise;
promise._v=value;
promise._s=2;if(!promise._a) promise._a=promise._c.slice();
notify(promise, true);};var $resolve=function (value){var promise=this;var then;if(promise._d) return;
promise._d=true;
promise=promise._w || promise;
  try{if(promise===value) throw TypeError("Promise can't be resolved itself");if(then=isThenable(value)){  microtask(function (){var wrapper={ _w: promise, _d: false };
try{  then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));}catch(e){  $reject.call(wrapper, e);}});}else{  promise._v=value;
  promise._s=1;
  notify(promise, false);
}}catch(e){$reject.call({ _w: promise, _d: false }, e);
}};if(!USE_NATIVE){$Promise=function Promise(executor){anInstance(this, $Promise, PROMISE, '_h');
aFunction(executor);
Internal.call(this);
try{  executor(ctx($resolve, this, 1), ctx($reject, this, 1));
}catch(err){  $reject.call(this, err);
}};
Internal=function Promise(executor){this._c=[];
this._a=undefined;
this._s=0;
this._d=false;
this._v=undefined;
this._h=0;
this._n=false;
};
Internal.prototype=require('./_redefine-all')($Promise.prototype, {then: function then(onFulfilled, onRejected){var reaction=newPromiseCapability(speciesConstructor(this, $Promise));
  reaction.ok=typeof onFulfilled == 'function' ? onFulfilled : true;
  reaction.fail=typeof onRejected == 'function' && onRejected;
  reaction.domain=isNode ? process.domain : undefined;
this._c.push(reaction);if(this._a) this._a.push(reaction);if(this._s) notify(this, false);
 return reaction.promise;
},
'catch': function (onRejected){ return this.then(undefined, onRejected);
}});
OwnPromiseCapability=function (){var promise=new Internal();
this.promise=promise;
this.resolve=ctx($resolve, promise, 1);
this.reject=ctx($reject, promise, 1);
};
newPromiseCapabilityModule.f=newPromiseCapability=function (C){  return C===$Promise || C===Wrapper
  ? new OwnPromiseCapability(C)
  : newGenericPromiseCapability(C);
};}
  $export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
require('./_set-to-string-tag')($Promise, PROMISE);
require('./_set-species')(PROMISE);
  Wrapper=require('./_core')[PROMISE];
  $export($export.S + $export.F * !USE_NATIVE, PROMISE, {reject: function reject(r){var capability=newPromiseCapability(this);var $$reject=capability.reject;
$$reject(r);
  return capability.promise;
}});
  $export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {resolve: function resolve(x){  return promiseResolve(LIBRARY && this===Wrapper ? $Promise : this, x);
}});
  $export($export.S + $export.F * !(USE_NATIVE && require('./_iter-detect')(function (iter){$Promise.all(iter)['catch'](empty);})), PROMISE, {all: function all(iterable){var C=this;var capability=newPromiseCapability(C);var resolve=capability.resolve;var reject=capability.reject;var result=perform(function (){var values=[];var index=0;var remaining=1;
  forOf(iterable, false, function (promise){var $index=index++;var alreadyCalled=false;
values.push(undefined);
remaining++;
C.resolve(promise).then(function (value){if(alreadyCalled) return;
alreadyCalled=true;
values[$index]=value;
--remaining || resolve(values);}, reject);
});
  --remaining || resolve(values);
});if(result.e) reject(result.v);
  return capability.promise;
},
race: function race(iterable){var C=this;var capability=newPromiseCapability(C);var reject=capability.reject;var result=perform(function (){  forOf(iterable, false, function (promise){C.resolve(promise).then(capability.resolve, reject);
});});if(result.e) reject(result.v);
  return capability.promise;
}});},{"./_a-function":5,"./_an-instance":9,"./_classof":20,"./_core":26,"./_ctx":28,"./_export":36,"./_for-of":42,"./_global":44,"./_is-object":55,"./_iter-detect":60,"./_library":63,"./_microtask":71,"./_new-promise-capability":72,"./_perform":91,"./_promise-resolve":92,"./_redefine-all":94,"./_set-species":103,"./_set-to-string-tag":104,"./_species-constructor":107,"./_task":116,"./_user-agent":128,"./_wks":132}],214:[function(require,module,exports){var $export=require('./_export');var aFunction=require('./_a-function');var anObject=require('./_an-object');var rApply=(require('./_global').Reflect || {}).apply;var fApply=Function.apply;
  $export($export.S + $export.F * !require('./_fails')(function (){rApply(function (){});}), 'Reflect', {apply: function apply(target, thisArgument, argumentsList){var T=aFunction(target);var L=anObject(argumentsList);
  return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
}});},{"./_a-function":5,"./_an-object":10,"./_export":36,"./_fails":38,"./_global":44}],215:[function(require,module,exports){var $export=require('./_export');var create=require('./_object-create');var aFunction=require('./_a-function');var anObject=require('./_an-object');var isObject=require('./_is-object');var fails=require('./_fails');var bind=require('./_bind');var rConstruct=(require('./_global').Reflect || {}).construct;var NEW_TARGET_BUG=fails(function (){function F(){}
 return !(rConstruct(function (){}, [], F) instanceof F);});var ARGS_BUG=!fails(function (){rConstruct(function (){});});$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {construct: function construct(Target, args ){aFunction(Target);
anObject(args);var newTarget=arguments.length < 3 ? Target : aFunction(arguments[2]);if(ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);if(Target == newTarget){  switch (args.length){case 0: return new Target();
case 1: return new Target(args[0]);
case 2: return new Target(args[0], args[1]);
case 3: return new Target(args[0], args[1], args[2]);
case 4: return new Target(args[0], args[1], args[2], args[3]);
}
var $args=[null];
  $args.push.apply($args, args);
 return new (bind.apply(Target, $args))();
}
var proto=newTarget.prototype;var instance=create(isObject(proto) ? proto : Object.prototype);var result=Function.apply.call(Target, instance, args);
  return isObject(result) ? result : instance;
}});},{"./_a-function":5,"./_an-object":10,"./_bind":19,"./_export":36,"./_fails":38,"./_global":44,"./_is-object":55,"./_object-create":74}],216:[function(require,module,exports){var dP=require('./_object-dp');var $export=require('./_export');var anObject=require('./_an-object');var toPrimitive=require('./_to-primitive');
  $export($export.S + $export.F * require('./_fails')(function (){Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });}), 'Reflect', {defineProperty: function defineProperty(target, propertyKey, attributes){anObject(target);
propertyKey=toPrimitive(propertyKey, true);
anObject(attributes);
try{  dP.f(target, propertyKey, attributes);
 return true;
}catch(e){ return false;
}}
});},{"./_an-object":10,"./_export":36,"./_fails":38,"./_object-dp":75,"./_to-primitive":123}],217:[function(require,module,exports){var $export=require('./_export');var gOPD=require('./_object-gopd').f;var anObject=require('./_an-object');$export($export.S, 'Reflect', {deleteProperty: function deleteProperty(target, propertyKey){var desc=gOPD(anObject(target), propertyKey);
  return desc && !desc.configurable ? false : delete target[propertyKey];
}});},{"./_an-object":10,"./_export":36,"./_object-gopd":78}],218:[function(require,module,exports){  'use strict';var $export=require('./_export');var anObject=require('./_an-object');var Enumerate=function (iterated){this._t=anObject(iterated);
this._i=0;var keys=this._k=[];var key;
for(key in iterated) keys.push(key);};
require('./_iter-create')(Enumerate, 'Object', function (){var that=this;var keys=that._k;var key;
do {if(that._i >= keys.length) return { value: undefined, done: true };
} while (!((key=keys[that._i++]) in that._t));
 return { value: key, done: false };});$export($export.S, 'Reflect', {enumerate: function enumerate(target){  return new Enumerate(target);
}});},{"./_an-object":10,"./_export":36,"./_iter-create":58}],219:[function(require,module,exports){var gOPD=require('./_object-gopd');var $export=require('./_export');var anObject=require('./_an-object');$export($export.S, 'Reflect', {getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){  return gOPD.f(anObject(target), propertyKey);
}});},{"./_an-object":10,"./_export":36,"./_object-gopd":78}],220:[function(require,module,exports){var $export=require('./_export');var getProto=require('./_object-gpo');var anObject=require('./_an-object');$export($export.S, 'Reflect', {getPrototypeOf: function getPrototypeOf(target){  return getProto(anObject(target));
}});},{"./_an-object":10,"./_export":36,"./_object-gpo":82}],221:[function(require,module,exports){var gOPD=require('./_object-gopd');var getPrototypeOf=require('./_object-gpo');var has=require('./_has');var $export=require('./_export');var isObject=require('./_is-object');var anObject=require('./_an-object');function get(target, propertyKey ){var receiver=arguments.length < 3 ? target : arguments[2];var desc, proto;if(anObject(target)===receiver) return target[propertyKey];if(desc=gOPD.f(target, propertyKey)) return has(desc, 'value')
? desc.value
: desc.get !== undefined
  ? desc.get.call(receiver)
  : undefined;if(isObject(proto=getPrototypeOf(target))) return get(proto, propertyKey, receiver);}
  $export($export.S, 'Reflect', { get: get });},{"./_an-object":10,"./_export":36,"./_has":45,"./_is-object":55,"./_object-gopd":78,"./_object-gpo":82}],222:[function(require,module,exports){var $export=require('./_export');$export($export.S, 'Reflect', {has: function has(target, propertyKey){  return propertyKey in target;
}});},{"./_export":36}],223:[function(require,module,exports){var $export=require('./_export');var anObject=require('./_an-object');var $isExtensible=Object.isExtensible;$export($export.S, 'Reflect', {isExtensible: function isExtensible(target){anObject(target);
  return $isExtensible ? $isExtensible(target) : true;
}});},{"./_an-object":10,"./_export":36}],224:[function(require,module,exports){var $export=require('./_export');$export($export.S, 'Reflect', { ownKeys: require('./_own-keys') });},{"./_export":36,"./_own-keys":88}],225:[function(require,module,exports){var $export=require('./_export');var anObject=require('./_an-object');var $preventExtensions=Object.preventExtensions;$export($export.S, 'Reflect', {preventExtensions: function preventExtensions(target){anObject(target);
try{if($preventExtensions) $preventExtensions(target);
 return true;
}catch(e){ return false;
}}});},{"./_an-object":10,"./_export":36}],226:[function(require,module,exports){var $export=require('./_export');var setProto=require('./_set-proto');if(setProto) $export($export.S, 'Reflect', {setPrototypeOf: function setPrototypeOf(target, proto){setProto.check(target, proto);
try{  setProto.set(target, proto);
 return true;
}catch(e){ return false;
}}
});},{"./_export":36,"./_set-proto":102}],227:[function(require,module,exports){var dP=require('./_object-dp');var gOPD=require('./_object-gopd');var getPrototypeOf=require('./_object-gpo');var has=require('./_has');var $export=require('./_export');var createDesc=require('./_property-desc');var anObject=require('./_an-object');var isObject=require('./_is-object');function set(target, propertyKey, V ){var receiver=arguments.length < 4 ? target : arguments[3];var ownDesc=gOPD.f(anObject(target), propertyKey);var existingDescriptor, proto;if(!ownDesc){if(isObject(proto=getPrototypeOf(target))){ return set(proto, propertyKey, V, receiver);
}
ownDesc=createDesc(0);
}
if(has(ownDesc, 'value')){if(ownDesc.writable===false || !isObject(receiver)) return false;if(existingDescriptor=gOPD.f(receiver, propertyKey)){if(existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable===false) return false;
  existingDescriptor.value=V;
  dP.f(receiver, propertyKey, existingDescriptor);
}else dP.f(receiver, propertyKey, createDesc(0, V));
  return true;
}
 return ownDesc.set===undefined ? false : (ownDesc.set.call(receiver, V), true);}
  $export($export.S, 'Reflect', { set: set });},{"./_an-object":10,"./_export":36,"./_has":45,"./_is-object":55,"./_object-dp":75,"./_object-gopd":78,"./_object-gpo":82,"./_property-desc":93}],228:[function(require,module,exports){var global=require('./_global');var inheritIfRequired=require('./_inherit-if-required');var dP=require('./_object-dp').f;var gOPN=require('./_object-gopn').f;var isRegExp=require('./_is-regexp');var $flags=require('./_flags');var $RegExp=global.RegExp;var Base=$RegExp;var proto=$RegExp.prototype;var re1=/a/g;var re2=/a/g;var CORRECT_NEW=new $RegExp(re1) !== re1;if(require('./_descriptors') && (!CORRECT_NEW || require('./_fails')(function (){re2[require('./_wks')('match')]=false;
 return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';}))){$RegExp=function RegExp(p, f){var tiRE=this instanceof $RegExp;var piRE=isRegExp(p);var fiU=f===undefined;
  return !tiRE && piRE && p.constructor===$RegExp && fiU ? p
  : inheritIfRequired(CORRECT_NEW
? new Base(piRE && !fiU ? p.source : p, f)
: Base((piRE=p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
  , tiRE ? this : proto, $RegExp);
};var proxy=function (key){key in $RegExp || dP($RegExp, key, {  configurable: true,
  get: function (){ return Base[key];},
  set: function (it){ Base[key]=it;}});};
for(var keys=gOPN(Base), i=0; keys.length > i;) proxy(keys[i++]);
proto.constructor=$RegExp;
$RegExp.prototype=proto;
  require('./_redefine')(global, 'RegExp', $RegExp);}
require('./_set-species')('RegExp');},{"./_descriptors":32,"./_fails":38,"./_flags":40,"./_global":44,"./_inherit-if-required":49,"./_is-regexp":56,"./_object-dp":75,"./_object-gopn":80,"./_redefine":95,"./_set-species":103,"./_wks":132}],229:[function(require,module,exports){  'use strict';var regexpExec=require('./_regexp-exec');
require('./_export')({target: 'RegExp',
proto: true,
forced: regexpExec !== /./.exec
}, {exec: regexpExec
});},{"./_export":36,"./_regexp-exec":97}],230:[function(require,module,exports){if(require('./_descriptors') && /./g.flags != 'g') require('./_object-dp').f(RegExp.prototype, 'flags', {configurable: true,
get: require('./_flags')
});},{"./_descriptors":32,"./_flags":40,"./_object-dp":75}],231:[function(require,module,exports){  'use strict';var anObject=require('./_an-object');var toLength=require('./_to-length');var advanceStringIndex=require('./_advance-string-index');var regExpExec=require('./_regexp-exec-abstract');
require('./_fix-re-wks')('match', 1, function (defined, MATCH, $match, maybeCallNative){ return [
function match(regexp){var O=defined(this);var fn=regexp == undefined ? undefined : regexp[MATCH];
 return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
},
function (regexp){var res=maybeCallNative($match, regexp, this);if(res.done) return res.value;var rx=anObject(regexp);var S=String(this);if(!rx.global) return regExpExec(rx, S);var fullUnicode=rx.unicode;
  rx.lastIndex=0;var A=[];var n=0;var result;
  while ((result=regExpExec(rx, S)) !== null){var matchStr=String(result[0]);
A[n]=matchStr;if(matchStr==='') rx.lastIndex=advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
n++;
}
 return n===0 ? null : A;
}
];});},{"./_advance-string-index":8,"./_an-object":10,"./_fix-re-wks":39,"./_regexp-exec-abstract":96,"./_to-length":121}],232:[function(require,module,exports){  'use strict';var anObject=require('./_an-object');var toObject=require('./_to-object');var toLength=require('./_to-length');var toInteger=require('./_to-integer');var advanceStringIndex=require('./_advance-string-index');var regExpExec=require('./_regexp-exec-abstract');var max=Math.max;var min=Math.min;var floor=Math.floor;var SUBSTITUTION_SYMBOLS=/\$([$&`']|\d\d?|<[^>]*>)/g;var SUBSTITUTION_SYMBOLS_NO_NAMED=/\$([$&`']|\d\d?)/g;var maybeToString=function (it){ return it===undefined ? it : String(it);};
require('./_fix-re-wks')('replace', 2, function (defined, REPLACE, $replace, maybeCallNative){ return [
function replace(searchValue, replaceValue){var O=defined(this);var fn=searchValue == undefined ? undefined : searchValue[REPLACE];
 return fn !== undefined
? fn.call(searchValue, O, replaceValue)
: $replace.call(String(O), searchValue, replaceValue);
},
function (regexp, replaceValue){var res=maybeCallNative($replace, regexp, this, replaceValue);if(res.done) return res.value;var rx=anObject(regexp);var S=String(this);var functionalReplace=typeof replaceValue==='function';if(!functionalReplace) replaceValue=String(replaceValue);var global=rx.global;if(global){var fullUnicode=rx.unicode;
rx.lastIndex=0;
}
var results=[];
  while (true){var result=regExpExec(rx, S);if(result===null) break;
results.push(result);if(!global) break;var matchStr=String(result[0]);if(matchStr==='') rx.lastIndex=advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
}
var accumulatedResult='';var nextSourcePosition=0;
  for(var i=0;i<results.length; i++){result=results[i];var matched=String(result[0]);var position=max(min(toInteger(result.index), S.length), 0);var captures=[];
for(var j=1; j < result.length; j++) captures.push(maybeToString(result[j]));var namedCaptures=result.groups;if(functionalReplace){var replacerArgs=[matched].concat(captures, position, S);if(namedCaptures !== undefined) replacerArgs.push(namedCaptures);var replacement=String(replaceValue.apply(undefined, replacerArgs));}else{  replacement=getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);}
if(position >= nextSourcePosition){  accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
nextSourcePosition=position + matched.length;}}
 return accumulatedResult + S.slice(nextSourcePosition);
}
];
function getSubstitution(matched, str, position, captures, namedCaptures, replacement){var tailPos=position + matched.length;var m=captures.length;var symbols=SUBSTITUTION_SYMBOLS_NO_NAMED;if(namedCaptures !== undefined){  namedCaptures=toObject(namedCaptures);
  symbols=SUBSTITUTION_SYMBOLS;
}
  return $replace.call(replacement, symbols, function (match, ch){var capture;
  switch (ch.charAt(0)){case '$': return '$';
case '&': return matched;
case '`': return str.slice(0, position);
case "'": return str.slice(tailPos);
case '<':
capture=namedCaptures[ch.slice(1, -1)];
break;
default:
var n=+ch;if(n===0) return match;if(n > m){var f=floor(n / 10);if(f===0) return match;if(f <= m) return captures[f - 1]===undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
 return match;
}
capture=captures[n - 1];
}
 return capture===undefined ? '' : capture;
});}});},{"./_advance-string-index":8,"./_an-object":10,"./_fix-re-wks":39,"./_regexp-exec-abstract":96,"./_to-integer":119,"./_to-length":121,"./_to-object":122}],233:[function(require,module,exports){  'use strict';var anObject=require('./_an-object');var sameValue=require('./_same-value');var regExpExec=require('./_regexp-exec-abstract');
require('./_fix-re-wks')('search', 1, function (defined, SEARCH, $search, maybeCallNative){ return [
function search(regexp){var O=defined(this);var fn=regexp == undefined ? undefined : regexp[SEARCH];
 return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
},
function (regexp){var res=maybeCallNative($search, regexp, this);if(res.done) return res.value;var rx=anObject(regexp);var S=String(this);var previousLastIndex=rx.lastIndex;if(!sameValue(previousLastIndex, 0)) rx.lastIndex=0;var result=regExpExec(rx, S);if(!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex=previousLastIndex;
 return result===null ? -1 : result.index;
}
];});},{"./_an-object":10,"./_fix-re-wks":39,"./_regexp-exec-abstract":96,"./_same-value":99}],234:[function(require,module,exports){  'use strict';var isRegExp=require('./_is-regexp');var anObject=require('./_an-object');var speciesConstructor=require('./_species-constructor');var advanceStringIndex=require('./_advance-string-index');var toLength=require('./_to-length');var callRegExpExec=require('./_regexp-exec-abstract');var regexpExec=require('./_regexp-exec');var fails=require('./_fails');var $min=Math.min;var $push=[].push;var $SPLIT='split';var LENGTH='length';var LAST_INDEX='lastIndex';var MAX_UINT32=0xffffffff;var SUPPORTS_Y=!fails(function (){ RegExp(MAX_UINT32, 'y');});
require('./_fix-re-wks')('split', 2, function (defined, SPLIT, $split, maybeCallNative){var internalSplit;if(
'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
'.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
'.'[$SPLIT](/()()/)[LENGTH] > 1 ||
''[$SPLIT](/.?/)[LENGTH]
){internalSplit=function (separator, limit){var string=String(this);if(separator===undefined && limit===0) return [];if(!isRegExp(separator)) return $split.call(string, separator, limit);var output=[];var flags=(separator.ignoreCase ? 'i' : '') +
(separator.multiline ? 'm' : '') +
(separator.unicode ? 'u' : '') +
(separator.sticky ? 'y' : '');var lastLastIndex=0;var splitLimit=limit===undefined ? MAX_UINT32 : limit >>> 0;var separatorCopy=new RegExp(separator.source, flags + 'g');var match, lastIndex, lastLength;
  while (match=regexpExec.call(separatorCopy, string)){lastIndex=separatorCopy[LAST_INDEX];if(lastIndex > lastLastIndex){  output.push(string.slice(lastLastIndex, match.index));if(match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
lastLength=match[0][LENGTH];
lastLastIndex=lastIndex;if(output[LENGTH] >= splitLimit) break;}
if(separatorCopy[LAST_INDEX]===match.index) separatorCopy[LAST_INDEX]++;
}
if(lastLastIndex===string[LENGTH]){if(lastLength || !separatorCopy.test('')) output.push('');
}else output.push(string.slice(lastLastIndex));
 return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;};
}else if('0'[$SPLIT](undefined, 0)[LENGTH]){internalSplit=function (separator, limit){ return separator===undefined && limit===0 ? [] : $split.call(this, separator, limit);};
}else{internalSplit=$split;
}
 return [
function split(separator, limit){var O=defined(this);var splitter=separator == undefined ? undefined : separator[SPLIT];
 return splitter !== undefined
? splitter.call(separator, O, limit)
: internalSplit.call(String(O), separator, limit);
},
function (regexp, limit){var res=maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);if(res.done) return res.value;var rx=anObject(regexp);var S=String(this);var C=speciesConstructor(rx, RegExp);var unicodeMatching=rx.unicode;var flags=(rx.ignoreCase ? 'i' : '') +
(rx.multiline ? 'm' : '') +
(rx.unicode ? 'u' : '') +
(SUPPORTS_Y ? 'y' : 'g');var splitter=new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);var lim=limit===undefined ? MAX_UINT32 : limit >>> 0;if(lim===0) return [];if(S.length===0) return callRegExpExec(splitter, S)===null ? [S] : [];var p=0;var q=0;var A=[];
  while (q < S.length){splitter.lastIndex=SUPPORTS_Y ? q : 0;var z=callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));var e;if(
z===null ||
(e=$min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length))===p
){  q=advanceStringIndex(S, q, unicodeMatching);}else{  A.push(S.slice(p, q));if(A.length===lim) return A;
for(var i=1; i <= z.length - 1; i++){A.push(z[i]);if(A.length===lim) return A;
}
q=p=e;}}
  A.push(S.slice(p));
 return A;
}
];});},{"./_advance-string-index":8,"./_an-object":10,"./_fails":38,"./_fix-re-wks":39,"./_is-regexp":56,"./_regexp-exec":97,"./_regexp-exec-abstract":96,"./_species-constructor":107,"./_to-length":121}],235:[function(require,module,exports){  'use strict';
require('./es6.regexp.flags');var anObject=require('./_an-object');var $flags=require('./_flags');var DESCRIPTORS=require('./_descriptors');var TO_STRING='toString';var $toString=/./[TO_STRING];var define=function (fn){  require('./_redefine')(RegExp.prototype, TO_STRING, fn, true);};if(require('./_fails')(function (){ return $toString.call({ source: 'a', flags: 'b' }) != '/a/b';})){define(function toString(){var R=anObject(this);
  return '/'.concat(R.source, '/',
  'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
});}else if($toString.name != TO_STRING){define(function toString(){  return $toString.call(this);
});}},{"./_an-object":10,"./_descriptors":32,"./_fails":38,"./_flags":40,"./_redefine":95,"./es6.regexp.flags":230}],236:[function(require,module,exports){  'use strict';var strong=require('./_collection-strong');var validate=require('./_validate-collection');var SET='Set';
  module.exports=require('./_collection')(SET, function (get){ return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined);};}, {add: function add(value){  return strong.def(validate(this, SET), value=value===0 ? 0 : value, value);
}}, strong);},{"./_collection":25,"./_collection-strong":22,"./_validate-collection":129}],237:[function(require,module,exports){  'use strict';
require('./_string-html')('anchor', function (createHTML){ return function anchor(name){  return createHTML(this, 'a', 'name', name);
};});},{"./_string-html":111}],238:[function(require,module,exports){  'use strict';
require('./_string-html')('big', function (createHTML){ return function big(){  return createHTML(this, 'big', '', '');
};});},{"./_string-html":111}],239:[function(require,module,exports){  'use strict';
require('./_string-html')('blink', function (createHTML){ return function blink(){  return createHTML(this, 'blink', '', '');
};});},{"./_string-html":111}],240:[function(require,module,exports){  'use strict';
require('./_string-html')('bold', function (createHTML){ return function bold(){  return createHTML(this, 'b', '', '');
};});},{"./_string-html":111}],241:[function(require,module,exports){  'use strict';var $export=require('./_export');var $at=require('./_string-at')(false);
  $export($export.P, 'String', {codePointAt: function codePointAt(pos){  return $at(this, pos);
}});},{"./_export":36,"./_string-at":109}],242:[function(require,module,exports){  'use strict';var $export=require('./_export');var toLength=require('./_to-length');var context=require('./_string-context');var ENDS_WITH='endsWith';var $endsWith=''[ENDS_WITH];$export($export.P + $export.F * require('./_fails-is-regexp')(ENDS_WITH), 'String', {endsWith: function endsWith(searchString ){var that=context(this, searchString, ENDS_WITH);var endPosition=arguments.length > 1 ? arguments[1] : undefined;var len=toLength(that.length);var end=endPosition===undefined ? len : Math.min(toLength(endPosition), len);var search=String(searchString);
  return $endsWith
  ? $endsWith.call(that, search, end)
  : that.slice(end - search.length, end)===search;
}});},{"./_export":36,"./_fails-is-regexp":37,"./_string-context":110,"./_to-length":121}],243:[function(require,module,exports){  'use strict';
require('./_string-html')('fixed', function (createHTML){ return function fixed(){  return createHTML(this, 'tt', '', '');
};});},{"./_string-html":111}],244:[function(require,module,exports){  'use strict';
require('./_string-html')('fontcolor', function (createHTML){ return function fontcolor(color){  return createHTML(this, 'font', 'color', color);
};});},{"./_string-html":111}],245:[function(require,module,exports){  'use strict';
require('./_string-html')('fontsize', function (createHTML){ return function fontsize(size){  return createHTML(this, 'font', 'size', size);
};});},{"./_string-html":111}],246:[function(require,module,exports){var $export=require('./_export');var toAbsoluteIndex=require('./_to-absolute-index');var fromCharCode=String.fromCharCode;var $fromCodePoint=String.fromCodePoint;
  $export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {fromCodePoint: function fromCodePoint(x){var res=[];var aLen=arguments.length;var i=0;var code;
while (aLen > i){  code=+arguments[i++];if(toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
  res.push(code < 0x10000
? fromCharCode(code)
: fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
);
} return res.join('');
}});},{"./_export":36,"./_to-absolute-index":117}],247:[function(require,module,exports){  'use strict';var $export=require('./_export');var context=require('./_string-context');var INCLUDES='includes';$export($export.P + $export.F * require('./_fails-is-regexp')(INCLUDES), 'String', {includes: function includes(searchString ){  return !!~context(this, searchString, INCLUDES)
  .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
}});},{"./_export":36,"./_fails-is-regexp":37,"./_string-context":110}],248:[function(require,module,exports){  'use strict';
require('./_string-html')('italics', function (createHTML){ return function italics(){  return createHTML(this, 'i', '', '');
};});},{"./_string-html":111}],249:[function(require,module,exports){  'use strict';var $at=require('./_string-at')(true);
require('./_iter-define')(String, 'String', function (iterated){this._t=String(iterated);
this._i=0;}, function (){var O=this._t;var index=this._i;var point;if(index >= O.length) return { value: undefined, done: true };
point=$at(O, index);
this._i += point.length;
 return { value: point, done: false };});},{"./_iter-define":59,"./_string-at":109}],250:[function(require,module,exports){  'use strict';
require('./_string-html')('link', function (createHTML){ return function link(url){  return createHTML(this, 'a', 'href', url);
};});},{"./_string-html":111}],251:[function(require,module,exports){var $export=require('./_export');var toIObject=require('./_to-iobject');var toLength=require('./_to-length');$export($export.S, 'String', {raw: function raw(callSite){var tpl=toIObject(callSite.raw);var len=toLength(tpl.length);var aLen=arguments.length;var res=[];var i=0;
while (len > i){  res.push(String(tpl[i++]));if(i < aLen) res.push(String(arguments[i]));
} return res.join('');
}});},{"./_export":36,"./_to-iobject":120,"./_to-length":121}],252:[function(require,module,exports){var $export=require('./_export');$export($export.P, 'String', {repeat: require('./_string-repeat')
});},{"./_export":36,"./_string-repeat":113}],253:[function(require,module,exports){  'use strict';
require('./_string-html')('small', function (createHTML){ return function small(){  return createHTML(this, 'small', '', '');
};});},{"./_string-html":111}],254:[function(require,module,exports){  'use strict';var $export=require('./_export');var toLength=require('./_to-length');var context=require('./_string-context');var STARTS_WITH='startsWith';var $startsWith=''[STARTS_WITH];$export($export.P + $export.F * require('./_fails-is-regexp')(STARTS_WITH), 'String', {startsWith: function startsWith(searchString ){var that=context(this, searchString, STARTS_WITH);var index=toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));var search=String(searchString);
  return $startsWith
  ? $startsWith.call(that, search, index)
  : that.slice(index, index + search.length)===search;
}});},{"./_export":36,"./_fails-is-regexp":37,"./_string-context":110,"./_to-length":121}],255:[function(require,module,exports){  'use strict';
require('./_string-html')('strike', function (createHTML){ return function strike(){  return createHTML(this, 'strike', '', '');
};});},{"./_string-html":111}],256:[function(require,module,exports){  'use strict';
require('./_string-html')('sub', function (createHTML){ return function sub(){  return createHTML(this, 'sub', '', '');
};});},{"./_string-html":111}],257:[function(require,module,exports){  'use strict';
require('./_string-html')('sup', function (createHTML){ return function sup(){  return createHTML(this, 'sup', '', '');
};});},{"./_string-html":111}],258:[function(require,module,exports){  'use strict';
require('./_string-trim')('trim', function ($trim){ return function trim(){  return $trim(this, 3);
};});},{"./_string-trim":114}],259:[function(require,module,exports){  'use strict';var global=require('./_global');var has=require('./_has');var DESCRIPTORS=require('./_descriptors');var $export=require('./_export');var redefine=require('./_redefine');var META=require('./_meta').KEY;var $fails=require('./_fails');var shared=require('./_shared');var setToStringTag=require('./_set-to-string-tag');var uid=require('./_uid');var wks=require('./_wks');var wksExt=require('./_wks-ext');var wksDefine=require('./_wks-define');var enumKeys=require('./_enum-keys');var isArray=require('./_is-array');var anObject=require('./_an-object');var isObject=require('./_is-object');var toObject=require('./_to-object');var toIObject=require('./_to-iobject');var toPrimitive=require('./_to-primitive');var createDesc=require('./_property-desc');var _create=require('./_object-create');var gOPNExt=require('./_object-gopn-ext');var $GOPD=require('./_object-gopd');var $GOPS=require('./_object-gops');var $DP=require('./_object-dp');var $keys=require('./_object-keys');var gOPD=$GOPD.f;var dP=$DP.f;var gOPN=gOPNExt.f;var $Symbol=global.Symbol;var $JSON=global.JSON;var _stringify=$JSON && $JSON.stringify;var PROTOTYPE='prototype';var HIDDEN=wks('_hidden');var TO_PRIMITIVE=wks('toPrimitive');var isEnum={}.propertyIsEnumerable;var SymbolRegistry=shared('symbol-registry');var AllSymbols=shared('symbols');var OPSymbols=shared('op-symbols');var ObjectProto=Object[PROTOTYPE];var USE_NATIVE=typeof $Symbol == 'function' && !!$GOPS.f;var QObject=global.QObject;var setter=!QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;var setSymbolDesc=DESCRIPTORS && $fails(function (){ return _create(dP({}, 'a', {get: function (){ return dP(this, 'a', { value: 7 }).a;}})).a != 7;}) ? function (it, key, D){var protoDesc=gOPD(ObjectProto, key);if(protoDesc) delete ObjectProto[key];
dP(it, key, D);if(protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);} : dP;var wrap=function (tag){var sym=AllSymbols[tag]=_create($Symbol[PROTOTYPE]);
sym._k=tag;
 return sym;};var isSymbol=USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it){ return typeof it == 'symbol';} : function (it){ return it instanceof $Symbol;};var $defineProperty=function defineProperty(it, key, D){if(it===ObjectProto) $defineProperty(OPSymbols, key, D);
anObject(it);
key=toPrimitive(key, true);
anObject(D);if(has(AllSymbols, key)){if(!D.enumerable){if(!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
  it[HIDDEN][key]=true;
}else{if(has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key]=false;
  D=_create(D, { enumerable: createDesc(0, false) });} return setSymbolDesc(it, key, D);
} return dP(it, key, D);};var $defineProperties=function defineProperties(it, P){anObject(it);var keys=enumKeys(P=toIObject(P));var i=0;var l=keys.length;var key;
while (l > i) $defineProperty(it, key=keys[i++], P[key]);
 return it;};var $create=function create(it, P){ return P===undefined ? _create(it) : $defineProperties(_create(it), P);};var $propertyIsEnumerable=function propertyIsEnumerable(key){var E=isEnum.call(this, key=toPrimitive(key, true));if(this===ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
 return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;};var $getOwnPropertyDescriptor=function getOwnPropertyDescriptor(it, key){it=toIObject(it);
key=toPrimitive(key, true);if(it===ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;var D=gOPD(it, key);if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable=true;
 return D;};var $getOwnPropertyNames=function getOwnPropertyNames(it){var names=gOPN(toIObject(it));var result=[];var i=0;var key;
while (names.length > i){if(!has(AllSymbols, key=names[i++]) && key != HIDDEN && key != META) result.push(key);
} return result;};var $getOwnPropertySymbols=function getOwnPropertySymbols(it){var IS_OP=it===ObjectProto;var names=gOPN(IS_OP ? OPSymbols : toIObject(it));var result=[];var i=0;var key;
while (names.length > i){if(has(AllSymbols, key=names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
} return result;};if(!USE_NATIVE){$Symbol=function Symbol(){if(this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');var tag=uid(arguments.length > 0 ? arguments[0] : undefined);var $set=function (value){if(this===ObjectProto) $set.call(OPSymbols, value);if(has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag]=false;
  setSymbolDesc(this, tag, createDesc(1, value));};if(DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
  return wrap(tag);
};
redefine($Symbol[PROTOTYPE], 'toString', function toString(){  return this._k;
});  $GOPD.f=$getOwnPropertyDescriptor;
$DP.f=$defineProperty;
  require('./_object-gopn').f=gOPNExt.f=$getOwnPropertyNames;
  require('./_object-pie').f=$propertyIsEnumerable;
$GOPS.f=$getOwnPropertySymbols;if(DESCRIPTORS && !require('./_library')){redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
}
wksExt.f=function (name){  return wrap(wks(name));
};}
  $export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });for(var es6Symbols=(
'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
  ).split(','), j=0; es6Symbols.length > j;)wks(es6Symbols[j++]);for(var wellKnownSymbols=$keys(wks.store), k=0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {'for': function (key){  return has(SymbolRegistry, key += '')
  ? SymbolRegistry[key]
  : SymbolRegistry[key]=$Symbol(key);
},
keyFor: function keyFor(sym){if(!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
for(var key in SymbolRegistry) if(SymbolRegistry[key]===sym) return key;
},
useSetter: function (){ setter=true;},
useSimple: function (){ setter=false;}});$export($export.S + $export.F * !USE_NATIVE, 'Object', {create: $create,
defineProperty: $defineProperty,
defineProperties: $defineProperties,
getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
getOwnPropertyNames: $getOwnPropertyNames,
getOwnPropertySymbols: $getOwnPropertySymbols
});var FAILS_ON_PRIMITIVES=$fails(function (){ $GOPS.f(1);});$export($export.S + $export.F * FAILS_ON_PRIMITIVES, 'Object', {getOwnPropertySymbols: function getOwnPropertySymbols(it){  return $GOPS.f(toObject(it));
}});
  $JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function (){var S=$Symbol();
 return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';})), 'JSON', {stringify: function stringify(it){var args=[it];var i=1;var replacer, $replacer;
while (arguments.length > i) args.push(arguments[i++]);
$replacer=replacer=args[1];if(!isObject(replacer) && it===undefined || isSymbol(it)) return;if(!isArray(replacer)) replacer=function (key, value){if(typeof $replacer == 'function') value=$replacer.call(this, key, value);if(!isSymbol(value)) return value;};
args[1]=replacer;
  return _stringify.apply($JSON, args);
}});
  $Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
  setToStringTag($Symbol, 'Symbol');
  setToStringTag(Math, 'Math', true);
  setToStringTag(global.JSON, 'JSON', true);},{"./_an-object":10,"./_descriptors":32,"./_enum-keys":35,"./_export":36,"./_fails":38,"./_global":44,"./_has":45,"./_hide":46,"./_is-array":53,"./_is-object":55,"./_library":63,"./_meta":69,"./_object-create":74,"./_object-dp":75,"./_object-gopd":78,"./_object-gopn":80,"./_object-gopn-ext":79,"./_object-gops":81,"./_object-keys":84,"./_object-pie":85,"./_property-desc":93,"./_redefine":95,"./_set-to-string-tag":104,"./_shared":106,"./_to-iobject":120,"./_to-object":122,"./_to-primitive":123,"./_uid":127,"./_wks":132,"./_wks-define":130,"./_wks-ext":131}],260:[function(require,module,exports){  'use strict';var $export=require('./_export');var $typed=require('./_typed');var buffer=require('./_typed-buffer');var anObject=require('./_an-object');var toAbsoluteIndex=require('./_to-absolute-index');var toLength=require('./_to-length');var isObject=require('./_is-object');var ArrayBuffer=require('./_global').ArrayBuffer;var speciesConstructor=require('./_species-constructor');var $ArrayBuffer=buffer.ArrayBuffer;var $DataView=buffer.DataView;var $isView=$typed.ABV && ArrayBuffer.isView;var $slice=$ArrayBuffer.prototype.slice;var VIEW=$typed.VIEW;var ARRAY_BUFFER='ArrayBuffer';$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {isView: function isView(it){  return $isView && $isView(it) || isObject(it) && VIEW in it;
}});$export($export.P + $export.U + $export.F * require('./_fails')(function (){ return !new $ArrayBuffer(2).slice(1, undefined).byteLength;}), ARRAY_BUFFER, {slice: function slice(start, end){if($slice !== undefined && end===undefined) return $slice.call(anObject(this), start);var len=anObject(this).byteLength;var first=toAbsoluteIndex(start, len);var fin=toAbsoluteIndex(end===undefined ? len : end, len);var result=new (speciesConstructor(this, $ArrayBuffer))(toLength(fin - first));var viewS=new $DataView(this);var viewT=new $DataView(result);var index=0;
while (first < fin){  viewT.setUint8(index++, viewS.getUint8(first++));
} return result;
}});require('./_set-species')(ARRAY_BUFFER);},{"./_an-object":10,"./_export":36,"./_fails":38,"./_global":44,"./_is-object":55,"./_set-species":103,"./_species-constructor":107,"./_to-absolute-index":117,"./_to-length":121,"./_typed":126,"./_typed-buffer":125}],261:[function(require,module,exports){var $export=require('./_export');
  $export($export.G + $export.W + $export.F * !require('./_typed').ABV, {DataView: require('./_typed-buffer').DataView
});},{"./_export":36,"./_typed":126,"./_typed-buffer":125}],262:[function(require,module,exports){require('./_typed-array')('Float32', 4, function (init){ return function Float32Array(data, byteOffset, length){  return init(this, data, byteOffset, length);
};});},{"./_typed-array":124}],263:[function(require,module,exports){require('./_typed-array')('Float64', 8, function (init){ return function Float64Array(data, byteOffset, length){  return init(this, data, byteOffset, length);
};});},{"./_typed-array":124}],264:[function(require,module,exports){require('./_typed-array')('Int16', 2, function (init){ return function Int16Array(data, byteOffset, length){  return init(this, data, byteOffset, length);
};});},{"./_typed-array":124}],265:[function(require,module,exports){require('./_typed-array')('Int32', 4, function (init){ return function Int32Array(data, byteOffset, length){  return init(this, data, byteOffset, length);
};});},{"./_typed-array":124}],266:[function(require,module,exports){require('./_typed-array')('Int8', 1, function (init){ return function Int8Array(data, byteOffset, length){  return init(this, data, byteOffset, length);
};});},{"./_typed-array":124}],267:[function(require,module,exports){require('./_typed-array')('Uint16', 2, function (init){ return function Uint16Array(data, byteOffset, length){  return init(this, data, byteOffset, length);
};});},{"./_typed-array":124}],268:[function(require,module,exports){require('./_typed-array')('Uint32', 4, function (init){ return function Uint32Array(data, byteOffset, length){  return init(this, data, byteOffset, length);
};});},{"./_typed-array":124}],269:[function(require,module,exports){require('./_typed-array')('Uint8', 1, function (init){ return function Uint8Array(data, byteOffset, length){  return init(this, data, byteOffset, length);
};});},{"./_typed-array":124}],270:[function(require,module,exports){require('./_typed-array')('Uint8', 1, function (init){ return function Uint8ClampedArray(data, byteOffset, length){  return init(this, data, byteOffset, length);
};}, true);},{"./_typed-array":124}],271:[function(require,module,exports){  'use strict';var global=require('./_global');var each=require('./_array-methods')(0);var redefine=require('./_redefine');var meta=require('./_meta');var assign=require('./_object-assign');var weak=require('./_collection-weak');var isObject=require('./_is-object');var validate=require('./_validate-collection');var NATIVE_WEAK_MAP=require('./_validate-collection');var IS_IE11=!global.ActiveXObject && 'ActiveXObject' in global;var WEAK_MAP='WeakMap';var getWeak=meta.getWeak;var isExtensible=Object.isExtensible;var uncaughtFrozenStore=weak.ufstore;var InternalMap;var wrapper=function (get){ return function WeakMap(){  return get(this, arguments.length > 0 ? arguments[0] : undefined);
};};var methods={get: function get(key){if(isObject(key)){var data=getWeak(key);if(data===true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
 return data ? data[this._i] : undefined;
}},
set: function set(key, value){  return weak.def(validate(this, WEAK_MAP), key, value);
}};var $WeakMap=module.exports=require('./_collection')(WEAK_MAP, wrapper, methods, weak, true, true);if(NATIVE_WEAK_MAP && IS_IE11){InternalMap=weak.getConstructor(wrapper, WEAK_MAP);
assign(InternalMap.prototype, methods);
meta.NEED=true;
each(['delete', 'has', 'get', 'set'], function (key){var proto=$WeakMap.prototype;var method=proto[key];
redefine(proto, key, function (a, b){if(isObject(a) && !isExtensible(a)){if(!this._f) this._f=new InternalMap();var result=this._f[key](a, b);
   return key == 'set' ? this : result;
} return method.call(this, a, b);
});});}},{"./_array-methods":15,"./_collection":25,"./_collection-weak":24,"./_global":44,"./_is-object":55,"./_meta":69,"./_object-assign":73,"./_redefine":95,"./_validate-collection":129}],272:[function(require,module,exports){  'use strict';var weak=require('./_collection-weak');var validate=require('./_validate-collection');var WEAK_SET='WeakSet';
require('./_collection')(WEAK_SET, function (get){ return function WeakSet(){ return get(this, arguments.length > 0 ? arguments[0] : undefined);};}, {add: function add(value){  return weak.def(validate(this, WEAK_SET), value, true);
}}, weak, false, true);},{"./_collection":25,"./_collection-weak":24,"./_validate-collection":129}],273:[function(require,module,exports){  'use strict';var $export=require('./_export');var flattenIntoArray=require('./_flatten-into-array');var toObject=require('./_to-object');var toLength=require('./_to-length');var aFunction=require('./_a-function');var arraySpeciesCreate=require('./_array-species-create');$export($export.P, 'Array', {flatMap: function flatMap(callbackfn ){var O=toObject(this);var sourceLen, A;
aFunction(callbackfn);
sourceLen=toLength(O.length);
A=arraySpeciesCreate(O, 0);
flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
  return A;
}});require('./_add-to-unscopables')('flatMap');},{"./_a-function":5,"./_add-to-unscopables":7,"./_array-species-create":18,"./_export":36,"./_flatten-into-array":41,"./_to-length":121,"./_to-object":122}],274:[function(require,module,exports){  'use strict';var $export=require('./_export');var flattenIntoArray=require('./_flatten-into-array');var toObject=require('./_to-object');var toLength=require('./_to-length');var toInteger=require('./_to-integer');var arraySpeciesCreate=require('./_array-species-create');$export($export.P, 'Array', {flatten: function flatten(){var depthArg=arguments[0];var O=toObject(this);var sourceLen=toLength(O.length);var A=arraySpeciesCreate(O, 0);
flattenIntoArray(A, O, O, sourceLen, 0, depthArg===undefined ? 1 : toInteger(depthArg));
  return A;
}});require('./_add-to-unscopables')('flatten');},{"./_add-to-unscopables":7,"./_array-species-create":18,"./_export":36,"./_flatten-into-array":41,"./_to-integer":119,"./_to-length":121,"./_to-object":122}],275:[function(require,module,exports){  'use strict';var $export=require('./_export');var $includes=require('./_array-includes')(true);$export($export.P, 'Array', {includes: function includes(el ){  return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
}});require('./_add-to-unscopables')('includes');},{"./_add-to-unscopables":7,"./_array-includes":14,"./_export":36}],276:[function(require,module,exports){var $export=require('./_export');var microtask=require('./_microtask')();var process=require('./_global').process;var isNode=require('./_cof')(process) == 'process';$export($export.G, {asap: function asap(fn){var domain=isNode && process.domain;
microtask(domain ? domain.bind(fn) : fn);
}});},{"./_cof":21,"./_export":36,"./_global":44,"./_microtask":71}],277:[function(require,module,exports){var $export=require('./_export');var cof=require('./_cof');$export($export.S, 'Error', {isError: function isError(it){  return cof(it)==='Error';
}});},{"./_cof":21,"./_export":36}],278:[function(require,module,exports){var $export=require('./_export');$export($export.G, { global: require('./_global') });},{"./_export":36,"./_global":44}],279:[function(require,module,exports){require('./_set-collection-from')('Map');},{"./_set-collection-from":100}],280:[function(require,module,exports){require('./_set-collection-of')('Map');},{"./_set-collection-of":101}],281:[function(require,module,exports){var $export=require('./_export');$export($export.P + $export.R, 'Map', { toJSON: require('./_collection-to-json')('Map') });},{"./_collection-to-json":23,"./_export":36}],282:[function(require,module,exports){var $export=require('./_export');$export($export.S, 'Math', {clamp: function clamp(x, lower, upper){  return Math.min(upper, Math.max(lower, x));
}});},{"./_export":36}],283:[function(require,module,exports){var $export=require('./_export');$export($export.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });},{"./_export":36}],284:[function(require,module,exports){var $export=require('./_export');var RAD_PER_DEG=180 / Math.PI;$export($export.S, 'Math', {degrees: function degrees(radians){  return radians * RAD_PER_DEG;
}});},{"./_export":36}],285:[function(require,module,exports){var $export=require('./_export');var scale=require('./_math-scale');var fround=require('./_math-fround');$export($export.S, 'Math', {fscale: function fscale(x, inLow, inHigh, outLow, outHigh){  return fround(scale(x, inLow, inHigh, outLow, outHigh));
}});},{"./_export":36,"./_math-fround":65,"./_math-scale":67}],286:[function(require,module,exports){var $export=require('./_export');$export($export.S, 'Math', {iaddh: function iaddh(x0, x1, y0, y1){var $x0=x0 >>> 0;var $x1=x1 >>> 0;var $y0=y0 >>> 0;
  return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
}});},{"./_export":36}],287:[function(require,module,exports){var $export=require('./_export');$export($export.S, 'Math', {imulh: function imulh(u, v){var UINT16=0xffff;var $u=+u;var $v=+v;var u0=$u & UINT16;var v0=$v & UINT16;var u1=$u >> 16;var v1=$v >> 16;var t=(u1 * v0 >>> 0) + (u0 * v0 >>> 16);
  return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
}});},{"./_export":36}],288:[function(require,module,exports){var $export=require('./_export');$export($export.S, 'Math', {isubh: function isubh(x0, x1, y0, y1){var $x0=x0 >>> 0;var $x1=x1 >>> 0;var $y0=y0 >>> 0;
  return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
}});},{"./_export":36}],289:[function(require,module,exports){var $export=require('./_export');$export($export.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });},{"./_export":36}],290:[function(require,module,exports){var $export=require('./_export');var DEG_PER_RAD=Math.PI / 180;$export($export.S, 'Math', {radians: function radians(degrees){  return degrees * DEG_PER_RAD;
}});},{"./_export":36}],291:[function(require,module,exports){var $export=require('./_export');$export($export.S, 'Math', { scale: require('./_math-scale') });},{"./_export":36,"./_math-scale":67}],292:[function(require,module,exports){var $export=require('./_export');$export($export.S, 'Math', { signbit: function signbit(x){ return (x=+x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;}});},{"./_export":36}],293:[function(require,module,exports){var $export=require('./_export');$export($export.S, 'Math', {umulh: function umulh(u, v){var UINT16=0xffff;var $u=+u;var $v=+v;var u0=$u & UINT16;var v0=$v & UINT16;var u1=$u >>> 16;var v1=$v >>> 16;var t=(u1 * v0 >>> 0) + (u0 * v0 >>> 16);
  return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
}});},{"./_export":36}],294:[function(require,module,exports){  'use strict';var $export=require('./_export');var toObject=require('./_to-object');var aFunction=require('./_a-function');var $defineProperty=require('./_object-dp');
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {__defineGetter__: function __defineGetter__(P, getter){$defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });}});},{"./_a-function":5,"./_descriptors":32,"./_export":36,"./_object-dp":75,"./_object-forced-pam":77,"./_to-object":122}],295:[function(require,module,exports){  'use strict';var $export=require('./_export');var toObject=require('./_to-object');var aFunction=require('./_a-function');var $defineProperty=require('./_object-dp');
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {__defineSetter__: function __defineSetter__(P, setter){$defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });}});},{"./_a-function":5,"./_descriptors":32,"./_export":36,"./_object-dp":75,"./_object-forced-pam":77,"./_to-object":122}],296:[function(require,module,exports){var $export=require('./_export');var $entries=require('./_object-to-array')(true);$export($export.S, 'Object', {entries: function entries(it){  return $entries(it);
}});},{"./_export":36,"./_object-to-array":87}],297:[function(require,module,exports){var $export=require('./_export');var ownKeys=require('./_own-keys');var toIObject=require('./_to-iobject');var gOPD=require('./_object-gopd');var createProperty=require('./_create-property');$export($export.S, 'Object', {getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){var O=toIObject(object);var getDesc=gOPD.f;var keys=ownKeys(O);var result={};var i=0;var key, desc;
while (keys.length > i){  desc=getDesc(O, key=keys[i++]);if(desc !== undefined) createProperty(result, key, desc);
}
  return result;
}});},{"./_create-property":27,"./_export":36,"./_object-gopd":78,"./_own-keys":88,"./_to-iobject":120}],298:[function(require,module,exports){  'use strict';var $export=require('./_export');var toObject=require('./_to-object');var toPrimitive=require('./_to-primitive');var getPrototypeOf=require('./_object-gpo');var getOwnPropertyDescriptor=require('./_object-gopd').f;
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {__lookupGetter__: function __lookupGetter__(P){var O=toObject(this);var K=toPrimitive(P, true);var D;
do {if(D=getOwnPropertyDescriptor(O, K)) return D.get;
} while (O=getPrototypeOf(O));
}});},{"./_descriptors":32,"./_export":36,"./_object-forced-pam":77,"./_object-gopd":78,"./_object-gpo":82,"./_to-object":122,"./_to-primitive":123}],299:[function(require,module,exports){  'use strict';var $export=require('./_export');var toObject=require('./_to-object');var toPrimitive=require('./_to-primitive');var getPrototypeOf=require('./_object-gpo');var getOwnPropertyDescriptor=require('./_object-gopd').f;
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {__lookupSetter__: function __lookupSetter__(P){var O=toObject(this);var K=toPrimitive(P, true);var D;
do {if(D=getOwnPropertyDescriptor(O, K)) return D.set;
} while (O=getPrototypeOf(O));
}});},{"./_descriptors":32,"./_export":36,"./_object-forced-pam":77,"./_object-gopd":78,"./_object-gpo":82,"./_to-object":122,"./_to-primitive":123}],300:[function(require,module,exports){var $export=require('./_export');var $values=require('./_object-to-array')(false);$export($export.S, 'Object', {values: function values(it){  return $values(it);
}});},{"./_export":36,"./_object-to-array":87}],301:[function(require,module,exports){  'use strict';var $export=require('./_export');var global=require('./_global');var core=require('./_core');var microtask=require('./_microtask')();var OBSERVABLE=require('./_wks')('observable');var aFunction=require('./_a-function');var anObject=require('./_an-object');var anInstance=require('./_an-instance');var redefineAll=require('./_redefine-all');var hide=require('./_hide');var forOf=require('./_for-of');var RETURN=forOf.RETURN;var getMethod=function (fn){ return fn == null ? undefined : aFunction(fn);};var cleanupSubscription=function (subscription){var cleanup=subscription._c;if(cleanup){subscription._c=undefined;
cleanup();
}};var subscriptionClosed=function (subscription){ return subscription._o===undefined;};var closeSubscription=function (subscription){if(!subscriptionClosed(subscription)){subscription._o=undefined;
cleanupSubscription(subscription);
}};var Subscription=function (observer, subscriber){anObject(observer);
this._c=undefined;
this._o=observer;
observer=new SubscriptionObserver(this);
  try{var cleanup=subscriber(observer);var subscription=cleanup;if(cleanup != null){if(typeof cleanup.unsubscribe==='function') cleanup=function (){ subscription.unsubscribe();};
  else aFunction(cleanup);
this._c=cleanup;
}}catch(e){observer.error(e);
 return;
} if(subscriptionClosed(this)) cleanupSubscription(this);};Subscription.prototype=redefineAll({}, {unsubscribe: function unsubscribe(){ closeSubscription(this);}});var SubscriptionObserver=function (subscription){this._s=subscription;};SubscriptionObserver.prototype=redefineAll({}, {next: function next(value){var subscription=this._s;if(!subscriptionClosed(subscription)){var observer=subscription._o;
  try{var m=getMethod(observer.next);if(m) return m.call(observer, value);
}catch(e){try{  closeSubscription(subscription);} finally {  throw e;}}
}},
error: function error(value){var subscription=this._s;if(subscriptionClosed(subscription)) throw value;var observer=subscription._o;
subscription._o=undefined;
try{var m=getMethod(observer.error);if(!m) throw value;
  value=m.call(observer, value);
}catch(e){  try{cleanupSubscription(subscription);
} finally {throw e;
}} cleanupSubscription(subscription);
  return value;
},
complete: function complete(value){var subscription=this._s;if(!subscriptionClosed(subscription)){var observer=subscription._o;
  subscription._o=undefined;
  try{var m=getMethod(observer.complete);
value=m ? m.call(observer, value) : undefined;
}catch(e){try{  cleanupSubscription(subscription);} finally {  throw e;}} cleanupSubscription(subscription);
 return value;
}}
});var $Observable=function Observable(subscriber){anInstance(this, $Observable, 'Observable', '_f')._f=aFunction(subscriber);};redefineAll($Observable.prototype, {subscribe: function subscribe(observer){  return new Subscription(observer, this._f);
},
forEach: function forEach(fn){var that=this;
  return new (core.Promise || global.Promise)(function (resolve, reject){  aFunction(fn);var subscription=that.subscribe({next: function (value){try{return fn(value);
}catch(e){reject(e);
  subscription.unsubscribe();
}},
error: reject,
complete: resolve
});});}});redefineAll($Observable, {from: function from(x){var C=typeof this==='function' ? this : $Observable;var method=getMethod(anObject(x)[OBSERVABLE]);if(method){var observable=anObject(method.call(x));
 return observable.constructor===C ? observable : new C(function (observer){return observable.subscribe(observer);
});}
  return new C(function (observer){var done=false;
  microtask(function (){if(!done){try{if(forOf(x, false, function (it){  observer.next(it);if(done) return RETURN;})===RETURN) return;
}catch(e){if(done) throw e;
  observer.error(e);
 return;
} observer.complete();}});
 return function (){ done=true;};
});},
of: function of(){for(var i=0, l=arguments.length, items=new Array(l); i < l;) items[i]=arguments[i++];
  return new (typeof this==='function' ? this : $Observable)(function (observer){var done=false;
  microtask(function (){if(!done){  for(var j=0; j < items.length; ++j){observer.next(items[j]);if(done) return;
} observer.complete();}});
 return function (){ done=true;};
});}});hide($Observable.prototype, OBSERVABLE, function (){ return this;});$export($export.G, { Observable: $Observable });require('./_set-species')('Observable');},{"./_a-function":5,"./_an-instance":9,"./_an-object":10,"./_core":26,"./_export":36,"./_for-of":42,"./_global":44,"./_hide":46,"./_microtask":71,"./_redefine-all":94,"./_set-species":103,"./_wks":132}],302:[function(require,module,exports){  'use strict';var $export=require('./_export');var core=require('./_core');var global=require('./_global');var speciesConstructor=require('./_species-constructor');var promiseResolve=require('./_promise-resolve');$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally){var C=speciesConstructor(this, core.Promise || global.Promise);var isFunction=typeof onFinally == 'function';
 return this.then(
isFunction ? function (x){ return promiseResolve(C, onFinally()).then(function (){ return x;});} : onFinally,
isFunction ? function (e){ return promiseResolve(C, onFinally()).then(function (){ throw e;});} : onFinally
);}});},{"./_core":26,"./_export":36,"./_global":44,"./_promise-resolve":92,"./_species-constructor":107}],303:[function(require,module,exports){  'use strict';var $export=require('./_export');var newPromiseCapability=require('./_new-promise-capability');var perform=require('./_perform');$export($export.S, 'Promise', { 'try': function (callbackfn){var promiseCapability=newPromiseCapability.f(this);var result=perform(callbackfn);
(result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
 return promiseCapability.promise;}});},{"./_export":36,"./_new-promise-capability":72,"./_perform":91}],304:[function(require,module,exports){var metadata=require('./_metadata');var anObject=require('./_an-object');var toMetaKey=metadata.key;var ordinaryDefineOwnMetadata=metadata.set;metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey){ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));}});},{"./_an-object":10,"./_metadata":70}],305:[function(require,module,exports){var metadata=require('./_metadata');var anObject=require('./_an-object');var toMetaKey=metadata.key;var getOrCreateMetadataMap=metadata.map;var store=metadata.store;metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target ){var targetKey=arguments.length < 3 ? undefined : toMetaKey(arguments[2]);var metadataMap=getOrCreateMetadataMap(anObject(target), targetKey, false);if(metadataMap===undefined || !metadataMap['delete'](metadataKey)) return false;if(metadataMap.size) return true;var targetMetadata=store.get(target);
targetMetadata['delete'](targetKey);
 return !!targetMetadata.size || store['delete'](target);}});},{"./_an-object":10,"./_metadata":70}],306:[function(require,module,exports){var Set=require('./es6.set');var from=require('./_array-from-iterable');var metadata=require('./_metadata');var anObject=require('./_an-object');var getPrototypeOf=require('./_object-gpo');var ordinaryOwnMetadataKeys=metadata.keys;var toMetaKey=metadata.key;var ordinaryMetadataKeys=function (O, P){var oKeys=ordinaryOwnMetadataKeys(O, P);var parent=getPrototypeOf(O);if(parent===null) return oKeys;var pKeys=ordinaryMetadataKeys(parent, P);
 return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;};metadata.exp({ getMetadataKeys: function getMetadataKeys(target ){ return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));}});},{"./_an-object":10,"./_array-from-iterable":13,"./_metadata":70,"./_object-gpo":82,"./es6.set":236}],307:[function(require,module,exports){var metadata=require('./_metadata');var anObject=require('./_an-object');var getPrototypeOf=require('./_object-gpo');var ordinaryHasOwnMetadata=metadata.has;var ordinaryGetOwnMetadata=metadata.get;var toMetaKey=metadata.key;var ordinaryGetMetadata=function (MetadataKey, O, P){var hasOwn=ordinaryHasOwnMetadata(MetadataKey, O, P);if(hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);var parent=getPrototypeOf(O);
 return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;};metadata.exp({ getMetadata: function getMetadata(metadataKey, target ){ return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));}});},{"./_an-object":10,"./_metadata":70,"./_object-gpo":82}],308:[function(require,module,exports){var metadata=require('./_metadata');var anObject=require('./_an-object');var ordinaryOwnMetadataKeys=metadata.keys;var toMetaKey=metadata.key;metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target ){ return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));}});},{"./_an-object":10,"./_metadata":70}],309:[function(require,module,exports){var metadata=require('./_metadata');var anObject=require('./_an-object');var ordinaryGetOwnMetadata=metadata.get;var toMetaKey=metadata.key;metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target ){ return ordinaryGetOwnMetadata(metadataKey, anObject(target)
, arguments.length < 3 ? undefined : toMetaKey(arguments[2]));}});},{"./_an-object":10,"./_metadata":70}],310:[function(require,module,exports){var metadata=require('./_metadata');var anObject=require('./_an-object');var getPrototypeOf=require('./_object-gpo');var ordinaryHasOwnMetadata=metadata.has;var toMetaKey=metadata.key;var ordinaryHasMetadata=function (MetadataKey, O, P){var hasOwn=ordinaryHasOwnMetadata(MetadataKey, O, P);if(hasOwn) return true;var parent=getPrototypeOf(O);
 return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;};metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target ){ return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));}});},{"./_an-object":10,"./_metadata":70,"./_object-gpo":82}],311:[function(require,module,exports){var metadata=require('./_metadata');var anObject=require('./_an-object');var ordinaryHasOwnMetadata=metadata.has;var toMetaKey=metadata.key;metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target ){ return ordinaryHasOwnMetadata(metadataKey, anObject(target)
, arguments.length < 3 ? undefined : toMetaKey(arguments[2]));}});},{"./_an-object":10,"./_metadata":70}],312:[function(require,module,exports){var $metadata=require('./_metadata');var anObject=require('./_an-object');var aFunction=require('./_a-function');var toMetaKey=$metadata.key;var ordinaryDefineOwnMetadata=$metadata.set;$metadata.exp({ metadata: function metadata(metadataKey, metadataValue){ return function decorator(target, targetKey){ordinaryDefineOwnMetadata(
  metadataKey, metadataValue,
  (targetKey !== undefined ? anObject : aFunction)(target),
  toMetaKey(targetKey)
  );
};}});},{"./_a-function":5,"./_an-object":10,"./_metadata":70}],313:[function(require,module,exports){require('./_set-collection-from')('Set');},{"./_set-collection-from":100}],314:[function(require,module,exports){require('./_set-collection-of')('Set');},{"./_set-collection-of":101}],315:[function(require,module,exports){var $export=require('./_export');$export($export.P + $export.R, 'Set', { toJSON: require('./_collection-to-json')('Set') });},{"./_collection-to-json":23,"./_export":36}],316:[function(require,module,exports){  'use strict';var $export=require('./_export');var $at=require('./_string-at')(true);$export($export.P, 'String', {at: function at(pos){  return $at(this, pos);
}});},{"./_export":36,"./_string-at":109}],317:[function(require,module,exports){  'use strict';var $export=require('./_export');var defined=require('./_defined');var toLength=require('./_to-length');var isRegExp=require('./_is-regexp');var getFlags=require('./_flags');var RegExpProto=RegExp.prototype;var $RegExpStringIterator=function (regexp, string){this._r=regexp;
this._s=string;};require('./_iter-create')($RegExpStringIterator, 'RegExp String', function next(){var match=this._r.exec(this._s);
 return { value: match, done: match===null };});$export($export.P, 'String', {matchAll: function matchAll(regexp){defined(this);if(!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');var S=String(this);var flags='flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp);var rx=new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
rx.lastIndex=toLength(regexp.lastIndex);
  return new $RegExpStringIterator(rx, S);
}});},{"./_defined":31,"./_export":36,"./_flags":40,"./_is-regexp":56,"./_iter-create":58,"./_to-length":121}],318:[function(require,module,exports){  'use strict';var $export=require('./_export');var $pad=require('./_string-pad');var userAgent=require('./_user-agent');var WEBKIT_BUG=/Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);$export($export.P + $export.F * WEBKIT_BUG, 'String', {padEnd: function padEnd(maxLength ){  return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
}});},{"./_export":36,"./_string-pad":112,"./_user-agent":128}],319:[function(require,module,exports){  'use strict';var $export=require('./_export');var $pad=require('./_string-pad');var userAgent=require('./_user-agent');var WEBKIT_BUG=/Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);$export($export.P + $export.F * WEBKIT_BUG, 'String', {padStart: function padStart(maxLength ){  return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
}});},{"./_export":36,"./_string-pad":112,"./_user-agent":128}],320:[function(require,module,exports){  'use strict';
require('./_string-trim')('trimLeft', function ($trim){ return function trimLeft(){  return $trim(this, 1);
};}, 'trimStart');},{"./_string-trim":114}],321:[function(require,module,exports){  'use strict';
require('./_string-trim')('trimRight', function ($trim){ return function trimRight(){  return $trim(this, 2);
};}, 'trimEnd');},{"./_string-trim":114}],322:[function(require,module,exports){require('./_wks-define')('asyncIterator');},{"./_wks-define":130}],323:[function(require,module,exports){require('./_wks-define')('observable');},{"./_wks-define":130}],324:[function(require,module,exports){var $export=require('./_export');$export($export.S, 'System', { global: require('./_global') });},{"./_export":36,"./_global":44}],325:[function(require,module,exports){require('./_set-collection-from')('WeakMap');},{"./_set-collection-from":100}],326:[function(require,module,exports){require('./_set-collection-of')('WeakMap');},{"./_set-collection-of":101}],327:[function(require,module,exports){require('./_set-collection-from')('WeakSet');},{"./_set-collection-from":100}],328:[function(require,module,exports){require('./_set-collection-of')('WeakSet');},{"./_set-collection-of":101}],329:[function(require,module,exports){var $iterators=require('./es6.array.iterator');var getKeys=require('./_object-keys');var redefine=require('./_redefine');var global=require('./_global');var hide=require('./_hide');var Iterators=require('./_iterators');var wks=require('./_wks');var ITERATOR=wks('iterator');var TO_STRING_TAG=wks('toStringTag');var ArrayValues=Iterators.Array;var DOMIterables={CSSRuleList: true,
CSSStyleDeclaration: false,
CSSValueList: false,
ClientRectList: false,
DOMRectList: false,
DOMStringList: false,
DOMTokenList: true,
DataTransferItemList: false,
FileList: false,
HTMLAllCollection: false,
HTMLCollection: false,
HTMLFormElement: false,
HTMLSelectElement: false,
MediaList: true,
MimeTypeArray: false,
NamedNodeMap: false,
NodeList: true,
PaintRequestList: false,
Plugin: false,
PluginArray: false,
SVGLengthList: false,
SVGNumberList: false,
SVGPathSegList: false,
SVGPointList: false,
SVGStringList: false,
SVGTransformList: false,
SourceBufferList: false,
StyleSheetList: true,
TextTrackCueList: false,
TextTrackList: false,
TouchList: false
};for(var collections=getKeys(DOMIterables), i=0;i<collections.length; i++){var NAME=collections[i];var explicit=DOMIterables[NAME];var Collection=global[NAME];var proto=Collection && Collection.prototype;var key;if(proto){if(!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);if(!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
Iterators[NAME]=ArrayValues;if(explicit) for(key in $iterators) if(!proto[key]) redefine(proto, key, $iterators[key], true);
}}
},{"./_global":44,"./_hide":46,"./_iterators":62,"./_object-keys":84,"./_redefine":95,"./_wks":132,"./es6.array.iterator":145}],330:[function(require,module,exports){var $export=require('./_export');var $task=require('./_task');
  $export($export.G + $export.B, {setImmediate: $task.set,
clearImmediate: $task.clear
});},{"./_export":36,"./_task":116}],331:[function(require,module,exports){var global=require('./_global');var $export=require('./_export');var userAgent=require('./_user-agent');var slice=[].slice;var MSIE=/MSIE .\./.test(userAgent);var wrap=function (set){ return function (fn, time ){var boundArgs=arguments.length > 2;var args=boundArgs ? slice.call(arguments, 2) : false;
  return set(boundArgs ? function (){  (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
} : fn, time);
};};
  $export($export.G + $export.B + $export.F * MSIE, {setTimeout: wrap(global.setTimeout),
setInterval: wrap(global.setInterval)
});},{"./_export":36,"./_global":44,"./_user-agent":128}],332:[function(require,module,exports){require('./modules/es6.symbol');
require('./modules/es6.object.create');
require('./modules/es6.object.define-property');
require('./modules/es6.object.define-properties');
require('./modules/es6.object.get-own-property-descriptor');
require('./modules/es6.object.get-prototype-of');
require('./modules/es6.object.keys');
require('./modules/es6.object.get-own-property-names');
require('./modules/es6.object.freeze');
require('./modules/es6.object.seal');
require('./modules/es6.object.prevent-extensions');
require('./modules/es6.object.is-frozen');
require('./modules/es6.object.is-sealed');
require('./modules/es6.object.is-extensible');
require('./modules/es6.object.assign');
require('./modules/es6.object.is');
require('./modules/es6.object.set-prototype-of');
require('./modules/es6.object.to-string');
require('./modules/es6.function.bind');
require('./modules/es6.function.name');
require('./modules/es6.function.has-instance');
require('./modules/es6.parse-int');
require('./modules/es6.parse-float');
require('./modules/es6.number.constructor');
require('./modules/es6.number.to-fixed');
require('./modules/es6.number.to-precision');
require('./modules/es6.number.epsilon');
require('./modules/es6.number.is-finite');
require('./modules/es6.number.is-integer');
require('./modules/es6.number.is-nan');
require('./modules/es6.number.is-safe-integer');
require('./modules/es6.number.max-safe-integer');
require('./modules/es6.number.min-safe-integer');
require('./modules/es6.number.parse-float');
require('./modules/es6.number.parse-int');
require('./modules/es6.math.acosh');
require('./modules/es6.math.asinh');
require('./modules/es6.math.atanh');
require('./modules/es6.math.cbrt');
require('./modules/es6.math.clz32');
require('./modules/es6.math.cosh');
require('./modules/es6.math.expm1');
require('./modules/es6.math.fround');
require('./modules/es6.math.hypot');
require('./modules/es6.math.imul');
require('./modules/es6.math.log10');
require('./modules/es6.math.log1p');
require('./modules/es6.math.log2');
require('./modules/es6.math.sign');
require('./modules/es6.math.sinh');
require('./modules/es6.math.tanh');
require('./modules/es6.math.trunc');
require('./modules/es6.string.from-code-point');
require('./modules/es6.string.raw');
require('./modules/es6.string.trim');
require('./modules/es6.string.iterator');
require('./modules/es6.string.code-point-at');
require('./modules/es6.string.ends-with');
require('./modules/es6.string.includes');
require('./modules/es6.string.repeat');
require('./modules/es6.string.starts-with');
require('./modules/es6.string.anchor');
require('./modules/es6.string.big');
require('./modules/es6.string.blink');
require('./modules/es6.string.bold');
require('./modules/es6.string.fixed');
require('./modules/es6.string.fontcolor');
require('./modules/es6.string.fontsize');
require('./modules/es6.string.italics');
require('./modules/es6.string.link');
require('./modules/es6.string.small');
require('./modules/es6.string.strike');
require('./modules/es6.string.sub');
require('./modules/es6.string.sup');
require('./modules/es6.date.now');
require('./modules/es6.date.to-json');
require('./modules/es6.date.to-iso-string');
require('./modules/es6.date.to-string');
require('./modules/es6.date.to-primitive');
require('./modules/es6.array.is-array');
require('./modules/es6.array.from');
require('./modules/es6.array.of');
require('./modules/es6.array.join');
require('./modules/es6.array.slice');
require('./modules/es6.array.sort');
require('./modules/es6.array.for-each');
require('./modules/es6.array.map');
require('./modules/es6.array.filter');
require('./modules/es6.array.some');
require('./modules/es6.array.every');
require('./modules/es6.array.reduce');
require('./modules/es6.array.reduce-right');
require('./modules/es6.array.index-of');
require('./modules/es6.array.last-index-of');
require('./modules/es6.array.copy-within');
require('./modules/es6.array.fill');
require('./modules/es6.array.find');
require('./modules/es6.array.find-index');
require('./modules/es6.array.species');
require('./modules/es6.array.iterator');
require('./modules/es6.regexp.constructor');
require('./modules/es6.regexp.exec');
require('./modules/es6.regexp.to-string');
require('./modules/es6.regexp.flags');
require('./modules/es6.regexp.match');
require('./modules/es6.regexp.replace');
require('./modules/es6.regexp.search');
require('./modules/es6.regexp.split');
require('./modules/es6.promise');
require('./modules/es6.map');
require('./modules/es6.set');
require('./modules/es6.weak-map');
require('./modules/es6.weak-set');
require('./modules/es6.typed.array-buffer');
require('./modules/es6.typed.data-view');
require('./modules/es6.typed.int8-array');
require('./modules/es6.typed.uint8-array');
require('./modules/es6.typed.uint8-clamped-array');
require('./modules/es6.typed.int16-array');
require('./modules/es6.typed.uint16-array');
require('./modules/es6.typed.int32-array');
require('./modules/es6.typed.uint32-array');
require('./modules/es6.typed.float32-array');
require('./modules/es6.typed.float64-array');
require('./modules/es6.reflect.apply');
require('./modules/es6.reflect.construct');
require('./modules/es6.reflect.define-property');
require('./modules/es6.reflect.delete-property');
require('./modules/es6.reflect.enumerate');
require('./modules/es6.reflect.get');
require('./modules/es6.reflect.get-own-property-descriptor');
require('./modules/es6.reflect.get-prototype-of');
require('./modules/es6.reflect.has');
require('./modules/es6.reflect.is-extensible');
require('./modules/es6.reflect.own-keys');
require('./modules/es6.reflect.prevent-extensions');
require('./modules/es6.reflect.set');
require('./modules/es6.reflect.set-prototype-of');
require('./modules/es7.array.includes');
require('./modules/es7.array.flat-map');
require('./modules/es7.array.flatten');
require('./modules/es7.string.at');
require('./modules/es7.string.pad-start');
require('./modules/es7.string.pad-end');
require('./modules/es7.string.trim-left');
require('./modules/es7.string.trim-right');
require('./modules/es7.string.match-all');
require('./modules/es7.symbol.async-iterator');
require('./modules/es7.symbol.observable');
require('./modules/es7.object.get-own-property-descriptors');
require('./modules/es7.object.values');
require('./modules/es7.object.entries');
require('./modules/es7.object.define-getter');
require('./modules/es7.object.define-setter');
require('./modules/es7.object.lookup-getter');
require('./modules/es7.object.lookup-setter');
require('./modules/es7.map.to-json');
require('./modules/es7.set.to-json');
require('./modules/es7.map.of');
require('./modules/es7.set.of');
require('./modules/es7.weak-map.of');
require('./modules/es7.weak-set.of');
require('./modules/es7.map.from');
require('./modules/es7.set.from');
require('./modules/es7.weak-map.from');
require('./modules/es7.weak-set.from');
require('./modules/es7.global');
require('./modules/es7.system.global');
require('./modules/es7.error.is-error');
require('./modules/es7.math.clamp');
require('./modules/es7.math.deg-per-rad');
require('./modules/es7.math.degrees');
require('./modules/es7.math.fscale');
require('./modules/es7.math.iaddh');
require('./modules/es7.math.isubh');
require('./modules/es7.math.imulh');
require('./modules/es7.math.rad-per-deg');
require('./modules/es7.math.radians');
require('./modules/es7.math.scale');
require('./modules/es7.math.umulh');
require('./modules/es7.math.signbit');
require('./modules/es7.promise.finally');
require('./modules/es7.promise.try');
require('./modules/es7.reflect.define-metadata');
require('./modules/es7.reflect.delete-metadata');
require('./modules/es7.reflect.get-metadata');
require('./modules/es7.reflect.get-metadata-keys');
require('./modules/es7.reflect.get-own-metadata');
require('./modules/es7.reflect.get-own-metadata-keys');
require('./modules/es7.reflect.has-metadata');
require('./modules/es7.reflect.has-own-metadata');
require('./modules/es7.reflect.metadata');
require('./modules/es7.asap');
require('./modules/es7.observable');
require('./modules/web.timers');
require('./modules/web.immediate');
require('./modules/web.dom.iterable');
  module.exports=require('./modules/_core');},{"./modules/_core":26,"./modules/es6.array.copy-within":135,"./modules/es6.array.every":136,"./modules/es6.array.fill":137,"./modules/es6.array.filter":138,"./modules/es6.array.find":140,"./modules/es6.array.find-index":139,"./modules/es6.array.for-each":141,"./modules/es6.array.from":142,"./modules/es6.array.index-of":143,"./modules/es6.array.is-array":144,"./modules/es6.array.iterator":145,"./modules/es6.array.join":146,"./modules/es6.array.last-index-of":147,"./modules/es6.array.map":148,"./modules/es6.array.of":149,"./modules/es6.array.reduce":151,"./modules/es6.array.reduce-right":150,"./modules/es6.array.slice":152,"./modules/es6.array.some":153,"./modules/es6.array.sort":154,"./modules/es6.array.species":155,"./modules/es6.date.now":156,"./modules/es6.date.to-iso-string":157,"./modules/es6.date.to-json":158,"./modules/es6.date.to-primitive":159,"./modules/es6.date.to-string":160,"./modules/es6.function.bind":161,"./modules/es6.function.has-instance":162,"./modules/es6.function.name":163,"./modules/es6.map":164,"./modules/es6.math.acosh":165,"./modules/es6.math.asinh":166,"./modules/es6.math.atanh":167,"./modules/es6.math.cbrt":168,"./modules/es6.math.clz32":169,"./modules/es6.math.cosh":170,"./modules/es6.math.expm1":171,"./modules/es6.math.fround":172,"./modules/es6.math.hypot":173,"./modules/es6.math.imul":174,"./modules/es6.math.log10":175,"./modules/es6.math.log1p":176,"./modules/es6.math.log2":177,"./modules/es6.math.sign":178,"./modules/es6.math.sinh":179,"./modules/es6.math.tanh":180,"./modules/es6.math.trunc":181,"./modules/es6.number.constructor":182,"./modules/es6.number.epsilon":183,"./modules/es6.number.is-finite":184,"./modules/es6.number.is-integer":185,"./modules/es6.number.is-nan":186,"./modules/es6.number.is-safe-integer":187,"./modules/es6.number.max-safe-integer":188,"./modules/es6.number.min-safe-integer":189,"./modules/es6.number.parse-float":190,"./modules/es6.number.parse-int":191,"./modules/es6.number.to-fixed":192,"./modules/es6.number.to-precision":193,"./modules/es6.object.assign":194,"./modules/es6.object.create":195,"./modules/es6.object.define-properties":196,"./modules/es6.object.define-property":197,"./modules/es6.object.freeze":198,"./modules/es6.object.get-own-property-descriptor":199,"./modules/es6.object.get-own-property-names":200,"./modules/es6.object.get-prototype-of":201,"./modules/es6.object.is":205,"./modules/es6.object.is-extensible":202,"./modules/es6.object.is-frozen":203,"./modules/es6.object.is-sealed":204,"./modules/es6.object.keys":206,"./modules/es6.object.prevent-extensions":207,"./modules/es6.object.seal":208,"./modules/es6.object.set-prototype-of":209,"./modules/es6.object.to-string":210,"./modules/es6.parse-float":211,"./modules/es6.parse-int":212,"./modules/es6.promise":213,"./modules/es6.reflect.apply":214,"./modules/es6.reflect.construct":215,"./modules/es6.reflect.define-property":216,"./modules/es6.reflect.delete-property":217,"./modules/es6.reflect.enumerate":218,"./modules/es6.reflect.get":221,"./modules/es6.reflect.get-own-property-descriptor":219,"./modules/es6.reflect.get-prototype-of":220,"./modules/es6.reflect.has":222,"./modules/es6.reflect.is-extensible":223,"./modules/es6.reflect.own-keys":224,"./modules/es6.reflect.prevent-extensions":225,"./modules/es6.reflect.set":227,"./modules/es6.reflect.set-prototype-of":226,"./modules/es6.regexp.constructor":228,"./modules/es6.regexp.exec":229,"./modules/es6.regexp.flags":230,"./modules/es6.regexp.match":231,"./modules/es6.regexp.replace":232,"./modules/es6.regexp.search":233,"./modules/es6.regexp.split":234,"./modules/es6.regexp.to-string":235,"./modules/es6.set":236,"./modules/es6.string.anchor":237,"./modules/es6.string.big":238,"./modules/es6.string.blink":239,"./modules/es6.string.bold":240,"./modules/es6.string.code-point-at":241,"./modules/es6.string.ends-with":242,"./modules/es6.string.fixed":243,"./modules/es6.string.fontcolor":244,"./modules/es6.string.fontsize":245,"./modules/es6.string.from-code-point":246,"./modules/es6.string.includes":247,"./modules/es6.string.italics":248,"./modules/es6.string.iterator":249,"./modules/es6.string.link":250,"./modules/es6.string.raw":251,"./modules/es6.string.repeat":252,"./modules/es6.string.small":253,"./modules/es6.string.starts-with":254,"./modules/es6.string.strike":255,"./modules/es6.string.sub":256,"./modules/es6.string.sup":257,"./modules/es6.string.trim":258,"./modules/es6.symbol":259,"./modules/es6.typed.array-buffer":260,"./modules/es6.typed.data-view":261,"./modules/es6.typed.float32-array":262,"./modules/es6.typed.float64-array":263,"./modules/es6.typed.int16-array":264,"./modules/es6.typed.int32-array":265,"./modules/es6.typed.int8-array":266,"./modules/es6.typed.uint16-array":267,"./modules/es6.typed.uint32-array":268,"./modules/es6.typed.uint8-array":269,"./modules/es6.typed.uint8-clamped-array":270,"./modules/es6.weak-map":271,"./modules/es6.weak-set":272,"./modules/es7.array.flat-map":273,"./modules/es7.array.flatten":274,"./modules/es7.array.includes":275,"./modules/es7.asap":276,"./modules/es7.error.is-error":277,"./modules/es7.global":278,"./modules/es7.map.from":279,"./modules/es7.map.of":280,"./modules/es7.map.to-json":281,"./modules/es7.math.clamp":282,"./modules/es7.math.deg-per-rad":283,"./modules/es7.math.degrees":284,"./modules/es7.math.fscale":285,"./modules/es7.math.iaddh":286,"./modules/es7.math.imulh":287,"./modules/es7.math.isubh":288,"./modules/es7.math.rad-per-deg":289,"./modules/es7.math.radians":290,"./modules/es7.math.scale":291,"./modules/es7.math.signbit":292,"./modules/es7.math.umulh":293,"./modules/es7.object.define-getter":294,"./modules/es7.object.define-setter":295,"./modules/es7.object.entries":296,"./modules/es7.object.get-own-property-descriptors":297,"./modules/es7.object.lookup-getter":298,"./modules/es7.object.lookup-setter":299,"./modules/es7.object.values":300,"./modules/es7.observable":301,"./modules/es7.promise.finally":302,"./modules/es7.promise.try":303,"./modules/es7.reflect.define-metadata":304,"./modules/es7.reflect.delete-metadata":305,"./modules/es7.reflect.get-metadata":307,"./modules/es7.reflect.get-metadata-keys":306,"./modules/es7.reflect.get-own-metadata":309,"./modules/es7.reflect.get-own-metadata-keys":308,"./modules/es7.reflect.has-metadata":310,"./modules/es7.reflect.has-own-metadata":311,"./modules/es7.reflect.metadata":312,"./modules/es7.set.from":313,"./modules/es7.set.of":314,"./modules/es7.set.to-json":315,"./modules/es7.string.at":316,"./modules/es7.string.match-all":317,"./modules/es7.string.pad-end":318,"./modules/es7.string.pad-start":319,"./modules/es7.string.trim-left":320,"./modules/es7.string.trim-right":321,"./modules/es7.symbol.async-iterator":322,"./modules/es7.symbol.observable":323,"./modules/es7.system.global":324,"./modules/es7.weak-map.from":325,"./modules/es7.weak-map.of":326,"./modules/es7.weak-set.from":327,"./modules/es7.weak-set.of":328,"./modules/web.dom.iterable":329,"./modules/web.immediate":330,"./modules/web.timers":331}],333:[function(require,module,exports){  'use strict';
  module.exports=require('./').polyfill();},{"./":334}],334:[function(require,module,exports){  (function (process,global){  
  
  (function (global, factory){typeof exports==='object' && typeof module !== 'undefined' ? module.exports=factory() :
typeof define==='function' && define.amd ? define(factory) :
(global.ES6Promise=factory());}(this, (function (){ 'use strict';function objectOrFunction(x){var type=typeof x;
 return x !== null && (type==='object' || type==='function');}
  function isFunction(x){ return typeof x==='function';}
var _isArray=void 0;if(Array.isArray){_isArray=Array.isArray;}else{_isArray=function (x){  return Object.prototype.toString.call(x)==='[object Array]';
};}
var isArray=_isArray;var len=0;var vertxNext=void 0;var customSchedulerFn=void 0;var asap=function asap(callback, arg){queue[len]=callback;
queue[len + 1]=arg;
len += 2;if(len===2){if(customSchedulerFn){  customSchedulerFn(flush);
}else{  scheduleFlush();
}}
};function setScheduler(scheduleFn){customSchedulerFn=scheduleFn;}
  function setAsap(asapFn){asap=asapFn;}
var browserWindow=typeof window !== 'undefined' ? window : undefined;var browserGlobal=browserWindow || {};var BrowserMutationObserver=browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;var isNode=typeof self==='undefined' && typeof process !== 'undefined' && {}.toString.call(process)==='[object process]';var isWorker=typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';
  function useNextTick(){ return function (){  return process.nextTick(flush);
};}
  function useVertxTimer(){if(typeof vertxNext !== 'undefined'){  return function (){  vertxNext(flush);};
}
 return useSetTimeout();}
  function useMutationObserver(){var iterations=0;var observer=new BrowserMutationObserver(flush);var node=document.createTextNode('');
observer.observe(node, { characterData: true }); return function (){node.data=iterations=++iterations % 2;
};}
  function useMessageChannel(){var channel=new MessageChannel();
channel.port1.onmessage=flush;
 return function (){  return channel.port2.postMessage(0);
};}
  function useSetTimeout(){var globalSetTimeout=setTimeout;
 return function (){  return globalSetTimeout(flush, 1);
};}
var queue=new Array(1000);
  function flush(){for(var i=0;i<len; i += 2){var callback=queue[i];var arg=queue[i + 1];callback(arg);queue[i]=undefined;
queue[i + 1]=undefined;
}
len=0;}
  function attemptVertx(){  try{var vertx=Function('return this')().require('vertx');
vertxNext=vertx.runOnLoop || vertx.runOnContext;
  return useVertxTimer();
}catch(e){  return useSetTimeout();
}}
var scheduleFlush=void 0;if(isNode){scheduleFlush=useNextTick();}else if(BrowserMutationObserver){scheduleFlush=useMutationObserver();}else if(isWorker){scheduleFlush=useMessageChannel();}else if(browserWindow===undefined && typeof require==='function'){scheduleFlush=attemptVertx();}else{scheduleFlush=useSetTimeout();}
  function then(onFulfillment, onRejection){var parent=this;var child=new this.constructor(noop);if(child[PROMISE_ID]===undefined){makePromise(child);
}
var _state=parent._state;if(_state){var callback=arguments[_state - 1];
asap(function (){ return invokeCallback(_state, child, callback, parent._result);
});}else{subscribe(parent, child, onFulfillment, onRejection);
}
 return child;}
  
  function resolve$1(object){
var Constructor=this;if(object && typeof object==='object' && object.constructor===Constructor){  return object;
}
var promise=new Constructor(noop);
resolve(promise, object);
 return promise;}
var PROMISE_ID=Math.random().toString(36).substring(2);function noop(){}
var PENDING=void 0;var FULFILLED=1;var REJECTED=2;function selfFulfillment(){ return new TypeError("You cannot resolve a promise with itself");}
  function cannotReturnOwn(){ return new TypeError('A promises callback cannot return that same promise.');}
  function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler){  try{then$$1.call(value, fulfillmentHandler, rejectionHandler);
}catch(e){  return e;
}}
  function handleForeignThenable(promise, thenable, then$$1){asap(function (promise){var sealed=false;var error=tryThen(then$$1, thenable, function (value){if(sealed){return;
}
  sealed=true;if(thenable !== value){resolve(promise, value);
}else{fulfill(promise, value);
}}, function (reason){if(sealed){return;
}
  sealed=true;reject(promise, reason);
}, 'Settle: ' + (promise._label || ' unknown promise'));if(!sealed && error){  sealed=true;
  reject(promise, error);
}}, promise);}
  function handleOwnThenable(promise, thenable){if(thenable._state===FULFILLED){fulfill(promise, thenable._result);
}else if(thenable._state===REJECTED){reject(promise, thenable._result);
}else{subscribe(thenable, undefined, function (value){ return resolve(promise, value);
}, function (reason){ return reject(promise, reason);
});}}
  function handleMaybeThenable(promise, maybeThenable, then$$1){if(maybeThenable.constructor===promise.constructor && then$$1===then && maybeThenable.constructor.resolve===resolve$1){handleOwnThenable(promise, maybeThenable);
}else{if(then$$1===undefined){  fulfill(promise, maybeThenable);
}else if(isFunction(then$$1)){  handleForeignThenable(promise, maybeThenable, then$$1);
}else{  fulfill(promise, maybeThenable);
}}
}
  function resolve(promise, value){if(promise===value){reject(promise, selfFulfillment());
}else if(objectOrFunction(value)){var then$$1=void 0;
try{  then$$1=value.then;
}catch(error){  reject(promise, error);
 return;
}
handleMaybeThenable(promise, value, then$$1);
}else{fulfill(promise, value);
}}
  function publishRejection(promise){if(promise._onerror){promise._onerror(promise._result);
}
publish(promise);}
  function fulfill(promise, value){if(promise._state !== PENDING){ return;
}
promise._result=value;
promise._state=FULFILLED;if(promise._subscribers.length !== 0){asap(publish, promise);
}}
  function reject(promise, reason){if(promise._state !== PENDING){ return;
}
promise._state=REJECTED;
promise._result=reason;  asap(publishRejection, promise);}
  function subscribe(parent, child, onFulfillment, onRejection){var _subscribers=parent._subscribers;var length=_subscribers.length;
parent._onerror=null;  _subscribers[length]=child;
_subscribers[length + FULFILLED]=onFulfillment;
_subscribers[length + REJECTED]=onRejection;if(length===0 && parent._state){asap(publish, parent);
}}
  function publish(promise){var subscribers=promise._subscribers;var settled=promise._state;if(subscribers.length===0){ return;
}
var child=void 0,
  callback=void 0,
  detail=promise._result;  for(var i=0;i<subscribers.length; i += 3){child=subscribers[i];
callback=subscribers[i + settled];if(child){  invokeCallback(settled, child, callback, detail);
}else{  callback(detail);
}}
promise._subscribers.length=0;}
  function invokeCallback(settled, promise, callback, detail){var hasCallback=isFunction(callback),
  value=void 0,
  error=void 0,
  succeeded=true;if(hasCallback){try{  value=callback(detail);
}catch(e){  succeeded=false;
  error=e;
}
if(promise===value){  reject(promise, cannotReturnOwn());
 return;
}}else{value=detail;
}
if(promise._state !== PENDING){}else if(hasCallback && succeeded){resolve(promise, value);
}else if(succeeded===false){reject(promise, error);
}else if(settled===FULFILLED){fulfill(promise, value);
}else if(settled===REJECTED){reject(promise, value);
}}
  function initializePromise(promise, resolver){  try{resolver(function resolvePromise(value){  resolve(promise, value);
}, function rejectPromise(reason){  reject(promise, reason);
});}catch(e){reject(promise, e);
}}
var id=0;
  function nextId(){ return id++;}
  function makePromise(promise){promise[PROMISE_ID]=id++;
promise._state=undefined;
promise._result=undefined;
promise._subscribers=[];}
  function validationError(){ return new Error('Array Methods must be provided an Array');}
var Enumerator=function (){function Enumerator(Constructor, input){this._instanceConstructor=Constructor;
this.promise=new Constructor(noop);if(!this.promise[PROMISE_ID]){  makePromise(this.promise);
}
if(isArray(input)){this.length=input.length;
this._remaining=input.length;this._result=new Array(this.length);if(this.length===0){fulfill(this.promise, this._result);
}else{this.length=this.length || 0;
  this._enumerate(input);if(this._remaining===0){  fulfill(this.promise, this._result);}}
}else{  reject(this.promise, validationError());
}}
Enumerator.prototype._enumerate=function _enumerate(input){for(var i=0; this._state===PENDING && i < input.length; i++){this._eachEntry(input[i], i);
}};  Enumerator.prototype._eachEntry=function _eachEntry(entry, i){var c=this._instanceConstructor;var resolve$$1=c.resolve;if(resolve$$1===resolve$1){var _then=void 0;var error=void 0;var didError=false;
  try{_then=entry.then;
}catch(e){didError=true;
error=e;
}
if(_then===then && entry._state !== PENDING){this._settledAt(entry._state, i, entry._result);
}else if(typeof _then !== 'function'){this._remaining--;
  this._result[i]=entry;
}else if(c===Promise$1){var promise=new c(noop);if(didError){  reject(promise, error);}else{  handleMaybeThenable(promise, entry, _then);}
  this._willSettleAt(promise, i);
}else{this._willSettleAt(new c(function (resolve$$1){ return resolve$$1(entry);}), i);
}}else{this._willSettleAt(resolve$$1(entry), i);
}};  Enumerator.prototype._settledAt=function _settledAt(state, i, value){var promise=this.promise;if(promise._state===PENDING){this._remaining--;if(state===REJECTED){reject(promise, value);
}else{this._result[i]=value;
}}
if(this._remaining===0){  fulfill(promise, this._result);
}};  Enumerator.prototype._willSettleAt=function _willSettleAt(promise, i){var enumerator=this;subscribe(promise, undefined, function (value){ return enumerator._settledAt(FULFILLED, i, value);
}, function (reason){ return enumerator._settledAt(REJECTED, i, reason);
});}; return Enumerator;}();
  function all(entries){ return new Enumerator(this, entries).promise;}
  
  function race(entries){
var Constructor=this;if(!isArray(entries)){  return new Constructor(function (_, reject){ return reject(new TypeError('You must pass an array to race.'));
});}else{  return new Constructor(function (resolve, reject){var length=entries.length;
  for(var i=0;i<length; i++){Constructor.resolve(entries[i]).then(resolve, reject);
}});}}
  
  function reject$1(reason){
var Constructor=this;var promise=new Constructor(noop);
reject(promise, reason);
 return promise;}
  function needsResolver(){throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');}
  function needsNew(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");}
var Promise$1=function (){function Promise(resolver){this[PROMISE_ID]=nextId();
this._result=this._state=undefined;
this._subscribers=[];if(noop !== resolver){  typeof resolver !== 'function' && needsResolver();
  this instanceof Promise ? initializePromise(this, resolver) : needsNew();
}}  
  
  
Promise.prototype.catch=function _catch(onRejection){  return this.then(null, onRejection);
};  
  
  
Promise.prototype.finally=function _finally(callback){var promise=this;var constructor=promise.constructor;if(isFunction(callback)){ return promise.then(function (value){return constructor.resolve(callback()).then(function (){ return value;});}, function (reason){return constructor.resolve(callback()).then(function (){  throw reason;});});}
  return promise.then(callback, callback);
}; return Promise;}();Promise$1.prototype.then=then;
  Promise$1.all=all;
  Promise$1.race=race;
  Promise$1.resolve=resolve$1;
  Promise$1.reject=reject$1;
  Promise$1._setScheduler=setScheduler;
  Promise$1._setAsap=setAsap;
  Promise$1._asap=asap;
  function polyfill(){var local=void 0;if(typeof global !== 'undefined'){local=global;
}else if(typeof self !== 'undefined'){local=self;
}else{try{  local=Function('return this')();
}catch(e){  throw new Error('polyfill failed because global object is unavailable in this environment');
}}
var P=local.Promise;if(P){var promiseToString=null;
try{  promiseToString=Object.prototype.toString.call(P.resolve());
}catch(e){}
if(promiseToString==='[object Promise]' && !P.cast){ return;
}}
local.Promise=Promise$1;}
  Promise$1.polyfill=polyfill;
  Promise$1.Promise=Promise$1;return Promise$1;})));}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"_process":342}],335:[function(require,module,exports){var isArray=Array.isArray;var str=Object.prototype.toString;
  module.exports=isArray || function (val){ return !! val && '[object Array]' == str.call(val);};},{}],336:[function(require,module,exports){  module.exports=isFunction
  
var toString=Object.prototype.toString
  
  function isFunction (fn){var string=toString.call(fn)
 return string==='[object Function]' ||
(typeof fn==='function' && string !== '[object RegExp]') ||
(typeof window !== 'undefined' &&
 (fn===window.setTimeout ||
  fn===window.alert ||
  fn===window.confirm ||
  fn===window.prompt))
};},{}],337:[function(require,module,exports){  'use strict';
  function isObject(val){ return val != null && typeof val==='object' && Array.isArray(val)===false;}
  function isObjectObject(o){ return isObject(o)===true
&& Object.prototype.toString.call(o)==='[object Object]';}
  function isPlainObject(o){var ctor,prot;if(isObjectObject(o)===false) return false;
ctor=o.constructor;if(typeof ctor !== 'function') return false;
prot=ctor.prototype;if(isObjectObject(prot)===false) return false;if(prot.hasOwnProperty('isPrototypeOf')===false){  return false;
}
 return true;}
  module.exports=isPlainObject;},{}],338:[function(require,module,exports){  'use strict';var strValue=String.prototype.valueOf;var tryStringObject=function tryStringObject(value){  try{strValue.call(value);
return true;
}catch(e){return false;
}};var toStr=Object.prototype.toString;var strClass='[object String]';var hasToStringTag=typeof Symbol==='function' && typeof Symbol.toStringTag==='symbol';module.exports=function isString(value){if(typeof value==='string'){return true;
}
if(typeof value !== 'object'){return false;
}
  return hasToStringTag ? tryStringObject(value) : toStr.call(value)===strClass;};},{}],339:[function(require,module,exports){  (function (global){  
  ;(function (global, factory){typeof exports==='object' && typeof module !== 'undefined'
? module.exports=factory(global)
: typeof define==='function' && define.amd
? define(factory) : factory(global)
}((
typeof self !== 'undefined' ? self
: typeof window !== 'undefined' ? window
: typeof global !== 'undefined' ? global
  : this
  ), function(global){'use strict';
global=global || {};var _Base64=global.Base64;var version="2.5.1";var buffer;if(typeof module !== 'undefined' && module.exports){try{buffer=eval("require('buffer').Buffer");}catch(err){buffer=undefined;}}
var b64chars
= 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';var b64tab=function(bin){var t={};
for(var i=0, l=bin.length; i < l; i++) t[bin.charAt(i)]=i;
   return t;
}(b64chars);var fromCharCode=String.fromCharCode;var cb_utob=function(c){if(c.length < 2){var cc=c.charCodeAt(0);
 return cc < 0x80 ? c
: cc < 0x800 ? (fromCharCode(0xc0 | (cc >>> 6))
  + fromCharCode(0x80 | (cc & 0x3f)))
: (fromCharCode(0xe0 | ((cc >>> 12) & 0x0f))
 + fromCharCode(0x80 | ((cc >>>  6) & 0x3f))
 + fromCharCode(0x80 | ( cc   & 0x3f)));}else{var cc=0x10000
+ (c.charCodeAt(0) - 0xD800) * 0x400
+ (c.charCodeAt(1) - 0xDC00);
 return (fromCharCode(0xf0 | ((cc >>> 18) & 0x07))
  + fromCharCode(0x80 | ((cc >>> 12) & 0x3f))
  + fromCharCode(0x80 | ((cc >>>  6) & 0x3f))
  + fromCharCode(0x80 | ( cc   & 0x3f)));}};var re_utob=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;var utob=function(u){return u.replace(re_utob, cb_utob);};var cb_encode=function(ccc){var padlen=[0, 2, 1][ccc.length % 3],
ord=ccc.charCodeAt(0) << 16
  | ((ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8)
  | ((ccc.length > 2 ? ccc.charCodeAt(2) : 0)),
chars=[
  b64chars.charAt( ord >>> 18),
  b64chars.charAt((ord >>> 12) & 63),
  padlen >= 2 ? '=' : b64chars.charAt((ord >>> 6) & 63),
  padlen >= 1 ? '=' : b64chars.charAt(ord & 63)
];
   return chars.join('');};var btoa=global.btoa ? function(b){return global.btoa(b);
} : function(b){return b.replace(/[\s\S]{1,3}/g, cb_encode);};var _encode=buffer ?
buffer.from && Uint8Array && buffer.from !== Uint8Array.from
? function (u){return (u.constructor===buffer.constructor ? u : buffer.from(u))
.toString('base64')
}
:  function (u){return (u.constructor===buffer.constructor ? u : new  buffer(u))
.toString('base64')
}
: function (u){ return btoa(utob(u)) }
;var encode=function(u, urisafe){return !urisafe
  ? _encode(String(u))
  : _encode(String(u)).replace(/[+\/]/g, function(m0){return m0 == '+' ? '-' : '_';}).replace(/=/g, '');};var encodeURI=function(u){ return encode(u, true) };var re_btou=new RegExp([
'[\xC0-\xDF][\x80-\xBF]',
'[\xE0-\xEF][\x80-\xBF]{2}',
'[\xF0-\xF7][\x80-\xBF]{3}'
].join('|'), 'g');var cb_btou=function(cccc){switch(cccc.length){case 4:
  var cp=((0x07 & cccc.charCodeAt(0)) << 18)
|((0x3f & cccc.charCodeAt(1)) << 12)
|((0x3f & cccc.charCodeAt(2)) <<  6)
| (0x3f & cccc.charCodeAt(3)),
  offset=cp - 0x10000;
 return (fromCharCode((offset  >>> 10) + 0xD800)
  + fromCharCode((offset & 0x3FF) + 0xDC00));
case 3:
 return fromCharCode(
((0x0f & cccc.charCodeAt(0)) << 12)
  | ((0x3f & cccc.charCodeAt(1)) << 6)
  |  (0x3f & cccc.charCodeAt(2))
);
default:
 return  fromCharCode(
((0x1f & cccc.charCodeAt(0)) << 6)
  |  (0x3f & cccc.charCodeAt(1))
);}};var btou=function(b){return b.replace(re_btou, cb_btou);};var cb_decode=function(cccc){var len=cccc.length,
padlen=len % 4,
n=(len > 0 ? b64tab[cccc.charAt(0)] << 18 : 0)
  | (len > 1 ? b64tab[cccc.charAt(1)] << 12 : 0)
  | (len > 2 ? b64tab[cccc.charAt(2)] <<  6 : 0)
  | (len > 3 ? b64tab[cccc.charAt(3)] : 0),
chars=[
  fromCharCode( n >>> 16),
  fromCharCode((n >>>  8) & 0xff),
  fromCharCode( n   & 0xff)
];
chars.length -= [0, 0, 2, 1][padlen];
   return chars.join('');};var _atob=global.atob ? function(a){return global.atob(a);
} : function(a){return a.replace(/\S{1,4}/g, cb_decode);};var atob=function(a){return _atob(String(a).replace(/[^A-Za-z0-9\+\/]/g, ''));};var _decode=buffer ?
buffer.from && Uint8Array && buffer.from !== Uint8Array.from
? function(a){return (a.constructor===buffer.constructor
  ? a : buffer.from(a, 'base64')).toString();}
: function(a){return (a.constructor===buffer.constructor
  ? a : new buffer(a, 'base64')).toString();}
: function(a){ return btou(_atob(a)) };var decode=function(a){return _decode(
  String(a).replace(/[-_]/g, function(m0){ return m0 == '-' ? '+' : '/' })
.replace(/[^A-Za-z0-9\+\/]/g, '')
);};var noConflict=function(){var Base64=global.Base64;
global.Base64=_Base64;
   return Base64;};
global.Base64={VERSION: version,
atob: atob,
btoa: btoa,
fromBase64: decode,
toBase64: encode,
utob: utob,
encode: encode,
encodeURI: encodeURI,
btou: btou,
decode: decode,
noConflict: noConflict,
__buffer__: buffer};if(typeof Object.defineProperty==='function'){var noEnum=function(v){return {value:v,enumerable:false,writable:true,configurable:true};};
global.Base64.extendString=function (){Object.defineProperty(
String.prototype, 'fromBase64', noEnum(function (){return decode(this)
}));
  Object.defineProperty(
String.prototype, 'toBase64', noEnum(function (urisafe){return encode(this, urisafe)
}));
  Object.defineProperty(
String.prototype, 'toBase64URI', noEnum(function (){return encode(this, true)
}));};
}
if(global['Meteor']){Base64=global.Base64;
}
if(typeof module !== 'undefined' && module.exports){module.exports.Base64=global.Base64;
}
else if(typeof define==='function' && define.amd){define([], function(){ return global.Base64 });}
  return {Base64: global.Base64}}));}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],340:[function(require,module,exports){  (function (global){var LARGE_ARRAY_SIZE=200;var HASH_UNDEFINED='__lodash_hash_undefined__';var MAX_SAFE_INTEGER=9007199254740991;var argsTag='[object Arguments]',
arrayTag='[object Array]',
boolTag='[object Boolean]',
dateTag='[object Date]',
errorTag='[object Error]',
funcTag='[object Function]',
genTag='[object GeneratorFunction]',
mapTag='[object Map]',
numberTag='[object Number]',
objectTag='[object Object]',
promiseTag='[object Promise]',
regexpTag='[object RegExp]',
setTag='[object Set]',
stringTag='[object String]',
symbolTag='[object Symbol]',
weakMapTag='[object WeakMap]';var arrayBufferTag='[object ArrayBuffer]',
dataViewTag='[object DataView]',
float32Tag='[object Float32Array]',
float64Tag='[object Float64Array]',
int8Tag='[object Int8Array]',
int16Tag='[object Int16Array]',
int32Tag='[object Int32Array]',
uint8Tag='[object Uint8Array]',
uint8ClampedTag='[object Uint8ClampedArray]',
uint16Tag='[object Uint16Array]',
uint32Tag='[object Uint32Array]';var reRegExpChar=/[\\^$.*+?()[\]{}|]/g;var reFlags=/\w*$/;var reIsHostCtor=/^\[object .+?Constructor\]$/;var reIsUint=/^(?:0|[1-9]\d*)$/;var cloneableTags={};
  cloneableTags[argsTag]=cloneableTags[arrayTag] =
  cloneableTags[arrayBufferTag]=cloneableTags[dataViewTag] =
  cloneableTags[boolTag]=cloneableTags[dateTag] =
  cloneableTags[float32Tag]=cloneableTags[float64Tag] =
  cloneableTags[int8Tag]=cloneableTags[int16Tag] =
  cloneableTags[int32Tag]=cloneableTags[mapTag] =
  cloneableTags[numberTag]=cloneableTags[objectTag] =
  cloneableTags[regexpTag]=cloneableTags[setTag] =
  cloneableTags[stringTag]=cloneableTags[symbolTag] =
  cloneableTags[uint8Tag]=cloneableTags[uint8ClampedTag] =
  cloneableTags[uint16Tag]=cloneableTags[uint32Tag]=true;
  cloneableTags[errorTag]=cloneableTags[funcTag] =
  cloneableTags[weakMapTag]=false;var freeGlobal=typeof global == 'object' && global && global.Object===Object && global;var freeSelf=typeof self == 'object' && self && self.Object===Object && self;var root=freeGlobal || freeSelf || Function('return this')();var freeExports=typeof exports == 'object' && exports && !exports.nodeType && exports;var freeModule=freeExports && typeof module == 'object' && module && !module.nodeType && module;var moduleExports=freeModule && freeModule.exports===freeExports;
  function addMapEntry(map, pair){map.set(pair[0], pair[1]);
 return map;}
  
  function addSetEntry(set, value){set.add(value);
 return set;}
  
  function arrayEach(array, iteratee){var index=-1,
  length=array ? array.length : 0;  while (++index < length){if(iteratee(array[index], index, array)===false){  break;
}}
 return array;}
  
  function arrayPush(array, values){var index=-1,
  length=values.length,
  offset=array.length;  while (++index < length){array[offset + index]=values[index];
}
 return array;}
  
  function arrayReduce(array, iteratee, accumulator, initAccum){var index=-1,
  length=array ? array.length : 0;if(initAccum && length){accumulator=array[++index];
}
while (++index < length){accumulator=iteratee(accumulator, array[index], index, array);
}
 return accumulator;}
  
  function baseTimes(n, iteratee){var index=-1,
  result=Array(n);  while (++index < n){result[index]=iteratee(index);
}
 return result;}
  
  function getValue(object, key){ return object == null ? undefined : object[key];}
  
  function isHostObject(value){var result=false;if(value != null && typeof value.toString != 'function'){try{  result=!!(value + '');
}catch(e){}}
 return result;}
  
  function mapToArray(map){var index=-1,
  result=Array(map.size);  map.forEach(function(value, key){result[++index]=[key, value];
});
 return result;}
  
  function overArg(func, transform){ return function(arg){  return func(transform(arg));
};}
  
  function setToArray(set){var index=-1,
  result=Array(set.size);  set.forEach(function(value){result[++index]=value;
});
 return result;}
  
var arrayProto=Array.prototype,
funcProto=Function.prototype,
objectProto=Object.prototype;var coreJsData=root['__core-js_shared__'];var maskSrcKey=(function(){var uid=/[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
 return uid ? ('Symbol(src)_1.' + uid) : '';}());var funcToString=funcProto.toString;var hasOwnProperty=objectProto.hasOwnProperty;var objectToString=objectProto.toString;var reIsNative=RegExp('^' +
funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
.replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
  );var Buffer=moduleExports ? root.Buffer : undefined,
Symbol=root.Symbol,
Uint8Array=root.Uint8Array,
getPrototype=overArg(Object.getPrototypeOf, Object),
objectCreate=Object.create,
propertyIsEnumerable=objectProto.propertyIsEnumerable,
splice=arrayProto.splice;var nativeGetSymbols=Object.getOwnPropertySymbols,
nativeIsBuffer=Buffer ? Buffer.isBuffer : undefined,
nativeKeys=overArg(Object.keys, Object);var DataView=getNative(root, 'DataView'),
Map=getNative(root, 'Map'),
Promise=getNative(root, 'Promise'),
Set=getNative(root, 'Set'),
WeakMap=getNative(root, 'WeakMap'),
nativeCreate=getNative(Object, 'create');var dataViewCtorString=toSource(DataView),
mapCtorString=toSource(Map),
promiseCtorString=toSource(Promise),
setCtorString=toSource(Set),
weakMapCtorString=toSource(WeakMap);var symbolProto=Symbol ? Symbol.prototype : undefined,
symbolValueOf=symbolProto ? symbolProto.valueOf : undefined;
  function Hash(entries){var index=-1,
  length=entries ? entries.length : 0;this.clear();
while (++index < length){var entry=entries[index];
this.set(entry[0], entry[1]);
}}
  
  function hashClear(){this.__data__=nativeCreate ? nativeCreate(null) : {};}
  
  function hashDelete(key){ return this.has(key) && delete this.__data__[key];}
  
  function hashGet(key){var data=this.__data__;if(nativeCreate){var result=data[key];
  return result===HASH_UNDEFINED ? undefined : result;
}
 return hasOwnProperty.call(data, key) ? data[key] : undefined;}
  
  function hashHas(key){var data=this.__data__;
 return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);}
  
  function hashSet(key, value){var data=this.__data__;
data[key]=(nativeCreate && value===undefined) ? HASH_UNDEFINED : value;
 return this;}
  Hash.prototype.clear=hashClear;
  Hash.prototype['delete']=hashDelete;
  Hash.prototype.get=hashGet;
  Hash.prototype.has=hashHas;
  Hash.prototype.set=hashSet;
  function ListCache(entries){var index=-1,
  length=entries ? entries.length : 0;this.clear();
while (++index < length){var entry=entries[index];
this.set(entry[0], entry[1]);
}}
  
  function listCacheClear(){this.__data__=[];}
  
  function listCacheDelete(key){var data=this.__data__,
  index=assocIndexOf(data, key);if(index < 0){  return false;
}
var lastIndex=data.length - 1;if(index == lastIndex){data.pop();
}else{splice.call(data, index, 1);
}
 return true;}
  
  function listCacheGet(key){var data=this.__data__,
  index=assocIndexOf(data, key); return index < 0 ? undefined : data[index][1];}
  
  function listCacheHas(key){ return assocIndexOf(this.__data__, key) > -1;}
  
  function listCacheSet(key, value){var data=this.__data__,
  index=assocIndexOf(data, key);if(index < 0){data.push([key, value]);
}else{data[index][1]=value;
}
 return this;}
  ListCache.prototype.clear=listCacheClear;
  ListCache.prototype['delete']=listCacheDelete;
  ListCache.prototype.get=listCacheGet;
  ListCache.prototype.has=listCacheHas;
  ListCache.prototype.set=listCacheSet;
  function MapCache(entries){var index=-1,
  length=entries ? entries.length : 0;this.clear();
while (++index < length){var entry=entries[index];
this.set(entry[0], entry[1]);
}}
  
  function mapCacheClear(){this.__data__={'hash': new Hash,
'map': new (Map || ListCache),
'string': new Hash
};}
  
  function mapCacheDelete(key){ return getMapData(this, key)['delete'](key);}
  
  function mapCacheGet(key){ return getMapData(this, key).get(key);}
  
  function mapCacheHas(key){ return getMapData(this, key).has(key);}
  
  function mapCacheSet(key, value){getMapData(this, key).set(key, value);
 return this;}
  MapCache.prototype.clear=mapCacheClear;
  MapCache.prototype['delete']=mapCacheDelete;
  MapCache.prototype.get=mapCacheGet;
  MapCache.prototype.has=mapCacheHas;
  MapCache.prototype.set=mapCacheSet;
  function Stack(entries){this.__data__=new ListCache(entries);}
  
  function stackClear(){this.__data__=new ListCache;}
  
  function stackDelete(key){ return this.__data__['delete'](key);}
  
  function stackGet(key){ return this.__data__.get(key);}
  
  function stackHas(key){ return this.__data__.has(key);}
  
  function stackSet(key, value){var cache=this.__data__;if(cache instanceof ListCache){var pairs=cache.__data__;if(!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)){  pairs.push([key, value]);
 return this;
}
cache=this.__data__=new MapCache(pairs);
}
cache.set(key, value);
 return this;}
  Stack.prototype.clear=stackClear;
  Stack.prototype['delete']=stackDelete;
  Stack.prototype.get=stackGet;
  Stack.prototype.has=stackHas;
  Stack.prototype.set=stackSet;
  function arrayLikeKeys(value, inherited){var result=(isArray(value) || isArguments(value))
? baseTimes(value.length, String)
: [];var length=result.length,
  skipIndexes=!!length;  for(var key in value){if((inherited || hasOwnProperty.call(value, key)) &&
!(skipIndexes && (key == 'length' || isIndex(key, length)))){  result.push(key);
}}
 return result;}
  
  function assignValue(object, key, value){var objValue=object[key];if(!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
  (value===undefined && !(key in object))){object[key]=value;
}}
  
  function assocIndexOf(array, key){var length=array.length;
while (length--){if(eq(array[length][0], key)){ return length;
}}
 return -1;}
  
  function baseAssign(object, source){ return object && copyObject(source, keys(source), object);}
  
  function baseClone(value, isDeep, isFull, customizer, key, object, stack){var result;if(customizer){result=object ? customizer(value, key, object, stack) : customizer(value);
}
if(result !== undefined){  return result;
}
if(!isObject(value)){  return value;
}
var isArr=isArray(value);if(isArr){result=initCloneArray(value);if(!isDeep){ return copyArray(value, result);
}}else{var tag=getTag(value),
isFunc=tag == funcTag || tag == genTag;if(isBuffer(value)){ return cloneBuffer(value, isDeep);
}
if(tag == objectTag || tag == argsTag || (isFunc && !object)){if(isHostObject(value)){return object ? value : {};
}
  result=initCloneObject(isFunc ? {} : value);if(!isDeep){return copySymbols(value, baseAssign(result, value));
}}else{if(!cloneableTags[tag]){return object ? value : {};
}
  result=initCloneByTag(value, tag, baseClone, isDeep);
}}
stack || (stack=new Stack);var stacked=stack.get(value);if(stacked){  return stacked;
}
stack.set(value, result);if(!isArr){var props=isFull ? getAllKeys(value) : keys(value);
}
arrayEach(props || value, function(subValue, key){if(props){  key=subValue;
  subValue=value[key];
}
assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack));
});
 return result;}
  
  function baseCreate(proto){ return isObject(proto) ? objectCreate(proto) : {};}
  
  function baseGetAllKeys(object, keysFunc, symbolsFunc){var result=keysFunc(object);
 return isArray(object) ? result : arrayPush(result, symbolsFunc(object));}
  
  function baseGetTag(value){ return objectToString.call(value);}
  
  function baseIsNative(value){if(!isObject(value) || isMasked(value)){  return false;
}
var pattern=(isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
 return pattern.test(toSource(value));}
  
  function baseKeys(object){if(!isPrototype(object)){  return nativeKeys(object);
}
var result=[];
for(var key in Object(object)){if(hasOwnProperty.call(object, key) && key != 'constructor'){  result.push(key);
}}
 return result;}
  
  function cloneBuffer(buffer, isDeep){if(isDeep){  return buffer.slice();
}
var result=new buffer.constructor(buffer.length);
buffer.copy(result);
 return result;}
  
  function cloneArrayBuffer(arrayBuffer){var result=new arrayBuffer.constructor(arrayBuffer.byteLength);
new Uint8Array(result).set(new Uint8Array(arrayBuffer));
 return result;}
  
  function cloneDataView(dataView, isDeep){var buffer=isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
 return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);}
  
  function cloneMap(map, isDeep, cloneFunc){var array=isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
 return arrayReduce(array, addMapEntry, new map.constructor);}
  
  function cloneRegExp(regexp){var result=new regexp.constructor(regexp.source, reFlags.exec(regexp));
result.lastIndex=regexp.lastIndex;
 return result;}
  
  function cloneSet(set, isDeep, cloneFunc){var array=isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
 return arrayReduce(array, addSetEntry, new set.constructor);}
  
  function cloneSymbol(symbol){ return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};}
  
  function cloneTypedArray(typedArray, isDeep){var buffer=isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
 return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);}
  
  function copyArray(source, array){var index=-1,
  length=source.length;  array || (array=Array(length));
while (++index < length){array[index]=source[index];
}
 return array;}
  
  function copyObject(source, props, object, customizer){object || (object={});var index=-1,
  length=props.length;  while (++index < length){var key=props[index];var newValue=customizer
  ? customizer(object[key], source[key], key, object, source)
  : undefined;assignValue(object, key, newValue===undefined ? source[key] : newValue);
}
 return object;}
  
  function copySymbols(source, object){ return copyObject(source, getSymbols(source), object);}
  
  function getAllKeys(object){ return baseGetAllKeys(object, keys, getSymbols);}
  
  function getMapData(map, key){var data=map.__data__;
 return isKeyable(key)
? data[typeof key == 'string' ? 'string' : 'hash']
: data.map;}
  
  function getNative(object, key){var value=getValue(object, key);
 return baseIsNative(value) ? value : undefined;}
  
var getSymbols=nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;var getTag=baseGetTag;if((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
(Map && getTag(new Map) != mapTag) ||
(Promise && getTag(Promise.resolve()) != promiseTag) ||
(Set && getTag(new Set) != setTag) ||
(WeakMap && getTag(new WeakMap) != weakMapTag)){getTag=function(value){var result=objectToString.call(value),
Ctor=result == objectTag ? value.constructor : undefined,
ctorString=Ctor ? toSource(Ctor) : undefined;if(ctorString){  switch (ctorString){case dataViewCtorString: return dataViewTag;
case mapCtorString: return mapTag;
case promiseCtorString: return promiseTag;
case setCtorString: return setTag;
case weakMapCtorString: return weakMapTag;
}}
  return result;
};}
  
  function initCloneArray(array){var length=array.length,
  result=array.constructor(length);if(length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')){result.index=array.index;
result.input=array.input;
}
 return result;}
  
  function initCloneObject(object){ return (typeof object.constructor == 'function' && !isPrototype(object))
? baseCreate(getPrototype(object))
: {};}
  
  function initCloneByTag(object, tag, cloneFunc, isDeep){var Ctor=object.constructor;
switch (tag){case arrayBufferTag:
 return cloneArrayBuffer(object);  case boolTag:
case dateTag:
 return new Ctor(+object);  case dataViewTag:
 return cloneDataView(object, isDeep);  case float32Tag: case float64Tag:
case int8Tag: case int16Tag: case int32Tag:
case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
 return cloneTypedArray(object, isDeep);  case mapTag:
 return cloneMap(object, isDeep, cloneFunc);  case numberTag:
case stringTag:
 return new Ctor(object);  case regexpTag:
 return cloneRegExp(object);  case setTag:
 return cloneSet(object, isDeep, cloneFunc);  case symbolTag:
 return cloneSymbol(object);
}}
  
  function isIndex(value, length){length=length == null ? MAX_SAFE_INTEGER : length;
 return !!length &&
(typeof value == 'number' || reIsUint.test(value)) &&
(value > -1 && value % 1 == 0 && value < length);}
  
  function isKeyable(value){var type=typeof value;
 return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
? (value !== '__proto__')
: (value===null);}
  
  function isMasked(func){ return !!maskSrcKey && (maskSrcKey in func);}
  
  function isPrototype(value){var Ctor=value && value.constructor,
  proto=(typeof Ctor == 'function' && Ctor.prototype) || objectProto; return value===proto;}
  
  function toSource(func){if(func != null){try{ return funcToString.call(func);
}catch(e){}
try{ return (func + '');
}catch(e){}}
 return '';}
  
  function cloneDeep(value){ return baseClone(value, true, true);}
  
  function eq(value, other){ return value===other || (value !== value && other !== other);}
  
  function isArguments(value){ return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
(!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);}
  
var isArray=Array.isArray;
  function isArrayLike(value){ return value != null && isLength(value.length) && !isFunction(value);}
  
  function isArrayLikeObject(value){ return isObjectLike(value) && isArrayLike(value);}
  
var isBuffer=nativeIsBuffer || stubFalse;
  function isFunction(value){var tag=isObject(value) ? objectToString.call(value) : '';
 return tag == funcTag || tag == genTag;}
  
  function isLength(value){ return typeof value == 'number' &&
value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;}
  
  function isObject(value){var type=typeof value;
 return !!value && (type == 'object' || type == 'function');}
  
  function isObjectLike(value){ return !!value && typeof value == 'object';}
  
  function keys(object){ return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);}
  
  function stubArray(){ return [];}
  
  function stubFalse(){ return false;}
  module.exports=cloneDeep;}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],341:[function(require,module,exports){  (function (global){var LARGE_ARRAY_SIZE=200;var HASH_UNDEFINED='__lodash_hash_undefined__';var HOT_COUNT=800,
HOT_SPAN=16;var MAX_SAFE_INTEGER=9007199254740991;var argsTag='[object Arguments]',
arrayTag='[object Array]',
asyncTag='[object AsyncFunction]',
boolTag='[object Boolean]',
dateTag='[object Date]',
errorTag='[object Error]',
funcTag='[object Function]',
genTag='[object GeneratorFunction]',
mapTag='[object Map]',
numberTag='[object Number]',
nullTag='[object Null]',
objectTag='[object Object]',
proxyTag='[object Proxy]',
regexpTag='[object RegExp]',
setTag='[object Set]',
stringTag='[object String]',
undefinedTag='[object Undefined]',
weakMapTag='[object WeakMap]';var arrayBufferTag='[object ArrayBuffer]',
dataViewTag='[object DataView]',
float32Tag='[object Float32Array]',
float64Tag='[object Float64Array]',
int8Tag='[object Int8Array]',
int16Tag='[object Int16Array]',
int32Tag='[object Int32Array]',
uint8Tag='[object Uint8Array]',
uint8ClampedTag='[object Uint8ClampedArray]',
uint16Tag='[object Uint16Array]',
uint32Tag='[object Uint32Array]';var reRegExpChar=/[\\^$.*+?()[\]{}|]/g;var reIsHostCtor=/^\[object .+?Constructor\]$/;var reIsUint=/^(?:0|[1-9]\d*)$/;var typedArrayTags={};
  typedArrayTags[float32Tag]=typedArrayTags[float64Tag] =
  typedArrayTags[int8Tag]=typedArrayTags[int16Tag] =
  typedArrayTags[int32Tag]=typedArrayTags[uint8Tag] =
  typedArrayTags[uint8ClampedTag]=typedArrayTags[uint16Tag] =
  typedArrayTags[uint32Tag]=true;
  typedArrayTags[argsTag]=typedArrayTags[arrayTag] =
  typedArrayTags[arrayBufferTag]=typedArrayTags[boolTag] =
  typedArrayTags[dataViewTag]=typedArrayTags[dateTag] =
  typedArrayTags[errorTag]=typedArrayTags[funcTag] =
  typedArrayTags[mapTag]=typedArrayTags[numberTag] =
  typedArrayTags[objectTag]=typedArrayTags[regexpTag] =
  typedArrayTags[setTag]=typedArrayTags[stringTag] =
  typedArrayTags[weakMapTag]=false;var freeGlobal=typeof global == 'object' && global && global.Object===Object && global;var freeSelf=typeof self == 'object' && self && self.Object===Object && self;var root=freeGlobal || freeSelf || Function('return this')();var freeExports=typeof exports == 'object' && exports && !exports.nodeType && exports;var freeModule=freeExports && typeof module == 'object' && module && !module.nodeType && module;var moduleExports=freeModule && freeModule.exports===freeExports;var freeProcess=moduleExports && freeGlobal.process;var nodeUtil=(function(){  try{var types=freeModule && freeModule.require && freeModule.require('util').types;if(types){ return types;
}
  return freeProcess && freeProcess.binding && freeProcess.binding('util');
}catch(e){}}());var nodeIsTypedArray=nodeUtil && nodeUtil.isTypedArray;
  function apply(func, thisArg, args){switch (args.length){case 0: return func.call(thisArg);
case 1: return func.call(thisArg, args[0]);
case 2: return func.call(thisArg, args[0], args[1]);
case 3: return func.call(thisArg, args[0], args[1], args[2]);
}
 return func.apply(thisArg, args);}
  
  function baseTimes(n, iteratee){var index=-1,
  result=Array(n);  while (++index < n){result[index]=iteratee(index);
}
 return result;}
  
  function baseUnary(func){ return function(value){  return func(value);
};}
  
  function getValue(object, key){ return object == null ? undefined : object[key];}
  
  function overArg(func, transform){ return function(arg){  return func(transform(arg));
};}
  
var arrayProto=Array.prototype,
funcProto=Function.prototype,
objectProto=Object.prototype;var coreJsData=root['__core-js_shared__'];var funcToString=funcProto.toString;var hasOwnProperty=objectProto.hasOwnProperty;var maskSrcKey=(function(){var uid=/[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
 return uid ? ('Symbol(src)_1.' + uid) : '';}());var nativeObjectToString=objectProto.toString;var objectCtorString=funcToString.call(Object);var reIsNative=RegExp('^' +
funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
.replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
  );var Buffer=moduleExports ? root.Buffer : undefined,
Symbol=root.Symbol,
Uint8Array=root.Uint8Array,
allocUnsafe=Buffer ? Buffer.allocUnsafe : undefined,
getPrototype=overArg(Object.getPrototypeOf, Object),
objectCreate=Object.create,
propertyIsEnumerable=objectProto.propertyIsEnumerable,
splice=arrayProto.splice,
symToStringTag=Symbol ? Symbol.toStringTag : undefined;var defineProperty=(function(){  try{var func=getNative(Object, 'defineProperty');
func({}, '', {});
  return func;
}catch(e){}}());var nativeIsBuffer=Buffer ? Buffer.isBuffer : undefined,
nativeMax=Math.max,
nativeNow=Date.now;var Map=getNative(root, 'Map'),
nativeCreate=getNative(Object, 'create');var baseCreate=(function(){function object(){}
 return function(proto){if(!isObject(proto)){ return {};
}
if(objectCreate){ return objectCreate(proto);
}
object.prototype=proto;var result=new object;
object.prototype=undefined;
  return result;
};}());
  function Hash(entries){var index=-1,
  length=entries == null ? 0 : entries.length;this.clear();
while (++index < length){var entry=entries[index];
this.set(entry[0], entry[1]);
}}
  
  function hashClear(){this.__data__=nativeCreate ? nativeCreate(null) : {};
this.size=0;}
  
  function hashDelete(key){var result=this.has(key) && delete this.__data__[key];
this.size -= result ? 1 : 0;
 return result;}
  
  function hashGet(key){var data=this.__data__;if(nativeCreate){var result=data[key];
  return result===HASH_UNDEFINED ? undefined : result;
}
 return hasOwnProperty.call(data, key) ? data[key] : undefined;}
  
  function hashHas(key){var data=this.__data__;
 return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);}
  
  function hashSet(key, value){var data=this.__data__;
this.size += this.has(key) ? 0 : 1;
data[key]=(nativeCreate && value===undefined) ? HASH_UNDEFINED : value;
 return this;}
  Hash.prototype.clear=hashClear;
  Hash.prototype['delete']=hashDelete;
  Hash.prototype.get=hashGet;
  Hash.prototype.has=hashHas;
  Hash.prototype.set=hashSet;
  function ListCache(entries){var index=-1,
  length=entries == null ? 0 : entries.length;this.clear();
while (++index < length){var entry=entries[index];
this.set(entry[0], entry[1]);
}}
  
  function listCacheClear(){this.__data__=[];
this.size=0;}
  
  function listCacheDelete(key){var data=this.__data__,
  index=assocIndexOf(data, key);if(index < 0){  return false;
}
var lastIndex=data.length - 1;if(index == lastIndex){data.pop();
}else{splice.call(data, index, 1);
}
--this.size;
 return true;}
  
  function listCacheGet(key){var data=this.__data__,
  index=assocIndexOf(data, key); return index < 0 ? undefined : data[index][1];}
  
  function listCacheHas(key){ return assocIndexOf(this.__data__, key) > -1;}
  
  function listCacheSet(key, value){var data=this.__data__,
  index=assocIndexOf(data, key);if(index < 0){++this.size;
data.push([key, value]);
}else{data[index][1]=value;
}
 return this;}
  ListCache.prototype.clear=listCacheClear;
  ListCache.prototype['delete']=listCacheDelete;
  ListCache.prototype.get=listCacheGet;
  ListCache.prototype.has=listCacheHas;
  ListCache.prototype.set=listCacheSet;
  function MapCache(entries){var index=-1,
  length=entries == null ? 0 : entries.length;this.clear();
while (++index < length){var entry=entries[index];
this.set(entry[0], entry[1]);
}}
  
  function mapCacheClear(){this.size=0;
this.__data__={'hash': new Hash,
'map': new (Map || ListCache),
'string': new Hash
};}
  
  function mapCacheDelete(key){var result=getMapData(this, key)['delete'](key);
this.size -= result ? 1 : 0;
 return result;}
  
  function mapCacheGet(key){ return getMapData(this, key).get(key);}
  
  function mapCacheHas(key){ return getMapData(this, key).has(key);}
  
  function mapCacheSet(key, value){var data=getMapData(this, key),
  size=data.size;  data.set(key, value);
this.size += data.size == size ? 0 : 1;
 return this;}
  MapCache.prototype.clear=mapCacheClear;
  MapCache.prototype['delete']=mapCacheDelete;
  MapCache.prototype.get=mapCacheGet;
  MapCache.prototype.has=mapCacheHas;
  MapCache.prototype.set=mapCacheSet;
  function Stack(entries){var data=this.__data__=new ListCache(entries);
this.size=data.size;}
  
  function stackClear(){this.__data__=new ListCache;
this.size=0;}
  
  function stackDelete(key){var data=this.__data__,
  result=data['delete'](key);this.size=data.size;
 return result;}
  
  function stackGet(key){ return this.__data__.get(key);}
  
  function stackHas(key){ return this.__data__.has(key);}
  
  function stackSet(key, value){var data=this.__data__;if(data instanceof ListCache){var pairs=data.__data__;if(!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)){  pairs.push([key, value]);
this.size=++data.size;
 return this;
}
data=this.__data__=new MapCache(pairs);
}
data.set(key, value);
this.size=data.size;
 return this;}
  Stack.prototype.clear=stackClear;
  Stack.prototype['delete']=stackDelete;
  Stack.prototype.get=stackGet;
  Stack.prototype.has=stackHas;
  Stack.prototype.set=stackSet;
  function arrayLikeKeys(value, inherited){var isArr=isArray(value),
  isArg=!isArr && isArguments(value),
  isBuff=!isArr && !isArg && isBuffer(value),
  isType=!isArr && !isArg && !isBuff && isTypedArray(value),
  skipIndexes=isArr || isArg || isBuff || isType,
  result=skipIndexes ? baseTimes(value.length, String) : [],
  length=result.length;  for(var key in value){if((inherited || hasOwnProperty.call(value, key)) &&
!(skipIndexes && (
 key == 'length' ||
 (isBuff && (key == 'offset' || key == 'parent')) ||
 (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
 isIndex(key, length)
))){  result.push(key);
}}
 return result;}
  
  function assignMergeValue(object, key, value){if((value !== undefined && !eq(object[key], value)) ||
  (value===undefined && !(key in object))){baseAssignValue(object, key, value);
}}
  
  function assignValue(object, key, value){var objValue=object[key];if(!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
  (value===undefined && !(key in object))){baseAssignValue(object, key, value);
}}
  
  function assocIndexOf(array, key){var length=array.length;
while (length--){if(eq(array[length][0], key)){ return length;
}}
 return -1;}
  
  function baseAssignValue(object, key, value){if(key == '__proto__' && defineProperty){defineProperty(object, key, {  'configurable': true,
  'enumerable': true,
  'value': value,
  'writable': true
});}else{object[key]=value;
}}
  
var baseFor=createBaseFor();
  function baseGetTag(value){if(value == null){  return value===undefined ? undefinedTag : nullTag;
}
 return (symToStringTag && symToStringTag in Object(value))
? getRawTag(value)
: objectToString(value);}
  
  function baseIsArguments(value){ return isObjectLike(value) && baseGetTag(value) == argsTag;}
  
  function baseIsNative(value){if(!isObject(value) || isMasked(value)){  return false;
}
var pattern=isFunction(value) ? reIsNative : reIsHostCtor;
 return pattern.test(toSource(value));}
  
  function baseIsTypedArray(value){ return isObjectLike(value) &&
isLength(value.length) && !!typedArrayTags[baseGetTag(value)];}
  
  function baseKeysIn(object){if(!isObject(object)){  return nativeKeysIn(object);
}
var isProto=isPrototype(object),
  result=[];  for(var key in object){if(!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))){  result.push(key);
}}
 return result;}
  
  function baseMerge(object, source, srcIndex, customizer, stack){if(object===source){ return;
}
baseFor(source, function(srcValue, key){stack || (stack=new Stack);if(isObject(srcValue)){  baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
}
else{var newValue=customizer
? customizer(safeGet(object, key), srcValue, (key + ''), object, source, stack)
: undefined;if(newValue===undefined){newValue=srcValue;
}
  assignMergeValue(object, key, newValue);
}}, keysIn);}
  
  function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack){var objValue=safeGet(object, key),
  srcValue=safeGet(source, key),
  stacked=stack.get(srcValue);if(stacked){assignMergeValue(object, key, stacked);
 return;
}
var newValue=customizer
? customizer(objValue, srcValue, (key + ''), object, source, stack)
: undefined;var isCommon=newValue===undefined;if(isCommon){var isArr=isArray(srcValue),
isBuff=!isArr && isBuffer(srcValue),
isTyped=!isArr && !isBuff && isTypedArray(srcValue);newValue=srcValue;if(isArr || isBuff || isTyped){if(isArray(objValue)){newValue=objValue;
}
  else if(isArrayLikeObject(objValue)){newValue=copyArray(objValue);
}
  else if(isBuff){isCommon=false;
newValue=cloneBuffer(srcValue, true);
}
  else if(isTyped){isCommon=false;
newValue=cloneTypedArray(srcValue, true);
}
  else{newValue=[];
}}
else if(isPlainObject(srcValue) || isArguments(srcValue)){  newValue=objValue;if(isArguments(objValue)){newValue=toPlainObject(objValue);
}
  else if(!isObject(objValue) || isFunction(objValue)){newValue=initCloneObject(srcValue);
}}
else{  isCommon=false;
}}
if(isCommon){stack.set(srcValue, newValue);
mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
stack['delete'](srcValue);
}
assignMergeValue(object, key, newValue);}
  
  function baseRest(func, start){ return setToString(overRest(func, start, identity), func + '');}
  
var baseSetToString=!defineProperty ? identity : function(func, string){ return defineProperty(func, 'toString', {'configurable': true,
'enumerable': false,
'value': constant(string),
'writable': true
});};
  function cloneBuffer(buffer, isDeep){if(isDeep){  return buffer.slice();
}
var length=buffer.length,
  result=allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);  buffer.copy(result);
 return result;}
  
  function cloneArrayBuffer(arrayBuffer){var result=new arrayBuffer.constructor(arrayBuffer.byteLength);
new Uint8Array(result).set(new Uint8Array(arrayBuffer));
 return result;}
  
  function cloneTypedArray(typedArray, isDeep){var buffer=isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
 return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);}
  
  function copyArray(source, array){var index=-1,
  length=source.length;  array || (array=Array(length));
while (++index < length){array[index]=source[index];
}
 return array;}
  
  function copyObject(source, props, object, customizer){var isNew=!object;
object || (object={});var index=-1,
  length=props.length;  while (++index < length){var key=props[index];var newValue=customizer
  ? customizer(object[key], source[key], key, object, source)
  : undefined;if(newValue===undefined){  newValue=source[key];
}
if(isNew){  baseAssignValue(object, key, newValue);
}else{  assignValue(object, key, newValue);
}}
 return object;}
  
  function createAssigner(assigner){ return baseRest(function(object, sources){var index=-1,
length=sources.length,
customizer=length > 1 ? sources[length - 1] : undefined,
guard=length > 2 ? sources[2] : undefined;customizer=(assigner.length > 3 && typeof customizer == 'function')
  ? (length--, customizer)
  : undefined;if(guard && isIterateeCall(sources[0], sources[1], guard)){  customizer=length < 3 ? undefined : customizer;
  length=1;
}
object=Object(object);
while (++index < length){var source=sources[index];if(source){assigner(object, source, index, customizer);
}}
  return object;
});}
  
  function createBaseFor(fromRight){ return function(object, iteratee, keysFunc){var index=-1,
iterable=Object(object),
props=keysFunc(object),
length=props.length;while (length--){var key=props[fromRight ? length : ++index];if(iteratee(iterable[key], key, iterable)===false){break;
}}
  return object;
};}
  
  function getMapData(map, key){var data=map.__data__;
 return isKeyable(key)
? data[typeof key == 'string' ? 'string' : 'hash']
: data.map;}
  
  function getNative(object, key){var value=getValue(object, key);
 return baseIsNative(value) ? value : undefined;}
  
  function getRawTag(value){var isOwn=hasOwnProperty.call(value, symToStringTag),
  tag=value[symToStringTag];try{value[symToStringTag]=undefined;var unmasked=true;
}catch(e){}
var result=nativeObjectToString.call(value);if(unmasked){if(isOwn){  value[symToStringTag]=tag;
}else{  delete value[symToStringTag];
}}
 return result;}
  
  function initCloneObject(object){ return (typeof object.constructor == 'function' && !isPrototype(object))
? baseCreate(getPrototype(object))
: {};}
  
  function isIndex(value, length){var type=typeof value;
length=length == null ? MAX_SAFE_INTEGER : length; return !!length &&
(type == 'number' ||
  (type != 'symbol' && reIsUint.test(value))) &&
(value > -1 && value % 1 == 0 && value < length);}
  
  function isIterateeCall(value, index, object){if(!isObject(object)){  return false;
}
var type=typeof index;if(type == 'number'
? (isArrayLike(object) && isIndex(index, object.length))
: (type == 'string' && index in object)
  ){  return eq(object[index], value);
}
 return false;}
  
  function isKeyable(value){var type=typeof value;
 return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
? (value !== '__proto__')
: (value===null);}
  
  function isMasked(func){ return !!maskSrcKey && (maskSrcKey in func);}
  
  function isPrototype(value){var Ctor=value && value.constructor,
  proto=(typeof Ctor == 'function' && Ctor.prototype) || objectProto; return value===proto;}
  
  function nativeKeysIn(object){var result=[];if(object != null){for(var key in Object(object)){  result.push(key);
}}
 return result;}
  
  function objectToString(value){ return nativeObjectToString.call(value);}
  
  function overRest(func, start, transform){start=nativeMax(start===undefined ? (func.length - 1) : start, 0);
 return function(){var args=arguments,
index=-1,
length=nativeMax(args.length - start, 0),
array=Array(length);while (++index < length){  array[index]=args[start + index];
}
index=-1;var otherArgs=Array(start + 1);
while (++index < start){  otherArgs[index]=args[index];
}
otherArgs[start]=transform(array);
  return apply(func, this, otherArgs);
};}
  
  function safeGet(object, key){if(key==='constructor' && typeof object[key]==='function'){ return;
}
if(key == '__proto__'){ return;
}
 return object[key];}
  
var setToString=shortOut(baseSetToString);
  function shortOut(func){var count=0,
  lastCalled=0; return function(){var stamp=nativeNow(),
remaining=HOT_SPAN - (stamp - lastCalled);lastCalled=stamp;if(remaining > 0){if(++count >= HOT_COUNT){return arguments[0];
}}else{  count=0;
}
  return func.apply(undefined, arguments);
};}
  
  function toSource(func){if(func != null){try{ return funcToString.call(func);
}catch(e){}
try{ return (func + '');
}catch(e){}}
 return '';}
  
  function eq(value, other){ return value===other || (value !== value && other !== other);}
  
var isArguments=baseIsArguments(function(){ return arguments;}()) ? baseIsArguments : function(value){ return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
!propertyIsEnumerable.call(value, 'callee');};var isArray=Array.isArray;
  function isArrayLike(value){ return value != null && isLength(value.length) && !isFunction(value);}
  
  function isArrayLikeObject(value){ return isObjectLike(value) && isArrayLike(value);}
  
var isBuffer=nativeIsBuffer || stubFalse;
  function isFunction(value){if(!isObject(value)){  return false;
}
var tag=baseGetTag(value);
 return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;}
  
  function isLength(value){ return typeof value == 'number' &&
value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;}
  
  function isObject(value){var type=typeof value;
 return value != null && (type == 'object' || type == 'function');}
  
  function isObjectLike(value){ return value != null && typeof value == 'object';}
  
  function isPlainObject(value){if(!isObjectLike(value) || baseGetTag(value) != objectTag){  return false;
}
var proto=getPrototype(value);if(proto===null){  return true;
}
var Ctor=hasOwnProperty.call(proto, 'constructor') && proto.constructor;
 return typeof Ctor == 'function' && Ctor instanceof Ctor &&
funcToString.call(Ctor) == objectCtorString;}
  
var isTypedArray=nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
  function toPlainObject(value){ return copyObject(value, keysIn(value));}
  
  function keysIn(object){ return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);}
  
var merge=createAssigner(function(object, source, srcIndex){baseMerge(object, source, srcIndex);});
  function constant(value){ return function(){  return value;
};}
  
  function identity(value){ return value;}
  
  function stubFalse(){ return false;}
  module.exports=merge;}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],342:[function(require,module,exports){var process=module.exports={};var cachedSetTimeout;var cachedClearTimeout;function defaultSetTimout(){throw new Error('setTimeout has not been defined');}
  function defaultClearTimeout (){throw new Error('clearTimeout has not been defined');}
  (function (){try{if(typeof setTimeout==='function'){cachedSetTimeout=setTimeout;}else{cachedSetTimeout=defaultSetTimout;}}catch(e){cachedSetTimeout=defaultSetTimout;
}
try{if(typeof clearTimeout==='function'){cachedClearTimeout=clearTimeout;}else{cachedClearTimeout=defaultClearTimeout;}}catch(e){cachedClearTimeout=defaultClearTimeout;
}} ())
  function runTimeout(fun){if(cachedSetTimeout===setTimeout){return setTimeout(fun, 0);
}
if((cachedSetTimeout===defaultSetTimout || !cachedSetTimeout) && setTimeout){cachedSetTimeout=setTimeout;
   return setTimeout(fun, 0);
}
try{return cachedSetTimeout(fun, 0);
} catch(e){try{return cachedSetTimeout.call(null, fun, 0);} catch(e){return cachedSetTimeout.call(this, fun, 0);}}
  
}
  function runClearTimeout(marker){if(cachedClearTimeout===clearTimeout){return clearTimeout(marker);
}
if((cachedClearTimeout===defaultClearTimeout || !cachedClearTimeout) && clearTimeout){cachedClearTimeout=clearTimeout;
   return clearTimeout(marker);
}
try{return cachedClearTimeout(marker);
}catch(e){try{return cachedClearTimeout.call(null, marker);}catch(e){return cachedClearTimeout.call(this, marker);}}
}
var queue=[];var draining=false;var currentQueue;var queueIndex=-1;function cleanUpNextTick(){if(!draining || !currentQueue){return;
}
draining=false;if(currentQueue.length){queue=currentQueue.concat(queue);
}else{queueIndex=-1;
}
if(queue.length){drainQueue();
}}
  function drainQueue(){if(draining){return;
}
var timeout=runTimeout(cleanUpNextTick);
draining=true;var len=queue.length;
while(len){currentQueue=queue;
queue=[];
while (++queueIndex < len){if(currentQueue){currentQueue[queueIndex].run();}}
queueIndex=-1;
len=queue.length;
}
currentQueue=null;
draining=false;
runClearTimeout(timeout);}
  process.nextTick=function (fun){var args=new Array(arguments.length - 1);if(arguments.length > 1){for(var i=1; i < arguments.length; i++){args[i - 1]=arguments[i];}}
queue.push(new Item(fun, args));if(queue.length===1 && !draining){runTimeout(drainQueue);
}};
  function Item(fun, array){this.fun=fun;
this.array=array;}
  Item.prototype.run=function (){this.fun.apply(null, this.array);};
  process.title='browser';
  process.browser=true;
  process.env={};
  process.argv=[];
  process.version='';
  process.versions={};function noop(){}
  process.on=noop;
  process.addListener=noop;
  process.once=noop;
  process.off=noop;
  process.removeListener=noop;
  process.removeAllListeners=noop;
  process.emit=noop;
  process.prependListener=noop;
  process.prependOnceListener=noop;process.listeners=function (name){ return [] }
  process.binding=function (name){throw new Error('process.binding is not supported');};process.cwd=function (){ return '/' };
  process.chdir=function (dir){throw new Error('process.chdir is not supported');};
  process.umask=function(){ return 0;};},{}],343:[function(require,module,exports){  'use strict';var has=Object.prototype.hasOwnProperty
, undef;
  function decode(input){  try{  return decodeURIComponent(input.replace(/\+/g, ' '));
}catch(e){  return null;
}}
  
  function encode(input){  try{  return encodeURIComponent(input);
}catch(e){  return null;
}}
  
  function querystring(query){var parser=/([^=?&]+)=?([^&]*)/g
, result={}
, part;  while (part=parser.exec(query)){var key=decode(part[1])
  , value=decode(part[2]);if(key===null || value===null || key in result) continue;
result[key]=value;
}
 return result;}
  
  function querystringify(obj, prefix){prefix=prefix || '';var pairs=[]
, value
, key;if('string' !== typeof prefix) prefix='?';  for(key in obj){if(has.call(obj, key)){  value=obj[key];if(!value && (value===null || value===undef || isNaN(value))){value='';
}
  key=encodeURIComponent(key);
  value=encodeURIComponent(value);if(key===null || value===null) continue;
  pairs.push(key +'='+ value);
}}
 return pairs.length ? prefix + pairs.join('&') : '';}
  exports.stringify=querystringify;
  exports.parse=querystring;},{}],344:[function(require,module,exports){  (function (global){  
  
  !(function(global){"use strict";var Op=Object.prototype;var hasOwn=Op.hasOwnProperty;var undefined;var $Symbol=typeof Symbol==="function" ? Symbol : {};var iteratorSymbol=$Symbol.iterator || "@@iterator";var asyncIteratorSymbol=$Symbol.asyncIterator || "@@asyncIterator";var toStringTagSymbol=$Symbol.toStringTag || "@@toStringTag";var inModule=typeof module==="object";var runtime=global.regeneratorRuntime;if(runtime){if(inModule){  module.exports=runtime;
}
 return;
}
runtime=global.regeneratorRuntime=inModule ? module.exports : {};  function wrap(innerFn, outerFn, self, tryLocsList){var protoGenerator=outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;var generator=Object.create(protoGenerator.prototype);var context=new Context(tryLocsList || []);
generator._invoke=makeInvokeMethod(innerFn, self, context);return generator;
}
runtime.wrap=wrap;
function tryCatch(fn, obj, arg){try{ return { type: "normal", arg: fn.call(obj, arg) };
}catch(err){ return { type: "throw", arg: err };
}}
var GenStateSuspendedStart="suspendedStart";var GenStateSuspendedYield="suspendedYield";var GenStateExecuting="executing";var GenStateCompleted="completed";var ContinueSentinel={};
function Generator(){}
function GeneratorFunction(){}
function GeneratorFunctionPrototype(){}
var IteratorPrototype={};
IteratorPrototype[iteratorSymbol]=function (){  return this;
};var getProto=Object.getPrototypeOf;var NativeIteratorPrototype=getProto && getProto(getProto(values([])));if(NativeIteratorPrototype &&
  NativeIteratorPrototype !== Op &&
  hasOwn.call(NativeIteratorPrototype, iteratorSymbol)){IteratorPrototype=NativeIteratorPrototype;
}
var Gp=GeneratorFunctionPrototype.prototype =
Generator.prototype=Object.create(IteratorPrototype);
GeneratorFunction.prototype=Gp.constructor=GeneratorFunctionPrototype;
GeneratorFunctionPrototype.constructor=GeneratorFunction;
GeneratorFunctionPrototype[toStringTagSymbol] =
GeneratorFunction.displayName="GeneratorFunction";
function defineIteratorMethods(prototype){["next", "throw", "return"].forEach(function(method){  prototype[method]=function(arg){return this._invoke(method, arg);
};
});}
runtime.isGeneratorFunction=function(genFun){var ctor=typeof genFun==="function" && genFun.constructor;
  return ctor
  ? ctor===GeneratorFunction ||
(ctor.displayName || ctor.name)==="GeneratorFunction"
  : false;
};  runtime.mark=function(genFun){if(Object.setPrototypeOf){  Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
}else{  genFun.__proto__=GeneratorFunctionPrototype;if(!(toStringTagSymbol in genFun)){genFun[toStringTagSymbol]="GeneratorFunction";
}}
genFun.prototype=Object.create(Gp);
  return genFun;
};
runtime.awrap=function(arg){  return { __await: arg };
};  function AsyncIterator(generator){function invoke(method, arg, resolve, reject){var record=tryCatch(generator[method], generator, arg);if(record.type==="throw"){reject(record.arg);
}else{var result=record.arg;var value=result.value;if(value &&
  typeof value==="object" &&
  hasOwn.call(value, "__await")){ return Promise.resolve(value.__await).then(function(value){invoke("next", value, resolve, reject);
}, function(err){invoke("throw", err, resolve, reject);
});}
   return Promise.resolve(value).then(function(unwrapped){  result.value=unwrapped;
resolve(result);}, reject);
}}
if(typeof global.process==="object" && global.process.domain){  invoke=global.process.domain.bind(invoke);
}
var previousPromise;function enqueue(method, arg){  function callInvokeWithMethodAndArg(){return new Promise(function(resolve, reject){  invoke(method, arg, resolve, reject);});}
 return previousPromise =
previousPromise ? previousPromise.then(
callInvokeWithMethodAndArg,
callInvokeWithMethodAndArg
) : callInvokeWithMethodAndArg();
}
this._invoke=enqueue;
}
defineIteratorMethods(AsyncIterator.prototype);
AsyncIterator.prototype[asyncIteratorSymbol]=function (){  return this;
};
runtime.AsyncIterator=AsyncIterator;
runtime.async=function(innerFn, outerFn, self, tryLocsList){var iter=new AsyncIterator(
  wrap(innerFn, outerFn, self, tryLocsList)
  );return runtime.isGeneratorFunction(outerFn)
  ? iter
  : iter.next().then(function(result){ return result.done ? result.value : iter.next();});};  function makeInvokeMethod(innerFn, self, context){var state=GenStateSuspendedStart;return function invoke(method, arg){if(state===GenStateExecuting){throw new Error("Generator is already running");
}
if(state===GenStateCompleted){if(method==="throw"){  throw arg;}
   return doneResult();
}
  context.method=method;
  context.arg=arg;while (true){var delegate=context.delegate;if(delegate){var delegateResult=maybeInvokeDelegate(delegate, context);if(delegateResult){if(delegateResult===ContinueSentinel) continue;
 return delegateResult;
}}
if(context.method==="next"){  context.sent=context._sent=context.arg;}else if(context.method==="throw"){if(state===GenStateSuspendedStart){state=GenStateCompleted;
  throw context.arg;
}
context.dispatchException(context.arg);}else if(context.method==="return"){  context.abrupt("return", context.arg);}
state=GenStateExecuting;var record=tryCatch(innerFn, self, context);if(record.type==="normal"){  state=context.done
  ? GenStateCompleted
  : GenStateSuspendedYield;if(record.arg===ContinueSentinel){continue;
}
  return {value: record.arg,
  done: context.done
};}else if(record.type==="throw"){  state=GenStateCompleted;
context.method="throw";
context.arg=record.arg;}}};
}
function maybeInvokeDelegate(delegate, context){var method=delegate.iterator[context.method];if(method===undefined){  context.delegate=null;if(context.method==="throw"){if(delegate.iterator.return){  context.method="return";
context.arg=undefined;
maybeInvokeDelegate(delegate, context);if(context.method==="throw"){return ContinueSentinel;
}}
context.method="throw";
context.arg=new TypeError(
"The iterator does not provide a 'throw' method");
}
 return ContinueSentinel;
}
var record=tryCatch(method, delegate.iterator, context.arg);if(record.type==="throw"){  context.method="throw";
  context.arg=record.arg;
  context.delegate=null;
 return ContinueSentinel;
}
var info=record.arg;if(! info){  context.method="throw";
  context.arg=new TypeError("iterator result is not an object");
  context.delegate=null;
 return ContinueSentinel;
}
if(info.done){  context[delegate.resultName]=info.value;
  context.next=delegate.nextLoc;if(context.method !== "return"){context.method="next";
context.arg=undefined;
}}else{ return info;
}
context.delegate=null;
  return ContinueSentinel;
}
defineIteratorMethods(Gp);  Gp[toStringTagSymbol]="Generator";
Gp[iteratorSymbol]=function(){  return this;
};  Gp.toString=function(){  return "[object Generator]";
};  function pushTryEntry(locs){var entry={ tryLoc: locs[0] };if(1 in locs){  entry.catchLoc=locs[1];
}
if(2 in locs){  entry.finallyLoc=locs[2];
  entry.afterLoc=locs[3];
}
this.tryEntries.push(entry);
}
function resetTryEntry(entry){var record=entry.completion || {};
record.type="normal";
delete record.arg;
entry.completion=record;
}
function Context(tryLocsList){this.tryEntries=[{ tryLoc: "root" }];
tryLocsList.forEach(pushTryEntry, this);
this.reset(true);
}
runtime.keys=function(object){var keys=[];
for(var key in object){  keys.push(key);
}
keys.reverse();
  return function next(){  while (keys.length){var key=keys.pop();if(key in object){  next.value=key;
next.done=false;
  return next;}}
  next.done=true;
 return next;};
};  function values(iterable){if(iterable){var iteratorMethod=iterable[iteratorSymbol];if(iteratorMethod){return iteratorMethod.call(iterable);
}
if(typeof iterable.next==="function"){return iterable;
}
if(!isNaN(iterable.length)){var i=-1, next=function next(){  while (++i < iterable.length){if(hasOwn.call(iterable, i)){  next.value=iterable[i];
next.done=false;
  return next;}}
next.value=undefined;
next.done=true;return next;}; return next.next=next;
}}
  return { next: doneResult };
}
runtime.values=values;  function doneResult(){  return { value: undefined, done: true };
}
Context.prototype={constructor: Context,
  
reset: function(skipTempReset){this.prev=0;
this.next=0;
this.sent=this._sent=undefined;
this.done=false;
this.delegate=null;this.method="next";
this.arg=undefined;this.tryEntries.forEach(resetTryEntry);if(!skipTempReset){for(var name in this){if(name.charAt(0)==="t" &&
hasOwn.call(this, name) &&
!isNaN(+name.slice(1))){this[name]=undefined;
}}
}},
  
stop: function(){this.done=true;var rootEntry=this.tryEntries[0];var rootRecord=rootEntry.completion;if(rootRecord.type==="throw"){throw rootRecord.arg;
}
 return this.rval;
},
  
dispatchException: function(exception){if(this.done){throw exception;
}
var context=this;
  function handle(loc, caught){record.type="throw";
record.arg=exception;
context.next=loc;if(caught){  context.method="next";
context.arg=undefined;}
   return !! caught;
}
  for(var i=this.tryEntries.length - 1; i >= 0; --i){var entry=this.tryEntries[i];var record=entry.completion;if(entry.tryLoc==="root"){ return handle("end");}
if(entry.tryLoc <= this.prev){var hasCatch=hasOwn.call(entry, "catchLoc");var hasFinally=hasOwn.call(entry, "finallyLoc");if(hasCatch && hasFinally){if(this.prev < entry.catchLoc){ return handle(entry.catchLoc, true);}else if(this.prev < entry.finallyLoc){ return handle(entry.finallyLoc);}}else if(hasCatch){if(this.prev < entry.catchLoc){ return handle(entry.catchLoc, true);}}else if(hasFinally){if(this.prev < entry.finallyLoc){ return handle(entry.finallyLoc);}}else{throw new Error("try statement without catch or finally");
}}
}},
  
abrupt: function(type, arg){  for(var i=this.tryEntries.length - 1; i >= 0; --i){var entry=this.tryEntries[i];if(entry.tryLoc <= this.prev &&
  hasOwn.call(entry, "finallyLoc") &&
this.prev < entry.finallyLoc){var finallyEntry=entry;
break;}}
if(finallyEntry &&
(type==="break" ||
 type==="continue") &&
finallyEntry.tryLoc <= arg &&
arg <= finallyEntry.finallyLoc){finallyEntry=null;
}
var record=finallyEntry ? finallyEntry.completion : {};
  record.type=type;
  record.arg=arg;if(finallyEntry){this.method="next";
  this.next=finallyEntry.finallyLoc;
   return ContinueSentinel;
}
 return this.complete(record);
},
  
complete: function(record, afterLoc){if(record.type==="throw"){throw record.arg;
}
if(record.type==="break" ||
record.type==="continue"){this.next=record.arg;
}else if(record.type==="return"){this.rval=this.arg=record.arg;
  this.method="return";
  this.next="end";
}else if(record.type==="normal" && afterLoc){this.next=afterLoc;
}
 return ContinueSentinel;
},
  
finish: function(finallyLoc){  for(var i=this.tryEntries.length - 1; i >= 0; --i){var entry=this.tryEntries[i];if(entry.finallyLoc===finallyLoc){this.complete(entry.completion, entry.afterLoc);
resetTryEntry(entry);
  return ContinueSentinel;}}
},
  
"catch": function(tryLoc){  for(var i=this.tryEntries.length - 1; i >= 0; --i){var entry=this.tryEntries[i];if(entry.tryLoc===tryLoc){var record=entry.completion;if(record.type==="throw"){var thrown=record.arg;
  resetTryEntry(entry);
}
  return thrown;}}
  throw new Error("illegal catch attempt");
},
  
delegateYield: function(iterable, resultName, nextLoc){this.delegate={iterator: values(iterable),
resultName: resultName,
nextLoc: nextLoc
};if(this.method==="next"){this.arg=undefined;
}
 return ContinueSentinel;
}};})(
typeof global==="object" ? global :
typeof window==="object" ? window :
typeof self==="object" ? self : this
  );}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],345:[function(require,module,exports){  'use strict';
  module.exports=function required(port, protocol){protocol=protocol.split(':')[0];
port=+port;if(!port) return false;  switch (protocol){case 'http':
case 'ws':
  return port !== 80;  case 'https':
case 'wss':
  return port !== 443;  case 'ftp':
  return port !== 21;  case 'gopher':
  return port !== 70;  case 'file':
  return false;
}
 return port !== 0;};},{}],346:[function(require,module,exports){  
  
  (function (window, undefined){  
'use strict';var LIBVERSION ='0.7.20',
EMPTY='',
UNKNOWN='?',
FUNC_TYPE  ='function',
UNDEF_TYPE ='undefined',
OBJ_TYPE   ='object',
STR_TYPE   ='string',
MAJOR='major',
MODEL='model',
NAME ='name',
TYPE ='type',
VENDOR= 'vendor',
VERSION='version',
ARCHITECTURE= 'architecture',
CONSOLE='console',
MOBILE= 'mobile',
TABLET= 'tablet',
SMARTTV='smarttv',
WEARABLE   ='wearable',
EMBEDDED   ='embedded';var util={extend : function (regexes, extensions){var mergedRegexes={};
  for(var i in regexes){if(extensions[i] && extensions[i].length % 2===0){mergedRegexes[i]=extensions[i].concat(regexes[i]);
}else{mergedRegexes[i]=regexes[i];
}}
 return mergedRegexes;},
has : function (str1, str2){if(typeof str1==="string"){return str2.toLowerCase().indexOf(str1.toLowerCase()) !== -1;
}else{return false;
}},
lowerize : function (str){return str.toLowerCase();},
major : function (version){return typeof(version)===STR_TYPE ? version.replace(/[^\d\.]/g,'').split(".")[0] : undefined;},
trim : function (str){ return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');}};var mapper={  
rgx : function (ua, arrays){  
  var i=0, j, k, p, q, matches, match;
  while (i < arrays.length && !matches){var regex=arrays[i],
  props=arrays[i + 1];
j=k=0;
while (j < regex.length && !matches){matches=regex[j++].exec(ua);if(!!matches){  for(p=0; p < props.length; p++){match=matches[++k];
q=props[p];if(typeof q===OBJ_TYPE && q.length > 0){if(q.length == 2){if(typeof q[1] == FUNC_TYPE){this[q[0]]=q[1].call(this, match);
}else{this[q[0]]=q[1];
}}else if(q.length == 3){if(typeof q[1]===FUNC_TYPE && !(q[1].exec && q[1].test)){this[q[0]]=match ? q[1].call(this, match, q[2]) : undefined;
}else{this[q[0]]=match ? match.replace(q[1], q[2]) : undefined;
}}else if(q.length == 4){this[q[0]]=match ? q[3].call(this, match.replace(q[1], q[2])) : undefined;
}}else{this[q]=match ? match : undefined;
}}
}}
i += 2;}},
  
str : function (str, map){  
  for(var i in map){if(typeof map[i]===OBJ_TYPE && map[i].length > 0){for(var j=0; j < map[i].length; j++){if(util.has(map[i][j], str)){ return (i===UNKNOWN) ? undefined : i;
}}
}else if(util.has(map[i], str)){return (i===UNKNOWN) ? undefined : i;
}}
 return str;}};var maps={  
browser : {oldsafari : {version : {'1.0'   : '/8',
  '1.2'   : '/1',
  '1.3'   : '/3',
  '2.0'   : '/412',
  '2.0.2' : '/416',
  '2.0.3' : '/417',
  '2.0.4' : '/419',
  '?' : '/'
}}
},
  
device : {amazon : {model : {'Fire Phone' : ['SD', 'KF']
}},
  sprint : {model : {'Evo Shift 4G' : '7373KT'
},
vendor : {'HTC' : 'APA',
  'Sprint': 'Sprint'
}}
},
  
os : {windows : {version : {'ME'  : '4.90',
  'NT 3.11'   : 'NT3.51',
  'NT 4.0': 'NT4.0',
  '2000': 'NT 5.0',
  'XP'  : ['NT 5.1', 'NT 5.2'],
  'Vista' : 'NT 6.0',
  '7'   : 'NT 6.1',
  '8'   : 'NT 6.2',
  '8.1' : 'NT 6.3',
  '10'  : ['NT 6.4', 'NT 10.0'],
  'RT'  : 'ARM'
}}
}};var regexes={  
browser : [[
  /(opera\smini)\/([\w\.-]+)/i,
  /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i,
  /(opera).+version\/([\w\.]+)/i,
  /(opera)[\/\s]+([\w\.]+)/i
  ], [NAME, VERSION], [/(opios)[\/\s]+([\w\.]+)/i
  ], [[NAME, 'Opera Mini'], VERSION], [
  
  /\s(opr)\/([\w\.]+)/i
  ], [[NAME, 'Opera'], VERSION], [
  /(kindle)\/([\w\.]+)/i,
  /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i,
  /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i,
  /(?:ms|\()(ie)\s([\w\.]+)/i,
  /(rekonq)\/([\w\.]*)/i,
  /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon)\/([\w\.-]+)/i
  ], [NAME, VERSION], [/(konqueror)\/([\w\.]+)/i
  ], [[NAME, 'Konqueror'], VERSION], [/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i
  ], [[NAME, 'IE'], VERSION], [/(edge|edgios|edga|edg)\/((\d+)?[\w\.]+)/i
  ], [[NAME, 'Edge'], VERSION], [/(yabrowser)\/([\w\.]+)/i
  ], [[NAME, 'Yandex'], VERSION], [/(puffin)\/([\w\.]+)/i
  ], [[NAME, 'Puffin'], VERSION], [/(focus)\/([\w\.]+)/i
  ], [[NAME, 'Firefox Focus'], VERSION], [/(opt)\/([\w\.]+)/i
  ], [[NAME, 'Opera Touch'], VERSION], [/((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i
  ], [[NAME, 'UCBrowser'], VERSION], [/(comodo_dragon)\/([\w\.]+)/i
  ], [[NAME, /_/g, ' '], VERSION], [/(windowswechat qbcore)\/([\w\.]+)/i
  ], [[NAME, 'WeChat(Win) Desktop'], VERSION], [/(micromessenger)\/([\w\.]+)/i
  ], [[NAME, 'WeChat'], VERSION], [/(brave)\/([\w\.]+)/i
  ], [[NAME, 'Brave'], VERSION], [/(qqbrowserlite)\/([\w\.]+)/i
  ], [NAME, VERSION], [/(QQ)\/([\d\.]+)/i
  ], [NAME, VERSION], [
  
  /m?(qqbrowser)[\/\s]?([\w\.]+)/i
  ], [NAME, VERSION], [/(BIDUBrowser)[\/\s]?([\w\.]+)/i
  ], [NAME, VERSION], [/(2345Explorer)[\/\s]?([\w\.]+)/i
  ], [NAME, VERSION], [/(MetaSr)[\/\s]?([\w\.]+)/i
  ], [NAME], [/(LBBROWSER)/i
  ], [NAME], [
  
  /xiaomi\/miuibrowser\/([\w\.]+)/i
  ], [VERSION, [NAME, 'MIUI Browser']], [
  
  /;fbav\/([\w\.]+);/i
  ], [VERSION, [NAME, 'Facebook']], [
  
  /safari\s(line)\/([\w\.]+)/i,
  /android.+(line)\/([\w\.]+)\/iab/i
  ], [NAME, VERSION], [
  
  /headlesschrome(?:\/([\w\.]+)|\s)/i
  ], [VERSION, [NAME, 'Chrome Headless']], [
  
  /\swv\).+(chrome)\/([\w\.]+)/i
  ], [[NAME, /(.+)/, '$1 WebView'], VERSION], [/((?:oculus|samsung)browser)\/([\w\.]+)/i
  ], [[NAME, /(.+(?:g|us))(.+)/, '$1 $2'], VERSION], [
  
  /android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i
  ], [VERSION, [NAME, 'Android Browser']], [/(sailfishbrowser)\/([\w\.]+)/i
  ], [[NAME, 'Sailfish Browser'], VERSION], [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i
  ], [NAME, VERSION], [/(dolfin)\/([\w\.]+)/i
  ], [[NAME, 'Dolphin'], VERSION], [/((?:android.+)crmo|crios)\/([\w\.]+)/i
  ], [[NAME, 'Chrome'], VERSION], [/(coast)\/([\w\.]+)/i
  ], [[NAME, 'Opera Coast'], VERSION], [
  
  /fxios\/([\w\.-]+)/i
  ], [VERSION, [NAME, 'Firefox']], [
  
  /version\/([\w\.]+).+?mobile\/\w+\s(safari)/i
  ], [VERSION, [NAME, 'Mobile Safari']], [
  
  /version\/([\w\.]+).+?(mobile\s?safari|safari)/i
  ], [VERSION, NAME], [
  
  /webkit.+?(gsa)\/([\w\.]+).+?(mobile\s?safari|safari)(\/[\w\.]+)/i
  ], [[NAME, 'GSA'], VERSION], [
  
  /webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i
  ], [NAME, [VERSION, mapper.str, maps.browser.oldsafari.version]], [/(webkit|khtml)\/([\w\.]+)/i
  ], [NAME, VERSION], [
  /(navigator|netscape)\/([\w\.-]+)/i
  ], [[NAME, 'Netscape'], VERSION], [
  /(swiftfox)/i,
  /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,
  /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i,
  /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i,
  /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,
  /(links)\s\(([\w\.]+)/i,
  /(gobrowser)\/?([\w\.]*)/i,
  /(ice\s?browser)\/v?([\w\._]+)/i,
  /(mosaic)[\/\s]([\w\.]+)/i
  ], [NAME, VERSION]
],
  
cpu : [[/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i
  ],[[ARCHITECTURE, 'amd64']], [/(ia32(?=;))/i
  ],[[ARCHITECTURE, util.lowerize]], [/((?:i[346]|x)86)[;\)]/i
  ],[[ARCHITECTURE, 'ia32']], [
  /windows\s(ce|mobile);\sppc;/i
  ],[[ARCHITECTURE, 'arm']], [/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i
  ],[[ARCHITECTURE, /ower/, '', util.lowerize]], [/(sun4\w)[;\)]/i
  ],[[ARCHITECTURE, 'sparc']], [/((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+[;l]))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i
  ],[[ARCHITECTURE, util.lowerize]]
],
  
device : [[
  
  /\((ipad|playbook);[\w\s\),;-]+(rim|apple)/i
  ],[MODEL, VENDOR, [TYPE, TABLET]], [
  
  /applecoremedia\/[\w\.]+ \((ipad)/
  ],[MODEL, [VENDOR, 'Apple'], [TYPE, TABLET]], [/(apple\s{0,1}tv)/i
  ],[[MODEL, 'Apple TV'], [VENDOR, 'Apple']], [/(archos)\s(gamepad2?)/i,
  /(hp).+(touchpad)/i,
  /(hp).+(tablet)/i,
  /(kindle)\/([\w\.]+)/i,
  /\s(nook)[\w\s]+build\/(\w+)/i,
  /(dell)\s(strea[kpr\s\d]*[\dko])/i
  ], [VENDOR, MODEL, [TYPE, TABLET]], [/(kf[A-z]+)\sbuild\/.+silk\//i
  ],[MODEL, [VENDOR, 'Amazon'], [TYPE, TABLET]], [
  /(sd|kf)[0349hijorstuw]+\sbuild\/.+silk\//i
  ],[[MODEL, mapper.str, maps.device.amazon.model], [VENDOR, 'Amazon'], [TYPE, MOBILE]], [
  /android.+aft([bms])\sbuild/i
  ],[MODEL, [VENDOR, 'Amazon'], [TYPE, SMARTTV]], [
  
  /\((ip[honed|\s\w*]+);.+(apple)/i
  ],[MODEL, VENDOR, [TYPE, MOBILE]], [
  /\((ip[honed|\s\w*]+);/i
  ],[MODEL, [VENDOR, 'Apple'], [TYPE, MOBILE]], [/(blackberry)[\s-]?(\w+)/i,
  /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i,
  /(hp)\s([\w\s]+\w)/i,
  /(asus)-?(\w+)/i
  ], [VENDOR, MODEL, [TYPE, MOBILE]], [
  /\(bb10;\s(\w+)/i
  ],[MODEL, [VENDOR, 'BlackBerry'], [TYPE, MOBILE]], [
  /android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone|p00c)/i
  ],[MODEL, [VENDOR, 'Asus'], [TYPE, TABLET]], [/(sony)\s(tablet\s[ps])\sbuild\//i,
  /(sony)?(?:sgp.+)\sbuild\//i
  ],[[VENDOR, 'Sony'], [MODEL, 'Xperia Tablet'], [TYPE, TABLET]], [
  /android.+\s([c-g]\d{4}|so[-l]\w+)(?=\sbuild\/|\).+chrome\/(?![1-6]{0,1}\d\.))/i
  ],[MODEL, [VENDOR, 'Sony'], [TYPE, MOBILE]], [
  
  /\s(ouya)\s/i,
  /(nintendo)\s([wids3u]+)/i
  ], [VENDOR, MODEL, [TYPE, CONSOLE]], [
  
  /android.+;\s(shield)\sbuild/i
  ],[MODEL, [VENDOR, 'Nvidia'], [TYPE, CONSOLE]], [/(playstation\s[34portablevi]+)/i
  ],[MODEL, [VENDOR, 'Sony'], [TYPE, CONSOLE]], [/(sprint\s(\w+))/i
  ],[[VENDOR, mapper.str, maps.device.sprint.vendor], [MODEL, mapper.str, maps.device.sprint.model], [TYPE, MOBILE]], [/(htc)[;_\s-]+([\w\s]+(?=\)|\sbuild)|\w+)/i,
  /(zte)-(\w*)/i,
  /(alcatel|geeksphone|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i
  ], [VENDOR, [MODEL, /_/g, ' '], [TYPE, MOBILE]], [/(nexus\s9)/i
  ],[MODEL, [VENDOR, 'HTC'], [TYPE, TABLET]], [
  
  /d\/huawei([\w\s-]+)[;\)]/i,
  /(nexus\s6p)/i
  ],[MODEL, [VENDOR, 'Huawei'], [TYPE, MOBILE]], [/(microsoft);\s(lumia[\s\w]+)/i
  ], [VENDOR, MODEL, [TYPE, MOBILE]], [
  
  /[\s\(;](xbox(?:\sone)?)[\s\);]/i
  ],[MODEL, [VENDOR, 'Microsoft'], [TYPE, CONSOLE]], [
  /(kin\.[onetw]{3})/i
  ],[[MODEL, /\./g, ' '], [VENDOR, 'Microsoft'], [TYPE, MOBILE]], [
  /\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)[\w\s]+build\//i,
  /mot[\s-]?(\w*)/i,
  /(XT\d{3,4}) build\//i,
  /(nexus\s6)/i
  ],[MODEL, [VENDOR, 'Motorola'], [TYPE, MOBILE]], [
  /android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i
  ],[MODEL, [VENDOR, 'Motorola'], [TYPE, TABLET]], [
  
  /hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i
  ],[[VENDOR, util.trim], [MODEL, util.trim], [TYPE, SMARTTV]], [
  
  /hbbtv.+maple;(\d+)/i
  ],[[MODEL, /^/, 'SmartTV'], [VENDOR, 'Samsung'], [TYPE, SMARTTV]], [
  
  /\(dtv[\);].+(aquos)/i
  ],[MODEL, [VENDOR, 'Sharp'], [TYPE, SMARTTV]], [
  
  /android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i,
  /((SM-T\w+))/i
  ],[[VENDOR, 'Samsung'], MODEL, [TYPE, TABLET]], [
  /smart-tv.+(samsung)/i
  ], [VENDOR, [TYPE, SMARTTV], MODEL], [
  /((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i,
  /(sam[sung]*)[\s-]*(\w+-?[\w-]*)/i,
  /sec-((sgh\w+))/i
  ],[[VENDOR, 'Samsung'], MODEL, [TYPE, MOBILE]], [
  
  /sie-(\w*)/i
  ],[MODEL, [VENDOR, 'Siemens'], [TYPE, MOBILE]], [/(maemo|nokia).*(n900|lumia\s\d+)/i,
  /(nokia)[\s_-]?([\w-]*)/i
  ],[[VENDOR, 'Nokia'], MODEL, [TYPE, MOBILE]], [
  
  /android[x\d\.\s;]+\s([ab][1-7]\-?[0178a]\d\d?)/i
  ],[MODEL, [VENDOR, 'Acer'], [TYPE, TABLET]], [
  
  /android.+([vl]k\-?\d{3})\s+build/i
  ],[MODEL, [VENDOR, 'LG'], [TYPE, TABLET]], [
  /android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i
  ],[[VENDOR, 'LG'], MODEL, [TYPE, TABLET]], [
  /(lg) netcast\.tv/i
  ], [VENDOR, MODEL, [TYPE, SMARTTV]], [
  /(nexus\s[45])/i,
  /lg[e;\s\/-]+(\w*)/i,
  /android.+lg(\-?[\d\w]+)\s+build/i
  ],[MODEL, [VENDOR, 'LG'], [TYPE, MOBILE]], [/(lenovo)\s?(s(?:5000|6000)(?:[\w-]+)|tab(?:[\s\w]+))/i
  ], [VENDOR, MODEL, [TYPE, TABLET]], [
  /android.+(ideatab[a-z0-9\-\s]+)/i
  ],[MODEL, [VENDOR, 'Lenovo'], [TYPE, TABLET]], [
  /(lenovo)[_\s-]?([\w-]+)/i
  ], [VENDOR, MODEL, [TYPE, MOBILE]], [
  
  /linux;.+((jolla));/i
  ], [VENDOR, MODEL, [TYPE, MOBILE]], [/((pebble))app\/[\d\.]+\s/i
  ], [VENDOR, MODEL, [TYPE, WEARABLE]], [
  
  /android.+;\s(oppo)\s?([\w\s]+)\sbuild/i
  ], [VENDOR, MODEL, [TYPE, MOBILE]], [
  
  /crkey/i
  ],[[MODEL, 'Chromecast'], [VENDOR, 'Google']], [
  
  /android.+;\s(glass)\s\d/i
  ],[MODEL, [VENDOR, 'Google'], [TYPE, WEARABLE]], [
  
  /android.+;\s(pixel c)[\s)]/i
  ],[MODEL, [VENDOR, 'Google'], [TYPE, TABLET]], [
  
  /android.+;\s(pixel( [23])?( xl)?)[\s)]/i
  ],[MODEL, [VENDOR, 'Google'], [TYPE, MOBILE]], [
  
  /android.+;\s(\w+)\s+build\/hm\1/i,
  /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i,
  /android.+(mi[\s\-_]*(?:a\d|one|one[\s_]plus|note lte)?[\s_]*(?:\d?\w?)[\s_]*(?:plus)?)\s+build/i,
  /android.+(redmi[\s\-_]*(?:note)?(?:[\s_]*[\w\s]+))\s+build/i
  ],[[MODEL, /_/g, ' '], [VENDOR, 'Xiaomi'], [TYPE, MOBILE]], [
  /android.+(mi[\s\-_]*(?:pad)(?:[\s_]*[\w\s]+))\s+build/i
  ],[[MODEL, /_/g, ' '], [VENDOR, 'Xiaomi'], [TYPE, TABLET]], [
  /android.+;\s(m[1-5]\snote)\sbuild/i
  ],[MODEL, [VENDOR, 'Meizu'], [TYPE, MOBILE]], [
  /(mz)-([\w-]{2,})/i
  ],[[VENDOR, 'Meizu'], MODEL, [TYPE, MOBILE]], [
  
  /android.+a000(1)\s+build/i,
  /android.+oneplus\s(a\d{4})\s+build/i
  ],[MODEL, [VENDOR, 'OnePlus'], [TYPE, MOBILE]], [
  
  /android.+[;\/]\s*(RCT[\d\w]+)\s+build/i
  ],[MODEL, [VENDOR, 'RCA'], [TYPE, TABLET]], [
  
  /android.+[;\/\s]+(Venue[\d\s]{2,7})\s+build/i
  ],[MODEL, [VENDOR, 'Dell'], [TYPE, TABLET]], [
  
  /android.+[;\/]\s*(Q[T|M][\d\w]+)\s+build/i
  ],[MODEL, [VENDOR, 'Verizon'], [TYPE, TABLET]], [
  
  /android.+[;\/]\s+(Barnes[&\s]+Noble\s+|BN[RT])(V?.*)\s+build/i
  ],[[VENDOR, 'Barnes & Noble'], MODEL, [TYPE, TABLET]], [
  
  /android.+[;\/]\s+(TM\d{3}.*\b)\s+build/i
  ],[MODEL, [VENDOR, 'NuVision'], [TYPE, TABLET]], [
  
  /android.+;\s(k88)\sbuild/i
  ],[MODEL, [VENDOR, 'ZTE'], [TYPE, TABLET]], [
  
  /android.+[;\/]\s*(gen\d{3})\s+build.*49h/i
  ],[MODEL, [VENDOR, 'Swiss'], [TYPE, MOBILE]], [
  
  /android.+[;\/]\s*(zur\d{3})\s+build/i
  ],[MODEL, [VENDOR, 'Swiss'], [TYPE, TABLET]], [
  
  /android.+[;\/]\s*((Zeki)?TB.*\b)\s+build/i
  ],[MODEL, [VENDOR, 'Zeki'], [TYPE, TABLET]], [/(android).+[;\/]\s+([YR]\d{2})\s+build/i,
  /android.+[;\/]\s+(Dragon[\-\s]+Touch\s+|DT)(\w{5})\sbuild/i
  ],[[VENDOR, 'Dragon Touch'], MODEL, [TYPE, TABLET]], [
  
  /android.+[;\/]\s*(NS-?\w{0,9})\sbuild/i
  ],[MODEL, [VENDOR, 'Insignia'], [TYPE, TABLET]], [
  
  /android.+[;\/]\s*((NX|Next)-?\w{0,9})\s+build/i
  ],[MODEL, [VENDOR, 'NextBook'], [TYPE, TABLET]], [
  
  /android.+[;\/]\s*(Xtreme\_)?(V(1[045]|2[015]|30|40|60|7[05]|90))\s+build/i
  ],[[VENDOR, 'Voice'], MODEL, [TYPE, MOBILE]], [
  
  /android.+[;\/]\s*(LVTEL\-)?(V1[12])\s+build/i
  ],[[VENDOR, 'LvTel'], MODEL, [TYPE, MOBILE]], [
  
  /android.+;\s(PH-1)\s/i
  ],[MODEL, [VENDOR, 'Essential'], [TYPE, MOBILE]], [
  
  /android.+[;\/]\s*(V(100MD|700NA|7011|917G).*\b)\s+build/i
  ],[MODEL, [VENDOR, 'Envizen'], [TYPE, TABLET]], [
  
  /android.+[;\/]\s*(Le[\s\-]+Pan)[\s\-]+(\w{1,9})\s+build/i
  ], [VENDOR, MODEL, [TYPE, TABLET]], [
  
  /android.+[;\/]\s*(Trio[\s\-]*.*)\s+build/i
  ],[MODEL, [VENDOR, 'MachSpeed'], [TYPE, TABLET]], [
  
  /android.+[;\/]\s*(Trinity)[\-\s]*(T\d{3})\s+build/i
  ], [VENDOR, MODEL, [TYPE, TABLET]], [
  
  /android.+[;\/]\s*TU_(1491)\s+build/i
  ],[MODEL, [VENDOR, 'Rotor'], [TYPE, TABLET]], [
  
  /android.+(KS(.+))\s+build/i
  ],[MODEL, [VENDOR, 'Amazon'], [TYPE, TABLET]], [
  
  /android.+(Gigaset)[\s\-]+(Q\w{1,9})\s+build/i
  ], [VENDOR, MODEL, [TYPE, TABLET]], [
  
  /\s(tablet|tab)[;\/]/i,
  /\s(mobile)(?:[;\/]|\ssafari)/i
  ],[[TYPE, util.lowerize], VENDOR, MODEL], [
  
  /[\s\/\(](smart-?tv)[;\)]/i
  ],[[TYPE, SMARTTV]], [/(android[\w\.\s\-]{0,9});.+build/i
  ],[MODEL, [VENDOR, 'Generic']]
],
  
engine : [[
  
  /windows.+\sedge\/([\w\.]+)/i
  ], [VERSION, [NAME, 'EdgeHTML']], [
  
  /webkit\/537\.36.+chrome\/(?!27)/i
  ], [[NAME, 'Blink']], [/(presto)\/([\w\.]+)/i,
  /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
  /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,
  /(icab)[\/\s]([23]\.[\d\.]+)/i
  ], [NAME, VERSION], [
  
  /rv\:([\w\.]{1,9}).+(gecko)/i
  ], [VERSION, NAME]
],
  
os : [[
  /microsoft\s(windows)\s(vista|xp)/i
  ], [NAME, VERSION], [
  /(windows)\snt\s6\.2;\s(arm)/i,
  /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i,
  /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i
  ], [NAME, [VERSION, mapper.str, maps.os.windows.version]], [
  /(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i
  ], [[NAME, 'Windows'], [VERSION, mapper.str, maps.os.windows.version]], [
  /\((bb)(10);/i
  ], [[NAME, 'BlackBerry'], VERSION], [
  /(blackberry)\w*\/?([\w\.]*)/i,
  /(tizen)[\/\s]([\w\.]+)/i,
  /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|sailfish|contiki)[\/\s-]?([\w\.]*)/i
  ], [NAME, VERSION], [
  /(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]*)/i
  ], [[NAME, 'Symbian'], VERSION], [
  /\((series40);/i
  ], [NAME], [
  /mozilla.+\(mobile;.+gecko.+firefox/i
  ], [[NAME, 'Firefox OS'], VERSION], [
  /(nintendo|playstation)\s([wids34portablevu]+)/i,
  /(mint)[\/\s\(]?(\w*)/i,
  /(mageia|vectorlinux)[;\s]/i,
  /(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]*)/i,
  /(hurd|linux)\s?([\w\.]*)/i,
  /(gnu)\s?([\w\.]*)/i
  ], [NAME, VERSION], [/(cros)\s[\w]+\s([\w\.]+\w)/i
  ], [[NAME, 'Chromium OS'], VERSION],[
  /(sunos)\s?([\w\.\d]*)/i
  ], [[NAME, 'Solaris'], VERSION], [
  /\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]*)/i
  ], [NAME, VERSION],[/(haiku)\s(\w+)/i
  ], [NAME, VERSION],[
  
  /cfnetwork\/.+darwin/i,
  /ip[honead]{2,4}(?:.*os\s([\w]+)\slike\smac|;\sopera)/i
  ],[[VERSION, /_/g, '.'], [NAME, 'iOS']], [/(mac\sos\sx)\s?([\w\s\.]*)/i,
  /(macintosh|mac(?=_powerpc)\s)/i
  ], [[NAME, 'Mac OS'], [VERSION, /_/g, '.']], [
  /((?:open)?solaris)[\/\s-]?([\w\.]*)/i,
  /(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i,
  /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms|fuchsia)/i,
  /(unix)\s?([\w\.]*)/i
  ], [NAME, VERSION]
]};var UAParser=function (uastring, extensions){  
if(typeof uastring==='object'){extensions=uastring;
  uastring=undefined;}
if(!(this instanceof UAParser)){return new UAParser(uastring, extensions).getResult();}
var ua=uastring || ((window && window.navigator && window.navigator.userAgent) ? window.navigator.userAgent : EMPTY);var rgxmap=extensions ? util.extend(regexes, extensions) : regexes;this.getBrowser=function (){var browser={ name: undefined, version: undefined };
  mapper.rgx.call(browser, ua, rgxmap.browser);
  browser.major=util.major(browser.version);
 return browser;};
  this.getCPU=function (){var cpu={ architecture: undefined };
  mapper.rgx.call(cpu, ua, rgxmap.cpu);
 return cpu;};
  this.getDevice=function (){var device={ vendor: undefined, model: undefined, type: undefined };
  mapper.rgx.call(device, ua, rgxmap.device);
 return device;};
  this.getEngine=function (){var engine={ name: undefined, version: undefined };
  mapper.rgx.call(engine, ua, rgxmap.engine);
 return engine;};
  this.getOS=function (){var os={ name: undefined, version: undefined };
  mapper.rgx.call(os, ua, rgxmap.os);
 return os;};
  this.getResult=function (){return {ua: this.getUA(),
browser : this.getBrowser(),
engine  : this.getEngine(),
os: this.getOS(),
device  : this.getDevice(),
cpu : this.getCPU()};};
  this.getUA=function (){return ua;};
  this.setUA=function (uastring){ua=uastring;
 return this;};
   return this;};UAParser.VERSION=LIBVERSION;
UAParser.BROWSER={NAME: NAME,
MAJOR   : MAJOR,
VERSION : VERSION};
UAParser.CPU={ARCHITECTURE : ARCHITECTURE};
UAParser.DEVICE={MODEL   : MODEL,
VENDOR  : VENDOR,
TYPE: TYPE,
CONSOLE : CONSOLE,
MOBILE  : MOBILE,
SMARTTV : SMARTTV,
TABLET  : TABLET,
WEARABLE: WEARABLE,
EMBEDDED: EMBEDDED};
UAParser.ENGINE={NAME: NAME,
VERSION : VERSION};
UAParser.OS={NAME: NAME,
VERSION : VERSION};if(typeof(exports) !== UNDEF_TYPE){if(typeof module !== UNDEF_TYPE && module.exports){exports=module.exports=UAParser;}
exports.UAParser=UAParser;
}else{if(typeof(define)==='function' && define.amd){define(function (){return UAParser;});}else if(window){window.UAParser=UAParser;}}
var $=window && (window.jQuery || window.Zepto);if(typeof $ !== UNDEF_TYPE && !$.ua){var parser=new UAParser();
$.ua=parser.getResult();
$.ua.get=function (){return parser.getUA();};
$.ua.set=function (uastring){parser.setUA(uastring);
  var result=parser.getResult();
  for(var prop in result){$.ua[prop]=result[prop];}};
}})(typeof window==='object' ? window : this);},{}],347:[function(require,module,exports){  (function (global){  'use strict';var required=require('requires-port')
, qs=require('querystringify')
, slashes=/^[A-Za-z][A-Za-z0-9+-.]*:\/\//
, protocolre=/^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i
, whitespace='[\\x09\\x0A\\x0B\\x0C\\x0D\\x20\\xA0\\u1680\\u180E\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200A\\u202F\\u205F\\u3000\\u2028\\u2029\\uFEFF]'
, left=new RegExp('^'+ whitespace +'+');
  function trimLeft(str){ return (str ? str : '').toString().replace(left, '');}
  
var rules=[
['#', 'hash'],
['?', 'query'],
function sanitize(address){  return address.replace('\\', '/');
},
['/', 'pathname'],
['@', 'auth', 1],
[NaN, 'host', undefined, 1, 1],
[/:(\d+)$/, 'port', undefined, 1],
[NaN, 'hostname', undefined, 1, 1]
  ];var ignore={ hash: 1, query: 1 };
  function lolcation(loc){var globalVar;if(typeof window !== 'undefined') globalVar=window;
else if(typeof global !== 'undefined') globalVar=global;
else if(typeof self !== 'undefined') globalVar=self;
else globalVar={};var location=globalVar.location || {};
loc=loc || location;var finaldestination={}
, type=typeof loc
, key;if('blob:'===loc.protocol){finaldestination=new Url(unescape(loc.pathname), {});}else if('string'===type){finaldestination=new Url(loc, {});
for(key in ignore) delete finaldestination[key];
}else if('object'===type){for(key in loc){if(key in ignore) continue;
  finaldestination[key]=loc[key];
}
if(finaldestination.slashes===undefined){  finaldestination.slashes=slashes.test(loc.href);
}}
 return finaldestination;}
  function extractProtocol(address){address=trimLeft(address);var match=protocolre.exec(address); return {protocol: match[1] ? match[1].toLowerCase() : '',
slashes: !!match[2],
rest: match[3]
};}
  
  function resolve(relative, base){if(relative==='') return base;var path=(base || '/').split('/').slice(0, -1).concat(relative.split('/'))
, i=path.length
, last=path[i - 1]
, unshift=false
, up=0;  while (i--){if(path[i]==='.'){  path.splice(i, 1);
}else if(path[i]==='..'){  path.splice(i, 1);
  up++;
}else if(up){if(i===0) unshift=true;
  path.splice(i, 1);
  up--;
}}
if(unshift) path.unshift('');if(last==='.' || last==='..') path.push(''); return path.join('/');}
  
  function Url(address, location, parser){address=trimLeft(address);if(!(this instanceof Url)){  return new Url(address, location, parser);
}
var relative, extracted, parse, instruction, index, key
, instructions=rules.slice()
, type=typeof location
, url=this
, i=0;if('object' !== type && 'string' !== type){parser=location;
location=null;
}
if(parser && 'function' !== typeof parser) parser=qs.parse;  location=lolcation(location);
extracted=extractProtocol(address || '');
relative=!extracted.protocol && !extracted.slashes;
url.slashes=extracted.slashes || relative && location.slashes;
url.protocol=extracted.protocol || location.protocol || '';
address=extracted.rest;if(!extracted.slashes) instructions[3]=[/(.*)/, 'pathname'];  for(; i < instructions.length; i++){instruction=instructions[i];if(typeof instruction==='function'){  address=instruction(address);
  continue;
}
parse=instruction[0];
key=instruction[1];if(parse !== parse){  url[key]=address;
}else if('string'===typeof parse){if(~(index=address.indexOf(parse))){if('number'===typeof instruction[2]){  url[key]=address.slice(0, index);
address=address.slice(index + instruction[2]);}else{  url[key]=address.slice(index);
address=address.slice(0, index);}}
}else if((index=parse.exec(address))){  url[key]=index[1];
  address=address.slice(0, index.index);
}
url[key]=url[key] || (
  relative && instruction[3] ? location[key] || '' : ''
  );if(instruction[4]) url[key]=url[key].toLowerCase();
}
if(parser) url.query=parser(url.query);if(
  relative
&& location.slashes
&& url.pathname.charAt(0) !== '/'
&& (url.pathname !== '' || location.pathname !== '')
){url.pathname=resolve(url.pathname, location.pathname);
}
if(!required(url.port, url.protocol)){url.host=url.hostname;
url.port='';
}
url.username=url.password='';if(url.auth){instruction=url.auth.split(':');
url.username=instruction[0] || '';
url.password=instruction[1] || '';
}
url.origin=url.protocol && url.host && url.protocol !== 'file:'
? url.protocol +'//'+ url.host
: 'null';
url.href=url.toString();}
  
  function set(part, value, fn){var url=this;  switch (part){case 'query':
if('string'===typeof value && value.length){value=(fn || qs.parse)(value);
}
  url[part]=value;
  break;  case 'port':
  url[part]=value;if(!required(value, url.protocol)){url.host=url.hostname;
url[part]='';
}else if(value){url.host=url.hostname +':'+ value;
}
  break;  case 'hostname':
  url[part]=value;if(url.port) value += ':'+ url.port;
  url.host=value;
  break;  case 'host':
  url[part]=value;if(/:\d+$/.test(value)){value=value.split(':');
url.port=value.pop();
url.hostname=value.join(':');
}else{url.hostname=value;
url.port='';
}
  break;  case 'protocol':
  url.protocol=value.toLowerCase();
  url.slashes=!fn;
  break;  case 'pathname':
case 'hash':
if(value){var char=part==='pathname' ? '/' : '#';
url[part]=value.charAt(0) !== char ? char + value : value;
}else{url[part]=value;
}
  break;default:
  url[part]=value;
}
for(var i=0;i<rules.length; i++){var ins=rules[i];if(ins[4]) url[ins[1]]=url[ins[1]].toLowerCase();
}
url.origin=url.protocol && url.host && url.protocol !== 'file:'
? url.protocol +'//'+ url.host
: 'null';  url.href=url.toString(); return url;}
  
  function toString(stringify){if(!stringify || 'function' !== typeof stringify) stringify=qs.stringify;var query
, url=this
, protocol=url.protocol;if(protocol && protocol.charAt(protocol.length - 1) !== ':') protocol += ':';var result=protocol + (url.slashes ? '//' : '');if(url.username){result += url.username;if(url.password) result += ':'+ url.password;
result += '@';
}
result += url.host + url.pathname;  query='object'===typeof url.query ? stringify(url.query) : url.query;if(query) result += '?' !== query.charAt(0) ? '?'+ query : query;if(url.hash) result += url.hash; return result;}
  Url.prototype={ set: set, toString: toString };
  Url.extractProtocol=extractProtocol;
  Url.location=lolcation;
  Url.trimLeft=trimLeft;
  Url.qs=qs;module.exports=Url;}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"querystringify":343,"requires-port":345}],348:[function(require,module,exports){  (function(self){'use strict';if(self.fetch){ return
}
var support={searchParams: 'URLSearchParams' in self,
iterable: 'Symbol' in self && 'iterator' in Symbol,
blob: 'FileReader' in self && 'Blob' in self && (function(){  try{new Blob()
   return true
} catch(e){return false
}})(),
formData: 'FormData' in self,
arrayBuffer: 'ArrayBuffer' in self
}
if(support.arrayBuffer){var viewClasses=[
  '[object Int8Array]',
  '[object Uint8Array]',
  '[object Uint8ClampedArray]',
  '[object Int16Array]',
  '[object Uint16Array]',
  '[object Int32Array]',
  '[object Uint32Array]',
  '[object Float32Array]',
  '[object Float64Array]'
]
  
var isDataView=function(obj){ return obj && DataView.prototype.isPrototypeOf(obj)
}
var isArrayBufferView=ArrayBuffer.isView || function(obj){ return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
}}
function normalizeName(name){if(typeof name !== 'string'){  name=String(name)
}
if(/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)){  throw new TypeError('Invalid character in header field name')
}
  return name.toLowerCase()
}
function normalizeValue(value){if(typeof value !== 'string'){  value=String(value)
}
  return value
}
function iteratorFor(items){var iterator={  next: function(){var value=items.shift()
   return {done: value===undefined, value: value}}
}
if(support.iterable){  iterator[Symbol.iterator]=function(){return iterator
}}
  return iterator
}
function Headers(headers){this.map={}
if(headers instanceof Headers){  headers.forEach(function(value, name){this.append(name, value)
}, this)
}else if(Array.isArray(headers)){  headers.forEach(function(header){this.append(header[0], header[1])
}, this)
}else if(headers){  Object.getOwnPropertyNames(headers).forEach(function(name){this.append(name, headers[name])
}, this)
}}
Headers.prototype.append=function(name, value){name=normalizeName(name)
value=normalizeValue(value)
var oldValue=this.map[name]
this.map[name]=oldValue ? oldValue+','+value : value
}
Headers.prototype['delete']=function(name){delete this.map[normalizeName(name)]
}
Headers.prototype.get=function(name){name=normalizeName(name)
  return this.has(name) ? this.map[name] : null
}
Headers.prototype.has=function(name){  return this.map.hasOwnProperty(normalizeName(name))
}
Headers.prototype.set=function(name, value){this.map[normalizeName(name)]=normalizeValue(value)
}
Headers.prototype.forEach=function(callback, thisArg){for(var name in this.map){if(this.map.hasOwnProperty(name)){callback.call(thisArg, this.map[name], name, this)
}}
}
Headers.prototype.keys=function(){var items=[]
this.forEach(function(value, name){ items.push(name) })
  return iteratorFor(items)
}
Headers.prototype.values=function(){var items=[]
this.forEach(function(value){ items.push(value) })
  return iteratorFor(items)
}
Headers.prototype.entries=function(){var items=[]
this.forEach(function(value, name){ items.push([name, value]) })
  return iteratorFor(items)
}
if(support.iterable){Headers.prototype[Symbol.iterator]=Headers.prototype.entries
}
function consumed(body){if(body.bodyUsed){ return Promise.reject(new TypeError('Already read'))
}
body.bodyUsed=true
}
function fileReaderReady(reader){  return new Promise(function(resolve, reject){  reader.onload=function(){resolve(reader.result)
}
  reader.onerror=function(){reject(reader.error)
}})
}
function readBlobAsArrayBuffer(blob){var reader=new FileReader()
var promise=fileReaderReady(reader)
reader.readAsArrayBuffer(blob)
  return promise
}
function readBlobAsText(blob){var reader=new FileReader()
var promise=fileReaderReady(reader)
reader.readAsText(blob)
  return promise
}
function readArrayBufferAsText(buf){var view=new Uint8Array(buf)
var chars=new Array(view.length)
  
for(var i=0;i<view.length; i++){  chars[i]=String.fromCharCode(view[i])
}
  return chars.join('')
}
function bufferClone(buf){if(buf.slice){ return buf.slice(0)
}else{var view=new Uint8Array(buf.byteLength)
  view.set(new Uint8Array(buf))
 return view.buffer
}}
function Body(){this.bodyUsed=false
  
this._initBody=function(body){this._bodyInit=body
if(!body){this._bodyText=''
}else if(typeof body==='string'){this._bodyText=body
}else if(support.blob && Blob.prototype.isPrototypeOf(body)){this._bodyBlob=body
}else if(support.formData && FormData.prototype.isPrototypeOf(body)){this._bodyFormData=body
}else if(support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)){this._bodyText=body.toString()
}else if(support.arrayBuffer && support.blob && isDataView(body)){this._bodyArrayBuffer=bufferClone(body.buffer)
  this._bodyInit=new Blob([this._bodyArrayBuffer])
}else if(support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))){this._bodyArrayBuffer=bufferClone(body)
}else{throw new Error('unsupported BodyInit type')
}
if(!this.headers.get('content-type')){if(typeof body==='string'){this.headers.set('content-type', 'text/plain;charset=UTF-8')
}else if(this._bodyBlob && this._bodyBlob.type){this.headers.set('content-type', this._bodyBlob.type)
}else if(support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)){this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
}}
}
if(support.blob){this.blob=function(){var rejected=consumed(this)
if(rejected){ return rejected
}
if(this._bodyBlob){ return Promise.resolve(this._bodyBlob)
}else if(this._bodyArrayBuffer){ return Promise.resolve(new Blob([this._bodyArrayBuffer]))
}else if(this._bodyFormData){  throw new Error('could not read FormData body as blob')
}else{ return Promise.resolve(new Blob([this._bodyText]))
}}
this.arrayBuffer=function(){if(this._bodyArrayBuffer){ return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
}else{ return this.blob().then(readBlobAsArrayBuffer)
}}
}
this.text=function(){var rejected=consumed(this)
if(rejected){return rejected
}
if(this._bodyBlob){return readBlobAsText(this._bodyBlob)
}else if(this._bodyArrayBuffer){return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
}else if(this._bodyFormData){throw new Error('could not read FormData body as text')
}else{return Promise.resolve(this._bodyText)
}}
if(support.formData){this.formData=function(){return this.text().then(decode)
}}
this.json=function(){ return this.text().then(JSON.parse)
}
  return this
}
var methods=['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']
  
function normalizeMethod(method){var upcased=method.toUpperCase()
  return (methods.indexOf(upcased) > -1) ? upcased : method
}
function Request(input, options){options=options || {}
var body=options.body
  
if(input instanceof Request){if(input.bodyUsed){throw new TypeError('Already read')
}
this.url=input.url
this.credentials=input.credentials
if(!options.headers){this.headers=new Headers(input.headers)
}
this.method=input.method
this.mode=input.mode
if(!body && input._bodyInit != null){body=input._bodyInit
input.bodyUsed=true
}}else{this.url=String(input)
}
this.credentials=options.credentials || this.credentials || 'omit'
if(options.headers || !this.headers){this.headers=new Headers(options.headers)
}
this.method=normalizeMethod(options.method || this.method || 'GET')
this.mode=options.mode || this.mode || null
this.referrer=null
  
if((this.method==='GET' || this.method==='HEAD') && body){  throw new TypeError('Body not allowed for GET or HEAD requests')
}
this._initBody(body)
}
Request.prototype.clone=function(){  return new Request(this, { body: this._bodyInit })
}
function decode(body){var form=new FormData()
body.trim().split('&').forEach(function(bytes){if(bytes){var split=bytes.split('=')
var name=split.shift().replace(/\+/g, ' ')
var value=split.join('=').replace(/\+/g, ' ')
form.append(decodeURIComponent(name), decodeURIComponent(value))
}})
  return form
}
function parseHeaders(rawHeaders){var headers=new Headers()
var preProcessedHeaders=rawHeaders.replace(/\r?\n[\t ]+/g, ' ')
preProcessedHeaders.split(/\r?\n/).forEach(function(line){var parts=line.split(':')
var key=parts.shift().trim()
if(key){var value=parts.join(':').trim()
headers.append(key, value)
}})
  return headers
}
Body.call(Request.prototype)
  
function Response(bodyInit, options){if(!options){  options={}}
this.type='default'
this.status=options.status===undefined ? 200 : options.status
this.ok=this.status >= 200 && this.status < 300
this.statusText='statusText' in options ? options.statusText : 'OK'
this.headers=new Headers(options.headers)
this.url=options.url || ''
this._initBody(bodyInit)
}
Body.call(Response.prototype)
  
Response.prototype.clone=function(){  return new Response(this._bodyInit, {  status: this.status,
  statusText: this.statusText,
  headers: new Headers(this.headers),
  url: this.url
})
}
Response.error=function(){var response=new Response(null, {status: 0, statusText: ''})
response.type='error'
  return response
}
var redirectStatuses=[301, 302, 303, 307, 308]
  
Response.redirect=function(url, status){if(redirectStatuses.indexOf(status)===-1){  throw new RangeError('Invalid status code')
}
  return new Response(null, {status: status, headers: {location: url}})
}
self.Headers=Headers
self.Request=Request
self.Response=Response
  
self.fetch=function(input, init){  return new Promise(function(resolve, reject){var request=new Request(input, init)
var xhr=new XMLHttpRequest()
  
  xhr.onload=function(){var options={  status: xhr.status,
statusText: xhr.statusText,
headers: parseHeaders(xhr.getAllResponseHeaders() || '')
}
options.url='responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
var body='response' in xhr ? xhr.response : xhr.responseText
resolve(new Response(body, options))
}
  xhr.onerror=function(){reject(new TypeError('Network request failed'))
}
  xhr.ontimeout=function(){reject(new TypeError('Network request failed'))
}
  xhr.open(request.method, request.url, true)
  
if(request.credentials==='include'){xhr.withCredentials=true
}else if(request.credentials==='omit'){xhr.withCredentials=false
}
if('responseType' in xhr && support.blob){xhr.responseType='blob'
}
  request.headers.forEach(function(value, name){xhr.setRequestHeader(name, value)
})
  
  xhr.send(typeof request._bodyInit==='undefined' ? null : request._bodyInit)
})
}
self.fetch.polyfill=true
})(typeof self !== 'undefined' ? self : this);},{}],349:[function(require,module,exports){  module.exports={"name": "@gamedistribution.com/html5-sdk",
"version": "1.5.82",
"author": "GameDistribution.com",
"description": "GameDistribution.com HTML5 SDK",
"url": "https://gamedistribution.com",
"license": "MIT",
"main": "lib/main.js",
"scripts": {  "test": "echo \"Error: no test specified\" && exit 1",
  "storybook": "start-storybook -p 6006",
  "build-storybook": "build-storybook --quiet -c .storybook -o .out"
},
"directories": {  "doc": "https://github.com/GameDistribution/GD-HTML5/wiki"
},
"repository": {  "type": "git",
  "url": "git@github.com:GameDistribution/GD-HTML5.git"
},
"dependencies": {  "babel-polyfill": "^6.26.0",
  "can-autoplay": "^3.0.0",
  "es6-promise": "^4.1.1",
  "is-array": "^1.0.1",
  "is-function": "^1.0.1",
  "is-object": "^1.0.1",
  "is-plain-object": "^3.0.0",
  "is-string": "^1.0.5",
  "js-base64": "^2.5.1",
  "lodash.assign": "^4.2.0",
  "lodash.clonedeep": "^4.5.0",
  "lodash.merge": "^4.6.2",
  "querystringify": "^2.1.1",
  "ua-parser-js": "^0.7.20",
  "url-parse": "^1.4.7",
  "whatwg-fetch": "^2.0.3"
},
"devDependencies": {  "@babel/core": "^7.2.2",
  "@babel/preset-env": "^7.2.3",
  "@storybook/addon-viewport": "^5.3.14",
  "@storybook/html": "^5.3.14",
  "babel-eslint": "^10.0.1",
  "babel-loader": "^8.0.6",
  "babelify": "^10.0.0",
  "eslint": "^4.7.0",
  "eslint-config-google": "^0.9.1",
  "eslint-friendly-formatter": "^3.0.0",
  "eslint-loader": "^1.7.1",
  "eslint-plugin-html": "^3.0.0",
  "eslint-plugin-promise": "^3.4.0",
  "eslint-plugin-standard": "^2.0.1",
  "grunt": "^1.1.0",
  "grunt-banner": "^0.6.0",
  "grunt-browser-sync": "^2.2.0",
  "grunt-browserify": "^5.2.0",
  "grunt-contrib-clean": "^1.1.0",
  "grunt-contrib-copy": "^1.0.0",
  "grunt-contrib-uglify": "^4.0.1",
  "grunt-contrib-watch": "^1.0.0",
  "grunt-exec": "^3.0.0",
  "grunt-google-cloud": "^1.0.7"
},
"engines": {  "node": ">= 10.15.0",
  "npm": ">= 6.4.0"
}}
},{}],350:[function(require,module,exports){  "use strict";Object.defineProperty(exports, "__esModule", {value: true
});
  exports.default=void 0;function _classCallCheck(instance, Constructor){if(!(instance instanceof Constructor)){ throw new TypeError("Cannot call a class as a function");}}
  function _defineProperties(target, props){for(var i=0;i<props.length; i++){ var descriptor=props[i]; descriptor.enumerable=descriptor.enumerable || false; descriptor.configurable=true; if("value" in descriptor) descriptor.writable=true; Object.defineProperty(target, descriptor.key, descriptor);}}
  function _createClass(Constructor, protoProps, staticProps){if(protoProps) _defineProperties(Constructor.prototype, protoProps); if(staticProps) _defineProperties(Constructor, staticProps); return Constructor;}
var instance=null;var EventBus =
  
  function (){function EventBus(){_classCallCheck(this, EventBus);if(instance) return instance;else instance=this;
this.listeners={};
}
_createClass(EventBus, [{  key:"_getListenerIdx",
  value:function _getListenerIdx(eventName, callback, scope){var eventListeners=this.listeners[eventName];var i;var idx=-1;if(!eventListeners || eventListeners.length===0){return idx;
}
  for(i=0;i<eventListeners.length; i++){if(eventListeners[i].callback===callback && (!scope || scope===eventListeners[i].scope)){  idx=i;
break;}}
 return idx;
}}, {  key:"subscribe",
  value:function subscribe(eventName, callback, scope){var listener;var idx;if(!eventName){throw new Error("Event name cannot be null or undefined.");
}
if(!callback || typeof callback !== "function"){throw new Error("Listener must be of type function.");
}
  idx=this._getListenerIdx(eventName, callback, scope);if(idx >= 0){console.log(eventName, scope);
   return;
}
  listener={callback: callback,
scope: scope
};
this.listeners[eventName]=this.listeners[eventName] || [];
this.listeners[eventName].push(listener);
}}, {  key:"unsubscribeScope",
  value:function unsubscribeScope(scope){var eventNames=Object.keys(this.listeners);for(var nameIndex=0; nameIndex < eventNames.length; nameIndex++){var eventName=eventNames[nameIndex];var events=this.listeners[eventName];  for(var index=0; index < events.length; index++){var event=events[index];if(event.scope===scope){events.splice(index, 1);
  index--;
}}
if(events.length===0){  delete this.listeners[eventName];}}
}}, {  key:"broadcast",
  value:function broadcast(eventName, args){var eventListeners=this.listeners[eventName];if(!eventName || !this.listeners[eventName]){return;
}
  args=args || {};
  args.name=args.name || eventName;
  eventListeners.forEach(function (listener){listener.callback.call(listener.scope, args, listener.scope);
});}}, {  key:"printScope",
  value:function printScope(scope){var eventNames=Object.keys(this.listeners);for(var nameIndex=0; nameIndex < eventNames.length; nameIndex++){var eventName=eventNames[nameIndex];var events=this.listeners[eventName];  for(var index=0; index < events.length; index++){var event=events[index];if(event.scope===scope){console.log(eventName, scope);
}}
}}
}]); return EventBus;}();var _default=EventBus;
  exports.default=_default;},{}],351:[function(require,module,exports){  "use strict";Object.defineProperty(exports, "__esModule", {value: true
});
  exports.default=void 0;var _EventBus=_interopRequireDefault(require("../components/EventBus"));var _adType=require("../modules/adType");var _layers=require("../modules/layers");var _common=require("../modules/common");function _interopRequireDefault(obj){ return obj && obj.__esModule ? obj : { default: obj };}
  function _classCallCheck(instance, Constructor){if(!(instance instanceof Constructor)){ throw new TypeError("Cannot call a class as a function");}}
  function _defineProperties(target, props){for(var i=0;i<props.length; i++){ var descriptor=props[i]; descriptor.enumerable=descriptor.enumerable || false; descriptor.configurable=true; if("value" in descriptor) descriptor.writable=true; Object.defineProperty(target, descriptor.key, descriptor);}}
  function _createClass(Constructor, protoProps, staticProps){if(protoProps) _defineProperties(Constructor.prototype, protoProps); if(staticProps) _defineProperties(Constructor, staticProps); return Constructor;}
var instance=null;var ImplementationTest =
  
  function (){
function ImplementationTest(sdk){_classCallCheck(this, ImplementationTest);if(instance) return instance;else instance=this;
this.eventBus=new _EventBus.default();
this._sdk=sdk;
}
_createClass(ImplementationTest, [{  key:"start",
  value:function start(){var css="#gdsdk__console_container {display: flex;box-sizing: border-box;padding: 3px;background: linear-gradient(90deg,#3d1b5d,#5c3997);box-shadow: 0 0 8px rgba(0, 0, 0, 0.8);color: #fff;font-family: Helvetica, Arial, sans-serif;font-size: 8px;}#gdsdk__console_container button {flex: 1;background: #44a5ab;padding: 3px 10px;margin: 2px;border: 0;border-radius: 3px;color: #fff;outline: 0;cursor: pointer;font-size: 8px;box-shadow: 0 0 0 transparent;text-shadow: 0 0 0 transparent;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}#gdsdk__console_container button:hover {background: #4fb3b9;}#gdsdk__console_container button:active {background: #62bbc0;}";var html="<div id=\"gdsdk__console_container\"><button id=\"gdsdk__hbgdDebug\">Activate hbgd debug</button><button id=\"gdsdk__hbgdConfig\">Log idhbgd config</button><!--<button id=\"gdsdk__resumeGame\">Resume</button><button id=\"gdsdk__pauseGame\">Pause</button>--><button id=\"gdsdk__showInterstitial\">Interstitial</button><button id=\"gdsdk__showRewarded\">Rewarded</button><button id=\"gdsdk__preloadRewarded\">Preload rewarded</button><button id=\"gdsdk__cancel\">Cancel</button><button id=\"gdsdk__demo\">Demo VAST tag</button><button id=\"gdsdk__disableMidrollTimer\">Disable delay</button><button id=\"gdsdk__closeDebug\">Close</button></div>";var head=document.head || document.getElementsByTagName("head")[0];var style=document.createElement("style");
  style.type="text/css";if(style.styleSheet){style.styleSheet.cssText=css;
}else{style.appendChild(document.createTextNode(css));
}
  head.appendChild(style);var body=document.body || document.getElementsByTagName("body")[0];var container=document.createElement("div");container.id="gdsdk__console";container.style.position="fixed";container.style.zIndex=_layers.Layers.Console.zIndex;
  ;container.style.bottom="0";container.style.left="0";container.style.width="100%";container.innerHTML=html;
  body.appendChild(container);var showInterstitial=document.getElementById("gdsdk__showInterstitial");var showRewarded=document.getElementById("gdsdk__showRewarded");var preloadRewarded=document.getElementById("gdsdk__preloadRewarded");var cancelAd=document.getElementById("gdsdk__cancel");var demoAd=document.getElementById("gdsdk__demo");var disableMidrollTimer=document.getElementById("gdsdk__disableMidrollTimer");var hbgdDebug=document.getElementById("gdsdk__hbgdDebug");var hbgdConfig=document.getElementById("gdsdk__hbgdConfig");var closeDebug=document.getElementById("gdsdk__closeDebug");if(_common.Ls.getBoolean("gd_tag")){demoAd.innerHTML="Revert Vast tag";
demoAd.style.background="#ff8c1c";
}else{demoAd.innerHTML="Demo VAST tag";
demoAd.style.background="#44a5ab";
}
if(_common.Ls.getBoolean("gd_disable_midroll_timer")){disableMidrollTimer.innerHTML="Revert delay";
disableMidrollTimer.style.background="#ff8c1c";
}else{disableMidrollTimer.innerHTML="Disable delay";
disableMidrollTimer.style.background="#44a5ab";
}
if(_common.Ls.getBoolean("gd_hb_debug")){hbgdDebug.innerHTML="Revert HB Debug";
hbgdDebug.style.background="#ff8c1c";
}else{hbgdDebug.innerHTML="HB Debug";
hbgdDebug.style.background="#44a5ab";
}
  showInterstitial.addEventListener("click", function (){var reqAd=function reqAd(){  window.gdsdk.showAd(_adType.AdType.Interstitial).catch(function (reason){});};
reqAd();
});
  showRewarded.addEventListener("click", function (){var reqAd=function reqAd(){  window.gdsdk.showAd(_adType.AdType.Rewarded).catch(function (reason){});};
reqAd();
});
  preloadRewarded.addEventListener("click", function (){window.gdsdk.preloadAd(_adType.AdType.Rewarded).then(function (response){ return console.log(response);}).catch(function (error){ return console.log(error.message);});});
  cancelAd.addEventListener("click", function (){window.gdsdk.cancelAd().then(function (response){}).catch(function (reason){});});
  demoAd.addEventListener("click", function (){try{if(_common.Ls.getBoolean("gd_tag")) _common.Ls.remove("gd_tag");else _common.Ls.set("gd_tag", true);
location.reload();}catch(error){  console.log(error);}});
  disableMidrollTimer.addEventListener("click", function (){try{if(_common.Ls.getBoolean("gd_disable_midroll_timer")) _common.Ls.remove("gd_disable_midroll_timer");else _common.Ls.set("gd_disable_midroll_timer", true);
location.reload();}catch(error){  console.log(error);}});
  closeDebug.addEventListener("click", function (){try{if(_common.Ls.getBoolean("gd_debug_ex")) _common.Ls.remove("gd_debug_ex");else _common.Ls.set("gd_debug_ex", true);
location.reload();}catch(error){  console.log(error);}});
  hbgdDebug.addEventListener("click", function (){try{if(_common.Ls.getBoolean("gd_hb_debug")) _common.Ls.remove("gd_hb_debug");else _common.Ls.set("gd_hb_debug", true);
window.idhbgd && window.idhbgd.debug(_common.Ls.available && _common.Ls.getBoolean("gd_hb_debug") ? true : false);
location.reload();}catch(error){  console.log(error);}});
  hbgdConfig.addEventListener("click", function (){try{var config=window.idhbgd.getConfig();
console.info(config);}catch(error){  console.log(error);}});}}]); return ImplementationTest;}();var _default=ImplementationTest;
  exports.default=_default;},{"../components/EventBus":350,"../modules/adType":357,"../modules/common":358,"../modules/layers":361}],352:[function(require,module,exports){  "use strict";Object.defineProperty(exports, "__esModule", {value: true
});
  exports.default=void 0;var _isPlainObject=_interopRequireDefault(require("is-plain-object"));var _isString=_interopRequireDefault(require("is-string"));var _isArray=_interopRequireDefault(require("is-array"));var _isFunction=_interopRequireDefault(require("is-function"));function _interopRequireDefault(obj){ return obj && obj.__esModule ? obj : { default: obj };}
  function _classCallCheck(instance, Constructor){if(!(instance instanceof Constructor)){ throw new TypeError("Cannot call a class as a function");}}
  function _defineProperties(target, props){for(var i=0;i<props.length; i++){ var descriptor=props[i]; descriptor.enumerable=descriptor.enumerable || false; descriptor.configurable=true; if("value" in descriptor) descriptor.writable=true; Object.defineProperty(target, descriptor.key, descriptor);}}
  function _createClass(Constructor, protoProps, staticProps){if(protoProps) _defineProperties(Constructor.prototype, protoProps); if(staticProps) _defineProperties(Constructor, staticProps); return Constructor;}
var cloneDeep=require("lodash.clonedeep");var Macros =
  
  function (){function Macros(ctx){_classCallCheck(this, Macros);this.game=ctx.game;
this.bridge=ctx.bridge;
}
_createClass(Macros, [{  key:"transform",
  value:function transform(value, options){var cloned=cloneDeep(value);
 return this.transformValue(cloned, options);}},{  key:"transformValue",
  value:function transformValue(value, options){if((0, _isPlainObject.default)(value) || (0, _isArray.default)(value)){for(var objKey in value){  value[objKey]=this.transformValue(value[objKey], options);}}else if((0, _isString.default)(value)){var regex=/\{\{(\w+)\}\}/g;var matched;var replaceItems=[];  do {  matched=regex.exec(value);if(matched){var macro=matched[0];
  var macroKey=matched[1];
  var macroValue=this.getMacroKeyValue(macroKey, options);if(typeof macroValue !== "undefined"){  replaceItems.push({key: macroKey,
  value:macroValue
});}}
} while (matched);if(replaceItems.length > 0){  replaceItems.forEach(function (item){value=value.replace(new RegExp("\{\{" + item.key + "\}\}", "g"), item.value);
});}}
 return value;}},{  key:"getMacroKeyValue",
  value:function getMacroKeyValue(key, options){  switch (key){case "CACHEBUSTER":
  return Date.now();case "GAME_ID":
  return this.game.gameId;case "GAME_TITLE":
  return this.game.title;case "COUNTRY_CODE":
  return this.game.ctry;case "PAGE_URL":
  return this.bridge.parentURL;case "PAGE_URL_ESC":
  return encodeURIComponent(this.bridge.parentURL);case "PAGE_URL_ESC_ESC":
  return encodeURIComponent(encodeURIComponent(this.bridge.parentURL));case "DOMAIN_MATCHED":
  return this.bridge.domainMatched ? 1 : 0;case "DOMAIN_PARENT":
  return this.bridge.parentDomain;case "DOMAIN_TOP":
  return this.bridge.topDomain;case "DEPTH":
case "GAME_DEPTH":
  return this.bridge.depth;  default:
if(options && (0, _isFunction.default)(options.get)) return options.get(key);
break;
}}
}]); return Macros;}();var _default=Macros;
  exports.default=_default;},{"is-array":335,"is-function":336,"is-plain-object":337,"is-string":338,"lodash.clonedeep":340}],353:[function(require,module,exports){  "use strict";Object.defineProperty(exports, "__esModule", {value: true
});
  exports.default=void 0;require("whatwg-fetch");var _uaParserJs=_interopRequireDefault(require("ua-parser-js"));var _jsBase=require("js-base64");function _interopRequireDefault(obj){ return obj && obj.__esModule ? obj : { default: obj };}
  function _classCallCheck(instance, Constructor){if(!(instance instanceof Constructor)){ throw new TypeError("Cannot call a class as a function");}}
  function _defineProperties(target, props){for(var i=0;i<props.length; i++){ var descriptor=props[i]; descriptor.enumerable=descriptor.enumerable || false; descriptor.configurable=true; if("value" in descriptor) descriptor.writable=true; Object.defineProperty(target, descriptor.key, descriptor);}}
  function _createClass(Constructor, protoProps, staticProps){if(protoProps) _defineProperties(Constructor.prototype, protoProps); if(staticProps) _defineProperties(Constructor, staticProps); return Constructor;}
  
var MessageRouter =
  
  function (){function MessageRouter(config){_classCallCheck(this, MessageRouter);this._config=config || {};
this._url=config.url || "https://msgrt.gamedistribution.com/collect";
this._topic_counter={};
this._ua=new _uaParserJs.default().getResult();
}
_createClass(MessageRouter, [{  key:"send",
  value:function send(subtopic, args){var w=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;var h=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  w=w - w % 64;
  h=h - h % 64;
this._size="".concat(w, " x ").concat(h);var counter=this._topic_counter[subtopic] || 0;
this._topic_counter[subtopic]=++counter;var base={gmid: this._config.gameId,
  tdmn: this._config.topDomain,
  domn: this._config.domain,
  rfrr: this._config.referrer,
  lthr: this._config.hours,
  ctry: this._config.country,
  dpth: this._config.depth,
  vers: this._config.version,
  trac: this._config.tracking,
  whlb: this._config.whitelabel,
  plat: this._config.platform,
  tpct: counter,
  args: args,
  ttle: document.title,
  size: this._size,
  brnm: this._ua.browser.name,
  brmj: this._ua.browser.major,
  osnm: this._ua.os.name,
  osvr: this._ua.os.version,
  dvmd: this._ua.device.model,
  byld: this._config.byloader,
  bylv: this._config.byloaderVersion,
  imgu: this._config.isMasterGameURL,
  iegu: this._config.isExtHostedGameURL,
  itgu: this._config.isTokenGameURL,
  cmpe: false
};if(typeof idhbgd !== 'undefined' && typeof idhbgd.iabCmpExists() !== 'undefined') base.cmpe=idhbgd.iabCmpExists();try{base=encodeURIComponent(_jsBase.Base64.encode(JSON.stringify([base])));
fetch(this._url + "?tp=com.gdsdk.".concat(subtopic, "&ar=").concat(base, "&ts=").concat(Date.now()));
}catch(error){}}},{  key:"setGameData",
  value:function setGameData(gameData){this._gameData=gameData;
this._config.country=gameData.ctry;
}}]); return MessageRouter;}();var _default=MessageRouter;
  exports.default=_default;},{"js-base64":339,"ua-parser-js":346,"whatwg-fetch":348}],354:[function(require,module,exports){  (function (global){  "use strict";Object.defineProperty(exports, "__esModule", {value: true
});
  exports.default=void 0;var _EventBus=_interopRequireDefault(require("../components/EventBus"));var _adType=require("../modules/adType");var _common=require("../modules/common");var _canAutoplay=_interopRequireDefault(require("can-autoplay"));var _isFunction=_interopRequireDefault(require("is-function"));var _layers=require("../modules/layers");var _isPlainObject=_interopRequireDefault(require("is-plain-object"));var _lodash=_interopRequireDefault(require("lodash.clonedeep"));function _interopRequireDefault(obj){ return obj && obj.__esModule ? obj : { default: obj };}
  function ownKeys(object, enumerableOnly){ var keys=Object.keys(object); if(Object.getOwnPropertySymbols){ var symbols=Object.getOwnPropertySymbols(object); if(enumerableOnly) symbols=symbols.filter(function (sym){ return Object.getOwnPropertyDescriptor(object, sym).enumerable;}); keys.push.apply(keys, symbols);} return keys;}
  function _objectSpread(target){for(var i=1; i < arguments.length; i++){ var source=arguments[i] != null ? arguments[i] : {}; if(i % 2){ ownKeys(source, true).forEach(function (key){ _defineProperty(target, key, source[key]);});}else if(Object.getOwnPropertyDescriptors){ Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));}else{ ownKeys(source).forEach(function (key){ Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}} return target;}
  function _defineProperty(obj, key, value){if(key in obj){ Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });}else{ obj[key]=value;} return obj;}
  function _classCallCheck(instance, Constructor){if(!(instance instanceof Constructor)){ throw new TypeError("Cannot call a class as a function");}}
  function _defineProperties(target, props){for(var i=0;i<props.length; i++){ var descriptor=props[i]; descriptor.enumerable=descriptor.enumerable || false; descriptor.configurable=true; if("value" in descriptor) descriptor.writable=true; Object.defineProperty(target, descriptor.key, descriptor);}}
  function _createClass(Constructor, protoProps, staticProps){if(protoProps) _defineProperties(Constructor.prototype, protoProps); if(staticProps) _defineProperties(Constructor, staticProps); return Constructor;}
if(!global._babelPolyfill){  require("babel-polyfill");}
var Url=require("url-parse");var qs=require("querystringify");var merge=require('lodash.merge');var instance=null;var VideoAd =
  
  function (){
function VideoAd(container, options, location){var _this=this;_classCallCheck(this, VideoAd);if(instance) return instance;else instance=this;var defaults={  debug: false,
  width: 640,
  height: 360,
  locale: "en"};if(options) this.options=(0, _common.extendDefaults)(defaults, options);else this.options=defaults;
this.prefix="gdsdk__";
this.adsLoader=null;
this.adsManager=null;
this.adDisplayContainer=null;
this.eventBus=new _EventBus.default();
this.safetyTimer=null;
this.containerTransitionSpeed=0;
this.adCount=0;
this.adTypeCount=0;
this.preloadedAdType=null;
this.requestRunning=false;
this.parentDomain=location.parentDomain;
this.parentURL=location.parentURL;
this.adDisplayContainerInitialized=false;
this.IMASampleTags=(0, _common.getIMASampleTags)();this.userAllowedPersonalizedAds=document.location.search.indexOf("gdpr-targeting=0") >= 0 || document.cookie.indexOf("ogdpr_advertisement=0") >= 0 ? "0" : "1";if(this.parentDomain.includes("girlsgogames")){this.userAllowedPersonalizedAds=false;
}
  
this.thirdPartyContainer=container !== "" ? document.getElementById(container) : null;this.options.width=typeof this.options.width==="number" ? this.options.width : this.options.width==="100%" ? 640 : this.options.width.replace(/[^0-9]/g, "");
this.options.height=typeof this.options.height==="number" ? this.options.height : this.options.height==="100%" ? 360 : this.options.height.replace(/[^0-9]/g, "");var viewWidth=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;var viewHeight=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
this.options.width=this.thirdPartyContainer ? this.thirdPartyContainer.offsetWidth : viewWidth;
this.options.height=this.thirdPartyContainer ? this.thirdPartyContainer.offsetHeight : viewHeight;this.gameId="0";
this.category="";
this.tags=[];
this.eventCategory="AD";this.eventBus.subscribe("LOADED", function (){  _this._clearSafetyTimer("LOADED");_this._startSafetyTimer(8000, "LOADED");
}, "ima");this.eventBus.subscribe("STARTED", function (){  _this._clearSafetyTimer("STARTED");
}, "ima");
}
_createClass(VideoAd, [{  key:"start",
  value:function start(){var _this2=this;var preBidScriptPaths, preBidURL, imaScriptPaths, imaURL;
 return regeneratorRuntime.async(function start$(_context){while (1){  switch (_context.prev=_context.next){case 0:
_context.prev=0;
preBidScriptPaths=this._getPrebidScripts();
preBidURL=preBidScriptPaths[0];window.HB_OPTIONSgd={gameId: this.gameId
};
_context.next=6;
  return regeneratorRuntime.awrap((0, _common.getScript)(preBidURL, "gdsdk_prebid", {alternates: preBidScriptPaths,
error_prefix: "Blocked:",
exists: function exists(){ return window["idhbgd"];
}}));  case 6:
  window.idhbgd=window.idhbgd || {};
  window.idhbgd.que=window.idhbgd.que || [];
  window.idhbgd.que.push(function (){window.idhbgd.addEventListener('slotRenderEnded', function (event){try{var slotId=event.slotId.split('@');
  slotId=slotId.length===1 ? slotId[0] : slotId[1];
_this2.eventBus.broadcast("DISPLAYAD_ERROR", {  message: slotId,
status: "warning"
});}catch(error){}});});  imaScriptPaths=["https://imasdk.googleapis.com/js/sdkloader/ima3_debug.js", "https://imasdk.googleapis.com/js/sdkloader/ima3.js", "http://imasdk.googleapis.com/js/sdkloader/ima3_debug.js", "http://imasdk.googleapis.com/js/sdkloader/ima3.js"];
imaURL=this.options.debug ? imaScriptPaths[0] : imaScriptPaths[1];
_context.next=13;
  return regeneratorRuntime.awrap((0, _common.getScript)(imaURL, "gdsdk_ima", {alternates: imaScriptPaths,
error_prefix: "Blocked:",
exists: function exists(){ return window["google"] && window["google"]["ima"];
}}));  case 13:
this._createPlayer();
this._setUpIMA();  _context.next=20;
break;  case 17:
_context.prev=17;
_context.t0=_context["catch"](0);
throw new Error(_context.t0);  case 20:
case "end":
  return _context.stop();
}}
}, null, this, [[0, 17]]);
}}, {  key:"_getAdVast",
  value:function _getAdVast(adType, options){var _this3=this; return new Promise(function (resolve){if(_common.Ls.available && _common.Ls.getBoolean("gd_debug_ex") && _common.Ls.getBoolean("gd_tag")){var imaSamples=_this3.IMASampleTags[adType];var index=Math.floor(Math.random() * imaSamples.length);var sampleTag=imaSamples[index];
resolve({url: sampleTag
});
 return;}
  
try{if(_this3.adTypeCount===1) _this3.adCount=0;
_this3.adCount++;
_this3.adTypeCount++;_this3._getTunnlKeys(adType).then(function (_ref){var data=_ref.data;if(typeof window.idhbgd.requestAds==="undefined"){  throw new Error("Prebid.js wrapper script hit an error or didn't exist!");}
  
  var nsid=data.nsid ? data.nsid : "TNL_T-17102571517";
  var tid=data.tid ? data.tid : "TNL_NS-18101700058";
  var unit="".concat(nsid, "/").concat(tid);delete data.nsid;
  delete data.tid;var consentString=data.consent_string ? data.consent_string : "BOWJjG9OWJjG9CLAAAENBx-AAAAiDAAA";merge(data, {  tnl_system: "1",
  tnl_content_category: _this3.category.toLowerCase()
});_this3.eventBus.broadcast("AD_REQUEST", {  message: data.tnl_ad_pos
});var optionsRef=_this3.options;if(data.tnl_ad_pos==='preroll' && (0, _isPlainObject.default)(optionsRef.preroll)) optionsRef=optionsRef.preroll;else if(data.tnl_ad_pos==='midroll' && (0, _isPlainObject.default)(optionsRef.midroll)) optionsRef=optionsRef.midroll;else if(data.tnl_ad_pos==='rewarded' && (0, _isPlainObject.default)(optionsRef.rewarded)) optionsRef=optionsRef.rewarded;if(options && options.retry_on_success && (0, _isPlainObject.default)(optionsRef.retry_on_success) && (0, _isPlainObject.default)(optionsRef.retry_on_success.vast)) return resolve(_this3._createCustomAdVastUrl(optionsRef.retry_on_success.vast, {  tnl_keys: data
}));else if(options && options.retry_on_failure && (0, _isPlainObject.default)(_this3.options.retry_on_failure) && (0, _isPlainObject.default)(optionsRef.retry_on_failure.vast)) return resolve(_this3._createCustomAdVastUrl(optionsRef.retry_on_failure.vast, {  tnl_keys: data
}));else if((0, _isPlainObject.default)(optionsRef.vast)) return resolve(_this3._createCustomAdVastUrl(optionsRef.vast, {  tnl_keys: data
}));window.idhbgd.que.push(function (){  window.idhbgd.setRefererUrl(encodeURIComponent(_this3.parentURL));window.idhbgd.allowPersonalizedAds(!!parseInt(_this3.userAllowedPersonalizedAds));  var slotId=data.tnl_ad_pos==="rewarded" ? "rewardedVideo" : data.tnl_ad_pos==="gdbanner" ? "gd__banner" : data.tnl_ad_pos==="midroll" ? "midroll" : "video1";
  window.idhbgd.setDfpAdUnitCodeForAdSlot(slotId, unit);window.idhbgd.setAdserverTargetingForAdSlot(slotId, data);window.idhbgd.setDefaultGdprConsentString(consentString);
  window.idhbgd.requestAds({slotIds: [slotId],
callback: function callback(vastUrl){  resolve({tnl_keys: data,
  url: vastUrl
});}});});}).catch(function (error){throw new Error(error);
});}catch(error){  throw new Error(error);}});}},{  key:"getAdPosition",
  value:function getAdPosition(adType){var adPosition=adType===_adType.AdType.Rewarded ? "rewarded" : this.noPreroll===false && this.adTypeCount===1 ? "preroll" : "midroll";
 return adPosition;
}}, {  key:"_getTunnlKeys",
  value:function _getTunnlKeys(adType){var _this4=this; return new Promise(function (resolve){var pageUrl="";if((navigator.userAgent.match(/Crosswalk/i) || typeof window.cordova !== "undefined") && _this4.parentDomain==="m.hopy.com"){  pageUrl="bundle=com.hopy.frivgames";}else{  pageUrl="page_url=".concat(encodeURIComponent(_this4.parentURL));}
console.log(_this4.preroll);var adPosition=_this4.getAdPosition(adType);var ch=(0, _common.getQueryString)("ch", window.location.href);var chDate=(0, _common.getQueryString)("ch_date", window.location.href);var chParam=ch ? "&ch=".concat(ch) : "";var chDateParam=chDate ? "&ch_date=".concat(chDate) : "";var url="https://pub.tunnl.com/opphb?".concat(pageUrl, "&player_width=").concat(_this4.options.width, "&player_height=").concat(_this4.options.height, "&ad_type=video_image&game_id=").concat(_this4.gameId, "&ad_position=").concat(adPosition).concat(chParam).concat(chDateParam, "&correlator=").concat(Date.now());var request=new Request(url, {  method: "GET"
});
fetch(request).then(function (response){var contentType=response.headers.get("content-type");if(contentType && contentType.indexOf("application/json") !== -1){return response.json();
}else{throw new TypeError("Oops, we didn't get JSON!");
}}).then(function (keys){if((0, _common.isObjectEmpty)(keys)){keys=_this4._createTunnlReportingFallbackKeys(adPosition);_this4.eventBus.broadcast("AD_REQUEST_KEYS_EMPTY", {  message: "Tunnl returned empty response.",
details: url
});}
resolve({data: keys,
  url: url
});}).catch(function (error){var keys=_this4._createTunnlReportingFallbackKeys(adPosition);_this4.eventBus.broadcast("AD_REQUEST_KEYS_FALLBACK", {message: error.message,
  details: url
});resolve({data: keys,
  url: url
});});});}}, {  key:"_createTunnlReportingFallbackKeys",
  value:function _createTunnlReportingFallbackKeys(adPosition){var keys={tid: "TNL_T-17102571517",
nsid: "TNL_NS-18101700058",
  tnl_tid: "T-17102571517",
  tnl_nsid: "NS-18101700058",
  tnl_pw: this.options.width,
  tnl_ph: this.options.height,
  tnl_pt: "22",
  tnl_pid: "P-17101800031",
  tnl_paid: "17",
  tnl_ad_type: "video_image",
  tnl_asset_id: this.gameId.toString(),
  tnl_ad_pos: adPosition,
  tnl_skippable: "1",
  tnl_cp1: "",
  tnl_cp2: "",
  tnl_cp3: "",
  tnl_cp4: "",
  tnl_cp5: "",
  tnl_cp6: "",
  tnl_campaign: "2",
  tnl_gdpr: "0",
  tnl_gdpr_consent: "1",
consent_string: "BOWJjG9OWJjG9CLAAAENBx-AAAAiDAAA",
  tnl_content_category: this.category.toLowerCase()
};
 return keys;
}}, {  key:"_requestAd",
  value:function _requestAd(vast, context){var _this5=this;context=context || {};
 return new Promise(function (resolve){if(typeof google==="undefined"){  throw new Error("Unable to load ad, google IMA SDK not defined.");}
try{  _this5.adSuccess=false;var adsRequest=new google.ima.AdsRequest();var adTag=_this5._transformVast(vast, context);var userReqContext=_objectSpread({}, context, {adTag: adTag
});
adsRequest.adTagUrl=adTag.url;adsRequest.linearAdSlotWidth=_this5.options.width;
adsRequest.linearAdSlotHeight=_this5.options.height;
adsRequest.nonLinearAdSlotWidth=_this5.options.width;
adsRequest.nonLinearAdSlotHeight=_this5.options.height;adsRequest.forceNonLinearFullSlot=true;if(_this5.options.vast_load_timeout) adsRequest.vastLoadTimeout=_this5.options.vast_load_timeout;if(_this5.options.autoplay_signal) adsRequest.setAdWillAutoPlay(context.autoplayAllowed);if(_this5.options.volume_signal) adsRequest.setAdWillPlayMuted(context.autoplayRequiresMute);_this5.adsLoader.requestAds(adsRequest, userReqContext);try{_this5.eventBus.broadcast("AD_SDK_REQUEST", {  message: userReqContext
});}catch(error){}
  
resolve(adsRequest);}catch(error){  throw new Error(error);}});}}, {  key:"cancel",
  value:function cancel(){if(this.requestRunning===false) return;
this.requestRunning=false;this._resetAdsLoader();
this._hide("cancel");var eventName="AD_SDK_CANCELED";var eventMessage="Advertisement has been canceled.";
this.eventBus.broadcast(eventName, {name: eventName,
message: eventMessage,
status: "warning",
analytics: {  category: this.eventCategory,
action: eventName,
label: this.gameId
}});}}, {  key:"_checkAutoPlay",
  value:function _checkAutoPlay(){ return regeneratorRuntime.async(function _checkAutoPlay$(_context2){while (1){  switch (_context2.prev=_context2.next){case 0:
  return _context2.abrupt("return", new Promise(function (resolve, reject){_canAutoplay.default.video({  inline: true,
muted: false
}).then(function (_ref2){var result=_ref2.result,
error=_ref2.error;if(result===true) resolve({autoplayAllowed: true,
  autoplayRequiresMute: false
});else resolve({autoplayAllowed: true,
  autoplayRequiresMute: true
});});}));  case 1:
case "end":
  return _context2.stop();
}}
});}},{  key:"_initDisplayContainerWithAutoPlay",
  value:function _initDisplayContainerWithAutoPlay(){var autoplay;
 return regeneratorRuntime.async(function _initDisplayContainerWithAutoPlay$(_context3){while (1){  switch (_context3.prev=_context3.next){case 0:
_context3.next=2;
  return regeneratorRuntime.awrap(this._checkAutoPlay(false));  case 2:
autoplay=_context3.sent;
this._autoplay=autoplay;this.video_ad_player.autoplay=autoplay.autoplayAllowed;
this.video_ad_player.volume=autoplay.autoplayRequiresMute ? 0 : 1;
this.video_ad_player.muted=autoplay.autoplayRequiresMute ? true : false;if(!autoplay.adDisplayContainerInitialized){this.adDisplayContainer.initialize();
this.adDisplayContainerInitialized=true;
}
  return _context3.abrupt("return", autoplay);  case 9:
case "end":
  return _context3.stop();
}}
}, null, this);
}}, {  key:"startAd",
  value:function startAd(adType, options){ return regeneratorRuntime.async(function startAd$(_context4){while (1){  switch (_context4.prev=_context4.next){case 0:
if(!(adType===_adType.AdType.Interstitial)){_context4.next=4;
break;
}
  return _context4.abrupt("return", this._startInterstitialAd(options));  case 4:
if(!(adType===_adType.AdType.Rewarded)){_context4.next=8;
break;
}
  return _context4.abrupt("return", this._startRewardedAd(options));  case 8:
throw new Error("Unsupported ad type");  case 9:
case "end":
  return _context4.stop();
}}
}, null, this);
}}, {  key:"preloadAd",
  value:function preloadAd(adType){ return regeneratorRuntime.async(function preloadAd$(_context5){while (1){  switch (_context5.prev=_context5.next){case 0:
if(!(adType===_adType.AdType.Interstitial)){_context5.next=4;
break;
}
  return _context5.abrupt("return", this._preloadInterstitialAd());  case 4:
if(!(adType===_adType.AdType.Rewarded)){_context5.next=8;
break;
}
  return _context5.abrupt("return", this._preloadRewardedAd());  case 8:
throw new Error("Unsupported ad type");  case 9:
case "end":
  return _context5.stop();
}}
}, null, this);
}}, {  key:"loadDisplayAd",
  value:function loadDisplayAd(options){}}, {  key:"_startInterstitialAd",
  value:function _startInterstitialAd(options){var autoPlayOptions;
 return regeneratorRuntime.async(function _startInterstitialAd$(_context7){while (1){  switch (_context7.prev=_context7.next){case 0:
if(!this.requestRunning){_context7.next=3;
break;
}
this.eventBus.broadcast("AD_IS_ALREADY_RUNNING", {status: "warning"
});
  return _context7.abrupt("return");  case 3:
this.requestRunning=true;
_context7.next=6;
  return regeneratorRuntime.awrap(this._initDisplayContainerWithAutoPlay());  case 6:
autoPlayOptions=_context7.sent;
_context7.next=9;
  return regeneratorRuntime.awrap(this._loadInterstitialAd(_objectSpread({}, autoPlayOptions, {}, options)));  case 9:
_context7.prev=9;if(autoPlayOptions.autoplayRequiresMute) this.adsManager.setVolume(0);this.adsManager.init(this.options.width, this.options.height, google.ima.ViewMode.NORMAL);this.adsManager.start();
_context7.next=19;
break;  case 15:
_context7.prev=15;
_context7.t0=_context7["catch"](9);
this._onError(_context7.t0);  throw _context7.t0;  case 19:
case "end":
  return _context7.stop();
}}
}, null, this, [[9, 15]]);
}}, {  key:"_loadInterstitialAd",
  value:function _loadInterstitialAd(options){}}, {  key:"_startRewardedAd",
  value:function _startRewardedAd(options){var autoPlayOptions;
 return regeneratorRuntime.async(function _startRewardedAd$(_context9){while (1){  switch (_context9.prev=_context9.next){case 0:
if(!this.requestRunning){_context9.next=3;
break;
}
this.eventBus.broadcast("AD_IS_ALREADY_RUNNING", {status: "warning"
});
  return _context9.abrupt("return");  case 3:
this.requestRunning=true;
_context9.next=6;
  return regeneratorRuntime.awrap(this._initDisplayContainerWithAutoPlay());  case 6:
autoPlayOptions=_context9.sent;
_context9.next=9;
  return regeneratorRuntime.awrap(this._loadRewardedAd(_objectSpread({}, autoPlayOptions, {}, options)));  case 9:
_context9.prev=9;if(autoPlayOptions.autoplayRequiresMute) this.adsManager.setVolume(0);this.adsManager.init(this.options.width, this.options.height, google.ima.ViewMode.NORMAL);this.adsManager.start();
_context9.next=19;
break;  case 15:
_context9.prev=15;
_context9.t0=_context9["catch"](9);
this._onError(_context9.t0);  throw _context9.t0;  case 19:
case "end":
  return _context9.stop();
}}
}, null, this, [[9, 15]]);
}}, {  key:"_loadRewardedAd",
  value:function _loadRewardedAd(options){}}, {  key:"_preloadInterstitialAd",
  value:function _preloadInterstitialAd(){ return regeneratorRuntime.async(function _preloadInterstitialAd$(_context11){while (1){  switch (_context11.prev=_context11.next){case 0:
_context11.prev=0;
_context11.next=3;
  return regeneratorRuntime.awrap(this._getAdVast(_adType.AdType.Interstitial));  case 3:
this.preloadedInterstitialAdVast=_context11.sent;
  return _context11.abrupt("return", this.preloadedInterstitialAdVast.url);  case 7:
_context11.prev=7;
_context11.t0=_context11["catch"](0);
throw new Error(_context11.t0);  case 10:
case "end":
  return _context11.stop();
}}
}, null, this, [[0, 7]]);
}}, {  key:"_preloadRewardedAd",
  value:function _preloadRewardedAd(){ return regeneratorRuntime.async(function _preloadRewardedAd$(_context12){while (1){  switch (_context12.prev=_context12.next){case 0:
_context12.prev=0;
_context12.next=3;
  return regeneratorRuntime.awrap(this._getAdVast(_adType.AdType.Rewarded));  case 3:
this.preloadedRewardedAdVast=_context12.sent;
  return _context12.abrupt("return", this.preloadedRewardedAdVast.url);  case 7:
_context12.prev=7;
_context12.t0=_context12["catch"](0);
throw new Error(_context12.t0);  case 10:
case "end":
  return _context12.stop();
}}
}, null, this, [[0, 7]]);
}}, {  key:"_onError",
  value:function _onError(error){this.cancel();this._clearSafetyTimer("ERROR");
}}, {  key:"_hide",
  value:function _hide(trigger){this.video_ad_player.src="";if(this.activeAdContainer) this.activeAdContainer.style.visibility="hidden";
}}, {  key:"_show",
  value:function _show(){}}, {  key:"_createPlayer",
  value:function _createPlayer(){var _this9=this;var body=document.body || document.getElementsByTagName("body")[0];
this.adContainer=document.createElement("div");
this.adContainer.id="".concat(this.prefix, "advertisement");
this.adContainer.style.position=this.thirdPartyContainer ? "absolute" : "fixed";
this.adContainer.style.zIndex=_layers.Layers.AdsContainer.zIndex;
  ;
this.adContainer.style.top="0";
this.adContainer.style.left="0";
this.adContainer.style.width="100%";
this.adContainer.style.height="100%";if(this.thirdPartyContainer) this.thirdPartyContainer.style.transform=null;var video_ad_player=document.createElement("video");
  video_ad_player.setAttribute("playsinline", true);
  video_ad_player.setAttribute("webkit-playsinline", true);
  video_ad_player.id="".concat(this.prefix, "advertisement_video");
  video_ad_player.style.position="absolute";
  video_ad_player.style.backgroundColor="#000000";
  video_ad_player.style.top="0";
  video_ad_player.style.left="0";
  video_ad_player.style.width=this.options.width + "px";
  video_ad_player.style.height=this.options.height + "px";
this.video_ad_player=video_ad_player;
this.adContainer.appendChild(video_ad_player);var adContainerInner=document.createElement("div");
  adContainerInner.id="".concat(this.prefix, "advertisement_slot");
  adContainerInner.style.position="absolute";
  adContainerInner.style.top="0";
  adContainerInner.style.left="0";
  adContainerInner.style.width=this.options.width + "px";
  adContainerInner.style.height=this.options.height + "px";
this.adContainerInner=adContainerInner;
this.activeAdContainer=this.adContainer;if(this.thirdPartyContainer){this.adContainer.appendChild(adContainerInner);
  this.thirdPartyContainer.appendChild(this.adContainer);
  this.activeAdContainer=this.thirdPartyContainer;
}else{this.adContainer.appendChild(adContainerInner);
body.appendChild(this.adContainer);
}
this.activeAdContainer.style.visibility="hidden";var handle_dimensions=function handle_dimensions(){var viewWidth=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;var viewHeight=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
_this9.options.width=_this9.thirdPartyContainer ? _this9.thirdPartyContainer.offsetWidth : viewWidth;
_this9.options.height=_this9.thirdPartyContainer ? _this9.thirdPartyContainer.offsetHeight : viewHeight;
adContainerInner.style.width=_this9.options.width + "px";
adContainerInner.style.height=_this9.options.height + "px";
video_ad_player.style.width=_this9.options.width + "px";
video_ad_player.style.height=_this9.options.height + "px";
};
  window.addEventListener("resize", handle_dimensions);
  window.document.addEventListener("DOMContentLoaded", handle_dimensions);
}}, {  key:"_setUpIMA",
  value:function _setUpIMA(){this.adDisplayContainer=new google.ima.AdDisplayContainer(this.adContainerInner, this.video_ad_player);this.adsLoader=new google.ima.AdsLoader(this.adDisplayContainer);
this.adsLoader.getSettings().setDisableCustomPlaybackForIOS10Plus(true);
this.adsLoader.getSettings().setLocale(this.options.locale);
this.adsLoader.getSettings().setVpaidMode(this._getVPAIDMode());
this.adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, this._onAdsManagerLoaded, false, this);
this.adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this._onAdError, false, this);
}}, {  key:"_onAdsManagerLoaded",
  value:function _onAdsManagerLoaded(adsManagerLoadedEvent){var _this10=this;var adsRenderingSettings=new google.ima.AdsRenderingSettings();
  adsRenderingSettings.autoAlign=true;
  adsRenderingSettings.enablePreloading=true;
  adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete=true;
  adsRenderingSettings.uiElements=[google.ima.UiElements.AD_ATTRIBUTION, google.ima.UiElements.COUNTDOWN];this.adsManager=adsManagerLoadedEvent.getAdsManager(this.video_ad_player, adsRenderingSettings);this.adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this._onAdError.bind(this), false, this);this.adsManager.addEventListener(google.ima.AdEvent.Type.AD_BREAK_READY, this._onAdEvent.bind(this), this);
this.adsManager.addEventListener(google.ima.AdEvent.Type.AD_METADATA, this._onAdEvent.bind(this), this);
this.adsManager.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED, this._onAdEvent.bind(this), this);
this.adsManager.addEventListener(google.ima.AdEvent.Type.CLICK, this._onAdEvent.bind(this), this);
this.adsManager.addEventListener(google.ima.AdEvent.Type.COMPLETE, this._onAdEvent.bind(this), this);
this.adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, this._onAdEvent.bind(this), this);
this.adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, this._onAdEvent.bind(this), this);
this.adsManager.addEventListener(google.ima.AdEvent.Type.DURATION_CHANGE, this._onAdEvent.bind(this), this);
this.adsManager.addEventListener(google.ima.AdEvent.Type.FIRST_QUARTILE, this._onAdEvent.bind(this), this);
this.adsManager.addEventListener(google.ima.AdEvent.Type.IMPRESSION, this._onAdEvent.bind(this), this);
this.adsManager.addEventListener(google.ima.AdEvent.Type.INTERACTION, this._onAdEvent.bind(this), this);
this.adsManager.addEventListener(google.ima.AdEvent.Type.LINEAR_CHANGED, this._onAdEvent.bind(this), this);
this.adsManager.addEventListener(google.ima.AdEvent.Type.LOADED, this._onAdEvent.bind(this), this);
this.adsManager.addEventListener(google.ima.AdEvent.Type.LOG, this._onAdEvent.bind(this), this);
this.adsManager.addEventListener(google.ima.AdEvent.Type.MIDPOINT, this._onAdEvent.bind(this), this);
this.adsManager.addEventListener(google.ima.AdEvent.Type.PAUSED, this._onAdEvent.bind(this), this);
this.adsManager.addEventListener(google.ima.AdEvent.Type.RESUMED, this._onAdEvent.bind(this), this);
this.adsManager.addEventListener(google.ima.AdEvent.Type.SKIPPABLE_STATE_CHANGED, this._onAdEvent.bind(this), this);
this.adsManager.addEventListener(google.ima.AdEvent.Type.SKIPPED, this._onAdEvent.bind(this), this);
this.adsManager.addEventListener(google.ima.AdEvent.Type.STARTED, this._onAdEvent.bind(this), this);
this.adsManager.addEventListener(google.ima.AdEvent.Type.THIRD_QUARTILE, this._onAdEvent.bind(this), this);
this.adsManager.addEventListener(google.ima.AdEvent.Type.USER_CLOSE, this._onAdEvent.bind(this), this);
this.adsManager.addEventListener(google.ima.AdEvent.Type.VOLUME_CHANGED, this._onAdEvent.bind(this), this);
this.adsManager.addEventListener(google.ima.AdEvent.Type.VOLUME_MUTED, this._onAdEvent.bind(this), this);window.addEventListener("resize", function (){if(_this10.adsManager){  _this10.adsManager.resize(_this10.options.width, _this10.options.height, google.ima.ViewMode.NORMAL);}});if(!this.adDisplayContainerInitialized){this.adDisplayContainer.initialize();
  this.adDisplayContainerInitialized=true;
}
  
var time=new Date();var h=time.getHours();var d=time.getDate();var m=time.getMonth();var y=time.getFullYear();var eventName="AD_SDK_MANAGER_READY";
this.eventBus.broadcast(eventName, {name: eventName,
message: "AD SDK is ready",
status: "success",
analytics: {  category: eventName,
action: this.parentDomain,
label: "h".concat(h, " d").concat(d, " m").concat(m, " y").concat(y)
}});}}, {  key:"_onAdEvent",
  value:function _onAdEvent(adEvent){var time=new Date();var h=time.getHours();var d=time.getDate();var m=time.getMonth();var y=time.getFullYear();var eventName=(0, _common.getKeyByValue)(google.ima.AdEvent.Type, adEvent.type);var adSuccess=false;this._sendIMAEventsToHB(adEvent);var eventMessage="";switch (adEvent.type){case google.ima.AdEvent.Type.AD_BREAK_READY:
  eventMessage="Fired when an ad rule or a VMAP ad break would " + "have played if autoPlayAdBreaks is false.";
  break;case google.ima.AdEvent.Type.AD_METADATA:
  eventMessage="Fired when an ads list is loaded.";
  break;case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
adSuccess=true;
  eventMessage="Fired when the ads manager is done playing all " + "the ads.";
  break;case google.ima.AdEvent.Type.CLICK:
  eventMessage="Fired when the ad is clicked.";
  break;case google.ima.AdEvent.Type.COMPLETE:
adSuccess=true;
  eventMessage="Fired when the ad completes playing.";
  break;case google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED:
  eventMessage="Fired when content should be paused. This " + "usually happens right before an ad is about to cover " + "the content.";break;case google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED:
  eventMessage="Fired when content should be resumed. This " + "usually happens when an ad finishes or collapses.";
adSuccess=true;
  break;case google.ima.AdEvent.Type.DURATION_CHANGE:
  eventMessage="Fired when the ad's duration changes.";
  break;case google.ima.AdEvent.Type.FIRST_QUARTILE:
  eventMessage="Fired when the ad playhead crosses first " + "quartile.";
  break;case google.ima.AdEvent.Type.IMPRESSION:
  eventMessage="Fired when the impression URL has been pinged.";
  break;case google.ima.AdEvent.Type.INTERACTION:
  eventMessage="Fired when an ad triggers the interaction " + "callback. Ad interactions contain an interaction ID " + "string in the ad data.";
  break;case google.ima.AdEvent.Type.LINEAR_CHANGED:
  eventMessage="Fired when the displayed ad changes from " + "linear to nonlinear, or vice versa.";
  break;case google.ima.AdEvent.Type.LOADED:
  
  break;case google.ima.AdEvent.Type.LOG:
var adData=adEvent.getAdData();if(adData["adError"]){eventMessage=adEvent.getAdData();
}
  break;case google.ima.AdEvent.Type.MIDPOINT:
  eventMessage="Fired when the ad playhead crosses midpoint.";
  break;case google.ima.AdEvent.Type.PAUSED:
  eventMessage="Fired when the ad is paused.";
  break;case google.ima.AdEvent.Type.RESUMED:
  eventMessage="Fired when the ad is resumed.";
  break;case google.ima.AdEvent.Type.SKIPPABLE_STATE_CHANGED:
  eventMessage="Fired when the displayed ads skippable state " + "is changed.";
  break;case google.ima.AdEvent.Type.SKIPPED:
adSuccess=true;
  eventMessage="Fired when the ad is skipped by the user.";
  break;case google.ima.AdEvent.Type.STARTED:
  eventMessage="Fired when the ad starts playing.";
  break;case google.ima.AdEvent.Type.THIRD_QUARTILE:
  eventMessage="Fired when the ad playhead crosses third " + "quartile.";
  break;case google.ima.AdEvent.Type.USER_CLOSE:
adSuccess=true;
  eventMessage="Fired when the ad is closed by the user.";
  break;case google.ima.AdEvent.Type.VOLUME_CHANGED:
  eventMessage="Fired when the ad volume has changed.";
  break;case google.ima.AdEvent.Type.VOLUME_MUTED:
  eventMessage="Fired when the ad volume has been muted.";
break;
}
  
if(eventName !== "" && eventMessage !== ""){this.eventBus.broadcast(eventName, {  name: eventName,
message: eventMessage,
status: "success",
analytics: {category: eventName,
  action: this.parentDomain,
  label: "h".concat(h, " d").concat(d, " m").concat(m, " y").concat(y)
}});}
if(adSuccess && !this.adSuccess){this.adSuccess=true;
  this.eventBus.broadcast("AD_SUCCESS", {  message: "Ad succeeded.",
status: "success"
});}}}, {  key:"_onAdError",
  value:function _onAdError(event){this.requestRunning=false;this._resetAdsLoader();this._clearSafetyTimer("ERROR");this._hide("_onAdError");this._sendIMAEventsToHB(event);try{var eventName="AD_ERROR";var imaError=event.getError();var eventMessage=imaError.getErrorCode().toString() || imaError.getVastErrorCode().toString();var eventInnerMessage=this._getInnerErrorCode(imaError);this.eventBus.broadcast(eventName, {  message: eventMessage,
details: eventInnerMessage,
status: "warning",
analytics: {category: eventName,
  action: eventInnerMessage,
  label: eventMessage
}});}catch(error){// console.log(error);
}}},{  key:"_sendIMAEventsToHB",
  value:function _sendIMAEventsToHB(event){if(!window.idhbgd || typeof window.idhbgd.onImaEvent !== 'function') return;try{window.idhbgd.onImaEvent(event);
}catch(error){}}},{  key:"_resetAdsLoader",
  value:function _resetAdsLoader(){if(this.adsManager){this.adsManager.destroy();
  this.adsManager=null;
}
if(this.adsLoader){this.adsLoader.contentComplete();
}}}, {  key:"_startSafetyTimer",
  value:function _startSafetyTimer(time, from){var _this11=this;if(this.safetyTimer) clearTimeout(this.safetyTimer);
this.safetyTimer=window.setTimeout(function (){_this11.cancel();  _this11._clearSafetyTimer(from);
}, time);
}}, {  key:"_clearSafetyTimer",
  value:function _clearSafetyTimer(from){if(typeof this.safetyTimer !== "undefined" && this.safetyTimer !== null){clearTimeout(this.safetyTimer);
  this.safetyTimer=undefined;
}}},{  key:"_getVPAIDMode",
  value:function _getVPAIDMode(){if(this.options.vpaid_mode==="disabled") return google.ima.ImaSdkSettings.VpaidMode.DISABLED;else if(this.options.vpaid_mode==="insecure") return google.ima.ImaSdkSettings.VpaidMode.INSECURE;else return google.ima.ImaSdkSettings.VpaidMode.ENABLED;}},{  key:"_getPrebidScripts",
  value:function _getPrebidScripts(){var preBidScriptPaths=["https://hb.improvedigital.com/pbw/gameDistributionV1.2.min.js", "http://hb.improvedigital.com/pbw/gameDistributionV1.2.min.js"];if(this.options.hb_script) return [this.options.hb_script].concat(preBidScriptPaths);else return preBidScriptPaths;}},{  key:"_getInnerErrorCode",
  value:function _getInnerErrorCode(error){if(!(0, _isFunction.default)(error.getInnerError)) return;var innerError=error.getInnerError();if(!innerError) return;if((0, _isFunction.default)(innerError.getErrorCode) && (0, _isFunction.default)(innerError.getVastErrorCode)) return innerError.getErrorCode().toString() || innerError.getVastErrorCode().toString();
 return innerError.message;}},{  key:"resetForNext",
  value:function resetForNext(){this.requestRunning=false;this._hide("resetForNext");}},{  key:"_createCustomAdVastUrl",
  value:function _createCustomAdVastUrl(vast, options){var transformed=this.macros.transform(vast, {get: function get(key){if(options && options.tnl_keys){return options.tnl_keys[key.toLowerCase()];
}}
});for(var key in transformed.query || {}){var value=transformed.query[key];if((0, _isPlainObject.default)(value)){  transformed.query[key]=qs.stringify(value);}}
  
var parser=new Url(transformed.url, true);merge(parser.query, transformed.query || {});var targetUrl=parser.toString();
 return _objectSpread({url: targetUrl
}, options);}},{  key:"_transformVast",
  value:function _transformVast(vast, context){var result={url: vast.url
};try{var parser=new Url(vast.url, true);var transformed=this._transformQuery(vast, context, parser);if(transformed) result.url=parser.toString();var cust_params=qs.parse(parser.query.cust_params);
result.bidder=cust_params.hb_bidder;
result.price=cust_params.gd_fp;
   return result;
}catch(error){result.hasError=true;
result.message=error.message;
result.bidder="error";
console.log(error.message);
   return result;
}}},{  key:"_transformQuery",
  value:function _transformQuery(vast, context, parser){if(!vast || !context || !vast.tnl_keys) return;var vast_query=this.options.vast_query;if(context.retry_on_success && this.options.retry_on_success && (0, _isPlainObject.default)(this.options.retry_on_success.vast_query)) vast_query=this.options.retry_on_success.vast_query;else if(context.retry_on_failure && this.options.retry_on_failure && (0, _isPlainObject.default)(this.options.retry_on_failure.vast_query)) vast_query=this.options.retry_on_failure.vast_query;
  vast_query=(0, _lodash.default)(vast_query);if(!(0, _isPlainObject.default)(vast_query)) return;var query=parser.query;if(vast_query["$$remove"]){for(var key in query){var regex=new RegExp(vast_query["$$remove"], "i");if(!regex.test(key)) continue;
delete query[key];}
delete vast_query["$$remove"];
}
  
var cust_params=qs.parse(query.cust_params);if(vast_query.cust_params && vast_query.cust_params["$$remove"]){for(var _key in cust_params){var _regex=new RegExp(vast_query.cust_params["$$remove"], "i");if(!_regex.test(_key)) continue;
delete cust_params[_key];}
delete vast_query.cust_params["$$remove"];
}
  
var transformed=this.macros.transform(vast_query, {get: function get(key){ return vast.tnl_keys[key.toLowerCase()];}});
  query.cust_params=cust_params;
  merge(query, transformed);
  query.cust_params=qs.stringify(query.cust_params);
 return true;
}}]); return VideoAd;}();var _default=VideoAd;
  exports.default=_default;}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../components/EventBus":350,"../modules/adType":357,"../modules/common":358,"../modules/layers":361,"babel-polyfill":1,"can-autoplay":3,"is-function":336,"is-plain-object":337,"lodash.clonedeep":340,"lodash.merge":341,"querystringify":343,"url-parse":347}],355:[function(require,module,exports){  'use strict';var _main=_interopRequireDefault(require("./main"));var _adType=require("./modules/adType");function _interopRequireDefault(obj){ return obj && obj.__esModule ? obj : { default: obj };}
  function _typeof(obj){if(typeof Symbol==="function" && typeof Symbol.iterator==="symbol"){ _typeof=function _typeof(obj){ return typeof obj;};}else{ _typeof=function _typeof(obj){ return obj && typeof Symbol==="function" && obj.constructor===Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};} return _typeof(obj);}
var settings=(typeof GD_OPTIONS==="undefined" ? "undefined" : _typeof(GD_OPTIONS))==='object' && GD_OPTIONS ? GD_OPTIONS : window.gdApi && _typeof(window.gdApi.q[0][0])==='object' && window.gdApi.q[0][0] ? window.gdApi.q[0][0] : {};if(window.gdApi && _typeof(window.gdApi.q[0][0])==='object' && window.gdApi.q[0][0]){if(!settings.hasOwnProperty('advertisementSettings')){settings.advertisementSettings={  autoplay: true};
}}
  
var sdk=new _main.default(settings);
  function SDKDeprecated(){
this.showBanner=function (){sdk.showBanner();
};
this.play=function (){};
this.customLog=function (){};}
  function SDK(){
this.AdType=_adType.AdType;
this.preloadAd=function (adType){  return sdk.preloadAd(adType);
};
this.showAd=function (adType, options){if(adType===_adType.AdType.Display){ return sdk.showDisplayAd(options);
}
  return sdk.showAd(adType);
};
this.cancelAd=function (){  return sdk.cancelAd();
};
this.openConsole=function (){sdk.openConsole();
};
this.getSession=function (){  return sdk.session();
};}
  SDK.prototype=new SDKDeprecated();
  window.gdsdk=new SDK();
  window.gdApi=window.gdsdk;},{"./main":356,"./modules/adType":357}],356:[function(require,module,exports){  (function (global){  "use strict";Object.defineProperty(exports, "__esModule", {value: true
});
  exports.default=void 0;require("es6-promise/auto");require("whatwg-fetch");var _package=_interopRequireDefault(require("../package.json"));var _EventBus=_interopRequireDefault(require("./components/EventBus"));var _ImplementationTest=_interopRequireDefault(require("./components/ImplementationTest"));var _VideoAd=_interopRequireDefault(require("./components/VideoAd"));var _MessageRouter=_interopRequireDefault(require("./components/MessageRouter"));var _adType=require("./modules/adType");var _eventList=require("./modules/eventList");var _dankLog=require("./modules/dankLog");var _common=require("./modules/common");var _jsBase=require("js-base64");var _Macros=_interopRequireDefault(require("./components/Macros"));var _quantum=_interopRequireDefault(require("./splash/quantum"));var _mars=_interopRequireDefault(require("./splash/mars"));var _pluto=_interopRequireDefault(require("./splash/pluto"));var _hammer=_interopRequireDefault(require("./promo/hammer"));var _puzzle=_interopRequireDefault(require("./promo/puzzle"));var _isPlainObject=_interopRequireDefault(require("is-plain-object"));function _interopRequireDefault(obj){ return obj && obj.__esModule ? obj : { default: obj };}
  function ownKeys(object, enumerableOnly){ var keys=Object.keys(object); if(Object.getOwnPropertySymbols){ var symbols=Object.getOwnPropertySymbols(object); if(enumerableOnly) symbols=symbols.filter(function (sym){ return Object.getOwnPropertyDescriptor(object, sym).enumerable;}); keys.push.apply(keys, symbols);} return keys;}
  function _objectSpread(target){for(var i=1; i < arguments.length; i++){ var source=arguments[i] != null ? arguments[i] : {}; if(i % 2){ ownKeys(source, true).forEach(function (key){ _defineProperty(target, key, source[key]);});}else if(Object.getOwnPropertyDescriptors){ Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));}else{ ownKeys(source).forEach(function (key){ Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}} return target;}
  function _defineProperty(obj, key, value){if(key in obj){ Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });}else{ obj[key]=value;} return obj;}
  function _classCallCheck(instance, Constructor){if(!(instance instanceof Constructor)){ throw new TypeError("Cannot call a class as a function");}}
  function _defineProperties(target, props){for(var i=0;i<props.length; i++){ var descriptor=props[i]; descriptor.enumerable=descriptor.enumerable || false; descriptor.configurable=true; if("value" in descriptor) descriptor.writable=true; Object.defineProperty(target, descriptor.key, descriptor);}}
  function _createClass(Constructor, protoProps, staticProps){if(protoProps) _defineProperties(Constructor.prototype, protoProps); if(staticProps) _defineProperties(Constructor, staticProps); return Constructor;}
if(!global._babelPolyfill){  require("babel-polyfill");}
var cloneDeep=require("lodash.clonedeep");var Url=require("url-parse");var qs=require("querystringify");var isArray=require("is-array");var instance=null;var SDK =
  
  function (){function SDK(options){var _this=this;_classCallCheck(this, SDK);if(instance) return instance;else instance=this;this._defaults=this._getDefaultOptions();this._extendDefaultOptions(this._defaults, options);
this._bridge=this._getBridgeContext();this._parentURL=this._bridge.parentURL;
this._parentDomain=this._bridge.parentDomain;
this._topDomain=this._bridge.topDomain;this._setConsoleBanner();
this._loadGoogleAnalytics();
this._checkWhitelabelPartner();this._checkUserDeclinedTracking();this._initializeMessageRouter();this._checkConsole();
this._subscribeToEvents();
this._gdpr();
this.sdkReady=new Promise(this._initializeSDKWithGameData.bind(this));
this.sdkReady.then(function (response){  _this._sdk_ready=true;
}).catch(function (error){  _this._sdk_ready=false;
}).finally(function (){  _this._sendLoaderDataEvent();_this._sendLoadedEvent();_this._checkSplashAndPromoScreens();_this._initBlockingExternals();_this._pauseGameOnStartupIfEnabled();window.addEventListener("DOMNodeInserted", function (){if(_this._gameData.block_exts){  _this._removeExternalsInHtml({enabled: false
});}});});}
_createClass(SDK, [{  key:"_pauseGameOnStartupIfEnabled",
  value:function _pauseGameOnStartupIfEnabled(){if(this._bridge.pauseGameOnStartup){// this.msgrt.send("gamezone.pause");
}}},{  key:"_sendLoaderDataEvent",
  value:function _sendLoaderDataEvent(){  try{this.options.onLoaderEvent({  name: "LOADER_DATA",
message: {game: this._gameData,
  bridge: this._bridge
},
status: this._sdk_ready ? "success" : "error"
});}catch(error){}}},{  key:"_sendLoadedEvent",
  value:function _sendLoadedEvent(){if(this._bridge.noLoadedEvent) return;this._sendTunnlEvent(1);this.msgrt.send("loaded", {message: this._hasBlocker ? "Has Blocker" : "No Blocker"
});}},{  key:"_initializeSDKWithGameData",
  value:function _initializeSDKWithGameData(resolve, reject){ return regeneratorRuntime.async(function _initializeSDKWithGameData$(_context){while (1){  switch (_context.prev=_context.next){case 0:
_context.prev=0;
_context.next=3;
  return regeneratorRuntime.awrap(this._getGameData());  case 3:
this._gameData=_context.sent;this._checkGameId();this._checkBlocking();this._changeMidrollInDebugMode();  _context.next=9;
  return regeneratorRuntime.awrap(this._initializeVideoAd());  case 9:
this._sendSDKReady();  resolve(this._gameData);
_context.next=18;
break;  case 13:
_context.prev=13;
_context.t0=_context["catch"](0);this._sendSDKError(_context.t0);
this.onResumeGame(_context.t0.message, "warning");  reject(_context.t0);  case 18:
case "end":
  return _context.stop();
}}
}, null, this, [[0, 13]]);}},{  key:"_getDefaultOptions",
  value:function _getDefaultOptions(){var defaults={debug: false,
testing: false,
gameId: "4f3d7d38d24b740c95da2b03dc3a2333",
prefix: "gdsdk__",
onEvent: function onEvent(event){},
onLoaderEvent: function onLoaderEvent(event){},
  

flashSettings: {  adContainerId: "",
splashContainerId: ""
},
advertisementSettings: {},
resumeGame: function resumeGame(){},
pauseGame: function pauseGame(){},
onInit: function onInit(data){},
onError: function onError(data){},
loader: {}};
 return defaults;}},{  key:"_extendDefaultOptions",
  value:function _extendDefaultOptions(defaults, options){var target=cloneDeep(defaults);if(options) this.options=(0, _common.extendDefaults)(target, options);else this.options=target;
this.options.gameId=this.options.gameId.trim();}},{  key:"_setConsoleBanner",
  value:function _setConsoleBanner(){if(this._bridge.noConsoleBanner) return;var version=_package.default.version;var banner=console.log("%c %c %c GameDistribution.com HTML5 SDK | Version: " + version + " %c %c %c", "background: #9854d8", "background: #6c2ca7", "color: #fff; background: #450f78;", "background: #6c2ca7", "background: #9854d8", "background: #ffffff");
  console.log.apply(console, banner);}},{  key:"_sendTunnlEvent",
  value:function _sendTunnlEvent(eventType){  fetch("https://ana.tunnl.com/event?page_url=".concat(encodeURIComponent(this._parentURL), "&game_id=").concat(this.options.gameId, "&eventtype=").concat(eventType));}},{  key:"_sendAdRequestContext",
  value:function _sendAdRequestContext(context){this.msgrt.send('adctx', {message: context.adTag.bidder
});}},{  key:"_checkWhitelabelPartner",
  value:function _checkWhitelabelPartner(){this._whitelabelPartner=false;var xanthophyll=(0, _common.getQueryParams)("xanthophyll");if(xanthophyll.hasOwnProperty("xanthophyll") && xanthophyll["xanthophyll"]==="true"){this._whitelabelPartner=true;
(0, _dankLog.dankLog)("White label publisher", "".concat(this._whitelabelPartner), "success");
}}},{  key:"_checkConsole",
  value:function _checkConsole(){  try{if(!_common.Ls.available) return;if(this._parentDomain==="developer.gamedistribution.com"){  _common.Ls.set("gd_debug_ex", true);_common.Ls.set("gd_disable_midroll_timer", true);_common.Ls.set("gd_tag", true);}else if(this._parentDomain==="localhost:3000"){  _common.Ls.set("gd_debug_ex", true);_common.Ls.set("gd_disable_midroll_timer", true);}
  
if(_common.Ls.getBoolean("gd_debug_ex")){this.openConsole();
this.msgrt.send("dev.console", {message: this._parentDomain
});}}catch(error){}}},{  key:"_checkUserDeclinedTracking",
  value:function _checkUserDeclinedTracking(){this._userDeclinedTracking=document.location.search.indexOf("gdpr-tracking=0") >= 0 || document.cookie.indexOf("ogdpr_tracking=0") >= 0;}},{  key:"_initializeMessageRouter",
  value:function _initializeMessageRouter(){this.msgrt=new _MessageRouter.default({gameId: this.options.gameId,
hours: new Date().getHours(),
topDomain: this._topDomain,
domain: this._parentDomain,
referrer: this._parentURL,
depth: (0, _common.getIframeDepth)(),
version: _package.default.version,
tracking: this._userDeclinedTracking,
whitelabel: this._whitelabelPartner,
platform: (0, _common.getMobilePlatform)(),
byloader: this._bridge.isTokenGameURL,
isTokenGameURL: this._bridge.isTokenGameURL,
isMasterGameURL: this._bridge.isMasterGameURL,
isExtHostedGameURL: this._bridge.isExtHostedGameURL,
byloaderVersion: this._bridge.version
});}},{  key:"_loadGoogleAnalytics",
  value:function _loadGoogleAnalytics(){var _this2=this;var userDeclinedTracking=document.location.search.indexOf("gdpr-tracking=0") >= 0 || document.cookie.indexOf("ogdpr_tracking=0") >= 0;var googleScriptPaths=["https://www.google-analytics.com/analytics.js"];(0, _common.getScript)(googleScriptPaths[0], "gdsdk_google_analytics", {alternates: googleScriptPaths,
error_prefix: "Blocked:",
exists: function exists(){ return window["ga"];}}).then(function (){window["ga"]("create", "UA-60359297-49", {  name: "gd",
cookieExpires: 90 * 86400,
sampleRate: 5
  
}, "auto");if(!_this2._bridge.noGAPageView){  window["ga"]("gd.send", "pageview");}
  
if(!userDeclinedTracking){  window["ga"]("gd.set", "anonymizeIp", true);}}).catch(function (error){_this2._sendSDKError(error);
});}},{  key:"_subscribeToEvents",
  value:function _subscribeToEvents(){var _this3=this;this.eventBus=new _EventBus.default();_eventList.SDKEvents.forEach(function (eventName){return _this3.eventBus.subscribe(eventName, function (event){ return _this3._onEvent(event);}, "sdk");
});this.eventBus.subscribe("AD_SDK_CANCELED", function (){// this.msgrt.send("ad.cancelled");
},"sdk");_eventList.IMAEvents.forEach(function (eventName){return _this3.eventBus.subscribe(eventName, function (event){ return _this3._onEvent(event);}, "ima");
});this.eventBus.subscribe("COMPLETE", function (){if(_this3._parentDomain==="developer.gamedistribution.com" || new RegExp("^localhost").test(_this3._parentDomain)===true){  fetch("https://game.api.gamedistribution.com/game/v2/hasapi/".concat(_this3.options.gameId, "?timestamp=").concat(new Date().valueOf()));try{var message=JSON.stringify({  type: "GD_SDK_IMPLEMENTED",
gameID: _this3.options.gameId
});if(window.location !== window.top.location){  window.top.postMessage(message, "*");}else if(window.opener !== null && window.opener.location !== window.location){  window.opener.postMessage(message, "*");}}catch(e){// For some reason, the postmessage didn't work (maybe there is no parent).
}}
},"ima");
this.eventBus.subscribe("CONTENT_PAUSE_REQUESTED", function (){return _this3.onPauseGame("New advertisements requested and loaded", "success");
},"ima");
this.eventBus.subscribe("IMPRESSION", function (arg){_this3.msgrt.send("ad.impression");},"ima");
this.eventBus.subscribe("SKIPPED", function (arg){//
},"ima");
this.eventBus.subscribe("AD_ERROR", function (arg){_this3.msgrt.send("ad.error", {  message: arg.message,
details: arg.details
});},"ima");
this.eventBus.subscribe("CLICK", function (arg){// this.msgrt.send("ad.click");
},"ima");
this.eventBus.subscribe("COMPLETE", function (arg){// this.msgrt.send("ad.complete");
},"ima");
this.eventBus.subscribe("AD_SDK_REQUEST", function (arg){_this3._sendTunnlEvent(2);  _this3._sendAdRequestContext(arg.message);
},"sdk");
this.eventBus.subscribe("SDK_ERROR", function (arg){if(arg.message.startsWith("Blocked:")){if(!_this3._bridge.noBlockerEvent){_this3.msgrt.send("error", {  message: arg.message
});if(!_this3._hasBlocker){  _this3._hasBlocker=true;  _this3._sendTunnlEvent(3);}}
}else{  _this3.msgrt.send("error", {message: arg.message
});}},"sdk");
this.eventBus.subscribe("AD_REQUEST", function (arg){// this.msgrt.send(`req.ad.${arg.message}`);
},"sdk");
this.eventBus.subscribe("AD_REQUEST_KEYS_EMPTY", function (arg){_this3.msgrt.send("tunnl.keys.empty", {  message: arg.message,
details: arg.details
});},"sdk");
this.eventBus.subscribe("AD_REQUEST_KEYS_FALLBACK", function (arg){_this3.msgrt.send("tunnl.keys.fallback", {  message: arg.message,
details: arg.details
});},"sdk");
}}, {  key:"_gdpr",
  value:function _gdpr(){var _this4=this;var tracking=document.location.search.indexOf("gdpr-tracking") >= 0;var trackingConsent=document.location.search.indexOf("gdpr-tracking=1") >= 0;var targeting=document.location.search.indexOf("gdpr-targeting") >= 0;var targetingConsent=document.location.search.indexOf("gdpr-targeting=1") >= 0;var third=document.location.search.indexOf("gdpr-third-party") >= 0;var thirdConsent=document.location.search.indexOf("gdpr-third-party=1") >= 0;var GeneralDataProtectionRegulation=[{name: "SDK_GDPR_TRACKING",
message: tracking ? trackingConsent ? "Allowed" : "Not allowed" : "Not set",
status: trackingConsent ? "success" : "warning",
label: tracking ? trackingConsent ? "1" : "0" : "not set"
}, {name: "SDK_GDPR_TARGETING",
message: targeting ? targetingConsent ? "Allowed" : "Not allowed" : "Not set",
status: targetingConsent ? "success" : "warning",
label: targeting ? targetingConsent ? "1" : "0" : "not set"
}, {name: "SDK_GDPR_THIRD_PARTY",
message: third ? thirdConsent ? "Allowed" : "Not allowed" : "Not set",
status: thirdConsent ? "success" : "warning",
label: third ? thirdConsent ? "1" : "0" : "not set"
}];
  GeneralDataProtectionRegulation.forEach(function (obj){_this4.eventBus.broadcast(obj.name, {  name: obj.name,
message: obj.message,
status: obj.status,
analytics: {category: obj.name,
  action: _this4._parentDomain,
  label: obj.label
}});});}},{  key:"_checkGameId",
  value:function _checkGameId(){if(this.options.gameId===this._defaults.gameId){this._sendSDKError("Check correctness of your GAME ID. Otherwise, no revenue will be recorded.");
}}},{  key:"_getDefaultGameData",
  value:function _getDefaultGameData(){ return {gameId: this.options.gameId,
enableAds: true,
preroll: true,
midroll: 2 * 60000,
rewardedAds: false,
title: "",
tags: [],
category: "",
assets: [],
sdk: this._getDefaultAdSDKData(),
loader: this._getDefaultLoaderData(),
splash: this._getDefaultSplashData(),
promo: this._getDefaultPromoData(),
dAds: this._getDefaultDisplayAdsData(),
pAds: this._getDefaultPrerollAdsData(),
mAds: this._getDefaultMidrollAdsData(),
rAds: this._getDefaultRewardedAdsData()
};}},{  key:"_getDefaultAdSDKData",
  value:function _getDefaultAdSDKData(){ return {};}},{  key:"_getDefaultLoaderData",
  value:function _getDefaultLoaderData(){ return {};}},{  key:"_getDefaultSplashData",
  value:function _getDefaultSplashData(){ return {};}},{  key:"_getDefaultPromoData",
  value:function _getDefaultPromoData(){ return {};}},{  key:"_getDefaultDisplayAdsData",
  value:function _getDefaultDisplayAdsData(){ return {enabled: true
};}},{  key:"_getDefaultPrerollAdsData",
  value:function _getDefaultPrerollAdsData(){ return {};}},{  key:"_getDefaultMidrollAdsData",
  value:function _getDefaultMidrollAdsData(){ return {};}},{  key:"_getDefaultRewardedAdsData",
  value:function _getDefaultRewardedAdsData(){ return {};}},{  key:"_getGameDataUrl",
  value:function _getGameDataUrl(){var gameDataUrl="https://game.api.gamedistribution.com/game/v3/get/".concat(this.options.gameId.replace(/-/g, ""), "/?domain=").concat(this._parentDomain, "&v=").concat(_package.default.version, "&localTime=").concat(new Date().getHours());
 return gameDataUrl;}},{  key:"_checkBlocking",
  value:function _checkBlocking(){}},{  key:"_changeMidrollInDebugMode",
  value:function _changeMidrollInDebugMode(){var gameData=this._gameData;if(!_common.Ls.available) return;if(_common.Ls.getBoolean("gd_debug_ex")){if(_common.Ls.getBoolean("gd_disable_midroll_timer")) gameData.midroll=0;else gameData.midroll=this._getDefaultGameData().midroll;
}}},{  key:"_checkSplashAndPromoScreens",
  value:function _checkSplashAndPromoScreens(){var gameData=this._gameData;var isConsentDomain=gameData.gdpr && gameData.gdpr.consent===true;var loader=gameData.loader;var promo=gameData.promo;if(this.options.loader.enabled){if(promo.enabled) this._createPromoBeforeSplash(gameData, isConsentDomain);else{if(loader.enabled) this._createSplash(gameData, isConsentDomain);else this.onResumeGame("Advertisement(s) are done. Start / resume the game.", "success");}}else if(!loader.enabled && (!this._bridge.isTokenGameURL || !this._bridge.isExtHostedGameURL)){if(!gameData.preroll){this.adRequestTimer=Date.now();}else if(this.options.advertisementSettings.autoplay || isConsentDomain){if(promo.enabled) this._createPromoBeforeSplash(gameData, isConsentDomain);else if(loader.enabled !== false) this._createSplash(gameData, isConsentDomain);}else{if(promo.enabled) this._createPromo(gameData, isConsentDomain);}}
}},{  key:"_initializeVideoAd",
  value:function _initializeVideoAd(){var gameData;
 return regeneratorRuntime.async(function _initializeVideoAd$(_context2){while (1){  switch (_context2.prev=_context2.next){case 0:
gameData=this._gameData;if(gameData.sdk.enabled) this.options.advertisementSettings=(0, _common.extendDefaults)(this.options.advertisementSettings, gameData.sdk);
this.macros=new _Macros.default({game: gameData,
bridge: this._bridge
});this.adInstance=new _VideoAd.default(
this.options.flashSettings.adContainerId, this.options.advertisementSettings, {parentURL: this._parentURL,
parentDomain: this._parentDomain
});this.adInstance.gameId=gameData.gameId;
this.adInstance.category=gameData.category;
this.adInstance.tags=gameData.tags;
this.adInstance.noPreroll=this._bridge.noPreroll;
this.adInstance.macros=this.macros;  _context2.next=11;
  return regeneratorRuntime.awrap(this.adInstance.start());  case 11:
case "end":
  return _context2.stop();
}}
}, null, this);}},{  key:"_sendSDKReady",
  value:function _sendSDKReady(){var eventName="SDK_READY";var eventMessage="Everything is ready.";
this.eventBus.broadcast(eventName, {message: eventMessage,
status: "success"
});try{this.options.onInit(eventMessage);
}catch(error){(0, _dankLog.dankLog)("DEVELOPER_ERROR", error.message, "warning");
}}},{  key:"_sendSDKError",
  value:function _sendSDKError(error){  error=error.message ? error : {message: error
};var eventName="SDK_ERROR";
this.eventBus.broadcast(eventName, {message: error.message,
status: "error"
});try{this.options.onError(error);
}catch(error){(0, _dankLog.dankLog)("DEVELOPER_ERROR", error.message, "warning");
}}}, {  key:"_onEvent",
  value:function _onEvent(event){  (0, _dankLog.dankLog)(event.name, event.message, event.status);
  
  
  try{this.options.onEvent({  name: event.name,
message: event.message,
status: event.status
});}catch(error){(0, _dankLog.dankLog)("DEVELOPER_ERROR", error.message, "warning");
}}}, {  key:"_getGameData",
  value:function _getGameData(){var _this6=this; return new Promise(function (resolve){var defaultGameData=_this6._getDefaultGameData();var gameDataUrl=_this6._getGameDataUrl();  fetch(gameDataUrl).then(function (response){ return response.json();}).then(function (json){if(json.success){var rawGame=json.result.game;
  var retrievedGameData={  gameId: rawGame.gameMd5,
description: rawGame.description,
enableAds: rawGame.enableAds,
preroll: rawGame.preRoll,
midroll: rawGame.timeAds * 60000,
rewardedAds: rawGame.rewardedAds,
title: rawGame.title,
tags: rawGame.tags,
category: rawGame.category,
assets: rawGame.assets,
disp_2nd_prer: rawGame.disp_2nd_prer,
ctry_vst: rawGame.ctry_vst,
ctry: rawGame.ctry,
block_exts: _this6._parseAndSelectRandomOne(rawGame.push_cuda),
bloc_gard: _this6._parseAndSelectRandomOne(rawGame.bloc_gard),
cookie: _this6._parseAndSelectRandomOne(rawGame.cookie),
gdpr: _this6._parseAndSelectRandomOne(rawGame.gdpr),
diagnostic: _this6._parseAndSelectRandomOne(rawGame.diagnostic),
sdk: _this6._parseAndSelectRandomOne(rawGame.sdk) || _this6._getDefaultAdSDKData(),
loader: _this6._parseAndSelectRandomOne(rawGame.loader) || _this6._getDefaultLoaderData(),
splash: _this6._parseAndSelectRandomOne(rawGame.splash) || _this6._getDefaultSplashData(),
promo: _this6._parseAndSelectRandomOne(rawGame.promo) || _this6._getDefaultPromoData(),
dAds: _this6._parseAndSelectRandomOne(rawGame.dads) || _this6._getDefaultDisplayAdsData(),
pAds: _this6._parseAndSelectRandomOne(rawGame.pads) || _this6._getDefaultPrerollAdsData(),
mAds: _this6._parseAndSelectRandomOne(rawGame.mads) || _this6._getDefaultMidrollAdsData(),
rAds: _this6._parseAndSelectRandomOne(rawGame.rads) || _this6._getDefaultRewardedAdsData()};
  var gameData=(0, _common.extendDefaults)(cloneDeep(defaultGameData), retrievedGameData);if(_this6._bridge.noPreroll){  _this6.adRequestTimer=Date.now();}
  _this6.msgrt.setGameData(gameData);(0, _dankLog.setDankLog)(gameData.diagnostic);
  resolve(gameData);
}else{defaultGameData.failed=true;
  resolve(defaultGameData);
}}).catch(function (error){  defaultGameData.failed=true;
resolve(defaultGameData);});});}}, {  key:"_createSplash",
  value:function _createSplash(gameData, isConsentDomain){var _this7=this;var ActiveSplash=this._getSplashTemplate(gameData);var splash=new ActiveSplash(_objectSpread({}, this.options, {isConsentDomain: isConsentDomain,
version: _package.default.version
}), gameData);
  splash.on("playClick", function (){if(isConsentDomain){var date=new Date();
date.setDate(date.getDate() + 90);document.cookie="ogdpr_tracking=1; expires=".concat(date.toUTCString(), "; path=/");}
  
_this7.showAd(_adType.AdType.Interstitial).catch(function (reason){});});
  splash.on("slotVisibilityChanged", function (slot){if(slot.visible){  _this7.showDisplayAd({containerId: slot.id,
  visible: slot.visible
});}});this.onPauseGame("Pause the game and wait for a user gesture", "success");this.eventBus.subscribe("SDK_GAME_PAUSE", function (){splash.hide();
});this.eventBus.subscribe("SDK_GAME_START", function (){splash.hide();
});}}, {  key:"_createPromoBeforeSplash",
  value:function _createPromoBeforeSplash(gameData, isConsentDomain){var _this8=this;var ActivePromo=this._getPromoTemplate(gameData);var promo=new ActivePromo(_objectSpread({}, this.options, {isConsentDomain: isConsentDomain,
version: _package.default.version
}), gameData);
  promo.on("skipClick", function (){promo.hide();  _this8._createSplash(gameData, isConsentDomain);
});}}, {  key:"_createPromo",
  value:function _createPromo(gameData, isConsentDomain){var _this9=this;var ActivePromo=this._getPromoTemplate(gameData);var promo=new ActivePromo(_objectSpread({}, this.options, {isConsentDomain: isConsentDomain,
version: _package.default.version
}), gameData);
  promo.on("skipClick", function (){promo.hide();  _this9.onResumeGame("Resumed after the promo", "warning");
});
this.onPauseGame("Pause the game for the promo", "success");
}}, {  key:"showBanner",
  value:function showBanner(){this.showAd(_adType.AdType.Interstitial).catch(function (reason){});}}, {  key:"showAd",
  value:function showAd(adType, retryOptions){var _this10=this; return regeneratorRuntime.async(function showAd$(_context4){while (1){  switch (_context4.prev=_context4.next){case 0:
  return _context4.abrupt("return", new Promise(function _callee(resolve, reject){var gameData, elapsed, scopeName, retry, onFailure, onSuccess;
 return regeneratorRuntime.async(function _callee$(_context3){  while (1){switch (_context3.prev=_context3.next){case 0:
_context3.prev=0;
_context3.next=3;
   return regeneratorRuntime.awrap(_this10.sdkReady);case 3:
gameData=_context3.sent;if(!(gameData.bloc_gard && gameData.bloc_gard.enabled===true)){_context3.next=6;
  break;
}
  throw new Error("Game or domain is blocked.");case 6:
  if(!(!gameData.enableAds || _this10._whitelabelPartner)){_context3.next=8;
  break;
}
  throw new Error("Advertisements are disabled.");case 8:
  if(adType){_context3.next=12;
  break;
}
adType=_adType.AdType.Interstitial;
_context3.next=14;
break;case 12:
  if(!(adType !== _adType.AdType.Interstitial && adType !== _adType.AdType.Rewarded)){_context3.next=14;
  break;
}
  throw new Error("Unsupported an advertisement type: ", adType);case 14:
  if(!(adType===_adType.AdType.Rewarded && !gameData.rewardedAds)){_context3.next=16;
  break;
}
  throw new Error("Rewarded ads are disabled.");case 16:
  if(!(adType===_adType.AdType.Interstitial && typeof _this10.adRequestTimer !== "undefined")){_context3.next=20;
  break;
}
elapsed=Date.now() - _this10.adRequestTimer;if(!(elapsed < gameData.midroll)){_context3.next=20;
  break;
}
  throw new Error("The advertisement was requested too soon.");case 20:
scopeName="main.showad";retry=function retry(options){};onFailure=function onFailure(args){};onSuccess=function onSuccess(args){};
_this10.eventBus.subscribe("AD_ERROR", onFailure, scopeName);_this10.eventBus.subscribe("AD_SDK_CANCELED", onFailure, scopeName);
_this10.eventBus.subscribe("AD_SUCCESS", onSuccess, scopeName);
_context3.next=29;
   return regeneratorRuntime.awrap(_this10.adInstance.startAd(adType, retryOptions));case 29:
_context3.next=35;
break;case 31:
_context3.prev=31;
_context3.t0=_context3["catch"](0);_this10.onResumeGame(_context3.t0.message, "warning");reject(_context3.t0.message);case 35:
  case "end":
   return _context3.stop();
}}
}, null, null, [[0, 31]]);
}));  case 1:
case "end":
  return _context4.stop();
}}
});}},{  key:"_isRetryOnSuccessEnabled",
  value:function _isRetryOnSuccessEnabled(adType){var gameData=this._gameData;var adPosition=this.adInstance.getAdPosition(adType);var result=gameData.sdk.enabled && (gameData.sdk.retry_on_success===true || (0, _isPlainObject.default)(gameData.sdk.retry_on_success));if(adPosition==='preroll' && typeof gameData.pAds.retry_on_success !== 'undefined') result=result && gameData.pAds.retry_on_success;else if(adPosition==='midroll' && typeof gameData.mAds.retry_on_success !== 'undefined') result=result && gameData.mAds.retry_on_success;else if(adPosition==='rewarded' && typeof gameData.rAds.retry_on_success !== 'undefined') result=result && gameData.rAds.retry_on_success;
 return result;}},{  key:"_isRetryOnFailureEnabled",
  value:function _isRetryOnFailureEnabled(adType){var gameData=this._gameData;var adPosition=this.adInstance.getAdPosition(adType);var result=gameData.sdk.enabled && (gameData.sdk.retry_on_failure===true || (0, _isPlainObject.default)(gameData.sdk.retry_on_failure));if(adPosition==='preroll' && typeof gameData.pAds.retry_on_failure !== 'undefined') result=result && gameData.pAds.retry_on_failure;else if(adPosition==='midroll' && typeof gameData.mAds.retry_on_failure !== 'undefined') result=result && gameData.mAds.retry_on_failure;else if(adPosition==='rewarded' && typeof gameData.rAds.retry_on_failure !== 'undefined') result=result && gameData.rAds.retry_on_failure;
 return result;
}}, {  key:"preloadAd",
  value:function preloadAd(adType){var _this11=this; return regeneratorRuntime.async(function preloadAd$(_context6){while (1){  switch (_context6.prev=_context6.next){case 0:
  return _context6.abrupt("return", new Promise(function _callee2(resolve, reject){var _gameData, result; return regeneratorRuntime.async(function _callee2$(_context5){  while (1){switch (_context5.prev=_context5.next){case 0:
_context5.prev=0;
_context5.next=3;
   return regeneratorRuntime.awrap(_this11.sdkReady);case 3:
_gameData=_context5.sent;if(!(_gameData.bloc_gard && _gameData.bloc_gard.enabled===true)){_context5.next=6;
  break;
}
  throw new Error("Game or domain is blocked.");case 6:
  if(adType){_context5.next=10;
  break;
}
adType=_adType.AdType.Rewarded;
_context5.next=12;
break;case 10:
  if(!(adType !== _adType.AdType.Interstitial && adType !== _adType.AdType.Rewarded)){_context5.next=12;
  break;
}
  throw new Error("Unsupported an advertisement type:" + adType);case 12:
  if(!(adType===_adType.AdType.Rewarded && !_gameData.rewardedAds)){_context5.next=14;
  break;
}
  throw new Error("Rewarded ads are disabled.");case 14:
_context5.next=16;
   return regeneratorRuntime.awrap(_this11.adInstance.preloadAd(adType));case 16:
result=_context5.sent;
resolve(result);
_context5.next=23;
break;case 20:
_context5.prev=20;
_context5.t0=_context5["catch"](0);
reject(_context5.t0);case 23:
  case "end":
   return _context5.stop();
}}
}, null, null, [[0, 20]]);
}));  case 1:
case "end":
  return _context6.stop();
}}
});}}, {  key:"cancelAd",
  value:function cancelAd(){var _this12=this; return regeneratorRuntime.async(function cancelAd$(_context8){while (1){  switch (_context8.prev=_context8.next){case 0:
  return _context8.abrupt("return", new Promise(function _callee3(reject, resolve){return regeneratorRuntime.async(function _callee3$(_context7){  while (1){switch (_context7.prev=_context7.next){case 0:
try{_this12.adInstance.cancel();resolve();
}catch(error){reject(error.message);
}
  case 1:
  case "end":
   return _context7.stop();
}}
});}));  case 1:
case "end":
  return _context8.stop();
}}
});}}, {  key:"showDisplayAd",
  value:function showDisplayAd(options){var _this13=this; return new Promise(function _callee4(resolve, reject){var _gameData2; return regeneratorRuntime.async(function _callee4$(_context9){  while (1){switch (_context9.prev=_context9.next){case 0:
_context9.prev=0;
_context9.next=3;
 return regeneratorRuntime.awrap(_this13.sdkReady);case 3:
_gameData2=_context9.sent;if(!_gameData2.dAds.enabled){  _context9.next=10;
break;
}
_context9.next=7;
 return regeneratorRuntime.awrap(_this13.adInstance.loadDisplayAd(options));case 7:
resolve();
_context9.next=11;
break;case 10:
reject('Display-Ads are disabled.');case 11:
_context9.next=16;
break;case 13:
_context9.prev=13;
_context9.t0=_context9["catch"](0);
reject(_context9.t0.message || _context9.t0);case 16:
case "end":
 return _context9.stop();}}
}, null, null, [[0, 13]]);
});}}, {  key:"onResumeGame",
  value:function onResumeGame(message, status){this._allowExternals({enabled: false
});try{this.options.resumeGame();
}catch(error){(0, _dankLog.dankLog)("DEVELOPER_ERROR", error.message, "warning");
}
var eventName="SDK_GAME_START";
this.eventBus.broadcast(eventName, {name: eventName,
message: message,
status: status,
analytics: {  category: "SDK",
action: eventName,
label: this.options.gameId + ""
}});}}, {  key:"onPauseGame",
  value:function onPauseGame(message, status){this._allowExternals({enabled: true
});try{this.options.pauseGame();
}catch(error){(0, _dankLog.dankLog)("DEVELOPER_ERROR", error.message, "warning");
}
var eventName="SDK_GAME_PAUSE";
this.eventBus.broadcast(eventName, {name: eventName,
message: message,
status: status,
analytics: {  category: "SDK",
action: eventName,
label: this.options.gameId + ""
}});}}, {  key:"openConsole",
  value:function openConsole(){  try{var implementation=new _ImplementationTest.default(this);
implementation.start();  _common.Ls.set("gd_debug_ex", true);
}catch(error){console.log(error);
}}}, {  key:"_initBlockingExternals",
  value:function _initBlockingExternals(){var gameData=this._gameData;var block=gameData.failed || gameData.block_exts && gameData.block_exts.enabled;if(!block) return;
this.window_open=window.open;this._allowExternals({enabled: false
});this._removeExternalsInHtml({enabled: false
});}}, {  key:"_allowExternals",
  value:function _allowExternals(options){var _this14=this;if(typeof this.window_open==="undefined") return;if(options.enabled===false){window.open=function (url){  _this14.msgrt.send("external", {message: "C> ".concat(url)
});if(url.startsWith('https://play.google.com') || url.startsWith('https://itunes.apple.com')){_this14.window_open.call(null, url);
}};
}else{window.open=this.window_open;
}}}, {  key:"_removeExternalsInHtml",
  value:function _removeExternalsInHtml(options){var _this15=this;if(options.enabled===false){var links=window.document.querySelectorAll("a");
links.forEach(function (el){var url=el.getAttribute("href");
el.setAttribute("href", "#");el.onclick=function (evt){evt.preventDefault();_this15.msgrt.send("external", {  message: "H> ".concat(url)
}); return false;
};});}}},{  key:"_getBridgeContext",
  value:function _getBridgeContext(){var isTokenGameURL=this._isTokenGameURL();var isMasterGameURL=this._isMasterGameURL();var isExtHostedGameURL=this._isExtHostedGameURL();var config=isTokenGameURL || isExtHostedGameURL ? this._getTokenGameURLConfig() : {};
  config=config || {};var parentURL=(isTokenGameURL || isExtHostedGameURL) && config.parentURL ? config.parentURL : (0, _common.getParentUrl)();var parentDomain=(isTokenGameURL || isExtHostedGameURL) && config.parentDomain ? config.parentDomain : (0, _common.getParentDomain)();var topDomain=(isTokenGameURL || isExtHostedGameURL) && config.topDomain ? config.topDomain : (0, _common.getTopDomain)();var noConsoleBanner=(isTokenGameURL || isExtHostedGameURL) && config.loaderEnabled;var noLoadedEvent=(isTokenGameURL || isExtHostedGameURL) && config.loaderEnabled;var noBlockerEvent=(isTokenGameURL || isExtHostedGameURL) && config.loaderEnabled;var noGAPageView=(isTokenGameURL || isExtHostedGameURL) && config.loaderEnabled;var noLotamePageView=(isTokenGameURL || isExtHostedGameURL) && config.loaderEnabled;var noPreroll=(isTokenGameURL || isExtHostedGameURL) && config.loaderEnabled;var pauseGameOnStartup=(isTokenGameURL || isExtHostedGameURL) && config.loaderEnabled && config.hasImpression && config.version >= "1.1.24";if(pauseGameOnStartup){this._connectToMessageFromGameZone();
}
 return {isTokenGameURL: isTokenGameURL,
isMasterGameURL: isMasterGameURL,
isExtHostedGameURL: isExtHostedGameURL,
noConsoleBanner: noConsoleBanner,
noLoadedEvent: noLoadedEvent,
noBlockerEvent: noBlockerEvent,
noPreroll: noPreroll,
parentURL: parentURL,
parentDomain: parentDomain,
topDomain: topDomain,
noGAPageView: noGAPageView,
noLotamePageView: noLotamePageView,
version: config.version,
pauseGameOnStartup: pauseGameOnStartup,
depth: (0, _common.getIframeDepth)(),
domainMatched: parentDomain===topDomain,
exports: {  formatTokenURLSearch: this._formatTokenURLSearch.bind(this)
}};}},{  key:"_isMasterGameURL",
  value:function _isMasterGameURL(){var regex=/http[s]?:\/\/(html5\.gamedistribution\.com\/[A-Fa-f0-9]{32})(.*)$/i;
 return regex.test(location.href) || !this._isTokenGameURL() && regex.test(document.referrer);}},{  key:"_isTokenGameURL",
  value:function _isTokenGameURL(){var regex=/http[s]?:\/\/(html5\.gamedistribution\.com\/[A-Za-z0-9]{8})\/(.*)$/i;
 return regex.test(location.href) || regex.test(document.referrer);}},{  key:"_isExtHostedGameURL",
  value:function _isExtHostedGameURL(){var regex=/^http[s]?:\/\/.*?gd_sdk_referrer_url=.*$/i;
 return regex.test(location.href) || regex.test(document.referrer);}},{  key:"_getTokenGameURLConfig",
  value:function _getTokenGameURLConfig(){  try{var regex=/http[s]?:\/\/html5\.gamedistribution\.com\/[A-Za-z0-9]{8}\/[A-Fa-f0-9]{32}\/.*/i;var encoded;if(regex.test(location.href)){var parser=new Url(location.href, true);if(parser.query.gd_zone_config) encoded=parser.query.gd_zone_config;else return;}else if(regex.test(document.referrer)){var _parser=new Url(document.referrer, true);if(_parser.query.gd_zone_config) encoded=_parser.query.gd_zone_config;else return;}else{var _parser2=new Url(location.href, true);if(_parser2.query.gd_zone_config) encoded=_parser2.query.gd_zone_config;else return;}
   return JSON.parse(_jsBase.Base64.decode(decodeURIComponent(encoded)));
}catch(error){}}},{  key:"_getSplashTemplate",
  value:function _getSplashTemplate(gameData){var splash=gameData.splash;if(splash.template==="quantum") return _quantum.default;else if(splash.template==="pluto") return _pluto.default;else return _mars.default;}},{  key:"_getPromoTemplate",
  value:function _getPromoTemplate(gameData){ return _hammer.default;}},{  key:"_formatTokenURLSearch",
  value:function _formatTokenURLSearch(data){var encoded="";try{encoded=encodeURIComponent(_jsBase.Base64.encode(JSON.stringify(data)));
}catch(error){}
  try{var parser=new Url(location.href, true);
parser.query=parser.query || {};
parser.query["gd_zone_config"]=encoded;
   return "?".concat(qs.stringify(parser.query));
}catch(error){return "?gd_zone_config=".concat(encoded);
}}},{  key:"_connectToMessageFromGameZone",
  value:function _connectToMessageFromGameZone(){if(window.addEventListener) window.addEventListener("message", this._onMessageFromGameZone.bind(this), false);else window.attachEvent("onmessage", this._onMessageFromGameZone.bind(this));}},{  key:"_onMessageFromGameZone",
  value:function _onMessageFromGameZone(event){if(!event.data || !event.data.topic) return;var topic=event.data.topic;if(topic==="gdzone.resume"){// this.msgrt.send("gamezone.resume");
}}},{  key:"_parseAndSelectRandomOne",
  value:function _parseAndSelectRandomOne(json){var item=this._selectRandomOne((0, _common.parseJSON)(json));if(!item || !item.version) return item;if(_package.default.version >= item.version) return item;}},{  key:"_selectRandomOne",
  value:function _selectRandomOne(items){if(!isArray(items) || items.length===0) return items;if(items.length===1) return items[0];var totalWeight=0;
  items.forEach(function (item){item.weight=item.weight || 1;
totalWeight += item.weight;
});var randomWeight=Math.floor(Math.random() * Math.floor(totalWeight));
  totalWeight=0;for(var i=0;i<items.length; i++){var item=items[i];
totalWeight += item.weight;if(randomWeight < totalWeight){ return item;}}
}},{  key:"session",
  value:function session(){var _this16=this; return new Promise(function _callee5(resolve, reject){var gameData;
   return regeneratorRuntime.async(function _callee5$(_context10){  while (1){switch (_context10.prev=_context10.next){case 0:
_context10.prev=0;
_context10.next=3;
 return regeneratorRuntime.awrap(_this16.sdkReady);case 3:
_context10.next=7;
break;case 5:
_context10.prev=5;
_context10.t0=_context10["catch"](0);case 7:
gameData=_this16._gameData;
resolve({  ads: {display: {enabled: gameData.dAds.enabled
}},
location: {parentDomain: _this16._bridge.parentDomain,
  topDomain: _this16._bridge.topDomain,
  parentURL: _this16._bridge.parentURL,
  depth: _this16._bridge.depth,
  loadedByGameZone: _this16._bridge.isTokenGameURL
}});case 9:
case "end":
 return _context10.stop();}}
}, null, null, [[0, 5]]);
});}},{  key:"_showPromoDisplayAd",
  value:function _showPromoDisplayAd(){var _this17=this; return new Promise(function (resolve, reject){var gameData=_this17._gameData;var ActivePromo=_puzzle.default;var promo=new ActivePromo(_objectSpread({}, _this17.options, {  version: _package.default.version
}), gameData);var scopeName='promo-display';  _this17.eventBus.unsubscribeScope(scopeName);var onImpression=function onImpression(){  _this17.eventBus.unsubscribeScope(scopeName);promo.show();};var onFailure=function onFailure(){  _this17.eventBus.unsubscribeScope(scopeName);promo.hide();
reject('No promo display ad');};  _this17.eventBus.subscribe("DISPLAYAD_IMPRESSION", onImpression, scopeName);  _this17.eventBus.subscribe("DISPLAYAD_ERROR", onFailure, scopeName);  _this17.showDisplayAd({  containerId: promo.getSlotContainerId(),
slotId: promo.getSlotId(),
visible: true
}).catch(function (error){  promo.hide();
reject(error);});  promo.on("skipClick", function (){  promo.hide();
resolve();});
promo.on("adCompleted", function (){  promo.hide();
resolve();});});}}]); return SDK;}();var _default=SDK;
  exports.default=_default;}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../package.json":349,"./components/EventBus":350,"./components/ImplementationTest":351,"./components/Macros":352,"./components/MessageRouter":353,"./components/VideoAd":354,"./modules/adType":357,"./modules/common":358,"./modules/dankLog":359,"./modules/eventList":360,"./promo/hammer":363,"./promo/puzzle":364,"./splash/mars":366,"./splash/pluto":367,"./splash/quantum":368,"babel-polyfill":1,"es6-promise/auto":333,"is-array":335,"is-plain-object":337,"js-base64":339,"lodash.clonedeep":340,"querystringify":343,"url-parse":347,"whatwg-fetch":348}],357:[function(require,module,exports){  "use strict";Object.defineProperty(exports, "__esModule", {value: true
});
  exports.AdType=void 0;var AdType={Rewarded: 'rewarded',
Interstitial: 'interstitial',
Preroll: 'interstitial',
Midroll: 'interstitial',
Display: 'display'
};
  exports.AdType=AdType;},{}],358:[function(require,module,exports){  "use strict";Object.defineProperty(exports, "__esModule", {value: true
});
  exports.extendDefaults=extendDefaults;
  exports.getParentUrl=getParentUrl;
  exports.getParentDomain=getParentDomain;
  exports.getQueryParams=getQueryParams;
  exports.getMobilePlatform=getMobilePlatform;
  exports.getQueryString=getQueryString;
  exports.getScript=getScript;
  exports.getIframeDepth=getIframeDepth;
  exports.parseJSON=parseJSON;
  exports.getKeyByValue=getKeyByValue;
  exports.isObjectEmpty=isObjectEmpty;
  exports.getScriptTag=getScriptTag;
  exports.getTopDomain=getTopDomain;
  exports.getIMASampleTags=getIMASampleTags;
  exports.Ls=void 0;var Url=require("url-parse");
  function extendDefaults(source, properties){var property;  for(property in properties){if(properties.hasOwnProperty(property)){if(properties[property] !== null && typeof properties[property] !== "undefined"){source[property]=properties[property];
}}
}
 return source;}
  function getParentDomain(){var params=getQueryParams();var referrer=params.gd_sdk_referrer_url ? params.gd_sdk_referrer_url : window.location !== window.parent.location ? document.referrer && document.referrer !== "" ? document.referrer.split("/")[2] : document.location.host : document.location.host;var domain=referrer.replace(/^(?:https?:\/\/)?(?:\/\/)?(?:www\.)?/i, "").split("/")[0];if(document.referrer.indexOf("gameplayer.io") !== -1){domain="gamedistribution.com";var spilReferrerUrl=getQueryString("ref", document.referrer);if(spilReferrerUrl){var returnedResult=spilReferrerUrl;if(returnedResult !== "" && returnedResult !== "{portal%20name}" && returnedResult !== "{spilgames}" && returnedResult !== "{portal name}"){returnedResult=fullyDecodeURI(returnedResult);  domain=returnedResult.replace(/^(?:https?:\/\/)?(?:\/\/)?(?:www\.)?/i, "").split("/")[0];
}}
}else if(document.referrer.indexOf("localhost") !== -1){domain="gamedistribution.com";
}
 return domain;}
  function getParentUrl(){var params=getQueryParams();if(params.gd_sdk_referrer_url){  return params.gd_sdk_referrer_url;
}
var url=window.location !== window.parent.location ? document.referrer && document.referrer !== "" ? document.referrer : document.location.href : document.location.href;if(document.referrer.indexOf("gameplayer.io") !== -1){url="https://gamedistribution.com";var spilReferrerUrl=getQueryString("ref", document.referrer);if(spilReferrerUrl){var returnedResult=spilReferrerUrl;if(returnedResult !== "" && returnedResult !== "{portal%20name}" && returnedResult !== "{spilgames}" && returnedResult !== "{portal name}"){returnedResult=fullyDecodeURI(returnedResult);  url=returnedResult.replace(/^(?:https?:\/\/)?(?:\/\/)?/i, "");
url="https://".concat(url);
}}
}else if(document.referrer.indexOf("localhost") !== -1){url="https://gamedistribution.com/";
}
  
 return url;}
  function getQueryString(field, url){var href=url ? url : window.location.href;var reg=new RegExp("[?&]" + field + "=([^&#]*)", "i");var string=reg.exec(href);
 return string ? string[1] : null;}
  function getQueryParams(){var match;var pl=/\+/g;var search=/([^&=]+)=?([^&]*)/g;var decode=function decode(s){  return decodeURIComponent(s.toLowerCase().replace(pl, " "));
};var query=window.location.search.substring(1);var urlParams={};  while (match=search.exec(query)){urlParams[decode(match[1])]=decode(match[2]);
}
 return urlParams;}
  function isEncoded(uri){uri=uri || "";
 return uri !== decodeURIComponent(uri);}
  function fullyDecodeURI(uri){while (isEncoded(uri)){uri=decodeURIComponent(uri);
}
 return uri;}
  function getMobilePlatform(){var userAgent=navigator.userAgent || navigator.vendor || window.opera;if(/windows phone/i.test(userAgent)){  return "windows";
}
if(/android/i.test(userAgent)){  return "android";
}
  
if(/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream){  return "ios";
}
 return "";}
  function getScript(src, id, options){ return new Promise(function (resolve, reject){if(options && options.exists && options.exists()){  resolve();
 return;
}
var scriptTag=options && options.alternates && options.alternates.length > 0 ? getScriptTag(options.alternates) : undefined;var library=scriptTag || document.createElement("script");var error_prefix=options && options.error_prefix ? options.error_prefix : "Failed:";library.onload=function (){if(options && options.exists && !options.exists()){reject("".concat(error_prefix, " ").concat(src));
}else{resolve();
}};library.onerror=function (){  reject("".concat(error_prefix, " ").concat(src));};if(!scriptTag){  library.type="text/javascript";
  library.async=true;
  library.src=src;
  library.id=id;
  document.head.appendChild(library);
}});}
  function getIframeDepth(){var iFrameLevel=0;var current=window;try{while (current != current.parent){  iFrameLevel++;
  current=current.parent;
}}catch(exc){}
 return iFrameLevel;}
  function parseJSON(value){if(value){try{ return JSON.parse(value);
}catch(e){}}
}
  function getKeyByValue(object, value){ return Object.keys(object).find(function (key){  return object[key]===value;
});}
  function isObjectEmpty(obj){if(!obj) return false;  for(var key in obj){if(obj.hasOwnProperty(key)) return false;
}
 return true;}
  function getScriptTag(sources){if(!sources || !sources.length) return;var scriptTags=document.querySelectorAll("script");if(!scriptTags) return;  for(var i in scriptTags){var script=scriptTags[i];if(sources.includes(script.src)) return script;
}}
  function isLocalStorageAvailable(){var test=Date.now();try{localStorage.setItem(test, test);
localStorage.removeItem(test);
  return true;
}catch(e){  return false;
}}
  function getIMASampleTags(){var interstitial=["https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dskippablelinear&correlator=", "https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dredirectlinear&correlator=", "https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dredirecterror&correlator="];var rewarded=["https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dlinear&correlator="];
 return {interstitial: interstitial,
rewarded: rewarded
};}
  function lsHasItem(key){var value=localStorage.getItem(key);
 return value ? true : false;}
  function lsGetBoolean(key, defaultValue){if(!lsHasItem(key)) return defaultValue;var value=localStorage.getItem(key);
 return value==="true" || value===true || value===1 || value==="1";}
  function lsGetNumber(key, defaultValue){if(!lsHasItem(key)) return defaultValue;var value=localStorage.getItem(key);
 return Number(value);}
  function lsGetString(key, defaultValue){if(!lsHasItem(key)) return defaultValue;var value=localStorage.getItem(key);
 return value.toString();}
  function lsRemoveItem(key){localStorage.removeItem(key);}
  function lsSetItem(key, value){localStorage.setItem(key, value);}
  function getTopDomain(){var depth=getIframeDepth();if(depth===0) return location.host.replace(/^www\.(.*)$/i, "$1");if(location.ancestorOrigins && location.ancestorOrigins.length > 0) return location.ancestorOrigins[location.ancestorOrigins.length - 1].replace(/^https?:\/\/(www\.)?(.*)$/i, "$2");if(depth===1){var parser=getSafeUrlParser(document.referrer);if(parser) return parser.host.replace(/^www\.(.*)$/i, "$1");
}}
  function getSafeUrlParser(url){if(!url || url==="") return;try{  return new Url(url);
}catch(error){}}
var Ls={has: lsHasItem,
getBoolean: lsGetBoolean,
getNumber: lsGetNumber,
getString: lsGetString,
available: isLocalStorageAvailable(),
remove: lsRemoveItem,
set: lsSetItem
};
  exports.Ls=Ls;},{"url-parse":347}],359:[function(require,module,exports){  "use strict";Object.defineProperty(exports, "__esModule", {value: true
});
  exports.dankLog=dankLog;
  exports.setDankLog=setDankLog;var _common=require("./common");var t=Date.now();var _diagnostic={console: false
};
  function dankLog(name, message, status){  try{if(_common.Ls.available && _common.Ls.getBoolean("gd_debug_ex") || _diagnostic && _diagnostic.console===true){var theme=status==="error" ? "background: #c4161e; color: #fff" : status==="warning" ? "background: #ff8c1c; color: #fff" : status==="info" ? "background: #ff0080; color: #fff" : "background: #44a5ab; color: #fff";var banner=console.log("[" + (Date.now() - t) / 1000 + "s]" + "%c %c %c gdsdk %c %c %c " + name + " ", "background: #9854d8", "background: #6c2ca7", "color: #fff; background: #450f78;", "background: #6c2ca7", "background: #9854d8", theme, typeof message !== "undefined" ? message : "");console.log.apply(console, banner);
  
}}catch(error){console.log(error);
}}
  function setDankLog(diagnostic){_diagnostic=diagnostic;}},{"./common":358}],360:[function(require,module,exports){  "use strict";Object.defineProperty(exports, "__esModule", {value: true
});
  exports.IMAEvents=exports.SDKEvents=void 0;var SDKEvents=['SDK_READY', 'SDK_ERROR', 'SDK_GAME_START', 'SDK_GAME_PAUSE', 'SDK_GDPR_TRACKING', 'SDK_GDPR_TARGETING', 'SDK_GDPR_THIRD_PARTY', 'AD_SDK_MANAGER_READY', 'AD_SDK_CANCELED', 'AD_IS_ALREADY_RUNNING'];
  exports.SDKEvents=SDKEvents;var IMAEvents=['AD_ERROR', 'AD_BREAK_READY', 'AD_METADATA', 'ALL_ADS_COMPLETED', 'CLICK', 'COMPLETE', 'CONTENT_PAUSE_REQUESTED', 'CONTENT_RESUME_REQUESTED', 'DURATION_CHANGE', 'FIRST_QUARTILE', 'IMPRESSION', 'INTERACTION', 'LINEAR_CHANGED', 'LOADED', 'LOG', 'MIDPOINT', 'PAUSED', 'RESUMED', 'SKIPPABLE_STATE_CHANGED', 'SKIPPED', 'STARTED', 'THIRD_QUARTILE', 'USER_CLOSE', 'VOLUME_CHANGED', 'VOLUME_MUTED', 'DISPLAYAD_IMPRESSION', 'DISPLAYAD_ERROR'];
  exports.IMAEvents=IMAEvents;},{}],361:[function(require,module,exports){  "use strict";Object.defineProperty(exports, "__esModule", {value: true
});
  exports.Layers=void 0;var Layers={SplashContainer: {zIndex: 1010
},
AdsContainer: {zIndex: 1010
},
DisplayContainer: {zIndex: 1020
},
PromoContainer: {zIndex: 1030
},
Console: {zIndex: 1100
}};
  exports.Layers=Layers;},{}],362:[function(require,module,exports){  "use strict";Object.defineProperty(exports, "__esModule", {value: true
});
  exports.default=void 0;var _events=require("events");function _typeof(obj){if(typeof Symbol==="function" && typeof Symbol.iterator==="symbol"){ _typeof=function _typeof(obj){ return typeof obj;};}else{ _typeof=function _typeof(obj){ return obj && typeof Symbol==="function" && obj.constructor===Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};} return _typeof(obj);}
  function ownKeys(object, enumerableOnly){ var keys=Object.keys(object); if(Object.getOwnPropertySymbols){ var symbols=Object.getOwnPropertySymbols(object); if(enumerableOnly) symbols=symbols.filter(function (sym){ return Object.getOwnPropertyDescriptor(object, sym).enumerable;}); keys.push.apply(keys, symbols);} return keys;}
  function _objectSpread(target){for(var i=1; i < arguments.length; i++){ var source=arguments[i] != null ? arguments[i] : {}; if(i % 2){ ownKeys(source, true).forEach(function (key){ _defineProperty(target, key, source[key]);});}else if(Object.getOwnPropertyDescriptors){ Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));}else{ ownKeys(source).forEach(function (key){ Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}} return target;}
  function _defineProperty(obj, key, value){if(key in obj){ Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });}else{ obj[key]=value;} return obj;}
  function _classCallCheck(instance, Constructor){if(!(instance instanceof Constructor)){ throw new TypeError("Cannot call a class as a function");}}
  function _defineProperties(target, props){for(var i=0;i<props.length; i++){ var descriptor=props[i]; descriptor.enumerable=descriptor.enumerable || false; descriptor.configurable=true; if("value" in descriptor) descriptor.writable=true; Object.defineProperty(target, descriptor.key, descriptor);}}
  function _createClass(Constructor, protoProps, staticProps){if(protoProps) _defineProperties(Constructor.prototype, protoProps); if(staticProps) _defineProperties(Constructor, staticProps); return Constructor;}
  function _possibleConstructorReturn(self, call){if(call && (_typeof(call)==="object" || typeof call==="function")){ return call;} return _assertThisInitialized(self);}
  function _assertThisInitialized(self){if(self===void 0){ throw new ReferenceError("this hasn't been initialised - super() hasn't been called");} return self;}
  function _getPrototypeOf(o){ _getPrototypeOf=Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o){ return o.__proto__ || Object.getPrototypeOf(o);}; return _getPrototypeOf(o);}
  function _inherits(subClass, superClass){if(typeof superClass !== "function" && superClass !== null){ throw new TypeError("Super expression must either be null or a function");} subClass.prototype=Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true }}); if(superClass) _setPrototypeOf(subClass, superClass);}
  function _setPrototypeOf(o, p){ _setPrototypeOf=Object.setPrototypeOf || function _setPrototypeOf(o, p){ o.__proto__=p; return o;}; return _setPrototypeOf(o, p);}
var Base =
  
  function (_EventEmitter){_inherits(Base, _EventEmitter);  function Base(options, gameData){var _this;_classCallCheck(this, Base);_this=_possibleConstructorReturn(this, _getPrototypeOf(Base).call(this));
_this.options=options;
_this.gameData=gameData;
_this.promo=gameData.promo;
_this.macros={  GAME_ID: gameData.gameId,
  GAME_TITLE: gameData.title,
  URL: location.href,
  REFERRER_URL: document.referrer || location.href};var escaped={};for(var key in _this.macros){var value=_this.macros[key];
  escaped[key + "_ESC"]=encodeURIComponent(value);
  escaped[key + "_ESC_ESC"]=encodeURIComponent(encodeURIComponent(value));
}
_this.macros=_objectSpread({}, _this.macros, {}, escaped);
_this.dict=gameData.promo.dict || {};
  return _this;
}
_createClass(Base, [{  key:"_registerEvents",
  value:function _registerEvents(){var _this2=this;this.skipButton.addEventListener("click", function (event){_this2.emit("skipClick", event);
});}},{  key:"_insertCss",
  value:function _insertCss(css){var head=document.head || document.getElementsByTagName("head")[0];var style=document.createElement("style");var existingStyle=document.head.querySelector("style[data-gdsdk-promo-style]");if(existingStyle) existingStyle.remove();
  style.type="text/css";
  style.setAttribute("data-gdsdk-promo-style", true);if(style.styleSheet){style.styleSheet.cssText=css;
}else{style.appendChild(document.createTextNode(css));
}
  head.appendChild(style);}},{  key:"_getExtContainer",
  value:function _getExtContainer(){if(!this.options.flashSettings.splashContainerId) return;
 return document.getElementById(this.options.flashSettings.splashContainerId);}},{  key:"hide",
  value:function hide(){var container=this._container;var extContainer=this._extContainer;if(container && container.parentNode) container.parentNode.removeChild(container);if(extContainer) extContainer.style.display="none";}},{  key:"getRoot",
  value:function getRoot(){ return this._root;
}}]); return Base;}(_events.EventEmitter);var _default=Base;
  exports.default=_default;},{"events":2}],363:[function(require,module,exports){  "use strict";Object.defineProperty(exports, "__esModule", {value: true
});
  exports.default=void 0;var _base=_interopRequireDefault(require("./base"));var _layers=require("../modules/layers");function _interopRequireDefault(obj){ return obj && obj.__esModule ? obj : { default: obj };}
  function _typeof(obj){if(typeof Symbol==="function" && typeof Symbol.iterator==="symbol"){ _typeof=function _typeof(obj){ return typeof obj;};}else{ _typeof=function _typeof(obj){ return obj && typeof Symbol==="function" && obj.constructor===Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};} return _typeof(obj);}
  function _classCallCheck(instance, Constructor){if(!(instance instanceof Constructor)){ throw new TypeError("Cannot call a class as a function");}}
  function _defineProperties(target, props){for(var i=0;i<props.length; i++){ var descriptor=props[i]; descriptor.enumerable=descriptor.enumerable || false; descriptor.configurable=true; if("value" in descriptor) descriptor.writable=true; Object.defineProperty(target, descriptor.key, descriptor);}}
  function _createClass(Constructor, protoProps, staticProps){if(protoProps) _defineProperties(Constructor.prototype, protoProps); if(staticProps) _defineProperties(Constructor, staticProps); return Constructor;}
  function _possibleConstructorReturn(self, call){if(call && (_typeof(call)==="object" || typeof call==="function")){ return call;} return _assertThisInitialized(self);}
  function _assertThisInitialized(self){if(self===void 0){ throw new ReferenceError("this hasn't been initialised - super() hasn't been called");} return self;}
  function _getPrototypeOf(o){ _getPrototypeOf=Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o){ return o.__proto__ || Object.getPrototypeOf(o);}; return _getPrototypeOf(o);}
  function _inherits(subClass, superClass){if(typeof superClass !== "function" && superClass !== null){ throw new TypeError("Super expression must either be null or a function");} subClass.prototype=Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true }}); if(superClass) _setPrototypeOf(subClass, superClass);}
  function _setPrototypeOf(o, p){ _setPrototypeOf=Object.setPrototypeOf || function _setPrototypeOf(o, p){ o.__proto__=p; return o;}; return _setPrototypeOf(o, p);}
var Hammer =
  
  function (_Base){_inherits(Hammer, _Base);  function Hammer(options, gameData){var _this;_classCallCheck(this, Hammer);_this=_possibleConstructorReturn(this, _getPrototypeOf(Hammer).call(this, options, gameData));_this._init();return _this;
}
_createClass(Hammer, [{  key:"_init",
  value:function _init(){var css=this._css();this._insertCss(css);var html=this._html();var _this$_insertHtml=this._insertHtml(html),
container=_this$_insertHtml.container,
extContainer=_this$_insertHtml.extContainer;this._initIframeMode(container);this._initSkipButton(container);this._root=container;
this._container=container;
this._ext_container=extContainer;this._registerEvents();}},{  key:"_css",
  value:function _css(){var css="body {position: inherit;}\n.".concat(this.options.prefix, "promo-container {display: flex;flex-direction: column;justify-content: flex-start;align-items: stretch;position: absolute;width: 100%;height: 100%;top:0;left:0;background-color:black;}\n.").concat(this.options.prefix, "promo-iframe-container {flex-grow:1;position:relative;}.").concat(this.options.prefix, "promo-controls-container {padding: 4px 0px;text-align:right;}\n.").concat(this.options.prefix, "promo-iframe-container>iframe {box-sizing:border-box;width:0;height:0;min-height:100%;min-width:100%;max-width:100%;max-height:100%;overflow:hidden;position:absolute;}\n#").concat(this.options.prefix, "promo-button{box-sizing:border-box;padding: 4px 16px;margin: auto;border: 1px solid rgba(255,255,255,0.5);background: black;color: white;color: rgba(255,255,255,0.8);font-family: Helvetica, Arial, sans-serif;font-size: 18px;cursor: pointer;min-width: 150px;}\n#").concat(this.options.prefix, "promo-button:hover {background: linear-gradient(0deg, #1C8464, #21A179);}\n#").concat(this.options.prefix, "promo-button:active {background: linear-gradient(0deg, #1C8464, #15674E);}\n#").concat(this.options.prefix, "promo-button:disabled,#").concat(this.options.prefix, "promo-button[disabled]{background: black;}\n");
 return css;}},{  key:"_html",
  value:function _html(){var html="";
  html="<div class=\"".concat(this.options.prefix, "promo-container\"><div class=\"").concat(this.options.prefix, "promo-iframe-container\"><iframe frameBorder=\"1\"></iframe></div>  <div class=\"").concat(this.options.prefix, "promo-controls-container\"><button id=\"").concat(this.options.prefix, "promo-button\" disabled></button></div></div>");
 return html;}},{  key:"_insertHtml",
  value:function _insertHtml(html){var container=document.createElement("div");container.innerHTML=html;container.id="".concat(this.options.prefix, "promo");container.style['z-index']=_layers.Layers.PromoContainer.zIndex;container.style['position']="fixed";container.style['width']="100%";container.style['height']="100%";container.style['top']="0";container.style['left']="0";var extContainer=this._getExtContainer();if(extContainer){extContainer.style.display="block";
extContainer.insertBefore(container, extContainer.firstChild);
}else{var body=document.body || document.getElementsByTagName("body")[0];
body.insertBefore(container, body.firstChild);
}
 return {container: container,
extContainer: extContainer
};}},{  key:"_initIframeMode",
  value:function _initIframeMode(container){var iframe=container.querySelector("iframe");for(var key in this.promo.attrs){var value=this.promo.attrs[key];
value=this._replaceMacros(value);iframe.setAttribute(key, value);
}}},{  key:"_replaceMacros",
  value:function _replaceMacros(value){var transformedValue=value;for(var macroKey in this.macros){var macroValue=this.macros[macroKey];var replaceString="{{" + macroKey + "}}";
replaceString=this._escapeRegExp(replaceString);
transformedValue=transformedValue.replace(new RegExp(replaceString, "g"), macroValue);
}
  
  for(var dictKey in this.dict){var dictValue=this.dict[dictKey];var _replaceString="{{DICT[" + dictKey + "]}}";  _replaceString=this._escapeRegExp(_replaceString);
transformedValue=transformedValue.replace(new RegExp(_replaceString, "g"), dictValue);
}
 return transformedValue;}},{  key:"_initSkipButton",
  value:function _initSkipButton(container){var _this2=this;this.skipButton=document.getElementById("".concat(this.options.prefix, "promo-button"));var textBeforeSkip=this.promo.textBeforeSkip || "You can skip this promo in {{0}} secs";var textOnSkip=this.promo.textOnSkip || "SKIP";var skipAfter=this.promo.skipAfter || 15;
this.skipButton.innerText=textBeforeSkip.replace("{{0}}", skipAfter);var started=Date.now();var updateTimer=setInterval(function (){var elapsed=Math.floor((Date.now() - started) / 1000);var remaining=skipAfter - elapsed;
_this2.skipButton.innerText=textBeforeSkip.replace("{{0}}", remaining);
}, 1000);
  setTimeout(function (){clearInterval(updateTimer);
_this2.skipButton.innerText=_this2._replaceMacros(textOnSkip);  _this2.skipButton.removeAttribute("disabled");
}, skipAfter * 1000);}},{  key:"_escapeRegExp",
  value:function _escapeRegExp(string){ return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}}]); return Hammer;}(_base.default);var _default=Hammer;
  exports.default=_default;},{"../modules/layers":361,"./base":362}],364:[function(require,module,exports){  "use strict";Object.defineProperty(exports, "__esModule", {value: true
});
  exports.default=void 0;var _base=_interopRequireDefault(require("./base"));var _layers=require("../modules/layers");function _interopRequireDefault(obj){ return obj && obj.__esModule ? obj : { default: obj };}
  function _typeof(obj){if(typeof Symbol==="function" && typeof Symbol.iterator==="symbol"){ _typeof=function _typeof(obj){ return typeof obj;};}else{ _typeof=function _typeof(obj){ return obj && typeof Symbol==="function" && obj.constructor===Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};} return _typeof(obj);}
  function _classCallCheck(instance, Constructor){if(!(instance instanceof Constructor)){ throw new TypeError("Cannot call a class as a function");}}
  function _defineProperties(target, props){for(var i=0;i<props.length; i++){ var descriptor=props[i]; descriptor.enumerable=descriptor.enumerable || false; descriptor.configurable=true; if("value" in descriptor) descriptor.writable=true; Object.defineProperty(target, descriptor.key, descriptor);}}
  function _createClass(Constructor, protoProps, staticProps){if(protoProps) _defineProperties(Constructor.prototype, protoProps); if(staticProps) _defineProperties(Constructor, staticProps); return Constructor;}
  function _possibleConstructorReturn(self, call){if(call && (_typeof(call)==="object" || typeof call==="function")){ return call;} return _assertThisInitialized(self);}
  function _assertThisInitialized(self){if(self===void 0){ throw new ReferenceError("this hasn't been initialised - super() hasn't been called");} return self;}
  function _getPrototypeOf(o){ _getPrototypeOf=Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o){ return o.__proto__ || Object.getPrototypeOf(o);}; return _getPrototypeOf(o);}
  function _inherits(subClass, superClass){if(typeof superClass !== "function" && superClass !== null){ throw new TypeError("Super expression must either be null or a function");} subClass.prototype=Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true }}); if(superClass) _setPrototypeOf(subClass, superClass);}
  function _setPrototypeOf(o, p){ _setPrototypeOf=Object.setPrototypeOf || function _setPrototypeOf(o, p){ o.__proto__=p; return o;}; return _setPrototypeOf(o, p);}
var Puzzle =
  
  function (_Base){_inherits(Puzzle, _Base);  function Puzzle(options, gameData){var _this;_classCallCheck(this, Puzzle);_this=_possibleConstructorReturn(this, _getPrototypeOf(Puzzle).call(this, options, gameData));_this._init();return _this;
}
_createClass(Puzzle, [{  key:"_init",
  value:function _init(){this._slotId=this.gameData.promo.puzzle.slotId || "gd__preroll_banner";var css=this._css();this._insertCss(css);var html=this._html();var _this$_insertHtml=this._insertHtml(html),
container=_this$_insertHtml.container,
extContainer=_this$_insertHtml.extContainer;this._initDisplayMode(container);this._initSkipButton(container);this._root=container;
this._container=container;
this._ext_container=extContainer;this._promoContainer=document.querySelector(".".concat(this.options.prefix, "promo-container"));this._promoControlsContainer=document.querySelector(".".concat(this.options.prefix, "promo-controls-container"));this._registerEvents();}},{  key:"getSlotId",
  value:function getSlotId(){ return this._slotId;}},{  key:"getSlotContainerId",
  value:function getSlotContainerId(){ return this._slotId + "_container";}},{  key:"_css",
  value:function _css(){var css="body {position: inherit;}\n.".concat(this.options.prefix, "promo-container {display: flex;flex-direction: column;justify-content: flex-start;align-items: stretch;position: absolute;width: 100%;height: 100%;top:0;left:0;}\n.").concat(this.options.prefix, "promo-display-container {flex-grow:1;position:relative;}.").concat(this.options.prefix, "promo-controls-container {padding: 4px 0px;text-align:right;visibility:hidden;}\n.").concat(this.options.prefix, "promo-display-container>div {box-sizing:border-box;width:0;height:0;min-height:100%;min-width:100%;max-width:100%;max-height:100%;overflow:hidden;position:absolute;}\n#").concat(this.options.prefix, "promo-message{box-sizing:border-box;padding: 4px 16px;margin: auto;color: white;color: rgba(255,255,255,0.8);font-family: Helvetica, Arial, sans-serif;font-size: 14px;cursor: pointer;min-width: 150px;float:left;text-align:left;margin-bottom:8px;}\n#").concat(this.options.prefix, "promo-button{box-sizing:border-box;padding: 4px 16px;margin: auto;border: 1px solid rgba(255,255,255,0.5);color: white;color: rgba(255,255,255,0.8);font-family: Helvetica, Arial, sans-serif;font-size: 18px;cursor: pointer;min-width: 150px;margin-bottom:8px;background: black;}\n#").concat(this.options.prefix, "promo-button:hover {background: linear-gradient(0deg, #1C8464, #21A179);}\n#").concat(this.options.prefix, "promo-button:active {background: linear-gradient(0deg, #1C8464, #15674E);}\n#").concat(this.options.prefix, "promo-button:disabled,#").concat(this.options.prefix, "promo-button[disabled]{background: black;}\n");
 return css;}},{  key:"_html",
  value:function _html(){var html="";
  html="<div class=\"".concat(this.options.prefix, "promo-container\"><div class=\"").concat(this.options.prefix, "promo-display-container\"><div id=\"").concat(this.getSlotContainerId(), "\"></div></div><div class=\"").concat(this.options.prefix, "promo-controls-container\"><button id=\"").concat(this.options.prefix, "promo-button\" disabled></button><span id=\"").concat(this.options.prefix, "promo-message\"></span></div></div>");
 return html;}},{  key:"_insertHtml",
  value:function _insertHtml(html){var container=document.createElement("div");container.innerHTML=html;container.id="".concat(this.options.prefix, "promo");container.style['z-index']=_layers.Layers.PromoContainer.zIndex;container.style['position']="fixed";container.style['width']="100%";container.style['height']="100%";container.style['top']="0";container.style['left']="0";var extContainer=this._getExtContainer();if(extContainer){extContainer.style.display="block";
extContainer.insertBefore(container, extContainer.firstChild);
}else{var body=document.body || document.getElementsByTagName("body")[0];
body.insertBefore(container, body.firstChild);
}
 return {container: container,
extContainer: extContainer
};}},{  key:"_initDisplayMode",
  value:function _initDisplayMode(container){  for(var key in this.promo.attrs){var value=this.promo.attrs[key];
value=this._replaceMacros(value);
}}},{  key:"_replaceMacros",
  value:function _replaceMacros(value){var transformedValue=value;for(var macroKey in this.macros){var macroValue=this.macros[macroKey];var replaceString="{{" + macroKey + "}}";
replaceString=this._escapeRegExp(replaceString);
transformedValue=transformedValue.replace(new RegExp(replaceString, "g"), macroValue);
}
  
  for(var dictKey in this.dict){var dictValue=this.dict[dictKey];var _replaceString="{{DICT[" + dictKey + "]}}";  _replaceString=this._escapeRegExp(_replaceString);
transformedValue=transformedValue.replace(new RegExp(_replaceString, "g"), dictValue);
}
 return transformedValue;}},{  key:"_initSkipButton",
  value:function _initSkipButton(container){var _this2=this;this.skipButton=document.getElementById("".concat(this.options.prefix, "promo-button"));
this.textBeforeAdCloseLabel=document.getElementById("".concat(this.options.prefix, "promo-message"));var textBeforeSkip=this.promo.textBeforeSkip || "You can skip this ad in {{0}} secs";var textOnSkip=this.promo.textOnSkip || "SKIP";var skipAfter=this.promo.skipAfter || 15;var textBeforeAdClose=this.promo.textBeforeAdClose || "Ad will be closed in {{0}} secs";var adDuration=this.promo.adDuration || 30;
  skipAfter=skipAfter > adDuration ? adDuration : skipAfter;
this.skipButton.innerText=textBeforeSkip.replace("{{0}}", skipAfter);var started=Date.now();var updateTimerForTextOnSkip=setInterval(function (){var elapsed=Math.floor((Date.now() - started) / 1000);var remaining=skipAfter - elapsed;
_this2.skipButton.innerText=textBeforeSkip.replace("{{0}}", remaining);
}, 250);
  setTimeout(function (){clearInterval(updateTimerForTextOnSkip);
_this2.skipButton.innerText=_this2._replaceMacros(textOnSkip);  _this2.skipButton.removeAttribute("disabled");var updateTimerForTextBeforeAdClose=setInterval(function (){var elapsed=Math.floor((Date.now() - started) / 1000);var remaining=adDuration - elapsed;_this2.textBeforeAdCloseLabel.innerText=textBeforeAdClose.replace("{{0}}", remaining);}, 250);
setTimeout(function (){  clearInterval(updateTimerForTextBeforeAdClose);_this2.emit('adCompleted');}, (adDuration - skipAfter) * 1000);
}, skipAfter * 1000);}},{  key:"_escapeRegExp",
  value:function _escapeRegExp(string){ return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');}},{  key:"show",
  value:function show(){this._promoContainer.style['background-color']='black';
this._promoControlsContainer.style['visibility']='visible';
}}]); return Puzzle;}(_base.default);exports.default=Puzzle;},{"../modules/layers":361,"./base":362}],365:[function(require,module,exports){  "use strict";Object.defineProperty(exports, "__esModule", {value: true
});
  exports.default=void 0;var _events=require("events");function _typeof(obj){if(typeof Symbol==="function" && typeof Symbol.iterator==="symbol"){ _typeof=function _typeof(obj){ return typeof obj;};}else{ _typeof=function _typeof(obj){ return obj && typeof Symbol==="function" && obj.constructor===Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};} return _typeof(obj);}
  function _classCallCheck(instance, Constructor){if(!(instance instanceof Constructor)){ throw new TypeError("Cannot call a class as a function");}}
  function _defineProperties(target, props){for(var i=0;i<props.length; i++){ var descriptor=props[i]; descriptor.enumerable=descriptor.enumerable || false; descriptor.configurable=true; if("value" in descriptor) descriptor.writable=true; Object.defineProperty(target, descriptor.key, descriptor);}}
  function _createClass(Constructor, protoProps, staticProps){if(protoProps) _defineProperties(Constructor.prototype, protoProps); if(staticProps) _defineProperties(Constructor, staticProps); return Constructor;}
  function _possibleConstructorReturn(self, call){if(call && (_typeof(call)==="object" || typeof call==="function")){ return call;} return _assertThisInitialized(self);}
  function _assertThisInitialized(self){if(self===void 0){ throw new ReferenceError("this hasn't been initialised - super() hasn't been called");} return self;}
  function _getPrototypeOf(o){ _getPrototypeOf=Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o){ return o.__proto__ || Object.getPrototypeOf(o);}; return _getPrototypeOf(o);}
  function _inherits(subClass, superClass){if(typeof superClass !== "function" && superClass !== null){ throw new TypeError("Super expression must either be null or a function");} subClass.prototype=Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true }}); if(superClass) _setPrototypeOf(subClass, superClass);}
  function _setPrototypeOf(o, p){ _setPrototypeOf=Object.setPrototypeOf || function _setPrototypeOf(o, p){ o.__proto__=p; return o;}; return _setPrototypeOf(o, p);}
var Base =
  
  function (_EventEmitter){_inherits(Base, _EventEmitter);  function Base(options, gameData){var _this;_classCallCheck(this, Base);_this=_possibleConstructorReturn(this, _getPrototypeOf(Base).call(this));
_this.options=options;
_this.gameData=gameData;
  return _this;
}
_createClass(Base, [{  key:"_getThumbnail",
  value:function _getThumbnail(options, gameData){  return "";//"https://cdn.statically.io/gh/nooboss/noobdata/1325e36c/cdn/loading.png";//kkk
  // var thumbnail=gameData.assets.find(function (asset){  // return asset.hasOwnProperty("name") && asset.width===512 && asset.height===512;
  // });
  // if(thumbnail){  //   thumbnail="https://img.gamedistribution.com/".concat(thumbnail.name);
  // }else if(gameData.assets.length > 0 && gameData.assets[0].hasOwnProperty("name")){  //   thumbnail="https://img.gamedistribution.com/".concat(gameData.assets[0].name);
  // }else{  //   thumbnail="https://img.gamedistribution.com/logo.svg";
  // }
  //  return thumbnail;
}},{  key:"_registerEvents",
  value:function _registerEvents(){var _this2=this;var playButton=document.getElementById("".concat(this.options.prefix, "splash-button"));if(playButton) playButton.addEventListener("click", function (event){_this2.emit("playClick", event);
});var container=document.getElementById("".concat(this.options.prefix, "splash"));if(container) container.addEventListener("click", function (event){_this2.emit("containerClick", event);
});}},{  key:"hide",
  value:function hide(){var container=this._container;var extContainer=this._extContainer;if(container && container.parentNode) container.parentNode.removeChild(container);if(extContainer) extContainer.style.display="none";}},{  key:"_insertCss",
  value:function _insertCss(css){var head=document.head || document.getElementsByTagName("head")[0];var style=document.createElement("style");var existingStyle=document.head.querySelector("style[data-gdsdk-style]");if(existingStyle) existingStyle.remove();
  style.type="text/css";
  style.setAttribute("data-gdsdk-style", true);if(style.styleSheet){style.styleSheet.cssText=css;
}else{style.appendChild(document.createTextNode(css));
}
  head.appendChild(style);}},{  key:"_getExtContainer",
  value:function _getExtContainer(){if(!this.options.flashSettings.splashContainerId) return;
 return document.getElementById(this.options.flashSettings.splashContainerId);}},{  key:"getRoot",
  value:function getRoot(){ return this._root;
}}]); return Base;}(_events.EventEmitter);var _default=Base;
  exports.default=_default;},{"events":2}],366:[function(require,module,exports){  "use strict";Object.defineProperty(exports, "__esModule", {value: true
});
  exports.default=void 0;var _base=_interopRequireDefault(require("./base"));var _layers=require("../modules/layers");function _interopRequireDefault(obj){ return obj && obj.__esModule ? obj : { default: obj };}
  function _typeof(obj){if(typeof Symbol==="function" && typeof Symbol.iterator==="symbol"){ _typeof=function _typeof(obj){ return typeof obj;};}else{ _typeof=function _typeof(obj){ return obj && typeof Symbol==="function" && obj.constructor===Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};} return _typeof(obj);}
  function _classCallCheck(instance, Constructor){if(!(instance instanceof Constructor)){ throw new TypeError("Cannot call a class as a function");}}
  function _defineProperties(target, props){for(var i=0;i<props.length; i++){ var descriptor=props[i]; descriptor.enumerable=descriptor.enumerable || false; descriptor.configurable=true; if("value" in descriptor) descriptor.writable=true; Object.defineProperty(target, descriptor.key, descriptor);}}
  function _createClass(Constructor, protoProps, staticProps){if(protoProps) _defineProperties(Constructor.prototype, protoProps); if(staticProps) _defineProperties(Constructor, staticProps); return Constructor;}
  function _possibleConstructorReturn(self, call){if(call && (_typeof(call)==="object" || typeof call==="function")){ return call;} return _assertThisInitialized(self);}
  function _assertThisInitialized(self){if(self===void 0){ throw new ReferenceError("this hasn't been initialised - super() hasn't been called");} return self;}
  function _getPrototypeOf(o){ _getPrototypeOf=Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o){ return o.__proto__ || Object.getPrototypeOf(o);}; return _getPrototypeOf(o);}
  function _inherits(subClass, superClass){if(typeof superClass !== "function" && superClass !== null){ throw new TypeError("Super expression must either be null or a function");} subClass.prototype=Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true }}); if(superClass) _setPrototypeOf(subClass, superClass);}
  function _setPrototypeOf(o, p){ _setPrototypeOf=Object.setPrototypeOf || function _setPrototypeOf(o, p){ o.__proto__=p; return o;}; return _setPrototypeOf(o, p);}
var Mars =
  
  function (_Base){_inherits(Mars, _Base);  function Mars(options, gameData){var _this;_classCallCheck(this, Mars);_this=_possibleConstructorReturn(this, _getPrototypeOf(Mars).call(this, options, gameData));_this._init();return _this;
}
_createClass(Mars, [{  key:"_init",
  value:function _init(){var css=this._css(this.options, this.gameData);this._insertCss(css);var html=this._html(this.options, this.gameData);var _this$_insertHtml=this._insertHtml(html),
container=_this$_insertHtml.container,
extContainer=_this$_insertHtml.extContainer;this._root=container;
this._container=container;
this._extContainer=extContainer;this._registerEvents();var loader=document.querySelector(".".concat(this.options.prefix, "loader"));var playButton=document.getElementById("".concat(this.options.prefix, "splash-button"));
this.on("playClick", function (){loader.style.display="block";
playButton.style.display="none";
});var thisSelf=this;
  setTimeout(function(){  console.log('KKK >> 222');
playButton.innerHTML='PLAY';  try{  document.getElementById("".concat(thisSelf.options.prefix, "splash-button")).click();}catch(err){}
 }, 2300);//2500
  
}},{  key:"_css",
  value:function _css(options, gameData){var thumbnail=this._getThumbnail(options, gameData);var css="body {position: inherit;}\n.".concat(this.options.prefix, "splash-background-container {box-sizing: border-box;position: absolute;top: 0;left: 0;width: 100%;height: 100%;overflow:hidden;").concat(this._getBackground(options, gameData), "}\n.").concat(this.options.prefix, "sdk-version{position:absolute;right:0;top:0;  font-size:8px;padding-top:6px; padding-right:6px;color:#aaa;}\n.").concat(this.options.prefix, "splash-container {display: flex;flex-flow: column;box-sizing: border-box;position: absolute;top: 0;left:0;width: 100%;height: 100%;}\n.").concat(this.options.prefix, "splash-top {display: flex;flex-flow: column;box-sizing: border-box;flex: 1;align-self: center;justify-content: center;}\n.").concat(this.options.prefix, "splash-bottom {display: flex;flex-flow: column;box-sizing: border-box;align-self: center;justify-content: center;width: 100%;padding-left:6px;padding-right:6px;padding-bottom:6px;}\n.").concat(this.options.prefix, "splash-top > div {text-align: center;}\n.").concat(this.options.prefix, "splash-top > div > button {margin-bottom:150px;padding: 8px;border-radius: 5px;border:0;background: linear-gradient(0deg, #5245c7, #3778d1);color: white;text-transform: uppercase;font-family: Helvetica, Arial, sans-serif;font-weight: bold;font-size: 16px;cursor: pointer;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);width: 280px;}\n.").concat(this.options.prefix, "splash-top > div > button:hover {background: linear-gradient(0deg, #1C8464, #21A179);}\n.").concat(this.options.prefix, "splash-top > div > button:active {box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);background: linear-gradient(0deg, #5245c7, #3778d1);}.").concat(this.options.prefix, "splash-top > div > div:first-child {position: relative;width: 150px;height: 150px;margin: auto auto 12px;border-radius: 5px;overflow: hidden;border: 0px solid rgba(255, 255, 255, 0.8);box-shadow: inset 0 0px 0px rgba(0, 0, 0, 0.5), 0 0px 0px rgba(0, 0, 0, 0.3);background-image: url(").concat(thumbnail, ");background-position: center;background-size: cover;}.").concat(this.options.prefix, "splash-bottom > .").concat(this.options.prefix, "splash-consent,.").concat(this.options.prefix, "splash-bottom > .").concat(this.options.prefix, "splash-title {\n   display: none; box-sizing: border-box;width: 100%;color: #fff;text-align: justify;font-size: 12px;font-family: Arial;font-weight: normal;line-height: 150%;}.").concat(this.options.prefix, "splash-bottom > .").concat(this.options.prefix, "splash-title {\n display: none; text-align: center;font-size: 18px;font-family: Helvetica, Arial, sans-serif;font-weight: bold;line-height: 100%;text-transform: uppercase;}.").concat(this.options.prefix, "splash-bottom > .").concat(this.options.prefix, "splash-consent a {color: #fff;}.").concat(this.options.prefix, "loader,.").concat(this.options.prefix, "loader:after {border-radius: 50%;width: 1.5em;height: 1.5em;}\n.").concat(this.options.prefix, "loader {margin: 0px auto;font-size: 10px;position: relative;text-indent: -9999em;border-top: 1.1em solid rgba(255, 255, 255, 0.2);border-right: 1.1em solid rgba(255, 255, 255, 0.2);border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);border-left: 1.1em solid #ffffff;-webkit-transform: translateZ(0);-ms-transform: translateZ(0);transform: translateZ(0);-webkit-animation: ").concat(this.options.prefix, "load8 1.1s infinite linear;animation: ").concat(this.options.prefix, "load8 1.1s infinite linear;display:none;}@-webkit-keyframes ").concat(this.options.prefix, "load8 {0% {-webkit-transform: rotate(0deg);transform: rotate(0deg);}100% {-webkit-transform: rotate(360deg);transform: rotate(360deg);}}@keyframes ").concat(this.options.prefix, "load8 {0% {-webkit-transform: rotate(0deg);transform: rotate(0deg);}100% {-webkit-transform: rotate(360deg);transform: rotate(360deg);}}\n");
 return css;}},{  key:"_html",
  value:function _html(options, gameData){var isConsentDomain=options.isConsentDomain;var html="";var consentStyle=isConsentDomain ? "display:block" : "display:none";
  html="<div class=\"".concat(this.options.prefix, "splash-background-container\">  <div class=\"").concat(this.options.prefix, "sdk-version\">").concat(this.options.version, "</div>  <div class=\"").concat(this.options.prefix, "splash-container\"><div class=\"").concat(this.options.prefix, "splash-top\"><div><div></div><button id=\"").concat(this.options.prefix, "splash-button\">LOADING...</button> <div class=\"").concat(this.options.prefix, "loader\">Loading...</div></div></div><div class=\"").concat(this.options.prefix, "splash-bottom\"><div class=\"").concat(this.options.prefix, "splash-title\">").concat(gameData.title, "</div><div class=\"").concat(this.options.prefix, "splash-consent\" style=").concat(consentStyle, ">  We may show personalized ads provided by our partners. You can review our terms  <a href=\"https://azerion.com/business/privacy.html\" target=\"_blank\">here</a>.</div></div>  </div> </div>");
 return html;}},{  key:"_insertHtml",
  value:function _insertHtml(html){var container=document.createElement("div");container.innerHTML=html;container.id="".concat(this.options.prefix, "splash");container.style['z-index']=_layers.Layers.SplashContainer.zIndex;container.style['position']="fixed";container.style['width']="100%";container.style['height']="100%";container.style['top']="0";container.style['left']="0";var extContainer=this._getExtContainer();if(extContainer){extContainer.style.display="block";
extContainer.insertBefore(container, extContainer.firstChild);
}else{var body=document.body || document.getElementsByTagName("body")[0];
body.insertBefore(container, body.firstChild);
}
 return {container: container,
extContainer: extContainer
};}},{  key:"_getBackground",
  value:function _getBackground(options, gameData){  return "\nbackground: linear-gradient(90deg, rgba(7, 44, 47, 1) 0%, rgba(5, 66, 82, 1) 50%, rgba(7, 44, 47, 1) 100%);";//kkk
}}]); return Mars;}(_base.default);var _default=Mars;
  exports.default=_default;},{"../modules/layers":361,"./base":365}],367:[function(require,module,exports){  "use strict";Object.defineProperty(exports, "__esModule", {value: true
});
  exports.default=void 0;var _base=_interopRequireDefault(require("./base"));var _layers=require("../modules/layers");function _interopRequireDefault(obj){ return obj && obj.__esModule ? obj : { default: obj };}
  function _typeof(obj){if(typeof Symbol==="function" && typeof Symbol.iterator==="symbol"){ _typeof=function _typeof(obj){ return typeof obj;};}else{ _typeof=function _typeof(obj){ return obj && typeof Symbol==="function" && obj.constructor===Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};} return _typeof(obj);}
  function _classCallCheck(instance, Constructor){if(!(instance instanceof Constructor)){ throw new TypeError("Cannot call a class as a function");}}
  function _defineProperties(target, props){for(var i=0;i<props.length; i++){ var descriptor=props[i]; descriptor.enumerable=descriptor.enumerable || false; descriptor.configurable=true; if("value" in descriptor) descriptor.writable=true; Object.defineProperty(target, descriptor.key, descriptor);}}
  function _createClass(Constructor, protoProps, staticProps){if(protoProps) _defineProperties(Constructor.prototype, protoProps); if(staticProps) _defineProperties(Constructor, staticProps); return Constructor;}
  function _possibleConstructorReturn(self, call){if(call && (_typeof(call)==="object" || typeof call==="function")){ return call;} return _assertThisInitialized(self);}
  function _assertThisInitialized(self){if(self===void 0){ throw new ReferenceError("this hasn't been initialised - super() hasn't been called");} return self;}
  function _getPrototypeOf(o){ _getPrototypeOf=Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o){ return o.__proto__ || Object.getPrototypeOf(o);}; return _getPrototypeOf(o);}
  function _inherits(subClass, superClass){if(typeof superClass !== "function" && superClass !== null){ throw new TypeError("Super expression must either be null or a function");} subClass.prototype=Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true }}); if(superClass) _setPrototypeOf(subClass, superClass);}
  function _setPrototypeOf(o, p){ _setPrototypeOf=Object.setPrototypeOf || function _setPrototypeOf(o, p){ o.__proto__=p; return o;}; return _setPrototypeOf(o, p);}
var Pluto =
  function (_Base){_inherits(Pluto, _Base);  function Pluto(options, gameData){var _this;_classCallCheck(this, Pluto);_this=_possibleConstructorReturn(this, _getPrototypeOf(Pluto).call(this, options, gameData));_this._init();return _this;
}
_createClass(Pluto, [{  key:"_init",
  value:function _init(){var css=this._css(this.options, this.gameData);this._insertCss(css);var html=this._html(this.options, this.gameData);var _this$_insertHtml=this._insertHtml(html),
container=_this$_insertHtml.container,
extContainer=_this$_insertHtml.extContainer;this._root=container;
this._container=container;
this._extContainer=extContainer;this._registerEvents();var loader=document.querySelector(".".concat(this.options.prefix, "loader"));var playButton=document.getElementById("".concat(this.options.prefix, "splash-button"));
this.on("playClick", function (){if(loader) loader.style.display="block";if(playButton) playButton.style.display="none";
});this._init_slots();}},{  key:"_css",
  value:function _css(options, gameData){var thumbnail=this._getThumbnail(options, gameData);var css="body {position: inherit;}.".concat(this.options.prefix, "splash-container {display: flex;flex-direction: column;justify-content: flex-start;align-items: stretch;position: absolute;width: 100%;height: 100%;top:0;left:0;background-color:black;color:white;font-family: Helvetica, Arial, sans-serif;  ").concat(this._getBackground(options, gameData), "}\n.").concat(this.options.prefix, "splash-top {border-bottom:2px solid rgba(0,0,0,0.2);background-color:rgba(0,0,0,0.1);flex-grow:1;display:flex;justify-content: center;align-items: center;display:none;position:relative;max-height:20%;}\n.").concat(this.options.prefix, "splash-bottom {border-top:2px solid rgba(0,0,0,0.2);background-color:rgba(0,0,0,0.1);  flex-grow:1;display:flex;justify-content: center;align-items: center;display:none;position:relative;max-height:20%;}.").concat(this.options.prefix, "splash-center {display: flex;flex-direction: row;justify-content: flex-start;flex-grow:1;}\n.").concat(this.options.prefix, "splash-left {border-right:2px solid rgba(0,0,0,0.2);background-color:rgba(0,0,0,0.1);  flex-grow:2;display:flex;justify-content: center;align-items: center;display:none;position:relative;max-width:20%;}\n.").concat(this.options.prefix, "splash-right {border-left:2px solid rgba(0,0,0,0.2);background-color:rgba(0,0,0,0.1);flex-grow:2;display:flex;justify-content: center;align-items: center;display:none;position:relative;max-width:20%;}\n.").concat(this.options.prefix, "splash-game {display:flex;flex-direction:column;justify-content: flex-start; overflow:hidden;flex-grow:1;flex-shrink:0;}.").concat(this.options.prefix, "splash-game-metadata{display:flex;flex-direction:column;justify-content:center;flex-grow:1;position:relative;}.").concat(this.options.prefix, "splash-game-consent{display:flex;justify-content:center;margin:0.5em;}\n.").concat(this.options.prefix, "splash-game-consent>p{text-align: justify;font-size: 12px;font-family: Arial;font-weight: normal;max-width: 300px;}\n.").concat(this.options.prefix, "splash-game-consent>p>a{color:#fff;}\n.").concat(this.options.prefix, "splash-game-thumbnail-play{flex-grow:1;display:flex;flex-direction:column;justify-content:center;align-items:center;}\n.").concat(this.options.prefix, "splash-game-title{display:flex;justify-content:center;align-items:center;margin:4px;font-size:1.5em;color:rgba(255, 255, 255, 0.9);}\n.").concat(this.options.prefix, "splash-game-thumbnail{display:none;justify-content:center;align-items:flex-end;position:relative;margin:4px;}\n.").concat(this.options.prefix, "splash-game-play{display:flex;justify-content:center;align-items:flex-start;margin:4px;}\n.").concat(this.options.prefix, "splash-game-description{display:flex;justify-content:center;align-items:flex-end;margin:4px;text-align: justify;font-size: 14px;font-family: Arial;font-weight: normal;color:#21A179;}\n.").concat(this.options.prefix, "splash-game-title>p{max-width: 300px;  padding:8px 24px;text-transform:uppercase;text-align:center;box-sizing:border-box;} .").concat(this.options.prefix, "splash-game-description>p{max-width: 300px;}\n.").concat(this.options.prefix, "splash-game-thumbnail>div {width: 10px;display: none;  \nheight: 10px;border-radius: 5px;border: 0px solid rgba(255, 255, 255, 0.9);background-color:rgba(0,0,0,0.1);background-image: url(").concat(thumbnail, ");background-position: center;background-size: cover;}\n.").concat(this.options.prefix, "splash-game-play>button{padding: 8px;border-radius: 5px;border:0;background: linear-gradient(0deg, #5245c7, #3778d1);color: rgba(255, 255, 255, 0.9);text-transform: uppercase;font-weight: bold;font-size: 18px;cursor: pointer;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);width: 150px;}\n.").concat(this.options.prefix, "splash-game-play>button:hover {background: linear-gradient(0deg, #5245c7, #3778d1);}\n.").concat(this.options.prefix, "splash-game-play>button:active {box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);background: linear-gradient(0deg, #1C8464, #15674E);}  .").concat(this.options.prefix, "loader,.").concat(this.options.prefix, "loader:after {border-radius: 50%;width: 1.5em;height: 1.5em;}\n.").concat(this.options.prefix, "loader {margin: 0px auto;font-size: 10px;position: relative;text-indent: -9999em;border-top: 1.1em solid rgba(255, 255, 255, 0.2);border-right: 1.1em solid rgba(255, 255, 255, 0.2);border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);border-left: 1.1em solid #ffffff;-webkit-transform: translateZ(0);-ms-transform: translateZ(0);transform: translateZ(0);-webkit-animation: ").concat(this.options.prefix, "load8 1.1s infinite linear;animation: ").concat(this.options.prefix, "load8 1.1s infinite linear;display:none;}\n@-webkit-keyframes ").concat(this.options.prefix, "load8 {0% {-webkit-transform: rotate(0deg);transform: rotate(0deg);}100% {-webkit-transform: rotate(360deg);transform: rotate(360deg);}}\n@keyframes ").concat(this.options.prefix, "load8 {0% {-webkit-transform: rotate(0deg);transform: rotate(0deg);}100% {-webkit-transform: rotate(360deg);transform: rotate(360deg);}}\n@media screen and (max-height:600px){.").concat(this.options.prefix, "splash-game-description{display:none;}.").concat(this.options.prefix, "splash-game-thumbnail>div{max-width:10px;max-height:10px;display: none;}}\n@media screen and (min-width:600px){.").concat(this.options.prefix, "splash-center >.").concat(this.options.prefix, "splash-left{display:flex;}.").concat(this.options.prefix, "splash-center >.").concat(this.options.prefix, "splash-right{display:flex;}.").concat(this.options.prefix, "splash-game-title>p,.").concat(this.options.prefix, "splash-game-consent>p,.").concat(this.options.prefix, "splash-game-description>p{max-width:500px;}}\n@media screen and (min-height:600px){.").concat(this.options.prefix, "splash-container >.").concat(this.options.prefix, "splash-top{display:flex;}.").concat(this.options.prefix, "splash-container >.").concat(this.options.prefix, "splash-bottom{display:flex;}}\n");
 return css;}},{  key:"_html",
  value:function _html(options, gameData){var isConsentDomain=options.isConsentDomain;var html="";var consentStyle=isConsentDomain ? "display:flex" : "display:none";
  html="<div class=\"".concat(this.options.prefix, "splash-container\"><div id=\"").concat(this.options.prefix, "splash-slot-top\" class=\"").concat(this.options.prefix, "splash-top\"></div><div class=\"").concat(this.options.prefix, "splash-center\">   <div id=\"").concat(this.options.prefix, "splash-slot-left\" class=\"").concat(this.options.prefix, "splash-left\"></div><div class=\"").concat(this.options.prefix, "splash-game\">\n<div class=\"").concat(this.options.prefix, "splash-game-metadata\"><div class=\"").concat(this.options.prefix, "splash-game-thumbnail-play\"><div class=\"").concat(this.options.prefix, "splash-game-thumbnail\">   <div></div></div>\n<div class=\"").concat(this.options.prefix, "splash-game-play\">   <button id=\"").concat(this.options.prefix, "splash-button\">PLAY</button><div class=\"").concat(this.options.prefix, "loader\">Loading...</div>  </div>   </div>\n  <div class=\"").concat(this.options.prefix, "splash-game-title\"><p>").concat(gameData.title, "</p>  </div><div class=\"").concat(this.options.prefix, "splash-game-description\"><p>").concat(gameData.description, "</p>  </div>\n</div>\n<div class=\"").concat(this.options.prefix, "splash-game-consent\" style=").concat(consentStyle, ">  <p>We may show personalized ads provided by our partners, and our services can not be used by children under 16 years old without the consent of their legal guardian. By clicking \"PLAY\", you consent to transmit your data to our partners for advertising purposes and declare that you are 16 years old or have the permission of your legal guardian. You can review our terms<a href=\"https://azerion.com/business/privacy.html\" target=\"_blank\">here</a>.   </p></div>  </div>  <div id=\"").concat(this.options.prefix, "splash-slot-right\" class=\"").concat(this.options.prefix, "splash-right\"></div>  </div><div id=\"").concat(this.options.prefix, "splash-slot-bottom\" class=\"").concat(this.options.prefix, "splash-bottom\"></div></div>\n");
 return html;}},{  key:"_insertHtml",
  value:function _insertHtml(html){var container=document.createElement("div");container.innerHTML=html;container.id="".concat(this.options.prefix, "splash");container.style['z-index']=_layers.Layers.SplashContainer.zIndex;container.style['position']="fixed";container.style['width']="100%";container.style['height']="100%";container.style['top']="0";container.style['left']="0";var extContainer=this._getExtContainer();if(extContainer){extContainer.style.display="block";
extContainer.insertBefore(container, extContainer.firstChild);
}else{var body=document.body || document.getElementsByTagName("body")[0];
body.insertBefore(container, body.firstChild);
}
 return {container: container,
extContainer: extContainer
};}},{  key:"_getBackground",
  value:function _getBackground(options, gameData){
    return "\nbackground: linear-gradient(90deg, rgba(7, 44, 47, 1) 0%, rgba(5, 66, 82, 1) 50%, rgba(7, 44, 47, 1) 100%);";//kkk 222
}},{  key:"_init_slots",
  value:function _init_slots(){var slot_description=document.querySelector(".".concat(this.options.prefix, "splash-game-description"));if(!this.gameData.description && slot_description) slot_description.style.display="none";var slot_top=document.getElementById("".concat(this.options.prefix, "splash-slot-top"));var slot_bottom=document.getElementById("".concat(this.options.prefix, "splash-slot-bottom"));var slot_left=document.getElementById("".concat(this.options.prefix, "splash-slot-left"));var slot_right=document.getElementById("".concat(this.options.prefix, "splash-slot-right"));var display=this.gameData.dAds;var enabled=display.enabled;var slot_top_enabled=enabled && display.top && display.top.enabled;var slot_bottom_enabled=enabled && display.bottom && display.bottom.enabled;var slot_left_enabled=enabled && display.left && display.left.enabled;var slot_right_enabled=enabled && display.right && display.right.enabled;if(slot_top){if(!slot_top_enabled) slot_top.style.display="none";else this._observe_visibility(slot_top);
}
if(slot_bottom){if(!slot_bottom_enabled) slot_bottom.style.display="none";else this._observe_visibility(slot_bottom);
}
if(slot_left){if(!slot_left_enabled) slot_left.style.display="none";else this._observe_visibility(slot_left);
}
if(slot_right){if(!slot_right_enabled) slot_right.style.display="none";else this._observe_visibility(slot_right);
}
this._slots={top: slot_top,
bottom: slot_bottom,
left: slot_left,
right: slot_right
};}},{  key:"_observe_visibility",
  value:function _observe_visibility(el){var _this2=this;if(!IntersectionObserver) return;var options={root: el.parent,
rootMargin: '0px',
threshold: 0.5
};var observer=new IntersectionObserver(function (entries, observer){entries.forEach(function (entry){  _this2.emit('slotVisibilityChanged', {id: entry.target.id,
  visible: entry.isIntersecting
});});}, options);
  observer.observe(el);
}}]); return Pluto;}(_base.default);var _default=Pluto;
  exports.default=_default;},{"../modules/layers":361,"./base":365}],368:[function(require,module,exports){  "use strict";Object.defineProperty(exports, "__esModule", {value: true
});
  exports.default=void 0;var _base=_interopRequireDefault(require("./base"));var _layers=require("../modules/layers");function _interopRequireDefault(obj){ return obj && obj.__esModule ? obj : { default: obj };}
  function _typeof(obj){if(typeof Symbol==="function" && typeof Symbol.iterator==="symbol"){ _typeof=function _typeof(obj){ return typeof obj;};}else{ _typeof=function _typeof(obj){ return obj && typeof Symbol==="function" && obj.constructor===Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};} return _typeof(obj);}
  function _classCallCheck(instance, Constructor){if(!(instance instanceof Constructor)){ throw new TypeError("Cannot call a class as a function");}}
  function _defineProperties(target, props){for(var i=0;i<props.length; i++){ var descriptor=props[i]; descriptor.enumerable=descriptor.enumerable || false; descriptor.configurable=true; if("value" in descriptor) descriptor.writable=true; Object.defineProperty(target, descriptor.key, descriptor);}}
  function _createClass(Constructor, protoProps, staticProps){if(protoProps) _defineProperties(Constructor.prototype, protoProps); if(staticProps) _defineProperties(Constructor, staticProps); return Constructor;}
  function _possibleConstructorReturn(self, call){if(call && (_typeof(call)==="object" || typeof call==="function")){ return call;} return _assertThisInitialized(self);}
  function _assertThisInitialized(self){if(self===void 0){ throw new ReferenceError("this hasn't been initialised - super() hasn't been called");} return self;}
  function _getPrototypeOf(o){ _getPrototypeOf=Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o){ return o.__proto__ || Object.getPrototypeOf(o);}; return _getPrototypeOf(o);}
  function _inherits(subClass, superClass){if(typeof superClass !== "function" && superClass !== null){ throw new TypeError("Super expression must either be null or a function");} subClass.prototype=Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true }}); if(superClass) _setPrototypeOf(subClass, superClass);}
  function _setPrototypeOf(o, p){ _setPrototypeOf=Object.setPrototypeOf || function _setPrototypeOf(o, p){ o.__proto__=p; return o;}; return _setPrototypeOf(o, p);}
var Quantum =
  
  function (_Base){_inherits(Quantum, _Base);  function Quantum(options, gameData){var _this;_classCallCheck(this, Quantum);_this=_possibleConstructorReturn(this, _getPrototypeOf(Quantum).call(this, options, gameData));_this._init();return _this;
}
_createClass(Quantum, [{  key:"_init",
  value:function _init(){var css=this._css(this.options, this.gameData);this._insertCss(css);var html=this._html(this.options, this.gameData);var _this$_insertHtml=this._insertHtml(html),
container=_this$_insertHtml.container,
extContainer=_this$_insertHtml.extContainer;this._root=container;
this._container=container;
this._extContainer=extContainer;this._registerEvents();}},{  key:"_css",
  value:function _css(options, gameData){var thumbnail=this._getThumbnail(options, gameData);var css="body {position: inherit;}.".concat(this.options.prefix, "splash-background-container {box-sizing: border-box;position: absolute;top: 0;left: 0;width: 100%;height: 100%;background-color: #000;overflow: hidden;}.").concat(this.options.prefix, "splash-background-image {box-sizing: border-box;position: absolute;top: -25%;left: -25%;width: 150%;height: 150%;background-image: url(").concat(thumbnail, ");background-size: cover;filter: blur(50px) brightness(1.5);}.").concat(this.options.prefix, "splash-container {display: flex;flex-flow: column;box-sizing: border-box;position: absolute;bottom: 0;width: 100%;height: 100%;}.").concat(this.options.prefix, "splash-top {display: flex;flex-flow: column;box-sizing: border-box;flex: 1;align-self: center;justify-content: center;padding: 20px;}.").concat(this.options.prefix, "splash-top > div {text-align: center;}.").concat(this.options.prefix, "splash-top > div > button {border: 0;margin: auto;padding: 10px 22px;border-radius: 5px;border: 3px solid white;background: linear-gradient(0deg, #dddddd, #ffffff);color: #222;text-transform: uppercase;font-family: Helvetica, Arial, sans-serif;font-weight: bold;font-size: 18px;cursor: pointer;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);}.").concat(this.options.prefix, "splash-top > div > button:hover {background: linear-gradient(0deg, #ffffff, #dddddd);}.").concat(this.options.prefix, "splash-top > div > button:active {box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);background: linear-gradient(0deg, #ffffff, #f5f5f5);}.").concat(this.options.prefix, "splash-top > div > div {position: relative;width: 150px;height: 150px;margin: auto auto 20px;border-radius: 100%;overflow: hidden;border: 3px solid rgba(255, 255, 255, 1);background-color: #000;box-shadow: inset 0 5px 5px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.3);background-image: url(").concat(thumbnail, ");background-position: center;background-size: cover;}.").concat(this.options.prefix, "splash-top > div > div > img {width: 100%;height: 100%;}.").concat(this.options.prefix, "splash-bottom {display: flex;flex-flow: column;box-sizing: border-box;align-self: center;justify-content: center;width: 100%;padding: 0 0 20px;}.").concat(this.options.prefix, "splash-bottom > .").concat(this.options.prefix, "splash-consent,.").concat(this.options.prefix, "splash-bottom > .").concat(this.options.prefix, "splash-title {\n   display: none; box-sizing: border-box;width: 100%;padding: 20px;background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.5) 50%, transparent);color: #fff;text-align: left;font-size: 12px;font-family: Arial;font-weight: normal;text-shadow: 0 0 1px rgba(0, 0, 0, 0.7);line-height: 150%;}.").concat(this.options.prefix, "splash-bottom > .").concat(this.options.prefix, "splash-title {\ndisplay: none;padding: 15px 0;text-align: center;font-size: 18px;font-family: Helvetica, Arial, sans-serif;font-weight: bold;line-height: 100%;}.").concat(this.options.prefix, "splash-bottom > .").concat(this.options.prefix, "splash-consent a {color: #fff;}");
 return css;}},{  key:"_html",
  value:function _html(options, gameData){var isConsentDomain=options.isConsentDomain;var html="";if(isConsentDomain){html="<div class=\"".concat(this.options.prefix, "splash-background-container\"><div class=\"").concat(this.options.prefix, "splash-background-image\"></div></div><div class=\"").concat(this.options.prefix, "splash-container\"><div class=\"").concat(this.options.prefix, "splash-top\">  <div><div></div><button id=\"").concat(this.options.prefix, "splash-button\">Play Game</button>  </div> </div><div class=\"").concat(this.options.prefix, "splash-bottom\">  <div class=\"").concat(this.options.prefix, "splash-consent\">We may show personalized ads provided by our partners, and our services can not be used by children under 16 years old without the consent of their legal guardian. By clicking \"PLAY GAME\", you consent to transmit your data to our partners for advertising purposes and declare that you are 16 years old or have the permission of your legal guardian. You can review our terms<a href=\"https://azerion.com/business/privacy.html\" target=\"_blank\">here</a>.  </div></div></div>");
}else{html="<div class=\"".concat(this.options.prefix, "splash-background-container\"><div class=\"").concat(this.options.prefix, "splash-background-image\"></div></div><div class=\"").concat(this.options.prefix, "splash-container\"><div class=\"").concat(this.options.prefix, "splash-top\">  <div><div></div><button id=\"").concat(this.options.prefix, "splash-button\">Play Game</button>  </div> </div><div class=\"").concat(this.options.prefix, "splash-bottom\">  <div class=\"").concat(this.options.prefix, "splash-title\">").concat(gameData.title, "</div></div></div>");
}
 return html;}},{  key:"_insertHtml",
  value:function _insertHtml(html){var container=document.createElement("div");container.innerHTML=html;container.id="".concat(this.options.prefix, "splash");container.style['z-index']=_layers.Layers.SplashContainer.zIndex;container.style['position']="absolute";container.style['width']="100%";container.style['height']="100%";container.style['top']="0";container.style['left']="0";var extContainer=this._getExtContainer();if(extContainer){extContainer.style.display="block";
extContainer.insertBefore(container, extContainer.firstChild);
}else{var body=document.body || document.getElementsByTagName("body")[0];
body.insertBefore(container, body.firstChild);
}
 return {container: container,
extContainer: extContainer
};
}}]); return Quantum;}(_base.default);var _default=Quantum;
  exports.default=_default;},{"../modules/layers":361,"./base":365}]},{},[350,351,352,353,354,355,356,357,358,359,360,361,362,363,364,365,366,367,368]);
  