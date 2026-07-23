(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();function nk(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var wv={exports:{}},ic={},kv={exports:{}},J={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var zo=Symbol.for("react.element"),rk=Symbol.for("react.portal"),ik=Symbol.for("react.fragment"),sk=Symbol.for("react.strict_mode"),ok=Symbol.for("react.profiler"),ak=Symbol.for("react.provider"),lk=Symbol.for("react.context"),ck=Symbol.for("react.forward_ref"),uk=Symbol.for("react.suspense"),dk=Symbol.for("react.memo"),hk=Symbol.for("react.lazy"),Nm=Symbol.iterator;function fk(t){return t===null||typeof t!="object"?null:(t=Nm&&t[Nm]||t["@@iterator"],typeof t=="function"?t:null)}var Ev={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Sv=Object.assign,bv={};function ts(t,e,n){this.props=t,this.context=e,this.refs=bv,this.updater=n||Ev}ts.prototype.isReactComponent={};ts.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};ts.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function Nv(){}Nv.prototype=ts.prototype;function Rh(t,e,n){this.props=t,this.context=e,this.refs=bv,this.updater=n||Ev}var Ph=Rh.prototype=new Nv;Ph.constructor=Rh;Sv(Ph,ts.prototype);Ph.isPureReactComponent=!0;var Cm=Array.isArray,Cv=Object.prototype.hasOwnProperty,Ah={current:null},Iv={key:!0,ref:!0,__self:!0,__source:!0};function Tv(t,e,n){var r,i={},s=null,o=null;if(e!=null)for(r in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)Cv.call(e,r)&&!Iv.hasOwnProperty(r)&&(i[r]=e[r]);var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){for(var u=Array(l),h=0;h<l;h++)u[h]=arguments[h+2];i.children=u}if(t&&t.defaultProps)for(r in l=t.defaultProps,l)i[r]===void 0&&(i[r]=l[r]);return{$$typeof:zo,type:t,key:s,ref:o,props:i,_owner:Ah.current}}function pk(t,e){return{$$typeof:zo,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function jh(t){return typeof t=="object"&&t!==null&&t.$$typeof===zo}function mk(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Im=/\/+/g;function _u(t,e){return typeof t=="object"&&t!==null&&t.key!=null?mk(""+t.key):e.toString(36)}function Ba(t,e,n,r,i){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case zo:case rk:o=!0}}if(o)return o=t,i=i(o),t=r===""?"."+_u(o,0):r,Cm(i)?(n="",t!=null&&(n=t.replace(Im,"$&/")+"/"),Ba(i,e,n,"",function(h){return h})):i!=null&&(jh(i)&&(i=pk(i,n+(!i.key||o&&o.key===i.key?"":(""+i.key).replace(Im,"$&/")+"/")+t)),e.push(i)),1;if(o=0,r=r===""?".":r+":",Cm(t))for(var l=0;l<t.length;l++){s=t[l];var u=r+_u(s,l);o+=Ba(s,e,n,u,i)}else if(u=fk(t),typeof u=="function")for(t=u.call(t),l=0;!(s=t.next()).done;)s=s.value,u=r+_u(s,l++),o+=Ba(s,e,n,u,i);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function wa(t,e,n){if(t==null)return t;var r=[],i=0;return Ba(t,r,"","",function(s){return e.call(n,s,i++)}),r}function gk(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var at={current:null},Ha={transition:null},vk={ReactCurrentDispatcher:at,ReactCurrentBatchConfig:Ha,ReactCurrentOwner:Ah};function Rv(){throw Error("act(...) is not supported in production builds of React.")}J.Children={map:wa,forEach:function(t,e,n){wa(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return wa(t,function(){e++}),e},toArray:function(t){return wa(t,function(e){return e})||[]},only:function(t){if(!jh(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};J.Component=ts;J.Fragment=ik;J.Profiler=ok;J.PureComponent=Rh;J.StrictMode=sk;J.Suspense=uk;J.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=vk;J.act=Rv;J.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var r=Sv({},t.props),i=t.key,s=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=Ah.current),e.key!==void 0&&(i=""+e.key),t.type&&t.type.defaultProps)var l=t.type.defaultProps;for(u in e)Cv.call(e,u)&&!Iv.hasOwnProperty(u)&&(r[u]=e[u]===void 0&&l!==void 0?l[u]:e[u])}var u=arguments.length-2;if(u===1)r.children=n;else if(1<u){l=Array(u);for(var h=0;h<u;h++)l[h]=arguments[h+2];r.children=l}return{$$typeof:zo,type:t.type,key:i,ref:s,props:r,_owner:o}};J.createContext=function(t){return t={$$typeof:lk,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:ak,_context:t},t.Consumer=t};J.createElement=Tv;J.createFactory=function(t){var e=Tv.bind(null,t);return e.type=t,e};J.createRef=function(){return{current:null}};J.forwardRef=function(t){return{$$typeof:ck,render:t}};J.isValidElement=jh;J.lazy=function(t){return{$$typeof:hk,_payload:{_status:-1,_result:t},_init:gk}};J.memo=function(t,e){return{$$typeof:dk,type:t,compare:e===void 0?null:e}};J.startTransition=function(t){var e=Ha.transition;Ha.transition={};try{t()}finally{Ha.transition=e}};J.unstable_act=Rv;J.useCallback=function(t,e){return at.current.useCallback(t,e)};J.useContext=function(t){return at.current.useContext(t)};J.useDebugValue=function(){};J.useDeferredValue=function(t){return at.current.useDeferredValue(t)};J.useEffect=function(t,e){return at.current.useEffect(t,e)};J.useId=function(){return at.current.useId()};J.useImperativeHandle=function(t,e,n){return at.current.useImperativeHandle(t,e,n)};J.useInsertionEffect=function(t,e){return at.current.useInsertionEffect(t,e)};J.useLayoutEffect=function(t,e){return at.current.useLayoutEffect(t,e)};J.useMemo=function(t,e){return at.current.useMemo(t,e)};J.useReducer=function(t,e,n){return at.current.useReducer(t,e,n)};J.useRef=function(t){return at.current.useRef(t)};J.useState=function(t){return at.current.useState(t)};J.useSyncExternalStore=function(t,e,n){return at.current.useSyncExternalStore(t,e,n)};J.useTransition=function(){return at.current.useTransition()};J.version="18.3.1";kv.exports=J;var $=kv.exports;const yk=nk($);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var xk=$,_k=Symbol.for("react.element"),wk=Symbol.for("react.fragment"),kk=Object.prototype.hasOwnProperty,Ek=xk.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Sk={key:!0,ref:!0,__self:!0,__source:!0};function Pv(t,e,n){var r,i={},s=null,o=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(r in e)kk.call(e,r)&&!Sk.hasOwnProperty(r)&&(i[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)i[r]===void 0&&(i[r]=e[r]);return{$$typeof:_k,type:t,key:s,ref:o,props:i,_owner:Ek.current}}ic.Fragment=wk;ic.jsx=Pv;ic.jsxs=Pv;wv.exports=ic;var c=wv.exports,hd={},Av={exports:{}},bt={},jv={exports:{}},Ov={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(M,B){var q=M.length;M.push(B);e:for(;0<q;){var se=q-1>>>1,Z=M[se];if(0<i(Z,B))M[se]=B,M[q]=Z,q=se;else break e}}function n(M){return M.length===0?null:M[0]}function r(M){if(M.length===0)return null;var B=M[0],q=M.pop();if(q!==B){M[0]=q;e:for(var se=0,Z=M.length,oe=Z>>>1;se<oe;){var ln=2*(se+1)-1,cn=M[ln],un=ln+1,dn=M[un];if(0>i(cn,q))un<Z&&0>i(dn,cn)?(M[se]=dn,M[un]=q,se=un):(M[se]=cn,M[ln]=q,se=ln);else if(un<Z&&0>i(dn,q))M[se]=dn,M[un]=q,se=un;else break e}}return B}function i(M,B){var q=M.sortIndex-B.sortIndex;return q!==0?q:M.id-B.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var o=Date,l=o.now();t.unstable_now=function(){return o.now()-l}}var u=[],h=[],m=1,p=null,g=3,E=!1,I=!1,P=!1,L=typeof setTimeout=="function"?setTimeout:null,N=typeof clearTimeout=="function"?clearTimeout:null,w=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function b(M){for(var B=n(h);B!==null;){if(B.callback===null)r(h);else if(B.startTime<=M)r(h),B.sortIndex=B.expirationTime,e(u,B);else break;B=n(h)}}function j(M){if(P=!1,b(M),!I)if(n(u)!==null)I=!0,Je(O);else{var B=n(h);B!==null&&Pe(j,B.startTime-M)}}function O(M,B){I=!1,P&&(P=!1,N(y),y=-1),E=!0;var q=g;try{for(b(B),p=n(u);p!==null&&(!(p.expirationTime>B)||M&&!C());){var se=p.callback;if(typeof se=="function"){p.callback=null,g=p.priorityLevel;var Z=se(p.expirationTime<=B);B=t.unstable_now(),typeof Z=="function"?p.callback=Z:p===n(u)&&r(u),b(B)}else r(u);p=n(u)}if(p!==null)var oe=!0;else{var ln=n(h);ln!==null&&Pe(j,ln.startTime-B),oe=!1}return oe}finally{p=null,g=q,E=!1}}var U=!1,x=null,y=-1,_=5,S=-1;function C(){return!(t.unstable_now()-S<_)}function T(){if(x!==null){var M=t.unstable_now();S=M;var B=!0;try{B=x(!0,M)}finally{B?k():(U=!1,x=null)}}else U=!1}var k;if(typeof w=="function")k=function(){w(T)};else if(typeof MessageChannel<"u"){var K=new MessageChannel,fe=K.port2;K.port1.onmessage=T,k=function(){fe.postMessage(null)}}else k=function(){L(T,0)};function Je(M){x=M,U||(U=!0,k())}function Pe(M,B){y=L(function(){M(t.unstable_now())},B)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(M){M.callback=null},t.unstable_continueExecution=function(){I||E||(I=!0,Je(O))},t.unstable_forceFrameRate=function(M){0>M||125<M?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):_=0<M?Math.floor(1e3/M):5},t.unstable_getCurrentPriorityLevel=function(){return g},t.unstable_getFirstCallbackNode=function(){return n(u)},t.unstable_next=function(M){switch(g){case 1:case 2:case 3:var B=3;break;default:B=g}var q=g;g=B;try{return M()}finally{g=q}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(M,B){switch(M){case 1:case 2:case 3:case 4:case 5:break;default:M=3}var q=g;g=M;try{return B()}finally{g=q}},t.unstable_scheduleCallback=function(M,B,q){var se=t.unstable_now();switch(typeof q=="object"&&q!==null?(q=q.delay,q=typeof q=="number"&&0<q?se+q:se):q=se,M){case 1:var Z=-1;break;case 2:Z=250;break;case 5:Z=1073741823;break;case 4:Z=1e4;break;default:Z=5e3}return Z=q+Z,M={id:m++,callback:B,priorityLevel:M,startTime:q,expirationTime:Z,sortIndex:-1},q>se?(M.sortIndex=q,e(h,M),n(u)===null&&M===n(h)&&(P?(N(y),y=-1):P=!0,Pe(j,q-se))):(M.sortIndex=Z,e(u,M),I||E||(I=!0,Je(O))),M},t.unstable_shouldYield=C,t.unstable_wrapCallback=function(M){var B=g;return function(){var q=g;g=B;try{return M.apply(this,arguments)}finally{g=q}}}})(Ov);jv.exports=Ov;var bk=jv.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Nk=$,Et=bk;function D(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Dv=new Set,lo={};function Yr(t,e){Fi(t,e),Fi(t+"Capture",e)}function Fi(t,e){for(lo[t]=e,t=0;t<e.length;t++)Dv.add(e[t])}var bn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),fd=Object.prototype.hasOwnProperty,Ck=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Tm={},Rm={};function Ik(t){return fd.call(Rm,t)?!0:fd.call(Tm,t)?!1:Ck.test(t)?Rm[t]=!0:(Tm[t]=!0,!1)}function Tk(t,e,n,r){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function Rk(t,e,n,r){if(e===null||typeof e>"u"||Tk(t,e,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function lt(t,e,n,r,i,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var Be={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){Be[t]=new lt(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];Be[e]=new lt(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){Be[t]=new lt(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){Be[t]=new lt(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){Be[t]=new lt(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){Be[t]=new lt(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){Be[t]=new lt(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){Be[t]=new lt(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){Be[t]=new lt(t,5,!1,t.toLowerCase(),null,!1,!1)});var Oh=/[\-:]([a-z])/g;function Dh(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Oh,Dh);Be[e]=new lt(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Oh,Dh);Be[e]=new lt(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Oh,Dh);Be[e]=new lt(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){Be[t]=new lt(t,1,!1,t.toLowerCase(),null,!1,!1)});Be.xlinkHref=new lt("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){Be[t]=new lt(t,1,!1,t.toLowerCase(),null,!0,!0)});function Lh(t,e,n,r){var i=Be.hasOwnProperty(e)?Be[e]:null;(i!==null?i.type!==0:r||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(Rk(e,n,i,r)&&(n=null),r||i===null?Ik(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):i.mustUseProperty?t[i.propertyName]=n===null?i.type===3?!1:"":n:(e=i.attributeName,r=i.attributeNamespace,n===null?t.removeAttribute(e):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?t.setAttributeNS(r,e,n):t.setAttribute(e,n))))}var An=Nk.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ka=Symbol.for("react.element"),fi=Symbol.for("react.portal"),pi=Symbol.for("react.fragment"),Mh=Symbol.for("react.strict_mode"),pd=Symbol.for("react.profiler"),Lv=Symbol.for("react.provider"),Mv=Symbol.for("react.context"),Fh=Symbol.for("react.forward_ref"),md=Symbol.for("react.suspense"),gd=Symbol.for("react.suspense_list"),Uh=Symbol.for("react.memo"),Un=Symbol.for("react.lazy"),Fv=Symbol.for("react.offscreen"),Pm=Symbol.iterator;function Ss(t){return t===null||typeof t!="object"?null:(t=Pm&&t[Pm]||t["@@iterator"],typeof t=="function"?t:null)}var we=Object.assign,wu;function Ms(t){if(wu===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);wu=e&&e[1]||""}return`
`+wu+t}var ku=!1;function Eu(t,e){if(!t||ku)return"";ku=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(h){var r=h}Reflect.construct(t,[],e)}else{try{e.call()}catch(h){r=h}t.call(e.prototype)}else{try{throw Error()}catch(h){r=h}t()}}catch(h){if(h&&r&&typeof h.stack=="string"){for(var i=h.stack.split(`
`),s=r.stack.split(`
`),o=i.length-1,l=s.length-1;1<=o&&0<=l&&i[o]!==s[l];)l--;for(;1<=o&&0<=l;o--,l--)if(i[o]!==s[l]){if(o!==1||l!==1)do if(o--,l--,0>l||i[o]!==s[l]){var u=`
`+i[o].replace(" at new "," at ");return t.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",t.displayName)),u}while(1<=o&&0<=l);break}}}finally{ku=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?Ms(t):""}function Pk(t){switch(t.tag){case 5:return Ms(t.type);case 16:return Ms("Lazy");case 13:return Ms("Suspense");case 19:return Ms("SuspenseList");case 0:case 2:case 15:return t=Eu(t.type,!1),t;case 11:return t=Eu(t.type.render,!1),t;case 1:return t=Eu(t.type,!0),t;default:return""}}function vd(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case pi:return"Fragment";case fi:return"Portal";case pd:return"Profiler";case Mh:return"StrictMode";case md:return"Suspense";case gd:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case Mv:return(t.displayName||"Context")+".Consumer";case Lv:return(t._context.displayName||"Context")+".Provider";case Fh:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Uh:return e=t.displayName||null,e!==null?e:vd(t.type)||"Memo";case Un:e=t._payload,t=t._init;try{return vd(t(e))}catch{}}return null}function Ak(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return vd(e);case 8:return e===Mh?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function cr(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Uv(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function jk(t){var e=Uv(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),r=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return i.call(this)},set:function(o){r=""+o,s.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function Ea(t){t._valueTracker||(t._valueTracker=jk(t))}function zv(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),r="";return t&&(r=Uv(t)?t.checked?"true":"false":t.value),t=r,t!==n?(e.setValue(t),!0):!1}function al(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function yd(t,e){var n=e.checked;return we({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function Am(t,e){var n=e.defaultValue==null?"":e.defaultValue,r=e.checked!=null?e.checked:e.defaultChecked;n=cr(e.value!=null?e.value:n),t._wrapperState={initialChecked:r,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function Vv(t,e){e=e.checked,e!=null&&Lh(t,"checked",e,!1)}function xd(t,e){Vv(t,e);var n=cr(e.value),r=e.type;if(n!=null)r==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(r==="submit"||r==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?_d(t,e.type,n):e.hasOwnProperty("defaultValue")&&_d(t,e.type,cr(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function jm(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var r=e.type;if(!(r!=="submit"&&r!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function _d(t,e,n){(e!=="number"||al(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var Fs=Array.isArray;function Ci(t,e,n,r){if(t=t.options,e){e={};for(var i=0;i<n.length;i++)e["$"+n[i]]=!0;for(n=0;n<t.length;n++)i=e.hasOwnProperty("$"+t[n].value),t[n].selected!==i&&(t[n].selected=i),i&&r&&(t[n].defaultSelected=!0)}else{for(n=""+cr(n),e=null,i=0;i<t.length;i++){if(t[i].value===n){t[i].selected=!0,r&&(t[i].defaultSelected=!0);return}e!==null||t[i].disabled||(e=t[i])}e!==null&&(e.selected=!0)}}function wd(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(D(91));return we({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function Om(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(D(92));if(Fs(n)){if(1<n.length)throw Error(D(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:cr(n)}}function $v(t,e){var n=cr(e.value),r=cr(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),r!=null&&(t.defaultValue=""+r)}function Dm(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function Bv(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function kd(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?Bv(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Sa,Hv=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,r,i){MSApp.execUnsafeLocalFunction(function(){return t(e,n,r,i)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(Sa=Sa||document.createElement("div"),Sa.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Sa.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function co(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var Bs={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Ok=["Webkit","ms","Moz","O"];Object.keys(Bs).forEach(function(t){Ok.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),Bs[e]=Bs[t]})});function Wv(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||Bs.hasOwnProperty(t)&&Bs[t]?(""+e).trim():e+"px"}function Gv(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=Wv(n,e[n],r);n==="float"&&(n="cssFloat"),r?t.setProperty(n,i):t[n]=i}}var Dk=we({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Ed(t,e){if(e){if(Dk[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(D(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(D(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(D(61))}if(e.style!=null&&typeof e.style!="object")throw Error(D(62))}}function Sd(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var bd=null;function zh(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Nd=null,Ii=null,Ti=null;function Lm(t){if(t=Bo(t)){if(typeof Nd!="function")throw Error(D(280));var e=t.stateNode;e&&(e=cc(e),Nd(t.stateNode,t.type,e))}}function qv(t){Ii?Ti?Ti.push(t):Ti=[t]:Ii=t}function Kv(){if(Ii){var t=Ii,e=Ti;if(Ti=Ii=null,Lm(t),e)for(t=0;t<e.length;t++)Lm(e[t])}}function Yv(t,e){return t(e)}function Qv(){}var Su=!1;function Xv(t,e,n){if(Su)return t(e,n);Su=!0;try{return Yv(t,e,n)}finally{Su=!1,(Ii!==null||Ti!==null)&&(Qv(),Kv())}}function uo(t,e){var n=t.stateNode;if(n===null)return null;var r=cc(n);if(r===null)return null;n=r[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(t=t.type,r=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!r;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(D(231,e,typeof n));return n}var Cd=!1;if(bn)try{var bs={};Object.defineProperty(bs,"passive",{get:function(){Cd=!0}}),window.addEventListener("test",bs,bs),window.removeEventListener("test",bs,bs)}catch{Cd=!1}function Lk(t,e,n,r,i,s,o,l,u){var h=Array.prototype.slice.call(arguments,3);try{e.apply(n,h)}catch(m){this.onError(m)}}var Hs=!1,ll=null,cl=!1,Id=null,Mk={onError:function(t){Hs=!0,ll=t}};function Fk(t,e,n,r,i,s,o,l,u){Hs=!1,ll=null,Lk.apply(Mk,arguments)}function Uk(t,e,n,r,i,s,o,l,u){if(Fk.apply(this,arguments),Hs){if(Hs){var h=ll;Hs=!1,ll=null}else throw Error(D(198));cl||(cl=!0,Id=h)}}function Qr(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function Jv(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Mm(t){if(Qr(t)!==t)throw Error(D(188))}function zk(t){var e=t.alternate;if(!e){if(e=Qr(t),e===null)throw Error(D(188));return e!==t?null:t}for(var n=t,r=e;;){var i=n.return;if(i===null)break;var s=i.alternate;if(s===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===s.child){for(s=i.child;s;){if(s===n)return Mm(i),t;if(s===r)return Mm(i),e;s=s.sibling}throw Error(D(188))}if(n.return!==r.return)n=i,r=s;else{for(var o=!1,l=i.child;l;){if(l===n){o=!0,n=i,r=s;break}if(l===r){o=!0,r=i,n=s;break}l=l.sibling}if(!o){for(l=s.child;l;){if(l===n){o=!0,n=s,r=i;break}if(l===r){o=!0,r=s,n=i;break}l=l.sibling}if(!o)throw Error(D(189))}}if(n.alternate!==r)throw Error(D(190))}if(n.tag!==3)throw Error(D(188));return n.stateNode.current===n?t:e}function Zv(t){return t=zk(t),t!==null?ey(t):null}function ey(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=ey(t);if(e!==null)return e;t=t.sibling}return null}var ty=Et.unstable_scheduleCallback,Fm=Et.unstable_cancelCallback,Vk=Et.unstable_shouldYield,$k=Et.unstable_requestPaint,Ce=Et.unstable_now,Bk=Et.unstable_getCurrentPriorityLevel,Vh=Et.unstable_ImmediatePriority,ny=Et.unstable_UserBlockingPriority,ul=Et.unstable_NormalPriority,Hk=Et.unstable_LowPriority,ry=Et.unstable_IdlePriority,sc=null,nn=null;function Wk(t){if(nn&&typeof nn.onCommitFiberRoot=="function")try{nn.onCommitFiberRoot(sc,t,void 0,(t.current.flags&128)===128)}catch{}}var Ht=Math.clz32?Math.clz32:Kk,Gk=Math.log,qk=Math.LN2;function Kk(t){return t>>>=0,t===0?32:31-(Gk(t)/qk|0)|0}var ba=64,Na=4194304;function Us(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function dl(t,e){var n=t.pendingLanes;if(n===0)return 0;var r=0,i=t.suspendedLanes,s=t.pingedLanes,o=n&268435455;if(o!==0){var l=o&~i;l!==0?r=Us(l):(s&=o,s!==0&&(r=Us(s)))}else o=n&~i,o!==0?r=Us(o):s!==0&&(r=Us(s));if(r===0)return 0;if(e!==0&&e!==r&&!(e&i)&&(i=r&-r,s=e&-e,i>=s||i===16&&(s&4194240)!==0))return e;if(r&4&&(r|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=r;0<e;)n=31-Ht(e),i=1<<n,r|=t[n],e&=~i;return r}function Yk(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Qk(t,e){for(var n=t.suspendedLanes,r=t.pingedLanes,i=t.expirationTimes,s=t.pendingLanes;0<s;){var o=31-Ht(s),l=1<<o,u=i[o];u===-1?(!(l&n)||l&r)&&(i[o]=Yk(l,e)):u<=e&&(t.expiredLanes|=l),s&=~l}}function Td(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function iy(){var t=ba;return ba<<=1,!(ba&4194240)&&(ba=64),t}function bu(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Vo(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-Ht(e),t[e]=n}function Xk(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var r=t.eventTimes;for(t=t.expirationTimes;0<n;){var i=31-Ht(n),s=1<<i;e[i]=0,r[i]=-1,t[i]=-1,n&=~s}}function $h(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var r=31-Ht(n),i=1<<r;i&e|t[r]&e&&(t[r]|=e),n&=~i}}var ae=0;function sy(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var oy,Bh,ay,ly,cy,Rd=!1,Ca=[],Xn=null,Jn=null,Zn=null,ho=new Map,fo=new Map,$n=[],Jk="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Um(t,e){switch(t){case"focusin":case"focusout":Xn=null;break;case"dragenter":case"dragleave":Jn=null;break;case"mouseover":case"mouseout":Zn=null;break;case"pointerover":case"pointerout":ho.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":fo.delete(e.pointerId)}}function Ns(t,e,n,r,i,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:r,nativeEvent:s,targetContainers:[i]},e!==null&&(e=Bo(e),e!==null&&Bh(e)),t):(t.eventSystemFlags|=r,e=t.targetContainers,i!==null&&e.indexOf(i)===-1&&e.push(i),t)}function Zk(t,e,n,r,i){switch(e){case"focusin":return Xn=Ns(Xn,t,e,n,r,i),!0;case"dragenter":return Jn=Ns(Jn,t,e,n,r,i),!0;case"mouseover":return Zn=Ns(Zn,t,e,n,r,i),!0;case"pointerover":var s=i.pointerId;return ho.set(s,Ns(ho.get(s)||null,t,e,n,r,i)),!0;case"gotpointercapture":return s=i.pointerId,fo.set(s,Ns(fo.get(s)||null,t,e,n,r,i)),!0}return!1}function uy(t){var e=Ir(t.target);if(e!==null){var n=Qr(e);if(n!==null){if(e=n.tag,e===13){if(e=Jv(n),e!==null){t.blockedOn=e,cy(t.priority,function(){ay(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Wa(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Pd(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var r=new n.constructor(n.type,n);bd=r,n.target.dispatchEvent(r),bd=null}else return e=Bo(n),e!==null&&Bh(e),t.blockedOn=n,!1;e.shift()}return!0}function zm(t,e,n){Wa(t)&&n.delete(e)}function eE(){Rd=!1,Xn!==null&&Wa(Xn)&&(Xn=null),Jn!==null&&Wa(Jn)&&(Jn=null),Zn!==null&&Wa(Zn)&&(Zn=null),ho.forEach(zm),fo.forEach(zm)}function Cs(t,e){t.blockedOn===e&&(t.blockedOn=null,Rd||(Rd=!0,Et.unstable_scheduleCallback(Et.unstable_NormalPriority,eE)))}function po(t){function e(i){return Cs(i,t)}if(0<Ca.length){Cs(Ca[0],t);for(var n=1;n<Ca.length;n++){var r=Ca[n];r.blockedOn===t&&(r.blockedOn=null)}}for(Xn!==null&&Cs(Xn,t),Jn!==null&&Cs(Jn,t),Zn!==null&&Cs(Zn,t),ho.forEach(e),fo.forEach(e),n=0;n<$n.length;n++)r=$n[n],r.blockedOn===t&&(r.blockedOn=null);for(;0<$n.length&&(n=$n[0],n.blockedOn===null);)uy(n),n.blockedOn===null&&$n.shift()}var Ri=An.ReactCurrentBatchConfig,hl=!0;function tE(t,e,n,r){var i=ae,s=Ri.transition;Ri.transition=null;try{ae=1,Hh(t,e,n,r)}finally{ae=i,Ri.transition=s}}function nE(t,e,n,r){var i=ae,s=Ri.transition;Ri.transition=null;try{ae=4,Hh(t,e,n,r)}finally{ae=i,Ri.transition=s}}function Hh(t,e,n,r){if(hl){var i=Pd(t,e,n,r);if(i===null)Du(t,e,r,fl,n),Um(t,r);else if(Zk(i,t,e,n,r))r.stopPropagation();else if(Um(t,r),e&4&&-1<Jk.indexOf(t)){for(;i!==null;){var s=Bo(i);if(s!==null&&oy(s),s=Pd(t,e,n,r),s===null&&Du(t,e,r,fl,n),s===i)break;i=s}i!==null&&r.stopPropagation()}else Du(t,e,r,null,n)}}var fl=null;function Pd(t,e,n,r){if(fl=null,t=zh(r),t=Ir(t),t!==null)if(e=Qr(t),e===null)t=null;else if(n=e.tag,n===13){if(t=Jv(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return fl=t,null}function dy(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Bk()){case Vh:return 1;case ny:return 4;case ul:case Hk:return 16;case ry:return 536870912;default:return 16}default:return 16}}var Kn=null,Wh=null,Ga=null;function hy(){if(Ga)return Ga;var t,e=Wh,n=e.length,r,i="value"in Kn?Kn.value:Kn.textContent,s=i.length;for(t=0;t<n&&e[t]===i[t];t++);var o=n-t;for(r=1;r<=o&&e[n-r]===i[s-r];r++);return Ga=i.slice(t,1<r?1-r:void 0)}function qa(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Ia(){return!0}function Vm(){return!1}function Nt(t){function e(n,r,i,s,o){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var l in t)t.hasOwnProperty(l)&&(n=t[l],this[l]=n?n(s):s[l]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?Ia:Vm,this.isPropagationStopped=Vm,this}return we(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Ia)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Ia)},persist:function(){},isPersistent:Ia}),e}var ns={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Gh=Nt(ns),$o=we({},ns,{view:0,detail:0}),rE=Nt($o),Nu,Cu,Is,oc=we({},$o,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:qh,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Is&&(Is&&t.type==="mousemove"?(Nu=t.screenX-Is.screenX,Cu=t.screenY-Is.screenY):Cu=Nu=0,Is=t),Nu)},movementY:function(t){return"movementY"in t?t.movementY:Cu}}),$m=Nt(oc),iE=we({},oc,{dataTransfer:0}),sE=Nt(iE),oE=we({},$o,{relatedTarget:0}),Iu=Nt(oE),aE=we({},ns,{animationName:0,elapsedTime:0,pseudoElement:0}),lE=Nt(aE),cE=we({},ns,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),uE=Nt(cE),dE=we({},ns,{data:0}),Bm=Nt(dE),hE={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},fE={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},pE={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function mE(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=pE[t])?!!e[t]:!1}function qh(){return mE}var gE=we({},$o,{key:function(t){if(t.key){var e=hE[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=qa(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?fE[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:qh,charCode:function(t){return t.type==="keypress"?qa(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?qa(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),vE=Nt(gE),yE=we({},oc,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Hm=Nt(yE),xE=we({},$o,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:qh}),_E=Nt(xE),wE=we({},ns,{propertyName:0,elapsedTime:0,pseudoElement:0}),kE=Nt(wE),EE=we({},oc,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),SE=Nt(EE),bE=[9,13,27,32],Kh=bn&&"CompositionEvent"in window,Ws=null;bn&&"documentMode"in document&&(Ws=document.documentMode);var NE=bn&&"TextEvent"in window&&!Ws,fy=bn&&(!Kh||Ws&&8<Ws&&11>=Ws),Wm=" ",Gm=!1;function py(t,e){switch(t){case"keyup":return bE.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function my(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var mi=!1;function CE(t,e){switch(t){case"compositionend":return my(e);case"keypress":return e.which!==32?null:(Gm=!0,Wm);case"textInput":return t=e.data,t===Wm&&Gm?null:t;default:return null}}function IE(t,e){if(mi)return t==="compositionend"||!Kh&&py(t,e)?(t=hy(),Ga=Wh=Kn=null,mi=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return fy&&e.locale!=="ko"?null:e.data;default:return null}}var TE={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function qm(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!TE[t.type]:e==="textarea"}function gy(t,e,n,r){qv(r),e=pl(e,"onChange"),0<e.length&&(n=new Gh("onChange","change",null,n,r),t.push({event:n,listeners:e}))}var Gs=null,mo=null;function RE(t){Cy(t,0)}function ac(t){var e=yi(t);if(zv(e))return t}function PE(t,e){if(t==="change")return e}var vy=!1;if(bn){var Tu;if(bn){var Ru="oninput"in document;if(!Ru){var Km=document.createElement("div");Km.setAttribute("oninput","return;"),Ru=typeof Km.oninput=="function"}Tu=Ru}else Tu=!1;vy=Tu&&(!document.documentMode||9<document.documentMode)}function Ym(){Gs&&(Gs.detachEvent("onpropertychange",yy),mo=Gs=null)}function yy(t){if(t.propertyName==="value"&&ac(mo)){var e=[];gy(e,mo,t,zh(t)),Xv(RE,e)}}function AE(t,e,n){t==="focusin"?(Ym(),Gs=e,mo=n,Gs.attachEvent("onpropertychange",yy)):t==="focusout"&&Ym()}function jE(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return ac(mo)}function OE(t,e){if(t==="click")return ac(e)}function DE(t,e){if(t==="input"||t==="change")return ac(e)}function LE(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var qt=typeof Object.is=="function"?Object.is:LE;function go(t,e){if(qt(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),r=Object.keys(e);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!fd.call(e,i)||!qt(t[i],e[i]))return!1}return!0}function Qm(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Xm(t,e){var n=Qm(t);t=0;for(var r;n;){if(n.nodeType===3){if(r=t+n.textContent.length,t<=e&&r>=e)return{node:n,offset:e-t};t=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Qm(n)}}function xy(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?xy(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function _y(){for(var t=window,e=al();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=al(t.document)}return e}function Yh(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function ME(t){var e=_y(),n=t.focusedElem,r=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&xy(n.ownerDocument.documentElement,n)){if(r!==null&&Yh(n)){if(e=r.start,t=r.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var i=n.textContent.length,s=Math.min(r.start,i);r=r.end===void 0?s:Math.min(r.end,i),!t.extend&&s>r&&(i=r,r=s,s=i),i=Xm(n,s);var o=Xm(n,r);i&&o&&(t.rangeCount!==1||t.anchorNode!==i.node||t.anchorOffset!==i.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(i.node,i.offset),t.removeAllRanges(),s>r?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var FE=bn&&"documentMode"in document&&11>=document.documentMode,gi=null,Ad=null,qs=null,jd=!1;function Jm(t,e,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;jd||gi==null||gi!==al(r)||(r=gi,"selectionStart"in r&&Yh(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),qs&&go(qs,r)||(qs=r,r=pl(Ad,"onSelect"),0<r.length&&(e=new Gh("onSelect","select",null,e,n),t.push({event:e,listeners:r}),e.target=gi)))}function Ta(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var vi={animationend:Ta("Animation","AnimationEnd"),animationiteration:Ta("Animation","AnimationIteration"),animationstart:Ta("Animation","AnimationStart"),transitionend:Ta("Transition","TransitionEnd")},Pu={},wy={};bn&&(wy=document.createElement("div").style,"AnimationEvent"in window||(delete vi.animationend.animation,delete vi.animationiteration.animation,delete vi.animationstart.animation),"TransitionEvent"in window||delete vi.transitionend.transition);function lc(t){if(Pu[t])return Pu[t];if(!vi[t])return t;var e=vi[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in wy)return Pu[t]=e[n];return t}var ky=lc("animationend"),Ey=lc("animationiteration"),Sy=lc("animationstart"),by=lc("transitionend"),Ny=new Map,Zm="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function gr(t,e){Ny.set(t,e),Yr(e,[t])}for(var Au=0;Au<Zm.length;Au++){var ju=Zm[Au],UE=ju.toLowerCase(),zE=ju[0].toUpperCase()+ju.slice(1);gr(UE,"on"+zE)}gr(ky,"onAnimationEnd");gr(Ey,"onAnimationIteration");gr(Sy,"onAnimationStart");gr("dblclick","onDoubleClick");gr("focusin","onFocus");gr("focusout","onBlur");gr(by,"onTransitionEnd");Fi("onMouseEnter",["mouseout","mouseover"]);Fi("onMouseLeave",["mouseout","mouseover"]);Fi("onPointerEnter",["pointerout","pointerover"]);Fi("onPointerLeave",["pointerout","pointerover"]);Yr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Yr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Yr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Yr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Yr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Yr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var zs="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),VE=new Set("cancel close invalid load scroll toggle".split(" ").concat(zs));function eg(t,e,n){var r=t.type||"unknown-event";t.currentTarget=n,Uk(r,e,void 0,t),t.currentTarget=null}function Cy(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var r=t[n],i=r.event;r=r.listeners;e:{var s=void 0;if(e)for(var o=r.length-1;0<=o;o--){var l=r[o],u=l.instance,h=l.currentTarget;if(l=l.listener,u!==s&&i.isPropagationStopped())break e;eg(i,l,h),s=u}else for(o=0;o<r.length;o++){if(l=r[o],u=l.instance,h=l.currentTarget,l=l.listener,u!==s&&i.isPropagationStopped())break e;eg(i,l,h),s=u}}}if(cl)throw t=Id,cl=!1,Id=null,t}function me(t,e){var n=e[Fd];n===void 0&&(n=e[Fd]=new Set);var r=t+"__bubble";n.has(r)||(Iy(e,t,2,!1),n.add(r))}function Ou(t,e,n){var r=0;e&&(r|=4),Iy(n,t,r,e)}var Ra="_reactListening"+Math.random().toString(36).slice(2);function vo(t){if(!t[Ra]){t[Ra]=!0,Dv.forEach(function(n){n!=="selectionchange"&&(VE.has(n)||Ou(n,!1,t),Ou(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Ra]||(e[Ra]=!0,Ou("selectionchange",!1,e))}}function Iy(t,e,n,r){switch(dy(e)){case 1:var i=tE;break;case 4:i=nE;break;default:i=Hh}n=i.bind(null,e,n,t),i=void 0,!Cd||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(i=!0),r?i!==void 0?t.addEventListener(e,n,{capture:!0,passive:i}):t.addEventListener(e,n,!0):i!==void 0?t.addEventListener(e,n,{passive:i}):t.addEventListener(e,n,!1)}function Du(t,e,n,r,i){var s=r;if(!(e&1)&&!(e&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var l=r.stateNode.containerInfo;if(l===i||l.nodeType===8&&l.parentNode===i)break;if(o===4)for(o=r.return;o!==null;){var u=o.tag;if((u===3||u===4)&&(u=o.stateNode.containerInfo,u===i||u.nodeType===8&&u.parentNode===i))return;o=o.return}for(;l!==null;){if(o=Ir(l),o===null)return;if(u=o.tag,u===5||u===6){r=s=o;continue e}l=l.parentNode}}r=r.return}Xv(function(){var h=s,m=zh(n),p=[];e:{var g=Ny.get(t);if(g!==void 0){var E=Gh,I=t;switch(t){case"keypress":if(qa(n)===0)break e;case"keydown":case"keyup":E=vE;break;case"focusin":I="focus",E=Iu;break;case"focusout":I="blur",E=Iu;break;case"beforeblur":case"afterblur":E=Iu;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":E=$m;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":E=sE;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":E=_E;break;case ky:case Ey:case Sy:E=lE;break;case by:E=kE;break;case"scroll":E=rE;break;case"wheel":E=SE;break;case"copy":case"cut":case"paste":E=uE;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":E=Hm}var P=(e&4)!==0,L=!P&&t==="scroll",N=P?g!==null?g+"Capture":null:g;P=[];for(var w=h,b;w!==null;){b=w;var j=b.stateNode;if(b.tag===5&&j!==null&&(b=j,N!==null&&(j=uo(w,N),j!=null&&P.push(yo(w,j,b)))),L)break;w=w.return}0<P.length&&(g=new E(g,I,null,n,m),p.push({event:g,listeners:P}))}}if(!(e&7)){e:{if(g=t==="mouseover"||t==="pointerover",E=t==="mouseout"||t==="pointerout",g&&n!==bd&&(I=n.relatedTarget||n.fromElement)&&(Ir(I)||I[Nn]))break e;if((E||g)&&(g=m.window===m?m:(g=m.ownerDocument)?g.defaultView||g.parentWindow:window,E?(I=n.relatedTarget||n.toElement,E=h,I=I?Ir(I):null,I!==null&&(L=Qr(I),I!==L||I.tag!==5&&I.tag!==6)&&(I=null)):(E=null,I=h),E!==I)){if(P=$m,j="onMouseLeave",N="onMouseEnter",w="mouse",(t==="pointerout"||t==="pointerover")&&(P=Hm,j="onPointerLeave",N="onPointerEnter",w="pointer"),L=E==null?g:yi(E),b=I==null?g:yi(I),g=new P(j,w+"leave",E,n,m),g.target=L,g.relatedTarget=b,j=null,Ir(m)===h&&(P=new P(N,w+"enter",I,n,m),P.target=b,P.relatedTarget=L,j=P),L=j,E&&I)t:{for(P=E,N=I,w=0,b=P;b;b=ci(b))w++;for(b=0,j=N;j;j=ci(j))b++;for(;0<w-b;)P=ci(P),w--;for(;0<b-w;)N=ci(N),b--;for(;w--;){if(P===N||N!==null&&P===N.alternate)break t;P=ci(P),N=ci(N)}P=null}else P=null;E!==null&&tg(p,g,E,P,!1),I!==null&&L!==null&&tg(p,L,I,P,!0)}}e:{if(g=h?yi(h):window,E=g.nodeName&&g.nodeName.toLowerCase(),E==="select"||E==="input"&&g.type==="file")var O=PE;else if(qm(g))if(vy)O=DE;else{O=jE;var U=AE}else(E=g.nodeName)&&E.toLowerCase()==="input"&&(g.type==="checkbox"||g.type==="radio")&&(O=OE);if(O&&(O=O(t,h))){gy(p,O,n,m);break e}U&&U(t,g,h),t==="focusout"&&(U=g._wrapperState)&&U.controlled&&g.type==="number"&&_d(g,"number",g.value)}switch(U=h?yi(h):window,t){case"focusin":(qm(U)||U.contentEditable==="true")&&(gi=U,Ad=h,qs=null);break;case"focusout":qs=Ad=gi=null;break;case"mousedown":jd=!0;break;case"contextmenu":case"mouseup":case"dragend":jd=!1,Jm(p,n,m);break;case"selectionchange":if(FE)break;case"keydown":case"keyup":Jm(p,n,m)}var x;if(Kh)e:{switch(t){case"compositionstart":var y="onCompositionStart";break e;case"compositionend":y="onCompositionEnd";break e;case"compositionupdate":y="onCompositionUpdate";break e}y=void 0}else mi?py(t,n)&&(y="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(y="onCompositionStart");y&&(fy&&n.locale!=="ko"&&(mi||y!=="onCompositionStart"?y==="onCompositionEnd"&&mi&&(x=hy()):(Kn=m,Wh="value"in Kn?Kn.value:Kn.textContent,mi=!0)),U=pl(h,y),0<U.length&&(y=new Bm(y,t,null,n,m),p.push({event:y,listeners:U}),x?y.data=x:(x=my(n),x!==null&&(y.data=x)))),(x=NE?CE(t,n):IE(t,n))&&(h=pl(h,"onBeforeInput"),0<h.length&&(m=new Bm("onBeforeInput","beforeinput",null,n,m),p.push({event:m,listeners:h}),m.data=x))}Cy(p,e)})}function yo(t,e,n){return{instance:t,listener:e,currentTarget:n}}function pl(t,e){for(var n=e+"Capture",r=[];t!==null;){var i=t,s=i.stateNode;i.tag===5&&s!==null&&(i=s,s=uo(t,n),s!=null&&r.unshift(yo(t,s,i)),s=uo(t,e),s!=null&&r.push(yo(t,s,i))),t=t.return}return r}function ci(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function tg(t,e,n,r,i){for(var s=e._reactName,o=[];n!==null&&n!==r;){var l=n,u=l.alternate,h=l.stateNode;if(u!==null&&u===r)break;l.tag===5&&h!==null&&(l=h,i?(u=uo(n,s),u!=null&&o.unshift(yo(n,u,l))):i||(u=uo(n,s),u!=null&&o.push(yo(n,u,l)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var $E=/\r\n?/g,BE=/\u0000|\uFFFD/g;function ng(t){return(typeof t=="string"?t:""+t).replace($E,`
`).replace(BE,"")}function Pa(t,e,n){if(e=ng(e),ng(t)!==e&&n)throw Error(D(425))}function ml(){}var Od=null,Dd=null;function Ld(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Md=typeof setTimeout=="function"?setTimeout:void 0,HE=typeof clearTimeout=="function"?clearTimeout:void 0,rg=typeof Promise=="function"?Promise:void 0,WE=typeof queueMicrotask=="function"?queueMicrotask:typeof rg<"u"?function(t){return rg.resolve(null).then(t).catch(GE)}:Md;function GE(t){setTimeout(function(){throw t})}function Lu(t,e){var n=e,r=0;do{var i=n.nextSibling;if(t.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){t.removeChild(i),po(e);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);po(e)}function er(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function ig(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var rs=Math.random().toString(36).slice(2),en="__reactFiber$"+rs,xo="__reactProps$"+rs,Nn="__reactContainer$"+rs,Fd="__reactEvents$"+rs,qE="__reactListeners$"+rs,KE="__reactHandles$"+rs;function Ir(t){var e=t[en];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Nn]||n[en]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=ig(t);t!==null;){if(n=t[en])return n;t=ig(t)}return e}t=n,n=t.parentNode}return null}function Bo(t){return t=t[en]||t[Nn],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function yi(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(D(33))}function cc(t){return t[xo]||null}var Ud=[],xi=-1;function vr(t){return{current:t}}function ge(t){0>xi||(t.current=Ud[xi],Ud[xi]=null,xi--)}function he(t,e){xi++,Ud[xi]=t.current,t.current=e}var ur={},Xe=vr(ur),pt=vr(!1),Dr=ur;function Ui(t,e){var n=t.type.contextTypes;if(!n)return ur;var r=t.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===e)return r.__reactInternalMemoizedMaskedChildContext;var i={},s;for(s in n)i[s]=e[s];return r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=i),i}function mt(t){return t=t.childContextTypes,t!=null}function gl(){ge(pt),ge(Xe)}function sg(t,e,n){if(Xe.current!==ur)throw Error(D(168));he(Xe,e),he(pt,n)}function Ty(t,e,n){var r=t.stateNode;if(e=e.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in e))throw Error(D(108,Ak(t)||"Unknown",i));return we({},n,r)}function vl(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||ur,Dr=Xe.current,he(Xe,t),he(pt,pt.current),!0}function og(t,e,n){var r=t.stateNode;if(!r)throw Error(D(169));n?(t=Ty(t,e,Dr),r.__reactInternalMemoizedMergedChildContext=t,ge(pt),ge(Xe),he(Xe,t)):ge(pt),he(pt,n)}var mn=null,uc=!1,Mu=!1;function Ry(t){mn===null?mn=[t]:mn.push(t)}function YE(t){uc=!0,Ry(t)}function yr(){if(!Mu&&mn!==null){Mu=!0;var t=0,e=ae;try{var n=mn;for(ae=1;t<n.length;t++){var r=n[t];do r=r(!0);while(r!==null)}mn=null,uc=!1}catch(i){throw mn!==null&&(mn=mn.slice(t+1)),ty(Vh,yr),i}finally{ae=e,Mu=!1}}return null}var _i=[],wi=0,yl=null,xl=0,It=[],Tt=0,Lr=null,gn=1,vn="";function Sr(t,e){_i[wi++]=xl,_i[wi++]=yl,yl=t,xl=e}function Py(t,e,n){It[Tt++]=gn,It[Tt++]=vn,It[Tt++]=Lr,Lr=t;var r=gn;t=vn;var i=32-Ht(r)-1;r&=~(1<<i),n+=1;var s=32-Ht(e)+i;if(30<s){var o=i-i%5;s=(r&(1<<o)-1).toString(32),r>>=o,i-=o,gn=1<<32-Ht(e)+i|n<<i|r,vn=s+t}else gn=1<<s|n<<i|r,vn=t}function Qh(t){t.return!==null&&(Sr(t,1),Py(t,1,0))}function Xh(t){for(;t===yl;)yl=_i[--wi],_i[wi]=null,xl=_i[--wi],_i[wi]=null;for(;t===Lr;)Lr=It[--Tt],It[Tt]=null,vn=It[--Tt],It[Tt]=null,gn=It[--Tt],It[Tt]=null}var wt=null,_t=null,ve=!1,zt=null;function Ay(t,e){var n=Rt(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function ag(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,wt=t,_t=er(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,wt=t,_t=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Lr!==null?{id:gn,overflow:vn}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Rt(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,wt=t,_t=null,!0):!1;default:return!1}}function zd(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Vd(t){if(ve){var e=_t;if(e){var n=e;if(!ag(t,e)){if(zd(t))throw Error(D(418));e=er(n.nextSibling);var r=wt;e&&ag(t,e)?Ay(r,n):(t.flags=t.flags&-4097|2,ve=!1,wt=t)}}else{if(zd(t))throw Error(D(418));t.flags=t.flags&-4097|2,ve=!1,wt=t}}}function lg(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;wt=t}function Aa(t){if(t!==wt)return!1;if(!ve)return lg(t),ve=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Ld(t.type,t.memoizedProps)),e&&(e=_t)){if(zd(t))throw jy(),Error(D(418));for(;e;)Ay(t,e),e=er(e.nextSibling)}if(lg(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(D(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){_t=er(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}_t=null}}else _t=wt?er(t.stateNode.nextSibling):null;return!0}function jy(){for(var t=_t;t;)t=er(t.nextSibling)}function zi(){_t=wt=null,ve=!1}function Jh(t){zt===null?zt=[t]:zt.push(t)}var QE=An.ReactCurrentBatchConfig;function Ts(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(D(309));var r=n.stateNode}if(!r)throw Error(D(147,t));var i=r,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var l=i.refs;o===null?delete l[s]:l[s]=o},e._stringRef=s,e)}if(typeof t!="string")throw Error(D(284));if(!n._owner)throw Error(D(290,t))}return t}function ja(t,e){throw t=Object.prototype.toString.call(e),Error(D(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function cg(t){var e=t._init;return e(t._payload)}function Oy(t){function e(N,w){if(t){var b=N.deletions;b===null?(N.deletions=[w],N.flags|=16):b.push(w)}}function n(N,w){if(!t)return null;for(;w!==null;)e(N,w),w=w.sibling;return null}function r(N,w){for(N=new Map;w!==null;)w.key!==null?N.set(w.key,w):N.set(w.index,w),w=w.sibling;return N}function i(N,w){return N=ir(N,w),N.index=0,N.sibling=null,N}function s(N,w,b){return N.index=b,t?(b=N.alternate,b!==null?(b=b.index,b<w?(N.flags|=2,w):b):(N.flags|=2,w)):(N.flags|=1048576,w)}function o(N){return t&&N.alternate===null&&(N.flags|=2),N}function l(N,w,b,j){return w===null||w.tag!==6?(w=Hu(b,N.mode,j),w.return=N,w):(w=i(w,b),w.return=N,w)}function u(N,w,b,j){var O=b.type;return O===pi?m(N,w,b.props.children,j,b.key):w!==null&&(w.elementType===O||typeof O=="object"&&O!==null&&O.$$typeof===Un&&cg(O)===w.type)?(j=i(w,b.props),j.ref=Ts(N,w,b),j.return=N,j):(j=el(b.type,b.key,b.props,null,N.mode,j),j.ref=Ts(N,w,b),j.return=N,j)}function h(N,w,b,j){return w===null||w.tag!==4||w.stateNode.containerInfo!==b.containerInfo||w.stateNode.implementation!==b.implementation?(w=Wu(b,N.mode,j),w.return=N,w):(w=i(w,b.children||[]),w.return=N,w)}function m(N,w,b,j,O){return w===null||w.tag!==7?(w=Or(b,N.mode,j,O),w.return=N,w):(w=i(w,b),w.return=N,w)}function p(N,w,b){if(typeof w=="string"&&w!==""||typeof w=="number")return w=Hu(""+w,N.mode,b),w.return=N,w;if(typeof w=="object"&&w!==null){switch(w.$$typeof){case ka:return b=el(w.type,w.key,w.props,null,N.mode,b),b.ref=Ts(N,null,w),b.return=N,b;case fi:return w=Wu(w,N.mode,b),w.return=N,w;case Un:var j=w._init;return p(N,j(w._payload),b)}if(Fs(w)||Ss(w))return w=Or(w,N.mode,b,null),w.return=N,w;ja(N,w)}return null}function g(N,w,b,j){var O=w!==null?w.key:null;if(typeof b=="string"&&b!==""||typeof b=="number")return O!==null?null:l(N,w,""+b,j);if(typeof b=="object"&&b!==null){switch(b.$$typeof){case ka:return b.key===O?u(N,w,b,j):null;case fi:return b.key===O?h(N,w,b,j):null;case Un:return O=b._init,g(N,w,O(b._payload),j)}if(Fs(b)||Ss(b))return O!==null?null:m(N,w,b,j,null);ja(N,b)}return null}function E(N,w,b,j,O){if(typeof j=="string"&&j!==""||typeof j=="number")return N=N.get(b)||null,l(w,N,""+j,O);if(typeof j=="object"&&j!==null){switch(j.$$typeof){case ka:return N=N.get(j.key===null?b:j.key)||null,u(w,N,j,O);case fi:return N=N.get(j.key===null?b:j.key)||null,h(w,N,j,O);case Un:var U=j._init;return E(N,w,b,U(j._payload),O)}if(Fs(j)||Ss(j))return N=N.get(b)||null,m(w,N,j,O,null);ja(w,j)}return null}function I(N,w,b,j){for(var O=null,U=null,x=w,y=w=0,_=null;x!==null&&y<b.length;y++){x.index>y?(_=x,x=null):_=x.sibling;var S=g(N,x,b[y],j);if(S===null){x===null&&(x=_);break}t&&x&&S.alternate===null&&e(N,x),w=s(S,w,y),U===null?O=S:U.sibling=S,U=S,x=_}if(y===b.length)return n(N,x),ve&&Sr(N,y),O;if(x===null){for(;y<b.length;y++)x=p(N,b[y],j),x!==null&&(w=s(x,w,y),U===null?O=x:U.sibling=x,U=x);return ve&&Sr(N,y),O}for(x=r(N,x);y<b.length;y++)_=E(x,N,y,b[y],j),_!==null&&(t&&_.alternate!==null&&x.delete(_.key===null?y:_.key),w=s(_,w,y),U===null?O=_:U.sibling=_,U=_);return t&&x.forEach(function(C){return e(N,C)}),ve&&Sr(N,y),O}function P(N,w,b,j){var O=Ss(b);if(typeof O!="function")throw Error(D(150));if(b=O.call(b),b==null)throw Error(D(151));for(var U=O=null,x=w,y=w=0,_=null,S=b.next();x!==null&&!S.done;y++,S=b.next()){x.index>y?(_=x,x=null):_=x.sibling;var C=g(N,x,S.value,j);if(C===null){x===null&&(x=_);break}t&&x&&C.alternate===null&&e(N,x),w=s(C,w,y),U===null?O=C:U.sibling=C,U=C,x=_}if(S.done)return n(N,x),ve&&Sr(N,y),O;if(x===null){for(;!S.done;y++,S=b.next())S=p(N,S.value,j),S!==null&&(w=s(S,w,y),U===null?O=S:U.sibling=S,U=S);return ve&&Sr(N,y),O}for(x=r(N,x);!S.done;y++,S=b.next())S=E(x,N,y,S.value,j),S!==null&&(t&&S.alternate!==null&&x.delete(S.key===null?y:S.key),w=s(S,w,y),U===null?O=S:U.sibling=S,U=S);return t&&x.forEach(function(T){return e(N,T)}),ve&&Sr(N,y),O}function L(N,w,b,j){if(typeof b=="object"&&b!==null&&b.type===pi&&b.key===null&&(b=b.props.children),typeof b=="object"&&b!==null){switch(b.$$typeof){case ka:e:{for(var O=b.key,U=w;U!==null;){if(U.key===O){if(O=b.type,O===pi){if(U.tag===7){n(N,U.sibling),w=i(U,b.props.children),w.return=N,N=w;break e}}else if(U.elementType===O||typeof O=="object"&&O!==null&&O.$$typeof===Un&&cg(O)===U.type){n(N,U.sibling),w=i(U,b.props),w.ref=Ts(N,U,b),w.return=N,N=w;break e}n(N,U);break}else e(N,U);U=U.sibling}b.type===pi?(w=Or(b.props.children,N.mode,j,b.key),w.return=N,N=w):(j=el(b.type,b.key,b.props,null,N.mode,j),j.ref=Ts(N,w,b),j.return=N,N=j)}return o(N);case fi:e:{for(U=b.key;w!==null;){if(w.key===U)if(w.tag===4&&w.stateNode.containerInfo===b.containerInfo&&w.stateNode.implementation===b.implementation){n(N,w.sibling),w=i(w,b.children||[]),w.return=N,N=w;break e}else{n(N,w);break}else e(N,w);w=w.sibling}w=Wu(b,N.mode,j),w.return=N,N=w}return o(N);case Un:return U=b._init,L(N,w,U(b._payload),j)}if(Fs(b))return I(N,w,b,j);if(Ss(b))return P(N,w,b,j);ja(N,b)}return typeof b=="string"&&b!==""||typeof b=="number"?(b=""+b,w!==null&&w.tag===6?(n(N,w.sibling),w=i(w,b),w.return=N,N=w):(n(N,w),w=Hu(b,N.mode,j),w.return=N,N=w),o(N)):n(N,w)}return L}var Vi=Oy(!0),Dy=Oy(!1),_l=vr(null),wl=null,ki=null,Zh=null;function ef(){Zh=ki=wl=null}function tf(t){var e=_l.current;ge(_l),t._currentValue=e}function $d(t,e,n){for(;t!==null;){var r=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,r!==null&&(r.childLanes|=e)):r!==null&&(r.childLanes&e)!==e&&(r.childLanes|=e),t===n)break;t=t.return}}function Pi(t,e){wl=t,Zh=ki=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(ht=!0),t.firstContext=null)}function jt(t){var e=t._currentValue;if(Zh!==t)if(t={context:t,memoizedValue:e,next:null},ki===null){if(wl===null)throw Error(D(308));ki=t,wl.dependencies={lanes:0,firstContext:t}}else ki=ki.next=t;return e}var Tr=null;function nf(t){Tr===null?Tr=[t]:Tr.push(t)}function Ly(t,e,n,r){var i=e.interleaved;return i===null?(n.next=n,nf(e)):(n.next=i.next,i.next=n),e.interleaved=n,Cn(t,r)}function Cn(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var zn=!1;function rf(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function My(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function kn(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function tr(t,e,n){var r=t.updateQueue;if(r===null)return null;if(r=r.shared,te&2){var i=r.pending;return i===null?e.next=e:(e.next=i.next,i.next=e),r.pending=e,Cn(t,n)}return i=r.interleaved,i===null?(e.next=e,nf(r)):(e.next=i.next,i.next=e),r.interleaved=e,Cn(t,n)}function Ka(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,$h(t,n)}}function ug(t,e){var n=t.updateQueue,r=t.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?i=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?i=s=e:s=s.next=e}else i=s=e;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:s,shared:r.shared,effects:r.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function kl(t,e,n,r){var i=t.updateQueue;zn=!1;var s=i.firstBaseUpdate,o=i.lastBaseUpdate,l=i.shared.pending;if(l!==null){i.shared.pending=null;var u=l,h=u.next;u.next=null,o===null?s=h:o.next=h,o=u;var m=t.alternate;m!==null&&(m=m.updateQueue,l=m.lastBaseUpdate,l!==o&&(l===null?m.firstBaseUpdate=h:l.next=h,m.lastBaseUpdate=u))}if(s!==null){var p=i.baseState;o=0,m=h=u=null,l=s;do{var g=l.lane,E=l.eventTime;if((r&g)===g){m!==null&&(m=m.next={eventTime:E,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var I=t,P=l;switch(g=e,E=n,P.tag){case 1:if(I=P.payload,typeof I=="function"){p=I.call(E,p,g);break e}p=I;break e;case 3:I.flags=I.flags&-65537|128;case 0:if(I=P.payload,g=typeof I=="function"?I.call(E,p,g):I,g==null)break e;p=we({},p,g);break e;case 2:zn=!0}}l.callback!==null&&l.lane!==0&&(t.flags|=64,g=i.effects,g===null?i.effects=[l]:g.push(l))}else E={eventTime:E,lane:g,tag:l.tag,payload:l.payload,callback:l.callback,next:null},m===null?(h=m=E,u=p):m=m.next=E,o|=g;if(l=l.next,l===null){if(l=i.shared.pending,l===null)break;g=l,l=g.next,g.next=null,i.lastBaseUpdate=g,i.shared.pending=null}}while(!0);if(m===null&&(u=p),i.baseState=u,i.firstBaseUpdate=h,i.lastBaseUpdate=m,e=i.shared.interleaved,e!==null){i=e;do o|=i.lane,i=i.next;while(i!==e)}else s===null&&(i.shared.lanes=0);Fr|=o,t.lanes=o,t.memoizedState=p}}function dg(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var r=t[e],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(D(191,i));i.call(r)}}}var Ho={},rn=vr(Ho),_o=vr(Ho),wo=vr(Ho);function Rr(t){if(t===Ho)throw Error(D(174));return t}function sf(t,e){switch(he(wo,e),he(_o,t),he(rn,Ho),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:kd(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=kd(e,t)}ge(rn),he(rn,e)}function $i(){ge(rn),ge(_o),ge(wo)}function Fy(t){Rr(wo.current);var e=Rr(rn.current),n=kd(e,t.type);e!==n&&(he(_o,t),he(rn,n))}function of(t){_o.current===t&&(ge(rn),ge(_o))}var ye=vr(0);function El(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Fu=[];function af(){for(var t=0;t<Fu.length;t++)Fu[t]._workInProgressVersionPrimary=null;Fu.length=0}var Ya=An.ReactCurrentDispatcher,Uu=An.ReactCurrentBatchConfig,Mr=0,_e=null,Ae=null,Le=null,Sl=!1,Ks=!1,ko=0,XE=0;function Ke(){throw Error(D(321))}function lf(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!qt(t[n],e[n]))return!1;return!0}function cf(t,e,n,r,i,s){if(Mr=s,_e=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Ya.current=t===null||t.memoizedState===null?t2:n2,t=n(r,i),Ks){s=0;do{if(Ks=!1,ko=0,25<=s)throw Error(D(301));s+=1,Le=Ae=null,e.updateQueue=null,Ya.current=r2,t=n(r,i)}while(Ks)}if(Ya.current=bl,e=Ae!==null&&Ae.next!==null,Mr=0,Le=Ae=_e=null,Sl=!1,e)throw Error(D(300));return t}function uf(){var t=ko!==0;return ko=0,t}function Zt(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Le===null?_e.memoizedState=Le=t:Le=Le.next=t,Le}function Ot(){if(Ae===null){var t=_e.alternate;t=t!==null?t.memoizedState:null}else t=Ae.next;var e=Le===null?_e.memoizedState:Le.next;if(e!==null)Le=e,Ae=t;else{if(t===null)throw Error(D(310));Ae=t,t={memoizedState:Ae.memoizedState,baseState:Ae.baseState,baseQueue:Ae.baseQueue,queue:Ae.queue,next:null},Le===null?_e.memoizedState=Le=t:Le=Le.next=t}return Le}function Eo(t,e){return typeof e=="function"?e(t):e}function zu(t){var e=Ot(),n=e.queue;if(n===null)throw Error(D(311));n.lastRenderedReducer=t;var r=Ae,i=r.baseQueue,s=n.pending;if(s!==null){if(i!==null){var o=i.next;i.next=s.next,s.next=o}r.baseQueue=i=s,n.pending=null}if(i!==null){s=i.next,r=r.baseState;var l=o=null,u=null,h=s;do{var m=h.lane;if((Mr&m)===m)u!==null&&(u=u.next={lane:0,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null}),r=h.hasEagerState?h.eagerState:t(r,h.action);else{var p={lane:m,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null};u===null?(l=u=p,o=r):u=u.next=p,_e.lanes|=m,Fr|=m}h=h.next}while(h!==null&&h!==s);u===null?o=r:u.next=l,qt(r,e.memoizedState)||(ht=!0),e.memoizedState=r,e.baseState=o,e.baseQueue=u,n.lastRenderedState=r}if(t=n.interleaved,t!==null){i=t;do s=i.lane,_e.lanes|=s,Fr|=s,i=i.next;while(i!==t)}else i===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function Vu(t){var e=Ot(),n=e.queue;if(n===null)throw Error(D(311));n.lastRenderedReducer=t;var r=n.dispatch,i=n.pending,s=e.memoizedState;if(i!==null){n.pending=null;var o=i=i.next;do s=t(s,o.action),o=o.next;while(o!==i);qt(s,e.memoizedState)||(ht=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,r]}function Uy(){}function zy(t,e){var n=_e,r=Ot(),i=e(),s=!qt(r.memoizedState,i);if(s&&(r.memoizedState=i,ht=!0),r=r.queue,df(By.bind(null,n,r,t),[t]),r.getSnapshot!==e||s||Le!==null&&Le.memoizedState.tag&1){if(n.flags|=2048,So(9,$y.bind(null,n,r,i,e),void 0,null),Fe===null)throw Error(D(349));Mr&30||Vy(n,e,i)}return i}function Vy(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=_e.updateQueue,e===null?(e={lastEffect:null,stores:null},_e.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function $y(t,e,n,r){e.value=n,e.getSnapshot=r,Hy(e)&&Wy(t)}function By(t,e,n){return n(function(){Hy(e)&&Wy(t)})}function Hy(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!qt(t,n)}catch{return!0}}function Wy(t){var e=Cn(t,1);e!==null&&Wt(e,t,1,-1)}function hg(t){var e=Zt();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Eo,lastRenderedState:t},e.queue=t,t=t.dispatch=e2.bind(null,_e,t),[e.memoizedState,t]}function So(t,e,n,r){return t={tag:t,create:e,destroy:n,deps:r,next:null},e=_e.updateQueue,e===null?(e={lastEffect:null,stores:null},_e.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(r=n.next,n.next=t,t.next=r,e.lastEffect=t)),t}function Gy(){return Ot().memoizedState}function Qa(t,e,n,r){var i=Zt();_e.flags|=t,i.memoizedState=So(1|e,n,void 0,r===void 0?null:r)}function dc(t,e,n,r){var i=Ot();r=r===void 0?null:r;var s=void 0;if(Ae!==null){var o=Ae.memoizedState;if(s=o.destroy,r!==null&&lf(r,o.deps)){i.memoizedState=So(e,n,s,r);return}}_e.flags|=t,i.memoizedState=So(1|e,n,s,r)}function fg(t,e){return Qa(8390656,8,t,e)}function df(t,e){return dc(2048,8,t,e)}function qy(t,e){return dc(4,2,t,e)}function Ky(t,e){return dc(4,4,t,e)}function Yy(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Qy(t,e,n){return n=n!=null?n.concat([t]):null,dc(4,4,Yy.bind(null,e,t),n)}function hf(){}function Xy(t,e){var n=Ot();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&lf(e,r[1])?r[0]:(n.memoizedState=[t,e],t)}function Jy(t,e){var n=Ot();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&lf(e,r[1])?r[0]:(t=t(),n.memoizedState=[t,e],t)}function Zy(t,e,n){return Mr&21?(qt(n,e)||(n=iy(),_e.lanes|=n,Fr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,ht=!0),t.memoizedState=n)}function JE(t,e){var n=ae;ae=n!==0&&4>n?n:4,t(!0);var r=Uu.transition;Uu.transition={};try{t(!1),e()}finally{ae=n,Uu.transition=r}}function ex(){return Ot().memoizedState}function ZE(t,e,n){var r=rr(t);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},tx(t))nx(e,n);else if(n=Ly(t,e,n,r),n!==null){var i=it();Wt(n,t,r,i),rx(n,e,r)}}function e2(t,e,n){var r=rr(t),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(tx(t))nx(e,i);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,l=s(o,n);if(i.hasEagerState=!0,i.eagerState=l,qt(l,o)){var u=e.interleaved;u===null?(i.next=i,nf(e)):(i.next=u.next,u.next=i),e.interleaved=i;return}}catch{}finally{}n=Ly(t,e,i,r),n!==null&&(i=it(),Wt(n,t,r,i),rx(n,e,r))}}function tx(t){var e=t.alternate;return t===_e||e!==null&&e===_e}function nx(t,e){Ks=Sl=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function rx(t,e,n){if(n&4194240){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,$h(t,n)}}var bl={readContext:jt,useCallback:Ke,useContext:Ke,useEffect:Ke,useImperativeHandle:Ke,useInsertionEffect:Ke,useLayoutEffect:Ke,useMemo:Ke,useReducer:Ke,useRef:Ke,useState:Ke,useDebugValue:Ke,useDeferredValue:Ke,useTransition:Ke,useMutableSource:Ke,useSyncExternalStore:Ke,useId:Ke,unstable_isNewReconciler:!1},t2={readContext:jt,useCallback:function(t,e){return Zt().memoizedState=[t,e===void 0?null:e],t},useContext:jt,useEffect:fg,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,Qa(4194308,4,Yy.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Qa(4194308,4,t,e)},useInsertionEffect:function(t,e){return Qa(4,2,t,e)},useMemo:function(t,e){var n=Zt();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var r=Zt();return e=n!==void 0?n(e):e,r.memoizedState=r.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},r.queue=t,t=t.dispatch=ZE.bind(null,_e,t),[r.memoizedState,t]},useRef:function(t){var e=Zt();return t={current:t},e.memoizedState=t},useState:hg,useDebugValue:hf,useDeferredValue:function(t){return Zt().memoizedState=t},useTransition:function(){var t=hg(!1),e=t[0];return t=JE.bind(null,t[1]),Zt().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var r=_e,i=Zt();if(ve){if(n===void 0)throw Error(D(407));n=n()}else{if(n=e(),Fe===null)throw Error(D(349));Mr&30||Vy(r,e,n)}i.memoizedState=n;var s={value:n,getSnapshot:e};return i.queue=s,fg(By.bind(null,r,s,t),[t]),r.flags|=2048,So(9,$y.bind(null,r,s,n,e),void 0,null),n},useId:function(){var t=Zt(),e=Fe.identifierPrefix;if(ve){var n=vn,r=gn;n=(r&~(1<<32-Ht(r)-1)).toString(32)+n,e=":"+e+"R"+n,n=ko++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=XE++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},n2={readContext:jt,useCallback:Xy,useContext:jt,useEffect:df,useImperativeHandle:Qy,useInsertionEffect:qy,useLayoutEffect:Ky,useMemo:Jy,useReducer:zu,useRef:Gy,useState:function(){return zu(Eo)},useDebugValue:hf,useDeferredValue:function(t){var e=Ot();return Zy(e,Ae.memoizedState,t)},useTransition:function(){var t=zu(Eo)[0],e=Ot().memoizedState;return[t,e]},useMutableSource:Uy,useSyncExternalStore:zy,useId:ex,unstable_isNewReconciler:!1},r2={readContext:jt,useCallback:Xy,useContext:jt,useEffect:df,useImperativeHandle:Qy,useInsertionEffect:qy,useLayoutEffect:Ky,useMemo:Jy,useReducer:Vu,useRef:Gy,useState:function(){return Vu(Eo)},useDebugValue:hf,useDeferredValue:function(t){var e=Ot();return Ae===null?e.memoizedState=t:Zy(e,Ae.memoizedState,t)},useTransition:function(){var t=Vu(Eo)[0],e=Ot().memoizedState;return[t,e]},useMutableSource:Uy,useSyncExternalStore:zy,useId:ex,unstable_isNewReconciler:!1};function Ft(t,e){if(t&&t.defaultProps){e=we({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function Bd(t,e,n,r){e=t.memoizedState,n=n(r,e),n=n==null?e:we({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var hc={isMounted:function(t){return(t=t._reactInternals)?Qr(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var r=it(),i=rr(t),s=kn(r,i);s.payload=e,n!=null&&(s.callback=n),e=tr(t,s,i),e!==null&&(Wt(e,t,i,r),Ka(e,t,i))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var r=it(),i=rr(t),s=kn(r,i);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=tr(t,s,i),e!==null&&(Wt(e,t,i,r),Ka(e,t,i))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=it(),r=rr(t),i=kn(n,r);i.tag=2,e!=null&&(i.callback=e),e=tr(t,i,r),e!==null&&(Wt(e,t,r,n),Ka(e,t,r))}};function pg(t,e,n,r,i,s,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(r,s,o):e.prototype&&e.prototype.isPureReactComponent?!go(n,r)||!go(i,s):!0}function ix(t,e,n){var r=!1,i=ur,s=e.contextType;return typeof s=="object"&&s!==null?s=jt(s):(i=mt(e)?Dr:Xe.current,r=e.contextTypes,s=(r=r!=null)?Ui(t,i):ur),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=hc,t.stateNode=e,e._reactInternals=t,r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=i,t.__reactInternalMemoizedMaskedChildContext=s),e}function mg(t,e,n,r){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,r),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,r),e.state!==t&&hc.enqueueReplaceState(e,e.state,null)}function Hd(t,e,n,r){var i=t.stateNode;i.props=n,i.state=t.memoizedState,i.refs={},rf(t);var s=e.contextType;typeof s=="object"&&s!==null?i.context=jt(s):(s=mt(e)?Dr:Xe.current,i.context=Ui(t,s)),i.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(Bd(t,e,s,n),i.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(e=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),e!==i.state&&hc.enqueueReplaceState(i,i.state,null),kl(t,n,i,r),i.state=t.memoizedState),typeof i.componentDidMount=="function"&&(t.flags|=4194308)}function Bi(t,e){try{var n="",r=e;do n+=Pk(r),r=r.return;while(r);var i=n}catch(s){i=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:i,digest:null}}function $u(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function Wd(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var i2=typeof WeakMap=="function"?WeakMap:Map;function sx(t,e,n){n=kn(-1,n),n.tag=3,n.payload={element:null};var r=e.value;return n.callback=function(){Cl||(Cl=!0,th=r),Wd(t,e)},n}function ox(t,e,n){n=kn(-1,n),n.tag=3;var r=t.type.getDerivedStateFromError;if(typeof r=="function"){var i=e.value;n.payload=function(){return r(i)},n.callback=function(){Wd(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){Wd(t,e),typeof r!="function"&&(nr===null?nr=new Set([this]):nr.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function gg(t,e,n){var r=t.pingCache;if(r===null){r=t.pingCache=new i2;var i=new Set;r.set(e,i)}else i=r.get(e),i===void 0&&(i=new Set,r.set(e,i));i.has(n)||(i.add(n),t=y2.bind(null,t,e,n),e.then(t,t))}function vg(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function yg(t,e,n,r,i){return t.mode&1?(t.flags|=65536,t.lanes=i,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=kn(-1,1),e.tag=2,tr(n,e,1))),n.lanes|=1),t)}var s2=An.ReactCurrentOwner,ht=!1;function tt(t,e,n,r){e.child=t===null?Dy(e,null,n,r):Vi(e,t.child,n,r)}function xg(t,e,n,r,i){n=n.render;var s=e.ref;return Pi(e,i),r=cf(t,e,n,r,s,i),n=uf(),t!==null&&!ht?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~i,In(t,e,i)):(ve&&n&&Qh(e),e.flags|=1,tt(t,e,r,i),e.child)}function _g(t,e,n,r,i){if(t===null){var s=n.type;return typeof s=="function"&&!_f(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,ax(t,e,s,r,i)):(t=el(n.type,null,r,e,e.mode,i),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&i)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:go,n(o,r)&&t.ref===e.ref)return In(t,e,i)}return e.flags|=1,t=ir(s,r),t.ref=e.ref,t.return=e,e.child=t}function ax(t,e,n,r,i){if(t!==null){var s=t.memoizedProps;if(go(s,r)&&t.ref===e.ref)if(ht=!1,e.pendingProps=r=s,(t.lanes&i)!==0)t.flags&131072&&(ht=!0);else return e.lanes=t.lanes,In(t,e,i)}return Gd(t,e,n,r,i)}function lx(t,e,n){var r=e.pendingProps,i=r.children,s=t!==null?t.memoizedState:null;if(r.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},he(Si,xt),xt|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,he(Si,xt),xt|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=s!==null?s.baseLanes:n,he(Si,xt),xt|=r}else s!==null?(r=s.baseLanes|n,e.memoizedState=null):r=n,he(Si,xt),xt|=r;return tt(t,e,i,n),e.child}function cx(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function Gd(t,e,n,r,i){var s=mt(n)?Dr:Xe.current;return s=Ui(e,s),Pi(e,i),n=cf(t,e,n,r,s,i),r=uf(),t!==null&&!ht?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~i,In(t,e,i)):(ve&&r&&Qh(e),e.flags|=1,tt(t,e,n,i),e.child)}function wg(t,e,n,r,i){if(mt(n)){var s=!0;vl(e)}else s=!1;if(Pi(e,i),e.stateNode===null)Xa(t,e),ix(e,n,r),Hd(e,n,r,i),r=!0;else if(t===null){var o=e.stateNode,l=e.memoizedProps;o.props=l;var u=o.context,h=n.contextType;typeof h=="object"&&h!==null?h=jt(h):(h=mt(n)?Dr:Xe.current,h=Ui(e,h));var m=n.getDerivedStateFromProps,p=typeof m=="function"||typeof o.getSnapshotBeforeUpdate=="function";p||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==r||u!==h)&&mg(e,o,r,h),zn=!1;var g=e.memoizedState;o.state=g,kl(e,r,o,i),u=e.memoizedState,l!==r||g!==u||pt.current||zn?(typeof m=="function"&&(Bd(e,n,m,r),u=e.memoizedState),(l=zn||pg(e,n,l,r,g,u,h))?(p||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=r,e.memoizedState=u),o.props=r,o.state=u,o.context=h,r=l):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),r=!1)}else{o=e.stateNode,My(t,e),l=e.memoizedProps,h=e.type===e.elementType?l:Ft(e.type,l),o.props=h,p=e.pendingProps,g=o.context,u=n.contextType,typeof u=="object"&&u!==null?u=jt(u):(u=mt(n)?Dr:Xe.current,u=Ui(e,u));var E=n.getDerivedStateFromProps;(m=typeof E=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==p||g!==u)&&mg(e,o,r,u),zn=!1,g=e.memoizedState,o.state=g,kl(e,r,o,i);var I=e.memoizedState;l!==p||g!==I||pt.current||zn?(typeof E=="function"&&(Bd(e,n,E,r),I=e.memoizedState),(h=zn||pg(e,n,h,r,g,I,u)||!1)?(m||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,I,u),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,I,u)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&g===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&g===t.memoizedState||(e.flags|=1024),e.memoizedProps=r,e.memoizedState=I),o.props=r,o.state=I,o.context=u,r=h):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&g===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&g===t.memoizedState||(e.flags|=1024),r=!1)}return qd(t,e,n,r,s,i)}function qd(t,e,n,r,i,s){cx(t,e);var o=(e.flags&128)!==0;if(!r&&!o)return i&&og(e,n,!1),In(t,e,s);r=e.stateNode,s2.current=e;var l=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return e.flags|=1,t!==null&&o?(e.child=Vi(e,t.child,null,s),e.child=Vi(e,null,l,s)):tt(t,e,l,s),e.memoizedState=r.state,i&&og(e,n,!0),e.child}function ux(t){var e=t.stateNode;e.pendingContext?sg(t,e.pendingContext,e.pendingContext!==e.context):e.context&&sg(t,e.context,!1),sf(t,e.containerInfo)}function kg(t,e,n,r,i){return zi(),Jh(i),e.flags|=256,tt(t,e,n,r),e.child}var Kd={dehydrated:null,treeContext:null,retryLane:0};function Yd(t){return{baseLanes:t,cachePool:null,transitions:null}}function dx(t,e,n){var r=e.pendingProps,i=ye.current,s=!1,o=(e.flags&128)!==0,l;if((l=o)||(l=t!==null&&t.memoizedState===null?!1:(i&2)!==0),l?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(i|=1),he(ye,i&1),t===null)return Vd(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=r.children,t=r.fallback,s?(r=e.mode,s=e.child,o={mode:"hidden",children:o},!(r&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=mc(o,r,0,null),t=Or(t,r,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=Yd(n),e.memoizedState=Kd,t):ff(e,o));if(i=t.memoizedState,i!==null&&(l=i.dehydrated,l!==null))return o2(t,e,o,r,l,i,n);if(s){s=r.fallback,o=e.mode,i=t.child,l=i.sibling;var u={mode:"hidden",children:r.children};return!(o&1)&&e.child!==i?(r=e.child,r.childLanes=0,r.pendingProps=u,e.deletions=null):(r=ir(i,u),r.subtreeFlags=i.subtreeFlags&14680064),l!==null?s=ir(l,s):(s=Or(s,o,n,null),s.flags|=2),s.return=e,r.return=e,r.sibling=s,e.child=r,r=s,s=e.child,o=t.child.memoizedState,o=o===null?Yd(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=t.childLanes&~n,e.memoizedState=Kd,r}return s=t.child,t=s.sibling,r=ir(s,{mode:"visible",children:r.children}),!(e.mode&1)&&(r.lanes=n),r.return=e,r.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=r,e.memoizedState=null,r}function ff(t,e){return e=mc({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function Oa(t,e,n,r){return r!==null&&Jh(r),Vi(e,t.child,null,n),t=ff(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function o2(t,e,n,r,i,s,o){if(n)return e.flags&256?(e.flags&=-257,r=$u(Error(D(422))),Oa(t,e,o,r)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=r.fallback,i=e.mode,r=mc({mode:"visible",children:r.children},i,0,null),s=Or(s,i,o,null),s.flags|=2,r.return=e,s.return=e,r.sibling=s,e.child=r,e.mode&1&&Vi(e,t.child,null,o),e.child.memoizedState=Yd(o),e.memoizedState=Kd,s);if(!(e.mode&1))return Oa(t,e,o,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var l=r.dgst;return r=l,s=Error(D(419)),r=$u(s,r,void 0),Oa(t,e,o,r)}if(l=(o&t.childLanes)!==0,ht||l){if(r=Fe,r!==null){switch(o&-o){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|o)?0:i,i!==0&&i!==s.retryLane&&(s.retryLane=i,Cn(t,i),Wt(r,t,i,-1))}return xf(),r=$u(Error(D(421))),Oa(t,e,o,r)}return i.data==="$?"?(e.flags|=128,e.child=t.child,e=x2.bind(null,t),i._reactRetry=e,null):(t=s.treeContext,_t=er(i.nextSibling),wt=e,ve=!0,zt=null,t!==null&&(It[Tt++]=gn,It[Tt++]=vn,It[Tt++]=Lr,gn=t.id,vn=t.overflow,Lr=e),e=ff(e,r.children),e.flags|=4096,e)}function Eg(t,e,n){t.lanes|=e;var r=t.alternate;r!==null&&(r.lanes|=e),$d(t.return,e,n)}function Bu(t,e,n,r,i){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=r,s.tail=n,s.tailMode=i)}function hx(t,e,n){var r=e.pendingProps,i=r.revealOrder,s=r.tail;if(tt(t,e,r.children,n),r=ye.current,r&2)r=r&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Eg(t,n,e);else if(t.tag===19)Eg(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}r&=1}if(he(ye,r),!(e.mode&1))e.memoizedState=null;else switch(i){case"forwards":for(n=e.child,i=null;n!==null;)t=n.alternate,t!==null&&El(t)===null&&(i=n),n=n.sibling;n=i,n===null?(i=e.child,e.child=null):(i=n.sibling,n.sibling=null),Bu(e,!1,i,n,s);break;case"backwards":for(n=null,i=e.child,e.child=null;i!==null;){if(t=i.alternate,t!==null&&El(t)===null){e.child=i;break}t=i.sibling,i.sibling=n,n=i,i=t}Bu(e,!0,n,null,s);break;case"together":Bu(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function Xa(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function In(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Fr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(D(153));if(e.child!==null){for(t=e.child,n=ir(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=ir(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function a2(t,e,n){switch(e.tag){case 3:ux(e),zi();break;case 5:Fy(e);break;case 1:mt(e.type)&&vl(e);break;case 4:sf(e,e.stateNode.containerInfo);break;case 10:var r=e.type._context,i=e.memoizedProps.value;he(_l,r._currentValue),r._currentValue=i;break;case 13:if(r=e.memoizedState,r!==null)return r.dehydrated!==null?(he(ye,ye.current&1),e.flags|=128,null):n&e.child.childLanes?dx(t,e,n):(he(ye,ye.current&1),t=In(t,e,n),t!==null?t.sibling:null);he(ye,ye.current&1);break;case 19:if(r=(n&e.childLanes)!==0,t.flags&128){if(r)return hx(t,e,n);e.flags|=128}if(i=e.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),he(ye,ye.current),r)break;return null;case 22:case 23:return e.lanes=0,lx(t,e,n)}return In(t,e,n)}var fx,Qd,px,mx;fx=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Qd=function(){};px=function(t,e,n,r){var i=t.memoizedProps;if(i!==r){t=e.stateNode,Rr(rn.current);var s=null;switch(n){case"input":i=yd(t,i),r=yd(t,r),s=[];break;case"select":i=we({},i,{value:void 0}),r=we({},r,{value:void 0}),s=[];break;case"textarea":i=wd(t,i),r=wd(t,r),s=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(t.onclick=ml)}Ed(n,r);var o;n=null;for(h in i)if(!r.hasOwnProperty(h)&&i.hasOwnProperty(h)&&i[h]!=null)if(h==="style"){var l=i[h];for(o in l)l.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else h!=="dangerouslySetInnerHTML"&&h!=="children"&&h!=="suppressContentEditableWarning"&&h!=="suppressHydrationWarning"&&h!=="autoFocus"&&(lo.hasOwnProperty(h)?s||(s=[]):(s=s||[]).push(h,null));for(h in r){var u=r[h];if(l=i!=null?i[h]:void 0,r.hasOwnProperty(h)&&u!==l&&(u!=null||l!=null))if(h==="style")if(l){for(o in l)!l.hasOwnProperty(o)||u&&u.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in u)u.hasOwnProperty(o)&&l[o]!==u[o]&&(n||(n={}),n[o]=u[o])}else n||(s||(s=[]),s.push(h,n)),n=u;else h==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,l=l?l.__html:void 0,u!=null&&l!==u&&(s=s||[]).push(h,u)):h==="children"?typeof u!="string"&&typeof u!="number"||(s=s||[]).push(h,""+u):h!=="suppressContentEditableWarning"&&h!=="suppressHydrationWarning"&&(lo.hasOwnProperty(h)?(u!=null&&h==="onScroll"&&me("scroll",t),s||l===u||(s=[])):(s=s||[]).push(h,u))}n&&(s=s||[]).push("style",n);var h=s;(e.updateQueue=h)&&(e.flags|=4)}};mx=function(t,e,n,r){n!==r&&(e.flags|=4)};function Rs(t,e){if(!ve)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:r.sibling=null}}function Ye(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,r=0;if(e)for(var i=t.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=t,i=i.sibling;else for(i=t.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=t,i=i.sibling;return t.subtreeFlags|=r,t.childLanes=n,e}function l2(t,e,n){var r=e.pendingProps;switch(Xh(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ye(e),null;case 1:return mt(e.type)&&gl(),Ye(e),null;case 3:return r=e.stateNode,$i(),ge(pt),ge(Xe),af(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(t===null||t.child===null)&&(Aa(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,zt!==null&&(ih(zt),zt=null))),Qd(t,e),Ye(e),null;case 5:of(e);var i=Rr(wo.current);if(n=e.type,t!==null&&e.stateNode!=null)px(t,e,n,r,i),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!r){if(e.stateNode===null)throw Error(D(166));return Ye(e),null}if(t=Rr(rn.current),Aa(e)){r=e.stateNode,n=e.type;var s=e.memoizedProps;switch(r[en]=e,r[xo]=s,t=(e.mode&1)!==0,n){case"dialog":me("cancel",r),me("close",r);break;case"iframe":case"object":case"embed":me("load",r);break;case"video":case"audio":for(i=0;i<zs.length;i++)me(zs[i],r);break;case"source":me("error",r);break;case"img":case"image":case"link":me("error",r),me("load",r);break;case"details":me("toggle",r);break;case"input":Am(r,s),me("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!s.multiple},me("invalid",r);break;case"textarea":Om(r,s),me("invalid",r)}Ed(n,s),i=null;for(var o in s)if(s.hasOwnProperty(o)){var l=s[o];o==="children"?typeof l=="string"?r.textContent!==l&&(s.suppressHydrationWarning!==!0&&Pa(r.textContent,l,t),i=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(s.suppressHydrationWarning!==!0&&Pa(r.textContent,l,t),i=["children",""+l]):lo.hasOwnProperty(o)&&l!=null&&o==="onScroll"&&me("scroll",r)}switch(n){case"input":Ea(r),jm(r,s,!0);break;case"textarea":Ea(r),Dm(r);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(r.onclick=ml)}r=i,e.updateQueue=r,r!==null&&(e.flags|=4)}else{o=i.nodeType===9?i:i.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=Bv(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof r.is=="string"?t=o.createElement(n,{is:r.is}):(t=o.createElement(n),n==="select"&&(o=t,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):t=o.createElementNS(t,n),t[en]=e,t[xo]=r,fx(t,e,!1,!1),e.stateNode=t;e:{switch(o=Sd(n,r),n){case"dialog":me("cancel",t),me("close",t),i=r;break;case"iframe":case"object":case"embed":me("load",t),i=r;break;case"video":case"audio":for(i=0;i<zs.length;i++)me(zs[i],t);i=r;break;case"source":me("error",t),i=r;break;case"img":case"image":case"link":me("error",t),me("load",t),i=r;break;case"details":me("toggle",t),i=r;break;case"input":Am(t,r),i=yd(t,r),me("invalid",t);break;case"option":i=r;break;case"select":t._wrapperState={wasMultiple:!!r.multiple},i=we({},r,{value:void 0}),me("invalid",t);break;case"textarea":Om(t,r),i=wd(t,r),me("invalid",t);break;default:i=r}Ed(n,i),l=i;for(s in l)if(l.hasOwnProperty(s)){var u=l[s];s==="style"?Gv(t,u):s==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&Hv(t,u)):s==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&co(t,u):typeof u=="number"&&co(t,""+u):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(lo.hasOwnProperty(s)?u!=null&&s==="onScroll"&&me("scroll",t):u!=null&&Lh(t,s,u,o))}switch(n){case"input":Ea(t),jm(t,r,!1);break;case"textarea":Ea(t),Dm(t);break;case"option":r.value!=null&&t.setAttribute("value",""+cr(r.value));break;case"select":t.multiple=!!r.multiple,s=r.value,s!=null?Ci(t,!!r.multiple,s,!1):r.defaultValue!=null&&Ci(t,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(t.onclick=ml)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Ye(e),null;case 6:if(t&&e.stateNode!=null)mx(t,e,t.memoizedProps,r);else{if(typeof r!="string"&&e.stateNode===null)throw Error(D(166));if(n=Rr(wo.current),Rr(rn.current),Aa(e)){if(r=e.stateNode,n=e.memoizedProps,r[en]=e,(s=r.nodeValue!==n)&&(t=wt,t!==null))switch(t.tag){case 3:Pa(r.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&Pa(r.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[en]=e,e.stateNode=r}return Ye(e),null;case 13:if(ge(ye),r=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(ve&&_t!==null&&e.mode&1&&!(e.flags&128))jy(),zi(),e.flags|=98560,s=!1;else if(s=Aa(e),r!==null&&r.dehydrated!==null){if(t===null){if(!s)throw Error(D(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(D(317));s[en]=e}else zi(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Ye(e),s=!1}else zt!==null&&(ih(zt),zt=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(r=r!==null,r!==(t!==null&&t.memoizedState!==null)&&r&&(e.child.flags|=8192,e.mode&1&&(t===null||ye.current&1?Oe===0&&(Oe=3):xf())),e.updateQueue!==null&&(e.flags|=4),Ye(e),null);case 4:return $i(),Qd(t,e),t===null&&vo(e.stateNode.containerInfo),Ye(e),null;case 10:return tf(e.type._context),Ye(e),null;case 17:return mt(e.type)&&gl(),Ye(e),null;case 19:if(ge(ye),s=e.memoizedState,s===null)return Ye(e),null;if(r=(e.flags&128)!==0,o=s.rendering,o===null)if(r)Rs(s,!1);else{if(Oe!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=El(t),o!==null){for(e.flags|=128,Rs(s,!1),r=o.updateQueue,r!==null&&(e.updateQueue=r,e.flags|=4),e.subtreeFlags=0,r=n,n=e.child;n!==null;)s=n,t=r,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,t=o.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return he(ye,ye.current&1|2),e.child}t=t.sibling}s.tail!==null&&Ce()>Hi&&(e.flags|=128,r=!0,Rs(s,!1),e.lanes=4194304)}else{if(!r)if(t=El(o),t!==null){if(e.flags|=128,r=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),Rs(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!ve)return Ye(e),null}else 2*Ce()-s.renderingStartTime>Hi&&n!==1073741824&&(e.flags|=128,r=!0,Rs(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(n=s.last,n!==null?n.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Ce(),e.sibling=null,n=ye.current,he(ye,r?n&1|2:n&1),e):(Ye(e),null);case 22:case 23:return yf(),r=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==r&&(e.flags|=8192),r&&e.mode&1?xt&1073741824&&(Ye(e),e.subtreeFlags&6&&(e.flags|=8192)):Ye(e),null;case 24:return null;case 25:return null}throw Error(D(156,e.tag))}function c2(t,e){switch(Xh(e),e.tag){case 1:return mt(e.type)&&gl(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return $i(),ge(pt),ge(Xe),af(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return of(e),null;case 13:if(ge(ye),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(D(340));zi()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return ge(ye),null;case 4:return $i(),null;case 10:return tf(e.type._context),null;case 22:case 23:return yf(),null;case 24:return null;default:return null}}var Da=!1,Qe=!1,u2=typeof WeakSet=="function"?WeakSet:Set,V=null;function Ei(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){ke(t,e,r)}else n.current=null}function Xd(t,e,n){try{n()}catch(r){ke(t,e,r)}}var Sg=!1;function d2(t,e){if(Od=hl,t=_y(),Yh(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,s=r.focusNode;r=r.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,l=-1,u=-1,h=0,m=0,p=t,g=null;t:for(;;){for(var E;p!==n||i!==0&&p.nodeType!==3||(l=o+i),p!==s||r!==0&&p.nodeType!==3||(u=o+r),p.nodeType===3&&(o+=p.nodeValue.length),(E=p.firstChild)!==null;)g=p,p=E;for(;;){if(p===t)break t;if(g===n&&++h===i&&(l=o),g===s&&++m===r&&(u=o),(E=p.nextSibling)!==null)break;p=g,g=p.parentNode}p=E}n=l===-1||u===-1?null:{start:l,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(Dd={focusedElem:t,selectionRange:n},hl=!1,V=e;V!==null;)if(e=V,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,V=t;else for(;V!==null;){e=V;try{var I=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(I!==null){var P=I.memoizedProps,L=I.memoizedState,N=e.stateNode,w=N.getSnapshotBeforeUpdate(e.elementType===e.type?P:Ft(e.type,P),L);N.__reactInternalSnapshotBeforeUpdate=w}break;case 3:var b=e.stateNode.containerInfo;b.nodeType===1?b.textContent="":b.nodeType===9&&b.documentElement&&b.removeChild(b.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(D(163))}}catch(j){ke(e,e.return,j)}if(t=e.sibling,t!==null){t.return=e.return,V=t;break}V=e.return}return I=Sg,Sg=!1,I}function Ys(t,e,n){var r=e.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&t)===t){var s=i.destroy;i.destroy=void 0,s!==void 0&&Xd(e,n,s)}i=i.next}while(i!==r)}}function fc(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var r=n.create;n.destroy=r()}n=n.next}while(n!==e)}}function Jd(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function gx(t){var e=t.alternate;e!==null&&(t.alternate=null,gx(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[en],delete e[xo],delete e[Fd],delete e[qE],delete e[KE])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function vx(t){return t.tag===5||t.tag===3||t.tag===4}function bg(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||vx(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Zd(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=ml));else if(r!==4&&(t=t.child,t!==null))for(Zd(t,e,n),t=t.sibling;t!==null;)Zd(t,e,n),t=t.sibling}function eh(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(r!==4&&(t=t.child,t!==null))for(eh(t,e,n),t=t.sibling;t!==null;)eh(t,e,n),t=t.sibling}var ze=null,Ut=!1;function Mn(t,e,n){for(n=n.child;n!==null;)yx(t,e,n),n=n.sibling}function yx(t,e,n){if(nn&&typeof nn.onCommitFiberUnmount=="function")try{nn.onCommitFiberUnmount(sc,n)}catch{}switch(n.tag){case 5:Qe||Ei(n,e);case 6:var r=ze,i=Ut;ze=null,Mn(t,e,n),ze=r,Ut=i,ze!==null&&(Ut?(t=ze,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):ze.removeChild(n.stateNode));break;case 18:ze!==null&&(Ut?(t=ze,n=n.stateNode,t.nodeType===8?Lu(t.parentNode,n):t.nodeType===1&&Lu(t,n),po(t)):Lu(ze,n.stateNode));break;case 4:r=ze,i=Ut,ze=n.stateNode.containerInfo,Ut=!0,Mn(t,e,n),ze=r,Ut=i;break;case 0:case 11:case 14:case 15:if(!Qe&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var s=i,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&Xd(n,e,o),i=i.next}while(i!==r)}Mn(t,e,n);break;case 1:if(!Qe&&(Ei(n,e),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){ke(n,e,l)}Mn(t,e,n);break;case 21:Mn(t,e,n);break;case 22:n.mode&1?(Qe=(r=Qe)||n.memoizedState!==null,Mn(t,e,n),Qe=r):Mn(t,e,n);break;default:Mn(t,e,n)}}function Ng(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new u2),e.forEach(function(r){var i=_2.bind(null,t,r);n.has(r)||(n.add(r),r.then(i,i))})}}function Mt(t,e){var n=e.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var s=t,o=e,l=o;e:for(;l!==null;){switch(l.tag){case 5:ze=l.stateNode,Ut=!1;break e;case 3:ze=l.stateNode.containerInfo,Ut=!0;break e;case 4:ze=l.stateNode.containerInfo,Ut=!0;break e}l=l.return}if(ze===null)throw Error(D(160));yx(s,o,i),ze=null,Ut=!1;var u=i.alternate;u!==null&&(u.return=null),i.return=null}catch(h){ke(i,e,h)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)xx(e,t),e=e.sibling}function xx(t,e){var n=t.alternate,r=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Mt(e,t),Jt(t),r&4){try{Ys(3,t,t.return),fc(3,t)}catch(P){ke(t,t.return,P)}try{Ys(5,t,t.return)}catch(P){ke(t,t.return,P)}}break;case 1:Mt(e,t),Jt(t),r&512&&n!==null&&Ei(n,n.return);break;case 5:if(Mt(e,t),Jt(t),r&512&&n!==null&&Ei(n,n.return),t.flags&32){var i=t.stateNode;try{co(i,"")}catch(P){ke(t,t.return,P)}}if(r&4&&(i=t.stateNode,i!=null)){var s=t.memoizedProps,o=n!==null?n.memoizedProps:s,l=t.type,u=t.updateQueue;if(t.updateQueue=null,u!==null)try{l==="input"&&s.type==="radio"&&s.name!=null&&Vv(i,s),Sd(l,o);var h=Sd(l,s);for(o=0;o<u.length;o+=2){var m=u[o],p=u[o+1];m==="style"?Gv(i,p):m==="dangerouslySetInnerHTML"?Hv(i,p):m==="children"?co(i,p):Lh(i,m,p,h)}switch(l){case"input":xd(i,s);break;case"textarea":$v(i,s);break;case"select":var g=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!s.multiple;var E=s.value;E!=null?Ci(i,!!s.multiple,E,!1):g!==!!s.multiple&&(s.defaultValue!=null?Ci(i,!!s.multiple,s.defaultValue,!0):Ci(i,!!s.multiple,s.multiple?[]:"",!1))}i[xo]=s}catch(P){ke(t,t.return,P)}}break;case 6:if(Mt(e,t),Jt(t),r&4){if(t.stateNode===null)throw Error(D(162));i=t.stateNode,s=t.memoizedProps;try{i.nodeValue=s}catch(P){ke(t,t.return,P)}}break;case 3:if(Mt(e,t),Jt(t),r&4&&n!==null&&n.memoizedState.isDehydrated)try{po(e.containerInfo)}catch(P){ke(t,t.return,P)}break;case 4:Mt(e,t),Jt(t);break;case 13:Mt(e,t),Jt(t),i=t.child,i.flags&8192&&(s=i.memoizedState!==null,i.stateNode.isHidden=s,!s||i.alternate!==null&&i.alternate.memoizedState!==null||(gf=Ce())),r&4&&Ng(t);break;case 22:if(m=n!==null&&n.memoizedState!==null,t.mode&1?(Qe=(h=Qe)||m,Mt(e,t),Qe=h):Mt(e,t),Jt(t),r&8192){if(h=t.memoizedState!==null,(t.stateNode.isHidden=h)&&!m&&t.mode&1)for(V=t,m=t.child;m!==null;){for(p=V=m;V!==null;){switch(g=V,E=g.child,g.tag){case 0:case 11:case 14:case 15:Ys(4,g,g.return);break;case 1:Ei(g,g.return);var I=g.stateNode;if(typeof I.componentWillUnmount=="function"){r=g,n=g.return;try{e=r,I.props=e.memoizedProps,I.state=e.memoizedState,I.componentWillUnmount()}catch(P){ke(r,n,P)}}break;case 5:Ei(g,g.return);break;case 22:if(g.memoizedState!==null){Ig(p);continue}}E!==null?(E.return=g,V=E):Ig(p)}m=m.sibling}e:for(m=null,p=t;;){if(p.tag===5){if(m===null){m=p;try{i=p.stateNode,h?(s=i.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(l=p.stateNode,u=p.memoizedProps.style,o=u!=null&&u.hasOwnProperty("display")?u.display:null,l.style.display=Wv("display",o))}catch(P){ke(t,t.return,P)}}}else if(p.tag===6){if(m===null)try{p.stateNode.nodeValue=h?"":p.memoizedProps}catch(P){ke(t,t.return,P)}}else if((p.tag!==22&&p.tag!==23||p.memoizedState===null||p===t)&&p.child!==null){p.child.return=p,p=p.child;continue}if(p===t)break e;for(;p.sibling===null;){if(p.return===null||p.return===t)break e;m===p&&(m=null),p=p.return}m===p&&(m=null),p.sibling.return=p.return,p=p.sibling}}break;case 19:Mt(e,t),Jt(t),r&4&&Ng(t);break;case 21:break;default:Mt(e,t),Jt(t)}}function Jt(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(vx(n)){var r=n;break e}n=n.return}throw Error(D(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(co(i,""),r.flags&=-33);var s=bg(t);eh(t,s,i);break;case 3:case 4:var o=r.stateNode.containerInfo,l=bg(t);Zd(t,l,o);break;default:throw Error(D(161))}}catch(u){ke(t,t.return,u)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function h2(t,e,n){V=t,_x(t)}function _x(t,e,n){for(var r=(t.mode&1)!==0;V!==null;){var i=V,s=i.child;if(i.tag===22&&r){var o=i.memoizedState!==null||Da;if(!o){var l=i.alternate,u=l!==null&&l.memoizedState!==null||Qe;l=Da;var h=Qe;if(Da=o,(Qe=u)&&!h)for(V=i;V!==null;)o=V,u=o.child,o.tag===22&&o.memoizedState!==null?Tg(i):u!==null?(u.return=o,V=u):Tg(i);for(;s!==null;)V=s,_x(s),s=s.sibling;V=i,Da=l,Qe=h}Cg(t)}else i.subtreeFlags&8772&&s!==null?(s.return=i,V=s):Cg(t)}}function Cg(t){for(;V!==null;){var e=V;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:Qe||fc(5,e);break;case 1:var r=e.stateNode;if(e.flags&4&&!Qe)if(n===null)r.componentDidMount();else{var i=e.elementType===e.type?n.memoizedProps:Ft(e.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&dg(e,s,r);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}dg(e,o,n)}break;case 5:var l=e.stateNode;if(n===null&&e.flags&4){n=l;var u=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var h=e.alternate;if(h!==null){var m=h.memoizedState;if(m!==null){var p=m.dehydrated;p!==null&&po(p)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(D(163))}Qe||e.flags&512&&Jd(e)}catch(g){ke(e,e.return,g)}}if(e===t){V=null;break}if(n=e.sibling,n!==null){n.return=e.return,V=n;break}V=e.return}}function Ig(t){for(;V!==null;){var e=V;if(e===t){V=null;break}var n=e.sibling;if(n!==null){n.return=e.return,V=n;break}V=e.return}}function Tg(t){for(;V!==null;){var e=V;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{fc(4,e)}catch(u){ke(e,n,u)}break;case 1:var r=e.stateNode;if(typeof r.componentDidMount=="function"){var i=e.return;try{r.componentDidMount()}catch(u){ke(e,i,u)}}var s=e.return;try{Jd(e)}catch(u){ke(e,s,u)}break;case 5:var o=e.return;try{Jd(e)}catch(u){ke(e,o,u)}}}catch(u){ke(e,e.return,u)}if(e===t){V=null;break}var l=e.sibling;if(l!==null){l.return=e.return,V=l;break}V=e.return}}var f2=Math.ceil,Nl=An.ReactCurrentDispatcher,pf=An.ReactCurrentOwner,At=An.ReactCurrentBatchConfig,te=0,Fe=null,Te=null,$e=0,xt=0,Si=vr(0),Oe=0,bo=null,Fr=0,pc=0,mf=0,Qs=null,ct=null,gf=0,Hi=1/0,pn=null,Cl=!1,th=null,nr=null,La=!1,Yn=null,Il=0,Xs=0,nh=null,Ja=-1,Za=0;function it(){return te&6?Ce():Ja!==-1?Ja:Ja=Ce()}function rr(t){return t.mode&1?te&2&&$e!==0?$e&-$e:QE.transition!==null?(Za===0&&(Za=iy()),Za):(t=ae,t!==0||(t=window.event,t=t===void 0?16:dy(t.type)),t):1}function Wt(t,e,n,r){if(50<Xs)throw Xs=0,nh=null,Error(D(185));Vo(t,n,r),(!(te&2)||t!==Fe)&&(t===Fe&&(!(te&2)&&(pc|=n),Oe===4&&Bn(t,$e)),gt(t,r),n===1&&te===0&&!(e.mode&1)&&(Hi=Ce()+500,uc&&yr()))}function gt(t,e){var n=t.callbackNode;Qk(t,e);var r=dl(t,t===Fe?$e:0);if(r===0)n!==null&&Fm(n),t.callbackNode=null,t.callbackPriority=0;else if(e=r&-r,t.callbackPriority!==e){if(n!=null&&Fm(n),e===1)t.tag===0?YE(Rg.bind(null,t)):Ry(Rg.bind(null,t)),WE(function(){!(te&6)&&yr()}),n=null;else{switch(sy(r)){case 1:n=Vh;break;case 4:n=ny;break;case 16:n=ul;break;case 536870912:n=ry;break;default:n=ul}n=Ix(n,wx.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function wx(t,e){if(Ja=-1,Za=0,te&6)throw Error(D(327));var n=t.callbackNode;if(Ai()&&t.callbackNode!==n)return null;var r=dl(t,t===Fe?$e:0);if(r===0)return null;if(r&30||r&t.expiredLanes||e)e=Tl(t,r);else{e=r;var i=te;te|=2;var s=Ex();(Fe!==t||$e!==e)&&(pn=null,Hi=Ce()+500,jr(t,e));do try{g2();break}catch(l){kx(t,l)}while(!0);ef(),Nl.current=s,te=i,Te!==null?e=0:(Fe=null,$e=0,e=Oe)}if(e!==0){if(e===2&&(i=Td(t),i!==0&&(r=i,e=rh(t,i))),e===1)throw n=bo,jr(t,0),Bn(t,r),gt(t,Ce()),n;if(e===6)Bn(t,r);else{if(i=t.current.alternate,!(r&30)&&!p2(i)&&(e=Tl(t,r),e===2&&(s=Td(t),s!==0&&(r=s,e=rh(t,s))),e===1))throw n=bo,jr(t,0),Bn(t,r),gt(t,Ce()),n;switch(t.finishedWork=i,t.finishedLanes=r,e){case 0:case 1:throw Error(D(345));case 2:br(t,ct,pn);break;case 3:if(Bn(t,r),(r&130023424)===r&&(e=gf+500-Ce(),10<e)){if(dl(t,0)!==0)break;if(i=t.suspendedLanes,(i&r)!==r){it(),t.pingedLanes|=t.suspendedLanes&i;break}t.timeoutHandle=Md(br.bind(null,t,ct,pn),e);break}br(t,ct,pn);break;case 4:if(Bn(t,r),(r&4194240)===r)break;for(e=t.eventTimes,i=-1;0<r;){var o=31-Ht(r);s=1<<o,o=e[o],o>i&&(i=o),r&=~s}if(r=i,r=Ce()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*f2(r/1960))-r,10<r){t.timeoutHandle=Md(br.bind(null,t,ct,pn),r);break}br(t,ct,pn);break;case 5:br(t,ct,pn);break;default:throw Error(D(329))}}}return gt(t,Ce()),t.callbackNode===n?wx.bind(null,t):null}function rh(t,e){var n=Qs;return t.current.memoizedState.isDehydrated&&(jr(t,e).flags|=256),t=Tl(t,e),t!==2&&(e=ct,ct=n,e!==null&&ih(e)),t}function ih(t){ct===null?ct=t:ct.push.apply(ct,t)}function p2(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],s=i.getSnapshot;i=i.value;try{if(!qt(s(),i))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Bn(t,e){for(e&=~mf,e&=~pc,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-Ht(e),r=1<<n;t[n]=-1,e&=~r}}function Rg(t){if(te&6)throw Error(D(327));Ai();var e=dl(t,0);if(!(e&1))return gt(t,Ce()),null;var n=Tl(t,e);if(t.tag!==0&&n===2){var r=Td(t);r!==0&&(e=r,n=rh(t,r))}if(n===1)throw n=bo,jr(t,0),Bn(t,e),gt(t,Ce()),n;if(n===6)throw Error(D(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,br(t,ct,pn),gt(t,Ce()),null}function vf(t,e){var n=te;te|=1;try{return t(e)}finally{te=n,te===0&&(Hi=Ce()+500,uc&&yr())}}function Ur(t){Yn!==null&&Yn.tag===0&&!(te&6)&&Ai();var e=te;te|=1;var n=At.transition,r=ae;try{if(At.transition=null,ae=1,t)return t()}finally{ae=r,At.transition=n,te=e,!(te&6)&&yr()}}function yf(){xt=Si.current,ge(Si)}function jr(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,HE(n)),Te!==null)for(n=Te.return;n!==null;){var r=n;switch(Xh(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&gl();break;case 3:$i(),ge(pt),ge(Xe),af();break;case 5:of(r);break;case 4:$i();break;case 13:ge(ye);break;case 19:ge(ye);break;case 10:tf(r.type._context);break;case 22:case 23:yf()}n=n.return}if(Fe=t,Te=t=ir(t.current,null),$e=xt=e,Oe=0,bo=null,mf=pc=Fr=0,ct=Qs=null,Tr!==null){for(e=0;e<Tr.length;e++)if(n=Tr[e],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,s=n.pending;if(s!==null){var o=s.next;s.next=i,r.next=o}n.pending=r}Tr=null}return t}function kx(t,e){do{var n=Te;try{if(ef(),Ya.current=bl,Sl){for(var r=_e.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}Sl=!1}if(Mr=0,Le=Ae=_e=null,Ks=!1,ko=0,pf.current=null,n===null||n.return===null){Oe=1,bo=e,Te=null;break}e:{var s=t,o=n.return,l=n,u=e;if(e=$e,l.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var h=u,m=l,p=m.tag;if(!(m.mode&1)&&(p===0||p===11||p===15)){var g=m.alternate;g?(m.updateQueue=g.updateQueue,m.memoizedState=g.memoizedState,m.lanes=g.lanes):(m.updateQueue=null,m.memoizedState=null)}var E=vg(o);if(E!==null){E.flags&=-257,yg(E,o,l,s,e),E.mode&1&&gg(s,h,e),e=E,u=h;var I=e.updateQueue;if(I===null){var P=new Set;P.add(u),e.updateQueue=P}else I.add(u);break e}else{if(!(e&1)){gg(s,h,e),xf();break e}u=Error(D(426))}}else if(ve&&l.mode&1){var L=vg(o);if(L!==null){!(L.flags&65536)&&(L.flags|=256),yg(L,o,l,s,e),Jh(Bi(u,l));break e}}s=u=Bi(u,l),Oe!==4&&(Oe=2),Qs===null?Qs=[s]:Qs.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var N=sx(s,u,e);ug(s,N);break e;case 1:l=u;var w=s.type,b=s.stateNode;if(!(s.flags&128)&&(typeof w.getDerivedStateFromError=="function"||b!==null&&typeof b.componentDidCatch=="function"&&(nr===null||!nr.has(b)))){s.flags|=65536,e&=-e,s.lanes|=e;var j=ox(s,l,e);ug(s,j);break e}}s=s.return}while(s!==null)}bx(n)}catch(O){e=O,Te===n&&n!==null&&(Te=n=n.return);continue}break}while(!0)}function Ex(){var t=Nl.current;return Nl.current=bl,t===null?bl:t}function xf(){(Oe===0||Oe===3||Oe===2)&&(Oe=4),Fe===null||!(Fr&268435455)&&!(pc&268435455)||Bn(Fe,$e)}function Tl(t,e){var n=te;te|=2;var r=Ex();(Fe!==t||$e!==e)&&(pn=null,jr(t,e));do try{m2();break}catch(i){kx(t,i)}while(!0);if(ef(),te=n,Nl.current=r,Te!==null)throw Error(D(261));return Fe=null,$e=0,Oe}function m2(){for(;Te!==null;)Sx(Te)}function g2(){for(;Te!==null&&!Vk();)Sx(Te)}function Sx(t){var e=Cx(t.alternate,t,xt);t.memoizedProps=t.pendingProps,e===null?bx(t):Te=e,pf.current=null}function bx(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=c2(n,e),n!==null){n.flags&=32767,Te=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Oe=6,Te=null;return}}else if(n=l2(n,e,xt),n!==null){Te=n;return}if(e=e.sibling,e!==null){Te=e;return}Te=e=t}while(e!==null);Oe===0&&(Oe=5)}function br(t,e,n){var r=ae,i=At.transition;try{At.transition=null,ae=1,v2(t,e,n,r)}finally{At.transition=i,ae=r}return null}function v2(t,e,n,r){do Ai();while(Yn!==null);if(te&6)throw Error(D(327));n=t.finishedWork;var i=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(D(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(Xk(t,s),t===Fe&&(Te=Fe=null,$e=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||La||(La=!0,Ix(ul,function(){return Ai(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=At.transition,At.transition=null;var o=ae;ae=1;var l=te;te|=4,pf.current=null,d2(t,n),xx(n,t),ME(Dd),hl=!!Od,Dd=Od=null,t.current=n,h2(n),$k(),te=l,ae=o,At.transition=s}else t.current=n;if(La&&(La=!1,Yn=t,Il=i),s=t.pendingLanes,s===0&&(nr=null),Wk(n.stateNode),gt(t,Ce()),e!==null)for(r=t.onRecoverableError,n=0;n<e.length;n++)i=e[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(Cl)throw Cl=!1,t=th,th=null,t;return Il&1&&t.tag!==0&&Ai(),s=t.pendingLanes,s&1?t===nh?Xs++:(Xs=0,nh=t):Xs=0,yr(),null}function Ai(){if(Yn!==null){var t=sy(Il),e=At.transition,n=ae;try{if(At.transition=null,ae=16>t?16:t,Yn===null)var r=!1;else{if(t=Yn,Yn=null,Il=0,te&6)throw Error(D(331));var i=te;for(te|=4,V=t.current;V!==null;){var s=V,o=s.child;if(V.flags&16){var l=s.deletions;if(l!==null){for(var u=0;u<l.length;u++){var h=l[u];for(V=h;V!==null;){var m=V;switch(m.tag){case 0:case 11:case 15:Ys(8,m,s)}var p=m.child;if(p!==null)p.return=m,V=p;else for(;V!==null;){m=V;var g=m.sibling,E=m.return;if(gx(m),m===h){V=null;break}if(g!==null){g.return=E,V=g;break}V=E}}}var I=s.alternate;if(I!==null){var P=I.child;if(P!==null){I.child=null;do{var L=P.sibling;P.sibling=null,P=L}while(P!==null)}}V=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,V=o;else e:for(;V!==null;){if(s=V,s.flags&2048)switch(s.tag){case 0:case 11:case 15:Ys(9,s,s.return)}var N=s.sibling;if(N!==null){N.return=s.return,V=N;break e}V=s.return}}var w=t.current;for(V=w;V!==null;){o=V;var b=o.child;if(o.subtreeFlags&2064&&b!==null)b.return=o,V=b;else e:for(o=w;V!==null;){if(l=V,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:fc(9,l)}}catch(O){ke(l,l.return,O)}if(l===o){V=null;break e}var j=l.sibling;if(j!==null){j.return=l.return,V=j;break e}V=l.return}}if(te=i,yr(),nn&&typeof nn.onPostCommitFiberRoot=="function")try{nn.onPostCommitFiberRoot(sc,t)}catch{}r=!0}return r}finally{ae=n,At.transition=e}}return!1}function Pg(t,e,n){e=Bi(n,e),e=sx(t,e,1),t=tr(t,e,1),e=it(),t!==null&&(Vo(t,1,e),gt(t,e))}function ke(t,e,n){if(t.tag===3)Pg(t,t,n);else for(;e!==null;){if(e.tag===3){Pg(e,t,n);break}else if(e.tag===1){var r=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(nr===null||!nr.has(r))){t=Bi(n,t),t=ox(e,t,1),e=tr(e,t,1),t=it(),e!==null&&(Vo(e,1,t),gt(e,t));break}}e=e.return}}function y2(t,e,n){var r=t.pingCache;r!==null&&r.delete(e),e=it(),t.pingedLanes|=t.suspendedLanes&n,Fe===t&&($e&n)===n&&(Oe===4||Oe===3&&($e&130023424)===$e&&500>Ce()-gf?jr(t,0):mf|=n),gt(t,e)}function Nx(t,e){e===0&&(t.mode&1?(e=Na,Na<<=1,!(Na&130023424)&&(Na=4194304)):e=1);var n=it();t=Cn(t,e),t!==null&&(Vo(t,e,n),gt(t,n))}function x2(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),Nx(t,n)}function _2(t,e){var n=0;switch(t.tag){case 13:var r=t.stateNode,i=t.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=t.stateNode;break;default:throw Error(D(314))}r!==null&&r.delete(e),Nx(t,n)}var Cx;Cx=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||pt.current)ht=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return ht=!1,a2(t,e,n);ht=!!(t.flags&131072)}else ht=!1,ve&&e.flags&1048576&&Py(e,xl,e.index);switch(e.lanes=0,e.tag){case 2:var r=e.type;Xa(t,e),t=e.pendingProps;var i=Ui(e,Xe.current);Pi(e,n),i=cf(null,e,r,t,i,n);var s=uf();return e.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,mt(r)?(s=!0,vl(e)):s=!1,e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,rf(e),i.updater=hc,e.stateNode=i,i._reactInternals=e,Hd(e,r,t,n),e=qd(null,e,r,!0,s,n)):(e.tag=0,ve&&s&&Qh(e),tt(null,e,i,n),e=e.child),e;case 16:r=e.elementType;e:{switch(Xa(t,e),t=e.pendingProps,i=r._init,r=i(r._payload),e.type=r,i=e.tag=k2(r),t=Ft(r,t),i){case 0:e=Gd(null,e,r,t,n);break e;case 1:e=wg(null,e,r,t,n);break e;case 11:e=xg(null,e,r,t,n);break e;case 14:e=_g(null,e,r,Ft(r.type,t),n);break e}throw Error(D(306,r,""))}return e;case 0:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Ft(r,i),Gd(t,e,r,i,n);case 1:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Ft(r,i),wg(t,e,r,i,n);case 3:e:{if(ux(e),t===null)throw Error(D(387));r=e.pendingProps,s=e.memoizedState,i=s.element,My(t,e),kl(e,r,null,n);var o=e.memoizedState;if(r=o.element,s.isDehydrated)if(s={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){i=Bi(Error(D(423)),e),e=kg(t,e,r,n,i);break e}else if(r!==i){i=Bi(Error(D(424)),e),e=kg(t,e,r,n,i);break e}else for(_t=er(e.stateNode.containerInfo.firstChild),wt=e,ve=!0,zt=null,n=Dy(e,null,r,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(zi(),r===i){e=In(t,e,n);break e}tt(t,e,r,n)}e=e.child}return e;case 5:return Fy(e),t===null&&Vd(e),r=e.type,i=e.pendingProps,s=t!==null?t.memoizedProps:null,o=i.children,Ld(r,i)?o=null:s!==null&&Ld(r,s)&&(e.flags|=32),cx(t,e),tt(t,e,o,n),e.child;case 6:return t===null&&Vd(e),null;case 13:return dx(t,e,n);case 4:return sf(e,e.stateNode.containerInfo),r=e.pendingProps,t===null?e.child=Vi(e,null,r,n):tt(t,e,r,n),e.child;case 11:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Ft(r,i),xg(t,e,r,i,n);case 7:return tt(t,e,e.pendingProps,n),e.child;case 8:return tt(t,e,e.pendingProps.children,n),e.child;case 12:return tt(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(r=e.type._context,i=e.pendingProps,s=e.memoizedProps,o=i.value,he(_l,r._currentValue),r._currentValue=o,s!==null)if(qt(s.value,o)){if(s.children===i.children&&!pt.current){e=In(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var l=s.dependencies;if(l!==null){o=s.child;for(var u=l.firstContext;u!==null;){if(u.context===r){if(s.tag===1){u=kn(-1,n&-n),u.tag=2;var h=s.updateQueue;if(h!==null){h=h.shared;var m=h.pending;m===null?u.next=u:(u.next=m.next,m.next=u),h.pending=u}}s.lanes|=n,u=s.alternate,u!==null&&(u.lanes|=n),$d(s.return,n,e),l.lanes|=n;break}u=u.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(D(341));o.lanes|=n,l=o.alternate,l!==null&&(l.lanes|=n),$d(o,n,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}tt(t,e,i.children,n),e=e.child}return e;case 9:return i=e.type,r=e.pendingProps.children,Pi(e,n),i=jt(i),r=r(i),e.flags|=1,tt(t,e,r,n),e.child;case 14:return r=e.type,i=Ft(r,e.pendingProps),i=Ft(r.type,i),_g(t,e,r,i,n);case 15:return ax(t,e,e.type,e.pendingProps,n);case 17:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Ft(r,i),Xa(t,e),e.tag=1,mt(r)?(t=!0,vl(e)):t=!1,Pi(e,n),ix(e,r,i),Hd(e,r,i,n),qd(null,e,r,!0,t,n);case 19:return hx(t,e,n);case 22:return lx(t,e,n)}throw Error(D(156,e.tag))};function Ix(t,e){return ty(t,e)}function w2(t,e,n,r){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Rt(t,e,n,r){return new w2(t,e,n,r)}function _f(t){return t=t.prototype,!(!t||!t.isReactComponent)}function k2(t){if(typeof t=="function")return _f(t)?1:0;if(t!=null){if(t=t.$$typeof,t===Fh)return 11;if(t===Uh)return 14}return 2}function ir(t,e){var n=t.alternate;return n===null?(n=Rt(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function el(t,e,n,r,i,s){var o=2;if(r=t,typeof t=="function")_f(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case pi:return Or(n.children,i,s,e);case Mh:o=8,i|=8;break;case pd:return t=Rt(12,n,e,i|2),t.elementType=pd,t.lanes=s,t;case md:return t=Rt(13,n,e,i),t.elementType=md,t.lanes=s,t;case gd:return t=Rt(19,n,e,i),t.elementType=gd,t.lanes=s,t;case Fv:return mc(n,i,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Lv:o=10;break e;case Mv:o=9;break e;case Fh:o=11;break e;case Uh:o=14;break e;case Un:o=16,r=null;break e}throw Error(D(130,t==null?t:typeof t,""))}return e=Rt(o,n,e,i),e.elementType=t,e.type=r,e.lanes=s,e}function Or(t,e,n,r){return t=Rt(7,t,r,e),t.lanes=n,t}function mc(t,e,n,r){return t=Rt(22,t,r,e),t.elementType=Fv,t.lanes=n,t.stateNode={isHidden:!1},t}function Hu(t,e,n){return t=Rt(6,t,null,e),t.lanes=n,t}function Wu(t,e,n){return e=Rt(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function E2(t,e,n,r,i){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=bu(0),this.expirationTimes=bu(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=bu(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function wf(t,e,n,r,i,s,o,l,u){return t=new E2(t,e,n,l,u),e===1?(e=1,s===!0&&(e|=8)):e=0,s=Rt(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},rf(s),t}function S2(t,e,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:fi,key:r==null?null:""+r,children:t,containerInfo:e,implementation:n}}function Tx(t){if(!t)return ur;t=t._reactInternals;e:{if(Qr(t)!==t||t.tag!==1)throw Error(D(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(mt(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(D(171))}if(t.tag===1){var n=t.type;if(mt(n))return Ty(t,n,e)}return e}function Rx(t,e,n,r,i,s,o,l,u){return t=wf(n,r,!0,t,i,s,o,l,u),t.context=Tx(null),n=t.current,r=it(),i=rr(n),s=kn(r,i),s.callback=e??null,tr(n,s,i),t.current.lanes=i,Vo(t,i,r),gt(t,r),t}function gc(t,e,n,r){var i=e.current,s=it(),o=rr(i);return n=Tx(n),e.context===null?e.context=n:e.pendingContext=n,e=kn(s,o),e.payload={element:t},r=r===void 0?null:r,r!==null&&(e.callback=r),t=tr(i,e,o),t!==null&&(Wt(t,i,o,s),Ka(t,i,o)),o}function Rl(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Ag(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function kf(t,e){Ag(t,e),(t=t.alternate)&&Ag(t,e)}function b2(){return null}var Px=typeof reportError=="function"?reportError:function(t){console.error(t)};function Ef(t){this._internalRoot=t}vc.prototype.render=Ef.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(D(409));gc(t,e,null,null)};vc.prototype.unmount=Ef.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Ur(function(){gc(null,t,null,null)}),e[Nn]=null}};function vc(t){this._internalRoot=t}vc.prototype.unstable_scheduleHydration=function(t){if(t){var e=ly();t={blockedOn:null,target:t,priority:e};for(var n=0;n<$n.length&&e!==0&&e<$n[n].priority;n++);$n.splice(n,0,t),n===0&&uy(t)}};function Sf(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function yc(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function jg(){}function N2(t,e,n,r,i){if(i){if(typeof r=="function"){var s=r;r=function(){var h=Rl(o);s.call(h)}}var o=Rx(e,r,t,0,null,!1,!1,"",jg);return t._reactRootContainer=o,t[Nn]=o.current,vo(t.nodeType===8?t.parentNode:t),Ur(),o}for(;i=t.lastChild;)t.removeChild(i);if(typeof r=="function"){var l=r;r=function(){var h=Rl(u);l.call(h)}}var u=wf(t,0,!1,null,null,!1,!1,"",jg);return t._reactRootContainer=u,t[Nn]=u.current,vo(t.nodeType===8?t.parentNode:t),Ur(function(){gc(e,u,n,r)}),u}function xc(t,e,n,r,i){var s=n._reactRootContainer;if(s){var o=s;if(typeof i=="function"){var l=i;i=function(){var u=Rl(o);l.call(u)}}gc(e,o,t,i)}else o=N2(n,e,t,i,r);return Rl(o)}oy=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=Us(e.pendingLanes);n!==0&&($h(e,n|1),gt(e,Ce()),!(te&6)&&(Hi=Ce()+500,yr()))}break;case 13:Ur(function(){var r=Cn(t,1);if(r!==null){var i=it();Wt(r,t,1,i)}}),kf(t,1)}};Bh=function(t){if(t.tag===13){var e=Cn(t,134217728);if(e!==null){var n=it();Wt(e,t,134217728,n)}kf(t,134217728)}};ay=function(t){if(t.tag===13){var e=rr(t),n=Cn(t,e);if(n!==null){var r=it();Wt(n,t,e,r)}kf(t,e)}};ly=function(){return ae};cy=function(t,e){var n=ae;try{return ae=t,e()}finally{ae=n}};Nd=function(t,e,n){switch(e){case"input":if(xd(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var r=n[e];if(r!==t&&r.form===t.form){var i=cc(r);if(!i)throw Error(D(90));zv(r),xd(r,i)}}}break;case"textarea":$v(t,n);break;case"select":e=n.value,e!=null&&Ci(t,!!n.multiple,e,!1)}};Yv=vf;Qv=Ur;var C2={usingClientEntryPoint:!1,Events:[Bo,yi,cc,qv,Kv,vf]},Ps={findFiberByHostInstance:Ir,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},I2={bundleType:Ps.bundleType,version:Ps.version,rendererPackageName:Ps.rendererPackageName,rendererConfig:Ps.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:An.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=Zv(t),t===null?null:t.stateNode},findFiberByHostInstance:Ps.findFiberByHostInstance||b2,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ma=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ma.isDisabled&&Ma.supportsFiber)try{sc=Ma.inject(I2),nn=Ma}catch{}}bt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=C2;bt.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Sf(e))throw Error(D(200));return S2(t,e,null,n)};bt.createRoot=function(t,e){if(!Sf(t))throw Error(D(299));var n=!1,r="",i=Px;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(r=e.identifierPrefix),e.onRecoverableError!==void 0&&(i=e.onRecoverableError)),e=wf(t,1,!1,null,null,n,!1,r,i),t[Nn]=e.current,vo(t.nodeType===8?t.parentNode:t),new Ef(e)};bt.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(D(188)):(t=Object.keys(t).join(","),Error(D(268,t)));return t=Zv(e),t=t===null?null:t.stateNode,t};bt.flushSync=function(t){return Ur(t)};bt.hydrate=function(t,e,n){if(!yc(e))throw Error(D(200));return xc(null,t,e,!0,n)};bt.hydrateRoot=function(t,e,n){if(!Sf(t))throw Error(D(405));var r=n!=null&&n.hydratedSources||null,i=!1,s="",o=Px;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=Rx(e,null,t,1,n??null,i,!1,s,o),t[Nn]=e.current,vo(t),r)for(t=0;t<r.length;t++)n=r[t],i=n._getVersion,i=i(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,i]:e.mutableSourceEagerHydrationData.push(n,i);return new vc(e)};bt.render=function(t,e,n){if(!yc(e))throw Error(D(200));return xc(null,t,e,!1,n)};bt.unmountComponentAtNode=function(t){if(!yc(t))throw Error(D(40));return t._reactRootContainer?(Ur(function(){xc(null,null,t,!1,function(){t._reactRootContainer=null,t[Nn]=null})}),!0):!1};bt.unstable_batchedUpdates=vf;bt.unstable_renderSubtreeIntoContainer=function(t,e,n,r){if(!yc(n))throw Error(D(200));if(t==null||t._reactInternals===void 0)throw Error(D(38));return xc(t,e,n,!1,r)};bt.version="18.3.1-next-f1338f8080-20240426";function Ax(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Ax)}catch(t){console.error(t)}}Ax(),Av.exports=bt;var T2=Av.exports,Og=T2;hd.createRoot=Og.createRoot,hd.hydrateRoot=Og.hydrateRoot;/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R2=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),jx=(...t)=>t.filter((e,n,r)=>!!e&&r.indexOf(e)===n).join(" ");/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var P2={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A2=$.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:n=2,absoluteStrokeWidth:r,className:i="",children:s,iconNode:o,...l},u)=>$.createElement("svg",{ref:u,...P2,width:e,height:e,stroke:t,strokeWidth:r?Number(n)*24/Number(e):n,className:jx("lucide",i),...l},[...o.map(([h,m])=>$.createElement(h,m)),...Array.isArray(s)?s:[s]]));/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W=(t,e)=>{const n=$.forwardRef(({className:r,...i},s)=>$.createElement(A2,{ref:s,iconNode:e,className:jx(`lucide-${R2(t)}`,r),...i}));return n.displayName=`${t}`,n};/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bf=W("Activity",[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wo=W("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j2=W("Award",[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O2=W("BookOpen",[["path",{d:"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z",key:"vv98re"}],["path",{d:"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",key:"1cyq3y"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D2=W("Briefcase",[["path",{d:"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",key:"jecpp"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2",key:"i6l2r4"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xr=W("Bus",[["path",{d:"M8 6v6",key:"18i7km"}],["path",{d:"M15 6v6",key:"1sg6z9"}],["path",{d:"M2 12h19.6",key:"de5uta"}],["path",{d:"M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3",key:"1wwztk"}],["circle",{cx:"7",cy:"18",r:"2",key:"19iecd"}],["path",{d:"M9 18h5",key:"lrx6i"}],["circle",{cx:"16",cy:"18",r:"2",key:"1v4tcr"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const No=W("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L2=W("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wi=W("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ox=W("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dr=W("CircleCheck",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M2=W("CircleHelp",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F2=W("CircleUser",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}],["path",{d:"M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662",key:"154egf"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dx=W("CircleX",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U2=W("ClipboardCheck",[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1",key:"tgr4d6"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",key:"116196"}],["path",{d:"m9 14 2 2 4-4",key:"df797q"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _c=W("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z2=W("Database",[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nf=W("History",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M12 7v5l4 2",key:"1fdv2h"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cf=W("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lx=W("LayoutDashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hr=W("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mx=W("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V2=W("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Go=W("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sh=W("MapPin",[["path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z",key:"2oe9fu"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $2=W("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B2=W("Moon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H2=W("MousePointer2",[["path",{d:"m4 4 7.07 17 2.51-7.39L21 11.07z",key:"1vqm48"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W2=W("PenLine",[["path",{d:"M12 20h9",key:"t2du7b"}],["path",{d:"M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",key:"1ykcvy"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fx=W("Phone",[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G2=W("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ux=W("Save",[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q2=W("Scale",[["path",{d:"m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z",key:"7g6ntu"}],["path",{d:"m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z",key:"ijws7r"}],["path",{d:"M7 21h10",key:"1b0cd5"}],["path",{d:"M12 3v18",key:"108xh3"}],["path",{d:"M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2",key:"3gwbw2"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K2=W("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y2=W("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q2=W("ShieldAlert",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"M12 8v4",key:"1got3b"}],["path",{d:"M12 16h.01",key:"1drbdi"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Js=W("ShieldCheck",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X2=W("ShieldQuestion",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3",key:"mhlwft"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dg=W("Star",[["polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",key:"8f66p6"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J2=W("Sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z2=W("Tag",[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",key:"vktsd0"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor",key:"kqv944"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wc=W("Ticket",[["path",{d:"M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",key:"qn84l0"}],["path",{d:"M13 5v2",key:"dyzc3o"}],["path",{d:"M13 17v2",key:"1ont0d"}],["path",{d:"M13 11v2",key:"1wjjxi"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kc=W("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gi=W("TrendingUp",[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ec=W("UserPlus",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"19",x2:"19",y1:"8",y2:"14",key:"1bvyxn"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11",key:"1shjgl"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sc=W("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zr=W("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bc=W("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lg=W("Zap",[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]]);var Mg={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zx={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const F=function(t,e){if(!t)throw is(e)},is=function(t){return new Error("Firebase Database ("+zx.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vx=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let i=t.charCodeAt(r);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):(i&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},eS=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const i=t[n++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=t[n++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=t[n++],o=t[n++],l=t[n++],u=((i&7)<<18|(s&63)<<12|(o&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const s=t[n++],o=t[n++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},If={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<t.length;i+=3){const s=t[i],o=i+1<t.length,l=o?t[i+1]:0,u=i+2<t.length,h=u?t[i+2]:0,m=s>>2,p=(s&3)<<4|l>>4;let g=(l&15)<<2|h>>6,E=h&63;u||(E=64,o||(g=64)),r.push(n[m],n[p],n[g],n[E])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Vx(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):eS(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<t.length;){const s=n[t.charAt(i++)],l=i<t.length?n[t.charAt(i)]:0;++i;const h=i<t.length?n[t.charAt(i)]:64;++i;const p=i<t.length?n[t.charAt(i)]:64;if(++i,s==null||l==null||h==null||p==null)throw new tS;const g=s<<2|l>>4;if(r.push(g),h!==64){const E=l<<4&240|h>>2;if(r.push(E),p!==64){const I=h<<6&192|p;r.push(I)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class tS extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const $x=function(t){const e=Vx(t);return If.encodeByteArray(e,!0)},Pl=function(t){return $x(t).replace(/\./g,"")},Al=function(t){try{return If.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nS(t){return Bx(void 0,t)}function Bx(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!rS(n)||(t[n]=Bx(t[n],e[n]));return t}function rS(t){return t!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iS(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sS=()=>iS().__FIREBASE_DEFAULTS__,oS=()=>{if(typeof process>"u"||typeof Mg>"u")return;const t=Mg.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},aS=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Al(t[1]);return e&&JSON.parse(e)},Tf=()=>{try{return sS()||oS()||aS()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Hx=t=>{var e,n;return(n=(e=Tf())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},Wx=t=>{const e=Hx(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},Gx=()=>{var t;return(t=Tf())===null||t===void 0?void 0:t.config},qx=t=>{var e;return(e=Tf())===null||e===void 0?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ss{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kx(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",i=t.iat||0,s=t.sub||t.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},t);return[Pl(JSON.stringify(n)),Pl(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ot(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Rf(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ot())}function lS(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Yx(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function Qx(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function cS(){const t=ot();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function uS(){return zx.NODE_ADMIN===!0}function Xx(){try{return typeof indexedDB=="object"}catch{return!1}}function Jx(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(n){e(n)}})}function dS(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hS="FirebaseError";class Qt extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=hS,Object.setPrototypeOf(this,Qt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Jr.prototype.create)}}class Jr{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?fS(s,r):"Error",l=`${this.serviceName}: ${o} (${i}).`;return new Qt(i,l,r)}}function fS(t,e){return t.replace(pS,(n,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const pS=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Co(t){return JSON.parse(t)}function je(t){return JSON.stringify(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zx=function(t){let e={},n={},r={},i="";try{const s=t.split(".");e=Co(Al(s[0])||""),n=Co(Al(s[1])||""),i=s[2],r=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:r,signature:i}},mS=function(t){const e=Zx(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},gS=function(t){const e=Zx(t).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xt(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function Vr(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function oh(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function jl(t,e,n){const r={};for(const i in t)Object.prototype.hasOwnProperty.call(t,i)&&(r[i]=e.call(n,t[i],i,t));return r}function Io(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const i of n){if(!r.includes(i))return!1;const s=t[i],o=e[i];if(Fg(s)&&Fg(o)){if(!Io(s,o))return!1}else if(s!==o)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function Fg(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function os(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Vs(t){const e={};return t.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function $s(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vS{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const r=this.W_;if(typeof e=="string")for(let p=0;p<16;p++)r[p]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let p=0;p<16;p++)r[p]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let p=16;p<80;p++){const g=r[p-3]^r[p-8]^r[p-14]^r[p-16];r[p]=(g<<1|g>>>31)&4294967295}let i=this.chain_[0],s=this.chain_[1],o=this.chain_[2],l=this.chain_[3],u=this.chain_[4],h,m;for(let p=0;p<80;p++){p<40?p<20?(h=l^s&(o^l),m=1518500249):(h=s^o^l,m=1859775393):p<60?(h=s&o|l&(s|o),m=2400959708):(h=s^o^l,m=3395469782);const g=(i<<5|i>>>27)+h+u+m+r[p]&4294967295;u=l,l=o,o=(s<<30|s>>>2)&4294967295,s=i,i=g}this.chain_[0]=this.chain_[0]+i&4294967295,this.chain_[1]=this.chain_[1]+s&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+l&4294967295,this.chain_[4]=this.chain_[4]+u&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const r=n-this.blockSize;let i=0;const s=this.buf_;let o=this.inbuf_;for(;i<n;){if(o===0)for(;i<=r;)this.compress_(e,i),i+=this.blockSize;if(typeof e=="string"){for(;i<n;)if(s[o]=e.charCodeAt(i),++o,++i,o===this.blockSize){this.compress_(s),o=0;break}}else for(;i<n;)if(s[o]=e[i],++o,++i,o===this.blockSize){this.compress_(s),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let i=this.blockSize-1;i>=56;i--)this.buf_[i]=n&255,n/=256;this.compress_(this.buf_);let r=0;for(let i=0;i<5;i++)for(let s=24;s>=0;s-=8)e[r]=this.chain_[i]>>s&255,++r;return e}}function yS(t,e){const n=new xS(t,e);return n.subscribe.bind(n)}class xS{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let i;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");_S(e,["next","error","complete"])?i=e:i={next:e,error:n,complete:r},i.next===void 0&&(i.next=Gu),i.error===void 0&&(i.error=Gu),i.complete===void 0&&(i.complete=Gu);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function _S(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function Gu(){}function Nc(t,e){return`${t} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wS=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let i=t.charCodeAt(r);if(i>=55296&&i<=56319){const s=i-55296;r++,F(r<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(r)-56320;i=65536+(s<<10)+o}i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):i<65536?(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},Cc=function(t){let e=0;for(let n=0;n<t.length;n++){const r=t.charCodeAt(n);r<128?e++:r<2048?e+=2:r>=55296&&r<=56319?(e+=4,n++):e+=3}return e};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kS=1e3,ES=2,SS=4*60*60*1e3,bS=.5;function Ug(t,e=kS,n=ES){const r=e*Math.pow(n,t),i=Math.round(bS*r*(Math.random()-.5)*2);return Math.min(SS,r+i)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Re(t){return t&&t._delegate?t._delegate:t}class Dt{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nr="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NS{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new ss;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(IS(e))try{this.getOrInitializeService({instanceIdentifier:Nr})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=Nr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Nr){return this.instances.has(e)}getOptions(e=Nr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[s,o]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(s);r===l&&o.resolve(i)}return i}onInit(e,n){var r;const i=this.normalizeInstanceIdentifier(n),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);const o=this.instances.get(i);return o&&e(o,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const i of r)try{i(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:CS(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Nr){return this.component?this.component.multipleInstances?e:Nr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function CS(t){return t===Nr?void 0:t}function IS(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TS{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new NS(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ie;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(ie||(ie={}));const RS={debug:ie.DEBUG,verbose:ie.VERBOSE,info:ie.INFO,warn:ie.WARN,error:ie.ERROR,silent:ie.SILENT},PS=ie.INFO,AS={[ie.DEBUG]:"log",[ie.VERBOSE]:"log",[ie.INFO]:"info",[ie.WARN]:"warn",[ie.ERROR]:"error"},jS=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),i=AS[e];if(i)console[i](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class qo{constructor(e){this.name=e,this._logLevel=PS,this._logHandler=jS,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ie))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?RS[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ie.DEBUG,...e),this._logHandler(this,ie.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ie.VERBOSE,...e),this._logHandler(this,ie.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ie.INFO,...e),this._logHandler(this,ie.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ie.WARN,...e),this._logHandler(this,ie.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ie.ERROR,...e),this._logHandler(this,ie.ERROR,...e)}}const OS=(t,e)=>e.some(n=>t instanceof n);let zg,Vg;function DS(){return zg||(zg=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function LS(){return Vg||(Vg=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const e_=new WeakMap,ah=new WeakMap,t_=new WeakMap,qu=new WeakMap,Pf=new WeakMap;function MS(t){const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("success",s),t.removeEventListener("error",o)},s=()=>{n(sr(t.result)),i()},o=()=>{r(t.error),i()};t.addEventListener("success",s),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&e_.set(n,t)}).catch(()=>{}),Pf.set(e,t),e}function FS(t){if(ah.has(t))return;const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("complete",s),t.removeEventListener("error",o),t.removeEventListener("abort",o)},s=()=>{n(),i()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",s),t.addEventListener("error",o),t.addEventListener("abort",o)});ah.set(t,e)}let lh={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return ah.get(t);if(e==="objectStoreNames")return t.objectStoreNames||t_.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return sr(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function US(t){lh=t(lh)}function zS(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(Ku(this),e,...n);return t_.set(r,e.sort?e.sort():[e]),sr(r)}:LS().includes(t)?function(...e){return t.apply(Ku(this),e),sr(e_.get(this))}:function(...e){return sr(t.apply(Ku(this),e))}}function VS(t){return typeof t=="function"?zS(t):(t instanceof IDBTransaction&&FS(t),OS(t,DS())?new Proxy(t,lh):t)}function sr(t){if(t instanceof IDBRequest)return MS(t);if(qu.has(t))return qu.get(t);const e=VS(t);return e!==t&&(qu.set(t,e),Pf.set(e,t)),e}const Ku=t=>Pf.get(t);function n_(t,e,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(t,e),l=sr(o);return r&&o.addEventListener("upgradeneeded",u=>{r(sr(o.result),u.oldVersion,u.newVersion,sr(o.transaction),u)}),n&&o.addEventListener("blocked",u=>n(u.oldVersion,u.newVersion,u)),l.then(u=>{s&&u.addEventListener("close",()=>s()),i&&u.addEventListener("versionchange",h=>i(h.oldVersion,h.newVersion,h))}).catch(()=>{}),l}const $S=["get","getKey","getAll","getAllKeys","count"],BS=["put","add","delete","clear"],Yu=new Map;function $g(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Yu.get(e))return Yu.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,i=BS.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||$S.includes(n)))return;const s=async function(o,...l){const u=this.transaction(o,i?"readwrite":"readonly");let h=u.store;return r&&(h=h.index(l.shift())),(await Promise.all([h[n](...l),i&&u.done]))[0]};return Yu.set(e,s),s}US(t=>({...t,get:(e,n,r)=>$g(e,n)||t.get(e,n,r),has:(e,n)=>!!$g(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HS{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(WS(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function WS(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const ch="@firebase/app",Bg="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tn=new qo("@firebase/app"),GS="@firebase/app-compat",qS="@firebase/analytics-compat",KS="@firebase/analytics",YS="@firebase/app-check-compat",QS="@firebase/app-check",XS="@firebase/auth",JS="@firebase/auth-compat",ZS="@firebase/database",eb="@firebase/data-connect",tb="@firebase/database-compat",nb="@firebase/functions",rb="@firebase/functions-compat",ib="@firebase/installations",sb="@firebase/installations-compat",ob="@firebase/messaging",ab="@firebase/messaging-compat",lb="@firebase/performance",cb="@firebase/performance-compat",ub="@firebase/remote-config",db="@firebase/remote-config-compat",hb="@firebase/storage",fb="@firebase/storage-compat",pb="@firebase/firestore",mb="@firebase/vertexai-preview",gb="@firebase/firestore-compat",vb="firebase",yb="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uh="[DEFAULT]",xb={[ch]:"fire-core",[GS]:"fire-core-compat",[KS]:"fire-analytics",[qS]:"fire-analytics-compat",[QS]:"fire-app-check",[YS]:"fire-app-check-compat",[XS]:"fire-auth",[JS]:"fire-auth-compat",[ZS]:"fire-rtdb",[eb]:"fire-data-connect",[tb]:"fire-rtdb-compat",[nb]:"fire-fn",[rb]:"fire-fn-compat",[ib]:"fire-iid",[sb]:"fire-iid-compat",[ob]:"fire-fcm",[ab]:"fire-fcm-compat",[lb]:"fire-perf",[cb]:"fire-perf-compat",[ub]:"fire-rc",[db]:"fire-rc-compat",[hb]:"fire-gcs",[fb]:"fire-gcs-compat",[pb]:"fire-fst",[gb]:"fire-fst-compat",[mb]:"fire-vertex","fire-js":"fire-js",[vb]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ol=new Map,_b=new Map,dh=new Map;function Hg(t,e){try{t.container.addComponent(e)}catch(n){Tn.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Kt(t){const e=t.name;if(dh.has(e))return Tn.debug(`There were multiple attempts to register component ${e}.`),!1;dh.set(e,t);for(const n of Ol.values())Hg(n,t);for(const n of _b.values())Hg(n,t);return!0}function xr(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function tn(t){return t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wb={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},or=new Jr("app","Firebase",wb);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kb{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Dt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw or.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zr=yb;function r_(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:uh,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw or.create("bad-app-name",{appName:String(i)});if(n||(n=Gx()),!n)throw or.create("no-options");const s=Ol.get(i);if(s){if(Io(n,s.options)&&Io(r,s.config))return s;throw or.create("duplicate-app",{appName:i})}const o=new TS(i);for(const u of dh.values())o.addComponent(u);const l=new kb(n,r,o);return Ol.set(i,l),l}function Ic(t=uh){const e=Ol.get(t);if(!e&&t===uh&&Gx())return r_();if(!e)throw or.create("no-app",{appName:t});return e}function vt(t,e,n){var r;let i=(r=xb[t])!==null&&r!==void 0?r:t;n&&(i+=`-${n}`);const s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){const l=[`Unable to register library "${i}" with version "${e}":`];s&&l.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&l.push("and"),o&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Tn.warn(l.join(" "));return}Kt(new Dt(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Eb="firebase-heartbeat-database",Sb=1,To="firebase-heartbeat-store";let Qu=null;function i_(){return Qu||(Qu=n_(Eb,Sb,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(To)}catch(n){console.warn(n)}}}}).catch(t=>{throw or.create("idb-open",{originalErrorMessage:t.message})})),Qu}async function bb(t){try{const n=(await i_()).transaction(To),r=await n.objectStore(To).get(s_(t));return await n.done,r}catch(e){if(e instanceof Qt)Tn.warn(e.message);else{const n=or.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Tn.warn(n.message)}}}async function Wg(t,e){try{const r=(await i_()).transaction(To,"readwrite");await r.objectStore(To).put(e,s_(t)),await r.done}catch(n){if(n instanceof Qt)Tn.warn(n.message);else{const r=or.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Tn.warn(r.message)}}}function s_(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nb=1024,Cb=30*24*60*60*1e3;class Ib{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Rb(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Gg();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s)?void 0:(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const l=new Date(o.date).valueOf();return Date.now()-l<=Cb}),this._storage.overwrite(this._heartbeatsCache))}catch(r){Tn.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Gg(),{heartbeatsToSend:r,unsentEntries:i}=Tb(this._heartbeatsCache.heartbeats),s=Pl(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(n){return Tn.warn(n),""}}}function Gg(){return new Date().toISOString().substring(0,10)}function Tb(t,e=Nb){const n=[];let r=t.slice();for(const i of t){const s=n.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),qg(n)>e){s.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),qg(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class Rb{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Xx()?Jx().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await bb(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return Wg(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return Wg(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function qg(t){return Pl(JSON.stringify({version:2,heartbeats:t})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pb(t){Kt(new Dt("platform-logger",e=>new HS(e),"PRIVATE")),Kt(new Dt("heartbeat",e=>new Ib(e),"PRIVATE")),vt(ch,Bg,t),vt(ch,Bg,"esm2017"),vt("fire-js","")}Pb("");function Af(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(t);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(t,r[i])&&(n[r[i]]=t[r[i]]);return n}function o_(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Ab=o_,a_=new Jr("auth","Firebase",o_());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dl=new qo("@firebase/auth");function jb(t,...e){Dl.logLevel<=ie.WARN&&Dl.warn(`Auth (${Zr}): ${t}`,...e)}function tl(t,...e){Dl.logLevel<=ie.ERROR&&Dl.error(`Auth (${Zr}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yt(t,...e){throw jf(t,...e)}function sn(t,...e){return jf(t,...e)}function l_(t,e,n){const r=Object.assign(Object.assign({},Ab()),{[e]:n});return new Jr("auth","Firebase",r).create(e,{appName:t.name})}function En(t){return l_(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function jf(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return a_.create(t,...e)}function G(t,e,...n){if(!t)throw jf(e,...n)}function yn(t){const e="INTERNAL ASSERTION FAILED: "+t;throw tl(e),new Error(e)}function Rn(t,e){t||yn(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hh(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function Ob(){return Kg()==="http:"||Kg()==="https:"}function Kg(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Db(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Ob()||Yx()||"connection"in navigator)?navigator.onLine:!0}function Lb(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ko{constructor(e,n){this.shortDelay=e,this.longDelay=n,Rn(n>e,"Short delay should be less than long delay!"),this.isMobile=Rf()||Qx()}get(){return Db()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Of(t,e){Rn(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class c_{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;yn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;yn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;yn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mb={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fb=new Ko(3e4,6e4);function _r(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function jn(t,e,n,r,i={}){return u_(t,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});const l=os(Object.assign({key:t.config.apiKey},o)).slice(1),u=await t._getAdditionalHeaders();u["Content-Type"]="application/json",t.languageCode&&(u["X-Firebase-Locale"]=t.languageCode);const h=Object.assign({method:e,headers:u},s);return lS()||(h.referrerPolicy="no-referrer"),c_.fetch()(d_(t,t.config.apiHost,n,l),h)})}async function u_(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},Mb),e);try{const i=new zb(t),s=await Promise.race([n(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw Fa(t,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const l=s.ok?o.errorMessage:o.error.message,[u,h]=l.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw Fa(t,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw Fa(t,"email-already-in-use",o);if(u==="USER_DISABLED")throw Fa(t,"user-disabled",o);const m=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw l_(t,m,h);Yt(t,m)}}catch(i){if(i instanceof Qt)throw i;Yt(t,"network-request-failed",{message:String(i)})}}async function Yo(t,e,n,r,i={}){const s=await jn(t,e,n,r,i);return"mfaPendingCredential"in s&&Yt(t,"multi-factor-auth-required",{_serverResponse:s}),s}function d_(t,e,n,r){const i=`${e}${n}?${r}`;return t.config.emulator?Of(t.config,i):`${t.config.apiScheme}://${i}`}function Ub(t){switch(t){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class zb{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(sn(this.auth,"network-request-failed")),Fb.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Fa(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const i=sn(t,e,r);return i.customData._tokenResponse=n,i}function Yg(t){return t!==void 0&&t.enterprise!==void 0}class Vb{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===e)return Ub(n.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}async function $b(t,e){return jn(t,"GET","/v2/recaptchaConfig",_r(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Bb(t,e){return jn(t,"POST","/v1/accounts:delete",e)}async function h_(t,e){return jn(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zs(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Hb(t,e=!1){const n=Re(t),r=await n.getIdToken(e),i=Df(r);G(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:Zs(Xu(i.auth_time)),issuedAtTime:Zs(Xu(i.iat)),expirationTime:Zs(Xu(i.exp)),signInProvider:o||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function Xu(t){return Number(t)*1e3}function Df(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return tl("JWT malformed, contained fewer than 3 sections"),null;try{const i=Al(n);return i?JSON.parse(i):(tl("Failed to decode base64 JWT payload"),null)}catch(i){return tl("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function Qg(t){const e=Df(t);return G(e,"internal-error"),G(typeof e.exp<"u","internal-error"),G(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qi(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof Qt&&Wb(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function Wb({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gb{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const i=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fh{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Zs(this.lastLoginAt),this.creationTime=Zs(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ll(t){var e;const n=t.auth,r=await t.getIdToken(),i=await qi(t,h_(n,{idToken:r}));G(i==null?void 0:i.users.length,n,"internal-error");const s=i.users[0];t._notifyReloadListener(s);const o=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?f_(s.providerUserInfo):[],l=Kb(t.providerData,o),u=t.isAnonymous,h=!(t.email&&s.passwordHash)&&!(l!=null&&l.length),m=u?h:!1,p={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:l,metadata:new fh(s.createdAt,s.lastLoginAt),isAnonymous:m};Object.assign(t,p)}async function qb(t){const e=Re(t);await Ll(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Kb(t,e){return[...t.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function f_(t){return t.map(e=>{var{providerId:n}=e,r=Af(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Yb(t,e){const n=await u_(t,{},async()=>{const r=os({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=t.config,o=d_(t,i,"/v1/token",`key=${s}`),l=await t._getAdditionalHeaders();return l["Content-Type"]="application/x-www-form-urlencoded",c_.fetch()(o,{method:"POST",headers:l,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function Qb(t,e){return jn(t,"POST","/v2/accounts:revokeToken",_r(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ji{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){G(e.idToken,"internal-error"),G(typeof e.idToken<"u","internal-error"),G(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Qg(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){G(e.length!==0,"internal-error");const n=Qg(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(G(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:i,expiresIn:s}=await Yb(e,n);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:i,expirationTime:s}=n,o=new ji;return r&&(G(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(G(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(G(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new ji,this.toJSON())}_performRefresh(){return yn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fn(t,e){G(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class xn{constructor(e){var{uid:n,auth:r,stsTokenManager:i}=e,s=Af(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Gb(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new fh(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const n=await qi(this,this.stsTokenManager.getToken(this.auth,e));return G(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return Hb(this,e)}reload(){return qb(this)}_assign(e){this!==e&&(G(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new xn(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){G(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await Ll(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(tn(this.auth.app))return Promise.reject(En(this.auth));const e=await this.getIdToken();return await qi(this,Bb(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,i,s,o,l,u,h,m;const p=(r=n.displayName)!==null&&r!==void 0?r:void 0,g=(i=n.email)!==null&&i!==void 0?i:void 0,E=(s=n.phoneNumber)!==null&&s!==void 0?s:void 0,I=(o=n.photoURL)!==null&&o!==void 0?o:void 0,P=(l=n.tenantId)!==null&&l!==void 0?l:void 0,L=(u=n._redirectEventId)!==null&&u!==void 0?u:void 0,N=(h=n.createdAt)!==null&&h!==void 0?h:void 0,w=(m=n.lastLoginAt)!==null&&m!==void 0?m:void 0,{uid:b,emailVerified:j,isAnonymous:O,providerData:U,stsTokenManager:x}=n;G(b&&x,e,"internal-error");const y=ji.fromJSON(this.name,x);G(typeof b=="string",e,"internal-error"),Fn(p,e.name),Fn(g,e.name),G(typeof j=="boolean",e,"internal-error"),G(typeof O=="boolean",e,"internal-error"),Fn(E,e.name),Fn(I,e.name),Fn(P,e.name),Fn(L,e.name),Fn(N,e.name),Fn(w,e.name);const _=new xn({uid:b,auth:e,email:g,emailVerified:j,displayName:p,isAnonymous:O,photoURL:I,phoneNumber:E,tenantId:P,stsTokenManager:y,createdAt:N,lastLoginAt:w});return U&&Array.isArray(U)&&(_.providerData=U.map(S=>Object.assign({},S))),L&&(_._redirectEventId=L),_}static async _fromIdTokenResponse(e,n,r=!1){const i=new ji;i.updateFromServerResponse(n);const s=new xn({uid:n.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await Ll(s),s}static async _fromGetAccountInfoResponse(e,n,r){const i=n.users[0];G(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?f_(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),l=new ji;l.updateFromIdToken(r);const u=new xn({uid:i.localId,auth:e,stsTokenManager:l,isAnonymous:o}),h={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new fh(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(u,h),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xg=new Map;function _n(t){Rn(t instanceof Function,"Expected a class definition");let e=Xg.get(t);return e?(Rn(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Xg.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class p_{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}p_.type="NONE";const Jg=p_;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nl(t,e,n){return`firebase:${t}:${e}:${n}`}class Oi{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=nl(this.userKey,i.apiKey,s),this.fullPersistenceKey=nl("persistence",i.apiKey,s),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?xn._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new Oi(_n(Jg),e,r);const i=(await Promise.all(n.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let s=i[0]||_n(Jg);const o=nl(r,e.config.apiKey,e.name);let l=null;for(const h of n)try{const m=await h._get(o);if(m){const p=xn._fromJSON(e,m);h!==s&&(l=p),s=h;break}}catch{}const u=i.filter(h=>h._shouldAllowMigration);return!s._shouldAllowMigration||!u.length?new Oi(s,e,r):(s=u[0],l&&await s._set(o,l.toJSON()),await Promise.all(n.map(async h=>{if(h!==s)try{await h._remove(o)}catch{}})),new Oi(s,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zg(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(y_(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(m_(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(__(e))return"Blackberry";if(w_(e))return"Webos";if(g_(e))return"Safari";if((e.includes("chrome/")||v_(e))&&!e.includes("edge/"))return"Chrome";if(x_(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function m_(t=ot()){return/firefox\//i.test(t)}function g_(t=ot()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function v_(t=ot()){return/crios\//i.test(t)}function y_(t=ot()){return/iemobile/i.test(t)}function x_(t=ot()){return/android/i.test(t)}function __(t=ot()){return/blackberry/i.test(t)}function w_(t=ot()){return/webos/i.test(t)}function Lf(t=ot()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function Xb(t=ot()){var e;return Lf(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Jb(){return cS()&&document.documentMode===10}function k_(t=ot()){return Lf(t)||x_(t)||w_(t)||__(t)||/windows phone/i.test(t)||y_(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function E_(t,e=[]){let n;switch(t){case"Browser":n=Zg(ot());break;case"Worker":n=`${Zg(ot())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Zr}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zb{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=s=>new Promise((o,l)=>{try{const u=e(s);o(u)}catch(u){l(u)}});r.onAbort=n,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const i of n)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eN(t,e={}){return jn(t,"GET","/v2/passwordPolicy",_r(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tN=6;class nN{constructor(e){var n,r,i,s;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=o.minPasswordLength)!==null&&n!==void 0?n:tN,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,i,s,o,l;const u={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,u),this.validatePasswordCharacterOptions(e,u),u.isValid&&(u.isValid=(n=u.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),u.isValid&&(u.isValid=(r=u.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),u.isValid&&(u.isValid=(i=u.containsLowercaseLetter)!==null&&i!==void 0?i:!0),u.isValid&&(u.isValid=(s=u.containsUppercaseLetter)!==null&&s!==void 0?s:!0),u.isValid&&(u.isValid=(o=u.containsNumericCharacter)!==null&&o!==void 0?o:!0),u.isValid&&(u.isValid=(l=u.containsNonAlphanumericCharacter)!==null&&l!==void 0?l:!0),u}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),i&&(n.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rN{constructor(e,n,r,i){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new e0(this),this.idTokenSubscription=new e0(this),this.beforeStateQueue=new Zb(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=a_,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=_n(n)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await Oi.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await h_(this,{idToken:e}),r=await xn._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(tn(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(l,l))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,l=i==null?void 0:i._redirectEventId,u=await this.tryRedirectSignIn(e);(!o||o===l)&&(u!=null&&u.user)&&(i=u.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return G(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Ll(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Lb()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(tn(this.app))return Promise.reject(En(this));const n=e?Re(e):null;return n&&G(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&G(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return tn(this.app)?Promise.reject(En(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return tn(this.app)?Promise.reject(En(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(_n(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await eN(this),n=new nN(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Jr("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await Qb(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&_n(e)||this._popupRedirectResolver;G(n,this,"argument-error"),this.redirectPersistenceManager=await Oi.create(this,[_n(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,i){if(this._deleted)return()=>{};const s=typeof n=="function"?n:n.next.bind(n);let o=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(G(l,this,"internal-error"),l.then(()=>{o||s(this.currentUser)}),typeof n=="function"){const u=e.addObserver(n,r,i);return()=>{o=!0,u()}}else{const u=e.addObserver(n);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return G(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=E_(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const i=await this._getAppCheckToken();return i&&(n["X-Firebase-AppCheck"]=i),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&jb(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function ei(t){return Re(t)}class e0{constructor(e){this.auth=e,this.observer=null,this.addObserver=yS(n=>this.observer=n)}get next(){return G(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Tc={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function iN(t){Tc=t}function S_(t){return Tc.loadJS(t)}function sN(){return Tc.recaptchaEnterpriseScript}function oN(){return Tc.gapiScript}function aN(t){return`__${t}${Math.floor(Math.random()*1e6)}`}const lN="recaptcha-enterprise",cN="NO_RECAPTCHA";class uN{constructor(e){this.type=lN,this.auth=ei(e)}async verify(e="verify",n=!1){async function r(s){if(!n){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(o,l)=>{$b(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)l(new Error("recaptcha Enterprise site key undefined"));else{const h=new Vb(u);return s.tenantId==null?s._agentRecaptchaConfig=h:s._tenantRecaptchaConfigs[s.tenantId]=h,o(h.siteKey)}}).catch(u=>{l(u)})})}function i(s,o,l){const u=window.grecaptcha;Yg(u)?u.enterprise.ready(()=>{u.enterprise.execute(s,{action:e}).then(h=>{o(h)}).catch(()=>{o(cN)})}):l(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((s,o)=>{r(this.auth).then(l=>{if(!n&&Yg(window.grecaptcha))i(l,s,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let u=sN();u.length!==0&&(u+=l),S_(u).then(()=>{i(l,s,o)}).catch(h=>{o(h)})}}).catch(l=>{o(l)})})}}async function t0(t,e,n,r=!1){const i=new uN(t);let s;try{s=await i.verify(n)}catch{s=await i.verify(n,!0)}const o=Object.assign({},e);return r?Object.assign(o,{captchaResp:s}):Object.assign(o,{captchaResponse:s}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function ph(t,e,n,r){var i;if(!((i=t._getRecaptchaConfig())===null||i===void 0)&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const s=await t0(t,e,n,n==="getOobCode");return r(t,s)}else return r(t,e).catch(async s=>{if(s.code==="auth/missing-recaptcha-token"){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await t0(t,e,n,n==="getOobCode");return r(t,o)}else return Promise.reject(s)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dN(t,e){const n=xr(t,"auth");if(n.isInitialized()){const i=n.getImmediate(),s=n.getOptions();if(Io(s,e??{}))return i;Yt(i,"already-initialized")}return n.initialize({options:e})}function hN(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(_n);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function fN(t,e,n){const r=ei(t);G(r._canInitEmulator,r,"emulator-config-failed"),G(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,s=b_(e),{host:o,port:l}=pN(e),u=l===null?"":`:${l}`;r.config.emulator={url:`${s}//${o}${u}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:l,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})}),mN()}function b_(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function pN(t){const e=b_(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:n0(r.substr(s.length+1))}}else{const[s,o]=r.split(":");return{host:s,port:n0(o)}}}function n0(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function mN(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mf{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return yn("not implemented")}_getIdTokenResponse(e){return yn("not implemented")}_linkToIdToken(e,n){return yn("not implemented")}_getReauthenticationResolver(e){return yn("not implemented")}}async function gN(t,e){return jn(t,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vN(t,e){return Yo(t,"POST","/v1/accounts:signInWithPassword",_r(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yN(t,e){return Yo(t,"POST","/v1/accounts:signInWithEmailLink",_r(t,e))}async function xN(t,e){return Yo(t,"POST","/v1/accounts:signInWithEmailLink",_r(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ro extends Mf{constructor(e,n,r,i=null){super("password",r),this._email=e,this._password=n,this._tenantId=i}static _fromEmailAndPassword(e,n){return new Ro(e,n,"password")}static _fromEmailAndCode(e,n,r=null){return new Ro(e,n,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ph(e,n,"signInWithPassword",vN);case"emailLink":return yN(e,{email:this._email,oobCode:this._password});default:Yt(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":const r={idToken:n,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ph(e,r,"signUpPassword",gN);case"emailLink":return xN(e,{idToken:n,email:this._email,oobCode:this._password});default:Yt(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Di(t,e){return Yo(t,"POST","/v1/accounts:signInWithIdp",_r(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _N="http://localhost";class $r extends Mf{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new $r(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):Yt("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=n,s=Af(n,["providerId","signInMethod"]);if(!r||!i)return null;const o=new $r(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Di(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,Di(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Di(e,n)}buildRequest(){const e={requestUri:_N,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=os(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wN(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function kN(t){const e=Vs($s(t)).link,n=e?Vs($s(e)).deep_link_id:null,r=Vs($s(t)).deep_link_id;return(r?Vs($s(r)).link:null)||r||n||e||t}class Ff{constructor(e){var n,r,i,s,o,l;const u=Vs($s(e)),h=(n=u.apiKey)!==null&&n!==void 0?n:null,m=(r=u.oobCode)!==null&&r!==void 0?r:null,p=wN((i=u.mode)!==null&&i!==void 0?i:null);G(h&&m&&p,"argument-error"),this.apiKey=h,this.operation=p,this.code=m,this.continueUrl=(s=u.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(o=u.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(l=u.tenantId)!==null&&l!==void 0?l:null}static parseLink(e){const n=kN(e);try{return new Ff(n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class as{constructor(){this.providerId=as.PROVIDER_ID}static credential(e,n){return Ro._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const r=Ff.parseLink(n);return G(r,"argument-error"),Ro._fromEmailAndCode(e,r.code,r.tenantId)}}as.PROVIDER_ID="password";as.EMAIL_PASSWORD_SIGN_IN_METHOD="password";as.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N_{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qo extends N_{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hn extends Qo{constructor(){super("facebook.com")}static credential(e){return $r._fromParams({providerId:Hn.PROVIDER_ID,signInMethod:Hn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Hn.credentialFromTaggedObject(e)}static credentialFromError(e){return Hn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Hn.credential(e.oauthAccessToken)}catch{return null}}}Hn.FACEBOOK_SIGN_IN_METHOD="facebook.com";Hn.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wn extends Qo{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return $r._fromParams({providerId:Wn.PROVIDER_ID,signInMethod:Wn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Wn.credentialFromTaggedObject(e)}static credentialFromError(e){return Wn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return Wn.credential(n,r)}catch{return null}}}Wn.GOOGLE_SIGN_IN_METHOD="google.com";Wn.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gn extends Qo{constructor(){super("github.com")}static credential(e){return $r._fromParams({providerId:Gn.PROVIDER_ID,signInMethod:Gn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Gn.credentialFromTaggedObject(e)}static credentialFromError(e){return Gn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Gn.credential(e.oauthAccessToken)}catch{return null}}}Gn.GITHUB_SIGN_IN_METHOD="github.com";Gn.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qn extends Qo{constructor(){super("twitter.com")}static credential(e,n){return $r._fromParams({providerId:qn.PROVIDER_ID,signInMethod:qn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return qn.credentialFromTaggedObject(e)}static credentialFromError(e){return qn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return qn.credential(n,r)}catch{return null}}}qn.TWITTER_SIGN_IN_METHOD="twitter.com";qn.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function EN(t,e){return Yo(t,"POST","/v1/accounts:signUp",_r(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Br{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,i=!1){const s=await xn._fromIdTokenResponse(e,r,i),o=r0(r);return new Br({user:s,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const i=r0(r);return new Br({user:e,providerId:i,_tokenResponse:r,operationType:n})}}function r0(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ml extends Qt{constructor(e,n,r,i){var s;super(n.code,n.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,Ml.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,i){return new Ml(e,n,r,i)}}function C_(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?Ml._fromErrorAndOperation(t,s,e,r):s})}async function SN(t,e,n=!1){const r=await qi(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Br._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bN(t,e,n=!1){const{auth:r}=t;if(tn(r.app))return Promise.reject(En(r));const i="reauthenticate";try{const s=await qi(t,C_(r,i,e,t),n);G(s.idToken,r,"internal-error");const o=Df(s.idToken);G(o,r,"internal-error");const{sub:l}=o;return G(t.uid===l,r,"user-mismatch"),Br._forOperation(t,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&Yt(r,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function I_(t,e,n=!1){if(tn(t.app))return Promise.reject(En(t));const r="signIn",i=await C_(t,r,e),s=await Br._fromIdTokenResponse(t,r,i);return n||await t._updateCurrentUser(s.user),s}async function NN(t,e){return I_(ei(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function T_(t){const e=ei(t);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function CN(t,e,n){if(tn(t.app))return Promise.reject(En(t));const r=ei(t),o=await ph(r,{returnSecureToken:!0,email:e,password:n,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",EN).catch(u=>{throw u.code==="auth/password-does-not-meet-requirements"&&T_(t),u}),l=await Br._fromIdTokenResponse(r,"signIn",o);return await r._updateCurrentUser(l.user),l}function IN(t,e,n){return tn(t.app)?Promise.reject(En(t)):NN(Re(t),as.credential(e,n)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&T_(t),r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function TN(t,e){return jn(t,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function RN(t,{displayName:e,photoURL:n}){if(e===void 0&&n===void 0)return;const r=Re(t),s={idToken:await r.getIdToken(),displayName:e,photoUrl:n,returnSecureToken:!0},o=await qi(r,TN(r.auth,s));r.displayName=o.displayName||null,r.photoURL=o.photoUrl||null;const l=r.providerData.find(({providerId:u})=>u==="password");l&&(l.displayName=r.displayName,l.photoURL=r.photoURL),await r._updateTokensIfNecessary(o)}function PN(t,e,n,r){return Re(t).onIdTokenChanged(e,n,r)}function AN(t,e,n){return Re(t).beforeAuthStateChanged(e,n)}function jN(t,e,n,r){return Re(t).onAuthStateChanged(e,n,r)}function ON(t){return Re(t).signOut()}const Fl="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class R_{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Fl,"1"),this.storage.removeItem(Fl),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DN=1e3,LN=10;class P_ extends R_{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=k_(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),i=this.localCache[n];r!==i&&e(n,i,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,l,u)=>{this.notifyListeners(o,u)});return}const r=e.key;n?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);Jb()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,LN):i()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},DN)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}P_.type="LOCAL";const MN=P_;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A_ extends R_{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}A_.type="SESSION";const j_=A_;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function FN(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rc{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(i=>i.isListeningto(e));if(n)return n;const r=new Rc(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:i,data:s}=n.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const l=Array.from(o).map(async h=>h(n.origin,s)),u=await FN(l);n.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:u})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Rc.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uf(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UN{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((l,u)=>{const h=Uf("",20);i.port1.start();const m=setTimeout(()=>{u(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(p){const g=p;if(g.data.eventId===h)switch(g.data.status){case"ack":clearTimeout(m),s=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),l(g.data.response);break;default:clearTimeout(m),clearTimeout(s),u(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:h,data:n},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function on(){return window}function zN(t){on().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function O_(){return typeof on().WorkerGlobalScope<"u"&&typeof on().importScripts=="function"}async function VN(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function $N(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function BN(){return O_()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const D_="firebaseLocalStorageDb",HN=1,Ul="firebaseLocalStorage",L_="fbase_key";class Xo{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function Pc(t,e){return t.transaction([Ul],e?"readwrite":"readonly").objectStore(Ul)}function WN(){const t=indexedDB.deleteDatabase(D_);return new Xo(t).toPromise()}function mh(){const t=indexedDB.open(D_,HN);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(Ul,{keyPath:L_})}catch(i){n(i)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(Ul)?e(r):(r.close(),await WN(),e(await mh()))})})}async function i0(t,e,n){const r=Pc(t,!0).put({[L_]:e,value:n});return new Xo(r).toPromise()}async function GN(t,e){const n=Pc(t,!1).get(e),r=await new Xo(n).toPromise();return r===void 0?null:r.value}function s0(t,e){const n=Pc(t,!0).delete(e);return new Xo(n).toPromise()}const qN=800,KN=3;class M_{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await mh(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>KN)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return O_()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Rc._getInstance(BN()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await VN(),!this.activeServiceWorker)return;this.sender=new UN(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||$N()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await mh();return await i0(e,Fl,"1"),await s0(e,Fl),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>i0(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>GN(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>s0(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=Pc(i,!1).getAll();return new Xo(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),n.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),n.push(i));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),qN)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}M_.type="LOCAL";const YN=M_;new Ko(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function QN(t,e){return e?_n(e):(G(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zf extends Mf{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Di(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Di(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Di(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function XN(t){return I_(t.auth,new zf(t),t.bypassAuthState)}function JN(t){const{auth:e,user:n}=t;return G(n,e,"internal-error"),bN(n,new zf(t),t.bypassAuthState)}async function ZN(t){const{auth:e,user:n}=t;return G(n,e,"internal-error"),SN(n,new zf(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F_{constructor(e,n,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:i,tenantId:s,error:o,type:l}=e;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:n,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(u))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return XN;case"linkViaPopup":case"linkViaRedirect":return ZN;case"reauthViaPopup":case"reauthViaRedirect":return JN;default:Yt(this.auth,"internal-error")}}resolve(e){Rn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Rn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eC=new Ko(2e3,1e4);class bi extends F_{constructor(e,n,r,i,s){super(e,n,i,s),this.provider=r,this.authWindow=null,this.pollId=null,bi.currentPopupAction&&bi.currentPopupAction.cancel(),bi.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return G(e,this.auth,"internal-error"),e}async onExecution(){Rn(this.filter.length===1,"Popup operations only handle one event");const e=Uf();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(sn(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(sn(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,bi.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(sn(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,eC.get())};e()}}bi.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tC="pendingRedirect",rl=new Map;class nC extends F_{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=rl.get(this.auth._key());if(!e){try{const r=await rC(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}rl.set(this.auth._key(),e)}return this.bypassAuthState||rl.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function rC(t,e){const n=oC(e),r=sC(t);if(!await r._isAvailable())return!1;const i=await r._get(n)==="true";return await r._remove(n),i}function iC(t,e){rl.set(t._key(),e)}function sC(t){return _n(t._redirectPersistence)}function oC(t){return nl(tC,t.config.apiKey,t.name)}async function aC(t,e,n=!1){if(tn(t.app))return Promise.reject(En(t));const r=ei(t),i=QN(r,e),o=await new nC(r,i,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lC=10*60*1e3;class cC{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!uC(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!U_(e)){const i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(sn(this.auth,i))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=lC&&this.cachedEventUids.clear(),this.cachedEventUids.has(o0(e))}saveEventToCache(e){this.cachedEventUids.add(o0(e)),this.lastProcessedEventTime=Date.now()}}function o0(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function U_({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function uC(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return U_(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function dC(t,e={}){return jn(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hC=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,fC=/^https?/;async function pC(t){if(t.config.emulator)return;const{authorizedDomains:e}=await dC(t);for(const n of e)try{if(mC(n))return}catch{}Yt(t,"unauthorized-domain")}function mC(t){const e=hh(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!fC.test(n))return!1;if(hC.test(t))return r===t;const i=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gC=new Ko(3e4,6e4);function a0(){const t=on().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function vC(t){return new Promise((e,n)=>{var r,i,s;function o(){a0(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{a0(),n(sn(t,"network-request-failed"))},timeout:gC.get()})}if(!((i=(r=on().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=on().gapi)===null||s===void 0)&&s.load)o();else{const l=aN("iframefcb");return on()[l]=()=>{gapi.load?o():n(sn(t,"network-request-failed"))},S_(`${oN()}?onload=${l}`).catch(u=>n(u))}}).catch(e=>{throw il=null,e})}let il=null;function yC(t){return il=il||vC(t),il}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xC=new Ko(5e3,15e3),_C="__/auth/iframe",wC="emulator/auth/iframe",kC={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},EC=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function SC(t){const e=t.config;G(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Of(e,wC):`https://${t.config.authDomain}/${_C}`,r={apiKey:e.apiKey,appName:t.name,v:Zr},i=EC.get(t.config.apiHost);i&&(r.eid=i);const s=t._getFrameworks();return s.length&&(r.fw=s.join(",")),`${n}?${os(r).slice(1)}`}async function bC(t){const e=await yC(t),n=on().gapi;return G(n,t,"internal-error"),e.open({where:document.body,url:SC(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:kC,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const o=sn(t,"network-request-failed"),l=on().setTimeout(()=>{s(o)},xC.get());function u(){on().clearTimeout(l),i(r)}r.ping(u).then(u,()=>{s(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const NC={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},CC=500,IC=600,TC="_blank",RC="http://localhost";class l0{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function PC(t,e,n,r=CC,i=IC){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const u=Object.assign(Object.assign({},NC),{width:r.toString(),height:i.toString(),top:s,left:o}),h=ot().toLowerCase();n&&(l=v_(h)?TC:n),m_(h)&&(e=e||RC,u.scrollbars="yes");const m=Object.entries(u).reduce((g,[E,I])=>`${g}${E}=${I},`,"");if(Xb(h)&&l!=="_self")return AC(e||"",l),new l0(null);const p=window.open(e||"",l,m);G(p,t,"popup-blocked");try{p.focus()}catch{}return new l0(p)}function AC(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jC="__/auth/handler",OC="emulator/auth/handler",DC=encodeURIComponent("fac");async function c0(t,e,n,r,i,s){G(t.config.authDomain,t,"auth-domain-config-required"),G(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:Zr,eventId:i};if(e instanceof N_){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",oh(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[m,p]of Object.entries({}))o[m]=p}if(e instanceof Qo){const m=e.getScopes().filter(p=>p!=="");m.length>0&&(o.scopes=m.join(","))}t.tenantId&&(o.tid=t.tenantId);const l=o;for(const m of Object.keys(l))l[m]===void 0&&delete l[m];const u=await t._getAppCheckToken(),h=u?`#${DC}=${encodeURIComponent(u)}`:"";return`${LC(t)}?${os(l).slice(1)}${h}`}function LC({config:t}){return t.emulator?Of(t,OC):`https://${t.authDomain}/${jC}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ju="webStorageSupport";class MC{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=j_,this._completeRedirectFn=aC,this._overrideRedirectResult=iC}async _openPopup(e,n,r,i){var s;Rn((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");const o=await c0(e,n,r,hh(),i);return PC(e,o,Uf())}async _openRedirect(e,n,r,i){await this._originValidation(e);const s=await c0(e,n,r,hh(),i);return zN(s),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:i,promise:s}=this.eventManagers[n];return i?Promise.resolve(i):(Rn(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await bC(e),r=new cC(e);return n.register("authEvent",i=>(G(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Ju,{type:Ju},i=>{var s;const o=(s=i==null?void 0:i[0])===null||s===void 0?void 0:s[Ju];o!==void 0&&n(!!o),Yt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=pC(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return k_()||g_()||Lf()}}const FC=MC;var u0="@firebase/auth",d0="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UC{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){G(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zC(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function VC(t){Kt(new Dt("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:l}=r.options;G(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:o,authDomain:l,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:E_(t)},h=new rN(r,i,s,u);return hN(h,n),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),Kt(new Dt("auth-internal",e=>{const n=ei(e.getProvider("auth").getImmediate());return(r=>new UC(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),vt(u0,d0,zC(t)),vt(u0,d0,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $C=5*60,BC=qx("authIdTokenMaxAge")||$C;let h0=null;const HC=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>BC)return;const i=n==null?void 0:n.token;h0!==i&&(h0=i,await fetch(t,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function WC(t=Ic()){const e=xr(t,"auth");if(e.isInitialized())return e.getImmediate();const n=dN(t,{popupRedirectResolver:FC,persistence:[YN,MN,j_]}),r=qx("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const o=HC(s.toString());AN(n,o,()=>o(n.currentUser)),PN(n,l=>o(l))}}const i=Hx("auth");return i&&fN(n,`http://${i}`),n}function GC(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}iN({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=i=>{const s=sn("internal-error");s.customData=i,n(s)},r.type="text/javascript",r.charset="UTF-8",GC().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});VC("Browser");var qC="firebase",KC="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */vt(qC,KC,"app");var f0={};const p0="@firebase/database",m0="1.0.8";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let z_="";function YC(t){z_=t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QC{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),je(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:Co(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XC{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return Xt(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const V_=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new QC(e)}}catch{}return new XC},Pr=V_("localStorage"),JC=V_("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Li=new qo("@firebase/database"),$_=function(){let t=1;return function(){return t++}}(),B_=function(t){const e=wS(t),n=new vS;n.update(e);const r=n.digest();return If.encodeByteArray(r)},Jo=function(...t){let e="";for(let n=0;n<t.length;n++){const r=t[n];Array.isArray(r)||r&&typeof r=="object"&&typeof r.length=="number"?e+=Jo.apply(null,r):typeof r=="object"?e+=je(r):e+=r,e+=" "}return e};let eo=null,g0=!0;const ZC=function(t,e){F(!0,"Can't turn on custom loggers persistently."),Li.logLevel=ie.VERBOSE,eo=Li.log.bind(Li)},Ve=function(...t){if(g0===!0&&(g0=!1,eo===null&&JC.get("logging_enabled")===!0&&ZC()),eo){const e=Jo.apply(null,t);eo(e)}},Zo=function(t){return function(...e){Ve(t,...e)}},gh=function(...t){const e="FIREBASE INTERNAL ERROR: "+Jo(...t);Li.error(e)},Pn=function(...t){const e=`FIREBASE FATAL ERROR: ${Jo(...t)}`;throw Li.error(e),new Error(e)},st=function(...t){const e="FIREBASE WARNING: "+Jo(...t);Li.warn(e)},eI=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&st("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Vf=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},tI=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},Ki="[MIN_NAME]",Hr="[MAX_NAME]",ti=function(t,e){if(t===e)return 0;if(t===Ki||e===Hr)return-1;if(e===Ki||t===Hr)return 1;{const n=v0(t),r=v0(e);return n!==null?r!==null?n-r===0?t.length-e.length:n-r:-1:r!==null?1:t<e?-1:1}},nI=function(t,e){return t===e?0:t<e?-1:1},As=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+je(e))},$f=function(t){if(typeof t!="object"||t===null)return je(t);const e=[];for(const r in t)e.push(r);e.sort();let n="{";for(let r=0;r<e.length;r++)r!==0&&(n+=","),n+=je(e[r]),n+=":",n+=$f(t[e[r]]);return n+="}",n},H_=function(t,e){const n=t.length;if(n<=e)return[t];const r=[];for(let i=0;i<n;i+=e)i+e>n?r.push(t.substring(i,n)):r.push(t.substring(i,i+e));return r};function He(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const W_=function(t){F(!Vf(t),"Invalid JSON number");const e=11,n=52,r=(1<<e-1)-1;let i,s,o,l,u;t===0?(s=0,o=0,i=1/t===-1/0?1:0):(i=t<0,t=Math.abs(t),t>=Math.pow(2,1-r)?(l=Math.min(Math.floor(Math.log(t)/Math.LN2),r),s=l+r,o=Math.round(t*Math.pow(2,n-l)-Math.pow(2,n))):(s=0,o=Math.round(t/Math.pow(2,1-r-n))));const h=[];for(u=n;u;u-=1)h.push(o%2?1:0),o=Math.floor(o/2);for(u=e;u;u-=1)h.push(s%2?1:0),s=Math.floor(s/2);h.push(i?1:0),h.reverse();const m=h.join("");let p="";for(u=0;u<64;u+=8){let g=parseInt(m.substr(u,8),2).toString(16);g.length===1&&(g="0"+g),p=p+g}return p.toLowerCase()},rI=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},iI=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function sI(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const r=new Error(t+" at "+e._path.toString()+": "+n);return r.code=t.toUpperCase(),r}const oI=new RegExp("^-?(0*)\\d{1,10}$"),aI=-2147483648,lI=2147483647,v0=function(t){if(oI.test(t)){const e=Number(t);if(e>=aI&&e<=lI)return e}return null},ls=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw st("Exception was thrown by user callback.",n),e},Math.floor(0))}},cI=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},to=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uI{constructor(e,n){this.appName_=e,this.appCheckProvider=n,this.appCheck=n==null?void 0:n.getImmediate({optional:!0}),this.appCheck||n==null||n.get().then(r=>this.appCheck=r)}getToken(e){return this.appCheck?this.appCheck.getToken(e):new Promise((n,r)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,r):n(null)},0)})}addTokenChangeListener(e){var n;(n=this.appCheckProvider)===null||n===void 0||n.get().then(r=>r.addTokenListener(e))}notifyForInvalidToken(){st(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dI{constructor(e,n,r){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=r,this.auth_=null,this.auth_=r.getImmediate({optional:!0}),this.auth_||r.onInit(i=>this.auth_=i)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(Ve("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,r)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,r):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',st(e)}}class sl{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}sl.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bf="5",G_="v",q_="s",K_="r",Y_="f",Q_=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,X_="ls",J_="p",vh="ac",Z_="websocket",ew="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tw{constructor(e,n,r,i,s=!1,o="",l=!1,u=!1){this.secure=n,this.namespace=r,this.webSocketOnly=i,this.nodeAdmin=s,this.persistenceKey=o,this.includeNamespaceInQueryParams=l,this.isUsingEmulator=u,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=Pr.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&Pr.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function hI(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function nw(t,e,n){F(typeof e=="string","typeof type must == string"),F(typeof n=="object","typeof params must == object");let r;if(e===Z_)r=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===ew)r=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);hI(t)&&(n.ns=t.namespace);const i=[];return He(n,(s,o)=>{i.push(s+"="+o)}),r+i.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fI{constructor(){this.counters_={}}incrementCounter(e,n=1){Xt(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return nS(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zu={},ed={};function Hf(t){const e=t.toString();return Zu[e]||(Zu[e]=new fI),Zu[e]}function pI(t,e){const n=t.toString();return ed[n]||(ed[n]=e()),ed[n]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mI{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const r=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let i=0;i<r.length;++i)r[i]&&ls(()=>{this.onMessage_(r[i])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const y0="start",gI="close",vI="pLPCommand",yI="pRTLPCB",rw="id",iw="pw",sw="ser",xI="cb",_I="seg",wI="ts",kI="d",EI="dframe",ow=1870,aw=30,SI=ow-aw,bI=25e3,NI=3e4;class Ni{constructor(e,n,r,i,s,o,l){this.connId=e,this.repoInfo=n,this.applicationId=r,this.appCheckToken=i,this.authToken=s,this.transportSessionId=o,this.lastSessionId=l,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Zo(e),this.stats_=Hf(n),this.urlFn=u=>(this.appCheckToken&&(u[vh]=this.appCheckToken),nw(n,ew,u))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new mI(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(NI)),tI(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Wf((...s)=>{const[o,l,u,h,m]=s;if(this.incrementIncomingBytes_(s),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===y0)this.id=l,this.password=u;else if(o===gI)l?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(l,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...s)=>{const[o,l]=s;this.incrementIncomingBytes_(s),this.myPacketOrderer.handleResponse(o,l)},()=>{this.onClosed_()},this.urlFn);const r={};r[y0]="t",r[sw]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(r[xI]=this.scriptTagHolder.uniqueCallbackIdentifier),r[G_]=Bf,this.transportSessionId&&(r[q_]=this.transportSessionId),this.lastSessionId&&(r[X_]=this.lastSessionId),this.applicationId&&(r[J_]=this.applicationId),this.appCheckToken&&(r[vh]=this.appCheckToken),typeof location<"u"&&location.hostname&&Q_.test(location.hostname)&&(r[K_]=Y_);const i=this.urlFn(r);this.log_("Connecting via long-poll to "+i),this.scriptTagHolder.addTag(i,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Ni.forceAllow_=!0}static forceDisallow(){Ni.forceDisallow_=!0}static isAvailable(){return Ni.forceAllow_?!0:!Ni.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!rI()&&!iI()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=je(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const r=$x(n),i=H_(r,SI);for(let s=0;s<i.length;s++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[s]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const r={};r[EI]="t",r[rw]=e,r[iw]=n,this.myDisconnFrame.src=this.urlFn(r),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=je(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class Wf{constructor(e,n,r,i){this.onDisconnect=r,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=$_(),window[vI+this.uniqueCallbackIdentifier]=e,window[yI+this.uniqueCallbackIdentifier]=n,this.myIFrame=Wf.createIFrame_();let s="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(s='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+s+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(l){Ve("frame writing exception"),l.stack&&Ve(l.stack),Ve(l)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||Ve("No IE domain setting required")}catch{const r=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+r+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[rw]=this.myID,e[iw]=this.myPW,e[sw]=this.currentSerial;let n=this.urlFn(e),r="",i=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+aw+r.length<=ow;){const o=this.pendingSegs.shift();r=r+"&"+_I+i+"="+o.seg+"&"+wI+i+"="+o.ts+"&"+kI+i+"="+o.d,i++}return n=n+r,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,r){this.pendingSegs.push({seg:e,ts:n,d:r}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const r=()=>{this.outstandingRequests.delete(n),this.newRequest_()},i=setTimeout(r,Math.floor(bI)),s=()=>{clearTimeout(i),r()};this.addTag(e,s)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const r=this.myIFrame.doc.createElement("script");r.type="text/javascript",r.async=!0,r.src=e,r.onload=r.onreadystatechange=function(){const i=r.readyState;(!i||i==="loaded"||i==="complete")&&(r.onload=r.onreadystatechange=null,r.parentNode&&r.parentNode.removeChild(r),n())},r.onerror=()=>{Ve("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(r)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CI=16384,II=45e3;let zl=null;typeof MozWebSocket<"u"?zl=MozWebSocket:typeof WebSocket<"u"&&(zl=WebSocket);class Vt{constructor(e,n,r,i,s,o,l){this.connId=e,this.applicationId=r,this.appCheckToken=i,this.authToken=s,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Zo(this.connId),this.stats_=Hf(n),this.connURL=Vt.connectionURL_(n,o,l,i,r),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,r,i,s){const o={};return o[G_]=Bf,typeof location<"u"&&location.hostname&&Q_.test(location.hostname)&&(o[K_]=Y_),n&&(o[q_]=n),r&&(o[X_]=r),i&&(o[vh]=i),s&&(o[J_]=s),nw(e,Z_,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,Pr.set("previous_websocket_failure",!0);try{let r;uS(),this.mySock=new zl(this.connURL,[],r)}catch(r){this.log_("Error instantiating WebSocket.");const i=r.message||r.data;i&&this.log_(i),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=r=>{this.handleIncomingFrame(r)},this.mySock.onerror=r=>{this.log_("WebSocket error.  Closing connection.");const i=r.message||r.data;i&&this.log_(i),this.onClosed_()}}start(){}static forceDisallow(){Vt.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,r=navigator.userAgent.match(n);r&&r.length>1&&parseFloat(r[1])<4.4&&(e=!0)}return!e&&zl!==null&&!Vt.forceDisallow_}static previouslyFailed(){return Pr.isInMemoryStorage||Pr.get("previous_websocket_failure")===!0}markConnectionHealthy(){Pr.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const r=Co(n);this.onMessage(r)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(F(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const r=this.extractFrameCount_(n);r!==null&&this.appendFrame_(r)}}send(e){this.resetKeepAlive();const n=je(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const r=H_(n,CI);r.length>1&&this.sendString_(String(r.length));for(let i=0;i<r.length;i++)this.sendString_(r[i])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(II))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}Vt.responsesRequiredToBeHealthy=2;Vt.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Po{constructor(e){this.initTransports_(e)}static get ALL_TRANSPORTS(){return[Ni,Vt]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}initTransports_(e){const n=Vt&&Vt.isAvailable();let r=n&&!Vt.previouslyFailed();if(e.webSocketOnly&&(n||st("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),r=!0),r)this.transports_=[Vt];else{const i=this.transports_=[];for(const s of Po.ALL_TRANSPORTS)s&&s.isAvailable()&&i.push(s);Po.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Po.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const TI=6e4,RI=5e3,PI=10*1024,AI=100*1024,td="t",x0="d",jI="s",_0="r",OI="e",w0="o",k0="a",E0="n",S0="p",DI="h";class LI{constructor(e,n,r,i,s,o,l,u,h,m){this.id=e,this.repoInfo_=n,this.applicationId_=r,this.appCheckToken_=i,this.authToken_=s,this.onMessage_=o,this.onReady_=l,this.onDisconnect_=u,this.onKill_=h,this.lastSessionId=m,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Zo("c:"+this.id+":"),this.transportManager_=new Po(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),r=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,r)},Math.floor(0));const i=e.healthyTimeout||0;i>0&&(this.healthyTimeout_=to(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>AI?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>PI?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(i)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(td in e){const n=e[td];n===k0?this.upgradeIfSecondaryHealthy_():n===_0?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===w0&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=As("t",e),r=As("d",e);if(n==="c")this.onSecondaryControl_(r);else if(n==="d")this.pendingDataMessages.push(r);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:S0,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:k0,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:E0,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=As("t",e),r=As("d",e);n==="c"?this.onControl_(r):n==="d"&&this.onDataMessage_(r)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=As(td,e);if(x0 in e){const r=e[x0];if(n===DI){const i=Object.assign({},r);this.repoInfo_.isUsingEmulator&&(i.h=this.repoInfo_.host),this.onHandshake_(i)}else if(n===E0){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let i=0;i<this.pendingDataMessages.length;++i)this.onDataMessage_(this.pendingDataMessages[i]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===jI?this.onConnectionShutdown_(r):n===_0?this.onReset_(r):n===OI?gh("Server Error: "+r):n===w0?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):gh("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,r=e.v,i=e.h;this.sessionId=e.s,this.repoInfo_.host=i,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),Bf!==r&&st("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),r=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,r),to(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(TI))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):to(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(RI))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:S0,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(Pr.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lw{put(e,n,r,i){}merge(e,n,r,i){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,r){}onDisconnectMerge(e,n,r){}onDisconnectCancel(e,n){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cw{constructor(e){this.allowedEvents_=e,this.listeners_={},F(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const r=[...this.listeners_[e]];for(let i=0;i<r.length;i++)r[i].callback.apply(r[i].context,n)}}on(e,n,r){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:r});const i=this.getInitialEvent(e);i&&n.apply(r,i)}off(e,n,r){this.validateEventType_(e);const i=this.listeners_[e]||[];for(let s=0;s<i.length;s++)if(i[s].callback===n&&(!r||r===i[s].context)){i.splice(s,1);return}}validateEventType_(e){F(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vl extends cw{constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Rf()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}static getInstance(){return new Vl}getInitialEvent(e){return F(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b0=32,N0=768;class le{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let r=0;for(let i=0;i<this.pieces_.length;i++)this.pieces_[i].length>0&&(this.pieces_[r]=this.pieces_[i],r++);this.pieces_.length=r,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function re(){return new le("")}function Y(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function fr(t){return t.pieces_.length-t.pieceNum_}function de(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new le(t.pieces_,e)}function Gf(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function MI(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function Ao(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function uw(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new le(e,0)}function Ee(t,e){const n=[];for(let r=t.pieceNum_;r<t.pieces_.length;r++)n.push(t.pieces_[r]);if(e instanceof le)for(let r=e.pieceNum_;r<e.pieces_.length;r++)n.push(e.pieces_[r]);else{const r=e.split("/");for(let i=0;i<r.length;i++)r[i].length>0&&n.push(r[i])}return new le(n,0)}function X(t){return t.pieceNum_>=t.pieces_.length}function rt(t,e){const n=Y(t),r=Y(e);if(n===null)return e;if(n===r)return rt(de(t),de(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function FI(t,e){const n=Ao(t,0),r=Ao(e,0);for(let i=0;i<n.length&&i<r.length;i++){const s=ti(n[i],r[i]);if(s!==0)return s}return n.length===r.length?0:n.length<r.length?-1:1}function qf(t,e){if(fr(t)!==fr(e))return!1;for(let n=t.pieceNum_,r=e.pieceNum_;n<=t.pieces_.length;n++,r++)if(t.pieces_[n]!==e.pieces_[r])return!1;return!0}function Pt(t,e){let n=t.pieceNum_,r=e.pieceNum_;if(fr(t)>fr(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[r])return!1;++n,++r}return!0}class UI{constructor(e,n){this.errorPrefix_=n,this.parts_=Ao(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let r=0;r<this.parts_.length;r++)this.byteLength_+=Cc(this.parts_[r]);dw(this)}}function zI(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=Cc(e),dw(t)}function VI(t){const e=t.parts_.pop();t.byteLength_-=Cc(e),t.parts_.length>0&&(t.byteLength_-=1)}function dw(t){if(t.byteLength_>N0)throw new Error(t.errorPrefix_+"has a key path longer than "+N0+" bytes ("+t.byteLength_+").");if(t.parts_.length>b0)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+b0+") or object contains a cycle "+Cr(t))}function Cr(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kf extends cw{constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const r=!document[e];r!==this.visible_&&(this.visible_=r,this.trigger("visible",r))},!1)}static getInstance(){return new Kf}getInitialEvent(e){return F(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const js=1e3,$I=60*5*1e3,C0=30*1e3,BI=1.3,HI=3e4,WI="server_kill",I0=3;class Sn extends lw{constructor(e,n,r,i,s,o,l,u){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=r,this.onConnectStatus_=i,this.onServerInfoUpdate_=s,this.authTokenProvider_=o,this.appCheckTokenProvider_=l,this.authOverride_=u,this.id=Sn.nextPersistentConnectionId_++,this.log_=Zo("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=js,this.maxReconnectDelay_=$I,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,u)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Kf.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Vl.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,r){const i=++this.requestNumber_,s={r:i,a:e,b:n};this.log_(je(s)),F(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(s),r&&(this.requestCBHash_[i]=r)}get(e){this.initConnection_();const n=new ss,i={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const l=o.d;o.s==="ok"?n.resolve(l):n.reject(l)}};this.outstandingGets_.push(i),this.outstandingGetCount_++;const s=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(s),n.promise}listen(e,n,r,i){this.initConnection_();const s=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+s),this.listens.has(o)||this.listens.set(o,new Map),F(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),F(!this.listens.get(o).has(s),"listen() called twice for same path/queryId.");const l={onComplete:i,hashFn:n,query:e,tag:r};this.listens.get(o).set(s,l),this.connected_&&this.sendListen_(l)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,r=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(r)})}sendListen_(e){const n=e.query,r=n._path.toString(),i=n._queryIdentifier;this.log_("Listen on "+r+" for "+i);const s={p:r},o="q";e.tag&&(s.q=n._queryObject,s.t=e.tag),s.h=e.hashFn(),this.sendRequest(o,s,l=>{const u=l.d,h=l.s;Sn.warnOnListenWarnings_(u,n),(this.listens.get(r)&&this.listens.get(r).get(i))===e&&(this.log_("listen response",l),h!=="ok"&&this.removeListen_(r,i),e.onComplete&&e.onComplete(h,u))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&Xt(e,"w")){const r=Vr(e,"w");if(Array.isArray(r)&&~r.indexOf("no_index")){const i='".indexOn": "'+n._queryParams.getIndex().toString()+'"',s=n._path.toString();st(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${s} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||gS(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=C0)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=mS(e)?"auth":"gauth",r={cred:e};this.authOverride_===null?r.noauth=!0:typeof this.authOverride_=="object"&&(r.authvar=this.authOverride_),this.sendRequest(n,r,i=>{const s=i.s,o=i.d||"error";this.authToken_===e&&(s==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(s,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,r=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,r)})}unlisten(e,n){const r=e._path.toString(),i=e._queryIdentifier;this.log_("Unlisten called for "+r+" "+i),F(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(r,i)&&this.connected_&&this.sendUnlisten_(r,i,e._queryObject,n)}sendUnlisten_(e,n,r,i){this.log_("Unlisten on "+e+" for "+n);const s={p:e},o="n";i&&(s.q=r,s.t=i),this.sendRequest(o,s)}onDisconnectPut(e,n,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,r):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:r})}onDisconnectMerge(e,n,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,r):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:r})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,r,i){const s={p:n,d:r};this.log_("onDisconnect "+e,s),this.sendRequest(e,s,o=>{i&&setTimeout(()=>{i(o.s,o.d)},Math.floor(0))})}put(e,n,r,i){this.putInternal("p",e,n,r,i)}merge(e,n,r,i){this.putInternal("m",e,n,r,i)}putInternal(e,n,r,i,s){this.initConnection_();const o={p:n,d:r};s!==void 0&&(o.h=s),this.outstandingPuts_.push({action:e,request:o,onComplete:i}),this.outstandingPutCount_++;const l=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(l):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,r=this.outstandingPuts_[e].request,i=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,r,s=>{this.log_(n+" response",s),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),i&&i(s.s,s.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,r=>{if(r.s!=="ok"){const s=r.d;this.log_("reportStats","Error sending stats: "+s)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+je(e));const n=e.r,r=this.requestCBHash_[n];r&&(delete this.requestCBHash_[n],r(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):gh("Unrecognized action received from server: "+je(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){F(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=js,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=js,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>HI&&(this.reconnectDelay_=js),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=new Date().getTime()-this.lastConnectionAttemptTime_;let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*BI)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),r=this.onRealtimeDisconnect_.bind(this),i=this.id+":"+Sn.nextConnectionId_++,s=this.lastSessionId;let o=!1,l=null;const u=function(){l?l.close():(o=!0,r())},h=function(p){F(l,"sendRequest call when we're not connected not allowed."),l.sendRequest(p)};this.realtime_={close:u,sendRequest:h};const m=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[p,g]=await Promise.all([this.authTokenProvider_.getToken(m),this.appCheckTokenProvider_.getToken(m)]);o?Ve("getToken() completed but was canceled"):(Ve("getToken() completed. Creating connection."),this.authToken_=p&&p.accessToken,this.appCheckToken_=g&&g.token,l=new LI(i,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,r,E=>{st(E+" ("+this.repoInfo_.toString()+")"),this.interrupt(WI)},s))}catch(p){this.log_("Failed to get token: "+p),o||(this.repoInfo_.nodeAdmin&&st(p),u())}}}interrupt(e){Ve("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){Ve("Resuming connection for reason: "+e),delete this.interruptReasons_[e],oh(this.interruptReasons_)&&(this.reconnectDelay_=js,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let r;n?r=n.map(s=>$f(s)).join("$"):r="default";const i=this.removeListen_(e,r);i&&i.onComplete&&i.onComplete("permission_denied")}removeListen_(e,n){const r=new le(e).toString();let i;if(this.listens.has(r)){const s=this.listens.get(r);i=s.get(n),s.delete(n),s.size===0&&this.listens.delete(r)}else i=void 0;return i}onAuthRevoked_(e,n){Ve("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=I0&&(this.reconnectDelay_=C0,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){Ve("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=I0&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+z_.replace(/\./g,"-")]=1,Rf()?e["framework.cordova"]=1:Qx()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Vl.getInstance().currentlyOnline();return oh(this.interruptReasons_)&&e}}Sn.nextPersistentConnectionId_=0;Sn.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q{constructor(e,n){this.name=e,this.node=n}static Wrap(e,n){return new Q(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ac{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const r=new Q(Ki,e),i=new Q(Ki,n);return this.compare(r,i)!==0}minPost(){return Q.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ua;class hw extends Ac{static get __EMPTY_NODE(){return Ua}static set __EMPTY_NODE(e){Ua=e}compare(e,n){return ti(e.name,n.name)}isDefinedOn(e){throw is("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return Q.MIN}maxPost(){return new Q(Hr,Ua)}makePost(e,n){return F(typeof e=="string","KeyIndex indexValue must always be a string."),new Q(e,Ua)}toString(){return".key"}}const Mi=new hw;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class za{constructor(e,n,r,i,s=null){this.isReverse_=i,this.resultGenerator_=s,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?r(e.key,n):1,i&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class Me{constructor(e,n,r,i,s){this.key=e,this.value=n,this.color=r??Me.RED,this.left=i??ft.EMPTY_NODE,this.right=s??ft.EMPTY_NODE}copy(e,n,r,i,s){return new Me(e??this.key,n??this.value,r??this.color,i??this.left,s??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let i=this;const s=r(e,i.key);return s<0?i=i.copy(null,null,null,i.left.insert(e,n,r),null):s===0?i=i.copy(null,n,null,null,null):i=i.copy(null,null,null,null,i.right.insert(e,n,r)),i.fixUp_()}removeMin_(){if(this.left.isEmpty())return ft.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let r,i;if(r=this,n(e,r.key)<0)!r.left.isEmpty()&&!r.left.isRed_()&&!r.left.left.isRed_()&&(r=r.moveRedLeft_()),r=r.copy(null,null,null,r.left.remove(e,n),null);else{if(r.left.isRed_()&&(r=r.rotateRight_()),!r.right.isEmpty()&&!r.right.isRed_()&&!r.right.left.isRed_()&&(r=r.moveRedRight_()),n(e,r.key)===0){if(r.right.isEmpty())return ft.EMPTY_NODE;i=r.right.min_(),r=r.copy(i.key,i.value,null,null,r.right.removeMin_())}r=r.copy(null,null,null,null,r.right.remove(e,n))}return r.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,Me.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,Me.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}Me.RED=!0;Me.BLACK=!1;class GI{copy(e,n,r,i,s){return this}insert(e,n,r){return new Me(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class ft{constructor(e,n=ft.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new ft(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,Me.BLACK,null,null))}remove(e){return new ft(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,Me.BLACK,null,null))}get(e){let n,r=this.root_;for(;!r.isEmpty();){if(n=this.comparator_(e,r.key),n===0)return r.value;n<0?r=r.left:n>0&&(r=r.right)}return null}getPredecessorKey(e){let n,r=this.root_,i=null;for(;!r.isEmpty();)if(n=this.comparator_(e,r.key),n===0){if(r.left.isEmpty())return i?i.key:null;for(r=r.left;!r.right.isEmpty();)r=r.right;return r.key}else n<0?r=r.left:n>0&&(i=r,r=r.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new za(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new za(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new za(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new za(this.root_,null,this.comparator_,!0,e)}}ft.EMPTY_NODE=new GI;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qI(t,e){return ti(t.name,e.name)}function Yf(t,e){return ti(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let yh;function KI(t){yh=t}const fw=function(t){return typeof t=="number"?"number:"+W_(t):"string:"+t},pw=function(t){if(t.isLeafNode()){const e=t.val();F(typeof e=="string"||typeof e=="number"||typeof e=="object"&&Xt(e,".sv"),"Priority must be a string or number.")}else F(t===yh||t.isEmpty(),"priority of unexpected type.");F(t===yh||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let T0;class De{constructor(e,n=De.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,F(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),pw(this.priorityNode_)}static set __childrenNodeConstructor(e){T0=e}static get __childrenNodeConstructor(){return T0}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new De(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:De.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return X(e)?this:Y(e)===".priority"?this.priorityNode_:De.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:De.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const r=Y(e);return r===null?n:n.isEmpty()&&r!==".priority"?this:(F(r!==".priority"||fr(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(r,De.__childrenNodeConstructor.EMPTY_NODE.updateChild(de(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+fw(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=W_(this.value_):e+=this.value_,this.lazyHash_=B_(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===De.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof De.__childrenNodeConstructor?-1:(F(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,r=typeof this.value_,i=De.VALUE_TYPE_ORDER.indexOf(n),s=De.VALUE_TYPE_ORDER.indexOf(r);return F(i>=0,"Unknown leaf type: "+n),F(s>=0,"Unknown leaf type: "+r),i===s?r==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:s-i}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}De.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let mw,gw;function YI(t){mw=t}function QI(t){gw=t}class XI extends Ac{compare(e,n){const r=e.node.getPriority(),i=n.node.getPriority(),s=r.compareTo(i);return s===0?ti(e.name,n.name):s}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return Q.MIN}maxPost(){return new Q(Hr,new De("[PRIORITY-POST]",gw))}makePost(e,n){const r=mw(e);return new Q(n,new De("[PRIORITY-POST]",r))}toString(){return".priority"}}const xe=new XI;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const JI=Math.log(2);class ZI{constructor(e){const n=s=>parseInt(Math.log(s)/JI,10),r=s=>parseInt(Array(s+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const i=r(this.count);this.bits_=e+1&i}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const $l=function(t,e,n,r){t.sort(e);const i=function(u,h){const m=h-u;let p,g;if(m===0)return null;if(m===1)return p=t[u],g=n?n(p):p,new Me(g,p.node,Me.BLACK,null,null);{const E=parseInt(m/2,10)+u,I=i(u,E),P=i(E+1,h);return p=t[E],g=n?n(p):p,new Me(g,p.node,Me.BLACK,I,P)}},s=function(u){let h=null,m=null,p=t.length;const g=function(I,P){const L=p-I,N=p;p-=I;const w=i(L+1,N),b=t[L],j=n?n(b):b;E(new Me(j,b.node,P,null,w))},E=function(I){h?(h.left=I,h=I):(m=I,h=I)};for(let I=0;I<u.count;++I){const P=u.nextBitIsOne(),L=Math.pow(2,u.count-(I+1));P?g(L,Me.BLACK):(g(L,Me.BLACK),g(L,Me.RED))}return m},o=new ZI(t.length),l=s(o);return new ft(r||e,l)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nd;const ui={};class wn{constructor(e,n){this.indexes_=e,this.indexSet_=n}static get Default(){return F(ui&&xe,"ChildrenNode.ts has not been loaded"),nd=nd||new wn({".priority":ui},{".priority":xe}),nd}get(e){const n=Vr(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof ft?n:null}hasIndex(e){return Xt(this.indexSet_,e.toString())}addIndex(e,n){F(e!==Mi,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const r=[];let i=!1;const s=n.getIterator(Q.Wrap);let o=s.getNext();for(;o;)i=i||e.isDefinedOn(o.node),r.push(o),o=s.getNext();let l;i?l=$l(r,e.getCompare()):l=ui;const u=e.toString(),h=Object.assign({},this.indexSet_);h[u]=e;const m=Object.assign({},this.indexes_);return m[u]=l,new wn(m,h)}addToIndexes(e,n){const r=jl(this.indexes_,(i,s)=>{const o=Vr(this.indexSet_,s);if(F(o,"Missing index implementation for "+s),i===ui)if(o.isDefinedOn(e.node)){const l=[],u=n.getIterator(Q.Wrap);let h=u.getNext();for(;h;)h.name!==e.name&&l.push(h),h=u.getNext();return l.push(e),$l(l,o.getCompare())}else return ui;else{const l=n.get(e.name);let u=i;return l&&(u=u.remove(new Q(e.name,l))),u.insert(e,e.node)}});return new wn(r,this.indexSet_)}removeFromIndexes(e,n){const r=jl(this.indexes_,i=>{if(i===ui)return i;{const s=n.get(e.name);return s?i.remove(new Q(e.name,s)):i}});return new wn(r,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Os;class H{constructor(e,n,r){this.children_=e,this.priorityNode_=n,this.indexMap_=r,this.lazyHash_=null,this.priorityNode_&&pw(this.priorityNode_),this.children_.isEmpty()&&F(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return Os||(Os=new H(new ft(Yf),null,wn.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||Os}updatePriority(e){return this.children_.isEmpty()?this:new H(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?Os:n}}getChild(e){const n=Y(e);return n===null?this:this.getImmediateChild(n).getChild(de(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(F(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const r=new Q(e,n);let i,s;n.isEmpty()?(i=this.children_.remove(e),s=this.indexMap_.removeFromIndexes(r,this.children_)):(i=this.children_.insert(e,n),s=this.indexMap_.addToIndexes(r,this.children_));const o=i.isEmpty()?Os:this.priorityNode_;return new H(i,o,s)}}updateChild(e,n){const r=Y(e);if(r===null)return n;{F(Y(e)!==".priority"||fr(e)===1,".priority must be the last token in a path");const i=this.getImmediateChild(r).updateChild(de(e),n);return this.updateImmediateChild(r,i)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let r=0,i=0,s=!0;if(this.forEachChild(xe,(o,l)=>{n[o]=l.val(e),r++,s&&H.INTEGER_REGEXP_.test(o)?i=Math.max(i,Number(o)):s=!1}),!e&&s&&i<2*r){const o=[];for(const l in n)o[l]=n[l];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+fw(this.getPriority().val())+":"),this.forEachChild(xe,(n,r)=>{const i=r.hash();i!==""&&(e+=":"+n+":"+i)}),this.lazyHash_=e===""?"":B_(e)}return this.lazyHash_}getPredecessorChildName(e,n,r){const i=this.resolveIndex_(r);if(i){const s=i.getPredecessorKey(new Q(e,n));return s?s.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const r=n.minKey();return r&&r.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new Q(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const r=n.maxKey();return r&&r.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new Q(n,this.children_.get(n)):null}forEachChild(e,n){const r=this.resolveIndex_(e);return r?r.inorderTraversal(i=>n(i.name,i.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const r=this.resolveIndex_(n);if(r)return r.getIteratorFrom(e,i=>i);{const i=this.children_.getIteratorFrom(e.name,Q.Wrap);let s=i.peek();for(;s!=null&&n.compare(s,e)<0;)i.getNext(),s=i.peek();return i}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const r=this.resolveIndex_(n);if(r)return r.getReverseIteratorFrom(e,i=>i);{const i=this.children_.getReverseIteratorFrom(e.name,Q.Wrap);let s=i.peek();for(;s!=null&&n.compare(s,e)>0;)i.getNext(),s=i.peek();return i}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===ea?-1:0}withIndex(e){if(e===Mi||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new H(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===Mi||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const r=this.getIterator(xe),i=n.getIterator(xe);let s=r.getNext(),o=i.getNext();for(;s&&o;){if(s.name!==o.name||!s.node.equals(o.node))return!1;s=r.getNext(),o=i.getNext()}return s===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Mi?null:this.indexMap_.get(e.toString())}}H.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class eT extends H{constructor(){super(new ft(Yf),H.EMPTY_NODE,wn.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return H.EMPTY_NODE}isEmpty(){return!1}}const ea=new eT;Object.defineProperties(Q,{MIN:{value:new Q(Ki,H.EMPTY_NODE)},MAX:{value:new Q(Hr,ea)}});hw.__EMPTY_NODE=H.EMPTY_NODE;De.__childrenNodeConstructor=H;KI(ea);QI(ea);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tT=!0;function Ie(t,e=null){if(t===null)return H.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),F(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new De(n,Ie(e))}if(!(t instanceof Array)&&tT){const n=[];let r=!1;if(He(t,(o,l)=>{if(o.substring(0,1)!=="."){const u=Ie(l);u.isEmpty()||(r=r||!u.getPriority().isEmpty(),n.push(new Q(o,u)))}}),n.length===0)return H.EMPTY_NODE;const s=$l(n,qI,o=>o.name,Yf);if(r){const o=$l(n,xe.getCompare());return new H(s,Ie(e),new wn({".priority":o},{".priority":xe}))}else return new H(s,Ie(e),wn.Default)}else{let n=H.EMPTY_NODE;return He(t,(r,i)=>{if(Xt(t,r)&&r.substring(0,1)!=="."){const s=Ie(i);(s.isLeafNode()||!s.isEmpty())&&(n=n.updateImmediateChild(r,s))}}),n.updatePriority(Ie(e))}}YI(Ie);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nT extends Ac{constructor(e){super(),this.indexPath_=e,F(!X(e)&&Y(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const r=this.extractChild(e.node),i=this.extractChild(n.node),s=r.compareTo(i);return s===0?ti(e.name,n.name):s}makePost(e,n){const r=Ie(e),i=H.EMPTY_NODE.updateChild(this.indexPath_,r);return new Q(n,i)}maxPost(){const e=H.EMPTY_NODE.updateChild(this.indexPath_,ea);return new Q(Hr,e)}toString(){return Ao(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rT extends Ac{compare(e,n){const r=e.node.compareTo(n.node);return r===0?ti(e.name,n.name):r}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return Q.MIN}maxPost(){return Q.MAX}makePost(e,n){const r=Ie(e);return new Q(n,r)}toString(){return".value"}}const iT=new rT;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vw(t){return{type:"value",snapshotNode:t}}function Yi(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function jo(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function Oo(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function sT(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qf{constructor(e){this.index_=e}updateChild(e,n,r,i,s,o){F(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const l=e.getImmediateChild(n);return l.getChild(i).equals(r.getChild(i))&&l.isEmpty()===r.isEmpty()||(o!=null&&(r.isEmpty()?e.hasChild(n)?o.trackChildChange(jo(n,l)):F(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):l.isEmpty()?o.trackChildChange(Yi(n,r)):o.trackChildChange(Oo(n,r,l))),e.isLeafNode()&&r.isEmpty())?e:e.updateImmediateChild(n,r).withIndex(this.index_)}updateFullNode(e,n,r){return r!=null&&(e.isLeafNode()||e.forEachChild(xe,(i,s)=>{n.hasChild(i)||r.trackChildChange(jo(i,s))}),n.isLeafNode()||n.forEachChild(xe,(i,s)=>{if(e.hasChild(i)){const o=e.getImmediateChild(i);o.equals(s)||r.trackChildChange(Oo(i,s,o))}else r.trackChildChange(Yi(i,s))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?H.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Do{constructor(e){this.indexedFilter_=new Qf(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Do.getStartPost_(e),this.endPost_=Do.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,r=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&r}updateChild(e,n,r,i,s,o){return this.matches(new Q(n,r))||(r=H.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,r,i,s,o)}updateFullNode(e,n,r){n.isLeafNode()&&(n=H.EMPTY_NODE);let i=n.withIndex(this.index_);i=i.updatePriority(H.EMPTY_NODE);const s=this;return n.forEachChild(xe,(o,l)=>{s.matches(new Q(o,l))||(i=i.updateImmediateChild(o,H.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,i,r)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oT{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const r=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?r<=0:r<0},this.withinEndPost=n=>{const r=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?r<=0:r<0},this.rangedFilter_=new Do(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,r,i,s,o){return this.rangedFilter_.matches(new Q(n,r))||(r=H.EMPTY_NODE),e.getImmediateChild(n).equals(r)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,r,i,s,o):this.fullLimitUpdateChild_(e,n,r,s,o)}updateFullNode(e,n,r){let i;if(n.isLeafNode()||n.isEmpty())i=H.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){i=H.EMPTY_NODE.withIndex(this.index_);let s;this.reverse_?s=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):s=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;s.hasNext()&&o<this.limit_;){const l=s.getNext();if(this.withinDirectionalStart(l))if(this.withinDirectionalEnd(l))i=i.updateImmediateChild(l.name,l.node),o++;else break;else continue}}else{i=n.withIndex(this.index_),i=i.updatePriority(H.EMPTY_NODE);let s;this.reverse_?s=i.getReverseIterator(this.index_):s=i.getIterator(this.index_);let o=0;for(;s.hasNext();){const l=s.getNext();o<this.limit_&&this.withinDirectionalStart(l)&&this.withinDirectionalEnd(l)?o++:i=i.updateImmediateChild(l.name,H.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,i,r)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,r,i,s){let o;if(this.reverse_){const p=this.index_.getCompare();o=(g,E)=>p(E,g)}else o=this.index_.getCompare();const l=e;F(l.numChildren()===this.limit_,"");const u=new Q(n,r),h=this.reverse_?l.getFirstChild(this.index_):l.getLastChild(this.index_),m=this.rangedFilter_.matches(u);if(l.hasChild(n)){const p=l.getImmediateChild(n);let g=i.getChildAfterChild(this.index_,h,this.reverse_);for(;g!=null&&(g.name===n||l.hasChild(g.name));)g=i.getChildAfterChild(this.index_,g,this.reverse_);const E=g==null?1:o(g,u);if(m&&!r.isEmpty()&&E>=0)return s!=null&&s.trackChildChange(Oo(n,r,p)),l.updateImmediateChild(n,r);{s!=null&&s.trackChildChange(jo(n,p));const P=l.updateImmediateChild(n,H.EMPTY_NODE);return g!=null&&this.rangedFilter_.matches(g)?(s!=null&&s.trackChildChange(Yi(g.name,g.node)),P.updateImmediateChild(g.name,g.node)):P}}else return r.isEmpty()?e:m&&o(h,u)>=0?(s!=null&&(s.trackChildChange(jo(h.name,h.node)),s.trackChildChange(Yi(n,r))),l.updateImmediateChild(n,r).updateImmediateChild(h.name,H.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xf{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=xe}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return F(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return F(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Ki}hasEnd(){return this.endSet_}getIndexEndValue(){return F(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return F(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Hr}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return F(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===xe}copy(){const e=new Xf;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function aT(t){return t.loadsAllData()?new Qf(t.getIndex()):t.hasLimit()?new oT(t):new Do(t)}function R0(t){const e={};if(t.isDefault())return e;let n;if(t.index_===xe?n="$priority":t.index_===iT?n="$value":t.index_===Mi?n="$key":(F(t.index_ instanceof nT,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=je(n),t.startSet_){const r=t.startAfterSet_?"startAfter":"startAt";e[r]=je(t.indexStartValue_),t.startNameSet_&&(e[r]+=","+je(t.indexStartName_))}if(t.endSet_){const r=t.endBeforeSet_?"endBefore":"endAt";e[r]=je(t.indexEndValue_),t.endNameSet_&&(e[r]+=","+je(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function P0(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==xe&&(e.i=t.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bl extends lw{constructor(e,n,r,i){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=r,this.appCheckTokenProvider_=i,this.log_=Zo("p:rest:"),this.listens_={}}reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(F(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}listen(e,n,r,i){const s=e._path.toString();this.log_("Listen called for "+s+" "+e._queryIdentifier);const o=Bl.getListenId_(e,r),l={};this.listens_[o]=l;const u=R0(e._queryParams);this.restRequest_(s+".json",u,(h,m)=>{let p=m;if(h===404&&(p=null,h=null),h===null&&this.onDataUpdate_(s,p,!1,r),Vr(this.listens_,o)===l){let g;h?h===401?g="permission_denied":g="rest_error:"+h:g="ok",i(g,null)}})}unlisten(e,n){const r=Bl.getListenId_(e,n);delete this.listens_[r]}get(e){const n=R0(e._queryParams),r=e._path.toString(),i=new ss;return this.restRequest_(r+".json",n,(s,o)=>{let l=o;s===404&&(l=null,s=null),s===null?(this.onDataUpdate_(r,l,!1,null),i.resolve(l)):i.reject(new Error(l))}),i.promise}refreshAuthToken(e){}restRequest_(e,n={},r){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([i,s])=>{i&&i.accessToken&&(n.auth=i.accessToken),s&&s.token&&(n.ac=s.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+os(n);this.log_("Sending REST request for "+o);const l=new XMLHttpRequest;l.onreadystatechange=()=>{if(r&&l.readyState===4){this.log_("REST Response for "+o+" received. status:",l.status,"response:",l.responseText);let u=null;if(l.status>=200&&l.status<300){try{u=Co(l.responseText)}catch{st("Failed to parse JSON response for "+o+": "+l.responseText)}r(null,u)}else l.status!==401&&l.status!==404&&st("Got unsuccessful REST response for "+o+" Status: "+l.status),r(l.status);r=null}},l.open("GET",o,!0),l.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lT{constructor(){this.rootNode_=H.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hl(){return{value:null,children:new Map}}function yw(t,e,n){if(X(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const r=Y(e);t.children.has(r)||t.children.set(r,Hl());const i=t.children.get(r);e=de(e),yw(i,e,n)}}function xh(t,e,n){t.value!==null?n(e,t.value):cT(t,(r,i)=>{const s=new le(e.toString()+"/"+r);xh(i,s,n)})}function cT(t,e){t.children.forEach((n,r)=>{e(r,n)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uT{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n=Object.assign({},e);return this.last_&&He(this.last_,(r,i)=>{n[r]=n[r]-i}),this.last_=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const A0=10*1e3,dT=30*1e3,hT=5*60*1e3;class fT{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new uT(e);const r=A0+(dT-A0)*Math.random();to(this.reportStats_.bind(this),Math.floor(r))}reportStats_(){const e=this.statsListener_.get(),n={};let r=!1;He(e,(i,s)=>{s>0&&Xt(this.statsToReport_,i)&&(n[i]=s,r=!0)}),r&&this.server_.reportStats(n),to(this.reportStats_.bind(this),Math.floor(Math.random()*2*hT))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var $t;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})($t||($t={}));function Jf(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Zf(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function ep(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wl{constructor(e,n,r){this.path=e,this.affectedTree=n,this.revert=r,this.type=$t.ACK_USER_WRITE,this.source=Jf()}operationForChild(e){if(X(this.path)){if(this.affectedTree.value!=null)return F(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new le(e));return new Wl(re(),n,this.revert)}}else return F(Y(this.path)===e,"operationForChild called for unrelated child."),new Wl(de(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lo{constructor(e,n){this.source=e,this.path=n,this.type=$t.LISTEN_COMPLETE}operationForChild(e){return X(this.path)?new Lo(this.source,re()):new Lo(this.source,de(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wr{constructor(e,n,r){this.source=e,this.path=n,this.snap=r,this.type=$t.OVERWRITE}operationForChild(e){return X(this.path)?new Wr(this.source,re(),this.snap.getImmediateChild(e)):new Wr(this.source,de(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qi{constructor(e,n,r){this.source=e,this.path=n,this.children=r,this.type=$t.MERGE}operationForChild(e){if(X(this.path)){const n=this.children.subtree(new le(e));return n.isEmpty()?null:n.value?new Wr(this.source,re(),n.value):new Qi(this.source,re(),n)}else return F(Y(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Qi(this.source,de(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pr{constructor(e,n,r){this.node_=e,this.fullyInitialized_=n,this.filtered_=r}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(X(e))return this.isFullyInitialized()&&!this.filtered_;const n=Y(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pT{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function mT(t,e,n,r){const i=[],s=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&s.push(sT(o.childName,o.snapshotNode))}),Ds(t,i,"child_removed",e,r,n),Ds(t,i,"child_added",e,r,n),Ds(t,i,"child_moved",s,r,n),Ds(t,i,"child_changed",e,r,n),Ds(t,i,"value",e,r,n),i}function Ds(t,e,n,r,i,s){const o=r.filter(l=>l.type===n);o.sort((l,u)=>vT(t,l,u)),o.forEach(l=>{const u=gT(t,l,s);i.forEach(h=>{h.respondsTo(l.type)&&e.push(h.createEvent(u,t.query_))})})}function gT(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function vT(t,e,n){if(e.childName==null||n.childName==null)throw is("Should only compare child_ events.");const r=new Q(e.childName,e.snapshotNode),i=new Q(n.childName,n.snapshotNode);return t.index_.compare(r,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jc(t,e){return{eventCache:t,serverCache:e}}function no(t,e,n,r){return jc(new pr(e,n,r),t.serverCache)}function xw(t,e,n,r){return jc(t.eventCache,new pr(e,n,r))}function Gl(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function Gr(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let rd;const yT=()=>(rd||(rd=new ft(nI)),rd);class ue{constructor(e,n=yT()){this.value=e,this.children=n}static fromObject(e){let n=new ue(null);return He(e,(r,i)=>{n=n.set(new le(r),i)}),n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:re(),value:this.value};if(X(e))return null;{const r=Y(e),i=this.children.get(r);if(i!==null){const s=i.findRootMostMatchingPathAndValue(de(e),n);return s!=null?{path:Ee(new le(r),s.path),value:s.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(X(e))return this;{const n=Y(e),r=this.children.get(n);return r!==null?r.subtree(de(e)):new ue(null)}}set(e,n){if(X(e))return new ue(n,this.children);{const r=Y(e),s=(this.children.get(r)||new ue(null)).set(de(e),n),o=this.children.insert(r,s);return new ue(this.value,o)}}remove(e){if(X(e))return this.children.isEmpty()?new ue(null):new ue(null,this.children);{const n=Y(e),r=this.children.get(n);if(r){const i=r.remove(de(e));let s;return i.isEmpty()?s=this.children.remove(n):s=this.children.insert(n,i),this.value===null&&s.isEmpty()?new ue(null):new ue(this.value,s)}else return this}}get(e){if(X(e))return this.value;{const n=Y(e),r=this.children.get(n);return r?r.get(de(e)):null}}setTree(e,n){if(X(e))return n;{const r=Y(e),s=(this.children.get(r)||new ue(null)).setTree(de(e),n);let o;return s.isEmpty()?o=this.children.remove(r):o=this.children.insert(r,s),new ue(this.value,o)}}fold(e){return this.fold_(re(),e)}fold_(e,n){const r={};return this.children.inorderTraversal((i,s)=>{r[i]=s.fold_(Ee(e,i),n)}),n(e,this.value,r)}findOnPath(e,n){return this.findOnPath_(e,re(),n)}findOnPath_(e,n,r){const i=this.value?r(n,this.value):!1;if(i)return i;if(X(e))return null;{const s=Y(e),o=this.children.get(s);return o?o.findOnPath_(de(e),Ee(n,s),r):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,re(),n)}foreachOnPath_(e,n,r){if(X(e))return this;{this.value&&r(n,this.value);const i=Y(e),s=this.children.get(i);return s?s.foreachOnPath_(de(e),Ee(n,i),r):new ue(null)}}foreach(e){this.foreach_(re(),e)}foreach_(e,n){this.children.inorderTraversal((r,i)=>{i.foreach_(Ee(e,r),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,r)=>{r.value&&e(n,r.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gt{constructor(e){this.writeTree_=e}static empty(){return new Gt(new ue(null))}}function ro(t,e,n){if(X(e))return new Gt(new ue(n));{const r=t.writeTree_.findRootMostValueAndPath(e);if(r!=null){const i=r.path;let s=r.value;const o=rt(i,e);return s=s.updateChild(o,n),new Gt(t.writeTree_.set(i,s))}else{const i=new ue(n),s=t.writeTree_.setTree(e,i);return new Gt(s)}}}function _h(t,e,n){let r=t;return He(n,(i,s)=>{r=ro(r,Ee(e,i),s)}),r}function j0(t,e){if(X(e))return Gt.empty();{const n=t.writeTree_.setTree(e,new ue(null));return new Gt(n)}}function wh(t,e){return ni(t,e)!=null}function ni(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(rt(n.path,e)):null}function O0(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(xe,(r,i)=>{e.push(new Q(r,i))}):t.writeTree_.children.inorderTraversal((r,i)=>{i.value!=null&&e.push(new Q(r,i.value))}),e}function ar(t,e){if(X(e))return t;{const n=ni(t,e);return n!=null?new Gt(new ue(n)):new Gt(t.writeTree_.subtree(e))}}function kh(t){return t.writeTree_.isEmpty()}function Xi(t,e){return _w(re(),t.writeTree_,e)}function _w(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let r=null;return e.children.inorderTraversal((i,s)=>{i===".priority"?(F(s.value!==null,"Priority writes must always be leaf nodes"),r=s.value):n=_w(Ee(t,i),s,n)}),!n.getChild(t).isEmpty()&&r!==null&&(n=n.updateChild(Ee(t,".priority"),r)),n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oc(t,e){return Sw(e,t)}function xT(t,e,n,r,i){F(r>t.lastWriteId,"Stacking an older write on top of newer ones"),i===void 0&&(i=!0),t.allWrites.push({path:e,snap:n,writeId:r,visible:i}),i&&(t.visibleWrites=ro(t.visibleWrites,e,n)),t.lastWriteId=r}function _T(t,e,n,r){F(r>t.lastWriteId,"Stacking an older merge on top of newer ones"),t.allWrites.push({path:e,children:n,writeId:r,visible:!0}),t.visibleWrites=_h(t.visibleWrites,e,n),t.lastWriteId=r}function wT(t,e){for(let n=0;n<t.allWrites.length;n++){const r=t.allWrites[n];if(r.writeId===e)return r}return null}function kT(t,e){const n=t.allWrites.findIndex(l=>l.writeId===e);F(n>=0,"removeWrite called with nonexistent writeId.");const r=t.allWrites[n];t.allWrites.splice(n,1);let i=r.visible,s=!1,o=t.allWrites.length-1;for(;i&&o>=0;){const l=t.allWrites[o];l.visible&&(o>=n&&ET(l,r.path)?i=!1:Pt(r.path,l.path)&&(s=!0)),o--}if(i){if(s)return ST(t),!0;if(r.snap)t.visibleWrites=j0(t.visibleWrites,r.path);else{const l=r.children;He(l,u=>{t.visibleWrites=j0(t.visibleWrites,Ee(r.path,u))})}return!0}else return!1}function ET(t,e){if(t.snap)return Pt(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&Pt(Ee(t.path,n),e))return!0;return!1}function ST(t){t.visibleWrites=ww(t.allWrites,bT,re()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function bT(t){return t.visible}function ww(t,e,n){let r=Gt.empty();for(let i=0;i<t.length;++i){const s=t[i];if(e(s)){const o=s.path;let l;if(s.snap)Pt(n,o)?(l=rt(n,o),r=ro(r,l,s.snap)):Pt(o,n)&&(l=rt(o,n),r=ro(r,re(),s.snap.getChild(l)));else if(s.children){if(Pt(n,o))l=rt(n,o),r=_h(r,l,s.children);else if(Pt(o,n))if(l=rt(o,n),X(l))r=_h(r,re(),s.children);else{const u=Vr(s.children,Y(l));if(u){const h=u.getChild(de(l));r=ro(r,re(),h)}}}else throw is("WriteRecord should have .snap or .children")}}return r}function kw(t,e,n,r,i){if(!r&&!i){const s=ni(t.visibleWrites,e);if(s!=null)return s;{const o=ar(t.visibleWrites,e);if(kh(o))return n;if(n==null&&!wh(o,re()))return null;{const l=n||H.EMPTY_NODE;return Xi(o,l)}}}else{const s=ar(t.visibleWrites,e);if(!i&&kh(s))return n;if(!i&&n==null&&!wh(s,re()))return null;{const o=function(h){return(h.visible||i)&&(!r||!~r.indexOf(h.writeId))&&(Pt(h.path,e)||Pt(e,h.path))},l=ww(t.allWrites,o,e),u=n||H.EMPTY_NODE;return Xi(l,u)}}}function NT(t,e,n){let r=H.EMPTY_NODE;const i=ni(t.visibleWrites,e);if(i)return i.isLeafNode()||i.forEachChild(xe,(s,o)=>{r=r.updateImmediateChild(s,o)}),r;if(n){const s=ar(t.visibleWrites,e);return n.forEachChild(xe,(o,l)=>{const u=Xi(ar(s,new le(o)),l);r=r.updateImmediateChild(o,u)}),O0(s).forEach(o=>{r=r.updateImmediateChild(o.name,o.node)}),r}else{const s=ar(t.visibleWrites,e);return O0(s).forEach(o=>{r=r.updateImmediateChild(o.name,o.node)}),r}}function CT(t,e,n,r,i){F(r||i,"Either existingEventSnap or existingServerSnap must exist");const s=Ee(e,n);if(wh(t.visibleWrites,s))return null;{const o=ar(t.visibleWrites,s);return kh(o)?i.getChild(n):Xi(o,i.getChild(n))}}function IT(t,e,n,r){const i=Ee(e,n),s=ni(t.visibleWrites,i);if(s!=null)return s;if(r.isCompleteForChild(n)){const o=ar(t.visibleWrites,i);return Xi(o,r.getNode().getImmediateChild(n))}else return null}function TT(t,e){return ni(t.visibleWrites,e)}function RT(t,e,n,r,i,s,o){let l;const u=ar(t.visibleWrites,e),h=ni(u,re());if(h!=null)l=h;else if(n!=null)l=Xi(u,n);else return[];if(l=l.withIndex(o),!l.isEmpty()&&!l.isLeafNode()){const m=[],p=o.getCompare(),g=s?l.getReverseIteratorFrom(r,o):l.getIteratorFrom(r,o);let E=g.getNext();for(;E&&m.length<i;)p(E,r)!==0&&m.push(E),E=g.getNext();return m}else return[]}function PT(){return{visibleWrites:Gt.empty(),allWrites:[],lastWriteId:-1}}function ql(t,e,n,r){return kw(t.writeTree,t.treePath,e,n,r)}function tp(t,e){return NT(t.writeTree,t.treePath,e)}function D0(t,e,n,r){return CT(t.writeTree,t.treePath,e,n,r)}function Kl(t,e){return TT(t.writeTree,Ee(t.treePath,e))}function AT(t,e,n,r,i,s){return RT(t.writeTree,t.treePath,e,n,r,i,s)}function np(t,e,n){return IT(t.writeTree,t.treePath,e,n)}function Ew(t,e){return Sw(Ee(t.treePath,e),t.writeTree)}function Sw(t,e){return{treePath:t,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jT{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,r=e.childName;F(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),F(r!==".priority","Only non-priority child changes can be tracked.");const i=this.changeMap.get(r);if(i){const s=i.type;if(n==="child_added"&&s==="child_removed")this.changeMap.set(r,Oo(r,e.snapshotNode,i.snapshotNode));else if(n==="child_removed"&&s==="child_added")this.changeMap.delete(r);else if(n==="child_removed"&&s==="child_changed")this.changeMap.set(r,jo(r,i.oldSnap));else if(n==="child_changed"&&s==="child_added")this.changeMap.set(r,Yi(r,e.snapshotNode));else if(n==="child_changed"&&s==="child_changed")this.changeMap.set(r,Oo(r,e.snapshotNode,i.oldSnap));else throw is("Illegal combination of changes: "+e+" occurred after "+i)}else this.changeMap.set(r,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OT{getCompleteChild(e){return null}getChildAfterChild(e,n,r){return null}}const bw=new OT;class rp{constructor(e,n,r=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=r}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const r=this.optCompleteServerCache_!=null?new pr(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return np(this.writes_,e,r)}}getChildAfterChild(e,n,r){const i=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Gr(this.viewCache_),s=AT(this.writes_,i,n,1,r,e);return s.length===0?null:s[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function DT(t){return{filter:t}}function LT(t,e){F(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),F(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function MT(t,e,n,r,i){const s=new jT;let o,l;if(n.type===$t.OVERWRITE){const h=n;h.source.fromUser?o=Eh(t,e,h.path,h.snap,r,i,s):(F(h.source.fromServer,"Unknown source."),l=h.source.tagged||e.serverCache.isFiltered()&&!X(h.path),o=Yl(t,e,h.path,h.snap,r,i,l,s))}else if(n.type===$t.MERGE){const h=n;h.source.fromUser?o=UT(t,e,h.path,h.children,r,i,s):(F(h.source.fromServer,"Unknown source."),l=h.source.tagged||e.serverCache.isFiltered(),o=Sh(t,e,h.path,h.children,r,i,l,s))}else if(n.type===$t.ACK_USER_WRITE){const h=n;h.revert?o=$T(t,e,h.path,r,i,s):o=zT(t,e,h.path,h.affectedTree,r,i,s)}else if(n.type===$t.LISTEN_COMPLETE)o=VT(t,e,n.path,r,s);else throw is("Unknown operation type: "+n.type);const u=s.getChanges();return FT(e,o,u),{viewCache:o,changes:u}}function FT(t,e,n){const r=e.eventCache;if(r.isFullyInitialized()){const i=r.getNode().isLeafNode()||r.getNode().isEmpty(),s=Gl(t);(n.length>0||!t.eventCache.isFullyInitialized()||i&&!r.getNode().equals(s)||!r.getNode().getPriority().equals(s.getPriority()))&&n.push(vw(Gl(e)))}}function Nw(t,e,n,r,i,s){const o=e.eventCache;if(Kl(r,n)!=null)return e;{let l,u;if(X(n))if(F(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const h=Gr(e),m=h instanceof H?h:H.EMPTY_NODE,p=tp(r,m);l=t.filter.updateFullNode(e.eventCache.getNode(),p,s)}else{const h=ql(r,Gr(e));l=t.filter.updateFullNode(e.eventCache.getNode(),h,s)}else{const h=Y(n);if(h===".priority"){F(fr(n)===1,"Can't have a priority with additional path components");const m=o.getNode();u=e.serverCache.getNode();const p=D0(r,n,m,u);p!=null?l=t.filter.updatePriority(m,p):l=o.getNode()}else{const m=de(n);let p;if(o.isCompleteForChild(h)){u=e.serverCache.getNode();const g=D0(r,n,o.getNode(),u);g!=null?p=o.getNode().getImmediateChild(h).updateChild(m,g):p=o.getNode().getImmediateChild(h)}else p=np(r,h,e.serverCache);p!=null?l=t.filter.updateChild(o.getNode(),h,p,m,i,s):l=o.getNode()}}return no(e,l,o.isFullyInitialized()||X(n),t.filter.filtersNodes())}}function Yl(t,e,n,r,i,s,o,l){const u=e.serverCache;let h;const m=o?t.filter:t.filter.getIndexedFilter();if(X(n))h=m.updateFullNode(u.getNode(),r,null);else if(m.filtersNodes()&&!u.isFiltered()){const E=u.getNode().updateChild(n,r);h=m.updateFullNode(u.getNode(),E,null)}else{const E=Y(n);if(!u.isCompleteForPath(n)&&fr(n)>1)return e;const I=de(n),L=u.getNode().getImmediateChild(E).updateChild(I,r);E===".priority"?h=m.updatePriority(u.getNode(),L):h=m.updateChild(u.getNode(),E,L,I,bw,null)}const p=xw(e,h,u.isFullyInitialized()||X(n),m.filtersNodes()),g=new rp(i,p,s);return Nw(t,p,n,i,g,l)}function Eh(t,e,n,r,i,s,o){const l=e.eventCache;let u,h;const m=new rp(i,e,s);if(X(n))h=t.filter.updateFullNode(e.eventCache.getNode(),r,o),u=no(e,h,!0,t.filter.filtersNodes());else{const p=Y(n);if(p===".priority")h=t.filter.updatePriority(e.eventCache.getNode(),r),u=no(e,h,l.isFullyInitialized(),l.isFiltered());else{const g=de(n),E=l.getNode().getImmediateChild(p);let I;if(X(g))I=r;else{const P=m.getCompleteChild(p);P!=null?Gf(g)===".priority"&&P.getChild(uw(g)).isEmpty()?I=P:I=P.updateChild(g,r):I=H.EMPTY_NODE}if(E.equals(I))u=e;else{const P=t.filter.updateChild(l.getNode(),p,I,g,m,o);u=no(e,P,l.isFullyInitialized(),t.filter.filtersNodes())}}}return u}function L0(t,e){return t.eventCache.isCompleteForChild(e)}function UT(t,e,n,r,i,s,o){let l=e;return r.foreach((u,h)=>{const m=Ee(n,u);L0(e,Y(m))&&(l=Eh(t,l,m,h,i,s,o))}),r.foreach((u,h)=>{const m=Ee(n,u);L0(e,Y(m))||(l=Eh(t,l,m,h,i,s,o))}),l}function M0(t,e,n){return n.foreach((r,i)=>{e=e.updateChild(r,i)}),e}function Sh(t,e,n,r,i,s,o,l){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let u=e,h;X(n)?h=r:h=new ue(null).setTree(n,r);const m=e.serverCache.getNode();return h.children.inorderTraversal((p,g)=>{if(m.hasChild(p)){const E=e.serverCache.getNode().getImmediateChild(p),I=M0(t,E,g);u=Yl(t,u,new le(p),I,i,s,o,l)}}),h.children.inorderTraversal((p,g)=>{const E=!e.serverCache.isCompleteForChild(p)&&g.value===null;if(!m.hasChild(p)&&!E){const I=e.serverCache.getNode().getImmediateChild(p),P=M0(t,I,g);u=Yl(t,u,new le(p),P,i,s,o,l)}}),u}function zT(t,e,n,r,i,s,o){if(Kl(i,n)!=null)return e;const l=e.serverCache.isFiltered(),u=e.serverCache;if(r.value!=null){if(X(n)&&u.isFullyInitialized()||u.isCompleteForPath(n))return Yl(t,e,n,u.getNode().getChild(n),i,s,l,o);if(X(n)){let h=new ue(null);return u.getNode().forEachChild(Mi,(m,p)=>{h=h.set(new le(m),p)}),Sh(t,e,n,h,i,s,l,o)}else return e}else{let h=new ue(null);return r.foreach((m,p)=>{const g=Ee(n,m);u.isCompleteForPath(g)&&(h=h.set(m,u.getNode().getChild(g)))}),Sh(t,e,n,h,i,s,l,o)}}function VT(t,e,n,r,i){const s=e.serverCache,o=xw(e,s.getNode(),s.isFullyInitialized()||X(n),s.isFiltered());return Nw(t,o,n,r,bw,i)}function $T(t,e,n,r,i,s){let o;if(Kl(r,n)!=null)return e;{const l=new rp(r,e,i),u=e.eventCache.getNode();let h;if(X(n)||Y(n)===".priority"){let m;if(e.serverCache.isFullyInitialized())m=ql(r,Gr(e));else{const p=e.serverCache.getNode();F(p instanceof H,"serverChildren would be complete if leaf node"),m=tp(r,p)}m=m,h=t.filter.updateFullNode(u,m,s)}else{const m=Y(n);let p=np(r,m,e.serverCache);p==null&&e.serverCache.isCompleteForChild(m)&&(p=u.getImmediateChild(m)),p!=null?h=t.filter.updateChild(u,m,p,de(n),l,s):e.eventCache.getNode().hasChild(m)?h=t.filter.updateChild(u,m,H.EMPTY_NODE,de(n),l,s):h=u,h.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=ql(r,Gr(e)),o.isLeafNode()&&(h=t.filter.updateFullNode(h,o,s)))}return o=e.serverCache.isFullyInitialized()||Kl(r,re())!=null,no(e,h,o,t.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BT{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const r=this.query_._queryParams,i=new Qf(r.getIndex()),s=aT(r);this.processor_=DT(s);const o=n.serverCache,l=n.eventCache,u=i.updateFullNode(H.EMPTY_NODE,o.getNode(),null),h=s.updateFullNode(H.EMPTY_NODE,l.getNode(),null),m=new pr(u,o.isFullyInitialized(),i.filtersNodes()),p=new pr(h,l.isFullyInitialized(),s.filtersNodes());this.viewCache_=jc(p,m),this.eventGenerator_=new pT(this.query_)}get query(){return this.query_}}function HT(t){return t.viewCache_.serverCache.getNode()}function WT(t){return Gl(t.viewCache_)}function GT(t,e){const n=Gr(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!X(e)&&!n.getImmediateChild(Y(e)).isEmpty())?n.getChild(e):null}function F0(t){return t.eventRegistrations_.length===0}function qT(t,e){t.eventRegistrations_.push(e)}function U0(t,e,n){const r=[];if(n){F(e==null,"A cancel should cancel all event registrations.");const i=t.query._path;t.eventRegistrations_.forEach(s=>{const o=s.createCancelEvent(n,i);o&&r.push(o)})}if(e){let i=[];for(let s=0;s<t.eventRegistrations_.length;++s){const o=t.eventRegistrations_[s];if(!o.matches(e))i.push(o);else if(e.hasAnyCallback()){i=i.concat(t.eventRegistrations_.slice(s+1));break}}t.eventRegistrations_=i}else t.eventRegistrations_=[];return r}function z0(t,e,n,r){e.type===$t.MERGE&&e.source.queryId!==null&&(F(Gr(t.viewCache_),"We should always have a full cache before handling merges"),F(Gl(t.viewCache_),"Missing event cache, even though we have a server cache"));const i=t.viewCache_,s=MT(t.processor_,i,e,n,r);return LT(t.processor_,s.viewCache),F(s.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=s.viewCache,Cw(t,s.changes,s.viewCache.eventCache.getNode(),null)}function KT(t,e){const n=t.viewCache_.eventCache,r=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(xe,(s,o)=>{r.push(Yi(s,o))}),n.isFullyInitialized()&&r.push(vw(n.getNode())),Cw(t,r,n.getNode(),e)}function Cw(t,e,n,r){const i=r?[r]:t.eventRegistrations_;return mT(t.eventGenerator_,e,n,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ql;class Iw{constructor(){this.views=new Map}}function YT(t){F(!Ql,"__referenceConstructor has already been defined"),Ql=t}function QT(){return F(Ql,"Reference.ts has not been loaded"),Ql}function XT(t){return t.views.size===0}function ip(t,e,n,r){const i=e.source.queryId;if(i!==null){const s=t.views.get(i);return F(s!=null,"SyncTree gave us an op for an invalid query."),z0(s,e,n,r)}else{let s=[];for(const o of t.views.values())s=s.concat(z0(o,e,n,r));return s}}function Tw(t,e,n,r,i){const s=e._queryIdentifier,o=t.views.get(s);if(!o){let l=ql(n,i?r:null),u=!1;l?u=!0:r instanceof H?(l=tp(n,r),u=!1):(l=H.EMPTY_NODE,u=!1);const h=jc(new pr(l,u,!1),new pr(r,i,!1));return new BT(e,h)}return o}function JT(t,e,n,r,i,s){const o=Tw(t,e,r,i,s);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),qT(o,n),KT(o,n)}function ZT(t,e,n,r){const i=e._queryIdentifier,s=[];let o=[];const l=mr(t);if(i==="default")for(const[u,h]of t.views.entries())o=o.concat(U0(h,n,r)),F0(h)&&(t.views.delete(u),h.query._queryParams.loadsAllData()||s.push(h.query));else{const u=t.views.get(i);u&&(o=o.concat(U0(u,n,r)),F0(u)&&(t.views.delete(i),u.query._queryParams.loadsAllData()||s.push(u.query)))}return l&&!mr(t)&&s.push(new(QT())(e._repo,e._path)),{removed:s,events:o}}function Rw(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function lr(t,e){let n=null;for(const r of t.views.values())n=n||GT(r,e);return n}function Pw(t,e){if(e._queryParams.loadsAllData())return Dc(t);{const r=e._queryIdentifier;return t.views.get(r)}}function Aw(t,e){return Pw(t,e)!=null}function mr(t){return Dc(t)!=null}function Dc(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Xl;function eR(t){F(!Xl,"__referenceConstructor has already been defined"),Xl=t}function tR(){return F(Xl,"Reference.ts has not been loaded"),Xl}let nR=1;class V0{constructor(e){this.listenProvider_=e,this.syncPointTree_=new ue(null),this.pendingWriteTree_=PT(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function sp(t,e,n,r,i){return xT(t.pendingWriteTree_,e,n,r,i),i?cs(t,new Wr(Jf(),e,n)):[]}function rR(t,e,n,r){_T(t.pendingWriteTree_,e,n,r);const i=ue.fromObject(n);return cs(t,new Qi(Jf(),e,i))}function Qn(t,e,n=!1){const r=wT(t.pendingWriteTree_,e);if(kT(t.pendingWriteTree_,e)){let s=new ue(null);return r.snap!=null?s=s.set(re(),!0):He(r.children,o=>{s=s.set(new le(o),!0)}),cs(t,new Wl(r.path,s,n))}else return[]}function ta(t,e,n){return cs(t,new Wr(Zf(),e,n))}function iR(t,e,n){const r=ue.fromObject(n);return cs(t,new Qi(Zf(),e,r))}function sR(t,e){return cs(t,new Lo(Zf(),e))}function oR(t,e,n){const r=op(t,n);if(r){const i=ap(r),s=i.path,o=i.queryId,l=rt(s,e),u=new Lo(ep(o),l);return lp(t,s,u)}else return[]}function Jl(t,e,n,r,i=!1){const s=e._path,o=t.syncPointTree_.get(s);let l=[];if(o&&(e._queryIdentifier==="default"||Aw(o,e))){const u=ZT(o,e,n,r);XT(o)&&(t.syncPointTree_=t.syncPointTree_.remove(s));const h=u.removed;if(l=u.events,!i){const m=h.findIndex(g=>g._queryParams.loadsAllData())!==-1,p=t.syncPointTree_.findOnPath(s,(g,E)=>mr(E));if(m&&!p){const g=t.syncPointTree_.subtree(s);if(!g.isEmpty()){const E=cR(g);for(let I=0;I<E.length;++I){const P=E[I],L=P.query,N=Lw(t,P);t.listenProvider_.startListening(io(L),Mo(t,L),N.hashFn,N.onComplete)}}}!p&&h.length>0&&!r&&(m?t.listenProvider_.stopListening(io(e),null):h.forEach(g=>{const E=t.queryToTagMap.get(Mc(g));t.listenProvider_.stopListening(io(g),E)}))}uR(t,h)}return l}function jw(t,e,n,r){const i=op(t,r);if(i!=null){const s=ap(i),o=s.path,l=s.queryId,u=rt(o,e),h=new Wr(ep(l),u,n);return lp(t,o,h)}else return[]}function aR(t,e,n,r){const i=op(t,r);if(i){const s=ap(i),o=s.path,l=s.queryId,u=rt(o,e),h=ue.fromObject(n),m=new Qi(ep(l),u,h);return lp(t,o,m)}else return[]}function bh(t,e,n,r=!1){const i=e._path;let s=null,o=!1;t.syncPointTree_.foreachOnPath(i,(g,E)=>{const I=rt(g,i);s=s||lr(E,I),o=o||mr(E)});let l=t.syncPointTree_.get(i);l?(o=o||mr(l),s=s||lr(l,re())):(l=new Iw,t.syncPointTree_=t.syncPointTree_.set(i,l));let u;s!=null?u=!0:(u=!1,s=H.EMPTY_NODE,t.syncPointTree_.subtree(i).foreachChild((E,I)=>{const P=lr(I,re());P&&(s=s.updateImmediateChild(E,P))}));const h=Aw(l,e);if(!h&&!e._queryParams.loadsAllData()){const g=Mc(e);F(!t.queryToTagMap.has(g),"View does not exist, but we have a tag");const E=dR();t.queryToTagMap.set(g,E),t.tagToQueryMap.set(E,g)}const m=Oc(t.pendingWriteTree_,i);let p=JT(l,e,n,m,s,u);if(!h&&!o&&!r){const g=Pw(l,e);p=p.concat(hR(t,e,g))}return p}function Lc(t,e,n){const i=t.pendingWriteTree_,s=t.syncPointTree_.findOnPath(e,(o,l)=>{const u=rt(o,e),h=lr(l,u);if(h)return h});return kw(i,e,s,n,!0)}function lR(t,e){const n=e._path;let r=null;t.syncPointTree_.foreachOnPath(n,(h,m)=>{const p=rt(h,n);r=r||lr(m,p)});let i=t.syncPointTree_.get(n);i?r=r||lr(i,re()):(i=new Iw,t.syncPointTree_=t.syncPointTree_.set(n,i));const s=r!=null,o=s?new pr(r,!0,!1):null,l=Oc(t.pendingWriteTree_,e._path),u=Tw(i,e,l,s?o.getNode():H.EMPTY_NODE,s);return WT(u)}function cs(t,e){return Ow(e,t.syncPointTree_,null,Oc(t.pendingWriteTree_,re()))}function Ow(t,e,n,r){if(X(t.path))return Dw(t,e,n,r);{const i=e.get(re());n==null&&i!=null&&(n=lr(i,re()));let s=[];const o=Y(t.path),l=t.operationForChild(o),u=e.children.get(o);if(u&&l){const h=n?n.getImmediateChild(o):null,m=Ew(r,o);s=s.concat(Ow(l,u,h,m))}return i&&(s=s.concat(ip(i,t,r,n))),s}}function Dw(t,e,n,r){const i=e.get(re());n==null&&i!=null&&(n=lr(i,re()));let s=[];return e.children.inorderTraversal((o,l)=>{const u=n?n.getImmediateChild(o):null,h=Ew(r,o),m=t.operationForChild(o);m&&(s=s.concat(Dw(m,l,u,h)))}),i&&(s=s.concat(ip(i,t,r,n))),s}function Lw(t,e){const n=e.query,r=Mo(t,n);return{hashFn:()=>(HT(e)||H.EMPTY_NODE).hash(),onComplete:i=>{if(i==="ok")return r?oR(t,n._path,r):sR(t,n._path);{const s=sI(i,n);return Jl(t,n,null,s)}}}}function Mo(t,e){const n=Mc(e);return t.queryToTagMap.get(n)}function Mc(t){return t._path.toString()+"$"+t._queryIdentifier}function op(t,e){return t.tagToQueryMap.get(e)}function ap(t){const e=t.indexOf("$");return F(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new le(t.substr(0,e))}}function lp(t,e,n){const r=t.syncPointTree_.get(e);F(r,"Missing sync point for query tag that we're tracking");const i=Oc(t.pendingWriteTree_,e);return ip(r,n,i,null)}function cR(t){return t.fold((e,n,r)=>{if(n&&mr(n))return[Dc(n)];{let i=[];return n&&(i=Rw(n)),He(r,(s,o)=>{i=i.concat(o)}),i}})}function io(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(tR())(t._repo,t._path):t}function uR(t,e){for(let n=0;n<e.length;++n){const r=e[n];if(!r._queryParams.loadsAllData()){const i=Mc(r),s=t.queryToTagMap.get(i);t.queryToTagMap.delete(i),t.tagToQueryMap.delete(s)}}}function dR(){return nR++}function hR(t,e,n){const r=e._path,i=Mo(t,e),s=Lw(t,n),o=t.listenProvider_.startListening(io(e),i,s.hashFn,s.onComplete),l=t.syncPointTree_.subtree(r);if(i)F(!mr(l.value),"If we're adding a query, it shouldn't be shadowed");else{const u=l.fold((h,m,p)=>{if(!X(h)&&m&&mr(m))return[Dc(m).query];{let g=[];return m&&(g=g.concat(Rw(m).map(E=>E.query))),He(p,(E,I)=>{g=g.concat(I)}),g}});for(let h=0;h<u.length;++h){const m=u[h];t.listenProvider_.stopListening(io(m),Mo(t,m))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cp{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new cp(n)}node(){return this.node_}}class up{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=Ee(this.path_,e);return new up(this.syncTree_,n)}node(){return Lc(this.syncTree_,this.path_)}}const fR=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},$0=function(t,e,n){if(!t||typeof t!="object")return t;if(F(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return pR(t[".sv"],e,n);if(typeof t[".sv"]=="object")return mR(t[".sv"],e);F(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},pR=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:F(!1,"Unexpected server value: "+t)}},mR=function(t,e,n){t.hasOwnProperty("increment")||F(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const r=t.increment;typeof r!="number"&&F(!1,"Unexpected increment value: "+r);const i=e.node();if(F(i!==null&&typeof i<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return r;const o=i.getValue();return typeof o!="number"?r:o+r},Mw=function(t,e,n,r){return hp(e,new up(n,t),r)},dp=function(t,e,n){return hp(t,new cp(e),n)};function hp(t,e,n){const r=t.getPriority().val(),i=$0(r,e.getImmediateChild(".priority"),n);let s;if(t.isLeafNode()){const o=t,l=$0(o.getValue(),e,n);return l!==o.getValue()||i!==o.getPriority().val()?new De(l,Ie(i)):t}else{const o=t;return s=o,i!==o.getPriority().val()&&(s=s.updatePriority(new De(i))),o.forEachChild(xe,(l,u)=>{const h=hp(u,e.getImmediateChild(l),n);h!==u&&(s=s.updateImmediateChild(l,h))}),s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fp{constructor(e="",n=null,r={children:{},childCount:0}){this.name=e,this.parent=n,this.node=r}}function Fc(t,e){let n=e instanceof le?e:new le(e),r=t,i=Y(n);for(;i!==null;){const s=Vr(r.node.children,i)||{children:{},childCount:0};r=new fp(i,r,s),n=de(n),i=Y(n)}return r}function ri(t){return t.node.value}function pp(t,e){t.node.value=e,Nh(t)}function Fw(t){return t.node.childCount>0}function gR(t){return ri(t)===void 0&&!Fw(t)}function Uc(t,e){He(t.node.children,(n,r)=>{e(new fp(n,t,r))})}function Uw(t,e,n,r){n&&e(t),Uc(t,i=>{Uw(i,e,!0)})}function vR(t,e,n){let r=t.parent;for(;r!==null;){if(e(r))return!0;r=r.parent}return!1}function na(t){return new le(t.parent===null?t.name:na(t.parent)+"/"+t.name)}function Nh(t){t.parent!==null&&yR(t.parent,t.name,t)}function yR(t,e,n){const r=gR(n),i=Xt(t.node.children,e);r&&i?(delete t.node.children[e],t.node.childCount--,Nh(t)):!r&&!i&&(t.node.children[e]=n.node,t.node.childCount++,Nh(t))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xR=/[\[\].#$\/\u0000-\u001F\u007F]/,_R=/[\[\].#$\u0000-\u001F\u007F]/,id=10*1024*1024,mp=function(t){return typeof t=="string"&&t.length!==0&&!xR.test(t)},zw=function(t){return typeof t=="string"&&t.length!==0&&!_R.test(t)},wR=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),zw(t)},Vw=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!Vf(t)||t&&typeof t=="object"&&Xt(t,".sv")},$w=function(t,e,n,r){r&&e===void 0||ra(Nc(t,"value"),e,n)},ra=function(t,e,n){const r=n instanceof le?new UI(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+Cr(r));if(typeof e=="function")throw new Error(t+"contains a function "+Cr(r)+" with contents = "+e.toString());if(Vf(e))throw new Error(t+"contains "+e.toString()+" "+Cr(r));if(typeof e=="string"&&e.length>id/3&&Cc(e)>id)throw new Error(t+"contains a string greater than "+id+" utf8 bytes "+Cr(r)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let i=!1,s=!1;if(He(e,(o,l)=>{if(o===".value")i=!0;else if(o!==".priority"&&o!==".sv"&&(s=!0,!mp(o)))throw new Error(t+" contains an invalid key ("+o+") "+Cr(r)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);zI(r,o),ra(t,l,r),VI(r)}),i&&s)throw new Error(t+' contains ".value" child '+Cr(r)+" in addition to actual children.")}},kR=function(t,e){let n,r;for(n=0;n<e.length;n++){r=e[n];const s=Ao(r);for(let o=0;o<s.length;o++)if(!(s[o]===".priority"&&o===s.length-1)){if(!mp(s[o]))throw new Error(t+"contains an invalid key ("+s[o]+") in path "+r.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(FI);let i=null;for(n=0;n<e.length;n++){if(r=e[n],i!==null&&Pt(i,r))throw new Error(t+"contains a path "+i.toString()+" that is ancestor of another path "+r.toString());i=r}},ER=function(t,e,n,r){const i=Nc(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(i+" must be an object containing the children to replace.");const s=[];He(e,(o,l)=>{const u=new le(o);if(ra(i,l,Ee(n,u)),Gf(u)===".priority"&&!Vw(l))throw new Error(i+"contains an invalid value for '"+u.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");s.push(u)}),kR(i,s)},Bw=function(t,e,n,r){if(!zw(n))throw new Error(Nc(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},SR=function(t,e,n,r){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),Bw(t,e,n)},zc=function(t,e){if(Y(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},bR=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!mp(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!wR(n))throw new Error(Nc(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NR{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Vc(t,e){let n=null;for(let r=0;r<e.length;r++){const i=e[r],s=i.getPath();n!==null&&!qf(s,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:s}),n.events.push(i)}n&&t.eventLists_.push(n)}function Hw(t,e,n){Vc(t,n),Ww(t,r=>qf(r,e))}function St(t,e,n){Vc(t,n),Ww(t,r=>Pt(r,e)||Pt(e,r))}function Ww(t,e){t.recursionDepth_++;let n=!0;for(let r=0;r<t.eventLists_.length;r++){const i=t.eventLists_[r];if(i){const s=i.path;e(s)?(CR(t.eventLists_[r]),t.eventLists_[r]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function CR(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const r=n.getEventRunner();eo&&Ve("event: "+n.toString()),ls(r)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const IR="repo_interrupt",TR=25;class RR{constructor(e,n,r,i){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=r,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new NR,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Hl(),this.transactionQueueTree_=new fp,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function PR(t,e,n){if(t.stats_=Hf(t.repoInfo_),t.forceRestClient_||cI())t.server_=new Bl(t.repoInfo_,(r,i,s,o)=>{B0(t,r,i,s,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>H0(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{je(n)}catch(r){throw new Error("Invalid authOverride provided: "+r)}}t.persistentConnection_=new Sn(t.repoInfo_,e,(r,i,s,o)=>{B0(t,r,i,s,o)},r=>{H0(t,r)},r=>{AR(t,r)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(r=>{t.server_.refreshAuthToken(r)}),t.appCheckProvider_.addTokenChangeListener(r=>{t.server_.refreshAppCheckToken(r.token)}),t.statsReporter_=pI(t.repoInfo_,()=>new fT(t.stats_,t.server_)),t.infoData_=new lT,t.infoSyncTree_=new V0({startListening:(r,i,s,o)=>{let l=[];const u=t.infoData_.getNode(r._path);return u.isEmpty()||(l=ta(t.infoSyncTree_,r._path,u),setTimeout(()=>{o("ok")},0)),l},stopListening:()=>{}}),gp(t,"connected",!1),t.serverSyncTree_=new V0({startListening:(r,i,s,o)=>(t.server_.listen(r,s,i,(l,u)=>{const h=o(l,u);St(t.eventQueue_,r._path,h)}),[]),stopListening:(r,i)=>{t.server_.unlisten(r,i)}})}function Gw(t){const n=t.infoData_.getNode(new le(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function ia(t){return fR({timestamp:Gw(t)})}function B0(t,e,n,r,i){t.dataUpdateCount++;const s=new le(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(i)if(r){const u=jl(n,h=>Ie(h));o=aR(t.serverSyncTree_,s,u,i)}else{const u=Ie(n);o=jw(t.serverSyncTree_,s,u,i)}else if(r){const u=jl(n,h=>Ie(h));o=iR(t.serverSyncTree_,s,u)}else{const u=Ie(n);o=ta(t.serverSyncTree_,s,u)}let l=s;o.length>0&&(l=Ji(t,s)),St(t.eventQueue_,l,o)}function H0(t,e){gp(t,"connected",e),e===!1&&LR(t)}function AR(t,e){He(e,(n,r)=>{gp(t,n,r)})}function gp(t,e,n){const r=new le("/.info/"+e),i=Ie(n);t.infoData_.updateSnapshot(r,i);const s=ta(t.infoSyncTree_,r,i);St(t.eventQueue_,r,s)}function $c(t){return t.nextWriteId_++}function jR(t,e,n){const r=lR(t.serverSyncTree_,e);return r!=null?Promise.resolve(r):t.server_.get(e).then(i=>{const s=Ie(i).withIndex(e._queryParams.getIndex());bh(t.serverSyncTree_,e,n,!0);let o;if(e._queryParams.loadsAllData())o=ta(t.serverSyncTree_,e._path,s);else{const l=Mo(t.serverSyncTree_,e);o=jw(t.serverSyncTree_,e._path,s,l)}return St(t.eventQueue_,e._path,o),Jl(t.serverSyncTree_,e,n,null,!0),s},i=>(us(t,"get for query "+je(e)+" failed: "+i),Promise.reject(new Error(i))))}function OR(t,e,n,r,i){us(t,"set",{path:e.toString(),value:n,priority:r});const s=ia(t),o=Ie(n,r),l=Lc(t.serverSyncTree_,e),u=dp(o,l,s),h=$c(t),m=sp(t.serverSyncTree_,e,u,h,!0);Vc(t.eventQueue_,m),t.server_.put(e.toString(),o.val(!0),(g,E)=>{const I=g==="ok";I||st("set at "+e+" failed: "+g);const P=Qn(t.serverSyncTree_,h,!I);St(t.eventQueue_,e,P),Ch(t,i,g,E)});const p=yp(t,e);Ji(t,p),St(t.eventQueue_,p,[])}function DR(t,e,n,r){us(t,"update",{path:e.toString(),value:n});let i=!0;const s=ia(t),o={};if(He(n,(l,u)=>{i=!1,o[l]=Mw(Ee(e,l),Ie(u),t.serverSyncTree_,s)}),i)Ve("update() called with empty data.  Don't do anything."),Ch(t,r,"ok",void 0);else{const l=$c(t),u=rR(t.serverSyncTree_,e,o,l);Vc(t.eventQueue_,u),t.server_.merge(e.toString(),n,(h,m)=>{const p=h==="ok";p||st("update at "+e+" failed: "+h);const g=Qn(t.serverSyncTree_,l,!p),E=g.length>0?Ji(t,e):e;St(t.eventQueue_,E,g),Ch(t,r,h,m)}),He(n,h=>{const m=yp(t,Ee(e,h));Ji(t,m)}),St(t.eventQueue_,e,[])}}function LR(t){us(t,"onDisconnectEvents");const e=ia(t),n=Hl();xh(t.onDisconnect_,re(),(i,s)=>{const o=Mw(i,s,t.serverSyncTree_,e);yw(n,i,o)});let r=[];xh(n,re(),(i,s)=>{r=r.concat(ta(t.serverSyncTree_,i,s));const o=yp(t,i);Ji(t,o)}),t.onDisconnect_=Hl(),St(t.eventQueue_,re(),r)}function MR(t,e,n){let r;Y(e._path)===".info"?r=bh(t.infoSyncTree_,e,n):r=bh(t.serverSyncTree_,e,n),Hw(t.eventQueue_,e._path,r)}function FR(t,e,n){let r;Y(e._path)===".info"?r=Jl(t.infoSyncTree_,e,n):r=Jl(t.serverSyncTree_,e,n),Hw(t.eventQueue_,e._path,r)}function UR(t){t.persistentConnection_&&t.persistentConnection_.interrupt(IR)}function us(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),Ve(n,...e)}function Ch(t,e,n,r){e&&ls(()=>{if(n==="ok")e(null);else{const i=(n||"error").toUpperCase();let s=i;r&&(s+=": "+r);const o=new Error(s);o.code=i,e(o)}})}function zR(t,e,n,r,i,s){us(t,"transaction on "+e);const o={path:e,update:n,onComplete:r,status:null,order:$_(),applyLocally:s,retryCount:0,unwatcher:i,abortReason:null,currentWriteId:null,currentInputSnapshot:null,currentOutputSnapshotRaw:null,currentOutputSnapshotResolved:null},l=vp(t,e,void 0);o.currentInputSnapshot=l;const u=o.update(l.val());if(u===void 0)o.unwatcher(),o.currentOutputSnapshotRaw=null,o.currentOutputSnapshotResolved=null,o.onComplete&&o.onComplete(null,!1,o.currentInputSnapshot);else{ra("transaction failed: Data returned ",u,o.path),o.status=0;const h=Fc(t.transactionQueueTree_,e),m=ri(h)||[];m.push(o),pp(h,m);let p;typeof u=="object"&&u!==null&&Xt(u,".priority")?(p=Vr(u,".priority"),F(Vw(p),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):p=(Lc(t.serverSyncTree_,e)||H.EMPTY_NODE).getPriority().val();const g=ia(t),E=Ie(u,p),I=dp(E,l,g);o.currentOutputSnapshotRaw=E,o.currentOutputSnapshotResolved=I,o.currentWriteId=$c(t);const P=sp(t.serverSyncTree_,e,I,o.currentWriteId,o.applyLocally);St(t.eventQueue_,e,P),Bc(t,t.transactionQueueTree_)}}function vp(t,e,n){return Lc(t.serverSyncTree_,e,n)||H.EMPTY_NODE}function Bc(t,e=t.transactionQueueTree_){if(e||Hc(t,e),ri(e)){const n=Kw(t,e);F(n.length>0,"Sending zero length transaction queue"),n.every(i=>i.status===0)&&VR(t,na(e),n)}else Fw(e)&&Uc(e,n=>{Bc(t,n)})}function VR(t,e,n){const r=n.map(h=>h.currentWriteId),i=vp(t,e,r);let s=i;const o=i.hash();for(let h=0;h<n.length;h++){const m=n[h];F(m.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),m.status=1,m.retryCount++;const p=rt(e,m.path);s=s.updateChild(p,m.currentOutputSnapshotRaw)}const l=s.val(!0),u=e;t.server_.put(u.toString(),l,h=>{us(t,"transaction put response",{path:u.toString(),status:h});let m=[];if(h==="ok"){const p=[];for(let g=0;g<n.length;g++)n[g].status=2,m=m.concat(Qn(t.serverSyncTree_,n[g].currentWriteId)),n[g].onComplete&&p.push(()=>n[g].onComplete(null,!0,n[g].currentOutputSnapshotResolved)),n[g].unwatcher();Hc(t,Fc(t.transactionQueueTree_,e)),Bc(t,t.transactionQueueTree_),St(t.eventQueue_,e,m);for(let g=0;g<p.length;g++)ls(p[g])}else{if(h==="datastale")for(let p=0;p<n.length;p++)n[p].status===3?n[p].status=4:n[p].status=0;else{st("transaction at "+u.toString()+" failed: "+h);for(let p=0;p<n.length;p++)n[p].status=4,n[p].abortReason=h}Ji(t,e)}},o)}function Ji(t,e){const n=qw(t,e),r=na(n),i=Kw(t,n);return $R(t,i,r),r}function $R(t,e,n){if(e.length===0)return;const r=[];let i=[];const o=e.filter(l=>l.status===0).map(l=>l.currentWriteId);for(let l=0;l<e.length;l++){const u=e[l],h=rt(n,u.path);let m=!1,p;if(F(h!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),u.status===4)m=!0,p=u.abortReason,i=i.concat(Qn(t.serverSyncTree_,u.currentWriteId,!0));else if(u.status===0)if(u.retryCount>=TR)m=!0,p="maxretry",i=i.concat(Qn(t.serverSyncTree_,u.currentWriteId,!0));else{const g=vp(t,u.path,o);u.currentInputSnapshot=g;const E=e[l].update(g.val());if(E!==void 0){ra("transaction failed: Data returned ",E,u.path);let I=Ie(E);typeof E=="object"&&E!=null&&Xt(E,".priority")||(I=I.updatePriority(g.getPriority()));const L=u.currentWriteId,N=ia(t),w=dp(I,g,N);u.currentOutputSnapshotRaw=I,u.currentOutputSnapshotResolved=w,u.currentWriteId=$c(t),o.splice(o.indexOf(L),1),i=i.concat(sp(t.serverSyncTree_,u.path,w,u.currentWriteId,u.applyLocally)),i=i.concat(Qn(t.serverSyncTree_,L,!0))}else m=!0,p="nodata",i=i.concat(Qn(t.serverSyncTree_,u.currentWriteId,!0))}St(t.eventQueue_,n,i),i=[],m&&(e[l].status=2,function(g){setTimeout(g,Math.floor(0))}(e[l].unwatcher),e[l].onComplete&&(p==="nodata"?r.push(()=>e[l].onComplete(null,!1,e[l].currentInputSnapshot)):r.push(()=>e[l].onComplete(new Error(p),!1,null))))}Hc(t,t.transactionQueueTree_);for(let l=0;l<r.length;l++)ls(r[l]);Bc(t,t.transactionQueueTree_)}function qw(t,e){let n,r=t.transactionQueueTree_;for(n=Y(e);n!==null&&ri(r)===void 0;)r=Fc(r,n),e=de(e),n=Y(e);return r}function Kw(t,e){const n=[];return Yw(t,e,n),n.sort((r,i)=>r.order-i.order),n}function Yw(t,e,n){const r=ri(e);if(r)for(let i=0;i<r.length;i++)n.push(r[i]);Uc(e,i=>{Yw(t,i,n)})}function Hc(t,e){const n=ri(e);if(n){let r=0;for(let i=0;i<n.length;i++)n[i].status!==2&&(n[r]=n[i],r++);n.length=r,pp(e,n.length>0?n:void 0)}Uc(e,r=>{Hc(t,r)})}function yp(t,e){const n=na(qw(t,e)),r=Fc(t.transactionQueueTree_,e);return vR(r,i=>{sd(t,i)}),sd(t,r),Uw(r,i=>{sd(t,i)}),n}function sd(t,e){const n=ri(e);if(n){const r=[];let i=[],s=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(F(s===o-1,"All SENT items should be at beginning of queue."),s=o,n[o].status=3,n[o].abortReason="set"):(F(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),i=i.concat(Qn(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&r.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));s===-1?pp(e,void 0):n.length=s+1,St(t.eventQueue_,na(e),i);for(let o=0;o<r.length;o++)ls(r[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function BR(t){let e="";const n=t.split("/");for(let r=0;r<n.length;r++)if(n[r].length>0){let i=n[r];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch{}e+="/"+i}return e}function HR(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const r=n.split("=");r.length===2?e[decodeURIComponent(r[0])]=decodeURIComponent(r[1]):st(`Invalid query segment '${n}' in query '${t}'`)}return e}const W0=function(t,e){const n=WR(t),r=n.namespace;n.domain==="firebase.com"&&Pn(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!r||r==="undefined")&&n.domain!=="localhost"&&Pn("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||eI();const i=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new tw(n.host,n.secure,r,i,e,"",r!==n.subdomain),path:new le(n.pathString)}},WR=function(t){let e="",n="",r="",i="",s="",o=!0,l="https",u=443;if(typeof t=="string"){let h=t.indexOf("//");h>=0&&(l=t.substring(0,h-1),t=t.substring(h+2));let m=t.indexOf("/");m===-1&&(m=t.length);let p=t.indexOf("?");p===-1&&(p=t.length),e=t.substring(0,Math.min(m,p)),m<p&&(i=BR(t.substring(m,p)));const g=HR(t.substring(Math.min(t.length,p)));h=e.indexOf(":"),h>=0?(o=l==="https"||l==="wss",u=parseInt(e.substring(h+1),10)):h=e.length;const E=e.slice(0,h);if(E.toLowerCase()==="localhost")n="localhost";else if(E.split(".").length<=2)n=E;else{const I=e.indexOf(".");r=e.substring(0,I).toLowerCase(),n=e.substring(I+1),s=r}"ns"in g&&(s=g.ns)}return{host:e,port:u,domain:n,subdomain:r,secure:o,scheme:l,pathString:i,namespace:s}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const G0="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",GR=function(){let t=0;const e=[];return function(n){const r=n===t;t=n;let i;const s=new Array(8);for(i=7;i>=0;i--)s[i]=G0.charAt(n%64),n=Math.floor(n/64);F(n===0,"Cannot push at time == 0");let o=s.join("");if(r){for(i=11;i>=0&&e[i]===63;i--)e[i]=0;e[i]++}else for(i=0;i<12;i++)e[i]=Math.floor(Math.random()*64);for(i=0;i<12;i++)o+=G0.charAt(e[i]);return F(o.length===20,"nextPushId: Length should be 20."),o}}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qR{constructor(e,n,r,i){this.eventType=e,this.eventRegistration=n,this.snapshot=r,this.prevName=i}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+je(this.snapshot.exportVal())}}class KR{constructor(e,n,r){this.eventRegistration=e,this.error=n,this.path=r}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qw{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return F(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xp{constructor(e,n,r,i){this._repo=e,this._path=n,this._queryParams=r,this._orderByCalled=i}get key(){return X(this._path)?null:Gf(this._path)}get ref(){return new an(this._repo,this._path)}get _queryIdentifier(){const e=P0(this._queryParams),n=$f(e);return n==="{}"?"default":n}get _queryObject(){return P0(this._queryParams)}isEqual(e){if(e=Re(e),!(e instanceof xp))return!1;const n=this._repo===e._repo,r=qf(this._path,e._path),i=this._queryIdentifier===e._queryIdentifier;return n&&r&&i}toJSON(){return this.toString()}toString(){return this._repo.toString()+MI(this._path)}}class an extends xp{constructor(e,n){super(e,n,new Xf,!1)}get parent(){const e=uw(this._path);return e===null?null:new an(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class Zi{constructor(e,n,r){this._node=e,this.ref=n,this._index=r}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new le(e),r=Fo(this.ref,e);return new Zi(this._node.getChild(n),r,xe)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(r,i)=>e(new Zi(i,Fo(this.ref,r),xe)))}hasChild(e){const n=new le(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function be(t,e){return t=Re(t),t._checkNotDeleted("ref"),e!==void 0?Fo(t._root,e):t._root}function Fo(t,e){return t=Re(t),Y(t._path)===null?SR("child","path",e):Bw("child","path",e),new an(t._repo,Ee(t._path,e))}function YR(t,e){t=Re(t),zc("push",t._path),$w("push",e,t._path,!0);const n=Gw(t._repo),r=GR(n),i=Fo(t,r),s=Fo(t,r);let o;return o=Promise.resolve(s),i.then=o.then.bind(o),i.catch=o.then.bind(o,void 0),i}function QR(t){return zc("remove",t._path),Zl(t,null)}function Zl(t,e){t=Re(t),zc("set",t._path),$w("set",e,t._path,!1);const n=new ss;return OR(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}function q0(t,e){ER("update",e,t._path);const n=new ss;return DR(t._repo,t._path,e,n.wrapCallback(()=>{})),n.promise}function hi(t){t=Re(t);const e=new Qw(()=>{}),n=new Wc(e);return jR(t._repo,t,n).then(r=>new Zi(r,new an(t._repo,t._path),t._queryParams.getIndex()))}class Wc{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const r=n._queryParams.getIndex();return new qR("value",this,new Zi(e.snapshotNode,new an(n._repo,n._path),r))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new KR(this,e,n):null}matches(e){return e instanceof Wc?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function XR(t,e,n,r,i){const s=new Qw(n,void 0),o=new Wc(s);return MR(t._repo,t,o),()=>FR(t._repo,t,o)}function Vn(t,e,n,r){return XR(t,"value",e)}YT(an);eR(an);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const JR="FIREBASE_DATABASE_EMULATOR_HOST",Ih={};let ZR=!1;function eP(t,e,n,r){t.repoInfo_=new tw(`${e}:${n}`,!1,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0),r&&(t.authTokenProvider_=r)}function tP(t,e,n,r,i){let s=r||t.options.databaseURL;s===void 0&&(t.options.projectId||Pn("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),Ve("Using default host for project ",t.options.projectId),s=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=W0(s,i),l=o.repoInfo,u;typeof process<"u"&&f0&&(u=f0[JR]),u?(s=`http://${u}?ns=${l.namespace}`,o=W0(s,i),l=o.repoInfo):o.repoInfo.secure;const h=new dI(t.name,t.options,e);bR("Invalid Firebase Database URL",o),X(o.path)||Pn("Database URL must point to the root of a Firebase Database (not including a child path).");const m=rP(l,t,h,new uI(t.name,n));return new iP(m,t)}function nP(t,e){const n=Ih[e];(!n||n[t.key]!==t)&&Pn(`Database ${e}(${t.repoInfo_}) has already been deleted.`),UR(t),delete n[t.key]}function rP(t,e,n,r){let i=Ih[e.name];i||(i={},Ih[e.name]=i);let s=i[t.toURLString()];return s&&Pn("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),s=new RR(t,ZR,n,r),i[t.toURLString()]=s,s}class iP{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(PR(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new an(this._repo,re())),this._rootInternal}_delete(){return this._rootInternal!==null&&(nP(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Pn("Cannot call "+e+" on a deleted database.")}}function sP(t=Ic(),e){const n=xr(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const r=Wx("database");r&&oP(n,...r)}return n}function oP(t,e,n,r={}){t=Re(t),t._checkNotDeleted("useEmulator"),t._instanceStarted&&Pn("Cannot call useEmulator() after instance has already been initialized.");const i=t._repoInternal;let s;if(i.repoInfo_.nodeAdmin)r.mockUserToken&&Pn('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),s=new sl(sl.OWNER);else if(r.mockUserToken){const o=typeof r.mockUserToken=="string"?r.mockUserToken:Kx(r.mockUserToken,t.app.options.projectId);s=new sl(o)}eP(i,e,n,s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aP(t){YC(Zr),Kt(new Dt("database",(e,{instanceIdentifier:n})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),s=e.getProvider("app-check-internal");return tP(r,i,s,n)},"PUBLIC").setMultipleInstances(!0)),vt(p0,m0,t),vt(p0,m0,"esm2017")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lP{constructor(e,n){this.committed=e,this.snapshot=n}toJSON(){return{committed:this.committed,snapshot:this.snapshot.toJSON()}}}function K0(t,e,n){var r;if(t=Re(t),zc("Reference.transaction",t._path),t.key===".length"||t.key===".keys")throw"Reference.transaction failed: "+t.key+" is a read-only object.";const i=(r=void 0)!==null&&r!==void 0?r:!0,s=new ss,o=(u,h,m)=>{let p=null;u?s.reject(u):(p=new Zi(m,new an(t._repo,t._path),xe),s.resolve(new lP(h,p)))},l=Vn(t,()=>{});return zR(t._repo,t._path,e,o,l,i),s.promise}Sn.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};Sn.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};aP();var Y0=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Xw;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(x,y){function _(){}_.prototype=y.prototype,x.D=y.prototype,x.prototype=new _,x.prototype.constructor=x,x.C=function(S,C,T){for(var k=Array(arguments.length-2),K=2;K<arguments.length;K++)k[K-2]=arguments[K];return y.prototype[C].apply(S,k)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(x,y,_){_||(_=0);var S=Array(16);if(typeof y=="string")for(var C=0;16>C;++C)S[C]=y.charCodeAt(_++)|y.charCodeAt(_++)<<8|y.charCodeAt(_++)<<16|y.charCodeAt(_++)<<24;else for(C=0;16>C;++C)S[C]=y[_++]|y[_++]<<8|y[_++]<<16|y[_++]<<24;y=x.g[0],_=x.g[1],C=x.g[2];var T=x.g[3],k=y+(T^_&(C^T))+S[0]+3614090360&4294967295;y=_+(k<<7&4294967295|k>>>25),k=T+(C^y&(_^C))+S[1]+3905402710&4294967295,T=y+(k<<12&4294967295|k>>>20),k=C+(_^T&(y^_))+S[2]+606105819&4294967295,C=T+(k<<17&4294967295|k>>>15),k=_+(y^C&(T^y))+S[3]+3250441966&4294967295,_=C+(k<<22&4294967295|k>>>10),k=y+(T^_&(C^T))+S[4]+4118548399&4294967295,y=_+(k<<7&4294967295|k>>>25),k=T+(C^y&(_^C))+S[5]+1200080426&4294967295,T=y+(k<<12&4294967295|k>>>20),k=C+(_^T&(y^_))+S[6]+2821735955&4294967295,C=T+(k<<17&4294967295|k>>>15),k=_+(y^C&(T^y))+S[7]+4249261313&4294967295,_=C+(k<<22&4294967295|k>>>10),k=y+(T^_&(C^T))+S[8]+1770035416&4294967295,y=_+(k<<7&4294967295|k>>>25),k=T+(C^y&(_^C))+S[9]+2336552879&4294967295,T=y+(k<<12&4294967295|k>>>20),k=C+(_^T&(y^_))+S[10]+4294925233&4294967295,C=T+(k<<17&4294967295|k>>>15),k=_+(y^C&(T^y))+S[11]+2304563134&4294967295,_=C+(k<<22&4294967295|k>>>10),k=y+(T^_&(C^T))+S[12]+1804603682&4294967295,y=_+(k<<7&4294967295|k>>>25),k=T+(C^y&(_^C))+S[13]+4254626195&4294967295,T=y+(k<<12&4294967295|k>>>20),k=C+(_^T&(y^_))+S[14]+2792965006&4294967295,C=T+(k<<17&4294967295|k>>>15),k=_+(y^C&(T^y))+S[15]+1236535329&4294967295,_=C+(k<<22&4294967295|k>>>10),k=y+(C^T&(_^C))+S[1]+4129170786&4294967295,y=_+(k<<5&4294967295|k>>>27),k=T+(_^C&(y^_))+S[6]+3225465664&4294967295,T=y+(k<<9&4294967295|k>>>23),k=C+(y^_&(T^y))+S[11]+643717713&4294967295,C=T+(k<<14&4294967295|k>>>18),k=_+(T^y&(C^T))+S[0]+3921069994&4294967295,_=C+(k<<20&4294967295|k>>>12),k=y+(C^T&(_^C))+S[5]+3593408605&4294967295,y=_+(k<<5&4294967295|k>>>27),k=T+(_^C&(y^_))+S[10]+38016083&4294967295,T=y+(k<<9&4294967295|k>>>23),k=C+(y^_&(T^y))+S[15]+3634488961&4294967295,C=T+(k<<14&4294967295|k>>>18),k=_+(T^y&(C^T))+S[4]+3889429448&4294967295,_=C+(k<<20&4294967295|k>>>12),k=y+(C^T&(_^C))+S[9]+568446438&4294967295,y=_+(k<<5&4294967295|k>>>27),k=T+(_^C&(y^_))+S[14]+3275163606&4294967295,T=y+(k<<9&4294967295|k>>>23),k=C+(y^_&(T^y))+S[3]+4107603335&4294967295,C=T+(k<<14&4294967295|k>>>18),k=_+(T^y&(C^T))+S[8]+1163531501&4294967295,_=C+(k<<20&4294967295|k>>>12),k=y+(C^T&(_^C))+S[13]+2850285829&4294967295,y=_+(k<<5&4294967295|k>>>27),k=T+(_^C&(y^_))+S[2]+4243563512&4294967295,T=y+(k<<9&4294967295|k>>>23),k=C+(y^_&(T^y))+S[7]+1735328473&4294967295,C=T+(k<<14&4294967295|k>>>18),k=_+(T^y&(C^T))+S[12]+2368359562&4294967295,_=C+(k<<20&4294967295|k>>>12),k=y+(_^C^T)+S[5]+4294588738&4294967295,y=_+(k<<4&4294967295|k>>>28),k=T+(y^_^C)+S[8]+2272392833&4294967295,T=y+(k<<11&4294967295|k>>>21),k=C+(T^y^_)+S[11]+1839030562&4294967295,C=T+(k<<16&4294967295|k>>>16),k=_+(C^T^y)+S[14]+4259657740&4294967295,_=C+(k<<23&4294967295|k>>>9),k=y+(_^C^T)+S[1]+2763975236&4294967295,y=_+(k<<4&4294967295|k>>>28),k=T+(y^_^C)+S[4]+1272893353&4294967295,T=y+(k<<11&4294967295|k>>>21),k=C+(T^y^_)+S[7]+4139469664&4294967295,C=T+(k<<16&4294967295|k>>>16),k=_+(C^T^y)+S[10]+3200236656&4294967295,_=C+(k<<23&4294967295|k>>>9),k=y+(_^C^T)+S[13]+681279174&4294967295,y=_+(k<<4&4294967295|k>>>28),k=T+(y^_^C)+S[0]+3936430074&4294967295,T=y+(k<<11&4294967295|k>>>21),k=C+(T^y^_)+S[3]+3572445317&4294967295,C=T+(k<<16&4294967295|k>>>16),k=_+(C^T^y)+S[6]+76029189&4294967295,_=C+(k<<23&4294967295|k>>>9),k=y+(_^C^T)+S[9]+3654602809&4294967295,y=_+(k<<4&4294967295|k>>>28),k=T+(y^_^C)+S[12]+3873151461&4294967295,T=y+(k<<11&4294967295|k>>>21),k=C+(T^y^_)+S[15]+530742520&4294967295,C=T+(k<<16&4294967295|k>>>16),k=_+(C^T^y)+S[2]+3299628645&4294967295,_=C+(k<<23&4294967295|k>>>9),k=y+(C^(_|~T))+S[0]+4096336452&4294967295,y=_+(k<<6&4294967295|k>>>26),k=T+(_^(y|~C))+S[7]+1126891415&4294967295,T=y+(k<<10&4294967295|k>>>22),k=C+(y^(T|~_))+S[14]+2878612391&4294967295,C=T+(k<<15&4294967295|k>>>17),k=_+(T^(C|~y))+S[5]+4237533241&4294967295,_=C+(k<<21&4294967295|k>>>11),k=y+(C^(_|~T))+S[12]+1700485571&4294967295,y=_+(k<<6&4294967295|k>>>26),k=T+(_^(y|~C))+S[3]+2399980690&4294967295,T=y+(k<<10&4294967295|k>>>22),k=C+(y^(T|~_))+S[10]+4293915773&4294967295,C=T+(k<<15&4294967295|k>>>17),k=_+(T^(C|~y))+S[1]+2240044497&4294967295,_=C+(k<<21&4294967295|k>>>11),k=y+(C^(_|~T))+S[8]+1873313359&4294967295,y=_+(k<<6&4294967295|k>>>26),k=T+(_^(y|~C))+S[15]+4264355552&4294967295,T=y+(k<<10&4294967295|k>>>22),k=C+(y^(T|~_))+S[6]+2734768916&4294967295,C=T+(k<<15&4294967295|k>>>17),k=_+(T^(C|~y))+S[13]+1309151649&4294967295,_=C+(k<<21&4294967295|k>>>11),k=y+(C^(_|~T))+S[4]+4149444226&4294967295,y=_+(k<<6&4294967295|k>>>26),k=T+(_^(y|~C))+S[11]+3174756917&4294967295,T=y+(k<<10&4294967295|k>>>22),k=C+(y^(T|~_))+S[2]+718787259&4294967295,C=T+(k<<15&4294967295|k>>>17),k=_+(T^(C|~y))+S[9]+3951481745&4294967295,x.g[0]=x.g[0]+y&4294967295,x.g[1]=x.g[1]+(C+(k<<21&4294967295|k>>>11))&4294967295,x.g[2]=x.g[2]+C&4294967295,x.g[3]=x.g[3]+T&4294967295}r.prototype.u=function(x,y){y===void 0&&(y=x.length);for(var _=y-this.blockSize,S=this.B,C=this.h,T=0;T<y;){if(C==0)for(;T<=_;)i(this,x,T),T+=this.blockSize;if(typeof x=="string"){for(;T<y;)if(S[C++]=x.charCodeAt(T++),C==this.blockSize){i(this,S),C=0;break}}else for(;T<y;)if(S[C++]=x[T++],C==this.blockSize){i(this,S),C=0;break}}this.h=C,this.o+=y},r.prototype.v=function(){var x=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);x[0]=128;for(var y=1;y<x.length-8;++y)x[y]=0;var _=8*this.o;for(y=x.length-8;y<x.length;++y)x[y]=_&255,_/=256;for(this.u(x),x=Array(16),y=_=0;4>y;++y)for(var S=0;32>S;S+=8)x[_++]=this.g[y]>>>S&255;return x};function s(x,y){var _=l;return Object.prototype.hasOwnProperty.call(_,x)?_[x]:_[x]=y(x)}function o(x,y){this.h=y;for(var _=[],S=!0,C=x.length-1;0<=C;C--){var T=x[C]|0;S&&T==y||(_[C]=T,S=!1)}this.g=_}var l={};function u(x){return-128<=x&&128>x?s(x,function(y){return new o([y|0],0>y?-1:0)}):new o([x|0],0>x?-1:0)}function h(x){if(isNaN(x)||!isFinite(x))return p;if(0>x)return L(h(-x));for(var y=[],_=1,S=0;x>=_;S++)y[S]=x/_|0,_*=4294967296;return new o(y,0)}function m(x,y){if(x.length==0)throw Error("number format error: empty string");if(y=y||10,2>y||36<y)throw Error("radix out of range: "+y);if(x.charAt(0)=="-")return L(m(x.substring(1),y));if(0<=x.indexOf("-"))throw Error('number format error: interior "-" character');for(var _=h(Math.pow(y,8)),S=p,C=0;C<x.length;C+=8){var T=Math.min(8,x.length-C),k=parseInt(x.substring(C,C+T),y);8>T?(T=h(Math.pow(y,T)),S=S.j(T).add(h(k))):(S=S.j(_),S=S.add(h(k)))}return S}var p=u(0),g=u(1),E=u(16777216);t=o.prototype,t.m=function(){if(P(this))return-L(this).m();for(var x=0,y=1,_=0;_<this.g.length;_++){var S=this.i(_);x+=(0<=S?S:4294967296+S)*y,y*=4294967296}return x},t.toString=function(x){if(x=x||10,2>x||36<x)throw Error("radix out of range: "+x);if(I(this))return"0";if(P(this))return"-"+L(this).toString(x);for(var y=h(Math.pow(x,6)),_=this,S="";;){var C=j(_,y).g;_=N(_,C.j(y));var T=((0<_.g.length?_.g[0]:_.h)>>>0).toString(x);if(_=C,I(_))return T+S;for(;6>T.length;)T="0"+T;S=T+S}},t.i=function(x){return 0>x?0:x<this.g.length?this.g[x]:this.h};function I(x){if(x.h!=0)return!1;for(var y=0;y<x.g.length;y++)if(x.g[y]!=0)return!1;return!0}function P(x){return x.h==-1}t.l=function(x){return x=N(this,x),P(x)?-1:I(x)?0:1};function L(x){for(var y=x.g.length,_=[],S=0;S<y;S++)_[S]=~x.g[S];return new o(_,~x.h).add(g)}t.abs=function(){return P(this)?L(this):this},t.add=function(x){for(var y=Math.max(this.g.length,x.g.length),_=[],S=0,C=0;C<=y;C++){var T=S+(this.i(C)&65535)+(x.i(C)&65535),k=(T>>>16)+(this.i(C)>>>16)+(x.i(C)>>>16);S=k>>>16,T&=65535,k&=65535,_[C]=k<<16|T}return new o(_,_[_.length-1]&-2147483648?-1:0)};function N(x,y){return x.add(L(y))}t.j=function(x){if(I(this)||I(x))return p;if(P(this))return P(x)?L(this).j(L(x)):L(L(this).j(x));if(P(x))return L(this.j(L(x)));if(0>this.l(E)&&0>x.l(E))return h(this.m()*x.m());for(var y=this.g.length+x.g.length,_=[],S=0;S<2*y;S++)_[S]=0;for(S=0;S<this.g.length;S++)for(var C=0;C<x.g.length;C++){var T=this.i(S)>>>16,k=this.i(S)&65535,K=x.i(C)>>>16,fe=x.i(C)&65535;_[2*S+2*C]+=k*fe,w(_,2*S+2*C),_[2*S+2*C+1]+=T*fe,w(_,2*S+2*C+1),_[2*S+2*C+1]+=k*K,w(_,2*S+2*C+1),_[2*S+2*C+2]+=T*K,w(_,2*S+2*C+2)}for(S=0;S<y;S++)_[S]=_[2*S+1]<<16|_[2*S];for(S=y;S<2*y;S++)_[S]=0;return new o(_,0)};function w(x,y){for(;(x[y]&65535)!=x[y];)x[y+1]+=x[y]>>>16,x[y]&=65535,y++}function b(x,y){this.g=x,this.h=y}function j(x,y){if(I(y))throw Error("division by zero");if(I(x))return new b(p,p);if(P(x))return y=j(L(x),y),new b(L(y.g),L(y.h));if(P(y))return y=j(x,L(y)),new b(L(y.g),y.h);if(30<x.g.length){if(P(x)||P(y))throw Error("slowDivide_ only works with positive integers.");for(var _=g,S=y;0>=S.l(x);)_=O(_),S=O(S);var C=U(_,1),T=U(S,1);for(S=U(S,2),_=U(_,2);!I(S);){var k=T.add(S);0>=k.l(x)&&(C=C.add(_),T=k),S=U(S,1),_=U(_,1)}return y=N(x,C.j(y)),new b(C,y)}for(C=p;0<=x.l(y);){for(_=Math.max(1,Math.floor(x.m()/y.m())),S=Math.ceil(Math.log(_)/Math.LN2),S=48>=S?1:Math.pow(2,S-48),T=h(_),k=T.j(y);P(k)||0<k.l(x);)_-=S,T=h(_),k=T.j(y);I(T)&&(T=g),C=C.add(T),x=N(x,k)}return new b(C,x)}t.A=function(x){return j(this,x).h},t.and=function(x){for(var y=Math.max(this.g.length,x.g.length),_=[],S=0;S<y;S++)_[S]=this.i(S)&x.i(S);return new o(_,this.h&x.h)},t.or=function(x){for(var y=Math.max(this.g.length,x.g.length),_=[],S=0;S<y;S++)_[S]=this.i(S)|x.i(S);return new o(_,this.h|x.h)},t.xor=function(x){for(var y=Math.max(this.g.length,x.g.length),_=[],S=0;S<y;S++)_[S]=this.i(S)^x.i(S);return new o(_,this.h^x.h)};function O(x){for(var y=x.g.length+1,_=[],S=0;S<y;S++)_[S]=x.i(S)<<1|x.i(S-1)>>>31;return new o(_,x.h)}function U(x,y){var _=y>>5;y%=32;for(var S=x.g.length-_,C=[],T=0;T<S;T++)C[T]=0<y?x.i(T+_)>>>y|x.i(T+_+1)<<32-y:x.i(T+_);return new o(C,x.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=m,Xw=o}).apply(typeof Y0<"u"?Y0:typeof self<"u"?self:typeof window<"u"?window:{});var Va=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};(function(){var t,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,d,f){return a==Array.prototype||a==Object.prototype||(a[d]=f.value),a};function n(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Va=="object"&&Va];for(var d=0;d<a.length;++d){var f=a[d];if(f&&f.Math==Math)return f}throw Error("Cannot find global object")}var r=n(this);function i(a,d){if(d)e:{var f=r;a=a.split(".");for(var v=0;v<a.length-1;v++){var R=a[v];if(!(R in f))break e;f=f[R]}a=a[a.length-1],v=f[a],d=d(v),d!=v&&d!=null&&e(f,a,{configurable:!0,writable:!0,value:d})}}function s(a,d){a instanceof String&&(a+="");var f=0,v=!1,R={next:function(){if(!v&&f<a.length){var A=f++;return{value:d(A,a[A]),done:!1}}return v=!0,{done:!0,value:void 0}}};return R[Symbol.iterator]=function(){return R},R}i("Array.prototype.values",function(a){return a||function(){return s(this,function(d,f){return f})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},l=this||self;function u(a){var d=typeof a;return d=d!="object"?d:a?Array.isArray(a)?"array":d:"null",d=="array"||d=="object"&&typeof a.length=="number"}function h(a){var d=typeof a;return d=="object"&&a!=null||d=="function"}function m(a,d,f){return a.call.apply(a.bind,arguments)}function p(a,d,f){if(!a)throw Error();if(2<arguments.length){var v=Array.prototype.slice.call(arguments,2);return function(){var R=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(R,v),a.apply(d,R)}}return function(){return a.apply(d,arguments)}}function g(a,d,f){return g=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?m:p,g.apply(null,arguments)}function E(a,d){var f=Array.prototype.slice.call(arguments,1);return function(){var v=f.slice();return v.push.apply(v,arguments),a.apply(this,v)}}function I(a,d){function f(){}f.prototype=d.prototype,a.aa=d.prototype,a.prototype=new f,a.prototype.constructor=a,a.Qb=function(v,R,A){for(var z=Array(arguments.length-2),ce=2;ce<arguments.length;ce++)z[ce-2]=arguments[ce];return d.prototype[R].apply(v,z)}}function P(a){const d=a.length;if(0<d){const f=Array(d);for(let v=0;v<d;v++)f[v]=a[v];return f}return[]}function L(a,d){for(let f=1;f<arguments.length;f++){const v=arguments[f];if(u(v)){const R=a.length||0,A=v.length||0;a.length=R+A;for(let z=0;z<A;z++)a[R+z]=v[z]}else a.push(v)}}class N{constructor(d,f){this.i=d,this.j=f,this.h=0,this.g=null}get(){let d;return 0<this.h?(this.h--,d=this.g,this.g=d.next,d.next=null):d=this.i(),d}}function w(a){return/^[\s\xa0]*$/.test(a)}function b(){var a=l.navigator;return a&&(a=a.userAgent)?a:""}function j(a){return j[" "](a),a}j[" "]=function(){};var O=b().indexOf("Gecko")!=-1&&!(b().toLowerCase().indexOf("webkit")!=-1&&b().indexOf("Edge")==-1)&&!(b().indexOf("Trident")!=-1||b().indexOf("MSIE")!=-1)&&b().indexOf("Edge")==-1;function U(a,d,f){for(const v in a)d.call(f,a[v],v,a)}function x(a,d){for(const f in a)d.call(void 0,a[f],f,a)}function y(a){const d={};for(const f in a)d[f]=a[f];return d}const _="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function S(a,d){let f,v;for(let R=1;R<arguments.length;R++){v=arguments[R];for(f in v)a[f]=v[f];for(let A=0;A<_.length;A++)f=_[A],Object.prototype.hasOwnProperty.call(v,f)&&(a[f]=v[f])}}function C(a){var d=1;a=a.split(":");const f=[];for(;0<d&&a.length;)f.push(a.shift()),d--;return a.length&&f.push(a.join(":")),f}function T(a){l.setTimeout(()=>{throw a},0)}function k(){var a=B;let d=null;return a.g&&(d=a.g,a.g=a.g.next,a.g||(a.h=null),d.next=null),d}class K{constructor(){this.h=this.g=null}add(d,f){const v=fe.get();v.set(d,f),this.h?this.h.next=v:this.g=v,this.h=v}}var fe=new N(()=>new Je,a=>a.reset());class Je{constructor(){this.next=this.g=this.h=null}set(d,f){this.h=d,this.g=f,this.next=null}reset(){this.next=this.g=this.h=null}}let Pe,M=!1,B=new K,q=()=>{const a=l.Promise.resolve(void 0);Pe=()=>{a.then(se)}};var se=()=>{for(var a;a=k();){try{a.h.call(a.g)}catch(f){T(f)}var d=fe;d.j(a),100>d.h&&(d.h++,a.next=d.g,d.g=a)}M=!1};function Z(){this.s=this.s,this.C=this.C}Z.prototype.s=!1,Z.prototype.ma=function(){this.s||(this.s=!0,this.N())},Z.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function oe(a,d){this.type=a,this.g=this.target=d,this.defaultPrevented=!1}oe.prototype.h=function(){this.defaultPrevented=!0};var ln=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var a=!1,d=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const f=()=>{};l.addEventListener("test",f,d),l.removeEventListener("test",f,d)}catch{}return a}();function cn(a,d){if(oe.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var f=this.type=a.type,v=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=d,d=a.relatedTarget){if(O){e:{try{j(d.nodeName);var R=!0;break e}catch{}R=!1}R||(d=null)}}else f=="mouseover"?d=a.fromElement:f=="mouseout"&&(d=a.toElement);this.relatedTarget=d,v?(this.clientX=v.clientX!==void 0?v.clientX:v.pageX,this.clientY=v.clientY!==void 0?v.clientY:v.pageY,this.screenX=v.screenX||0,this.screenY=v.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:un[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&cn.aa.h.call(this)}}I(cn,oe);var un={2:"touch",3:"pen",4:"mouse"};cn.prototype.h=function(){cn.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var dn="closure_listenable_"+(1e6*Math.random()|0),E1=0;function S1(a,d,f,v,R){this.listener=a,this.proxy=null,this.src=d,this.type=f,this.capture=!!v,this.ha=R,this.key=++E1,this.da=this.fa=!1}function oa(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function aa(a){this.src=a,this.g={},this.h=0}aa.prototype.add=function(a,d,f,v,R){var A=a.toString();a=this.g[A],a||(a=this.g[A]=[],this.h++);var z=Qc(a,d,v,R);return-1<z?(d=a[z],f||(d.fa=!1)):(d=new S1(d,this.src,A,!!v,R),d.fa=f,a.push(d)),d};function Yc(a,d){var f=d.type;if(f in a.g){var v=a.g[f],R=Array.prototype.indexOf.call(v,d,void 0),A;(A=0<=R)&&Array.prototype.splice.call(v,R,1),A&&(oa(d),a.g[f].length==0&&(delete a.g[f],a.h--))}}function Qc(a,d,f,v){for(var R=0;R<a.length;++R){var A=a[R];if(!A.da&&A.listener==d&&A.capture==!!f&&A.ha==v)return R}return-1}var Xc="closure_lm_"+(1e6*Math.random()|0),Jc={};function Tp(a,d,f,v,R){if(Array.isArray(d)){for(var A=0;A<d.length;A++)Tp(a,d[A],f,v,R);return null}return f=Ap(f),a&&a[dn]?a.K(d,f,h(v)?!!v.capture:!1,R):b1(a,d,f,!1,v,R)}function b1(a,d,f,v,R,A){if(!d)throw Error("Invalid event type");var z=h(R)?!!R.capture:!!R,ce=eu(a);if(ce||(a[Xc]=ce=new aa(a)),f=ce.add(d,f,v,z,A),f.proxy)return f;if(v=N1(),f.proxy=v,v.src=a,v.listener=f,a.addEventListener)ln||(R=z),R===void 0&&(R=!1),a.addEventListener(d.toString(),v,R);else if(a.attachEvent)a.attachEvent(Pp(d.toString()),v);else if(a.addListener&&a.removeListener)a.addListener(v);else throw Error("addEventListener and attachEvent are unavailable.");return f}function N1(){function a(f){return d.call(a.src,a.listener,f)}const d=C1;return a}function Rp(a,d,f,v,R){if(Array.isArray(d))for(var A=0;A<d.length;A++)Rp(a,d[A],f,v,R);else v=h(v)?!!v.capture:!!v,f=Ap(f),a&&a[dn]?(a=a.i,d=String(d).toString(),d in a.g&&(A=a.g[d],f=Qc(A,f,v,R),-1<f&&(oa(A[f]),Array.prototype.splice.call(A,f,1),A.length==0&&(delete a.g[d],a.h--)))):a&&(a=eu(a))&&(d=a.g[d.toString()],a=-1,d&&(a=Qc(d,f,v,R)),(f=-1<a?d[a]:null)&&Zc(f))}function Zc(a){if(typeof a!="number"&&a&&!a.da){var d=a.src;if(d&&d[dn])Yc(d.i,a);else{var f=a.type,v=a.proxy;d.removeEventListener?d.removeEventListener(f,v,a.capture):d.detachEvent?d.detachEvent(Pp(f),v):d.addListener&&d.removeListener&&d.removeListener(v),(f=eu(d))?(Yc(f,a),f.h==0&&(f.src=null,d[Xc]=null)):oa(a)}}}function Pp(a){return a in Jc?Jc[a]:Jc[a]="on"+a}function C1(a,d){if(a.da)a=!0;else{d=new cn(d,this);var f=a.listener,v=a.ha||a.src;a.fa&&Zc(a),a=f.call(v,d)}return a}function eu(a){return a=a[Xc],a instanceof aa?a:null}var tu="__closure_events_fn_"+(1e9*Math.random()>>>0);function Ap(a){return typeof a=="function"?a:(a[tu]||(a[tu]=function(d){return a.handleEvent(d)}),a[tu])}function We(){Z.call(this),this.i=new aa(this),this.M=this,this.F=null}I(We,Z),We.prototype[dn]=!0,We.prototype.removeEventListener=function(a,d,f,v){Rp(this,a,d,f,v)};function Ze(a,d){var f,v=a.F;if(v)for(f=[];v;v=v.F)f.push(v);if(a=a.M,v=d.type||d,typeof d=="string")d=new oe(d,a);else if(d instanceof oe)d.target=d.target||a;else{var R=d;d=new oe(v,a),S(d,R)}if(R=!0,f)for(var A=f.length-1;0<=A;A--){var z=d.g=f[A];R=la(z,v,!0,d)&&R}if(z=d.g=a,R=la(z,v,!0,d)&&R,R=la(z,v,!1,d)&&R,f)for(A=0;A<f.length;A++)z=d.g=f[A],R=la(z,v,!1,d)&&R}We.prototype.N=function(){if(We.aa.N.call(this),this.i){var a=this.i,d;for(d in a.g){for(var f=a.g[d],v=0;v<f.length;v++)oa(f[v]);delete a.g[d],a.h--}}this.F=null},We.prototype.K=function(a,d,f,v){return this.i.add(String(a),d,!1,f,v)},We.prototype.L=function(a,d,f,v){return this.i.add(String(a),d,!0,f,v)};function la(a,d,f,v){if(d=a.i.g[String(d)],!d)return!0;d=d.concat();for(var R=!0,A=0;A<d.length;++A){var z=d[A];if(z&&!z.da&&z.capture==f){var ce=z.listener,Ue=z.ha||z.src;z.fa&&Yc(a.i,z),R=ce.call(Ue,v)!==!1&&R}}return R&&!v.defaultPrevented}function jp(a,d,f){if(typeof a=="function")f&&(a=g(a,f));else if(a&&typeof a.handleEvent=="function")a=g(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(d)?-1:l.setTimeout(a,d||0)}function Op(a){a.g=jp(()=>{a.g=null,a.i&&(a.i=!1,Op(a))},a.l);const d=a.h;a.h=null,a.m.apply(null,d)}class I1 extends Z{constructor(d,f){super(),this.m=d,this.l=f,this.h=null,this.i=!1,this.g=null}j(d){this.h=arguments,this.g?this.i=!0:Op(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ds(a){Z.call(this),this.h=a,this.g={}}I(ds,Z);var Dp=[];function Lp(a){U(a.g,function(d,f){this.g.hasOwnProperty(f)&&Zc(d)},a),a.g={}}ds.prototype.N=function(){ds.aa.N.call(this),Lp(this)},ds.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var nu=l.JSON.stringify,T1=l.JSON.parse,R1=class{stringify(a){return l.JSON.stringify(a,void 0)}parse(a){return l.JSON.parse(a,void 0)}};function ru(){}ru.prototype.h=null;function Mp(a){return a.h||(a.h=a.i())}function P1(){}var hs={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function iu(){oe.call(this,"d")}I(iu,oe);function su(){oe.call(this,"c")}I(su,oe);var ii={},Fp=null;function ou(){return Fp=Fp||new We}ii.La="serverreachability";function Up(a){oe.call(this,ii.La,a)}I(Up,oe);function fs(a){const d=ou();Ze(d,new Up(d))}ii.STAT_EVENT="statevent";function zp(a,d){oe.call(this,ii.STAT_EVENT,a),this.stat=d}I(zp,oe);function et(a){const d=ou();Ze(d,new zp(d,a))}ii.Ma="timingevent";function Vp(a,d){oe.call(this,ii.Ma,a),this.size=d}I(Vp,oe);function ps(a,d){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){a()},d)}function ms(){this.g=!0}ms.prototype.xa=function(){this.g=!1};function A1(a,d,f,v,R,A){a.info(function(){if(a.g)if(A)for(var z="",ce=A.split("&"),Ue=0;Ue<ce.length;Ue++){var ne=ce[Ue].split("=");if(1<ne.length){var Ge=ne[0];ne=ne[1];var qe=Ge.split("_");z=2<=qe.length&&qe[1]=="type"?z+(Ge+"="+ne+"&"):z+(Ge+"=redacted&")}}else z=null;else z=A;return"XMLHTTP REQ ("+v+") [attempt "+R+"]: "+d+`
`+f+`
`+z})}function j1(a,d,f,v,R,A,z){a.info(function(){return"XMLHTTP RESP ("+v+") [ attempt "+R+"]: "+d+`
`+f+`
`+A+" "+z})}function si(a,d,f,v){a.info(function(){return"XMLHTTP TEXT ("+d+"): "+D1(a,f)+(v?" "+v:"")})}function O1(a,d){a.info(function(){return"TIMEOUT: "+d})}ms.prototype.info=function(){};function D1(a,d){if(!a.g)return d;if(!d)return null;try{var f=JSON.parse(d);if(f){for(a=0;a<f.length;a++)if(Array.isArray(f[a])){var v=f[a];if(!(2>v.length)){var R=v[1];if(Array.isArray(R)&&!(1>R.length)){var A=R[0];if(A!="noop"&&A!="stop"&&A!="close")for(var z=1;z<R.length;z++)R[z]=""}}}}return nu(f)}catch{return d}}var au={NO_ERROR:0,TIMEOUT:8},L1={},lu;function ca(){}I(ca,ru),ca.prototype.g=function(){return new XMLHttpRequest},ca.prototype.i=function(){return{}},lu=new ca;function On(a,d,f,v){this.j=a,this.i=d,this.l=f,this.R=v||1,this.U=new ds(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new $p}function $p(){this.i=null,this.g="",this.h=!1}var Bp={},cu={};function uu(a,d,f){a.L=1,a.v=fa(hn(d)),a.m=f,a.P=!0,Hp(a,null)}function Hp(a,d){a.F=Date.now(),ua(a),a.A=hn(a.v);var f=a.A,v=a.R;Array.isArray(v)||(v=[String(v)]),im(f.i,"t",v),a.C=0,f=a.j.J,a.h=new $p,a.g=km(a.j,f?d:null,!a.m),0<a.O&&(a.M=new I1(g(a.Y,a,a.g),a.O)),d=a.U,f=a.g,v=a.ca;var R="readystatechange";Array.isArray(R)||(R&&(Dp[0]=R.toString()),R=Dp);for(var A=0;A<R.length;A++){var z=Tp(f,R[A],v||d.handleEvent,!1,d.h||d);if(!z)break;d.g[z.key]=z}d=a.H?y(a.H):{},a.m?(a.u||(a.u="POST"),d["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,d)):(a.u="GET",a.g.ea(a.A,a.u,null,d)),fs(),A1(a.i,a.u,a.A,a.l,a.R,a.m)}On.prototype.ca=function(a){a=a.target;const d=this.M;d&&fn(a)==3?d.j():this.Y(a)},On.prototype.Y=function(a){try{if(a==this.g)e:{const qe=fn(this.g);var d=this.g.Ba();const li=this.g.Z();if(!(3>qe)&&(qe!=3||this.g&&(this.h.h||this.g.oa()||dm(this.g)))){this.J||qe!=4||d==7||(d==8||0>=li?fs(3):fs(2)),du(this);var f=this.g.Z();this.X=f;t:if(Wp(this)){var v=dm(this.g);a="";var R=v.length,A=fn(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){wr(this),gs(this);var z="";break t}this.h.i=new l.TextDecoder}for(d=0;d<R;d++)this.h.h=!0,a+=this.h.i.decode(v[d],{stream:!(A&&d==R-1)});v.length=0,this.h.g+=a,this.C=0,z=this.h.g}else z=this.g.oa();if(this.o=f==200,j1(this.i,this.u,this.A,this.l,this.R,qe,f),this.o){if(this.T&&!this.K){t:{if(this.g){var ce,Ue=this.g;if((ce=Ue.g?Ue.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!w(ce)){var ne=ce;break t}}ne=null}if(f=ne)si(this.i,this.l,f,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,hu(this,f);else{this.o=!1,this.s=3,et(12),wr(this),gs(this);break e}}if(this.P){f=!0;let Lt;for(;!this.J&&this.C<z.length;)if(Lt=M1(this,z),Lt==cu){qe==4&&(this.s=4,et(14),f=!1),si(this.i,this.l,null,"[Incomplete Response]");break}else if(Lt==Bp){this.s=4,et(15),si(this.i,this.l,z,"[Invalid Chunk]"),f=!1;break}else si(this.i,this.l,Lt,null),hu(this,Lt);if(Wp(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),qe!=4||z.length!=0||this.h.h||(this.s=1,et(16),f=!1),this.o=this.o&&f,!f)si(this.i,this.l,z,"[Invalid Chunked Response]"),wr(this),gs(this);else if(0<z.length&&!this.W){this.W=!0;var Ge=this.j;Ge.g==this&&Ge.ba&&!Ge.M&&(Ge.j.info("Great, no buffering proxy detected. Bytes received: "+z.length),yu(Ge),Ge.M=!0,et(11))}}else si(this.i,this.l,z,null),hu(this,z);qe==4&&wr(this),this.o&&!this.J&&(qe==4?ym(this.j,this):(this.o=!1,ua(this)))}else ek(this.g),f==400&&0<z.indexOf("Unknown SID")?(this.s=3,et(12)):(this.s=0,et(13)),wr(this),gs(this)}}}catch{}finally{}};function Wp(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function M1(a,d){var f=a.C,v=d.indexOf(`
`,f);return v==-1?cu:(f=Number(d.substring(f,v)),isNaN(f)?Bp:(v+=1,v+f>d.length?cu:(d=d.slice(v,v+f),a.C=v+f,d)))}On.prototype.cancel=function(){this.J=!0,wr(this)};function ua(a){a.S=Date.now()+a.I,Gp(a,a.I)}function Gp(a,d){if(a.B!=null)throw Error("WatchDog timer not null");a.B=ps(g(a.ba,a),d)}function du(a){a.B&&(l.clearTimeout(a.B),a.B=null)}On.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(O1(this.i,this.A),this.L!=2&&(fs(),et(17)),wr(this),this.s=2,gs(this)):Gp(this,this.S-a)};function gs(a){a.j.G==0||a.J||ym(a.j,a)}function wr(a){du(a);var d=a.M;d&&typeof d.ma=="function"&&d.ma(),a.M=null,Lp(a.U),a.g&&(d=a.g,a.g=null,d.abort(),d.ma())}function hu(a,d){try{var f=a.j;if(f.G!=0&&(f.g==a||fu(f.h,a))){if(!a.K&&fu(f.h,a)&&f.G==3){try{var v=f.Da.g.parse(d)}catch{v=null}if(Array.isArray(v)&&v.length==3){var R=v;if(R[0]==0){e:if(!f.u){if(f.g)if(f.g.F+3e3<a.F)xa(f),va(f);else break e;vu(f),et(18)}}else f.za=R[1],0<f.za-f.T&&37500>R[2]&&f.F&&f.v==0&&!f.C&&(f.C=ps(g(f.Za,f),6e3));if(1>=Yp(f.h)&&f.ca){try{f.ca()}catch{}f.ca=void 0}}else Er(f,11)}else if((a.K||f.g==a)&&xa(f),!w(d))for(R=f.Da.g.parse(d),d=0;d<R.length;d++){let ne=R[d];if(f.T=ne[0],ne=ne[1],f.G==2)if(ne[0]=="c"){f.K=ne[1],f.ia=ne[2];const Ge=ne[3];Ge!=null&&(f.la=Ge,f.j.info("VER="+f.la));const qe=ne[4];qe!=null&&(f.Aa=qe,f.j.info("SVER="+f.Aa));const li=ne[5];li!=null&&typeof li=="number"&&0<li&&(v=1.5*li,f.L=v,f.j.info("backChannelRequestTimeoutMs_="+v)),v=f;const Lt=a.g;if(Lt){const _a=Lt.g?Lt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(_a){var A=v.h;A.g||_a.indexOf("spdy")==-1&&_a.indexOf("quic")==-1&&_a.indexOf("h2")==-1||(A.j=A.l,A.g=new Set,A.h&&(pu(A,A.h),A.h=null))}if(v.D){const xu=Lt.g?Lt.g.getResponseHeader("X-HTTP-Session-Id"):null;xu&&(v.ya=xu,pe(v.I,v.D,xu))}}f.G=3,f.l&&f.l.ua(),f.ba&&(f.R=Date.now()-a.F,f.j.info("Handshake RTT: "+f.R+"ms")),v=f;var z=a;if(v.qa=wm(v,v.J?v.ia:null,v.W),z.K){Qp(v.h,z);var ce=z,Ue=v.L;Ue&&(ce.I=Ue),ce.B&&(du(ce),ua(ce)),v.g=z}else gm(v);0<f.i.length&&ya(f)}else ne[0]!="stop"&&ne[0]!="close"||Er(f,7);else f.G==3&&(ne[0]=="stop"||ne[0]=="close"?ne[0]=="stop"?Er(f,7):gu(f):ne[0]!="noop"&&f.l&&f.l.ta(ne),f.v=0)}}fs(4)}catch{}}var F1=class{constructor(a,d){this.g=a,this.map=d}};function qp(a){this.l=a||10,l.PerformanceNavigationTiming?(a=l.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Kp(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function Yp(a){return a.h?1:a.g?a.g.size:0}function fu(a,d){return a.h?a.h==d:a.g?a.g.has(d):!1}function pu(a,d){a.g?a.g.add(d):a.h=d}function Qp(a,d){a.h&&a.h==d?a.h=null:a.g&&a.g.has(d)&&a.g.delete(d)}qp.prototype.cancel=function(){if(this.i=Xp(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Xp(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let d=a.i;for(const f of a.g.values())d=d.concat(f.D);return d}return P(a.i)}function U1(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(u(a)){for(var d=[],f=a.length,v=0;v<f;v++)d.push(a[v]);return d}d=[],f=0;for(v in a)d[f++]=a[v];return d}function z1(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(u(a)||typeof a=="string"){var d=[];a=a.length;for(var f=0;f<a;f++)d.push(f);return d}d=[],f=0;for(const v in a)d[f++]=v;return d}}}function Jp(a,d){if(a.forEach&&typeof a.forEach=="function")a.forEach(d,void 0);else if(u(a)||typeof a=="string")Array.prototype.forEach.call(a,d,void 0);else for(var f=z1(a),v=U1(a),R=v.length,A=0;A<R;A++)d.call(void 0,v[A],f&&f[A],a)}var Zp=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function V1(a,d){if(a){a=a.split("&");for(var f=0;f<a.length;f++){var v=a[f].indexOf("="),R=null;if(0<=v){var A=a[f].substring(0,v);R=a[f].substring(v+1)}else A=a[f];d(A,R?decodeURIComponent(R.replace(/\+/g," ")):"")}}}function kr(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof kr){this.h=a.h,da(this,a.j),this.o=a.o,this.g=a.g,ha(this,a.s),this.l=a.l;var d=a.i,f=new xs;f.i=d.i,d.g&&(f.g=new Map(d.g),f.h=d.h),em(this,f),this.m=a.m}else a&&(d=String(a).match(Zp))?(this.h=!1,da(this,d[1]||"",!0),this.o=vs(d[2]||""),this.g=vs(d[3]||"",!0),ha(this,d[4]),this.l=vs(d[5]||"",!0),em(this,d[6]||"",!0),this.m=vs(d[7]||"")):(this.h=!1,this.i=new xs(null,this.h))}kr.prototype.toString=function(){var a=[],d=this.j;d&&a.push(ys(d,tm,!0),":");var f=this.g;return(f||d=="file")&&(a.push("//"),(d=this.o)&&a.push(ys(d,tm,!0),"@"),a.push(encodeURIComponent(String(f)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),f=this.s,f!=null&&a.push(":",String(f))),(f=this.l)&&(this.g&&f.charAt(0)!="/"&&a.push("/"),a.push(ys(f,f.charAt(0)=="/"?H1:B1,!0))),(f=this.i.toString())&&a.push("?",f),(f=this.m)&&a.push("#",ys(f,G1)),a.join("")};function hn(a){return new kr(a)}function da(a,d,f){a.j=f?vs(d,!0):d,a.j&&(a.j=a.j.replace(/:$/,""))}function ha(a,d){if(d){if(d=Number(d),isNaN(d)||0>d)throw Error("Bad port number "+d);a.s=d}else a.s=null}function em(a,d,f){d instanceof xs?(a.i=d,q1(a.i,a.h)):(f||(d=ys(d,W1)),a.i=new xs(d,a.h))}function pe(a,d,f){a.i.set(d,f)}function fa(a){return pe(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function vs(a,d){return a?d?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function ys(a,d,f){return typeof a=="string"?(a=encodeURI(a).replace(d,$1),f&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function $1(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var tm=/[#\/\?@]/g,B1=/[#\?:]/g,H1=/[#\?]/g,W1=/[#\?@]/g,G1=/#/g;function xs(a,d){this.h=this.g=null,this.i=a||null,this.j=!!d}function Dn(a){a.g||(a.g=new Map,a.h=0,a.i&&V1(a.i,function(d,f){a.add(decodeURIComponent(d.replace(/\+/g," ")),f)}))}t=xs.prototype,t.add=function(a,d){Dn(this),this.i=null,a=oi(this,a);var f=this.g.get(a);return f||this.g.set(a,f=[]),f.push(d),this.h+=1,this};function nm(a,d){Dn(a),d=oi(a,d),a.g.has(d)&&(a.i=null,a.h-=a.g.get(d).length,a.g.delete(d))}function rm(a,d){return Dn(a),d=oi(a,d),a.g.has(d)}t.forEach=function(a,d){Dn(this),this.g.forEach(function(f,v){f.forEach(function(R){a.call(d,R,v,this)},this)},this)},t.na=function(){Dn(this);const a=Array.from(this.g.values()),d=Array.from(this.g.keys()),f=[];for(let v=0;v<d.length;v++){const R=a[v];for(let A=0;A<R.length;A++)f.push(d[v])}return f},t.V=function(a){Dn(this);let d=[];if(typeof a=="string")rm(this,a)&&(d=d.concat(this.g.get(oi(this,a))));else{a=Array.from(this.g.values());for(let f=0;f<a.length;f++)d=d.concat(a[f])}return d},t.set=function(a,d){return Dn(this),this.i=null,a=oi(this,a),rm(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[d]),this.h+=1,this},t.get=function(a,d){return a?(a=this.V(a),0<a.length?String(a[0]):d):d};function im(a,d,f){nm(a,d),0<f.length&&(a.i=null,a.g.set(oi(a,d),P(f)),a.h+=f.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],d=Array.from(this.g.keys());for(var f=0;f<d.length;f++){var v=d[f];const A=encodeURIComponent(String(v)),z=this.V(v);for(v=0;v<z.length;v++){var R=A;z[v]!==""&&(R+="="+encodeURIComponent(String(z[v]))),a.push(R)}}return this.i=a.join("&")};function oi(a,d){return d=String(d),a.j&&(d=d.toLowerCase()),d}function q1(a,d){d&&!a.j&&(Dn(a),a.i=null,a.g.forEach(function(f,v){var R=v.toLowerCase();v!=R&&(nm(this,v),im(this,R,f))},a)),a.j=d}function K1(a,d){const f=new ms;if(l.Image){const v=new Image;v.onload=E(Ln,f,"TestLoadImage: loaded",!0,d,v),v.onerror=E(Ln,f,"TestLoadImage: error",!1,d,v),v.onabort=E(Ln,f,"TestLoadImage: abort",!1,d,v),v.ontimeout=E(Ln,f,"TestLoadImage: timeout",!1,d,v),l.setTimeout(function(){v.ontimeout&&v.ontimeout()},1e4),v.src=a}else d(!1)}function Y1(a,d){const f=new ms,v=new AbortController,R=setTimeout(()=>{v.abort(),Ln(f,"TestPingServer: timeout",!1,d)},1e4);fetch(a,{signal:v.signal}).then(A=>{clearTimeout(R),A.ok?Ln(f,"TestPingServer: ok",!0,d):Ln(f,"TestPingServer: server error",!1,d)}).catch(()=>{clearTimeout(R),Ln(f,"TestPingServer: error",!1,d)})}function Ln(a,d,f,v,R){try{R&&(R.onload=null,R.onerror=null,R.onabort=null,R.ontimeout=null),v(f)}catch{}}function Q1(){this.g=new R1}function X1(a,d,f){const v=f||"";try{Jp(a,function(R,A){let z=R;h(R)&&(z=nu(R)),d.push(v+A+"="+encodeURIComponent(z))})}catch(R){throw d.push(v+"type="+encodeURIComponent("_badmap")),R}}function pa(a){this.l=a.Ub||null,this.j=a.eb||!1}I(pa,ru),pa.prototype.g=function(){return new ma(this.l,this.j)},pa.prototype.i=function(a){return function(){return a}}({});function ma(a,d){We.call(this),this.D=a,this.o=d,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}I(ma,We),t=ma.prototype,t.open=function(a,d){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=d,this.readyState=1,ws(this)},t.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const d={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(d.body=a),(this.D||l).fetch(new Request(this.A,d)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,_s(this)),this.readyState=0},t.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,ws(this)),this.g&&(this.readyState=3,ws(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;sm(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function sm(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}t.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var d=a.value?a.value:new Uint8Array(0);(d=this.v.decode(d,{stream:!a.done}))&&(this.response=this.responseText+=d)}a.done?_s(this):ws(this),this.readyState==3&&sm(this)}},t.Ra=function(a){this.g&&(this.response=this.responseText=a,_s(this))},t.Qa=function(a){this.g&&(this.response=a,_s(this))},t.ga=function(){this.g&&_s(this)};function _s(a){a.readyState=4,a.l=null,a.j=null,a.v=null,ws(a)}t.setRequestHeader=function(a,d){this.u.append(a,d)},t.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],d=this.h.entries();for(var f=d.next();!f.done;)f=f.value,a.push(f[0]+": "+f[1]),f=d.next();return a.join(`\r
`)};function ws(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(ma.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function om(a){let d="";return U(a,function(f,v){d+=v,d+=":",d+=f,d+=`\r
`}),d}function mu(a,d,f){e:{for(v in f){var v=!1;break e}v=!0}v||(f=om(f),typeof a=="string"?f!=null&&encodeURIComponent(String(f)):pe(a,d,f))}function Se(a){We.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}I(Se,We);var J1=/^https?$/i,Z1=["POST","PUT"];t=Se.prototype,t.Ha=function(a){this.J=a},t.ea=function(a,d,f,v){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);d=d?d.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():lu.g(),this.v=this.o?Mp(this.o):Mp(lu),this.g.onreadystatechange=g(this.Ea,this);try{this.B=!0,this.g.open(d,String(a),!0),this.B=!1}catch(A){am(this,A);return}if(a=f||"",f=new Map(this.headers),v)if(Object.getPrototypeOf(v)===Object.prototype)for(var R in v)f.set(R,v[R]);else if(typeof v.keys=="function"&&typeof v.get=="function")for(const A of v.keys())f.set(A,v.get(A));else throw Error("Unknown input type for opt_headers: "+String(v));v=Array.from(f.keys()).find(A=>A.toLowerCase()=="content-type"),R=l.FormData&&a instanceof l.FormData,!(0<=Array.prototype.indexOf.call(Z1,d,void 0))||v||R||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[A,z]of f)this.g.setRequestHeader(A,z);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{um(this),this.u=!0,this.g.send(a),this.u=!1}catch(A){am(this,A)}};function am(a,d){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=d,a.m=5,lm(a),ga(a)}function lm(a){a.A||(a.A=!0,Ze(a,"complete"),Ze(a,"error"))}t.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,Ze(this,"complete"),Ze(this,"abort"),ga(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),ga(this,!0)),Se.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?cm(this):this.bb())},t.bb=function(){cm(this)};function cm(a){if(a.h&&typeof o<"u"&&(!a.v[1]||fn(a)!=4||a.Z()!=2)){if(a.u&&fn(a)==4)jp(a.Ea,0,a);else if(Ze(a,"readystatechange"),fn(a)==4){a.h=!1;try{const z=a.Z();e:switch(z){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var d=!0;break e;default:d=!1}var f;if(!(f=d)){var v;if(v=z===0){var R=String(a.D).match(Zp)[1]||null;!R&&l.self&&l.self.location&&(R=l.self.location.protocol.slice(0,-1)),v=!J1.test(R?R.toLowerCase():"")}f=v}if(f)Ze(a,"complete"),Ze(a,"success");else{a.m=6;try{var A=2<fn(a)?a.g.statusText:""}catch{A=""}a.l=A+" ["+a.Z()+"]",lm(a)}}finally{ga(a)}}}}function ga(a,d){if(a.g){um(a);const f=a.g,v=a.v[0]?()=>{}:null;a.g=null,a.v=null,d||Ze(a,"ready");try{f.onreadystatechange=v}catch{}}}function um(a){a.I&&(l.clearTimeout(a.I),a.I=null)}t.isActive=function(){return!!this.g};function fn(a){return a.g?a.g.readyState:0}t.Z=function(){try{return 2<fn(this)?this.g.status:-1}catch{return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.Oa=function(a){if(this.g){var d=this.g.responseText;return a&&d.indexOf(a)==0&&(d=d.substring(a.length)),T1(d)}};function dm(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function ek(a){const d={};a=(a.g&&2<=fn(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let v=0;v<a.length;v++){if(w(a[v]))continue;var f=C(a[v]);const R=f[0];if(f=f[1],typeof f!="string")continue;f=f.trim();const A=d[R]||[];d[R]=A,A.push(f)}x(d,function(v){return v.join(", ")})}t.Ba=function(){return this.m},t.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function ks(a,d,f){return f&&f.internalChannelParams&&f.internalChannelParams[a]||d}function hm(a){this.Aa=0,this.i=[],this.j=new ms,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=ks("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=ks("baseRetryDelayMs",5e3,a),this.cb=ks("retryDelaySeedMs",1e4,a),this.Wa=ks("forwardChannelMaxRetries",2,a),this.wa=ks("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new qp(a&&a.concurrentRequestLimit),this.Da=new Q1,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}t=hm.prototype,t.la=8,t.G=1,t.connect=function(a,d,f,v){et(0),this.W=a,this.H=d||{},f&&v!==void 0&&(this.H.OSID=f,this.H.OAID=v),this.F=this.X,this.I=wm(this,null,this.W),ya(this)};function gu(a){if(fm(a),a.G==3){var d=a.U++,f=hn(a.I);if(pe(f,"SID",a.K),pe(f,"RID",d),pe(f,"TYPE","terminate"),Es(a,f),d=new On(a,a.j,d),d.L=2,d.v=fa(hn(f)),f=!1,l.navigator&&l.navigator.sendBeacon)try{f=l.navigator.sendBeacon(d.v.toString(),"")}catch{}!f&&l.Image&&(new Image().src=d.v,f=!0),f||(d.g=km(d.j,null),d.g.ea(d.v)),d.F=Date.now(),ua(d)}_m(a)}function va(a){a.g&&(yu(a),a.g.cancel(),a.g=null)}function fm(a){va(a),a.u&&(l.clearTimeout(a.u),a.u=null),xa(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&l.clearTimeout(a.s),a.s=null)}function ya(a){if(!Kp(a.h)&&!a.s){a.s=!0;var d=a.Ga;Pe||q(),M||(Pe(),M=!0),B.add(d,a),a.B=0}}function tk(a,d){return Yp(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=d.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=ps(g(a.Ga,a,d),xm(a,a.B)),a.B++,!0)}t.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const R=new On(this,this.j,a);let A=this.o;if(this.S&&(A?(A=y(A),S(A,this.S)):A=this.S),this.m!==null||this.O||(R.H=A,A=null),this.P)e:{for(var d=0,f=0;f<this.i.length;f++){t:{var v=this.i[f];if("__data__"in v.map&&(v=v.map.__data__,typeof v=="string")){v=v.length;break t}v=void 0}if(v===void 0)break;if(d+=v,4096<d){d=f;break e}if(d===4096||f===this.i.length-1){d=f+1;break e}}d=1e3}else d=1e3;d=mm(this,R,d),f=hn(this.I),pe(f,"RID",a),pe(f,"CVER",22),this.D&&pe(f,"X-HTTP-Session-Id",this.D),Es(this,f),A&&(this.O?d="headers="+encodeURIComponent(String(om(A)))+"&"+d:this.m&&mu(f,this.m,A)),pu(this.h,R),this.Ua&&pe(f,"TYPE","init"),this.P?(pe(f,"$req",d),pe(f,"SID","null"),R.T=!0,uu(R,f,null)):uu(R,f,d),this.G=2}}else this.G==3&&(a?pm(this,a):this.i.length==0||Kp(this.h)||pm(this))};function pm(a,d){var f;d?f=d.l:f=a.U++;const v=hn(a.I);pe(v,"SID",a.K),pe(v,"RID",f),pe(v,"AID",a.T),Es(a,v),a.m&&a.o&&mu(v,a.m,a.o),f=new On(a,a.j,f,a.B+1),a.m===null&&(f.H=a.o),d&&(a.i=d.D.concat(a.i)),d=mm(a,f,1e3),f.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),pu(a.h,f),uu(f,v,d)}function Es(a,d){a.H&&U(a.H,function(f,v){pe(d,v,f)}),a.l&&Jp({},function(f,v){pe(d,v,f)})}function mm(a,d,f){f=Math.min(a.i.length,f);var v=a.l?g(a.l.Na,a.l,a):null;e:{var R=a.i;let A=-1;for(;;){const z=["count="+f];A==-1?0<f?(A=R[0].g,z.push("ofs="+A)):A=0:z.push("ofs="+A);let ce=!0;for(let Ue=0;Ue<f;Ue++){let ne=R[Ue].g;const Ge=R[Ue].map;if(ne-=A,0>ne)A=Math.max(0,R[Ue].g-100),ce=!1;else try{X1(Ge,z,"req"+ne+"_")}catch{v&&v(Ge)}}if(ce){v=z.join("&");break e}}}return a=a.i.splice(0,f),d.D=a,v}function gm(a){if(!a.g&&!a.u){a.Y=1;var d=a.Fa;Pe||q(),M||(Pe(),M=!0),B.add(d,a),a.v=0}}function vu(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=ps(g(a.Fa,a),xm(a,a.v)),a.v++,!0)}t.Fa=function(){if(this.u=null,vm(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=ps(g(this.ab,this),a)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,et(10),va(this),vm(this))};function yu(a){a.A!=null&&(l.clearTimeout(a.A),a.A=null)}function vm(a){a.g=new On(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var d=hn(a.qa);pe(d,"RID","rpc"),pe(d,"SID",a.K),pe(d,"AID",a.T),pe(d,"CI",a.F?"0":"1"),!a.F&&a.ja&&pe(d,"TO",a.ja),pe(d,"TYPE","xmlhttp"),Es(a,d),a.m&&a.o&&mu(d,a.m,a.o),a.L&&(a.g.I=a.L);var f=a.g;a=a.ia,f.L=1,f.v=fa(hn(d)),f.m=null,f.P=!0,Hp(f,a)}t.Za=function(){this.C!=null&&(this.C=null,va(this),vu(this),et(19))};function xa(a){a.C!=null&&(l.clearTimeout(a.C),a.C=null)}function ym(a,d){var f=null;if(a.g==d){xa(a),yu(a),a.g=null;var v=2}else if(fu(a.h,d))f=d.D,Qp(a.h,d),v=1;else return;if(a.G!=0){if(d.o)if(v==1){f=d.m?d.m.length:0,d=Date.now()-d.F;var R=a.B;v=ou(),Ze(v,new Vp(v,f)),ya(a)}else gm(a);else if(R=d.s,R==3||R==0&&0<d.X||!(v==1&&tk(a,d)||v==2&&vu(a)))switch(f&&0<f.length&&(d=a.h,d.i=d.i.concat(f)),R){case 1:Er(a,5);break;case 4:Er(a,10);break;case 3:Er(a,6);break;default:Er(a,2)}}}function xm(a,d){let f=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(f*=2),f*d}function Er(a,d){if(a.j.info("Error code "+d),d==2){var f=g(a.fb,a),v=a.Xa;const R=!v;v=new kr(v||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||da(v,"https"),fa(v),R?K1(v.toString(),f):Y1(v.toString(),f)}else et(2);a.G=0,a.l&&a.l.sa(d),_m(a),fm(a)}t.fb=function(a){a?(this.j.info("Successfully pinged google.com"),et(2)):(this.j.info("Failed to ping google.com"),et(1))};function _m(a){if(a.G=0,a.ka=[],a.l){const d=Xp(a.h);(d.length!=0||a.i.length!=0)&&(L(a.ka,d),L(a.ka,a.i),a.h.i.length=0,P(a.i),a.i.length=0),a.l.ra()}}function wm(a,d,f){var v=f instanceof kr?hn(f):new kr(f);if(v.g!="")d&&(v.g=d+"."+v.g),ha(v,v.s);else{var R=l.location;v=R.protocol,d=d?d+"."+R.hostname:R.hostname,R=+R.port;var A=new kr(null);v&&da(A,v),d&&(A.g=d),R&&ha(A,R),f&&(A.l=f),v=A}return f=a.D,d=a.ya,f&&d&&pe(v,f,d),pe(v,"VER",a.la),Es(a,v),v}function km(a,d,f){if(d&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return d=a.Ca&&!a.pa?new Se(new pa({eb:f})):new Se(a.pa),d.Ha(a.J),d}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function Em(){}t=Em.prototype,t.ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){};function Ct(a,d){We.call(this),this.g=new hm(d),this.l=a,this.h=d&&d.messageUrlParams||null,a=d&&d.messageHeaders||null,d&&d.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=d&&d.initMessageHeaders||null,d&&d.messageContentType&&(a?a["X-WebChannel-Content-Type"]=d.messageContentType:a={"X-WebChannel-Content-Type":d.messageContentType}),d&&d.va&&(a?a["X-WebChannel-Client-Profile"]=d.va:a={"X-WebChannel-Client-Profile":d.va}),this.g.S=a,(a=d&&d.Sb)&&!w(a)&&(this.g.m=a),this.v=d&&d.supportsCrossDomainXhr||!1,this.u=d&&d.sendRawJson||!1,(d=d&&d.httpSessionIdParam)&&!w(d)&&(this.g.D=d,a=this.h,a!==null&&d in a&&(a=this.h,d in a&&delete a[d])),this.j=new ai(this)}I(Ct,We),Ct.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Ct.prototype.close=function(){gu(this.g)},Ct.prototype.o=function(a){var d=this.g;if(typeof a=="string"){var f={};f.__data__=a,a=f}else this.u&&(f={},f.__data__=nu(a),a=f);d.i.push(new F1(d.Ya++,a)),d.G==3&&ya(d)},Ct.prototype.N=function(){this.g.l=null,delete this.j,gu(this.g),delete this.g,Ct.aa.N.call(this)};function Sm(a){iu.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var d=a.__sm__;if(d){e:{for(const f in d){a=f;break e}a=void 0}(this.i=a)&&(a=this.i,d=d!==null&&a in d?d[a]:void 0),this.data=d}else this.data=a}I(Sm,iu);function bm(){su.call(this),this.status=1}I(bm,su);function ai(a){this.g=a}I(ai,Em),ai.prototype.ua=function(){Ze(this.g,"a")},ai.prototype.ta=function(a){Ze(this.g,new Sm(a))},ai.prototype.sa=function(a){Ze(this.g,new bm)},ai.prototype.ra=function(){Ze(this.g,"b")},Ct.prototype.send=Ct.prototype.o,Ct.prototype.open=Ct.prototype.m,Ct.prototype.close=Ct.prototype.close,au.NO_ERROR=0,au.TIMEOUT=8,au.HTTP_ERROR=6,L1.COMPLETE="complete",P1.EventType=hs,hs.OPEN="a",hs.CLOSE="b",hs.ERROR="c",hs.MESSAGE="d",We.prototype.listen=We.prototype.K,Se.prototype.listenOnce=Se.prototype.L,Se.prototype.getLastError=Se.prototype.Ka,Se.prototype.getLastErrorCode=Se.prototype.Ba,Se.prototype.getStatus=Se.prototype.Z,Se.prototype.getResponseJson=Se.prototype.Oa,Se.prototype.getResponseText=Se.prototype.oa,Se.prototype.send=Se.prototype.ea,Se.prototype.setWithCredentials=Se.prototype.Ha}).apply(typeof Va<"u"?Va:typeof self<"u"?self:typeof window<"u"?window:{});const Q0="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nt{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}nt.UNAUTHENTICATED=new nt(null),nt.GOOGLE_CREDENTIALS=new nt("google-credentials-uid"),nt.FIRST_PARTY=new nt("first-party-uid"),nt.MOCK_USER=new nt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let sa="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const es=new qo("@firebase/firestore");function Bt(t,...e){if(es.logLevel<=ie.DEBUG){const n=e.map(_p);es.debug(`Firestore (${sa}): ${t}`,...n)}}function Jw(t,...e){if(es.logLevel<=ie.ERROR){const n=e.map(_p);es.error(`Firestore (${sa}): ${t}`,...n)}}function cP(t,...e){if(es.logLevel<=ie.WARN){const n=e.map(_p);es.warn(`Firestore (${sa}): ${t}`,...n)}}function _p(t){if(typeof t=="string")return t;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(n){return JSON.stringify(n)}(t)}catch{return t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wp(t="Unexpected state"){const e=`FIRESTORE (${sa}) INTERNAL ASSERTION FAILED: `+t;throw Jw(e),new Error(e)}function so(t,e){t||wp()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ut={CANCELLED:"cancelled",INVALID_ARGUMENT:"invalid-argument",FAILED_PRECONDITION:"failed-precondition"};class dt extends Qt{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oo{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zw{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class uP{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(nt.UNAUTHENTICATED))}shutdown(){}}class dP{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class hP{constructor(e){this.t=e,this.currentUser=nt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){so(this.o===void 0);let r=this.i;const i=u=>this.i!==r?(r=this.i,n(u)):Promise.resolve();let s=new oo;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new oo,e.enqueueRetryable(()=>i(this.currentUser))};const o=()=>{const u=s;e.enqueueRetryable(async()=>{await u.promise,await i(this.currentUser)})},l=u=>{Bt("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(u=>l(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?l(u):(Bt("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new oo)}},0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?(Bt("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(so(typeof r.accessToken=="string"),new Zw(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return so(e===null||typeof e=="string"),new nt(e)}}class fP{constructor(e,n,r){this.l=e,this.h=n,this.P=r,this.type="FirstParty",this.user=nt.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class pP{constructor(e,n,r){this.l=e,this.h=n,this.P=r}getToken(){return Promise.resolve(new fP(this.l,this.h,this.P))}start(e,n){e.enqueueRetryable(()=>n(nt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class mP{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class gP{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,n){so(this.o===void 0);const r=s=>{s.error!=null&&Bt("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const o=s.token!==this.R;return this.R=s.token,Bt("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};const i=s=>{Bt("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){const s=this.A.getImmediate({optional:!0});s?i(s):Bt("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(so(typeof n.token=="string"),this.R=n.token,new mP(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}function vP(t){return t.name==="IndexedDbTransactionError"}class ec{constructor(e,n){this.projectId=e,this.database=n||"(default)"}static empty(){return new ec("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof ec&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var X0,ee;(ee=X0||(X0={}))[ee.OK=0]="OK",ee[ee.CANCELLED=1]="CANCELLED",ee[ee.UNKNOWN=2]="UNKNOWN",ee[ee.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ee[ee.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ee[ee.NOT_FOUND=5]="NOT_FOUND",ee[ee.ALREADY_EXISTS=6]="ALREADY_EXISTS",ee[ee.PERMISSION_DENIED=7]="PERMISSION_DENIED",ee[ee.UNAUTHENTICATED=16]="UNAUTHENTICATED",ee[ee.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ee[ee.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ee[ee.ABORTED=10]="ABORTED",ee[ee.OUT_OF_RANGE=11]="OUT_OF_RANGE",ee[ee.UNIMPLEMENTED=12]="UNIMPLEMENTED",ee[ee.INTERNAL=13]="INTERNAL",ee[ee.UNAVAILABLE=14]="UNAVAILABLE",ee[ee.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */new Xw([4294967295,4294967295],0);function od(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yP{constructor(e,n,r=1e3,i=1.5,s=6e4){this.ui=e,this.timerId=n,this.ko=r,this.qo=i,this.Qo=s,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const n=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),i=Math.max(0,n-r);i>0&&Bt("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Ko} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,i,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kp{constructor(e,n,r,i,s){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new oo,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,i,s){const o=Date.now()+r,l=new kp(e,n,o,i,s);return l.start(r),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new dt(ut.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}var J0,Z0;(Z0=J0||(J0={})).ea="default",Z0.Cache="cache";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xP(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ev=new Map;function _P(t,e,n,r){if(e===!0&&r===!0)throw new dt(ut.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function wP(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":wp()}function kP(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new dt(ut.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=wP(t);throw new dt(ut.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tv{constructor(e){var n,r;if(e.host===void 0){if(e.ssl!==void 0)throw new dt(ut.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(n=e.ssl)===null||n===void 0||n;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new dt(ut.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}_P("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=xP((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new dt(ut.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new dt(ut.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new dt(ut.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class e1{constructor(e,n,r,i){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new tv({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new dt(ut.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new dt(ut.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new tv(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new uP;switch(r.type){case"firstParty":return new pP(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new dt(ut.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const r=ev.get(n);r&&(Bt("ComponentProvider","Removing Datastore"),ev.delete(n),r.terminate())}(this),Promise.resolve()}}function EP(t,e,n,r={}){var i;const s=(t=kP(t,e1))._getSettings(),o=`${e}:${n}`;if(s.host!=="firestore.googleapis.com"&&s.host!==o&&cP("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),t._setSettings(Object.assign(Object.assign({},s),{host:o,ssl:!1})),r.mockUserToken){let l,u;if(typeof r.mockUserToken=="string")l=r.mockUserToken,u=nt.MOCK_USER;else{l=Kx(r.mockUserToken,(i=t._app)===null||i===void 0?void 0:i.options.projectId);const h=r.mockUserToken.sub||r.mockUserToken.user_id;if(!h)throw new dt(ut.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");u=new nt(h)}t._authCredentials=new dP(new Zw(l,u))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nv{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new yP(this,"async_queue_retry"),this.Vu=()=>{const r=od();r&&Bt("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const n=od();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const n=od();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const n=new oo;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!vP(e))throw e;Bt("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const n=this.mu.then(()=>(this.du=!0,e().catch(r=>{this.Eu=r,this.du=!1;const i=function(o){let l=o.message||"";return o.stack&&(l=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),l}(r);throw Jw("INTERNAL UNHANDLED ERROR: ",i),r}).then(r=>(this.du=!1,r))));return this.mu=n,n}enqueueAfterDelay(e,n,r){this.fu(),this.Ru.indexOf(e)>-1&&(n=0);const i=kp.createAndSchedule(this,e,n,r,s=>this.yu(s));return this.Tu.push(i),i}fu(){this.Eu&&wp()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const n of this.Tu)if(n.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.Tu)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const n=this.Tu.indexOf(e);this.Tu.splice(n,1)}}class SP extends e1{constructor(e,n,r,i){super(e,n,r,i),this.type="firestore",this._queue=new nv,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new nv(e),this._firestoreClient=void 0,await e}}}function bP(t,e){const n=typeof t=="object"?t:Ic(),r=typeof t=="string"?t:"(default)",i=xr(n,"firestore").getImmediate({identifier:r});if(!i._initialized){const s=Wx("firestore");s&&EP(i,...s)}return i}(function(e,n=!0){(function(i){sa=i})(Zr),Kt(new Dt("firestore",(r,{instanceIdentifier:i,options:s})=>{const o=r.getProvider("app").getImmediate(),l=new SP(new hP(r.getProvider("auth-internal")),new gP(r.getProvider("app-check-internal")),function(h,m){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new dt(ut.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ec(h.options.projectId,m)}(o,i),o);return s=Object.assign({useFetchStreams:n},s),l._setSettings(s),l},"PUBLIC").setMultipleInstances(!0)),vt(Q0,"4.7.3",e),vt(Q0,"4.7.3","esm2017")})();const t1="@firebase/installations",Ep="0.6.9";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const n1=1e4,r1=`w:${Ep}`,i1="FIS_v2",NP="https://firebaseinstallations.googleapis.com/v1",CP=60*60*1e3,IP="installations",TP="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RP={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},qr=new Jr(IP,TP,RP);function s1(t){return t instanceof Qt&&t.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function o1({projectId:t}){return`${NP}/projects/${t}/installations`}function a1(t){return{token:t.token,requestStatus:2,expiresIn:AP(t.expiresIn),creationTime:Date.now()}}async function l1(t,e){const r=(await e.json()).error;return qr.create("request-failed",{requestName:t,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function c1({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function PP(t,{refreshToken:e}){const n=c1(t);return n.append("Authorization",jP(e)),n}async function u1(t){const e=await t();return e.status>=500&&e.status<600?t():e}function AP(t){return Number(t.replace("s","000"))}function jP(t){return`${i1} ${t}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function OP({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const r=o1(t),i=c1(t),s=e.getImmediate({optional:!0});if(s){const h=await s.getHeartbeatsHeader();h&&i.append("x-firebase-client",h)}const o={fid:n,authVersion:i1,appId:t.appId,sdkVersion:r1},l={method:"POST",headers:i,body:JSON.stringify(o)},u=await u1(()=>fetch(r,l));if(u.ok){const h=await u.json();return{fid:h.fid||n,registrationStatus:2,refreshToken:h.refreshToken,authToken:a1(h.authToken)}}else throw await l1("Create Installation",u)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function d1(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function DP(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const LP=/^[cdef][\w-]{21}$/,Th="";function MP(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const n=FP(t);return LP.test(n)?n:Th}catch{return Th}}function FP(t){return DP(t).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gc(t){return`${t.appName}!${t.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const h1=new Map;function f1(t,e){const n=Gc(t);p1(n,e),UP(n,e)}function p1(t,e){const n=h1.get(t);if(n)for(const r of n)r(e)}function UP(t,e){const n=zP();n&&n.postMessage({key:t,fid:e}),VP()}let Ar=null;function zP(){return!Ar&&"BroadcastChannel"in self&&(Ar=new BroadcastChannel("[Firebase] FID Change"),Ar.onmessage=t=>{p1(t.data.key,t.data.fid)}),Ar}function VP(){h1.size===0&&Ar&&(Ar.close(),Ar=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $P="firebase-installations-database",BP=1,Kr="firebase-installations-store";let ad=null;function Sp(){return ad||(ad=n_($P,BP,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(Kr)}}})),ad}async function tc(t,e){const n=Gc(t),i=(await Sp()).transaction(Kr,"readwrite"),s=i.objectStore(Kr),o=await s.get(n);return await s.put(e,n),await i.done,(!o||o.fid!==e.fid)&&f1(t,e.fid),e}async function m1(t){const e=Gc(t),r=(await Sp()).transaction(Kr,"readwrite");await r.objectStore(Kr).delete(e),await r.done}async function qc(t,e){const n=Gc(t),i=(await Sp()).transaction(Kr,"readwrite"),s=i.objectStore(Kr),o=await s.get(n),l=e(o);return l===void 0?await s.delete(n):await s.put(l,n),await i.done,l&&(!o||o.fid!==l.fid)&&f1(t,l.fid),l}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bp(t){let e;const n=await qc(t.appConfig,r=>{const i=HP(r),s=WP(t,i);return e=s.registrationPromise,s.installationEntry});return n.fid===Th?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function HP(t){const e=t||{fid:MP(),registrationStatus:0};return g1(e)}function WP(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const i=Promise.reject(qr.create("app-offline"));return{installationEntry:e,registrationPromise:i}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},r=GP(t,n);return{installationEntry:n,registrationPromise:r}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:qP(t)}:{installationEntry:e}}async function GP(t,e){try{const n=await OP(t,e);return tc(t.appConfig,n)}catch(n){throw s1(n)&&n.customData.serverCode===409?await m1(t.appConfig):await tc(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function qP(t){let e=await rv(t.appConfig);for(;e.registrationStatus===1;)await d1(100),e=await rv(t.appConfig);if(e.registrationStatus===0){const{installationEntry:n,registrationPromise:r}=await bp(t);return r||n}return e}function rv(t){return qc(t,e=>{if(!e)throw qr.create("installation-not-found");return g1(e)})}function g1(t){return KP(t)?{fid:t.fid,registrationStatus:0}:t}function KP(t){return t.registrationStatus===1&&t.registrationTime+n1<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function YP({appConfig:t,heartbeatServiceProvider:e},n){const r=QP(t,n),i=PP(t,n),s=e.getImmediate({optional:!0});if(s){const h=await s.getHeartbeatsHeader();h&&i.append("x-firebase-client",h)}const o={installation:{sdkVersion:r1,appId:t.appId}},l={method:"POST",headers:i,body:JSON.stringify(o)},u=await u1(()=>fetch(r,l));if(u.ok){const h=await u.json();return a1(h)}else throw await l1("Generate Auth Token",u)}function QP(t,{fid:e}){return`${o1(t)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Np(t,e=!1){let n;const r=await qc(t.appConfig,s=>{if(!v1(s))throw qr.create("not-registered");const o=s.authToken;if(!e&&ZP(o))return s;if(o.requestStatus===1)return n=XP(t,e),s;{if(!navigator.onLine)throw qr.create("app-offline");const l=tA(s);return n=JP(t,l),l}});return n?await n:r.authToken}async function XP(t,e){let n=await iv(t.appConfig);for(;n.authToken.requestStatus===1;)await d1(100),n=await iv(t.appConfig);const r=n.authToken;return r.requestStatus===0?Np(t,e):r}function iv(t){return qc(t,e=>{if(!v1(e))throw qr.create("not-registered");const n=e.authToken;return nA(n)?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}async function JP(t,e){try{const n=await YP(t,e),r=Object.assign(Object.assign({},e),{authToken:n});return await tc(t.appConfig,r),n}catch(n){if(s1(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await m1(t.appConfig);else{const r=Object.assign(Object.assign({},e),{authToken:{requestStatus:0}});await tc(t.appConfig,r)}throw n}}function v1(t){return t!==void 0&&t.registrationStatus===2}function ZP(t){return t.requestStatus===2&&!eA(t)}function eA(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+CP}function tA(t){const e={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},t),{authToken:e})}function nA(t){return t.requestStatus===1&&t.requestTime+n1<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rA(t){const e=t,{installationEntry:n,registrationPromise:r}=await bp(e);return r?r.catch(console.error):Np(e).catch(console.error),n.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function iA(t,e=!1){const n=t;return await sA(n),(await Np(n,e)).token}async function sA(t){const{registrationPromise:e}=await bp(t);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oA(t){if(!t||!t.options)throw ld("App Configuration");if(!t.name)throw ld("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw ld(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function ld(t){return qr.create("missing-app-config-values",{valueName:t})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const y1="installations",aA="installations-internal",lA=t=>{const e=t.getProvider("app").getImmediate(),n=oA(e),r=xr(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},cA=t=>{const e=t.getProvider("app").getImmediate(),n=xr(e,y1).getImmediate();return{getId:()=>rA(n),getToken:i=>iA(n,i)}};function uA(){Kt(new Dt(y1,lA,"PUBLIC")),Kt(new Dt(aA,cA,"PRIVATE"))}uA();vt(t1,Ep);vt(t1,Ep,"esm2017");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nc="analytics",dA="firebase_id",hA="origin",fA=60*1e3,pA="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",Cp="https://www.googletagmanager.com/gtag/js";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yt=new qo("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mA={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},kt=new Jr("analytics","Analytics",mA);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gA(t){if(!t.startsWith(Cp)){const e=kt.create("invalid-gtag-resource",{gtagURL:t});return yt.warn(e.message),""}return t}function x1(t){return Promise.all(t.map(e=>e.catch(n=>n)))}function vA(t,e){let n;return window.trustedTypes&&(n=window.trustedTypes.createPolicy(t,e)),n}function yA(t,e){const n=vA("firebase-js-sdk-policy",{createScriptURL:gA}),r=document.createElement("script"),i=`${Cp}?l=${t}&id=${e}`;r.src=n?n==null?void 0:n.createScriptURL(i):i,r.async=!0,document.head.appendChild(r)}function xA(t){let e=[];return Array.isArray(window[t])?e=window[t]:window[t]=e,e}async function _A(t,e,n,r,i,s){const o=r[i];try{if(o)await e[o];else{const u=(await x1(n)).find(h=>h.measurementId===i);u&&await e[u.appId]}}catch(l){yt.error(l)}t("config",i,s)}async function wA(t,e,n,r,i){try{let s=[];if(i&&i.send_to){let o=i.send_to;Array.isArray(o)||(o=[o]);const l=await x1(n);for(const u of o){const h=l.find(p=>p.measurementId===u),m=h&&e[h.appId];if(m)s.push(m);else{s=[];break}}}s.length===0&&(s=Object.values(e)),await Promise.all(s),t("event",r,i||{})}catch(s){yt.error(s)}}function kA(t,e,n,r){async function i(s,...o){try{if(s==="event"){const[l,u]=o;await wA(t,e,n,l,u)}else if(s==="config"){const[l,u]=o;await _A(t,e,n,r,l,u)}else if(s==="consent"){const[l,u]=o;t("consent",l,u)}else if(s==="get"){const[l,u,h]=o;t("get",l,u,h)}else if(s==="set"){const[l]=o;t("set",l)}else t(s,...o)}catch(l){yt.error(l)}}return i}function EA(t,e,n,r,i){let s=function(...o){window[r].push(arguments)};return window[i]&&typeof window[i]=="function"&&(s=window[i]),window[i]=kA(s,t,e,n),{gtagCore:s,wrappedGtag:window[i]}}function SA(t){const e=window.document.getElementsByTagName("script");for(const n of Object.values(e))if(n.src&&n.src.includes(Cp)&&n.src.includes(t))return n;return null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bA=30,NA=1e3;class CA{constructor(e={},n=NA){this.throttleMetadata=e,this.intervalMillis=n}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,n){this.throttleMetadata[e]=n}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const _1=new CA;function IA(t){return new Headers({Accept:"application/json","x-goog-api-key":t})}async function TA(t){var e;const{appId:n,apiKey:r}=t,i={method:"GET",headers:IA(r)},s=pA.replace("{app-id}",n),o=await fetch(s,i);if(o.status!==200&&o.status!==304){let l="";try{const u=await o.json();!((e=u.error)===null||e===void 0)&&e.message&&(l=u.error.message)}catch{}throw kt.create("config-fetch-failed",{httpStatus:o.status,responseMessage:l})}return o.json()}async function RA(t,e=_1,n){const{appId:r,apiKey:i,measurementId:s}=t.options;if(!r)throw kt.create("no-app-id");if(!i){if(s)return{measurementId:s,appId:r};throw kt.create("no-api-key")}const o=e.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},l=new jA;return setTimeout(async()=>{l.abort()},fA),w1({appId:r,apiKey:i,measurementId:s},o,l,e)}async function w1(t,{throttleEndTimeMillis:e,backoffCount:n},r,i=_1){var s;const{appId:o,measurementId:l}=t;try{await PA(r,e)}catch(u){if(l)return yt.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${l} provided in the "measurementId" field in the local Firebase config. [${u==null?void 0:u.message}]`),{appId:o,measurementId:l};throw u}try{const u=await TA(t);return i.deleteThrottleMetadata(o),u}catch(u){const h=u;if(!AA(h)){if(i.deleteThrottleMetadata(o),l)return yt.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${l} provided in the "measurementId" field in the local Firebase config. [${h==null?void 0:h.message}]`),{appId:o,measurementId:l};throw u}const m=Number((s=h==null?void 0:h.customData)===null||s===void 0?void 0:s.httpStatus)===503?Ug(n,i.intervalMillis,bA):Ug(n,i.intervalMillis),p={throttleEndTimeMillis:Date.now()+m,backoffCount:n+1};return i.setThrottleMetadata(o,p),yt.debug(`Calling attemptFetch again in ${m} millis`),w1(t,p,r,i)}}function PA(t,e){return new Promise((n,r)=>{const i=Math.max(e-Date.now(),0),s=setTimeout(n,i);t.addEventListener(()=>{clearTimeout(s),r(kt.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function AA(t){if(!(t instanceof Qt)||!t.customData)return!1;const e=Number(t.customData.httpStatus);return e===429||e===500||e===503||e===504}class jA{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function OA(t,e,n,r,i){if(i&&i.global){t("event",n,r);return}else{const s=await e,o=Object.assign(Object.assign({},r),{send_to:s});t("event",n,o)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function DA(){if(Xx())try{await Jx()}catch(t){return yt.warn(kt.create("indexeddb-unavailable",{errorInfo:t==null?void 0:t.toString()}).message),!1}else return yt.warn(kt.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function LA(t,e,n,r,i,s,o){var l;const u=RA(t);u.then(E=>{n[E.measurementId]=E.appId,t.options.measurementId&&E.measurementId!==t.options.measurementId&&yt.warn(`The measurement ID in the local Firebase config (${t.options.measurementId}) does not match the measurement ID fetched from the server (${E.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(E=>yt.error(E)),e.push(u);const h=DA().then(E=>{if(E)return r.getId()}),[m,p]=await Promise.all([u,h]);SA(s)||yA(s,m.measurementId),i("js",new Date);const g=(l=o==null?void 0:o.config)!==null&&l!==void 0?l:{};return g[hA]="firebase",g.update=!0,p!=null&&(g[dA]=p),i("config",m.measurementId,g),m.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class MA{constructor(e){this.app=e}_delete(){return delete ao[this.app.options.appId],Promise.resolve()}}let ao={},sv=[];const ov={};let cd="dataLayer",FA="gtag",av,k1,lv=!1;function UA(){const t=[];if(Yx()&&t.push("This is a browser extension environment."),dS()||t.push("Cookies are not available."),t.length>0){const e=t.map((r,i)=>`(${i+1}) ${r}`).join(" "),n=kt.create("invalid-analytics-context",{errorInfo:e});yt.warn(n.message)}}function zA(t,e,n){UA();const r=t.options.appId;if(!r)throw kt.create("no-app-id");if(!t.options.apiKey)if(t.options.measurementId)yt.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${t.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw kt.create("no-api-key");if(ao[r]!=null)throw kt.create("already-exists",{id:r});if(!lv){xA(cd);const{wrappedGtag:s,gtagCore:o}=EA(ao,sv,ov,cd,FA);k1=s,av=o,lv=!0}return ao[r]=LA(t,sv,ov,e,av,cd,n),new MA(t)}function VA(t=Ic()){t=Re(t);const e=xr(t,nc);return e.isInitialized()?e.getImmediate():$A(t)}function $A(t,e={}){const n=xr(t,nc);if(n.isInitialized()){const i=n.getImmediate();if(Io(e,n.getOptions()))return i;throw kt.create("already-initialized")}return n.initialize({options:e})}function BA(t,e,n,r){t=Re(t),OA(k1,ao[t.app.options.appId],e,n,r).catch(i=>yt.error(i))}const cv="@firebase/analytics",uv="0.10.8";function HA(){Kt(new Dt(nc,(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("installations-internal").getImmediate();return zA(r,i,n)},"PUBLIC")),Kt(new Dt("analytics-internal",t,"PRIVATE")),vt(cv,uv),vt(cv,uv,"esm2017");function t(e){try{const n=e.getProvider(nc).getImmediate();return{logEvent:(r,i,s)=>BA(n,r,i,s)}}catch(n){throw kt.create("interop-component-reg-failed",{reason:n})}}}HA();const WA={apiKey:"AIzaSyDyM1bZvabUpqINlIyF66DEaiHSePhzrB0",authDomain:"trasnporte-nataga---la-plata.firebaseapp.com",databaseURL:"https://trasnporte-nataga---la-plata-default-rtdb.firebaseio.com",projectId:"trasnporte-nataga---la-plata",storageBucket:"trasnporte-nataga---la-plata.firebasestorage.app",messagingSenderId:"175264872585",appId:"1:175264872585:web:124a80135af84a38f72e58",measurementId:"G-QXERYS2M87"},Kc=r_(WA);VA(Kc);const Uo=WC(Kc),Ne=sP(Kc);bP(Kc);function GA({onLogin:t,onRegisterOwner:e,onRegisterPassenger:n,onViewTerms:r,onViewPrivacy:i,onViewManual:s}){const[o,l]=$.useState(0),u=[{icon:c.jsx(zr,{size:32}),title:"Pasajeros",desc:"Reserva tu asiento desde cualquier dispositivo. Usa la App nativa en Android o nuestra plataforma web optimizada para iPhone.",color:"text-blue-500",features:["Reserva Web & App","Puntos Go por fidelidad","Estatus PRO exclusivo"],actions:[{label:"Android App",type:"primary",link:"https://play.google.com/store/apps/details?id=com.chopcode.rutago.app"},{label:"Versión Web",type:"secondary",action:n}]},{icon:c.jsx(Xr,{size:32}),title:"Conductores",desc:"Optimiza tus ingresos con herramientas digitales. Gestiona tu planilla desde Android o consulta tu ruta desde la web.",color:"text-primary-500",features:["Planilla Digital","Estatus Estrella","Check-in en vivo"],actions:[{label:"Descargar App",type:"primary",link:"https://play.google.com/store/apps/details?id=com.chopcode.rutago.app"},{label:"Acceso Web",type:"secondary",action:t}]},{icon:c.jsx(Gi,{size:32}),title:"Dueños de Flota",desc:"Control room total de tus activos. Vigila la ocupación en tiempo real y monitorea ingresos desde tu oficina o celular.",color:"text-green-500",features:["Aislamiento de propiedad","Métricas en tiempo real","Control de flota"],actions:[{label:"Entrar al Portal",type:"primary",action:t},{label:"Afiliar Flota",type:"secondary",action:e}]}];return $.useEffect(()=>{const h=setInterval(()=>{l(m=>(m+1)%u.length)},5e3);return()=>clearInterval(h)},[]),c.jsxs("div",{className:"min-h-screen bg-slate-100 dark:bg-[#061426] text-[#061426] dark:text-white font-sans selection:bg-primary-100 transition-colors duration-300",children:[c.jsx("nav",{className:"fixed top-0 w-full bg-white/90 dark:bg-[#061426]/90 backdrop-blur-md z-50 border-b border-slate-200 dark:border-white/5 transition-colors duration-300",children:c.jsxs("div",{className:"max-w-7xl mx-auto px-3 md:px-6 h-16 md:h-20 flex items-center justify-between",children:[c.jsxs("div",{className:"flex items-center gap-2 md:gap-3",children:[c.jsx("div",{className:"w-8 h-8 md:w-10 md:h-10 bg-[#061426] dark:bg-[#FF7A1A] rounded-lg md:rounded-xl flex items-center justify-center shadow-lg shrink-0 transition-colors",children:c.jsx("img",{src:"/assets/logo_icon.png",alt:"Ruta-Go Logo",className:"w-5 h-5 md:w-7 md:h-7 object-contain"})}),c.jsx("span",{className:"text-lg md:text-2xl font-black tracking-tighter text-[#061426] dark:text-white uppercase italic",children:"Ruta-Go"})]}),c.jsxs("div",{className:"flex items-center gap-1.5 md:gap-4",children:[c.jsx("button",{onClick:t,className:"px-2 md:px-6 py-2 font-bold text-slate-600 dark:text-white/60 hover:text-primary-500 transition-colors text-[10px] md:text-sm",children:"Iniciar Sesión"}),c.jsxs("button",{onClick:e,className:"px-3 md:px-6 py-2 bg-[#061426] dark:bg-[#FF7A1A] text-white font-bold rounded-xl shadow-xl hover:bg-black dark:hover:bg-primary-600 transition-all active:scale-95 text-[9px] md:text-sm uppercase tracking-wider",children:["Ser Dueño",c.jsx("span",{className:"hidden md:inline",children:" de Flota"})]})]})]})}),c.jsxs("header",{className:"pt-28 md:pt-40 pb-12 md:pb-20 px-4 md:px-6 overflow-hidden relative",children:[c.jsx("div",{className:"absolute top-20 right-0 w-64 md:w-96 h-64 md:h-96 bg-primary-500/10 rounded-full blur-3xl -z-10 animate-pulse"}),c.jsxs("div",{className:"max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center",children:[c.jsxs("div",{className:"space-y-4 md:space-y-8 text-center lg:text-left",children:[c.jsxs("div",{className:"inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-primary-50 dark:bg-primary-500/10 rounded-full text-primary-600 dark:text-primary-400 font-black text-[8px] md:text-[10px] uppercase tracking-widest border border-primary-100 dark:border-primary-500/20 mx-auto lg:mx-0",children:[c.jsx(Dg,{size:12,className:"md:size-[14px]"})," El futuro del transporte huilense"]}),c.jsxs("h1",{className:"text-3xl md:text-5xl lg:text-7xl font-black text-[#061426] dark:text-white leading-[1.1] tracking-tight uppercase italic",children:["Conectando ",c.jsx("span",{className:"text-primary-500",children:"Nátaga"})," y La Plata con tecnología."]}),c.jsx("p",{className:"text-base md:text-xl text-slate-600 dark:text-white/40 leading-relaxed max-w-lg mx-auto lg:mx-0 px-2 md:px-0",children:"Ruta-Go profesionaliza el transporte intermunicipal. Reservas en tiempo real, control de flota y una experiencia premium para todos."}),c.jsxs("div",{className:"flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start px-4 sm:px-0",children:[c.jsxs("a",{href:"https://play.google.com/store/apps/details?id=com.chopcode.rutago.app",target:"_blank",rel:"noopener noreferrer",className:"btn-primary px-6 md:px-10 py-3.5 md:py-5 rounded-2xl flex items-center justify-center gap-2 md:gap-3 group text-sm md:text-lg",children:["Android App ",c.jsx(Wi,{size:18,className:"group-hover:translate-x-1 transition-transform"})]}),c.jsx("button",{onClick:n,className:"px-6 md:px-10 py-3.5 md:py-5 bg-white dark:bg-white/5 text-[#061426] dark:text-white font-black rounded-2xl border-2 border-[#061426] dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 transition-all active:scale-95 text-sm md:text-lg shadow-xl shadow-slate-200/50 dark:shadow-none",children:"Versión Web (iPhone)"})]})]}),c.jsxs("div",{className:"relative mt-8 lg:mt-0",children:[c.jsx("div",{className:"bg-gradient-to-tr from-[#061426] to-[#0B2B3F] rounded-[2.5rem] md:rounded-[3rem] p-4 md:p-8 shadow-2xl shadow-slate-900/20 transform lg:rotate-2 border border-white/5",children:c.jsx("div",{className:"bg-white dark:bg-secondary-900 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-inner",children:c.jsx("img",{src:"https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2069",alt:"Ruta-Go App Preview",className:"w-full h-64 md:h-96 object-cover opacity-90 dark:opacity-80"})})}),c.jsxs("div",{className:"absolute -bottom-4 -left-2 md:-bottom-6 md:-left-6 bg-white dark:bg-secondary-800 p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-2xl border border-slate-100 dark:border-white/5 flex items-center gap-3 md:gap-4 animate-bounce-slow",children:[c.jsx("div",{className:"w-10 h-10 md:w-12 h-12 bg-amber-50 dark:bg-amber-500/10 rounded-xl md:rounded-2xl flex items-center justify-center text-amber-500 shadow-inner",children:c.jsx(Dg,{size:22,fill:"currentColor"})}),c.jsxs("div",{children:[c.jsx("p",{className:"text-[10px] text-slate-400 dark:text-white/40 font-bold uppercase tracking-widest",children:"Calificación"}),c.jsx("p",{className:"text-base md:text-lg font-black text-[#061426] dark:text-white leading-none",children:"4.9 / 5.0"})]})]})]})]})]}),c.jsx("section",{className:"py-16 md:py-24 bg-transparent dark:bg-black/10 overflow-hidden transition-colors duration-300",children:c.jsxs("div",{className:"max-w-7xl mx-auto px-6",children:[c.jsxs("div",{className:"text-center mb-12 md:mb-16 space-y-4",children:[c.jsx("h2",{className:"text-3xl md:text-4xl font-black text-[#061426] dark:text-white tracking-tight px-4 uppercase italic",children:"Soluciones para todo el ecosistema"}),c.jsx("p",{className:"text-slate-500 dark:text-white/40 font-medium text-sm md:text-base",children:"Haz clic en tu perfil para comenzar."})]}),c.jsx("div",{className:"hidden lg:grid grid-cols-3 gap-8",children:u.map((h,m)=>c.jsx(dv,{...h,isStatic:!0},m))}),c.jsxs("div",{className:"lg:hidden relative max-w-sm mx-auto h-[460px]",children:[u.map((h,m)=>{const p=m===o;return c.jsx("div",{className:`absolute inset-0 transition-all duration-700 ease-in-out transform ${p?"translate-x-0 opacity-100 scale-100 z-30":"translate-x-full opacity-0 scale-95 z-0"}`,children:c.jsx(dv,{...h})},m)}),c.jsx("div",{className:"absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-3",children:u.map((h,m)=>c.jsx("button",{onClick:()=>l(m),className:`h-2 rounded-full transition-all duration-300 ${m===o?"w-8 bg-primary-500":"w-2 bg-slate-200 dark:bg-white/10"}`},m))})]})]})}),c.jsx("section",{className:"py-16 md:py-24 bg-transparent dark:bg-[#061426] transition-colors duration-300",children:c.jsxs("div",{className:"max-w-7xl mx-auto px-6 flex flex-col items-center text-center space-y-8 md:space-y-12",children:[c.jsx("h2",{className:"text-3xl md:text-4xl font-black text-[#061426] dark:text-white tracking-tight max-w-2xl px-4 uppercase italic",children:"Conectamos el sur del Huila."}),c.jsxs("div",{className:"flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8",children:[c.jsx(hv,{city:"Nátaga"}),c.jsx("div",{className:"w-10 h-10 md:w-12 md:h-12 rounded-full bg-white dark:bg-white/5 shadow-sm flex items-center justify-center text-slate-300 dark:text-white/20 transform rotate-90 sm:rotate-0",children:c.jsx(Wi,{})}),c.jsx(hv,{city:"La Plata"})]})]})}),c.jsxs("footer",{className:"bg-[#061426] dark:bg-black/40 py-16 md:py-24 text-white overflow-hidden relative transition-colors duration-300",children:[c.jsx("div",{className:"absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-orange-400 to-transparent"}),c.jsxs("div",{className:"max-w-7xl mx-auto px-6 text-center space-y-8 md:space-y-10 relative z-10",children:[c.jsxs("h2",{className:"text-4xl md:text-5xl font-black tracking-tight leading-tight uppercase italic",children:["¿Listo para llevar tu flota ",c.jsx("br",{className:"hidden md:block"}),"al siguiente nivel?"]}),c.jsx("p",{className:"text-white/40 text-lg md:text-xl max-w-2xl mx-auto px-4 font-medium",children:"Únete a la red de transporte más moderna de la región. Registra tu vehículo hoy mismo y empieza a ver los beneficios."}),c.jsxs("div",{className:"flex flex-col sm:flex-row justify-center gap-4 md:gap-6 pt-4 px-8 sm:px-0",children:[c.jsx("button",{onClick:e,className:"px-10 md:px-12 py-4 md:py-5 bg-primary-500 text-white font-black rounded-2xl shadow-2xl shadow-primary-500/40 hover:bg-primary-600 transition-all active:scale-95 text-base md:text-xl uppercase tracking-wider",children:"Quiero ser Socio"}),c.jsx("button",{onClick:t,className:"px-10 md:px-12 py-4 md:py-5 bg-white/10 text-white font-black rounded-2xl border border-white/10 hover:bg-white/20 transition-all active:scale-95 text-base md:text-xl uppercase tracking-wider",children:"Acceso Administrativo"})]}),c.jsxs("div",{className:"pt-16 md:pt-20 grid grid-cols-1 md:grid-cols-3 items-center gap-10",children:[c.jsxs("div",{className:"flex items-center gap-2 justify-center md:justify-start",children:[c.jsx("div",{className:"w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10",children:c.jsx("img",{src:"/assets/logo_icon.png",alt:"Ruta-Go Logo",className:"w-7 h-7 object-contain"})}),c.jsx("span",{className:"text-xl font-black tracking-tighter uppercase italic",children:"Ruta-Go"})]}),c.jsx("div",{className:"text-white/20 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] order-3 md:order-none",children:"ChopCode Solutions © 2026 • Huila, CO"}),c.jsxs("div",{className:"flex justify-center md:justify-end gap-6 text-white/40 text-sm md:text-base order-2 md:order-none font-bold uppercase tracking-widest",children:[c.jsx("span",{onClick:s,className:"hover:text-primary-500 cursor-pointer transition-colors",children:"Manual"}),c.jsx("span",{onClick:i,className:"hover:text-primary-500 cursor-pointer transition-colors",children:"Privacidad"}),c.jsx("span",{onClick:r,className:"hover:text-primary-500 cursor-pointer transition-colors",children:"Términos"})]})]})]})]})]})}function dv({icon:t,title:e,desc:n,color:r,features:i,actions:s,isStatic:o}){return c.jsxs("div",{className:`card-base p-8 md:p-10 rounded-3xl md:rounded-[3rem] group ${o?"hover:shadow-2xl hover:-translate-y-2":""}`,children:[c.jsx("div",{className:`mb-6 md:mb-8 w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center bg-slate-50 dark:bg-white/5 ${r} group-hover:scale-110 transition-transform duration-500 shadow-inner`,children:t}),c.jsx("h3",{className:"text-xl md:text-2xl font-black text-[#061426] dark:text-white mb-3 md:mb-4 uppercase italic",children:e}),c.jsx("p",{className:"text-sm md:text-base text-slate-600 dark:text-white/40 leading-relaxed mb-6 md:mb-8 min-h-[3.5rem] font-medium",children:n}),c.jsx("ul",{className:"space-y-2 md:space-y-3 mb-8",children:i.map((l,u)=>c.jsxs("li",{className:"flex items-center gap-2 md:gap-3 text-[10px] md:text-xs font-bold text-slate-400 dark:text-white/30 uppercase tracking-wide",children:[c.jsx(dr,{size:14,className:"text-green-500 md:size-4"})," ",l]},u))}),c.jsx("div",{className:"flex flex-col gap-3",children:s.map((l,u)=>l.link?c.jsxs("a",{href:l.link,target:"_blank",rel:"noopener noreferrer",className:`w-full py-3 rounded-xl font-black text-[10px] uppercase tracking-widest text-center transition-all active:scale-95 flex items-center justify-center gap-2 ${l.type==="primary"?"bg-primary-500 text-white shadow-lg shadow-primary-500/30 hover:bg-primary-600":"bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white/60 border border-slate-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/10"}`,children:[l.label," ",c.jsx(Wi,{size:14})]},u):c.jsxs("button",{onClick:l.action,className:`w-full py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 ${l.type==="primary"?"bg-[#061426] dark:bg-primary-500 text-white shadow-lg shadow-slate-900/30 dark:shadow-primary-500/20 hover:bg-black dark:hover:bg-primary-600":"bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white/60 border border-slate-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/10"}`,children:[l.label," ",c.jsx(Wi,{size:14})]},u))})]})}function hv({city:t}){return c.jsxs("div",{className:"px-6 md:px-10 py-4 md:py-6 bg-white dark:bg-white/5 rounded-2xl md:rounded-[2.5rem] border border-slate-200 dark:border-white/5 flex items-center gap-3 md:gap-4 group hover:bg-white dark:hover:bg-white/10 hover:shadow-xl transition-all duration-500 shadow-sm",children:[c.jsx("div",{className:"w-10 h-10 md:w-12 md:h-12 bg-slate-50 dark:bg-secondary-900 rounded-xl md:rounded-2xl shadow-inner flex items-center justify-center text-primary-500 group-hover:rotate-12 transition-transform",children:c.jsx(sh,{size:20,className:"md:size-6"})}),c.jsx("span",{className:"text-lg md:text-2xl font-black text-[#061426] dark:text-white uppercase italic tracking-tighter",children:t})]})}function qA({onShowRegister:t,onBack:e}){const[n,r]=$.useState(""),[i,s]=$.useState(""),[o,l]=$.useState(null),[u,h]=$.useState(!1),m=async p=>{p.preventDefault(),h(!0),l(null);try{await IN(Uo,n,i)}catch{l("Email o contraseña incorrectos. Verifica tus credenciales.")}finally{h(!1)}};return c.jsxs("div",{className:"min-h-screen bg-slate-50 dark:bg-secondary-900 flex flex-col lg:flex-row overflow-hidden font-sans selection:bg-primary-100 transition-colors duration-300",children:[c.jsxs("div",{className:"hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#061426] to-[#0B2B3F] p-20 flex-col justify-between relative border-r border-white/5",children:[c.jsx("div",{className:"absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none",children:c.jsx(Js,{size:600,className:"text-white absolute -right-20 -bottom-20 rotate-12"})}),c.jsxs("div",{className:"relative z-10 flex items-center gap-3",children:[c.jsx("img",{src:"/assets/logo_icon.png",alt:"Ruta-Go Logo",className:"w-12 h-12 object-contain"}),c.jsx("span",{className:"text-3xl font-black tracking-tighter text-white uppercase italic",children:"Ruta-Go"})]}),c.jsxs("div",{className:"relative z-10 space-y-8",children:[c.jsxs("h2",{className:"text-6xl font-black text-white leading-tight tracking-tight uppercase",children:["Acceso ",c.jsx("br",{}),c.jsx("span",{className:"text-primary-500 text-7xl italic",children:"Inteligente"})," ",c.jsx("br",{}),"Universal."]}),c.jsxs("div",{className:"flex items-center gap-4 text-white/50 font-bold uppercase tracking-widest text-xs border-l-4 border-primary-500 pl-6",children:["Una sola llave para todo el Holding. ",c.jsx("br",{}),"El sistema detectará tu rol automáticamente."]})]}),c.jsx("div",{className:"relative z-10 text-white/30 text-[10px] font-black uppercase tracking-[0.3em]",children:"ChopCode Solutions • Secure Access Gateway"})]}),c.jsxs("div",{className:"flex-1 bg-transparent p-6 lg:p-20 flex flex-col justify-center relative animate-in fade-in slide-in-from-right-4 duration-500",children:[c.jsx("button",{onClick:e,className:"absolute top-8 left-8 lg:left-20 p-3 text-slate-400 dark:text-white/20 hover:text-primary-500 hover:bg-slate-50 dark:hover:bg-white/5 rounded-full transition-all group",children:c.jsx(Wo,{size:24,className:"group-hover:-translate-x-1 transition-transform"})}),c.jsxs("div",{className:"max-w-md mx-auto w-full space-y-10",children:[c.jsxs("div",{className:"space-y-2",children:[c.jsx("h3",{className:"text-3xl font-black text-slate-800 dark:text-white tracking-tight uppercase italic",children:"Iniciar Sesión"}),c.jsxs("div",{className:"flex items-center gap-2",children:[c.jsx("span",{className:"w-2 h-2 bg-green-500 rounded-full animate-pulse"}),c.jsx("p",{className:"text-slate-400 dark:text-white/40 font-bold text-[10px] uppercase tracking-widest",children:"Puerta de Enlace Única (SSO)"})]})]}),c.jsxs("form",{onSubmit:m,className:"space-y-6",children:[c.jsx(fv,{label:"Correo Corporativo",type:"email",placeholder:"tu@rutago.com",icon:c.jsx(Go,{size:18}),value:n,onChange:r}),c.jsx(fv,{label:"Contraseña",type:"password",placeholder:"••••••••",icon:c.jsx(Mx,{size:18}),value:i,onChange:s}),o&&c.jsxs("div",{className:"p-4 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-2xl text-red-600 dark:text-red-400 text-[10px] font-black uppercase flex items-center gap-3 animate-shake",children:[c.jsx("div",{className:"w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shrink-0"}),o]}),c.jsx("button",{type:"submit",disabled:u,className:"w-full bg-secondary-800 dark:bg-primary-500 hover:bg-black dark:hover:bg-primary-600 text-white font-black py-5 rounded-2xl shadow-2xl shadow-slate-900/30 dark:shadow-primary-500/20 transition-all transform active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed text-sm uppercase tracking-widest",children:u?c.jsx(hr,{className:"animate-spin",size:20}):"Entrar a Ruta-Go"})]}),c.jsx("div",{className:"pt-8 border-t border-slate-50 dark:border-white/5 text-center",children:c.jsxs("p",{className:"text-xs font-bold text-slate-400 dark:text-white/40 uppercase tracking-tight",children:["¿Aún no eres socio? "," ",c.jsx("button",{onClick:t,className:"text-primary-500 hover:text-primary-600 transition-colors border-b-2 border-primary-500/20 hover:border-primary-500 pb-0.5",children:"Registrar mi Flota"})]})}),c.jsx("p",{className:"text-center text-[10px] text-slate-300 dark:text-white/10 font-black uppercase tracking-[0.2em]",children:"Ruta-Go Portal © 2026"})]})]})]})}function fv({label:t,type:e,placeholder:n,icon:r,value:i,onChange:s}){return c.jsxs("div",{className:"space-y-1.5 group",children:[c.jsx("label",{className:"text-[10px] font-black text-slate-400 dark:text-white/40 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-primary-500",children:t}),c.jsxs("div",{className:"relative",children:[c.jsx("div",{className:"absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 dark:text-white/20 transition-colors group-focus-within:text-primary-500",children:r}),c.jsx("input",{type:e,required:!0,className:"block w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl text-slate-800 dark:text-white font-bold focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all placeholder:opacity-30 text-sm",placeholder:n,value:i,onChange:o=>s(o.target.value)})]})]})}function KA({onBack:t,initialMode:e="owner"}){const[n,r]=$.useState(e),[i,s]=$.useState(""),[o,l]=$.useState(""),[u,h]=$.useState(""),[m,p]=$.useState(""),[g,E]=$.useState(null),[I,P]=$.useState(!1),[L,N]=$.useState(!1),w=async b=>{b.preventDefault(),P(!0),E(null);try{const O=(await CN(Uo,i,o)).user;await RN(O,{displayName:u});const U=be(Ne,`usuarios/${O.uid}`),x={id:O.uid,nombre:u,email:i,telefono:m,rol:n==="owner"?"dueño":"pasajero",fechaRegistro:Date.now(),status:"active"};if(await Zl(U,x),n==="owner"){const y=be(Ne,`dueños/${O.uid}`);await Zl(y,"pendiente")}N(!0)}catch(j){j.code==="auth/email-already-in-use"?E("Este correo ya está registrado en Ruta-Go."):E("Ocurrió un error al procesar tu solicitud."),console.error(j)}finally{P(!1)}};return L?c.jsx("div",{className:"min-h-screen bg-slate-50 dark:bg-secondary-900 flex items-center justify-center p-4 transition-colors duration-300",children:c.jsxs("div",{className:"max-w-md w-full bg-white dark:bg-secondary-800 rounded-[3rem] shadow-2xl p-12 text-center space-y-8 animate-in zoom-in-95 duration-500 border border-slate-100 dark:border-white/5",children:[c.jsx("div",{className:"w-20 h-20 bg-green-100 dark:bg-green-500/10 rounded-3xl flex items-center justify-center text-green-600 dark:text-green-500 mx-auto animate-bounce shadow-inner",children:c.jsx(dr,{size:40})}),c.jsxs("div",{className:"space-y-4",children:[c.jsx("h2",{className:"text-3xl font-black text-slate-800 dark:text-white tracking-tight uppercase italic",children:n==="owner"?"¡Solicitud Recibida!":"¡Bienvenido!"}),c.jsxs("p",{className:"text-slate-500 dark:text-white/60 font-medium leading-relaxed",children:["Hola ",c.jsx("span",{className:"text-primary-500 font-bold",children:u}),", tu cuenta ha sido creada exitosamente."]}),n==="owner"?c.jsx("div",{className:"p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 text-xs font-bold text-slate-400 dark:text-white/40 uppercase tracking-wider",children:"Nuestro equipo administrativo activará tu dashboard en breve."}):c.jsx("div",{className:"p-4 bg-primary-50 dark:bg-primary-500/10 rounded-2xl border border-primary-100 dark:border-primary-500/20 text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider",children:"Ya puedes iniciar sesión y reservar tu primer viaje."})]}),c.jsx("button",{onClick:t,className:"w-full py-4 bg-[#061426] dark:bg-primary-500 text-white font-black rounded-2xl shadow-xl hover:bg-black dark:hover:bg-primary-600 transition-all active:scale-95 uppercase tracking-widest text-sm",children:"Ir al Inicio"})]})}):c.jsxs("div",{className:"min-h-screen bg-slate-50 dark:bg-secondary-900 flex flex-col lg:flex-row overflow-hidden transition-colors duration-300",children:[c.jsxs("div",{className:"hidden lg:flex lg:w-1/2 bg-gradient-to-br from-secondary-900 to-secondary-800 p-20 flex-col justify-between relative border-r border-white/5",children:[c.jsx("div",{className:"absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none",children:n==="owner"?c.jsx(Gi,{size:600,className:"text-white absolute -right-20 -bottom-20 rotate-12"}):c.jsx(zr,{size:600,className:"text-white absolute -right-20 -bottom-20 rotate-12"})}),c.jsxs("div",{className:"relative z-10 flex items-center gap-3",children:[c.jsx("img",{src:"/assets/logo_icon.png",alt:"Ruta-Go Logo",className:"w-12 h-12 object-contain"}),c.jsx("span",{className:"text-3xl font-black tracking-tighter text-white uppercase italic",children:"Ruta-Go"})]}),c.jsxs("div",{className:"relative z-10 space-y-8",children:[c.jsxs("h2",{className:"text-6xl font-black text-white leading-tight tracking-tight uppercase",children:[n==="owner"?"Únete a la":"Viaja con"," ",c.jsx("br",{}),c.jsx("span",{className:"text-primary-500 text-7xl italic",children:"revolución"})," ",c.jsx("br",{}),n==="owner"?"del transporte.":"del Huila."]}),c.jsx("div",{className:"flex items-center gap-4 text-white/50 font-bold uppercase tracking-widest text-xs border-l-4 border-primary-500 pl-6",children:n==="owner"?"Gestión de flota, contabilidad en vivo y control operativo total.":"Reservas en tiempo real, puntos de fidelidad y la mejor experiencia."})]}),c.jsx("div",{className:"relative z-10 text-white/30 text-[10px] font-black uppercase tracking-[0.3em]",children:"ChopCode Solutions • Engineering for Productivity"})]}),c.jsxs("div",{className:"flex-1 bg-transparent p-6 lg:p-20 flex flex-col justify-center relative animate-in slide-in-from-right-4 duration-500",children:[c.jsx("button",{onClick:t,className:"absolute top-8 left-8 lg:left-20 p-3 text-slate-400 dark:text-white/20 hover:text-primary-500 hover:bg-slate-50 dark:hover:bg-white/5 rounded-full transition-all group",children:c.jsx(Wo,{size:24,className:"group-hover:-translate-x-1 transition-transform"})}),c.jsxs("div",{className:"max-w-md mx-auto w-full space-y-10",children:[c.jsxs("div",{className:"space-y-4",children:[c.jsxs("div",{className:"space-y-1",children:[c.jsx("h3",{className:"text-3xl font-black text-slate-800 dark:text-white tracking-tight uppercase italic",children:n==="owner"?"Registro de Socio":"Nuevo Pasajero"}),c.jsx("p",{className:"text-slate-400 dark:text-white/40 font-bold text-[10px] uppercase tracking-widest",children:n==="owner"?"Registra tus datos para afiliar tu flota":"Únete gratis y reserva tus viajes en segundos"})]}),c.jsxs("div",{className:"flex p-1 bg-slate-100 dark:bg-white/5 rounded-2xl transition-colors border border-slate-200 dark:border-white/5",children:[c.jsxs("button",{onClick:()=>r("passenger"),className:`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${n==="passenger"?"bg-white dark:bg-primary-500 text-primary-500 dark:text-white shadow-lg":"text-slate-400 dark:text-white/20 hover:text-slate-600 dark:hover:text-white/40"}`,children:[c.jsx(zr,{size:14})," Soy Pasajero"]}),c.jsxs("button",{onClick:()=>r("owner"),className:`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${n==="owner"?"bg-white dark:bg-primary-500 text-secondary-900 dark:text-white shadow-lg":"text-slate-400 dark:text-white/20 hover:text-slate-600 dark:hover:text-white/40"}`,children:[c.jsx(Gi,{size:14})," Soy Socio"]})]})]}),c.jsxs("form",{onSubmit:w,className:"space-y-6",children:[c.jsx($a,{label:"Nombre Completo",placeholder:"Ej: Juan Pérez",icon:c.jsx(Sc,{size:18}),value:u,onChange:h,required:!0}),c.jsx($a,{label:"Correo Electrónico",type:"email",placeholder:"tu@email.com",icon:c.jsx(Go,{size:18}),value:i,onChange:s,required:!0}),c.jsx($a,{label:"Teléfono / WhatsApp",placeholder:"321 000 0000",icon:c.jsx(Fx,{size:18}),value:m,onChange:p,required:!0}),c.jsx($a,{label:"Contraseña",type:"password",placeholder:"••••••••",icon:c.jsx(Mx,{size:18}),value:o,onChange:l,required:!0}),g&&c.jsxs("div",{className:"p-4 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-2xl text-red-600 dark:text-red-400 text-[10px] font-black uppercase flex items-center gap-3 animate-shake",children:[c.jsx("div",{className:"w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shrink-0"}),g]}),c.jsx("button",{type:"submit",disabled:I,className:`w-full text-white font-black py-5 rounded-2xl shadow-2xl transition-all transform active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed text-sm uppercase tracking-widest ${n==="owner"?"bg-[#061426] dark:bg-primary-500 hover:bg-black dark:hover:bg-primary-600 shadow-slate-900/30":"bg-primary-500 hover:bg-primary-600 shadow-primary-500/30"}`,children:I?c.jsx(hr,{className:"animate-spin",size:20}):n==="owner"?"Enviar Solicitud de Socio":"Crear mi Cuenta de Pasajero"})]}),c.jsx("p",{className:"text-center text-[10px] text-slate-300 dark:text-white/10 font-black uppercase tracking-[0.2em]",children:"Ruta-Go Portal © 2026"})]})]})]})}function $a({label:t,value:e,onChange:n,type:r="text",placeholder:i,icon:s,required:o=!1}){return c.jsxs("div",{className:"space-y-1.5 group",children:[c.jsx("label",{className:"text-[10px] font-black text-slate-400 dark:text-white/40 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-primary-500",children:t}),c.jsxs("div",{className:"relative",children:[c.jsx("div",{className:"absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 dark:text-white/20 transition-colors group-focus-within:text-primary-500",children:s}),c.jsx("input",{type:r,required:o,placeholder:i,className:"w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl font-bold text-slate-700 dark:text-white focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all placeholder:opacity-30 text-sm",value:e,onChange:l=>n(l.target.value)})]})]})}function YA({onBack:t}){return c.jsxs("div",{className:"min-h-screen bg-slate-50 font-sans selection:bg-primary-100",children:[c.jsx("nav",{className:"bg-white border-b border-slate-200 sticky top-0 z-50",children:c.jsxs("div",{className:"max-w-4xl mx-auto px-6 h-20 flex items-center gap-4",children:[c.jsx("button",{onClick:t,className:"p-2 text-slate-400 hover:text-primary-500 hover:bg-slate-50 rounded-full transition-all",children:c.jsx(Wo,{size:24})}),c.jsx("h1",{className:"text-xl font-black text-secondary-900 tracking-tight",children:"Términos y Condiciones"})]})}),c.jsxs("main",{className:"max-w-4xl mx-auto px-6 py-16 space-y-12",children:[c.jsxs("section",{className:"bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 space-y-8 text-justify",children:[c.jsxs("div",{className:"flex items-center gap-4 border-b border-slate-100 pb-6",children:[c.jsx("div",{className:"w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-500 shadow-inner",children:c.jsx(q2,{size:28})}),c.jsxs("div",{children:[c.jsx("p",{className:"text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]",children:"Acuerdo Legal"}),c.jsx("h2",{className:"text-2xl font-black text-slate-800 tracking-tight",children:"Reglas de Operación Ruta-Go"})]})]}),c.jsx("p",{className:"text-slate-600 leading-relaxed italic",children:"Versión 1.4.0 Stable | Vigentes desde el 16 de julio de 2026. Al utilizar la plataforma (App o Web), usted acepta estos términos."}),c.jsxs("div",{className:"space-y-6",children:[c.jsx("h3",{className:"text-lg font-black text-secondary-900 flex items-center gap-2 italic",children:"1. Naturaleza del Servicio"}),c.jsxs("p",{className:"text-slate-600 leading-relaxed",children:["Ruta-Go es un intermediario tecnológico para la optimización del transporte intermunicipal. Actuamos como un motor de gestión de cupos y horarios.",c.jsx("strong",{className:"text-secondary-900",children:" Chop Code Solutions no es una empresa de transportes"})," ni posee flota vehicular propia."]}),c.jsx("h3",{className:"text-lg font-black text-secondary-900 flex items-center gap-2 italic",children:"2. Responsabilidad de Socios y Dueños"}),c.jsx("p",{className:"text-slate-600 leading-relaxed",children:"Los usuarios registrados con rol de Socio/Dueño de Flota se comprometen a utilizar los datos del portal administrativo con fines estrictamente operativos. La información sobre pasajeros, ingresos y conductores es confidencial y su mal uso será motivo de expulsión inmediata."}),c.jsx("h3",{className:"text-lg font-black text-secondary-900 flex items-center gap-2 italic",children:"3. Compromisos de Seguridad"}),c.jsx("p",{className:"text-slate-600 leading-relaxed",children:"Es responsabilidad del transportador garantizar que la información técnica del vehículo (placa y capacidad) sea veraz y se encuentre sincronizada con la base de datos de Ruta-Go para evitar sobreventa de cupos."}),c.jsxs("div",{className:"p-6 bg-red-50 rounded-2xl border border-red-100 flex items-start gap-4",children:[c.jsx(Q2,{className:"text-red-500 shrink-0",size:24}),c.jsx("p",{className:"text-xs text-red-700 font-bold leading-relaxed uppercase",children:"Aviso Legal: Chop Code Solutions no asume responsabilidad por fallas mecánicas, accidentes, retrasos físicos o disputas de precios fuera de lo estipulado en la plataforma."})]}),c.jsx("h3",{className:"text-lg font-black text-secondary-900 flex items-center gap-2 italic",children:"4. Propiedad Intelectual"}),c.jsxs("p",{className:"text-slate-600 leading-relaxed",children:["Todo el código fuente, motores de reserva (Seat/Reservation Engine), logotipos y manuales técnicos son propiedad exclusiva de ",c.jsx("strong",{className:"text-primary-500",children:"Chop Code Solutions"}),"."]})]})]}),c.jsx("footer",{className:"text-center pb-10",children:c.jsx("p",{className:"text-[10px] text-slate-300 font-black uppercase tracking-[0.3em]",children:"ChopCode Solutions © 2026 • Nátaga - La Plata, Huila"})})]})]})}function QA({onBack:t}){return c.jsxs("div",{className:"min-h-screen bg-slate-50 font-sans selection:bg-primary-100",children:[c.jsx("nav",{className:"bg-white border-b border-slate-200 sticky top-0 z-50",children:c.jsxs("div",{className:"max-w-4xl mx-auto px-6 h-20 flex items-center gap-4",children:[c.jsx("button",{onClick:t,className:"p-2 text-slate-400 hover:text-primary-500 hover:bg-slate-50 rounded-full transition-all",children:c.jsx(Wo,{size:24})}),c.jsx("h1",{className:"text-xl font-black text-secondary-900 tracking-tight",children:"Política de Privacidad"})]})}),c.jsxs("main",{className:"max-w-4xl mx-auto px-6 py-16 space-y-12 text-justify",children:[c.jsxs("section",{className:"bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 space-y-8",children:[c.jsxs("div",{className:"flex items-center gap-4 border-b border-slate-100 pb-6",children:[c.jsx("div",{className:"w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 shadow-inner",children:c.jsx(Js,{size:28})}),c.jsxs("div",{children:[c.jsx("p",{className:"text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]",children:"Protección de Datos"}),c.jsx("h2",{className:"text-2xl font-black text-slate-800 tracking-tight",children:"Habeas Data & Seguridad"})]})]}),c.jsxs("p",{className:"text-slate-600 leading-relaxed italic",children:["Estamos comprometidos con la seguridad de sus datos en cumplimiento de la ",c.jsx("strong",{className:"text-secondary-900",children:"Ley 1581 de 2012"})," de la República de Colombia."]}),c.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[c.jsx(pv,{icon:c.jsx(z2,{size:18}),title:"Operación",desc:"Recolectamos nombres, correos y placas para la gestión logística."}),c.jsx(pv,{icon:c.jsx(Go,{size:18}),title:"Contacto",desc:"El teléfono es esencial para la coordinación real entre chofer y pasajero."})]}),c.jsxs("div",{className:"space-y-6",children:[c.jsx("h3",{className:"text-lg font-black text-secondary-900 italic border-l-4 border-primary-500 pl-4",children:"3. Eliminación de Datos (Derecho al Olvido)"}),c.jsxs("div",{className:"bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4",children:[c.jsx("p",{className:"text-slate-600 text-sm leading-relaxed",children:"En cumplimiento con las políticas de Google Play, proporcionamos métodos claros para borrar su cuenta:"}),c.jsxs("ul",{className:"space-y-3",children:[c.jsxs("li",{className:"flex gap-3 text-xs font-bold text-slate-500",children:[c.jsx("span",{className:"w-5 h-5 bg-white rounded-full flex items-center justify-center text-primary-500 shadow-sm shrink-0",children:"1"}),"Dentro de la App: Perfil > Solicitar borrar cuenta."]}),c.jsxs("li",{className:"flex gap-3 text-xs font-bold text-slate-500",children:[c.jsx("span",{className:"w-5 h-5 bg-white rounded-full flex items-center justify-center text-primary-500 shadow-sm shrink-0",children:"2"}),"Vía Email: Enviando solicitud a ",c.jsx("strong",{className:"text-secondary-900",children:"dazace94@gmail.com"}),"."]})]}),c.jsxs("div",{className:"p-4 bg-amber-50 rounded-xl flex items-center gap-3",children:[c.jsx(kc,{className:"text-amber-500",size:18}),c.jsx("p",{className:"text-[10px] text-amber-700 font-black uppercase",children:"Periodo de gracia: 30 días antes del borrado definitivo."})]})]}),c.jsx("h3",{className:"text-lg font-black text-secondary-900 italic border-l-4 border-primary-500 pl-4",children:"4. Seguridad y Segregación"}),c.jsxs("p",{className:"text-slate-600 leading-relaxed",children:["Implementamos una arquitectura de ",c.jsx("strong",{className:"text-secondary-900",children:"Segregación Total de Roles"}),". Los datos residen en infraestructuras lógicas independientes cifradas mediante protocolos de Firebase de última generación."]})]})]}),c.jsx("footer",{className:"text-center pb-10",children:c.jsx("p",{className:"text-[10px] text-slate-300 font-black uppercase tracking-[0.3em]",children:"ChopCode Solutions © 2026 • Privacidad Blindada"})})]})]})}function pv({icon:t,title:e,desc:n}){return c.jsxs("div",{className:"p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-2",children:[c.jsx("div",{className:"text-primary-500",children:t}),c.jsx("h4",{className:"font-black text-secondary-900 text-xs uppercase tracking-wider",children:e}),c.jsx("p",{className:"text-xs text-slate-500 leading-relaxed",children:n})]})}function mv({role:t,onBack:e,isTab:n=!1}){const r=(t==null?void 0:t.type)||"PASSENGER",i={PASSENGER:{title:"Guía del Pasajero",icon:c.jsx(zr,{className:"text-blue-500"}),color:"blue",steps:[{title:"Búsqueda de Horarios",desc:"Usa las pestañas en el Dashboard para alternar entre rutas. El sistema marcará automáticamente el próximo viaje disponible con un borde naranja brillante.",icon:c.jsx(No,{})},{title:"Reserva de Asiento",desc:"Haz clic en 'Reservar' en el horario deseado. Se abrirá el mapa del bus; toca un asiento libre (blanco) para seleccionarlo.",icon:c.jsx(H2,{})},{title:"Confirmación",desc:"Verifica el precio y confirma tu reserva. Tu asiento quedará bloqueado instantáneamente para los demás.",icon:c.jsx(wc,{})},{title:"Instalación en iPhone",desc:"En Safari, toca 'Compartir' > 'Añadir a pantalla de inicio'. Así tendrás acceso rápido como si fuera una App nativa.",icon:c.jsx(Lg,{})}]},DRIVER:{title:"Guía del Conductor",icon:c.jsx(Xr,{className:"text-primary-500"}),color:"orange",steps:[{title:"Tu Itinerario",desc:"En 'Mi Itinerario' verás tus turnos asignados. El sistema resalta el viaje que te corresponde realizar a continuación.",icon:c.jsx(No,{})},{title:"Ventas de Calle",desc:"Usa el botón naranja (+) para abrir el mapa del bus y marcar asientos vendidos a pasajeros que abordan sin reserva previa.",icon:c.jsx(Lg,{})},{title:"Confirmar Reservas",desc:"En la sección 'Confirmar Reservas', toca el botón verde al lado de cada pasajero cuando suban al bus para formalizar el ingreso.",icon:c.jsx(U2,{})},{title:"Sincronización",desc:"Todos tus cambios se reflejan en tiempo real para los pasajeros y el dueño de la flota.",icon:c.jsx(Js,{})}]},OWNER:{title:"Guía del Socio/Dueño",icon:c.jsx(D2,{className:"text-amber-500"}),color:"amber",steps:[{title:"Dashboard de Flota",desc:"Monitorea en tiempo real cuántos de tus vehículos están en ruta y el recaudo bruto acumulado del día.",icon:c.jsx(Gi,{})},{title:"Gestión de Operadores",desc:"Usa la sección 'Conductores' para vincular nuevos choferes a tus activos usando su correo electrónico.",icon:c.jsx(Ec,{})},{title:"Privacidad de Datos",desc:"Tu información financiera está aislada; ningún otro dueño puede ver tus ingresos o telemetría.",icon:c.jsx(X2,{})},{title:"Planilla Maestra",desc:"Consulta los despachos globales para coordinar la logística de tus buses con el resto del holding.",icon:c.jsx(sh,{})}]},ADMIN:{title:"Guía de Administrador",icon:c.jsx(Js,{className:"text-green-500"}),color:"green",steps:[{title:"Control Maestro",desc:"Tienes visibilidad total sobre todos los dueños, conductores y pasajeros del sistema.",icon:c.jsx(Gi,{})},{title:"Gobernanza",desc:"Puedes gestionar solicitudes de borrado de cuenta y verificar la integridad de los datos en tiempo real.",icon:c.jsx(Js,{})},{title:"Configuración Global",desc:"Acceso a la planilla de despachos para ajustar horarios y rutas base.",icon:c.jsx(sh,{})}]}},s=i[r]||i.PASSENGER,o=c.jsxs("div",{className:"space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700",children:[c.jsxs("header",{className:"flex flex-col md:flex-row items-center gap-6 p-8 bg-white dark:bg-white/5 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-sm",children:[c.jsx("div",{className:"w-20 h-20 bg-primary-500 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-primary-500/20 transform -rotate-3",children:c.jsx(O2,{size:40})}),c.jsxs("div",{className:"text-center md:text-left space-y-1",children:[c.jsx("h2",{className:"text-3xl font-black text-slate-800 dark:text-white tracking-tight leading-none uppercase italic",children:"Centro de Ayuda"}),c.jsxs("p",{className:"text-slate-500 dark:text-white/40 font-medium text-sm",children:["Explora las funcionalidades clave para tu rol de ",c.jsx("span",{className:"text-primary-500 font-bold",children:r}),"."]})]})]}),c.jsxs("section",{className:"space-y-8",children:[c.jsxs("div",{className:"flex items-center gap-4 border-b border-slate-200 dark:border-white/5 pb-4 px-2",children:[c.jsx("div",{className:"w-12 h-12 bg-white dark:bg-white/5 rounded-2xl flex items-center justify-center border border-slate-100 dark:border-none shadow-sm",children:s.icon}),c.jsx("h3",{className:"text-xl font-black text-slate-800 dark:text-white uppercase tracking-tight italic",children:s.title})]}),c.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:s.steps.map((l,u)=>c.jsxs("div",{className:"card-base p-8 rounded-[2.5rem] hover:ring-2 ring-primary-500/30 transition-all group",children:[c.jsxs("div",{className:"flex items-center gap-4 mb-4",children:[c.jsx("div",{className:"p-3 bg-slate-50 dark:bg-white/5 rounded-xl text-primary-500 group-hover:scale-110 transition-transform",children:l.icon||c.jsx(Cf,{size:20})}),c.jsx("h4",{className:"font-black text-slate-800 dark:text-white uppercase text-sm tracking-widest",children:l.title})]}),c.jsx("p",{className:"text-slate-500 dark:text-white/40 text-sm leading-relaxed font-medium",children:l.desc})]},u))})]}),c.jsxs("section",{className:"bg-red-50 dark:bg-red-500/5 p-8 md:p-10 rounded-[2.5rem] border border-red-100 dark:border-red-500/10 space-y-6",children:[c.jsxs("div",{className:"flex items-center gap-4",children:[c.jsx("div",{className:"w-12 h-12 bg-red-100 dark:bg-red-500/10 rounded-xl flex items-center justify-center text-red-600 dark:text-red-500",children:c.jsx(kc,{size:24})}),c.jsx("h3",{className:"text-xl font-black text-red-800 dark:text-red-500 uppercase italic",children:"Seguridad y Privacidad"})]}),c.jsx("p",{className:"text-red-700/80 dark:text-red-500/60 text-sm leading-relaxed font-medium",children:"Tus datos están protegidos bajo la ley de Habeas Data. Si deseas retirarte de la plataforma, solicita el borrado desde tu Perfil. Tendrás un periodo de gracia de 30 días antes de la eliminación definitiva."})]}),c.jsx("footer",{className:"text-center pb-10",children:c.jsx("p",{className:"text-[10px] text-slate-300 dark:text-white/20 font-black uppercase tracking-[0.3em]",children:"ChopCode Solutions © 2026 • Soporte: dazace94@gmail.com"})})]});return n?o:c.jsxs("div",{className:"min-h-screen bg-slate-50 dark:bg-[#061426] text-slate-800 dark:text-white font-sans overflow-y-auto transition-colors duration-300",children:[c.jsxs("nav",{className:"h-20 flex items-center gap-4 px-6 border-b border-slate-200 dark:border-white/5 sticky top-0 bg-white/80 dark:bg-[#061426]/80 backdrop-blur-md z-50",children:[c.jsx("button",{onClick:e,className:"p-3 text-slate-400 dark:text-white/40 hover:text-primary-500 hover:bg-slate-100 dark:hover:bg-white/5 rounded-2xl transition-all",children:c.jsx(Wo,{size:24})}),c.jsxs("div",{className:"flex items-center gap-3",children:[c.jsx("img",{src:"/assets/logo_icon.png",alt:"Ruta-Go",className:"w-8 h-8 object-contain"}),c.jsx("h1",{className:"text-xl font-black text-slate-800 dark:text-white uppercase italic tracking-tighter",children:"Manual de Usuario"})]})]}),c.jsx("div",{className:"max-w-4xl mx-auto px-6 py-12",children:o})]})}function XA({isOpen:t,onClose:e,activeTab:n,setActiveTab:r,role:i}){const s=()=>ON(Uo),o=(i==null?void 0:i.type)==="ADMIN",l=(i==null?void 0:i.type)==="OWNER",u=o||l,h=[{title:"Principal",items:[{id:"overview",label:"Vista General",icon:c.jsx(Lx,{size:20}),roles:["ADMIN","OWNER","DRIVER","PASSENGER"]}]},{title:"Gestión Operativa",hidden:!u,items:[{id:"drivers",label:"Conductores",icon:c.jsx(Xr,{size:20}),roles:["ADMIN","OWNER"]},{id:"users",label:"Pasajeros",icon:c.jsx(zr,{size:20}),roles:["ADMIN"]},{id:"schedules",label:"Planilla",icon:c.jsx(No,{size:20}),roles:["ADMIN","OWNER"]}]},{title:"Usuario",items:[{id:"history",label:"Historial",icon:c.jsx(Nf,{size:20}),roles:["ADMIN","OWNER","DRIVER","PASSENGER"]},{id:"profile",label:"Mi Perfil",icon:c.jsx(F2,{size:20}),roles:["ADMIN","OWNER","DRIVER","PASSENGER"]}]},{title:"Soporte",items:[{id:"manual",label:"Ayuda",icon:c.jsx(M2,{size:20}),roles:["ADMIN","OWNER","DRIVER","PASSENGER"]}]}];return c.jsxs(c.Fragment,{children:[t&&c.jsx("div",{className:"fixed inset-0 bg-secondary-900/60 dark:bg-black/60 backdrop-blur-sm z-40 lg:hidden",onClick:e}),c.jsxs("aside",{className:`
        fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-[#061426] flex flex-col shadow-2xl transition-all duration-300 border-r border-slate-100 dark:border-white/5
        lg:relative lg:translate-x-0 lg:z-20
        ${t?"translate-x-0":"-translate-x-full"}
      `,children:[c.jsxs("div",{className:"p-8 flex items-center justify-between",children:[c.jsxs("div",{className:"flex items-center gap-3",children:[c.jsx("div",{className:"w-10 h-10 bg-[#061426] dark:bg-primary-500 rounded-xl flex items-center justify-center shadow-lg transition-colors",children:c.jsx("img",{src:"/assets/logo_icon.png",alt:"Ruta-Go",className:"w-6 h-6 object-contain"})}),c.jsxs("div",{className:"flex flex-col leading-tight text-left",children:[c.jsx("span",{className:"text-lg font-black tracking-tight text-[#061426] dark:text-white uppercase italic",children:"Ruta-Go"}),c.jsx("span",{className:"text-[10px] text-primary-500 font-black tracking-widest uppercase opacity-80",children:(i==null?void 0:i.type)==="ADMIN"?"Admin Maestro":(i==null?void 0:i.type)==="OWNER"?"Panel Dueños":(i==null?void 0:i.type)==="DRIVER"?"Panel Conductor":"Portal Pasajero"})]})]}),c.jsx("button",{onClick:e,className:"lg:hidden p-2 text-slate-400 dark:text-white/50 hover:text-primary-500 transition-colors",children:c.jsx(bc,{size:20})})]}),c.jsx("nav",{className:"flex-1 px-4 space-y-8 overflow-y-auto scrollbar-hide py-4",children:h.map((m,p)=>{if(m.hidden)return null;const g=m.items.filter(E=>E.roles.includes(i==null?void 0:i.type));return g.length===0?null:c.jsxs("div",{className:"space-y-2",children:[c.jsx("h4",{className:"px-5 text-[10px] font-black text-slate-400 dark:text-white/20 uppercase tracking-[0.2em]",children:m.title}),c.jsx("div",{className:"space-y-1",children:g.map(E=>c.jsx(JA,{icon:E.icon,label:E.label,active:n===E.id,onClick:()=>{r(E.id),window.innerWidth<1024&&e()}},E.id))})]},p)})}),c.jsx("div",{className:"p-4 border-t border-slate-100 dark:border-white/5 space-y-1 text-left",children:c.jsxs("button",{onClick:s,className:"w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all font-black text-xs uppercase tracking-widest",children:[c.jsx(V2,{size:18})," Salir del Portal"]})})]})]})}function JA({icon:t,label:e,active:n,onClick:r}){return c.jsxs("button",{onClick:r,className:`
        w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 group
        ${n?"bg-primary-500 text-white shadow-xl shadow-orange-500/30":"text-slate-500 dark:text-white/40 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-[#061426] dark:hover:text-white"}
      `,children:[c.jsx("span",{className:`${n?"scale-110":"group-hover:scale-110"} transition-transform`,children:t}),c.jsx("span",{className:"font-bold text-xs uppercase tracking-widest",children:e})]})}function ZA({title:t,userEmail:e,onMenuClick:n,role:r,theme:i,onToggleTheme:s}){const o=(r==null?void 0:r.type)==="ADMIN";r==null||r.type;const l=!(r!=null&&r.type);return c.jsxs("header",{className:"h-20 bg-white dark:bg-[#061929] border-b border-slate-200 dark:border-white/5 flex items-center justify-between px-6 lg:px-10 shrink-0 z-30 transition-colors duration-300",children:[c.jsxs("div",{className:"flex items-center gap-4",children:[c.jsx("button",{onClick:n,className:"lg:hidden p-2.5 text-slate-500 dark:text-white/40 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-all active:scale-90",children:c.jsx($2,{size:24})}),c.jsx("h2",{className:"text-xl lg:text-2xl font-black text-slate-800 dark:text-white tracking-tight truncate max-w-[200px] md:max-w-none uppercase italic",children:l?"Verificando...":t})]}),c.jsxs("div",{className:"flex items-center gap-3 md:gap-6",children:[c.jsx("button",{onClick:s,className:"p-3 text-slate-400 dark:text-white/20 hover:bg-slate-100 dark:hover:bg-white/5 rounded-2xl transition-all group",title:i==="dark"?"Cambiar a modo claro":"Cambiar a modo oscuro",children:i==="dark"?c.jsx(J2,{size:20,className:"group-hover:text-amber-400 transition-colors"}):c.jsx(B2,{size:20,className:"group-hover:text-indigo-600 transition-colors"})}),c.jsxs("div",{className:"text-right hidden sm:block",children:[c.jsx("p",{className:"text-[11px] font-black text-slate-700 dark:text-white leading-none truncate max-w-[150px]",children:e}),c.jsx("p",{className:`text-[9px] font-bold uppercase tracking-tighter mt-1 ${l?"text-slate-300":o?"text-primary-500":(r==null?void 0:r.type)==="DRIVER"?"text-amber-500":(r==null?void 0:r.type)==="PASSENGER"?"text-green-500":"text-blue-500"}`,children:l?"Cargando Perfil":o?"Sesión Root":(r==null?void 0:r.type)==="OWNER"?"Sesión Dueño":(r==null?void 0:r.type)==="DRIVER"?"Sesión Conductor":"Sesión Pasajero"})]}),c.jsx("div",{className:`w-10 h-10 lg:w-11 lg:h-11 rounded-xl flex items-center justify-center text-white font-black shadow-lg text-sm transition-colors duration-500 ${l?"bg-slate-200 shadow-none":o?"bg-primary-500 shadow-primary-500/20":(r==null?void 0:r.type)==="DRIVER"?"bg-amber-500 shadow-amber-500/20":(r==null?void 0:r.type)==="PASSENGER"?"bg-green-600 shadow-green-500/20":"bg-blue-600 shadow-blue-500/20"}`,children:e==null?void 0:e.substring(0,2).toUpperCase()})]})]})}function Ls({label:t,value:e,icon:n,trend:r}){return c.jsxs("div",{className:"card-base p-6 md:p-8 rounded-[2rem] hover:-translate-y-1 transition-all duration-300",children:[c.jsx("div",{className:"mb-4 bg-slate-50 dark:bg-white/5 w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center scale-90 md:scale-100 origin-left shadow-inner",children:n}),c.jsx("p",{className:"text-[10px] md:text-xs text-slate-400 dark:text-white/40 font-bold uppercase tracking-widest",children:t}),c.jsxs("div",{className:"flex items-baseline flex-wrap gap-2 mt-1",children:[c.jsx("h4",{className:"text-2xl md:text-3xl font-black text-[#061426] dark:text-white tracking-tighter uppercase italic",children:e}),r&&c.jsx("span",{className:"text-[9px] md:text-[10px] font-bold text-green-500 uppercase",children:r})]})]})}function gv({driver:t,onEdit:e}){t.status;const n=t.status==="blocked",r=t.horariosAsignados&&t.horariosAsignados.length>0,i=t.status==="inactive"||!r&&!n;return c.jsxs("div",{className:"card-base p-4 rounded-2xl flex gap-4 group relative",children:[c.jsx("div",{className:`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-colors ${n?"bg-red-50 dark:bg-red-500/10 text-red-400":"bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-white/20"}`,children:c.jsx(Xr,{size:24})}),c.jsxs("div",{className:"flex-1 min-w-0",children:[c.jsxs("div",{className:"flex items-center justify-between mb-1 gap-2 pr-10",children:[c.jsx("h4",{className:"font-bold text-slate-800 dark:text-white text-sm truncate leading-tight uppercase italic",children:t.nombre}),c.jsx("span",{className:`flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase shrink-0 ${n?"badge-error":i?"bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-500 border border-amber-200 dark:border-amber-500/20":"badge-success"}`,children:n?"Bloqueado":i?"Descanso":"En Ruta"})]}),c.jsxs("div",{className:"flex flex-col gap-1 mt-2",children:[c.jsxs("div",{className:"flex items-center gap-2 text-slate-400 dark:text-white/40 text-[11px] font-medium",children:[c.jsx(Gi,{size:12,className:"text-slate-300 dark:text-white/20"}),c.jsxs("span",{className:"text-slate-600 dark:text-white/60 font-bold",children:["Placa: ",t.placaVehiculo||"N/A"]})]}),c.jsxs("div",{className:"p-2 bg-slate-50 dark:bg-black/20 rounded-lg border border-slate-100 dark:border-white/5 mt-1 shadow-inner",children:[c.jsx("p",{className:"text-[9px] text-slate-400 dark:text-white/40 font-bold uppercase leading-none mb-1",children:"Turnos"}),c.jsx("p",{className:"text-[11px] text-slate-700 dark:text-white/80 font-bold truncate",children:t.horariosAsignados?t.horariosAsignados.join(" | "):"Sin turnos hoy"})]})]})]}),c.jsx("button",{onClick:()=>e(t),className:"absolute top-4 right-4 p-2 text-slate-300 dark:text-white/20 hover:text-primary-500 hover:bg-slate-50 dark:hover:bg-primary-500/10 rounded-full transition-all opacity-0 group-hover:opacity-100 shadow-sm",title:"Editar Conductor",children:c.jsx(W2,{size:16})})]})}const ol={updateDriver:async(t,e)=>{const n=be(Ne,`conductores/${t}`);try{return await q0(n,e),{success:!0}}catch(r){throw console.error("Error actualizando conductor:",r),r}},deleteDriver:async t=>{const e=be(Ne,`conductores/${t}`);try{return await QR(e),{success:!0}}catch(n){throw console.error("Error eliminando conductor:",n),n}},getAllSchedules:async()=>{const t=be(Ne,"horarios"),e=await hi(t);return e.exists()?Object.entries(e.val()).map(([n,r])=>({id:n,...r})):[]},registerDriverAndVehicle:async(t,e)=>{const n={};n[`conductores/${t.id}`]={...t,status:"active",fechaRegistro:Date.now()},n[`vehiculos/${e.placa}`]={...e,conductorId:t.id,estado:"activo"};try{return await q0(be(Ne),n),{success:!0}}catch(r){throw console.error("Error en registro dual:",r),r}}};function e4({driver:t,onClose:e,onRefresh:n}){const[r,i]=$.useState(!1),[s,o]=$.useState([]),[l,u]=$.useState((t==null?void 0:t.horariosAsignados)||[]),[h,m]=$.useState({nombre:(t==null?void 0:t.nombre)||"",placaVehiculo:(t==null?void 0:t.placaVehiculo)||"",status:(t==null?void 0:t.status)||"active"});if($.useEffect(()=>{let I=!0;return(async()=>{try{const L=await ol.getAllSchedules();I&&o(L)}catch(L){console.error("Error cargando horarios:",L)}})(),()=>{I=!1}},[]),!t)return null;const p=I=>{u(P=>P.includes(I)?P.filter(L=>L!==I):[...P,I])},g=async I=>{I.preventDefault(),i(!0);try{await ol.updateDriver(t.id,{...h,horariosAsignados:l}),n&&n(),e()}catch(P){alert("Error al actualizar: "+P.message)}finally{i(!1)}},E=async()=>{if(window.confirm(`¿Seguro que deseas ELIMINAR a ${t.nombre}? Esta acción no se puede deshacer.`)){i(!0);try{await ol.deleteDriver(t.id),n&&n(),e()}catch(I){alert("Error al eliminar: "+I.message)}finally{i(!1)}}};return c.jsx("div",{className:"fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm transition-all animate-in fade-in duration-200",children:c.jsxs("div",{className:"bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-white/20",children:[c.jsxs("div",{className:"p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50",children:[c.jsxs("div",{children:[c.jsx("h3",{className:"text-2xl font-black text-slate-800 tracking-tight",children:"Editar Conductor"}),c.jsxs("p",{className:"text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1",children:["ID Operativo: ",t.id.substring(0,8)]})]}),c.jsx("button",{onClick:e,className:"p-2 text-slate-400 hover:text-primary-500 hover:bg-slate-100 rounded-full transition-all",children:c.jsx(bc,{size:24})})]}),c.jsxs("form",{onSubmit:g,className:"flex-1 overflow-y-auto p-8 space-y-8",children:[c.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8",children:[c.jsxs("div",{className:"space-y-5",children:[c.jsxs("h4",{className:"text-[10px] font-black text-primary-500 uppercase tracking-widest flex items-center gap-2",children:[c.jsx("div",{className:"w-1 h-3 bg-primary-500 rounded-full"})," Perfil Básico"]}),c.jsx(vv,{label:"Nombre Legal",value:h.nombre,onChange:I=>m({...h,nombre:I})}),c.jsx(vv,{label:"Placa Asignada",value:h.placaVehiculo,onChange:I=>m({...h,placaVehiculo:I.toUpperCase()})}),c.jsxs("div",{className:"space-y-1.5",children:[c.jsx("label",{className:"text-[10px] font-bold text-slate-400 uppercase tracking-tight ml-1",children:"Estado"}),c.jsxs("select",{className:"w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 appearance-none transition-all",value:h.status,onChange:I=>m({...h,status:I.target.value}),children:[c.jsx("option",{value:"active",children:"🟢 En Ruta (Activo)"}),c.jsx("option",{value:"inactive",children:"🟡 Descanso (Inactivo)"}),c.jsx("option",{value:"blocked",children:"🔴 Bloqueado (Sin Acceso)"})]})]})]}),c.jsxs("div",{className:"space-y-5",children:[c.jsxs("h4",{className:"text-[10px] font-black text-primary-500 uppercase tracking-widest flex items-center gap-2",children:[c.jsx(_c,{size:12})," Escalafón de Hoy"]}),c.jsx("div",{className:"bg-slate-50 rounded-[2rem] p-5 border border-slate-100 max-h-[300px] overflow-y-auto space-y-2 custom-scrollbar text-center",children:s.length>0?s.map(I=>c.jsxs("label",{className:"flex items-center gap-3 p-3.5 bg-white rounded-2xl border border-slate-100 hover:border-primary-500/40 cursor-pointer transition-all group",children:[c.jsx("input",{type:"checkbox",className:"w-5 h-5 rounded-lg border-slate-300 text-primary-500 focus:ring-primary-500/20 transition-all cursor-pointer",checked:l.includes(I.id),onChange:()=>p(I.id)}),c.jsxs("div",{className:"flex flex-col text-left",children:[c.jsx("span",{className:"text-xs font-black text-slate-800 leading-none",children:I.hora}),c.jsx("span",{className:"text-[9px] font-bold text-slate-400 uppercase mt-1 truncate max-w-[150px]",children:I.ruta})]})]},I.id)):c.jsxs("div",{className:"py-10 flex flex-col items-center gap-2 opacity-30",children:[c.jsx(hr,{className:"animate-spin",size:24}),c.jsx("p",{className:"text-[10px] font-bold uppercase italic",children:"Sincronizando horarios..."})]})})]})]}),c.jsxs("div",{className:"p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-3",children:[c.jsx(Ox,{className:"text-amber-500 shrink-0 mt-0.5",size:16}),c.jsx("p",{className:"text-[10px] text-amber-700 font-bold leading-relaxed uppercase",children:"Nota: La modificación de turnos es una acción de nivel administrador. Los cambios se reflejarán en la App del conductor inmediatamente."})]})]}),c.jsxs("div",{className:"p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between",children:[c.jsxs("button",{type:"button",disabled:r,onClick:E,className:"flex items-center gap-2 px-6 py-3.5 rounded-2xl text-red-500 hover:bg-red-50 transition-all font-black text-[10px] uppercase disabled:opacity-50 group",children:[c.jsx(kc,{size:16,className:"group-hover:scale-110 transition-transform"})," Eliminar"]}),c.jsxs("div",{className:"flex items-center gap-4",children:[c.jsx("button",{type:"button",onClick:e,className:"px-6 py-3.5 font-black text-[10px] text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors",children:"Cancelar"}),c.jsx("button",{onClick:g,disabled:r,className:"flex items-center gap-3 px-10 py-4 bg-primary-500 hover:bg-orange-600 text-white rounded-2xl shadow-xl shadow-primary-500/30 transition-all transform active:scale-95 font-black text-[10px] uppercase disabled:opacity-70",children:r?c.jsx(hr,{className:"animate-spin",size:18}):c.jsxs(c.Fragment,{children:[c.jsx(Ux,{size:18})," Guardar Cambios"]})})]})]})]})})}function vv({label:t,value:e,onChange:n}){return c.jsxs("div",{className:"space-y-1.5",children:[c.jsx("label",{className:"text-[10px] font-bold text-slate-400 uppercase tracking-tight ml-1",children:t}),c.jsx("input",{type:"text",required:!0,className:"w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all placeholder:opacity-30",value:e,onChange:r=>n(r.target.value)})]})}function t4({onClose:t,users:e,currentUser:n,role:r}){const[i,s]=$.useState(!1),[o,l]=$.useState(null),[u,h]=$.useState({email:"",placa:"",modelo:"",ano:new Date().getFullYear().toString(),capacidad:13,ownerId:(r==null?void 0:r.type)==="OWNER"?n.uid:""});$.useEffect(()=>{if(u.email.includes("@")){const p=e.find(g=>g.email.toLowerCase()===u.email.toLowerCase());l(p||null)}else l(null)},[u.email,e]);const m=async p=>{if(p.preventDefault(),!o){alert("⚠️ Error: El conductor debe registrarse primero en la App móvil con este correo.");return}s(!0);try{const g={id:o.id,nombre:o.nombre,email:o.email,telefono:o.telefono||"N/A",placaVehiculo:u.placa,vehiculoId:u.placa,horariosAsignados:[]},E={id:u.placa,placa:u.placa,modelo:u.modelo,ano:u.ano,capacidad:parseInt(u.capacidad),ownerId:u.ownerId,driverId:o.id};await ol.registerDriverAndVehicle(g,E),alert("✅ Conductor vinculado y vehículo registrado exitosamente."),t()}catch(g){alert("❌ Error: "+g.message)}finally{s(!1)}};return c.jsx("div",{className:"fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200",children:c.jsxs("div",{className:"bg-white w-full max-w-3xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]",children:[c.jsxs("div",{className:"p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50",children:[c.jsxs("div",{className:"flex items-center gap-4",children:[c.jsx("div",{className:"w-12 h-12 bg-primary-500 rounded-2xl flex items-center justify-center text-white shadow-lg",children:c.jsx(Ec,{size:24})}),c.jsxs("div",{children:[c.jsx("h3",{className:"text-2xl font-black text-slate-800 tracking-tight",children:"Vincular Operador"}),c.jsx("p",{className:"text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1",children:"Gestión de Flota por Email"})]})]}),c.jsx("button",{onClick:t,className:"p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-all",children:c.jsx(bc,{size:24})})]}),c.jsx("form",{onSubmit:m,className:"flex-1 overflow-y-auto p-8 space-y-8",children:c.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-10",children:[c.jsxs("div",{className:"space-y-6",children:[c.jsxs("h4",{className:"text-[11px] font-black text-primary-500 uppercase tracking-widest flex items-center gap-2",children:[c.jsx("div",{className:"w-1.5 h-4 bg-primary-500 rounded-full"})," 1. Buscar Conductor"]}),c.jsxs("div",{className:"space-y-2",children:[c.jsx(di,{label:"Correo Electrónico",placeholder:"conductor@gmail.com",type:"email",value:u.email,onChange:p=>h({...u,email:p}),required:!0}),c.jsxs("div",{className:`p-4 rounded-2xl border transition-all flex items-center gap-3 ${o?"bg-green-50 border-green-100 text-green-700":u.email.includes("@")?"bg-red-50 border-red-100 text-red-600":"bg-slate-50 border-slate-100 text-slate-400"}`,children:[o?c.jsx(dr,{size:18}):u.email.includes("@")?c.jsx(Ox,{size:18}):c.jsx(K2,{size:18}),c.jsxs("div",{className:"flex-1",children:[c.jsx("p",{className:"text-[10px] font-black uppercase tracking-tight",children:o?"Usuario Encontrado":u.email.includes("@")?"Usuario no registrado":"Esperando correo..."}),c.jsx("p",{className:"text-xs font-bold leading-none mt-1",children:o?o.nombre:u.email.includes("@")?"Dile que se registre en la App":"Escribe el email corporativo"})]})]})]}),o&&c.jsx("div",{className:"space-y-4 animate-in slide-in-from-top-2",children:c.jsxs("div",{className:"p-4 bg-slate-50 rounded-2xl border border-slate-100",children:[c.jsx("p",{className:"text-[10px] text-slate-400 font-black uppercase mb-1",children:"Teléfono Registrado"}),c.jsx("p",{className:"text-sm font-bold text-slate-700",children:o.telefono||"No proporcionado"})]})})]}),c.jsxs("div",{className:"space-y-6",children:[c.jsxs("h4",{className:"text-[11px] font-black text-secondary-900 uppercase tracking-widest flex items-center gap-2",children:[c.jsx("div",{className:"w-1.5 h-4 bg-secondary-900 rounded-full"})," 2. Datos del Bus"]}),c.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[c.jsx(di,{label:"Placa",placeholder:"ABC-123",value:u.placa,onChange:p=>h({...u,placa:p.toUpperCase()}),required:!0}),c.jsx(di,{label:"Año",type:"number",value:u.ano,onChange:p=>h({...u,ano:p}),required:!0})]}),c.jsx(di,{label:"Modelo",placeholder:"Ej: Nissan Frontier",value:u.modelo,onChange:p=>h({...u,modelo:p}),required:!0}),c.jsx(di,{label:"Capacidad",type:"number",value:u.capacidad,onChange:p=>h({...u,capacidad:p}),required:!0}),(r==null?void 0:r.type)==="ADMIN"&&c.jsx(di,{label:"ID del Dueño (Opcional)",placeholder:"UID del dueño",value:u.ownerId,onChange:p=>h({...u,ownerId:p})})]})]})}),c.jsxs("div",{className:"p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-4",children:[c.jsx("button",{type:"button",onClick:t,className:"px-8 py-4 font-black text-[10px] text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-all",children:"Cancelar"}),c.jsx("button",{onClick:m,disabled:i||!o,className:"flex items-center gap-3 px-12 py-4 bg-secondary-900 hover:bg-black text-white rounded-2xl shadow-xl transition-all transform active:scale-95 font-black text-[10px] uppercase disabled:opacity-30 disabled:cursor-not-allowed",children:i?c.jsx(hr,{className:"animate-spin",size:18}):c.jsxs(c.Fragment,{children:[c.jsx(Ux,{size:18})," Vincular Conductor"]})})]})]})})}function di({label:t,value:e,onChange:n,type:r="text",placeholder:i,required:s=!1}){return c.jsxs("div",{className:"space-y-1.5",children:[c.jsx("label",{className:"text-[10px] font-black text-slate-400 uppercase tracking-tight ml-1",children:t}),c.jsx("input",{type:r,required:s,placeholder:i,className:"w-full px-4 py-3.5 bg-white border border-slate-200 rounded-2xl font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all placeholder:opacity-40 text-sm",value:e,onChange:o=>n(o.target.value)})]})}function yv({user:t}){if(!t)return null;const e=t.solicitudBorrado===!0;return c.jsxs("div",{className:`card-base p-4 rounded-2xl flex gap-4 group ${e?"opacity-60 grayscale-[0.5]":""}`,children:[c.jsx("div",{className:`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${e?"bg-red-50 dark:bg-red-500/10 text-red-400":"bg-blue-50 dark:bg-blue-500/10 text-blue-500"}`,children:c.jsx(Sc,{size:22})}),c.jsxs("div",{className:"flex-1 min-w-0",children:[c.jsxs("div",{className:"flex items-center justify-between mb-1 gap-2",children:[c.jsx("h4",{className:"font-bold text-slate-800 dark:text-white text-sm truncate leading-tight uppercase italic",children:t.nombre||t.name||"Usuario sin nombre"}),e?c.jsxs("span",{className:"flex items-center gap-1 px-2 py-0.5 rounded-full badge-error text-[9px] font-black uppercase shrink-0",children:[c.jsx(kc,{size:10})," Borrado"]}):c.jsx("span",{className:"flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 text-[9px] font-black uppercase shrink-0",children:"Activo"})]}),c.jsxs("div",{className:"flex flex-col gap-1 mt-1",children:[c.jsxs("div",{className:"flex items-center gap-2 text-slate-500 dark:text-white/40 text-[11px]",children:[c.jsx(Go,{size:12,className:"text-slate-300 dark:text-white/20"}),c.jsx("span",{className:"truncate",children:t.email||"Sin correo"})]}),c.jsxs("div",{className:"flex items-center justify-between mt-1",children:[c.jsxs("div",{className:"flex items-center gap-2 text-slate-500 dark:text-white/40 text-[11px]",children:[c.jsx(Fx,{size:12,className:"text-slate-300 dark:text-white/20"}),c.jsx("span",{children:t.telefono||t.phone||"N/A"})]}),c.jsxs("div",{className:"flex items-center gap-1 px-2 py-0.5 bg-amber-50 dark:bg-amber-500/10 rounded-lg border border-amber-100 dark:border-amber-500/20 shadow-sm",children:[c.jsx(j2,{size:10,className:"text-amber-500"}),c.jsxs("span",{className:"text-[10px] font-bold text-amber-700 dark:text-amber-500",children:[t.puntosGo||0," pts"]})]})]})]})]})]})}function Ip({schedules:t,drivers:e,role:n,onManage:r}){const s=(()=>{const o=new Date,l=o.getHours()*60+o.getMinutes();let u=null,h=1/0;return t.forEach(m=>{const[p,g]=m.hora.split(" ");let[E,I]=p.split(":").map(Number);g==="PM"&&E<12&&(E+=12),g==="AM"&&E===12&&(E=0);const L=E*60+I-l;L>0&&L<h&&(h=L,u=m.id)}),u})();return c.jsx("div",{className:"space-y-4",children:t.length>0?t.map(o=>c.jsx(n4,{schedule:o,drivers:e,role:n,onManage:r,isNext:o.id===s},o.id)):c.jsxs("div",{className:"py-20 text-center space-y-4 opacity-30",children:[c.jsx(_c,{size:48,className:"mx-auto text-slate-400"}),c.jsx("p",{className:"font-black uppercase tracking-widest text-xs text-slate-500 dark:text-white",children:"Sin horarios disponibles"})]})})}function n4({schedule:t,drivers:e,role:n,onManage:r,isNext:i}){const[s,o]=t.hora.split(" "),l=t.asientosDisponibles||0,u=l===0&&(t.totalAsientos||0)>0,h=e.find(g=>g.id===t.conductorId),m=t.conductorId===(n==null?void 0:n.uid),p=(n==null?void 0:n.type)==="OWNER"&&!e.some(g=>g.id===t.conductorId);return c.jsxs("div",{className:`card-base rounded-[2.5rem] p-5 md:p-6 transition-all duration-500 group relative overflow-hidden ${i?"ring-2 ring-primary-500 shadow-orange-500/10":""}`,children:[i&&c.jsx("div",{className:"absolute top-0 right-0",children:c.jsx("div",{className:"bg-primary-500 text-white text-[8px] font-black uppercase px-4 py-1 rounded-bl-2xl shadow-lg animate-pulse",children:"Siguiente"})}),c.jsxs("div",{className:"flex items-center gap-6",children:[c.jsx("div",{className:"relative flex-shrink-0",children:c.jsxs("div",{className:`w-20 h-20 rounded-full border-4 flex flex-col items-center justify-center transition-colors duration-500 shadow-inner ${i?"border-primary-500 bg-primary-50 dark:bg-primary-500/10":"border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/5"}`,children:[c.jsx("span",{className:`text-lg font-black leading-none ${i?"text-primary-600 dark:text-primary-500":"text-slate-700 dark:text-white"}`,children:s}),c.jsx("span",{className:"text-[10px] font-black text-primary-500 uppercase mt-1",children:o})]})}),c.jsxs("div",{className:"flex-1 min-w-0 space-y-2",children:[c.jsx("h4",{className:"text-sm md:text-base font-black text-[#061426] dark:text-white tracking-tight truncate uppercase italic",children:t.ruta}),c.jsxs("div",{className:"space-y-1.5",children:[c.jsxs("div",{className:"flex items-center gap-2",children:[c.jsx(Xr,{size:14,className:"text-primary-500"}),c.jsx("span",{className:`text-[11px] font-bold uppercase tracking-tight ${u?"text-red-500":"text-slate-500 dark:text-[#B5C5CD]"}`,children:u?"Vehículo Lleno":`${l} disponibles`})]}),c.jsxs("div",{className:"flex items-center gap-2 text-primary-500 font-black",children:[c.jsx(Z2,{size:14}),c.jsx("span",{className:"text-xs tracking-tighter",children:"$ 12.000 COP"})]})]}),c.jsxs("div",{className:"flex items-center gap-3 pt-1",children:[c.jsx("span",{className:`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${u?"badge-error":"badge-success"}`,children:u?"Completado":"Disponible"}),!((n==null?void 0:n.type)==="OWNER"&&p)&&h&&c.jsxs("div",{className:"flex items-center gap-2 text-slate-400 dark:text-white/30 italic",children:[c.jsx(Sc,{size:12}),c.jsx("span",{className:"text-[10px] font-bold uppercase tracking-tighter truncate max-w-[100px]",children:m?"Tú manejas":h.nombre})]})]})]}),c.jsx("div",{className:"shrink-0",children:m&&r?c.jsx("button",{onClick:()=>r(t),className:"w-14 h-14 bg-primary-500 text-white rounded-full shadow-2xl shadow-primary-500/40 hover:bg-primary-600 transition-all transform active:scale-90 flex items-center justify-center group/btn",children:c.jsx(G2,{size:28,className:"group-hover/btn:rotate-90 transition-transform"})}):(n==null?void 0:n.type)==="PASSENGER"?c.jsxs("button",{onClick:()=>r&&r(t),className:"flex items-center gap-2 px-6 py-3 bg-white dark:bg-secondary-800 text-[#061426] dark:text-white border border-[#061426] dark:border-white/10 rounded-2xl shadow-xl hover:bg-primary-500 hover:text-white dark:hover:bg-black transition-all active:scale-95 font-black text-[10px] uppercase tracking-widest",children:["Reservar ",c.jsx(Wi,{size:14})]}):null})]})]})}function r4({schedule:t,onClose:e,role:n}){const[r,i]=$.useState(!0),[s,o]=$.useState({}),[l,u]=$.useState(!1),[h,m]=$.useState(null),[p,g]=$.useState(!1),E=(n==null?void 0:n.type)==="PASSENGER";$.useEffect(()=>{if(!(t!=null&&t.id))return;const N=be(Ne,`disponibilidadAsientos/${t.id}/asientosOcupados`),w=Vn(N,b=>{b.exists()?o(b.val()):o({}),i(!1)});return()=>w()},[t]);const I=async N=>{if(l)return;u(!0);const w=s[N]===!0,b=be(Ne,`disponibilidadAsientos/${t.id}`);try{await K0(b,j=>{if(j){j.asientosOcupados||(j.asientosOcupados={});const O=!w;j.asientosOcupados[N]=O;const U=j.asientosDisponibles||0;j.asientosDisponibles=O?Math.max(0,U-1):U+1}return j})}catch(j){console.error("Error toggling seat:",j)}finally{u(!1)}},P=async()=>{if(!h||l)return;u(!0);const N=be(Ne,`disponibilidadAsientos/${t.id}`);try{if((await K0(N,b=>{if(b){if(b.asientosOcupados||(b.asientosOcupados={}),b.asientosOcupados[h])return;b.asientosOcupados[h]=!0,b.asientosDisponibles=Math.max(0,(b.asientosDisponibles||0)-1)}return b})).committed){const b=YR(be(Ne,"reservas"));await Zl(b,{id:b.key,usuarioId:n.uid,conductorId:t.conductorId||"",vehiculoId:t.vehiculoId||"",asientoReservado:h,estadoReserva:"Confirmada",precio:12e3,reservationDate:Date.now(),travelDate:Date.now(),origen:t.ruta.split(" -> ")[0],destino:t.ruta.split(" -> ")[1],nombreUsuario:(n==null?void 0:n.name)||"Pasajero Web"}),g(!0)}}catch(w){console.error("Error en reserva pasajero:",w)}finally{u(!1)}},L=Array.from({length:16},(N,w)=>(w+1).toString());return p?c.jsxs("div",{className:"fixed inset-0 z-[110] flex items-center justify-center p-4",children:[c.jsx("div",{className:"absolute inset-0 bg-secondary-900/90 backdrop-blur-xl"}),c.jsxs("div",{className:"relative max-w-sm w-full bg-white rounded-[3rem] p-10 text-center space-y-8 animate-in zoom-in-95 duration-500",children:[c.jsx("div",{className:"w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center text-green-600 mx-auto animate-bounce",children:c.jsx(dr,{size:40})}),c.jsxs("div",{className:"space-y-2",children:[c.jsx("h2",{className:"text-2xl font-black text-slate-800 tracking-tight",children:"¡Reserva Exitosa!"}),c.jsxs("p",{className:"text-slate-500 text-sm font-medium",children:["Tu asiento #",h," ha sido bloqueado. Presenta tu tiquete digital al abordar."]})]}),c.jsx("button",{onClick:e,className:"w-full py-4 bg-secondary-900 text-white font-black rounded-2xl shadow-xl uppercase tracking-widest text-xs",children:"Ver mis viajes"})]})]}):c.jsxs("div",{className:"fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10",children:[c.jsx("div",{className:"absolute inset-0 bg-secondary-900/80 backdrop-blur-md",onClick:e}),c.jsxs("div",{className:"relative w-full max-w-2xl bg-white dark:bg-[#061929] rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh] border dark:border-white/5",children:[c.jsxs("div",{className:"p-8 border-b border-slate-100 dark:border-white/5 flex items-center justify-between shrink-0 bg-slate-50/50 dark:bg-white/5",children:[c.jsxs("div",{className:"flex items-center gap-4",children:[c.jsx("div",{className:`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${E?"bg-blue-600 shadow-blue-500/20":"bg-primary-500 shadow-primary-500/20"}`,children:E?c.jsx(wc,{size:24}):c.jsx(Xr,{size:24})}),c.jsxs("div",{children:[c.jsx("h3",{className:"text-xl font-black text-slate-800 dark:text-white uppercase tracking-tight",children:E?"Selecciona tu Asiento":"Venta Física de Pasajes"}),c.jsxs("p",{className:"text-[10px] text-slate-400 dark:text-white/40 font-bold uppercase tracking-widest",children:[t.hora," • ",t.ruta]})]})]}),c.jsx("button",{onClick:e,className:"p-3 text-slate-400 dark:text-white/20 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full transition-all",children:c.jsx(bc,{size:24})})]}),c.jsx("div",{className:"flex-1 overflow-y-auto p-8 space-y-8",children:c.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-10",children:[c.jsxs("div",{className:"space-y-6",children:[c.jsxs("div",{className:"flex items-center justify-between",children:[c.jsx("h4",{className:"text-xs font-black text-slate-400 dark:text-white/40 uppercase tracking-widest",children:"Esquema del Bus"}),c.jsxs("div",{className:"flex gap-4",children:[c.jsx(xv,{item:"Libre",color:"bg-green-100 dark:bg-green-500/20 border-green-200 dark:border-green-500/30"}),c.jsx(xv,{item:"Ocupado",color:"bg-orange-500 border-orange-600"})]})]}),c.jsx("div",{className:"bg-slate-50 dark:bg-black/20 rounded-[2.5rem] p-8 border border-slate-100 dark:border-white/5 relative",children:r?c.jsx("div",{className:"h-64 flex items-center justify-center",children:c.jsx(hr,{className:"animate-spin text-primary-500",size:32})}):c.jsxs("div",{className:"grid grid-cols-4 gap-4",children:[c.jsx("div",{className:"col-start-4 bg-slate-200/50 dark:bg-white/5 rounded-xl h-10 flex items-center justify-center text-slate-400 dark:text-white/20 mb-4",children:c.jsx("div",{className:"w-6 h-6 rounded-full border-4 border-slate-300 dark:border-white/10"})}),L.map(N=>{const w=s[N]===!0,b=h===N;return c.jsx("button",{disabled:l||E&&w,onClick:()=>E?m(N):I(N),className:`
                            h-12 rounded-xl border-b-4 font-black text-sm transition-all transform active:scale-90
                            ${w?"bg-primary-500 border-orange-700 text-white shadow-lg":b?"bg-blue-600 border-blue-800 text-white shadow-xl scale-105":"bg-white dark:bg-[#061426] border-slate-200 dark:border-white/10 text-slate-400 dark:text-white/20 hover:border-green-400 dark:hover:border-green-500 hover:text-green-500 dark:hover:text-green-400"}
                          `,children:N},N)})]})})]}),c.jsxs("div",{className:"space-y-6",children:[E?c.jsxs("div",{className:"bg-slate-50 dark:bg-white/5 rounded-[2.5rem] p-8 space-y-6 border dark:border-white/5",children:[c.jsxs("div",{className:"flex items-center gap-3",children:[c.jsx(Sc,{className:"text-primary-500",size:20}),c.jsx("h4",{className:"font-black uppercase text-sm tracking-tight text-slate-800 dark:text-white",children:"Tu Selección"})]}),h?c.jsxs("div",{className:"space-y-6",children:[c.jsxs("div",{className:"p-6 bg-white dark:bg-secondary-900 rounded-2xl border border-slate-200 dark:border-white/5 text-center shadow-sm",children:[c.jsx("p",{className:"text-[10px] text-slate-400 dark:text-white/40 uppercase font-black tracking-widest",children:"Asiento Seleccionado"}),c.jsxs("p",{className:"text-5xl font-black text-slate-800 dark:text-white mt-2",children:["#",h]})]}),c.jsxs("div",{className:"flex items-center justify-between",children:[c.jsx("span",{className:"text-xs font-bold text-slate-400 dark:text-white/40 uppercase",children:"Valor Pasaje:"}),c.jsx("span",{className:"text-lg font-black text-primary-500",children:"$ 12.000"})]}),c.jsx("button",{onClick:P,disabled:l,className:"w-full py-5 btn-primary rounded-2xl shadow-2xl flex items-center justify-center gap-3 uppercase text-xs tracking-widest",children:l?c.jsx(hr,{className:"animate-spin"}):"Confirmar Reserva"})]}):c.jsx("p",{className:"text-slate-400 dark:text-white/30 text-xs italic text-center py-10",children:"Toca un asiento disponible para continuar."})]}):c.jsxs("div",{className:"bg-secondary-900 rounded-[2.5rem] p-8 text-white space-y-4 border border-white/5",children:[c.jsxs("div",{className:"flex items-center gap-3",children:[c.jsx(Ec,{className:"text-primary-500",size:20}),c.jsx("h4",{className:"font-black uppercase text-sm tracking-tight",children:"Venta Manual"})]}),c.jsxs("ul",{className:"space-y-3",children:[c.jsx(_v,{text:"Toca para vender o liberar cupos."}),c.jsx(_v,{text:"Sincronización instantánea con la App."})]})]}),c.jsxs("div",{className:"p-6 bg-blue-50 dark:bg-blue-500/10 rounded-[2rem] border border-blue-100 dark:border-blue-500/20 flex items-start gap-4",children:[c.jsx(Cf,{className:"text-blue-500 shrink-0",size:20}),c.jsx("p",{className:"text-[11px] text-blue-800 dark:text-blue-200 font-medium leading-relaxed",children:E?"Al confirmar, tu reserva será visible para el conductor y se generará tu tiquete digital.":"Asegúrate de recibir el pago antes de marcar el asiento como vendido."})]})]})]})}),!E&&c.jsx("div",{className:"p-8 border-t border-slate-100 dark:border-white/5 flex justify-end shrink-0 bg-slate-50/50 dark:bg-white/5",children:c.jsx("button",{onClick:e,className:"px-10 py-4 bg-secondary-900 text-white font-black rounded-2xl shadow-xl uppercase tracking-widest text-xs hover:bg-black transition-all",children:"Finalizar Gestión"})})]})]})}function xv({item:t,color:e}){return c.jsxs("div",{className:"flex items-center gap-2",children:[c.jsx("div",{className:`w-3 h-3 rounded ${e} border`}),c.jsx("span",{className:"text-[9px] font-bold text-slate-400 uppercase tracking-tighter",children:t})]})}function _v({text:t}){return c.jsxs("li",{className:"flex gap-3 text-xs text-white/60 leading-relaxed font-medium",children:[c.jsx(dr,{className:"text-primary-500 shrink-0",size:14}),t]})}const i4=t=>{const[e,n]=$.useState({type:null,uid:null,ownedPlates:[]}),[r,i]=$.useState({totalUsers:0,activeDrivers:0,totalVehicles:0,totalOwners:0,todayReservations:0,totalRevenue:0,confirmedReservations:0,canceledReservations:0,totalUserReservations:0,loading:!0}),[s,o]=$.useState([]),[l,u]=$.useState([]),[h,m]=$.useState([]),[p,g]=$.useState([]),[E,I]=$.useState({toLaPlata:{reservations:0,seats:0},toNataga:{reservations:0,seats:0}});return $.useEffect(()=>{if(!t)return;let P=!0;const L=[],N=async()=>{try{const b=await hi(be(Ne,`admins/${t.uid}`));if(b.exists()&&b.val()===!0){P&&(n({type:"ADMIN",uid:t.uid,ownedPlates:[]}),w("ADMIN",[]));return}if((await hi(be(Ne,`dueños/${t.uid}`))).exists()){const x=await hi(be(Ne,"vehiculos"));let y=[];x.exists()&&(y=Object.entries(x.val()).filter(([_,S])=>S.ownerId===t.uid).map(([_,S])=>_)),P&&(n({type:"OWNER",uid:t.uid,ownedPlates:y}),w("OWNER",y));return}const O=await hi(be(Ne,`conductores/${t.uid}`));if(O.exists()){if(P){const x=O.val(),y=x.placaVehiculo||x.vehiculoId;n({type:"DRIVER",uid:t.uid,ownedPlates:y?[y]:[]}),w("DRIVER",y?[y]:[])}return}(await hi(be(Ne,`usuarios/${t.uid}`))).exists()?P&&(n({type:"PASSENGER",uid:t.uid,ownedPlates:[]}),w("PASSENGER",[])):P&&(n({type:null,uid:null,ownedPlates:[]}),i(x=>({...x,loading:!1})))}catch(b){console.error("Error resolviendo rol:",b),P&&i(j=>({...j,loading:!1}))}},w=(b,j)=>{const O=new Date,U=O.getTimezoneOffset()*6e4;if(new Date(O.getTime()-U).toISOString().split("T")[0],b==="ADMIN"){const C=Vn(be(Ne,"usuarios"),k=>{if(k.exists()){const K=Object.entries(k.val()).map(([fe,Je])=>({id:fe,...Je}));u(K),i(fe=>({...fe,totalUsers:K.filter(Je=>!Je.solicitudBorrado).length}))}});L.push(C);const T=Vn(be(Ne,"dueños"),k=>{if(k.exists()){const K=Object.keys(k.val()).length;i(fe=>({...fe,totalOwners:K}))}});L.push(T)}const x=Vn(be(Ne,"conductores"),C=>{if(C.exists()){const T=Object.entries(C.val()).map(([K,fe])=>({id:K,...fe})),k=b==="ADMIN"?T:b==="DRIVER"?T.filter(K=>K.id===t.uid):T.filter(K=>j.includes(K.placaVehiculo||K.vehiculoId));o(k),i(K=>({...K,activeDrivers:k.filter(fe=>fe.status==="active").length}))}});L.push(x);const y=Vn(be(Ne,"vehiculos"),C=>{if(C.exists()){const T=Object.entries(C.val()).map(([K,fe])=>({id:K,...fe})),k=b==="ADMIN"?T:T.filter(K=>K.ownerId===t.uid);i(K=>({...K,totalVehicles:k.length}))}});L.push(y);const _=Vn(be(Ne,"reservas"),C=>{let T=0,k=0,K=0,fe=0;const Je=[];C.exists()?(Object.entries(C.val()).forEach(([Pe,M])=>{const B=M.vehiculoId||M.vehiculoPlaca,q=b==="ADMIN"||j.includes(B),se=b==="DRIVER"&&M.conductorId===t.uid,Z=b==="PASSENGER"&&M.usuarioId===t.uid;if(q||se||Z){Je.push({id:Pe,...M});const oe=(M.estadoReserva||M.reservationStatus||"").toLowerCase();q&&(oe==="confirmada"||oe==="completada")&&(T+=Number(M.precio||M.price||0)),Z&&(fe++,oe==="confirmada"||oe==="completada"?k++:oe==="cancelada"&&K++)}}),P&&(g(Je),i(Pe=>({...Pe,totalRevenue:T,confirmedReservations:k,canceledReservations:K,totalUserReservations:fe,loading:!1})))):P&&(g([]),i(Pe=>({...Pe,loading:!1})))});L.push(_);const S=Vn(be(Ne,"horarios"),C=>{if(C.exists()){const T=Object.entries(C.val()).map(([M,B])=>({id:M,...B}));m(T);let k=0,K=0,fe=0,Je=0,Pe=0;T.forEach(M=>{const B=M.ruta.toLowerCase(),q=M.totalAsientos||0,se=M.asientosDisponibles||0,Z=Math.max(0,q-se),oe=b==="DRIVER"&&M.conductorId===t.uid;B.includes("la plata")?(k+=Z,K+=se):(B.includes("nátaga")||B.includes("nataga"))&&(fe+=Z,Je+=se),b==="DRIVER"?oe&&(Pe+=Z):Pe+=Z}),P&&(I({toLaPlata:{reservations:k,seats:K},toNataga:{reservations:fe,seats:Je}}),i(M=>({...M,todayReservations:Pe})))}});L.push(S)};return N(),()=>{P=!1,L.forEach(b=>b())}},[t]),{role:e,stats:r,drivers:s,users:l,schedules:h,reservations:p,routeStats:E}};function s4(){const[t,e]=$.useState(null),[n,r]=$.useState("landing"),[i,s]=$.useState("owner"),[o,l]=$.useState("overview"),[u,h]=$.useState(!0),[m,p]=$.useState(!1),[g,E]=$.useState(null),[I,P]=$.useState(!1),[L,N]=$.useState(null),[w,b]=$.useState(localStorage.getItem("theme")||"dark");$.useEffect(()=>{const T=jN(Uo,k=>{e(k),h(!1)});return()=>T()},[]),$.useEffect(()=>{w==="dark"?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark"),localStorage.setItem("theme",w)},[w]);const j=()=>b(T=>T==="dark"?"light":"dark"),{role:O,stats:U,drivers:x,users:y,schedules:_,reservations:S,routeStats:C}=i4(t);return u?c.jsxs("div",{className:"h-screen bg-[#061426] flex flex-col items-center justify-center gap-6",children:[c.jsxs("div",{className:"relative",children:[c.jsx("img",{src:"/assets/logo_icon.png",alt:"Ruta-Go",className:"w-16 h-16 object-contain animate-pulse"}),c.jsx(hr,{className:"text-primary-500 animate-spin absolute -bottom-2 -right-2",size:24})]}),c.jsx("p",{className:"text-white/40 text-[10px] font-black uppercase tracking-widest animate-pulse",children:"Autenticando..."})]}):t?c.jsxs("div",{className:"flex h-screen bg-slate-100 dark:bg-[#061426] text-[#061426] dark:text-white antialiased font-sans overflow-hidden transition-colors duration-300",children:[c.jsx(XA,{isOpen:m,onClose:()=>p(!1),activeTab:o,setActiveTab:l,role:O}),c.jsxs("main",{className:"flex-1 flex flex-col min-w-0 overflow-hidden relative",children:[c.jsx(ZA,{title:o==="overview"?O!=null&&O.type?O.type==="ADMIN"?"Panel Maestro":O.type==="OWNER"?"Dashboard Dueño":O.type==="DRIVER"?"Panel de Conductor":"Centro de Reservas":"Cargando...":o==="history"?"Historial de Reservas":o==="profile"?"Mi Perfil":o==="drivers"?"Conductores":o==="users"?"Pasajeros":o==="schedules"?"Planilla":o==="manual"?"Centro de Ayuda":"Dashboard",userEmail:t.email,onMenuClick:()=>p(!0),role:O,theme:w,onToggleTheme:j}),c.jsx("div",{className:"flex-1 overflow-y-auto p-4 lg:p-8 bg-slate-100 dark:bg-[#061426] transition-colors duration-300",children:o==="overview"?(O==null?void 0:O.type)==="PASSENGER"?c.jsx(o4,{stats:U,routeStats:C,schedules:_,drivers:x,role:O,user:t,onManage:T=>N(T)}):(O==null?void 0:O.type)==="DRIVER"?c.jsx(a4,{stats:U,routeStats:C,schedules:_,drivers:x,reservations:S,role:O,onManage:T=>N(T)}):c.jsx(l4,{stats:U,routeStats:C,role:O}):o==="history"?c.jsx(h4,{reservations:S,role:O}):o==="profile"?c.jsx(d4,{user:t,role:O}):o==="drivers"?c.jsx(u4,{drivers:x,onEditDriver:T=>E(T),onAddDriver:()=>P(!0)}):o==="users"?c.jsx(c4,{users:y}):o==="schedules"?c.jsx(f4,{schedules:_,drivers:x,role:O,onManage:T=>N(T)}):o==="manual"?c.jsx(mv,{role:O,isTab:!0}):null}),c.jsxs("div",{className:"lg:hidden h-20 bg-white dark:bg-[#061929] border-t border-slate-200 dark:border-white/5 flex items-center justify-around px-6 shrink-0 transition-colors duration-300 shadow-2xl",children:[c.jsx(ud,{icon:c.jsx(Lx,{size:22}),active:o==="overview",onClick:()=>l("overview")}),c.jsx(ud,{icon:c.jsx(Nf,{size:22}),active:o==="history",onClick:()=>l("history")}),c.jsx(ud,{icon:c.jsx(Ec,{size:22}),active:o==="profile",onClick:()=>l("profile")}),c.jsx("button",{onClick:()=>Uo.signOut(),className:"p-3 text-red-500 dark:text-red-400 opacity-80 hover:opacity-100 transition-opacity",children:c.jsx(Dx,{size:22})})]})]}),g&&c.jsx(e4,{driver:g,onClose:()=>E(null),onRefresh:()=>{}}),I&&c.jsx(t4,{onClose:()=>P(!1),users:y,currentUser:t,role:O}),L&&c.jsx(r4,{schedule:L,onClose:()=>N(null),role:O})]}):n==="login"?c.jsx(qA,{onBack:()=>r("landing"),onShowRegister:()=>{s("owner"),r("register")}}):n==="register"?c.jsx(KA,{onBack:()=>r("landing"),initialMode:i}):n==="terms"?c.jsx(YA,{onBack:()=>r("landing")}):n==="privacy"?c.jsx(QA,{onBack:()=>r("landing")}):n==="manual"?c.jsx(mv,{onBack:()=>r("landing")}):c.jsx(GA,{onLogin:()=>r("login"),onRegisterOwner:()=>{s("owner"),r("register")},onRegisterPassenger:()=>{s("passenger"),r("register")},onViewTerms:()=>r("terms"),onViewPrivacy:()=>r("privacy"),onViewManual:()=>r("manual")})}function ud({icon:t,active:e,onClick:n}){return c.jsx("button",{onClick:n,className:`p-4 transition-all ${e?"text-primary-500 scale-110 drop-shadow-sm":"text-slate-400 dark:text-white/20 hover:text-slate-600 dark:hover:text-white/40"}`,children:t})}function o4({stats:t,routeStats:e,schedules:n,drivers:r,role:i,user:s,onManage:o}){var g;const[l,u]=$.useState("toLaPlata"),h=n.filter(E=>E.ruta.toLowerCase().includes("nátaga -> la plata")||E.ruta.toLowerCase().includes("nátaga")&&E.ruta.toLowerCase().includes("plata")&&E.ruta.toLowerCase().indexOf("nátaga")<E.ruta.toLowerCase().indexOf("plata")),m=n.filter(E=>E.ruta.toLowerCase().includes("la plata -> nátaga")||E.ruta.toLowerCase().includes("plata")&&E.ruta.toLowerCase().includes("nátaga")&&E.ruta.toLowerCase().indexOf("plata")<E.ruta.toLowerCase().indexOf("nátaga")),p=l==="toLaPlata"?h:m;return c.jsxs("div",{className:"space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700",children:[c.jsxs("div",{className:"bg-primary-500 -mt-4 lg:-mt-8 -mx-4 lg:-mx-8 p-6 lg:p-10 pb-16 relative overflow-hidden shadow-2xl",children:[c.jsxs("div",{className:"max-w-4xl mx-auto flex items-center justify-between relative z-10",children:[c.jsxs("div",{className:"flex items-center gap-5",children:[c.jsx("div",{className:"w-16 h-16 lg:w-20 lg:h-20 bg-white/20 rounded-full border-2 border-white/30 p-1 flex items-center justify-center shadow-inner",children:c.jsx("div",{className:"w-full h-full bg-slate-200 rounded-full flex items-center justify-center text-[#061426] font-black text-xl lg:text-2xl shadow-sm",children:((g=i==null?void 0:i.uid)==null?void 0:g.substring(0,1).toUpperCase())||"P"})}),c.jsxs("div",{className:"text-white",children:[c.jsx("p",{className:"font-bold text-xs uppercase tracking-widest leading-none mb-1 opacity-80",children:"Welcome!"}),c.jsx("h2",{className:"text-xl lg:text-2xl font-black tracking-tight uppercase italic",children:(i==null?void 0:i.name)||"Pasajero Ruta-Go"})]})]}),c.jsx("div",{className:"px-4 py-1.5 bg-white/20 backdrop-blur-md text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl border border-white/10",children:"Pasajero Activo"})]}),c.jsx("div",{className:"max-w-4xl mx-auto mt-8",children:c.jsxs("div",{className:"card-base rounded-[2.5rem] p-6 lg:p-8 space-y-8",children:[c.jsxs("div",{className:"grid grid-cols-3 gap-4",children:[c.jsx(dd,{label:"Confirmadas",value:t.confirmedReservations,icon:c.jsx(dr,{size:16,className:"text-orange-500 mb-1"})}),c.jsx(dd,{label:"Canceladas",value:t.canceledReservations,icon:c.jsx(Dx,{size:16,className:"text-red-500 mb-1"})}),c.jsx(dd,{label:"Total",value:t.totalUserReservations,icon:c.jsx(dr,{size:16,className:"text-green-500 mb-1"})})]}),c.jsxs("div",{className:"pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-slate-400 dark:text-white/40 cursor-pointer hover:text-slate-600 dark:hover:text-white/60 transition-colors",children:[c.jsx("span",{className:"text-[10px] font-bold uppercase tracking-widest",children:"Significado de cada contador"}),c.jsx(L2,{size:14})]})]})})]}),c.jsxs("div",{className:"max-w-4xl mx-auto pt-4 space-y-12",children:[c.jsxs("div",{className:"space-y-6",children:[c.jsxs("div",{className:"flex items-center gap-3 px-2",children:[c.jsx(_c,{className:"text-primary-500",size:24}),c.jsx("h3",{className:"text-lg lg:text-xl font-black uppercase tracking-tight text-[#061426] dark:text-white italic",children:"Horarios disponibles"})]}),c.jsxs("div",{className:"flex bg-white dark:bg-[#061929] p-1 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm transition-colors duration-300",children:[c.jsx("button",{onClick:()=>u("toLaPlata"),className:`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl text-[10px] font-black uppercase transition-all ${l==="toLaPlata"?"bg-primary-500 text-white shadow-xl":"text-slate-400 dark:text-white/40 hover:text-slate-600 dark:hover:text-white"}`,children:"NATAGÁ -> LA PLATA"}),c.jsx("button",{onClick:()=>u("toNataga"),className:`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl text-[10px] font-black uppercase transition-all ${l==="toNataga"?"bg-primary-500 text-white shadow-xl":"text-slate-400 dark:text-white/40 hover:text-slate-600 dark:hover:text-white"}`,children:"LA PLATA -> NATAGÁ"})]})]}),c.jsx(Ip,{schedules:p,drivers:r,role:i,onManage:o}),c.jsxs("div",{className:"space-y-6",children:[c.jsxs("div",{className:"flex items-center gap-3 px-2",children:[c.jsx(bf,{className:"text-primary-500",size:18}),c.jsx("h3",{className:"text-sm font-black text-slate-400 dark:text-white/40 uppercase tracking-widest",children:"Estado por ruta"})]}),c.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4 px-2",children:[c.jsx(rc,{name:"Nátaga → La Plata",reservations:e.toLaPlata.reservations,available:e.toLaPlata.seats,color:"border-orange-500"}),c.jsx(rc,{name:"La Plata → Nátaga",reservations:e.toNataga.reservations,available:e.toNataga.seats,color:"border-secondary-400"})]})]}),c.jsxs("div",{className:"p-8 bg-white dark:bg-[#061929] rounded-[2.5rem] border border-slate-100 dark:border-white/5 flex flex-col md:flex-row items-center gap-6 shadow-sm mx-2 group",children:[c.jsx("div",{className:"w-16 h-16 bg-blue-500/10 dark:bg-blue-500/20 rounded-3xl flex items-center justify-center text-blue-500 shrink-0 group-hover:scale-110 transition-transform",children:c.jsx(Cf,{size:32})}),c.jsxs("div",{className:"text-center md:text-left space-y-1",children:[c.jsx("h4",{className:"text-lg font-black text-[#061426] dark:text-white uppercase leading-none italic",children:"Reserva Web en desarrollo"}),c.jsx("p",{className:"text-slate-500 dark:text-white/40 font-medium text-sm",children:"Estamos trabajando para habilitar el motor de reservas en iPhone muy pronto."})]})]})]})]})}function a4({stats:t,routeStats:e,schedules:n,drivers:r,reservations:i=[],role:s,onManage:o}){const l=r.find(E=>E.id===s.uid)||{},u=l.nombre||"Cargando...",h=l.placaVehiculo||l.vehiculoId||"---",m=n.filter(E=>E.conductorId===s.uid),p=i.filter(E=>E.estadoReserva==="Pendiente"||E.reservationStatus==="Pendiente"),g=E=>new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0}).format(E);return c.jsxs("div",{className:"space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700",children:[c.jsxs("div",{className:"bg-primary-500 -mt-4 lg:-mt-8 -mx-4 lg:-mx-8 p-6 lg:p-10 pb-16 relative overflow-hidden shadow-2xl",children:[c.jsxs("div",{className:"max-w-4xl mx-auto flex items-center justify-between relative z-10 text-white",children:[c.jsxs("div",{className:"flex items-center gap-5",children:[c.jsx("div",{className:"w-16 h-16 lg:w-20 lg:h-20 bg-white/20 rounded-full border-2 border-white/30 p-1 shadow-inner",children:c.jsx("div",{className:"w-full h-full bg-slate-200 rounded-full flex items-center justify-center font-black text-xl lg:text-2xl text-[#061426]",children:u.substring(0,1)})}),c.jsxs("div",{children:[c.jsx("h2",{className:"text-2xl lg:text-3xl font-black tracking-tight uppercase italic",children:u}),c.jsxs("p",{className:"text-white/80 font-bold text-sm uppercase tracking-wider",children:["Placa: ",h]})]})]}),c.jsx("div",{className:"px-4 py-1.5 bg-white/20 backdrop-blur-md text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl border border-white/10",children:"Conductor Activo"})]}),c.jsx("div",{className:"max-w-4xl mx-auto mt-8",children:c.jsxs("div",{className:"card-base rounded-[2.5rem] p-6 lg:p-8",children:[c.jsxs("div",{className:"flex items-center justify-between mb-6",children:[c.jsx("h4",{className:"text-[10px] lg:text-xs font-black text-primary-500 uppercase tracking-[0.2em]",children:"Resumen del día"}),c.jsx(bf,{size:16,className:"text-primary-500"})]}),c.jsxs("div",{className:"grid grid-cols-3 gap-4 text-center",children:[c.jsxs("div",{className:"space-y-1",children:[c.jsx("span",{className:"text-xl lg:text-2xl font-black text-green-500",children:(t==null?void 0:t.todayReservations)||0}),c.jsx("p",{className:"text-[9px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest",children:"Reservas"})]}),c.jsxs("div",{className:"space-y-1 border-x border-slate-100 dark:border-white/5",children:[c.jsx("span",{className:"text-xl lg:text-2xl font-black text-primary-500",children:l.asientosLibres||13}),c.jsx("p",{className:"text-[9px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest",children:"Libres"})]}),c.jsxs("div",{className:"space-y-1",children:[c.jsx("span",{className:"text-xl lg:text-2xl font-black text-amber-500",children:g((t==null?void 0:t.totalRevenue)||0)}),c.jsx("p",{className:"text-[9px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest",children:"Ingresos"})]})]})]})})]}),c.jsxs("div",{className:"max-w-4xl mx-auto space-y-12 pb-10",children:[c.jsxs("div",{className:"space-y-6",children:[c.jsxs("div",{className:"flex items-center justify-between px-2",children:[c.jsxs("div",{className:"flex items-center gap-3 text-[#061426] dark:text-white",children:[c.jsx(dr,{className:"text-primary-500",size:18}),c.jsx("h3",{className:"text-lg font-black uppercase tracking-tight leading-none italic",children:"Confirmar Reservas"})]}),c.jsx("span",{className:"bg-primary-500 text-white px-3 py-1 rounded-full text-[10px] font-black shadow-lg shadow-primary-500/20",children:p.length})]}),p.length>0?c.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4 px-2",children:p.map(E=>c.jsxs("div",{className:"card-base p-6 rounded-[2rem] flex items-center justify-between group",children:[c.jsxs("div",{className:"flex items-center gap-4 text-left",children:[c.jsx("div",{className:"w-12 h-12 bg-slate-50 dark:bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 dark:text-white/20 group-hover:text-primary-500 transition-colors",children:c.jsx(wc,{size:24})}),c.jsxs("div",{children:[c.jsxs("p",{className:"text-sm font-black text-[#061426] dark:text-white",children:["Asiento #",E.asientoReservado]}),c.jsxs("p",{className:"text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase",children:["Pasajero: ",E.nombreUsuario||"User"]})]})]}),c.jsx("button",{className:"px-6 py-2.5 bg-green-500 text-white text-[10px] font-black uppercase rounded-xl shadow-lg shadow-green-500/20 active:scale-95 transition-all",children:"Confirmar"})]},E.id))}):c.jsx("div",{className:"card-base p-12 rounded-[2.5rem] flex items-center justify-center text-center mx-2 opacity-60",children:c.jsx("p",{className:"text-slate-400 dark:text-white/40 text-xs font-bold uppercase italic tracking-widest",children:"Sin reservas activas"})})]}),c.jsxs("div",{className:"space-y-6",children:[c.jsxs("div",{className:"flex items-center gap-3 px-2 text-[#061426] dark:text-white",children:[c.jsx(No,{className:"text-primary-500",size:18}),c.jsx("h3",{className:"text-lg font-black uppercase tracking-tight italic",children:"Mi Itinerario"})]}),c.jsx(Ip,{schedules:m,drivers:r,role:s,onManage:o})]})]})]})}function dd({label:t,value:e,icon:n,color:r}){return c.jsxs("div",{className:"flex flex-col items-center text-center space-y-1",children:[n,c.jsx("span",{className:`text-xl lg:text-2xl font-black ${r}`,children:e}),c.jsx("span",{className:"text-[9px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-widest",children:t})]})}function l4({stats:t,routeStats:e,role:n}){const r=s=>new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0}).format(s),i=(n==null?void 0:n.type)==="ADMIN";return c.jsxs("div",{className:"space-y-10 animate-in fade-in duration-700",children:[c.jsxs("div",{className:`grid grid-cols-1 md:grid-cols-2 ${i?"lg:grid-cols-5":"lg:grid-cols-3"} gap-6`,children:[i&&c.jsxs(c.Fragment,{children:[c.jsx(Ls,{label:"Usuarios Activos",value:t.totalUsers,icon:c.jsx(zr,{className:"text-blue-500"})}),c.jsx(Ls,{label:"Dueños de Flota",value:t.totalOwners,icon:c.jsx(zr,{className:"text-amber-500"})})]}),c.jsx(Ls,{label:"En Turno",value:t.activeDrivers,icon:c.jsx(Xr,{className:"text-green-500"})}),c.jsx(Ls,{label:"Reservas Hoy",value:t.todayReservations,icon:c.jsx(No,{className:"text-purple-500"})}),c.jsx(Ls,{label:"Ingresos",value:r(t.totalRevenue),icon:c.jsx(bf,{className:"text-primary-500"})})]}),c.jsxs("div",{className:"space-y-6",children:[c.jsx("h3",{className:"font-black text-xl uppercase tracking-tighter ml-2 text-[#061426] dark:text-white italic",children:"Estado por ruta"}),c.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",children:[c.jsx(rc,{name:"Nátaga → La Plata",reservations:e.toLaPlata.reservations,available:e.toLaPlata.seats,color:"border-orange-500"}),c.jsx(rc,{name:"La Plata → Nátaga",reservations:e.toNataga.reservations,available:e.toNataga.seats,color:"border-secondary-400"})]})]})]})}function rc({name:t,reservations:e,available:n,color:r}){return c.jsxs("div",{className:`card-base p-6 rounded-[2.5rem] border-l-4 ${r} space-y-6 group hover:scale-[1.02] transition-transform`,children:[c.jsx("h4",{className:"text-[10px] font-black uppercase text-slate-400 dark:text-white/40 tracking-widest",children:t}),c.jsxs("div",{className:"flex items-center justify-around",children:[c.jsxs("div",{className:"text-center",children:[c.jsx("span",{className:"text-2xl font-black text-[#061426] dark:text-white",children:e}),c.jsx("p",{className:"text-[9px] font-bold text-slate-400 dark:text-white/20 uppercase",children:"Reservas"})]}),c.jsx("div",{className:"w-px h-8 bg-slate-100 dark:bg-white/5"}),c.jsxs("div",{className:"text-center",children:[c.jsx("span",{className:"text-2xl font-black text-green-500",children:n}),c.jsx("p",{className:"text-[9px] font-bold text-slate-400 dark:text-white/20 uppercase",children:"Libres"})]})]})]})}function c4({users:t=[]}){const e=t.filter(r=>!r.solicitudBorrado),n=t.filter(r=>r.solicitudBorrado===!0);return c.jsxs("div",{className:"space-y-12 pb-20 px-2",children:[c.jsxs("div",{className:"space-y-6",children:[c.jsxs("h3",{className:"text-xl font-black uppercase tracking-tighter ml-2 text-[#061426] dark:text-white italic",children:["Pasajeros Activos (",e.length,")"]}),c.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6",children:e.map(r=>c.jsx(yv,{user:r},r.id))})]}),n.length>0&&c.jsxs("div",{className:"space-y-6",children:[c.jsxs("h3",{className:"text-xl font-black uppercase tracking-tighter text-red-500 ml-2 italic",children:["Solicitudes de Borrado (",n.length,")"]}),c.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6",children:n.map(r=>c.jsx(yv,{user:r},r.id))})]})]})}function u4({drivers:t,onEditDriver:e,onAddDriver:n}){const r=t.filter(s=>{var o;return s.status==="active"&&((o=s.horariosAsignados)==null?void 0:o.length)>0}),i=t.filter(s=>{var o;return s.status!=="active"||!((o=s.horariosAsignados)!=null&&o.length)});return c.jsxs("div",{className:"space-y-10 pb-20 px-2",children:[c.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center justify-between card-base p-6 rounded-[2.5rem] gap-4",children:[c.jsx("h3",{className:"text-xl font-black uppercase tracking-tighter text-[#061426] dark:text-white italic",children:"Gestión de Operadores"}),c.jsx("button",{onClick:n,className:"px-6 py-4 bg-primary-500 text-white rounded-2xl font-black text-[10px] uppercase shadow-lg shadow-primary-500/20 active:scale-95 transition-all",children:"Registrar Conductor"})]}),c.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-10",children:[c.jsxs("div",{className:"space-y-6",children:[c.jsxs("h4",{className:"font-black uppercase text-xs text-green-500 ml-2 tracking-widest",children:["En Ruta (",r.length,")"]}),r.map(s=>c.jsx(gv,{driver:s,onEdit:e},s.id))]}),c.jsxs("div",{className:"space-y-6",children:[c.jsxs("h4",{className:"font-black uppercase text-xs text-slate-400 dark:text-white/20 ml-2 tracking-widest",children:["Fuera de Servicio (",i.length,")"]}),i.map(s=>c.jsx(gv,{driver:s,onEdit:e},s.id))]})]})]})}function d4({user:t,role:e}){var n;return c.jsxs("div",{className:"max-w-4xl mx-auto space-y-8 pb-20",children:[c.jsxs("div",{className:"card-base p-10 rounded-[3rem] flex flex-col md:flex-row items-center gap-10",children:[c.jsx("div",{className:"w-32 h-32 bg-slate-100 dark:bg-white/10 rounded-[3rem] flex items-center justify-center text-[#061426] dark:text-white font-black text-5xl shadow-2xl border-4 border-white/10",children:(n=t.email)==null?void 0:n.substring(0,1).toUpperCase()}),c.jsxs("div",{className:"text-center md:text-left space-y-4",children:[c.jsx("h2",{className:"text-4xl font-black tracking-tight text-[#061426] dark:text-white uppercase italic",children:t.displayName||"Usuario Ruta-Go"}),c.jsxs("div",{className:"flex flex-wrap justify-center md:justify-start gap-4",children:[c.jsxs("span",{className:"px-6 py-2 bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-white/60 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border border-slate-100 dark:border-white/5 shadow-sm",children:[c.jsx(Go,{size:14})," ",t.email]}),c.jsxs("span",{className:"px-6 py-2 bg-primary-500/10 text-primary-500 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border border-primary-500/20 shadow-sm",children:["Rango: ",e==null?void 0:e.type]})]})]})]}),c.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8 px-2 md:px-0",children:[c.jsxs("div",{className:"card-base p-8 rounded-[2.5rem] space-y-6",children:[c.jsxs("h3",{className:"font-black uppercase text-xs tracking-widest flex items-center gap-3 text-[#061426] dark:text-white",children:[c.jsx(Y2,{className:"text-primary-500",size:18})," Seguridad"]}),c.jsxs("button",{className:"w-full text-left p-6 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 rounded-[2rem] transition-all flex items-center justify-between group shadow-inner",children:[c.jsxs("div",{children:[c.jsx("p",{className:"text-sm font-black text-[#061426] dark:text-white",children:"Cambiar Contraseña"}),c.jsx("p",{className:"text-[10px] text-slate-400 dark:text-white/40 uppercase font-bold tracking-tighter",children:"Actualiza tus credenciales"})]}),c.jsx(Wi,{size:18,className:"text-slate-300 dark:text-white/20 group-hover:text-primary-500"})]})]}),c.jsxs("div",{className:"bg-red-50 dark:bg-red-500/5 p-8 rounded-[2.5rem] border border-red-100 dark:border-red-500/10 space-y-6 text-center md:text-left",children:[c.jsx("h3",{className:"font-black text-red-600 dark:text-red-500 uppercase text-xs tracking-widest",children:"Borrar Cuenta"}),c.jsx("p",{className:"text-[11px] text-red-700/60 dark:text-red-500/40 font-medium",children:"Todos tus datos entrarán en periodo de gracia de 30 días."}),c.jsx("button",{className:"w-full py-5 bg-red-100 dark:bg-red-500/10 border-2 border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-500 font-black rounded-[2rem] text-[10px] uppercase hover:bg-red-600 dark:hover:bg-red-500 hover:text-white transition-all shadow-sm",children:"Eliminar permanentemente"})]})]})]})}function h4({reservations:t,role:e}){const n=t.sort((r,i)=>(i.reservationDate||0)-(r.reservationDate||0));return c.jsxs("div",{className:"space-y-10 pb-20 px-2",children:[c.jsxs("div",{className:"flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-6",children:[c.jsx("h3",{className:"text-2xl font-black uppercase tracking-tighter text-[#061426] dark:text-white italic",children:"Historial de Reservas"}),c.jsxs("span",{className:"px-4 py-1.5 bg-white dark:bg-white/5 text-slate-400 dark:text-white/40 rounded-full text-[10px] font-black uppercase shadow-sm border border-slate-100 dark:border-none",children:[n.length," Registros"]})]}),n.length>0?c.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:n.map(r=>c.jsxs("div",{className:"card-base p-8 rounded-[2.5rem] hover:ring-2 ring-primary-500/30 group relative overflow-hidden",children:[c.jsxs("div",{className:"flex items-center justify-between mb-8",children:[c.jsx("div",{className:"p-4 bg-slate-50 dark:bg-white/5 rounded-2xl text-slate-300 dark:text-white/20 group-hover:text-primary-500 transition-colors shadow-inner",children:c.jsx(wc,{size:28})}),c.jsx("span",{className:`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${(r.estadoReserva||r.reservationStatus)==="Confirmada"?"badge-success":"badge-error"}`,children:r.estadoReserva||r.reservationStatus})]}),c.jsxs("div",{className:"space-y-6",children:[c.jsxs("div",{children:[c.jsx("p",{className:"text-[10px] text-slate-400 dark:text-white/20 font-black uppercase tracking-widest mb-1",children:"Ruta"}),c.jsxs("p",{className:"text-lg font-black text-[#061426] dark:text-white italic truncate",children:[r.origen||"La Plata"," ➔ ",r.destino||"Nátaga"]})]}),c.jsxs("div",{className:"grid grid-cols-2",children:[c.jsxs("div",{children:[c.jsx("p",{className:"text-[10px] text-slate-400 dark:text-white/20 font-black uppercase tracking-widest mb-1",children:"Asiento"}),c.jsxs("p",{className:"text-xl font-black text-[#061426] dark:text-white",children:["#",r.asientoReservado]})]}),c.jsxs("div",{className:"text-right",children:[c.jsx("p",{className:"text-[10px] text-slate-400 dark:text-white/20 font-black uppercase tracking-widest mb-1",children:"Fecha"}),c.jsx("p",{className:"text-sm font-black text-[#061426] dark:text-white",children:r.travelDate?new Date(r.travelDate).toLocaleDateString():"--/--/--"})]})]})]})]},r.id))}):c.jsxs("div",{className:"h-96 flex flex-col items-center justify-center text-slate-300 dark:text-white/10 italic",children:[c.jsx(Nf,{size:64,className:"mb-4 opacity-50"}),c.jsx("p",{children:"No hay actividad registrada"})]})]})}function f4({schedules:t,drivers:e,role:n,onManage:r}){const[i,s]=$.useState("toLaPlata"),o=t.filter(h=>h.ruta.toLowerCase().includes("nátaga -> la plata")||h.ruta.toLowerCase().includes("nátaga")&&h.ruta.toLowerCase().includes("plata")&&h.ruta.toLowerCase().indexOf("nátaga")<h.ruta.toLowerCase().indexOf("plata")),l=t.filter(h=>h.ruta.toLowerCase().includes("la plata -> nátaga")||h.ruta.toLowerCase().includes("plata")&&h.ruta.toLowerCase().includes("nátaga")&&h.ruta.toLowerCase().indexOf("plata")<h.ruta.toLowerCase().indexOf("nátaga")),u=i==="toLaPlata"?o:l;return c.jsxs("div",{className:"space-y-10 pb-20",children:[c.jsxs("div",{className:"flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 dark:border-white/5 pb-8 px-2",children:[c.jsxs("div",{className:"flex items-center gap-4",children:[c.jsx("div",{className:"p-3 bg-primary-500/10 rounded-2xl text-primary-500 shadow-sm",children:c.jsx(_c,{size:28})}),c.jsx("h3",{className:"text-2xl font-black uppercase tracking-tighter text-[#061426] dark:text-white italic",children:"Planilla de Despachos"})]}),c.jsxs("div",{className:"flex bg-white dark:bg-[#061929] p-1 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm transition-colors",children:[c.jsx("button",{onClick:()=>s("toLaPlata"),className:`px-8 py-4 rounded-xl text-[10px] font-black uppercase transition-all ${i==="toLaPlata"?"bg-primary-500 text-white shadow-2xl":"text-slate-400 dark:text-white/40 hover:text-slate-600"}`,children:"Nátaga ➔ LP"}),c.jsx("button",{onClick:()=>s("toNataga"),className:`px-8 py-4 rounded-xl text-[10px] font-black uppercase transition-all ${i==="toNataga"?"bg-primary-500 text-white shadow-2xl":"text-slate-400 dark:text-white/40 hover:text-slate-600"}`,children:"LP ➔ Nátaga"})]})]}),c.jsx("div",{className:"px-2",children:c.jsx(Ip,{schedules:u,drivers:e,role:n,onManage:r})})]})}hd.createRoot(document.getElementById("root")).render(c.jsx(yk.StrictMode,{children:c.jsx(s4,{})}));
