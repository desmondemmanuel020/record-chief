// Record Chief — Self-contained bundle (React 18 + App)
// Built: 2026-05-04T22:45:32.337Z

(function(window){
// ── React 18 ──
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(){'use strict';(function(c,x){"object"===typeof exports&&"undefined"!==typeof module?x(exports):"function"===typeof define&&define.amd?define(["exports"],x):(c=c||self,x(c.React={}))})(this,function(c){function x(a){if(null===a||"object"!==typeof a)return null;a=V&&a[V]||a["@@iterator"];return"function"===typeof a?a:null}function w(a,b,e){this.props=a;this.context=b;this.refs=W;this.updater=e||X}function Y(){}function K(a,b,e){this.props=a;this.context=b;this.refs=W;this.updater=e||X}function Z(a,b,
e){var m,d={},c=null,h=null;if(null!=b)for(m in void 0!==b.ref&&(h=b.ref),void 0!==b.key&&(c=""+b.key),b)aa.call(b,m)&&!ba.hasOwnProperty(m)&&(d[m]=b[m]);var l=arguments.length-2;if(1===l)d.children=e;else if(1<l){for(var f=Array(l),k=0;k<l;k++)f[k]=arguments[k+2];d.children=f}if(a&&a.defaultProps)for(m in l=a.defaultProps,l)void 0===d[m]&&(d[m]=l[m]);return{$$typeof:y,type:a,key:c,ref:h,props:d,_owner:L.current}}function oa(a,b){return{$$typeof:y,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}
function M(a){return"object"===typeof a&&null!==a&&a.$$typeof===y}function pa(a){var b={"=":"=0",":":"=2"};return"$"+a.replace(/[=:]/g,function(a){return b[a]})}function N(a,b){return"object"===typeof a&&null!==a&&null!=a.key?pa(""+a.key):b.toString(36)}function B(a,b,e,m,d){var c=typeof a;if("undefined"===c||"boolean"===c)a=null;var h=!1;if(null===a)h=!0;else switch(c){case "string":case "number":h=!0;break;case "object":switch(a.$$typeof){case y:case qa:h=!0}}if(h)return h=a,d=d(h),a=""===m?"."+
N(h,0):m,ca(d)?(e="",null!=a&&(e=a.replace(da,"$&/")+"/"),B(d,b,e,"",function(a){return a})):null!=d&&(M(d)&&(d=oa(d,e+(!d.key||h&&h.key===d.key?"":(""+d.key).replace(da,"$&/")+"/")+a)),b.push(d)),1;h=0;m=""===m?".":m+":";if(ca(a))for(var l=0;l<a.length;l++){c=a[l];var f=m+N(c,l);h+=B(c,b,e,f,d)}else if(f=x(a),"function"===typeof f)for(a=f.call(a),l=0;!(c=a.next()).done;)c=c.value,f=m+N(c,l++),h+=B(c,b,e,f,d);else if("object"===c)throw b=String(a),Error("Objects are not valid as a React child (found: "+
("[object Object]"===b?"object with keys {"+Object.keys(a).join(", ")+"}":b)+"). If you meant to render a collection of children, use an array instead.");return h}function C(a,b,e){if(null==a)return a;var c=[],d=0;B(a,c,"","",function(a){return b.call(e,a,d++)});return c}function ra(a){if(-1===a._status){var b=a._result;b=b();b.then(function(b){if(0===a._status||-1===a._status)a._status=1,a._result=b},function(b){if(0===a._status||-1===a._status)a._status=2,a._result=b});-1===a._status&&(a._status=
0,a._result=b)}if(1===a._status)return a._result.default;throw a._result;}function O(a,b){var e=a.length;a.push(b);a:for(;0<e;){var c=e-1>>>1,d=a[c];if(0<D(d,b))a[c]=b,a[e]=d,e=c;else break a}}function p(a){return 0===a.length?null:a[0]}function E(a){if(0===a.length)return null;var b=a[0],e=a.pop();if(e!==b){a[0]=e;a:for(var c=0,d=a.length,k=d>>>1;c<k;){var h=2*(c+1)-1,l=a[h],f=h+1,g=a[f];if(0>D(l,e))f<d&&0>D(g,l)?(a[c]=g,a[f]=e,c=f):(a[c]=l,a[h]=e,c=h);else if(f<d&&0>D(g,e))a[c]=g,a[f]=e,c=f;else break a}}return b}
function D(a,b){var c=a.sortIndex-b.sortIndex;return 0!==c?c:a.id-b.id}function P(a){for(var b=p(r);null!==b;){if(null===b.callback)E(r);else if(b.startTime<=a)E(r),b.sortIndex=b.expirationTime,O(q,b);else break;b=p(r)}}function Q(a){z=!1;P(a);if(!u)if(null!==p(q))u=!0,R(S);else{var b=p(r);null!==b&&T(Q,b.startTime-a)}}function S(a,b){u=!1;z&&(z=!1,ea(A),A=-1);F=!0;var c=k;try{P(b);for(n=p(q);null!==n&&(!(n.expirationTime>b)||a&&!fa());){var m=n.callback;if("function"===typeof m){n.callback=null;
k=n.priorityLevel;var d=m(n.expirationTime<=b);b=v();"function"===typeof d?n.callback=d:n===p(q)&&E(q);P(b)}else E(q);n=p(q)}if(null!==n)var g=!0;else{var h=p(r);null!==h&&T(Q,h.startTime-b);g=!1}return g}finally{n=null,k=c,F=!1}}function fa(){return v()-ha<ia?!1:!0}function R(a){G=a;H||(H=!0,I())}function T(a,b){A=ja(function(){a(v())},b)}function ka(a){throw Error("act(...) is not supported in production builds of React.");}var y=Symbol.for("react.element"),qa=Symbol.for("react.portal"),sa=Symbol.for("react.fragment"),
ta=Symbol.for("react.strict_mode"),ua=Symbol.for("react.profiler"),va=Symbol.for("react.provider"),wa=Symbol.for("react.context"),xa=Symbol.for("react.forward_ref"),ya=Symbol.for("react.suspense"),za=Symbol.for("react.memo"),Aa=Symbol.for("react.lazy"),V=Symbol.iterator,X={isMounted:function(a){return!1},enqueueForceUpdate:function(a,b,c){},enqueueReplaceState:function(a,b,c,m){},enqueueSetState:function(a,b,c,m){}},la=Object.assign,W={};w.prototype.isReactComponent={};w.prototype.setState=function(a,
b){if("object"!==typeof a&&"function"!==typeof a&&null!=a)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,a,b,"setState")};w.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")};Y.prototype=w.prototype;var t=K.prototype=new Y;t.constructor=K;la(t,w.prototype);t.isPureReactComponent=!0;var ca=Array.isArray,aa=Object.prototype.hasOwnProperty,L={current:null},
ba={key:!0,ref:!0,__self:!0,__source:!0},da=/\/+/g,g={current:null},J={transition:null};if("object"===typeof performance&&"function"===typeof performance.now){var Ba=performance;var v=function(){return Ba.now()}}else{var ma=Date,Ca=ma.now();v=function(){return ma.now()-Ca}}var q=[],r=[],Da=1,n=null,k=3,F=!1,u=!1,z=!1,ja="function"===typeof setTimeout?setTimeout:null,ea="function"===typeof clearTimeout?clearTimeout:null,na="undefined"!==typeof setImmediate?setImmediate:null;"undefined"!==typeof navigator&&
void 0!==navigator.scheduling&&void 0!==navigator.scheduling.isInputPending&&navigator.scheduling.isInputPending.bind(navigator.scheduling);var H=!1,G=null,A=-1,ia=5,ha=-1,U=function(){if(null!==G){var a=v();ha=a;var b=!0;try{b=G(!0,a)}finally{b?I():(H=!1,G=null)}}else H=!1};if("function"===typeof na)var I=function(){na(U)};else if("undefined"!==typeof MessageChannel){t=new MessageChannel;var Ea=t.port2;t.port1.onmessage=U;I=function(){Ea.postMessage(null)}}else I=function(){ja(U,0)};t={ReactCurrentDispatcher:g,
ReactCurrentOwner:L,ReactCurrentBatchConfig:J,Scheduler:{__proto__:null,unstable_ImmediatePriority:1,unstable_UserBlockingPriority:2,unstable_NormalPriority:3,unstable_IdlePriority:5,unstable_LowPriority:4,unstable_runWithPriority:function(a,b){switch(a){case 1:case 2:case 3:case 4:case 5:break;default:a=3}var c=k;k=a;try{return b()}finally{k=c}},unstable_next:function(a){switch(k){case 1:case 2:case 3:var b=3;break;default:b=k}var c=k;k=b;try{return a()}finally{k=c}},unstable_scheduleCallback:function(a,
b,c){var e=v();"object"===typeof c&&null!==c?(c=c.delay,c="number"===typeof c&&0<c?e+c:e):c=e;switch(a){case 1:var d=-1;break;case 2:d=250;break;case 5:d=1073741823;break;case 4:d=1E4;break;default:d=5E3}d=c+d;a={id:Da++,callback:b,priorityLevel:a,startTime:c,expirationTime:d,sortIndex:-1};c>e?(a.sortIndex=c,O(r,a),null===p(q)&&a===p(r)&&(z?(ea(A),A=-1):z=!0,T(Q,c-e))):(a.sortIndex=d,O(q,a),u||F||(u=!0,R(S)));return a},unstable_cancelCallback:function(a){a.callback=null},unstable_wrapCallback:function(a){var b=
k;return function(){var c=k;k=b;try{return a.apply(this,arguments)}finally{k=c}}},unstable_getCurrentPriorityLevel:function(){return k},unstable_shouldYield:fa,unstable_requestPaint:function(){},unstable_continueExecution:function(){u||F||(u=!0,R(S))},unstable_pauseExecution:function(){},unstable_getFirstCallbackNode:function(){return p(q)},get unstable_now(){return v},unstable_forceFrameRate:function(a){0>a||125<a?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):
ia=0<a?Math.floor(1E3/a):5},unstable_Profiling:null}};c.Children={map:C,forEach:function(a,b,c){C(a,function(){b.apply(this,arguments)},c)},count:function(a){var b=0;C(a,function(){b++});return b},toArray:function(a){return C(a,function(a){return a})||[]},only:function(a){if(!M(a))throw Error("React.Children.only expected to receive a single React element child.");return a}};c.Component=w;c.Fragment=sa;c.Profiler=ua;c.PureComponent=K;c.StrictMode=ta;c.Suspense=ya;c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=
t;c.act=ka;c.cloneElement=function(a,b,c){if(null===a||void 0===a)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+a+".");var e=la({},a.props),d=a.key,k=a.ref,h=a._owner;if(null!=b){void 0!==b.ref&&(k=b.ref,h=L.current);void 0!==b.key&&(d=""+b.key);if(a.type&&a.type.defaultProps)var l=a.type.defaultProps;for(f in b)aa.call(b,f)&&!ba.hasOwnProperty(f)&&(e[f]=void 0===b[f]&&void 0!==l?l[f]:b[f])}var f=arguments.length-2;if(1===f)e.children=c;else if(1<f){l=
Array(f);for(var g=0;g<f;g++)l[g]=arguments[g+2];e.children=l}return{$$typeof:y,type:a.type,key:d,ref:k,props:e,_owner:h}};c.createContext=function(a){a={$$typeof:wa,_currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null};a.Provider={$$typeof:va,_context:a};return a.Consumer=a};c.createElement=Z;c.createFactory=function(a){var b=Z.bind(null,a);b.type=a;return b};c.createRef=function(){return{current:null}};c.forwardRef=function(a){return{$$typeof:xa,
render:a}};c.isValidElement=M;c.lazy=function(a){return{$$typeof:Aa,_payload:{_status:-1,_result:a},_init:ra}};c.memo=function(a,b){return{$$typeof:za,type:a,compare:void 0===b?null:b}};c.startTransition=function(a,b){b=J.transition;J.transition={};try{a()}finally{J.transition=b}};c.unstable_act=ka;c.useCallback=function(a,b){return g.current.useCallback(a,b)};c.useContext=function(a){return g.current.useContext(a)};c.useDebugValue=function(a,b){};c.useDeferredValue=function(a){return g.current.useDeferredValue(a)};
c.useEffect=function(a,b){return g.current.useEffect(a,b)};c.useId=function(){return g.current.useId()};c.useImperativeHandle=function(a,b,c){return g.current.useImperativeHandle(a,b,c)};c.useInsertionEffect=function(a,b){return g.current.useInsertionEffect(a,b)};c.useLayoutEffect=function(a,b){return g.current.useLayoutEffect(a,b)};c.useMemo=function(a,b){return g.current.useMemo(a,b)};c.useReducer=function(a,b,c){return g.current.useReducer(a,b,c)};c.useRef=function(a){return g.current.useRef(a)};
c.useState=function(a){return g.current.useState(a)};c.useSyncExternalStore=function(a,b,c){return g.current.useSyncExternalStore(a,b,c)};c.useTransition=function(){return g.current.useTransition()};c.version="18.3.1"});
})();

// ── ReactDOM 18 ──
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(){/*
 Modernizr 3.0.0pre (Custom Build) | MIT
*/
'use strict';(function(Q,zb){"object"===typeof exports&&"undefined"!==typeof module?zb(exports,require("react")):"function"===typeof define&&define.amd?define(["exports","react"],zb):(Q=Q||self,zb(Q.ReactDOM={},Q.React))})(this,function(Q,zb){function m(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return"Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}
function mb(a,b){Ab(a,b);Ab(a+"Capture",b)}function Ab(a,b){$b[a]=b;for(a=0;a<b.length;a++)cg.add(b[a])}function bj(a){if(Zd.call(dg,a))return!0;if(Zd.call(eg,a))return!1;if(cj.test(a))return dg[a]=!0;eg[a]=!0;return!1}function dj(a,b,c,d){if(null!==c&&0===c.type)return!1;switch(typeof b){case "function":case "symbol":return!0;case "boolean":if(d)return!1;if(null!==c)return!c.acceptsBooleans;a=a.toLowerCase().slice(0,5);return"data-"!==a&&"aria-"!==a;default:return!1}}function ej(a,b,c,d){if(null===
b||"undefined"===typeof b||dj(a,b,c,d))return!0;if(d)return!1;if(null!==c)switch(c.type){case 3:return!b;case 4:return!1===b;case 5:return isNaN(b);case 6:return isNaN(b)||1>b}return!1}function Y(a,b,c,d,e,f,g){this.acceptsBooleans=2===b||3===b||4===b;this.attributeName=d;this.attributeNamespace=e;this.mustUseProperty=c;this.propertyName=a;this.type=b;this.sanitizeURL=f;this.removeEmptyString=g}function $d(a,b,c,d){var e=R.hasOwnProperty(b)?R[b]:null;if(null!==e?0!==e.type:d||!(2<b.length)||"o"!==
b[0]&&"O"!==b[0]||"n"!==b[1]&&"N"!==b[1])ej(b,c,e,d)&&(c=null),d||null===e?bj(b)&&(null===c?a.removeAttribute(b):a.setAttribute(b,""+c)):e.mustUseProperty?a[e.propertyName]=null===c?3===e.type?!1:"":c:(b=e.attributeName,d=e.attributeNamespace,null===c?a.removeAttribute(b):(e=e.type,c=3===e||4===e&&!0===c?"":""+c,d?a.setAttributeNS(d,b,c):a.setAttribute(b,c)))}function ac(a){if(null===a||"object"!==typeof a)return null;a=fg&&a[fg]||a["@@iterator"];return"function"===typeof a?a:null}function bc(a,b,
c){if(void 0===ae)try{throw Error();}catch(d){ae=(b=d.stack.trim().match(/\n( *(at )?)/))&&b[1]||""}return"\n"+ae+a}function be(a,b){if(!a||ce)return"";ce=!0;var c=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(b)if(b=function(){throw Error();},Object.defineProperty(b.prototype,"props",{set:function(){throw Error();}}),"object"===typeof Reflect&&Reflect.construct){try{Reflect.construct(b,[])}catch(n){var d=n}Reflect.construct(a,[],b)}else{try{b.call()}catch(n){d=n}a.call(b.prototype)}else{try{throw Error();
}catch(n){d=n}a()}}catch(n){if(n&&d&&"string"===typeof n.stack){for(var e=n.stack.split("\n"),f=d.stack.split("\n"),g=e.length-1,h=f.length-1;1<=g&&0<=h&&e[g]!==f[h];)h--;for(;1<=g&&0<=h;g--,h--)if(e[g]!==f[h]){if(1!==g||1!==h){do if(g--,h--,0>h||e[g]!==f[h]){var k="\n"+e[g].replace(" at new "," at ");a.displayName&&k.includes("<anonymous>")&&(k=k.replace("<anonymous>",a.displayName));return k}while(1<=g&&0<=h)}break}}}finally{ce=!1,Error.prepareStackTrace=c}return(a=a?a.displayName||a.name:"")?bc(a):
""}function fj(a){switch(a.tag){case 5:return bc(a.type);case 16:return bc("Lazy");case 13:return bc("Suspense");case 19:return bc("SuspenseList");case 0:case 2:case 15:return a=be(a.type,!1),a;case 11:return a=be(a.type.render,!1),a;case 1:return a=be(a.type,!0),a;default:return""}}function de(a){if(null==a)return null;if("function"===typeof a)return a.displayName||a.name||null;if("string"===typeof a)return a;switch(a){case Bb:return"Fragment";case Cb:return"Portal";case ee:return"Profiler";case fe:return"StrictMode";
case ge:return"Suspense";case he:return"SuspenseList"}if("object"===typeof a)switch(a.$$typeof){case gg:return(a.displayName||"Context")+".Consumer";case hg:return(a._context.displayName||"Context")+".Provider";case ie:var b=a.render;a=a.displayName;a||(a=b.displayName||b.name||"",a=""!==a?"ForwardRef("+a+")":"ForwardRef");return a;case je:return b=a.displayName||null,null!==b?b:de(a.type)||"Memo";case Ta:b=a._payload;a=a._init;try{return de(a(b))}catch(c){}}return null}function gj(a){var b=a.type;
switch(a.tag){case 24:return"Cache";case 9:return(b.displayName||"Context")+".Consumer";case 10:return(b._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return a=b.render,a=a.displayName||a.name||"",b.displayName||(""!==a?"ForwardRef("+a+")":"ForwardRef");case 7:return"Fragment";case 5:return b;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return de(b);case 8:return b===fe?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";
case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if("function"===typeof b)return b.displayName||b.name||null;if("string"===typeof b)return b}return null}function Ua(a){switch(typeof a){case "boolean":case "number":case "string":case "undefined":return a;case "object":return a;default:return""}}function ig(a){var b=a.type;return(a=a.nodeName)&&"input"===a.toLowerCase()&&("checkbox"===b||"radio"===
b)}function hj(a){var b=ig(a)?"checked":"value",c=Object.getOwnPropertyDescriptor(a.constructor.prototype,b),d=""+a[b];if(!a.hasOwnProperty(b)&&"undefined"!==typeof c&&"function"===typeof c.get&&"function"===typeof c.set){var e=c.get,f=c.set;Object.defineProperty(a,b,{configurable:!0,get:function(){return e.call(this)},set:function(a){d=""+a;f.call(this,a)}});Object.defineProperty(a,b,{enumerable:c.enumerable});return{getValue:function(){return d},setValue:function(a){d=""+a},stopTracking:function(){a._valueTracker=
null;delete a[b]}}}}function Pc(a){a._valueTracker||(a._valueTracker=hj(a))}function jg(a){if(!a)return!1;var b=a._valueTracker;if(!b)return!0;var c=b.getValue();var d="";a&&(d=ig(a)?a.checked?"true":"false":a.value);a=d;return a!==c?(b.setValue(a),!0):!1}function Qc(a){a=a||("undefined"!==typeof document?document:void 0);if("undefined"===typeof a)return null;try{return a.activeElement||a.body}catch(b){return a.body}}function ke(a,b){var c=b.checked;return E({},b,{defaultChecked:void 0,defaultValue:void 0,
value:void 0,checked:null!=c?c:a._wrapperState.initialChecked})}function kg(a,b){var c=null==b.defaultValue?"":b.defaultValue,d=null!=b.checked?b.checked:b.defaultChecked;c=Ua(null!=b.value?b.value:c);a._wrapperState={initialChecked:d,initialValue:c,controlled:"checkbox"===b.type||"radio"===b.type?null!=b.checked:null!=b.value}}function lg(a,b){b=b.checked;null!=b&&$d(a,"checked",b,!1)}function le(a,b){lg(a,b);var c=Ua(b.value),d=b.type;if(null!=c)if("number"===d){if(0===c&&""===a.value||a.value!=
c)a.value=""+c}else a.value!==""+c&&(a.value=""+c);else if("submit"===d||"reset"===d){a.removeAttribute("value");return}b.hasOwnProperty("value")?me(a,b.type,c):b.hasOwnProperty("defaultValue")&&me(a,b.type,Ua(b.defaultValue));null==b.checked&&null!=b.defaultChecked&&(a.defaultChecked=!!b.defaultChecked)}function mg(a,b,c){if(b.hasOwnProperty("value")||b.hasOwnProperty("defaultValue")){var d=b.type;if(!("submit"!==d&&"reset"!==d||void 0!==b.value&&null!==b.value))return;b=""+a._wrapperState.initialValue;
c||b===a.value||(a.value=b);a.defaultValue=b}c=a.name;""!==c&&(a.name="");a.defaultChecked=!!a._wrapperState.initialChecked;""!==c&&(a.name=c)}function me(a,b,c){if("number"!==b||Qc(a.ownerDocument)!==a)null==c?a.defaultValue=""+a._wrapperState.initialValue:a.defaultValue!==""+c&&(a.defaultValue=""+c)}function Db(a,b,c,d){a=a.options;if(b){b={};for(var e=0;e<c.length;e++)b["$"+c[e]]=!0;for(c=0;c<a.length;c++)e=b.hasOwnProperty("$"+a[c].value),a[c].selected!==e&&(a[c].selected=e),e&&d&&(a[c].defaultSelected=
!0)}else{c=""+Ua(c);b=null;for(e=0;e<a.length;e++){if(a[e].value===c){a[e].selected=!0;d&&(a[e].defaultSelected=!0);return}null!==b||a[e].disabled||(b=a[e])}null!==b&&(b.selected=!0)}}function ne(a,b){if(null!=b.dangerouslySetInnerHTML)throw Error(m(91));return E({},b,{value:void 0,defaultValue:void 0,children:""+a._wrapperState.initialValue})}function ng(a,b){var c=b.value;if(null==c){c=b.children;b=b.defaultValue;if(null!=c){if(null!=b)throw Error(m(92));if(cc(c)){if(1<c.length)throw Error(m(93));
c=c[0]}b=c}null==b&&(b="");c=b}a._wrapperState={initialValue:Ua(c)}}function og(a,b){var c=Ua(b.value),d=Ua(b.defaultValue);null!=c&&(c=""+c,c!==a.value&&(a.value=c),null==b.defaultValue&&a.defaultValue!==c&&(a.defaultValue=c));null!=d&&(a.defaultValue=""+d)}function pg(a,b){b=a.textContent;b===a._wrapperState.initialValue&&""!==b&&null!==b&&(a.value=b)}function qg(a){switch(a){case "svg":return"http://www.w3.org/2000/svg";case "math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}
function oe(a,b){return null==a||"http://www.w3.org/1999/xhtml"===a?qg(b):"http://www.w3.org/2000/svg"===a&&"foreignObject"===b?"http://www.w3.org/1999/xhtml":a}function rg(a,b,c){return null==b||"boolean"===typeof b||""===b?"":c||"number"!==typeof b||0===b||dc.hasOwnProperty(a)&&dc[a]?(""+b).trim():b+"px"}function sg(a,b){a=a.style;for(var c in b)if(b.hasOwnProperty(c)){var d=0===c.indexOf("--"),e=rg(c,b[c],d);"float"===c&&(c="cssFloat");d?a.setProperty(c,e):a[c]=e}}function pe(a,b){if(b){if(ij[a]&&
(null!=b.children||null!=b.dangerouslySetInnerHTML))throw Error(m(137,a));if(null!=b.dangerouslySetInnerHTML){if(null!=b.children)throw Error(m(60));if("object"!==typeof b.dangerouslySetInnerHTML||!("__html"in b.dangerouslySetInnerHTML))throw Error(m(61));}if(null!=b.style&&"object"!==typeof b.style)throw Error(m(62));}}function qe(a,b){if(-1===a.indexOf("-"))return"string"===typeof b.is;switch(a){case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":return!1;
default:return!0}}function re(a){a=a.target||a.srcElement||window;a.correspondingUseElement&&(a=a.correspondingUseElement);return 3===a.nodeType?a.parentNode:a}function tg(a){if(a=ec(a)){if("function"!==typeof se)throw Error(m(280));var b=a.stateNode;b&&(b=Rc(b),se(a.stateNode,a.type,b))}}function ug(a){Eb?Fb?Fb.push(a):Fb=[a]:Eb=a}function vg(){if(Eb){var a=Eb,b=Fb;Fb=Eb=null;tg(a);if(b)for(a=0;a<b.length;a++)tg(b[a])}}function wg(a,b,c){if(te)return a(b,c);te=!0;try{return xg(a,b,c)}finally{if(te=
!1,null!==Eb||null!==Fb)yg(),vg()}}function fc(a,b){var c=a.stateNode;if(null===c)return null;var d=Rc(c);if(null===d)return null;c=d[b];a:switch(b){case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":case "onMouseEnter":(d=!d.disabled)||(a=a.type,d=!("button"===a||"input"===a||"select"===a||"textarea"===a));a=!d;break a;default:a=!1}if(a)return null;
if(c&&"function"!==typeof c)throw Error(m(231,b,typeof c));return c}function jj(a,b,c,d,e,f,g,h,k){gc=!1;Sc=null;kj.apply(lj,arguments)}function mj(a,b,c,d,e,f,g,h,k){jj.apply(this,arguments);if(gc){if(gc){var n=Sc;gc=!1;Sc=null}else throw Error(m(198));Tc||(Tc=!0,ue=n)}}function nb(a){var b=a,c=a;if(a.alternate)for(;b.return;)b=b.return;else{a=b;do b=a,0!==(b.flags&4098)&&(c=b.return),a=b.return;while(a)}return 3===b.tag?c:null}function zg(a){if(13===a.tag){var b=a.memoizedState;null===b&&(a=a.alternate,
null!==a&&(b=a.memoizedState));if(null!==b)return b.dehydrated}return null}function Ag(a){if(nb(a)!==a)throw Error(m(188));}function nj(a){var b=a.alternate;if(!b){b=nb(a);if(null===b)throw Error(m(188));return b!==a?null:a}for(var c=a,d=b;;){var e=c.return;if(null===e)break;var f=e.alternate;if(null===f){d=e.return;if(null!==d){c=d;continue}break}if(e.child===f.child){for(f=e.child;f;){if(f===c)return Ag(e),a;if(f===d)return Ag(e),b;f=f.sibling}throw Error(m(188));}if(c.return!==d.return)c=e,d=f;
else{for(var g=!1,h=e.child;h;){if(h===c){g=!0;c=e;d=f;break}if(h===d){g=!0;d=e;c=f;break}h=h.sibling}if(!g){for(h=f.child;h;){if(h===c){g=!0;c=f;d=e;break}if(h===d){g=!0;d=f;c=e;break}h=h.sibling}if(!g)throw Error(m(189));}}if(c.alternate!==d)throw Error(m(190));}if(3!==c.tag)throw Error(m(188));return c.stateNode.current===c?a:b}function Bg(a){a=nj(a);return null!==a?Cg(a):null}function Cg(a){if(5===a.tag||6===a.tag)return a;for(a=a.child;null!==a;){var b=Cg(a);if(null!==b)return b;a=a.sibling}return null}
function oj(a,b){if(Ca&&"function"===typeof Ca.onCommitFiberRoot)try{Ca.onCommitFiberRoot(Uc,a,void 0,128===(a.current.flags&128))}catch(c){}}function pj(a){a>>>=0;return 0===a?32:31-(qj(a)/rj|0)|0}function hc(a){switch(a&-a){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return a&
4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return a&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return a}}function Vc(a,b){var c=a.pendingLanes;if(0===c)return 0;var d=0,e=a.suspendedLanes,f=a.pingedLanes,g=c&268435455;if(0!==g){var h=g&~e;0!==h?d=hc(h):(f&=g,0!==f&&(d=hc(f)))}else g=c&~e,0!==g?d=hc(g):0!==f&&(d=hc(f));if(0===d)return 0;if(0!==b&&b!==d&&0===(b&e)&&
(e=d&-d,f=b&-b,e>=f||16===e&&0!==(f&4194240)))return b;0!==(d&4)&&(d|=c&16);b=a.entangledLanes;if(0!==b)for(a=a.entanglements,b&=d;0<b;)c=31-ta(b),e=1<<c,d|=a[c],b&=~e;return d}function sj(a,b){switch(a){case 1:case 2:case 4:return b+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return b+5E3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;
case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function tj(a,b){for(var c=a.suspendedLanes,d=a.pingedLanes,e=a.expirationTimes,f=a.pendingLanes;0<f;){var g=31-ta(f),h=1<<g,k=e[g];if(-1===k){if(0===(h&c)||0!==(h&d))e[g]=sj(h,b)}else k<=b&&(a.expiredLanes|=h);f&=~h}}function ve(a){a=a.pendingLanes&-1073741825;return 0!==a?a:a&1073741824?1073741824:0}function Dg(){var a=Wc;Wc<<=1;0===(Wc&4194240)&&(Wc=64);return a}function we(a){for(var b=[],c=0;31>c;c++)b.push(a);
return b}function ic(a,b,c){a.pendingLanes|=b;536870912!==b&&(a.suspendedLanes=0,a.pingedLanes=0);a=a.eventTimes;b=31-ta(b);a[b]=c}function uj(a,b){var c=a.pendingLanes&~b;a.pendingLanes=b;a.suspendedLanes=0;a.pingedLanes=0;a.expiredLanes&=b;a.mutableReadLanes&=b;a.entangledLanes&=b;b=a.entanglements;var d=a.eventTimes;for(a=a.expirationTimes;0<c;){var e=31-ta(c),f=1<<e;b[e]=0;d[e]=-1;a[e]=-1;c&=~f}}function xe(a,b){var c=a.entangledLanes|=b;for(a=a.entanglements;c;){var d=31-ta(c),e=1<<d;e&b|a[d]&
b&&(a[d]|=b);c&=~e}}function Eg(a){a&=-a;return 1<a?4<a?0!==(a&268435455)?16:536870912:4:1}function Fg(a,b){switch(a){case "focusin":case "focusout":Va=null;break;case "dragenter":case "dragleave":Wa=null;break;case "mouseover":case "mouseout":Xa=null;break;case "pointerover":case "pointerout":jc.delete(b.pointerId);break;case "gotpointercapture":case "lostpointercapture":kc.delete(b.pointerId)}}function lc(a,b,c,d,e,f){if(null===a||a.nativeEvent!==f)return a={blockedOn:b,domEventName:c,eventSystemFlags:d,
nativeEvent:f,targetContainers:[e]},null!==b&&(b=ec(b),null!==b&&Gg(b)),a;a.eventSystemFlags|=d;b=a.targetContainers;null!==e&&-1===b.indexOf(e)&&b.push(e);return a}function vj(a,b,c,d,e){switch(b){case "focusin":return Va=lc(Va,a,b,c,d,e),!0;case "dragenter":return Wa=lc(Wa,a,b,c,d,e),!0;case "mouseover":return Xa=lc(Xa,a,b,c,d,e),!0;case "pointerover":var f=e.pointerId;jc.set(f,lc(jc.get(f)||null,a,b,c,d,e));return!0;case "gotpointercapture":return f=e.pointerId,kc.set(f,lc(kc.get(f)||null,a,b,
c,d,e)),!0}return!1}function Hg(a){var b=ob(a.target);if(null!==b){var c=nb(b);if(null!==c)if(b=c.tag,13===b){if(b=zg(c),null!==b){a.blockedOn=b;wj(a.priority,function(){xj(c)});return}}else if(3===b&&c.stateNode.current.memoizedState.isDehydrated){a.blockedOn=3===c.tag?c.stateNode.containerInfo:null;return}}a.blockedOn=null}function Xc(a){if(null!==a.blockedOn)return!1;for(var b=a.targetContainers;0<b.length;){var c=ye(a.domEventName,a.eventSystemFlags,b[0],a.nativeEvent);if(null===c){c=a.nativeEvent;
var d=new c.constructor(c.type,c);ze=d;c.target.dispatchEvent(d);ze=null}else return b=ec(c),null!==b&&Gg(b),a.blockedOn=c,!1;b.shift()}return!0}function Ig(a,b,c){Xc(a)&&c.delete(b)}function yj(){Ae=!1;null!==Va&&Xc(Va)&&(Va=null);null!==Wa&&Xc(Wa)&&(Wa=null);null!==Xa&&Xc(Xa)&&(Xa=null);jc.forEach(Ig);kc.forEach(Ig)}function mc(a,b){a.blockedOn===b&&(a.blockedOn=null,Ae||(Ae=!0,Jg(Kg,yj)))}function nc(a){if(0<Yc.length){mc(Yc[0],a);for(var b=1;b<Yc.length;b++){var c=Yc[b];c.blockedOn===a&&(c.blockedOn=
null)}}null!==Va&&mc(Va,a);null!==Wa&&mc(Wa,a);null!==Xa&&mc(Xa,a);b=function(b){return mc(b,a)};jc.forEach(b);kc.forEach(b);for(b=0;b<Ya.length;b++)c=Ya[b],c.blockedOn===a&&(c.blockedOn=null);for(;0<Ya.length&&(b=Ya[0],null===b.blockedOn);)Hg(b),null===b.blockedOn&&Ya.shift()}function zj(a,b,c,d){var e=z,f=Gb.transition;Gb.transition=null;try{z=1,Be(a,b,c,d)}finally{z=e,Gb.transition=f}}function Aj(a,b,c,d){var e=z,f=Gb.transition;Gb.transition=null;try{z=4,Be(a,b,c,d)}finally{z=e,Gb.transition=
f}}function Be(a,b,c,d){if(Zc){var e=ye(a,b,c,d);if(null===e)Ce(a,b,d,$c,c),Fg(a,d);else if(vj(e,a,b,c,d))d.stopPropagation();else if(Fg(a,d),b&4&&-1<Bj.indexOf(a)){for(;null!==e;){var f=ec(e);null!==f&&Cj(f);f=ye(a,b,c,d);null===f&&Ce(a,b,d,$c,c);if(f===e)break;e=f}null!==e&&d.stopPropagation()}else Ce(a,b,d,null,c)}}function ye(a,b,c,d){$c=null;a=re(d);a=ob(a);if(null!==a)if(b=nb(a),null===b)a=null;else if(c=b.tag,13===c){a=zg(b);if(null!==a)return a;a=null}else if(3===c){if(b.stateNode.current.memoizedState.isDehydrated)return 3===
b.tag?b.stateNode.containerInfo:null;a=null}else b!==a&&(a=null);$c=a;return null}function Lg(a){switch(a){case "cancel":case "click":case "close":case "contextmenu":case "copy":case "cut":case "auxclick":case "dblclick":case "dragend":case "dragstart":case "drop":case "focusin":case "focusout":case "input":case "invalid":case "keydown":case "keypress":case "keyup":case "mousedown":case "mouseup":case "paste":case "pause":case "play":case "pointercancel":case "pointerdown":case "pointerup":case "ratechange":case "reset":case "resize":case "seeked":case "submit":case "touchcancel":case "touchend":case "touchstart":case "volumechange":case "change":case "selectionchange":case "textInput":case "compositionstart":case "compositionend":case "compositionupdate":case "beforeblur":case "afterblur":case "beforeinput":case "blur":case "fullscreenchange":case "focus":case "hashchange":case "popstate":case "select":case "selectstart":return 1;
case "drag":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "mousemove":case "mouseout":case "mouseover":case "pointermove":case "pointerout":case "pointerover":case "scroll":case "toggle":case "touchmove":case "wheel":case "mouseenter":case "mouseleave":case "pointerenter":case "pointerleave":return 4;case "message":switch(Dj()){case De:return 1;case Mg:return 4;case ad:case Ej:return 16;case Ng:return 536870912;default:return 16}default:return 16}}function Og(){if(bd)return bd;
var a,b=Ee,c=b.length,d,e="value"in Za?Za.value:Za.textContent,f=e.length;for(a=0;a<c&&b[a]===e[a];a++);var g=c-a;for(d=1;d<=g&&b[c-d]===e[f-d];d++);return bd=e.slice(a,1<d?1-d:void 0)}function cd(a){var b=a.keyCode;"charCode"in a?(a=a.charCode,0===a&&13===b&&(a=13)):a=b;10===a&&(a=13);return 32<=a||13===a?a:0}function dd(){return!0}function Pg(){return!1}function ka(a){function b(b,d,e,f,g){this._reactName=b;this._targetInst=e;this.type=d;this.nativeEvent=f;this.target=g;this.currentTarget=null;
for(var c in a)a.hasOwnProperty(c)&&(b=a[c],this[c]=b?b(f):f[c]);this.isDefaultPrevented=(null!=f.defaultPrevented?f.defaultPrevented:!1===f.returnValue)?dd:Pg;this.isPropagationStopped=Pg;return this}E(b.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():"unknown"!==typeof a.returnValue&&(a.returnValue=!1),this.isDefaultPrevented=dd)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():
"unknown"!==typeof a.cancelBubble&&(a.cancelBubble=!0),this.isPropagationStopped=dd)},persist:function(){},isPersistent:dd});return b}function Fj(a){var b=this.nativeEvent;return b.getModifierState?b.getModifierState(a):(a=Gj[a])?!!b[a]:!1}function Fe(a){return Fj}function Qg(a,b){switch(a){case "keyup":return-1!==Hj.indexOf(b.keyCode);case "keydown":return 229!==b.keyCode;case "keypress":case "mousedown":case "focusout":return!0;default:return!1}}function Rg(a){a=a.detail;return"object"===typeof a&&
"data"in a?a.data:null}function Ij(a,b){switch(a){case "compositionend":return Rg(b);case "keypress":if(32!==b.which)return null;Sg=!0;return Tg;case "textInput":return a=b.data,a===Tg&&Sg?null:a;default:return null}}function Jj(a,b){if(Hb)return"compositionend"===a||!Ge&&Qg(a,b)?(a=Og(),bd=Ee=Za=null,Hb=!1,a):null;switch(a){case "paste":return null;case "keypress":if(!(b.ctrlKey||b.altKey||b.metaKey)||b.ctrlKey&&b.altKey){if(b.char&&1<b.char.length)return b.char;if(b.which)return String.fromCharCode(b.which)}return null;
case "compositionend":return Ug&&"ko"!==b.locale?null:b.data;default:return null}}function Vg(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return"input"===b?!!Kj[a.type]:"textarea"===b?!0:!1}function Lj(a){if(!Ia)return!1;a="on"+a;var b=a in document;b||(b=document.createElement("div"),b.setAttribute(a,"return;"),b="function"===typeof b[a]);return b}function Wg(a,b,c,d){ug(d);b=ed(b,"onChange");0<b.length&&(c=new He("onChange","change",null,c,d),a.push({event:c,listeners:b}))}function Mj(a){Xg(a,
0)}function fd(a){var b=Ib(a);if(jg(b))return a}function Nj(a,b){if("change"===a)return b}function Yg(){oc&&(oc.detachEvent("onpropertychange",Zg),pc=oc=null)}function Zg(a){if("value"===a.propertyName&&fd(pc)){var b=[];Wg(b,pc,a,re(a));wg(Mj,b)}}function Oj(a,b,c){"focusin"===a?(Yg(),oc=b,pc=c,oc.attachEvent("onpropertychange",Zg)):"focusout"===a&&Yg()}function Pj(a,b){if("selectionchange"===a||"keyup"===a||"keydown"===a)return fd(pc)}function Qj(a,b){if("click"===a)return fd(b)}function Rj(a,b){if("input"===
a||"change"===a)return fd(b)}function Sj(a,b){return a===b&&(0!==a||1/a===1/b)||a!==a&&b!==b}function qc(a,b){if(ua(a,b))return!0;if("object"!==typeof a||null===a||"object"!==typeof b||null===b)return!1;var c=Object.keys(a),d=Object.keys(b);if(c.length!==d.length)return!1;for(d=0;d<c.length;d++){var e=c[d];if(!Zd.call(b,e)||!ua(a[e],b[e]))return!1}return!0}function $g(a){for(;a&&a.firstChild;)a=a.firstChild;return a}function ah(a,b){var c=$g(a);a=0;for(var d;c;){if(3===c.nodeType){d=a+c.textContent.length;
if(a<=b&&d>=b)return{node:c,offset:b-a};a=d}a:{for(;c;){if(c.nextSibling){c=c.nextSibling;break a}c=c.parentNode}c=void 0}c=$g(c)}}function bh(a,b){return a&&b?a===b?!0:a&&3===a.nodeType?!1:b&&3===b.nodeType?bh(a,b.parentNode):"contains"in a?a.contains(b):a.compareDocumentPosition?!!(a.compareDocumentPosition(b)&16):!1:!1}function ch(){for(var a=window,b=Qc();b instanceof a.HTMLIFrameElement;){try{var c="string"===typeof b.contentWindow.location.href}catch(d){c=!1}if(c)a=b.contentWindow;else break;
b=Qc(a.document)}return b}function Ie(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return b&&("input"===b&&("text"===a.type||"search"===a.type||"tel"===a.type||"url"===a.type||"password"===a.type)||"textarea"===b||"true"===a.contentEditable)}function Tj(a){var b=ch(),c=a.focusedElem,d=a.selectionRange;if(b!==c&&c&&c.ownerDocument&&bh(c.ownerDocument.documentElement,c)){if(null!==d&&Ie(c))if(b=d.start,a=d.end,void 0===a&&(a=b),"selectionStart"in c)c.selectionStart=b,c.selectionEnd=Math.min(a,c.value.length);
else if(a=(b=c.ownerDocument||document)&&b.defaultView||window,a.getSelection){a=a.getSelection();var e=c.textContent.length,f=Math.min(d.start,e);d=void 0===d.end?f:Math.min(d.end,e);!a.extend&&f>d&&(e=d,d=f,f=e);e=ah(c,f);var g=ah(c,d);e&&g&&(1!==a.rangeCount||a.anchorNode!==e.node||a.anchorOffset!==e.offset||a.focusNode!==g.node||a.focusOffset!==g.offset)&&(b=b.createRange(),b.setStart(e.node,e.offset),a.removeAllRanges(),f>d?(a.addRange(b),a.extend(g.node,g.offset)):(b.setEnd(g.node,g.offset),
a.addRange(b)))}b=[];for(a=c;a=a.parentNode;)1===a.nodeType&&b.push({element:a,left:a.scrollLeft,top:a.scrollTop});"function"===typeof c.focus&&c.focus();for(c=0;c<b.length;c++)a=b[c],a.element.scrollLeft=a.left,a.element.scrollTop=a.top}}function dh(a,b,c){var d=c.window===c?c.document:9===c.nodeType?c:c.ownerDocument;Je||null==Jb||Jb!==Qc(d)||(d=Jb,"selectionStart"in d&&Ie(d)?d={start:d.selectionStart,end:d.selectionEnd}:(d=(d.ownerDocument&&d.ownerDocument.defaultView||window).getSelection(),d=
{anchorNode:d.anchorNode,anchorOffset:d.anchorOffset,focusNode:d.focusNode,focusOffset:d.focusOffset}),rc&&qc(rc,d)||(rc=d,d=ed(Ke,"onSelect"),0<d.length&&(b=new He("onSelect","select",null,b,c),a.push({event:b,listeners:d}),b.target=Jb)))}function gd(a,b){var c={};c[a.toLowerCase()]=b.toLowerCase();c["Webkit"+a]="webkit"+b;c["Moz"+a]="moz"+b;return c}function hd(a){if(Le[a])return Le[a];if(!Kb[a])return a;var b=Kb[a],c;for(c in b)if(b.hasOwnProperty(c)&&c in eh)return Le[a]=b[c];return a}function $a(a,
b){fh.set(a,b);mb(b,[a])}function gh(a,b,c){var d=a.type||"unknown-event";a.currentTarget=c;mj(d,b,void 0,a);a.currentTarget=null}function Xg(a,b){b=0!==(b&4);for(var c=0;c<a.length;c++){var d=a[c],e=d.event;d=d.listeners;a:{var f=void 0;if(b)for(var g=d.length-1;0<=g;g--){var h=d[g],k=h.instance,n=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;gh(e,h,n);f=k}else for(g=0;g<d.length;g++){h=d[g];k=h.instance;n=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;
gh(e,h,n);f=k}}}if(Tc)throw a=ue,Tc=!1,ue=null,a;}function B(a,b){var c=b[Me];void 0===c&&(c=b[Me]=new Set);var d=a+"__bubble";c.has(d)||(hh(b,a,2,!1),c.add(d))}function Ne(a,b,c){var d=0;b&&(d|=4);hh(c,a,d,b)}function sc(a){if(!a[id]){a[id]=!0;cg.forEach(function(b){"selectionchange"!==b&&(Uj.has(b)||Ne(b,!1,a),Ne(b,!0,a))});var b=9===a.nodeType?a:a.ownerDocument;null===b||b[id]||(b[id]=!0,Ne("selectionchange",!1,b))}}function hh(a,b,c,d,e){switch(Lg(b)){case 1:e=zj;break;case 4:e=Aj;break;default:e=
Be}c=e.bind(null,b,c,a);e=void 0;!Oe||"touchstart"!==b&&"touchmove"!==b&&"wheel"!==b||(e=!0);d?void 0!==e?a.addEventListener(b,c,{capture:!0,passive:e}):a.addEventListener(b,c,!0):void 0!==e?a.addEventListener(b,c,{passive:e}):a.addEventListener(b,c,!1)}function Ce(a,b,c,d,e){var f=d;if(0===(b&1)&&0===(b&2)&&null!==d)a:for(;;){if(null===d)return;var g=d.tag;if(3===g||4===g){var h=d.stateNode.containerInfo;if(h===e||8===h.nodeType&&h.parentNode===e)break;if(4===g)for(g=d.return;null!==g;){var k=g.tag;
if(3===k||4===k)if(k=g.stateNode.containerInfo,k===e||8===k.nodeType&&k.parentNode===e)return;g=g.return}for(;null!==h;){g=ob(h);if(null===g)return;k=g.tag;if(5===k||6===k){d=f=g;continue a}h=h.parentNode}}d=d.return}wg(function(){var d=f,e=re(c),g=[];a:{var h=fh.get(a);if(void 0!==h){var k=He,m=a;switch(a){case "keypress":if(0===cd(c))break a;case "keydown":case "keyup":k=Vj;break;case "focusin":m="focus";k=Pe;break;case "focusout":m="blur";k=Pe;break;case "beforeblur":case "afterblur":k=Pe;break;
case "click":if(2===c.button)break a;case "auxclick":case "dblclick":case "mousedown":case "mousemove":case "mouseup":case "mouseout":case "mouseover":case "contextmenu":k=ih;break;case "drag":case "dragend":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "dragstart":case "drop":k=Wj;break;case "touchcancel":case "touchend":case "touchmove":case "touchstart":k=Xj;break;case jh:case kh:case lh:k=Yj;break;case mh:k=Zj;break;case "scroll":k=ak;break;case "wheel":k=bk;break;case "copy":case "cut":case "paste":k=
ck;break;case "gotpointercapture":case "lostpointercapture":case "pointercancel":case "pointerdown":case "pointermove":case "pointerout":case "pointerover":case "pointerup":k=nh}var l=0!==(b&4),p=!l&&"scroll"===a,w=l?null!==h?h+"Capture":null:h;l=[];for(var A=d,t;null!==A;){t=A;var M=t.stateNode;5===t.tag&&null!==M&&(t=M,null!==w&&(M=fc(A,w),null!=M&&l.push(tc(A,M,t))));if(p)break;A=A.return}0<l.length&&(h=new k(h,m,null,c,e),g.push({event:h,listeners:l}))}}if(0===(b&7)){a:{h="mouseover"===a||"pointerover"===
a;k="mouseout"===a||"pointerout"===a;if(h&&c!==ze&&(m=c.relatedTarget||c.fromElement)&&(ob(m)||m[Ja]))break a;if(k||h){h=e.window===e?e:(h=e.ownerDocument)?h.defaultView||h.parentWindow:window;if(k){if(m=c.relatedTarget||c.toElement,k=d,m=m?ob(m):null,null!==m&&(p=nb(m),m!==p||5!==m.tag&&6!==m.tag))m=null}else k=null,m=d;if(k!==m){l=ih;M="onMouseLeave";w="onMouseEnter";A="mouse";if("pointerout"===a||"pointerover"===a)l=nh,M="onPointerLeave",w="onPointerEnter",A="pointer";p=null==k?h:Ib(k);t=null==
m?h:Ib(m);h=new l(M,A+"leave",k,c,e);h.target=p;h.relatedTarget=t;M=null;ob(e)===d&&(l=new l(w,A+"enter",m,c,e),l.target=t,l.relatedTarget=p,M=l);p=M;if(k&&m)b:{l=k;w=m;A=0;for(t=l;t;t=Lb(t))A++;t=0;for(M=w;M;M=Lb(M))t++;for(;0<A-t;)l=Lb(l),A--;for(;0<t-A;)w=Lb(w),t--;for(;A--;){if(l===w||null!==w&&l===w.alternate)break b;l=Lb(l);w=Lb(w)}l=null}else l=null;null!==k&&oh(g,h,k,l,!1);null!==m&&null!==p&&oh(g,p,m,l,!0)}}}a:{h=d?Ib(d):window;k=h.nodeName&&h.nodeName.toLowerCase();if("select"===k||"input"===
k&&"file"===h.type)var ma=Nj;else if(Vg(h))if(ph)ma=Rj;else{ma=Pj;var va=Oj}else(k=h.nodeName)&&"input"===k.toLowerCase()&&("checkbox"===h.type||"radio"===h.type)&&(ma=Qj);if(ma&&(ma=ma(a,d))){Wg(g,ma,c,e);break a}va&&va(a,h,d);"focusout"===a&&(va=h._wrapperState)&&va.controlled&&"number"===h.type&&me(h,"number",h.value)}va=d?Ib(d):window;switch(a){case "focusin":if(Vg(va)||"true"===va.contentEditable)Jb=va,Ke=d,rc=null;break;case "focusout":rc=Ke=Jb=null;break;case "mousedown":Je=!0;break;case "contextmenu":case "mouseup":case "dragend":Je=
!1;dh(g,c,e);break;case "selectionchange":if(dk)break;case "keydown":case "keyup":dh(g,c,e)}var ab;if(Ge)b:{switch(a){case "compositionstart":var da="onCompositionStart";break b;case "compositionend":da="onCompositionEnd";break b;case "compositionupdate":da="onCompositionUpdate";break b}da=void 0}else Hb?Qg(a,c)&&(da="onCompositionEnd"):"keydown"===a&&229===c.keyCode&&(da="onCompositionStart");da&&(Ug&&"ko"!==c.locale&&(Hb||"onCompositionStart"!==da?"onCompositionEnd"===da&&Hb&&(ab=Og()):(Za=e,Ee=
"value"in Za?Za.value:Za.textContent,Hb=!0)),va=ed(d,da),0<va.length&&(da=new qh(da,a,null,c,e),g.push({event:da,listeners:va}),ab?da.data=ab:(ab=Rg(c),null!==ab&&(da.data=ab))));if(ab=ek?Ij(a,c):Jj(a,c))d=ed(d,"onBeforeInput"),0<d.length&&(e=new fk("onBeforeInput","beforeinput",null,c,e),g.push({event:e,listeners:d}),e.data=ab)}Xg(g,b)})}function tc(a,b,c){return{instance:a,listener:b,currentTarget:c}}function ed(a,b){for(var c=b+"Capture",d=[];null!==a;){var e=a,f=e.stateNode;5===e.tag&&null!==
f&&(e=f,f=fc(a,c),null!=f&&d.unshift(tc(a,f,e)),f=fc(a,b),null!=f&&d.push(tc(a,f,e)));a=a.return}return d}function Lb(a){if(null===a)return null;do a=a.return;while(a&&5!==a.tag);return a?a:null}function oh(a,b,c,d,e){for(var f=b._reactName,g=[];null!==c&&c!==d;){var h=c,k=h.alternate,n=h.stateNode;if(null!==k&&k===d)break;5===h.tag&&null!==n&&(h=n,e?(k=fc(c,f),null!=k&&g.unshift(tc(c,k,h))):e||(k=fc(c,f),null!=k&&g.push(tc(c,k,h))));c=c.return}0!==g.length&&a.push({event:b,listeners:g})}function rh(a){return("string"===
typeof a?a:""+a).replace(gk,"\n").replace(hk,"")}function jd(a,b,c,d){b=rh(b);if(rh(a)!==b&&c)throw Error(m(425));}function kd(){}function Qe(a,b){return"textarea"===a||"noscript"===a||"string"===typeof b.children||"number"===typeof b.children||"object"===typeof b.dangerouslySetInnerHTML&&null!==b.dangerouslySetInnerHTML&&null!=b.dangerouslySetInnerHTML.__html}function ik(a){setTimeout(function(){throw a;})}function Re(a,b){var c=b,d=0;do{var e=c.nextSibling;a.removeChild(c);if(e&&8===e.nodeType)if(c=
e.data,"/$"===c){if(0===d){a.removeChild(e);nc(b);return}d--}else"$"!==c&&"$?"!==c&&"$!"!==c||d++;c=e}while(c);nc(b)}function Ka(a){for(;null!=a;a=a.nextSibling){var b=a.nodeType;if(1===b||3===b)break;if(8===b){b=a.data;if("$"===b||"$!"===b||"$?"===b)break;if("/$"===b)return null}}return a}function sh(a){a=a.previousSibling;for(var b=0;a;){if(8===a.nodeType){var c=a.data;if("$"===c||"$!"===c||"$?"===c){if(0===b)return a;b--}else"/$"===c&&b++}a=a.previousSibling}return null}function ob(a){var b=a[Da];
if(b)return b;for(var c=a.parentNode;c;){if(b=c[Ja]||c[Da]){c=b.alternate;if(null!==b.child||null!==c&&null!==c.child)for(a=sh(a);null!==a;){if(c=a[Da])return c;a=sh(a)}return b}a=c;c=a.parentNode}return null}function ec(a){a=a[Da]||a[Ja];return!a||5!==a.tag&&6!==a.tag&&13!==a.tag&&3!==a.tag?null:a}function Ib(a){if(5===a.tag||6===a.tag)return a.stateNode;throw Error(m(33));}function Rc(a){return a[uc]||null}function bb(a){return{current:a}}function v(a,b){0>Mb||(a.current=Se[Mb],Se[Mb]=null,Mb--)}
function y(a,b,c){Mb++;Se[Mb]=a.current;a.current=b}function Nb(a,b){var c=a.type.contextTypes;if(!c)return cb;var d=a.stateNode;if(d&&d.__reactInternalMemoizedUnmaskedChildContext===b)return d.__reactInternalMemoizedMaskedChildContext;var e={},f;for(f in c)e[f]=b[f];d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=b,a.__reactInternalMemoizedMaskedChildContext=e);return e}function ea(a){a=a.childContextTypes;return null!==a&&void 0!==a}function th(a,b,c){if(J.current!==cb)throw Error(m(168));
y(J,b);y(S,c)}function uh(a,b,c){var d=a.stateNode;b=b.childContextTypes;if("function"!==typeof d.getChildContext)return c;d=d.getChildContext();for(var e in d)if(!(e in b))throw Error(m(108,gj(a)||"Unknown",e));return E({},c,d)}function ld(a){a=(a=a.stateNode)&&a.__reactInternalMemoizedMergedChildContext||cb;pb=J.current;y(J,a);y(S,S.current);return!0}function vh(a,b,c){var d=a.stateNode;if(!d)throw Error(m(169));c?(a=uh(a,b,pb),d.__reactInternalMemoizedMergedChildContext=a,v(S),v(J),y(J,a)):v(S);
y(S,c)}function wh(a){null===La?La=[a]:La.push(a)}function jk(a){md=!0;wh(a)}function db(){if(!Te&&null!==La){Te=!0;var a=0,b=z;try{var c=La;for(z=1;a<c.length;a++){var d=c[a];do d=d(!0);while(null!==d)}La=null;md=!1}catch(e){throw null!==La&&(La=La.slice(a+1)),xh(De,db),e;}finally{z=b,Te=!1}}return null}function qb(a,b){Ob[Pb++]=nd;Ob[Pb++]=od;od=a;nd=b}function yh(a,b,c){na[oa++]=Ma;na[oa++]=Na;na[oa++]=rb;rb=a;var d=Ma;a=Na;var e=32-ta(d)-1;d&=~(1<<e);c+=1;var f=32-ta(b)+e;if(30<f){var g=e-e%5;
f=(d&(1<<g)-1).toString(32);d>>=g;e-=g;Ma=1<<32-ta(b)+e|c<<e|d;Na=f+a}else Ma=1<<f|c<<e|d,Na=a}function Ue(a){null!==a.return&&(qb(a,1),yh(a,1,0))}function Ve(a){for(;a===od;)od=Ob[--Pb],Ob[Pb]=null,nd=Ob[--Pb],Ob[Pb]=null;for(;a===rb;)rb=na[--oa],na[oa]=null,Na=na[--oa],na[oa]=null,Ma=na[--oa],na[oa]=null}function zh(a,b){var c=pa(5,null,null,0);c.elementType="DELETED";c.stateNode=b;c.return=a;b=a.deletions;null===b?(a.deletions=[c],a.flags|=16):b.push(c)}function Ah(a,b){switch(a.tag){case 5:var c=
a.type;b=1!==b.nodeType||c.toLowerCase()!==b.nodeName.toLowerCase()?null:b;return null!==b?(a.stateNode=b,la=a,fa=Ka(b.firstChild),!0):!1;case 6:return b=""===a.pendingProps||3!==b.nodeType?null:b,null!==b?(a.stateNode=b,la=a,fa=null,!0):!1;case 13:return b=8!==b.nodeType?null:b,null!==b?(c=null!==rb?{id:Ma,overflow:Na}:null,a.memoizedState={dehydrated:b,treeContext:c,retryLane:1073741824},c=pa(18,null,null,0),c.stateNode=b,c.return=a,a.child=c,la=a,fa=null,!0):!1;default:return!1}}function We(a){return 0!==
(a.mode&1)&&0===(a.flags&128)}function Xe(a){if(D){var b=fa;if(b){var c=b;if(!Ah(a,b)){if(We(a))throw Error(m(418));b=Ka(c.nextSibling);var d=la;b&&Ah(a,b)?zh(d,c):(a.flags=a.flags&-4097|2,D=!1,la=a)}}else{if(We(a))throw Error(m(418));a.flags=a.flags&-4097|2;D=!1;la=a}}}function Bh(a){for(a=a.return;null!==a&&5!==a.tag&&3!==a.tag&&13!==a.tag;)a=a.return;la=a}function pd(a){if(a!==la)return!1;if(!D)return Bh(a),D=!0,!1;var b;(b=3!==a.tag)&&!(b=5!==a.tag)&&(b=a.type,b="head"!==b&&"body"!==b&&!Qe(a.type,
a.memoizedProps));if(b&&(b=fa)){if(We(a)){for(a=fa;a;)a=Ka(a.nextSibling);throw Error(m(418));}for(;b;)zh(a,b),b=Ka(b.nextSibling)}Bh(a);if(13===a.tag){a=a.memoizedState;a=null!==a?a.dehydrated:null;if(!a)throw Error(m(317));a:{a=a.nextSibling;for(b=0;a;){if(8===a.nodeType){var c=a.data;if("/$"===c){if(0===b){fa=Ka(a.nextSibling);break a}b--}else"$"!==c&&"$!"!==c&&"$?"!==c||b++}a=a.nextSibling}fa=null}}else fa=la?Ka(a.stateNode.nextSibling):null;return!0}function Qb(){fa=la=null;D=!1}function Ye(a){null===
wa?wa=[a]:wa.push(a)}function vc(a,b,c){a=c.ref;if(null!==a&&"function"!==typeof a&&"object"!==typeof a){if(c._owner){c=c._owner;if(c){if(1!==c.tag)throw Error(m(309));var d=c.stateNode}if(!d)throw Error(m(147,a));var e=d,f=""+a;if(null!==b&&null!==b.ref&&"function"===typeof b.ref&&b.ref._stringRef===f)return b.ref;b=function(a){var b=e.refs;null===a?delete b[f]:b[f]=a};b._stringRef=f;return b}if("string"!==typeof a)throw Error(m(284));if(!c._owner)throw Error(m(290,a));}return a}function qd(a,b){a=
Object.prototype.toString.call(b);throw Error(m(31,"[object Object]"===a?"object with keys {"+Object.keys(b).join(", ")+"}":a));}function Ch(a){var b=a._init;return b(a._payload)}function Dh(a){function b(b,c){if(a){var d=b.deletions;null===d?(b.deletions=[c],b.flags|=16):d.push(c)}}function c(c,d){if(!a)return null;for(;null!==d;)b(c,d),d=d.sibling;return null}function d(a,b){for(a=new Map;null!==b;)null!==b.key?a.set(b.key,b):a.set(b.index,b),b=b.sibling;return a}function e(a,b){a=eb(a,b);a.index=
0;a.sibling=null;return a}function f(b,c,d){b.index=d;if(!a)return b.flags|=1048576,c;d=b.alternate;if(null!==d)return d=d.index,d<c?(b.flags|=2,c):d;b.flags|=2;return c}function g(b){a&&null===b.alternate&&(b.flags|=2);return b}function h(a,b,c,d){if(null===b||6!==b.tag)return b=Ze(c,a.mode,d),b.return=a,b;b=e(b,c);b.return=a;return b}function k(a,b,c,d){var f=c.type;if(f===Bb)return l(a,b,c.props.children,d,c.key);if(null!==b&&(b.elementType===f||"object"===typeof f&&null!==f&&f.$$typeof===Ta&&
Ch(f)===b.type))return d=e(b,c.props),d.ref=vc(a,b,c),d.return=a,d;d=rd(c.type,c.key,c.props,null,a.mode,d);d.ref=vc(a,b,c);d.return=a;return d}function n(a,b,c,d){if(null===b||4!==b.tag||b.stateNode.containerInfo!==c.containerInfo||b.stateNode.implementation!==c.implementation)return b=$e(c,a.mode,d),b.return=a,b;b=e(b,c.children||[]);b.return=a;return b}function l(a,b,c,d,f){if(null===b||7!==b.tag)return b=sb(c,a.mode,d,f),b.return=a,b;b=e(b,c);b.return=a;return b}function u(a,b,c){if("string"===
typeof b&&""!==b||"number"===typeof b)return b=Ze(""+b,a.mode,c),b.return=a,b;if("object"===typeof b&&null!==b){switch(b.$$typeof){case sd:return c=rd(b.type,b.key,b.props,null,a.mode,c),c.ref=vc(a,null,b),c.return=a,c;case Cb:return b=$e(b,a.mode,c),b.return=a,b;case Ta:var d=b._init;return u(a,d(b._payload),c)}if(cc(b)||ac(b))return b=sb(b,a.mode,c,null),b.return=a,b;qd(a,b)}return null}function r(a,b,c,d){var e=null!==b?b.key:null;if("string"===typeof c&&""!==c||"number"===typeof c)return null!==
e?null:h(a,b,""+c,d);if("object"===typeof c&&null!==c){switch(c.$$typeof){case sd:return c.key===e?k(a,b,c,d):null;case Cb:return c.key===e?n(a,b,c,d):null;case Ta:return e=c._init,r(a,b,e(c._payload),d)}if(cc(c)||ac(c))return null!==e?null:l(a,b,c,d,null);qd(a,c)}return null}function p(a,b,c,d,e){if("string"===typeof d&&""!==d||"number"===typeof d)return a=a.get(c)||null,h(b,a,""+d,e);if("object"===typeof d&&null!==d){switch(d.$$typeof){case sd:return a=a.get(null===d.key?c:d.key)||null,k(b,a,d,
e);case Cb:return a=a.get(null===d.key?c:d.key)||null,n(b,a,d,e);case Ta:var f=d._init;return p(a,b,c,f(d._payload),e)}if(cc(d)||ac(d))return a=a.get(c)||null,l(b,a,d,e,null);qd(b,d)}return null}function x(e,g,h,k){for(var n=null,m=null,l=g,t=g=0,q=null;null!==l&&t<h.length;t++){l.index>t?(q=l,l=null):q=l.sibling;var A=r(e,l,h[t],k);if(null===A){null===l&&(l=q);break}a&&l&&null===A.alternate&&b(e,l);g=f(A,g,t);null===m?n=A:m.sibling=A;m=A;l=q}if(t===h.length)return c(e,l),D&&qb(e,t),n;if(null===l){for(;t<
h.length;t++)l=u(e,h[t],k),null!==l&&(g=f(l,g,t),null===m?n=l:m.sibling=l,m=l);D&&qb(e,t);return n}for(l=d(e,l);t<h.length;t++)q=p(l,e,t,h[t],k),null!==q&&(a&&null!==q.alternate&&l.delete(null===q.key?t:q.key),g=f(q,g,t),null===m?n=q:m.sibling=q,m=q);a&&l.forEach(function(a){return b(e,a)});D&&qb(e,t);return n}function I(e,g,h,k){var n=ac(h);if("function"!==typeof n)throw Error(m(150));h=n.call(h);if(null==h)throw Error(m(151));for(var l=n=null,q=g,t=g=0,A=null,w=h.next();null!==q&&!w.done;t++,w=
h.next()){q.index>t?(A=q,q=null):A=q.sibling;var x=r(e,q,w.value,k);if(null===x){null===q&&(q=A);break}a&&q&&null===x.alternate&&b(e,q);g=f(x,g,t);null===l?n=x:l.sibling=x;l=x;q=A}if(w.done)return c(e,q),D&&qb(e,t),n;if(null===q){for(;!w.done;t++,w=h.next())w=u(e,w.value,k),null!==w&&(g=f(w,g,t),null===l?n=w:l.sibling=w,l=w);D&&qb(e,t);return n}for(q=d(e,q);!w.done;t++,w=h.next())w=p(q,e,t,w.value,k),null!==w&&(a&&null!==w.alternate&&q.delete(null===w.key?t:w.key),g=f(w,g,t),null===l?n=w:l.sibling=
w,l=w);a&&q.forEach(function(a){return b(e,a)});D&&qb(e,t);return n}function v(a,d,f,h){"object"===typeof f&&null!==f&&f.type===Bb&&null===f.key&&(f=f.props.children);if("object"===typeof f&&null!==f){switch(f.$$typeof){case sd:a:{for(var k=f.key,n=d;null!==n;){if(n.key===k){k=f.type;if(k===Bb){if(7===n.tag){c(a,n.sibling);d=e(n,f.props.children);d.return=a;a=d;break a}}else if(n.elementType===k||"object"===typeof k&&null!==k&&k.$$typeof===Ta&&Ch(k)===n.type){c(a,n.sibling);d=e(n,f.props);d.ref=vc(a,
n,f);d.return=a;a=d;break a}c(a,n);break}else b(a,n);n=n.sibling}f.type===Bb?(d=sb(f.props.children,a.mode,h,f.key),d.return=a,a=d):(h=rd(f.type,f.key,f.props,null,a.mode,h),h.ref=vc(a,d,f),h.return=a,a=h)}return g(a);case Cb:a:{for(n=f.key;null!==d;){if(d.key===n)if(4===d.tag&&d.stateNode.containerInfo===f.containerInfo&&d.stateNode.implementation===f.implementation){c(a,d.sibling);d=e(d,f.children||[]);d.return=a;a=d;break a}else{c(a,d);break}else b(a,d);d=d.sibling}d=$e(f,a.mode,h);d.return=a;
a=d}return g(a);case Ta:return n=f._init,v(a,d,n(f._payload),h)}if(cc(f))return x(a,d,f,h);if(ac(f))return I(a,d,f,h);qd(a,f)}return"string"===typeof f&&""!==f||"number"===typeof f?(f=""+f,null!==d&&6===d.tag?(c(a,d.sibling),d=e(d,f),d.return=a,a=d):(c(a,d),d=Ze(f,a.mode,h),d.return=a,a=d),g(a)):c(a,d)}return v}function af(){bf=Rb=td=null}function cf(a,b){b=ud.current;v(ud);a._currentValue=b}function df(a,b,c){for(;null!==a;){var d=a.alternate;(a.childLanes&b)!==b?(a.childLanes|=b,null!==d&&(d.childLanes|=
b)):null!==d&&(d.childLanes&b)!==b&&(d.childLanes|=b);if(a===c)break;a=a.return}}function Sb(a,b){td=a;bf=Rb=null;a=a.dependencies;null!==a&&null!==a.firstContext&&(0!==(a.lanes&b)&&(ha=!0),a.firstContext=null)}function qa(a){var b=a._currentValue;if(bf!==a)if(a={context:a,memoizedValue:b,next:null},null===Rb){if(null===td)throw Error(m(308));Rb=a;td.dependencies={lanes:0,firstContext:a}}else Rb=Rb.next=a;return b}function ef(a){null===tb?tb=[a]:tb.push(a)}function Eh(a,b,c,d){var e=b.interleaved;
null===e?(c.next=c,ef(b)):(c.next=e.next,e.next=c);b.interleaved=c;return Oa(a,d)}function Oa(a,b){a.lanes|=b;var c=a.alternate;null!==c&&(c.lanes|=b);c=a;for(a=a.return;null!==a;)a.childLanes|=b,c=a.alternate,null!==c&&(c.childLanes|=b),c=a,a=a.return;return 3===c.tag?c.stateNode:null}function ff(a){a.updateQueue={baseState:a.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Fh(a,b){a=a.updateQueue;b.updateQueue===a&&(b.updateQueue=
{baseState:a.baseState,firstBaseUpdate:a.firstBaseUpdate,lastBaseUpdate:a.lastBaseUpdate,shared:a.shared,effects:a.effects})}function Pa(a,b){return{eventTime:a,lane:b,tag:0,payload:null,callback:null,next:null}}function fb(a,b,c){var d=a.updateQueue;if(null===d)return null;d=d.shared;if(0!==(p&2)){var e=d.pending;null===e?b.next=b:(b.next=e.next,e.next=b);d.pending=b;return kk(a,c)}e=d.interleaved;null===e?(b.next=b,ef(d)):(b.next=e.next,e.next=b);d.interleaved=b;return Oa(a,c)}function vd(a,b,c){b=
b.updateQueue;if(null!==b&&(b=b.shared,0!==(c&4194240))){var d=b.lanes;d&=a.pendingLanes;c|=d;b.lanes=c;xe(a,c)}}function Gh(a,b){var c=a.updateQueue,d=a.alternate;if(null!==d&&(d=d.updateQueue,c===d)){var e=null,f=null;c=c.firstBaseUpdate;if(null!==c){do{var g={eventTime:c.eventTime,lane:c.lane,tag:c.tag,payload:c.payload,callback:c.callback,next:null};null===f?e=f=g:f=f.next=g;c=c.next}while(null!==c);null===f?e=f=b:f=f.next=b}else e=f=b;c={baseState:d.baseState,firstBaseUpdate:e,lastBaseUpdate:f,
shared:d.shared,effects:d.effects};a.updateQueue=c;return}a=c.lastBaseUpdate;null===a?c.firstBaseUpdate=b:a.next=b;c.lastBaseUpdate=b}function wd(a,b,c,d){var e=a.updateQueue;gb=!1;var f=e.firstBaseUpdate,g=e.lastBaseUpdate,h=e.shared.pending;if(null!==h){e.shared.pending=null;var k=h,n=k.next;k.next=null;null===g?f=n:g.next=n;g=k;var l=a.alternate;null!==l&&(l=l.updateQueue,h=l.lastBaseUpdate,h!==g&&(null===h?l.firstBaseUpdate=n:h.next=n,l.lastBaseUpdate=k))}if(null!==f){var m=e.baseState;g=0;l=
n=k=null;h=f;do{var r=h.lane,p=h.eventTime;if((d&r)===r){null!==l&&(l=l.next={eventTime:p,lane:0,tag:h.tag,payload:h.payload,callback:h.callback,next:null});a:{var x=a,v=h;r=b;p=c;switch(v.tag){case 1:x=v.payload;if("function"===typeof x){m=x.call(p,m,r);break a}m=x;break a;case 3:x.flags=x.flags&-65537|128;case 0:x=v.payload;r="function"===typeof x?x.call(p,m,r):x;if(null===r||void 0===r)break a;m=E({},m,r);break a;case 2:gb=!0}}null!==h.callback&&0!==h.lane&&(a.flags|=64,r=e.effects,null===r?e.effects=
[h]:r.push(h))}else p={eventTime:p,lane:r,tag:h.tag,payload:h.payload,callback:h.callback,next:null},null===l?(n=l=p,k=m):l=l.next=p,g|=r;h=h.next;if(null===h)if(h=e.shared.pending,null===h)break;else r=h,h=r.next,r.next=null,e.lastBaseUpdate=r,e.shared.pending=null}while(1);null===l&&(k=m);e.baseState=k;e.firstBaseUpdate=n;e.lastBaseUpdate=l;b=e.shared.interleaved;if(null!==b){e=b;do g|=e.lane,e=e.next;while(e!==b)}else null===f&&(e.shared.lanes=0);ra|=g;a.lanes=g;a.memoizedState=m}}function Hh(a,
b,c){a=b.effects;b.effects=null;if(null!==a)for(b=0;b<a.length;b++){var d=a[b],e=d.callback;if(null!==e){d.callback=null;d=c;if("function"!==typeof e)throw Error(m(191,e));e.call(d)}}}function ub(a){if(a===wc)throw Error(m(174));return a}function gf(a,b){y(xc,b);y(yc,a);y(Ea,wc);a=b.nodeType;switch(a){case 9:case 11:b=(b=b.documentElement)?b.namespaceURI:oe(null,"");break;default:a=8===a?b.parentNode:b,b=a.namespaceURI||null,a=a.tagName,b=oe(b,a)}v(Ea);y(Ea,b)}function Tb(a){v(Ea);v(yc);v(xc)}function Ih(a){ub(xc.current);
var b=ub(Ea.current);var c=oe(b,a.type);b!==c&&(y(yc,a),y(Ea,c))}function hf(a){yc.current===a&&(v(Ea),v(yc))}function xd(a){for(var b=a;null!==b;){if(13===b.tag){var c=b.memoizedState;if(null!==c&&(c=c.dehydrated,null===c||"$?"===c.data||"$!"===c.data))return b}else if(19===b.tag&&void 0!==b.memoizedProps.revealOrder){if(0!==(b.flags&128))return b}else if(null!==b.child){b.child.return=b;b=b.child;continue}if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return null;b=b.return}b.sibling.return=
b.return;b=b.sibling}return null}function jf(){for(var a=0;a<kf.length;a++)kf[a]._workInProgressVersionPrimary=null;kf.length=0}function V(){throw Error(m(321));}function lf(a,b){if(null===b)return!1;for(var c=0;c<b.length&&c<a.length;c++)if(!ua(a[c],b[c]))return!1;return!0}function mf(a,b,c,d,e,f){vb=f;C=b;b.memoizedState=null;b.updateQueue=null;b.lanes=0;yd.current=null===a||null===a.memoizedState?lk:mk;a=c(d,e);if(zc){f=0;do{zc=!1;Ac=0;if(25<=f)throw Error(m(301));f+=1;N=K=null;b.updateQueue=null;
yd.current=nk;a=c(d,e)}while(zc)}yd.current=zd;b=null!==K&&null!==K.next;vb=0;N=K=C=null;Ad=!1;if(b)throw Error(m(300));return a}function nf(){var a=0!==Ac;Ac=0;return a}function Fa(){var a={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};null===N?C.memoizedState=N=a:N=N.next=a;return N}function sa(){if(null===K){var a=C.alternate;a=null!==a?a.memoizedState:null}else a=K.next;var b=null===N?C.memoizedState:N.next;if(null!==b)N=b,K=a;else{if(null===a)throw Error(m(310));K=a;
a={memoizedState:K.memoizedState,baseState:K.baseState,baseQueue:K.baseQueue,queue:K.queue,next:null};null===N?C.memoizedState=N=a:N=N.next=a}return N}function Bc(a,b){return"function"===typeof b?b(a):b}function of(a,b,c){b=sa();c=b.queue;if(null===c)throw Error(m(311));c.lastRenderedReducer=a;var d=K,e=d.baseQueue,f=c.pending;if(null!==f){if(null!==e){var g=e.next;e.next=f.next;f.next=g}d.baseQueue=e=f;c.pending=null}if(null!==e){f=e.next;d=d.baseState;var h=g=null,k=null,n=f;do{var l=n.lane;if((vb&
l)===l)null!==k&&(k=k.next={lane:0,action:n.action,hasEagerState:n.hasEagerState,eagerState:n.eagerState,next:null}),d=n.hasEagerState?n.eagerState:a(d,n.action);else{var u={lane:l,action:n.action,hasEagerState:n.hasEagerState,eagerState:n.eagerState,next:null};null===k?(h=k=u,g=d):k=k.next=u;C.lanes|=l;ra|=l}n=n.next}while(null!==n&&n!==f);null===k?g=d:k.next=h;ua(d,b.memoizedState)||(ha=!0);b.memoizedState=d;b.baseState=g;b.baseQueue=k;c.lastRenderedState=d}a=c.interleaved;if(null!==a){e=a;do f=
e.lane,C.lanes|=f,ra|=f,e=e.next;while(e!==a)}else null===e&&(c.lanes=0);return[b.memoizedState,c.dispatch]}function pf(a,b,c){b=sa();c=b.queue;if(null===c)throw Error(m(311));c.lastRenderedReducer=a;var d=c.dispatch,e=c.pending,f=b.memoizedState;if(null!==e){c.pending=null;var g=e=e.next;do f=a(f,g.action),g=g.next;while(g!==e);ua(f,b.memoizedState)||(ha=!0);b.memoizedState=f;null===b.baseQueue&&(b.baseState=f);c.lastRenderedState=f}return[f,d]}function Jh(a,b,c){}function Kh(a,b,c){c=C;var d=sa(),
e=b(),f=!ua(d.memoizedState,e);f&&(d.memoizedState=e,ha=!0);d=d.queue;qf(Lh.bind(null,c,d,a),[a]);if(d.getSnapshot!==b||f||null!==N&&N.memoizedState.tag&1){c.flags|=2048;Cc(9,Mh.bind(null,c,d,e,b),void 0,null);if(null===O)throw Error(m(349));0!==(vb&30)||Nh(c,b,e)}return e}function Nh(a,b,c){a.flags|=16384;a={getSnapshot:b,value:c};b=C.updateQueue;null===b?(b={lastEffect:null,stores:null},C.updateQueue=b,b.stores=[a]):(c=b.stores,null===c?b.stores=[a]:c.push(a))}function Mh(a,b,c,d){b.value=c;b.getSnapshot=
d;Oh(b)&&Ph(a)}function Lh(a,b,c){return c(function(){Oh(b)&&Ph(a)})}function Oh(a){var b=a.getSnapshot;a=a.value;try{var c=b();return!ua(a,c)}catch(d){return!0}}function Ph(a){var b=Oa(a,1);null!==b&&xa(b,a,1,-1)}function Qh(a){var b=Fa();"function"===typeof a&&(a=a());b.memoizedState=b.baseState=a;a={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Bc,lastRenderedState:a};b.queue=a;a=a.dispatch=ok.bind(null,C,a);return[b.memoizedState,a]}function Cc(a,b,c,d){a={tag:a,create:b,
destroy:c,deps:d,next:null};b=C.updateQueue;null===b?(b={lastEffect:null,stores:null},C.updateQueue=b,b.lastEffect=a.next=a):(c=b.lastEffect,null===c?b.lastEffect=a.next=a:(d=c.next,c.next=a,a.next=d,b.lastEffect=a));return a}function Rh(a){return sa().memoizedState}function Bd(a,b,c,d){var e=Fa();C.flags|=a;e.memoizedState=Cc(1|b,c,void 0,void 0===d?null:d)}function Cd(a,b,c,d){var e=sa();d=void 0===d?null:d;var f=void 0;if(null!==K){var g=K.memoizedState;f=g.destroy;if(null!==d&&lf(d,g.deps)){e.memoizedState=
Cc(b,c,f,d);return}}C.flags|=a;e.memoizedState=Cc(1|b,c,f,d)}function Sh(a,b){return Bd(8390656,8,a,b)}function qf(a,b){return Cd(2048,8,a,b)}function Th(a,b){return Cd(4,2,a,b)}function Uh(a,b){return Cd(4,4,a,b)}function Vh(a,b){if("function"===typeof b)return a=a(),b(a),function(){b(null)};if(null!==b&&void 0!==b)return a=a(),b.current=a,function(){b.current=null}}function Wh(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return Cd(4,4,Vh.bind(null,b,a),c)}function rf(a,b){}function Xh(a,b){var c=
sa();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&lf(b,d[1]))return d[0];c.memoizedState=[a,b];return a}function Yh(a,b){var c=sa();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&lf(b,d[1]))return d[0];a=a();c.memoizedState=[a,b];return a}function Zh(a,b,c){if(0===(vb&21))return a.baseState&&(a.baseState=!1,ha=!0),a.memoizedState=c;ua(c,b)||(c=Dg(),C.lanes|=c,ra|=c,a.baseState=!0);return b}function pk(a,b,c){c=z;z=0!==c&&4>c?c:4;a(!0);var d=sf.transition;sf.transition=
{};try{a(!1),b()}finally{z=c,sf.transition=d}}function $h(){return sa().memoizedState}function qk(a,b,c){var d=hb(a);c={lane:d,action:c,hasEagerState:!1,eagerState:null,next:null};if(ai(a))bi(b,c);else if(c=Eh(a,b,c,d),null!==c){var e=Z();xa(c,a,d,e);ci(c,b,d)}}function ok(a,b,c){var d=hb(a),e={lane:d,action:c,hasEagerState:!1,eagerState:null,next:null};if(ai(a))bi(b,e);else{var f=a.alternate;if(0===a.lanes&&(null===f||0===f.lanes)&&(f=b.lastRenderedReducer,null!==f))try{var g=b.lastRenderedState,
h=f(g,c);e.hasEagerState=!0;e.eagerState=h;if(ua(h,g)){var k=b.interleaved;null===k?(e.next=e,ef(b)):(e.next=k.next,k.next=e);b.interleaved=e;return}}catch(n){}finally{}c=Eh(a,b,e,d);null!==c&&(e=Z(),xa(c,a,d,e),ci(c,b,d))}}function ai(a){var b=a.alternate;return a===C||null!==b&&b===C}function bi(a,b){zc=Ad=!0;var c=a.pending;null===c?b.next=b:(b.next=c.next,c.next=b);a.pending=b}function ci(a,b,c){if(0!==(c&4194240)){var d=b.lanes;d&=a.pendingLanes;c|=d;b.lanes=c;xe(a,c)}}function ya(a,b){if(a&&
a.defaultProps){b=E({},b);a=a.defaultProps;for(var c in a)void 0===b[c]&&(b[c]=a[c]);return b}return b}function tf(a,b,c,d){b=a.memoizedState;c=c(d,b);c=null===c||void 0===c?b:E({},b,c);a.memoizedState=c;0===a.lanes&&(a.updateQueue.baseState=c)}function di(a,b,c,d,e,f,g){a=a.stateNode;return"function"===typeof a.shouldComponentUpdate?a.shouldComponentUpdate(d,f,g):b.prototype&&b.prototype.isPureReactComponent?!qc(c,d)||!qc(e,f):!0}function ei(a,b,c){var d=!1,e=cb;var f=b.contextType;"object"===typeof f&&
null!==f?f=qa(f):(e=ea(b)?pb:J.current,d=b.contextTypes,f=(d=null!==d&&void 0!==d)?Nb(a,e):cb);b=new b(c,f);a.memoizedState=null!==b.state&&void 0!==b.state?b.state:null;b.updater=Dd;a.stateNode=b;b._reactInternals=a;d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=e,a.__reactInternalMemoizedMaskedChildContext=f);return b}function fi(a,b,c,d){a=b.state;"function"===typeof b.componentWillReceiveProps&&b.componentWillReceiveProps(c,d);"function"===typeof b.UNSAFE_componentWillReceiveProps&&
b.UNSAFE_componentWillReceiveProps(c,d);b.state!==a&&Dd.enqueueReplaceState(b,b.state,null)}function uf(a,b,c,d){var e=a.stateNode;e.props=c;e.state=a.memoizedState;e.refs={};ff(a);var f=b.contextType;"object"===typeof f&&null!==f?e.context=qa(f):(f=ea(b)?pb:J.current,e.context=Nb(a,f));e.state=a.memoizedState;f=b.getDerivedStateFromProps;"function"===typeof f&&(tf(a,b,f,c),e.state=a.memoizedState);"function"===typeof b.getDerivedStateFromProps||"function"===typeof e.getSnapshotBeforeUpdate||"function"!==
typeof e.UNSAFE_componentWillMount&&"function"!==typeof e.componentWillMount||(b=e.state,"function"===typeof e.componentWillMount&&e.componentWillMount(),"function"===typeof e.UNSAFE_componentWillMount&&e.UNSAFE_componentWillMount(),b!==e.state&&Dd.enqueueReplaceState(e,e.state,null),wd(a,c,e,d),e.state=a.memoizedState);"function"===typeof e.componentDidMount&&(a.flags|=4194308)}function Ub(a,b){try{var c="",d=b;do c+=fj(d),d=d.return;while(d);var e=c}catch(f){e="\nError generating stack: "+f.message+
"\n"+f.stack}return{value:a,source:b,stack:e,digest:null}}function vf(a,b,c){return{value:a,source:null,stack:null!=c?c:null,digest:null!=b?b:null}}function wf(a,b){try{console.error(b.value)}catch(c){setTimeout(function(){throw c;})}}function gi(a,b,c){c=Pa(-1,c);c.tag=3;c.payload={element:null};var d=b.value;c.callback=function(){Ed||(Ed=!0,xf=d);wf(a,b)};return c}function hi(a,b,c){c=Pa(-1,c);c.tag=3;var d=a.type.getDerivedStateFromError;if("function"===typeof d){var e=b.value;c.payload=function(){return d(e)};
c.callback=function(){wf(a,b)}}var f=a.stateNode;null!==f&&"function"===typeof f.componentDidCatch&&(c.callback=function(){wf(a,b);"function"!==typeof d&&(null===ib?ib=new Set([this]):ib.add(this));var c=b.stack;this.componentDidCatch(b.value,{componentStack:null!==c?c:""})});return c}function ii(a,b,c){var d=a.pingCache;if(null===d){d=a.pingCache=new rk;var e=new Set;d.set(b,e)}else e=d.get(b),void 0===e&&(e=new Set,d.set(b,e));e.has(c)||(e.add(c),a=sk.bind(null,a,b,c),b.then(a,a))}function ji(a){do{var b;
if(b=13===a.tag)b=a.memoizedState,b=null!==b?null!==b.dehydrated?!0:!1:!0;if(b)return a;a=a.return}while(null!==a);return null}function ki(a,b,c,d,e){if(0===(a.mode&1))return a===b?a.flags|=65536:(a.flags|=128,c.flags|=131072,c.flags&=-52805,1===c.tag&&(null===c.alternate?c.tag=17:(b=Pa(-1,1),b.tag=2,fb(c,b,1))),c.lanes|=1),a;a.flags|=65536;a.lanes=e;return a}function aa(a,b,c,d){b.child=null===a?li(b,null,c,d):Vb(b,a.child,c,d)}function mi(a,b,c,d,e){c=c.render;var f=b.ref;Sb(b,e);d=mf(a,b,c,d,f,
e);c=nf();if(null!==a&&!ha)return b.updateQueue=a.updateQueue,b.flags&=-2053,a.lanes&=~e,Qa(a,b,e);D&&c&&Ue(b);b.flags|=1;aa(a,b,d,e);return b.child}function ni(a,b,c,d,e){if(null===a){var f=c.type;if("function"===typeof f&&!yf(f)&&void 0===f.defaultProps&&null===c.compare&&void 0===c.defaultProps)return b.tag=15,b.type=f,oi(a,b,f,d,e);a=rd(c.type,null,d,b,b.mode,e);a.ref=b.ref;a.return=b;return b.child=a}f=a.child;if(0===(a.lanes&e)){var g=f.memoizedProps;c=c.compare;c=null!==c?c:qc;if(c(g,d)&&a.ref===
b.ref)return Qa(a,b,e)}b.flags|=1;a=eb(f,d);a.ref=b.ref;a.return=b;return b.child=a}function oi(a,b,c,d,e){if(null!==a){var f=a.memoizedProps;if(qc(f,d)&&a.ref===b.ref)if(ha=!1,b.pendingProps=d=f,0!==(a.lanes&e))0!==(a.flags&131072)&&(ha=!0);else return b.lanes=a.lanes,Qa(a,b,e)}return zf(a,b,c,d,e)}function pi(a,b,c){var d=b.pendingProps,e=d.children,f=null!==a?a.memoizedState:null;if("hidden"===d.mode)if(0===(b.mode&1))b.memoizedState={baseLanes:0,cachePool:null,transitions:null},y(Ga,ba),ba|=c;
else{if(0===(c&1073741824))return a=null!==f?f.baseLanes|c:c,b.lanes=b.childLanes=1073741824,b.memoizedState={baseLanes:a,cachePool:null,transitions:null},b.updateQueue=null,y(Ga,ba),ba|=a,null;b.memoizedState={baseLanes:0,cachePool:null,transitions:null};d=null!==f?f.baseLanes:c;y(Ga,ba);ba|=d}else null!==f?(d=f.baseLanes|c,b.memoizedState=null):d=c,y(Ga,ba),ba|=d;aa(a,b,e,c);return b.child}function qi(a,b){var c=b.ref;if(null===a&&null!==c||null!==a&&a.ref!==c)b.flags|=512,b.flags|=2097152}function zf(a,
b,c,d,e){var f=ea(c)?pb:J.current;f=Nb(b,f);Sb(b,e);c=mf(a,b,c,d,f,e);d=nf();if(null!==a&&!ha)return b.updateQueue=a.updateQueue,b.flags&=-2053,a.lanes&=~e,Qa(a,b,e);D&&d&&Ue(b);b.flags|=1;aa(a,b,c,e);return b.child}function ri(a,b,c,d,e){if(ea(c)){var f=!0;ld(b)}else f=!1;Sb(b,e);if(null===b.stateNode)Fd(a,b),ei(b,c,d),uf(b,c,d,e),d=!0;else if(null===a){var g=b.stateNode,h=b.memoizedProps;g.props=h;var k=g.context,n=c.contextType;"object"===typeof n&&null!==n?n=qa(n):(n=ea(c)?pb:J.current,n=Nb(b,
n));var l=c.getDerivedStateFromProps,m="function"===typeof l||"function"===typeof g.getSnapshotBeforeUpdate;m||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||(h!==d||k!==n)&&fi(b,g,d,n);gb=!1;var r=b.memoizedState;g.state=r;wd(b,d,g,e);k=b.memoizedState;h!==d||r!==k||S.current||gb?("function"===typeof l&&(tf(b,c,l,d),k=b.memoizedState),(h=gb||di(b,c,h,d,r,k,n))?(m||"function"!==typeof g.UNSAFE_componentWillMount&&"function"!==typeof g.componentWillMount||
("function"===typeof g.componentWillMount&&g.componentWillMount(),"function"===typeof g.UNSAFE_componentWillMount&&g.UNSAFE_componentWillMount()),"function"===typeof g.componentDidMount&&(b.flags|=4194308)):("function"===typeof g.componentDidMount&&(b.flags|=4194308),b.memoizedProps=d,b.memoizedState=k),g.props=d,g.state=k,g.context=n,d=h):("function"===typeof g.componentDidMount&&(b.flags|=4194308),d=!1)}else{g=b.stateNode;Fh(a,b);h=b.memoizedProps;n=b.type===b.elementType?h:ya(b.type,h);g.props=
n;m=b.pendingProps;r=g.context;k=c.contextType;"object"===typeof k&&null!==k?k=qa(k):(k=ea(c)?pb:J.current,k=Nb(b,k));var p=c.getDerivedStateFromProps;(l="function"===typeof p||"function"===typeof g.getSnapshotBeforeUpdate)||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||(h!==m||r!==k)&&fi(b,g,d,k);gb=!1;r=b.memoizedState;g.state=r;wd(b,d,g,e);var x=b.memoizedState;h!==m||r!==x||S.current||gb?("function"===typeof p&&(tf(b,c,p,d),x=b.memoizedState),
(n=gb||di(b,c,n,d,r,x,k)||!1)?(l||"function"!==typeof g.UNSAFE_componentWillUpdate&&"function"!==typeof g.componentWillUpdate||("function"===typeof g.componentWillUpdate&&g.componentWillUpdate(d,x,k),"function"===typeof g.UNSAFE_componentWillUpdate&&g.UNSAFE_componentWillUpdate(d,x,k)),"function"===typeof g.componentDidUpdate&&(b.flags|=4),"function"===typeof g.getSnapshotBeforeUpdate&&(b.flags|=1024)):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=
4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=1024),b.memoizedProps=d,b.memoizedState=x),g.props=d,g.state=x,g.context=k,d=n):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=1024),d=!1)}return Af(a,b,c,d,f,e)}function Af(a,b,c,d,e,f){qi(a,b);var g=0!==(b.flags&128);if(!d&&!g)return e&&vh(b,c,!1),
Qa(a,b,f);d=b.stateNode;tk.current=b;var h=g&&"function"!==typeof c.getDerivedStateFromError?null:d.render();b.flags|=1;null!==a&&g?(b.child=Vb(b,a.child,null,f),b.child=Vb(b,null,h,f)):aa(a,b,h,f);b.memoizedState=d.state;e&&vh(b,c,!0);return b.child}function si(a){var b=a.stateNode;b.pendingContext?th(a,b.pendingContext,b.pendingContext!==b.context):b.context&&th(a,b.context,!1);gf(a,b.containerInfo)}function ti(a,b,c,d,e){Qb();Ye(e);b.flags|=256;aa(a,b,c,d);return b.child}function Bf(a){return{baseLanes:a,
cachePool:null,transitions:null}}function ui(a,b,c){var d=b.pendingProps,e=F.current,f=!1,g=0!==(b.flags&128),h;(h=g)||(h=null!==a&&null===a.memoizedState?!1:0!==(e&2));if(h)f=!0,b.flags&=-129;else if(null===a||null!==a.memoizedState)e|=1;y(F,e&1);if(null===a){Xe(b);a=b.memoizedState;if(null!==a&&(a=a.dehydrated,null!==a))return 0===(b.mode&1)?b.lanes=1:"$!"===a.data?b.lanes=8:b.lanes=1073741824,null;g=d.children;a=d.fallback;return f?(d=b.mode,f=b.child,g={mode:"hidden",children:g},0===(d&1)&&null!==
f?(f.childLanes=0,f.pendingProps=g):f=Gd(g,d,0,null),a=sb(a,d,c,null),f.return=b,a.return=b,f.sibling=a,b.child=f,b.child.memoizedState=Bf(c),b.memoizedState=Cf,a):Df(b,g)}e=a.memoizedState;if(null!==e&&(h=e.dehydrated,null!==h))return uk(a,b,g,d,h,e,c);if(f){f=d.fallback;g=b.mode;e=a.child;h=e.sibling;var k={mode:"hidden",children:d.children};0===(g&1)&&b.child!==e?(d=b.child,d.childLanes=0,d.pendingProps=k,b.deletions=null):(d=eb(e,k),d.subtreeFlags=e.subtreeFlags&14680064);null!==h?f=eb(h,f):(f=
sb(f,g,c,null),f.flags|=2);f.return=b;d.return=b;d.sibling=f;b.child=d;d=f;f=b.child;g=a.child.memoizedState;g=null===g?Bf(c):{baseLanes:g.baseLanes|c,cachePool:null,transitions:g.transitions};f.memoizedState=g;f.childLanes=a.childLanes&~c;b.memoizedState=Cf;return d}f=a.child;a=f.sibling;d=eb(f,{mode:"visible",children:d.children});0===(b.mode&1)&&(d.lanes=c);d.return=b;d.sibling=null;null!==a&&(c=b.deletions,null===c?(b.deletions=[a],b.flags|=16):c.push(a));b.child=d;b.memoizedState=null;return d}
function Df(a,b,c){b=Gd({mode:"visible",children:b},a.mode,0,null);b.return=a;return a.child=b}function Hd(a,b,c,d){null!==d&&Ye(d);Vb(b,a.child,null,c);a=Df(b,b.pendingProps.children);a.flags|=2;b.memoizedState=null;return a}function uk(a,b,c,d,e,f,g){if(c){if(b.flags&256)return b.flags&=-257,d=vf(Error(m(422))),Hd(a,b,g,d);if(null!==b.memoizedState)return b.child=a.child,b.flags|=128,null;f=d.fallback;e=b.mode;d=Gd({mode:"visible",children:d.children},e,0,null);f=sb(f,e,g,null);f.flags|=2;d.return=
b;f.return=b;d.sibling=f;b.child=d;0!==(b.mode&1)&&Vb(b,a.child,null,g);b.child.memoizedState=Bf(g);b.memoizedState=Cf;return f}if(0===(b.mode&1))return Hd(a,b,g,null);if("$!"===e.data){d=e.nextSibling&&e.nextSibling.dataset;if(d)var h=d.dgst;d=h;f=Error(m(419));d=vf(f,d,void 0);return Hd(a,b,g,d)}h=0!==(g&a.childLanes);if(ha||h){d=O;if(null!==d){switch(g&-g){case 4:e=2;break;case 16:e=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:e=
32;break;case 536870912:e=268435456;break;default:e=0}e=0!==(e&(d.suspendedLanes|g))?0:e;0!==e&&e!==f.retryLane&&(f.retryLane=e,Oa(a,e),xa(d,a,e,-1))}Ef();d=vf(Error(m(421)));return Hd(a,b,g,d)}if("$?"===e.data)return b.flags|=128,b.child=a.child,b=vk.bind(null,a),e._reactRetry=b,null;a=f.treeContext;fa=Ka(e.nextSibling);la=b;D=!0;wa=null;null!==a&&(na[oa++]=Ma,na[oa++]=Na,na[oa++]=rb,Ma=a.id,Na=a.overflow,rb=b);b=Df(b,d.children);b.flags|=4096;return b}function vi(a,b,c){a.lanes|=b;var d=a.alternate;
null!==d&&(d.lanes|=b);df(a.return,b,c)}function Ff(a,b,c,d,e){var f=a.memoizedState;null===f?a.memoizedState={isBackwards:b,rendering:null,renderingStartTime:0,last:d,tail:c,tailMode:e}:(f.isBackwards=b,f.rendering=null,f.renderingStartTime=0,f.last=d,f.tail=c,f.tailMode=e)}function wi(a,b,c){var d=b.pendingProps,e=d.revealOrder,f=d.tail;aa(a,b,d.children,c);d=F.current;if(0!==(d&2))d=d&1|2,b.flags|=128;else{if(null!==a&&0!==(a.flags&128))a:for(a=b.child;null!==a;){if(13===a.tag)null!==a.memoizedState&&
vi(a,c,b);else if(19===a.tag)vi(a,c,b);else if(null!==a.child){a.child.return=a;a=a.child;continue}if(a===b)break a;for(;null===a.sibling;){if(null===a.return||a.return===b)break a;a=a.return}a.sibling.return=a.return;a=a.sibling}d&=1}y(F,d);if(0===(b.mode&1))b.memoizedState=null;else switch(e){case "forwards":c=b.child;for(e=null;null!==c;)a=c.alternate,null!==a&&null===xd(a)&&(e=c),c=c.sibling;c=e;null===c?(e=b.child,b.child=null):(e=c.sibling,c.sibling=null);Ff(b,!1,e,c,f);break;case "backwards":c=
null;e=b.child;for(b.child=null;null!==e;){a=e.alternate;if(null!==a&&null===xd(a)){b.child=e;break}a=e.sibling;e.sibling=c;c=e;e=a}Ff(b,!0,c,null,f);break;case "together":Ff(b,!1,null,null,void 0);break;default:b.memoizedState=null}return b.child}function Fd(a,b){0===(b.mode&1)&&null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2)}function Qa(a,b,c){null!==a&&(b.dependencies=a.dependencies);ra|=b.lanes;if(0===(c&b.childLanes))return null;if(null!==a&&b.child!==a.child)throw Error(m(153));if(null!==
b.child){a=b.child;c=eb(a,a.pendingProps);b.child=c;for(c.return=b;null!==a.sibling;)a=a.sibling,c=c.sibling=eb(a,a.pendingProps),c.return=b;c.sibling=null}return b.child}function wk(a,b,c){switch(b.tag){case 3:si(b);Qb();break;case 5:Ih(b);break;case 1:ea(b.type)&&ld(b);break;case 4:gf(b,b.stateNode.containerInfo);break;case 10:var d=b.type._context,e=b.memoizedProps.value;y(ud,d._currentValue);d._currentValue=e;break;case 13:d=b.memoizedState;if(null!==d){if(null!==d.dehydrated)return y(F,F.current&
1),b.flags|=128,null;if(0!==(c&b.child.childLanes))return ui(a,b,c);y(F,F.current&1);a=Qa(a,b,c);return null!==a?a.sibling:null}y(F,F.current&1);break;case 19:d=0!==(c&b.childLanes);if(0!==(a.flags&128)){if(d)return wi(a,b,c);b.flags|=128}e=b.memoizedState;null!==e&&(e.rendering=null,e.tail=null,e.lastEffect=null);y(F,F.current);if(d)break;else return null;case 22:case 23:return b.lanes=0,pi(a,b,c)}return Qa(a,b,c)}function Dc(a,b){if(!D)switch(a.tailMode){case "hidden":b=a.tail;for(var c=null;null!==
b;)null!==b.alternate&&(c=b),b=b.sibling;null===c?a.tail=null:c.sibling=null;break;case "collapsed":c=a.tail;for(var d=null;null!==c;)null!==c.alternate&&(d=c),c=c.sibling;null===d?b||null===a.tail?a.tail=null:a.tail.sibling=null:d.sibling=null}}function W(a){var b=null!==a.alternate&&a.alternate.child===a.child,c=0,d=0;if(b)for(var e=a.child;null!==e;)c|=e.lanes|e.childLanes,d|=e.subtreeFlags&14680064,d|=e.flags&14680064,e.return=a,e=e.sibling;else for(e=a.child;null!==e;)c|=e.lanes|e.childLanes,
d|=e.subtreeFlags,d|=e.flags,e.return=a,e=e.sibling;a.subtreeFlags|=d;a.childLanes=c;return b}function xk(a,b,c){var d=b.pendingProps;Ve(b);switch(b.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return W(b),null;case 1:return ea(b.type)&&(v(S),v(J)),W(b),null;case 3:d=b.stateNode;Tb();v(S);v(J);jf();d.pendingContext&&(d.context=d.pendingContext,d.pendingContext=null);if(null===a||null===a.child)pd(b)?b.flags|=4:null===a||a.memoizedState.isDehydrated&&0===(b.flags&
256)||(b.flags|=1024,null!==wa&&(Gf(wa),wa=null));xi(a,b);W(b);return null;case 5:hf(b);var e=ub(xc.current);c=b.type;if(null!==a&&null!=b.stateNode)yk(a,b,c,d,e),a.ref!==b.ref&&(b.flags|=512,b.flags|=2097152);else{if(!d){if(null===b.stateNode)throw Error(m(166));W(b);return null}a=ub(Ea.current);if(pd(b)){d=b.stateNode;c=b.type;var f=b.memoizedProps;d[Da]=b;d[uc]=f;a=0!==(b.mode&1);switch(c){case "dialog":B("cancel",d);B("close",d);break;case "iframe":case "object":case "embed":B("load",d);break;
case "video":case "audio":for(e=0;e<Ec.length;e++)B(Ec[e],d);break;case "source":B("error",d);break;case "img":case "image":case "link":B("error",d);B("load",d);break;case "details":B("toggle",d);break;case "input":kg(d,f);B("invalid",d);break;case "select":d._wrapperState={wasMultiple:!!f.multiple};B("invalid",d);break;case "textarea":ng(d,f),B("invalid",d)}pe(c,f);e=null;for(var g in f)if(f.hasOwnProperty(g)){var h=f[g];"children"===g?"string"===typeof h?d.textContent!==h&&(!0!==f.suppressHydrationWarning&&
jd(d.textContent,h,a),e=["children",h]):"number"===typeof h&&d.textContent!==""+h&&(!0!==f.suppressHydrationWarning&&jd(d.textContent,h,a),e=["children",""+h]):$b.hasOwnProperty(g)&&null!=h&&"onScroll"===g&&B("scroll",d)}switch(c){case "input":Pc(d);mg(d,f,!0);break;case "textarea":Pc(d);pg(d);break;case "select":case "option":break;default:"function"===typeof f.onClick&&(d.onclick=kd)}d=e;b.updateQueue=d;null!==d&&(b.flags|=4)}else{g=9===e.nodeType?e:e.ownerDocument;"http://www.w3.org/1999/xhtml"===
a&&(a=qg(c));"http://www.w3.org/1999/xhtml"===a?"script"===c?(a=g.createElement("div"),a.innerHTML="<script>\x3c/script>",a=a.removeChild(a.firstChild)):"string"===typeof d.is?a=g.createElement(c,{is:d.is}):(a=g.createElement(c),"select"===c&&(g=a,d.multiple?g.multiple=!0:d.size&&(g.size=d.size))):a=g.createElementNS(a,c);a[Da]=b;a[uc]=d;zk(a,b,!1,!1);b.stateNode=a;a:{g=qe(c,d);switch(c){case "dialog":B("cancel",a);B("close",a);e=d;break;case "iframe":case "object":case "embed":B("load",a);e=d;break;
case "video":case "audio":for(e=0;e<Ec.length;e++)B(Ec[e],a);e=d;break;case "source":B("error",a);e=d;break;case "img":case "image":case "link":B("error",a);B("load",a);e=d;break;case "details":B("toggle",a);e=d;break;case "input":kg(a,d);e=ke(a,d);B("invalid",a);break;case "option":e=d;break;case "select":a._wrapperState={wasMultiple:!!d.multiple};e=E({},d,{value:void 0});B("invalid",a);break;case "textarea":ng(a,d);e=ne(a,d);B("invalid",a);break;default:e=d}pe(c,e);h=e;for(f in h)if(h.hasOwnProperty(f)){var k=
h[f];"style"===f?sg(a,k):"dangerouslySetInnerHTML"===f?(k=k?k.__html:void 0,null!=k&&yi(a,k)):"children"===f?"string"===typeof k?("textarea"!==c||""!==k)&&Fc(a,k):"number"===typeof k&&Fc(a,""+k):"suppressContentEditableWarning"!==f&&"suppressHydrationWarning"!==f&&"autoFocus"!==f&&($b.hasOwnProperty(f)?null!=k&&"onScroll"===f&&B("scroll",a):null!=k&&$d(a,f,k,g))}switch(c){case "input":Pc(a);mg(a,d,!1);break;case "textarea":Pc(a);pg(a);break;case "option":null!=d.value&&a.setAttribute("value",""+Ua(d.value));
break;case "select":a.multiple=!!d.multiple;f=d.value;null!=f?Db(a,!!d.multiple,f,!1):null!=d.defaultValue&&Db(a,!!d.multiple,d.defaultValue,!0);break;default:"function"===typeof e.onClick&&(a.onclick=kd)}switch(c){case "button":case "input":case "select":case "textarea":d=!!d.autoFocus;break a;case "img":d=!0;break a;default:d=!1}}d&&(b.flags|=4)}null!==b.ref&&(b.flags|=512,b.flags|=2097152)}W(b);return null;case 6:if(a&&null!=b.stateNode)Ak(a,b,a.memoizedProps,d);else{if("string"!==typeof d&&null===
b.stateNode)throw Error(m(166));c=ub(xc.current);ub(Ea.current);if(pd(b)){d=b.stateNode;c=b.memoizedProps;d[Da]=b;if(f=d.nodeValue!==c)if(a=la,null!==a)switch(a.tag){case 3:jd(d.nodeValue,c,0!==(a.mode&1));break;case 5:!0!==a.memoizedProps.suppressHydrationWarning&&jd(d.nodeValue,c,0!==(a.mode&1))}f&&(b.flags|=4)}else d=(9===c.nodeType?c:c.ownerDocument).createTextNode(d),d[Da]=b,b.stateNode=d}W(b);return null;case 13:v(F);d=b.memoizedState;if(null===a||null!==a.memoizedState&&null!==a.memoizedState.dehydrated){if(D&&
null!==fa&&0!==(b.mode&1)&&0===(b.flags&128)){for(f=fa;f;)f=Ka(f.nextSibling);Qb();b.flags|=98560;f=!1}else if(f=pd(b),null!==d&&null!==d.dehydrated){if(null===a){if(!f)throw Error(m(318));f=b.memoizedState;f=null!==f?f.dehydrated:null;if(!f)throw Error(m(317));f[Da]=b}else Qb(),0===(b.flags&128)&&(b.memoizedState=null),b.flags|=4;W(b);f=!1}else null!==wa&&(Gf(wa),wa=null),f=!0;if(!f)return b.flags&65536?b:null}if(0!==(b.flags&128))return b.lanes=c,b;d=null!==d;d!==(null!==a&&null!==a.memoizedState)&&
d&&(b.child.flags|=8192,0!==(b.mode&1)&&(null===a||0!==(F.current&1)?0===L&&(L=3):Ef()));null!==b.updateQueue&&(b.flags|=4);W(b);return null;case 4:return Tb(),xi(a,b),null===a&&sc(b.stateNode.containerInfo),W(b),null;case 10:return cf(b.type._context),W(b),null;case 17:return ea(b.type)&&(v(S),v(J)),W(b),null;case 19:v(F);f=b.memoizedState;if(null===f)return W(b),null;d=0!==(b.flags&128);g=f.rendering;if(null===g)if(d)Dc(f,!1);else{if(0!==L||null!==a&&0!==(a.flags&128))for(a=b.child;null!==a;){g=
xd(a);if(null!==g){b.flags|=128;Dc(f,!1);d=g.updateQueue;null!==d&&(b.updateQueue=d,b.flags|=4);b.subtreeFlags=0;d=c;for(c=b.child;null!==c;)f=c,a=d,f.flags&=14680066,g=f.alternate,null===g?(f.childLanes=0,f.lanes=a,f.child=null,f.subtreeFlags=0,f.memoizedProps=null,f.memoizedState=null,f.updateQueue=null,f.dependencies=null,f.stateNode=null):(f.childLanes=g.childLanes,f.lanes=g.lanes,f.child=g.child,f.subtreeFlags=0,f.deletions=null,f.memoizedProps=g.memoizedProps,f.memoizedState=g.memoizedState,
f.updateQueue=g.updateQueue,f.type=g.type,a=g.dependencies,f.dependencies=null===a?null:{lanes:a.lanes,firstContext:a.firstContext}),c=c.sibling;y(F,F.current&1|2);return b.child}a=a.sibling}null!==f.tail&&P()>Hf&&(b.flags|=128,d=!0,Dc(f,!1),b.lanes=4194304)}else{if(!d)if(a=xd(g),null!==a){if(b.flags|=128,d=!0,c=a.updateQueue,null!==c&&(b.updateQueue=c,b.flags|=4),Dc(f,!0),null===f.tail&&"hidden"===f.tailMode&&!g.alternate&&!D)return W(b),null}else 2*P()-f.renderingStartTime>Hf&&1073741824!==c&&(b.flags|=
128,d=!0,Dc(f,!1),b.lanes=4194304);f.isBackwards?(g.sibling=b.child,b.child=g):(c=f.last,null!==c?c.sibling=g:b.child=g,f.last=g)}if(null!==f.tail)return b=f.tail,f.rendering=b,f.tail=b.sibling,f.renderingStartTime=P(),b.sibling=null,c=F.current,y(F,d?c&1|2:c&1),b;W(b);return null;case 22:case 23:return ba=Ga.current,v(Ga),d=null!==b.memoizedState,null!==a&&null!==a.memoizedState!==d&&(b.flags|=8192),d&&0!==(b.mode&1)?0!==(ba&1073741824)&&(W(b),b.subtreeFlags&6&&(b.flags|=8192)):W(b),null;case 24:return null;
case 25:return null}throw Error(m(156,b.tag));}function Bk(a,b,c){Ve(b);switch(b.tag){case 1:return ea(b.type)&&(v(S),v(J)),a=b.flags,a&65536?(b.flags=a&-65537|128,b):null;case 3:return Tb(),v(S),v(J),jf(),a=b.flags,0!==(a&65536)&&0===(a&128)?(b.flags=a&-65537|128,b):null;case 5:return hf(b),null;case 13:v(F);a=b.memoizedState;if(null!==a&&null!==a.dehydrated){if(null===b.alternate)throw Error(m(340));Qb()}a=b.flags;return a&65536?(b.flags=a&-65537|128,b):null;case 19:return v(F),null;case 4:return Tb(),
null;case 10:return cf(b.type._context),null;case 22:case 23:return ba=Ga.current,v(Ga),null;case 24:return null;default:return null}}function Wb(a,b){var c=a.ref;if(null!==c)if("function"===typeof c)try{c(null)}catch(d){G(a,b,d)}else c.current=null}function If(a,b,c){try{c()}catch(d){G(a,b,d)}}function Ck(a,b){Jf=Zc;a=ch();if(Ie(a)){if("selectionStart"in a)var c={start:a.selectionStart,end:a.selectionEnd};else a:{c=(c=a.ownerDocument)&&c.defaultView||window;var d=c.getSelection&&c.getSelection();
if(d&&0!==d.rangeCount){c=d.anchorNode;var e=d.anchorOffset,f=d.focusNode;d=d.focusOffset;try{c.nodeType,f.nodeType}catch(M){c=null;break a}var g=0,h=-1,k=-1,n=0,q=0,u=a,r=null;b:for(;;){for(var p;;){u!==c||0!==e&&3!==u.nodeType||(h=g+e);u!==f||0!==d&&3!==u.nodeType||(k=g+d);3===u.nodeType&&(g+=u.nodeValue.length);if(null===(p=u.firstChild))break;r=u;u=p}for(;;){if(u===a)break b;r===c&&++n===e&&(h=g);r===f&&++q===d&&(k=g);if(null!==(p=u.nextSibling))break;u=r;r=u.parentNode}u=p}c=-1===h||-1===k?null:
{start:h,end:k}}else c=null}c=c||{start:0,end:0}}else c=null;Kf={focusedElem:a,selectionRange:c};Zc=!1;for(l=b;null!==l;)if(b=l,a=b.child,0!==(b.subtreeFlags&1028)&&null!==a)a.return=b,l=a;else for(;null!==l;){b=l;try{var x=b.alternate;if(0!==(b.flags&1024))switch(b.tag){case 0:case 11:case 15:break;case 1:if(null!==x){var v=x.memoizedProps,z=x.memoizedState,w=b.stateNode,A=w.getSnapshotBeforeUpdate(b.elementType===b.type?v:ya(b.type,v),z);w.__reactInternalSnapshotBeforeUpdate=A}break;case 3:var t=
b.stateNode.containerInfo;1===t.nodeType?t.textContent="":9===t.nodeType&&t.documentElement&&t.removeChild(t.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(m(163));}}catch(M){G(b,b.return,M)}a=b.sibling;if(null!==a){a.return=b.return;l=a;break}l=b.return}x=zi;zi=!1;return x}function Gc(a,b,c){var d=b.updateQueue;d=null!==d?d.lastEffect:null;if(null!==d){var e=d=d.next;do{if((e.tag&a)===a){var f=e.destroy;e.destroy=void 0;void 0!==f&&If(b,c,f)}e=e.next}while(e!==d)}}
function Id(a,b){b=b.updateQueue;b=null!==b?b.lastEffect:null;if(null!==b){var c=b=b.next;do{if((c.tag&a)===a){var d=c.create;c.destroy=d()}c=c.next}while(c!==b)}}function Lf(a){var b=a.ref;if(null!==b){var c=a.stateNode;switch(a.tag){case 5:a=c;break;default:a=c}"function"===typeof b?b(a):b.current=a}}function Ai(a){var b=a.alternate;null!==b&&(a.alternate=null,Ai(b));a.child=null;a.deletions=null;a.sibling=null;5===a.tag&&(b=a.stateNode,null!==b&&(delete b[Da],delete b[uc],delete b[Me],delete b[Dk],
delete b[Ek]));a.stateNode=null;a.return=null;a.dependencies=null;a.memoizedProps=null;a.memoizedState=null;a.pendingProps=null;a.stateNode=null;a.updateQueue=null}function Bi(a){return 5===a.tag||3===a.tag||4===a.tag}function Ci(a){a:for(;;){for(;null===a.sibling;){if(null===a.return||Bi(a.return))return null;a=a.return}a.sibling.return=a.return;for(a=a.sibling;5!==a.tag&&6!==a.tag&&18!==a.tag;){if(a.flags&2)continue a;if(null===a.child||4===a.tag)continue a;else a.child.return=a,a=a.child}if(!(a.flags&
2))return a.stateNode}}function Mf(a,b,c){var d=a.tag;if(5===d||6===d)a=a.stateNode,b?8===c.nodeType?c.parentNode.insertBefore(a,b):c.insertBefore(a,b):(8===c.nodeType?(b=c.parentNode,b.insertBefore(a,c)):(b=c,b.appendChild(a)),c=c._reactRootContainer,null!==c&&void 0!==c||null!==b.onclick||(b.onclick=kd));else if(4!==d&&(a=a.child,null!==a))for(Mf(a,b,c),a=a.sibling;null!==a;)Mf(a,b,c),a=a.sibling}function Nf(a,b,c){var d=a.tag;if(5===d||6===d)a=a.stateNode,b?c.insertBefore(a,b):c.appendChild(a);
else if(4!==d&&(a=a.child,null!==a))for(Nf(a,b,c),a=a.sibling;null!==a;)Nf(a,b,c),a=a.sibling}function jb(a,b,c){for(c=c.child;null!==c;)Di(a,b,c),c=c.sibling}function Di(a,b,c){if(Ca&&"function"===typeof Ca.onCommitFiberUnmount)try{Ca.onCommitFiberUnmount(Uc,c)}catch(h){}switch(c.tag){case 5:X||Wb(c,b);case 6:var d=T,e=za;T=null;jb(a,b,c);T=d;za=e;null!==T&&(za?(a=T,c=c.stateNode,8===a.nodeType?a.parentNode.removeChild(c):a.removeChild(c)):T.removeChild(c.stateNode));break;case 18:null!==T&&(za?
(a=T,c=c.stateNode,8===a.nodeType?Re(a.parentNode,c):1===a.nodeType&&Re(a,c),nc(a)):Re(T,c.stateNode));break;case 4:d=T;e=za;T=c.stateNode.containerInfo;za=!0;jb(a,b,c);T=d;za=e;break;case 0:case 11:case 14:case 15:if(!X&&(d=c.updateQueue,null!==d&&(d=d.lastEffect,null!==d))){e=d=d.next;do{var f=e,g=f.destroy;f=f.tag;void 0!==g&&(0!==(f&2)?If(c,b,g):0!==(f&4)&&If(c,b,g));e=e.next}while(e!==d)}jb(a,b,c);break;case 1:if(!X&&(Wb(c,b),d=c.stateNode,"function"===typeof d.componentWillUnmount))try{d.props=
c.memoizedProps,d.state=c.memoizedState,d.componentWillUnmount()}catch(h){G(c,b,h)}jb(a,b,c);break;case 21:jb(a,b,c);break;case 22:c.mode&1?(X=(d=X)||null!==c.memoizedState,jb(a,b,c),X=d):jb(a,b,c);break;default:jb(a,b,c)}}function Ei(a){var b=a.updateQueue;if(null!==b){a.updateQueue=null;var c=a.stateNode;null===c&&(c=a.stateNode=new Fk);b.forEach(function(b){var d=Gk.bind(null,a,b);c.has(b)||(c.add(b),b.then(d,d))})}}function Aa(a,b,c){c=b.deletions;if(null!==c)for(var d=0;d<c.length;d++){var e=
c[d];try{var f=a,g=b,h=g;a:for(;null!==h;){switch(h.tag){case 5:T=h.stateNode;za=!1;break a;case 3:T=h.stateNode.containerInfo;za=!0;break a;case 4:T=h.stateNode.containerInfo;za=!0;break a}h=h.return}if(null===T)throw Error(m(160));Di(f,g,e);T=null;za=!1;var k=e.alternate;null!==k&&(k.return=null);e.return=null}catch(n){G(e,b,n)}}if(b.subtreeFlags&12854)for(b=b.child;null!==b;)Fi(b,a),b=b.sibling}function Fi(a,b,c){var d=a.alternate;c=a.flags;switch(a.tag){case 0:case 11:case 14:case 15:Aa(b,a);
Ha(a);if(c&4){try{Gc(3,a,a.return),Id(3,a)}catch(I){G(a,a.return,I)}try{Gc(5,a,a.return)}catch(I){G(a,a.return,I)}}break;case 1:Aa(b,a);Ha(a);c&512&&null!==d&&Wb(d,d.return);break;case 5:Aa(b,a);Ha(a);c&512&&null!==d&&Wb(d,d.return);if(a.flags&32){var e=a.stateNode;try{Fc(e,"")}catch(I){G(a,a.return,I)}}if(c&4&&(e=a.stateNode,null!=e)){var f=a.memoizedProps,g=null!==d?d.memoizedProps:f,h=a.type,k=a.updateQueue;a.updateQueue=null;if(null!==k)try{"input"===h&&"radio"===f.type&&null!=f.name&&lg(e,f);
qe(h,g);var n=qe(h,f);for(g=0;g<k.length;g+=2){var q=k[g],u=k[g+1];"style"===q?sg(e,u):"dangerouslySetInnerHTML"===q?yi(e,u):"children"===q?Fc(e,u):$d(e,q,u,n)}switch(h){case "input":le(e,f);break;case "textarea":og(e,f);break;case "select":var r=e._wrapperState.wasMultiple;e._wrapperState.wasMultiple=!!f.multiple;var p=f.value;null!=p?Db(e,!!f.multiple,p,!1):r!==!!f.multiple&&(null!=f.defaultValue?Db(e,!!f.multiple,f.defaultValue,!0):Db(e,!!f.multiple,f.multiple?[]:"",!1))}e[uc]=f}catch(I){G(a,a.return,
I)}}break;case 6:Aa(b,a);Ha(a);if(c&4){if(null===a.stateNode)throw Error(m(162));e=a.stateNode;f=a.memoizedProps;try{e.nodeValue=f}catch(I){G(a,a.return,I)}}break;case 3:Aa(b,a);Ha(a);if(c&4&&null!==d&&d.memoizedState.isDehydrated)try{nc(b.containerInfo)}catch(I){G(a,a.return,I)}break;case 4:Aa(b,a);Ha(a);break;case 13:Aa(b,a);Ha(a);e=a.child;e.flags&8192&&(f=null!==e.memoizedState,e.stateNode.isHidden=f,!f||null!==e.alternate&&null!==e.alternate.memoizedState||(Of=P()));c&4&&Ei(a);break;case 22:q=
null!==d&&null!==d.memoizedState;a.mode&1?(X=(n=X)||q,Aa(b,a),X=n):Aa(b,a);Ha(a);if(c&8192){n=null!==a.memoizedState;if((a.stateNode.isHidden=n)&&!q&&0!==(a.mode&1))for(l=a,q=a.child;null!==q;){for(u=l=q;null!==l;){r=l;p=r.child;switch(r.tag){case 0:case 11:case 14:case 15:Gc(4,r,r.return);break;case 1:Wb(r,r.return);var x=r.stateNode;if("function"===typeof x.componentWillUnmount){c=r;b=r.return;try{d=c,x.props=d.memoizedProps,x.state=d.memoizedState,x.componentWillUnmount()}catch(I){G(c,b,I)}}break;
case 5:Wb(r,r.return);break;case 22:if(null!==r.memoizedState){Gi(u);continue}}null!==p?(p.return=r,l=p):Gi(u)}q=q.sibling}a:for(q=null,u=a;;){if(5===u.tag){if(null===q){q=u;try{e=u.stateNode,n?(f=e.style,"function"===typeof f.setProperty?f.setProperty("display","none","important"):f.display="none"):(h=u.stateNode,k=u.memoizedProps.style,g=void 0!==k&&null!==k&&k.hasOwnProperty("display")?k.display:null,h.style.display=rg("display",g))}catch(I){G(a,a.return,I)}}}else if(6===u.tag){if(null===q)try{u.stateNode.nodeValue=
n?"":u.memoizedProps}catch(I){G(a,a.return,I)}}else if((22!==u.tag&&23!==u.tag||null===u.memoizedState||u===a)&&null!==u.child){u.child.return=u;u=u.child;continue}if(u===a)break a;for(;null===u.sibling;){if(null===u.return||u.return===a)break a;q===u&&(q=null);u=u.return}q===u&&(q=null);u.sibling.return=u.return;u=u.sibling}}break;case 19:Aa(b,a);Ha(a);c&4&&Ei(a);break;case 21:break;default:Aa(b,a),Ha(a)}}function Ha(a){var b=a.flags;if(b&2){try{a:{for(var c=a.return;null!==c;){if(Bi(c)){var d=c;
break a}c=c.return}throw Error(m(160));}switch(d.tag){case 5:var e=d.stateNode;d.flags&32&&(Fc(e,""),d.flags&=-33);var f=Ci(a);Nf(a,f,e);break;case 3:case 4:var g=d.stateNode.containerInfo,h=Ci(a);Mf(a,h,g);break;default:throw Error(m(161));}}catch(k){G(a,a.return,k)}a.flags&=-3}b&4096&&(a.flags&=-4097)}function Hk(a,b,c){l=a;Hi(a,b,c)}function Hi(a,b,c){for(var d=0!==(a.mode&1);null!==l;){var e=l,f=e.child;if(22===e.tag&&d){var g=null!==e.memoizedState||Jd;if(!g){var h=e.alternate,k=null!==h&&null!==
h.memoizedState||X;h=Jd;var n=X;Jd=g;if((X=k)&&!n)for(l=e;null!==l;)g=l,k=g.child,22===g.tag&&null!==g.memoizedState?Ii(e):null!==k?(k.return=g,l=k):Ii(e);for(;null!==f;)l=f,Hi(f,b,c),f=f.sibling;l=e;Jd=h;X=n}Ji(a,b,c)}else 0!==(e.subtreeFlags&8772)&&null!==f?(f.return=e,l=f):Ji(a,b,c)}}function Ji(a,b,c){for(;null!==l;){b=l;if(0!==(b.flags&8772)){c=b.alternate;try{if(0!==(b.flags&8772))switch(b.tag){case 0:case 11:case 15:X||Id(5,b);break;case 1:var d=b.stateNode;if(b.flags&4&&!X)if(null===c)d.componentDidMount();
else{var e=b.elementType===b.type?c.memoizedProps:ya(b.type,c.memoizedProps);d.componentDidUpdate(e,c.memoizedState,d.__reactInternalSnapshotBeforeUpdate)}var f=b.updateQueue;null!==f&&Hh(b,f,d);break;case 3:var g=b.updateQueue;if(null!==g){c=null;if(null!==b.child)switch(b.child.tag){case 5:c=b.child.stateNode;break;case 1:c=b.child.stateNode}Hh(b,g,c)}break;case 5:var h=b.stateNode;if(null===c&&b.flags&4){c=h;var k=b.memoizedProps;switch(b.type){case "button":case "input":case "select":case "textarea":k.autoFocus&&
c.focus();break;case "img":k.src&&(c.src=k.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(null===b.memoizedState){var n=b.alternate;if(null!==n){var q=n.memoizedState;if(null!==q){var p=q.dehydrated;null!==p&&nc(p)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(m(163));}X||b.flags&512&&Lf(b)}catch(r){G(b,b.return,r)}}if(b===a){l=null;break}c=b.sibling;if(null!==c){c.return=b.return;l=c;break}l=b.return}}function Gi(a){for(;null!==l;){var b=l;if(b===
a){l=null;break}var c=b.sibling;if(null!==c){c.return=b.return;l=c;break}l=b.return}}function Ii(a){for(;null!==l;){var b=l;try{switch(b.tag){case 0:case 11:case 15:var c=b.return;try{Id(4,b)}catch(k){G(b,c,k)}break;case 1:var d=b.stateNode;if("function"===typeof d.componentDidMount){var e=b.return;try{d.componentDidMount()}catch(k){G(b,e,k)}}var f=b.return;try{Lf(b)}catch(k){G(b,f,k)}break;case 5:var g=b.return;try{Lf(b)}catch(k){G(b,g,k)}}}catch(k){G(b,b.return,k)}if(b===a){l=null;break}var h=b.sibling;
if(null!==h){h.return=b.return;l=h;break}l=b.return}}function Hc(){Hf=P()+500}function Z(){return 0!==(p&6)?P():-1!==Kd?Kd:Kd=P()}function hb(a){if(0===(a.mode&1))return 1;if(0!==(p&2)&&0!==U)return U&-U;if(null!==Ik.transition)return 0===Ld&&(Ld=Dg()),Ld;a=z;if(0!==a)return a;a=window.event;a=void 0===a?16:Lg(a.type);return a}function xa(a,b,c,d){if(50<Ic)throw Ic=0,Pf=null,Error(m(185));ic(a,c,d);if(0===(p&2)||a!==O)a===O&&(0===(p&2)&&(Md|=c),4===L&&kb(a,U)),ia(a,d),1===c&&0===p&&0===(b.mode&1)&&
(Hc(),md&&db())}function ia(a,b){var c=a.callbackNode;tj(a,b);var d=Vc(a,a===O?U:0);if(0===d)null!==c&&Ki(c),a.callbackNode=null,a.callbackPriority=0;else if(b=d&-d,a.callbackPriority!==b){null!=c&&Ki(c);if(1===b)0===a.tag?jk(Li.bind(null,a)):wh(Li.bind(null,a)),Jk(function(){0===(p&6)&&db()}),c=null;else{switch(Eg(d)){case 1:c=De;break;case 4:c=Mg;break;case 16:c=ad;break;case 536870912:c=Ng;break;default:c=ad}c=Mi(c,Ni.bind(null,a))}a.callbackPriority=b;a.callbackNode=c}}function Ni(a,b){Kd=-1;
Ld=0;if(0!==(p&6))throw Error(m(327));var c=a.callbackNode;if(Xb()&&a.callbackNode!==c)return null;var d=Vc(a,a===O?U:0);if(0===d)return null;if(0!==(d&30)||0!==(d&a.expiredLanes)||b)b=Nd(a,d);else{b=d;var e=p;p|=2;var f=Oi();if(O!==a||U!==b)Ra=null,Hc(),wb(a,b);do try{Kk();break}catch(h){Pi(a,h)}while(1);af();Od.current=f;p=e;null!==H?b=0:(O=null,U=0,b=L)}if(0!==b){2===b&&(e=ve(a),0!==e&&(d=e,b=Qf(a,e)));if(1===b)throw c=Jc,wb(a,0),kb(a,d),ia(a,P()),c;if(6===b)kb(a,d);else{e=a.current.alternate;
if(0===(d&30)&&!Lk(e)&&(b=Nd(a,d),2===b&&(f=ve(a),0!==f&&(d=f,b=Qf(a,f))),1===b))throw c=Jc,wb(a,0),kb(a,d),ia(a,P()),c;a.finishedWork=e;a.finishedLanes=d;switch(b){case 0:case 1:throw Error(m(345));case 2:xb(a,ja,Ra);break;case 3:kb(a,d);if((d&130023424)===d&&(b=Of+500-P(),10<b)){if(0!==Vc(a,0))break;e=a.suspendedLanes;if((e&d)!==d){Z();a.pingedLanes|=a.suspendedLanes&e;break}a.timeoutHandle=Rf(xb.bind(null,a,ja,Ra),b);break}xb(a,ja,Ra);break;case 4:kb(a,d);if((d&4194240)===d)break;b=a.eventTimes;
for(e=-1;0<d;){var g=31-ta(d);f=1<<g;g=b[g];g>e&&(e=g);d&=~f}d=e;d=P()-d;d=(120>d?120:480>d?480:1080>d?1080:1920>d?1920:3E3>d?3E3:4320>d?4320:1960*Mk(d/1960))-d;if(10<d){a.timeoutHandle=Rf(xb.bind(null,a,ja,Ra),d);break}xb(a,ja,Ra);break;case 5:xb(a,ja,Ra);break;default:throw Error(m(329));}}}ia(a,P());return a.callbackNode===c?Ni.bind(null,a):null}function Qf(a,b){var c=Kc;a.current.memoizedState.isDehydrated&&(wb(a,b).flags|=256);a=Nd(a,b);2!==a&&(b=ja,ja=c,null!==b&&Gf(b));return a}function Gf(a){null===
ja?ja=a:ja.push.apply(ja,a)}function Lk(a){for(var b=a;;){if(b.flags&16384){var c=b.updateQueue;if(null!==c&&(c=c.stores,null!==c))for(var d=0;d<c.length;d++){var e=c[d],f=e.getSnapshot;e=e.value;try{if(!ua(f(),e))return!1}catch(g){return!1}}}c=b.child;if(b.subtreeFlags&16384&&null!==c)c.return=b,b=c;else{if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return!0;b=b.return}b.sibling.return=b.return;b=b.sibling}}return!0}function kb(a,b){b&=~Sf;b&=~Md;a.suspendedLanes|=b;a.pingedLanes&=
~b;for(a=a.expirationTimes;0<b;){var c=31-ta(b),d=1<<c;a[c]=-1;b&=~d}}function Li(a){if(0!==(p&6))throw Error(m(327));Xb();var b=Vc(a,0);if(0===(b&1))return ia(a,P()),null;var c=Nd(a,b);if(0!==a.tag&&2===c){var d=ve(a);0!==d&&(b=d,c=Qf(a,d))}if(1===c)throw c=Jc,wb(a,0),kb(a,b),ia(a,P()),c;if(6===c)throw Error(m(345));a.finishedWork=a.current.alternate;a.finishedLanes=b;xb(a,ja,Ra);ia(a,P());return null}function Tf(a,b){var c=p;p|=1;try{return a(b)}finally{p=c,0===p&&(Hc(),md&&db())}}function yb(a){null!==
lb&&0===lb.tag&&0===(p&6)&&Xb();var b=p;p|=1;var c=ca.transition,d=z;try{if(ca.transition=null,z=1,a)return a()}finally{z=d,ca.transition=c,p=b,0===(p&6)&&db()}}function wb(a,b){a.finishedWork=null;a.finishedLanes=0;var c=a.timeoutHandle;-1!==c&&(a.timeoutHandle=-1,Nk(c));if(null!==H)for(c=H.return;null!==c;){var d=c;Ve(d);switch(d.tag){case 1:d=d.type.childContextTypes;null!==d&&void 0!==d&&(v(S),v(J));break;case 3:Tb();v(S);v(J);jf();break;case 5:hf(d);break;case 4:Tb();break;case 13:v(F);break;
case 19:v(F);break;case 10:cf(d.type._context);break;case 22:case 23:ba=Ga.current,v(Ga)}c=c.return}O=a;H=a=eb(a.current,null);U=ba=b;L=0;Jc=null;Sf=Md=ra=0;ja=Kc=null;if(null!==tb){for(b=0;b<tb.length;b++)if(c=tb[b],d=c.interleaved,null!==d){c.interleaved=null;var e=d.next,f=c.pending;if(null!==f){var g=f.next;f.next=e;d.next=g}c.pending=d}tb=null}return a}function Pi(a,b){do{var c=H;try{af();yd.current=zd;if(Ad){for(var d=C.memoizedState;null!==d;){var e=d.queue;null!==e&&(e.pending=null);d=d.next}Ad=
!1}vb=0;N=K=C=null;zc=!1;Ac=0;Uf.current=null;if(null===c||null===c.return){L=1;Jc=b;H=null;break}a:{var f=a,g=c.return,h=c,k=b;b=U;h.flags|=32768;if(null!==k&&"object"===typeof k&&"function"===typeof k.then){var n=k,l=h,p=l.tag;if(0===(l.mode&1)&&(0===p||11===p||15===p)){var r=l.alternate;r?(l.updateQueue=r.updateQueue,l.memoizedState=r.memoizedState,l.lanes=r.lanes):(l.updateQueue=null,l.memoizedState=null)}var v=ji(g);if(null!==v){v.flags&=-257;ki(v,g,h,f,b);v.mode&1&&ii(f,n,b);b=v;k=n;var x=b.updateQueue;
if(null===x){var z=new Set;z.add(k);b.updateQueue=z}else x.add(k);break a}else{if(0===(b&1)){ii(f,n,b);Ef();break a}k=Error(m(426))}}else if(D&&h.mode&1){var y=ji(g);if(null!==y){0===(y.flags&65536)&&(y.flags|=256);ki(y,g,h,f,b);Ye(Ub(k,h));break a}}f=k=Ub(k,h);4!==L&&(L=2);null===Kc?Kc=[f]:Kc.push(f);f=g;do{switch(f.tag){case 3:f.flags|=65536;b&=-b;f.lanes|=b;var w=gi(f,k,b);Gh(f,w);break a;case 1:h=k;var A=f.type,t=f.stateNode;if(0===(f.flags&128)&&("function"===typeof A.getDerivedStateFromError||
null!==t&&"function"===typeof t.componentDidCatch&&(null===ib||!ib.has(t)))){f.flags|=65536;b&=-b;f.lanes|=b;var B=hi(f,h,b);Gh(f,B);break a}}f=f.return}while(null!==f)}Qi(c)}catch(ma){b=ma;H===c&&null!==c&&(H=c=c.return);continue}break}while(1)}function Oi(){var a=Od.current;Od.current=zd;return null===a?zd:a}function Ef(){if(0===L||3===L||2===L)L=4;null===O||0===(ra&268435455)&&0===(Md&268435455)||kb(O,U)}function Nd(a,b){var c=p;p|=2;var d=Oi();if(O!==a||U!==b)Ra=null,wb(a,b);do try{Ok();break}catch(e){Pi(a,
e)}while(1);af();p=c;Od.current=d;if(null!==H)throw Error(m(261));O=null;U=0;return L}function Ok(){for(;null!==H;)Ri(H)}function Kk(){for(;null!==H&&!Pk();)Ri(H)}function Ri(a){var b=Qk(a.alternate,a,ba);a.memoizedProps=a.pendingProps;null===b?Qi(a):H=b;Uf.current=null}function Qi(a){var b=a;do{var c=b.alternate;a=b.return;if(0===(b.flags&32768)){if(c=xk(c,b,ba),null!==c){H=c;return}}else{c=Bk(c,b);if(null!==c){c.flags&=32767;H=c;return}if(null!==a)a.flags|=32768,a.subtreeFlags=0,a.deletions=null;
else{L=6;H=null;return}}b=b.sibling;if(null!==b){H=b;return}H=b=a}while(null!==b);0===L&&(L=5)}function xb(a,b,c){var d=z,e=ca.transition;try{ca.transition=null,z=1,Rk(a,b,c,d)}finally{ca.transition=e,z=d}return null}function Rk(a,b,c,d){do Xb();while(null!==lb);if(0!==(p&6))throw Error(m(327));c=a.finishedWork;var e=a.finishedLanes;if(null===c)return null;a.finishedWork=null;a.finishedLanes=0;if(c===a.current)throw Error(m(177));a.callbackNode=null;a.callbackPriority=0;var f=c.lanes|c.childLanes;
uj(a,f);a===O&&(H=O=null,U=0);0===(c.subtreeFlags&2064)&&0===(c.flags&2064)||Pd||(Pd=!0,Mi(ad,function(){Xb();return null}));f=0!==(c.flags&15990);if(0!==(c.subtreeFlags&15990)||f){f=ca.transition;ca.transition=null;var g=z;z=1;var h=p;p|=4;Uf.current=null;Ck(a,c);Fi(c,a);Tj(Kf);Zc=!!Jf;Kf=Jf=null;a.current=c;Hk(c,a,e);Sk();p=h;z=g;ca.transition=f}else a.current=c;Pd&&(Pd=!1,lb=a,Qd=e);f=a.pendingLanes;0===f&&(ib=null);oj(c.stateNode,d);ia(a,P());if(null!==b)for(d=a.onRecoverableError,c=0;c<b.length;c++)e=
b[c],d(e.value,{componentStack:e.stack,digest:e.digest});if(Ed)throw Ed=!1,a=xf,xf=null,a;0!==(Qd&1)&&0!==a.tag&&Xb();f=a.pendingLanes;0!==(f&1)?a===Pf?Ic++:(Ic=0,Pf=a):Ic=0;db();return null}function Xb(){if(null!==lb){var a=Eg(Qd),b=ca.transition,c=z;try{ca.transition=null;z=16>a?16:a;if(null===lb)var d=!1;else{a=lb;lb=null;Qd=0;if(0!==(p&6))throw Error(m(331));var e=p;p|=4;for(l=a.current;null!==l;){var f=l,g=f.child;if(0!==(l.flags&16)){var h=f.deletions;if(null!==h){for(var k=0;k<h.length;k++){var n=
h[k];for(l=n;null!==l;){var q=l;switch(q.tag){case 0:case 11:case 15:Gc(8,q,f)}var u=q.child;if(null!==u)u.return=q,l=u;else for(;null!==l;){q=l;var r=q.sibling,v=q.return;Ai(q);if(q===n){l=null;break}if(null!==r){r.return=v;l=r;break}l=v}}}var x=f.alternate;if(null!==x){var y=x.child;if(null!==y){x.child=null;do{var C=y.sibling;y.sibling=null;y=C}while(null!==y)}}l=f}}if(0!==(f.subtreeFlags&2064)&&null!==g)g.return=f,l=g;else b:for(;null!==l;){f=l;if(0!==(f.flags&2048))switch(f.tag){case 0:case 11:case 15:Gc(9,
f,f.return)}var w=f.sibling;if(null!==w){w.return=f.return;l=w;break b}l=f.return}}var A=a.current;for(l=A;null!==l;){g=l;var t=g.child;if(0!==(g.subtreeFlags&2064)&&null!==t)t.return=g,l=t;else b:for(g=A;null!==l;){h=l;if(0!==(h.flags&2048))try{switch(h.tag){case 0:case 11:case 15:Id(9,h)}}catch(ma){G(h,h.return,ma)}if(h===g){l=null;break b}var B=h.sibling;if(null!==B){B.return=h.return;l=B;break b}l=h.return}}p=e;db();if(Ca&&"function"===typeof Ca.onPostCommitFiberRoot)try{Ca.onPostCommitFiberRoot(Uc,
a)}catch(ma){}d=!0}return d}finally{z=c,ca.transition=b}}return!1}function Si(a,b,c){b=Ub(c,b);b=gi(a,b,1);a=fb(a,b,1);b=Z();null!==a&&(ic(a,1,b),ia(a,b))}function G(a,b,c){if(3===a.tag)Si(a,a,c);else for(;null!==b;){if(3===b.tag){Si(b,a,c);break}else if(1===b.tag){var d=b.stateNode;if("function"===typeof b.type.getDerivedStateFromError||"function"===typeof d.componentDidCatch&&(null===ib||!ib.has(d))){a=Ub(c,a);a=hi(b,a,1);b=fb(b,a,1);a=Z();null!==b&&(ic(b,1,a),ia(b,a));break}}b=b.return}}function sk(a,
b,c){var d=a.pingCache;null!==d&&d.delete(b);b=Z();a.pingedLanes|=a.suspendedLanes&c;O===a&&(U&c)===c&&(4===L||3===L&&(U&130023424)===U&&500>P()-Of?wb(a,0):Sf|=c);ia(a,b)}function Ti(a,b){0===b&&(0===(a.mode&1)?b=1:(b=Rd,Rd<<=1,0===(Rd&130023424)&&(Rd=4194304)));var c=Z();a=Oa(a,b);null!==a&&(ic(a,b,c),ia(a,c))}function vk(a){var b=a.memoizedState,c=0;null!==b&&(c=b.retryLane);Ti(a,c)}function Gk(a,b){var c=0;switch(a.tag){case 13:var d=a.stateNode;var e=a.memoizedState;null!==e&&(c=e.retryLane);
break;case 19:d=a.stateNode;break;default:throw Error(m(314));}null!==d&&d.delete(b);Ti(a,c)}function Mi(a,b){return xh(a,b)}function Tk(a,b,c,d){this.tag=a;this.key=c;this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null;this.index=0;this.ref=null;this.pendingProps=b;this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null;this.mode=d;this.subtreeFlags=this.flags=0;this.deletions=null;this.childLanes=this.lanes=0;this.alternate=null}function yf(a){a=
a.prototype;return!(!a||!a.isReactComponent)}function Uk(a){if("function"===typeof a)return yf(a)?1:0;if(void 0!==a&&null!==a){a=a.$$typeof;if(a===ie)return 11;if(a===je)return 14}return 2}function eb(a,b){var c=a.alternate;null===c?(c=pa(a.tag,b,a.key,a.mode),c.elementType=a.elementType,c.type=a.type,c.stateNode=a.stateNode,c.alternate=a,a.alternate=c):(c.pendingProps=b,c.type=a.type,c.flags=0,c.subtreeFlags=0,c.deletions=null);c.flags=a.flags&14680064;c.childLanes=a.childLanes;c.lanes=a.lanes;c.child=
a.child;c.memoizedProps=a.memoizedProps;c.memoizedState=a.memoizedState;c.updateQueue=a.updateQueue;b=a.dependencies;c.dependencies=null===b?null:{lanes:b.lanes,firstContext:b.firstContext};c.sibling=a.sibling;c.index=a.index;c.ref=a.ref;return c}function rd(a,b,c,d,e,f){var g=2;d=a;if("function"===typeof a)yf(a)&&(g=1);else if("string"===typeof a)g=5;else a:switch(a){case Bb:return sb(c.children,e,f,b);case fe:g=8;e|=8;break;case ee:return a=pa(12,c,b,e|2),a.elementType=ee,a.lanes=f,a;case ge:return a=
pa(13,c,b,e),a.elementType=ge,a.lanes=f,a;case he:return a=pa(19,c,b,e),a.elementType=he,a.lanes=f,a;case Ui:return Gd(c,e,f,b);default:if("object"===typeof a&&null!==a)switch(a.$$typeof){case hg:g=10;break a;case gg:g=9;break a;case ie:g=11;break a;case je:g=14;break a;case Ta:g=16;d=null;break a}throw Error(m(130,null==a?a:typeof a,""));}b=pa(g,c,b,e);b.elementType=a;b.type=d;b.lanes=f;return b}function sb(a,b,c,d){a=pa(7,a,d,b);a.lanes=c;return a}function Gd(a,b,c,d){a=pa(22,a,d,b);a.elementType=
Ui;a.lanes=c;a.stateNode={isHidden:!1};return a}function Ze(a,b,c){a=pa(6,a,null,b);a.lanes=c;return a}function $e(a,b,c){b=pa(4,null!==a.children?a.children:[],a.key,b);b.lanes=c;b.stateNode={containerInfo:a.containerInfo,pendingChildren:null,implementation:a.implementation};return b}function Vk(a,b,c,d,e){this.tag=b;this.containerInfo=a;this.finishedWork=this.pingCache=this.current=this.pendingChildren=null;this.timeoutHandle=-1;this.callbackNode=this.pendingContext=this.context=null;this.callbackPriority=
0;this.eventTimes=we(0);this.expirationTimes=we(-1);this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0;this.entanglements=we(0);this.identifierPrefix=d;this.onRecoverableError=e;this.mutableSourceEagerHydrationData=null}function Vf(a,b,c,d,e,f,g,h,k,l){a=new Vk(a,b,c,h,k);1===b?(b=1,!0===f&&(b|=8)):b=0;f=pa(3,null,null,b);a.current=f;f.stateNode=a;f.memoizedState={element:d,isDehydrated:c,cache:null,transitions:null,
pendingSuspenseBoundaries:null};ff(f);return a}function Wk(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:Cb,key:null==d?null:""+d,children:a,containerInfo:b,implementation:c}}function Vi(a){if(!a)return cb;a=a._reactInternals;a:{if(nb(a)!==a||1!==a.tag)throw Error(m(170));var b=a;do{switch(b.tag){case 3:b=b.stateNode.context;break a;case 1:if(ea(b.type)){b=b.stateNode.__reactInternalMemoizedMergedChildContext;break a}}b=b.return}while(null!==b);throw Error(m(171));
}if(1===a.tag){var c=a.type;if(ea(c))return uh(a,c,b)}return b}function Wi(a,b,c,d,e,f,g,h,k,l){a=Vf(c,d,!0,a,e,f,g,h,k);a.context=Vi(null);c=a.current;d=Z();e=hb(c);f=Pa(d,e);f.callback=void 0!==b&&null!==b?b:null;fb(c,f,e);a.current.lanes=e;ic(a,e,d);ia(a,d);return a}function Sd(a,b,c,d){var e=b.current,f=Z(),g=hb(e);c=Vi(c);null===b.context?b.context=c:b.pendingContext=c;b=Pa(f,g);b.payload={element:a};d=void 0===d?null:d;null!==d&&(b.callback=d);a=fb(e,b,g);null!==a&&(xa(a,e,g,f),vd(a,e,g));return g}
function Td(a){a=a.current;if(!a.child)return null;switch(a.child.tag){case 5:return a.child.stateNode;default:return a.child.stateNode}}function Xi(a,b){a=a.memoizedState;if(null!==a&&null!==a.dehydrated){var c=a.retryLane;a.retryLane=0!==c&&c<b?c:b}}function Wf(a,b){Xi(a,b);(a=a.alternate)&&Xi(a,b)}function Xk(a){a=Bg(a);return null===a?null:a.stateNode}function Yk(a){return null}function Xf(a){this._internalRoot=a}function Ud(a){this._internalRoot=a}function Yf(a){return!(!a||1!==a.nodeType&&9!==
a.nodeType&&11!==a.nodeType)}function Vd(a){return!(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType&&(8!==a.nodeType||" react-mount-point-unstable "!==a.nodeValue))}function Yi(){}function Zk(a,b,c,d,e){if(e){if("function"===typeof d){var f=d;d=function(){var a=Td(g);f.call(a)}}var g=Wi(b,d,a,0,null,!1,!1,"",Yi);a._reactRootContainer=g;a[Ja]=g.current;sc(8===a.nodeType?a.parentNode:a);yb();return g}for(;e=a.lastChild;)a.removeChild(e);if("function"===typeof d){var h=d;d=function(){var a=Td(k);
h.call(a)}}var k=Vf(a,0,!1,null,null,!1,!1,"",Yi);a._reactRootContainer=k;a[Ja]=k.current;sc(8===a.nodeType?a.parentNode:a);yb(function(){Sd(b,k,c,d)});return k}function Wd(a,b,c,d,e){var f=c._reactRootContainer;if(f){var g=f;if("function"===typeof e){var h=e;e=function(){var a=Td(g);h.call(a)}}Sd(b,g,a,e)}else g=Zk(c,b,a,e,d);return Td(g)}var cg=new Set,$b={},Ia=!("undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement),Zd=Object.prototype.hasOwnProperty,
cj=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,eg={},dg={},R={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a){R[a]=
new Y(a,0,!1,a,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(a){var b=a[0];R[b]=new Y(b,1,!1,a[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(a){R[a]=new Y(a,2,!1,a.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(a){R[a]=new Y(a,2,!1,a,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a){R[a]=
new Y(a,3,!1,a.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(a){R[a]=new Y(a,3,!0,a,null,!1,!1)});["capture","download"].forEach(function(a){R[a]=new Y(a,4,!1,a,null,!1,!1)});["cols","rows","size","span"].forEach(function(a){R[a]=new Y(a,6,!1,a,null,!1,!1)});["rowSpan","start"].forEach(function(a){R[a]=new Y(a,5,!1,a.toLowerCase(),null,!1,!1)});var Zf=/[\-:]([a-z])/g,$f=function(a){return a[1].toUpperCase()};"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a){var b=
a.replace(Zf,$f);R[b]=new Y(b,1,!1,a,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a){var b=a.replace(Zf,$f);R[b]=new Y(b,1,!1,a,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(a){var b=a.replace(Zf,$f);R[b]=new Y(b,1,!1,a,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(a){R[a]=new Y(a,1,!1,a.toLowerCase(),null,!1,!1)});R.xlinkHref=new Y("xlinkHref",
1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(a){R[a]=new Y(a,1,!1,a.toLowerCase(),null,!0,!0)});var Sa=zb.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,sd=Symbol.for("react.element"),Cb=Symbol.for("react.portal"),Bb=Symbol.for("react.fragment"),fe=Symbol.for("react.strict_mode"),ee=Symbol.for("react.profiler"),hg=Symbol.for("react.provider"),gg=Symbol.for("react.context"),ie=Symbol.for("react.forward_ref"),ge=Symbol.for("react.suspense"),
he=Symbol.for("react.suspense_list"),je=Symbol.for("react.memo"),Ta=Symbol.for("react.lazy");Symbol.for("react.scope");Symbol.for("react.debug_trace_mode");var Ui=Symbol.for("react.offscreen");Symbol.for("react.legacy_hidden");Symbol.for("react.cache");Symbol.for("react.tracing_marker");var fg=Symbol.iterator,E=Object.assign,ae,ce=!1,cc=Array.isArray,Xd,yi=function(a){return"undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(b,c,d,e){MSApp.execUnsafeLocalFunction(function(){return a(b,
c,d,e)})}:a}(function(a,b){if("http://www.w3.org/2000/svg"!==a.namespaceURI||"innerHTML"in a)a.innerHTML=b;else{Xd=Xd||document.createElement("div");Xd.innerHTML="<svg>"+b.valueOf().toString()+"</svg>";for(b=Xd.firstChild;a.firstChild;)a.removeChild(a.firstChild);for(;b.firstChild;)a.appendChild(b.firstChild)}}),Fc=function(a,b){if(b){var c=a.firstChild;if(c&&c===a.lastChild&&3===c.nodeType){c.nodeValue=b;return}}a.textContent=b},dc={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,
borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,
strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},$k=["Webkit","ms","Moz","O"];Object.keys(dc).forEach(function(a){$k.forEach(function(b){b=b+a.charAt(0).toUpperCase()+a.substring(1);dc[b]=dc[a]})});var ij=E({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0}),ze=null,se=null,Eb=null,Fb=null,xg=function(a,b){return a(b)},yg=function(){},te=!1,Oe=!1;if(Ia)try{var Lc={};Object.defineProperty(Lc,
"passive",{get:function(){Oe=!0}});window.addEventListener("test",Lc,Lc);window.removeEventListener("test",Lc,Lc)}catch(a){Oe=!1}var kj=function(a,b,c,d,e,f,g,h,k){var l=Array.prototype.slice.call(arguments,3);try{b.apply(c,l)}catch(q){this.onError(q)}},gc=!1,Sc=null,Tc=!1,ue=null,lj={onError:function(a){gc=!0;Sc=a}},Ba=zb.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Scheduler,Jg=Ba.unstable_scheduleCallback,Kg=Ba.unstable_NormalPriority,xh=Jg,Ki=Ba.unstable_cancelCallback,Pk=Ba.unstable_shouldYield,
Sk=Ba.unstable_requestPaint,P=Ba.unstable_now,Dj=Ba.unstable_getCurrentPriorityLevel,De=Ba.unstable_ImmediatePriority,Mg=Ba.unstable_UserBlockingPriority,ad=Kg,Ej=Ba.unstable_LowPriority,Ng=Ba.unstable_IdlePriority,Uc=null,Ca=null,ta=Math.clz32?Math.clz32:pj,qj=Math.log,rj=Math.LN2,Wc=64,Rd=4194304,z=0,Ae=!1,Yc=[],Va=null,Wa=null,Xa=null,jc=new Map,kc=new Map,Ya=[],Bj="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" "),
Gb=Sa.ReactCurrentBatchConfig,Zc=!0,$c=null,Za=null,Ee=null,bd=null,Yb={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(a){return a.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},He=ka(Yb),Mc=E({},Yb,{view:0,detail:0}),ak=ka(Mc),ag,bg,Nc,Yd=E({},Mc,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Fe,button:0,buttons:0,relatedTarget:function(a){return void 0===a.relatedTarget?a.fromElement===a.srcElement?a.toElement:a.fromElement:
a.relatedTarget},movementX:function(a){if("movementX"in a)return a.movementX;a!==Nc&&(Nc&&"mousemove"===a.type?(ag=a.screenX-Nc.screenX,bg=a.screenY-Nc.screenY):bg=ag=0,Nc=a);return ag},movementY:function(a){return"movementY"in a?a.movementY:bg}}),ih=ka(Yd),al=E({},Yd,{dataTransfer:0}),Wj=ka(al),bl=E({},Mc,{relatedTarget:0}),Pe=ka(bl),cl=E({},Yb,{animationName:0,elapsedTime:0,pseudoElement:0}),Yj=ka(cl),dl=E({},Yb,{clipboardData:function(a){return"clipboardData"in a?a.clipboardData:window.clipboardData}}),
ck=ka(dl),el=E({},Yb,{data:0}),qh=ka(el),fk=qh,fl={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},gl={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",
112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Gj={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"},hl=E({},Mc,{key:function(a){if(a.key){var b=fl[a.key]||a.key;if("Unidentified"!==b)return b}return"keypress"===a.type?(a=cd(a),13===a?"Enter":String.fromCharCode(a)):"keydown"===a.type||"keyup"===a.type?gl[a.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,
metaKey:0,repeat:0,locale:0,getModifierState:Fe,charCode:function(a){return"keypress"===a.type?cd(a):0},keyCode:function(a){return"keydown"===a.type||"keyup"===a.type?a.keyCode:0},which:function(a){return"keypress"===a.type?cd(a):"keydown"===a.type||"keyup"===a.type?a.keyCode:0}}),Vj=ka(hl),il=E({},Yd,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),nh=ka(il),jl=E({},Mc,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,
ctrlKey:0,shiftKey:0,getModifierState:Fe}),Xj=ka(jl),kl=E({},Yb,{propertyName:0,elapsedTime:0,pseudoElement:0}),Zj=ka(kl),ll=E({},Yd,{deltaX:function(a){return"deltaX"in a?a.deltaX:"wheelDeltaX"in a?-a.wheelDeltaX:0},deltaY:function(a){return"deltaY"in a?a.deltaY:"wheelDeltaY"in a?-a.wheelDeltaY:"wheelDelta"in a?-a.wheelDelta:0},deltaZ:0,deltaMode:0}),bk=ka(ll),Hj=[9,13,27,32],Ge=Ia&&"CompositionEvent"in window,Oc=null;Ia&&"documentMode"in document&&(Oc=document.documentMode);var ek=Ia&&"TextEvent"in
window&&!Oc,Ug=Ia&&(!Ge||Oc&&8<Oc&&11>=Oc),Tg=String.fromCharCode(32),Sg=!1,Hb=!1,Kj={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0},oc=null,pc=null,ph=!1;Ia&&(ph=Lj("input")&&(!document.documentMode||9<document.documentMode));var ua="function"===typeof Object.is?Object.is:Sj,dk=Ia&&"documentMode"in document&&11>=document.documentMode,Jb=null,Ke=null,rc=null,Je=!1,Kb={animationend:gd("Animation","AnimationEnd"),
animationiteration:gd("Animation","AnimationIteration"),animationstart:gd("Animation","AnimationStart"),transitionend:gd("Transition","TransitionEnd")},Le={},eh={};Ia&&(eh=document.createElement("div").style,"AnimationEvent"in window||(delete Kb.animationend.animation,delete Kb.animationiteration.animation,delete Kb.animationstart.animation),"TransitionEvent"in window||delete Kb.transitionend.transition);var jh=hd("animationend"),kh=hd("animationiteration"),lh=hd("animationstart"),mh=hd("transitionend"),
fh=new Map,Zi="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
(function(){for(var a=0;a<Zi.length;a++){var b=Zi[a],c=b.toLowerCase();b=b[0].toUpperCase()+b.slice(1);$a(c,"on"+b)}$a(jh,"onAnimationEnd");$a(kh,"onAnimationIteration");$a(lh,"onAnimationStart");$a("dblclick","onDoubleClick");$a("focusin","onFocus");$a("focusout","onBlur");$a(mh,"onTransitionEnd")})();Ab("onMouseEnter",["mouseout","mouseover"]);Ab("onMouseLeave",["mouseout","mouseover"]);Ab("onPointerEnter",["pointerout","pointerover"]);Ab("onPointerLeave",["pointerout","pointerover"]);mb("onChange",
"change click focusin focusout input keydown keyup selectionchange".split(" "));mb("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));mb("onBeforeInput",["compositionend","keypress","textInput","paste"]);mb("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));mb("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));mb("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Ec="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Uj=new Set("cancel close invalid load scroll toggle".split(" ").concat(Ec)),id="_reactListening"+Math.random().toString(36).slice(2),gk=/\r\n?/g,hk=/\u0000|\uFFFD/g,Jf=null,Kf=null,Rf="function"===typeof setTimeout?setTimeout:void 0,Nk="function"===typeof clearTimeout?
clearTimeout:void 0,$i="function"===typeof Promise?Promise:void 0,Jk="function"===typeof queueMicrotask?queueMicrotask:"undefined"!==typeof $i?function(a){return $i.resolve(null).then(a).catch(ik)}:Rf,Zb=Math.random().toString(36).slice(2),Da="__reactFiber$"+Zb,uc="__reactProps$"+Zb,Ja="__reactContainer$"+Zb,Me="__reactEvents$"+Zb,Dk="__reactListeners$"+Zb,Ek="__reactHandles$"+Zb,Se=[],Mb=-1,cb={},J=bb(cb),S=bb(!1),pb=cb,La=null,md=!1,Te=!1,Ob=[],Pb=0,od=null,nd=0,na=[],oa=0,rb=null,Ma=1,Na="",la=
null,fa=null,D=!1,wa=null,Ik=Sa.ReactCurrentBatchConfig,Vb=Dh(!0),li=Dh(!1),ud=bb(null),td=null,Rb=null,bf=null,tb=null,kk=Oa,gb=!1,wc={},Ea=bb(wc),yc=bb(wc),xc=bb(wc),F=bb(0),kf=[],yd=Sa.ReactCurrentDispatcher,sf=Sa.ReactCurrentBatchConfig,vb=0,C=null,K=null,N=null,Ad=!1,zc=!1,Ac=0,ml=0,zd={readContext:qa,useCallback:V,useContext:V,useEffect:V,useImperativeHandle:V,useInsertionEffect:V,useLayoutEffect:V,useMemo:V,useReducer:V,useRef:V,useState:V,useDebugValue:V,useDeferredValue:V,useTransition:V,
useMutableSource:V,useSyncExternalStore:V,useId:V,unstable_isNewReconciler:!1},lk={readContext:qa,useCallback:function(a,b){Fa().memoizedState=[a,void 0===b?null:b];return a},useContext:qa,useEffect:Sh,useImperativeHandle:function(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return Bd(4194308,4,Vh.bind(null,b,a),c)},useLayoutEffect:function(a,b){return Bd(4194308,4,a,b)},useInsertionEffect:function(a,b){return Bd(4,2,a,b)},useMemo:function(a,b){var c=Fa();b=void 0===b?null:b;a=a();c.memoizedState=
[a,b];return a},useReducer:function(a,b,c){var d=Fa();b=void 0!==c?c(b):b;d.memoizedState=d.baseState=b;a={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:a,lastRenderedState:b};d.queue=a;a=a.dispatch=qk.bind(null,C,a);return[d.memoizedState,a]},useRef:function(a){var b=Fa();a={current:a};return b.memoizedState=a},useState:Qh,useDebugValue:rf,useDeferredValue:function(a){return Fa().memoizedState=a},useTransition:function(){var a=Qh(!1),b=a[0];a=pk.bind(null,a[1]);Fa().memoizedState=
a;return[b,a]},useMutableSource:function(a,b,c){},useSyncExternalStore:function(a,b,c){var d=C,e=Fa();if(D){if(void 0===c)throw Error(m(407));c=c()}else{c=b();if(null===O)throw Error(m(349));0!==(vb&30)||Nh(d,b,c)}e.memoizedState=c;var f={value:c,getSnapshot:b};e.queue=f;Sh(Lh.bind(null,d,f,a),[a]);d.flags|=2048;Cc(9,Mh.bind(null,d,f,c,b),void 0,null);return c},useId:function(){var a=Fa(),b=O.identifierPrefix;if(D){var c=Na;var d=Ma;c=(d&~(1<<32-ta(d)-1)).toString(32)+c;b=":"+b+"R"+c;c=Ac++;0<c&&
(b+="H"+c.toString(32));b+=":"}else c=ml++,b=":"+b+"r"+c.toString(32)+":";return a.memoizedState=b},unstable_isNewReconciler:!1},mk={readContext:qa,useCallback:Xh,useContext:qa,useEffect:qf,useImperativeHandle:Wh,useInsertionEffect:Th,useLayoutEffect:Uh,useMemo:Yh,useReducer:of,useRef:Rh,useState:function(a){return of(Bc)},useDebugValue:rf,useDeferredValue:function(a){var b=sa();return Zh(b,K.memoizedState,a)},useTransition:function(){var a=of(Bc)[0],b=sa().memoizedState;return[a,b]},useMutableSource:Jh,
useSyncExternalStore:Kh,useId:$h,unstable_isNewReconciler:!1},nk={readContext:qa,useCallback:Xh,useContext:qa,useEffect:qf,useImperativeHandle:Wh,useInsertionEffect:Th,useLayoutEffect:Uh,useMemo:Yh,useReducer:pf,useRef:Rh,useState:function(a){return pf(Bc)},useDebugValue:rf,useDeferredValue:function(a){var b=sa();return null===K?b.memoizedState=a:Zh(b,K.memoizedState,a)},useTransition:function(){var a=pf(Bc)[0],b=sa().memoizedState;return[a,b]},useMutableSource:Jh,useSyncExternalStore:Kh,useId:$h,
unstable_isNewReconciler:!1},Dd={isMounted:function(a){return(a=a._reactInternals)?nb(a)===a:!1},enqueueSetState:function(a,b,c){a=a._reactInternals;var d=Z(),e=hb(a),f=Pa(d,e);f.payload=b;void 0!==c&&null!==c&&(f.callback=c);b=fb(a,f,e);null!==b&&(xa(b,a,e,d),vd(b,a,e))},enqueueReplaceState:function(a,b,c){a=a._reactInternals;var d=Z(),e=hb(a),f=Pa(d,e);f.tag=1;f.payload=b;void 0!==c&&null!==c&&(f.callback=c);b=fb(a,f,e);null!==b&&(xa(b,a,e,d),vd(b,a,e))},enqueueForceUpdate:function(a,b){a=a._reactInternals;
var c=Z(),d=hb(a),e=Pa(c,d);e.tag=2;void 0!==b&&null!==b&&(e.callback=b);b=fb(a,e,d);null!==b&&(xa(b,a,d,c),vd(b,a,d))}},rk="function"===typeof WeakMap?WeakMap:Map,tk=Sa.ReactCurrentOwner,ha=!1,Cf={dehydrated:null,treeContext:null,retryLane:0};var zk=function(a,b,c,d){for(c=b.child;null!==c;){if(5===c.tag||6===c.tag)a.appendChild(c.stateNode);else if(4!==c.tag&&null!==c.child){c.child.return=c;c=c.child;continue}if(c===b)break;for(;null===c.sibling;){if(null===c.return||c.return===b)return;c=c.return}c.sibling.return=
c.return;c=c.sibling}};var xi=function(a,b){};var yk=function(a,b,c,d,e){var f=a.memoizedProps;if(f!==d){a=b.stateNode;ub(Ea.current);e=null;switch(c){case "input":f=ke(a,f);d=ke(a,d);e=[];break;case "select":f=E({},f,{value:void 0});d=E({},d,{value:void 0});e=[];break;case "textarea":f=ne(a,f);d=ne(a,d);e=[];break;default:"function"!==typeof f.onClick&&"function"===typeof d.onClick&&(a.onclick=kd)}pe(c,d);var g;c=null;for(l in f)if(!d.hasOwnProperty(l)&&f.hasOwnProperty(l)&&null!=f[l])if("style"===
l){var h=f[l];for(g in h)h.hasOwnProperty(g)&&(c||(c={}),c[g]="")}else"dangerouslySetInnerHTML"!==l&&"children"!==l&&"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&"autoFocus"!==l&&($b.hasOwnProperty(l)?e||(e=[]):(e=e||[]).push(l,null));for(l in d){var k=d[l];h=null!=f?f[l]:void 0;if(d.hasOwnProperty(l)&&k!==h&&(null!=k||null!=h))if("style"===l)if(h){for(g in h)!h.hasOwnProperty(g)||k&&k.hasOwnProperty(g)||(c||(c={}),c[g]="");for(g in k)k.hasOwnProperty(g)&&h[g]!==k[g]&&(c||
(c={}),c[g]=k[g])}else c||(e||(e=[]),e.push(l,c)),c=k;else"dangerouslySetInnerHTML"===l?(k=k?k.__html:void 0,h=h?h.__html:void 0,null!=k&&h!==k&&(e=e||[]).push(l,k)):"children"===l?"string"!==typeof k&&"number"!==typeof k||(e=e||[]).push(l,""+k):"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&($b.hasOwnProperty(l)?(null!=k&&"onScroll"===l&&B("scroll",a),e||h===k||(e=[])):(e=e||[]).push(l,k))}c&&(e=e||[]).push("style",c);var l=e;if(b.updateQueue=l)b.flags|=4}};var Ak=function(a,
b,c,d){c!==d&&(b.flags|=4)};var Jd=!1,X=!1,Fk="function"===typeof WeakSet?WeakSet:Set,l=null,zi=!1,T=null,za=!1,Mk=Math.ceil,Od=Sa.ReactCurrentDispatcher,Uf=Sa.ReactCurrentOwner,ca=Sa.ReactCurrentBatchConfig,p=0,O=null,H=null,U=0,ba=0,Ga=bb(0),L=0,Jc=null,ra=0,Md=0,Sf=0,Kc=null,ja=null,Of=0,Hf=Infinity,Ra=null,Ed=!1,xf=null,ib=null,Pd=!1,lb=null,Qd=0,Ic=0,Pf=null,Kd=-1,Ld=0;var Qk=function(a,b,c){if(null!==a)if(a.memoizedProps!==b.pendingProps||S.current)ha=!0;else{if(0===(a.lanes&c)&&0===(b.flags&
128))return ha=!1,wk(a,b,c);ha=0!==(a.flags&131072)?!0:!1}else ha=!1,D&&0!==(b.flags&1048576)&&yh(b,nd,b.index);b.lanes=0;switch(b.tag){case 2:var d=b.type;Fd(a,b);a=b.pendingProps;var e=Nb(b,J.current);Sb(b,c);e=mf(null,b,d,a,e,c);var f=nf();b.flags|=1;"object"===typeof e&&null!==e&&"function"===typeof e.render&&void 0===e.$$typeof?(b.tag=1,b.memoizedState=null,b.updateQueue=null,ea(d)?(f=!0,ld(b)):f=!1,b.memoizedState=null!==e.state&&void 0!==e.state?e.state:null,ff(b),e.updater=Dd,b.stateNode=
e,e._reactInternals=b,uf(b,d,a,c),b=Af(null,b,d,!0,f,c)):(b.tag=0,D&&f&&Ue(b),aa(null,b,e,c),b=b.child);return b;case 16:d=b.elementType;a:{Fd(a,b);a=b.pendingProps;e=d._init;d=e(d._payload);b.type=d;e=b.tag=Uk(d);a=ya(d,a);switch(e){case 0:b=zf(null,b,d,a,c);break a;case 1:b=ri(null,b,d,a,c);break a;case 11:b=mi(null,b,d,a,c);break a;case 14:b=ni(null,b,d,ya(d.type,a),c);break a}throw Error(m(306,d,""));}return b;case 0:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:ya(d,e),zf(a,b,d,e,c);
case 1:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:ya(d,e),ri(a,b,d,e,c);case 3:a:{si(b);if(null===a)throw Error(m(387));d=b.pendingProps;f=b.memoizedState;e=f.element;Fh(a,b);wd(b,d,null,c);var g=b.memoizedState;d=g.element;if(f.isDehydrated)if(f={element:d,isDehydrated:!1,cache:g.cache,pendingSuspenseBoundaries:g.pendingSuspenseBoundaries,transitions:g.transitions},b.updateQueue.baseState=f,b.memoizedState=f,b.flags&256){e=Ub(Error(m(423)),b);b=ti(a,b,d,c,e);break a}else if(d!==e){e=
Ub(Error(m(424)),b);b=ti(a,b,d,c,e);break a}else for(fa=Ka(b.stateNode.containerInfo.firstChild),la=b,D=!0,wa=null,c=li(b,null,d,c),b.child=c;c;)c.flags=c.flags&-3|4096,c=c.sibling;else{Qb();if(d===e){b=Qa(a,b,c);break a}aa(a,b,d,c)}b=b.child}return b;case 5:return Ih(b),null===a&&Xe(b),d=b.type,e=b.pendingProps,f=null!==a?a.memoizedProps:null,g=e.children,Qe(d,e)?g=null:null!==f&&Qe(d,f)&&(b.flags|=32),qi(a,b),aa(a,b,g,c),b.child;case 6:return null===a&&Xe(b),null;case 13:return ui(a,b,c);case 4:return gf(b,
b.stateNode.containerInfo),d=b.pendingProps,null===a?b.child=Vb(b,null,d,c):aa(a,b,d,c),b.child;case 11:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:ya(d,e),mi(a,b,d,e,c);case 7:return aa(a,b,b.pendingProps,c),b.child;case 8:return aa(a,b,b.pendingProps.children,c),b.child;case 12:return aa(a,b,b.pendingProps.children,c),b.child;case 10:a:{d=b.type._context;e=b.pendingProps;f=b.memoizedProps;g=e.value;y(ud,d._currentValue);d._currentValue=g;if(null!==f)if(ua(f.value,g)){if(f.children===
e.children&&!S.current){b=Qa(a,b,c);break a}}else for(f=b.child,null!==f&&(f.return=b);null!==f;){var h=f.dependencies;if(null!==h){g=f.child;for(var k=h.firstContext;null!==k;){if(k.context===d){if(1===f.tag){k=Pa(-1,c&-c);k.tag=2;var l=f.updateQueue;if(null!==l){l=l.shared;var p=l.pending;null===p?k.next=k:(k.next=p.next,p.next=k);l.pending=k}}f.lanes|=c;k=f.alternate;null!==k&&(k.lanes|=c);df(f.return,c,b);h.lanes|=c;break}k=k.next}}else if(10===f.tag)g=f.type===b.type?null:f.child;else if(18===
f.tag){g=f.return;if(null===g)throw Error(m(341));g.lanes|=c;h=g.alternate;null!==h&&(h.lanes|=c);df(g,c,b);g=f.sibling}else g=f.child;if(null!==g)g.return=f;else for(g=f;null!==g;){if(g===b){g=null;break}f=g.sibling;if(null!==f){f.return=g.return;g=f;break}g=g.return}f=g}aa(a,b,e.children,c);b=b.child}return b;case 9:return e=b.type,d=b.pendingProps.children,Sb(b,c),e=qa(e),d=d(e),b.flags|=1,aa(a,b,d,c),b.child;case 14:return d=b.type,e=ya(d,b.pendingProps),e=ya(d.type,e),ni(a,b,d,e,c);case 15:return oi(a,
b,b.type,b.pendingProps,c);case 17:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:ya(d,e),Fd(a,b),b.tag=1,ea(d)?(a=!0,ld(b)):a=!1,Sb(b,c),ei(b,d,e),uf(b,d,e,c),Af(null,b,d,!0,a,c);case 19:return wi(a,b,c);case 22:return pi(a,b,c)}throw Error(m(156,b.tag));};var pa=function(a,b,c,d){return new Tk(a,b,c,d)},aj="function"===typeof reportError?reportError:function(a){console.error(a)};Ud.prototype.render=Xf.prototype.render=function(a){var b=this._internalRoot;if(null===b)throw Error(m(409));
Sd(a,b,null,null)};Ud.prototype.unmount=Xf.prototype.unmount=function(){var a=this._internalRoot;if(null!==a){this._internalRoot=null;var b=a.containerInfo;yb(function(){Sd(null,a,null,null)});b[Ja]=null}};Ud.prototype.unstable_scheduleHydration=function(a){if(a){var b=nl();a={blockedOn:null,target:a,priority:b};for(var c=0;c<Ya.length&&0!==b&&b<Ya[c].priority;c++);Ya.splice(c,0,a);0===c&&Hg(a)}};var Cj=function(a){switch(a.tag){case 3:var b=a.stateNode;if(b.current.memoizedState.isDehydrated){var c=
hc(b.pendingLanes);0!==c&&(xe(b,c|1),ia(b,P()),0===(p&6)&&(Hc(),db()))}break;case 13:yb(function(){var b=Oa(a,1);if(null!==b){var c=Z();xa(b,a,1,c)}}),Wf(a,1)}};var Gg=function(a){if(13===a.tag){var b=Oa(a,134217728);if(null!==b){var c=Z();xa(b,a,134217728,c)}Wf(a,134217728)}};var xj=function(a){if(13===a.tag){var b=hb(a),c=Oa(a,b);if(null!==c){var d=Z();xa(c,a,b,d)}Wf(a,b)}};var nl=function(){return z};var wj=function(a,b){var c=z;try{return z=a,b()}finally{z=c}};se=function(a,b,c){switch(b){case "input":le(a,
c);b=c.name;if("radio"===c.type&&null!=b){for(c=a;c.parentNode;)c=c.parentNode;c=c.querySelectorAll("input[name="+JSON.stringify(""+b)+'][type="radio"]');for(b=0;b<c.length;b++){var d=c[b];if(d!==a&&d.form===a.form){var e=Rc(d);if(!e)throw Error(m(90));jg(d);le(d,e)}}}break;case "textarea":og(a,c);break;case "select":b=c.value,null!=b&&Db(a,!!c.multiple,b,!1)}};(function(a,b,c){xg=a;yg=c})(Tf,function(a,b,c,d,e){var f=z,g=ca.transition;try{return ca.transition=null,z=1,a(b,c,d,e)}finally{z=f,ca.transition=
g,0===p&&Hc()}},yb);var ol={usingClientEntryPoint:!1,Events:[ec,Ib,Rc,ug,vg,Tf]};(function(a){a={bundleType:a.bundleType,version:a.version,rendererPackageName:a.rendererPackageName,rendererConfig:a.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Sa.ReactCurrentDispatcher,findHostInstanceByFiber:Xk,
findFiberByHostInstance:a.findFiberByHostInstance||Yk,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1"};if("undefined"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__)a=!1;else{var b=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(b.isDisabled||!b.supportsFiber)a=!0;else{try{Uc=b.inject(a),Ca=b}catch(c){}a=b.checkDCE?!0:!1}}return a})({findFiberByHostInstance:ob,bundleType:0,version:"18.3.1-next-f1338f8080-20240426",
rendererPackageName:"react-dom"});Q.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ol;Q.createPortal=function(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!Yf(b))throw Error(m(200));return Wk(a,b,null,c)};Q.createRoot=function(a,b){if(!Yf(a))throw Error(m(299));var c=!1,d="",e=aj;null!==b&&void 0!==b&&(!0===b.unstable_strictMode&&(c=!0),void 0!==b.identifierPrefix&&(d=b.identifierPrefix),void 0!==b.onRecoverableError&&(e=b.onRecoverableError));b=Vf(a,1,!1,null,null,
c,!1,d,e);a[Ja]=b.current;sc(8===a.nodeType?a.parentNode:a);return new Xf(b)};Q.findDOMNode=function(a){if(null==a)return null;if(1===a.nodeType)return a;var b=a._reactInternals;if(void 0===b){if("function"===typeof a.render)throw Error(m(188));a=Object.keys(a).join(",");throw Error(m(268,a));}a=Bg(b);a=null===a?null:a.stateNode;return a};Q.flushSync=function(a){return yb(a)};Q.hydrate=function(a,b,c){if(!Vd(b))throw Error(m(200));return Wd(null,a,b,!0,c)};Q.hydrateRoot=function(a,b,c){if(!Yf(a))throw Error(m(405));
var d=null!=c&&c.hydratedSources||null,e=!1,f="",g=aj;null!==c&&void 0!==c&&(!0===c.unstable_strictMode&&(e=!0),void 0!==c.identifierPrefix&&(f=c.identifierPrefix),void 0!==c.onRecoverableError&&(g=c.onRecoverableError));b=Wi(b,null,a,1,null!=c?c:null,e,!1,f,g);a[Ja]=b.current;sc(a);if(d)for(a=0;a<d.length;a++)c=d[a],e=c._getVersion,e=e(c._source),null==b.mutableSourceEagerHydrationData?b.mutableSourceEagerHydrationData=[c,e]:b.mutableSourceEagerHydrationData.push(c,e);return new Ud(b)};Q.render=
function(a,b,c){if(!Vd(b))throw Error(m(200));return Wd(null,a,b,!1,c)};Q.unmountComponentAtNode=function(a){if(!Vd(a))throw Error(m(40));return a._reactRootContainer?(yb(function(){Wd(null,null,a,!1,function(){a._reactRootContainer=null;a[Ja]=null})}),!0):!1};Q.unstable_batchedUpdates=Tf;Q.unstable_renderSubtreeIntoContainer=function(a,b,c,d){if(!Vd(c))throw Error(m(200));if(null==a||void 0===a._reactInternals)throw Error(m(38));return Wd(a,b,c,!1,d)};Q.version="18.3.1-next-f1338f8080-20240426"});
})();

// ── App ──
var {
  useState,
  useEffect,
  useCallback,
  useRef
} = React;
const CURRENCIES = {
  NGN: "₦",
  USD: "$",
  GBP: "£",
  EUR: "€",
  GHS: "₵",
  KES: "KSh",
  ZAR: "R"
};
const getCurrency = () => localStorage.getItem("sl_currency") || "NGN";
const getCurrencySymbol = () => CURRENCIES[getCurrency()] || "₦";
// Polyfill Promise.allSettled for Android 6 Chrome
if (typeof Promise.allSettled !== 'function') {
  Promise.allSettled = promises => Promise.all(promises.map(p => Promise.resolve(p).then(value => ({
    status: 'fulfilled',
    value
  }), reason => ({
    status: 'rejected',
    reason
  }))));
}
const NAIRA = n => `${getCurrencySymbol()}${Number(n || 0).toLocaleString("en-NG", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
})}`;
const TODAY = () => new Date().toISOString().split("T")[0];
const TS = () => new Date().toISOString();
const uid = () => Math.random().toString(36).slice(2, 10);

// Dynamic colors   these are the CSS var equivalents for JSX inline styles
// Used alongside static COLORS for gradient/special colours
const DC = {
  bg: "var(--bg)",
  surface: "var(--surface)",
  text: "var(--text)",
  textMuted: "var(--text-muted)",
  textLight: "var(--text-light)",
  border: "var(--border)",
  primary: "var(--primary)",
  primaryLight: "var(--primary-light)",
  accent: "var(--accent)",
  accentLight: "var(--accent-light)",
  danger: "var(--danger)",
  dangerLight: "var(--danger-light)",
  amber: "var(--amber)",
  amberLight: "var(--amber-light)"
};
const COLORS = {
  primary: "#2563EB",
  primaryDark: "#1D4ED8",
  primaryLight: "#EFF6FF",
  accent: "#059669",
  accentLight: "#ECFDF5",
  danger: "#DC2626",
  dangerLight: "#FEF2F2",
  amber: "#D97706",
  amberLight: "#FFFBEB",
  surface: "#FFFFFF",
  bg: "#F8FAFC",
  border: "rgba(15,23,42,0.08)",
  text: "#0F172A",
  textMuted: "#64748B",
  textLight: "#94A3B8",
  purple: "#7C3AED",
  purpleLight: "#F5F3FF"
};
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: ${COLORS.bg}; --surface: #ffffff; --text: ${COLORS.text};
    --text-muted: ${COLORS.textMuted}; --text-light: ${COLORS.textLight};
    --border: ${COLORS.border}; --primary: ${COLORS.primary};
    --primary-light: ${COLORS.primaryLight}; --accent: ${COLORS.accent};
    --accent-light: ${COLORS.accentLight}; --danger: ${COLORS.danger};
    --danger-light: ${COLORS.dangerLight}; --amber: ${COLORS.amber};
    --amber-light: ${COLORS.amberLight};
  }
  [data-theme="dark"] {
    --bg: #0A0F1E;
    --surface: #161D31;
    --surface2: #1E2640;
    --text: #F1F5F9;
    --text-muted: #94A3B8;
    --text-light: #4B5563;
    --border: rgba(255,255,255,0.09);
    --primary: #3B82F6;
    --primary-dark: #2563EB;
    --primary-light: #1E3A5F;
    --accent: #10B981;
    --accent-light: #0A2E20;
    --danger: #F87171;
    --danger-light: #2D1515;
    --amber: #FBBF24;
    --amber-light: #2D2209;
    --purple: #A78BFA;
    --purple-light: #1E1535;
    --card-shadow: 0 1px 3px rgba(0,0,0,0.4);
  }
  body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); transition: background 0.2s, color 0.2s; -webkit-text-size-adjust: 100%; }
  /* Android 6 touch feedback */
  * { -webkit-tap-highlight-color: transparent; }
  input, textarea, select { -webkit-appearance: none; }
  input, select, textarea { font-family: 'Inter', sans-serif; }
  button { cursor: pointer; font-family: 'Inter', sans-serif; }

  @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  @keyframes scaleIn { from { transform: scale(0.92); opacity: 0; } to { transform: scale(1); opacity: 1; } }
  .app { min-height: 100vh; display: flex; flex-direction: row; }

  .sidebar { background: linear-gradient(180deg, #0F172A 0%, #1E293B 100%); display: flex; flex-direction: column; min-height: 100vh; position: sticky; top: 0; height: 100vh; overflow: hidden; z-index: 50; transition: width 0.25s cubic-bezier(0.4,0,0.2,1), min-width 0.25s cubic-bezier(0.4,0,0.2,1); }
  .sidebar.open { width: 220px; min-width: 220px; }
  .sidebar.collapsed { width: 56px; min-width: 56px; }
  .sidebar-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 12px 8px; flex-shrink: 0; }
  .sidebar-logo { font-family: 'Space Mono', monospace; font-size: 14px; font-weight: 700; color: #fff; letter-spacing: -0.3px; white-space: nowrap; overflow: hidden; opacity: 1; transition: opacity 0.15s; }
  .sidebar.collapsed .sidebar-logo { opacity: 0; width: 0; }
  .sidebar-toggle { background: none; border: none; color: rgba(255,255,255,0.7); cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 4px; border-radius: 6px; flex-shrink: 0; transition: background 0.15s; }
  .sidebar-toggle:hover { background: rgba(255,255,255,0.1); color: #fff; }
  .sidebar-tagline { font-size: 10px; color: rgba(255,255,255,0.45); padding: 0 14px 14px; border-bottom: 0.5px solid rgba(255,255,255,0.1); margin-bottom: 6px; white-space: nowrap; overflow: hidden; transition: opacity 0.15s; }
  .sidebar.collapsed .sidebar-tagline { opacity: 0; height: 0; padding: 0; margin: 0; border: none; }
  .sidebar-section { font-size: 9px; font-weight: 600; color: rgba(255,255,255,0.35); text-transform: uppercase; letter-spacing: 0.1em; padding: 10px 14px 3px; white-space: nowrap; overflow: hidden; transition: opacity 0.15s; }
  .sidebar.collapsed .sidebar-section { opacity: 0; height: 0; padding: 0; }
  .nav-tab { display: flex; flex-direction: row; align-items: center; gap: 10px; padding: 10px 14px; border: none; background: none; color: rgba(255,255,255,0.6); font-size: 13px; font-family: 'Inter', sans-serif; transition: background 0.15s, color 0.15s, padding 0.25s; width: 100%; text-align: left; border-radius: 0; cursor: pointer; white-space: nowrap; }
  .sidebar.collapsed .nav-tab { padding: 12px 0; justify-content: center; gap: 0; }
  .nav-tab:hover { background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.9); }
  .nav-tab.active { background: rgba(37,99,235,0.25); color: #fff; font-weight: 600; border-left: 3px solid #60A5FA; padding-left: 11px; border-radius: 0 8px 8px 0; }
  .sidebar.collapsed .nav-tab.active { border-left: 3px solid #5BB8F5; padding-left: 0; }
  .nav-tab svg { width: 16px; height: 16px; flex-shrink: 0; }
  .nav-tab .nav-label { flex: 1; overflow: hidden; transition: opacity 0.15s, max-width 0.25s; max-width: 200px; }
  .sidebar.collapsed .nav-tab .nav-label { opacity: 0; max-width: 0; overflow: hidden; }
  .sidebar-bottom { margin-top: auto; padding: 12px 8px; border-top: 0.5px solid rgba(255,255,255,0.1); }
  .sidebar-user { display: flex; align-items: center; gap: 8px; padding: 8px; border-radius: 8px; cursor: pointer; overflow: hidden; }
  .sidebar.collapsed .sidebar-user { justify-content: center; padding: 6px 4px; }
  .sidebar-user:hover { background: rgba(255,255,255,0.07); }
  .sidebar-avatar { width: 30px; height: 30px; border-radius: 50%; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: #fff; flex-shrink: 0; overflow: hidden; }
  .sidebar-avatar img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
  .avatar img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
  .sidebar-userinfo { overflow: hidden; transition: opacity 0.15s, max-width 0.25s; max-width: 160px; }
  .sidebar.collapsed .sidebar-userinfo { opacity: 0; max-width: 0; }
  .sidebar-username { font-size: 12px; color: rgba(255,255,255,0.8); font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .sidebar-email { font-size: 10px; color: rgba(255,255,255,0.4); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

  .main-wrap { flex: 1; display: flex; flex-direction: column; min-width: 0; }
  .topbar { background: var(--surface); color: var(--text); padding: 0 1.25rem; display: flex; align-items: center; justify-content: space-between; height: 52px; border-bottom: 0.5px solid var(--border); position: sticky; top: 0; z-index: 40; }
  [data-theme="dark"] .topbar { background: #0E1525; border-bottom-color: rgba(255,255,255,0.07); }
  .topbar-breadcrumb { font-size: 14px; font-weight: 600; color: var(--text); }
  .topbar-right { display: flex; gap: 8px; align-items: center; }
  .avatar { width: 30px; height: 30px; border-radius: 50%; background: var(--primary-light); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: var(--primary); cursor: pointer; }

  .main { flex: 1; padding: 1.25rem; overflow-y: auto; background: var(--bg); }
  [data-theme="dark"] .main { background: #0A0F1E; }

  .card { background: var(--surface); border-radius: 16px; border: 1px solid var(--border); padding: 1rem 1.1rem; margin-bottom: 0.75rem; box-shadow: var(--card-shadow, 0 1px 3px rgba(15,23,42,0.04)); }
  [data-theme="dark"] .card { border-color: rgba(255,255,255,0.07); }
  [data-theme="dark"] .card-sm { border-color: rgba(255,255,255,0.06); }
  .card-sm { background: var(--surface); border-radius: 10px; border: 0.5px solid var(--border); padding: 0.75rem 0.9rem; margin-bottom: 0.6rem; }

  .stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 1rem; }
  .stat-card { background: var(--surface); border-radius: 12px; border: 0.5px solid var(--border); padding: 0.85rem 1rem; }
  .stat-label { font-size: 11px; color: var(--text-muted); margin-bottom: 4px; }
  .stat-value { font-size: 20px; font-weight: 600; font-family: 'Space Mono', monospace; color: var(--text); }
  .stat-sub { font-size: 10px; color: var(--text-light); margin-top: 2px; }

  .section-title { font-size: 13px; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em; margin: 1.25rem 0 0.6rem; }

  .form-group { margin-bottom: 0.85rem; }
  .form-label { font-size: 12px; font-weight: 500; color: var(--text-muted); margin-bottom: 4px; display: block; }
  .form-input { width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid var(--border); background: var(--bg); font-size: 14px; color: var(--text); outline: none; font-family: 'Inter', sans-serif; transition: border-color 0.2s; }
  [data-theme="dark"] .form-input { background: #0F1629; border-color: rgba(255,255,255,0.12); color: #F1F5F9; }
  [data-theme="dark"] .form-input:focus { border-color: var(--primary); background: #161D31; }
  [data-theme="dark"] .form-input::placeholder { color: rgba(255,255,255,0.25); }
  @media (max-width: 640px) { .form-input, .search-bar, input, select, textarea { font-size: 16px !important; } }
  .form-input:focus { border-color: var(--primary); background: var(--surface); }
  .form-input.error { border-color: var(--danger); }
  .form-error { font-size: 11px; color: var(--danger); margin-top: 3px; }

  .btn { border: none; border-radius: 9px; padding: 11px 20px; font-size: 14px; font-weight: 600; font-family: 'Inter', sans-serif; transition: all 0.15s; display: inline-flex; align-items: center; gap: 6px; justify-content: center; }
  .btn-primary { background: linear-gradient(135deg, var(--primary), var(--primary-dark, #1D4ED8)); color: #fff; width: 100%; box-shadow: 0 2px 8px rgba(37,99,235,0.2); }
  .btn-primary:hover { background: linear-gradient(135deg, var(--primary), #1E3A8A); box-shadow: 0 4px 12px rgba(37,99,235,0.3); }
  .btn-primary:active { transform: scale(0.98); }
  .btn-outline { background: transparent; border: 1px solid var(--border); color: var(--text); }
  .btn-outline:hover { background: var(--bg); }
  .btn-danger { background: var(--danger-light); color: var(--danger); border: none; }
  .btn-success { background: var(--accent-light); color: var(--accent); border: none; }
  .btn-sm { padding: 6px 12px; font-size: 12px; border-radius: 7px; }

  .pill { display: inline-flex; align-items: center; border-radius: 20px; padding: 3px 10px; font-size: 11px; font-weight: 500; }
  .pill-green { background: var(--accent-light); color: var(--accent); }
  .pill-amber { background: var(--amber-light); color: var(--amber); }
  .pill-red { background: var(--danger-light); color: var(--danger); }
  .pill-blue { background: var(--primary-light); color: var(--primary); }

  .entry-row { display: flex; align-items: flex-start; gap: 10px; padding: 12px 0; border-bottom: 0.5px solid var(--border); }
  .entry-row:last-child { border-bottom: none; }
  .entry-dot { width: 8px; height: 8px; border-radius: 50%; margin-top: 6px; flex-shrink: 0; }
  .entry-content { flex: 1; min-width: 0; }
  .entry-title { font-size: 14px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .entry-sub { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
  .entry-amount { font-family: 'Space Mono', monospace; font-size: 14px; font-weight: 700; color: var(--text); flex-shrink: 0; }

  .search-bar { width: 100%; padding: 10px 36px 10px 38px; border-radius: 12px; border: 1.5px solid var(--border); background: var(--surface); font-size: 13px; font-family: 'Inter', sans-serif; outline: none; transition: border-color 0.2s, box-shadow 0.2s; color: var(--text); }
  [data-theme="dark"] .search-bar { background: #0F1629; border-color: rgba(255,255,255,0.1); color: #F1F5F9; }
  [data-theme="dark"] .search-bar::placeholder { color: rgba(255,255,255,0.25); }
  [data-theme="dark"] .search-bar:focus { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(59,130,246,0.15); }
  .search-bar:focus { border-color: var(--primary); box-shadow: 0 0 0 3px var(--primary-light); }
  .search-wrap { position: relative; margin-bottom: 0.75rem; }
  .search-icon { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: var(--text-light); }

  .tab-bar { display: flex; background: var(--bg); border-radius: 10px; padding: 3px; margin-bottom: 1rem; }
  [data-theme="dark"] .tab-bar { background: #0F1629; }
  [data-theme="dark"] .tab-btn.active { background: var(--surface); box-shadow: 0 1px 3px rgba(0,0,0,0.4); }
  .tab-btn { flex: 1; border: none; background: none; padding: 7px; font-size: 12px; font-weight: 500; border-radius: 8px; color: var(--text-muted); font-family: 'Inter', sans-serif; transition: all 0.15s; }
  .tab-btn.active { background: var(--surface); color: var(--primary); box-shadow: 0 1px 3px rgba(0,0,0,0.1); }

  .sector-card { background: var(--surface); border-radius: 16px; border: 2px solid transparent; padding: 1.25rem; margin-bottom: 0.75rem; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 14px; }
  .sector-card:hover { border-color: var(--primary); }
  .sector-card.active { border-color: var(--primary); background: var(--primary-light); }
  .sector-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0; }
  .sector-info h3 { font-size: 15px; font-weight: 600; }
  .sector-info p { font-size: 12px; color: var(--text-muted); margin-top: 3px; }

  .welcome-screen { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2rem; background: linear-gradient(145deg, #1E3A8A 0%, #1D4ED8 40%, #2563EB 70%, #0F766E 100%); color: #fff; }
  .welcome-logo { font-family: 'Space Mono', monospace; font-size: 32px; font-weight: 700; margin-bottom: 8px; }
  .welcome-tagline { font-size: 14px; opacity: 0.75; text-align: center; margin-bottom: 3rem; max-width: 260px; }
  .welcome-art { font-size: 72px; margin-bottom: 2rem; }

  .auth-card { background: #fff; border-radius: 20px; padding: 1.75rem; width: 100%; max-width: 360px; }
  .auth-title { font-size: 20px; font-weight: 700; color: var(--text); margin-bottom: 4px; }
  .auth-sub { font-size: 13px; color: var(--text-muted); margin-bottom: 1.5rem; }

  .toast { position: fixed; bottom: 90px; left: 50%; transform: translateX(-50%); background: var(--text); color: var(--bg); padding: 10px 20px; border-radius: 10px; font-size: 13px; font-weight: 500; z-index: 999; animation: toastIn 0.3s ease; white-space: nowrap; }
  .toast.success { background: var(--accent); color: #fff; }
  .toast.error { background: var(--danger); color: #fff; }
  @keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(10px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
  @keyframes slideDown { from { transform: translateY(-100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

  .empty-state { text-align: center; padding: 3rem 1rem; color: var(--text-muted); }
  .empty-icon { font-size: 48px; margin-bottom: 1rem; }
  .empty-state h3 { font-size: 16px; font-weight: 600; color: var(--text); margin-bottom: 6px; }
  .empty-state p { font-size: 13px; }

  .stock-bar { height: 4px; border-radius: 2px; background: var(--bg); margin-top: 4px; }
  .stock-fill { height: 100%; border-radius: 2px; transition: width 0.3s; }

  .divider { height: 0.5px; background: var(--border); margin: 0.75rem 0; }

  .profile-avatar-lg { width: 80px; height: 80px; border-radius: 50%; background: var(--primary-light); display: flex; align-items: center; justify-content: center; font-size: 28px; font-weight: 700; color: var(--primary); margin: 0 auto 0; overflow: hidden; position: relative; cursor: pointer; }
  .profile-avatar-lg img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
  .avatar-edit-overlay { position: absolute; inset: 0; border-radius: 50%; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.15s; cursor: pointer; }
  .profile-avatar-lg:hover .avatar-edit-overlay { opacity: 1; }

  .chip { display: inline-flex; align-items: center; gap: 4px; border-radius: 6px; padding: 4px 10px; font-size: 11px; font-weight: 500; background: var(--bg); color: var(--text-muted); border: 0.5px solid var(--border); cursor: pointer; transition: all 0.15s; }
  .chip.active { background: var(--primary-light); color: var(--primary); border-color: var(--primary); }

  .export-row { display: flex; gap: 8px; margin-top: 0.75rem; }
  select.form-input { appearance: none; }

  /* ── Mobile bottom tab bar ── */
  .bottom-tab-bar {
    display: none;
    position: fixed; bottom: 0; left: 0; right: 0; z-index: 100;
    background: #0F172A;
    border-top: 1px solid rgba(255,255,255,0.1);
    padding: 0; height: 62px;
    flex-direction: row; align-items: stretch;
    box-shadow: 0 -4px 20px rgba(0,0,0,0.3);
  }
  .bottom-tab-item {
    flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 3px; border: none; background: none; color: rgba(255,255,255,0.45);
    cursor: pointer; font-family: 'Inter', sans-serif; font-size: 9px; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.05em; padding: 6px 2px;
    position: relative; transition: color 0.15s;
  }
  .bottom-tab-item.active { color: #fff; }
  .bottom-tab-item .btab-dot {
    position: absolute; top: 8px; right: calc(50% - 14px);
    width: 7px; height: 7px; border-radius: 50%; background: #EF4444;
  }
  .bottom-tab-item .btab-icon { font-size: 20px; line-height: 1; margin-bottom: 1px; }
  .bottom-tab-item .btab-bar {
    position: absolute; bottom: 0; left: 20%; right: 20%; height: 3px;
    border-radius: 3px 3px 0 0;
  }

  /* ── Desktop-only elements ── */
  @media (max-width: 640px) { .desktop-only { display: none !important; } }

  /* ── Touch feedback ── */
  button:active { transform: scale(0.97); }
  .nav-tab:active { background: rgba(255,255,255,0.15) !important; }
  .bottom-tab-item:active { opacity: 0.7; }

  /* ── Scrollable horizontal chip rows ── */
  .chip-row { display: flex; gap: 6px; overflow-x: auto; padding-bottom: 4px; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
  .chip-row::-webkit-scrollbar { display: none; }

  /* ── Safe area insets for notched phones ── */
  .bottom-tab-bar { padding-bottom: env(safe-area-inset-bottom, 0px); height: calc(54px + env(safe-area-inset-bottom, 0px)); background: #0F172A; }
  [data-theme="dark"] .bottom-tab-bar { background: #080D1A; border-top-color: rgba(255,255,255,0.06); }
  .main { padding-bottom: calc(80px + env(safe-area-inset-bottom, 0px)); }

  /* ── Prevent text size inflation on rotation ── */
  html { -webkit-text-size-adjust: 100%; }

  /* ── Smooth momentum scroll ── */
  .main { -webkit-overflow-scrolling: touch; }

  /* ── FAB lift above bottom tab bar on mobile ── */
  :root { --fab-lift: 0px; }
  @media (max-width: 640px) { :root { --fab-lift: 70px; } }

  /* ── Better tap targets — min 44px ── */
  .btn { min-height: 44px; }
  .btn-sm { min-height: 36px; }
  .nav-tab { min-height: 44px; }

  /* ── On mobile: hide sidebar, show bottom bar ── */
  @media (max-width: 640px) {
    .sidebar { display: none !important; }
    .bottom-tab-bar { display: flex !important; }
    .main { padding: 1rem; padding-bottom: calc(100px + env(safe-area-inset-bottom, 0px)); }
    .topbar { padding: 0 1rem; height: 56px; }
    .topbar-breadcrumb { font-size: 17px; font-weight: 700; }

    /* Bigger cards on mobile */
    .card { padding: 1rem 1rem; border-radius: 16px; margin-bottom: 0.85rem; }
    .card-sm { padding: 0.85rem 1rem; }

    /* Stat grid */
    .stat-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
    .stat-value { font-size: 22px; }
    .stat-label { font-size: 13px; }
    .stat-sub { font-size: 11px; }

    /* Inputs — 16px prevents iOS zoom */
    .form-input { padding: 14px 16px; font-size: 16px; border-radius: 12px; }
    .form-label { font-size: 14px; margin-bottom: 6px; }
    .search-bar { font-size: 16px; padding: 14px 40px 14px 44px; border-radius: 14px; }

    /* Buttons */
    .btn { min-height: 52px; font-size: 16px; border-radius: 12px; }
    .btn-sm { min-height: 40px; font-size: 13px; }
    .tab-btn { font-size: 14px; padding: 10px; min-height: 42px; }

    /* Text sizes */
    .section-title { font-size: 13px; margin: 1.5rem 0 0.75rem; }
    .entry-row { padding: 16px 0; }
    .entry-title { font-size: 16px; font-weight: 600; }
    .entry-sub { font-size: 13px; }
    .entry-amount { font-size: 16px; }

    /* Pills larger */
    .pill { font-size: 12px; padding: 4px 12px; }

    /* Bottom tab bar bigger */
    .bottom-tab-bar { height: calc(58px + env(safe-area-inset-bottom, 0px)); }
    .bottom-tab-item { font-size: 10px; gap: 4px; }
    .bottom-tab-item .btab-icon { font-size: 21px; }
  }

  /* ── Very small phones (360px) ── */
  @media (max-width: 360px) {
    .stat-grid { grid-template-columns: 1fr; }
    .main { padding: 0.85rem; }
    .card { padding: 0.85rem; }
    .btn { font-size: 15px; }
  }
`;
function useLocalState(key, init) {
  // Business data keys (inventory, sales, etc.) → IDB primary
  // Settings/auth keys → localStorage only
  const isBiz = typeof isBusinessKey === "function" && isBusinessKey(key);
  const [val, setVal] = useState(() => {
    try {
      const s = localStorage.getItem(key);
      return s ? JSON.parse(s) : typeof init === "function" ? init() : init;
    } catch {
      return typeof init === "function" ? init() : init;
    }
  });
  useEffect(() => {
    let active = true;
    // Hydrate business keys from IDB on mount
    if (isBiz) {
      IDB.get(key).then(v => {
        if (!active) return;
        if (v !== undefined && v !== null) {
          setVal(v);
        } else {
          // Migrate from localStorage to IDB on first run
          try {
            const raw = localStorage.getItem(key);
            if (raw !== null) {
              const parsed = JSON.parse(raw);
              IDB.set(key, parsed).catch(() => {});
              setVal(parsed);
            }
          } catch {}
        }
      }).catch(() => {});
    }

    // Re-hydrate on server sync
    const handler = () => {
      if (isBiz) {
        IDB.get(key).then(v => {
          if (active && v !== undefined && v !== null) setVal(v);
        }).catch(() => {
          try {
            const s = localStorage.getItem(key);
            if (s && active) setVal(JSON.parse(s));
          } catch {}
        });
      } else {
        try {
          const s = localStorage.getItem(key);
          if (s && active) setVal(JSON.parse(s));
        } catch {}
      }
    };
    window.addEventListener("rc_sync_update", handler);
    return () => {
      active = false;
      window.removeEventListener("rc_sync_update", handler);
    };
  }, [key, isBiz]);
  const update = useCallback(v => {
    setVal(prev => {
      const next = typeof v === "function" ? v(prev) : v;
      try {
        if (isBiz) {
          // Business data: write to BOTH IDB and localStorage
          // localStorage is the fast-read fallback for initial renders
          // IDB is the primary store for large data
          try {
            localStorage.setItem(key, JSON.stringify(next));
          } catch {}
          IDB.set(key, next).catch(() => {});
          // Signal sync engine to push immediately
          clearTimeout(window.__rcSyncTimer);
          window.__rcSyncTimer = setTimeout(() => {
            window.dispatchEvent(new CustomEvent("rc_data_write"));
          }, 800);
        } else {
          // Settings/auth: localStorage only
          localStorage.setItem(key, JSON.stringify(next));
        }
      } catch {}
      return next;
    });
  }, [key, isBiz]);
  return [val, update];
}
function Toast({
  msg,
  type,
  onDone
}) {
  useEffect(() => {
    const t = setTimeout(onDone, 2500);
    return () => clearTimeout(t);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: `toast ${type}`
  }, msg);
}
function Icon({
  name,
  size = 20
}) {
  const icons = {
    home: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M9 21V12h6v9"
    })),
    chart: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "12",
      width: "4",
      height: "9",
      rx: "1"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "10",
      y: "6",
      width: "4",
      height: "15",
      rx: "1"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "17",
      y: "3",
      width: "4",
      height: "18",
      rx: "1"
    })),
    history: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "9"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 7v5l3 3"
    })),
    user: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "8",
      r: "4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M4 20c0-4 3.6-7 8-7s8 3 8 7"
    })),
    plus: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.5"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 5v14M5 12h14"
    })),
    trash: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"
    })),
    edit: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
    })),
    download: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 3v13M7 11l5 5 5-5"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M5 21h14"
    })),
    search: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "11",
      cy: "11",
      r: "7"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M21 21l-4-4"
    })),
    logout: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"
    })),
    back: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.5"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M19 12H5M12 5l-7 7 7 7"
    })),
    check: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.5"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M5 13l4 4L19 7"
    })),
    store: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M3 9h18v11a1 1 0 01-1 1H4a1 1 0 01-1-1V9zM3 9l2.5-6h13L21 9"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 9v12"
    })),
    leaf: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z"
    })),
    briefcase: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("rect", {
      x: "2",
      y: "7",
      width: "20",
      height: "14",
      rx: "2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 12v2"
    })),
    settings: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "3"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
    }))
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: size,
      height: size,
      display: "inline-flex"
    }
  }, icons[name] || null);
}

// ===================== EXPORT UTILITIES =====================
function loadSheetJS(cb) {
  if (window.XLSX) {
    cb();
    return;
  }
  const s = document.createElement("script");
  s.src = "https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";
  s.onload = cb;
  document.head.appendChild(s);
}
function loadJsPDF(cb) {
  if (window.jspdf) {
    cb(window.jspdf.jsPDF);
    return;
  }
  const s = document.createElement("script");
  s.src = "https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js";
  s.onload = () => cb(window.jspdf.jsPDF);
  document.head.appendChild(s);
}
function loadAutoTable(cb) {
  if (window.jspdfAutotable) {
    cb();
    return;
  }
  const s = document.createElement("script");
  s.src = "https://cdn.jsdelivr.net/npm/jspdf-autotable@3.8.2/dist/jspdf.plugin.autotable.min.js";
  s.onload = () => {
    window.jspdfAutotable = true;
    cb();
  };
  document.head.appendChild(s);
}
function exportToExcel(filename, sheetName, rows, headers) {
  loadSheetJS(() => {
    const wb = window.XLSX.utils.book_new();
    const data = [headers, ...rows];
    const ws = window.XLSX.utils.aoa_to_sheet(data);
    // column widths
    ws["!cols"] = headers.map(() => ({
      wch: 20
    }));
    window.XLSX.utils.book_append_sheet(wb, ws, sheetName);
    window.XLSX.writeFile(wb, filename + ".xlsx");
  });
}
function exportToPDF(title, headers, rows, filename) {
  loadJsPDF(JsPDF => {
    loadAutoTable(() => {
      const doc = new JsPDF({
        orientation: "landscape",
        unit: "pt",
        format: "a4"
      });
      const pageW = doc.internal.pageSize.getWidth();
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(title, pageW / 2, 36, {
        align: "center"
      });
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(120);
      doc.text("Record Chief  ·  Exported " + new Date().toLocaleDateString("en-NG", {
        day: "numeric",
        month: "long",
        year: "numeric"
      }), pageW / 2, 50, {
        align: "center"
      });
      doc.autoTable({
        startY: 62,
        head: [headers],
        body: rows,
        headStyles: {
          fillColor: [27, 108, 168],
          textColor: 255,
          fontStyle: "bold",
          fontSize: 9
        },
        bodyStyles: {
          fontSize: 9
        },
        alternateRowStyles: {
          fillColor: [245, 248, 252]
        },
        margin: {
          left: 36,
          right: 36
        },
        styles: {
          cellPadding: 5,
          overflow: "linebreak"
        }
      });
      doc.save(filename + "_" + new Date().toISOString().slice(0, 10) + ".pdf");
    });
  });
}
function ExportModal({
  title,
  onClose,
  onExcelExport,
  onPDFExport
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.45)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 999
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 16,
      padding: "1.5rem",
      width: 320,
      boxShadow: "0 20px 60px rgba(0,0,0,0.2)"
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 700,
      marginBottom: 4
    }
  }, "Export ", title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: COLORS.textMuted,
      marginBottom: 20
    }
  }, "Choose a format to download your data."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onExcelExport,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "14px 16px",
      border: "1.5px solid #1D6F42",
      borderRadius: 10,
      background: "#F0FAF4",
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      transition: "all 0.15s"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 28
    }
  }, "\uD83D\uDCCA"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: "#1D6F42"
    }
  }, "Excel Spreadsheet"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#4B9B6B",
      marginTop: 2
    }
  }, "Downloads as .xlsx \u2014 open in Excel or Google Sheets"))), /*#__PURE__*/React.createElement("button", {
    onClick: onPDFExport,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "14px 16px",
      border: `1.5px solid ${COLORS.danger}`,
      borderRadius: 10,
      background: COLORS.dangerLight,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      transition: "all 0.15s"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 28
    }
  }, "\uD83D\uDCC4"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: COLORS.danger
    }
  }, "PDF Document"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#C0392B99",
      marginTop: 2
    }
  }, "Downloads as .pdf \u2014 formatted, printable report")))), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      marginTop: 16,
      width: "100%",
      background: "none",
      border: `1px solid ${COLORS.border}`,
      borderRadius: 8,
      padding: "9px",
      fontSize: 13,
      color: COLORS.textMuted,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif"
    }
  }, "Cancel")));
}

// ===================== SMART SEARCH =====================
function SmartSearch({
  value,
  onChange,
  placeholder,
  resultCount
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      marginBottom: "0.75rem"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 12,
      top: "50%",
      transform: "translateY(-50%)",
      color: COLORS.textLight,
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 16
  })), /*#__PURE__*/React.createElement("input", {
    className: "search-bar",
    placeholder: placeholder || "Search…",
    value: value,
    onChange: e => onChange(e.target.value),
    autoComplete: "off",
    autoCorrect: "off",
    autoCapitalize: "off",
    spellCheck: "false"
  }), value && /*#__PURE__*/React.createElement("button", {
    onClick: () => onChange(""),
    style: {
      position: "absolute",
      right: 10,
      top: "50%",
      transform: "translateY(-50%)",
      background: COLORS.border,
      border: "none",
      borderRadius: "50%",
      width: 22,
      height: 22,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: COLORS.textMuted,
      fontSize: 12,
      lineHeight: 1
    }
  }, "\u2715"), value && resultCount !== undefined && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: value ? 40 : 10,
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: 10,
      color: COLORS.textMuted,
      whiteSpace: "nowrap"
    }
  }, resultCount, " result", resultCount !== 1 ? "s" : ""));
}

// ===================== NOTIFICATION BANNER =====================
function NotificationBanner({
  user,
  onNavigateDebt
}) {
  const [dismissed, setDismissed] = useState(false);
  const debtKey = `sl_debt_${user.uid}`;
  const records = (() => {
    try {
      return JSON.parse(localStorage.getItem(debtKey)) || [];
    } catch {
      return [];
    }
  })();
  const overdue = records.filter(r => !r.settled && !r.archived && r.dueDate && r.dueDate < TODAY());
  const dueSoon = records.filter(r => {
    if (r.settled || r.archived || !r.dueDate) return false;
    const days = Math.ceil((new Date(r.dueDate) - new Date()) / 86400000);
    const threshold = parseInt(r.reminderDays ?? 1);
    return days >= 0 && days <= threshold;
  });
  if (dismissed || overdue.length === 0 && dueSoon.length === 0) return null;
  const isUrgent = overdue.length > 0;
  const items = isUrgent ? overdue : dueSoon;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: isUrgent ? "#FEF2F2" : "#FFFBEB",
      border: `1.5px solid ${isUrgent ? "#FCA5A5" : "#FCD34D"}`,
      borderRadius: 14,
      padding: "12px 14px",
      marginBottom: "0.75rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 20,
      flexShrink: 0
    }
  }, isUrgent ? "🚨" : "⏰"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: isUrgent ? COLORS.danger : COLORS.amber
    }
  }, isUrgent ? `${overdue.length} record${overdue.length > 1 ? "s are" : " is"} overdue` : `${dueSoon.length} record${dueSoon.length > 1 ? "s" : ""} due within 3 days`)), /*#__PURE__*/React.createElement("button", {
    onClick: () => setDismissed(true),
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: COLORS.textMuted,
      fontSize: 16,
      padding: 4,
      flexShrink: 0
    }
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 5
    }
  }, items.slice(0, 3).map(r => {
    const daysLeft = Math.ceil((new Date(r.dueDate) - new Date()) / 86400000);
    return /*#__PURE__*/React.createElement("div", {
      key: r.id,
      onClick: onNavigateDebt,
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: isUrgent ? "#FEE2E2" : "#FEF3C7",
        borderRadius: 8,
        padding: "6px 10px",
        cursor: onNavigateDebt ? "pointer" : "default"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 600,
        color: isUrgent ? COLORS.danger : COLORS.amber
      }
    }, r.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: isUrgent ? COLORS.danger : COLORS.amber,
        fontWeight: 700
      }
    }, isUrgent ? `${Math.abs(daysLeft)}d overdue` : daysLeft === 0 ? "Due today" : `${daysLeft}d left`));
  }), items.length > 3 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: COLORS.textMuted,
      paddingLeft: 4
    }
  }, "+", items.length - 3, " more\u2026")), onNavigateDebt && /*#__PURE__*/React.createElement("button", {
    onClick: onNavigateDebt,
    style: {
      marginTop: 8,
      width: "100%",
      padding: "7px",
      border: "none",
      borderRadius: 8,
      background: isUrgent ? COLORS.danger : COLORS.amber,
      color: "#fff",
      fontSize: 12,
      fontWeight: 700,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif"
    }
  }, "View in Debt & Credit \u2192"));
}

// ===================== MINI BAR CHART =====================
function MiniBarChart({
  data,
  color,
  label
}) {
  // data: [{month: "Jan", value: 12000}, ...]
  const ref = React.useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !data || data.length === 0) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width,
      H = canvas.height;
    const max = Math.max(...data.map(d => d.value), 1);
    const pad = {
      top: 6,
      bottom: 22,
      left: 4,
      right: 4
    };
    const barW = (W - pad.left - pad.right) / data.length;
    ctx.clearRect(0, 0, W, H);
    data.forEach((d, i) => {
      const barH = d.value / max * (H - pad.top - pad.bottom) || 2;
      const x = pad.left + i * barW + barW * 0.15;
      const y = H - pad.bottom - barH;
      const w = barW * 0.7;

      // bar background
      ctx.fillStyle = "rgba(0,0,0,0.04)";
      ctx.beginPath();
      ctx.roundRect(x, pad.top, w, H - pad.top - pad.bottom, 4);
      ctx.fill();

      // bar fill
      const grad = ctx.createLinearGradient(0, y, 0, H - pad.bottom);
      grad.addColorStop(0, color);
      grad.addColorStop(1, color + "88");
      ctx.fillStyle = d.value > 0 ? grad : "transparent";
      ctx.beginPath();
      ctx.roundRect(x, y, w, barH, 4);
      ctx.fill();

      // month label
      ctx.fillStyle = "rgba(100,116,139,0.8)";
      ctx.font = "8px Sora, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(d.month.slice(0, 3), x + w / 2, H - 6);
    });
  }, [data, color]);
  return /*#__PURE__*/React.createElement("div", null, label && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 600,
      color: COLORS.textMuted,
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      marginBottom: 4
    }
  }, label), /*#__PURE__*/React.createElement("canvas", {
    ref: ref,
    width: 280,
    height: 80,
    style: {
      width: "100%",
      height: 80,
      display: "block"
    }
  }));
}

// ===================== AUTH =====================

//                                                        
// IndexedDB wrapper   faster, larger capacity than localStorage
// Falls back to localStorage silently if IDB not available
//                                                        
// ── Business data keys stored in IndexedDB, not localStorage ──
const BKEYS = ["sl_inv_", "sl_shopsales_", "sl_farm_", "sl_debt_", "sl_sales_", "sl_farms_", "sl_sales_groups_", "sl_sales_fields_"];
const isBusinessKey = k => BKEYS.some(p => k.startsWith(p));
const IDB = (() => {
  const DB_NAME = "RecordChief";
  const DB_VER = 2;
  const STORE = "bizdata";
  let _db = null;
  let _ready = false;
  let _failed = false;
  const open = () => new Promise((res, rej) => {
    if (_db) return res(_db);
    if (_failed) return rej(new Error("IDB unavailable"));
    const idb = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB;
    if (!idb) {
      _failed = true;
      return rej(new Error("No IDB"));
    }
    const req = idb.open(DB_NAME, DB_VER);
    req.onupgradeneeded = e => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
      // Migrate from old store name
      if (db.objectStoreNames.contains("data")) db.deleteObjectStore("data");
    };
    req.onsuccess = e => {
      _db = e.target.result;
      _ready = true;
      res(_db);
    };
    req.onerror = e => {
      _failed = true;
      rej(e.target.error);
    };
    req.onblocked = () => {
      _failed = true;
      rej(new Error("IDB blocked"));
    };
  });
  const idbGet = async key => {
    const db = await open();
    return new Promise((res, rej) => {
      const tx = db.transaction(STORE, "readonly");
      const r = tx.objectStore(STORE).get(key);
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    });
  };
  const idbSet = async (key, val) => {
    const db = await open();
    return new Promise((res, rej) => {
      const tx = db.transaction(STORE, "readwrite");
      const r = tx.objectStore(STORE).put(val, key);
      r.onsuccess = () => res();
      r.onerror = () => rej(r.error);
    });
  };
  const idbDel = async key => {
    const db = await open();
    return new Promise((res, rej) => {
      const tx = db.transaction(STORE, "readwrite");
      const r = tx.objectStore(STORE).delete(key);
      r.onsuccess = () => res();
      r.onerror = () => rej(r.error);
    });
  };
  return {
    async get(key) {
      try {
        return await idbGet(key);
      } catch {
        // IDB failed — fall back to localStorage
        try {
          const v = localStorage.getItem(key);
          return v !== null ? JSON.parse(v) : undefined;
        } catch {
          return undefined;
        }
      }
    },
    async set(key, value) {
      try {
        await idbSet(key, value);
      } catch {
        try {
          localStorage.setItem(key, JSON.stringify(value));
        } catch {}
      }
    },
    async del(key) {
      try {
        await idbDel(key);
      } catch {}
      try {
        localStorage.removeItem(key);
      } catch {}
    }
  };
})();

// ── Helper: read business data (IDB primary, localStorage fallback) ──
async function bizGet(key) {
  const val = await IDB.get(key);
  if (val !== undefined) return val;
  // Not in IDB yet — check localStorage (migration path)
  try {
    const raw = localStorage.getItem(key);
    if (raw !== null) {
      const parsed = JSON.parse(raw);
      // Migrate to IDB and clean localStorage
      await IDB.set(key, parsed);
      localStorage.removeItem(key);
      return parsed;
    }
  } catch {}
  return null;
}

// ── Helper: write business data to IDB (no localStorage) ──
async function bizSet(key, value) {
  await IDB.set(key, value);
  // Keep localStorage in sync for any code still reading it directly
  // (we'll eliminate these reads progressively)
}

//    Sync conflict log                                  
// Tracks when local data was kept over server data
const SyncLog = {
  KEY: "rc_sync_log",
  MAX: 50,
  add(entry) {
    try {
      const log = this.get();
      log.unshift({
        ...entry,
        ts: new Date().toISOString()
      });
      localStorage.setItem(this.KEY, JSON.stringify(log.slice(0, this.MAX)));
    } catch (e) {}
  },
  get() {
    try {
      return JSON.parse(localStorage.getItem(this.KEY)) || [];
    } catch {
      return [];
    }
  },
  clear() {
    localStorage.removeItem(this.KEY);
  }
};

//    Demo Mode sample data                              
const DEMO_USER = {
  uid: "demo_user",
  name: "Amaka (Demo)",
  email: "demo@recordchief.app",
  phone: "08012345678",
  location: "Lagos Island",
  sectors: ["shop", "farm", "sales"],
  role: "owner",
  emailVerified: true
};
const DEMO_INVENTORY = [{
  id: "d1",
  name: "Indomie Noodles (ctn)",
  price: 4500,
  stock: 24,
  createdAt: "2026-03-01T08:00:00Z"
}, {
  id: "d2",
  name: "Sunflower Oil 1L",
  price: 2800,
  stock: 3,
  createdAt: "2026-03-01T08:00:00Z"
}, {
  id: "d3",
  name: "Peak Milk (tin)",
  price: 1800,
  stock: 0,
  createdAt: "2026-03-01T08:00:00Z"
}, {
  id: "d4",
  name: "Golden Morn 1kg",
  price: 1500,
  stock: 15,
  createdAt: "2026-03-01T08:00:00Z"
}, {
  id: "d5",
  name: "Semovita 2kg",
  price: 3200,
  stock: 8,
  createdAt: "2026-03-01T08:00:00Z"
}];
const DEMO_SALES = [{
  id: "s1",
  itemId: "d1",
  itemName: "Indomie Noodles (ctn)",
  qty: 2,
  price: 4500,
  total: 9000,
  date: new Date().toISOString().split("T")[0],
  createdAt: new Date().toISOString()
}, {
  id: "s2",
  itemId: "d4",
  itemName: "Golden Morn 1kg",
  qty: 3,
  price: 1500,
  total: 4500,
  date: new Date().toISOString().split("T")[0],
  createdAt: new Date().toISOString()
}, {
  id: "s3",
  itemId: "d5",
  itemName: "Semovita 2kg",
  qty: 1,
  price: 3200,
  total: 3200,
  date: new Date(Date.now() - 86400000).toISOString().split("T")[0],
  createdAt: new Date(Date.now() - 86400000).toISOString()
}];
const DEMO_FARM = [{
  id: "f1",
  desc: "Fertilizer purchase",
  amount: 15000,
  cat: "Inputs",
  date: "2026-03-05",
  createdAt: "2026-03-05T09:00:00Z"
}, {
  id: "f2",
  desc: "Labour — planting",
  amount: 8000,
  cat: "Labour",
  date: "2026-03-08",
  createdAt: "2026-03-08T09:00:00Z"
}, {
  id: "f3",
  desc: "Irrigation pump fuel",
  amount: 5500,
  cat: "Equipment",
  date: "2026-03-12",
  createdAt: "2026-03-12T09:00:00Z"
}];
const DEMO_DEBT = [{
  id: "dbt1",
  type: "credit",
  name: "Chinedu Obi",
  amount: 12000,
  paid: 5000,
  dueDate: "2026-04-10",
  settled: false,
  note: "Goods bought on credit",
  createdAt: "2026-03-01T09:00:00Z"
}, {
  id: "dbt2",
  type: "debt",
  name: "Emeka Supplies",
  amount: 8500,
  paid: 8500,
  dueDate: "2026-03-15",
  settled: true,
  note: "Delivery fee owed",
  createdAt: "2026-02-20T09:00:00Z"
}, {
  id: "dbt3",
  type: "credit",
  name: "Ngozi Fashion",
  amount: 6000,
  paid: 0,
  dueDate: new Date(Date.now() - 86400000 * 2).toISOString().split("T")[0],
  settled: false,
  note: "3 wrappers sold on credit",
  createdAt: "2026-03-10T09:00:00Z"
}];
const DEMO_SALES_ENTRIES = [{
  id: "se1",
  f_date: "2026-03-18",
  f_name: "Taiwo Bakery",
  f_phone: "08056781234",
  f_product: "Flour (50kg bag)",
  f_amount: "22000",
  f_notes: "Regular customer, weekly order",
  createdAt: "2026-03-18T10:00:00Z"
}, {
  id: "se2",
  f_date: "2026-03-20",
  f_name: "Bello Farms",
  f_phone: "07041235678",
  f_product: "Semovita x10",
  f_amount: "32000",
  f_notes: "Bulk discount applied",
  createdAt: "2026-03-20T10:00:00Z"
}];
async function loadDemoData() {
  const uid = DEMO_USER.uid;
  localStorage.setItem(`sl_inv_${uid}`, JSON.stringify(DEMO_INVENTORY));
  localStorage.setItem(`sl_shopsales_${uid}`, JSON.stringify(DEMO_SALES));
  localStorage.setItem(`sl_farm_${uid}`, JSON.stringify(DEMO_FARM));
  localStorage.setItem(`sl_debt_${uid}`, JSON.stringify(DEMO_DEBT));
  localStorage.setItem(`sl_sales_${uid}`, JSON.stringify(DEMO_SALES_ENTRIES));
  localStorage.setItem(`sl_sales_fields_${uid}`, JSON.stringify(null));
  localStorage.setItem("rc_demo_mode", "1");
}
async function clearDemoData() {
  const uid = DEMO_USER.uid;
  const keys = ["sl_inv_", "sl_shopsales_", "sl_farm_", "sl_debt_", "sl_sales_", "sl_sales_fields_", "sl_sales_groups_", "sl_farms_"];
  await Promise.all(keys.map(k => IDB.del(k + uid).catch(() => {})));
  keys.forEach(k => {
    try {
      localStorage.removeItem(k + uid);
    } catch {}
  });
  localStorage.removeItem("rc_demo_mode");
}
function WelcomeScreen({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "welcome-screen",
    style: {
      justifyContent: "center",
      padding: "2rem 1.5rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 88,
      height: 88,
      borderRadius: 26,
      background: "rgba(255,255,255,0.15)",
      backdropFilter: "blur(8px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 46,
      marginBottom: 20,
      boxShadow: "0 8px 32px rgba(0,0,0,0.2)"
    }
  }, "\uD83D\uDCD2"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Space Mono', monospace",
      fontSize: 28,
      fontWeight: 700,
      letterSpacing: "-0.5px",
      marginBottom: 8
    }
  }, "Record Chief"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      opacity: 0.75,
      textAlign: "center",
      maxWidth: 260,
      lineHeight: 1.7
    }
  }, "Track sales, inventory, farm expenses & more \u2014 built for Nigerian businesses."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 18,
      flexWrap: "wrap",
      justifyContent: "center"
    }
  }, ["🏪 Shop Sales", "🌾 Farm Records", "🤝 Debt Tracker", "💼 Sales Rep"].map(f => /*#__PURE__*/React.createElement("span", {
    key: f,
    style: {
      background: "rgba(255,255,255,0.12)",
      border: "1px solid rgba(255,255,255,0.2)",
      borderRadius: 20,
      padding: "5px 12px",
      fontSize: 11,
      fontWeight: 600
    }
  }, f)))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 24,
      padding: "28px 24px",
      width: "100%",
      maxWidth: 380,
      boxShadow: "0 20px 60px rgba(0,0,0,0.2)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 19,
      fontWeight: 800,
      color: COLORS.text,
      marginBottom: 4
    }
  }, "Get Started"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: COLORS.textMuted,
      marginBottom: 20
    }
  }, "Join thousands of Nigerian business owners"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      marginBottom: 10,
      fontSize: 15,
      padding: "13px"
    },
    onClick: () => onNavigate("signup")
  }, "\uD83D\uDE80 Create Free Account"), /*#__PURE__*/React.createElement("button", {
    onClick: () => onNavigate("login"),
    style: {
      width: "100%",
      padding: "13px",
      border: `1.5px solid ${COLORS.border}`,
      borderRadius: 9,
      background: "transparent",
      color: COLORS.text,
      fontWeight: 600,
      fontSize: 15,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      marginBottom: 10
    }
  }, "Log In"), /*#__PURE__*/React.createElement("button", {
    onClick: () => onNavigate("demo"),
    style: {
      width: "100%",
      padding: "11px",
      border: "none",
      borderRadius: 9,
      background: "linear-gradient(135deg, #7C3AED, #5B21B6)",
      color: "#fff",
      fontWeight: 700,
      fontSize: 14,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", null, "\uD83C\uDFAE"), " Try Demo \u2014 No Account Needed"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginTop: 14,
      fontSize: 11,
      color: COLORS.textLight
    }
  }, "Free forever \xB7 No credit card required")));
}
const ALL_SECTORS = [{
  id: "sales",
  icon: "💼",
  color: "#E8F2FB",
  borderColor: "#A8C8E8",
  label: "Sales Rep / Account Manager",
  desc: "Track clients, deals, and custom KPIs"
}, {
  id: "shop",
  icon: "🏪",
  color: "#E6F7F1",
  borderColor: "#8ED5B8",
  label: "Shop Sales Record",
  desc: "Inventory management and daily sales log"
}, {
  id: "farm",
  icon: "🌾",
  color: "#FEF3E2",
  borderColor: "#F0C87A",
  label: "Farmers Expense Tracker",
  desc: "Seeds, fertilizer, labor, and all farm costs"
}];

//    Auth helpers   
const isValidEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
const isAlphaName = v => /^[a-zA-Z\s'\-]+$/.test(v.trim());
const findAccount = email => {
  try {
    const a = JSON.parse(localStorage.getItem("sl_accounts_v1")) || {};
    return a[email.toLowerCase()] || null;
  } catch {
    return null;
  }
};
//                                                                
// AUTH LAYER   Firebase-ready
//                                                              
// STEP 1 (now): Uses localStorage auth (works offline, no backend)
// STEP 2 (later): Swap FIREBASE_CONFIG and set USE_FIREBASE = true
//                 Everything else stays identical.
//                                                                

//    Backend API URL                                               
const API_URL = "https://recordchief-backend-production-019b.up.railway.app";

//    Auth API   calls the real backend                             
const AuthAPI = {
  async signUp({
    name,
    email,
    phone,
    location,
    password,
    sectors
  }) {
    try {
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          location,
          password,
          sectors
        })
      });
      const data = await res.json();
      if (!res.ok) return {
        ok: false,
        error: data.error || "Sign up failed."
      };
      const user = {
        ...data.user,
        uid: data.user._id
      };
      localStorage.setItem("rc_token", data.token);
      localStorage.setItem("rc_session", JSON.stringify(user));
      return {
        ok: true,
        user
      };
    } catch (e) {
      return {
        ok: false,
        error: "Network error. Check your connection."
      };
    }
  },
  // Simple hash for offline password verification (not cryptographic   just a fingerprint)
  // Immediate push then pull   call after any data write when online
  async syncNow(uid) {
    if (!navigator.onLine) return;
    await this.syncToServer(uid).catch(() => {});
    await new Promise(r => setTimeout(r, 800));
    await this.syncFromServer(uid).catch(() => {});
  },
  _hashPw(pw) {
    let h = 0;
    for (let i = 0; i < pw.length; i++) {
      h = Math.imul(31, h) + pw.charCodeAt(i) | 0;
    }
    return h.toString(36);
  },
  async signIn({
    email,
    password
  }) {
    const emailKey = email.trim().toLowerCase();

    // Try online first with a short timeout
    try {
      // AbortController with fallback for Android 6 / old browsers
      let signal = undefined;
      let timeout = null;
      if (typeof AbortController !== "undefined") {
        const controller = new AbortController();
        signal = controller.signal;
        timeout = setTimeout(() => controller.abort(), 20000); // 20s for Railway cold start
      }
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        }),
        ...(signal ? {
          signal
        } : {})
      });
      if (timeout) clearTimeout(timeout);
      const data = await res.json();
      if (!res.ok) return {
        ok: false,
        error: data.error || "Login failed."
      };
      const user = {
        ...data.user,
        uid: data.user._id
      };
      localStorage.setItem("rc_token", data.token);
      localStorage.setItem("rc_session", JSON.stringify(user));
      // Always update offline credentials on successful online login
      localStorage.setItem(`rc_offline_${emailKey}`, JSON.stringify({
        hash: AuthAPI._hashPw(password),
        uid: user.uid
      }));
      return {
        ok: true,
        user
      };
    } catch (e) {
      // Network failed or timed out   try offline fallback
      const offlineRec = (() => {
        try {
          return JSON.parse(localStorage.getItem(`rc_offline_${emailKey}`));
        } catch {
          return null;
        }
      })();
      const session = (() => {
        try {
          return JSON.parse(localStorage.getItem("rc_session"));
        } catch {
          return null;
        }
      })();
      const token = localStorage.getItem("rc_token");
      if (!offlineRec || !session || !token) {
        return {
          ok: false,
          error: "No internet connection. Please connect and log in for the first time."
        };
      }
      if (session.email?.toLowerCase() !== emailKey) {
        return {
          ok: false,
          error: "Incorrect email or password."
        };
      }
      if (offlineRec.hash !== AuthAPI._hashPw(password)) {
        return {
          ok: false,
          error: "Incorrect password."
        };
      }
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.exp * 1000 < Date.now()) {
          return {
            ok: false,
            error: "Your session expired. Please connect to the internet to log in again."
          };
        }
      } catch (ex) {
        return {
          ok: false,
          error: "Session error. Please connect and try again."
        };
      }
      return {
        ok: true,
        user: session,
        offline: true
      };
    }
  },
  async signOut() {
    // Clear business data from IDB on logout (not personal device? optional)
    // We keep rc_offline_* keys so user can log back in offline
    // Business data in IDB stays — re-populated on next login from server
    localStorage.removeItem("rc_token");
    localStorage.removeItem("rc_session");
    localStorage.removeItem("sl_user");
    localStorage.removeItem("rc_last_sync");
  },
  async resetPassword(email) {
    try {
      const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email
        })
      });
      const data = await res.json();
      return res.ok ? {
        ok: true,
        message: data.message
      } : {
        ok: false,
        error: data.error
      };
    } catch (e) {
      return {
        ok: false,
        error: "Network error. Check your connection."
      };
    }
  },
  // Sync all user data to backend
  async syncToServer(uid) {
    const token = localStorage.getItem("rc_token");
    if (!token || !navigator.onLine) return;
    try {
      // Read from IDB first, fall back to localStorage
      const read = async lsKey => {
        try {
          const idbVal = await IDB.get(lsKey);
          if (idbVal !== undefined && idbVal !== null) return idbVal;
        } catch {}
        try {
          const raw = localStorage.getItem(lsKey);
          return raw ? JSON.parse(raw) : null;
        } catch {
          return null;
        }
      };
      const [inv, sales, farm, entries, salesGroups, fields, debt] = await Promise.all([read(`sl_inv_${uid}`), read(`sl_shopsales_${uid}`),
      // Read all farm expenses (multi-farm: merge all farm-specific keys)
      (async () => {
        const farmsKey = `sl_farms_${uid}`;
        let farms = await IDB.get(farmsKey);
        if (!farms) {
          const r = localStorage.getItem(farmsKey);
          farms = r ? JSON.parse(r) : null;
        }
        if (farms && farms.length > 0) {
          const allExp = [];
          for (const f of farms) {
            const fkey = `sl_farm_${uid}_${f.id}`;
            let fe = await IDB.get(fkey);
            if (!fe) {
              const r = localStorage.getItem(fkey);
              fe = r ? JSON.parse(r) : [];
            }
            allExp.push(...(fe || []));
          }
          return allExp;
        }
        // Legacy single-farm key fallback
        const r = await IDB.get(`sl_farm_${uid}`);
        if (r !== undefined) return r;
        const raw = localStorage.getItem(`sl_farm_${uid}`);
        return raw ? JSON.parse(raw) : [];
      })(), read(`sl_sales_${uid}`), read(`sl_sales_groups_${uid}`), read(`sl_sales_fields_${uid}`), read(`sl_debt_${uid}`)]);

      // Low-bandwidth: only send if there's actual data
      const isStaff = (() => {
        try {
          return JSON.parse(localStorage.getItem("rc_session") || "{}").role === "staff";
        } catch {
          return false;
        }
      })();
      const payload = {
        inventory: inv || [],
        shopSales: sales || [],
        farmExpenses: isStaff ? undefined : farm || [],
        salesEntries: isStaff ? undefined : entries || [],
        salesGroups: isStaff ? undefined : salesGroups || [],
        salesFields: isStaff ? undefined : fields || null,
        debtRecords: isStaff ? undefined : debt || [],
        settings: {
          sector: localStorage.getItem("sl_sector"),
          darkMode: localStorage.getItem("sl_darkmode")
        },
        clientTs: new Date().toISOString(),
        // Include farm structure for multi-farm support
        farmStructure: (() => {
          try {
            const fk = `sl_farms_${uid}`;
            return JSON.parse(localStorage.getItem(fk)) || null;
          } catch {
            return null;
          }
        })()
      };

      // Guard: don't push empty data if we haven't pulled yet this session
      const _lastPull = localStorage.getItem("rc_last_sync");
      const _hasData = (payload.inventory || []).length > 0 || (payload.shopSales || []).length > 0 || (payload.farmExpenses || []).length > 0 || (payload.salesEntries || []).length > 0 || (payload.debtRecords || []).length > 0;
      if (!_hasData && !_lastPull) return; // empty + no pull yet = skip

      await fetch(`${API_URL}/api/data`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
    } catch (e) {/* silent — data safe locally */}
  },
  // Pull ALL data from server and restore to localStorage   triggers UI refresh
  async syncFromServer(uid) {
    const token = localStorage.getItem("rc_token");
    if (!token || !navigator.onLine) return;
    try {
      const res = await fetch(`${API_URL}/api/data`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!res.ok) return;
      const {
        data
      } = await res.json();
      if (!data) return;
      let changed = false;

      // Write to both localStorage (fast read) and IDB (primary store)
      const persist = async (key, val) => {
        try {
          localStorage.setItem(key, JSON.stringify(val));
        } catch {}
        await IDB.set(key, val).catch(() => {});
      };
      const safeApply = async (key, serverVal, label) => {
        if (serverVal === undefined || serverVal === null) return;
        try {
          let localVal = await IDB.get(key);
          if (localVal === undefined) {
            const raw = localStorage.getItem(key);
            localVal = raw ? JSON.parse(raw) : null;
          }

          // Server ALWAYS wins   it's the single source of truth
          // Exception: if server returns empty array but we have local data,
          // keep local (protects against Railway cold-start empty response)
          if (Array.isArray(serverVal) && Array.isArray(localVal)) {
            if (serverVal.length === 0 && localVal.length > 0) {
              SyncLog.add({
                type: "kept_local",
                label,
                localCount: localVal.length,
                serverCount: 0,
                reason: "Server returned empty — kept local"
              });
              return;
            }
            if (serverVal.length !== localVal.length) {
              SyncLog.add({
                type: "applied_server",
                label,
                localCount: localVal.length,
                serverCount: serverVal.length,
                reason: serverVal.length > localVal.length ? "Server has more records" : "Server has fewer records (deletion synced)"
              });
            }
          }
          const serverStr = JSON.stringify(serverVal);
          const localStr = JSON.stringify(localVal);
          if (localStr !== serverStr) {
            await persist(key, serverVal);
            changed = true;
          }
        } catch (e) {}
      };
      await Promise.all([safeApply(`sl_inv_${uid}`, data.inventory, "Inventory"), safeApply(`sl_shopsales_${uid}`, data.shopSales, "Shop Sales"), safeApply(`sl_farm_${uid}`, data.farmExpenses, "Farm Expenses"), safeApply(`sl_sales_${uid}`, data.salesEntries, "Customer Records"), safeApply(`sl_sales_fields_${uid}`, data.salesFields, "Sales Fields"), safeApply(`sl_debt_${uid}`, data.debtRecords, "Debt Records"), safeApply(`sl_sales_groups_${uid}`, data.salesGroups || [], "Sales Groups")]);
      if (data.settings?.darkMode !== undefined) {
        localStorage.setItem("sl_darkmode", data.settings.darkMode);
      }
      localStorage.setItem("rc_last_sync", new Date().toISOString());

      // Always fire update after pull so UI reflects server state on new devices
      window.dispatchEvent(new CustomEvent("rc_sync_update", {
        detail: {
          uid
        }
      }));
    } catch (e) {/* silent */}
  },
  // Internal fallback (kept for backward compat)
  _getAccounts() {
    try {
      return JSON.parse(localStorage.getItem("sl_accounts_v1")) || {};
    } catch {
      return {};
    }
  },
  _saveAccount() {}
};

// ===================== SECTOR TOUR CARDS =====================
const SECTOR_TOURS = {
  shop: {
    tagline: "Record a sale in 3 taps",
    steps: ["Tap + → Record Sale", "Pick item & quantity", "Sale saved instantly ✅"],
    gradient: "linear-gradient(135deg,#1E40AF,#2563EB)"
  },
  farm: {
    tagline: "Log any farm expense in seconds",
    steps: ["Tap + → Add Expense", "Enter amount & category", "See spend by category 📊"],
    gradient: "linear-gradient(135deg,#065F46,#059669)"
  },
  sales: {
    tagline: "Track every customer & deal",
    steps: ["Create custom fields", "Add a customer record", "Search & export anytime 📤"],
    gradient: "linear-gradient(135deg,#5B21B6,#7C3AED)"
  }
};
function SectorTourCards({
  selectedSectors,
  toggleSector
}) {
  const [expanded, setExpanded] = useState(null);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      marginBottom: 16
    }
  }, ALL_SECTORS.map(s => {
    const active = selectedSectors.includes(s.id);
    const tour = SECTOR_TOURS[s.id];
    const isOpen = expanded === s.id;
    return /*#__PURE__*/React.createElement("div", {
      key: s.id,
      style: {
        borderRadius: 14,
        overflow: "hidden",
        border: active ? `2px solid ${s.borderColor}` : `1.5px solid ${COLORS.border}`,
        transition: "all 0.18s",
        background: active ? s.color : COLORS.surface
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "13px 14px",
        cursor: "pointer"
      },
      onClick: () => toggleSector(s.id)
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 44,
        height: 44,
        borderRadius: 10,
        background: s.color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 22,
        flexShrink: 0
      }
    }, s.icon), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: COLORS.text
      }
    }, s.label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: COLORS.textMuted,
        marginTop: 1
      }
    }, s.desc)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6,
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: e => {
        e.stopPropagation();
        setExpanded(isOpen ? null : s.id);
      },
      style: {
        background: COLORS.bg,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 6,
        padding: "3px 8px",
        fontSize: 10,
        fontWeight: 700,
        color: COLORS.primary,
        cursor: "pointer",
        fontFamily: "'Inter',sans-serif",
        whiteSpace: "nowrap"
      }
    }, isOpen ? "Hide ▲" : "Preview ▾"), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 22,
        height: 22,
        borderRadius: "50%",
        border: active ? "none" : `1.5px solid ${COLORS.border}`,
        background: active ? COLORS.primary : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.15s"
      }
    }, active && /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 13
    })))), isOpen && /*#__PURE__*/React.createElement("div", {
      style: {
        background: tour.gradient,
        padding: "14px 16px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 800,
        color: "#fff",
        marginBottom: 10
      }
    }, "\u26A1 ", tour.tagline), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        alignItems: "center"
      }
    }, tour.steps.map((step, i) => /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        background: "rgba(255,255,255,0.15)",
        borderRadius: 10,
        padding: "8px",
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        fontWeight: 600,
        color: "rgba(255,255,255,0.7)",
        marginBottom: 3
      }
    }, "Step ", i + 1), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: "#fff",
        lineHeight: 1.4
      }
    }, step)), i < tour.steps.length - 1 && /*#__PURE__*/React.createElement("div", {
      style: {
        color: "rgba(255,255,255,0.5)",
        fontSize: 16,
        flexShrink: 0
      }
    }, "\u203A"))))));
  }));
}
function SignupScreen({
  onAuth,
  onNavigate
}) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    password: "",
    confirm: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [sectorError, setSectorError] = useState("");
  const setField = (field, val) => {
    setForm(p => ({
      ...p,
      [field]: val
    }));
    setErrors(p => ({
      ...p,
      [field]: null
    }));
  };
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";else if (!isAlphaName(form.name)) e.name = "Name can only contain letters, spaces, hyphens or apostrophes";
    if (!form.email.trim()) e.email = "Email address is required";else if (!isValidEmail(form.email)) e.email = "Enter a valid email address (e.g. you@example.com)";else if (AuthAPI._getAccounts()[form.email.trim().toLowerCase()]) e.email = "An account with this email already exists";
    if (form.phone.length < 7) e.phone = "Enter a valid phone number";
    if (!form.location.trim()) e.location = "Business location is required";
    if (form.password.length < 6) e.password = "Password must be at least 6 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords do not match";
    return e;
  };
  const goToSectorStep = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setStep(2);
  };
  const toggleSector = id => {
    setSectorError("");
    setSelectedSectors(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };
  const submit = async () => {
    if (selectedSectors.length === 0) {
      setSectorError("Please select at least one sector to continue.");
      return;
    }
    setLoading(true);
    try {
      const result = await AuthAPI.signUp({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone,
        location: form.location.trim(),
        password: form.password,
        sectors: selectedSectors
      });
      if (!result.ok) {
        setErrors({
          email: result.error
        });
        setLoading(false);
        return;
      }
      if (result.message) alert(result.message);
      onAuth(result.user, selectedSectors, true);
    } catch (e) {
      setErrors({
        email: e.message || "Sign up failed. Please try again."
      });
      setLoading(false);
    }
  };
  if (step === 2) return /*#__PURE__*/React.createElement("div", {
    className: "welcome-screen",
    style: {
      justifyContent: "flex-start",
      paddingTop: "2rem",
      paddingBottom: "2rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "auth-card",
    style: {
      maxWidth: 420
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setStep(1),
    style: {
      background: "none",
      border: "none",
      color: COLORS.textMuted,
      marginBottom: 14,
      display: "flex",
      alignItems: "center",
      gap: 6,
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "back",
    size: 16
  }), " Back"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      marginBottom: 4
    }
  }, "\uD83D\uDDC2\uFE0F"), /*#__PURE__*/React.createElement("div", {
    className: "auth-title",
    style: {
      marginTop: 4
    }
  }, "Pick your sectors"), /*#__PURE__*/React.createElement("div", {
    className: "auth-sub"
  }, "Tap a sector to see what it does \u2014 then select the ones you need."), sectorError && /*#__PURE__*/React.createElement("div", {
    style: {
      background: COLORS.dangerLight,
      color: COLORS.danger,
      borderRadius: 8,
      padding: "8px 12px",
      fontSize: 13,
      marginBottom: 12,
      fontWeight: 500
    }
  }, sectorError), /*#__PURE__*/React.createElement(SectorTourCards, {
    selectedSectors: selectedSectors,
    toggleSector: toggleSector
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: COLORS.primaryLight,
      borderRadius: 8,
      padding: "8px 12px",
      fontSize: 12,
      color: COLORS.primary,
      marginBottom: 14,
      display: "flex",
      gap: 6,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCA1"), /*#__PURE__*/React.createElement("span", null, "You can add or remove sectors any time from your profile settings.")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: submit,
    disabled: loading || selectedSectors.length === 0,
    style: {
      opacity: selectedSectors.length === 0 ? 0.5 : 1
    }
  }, loading ? "Creating account…" : selectedSectors.length === 0 ? "Select at least one sector" : `Finish — ${selectedSectors.length} sector${selectedSectors.length > 1 ? "s" : ""} selected ✓`), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginTop: 10,
      fontSize: 12,
      color: COLORS.textLight
    }
  }, "Step 2 of 2")));
  return /*#__PURE__*/React.createElement("div", {
    className: "welcome-screen",
    style: {
      justifyContent: "flex-start",
      paddingTop: "2.5rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "auth-card"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onNavigate("welcome"),
    style: {
      background: "none",
      border: "none",
      color: COLORS.textMuted,
      marginBottom: 12,
      display: "flex",
      alignItems: "center",
      gap: 6,
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "back",
    size: 16
  }), " Back"), /*#__PURE__*/React.createElement("div", {
    className: "auth-title"
  }, "Create Account"), /*#__PURE__*/React.createElement("div", {
    className: "auth-sub"
  }, "Fill in your details to get started"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 3,
      borderRadius: 2,
      background: COLORS.primary
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 3,
      borderRadius: 2,
      background: COLORS.border
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Full Name"), /*#__PURE__*/React.createElement("input", {
    className: `form-input${errors.name ? " error" : ""}`,
    type: "text",
    placeholder: "Adaeze Okonkwo",
    value: form.name,
    onChange: e => {
      const val = e.target.value.replace(/[^a-zA-Z\s'\-]/g, "");
      setField("name", val);
    }
  }), errors.name && /*#__PURE__*/React.createElement("div", {
    className: "form-error"
  }, errors.name)), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Email Address"), /*#__PURE__*/React.createElement("input", {
    className: `form-input${errors.email ? " error" : ""}`,
    type: "email",
    placeholder: "you@example.com",
    value: form.email,
    onChange: e => setField("email", e.target.value)
  }), errors.email && /*#__PURE__*/React.createElement("div", {
    className: "form-error"
  }, errors.email)), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Phone Number"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("select", {
    className: "form-input",
    style: {
      width: 80,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("option", null, "+234"), /*#__PURE__*/React.createElement("option", null, "+233"), /*#__PURE__*/React.createElement("option", null, "+254"), /*#__PURE__*/React.createElement("option", null, "+256")), /*#__PURE__*/React.createElement("input", {
    className: `form-input${errors.phone ? " error" : ""}`,
    placeholder: "8012345678",
    value: form.phone,
    onChange: e => setField("phone", e.target.value)
  })), errors.phone && /*#__PURE__*/React.createElement("div", {
    className: "form-error"
  }, errors.phone)), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Business Location"), /*#__PURE__*/React.createElement("input", {
    className: `form-input${errors.location ? " error" : ""}`,
    type: "text",
    placeholder: "e.g. Lagos, Abuja, Port Harcourt",
    value: form.location,
    onChange: e => setField("location", e.target.value)
  }), errors.location && /*#__PURE__*/React.createElement("div", {
    className: "form-error"
  }, errors.location)), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Password"), /*#__PURE__*/React.createElement("input", {
    className: `form-input${errors.password ? " error" : ""}`,
    type: "password",
    placeholder: "At least 6 characters",
    value: form.password,
    onChange: e => setField("password", e.target.value)
  }), errors.password && /*#__PURE__*/React.createElement("div", {
    className: "form-error"
  }, errors.password)), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Confirm Password"), /*#__PURE__*/React.createElement("input", {
    className: `form-input${errors.confirm ? " error" : ""}`,
    type: "password",
    placeholder: "Repeat your password",
    value: form.confirm,
    onChange: e => setField("confirm", e.target.value)
  }), errors.confirm && /*#__PURE__*/React.createElement("div", {
    className: "form-error"
  }, errors.confirm)), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: goToSectorStep,
    style: {
      marginTop: 4
    }
  }, "Next \u2014 Choose Sectors \u2192"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginTop: 10,
      fontSize: 12,
      color: COLORS.textLight
    }
  }, "Step 1 of 2"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginTop: 8,
      fontSize: 13,
      color: COLORS.textMuted
    }
  }, "Already have an account? ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: COLORS.primary,
      cursor: "pointer",
      fontWeight: 600
    },
    onClick: () => onNavigate("login")
  }, "Log in"))));
}
function LoginScreen({
  onAuth,
  onNavigate
}) {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [forgot, setForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMsg, setForgotMsg] = useState("");
  const setField = (field, val) => {
    setForm(p => ({
      ...p,
      [field]: val
    }));
    setError("");
  };
  const submit = async () => {
    if (!form.email.trim() || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    if (!isValidEmail(form.email)) {
      setError("Enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const result = await AuthAPI.signIn({
        email: form.email.trim(),
        password: form.password
      });
      if (!result.ok) {
        setLoading(false);
        setError(result.error || "Login failed. Please try again.");
        return;
      }
      if (result.offline) {
        // Show brief offline notice but still log them in
        setError(""); // clear any error
      }
      onAuth(result.user, result.user.sectors);
    } catch (e) {
      setLoading(false);
      setError(e.message || "Login failed. Please try again.");
    }
  };
  const handleForgot = async () => {
    if (!forgotEmail.trim() || !isValidEmail(forgotEmail)) {
      setForgotMsg("Enter a valid email address.");
      return;
    }
    const result = await AuthAPI.resetPassword(forgotEmail.trim());
    if (result.ok) setForgotMsg(USE_FIREBASE ? "Password reset email sent! Check your inbox." : "Password hint: no real email in local mode. Reset coming when backend is active.");else setForgotMsg(result.error || "No account found with that email.");
  };
  if (forgot) return /*#__PURE__*/React.createElement("div", {
    className: "welcome-screen",
    style: {
      justifyContent: "flex-start",
      paddingTop: "3rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "auth-card"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setForgot(false);
      setForgotMsg("");
      setForgotEmail("");
    },
    style: {
      background: "none",
      border: "none",
      color: COLORS.textMuted,
      marginBottom: 12,
      display: "flex",
      alignItems: "center",
      gap: 6,
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "back",
    size: 16
  }), " Back"), /*#__PURE__*/React.createElement("div", {
    className: "auth-title"
  }, "Reset Password"), /*#__PURE__*/React.createElement("div", {
    className: "auth-sub"
  }, "Enter your registered email address"), forgotMsg && /*#__PURE__*/React.createElement("div", {
    style: {
      background: forgotMsg.startsWith("No") || forgotMsg.startsWith("Enter") ? COLORS.dangerLight : COLORS.accentLight,
      color: forgotMsg.startsWith("No") || forgotMsg.startsWith("Enter") ? COLORS.danger : COLORS.accent,
      borderRadius: 8,
      padding: "8px 12px",
      fontSize: 13,
      marginBottom: 12
    }
  }, forgotMsg), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Email Address"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    type: "email",
    placeholder: "you@example.com",
    value: forgotEmail,
    onChange: e => {
      setForgotEmail(e.target.value);
      setForgotMsg("");
    }
  })), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: handleForgot
  }, "Check Account")));
  return /*#__PURE__*/React.createElement("div", {
    className: "welcome-screen",
    style: {
      padding: 0,
      justifyContent: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2.5rem 2rem 1.5rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 36,
      marginBottom: 12
    }
  }, "\uD83D\uDC4B"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Space Mono', monospace",
      fontSize: 20,
      fontWeight: 700,
      marginBottom: 6
    }
  }, "Welcome back"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      opacity: 0.75,
      textAlign: "center"
    }
  }, "Sign in to your Record Chief account")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      padding: "0 20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 24,
      padding: "28px 24px 36px",
      width: "100%",
      maxWidth: 400,
      marginBottom: 32,
      boxShadow: "0 8px 40px rgba(15,23,42,0.18)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onNavigate("welcome"),
    style: {
      background: "none",
      border: "none",
      color: COLORS.textMuted,
      marginBottom: 16,
      display: "flex",
      alignItems: "center",
      gap: 6,
      fontSize: 13,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "back",
    size: 16
  }), " Back"), error && /*#__PURE__*/React.createElement("div", {
    style: {
      background: error.includes("waking up") || error.includes("too long") ? "#FEF3C7" : COLORS.dangerLight,
      color: error.includes("waking up") || error.includes("too long") ? "#92400E" : COLORS.danger,
      borderRadius: 10,
      padding: "10px 14px",
      fontSize: 13,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("span", null, error.includes("waking up") || error.includes("too long") ? "⏳" : "⚠️"), /*#__PURE__*/React.createElement("span", {
    style: {
      lineHeight: 1.5
    }
  }, error)), (error.includes("waking up") || error.includes("too long")) && /*#__PURE__*/React.createElement("button", {
    onClick: submit,
    disabled: loading,
    style: {
      marginTop: 10,
      background: "#2563EB",
      color: "#fff",
      border: "none",
      borderRadius: 8,
      padding: "8px 16px",
      fontSize: 13,
      fontWeight: 700,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      width: "100%"
    }
  }, "\uD83D\uDD04 Try Again")), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Email Address"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    type: "email",
    placeholder: "you@example.com",
    value: form.email,
    onChange: e => setField("email", e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Password"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    type: "password",
    placeholder: "Your password",
    value: form.password,
    onChange: e => setField("password", e.target.value),
    onKeyDown: e => e.key === "Enter" && submit()
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "right",
      marginTop: -6,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: COLORS.primary,
      cursor: "pointer",
      fontWeight: 500
    },
    onClick: () => setForgot(true)
  }, "Forgot password?")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: submit,
    disabled: loading,
    style: {
      fontSize: 15,
      padding: "13px"
    }
  }, loading ? "Signing in…" : "Sign In"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginTop: 16,
      fontSize: 13,
      color: COLORS.textMuted
    }
  }, "New here? ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: COLORS.primary,
      cursor: "pointer",
      fontWeight: 700
    },
    onClick: () => onNavigate("signup")
  }, "Create free account")))));
}

// ===================== HOME (SECTOR PICKER) =====================
function HomeScreen({
  user,
  sector,
  onSetSector,
  onManageSectors,
  onViewOverview,
  onViewDebt
}) {
  const userSectors = user.role === "staff" ? ["shop"] : user.sectors && user.sectors.length > 0 ? user.sectors : ["shop"];
  const activeSectors = ALL_SECTORS.filter(s => userSectors.includes(s.id));
  const avatarKey = `sl_avatar_${user.uid}`;
  const storedAvatar = (() => {
    try {
      return JSON.parse(localStorage.getItem(avatarKey));
    } catch {
      return null;
    }
  })();
  const initials = user.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
  const hour = new Date().getHours();
  const greeting = hour < 5 ? "Good night" : hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const greetEmoji = hour < 5 ? "🌙" : hour < 12 ? "☀️" : hour < 17 ? "🌤️" : "🌙";
  const today = new Date().toLocaleDateString("en-NG", {
    weekday: "long",
    day: "numeric",
    month: "long"
  });

  // Quick stats
  const invKey = `sl_inv_${user.uid}`;
  const salesKey = `sl_shopsales_${user.uid}`;
  const debtKey = `sl_debt_${user.uid}`;
  const inv = (() => {
    try {
      return JSON.parse(localStorage.getItem(invKey)) || [];
    } catch {
      return [];
    }
  })();
  const sales = (() => {
    try {
      return JSON.parse(localStorage.getItem(salesKey)) || [];
    } catch {
      return [];
    }
  })();
  const debts = (() => {
    try {
      return JSON.parse(localStorage.getItem(debtKey)) || [];
    } catch {
      return [];
    }
  })();
  const todaySales = sales.filter(s => s.date === TODAY()).reduce((a, s) => a + (s.total || 0), 0);
  const outstanding = debts.filter(r => !r.settled).length;
  const overdue = debts.filter(r => !r.settled && r.dueDate && r.dueDate < TODAY()).length;
  const lowStock = inv.filter(i => i.stock < 5).length;
  const sectorGradients = {
    shop: "linear-gradient(135deg, #1E40AF 0%, #2563EB 100%)",
    farm: "linear-gradient(135deg, #065F46 0%, #059669 100%)",
    sales: "linear-gradient(135deg, #5B21B6 0%, #7C3AED 100%)",
    debt: overdue > 0 ? "linear-gradient(135deg, #991B1B 0%, #DC2626 100%)" : "linear-gradient(135deg, #1E3A8A 0%, #4338CA 100%)"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 55%, #0F766E 100%)",
      borderRadius: 22,
      padding: "22px 18px 18px",
      marginBottom: "1rem",
      position: "relative",
      overflow: "hidden",
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: -30,
      right: -30,
      width: 110,
      height: 110,
      borderRadius: "50%",
      background: "rgba(255,255,255,0.06)",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: -20,
      left: -20,
      width: 80,
      height: 80,
      borderRadius: "50%",
      background: "rgba(255,255,255,0.04)",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 10,
      right: 80,
      width: 50,
      height: 50,
      borderRadius: "50%",
      background: "rgba(255,255,255,0.04)",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 48,
      borderRadius: "50%",
      background: "rgba(255,255,255,0.18)",
      border: "2px solid rgba(255,255,255,0.35)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 700,
      fontSize: 17,
      overflow: "hidden",
      flexShrink: 0
    }
  }, storedAvatar ? /*#__PURE__*/React.createElement("img", {
    src: storedAvatar,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    },
    alt: ""
  }) : initials), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      opacity: 0.75,
      fontWeight: 500
    }
  }, greeting, " ", greetEmoji), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 800,
      marginTop: 1,
      letterSpacing: "-0.3px"
    }
  }, user.name.split(" ")[0])), /*#__PURE__*/React.createElement("button", {
    onClick: onViewOverview,
    style: {
      background: "rgba(255,255,255,0.15)",
      border: "1.5px solid rgba(255,255,255,0.3)",
      borderRadius: 12,
      padding: "8px 12px",
      color: "#fff",
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 3,
      transition: "background 0.15s",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18
    }
  }, "\uD83D\uDCCA"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      fontWeight: 800,
      letterSpacing: "0.06em",
      opacity: 0.9
    }
  }, "OVERVIEW"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 8
    }
  }, [{
    label: "Today's Sales",
    value: todaySales > 0 ? NAIRA(todaySales) : "₦0",
    icon: "💰",
    color: "rgba(255,255,255,0.9)"
  }, {
    label: "Outstanding",
    value: outstanding > 0 ? `${outstanding} record${outstanding !== 1 ? "s" : ""}` : "All clear",
    icon: "🤝",
    color: outstanding > 0 ? "#FCD34D" : "rgba(255,255,255,0.9)"
  }, {
    label: "Low Stock",
    value: lowStock > 0 ? `${lowStock} item${lowStock !== 1 ? "s" : ""}` : "All good",
    icon: "📦",
    color: lowStock > 0 ? "#FCA5A5" : "rgba(255,255,255,0.9)"
  }].map((stat, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: "rgba(255,255,255,0.1)",
      borderRadius: 12,
      padding: "10px 10px 8px",
      border: "1px solid rgba(255,255,255,0.12)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      marginBottom: 4
    }
  }, stat.icon), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 800,
      color: stat.color,
      lineHeight: 1.2
    }
  }, stat.value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      opacity: 0.65,
      marginTop: 3,
      fontWeight: 500
    }
  }, stat.label)))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      opacity: 0.5,
      marginTop: 12,
      display: "flex",
      alignItems: "center",
      gap: 5
    }
  }, "\uD83D\uDCC5 ", today, user.location && /*#__PURE__*/React.createElement(React.Fragment, null, " \xB7 \uD83D\uDCCD ", user.location))), /*#__PURE__*/React.createElement(NotificationBanner, {
    user: user
  }), !navigator.onLine && (() => {
    const lastExportKey = `sl_lastexport_${user?.uid}`;
    const lastExport = localStorage.getItem(lastExportKey);
    const daysSince = lastExport ? Math.floor((Date.now() - new Date(lastExport)) / 86400000) : 999;
    if (daysSince < 7) return null;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--primary-light)",
        border: `1.5px solid var(--primary)`,
        borderRadius: 12,
        padding: "10px 14px",
        marginBottom: "0.75rem",
        display: "flex",
        alignItems: "center",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 20,
        flexShrink: 0
      }
    }, "\u2601\uFE0F"), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: "var(--primary)"
      }
    }, lastExport ? `No export in ${daysSince} days` : "No local backup yet"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "var(--text-muted)",
        marginTop: 1
      }
    }, "Export your records to keep a local copy.")), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setShowExport(true);
        localStorage.setItem(lastExportKey, new Date().toISOString());
      },
      style: {
        flexShrink: 0,
        background: "var(--primary)",
        color: "#fff",
        border: "none",
        borderRadius: 8,
        padding: "6px 12px",
        fontSize: 12,
        fontWeight: 700,
        cursor: "pointer",
        fontFamily: "'Inter', sans-serif"
      }
    }, "Export"));
  })(), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "0.7rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-title",
    style: {
      margin: 0
    }
  }, "Your Sectors"), /*#__PURE__*/React.createElement("button", {
    onClick: onManageSectors,
    style: {
      background: "none",
      border: "none",
      color: "var(--primary)",
      fontSize: 12,
      fontWeight: 600,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      display: "flex",
      alignItems: "center",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "settings",
    size: 13
  }), " Manage")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10,
      marginBottom: "1rem"
    }
  }, activeSectors.map(s => /*#__PURE__*/React.createElement("button", {
    key: s.id,
    onClick: () => onSetSector(s.id),
    style: {
      borderRadius: 18,
      padding: "18px 14px",
      background: sectorGradients[s.id] || sectorGradients.shop,
      border: "none",
      cursor: "pointer",
      transition: "all 0.18s",
      boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
      textAlign: "left",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: -16,
      right: -16,
      width: 60,
      height: 60,
      borderRadius: "50%",
      background: "rgba(255,255,255,0.08)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 30,
      marginBottom: 10
    }
  }, s.icon), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 800,
      color: "#fff",
      lineHeight: 1.3
    }
  }, s.id === "sales" ? "Sales Rep" : s.id === "shop" ? "Shop Sales" : s.id === "farm" ? "Farm Records" : s.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "rgba(255,255,255,0.65)",
      marginTop: 4,
      lineHeight: 1.4
    }
  }, s.desc.split("—")[0].trim()))), activeSectors.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: "1 / -1",
      textAlign: "center",
      padding: "2rem",
      color: "var(--text-muted)",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 36,
      marginBottom: 8
    }
  }, "\uD83D\uDDC2\uFE0F"), "Tap Manage to select your sectors"), user.role !== "staff" && /*#__PURE__*/React.createElement("button", {
    onClick: onViewDebt,
    style: {
      gridColumn: "1 / -1",
      borderRadius: 18,
      padding: "16px 18px",
      background: sectorGradients.debt,
      border: "none",
      cursor: "pointer",
      transition: "all 0.18s",
      boxShadow: `0 4px 16px ${overdue > 0 ? "rgba(220,38,38,0.3)" : "rgba(79,70,229,0.25)"}`,
      display: "flex",
      alignItems: "center",
      gap: 14,
      textAlign: "left",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: -20,
      right: -20,
      width: 70,
      height: 70,
      borderRadius: "50%",
      background: "rgba(255,255,255,0.07)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 46,
      height: 46,
      borderRadius: 13,
      background: "rgba(255,255,255,0.18)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 24,
      flexShrink: 0
    }
  }, "\uD83E\uDD1D"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 800,
      color: "#fff"
    }
  }, "Debt & Credit"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "rgba(255,255,255,0.65)",
      marginTop: 3
    }
  }, outstanding > 0 ? `${outstanding} outstanding record${outstanding !== 1 ? "s" : ""}` : "No outstanding records")), overdue > 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(255,255,255,0.22)",
      color: "#fff",
      borderRadius: 20,
      padding: "4px 12px",
      fontSize: 12,
      fontWeight: 800,
      flexShrink: 0
    }
  }, "\u26A0\uFE0F ", overdue, " overdue") : /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(255,255,255,0.15)",
      color: "rgba(255,255,255,0.8)",
      borderRadius: 20,
      padding: "4px 12px",
      fontSize: 11,
      fontWeight: 600,
      flexShrink: 0
    }
  }, "View \u2192"))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginTop: "1rem",
      padding: "14px 16px",
      background: "var(--surface)",
      borderRadius: 16,
      border: "1px solid var(--border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: "var(--text)",
      marginBottom: 3
    }
  }, "\uD83D\uDCD2 Record Chief"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "var(--text-muted)",
      letterSpacing: "0.01em"
    }
  }, "Your business records, always organized")));
}

// ===================== SALES REP MODE =====================
function SalesRepScreen({
  user
}) {
  const storageKey = `sl_sales_${user.uid}`;
  const fieldsKey = `sl_sales_fields_${user.uid}`;
  const groupsKey = `sl_sales_groups_${user.uid}`;
  const [groups, setGroups] = useLocalState(groupsKey, []);
  const [entries, setEntries] = useLocalState(storageKey, []);
  const [fields, setFields] = useLocalState(fieldsKey, null);
  const defaultFields = [{
    id: "f_date",
    name: "Date",
    type: "Date"
  }, {
    id: "f_notes",
    name: "Notes",
    type: "Text"
  }];
  const activeFields = fields || defaultFields;
  const orderedFields = activeFields;
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);
  const [setupMode, setSetupMode] = useState(!fields);
  const [draftFields, setDraftFields] = useState([]);
  const [showExport, setShowExport] = useState(false);
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [showManageFields, setShowManageFields] = useState(false);
  const [viewEntry, setViewEntry] = useState(null);
  const [newGroupName, setNewGroupName] = useState("");
  const [showNewGroup, setShowNewGroup] = useState(false);
  const [sortBy, setSortBy] = useState("date_desc");
  const showToast = (msg, type = "success") => setToast({
    msg,
    type
  });
  const createNewGroup = () => {
    const name = newGroupName.trim() || `Group ${(groups || []).length + 1}`;
    if (entries.length > 0 || fields) {
      const archived = {
        id: uid(),
        name,
        fields: fields || defaultFields,
        entries,
        createdAt: TS()
      };
      setGroups(prev => [archived, ...(prev || [])]);
    }
    setEntries([]);
    setFields(null);
    setForm({});
    setSetupMode(true);
    setNewGroupName("");
    setShowNewGroup(false);
    showToast(`"${name}" archived. Set up fields for new group.`);
  };
  const saveCurrentFields = combined => {
    setFields(combined);
    setDraftFields([]);
    setSetupMode(false);
    setShowManageFields(false);
    setShowEntryForm(false);
    showToast("Fields saved!");
  };
  const saveEntry = () => {
    const e = {};
    activeFields.forEach(f => {
      if (!form[f.id] && f.id !== "f_notes" && f.id !== "f_date") e[f.id] = `${f.name} is required`;
    });
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    const entry = {
      id: editId || uid(),
      ...form,
      createdAt: editId ? entries.find(x => x.id === editId)?.createdAt || TS() : TS()
    };
    if (editId) {
      setEntries(prev => prev.map(x => x.id === editId ? entry : x));
      setEditId(null);
      showToast("Entry updated!");
    } else {
      setEntries(prev => [entry, ...prev]);
      showToast("Record saved!");
    }
    setForm({});
    setErrors({});
    setShowEntryForm(false);
  };
  const deleteEntry = id => {
    setEntries(prev => prev.filter(e => e.id !== id));
    showToast("Deleted", "error");
  };
  const openEdit = entry => {
    setEditId(entry.id);
    setForm({
      ...entry
    });
    setShowEntryForm(true);
    setSetupMode(false);
    setShowManageFields(false);
  };
  const dateId = activeFields.find(f => f.type === "Date")?.id || "f_date";
  const firstId = orderedFields[0]?.id;
  const filtered = [...entries].filter(e => !search || JSON.stringify(e).toLowerCase().includes(search.toLowerCase())).sort((a, b) => {
    if (sortBy === "date_asc") return (a[dateId] || "") < (b[dateId] || "") ? -1 : 1;
    if (sortBy === "name_asc") return (a[firstId] || "").localeCompare(b[firstId] || "");
    if (sortBy === "name_desc") return (b[firstId] || "").localeCompare(a[firstId] || "");
    return (a[dateId] || a.createdAt || "") > (b[dateId] || b.createdAt || "") ? -1 : 1; // date_desc default
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 80
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "0.75rem"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      color: "var(--text)"
    }
  }, "\uD83D\uDC65 Customer Records"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-muted)"
    }
  }, entries.length, " record", entries.length !== 1 ? "s" : "", (groups || []).length > 0 ? ` · ${groups.length} archived group${groups.length !== 1 ? "s" : ""}` : "")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-success btn-sm",
    onClick: () => setShowExport(true)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "download",
    size: 14
  }), " Export"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowNewGroup(true),
    style: {
      background: "var(--primary-light)",
      color: "var(--primary)",
      border: "none",
      padding: "6px 12px",
      borderRadius: 8,
      fontSize: 12,
      fontWeight: 700,
      cursor: "pointer",
      fontFamily: "'Inter',sans-serif"
    }
  }, "+ New Group"))), (groups || []).length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      overflowX: "auto",
      marginBottom: "0.75rem",
      paddingBottom: 4,
      scrollbarWidth: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      padding: "5px 12px",
      borderRadius: 20,
      background: "var(--primary)",
      color: "#fff",
      fontSize: 12,
      fontWeight: 700
    }
  }, "\uD83D\uDCCB Current"), (groups || []).map(grp => /*#__PURE__*/React.createElement("div", {
    key: grp.id,
    style: {
      flexShrink: 0,
      padding: "5px 12px",
      borderRadius: 20,
      background: "var(--surface)",
      border: "1px solid var(--border)",
      fontSize: 12,
      fontWeight: 600,
      color: "var(--text-muted)",
      whiteSpace: "nowrap"
    }
  }, "\uD83D\uDCC1 ", grp.name, " (", (grp.entries || []).length, ")"))), setupMode && !showEntryForm && /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      textAlign: "center",
      padding: "1.5rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 32,
      marginBottom: 8
    }
  }, "\uD83D\uDEE0\uFE0F"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: "var(--text)",
      marginBottom: 6
    }
  }, "Set up your record fields"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-muted)",
      marginBottom: 14,
      lineHeight: 1.6
    }
  }, "Define the columns for this group (e.g. Name, Product, Amount)."), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => {
      setSetupMode(true);
      setDraftFields([{
        id: uid(),
        name: "",
        type: "Text"
      }]);
      setShowEntryForm(true);
    }
  }, "\u2699\uFE0F Set Up Fields")), fields && !setupMode && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: "0.6rem",
      flexWrap: "wrap"
    }
  }, activeFields.filter(f => f.id !== "f_notes" && f.id !== "f_date").map(f => /*#__PURE__*/React.createElement("span", {
    key: f.id,
    style: {
      background: "var(--bg)",
      border: "1px solid var(--border)",
      borderRadius: 6,
      padding: "3px 8px",
      fontSize: 11,
      fontWeight: 600,
      color: "var(--text-muted)"
    }
  }, f.name)), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setDraftFields(activeFields.filter(f => f.id !== "f_date" && f.id !== "f_notes"));
      setShowManageFields(true);
      setShowEntryForm(true);
      setSetupMode(false);
    },
    style: {
      background: "none",
      border: "none",
      color: "var(--primary)",
      fontSize: 12,
      fontWeight: 600,
      cursor: "pointer",
      fontFamily: "'Inter',sans-serif"
    }
  }, "\u270F\uFE0F Edit fields")), fields && !setupMode && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SmartSearch, {
    value: search,
    onChange: setSearch,
    placeholder: "Search records\u2026",
    resultCount: filtered.length
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "0.75rem"
    }
  }, /*#__PURE__*/React.createElement("select", {
    value: sortBy,
    onChange: e => setSortBy(e.target.value),
    className: "form-input",
    style: {
      padding: "9px 12px",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "date_desc"
  }, "\uD83D\uDCC5 Newest date"), /*#__PURE__*/React.createElement("option", {
    value: "date_asc"
  }, "\uD83D\uDCC5 Oldest date"), /*#__PURE__*/React.createElement("option", {
    value: "name_asc"
  }, "\uD83D\uDD24 A \u2192 Z"), /*#__PURE__*/React.createElement("option", {
    value: "name_desc"
  }, "\uD83D\uDD24 Z \u2192 A")))), (groups || []).map(grp => {
    const gFields = grp.fields || defaultFields;
    const gFirst = gFields[0];
    const grpFiltered = (grp.entries || []).filter(e => !search || JSON.stringify(e).toLowerCase().includes(search.toLowerCase()));
    if (grpFiltered.length === 0 && search) return null;
    return /*#__PURE__*/React.createElement("div", {
      key: grp.id,
      style: {
        marginBottom: "1rem"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 700,
        color: "var(--text-muted)",
        textTransform: "uppercase",
        letterSpacing: "0.06em"
      }
    }, "\uD83D\uDCC1 ", grp.name, " \xB7 ", (grp.entries || []).length, " record", (grp.entries || []).length !== 1 ? "s" : ""), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setGroups(prev => (prev || []).filter(g => g.id !== grp.id));
        showToast(`"${grp.name}" deleted`, "error");
      },
      style: {
        background: "none",
        border: "none",
        color: COLORS.danger,
        fontSize: 11,
        cursor: "pointer",
        fontFamily: "'Inter',sans-serif"
      }
    }, "Delete group")), /*#__PURE__*/React.createElement("div", {
      className: "card",
      style: {
        padding: 0,
        overflow: "hidden"
      }
    }, grpFiltered.slice(0, 5).map((e, i) => /*#__PURE__*/React.createElement("div", {
      key: e.id || i,
      style: {
        padding: "10px 14px",
        borderBottom: i < Math.min(grpFiltered.length, 5) - 1 ? `0.5px solid var(--border)` : "none",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        color: "var(--text)"
      }
    }, gFirst ? e[gFirst.id] || "—" : "—"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "var(--text-muted)",
        marginTop: 2
      }
    }, gFields.slice(1, 3).map(f => e[f.id]).filter(Boolean).join(" · "))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "var(--text-muted)"
      }
    }, e.f_date || ""))), grpFiltered.length > 5 && /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "8px 14px",
        fontSize: 12,
        color: "var(--primary)",
        fontWeight: 600
      }
    }, "+", grpFiltered.length - 5, " more")));
  }), fields && !setupMode && /*#__PURE__*/React.createElement(React.Fragment, null, (groups || []).length > 0 && entries.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: "var(--text-muted)",
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      marginBottom: 8
    }
  }, "\uD83D\uDCCB Current Records"), filtered.length === 0 && entries.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "empty-state"
  }, /*#__PURE__*/React.createElement("div", {
    className: "empty-icon"
  }, "\uD83D\uDC65"), /*#__PURE__*/React.createElement("h3", null, "No records yet"), /*#__PURE__*/React.createElement("p", null, "Tap + to add your first record")) : filtered.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "empty-state"
  }, /*#__PURE__*/React.createElement("h3", null, "No results"), /*#__PURE__*/React.createElement("p", null, "Try a different search")) : /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, filtered.map(entry => {
    const customFields = activeFields.filter(f => f.id !== "f_date" && f.id !== "f_notes");
    const mainF = customFields[0] || activeFields[0];
    const subF = customFields[1] || activeFields[1];
    const amtF = customFields.find(f => f.type === "Number");
    const dtF = activeFields.find(f => f.type === "Date") || {
      id: "f_date"
    };
    return /*#__PURE__*/React.createElement("div", {
      key: entry.id,
      className: "entry-row"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 36,
        height: 36,
        borderRadius: 10,
        background: "var(--primary-light)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 16,
        fontWeight: 700,
        color: "var(--primary)",
        flexShrink: 0
      }
    }, String(entry[mainF?.id] || "?")[0]?.toUpperCase() || "?"), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "entry-title"
    }, entry[mainF?.id] || "—"), /*#__PURE__*/React.createElement("div", {
      className: "entry-sub"
    }, [entry[subF?.id], entry[dtF.id]].filter(Boolean).join(" · "))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 4,
        flexShrink: 0
      }
    }, amtF && entry[amtF.id] && /*#__PURE__*/React.createElement("div", {
      className: "entry-amount"
    }, NAIRA(entry[amtF.id])), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 4
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setViewEntry(entry),
      style: {
        background: "var(--primary-light)",
        color: "var(--primary)",
        border: "none",
        padding: "5px 9px",
        borderRadius: 7,
        fontSize: 12,
        fontWeight: 700,
        cursor: "pointer"
      }
    }, "View"), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-sm btn-outline",
      onClick: () => openEdit(entry)
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "edit",
      size: 13
    })), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-sm btn-danger",
      onClick: () => deleteEntry(entry.id)
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "trash",
      size: 13
    })))));
  }))), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      if (!fields) {
        setSetupMode(true);
        setDraftFields([{
          id: uid(),
          name: "",
          type: "Text"
        }]);
      } else {
        setSetupMode(false);
        setShowManageFields(false);
      }
      setEditId(null);
      setForm({});
      setErrors({});
      setShowEntryForm(true);
    },
    style: {
      position: "fixed",
      bottom: "calc(28px + var(--fab-lift,0px))",
      right: 28,
      zIndex: 200,
      width: 56,
      height: 56,
      borderRadius: "50%",
      background: "linear-gradient(135deg,#5B21B6,#7C3AED)",
      color: "#fff",
      border: "none",
      boxShadow: "0 4px 18px rgba(124,58,237,0.45)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 5v14M5 12h14"
  }))), showNewGroup && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 500,
      background: "rgba(0,0,0,0.55)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20
    },
    onClick: () => setShowNewGroup(false)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface)",
      borderRadius: 20,
      padding: 24,
      width: "100%",
      maxWidth: 380,
      animation: "scaleIn 0.2s ease"
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 800,
      color: "var(--text)",
      marginBottom: 6
    }
  }, "\uD83D\uDCC1 Start New Group"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--text-muted)",
      marginBottom: 16,
      lineHeight: 1.6
    }
  }, "Current records (", entries.length, ") will be archived. You'll define new fields for the next group."), /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Name for current group"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    placeholder: "e.g. Jan 2026 Clients, Q1 Sales\u2026",
    value: newGroupName,
    onChange: e => setNewGroupName(e.target.value),
    onKeyDown: e => e.key === "Enter" && createNewGroup(),
    autoFocus: true,
    style: {
      marginBottom: 16
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline",
    style: {
      flex: 1
    },
    onClick: () => setShowNewGroup(false)
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      flex: 2,
      background: "linear-gradient(135deg,#5B21B6,#7C3AED)"
    },
    onClick: createNewGroup
  }, "\uD83D\uDCC1 Archive & Start New")))), showEntryForm && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 400,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center"
    },
    onClick: () => {
      setShowEntryForm(false);
      setSetupMode(!fields);
      setShowManageFields(false);
      setEditId(null);
      setForm({});
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface)",
      borderRadius: "22px 22px 0 0",
      width: "100%",
      maxWidth: 520,
      maxHeight: "88vh",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column"
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "18px 18px 10px",
      borderBottom: `1px solid var(--border)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 800,
      color: "var(--text)"
    }
  }, setupMode ? "⚙️ Set Up Fields" : showManageFields ? "✏️ Edit Fields" : editId ? "Edit Record" : "New Record"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setShowEntryForm(false);
      setSetupMode(!fields);
      setShowManageFields(false);
      setEditId(null);
      setForm({});
    },
    style: {
      background: "var(--bg)",
      border: "none",
      width: 30,
      height: 30,
      borderRadius: "50%",
      cursor: "pointer",
      fontSize: 18,
      color: "var(--text-muted)"
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: "14px 18px"
    }
  }, setupMode || showManageFields ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--text-muted)",
      marginBottom: 14,
      lineHeight: 1.6
    }
  }, "Define your columns. Date and Notes are always included."), (draftFields || []).map((f, i) => /*#__PURE__*/React.createElement("div", {
    key: f.id,
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 8,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    style: {
      flex: 1
    },
    placeholder: "Field name",
    value: f.name,
    onChange: e => setDraftFields(prev => prev.map((x, j) => j === i ? {
      ...x,
      name: e.target.value
    } : x))
  }), /*#__PURE__*/React.createElement("select", {
    className: "form-input",
    style: {
      width: 90
    },
    value: f.type,
    onChange: e => setDraftFields(prev => prev.map((x, j) => j === i ? {
      ...x,
      type: e.target.value
    } : x))
  }, /*#__PURE__*/React.createElement("option", null, "Text"), /*#__PURE__*/React.createElement("option", null, "Number"), /*#__PURE__*/React.createElement("option", null, "Date"), /*#__PURE__*/React.createElement("option", null, "Yes/No")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-danger btn-sm",
    onClick: () => setDraftFields(prev => prev.filter((_, j) => j !== i))
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash",
    size: 13
  })))), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline btn-sm",
    style: {
      width: "100%",
      marginTop: 4
    },
    onClick: () => setDraftFields(prev => [...(prev || []), {
      id: uid(),
      name: "",
      type: "Text"
    }])
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 13
  }), " Add field")) : /*#__PURE__*/React.createElement("div", null, activeFields.map(f => /*#__PURE__*/React.createElement("div", {
    key: f.id,
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, f.name), f.type === "Date" ? /*#__PURE__*/React.createElement("input", {
    type: "date",
    className: `form-input${errors[f.id] ? " error" : ""}`,
    value: form[f.id] || TODAY(),
    onChange: e => {
      setForm(p => ({
        ...p,
        [f.id]: e.target.value
      }));
      setErrors(p => ({
        ...p,
        [f.id]: null
      }));
    }
  }) : f.type === "Number" ? /*#__PURE__*/React.createElement("input", {
    type: "number",
    className: `form-input${errors[f.id] ? " error" : ""}`,
    placeholder: "0",
    value: form[f.id] || "",
    onChange: e => {
      setForm(p => ({
        ...p,
        [f.id]: e.target.value
      }));
      setErrors(p => ({
        ...p,
        [f.id]: null
      }));
    }
  }) : f.type === "Yes/No" ? /*#__PURE__*/React.createElement("select", {
    className: "form-input",
    value: form[f.id] || "",
    onChange: e => {
      setForm(p => ({
        ...p,
        [f.id]: e.target.value
      }));
      setErrors(p => ({
        ...p,
        [f.id]: null
      }));
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Select"), /*#__PURE__*/React.createElement("option", null, "Yes"), /*#__PURE__*/React.createElement("option", null, "No")) : /*#__PURE__*/React.createElement("input", {
    className: `form-input${errors[f.id] ? " error" : ""}`,
    placeholder: `Enter ${f.name}`,
    value: form[f.id] || "",
    onChange: e => {
      setForm(p => ({
        ...p,
        [f.id]: e.target.value
      }));
      setErrors(p => ({
        ...p,
        [f.id]: null
      }));
    }
  }), errors[f.id] && /*#__PURE__*/React.createElement("div", {
    className: "form-error"
  }, errors[f.id]))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 18px 20px",
      borderTop: `1px solid var(--border)`,
      flexShrink: 0,
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline",
    style: {
      flex: 1
    },
    onClick: () => {
      setShowEntryForm(false);
      setSetupMode(!fields);
      setShowManageFields(false);
      setEditId(null);
      setForm({});
    }
  }, "Cancel"), setupMode || showManageFields ? /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      flex: 2
    },
    onClick: () => {
      const combined = [...defaultFields, ...(draftFields || []).filter(f => f.name.trim())];
      saveCurrentFields(combined);
    }
  }, "\uD83D\uDCBE Save Fields") : /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      flex: 2,
      background: "linear-gradient(135deg,#5B21B6,#7C3AED)"
    },
    onClick: saveEntry
  }, editId ? "✅ Update" : "💾 Save Record")))), viewEntry && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 400,
      background: "rgba(0,0,0,0.55)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20
    },
    onClick: () => setViewEntry(null)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface)",
      borderRadius: 24,
      width: "100%",
      maxWidth: 480,
      maxHeight: "80vh",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      boxShadow: "0 24px 60px rgba(0,0,0,0.3)"
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px 20px 14px",
      borderBottom: `1px solid var(--border)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 42,
      height: 42,
      borderRadius: 12,
      background: "var(--primary-light)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 20
    }
  }, "\uD83D\uDC64"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 800,
      color: "var(--text)"
    }
  }, viewEntry[orderedFields[0]?.id] || "Record"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "var(--text-muted)",
      marginTop: 2
    }
  }, "Added ", new Date(viewEntry.createdAt || Date.now()).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric"
  })))), /*#__PURE__*/React.createElement("button", {
    onClick: () => setViewEntry(null),
    style: {
      background: "var(--bg)",
      border: "none",
      width: 32,
      height: 32,
      borderRadius: "50%",
      cursor: "pointer",
      fontSize: 18,
      color: "var(--text-muted)"
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: "16px 20px"
    }
  }, orderedFields.map((f, i) => {
    const val = viewEntry[f.id];
    if (!val && val !== 0) return null;
    return /*#__PURE__*/React.createElement("div", {
      key: f.id,
      style: {
        marginBottom: 14,
        paddingBottom: 14,
        borderBottom: i < orderedFields.length - 1 ? `0.5px solid var(--border)` : "none"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 600,
        color: "var(--text-muted)",
        textTransform: "uppercase",
        letterSpacing: "0.07em",
        marginBottom: 5
      }
    }, f.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 600,
        color: "var(--text)",
        lineHeight: 1.5,
        wordBreak: "break-word"
      }
    }, val));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 20px 20px",
      borderTop: `1px solid var(--border)`,
      display: "flex",
      gap: 10,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline",
    style: {
      flex: 1
    },
    onClick: () => setViewEntry(null)
  }, "Close"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      flex: 2,
      background: "linear-gradient(135deg,#5B21B6,#7C3AED)"
    },
    onClick: () => {
      openEdit(viewEntry);
      setViewEntry(null);
    }
  }, "\u270F\uFE0F Edit Record")))), toast && /*#__PURE__*/React.createElement(Toast, {
    msg: toast.msg,
    type: toast.type,
    onDone: () => setToast(null)
  }), showExport && /*#__PURE__*/React.createElement(ExportModal, {
    title: "Customer Records",
    onClose: () => setShowExport(false),
    onExcelExport: () => {
      loadSheetJS(() => {
        try {
          const wb = window.XLSX.utils.book_new();
          // Current records sheet
          if (entries.length > 0) {
            const headers = activeFields.map(f => f.name);
            const rows = entries.map(e => activeFields.map(f => e[f.id] || ""));
            const ws = window.XLSX.utils.aoa_to_sheet([headers, ...rows]);
            window.XLSX.utils.book_append_sheet(wb, ws, "Current Records");
          }
          // Archived group sheets
          (groups || []).forEach(grp => {
            if (!grp.entries?.length) return;
            const gF = grp.fields || defaultFields;
            const headers = gF.map(f => f.name);
            const rows = grp.entries.map(e => gF.map(f => e[f.id] || ""));
            const ws = window.XLSX.utils.aoa_to_sheet([headers, ...rows]);
            const sheetName = (grp.name || "Group").slice(0, 31).replace(/[^a-zA-Z0-9 _-]/g, "");
            window.XLSX.utils.book_append_sheet(wb, ws, sheetName || "Group");
          });
          if (wb.SheetNames.length === 0) {
            showToast("No data to export", "error");
            return;
          }
          window.XLSX.writeFile(wb, `CustomerRecords_${TODAY()}.xlsx`);
          setShowExport(false);
          showToast("Excel downloaded!");
        } catch (e) {
          showToast("Export failed: " + e.message, "error");
        }
      });
    },
    onPDFExport: () => {
      const headers = activeFields.map(f => f.name);
      const rows = entries.map(e => activeFields.map(f => e[f.id] || ""));
      exportToPDF("Customer Records", headers, rows, "CustomerRecords");
      setShowExport(false);
    }
  }));
}
function RestockRow({
  itemId,
  onRestock,
  onRemove,
  onUpdatePrice,
  currentPrice
}) {
  const [qty, setQty] = useState("");
  const [mode, setMode] = useState(null); // null | "restock" | "price"
  const [newPrice, setNewPrice] = useState("");
  const addStock = () => {
    const q = parseInt(qty);
    if (!q || q <= 0) return;
    onRestock(itemId, q);
    setQty("");
    setMode(null);
  };
  const savePrice = () => {
    const p = parseFloat(newPrice);
    if (!p || p <= 0) return;
    onUpdatePrice(itemId, p);
    setNewPrice("");
    setMode(null);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, mode === "restock" ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    className: "form-input",
    placeholder: "Qty to add",
    min: "1",
    value: qty,
    onChange: e => setQty(e.target.value),
    onKeyDown: e => e.key === "Enter" && addStock(),
    style: {
      flex: 1,
      padding: "7px 10px",
      fontSize: 13
    },
    autoFocus: true
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-success btn-sm",
    onClick: addStock,
    style: {
      whiteSpace: "nowrap"
    }
  }, "Add"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline btn-sm",
    onClick: () => {
      setMode(null);
      setQty("");
    }
  }, "\u2715")) : mode === "price" ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: COLORS.textMuted,
      marginBottom: 6,
      fontWeight: 600
    }
  }, "Current: ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: COLORS.primary
    }
  }, NAIRA(currentPrice)), " \u2014 New price:"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      alignItems: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 10,
      top: "50%",
      transform: "translateY(-50%)",
      color: COLORS.textMuted,
      fontSize: 15,
      fontWeight: 700,
      zIndex: 1,
      pointerEvents: "none"
    }
  }, "\u20A6"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    className: "form-input",
    placeholder: String(currentPrice),
    min: "1",
    value: newPrice,
    onChange: e => setNewPrice(e.target.value),
    onKeyDown: e => e.key === "Enter" && savePrice(),
    autoFocus: true,
    style: {
      paddingLeft: 28,
      fontSize: 18,
      height: 48,
      fontWeight: 700,
      fontFamily: "'Space Mono', monospace",
      width: "100%",
      boxSizing: "border-box"
    }
  })), /*#__PURE__*/React.createElement("button", {
    onClick: savePrice,
    style: {
      height: 48,
      width: 44,
      flexShrink: 0,
      background: COLORS.primary,
      color: "#fff",
      border: "none",
      borderRadius: 9,
      fontSize: 20,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, "\u2713"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setMode(null);
      setNewPrice("");
    },
    style: {
      height: 48,
      width: 36,
      flexShrink: 0,
      background: "none",
      border: `1px solid ${COLORS.border}`,
      borderRadius: 9,
      fontSize: 15,
      cursor: "pointer",
      color: COLORS.textMuted,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, "\u2715"))) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-success btn-sm",
    style: {
      flex: 2,
      fontSize: 12
    },
    onClick: () => setMode("restock")
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 13
  }), " Restock"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setNewPrice(String(currentPrice));
      setMode("price");
    },
    style: {
      flex: 2,
      background: COLORS.amberLight,
      border: `1px solid #FCD34D`,
      borderRadius: 8,
      padding: "5px 8px",
      fontSize: 11,
      fontWeight: 700,
      color: COLORS.amber,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 4
    }
  }, "\u270F\uFE0F Price"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-danger btn-sm",
    onClick: () => onRemove(itemId)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash",
    size: 13
  }))));
}

// ===================== SHOP MODE =====================
function ShopScreen({
  user
}) {
  const invKey = `sl_inv_${user.uid}`;
  const salesKey = `sl_shopsales_${user.uid}`;
  const [inventory, setInventory] = useLocalState(invKey, []);
  const [sales, setSales] = useLocalState(salesKey, []);
  const [tab, setTab] = useState(() => {
    if (localStorage.getItem("rc_open_inventory") === "1") {
      localStorage.removeItem("rc_open_inventory");
      return "inventory";
    }
    return "history";
  });
  const [form, setForm] = useState({
    itemId: "",
    qty: ""
  });
  const [invForm, setInvForm] = useState({
    name: "",
    price: "",
    stock: ""
  });
  const [invErrors, setInvErrors] = useState({});
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState("");
  const [showExport, setShowExport] = useState(false);
  const [showSaleForm, setShowSaleForm] = useState(false);
  const [showShopAction, setShowShopAction] = useState(false);
  const [period, setPeriod] = useState("week");
  const [salesSortBy, setSalesSortBy] = useState("date_desc");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [saleTag, setSaleTag] = useState("");
  const [invFormOpen, setInvFormOpen] = useState(false);
  const showToast = (msg, type = "success") => setToast({
    msg,
    type
  });
  const todaySales = sales.filter(s => s.date === TODAY());
  const todayTotal = todaySales.reduce((a, s) => a + s.total, 0);
  const selectedItem = inventory.find(i => i.id === form.itemId);
  const addItem = () => {
    const e = {};
    if (!invForm.name.trim()) e.name = "Item name required";
    if (!invForm.price || isNaN(invForm.price)) e.price = "Enter a valid price";
    if (!invForm.stock || isNaN(invForm.stock)) e.stock = "Enter initial stock";
    if (Object.keys(e).length) {
      setInvErrors(e);
      return;
    }
    const item = {
      id: uid(),
      name: invForm.name.trim(),
      price: parseFloat(invForm.price),
      stock: parseInt(invForm.stock),
      createdAt: TS()
    };
    setInventory(prev => [...prev, item]);
    setInvForm({
      name: "",
      price: "",
      stock: ""
    });
    showToast(`${item.name} added to inventory!`);
  };
  const recordSale = () => {
    const e = {};
    if (!form.itemId) e.itemId = "Select an item";
    const qty = parseInt(form.qty);
    if (!qty || qty <= 0) e.qty = "Enter valid quantity";else if (selectedItem && qty > selectedItem.stock) e.qty = `Only ${selectedItem.stock} in stock`;
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    const sale = {
      id: uid(),
      itemId: form.itemId,
      itemName: selectedItem.name,
      qty,
      price: selectedItem.price,
      total: qty * selectedItem.price,
      date: TODAY(),
      createdAt: TS()
    };
    setSales(prev => [sale, ...prev]);
    setInventory(prev => prev.map(i => i.id === form.itemId ? {
      ...i,
      stock: i.stock - qty
    } : i));
    setForm({
      itemId: "",
      qty: ""
    });
    setErrors({});
    setShowSaleForm(false);
    showToast(`Sale recorded! ${NAIRA(sale.total)}`);
  };
  const removeItem = id => {
    setInventory(prev => prev.filter(i => i.id !== id));
    showToast("Item removed", "error");
  };
  const deleteSale = id => {
    setSales(prev => prev.map(s => s.id === id ? {
      ...s,
      archived: true
    } : s));
    showToast("Sale moved to archive", "error");
  };
  const restoreSale = id => {
    setSales(prev => prev.map(s => s.id === id ? {
      ...s,
      archived: false
    } : s));
    showToast("Sale restored!");
  };
  const addStock = (id, qty) => {
    setInventory(prev => prev.map(i => i.id === id ? {
      ...i,
      stock: i.stock + qty
    } : i));
    showToast("Stock updated!");
  };
  const updatePrice = (id, price) => {
    setInventory(prev => prev.map(i => i.id === id ? {
      ...i,
      price
    } : i));
    showToast("Price updated!");
  };
  const filteredSales = sales.filter(s => !search || s.itemName.toLowerCase().includes(search.toLowerCase()));
  const allTimeSales = sales.reduce((a, s) => a + s.total, 0);
  const getPeriodRange = () => {
    const now = new Date();
    const fmt = d => d.toISOString().slice(0, 10);
    if (period === "today") {
      const t = fmt(now);
      return {
        from: t,
        to: t
      };
    }
    if (period === "week") {
      const d = new Date(now);
      d.setDate(d.getDate() - 6);
      return {
        from: fmt(d),
        to: fmt(now)
      };
    }
    if (period === "month") {
      return {
        from: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`,
        to: fmt(now)
      };
    }
    if (period === "year") {
      return {
        from: `${now.getFullYear()}-01-01`,
        to: fmt(now)
      };
    }
    return {
      from: customFrom,
      to: customTo
    };
  };
  const {
    from: pFrom,
    to: pTo
  } = getPeriodRange();
  const periodSalesTotal = sales.filter(s => s.date && (!pFrom || s.date >= pFrom) && (!pTo || s.date <= pTo)).reduce((a, s) => a + s.total, 0);
  const periodSalesCount = sales.filter(s => s.date && (!pFrom || s.date >= pFrom) && (!pTo || s.date <= pTo)).length;
  const periodLabel = {
    today: "Today",
    week: "This Week",
    month: "This Month",
    year: "This Year",
    custom: "Custom"
  }[period];
  const lowStockItems = inventory.filter(i => i.stock > 0 && i.stock < 5);
  const outOfStockItems = inventory.filter(i => i.stock === 0);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 90
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)`,
      borderRadius: 18,
      padding: "18px 18px 16px",
      marginBottom: "1rem",
      color: "#fff",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: -20,
      right: -20,
      width: 80,
      height: 80,
      borderRadius: "50%",
      background: "rgba(255,255,255,0.06)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      marginBottom: 4
    }
  }, "\uD83C\uDFEA"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 800,
      letterSpacing: "-0.3px"
    }
  }, "Shop Sales"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      opacity: 0.65,
      marginTop: 2
    }
  }, inventory.length, " items tracked \xB7 ", sales.length, " total sales")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowExport(true),
    style: {
      background: "rgba(255,255,255,0.15)",
      border: "1px solid rgba(255,255,255,0.25)",
      borderRadius: 10,
      padding: "7px 12px",
      color: "#fff",
      fontSize: 12,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      fontWeight: 600,
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "download",
    size: 13
  }), " Export")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      opacity: 0.65,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      marginBottom: 6
    }
  }, "View Period Sale"), /*#__PURE__*/React.createElement("select", {
    value: period,
    onChange: e => setPeriod(e.target.value),
    style: {
      width: "100%",
      padding: "9px 12px",
      borderRadius: 10,
      border: "1px solid rgba(255,255,255,0.35)",
      background: "rgba(255,255,255,0.15)",
      color: "#fff",
      fontSize: 13,
      fontWeight: 600,
      fontFamily: "'Inter', sans-serif",
      outline: "none",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "today",
    style: {
      color: "#000",
      background: "#fff"
    }
  }, "Today"), /*#__PURE__*/React.createElement("option", {
    value: "week",
    style: {
      color: "#000",
      background: "#fff"
    }
  }, "This Week"), /*#__PURE__*/React.createElement("option", {
    value: "month",
    style: {
      color: "#000",
      background: "#fff"
    }
  }, "This Month"), /*#__PURE__*/React.createElement("option", {
    value: "year",
    style: {
      color: "#000",
      background: "#fff"
    }
  }, "This Year"), /*#__PURE__*/React.createElement("option", {
    value: "custom",
    style: {
      color: "#000",
      background: "#fff"
    }
  }, "Custom Range")), period === "custom" && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      opacity: 0.6,
      fontWeight: 600,
      textTransform: "uppercase",
      marginBottom: 4
    }
  }, "From"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: customFrom,
    onChange: e => setCustomFrom(e.target.value),
    style: {
      width: "100%",
      padding: "7px 10px",
      borderRadius: 8,
      border: "1px solid rgba(255,255,255,0.3)",
      background: "rgba(255,255,255,0.15)",
      color: "#fff",
      fontSize: 12,
      fontFamily: "'Inter', sans-serif",
      outline: "none"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      opacity: 0.6,
      fontWeight: 600,
      textTransform: "uppercase",
      marginBottom: 4
    }
  }, "To"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: customTo,
    onChange: e => setCustomTo(e.target.value),
    style: {
      width: "100%",
      padding: "7px 10px",
      borderRadius: 8,
      border: "1px solid rgba(255,255,255,0.3)",
      background: "rgba(255,255,255,0.15)",
      color: "#fff",
      fontSize: 12,
      fontFamily: "'Inter', sans-serif",
      outline: "none"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: "rgba(255,255,255,0.14)",
      borderRadius: 12,
      padding: "10px 12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      opacity: 0.65,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.05em"
    }
  }, "Today's Sales"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Space Mono', monospace",
      fontSize: 15,
      fontWeight: 700,
      marginTop: 4
    }
  }, NAIRA(todayTotal)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      opacity: 0.55,
      marginTop: 1
    }
  }, todaySales.length, " transaction", todaySales.length !== 1 ? "s" : "")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: "rgba(255,255,255,0.22)",
      borderRadius: 12,
      padding: "10px 12px",
      border: "1px solid rgba(255,255,255,0.3)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      opacity: 0.85,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.05em"
    }
  }, periodLabel), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Space Mono', monospace",
      fontSize: 15,
      fontWeight: 700,
      marginTop: 4
    }
  }, NAIRA(periodSalesTotal)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      opacity: 0.6,
      marginTop: 1
    }
  }, periodSalesCount, " sale", periodSalesCount !== 1 ? "s" : ""))))), (lowStockItems.length > 0 || outOfStockItems.length > 0) && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "0.75rem",
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, outOfStockItems.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      background: COLORS.dangerLight,
      border: `1px solid #FCA5A5`,
      borderRadius: 10,
      padding: "8px 14px",
      fontSize: 12,
      color: COLORS.danger,
      fontWeight: 600,
      display: "flex",
      gap: 8
    }
  }, "\uD83D\uDEAB ", outOfStockItems.map(i => i.name).join(", "), " \u2014 out of stock"), lowStockItems.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      background: COLORS.amberLight,
      border: `1px solid #FCD34D`,
      borderRadius: 10,
      padding: "8px 14px",
      fontSize: 12,
      color: COLORS.amber,
      fontWeight: 600,
      display: "flex",
      gap: 8
    }
  }, "\u26A0\uFE0F Low stock: ", lowStockItems.map(i => `${i.name} (${i.stock})`).join(", "))), /*#__PURE__*/React.createElement("div", {
    className: "tab-bar"
  }, /*#__PURE__*/React.createElement("button", {
    className: `tab-btn${tab === "history" ? " active" : ""}`,
    onClick: () => setTab("history")
  }, "Sales History"), /*#__PURE__*/React.createElement("button", {
    className: `tab-btn${tab === "inventory" ? " active" : ""}`,
    onClick: () => setTab("inventory")
  }, "Inventory (", inventory.length, ")")), tab === "history" && (() => {
    // Best-selling items (all time)
    const itemTotals = {};
    sales.filter(s => !s.archived).forEach(s => {
      if (!itemTotals[s.itemName]) itemTotals[s.itemName] = {
        name: s.itemName,
        qty: 0,
        revenue: 0
      };
      itemTotals[s.itemName].qty += s.qty;
      itemTotals[s.itemName].revenue += s.total;
    });
    const topItems = Object.values(itemTotals).sort((a, b) => b.revenue - a.revenue).slice(0, 5);
    const maxRevenue = topItems[0]?.revenue || 1;
    const base = sales.filter(s => {
      if (!s.date) return false;
      if (s.archived) return false;
      if (tagFilter && s.tag !== tagFilter) return false;
      return (!pFrom || s.date >= pFrom) && (!pTo || s.date <= pTo);
    });
    const filtered = base.filter(s => !search || s.itemName.toLowerCase().includes(search.toLowerCase()));
    const sorted = [...filtered].sort((a, b) => {
      switch (salesSortBy) {
        case "date_desc":
          return b.date.localeCompare(a.date);
        case "date_asc":
          return a.date.localeCompare(b.date);
        case "amount_desc":
          return b.total - a.total;
        case "amount_asc":
          return a.total - b.total;
        case "name_asc":
          return a.itemName.localeCompare(b.itemName);
        case "name_desc":
          return b.itemName.localeCompare(a.itemName);
        default:
          return 0;
      }
    });
    return /*#__PURE__*/React.createElement("div", null, topItems.length > 0 && /*#__PURE__*/React.createElement("div", {
      className: "card",
      style: {
        marginBottom: "0.75rem"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 700,
        color: COLORS.text,
        marginBottom: 10,
        display: "flex",
        alignItems: "center",
        gap: 6
      }
    }, "\uD83C\uDFC6 Best-Selling Items"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 8
      }
    }, topItems.map((item, i) => /*#__PURE__*/React.createElement("div", {
      key: item.name
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontWeight: 800,
        color: i === 0 ? "#D97706" : i === 1 ? "#64748B" : i === 2 ? "#92400E" : COLORS.textMuted,
        width: 16
      }
    }, "#", i + 1), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        color: COLORS.text
      }
    }, item.name)), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "right"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Space Mono', monospace",
        fontSize: 12,
        fontWeight: 700,
        color: COLORS.accent
      }
    }, NAIRA(item.revenue)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: COLORS.textMuted
      }
    }, item.qty, " sold"))), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 5,
        borderRadius: 3,
        background: COLORS.bg,
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: "100%",
        borderRadius: 3,
        background: i === 0 ? "#D97706" : COLORS.accent,
        width: `${item.revenue / maxRevenue * 100}%`,
        transition: "width 0.5s"
      }
    })))))), (() => {
      const allTags = [...new Set(sales.filter(s => s.tag).map(s => s.tag))];
      return allTags.length > 0 ? /*#__PURE__*/React.createElement("div", {
        className: "chip-row",
        style: {
          marginBottom: "0.65rem"
        }
      }, /*#__PURE__*/React.createElement("button", {
        onClick: () => setTagFilter(""),
        style: {
          padding: "4px 11px",
          borderRadius: 20,
          fontSize: 11,
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "'Inter', sans-serif",
          border: tagFilter === "" ? `1.5px solid ${COLORS.primary}` : `1px solid ${COLORS.border}`,
          background: tagFilter === "" ? COLORS.primaryLight : COLORS.surface,
          color: tagFilter === "" ? COLORS.primary : COLORS.textMuted
        }
      }, "All"), allTags.map(tag => /*#__PURE__*/React.createElement("button", {
        key: tag,
        onClick: () => setTagFilter(t => t === tag ? "" : tag),
        style: {
          padding: "4px 11px",
          borderRadius: 20,
          fontSize: 11,
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "'Inter', sans-serif",
          border: tagFilter === tag ? `1.5px solid ${COLORS.primary}` : `1px solid ${COLORS.border}`,
          background: tagFilter === tag ? COLORS.primaryLight : COLORS.surface,
          color: tagFilter === tag ? COLORS.primary : COLORS.textMuted
        }
      }, "\uD83C\uDFF7\uFE0F ", tag))) : null;
    })(), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        marginBottom: "0.75rem",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        left: 12,
        top: "50%",
        transform: "translateY(-50%)",
        color: COLORS.textLight,
        pointerEvents: "none"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 15
    })), /*#__PURE__*/React.createElement("input", {
      className: "search-bar",
      style: {
        paddingRight: search ? 32 : 12
      },
      placeholder: "Search by item name\u2026",
      value: search,
      onChange: e => setSearch(e.target.value)
    }), search && /*#__PURE__*/React.createElement("button", {
      onClick: () => setSearch(""),
      style: {
        position: "absolute",
        right: 10,
        top: "50%",
        transform: "translateY(-50%)",
        background: COLORS.border,
        border: "none",
        borderRadius: "50%",
        width: 18,
        height: 18,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: COLORS.textMuted,
        fontSize: 11
      }
    }, "\u2715")), /*#__PURE__*/React.createElement("select", {
      value: salesSortBy,
      onChange: e => setSalesSortBy(e.target.value),
      style: {
        flexShrink: 0,
        padding: "9px 10px",
        borderRadius: 10,
        border: `1.5px solid ${COLORS.border}`,
        background: COLORS.surface,
        fontSize: 12,
        fontWeight: 600,
        color: COLORS.text,
        fontFamily: "'Inter', sans-serif",
        outline: "none",
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement("option", {
      value: "date_desc"
    }, "\uD83D\uDCC5 Newest"), /*#__PURE__*/React.createElement("option", {
      value: "date_asc"
    }, "\uD83D\uDCC5 Oldest"), /*#__PURE__*/React.createElement("option", {
      value: "amount_desc"
    }, "\uD83D\uDCB0 High \u2192 Low"), /*#__PURE__*/React.createElement("option", {
      value: "amount_asc"
    }, "\uD83D\uDCB0 Low \u2192 High"), /*#__PURE__*/React.createElement("option", {
      value: "name_asc"
    }, "\uD83D\uDD24 A \u2192 Z"), /*#__PURE__*/React.createElement("option", {
      value: "name_desc"
    }, "\uD83D\uDD24 Z \u2192 A"))), search && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: COLORS.textMuted,
        marginBottom: 8
      }
    }, sorted.length, " result", sorted.length !== 1 ? "s" : "", " for \"", /*#__PURE__*/React.createElement("strong", null, search), "\""), sorted.length === 0 ? /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        padding: "3rem 1rem"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 48,
        marginBottom: 12
      }
    }, "\uD83D\uDED2"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 16,
        fontWeight: 700,
        color: COLORS.text,
        marginBottom: 6
      }
    }, search ? `No results for "${search}"` : `No sales for ${periodLabel.toLowerCase()}`), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: COLORS.textMuted
      }
    }, sales.length === 0 ? "Tap the + button to record your first sale" : "Try a different search or period")) : /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 8
      }
    }, sorted.map(s => /*#__PURE__*/React.createElement("div", {
      key: s.id,
      style: {
        background: "#fff",
        borderRadius: 14,
        border: `1px solid ${COLORS.border}`,
        padding: "12px 14px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        boxShadow: "0 1px 3px rgba(15,23,42,0.04)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 40,
        height: 40,
        borderRadius: 11,
        background: COLORS.accentLight,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18,
        flexShrink: 0
      }
    }, "\uD83D\uDECD\uFE0F"), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: COLORS.text,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, s.itemName), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: COLORS.textMuted,
        marginTop: 2,
        display: "flex",
        gap: 8,
        flexWrap: "wrap",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCC5 ", s.date), /*#__PURE__*/React.createElement("span", null, "\xD7", s.qty, " @ ", NAIRA(s.price)), s.tag && /*#__PURE__*/React.createElement("span", {
      style: {
        background: COLORS.primaryLight,
        color: COLORS.primary,
        borderRadius: 6,
        padding: "1px 7px",
        fontWeight: 600,
        fontSize: 10
      }
    }, "\uD83C\uDFF7\uFE0F ", s.tag))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Space Mono', monospace",
        fontSize: 15,
        fontWeight: 700,
        color: COLORS.accent,
        flexShrink: 0
      }
    }, NAIRA(s.total))))));
  })(), tab === "inventory" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: () => setInvFormOpen(v => !v),
    style: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 16px",
      background: invFormOpen ? COLORS.primaryLight : COLORS.surface,
      border: `1.5px solid ${invFormOpen ? COLORS.primary : COLORS.border}`,
      borderRadius: 12,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      fontSize: 13,
      fontWeight: 600,
      color: invFormOpen ? COLORS.primary : COLORS.text,
      marginBottom: invFormOpen ? 0 : "0.75rem"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 15
  }), " Add New Item"), /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    style: {
      transform: invFormOpen ? "rotate(180deg)" : "rotate(0deg)",
      transition: "transform 0.2s"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 9l6 6 6-6"
  }))), invFormOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      border: `1.5px solid ${COLORS.primary}`,
      borderTop: "none",
      borderRadius: "0 0 12px 12px",
      padding: "14px",
      marginBottom: "0.75rem",
      background: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Item Name"), /*#__PURE__*/React.createElement("input", {
    className: `form-input${invErrors.name ? " error" : ""}`,
    placeholder: "e.g. Rice 50kg",
    value: invForm.name,
    onChange: e => {
      setInvForm(p => ({
        ...p,
        name: e.target.value
      }));
      setInvErrors(p => ({
        ...p,
        name: null
      }));
    }
  }), invErrors.name && /*#__PURE__*/React.createElement("div", {
    className: "form-error"
  }, invErrors.name)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group",
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Price (\u20A6)"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    className: `form-input${invErrors.price ? " error" : ""}`,
    placeholder: "0.00",
    value: invForm.price,
    onChange: e => {
      setInvForm(p => ({
        ...p,
        price: e.target.value
      }));
      setInvErrors(p => ({
        ...p,
        price: null
      }));
    }
  }), invErrors.price && /*#__PURE__*/React.createElement("div", {
    className: "form-error"
  }, invErrors.price)), /*#__PURE__*/React.createElement("div", {
    className: "form-group",
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Initial Stock"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    className: `form-input${invErrors.stock ? " error" : ""}`,
    placeholder: "0",
    value: invForm.stock,
    onChange: e => {
      setInvForm(p => ({
        ...p,
        stock: e.target.value
      }));
      setInvErrors(p => ({
        ...p,
        stock: null
      }));
    }
  }), invErrors.stock && /*#__PURE__*/React.createElement("div", {
    className: "form-error"
  }, invErrors.stock))), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => {
      addItem();
      setInvFormOpen(false);
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 15
  }), " Add to Inventory")), inventory.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "3rem 1rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 48,
      marginBottom: 12
    }
  }, "\uD83D\uDCE6"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: COLORS.text,
      marginBottom: 6
    }
  }, "No items yet"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: COLORS.textMuted
    }
  }, "Tap \"Add New Item\" above to stock your shop")) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, inventory.map(item => {
    const stockColor = item.stock === 0 ? COLORS.danger : item.stock < 5 ? COLORS.amber : COLORS.accent;
    const stockBg = item.stock === 0 ? COLORS.dangerLight : item.stock < 5 ? COLORS.amberLight : COLORS.accentLight;
    return /*#__PURE__*/React.createElement("div", {
      key: item.id,
      style: {
        background: "#fff",
        borderRadius: 14,
        overflow: "hidden",
        border: `1px solid ${item.stock === 0 ? "#FCA5A5" : item.stock < 5 ? "#FCD34D" : COLORS.border}`,
        boxShadow: "0 1px 3px rgba(15,23,42,0.04)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: 3,
        background: stockColor
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "12px 14px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 42,
        height: 42,
        borderRadius: 11,
        background: stockBg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 20,
        flexShrink: 0
      }
    }, item.stock === 0 ? "🚫" : item.stock < 5 ? "⚠️" : "📦"), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: COLORS.text
      }
    }, item.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: COLORS.textMuted,
        marginTop: 2
      }
    }, NAIRA(item.price), " per unit")), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "right",
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Space Mono', monospace",
        fontSize: 15,
        fontWeight: 700,
        color: stockColor
      }
    }, item.stock), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: stockColor,
        fontWeight: 600,
        textTransform: "uppercase"
      }
    }, item.stock === 0 ? "out of stock" : "in stock"))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: 6,
        borderRadius: 3,
        background: COLORS.bg,
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: "100%",
        borderRadius: 3,
        background: stockColor,
        width: `${Math.min(100, item.stock / Math.max(item.stock, 20) * 100)}%`,
        transition: "width 0.3s"
      }
    }))), /*#__PURE__*/React.createElement(RestockRow, {
      itemId: item.id,
      onRestock: addStock,
      onRemove: removeItem,
      onUpdatePrice: updatePrice,
      currentPrice: item.price
    })));
  }))), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowShopAction(true),
    title: "Add sale or stock",
    style: {
      position: "fixed",
      bottom: "calc(28px + var(--fab-lift, 0px))",
      right: 28,
      zIndex: 200,
      width: 56,
      height: 56,
      borderRadius: "50%",
      background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})`,
      color: "#fff",
      border: "none",
      boxShadow: "0 4px 18px rgba(37,99,235,0.4)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "transform 0.15s, box-shadow 0.15s"
    },
    onMouseEnter: e => {
      e.currentTarget.style.transform = "scale(1.1)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = "scale(1)";
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 5v14M5 12h14"
  }))), showShopAction && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 300,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      background: "rgba(0,0,0,0.5)"
    },
    onClick: () => setShowShopAction(false)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 22,
      padding: "28px 20px 20px",
      width: "100%",
      maxWidth: 340,
      boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
      animation: "scaleIn 0.2s cubic-bezier(0.4,0,0.2,1)"
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 40,
      marginBottom: 10
    }
  }, "\uD83C\uDFEA"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 800,
      color: COLORS.text
    }
  }, "What would you like to do?")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setShowShopAction(false);
      setForm({
        itemId: "",
        qty: ""
      });
      setErrors({});
      setShowSaleForm(true);
    },
    style: {
      display: "flex",
      alignItems: "center",
      gap: 16,
      padding: "16px",
      background: COLORS.accentLight,
      border: `2px solid #6EE7B7`,
      borderRadius: 16,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 48,
      borderRadius: 14,
      background: COLORS.accent,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 24,
      flexShrink: 0
    }
  }, "\uD83D\uDECD\uFE0F"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: COLORS.text
    }
  }, "Record a Sale"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: COLORS.textMuted,
      marginTop: 2
    }
  }, "Log a new sale from your inventory"))), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setShowShopAction(false);
      setTab("inventory");
      setInvFormOpen(true);
    },
    style: {
      display: "flex",
      alignItems: "center",
      gap: 16,
      padding: "16px",
      background: COLORS.primaryLight,
      border: `2px solid #BFDBFE`,
      borderRadius: 16,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 48,
      borderRadius: 14,
      background: COLORS.primary,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 24,
      flexShrink: 0
    }
  }, "\uD83D\uDCE6"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: COLORS.text
    }
  }, "Add New Stock"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: COLORS.textMuted,
      marginTop: 2
    }
  }, "Add a new item or restock inventory")))), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowShopAction(false),
    style: {
      width: "100%",
      marginTop: 14,
      padding: "10px",
      background: "none",
      border: "none",
      cursor: "pointer",
      fontSize: 14,
      color: COLORS.textMuted,
      fontFamily: "'Inter', sans-serif"
    }
  }, "Cancel"))), showSaleForm && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 300,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
      background: "rgba(0,0,0,0.5)"
    },
    onClick: () => setShowSaleForm(false)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 20,
      width: "100%",
      maxWidth: 420,
      maxHeight: "calc(100vh - 32px)",
      display: "flex",
      flexDirection: "column",
      boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
      animation: "scaleIn 0.22s cubic-bezier(0.4,0,0.2,1)"
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 18px 14px",
      borderBottom: `1px solid ${COLORS.border}`,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 10,
      background: COLORS.accentLight,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 20
    }
  }, "\uD83D\uDECD\uFE0F"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 700
    }
  }, "Record Sale")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowSaleForm(false),
    style: {
      background: COLORS.bg,
      border: "none",
      cursor: "pointer",
      color: COLORS.textMuted,
      width: 32,
      height: 32,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 18
    }
  }, "\xD7"))), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowY: "auto",
      padding: "16px 18px",
      flex: 1,
      WebkitOverflowScrolling: "touch"
    }
  }, inventory.filter(i => i.stock > 0).length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "2rem 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 40,
      marginBottom: 10
    }
  }, "\uD83D\uDCE6"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: COLORS.text,
      marginBottom: 6
    }
  }, "No items in stock"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: COLORS.textMuted
    }
  }, "Switch to the Inventory tab to add items first.")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Today's Date"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    className: "form-input",
    defaultValue: TODAY(),
    readOnly: true,
    style: {
      background: COLORS.bg,
      color: COLORS.textMuted
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Select Item"), /*#__PURE__*/React.createElement("select", {
    className: `form-input${errors.itemId ? " error" : ""}`,
    value: form.itemId,
    onChange: e => {
      setForm(p => ({
        ...p,
        itemId: e.target.value
      }));
      setErrors(p => ({
        ...p,
        itemId: null
      }));
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u2014 Choose item \u2014"), inventory.filter(i => i.stock > 0).map(i => /*#__PURE__*/React.createElement("option", {
    key: i.id,
    value: i.id
  }, i.name, " (", i.stock, " left) \u2014 ", NAIRA(i.price)))), errors.itemId && /*#__PURE__*/React.createElement("div", {
    className: "form-error"
  }, errors.itemId)), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Quantity Sold"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    className: `form-input${errors.qty ? " error" : ""}`,
    placeholder: "1",
    min: "1",
    value: form.qty,
    onChange: e => {
      setForm(p => ({
        ...p,
        qty: e.target.value
      }));
      setErrors(p => ({
        ...p,
        qty: null
      }));
    }
  }), errors.qty && /*#__PURE__*/React.createElement("div", {
    className: "form-error"
  }, errors.qty)), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "\uD83C\uDFF7\uFE0F Tag (optional)"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    placeholder: "e.g. Wholesale, Retail, Online\u2026",
    value: saleTag,
    onChange: e => setSaleTag(e.target.value)
  })), selectedItem && form.qty && parseInt(form.qty) > 0 && !errors.qty && /*#__PURE__*/React.createElement("div", {
    style: {
      background: COLORS.accentLight,
      border: `1px solid #6EE7B7`,
      borderRadius: 14,
      padding: "14px 16px",
      marginBottom: 8,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: COLORS.accent,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.05em"
    }
  }, "Total Amount"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: COLORS.textMuted,
      marginTop: 2
    }
  }, form.qty, " \xD7 ", NAIRA(selectedItem.price))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Space Mono', monospace",
      fontSize: 24,
      fontWeight: 700,
      color: COLORS.accent
    }
  }, NAIRA(parseInt(form.qty || 0) * selectedItem.price))))), inventory.filter(i => i.stock > 0).length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 18px 16px",
      borderTop: `1px solid ${COLORS.border}`,
      flexShrink: 0,
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline",
    style: {
      flex: 1
    },
    onClick: () => setShowSaleForm(false)
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      flex: 2
    },
    onClick: recordSale
  }, "Record Sale")))), confirmDeleteFarm && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 500,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20
    },
    onClick: () => setConfirmDeleteFarm(null)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface)",
      borderRadius: 20,
      padding: 24,
      width: "100%",
      maxWidth: 340
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 800,
      color: "var(--text)",
      marginBottom: 8
    }
  }, "\uD83D\uDDD1\uFE0F Delete Farm?"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--text-muted)",
      marginBottom: 20,
      lineHeight: 1.6
    }
  }, "This will permanently delete the farm and all its expense records. This cannot be undone."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline",
    style: {
      flex: 1
    },
    onClick: () => setConfirmDeleteFarm(null)
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-danger",
    style: {
      flex: 1,
      fontWeight: 800
    },
    onClick: () => doDeleteFarm(confirmDeleteFarm)
  }, "Delete")))), toast && /*#__PURE__*/React.createElement(Toast, {
    msg: toast.msg,
    type: toast.type,
    onDone: () => setToast(null)
  }), showExport && /*#__PURE__*/React.createElement(ExportModal, {
    title: "Shop Sales",
    onClose: () => setShowExport(false),
    onExcelExport: () => {
      const headers = ["Date", "Item", "Qty", "Price (₦)", "Total (₦)"];
      const rows = sales.map(s => [s.date, s.itemName, s.qty, s.price, s.total]);
      exportToExcel("Shop_Sales_" + TODAY(), "Sales", rows, headers);
      setShowExport(false);
      showToast("Excel file downloaded!");
    },
    onPDFExport: () => {
      const headers = ["Date", "Item", "Qty", "Price (₦)", "Total (₦)"];
      const rows = sales.map(s => [s.date, s.itemName, s.qty, s.price, s.total]);
      exportToPDF("Shop Sales — Export", headers, rows, "Shop_Sales");
      setShowExport(false);
    }
  }));
}

// ===================== FARM MODE =====================
const FARM_CATS = ["Seeds", "Fertilizer", "Labor", "Transport", "Equipment", "Others"];
function FarmScreen({
  user
}) {
  const FG = {
    dark: "#1B4332",
    main: "#2D6A4F",
    mid: "#40916C",
    light: "#74C69D",
    pale: "#D8F3DC",
    surface: "#F0FAF4",
    border: "#B7E4C7"
  };
  const catMeta = {
    Seeds: {
      icon: "🌱",
      bg: "#E9F5DB",
      color: "#386641"
    },
    Fertilizer: {
      icon: "🧪",
      bg: "#EAF4FB",
      color: "#1B6CA8"
    },
    Labor: {
      icon: "👷",
      bg: "#FEF3E2",
      color: "#D4820A"
    },
    Transport: {
      icon: "🚛",
      bg: "#EAF4FB",
      color: "#1B6CA8"
    },
    Equipment: {
      icon: "⚙️",
      bg: "#F3EFFE",
      color: "#6B3FA0"
    },
    Others: {
      icon: "📦",
      bg: "#F4F6FA",
      color: "#6B7280"
    }
  };

  //    Multi-farm: farms list stored separately   
  const farmsKey = `sl_farms_${user.uid}`;
  const expKey = fid => `sl_farm_${user.uid}_${fid}`;
  const legacyKey = `sl_farm_${user.uid}`; // old single-farm key

  const [farms, setFarms] = useLocalState(farmsKey, null);
  const [activeFarm, setActiveFarm] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [showFarmMgr, setShowFarmMgr] = useState(false);
  const [newFarmName, setNewFarmName] = useState("");
  const [form, setForm] = useState({
    date: TODAY(),
    desc: "",
    amount: "",
    category: "Others"
  });
  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [filterCat, setFilterCat] = useState("All");
  const showToast = (msg, type = "success") => setToast({
    msg,
    type
  });

  //    Migrate legacy single-farm data on first load   
  useEffect(() => {
    let initialFarms = farms;
    if (!initialFarms) {
      // First time   check if there's legacy data
      const legacyData = (() => {
        try {
          return JSON.parse(localStorage.getItem(legacyKey)) || [];
        } catch {
          return [];
        }
      })();
      const firstFarm = {
        id: uid(),
        name: "My Farm",
        createdAt: TS()
      };
      initialFarms = [firstFarm];
      setFarms(initialFarms);
      if (legacyData.length > 0) {
        // Migrate old data to new farm-specific key
        localStorage.setItem(expKey(firstFarm.id), JSON.stringify(legacyData));
      }
    }
    if (initialFarms.length > 0 && !activeFarm) {
      setActiveFarm(initialFarms[0].id);
    }
  }, []);

  //    Load expenses when active farm changes   
  useEffect(() => {
    if (!activeFarm) return;
    const raw = (() => {
      try {
        return JSON.parse(localStorage.getItem(expKey(activeFarm))) || [];
      } catch {
        return [];
      }
    })();
    setExpenses(raw);
  }, [activeFarm]);

  //    Persist expenses to localStorage whenever they change   
  useEffect(() => {
    if (!activeFarm) return;
    localStorage.setItem(expKey(activeFarm), JSON.stringify(expenses));
    // Also write to legacy key for backward compat with sync
    const allExp = (farms || []).flatMap(f => {
      const k = expKey(f.id);
      try {
        return JSON.parse(localStorage.getItem(k)) || [];
      } catch {
        return [];
      }
    });
    localStorage.setItem(legacyKey, JSON.stringify(allExp));
  }, [expenses, activeFarm]);
  const addFarm = () => {
    const name = newFarmName.trim();
    if (!name) return;
    const newF = {
      id: uid(),
      name,
      createdAt: TS()
    };
    const updated = [...(farms || []), newF];
    setFarms(updated);
    setActiveFarm(newF.id);
    setNewFarmName("");
    setShowFarmMgr(false);
    showToast(`"${name}" farm created!`);
  };
  const [confirmDeleteFarm, setConfirmDeleteFarm] = useState(null);
  const deleteFarm = fid => {
    if ((farms || []).length <= 1) {
      showToast("Cannot delete your only farm", "error");
      return;
    }
    setConfirmDeleteFarm(fid); // show confirm modal
  };
  const doDeleteFarm = fid => {
    localStorage.removeItem(expKey(fid));
    const updated = (farms || []).filter(f => f.id !== fid);
    setFarms(updated);
    setActiveFarm(updated[0]?.id || null);
    setConfirmDeleteFarm(null);
    showToast("Farm deleted", "error");
  };
  const saveExpense = () => {
    const e = {};
    if (!form.desc.trim()) e.desc = "Description is required";
    if (!form.amount || isNaN(form.amount) || parseFloat(form.amount) <= 0) e.amount = "Enter a valid amount";
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    const exp = {
      id: uid(),
      ...form,
      amount: parseFloat(form.amount),
      farmId: activeFarm,
      createdAt: TS()
    };
    setExpenses(prev => [exp, ...prev]);
    setForm({
      date: TODAY(),
      desc: "",
      amount: "",
      category: form.category
    });
    setErrors({});
    setShowForm(false);
    showToast("Expense saved!");
  };
  const deleteExpense = id => {
    setExpenses(prev => prev.filter(e => e.id !== id));
    showToast("Deleted", "error");
  };
  const currentFarm = (farms || []).find(f => f.id === activeFarm);
  const filtered = expenses.filter(e => {
    const matchSearch = !search || e.desc.toLowerCase().includes(search.toLowerCase()) || e.date.includes(search);
    const matchCat = filterCat === "All" || e.category === filterCat;
    return matchSearch && matchCat;
  });
  const totalSpend = expenses.reduce((a, e) => a + e.amount, 0);
  const now = new Date();
  const thisMonth = expenses.filter(e => e.date.startsWith(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`));
  const monthTotal = thisMonth.reduce((a, e) => a + e.amount, 0);
  const byCategory = Object.entries(expenses.reduce((acc, e) => {
    const c = e.category || "Others";
    acc[c] = (acc[c] || 0) + e.amount;
    return acc;
  }, {})).sort((a, b) => b[1] - a[1]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--bg)",
      minHeight: "100%",
      paddingBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "0.85rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      overflowX: "auto",
      paddingBottom: 4,
      scrollbarWidth: "none"
    }
  }, (farms || []).map(f => /*#__PURE__*/React.createElement("button", {
    key: f.id,
    onClick: () => {
      setActiveFarm(f.id);
      setSearch("");
      setFilterCat("All");
    },
    style: {
      flexShrink: 0,
      padding: "8px 16px",
      borderRadius: 20,
      border: "none",
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      fontSize: 13,
      fontWeight: 700,
      background: activeFarm === f.id ? `linear-gradient(135deg, ${FG.dark}, ${FG.main})` : "var(--surface)",
      color: activeFarm === f.id ? "#fff" : "var(--text)",
      boxShadow: activeFarm === f.id ? `0 3px 12px ${FG.main}55` : "none",
      border: activeFarm !== f.id ? `1px solid var(--border)` : "none"
    }
  }, "\uD83C\uDF3E ", f.name)), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowFarmMgr(true),
    style: {
      flexShrink: 0,
      padding: "8px 14px",
      borderRadius: 20,
      border: `1.5px dashed ${FG.mid}`,
      background: "transparent",
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      fontSize: 13,
      fontWeight: 700,
      color: FG.mid,
      whiteSpace: "nowrap"
    }
  }, "+ Add Farm"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: `linear-gradient(135deg, ${FG.dark} 0%, ${FG.main} 60%, ${FG.mid} 100%)`,
      borderRadius: 18,
      padding: "18px 18px 14px",
      marginBottom: "1rem",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: -20,
      right: -20,
      width: 100,
      height: 100,
      borderRadius: "50%",
      background: "rgba(255,255,255,0.06)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      marginBottom: 2
    }
  }, "\uD83C\uDF3E"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 800,
      color: "#fff"
    }
  }, currentFarm?.name || "Farm", " Expenses"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "rgba(255,255,255,0.65)",
      marginTop: 3
    }
  }, expenses.length, " records \xB7 ", NAIRA(totalSpend), " total")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowExport(true),
    style: {
      background: "rgba(255,255,255,0.18)",
      border: "none",
      borderRadius: 10,
      padding: "7px 12px",
      color: "#fff",
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      fontSize: 11,
      fontWeight: 700
    }
  }, "\uD83D\uDCE4 Export"), /*#__PURE__*/React.createElement("button", {
    onClick: () => deleteFarm(activeFarm),
    style: {
      background: "rgba(255,80,80,0.2)",
      border: "none",
      borderRadius: 10,
      padding: "7px 10px",
      color: "#FCA5A5",
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      fontSize: 11,
      fontWeight: 700
    }
  }, "\uD83D\uDDD1\uFE0F"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      marginTop: 14
    }
  }, [{
    label: "This Month",
    value: NAIRA(monthTotal)
  }, {
    label: "All Time",
    value: NAIRA(totalSpend)
  }, {
    label: "Records",
    value: expenses.length
  }].map(s => /*#__PURE__*/React.createElement("div", {
    key: s.label,
    style: {
      flex: 1,
      background: "rgba(255,255,255,0.12)",
      borderRadius: 10,
      padding: "8px 10px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 800,
      color: "#fff"
    }
  }, s.value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "rgba(255,255,255,0.65)",
      marginTop: 2
    }
  }, s.label))))), byCategory.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      marginBottom: "0.75rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: "var(--text)",
      marginBottom: 10
    }
  }, "Spend by Category"), byCategory.map(([cat, amt]) => {
    const meta = catMeta[cat] || catMeta.Others;
    const pct = totalSpend > 0 ? amt / totalSpend * 100 : 0;
    return /*#__PURE__*/React.createElement("div", {
      key: cat,
      style: {
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontWeight: 600,
        color: "var(--text)"
      }
    }, meta.icon, " ", cat), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontFamily: "'Space Mono', monospace",
        color: meta.color,
        fontWeight: 700
      }
    }, NAIRA(amt))), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 6,
        background: "var(--border)",
        borderRadius: 3,
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: "100%",
        width: `${pct}%`,
        background: meta.color,
        borderRadius: 3,
        transition: "width 0.5s"
      }
    })));
  })), /*#__PURE__*/React.createElement(SmartSearch, {
    value: search,
    onChange: setSearch,
    placeholder: "Search expenses\u2026",
    resultCount: filtered.length
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      overflowX: "auto",
      marginBottom: "0.75rem",
      paddingBottom: 4,
      scrollbarWidth: "none"
    }
  }, ["All", ...Object.keys(catMeta)].map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    onClick: () => setFilterCat(c),
    style: {
      flexShrink: 0,
      padding: "5px 12px",
      borderRadius: 16,
      border: "none",
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      fontSize: 12,
      fontWeight: 600,
      background: filterCat === c ? FG.main : "var(--surface)",
      color: filterCat === c ? "#fff" : "var(--text-muted)",
      border: filterCat !== c ? `1px solid var(--border)` : "none"
    }
  }, c === "All" ? "All" : `${catMeta[c]?.icon} ${c}`))), filtered.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "empty-state"
  }, /*#__PURE__*/React.createElement("div", {
    className: "empty-icon"
  }, "\uD83C\uDF3E"), /*#__PURE__*/React.createElement("h3", null, expenses.length === 0 ? "No expenses yet" : "No results"), /*#__PURE__*/React.createElement("p", null, expenses.length === 0 ? `Tap + to add your first expense for ${currentFarm?.name}` : "Try a different filter")) : /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: 0,
      overflow: "hidden"
    }
  }, filtered.map((exp, i) => {
    const meta = catMeta[exp.category || "Others"] || catMeta.Others;
    return /*#__PURE__*/React.createElement("div", {
      key: exp.id,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 16px",
        borderBottom: i < filtered.length - 1 ? `0.5px solid var(--border)` : "none"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 38,
        height: 38,
        borderRadius: 10,
        background: meta.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18,
        flexShrink: 0
      }
    }, meta.icon), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 600,
        color: "var(--text)",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, exp.desc), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "var(--text-muted)",
        marginTop: 2
      }
    }, exp.date, " \xB7 ", exp.category || "Others")), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "right",
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 800,
        fontFamily: "'Space Mono', monospace",
        color: COLORS.danger
      }
    }, NAIRA(exp.amount)), /*#__PURE__*/React.createElement("button", {
      onClick: () => deleteExpense(exp.id),
      style: {
        background: "none",
        border: "none",
        cursor: "pointer",
        color: COLORS.danger,
        fontSize: 11,
        marginTop: 2,
        fontFamily: "'Inter', sans-serif"
      }
    }, "Delete")));
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowForm(true),
    style: {
      position: "fixed",
      bottom: "calc(28px + var(--fab-lift, 0px))",
      right: 28,
      zIndex: 200,
      width: 56,
      height: 56,
      borderRadius: "50%",
      background: `linear-gradient(135deg, ${FG.dark}, ${FG.mid})`,
      color: "#fff",
      border: "none",
      boxShadow: `0 4px 18px ${FG.main}66`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 5v14M5 12h14"
  }))), showFarmMgr && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 500,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20
    },
    onClick: () => setShowFarmMgr(false)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface)",
      borderRadius: 20,
      padding: 24,
      width: "100%",
      maxWidth: 360,
      animation: "scaleIn 0.2s ease"
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 800,
      color: "var(--text)",
      marginBottom: 16
    }
  }, "\uD83C\uDF3E Manage Farms"), (farms || []).map(f => /*#__PURE__*/React.createElement("div", {
    key: f.id,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "8px 0",
      borderBottom: `0.5px solid var(--border)`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: "var(--text)",
      fontWeight: 600
    }
  }, "\uD83C\uDF3E ", f.name), (farms || []).length > 1 && /*#__PURE__*/React.createElement("button", {
    onClick: () => deleteFarm(f.id),
    style: {
      background: COLORS.dangerLight,
      border: "none",
      color: COLORS.danger,
      borderRadius: 7,
      padding: "4px 10px",
      fontSize: 12,
      fontWeight: 700,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif"
    }
  }, "Delete"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: "var(--text)",
      marginBottom: 8
    }
  }, "Add a new farm:"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    style: {
      flex: 1
    },
    placeholder: "e.g. Ogun State Farm",
    value: newFarmName,
    onChange: e => setNewFarmName(e.target.value),
    onKeyDown: e => e.key === "Enter" && addFarm(),
    autoFocus: true
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: addFarm,
    style: {
      width: "auto",
      padding: "0 16px"
    }
  }, "Add"))), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowFarmMgr(false),
    style: {
      marginTop: 16,
      width: "100%",
      background: "none",
      border: "none",
      color: "var(--text-muted)",
      fontSize: 13,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      padding: 8
    }
  }, "Done"))), showForm && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 500,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20
    },
    onClick: () => setShowForm(false)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface)",
      borderRadius: 20,
      padding: 24,
      width: "100%",
      maxWidth: 400,
      animation: "scaleIn 0.2s ease"
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 800,
      color: "var(--text)",
      marginBottom: 16
    }
  }, "\uD83C\uDF3E Add Expense \u2014 ", currentFarm?.name), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Date"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    className: "form-input",
    value: form.date,
    onChange: e => setForm(p => ({
      ...p,
      date: e.target.value
    }))
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Description"), /*#__PURE__*/React.createElement("input", {
    className: `form-input${errors.desc ? " error" : ""}`,
    placeholder: "e.g. Bought fertilizer bags",
    value: form.desc,
    onChange: e => {
      setForm(p => ({
        ...p,
        desc: e.target.value
      }));
      setErrors(p => ({
        ...p,
        desc: null
      }));
    }
  }), errors.desc && /*#__PURE__*/React.createElement("div", {
    className: "form-error"
  }, errors.desc)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group",
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Amount (\u20A6)"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    className: `form-input${errors.amount ? " error" : ""}`,
    placeholder: "0",
    value: form.amount,
    onChange: e => {
      setForm(p => ({
        ...p,
        amount: e.target.value
      }));
      setErrors(p => ({
        ...p,
        amount: null
      }));
    }
  }), errors.amount && /*#__PURE__*/React.createElement("div", {
    className: "form-error"
  }, errors.amount)), /*#__PURE__*/React.createElement("div", {
    className: "form-group",
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Category"), /*#__PURE__*/React.createElement("select", {
    className: "form-input",
    value: form.category,
    onChange: e => setForm(p => ({
      ...p,
      category: e.target.value
    }))
  }, Object.keys(catMeta).map(c => /*#__PURE__*/React.createElement("option", {
    key: c,
    value: c
  }, catMeta[c].icon, " ", c))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline",
    style: {
      flex: 1
    },
    onClick: () => setShowForm(false)
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      flex: 2,
      background: `linear-gradient(135deg, ${FG.dark}, ${FG.mid})`
    },
    onClick: saveExpense
  }, "\uD83D\uDCBE Save Expense")))), confirmDeleteFarm && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 500,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20
    },
    onClick: () => setConfirmDeleteFarm(null)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface)",
      borderRadius: 20,
      padding: 24,
      width: "100%",
      maxWidth: 340
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 800,
      color: "var(--text)",
      marginBottom: 8
    }
  }, "\uD83D\uDDD1\uFE0F Delete Farm?"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--text-muted)",
      marginBottom: 20,
      lineHeight: 1.6
    }
  }, "This will permanently delete the farm and all its expense records. This cannot be undone."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline",
    style: {
      flex: 1
    },
    onClick: () => setConfirmDeleteFarm(null)
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-danger",
    style: {
      flex: 1,
      fontWeight: 800
    },
    onClick: () => doDeleteFarm(confirmDeleteFarm)
  }, "Delete")))), toast && /*#__PURE__*/React.createElement(Toast, {
    msg: toast.msg,
    type: toast.type,
    onDone: () => setToast(null)
  }), showExport && /*#__PURE__*/React.createElement(ExportModal, {
    title: `${currentFarm?.name} — Expenditures`,
    onClose: () => setShowExport(false),
    onExcelExport: () => {
      const headers = ["Date", "Description", "Category", "Amount (₦)"];
      const rows = expenses.map(e => [e.date, e.desc, e.category || "—", e.amount]);
      exportToExcel(`Farm_${currentFarm?.name}_${TODAY()}`, "Expenditures", rows, headers);
      setShowExport(false);
      showToast("Excel downloaded!");
    },
    onPDFExport: () => {
      const headers = ["Date", "Description", "Category", "Amount (₦)"];
      const rows = expenses.map(e => [e.date, e.desc, e.category || "—", e.amount]);
      exportToPDF(`${currentFarm?.name} — Farm Expenditures`, headers, rows, `Farm_${currentFarm?.name}`);
      setShowExport(false);
    }
  }));
}

// ===================== HISTORY / DASHBOARD =====================
function HistoryScreen({
  user
}) {
  const [showExport, setShowExport] = useState(false);
  const userSectors = user.sectors && user.sectors.length > 0 ? user.sectors : ["shop"];
  const salesData = userSectors.includes("sales") ? (() => {
    try {
      return JSON.parse(localStorage.getItem(`sl_sales_${user.uid}`)) || [];
    } catch {
      return [];
    }
  })() : [];
  const shopData = userSectors.includes("shop") ? (() => {
    try {
      return JSON.parse(localStorage.getItem(`sl_shopsales_${user.uid}`)) || [];
    } catch {
      return [];
    }
  })() : [];
  const farmData = userSectors.includes("farm") ? (() => {
    try {
      return JSON.parse(localStorage.getItem(`sl_farm_${user.uid}`)) || [];
    } catch {
      return [];
    }
  })() : [];
  const debtData = (() => {
    try {
      return JSON.parse(localStorage.getItem(`sl_debt_${user.uid}`)) || [];
    } catch {
      return [];
    }
  })();
  const now = new Date();
  const thisMonthStr = now.toISOString().slice(0, 7);
  const shopTotal = shopData.reduce((a, s) => a + s.total, 0);
  const shopMonthTotal = shopData.filter(s => s.date?.startsWith(thisMonthStr)).reduce((a, s) => a + s.total, 0);
  const farmTotal = farmData.reduce((a, e) => a + e.amount, 0);
  const farmMonthTotal = farmData.filter(e => e.date?.startsWith(thisMonthStr)).reduce((a, e) => a + e.amount, 0);
  const debtRemaining = r => Math.max(0, r.amount - (r.payments || []).reduce((a, p) => a + p.amount, 0));
  const debtCreditOut = debtData.filter(r => r.type === "credit" && !r.settled).reduce((a, r) => a + debtRemaining(r), 0);
  const debtCreditOwed = debtData.filter(r => r.type === "debt" && !r.settled).reduce((a, r) => a + debtRemaining(r), 0);
  const recentActivity = [...(userSectors.includes("shop") ? shopData.map(s => ({
    ...s,
    type: "shop",
    label: s.itemName,
    value: s.total,
    positive: true
  })) : []), ...(userSectors.includes("farm") ? farmData.map(e => ({
    ...e,
    type: "farm",
    label: e.desc,
    value: e.amount,
    positive: false
  })) : []), ...(userSectors.includes("sales") ? salesData.map(e => ({
    ...e,
    type: "sales",
    label: e.f_notes || "Sales entry",
    value: null,
    positive: true
  })) : []), ...debtData.map(r => ({
    ...r,
    type: "debtcredit",
    label: r.name,
    value: r.amount,
    positive: r.type === "credit"
  }))].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 8);
  const sectorSummaryItems = [userSectors.includes("sales") && {
    icon: "💼",
    label: "Sales Rep",
    sub: `${salesData.length} entries`,
    badge: /*#__PURE__*/React.createElement("span", {
      className: "pill pill-blue"
    }, salesData.length, " records")
  }, userSectors.includes("shop") && {
    icon: "🏪",
    label: "Shop Sales",
    sub: `${shopData.length} transactions`,
    badge: /*#__PURE__*/React.createElement("span", {
      className: "pill pill-green",
      style: {
        fontFamily: "'Space Mono', monospace",
        fontWeight: 700
      }
    }, NAIRA(shopTotal))
  }, userSectors.includes("farm") && {
    icon: "🌾",
    label: "Farm Expenses",
    sub: `${farmData.length} entries`,
    badge: /*#__PURE__*/React.createElement("span", {
      className: "pill pill-red",
      style: {
        fontFamily: "'Space Mono', monospace",
        fontWeight: 700
      }
    }, NAIRA(farmTotal))
  }, {
    icon: "🤝",
    label: "Debt & Credit",
    sub: `${debtData.filter(r => !r.settled).length} outstanding`,
    badge: /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "pill pill-green",
      style: {
        fontFamily: "'Space Mono', monospace",
        fontWeight: 700,
        fontSize: 10
      }
    }, "+", NAIRA(debtCreditOut)), /*#__PURE__*/React.createElement("span", {
      className: "pill pill-red",
      style: {
        fontFamily: "'Space Mono', monospace",
        fontWeight: 700,
        fontSize: 10
      }
    }, "-", NAIRA(debtCreditOwed)))
  }].filter(Boolean);

  // Build 6-month chart data
  const getLast6Months = (data, getAmount, getDate) => {
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const total = data.filter(x => (getDate(x) || "").startsWith(key)).reduce((a, x) => a + getAmount(x), 0);
      months.push({
        month: d.toLocaleString("default", {
          month: "short"
        }),
        value: total
      });
    }
    return months;
  };
  const shopChart = userSectors.includes("shop") ? getLast6Months(shopData, s => s.total, s => s.date) : [];
  const farmChart = userSectors.includes("farm") ? getLast6Months(farmData, e => e.amount, e => e.date) : [];
  const profitLoss = shopMonthTotal - farmMonthTotal;
  const monthName = now.toLocaleString("default", {
    month: "long",
    year: "numeric"
  });
  const backupKey = `sl_backup_${user.uid}`;
  const lastBackup = (() => {
    try {
      return JSON.parse(localStorage.getItem(backupKey));
    } catch {
      return null;
    }
  })();
  const daysSinceBackup = lastBackup ? Math.floor((Date.now() - new Date(lastBackup)) / 86400000) : 999;
  const showBackupReminder = daysSinceBackup >= 7;
  const dismissBackup = () => {
    try {
      localStorage.setItem(backupKey, JSON.stringify(new Date().toISOString()));
    } catch {}
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "1rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 700
    }
  }, "Overview"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-success btn-sm",
    onClick: () => setShowExport(true)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "download",
    size: 14
  }), " Export All")), showBackupReminder && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#EFF6FF",
      border: "1.5px solid #BFDBFE",
      borderRadius: 12,
      padding: "10px 14px",
      marginBottom: "0.75rem",
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 22,
      flexShrink: 0
    }
  }, "\u2601\uFE0F"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: COLORS.primary
    }
  }, daysSinceBackup >= 999 ? "Back up your data" : `Last export ${daysSinceBackup} days ago`), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: COLORS.textMuted,
      marginTop: 1
    }
  }, "Export all records to keep a safe copy")), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setShowExport(true);
      dismissBackup();
    },
    style: {
      background: COLORS.primary,
      border: "none",
      borderRadius: 8,
      padding: "6px 12px",
      color: "#fff",
      fontSize: 12,
      fontWeight: 700,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      flexShrink: 0
    }
  }, "Export now"), /*#__PURE__*/React.createElement("button", {
    onClick: dismissBackup,
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: COLORS.textMuted,
      fontSize: 16,
      padding: 2,
      flexShrink: 0
    }
  }, "\u2715")), /*#__PURE__*/React.createElement(NotificationBanner, {
    user: user
  }), !navigator.onLine && (() => {
    const lastExportKey = `sl_lastexport_${user?.uid}`;
    const lastExport = localStorage.getItem(lastExportKey);
    const daysSince = lastExport ? Math.floor((Date.now() - new Date(lastExport)) / 86400000) : 999;
    if (daysSince < 7) return null;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#EFF6FF",
        border: "1.5px solid #BFDBFE",
        borderRadius: 12,
        padding: "10px 14px",
        marginBottom: "0.75rem",
        display: "flex",
        alignItems: "center",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 20,
        flexShrink: 0
      }
    }, "\u2601\uFE0F"), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: COLORS.primary
      }
    }, lastExport ? `No backup in ${daysSince} days` : "No backup yet"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: COLORS.textMuted,
        marginTop: 1
      }
    }, "Export your records to keep a safe copy.")), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setShowExport(true);
        localStorage.setItem(lastExportKey, new Date().toISOString());
      },
      style: {
        flexShrink: 0,
        background: COLORS.primary,
        color: "#fff",
        border: "none",
        borderRadius: 8,
        padding: "6px 12px",
        fontSize: 12,
        fontWeight: 700,
        cursor: "pointer",
        fontFamily: "'Inter', sans-serif"
      }
    }, "Export Now"));
  })(), (userSectors.includes("shop") || userSectors.includes("farm")) && /*#__PURE__*/React.createElement("div", {
    style: {
      background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)`,
      borderRadius: 18,
      padding: "18px",
      marginBottom: "1rem",
      color: "#fff",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: -20,
      right: -20,
      width: 80,
      height: 80,
      borderRadius: "50%",
      background: "rgba(255,255,255,0.07)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      opacity: 0.65,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      marginBottom: 10
    }
  }, "\uD83D\uDCC5 ", monthName, " Report"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, userSectors.includes("shop") && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: "rgba(255,255,255,0.14)",
      borderRadius: 12,
      padding: "10px 12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      opacity: 0.6,
      fontWeight: 700,
      textTransform: "uppercase"
    }
  }, "\uD83C\uDFEA Shop Sales"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Space Mono', monospace",
      fontSize: 14,
      fontWeight: 700,
      marginTop: 4
    }
  }, NAIRA(shopMonthTotal)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      opacity: 0.55,
      marginTop: 1
    }
  }, shopData.filter(s => s.date?.startsWith(thisMonthStr)).length, " sales")), userSectors.includes("farm") && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: "rgba(255,255,255,0.14)",
      borderRadius: 12,
      padding: "10px 12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      opacity: 0.6,
      fontWeight: 700,
      textTransform: "uppercase"
    }
  }, "\uD83C\uDF3E Farm Spend"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Space Mono', monospace",
      fontSize: 14,
      fontWeight: 700,
      marginTop: 4
    }
  }, NAIRA(farmMonthTotal)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      opacity: 0.55,
      marginTop: 1
    }
  }, farmData.filter(e => e.date?.startsWith(thisMonthStr)).length, " expenses")), userSectors.includes("shop") && userSectors.includes("farm") && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: profitLoss >= 0 ? "rgba(52,211,153,0.25)" : "rgba(239,68,68,0.25)",
      borderRadius: 12,
      padding: "10px 12px",
      border: `1px solid ${profitLoss >= 0 ? "rgba(52,211,153,0.4)" : "rgba(239,68,68,0.4)"}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      opacity: 0.8,
      fontWeight: 700,
      textTransform: "uppercase"
    }
  }, "\uD83D\uDCC8 Net P&L"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Space Mono', monospace",
      fontSize: 14,
      fontWeight: 700,
      marginTop: 4,
      color: profitLoss >= 0 ? "#6EE7B7" : "#FCA5A5"
    }
  }, profitLoss >= 0 ? "+" : "", NAIRA(profitLoss)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      opacity: 0.55,
      marginTop: 1
    }
  }, profitLoss >= 0 ? "profit" : "loss", " this month")))), (() => {
    const totalOut = debtCreditOut;
    const totalOwed = debtCreditOwed;
    const net = totalOut - totalOwed;
    const ratio = totalOwed === 0 ? 100 : Math.max(0, Math.min(100, Math.round(totalOut / (totalOut + totalOwed) * 100)));
    const scoreColor = ratio >= 70 ? COLORS.accent : ratio >= 40 ? COLORS.amber : COLORS.danger;
    const scoreLabel = ratio >= 70 ? "Healthy" : ratio >= 40 ? "Caution" : "At Risk";
    const scoreEmoji = ratio >= 70 ? "💚" : ratio >= 40 ? "🟡" : "🔴";
    return /*#__PURE__*/React.createElement("div", {
      className: "card",
      style: {
        marginBottom: "1rem"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: COLORS.text
      }
    }, "\uD83D\uDCB3 Debt-to-Credit Health"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontWeight: 700,
        color: scoreColor,
        background: scoreColor + "18",
        borderRadius: 8,
        padding: "3px 10px"
      }
    }, scoreEmoji, " ", scoreLabel)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 10,
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        background: COLORS.accentLight,
        borderRadius: 10,
        padding: "8px 12px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: COLORS.accent,
        fontWeight: 700,
        textTransform: "uppercase"
      }
    }, "Credits (owed to you)"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Space Mono', monospace",
        fontSize: 14,
        fontWeight: 700,
        color: COLORS.accent,
        marginTop: 2
      }
    }, NAIRA(totalOut))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        background: COLORS.dangerLight,
        borderRadius: 10,
        padding: "8px 12px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: COLORS.danger,
        fontWeight: 700,
        textTransform: "uppercase"
      }
    }, "Debts (you owe)"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Space Mono', monospace",
        fontSize: 14,
        fontWeight: 700,
        color: COLORS.danger,
        marginTop: 2
      }
    }, NAIRA(totalOwed)))), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 10,
        borderRadius: 5,
        background: COLORS.dangerLight,
        overflow: "hidden",
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        left: 0,
        top: 0,
        height: "100%",
        width: `${ratio}%`,
        background: scoreColor,
        borderRadius: 5,
        transition: "width 0.6s"
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: COLORS.textMuted
      }
    }, "Net: ", /*#__PURE__*/React.createElement("strong", {
      style: {
        color: net >= 0 ? COLORS.accent : COLORS.danger
      }
    }, net >= 0 ? "+" : "", NAIRA(net))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: COLORS.textMuted
      }
    }, ratio, "% credit coverage")));
  })(), (userSectors.includes("shop") || userSectors.includes("farm")) && (() => {
    const prevMonthDate = new Date(now);
    prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);
    const prevMonthStr = prevMonthDate.toISOString().slice(0, 7);
    const shopPrevMonth = shopData.filter(s => s.date?.startsWith(prevMonthStr)).reduce((a, s) => a + s.total, 0);
    const farmPrevMonth = farmData.filter(e => e.date?.startsWith(prevMonthStr)).reduce((a, e) => a + e.amount, 0);
    const shopChange = shopPrevMonth === 0 ? null : Math.round((shopMonthTotal - shopPrevMonth) / shopPrevMonth * 100);
    const farmChange = farmPrevMonth === 0 ? null : Math.round((farmMonthTotal - farmPrevMonth) / farmPrevMonth * 100);
    const prevName = prevMonthDate.toLocaleString("default", {
      month: "short"
    });
    const thisName = now.toLocaleString("default", {
      month: "short"
    });
    if (shopPrevMonth === 0 && farmPrevMonth === 0) return null;
    return /*#__PURE__*/React.createElement("div", {
      className: "card",
      style: {
        marginBottom: "1rem"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: COLORS.text,
        marginBottom: 10
      }
    }, "\uD83D\uDCC5 ", prevName, " \u2192 ", thisName, " Comparison"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 8
      }
    }, userSectors.includes("shop") && /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 16
      }
    }, "\uD83C\uDFEA"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 600
      }
    }, "Shop Sales"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: COLORS.textMuted
      }
    }, NAIRA(shopPrevMonth), " \u2192 ", NAIRA(shopMonthTotal)))), shopChange !== null && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontWeight: 700,
        color: shopChange >= 0 ? COLORS.accent : COLORS.danger,
        background: shopChange >= 0 ? COLORS.accentLight : COLORS.dangerLight,
        borderRadius: 8,
        padding: "3px 10px"
      }
    }, shopChange >= 0 ? "▲" : "▼", " ", Math.abs(shopChange), "%")), userSectors.includes("farm") && /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 16
      }
    }, "\uD83C\uDF3E"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 600
      }
    }, "Farm Expenses"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: COLORS.textMuted
      }
    }, NAIRA(farmPrevMonth), " \u2192 ", NAIRA(farmMonthTotal)))), farmChange !== null && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontWeight: 700,
        color: farmChange <= 0 ? COLORS.accent : COLORS.danger,
        background: farmChange <= 0 ? COLORS.accentLight : COLORS.dangerLight,
        borderRadius: 8,
        padding: "3px 10px"
      }
    }, farmChange >= 0 ? "▲" : "▼", " ", Math.abs(farmChange), "%"))));
  })(), (shopChart.length > 0 || farmChart.length > 0) && /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      marginBottom: "1rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: COLORS.text,
      marginBottom: 12
    }
  }, "\uD83D\uDCC8 6-Month Trend"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, shopChart.length > 0 && /*#__PURE__*/React.createElement(MiniBarChart, {
    data: shopChart,
    color: COLORS.accent,
    label: "Shop Sales"
  }), farmChart.length > 0 && /*#__PURE__*/React.createElement(MiniBarChart, {
    data: farmChart,
    color: COLORS.danger,
    label: "Farm Expenditures"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      marginBottom: "1rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: COLORS.textMuted,
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      marginBottom: 12
    }
  }, "Lifetime Summary"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, sectorSummaryItems.map((item, i) => /*#__PURE__*/React.createElement("div", {
    key: item.label
  }, i > 0 && /*#__PURE__*/React.createElement("div", {
    className: "divider",
    style: {
      marginBottom: 10
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 10,
      background: COLORS.bg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 18
    }
  }, item.icon), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600
    }
  }, item.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: COLORS.textMuted
    }
  }, item.sub))), item.badge))), sectorSummaryItems.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: COLORS.textMuted,
      textAlign: "center",
      padding: "1rem 0"
    }
  }, "No sectors selected"))), /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Recent Activity"), recentActivity.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "empty-state"
  }, /*#__PURE__*/React.createElement("div", {
    className: "empty-icon"
  }, "\uD83D\uDCCA"), /*#__PURE__*/React.createElement("h3", null, "No activity yet"), /*#__PURE__*/React.createElement("p", null, "Start recording in your sectors")) : /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, recentActivity.map(item => /*#__PURE__*/React.createElement("div", {
    key: item.id,
    className: "entry-row"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 9,
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 16,
      background: item.type === "farm" ? "#FEF2F2" : item.type === "shop" ? COLORS.accentLight : item.type === "debtcredit" ? COLORS.primaryLight : "#F5F3FF"
    }
  }, item.type === "shop" ? "🏪" : item.type === "farm" ? "🌾" : item.type === "debtcredit" ? item.positive ? "💰" : "📤" : "💼"), /*#__PURE__*/React.createElement("div", {
    className: "entry-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "entry-title"
  }, item.label), /*#__PURE__*/React.createElement("div", {
    className: "entry-sub"
  }, item.type === "shop" ? "Shop Sale" : item.type === "farm" ? "Farm Expense" : item.type === "debtcredit" ? item.positive ? "Credit" : "Debt" : "Sales Entry", " · ", item.date || item.createdAt?.slice(0, 10))), item.value !== null && /*#__PURE__*/React.createElement("div", {
    className: "entry-amount",
    style: {
      color: item.positive ? COLORS.accent : COLORS.danger
    }
  }, NAIRA(item.value))))), showExport && /*#__PURE__*/React.createElement(ExportModal, {
    title: "Full Summary Report",
    onClose: () => setShowExport(false),
    onExcelExport: () => {
      loadSheetJS(() => {
        const wb = window.XLSX.utils.book_new();
        if (userSectors.includes("shop") && shopData.length) {
          const ws1 = window.XLSX.utils.aoa_to_sheet([["Date", "Item", "Qty", "Price (₦)", "Total (₦)"], ...shopData.map(s => [s.date, s.itemName, s.qty, s.price, s.total])]);
          ws1["!cols"] = [12, 20, 8, 12, 12].map(w => ({
            wch: w
          }));
          window.XLSX.utils.book_append_sheet(wb, ws1, "Shop Sales");
        }
        if (userSectors.includes("farm") && farmData.length) {
          const ws2 = window.XLSX.utils.aoa_to_sheet([["Date", "Description", "Category", "Amount (₦)"], ...farmData.map(e => [e.date, e.desc, e.category || "—", e.amount])]);
          ws2["!cols"] = [12, 28, 14, 14].map(w => ({
            wch: w
          }));
          window.XLSX.utils.book_append_sheet(wb, ws2, "Farm Expenses");
        }
        if (userSectors.includes("sales") && salesData.length) {
          const ws3 = window.XLSX.utils.aoa_to_sheet([["Date", "Notes"], ...salesData.map(e => [e.createdAt?.slice(0, 10) || "", e.f_notes || ""])]);
          ws3["!cols"] = [12, 36].map(w => ({
            wch: w
          }));
          window.XLSX.utils.book_append_sheet(wb, ws3, "Sales Rep");
        }
        if (debtData.length) {
          const ws4 = window.XLSX.utils.aoa_to_sheet([["Type", "Name", "Amount", "Date", "Due Date", "Status", "Note"], ...debtData.map(r => [r.type === "credit" ? "Credit" : "Debt", r.name, r.amount, r.date, r.dueDate || "—", r.settled ? "Settled" : "Outstanding", r.note || "—"])]);
          ws4["!cols"] = [10, 20, 12, 12, 12, 12, 24].map(w => ({
            wch: w
          }));
          window.XLSX.utils.book_append_sheet(wb, ws4, "Debt & Credit");
        }
        window.XLSX.writeFile(wb, "RecordChief_Overview_" + TODAY() + ".xlsx");
      });
      setShowExport(false);
    },
    onPDFExport: () => {
      const allRows = [...(userSectors.includes("shop") ? shopData.map(s => [s.date, "Shop Sale", s.itemName, NAIRA(s.total)]) : []), ...(userSectors.includes("farm") ? farmData.map(e => [e.date, "Farm Expense", e.desc, NAIRA(e.amount)]) : []), ...(userSectors.includes("sales") ? salesData.map(e => [e.createdAt?.slice(0, 10) || "", "Sales Entry", e.f_notes || "—", "—"]) : []), ...debtData.map(r => [r.date, r.type === "credit" ? "Credit" : "Debt", r.name, (r.type === "credit" ? "+" : "-") + NAIRA(r.amount)])].sort((a, b) => a[0] < b[0] ? 1 : -1);
      exportToPDF("Record Chief — Overview Report", ["Date", "Type", "Description", "Amount"], allRows, "Overview_Report");
      setShowExport(false);
    }
  }));
}

// ===================== DEBT & CREDIT =====================
const DC_TYPES = ["debt", "credit"]; // debt = I owe them | credit = they owe me

function DebtCreditScreen({
  user
}) {
  const key = `sl_debt_${user.uid}`;
  const [records, setRecords] = useLocalState(key, []);
  const [tab, setTab] = useState("list");
  const [typeFilter, setTypeFilter] = useState("credit");
  const [showTypeChoice, setShowTypeChoice] = useState(false);
  const [bulkMode, setBulkMode] = useState(false);
  const [bulkSelected, setBulkSelected] = useState(new Set());
  const [search, setSearch] = useState("");
  const [showExport, setShowExport] = useState(false);
  const [editId, setEditId] = useState(null);
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({
    type: "credit",
    name: "",
    amount: "",
    note: "",
    dueDate: "",
    date: TODAY(),
    paybackPeriod: "",
    paybackUnit: "months"
  });
  const [errors, setErrors] = useState({});
  const showToast = (msg, type = "success") => setToast({
    msg,
    type
  });
  const remaining = r => Math.max(0, r.amount - (r.payments || []).reduce((a, p) => a + p.amount, 0));
  const totalCredit = records.filter(r => r.type === "credit" && !r.settled).reduce((a, r) => a + remaining(r), 0);
  const totalDebt = records.filter(r => r.type === "debt" && !r.settled).reduce((a, r) => a + remaining(r), 0);
  const overdueCount = records.filter(r => !r.settled && r.dueDate && r.dueDate < TODAY()).length;
  const save = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.amount || isNaN(form.amount) || parseFloat(form.amount) <= 0) e.amount = "Enter a valid amount";
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    // Auto-compute dueDate from payback period if no explicit date set
    let computedDueDate = form.dueDate;
    if (!computedDueDate && form.paybackPeriod && parseInt(form.paybackPeriod) > 0) {
      const d = new Date(form.date || TODAY());
      const n = parseInt(form.paybackPeriod);
      if (form.paybackUnit === "days") d.setDate(d.getDate() + n);
      if (form.paybackUnit === "weeks") d.setDate(d.getDate() + n * 7);
      if (form.paybackUnit === "months") d.setMonth(d.getMonth() + n);
      computedDueDate = d.toISOString().split("T")[0];
    }
    const rec = {
      id: editId || uid(),
      type: form.type,
      name: form.name.trim(),
      amount: parseFloat(form.amount),
      note: form.note,
      dueDate: computedDueDate,
      paybackPeriod: form.paybackPeriod,
      paybackUnit: form.paybackUnit,
      date: form.date,
      settled: false,
      createdAt: editId ? records.find(r => r.id === editId)?.createdAt : TS(),
      updatedAt: TS()
    };
    if (editId) {
      setRecords(prev => prev.map(r => r.id === editId ? {
        ...rec,
        settled: r.settled
      } : r));
      showToast("Record updated!");
    } else {
      setRecords(prev => [rec, ...prev]);
      showToast(form.type === "credit" ? "Credit recorded!" : "Debt recorded!");
    }
    setForm({
      type: "credit",
      name: "",
      amount: "",
      note: "",
      dueDate: "",
      date: TODAY(),
      paybackPeriod: "",
      paybackUnit: "months"
    });
    setEditId(null);
    setErrors({});
    setTab("list");
  };
  const settle = id => {
    const rec = records.find(r => r.id === id);
    const nowSettled = !rec?.settled;
    setRecords(prev => {
      const updated = prev.map(r => r.id === id ? {
        ...r,
        settled: nowSettled,
        updatedAt: TS()
      } : r);
      if (nowSettled && rec?.recurring) {
        const {
          every,
          unit
        } = rec.recurring;
        const addDate = (dateStr, n, u) => {
          const d = new Date(dateStr || TODAY());
          if (u === "week") d.setDate(d.getDate() + n * 7);
          if (u === "month") d.setMonth(d.getMonth() + n);
          if (u === "year") d.setFullYear(d.getFullYear() + n);
          return d.toISOString().split("T")[0];
        };
        const next = {
          ...rec,
          id: uid(),
          date: addDate(rec.date, every, unit),
          dueDate: rec.dueDate ? addDate(rec.dueDate, every, unit) : "",
          settled: false,
          payments: [],
          createdAt: TS(),
          updatedAt: TS()
        };
        setTimeout(() => showToast("🔁 Next recurring record created"), 200);
        return [...updated, next];
      }
      return updated;
    });
    showToast(nowSettled ? "Marked as settled!" : "Marked as unsettled");
  };
  const remove = id => {
    setRecords(prev => prev.map(r => r.id === id ? {
      ...r,
      archived: true
    } : r));
    showToast("Record archived", "error");
  };
  const restore = id => {
    setRecords(prev => prev.map(r => r.id === id ? {
      ...r,
      archived: false
    } : r));
    showToast("Record restored!");
  };
  const hardDelete = id => {
    setRecords(prev => prev.filter(r => r.id !== id));
    showToast("Permanently deleted", "error");
  };
  const recordPayment = (id, amount) => {
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) return;
    setRecords(prev => prev.map(r => {
      if (r.id !== id) return r;
      const payments = [...(r.payments || []), {
        id: uid(),
        amount: amt,
        date: TODAY(),
        createdAt: TS()
      }];
      const paid = payments.reduce((a, p) => a + p.amount, 0);
      return {
        ...r,
        payments,
        settled: paid >= r.amount,
        updatedAt: TS()
      };
    }));
    showToast("Payment recorded!");
  };
  const startEdit = rec => {
    setForm({
      type: rec.type,
      name: rec.name,
      amount: String(rec.amount),
      note: rec.note || "",
      dueDate: rec.dueDate || "",
      date: rec.date || TODAY(),
      paybackPeriod: rec.paybackPeriod || "",
      paybackUnit: rec.paybackUnit || "months"
    });
    setEditId(rec.id);
    setTab("add");
  };
  const archivedRecords = records.filter(r => r.archived);
  const visible = records.filter(r => {
    if (r.archived) return false;
    if (typeFilter !== "all" && r.type !== typeFilter) return false;
    if (search && !r.name.toLowerCase().includes(search.toLowerCase()) && !(r.note || "").toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });
  const unsettled = visible.filter(r => !r.settled);
  const settled = visible.filter(r => r.settled);
  const isOverdue = r => !r.settled && r.dueDate && r.dueDate < TODAY();
  const isCredit = typeFilter === "credit";
  const accentColor = isCredit ? "#1D6F42" : COLORS.danger;
  const accentBg = isCredit ? "#EDF7EE" : COLORS.dangerLight;
  const accentBorder = isCredit ? "#86C99A" : "#E8A0A0";
  const activeUnsettled = records.filter(r => r.type === typeFilter && !r.settled && (!search || r.name.toLowerCase().includes(search.toLowerCase()) || (r.note || "").toLowerCase().includes(search.toLowerCase())));
  const activeSettled = records.filter(r => r.type === typeFilter && r.settled && (!search || r.name.toLowerCase().includes(search.toLowerCase()) || (r.note || "").toLowerCase().includes(search.toLowerCase())));
  const RecordCard = ({
    r,
    dimmed
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 14,
      marginBottom: 10,
      border: `1.5px solid ${dimmed ? COLORS.border : accentBorder}`,
      background: dimmed ? COLORS.bg : "#fff",
      overflow: "hidden",
      opacity: dimmed ? 0.65 : 1,
      boxShadow: dimmed ? "none" : "0 2px 8px rgba(0,0,0,0.06)",
      transition: "all 0.15s"
    }
  }, !dimmed && /*#__PURE__*/React.createElement("div", {
    style: {
      height: 3,
      background: accentColor,
      borderRadius: "14px 14px 0 0"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 14px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 42,
      height: 42,
      borderRadius: "50%",
      flexShrink: 0,
      background: dimmed ? COLORS.border : accentBg,
      border: `2px solid ${dimmed ? COLORS.border : accentBorder}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 18,
      fontWeight: 700,
      color: dimmed ? COLORS.textMuted : accentColor,
      fontFamily: "'Space Mono', monospace"
    }
  }, dimmed ? "✓" : r.name.charAt(0).toUpperCase()), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: dimmed ? COLORS.textMuted : COLORS.text,
      textDecoration: dimmed ? "line-through" : "none",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      maxWidth: "calc(100% - 80px)"
    }
  }, r.name), isOverdue(r) && !dimmed && /*#__PURE__*/React.createElement("span", {
    style: {
      background: "#FFF3CD",
      color: "#856404",
      border: "1px solid #FFD166",
      borderRadius: 6,
      fontSize: 9,
      fontWeight: 700,
      padding: "2px 7px",
      letterSpacing: "0.05em",
      flexShrink: 0
    }
  }, "\u26A0 OVERDUE")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: COLORS.textMuted,
      marginTop: 2,
      display: "flex",
      alignItems: "center",
      gap: 6,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", null, isCredit ? dimmed ? "Owed you" : "Owes you" : dimmed ? "You owed" : "You owe"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: COLORS.border
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, r.date), r.dueDate && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: COLORS.border
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: isOverdue(r) ? COLORS.amber : COLORS.textMuted
    }
  }, "Due ", r.dueDate))), r.note && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: COLORS.textLight,
      marginTop: 3,
      fontStyle: "italic",
      background: COLORS.bg,
      borderRadius: 6,
      padding: "3px 7px",
      display: "inline-block"
    }
  }, "\"", r.note, "\""), r.recurring && !dimmed && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      background: COLORS.primaryLight,
      color: COLORS.primary,
      borderRadius: 6,
      padding: "2px 7px",
      display: "inline-flex",
      alignItems: "center",
      gap: 3,
      marginTop: 3,
      fontWeight: 600,
      marginLeft: 4
    }
  }, "\uD83D\uDD01 every ", r.recurring.every, " ", r.recurring.unit, r.recurring.every > 1 ? "s" : ""), r.dueDate && !dimmed && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      background: COLORS.amberLight,
      color: COLORS.amber,
      borderRadius: 6,
      padding: "2px 7px",
      display: "inline-flex",
      alignItems: "center",
      gap: 3,
      marginTop: 3,
      fontWeight: 600,
      marginLeft: 4
    }
  }, "\uD83D\uDD14 ", r.reminderDays ?? 1, "d reminder")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "right",
      flexShrink: 0
    }
  }, (() => {
    const paid = (r.payments || []).reduce((a, p) => a + p.amount, 0);
    const remaining = Math.max(0, r.amount - paid);
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Space Mono', monospace",
        fontSize: 16,
        fontWeight: 700,
        color: dimmed ? COLORS.textMuted : accentColor,
        textDecoration: dimmed ? "line-through" : "none"
      }
    }, isCredit ? "+" : "-", NAIRA(r.amount)), paid > 0 && !dimmed && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: COLORS.danger,
        fontWeight: 600,
        marginTop: 1
      }
    }, "-", NAIRA(paid), " paid"), dimmed && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: COLORS.accent,
        fontWeight: 600,
        marginTop: 2
      }
    }, "SETTLED"));
  })())), !dimmed ? (() => {
    const payments = r.payments || [];
    const paid = payments.reduce((a, p) => a + p.amount, 0);
    const remaining = Math.max(0, r.amount - paid);
    const pct = Math.min(100, paid / r.amount * 100);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [payOpen, setPayOpen] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [payAmt, setPayAmt] = useState("");
    return /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 12,
        paddingTop: 10,
        borderTop: `0.5px solid ${COLORS.border}`
      }
    }, paid > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        fontSize: 10,
        color: COLORS.textMuted,
        marginBottom: 4
      }
    }, /*#__PURE__*/React.createElement("span", null, "Paid: ", /*#__PURE__*/React.createElement("strong", {
      style: {
        color: accentColor
      }
    }, NAIRA(paid))), /*#__PURE__*/React.createElement("span", null, "Remaining: ", /*#__PURE__*/React.createElement("strong", {
      style: {
        color: COLORS.danger
      }
    }, NAIRA(remaining)))), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 6,
        borderRadius: 3,
        background: COLORS.bg,
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: "100%",
        borderRadius: 3,
        background: accentColor,
        width: `${pct}%`,
        transition: "width 0.4s"
      }
    })), payments.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 6,
        display: "flex",
        flexWrap: "wrap",
        gap: 4
      }
    }, payments.map(p => /*#__PURE__*/React.createElement("span", {
      key: p.id,
      style: {
        fontSize: 10,
        background: accentBg,
        color: accentColor,
        border: `1px solid ${accentBorder}`,
        borderRadius: 6,
        padding: "2px 7px",
        fontWeight: 600
      }
    }, NAIRA(p.amount), " \xB7 ", p.date)))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => settle(r.id),
      style: {
        flex: 1,
        padding: "8px 0",
        border: "none",
        borderRadius: 8,
        cursor: "pointer",
        background: accentBg,
        color: accentColor,
        fontWeight: 700,
        fontSize: 12,
        fontFamily: "'Inter', sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 5
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "13",
      height: "13",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.5"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M20 6L9 17l-5-5"
    })), "Mark Settled"), /*#__PURE__*/React.createElement("button", {
      onClick: () => startEdit(r),
      style: {
        width: 36,
        height: 36,
        border: `1.5px solid ${COLORS.border}`,
        borderRadius: 8,
        background: "#fff",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: COLORS.textMuted,
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "edit",
      size: 14
    })), /*#__PURE__*/React.createElement("button", {
      onClick: () => remove(r.id),
      style: {
        width: 36,
        height: 36,
        border: `1.5px solid ${COLORS.dangerLight}`,
        borderRadius: 8,
        background: COLORS.dangerLight,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: COLORS.danger,
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "trash",
      size: 14
    }))), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setPayOpen(v => !v);
        setPayAmt("");
      },
      style: {
        marginTop: 8,
        width: "100%",
        padding: "7px 12px",
        border: `1px dashed ${accentBorder}`,
        borderRadius: 8,
        background: "transparent",
        cursor: "pointer",
        fontFamily: "'Inter', sans-serif",
        fontSize: 12,
        fontWeight: 600,
        color: accentColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "13",
      height: "13",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.5"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 5v14M5 12h14"
    })), payOpen ? "Cancel" : "Record Part Payment"), payOpen && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8,
        display: "flex",
        gap: 8,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        left: 10,
        top: "50%",
        transform: "translateY(-50%)",
        color: COLORS.textMuted,
        fontWeight: 700,
        fontSize: 13
      }
    }, "\u20A6"), /*#__PURE__*/React.createElement("input", {
      type: "number",
      className: "form-input",
      style: {
        paddingLeft: 26
      },
      placeholder: `Max ${NAIRA(remaining)}`,
      value: payAmt,
      onChange: e => setPayAmt(e.target.value),
      onKeyDown: e => {
        if (e.key === "Enter") {
          recordPayment(r.id, payAmt);
          setPayAmt("");
          setPayOpen(false);
        }
      }
    })), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        if (parseFloat(payAmt) > remaining) {
          showToast("Amount exceeds remaining balance", "error");
          return;
        }
        recordPayment(r.id, payAmt);
        setPayAmt("");
        setPayOpen(false);
      },
      style: {
        flexShrink: 0,
        padding: "10px 14px",
        border: "none",
        borderRadius: 8,
        background: accentColor,
        color: "#fff",
        fontWeight: 700,
        fontSize: 12,
        cursor: "pointer",
        fontFamily: "'Inter', sans-serif"
      }
    }, "Save")));
  })() : /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      display: "flex",
      justifyContent: "flex-end"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => settle(r.id),
    style: {
      background: "none",
      border: `1px solid ${COLORS.border}`,
      borderRadius: 7,
      padding: "5px 12px",
      fontSize: 11,
      color: COLORS.textMuted,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif"
    }
  }, "Undo"))));

  // Theme palette   entire UI shifts based on active tab
  const debtOutstanding = records.filter(r => r.type === "debt" && !r.settled).length;
  const debtAllClear = !isCredit && debtOutstanding === 0;
  const T = isCredit ? {
    bg: "#F0FAF4",
    bannerBg: "linear-gradient(135deg, #1B4332 0%, #2D6A4F 60%, #40916C 100%)",
    surface: "#fff",
    card: "#fff",
    cardBorder: "#B7E4C7",
    label: "#1D6F42",
    labelLight: "#4B9B6B",
    pale: "#D8F3DC",
    muted: "#74C69D",
    pill: "#1D6F42",
    sectionHdr: "#2D6A4F",
    searchBorder: "#86C99A",
    inactiveBg: "#EDF7EE",
    inactiveColor: "#1D6F42"
  } : debtAllClear ? {
    // All debts cleared   calming blue theme
    bg: "#EFF6FF",
    bannerBg: `linear-gradient(135deg, #1E3A8A 0%, ${COLORS.primaryDark} 60%, ${COLORS.primary} 100%)`,
    surface: "#fff",
    card: "#fff",
    cardBorder: "#BFDBFE",
    label: COLORS.primary,
    labelLight: "#60A5FA",
    pale: "#DBEAFE",
    muted: "#93C5FD",
    pill: COLORS.primary,
    sectionHdr: COLORS.primaryDark,
    searchBorder: "#BFDBFE",
    inactiveBg: COLORS.primaryLight,
    inactiveColor: COLORS.primary
  } : {
    bg: "#FFF5F5",
    bannerBg: `linear-gradient(135deg, #7F1D1D 0%, #B91C1C 60%, ${COLORS.danger} 100%)`,
    surface: "#fff",
    card: "#fff",
    cardBorder: "#FCA5A5",
    label: COLORS.danger,
    labelLight: "#E57373",
    pale: "#FEE2E2",
    muted: "#F87171",
    pill: COLORS.danger,
    sectionHdr: "#B91C1C",
    searchBorder: "#FCA5A5",
    inactiveBg: COLORS.dangerLight,
    inactiveColor: COLORS.danger
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 90,
      background: T.bg,
      minHeight: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: T.bannerBg,
      borderRadius: 18,
      padding: "18px 18px 16px",
      marginBottom: "1rem",
      color: "#fff",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: -20,
      right: -20,
      width: 80,
      height: 80,
      borderRadius: "50%",
      background: "rgba(255,255,255,0.07)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      marginBottom: 4
    }
  }, isCredit ? "💰" : "📤"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 800,
      letterSpacing: "-0.3px"
    }
  }, isCredit ? "Credits" : "Debts"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      opacity: 0.65,
      marginTop: 2
    }
  }, isCredit ? "Money others owe you" : "Money you owe others")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowExport(true),
    style: {
      background: "rgba(255,255,255,0.15)",
      border: "1px solid rgba(255,255,255,0.25)",
      borderRadius: 10,
      padding: "7px 12px",
      color: "#fff",
      fontSize: 12,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      fontWeight: 600,
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "download",
    size: 13
  }), " Export")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: "rgba(255,255,255,0.14)",
      borderRadius: 12,
      padding: "10px 12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      opacity: 0.65,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.05em"
    }
  }, "Outstanding"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Space Mono', monospace",
      fontSize: 15,
      fontWeight: 700,
      marginTop: 3
    }
  }, NAIRA(isCredit ? totalCredit : totalDebt)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      opacity: 0.55,
      marginTop: 1
    }
  }, (isCredit ? records.filter(r => r.type === "credit" && !r.settled) : records.filter(r => r.type === "debt" && !r.settled)).length, " records")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: "rgba(255,255,255,0.22)",
      borderRadius: 12,
      padding: "10px 12px",
      border: "1px solid rgba(255,255,255,0.3)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      opacity: 0.85,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.05em"
    }
  }, "Settled"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Space Mono', monospace",
      fontSize: 15,
      fontWeight: 700,
      marginTop: 3
    }
  }, (isCredit ? records.filter(r => r.type === "credit" && r.settled) : records.filter(r => r.type === "debt" && r.settled)).length), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      opacity: 0.6,
      marginTop: 1
    }
  }, "records closed")))), overdueCount > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#FFF8E1",
      border: "1.5px solid #FFD166",
      borderRadius: 12,
      padding: "10px 14px",
      fontSize: 12,
      color: "#856404",
      fontWeight: 600,
      marginBottom: "1rem",
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18
    }
  }, "\u26A0\uFE0F"), /*#__PURE__*/React.createElement("span", null, overdueCount, " record", overdueCount > 1 ? "s are" : " is", " past due date")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      marginBottom: "0.75rem"
    }
  }, [{
    id: "credit",
    emoji: "💰",
    label: "Credits",
    active: isCredit,
    activeBg: "#1D6F42",
    inactiveBg: "#EDF7EE",
    activeColor: "#fff",
    inactiveColor: "#1D6F42",
    count: records.filter(r => r.type === "credit" && !r.settled).length
  }, {
    id: "debt",
    emoji: "📤",
    label: "Debts",
    active: !isCredit,
    activeBg: COLORS.danger,
    inactiveBg: COLORS.dangerLight,
    activeColor: "#fff",
    inactiveColor: COLORS.danger,
    count: records.filter(r => r.type === "debt" && !r.settled).length
  }].map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    onClick: () => setTypeFilter(t.id),
    style: {
      flex: 1,
      padding: "11px 12px",
      borderRadius: 12,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      fontWeight: 700,
      fontSize: 13,
      border: "none",
      transition: "all 0.18s",
      background: t.active ? t.activeBg : t.inactiveBg,
      color: t.active ? t.activeColor : t.inactiveColor,
      boxShadow: t.active ? `0 3px 12px ${t.activeBg}55` : "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16
    }
  }, t.emoji), /*#__PURE__*/React.createElement("span", null, t.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      borderRadius: 20,
      padding: "1px 7px",
      background: t.active ? "rgba(255,255,255,0.25)" : t.activeBg,
      color: "#fff"
    }
  }, t.count)))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      marginBottom: "0.75rem"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 12,
      top: "50%",
      transform: "translateY(-50%)",
      color: T.muted,
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 15
  })), /*#__PURE__*/React.createElement("input", {
    style: {
      width: "100%",
      padding: "10px 36px 10px 38px",
      borderRadius: 12,
      border: `1.5px solid ${T.searchBorder}`,
      background: T.surface,
      fontSize: 13,
      fontFamily: "'Inter', sans-serif",
      outline: "none",
      color: COLORS.text,
      transition: "box-shadow 0.2s"
    },
    placeholder: `Search ${isCredit ? "credits" : "debts"}…`,
    value: search,
    onChange: e => setSearch(e.target.value)
  }), search && /*#__PURE__*/React.createElement("button", {
    onClick: () => setSearch(""),
    style: {
      position: "absolute",
      right: 10,
      top: "50%",
      transform: "translateY(-50%)",
      background: T.muted + "44",
      border: "none",
      borderRadius: "50%",
      width: 18,
      height: 18,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: T.label,
      fontSize: 11
    }
  }, "\u2715")), activeUnsettled.length === 0 && activeSettled.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "3rem 1rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 48,
      marginBottom: 12
    }
  }, isCredit ? "💰" : "📤"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: T.label,
      marginBottom: 6
    }
  }, "No ", isCredit ? "credits" : "debts", " yet"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: COLORS.textMuted
    }
  }, "Tap the + button below to add your first record")) : /*#__PURE__*/React.createElement(React.Fragment, null, activeUnsettled.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 8,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: T.label,
      letterSpacing: "0.08em",
      textTransform: "uppercase"
    }
  }, "Outstanding (", activeUnsettled.length, ")"), activeUnsettled.length > 1 && /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setBulkMode(v => !v);
      setBulkSelected(new Set());
    },
    style: {
      background: bulkMode ? T.label : "transparent",
      color: bulkMode ? "#fff" : T.label,
      border: `1.5px solid ${T.label}`,
      borderRadius: 8,
      padding: "3px 10px",
      fontSize: 11,
      fontWeight: 700,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif"
    }
  }, bulkMode ? "Cancel" : "Select")), bulkMode && bulkSelected.size > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 10,
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      bulkSelected.forEach(id => settle(id));
      setBulkSelected(new Set());
      setBulkMode(false);
    },
    style: {
      flex: 1,
      padding: "10px",
      border: "none",
      borderRadius: 10,
      background: T.label,
      color: "#fff",
      fontWeight: 700,
      fontSize: 13,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif"
    }
  }, "\u2713 Settle ", bulkSelected.size, " record", bulkSelected.size !== 1 ? "s" : ""), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      bulkSelected.forEach(id => remove(id));
      setBulkSelected(new Set());
      setBulkMode(false);
    },
    style: {
      padding: "10px 14px",
      border: "none",
      borderRadius: 10,
      background: COLORS.dangerLight,
      color: COLORS.danger,
      fontWeight: 700,
      fontSize: 13,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif"
    }
  }, "\uD83D\uDDD1\uFE0F")), activeUnsettled.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.id,
    style: {
      position: "relative"
    }
  }, bulkMode && /*#__PURE__*/React.createElement("div", {
    onClick: () => setBulkSelected(prev => {
      const next = new Set(prev);
      next.has(r.id) ? next.delete(r.id) : next.add(r.id);
      return next;
    }),
    style: {
      position: "absolute",
      top: 12,
      left: 12,
      zIndex: 10,
      width: 22,
      height: 22,
      borderRadius: 6,
      border: `2px solid ${bulkSelected.has(r.id) ? T.label : COLORS.border}`,
      background: bulkSelected.has(r.id) ? T.label : "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      flexShrink: 0
    }
  }, bulkSelected.has(r.id) && /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "3"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6L9 17l-5-5"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: bulkMode ? 38 : 0,
      transition: "margin 0.2s"
    }
  }, /*#__PURE__*/React.createElement(RecordCard, {
    r: r,
    dimmed: false
  }))))), activeSettled.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: T.sectionHdr,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      marginBottom: 8,
      marginTop: 16
    }
  }, "Settled (", activeSettled.length, ")"), activeSettled.map(r => /*#__PURE__*/React.createElement(RecordCard, {
    key: r.id,
    r: r,
    dimmed: true
  })))), archivedRecords.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: COLORS.textLight,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      marginBottom: 8
    }
  }, "\uD83D\uDDD1\uFE0F Archived (", archivedRecords.length, ")"), archivedRecords.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.id,
    style: {
      background: COLORS.bg,
      borderRadius: 12,
      padding: "10px 14px",
      marginBottom: 8,
      border: `1px solid ${COLORS.border}`,
      opacity: 0.7,
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: COLORS.textMuted,
      textDecoration: "line-through",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, r.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: COLORS.textLight,
      marginTop: 1
    }
  }, r.type === "credit" ? "💰 Credit" : "📤 Debt", " \xB7 ", r.date, " \xB7 ", NAIRA(r.amount))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => restore(r.id),
    style: {
      background: COLORS.accentLight,
      border: "none",
      borderRadius: 7,
      padding: "5px 10px",
      fontSize: 11,
      color: COLORS.accent,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      fontWeight: 600
    }
  }, "Restore"), /*#__PURE__*/React.createElement("button", {
    onClick: () => hardDelete(r.id),
    style: {
      background: COLORS.dangerLight,
      border: "none",
      borderRadius: 7,
      padding: "5px 10px",
      fontSize: 11,
      color: COLORS.danger,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      fontWeight: 600
    }
  }, "Delete"))))), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setEditId(null);
      setErrors({});
      setShowTypeChoice(true);
    },
    title: "Add new record",
    style: {
      position: "fixed",
      bottom: "calc(28px + var(--fab-lift, 0px))",
      right: 28,
      zIndex: 200,
      width: 56,
      height: 56,
      borderRadius: "50%",
      background: COLORS.primary,
      color: "#fff",
      border: "none",
      boxShadow: "0 4px 18px rgba(27,108,168,0.45)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      fontSize: 28,
      lineHeight: 1,
      transition: "transform 0.15s, box-shadow 0.15s"
    },
    onMouseEnter: e => {
      e.currentTarget.style.transform = "scale(1.1)";
      e.currentTarget.style.boxShadow = "0 6px 24px rgba(27,108,168,0.55)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.boxShadow = "0 4px 18px rgba(27,108,168,0.45)";
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 5v14M5 12h14"
  }))), showTypeChoice && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 300,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(0,0,0,0.45)"
    },
    onClick: () => setShowTypeChoice(false)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 22,
      padding: "28px 22px",
      width: "calc(100% - 56px)",
      maxWidth: 320,
      boxShadow: "0 20px 60px rgba(0,0,0,0.22)",
      animation: "scaleIn 0.2s cubic-bezier(0.4,0,0.2,1)"
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 38,
      marginBottom: 10
    }
  }, "\uD83E\uDD1D"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 700,
      color: COLORS.text,
      marginBottom: 6
    }
  }, "Add New Record"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: COLORS.textMuted,
      lineHeight: 1.6
    }
  }, "What type of record would you like to add?")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setForm({
        type: "credit",
        name: "",
        amount: "",
        note: "",
        dueDate: "",
        date: TODAY(),
        paybackPeriod: "",
        paybackUnit: "months"
      });
      setShowTypeChoice(false);
      setTab("add");
    },
    style: {
      padding: "14px 16px",
      borderRadius: 14,
      cursor: "pointer",
      border: "2px solid #86C99A",
      background: "#EDF7EE",
      fontFamily: "'Inter', sans-serif",
      textAlign: "left",
      transition: "all 0.15s"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 28,
      flexShrink: 0
    }
  }, "\uD83D\uDCB0"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: "#1D6F42"
    }
  }, "Credit"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#4B9B6B",
      marginTop: 2
    }
  }, "Someone owes you money")), /*#__PURE__*/React.createElement("svg", {
    style: {
      marginLeft: "auto"
    },
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#1D6F42",
    strokeWidth: "2.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 18l6-6-6-6"
  })))), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setForm({
        type: "debt",
        name: "",
        amount: "",
        note: "",
        dueDate: "",
        date: TODAY(),
        paybackPeriod: "",
        paybackUnit: "months"
      });
      setShowTypeChoice(false);
      setTab("add");
    },
    style: {
      padding: "14px 16px",
      borderRadius: 14,
      cursor: "pointer",
      border: `2px solid #E8A0A0`,
      background: COLORS.dangerLight,
      fontFamily: "'Inter', sans-serif",
      textAlign: "left",
      transition: "all 0.15s"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 28,
      flexShrink: 0
    }
  }, "\uD83D\uDCE4"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: COLORS.danger
    }
  }, "Debt"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#C0392B99",
      marginTop: 2
    }
  }, "You owe someone money")), /*#__PURE__*/React.createElement("svg", {
    style: {
      marginLeft: "auto"
    },
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: COLORS.danger,
    strokeWidth: "2.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 18l6-6-6-6"
  }))))), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowTypeChoice(false),
    style: {
      width: "100%",
      marginTop: 14,
      background: "none",
      border: "none",
      fontSize: 13,
      color: COLORS.textMuted,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      padding: "6px"
    }
  }, "Cancel"))), tab === "add" && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 300,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      alignItems: "center",
      background: "rgba(0,0,0,0.4)"
    },
    onClick: () => {
      setTab("list");
      setEditId(null);
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: "18px 18px 0 0",
      padding: "0 1rem 1.5rem",
      maxHeight: "90vh",
      overflowY: "auto",
      boxShadow: "0 -8px 40px rgba(0,0,0,0.15)",
      animation: "slideUp 0.25s cubic-bezier(0.4,0,0.2,1)",
      width: "100%",
      maxWidth: 340
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      padding: "12px 0 4px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 5,
      borderRadius: 3,
      background: COLORS.border
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700
    }
  }, editId ? "Edit Record" : "New Record"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setTab("list");
      setEditId(null);
    },
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: COLORS.textMuted,
      fontSize: 20,
      lineHeight: 1,
      padding: 4
    }
  }, "\xD7")), editId && /*#__PURE__*/React.createElement("div", {
    style: {
      background: COLORS.amberLight,
      color: COLORS.amber,
      borderRadius: 8,
      padding: "7px 12px",
      fontSize: 12,
      marginBottom: 12,
      fontWeight: 500
    }
  }, "Editing existing record"), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Type"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setForm(p => ({
      ...p,
      type: "credit"
    })),
    style: {
      flex: 1,
      padding: "10px",
      border: `2px solid ${form.type === "credit" ? "#1D6F42" : COLORS.border}`,
      borderRadius: 9,
      background: form.type === "credit" ? "#EDF7EE" : COLORS.bg,
      color: form.type === "credit" ? "#1D6F42" : COLORS.textMuted,
      fontWeight: 600,
      cursor: "pointer",
      fontSize: 13,
      fontFamily: "'Inter', sans-serif",
      transition: "all 0.15s"
    }
  }, "\uD83D\uDCB0 Credit (they owe me)"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setForm(p => ({
      ...p,
      type: "debt"
    })),
    style: {
      flex: 1,
      padding: "10px",
      border: `2px solid ${form.type === "debt" ? COLORS.danger : COLORS.border}`,
      borderRadius: 9,
      background: form.type === "debt" ? COLORS.dangerLight : COLORS.bg,
      color: form.type === "debt" ? COLORS.danger : COLORS.textMuted,
      fontWeight: 600,
      cursor: "pointer",
      fontSize: 13,
      fontFamily: "'Inter', sans-serif",
      transition: "all 0.15s"
    }
  }, "\uD83D\uDCE4 Debt (I owe them)"))), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, form.type === "credit" ? "Debtor's Name" : "Creditor's Name"), /*#__PURE__*/React.createElement("input", {
    className: `form-input${errors.name ? " error" : ""}`,
    placeholder: "Full name or business",
    value: form.name,
    onChange: e => {
      setForm(p => ({
        ...p,
        name: e.target.value
      }));
      setErrors(p => ({
        ...p,
        name: null
      }));
    }
  }), errors.name && /*#__PURE__*/React.createElement("div", {
    className: "form-error"
  }, errors.name)), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Amount (\u20A6)"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 12,
      top: "50%",
      transform: "translateY(-50%)",
      color: COLORS.textMuted,
      fontWeight: 600
    }
  }, "\u20A6"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    className: `form-input${errors.amount ? " error" : ""}`,
    style: {
      paddingLeft: 28
    },
    placeholder: "0.00",
    value: form.amount,
    onChange: e => {
      setForm(p => ({
        ...p,
        amount: e.target.value
      }));
      setErrors(p => ({
        ...p,
        amount: null
      }));
    }
  })), errors.amount && /*#__PURE__*/React.createElement("div", {
    className: "form-error"
  }, errors.amount)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group",
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Date"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    className: "form-input",
    value: form.date,
    onChange: e => setForm(p => ({
      ...p,
      date: e.target.value
    }))
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group",
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Due Date (optional)"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    className: "form-input",
    value: form.dueDate,
    onChange: e => setForm(p => ({
      ...p,
      dueDate: e.target.value
    }))
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: COLORS.bg,
      borderRadius: 14,
      padding: "14px",
      marginBottom: "0.85rem",
      border: `1px solid ${COLORS.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: COLORS.text,
      marginBottom: 10,
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, "\u23F1\uFE0F Payback Period", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: COLORS.textMuted,
      fontWeight: 400
    }
  }, "\u2014 optional")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: COLORS.textMuted,
      marginBottom: 10
    }
  }, "How long before this should be paid back?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "1",
    className: "form-input",
    placeholder: "e.g. 2",
    value: form.paybackPeriod,
    onChange: e => setForm(p => ({
      ...p,
      paybackPeriod: e.target.value
    })),
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("select", {
    className: "form-input",
    value: form.paybackUnit,
    onChange: e => setForm(p => ({
      ...p,
      paybackUnit: e.target.value
    })),
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "days"
  }, "Days"), /*#__PURE__*/React.createElement("option", {
    value: "weeks"
  }, "Weeks"), /*#__PURE__*/React.createElement("option", {
    value: "months"
  }, "Months"))), form.paybackPeriod && parseInt(form.paybackPeriod) > 0 && !form.dueDate && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: COLORS.accent,
      marginTop: 8,
      fontWeight: 600,
      display: "flex",
      alignItems: "center",
      gap: 5
    }
  }, "\u2713 Due date will be auto-set to ", form.paybackPeriod, " ", form.paybackUnit, " from today"), form.dueDate && form.paybackPeriod && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: COLORS.textMuted,
      marginTop: 8
    }
  }, "Using explicit due date above instead")), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Note (optional)"), /*#__PURE__*/React.createElement("textarea", {
    className: "form-input",
    rows: 2,
    placeholder: "What is this for?",
    value: form.note,
    onChange: e => setForm(p => ({
      ...p,
      note: e.target.value
    }))
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline",
    style: {
      flex: 1
    },
    onClick: () => {
      setTab("list");
      setEditId(null);
    }
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      flex: 2
    },
    onClick: save
  }, editId ? "Update Record" : form.type === "credit" ? "Save Credit" : "Save Debt")))), showExport && /*#__PURE__*/React.createElement(ExportModal, {
    title: "Debt & Credit",
    onClose: () => setShowExport(false),
    onExcelExport: () => {
      const headers = ["Type", "Name", "Amount (₦)", "Date", "Due Date", "Status", "Note"];
      const rows = records.map(r => [r.type === "credit" ? "Credit (they owe me)" : "Debt (I owe them)", r.name, r.amount, r.date, r.dueDate || "—", r.settled ? "Settled" : "Outstanding", r.note || "—"]);
      exportToExcel("Debt_Credit_" + TODAY(), "Records", rows, headers);
      setShowExport(false);
      showToast("Excel file downloaded!");
    },
    onPDFExport: () => {
      const headers = ["Type", "Name", "Amount (₦)", "Date", "Due Date", "Status"];
      const rows = records.map(r => [r.type === "credit" ? "Credit" : "Debt", r.name, NAIRA(r.amount), r.date, r.dueDate || "—", r.settled ? "Settled" : "Outstanding"]);
      exportToPDF("Debt & Credit — Records", headers, rows, "Debt_Credit");
      setShowExport(false);
    }
  }), toast && /*#__PURE__*/React.createElement(Toast, {
    msg: toast.msg,
    type: toast.type,
    onDone: () => setToast(null)
  }));
}

// ===================== MANAGE SECTORS =====================
function ManageSectorsScreen({
  user,
  onSave,
  onBack
}) {
  const [selected, setSelected] = useState(user.sectors && user.sectors.length > 0 ? [...user.sectors] : ["shop"]);
  const [error, setError] = useState("");
  const toggle = id => {
    setError("");
    setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };
  const save = () => {
    if (selected.length === 0) {
      setError("Please keep at least one sector selected.");
      return;
    }
    onSave(selected);
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: "1rem"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      background: "none",
      border: "none",
      color: COLORS.textMuted,
      display: "flex",
      alignItems: "center",
      gap: 6,
      fontSize: 13,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "back",
    size: 16
  }), " Back")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      marginBottom: 4
    }
  }, "Manage Sectors"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: COLORS.textMuted,
      marginBottom: "1rem"
    }
  }, "Select all the sectors you want to track. You can change this anytime."), error && /*#__PURE__*/React.createElement("div", {
    style: {
      background: COLORS.dangerLight,
      color: COLORS.danger,
      borderRadius: 8,
      padding: "8px 12px",
      fontSize: 13,
      marginBottom: 12,
      fontWeight: 500
    }
  }, error), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      marginBottom: 16
    }
  }, ALL_SECTORS.map(s => {
    const active = selected.includes(s.id);
    return /*#__PURE__*/React.createElement("div", {
      key: s.id,
      onClick: () => toggle(s.id),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "14px",
        borderRadius: 14,
        cursor: "pointer",
        transition: "all 0.18s",
        border: active ? `2px solid ${s.borderColor}` : `1.5px solid ${COLORS.border}`,
        background: active ? s.color : COLORS.surface
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 44,
        height: 44,
        borderRadius: 10,
        background: s.color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 22,
        flexShrink: 0
      }
    }, s.icon), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 600
      }
    }, s.label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: COLORS.textMuted,
        marginTop: 2
      }
    }, s.desc)), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 22,
        height: 22,
        borderRadius: "50%",
        flexShrink: 0,
        border: active ? "none" : `1.5px solid ${COLORS.border}`,
        background: active ? COLORS.primary : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.15s"
      }
    }, active && /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 13
    })));
  })), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: save,
    style: {
      opacity: selected.length === 0 ? 0.5 : 1
    }
  }, "Save \u2014 ", selected.length, " sector", selected.length !== 1 ? "s" : "", " selected"));
}

// ===================== PROFILE =====================

// ===================== HELP SUPPORT SECTION =====================
function HelpSupportSection() {
  const [helpModal, setHelpModal] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [suggestion, setSuggestion] = useState("");
  const [suggSent, setSuggSent] = useState(false);
  const faqs = [{
    q: "How do I record a sale?",
    a: "Go to your Shop sector, tap the + button, then choose 'Record a Sale'. Select the item, enter the quantity and tap Save."
  }, {
    q: "How do I add items to inventory?",
    a: "In the Shop screen, tap the + button and choose 'Add New Stock'. Fill in the item name, price and initial quantity."
  }, {
    q: "How do I track who owes me money?",
    a: "Go to Debt & Credit from the bottom bar. Tap +, choose 'Credit' (money owed to you), fill in the person's name and amount."
  }, {
    q: "How do I set a payment reminder?",
    a: "When adding a debt or credit record, set the 'Reminder' field to how many days before the due date you want to be alerted."
  }, {
    q: "How do I export my records?",
    a: "In any screen tap the Export button. You can export to Excel or PDF. The Overview screen lets you export all data at once."
  }, {
    q: "How do I switch between sectors?",
    a: "Tap 'Sector' in the bottom bar. To switch, use the Home screen sector grid or the sidebar on larger screens."
  }, {
    q: "How do I install the app?",
    a: "iPhone: Safari → Share → 'Add to Home Screen'. Android: Chrome menu → 'Add to Home Screen'. Opens full-screen like a native app."
  }, {
    q: "Can I use it on multiple phones?",
    a: "Your data is currently saved on this device. Export your records to back them up. Cloud sync is coming soon."
  }];
  const helpItems = [{
    id: "faq",
    icon: "❓",
    label: "FAQ",
    sub: "Frequently asked questions"
  }, {
    id: "tour",
    icon: "🗺️",
    label: "Guide Tour",
    sub: "How each section works"
  }, {
    id: "contact",
    icon: "💬",
    label: "Contact & Suggestions",
    sub: "Send feedback or get help"
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Help & Support"), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: 0,
      overflow: "hidden"
    }
  }, helpItems.map((item, i) => /*#__PURE__*/React.createElement("button", {
    key: item.id,
    onClick: () => setHelpModal(item.id),
    style: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "14px 16px",
      background: "none",
      border: "none",
      cursor: "pointer",
      borderBottom: i < helpItems.length - 1 ? `1px solid ${COLORS.border}` : "none",
      fontFamily: "'Inter', sans-serif",
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 11,
      background: COLORS.primaryLight,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 20,
      flexShrink: 0
    }
  }, item.icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      color: COLORS.text
    }
  }, item.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: COLORS.textMuted,
      marginTop: 2
    }
  }, item.sub)), /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: COLORS.textLight,
    strokeWidth: "2.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 18l6-6-6-6"
  }))))), helpModal === "faq" && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 400,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 16
    },
    onClick: () => setHelpModal(null)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 20,
      width: "100%",
      maxWidth: 440,
      maxHeight: "calc(100vh - 32px)",
      display: "flex",
      flexDirection: "column",
      boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
      animation: "scaleIn 0.2s ease"
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 18px 14px",
      borderBottom: `1px solid ${COLORS.border}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 10,
      background: COLORS.primaryLight,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 18
    }
  }, "\u2753"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 700
    }
  }, "FAQ")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setHelpModal(null),
    style: {
      background: COLORS.bg,
      border: "none",
      cursor: "pointer",
      width: 32,
      height: 32,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 18,
      color: COLORS.textMuted
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowY: "auto",
      flex: 1
    }
  }, faqs.map((item, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      borderBottom: `0.5px solid ${COLORS.border}`
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpenFaq(openFaq === i ? null : i),
    style: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 18px",
      background: "none",
      border: "none",
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      textAlign: "left",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: COLORS.text,
      lineHeight: 1.4,
      flex: 1
    }
  }, item.q), /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: COLORS.textMuted,
    strokeWidth: "2.5",
    style: {
      flexShrink: 0,
      transition: "transform 0.2s",
      transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 9l6 6 6-6"
  }))), openFaq === i && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 18px 14px",
      fontSize: 13,
      color: COLORS.textMuted,
      lineHeight: 1.7
    }
  }, item.a)))))), helpModal === "tour" && /*#__PURE__*/React.createElement(GuideTourModal, {
    onClose: () => setHelpModal(null)
  }), helpModal === "contact" && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 400,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 16
    },
    onClick: () => setHelpModal(null)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 20,
      width: "100%",
      maxWidth: 440,
      maxHeight: "calc(100vh - 32px)",
      display: "flex",
      flexDirection: "column",
      boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
      animation: "scaleIn 0.2s ease"
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 18px 14px",
      borderBottom: `1px solid ${COLORS.border}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 10,
      background: COLORS.primaryLight,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 18
    }
  }, "\uD83D\uDCAC"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 700
    }
  }, "Contact & Suggestions")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setHelpModal(null),
    style: {
      background: COLORS.bg,
      border: "none",
      cursor: "pointer",
      width: 32,
      height: 32,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 18,
      color: COLORS.textMuted
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowY: "auto",
      flex: 1,
      padding: "18px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F0FDF4",
      border: "1px solid #86EFAC",
      borderRadius: 14,
      padding: "14px 16px",
      display: "flex",
      alignItems: "center",
      gap: 14,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 12,
      background: "#25D366",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 22,
      flexShrink: 0
    }
  }, "\uD83D\uDCF1"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: COLORS.text
    }
  }, "Chat with us on WhatsApp"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: COLORS.textMuted,
      marginTop: 2
    }
  }, "We respond within 24 hours")), /*#__PURE__*/React.createElement("a", {
    href: "https://wa.me/2348119528922",
    target: "_blank",
    rel: "noreferrer",
    style: {
      background: "#25D366",
      color: "#fff",
      borderRadius: 10,
      padding: "8px 14px",
      fontSize: 13,
      fontWeight: 700,
      textDecoration: "none",
      flexShrink: 0,
      fontFamily: "'Inter', sans-serif"
    }
  }, "Chat")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: COLORS.text,
      marginBottom: 6
    }
  }, "\uD83D\uDCA1 Send a Suggestion"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: COLORS.textMuted,
      marginBottom: 10
    }
  }, "Have an idea to improve Record Chief? We'd love to hear it."), suggSent ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: COLORS.accentLight,
      border: `1px solid #6EE7B7`,
      borderRadius: 12,
      padding: "14px 16px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      marginBottom: 6
    }
  }, "\uD83C\uDF89"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: COLORS.accent
    }
  }, "Thank you for your feedback!"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: COLORS.textMuted,
      marginTop: 4
    }
  }, "Your suggestion has been sent.")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("textarea", {
    className: "form-input",
    rows: 4,
    placeholder: "e.g. I'd love to attach photos to expenses\u2026",
    value: suggestion,
    onChange: e => setSuggestion(e.target.value),
    style: {
      resize: "none",
      marginBottom: 10
    }
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    disabled: !suggestion.trim(),
    onClick: () => {
      if (suggestion.trim()) {
        const msg = encodeURIComponent("Record Chief Suggestion:\n\n" + suggestion.trim());
        window.open("https://wa.me/2348119528922?text=" + msg, "_blank");
        setSuggSent(true);
        setSuggestion("");
      }
    },
    style: {
      opacity: suggestion.trim() ? 1 : 0.5
    }
  }, "Send via WhatsApp")))))));
}

// ===================== GUIDE TOUR MODAL =====================
function GuideTourModal({
  onClose
}) {
  const [tourStep, setTourStep] = useState(null);
  const fullGuide = [{
    emoji: "🏠",
    title: "Home Screen",
    color: COLORS.primary,
    bg: COLORS.primaryLight,
    short: "Your dashboard and starting point",
    steps: [{
      icon: "👋",
      heading: "Welcome Banner",
      body: "At the top you see your name, today's date and business location. Tap 📊 OVERVIEW to jump to your dashboard."
    }, {
      icon: "🔔",
      heading: "Debt Alerts",
      body: "If any debt or credit is overdue or due soon, a coloured banner appears automatically. Tap it to go straight to Debt & Credit."
    }, {
      icon: "🏪",
      heading: "Sector Cards",
      body: "Your active sectors (Shop, Farm, Customer Records) appear as tappable cards. Tap any card to open that sector."
    }, {
      icon: "🤝",
      heading: "Debt & Credit Card",
      body: "A full-width card shows outstanding records. It turns red when records are overdue. Tap it to manage debts and credits."
    }]
  }, {
    emoji: "🏪",
    title: "Shop Sales",
    color: "#2563EB",
    bg: "#EFF6FF",
    short: "Record sales and manage inventory",
    steps: [{
      icon: "➕",
      heading: "Adding a Sale",
      body: "Tap the blue + button. Choose 'Record a Sale', pick the item, enter quantity and tap Save. Stock is reduced automatically."
    }, {
      icon: "📦",
      heading: "Adding Inventory",
      body: "Tap + then choose 'Add New Stock'. Enter the item name, price per unit, and how many you have. Tap Add to Inventory."
    }, {
      icon: "📋",
      heading: "Sales History",
      body: "The History tab shows every sale. Filter by tag, search by item name, sort by date or amount, and see your best-selling items at the top."
    }, {
      icon: "📅",
      heading: "Period Filter",
      body: "Use the 'View Period Sale' dropdown to see totals for Today, This Week, This Month, This Year or a Custom date range."
    }, {
      icon: "⚠️",
      heading: "Stock Alerts",
      body: "If an item runs out or falls below 5 units, a red or amber alert appears. Check Notifications for a full stock list."
    }]
  }, {
    emoji: "🌾",
    title: "Farm Expenses",
    color: "#1B4332",
    bg: "#ECFDF5",
    short: "Log and categorise farming costs",
    steps: [{
      icon: "➕",
      heading: "Adding an Expense",
      body: "Tap the green + button. Fill in the date, description, amount, and choose a category: Seeds, Fertilizer, Labor, Transport, Equipment or Others."
    }, {
      icon: "📂",
      heading: "Category Filter",
      body: "Tap any category chip to filter expenses by type. Tap 'All' to see everything."
    }, {
      icon: "📊",
      heading: "Spend Breakdown",
      body: "The banner shows a bar chart of your top spending categories so you can see where most of your farm money goes."
    }, {
      icon: "📤",
      heading: "Exporting",
      body: "Tap Export to download your farm expenses as an Excel or PDF file for your records or accountant."
    }]
  }, {
    emoji: "👥",
    title: "Customer Records",
    color: "#7C3AED",
    bg: "#F5F3FF",
    short: "Track clients, deals and custom data",
    steps: [{
      icon: "🔧",
      heading: "Setting Up Fields",
      body: "On your first entry, set up your columns. Add fields like Customer Name, Product, Amount, Status — anything that fits your business."
    }, {
      icon: "➕",
      heading: "Adding a Record",
      body: "Tap +. A popup asks to keep existing fields or reset. Fill in the form and tap Save Record."
    }, {
      icon: "🔤",
      heading: "Sorting Records",
      body: "Use the 'Sort by' dropdown to organise by Newest Date, Oldest Date, A to Z, Z to A, or Recently Added."
    }, {
      icon: "🔍",
      heading: "Searching",
      body: "Type in the search box to instantly find any record across all field values."
    }]
  }, {
    emoji: "🤝",
    title: "Debt & Credit",
    color: "#DC2626",
    bg: "#FEF2F2",
    short: "Track what you owe and what's owed to you",
    steps: [{
      icon: "💰",
      heading: "Credits — Money Owed to You",
      body: "Tap + and choose 'Credit'. Enter the person's name, amount and due date. Tracked as money others owe you."
    }, {
      icon: "📤",
      heading: "Debts — Money You Owe",
      body: "Tap + and choose 'Debt'. Enter who you owe, the amount and due date. The app reminds you before it's due."
    }, {
      icon: "⏱️",
      heading: "Payback Period",
      body: "Set a payback period like '2 months' instead of a specific date. The due date is calculated automatically."
    }, {
      icon: "🔔",
      heading: "Reminders",
      body: "Set how many days before the due date you want to be notified. Alerts appear on Home, Notifications and the bell icon."
    }, {
      icon: "💳",
      heading: "Part Payments",
      body: "For instalments, tap 'Record Part Payment'. Enter the amount. A progress bar shows what's left. Auto-settles when fully paid."
    }, {
      icon: "✅",
      heading: "Settling a Record",
      body: "When fully paid, tap 'Mark Settled'. Settled records move to a separate section. Recurring records auto-create the next one."
    }]
  }, {
    emoji: "📊",
    title: "Overview",
    color: "#059669",
    bg: "#ECFDF5",
    short: "Charts, trends and business health",
    steps: [{
      icon: "📅",
      heading: "Monthly Report Card",
      body: "See this month's Shop Sales, Farm Spend and Net Profit or Loss side by side at a glance."
    }, {
      icon: "💳",
      heading: "Health Score",
      body: "A colour-coded bar shows your debt-to-credit ratio. Green means healthy, amber means caution, red means at risk."
    }, {
      icon: "📈",
      heading: "Month Comparison",
      body: "See how this month compares to last month for shop sales and farm expenses with percentage change badges."
    }, {
      icon: "📊",
      heading: "6-Month Charts",
      body: "Bar charts for Shop Sales and Farm Expenses over the last 6 months let you spot trends easily."
    }, {
      icon: "💾",
      heading: "Export All",
      body: "Tap Export All to download a full Excel or PDF covering all sectors and debt records in one file."
    }]
  }, {
    emoji: "🔔",
    title: "Notifications",
    color: "#D97706",
    bg: "#FFFBEB",
    short: "All your alerts in one place",
    steps: [{
      icon: "🚨",
      heading: "Overdue Records",
      body: "Debts or credits past their due date appear in red showing the name, amount and days overdue."
    }, {
      icon: "⏰",
      heading: "Due Soon",
      body: "Records coming up within your reminder window appear in amber showing days remaining."
    }, {
      icon: "🚫",
      heading: "Out of Stock",
      body: "Shop items at zero stock appear here so you know what to restock immediately."
    }, {
      icon: "⚠️",
      heading: "Low Stock",
      body: "Items with fewer than 5 units show in amber so you can restock before running out."
    }, {
      icon: "🔢",
      heading: "Bell Badge",
      body: "The bell icon in the top bar shows a red number badge with the total count of active alerts."
    }]
  }];
  if (tourStep !== null) {
    const s = fullGuide[tourStep];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: "fixed",
        inset: 0,
        zIndex: 500,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16
      },
      onClick: () => setTourStep(null)
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#fff",
        borderRadius: 20,
        width: "100%",
        maxWidth: 440,
        maxHeight: "calc(100vh - 32px)",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        animation: "scaleIn 0.2s ease"
      },
      onClick: e => e.stopPropagation()
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: s.color,
        borderRadius: "20px 20px 0 0",
        padding: "20px 18px 16px",
        color: "#fff",
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 32
      }
    }, s.emoji), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 18,
        fontWeight: 800
      }
    }, s.title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        opacity: 0.75,
        marginTop: 2
      }
    }, s.short))), /*#__PURE__*/React.createElement("button", {
      onClick: () => setTourStep(null),
      style: {
        background: "rgba(255,255,255,0.2)",
        border: "none",
        cursor: "pointer",
        width: 32,
        height: 32,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18,
        color: "#fff"
      }
    }, "\xD7"))), /*#__PURE__*/React.createElement("div", {
      style: {
        overflowY: "auto",
        flex: 1,
        padding: "8px 0"
      }
    }, s.steps.map((step, si) => /*#__PURE__*/React.createElement("div", {
      key: si,
      style: {
        display: "flex",
        gap: 14,
        padding: "14px 18px",
        borderBottom: si < s.steps.length - 1 ? "0.5px solid " + COLORS.border : "none"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 40,
        height: 40,
        borderRadius: 10,
        background: s.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 20,
        flexShrink: 0
      }
    }, step.icon), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: COLORS.text,
        marginBottom: 4
      }
    }, step.heading), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: COLORS.textMuted,
        lineHeight: 1.7
      }
    }, step.body))))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "12px 18px 16px",
        borderTop: "1px solid " + COLORS.border,
        display: "flex",
        gap: 10,
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setTourStep(t => Math.max(0, t - 1)),
      disabled: tourStep === 0,
      style: {
        flex: 1,
        padding: "10px",
        border: "1px solid " + COLORS.border,
        borderRadius: 10,
        background: "transparent",
        color: tourStep === 0 ? COLORS.textLight : COLORS.text,
        fontFamily: "'Inter', sans-serif",
        fontWeight: 600,
        fontSize: 14,
        cursor: tourStep === 0 ? "default" : "pointer"
      }
    }, "\u2190 Prev"), /*#__PURE__*/React.createElement("button", {
      onClick: () => setTourStep(t => Math.min(fullGuide.length - 1, t + 1)),
      disabled: tourStep === fullGuide.length - 1,
      style: {
        flex: 1,
        padding: "10px",
        border: "none",
        borderRadius: 10,
        background: s.color,
        color: "#fff",
        fontFamily: "'Inter', sans-serif",
        fontWeight: 700,
        fontSize: 14,
        cursor: tourStep === fullGuide.length - 1 ? "default" : "pointer",
        opacity: tourStep === fullGuide.length - 1 ? 0.5 : 1
      }
    }, "Next \u2192"))));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 400,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 16
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 20,
      width: "100%",
      maxWidth: 440,
      maxHeight: "calc(100vh - 32px)",
      display: "flex",
      flexDirection: "column",
      boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
      animation: "scaleIn 0.2s ease"
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 18px 14px",
      borderBottom: "1px solid " + COLORS.border,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 10,
      background: COLORS.primaryLight,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 18
    }
  }, "\uD83D\uDDFA\uFE0F"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 700
    }
  }, "Guide Tour")), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      background: COLORS.bg,
      border: "none",
      cursor: "pointer",
      width: 32,
      height: 32,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 18,
      color: COLORS.textMuted
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowY: "auto",
      flex: 1,
      padding: "6px 0"
    }
  }, fullGuide.map((section, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => setTourStep(i),
    style: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "13px 18px",
      background: "none",
      border: "none",
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      textAlign: "left",
      borderBottom: i < fullGuide.length - 1 ? "0.5px solid " + COLORS.border : "none"
    },
    onMouseEnter: e => e.currentTarget.style.background = COLORS.bg,
    onMouseLeave: e => e.currentTarget.style.background = "transparent"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 12,
      background: section.bg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 22,
      flexShrink: 0
    }
  }, section.emoji), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: COLORS.text
    }
  }, section.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: COLORS.textMuted,
      marginTop: 2
    }
  }, section.short)), /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: COLORS.textLight,
    strokeWidth: "2.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 18l6-6-6-6"
  })))))));
}

// ===================== STAFF INVITE SECTION =====================
function StaffInviteSection({
  user
}) {
  const [email, setEmail] = useState("");
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [msg, setMsg] = useState({
    text: "",
    ok: true,
    isLink: false,
    copied: false
  });
  const [pendingToken] = useState(() => localStorage.getItem("rc_pending_invite"));
  const [acceptMsg, setAcceptMsg] = useState("");
  const [accepting, setAccepting] = useState(false);
  const token = localStorage.getItem("rc_token");

  // Load existing invites
  useEffect(() => {
    if (!token) {
      setFetching(false);
      return;
    }
    fetch(`${API_URL}/api/invite`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(r => r.json()).then(d => {
      setInvites(d.invites || []);
      setFetching(false);
    }).catch(() => setFetching(false));
  }, []);
  const sendInvite = async () => {
    if (!email.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      setMsg({
        text: "Enter a valid email address",
        ok: false
      });
      return;
    }
    setLoading(true);
    setMsg({
      text: "",
      ok: true
    });
    try {
      const res = await fetch(`${API_URL}/api/invite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase()
        })
      });
      const data = await res.json();
      if (!res.ok) {
        setMsg({
          text: data.error || "Failed to send invite",
          ok: false
        });
      } else {
        setInvites(prev => [data.invite, ...prev]);
        setEmail("");
        setMsg({
          text: data.inviteURL || window.location.origin + "?invite=" + (data.invite?.token || ""),
          ok: true,
          isLink: true
        });
      }
    } catch (e) {
      setMsg({
        text: "Network error. Try again.",
        ok: false
      });
    }
    setLoading(false);
  };
  const revokeInvite = async inviteId => {
    // Confirmed inline — no window.confirm needed
    try {
      const res = await fetch(`${API_URL}/api/invite/${inviteId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        // Remove from list immediately
        setInvites(prev => prev.filter(i => i._id !== inviteId));
      }
    } catch (e) {}
  };
  const acceptPendingInvite = async () => {
    if (!pendingToken) return;
    setAccepting(true);
    setAcceptMsg("");
    try {
      const res = await fetch(`${API_URL}/api/invite/accept`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          token: pendingToken
        })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.removeItem("rc_pending_invite");
        setAcceptMsg("✅ " + data.message);
        setTimeout(() => window.location.reload(), 2000);
      } else {
        setAcceptMsg("❌ " + (data.error || "Failed to accept invite"));
      }
    } catch (e) {
      setAcceptMsg("❌ Network error. Try again.");
    }
    setAccepting(false);
  };

  // If user has a pending invite token, show accept card
  if (pendingToken) {
    return /*#__PURE__*/React.createElement("div", {
      className: "card",
      style: {
        marginBottom: "0.75rem",
        background: COLORS.primaryLight,
        border: `1.5px solid ${COLORS.primary}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 40,
        height: 40,
        borderRadius: 12,
        background: COLORS.primary,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 22
      }
    }, "\uD83D\uDCE9"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: COLORS.primary
      }
    }, "You have a pending invite!"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: COLORS.textMuted,
        marginTop: 1
      }
    }, "Accept to join your employer's business records"))), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-primary",
      onClick: acceptPendingInvite,
      disabled: accepting
    }, accepting ? "Accepting…" : "✅ Accept Invite & Join Business"), acceptMsg && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        marginTop: 8,
        color: acceptMsg.startsWith("✅") ? COLORS.accent : COLORS.danger
      }
    }, acceptMsg), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        localStorage.removeItem("rc_pending_invite");
        window.location.reload();
      },
      style: {
        marginTop: 8,
        background: "none",
        border: "none",
        color: COLORS.textMuted,
        fontSize: 11,
        cursor: "pointer",
        fontFamily: "'Inter', sans-serif"
      }
    }, "Dismiss invite"));
  }
  if (user.role === "staff") {
    return /*#__PURE__*/React.createElement("div", {
      className: "card",
      style: {
        marginBottom: "0.75rem",
        background: COLORS.accentLight,
        border: `1.5px solid ${COLORS.accent}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 40,
        height: 40,
        borderRadius: 12,
        background: COLORS.accent,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 22
      }
    }, "\uD83D\uDC65"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: COLORS.accent
      }
    }, "Staff Account"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: COLORS.textMuted,
        marginTop: 1
      }
    }, "You have access to the Shop Sales section only. Farm, Customer Records and Debt are your own independent sections."))));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      marginBottom: "0.75rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 12,
      background: COLORS.primaryLight,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 22
    }
  }, "\uD83D\uDC65"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700
    }
  }, "Invite Staff"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: COLORS.textMuted,
      marginTop: 1
    }
  }, "Give a partner or employee access to your records"))), fetching ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: COLORS.textMuted,
      marginBottom: 12
    }
  }, "Loading...") : invites.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, invites.filter(inv => inv.status !== "revoked").map(inv => /*#__PURE__*/React.createElement("div", {
    key: inv._id,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "8px 0",
      borderBottom: `0.5px solid ${COLORS.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: "50%",
      background: inv.status === "accepted" ? COLORS.accentLight : COLORS.primaryLight,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 14,
      fontWeight: 700,
      color: inv.status === "accepted" ? COLORS.accent : COLORS.primary
    }
  }, (inv.staffName || inv.email)[0].toUpperCase()), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: COLORS.text
    }
  }, inv.staffName || inv.email), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: inv.status === "accepted" ? COLORS.accent : COLORS.amber,
      marginTop: 1
    }
  }, inv.status === "accepted" ? "✅ Active" : inv.status === "revoked" ? "❌ Revoked" : "⏳ Invite pending"))), inv.status !== "revoked" && /*#__PURE__*/React.createElement("button", {
    onClick: () => revokeInvite(inv._id),
    style: {
      background: COLORS.dangerLight,
      border: "none",
      cursor: "pointer",
      color: COLORS.danger,
      fontSize: 11,
      fontWeight: 700,
      borderRadius: 7,
      padding: "5px 10px",
      fontFamily: "'Inter', sans-serif"
    }
  }, "Remove")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    style: {
      flex: 1
    },
    placeholder: "staff@email.com",
    value: email,
    onChange: e => {
      setEmail(e.target.value);
      setMsg({
        text: "",
        ok: true
      });
    },
    onKeyDown: e => e.key === "Enter" && sendInvite(),
    type: "email"
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: sendInvite,
    disabled: loading,
    style: {
      flexShrink: 0,
      width: "auto",
      padding: "0 16px"
    }
  }, loading ? "..." : "Invite")), msg.text && !msg.isLink && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      marginTop: 8,
      color: msg.ok ? COLORS.accent : COLORS.danger,
      lineHeight: 1.5
    }
  }, msg.text), msg.isLink && msg.text && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      background: COLORS.accentLight,
      border: `1px solid #6EE7B7`,
      borderRadius: 12,
      padding: "12px 14px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: COLORS.accent,
      marginBottom: 8
    }
  }, "\u2705 Invite created! Share this link with your staff:"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: COLORS.textMuted,
      wordBreak: "break-all",
      marginBottom: 10,
      background: "var(--surface)",
      borderRadius: 8,
      padding: "8px 10px",
      fontFamily: "'Space Mono', monospace"
    }
  }, msg.text), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      navigator.clipboard.writeText(msg.text).then(() => {
        setMsg(prev => ({
          ...prev,
          copied: true
        }));
        setTimeout(() => setMsg(prev => ({
          ...prev,
          copied: false
        })), 2500);
      });
    },
    style: {
      flex: 1,
      background: COLORS.accent,
      color: "#fff",
      border: "none",
      borderRadius: 8,
      padding: "8px",
      fontSize: 12,
      fontWeight: 700,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif"
    }
  }, msg.copied ? "✅ Copied!" : "📋 Copy Link"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      const txt = encodeURIComponent("Join my business on Record Chief: " + msg.text);
      window.open("https://wa.me/?text=" + txt, "_blank");
    },
    style: {
      flex: 1,
      background: "#25D366",
      color: "#fff",
      border: "none",
      borderRadius: 8,
      padding: "8px",
      fontSize: 12,
      fontWeight: 700,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif"
    }
  }, "\uD83D\uDCF1 WhatsApp"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      padding: "10px 12px",
      background: COLORS.primaryLight,
      borderRadius: 10,
      fontSize: 12,
      color: COLORS.primary,
      lineHeight: 1.6
    }
  }, "\uD83D\uDCA1 Invited staff will have access to your ", /*#__PURE__*/React.createElement("strong", null, "Shop Sales"), " and ", /*#__PURE__*/React.createElement("strong", null, "Inventory"), " only. Farm, Customer Records and Debt sections remain private to each user. You can remove access anytime."));
}

// ===================== EMAIL VERIFY SECTION =====================
function EmailVerifySection({
  user,
  onVerified
}) {
  const [otp, setOtp] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const token = localStorage.getItem("rc_token");
  const sendCode = async () => {
    setSending(true);
    setError("");
    setSent(false);
    try {
      const res = await fetch(`${API_URL}/api/otp/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || "Failed to send code.");else {
        setSent(true);
        setOtp("");
      }
    } catch (e) {
      setError("Network error. Check your connection.");
    }
    setSending(false);
  };
  const verifyCode = async () => {
    if (!otp.trim()) {
      setError("Enter the code from your email");
      return;
    }
    setVerifying(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/otp/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          otp: otp.trim()
        })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Incorrect code.");
      } else {
        setSuccess(true);
        if (onVerified) onVerified();
      }
    } catch (e) {
      setError("Network error.");
    }
    setVerifying(false);
  };
  if (user.emailVerified || success) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: COLORS.accentLight,
        border: `1px solid #6EE7B7`,
        borderRadius: 14,
        padding: "14px 16px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: "0.75rem"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 24
      }
    }, "\u2705"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: COLORS.accent
      }
    }, "Email Verified"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: COLORS.textMuted,
        marginTop: 2
      }
    }, user.email, " is verified")));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: COLORS.amberLight,
      border: `1px solid #FCD34D`,
      borderRadius: 14,
      padding: "16px",
      marginBottom: "0.75rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22
    }
  }, "\uD83D\uDCE7"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: COLORS.amber
    }
  }, "Email not verified"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: COLORS.textMuted,
      marginTop: 1
    }
  }, "Verify your email to secure your account"))), sent ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: COLORS.accent,
      marginBottom: 10,
      background: COLORS.accentLight,
      borderRadius: 8,
      padding: "8px 10px"
    }
  }, "\u2705 Code sent to ", /*#__PURE__*/React.createElement("strong", null, user.email), ". Check your inbox (and spam folder)."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    type: "number",
    placeholder: "Enter 6-digit code",
    value: otp,
    maxLength: 6,
    onChange: e => {
      setOtp(e.target.value.slice(0, 6));
      setError("");
    },
    onKeyDown: e => e.key === "Enter" && verifyCode(),
    style: {
      flex: 1,
      textAlign: "center",
      fontFamily: "'Space Mono', monospace",
      fontSize: 18,
      fontWeight: 700,
      letterSpacing: 6
    },
    autoFocus: true
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-sm",
    onClick: verifyCode,
    disabled: verifying,
    style: {
      flexShrink: 0,
      padding: "0 14px"
    }
  }, verifying ? "…" : "Verify")), /*#__PURE__*/React.createElement("button", {
    onClick: sendCode,
    disabled: sending,
    style: {
      background: "none",
      border: "none",
      color: COLORS.primary,
      fontSize: 12,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      padding: 0
    }
  }, sending ? "Sending…" : "Resend code")) : /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: sendCode,
    disabled: sending,
    style: {
      background: COLORS.amber
    }
  }, sending ? "Sending…" : "📨 Send Verification Code"), error && /*#__PURE__*/React.createElement("div", {
    style: {
      color: COLORS.danger,
      fontSize: 12,
      marginTop: 8
    }
  }, error));
}

// ===================== DELETE ACCOUNT SECTION =====================
function DeleteAccountSection({
  user,
  onLogout
}) {
  const [open, setOpen] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const confirmDelete = async () => {
    if (emailInput.trim().toLowerCase() !== user.email?.toLowerCase()) {
      setError("Email does not match your account email.");
      return;
    }
    setLoading(true);
    setError("");
    const token = localStorage.getItem("rc_token");
    try {
      const res = await fetch(`${API_URL}/api/auth/account`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          email: emailInput.trim()
        })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to delete account.");
        setLoading(false);
        return;
      }
      // Clear all local data
      Object.keys(localStorage).forEach(k => localStorage.removeItem(k));
      onLogout();
    } catch (e) {
      setError("Network error. Check your connection.");
      setLoading(false);
    }
  };
  if (!open) return /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(true),
    style: {
      width: "100%",
      background: "none",
      border: `1px solid ${COLORS.danger}`,
      borderRadius: 10,
      padding: "10px 14px",
      color: COLORS.danger,
      fontSize: 13,
      fontWeight: 600,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      display: "flex",
      alignItems: "center",
      gap: 8,
      justifyContent: "center"
    }
  }, "\uD83D\uDDD1\uFE0F Delete Account"));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      background: COLORS.dangerLight,
      border: `1.5px solid #FCA5A5`,
      borderRadius: 14,
      padding: "16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 800,
      color: COLORS.danger,
      marginBottom: 6
    }
  }, "\u26A0\uFE0F Delete Account"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: COLORS.textMuted,
      marginBottom: 14,
      lineHeight: 1.6
    }
  }, "This will permanently delete your account and ", /*#__PURE__*/React.createElement("strong", null, "all your business records"), ". This cannot be undone."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: COLORS.text,
      marginBottom: 6
    }
  }, "Type your email ", /*#__PURE__*/React.createElement("strong", null, user.email), " to confirm:"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    type: "email",
    placeholder: user.email,
    value: emailInput,
    onChange: e => {
      setEmailInput(e.target.value);
      setError("");
    },
    style: {
      marginBottom: 10
    }
  }), error && /*#__PURE__*/React.createElement("div", {
    style: {
      color: COLORS.danger,
      fontSize: 12,
      marginBottom: 8
    }
  }, error), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setOpen(false);
      setEmailInput("");
      setError("");
    },
    className: "btn btn-outline",
    style: {
      flex: 1
    }
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    onClick: confirmDelete,
    disabled: loading || !emailInput.trim(),
    className: "btn btn-danger",
    style: {
      flex: 1,
      opacity: emailInput.trim() ? 1 : 0.5
    }
  }, loading ? "Deleting…" : "Delete Forever")));
}
function CurrencySelector() {
  const [cur, setCur] = useState(localStorage.getItem("sl_currency") || "NGN");
  const [saved, setSaved] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      marginBottom: "0.75rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 12,
      background: "var(--accent-light)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 22,
      flexShrink: 0
    }
  }, "\uD83D\uDCB1"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: "var(--text)"
    }
  }, "Currency"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-muted)",
      marginTop: 1
    }
  }, saved ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent)"
    }
  }, "\u2705 Saved \u2014 restart app to see changes") : "Default is Nigerian Naira (₦)")), /*#__PURE__*/React.createElement("select", {
    value: cur,
    onChange: e => {
      const v = e.target.value;
      setCur(v);
      localStorage.setItem("sl_currency", v);
      setSaved(true);
      // Fire sync event so all screens pick up new currency
      window.dispatchEvent(new CustomEvent("rc_sync_update"));
    },
    className: "form-input",
    style: {
      width: "auto",
      padding: "6px 10px",
      fontSize: 14,
      fontWeight: 700
    }
  }, Object.entries(CURRENCIES).map(([code, sym]) => /*#__PURE__*/React.createElement("option", {
    key: code,
    value: code
  }, sym, " ", code)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      display: "flex",
      gap: 6,
      flexWrap: "wrap"
    }
  }, Object.entries(CURRENCIES).map(([code, sym]) => /*#__PURE__*/React.createElement("button", {
    key: code,
    onClick: () => {
      setCur(code);
      localStorage.setItem("sl_currency", code);
      setSaved(true);
      window.dispatchEvent(new CustomEvent("rc_sync_update"));
    },
    style: {
      padding: "5px 12px",
      borderRadius: 20,
      fontSize: 12,
      fontWeight: 700,
      cursor: "pointer",
      fontFamily: "'Inter',sans-serif",
      background: cur === code ? "var(--primary)" : "var(--bg)",
      color: cur === code ? "#fff" : "var(--text-muted)",
      border: `1px solid ${cur === code ? "var(--primary)" : "var(--border)"}`,
      transition: "all 0.15s"
    }
  }, sym, " ", code))));
}
function ProfileScreen({
  user,
  onLogout,
  onManageSectors
}) {
  const avatarKey = `sl_avatar_${user.uid}`;
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [toast, setToast] = useState(null);
  const [avatar, setAvatar] = useLocalState(avatarKey, null);
  const initials = user.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
  const handleAvatarChange = e => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setToast({
        msg: "Image must be under 2MB",
        type: "error"
      });
      return;
    }
    const reader = new FileReader();
    reader.onload = ev => {
      setAvatar(ev.target.result);
      setToast({
        msg: "Profile picture updated!",
        type: "success"
      });
    };
    reader.readAsDataURL(file);
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "1.5rem 0 1rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 80,
      height: 80,
      margin: "0 auto 0.5rem"
    }
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "avatar-upload",
    style: {
      cursor: "pointer",
      display: "block",
      width: "100%",
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "profile-avatar-lg"
  }, avatar ? /*#__PURE__*/React.createElement("img", {
    src: avatar,
    alt: "Profile"
  }) : /*#__PURE__*/React.createElement("span", null, initials), /*#__PURE__*/React.createElement("div", {
    className: "avatar-edit-overlay"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "13",
    r: "4"
  }))))), /*#__PURE__*/React.createElement("input", {
    id: "avatar-upload",
    type: "file",
    accept: "image/*",
    style: {
      display: "none"
    },
    onChange: handleAvatarChange
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: COLORS.primary,
      marginBottom: 4,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "avatar-upload",
    style: {
      cursor: "pointer"
    }
  }, avatar ? "Change photo" : "Add profile photo"), avatar && /*#__PURE__*/React.createElement("span", {
    onClick: () => {
      setAvatar(null);
      setToast({
        msg: "Photo removed",
        type: "success"
      });
    },
    style: {
      color: COLORS.danger,
      marginLeft: 10,
      cursor: "pointer"
    }
  }, "Remove")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 700,
      marginTop: 6
    }
  }, user.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: COLORS.textMuted
    }
  }, user.email), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: COLORS.textLight,
      marginTop: 3
    }
  }, user.phone)), /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, editing ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Display Name"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    value: name,
    onChange: e => setName(e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline",
    style: {
      flex: 1
    },
    onClick: () => {
      setEditing(false);
      setName(user.name);
    }
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      flex: 1
    },
    onClick: () => {
      user.name = name;
      setEditing(false);
      setToast({
        msg: "Profile updated!",
        type: "success"
      });
    }
  }, "Save"))) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: COLORS.textMuted
    }
  }, "Full Name"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 500
    }
  }, user.name)), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline btn-sm",
    onClick: () => setEditing(true)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "edit",
    size: 14
  }), " Edit")), /*#__PURE__*/React.createElement("div", {
    className: "divider"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: COLORS.textMuted
    }
  }, "Email"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 500
    }
  }, user.email)), /*#__PURE__*/React.createElement("div", {
    className: "divider"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: COLORS.textMuted
    }
  }, "Phone"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 500
    }
  }, user.phone)), user.location && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "divider"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: COLORS.textMuted
    }
  }, "Business Location"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 500
    }
  }, user.location))))), /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Sharing & Collaboration"), (user.sectors || ["shop"]).includes("shop") && /*#__PURE__*/React.createElement(StaffInviteSection, {
    user: user
  }), /*#__PURE__*/React.createElement(EmailVerifySection, {
    user: user,
    onVerified: () => {
      const updated = {
        ...user,
        emailVerified: true
      };
      const session = localStorage.getItem("rc_session");
      if (session) localStorage.setItem("rc_session", JSON.stringify(updated));
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Currency & Display"), /*#__PURE__*/React.createElement(CurrencySelector, null), /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Privacy & Security"), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      marginBottom: "0.75rem"
    }
  }, (() => {
    const pinKey = "sl_pin";
    const [currentPin, setCurrentPin] = useLocalState(pinKey, null);
    const [pinSetup, setPinSetup] = useState(false);
    const [p1, setP1] = useState("");
    const [p2, setP2] = useState("");
    const [pErr, setPErr] = useState("");
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 38,
        height: 38,
        borderRadius: 10,
        background: COLORS.primaryLight,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18
      }
    }, "\uD83D\uDD12"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 700
      }
    }, "App PIN Lock"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: COLORS.textMuted,
        marginTop: 1
      }
    }, currentPin ? "PIN is set" : "No PIN — app is unlocked"))), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setPinSetup(v => !v);
        setP1("");
        setP2("");
        setPErr("");
      },
      style: {
        background: currentPin ? COLORS.dangerLight : COLORS.primaryLight,
        border: "none",
        borderRadius: 8,
        padding: "6px 12px",
        fontSize: 12,
        fontWeight: 700,
        cursor: "pointer",
        fontFamily: "'Inter', sans-serif",
        color: currentPin ? COLORS.danger : COLORS.primary
      }
    }, currentPin ? "Remove PIN" : pinSetup ? "Cancel" : "Set PIN")), currentPin && !pinSetup && /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setCurrentPin(null);
        showToast && showToast("PIN removed");
      },
      style: {
        marginTop: 8,
        width: "100%",
        padding: "8px",
        border: `1px solid ${COLORS.dangerLight}`,
        borderRadius: 8,
        background: COLORS.dangerLight,
        color: COLORS.danger,
        fontSize: 12,
        fontWeight: 600,
        cursor: "pointer",
        fontFamily: "'Inter', sans-serif"
      }
    }, "Remove PIN Lock"), pinSetup && !currentPin && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      className: "form-label"
    }, "New PIN (4 digits)"), /*#__PURE__*/React.createElement("input", {
      type: "password",
      inputMode: "numeric",
      maxLength: 4,
      className: "form-input",
      placeholder: "\u2022\u2022\u2022\u2022",
      value: p1,
      onChange: e => setP1(e.target.value.replace(/\D/g, "").slice(0, 4))
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      className: "form-label"
    }, "Confirm PIN"), /*#__PURE__*/React.createElement("input", {
      type: "password",
      inputMode: "numeric",
      maxLength: 4,
      className: "form-input",
      placeholder: "\u2022\u2022\u2022\u2022",
      value: p2,
      onChange: e => setP2(e.target.value.replace(/\D/g, "").slice(0, 4))
    })), pErr && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: COLORS.danger,
        marginBottom: 8
      }
    }, pErr), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-primary",
      onClick: () => {
        if (p1.length !== 4) {
          setPErr("PIN must be 4 digits");
          return;
        }
        if (p1 !== p2) {
          setPErr("PINs don't match");
          return;
        }
        setCurrentPin(p1);
        setPinSetup(false);
        setP1("");
        setP2("");
        setPErr("");
      }
    }, "Save PIN")));
  })()), (() => {
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
    if (isStandalone) return null;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: COLORS.primaryLight,
        border: `1px solid #BFDBFE`,
        borderRadius: 14,
        padding: "12px 14px",
        marginBottom: "0.75rem",
        display: "flex",
        gap: 10,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 24,
        flexShrink: 0
      }
    }, "\uD83D\uDCF2"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: COLORS.primary
      }
    }, "Install on your phone"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: COLORS.textMuted,
        marginTop: 2
      }
    }, "On iPhone: tap Share \u2192 \"Add to Home Screen\"", /*#__PURE__*/React.createElement("br", null), "On Android: tap menu \u2192 \"Add to Home Screen\"")));
  })(), /*#__PURE__*/React.createElement(HelpSupportSection, null), /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Account"), /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline",
    style: {
      width: "100%",
      marginBottom: 8,
      justifyContent: "flex-start",
      gap: 10
    },
    onClick: onManageSectors
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chart",
    size: 16
  }), " Manage Sectors"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline",
    style: {
      width: "100%",
      marginBottom: 8,
      justifyContent: "flex-start",
      gap: 10
    },
    onClick: async () => {
      const result = await AuthAPI.resetPassword(user.email);
      setToast({
        msg: result.ok ? USE_FIREBASE ? "Password reset email sent! Check your inbox." : "Reset sent (local mode)" : result.error || "Could not send reset",
        type: result.ok ? "success" : "error"
      });
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "settings",
    size: 16
  }), " Change Password"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-danger",
    style: {
      width: "100%",
      justifyContent: "flex-start",
      gap: 10
    },
    onClick: onLogout
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "logout",
    size: 16
  }), " Log Out")), /*#__PURE__*/React.createElement(DeleteAccountSection, {
    user: user,
    onLogout: onLogout
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginTop: "2rem",
      fontSize: 11,
      color: COLORS.textLight
    }
  }, "Record Chief v1.0 \xB7 Built for Nigerian businesses"), toast && /*#__PURE__*/React.createElement(Toast, {
    msg: toast.msg,
    type: toast.type,
    onDone: () => setToast(null)
  }));
}

// ===================== ONBOARDING =====================
function OnboardingScreen({
  user,
  onDone
}) {
  const [step, setStep] = useState(0);
  const steps = [{
    emoji: "👋",
    title: `Welcome, ${user.name.split(" ")[0]}!`,
    body: "Record Chief helps you track your business records — sales, expenses, debts and more — all in one place.",
    color: "#2563EB"
  }, {
    emoji: "🏪",
    title: "Track Your Sales",
    body: "Record every sale, manage your inventory, and see your best-selling items at a glance.",
    color: "#059669"
  }, {
    emoji: "🌾",
    title: "Log Farm Expenses",
    body: "Categorise spending on seeds, fertilizer, labour and more. See exactly where your money goes.",
    color: "#1B4332"
  }, {
    emoji: "🤝",
    title: "Debt & Credit",
    body: "Never forget who owes you money or who you owe. Set due dates and track part-payments.",
    color: "#DC2626"
  }, {
    emoji: "📊",
    title: "Your Overview",
    body: "The Overview screen shows charts, profit/loss summaries, and your business health score — always up to date.",
    color: "#7C3AED"
  }];
  const s = steps[step];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      background: `linear-gradient(145deg, ${s.color}CC, ${s.color})`,
      color: "#fff",
      transition: "background 0.4s"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: 360
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: "2.5rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 72,
      marginBottom: 20,
      lineHeight: 1
    }
  }, s.emoji), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      fontWeight: 800,
      letterSpacing: "-0.5px",
      marginBottom: 12
    }
  }, s.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      opacity: 0.85,
      lineHeight: 1.7
    }
  }, s.body)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      gap: 8,
      marginBottom: 28
    }
  }, steps.map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      width: i === step ? 24 : 8,
      height: 8,
      borderRadius: 4,
      background: i === step ? "#fff" : "rgba(255,255,255,0.35)",
      transition: "all 0.3s"
    }
  }))), /*#__PURE__*/React.createElement("button", {
    onClick: () => step < steps.length - 1 ? setStep(s => s + 1) : onDone(),
    style: {
      width: "100%",
      padding: "15px",
      border: "none",
      borderRadius: 14,
      background: "#fff",
      color: s.color,
      fontWeight: 800,
      fontSize: 16,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      boxShadow: "0 6px 24px rgba(0,0,0,0.2)"
    }
  }, step < steps.length - 1 ? "Next →" : "Get Started 🚀"), step > 0 && /*#__PURE__*/React.createElement("button", {
    onClick: () => setStep(s => s - 1),
    style: {
      width: "100%",
      marginTop: 10,
      padding: "10px",
      border: "1.5px solid rgba(255,255,255,0.4)",
      borderRadius: 14,
      background: "transparent",
      color: "#fff",
      fontWeight: 600,
      fontSize: 14,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif"
    }
  }, "\u2190 Back"), /*#__PURE__*/React.createElement("button", {
    onClick: onDone,
    style: {
      width: "100%",
      marginTop: 8,
      background: "none",
      border: "none",
      color: "rgba(255,255,255,0.5)",
      fontSize: 13,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      padding: "6px"
    }
  }, "Skip")));
}

// ===================== SYNC HISTORY SCREEN =====================
function SyncHistoryScreen({
  user
}) {
  const [log, setLog] = useState(() => {
    try {
      return SyncLog.get();
    } catch {
      return [];
    }
  });
  const [downloading, setDownloading] = useState(false);
  const lastSync = localStorage.getItem("rc_last_sync");

  // Weekly backup prompt   show if last backup was >7 days ago
  const lastBackupKey = `rc_last_backup_${user.uid}`;
  const lastBackup = localStorage.getItem(lastBackupKey);
  const daysSinceBackup = lastBackup ? Math.floor((Date.now() - new Date(lastBackup)) / 86400000) : 999;
  const showBackupPrompt = daysSinceBackup >= 7;
  const downloadBackup = async () => {
    const uid = user.uid;
    const readBiz = async k => {
      const v = await IDB.get(k).catch(() => null);
      if (v !== undefined && v !== null) return v;
      try {
        const r = localStorage.getItem(k);
        return r ? JSON.parse(r) : [];
      } catch {
        return [];
      }
    };
    const [_inv, _sales, _farm, _entries, _debt] = await Promise.all([readBiz(`sl_inv_${uid}`), readBiz(`sl_shopsales_${uid}`), readBiz(`sl_farm_${uid}`), readBiz(`sl_sales_${uid}`), readBiz(`sl_debt_${uid}`)]);
    const backup = {
      exportedAt: new Date().toISOString(),
      user: {
        name: user.name,
        email: user.email,
        location: user.location
      },
      inventory: _inv,
      shopSales: _sales,
      farmExpenses: _farm,
      salesEntries: _entries,
      debtRecords: _debt
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `RecordChief_Backup_${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    localStorage.setItem(lastBackupKey, new Date().toISOString());
    // refresh display
    setLog(SyncLog.get());
  };
  const typeColor = {
    kept_local: COLORS.amber,
    applied_server: COLORS.accent,
    conflict: COLORS.danger
  };
  const typeLabel = {
    kept_local: "⚠️ Kept Local",
    applied_server: "✅ Applied Server",
    conflict: "❌ Conflict"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "1rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      color: "var(--text)"
    }
  }, "\uD83D\uDD04 Sync History"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-muted)",
      marginTop: 3
    }
  }, lastSync ? `Last synced: ${new Date(lastSync).toLocaleString("en-NG")}` : "Not yet synced this session")), showBackupPrompt && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "linear-gradient(135deg, #1E3A8A, #2563EB)",
      borderRadius: 16,
      padding: "16px 18px",
      marginBottom: "1rem",
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 800,
      marginBottom: 5
    }
  }, "\uD83D\uDCE6 Weekly Backup Due"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      opacity: 0.85,
      marginBottom: 14,
      lineHeight: 1.6
    }
  }, lastBackup ? `Your last backup was ${daysSinceBackup} days ago. Download a fresh JSON backup of all your data.` : "You haven't downloaded a local backup yet. It's a safety net in case anything goes wrong."), /*#__PURE__*/React.createElement("button", {
    onClick: async () => {
      setDownloading(true);
      try {
        await downloadBackup();
      } finally {
        setDownloading(false);
      }
    },
    disabled: downloading,
    style: {
      background: "#fff",
      color: "#1E3A8A",
      border: "none",
      borderRadius: 10,
      padding: "9px 18px",
      fontSize: 13,
      fontWeight: 800,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif"
    }
  }, "\uD83D\uDCBE Download Backup Now")), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      marginBottom: "1rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 12,
      background: "var(--primary-light)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 20
    }
  }, "\uD83D\uDCBE"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: "var(--text)"
    }
  }, "Local JSON Backup"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "var(--text-muted)",
      marginTop: 1
    }
  }, lastBackup ? `Last backup: ${new Date(lastBackup).toLocaleDateString("en-NG")}` : "No backup downloaded yet"))), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: async () => {
      setDownloading(true);
      try {
        await downloadBackup();
      } finally {
        setDownloading(false);
      }
    },
    disabled: downloading
  }, downloading ? "⏳ Preparing..." : "💾 Download Full Backup (.json)"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "var(--text-muted)",
      marginTop: 8,
      lineHeight: 1.6
    }
  }, "Downloads all your records as a JSON file. Store it in Google Drive or WhatsApp for safety.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "0.5rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-title",
    style: {
      margin: 0
    }
  }, "Conflict Log"), log.length > 0 && /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      SyncLog.clear();
      setLog([]);
    },
    style: {
      background: "none",
      border: "none",
      color: COLORS.danger,
      fontSize: 12,
      fontWeight: 600,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif"
    }
  }, "Clear")), log.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      textAlign: "center",
      padding: "2rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 36,
      marginBottom: 8
    }
  }, "\u2705"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: "var(--text)",
      marginBottom: 4
    }
  }, "No conflicts"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-muted)"
    }
  }, "All syncs have been clean")) : /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: 0,
      overflow: "hidden"
    }
  }, log.map((entry, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: "12px 16px",
      borderBottom: i < log.length - 1 ? `0.5px solid var(--border)` : "none",
      display: "flex",
      alignItems: "flex-start",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: typeColor[entry.type] || COLORS.textMuted,
      marginTop: 5,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: typeColor[entry.type] || "var(--text)"
    }
  }, typeLabel[entry.type] || entry.type), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-muted)",
      marginTop: 2
    }
  }, entry.label, " \u2014 ", entry.reason), entry.localCount !== undefined && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "var(--text-light)",
      marginTop: 2
    }
  }, "Local: ", entry.localCount, " records \xB7 Server: ", entry.serverCount, " records")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "var(--text-light)",
      flexShrink: 0,
      marginTop: 2
    }
  }, new Date(entry.ts).toLocaleTimeString("en-NG", {
    hour: "2-digit",
    minute: "2-digit"
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      marginTop: "1rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: "var(--text)",
      marginBottom: 10
    }
  }, "\u2699\uFE0F Sync Settings"), [["Active interval", "Push every 30s · Pull every 15s"], ["Idle interval", "Push every 2min · Pull every 60s (saves battery)"], ["Background", "Sync paused when app is in background"], ["Conflict strategy", "Local data wins when server is behind"], ["Storage", "IndexedDB (primary) · localStorage (fallback)"]].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: "flex",
      justifyContent: "space-between",
      padding: "7px 0",
      borderBottom: `0.5px solid var(--border)`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: "var(--text-muted)",
      fontWeight: 600
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: "var(--text)",
      textAlign: "right",
      maxWidth: "55%"
    }
  }, v)))));
}

// ===================== OFFLINE INDICATOR =====================
function OfflineIndicator() {
  const [online, setOnline] = useState(navigator.onLine);
  const [showOnline, setShowOnline] = useState(false);
  const timerRef = useRef(null);
  useEffect(() => {
    const goOnline = () => {
      setOnline(true);
      setShowOnline(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setShowOnline(false), 3000);
    };
    const goOffline = () => {
      setOnline(false);
      setShowOnline(false);
    };
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
      clearTimeout(timerRef.current);
    };
  }, []);

  // Show nothing when online and no recent transition
  if (online && !showOnline) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      // Push below topbar (56px) so it never overlaps nav
      position: "fixed",
      top: 56,
      left: 0,
      right: 0,
      zIndex: 300,
      background: online ? COLORS.accent : "#1E293B",
      color: "#fff",
      fontSize: 13,
      fontWeight: 600,
      padding: "8px 16px",
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      animation: "slideDown 0.3s ease"
    }
  }, online ? "✅ Back online — syncing your data…" : "📵 You're offline — changes save locally");
}

// ===================== NOTIFICATIONS SCREEN =====================
function NotificationsScreen({
  user,
  onNavigateShop
}) {
  const debtKey = `sl_debt_${user.uid}`;
  const invKey = `sl_inv_${user.uid}`;
  const records = (() => {
    try {
      return JSON.parse(localStorage.getItem(debtKey)) || [];
    } catch {
      return [];
    }
  })();
  const inventory = (() => {
    try {
      return JSON.parse(localStorage.getItem(invKey)) || [];
    } catch {
      return [];
    }
  })();
  const now = new Date();
  const overdue = records.filter(r => !r.settled && !r.archived && r.dueDate && r.dueDate < TODAY());
  const dueSoon = records.filter(r => {
    if (r.settled || r.archived || !r.dueDate) return false;
    const days = Math.ceil((new Date(r.dueDate) - now) / 86400000);
    const threshold = parseInt(r.reminderDays ?? 1);
    return days >= 0 && days <= threshold;
  });
  const outOfStock = inventory.filter(i => i.stock === 0);
  const lowStock = inventory.filter(i => i.stock > 0 && i.stock < 5);
  const hasAny = overdue.length + dueSoon.length + outOfStock.length + lowStock.length > 0;
  const Section = ({
    emoji,
    title,
    color,
    bg,
    border,
    items,
    renderItem
  }) => items.length === 0 ? null : /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "1.25rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 20
    }
  }, emoji), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      background: color,
      color: "#fff",
      borderRadius: 20,
      fontSize: 11,
      fontWeight: 700,
      padding: "2px 9px",
      marginLeft: "auto"
    }
  }, items.length)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, items.map((item, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: bg,
      border: `1.5px solid ${border}`,
      borderRadius: 14,
      padding: "13px 14px",
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, renderItem(item)))));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 80
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: `linear-gradient(135deg, #1E293B 0%, #334155 100%)`,
      borderRadius: 18,
      padding: "18px",
      marginBottom: "1.25rem",
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 28,
      marginBottom: 8
    }
  }, "\uD83D\uDD14"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 800
    }
  }, "Notifications"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      opacity: 0.65,
      marginTop: 4
    }
  }, hasAny ? `${overdue.length + dueSoon.length + outOfStock.length + lowStock.length} alerts need your attention` : "You're all caught up!")), !hasAny && /*#__PURE__*/React.createElement("div", {
    className: "empty-state"
  }, /*#__PURE__*/React.createElement("div", {
    className: "empty-icon"
  }, "\u2705"), /*#__PURE__*/React.createElement("h3", null, "All clear!"), /*#__PURE__*/React.createElement("p", null, "No overdue debts, no stock issues. You're on top of everything.")), /*#__PURE__*/React.createElement(Section, {
    emoji: "\uD83D\uDEA8",
    title: "Overdue Records",
    color: COLORS.danger,
    bg: COLORS.dangerLight,
    border: "#FCA5A5",
    items: overdue,
    renderItem: r => {
      const daysOver = Math.abs(Math.ceil((new Date(r.dueDate) - now) / 86400000));
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 42,
          height: 42,
          borderRadius: 12,
          background: "#FEE2E2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          flexShrink: 0
        }
      }, r.type === "credit" ? "💰" : "📤"), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 15,
          fontWeight: 700,
          color: COLORS.text
        }
      }, r.name), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: COLORS.textMuted,
          marginTop: 2
        }
      }, r.type === "credit" ? "Owes you" : "You owe", " \xB7 Due ", r.dueDate)), /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: "right",
          flexShrink: 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: "'Space Mono', monospace",
          fontSize: 15,
          fontWeight: 700,
          color: COLORS.danger
        }
      }, NAIRA(r.amount)), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: COLORS.danger,
          fontWeight: 600,
          marginTop: 2
        }
      }, daysOver, "d overdue")));
    }
  }), /*#__PURE__*/React.createElement(Section, {
    emoji: "\u23F0",
    title: "Due Within 7 Days",
    color: COLORS.amber,
    bg: COLORS.amberLight,
    border: "#FCD34D",
    items: dueSoon,
    renderItem: r => {
      const days = Math.ceil((new Date(r.dueDate) - now) / 86400000);
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 42,
          height: 42,
          borderRadius: 12,
          background: "#FEF3C7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          flexShrink: 0
        }
      }, r.type === "credit" ? "💰" : "📤"), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 15,
          fontWeight: 700,
          color: COLORS.text
        }
      }, r.name), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: COLORS.textMuted,
          marginTop: 2
        }
      }, r.type === "credit" ? "Owes you" : "You owe", " \xB7 ", NAIRA(r.amount))), /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: "right",
          flexShrink: 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          fontWeight: 700,
          color: COLORS.amber
        }
      }, days === 0 ? "Today!" : `${days}d left`), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: COLORS.textMuted,
          marginTop: 2
        }
      }, "Due ", r.dueDate)));
    }
  }), /*#__PURE__*/React.createElement(Section, {
    emoji: "\uD83D\uDEAB",
    title: "Out of Stock",
    color: COLORS.danger,
    bg: COLORS.dangerLight,
    border: "#FCA5A5",
    items: outOfStock,
    renderItem: item => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 42,
        height: 42,
        borderRadius: 12,
        background: "#FEE2E2",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 20,
        flexShrink: 0
      }
    }, "\uD83D\uDCE6"), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 700,
        color: COLORS.text
      }
    }, item.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: COLORS.textMuted,
        marginTop: 2
      }
    }, NAIRA(item.price), " per unit \xB7 0 remaining")), /*#__PURE__*/React.createElement("button", {
      onClick: () => onNavigateShop && onNavigateShop(),
      style: {
        background: COLORS.danger,
        color: "#fff",
        borderRadius: 8,
        padding: "8px 14px",
        fontSize: 13,
        fontWeight: 700,
        flexShrink: 0,
        border: "none",
        cursor: "pointer",
        fontFamily: "'Inter', sans-serif"
      }
    }, "+ Add Stock"))
  }), /*#__PURE__*/React.createElement(Section, {
    emoji: "\u26A0\uFE0F",
    title: "Low Stock",
    color: COLORS.amber,
    bg: COLORS.amberLight,
    border: "#FCD34D",
    items: lowStock,
    renderItem: item => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 42,
        height: 42,
        borderRadius: 12,
        background: "#FEF3C7",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 20,
        flexShrink: 0
      }
    }, "\uD83D\uDCE6"), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 700,
        color: COLORS.text
      }
    }, item.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: COLORS.textMuted,
        marginTop: 2
      }
    }, NAIRA(item.price), " per unit")), /*#__PURE__*/React.createElement("button", {
      onClick: () => onNavigateShop && onNavigateShop(),
      style: {
        background: COLORS.amber,
        color: "#fff",
        borderRadius: 8,
        padding: "8px 14px",
        fontSize: 13,
        fontWeight: 700,
        flexShrink: 0,
        border: "none",
        cursor: "pointer",
        fontFamily: "'Inter', sans-serif"
      }
    }, item.stock, " left \u2014 Restock"))
  }));
}

// ===================== MAIN APP =====================
function App() {
  const [screen, setScreen] = useState("welcome");
  const [user, setUser] = useLocalState("sl_user", null);
  const [sector, setSector] = useLocalState("sl_sector", "shop");
  const [navTab, setNavTab] = useState("home");
  const [navHistory, setNavHistory] = useState(["home"]); // back stack
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");
  const [showGlobalSearch, setShowGlobalSearch] = useState(false);
  const [showSectorSwitcher, setShowSectorSwitcher] = useState(false);
  const [darkMode, setDarkMode] = useLocalState("sl_darkmode", false);
  const [notifCount, setNotifCount] = useState(0);
  const [pin, setPin] = useLocalState("sl_pin", null);
  const [showOnboarding, setShowOnboarding] = useLocalState("sl_onboarded", false);
  const [pinUnlocked, setPinUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  //    Back button / Android back gesture handler               
  useEffect(() => {
    // Push initial state so back button has somewhere to return to
    window.history.pushState({
      screen: "app",
      navTab: "home"
    }, "");
    const handlePopState = e => {
      // If not in app, let browser handle it
      if (screen !== "app") return;

      // If there's internal nav history, go back within the app
      setNavHistory(prev => {
        if (prev.length > 1) {
          const newHistory = prev.slice(0, -1);
          const prevTab = newHistory[newHistory.length - 1];
          setNavTab(prevTab);
          // Re-push state so there's always something to pop
          window.history.pushState({
            screen: "app",
            navTab: prevTab
          }, "");
          return newHistory;
        }
        // Already at home   go to home if not there
        if (navTab !== "home") {
          setNavTab("home");
          window.history.pushState({
            screen: "app",
            navTab: "home"
          }, "");
          return ["home"];
        }
        // At home   push state again to prevent exit on first press
        window.history.pushState({
          screen: "app",
          navTab: "home"
        }, "");
        return prev;
      });
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [screen, navTab]);

  // Real-time sync   push changes every 30s, pull latest every 15s
  useEffect(() => {
    if (!user?.uid) return;
    const uid = user.uid;

    //    Adaptive intervals                               
    // Active (user interacted in last 2 min): push 30s / pull 15s
    // Idle  (no interaction for 2+ min):      push 2min / pull 60s
    // Background (page hidden):               pause entirely
    let lastActivity = Date.now();
    let pushTimer = null;
    let pullTimer = null;
    const ACTIVE_PUSH = 30_000;
    const ACTIVE_PULL = 15_000;
    const IDLE_PUSH = 120_000;
    const IDLE_PULL = 60_000;
    const IDLE_THRESH = 120_000; // 2 min

    const isIdle = () => Date.now() - lastActivity > IDLE_THRESH;
    const markActive = () => {
      lastActivity = Date.now();
    };
    ["click", "keydown", "touchstart", "scroll"].forEach(ev => window.addEventListener(ev, markActive, {
      passive: true
    }));
    const doSync = () => {
      if (!navigator.onLine || document.hidden) return;
      AuthAPI.syncToServer(uid).catch(() => {});
    };
    const doPull = () => {
      if (!navigator.onLine || document.hidden) return;
      AuthAPI.syncFromServer(uid).catch(() => {});
    };
    const schedulePush = () => {
      clearTimeout(pushTimer);
      const delay = isIdle() ? IDLE_PUSH : ACTIVE_PUSH;
      pushTimer = setTimeout(() => {
        doSync();
        schedulePush();
      }, delay);
    };
    const schedulePull = () => {
      clearTimeout(pullTimer);
      const delay = isIdle() ? IDLE_PULL : ACTIVE_PULL;
      pullTimer = setTimeout(() => {
        doPull();
        schedulePull();
      }, delay);
    };

    // On login: PULL FIRST, then schedule normal push/pull
    // Never push on fresh login — would overwrite server data with empty local
    if (navigator.onLine) {
      setTimeout(doPull, 800); // pull server data first
    }
    schedulePush();
    schedulePull();

    // Increment syncTick on every server pull — forces data screens to remount
    const handleSyncUpdate = e => {
      setSyncTick(t => t + 1);
      try {
        const cached = JSON.parse(localStorage.getItem("rc_session") || "{}");
        if (cached.uid) setUser(prev => ({
          ...prev,
          ...cached
        }));
      } catch {}
    };
    window.addEventListener("rc_sync_update", handleSyncUpdate);

    // When coming back online: PULL first (get latest), then push local changes
    const handleOnline = () => {
      setTimeout(() => {
        doPull(); // get server state first
        setTimeout(doSync, 2000); // then push local changes
      }, 500);
    };
    window.addEventListener("online", handleOnline);

    // Push immediately on every data write (real-time cross-device sync)
    let writeTimer = null;
    const handleDataWrite = () => {
      if (!navigator.onLine) return;
      clearTimeout(writeTimer);
      writeTimer = setTimeout(() => {
        doSync();
        setTimeout(doPull, 2000);
      }, 1500);
    };
    window.addEventListener("rc_data_write", handleDataWrite);

    // Pause when tab hidden, resume when visible
    const handleVisibility = () => {
      if (!document.hidden) {
        markActive();
        if (navigator.onLine) {
          doSync();
          setTimeout(doPull, 1000);
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      clearTimeout(pushTimer);
      clearTimeout(pullTimer);
      clearTimeout(writeTimer);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("rc_sync_update", handleSyncUpdate);
      window.removeEventListener("rc_data_write", handleDataWrite);
      document.removeEventListener("visibilitychange", handleVisibility);
      ["click", "keydown", "touchstart", "scroll"].forEach(ev => window.removeEventListener(ev, markActive));
    };
  }, [user?.uid]);

  // Register push notification subscription
  useEffect(() => {
    if (!user?.uid) return;
    const registerPush = async () => {
      try {
        if (!('serviceWorker' in navigator) || !('PushManager' in window)) return;
        const reg = await navigator.serviceWorker.ready;
        const existing = await reg.pushManager.getSubscription();
        if (existing) return; // already subscribed
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') return;
        const sub = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: 'BII1mr0E_AuVpmeYLMkh56uNYL85STG9nB5AqbkSNQVvZZrkEjzWcadHQaJpYGa7CgoSuvCtNVT5aCvjnkNBYLU'
        });
        const token = localStorage.getItem('rc_token');
        if (!token) return;
        await fetch(`${API_URL}/api/push/subscribe`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            subscription: sub
          })
        });
        console.log('✅ Push notifications enabled');
      } catch (e) {
        console.log('Push setup skipped:', e.message);
      }
    };
    // Ask after 3 seconds so it doesn't feel intrusive on login
    const timer = setTimeout(registerPush, 3000);
    return () => clearTimeout(timer);
  }, [user?.uid]);

  // Real-time notification count   polls every 3 seconds
  useEffect(() => {
    const compute = () => {
      if (!user?.uid) return;
      const recs = (() => {
        try {
          return JSON.parse(localStorage.getItem(`sl_debt_${user.uid}`)) || [];
        } catch {
          return [];
        }
      })();
      const inv = (() => {
        try {
          return JSON.parse(localStorage.getItem(`sl_inv_${user.uid}`)) || [];
        } catch {
          return [];
        }
      })();
      const debtAlerts = recs.filter(r => {
        if (r.settled || r.archived || !r.dueDate) return false;
        const days = Math.ceil((new Date(r.dueDate) - new Date()) / 86400000);
        return days >= 0 && days <= parseInt(r.reminderDays ?? 1);
      }).length + recs.filter(r => !r.settled && !r.archived && r.dueDate && r.dueDate < new Date().toISOString().split("T")[0]).length;
      const stockAlerts = inv.filter(i => i.stock === 0 || i.stock < 5).length;
      setNotifCount(debtAlerts + stockAlerts);
    };
    compute();
    const timer = setInterval(compute, 3000);
    return () => clearInterval(timer);
  }, [user?.uid]);

  // Close sector switcher when navigating away
  useEffect(() => {
    setShowSectorSwitcher(false);
  }, [navTab]);

  // Track navTab changes to build back stack for Android back button
  const prevNavTabRef = useRef(null);
  useEffect(() => {
    if (!user) return; // don't track pre-login navigation
    const prev = prevNavTabRef.current;
    if (prev !== null && prev !== navTab) {
      // Push new entry to history
      window.history.pushState({
        screen: "app",
        navTab
      }, "");
      setNavHistory(h => {
        // Don't duplicate consecutive same tabs
        if (h[h.length - 1] === navTab) return h;
        // Limit stack to 20 entries
        const next = [...h, navTab].slice(-20);
        return next;
      });
    }
    prevNavTabRef.current = navTab;
  }, [navTab, user]);
  useEffect(() => {
    // Mobile PWA hints
    let meta = document.querySelector('meta[name="viewport"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "viewport";
      document.head.appendChild(meta);
    }
    meta.content = "width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no";

    // Theme colour for browser chrome
    let themeColor = document.querySelector('meta[name="theme-color"]');
    if (!themeColor) {
      themeColor = document.createElement("meta");
      themeColor.name = "theme-color";
      document.head.appendChild(themeColor);
    }
    themeColor.content = darkMode ? "#0F172A" : "#2563EB";

    // PWA capable
    let appleCapable = document.querySelector('meta[name="apple-mobile-web-app-capable"]');
    if (!appleCapable) {
      appleCapable = document.createElement("meta");
      appleCapable.name = "apple-mobile-web-app-capable";
      appleCapable.content = "yes";
      document.head.appendChild(appleCapable);
    }
    let appleTitle = document.querySelector('meta[name="apple-mobile-web-app-title"]');
    if (!appleTitle) {
      appleTitle = document.createElement("meta");
      appleTitle.name = "apple-mobile-web-app-title";
      appleTitle.content = "Record Chief";
      document.head.appendChild(appleTitle);
    }
    document.title = "Record Chief";
  }, [darkMode]);
  const avatarKey = user ? `sl_avatar_${user.uid}` : null;
  const [avatar] = useLocalState(avatarKey || "sl_avatar_none", null);
  useEffect(() => {
    // Check for invite token in URL
    const params = new URLSearchParams(window.location.search);
    const inviteToken = params.get("invite");
    if (inviteToken) {
      localStorage.setItem("rc_pending_invite", inviteToken);
      // Clean URL
      window.history.replaceState({}, "", "/");
    }
    if (user) {
      setScreen("app");
      // If there's a pending invite, accept it now
      const pendingInvite = localStorage.getItem("rc_pending_invite");
      if (pendingInvite) {
        const jwt = localStorage.getItem("rc_token");
        if (jwt) {
          fetch(`${API_URL}/api/invite/accept`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`
            },
            body: JSON.stringify({
              token: pendingInvite
            })
          }).then(r => r.json()).then(data => {
            if (data.message) {
              localStorage.removeItem("rc_pending_invite");
              alert("You now have access to the business records!");
              // Sync owner's data to localStorage
              if (data.ownerData) {
                const uid = user.uid || user._id;
                // Will be handled by next syncFromServer call
              }
            }
          }).catch(() => {});
        }
      }
    } else {
      // Try to restore session from cache (works offline)
      const token = localStorage.getItem("rc_token");
      const session = localStorage.getItem("rc_session");
      if (token && session) {
        try {
          const cached = JSON.parse(session);
          // Verify token hasn't expired (JWT exp is in seconds)
          const payload = JSON.parse(atob(token.split('.')[1]));
          if (payload.exp * 1000 > Date.now()) {
            setUser(cached);
            setScreen("app");
            // Silently try to refresh from server
            fetch(`${API_URL}/api/auth/me`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }).then(r => r.ok ? r.json() : null).then(data => {
              if (data?.user) {
                const fresh = {
                  ...data.user,
                  uid: data.user._id
                };
                setUser(fresh);
                localStorage.setItem("rc_session", JSON.stringify(fresh));
              }
            }).catch(() => {});
            return;
          }
        } catch (e) {}
      }
      setScreen("welcome");
    }
  }, []);
  const [showPinSetup, setShowPinSetup] = useState(false);
  const [syncTick, setSyncTick] = useState(0); // increments on every successful pull
  const [pinSetupMode, setPinSetupMode] = useState("prompt"); // "prompt" | "enter"
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [pinP1, setPinP1] = useState("");
  const [pinP2, setPinP2] = useState("");
  const [pinErr, setPinErr] = useState("");
  const handleAuth = (u, sectors, isNewSignup = false) => {
    const fullUser = {
      ...u,
      sectors: sectors || u.sectors || ["shop"]
    };
    setUser(fullUser);
    localStorage.setItem("rc_session", JSON.stringify(fullUser));
    if (fullUser.role === "staff") {
      setSector("shop");
    } else if (sectors && sectors.length > 0) {
      setSector(sectors[0]);
    }
    setScreen("app");
    setNavTab("home");
    if (!showOnboarding) {
      setShowOnboarding(false);
    }
    // PIN setup is triggered after onboarding completes (see OnboardingScreen onDone)
    // We still set the flag so the onboarding knows to show it
    if (isNewSignup) localStorage.setItem("rc_new_signup", "1");
    // Weekly backup nudge
    const _lbk = `rc_last_backup_${fullUser.uid}`;
    const _lb = localStorage.getItem(_lbk);
    const _days = _lb ? Math.floor((Date.now() - new Date(_lb)) / 86400000) : 999;
    // Backup reminder handled via badge on Sync tab — no forced redirect

    // Pull latest data from server   also refresh profile to get latest sectors
    const token = localStorage.getItem("rc_token");
    if (token) {
      fetch(`${API_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(r => r.ok ? r.json() : null).then(data => {
        if (data?.user) {
          const fresh = {
            ...data.user,
            uid: data.user._id
          };
          setUser(fresh);
          localStorage.setItem("rc_session", JSON.stringify(fresh));
        }
      }).catch(() => {});
    }
    // Pull data from server on every login — primary sync trigger on new device
    const authUid = fullUser.uid || fullUser._id;
    if (navigator.onLine) {
      localStorage.removeItem("rc_last_sync"); // force fresh pull
      setTimeout(() => AuthAPI.syncFromServer(authUid).catch(() => {}), 800);
    }
  };
  const handleLogout = async () => {
    await AuthAPI.signOut();
    setUser(null);
    setScreen("login");
  };
  const handleManageSectors = () => setNavTab("manageSectors");
  const handleSaveSectors = async newSectors => {
    const updated = {
      ...user,
      sectors: newSectors
    };
    setUser(updated);
    // Update cached session so sectors persist offline
    localStorage.setItem("rc_session", JSON.stringify(updated));
    // if current active sector was removed, switch to first available
    if (!newSectors.includes(sector)) setSector(newSectors[0]);
    setNavTab("home");
    // Save sectors to backend so they persist after logout/login
    const token = localStorage.getItem("rc_token");
    if (token) {
      try {
        await fetch(`${API_URL}/api/auth/profile`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            sectors: newSectors
          })
        });
      } catch (e) {/* silent — localStorage is already updated */}
    }
  };
  if (screen === "welcome") return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, css), /*#__PURE__*/React.createElement(WelcomeScreen, {
    onNavigate: setScreen
  }));
  if (screen === "demo") return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, css), /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: "linear-gradient(145deg,#5B21B6,#7C3AED,#4338CA)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem 1.5rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 52,
      marginBottom: 16
    }
  }, "\uD83C\uDFAE"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Space Mono',monospace",
      fontSize: 22,
      fontWeight: 700,
      color: "#fff",
      marginBottom: 8
    }
  }, "Demo Mode"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "rgba(255,255,255,0.75)",
      textAlign: "center",
      maxWidth: 280,
      lineHeight: 1.7,
      marginBottom: 28
    }
  }, "Explore Record Chief with sample business data \u2014 no account needed. Changes won't be saved."), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 20,
      padding: "20px",
      width: "100%",
      maxWidth: 360
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: COLORS.text,
      marginBottom: 14
    }
  }, "What you'll explore:"), [["🏪", "Shop Sales", "See a shop with 5 products, today's sales, and stock alerts"], ["🌾", "Farm Records", "View farm expenses across seeds, labour, and equipment"], ["🤝", "Debt & Credit", "See outstanding credits, overdue amounts, and settled records"], ["💼", "Customer Records", "Browse sample customer entries with custom fields"]].map(([icon, title, desc]) => /*#__PURE__*/React.createElement("div", {
    key: title,
    style: {
      display: "flex",
      gap: 12,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      flexShrink: 0
    }
  }, icon), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: COLORS.text
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: COLORS.textMuted,
      marginTop: 2,
      lineHeight: 1.5
    }
  }, desc)))), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      marginBottom: 10,
      background: "linear-gradient(135deg,#7C3AED,#5B21B6)"
    },
    onClick: () => {
      loadDemoData().then(() => {
        setUser(DEMO_USER);
        setSector("shop");
        setScreen("app");
      });
    }
  }, "\uD83D\uDE80 Launch Demo"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setScreen("welcome"),
    style: {
      width: "100%",
      background: "none",
      border: "none",
      color: COLORS.textMuted,
      fontSize: 13,
      cursor: "pointer",
      fontFamily: "'Inter',sans-serif",
      padding: "8px"
    }
  }, "\u2190 Back to Welcome"))));
  if (screen === "signup") return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, css), /*#__PURE__*/React.createElement(SignupScreen, {
    onAuth: handleAuth,
    onNavigate: setScreen
  }));
  if (screen === "login") return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, css), /*#__PURE__*/React.createElement(LoginScreen, {
    onAuth: handleAuth,
    onNavigate: setScreen
  }));
  if (!showOnboarding && user) return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, css), /*#__PURE__*/React.createElement(OnboardingScreen, {
    user: user,
    onDone: () => {
      setShowOnboarding(true);
      // Show PIN setup after onboarding completes (new signup only)
      if (!localStorage.getItem("sl_pin")) {
        setTimeout(() => setShowPinSetup(true), 400);
      }
    }
  }));
  if (showPinSetup) return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, css), /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: "linear-gradient(135deg,#1E3A8A 0%,#1D4ED8 55%,#0F766E 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 24,
      padding: "32px 28px",
      width: "100%",
      maxWidth: 360,
      textAlign: "center",
      boxShadow: "0 24px 60px rgba(0,0,0,0.25)"
    }
  }, pinSetupMode === "prompt" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 52,
      marginBottom: 12
    }
  }, "\uD83D\uDD12"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 800,
      color: COLORS.text,
      marginBottom: 8
    }
  }, "Set a PIN lock?"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: COLORS.textMuted,
      marginBottom: 28,
      lineHeight: 1.7
    }
  }, "Protect your business records with a 4-digit PIN. You can always set or change this later in Profile."), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      marginBottom: 12,
      fontSize: 15,
      fontWeight: 700
    },
    onClick: () => {
      setPinSetupMode("enter");
      setPinP1("");
      setPinP2("");
      setPinErr("");
    }
  }, "\uD83D\uDD10 Set PIN Now"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setShowPinSetup(false);
      setPinSetupMode("prompt");
      localStorage.removeItem("rc_new_signup");
    },
    style: {
      width: "100%",
      background: "none",
      border: "none",
      color: COLORS.textMuted,
      fontSize: 13,
      cursor: "pointer",
      fontFamily: "'Inter',sans-serif",
      padding: 8
    }
  }, "Skip for now")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 40,
      marginBottom: 10
    }
  }, "\uD83D\uDD10"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 800,
      color: COLORS.text,
      marginBottom: 6
    }
  }, "Create your PIN"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: COLORS.textMuted,
      marginBottom: 20,
      lineHeight: 1.6
    }
  }, "Enter a 4-digit PIN to secure your account."), /*#__PURE__*/React.createElement("div", {
    className: "form-group",
    style: {
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "New PIN (4 digits)"), /*#__PURE__*/React.createElement("input", {
    type: "password",
    inputMode: "numeric",
    maxLength: 4,
    className: "form-input",
    value: pinP1,
    onChange: e => {
      setPinP1(e.target.value.replace(/\D/g, ""));
      setPinErr("");
    },
    placeholder: "\u2022\u2022\u2022\u2022",
    style: {
      textAlign: "center",
      fontSize: 30,
      letterSpacing: 14,
      fontFamily: "'Space Mono',monospace"
    },
    autoFocus: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group",
    style: {
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Confirm PIN"), /*#__PURE__*/React.createElement("input", {
    type: "password",
    inputMode: "numeric",
    maxLength: 4,
    className: "form-input",
    value: pinP2,
    onChange: e => {
      setPinP2(e.target.value.replace(/\D/g, ""));
      setPinErr("");
    },
    placeholder: "\u2022\u2022\u2022\u2022",
    style: {
      textAlign: "center",
      fontSize: 30,
      letterSpacing: 14,
      fontFamily: "'Space Mono',monospace"
    }
  })), pinErr && /*#__PURE__*/React.createElement("div", {
    style: {
      color: COLORS.danger,
      fontSize: 13,
      marginBottom: 10
    }
  }, pinErr), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      marginBottom: 12
    },
    onClick: () => {
      if (pinP1.length !== 4) {
        setPinErr("PIN must be exactly 4 digits");
        return;
      }
      if (pinP1 !== pinP2) {
        setPinErr("PINs do not match. Try again.");
        return;
      }
      localStorage.setItem("sl_pin", pinP1);
      setShowPinSetup(false);
      setPinSetupMode("prompt");
      setPinP1("");
      setPinP2("");
      setPinErr("");
      localStorage.removeItem("rc_new_signup");
    }
  }, "\u2705 Save PIN & Continue"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setPinSetupMode("prompt"),
    style: {
      width: "100%",
      background: "none",
      border: "none",
      color: COLORS.textMuted,
      fontSize: 13,
      cursor: "pointer",
      fontFamily: "'Inter',sans-serif",
      padding: 8
    }
  }, "\u2190 Back")))));

  // PIN lock screen
  if (pin && !pinUnlocked) return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, css), /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(145deg, #1E3A8A 0%, #1D4ED8 60%, #2563EB 100%)",
      padding: "2rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 48,
      marginBottom: 16
    }
  }, "\uD83D\uDD12"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Space Mono', monospace",
      fontSize: 22,
      fontWeight: 700,
      color: "#fff",
      marginBottom: 6
    }
  }, "Record Chief"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "rgba(255,255,255,0.65)",
      marginBottom: 32
    }
  }, "Enter your PIN to continue"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 20,
      padding: "28px 24px",
      width: "100%",
      maxWidth: 320,
      boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      justifyContent: "center",
      marginBottom: 20
    }
  }, [0, 1, 2, 3].map(i => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      width: 14,
      height: 14,
      borderRadius: "50%",
      background: pinInput.length > i ? COLORS.primary : COLORS.bg,
      border: `2px solid ${pinInput.length > i ? COLORS.primary : COLORS.border}`,
      transition: "all 0.15s"
    }
  }))), pinError && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      fontSize: 12,
      color: COLORS.danger,
      marginBottom: 12,
      fontWeight: 600
    }
  }, pinError), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 10
    }
  }, [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "⌫"].map((d, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    disabled: d === "",
    onClick: () => {
      if (d === "⌫") {
        setPinInput(p => p.slice(0, -1));
        setPinError("");
        return;
      }
      const next = pinInput + d;
      setPinInput(next);
      if (next.length === 4) {
        if (next === pin) {
          setPinUnlocked(true);
          setPinInput("");
          setPinError("");
        } else {
          setPinError("Incorrect PIN");
          setPinInput("");
        }
      }
    },
    style: {
      padding: "16px",
      borderRadius: 12,
      border: `1px solid ${COLORS.border}`,
      background: d === "" ? "transparent" : COLORS.bg,
      fontSize: d === "⌫" ? 18 : 20,
      fontWeight: 700,
      cursor: d === "" ? "default" : "pointer",
      fontFamily: "'Inter', sans-serif",
      color: COLORS.text,
      transition: "background 0.1s"
    }
  }, d))))));
  const sectorMeta = ALL_SECTORS.find(s => s.id === sector) || ALL_SECTORS[0];
  const sectorLabel = `${sectorMeta.icon} ${sectorMeta.id === "sales" ? "Sales" : sectorMeta.id === "shop" ? "Shop" : "Farm"}`;
  const userSectors = user.role === "staff" ? ["shop"] : user.sectors && user.sectors.length > 0 ? user.sectors : ["shop"];
  const activeSectors = ALL_SECTORS.filter(s => userSectors.includes(s.id));
  const initials = user?.name?.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
  const breadcrumb = navTab === "home" ? "Home" : navTab === "history" ? "Overview" : navTab === "profile" ? "Profile" : navTab === "manageSectors" ? "Manage Sectors" : navTab === "debtcredit" ? "🤝 Debt & Credit" : navTab === "notifications" ? "🔔 Notifications" : sectorLabel;

  // Onboarding   show once after first login
  // Sidebar active accent   matches each section's theme colour
  const sidebarAccent = (() => {
    if (navTab === "sector") {
      if (sector === "farm") return {
        border: "#40916C",
        bg: "rgba(29,111,66,0.25)"
      };
      if (sector === "shop") return {
        border: "#60A5FA",
        bg: "rgba(37,99,235,0.25)"
      };
      if (sector === "sales") return {
        border: "#A78BFA",
        bg: "rgba(124,58,237,0.25)"
      };
    }
    if (navTab === "debtcredit") return {
      border: "#86C99A",
      bg: "rgba(29,111,66,0.20)"
    };
    if (navTab === "history") return {
      border: "#34D399",
      bg: "rgba(5,150,105,0.18)"
    };
    // home, profile, manageSectors   default blue
    return {
      border: "#60A5FA",
      bg: "rgba(37,99,235,0.25)"
    };
  })();
  const activeNavStyle = {
    background: sidebarAccent.bg,
    borderLeft: `3px solid ${sidebarAccent.border}`,
    borderRadius: "0 8px 8px 0",
    color: "#fff",
    fontWeight: 600,
    paddingLeft: 11
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, css), /*#__PURE__*/React.createElement(OfflineIndicator, null), localStorage.getItem("rc_demo_mode") === "1" && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "linear-gradient(135deg,#7C3AED,#5B21B6)",
      color: "#fff",
      fontSize: 12,
      fontWeight: 700,
      padding: "8px 16px",
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", null, "\uD83C\uDFAE Demo Mode \u2014 data is not saved"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      clearDemoData().then(() => {
        setUser(null);
        setScreen("welcome");
      });
    },
    style: {
      background: "rgba(255,255,255,0.25)",
      border: "none",
      color: "#fff",
      borderRadius: 6,
      padding: "3px 10px",
      fontSize: 11,
      cursor: "pointer",
      fontFamily: "'Inter',sans-serif",
      fontWeight: 700
    }
  }, "Exit Demo")), /*#__PURE__*/React.createElement("div", {
    className: "app"
  }, /*#__PURE__*/React.createElement("div", {
    className: `sidebar ${sidebarOpen ? "open" : "collapsed"}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sidebar-logo"
  }, "Record Chief"), /*#__PURE__*/React.createElement("button", {
    className: "sidebar-toggle",
    onClick: () => setSidebarOpen(o => !o),
    title: sidebarOpen ? "Collapse sidebar" : "Expand sidebar"
  }, sidebarOpen ? /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M15 18l-6-6 6-6"
  })) : /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 18l6-6-6-6"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-tagline"
  }, "Your business records, organized"), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-section"
  }, "Menu"), /*#__PURE__*/React.createElement("button", {
    className: "nav-tab",
    onClick: () => {
      setNavTab("home");
      setSidebarOpen(false);
    },
    title: "Home",
    style: navTab === "home" ? activeNavStyle : {}
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "home",
    size: 16
  }), /*#__PURE__*/React.createElement("span", {
    className: "nav-label"
  }, "Home")), user?.role !== "staff" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    className: "nav-tab",
    onClick: () => {
      setNavTab("history");
      setSidebarOpen(false);
    },
    title: "Overview",
    style: navTab === "history" ? activeNavStyle : {}
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chart",
    size: 16
  }), /*#__PURE__*/React.createElement("span", {
    className: "nav-label"
  }, "Overview")), /*#__PURE__*/React.createElement("button", {
    className: "nav-tab",
    onClick: () => {
      setNavTab("synclog");
      setSidebarOpen(false);
    },
    title: "Sync & Backup",
    style: navTab === "synclog" ? activeNavStyle : {}
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "history",
    size: 16
  }), /*#__PURE__*/React.createElement("span", {
    className: "nav-label"
  }, "Sync"))), activeSectors.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "sidebar-section"
  }, "Sectors"), activeSectors.map(s => {
    const isSectorActive = navTab === "sector" && sector === s.id;
    const sAccent = s.id === "farm" ? {
      border: "#40916C",
      bg: "rgba(29,111,66,0.25)"
    } : s.id === "shop" ? {
      border: "#60A5FA",
      bg: "rgba(37,99,235,0.25)"
    } : {
      border: "#A78BFA",
      bg: "rgba(124,58,237,0.25)"
    };
    return /*#__PURE__*/React.createElement("button", {
      key: s.id,
      className: "nav-tab",
      title: s.id === "sales" ? "Sales Rep" : s.id === "shop" ? "Shop Sales" : "Farm Expenses",
      onClick: () => {
        setSector(s.id);
        setNavTab("sector");
        setSidebarOpen(false);
      },
      style: isSectorActive ? {
        background: sAccent.bg,
        borderLeft: `3px solid ${sAccent.border}`,
        borderRadius: "0 8px 8px 0",
        color: "#fff",
        fontWeight: 600,
        paddingLeft: 11
      } : {}
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        lineHeight: 1,
        flexShrink: 0
      }
    }, s.icon), /*#__PURE__*/React.createElement("span", {
      className: "nav-label"
    }, s.id === "sales" ? "Sales Rep" : s.id === "shop" ? "Shop Sales" : "Farm Expenses"));
  }), (() => {
    const debtKey = `sl_debt_${user?.uid}`;
    const debtRecs = (() => {
      try {
        return JSON.parse(localStorage.getItem(debtKey)) || [];
      } catch {
        return [];
      }
    })();
    const overdueN = debtRecs.filter(r => !r.settled && r.dueDate && r.dueDate < TODAY()).length;
    if (user?.role === "staff") return null;
    return /*#__PURE__*/React.createElement("button", {
      className: "nav-tab",
      title: "Debt & Credit",
      onClick: () => {
        setNavTab("debtcredit");
        setSidebarOpen(false);
      },
      style: {
        position: "relative",
        ...(navTab === "debtcredit" ? {
          background: "rgba(29,111,66,0.22)",
          borderLeft: "3px solid #86C99A",
          borderRadius: "0 8px 8px 0",
          color: "#fff",
          fontWeight: 600,
          paddingLeft: 11
        } : {})
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        lineHeight: 1,
        flexShrink: 0
      }
    }, "\uD83E\uDD1D"), /*#__PURE__*/React.createElement("span", {
      className: "nav-label"
    }, "Debt & Credit"), overdueN > 0 && /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        top: 8,
        right: sidebarOpen ? 14 : 6,
        width: 16,
        height: 16,
        borderRadius: "50%",
        background: COLORS.danger,
        color: "#fff",
        fontSize: 9,
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, overdueN > 9 ? "9+" : overdueN));
  })(), /*#__PURE__*/React.createElement("button", {
    className: "nav-tab",
    style: {
      fontSize: 11,
      opacity: 0.6
    },
    onClick: () => {
      handleManageSectors();
      setSidebarOpen(false);
    },
    title: "Manage sectors"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "settings",
    size: 14
  }), /*#__PURE__*/React.createElement("span", {
    className: "nav-label"
  }, "Manage sectors")), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-bottom"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-user",
    onClick: () => {
      setNavTab("profile");
      setSidebarOpen(false);
    },
    title: user?.name
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-avatar"
  }, avatar ? /*#__PURE__*/React.createElement("img", {
    src: avatar,
    alt: ""
  }) : initials), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-userinfo"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-username"
  }, user?.name), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-email"
  }, user?.email))))), /*#__PURE__*/React.createElement("div", {
    className: "main-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "topbar"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setSidebarOpen(o => !o),
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      color: COLORS.textMuted,
      padding: 4,
      borderRadius: 6
    },
    className: "desktop-only",
    title: "Toggle sidebar"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 12h18M3 6h18M3 18h18"
  }))), navTab === "sector" ? /*#__PURE__*/React.createElement("button", {
    onClick: () => activeSectors.length > 1 && setShowSectorSwitcher(v => !v),
    title: activeSectors.length > 1 ? "Switch sector" : undefined,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      background: showSectorSwitcher ? COLORS.primaryLight : COLORS.bg,
      border: `1.5px solid ${showSectorSwitcher ? COLORS.primary : COLORS.border}`,
      borderRadius: 10,
      padding: "5px 10px 5px 8px",
      cursor: activeSectors.length > 1 ? "pointer" : "default",
      fontFamily: "'Inter', sans-serif",
      fontWeight: 700,
      fontSize: 15,
      color: showSectorSwitcher ? COLORS.primary : COLORS.text,
      transition: "all 0.15s",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18
    }
  }, activeSectors.find(s => s.id === sector)?.icon || "🏪"), /*#__PURE__*/React.createElement("span", {
    style: {
      maxWidth: 140,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, breadcrumb), activeSectors.length > 1 && /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    style: {
      transition: "transform 0.2s",
      transform: showSectorSwitcher ? "rotate(180deg)" : "rotate(0deg)",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 9l6 6 6-6"
  }))) : /*#__PURE__*/React.createElement("span", {
    className: "topbar-breadcrumb"
  }, breadcrumb), showSectorSwitcher && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 56,
      left: 16,
      zIndex: 400,
      background: "#fff",
      borderRadius: 16,
      padding: 8,
      boxShadow: "0 8px 32px rgba(15,23,42,0.18)",
      border: `1px solid ${COLORS.border}`,
      minWidth: 200,
      animation: "scaleIn 0.15s ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: COLORS.textMuted,
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      padding: "4px 8px 8px"
    }
  }, "Switch Sector"), activeSectors.map(s => {
    const isActive = sector === s.id;
    return /*#__PURE__*/React.createElement("button", {
      key: s.id,
      onClick: () => {
        setSector(s.id);
        setNavTab("sector");
        setShowSectorSwitcher(false);
      },
      style: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 10px",
        borderRadius: 10,
        border: "none",
        cursor: "pointer",
        background: isActive ? COLORS.primaryLight : "transparent",
        fontFamily: "'Inter', sans-serif",
        textAlign: "left",
        transition: "background 0.12s"
      },
      onMouseEnter: e => {
        if (!isActive) e.currentTarget.style.background = COLORS.bg;
      },
      onMouseLeave: e => {
        if (!isActive) e.currentTarget.style.background = "transparent";
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 20,
        width: 36,
        height: 36,
        background: s.color,
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0
      }
    }, s.icon), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: isActive ? COLORS.primary : COLORS.text
      }
    }, s.label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: COLORS.textMuted,
        marginTop: 1
      }
    }, s.desc)), isActive && /*#__PURE__*/React.createElement("svg", {
      width: "15",
      height: "15",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: COLORS.primary,
      strokeWidth: "2.5"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M20 6L9 17l-5-5"
    })));
  })), showSectorSwitcher && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 399
    },
    onClick: () => setShowSectorSwitcher(false)
  })), /*#__PURE__*/React.createElement("div", {
    className: "topbar-right"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setNavTab("notifications"),
    title: "Notifications",
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      color: notifCount > 0 ? COLORS.danger : COLORS.textMuted,
      padding: 6,
      borderRadius: 8,
      position: "relative",
      fontSize: 17
    }
  }, "\uD83D\uDD14", notifCount > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 2,
      right: 2,
      width: 14,
      height: 14,
      borderRadius: "50%",
      background: COLORS.danger,
      color: "#fff",
      fontSize: 8,
      fontWeight: 700,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, notifCount > 9 ? "9+" : notifCount)), /*#__PURE__*/React.createElement("button", {
    onClick: () => setDarkMode(d => !d),
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      color: COLORS.textMuted,
      padding: 6,
      borderRadius: 8,
      fontSize: 16,
      transition: "background 0.15s"
    },
    title: darkMode ? "Switch to light mode" : "Switch to dark mode"
  }, darkMode ? "☀️" : "🌙"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowGlobalSearch(true),
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      color: COLORS.textMuted,
      padding: 6,
      borderRadius: 8,
      transition: "background 0.15s"
    },
    onMouseEnter: e => e.currentTarget.style.background = COLORS.bg,
    onMouseLeave: e => e.currentTarget.style.background = "none",
    title: "Search everything"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "17",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 21l-4.35-4.35"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "avatar",
    onClick: () => setShowProfileMenu(v => !v),
    style: {
      overflow: "hidden",
      cursor: "pointer"
    }
  }, avatar ? /*#__PURE__*/React.createElement("img", {
    src: avatar,
    alt: "",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "50%"
    }
  }) : initials), showProfileMenu && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 398
    },
    onClick: () => setShowProfileMenu(false)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "calc(100% + 8px)",
      right: 0,
      zIndex: 399,
      background: COLORS.surface,
      borderRadius: 12,
      boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
      border: `1px solid ${COLORS.border}`,
      minWidth: 160,
      overflow: "hidden",
      animation: "scaleIn 0.15s ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "10px 14px",
      borderBottom: `1px solid ${COLORS.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: COLORS.text
    }
  }, user?.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: COLORS.textMuted,
      marginTop: 2
    }
  }, user?.email)), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setNavTab("profile");
      setShowProfileMenu(false);
    },
    style: {
      width: "100%",
      padding: "11px 14px",
      background: "none",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontSize: 13,
      fontWeight: 600,
      color: COLORS.text,
      fontFamily: "'Inter', sans-serif",
      textAlign: "left"
    },
    onMouseEnter: e => e.currentTarget.style.background = COLORS.bg,
    onMouseLeave: e => e.currentTarget.style.background = "none"
  }, "\uD83D\uDC64 Profile"), /*#__PURE__*/React.createElement("button", {
    onClick: async () => {
      setShowProfileMenu(false);
      await AuthAPI.signOut();
      setUser(null);
      setScreen("login");
    },
    style: {
      width: "100%",
      padding: "11px 14px",
      background: "none",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontSize: 13,
      fontWeight: 600,
      color: COLORS.danger,
      fontFamily: "'Inter', sans-serif",
      textAlign: "left",
      borderTop: `1px solid ${COLORS.border}`
    },
    onMouseEnter: e => e.currentTarget.style.background = COLORS.dangerLight,
    onMouseLeave: e => e.currentTarget.style.background = "none"
  }, "\uD83D\uDEAA Log Out")))))), showGlobalSearch && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 500,
      background: "rgba(15,23,42,0.6)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: "4rem"
    },
    onClick: () => {
      setShowGlobalSearch(false);
      setGlobalSearch("");
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "calc(100% - 32px)",
      maxWidth: 520,
      background: "#fff",
      borderRadius: 16,
      boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      overflow: "hidden",
      animation: "scaleIn 0.18s ease"
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      padding: "12px 16px",
      borderBottom: `1px solid ${COLORS.border}`,
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: COLORS.textMuted,
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 21l-4.35-4.35"
  })), /*#__PURE__*/React.createElement("input", {
    autoFocus: true,
    style: {
      flex: 1,
      border: "none",
      outline: "none",
      fontSize: 16,
      fontFamily: "'Inter', sans-serif",
      color: COLORS.text,
      background: "transparent"
    },
    placeholder: "Search records, sales, expenses\u2026",
    value: globalSearch,
    onChange: e => setGlobalSearch(e.target.value)
  }), globalSearch && /*#__PURE__*/React.createElement("button", {
    onClick: () => setGlobalSearch(""),
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: COLORS.textMuted,
      fontSize: 18
    }
  }, "\u2715"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setShowGlobalSearch(false);
      setGlobalSearch("");
    },
    style: {
      background: COLORS.bg,
      border: "none",
      cursor: "pointer",
      color: COLORS.textMuted,
      fontSize: 11,
      fontWeight: 600,
      borderRadius: 6,
      padding: "4px 8px",
      fontFamily: "'Inter', sans-serif"
    }
  }, "ESC")), (() => {
    if (!globalSearch.trim()) return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "1.5rem",
        textAlign: "center",
        color: COLORS.textMuted,
        fontSize: 13
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 32,
        marginBottom: 8
      }
    }, "\uD83D\uDD0D"), "Type to search across all your records");
    const q = globalSearch.toLowerCase();
    const shopData = (() => {
      try {
        return JSON.parse(localStorage.getItem(`sl_shopsales_${user?.uid}`)) || [];
      } catch {
        return [];
      }
    })();
    const farmData = (() => {
      try {
        return JSON.parse(localStorage.getItem(`sl_farm_${user?.uid}`)) || [];
      } catch {
        return [];
      }
    })();
    const debtData = (() => {
      try {
        return JSON.parse(localStorage.getItem(`sl_debt_${user?.uid}`)) || [];
      } catch {
        return [];
      }
    })();
    const results = [...shopData.filter(s => s.itemName?.toLowerCase().includes(q)).map(s => ({
      icon: "🛍️",
      label: s.itemName,
      sub: `Shop · ${s.date} · ${NAIRA(s.total)}`,
      nav: () => {
        setNavTab("sector");
        setSector("shop");
        setShowGlobalSearch(false);
        setGlobalSearch("");
      }
    })), ...farmData.filter(e => e.desc?.toLowerCase().includes(q)).map(e => ({
      icon: "🌾",
      label: e.desc,
      sub: `Farm · ${e.date} · ${NAIRA(e.amount)}`,
      nav: () => {
        setNavTab("sector");
        setSector("farm");
        setShowGlobalSearch(false);
        setGlobalSearch("");
      }
    })), ...debtData.filter(r => r.name?.toLowerCase().includes(q) || r.note?.toLowerCase().includes(q)).map(r => ({
      icon: r.type === "credit" ? "💰" : "📤",
      label: r.name,
      sub: `${r.type === "credit" ? "Credit" : "Debt"} · ${r.date} · ${NAIRA(r.amount)}`,
      nav: () => {
        setNavTab("debtcredit");
        setShowGlobalSearch(false);
        setGlobalSearch("");
      }
    }))].slice(0, 10);
    return results.length === 0 ? /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "1.5rem",
        textAlign: "center",
        color: COLORS.textMuted,
        fontSize: 13
      }
    }, "No results for \"", /*#__PURE__*/React.createElement("strong", null, globalSearch), "\"") : /*#__PURE__*/React.createElement("div", {
      style: {
        maxHeight: 320,
        overflowY: "auto"
      }
    }, results.map((r, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      onClick: r.nav,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "11px 16px",
        cursor: "pointer",
        borderBottom: `0.5px solid ${COLORS.border}`,
        transition: "background 0.1s"
      },
      onMouseEnter: e => e.currentTarget.style.background = COLORS.bg,
      onMouseLeave: e => e.currentTarget.style.background = "transparent"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 36,
        height: 36,
        borderRadius: 10,
        background: COLORS.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18,
        flexShrink: 0
      }
    }, r.icon), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 600,
        color: COLORS.text,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, r.label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: COLORS.textMuted,
        marginTop: 1
      }
    }, r.sub)), /*#__PURE__*/React.createElement("svg", {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: COLORS.textLight,
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M9 18l6-6-6-6"
    })))));
  })())), /*#__PURE__*/React.createElement("div", {
    className: "main"
  }, navTab === "home" && /*#__PURE__*/React.createElement(HomeScreen, {
    key: syncTick,
    user: user,
    sector: sector,
    onSetSector: s => {
      setSector(s);
      setNavTab("sector");
    },
    onManageSectors: handleManageSectors,
    onViewOverview: () => setNavTab("history"),
    onViewDebt: () => setNavTab("debtcredit")
  }), navTab === "sector" && sector === "sales" && /*#__PURE__*/React.createElement(SalesRepScreen, {
    key: `sales-${syncTick}`,
    user: user
  }), navTab === "sector" && sector === "shop" && /*#__PURE__*/React.createElement(ShopScreen, {
    key: `shop-${syncTick}`,
    user: user
  }), navTab === "sector" && sector === "farm" && /*#__PURE__*/React.createElement(FarmScreen, {
    key: `farm-${syncTick}`,
    user: user
  }), navTab === "history" && /*#__PURE__*/React.createElement(HistoryScreen, {
    key: `hist-${syncTick}`,
    user: user
  }), navTab === "synclog" && /*#__PURE__*/React.createElement(SyncHistoryScreen, {
    user: user
  }), navTab === "debtcredit" && /*#__PURE__*/React.createElement(DebtCreditScreen, {
    key: `debt-${syncTick}`,
    user: user
  }), navTab === "notifications" && /*#__PURE__*/React.createElement(NotificationsScreen, {
    user: user,
    onNavigateShop: () => {
      setSector("shop");
      setNavTab("sector");
      localStorage.setItem("rc_open_inventory", "1");
    }
  }), navTab === "profile" && /*#__PURE__*/React.createElement(ProfileScreen, {
    user: user,
    onLogout: handleLogout,
    onManageSectors: handleManageSectors
  }), navTab === "manageSectors" && /*#__PURE__*/React.createElement(ManageSectorsScreen, {
    user: user,
    onSave: handleSaveSectors,
    onBack: () => setNavTab("home")
  }))), (() => {
    const debtKey = `sl_debt_${user?.uid}`;
    const debtRecs = (() => {
      try {
        return JSON.parse(localStorage.getItem(debtKey)) || [];
      } catch {
        return [];
      }
    })();
    const overdueN = debtRecs.filter(r => !r.settled && r.dueDate && r.dueDate < TODAY()).length;
    const firstSector = activeSectors[0];
    const activeSectorAccent = sector === "farm" ? "#40916C" : sector === "sales" ? "#A78BFA" : "#60A5FA";
    const tabs = user.role === "staff" ? [{
      id: "home",
      icon: "🏠",
      label: "Home",
      accent: "#60A5FA"
    }, {
      id: "sector",
      icon: "🏪",
      label: "Shop",
      accent: "#60A5FA"
    }, {
      id: "profile",
      icon: "👤",
      label: "Profile",
      accent: "#60A5FA"
    }] : [{
      id: "home",
      icon: "🏠",
      label: "Home",
      accent: "#60A5FA"
    }, {
      id: "sector",
      icon: activeSectors.find(s => s.id === sector)?.icon || "🏪",
      label: "Sector",
      accent: activeSectorAccent
    }, {
      id: "debtcredit",
      icon: "🤝",
      label: "Debts",
      accent: "#86C99A",
      badge: overdueN
    }, {
      id: "history",
      icon: "📊",
      label: "Overview",
      accent: "#34D399"
    }, {
      id: "profile",
      icon: "👤",
      label: "Profile",
      accent: "#60A5FA"
    }];
    return /*#__PURE__*/React.createElement("div", {
      className: "bottom-tab-bar"
    }, tabs.map(t => {
      const isActive = navTab === t.id;
      return /*#__PURE__*/React.createElement("button", {
        key: t.id,
        className: `bottom-tab-item${isActive ? " active" : ""}`,
        onClick: () => {
          if (t.id === "sector" && activeSectors.length > 0) {
            setSector(activeSectors.find(s => s.id === sector)?.id || activeSectors[0].id);
          }
          setNavTab(t.id);
          setSidebarOpen(false);
        }
      }, isActive && /*#__PURE__*/React.createElement("div", {
        className: "btab-bar",
        style: {
          background: t.accent
        }
      }), t.badge > 0 && /*#__PURE__*/React.createElement("div", {
        className: "btab-dot"
      }), /*#__PURE__*/React.createElement("span", {
        className: "btab-icon"
      }, t.icon), /*#__PURE__*/React.createElement("span", null, t.label));
    }));
  })()));
}

// ── Mount ──────────────────────────────────────────────────
const _rc_root = ReactDOM.createRoot(document.getElementById('root'));
_rc_root.render(React.createElement(App));
})(window);