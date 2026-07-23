(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();function J1(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var mv={exports:{}},tc={},gv={exports:{}},J={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Mo=Symbol.for("react.element"),Z1=Symbol.for("react.portal"),eE=Symbol.for("react.fragment"),tE=Symbol.for("react.strict_mode"),nE=Symbol.for("react.profiler"),rE=Symbol.for("react.provider"),sE=Symbol.for("react.context"),iE=Symbol.for("react.forward_ref"),oE=Symbol.for("react.suspense"),aE=Symbol.for("react.memo"),lE=Symbol.for("react.lazy"),Sm=Symbol.iterator;function cE(t){return t===null||typeof t!="object"?null:(t=Sm&&t[Sm]||t["@@iterator"],typeof t=="function"?t:null)}var vv={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},yv=Object.assign,_v={};function Zs(t,e,n){this.props=t,this.context=e,this.refs=_v,this.updater=n||vv}Zs.prototype.isReactComponent={};Zs.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Zs.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function xv(){}xv.prototype=Zs.prototype;function Ih(t,e,n){this.props=t,this.context=e,this.refs=_v,this.updater=n||vv}var Th=Ih.prototype=new xv;Th.constructor=Ih;yv(Th,Zs.prototype);Th.isPureReactComponent=!0;var Nm=Array.isArray,wv=Object.prototype.hasOwnProperty,bh={current:null},Ev={key:!0,ref:!0,__self:!0,__source:!0};function kv(t,e,n){var r,s={},i=null,o=null;if(e!=null)for(r in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(i=""+e.key),e)wv.call(e,r)&&!Ev.hasOwnProperty(r)&&(s[r]=e[r]);var l=arguments.length-2;if(l===1)s.children=n;else if(1<l){for(var u=Array(l),h=0;h<l;h++)u[h]=arguments[h+2];s.children=u}if(t&&t.defaultProps)for(r in l=t.defaultProps,l)s[r]===void 0&&(s[r]=l[r]);return{$$typeof:Mo,type:t,key:i,ref:o,props:s,_owner:bh.current}}function uE(t,e){return{$$typeof:Mo,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function Rh(t){return typeof t=="object"&&t!==null&&t.$$typeof===Mo}function dE(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Cm=/\/+/g;function mu(t,e){return typeof t=="object"&&t!==null&&t.key!=null?dE(""+t.key):e.toString(36)}function Va(t,e,n,r,s){var i=typeof t;(i==="undefined"||i==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(i){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case Mo:case Z1:o=!0}}if(o)return o=t,s=s(o),t=r===""?"."+mu(o,0):r,Nm(s)?(n="",t!=null&&(n=t.replace(Cm,"$&/")+"/"),Va(s,e,n,"",function(h){return h})):s!=null&&(Rh(s)&&(s=uE(s,n+(!s.key||o&&o.key===s.key?"":(""+s.key).replace(Cm,"$&/")+"/")+t)),e.push(s)),1;if(o=0,r=r===""?".":r+":",Nm(t))for(var l=0;l<t.length;l++){i=t[l];var u=r+mu(i,l);o+=Va(i,e,n,u,s)}else if(u=cE(t),typeof u=="function")for(t=u.call(t),l=0;!(i=t.next()).done;)i=i.value,u=r+mu(i,l++),o+=Va(i,e,n,u,s);else if(i==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function ya(t,e,n){if(t==null)return t;var r=[],s=0;return Va(t,r,"","",function(i){return e.call(n,i,s++)}),r}function hE(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var at={current:null},$a={transition:null},fE={ReactCurrentDispatcher:at,ReactCurrentBatchConfig:$a,ReactCurrentOwner:bh};function Sv(){throw Error("act(...) is not supported in production builds of React.")}J.Children={map:ya,forEach:function(t,e,n){ya(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return ya(t,function(){e++}),e},toArray:function(t){return ya(t,function(e){return e})||[]},only:function(t){if(!Rh(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};J.Component=Zs;J.Fragment=eE;J.Profiler=nE;J.PureComponent=Ih;J.StrictMode=tE;J.Suspense=oE;J.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=fE;J.act=Sv;J.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var r=yv({},t.props),s=t.key,i=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(i=e.ref,o=bh.current),e.key!==void 0&&(s=""+e.key),t.type&&t.type.defaultProps)var l=t.type.defaultProps;for(u in e)wv.call(e,u)&&!Ev.hasOwnProperty(u)&&(r[u]=e[u]===void 0&&l!==void 0?l[u]:e[u])}var u=arguments.length-2;if(u===1)r.children=n;else if(1<u){l=Array(u);for(var h=0;h<u;h++)l[h]=arguments[h+2];r.children=l}return{$$typeof:Mo,type:t.type,key:s,ref:i,props:r,_owner:o}};J.createContext=function(t){return t={$$typeof:sE,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:rE,_context:t},t.Consumer=t};J.createElement=kv;J.createFactory=function(t){var e=kv.bind(null,t);return e.type=t,e};J.createRef=function(){return{current:null}};J.forwardRef=function(t){return{$$typeof:iE,render:t}};J.isValidElement=Rh;J.lazy=function(t){return{$$typeof:lE,_payload:{_status:-1,_result:t},_init:hE}};J.memo=function(t,e){return{$$typeof:aE,type:t,compare:e===void 0?null:e}};J.startTransition=function(t){var e=$a.transition;$a.transition={};try{t()}finally{$a.transition=e}};J.unstable_act=Sv;J.useCallback=function(t,e){return at.current.useCallback(t,e)};J.useContext=function(t){return at.current.useContext(t)};J.useDebugValue=function(){};J.useDeferredValue=function(t){return at.current.useDeferredValue(t)};J.useEffect=function(t,e){return at.current.useEffect(t,e)};J.useId=function(){return at.current.useId()};J.useImperativeHandle=function(t,e,n){return at.current.useImperativeHandle(t,e,n)};J.useInsertionEffect=function(t,e){return at.current.useInsertionEffect(t,e)};J.useLayoutEffect=function(t,e){return at.current.useLayoutEffect(t,e)};J.useMemo=function(t,e){return at.current.useMemo(t,e)};J.useReducer=function(t,e,n){return at.current.useReducer(t,e,n)};J.useRef=function(t){return at.current.useRef(t)};J.useState=function(t){return at.current.useState(t)};J.useSyncExternalStore=function(t,e,n){return at.current.useSyncExternalStore(t,e,n)};J.useTransition=function(){return at.current.useTransition()};J.version="18.3.1";gv.exports=J;var $=gv.exports;const pE=J1($);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var mE=$,gE=Symbol.for("react.element"),vE=Symbol.for("react.fragment"),yE=Object.prototype.hasOwnProperty,_E=mE.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,xE={key:!0,ref:!0,__self:!0,__source:!0};function Nv(t,e,n){var r,s={},i=null,o=null;n!==void 0&&(i=""+n),e.key!==void 0&&(i=""+e.key),e.ref!==void 0&&(o=e.ref);for(r in e)yE.call(e,r)&&!xE.hasOwnProperty(r)&&(s[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)s[r]===void 0&&(s[r]=e[r]);return{$$typeof:gE,type:t,key:i,ref:o,props:s,_owner:_E.current}}tc.Fragment=vE;tc.jsx=Nv;tc.jsxs=Nv;mv.exports=tc;var c=mv.exports,ld={},Cv={exports:{}},Nt={},Iv={exports:{}},Tv={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(L,B){var G=L.length;L.push(B);e:for(;0<G;){var ie=G-1>>>1,Z=L[ie];if(0<s(Z,B))L[ie]=B,L[G]=Z,G=ie;else break e}}function n(L){return L.length===0?null:L[0]}function r(L){if(L.length===0)return null;var B=L[0],G=L.pop();if(G!==B){L[0]=G;e:for(var ie=0,Z=L.length,oe=Z>>>1;ie<oe;){var ln=2*(ie+1)-1,cn=L[ln],un=ln+1,dn=L[un];if(0>s(cn,G))un<Z&&0>s(dn,cn)?(L[ie]=dn,L[un]=G,ie=un):(L[ie]=cn,L[ln]=G,ie=ln);else if(un<Z&&0>s(dn,G))L[ie]=dn,L[un]=G,ie=un;else break e}}return B}function s(L,B){var G=L.sortIndex-B.sortIndex;return G!==0?G:L.id-B.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;t.unstable_now=function(){return i.now()}}else{var o=Date,l=o.now();t.unstable_now=function(){return o.now()-l}}var u=[],h=[],m=1,p=null,v=3,S=!1,I=!1,P=!1,D=typeof setTimeout=="function"?setTimeout:null,T=typeof clearTimeout=="function"?clearTimeout:null,x=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function N(L){for(var B=n(h);B!==null;){if(B.callback===null)r(h);else if(B.startTime<=L)r(h),B.sortIndex=B.expirationTime,e(u,B);else break;B=n(h)}}function j(L){if(P=!1,N(L),!I)if(n(u)!==null)I=!0,Je(M);else{var B=n(h);B!==null&&Te(j,B.startTime-L)}}function M(L,B){I=!1,P&&(P=!1,T(y),y=-1),S=!0;var G=v;try{for(N(B),p=n(u);p!==null&&(!(p.expirationTime>B)||L&&!C());){var ie=p.callback;if(typeof ie=="function"){p.callback=null,v=p.priorityLevel;var Z=ie(p.expirationTime<=B);B=t.unstable_now(),typeof Z=="function"?p.callback=Z:p===n(u)&&r(u),N(B)}else r(u);p=n(u)}if(p!==null)var oe=!0;else{var ln=n(h);ln!==null&&Te(j,ln.startTime-B),oe=!1}return oe}finally{p=null,v=G,S=!1}}var U=!1,w=null,y=-1,_=5,k=-1;function C(){return!(t.unstable_now()-k<_)}function b(){if(w!==null){var L=t.unstable_now();k=L;var B=!0;try{B=w(!0,L)}finally{B?E():(U=!1,w=null)}}else U=!1}var E;if(typeof x=="function")E=function(){x(b)};else if(typeof MessageChannel<"u"){var K=new MessageChannel,fe=K.port2;K.port1.onmessage=b,E=function(){fe.postMessage(null)}}else E=function(){D(b,0)};function Je(L){w=L,U||(U=!0,E())}function Te(L,B){y=D(function(){L(t.unstable_now())},B)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(L){L.callback=null},t.unstable_continueExecution=function(){I||S||(I=!0,Je(M))},t.unstable_forceFrameRate=function(L){0>L||125<L?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):_=0<L?Math.floor(1e3/L):5},t.unstable_getCurrentPriorityLevel=function(){return v},t.unstable_getFirstCallbackNode=function(){return n(u)},t.unstable_next=function(L){switch(v){case 1:case 2:case 3:var B=3;break;default:B=v}var G=v;v=B;try{return L()}finally{v=G}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(L,B){switch(L){case 1:case 2:case 3:case 4:case 5:break;default:L=3}var G=v;v=L;try{return B()}finally{v=G}},t.unstable_scheduleCallback=function(L,B,G){var ie=t.unstable_now();switch(typeof G=="object"&&G!==null?(G=G.delay,G=typeof G=="number"&&0<G?ie+G:ie):G=ie,L){case 1:var Z=-1;break;case 2:Z=250;break;case 5:Z=1073741823;break;case 4:Z=1e4;break;default:Z=5e3}return Z=G+Z,L={id:m++,callback:B,priorityLevel:L,startTime:G,expirationTime:Z,sortIndex:-1},G>ie?(L.sortIndex=G,e(h,L),n(u)===null&&L===n(h)&&(P?(T(y),y=-1):P=!0,Te(j,G-ie))):(L.sortIndex=Z,e(u,L),I||S||(I=!0,Je(M))),L},t.unstable_shouldYield=C,t.unstable_wrapCallback=function(L){var B=v;return function(){var G=v;v=B;try{return L.apply(this,arguments)}finally{v=G}}}})(Tv);Iv.exports=Tv;var wE=Iv.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var EE=$,kt=wE;function O(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var bv=new Set,io={};function Yr(t,e){Fs(t,e),Fs(t+"Capture",e)}function Fs(t,e){for(io[t]=e,t=0;t<e.length;t++)bv.add(e[t])}var Nn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),cd=Object.prototype.hasOwnProperty,kE=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Im={},Tm={};function SE(t){return cd.call(Tm,t)?!0:cd.call(Im,t)?!1:kE.test(t)?Tm[t]=!0:(Im[t]=!0,!1)}function NE(t,e,n,r){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function CE(t,e,n,r){if(e===null||typeof e>"u"||NE(t,e,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function lt(t,e,n,r,s,i,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=r,this.attributeNamespace=s,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=i,this.removeEmptyString=o}var Be={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){Be[t]=new lt(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];Be[e]=new lt(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){Be[t]=new lt(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){Be[t]=new lt(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){Be[t]=new lt(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){Be[t]=new lt(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){Be[t]=new lt(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){Be[t]=new lt(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){Be[t]=new lt(t,5,!1,t.toLowerCase(),null,!1,!1)});var Ph=/[\-:]([a-z])/g;function Ah(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Ph,Ah);Be[e]=new lt(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Ph,Ah);Be[e]=new lt(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Ph,Ah);Be[e]=new lt(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){Be[t]=new lt(t,1,!1,t.toLowerCase(),null,!1,!1)});Be.xlinkHref=new lt("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){Be[t]=new lt(t,1,!1,t.toLowerCase(),null,!0,!0)});function jh(t,e,n,r){var s=Be.hasOwnProperty(e)?Be[e]:null;(s!==null?s.type!==0:r||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(CE(e,n,s,r)&&(n=null),r||s===null?SE(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):s.mustUseProperty?t[s.propertyName]=n===null?s.type===3?!1:"":n:(e=s.attributeName,r=s.attributeNamespace,n===null?t.removeAttribute(e):(s=s.type,n=s===3||s===4&&n===!0?"":""+n,r?t.setAttributeNS(r,e,n):t.setAttribute(e,n))))}var jn=EE.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,_a=Symbol.for("react.element"),fs=Symbol.for("react.portal"),ps=Symbol.for("react.fragment"),Oh=Symbol.for("react.strict_mode"),ud=Symbol.for("react.profiler"),Rv=Symbol.for("react.provider"),Pv=Symbol.for("react.context"),Dh=Symbol.for("react.forward_ref"),dd=Symbol.for("react.suspense"),hd=Symbol.for("react.suspense_list"),Lh=Symbol.for("react.memo"),zn=Symbol.for("react.lazy"),Av=Symbol.for("react.offscreen"),bm=Symbol.iterator;function Ei(t){return t===null||typeof t!="object"?null:(t=bm&&t[bm]||t["@@iterator"],typeof t=="function"?t:null)}var we=Object.assign,gu;function Di(t){if(gu===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);gu=e&&e[1]||""}return`
`+gu+t}var vu=!1;function yu(t,e){if(!t||vu)return"";vu=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(h){var r=h}Reflect.construct(t,[],e)}else{try{e.call()}catch(h){r=h}t.call(e.prototype)}else{try{throw Error()}catch(h){r=h}t()}}catch(h){if(h&&r&&typeof h.stack=="string"){for(var s=h.stack.split(`
`),i=r.stack.split(`
`),o=s.length-1,l=i.length-1;1<=o&&0<=l&&s[o]!==i[l];)l--;for(;1<=o&&0<=l;o--,l--)if(s[o]!==i[l]){if(o!==1||l!==1)do if(o--,l--,0>l||s[o]!==i[l]){var u=`
`+s[o].replace(" at new "," at ");return t.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",t.displayName)),u}while(1<=o&&0<=l);break}}}finally{vu=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?Di(t):""}function IE(t){switch(t.tag){case 5:return Di(t.type);case 16:return Di("Lazy");case 13:return Di("Suspense");case 19:return Di("SuspenseList");case 0:case 2:case 15:return t=yu(t.type,!1),t;case 11:return t=yu(t.type.render,!1),t;case 1:return t=yu(t.type,!0),t;default:return""}}function fd(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case ps:return"Fragment";case fs:return"Portal";case ud:return"Profiler";case Oh:return"StrictMode";case dd:return"Suspense";case hd:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case Pv:return(t.displayName||"Context")+".Consumer";case Rv:return(t._context.displayName||"Context")+".Provider";case Dh:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Lh:return e=t.displayName||null,e!==null?e:fd(t.type)||"Memo";case zn:e=t._payload,t=t._init;try{return fd(t(e))}catch{}}return null}function TE(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return fd(e);case 8:return e===Oh?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function ur(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function jv(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function bE(t){var e=jv(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),r=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var s=n.get,i=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return s.call(this)},set:function(o){r=""+o,i.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function xa(t){t._valueTracker||(t._valueTracker=bE(t))}function Ov(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),r="";return t&&(r=jv(t)?t.checked?"true":"false":t.value),t=r,t!==n?(e.setValue(t),!0):!1}function il(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function pd(t,e){var n=e.checked;return we({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function Rm(t,e){var n=e.defaultValue==null?"":e.defaultValue,r=e.checked!=null?e.checked:e.defaultChecked;n=ur(e.value!=null?e.value:n),t._wrapperState={initialChecked:r,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function Dv(t,e){e=e.checked,e!=null&&jh(t,"checked",e,!1)}function md(t,e){Dv(t,e);var n=ur(e.value),r=e.type;if(n!=null)r==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(r==="submit"||r==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?gd(t,e.type,n):e.hasOwnProperty("defaultValue")&&gd(t,e.type,ur(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function Pm(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var r=e.type;if(!(r!=="submit"&&r!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function gd(t,e,n){(e!=="number"||il(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var Li=Array.isArray;function Is(t,e,n,r){if(t=t.options,e){e={};for(var s=0;s<n.length;s++)e["$"+n[s]]=!0;for(n=0;n<t.length;n++)s=e.hasOwnProperty("$"+t[n].value),t[n].selected!==s&&(t[n].selected=s),s&&r&&(t[n].defaultSelected=!0)}else{for(n=""+ur(n),e=null,s=0;s<t.length;s++){if(t[s].value===n){t[s].selected=!0,r&&(t[s].defaultSelected=!0);return}e!==null||t[s].disabled||(e=t[s])}e!==null&&(e.selected=!0)}}function vd(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(O(91));return we({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function Am(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(O(92));if(Li(n)){if(1<n.length)throw Error(O(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:ur(n)}}function Lv(t,e){var n=ur(e.value),r=ur(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),r!=null&&(t.defaultValue=""+r)}function jm(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function Mv(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function yd(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?Mv(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var wa,Fv=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,r,s){MSApp.execUnsafeLocalFunction(function(){return t(e,n,r,s)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(wa=wa||document.createElement("div"),wa.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=wa.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function oo(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var Vi={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},RE=["Webkit","ms","Moz","O"];Object.keys(Vi).forEach(function(t){RE.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),Vi[e]=Vi[t]})});function Uv(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||Vi.hasOwnProperty(t)&&Vi[t]?(""+e).trim():e+"px"}function zv(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var r=n.indexOf("--")===0,s=Uv(n,e[n],r);n==="float"&&(n="cssFloat"),r?t.setProperty(n,s):t[n]=s}}var PE=we({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function _d(t,e){if(e){if(PE[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(O(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(O(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(O(61))}if(e.style!=null&&typeof e.style!="object")throw Error(O(62))}}function xd(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var wd=null;function Mh(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Ed=null,Ts=null,bs=null;function Om(t){if(t=zo(t)){if(typeof Ed!="function")throw Error(O(280));var e=t.stateNode;e&&(e=oc(e),Ed(t.stateNode,t.type,e))}}function Vv(t){Ts?bs?bs.push(t):bs=[t]:Ts=t}function $v(){if(Ts){var t=Ts,e=bs;if(bs=Ts=null,Om(t),e)for(t=0;t<e.length;t++)Om(e[t])}}function Bv(t,e){return t(e)}function Hv(){}var _u=!1;function Wv(t,e,n){if(_u)return t(e,n);_u=!0;try{return Bv(t,e,n)}finally{_u=!1,(Ts!==null||bs!==null)&&(Hv(),$v())}}function ao(t,e){var n=t.stateNode;if(n===null)return null;var r=oc(n);if(r===null)return null;n=r[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(t=t.type,r=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!r;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(O(231,e,typeof n));return n}var kd=!1;if(Nn)try{var ki={};Object.defineProperty(ki,"passive",{get:function(){kd=!0}}),window.addEventListener("test",ki,ki),window.removeEventListener("test",ki,ki)}catch{kd=!1}function AE(t,e,n,r,s,i,o,l,u){var h=Array.prototype.slice.call(arguments,3);try{e.apply(n,h)}catch(m){this.onError(m)}}var $i=!1,ol=null,al=!1,Sd=null,jE={onError:function(t){$i=!0,ol=t}};function OE(t,e,n,r,s,i,o,l,u){$i=!1,ol=null,AE.apply(jE,arguments)}function DE(t,e,n,r,s,i,o,l,u){if(OE.apply(this,arguments),$i){if($i){var h=ol;$i=!1,ol=null}else throw Error(O(198));al||(al=!0,Sd=h)}}function Qr(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function Gv(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Dm(t){if(Qr(t)!==t)throw Error(O(188))}function LE(t){var e=t.alternate;if(!e){if(e=Qr(t),e===null)throw Error(O(188));return e!==t?null:t}for(var n=t,r=e;;){var s=n.return;if(s===null)break;var i=s.alternate;if(i===null){if(r=s.return,r!==null){n=r;continue}break}if(s.child===i.child){for(i=s.child;i;){if(i===n)return Dm(s),t;if(i===r)return Dm(s),e;i=i.sibling}throw Error(O(188))}if(n.return!==r.return)n=s,r=i;else{for(var o=!1,l=s.child;l;){if(l===n){o=!0,n=s,r=i;break}if(l===r){o=!0,r=s,n=i;break}l=l.sibling}if(!o){for(l=i.child;l;){if(l===n){o=!0,n=i,r=s;break}if(l===r){o=!0,r=i,n=s;break}l=l.sibling}if(!o)throw Error(O(189))}}if(n.alternate!==r)throw Error(O(190))}if(n.tag!==3)throw Error(O(188));return n.stateNode.current===n?t:e}function qv(t){return t=LE(t),t!==null?Kv(t):null}function Kv(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=Kv(t);if(e!==null)return e;t=t.sibling}return null}var Yv=kt.unstable_scheduleCallback,Lm=kt.unstable_cancelCallback,ME=kt.unstable_shouldYield,FE=kt.unstable_requestPaint,Ne=kt.unstable_now,UE=kt.unstable_getCurrentPriorityLevel,Fh=kt.unstable_ImmediatePriority,Qv=kt.unstable_UserBlockingPriority,ll=kt.unstable_NormalPriority,zE=kt.unstable_LowPriority,Xv=kt.unstable_IdlePriority,nc=null,nn=null;function VE(t){if(nn&&typeof nn.onCommitFiberRoot=="function")try{nn.onCommitFiberRoot(nc,t,void 0,(t.current.flags&128)===128)}catch{}}var Ht=Math.clz32?Math.clz32:HE,$E=Math.log,BE=Math.LN2;function HE(t){return t>>>=0,t===0?32:31-($E(t)/BE|0)|0}var Ea=64,ka=4194304;function Mi(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function cl(t,e){var n=t.pendingLanes;if(n===0)return 0;var r=0,s=t.suspendedLanes,i=t.pingedLanes,o=n&268435455;if(o!==0){var l=o&~s;l!==0?r=Mi(l):(i&=o,i!==0&&(r=Mi(i)))}else o=n&~s,o!==0?r=Mi(o):i!==0&&(r=Mi(i));if(r===0)return 0;if(e!==0&&e!==r&&!(e&s)&&(s=r&-r,i=e&-e,s>=i||s===16&&(i&4194240)!==0))return e;if(r&4&&(r|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=r;0<e;)n=31-Ht(e),s=1<<n,r|=t[n],e&=~s;return r}function WE(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function GE(t,e){for(var n=t.suspendedLanes,r=t.pingedLanes,s=t.expirationTimes,i=t.pendingLanes;0<i;){var o=31-Ht(i),l=1<<o,u=s[o];u===-1?(!(l&n)||l&r)&&(s[o]=WE(l,e)):u<=e&&(t.expiredLanes|=l),i&=~l}}function Nd(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function Jv(){var t=Ea;return Ea<<=1,!(Ea&4194240)&&(Ea=64),t}function xu(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Fo(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-Ht(e),t[e]=n}function qE(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var r=t.eventTimes;for(t=t.expirationTimes;0<n;){var s=31-Ht(n),i=1<<s;e[s]=0,r[s]=-1,t[s]=-1,n&=~i}}function Uh(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var r=31-Ht(n),s=1<<r;s&e|t[r]&e&&(t[r]|=e),n&=~s}}var ae=0;function Zv(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var ey,zh,ty,ny,ry,Cd=!1,Sa=[],Jn=null,Zn=null,er=null,lo=new Map,co=new Map,Bn=[],KE="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Mm(t,e){switch(t){case"focusin":case"focusout":Jn=null;break;case"dragenter":case"dragleave":Zn=null;break;case"mouseover":case"mouseout":er=null;break;case"pointerover":case"pointerout":lo.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":co.delete(e.pointerId)}}function Si(t,e,n,r,s,i){return t===null||t.nativeEvent!==i?(t={blockedOn:e,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[s]},e!==null&&(e=zo(e),e!==null&&zh(e)),t):(t.eventSystemFlags|=r,e=t.targetContainers,s!==null&&e.indexOf(s)===-1&&e.push(s),t)}function YE(t,e,n,r,s){switch(e){case"focusin":return Jn=Si(Jn,t,e,n,r,s),!0;case"dragenter":return Zn=Si(Zn,t,e,n,r,s),!0;case"mouseover":return er=Si(er,t,e,n,r,s),!0;case"pointerover":var i=s.pointerId;return lo.set(i,Si(lo.get(i)||null,t,e,n,r,s)),!0;case"gotpointercapture":return i=s.pointerId,co.set(i,Si(co.get(i)||null,t,e,n,r,s)),!0}return!1}function sy(t){var e=Ir(t.target);if(e!==null){var n=Qr(e);if(n!==null){if(e=n.tag,e===13){if(e=Gv(n),e!==null){t.blockedOn=e,ry(t.priority,function(){ty(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Ba(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Id(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var r=new n.constructor(n.type,n);wd=r,n.target.dispatchEvent(r),wd=null}else return e=zo(n),e!==null&&zh(e),t.blockedOn=n,!1;e.shift()}return!0}function Fm(t,e,n){Ba(t)&&n.delete(e)}function QE(){Cd=!1,Jn!==null&&Ba(Jn)&&(Jn=null),Zn!==null&&Ba(Zn)&&(Zn=null),er!==null&&Ba(er)&&(er=null),lo.forEach(Fm),co.forEach(Fm)}function Ni(t,e){t.blockedOn===e&&(t.blockedOn=null,Cd||(Cd=!0,kt.unstable_scheduleCallback(kt.unstable_NormalPriority,QE)))}function uo(t){function e(s){return Ni(s,t)}if(0<Sa.length){Ni(Sa[0],t);for(var n=1;n<Sa.length;n++){var r=Sa[n];r.blockedOn===t&&(r.blockedOn=null)}}for(Jn!==null&&Ni(Jn,t),Zn!==null&&Ni(Zn,t),er!==null&&Ni(er,t),lo.forEach(e),co.forEach(e),n=0;n<Bn.length;n++)r=Bn[n],r.blockedOn===t&&(r.blockedOn=null);for(;0<Bn.length&&(n=Bn[0],n.blockedOn===null);)sy(n),n.blockedOn===null&&Bn.shift()}var Rs=jn.ReactCurrentBatchConfig,ul=!0;function XE(t,e,n,r){var s=ae,i=Rs.transition;Rs.transition=null;try{ae=1,Vh(t,e,n,r)}finally{ae=s,Rs.transition=i}}function JE(t,e,n,r){var s=ae,i=Rs.transition;Rs.transition=null;try{ae=4,Vh(t,e,n,r)}finally{ae=s,Rs.transition=i}}function Vh(t,e,n,r){if(ul){var s=Id(t,e,n,r);if(s===null)Ru(t,e,r,dl,n),Mm(t,r);else if(YE(s,t,e,n,r))r.stopPropagation();else if(Mm(t,r),e&4&&-1<KE.indexOf(t)){for(;s!==null;){var i=zo(s);if(i!==null&&ey(i),i=Id(t,e,n,r),i===null&&Ru(t,e,r,dl,n),i===s)break;s=i}s!==null&&r.stopPropagation()}else Ru(t,e,r,null,n)}}var dl=null;function Id(t,e,n,r){if(dl=null,t=Mh(r),t=Ir(t),t!==null)if(e=Qr(t),e===null)t=null;else if(n=e.tag,n===13){if(t=Gv(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return dl=t,null}function iy(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(UE()){case Fh:return 1;case Qv:return 4;case ll:case zE:return 16;case Xv:return 536870912;default:return 16}default:return 16}}var Yn=null,$h=null,Ha=null;function oy(){if(Ha)return Ha;var t,e=$h,n=e.length,r,s="value"in Yn?Yn.value:Yn.textContent,i=s.length;for(t=0;t<n&&e[t]===s[t];t++);var o=n-t;for(r=1;r<=o&&e[n-r]===s[i-r];r++);return Ha=s.slice(t,1<r?1-r:void 0)}function Wa(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Na(){return!0}function Um(){return!1}function Ct(t){function e(n,r,s,i,o){this._reactName=n,this._targetInst=s,this.type=r,this.nativeEvent=i,this.target=o,this.currentTarget=null;for(var l in t)t.hasOwnProperty(l)&&(n=t[l],this[l]=n?n(i):i[l]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Na:Um,this.isPropagationStopped=Um,this}return we(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Na)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Na)},persist:function(){},isPersistent:Na}),e}var ei={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Bh=Ct(ei),Uo=we({},ei,{view:0,detail:0}),ZE=Ct(Uo),wu,Eu,Ci,rc=we({},Uo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Hh,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Ci&&(Ci&&t.type==="mousemove"?(wu=t.screenX-Ci.screenX,Eu=t.screenY-Ci.screenY):Eu=wu=0,Ci=t),wu)},movementY:function(t){return"movementY"in t?t.movementY:Eu}}),zm=Ct(rc),ek=we({},rc,{dataTransfer:0}),tk=Ct(ek),nk=we({},Uo,{relatedTarget:0}),ku=Ct(nk),rk=we({},ei,{animationName:0,elapsedTime:0,pseudoElement:0}),sk=Ct(rk),ik=we({},ei,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),ok=Ct(ik),ak=we({},ei,{data:0}),Vm=Ct(ak),lk={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},ck={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},uk={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function dk(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=uk[t])?!!e[t]:!1}function Hh(){return dk}var hk=we({},Uo,{key:function(t){if(t.key){var e=lk[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Wa(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?ck[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Hh,charCode:function(t){return t.type==="keypress"?Wa(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Wa(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),fk=Ct(hk),pk=we({},rc,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),$m=Ct(pk),mk=we({},Uo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Hh}),gk=Ct(mk),vk=we({},ei,{propertyName:0,elapsedTime:0,pseudoElement:0}),yk=Ct(vk),_k=we({},rc,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),xk=Ct(_k),wk=[9,13,27,32],Wh=Nn&&"CompositionEvent"in window,Bi=null;Nn&&"documentMode"in document&&(Bi=document.documentMode);var Ek=Nn&&"TextEvent"in window&&!Bi,ay=Nn&&(!Wh||Bi&&8<Bi&&11>=Bi),Bm=" ",Hm=!1;function ly(t,e){switch(t){case"keyup":return wk.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function cy(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var ms=!1;function kk(t,e){switch(t){case"compositionend":return cy(e);case"keypress":return e.which!==32?null:(Hm=!0,Bm);case"textInput":return t=e.data,t===Bm&&Hm?null:t;default:return null}}function Sk(t,e){if(ms)return t==="compositionend"||!Wh&&ly(t,e)?(t=oy(),Ha=$h=Yn=null,ms=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return ay&&e.locale!=="ko"?null:e.data;default:return null}}var Nk={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Wm(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!Nk[t.type]:e==="textarea"}function uy(t,e,n,r){Vv(r),e=hl(e,"onChange"),0<e.length&&(n=new Bh("onChange","change",null,n,r),t.push({event:n,listeners:e}))}var Hi=null,ho=null;function Ck(t){wy(t,0)}function sc(t){var e=ys(t);if(Ov(e))return t}function Ik(t,e){if(t==="change")return e}var dy=!1;if(Nn){var Su;if(Nn){var Nu="oninput"in document;if(!Nu){var Gm=document.createElement("div");Gm.setAttribute("oninput","return;"),Nu=typeof Gm.oninput=="function"}Su=Nu}else Su=!1;dy=Su&&(!document.documentMode||9<document.documentMode)}function qm(){Hi&&(Hi.detachEvent("onpropertychange",hy),ho=Hi=null)}function hy(t){if(t.propertyName==="value"&&sc(ho)){var e=[];uy(e,ho,t,Mh(t)),Wv(Ck,e)}}function Tk(t,e,n){t==="focusin"?(qm(),Hi=e,ho=n,Hi.attachEvent("onpropertychange",hy)):t==="focusout"&&qm()}function bk(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return sc(ho)}function Rk(t,e){if(t==="click")return sc(e)}function Pk(t,e){if(t==="input"||t==="change")return sc(e)}function Ak(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var qt=typeof Object.is=="function"?Object.is:Ak;function fo(t,e){if(qt(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),r=Object.keys(e);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var s=n[r];if(!cd.call(e,s)||!qt(t[s],e[s]))return!1}return!0}function Km(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Ym(t,e){var n=Km(t);t=0;for(var r;n;){if(n.nodeType===3){if(r=t+n.textContent.length,t<=e&&r>=e)return{node:n,offset:e-t};t=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Km(n)}}function fy(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?fy(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function py(){for(var t=window,e=il();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=il(t.document)}return e}function Gh(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function jk(t){var e=py(),n=t.focusedElem,r=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&fy(n.ownerDocument.documentElement,n)){if(r!==null&&Gh(n)){if(e=r.start,t=r.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var s=n.textContent.length,i=Math.min(r.start,s);r=r.end===void 0?i:Math.min(r.end,s),!t.extend&&i>r&&(s=r,r=i,i=s),s=Ym(n,i);var o=Ym(n,r);s&&o&&(t.rangeCount!==1||t.anchorNode!==s.node||t.anchorOffset!==s.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(s.node,s.offset),t.removeAllRanges(),i>r?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var Ok=Nn&&"documentMode"in document&&11>=document.documentMode,gs=null,Td=null,Wi=null,bd=!1;function Qm(t,e,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;bd||gs==null||gs!==il(r)||(r=gs,"selectionStart"in r&&Gh(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Wi&&fo(Wi,r)||(Wi=r,r=hl(Td,"onSelect"),0<r.length&&(e=new Bh("onSelect","select",null,e,n),t.push({event:e,listeners:r}),e.target=gs)))}function Ca(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var vs={animationend:Ca("Animation","AnimationEnd"),animationiteration:Ca("Animation","AnimationIteration"),animationstart:Ca("Animation","AnimationStart"),transitionend:Ca("Transition","TransitionEnd")},Cu={},my={};Nn&&(my=document.createElement("div").style,"AnimationEvent"in window||(delete vs.animationend.animation,delete vs.animationiteration.animation,delete vs.animationstart.animation),"TransitionEvent"in window||delete vs.transitionend.transition);function ic(t){if(Cu[t])return Cu[t];if(!vs[t])return t;var e=vs[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in my)return Cu[t]=e[n];return t}var gy=ic("animationend"),vy=ic("animationiteration"),yy=ic("animationstart"),_y=ic("transitionend"),xy=new Map,Xm="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function mr(t,e){xy.set(t,e),Yr(e,[t])}for(var Iu=0;Iu<Xm.length;Iu++){var Tu=Xm[Iu],Dk=Tu.toLowerCase(),Lk=Tu[0].toUpperCase()+Tu.slice(1);mr(Dk,"on"+Lk)}mr(gy,"onAnimationEnd");mr(vy,"onAnimationIteration");mr(yy,"onAnimationStart");mr("dblclick","onDoubleClick");mr("focusin","onFocus");mr("focusout","onBlur");mr(_y,"onTransitionEnd");Fs("onMouseEnter",["mouseout","mouseover"]);Fs("onMouseLeave",["mouseout","mouseover"]);Fs("onPointerEnter",["pointerout","pointerover"]);Fs("onPointerLeave",["pointerout","pointerover"]);Yr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Yr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Yr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Yr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Yr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Yr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Fi="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Mk=new Set("cancel close invalid load scroll toggle".split(" ").concat(Fi));function Jm(t,e,n){var r=t.type||"unknown-event";t.currentTarget=n,DE(r,e,void 0,t),t.currentTarget=null}function wy(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var r=t[n],s=r.event;r=r.listeners;e:{var i=void 0;if(e)for(var o=r.length-1;0<=o;o--){var l=r[o],u=l.instance,h=l.currentTarget;if(l=l.listener,u!==i&&s.isPropagationStopped())break e;Jm(s,l,h),i=u}else for(o=0;o<r.length;o++){if(l=r[o],u=l.instance,h=l.currentTarget,l=l.listener,u!==i&&s.isPropagationStopped())break e;Jm(s,l,h),i=u}}}if(al)throw t=Sd,al=!1,Sd=null,t}function me(t,e){var n=e[Od];n===void 0&&(n=e[Od]=new Set);var r=t+"__bubble";n.has(r)||(Ey(e,t,2,!1),n.add(r))}function bu(t,e,n){var r=0;e&&(r|=4),Ey(n,t,r,e)}var Ia="_reactListening"+Math.random().toString(36).slice(2);function po(t){if(!t[Ia]){t[Ia]=!0,bv.forEach(function(n){n!=="selectionchange"&&(Mk.has(n)||bu(n,!1,t),bu(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Ia]||(e[Ia]=!0,bu("selectionchange",!1,e))}}function Ey(t,e,n,r){switch(iy(e)){case 1:var s=XE;break;case 4:s=JE;break;default:s=Vh}n=s.bind(null,e,n,t),s=void 0,!kd||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(s=!0),r?s!==void 0?t.addEventListener(e,n,{capture:!0,passive:s}):t.addEventListener(e,n,!0):s!==void 0?t.addEventListener(e,n,{passive:s}):t.addEventListener(e,n,!1)}function Ru(t,e,n,r,s){var i=r;if(!(e&1)&&!(e&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var l=r.stateNode.containerInfo;if(l===s||l.nodeType===8&&l.parentNode===s)break;if(o===4)for(o=r.return;o!==null;){var u=o.tag;if((u===3||u===4)&&(u=o.stateNode.containerInfo,u===s||u.nodeType===8&&u.parentNode===s))return;o=o.return}for(;l!==null;){if(o=Ir(l),o===null)return;if(u=o.tag,u===5||u===6){r=i=o;continue e}l=l.parentNode}}r=r.return}Wv(function(){var h=i,m=Mh(n),p=[];e:{var v=xy.get(t);if(v!==void 0){var S=Bh,I=t;switch(t){case"keypress":if(Wa(n)===0)break e;case"keydown":case"keyup":S=fk;break;case"focusin":I="focus",S=ku;break;case"focusout":I="blur",S=ku;break;case"beforeblur":case"afterblur":S=ku;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":S=zm;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":S=tk;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":S=gk;break;case gy:case vy:case yy:S=sk;break;case _y:S=yk;break;case"scroll":S=ZE;break;case"wheel":S=xk;break;case"copy":case"cut":case"paste":S=ok;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":S=$m}var P=(e&4)!==0,D=!P&&t==="scroll",T=P?v!==null?v+"Capture":null:v;P=[];for(var x=h,N;x!==null;){N=x;var j=N.stateNode;if(N.tag===5&&j!==null&&(N=j,T!==null&&(j=ao(x,T),j!=null&&P.push(mo(x,j,N)))),D)break;x=x.return}0<P.length&&(v=new S(v,I,null,n,m),p.push({event:v,listeners:P}))}}if(!(e&7)){e:{if(v=t==="mouseover"||t==="pointerover",S=t==="mouseout"||t==="pointerout",v&&n!==wd&&(I=n.relatedTarget||n.fromElement)&&(Ir(I)||I[Cn]))break e;if((S||v)&&(v=m.window===m?m:(v=m.ownerDocument)?v.defaultView||v.parentWindow:window,S?(I=n.relatedTarget||n.toElement,S=h,I=I?Ir(I):null,I!==null&&(D=Qr(I),I!==D||I.tag!==5&&I.tag!==6)&&(I=null)):(S=null,I=h),S!==I)){if(P=zm,j="onMouseLeave",T="onMouseEnter",x="mouse",(t==="pointerout"||t==="pointerover")&&(P=$m,j="onPointerLeave",T="onPointerEnter",x="pointer"),D=S==null?v:ys(S),N=I==null?v:ys(I),v=new P(j,x+"leave",S,n,m),v.target=D,v.relatedTarget=N,j=null,Ir(m)===h&&(P=new P(T,x+"enter",I,n,m),P.target=N,P.relatedTarget=D,j=P),D=j,S&&I)t:{for(P=S,T=I,x=0,N=P;N;N=cs(N))x++;for(N=0,j=T;j;j=cs(j))N++;for(;0<x-N;)P=cs(P),x--;for(;0<N-x;)T=cs(T),N--;for(;x--;){if(P===T||T!==null&&P===T.alternate)break t;P=cs(P),T=cs(T)}P=null}else P=null;S!==null&&Zm(p,v,S,P,!1),I!==null&&D!==null&&Zm(p,D,I,P,!0)}}e:{if(v=h?ys(h):window,S=v.nodeName&&v.nodeName.toLowerCase(),S==="select"||S==="input"&&v.type==="file")var M=Ik;else if(Wm(v))if(dy)M=Pk;else{M=bk;var U=Tk}else(S=v.nodeName)&&S.toLowerCase()==="input"&&(v.type==="checkbox"||v.type==="radio")&&(M=Rk);if(M&&(M=M(t,h))){uy(p,M,n,m);break e}U&&U(t,v,h),t==="focusout"&&(U=v._wrapperState)&&U.controlled&&v.type==="number"&&gd(v,"number",v.value)}switch(U=h?ys(h):window,t){case"focusin":(Wm(U)||U.contentEditable==="true")&&(gs=U,Td=h,Wi=null);break;case"focusout":Wi=Td=gs=null;break;case"mousedown":bd=!0;break;case"contextmenu":case"mouseup":case"dragend":bd=!1,Qm(p,n,m);break;case"selectionchange":if(Ok)break;case"keydown":case"keyup":Qm(p,n,m)}var w;if(Wh)e:{switch(t){case"compositionstart":var y="onCompositionStart";break e;case"compositionend":y="onCompositionEnd";break e;case"compositionupdate":y="onCompositionUpdate";break e}y=void 0}else ms?ly(t,n)&&(y="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(y="onCompositionStart");y&&(ay&&n.locale!=="ko"&&(ms||y!=="onCompositionStart"?y==="onCompositionEnd"&&ms&&(w=oy()):(Yn=m,$h="value"in Yn?Yn.value:Yn.textContent,ms=!0)),U=hl(h,y),0<U.length&&(y=new Vm(y,t,null,n,m),p.push({event:y,listeners:U}),w?y.data=w:(w=cy(n),w!==null&&(y.data=w)))),(w=Ek?kk(t,n):Sk(t,n))&&(h=hl(h,"onBeforeInput"),0<h.length&&(m=new Vm("onBeforeInput","beforeinput",null,n,m),p.push({event:m,listeners:h}),m.data=w))}wy(p,e)})}function mo(t,e,n){return{instance:t,listener:e,currentTarget:n}}function hl(t,e){for(var n=e+"Capture",r=[];t!==null;){var s=t,i=s.stateNode;s.tag===5&&i!==null&&(s=i,i=ao(t,n),i!=null&&r.unshift(mo(t,i,s)),i=ao(t,e),i!=null&&r.push(mo(t,i,s))),t=t.return}return r}function cs(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function Zm(t,e,n,r,s){for(var i=e._reactName,o=[];n!==null&&n!==r;){var l=n,u=l.alternate,h=l.stateNode;if(u!==null&&u===r)break;l.tag===5&&h!==null&&(l=h,s?(u=ao(n,i),u!=null&&o.unshift(mo(n,u,l))):s||(u=ao(n,i),u!=null&&o.push(mo(n,u,l)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var Fk=/\r\n?/g,Uk=/\u0000|\uFFFD/g;function eg(t){return(typeof t=="string"?t:""+t).replace(Fk,`
`).replace(Uk,"")}function Ta(t,e,n){if(e=eg(e),eg(t)!==e&&n)throw Error(O(425))}function fl(){}var Rd=null,Pd=null;function Ad(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var jd=typeof setTimeout=="function"?setTimeout:void 0,zk=typeof clearTimeout=="function"?clearTimeout:void 0,tg=typeof Promise=="function"?Promise:void 0,Vk=typeof queueMicrotask=="function"?queueMicrotask:typeof tg<"u"?function(t){return tg.resolve(null).then(t).catch($k)}:jd;function $k(t){setTimeout(function(){throw t})}function Pu(t,e){var n=e,r=0;do{var s=n.nextSibling;if(t.removeChild(n),s&&s.nodeType===8)if(n=s.data,n==="/$"){if(r===0){t.removeChild(s),uo(e);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=s}while(n);uo(e)}function tr(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function ng(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var ti=Math.random().toString(36).slice(2),en="__reactFiber$"+ti,go="__reactProps$"+ti,Cn="__reactContainer$"+ti,Od="__reactEvents$"+ti,Bk="__reactListeners$"+ti,Hk="__reactHandles$"+ti;function Ir(t){var e=t[en];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Cn]||n[en]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=ng(t);t!==null;){if(n=t[en])return n;t=ng(t)}return e}t=n,n=t.parentNode}return null}function zo(t){return t=t[en]||t[Cn],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function ys(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(O(33))}function oc(t){return t[go]||null}var Dd=[],_s=-1;function gr(t){return{current:t}}function ge(t){0>_s||(t.current=Dd[_s],Dd[_s]=null,_s--)}function he(t,e){_s++,Dd[_s]=t.current,t.current=e}var dr={},Xe=gr(dr),pt=gr(!1),Or=dr;function Us(t,e){var n=t.type.contextTypes;if(!n)return dr;var r=t.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===e)return r.__reactInternalMemoizedMaskedChildContext;var s={},i;for(i in n)s[i]=e[i];return r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=s),s}function mt(t){return t=t.childContextTypes,t!=null}function pl(){ge(pt),ge(Xe)}function rg(t,e,n){if(Xe.current!==dr)throw Error(O(168));he(Xe,e),he(pt,n)}function ky(t,e,n){var r=t.stateNode;if(e=e.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var s in r)if(!(s in e))throw Error(O(108,TE(t)||"Unknown",s));return we({},n,r)}function ml(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||dr,Or=Xe.current,he(Xe,t),he(pt,pt.current),!0}function sg(t,e,n){var r=t.stateNode;if(!r)throw Error(O(169));n?(t=ky(t,e,Or),r.__reactInternalMemoizedMergedChildContext=t,ge(pt),ge(Xe),he(Xe,t)):ge(pt),he(pt,n)}var mn=null,ac=!1,Au=!1;function Sy(t){mn===null?mn=[t]:mn.push(t)}function Wk(t){ac=!0,Sy(t)}function vr(){if(!Au&&mn!==null){Au=!0;var t=0,e=ae;try{var n=mn;for(ae=1;t<n.length;t++){var r=n[t];do r=r(!0);while(r!==null)}mn=null,ac=!1}catch(s){throw mn!==null&&(mn=mn.slice(t+1)),Yv(Fh,vr),s}finally{ae=e,Au=!1}}return null}var xs=[],ws=0,gl=null,vl=0,Tt=[],bt=0,Dr=null,gn=1,vn="";function kr(t,e){xs[ws++]=vl,xs[ws++]=gl,gl=t,vl=e}function Ny(t,e,n){Tt[bt++]=gn,Tt[bt++]=vn,Tt[bt++]=Dr,Dr=t;var r=gn;t=vn;var s=32-Ht(r)-1;r&=~(1<<s),n+=1;var i=32-Ht(e)+s;if(30<i){var o=s-s%5;i=(r&(1<<o)-1).toString(32),r>>=o,s-=o,gn=1<<32-Ht(e)+s|n<<s|r,vn=i+t}else gn=1<<i|n<<s|r,vn=t}function qh(t){t.return!==null&&(kr(t,1),Ny(t,1,0))}function Kh(t){for(;t===gl;)gl=xs[--ws],xs[ws]=null,vl=xs[--ws],xs[ws]=null;for(;t===Dr;)Dr=Tt[--bt],Tt[bt]=null,vn=Tt[--bt],Tt[bt]=null,gn=Tt[--bt],Tt[bt]=null}var wt=null,xt=null,ve=!1,zt=null;function Cy(t,e){var n=Rt(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function ig(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,wt=t,xt=tr(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,wt=t,xt=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Dr!==null?{id:gn,overflow:vn}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Rt(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,wt=t,xt=null,!0):!1;default:return!1}}function Ld(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Md(t){if(ve){var e=xt;if(e){var n=e;if(!ig(t,e)){if(Ld(t))throw Error(O(418));e=tr(n.nextSibling);var r=wt;e&&ig(t,e)?Cy(r,n):(t.flags=t.flags&-4097|2,ve=!1,wt=t)}}else{if(Ld(t))throw Error(O(418));t.flags=t.flags&-4097|2,ve=!1,wt=t}}}function og(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;wt=t}function ba(t){if(t!==wt)return!1;if(!ve)return og(t),ve=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Ad(t.type,t.memoizedProps)),e&&(e=xt)){if(Ld(t))throw Iy(),Error(O(418));for(;e;)Cy(t,e),e=tr(e.nextSibling)}if(og(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(O(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){xt=tr(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}xt=null}}else xt=wt?tr(t.stateNode.nextSibling):null;return!0}function Iy(){for(var t=xt;t;)t=tr(t.nextSibling)}function zs(){xt=wt=null,ve=!1}function Yh(t){zt===null?zt=[t]:zt.push(t)}var Gk=jn.ReactCurrentBatchConfig;function Ii(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(O(309));var r=n.stateNode}if(!r)throw Error(O(147,t));var s=r,i=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===i?e.ref:(e=function(o){var l=s.refs;o===null?delete l[i]:l[i]=o},e._stringRef=i,e)}if(typeof t!="string")throw Error(O(284));if(!n._owner)throw Error(O(290,t))}return t}function Ra(t,e){throw t=Object.prototype.toString.call(e),Error(O(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function ag(t){var e=t._init;return e(t._payload)}function Ty(t){function e(T,x){if(t){var N=T.deletions;N===null?(T.deletions=[x],T.flags|=16):N.push(x)}}function n(T,x){if(!t)return null;for(;x!==null;)e(T,x),x=x.sibling;return null}function r(T,x){for(T=new Map;x!==null;)x.key!==null?T.set(x.key,x):T.set(x.index,x),x=x.sibling;return T}function s(T,x){return T=ir(T,x),T.index=0,T.sibling=null,T}function i(T,x,N){return T.index=N,t?(N=T.alternate,N!==null?(N=N.index,N<x?(T.flags|=2,x):N):(T.flags|=2,x)):(T.flags|=1048576,x)}function o(T){return t&&T.alternate===null&&(T.flags|=2),T}function l(T,x,N,j){return x===null||x.tag!==6?(x=Uu(N,T.mode,j),x.return=T,x):(x=s(x,N),x.return=T,x)}function u(T,x,N,j){var M=N.type;return M===ps?m(T,x,N.props.children,j,N.key):x!==null&&(x.elementType===M||typeof M=="object"&&M!==null&&M.$$typeof===zn&&ag(M)===x.type)?(j=s(x,N.props),j.ref=Ii(T,x,N),j.return=T,j):(j=Ja(N.type,N.key,N.props,null,T.mode,j),j.ref=Ii(T,x,N),j.return=T,j)}function h(T,x,N,j){return x===null||x.tag!==4||x.stateNode.containerInfo!==N.containerInfo||x.stateNode.implementation!==N.implementation?(x=zu(N,T.mode,j),x.return=T,x):(x=s(x,N.children||[]),x.return=T,x)}function m(T,x,N,j,M){return x===null||x.tag!==7?(x=jr(N,T.mode,j,M),x.return=T,x):(x=s(x,N),x.return=T,x)}function p(T,x,N){if(typeof x=="string"&&x!==""||typeof x=="number")return x=Uu(""+x,T.mode,N),x.return=T,x;if(typeof x=="object"&&x!==null){switch(x.$$typeof){case _a:return N=Ja(x.type,x.key,x.props,null,T.mode,N),N.ref=Ii(T,null,x),N.return=T,N;case fs:return x=zu(x,T.mode,N),x.return=T,x;case zn:var j=x._init;return p(T,j(x._payload),N)}if(Li(x)||Ei(x))return x=jr(x,T.mode,N,null),x.return=T,x;Ra(T,x)}return null}function v(T,x,N,j){var M=x!==null?x.key:null;if(typeof N=="string"&&N!==""||typeof N=="number")return M!==null?null:l(T,x,""+N,j);if(typeof N=="object"&&N!==null){switch(N.$$typeof){case _a:return N.key===M?u(T,x,N,j):null;case fs:return N.key===M?h(T,x,N,j):null;case zn:return M=N._init,v(T,x,M(N._payload),j)}if(Li(N)||Ei(N))return M!==null?null:m(T,x,N,j,null);Ra(T,N)}return null}function S(T,x,N,j,M){if(typeof j=="string"&&j!==""||typeof j=="number")return T=T.get(N)||null,l(x,T,""+j,M);if(typeof j=="object"&&j!==null){switch(j.$$typeof){case _a:return T=T.get(j.key===null?N:j.key)||null,u(x,T,j,M);case fs:return T=T.get(j.key===null?N:j.key)||null,h(x,T,j,M);case zn:var U=j._init;return S(T,x,N,U(j._payload),M)}if(Li(j)||Ei(j))return T=T.get(N)||null,m(x,T,j,M,null);Ra(x,j)}return null}function I(T,x,N,j){for(var M=null,U=null,w=x,y=x=0,_=null;w!==null&&y<N.length;y++){w.index>y?(_=w,w=null):_=w.sibling;var k=v(T,w,N[y],j);if(k===null){w===null&&(w=_);break}t&&w&&k.alternate===null&&e(T,w),x=i(k,x,y),U===null?M=k:U.sibling=k,U=k,w=_}if(y===N.length)return n(T,w),ve&&kr(T,y),M;if(w===null){for(;y<N.length;y++)w=p(T,N[y],j),w!==null&&(x=i(w,x,y),U===null?M=w:U.sibling=w,U=w);return ve&&kr(T,y),M}for(w=r(T,w);y<N.length;y++)_=S(w,T,y,N[y],j),_!==null&&(t&&_.alternate!==null&&w.delete(_.key===null?y:_.key),x=i(_,x,y),U===null?M=_:U.sibling=_,U=_);return t&&w.forEach(function(C){return e(T,C)}),ve&&kr(T,y),M}function P(T,x,N,j){var M=Ei(N);if(typeof M!="function")throw Error(O(150));if(N=M.call(N),N==null)throw Error(O(151));for(var U=M=null,w=x,y=x=0,_=null,k=N.next();w!==null&&!k.done;y++,k=N.next()){w.index>y?(_=w,w=null):_=w.sibling;var C=v(T,w,k.value,j);if(C===null){w===null&&(w=_);break}t&&w&&C.alternate===null&&e(T,w),x=i(C,x,y),U===null?M=C:U.sibling=C,U=C,w=_}if(k.done)return n(T,w),ve&&kr(T,y),M;if(w===null){for(;!k.done;y++,k=N.next())k=p(T,k.value,j),k!==null&&(x=i(k,x,y),U===null?M=k:U.sibling=k,U=k);return ve&&kr(T,y),M}for(w=r(T,w);!k.done;y++,k=N.next())k=S(w,T,y,k.value,j),k!==null&&(t&&k.alternate!==null&&w.delete(k.key===null?y:k.key),x=i(k,x,y),U===null?M=k:U.sibling=k,U=k);return t&&w.forEach(function(b){return e(T,b)}),ve&&kr(T,y),M}function D(T,x,N,j){if(typeof N=="object"&&N!==null&&N.type===ps&&N.key===null&&(N=N.props.children),typeof N=="object"&&N!==null){switch(N.$$typeof){case _a:e:{for(var M=N.key,U=x;U!==null;){if(U.key===M){if(M=N.type,M===ps){if(U.tag===7){n(T,U.sibling),x=s(U,N.props.children),x.return=T,T=x;break e}}else if(U.elementType===M||typeof M=="object"&&M!==null&&M.$$typeof===zn&&ag(M)===U.type){n(T,U.sibling),x=s(U,N.props),x.ref=Ii(T,U,N),x.return=T,T=x;break e}n(T,U);break}else e(T,U);U=U.sibling}N.type===ps?(x=jr(N.props.children,T.mode,j,N.key),x.return=T,T=x):(j=Ja(N.type,N.key,N.props,null,T.mode,j),j.ref=Ii(T,x,N),j.return=T,T=j)}return o(T);case fs:e:{for(U=N.key;x!==null;){if(x.key===U)if(x.tag===4&&x.stateNode.containerInfo===N.containerInfo&&x.stateNode.implementation===N.implementation){n(T,x.sibling),x=s(x,N.children||[]),x.return=T,T=x;break e}else{n(T,x);break}else e(T,x);x=x.sibling}x=zu(N,T.mode,j),x.return=T,T=x}return o(T);case zn:return U=N._init,D(T,x,U(N._payload),j)}if(Li(N))return I(T,x,N,j);if(Ei(N))return P(T,x,N,j);Ra(T,N)}return typeof N=="string"&&N!==""||typeof N=="number"?(N=""+N,x!==null&&x.tag===6?(n(T,x.sibling),x=s(x,N),x.return=T,T=x):(n(T,x),x=Uu(N,T.mode,j),x.return=T,T=x),o(T)):n(T,x)}return D}var Vs=Ty(!0),by=Ty(!1),yl=gr(null),_l=null,Es=null,Qh=null;function Xh(){Qh=Es=_l=null}function Jh(t){var e=yl.current;ge(yl),t._currentValue=e}function Fd(t,e,n){for(;t!==null;){var r=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,r!==null&&(r.childLanes|=e)):r!==null&&(r.childLanes&e)!==e&&(r.childLanes|=e),t===n)break;t=t.return}}function Ps(t,e){_l=t,Qh=Es=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(ht=!0),t.firstContext=null)}function jt(t){var e=t._currentValue;if(Qh!==t)if(t={context:t,memoizedValue:e,next:null},Es===null){if(_l===null)throw Error(O(308));Es=t,_l.dependencies={lanes:0,firstContext:t}}else Es=Es.next=t;return e}var Tr=null;function Zh(t){Tr===null?Tr=[t]:Tr.push(t)}function Ry(t,e,n,r){var s=e.interleaved;return s===null?(n.next=n,Zh(e)):(n.next=s.next,s.next=n),e.interleaved=n,In(t,r)}function In(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var Vn=!1;function ef(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Py(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function En(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function nr(t,e,n){var r=t.updateQueue;if(r===null)return null;if(r=r.shared,te&2){var s=r.pending;return s===null?e.next=e:(e.next=s.next,s.next=e),r.pending=e,In(t,n)}return s=r.interleaved,s===null?(e.next=e,Zh(r)):(e.next=s.next,s.next=e),r.interleaved=e,In(t,n)}function Ga(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,Uh(t,n)}}function lg(t,e){var n=t.updateQueue,r=t.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var s=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?s=i=o:i=i.next=o,n=n.next}while(n!==null);i===null?s=i=e:i=i.next=e}else s=i=e;n={baseState:r.baseState,firstBaseUpdate:s,lastBaseUpdate:i,shared:r.shared,effects:r.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function xl(t,e,n,r){var s=t.updateQueue;Vn=!1;var i=s.firstBaseUpdate,o=s.lastBaseUpdate,l=s.shared.pending;if(l!==null){s.shared.pending=null;var u=l,h=u.next;u.next=null,o===null?i=h:o.next=h,o=u;var m=t.alternate;m!==null&&(m=m.updateQueue,l=m.lastBaseUpdate,l!==o&&(l===null?m.firstBaseUpdate=h:l.next=h,m.lastBaseUpdate=u))}if(i!==null){var p=s.baseState;o=0,m=h=u=null,l=i;do{var v=l.lane,S=l.eventTime;if((r&v)===v){m!==null&&(m=m.next={eventTime:S,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var I=t,P=l;switch(v=e,S=n,P.tag){case 1:if(I=P.payload,typeof I=="function"){p=I.call(S,p,v);break e}p=I;break e;case 3:I.flags=I.flags&-65537|128;case 0:if(I=P.payload,v=typeof I=="function"?I.call(S,p,v):I,v==null)break e;p=we({},p,v);break e;case 2:Vn=!0}}l.callback!==null&&l.lane!==0&&(t.flags|=64,v=s.effects,v===null?s.effects=[l]:v.push(l))}else S={eventTime:S,lane:v,tag:l.tag,payload:l.payload,callback:l.callback,next:null},m===null?(h=m=S,u=p):m=m.next=S,o|=v;if(l=l.next,l===null){if(l=s.shared.pending,l===null)break;v=l,l=v.next,v.next=null,s.lastBaseUpdate=v,s.shared.pending=null}}while(!0);if(m===null&&(u=p),s.baseState=u,s.firstBaseUpdate=h,s.lastBaseUpdate=m,e=s.shared.interleaved,e!==null){s=e;do o|=s.lane,s=s.next;while(s!==e)}else i===null&&(s.shared.lanes=0);Mr|=o,t.lanes=o,t.memoizedState=p}}function cg(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var r=t[e],s=r.callback;if(s!==null){if(r.callback=null,r=n,typeof s!="function")throw Error(O(191,s));s.call(r)}}}var Vo={},rn=gr(Vo),vo=gr(Vo),yo=gr(Vo);function br(t){if(t===Vo)throw Error(O(174));return t}function tf(t,e){switch(he(yo,e),he(vo,t),he(rn,Vo),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:yd(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=yd(e,t)}ge(rn),he(rn,e)}function $s(){ge(rn),ge(vo),ge(yo)}function Ay(t){br(yo.current);var e=br(rn.current),n=yd(e,t.type);e!==n&&(he(vo,t),he(rn,n))}function nf(t){vo.current===t&&(ge(rn),ge(vo))}var ye=gr(0);function wl(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var ju=[];function rf(){for(var t=0;t<ju.length;t++)ju[t]._workInProgressVersionPrimary=null;ju.length=0}var qa=jn.ReactCurrentDispatcher,Ou=jn.ReactCurrentBatchConfig,Lr=0,xe=null,Pe=null,Le=null,El=!1,Gi=!1,_o=0,qk=0;function Ke(){throw Error(O(321))}function sf(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!qt(t[n],e[n]))return!1;return!0}function of(t,e,n,r,s,i){if(Lr=i,xe=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,qa.current=t===null||t.memoizedState===null?Xk:Jk,t=n(r,s),Gi){i=0;do{if(Gi=!1,_o=0,25<=i)throw Error(O(301));i+=1,Le=Pe=null,e.updateQueue=null,qa.current=Zk,t=n(r,s)}while(Gi)}if(qa.current=kl,e=Pe!==null&&Pe.next!==null,Lr=0,Le=Pe=xe=null,El=!1,e)throw Error(O(300));return t}function af(){var t=_o!==0;return _o=0,t}function Zt(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Le===null?xe.memoizedState=Le=t:Le=Le.next=t,Le}function Ot(){if(Pe===null){var t=xe.alternate;t=t!==null?t.memoizedState:null}else t=Pe.next;var e=Le===null?xe.memoizedState:Le.next;if(e!==null)Le=e,Pe=t;else{if(t===null)throw Error(O(310));Pe=t,t={memoizedState:Pe.memoizedState,baseState:Pe.baseState,baseQueue:Pe.baseQueue,queue:Pe.queue,next:null},Le===null?xe.memoizedState=Le=t:Le=Le.next=t}return Le}function xo(t,e){return typeof e=="function"?e(t):e}function Du(t){var e=Ot(),n=e.queue;if(n===null)throw Error(O(311));n.lastRenderedReducer=t;var r=Pe,s=r.baseQueue,i=n.pending;if(i!==null){if(s!==null){var o=s.next;s.next=i.next,i.next=o}r.baseQueue=s=i,n.pending=null}if(s!==null){i=s.next,r=r.baseState;var l=o=null,u=null,h=i;do{var m=h.lane;if((Lr&m)===m)u!==null&&(u=u.next={lane:0,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null}),r=h.hasEagerState?h.eagerState:t(r,h.action);else{var p={lane:m,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null};u===null?(l=u=p,o=r):u=u.next=p,xe.lanes|=m,Mr|=m}h=h.next}while(h!==null&&h!==i);u===null?o=r:u.next=l,qt(r,e.memoizedState)||(ht=!0),e.memoizedState=r,e.baseState=o,e.baseQueue=u,n.lastRenderedState=r}if(t=n.interleaved,t!==null){s=t;do i=s.lane,xe.lanes|=i,Mr|=i,s=s.next;while(s!==t)}else s===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function Lu(t){var e=Ot(),n=e.queue;if(n===null)throw Error(O(311));n.lastRenderedReducer=t;var r=n.dispatch,s=n.pending,i=e.memoizedState;if(s!==null){n.pending=null;var o=s=s.next;do i=t(i,o.action),o=o.next;while(o!==s);qt(i,e.memoizedState)||(ht=!0),e.memoizedState=i,e.baseQueue===null&&(e.baseState=i),n.lastRenderedState=i}return[i,r]}function jy(){}function Oy(t,e){var n=xe,r=Ot(),s=e(),i=!qt(r.memoizedState,s);if(i&&(r.memoizedState=s,ht=!0),r=r.queue,lf(My.bind(null,n,r,t),[t]),r.getSnapshot!==e||i||Le!==null&&Le.memoizedState.tag&1){if(n.flags|=2048,wo(9,Ly.bind(null,n,r,s,e),void 0,null),Fe===null)throw Error(O(349));Lr&30||Dy(n,e,s)}return s}function Dy(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=xe.updateQueue,e===null?(e={lastEffect:null,stores:null},xe.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function Ly(t,e,n,r){e.value=n,e.getSnapshot=r,Fy(e)&&Uy(t)}function My(t,e,n){return n(function(){Fy(e)&&Uy(t)})}function Fy(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!qt(t,n)}catch{return!0}}function Uy(t){var e=In(t,1);e!==null&&Wt(e,t,1,-1)}function ug(t){var e=Zt();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:xo,lastRenderedState:t},e.queue=t,t=t.dispatch=Qk.bind(null,xe,t),[e.memoizedState,t]}function wo(t,e,n,r){return t={tag:t,create:e,destroy:n,deps:r,next:null},e=xe.updateQueue,e===null?(e={lastEffect:null,stores:null},xe.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(r=n.next,n.next=t,t.next=r,e.lastEffect=t)),t}function zy(){return Ot().memoizedState}function Ka(t,e,n,r){var s=Zt();xe.flags|=t,s.memoizedState=wo(1|e,n,void 0,r===void 0?null:r)}function lc(t,e,n,r){var s=Ot();r=r===void 0?null:r;var i=void 0;if(Pe!==null){var o=Pe.memoizedState;if(i=o.destroy,r!==null&&sf(r,o.deps)){s.memoizedState=wo(e,n,i,r);return}}xe.flags|=t,s.memoizedState=wo(1|e,n,i,r)}function dg(t,e){return Ka(8390656,8,t,e)}function lf(t,e){return lc(2048,8,t,e)}function Vy(t,e){return lc(4,2,t,e)}function $y(t,e){return lc(4,4,t,e)}function By(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Hy(t,e,n){return n=n!=null?n.concat([t]):null,lc(4,4,By.bind(null,e,t),n)}function cf(){}function Wy(t,e){var n=Ot();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&sf(e,r[1])?r[0]:(n.memoizedState=[t,e],t)}function Gy(t,e){var n=Ot();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&sf(e,r[1])?r[0]:(t=t(),n.memoizedState=[t,e],t)}function qy(t,e,n){return Lr&21?(qt(n,e)||(n=Jv(),xe.lanes|=n,Mr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,ht=!0),t.memoizedState=n)}function Kk(t,e){var n=ae;ae=n!==0&&4>n?n:4,t(!0);var r=Ou.transition;Ou.transition={};try{t(!1),e()}finally{ae=n,Ou.transition=r}}function Ky(){return Ot().memoizedState}function Yk(t,e,n){var r=sr(t);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Yy(t))Qy(e,n);else if(n=Ry(t,e,n,r),n!==null){var s=st();Wt(n,t,r,s),Xy(n,e,r)}}function Qk(t,e,n){var r=sr(t),s={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Yy(t))Qy(e,s);else{var i=t.alternate;if(t.lanes===0&&(i===null||i.lanes===0)&&(i=e.lastRenderedReducer,i!==null))try{var o=e.lastRenderedState,l=i(o,n);if(s.hasEagerState=!0,s.eagerState=l,qt(l,o)){var u=e.interleaved;u===null?(s.next=s,Zh(e)):(s.next=u.next,u.next=s),e.interleaved=s;return}}catch{}finally{}n=Ry(t,e,s,r),n!==null&&(s=st(),Wt(n,t,r,s),Xy(n,e,r))}}function Yy(t){var e=t.alternate;return t===xe||e!==null&&e===xe}function Qy(t,e){Gi=El=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function Xy(t,e,n){if(n&4194240){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,Uh(t,n)}}var kl={readContext:jt,useCallback:Ke,useContext:Ke,useEffect:Ke,useImperativeHandle:Ke,useInsertionEffect:Ke,useLayoutEffect:Ke,useMemo:Ke,useReducer:Ke,useRef:Ke,useState:Ke,useDebugValue:Ke,useDeferredValue:Ke,useTransition:Ke,useMutableSource:Ke,useSyncExternalStore:Ke,useId:Ke,unstable_isNewReconciler:!1},Xk={readContext:jt,useCallback:function(t,e){return Zt().memoizedState=[t,e===void 0?null:e],t},useContext:jt,useEffect:dg,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,Ka(4194308,4,By.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Ka(4194308,4,t,e)},useInsertionEffect:function(t,e){return Ka(4,2,t,e)},useMemo:function(t,e){var n=Zt();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var r=Zt();return e=n!==void 0?n(e):e,r.memoizedState=r.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},r.queue=t,t=t.dispatch=Yk.bind(null,xe,t),[r.memoizedState,t]},useRef:function(t){var e=Zt();return t={current:t},e.memoizedState=t},useState:ug,useDebugValue:cf,useDeferredValue:function(t){return Zt().memoizedState=t},useTransition:function(){var t=ug(!1),e=t[0];return t=Kk.bind(null,t[1]),Zt().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var r=xe,s=Zt();if(ve){if(n===void 0)throw Error(O(407));n=n()}else{if(n=e(),Fe===null)throw Error(O(349));Lr&30||Dy(r,e,n)}s.memoizedState=n;var i={value:n,getSnapshot:e};return s.queue=i,dg(My.bind(null,r,i,t),[t]),r.flags|=2048,wo(9,Ly.bind(null,r,i,n,e),void 0,null),n},useId:function(){var t=Zt(),e=Fe.identifierPrefix;if(ve){var n=vn,r=gn;n=(r&~(1<<32-Ht(r)-1)).toString(32)+n,e=":"+e+"R"+n,n=_o++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=qk++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},Jk={readContext:jt,useCallback:Wy,useContext:jt,useEffect:lf,useImperativeHandle:Hy,useInsertionEffect:Vy,useLayoutEffect:$y,useMemo:Gy,useReducer:Du,useRef:zy,useState:function(){return Du(xo)},useDebugValue:cf,useDeferredValue:function(t){var e=Ot();return qy(e,Pe.memoizedState,t)},useTransition:function(){var t=Du(xo)[0],e=Ot().memoizedState;return[t,e]},useMutableSource:jy,useSyncExternalStore:Oy,useId:Ky,unstable_isNewReconciler:!1},Zk={readContext:jt,useCallback:Wy,useContext:jt,useEffect:lf,useImperativeHandle:Hy,useInsertionEffect:Vy,useLayoutEffect:$y,useMemo:Gy,useReducer:Lu,useRef:zy,useState:function(){return Lu(xo)},useDebugValue:cf,useDeferredValue:function(t){var e=Ot();return Pe===null?e.memoizedState=t:qy(e,Pe.memoizedState,t)},useTransition:function(){var t=Lu(xo)[0],e=Ot().memoizedState;return[t,e]},useMutableSource:jy,useSyncExternalStore:Oy,useId:Ky,unstable_isNewReconciler:!1};function Ft(t,e){if(t&&t.defaultProps){e=we({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function Ud(t,e,n,r){e=t.memoizedState,n=n(r,e),n=n==null?e:we({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var cc={isMounted:function(t){return(t=t._reactInternals)?Qr(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var r=st(),s=sr(t),i=En(r,s);i.payload=e,n!=null&&(i.callback=n),e=nr(t,i,s),e!==null&&(Wt(e,t,s,r),Ga(e,t,s))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var r=st(),s=sr(t),i=En(r,s);i.tag=1,i.payload=e,n!=null&&(i.callback=n),e=nr(t,i,s),e!==null&&(Wt(e,t,s,r),Ga(e,t,s))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=st(),r=sr(t),s=En(n,r);s.tag=2,e!=null&&(s.callback=e),e=nr(t,s,r),e!==null&&(Wt(e,t,r,n),Ga(e,t,r))}};function hg(t,e,n,r,s,i,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(r,i,o):e.prototype&&e.prototype.isPureReactComponent?!fo(n,r)||!fo(s,i):!0}function Jy(t,e,n){var r=!1,s=dr,i=e.contextType;return typeof i=="object"&&i!==null?i=jt(i):(s=mt(e)?Or:Xe.current,r=e.contextTypes,i=(r=r!=null)?Us(t,s):dr),e=new e(n,i),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=cc,t.stateNode=e,e._reactInternals=t,r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=s,t.__reactInternalMemoizedMaskedChildContext=i),e}function fg(t,e,n,r){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,r),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,r),e.state!==t&&cc.enqueueReplaceState(e,e.state,null)}function zd(t,e,n,r){var s=t.stateNode;s.props=n,s.state=t.memoizedState,s.refs={},ef(t);var i=e.contextType;typeof i=="object"&&i!==null?s.context=jt(i):(i=mt(e)?Or:Xe.current,s.context=Us(t,i)),s.state=t.memoizedState,i=e.getDerivedStateFromProps,typeof i=="function"&&(Ud(t,e,i,n),s.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(e=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),e!==s.state&&cc.enqueueReplaceState(s,s.state,null),xl(t,n,s,r),s.state=t.memoizedState),typeof s.componentDidMount=="function"&&(t.flags|=4194308)}function Bs(t,e){try{var n="",r=e;do n+=IE(r),r=r.return;while(r);var s=n}catch(i){s=`
Error generating stack: `+i.message+`
`+i.stack}return{value:t,source:e,stack:s,digest:null}}function Mu(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function Vd(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var e2=typeof WeakMap=="function"?WeakMap:Map;function Zy(t,e,n){n=En(-1,n),n.tag=3,n.payload={element:null};var r=e.value;return n.callback=function(){Nl||(Nl=!0,Xd=r),Vd(t,e)},n}function e_(t,e,n){n=En(-1,n),n.tag=3;var r=t.type.getDerivedStateFromError;if(typeof r=="function"){var s=e.value;n.payload=function(){return r(s)},n.callback=function(){Vd(t,e)}}var i=t.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){Vd(t,e),typeof r!="function"&&(rr===null?rr=new Set([this]):rr.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function pg(t,e,n){var r=t.pingCache;if(r===null){r=t.pingCache=new e2;var s=new Set;r.set(e,s)}else s=r.get(e),s===void 0&&(s=new Set,r.set(e,s));s.has(n)||(s.add(n),t=p2.bind(null,t,e,n),e.then(t,t))}function mg(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function gg(t,e,n,r,s){return t.mode&1?(t.flags|=65536,t.lanes=s,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=En(-1,1),e.tag=2,nr(n,e,1))),n.lanes|=1),t)}var t2=jn.ReactCurrentOwner,ht=!1;function tt(t,e,n,r){e.child=t===null?by(e,null,n,r):Vs(e,t.child,n,r)}function vg(t,e,n,r,s){n=n.render;var i=e.ref;return Ps(e,s),r=of(t,e,n,r,i,s),n=af(),t!==null&&!ht?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~s,Tn(t,e,s)):(ve&&n&&qh(e),e.flags|=1,tt(t,e,r,s),e.child)}function yg(t,e,n,r,s){if(t===null){var i=n.type;return typeof i=="function"&&!vf(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=i,t_(t,e,i,r,s)):(t=Ja(n.type,null,r,e,e.mode,s),t.ref=e.ref,t.return=e,e.child=t)}if(i=t.child,!(t.lanes&s)){var o=i.memoizedProps;if(n=n.compare,n=n!==null?n:fo,n(o,r)&&t.ref===e.ref)return Tn(t,e,s)}return e.flags|=1,t=ir(i,r),t.ref=e.ref,t.return=e,e.child=t}function t_(t,e,n,r,s){if(t!==null){var i=t.memoizedProps;if(fo(i,r)&&t.ref===e.ref)if(ht=!1,e.pendingProps=r=i,(t.lanes&s)!==0)t.flags&131072&&(ht=!0);else return e.lanes=t.lanes,Tn(t,e,s)}return $d(t,e,n,r,s)}function n_(t,e,n){var r=e.pendingProps,s=r.children,i=t!==null?t.memoizedState:null;if(r.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},he(Ss,_t),_t|=n;else{if(!(n&1073741824))return t=i!==null?i.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,he(Ss,_t),_t|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=i!==null?i.baseLanes:n,he(Ss,_t),_t|=r}else i!==null?(r=i.baseLanes|n,e.memoizedState=null):r=n,he(Ss,_t),_t|=r;return tt(t,e,s,n),e.child}function r_(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function $d(t,e,n,r,s){var i=mt(n)?Or:Xe.current;return i=Us(e,i),Ps(e,s),n=of(t,e,n,r,i,s),r=af(),t!==null&&!ht?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~s,Tn(t,e,s)):(ve&&r&&qh(e),e.flags|=1,tt(t,e,n,s),e.child)}function _g(t,e,n,r,s){if(mt(n)){var i=!0;ml(e)}else i=!1;if(Ps(e,s),e.stateNode===null)Ya(t,e),Jy(e,n,r),zd(e,n,r,s),r=!0;else if(t===null){var o=e.stateNode,l=e.memoizedProps;o.props=l;var u=o.context,h=n.contextType;typeof h=="object"&&h!==null?h=jt(h):(h=mt(n)?Or:Xe.current,h=Us(e,h));var m=n.getDerivedStateFromProps,p=typeof m=="function"||typeof o.getSnapshotBeforeUpdate=="function";p||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==r||u!==h)&&fg(e,o,r,h),Vn=!1;var v=e.memoizedState;o.state=v,xl(e,r,o,s),u=e.memoizedState,l!==r||v!==u||pt.current||Vn?(typeof m=="function"&&(Ud(e,n,m,r),u=e.memoizedState),(l=Vn||hg(e,n,l,r,v,u,h))?(p||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=r,e.memoizedState=u),o.props=r,o.state=u,o.context=h,r=l):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),r=!1)}else{o=e.stateNode,Py(t,e),l=e.memoizedProps,h=e.type===e.elementType?l:Ft(e.type,l),o.props=h,p=e.pendingProps,v=o.context,u=n.contextType,typeof u=="object"&&u!==null?u=jt(u):(u=mt(n)?Or:Xe.current,u=Us(e,u));var S=n.getDerivedStateFromProps;(m=typeof S=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==p||v!==u)&&fg(e,o,r,u),Vn=!1,v=e.memoizedState,o.state=v,xl(e,r,o,s);var I=e.memoizedState;l!==p||v!==I||pt.current||Vn?(typeof S=="function"&&(Ud(e,n,S,r),I=e.memoizedState),(h=Vn||hg(e,n,h,r,v,I,u)||!1)?(m||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,I,u),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,I,u)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&v===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&v===t.memoizedState||(e.flags|=1024),e.memoizedProps=r,e.memoizedState=I),o.props=r,o.state=I,o.context=u,r=h):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&v===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&v===t.memoizedState||(e.flags|=1024),r=!1)}return Bd(t,e,n,r,i,s)}function Bd(t,e,n,r,s,i){r_(t,e);var o=(e.flags&128)!==0;if(!r&&!o)return s&&sg(e,n,!1),Tn(t,e,i);r=e.stateNode,t2.current=e;var l=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return e.flags|=1,t!==null&&o?(e.child=Vs(e,t.child,null,i),e.child=Vs(e,null,l,i)):tt(t,e,l,i),e.memoizedState=r.state,s&&sg(e,n,!0),e.child}function s_(t){var e=t.stateNode;e.pendingContext?rg(t,e.pendingContext,e.pendingContext!==e.context):e.context&&rg(t,e.context,!1),tf(t,e.containerInfo)}function xg(t,e,n,r,s){return zs(),Yh(s),e.flags|=256,tt(t,e,n,r),e.child}var Hd={dehydrated:null,treeContext:null,retryLane:0};function Wd(t){return{baseLanes:t,cachePool:null,transitions:null}}function i_(t,e,n){var r=e.pendingProps,s=ye.current,i=!1,o=(e.flags&128)!==0,l;if((l=o)||(l=t!==null&&t.memoizedState===null?!1:(s&2)!==0),l?(i=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(s|=1),he(ye,s&1),t===null)return Md(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=r.children,t=r.fallback,i?(r=e.mode,i=e.child,o={mode:"hidden",children:o},!(r&1)&&i!==null?(i.childLanes=0,i.pendingProps=o):i=hc(o,r,0,null),t=jr(t,r,n,null),i.return=e,t.return=e,i.sibling=t,e.child=i,e.child.memoizedState=Wd(n),e.memoizedState=Hd,t):uf(e,o));if(s=t.memoizedState,s!==null&&(l=s.dehydrated,l!==null))return n2(t,e,o,r,l,s,n);if(i){i=r.fallback,o=e.mode,s=t.child,l=s.sibling;var u={mode:"hidden",children:r.children};return!(o&1)&&e.child!==s?(r=e.child,r.childLanes=0,r.pendingProps=u,e.deletions=null):(r=ir(s,u),r.subtreeFlags=s.subtreeFlags&14680064),l!==null?i=ir(l,i):(i=jr(i,o,n,null),i.flags|=2),i.return=e,r.return=e,r.sibling=i,e.child=r,r=i,i=e.child,o=t.child.memoizedState,o=o===null?Wd(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},i.memoizedState=o,i.childLanes=t.childLanes&~n,e.memoizedState=Hd,r}return i=t.child,t=i.sibling,r=ir(i,{mode:"visible",children:r.children}),!(e.mode&1)&&(r.lanes=n),r.return=e,r.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=r,e.memoizedState=null,r}function uf(t,e){return e=hc({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function Pa(t,e,n,r){return r!==null&&Yh(r),Vs(e,t.child,null,n),t=uf(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function n2(t,e,n,r,s,i,o){if(n)return e.flags&256?(e.flags&=-257,r=Mu(Error(O(422))),Pa(t,e,o,r)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(i=r.fallback,s=e.mode,r=hc({mode:"visible",children:r.children},s,0,null),i=jr(i,s,o,null),i.flags|=2,r.return=e,i.return=e,r.sibling=i,e.child=r,e.mode&1&&Vs(e,t.child,null,o),e.child.memoizedState=Wd(o),e.memoizedState=Hd,i);if(!(e.mode&1))return Pa(t,e,o,null);if(s.data==="$!"){if(r=s.nextSibling&&s.nextSibling.dataset,r)var l=r.dgst;return r=l,i=Error(O(419)),r=Mu(i,r,void 0),Pa(t,e,o,r)}if(l=(o&t.childLanes)!==0,ht||l){if(r=Fe,r!==null){switch(o&-o){case 4:s=2;break;case 16:s=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:s=32;break;case 536870912:s=268435456;break;default:s=0}s=s&(r.suspendedLanes|o)?0:s,s!==0&&s!==i.retryLane&&(i.retryLane=s,In(t,s),Wt(r,t,s,-1))}return gf(),r=Mu(Error(O(421))),Pa(t,e,o,r)}return s.data==="$?"?(e.flags|=128,e.child=t.child,e=m2.bind(null,t),s._reactRetry=e,null):(t=i.treeContext,xt=tr(s.nextSibling),wt=e,ve=!0,zt=null,t!==null&&(Tt[bt++]=gn,Tt[bt++]=vn,Tt[bt++]=Dr,gn=t.id,vn=t.overflow,Dr=e),e=uf(e,r.children),e.flags|=4096,e)}function wg(t,e,n){t.lanes|=e;var r=t.alternate;r!==null&&(r.lanes|=e),Fd(t.return,e,n)}function Fu(t,e,n,r,s){var i=t.memoizedState;i===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:s}:(i.isBackwards=e,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=s)}function o_(t,e,n){var r=e.pendingProps,s=r.revealOrder,i=r.tail;if(tt(t,e,r.children,n),r=ye.current,r&2)r=r&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&wg(t,n,e);else if(t.tag===19)wg(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}r&=1}if(he(ye,r),!(e.mode&1))e.memoizedState=null;else switch(s){case"forwards":for(n=e.child,s=null;n!==null;)t=n.alternate,t!==null&&wl(t)===null&&(s=n),n=n.sibling;n=s,n===null?(s=e.child,e.child=null):(s=n.sibling,n.sibling=null),Fu(e,!1,s,n,i);break;case"backwards":for(n=null,s=e.child,e.child=null;s!==null;){if(t=s.alternate,t!==null&&wl(t)===null){e.child=s;break}t=s.sibling,s.sibling=n,n=s,s=t}Fu(e,!0,n,null,i);break;case"together":Fu(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function Ya(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Tn(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Mr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(O(153));if(e.child!==null){for(t=e.child,n=ir(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=ir(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function r2(t,e,n){switch(e.tag){case 3:s_(e),zs();break;case 5:Ay(e);break;case 1:mt(e.type)&&ml(e);break;case 4:tf(e,e.stateNode.containerInfo);break;case 10:var r=e.type._context,s=e.memoizedProps.value;he(yl,r._currentValue),r._currentValue=s;break;case 13:if(r=e.memoizedState,r!==null)return r.dehydrated!==null?(he(ye,ye.current&1),e.flags|=128,null):n&e.child.childLanes?i_(t,e,n):(he(ye,ye.current&1),t=Tn(t,e,n),t!==null?t.sibling:null);he(ye,ye.current&1);break;case 19:if(r=(n&e.childLanes)!==0,t.flags&128){if(r)return o_(t,e,n);e.flags|=128}if(s=e.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),he(ye,ye.current),r)break;return null;case 22:case 23:return e.lanes=0,n_(t,e,n)}return Tn(t,e,n)}var a_,Gd,l_,c_;a_=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Gd=function(){};l_=function(t,e,n,r){var s=t.memoizedProps;if(s!==r){t=e.stateNode,br(rn.current);var i=null;switch(n){case"input":s=pd(t,s),r=pd(t,r),i=[];break;case"select":s=we({},s,{value:void 0}),r=we({},r,{value:void 0}),i=[];break;case"textarea":s=vd(t,s),r=vd(t,r),i=[];break;default:typeof s.onClick!="function"&&typeof r.onClick=="function"&&(t.onclick=fl)}_d(n,r);var o;n=null;for(h in s)if(!r.hasOwnProperty(h)&&s.hasOwnProperty(h)&&s[h]!=null)if(h==="style"){var l=s[h];for(o in l)l.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else h!=="dangerouslySetInnerHTML"&&h!=="children"&&h!=="suppressContentEditableWarning"&&h!=="suppressHydrationWarning"&&h!=="autoFocus"&&(io.hasOwnProperty(h)?i||(i=[]):(i=i||[]).push(h,null));for(h in r){var u=r[h];if(l=s!=null?s[h]:void 0,r.hasOwnProperty(h)&&u!==l&&(u!=null||l!=null))if(h==="style")if(l){for(o in l)!l.hasOwnProperty(o)||u&&u.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in u)u.hasOwnProperty(o)&&l[o]!==u[o]&&(n||(n={}),n[o]=u[o])}else n||(i||(i=[]),i.push(h,n)),n=u;else h==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,l=l?l.__html:void 0,u!=null&&l!==u&&(i=i||[]).push(h,u)):h==="children"?typeof u!="string"&&typeof u!="number"||(i=i||[]).push(h,""+u):h!=="suppressContentEditableWarning"&&h!=="suppressHydrationWarning"&&(io.hasOwnProperty(h)?(u!=null&&h==="onScroll"&&me("scroll",t),i||l===u||(i=[])):(i=i||[]).push(h,u))}n&&(i=i||[]).push("style",n);var h=i;(e.updateQueue=h)&&(e.flags|=4)}};c_=function(t,e,n,r){n!==r&&(e.flags|=4)};function Ti(t,e){if(!ve)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:r.sibling=null}}function Ye(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,r=0;if(e)for(var s=t.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags&14680064,r|=s.flags&14680064,s.return=t,s=s.sibling;else for(s=t.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags,r|=s.flags,s.return=t,s=s.sibling;return t.subtreeFlags|=r,t.childLanes=n,e}function s2(t,e,n){var r=e.pendingProps;switch(Kh(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ye(e),null;case 1:return mt(e.type)&&pl(),Ye(e),null;case 3:return r=e.stateNode,$s(),ge(pt),ge(Xe),rf(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(t===null||t.child===null)&&(ba(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,zt!==null&&(eh(zt),zt=null))),Gd(t,e),Ye(e),null;case 5:nf(e);var s=br(yo.current);if(n=e.type,t!==null&&e.stateNode!=null)l_(t,e,n,r,s),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!r){if(e.stateNode===null)throw Error(O(166));return Ye(e),null}if(t=br(rn.current),ba(e)){r=e.stateNode,n=e.type;var i=e.memoizedProps;switch(r[en]=e,r[go]=i,t=(e.mode&1)!==0,n){case"dialog":me("cancel",r),me("close",r);break;case"iframe":case"object":case"embed":me("load",r);break;case"video":case"audio":for(s=0;s<Fi.length;s++)me(Fi[s],r);break;case"source":me("error",r);break;case"img":case"image":case"link":me("error",r),me("load",r);break;case"details":me("toggle",r);break;case"input":Rm(r,i),me("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},me("invalid",r);break;case"textarea":Am(r,i),me("invalid",r)}_d(n,i),s=null;for(var o in i)if(i.hasOwnProperty(o)){var l=i[o];o==="children"?typeof l=="string"?r.textContent!==l&&(i.suppressHydrationWarning!==!0&&Ta(r.textContent,l,t),s=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(i.suppressHydrationWarning!==!0&&Ta(r.textContent,l,t),s=["children",""+l]):io.hasOwnProperty(o)&&l!=null&&o==="onScroll"&&me("scroll",r)}switch(n){case"input":xa(r),Pm(r,i,!0);break;case"textarea":xa(r),jm(r);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(r.onclick=fl)}r=s,e.updateQueue=r,r!==null&&(e.flags|=4)}else{o=s.nodeType===9?s:s.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=Mv(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof r.is=="string"?t=o.createElement(n,{is:r.is}):(t=o.createElement(n),n==="select"&&(o=t,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):t=o.createElementNS(t,n),t[en]=e,t[go]=r,a_(t,e,!1,!1),e.stateNode=t;e:{switch(o=xd(n,r),n){case"dialog":me("cancel",t),me("close",t),s=r;break;case"iframe":case"object":case"embed":me("load",t),s=r;break;case"video":case"audio":for(s=0;s<Fi.length;s++)me(Fi[s],t);s=r;break;case"source":me("error",t),s=r;break;case"img":case"image":case"link":me("error",t),me("load",t),s=r;break;case"details":me("toggle",t),s=r;break;case"input":Rm(t,r),s=pd(t,r),me("invalid",t);break;case"option":s=r;break;case"select":t._wrapperState={wasMultiple:!!r.multiple},s=we({},r,{value:void 0}),me("invalid",t);break;case"textarea":Am(t,r),s=vd(t,r),me("invalid",t);break;default:s=r}_d(n,s),l=s;for(i in l)if(l.hasOwnProperty(i)){var u=l[i];i==="style"?zv(t,u):i==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&Fv(t,u)):i==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&oo(t,u):typeof u=="number"&&oo(t,""+u):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(io.hasOwnProperty(i)?u!=null&&i==="onScroll"&&me("scroll",t):u!=null&&jh(t,i,u,o))}switch(n){case"input":xa(t),Pm(t,r,!1);break;case"textarea":xa(t),jm(t);break;case"option":r.value!=null&&t.setAttribute("value",""+ur(r.value));break;case"select":t.multiple=!!r.multiple,i=r.value,i!=null?Is(t,!!r.multiple,i,!1):r.defaultValue!=null&&Is(t,!!r.multiple,r.defaultValue,!0);break;default:typeof s.onClick=="function"&&(t.onclick=fl)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Ye(e),null;case 6:if(t&&e.stateNode!=null)c_(t,e,t.memoizedProps,r);else{if(typeof r!="string"&&e.stateNode===null)throw Error(O(166));if(n=br(yo.current),br(rn.current),ba(e)){if(r=e.stateNode,n=e.memoizedProps,r[en]=e,(i=r.nodeValue!==n)&&(t=wt,t!==null))switch(t.tag){case 3:Ta(r.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&Ta(r.nodeValue,n,(t.mode&1)!==0)}i&&(e.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[en]=e,e.stateNode=r}return Ye(e),null;case 13:if(ge(ye),r=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(ve&&xt!==null&&e.mode&1&&!(e.flags&128))Iy(),zs(),e.flags|=98560,i=!1;else if(i=ba(e),r!==null&&r.dehydrated!==null){if(t===null){if(!i)throw Error(O(318));if(i=e.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(O(317));i[en]=e}else zs(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Ye(e),i=!1}else zt!==null&&(eh(zt),zt=null),i=!0;if(!i)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(r=r!==null,r!==(t!==null&&t.memoizedState!==null)&&r&&(e.child.flags|=8192,e.mode&1&&(t===null||ye.current&1?je===0&&(je=3):gf())),e.updateQueue!==null&&(e.flags|=4),Ye(e),null);case 4:return $s(),Gd(t,e),t===null&&po(e.stateNode.containerInfo),Ye(e),null;case 10:return Jh(e.type._context),Ye(e),null;case 17:return mt(e.type)&&pl(),Ye(e),null;case 19:if(ge(ye),i=e.memoizedState,i===null)return Ye(e),null;if(r=(e.flags&128)!==0,o=i.rendering,o===null)if(r)Ti(i,!1);else{if(je!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=wl(t),o!==null){for(e.flags|=128,Ti(i,!1),r=o.updateQueue,r!==null&&(e.updateQueue=r,e.flags|=4),e.subtreeFlags=0,r=n,n=e.child;n!==null;)i=n,t=r,i.flags&=14680066,o=i.alternate,o===null?(i.childLanes=0,i.lanes=t,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=o.childLanes,i.lanes=o.lanes,i.child=o.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=o.memoizedProps,i.memoizedState=o.memoizedState,i.updateQueue=o.updateQueue,i.type=o.type,t=o.dependencies,i.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return he(ye,ye.current&1|2),e.child}t=t.sibling}i.tail!==null&&Ne()>Hs&&(e.flags|=128,r=!0,Ti(i,!1),e.lanes=4194304)}else{if(!r)if(t=wl(o),t!==null){if(e.flags|=128,r=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),Ti(i,!0),i.tail===null&&i.tailMode==="hidden"&&!o.alternate&&!ve)return Ye(e),null}else 2*Ne()-i.renderingStartTime>Hs&&n!==1073741824&&(e.flags|=128,r=!0,Ti(i,!1),e.lanes=4194304);i.isBackwards?(o.sibling=e.child,e.child=o):(n=i.last,n!==null?n.sibling=o:e.child=o,i.last=o)}return i.tail!==null?(e=i.tail,i.rendering=e,i.tail=e.sibling,i.renderingStartTime=Ne(),e.sibling=null,n=ye.current,he(ye,r?n&1|2:n&1),e):(Ye(e),null);case 22:case 23:return mf(),r=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==r&&(e.flags|=8192),r&&e.mode&1?_t&1073741824&&(Ye(e),e.subtreeFlags&6&&(e.flags|=8192)):Ye(e),null;case 24:return null;case 25:return null}throw Error(O(156,e.tag))}function i2(t,e){switch(Kh(e),e.tag){case 1:return mt(e.type)&&pl(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return $s(),ge(pt),ge(Xe),rf(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return nf(e),null;case 13:if(ge(ye),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(O(340));zs()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return ge(ye),null;case 4:return $s(),null;case 10:return Jh(e.type._context),null;case 22:case 23:return mf(),null;case 24:return null;default:return null}}var Aa=!1,Qe=!1,o2=typeof WeakSet=="function"?WeakSet:Set,V=null;function ks(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){Ee(t,e,r)}else n.current=null}function qd(t,e,n){try{n()}catch(r){Ee(t,e,r)}}var Eg=!1;function a2(t,e){if(Rd=ul,t=py(),Gh(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var s=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var o=0,l=-1,u=-1,h=0,m=0,p=t,v=null;t:for(;;){for(var S;p!==n||s!==0&&p.nodeType!==3||(l=o+s),p!==i||r!==0&&p.nodeType!==3||(u=o+r),p.nodeType===3&&(o+=p.nodeValue.length),(S=p.firstChild)!==null;)v=p,p=S;for(;;){if(p===t)break t;if(v===n&&++h===s&&(l=o),v===i&&++m===r&&(u=o),(S=p.nextSibling)!==null)break;p=v,v=p.parentNode}p=S}n=l===-1||u===-1?null:{start:l,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(Pd={focusedElem:t,selectionRange:n},ul=!1,V=e;V!==null;)if(e=V,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,V=t;else for(;V!==null;){e=V;try{var I=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(I!==null){var P=I.memoizedProps,D=I.memoizedState,T=e.stateNode,x=T.getSnapshotBeforeUpdate(e.elementType===e.type?P:Ft(e.type,P),D);T.__reactInternalSnapshotBeforeUpdate=x}break;case 3:var N=e.stateNode.containerInfo;N.nodeType===1?N.textContent="":N.nodeType===9&&N.documentElement&&N.removeChild(N.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(O(163))}}catch(j){Ee(e,e.return,j)}if(t=e.sibling,t!==null){t.return=e.return,V=t;break}V=e.return}return I=Eg,Eg=!1,I}function qi(t,e,n){var r=e.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var s=r=r.next;do{if((s.tag&t)===t){var i=s.destroy;s.destroy=void 0,i!==void 0&&qd(e,n,i)}s=s.next}while(s!==r)}}function uc(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var r=n.create;n.destroy=r()}n=n.next}while(n!==e)}}function Kd(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function u_(t){var e=t.alternate;e!==null&&(t.alternate=null,u_(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[en],delete e[go],delete e[Od],delete e[Bk],delete e[Hk])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function d_(t){return t.tag===5||t.tag===3||t.tag===4}function kg(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||d_(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Yd(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=fl));else if(r!==4&&(t=t.child,t!==null))for(Yd(t,e,n),t=t.sibling;t!==null;)Yd(t,e,n),t=t.sibling}function Qd(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(r!==4&&(t=t.child,t!==null))for(Qd(t,e,n),t=t.sibling;t!==null;)Qd(t,e,n),t=t.sibling}var ze=null,Ut=!1;function Fn(t,e,n){for(n=n.child;n!==null;)h_(t,e,n),n=n.sibling}function h_(t,e,n){if(nn&&typeof nn.onCommitFiberUnmount=="function")try{nn.onCommitFiberUnmount(nc,n)}catch{}switch(n.tag){case 5:Qe||ks(n,e);case 6:var r=ze,s=Ut;ze=null,Fn(t,e,n),ze=r,Ut=s,ze!==null&&(Ut?(t=ze,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):ze.removeChild(n.stateNode));break;case 18:ze!==null&&(Ut?(t=ze,n=n.stateNode,t.nodeType===8?Pu(t.parentNode,n):t.nodeType===1&&Pu(t,n),uo(t)):Pu(ze,n.stateNode));break;case 4:r=ze,s=Ut,ze=n.stateNode.containerInfo,Ut=!0,Fn(t,e,n),ze=r,Ut=s;break;case 0:case 11:case 14:case 15:if(!Qe&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){s=r=r.next;do{var i=s,o=i.destroy;i=i.tag,o!==void 0&&(i&2||i&4)&&qd(n,e,o),s=s.next}while(s!==r)}Fn(t,e,n);break;case 1:if(!Qe&&(ks(n,e),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){Ee(n,e,l)}Fn(t,e,n);break;case 21:Fn(t,e,n);break;case 22:n.mode&1?(Qe=(r=Qe)||n.memoizedState!==null,Fn(t,e,n),Qe=r):Fn(t,e,n);break;default:Fn(t,e,n)}}function Sg(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new o2),e.forEach(function(r){var s=g2.bind(null,t,r);n.has(r)||(n.add(r),r.then(s,s))})}}function Mt(t,e){var n=e.deletions;if(n!==null)for(var r=0;r<n.length;r++){var s=n[r];try{var i=t,o=e,l=o;e:for(;l!==null;){switch(l.tag){case 5:ze=l.stateNode,Ut=!1;break e;case 3:ze=l.stateNode.containerInfo,Ut=!0;break e;case 4:ze=l.stateNode.containerInfo,Ut=!0;break e}l=l.return}if(ze===null)throw Error(O(160));h_(i,o,s),ze=null,Ut=!1;var u=s.alternate;u!==null&&(u.return=null),s.return=null}catch(h){Ee(s,e,h)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)f_(e,t),e=e.sibling}function f_(t,e){var n=t.alternate,r=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Mt(e,t),Jt(t),r&4){try{qi(3,t,t.return),uc(3,t)}catch(P){Ee(t,t.return,P)}try{qi(5,t,t.return)}catch(P){Ee(t,t.return,P)}}break;case 1:Mt(e,t),Jt(t),r&512&&n!==null&&ks(n,n.return);break;case 5:if(Mt(e,t),Jt(t),r&512&&n!==null&&ks(n,n.return),t.flags&32){var s=t.stateNode;try{oo(s,"")}catch(P){Ee(t,t.return,P)}}if(r&4&&(s=t.stateNode,s!=null)){var i=t.memoizedProps,o=n!==null?n.memoizedProps:i,l=t.type,u=t.updateQueue;if(t.updateQueue=null,u!==null)try{l==="input"&&i.type==="radio"&&i.name!=null&&Dv(s,i),xd(l,o);var h=xd(l,i);for(o=0;o<u.length;o+=2){var m=u[o],p=u[o+1];m==="style"?zv(s,p):m==="dangerouslySetInnerHTML"?Fv(s,p):m==="children"?oo(s,p):jh(s,m,p,h)}switch(l){case"input":md(s,i);break;case"textarea":Lv(s,i);break;case"select":var v=s._wrapperState.wasMultiple;s._wrapperState.wasMultiple=!!i.multiple;var S=i.value;S!=null?Is(s,!!i.multiple,S,!1):v!==!!i.multiple&&(i.defaultValue!=null?Is(s,!!i.multiple,i.defaultValue,!0):Is(s,!!i.multiple,i.multiple?[]:"",!1))}s[go]=i}catch(P){Ee(t,t.return,P)}}break;case 6:if(Mt(e,t),Jt(t),r&4){if(t.stateNode===null)throw Error(O(162));s=t.stateNode,i=t.memoizedProps;try{s.nodeValue=i}catch(P){Ee(t,t.return,P)}}break;case 3:if(Mt(e,t),Jt(t),r&4&&n!==null&&n.memoizedState.isDehydrated)try{uo(e.containerInfo)}catch(P){Ee(t,t.return,P)}break;case 4:Mt(e,t),Jt(t);break;case 13:Mt(e,t),Jt(t),s=t.child,s.flags&8192&&(i=s.memoizedState!==null,s.stateNode.isHidden=i,!i||s.alternate!==null&&s.alternate.memoizedState!==null||(ff=Ne())),r&4&&Sg(t);break;case 22:if(m=n!==null&&n.memoizedState!==null,t.mode&1?(Qe=(h=Qe)||m,Mt(e,t),Qe=h):Mt(e,t),Jt(t),r&8192){if(h=t.memoizedState!==null,(t.stateNode.isHidden=h)&&!m&&t.mode&1)for(V=t,m=t.child;m!==null;){for(p=V=m;V!==null;){switch(v=V,S=v.child,v.tag){case 0:case 11:case 14:case 15:qi(4,v,v.return);break;case 1:ks(v,v.return);var I=v.stateNode;if(typeof I.componentWillUnmount=="function"){r=v,n=v.return;try{e=r,I.props=e.memoizedProps,I.state=e.memoizedState,I.componentWillUnmount()}catch(P){Ee(r,n,P)}}break;case 5:ks(v,v.return);break;case 22:if(v.memoizedState!==null){Cg(p);continue}}S!==null?(S.return=v,V=S):Cg(p)}m=m.sibling}e:for(m=null,p=t;;){if(p.tag===5){if(m===null){m=p;try{s=p.stateNode,h?(i=s.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(l=p.stateNode,u=p.memoizedProps.style,o=u!=null&&u.hasOwnProperty("display")?u.display:null,l.style.display=Uv("display",o))}catch(P){Ee(t,t.return,P)}}}else if(p.tag===6){if(m===null)try{p.stateNode.nodeValue=h?"":p.memoizedProps}catch(P){Ee(t,t.return,P)}}else if((p.tag!==22&&p.tag!==23||p.memoizedState===null||p===t)&&p.child!==null){p.child.return=p,p=p.child;continue}if(p===t)break e;for(;p.sibling===null;){if(p.return===null||p.return===t)break e;m===p&&(m=null),p=p.return}m===p&&(m=null),p.sibling.return=p.return,p=p.sibling}}break;case 19:Mt(e,t),Jt(t),r&4&&Sg(t);break;case 21:break;default:Mt(e,t),Jt(t)}}function Jt(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(d_(n)){var r=n;break e}n=n.return}throw Error(O(160))}switch(r.tag){case 5:var s=r.stateNode;r.flags&32&&(oo(s,""),r.flags&=-33);var i=kg(t);Qd(t,i,s);break;case 3:case 4:var o=r.stateNode.containerInfo,l=kg(t);Yd(t,l,o);break;default:throw Error(O(161))}}catch(u){Ee(t,t.return,u)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function l2(t,e,n){V=t,p_(t)}function p_(t,e,n){for(var r=(t.mode&1)!==0;V!==null;){var s=V,i=s.child;if(s.tag===22&&r){var o=s.memoizedState!==null||Aa;if(!o){var l=s.alternate,u=l!==null&&l.memoizedState!==null||Qe;l=Aa;var h=Qe;if(Aa=o,(Qe=u)&&!h)for(V=s;V!==null;)o=V,u=o.child,o.tag===22&&o.memoizedState!==null?Ig(s):u!==null?(u.return=o,V=u):Ig(s);for(;i!==null;)V=i,p_(i),i=i.sibling;V=s,Aa=l,Qe=h}Ng(t)}else s.subtreeFlags&8772&&i!==null?(i.return=s,V=i):Ng(t)}}function Ng(t){for(;V!==null;){var e=V;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:Qe||uc(5,e);break;case 1:var r=e.stateNode;if(e.flags&4&&!Qe)if(n===null)r.componentDidMount();else{var s=e.elementType===e.type?n.memoizedProps:Ft(e.type,n.memoizedProps);r.componentDidUpdate(s,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=e.updateQueue;i!==null&&cg(e,i,r);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}cg(e,o,n)}break;case 5:var l=e.stateNode;if(n===null&&e.flags&4){n=l;var u=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var h=e.alternate;if(h!==null){var m=h.memoizedState;if(m!==null){var p=m.dehydrated;p!==null&&uo(p)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(O(163))}Qe||e.flags&512&&Kd(e)}catch(v){Ee(e,e.return,v)}}if(e===t){V=null;break}if(n=e.sibling,n!==null){n.return=e.return,V=n;break}V=e.return}}function Cg(t){for(;V!==null;){var e=V;if(e===t){V=null;break}var n=e.sibling;if(n!==null){n.return=e.return,V=n;break}V=e.return}}function Ig(t){for(;V!==null;){var e=V;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{uc(4,e)}catch(u){Ee(e,n,u)}break;case 1:var r=e.stateNode;if(typeof r.componentDidMount=="function"){var s=e.return;try{r.componentDidMount()}catch(u){Ee(e,s,u)}}var i=e.return;try{Kd(e)}catch(u){Ee(e,i,u)}break;case 5:var o=e.return;try{Kd(e)}catch(u){Ee(e,o,u)}}}catch(u){Ee(e,e.return,u)}if(e===t){V=null;break}var l=e.sibling;if(l!==null){l.return=e.return,V=l;break}V=e.return}}var c2=Math.ceil,Sl=jn.ReactCurrentDispatcher,df=jn.ReactCurrentOwner,At=jn.ReactCurrentBatchConfig,te=0,Fe=null,Ie=null,$e=0,_t=0,Ss=gr(0),je=0,Eo=null,Mr=0,dc=0,hf=0,Ki=null,ct=null,ff=0,Hs=1/0,pn=null,Nl=!1,Xd=null,rr=null,ja=!1,Qn=null,Cl=0,Yi=0,Jd=null,Qa=-1,Xa=0;function st(){return te&6?Ne():Qa!==-1?Qa:Qa=Ne()}function sr(t){return t.mode&1?te&2&&$e!==0?$e&-$e:Gk.transition!==null?(Xa===0&&(Xa=Jv()),Xa):(t=ae,t!==0||(t=window.event,t=t===void 0?16:iy(t.type)),t):1}function Wt(t,e,n,r){if(50<Yi)throw Yi=0,Jd=null,Error(O(185));Fo(t,n,r),(!(te&2)||t!==Fe)&&(t===Fe&&(!(te&2)&&(dc|=n),je===4&&Hn(t,$e)),gt(t,r),n===1&&te===0&&!(e.mode&1)&&(Hs=Ne()+500,ac&&vr()))}function gt(t,e){var n=t.callbackNode;GE(t,e);var r=cl(t,t===Fe?$e:0);if(r===0)n!==null&&Lm(n),t.callbackNode=null,t.callbackPriority=0;else if(e=r&-r,t.callbackPriority!==e){if(n!=null&&Lm(n),e===1)t.tag===0?Wk(Tg.bind(null,t)):Sy(Tg.bind(null,t)),Vk(function(){!(te&6)&&vr()}),n=null;else{switch(Zv(r)){case 1:n=Fh;break;case 4:n=Qv;break;case 16:n=ll;break;case 536870912:n=Xv;break;default:n=ll}n=E_(n,m_.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function m_(t,e){if(Qa=-1,Xa=0,te&6)throw Error(O(327));var n=t.callbackNode;if(As()&&t.callbackNode!==n)return null;var r=cl(t,t===Fe?$e:0);if(r===0)return null;if(r&30||r&t.expiredLanes||e)e=Il(t,r);else{e=r;var s=te;te|=2;var i=v_();(Fe!==t||$e!==e)&&(pn=null,Hs=Ne()+500,Ar(t,e));do try{h2();break}catch(l){g_(t,l)}while(!0);Xh(),Sl.current=i,te=s,Ie!==null?e=0:(Fe=null,$e=0,e=je)}if(e!==0){if(e===2&&(s=Nd(t),s!==0&&(r=s,e=Zd(t,s))),e===1)throw n=Eo,Ar(t,0),Hn(t,r),gt(t,Ne()),n;if(e===6)Hn(t,r);else{if(s=t.current.alternate,!(r&30)&&!u2(s)&&(e=Il(t,r),e===2&&(i=Nd(t),i!==0&&(r=i,e=Zd(t,i))),e===1))throw n=Eo,Ar(t,0),Hn(t,r),gt(t,Ne()),n;switch(t.finishedWork=s,t.finishedLanes=r,e){case 0:case 1:throw Error(O(345));case 2:Sr(t,ct,pn);break;case 3:if(Hn(t,r),(r&130023424)===r&&(e=ff+500-Ne(),10<e)){if(cl(t,0)!==0)break;if(s=t.suspendedLanes,(s&r)!==r){st(),t.pingedLanes|=t.suspendedLanes&s;break}t.timeoutHandle=jd(Sr.bind(null,t,ct,pn),e);break}Sr(t,ct,pn);break;case 4:if(Hn(t,r),(r&4194240)===r)break;for(e=t.eventTimes,s=-1;0<r;){var o=31-Ht(r);i=1<<o,o=e[o],o>s&&(s=o),r&=~i}if(r=s,r=Ne()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*c2(r/1960))-r,10<r){t.timeoutHandle=jd(Sr.bind(null,t,ct,pn),r);break}Sr(t,ct,pn);break;case 5:Sr(t,ct,pn);break;default:throw Error(O(329))}}}return gt(t,Ne()),t.callbackNode===n?m_.bind(null,t):null}function Zd(t,e){var n=Ki;return t.current.memoizedState.isDehydrated&&(Ar(t,e).flags|=256),t=Il(t,e),t!==2&&(e=ct,ct=n,e!==null&&eh(e)),t}function eh(t){ct===null?ct=t:ct.push.apply(ct,t)}function u2(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var s=n[r],i=s.getSnapshot;s=s.value;try{if(!qt(i(),s))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Hn(t,e){for(e&=~hf,e&=~dc,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-Ht(e),r=1<<n;t[n]=-1,e&=~r}}function Tg(t){if(te&6)throw Error(O(327));As();var e=cl(t,0);if(!(e&1))return gt(t,Ne()),null;var n=Il(t,e);if(t.tag!==0&&n===2){var r=Nd(t);r!==0&&(e=r,n=Zd(t,r))}if(n===1)throw n=Eo,Ar(t,0),Hn(t,e),gt(t,Ne()),n;if(n===6)throw Error(O(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,Sr(t,ct,pn),gt(t,Ne()),null}function pf(t,e){var n=te;te|=1;try{return t(e)}finally{te=n,te===0&&(Hs=Ne()+500,ac&&vr())}}function Fr(t){Qn!==null&&Qn.tag===0&&!(te&6)&&As();var e=te;te|=1;var n=At.transition,r=ae;try{if(At.transition=null,ae=1,t)return t()}finally{ae=r,At.transition=n,te=e,!(te&6)&&vr()}}function mf(){_t=Ss.current,ge(Ss)}function Ar(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,zk(n)),Ie!==null)for(n=Ie.return;n!==null;){var r=n;switch(Kh(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&pl();break;case 3:$s(),ge(pt),ge(Xe),rf();break;case 5:nf(r);break;case 4:$s();break;case 13:ge(ye);break;case 19:ge(ye);break;case 10:Jh(r.type._context);break;case 22:case 23:mf()}n=n.return}if(Fe=t,Ie=t=ir(t.current,null),$e=_t=e,je=0,Eo=null,hf=dc=Mr=0,ct=Ki=null,Tr!==null){for(e=0;e<Tr.length;e++)if(n=Tr[e],r=n.interleaved,r!==null){n.interleaved=null;var s=r.next,i=n.pending;if(i!==null){var o=i.next;i.next=s,r.next=o}n.pending=r}Tr=null}return t}function g_(t,e){do{var n=Ie;try{if(Xh(),qa.current=kl,El){for(var r=xe.memoizedState;r!==null;){var s=r.queue;s!==null&&(s.pending=null),r=r.next}El=!1}if(Lr=0,Le=Pe=xe=null,Gi=!1,_o=0,df.current=null,n===null||n.return===null){je=1,Eo=e,Ie=null;break}e:{var i=t,o=n.return,l=n,u=e;if(e=$e,l.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var h=u,m=l,p=m.tag;if(!(m.mode&1)&&(p===0||p===11||p===15)){var v=m.alternate;v?(m.updateQueue=v.updateQueue,m.memoizedState=v.memoizedState,m.lanes=v.lanes):(m.updateQueue=null,m.memoizedState=null)}var S=mg(o);if(S!==null){S.flags&=-257,gg(S,o,l,i,e),S.mode&1&&pg(i,h,e),e=S,u=h;var I=e.updateQueue;if(I===null){var P=new Set;P.add(u),e.updateQueue=P}else I.add(u);break e}else{if(!(e&1)){pg(i,h,e),gf();break e}u=Error(O(426))}}else if(ve&&l.mode&1){var D=mg(o);if(D!==null){!(D.flags&65536)&&(D.flags|=256),gg(D,o,l,i,e),Yh(Bs(u,l));break e}}i=u=Bs(u,l),je!==4&&(je=2),Ki===null?Ki=[i]:Ki.push(i),i=o;do{switch(i.tag){case 3:i.flags|=65536,e&=-e,i.lanes|=e;var T=Zy(i,u,e);lg(i,T);break e;case 1:l=u;var x=i.type,N=i.stateNode;if(!(i.flags&128)&&(typeof x.getDerivedStateFromError=="function"||N!==null&&typeof N.componentDidCatch=="function"&&(rr===null||!rr.has(N)))){i.flags|=65536,e&=-e,i.lanes|=e;var j=e_(i,l,e);lg(i,j);break e}}i=i.return}while(i!==null)}__(n)}catch(M){e=M,Ie===n&&n!==null&&(Ie=n=n.return);continue}break}while(!0)}function v_(){var t=Sl.current;return Sl.current=kl,t===null?kl:t}function gf(){(je===0||je===3||je===2)&&(je=4),Fe===null||!(Mr&268435455)&&!(dc&268435455)||Hn(Fe,$e)}function Il(t,e){var n=te;te|=2;var r=v_();(Fe!==t||$e!==e)&&(pn=null,Ar(t,e));do try{d2();break}catch(s){g_(t,s)}while(!0);if(Xh(),te=n,Sl.current=r,Ie!==null)throw Error(O(261));return Fe=null,$e=0,je}function d2(){for(;Ie!==null;)y_(Ie)}function h2(){for(;Ie!==null&&!ME();)y_(Ie)}function y_(t){var e=w_(t.alternate,t,_t);t.memoizedProps=t.pendingProps,e===null?__(t):Ie=e,df.current=null}function __(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=i2(n,e),n!==null){n.flags&=32767,Ie=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{je=6,Ie=null;return}}else if(n=s2(n,e,_t),n!==null){Ie=n;return}if(e=e.sibling,e!==null){Ie=e;return}Ie=e=t}while(e!==null);je===0&&(je=5)}function Sr(t,e,n){var r=ae,s=At.transition;try{At.transition=null,ae=1,f2(t,e,n,r)}finally{At.transition=s,ae=r}return null}function f2(t,e,n,r){do As();while(Qn!==null);if(te&6)throw Error(O(327));n=t.finishedWork;var s=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(O(177));t.callbackNode=null,t.callbackPriority=0;var i=n.lanes|n.childLanes;if(qE(t,i),t===Fe&&(Ie=Fe=null,$e=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||ja||(ja=!0,E_(ll,function(){return As(),null})),i=(n.flags&15990)!==0,n.subtreeFlags&15990||i){i=At.transition,At.transition=null;var o=ae;ae=1;var l=te;te|=4,df.current=null,a2(t,n),f_(n,t),jk(Pd),ul=!!Rd,Pd=Rd=null,t.current=n,l2(n),FE(),te=l,ae=o,At.transition=i}else t.current=n;if(ja&&(ja=!1,Qn=t,Cl=s),i=t.pendingLanes,i===0&&(rr=null),VE(n.stateNode),gt(t,Ne()),e!==null)for(r=t.onRecoverableError,n=0;n<e.length;n++)s=e[n],r(s.value,{componentStack:s.stack,digest:s.digest});if(Nl)throw Nl=!1,t=Xd,Xd=null,t;return Cl&1&&t.tag!==0&&As(),i=t.pendingLanes,i&1?t===Jd?Yi++:(Yi=0,Jd=t):Yi=0,vr(),null}function As(){if(Qn!==null){var t=Zv(Cl),e=At.transition,n=ae;try{if(At.transition=null,ae=16>t?16:t,Qn===null)var r=!1;else{if(t=Qn,Qn=null,Cl=0,te&6)throw Error(O(331));var s=te;for(te|=4,V=t.current;V!==null;){var i=V,o=i.child;if(V.flags&16){var l=i.deletions;if(l!==null){for(var u=0;u<l.length;u++){var h=l[u];for(V=h;V!==null;){var m=V;switch(m.tag){case 0:case 11:case 15:qi(8,m,i)}var p=m.child;if(p!==null)p.return=m,V=p;else for(;V!==null;){m=V;var v=m.sibling,S=m.return;if(u_(m),m===h){V=null;break}if(v!==null){v.return=S,V=v;break}V=S}}}var I=i.alternate;if(I!==null){var P=I.child;if(P!==null){I.child=null;do{var D=P.sibling;P.sibling=null,P=D}while(P!==null)}}V=i}}if(i.subtreeFlags&2064&&o!==null)o.return=i,V=o;else e:for(;V!==null;){if(i=V,i.flags&2048)switch(i.tag){case 0:case 11:case 15:qi(9,i,i.return)}var T=i.sibling;if(T!==null){T.return=i.return,V=T;break e}V=i.return}}var x=t.current;for(V=x;V!==null;){o=V;var N=o.child;if(o.subtreeFlags&2064&&N!==null)N.return=o,V=N;else e:for(o=x;V!==null;){if(l=V,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:uc(9,l)}}catch(M){Ee(l,l.return,M)}if(l===o){V=null;break e}var j=l.sibling;if(j!==null){j.return=l.return,V=j;break e}V=l.return}}if(te=s,vr(),nn&&typeof nn.onPostCommitFiberRoot=="function")try{nn.onPostCommitFiberRoot(nc,t)}catch{}r=!0}return r}finally{ae=n,At.transition=e}}return!1}function bg(t,e,n){e=Bs(n,e),e=Zy(t,e,1),t=nr(t,e,1),e=st(),t!==null&&(Fo(t,1,e),gt(t,e))}function Ee(t,e,n){if(t.tag===3)bg(t,t,n);else for(;e!==null;){if(e.tag===3){bg(e,t,n);break}else if(e.tag===1){var r=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(rr===null||!rr.has(r))){t=Bs(n,t),t=e_(e,t,1),e=nr(e,t,1),t=st(),e!==null&&(Fo(e,1,t),gt(e,t));break}}e=e.return}}function p2(t,e,n){var r=t.pingCache;r!==null&&r.delete(e),e=st(),t.pingedLanes|=t.suspendedLanes&n,Fe===t&&($e&n)===n&&(je===4||je===3&&($e&130023424)===$e&&500>Ne()-ff?Ar(t,0):hf|=n),gt(t,e)}function x_(t,e){e===0&&(t.mode&1?(e=ka,ka<<=1,!(ka&130023424)&&(ka=4194304)):e=1);var n=st();t=In(t,e),t!==null&&(Fo(t,e,n),gt(t,n))}function m2(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),x_(t,n)}function g2(t,e){var n=0;switch(t.tag){case 13:var r=t.stateNode,s=t.memoizedState;s!==null&&(n=s.retryLane);break;case 19:r=t.stateNode;break;default:throw Error(O(314))}r!==null&&r.delete(e),x_(t,n)}var w_;w_=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||pt.current)ht=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return ht=!1,r2(t,e,n);ht=!!(t.flags&131072)}else ht=!1,ve&&e.flags&1048576&&Ny(e,vl,e.index);switch(e.lanes=0,e.tag){case 2:var r=e.type;Ya(t,e),t=e.pendingProps;var s=Us(e,Xe.current);Ps(e,n),s=of(null,e,r,t,s,n);var i=af();return e.flags|=1,typeof s=="object"&&s!==null&&typeof s.render=="function"&&s.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,mt(r)?(i=!0,ml(e)):i=!1,e.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,ef(e),s.updater=cc,e.stateNode=s,s._reactInternals=e,zd(e,r,t,n),e=Bd(null,e,r,!0,i,n)):(e.tag=0,ve&&i&&qh(e),tt(null,e,s,n),e=e.child),e;case 16:r=e.elementType;e:{switch(Ya(t,e),t=e.pendingProps,s=r._init,r=s(r._payload),e.type=r,s=e.tag=y2(r),t=Ft(r,t),s){case 0:e=$d(null,e,r,t,n);break e;case 1:e=_g(null,e,r,t,n);break e;case 11:e=vg(null,e,r,t,n);break e;case 14:e=yg(null,e,r,Ft(r.type,t),n);break e}throw Error(O(306,r,""))}return e;case 0:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:Ft(r,s),$d(t,e,r,s,n);case 1:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:Ft(r,s),_g(t,e,r,s,n);case 3:e:{if(s_(e),t===null)throw Error(O(387));r=e.pendingProps,i=e.memoizedState,s=i.element,Py(t,e),xl(e,r,null,n);var o=e.memoizedState;if(r=o.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=i,e.memoizedState=i,e.flags&256){s=Bs(Error(O(423)),e),e=xg(t,e,r,n,s);break e}else if(r!==s){s=Bs(Error(O(424)),e),e=xg(t,e,r,n,s);break e}else for(xt=tr(e.stateNode.containerInfo.firstChild),wt=e,ve=!0,zt=null,n=by(e,null,r,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(zs(),r===s){e=Tn(t,e,n);break e}tt(t,e,r,n)}e=e.child}return e;case 5:return Ay(e),t===null&&Md(e),r=e.type,s=e.pendingProps,i=t!==null?t.memoizedProps:null,o=s.children,Ad(r,s)?o=null:i!==null&&Ad(r,i)&&(e.flags|=32),r_(t,e),tt(t,e,o,n),e.child;case 6:return t===null&&Md(e),null;case 13:return i_(t,e,n);case 4:return tf(e,e.stateNode.containerInfo),r=e.pendingProps,t===null?e.child=Vs(e,null,r,n):tt(t,e,r,n),e.child;case 11:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:Ft(r,s),vg(t,e,r,s,n);case 7:return tt(t,e,e.pendingProps,n),e.child;case 8:return tt(t,e,e.pendingProps.children,n),e.child;case 12:return tt(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(r=e.type._context,s=e.pendingProps,i=e.memoizedProps,o=s.value,he(yl,r._currentValue),r._currentValue=o,i!==null)if(qt(i.value,o)){if(i.children===s.children&&!pt.current){e=Tn(t,e,n);break e}}else for(i=e.child,i!==null&&(i.return=e);i!==null;){var l=i.dependencies;if(l!==null){o=i.child;for(var u=l.firstContext;u!==null;){if(u.context===r){if(i.tag===1){u=En(-1,n&-n),u.tag=2;var h=i.updateQueue;if(h!==null){h=h.shared;var m=h.pending;m===null?u.next=u:(u.next=m.next,m.next=u),h.pending=u}}i.lanes|=n,u=i.alternate,u!==null&&(u.lanes|=n),Fd(i.return,n,e),l.lanes|=n;break}u=u.next}}else if(i.tag===10)o=i.type===e.type?null:i.child;else if(i.tag===18){if(o=i.return,o===null)throw Error(O(341));o.lanes|=n,l=o.alternate,l!==null&&(l.lanes|=n),Fd(o,n,e),o=i.sibling}else o=i.child;if(o!==null)o.return=i;else for(o=i;o!==null;){if(o===e){o=null;break}if(i=o.sibling,i!==null){i.return=o.return,o=i;break}o=o.return}i=o}tt(t,e,s.children,n),e=e.child}return e;case 9:return s=e.type,r=e.pendingProps.children,Ps(e,n),s=jt(s),r=r(s),e.flags|=1,tt(t,e,r,n),e.child;case 14:return r=e.type,s=Ft(r,e.pendingProps),s=Ft(r.type,s),yg(t,e,r,s,n);case 15:return t_(t,e,e.type,e.pendingProps,n);case 17:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:Ft(r,s),Ya(t,e),e.tag=1,mt(r)?(t=!0,ml(e)):t=!1,Ps(e,n),Jy(e,r,s),zd(e,r,s,n),Bd(null,e,r,!0,t,n);case 19:return o_(t,e,n);case 22:return n_(t,e,n)}throw Error(O(156,e.tag))};function E_(t,e){return Yv(t,e)}function v2(t,e,n,r){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Rt(t,e,n,r){return new v2(t,e,n,r)}function vf(t){return t=t.prototype,!(!t||!t.isReactComponent)}function y2(t){if(typeof t=="function")return vf(t)?1:0;if(t!=null){if(t=t.$$typeof,t===Dh)return 11;if(t===Lh)return 14}return 2}function ir(t,e){var n=t.alternate;return n===null?(n=Rt(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function Ja(t,e,n,r,s,i){var o=2;if(r=t,typeof t=="function")vf(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case ps:return jr(n.children,s,i,e);case Oh:o=8,s|=8;break;case ud:return t=Rt(12,n,e,s|2),t.elementType=ud,t.lanes=i,t;case dd:return t=Rt(13,n,e,s),t.elementType=dd,t.lanes=i,t;case hd:return t=Rt(19,n,e,s),t.elementType=hd,t.lanes=i,t;case Av:return hc(n,s,i,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Rv:o=10;break e;case Pv:o=9;break e;case Dh:o=11;break e;case Lh:o=14;break e;case zn:o=16,r=null;break e}throw Error(O(130,t==null?t:typeof t,""))}return e=Rt(o,n,e,s),e.elementType=t,e.type=r,e.lanes=i,e}function jr(t,e,n,r){return t=Rt(7,t,r,e),t.lanes=n,t}function hc(t,e,n,r){return t=Rt(22,t,r,e),t.elementType=Av,t.lanes=n,t.stateNode={isHidden:!1},t}function Uu(t,e,n){return t=Rt(6,t,null,e),t.lanes=n,t}function zu(t,e,n){return e=Rt(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function _2(t,e,n,r,s){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=xu(0),this.expirationTimes=xu(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=xu(0),this.identifierPrefix=r,this.onRecoverableError=s,this.mutableSourceEagerHydrationData=null}function yf(t,e,n,r,s,i,o,l,u){return t=new _2(t,e,n,l,u),e===1?(e=1,i===!0&&(e|=8)):e=0,i=Rt(3,null,null,e),t.current=i,i.stateNode=t,i.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},ef(i),t}function x2(t,e,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:fs,key:r==null?null:""+r,children:t,containerInfo:e,implementation:n}}function k_(t){if(!t)return dr;t=t._reactInternals;e:{if(Qr(t)!==t||t.tag!==1)throw Error(O(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(mt(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(O(171))}if(t.tag===1){var n=t.type;if(mt(n))return ky(t,n,e)}return e}function S_(t,e,n,r,s,i,o,l,u){return t=yf(n,r,!0,t,s,i,o,l,u),t.context=k_(null),n=t.current,r=st(),s=sr(n),i=En(r,s),i.callback=e??null,nr(n,i,s),t.current.lanes=s,Fo(t,s,r),gt(t,r),t}function fc(t,e,n,r){var s=e.current,i=st(),o=sr(s);return n=k_(n),e.context===null?e.context=n:e.pendingContext=n,e=En(i,o),e.payload={element:t},r=r===void 0?null:r,r!==null&&(e.callback=r),t=nr(s,e,o),t!==null&&(Wt(t,s,o,i),Ga(t,s,o)),o}function Tl(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Rg(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function _f(t,e){Rg(t,e),(t=t.alternate)&&Rg(t,e)}function w2(){return null}var N_=typeof reportError=="function"?reportError:function(t){console.error(t)};function xf(t){this._internalRoot=t}pc.prototype.render=xf.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(O(409));fc(t,e,null,null)};pc.prototype.unmount=xf.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Fr(function(){fc(null,t,null,null)}),e[Cn]=null}};function pc(t){this._internalRoot=t}pc.prototype.unstable_scheduleHydration=function(t){if(t){var e=ny();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Bn.length&&e!==0&&e<Bn[n].priority;n++);Bn.splice(n,0,t),n===0&&sy(t)}};function wf(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function mc(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Pg(){}function E2(t,e,n,r,s){if(s){if(typeof r=="function"){var i=r;r=function(){var h=Tl(o);i.call(h)}}var o=S_(e,r,t,0,null,!1,!1,"",Pg);return t._reactRootContainer=o,t[Cn]=o.current,po(t.nodeType===8?t.parentNode:t),Fr(),o}for(;s=t.lastChild;)t.removeChild(s);if(typeof r=="function"){var l=r;r=function(){var h=Tl(u);l.call(h)}}var u=yf(t,0,!1,null,null,!1,!1,"",Pg);return t._reactRootContainer=u,t[Cn]=u.current,po(t.nodeType===8?t.parentNode:t),Fr(function(){fc(e,u,n,r)}),u}function gc(t,e,n,r,s){var i=n._reactRootContainer;if(i){var o=i;if(typeof s=="function"){var l=s;s=function(){var u=Tl(o);l.call(u)}}fc(e,o,t,s)}else o=E2(n,e,t,s,r);return Tl(o)}ey=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=Mi(e.pendingLanes);n!==0&&(Uh(e,n|1),gt(e,Ne()),!(te&6)&&(Hs=Ne()+500,vr()))}break;case 13:Fr(function(){var r=In(t,1);if(r!==null){var s=st();Wt(r,t,1,s)}}),_f(t,1)}};zh=function(t){if(t.tag===13){var e=In(t,134217728);if(e!==null){var n=st();Wt(e,t,134217728,n)}_f(t,134217728)}};ty=function(t){if(t.tag===13){var e=sr(t),n=In(t,e);if(n!==null){var r=st();Wt(n,t,e,r)}_f(t,e)}};ny=function(){return ae};ry=function(t,e){var n=ae;try{return ae=t,e()}finally{ae=n}};Ed=function(t,e,n){switch(e){case"input":if(md(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var r=n[e];if(r!==t&&r.form===t.form){var s=oc(r);if(!s)throw Error(O(90));Ov(r),md(r,s)}}}break;case"textarea":Lv(t,n);break;case"select":e=n.value,e!=null&&Is(t,!!n.multiple,e,!1)}};Bv=pf;Hv=Fr;var k2={usingClientEntryPoint:!1,Events:[zo,ys,oc,Vv,$v,pf]},bi={findFiberByHostInstance:Ir,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},S2={bundleType:bi.bundleType,version:bi.version,rendererPackageName:bi.rendererPackageName,rendererConfig:bi.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:jn.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=qv(t),t===null?null:t.stateNode},findFiberByHostInstance:bi.findFiberByHostInstance||w2,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Oa=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Oa.isDisabled&&Oa.supportsFiber)try{nc=Oa.inject(S2),nn=Oa}catch{}}Nt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=k2;Nt.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!wf(e))throw Error(O(200));return x2(t,e,null,n)};Nt.createRoot=function(t,e){if(!wf(t))throw Error(O(299));var n=!1,r="",s=N_;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(r=e.identifierPrefix),e.onRecoverableError!==void 0&&(s=e.onRecoverableError)),e=yf(t,1,!1,null,null,n,!1,r,s),t[Cn]=e.current,po(t.nodeType===8?t.parentNode:t),new xf(e)};Nt.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(O(188)):(t=Object.keys(t).join(","),Error(O(268,t)));return t=qv(e),t=t===null?null:t.stateNode,t};Nt.flushSync=function(t){return Fr(t)};Nt.hydrate=function(t,e,n){if(!mc(e))throw Error(O(200));return gc(null,t,e,!0,n)};Nt.hydrateRoot=function(t,e,n){if(!wf(t))throw Error(O(405));var r=n!=null&&n.hydratedSources||null,s=!1,i="",o=N_;if(n!=null&&(n.unstable_strictMode===!0&&(s=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=S_(e,null,t,1,n??null,s,!1,i,o),t[Cn]=e.current,po(t),r)for(t=0;t<r.length;t++)n=r[t],s=n._getVersion,s=s(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,s]:e.mutableSourceEagerHydrationData.push(n,s);return new pc(e)};Nt.render=function(t,e,n){if(!mc(e))throw Error(O(200));return gc(null,t,e,!1,n)};Nt.unmountComponentAtNode=function(t){if(!mc(t))throw Error(O(40));return t._reactRootContainer?(Fr(function(){gc(null,null,t,!1,function(){t._reactRootContainer=null,t[Cn]=null})}),!0):!1};Nt.unstable_batchedUpdates=pf;Nt.unstable_renderSubtreeIntoContainer=function(t,e,n,r){if(!mc(n))throw Error(O(200));if(t==null||t._reactInternals===void 0)throw Error(O(38));return gc(t,e,n,!1,r)};Nt.version="18.3.1-next-f1338f8080-20240426";function C_(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(C_)}catch(t){console.error(t)}}C_(),Cv.exports=Nt;var N2=Cv.exports,Ag=N2;ld.createRoot=Ag.createRoot,ld.hydrateRoot=Ag.hydrateRoot;/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C2=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),I_=(...t)=>t.filter((e,n,r)=>!!e&&r.indexOf(e)===n).join(" ");/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var I2={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T2=$.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:n=2,absoluteStrokeWidth:r,className:s="",children:i,iconNode:o,...l},u)=>$.createElement("svg",{ref:u,...I2,width:e,height:e,stroke:t,strokeWidth:r?Number(n)*24/Number(e):n,className:I_("lucide",s),...l},[...o.map(([h,m])=>$.createElement(h,m)),...Array.isArray(i)?i:[i]]));/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q=(t,e)=>{const n=$.forwardRef(({className:r,...s},i)=>$.createElement(T2,{ref:i,iconNode:e,className:I_(`lucide-${C2(t)}`,r),...s}));return n.displayName=`${t}`,n};/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ef=q("Activity",[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $o=q("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b2=q("Award",[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R2=q("BookOpen",[["path",{d:"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z",key:"vv98re"}],["path",{d:"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",key:"1cyq3y"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P2=q("Briefcase",[["path",{d:"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",key:"jecpp"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2",key:"i6l2r4"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xr=q("Bus",[["path",{d:"M8 6v6",key:"18i7km"}],["path",{d:"M15 6v6",key:"1sg6z9"}],["path",{d:"M2 12h19.6",key:"de5uta"}],["path",{d:"M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3",key:"1wwztk"}],["circle",{cx:"7",cy:"18",r:"2",key:"19iecd"}],["path",{d:"M9 18h5",key:"lrx6i"}],["circle",{cx:"16",cy:"18",r:"2",key:"1v4tcr"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vc=q("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A2=q("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ko=q("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T_=q("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bn=q("CircleCheck",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j2=q("CircleUser",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}],["path",{d:"M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662",key:"154egf"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b_=q("CircleX",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O2=q("ClipboardCheck",[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1",key:"tgr4d6"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",key:"116196"}],["path",{d:"m9 14 2 2 4-4",key:"df797q"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yc=q("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D2=q("Database",[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kf=q("History",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M12 7v5l4 2",key:"1fdv2h"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R_=q("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P_=q("LayoutDashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ur=q("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A_=q("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L2=q("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bo=q("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j_=q("MapPin",[["path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z",key:"2oe9fu"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M2=q("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F2=q("MousePointer2",[["path",{d:"m4 4 7.07 17 2.51-7.39L21 11.07z",key:"1vqm48"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U2=q("PenLine",[["path",{d:"M12 20h9",key:"t2du7b"}],["path",{d:"M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",key:"1ykcvy"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O_=q("Phone",[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z2=q("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D_=q("Save",[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V2=q("Scale",[["path",{d:"m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z",key:"7g6ntu"}],["path",{d:"m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z",key:"ijws7r"}],["path",{d:"M7 21h10",key:"1b0cd5"}],["path",{d:"M12 3v18",key:"108xh3"}],["path",{d:"M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2",key:"3gwbw2"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $2=q("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B2=q("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H2=q("ShieldAlert",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"M12 8v4",key:"1got3b"}],["path",{d:"M12 16h.01",key:"1drbdi"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L_=q("ShieldCheck",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W2=q("ShieldQuestion",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3",key:"mhlwft"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G2=q("Smartphone",[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2",key:"1yt0o3"}],["path",{d:"M12 18h.01",key:"mhygvu"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jg=q("Star",[["polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",key:"8f66p6"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q2=q("Tag",[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",key:"vktsd0"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor",key:"kqv944"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sf=q("Ticket",[["path",{d:"M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",key:"qn84l0"}],["path",{d:"M13 5v2",key:"dyzc3o"}],["path",{d:"M13 17v2",key:"1ont0d"}],["path",{d:"M13 11v2",key:"1wjjxi"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _c=q("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const So=q("TrendingUp",[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xc=q("UserPlus",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"19",x2:"19",y1:"8",y2:"14",key:"1bvyxn"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11",key:"1shjgl"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M_=q("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zr=q("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wc=q("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);var Og={};/**
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
 */const F_={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
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
 */const F=function(t,e){if(!t)throw ni(e)},ni=function(t){return new Error("Firebase Database ("+F_.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
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
 */const U_=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},K2=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=t[n++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=t[n++],o=t[n++],l=t[n++],u=((s&7)<<18|(i&63)<<12|(o&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const i=t[n++],o=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},Nf={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const i=t[s],o=s+1<t.length,l=o?t[s+1]:0,u=s+2<t.length,h=u?t[s+2]:0,m=i>>2,p=(i&3)<<4|l>>4;let v=(l&15)<<2|h>>6,S=h&63;u||(S=64,o||(v=64)),r.push(n[m],n[p],n[v],n[S])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(U_(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):K2(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const i=n[t.charAt(s++)],l=s<t.length?n[t.charAt(s)]:0;++s;const h=s<t.length?n[t.charAt(s)]:64;++s;const p=s<t.length?n[t.charAt(s)]:64;if(++s,i==null||l==null||h==null||p==null)throw new Y2;const v=i<<2|l>>4;if(r.push(v),h!==64){const S=l<<4&240|h>>2;if(r.push(S),p!==64){const I=h<<6&192|p;r.push(I)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class Y2 extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const z_=function(t){const e=U_(t);return Nf.encodeByteArray(e,!0)},bl=function(t){return z_(t).replace(/\./g,"")},Rl=function(t){try{return Nf.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function Q2(t){return V_(void 0,t)}function V_(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!X2(n)||(t[n]=V_(t[n],e[n]));return t}function X2(t){return t!=="__proto__"}/**
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
 */function J2(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Z2=()=>J2().__FIREBASE_DEFAULTS__,eS=()=>{if(typeof process>"u"||typeof Og>"u")return;const t=Og.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},tS=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Rl(t[1]);return e&&JSON.parse(e)},Cf=()=>{try{return Z2()||eS()||tS()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},$_=t=>{var e,n;return(n=(e=Cf())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},B_=t=>{const e=$_(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},H_=()=>{var t;return(t=Cf())===null||t===void 0?void 0:t.config},W_=t=>{var e;return(e=Cf())===null||e===void 0?void 0:e[`_${t}`]};/**
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
 */class ri{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
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
 */function G_(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",s=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},t);return[bl(JSON.stringify(n)),bl(JSON.stringify(o)),""].join(".")}/**
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
 */function ot(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function If(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ot())}function nS(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function q_(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function K_(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function rS(){const t=ot();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function sS(){return F_.NODE_ADMIN===!0}function Y_(){try{return typeof indexedDB=="object"}catch{return!1}}function Q_(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(n){e(n)}})}function iS(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
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
 */const oS="FirebaseError";class Qt extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=oS,Object.setPrototypeOf(this,Qt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Jr.prototype.create)}}class Jr{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?aS(i,r):"Error",l=`${this.serviceName}: ${o} (${s}).`;return new Qt(s,l,r)}}function aS(t,e){return t.replace(lS,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const lS=/\{\$([^}]+)}/g;/**
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
 */function No(t){return JSON.parse(t)}function Ae(t){return JSON.stringify(t)}/**
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
 */const X_=function(t){let e={},n={},r={},s="";try{const i=t.split(".");e=No(Rl(i[0])||""),n=No(Rl(i[1])||""),s=i[2],r=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:r,signature:s}},cS=function(t){const e=X_(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},uS=function(t){const e=X_(t).claims;return typeof e=="object"&&e.admin===!0};/**
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
 */function Xt(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function Vr(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function th(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Pl(t,e,n){const r={};for(const s in t)Object.prototype.hasOwnProperty.call(t,s)&&(r[s]=e.call(n,t[s],s,t));return r}function Co(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const i=t[s],o=e[s];if(Dg(i)&&Dg(o)){if(!Co(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function Dg(t){return t!==null&&typeof t=="object"}/**
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
 */function si(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Ui(t){const e={};return t.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function zi(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}/**
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
 */class dS{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const r=this.W_;if(typeof e=="string")for(let p=0;p<16;p++)r[p]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let p=0;p<16;p++)r[p]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let p=16;p<80;p++){const v=r[p-3]^r[p-8]^r[p-14]^r[p-16];r[p]=(v<<1|v>>>31)&4294967295}let s=this.chain_[0],i=this.chain_[1],o=this.chain_[2],l=this.chain_[3],u=this.chain_[4],h,m;for(let p=0;p<80;p++){p<40?p<20?(h=l^i&(o^l),m=1518500249):(h=i^o^l,m=1859775393):p<60?(h=i&o|l&(i|o),m=2400959708):(h=i^o^l,m=3395469782);const v=(s<<5|s>>>27)+h+u+m+r[p]&4294967295;u=l,l=o,o=(i<<30|i>>>2)&4294967295,i=s,s=v}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+i&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+l&4294967295,this.chain_[4]=this.chain_[4]+u&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const r=n-this.blockSize;let s=0;const i=this.buf_;let o=this.inbuf_;for(;s<n;){if(o===0)for(;s<=r;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<n;)if(i[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(i),o=0;break}}else for(;s<n;)if(i[o]=e[s],++o,++s,o===this.blockSize){this.compress_(i),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=n&255,n/=256;this.compress_(this.buf_);let r=0;for(let s=0;s<5;s++)for(let i=24;i>=0;i-=8)e[r]=this.chain_[s]>>i&255,++r;return e}}function hS(t,e){const n=new fS(t,e);return n.subscribe.bind(n)}class fS{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let s;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");pS(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:r},s.next===void 0&&(s.next=Vu),s.error===void 0&&(s.error=Vu),s.complete===void 0&&(s.complete=Vu);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function pS(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function Vu(){}function Ec(t,e){return`${t} failed: ${e} argument `}/**
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
 */const mS=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);if(s>=55296&&s<=56319){const i=s-55296;r++,F(r<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(r)-56320;s=65536+(i<<10)+o}s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):s<65536?(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},kc=function(t){let e=0;for(let n=0;n<t.length;n++){const r=t.charCodeAt(n);r<128?e++:r<2048?e+=2:r>=55296&&r<=56319?(e+=4,n++):e+=3}return e};/**
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
 */const gS=1e3,vS=2,yS=4*60*60*1e3,_S=.5;function Lg(t,e=gS,n=vS){const r=e*Math.pow(n,t),s=Math.round(_S*r*(Math.random()-.5)*2);return Math.min(yS,r+s)}/**
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
 */function Oe(t){return t&&t._delegate?t._delegate:t}class Dt{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */class xS{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new ri;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(ES(e))try{this.getOrInitializeService({instanceIdentifier:Nr})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=Nr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Nr){return this.instances.has(e)}getOptions(e=Nr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,o]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(i);r===l&&o.resolve(s)}return s}onInit(e,n){var r;const s=this.normalizeInstanceIdentifier(n),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const o=this.instances.get(s);return o&&e(o,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:wS(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Nr){return this.component?this.component.multipleInstances?e:Nr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function wS(t){return t===Nr?void 0:t}function ES(t){return t.instantiationMode==="EAGER"}/**
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
 */class kS{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new xS(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var se;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(se||(se={}));const SS={debug:se.DEBUG,verbose:se.VERBOSE,info:se.INFO,warn:se.WARN,error:se.ERROR,silent:se.SILENT},NS=se.INFO,CS={[se.DEBUG]:"log",[se.VERBOSE]:"log",[se.INFO]:"info",[se.WARN]:"warn",[se.ERROR]:"error"},IS=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=CS[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Ho{constructor(e){this.name=e,this._logLevel=NS,this._logHandler=IS,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in se))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?SS[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,se.DEBUG,...e),this._logHandler(this,se.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,se.VERBOSE,...e),this._logHandler(this,se.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,se.INFO,...e),this._logHandler(this,se.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,se.WARN,...e),this._logHandler(this,se.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,se.ERROR,...e),this._logHandler(this,se.ERROR,...e)}}const TS=(t,e)=>e.some(n=>t instanceof n);let Mg,Fg;function bS(){return Mg||(Mg=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function RS(){return Fg||(Fg=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const J_=new WeakMap,nh=new WeakMap,Z_=new WeakMap,$u=new WeakMap,Tf=new WeakMap;function PS(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(or(t.result)),s()},o=()=>{r(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&J_.set(n,t)}).catch(()=>{}),Tf.set(e,t),e}function AS(t){if(nh.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),s()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});nh.set(t,e)}let rh={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return nh.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Z_.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return or(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function jS(t){rh=t(rh)}function OS(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(Bu(this),e,...n);return Z_.set(r,e.sort?e.sort():[e]),or(r)}:RS().includes(t)?function(...e){return t.apply(Bu(this),e),or(J_.get(this))}:function(...e){return or(t.apply(Bu(this),e))}}function DS(t){return typeof t=="function"?OS(t):(t instanceof IDBTransaction&&AS(t),TS(t,bS())?new Proxy(t,rh):t)}function or(t){if(t instanceof IDBRequest)return PS(t);if($u.has(t))return $u.get(t);const e=DS(t);return e!==t&&($u.set(t,e),Tf.set(e,t)),e}const Bu=t=>Tf.get(t);function ex(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(t,e),l=or(o);return r&&o.addEventListener("upgradeneeded",u=>{r(or(o.result),u.oldVersion,u.newVersion,or(o.transaction),u)}),n&&o.addEventListener("blocked",u=>n(u.oldVersion,u.newVersion,u)),l.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),l}const LS=["get","getKey","getAll","getAllKeys","count"],MS=["put","add","delete","clear"],Hu=new Map;function Ug(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Hu.get(e))return Hu.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=MS.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||LS.includes(n)))return;const i=async function(o,...l){const u=this.transaction(o,s?"readwrite":"readonly");let h=u.store;return r&&(h=h.index(l.shift())),(await Promise.all([h[n](...l),s&&u.done]))[0]};return Hu.set(e,i),i}jS(t=>({...t,get:(e,n,r)=>Ug(e,n)||t.get(e,n,r),has:(e,n)=>!!Ug(e,n)||t.has(e,n)}));/**
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
 */class FS{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(US(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function US(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const sh="@firebase/app",zg="0.10.13";/**
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
 */const Rn=new Ho("@firebase/app"),zS="@firebase/app-compat",VS="@firebase/analytics-compat",$S="@firebase/analytics",BS="@firebase/app-check-compat",HS="@firebase/app-check",WS="@firebase/auth",GS="@firebase/auth-compat",qS="@firebase/database",KS="@firebase/data-connect",YS="@firebase/database-compat",QS="@firebase/functions",XS="@firebase/functions-compat",JS="@firebase/installations",ZS="@firebase/installations-compat",eN="@firebase/messaging",tN="@firebase/messaging-compat",nN="@firebase/performance",rN="@firebase/performance-compat",sN="@firebase/remote-config",iN="@firebase/remote-config-compat",oN="@firebase/storage",aN="@firebase/storage-compat",lN="@firebase/firestore",cN="@firebase/vertexai-preview",uN="@firebase/firestore-compat",dN="firebase",hN="10.14.1";/**
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
 */const ih="[DEFAULT]",fN={[sh]:"fire-core",[zS]:"fire-core-compat",[$S]:"fire-analytics",[VS]:"fire-analytics-compat",[HS]:"fire-app-check",[BS]:"fire-app-check-compat",[WS]:"fire-auth",[GS]:"fire-auth-compat",[qS]:"fire-rtdb",[KS]:"fire-data-connect",[YS]:"fire-rtdb-compat",[QS]:"fire-fn",[XS]:"fire-fn-compat",[JS]:"fire-iid",[ZS]:"fire-iid-compat",[eN]:"fire-fcm",[tN]:"fire-fcm-compat",[nN]:"fire-perf",[rN]:"fire-perf-compat",[sN]:"fire-rc",[iN]:"fire-rc-compat",[oN]:"fire-gcs",[aN]:"fire-gcs-compat",[lN]:"fire-fst",[uN]:"fire-fst-compat",[cN]:"fire-vertex","fire-js":"fire-js",[dN]:"fire-js-all"};/**
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
 */const Al=new Map,pN=new Map,oh=new Map;function Vg(t,e){try{t.container.addComponent(e)}catch(n){Rn.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Kt(t){const e=t.name;if(oh.has(e))return Rn.debug(`There were multiple attempts to register component ${e}.`),!1;oh.set(e,t);for(const n of Al.values())Vg(n,t);for(const n of pN.values())Vg(n,t);return!0}function yr(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function tn(t){return t.settings!==void 0}/**
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
 */const mN={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},ar=new Jr("app","Firebase",mN);/**
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
 */class gN{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Dt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ar.create("app-deleted",{appName:this._name})}}/**
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
 */const Zr=hN;function tx(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:ih,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw ar.create("bad-app-name",{appName:String(s)});if(n||(n=H_()),!n)throw ar.create("no-options");const i=Al.get(s);if(i){if(Co(n,i.options)&&Co(r,i.config))return i;throw ar.create("duplicate-app",{appName:s})}const o=new kS(s);for(const u of oh.values())o.addComponent(u);const l=new gN(n,r,o);return Al.set(s,l),l}function Sc(t=ih){const e=Al.get(t);if(!e&&t===ih&&H_())return tx();if(!e)throw ar.create("no-app",{appName:t});return e}function vt(t,e,n){var r;let s=(r=fN[t])!==null&&r!==void 0?r:t;n&&(s+=`-${n}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const l=[`Unable to register library "${s}" with version "${e}":`];i&&l.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&l.push("and"),o&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Rn.warn(l.join(" "));return}Kt(new Dt(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const vN="firebase-heartbeat-database",yN=1,Io="firebase-heartbeat-store";let Wu=null;function nx(){return Wu||(Wu=ex(vN,yN,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Io)}catch(n){console.warn(n)}}}}).catch(t=>{throw ar.create("idb-open",{originalErrorMessage:t.message})})),Wu}async function _N(t){try{const n=(await nx()).transaction(Io),r=await n.objectStore(Io).get(rx(t));return await n.done,r}catch(e){if(e instanceof Qt)Rn.warn(e.message);else{const n=ar.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Rn.warn(n.message)}}}async function $g(t,e){try{const r=(await nx()).transaction(Io,"readwrite");await r.objectStore(Io).put(e,rx(t)),await r.done}catch(n){if(n instanceof Qt)Rn.warn(n.message);else{const r=ar.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Rn.warn(r.message)}}}function rx(t){return`${t.name}!${t.options.appId}`}/**
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
 */const xN=1024,wN=30*24*60*60*1e3;class EN{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new SN(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Bg();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i)?void 0:(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const l=new Date(o.date).valueOf();return Date.now()-l<=wN}),this._storage.overwrite(this._heartbeatsCache))}catch(r){Rn.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Bg(),{heartbeatsToSend:r,unsentEntries:s}=kN(this._heartbeatsCache.heartbeats),i=bl(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(n){return Rn.warn(n),""}}}function Bg(){return new Date().toISOString().substring(0,10)}function kN(t,e=xN){const n=[];let r=t.slice();for(const s of t){const i=n.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),Hg(n)>e){i.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),Hg(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class SN{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Y_()?Q_().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await _N(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return $g(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return $g(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Hg(t){return bl(JSON.stringify({version:2,heartbeats:t})).length}/**
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
 */function NN(t){Kt(new Dt("platform-logger",e=>new FS(e),"PRIVATE")),Kt(new Dt("heartbeat",e=>new EN(e),"PRIVATE")),vt(sh,zg,t),vt(sh,zg,"esm2017"),vt("fire-js","")}NN("");function bf(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(t);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(t,r[s])&&(n[r[s]]=t[r[s]]);return n}function sx(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const CN=sx,ix=new Jr("auth","Firebase",sx());/**
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
 */const jl=new Ho("@firebase/auth");function IN(t,...e){jl.logLevel<=se.WARN&&jl.warn(`Auth (${Zr}): ${t}`,...e)}function Za(t,...e){jl.logLevel<=se.ERROR&&jl.error(`Auth (${Zr}): ${t}`,...e)}/**
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
 */function Yt(t,...e){throw Rf(t,...e)}function sn(t,...e){return Rf(t,...e)}function ox(t,e,n){const r=Object.assign(Object.assign({},CN()),{[e]:n});return new Jr("auth","Firebase",r).create(e,{appName:t.name})}function kn(t){return ox(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Rf(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return ix.create(t,...e)}function W(t,e,...n){if(!t)throw Rf(e,...n)}function yn(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Za(e),new Error(e)}function Pn(t,e){t||yn(e)}/**
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
 */function ah(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function TN(){return Wg()==="http:"||Wg()==="https:"}function Wg(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
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
 */function bN(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(TN()||q_()||"connection"in navigator)?navigator.onLine:!0}function RN(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
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
 */class Wo{constructor(e,n){this.shortDelay=e,this.longDelay=n,Pn(n>e,"Short delay should be less than long delay!"),this.isMobile=If()||K_()}get(){return bN()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function Pf(t,e){Pn(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
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
 */class ax{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;yn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;yn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;yn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const PN={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const AN=new Wo(3e4,6e4);function _r(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function On(t,e,n,r,s={}){return lx(t,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const l=si(Object.assign({key:t.config.apiKey},o)).slice(1),u=await t._getAdditionalHeaders();u["Content-Type"]="application/json",t.languageCode&&(u["X-Firebase-Locale"]=t.languageCode);const h=Object.assign({method:e,headers:u},i);return nS()||(h.referrerPolicy="no-referrer"),ax.fetch()(cx(t,t.config.apiHost,n,l),h)})}async function lx(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},PN),e);try{const s=new ON(t),i=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw Da(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const l=i.ok?o.errorMessage:o.error.message,[u,h]=l.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw Da(t,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw Da(t,"email-already-in-use",o);if(u==="USER_DISABLED")throw Da(t,"user-disabled",o);const m=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw ox(t,m,h);Yt(t,m)}}catch(s){if(s instanceof Qt)throw s;Yt(t,"network-request-failed",{message:String(s)})}}async function Go(t,e,n,r,s={}){const i=await On(t,e,n,r,s);return"mfaPendingCredential"in i&&Yt(t,"multi-factor-auth-required",{_serverResponse:i}),i}function cx(t,e,n,r){const s=`${e}${n}?${r}`;return t.config.emulator?Pf(t.config,s):`${t.config.apiScheme}://${s}`}function jN(t){switch(t){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class ON{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(sn(this.auth,"network-request-failed")),AN.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Da(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=sn(t,e,r);return s.customData._tokenResponse=n,s}function Gg(t){return t!==void 0&&t.enterprise!==void 0}class DN{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===e)return jN(n.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}async function LN(t,e){return On(t,"GET","/v2/recaptchaConfig",_r(t,e))}/**
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
 */async function MN(t,e){return On(t,"POST","/v1/accounts:delete",e)}async function ux(t,e){return On(t,"POST","/v1/accounts:lookup",e)}/**
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
 */function Qi(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function FN(t,e=!1){const n=Oe(t),r=await n.getIdToken(e),s=Af(r);W(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:Qi(Gu(s.auth_time)),issuedAtTime:Qi(Gu(s.iat)),expirationTime:Qi(Gu(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function Gu(t){return Number(t)*1e3}function Af(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return Za("JWT malformed, contained fewer than 3 sections"),null;try{const s=Rl(n);return s?JSON.parse(s):(Za("Failed to decode base64 JWT payload"),null)}catch(s){return Za("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function qg(t){const e=Af(t);return W(e,"internal-error"),W(typeof e.exp<"u","internal-error"),W(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function Ws(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof Qt&&UN(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function UN({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
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
 */class zN{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class lh{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Qi(this.lastLoginAt),this.creationTime=Qi(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Ol(t){var e;const n=t.auth,r=await t.getIdToken(),s=await Ws(t,ux(n,{idToken:r}));W(s==null?void 0:s.users.length,n,"internal-error");const i=s.users[0];t._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?dx(i.providerUserInfo):[],l=$N(t.providerData,o),u=t.isAnonymous,h=!(t.email&&i.passwordHash)&&!(l!=null&&l.length),m=u?h:!1,p={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:l,metadata:new lh(i.createdAt,i.lastLoginAt),isAnonymous:m};Object.assign(t,p)}async function VN(t){const e=Oe(t);await Ol(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function $N(t,e){return[...t.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function dx(t){return t.map(e=>{var{providerId:n}=e,r=bf(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
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
 */async function BN(t,e){const n=await lx(t,{},async()=>{const r=si({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=t.config,o=cx(t,s,"/v1/token",`key=${i}`),l=await t._getAdditionalHeaders();return l["Content-Type"]="application/x-www-form-urlencoded",ax.fetch()(o,{method:"POST",headers:l,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function HN(t,e){return On(t,"POST","/v2/accounts:revokeToken",_r(t,e))}/**
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
 */class js{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){W(e.idToken,"internal-error"),W(typeof e.idToken<"u","internal-error"),W(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):qg(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){W(e.length!==0,"internal-error");const n=qg(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(W(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:s,expiresIn:i}=await BN(e,n);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:s,expirationTime:i}=n,o=new js;return r&&(W(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(W(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(W(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new js,this.toJSON())}_performRefresh(){return yn("not implemented")}}/**
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
 */function Un(t,e){W(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class _n{constructor(e){var{uid:n,auth:r,stsTokenManager:s}=e,i=bf(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new zN(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new lh(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await Ws(this,this.stsTokenManager.getToken(this.auth,e));return W(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return FN(this,e)}reload(){return VN(this)}_assign(e){this!==e&&(W(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new _n(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){W(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await Ol(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(tn(this.auth.app))return Promise.reject(kn(this.auth));const e=await this.getIdToken();return await Ws(this,MN(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,s,i,o,l,u,h,m;const p=(r=n.displayName)!==null&&r!==void 0?r:void 0,v=(s=n.email)!==null&&s!==void 0?s:void 0,S=(i=n.phoneNumber)!==null&&i!==void 0?i:void 0,I=(o=n.photoURL)!==null&&o!==void 0?o:void 0,P=(l=n.tenantId)!==null&&l!==void 0?l:void 0,D=(u=n._redirectEventId)!==null&&u!==void 0?u:void 0,T=(h=n.createdAt)!==null&&h!==void 0?h:void 0,x=(m=n.lastLoginAt)!==null&&m!==void 0?m:void 0,{uid:N,emailVerified:j,isAnonymous:M,providerData:U,stsTokenManager:w}=n;W(N&&w,e,"internal-error");const y=js.fromJSON(this.name,w);W(typeof N=="string",e,"internal-error"),Un(p,e.name),Un(v,e.name),W(typeof j=="boolean",e,"internal-error"),W(typeof M=="boolean",e,"internal-error"),Un(S,e.name),Un(I,e.name),Un(P,e.name),Un(D,e.name),Un(T,e.name),Un(x,e.name);const _=new _n({uid:N,auth:e,email:v,emailVerified:j,displayName:p,isAnonymous:M,photoURL:I,phoneNumber:S,tenantId:P,stsTokenManager:y,createdAt:T,lastLoginAt:x});return U&&Array.isArray(U)&&(_.providerData=U.map(k=>Object.assign({},k))),D&&(_._redirectEventId=D),_}static async _fromIdTokenResponse(e,n,r=!1){const s=new js;s.updateFromServerResponse(n);const i=new _n({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Ol(i),i}static async _fromGetAccountInfoResponse(e,n,r){const s=n.users[0];W(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?dx(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),l=new js;l.updateFromIdToken(r);const u=new _n({uid:s.localId,auth:e,stsTokenManager:l,isAnonymous:o}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new lh(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(u,h),u}}/**
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
 */const Kg=new Map;function xn(t){Pn(t instanceof Function,"Expected a class definition");let e=Kg.get(t);return e?(Pn(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Kg.set(t,e),e)}/**
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
 */class hx{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}hx.type="NONE";const Yg=hx;/**
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
 */function el(t,e,n){return`firebase:${t}:${e}:${n}`}class Os{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=el(this.userKey,s.apiKey,i),this.fullPersistenceKey=el("persistence",s.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?_n._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new Os(xn(Yg),e,r);const s=(await Promise.all(n.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||xn(Yg);const o=el(r,e.config.apiKey,e.name);let l=null;for(const h of n)try{const m=await h._get(o);if(m){const p=_n._fromJSON(e,m);h!==i&&(l=p),i=h;break}}catch{}const u=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new Os(i,e,r):(i=u[0],l&&await i._set(o,l.toJSON()),await Promise.all(n.map(async h=>{if(h!==i)try{await h._remove(o)}catch{}})),new Os(i,e,r))}}/**
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
 */function Qg(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(gx(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(fx(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(yx(e))return"Blackberry";if(_x(e))return"Webos";if(px(e))return"Safari";if((e.includes("chrome/")||mx(e))&&!e.includes("edge/"))return"Chrome";if(vx(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function fx(t=ot()){return/firefox\//i.test(t)}function px(t=ot()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function mx(t=ot()){return/crios\//i.test(t)}function gx(t=ot()){return/iemobile/i.test(t)}function vx(t=ot()){return/android/i.test(t)}function yx(t=ot()){return/blackberry/i.test(t)}function _x(t=ot()){return/webos/i.test(t)}function jf(t=ot()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function WN(t=ot()){var e;return jf(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function GN(){return rS()&&document.documentMode===10}function xx(t=ot()){return jf(t)||vx(t)||_x(t)||yx(t)||/windows phone/i.test(t)||gx(t)}/**
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
 */function wx(t,e=[]){let n;switch(t){case"Browser":n=Qg(ot());break;case"Worker":n=`${Qg(ot())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Zr}/${r}`}/**
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
 */class qN{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=i=>new Promise((o,l)=>{try{const u=e(i);o(u)}catch(u){l(u)}});r.onAbort=n,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
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
 */async function KN(t,e={}){return On(t,"GET","/v2/passwordPolicy",_r(t,e))}/**
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
 */const YN=6;class QN{constructor(e){var n,r,s,i;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=o.minPasswordLength)!==null&&n!==void 0?n:YN,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,s,i,o,l;const u={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,u),this.validatePasswordCharacterOptions(e,u),u.isValid&&(u.isValid=(n=u.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),u.isValid&&(u.isValid=(r=u.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),u.isValid&&(u.isValid=(s=u.containsLowercaseLetter)!==null&&s!==void 0?s:!0),u.isValid&&(u.isValid=(i=u.containsUppercaseLetter)!==null&&i!==void 0?i:!0),u.isValid&&(u.isValid=(o=u.containsNumericCharacter)!==null&&o!==void 0?o:!0),u.isValid&&(u.isValid=(l=u.containsNonAlphanumericCharacter)!==null&&l!==void 0?l:!0),u}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
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
 */class XN{constructor(e,n,r,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Xg(this),this.idTokenSubscription=new Xg(this),this.beforeStateQueue=new qN(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=ix,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=xn(n)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await Os.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await ux(this,{idToken:e}),r=await _n._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(tn(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(l,l))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,l=s==null?void 0:s._redirectEventId,u=await this.tryRedirectSignIn(e);(!o||o===l)&&(u!=null&&u.user)&&(s=u.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return W(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Ol(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=RN()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(tn(this.app))return Promise.reject(kn(this));const n=e?Oe(e):null;return n&&W(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&W(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return tn(this.app)?Promise.reject(kn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return tn(this.app)?Promise.reject(kn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(xn(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await KN(this),n=new QN(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Jr("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await HN(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&xn(e)||this._popupRedirectResolver;W(n,this,"argument-error"),this.redirectPersistenceManager=await Os.create(this,[xn(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,s){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let o=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(W(l,this,"internal-error"),l.then(()=>{o||i(this.currentUser)}),typeof n=="function"){const u=e.addObserver(n,r,s);return()=>{o=!0,u()}}else{const u=e.addObserver(n);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return W(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=wx(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(n["X-Firebase-AppCheck"]=s),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&IN(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function es(t){return Oe(t)}class Xg{constructor(e){this.auth=e,this.observer=null,this.addObserver=hS(n=>this.observer=n)}get next(){return W(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let Nc={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function JN(t){Nc=t}function Ex(t){return Nc.loadJS(t)}function ZN(){return Nc.recaptchaEnterpriseScript}function eC(){return Nc.gapiScript}function tC(t){return`__${t}${Math.floor(Math.random()*1e6)}`}const nC="recaptcha-enterprise",rC="NO_RECAPTCHA";class sC{constructor(e){this.type=nC,this.auth=es(e)}async verify(e="verify",n=!1){async function r(i){if(!n){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,l)=>{LN(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)l(new Error("recaptcha Enterprise site key undefined"));else{const h=new DN(u);return i.tenantId==null?i._agentRecaptchaConfig=h:i._tenantRecaptchaConfigs[i.tenantId]=h,o(h.siteKey)}}).catch(u=>{l(u)})})}function s(i,o,l){const u=window.grecaptcha;Gg(u)?u.enterprise.ready(()=>{u.enterprise.execute(i,{action:e}).then(h=>{o(h)}).catch(()=>{o(rC)})}):l(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((i,o)=>{r(this.auth).then(l=>{if(!n&&Gg(window.grecaptcha))s(l,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let u=ZN();u.length!==0&&(u+=l),Ex(u).then(()=>{s(l,i,o)}).catch(h=>{o(h)})}}).catch(l=>{o(l)})})}}async function Jg(t,e,n,r=!1){const s=new sC(t);let i;try{i=await s.verify(n)}catch{i=await s.verify(n,!0)}const o=Object.assign({},e);return r?Object.assign(o,{captchaResp:i}):Object.assign(o,{captchaResponse:i}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function ch(t,e,n,r){var s;if(!((s=t._getRecaptchaConfig())===null||s===void 0)&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const i=await Jg(t,e,n,n==="getOobCode");return r(t,i)}else return r(t,e).catch(async i=>{if(i.code==="auth/missing-recaptcha-token"){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await Jg(t,e,n,n==="getOobCode");return r(t,o)}else return Promise.reject(i)})}/**
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
 */function iC(t,e){const n=yr(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),i=n.getOptions();if(Co(i,e??{}))return s;Yt(s,"already-initialized")}return n.initialize({options:e})}function oC(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(xn);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function aC(t,e,n){const r=es(t);W(r._canInitEmulator,r,"emulator-config-failed"),W(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=kx(e),{host:o,port:l}=lC(e),u=l===null?"":`:${l}`;r.config.emulator={url:`${i}//${o}${u}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:l,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})}),cC()}function kx(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function lC(t){const e=kx(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:Zg(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:Zg(o)}}}function Zg(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function cC(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
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
 */class Of{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return yn("not implemented")}_getIdTokenResponse(e){return yn("not implemented")}_linkToIdToken(e,n){return yn("not implemented")}_getReauthenticationResolver(e){return yn("not implemented")}}async function uC(t,e){return On(t,"POST","/v1/accounts:signUp",e)}/**
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
 */async function dC(t,e){return Go(t,"POST","/v1/accounts:signInWithPassword",_r(t,e))}/**
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
 */async function hC(t,e){return Go(t,"POST","/v1/accounts:signInWithEmailLink",_r(t,e))}async function fC(t,e){return Go(t,"POST","/v1/accounts:signInWithEmailLink",_r(t,e))}/**
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
 */class To extends Of{constructor(e,n,r,s=null){super("password",r),this._email=e,this._password=n,this._tenantId=s}static _fromEmailAndPassword(e,n){return new To(e,n,"password")}static _fromEmailAndCode(e,n,r=null){return new To(e,n,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ch(e,n,"signInWithPassword",dC);case"emailLink":return hC(e,{email:this._email,oobCode:this._password});default:Yt(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":const r={idToken:n,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ch(e,r,"signUpPassword",uC);case"emailLink":return fC(e,{idToken:n,email:this._email,oobCode:this._password});default:Yt(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */async function Ds(t,e){return Go(t,"POST","/v1/accounts:signInWithIdp",_r(t,e))}/**
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
 */const pC="http://localhost";class $r extends Of{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new $r(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):Yt("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=n,i=bf(n,["providerId","signInMethod"]);if(!r||!s)return null;const o=new $r(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Ds(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,Ds(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Ds(e,n)}buildRequest(){const e={requestUri:pC,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=si(n)}return e}}/**
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
 */function mC(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function gC(t){const e=Ui(zi(t)).link,n=e?Ui(zi(e)).deep_link_id:null,r=Ui(zi(t)).deep_link_id;return(r?Ui(zi(r)).link:null)||r||n||e||t}class Df{constructor(e){var n,r,s,i,o,l;const u=Ui(zi(e)),h=(n=u.apiKey)!==null&&n!==void 0?n:null,m=(r=u.oobCode)!==null&&r!==void 0?r:null,p=mC((s=u.mode)!==null&&s!==void 0?s:null);W(h&&m&&p,"argument-error"),this.apiKey=h,this.operation=p,this.code=m,this.continueUrl=(i=u.continueUrl)!==null&&i!==void 0?i:null,this.languageCode=(o=u.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(l=u.tenantId)!==null&&l!==void 0?l:null}static parseLink(e){const n=gC(e);try{return new Df(n)}catch{return null}}}/**
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
 */class ii{constructor(){this.providerId=ii.PROVIDER_ID}static credential(e,n){return To._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const r=Df.parseLink(n);return W(r,"argument-error"),To._fromEmailAndCode(e,r.code,r.tenantId)}}ii.PROVIDER_ID="password";ii.EMAIL_PASSWORD_SIGN_IN_METHOD="password";ii.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class Sx{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class qo extends Sx{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class Wn extends qo{constructor(){super("facebook.com")}static credential(e){return $r._fromParams({providerId:Wn.PROVIDER_ID,signInMethod:Wn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Wn.credentialFromTaggedObject(e)}static credentialFromError(e){return Wn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Wn.credential(e.oauthAccessToken)}catch{return null}}}Wn.FACEBOOK_SIGN_IN_METHOD="facebook.com";Wn.PROVIDER_ID="facebook.com";/**
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
 */class Gn extends qo{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return $r._fromParams({providerId:Gn.PROVIDER_ID,signInMethod:Gn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Gn.credentialFromTaggedObject(e)}static credentialFromError(e){return Gn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return Gn.credential(n,r)}catch{return null}}}Gn.GOOGLE_SIGN_IN_METHOD="google.com";Gn.PROVIDER_ID="google.com";/**
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
 */class qn extends qo{constructor(){super("github.com")}static credential(e){return $r._fromParams({providerId:qn.PROVIDER_ID,signInMethod:qn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return qn.credentialFromTaggedObject(e)}static credentialFromError(e){return qn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return qn.credential(e.oauthAccessToken)}catch{return null}}}qn.GITHUB_SIGN_IN_METHOD="github.com";qn.PROVIDER_ID="github.com";/**
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
 */class Kn extends qo{constructor(){super("twitter.com")}static credential(e,n){return $r._fromParams({providerId:Kn.PROVIDER_ID,signInMethod:Kn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Kn.credentialFromTaggedObject(e)}static credentialFromError(e){return Kn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return Kn.credential(n,r)}catch{return null}}}Kn.TWITTER_SIGN_IN_METHOD="twitter.com";Kn.PROVIDER_ID="twitter.com";/**
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
 */async function vC(t,e){return Go(t,"POST","/v1/accounts:signUp",_r(t,e))}/**
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
 */class Br{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,s=!1){const i=await _n._fromIdTokenResponse(e,r,s),o=e0(r);return new Br({user:i,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const s=e0(r);return new Br({user:e,providerId:s,_tokenResponse:r,operationType:n})}}function e0(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
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
 */class Dl extends Qt{constructor(e,n,r,s){var i;super(n.code,n.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Dl.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,s){return new Dl(e,n,r,s)}}function Nx(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Dl._fromErrorAndOperation(t,i,e,r):i})}async function yC(t,e,n=!1){const r=await Ws(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Br._forOperation(t,"link",r)}/**
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
 */async function _C(t,e,n=!1){const{auth:r}=t;if(tn(r.app))return Promise.reject(kn(r));const s="reauthenticate";try{const i=await Ws(t,Nx(r,s,e,t),n);W(i.idToken,r,"internal-error");const o=Af(i.idToken);W(o,r,"internal-error");const{sub:l}=o;return W(t.uid===l,r,"user-mismatch"),Br._forOperation(t,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&Yt(r,"user-mismatch"),i}}/**
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
 */async function Cx(t,e,n=!1){if(tn(t.app))return Promise.reject(kn(t));const r="signIn",s=await Nx(t,r,e),i=await Br._fromIdTokenResponse(t,r,s);return n||await t._updateCurrentUser(i.user),i}async function xC(t,e){return Cx(es(t),e)}/**
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
 */async function Ix(t){const e=es(t);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function wC(t,e,n){if(tn(t.app))return Promise.reject(kn(t));const r=es(t),o=await ch(r,{returnSecureToken:!0,email:e,password:n,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",vC).catch(u=>{throw u.code==="auth/password-does-not-meet-requirements"&&Ix(t),u}),l=await Br._fromIdTokenResponse(r,"signIn",o);return await r._updateCurrentUser(l.user),l}function EC(t,e,n){return tn(t.app)?Promise.reject(kn(t)):xC(Oe(t),ii.credential(e,n)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Ix(t),r})}/**
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
 */async function kC(t,e){return On(t,"POST","/v1/accounts:update",e)}/**
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
 */async function SC(t,{displayName:e,photoURL:n}){if(e===void 0&&n===void 0)return;const r=Oe(t),i={idToken:await r.getIdToken(),displayName:e,photoUrl:n,returnSecureToken:!0},o=await Ws(r,kC(r.auth,i));r.displayName=o.displayName||null,r.photoURL=o.photoUrl||null;const l=r.providerData.find(({providerId:u})=>u==="password");l&&(l.displayName=r.displayName,l.photoURL=r.photoURL),await r._updateTokensIfNecessary(o)}function NC(t,e,n,r){return Oe(t).onIdTokenChanged(e,n,r)}function CC(t,e,n){return Oe(t).beforeAuthStateChanged(e,n)}function IC(t,e,n,r){return Oe(t).onAuthStateChanged(e,n,r)}function TC(t){return Oe(t).signOut()}const Ll="__sak";/**
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
 */class Tx{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Ll,"1"),this.storage.removeItem(Ll),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const bC=1e3,RC=10;class bx extends Tx{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=xx(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),s=this.localCache[n];r!==s&&e(n,s,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,l,u)=>{this.notifyListeners(o,u)});return}const r=e.key;n?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);GN()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,RC):s()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},bC)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}bx.type="LOCAL";const PC=bx;/**
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
 */class Rx extends Tx{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}Rx.type="SESSION";const Px=Rx;/**
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
 */function AC(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
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
 */class Cc{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const r=new Cc(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:s,data:i}=n.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const l=Array.from(o).map(async h=>h(n.origin,i)),u=await AC(l);n.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Cc.receivers=[];/**
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
 */function Lf(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
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
 */class jC{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((l,u)=>{const h=Lf("",20);s.port1.start();const m=setTimeout(()=>{u(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(p){const v=p;if(v.data.eventId===h)switch(v.data.status){case"ack":clearTimeout(m),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),l(v.data.response);break;default:clearTimeout(m),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:h,data:n},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function on(){return window}function OC(t){on().location.href=t}/**
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
 */function Ax(){return typeof on().WorkerGlobalScope<"u"&&typeof on().importScripts=="function"}async function DC(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function LC(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function MC(){return Ax()?self:null}/**
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
 */const jx="firebaseLocalStorageDb",FC=1,Ml="firebaseLocalStorage",Ox="fbase_key";class Ko{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function Ic(t,e){return t.transaction([Ml],e?"readwrite":"readonly").objectStore(Ml)}function UC(){const t=indexedDB.deleteDatabase(jx);return new Ko(t).toPromise()}function uh(){const t=indexedDB.open(jx,FC);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(Ml,{keyPath:Ox})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(Ml)?e(r):(r.close(),await UC(),e(await uh()))})})}async function t0(t,e,n){const r=Ic(t,!0).put({[Ox]:e,value:n});return new Ko(r).toPromise()}async function zC(t,e){const n=Ic(t,!1).get(e),r=await new Ko(n).toPromise();return r===void 0?null:r.value}function n0(t,e){const n=Ic(t,!0).delete(e);return new Ko(n).toPromise()}const VC=800,$C=3;class Dx{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await uh(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>$C)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Ax()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Cc._getInstance(MC()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await DC(),!this.activeServiceWorker)return;this.sender=new jC(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||LC()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await uh();return await t0(e,Ll,"1"),await n0(e,Ll),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>t0(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>zC(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>n0(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Ic(s,!1).getAll();return new Ko(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),VC)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Dx.type="LOCAL";const BC=Dx;new Wo(3e4,6e4);/**
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
 */function HC(t,e){return e?xn(e):(W(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
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
 */class Mf extends Of{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Ds(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Ds(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Ds(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function WC(t){return Cx(t.auth,new Mf(t),t.bypassAuthState)}function GC(t){const{auth:e,user:n}=t;return W(n,e,"internal-error"),_C(n,new Mf(t),t.bypassAuthState)}async function qC(t){const{auth:e,user:n}=t;return W(n,e,"internal-error"),yC(n,new Mf(t),t.bypassAuthState)}/**
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
 */class Lx{constructor(e,n,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:s,tenantId:i,error:o,type:l}=e;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:n,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(u))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return WC;case"linkViaPopup":case"linkViaRedirect":return qC;case"reauthViaPopup":case"reauthViaRedirect":return GC;default:Yt(this.auth,"internal-error")}}resolve(e){Pn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Pn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const KC=new Wo(2e3,1e4);class Ns extends Lx{constructor(e,n,r,s,i){super(e,n,s,i),this.provider=r,this.authWindow=null,this.pollId=null,Ns.currentPopupAction&&Ns.currentPopupAction.cancel(),Ns.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return W(e,this.auth,"internal-error"),e}async onExecution(){Pn(this.filter.length===1,"Popup operations only handle one event");const e=Lf();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(sn(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(sn(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Ns.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(sn(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,KC.get())};e()}}Ns.currentPopupAction=null;/**
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
 */const YC="pendingRedirect",tl=new Map;class QC extends Lx{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=tl.get(this.auth._key());if(!e){try{const r=await XC(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}tl.set(this.auth._key(),e)}return this.bypassAuthState||tl.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function XC(t,e){const n=eI(e),r=ZC(t);if(!await r._isAvailable())return!1;const s=await r._get(n)==="true";return await r._remove(n),s}function JC(t,e){tl.set(t._key(),e)}function ZC(t){return xn(t._redirectPersistence)}function eI(t){return el(YC,t.config.apiKey,t.name)}async function tI(t,e,n=!1){if(tn(t.app))return Promise.reject(kn(t));const r=es(t),s=HC(r,e),o=await new QC(r,s,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
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
 */const nI=10*60*1e3;class rI{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!sI(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!Mx(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(sn(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=nI&&this.cachedEventUids.clear(),this.cachedEventUids.has(r0(e))}saveEventToCache(e){this.cachedEventUids.add(r0(e)),this.lastProcessedEventTime=Date.now()}}function r0(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function Mx({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function sI(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Mx(t);default:return!1}}/**
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
 */async function iI(t,e={}){return On(t,"GET","/v1/projects",e)}/**
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
 */const oI=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,aI=/^https?/;async function lI(t){if(t.config.emulator)return;const{authorizedDomains:e}=await iI(t);for(const n of e)try{if(cI(n))return}catch{}Yt(t,"unauthorized-domain")}function cI(t){const e=ah(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!aI.test(n))return!1;if(oI.test(t))return r===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
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
 */const uI=new Wo(3e4,6e4);function s0(){const t=on().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function dI(t){return new Promise((e,n)=>{var r,s,i;function o(){s0(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{s0(),n(sn(t,"network-request-failed"))},timeout:uI.get()})}if(!((s=(r=on().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=on().gapi)===null||i===void 0)&&i.load)o();else{const l=tC("iframefcb");return on()[l]=()=>{gapi.load?o():n(sn(t,"network-request-failed"))},Ex(`${eC()}?onload=${l}`).catch(u=>n(u))}}).catch(e=>{throw nl=null,e})}let nl=null;function hI(t){return nl=nl||dI(t),nl}/**
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
 */const fI=new Wo(5e3,15e3),pI="__/auth/iframe",mI="emulator/auth/iframe",gI={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},vI=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function yI(t){const e=t.config;W(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Pf(e,mI):`https://${t.config.authDomain}/${pI}`,r={apiKey:e.apiKey,appName:t.name,v:Zr},s=vI.get(t.config.apiHost);s&&(r.eid=s);const i=t._getFrameworks();return i.length&&(r.fw=i.join(",")),`${n}?${si(r).slice(1)}`}async function _I(t){const e=await hI(t),n=on().gapi;return W(n,t,"internal-error"),e.open({where:document.body,url:yI(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:gI,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=sn(t,"network-request-failed"),l=on().setTimeout(()=>{i(o)},fI.get());function u(){on().clearTimeout(l),s(r)}r.ping(u).then(u,()=>{i(o)})}))}/**
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
 */const xI={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},wI=500,EI=600,kI="_blank",SI="http://localhost";class i0{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function NI(t,e,n,r=wI,s=EI){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const u=Object.assign(Object.assign({},xI),{width:r.toString(),height:s.toString(),top:i,left:o}),h=ot().toLowerCase();n&&(l=mx(h)?kI:n),fx(h)&&(e=e||SI,u.scrollbars="yes");const m=Object.entries(u).reduce((v,[S,I])=>`${v}${S}=${I},`,"");if(WN(h)&&l!=="_self")return CI(e||"",l),new i0(null);const p=window.open(e||"",l,m);W(p,t,"popup-blocked");try{p.focus()}catch{}return new i0(p)}function CI(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
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
 */const II="__/auth/handler",TI="emulator/auth/handler",bI=encodeURIComponent("fac");async function o0(t,e,n,r,s,i){W(t.config.authDomain,t,"auth-domain-config-required"),W(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:Zr,eventId:s};if(e instanceof Sx){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",th(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[m,p]of Object.entries({}))o[m]=p}if(e instanceof qo){const m=e.getScopes().filter(p=>p!=="");m.length>0&&(o.scopes=m.join(","))}t.tenantId&&(o.tid=t.tenantId);const l=o;for(const m of Object.keys(l))l[m]===void 0&&delete l[m];const u=await t._getAppCheckToken(),h=u?`#${bI}=${encodeURIComponent(u)}`:"";return`${RI(t)}?${si(l).slice(1)}${h}`}function RI({config:t}){return t.emulator?Pf(t,TI):`https://${t.authDomain}/${II}`}/**
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
 */const qu="webStorageSupport";class PI{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Px,this._completeRedirectFn=tI,this._overrideRedirectResult=JC}async _openPopup(e,n,r,s){var i;Pn((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=await o0(e,n,r,ah(),s);return NI(e,o,Lf())}async _openRedirect(e,n,r,s){await this._originValidation(e);const i=await o0(e,n,r,ah(),s);return OC(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:i}=this.eventManagers[n];return s?Promise.resolve(s):(Pn(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await _I(e),r=new rI(e);return n.register("authEvent",s=>(W(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(qu,{type:qu},s=>{var i;const o=(i=s==null?void 0:s[0])===null||i===void 0?void 0:i[qu];o!==void 0&&n(!!o),Yt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=lI(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return xx()||px()||jf()}}const AI=PI;var a0="@firebase/auth",l0="1.7.9";/**
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
 */class jI{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){W(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function OI(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function DI(t){Kt(new Dt("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:l}=r.options;W(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:o,authDomain:l,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:wx(t)},h=new XN(r,s,i,u);return oC(h,n),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),Kt(new Dt("auth-internal",e=>{const n=es(e.getProvider("auth").getImmediate());return(r=>new jI(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),vt(a0,l0,OI(t)),vt(a0,l0,"esm2017")}/**
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
 */const LI=5*60,MI=W_("authIdTokenMaxAge")||LI;let c0=null;const FI=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>MI)return;const s=n==null?void 0:n.token;c0!==s&&(c0=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function UI(t=Sc()){const e=yr(t,"auth");if(e.isInitialized())return e.getImmediate();const n=iC(t,{popupRedirectResolver:AI,persistence:[BC,PC,Px]}),r=W_("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=FI(i.toString());CC(n,o,()=>o(n.currentUser)),NC(n,l=>o(l))}}const s=$_("auth");return s&&aC(n,`http://${s}`),n}function zI(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}JN({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=s=>{const i=sn("internal-error");i.customData=s,n(i)},r.type="text/javascript",r.charset="UTF-8",zI().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});DI("Browser");var VI="firebase",$I="10.14.1";/**
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
 */vt(VI,$I,"app");var u0={};const d0="@firebase/database",h0="1.0.8";/**
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
 */let Fx="";function BI(t){Fx=t}/**
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
 */class HI{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),Ae(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:No(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
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
 */class WI{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return Xt(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
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
 */const Ux=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new HI(e)}}catch{}return new WI},Rr=Ux("localStorage"),GI=Ux("sessionStorage");/**
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
 */const Ls=new Ho("@firebase/database"),zx=function(){let t=1;return function(){return t++}}(),Vx=function(t){const e=mS(t),n=new dS;n.update(e);const r=n.digest();return Nf.encodeByteArray(r)},Yo=function(...t){let e="";for(let n=0;n<t.length;n++){const r=t[n];Array.isArray(r)||r&&typeof r=="object"&&typeof r.length=="number"?e+=Yo.apply(null,r):typeof r=="object"?e+=Ae(r):e+=r,e+=" "}return e};let Xi=null,f0=!0;const qI=function(t,e){F(!0,"Can't turn on custom loggers persistently."),Ls.logLevel=se.VERBOSE,Xi=Ls.log.bind(Ls)},Ve=function(...t){if(f0===!0&&(f0=!1,Xi===null&&GI.get("logging_enabled")===!0&&qI()),Xi){const e=Yo.apply(null,t);Xi(e)}},Qo=function(t){return function(...e){Ve(t,...e)}},dh=function(...t){const e="FIREBASE INTERNAL ERROR: "+Yo(...t);Ls.error(e)},An=function(...t){const e=`FIREBASE FATAL ERROR: ${Yo(...t)}`;throw Ls.error(e),new Error(e)},it=function(...t){const e="FIREBASE WARNING: "+Yo(...t);Ls.warn(e)},KI=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&it("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Ff=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},YI=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},Gs="[MIN_NAME]",Hr="[MAX_NAME]",ts=function(t,e){if(t===e)return 0;if(t===Gs||e===Hr)return-1;if(e===Gs||t===Hr)return 1;{const n=p0(t),r=p0(e);return n!==null?r!==null?n-r===0?t.length-e.length:n-r:-1:r!==null?1:t<e?-1:1}},QI=function(t,e){return t===e?0:t<e?-1:1},Ri=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+Ae(e))},Uf=function(t){if(typeof t!="object"||t===null)return Ae(t);const e=[];for(const r in t)e.push(r);e.sort();let n="{";for(let r=0;r<e.length;r++)r!==0&&(n+=","),n+=Ae(e[r]),n+=":",n+=Uf(t[e[r]]);return n+="}",n},$x=function(t,e){const n=t.length;if(n<=e)return[t];const r=[];for(let s=0;s<n;s+=e)s+e>n?r.push(t.substring(s,n)):r.push(t.substring(s,s+e));return r};function He(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const Bx=function(t){F(!Ff(t),"Invalid JSON number");const e=11,n=52,r=(1<<e-1)-1;let s,i,o,l,u;t===0?(i=0,o=0,s=1/t===-1/0?1:0):(s=t<0,t=Math.abs(t),t>=Math.pow(2,1-r)?(l=Math.min(Math.floor(Math.log(t)/Math.LN2),r),i=l+r,o=Math.round(t*Math.pow(2,n-l)-Math.pow(2,n))):(i=0,o=Math.round(t/Math.pow(2,1-r-n))));const h=[];for(u=n;u;u-=1)h.push(o%2?1:0),o=Math.floor(o/2);for(u=e;u;u-=1)h.push(i%2?1:0),i=Math.floor(i/2);h.push(s?1:0),h.reverse();const m=h.join("");let p="";for(u=0;u<64;u+=8){let v=parseInt(m.substr(u,8),2).toString(16);v.length===1&&(v="0"+v),p=p+v}return p.toLowerCase()},XI=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},JI=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function ZI(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const r=new Error(t+" at "+e._path.toString()+": "+n);return r.code=t.toUpperCase(),r}const eT=new RegExp("^-?(0*)\\d{1,10}$"),tT=-2147483648,nT=2147483647,p0=function(t){if(eT.test(t)){const e=Number(t);if(e>=tT&&e<=nT)return e}return null},oi=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw it("Exception was thrown by user callback.",n),e},Math.floor(0))}},rT=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Ji=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
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
 */class sT{constructor(e,n){this.appName_=e,this.appCheckProvider=n,this.appCheck=n==null?void 0:n.getImmediate({optional:!0}),this.appCheck||n==null||n.get().then(r=>this.appCheck=r)}getToken(e){return this.appCheck?this.appCheck.getToken(e):new Promise((n,r)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,r):n(null)},0)})}addTokenChangeListener(e){var n;(n=this.appCheckProvider)===null||n===void 0||n.get().then(r=>r.addTokenListener(e))}notifyForInvalidToken(){it(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
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
 */class iT{constructor(e,n,r){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=r,this.auth_=null,this.auth_=r.getImmediate({optional:!0}),this.auth_||r.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(Ve("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,r)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,r):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',it(e)}}class rl{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}rl.OWNER="owner";/**
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
 */const zf="5",Hx="v",Wx="s",Gx="r",qx="f",Kx=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Yx="ls",Qx="p",hh="ac",Xx="websocket",Jx="long_polling";/**
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
 */class Zx{constructor(e,n,r,s,i=!1,o="",l=!1,u=!1){this.secure=n,this.namespace=r,this.webSocketOnly=s,this.nodeAdmin=i,this.persistenceKey=o,this.includeNamespaceInQueryParams=l,this.isUsingEmulator=u,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=Rr.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&Rr.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function oT(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function ew(t,e,n){F(typeof e=="string","typeof type must == string"),F(typeof n=="object","typeof params must == object");let r;if(e===Xx)r=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===Jx)r=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);oT(t)&&(n.ns=t.namespace);const s=[];return He(n,(i,o)=>{s.push(i+"="+o)}),r+s.join("&")}/**
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
 */class aT{constructor(){this.counters_={}}incrementCounter(e,n=1){Xt(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return Q2(this.counters_)}}/**
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
 */const Ku={},Yu={};function Vf(t){const e=t.toString();return Ku[e]||(Ku[e]=new aT),Ku[e]}function lT(t,e){const n=t.toString();return Yu[n]||(Yu[n]=e()),Yu[n]}/**
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
 */class cT{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const r=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<r.length;++s)r[s]&&oi(()=>{this.onMessage_(r[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
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
 */const m0="start",uT="close",dT="pLPCommand",hT="pRTLPCB",tw="id",nw="pw",rw="ser",fT="cb",pT="seg",mT="ts",gT="d",vT="dframe",sw=1870,iw=30,yT=sw-iw,_T=25e3,xT=3e4;class Cs{constructor(e,n,r,s,i,o,l){this.connId=e,this.repoInfo=n,this.applicationId=r,this.appCheckToken=s,this.authToken=i,this.transportSessionId=o,this.lastSessionId=l,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Qo(e),this.stats_=Vf(n),this.urlFn=u=>(this.appCheckToken&&(u[hh]=this.appCheckToken),ew(n,Jx,u))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new cT(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(xT)),YI(()=>{if(this.isClosed_)return;this.scriptTagHolder=new $f((...i)=>{const[o,l,u,h,m]=i;if(this.incrementIncomingBytes_(i),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===m0)this.id=l,this.password=u;else if(o===uT)l?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(l,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...i)=>{const[o,l]=i;this.incrementIncomingBytes_(i),this.myPacketOrderer.handleResponse(o,l)},()=>{this.onClosed_()},this.urlFn);const r={};r[m0]="t",r[rw]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(r[fT]=this.scriptTagHolder.uniqueCallbackIdentifier),r[Hx]=zf,this.transportSessionId&&(r[Wx]=this.transportSessionId),this.lastSessionId&&(r[Yx]=this.lastSessionId),this.applicationId&&(r[Qx]=this.applicationId),this.appCheckToken&&(r[hh]=this.appCheckToken),typeof location<"u"&&location.hostname&&Kx.test(location.hostname)&&(r[Gx]=qx);const s=this.urlFn(r);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Cs.forceAllow_=!0}static forceDisallow(){Cs.forceDisallow_=!0}static isAvailable(){return Cs.forceAllow_?!0:!Cs.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!XI()&&!JI()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=Ae(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const r=z_(n),s=$x(r,yT);for(let i=0;i<s.length;i++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[i]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const r={};r[vT]="t",r[tw]=e,r[nw]=n,this.myDisconnFrame.src=this.urlFn(r),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=Ae(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class $f{constructor(e,n,r,s){this.onDisconnect=r,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=zx(),window[dT+this.uniqueCallbackIdentifier]=e,window[hT+this.uniqueCallbackIdentifier]=n,this.myIFrame=$f.createIFrame_();let i="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(i='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+i+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(l){Ve("frame writing exception"),l.stack&&Ve(l.stack),Ve(l)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||Ve("No IE domain setting required")}catch{const r=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+r+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[tw]=this.myID,e[nw]=this.myPW,e[rw]=this.currentSerial;let n=this.urlFn(e),r="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+iw+r.length<=sw;){const o=this.pendingSegs.shift();r=r+"&"+pT+s+"="+o.seg+"&"+mT+s+"="+o.ts+"&"+gT+s+"="+o.d,s++}return n=n+r,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,r){this.pendingSegs.push({seg:e,ts:n,d:r}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const r=()=>{this.outstandingRequests.delete(n),this.newRequest_()},s=setTimeout(r,Math.floor(_T)),i=()=>{clearTimeout(s),r()};this.addTag(e,i)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const r=this.myIFrame.doc.createElement("script");r.type="text/javascript",r.async=!0,r.src=e,r.onload=r.onreadystatechange=function(){const s=r.readyState;(!s||s==="loaded"||s==="complete")&&(r.onload=r.onreadystatechange=null,r.parentNode&&r.parentNode.removeChild(r),n())},r.onerror=()=>{Ve("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(r)}catch{}},Math.floor(1))}}/**
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
 */const wT=16384,ET=45e3;let Fl=null;typeof MozWebSocket<"u"?Fl=MozWebSocket:typeof WebSocket<"u"&&(Fl=WebSocket);class Vt{constructor(e,n,r,s,i,o,l){this.connId=e,this.applicationId=r,this.appCheckToken=s,this.authToken=i,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Qo(this.connId),this.stats_=Vf(n),this.connURL=Vt.connectionURL_(n,o,l,s,r),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,r,s,i){const o={};return o[Hx]=zf,typeof location<"u"&&location.hostname&&Kx.test(location.hostname)&&(o[Gx]=qx),n&&(o[Wx]=n),r&&(o[Yx]=r),s&&(o[hh]=s),i&&(o[Qx]=i),ew(e,Xx,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,Rr.set("previous_websocket_failure",!0);try{let r;sS(),this.mySock=new Fl(this.connURL,[],r)}catch(r){this.log_("Error instantiating WebSocket.");const s=r.message||r.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=r=>{this.handleIncomingFrame(r)},this.mySock.onerror=r=>{this.log_("WebSocket error.  Closing connection.");const s=r.message||r.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){Vt.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,r=navigator.userAgent.match(n);r&&r.length>1&&parseFloat(r[1])<4.4&&(e=!0)}return!e&&Fl!==null&&!Vt.forceDisallow_}static previouslyFailed(){return Rr.isInMemoryStorage||Rr.get("previous_websocket_failure")===!0}markConnectionHealthy(){Rr.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const r=No(n);this.onMessage(r)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(F(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const r=this.extractFrameCount_(n);r!==null&&this.appendFrame_(r)}}send(e){this.resetKeepAlive();const n=Ae(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const r=$x(n,wT);r.length>1&&this.sendString_(String(r.length));for(let s=0;s<r.length;s++)this.sendString_(r[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(ET))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}Vt.responsesRequiredToBeHealthy=2;Vt.healthyTimeout=3e4;/**
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
 */class bo{constructor(e){this.initTransports_(e)}static get ALL_TRANSPORTS(){return[Cs,Vt]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}initTransports_(e){const n=Vt&&Vt.isAvailable();let r=n&&!Vt.previouslyFailed();if(e.webSocketOnly&&(n||it("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),r=!0),r)this.transports_=[Vt];else{const s=this.transports_=[];for(const i of bo.ALL_TRANSPORTS)i&&i.isAvailable()&&s.push(i);bo.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}bo.globalTransportInitialized_=!1;/**
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
 */const kT=6e4,ST=5e3,NT=10*1024,CT=100*1024,Qu="t",g0="d",IT="s",v0="r",TT="e",y0="o",_0="a",x0="n",w0="p",bT="h";class RT{constructor(e,n,r,s,i,o,l,u,h,m){this.id=e,this.repoInfo_=n,this.applicationId_=r,this.appCheckToken_=s,this.authToken_=i,this.onMessage_=o,this.onReady_=l,this.onDisconnect_=u,this.onKill_=h,this.lastSessionId=m,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Qo("c:"+this.id+":"),this.transportManager_=new bo(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),r=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,r)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=Ji(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>CT?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>NT?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Qu in e){const n=e[Qu];n===_0?this.upgradeIfSecondaryHealthy_():n===v0?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===y0&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=Ri("t",e),r=Ri("d",e);if(n==="c")this.onSecondaryControl_(r);else if(n==="d")this.pendingDataMessages.push(r);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:w0,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:_0,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:x0,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=Ri("t",e),r=Ri("d",e);n==="c"?this.onControl_(r):n==="d"&&this.onDataMessage_(r)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=Ri(Qu,e);if(g0 in e){const r=e[g0];if(n===bT){const s=Object.assign({},r);this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(n===x0){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===IT?this.onConnectionShutdown_(r):n===v0?this.onReset_(r):n===TT?dh("Server Error: "+r):n===y0?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):dh("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,r=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),zf!==r&&it("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),r=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,r),Ji(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(kT))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Ji(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(ST))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:w0,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(Rr.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
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
 */class ow{put(e,n,r,s){}merge(e,n,r,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,r){}onDisconnectMerge(e,n,r){}onDisconnectCancel(e,n){}reportStats(e){}}/**
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
 */class aw{constructor(e){this.allowedEvents_=e,this.listeners_={},F(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const r=[...this.listeners_[e]];for(let s=0;s<r.length;s++)r[s].callback.apply(r[s].context,n)}}on(e,n,r){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:r});const s=this.getInitialEvent(e);s&&n.apply(r,s)}off(e,n,r){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let i=0;i<s.length;i++)if(s[i].callback===n&&(!r||r===s[i].context)){s.splice(i,1);return}}validateEventType_(e){F(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
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
 */class Ul extends aw{constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!If()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}static getInstance(){return new Ul}getInitialEvent(e){return F(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
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
 */const E0=32,k0=768;class le{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let r=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[r]=this.pieces_[s],r++);this.pieces_.length=r,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function re(){return new le("")}function Y(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function hr(t){return t.pieces_.length-t.pieceNum_}function de(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new le(t.pieces_,e)}function Bf(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function PT(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function Ro(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function lw(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new le(e,0)}function ke(t,e){const n=[];for(let r=t.pieceNum_;r<t.pieces_.length;r++)n.push(t.pieces_[r]);if(e instanceof le)for(let r=e.pieceNum_;r<e.pieces_.length;r++)n.push(e.pieces_[r]);else{const r=e.split("/");for(let s=0;s<r.length;s++)r[s].length>0&&n.push(r[s])}return new le(n,0)}function X(t){return t.pieceNum_>=t.pieces_.length}function rt(t,e){const n=Y(t),r=Y(e);if(n===null)return e;if(n===r)return rt(de(t),de(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function AT(t,e){const n=Ro(t,0),r=Ro(e,0);for(let s=0;s<n.length&&s<r.length;s++){const i=ts(n[s],r[s]);if(i!==0)return i}return n.length===r.length?0:n.length<r.length?-1:1}function Hf(t,e){if(hr(t)!==hr(e))return!1;for(let n=t.pieceNum_,r=e.pieceNum_;n<=t.pieces_.length;n++,r++)if(t.pieces_[n]!==e.pieces_[r])return!1;return!0}function Pt(t,e){let n=t.pieceNum_,r=e.pieceNum_;if(hr(t)>hr(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[r])return!1;++n,++r}return!0}class jT{constructor(e,n){this.errorPrefix_=n,this.parts_=Ro(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let r=0;r<this.parts_.length;r++)this.byteLength_+=kc(this.parts_[r]);cw(this)}}function OT(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=kc(e),cw(t)}function DT(t){const e=t.parts_.pop();t.byteLength_-=kc(e),t.parts_.length>0&&(t.byteLength_-=1)}function cw(t){if(t.byteLength_>k0)throw new Error(t.errorPrefix_+"has a key path longer than "+k0+" bytes ("+t.byteLength_+").");if(t.parts_.length>E0)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+E0+") or object contains a cycle "+Cr(t))}function Cr(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
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
 */class Wf extends aw{constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const r=!document[e];r!==this.visible_&&(this.visible_=r,this.trigger("visible",r))},!1)}static getInstance(){return new Wf}getInitialEvent(e){return F(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
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
 */const Pi=1e3,LT=60*5*1e3,S0=30*1e3,MT=1.3,FT=3e4,UT="server_kill",N0=3;class Sn extends ow{constructor(e,n,r,s,i,o,l,u){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=r,this.onConnectStatus_=s,this.onServerInfoUpdate_=i,this.authTokenProvider_=o,this.appCheckTokenProvider_=l,this.authOverride_=u,this.id=Sn.nextPersistentConnectionId_++,this.log_=Qo("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Pi,this.maxReconnectDelay_=LT,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,u)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Wf.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Ul.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,r){const s=++this.requestNumber_,i={r:s,a:e,b:n};this.log_(Ae(i)),F(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(i),r&&(this.requestCBHash_[s]=r)}get(e){this.initConnection_();const n=new ri,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const l=o.d;o.s==="ok"?n.resolve(l):n.reject(l)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const i=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(i),n.promise}listen(e,n,r,s){this.initConnection_();const i=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+i),this.listens.has(o)||this.listens.set(o,new Map),F(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),F(!this.listens.get(o).has(i),"listen() called twice for same path/queryId.");const l={onComplete:s,hashFn:n,query:e,tag:r};this.listens.get(o).set(i,l),this.connected_&&this.sendListen_(l)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,r=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(r)})}sendListen_(e){const n=e.query,r=n._path.toString(),s=n._queryIdentifier;this.log_("Listen on "+r+" for "+s);const i={p:r},o="q";e.tag&&(i.q=n._queryObject,i.t=e.tag),i.h=e.hashFn(),this.sendRequest(o,i,l=>{const u=l.d,h=l.s;Sn.warnOnListenWarnings_(u,n),(this.listens.get(r)&&this.listens.get(r).get(s))===e&&(this.log_("listen response",l),h!=="ok"&&this.removeListen_(r,s),e.onComplete&&e.onComplete(h,u))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&Xt(e,"w")){const r=Vr(e,"w");if(Array.isArray(r)&&~r.indexOf("no_index")){const s='".indexOn": "'+n._queryParams.getIndex().toString()+'"',i=n._path.toString();it(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${i} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||uS(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=S0)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=cS(e)?"auth":"gauth",r={cred:e};this.authOverride_===null?r.noauth=!0:typeof this.authOverride_=="object"&&(r.authvar=this.authOverride_),this.sendRequest(n,r,s=>{const i=s.s,o=s.d||"error";this.authToken_===e&&(i==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(i,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,r=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,r)})}unlisten(e,n){const r=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+r+" "+s),F(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(r,s)&&this.connected_&&this.sendUnlisten_(r,s,e._queryObject,n)}sendUnlisten_(e,n,r,s){this.log_("Unlisten on "+e+" for "+n);const i={p:e},o="n";s&&(i.q=r,i.t=s),this.sendRequest(o,i)}onDisconnectPut(e,n,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,r):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:r})}onDisconnectMerge(e,n,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,r):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:r})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,r,s){const i={p:n,d:r};this.log_("onDisconnect "+e,i),this.sendRequest(e,i,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,n,r,s){this.putInternal("p",e,n,r,s)}merge(e,n,r,s){this.putInternal("m",e,n,r,s)}putInternal(e,n,r,s,i){this.initConnection_();const o={p:n,d:r};i!==void 0&&(o.h=i),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const l=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(l):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,r=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,r,i=>{this.log_(n+" response",i),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(i.s,i.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,r=>{if(r.s!=="ok"){const i=r.d;this.log_("reportStats","Error sending stats: "+i)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+Ae(e));const n=e.r,r=this.requestCBHash_[n];r&&(delete this.requestCBHash_[n],r(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):dh("Unrecognized action received from server: "+Ae(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){F(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Pi,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Pi,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>FT&&(this.reconnectDelay_=Pi),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=new Date().getTime()-this.lastConnectionAttemptTime_;let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*MT)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),r=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+Sn.nextConnectionId_++,i=this.lastSessionId;let o=!1,l=null;const u=function(){l?l.close():(o=!0,r())},h=function(p){F(l,"sendRequest call when we're not connected not allowed."),l.sendRequest(p)};this.realtime_={close:u,sendRequest:h};const m=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[p,v]=await Promise.all([this.authTokenProvider_.getToken(m),this.appCheckTokenProvider_.getToken(m)]);o?Ve("getToken() completed but was canceled"):(Ve("getToken() completed. Creating connection."),this.authToken_=p&&p.accessToken,this.appCheckToken_=v&&v.token,l=new RT(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,r,S=>{it(S+" ("+this.repoInfo_.toString()+")"),this.interrupt(UT)},i))}catch(p){this.log_("Failed to get token: "+p),o||(this.repoInfo_.nodeAdmin&&it(p),u())}}}interrupt(e){Ve("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){Ve("Resuming connection for reason: "+e),delete this.interruptReasons_[e],th(this.interruptReasons_)&&(this.reconnectDelay_=Pi,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let r;n?r=n.map(i=>Uf(i)).join("$"):r="default";const s=this.removeListen_(e,r);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,n){const r=new le(e).toString();let s;if(this.listens.has(r)){const i=this.listens.get(r);s=i.get(n),i.delete(n),i.size===0&&this.listens.delete(r)}else s=void 0;return s}onAuthRevoked_(e,n){Ve("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=N0&&(this.reconnectDelay_=S0,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){Ve("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=N0&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+Fx.replace(/\./g,"-")]=1,If()?e["framework.cordova"]=1:K_()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Ul.getInstance().currentlyOnline();return th(this.interruptReasons_)&&e}}Sn.nextPersistentConnectionId_=0;Sn.nextConnectionId_=0;/**
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
 */class Tc{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const r=new Q(Gs,e),s=new Q(Gs,n);return this.compare(r,s)!==0}minPost(){return Q.MIN}}/**
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
 */let La;class uw extends Tc{static get __EMPTY_NODE(){return La}static set __EMPTY_NODE(e){La=e}compare(e,n){return ts(e.name,n.name)}isDefinedOn(e){throw ni("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return Q.MIN}maxPost(){return new Q(Hr,La)}makePost(e,n){return F(typeof e=="string","KeyIndex indexValue must always be a string."),new Q(e,La)}toString(){return".key"}}const Ms=new uw;/**
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
 */class Ma{constructor(e,n,r,s,i=null){this.isReverse_=s,this.resultGenerator_=i,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?r(e.key,n):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class Me{constructor(e,n,r,s,i){this.key=e,this.value=n,this.color=r??Me.RED,this.left=s??ft.EMPTY_NODE,this.right=i??ft.EMPTY_NODE}copy(e,n,r,s,i){return new Me(e??this.key,n??this.value,r??this.color,s??this.left,i??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let s=this;const i=r(e,s.key);return i<0?s=s.copy(null,null,null,s.left.insert(e,n,r),null):i===0?s=s.copy(null,n,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,n,r)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return ft.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let r,s;if(r=this,n(e,r.key)<0)!r.left.isEmpty()&&!r.left.isRed_()&&!r.left.left.isRed_()&&(r=r.moveRedLeft_()),r=r.copy(null,null,null,r.left.remove(e,n),null);else{if(r.left.isRed_()&&(r=r.rotateRight_()),!r.right.isEmpty()&&!r.right.isRed_()&&!r.right.left.isRed_()&&(r=r.moveRedRight_()),n(e,r.key)===0){if(r.right.isEmpty())return ft.EMPTY_NODE;s=r.right.min_(),r=r.copy(s.key,s.value,null,null,r.right.removeMin_())}r=r.copy(null,null,null,null,r.right.remove(e,n))}return r.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,Me.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,Me.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}Me.RED=!0;Me.BLACK=!1;class zT{copy(e,n,r,s,i){return this}insert(e,n,r){return new Me(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class ft{constructor(e,n=ft.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new ft(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,Me.BLACK,null,null))}remove(e){return new ft(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,Me.BLACK,null,null))}get(e){let n,r=this.root_;for(;!r.isEmpty();){if(n=this.comparator_(e,r.key),n===0)return r.value;n<0?r=r.left:n>0&&(r=r.right)}return null}getPredecessorKey(e){let n,r=this.root_,s=null;for(;!r.isEmpty();)if(n=this.comparator_(e,r.key),n===0){if(r.left.isEmpty())return s?s.key:null;for(r=r.left;!r.right.isEmpty();)r=r.right;return r.key}else n<0?r=r.left:n>0&&(s=r,r=r.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Ma(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new Ma(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new Ma(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new Ma(this.root_,null,this.comparator_,!0,e)}}ft.EMPTY_NODE=new zT;/**
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
 */function VT(t,e){return ts(t.name,e.name)}function Gf(t,e){return ts(t,e)}/**
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
 */let fh;function $T(t){fh=t}const dw=function(t){return typeof t=="number"?"number:"+Bx(t):"string:"+t},hw=function(t){if(t.isLeafNode()){const e=t.val();F(typeof e=="string"||typeof e=="number"||typeof e=="object"&&Xt(e,".sv"),"Priority must be a string or number.")}else F(t===fh||t.isEmpty(),"priority of unexpected type.");F(t===fh||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
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
 */let C0;class De{constructor(e,n=De.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,F(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),hw(this.priorityNode_)}static set __childrenNodeConstructor(e){C0=e}static get __childrenNodeConstructor(){return C0}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new De(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:De.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return X(e)?this:Y(e)===".priority"?this.priorityNode_:De.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:De.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const r=Y(e);return r===null?n:n.isEmpty()&&r!==".priority"?this:(F(r!==".priority"||hr(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(r,De.__childrenNodeConstructor.EMPTY_NODE.updateChild(de(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+dw(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=Bx(this.value_):e+=this.value_,this.lazyHash_=Vx(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===De.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof De.__childrenNodeConstructor?-1:(F(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,r=typeof this.value_,s=De.VALUE_TYPE_ORDER.indexOf(n),i=De.VALUE_TYPE_ORDER.indexOf(r);return F(s>=0,"Unknown leaf type: "+n),F(i>=0,"Unknown leaf type: "+r),s===i?r==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:i-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}De.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
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
 */let fw,pw;function BT(t){fw=t}function HT(t){pw=t}class WT extends Tc{compare(e,n){const r=e.node.getPriority(),s=n.node.getPriority(),i=r.compareTo(s);return i===0?ts(e.name,n.name):i}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return Q.MIN}maxPost(){return new Q(Hr,new De("[PRIORITY-POST]",pw))}makePost(e,n){const r=fw(e);return new Q(n,new De("[PRIORITY-POST]",r))}toString(){return".priority"}}const _e=new WT;/**
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
 */const GT=Math.log(2);class qT{constructor(e){const n=i=>parseInt(Math.log(i)/GT,10),r=i=>parseInt(Array(i+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const s=r(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const zl=function(t,e,n,r){t.sort(e);const s=function(u,h){const m=h-u;let p,v;if(m===0)return null;if(m===1)return p=t[u],v=n?n(p):p,new Me(v,p.node,Me.BLACK,null,null);{const S=parseInt(m/2,10)+u,I=s(u,S),P=s(S+1,h);return p=t[S],v=n?n(p):p,new Me(v,p.node,Me.BLACK,I,P)}},i=function(u){let h=null,m=null,p=t.length;const v=function(I,P){const D=p-I,T=p;p-=I;const x=s(D+1,T),N=t[D],j=n?n(N):N;S(new Me(j,N.node,P,null,x))},S=function(I){h?(h.left=I,h=I):(m=I,h=I)};for(let I=0;I<u.count;++I){const P=u.nextBitIsOne(),D=Math.pow(2,u.count-(I+1));P?v(D,Me.BLACK):(v(D,Me.BLACK),v(D,Me.RED))}return m},o=new qT(t.length),l=i(o);return new ft(r||e,l)};/**
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
 */let Xu;const us={};class wn{constructor(e,n){this.indexes_=e,this.indexSet_=n}static get Default(){return F(us&&_e,"ChildrenNode.ts has not been loaded"),Xu=Xu||new wn({".priority":us},{".priority":_e}),Xu}get(e){const n=Vr(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof ft?n:null}hasIndex(e){return Xt(this.indexSet_,e.toString())}addIndex(e,n){F(e!==Ms,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const r=[];let s=!1;const i=n.getIterator(Q.Wrap);let o=i.getNext();for(;o;)s=s||e.isDefinedOn(o.node),r.push(o),o=i.getNext();let l;s?l=zl(r,e.getCompare()):l=us;const u=e.toString(),h=Object.assign({},this.indexSet_);h[u]=e;const m=Object.assign({},this.indexes_);return m[u]=l,new wn(m,h)}addToIndexes(e,n){const r=Pl(this.indexes_,(s,i)=>{const o=Vr(this.indexSet_,i);if(F(o,"Missing index implementation for "+i),s===us)if(o.isDefinedOn(e.node)){const l=[],u=n.getIterator(Q.Wrap);let h=u.getNext();for(;h;)h.name!==e.name&&l.push(h),h=u.getNext();return l.push(e),zl(l,o.getCompare())}else return us;else{const l=n.get(e.name);let u=s;return l&&(u=u.remove(new Q(e.name,l))),u.insert(e,e.node)}});return new wn(r,this.indexSet_)}removeFromIndexes(e,n){const r=Pl(this.indexes_,s=>{if(s===us)return s;{const i=n.get(e.name);return i?s.remove(new Q(e.name,i)):s}});return new wn(r,this.indexSet_)}}/**
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
 */let Ai;class H{constructor(e,n,r){this.children_=e,this.priorityNode_=n,this.indexMap_=r,this.lazyHash_=null,this.priorityNode_&&hw(this.priorityNode_),this.children_.isEmpty()&&F(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return Ai||(Ai=new H(new ft(Gf),null,wn.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||Ai}updatePriority(e){return this.children_.isEmpty()?this:new H(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?Ai:n}}getChild(e){const n=Y(e);return n===null?this:this.getImmediateChild(n).getChild(de(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(F(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const r=new Q(e,n);let s,i;n.isEmpty()?(s=this.children_.remove(e),i=this.indexMap_.removeFromIndexes(r,this.children_)):(s=this.children_.insert(e,n),i=this.indexMap_.addToIndexes(r,this.children_));const o=s.isEmpty()?Ai:this.priorityNode_;return new H(s,o,i)}}updateChild(e,n){const r=Y(e);if(r===null)return n;{F(Y(e)!==".priority"||hr(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(r).updateChild(de(e),n);return this.updateImmediateChild(r,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let r=0,s=0,i=!0;if(this.forEachChild(_e,(o,l)=>{n[o]=l.val(e),r++,i&&H.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):i=!1}),!e&&i&&s<2*r){const o=[];for(const l in n)o[l]=n[l];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+dw(this.getPriority().val())+":"),this.forEachChild(_e,(n,r)=>{const s=r.hash();s!==""&&(e+=":"+n+":"+s)}),this.lazyHash_=e===""?"":Vx(e)}return this.lazyHash_}getPredecessorChildName(e,n,r){const s=this.resolveIndex_(r);if(s){const i=s.getPredecessorKey(new Q(e,n));return i?i.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const r=n.minKey();return r&&r.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new Q(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const r=n.maxKey();return r&&r.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new Q(n,this.children_.get(n)):null}forEachChild(e,n){const r=this.resolveIndex_(e);return r?r.inorderTraversal(s=>n(s.name,s.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const r=this.resolveIndex_(n);if(r)return r.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,Q.Wrap);let i=s.peek();for(;i!=null&&n.compare(i,e)<0;)s.getNext(),i=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const r=this.resolveIndex_(n);if(r)return r.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,Q.Wrap);let i=s.peek();for(;i!=null&&n.compare(i,e)>0;)s.getNext(),i=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Xo?-1:0}withIndex(e){if(e===Ms||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new H(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===Ms||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const r=this.getIterator(_e),s=n.getIterator(_e);let i=r.getNext(),o=s.getNext();for(;i&&o;){if(i.name!==o.name||!i.node.equals(o.node))return!1;i=r.getNext(),o=s.getNext()}return i===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Ms?null:this.indexMap_.get(e.toString())}}H.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class KT extends H{constructor(){super(new ft(Gf),H.EMPTY_NODE,wn.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return H.EMPTY_NODE}isEmpty(){return!1}}const Xo=new KT;Object.defineProperties(Q,{MIN:{value:new Q(Gs,H.EMPTY_NODE)},MAX:{value:new Q(Hr,Xo)}});uw.__EMPTY_NODE=H.EMPTY_NODE;De.__childrenNodeConstructor=H;$T(Xo);HT(Xo);/**
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
 */const YT=!0;function Ce(t,e=null){if(t===null)return H.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),F(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new De(n,Ce(e))}if(!(t instanceof Array)&&YT){const n=[];let r=!1;if(He(t,(o,l)=>{if(o.substring(0,1)!=="."){const u=Ce(l);u.isEmpty()||(r=r||!u.getPriority().isEmpty(),n.push(new Q(o,u)))}}),n.length===0)return H.EMPTY_NODE;const i=zl(n,VT,o=>o.name,Gf);if(r){const o=zl(n,_e.getCompare());return new H(i,Ce(e),new wn({".priority":o},{".priority":_e}))}else return new H(i,Ce(e),wn.Default)}else{let n=H.EMPTY_NODE;return He(t,(r,s)=>{if(Xt(t,r)&&r.substring(0,1)!=="."){const i=Ce(s);(i.isLeafNode()||!i.isEmpty())&&(n=n.updateImmediateChild(r,i))}}),n.updatePriority(Ce(e))}}BT(Ce);/**
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
 */class QT extends Tc{constructor(e){super(),this.indexPath_=e,F(!X(e)&&Y(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const r=this.extractChild(e.node),s=this.extractChild(n.node),i=r.compareTo(s);return i===0?ts(e.name,n.name):i}makePost(e,n){const r=Ce(e),s=H.EMPTY_NODE.updateChild(this.indexPath_,r);return new Q(n,s)}maxPost(){const e=H.EMPTY_NODE.updateChild(this.indexPath_,Xo);return new Q(Hr,e)}toString(){return Ro(this.indexPath_,0).join("/")}}/**
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
 */class XT extends Tc{compare(e,n){const r=e.node.compareTo(n.node);return r===0?ts(e.name,n.name):r}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return Q.MIN}maxPost(){return Q.MAX}makePost(e,n){const r=Ce(e);return new Q(n,r)}toString(){return".value"}}const JT=new XT;/**
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
 */function mw(t){return{type:"value",snapshotNode:t}}function qs(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function Po(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function Ao(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function ZT(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
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
 */class qf{constructor(e){this.index_=e}updateChild(e,n,r,s,i,o){F(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const l=e.getImmediateChild(n);return l.getChild(s).equals(r.getChild(s))&&l.isEmpty()===r.isEmpty()||(o!=null&&(r.isEmpty()?e.hasChild(n)?o.trackChildChange(Po(n,l)):F(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):l.isEmpty()?o.trackChildChange(qs(n,r)):o.trackChildChange(Ao(n,r,l))),e.isLeafNode()&&r.isEmpty())?e:e.updateImmediateChild(n,r).withIndex(this.index_)}updateFullNode(e,n,r){return r!=null&&(e.isLeafNode()||e.forEachChild(_e,(s,i)=>{n.hasChild(s)||r.trackChildChange(Po(s,i))}),n.isLeafNode()||n.forEachChild(_e,(s,i)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(i)||r.trackChildChange(Ao(s,i,o))}else r.trackChildChange(qs(s,i))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?H.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
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
 */class jo{constructor(e){this.indexedFilter_=new qf(e.getIndex()),this.index_=e.getIndex(),this.startPost_=jo.getStartPost_(e),this.endPost_=jo.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,r=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&r}updateChild(e,n,r,s,i,o){return this.matches(new Q(n,r))||(r=H.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,r,s,i,o)}updateFullNode(e,n,r){n.isLeafNode()&&(n=H.EMPTY_NODE);let s=n.withIndex(this.index_);s=s.updatePriority(H.EMPTY_NODE);const i=this;return n.forEachChild(_e,(o,l)=>{i.matches(new Q(o,l))||(s=s.updateImmediateChild(o,H.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,r)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
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
 */class eb{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const r=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?r<=0:r<0},this.withinEndPost=n=>{const r=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?r<=0:r<0},this.rangedFilter_=new jo(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,r,s,i,o){return this.rangedFilter_.matches(new Q(n,r))||(r=H.EMPTY_NODE),e.getImmediateChild(n).equals(r)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,r,s,i,o):this.fullLimitUpdateChild_(e,n,r,i,o)}updateFullNode(e,n,r){let s;if(n.isLeafNode()||n.isEmpty())s=H.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){s=H.EMPTY_NODE.withIndex(this.index_);let i;this.reverse_?i=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):i=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;i.hasNext()&&o<this.limit_;){const l=i.getNext();if(this.withinDirectionalStart(l))if(this.withinDirectionalEnd(l))s=s.updateImmediateChild(l.name,l.node),o++;else break;else continue}}else{s=n.withIndex(this.index_),s=s.updatePriority(H.EMPTY_NODE);let i;this.reverse_?i=s.getReverseIterator(this.index_):i=s.getIterator(this.index_);let o=0;for(;i.hasNext();){const l=i.getNext();o<this.limit_&&this.withinDirectionalStart(l)&&this.withinDirectionalEnd(l)?o++:s=s.updateImmediateChild(l.name,H.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,r)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,r,s,i){let o;if(this.reverse_){const p=this.index_.getCompare();o=(v,S)=>p(S,v)}else o=this.index_.getCompare();const l=e;F(l.numChildren()===this.limit_,"");const u=new Q(n,r),h=this.reverse_?l.getFirstChild(this.index_):l.getLastChild(this.index_),m=this.rangedFilter_.matches(u);if(l.hasChild(n)){const p=l.getImmediateChild(n);let v=s.getChildAfterChild(this.index_,h,this.reverse_);for(;v!=null&&(v.name===n||l.hasChild(v.name));)v=s.getChildAfterChild(this.index_,v,this.reverse_);const S=v==null?1:o(v,u);if(m&&!r.isEmpty()&&S>=0)return i!=null&&i.trackChildChange(Ao(n,r,p)),l.updateImmediateChild(n,r);{i!=null&&i.trackChildChange(Po(n,p));const P=l.updateImmediateChild(n,H.EMPTY_NODE);return v!=null&&this.rangedFilter_.matches(v)?(i!=null&&i.trackChildChange(qs(v.name,v.node)),P.updateImmediateChild(v.name,v.node)):P}}else return r.isEmpty()?e:m&&o(h,u)>=0?(i!=null&&(i.trackChildChange(Po(h.name,h.node)),i.trackChildChange(qs(n,r))),l.updateImmediateChild(n,r).updateImmediateChild(h.name,H.EMPTY_NODE)):e}}/**
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
 */class Kf{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=_e}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return F(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return F(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Gs}hasEnd(){return this.endSet_}getIndexEndValue(){return F(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return F(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Hr}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return F(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===_e}copy(){const e=new Kf;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function tb(t){return t.loadsAllData()?new qf(t.getIndex()):t.hasLimit()?new eb(t):new jo(t)}function I0(t){const e={};if(t.isDefault())return e;let n;if(t.index_===_e?n="$priority":t.index_===JT?n="$value":t.index_===Ms?n="$key":(F(t.index_ instanceof QT,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=Ae(n),t.startSet_){const r=t.startAfterSet_?"startAfter":"startAt";e[r]=Ae(t.indexStartValue_),t.startNameSet_&&(e[r]+=","+Ae(t.indexStartName_))}if(t.endSet_){const r=t.endBeforeSet_?"endBefore":"endAt";e[r]=Ae(t.indexEndValue_),t.endNameSet_&&(e[r]+=","+Ae(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function T0(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==_e&&(e.i=t.index_.toString()),e}/**
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
 */class Vl extends ow{constructor(e,n,r,s){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=r,this.appCheckTokenProvider_=s,this.log_=Qo("p:rest:"),this.listens_={}}reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(F(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}listen(e,n,r,s){const i=e._path.toString();this.log_("Listen called for "+i+" "+e._queryIdentifier);const o=Vl.getListenId_(e,r),l={};this.listens_[o]=l;const u=I0(e._queryParams);this.restRequest_(i+".json",u,(h,m)=>{let p=m;if(h===404&&(p=null,h=null),h===null&&this.onDataUpdate_(i,p,!1,r),Vr(this.listens_,o)===l){let v;h?h===401?v="permission_denied":v="rest_error:"+h:v="ok",s(v,null)}})}unlisten(e,n){const r=Vl.getListenId_(e,n);delete this.listens_[r]}get(e){const n=I0(e._queryParams),r=e._path.toString(),s=new ri;return this.restRequest_(r+".json",n,(i,o)=>{let l=o;i===404&&(l=null,i=null),i===null?(this.onDataUpdate_(r,l,!1,null),s.resolve(l)):s.reject(new Error(l))}),s.promise}refreshAuthToken(e){}restRequest_(e,n={},r){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,i])=>{s&&s.accessToken&&(n.auth=s.accessToken),i&&i.token&&(n.ac=i.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+si(n);this.log_("Sending REST request for "+o);const l=new XMLHttpRequest;l.onreadystatechange=()=>{if(r&&l.readyState===4){this.log_("REST Response for "+o+" received. status:",l.status,"response:",l.responseText);let u=null;if(l.status>=200&&l.status<300){try{u=No(l.responseText)}catch{it("Failed to parse JSON response for "+o+": "+l.responseText)}r(null,u)}else l.status!==401&&l.status!==404&&it("Got unsuccessful REST response for "+o+" Status: "+l.status),r(l.status);r=null}},l.open("GET",o,!0),l.send()})}}/**
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
 */class nb{constructor(){this.rootNode_=H.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
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
 */function $l(){return{value:null,children:new Map}}function gw(t,e,n){if(X(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const r=Y(e);t.children.has(r)||t.children.set(r,$l());const s=t.children.get(r);e=de(e),gw(s,e,n)}}function ph(t,e,n){t.value!==null?n(e,t.value):rb(t,(r,s)=>{const i=new le(e.toString()+"/"+r);ph(s,i,n)})}function rb(t,e){t.children.forEach((n,r)=>{e(r,n)})}/**
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
 */class sb{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n=Object.assign({},e);return this.last_&&He(this.last_,(r,s)=>{n[r]=n[r]-s}),this.last_=e,n}}/**
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
 */const b0=10*1e3,ib=30*1e3,ob=5*60*1e3;class ab{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new sb(e);const r=b0+(ib-b0)*Math.random();Ji(this.reportStats_.bind(this),Math.floor(r))}reportStats_(){const e=this.statsListener_.get(),n={};let r=!1;He(e,(s,i)=>{i>0&&Xt(this.statsToReport_,s)&&(n[s]=i,r=!0)}),r&&this.server_.reportStats(n),Ji(this.reportStats_.bind(this),Math.floor(Math.random()*2*ob))}}/**
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
 */var $t;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})($t||($t={}));function Yf(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Qf(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Xf(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
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
 */class Bl{constructor(e,n,r){this.path=e,this.affectedTree=n,this.revert=r,this.type=$t.ACK_USER_WRITE,this.source=Yf()}operationForChild(e){if(X(this.path)){if(this.affectedTree.value!=null)return F(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new le(e));return new Bl(re(),n,this.revert)}}else return F(Y(this.path)===e,"operationForChild called for unrelated child."),new Bl(de(this.path),this.affectedTree,this.revert)}}/**
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
 */class Oo{constructor(e,n){this.source=e,this.path=n,this.type=$t.LISTEN_COMPLETE}operationForChild(e){return X(this.path)?new Oo(this.source,re()):new Oo(this.source,de(this.path))}}/**
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
 */class Ks{constructor(e,n,r){this.source=e,this.path=n,this.children=r,this.type=$t.MERGE}operationForChild(e){if(X(this.path)){const n=this.children.subtree(new le(e));return n.isEmpty()?null:n.value?new Wr(this.source,re(),n.value):new Ks(this.source,re(),n)}else return F(Y(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Ks(this.source,de(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
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
 */class fr{constructor(e,n,r){this.node_=e,this.fullyInitialized_=n,this.filtered_=r}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(X(e))return this.isFullyInitialized()&&!this.filtered_;const n=Y(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
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
 */class lb{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function cb(t,e,n,r){const s=[],i=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&i.push(ZT(o.childName,o.snapshotNode))}),ji(t,s,"child_removed",e,r,n),ji(t,s,"child_added",e,r,n),ji(t,s,"child_moved",i,r,n),ji(t,s,"child_changed",e,r,n),ji(t,s,"value",e,r,n),s}function ji(t,e,n,r,s,i){const o=r.filter(l=>l.type===n);o.sort((l,u)=>db(t,l,u)),o.forEach(l=>{const u=ub(t,l,i);s.forEach(h=>{h.respondsTo(l.type)&&e.push(h.createEvent(u,t.query_))})})}function ub(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function db(t,e,n){if(e.childName==null||n.childName==null)throw ni("Should only compare child_ events.");const r=new Q(e.childName,e.snapshotNode),s=new Q(n.childName,n.snapshotNode);return t.index_.compare(r,s)}/**
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
 */function bc(t,e){return{eventCache:t,serverCache:e}}function Zi(t,e,n,r){return bc(new fr(e,n,r),t.serverCache)}function vw(t,e,n,r){return bc(t.eventCache,new fr(e,n,r))}function Hl(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function Gr(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
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
 */let Ju;const hb=()=>(Ju||(Ju=new ft(QI)),Ju);class ue{constructor(e,n=hb()){this.value=e,this.children=n}static fromObject(e){let n=new ue(null);return He(e,(r,s)=>{n=n.set(new le(r),s)}),n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:re(),value:this.value};if(X(e))return null;{const r=Y(e),s=this.children.get(r);if(s!==null){const i=s.findRootMostMatchingPathAndValue(de(e),n);return i!=null?{path:ke(new le(r),i.path),value:i.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(X(e))return this;{const n=Y(e),r=this.children.get(n);return r!==null?r.subtree(de(e)):new ue(null)}}set(e,n){if(X(e))return new ue(n,this.children);{const r=Y(e),i=(this.children.get(r)||new ue(null)).set(de(e),n),o=this.children.insert(r,i);return new ue(this.value,o)}}remove(e){if(X(e))return this.children.isEmpty()?new ue(null):new ue(null,this.children);{const n=Y(e),r=this.children.get(n);if(r){const s=r.remove(de(e));let i;return s.isEmpty()?i=this.children.remove(n):i=this.children.insert(n,s),this.value===null&&i.isEmpty()?new ue(null):new ue(this.value,i)}else return this}}get(e){if(X(e))return this.value;{const n=Y(e),r=this.children.get(n);return r?r.get(de(e)):null}}setTree(e,n){if(X(e))return n;{const r=Y(e),i=(this.children.get(r)||new ue(null)).setTree(de(e),n);let o;return i.isEmpty()?o=this.children.remove(r):o=this.children.insert(r,i),new ue(this.value,o)}}fold(e){return this.fold_(re(),e)}fold_(e,n){const r={};return this.children.inorderTraversal((s,i)=>{r[s]=i.fold_(ke(e,s),n)}),n(e,this.value,r)}findOnPath(e,n){return this.findOnPath_(e,re(),n)}findOnPath_(e,n,r){const s=this.value?r(n,this.value):!1;if(s)return s;if(X(e))return null;{const i=Y(e),o=this.children.get(i);return o?o.findOnPath_(de(e),ke(n,i),r):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,re(),n)}foreachOnPath_(e,n,r){if(X(e))return this;{this.value&&r(n,this.value);const s=Y(e),i=this.children.get(s);return i?i.foreachOnPath_(de(e),ke(n,s),r):new ue(null)}}foreach(e){this.foreach_(re(),e)}foreach_(e,n){this.children.inorderTraversal((r,s)=>{s.foreach_(ke(e,r),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,r)=>{r.value&&e(n,r.value)})}}/**
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
 */class Gt{constructor(e){this.writeTree_=e}static empty(){return new Gt(new ue(null))}}function eo(t,e,n){if(X(e))return new Gt(new ue(n));{const r=t.writeTree_.findRootMostValueAndPath(e);if(r!=null){const s=r.path;let i=r.value;const o=rt(s,e);return i=i.updateChild(o,n),new Gt(t.writeTree_.set(s,i))}else{const s=new ue(n),i=t.writeTree_.setTree(e,s);return new Gt(i)}}}function mh(t,e,n){let r=t;return He(n,(s,i)=>{r=eo(r,ke(e,s),i)}),r}function R0(t,e){if(X(e))return Gt.empty();{const n=t.writeTree_.setTree(e,new ue(null));return new Gt(n)}}function gh(t,e){return ns(t,e)!=null}function ns(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(rt(n.path,e)):null}function P0(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(_e,(r,s)=>{e.push(new Q(r,s))}):t.writeTree_.children.inorderTraversal((r,s)=>{s.value!=null&&e.push(new Q(r,s.value))}),e}function lr(t,e){if(X(e))return t;{const n=ns(t,e);return n!=null?new Gt(new ue(n)):new Gt(t.writeTree_.subtree(e))}}function vh(t){return t.writeTree_.isEmpty()}function Ys(t,e){return yw(re(),t.writeTree_,e)}function yw(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let r=null;return e.children.inorderTraversal((s,i)=>{s===".priority"?(F(i.value!==null,"Priority writes must always be leaf nodes"),r=i.value):n=yw(ke(t,s),i,n)}),!n.getChild(t).isEmpty()&&r!==null&&(n=n.updateChild(ke(t,".priority"),r)),n}}/**
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
 */function Rc(t,e){return Ew(e,t)}function fb(t,e,n,r,s){F(r>t.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),t.allWrites.push({path:e,snap:n,writeId:r,visible:s}),s&&(t.visibleWrites=eo(t.visibleWrites,e,n)),t.lastWriteId=r}function pb(t,e,n,r){F(r>t.lastWriteId,"Stacking an older merge on top of newer ones"),t.allWrites.push({path:e,children:n,writeId:r,visible:!0}),t.visibleWrites=mh(t.visibleWrites,e,n),t.lastWriteId=r}function mb(t,e){for(let n=0;n<t.allWrites.length;n++){const r=t.allWrites[n];if(r.writeId===e)return r}return null}function gb(t,e){const n=t.allWrites.findIndex(l=>l.writeId===e);F(n>=0,"removeWrite called with nonexistent writeId.");const r=t.allWrites[n];t.allWrites.splice(n,1);let s=r.visible,i=!1,o=t.allWrites.length-1;for(;s&&o>=0;){const l=t.allWrites[o];l.visible&&(o>=n&&vb(l,r.path)?s=!1:Pt(r.path,l.path)&&(i=!0)),o--}if(s){if(i)return yb(t),!0;if(r.snap)t.visibleWrites=R0(t.visibleWrites,r.path);else{const l=r.children;He(l,u=>{t.visibleWrites=R0(t.visibleWrites,ke(r.path,u))})}return!0}else return!1}function vb(t,e){if(t.snap)return Pt(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&Pt(ke(t.path,n),e))return!0;return!1}function yb(t){t.visibleWrites=_w(t.allWrites,_b,re()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function _b(t){return t.visible}function _w(t,e,n){let r=Gt.empty();for(let s=0;s<t.length;++s){const i=t[s];if(e(i)){const o=i.path;let l;if(i.snap)Pt(n,o)?(l=rt(n,o),r=eo(r,l,i.snap)):Pt(o,n)&&(l=rt(o,n),r=eo(r,re(),i.snap.getChild(l)));else if(i.children){if(Pt(n,o))l=rt(n,o),r=mh(r,l,i.children);else if(Pt(o,n))if(l=rt(o,n),X(l))r=mh(r,re(),i.children);else{const u=Vr(i.children,Y(l));if(u){const h=u.getChild(de(l));r=eo(r,re(),h)}}}else throw ni("WriteRecord should have .snap or .children")}}return r}function xw(t,e,n,r,s){if(!r&&!s){const i=ns(t.visibleWrites,e);if(i!=null)return i;{const o=lr(t.visibleWrites,e);if(vh(o))return n;if(n==null&&!gh(o,re()))return null;{const l=n||H.EMPTY_NODE;return Ys(o,l)}}}else{const i=lr(t.visibleWrites,e);if(!s&&vh(i))return n;if(!s&&n==null&&!gh(i,re()))return null;{const o=function(h){return(h.visible||s)&&(!r||!~r.indexOf(h.writeId))&&(Pt(h.path,e)||Pt(e,h.path))},l=_w(t.allWrites,o,e),u=n||H.EMPTY_NODE;return Ys(l,u)}}}function xb(t,e,n){let r=H.EMPTY_NODE;const s=ns(t.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(_e,(i,o)=>{r=r.updateImmediateChild(i,o)}),r;if(n){const i=lr(t.visibleWrites,e);return n.forEachChild(_e,(o,l)=>{const u=Ys(lr(i,new le(o)),l);r=r.updateImmediateChild(o,u)}),P0(i).forEach(o=>{r=r.updateImmediateChild(o.name,o.node)}),r}else{const i=lr(t.visibleWrites,e);return P0(i).forEach(o=>{r=r.updateImmediateChild(o.name,o.node)}),r}}function wb(t,e,n,r,s){F(r||s,"Either existingEventSnap or existingServerSnap must exist");const i=ke(e,n);if(gh(t.visibleWrites,i))return null;{const o=lr(t.visibleWrites,i);return vh(o)?s.getChild(n):Ys(o,s.getChild(n))}}function Eb(t,e,n,r){const s=ke(e,n),i=ns(t.visibleWrites,s);if(i!=null)return i;if(r.isCompleteForChild(n)){const o=lr(t.visibleWrites,s);return Ys(o,r.getNode().getImmediateChild(n))}else return null}function kb(t,e){return ns(t.visibleWrites,e)}function Sb(t,e,n,r,s,i,o){let l;const u=lr(t.visibleWrites,e),h=ns(u,re());if(h!=null)l=h;else if(n!=null)l=Ys(u,n);else return[];if(l=l.withIndex(o),!l.isEmpty()&&!l.isLeafNode()){const m=[],p=o.getCompare(),v=i?l.getReverseIteratorFrom(r,o):l.getIteratorFrom(r,o);let S=v.getNext();for(;S&&m.length<s;)p(S,r)!==0&&m.push(S),S=v.getNext();return m}else return[]}function Nb(){return{visibleWrites:Gt.empty(),allWrites:[],lastWriteId:-1}}function Wl(t,e,n,r){return xw(t.writeTree,t.treePath,e,n,r)}function Jf(t,e){return xb(t.writeTree,t.treePath,e)}function A0(t,e,n,r){return wb(t.writeTree,t.treePath,e,n,r)}function Gl(t,e){return kb(t.writeTree,ke(t.treePath,e))}function Cb(t,e,n,r,s,i){return Sb(t.writeTree,t.treePath,e,n,r,s,i)}function Zf(t,e,n){return Eb(t.writeTree,t.treePath,e,n)}function ww(t,e){return Ew(ke(t.treePath,e),t.writeTree)}function Ew(t,e){return{treePath:t,writeTree:e}}/**
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
 */class Ib{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,r=e.childName;F(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),F(r!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(r);if(s){const i=s.type;if(n==="child_added"&&i==="child_removed")this.changeMap.set(r,Ao(r,e.snapshotNode,s.snapshotNode));else if(n==="child_removed"&&i==="child_added")this.changeMap.delete(r);else if(n==="child_removed"&&i==="child_changed")this.changeMap.set(r,Po(r,s.oldSnap));else if(n==="child_changed"&&i==="child_added")this.changeMap.set(r,qs(r,e.snapshotNode));else if(n==="child_changed"&&i==="child_changed")this.changeMap.set(r,Ao(r,e.snapshotNode,s.oldSnap));else throw ni("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(r,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
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
 */class Tb{getCompleteChild(e){return null}getChildAfterChild(e,n,r){return null}}const kw=new Tb;class ep{constructor(e,n,r=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=r}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const r=this.optCompleteServerCache_!=null?new fr(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Zf(this.writes_,e,r)}}getChildAfterChild(e,n,r){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Gr(this.viewCache_),i=Cb(this.writes_,s,n,1,r,e);return i.length===0?null:i[0]}}/**
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
 */function bb(t){return{filter:t}}function Rb(t,e){F(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),F(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function Pb(t,e,n,r,s){const i=new Ib;let o,l;if(n.type===$t.OVERWRITE){const h=n;h.source.fromUser?o=yh(t,e,h.path,h.snap,r,s,i):(F(h.source.fromServer,"Unknown source."),l=h.source.tagged||e.serverCache.isFiltered()&&!X(h.path),o=ql(t,e,h.path,h.snap,r,s,l,i))}else if(n.type===$t.MERGE){const h=n;h.source.fromUser?o=jb(t,e,h.path,h.children,r,s,i):(F(h.source.fromServer,"Unknown source."),l=h.source.tagged||e.serverCache.isFiltered(),o=_h(t,e,h.path,h.children,r,s,l,i))}else if(n.type===$t.ACK_USER_WRITE){const h=n;h.revert?o=Lb(t,e,h.path,r,s,i):o=Ob(t,e,h.path,h.affectedTree,r,s,i)}else if(n.type===$t.LISTEN_COMPLETE)o=Db(t,e,n.path,r,i);else throw ni("Unknown operation type: "+n.type);const u=i.getChanges();return Ab(e,o,u),{viewCache:o,changes:u}}function Ab(t,e,n){const r=e.eventCache;if(r.isFullyInitialized()){const s=r.getNode().isLeafNode()||r.getNode().isEmpty(),i=Hl(t);(n.length>0||!t.eventCache.isFullyInitialized()||s&&!r.getNode().equals(i)||!r.getNode().getPriority().equals(i.getPriority()))&&n.push(mw(Hl(e)))}}function Sw(t,e,n,r,s,i){const o=e.eventCache;if(Gl(r,n)!=null)return e;{let l,u;if(X(n))if(F(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const h=Gr(e),m=h instanceof H?h:H.EMPTY_NODE,p=Jf(r,m);l=t.filter.updateFullNode(e.eventCache.getNode(),p,i)}else{const h=Wl(r,Gr(e));l=t.filter.updateFullNode(e.eventCache.getNode(),h,i)}else{const h=Y(n);if(h===".priority"){F(hr(n)===1,"Can't have a priority with additional path components");const m=o.getNode();u=e.serverCache.getNode();const p=A0(r,n,m,u);p!=null?l=t.filter.updatePriority(m,p):l=o.getNode()}else{const m=de(n);let p;if(o.isCompleteForChild(h)){u=e.serverCache.getNode();const v=A0(r,n,o.getNode(),u);v!=null?p=o.getNode().getImmediateChild(h).updateChild(m,v):p=o.getNode().getImmediateChild(h)}else p=Zf(r,h,e.serverCache);p!=null?l=t.filter.updateChild(o.getNode(),h,p,m,s,i):l=o.getNode()}}return Zi(e,l,o.isFullyInitialized()||X(n),t.filter.filtersNodes())}}function ql(t,e,n,r,s,i,o,l){const u=e.serverCache;let h;const m=o?t.filter:t.filter.getIndexedFilter();if(X(n))h=m.updateFullNode(u.getNode(),r,null);else if(m.filtersNodes()&&!u.isFiltered()){const S=u.getNode().updateChild(n,r);h=m.updateFullNode(u.getNode(),S,null)}else{const S=Y(n);if(!u.isCompleteForPath(n)&&hr(n)>1)return e;const I=de(n),D=u.getNode().getImmediateChild(S).updateChild(I,r);S===".priority"?h=m.updatePriority(u.getNode(),D):h=m.updateChild(u.getNode(),S,D,I,kw,null)}const p=vw(e,h,u.isFullyInitialized()||X(n),m.filtersNodes()),v=new ep(s,p,i);return Sw(t,p,n,s,v,l)}function yh(t,e,n,r,s,i,o){const l=e.eventCache;let u,h;const m=new ep(s,e,i);if(X(n))h=t.filter.updateFullNode(e.eventCache.getNode(),r,o),u=Zi(e,h,!0,t.filter.filtersNodes());else{const p=Y(n);if(p===".priority")h=t.filter.updatePriority(e.eventCache.getNode(),r),u=Zi(e,h,l.isFullyInitialized(),l.isFiltered());else{const v=de(n),S=l.getNode().getImmediateChild(p);let I;if(X(v))I=r;else{const P=m.getCompleteChild(p);P!=null?Bf(v)===".priority"&&P.getChild(lw(v)).isEmpty()?I=P:I=P.updateChild(v,r):I=H.EMPTY_NODE}if(S.equals(I))u=e;else{const P=t.filter.updateChild(l.getNode(),p,I,v,m,o);u=Zi(e,P,l.isFullyInitialized(),t.filter.filtersNodes())}}}return u}function j0(t,e){return t.eventCache.isCompleteForChild(e)}function jb(t,e,n,r,s,i,o){let l=e;return r.foreach((u,h)=>{const m=ke(n,u);j0(e,Y(m))&&(l=yh(t,l,m,h,s,i,o))}),r.foreach((u,h)=>{const m=ke(n,u);j0(e,Y(m))||(l=yh(t,l,m,h,s,i,o))}),l}function O0(t,e,n){return n.foreach((r,s)=>{e=e.updateChild(r,s)}),e}function _h(t,e,n,r,s,i,o,l){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let u=e,h;X(n)?h=r:h=new ue(null).setTree(n,r);const m=e.serverCache.getNode();return h.children.inorderTraversal((p,v)=>{if(m.hasChild(p)){const S=e.serverCache.getNode().getImmediateChild(p),I=O0(t,S,v);u=ql(t,u,new le(p),I,s,i,o,l)}}),h.children.inorderTraversal((p,v)=>{const S=!e.serverCache.isCompleteForChild(p)&&v.value===null;if(!m.hasChild(p)&&!S){const I=e.serverCache.getNode().getImmediateChild(p),P=O0(t,I,v);u=ql(t,u,new le(p),P,s,i,o,l)}}),u}function Ob(t,e,n,r,s,i,o){if(Gl(s,n)!=null)return e;const l=e.serverCache.isFiltered(),u=e.serverCache;if(r.value!=null){if(X(n)&&u.isFullyInitialized()||u.isCompleteForPath(n))return ql(t,e,n,u.getNode().getChild(n),s,i,l,o);if(X(n)){let h=new ue(null);return u.getNode().forEachChild(Ms,(m,p)=>{h=h.set(new le(m),p)}),_h(t,e,n,h,s,i,l,o)}else return e}else{let h=new ue(null);return r.foreach((m,p)=>{const v=ke(n,m);u.isCompleteForPath(v)&&(h=h.set(m,u.getNode().getChild(v)))}),_h(t,e,n,h,s,i,l,o)}}function Db(t,e,n,r,s){const i=e.serverCache,o=vw(e,i.getNode(),i.isFullyInitialized()||X(n),i.isFiltered());return Sw(t,o,n,r,kw,s)}function Lb(t,e,n,r,s,i){let o;if(Gl(r,n)!=null)return e;{const l=new ep(r,e,s),u=e.eventCache.getNode();let h;if(X(n)||Y(n)===".priority"){let m;if(e.serverCache.isFullyInitialized())m=Wl(r,Gr(e));else{const p=e.serverCache.getNode();F(p instanceof H,"serverChildren would be complete if leaf node"),m=Jf(r,p)}m=m,h=t.filter.updateFullNode(u,m,i)}else{const m=Y(n);let p=Zf(r,m,e.serverCache);p==null&&e.serverCache.isCompleteForChild(m)&&(p=u.getImmediateChild(m)),p!=null?h=t.filter.updateChild(u,m,p,de(n),l,i):e.eventCache.getNode().hasChild(m)?h=t.filter.updateChild(u,m,H.EMPTY_NODE,de(n),l,i):h=u,h.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Wl(r,Gr(e)),o.isLeafNode()&&(h=t.filter.updateFullNode(h,o,i)))}return o=e.serverCache.isFullyInitialized()||Gl(r,re())!=null,Zi(e,h,o,t.filter.filtersNodes())}}/**
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
 */class Mb{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const r=this.query_._queryParams,s=new qf(r.getIndex()),i=tb(r);this.processor_=bb(i);const o=n.serverCache,l=n.eventCache,u=s.updateFullNode(H.EMPTY_NODE,o.getNode(),null),h=i.updateFullNode(H.EMPTY_NODE,l.getNode(),null),m=new fr(u,o.isFullyInitialized(),s.filtersNodes()),p=new fr(h,l.isFullyInitialized(),i.filtersNodes());this.viewCache_=bc(p,m),this.eventGenerator_=new lb(this.query_)}get query(){return this.query_}}function Fb(t){return t.viewCache_.serverCache.getNode()}function Ub(t){return Hl(t.viewCache_)}function zb(t,e){const n=Gr(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!X(e)&&!n.getImmediateChild(Y(e)).isEmpty())?n.getChild(e):null}function D0(t){return t.eventRegistrations_.length===0}function Vb(t,e){t.eventRegistrations_.push(e)}function L0(t,e,n){const r=[];if(n){F(e==null,"A cancel should cancel all event registrations.");const s=t.query._path;t.eventRegistrations_.forEach(i=>{const o=i.createCancelEvent(n,s);o&&r.push(o)})}if(e){let s=[];for(let i=0;i<t.eventRegistrations_.length;++i){const o=t.eventRegistrations_[i];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(t.eventRegistrations_.slice(i+1));break}}t.eventRegistrations_=s}else t.eventRegistrations_=[];return r}function M0(t,e,n,r){e.type===$t.MERGE&&e.source.queryId!==null&&(F(Gr(t.viewCache_),"We should always have a full cache before handling merges"),F(Hl(t.viewCache_),"Missing event cache, even though we have a server cache"));const s=t.viewCache_,i=Pb(t.processor_,s,e,n,r);return Rb(t.processor_,i.viewCache),F(i.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=i.viewCache,Nw(t,i.changes,i.viewCache.eventCache.getNode(),null)}function $b(t,e){const n=t.viewCache_.eventCache,r=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(_e,(i,o)=>{r.push(qs(i,o))}),n.isFullyInitialized()&&r.push(mw(n.getNode())),Nw(t,r,n.getNode(),e)}function Nw(t,e,n,r){const s=r?[r]:t.eventRegistrations_;return cb(t.eventGenerator_,e,n,s)}/**
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
 */let Kl;class Cw{constructor(){this.views=new Map}}function Bb(t){F(!Kl,"__referenceConstructor has already been defined"),Kl=t}function Hb(){return F(Kl,"Reference.ts has not been loaded"),Kl}function Wb(t){return t.views.size===0}function tp(t,e,n,r){const s=e.source.queryId;if(s!==null){const i=t.views.get(s);return F(i!=null,"SyncTree gave us an op for an invalid query."),M0(i,e,n,r)}else{let i=[];for(const o of t.views.values())i=i.concat(M0(o,e,n,r));return i}}function Iw(t,e,n,r,s){const i=e._queryIdentifier,o=t.views.get(i);if(!o){let l=Wl(n,s?r:null),u=!1;l?u=!0:r instanceof H?(l=Jf(n,r),u=!1):(l=H.EMPTY_NODE,u=!1);const h=bc(new fr(l,u,!1),new fr(r,s,!1));return new Mb(e,h)}return o}function Gb(t,e,n,r,s,i){const o=Iw(t,e,r,s,i);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),Vb(o,n),$b(o,n)}function qb(t,e,n,r){const s=e._queryIdentifier,i=[];let o=[];const l=pr(t);if(s==="default")for(const[u,h]of t.views.entries())o=o.concat(L0(h,n,r)),D0(h)&&(t.views.delete(u),h.query._queryParams.loadsAllData()||i.push(h.query));else{const u=t.views.get(s);u&&(o=o.concat(L0(u,n,r)),D0(u)&&(t.views.delete(s),u.query._queryParams.loadsAllData()||i.push(u.query)))}return l&&!pr(t)&&i.push(new(Hb())(e._repo,e._path)),{removed:i,events:o}}function Tw(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function cr(t,e){let n=null;for(const r of t.views.values())n=n||zb(r,e);return n}function bw(t,e){if(e._queryParams.loadsAllData())return Pc(t);{const r=e._queryIdentifier;return t.views.get(r)}}function Rw(t,e){return bw(t,e)!=null}function pr(t){return Pc(t)!=null}function Pc(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
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
 */let Yl;function Kb(t){F(!Yl,"__referenceConstructor has already been defined"),Yl=t}function Yb(){return F(Yl,"Reference.ts has not been loaded"),Yl}let Qb=1;class F0{constructor(e){this.listenProvider_=e,this.syncPointTree_=new ue(null),this.pendingWriteTree_=Nb(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function np(t,e,n,r,s){return fb(t.pendingWriteTree_,e,n,r,s),s?ai(t,new Wr(Yf(),e,n)):[]}function Xb(t,e,n,r){pb(t.pendingWriteTree_,e,n,r);const s=ue.fromObject(n);return ai(t,new Ks(Yf(),e,s))}function Xn(t,e,n=!1){const r=mb(t.pendingWriteTree_,e);if(gb(t.pendingWriteTree_,e)){let i=new ue(null);return r.snap!=null?i=i.set(re(),!0):He(r.children,o=>{i=i.set(new le(o),!0)}),ai(t,new Bl(r.path,i,n))}else return[]}function Jo(t,e,n){return ai(t,new Wr(Qf(),e,n))}function Jb(t,e,n){const r=ue.fromObject(n);return ai(t,new Ks(Qf(),e,r))}function Zb(t,e){return ai(t,new Oo(Qf(),e))}function eR(t,e,n){const r=rp(t,n);if(r){const s=sp(r),i=s.path,o=s.queryId,l=rt(i,e),u=new Oo(Xf(o),l);return ip(t,i,u)}else return[]}function Ql(t,e,n,r,s=!1){const i=e._path,o=t.syncPointTree_.get(i);let l=[];if(o&&(e._queryIdentifier==="default"||Rw(o,e))){const u=qb(o,e,n,r);Wb(o)&&(t.syncPointTree_=t.syncPointTree_.remove(i));const h=u.removed;if(l=u.events,!s){const m=h.findIndex(v=>v._queryParams.loadsAllData())!==-1,p=t.syncPointTree_.findOnPath(i,(v,S)=>pr(S));if(m&&!p){const v=t.syncPointTree_.subtree(i);if(!v.isEmpty()){const S=rR(v);for(let I=0;I<S.length;++I){const P=S[I],D=P.query,T=Ow(t,P);t.listenProvider_.startListening(to(D),Do(t,D),T.hashFn,T.onComplete)}}}!p&&h.length>0&&!r&&(m?t.listenProvider_.stopListening(to(e),null):h.forEach(v=>{const S=t.queryToTagMap.get(jc(v));t.listenProvider_.stopListening(to(v),S)}))}sR(t,h)}return l}function Pw(t,e,n,r){const s=rp(t,r);if(s!=null){const i=sp(s),o=i.path,l=i.queryId,u=rt(o,e),h=new Wr(Xf(l),u,n);return ip(t,o,h)}else return[]}function tR(t,e,n,r){const s=rp(t,r);if(s){const i=sp(s),o=i.path,l=i.queryId,u=rt(o,e),h=ue.fromObject(n),m=new Ks(Xf(l),u,h);return ip(t,o,m)}else return[]}function xh(t,e,n,r=!1){const s=e._path;let i=null,o=!1;t.syncPointTree_.foreachOnPath(s,(v,S)=>{const I=rt(v,s);i=i||cr(S,I),o=o||pr(S)});let l=t.syncPointTree_.get(s);l?(o=o||pr(l),i=i||cr(l,re())):(l=new Cw,t.syncPointTree_=t.syncPointTree_.set(s,l));let u;i!=null?u=!0:(u=!1,i=H.EMPTY_NODE,t.syncPointTree_.subtree(s).foreachChild((S,I)=>{const P=cr(I,re());P&&(i=i.updateImmediateChild(S,P))}));const h=Rw(l,e);if(!h&&!e._queryParams.loadsAllData()){const v=jc(e);F(!t.queryToTagMap.has(v),"View does not exist, but we have a tag");const S=iR();t.queryToTagMap.set(v,S),t.tagToQueryMap.set(S,v)}const m=Rc(t.pendingWriteTree_,s);let p=Gb(l,e,n,m,i,u);if(!h&&!o&&!r){const v=bw(l,e);p=p.concat(oR(t,e,v))}return p}function Ac(t,e,n){const s=t.pendingWriteTree_,i=t.syncPointTree_.findOnPath(e,(o,l)=>{const u=rt(o,e),h=cr(l,u);if(h)return h});return xw(s,e,i,n,!0)}function nR(t,e){const n=e._path;let r=null;t.syncPointTree_.foreachOnPath(n,(h,m)=>{const p=rt(h,n);r=r||cr(m,p)});let s=t.syncPointTree_.get(n);s?r=r||cr(s,re()):(s=new Cw,t.syncPointTree_=t.syncPointTree_.set(n,s));const i=r!=null,o=i?new fr(r,!0,!1):null,l=Rc(t.pendingWriteTree_,e._path),u=Iw(s,e,l,i?o.getNode():H.EMPTY_NODE,i);return Ub(u)}function ai(t,e){return Aw(e,t.syncPointTree_,null,Rc(t.pendingWriteTree_,re()))}function Aw(t,e,n,r){if(X(t.path))return jw(t,e,n,r);{const s=e.get(re());n==null&&s!=null&&(n=cr(s,re()));let i=[];const o=Y(t.path),l=t.operationForChild(o),u=e.children.get(o);if(u&&l){const h=n?n.getImmediateChild(o):null,m=ww(r,o);i=i.concat(Aw(l,u,h,m))}return s&&(i=i.concat(tp(s,t,r,n))),i}}function jw(t,e,n,r){const s=e.get(re());n==null&&s!=null&&(n=cr(s,re()));let i=[];return e.children.inorderTraversal((o,l)=>{const u=n?n.getImmediateChild(o):null,h=ww(r,o),m=t.operationForChild(o);m&&(i=i.concat(jw(m,l,u,h)))}),s&&(i=i.concat(tp(s,t,r,n))),i}function Ow(t,e){const n=e.query,r=Do(t,n);return{hashFn:()=>(Fb(e)||H.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return r?eR(t,n._path,r):Zb(t,n._path);{const i=ZI(s,n);return Ql(t,n,null,i)}}}}function Do(t,e){const n=jc(e);return t.queryToTagMap.get(n)}function jc(t){return t._path.toString()+"$"+t._queryIdentifier}function rp(t,e){return t.tagToQueryMap.get(e)}function sp(t){const e=t.indexOf("$");return F(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new le(t.substr(0,e))}}function ip(t,e,n){const r=t.syncPointTree_.get(e);F(r,"Missing sync point for query tag that we're tracking");const s=Rc(t.pendingWriteTree_,e);return tp(r,n,s,null)}function rR(t){return t.fold((e,n,r)=>{if(n&&pr(n))return[Pc(n)];{let s=[];return n&&(s=Tw(n)),He(r,(i,o)=>{s=s.concat(o)}),s}})}function to(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(Yb())(t._repo,t._path):t}function sR(t,e){for(let n=0;n<e.length;++n){const r=e[n];if(!r._queryParams.loadsAllData()){const s=jc(r),i=t.queryToTagMap.get(s);t.queryToTagMap.delete(s),t.tagToQueryMap.delete(i)}}}function iR(){return Qb++}function oR(t,e,n){const r=e._path,s=Do(t,e),i=Ow(t,n),o=t.listenProvider_.startListening(to(e),s,i.hashFn,i.onComplete),l=t.syncPointTree_.subtree(r);if(s)F(!pr(l.value),"If we're adding a query, it shouldn't be shadowed");else{const u=l.fold((h,m,p)=>{if(!X(h)&&m&&pr(m))return[Pc(m).query];{let v=[];return m&&(v=v.concat(Tw(m).map(S=>S.query))),He(p,(S,I)=>{v=v.concat(I)}),v}});for(let h=0;h<u.length;++h){const m=u[h];t.listenProvider_.stopListening(to(m),Do(t,m))}}return o}/**
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
 */class op{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new op(n)}node(){return this.node_}}class ap{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=ke(this.path_,e);return new ap(this.syncTree_,n)}node(){return Ac(this.syncTree_,this.path_)}}const aR=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},U0=function(t,e,n){if(!t||typeof t!="object")return t;if(F(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return lR(t[".sv"],e,n);if(typeof t[".sv"]=="object")return cR(t[".sv"],e);F(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},lR=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:F(!1,"Unexpected server value: "+t)}},cR=function(t,e,n){t.hasOwnProperty("increment")||F(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const r=t.increment;typeof r!="number"&&F(!1,"Unexpected increment value: "+r);const s=e.node();if(F(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return r;const o=s.getValue();return typeof o!="number"?r:o+r},Dw=function(t,e,n,r){return cp(e,new ap(n,t),r)},lp=function(t,e,n){return cp(t,new op(e),n)};function cp(t,e,n){const r=t.getPriority().val(),s=U0(r,e.getImmediateChild(".priority"),n);let i;if(t.isLeafNode()){const o=t,l=U0(o.getValue(),e,n);return l!==o.getValue()||s!==o.getPriority().val()?new De(l,Ce(s)):t}else{const o=t;return i=o,s!==o.getPriority().val()&&(i=i.updatePriority(new De(s))),o.forEachChild(_e,(l,u)=>{const h=cp(u,e.getImmediateChild(l),n);h!==u&&(i=i.updateImmediateChild(l,h))}),i}}/**
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
 */class up{constructor(e="",n=null,r={children:{},childCount:0}){this.name=e,this.parent=n,this.node=r}}function Oc(t,e){let n=e instanceof le?e:new le(e),r=t,s=Y(n);for(;s!==null;){const i=Vr(r.node.children,s)||{children:{},childCount:0};r=new up(s,r,i),n=de(n),s=Y(n)}return r}function rs(t){return t.node.value}function dp(t,e){t.node.value=e,wh(t)}function Lw(t){return t.node.childCount>0}function uR(t){return rs(t)===void 0&&!Lw(t)}function Dc(t,e){He(t.node.children,(n,r)=>{e(new up(n,t,r))})}function Mw(t,e,n,r){n&&e(t),Dc(t,s=>{Mw(s,e,!0)})}function dR(t,e,n){let r=t.parent;for(;r!==null;){if(e(r))return!0;r=r.parent}return!1}function Zo(t){return new le(t.parent===null?t.name:Zo(t.parent)+"/"+t.name)}function wh(t){t.parent!==null&&hR(t.parent,t.name,t)}function hR(t,e,n){const r=uR(n),s=Xt(t.node.children,e);r&&s?(delete t.node.children[e],t.node.childCount--,wh(t)):!r&&!s&&(t.node.children[e]=n.node,t.node.childCount++,wh(t))}/**
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
 */const fR=/[\[\].#$\/\u0000-\u001F\u007F]/,pR=/[\[\].#$\u0000-\u001F\u007F]/,Zu=10*1024*1024,hp=function(t){return typeof t=="string"&&t.length!==0&&!fR.test(t)},Fw=function(t){return typeof t=="string"&&t.length!==0&&!pR.test(t)},mR=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),Fw(t)},Uw=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!Ff(t)||t&&typeof t=="object"&&Xt(t,".sv")},gR=function(t,e,n,r){ea(Ec(t,"value"),e,n)},ea=function(t,e,n){const r=n instanceof le?new jT(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+Cr(r));if(typeof e=="function")throw new Error(t+"contains a function "+Cr(r)+" with contents = "+e.toString());if(Ff(e))throw new Error(t+"contains "+e.toString()+" "+Cr(r));if(typeof e=="string"&&e.length>Zu/3&&kc(e)>Zu)throw new Error(t+"contains a string greater than "+Zu+" utf8 bytes "+Cr(r)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,i=!1;if(He(e,(o,l)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(i=!0,!hp(o)))throw new Error(t+" contains an invalid key ("+o+") "+Cr(r)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);OT(r,o),ea(t,l,r),DT(r)}),s&&i)throw new Error(t+' contains ".value" child '+Cr(r)+" in addition to actual children.")}},vR=function(t,e){let n,r;for(n=0;n<e.length;n++){r=e[n];const i=Ro(r);for(let o=0;o<i.length;o++)if(!(i[o]===".priority"&&o===i.length-1)){if(!hp(i[o]))throw new Error(t+"contains an invalid key ("+i[o]+") in path "+r.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(AT);let s=null;for(n=0;n<e.length;n++){if(r=e[n],s!==null&&Pt(s,r))throw new Error(t+"contains a path "+s.toString()+" that is ancestor of another path "+r.toString());s=r}},yR=function(t,e,n,r){const s=Ec(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const i=[];He(e,(o,l)=>{const u=new le(o);if(ea(s,l,ke(n,u)),Bf(u)===".priority"&&!Uw(l))throw new Error(s+"contains an invalid value for '"+u.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");i.push(u)}),vR(s,i)},zw=function(t,e,n,r){if(!Fw(n))throw new Error(Ec(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},_R=function(t,e,n,r){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),zw(t,e,n)},fp=function(t,e){if(Y(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},xR=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!hp(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!mR(n))throw new Error(Ec(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
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
 */class wR{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Lc(t,e){let n=null;for(let r=0;r<e.length;r++){const s=e[r],i=s.getPath();n!==null&&!Hf(i,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:i}),n.events.push(s)}n&&t.eventLists_.push(n)}function Vw(t,e,n){Lc(t,n),$w(t,r=>Hf(r,e))}function St(t,e,n){Lc(t,n),$w(t,r=>Pt(r,e)||Pt(e,r))}function $w(t,e){t.recursionDepth_++;let n=!0;for(let r=0;r<t.eventLists_.length;r++){const s=t.eventLists_[r];if(s){const i=s.path;e(i)?(ER(t.eventLists_[r]),t.eventLists_[r]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function ER(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const r=n.getEventRunner();Xi&&Ve("event: "+n.toString()),oi(r)}}}/**
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
 */const kR="repo_interrupt",SR=25;class NR{constructor(e,n,r,s){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=r,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new wR,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=$l(),this.transactionQueueTree_=new up,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function CR(t,e,n){if(t.stats_=Vf(t.repoInfo_),t.forceRestClient_||rT())t.server_=new Vl(t.repoInfo_,(r,s,i,o)=>{z0(t,r,s,i,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>V0(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{Ae(n)}catch(r){throw new Error("Invalid authOverride provided: "+r)}}t.persistentConnection_=new Sn(t.repoInfo_,e,(r,s,i,o)=>{z0(t,r,s,i,o)},r=>{V0(t,r)},r=>{TR(t,r)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(r=>{t.server_.refreshAuthToken(r)}),t.appCheckProvider_.addTokenChangeListener(r=>{t.server_.refreshAppCheckToken(r.token)}),t.statsReporter_=lT(t.repoInfo_,()=>new ab(t.stats_,t.server_)),t.infoData_=new nb,t.infoSyncTree_=new F0({startListening:(r,s,i,o)=>{let l=[];const u=t.infoData_.getNode(r._path);return u.isEmpty()||(l=Jo(t.infoSyncTree_,r._path,u),setTimeout(()=>{o("ok")},0)),l},stopListening:()=>{}}),pp(t,"connected",!1),t.serverSyncTree_=new F0({startListening:(r,s,i,o)=>(t.server_.listen(r,i,s,(l,u)=>{const h=o(l,u);St(t.eventQueue_,r._path,h)}),[]),stopListening:(r,s)=>{t.server_.unlisten(r,s)}})}function IR(t){const n=t.infoData_.getNode(new le(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function ta(t){return aR({timestamp:IR(t)})}function z0(t,e,n,r,s){t.dataUpdateCount++;const i=new le(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(s)if(r){const u=Pl(n,h=>Ce(h));o=tR(t.serverSyncTree_,i,u,s)}else{const u=Ce(n);o=Pw(t.serverSyncTree_,i,u,s)}else if(r){const u=Pl(n,h=>Ce(h));o=Jb(t.serverSyncTree_,i,u)}else{const u=Ce(n);o=Jo(t.serverSyncTree_,i,u)}let l=i;o.length>0&&(l=Qs(t,i)),St(t.eventQueue_,l,o)}function V0(t,e){pp(t,"connected",e),e===!1&&AR(t)}function TR(t,e){He(e,(n,r)=>{pp(t,n,r)})}function pp(t,e,n){const r=new le("/.info/"+e),s=Ce(n);t.infoData_.updateSnapshot(r,s);const i=Jo(t.infoSyncTree_,r,s);St(t.eventQueue_,r,i)}function Mc(t){return t.nextWriteId_++}function bR(t,e,n){const r=nR(t.serverSyncTree_,e);return r!=null?Promise.resolve(r):t.server_.get(e).then(s=>{const i=Ce(s).withIndex(e._queryParams.getIndex());xh(t.serverSyncTree_,e,n,!0);let o;if(e._queryParams.loadsAllData())o=Jo(t.serverSyncTree_,e._path,i);else{const l=Do(t.serverSyncTree_,e);o=Pw(t.serverSyncTree_,e._path,i,l)}return St(t.eventQueue_,e._path,o),Ql(t.serverSyncTree_,e,n,null,!0),i},s=>(li(t,"get for query "+Ae(e)+" failed: "+s),Promise.reject(new Error(s))))}function RR(t,e,n,r,s){li(t,"set",{path:e.toString(),value:n,priority:r});const i=ta(t),o=Ce(n,r),l=Ac(t.serverSyncTree_,e),u=lp(o,l,i),h=Mc(t),m=np(t.serverSyncTree_,e,u,h,!0);Lc(t.eventQueue_,m),t.server_.put(e.toString(),o.val(!0),(v,S)=>{const I=v==="ok";I||it("set at "+e+" failed: "+v);const P=Xn(t.serverSyncTree_,h,!I);St(t.eventQueue_,e,P),Eh(t,s,v,S)});const p=gp(t,e);Qs(t,p),St(t.eventQueue_,p,[])}function PR(t,e,n,r){li(t,"update",{path:e.toString(),value:n});let s=!0;const i=ta(t),o={};if(He(n,(l,u)=>{s=!1,o[l]=Dw(ke(e,l),Ce(u),t.serverSyncTree_,i)}),s)Ve("update() called with empty data.  Don't do anything."),Eh(t,r,"ok",void 0);else{const l=Mc(t),u=Xb(t.serverSyncTree_,e,o,l);Lc(t.eventQueue_,u),t.server_.merge(e.toString(),n,(h,m)=>{const p=h==="ok";p||it("update at "+e+" failed: "+h);const v=Xn(t.serverSyncTree_,l,!p),S=v.length>0?Qs(t,e):e;St(t.eventQueue_,S,v),Eh(t,r,h,m)}),He(n,h=>{const m=gp(t,ke(e,h));Qs(t,m)}),St(t.eventQueue_,e,[])}}function AR(t){li(t,"onDisconnectEvents");const e=ta(t),n=$l();ph(t.onDisconnect_,re(),(s,i)=>{const o=Dw(s,i,t.serverSyncTree_,e);gw(n,s,o)});let r=[];ph(n,re(),(s,i)=>{r=r.concat(Jo(t.serverSyncTree_,s,i));const o=gp(t,s);Qs(t,o)}),t.onDisconnect_=$l(),St(t.eventQueue_,re(),r)}function jR(t,e,n){let r;Y(e._path)===".info"?r=xh(t.infoSyncTree_,e,n):r=xh(t.serverSyncTree_,e,n),Vw(t.eventQueue_,e._path,r)}function OR(t,e,n){let r;Y(e._path)===".info"?r=Ql(t.infoSyncTree_,e,n):r=Ql(t.serverSyncTree_,e,n),Vw(t.eventQueue_,e._path,r)}function DR(t){t.persistentConnection_&&t.persistentConnection_.interrupt(kR)}function li(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),Ve(n,...e)}function Eh(t,e,n,r){e&&oi(()=>{if(n==="ok")e(null);else{const s=(n||"error").toUpperCase();let i=s;r&&(i+=": "+r);const o=new Error(i);o.code=s,e(o)}})}function LR(t,e,n,r,s,i){li(t,"transaction on "+e);const o={path:e,update:n,onComplete:r,status:null,order:zx(),applyLocally:i,retryCount:0,unwatcher:s,abortReason:null,currentWriteId:null,currentInputSnapshot:null,currentOutputSnapshotRaw:null,currentOutputSnapshotResolved:null},l=mp(t,e,void 0);o.currentInputSnapshot=l;const u=o.update(l.val());if(u===void 0)o.unwatcher(),o.currentOutputSnapshotRaw=null,o.currentOutputSnapshotResolved=null,o.onComplete&&o.onComplete(null,!1,o.currentInputSnapshot);else{ea("transaction failed: Data returned ",u,o.path),o.status=0;const h=Oc(t.transactionQueueTree_,e),m=rs(h)||[];m.push(o),dp(h,m);let p;typeof u=="object"&&u!==null&&Xt(u,".priority")?(p=Vr(u,".priority"),F(Uw(p),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):p=(Ac(t.serverSyncTree_,e)||H.EMPTY_NODE).getPriority().val();const v=ta(t),S=Ce(u,p),I=lp(S,l,v);o.currentOutputSnapshotRaw=S,o.currentOutputSnapshotResolved=I,o.currentWriteId=Mc(t);const P=np(t.serverSyncTree_,e,I,o.currentWriteId,o.applyLocally);St(t.eventQueue_,e,P),Fc(t,t.transactionQueueTree_)}}function mp(t,e,n){return Ac(t.serverSyncTree_,e,n)||H.EMPTY_NODE}function Fc(t,e=t.transactionQueueTree_){if(e||Uc(t,e),rs(e)){const n=Hw(t,e);F(n.length>0,"Sending zero length transaction queue"),n.every(s=>s.status===0)&&MR(t,Zo(e),n)}else Lw(e)&&Dc(e,n=>{Fc(t,n)})}function MR(t,e,n){const r=n.map(h=>h.currentWriteId),s=mp(t,e,r);let i=s;const o=s.hash();for(let h=0;h<n.length;h++){const m=n[h];F(m.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),m.status=1,m.retryCount++;const p=rt(e,m.path);i=i.updateChild(p,m.currentOutputSnapshotRaw)}const l=i.val(!0),u=e;t.server_.put(u.toString(),l,h=>{li(t,"transaction put response",{path:u.toString(),status:h});let m=[];if(h==="ok"){const p=[];for(let v=0;v<n.length;v++)n[v].status=2,m=m.concat(Xn(t.serverSyncTree_,n[v].currentWriteId)),n[v].onComplete&&p.push(()=>n[v].onComplete(null,!0,n[v].currentOutputSnapshotResolved)),n[v].unwatcher();Uc(t,Oc(t.transactionQueueTree_,e)),Fc(t,t.transactionQueueTree_),St(t.eventQueue_,e,m);for(let v=0;v<p.length;v++)oi(p[v])}else{if(h==="datastale")for(let p=0;p<n.length;p++)n[p].status===3?n[p].status=4:n[p].status=0;else{it("transaction at "+u.toString()+" failed: "+h);for(let p=0;p<n.length;p++)n[p].status=4,n[p].abortReason=h}Qs(t,e)}},o)}function Qs(t,e){const n=Bw(t,e),r=Zo(n),s=Hw(t,n);return FR(t,s,r),r}function FR(t,e,n){if(e.length===0)return;const r=[];let s=[];const o=e.filter(l=>l.status===0).map(l=>l.currentWriteId);for(let l=0;l<e.length;l++){const u=e[l],h=rt(n,u.path);let m=!1,p;if(F(h!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),u.status===4)m=!0,p=u.abortReason,s=s.concat(Xn(t.serverSyncTree_,u.currentWriteId,!0));else if(u.status===0)if(u.retryCount>=SR)m=!0,p="maxretry",s=s.concat(Xn(t.serverSyncTree_,u.currentWriteId,!0));else{const v=mp(t,u.path,o);u.currentInputSnapshot=v;const S=e[l].update(v.val());if(S!==void 0){ea("transaction failed: Data returned ",S,u.path);let I=Ce(S);typeof S=="object"&&S!=null&&Xt(S,".priority")||(I=I.updatePriority(v.getPriority()));const D=u.currentWriteId,T=ta(t),x=lp(I,v,T);u.currentOutputSnapshotRaw=I,u.currentOutputSnapshotResolved=x,u.currentWriteId=Mc(t),o.splice(o.indexOf(D),1),s=s.concat(np(t.serverSyncTree_,u.path,x,u.currentWriteId,u.applyLocally)),s=s.concat(Xn(t.serverSyncTree_,D,!0))}else m=!0,p="nodata",s=s.concat(Xn(t.serverSyncTree_,u.currentWriteId,!0))}St(t.eventQueue_,n,s),s=[],m&&(e[l].status=2,function(v){setTimeout(v,Math.floor(0))}(e[l].unwatcher),e[l].onComplete&&(p==="nodata"?r.push(()=>e[l].onComplete(null,!1,e[l].currentInputSnapshot)):r.push(()=>e[l].onComplete(new Error(p),!1,null))))}Uc(t,t.transactionQueueTree_);for(let l=0;l<r.length;l++)oi(r[l]);Fc(t,t.transactionQueueTree_)}function Bw(t,e){let n,r=t.transactionQueueTree_;for(n=Y(e);n!==null&&rs(r)===void 0;)r=Oc(r,n),e=de(e),n=Y(e);return r}function Hw(t,e){const n=[];return Ww(t,e,n),n.sort((r,s)=>r.order-s.order),n}function Ww(t,e,n){const r=rs(e);if(r)for(let s=0;s<r.length;s++)n.push(r[s]);Dc(e,s=>{Ww(t,s,n)})}function Uc(t,e){const n=rs(e);if(n){let r=0;for(let s=0;s<n.length;s++)n[s].status!==2&&(n[r]=n[s],r++);n.length=r,dp(e,n.length>0?n:void 0)}Dc(e,r=>{Uc(t,r)})}function gp(t,e){const n=Zo(Bw(t,e)),r=Oc(t.transactionQueueTree_,e);return dR(r,s=>{ed(t,s)}),ed(t,r),Mw(r,s=>{ed(t,s)}),n}function ed(t,e){const n=rs(e);if(n){const r=[];let s=[],i=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(F(i===o-1,"All SENT items should be at beginning of queue."),i=o,n[o].status=3,n[o].abortReason="set"):(F(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),s=s.concat(Xn(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&r.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));i===-1?dp(e,void 0):n.length=i+1,St(t.eventQueue_,Zo(e),s);for(let o=0;o<r.length;o++)oi(r[o])}}/**
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
 */function UR(t){let e="";const n=t.split("/");for(let r=0;r<n.length;r++)if(n[r].length>0){let s=n[r];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function zR(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const r=n.split("=");r.length===2?e[decodeURIComponent(r[0])]=decodeURIComponent(r[1]):it(`Invalid query segment '${n}' in query '${t}'`)}return e}const $0=function(t,e){const n=VR(t),r=n.namespace;n.domain==="firebase.com"&&An(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!r||r==="undefined")&&n.domain!=="localhost"&&An("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||KI();const s=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new Zx(n.host,n.secure,r,s,e,"",r!==n.subdomain),path:new le(n.pathString)}},VR=function(t){let e="",n="",r="",s="",i="",o=!0,l="https",u=443;if(typeof t=="string"){let h=t.indexOf("//");h>=0&&(l=t.substring(0,h-1),t=t.substring(h+2));let m=t.indexOf("/");m===-1&&(m=t.length);let p=t.indexOf("?");p===-1&&(p=t.length),e=t.substring(0,Math.min(m,p)),m<p&&(s=UR(t.substring(m,p)));const v=zR(t.substring(Math.min(t.length,p)));h=e.indexOf(":"),h>=0?(o=l==="https"||l==="wss",u=parseInt(e.substring(h+1),10)):h=e.length;const S=e.slice(0,h);if(S.toLowerCase()==="localhost")n="localhost";else if(S.split(".").length<=2)n=S;else{const I=e.indexOf(".");r=e.substring(0,I).toLowerCase(),n=e.substring(I+1),i=r}"ns"in v&&(i=v.ns)}return{host:e,port:u,domain:n,subdomain:r,secure:o,scheme:l,pathString:s,namespace:i}};/**
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
 */class $R{constructor(e,n,r,s){this.eventType=e,this.eventRegistration=n,this.snapshot=r,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+Ae(this.snapshot.exportVal())}}class BR{constructor(e,n,r){this.eventRegistration=e,this.error=n,this.path=r}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
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
 */class Gw{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return F(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class vp{constructor(e,n,r,s){this._repo=e,this._path=n,this._queryParams=r,this._orderByCalled=s}get key(){return X(this._path)?null:Bf(this._path)}get ref(){return new an(this._repo,this._path)}get _queryIdentifier(){const e=T0(this._queryParams),n=Uf(e);return n==="{}"?"default":n}get _queryObject(){return T0(this._queryParams)}isEqual(e){if(e=Oe(e),!(e instanceof vp))return!1;const n=this._repo===e._repo,r=Hf(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return n&&r&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+PT(this._path)}}class an extends vp{constructor(e,n){super(e,n,new Kf,!1)}get parent(){const e=lw(this._path);return e===null?null:new an(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class Xs{constructor(e,n,r){this._node=e,this.ref=n,this._index=r}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new le(e),r=kh(this.ref,e);return new Xs(this._node.getChild(n),r,_e)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(r,s)=>e(new Xs(s,kh(this.ref,r),_e)))}hasChild(e){const n=new le(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function be(t,e){return t=Oe(t),t._checkNotDeleted("ref"),e!==void 0?kh(t._root,e):t._root}function kh(t,e){return t=Oe(t),Y(t._path)===null?_R("child","path",e):zw("child","path",e),new an(t._repo,ke(t._path,e))}function HR(t){return fp("remove",t._path),Sh(t,null)}function Sh(t,e){t=Oe(t),fp("set",t._path),gR("set",e,t._path);const n=new ri;return RR(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}function B0(t,e){yR("update",e,t._path);const n=new ri;return PR(t._repo,t._path,e,n.wrapCallback(()=>{})),n.promise}function hs(t){t=Oe(t);const e=new Gw(()=>{}),n=new zc(e);return bR(t._repo,t,n).then(r=>new Xs(r,new an(t._repo,t._path),t._queryParams.getIndex()))}class zc{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const r=n._queryParams.getIndex();return new $R("value",this,new Xs(e.snapshotNode,new an(n._repo,n._path),r))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new BR(this,e,n):null}matches(e){return e instanceof zc?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function WR(t,e,n,r,s){const i=new Gw(n,void 0),o=new zc(i);return jR(t._repo,t,o),()=>OR(t._repo,t,o)}function $n(t,e,n,r){return WR(t,"value",e)}Bb(an);Kb(an);/**
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
 */const GR="FIREBASE_DATABASE_EMULATOR_HOST",Nh={};let qR=!1;function KR(t,e,n,r){t.repoInfo_=new Zx(`${e}:${n}`,!1,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0),r&&(t.authTokenProvider_=r)}function YR(t,e,n,r,s){let i=r||t.options.databaseURL;i===void 0&&(t.options.projectId||An("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),Ve("Using default host for project ",t.options.projectId),i=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=$0(i,s),l=o.repoInfo,u;typeof process<"u"&&u0&&(u=u0[GR]),u?(i=`http://${u}?ns=${l.namespace}`,o=$0(i,s),l=o.repoInfo):o.repoInfo.secure;const h=new iT(t.name,t.options,e);xR("Invalid Firebase Database URL",o),X(o.path)||An("Database URL must point to the root of a Firebase Database (not including a child path).");const m=XR(l,t,h,new sT(t.name,n));return new JR(m,t)}function QR(t,e){const n=Nh[e];(!n||n[t.key]!==t)&&An(`Database ${e}(${t.repoInfo_}) has already been deleted.`),DR(t),delete n[t.key]}function XR(t,e,n,r){let s=Nh[e.name];s||(s={},Nh[e.name]=s);let i=s[t.toURLString()];return i&&An("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),i=new NR(t,qR,n,r),s[t.toURLString()]=i,i}class JR{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(CR(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new an(this._repo,re())),this._rootInternal}_delete(){return this._rootInternal!==null&&(QR(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&An("Cannot call "+e+" on a deleted database.")}}function ZR(t=Sc(),e){const n=yr(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const r=B_("database");r&&eP(n,...r)}return n}function eP(t,e,n,r={}){t=Oe(t),t._checkNotDeleted("useEmulator"),t._instanceStarted&&An("Cannot call useEmulator() after instance has already been initialized.");const s=t._repoInternal;let i;if(s.repoInfo_.nodeAdmin)r.mockUserToken&&An('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),i=new rl(rl.OWNER);else if(r.mockUserToken){const o=typeof r.mockUserToken=="string"?r.mockUserToken:G_(r.mockUserToken,t.app.options.projectId);i=new rl(o)}KR(s,e,n,i)}/**
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
 */function tP(t){BI(Zr),Kt(new Dt("database",(e,{instanceIdentifier:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),i=e.getProvider("app-check-internal");return YR(r,s,i,n)},"PUBLIC").setMultipleInstances(!0)),vt(d0,h0,t),vt(d0,h0,"esm2017")}/**
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
 */class nP{constructor(e,n){this.committed=e,this.snapshot=n}toJSON(){return{committed:this.committed,snapshot:this.snapshot.toJSON()}}}function rP(t,e,n){var r;if(t=Oe(t),fp("Reference.transaction",t._path),t.key===".length"||t.key===".keys")throw"Reference.transaction failed: "+t.key+" is a read-only object.";const s=(r=void 0)!==null&&r!==void 0?r:!0,i=new ri,o=(u,h,m)=>{let p=null;u?i.reject(u):(p=new Xs(m,new an(t._repo,t._path),_e),i.resolve(new nP(h,p)))},l=$n(t,()=>{});return LR(t._repo,t._path,e,o,l,s),i.promise}Sn.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};Sn.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};tP();var H0=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var qw;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(w,y){function _(){}_.prototype=y.prototype,w.D=y.prototype,w.prototype=new _,w.prototype.constructor=w,w.C=function(k,C,b){for(var E=Array(arguments.length-2),K=2;K<arguments.length;K++)E[K-2]=arguments[K];return y.prototype[C].apply(k,E)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(w,y,_){_||(_=0);var k=Array(16);if(typeof y=="string")for(var C=0;16>C;++C)k[C]=y.charCodeAt(_++)|y.charCodeAt(_++)<<8|y.charCodeAt(_++)<<16|y.charCodeAt(_++)<<24;else for(C=0;16>C;++C)k[C]=y[_++]|y[_++]<<8|y[_++]<<16|y[_++]<<24;y=w.g[0],_=w.g[1],C=w.g[2];var b=w.g[3],E=y+(b^_&(C^b))+k[0]+3614090360&4294967295;y=_+(E<<7&4294967295|E>>>25),E=b+(C^y&(_^C))+k[1]+3905402710&4294967295,b=y+(E<<12&4294967295|E>>>20),E=C+(_^b&(y^_))+k[2]+606105819&4294967295,C=b+(E<<17&4294967295|E>>>15),E=_+(y^C&(b^y))+k[3]+3250441966&4294967295,_=C+(E<<22&4294967295|E>>>10),E=y+(b^_&(C^b))+k[4]+4118548399&4294967295,y=_+(E<<7&4294967295|E>>>25),E=b+(C^y&(_^C))+k[5]+1200080426&4294967295,b=y+(E<<12&4294967295|E>>>20),E=C+(_^b&(y^_))+k[6]+2821735955&4294967295,C=b+(E<<17&4294967295|E>>>15),E=_+(y^C&(b^y))+k[7]+4249261313&4294967295,_=C+(E<<22&4294967295|E>>>10),E=y+(b^_&(C^b))+k[8]+1770035416&4294967295,y=_+(E<<7&4294967295|E>>>25),E=b+(C^y&(_^C))+k[9]+2336552879&4294967295,b=y+(E<<12&4294967295|E>>>20),E=C+(_^b&(y^_))+k[10]+4294925233&4294967295,C=b+(E<<17&4294967295|E>>>15),E=_+(y^C&(b^y))+k[11]+2304563134&4294967295,_=C+(E<<22&4294967295|E>>>10),E=y+(b^_&(C^b))+k[12]+1804603682&4294967295,y=_+(E<<7&4294967295|E>>>25),E=b+(C^y&(_^C))+k[13]+4254626195&4294967295,b=y+(E<<12&4294967295|E>>>20),E=C+(_^b&(y^_))+k[14]+2792965006&4294967295,C=b+(E<<17&4294967295|E>>>15),E=_+(y^C&(b^y))+k[15]+1236535329&4294967295,_=C+(E<<22&4294967295|E>>>10),E=y+(C^b&(_^C))+k[1]+4129170786&4294967295,y=_+(E<<5&4294967295|E>>>27),E=b+(_^C&(y^_))+k[6]+3225465664&4294967295,b=y+(E<<9&4294967295|E>>>23),E=C+(y^_&(b^y))+k[11]+643717713&4294967295,C=b+(E<<14&4294967295|E>>>18),E=_+(b^y&(C^b))+k[0]+3921069994&4294967295,_=C+(E<<20&4294967295|E>>>12),E=y+(C^b&(_^C))+k[5]+3593408605&4294967295,y=_+(E<<5&4294967295|E>>>27),E=b+(_^C&(y^_))+k[10]+38016083&4294967295,b=y+(E<<9&4294967295|E>>>23),E=C+(y^_&(b^y))+k[15]+3634488961&4294967295,C=b+(E<<14&4294967295|E>>>18),E=_+(b^y&(C^b))+k[4]+3889429448&4294967295,_=C+(E<<20&4294967295|E>>>12),E=y+(C^b&(_^C))+k[9]+568446438&4294967295,y=_+(E<<5&4294967295|E>>>27),E=b+(_^C&(y^_))+k[14]+3275163606&4294967295,b=y+(E<<9&4294967295|E>>>23),E=C+(y^_&(b^y))+k[3]+4107603335&4294967295,C=b+(E<<14&4294967295|E>>>18),E=_+(b^y&(C^b))+k[8]+1163531501&4294967295,_=C+(E<<20&4294967295|E>>>12),E=y+(C^b&(_^C))+k[13]+2850285829&4294967295,y=_+(E<<5&4294967295|E>>>27),E=b+(_^C&(y^_))+k[2]+4243563512&4294967295,b=y+(E<<9&4294967295|E>>>23),E=C+(y^_&(b^y))+k[7]+1735328473&4294967295,C=b+(E<<14&4294967295|E>>>18),E=_+(b^y&(C^b))+k[12]+2368359562&4294967295,_=C+(E<<20&4294967295|E>>>12),E=y+(_^C^b)+k[5]+4294588738&4294967295,y=_+(E<<4&4294967295|E>>>28),E=b+(y^_^C)+k[8]+2272392833&4294967295,b=y+(E<<11&4294967295|E>>>21),E=C+(b^y^_)+k[11]+1839030562&4294967295,C=b+(E<<16&4294967295|E>>>16),E=_+(C^b^y)+k[14]+4259657740&4294967295,_=C+(E<<23&4294967295|E>>>9),E=y+(_^C^b)+k[1]+2763975236&4294967295,y=_+(E<<4&4294967295|E>>>28),E=b+(y^_^C)+k[4]+1272893353&4294967295,b=y+(E<<11&4294967295|E>>>21),E=C+(b^y^_)+k[7]+4139469664&4294967295,C=b+(E<<16&4294967295|E>>>16),E=_+(C^b^y)+k[10]+3200236656&4294967295,_=C+(E<<23&4294967295|E>>>9),E=y+(_^C^b)+k[13]+681279174&4294967295,y=_+(E<<4&4294967295|E>>>28),E=b+(y^_^C)+k[0]+3936430074&4294967295,b=y+(E<<11&4294967295|E>>>21),E=C+(b^y^_)+k[3]+3572445317&4294967295,C=b+(E<<16&4294967295|E>>>16),E=_+(C^b^y)+k[6]+76029189&4294967295,_=C+(E<<23&4294967295|E>>>9),E=y+(_^C^b)+k[9]+3654602809&4294967295,y=_+(E<<4&4294967295|E>>>28),E=b+(y^_^C)+k[12]+3873151461&4294967295,b=y+(E<<11&4294967295|E>>>21),E=C+(b^y^_)+k[15]+530742520&4294967295,C=b+(E<<16&4294967295|E>>>16),E=_+(C^b^y)+k[2]+3299628645&4294967295,_=C+(E<<23&4294967295|E>>>9),E=y+(C^(_|~b))+k[0]+4096336452&4294967295,y=_+(E<<6&4294967295|E>>>26),E=b+(_^(y|~C))+k[7]+1126891415&4294967295,b=y+(E<<10&4294967295|E>>>22),E=C+(y^(b|~_))+k[14]+2878612391&4294967295,C=b+(E<<15&4294967295|E>>>17),E=_+(b^(C|~y))+k[5]+4237533241&4294967295,_=C+(E<<21&4294967295|E>>>11),E=y+(C^(_|~b))+k[12]+1700485571&4294967295,y=_+(E<<6&4294967295|E>>>26),E=b+(_^(y|~C))+k[3]+2399980690&4294967295,b=y+(E<<10&4294967295|E>>>22),E=C+(y^(b|~_))+k[10]+4293915773&4294967295,C=b+(E<<15&4294967295|E>>>17),E=_+(b^(C|~y))+k[1]+2240044497&4294967295,_=C+(E<<21&4294967295|E>>>11),E=y+(C^(_|~b))+k[8]+1873313359&4294967295,y=_+(E<<6&4294967295|E>>>26),E=b+(_^(y|~C))+k[15]+4264355552&4294967295,b=y+(E<<10&4294967295|E>>>22),E=C+(y^(b|~_))+k[6]+2734768916&4294967295,C=b+(E<<15&4294967295|E>>>17),E=_+(b^(C|~y))+k[13]+1309151649&4294967295,_=C+(E<<21&4294967295|E>>>11),E=y+(C^(_|~b))+k[4]+4149444226&4294967295,y=_+(E<<6&4294967295|E>>>26),E=b+(_^(y|~C))+k[11]+3174756917&4294967295,b=y+(E<<10&4294967295|E>>>22),E=C+(y^(b|~_))+k[2]+718787259&4294967295,C=b+(E<<15&4294967295|E>>>17),E=_+(b^(C|~y))+k[9]+3951481745&4294967295,w.g[0]=w.g[0]+y&4294967295,w.g[1]=w.g[1]+(C+(E<<21&4294967295|E>>>11))&4294967295,w.g[2]=w.g[2]+C&4294967295,w.g[3]=w.g[3]+b&4294967295}r.prototype.u=function(w,y){y===void 0&&(y=w.length);for(var _=y-this.blockSize,k=this.B,C=this.h,b=0;b<y;){if(C==0)for(;b<=_;)s(this,w,b),b+=this.blockSize;if(typeof w=="string"){for(;b<y;)if(k[C++]=w.charCodeAt(b++),C==this.blockSize){s(this,k),C=0;break}}else for(;b<y;)if(k[C++]=w[b++],C==this.blockSize){s(this,k),C=0;break}}this.h=C,this.o+=y},r.prototype.v=function(){var w=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);w[0]=128;for(var y=1;y<w.length-8;++y)w[y]=0;var _=8*this.o;for(y=w.length-8;y<w.length;++y)w[y]=_&255,_/=256;for(this.u(w),w=Array(16),y=_=0;4>y;++y)for(var k=0;32>k;k+=8)w[_++]=this.g[y]>>>k&255;return w};function i(w,y){var _=l;return Object.prototype.hasOwnProperty.call(_,w)?_[w]:_[w]=y(w)}function o(w,y){this.h=y;for(var _=[],k=!0,C=w.length-1;0<=C;C--){var b=w[C]|0;k&&b==y||(_[C]=b,k=!1)}this.g=_}var l={};function u(w){return-128<=w&&128>w?i(w,function(y){return new o([y|0],0>y?-1:0)}):new o([w|0],0>w?-1:0)}function h(w){if(isNaN(w)||!isFinite(w))return p;if(0>w)return D(h(-w));for(var y=[],_=1,k=0;w>=_;k++)y[k]=w/_|0,_*=4294967296;return new o(y,0)}function m(w,y){if(w.length==0)throw Error("number format error: empty string");if(y=y||10,2>y||36<y)throw Error("radix out of range: "+y);if(w.charAt(0)=="-")return D(m(w.substring(1),y));if(0<=w.indexOf("-"))throw Error('number format error: interior "-" character');for(var _=h(Math.pow(y,8)),k=p,C=0;C<w.length;C+=8){var b=Math.min(8,w.length-C),E=parseInt(w.substring(C,C+b),y);8>b?(b=h(Math.pow(y,b)),k=k.j(b).add(h(E))):(k=k.j(_),k=k.add(h(E)))}return k}var p=u(0),v=u(1),S=u(16777216);t=o.prototype,t.m=function(){if(P(this))return-D(this).m();for(var w=0,y=1,_=0;_<this.g.length;_++){var k=this.i(_);w+=(0<=k?k:4294967296+k)*y,y*=4294967296}return w},t.toString=function(w){if(w=w||10,2>w||36<w)throw Error("radix out of range: "+w);if(I(this))return"0";if(P(this))return"-"+D(this).toString(w);for(var y=h(Math.pow(w,6)),_=this,k="";;){var C=j(_,y).g;_=T(_,C.j(y));var b=((0<_.g.length?_.g[0]:_.h)>>>0).toString(w);if(_=C,I(_))return b+k;for(;6>b.length;)b="0"+b;k=b+k}},t.i=function(w){return 0>w?0:w<this.g.length?this.g[w]:this.h};function I(w){if(w.h!=0)return!1;for(var y=0;y<w.g.length;y++)if(w.g[y]!=0)return!1;return!0}function P(w){return w.h==-1}t.l=function(w){return w=T(this,w),P(w)?-1:I(w)?0:1};function D(w){for(var y=w.g.length,_=[],k=0;k<y;k++)_[k]=~w.g[k];return new o(_,~w.h).add(v)}t.abs=function(){return P(this)?D(this):this},t.add=function(w){for(var y=Math.max(this.g.length,w.g.length),_=[],k=0,C=0;C<=y;C++){var b=k+(this.i(C)&65535)+(w.i(C)&65535),E=(b>>>16)+(this.i(C)>>>16)+(w.i(C)>>>16);k=E>>>16,b&=65535,E&=65535,_[C]=E<<16|b}return new o(_,_[_.length-1]&-2147483648?-1:0)};function T(w,y){return w.add(D(y))}t.j=function(w){if(I(this)||I(w))return p;if(P(this))return P(w)?D(this).j(D(w)):D(D(this).j(w));if(P(w))return D(this.j(D(w)));if(0>this.l(S)&&0>w.l(S))return h(this.m()*w.m());for(var y=this.g.length+w.g.length,_=[],k=0;k<2*y;k++)_[k]=0;for(k=0;k<this.g.length;k++)for(var C=0;C<w.g.length;C++){var b=this.i(k)>>>16,E=this.i(k)&65535,K=w.i(C)>>>16,fe=w.i(C)&65535;_[2*k+2*C]+=E*fe,x(_,2*k+2*C),_[2*k+2*C+1]+=b*fe,x(_,2*k+2*C+1),_[2*k+2*C+1]+=E*K,x(_,2*k+2*C+1),_[2*k+2*C+2]+=b*K,x(_,2*k+2*C+2)}for(k=0;k<y;k++)_[k]=_[2*k+1]<<16|_[2*k];for(k=y;k<2*y;k++)_[k]=0;return new o(_,0)};function x(w,y){for(;(w[y]&65535)!=w[y];)w[y+1]+=w[y]>>>16,w[y]&=65535,y++}function N(w,y){this.g=w,this.h=y}function j(w,y){if(I(y))throw Error("division by zero");if(I(w))return new N(p,p);if(P(w))return y=j(D(w),y),new N(D(y.g),D(y.h));if(P(y))return y=j(w,D(y)),new N(D(y.g),y.h);if(30<w.g.length){if(P(w)||P(y))throw Error("slowDivide_ only works with positive integers.");for(var _=v,k=y;0>=k.l(w);)_=M(_),k=M(k);var C=U(_,1),b=U(k,1);for(k=U(k,2),_=U(_,2);!I(k);){var E=b.add(k);0>=E.l(w)&&(C=C.add(_),b=E),k=U(k,1),_=U(_,1)}return y=T(w,C.j(y)),new N(C,y)}for(C=p;0<=w.l(y);){for(_=Math.max(1,Math.floor(w.m()/y.m())),k=Math.ceil(Math.log(_)/Math.LN2),k=48>=k?1:Math.pow(2,k-48),b=h(_),E=b.j(y);P(E)||0<E.l(w);)_-=k,b=h(_),E=b.j(y);I(b)&&(b=v),C=C.add(b),w=T(w,E)}return new N(C,w)}t.A=function(w){return j(this,w).h},t.and=function(w){for(var y=Math.max(this.g.length,w.g.length),_=[],k=0;k<y;k++)_[k]=this.i(k)&w.i(k);return new o(_,this.h&w.h)},t.or=function(w){for(var y=Math.max(this.g.length,w.g.length),_=[],k=0;k<y;k++)_[k]=this.i(k)|w.i(k);return new o(_,this.h|w.h)},t.xor=function(w){for(var y=Math.max(this.g.length,w.g.length),_=[],k=0;k<y;k++)_[k]=this.i(k)^w.i(k);return new o(_,this.h^w.h)};function M(w){for(var y=w.g.length+1,_=[],k=0;k<y;k++)_[k]=w.i(k)<<1|w.i(k-1)>>>31;return new o(_,w.h)}function U(w,y){var _=y>>5;y%=32;for(var k=w.g.length-_,C=[],b=0;b<k;b++)C[b]=0<y?w.i(b+_)>>>y|w.i(b+_+1)<<32-y:w.i(b+_);return new o(C,w.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=m,qw=o}).apply(typeof H0<"u"?H0:typeof self<"u"?self:typeof window<"u"?window:{});var Fa=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};(function(){var t,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,d,f){return a==Array.prototype||a==Object.prototype||(a[d]=f.value),a};function n(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Fa=="object"&&Fa];for(var d=0;d<a.length;++d){var f=a[d];if(f&&f.Math==Math)return f}throw Error("Cannot find global object")}var r=n(this);function s(a,d){if(d)e:{var f=r;a=a.split(".");for(var g=0;g<a.length-1;g++){var R=a[g];if(!(R in f))break e;f=f[R]}a=a[a.length-1],g=f[a],d=d(g),d!=g&&d!=null&&e(f,a,{configurable:!0,writable:!0,value:d})}}function i(a,d){a instanceof String&&(a+="");var f=0,g=!1,R={next:function(){if(!g&&f<a.length){var A=f++;return{value:d(A,a[A]),done:!1}}return g=!0,{done:!0,value:void 0}}};return R[Symbol.iterator]=function(){return R},R}s("Array.prototype.values",function(a){return a||function(){return i(this,function(d,f){return f})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},l=this||self;function u(a){var d=typeof a;return d=d!="object"?d:a?Array.isArray(a)?"array":d:"null",d=="array"||d=="object"&&typeof a.length=="number"}function h(a){var d=typeof a;return d=="object"&&a!=null||d=="function"}function m(a,d,f){return a.call.apply(a.bind,arguments)}function p(a,d,f){if(!a)throw Error();if(2<arguments.length){var g=Array.prototype.slice.call(arguments,2);return function(){var R=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(R,g),a.apply(d,R)}}return function(){return a.apply(d,arguments)}}function v(a,d,f){return v=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?m:p,v.apply(null,arguments)}function S(a,d){var f=Array.prototype.slice.call(arguments,1);return function(){var g=f.slice();return g.push.apply(g,arguments),a.apply(this,g)}}function I(a,d){function f(){}f.prototype=d.prototype,a.aa=d.prototype,a.prototype=new f,a.prototype.constructor=a,a.Qb=function(g,R,A){for(var z=Array(arguments.length-2),ce=2;ce<arguments.length;ce++)z[ce-2]=arguments[ce];return d.prototype[R].apply(g,z)}}function P(a){const d=a.length;if(0<d){const f=Array(d);for(let g=0;g<d;g++)f[g]=a[g];return f}return[]}function D(a,d){for(let f=1;f<arguments.length;f++){const g=arguments[f];if(u(g)){const R=a.length||0,A=g.length||0;a.length=R+A;for(let z=0;z<A;z++)a[R+z]=g[z]}else a.push(g)}}class T{constructor(d,f){this.i=d,this.j=f,this.h=0,this.g=null}get(){let d;return 0<this.h?(this.h--,d=this.g,this.g=d.next,d.next=null):d=this.i(),d}}function x(a){return/^[\s\xa0]*$/.test(a)}function N(){var a=l.navigator;return a&&(a=a.userAgent)?a:""}function j(a){return j[" "](a),a}j[" "]=function(){};var M=N().indexOf("Gecko")!=-1&&!(N().toLowerCase().indexOf("webkit")!=-1&&N().indexOf("Edge")==-1)&&!(N().indexOf("Trident")!=-1||N().indexOf("MSIE")!=-1)&&N().indexOf("Edge")==-1;function U(a,d,f){for(const g in a)d.call(f,a[g],g,a)}function w(a,d){for(const f in a)d.call(void 0,a[f],f,a)}function y(a){const d={};for(const f in a)d[f]=a[f];return d}const _="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function k(a,d){let f,g;for(let R=1;R<arguments.length;R++){g=arguments[R];for(f in g)a[f]=g[f];for(let A=0;A<_.length;A++)f=_[A],Object.prototype.hasOwnProperty.call(g,f)&&(a[f]=g[f])}}function C(a){var d=1;a=a.split(":");const f=[];for(;0<d&&a.length;)f.push(a.shift()),d--;return a.length&&f.push(a.join(":")),f}function b(a){l.setTimeout(()=>{throw a},0)}function E(){var a=B;let d=null;return a.g&&(d=a.g,a.g=a.g.next,a.g||(a.h=null),d.next=null),d}class K{constructor(){this.h=this.g=null}add(d,f){const g=fe.get();g.set(d,f),this.h?this.h.next=g:this.g=g,this.h=g}}var fe=new T(()=>new Je,a=>a.reset());class Je{constructor(){this.next=this.g=this.h=null}set(d,f){this.h=d,this.g=f,this.next=null}reset(){this.next=this.g=this.h=null}}let Te,L=!1,B=new K,G=()=>{const a=l.Promise.resolve(void 0);Te=()=>{a.then(ie)}};var ie=()=>{for(var a;a=E();){try{a.h.call(a.g)}catch(f){b(f)}var d=fe;d.j(a),100>d.h&&(d.h++,a.next=d.g,d.g=a)}L=!1};function Z(){this.s=this.s,this.C=this.C}Z.prototype.s=!1,Z.prototype.ma=function(){this.s||(this.s=!0,this.N())},Z.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function oe(a,d){this.type=a,this.g=this.target=d,this.defaultPrevented=!1}oe.prototype.h=function(){this.defaultPrevented=!0};var ln=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var a=!1,d=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const f=()=>{};l.addEventListener("test",f,d),l.removeEventListener("test",f,d)}catch{}return a}();function cn(a,d){if(oe.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var f=this.type=a.type,g=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=d,d=a.relatedTarget){if(M){e:{try{j(d.nodeName);var R=!0;break e}catch{}R=!1}R||(d=null)}}else f=="mouseover"?d=a.fromElement:f=="mouseout"&&(d=a.toElement);this.relatedTarget=d,g?(this.clientX=g.clientX!==void 0?g.clientX:g.pageX,this.clientY=g.clientY!==void 0?g.clientY:g.pageY,this.screenX=g.screenX||0,this.screenY=g.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:un[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&cn.aa.h.call(this)}}I(cn,oe);var un={2:"touch",3:"pen",4:"mouse"};cn.prototype.h=function(){cn.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var dn="closure_listenable_"+(1e6*Math.random()|0),_1=0;function x1(a,d,f,g,R){this.listener=a,this.proxy=null,this.src=d,this.type=f,this.capture=!!g,this.ha=R,this.key=++_1,this.da=this.fa=!1}function ra(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function sa(a){this.src=a,this.g={},this.h=0}sa.prototype.add=function(a,d,f,g,R){var A=a.toString();a=this.g[A],a||(a=this.g[A]=[],this.h++);var z=Wc(a,d,g,R);return-1<z?(d=a[z],f||(d.fa=!1)):(d=new x1(d,this.src,A,!!g,R),d.fa=f,a.push(d)),d};function Hc(a,d){var f=d.type;if(f in a.g){var g=a.g[f],R=Array.prototype.indexOf.call(g,d,void 0),A;(A=0<=R)&&Array.prototype.splice.call(g,R,1),A&&(ra(d),a.g[f].length==0&&(delete a.g[f],a.h--))}}function Wc(a,d,f,g){for(var R=0;R<a.length;++R){var A=a[R];if(!A.da&&A.listener==d&&A.capture==!!f&&A.ha==g)return R}return-1}var Gc="closure_lm_"+(1e6*Math.random()|0),qc={};function Ip(a,d,f,g,R){if(Array.isArray(d)){for(var A=0;A<d.length;A++)Ip(a,d[A],f,g,R);return null}return f=Rp(f),a&&a[dn]?a.K(d,f,h(g)?!!g.capture:!1,R):w1(a,d,f,!1,g,R)}function w1(a,d,f,g,R,A){if(!d)throw Error("Invalid event type");var z=h(R)?!!R.capture:!!R,ce=Yc(a);if(ce||(a[Gc]=ce=new sa(a)),f=ce.add(d,f,g,z,A),f.proxy)return f;if(g=E1(),f.proxy=g,g.src=a,g.listener=f,a.addEventListener)ln||(R=z),R===void 0&&(R=!1),a.addEventListener(d.toString(),g,R);else if(a.attachEvent)a.attachEvent(bp(d.toString()),g);else if(a.addListener&&a.removeListener)a.addListener(g);else throw Error("addEventListener and attachEvent are unavailable.");return f}function E1(){function a(f){return d.call(a.src,a.listener,f)}const d=k1;return a}function Tp(a,d,f,g,R){if(Array.isArray(d))for(var A=0;A<d.length;A++)Tp(a,d[A],f,g,R);else g=h(g)?!!g.capture:!!g,f=Rp(f),a&&a[dn]?(a=a.i,d=String(d).toString(),d in a.g&&(A=a.g[d],f=Wc(A,f,g,R),-1<f&&(ra(A[f]),Array.prototype.splice.call(A,f,1),A.length==0&&(delete a.g[d],a.h--)))):a&&(a=Yc(a))&&(d=a.g[d.toString()],a=-1,d&&(a=Wc(d,f,g,R)),(f=-1<a?d[a]:null)&&Kc(f))}function Kc(a){if(typeof a!="number"&&a&&!a.da){var d=a.src;if(d&&d[dn])Hc(d.i,a);else{var f=a.type,g=a.proxy;d.removeEventListener?d.removeEventListener(f,g,a.capture):d.detachEvent?d.detachEvent(bp(f),g):d.addListener&&d.removeListener&&d.removeListener(g),(f=Yc(d))?(Hc(f,a),f.h==0&&(f.src=null,d[Gc]=null)):ra(a)}}}function bp(a){return a in qc?qc[a]:qc[a]="on"+a}function k1(a,d){if(a.da)a=!0;else{d=new cn(d,this);var f=a.listener,g=a.ha||a.src;a.fa&&Kc(a),a=f.call(g,d)}return a}function Yc(a){return a=a[Gc],a instanceof sa?a:null}var Qc="__closure_events_fn_"+(1e9*Math.random()>>>0);function Rp(a){return typeof a=="function"?a:(a[Qc]||(a[Qc]=function(d){return a.handleEvent(d)}),a[Qc])}function We(){Z.call(this),this.i=new sa(this),this.M=this,this.F=null}I(We,Z),We.prototype[dn]=!0,We.prototype.removeEventListener=function(a,d,f,g){Tp(this,a,d,f,g)};function Ze(a,d){var f,g=a.F;if(g)for(f=[];g;g=g.F)f.push(g);if(a=a.M,g=d.type||d,typeof d=="string")d=new oe(d,a);else if(d instanceof oe)d.target=d.target||a;else{var R=d;d=new oe(g,a),k(d,R)}if(R=!0,f)for(var A=f.length-1;0<=A;A--){var z=d.g=f[A];R=ia(z,g,!0,d)&&R}if(z=d.g=a,R=ia(z,g,!0,d)&&R,R=ia(z,g,!1,d)&&R,f)for(A=0;A<f.length;A++)z=d.g=f[A],R=ia(z,g,!1,d)&&R}We.prototype.N=function(){if(We.aa.N.call(this),this.i){var a=this.i,d;for(d in a.g){for(var f=a.g[d],g=0;g<f.length;g++)ra(f[g]);delete a.g[d],a.h--}}this.F=null},We.prototype.K=function(a,d,f,g){return this.i.add(String(a),d,!1,f,g)},We.prototype.L=function(a,d,f,g){return this.i.add(String(a),d,!0,f,g)};function ia(a,d,f,g){if(d=a.i.g[String(d)],!d)return!0;d=d.concat();for(var R=!0,A=0;A<d.length;++A){var z=d[A];if(z&&!z.da&&z.capture==f){var ce=z.listener,Ue=z.ha||z.src;z.fa&&Hc(a.i,z),R=ce.call(Ue,g)!==!1&&R}}return R&&!g.defaultPrevented}function Pp(a,d,f){if(typeof a=="function")f&&(a=v(a,f));else if(a&&typeof a.handleEvent=="function")a=v(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(d)?-1:l.setTimeout(a,d||0)}function Ap(a){a.g=Pp(()=>{a.g=null,a.i&&(a.i=!1,Ap(a))},a.l);const d=a.h;a.h=null,a.m.apply(null,d)}class S1 extends Z{constructor(d,f){super(),this.m=d,this.l=f,this.h=null,this.i=!1,this.g=null}j(d){this.h=arguments,this.g?this.i=!0:Ap(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ci(a){Z.call(this),this.h=a,this.g={}}I(ci,Z);var jp=[];function Op(a){U(a.g,function(d,f){this.g.hasOwnProperty(f)&&Kc(d)},a),a.g={}}ci.prototype.N=function(){ci.aa.N.call(this),Op(this)},ci.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Xc=l.JSON.stringify,N1=l.JSON.parse,C1=class{stringify(a){return l.JSON.stringify(a,void 0)}parse(a){return l.JSON.parse(a,void 0)}};function Jc(){}Jc.prototype.h=null;function Dp(a){return a.h||(a.h=a.i())}function I1(){}var ui={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Zc(){oe.call(this,"d")}I(Zc,oe);function eu(){oe.call(this,"c")}I(eu,oe);var ss={},Lp=null;function tu(){return Lp=Lp||new We}ss.La="serverreachability";function Mp(a){oe.call(this,ss.La,a)}I(Mp,oe);function di(a){const d=tu();Ze(d,new Mp(d))}ss.STAT_EVENT="statevent";function Fp(a,d){oe.call(this,ss.STAT_EVENT,a),this.stat=d}I(Fp,oe);function et(a){const d=tu();Ze(d,new Fp(d,a))}ss.Ma="timingevent";function Up(a,d){oe.call(this,ss.Ma,a),this.size=d}I(Up,oe);function hi(a,d){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){a()},d)}function fi(){this.g=!0}fi.prototype.xa=function(){this.g=!1};function T1(a,d,f,g,R,A){a.info(function(){if(a.g)if(A)for(var z="",ce=A.split("&"),Ue=0;Ue<ce.length;Ue++){var ne=ce[Ue].split("=");if(1<ne.length){var Ge=ne[0];ne=ne[1];var qe=Ge.split("_");z=2<=qe.length&&qe[1]=="type"?z+(Ge+"="+ne+"&"):z+(Ge+"=redacted&")}}else z=null;else z=A;return"XMLHTTP REQ ("+g+") [attempt "+R+"]: "+d+`
`+f+`
`+z})}function b1(a,d,f,g,R,A,z){a.info(function(){return"XMLHTTP RESP ("+g+") [ attempt "+R+"]: "+d+`
`+f+`
`+A+" "+z})}function is(a,d,f,g){a.info(function(){return"XMLHTTP TEXT ("+d+"): "+P1(a,f)+(g?" "+g:"")})}function R1(a,d){a.info(function(){return"TIMEOUT: "+d})}fi.prototype.info=function(){};function P1(a,d){if(!a.g)return d;if(!d)return null;try{var f=JSON.parse(d);if(f){for(a=0;a<f.length;a++)if(Array.isArray(f[a])){var g=f[a];if(!(2>g.length)){var R=g[1];if(Array.isArray(R)&&!(1>R.length)){var A=R[0];if(A!="noop"&&A!="stop"&&A!="close")for(var z=1;z<R.length;z++)R[z]=""}}}}return Xc(f)}catch{return d}}var nu={NO_ERROR:0,TIMEOUT:8},A1={},ru;function oa(){}I(oa,Jc),oa.prototype.g=function(){return new XMLHttpRequest},oa.prototype.i=function(){return{}},ru=new oa;function Dn(a,d,f,g){this.j=a,this.i=d,this.l=f,this.R=g||1,this.U=new ci(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new zp}function zp(){this.i=null,this.g="",this.h=!1}var Vp={},su={};function iu(a,d,f){a.L=1,a.v=ua(hn(d)),a.m=f,a.P=!0,$p(a,null)}function $p(a,d){a.F=Date.now(),aa(a),a.A=hn(a.v);var f=a.A,g=a.R;Array.isArray(g)||(g=[String(g)]),nm(f.i,"t",g),a.C=0,f=a.j.J,a.h=new zp,a.g=xm(a.j,f?d:null,!a.m),0<a.O&&(a.M=new S1(v(a.Y,a,a.g),a.O)),d=a.U,f=a.g,g=a.ca;var R="readystatechange";Array.isArray(R)||(R&&(jp[0]=R.toString()),R=jp);for(var A=0;A<R.length;A++){var z=Ip(f,R[A],g||d.handleEvent,!1,d.h||d);if(!z)break;d.g[z.key]=z}d=a.H?y(a.H):{},a.m?(a.u||(a.u="POST"),d["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,d)):(a.u="GET",a.g.ea(a.A,a.u,null,d)),di(),T1(a.i,a.u,a.A,a.l,a.R,a.m)}Dn.prototype.ca=function(a){a=a.target;const d=this.M;d&&fn(a)==3?d.j():this.Y(a)},Dn.prototype.Y=function(a){try{if(a==this.g)e:{const qe=fn(this.g);var d=this.g.Ba();const ls=this.g.Z();if(!(3>qe)&&(qe!=3||this.g&&(this.h.h||this.g.oa()||cm(this.g)))){this.J||qe!=4||d==7||(d==8||0>=ls?di(3):di(2)),ou(this);var f=this.g.Z();this.X=f;t:if(Bp(this)){var g=cm(this.g);a="";var R=g.length,A=fn(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){xr(this),pi(this);var z="";break t}this.h.i=new l.TextDecoder}for(d=0;d<R;d++)this.h.h=!0,a+=this.h.i.decode(g[d],{stream:!(A&&d==R-1)});g.length=0,this.h.g+=a,this.C=0,z=this.h.g}else z=this.g.oa();if(this.o=f==200,b1(this.i,this.u,this.A,this.l,this.R,qe,f),this.o){if(this.T&&!this.K){t:{if(this.g){var ce,Ue=this.g;if((ce=Ue.g?Ue.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!x(ce)){var ne=ce;break t}}ne=null}if(f=ne)is(this.i,this.l,f,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,au(this,f);else{this.o=!1,this.s=3,et(12),xr(this),pi(this);break e}}if(this.P){f=!0;let Lt;for(;!this.J&&this.C<z.length;)if(Lt=j1(this,z),Lt==su){qe==4&&(this.s=4,et(14),f=!1),is(this.i,this.l,null,"[Incomplete Response]");break}else if(Lt==Vp){this.s=4,et(15),is(this.i,this.l,z,"[Invalid Chunk]"),f=!1;break}else is(this.i,this.l,Lt,null),au(this,Lt);if(Bp(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),qe!=4||z.length!=0||this.h.h||(this.s=1,et(16),f=!1),this.o=this.o&&f,!f)is(this.i,this.l,z,"[Invalid Chunked Response]"),xr(this),pi(this);else if(0<z.length&&!this.W){this.W=!0;var Ge=this.j;Ge.g==this&&Ge.ba&&!Ge.M&&(Ge.j.info("Great, no buffering proxy detected. Bytes received: "+z.length),fu(Ge),Ge.M=!0,et(11))}}else is(this.i,this.l,z,null),au(this,z);qe==4&&xr(this),this.o&&!this.J&&(qe==4?gm(this.j,this):(this.o=!1,aa(this)))}else Q1(this.g),f==400&&0<z.indexOf("Unknown SID")?(this.s=3,et(12)):(this.s=0,et(13)),xr(this),pi(this)}}}catch{}finally{}};function Bp(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function j1(a,d){var f=a.C,g=d.indexOf(`
`,f);return g==-1?su:(f=Number(d.substring(f,g)),isNaN(f)?Vp:(g+=1,g+f>d.length?su:(d=d.slice(g,g+f),a.C=g+f,d)))}Dn.prototype.cancel=function(){this.J=!0,xr(this)};function aa(a){a.S=Date.now()+a.I,Hp(a,a.I)}function Hp(a,d){if(a.B!=null)throw Error("WatchDog timer not null");a.B=hi(v(a.ba,a),d)}function ou(a){a.B&&(l.clearTimeout(a.B),a.B=null)}Dn.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(R1(this.i,this.A),this.L!=2&&(di(),et(17)),xr(this),this.s=2,pi(this)):Hp(this,this.S-a)};function pi(a){a.j.G==0||a.J||gm(a.j,a)}function xr(a){ou(a);var d=a.M;d&&typeof d.ma=="function"&&d.ma(),a.M=null,Op(a.U),a.g&&(d=a.g,a.g=null,d.abort(),d.ma())}function au(a,d){try{var f=a.j;if(f.G!=0&&(f.g==a||lu(f.h,a))){if(!a.K&&lu(f.h,a)&&f.G==3){try{var g=f.Da.g.parse(d)}catch{g=null}if(Array.isArray(g)&&g.length==3){var R=g;if(R[0]==0){e:if(!f.u){if(f.g)if(f.g.F+3e3<a.F)ga(f),pa(f);else break e;hu(f),et(18)}}else f.za=R[1],0<f.za-f.T&&37500>R[2]&&f.F&&f.v==0&&!f.C&&(f.C=hi(v(f.Za,f),6e3));if(1>=qp(f.h)&&f.ca){try{f.ca()}catch{}f.ca=void 0}}else Er(f,11)}else if((a.K||f.g==a)&&ga(f),!x(d))for(R=f.Da.g.parse(d),d=0;d<R.length;d++){let ne=R[d];if(f.T=ne[0],ne=ne[1],f.G==2)if(ne[0]=="c"){f.K=ne[1],f.ia=ne[2];const Ge=ne[3];Ge!=null&&(f.la=Ge,f.j.info("VER="+f.la));const qe=ne[4];qe!=null&&(f.Aa=qe,f.j.info("SVER="+f.Aa));const ls=ne[5];ls!=null&&typeof ls=="number"&&0<ls&&(g=1.5*ls,f.L=g,f.j.info("backChannelRequestTimeoutMs_="+g)),g=f;const Lt=a.g;if(Lt){const va=Lt.g?Lt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(va){var A=g.h;A.g||va.indexOf("spdy")==-1&&va.indexOf("quic")==-1&&va.indexOf("h2")==-1||(A.j=A.l,A.g=new Set,A.h&&(cu(A,A.h),A.h=null))}if(g.D){const pu=Lt.g?Lt.g.getResponseHeader("X-HTTP-Session-Id"):null;pu&&(g.ya=pu,pe(g.I,g.D,pu))}}f.G=3,f.l&&f.l.ua(),f.ba&&(f.R=Date.now()-a.F,f.j.info("Handshake RTT: "+f.R+"ms")),g=f;var z=a;if(g.qa=_m(g,g.J?g.ia:null,g.W),z.K){Kp(g.h,z);var ce=z,Ue=g.L;Ue&&(ce.I=Ue),ce.B&&(ou(ce),aa(ce)),g.g=z}else pm(g);0<f.i.length&&ma(f)}else ne[0]!="stop"&&ne[0]!="close"||Er(f,7);else f.G==3&&(ne[0]=="stop"||ne[0]=="close"?ne[0]=="stop"?Er(f,7):du(f):ne[0]!="noop"&&f.l&&f.l.ta(ne),f.v=0)}}di(4)}catch{}}var O1=class{constructor(a,d){this.g=a,this.map=d}};function Wp(a){this.l=a||10,l.PerformanceNavigationTiming?(a=l.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Gp(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function qp(a){return a.h?1:a.g?a.g.size:0}function lu(a,d){return a.h?a.h==d:a.g?a.g.has(d):!1}function cu(a,d){a.g?a.g.add(d):a.h=d}function Kp(a,d){a.h&&a.h==d?a.h=null:a.g&&a.g.has(d)&&a.g.delete(d)}Wp.prototype.cancel=function(){if(this.i=Yp(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Yp(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let d=a.i;for(const f of a.g.values())d=d.concat(f.D);return d}return P(a.i)}function D1(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(u(a)){for(var d=[],f=a.length,g=0;g<f;g++)d.push(a[g]);return d}d=[],f=0;for(g in a)d[f++]=a[g];return d}function L1(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(u(a)||typeof a=="string"){var d=[];a=a.length;for(var f=0;f<a;f++)d.push(f);return d}d=[],f=0;for(const g in a)d[f++]=g;return d}}}function Qp(a,d){if(a.forEach&&typeof a.forEach=="function")a.forEach(d,void 0);else if(u(a)||typeof a=="string")Array.prototype.forEach.call(a,d,void 0);else for(var f=L1(a),g=D1(a),R=g.length,A=0;A<R;A++)d.call(void 0,g[A],f&&f[A],a)}var Xp=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function M1(a,d){if(a){a=a.split("&");for(var f=0;f<a.length;f++){var g=a[f].indexOf("="),R=null;if(0<=g){var A=a[f].substring(0,g);R=a[f].substring(g+1)}else A=a[f];d(A,R?decodeURIComponent(R.replace(/\+/g," ")):"")}}}function wr(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof wr){this.h=a.h,la(this,a.j),this.o=a.o,this.g=a.g,ca(this,a.s),this.l=a.l;var d=a.i,f=new vi;f.i=d.i,d.g&&(f.g=new Map(d.g),f.h=d.h),Jp(this,f),this.m=a.m}else a&&(d=String(a).match(Xp))?(this.h=!1,la(this,d[1]||"",!0),this.o=mi(d[2]||""),this.g=mi(d[3]||"",!0),ca(this,d[4]),this.l=mi(d[5]||"",!0),Jp(this,d[6]||"",!0),this.m=mi(d[7]||"")):(this.h=!1,this.i=new vi(null,this.h))}wr.prototype.toString=function(){var a=[],d=this.j;d&&a.push(gi(d,Zp,!0),":");var f=this.g;return(f||d=="file")&&(a.push("//"),(d=this.o)&&a.push(gi(d,Zp,!0),"@"),a.push(encodeURIComponent(String(f)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),f=this.s,f!=null&&a.push(":",String(f))),(f=this.l)&&(this.g&&f.charAt(0)!="/"&&a.push("/"),a.push(gi(f,f.charAt(0)=="/"?z1:U1,!0))),(f=this.i.toString())&&a.push("?",f),(f=this.m)&&a.push("#",gi(f,$1)),a.join("")};function hn(a){return new wr(a)}function la(a,d,f){a.j=f?mi(d,!0):d,a.j&&(a.j=a.j.replace(/:$/,""))}function ca(a,d){if(d){if(d=Number(d),isNaN(d)||0>d)throw Error("Bad port number "+d);a.s=d}else a.s=null}function Jp(a,d,f){d instanceof vi?(a.i=d,B1(a.i,a.h)):(f||(d=gi(d,V1)),a.i=new vi(d,a.h))}function pe(a,d,f){a.i.set(d,f)}function ua(a){return pe(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function mi(a,d){return a?d?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function gi(a,d,f){return typeof a=="string"?(a=encodeURI(a).replace(d,F1),f&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function F1(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Zp=/[#\/\?@]/g,U1=/[#\?:]/g,z1=/[#\?]/g,V1=/[#\?@]/g,$1=/#/g;function vi(a,d){this.h=this.g=null,this.i=a||null,this.j=!!d}function Ln(a){a.g||(a.g=new Map,a.h=0,a.i&&M1(a.i,function(d,f){a.add(decodeURIComponent(d.replace(/\+/g," ")),f)}))}t=vi.prototype,t.add=function(a,d){Ln(this),this.i=null,a=os(this,a);var f=this.g.get(a);return f||this.g.set(a,f=[]),f.push(d),this.h+=1,this};function em(a,d){Ln(a),d=os(a,d),a.g.has(d)&&(a.i=null,a.h-=a.g.get(d).length,a.g.delete(d))}function tm(a,d){return Ln(a),d=os(a,d),a.g.has(d)}t.forEach=function(a,d){Ln(this),this.g.forEach(function(f,g){f.forEach(function(R){a.call(d,R,g,this)},this)},this)},t.na=function(){Ln(this);const a=Array.from(this.g.values()),d=Array.from(this.g.keys()),f=[];for(let g=0;g<d.length;g++){const R=a[g];for(let A=0;A<R.length;A++)f.push(d[g])}return f},t.V=function(a){Ln(this);let d=[];if(typeof a=="string")tm(this,a)&&(d=d.concat(this.g.get(os(this,a))));else{a=Array.from(this.g.values());for(let f=0;f<a.length;f++)d=d.concat(a[f])}return d},t.set=function(a,d){return Ln(this),this.i=null,a=os(this,a),tm(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[d]),this.h+=1,this},t.get=function(a,d){return a?(a=this.V(a),0<a.length?String(a[0]):d):d};function nm(a,d,f){em(a,d),0<f.length&&(a.i=null,a.g.set(os(a,d),P(f)),a.h+=f.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],d=Array.from(this.g.keys());for(var f=0;f<d.length;f++){var g=d[f];const A=encodeURIComponent(String(g)),z=this.V(g);for(g=0;g<z.length;g++){var R=A;z[g]!==""&&(R+="="+encodeURIComponent(String(z[g]))),a.push(R)}}return this.i=a.join("&")};function os(a,d){return d=String(d),a.j&&(d=d.toLowerCase()),d}function B1(a,d){d&&!a.j&&(Ln(a),a.i=null,a.g.forEach(function(f,g){var R=g.toLowerCase();g!=R&&(em(this,g),nm(this,R,f))},a)),a.j=d}function H1(a,d){const f=new fi;if(l.Image){const g=new Image;g.onload=S(Mn,f,"TestLoadImage: loaded",!0,d,g),g.onerror=S(Mn,f,"TestLoadImage: error",!1,d,g),g.onabort=S(Mn,f,"TestLoadImage: abort",!1,d,g),g.ontimeout=S(Mn,f,"TestLoadImage: timeout",!1,d,g),l.setTimeout(function(){g.ontimeout&&g.ontimeout()},1e4),g.src=a}else d(!1)}function W1(a,d){const f=new fi,g=new AbortController,R=setTimeout(()=>{g.abort(),Mn(f,"TestPingServer: timeout",!1,d)},1e4);fetch(a,{signal:g.signal}).then(A=>{clearTimeout(R),A.ok?Mn(f,"TestPingServer: ok",!0,d):Mn(f,"TestPingServer: server error",!1,d)}).catch(()=>{clearTimeout(R),Mn(f,"TestPingServer: error",!1,d)})}function Mn(a,d,f,g,R){try{R&&(R.onload=null,R.onerror=null,R.onabort=null,R.ontimeout=null),g(f)}catch{}}function G1(){this.g=new C1}function q1(a,d,f){const g=f||"";try{Qp(a,function(R,A){let z=R;h(R)&&(z=Xc(R)),d.push(g+A+"="+encodeURIComponent(z))})}catch(R){throw d.push(g+"type="+encodeURIComponent("_badmap")),R}}function da(a){this.l=a.Ub||null,this.j=a.eb||!1}I(da,Jc),da.prototype.g=function(){return new ha(this.l,this.j)},da.prototype.i=function(a){return function(){return a}}({});function ha(a,d){We.call(this),this.D=a,this.o=d,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}I(ha,We),t=ha.prototype,t.open=function(a,d){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=d,this.readyState=1,_i(this)},t.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const d={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(d.body=a),(this.D||l).fetch(new Request(this.A,d)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,yi(this)),this.readyState=0},t.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,_i(this)),this.g&&(this.readyState=3,_i(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;rm(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function rm(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}t.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var d=a.value?a.value:new Uint8Array(0);(d=this.v.decode(d,{stream:!a.done}))&&(this.response=this.responseText+=d)}a.done?yi(this):_i(this),this.readyState==3&&rm(this)}},t.Ra=function(a){this.g&&(this.response=this.responseText=a,yi(this))},t.Qa=function(a){this.g&&(this.response=a,yi(this))},t.ga=function(){this.g&&yi(this)};function yi(a){a.readyState=4,a.l=null,a.j=null,a.v=null,_i(a)}t.setRequestHeader=function(a,d){this.u.append(a,d)},t.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],d=this.h.entries();for(var f=d.next();!f.done;)f=f.value,a.push(f[0]+": "+f[1]),f=d.next();return a.join(`\r
`)};function _i(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(ha.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function sm(a){let d="";return U(a,function(f,g){d+=g,d+=":",d+=f,d+=`\r
`}),d}function uu(a,d,f){e:{for(g in f){var g=!1;break e}g=!0}g||(f=sm(f),typeof a=="string"?f!=null&&encodeURIComponent(String(f)):pe(a,d,f))}function Se(a){We.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}I(Se,We);var K1=/^https?$/i,Y1=["POST","PUT"];t=Se.prototype,t.Ha=function(a){this.J=a},t.ea=function(a,d,f,g){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);d=d?d.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():ru.g(),this.v=this.o?Dp(this.o):Dp(ru),this.g.onreadystatechange=v(this.Ea,this);try{this.B=!0,this.g.open(d,String(a),!0),this.B=!1}catch(A){im(this,A);return}if(a=f||"",f=new Map(this.headers),g)if(Object.getPrototypeOf(g)===Object.prototype)for(var R in g)f.set(R,g[R]);else if(typeof g.keys=="function"&&typeof g.get=="function")for(const A of g.keys())f.set(A,g.get(A));else throw Error("Unknown input type for opt_headers: "+String(g));g=Array.from(f.keys()).find(A=>A.toLowerCase()=="content-type"),R=l.FormData&&a instanceof l.FormData,!(0<=Array.prototype.indexOf.call(Y1,d,void 0))||g||R||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[A,z]of f)this.g.setRequestHeader(A,z);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{lm(this),this.u=!0,this.g.send(a),this.u=!1}catch(A){im(this,A)}};function im(a,d){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=d,a.m=5,om(a),fa(a)}function om(a){a.A||(a.A=!0,Ze(a,"complete"),Ze(a,"error"))}t.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,Ze(this,"complete"),Ze(this,"abort"),fa(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),fa(this,!0)),Se.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?am(this):this.bb())},t.bb=function(){am(this)};function am(a){if(a.h&&typeof o<"u"&&(!a.v[1]||fn(a)!=4||a.Z()!=2)){if(a.u&&fn(a)==4)Pp(a.Ea,0,a);else if(Ze(a,"readystatechange"),fn(a)==4){a.h=!1;try{const z=a.Z();e:switch(z){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var d=!0;break e;default:d=!1}var f;if(!(f=d)){var g;if(g=z===0){var R=String(a.D).match(Xp)[1]||null;!R&&l.self&&l.self.location&&(R=l.self.location.protocol.slice(0,-1)),g=!K1.test(R?R.toLowerCase():"")}f=g}if(f)Ze(a,"complete"),Ze(a,"success");else{a.m=6;try{var A=2<fn(a)?a.g.statusText:""}catch{A=""}a.l=A+" ["+a.Z()+"]",om(a)}}finally{fa(a)}}}}function fa(a,d){if(a.g){lm(a);const f=a.g,g=a.v[0]?()=>{}:null;a.g=null,a.v=null,d||Ze(a,"ready");try{f.onreadystatechange=g}catch{}}}function lm(a){a.I&&(l.clearTimeout(a.I),a.I=null)}t.isActive=function(){return!!this.g};function fn(a){return a.g?a.g.readyState:0}t.Z=function(){try{return 2<fn(this)?this.g.status:-1}catch{return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.Oa=function(a){if(this.g){var d=this.g.responseText;return a&&d.indexOf(a)==0&&(d=d.substring(a.length)),N1(d)}};function cm(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function Q1(a){const d={};a=(a.g&&2<=fn(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let g=0;g<a.length;g++){if(x(a[g]))continue;var f=C(a[g]);const R=f[0];if(f=f[1],typeof f!="string")continue;f=f.trim();const A=d[R]||[];d[R]=A,A.push(f)}w(d,function(g){return g.join(", ")})}t.Ba=function(){return this.m},t.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function xi(a,d,f){return f&&f.internalChannelParams&&f.internalChannelParams[a]||d}function um(a){this.Aa=0,this.i=[],this.j=new fi,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=xi("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=xi("baseRetryDelayMs",5e3,a),this.cb=xi("retryDelaySeedMs",1e4,a),this.Wa=xi("forwardChannelMaxRetries",2,a),this.wa=xi("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new Wp(a&&a.concurrentRequestLimit),this.Da=new G1,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}t=um.prototype,t.la=8,t.G=1,t.connect=function(a,d,f,g){et(0),this.W=a,this.H=d||{},f&&g!==void 0&&(this.H.OSID=f,this.H.OAID=g),this.F=this.X,this.I=_m(this,null,this.W),ma(this)};function du(a){if(dm(a),a.G==3){var d=a.U++,f=hn(a.I);if(pe(f,"SID",a.K),pe(f,"RID",d),pe(f,"TYPE","terminate"),wi(a,f),d=new Dn(a,a.j,d),d.L=2,d.v=ua(hn(f)),f=!1,l.navigator&&l.navigator.sendBeacon)try{f=l.navigator.sendBeacon(d.v.toString(),"")}catch{}!f&&l.Image&&(new Image().src=d.v,f=!0),f||(d.g=xm(d.j,null),d.g.ea(d.v)),d.F=Date.now(),aa(d)}ym(a)}function pa(a){a.g&&(fu(a),a.g.cancel(),a.g=null)}function dm(a){pa(a),a.u&&(l.clearTimeout(a.u),a.u=null),ga(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&l.clearTimeout(a.s),a.s=null)}function ma(a){if(!Gp(a.h)&&!a.s){a.s=!0;var d=a.Ga;Te||G(),L||(Te(),L=!0),B.add(d,a),a.B=0}}function X1(a,d){return qp(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=d.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=hi(v(a.Ga,a,d),vm(a,a.B)),a.B++,!0)}t.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const R=new Dn(this,this.j,a);let A=this.o;if(this.S&&(A?(A=y(A),k(A,this.S)):A=this.S),this.m!==null||this.O||(R.H=A,A=null),this.P)e:{for(var d=0,f=0;f<this.i.length;f++){t:{var g=this.i[f];if("__data__"in g.map&&(g=g.map.__data__,typeof g=="string")){g=g.length;break t}g=void 0}if(g===void 0)break;if(d+=g,4096<d){d=f;break e}if(d===4096||f===this.i.length-1){d=f+1;break e}}d=1e3}else d=1e3;d=fm(this,R,d),f=hn(this.I),pe(f,"RID",a),pe(f,"CVER",22),this.D&&pe(f,"X-HTTP-Session-Id",this.D),wi(this,f),A&&(this.O?d="headers="+encodeURIComponent(String(sm(A)))+"&"+d:this.m&&uu(f,this.m,A)),cu(this.h,R),this.Ua&&pe(f,"TYPE","init"),this.P?(pe(f,"$req",d),pe(f,"SID","null"),R.T=!0,iu(R,f,null)):iu(R,f,d),this.G=2}}else this.G==3&&(a?hm(this,a):this.i.length==0||Gp(this.h)||hm(this))};function hm(a,d){var f;d?f=d.l:f=a.U++;const g=hn(a.I);pe(g,"SID",a.K),pe(g,"RID",f),pe(g,"AID",a.T),wi(a,g),a.m&&a.o&&uu(g,a.m,a.o),f=new Dn(a,a.j,f,a.B+1),a.m===null&&(f.H=a.o),d&&(a.i=d.D.concat(a.i)),d=fm(a,f,1e3),f.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),cu(a.h,f),iu(f,g,d)}function wi(a,d){a.H&&U(a.H,function(f,g){pe(d,g,f)}),a.l&&Qp({},function(f,g){pe(d,g,f)})}function fm(a,d,f){f=Math.min(a.i.length,f);var g=a.l?v(a.l.Na,a.l,a):null;e:{var R=a.i;let A=-1;for(;;){const z=["count="+f];A==-1?0<f?(A=R[0].g,z.push("ofs="+A)):A=0:z.push("ofs="+A);let ce=!0;for(let Ue=0;Ue<f;Ue++){let ne=R[Ue].g;const Ge=R[Ue].map;if(ne-=A,0>ne)A=Math.max(0,R[Ue].g-100),ce=!1;else try{q1(Ge,z,"req"+ne+"_")}catch{g&&g(Ge)}}if(ce){g=z.join("&");break e}}}return a=a.i.splice(0,f),d.D=a,g}function pm(a){if(!a.g&&!a.u){a.Y=1;var d=a.Fa;Te||G(),L||(Te(),L=!0),B.add(d,a),a.v=0}}function hu(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=hi(v(a.Fa,a),vm(a,a.v)),a.v++,!0)}t.Fa=function(){if(this.u=null,mm(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=hi(v(this.ab,this),a)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,et(10),pa(this),mm(this))};function fu(a){a.A!=null&&(l.clearTimeout(a.A),a.A=null)}function mm(a){a.g=new Dn(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var d=hn(a.qa);pe(d,"RID","rpc"),pe(d,"SID",a.K),pe(d,"AID",a.T),pe(d,"CI",a.F?"0":"1"),!a.F&&a.ja&&pe(d,"TO",a.ja),pe(d,"TYPE","xmlhttp"),wi(a,d),a.m&&a.o&&uu(d,a.m,a.o),a.L&&(a.g.I=a.L);var f=a.g;a=a.ia,f.L=1,f.v=ua(hn(d)),f.m=null,f.P=!0,$p(f,a)}t.Za=function(){this.C!=null&&(this.C=null,pa(this),hu(this),et(19))};function ga(a){a.C!=null&&(l.clearTimeout(a.C),a.C=null)}function gm(a,d){var f=null;if(a.g==d){ga(a),fu(a),a.g=null;var g=2}else if(lu(a.h,d))f=d.D,Kp(a.h,d),g=1;else return;if(a.G!=0){if(d.o)if(g==1){f=d.m?d.m.length:0,d=Date.now()-d.F;var R=a.B;g=tu(),Ze(g,new Up(g,f)),ma(a)}else pm(a);else if(R=d.s,R==3||R==0&&0<d.X||!(g==1&&X1(a,d)||g==2&&hu(a)))switch(f&&0<f.length&&(d=a.h,d.i=d.i.concat(f)),R){case 1:Er(a,5);break;case 4:Er(a,10);break;case 3:Er(a,6);break;default:Er(a,2)}}}function vm(a,d){let f=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(f*=2),f*d}function Er(a,d){if(a.j.info("Error code "+d),d==2){var f=v(a.fb,a),g=a.Xa;const R=!g;g=new wr(g||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||la(g,"https"),ua(g),R?H1(g.toString(),f):W1(g.toString(),f)}else et(2);a.G=0,a.l&&a.l.sa(d),ym(a),dm(a)}t.fb=function(a){a?(this.j.info("Successfully pinged google.com"),et(2)):(this.j.info("Failed to ping google.com"),et(1))};function ym(a){if(a.G=0,a.ka=[],a.l){const d=Yp(a.h);(d.length!=0||a.i.length!=0)&&(D(a.ka,d),D(a.ka,a.i),a.h.i.length=0,P(a.i),a.i.length=0),a.l.ra()}}function _m(a,d,f){var g=f instanceof wr?hn(f):new wr(f);if(g.g!="")d&&(g.g=d+"."+g.g),ca(g,g.s);else{var R=l.location;g=R.protocol,d=d?d+"."+R.hostname:R.hostname,R=+R.port;var A=new wr(null);g&&la(A,g),d&&(A.g=d),R&&ca(A,R),f&&(A.l=f),g=A}return f=a.D,d=a.ya,f&&d&&pe(g,f,d),pe(g,"VER",a.la),wi(a,g),g}function xm(a,d,f){if(d&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return d=a.Ca&&!a.pa?new Se(new da({eb:f})):new Se(a.pa),d.Ha(a.J),d}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function wm(){}t=wm.prototype,t.ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){};function It(a,d){We.call(this),this.g=new um(d),this.l=a,this.h=d&&d.messageUrlParams||null,a=d&&d.messageHeaders||null,d&&d.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=d&&d.initMessageHeaders||null,d&&d.messageContentType&&(a?a["X-WebChannel-Content-Type"]=d.messageContentType:a={"X-WebChannel-Content-Type":d.messageContentType}),d&&d.va&&(a?a["X-WebChannel-Client-Profile"]=d.va:a={"X-WebChannel-Client-Profile":d.va}),this.g.S=a,(a=d&&d.Sb)&&!x(a)&&(this.g.m=a),this.v=d&&d.supportsCrossDomainXhr||!1,this.u=d&&d.sendRawJson||!1,(d=d&&d.httpSessionIdParam)&&!x(d)&&(this.g.D=d,a=this.h,a!==null&&d in a&&(a=this.h,d in a&&delete a[d])),this.j=new as(this)}I(It,We),It.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},It.prototype.close=function(){du(this.g)},It.prototype.o=function(a){var d=this.g;if(typeof a=="string"){var f={};f.__data__=a,a=f}else this.u&&(f={},f.__data__=Xc(a),a=f);d.i.push(new O1(d.Ya++,a)),d.G==3&&ma(d)},It.prototype.N=function(){this.g.l=null,delete this.j,du(this.g),delete this.g,It.aa.N.call(this)};function Em(a){Zc.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var d=a.__sm__;if(d){e:{for(const f in d){a=f;break e}a=void 0}(this.i=a)&&(a=this.i,d=d!==null&&a in d?d[a]:void 0),this.data=d}else this.data=a}I(Em,Zc);function km(){eu.call(this),this.status=1}I(km,eu);function as(a){this.g=a}I(as,wm),as.prototype.ua=function(){Ze(this.g,"a")},as.prototype.ta=function(a){Ze(this.g,new Em(a))},as.prototype.sa=function(a){Ze(this.g,new km)},as.prototype.ra=function(){Ze(this.g,"b")},It.prototype.send=It.prototype.o,It.prototype.open=It.prototype.m,It.prototype.close=It.prototype.close,nu.NO_ERROR=0,nu.TIMEOUT=8,nu.HTTP_ERROR=6,A1.COMPLETE="complete",I1.EventType=ui,ui.OPEN="a",ui.CLOSE="b",ui.ERROR="c",ui.MESSAGE="d",We.prototype.listen=We.prototype.K,Se.prototype.listenOnce=Se.prototype.L,Se.prototype.getLastError=Se.prototype.Ka,Se.prototype.getLastErrorCode=Se.prototype.Ba,Se.prototype.getStatus=Se.prototype.Z,Se.prototype.getResponseJson=Se.prototype.Oa,Se.prototype.getResponseText=Se.prototype.oa,Se.prototype.send=Se.prototype.ea,Se.prototype.setWithCredentials=Se.prototype.Ha}).apply(typeof Fa<"u"?Fa:typeof self<"u"?self:typeof window<"u"?window:{});const W0="@firebase/firestore";/**
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
 */let na="10.14.0";/**
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
 */const Js=new Ho("@firebase/firestore");function Bt(t,...e){if(Js.logLevel<=se.DEBUG){const n=e.map(yp);Js.debug(`Firestore (${na}): ${t}`,...n)}}function Kw(t,...e){if(Js.logLevel<=se.ERROR){const n=e.map(yp);Js.error(`Firestore (${na}): ${t}`,...n)}}function sP(t,...e){if(Js.logLevel<=se.WARN){const n=e.map(yp);Js.warn(`Firestore (${na}): ${t}`,...n)}}function yp(t){if(typeof t=="string")return t;try{/**
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
 */function _p(t="Unexpected state"){const e=`FIRESTORE (${na}) INTERNAL ASSERTION FAILED: `+t;throw Kw(e),new Error(e)}function no(t,e){t||_p()}/**
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
 */class ro{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
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
 */class Yw{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class iP{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(nt.UNAUTHENTICATED))}shutdown(){}}class oP{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class aP{constructor(e){this.t=e,this.currentUser=nt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){no(this.o===void 0);let r=this.i;const s=u=>this.i!==r?(r=this.i,n(u)):Promise.resolve();let i=new ro;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new ro,e.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const u=i;e.enqueueRetryable(async()=>{await u.promise,await s(this.currentUser)})},l=u=>{Bt("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(u=>l(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?l(u):(Bt("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new ro)}},0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?(Bt("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(no(typeof r.accessToken=="string"),new Yw(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return no(e===null||typeof e=="string"),new nt(e)}}class lP{constructor(e,n,r){this.l=e,this.h=n,this.P=r,this.type="FirstParty",this.user=nt.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class cP{constructor(e,n,r){this.l=e,this.h=n,this.P=r}getToken(){return Promise.resolve(new lP(this.l,this.h,this.P))}start(e,n){e.enqueueRetryable(()=>n(nt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class uP{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class dP{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,n){no(this.o===void 0);const r=i=>{i.error!=null&&Bt("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.R;return this.R=i.token,Bt("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{Bt("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.A.getImmediate({optional:!0});i?s(i):Bt("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(no(typeof n.token=="string"),this.R=n.token,new uP(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}function hP(t){return t.name==="IndexedDbTransactionError"}class Xl{constructor(e,n){this.projectId=e,this.database=n||"(default)"}static empty(){return new Xl("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof Xl&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */var G0,ee;(ee=G0||(G0={}))[ee.OK=0]="OK",ee[ee.CANCELLED=1]="CANCELLED",ee[ee.UNKNOWN=2]="UNKNOWN",ee[ee.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ee[ee.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ee[ee.NOT_FOUND=5]="NOT_FOUND",ee[ee.ALREADY_EXISTS=6]="ALREADY_EXISTS",ee[ee.PERMISSION_DENIED=7]="PERMISSION_DENIED",ee[ee.UNAUTHENTICATED=16]="UNAUTHENTICATED",ee[ee.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ee[ee.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ee[ee.ABORTED=10]="ABORTED",ee[ee.OUT_OF_RANGE=11]="OUT_OF_RANGE",ee[ee.UNIMPLEMENTED=12]="UNIMPLEMENTED",ee[ee.INTERNAL=13]="INTERNAL",ee[ee.UNAVAILABLE=14]="UNAVAILABLE",ee[ee.DATA_LOSS=15]="DATA_LOSS";/**
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
 */new qw([4294967295,4294967295],0);function td(){return typeof document<"u"?document:null}/**
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
 */class fP{constructor(e,n,r=1e3,s=1.5,i=6e4){this.ui=e,this.timerId=n,this.ko=r,this.qo=s,this.Qo=i,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const n=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),s=Math.max(0,n-r);s>0&&Bt("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ko} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,s,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
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
 */class xp{constructor(e,n,r,s,i){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new ro,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,s,i){const o=Date.now()+r,l=new xp(e,n,o,s,i);return l.start(r),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new dt(ut.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}var q0,K0;(K0=q0||(q0={})).ea="default",K0.Cache="cache";/**
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
 */function pP(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
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
 */const Y0=new Map;function mP(t,e,n,r){if(e===!0&&r===!0)throw new dt(ut.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function gP(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":_p()}function vP(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new dt(ut.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=gP(t);throw new dt(ut.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
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
 */class Q0{constructor(e){var n,r;if(e.host===void 0){if(e.ssl!==void 0)throw new dt(ut.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(n=e.ssl)===null||n===void 0||n;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new dt(ut.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}mP("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=pP((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new dt(ut.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new dt(ut.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new dt(ut.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Qw{constructor(e,n,r,s){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Q0({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new dt(ut.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new dt(ut.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Q0(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new iP;switch(r.type){case"firstParty":return new cP(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new dt(ut.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const r=Y0.get(n);r&&(Bt("ComponentProvider","Removing Datastore"),Y0.delete(n),r.terminate())}(this),Promise.resolve()}}function yP(t,e,n,r={}){var s;const i=(t=vP(t,Qw))._getSettings(),o=`${e}:${n}`;if(i.host!=="firestore.googleapis.com"&&i.host!==o&&sP("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),t._setSettings(Object.assign(Object.assign({},i),{host:o,ssl:!1})),r.mockUserToken){let l,u;if(typeof r.mockUserToken=="string")l=r.mockUserToken,u=nt.MOCK_USER;else{l=G_(r.mockUserToken,(s=t._app)===null||s===void 0?void 0:s.options.projectId);const h=r.mockUserToken.sub||r.mockUserToken.user_id;if(!h)throw new dt(ut.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");u=new nt(h)}t._authCredentials=new oP(new Yw(l,u))}}/**
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
 */class X0{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new fP(this,"async_queue_retry"),this.Vu=()=>{const r=td();r&&Bt("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const n=td();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const n=td();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const n=new ro;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!hP(e))throw e;Bt("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const n=this.mu.then(()=>(this.du=!0,e().catch(r=>{this.Eu=r,this.du=!1;const s=function(o){let l=o.message||"";return o.stack&&(l=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),l}(r);throw Kw("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.du=!1,r))));return this.mu=n,n}enqueueAfterDelay(e,n,r){this.fu(),this.Ru.indexOf(e)>-1&&(n=0);const s=xp.createAndSchedule(this,e,n,r,i=>this.yu(i));return this.Tu.push(s),s}fu(){this.Eu&&_p()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const n of this.Tu)if(n.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.Tu)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const n=this.Tu.indexOf(e);this.Tu.splice(n,1)}}class _P extends Qw{constructor(e,n,r,s){super(e,n,r,s),this.type="firestore",this._queue=new X0,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new X0(e),this._firestoreClient=void 0,await e}}}function xP(t,e){const n=typeof t=="object"?t:Sc(),r=typeof t=="string"?t:"(default)",s=yr(n,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=B_("firestore");i&&yP(s,...i)}return s}(function(e,n=!0){(function(s){na=s})(Zr),Kt(new Dt("firestore",(r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),l=new _P(new aP(r.getProvider("auth-internal")),new dP(r.getProvider("app-check-internal")),function(h,m){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new dt(ut.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Xl(h.options.projectId,m)}(o,s),o);return i=Object.assign({useFetchStreams:n},i),l._setSettings(i),l},"PUBLIC").setMultipleInstances(!0)),vt(W0,"4.7.3",e),vt(W0,"4.7.3","esm2017")})();const Xw="@firebase/installations",wp="0.6.9";/**
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
 */const Jw=1e4,Zw=`w:${wp}`,e1="FIS_v2",wP="https://firebaseinstallations.googleapis.com/v1",EP=60*60*1e3,kP="installations",SP="Installations";/**
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
 */const NP={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},qr=new Jr(kP,SP,NP);function t1(t){return t instanceof Qt&&t.code.includes("request-failed")}/**
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
 */function n1({projectId:t}){return`${wP}/projects/${t}/installations`}function r1(t){return{token:t.token,requestStatus:2,expiresIn:IP(t.expiresIn),creationTime:Date.now()}}async function s1(t,e){const r=(await e.json()).error;return qr.create("request-failed",{requestName:t,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function i1({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function CP(t,{refreshToken:e}){const n=i1(t);return n.append("Authorization",TP(e)),n}async function o1(t){const e=await t();return e.status>=500&&e.status<600?t():e}function IP(t){return Number(t.replace("s","000"))}function TP(t){return`${e1} ${t}`}/**
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
 */async function bP({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const r=n1(t),s=i1(t),i=e.getImmediate({optional:!0});if(i){const h=await i.getHeartbeatsHeader();h&&s.append("x-firebase-client",h)}const o={fid:n,authVersion:e1,appId:t.appId,sdkVersion:Zw},l={method:"POST",headers:s,body:JSON.stringify(o)},u=await o1(()=>fetch(r,l));if(u.ok){const h=await u.json();return{fid:h.fid||n,registrationStatus:2,refreshToken:h.refreshToken,authToken:r1(h.authToken)}}else throw await s1("Create Installation",u)}/**
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
 */function a1(t){return new Promise(e=>{setTimeout(e,t)})}/**
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
 */function RP(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */const PP=/^[cdef][\w-]{21}$/,Ch="";function AP(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const n=jP(t);return PP.test(n)?n:Ch}catch{return Ch}}function jP(t){return RP(t).substr(0,22)}/**
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
 */function Vc(t){return`${t.appName}!${t.appId}`}/**
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
 */const l1=new Map;function c1(t,e){const n=Vc(t);u1(n,e),OP(n,e)}function u1(t,e){const n=l1.get(t);if(n)for(const r of n)r(e)}function OP(t,e){const n=DP();n&&n.postMessage({key:t,fid:e}),LP()}let Pr=null;function DP(){return!Pr&&"BroadcastChannel"in self&&(Pr=new BroadcastChannel("[Firebase] FID Change"),Pr.onmessage=t=>{u1(t.data.key,t.data.fid)}),Pr}function LP(){l1.size===0&&Pr&&(Pr.close(),Pr=null)}/**
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
 */const MP="firebase-installations-database",FP=1,Kr="firebase-installations-store";let nd=null;function Ep(){return nd||(nd=ex(MP,FP,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(Kr)}}})),nd}async function Jl(t,e){const n=Vc(t),s=(await Ep()).transaction(Kr,"readwrite"),i=s.objectStore(Kr),o=await i.get(n);return await i.put(e,n),await s.done,(!o||o.fid!==e.fid)&&c1(t,e.fid),e}async function d1(t){const e=Vc(t),r=(await Ep()).transaction(Kr,"readwrite");await r.objectStore(Kr).delete(e),await r.done}async function $c(t,e){const n=Vc(t),s=(await Ep()).transaction(Kr,"readwrite"),i=s.objectStore(Kr),o=await i.get(n),l=e(o);return l===void 0?await i.delete(n):await i.put(l,n),await s.done,l&&(!o||o.fid!==l.fid)&&c1(t,l.fid),l}/**
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
 */async function kp(t){let e;const n=await $c(t.appConfig,r=>{const s=UP(r),i=zP(t,s);return e=i.registrationPromise,i.installationEntry});return n.fid===Ch?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function UP(t){const e=t||{fid:AP(),registrationStatus:0};return h1(e)}function zP(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(qr.create("app-offline"));return{installationEntry:e,registrationPromise:s}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},r=VP(t,n);return{installationEntry:n,registrationPromise:r}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:$P(t)}:{installationEntry:e}}async function VP(t,e){try{const n=await bP(t,e);return Jl(t.appConfig,n)}catch(n){throw t1(n)&&n.customData.serverCode===409?await d1(t.appConfig):await Jl(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function $P(t){let e=await J0(t.appConfig);for(;e.registrationStatus===1;)await a1(100),e=await J0(t.appConfig);if(e.registrationStatus===0){const{installationEntry:n,registrationPromise:r}=await kp(t);return r||n}return e}function J0(t){return $c(t,e=>{if(!e)throw qr.create("installation-not-found");return h1(e)})}function h1(t){return BP(t)?{fid:t.fid,registrationStatus:0}:t}function BP(t){return t.registrationStatus===1&&t.registrationTime+Jw<Date.now()}/**
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
 */async function HP({appConfig:t,heartbeatServiceProvider:e},n){const r=WP(t,n),s=CP(t,n),i=e.getImmediate({optional:!0});if(i){const h=await i.getHeartbeatsHeader();h&&s.append("x-firebase-client",h)}const o={installation:{sdkVersion:Zw,appId:t.appId}},l={method:"POST",headers:s,body:JSON.stringify(o)},u=await o1(()=>fetch(r,l));if(u.ok){const h=await u.json();return r1(h)}else throw await s1("Generate Auth Token",u)}function WP(t,{fid:e}){return`${n1(t)}/${e}/authTokens:generate`}/**
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
 */async function Sp(t,e=!1){let n;const r=await $c(t.appConfig,i=>{if(!f1(i))throw qr.create("not-registered");const o=i.authToken;if(!e&&KP(o))return i;if(o.requestStatus===1)return n=GP(t,e),i;{if(!navigator.onLine)throw qr.create("app-offline");const l=QP(i);return n=qP(t,l),l}});return n?await n:r.authToken}async function GP(t,e){let n=await Z0(t.appConfig);for(;n.authToken.requestStatus===1;)await a1(100),n=await Z0(t.appConfig);const r=n.authToken;return r.requestStatus===0?Sp(t,e):r}function Z0(t){return $c(t,e=>{if(!f1(e))throw qr.create("not-registered");const n=e.authToken;return XP(n)?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}async function qP(t,e){try{const n=await HP(t,e),r=Object.assign(Object.assign({},e),{authToken:n});return await Jl(t.appConfig,r),n}catch(n){if(t1(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await d1(t.appConfig);else{const r=Object.assign(Object.assign({},e),{authToken:{requestStatus:0}});await Jl(t.appConfig,r)}throw n}}function f1(t){return t!==void 0&&t.registrationStatus===2}function KP(t){return t.requestStatus===2&&!YP(t)}function YP(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+EP}function QP(t){const e={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},t),{authToken:e})}function XP(t){return t.requestStatus===1&&t.requestTime+Jw<Date.now()}/**
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
 */async function JP(t){const e=t,{installationEntry:n,registrationPromise:r}=await kp(e);return r?r.catch(console.error):Sp(e).catch(console.error),n.fid}/**
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
 */async function ZP(t,e=!1){const n=t;return await eA(n),(await Sp(n,e)).token}async function eA(t){const{registrationPromise:e}=await kp(t);e&&await e}/**
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
 */function tA(t){if(!t||!t.options)throw rd("App Configuration");if(!t.name)throw rd("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw rd(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function rd(t){return qr.create("missing-app-config-values",{valueName:t})}/**
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
 */const p1="installations",nA="installations-internal",rA=t=>{const e=t.getProvider("app").getImmediate(),n=tA(e),r=yr(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},sA=t=>{const e=t.getProvider("app").getImmediate(),n=yr(e,p1).getImmediate();return{getId:()=>JP(n),getToken:s=>ZP(n,s)}};function iA(){Kt(new Dt(p1,rA,"PUBLIC")),Kt(new Dt(nA,sA,"PRIVATE"))}iA();vt(Xw,wp);vt(Xw,wp,"esm2017");/**
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
 */const Zl="analytics",oA="firebase_id",aA="origin",lA=60*1e3,cA="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",Np="https://www.googletagmanager.com/gtag/js";/**
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
 */const yt=new Ho("@firebase/analytics");/**
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
 */const uA={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},Et=new Jr("analytics","Analytics",uA);/**
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
 */function dA(t){if(!t.startsWith(Np)){const e=Et.create("invalid-gtag-resource",{gtagURL:t});return yt.warn(e.message),""}return t}function m1(t){return Promise.all(t.map(e=>e.catch(n=>n)))}function hA(t,e){let n;return window.trustedTypes&&(n=window.trustedTypes.createPolicy(t,e)),n}function fA(t,e){const n=hA("firebase-js-sdk-policy",{createScriptURL:dA}),r=document.createElement("script"),s=`${Np}?l=${t}&id=${e}`;r.src=n?n==null?void 0:n.createScriptURL(s):s,r.async=!0,document.head.appendChild(r)}function pA(t){let e=[];return Array.isArray(window[t])?e=window[t]:window[t]=e,e}async function mA(t,e,n,r,s,i){const o=r[s];try{if(o)await e[o];else{const u=(await m1(n)).find(h=>h.measurementId===s);u&&await e[u.appId]}}catch(l){yt.error(l)}t("config",s,i)}async function gA(t,e,n,r,s){try{let i=[];if(s&&s.send_to){let o=s.send_to;Array.isArray(o)||(o=[o]);const l=await m1(n);for(const u of o){const h=l.find(p=>p.measurementId===u),m=h&&e[h.appId];if(m)i.push(m);else{i=[];break}}}i.length===0&&(i=Object.values(e)),await Promise.all(i),t("event",r,s||{})}catch(i){yt.error(i)}}function vA(t,e,n,r){async function s(i,...o){try{if(i==="event"){const[l,u]=o;await gA(t,e,n,l,u)}else if(i==="config"){const[l,u]=o;await mA(t,e,n,r,l,u)}else if(i==="consent"){const[l,u]=o;t("consent",l,u)}else if(i==="get"){const[l,u,h]=o;t("get",l,u,h)}else if(i==="set"){const[l]=o;t("set",l)}else t(i,...o)}catch(l){yt.error(l)}}return s}function yA(t,e,n,r,s){let i=function(...o){window[r].push(arguments)};return window[s]&&typeof window[s]=="function"&&(i=window[s]),window[s]=vA(i,t,e,n),{gtagCore:i,wrappedGtag:window[s]}}function _A(t){const e=window.document.getElementsByTagName("script");for(const n of Object.values(e))if(n.src&&n.src.includes(Np)&&n.src.includes(t))return n;return null}/**
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
 */const xA=30,wA=1e3;class EA{constructor(e={},n=wA){this.throttleMetadata=e,this.intervalMillis=n}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,n){this.throttleMetadata[e]=n}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const g1=new EA;function kA(t){return new Headers({Accept:"application/json","x-goog-api-key":t})}async function SA(t){var e;const{appId:n,apiKey:r}=t,s={method:"GET",headers:kA(r)},i=cA.replace("{app-id}",n),o=await fetch(i,s);if(o.status!==200&&o.status!==304){let l="";try{const u=await o.json();!((e=u.error)===null||e===void 0)&&e.message&&(l=u.error.message)}catch{}throw Et.create("config-fetch-failed",{httpStatus:o.status,responseMessage:l})}return o.json()}async function NA(t,e=g1,n){const{appId:r,apiKey:s,measurementId:i}=t.options;if(!r)throw Et.create("no-app-id");if(!s){if(i)return{measurementId:i,appId:r};throw Et.create("no-api-key")}const o=e.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},l=new TA;return setTimeout(async()=>{l.abort()},lA),v1({appId:r,apiKey:s,measurementId:i},o,l,e)}async function v1(t,{throttleEndTimeMillis:e,backoffCount:n},r,s=g1){var i;const{appId:o,measurementId:l}=t;try{await CA(r,e)}catch(u){if(l)return yt.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${l} provided in the "measurementId" field in the local Firebase config. [${u==null?void 0:u.message}]`),{appId:o,measurementId:l};throw u}try{const u=await SA(t);return s.deleteThrottleMetadata(o),u}catch(u){const h=u;if(!IA(h)){if(s.deleteThrottleMetadata(o),l)return yt.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${l} provided in the "measurementId" field in the local Firebase config. [${h==null?void 0:h.message}]`),{appId:o,measurementId:l};throw u}const m=Number((i=h==null?void 0:h.customData)===null||i===void 0?void 0:i.httpStatus)===503?Lg(n,s.intervalMillis,xA):Lg(n,s.intervalMillis),p={throttleEndTimeMillis:Date.now()+m,backoffCount:n+1};return s.setThrottleMetadata(o,p),yt.debug(`Calling attemptFetch again in ${m} millis`),v1(t,p,r,s)}}function CA(t,e){return new Promise((n,r)=>{const s=Math.max(e-Date.now(),0),i=setTimeout(n,s);t.addEventListener(()=>{clearTimeout(i),r(Et.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function IA(t){if(!(t instanceof Qt)||!t.customData)return!1;const e=Number(t.customData.httpStatus);return e===429||e===500||e===503||e===504}class TA{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function bA(t,e,n,r,s){if(s&&s.global){t("event",n,r);return}else{const i=await e,o=Object.assign(Object.assign({},r),{send_to:i});t("event",n,o)}}/**
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
 */async function RA(){if(Y_())try{await Q_()}catch(t){return yt.warn(Et.create("indexeddb-unavailable",{errorInfo:t==null?void 0:t.toString()}).message),!1}else return yt.warn(Et.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function PA(t,e,n,r,s,i,o){var l;const u=NA(t);u.then(S=>{n[S.measurementId]=S.appId,t.options.measurementId&&S.measurementId!==t.options.measurementId&&yt.warn(`The measurement ID in the local Firebase config (${t.options.measurementId}) does not match the measurement ID fetched from the server (${S.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(S=>yt.error(S)),e.push(u);const h=RA().then(S=>{if(S)return r.getId()}),[m,p]=await Promise.all([u,h]);_A(i)||fA(i,m.measurementId),s("js",new Date);const v=(l=o==null?void 0:o.config)!==null&&l!==void 0?l:{};return v[aA]="firebase",v.update=!0,p!=null&&(v[oA]=p),s("config",m.measurementId,v),m.measurementId}/**
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
 */class AA{constructor(e){this.app=e}_delete(){return delete so[this.app.options.appId],Promise.resolve()}}let so={},ev=[];const tv={};let sd="dataLayer",jA="gtag",nv,y1,rv=!1;function OA(){const t=[];if(q_()&&t.push("This is a browser extension environment."),iS()||t.push("Cookies are not available."),t.length>0){const e=t.map((r,s)=>`(${s+1}) ${r}`).join(" "),n=Et.create("invalid-analytics-context",{errorInfo:e});yt.warn(n.message)}}function DA(t,e,n){OA();const r=t.options.appId;if(!r)throw Et.create("no-app-id");if(!t.options.apiKey)if(t.options.measurementId)yt.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${t.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw Et.create("no-api-key");if(so[r]!=null)throw Et.create("already-exists",{id:r});if(!rv){pA(sd);const{wrappedGtag:i,gtagCore:o}=yA(so,ev,tv,sd,jA);y1=i,nv=o,rv=!0}return so[r]=PA(t,ev,tv,e,nv,sd,n),new AA(t)}function LA(t=Sc()){t=Oe(t);const e=yr(t,Zl);return e.isInitialized()?e.getImmediate():MA(t)}function MA(t,e={}){const n=yr(t,Zl);if(n.isInitialized()){const s=n.getImmediate();if(Co(e,n.getOptions()))return s;throw Et.create("already-initialized")}return n.initialize({options:e})}function FA(t,e,n,r){t=Oe(t),bA(y1,so[t.app.options.appId],e,n,r).catch(s=>yt.error(s))}const sv="@firebase/analytics",iv="0.10.8";function UA(){Kt(new Dt(Zl,(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("installations-internal").getImmediate();return DA(r,s,n)},"PUBLIC")),Kt(new Dt("analytics-internal",t,"PRIVATE")),vt(sv,iv),vt(sv,iv,"esm2017");function t(e){try{const n=e.getProvider(Zl).getImmediate();return{logEvent:(r,s,i)=>FA(n,r,s,i)}}catch(n){throw Et.create("interop-component-reg-failed",{reason:n})}}}UA();const zA={apiKey:"AIzaSyDyM1bZvabUpqINlIyF66DEaiHSePhzrB0",authDomain:"trasnporte-nataga---la-plata.firebaseapp.com",databaseURL:"https://trasnporte-nataga---la-plata-default-rtdb.firebaseio.com",projectId:"trasnporte-nataga---la-plata",storageBucket:"trasnporte-nataga---la-plata.firebasestorage.app",messagingSenderId:"175264872585",appId:"1:175264872585:web:124a80135af84a38f72e58",measurementId:"G-QXERYS2M87"},Bc=tx(zA);LA(Bc);const Lo=UI(Bc),Re=ZR(Bc);xP(Bc);function VA({onLogin:t,onRegisterOwner:e,onRegisterPassenger:n,onViewTerms:r,onViewPrivacy:s,onViewManual:i}){const[o,l]=$.useState(0),u=[{icon:c.jsx(zr,{size:32}),title:"Pasajeros",desc:"Reserva tu asiento desde cualquier dispositivo. Usa la App nativa en Android o nuestra plataforma web optimizada para iPhone.",color:"text-blue-500",features:["Reserva Web & App","Puntos Go por fidelidad","Estatus PRO exclusivo"],actions:[{label:"Android App",type:"primary",link:"https://play.google.com/store/apps/details?id=com.chopcode.rutago.app"},{label:"Versión Web",type:"secondary",action:n}]},{icon:c.jsx(Xr,{size:32}),title:"Conductores",desc:"Optimiza tus ingresos con herramientas digitales. Gestiona tu planilla desde Android o consulta tu ruta desde la web.",color:"text-primary-500",features:["Planilla Digital","Estatus Estrella","Check-in en vivo"],actions:[{label:"Descargar App",type:"primary",link:"https://play.google.com/store/apps/details?id=com.chopcode.rutago.app"},{label:"Acceso Web",type:"secondary",action:t}]},{icon:c.jsx(So,{size:32}),title:"Dueños de Flota",desc:"Control room total de tus activos. Vigila la ocupación en tiempo real y monitorea ingresos desde tu oficina o celular.",color:"text-green-500",features:["Aislamiento de propiedad","Métricas en tiempo real","Control de flota"],actions:[{label:"Entrar al Portal",type:"primary",action:t},{label:"Afiliar Flota",type:"secondary",action:e}]}];return $.useEffect(()=>{const h=setInterval(()=>{l(m=>(m+1)%u.length)},5e3);return()=>clearInterval(h)},[]),c.jsxs("div",{className:"min-h-screen bg-white text-slate-900 font-sans selection:bg-primary-100",children:[c.jsx("nav",{className:"fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100",children:c.jsxs("div",{className:"max-w-7xl mx-auto px-3 md:px-6 h-16 md:h-20 flex items-center justify-between",children:[c.jsxs("div",{className:"flex items-center gap-2 md:gap-3",children:[c.jsx("div",{className:"w-8 h-8 md:w-10 md:h-10 bg-secondary-900 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg shrink-0",children:c.jsx("img",{src:"/assets/logo_icon.png",alt:"Ruta-Go Logo",className:"w-5 h-5 md:w-7 md:h-7 object-contain"})}),c.jsx("span",{className:"text-lg md:text-2xl font-black tracking-tighter text-secondary-900",children:"Ruta-Go"})]}),c.jsxs("div",{className:"flex items-center gap-1.5 md:gap-4",children:[c.jsx("button",{onClick:t,className:"px-2 md:px-6 py-2 font-bold text-slate-600 hover:text-primary-500 transition-colors text-[10px] md:text-sm",children:"Iniciar Sesión"}),c.jsxs("button",{onClick:e,className:"px-3 md:px-6 py-2 bg-secondary-900 text-white font-bold rounded-xl shadow-xl hover:bg-black transition-all active:scale-95 text-[9px] md:text-sm uppercase tracking-wider",children:["Ser Dueño",c.jsx("span",{className:"hidden md:inline",children:" de Flota"})]})]})]})}),c.jsxs("header",{className:"pt-28 md:pt-40 pb-12 md:pb-20 px-4 md:px-6 overflow-hidden relative",children:[c.jsx("div",{className:"absolute top-20 right-0 w-64 md:w-96 h-64 md:h-96 bg-primary-500/10 rounded-full blur-3xl -z-10 animate-pulse"}),c.jsxs("div",{className:"max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center",children:[c.jsxs("div",{className:"space-y-4 md:space-y-8 text-center lg:text-left",children:[c.jsxs("div",{className:"inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-primary-50 rounded-full text-primary-600 font-black text-[8px] md:text-[10px] uppercase tracking-widest border border-primary-100 mx-auto lg:mx-0",children:[c.jsx(jg,{size:12,className:"md:size-[14px]"})," El futuro del transporte huilense"]}),c.jsxs("h1",{className:"text-3xl md:text-5xl lg:text-7xl font-black text-secondary-900 leading-[1.1] tracking-tight",children:["Conectando ",c.jsx("span",{className:"text-primary-500",children:"Nátaga"})," y La Plata con tecnología."]}),c.jsx("p",{className:"text-base md:text-xl text-slate-500 leading-relaxed max-w-lg mx-auto lg:mx-0 px-2 md:px-0",children:"Ruta-Go profesionaliza el transporte intermunicipal. Reservas en tiempo real, control de flota y una experiencia premium para todos."}),c.jsxs("div",{className:"flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start px-4 sm:px-0",children:[c.jsxs("a",{href:"https://play.google.com/store/apps/details?id=com.chopcode.rutago.app",target:"_blank",rel:"noopener noreferrer",className:"px-6 md:px-10 py-3.5 md:py-5 bg-primary-500 text-white font-black rounded-2xl shadow-2xl shadow-primary-500/40 hover:bg-orange-600 transition-all active:scale-95 flex items-center justify-center gap-2 md:gap-3 group text-sm md:text-lg",children:["Android App ",c.jsx(ko,{size:18,className:"group-hover:translate-x-1 transition-transform"})]}),c.jsx("button",{onClick:n,className:"px-6 md:px-10 py-3.5 md:py-5 bg-white text-secondary-900 font-black rounded-2xl border-2 border-secondary-900 hover:bg-secondary-50 transition-all active:scale-95 text-sm md:text-lg",children:"Versión Web (iPhone)"})]})]}),c.jsxs("div",{className:"relative mt-8 lg:mt-0",children:[c.jsx("div",{className:"bg-gradient-to-tr from-secondary-900 to-slate-800 rounded-[2.5rem] md:rounded-[3rem] p-4 md:p-8 shadow-2xl shadow-slate-900/20 transform lg:rotate-2",children:c.jsx("div",{className:"bg-white rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-inner",children:c.jsx("img",{src:"https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2069",alt:"Ruta-Go App Preview",className:"w-full h-64 md:h-96 object-cover"})})}),c.jsxs("div",{className:"absolute -bottom-4 -left-2 md:-bottom-6 md:-left-6 bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-2xl border border-slate-100 flex items-center gap-3 md:gap-4 animate-bounce-slow",children:[c.jsx("div",{className:"w-10 h-10 md:w-12 h-12 bg-amber-50 rounded-xl md:rounded-2xl flex items-center justify-center text-amber-500",children:c.jsx(jg,{size:22,fill:"currentColor"})}),c.jsxs("div",{children:[c.jsx("p",{className:"text-[10px] text-slate-400 font-bold uppercase",children:"Calificación App"}),c.jsx("p",{className:"text-base md:text-lg font-black text-slate-800 leading-none",children:"4.9 / 5.0"})]})]})]})]})]}),c.jsx("section",{className:"py-16 md:py-24 bg-slate-50 overflow-hidden",children:c.jsxs("div",{className:"max-w-7xl mx-auto px-6",children:[c.jsxs("div",{className:"text-center mb-12 md:mb-16 space-y-4",children:[c.jsx("h2",{className:"text-3xl md:text-4xl font-black text-secondary-900 tracking-tight px-4",children:"Soluciones para todo el ecosistema"}),c.jsx("p",{className:"text-slate-500 font-medium text-sm md:text-base",children:"Haz clic en tu perfil para comenzar."})]}),c.jsx("div",{className:"hidden lg:grid grid-cols-3 gap-8",children:u.map((h,m)=>c.jsx(ov,{...h,onClick:h.action,isStatic:!0},m))}),c.jsxs("div",{className:"lg:hidden relative max-w-sm mx-auto h-[460px]",children:[u.map((h,m)=>{const p=m===o;return c.jsx("div",{className:`absolute inset-0 transition-all duration-700 ease-in-out transform ${p?"translate-x-0 opacity-100 scale-100 z-30":"translate-x-full opacity-0 scale-95 z-0"}`,children:c.jsx(ov,{...h,onClick:h.action})},m)}),c.jsx("div",{className:"absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-3",children:u.map((h,m)=>c.jsx("button",{onClick:()=>l(m),className:`h-2 rounded-full transition-all duration-300 ${m===o?"w-8 bg-primary-500":"w-2 bg-slate-200"}`},m))})]})]})}),c.jsx("section",{className:"py-16 md:py-24 bg-white",children:c.jsxs("div",{className:"max-w-7xl mx-auto px-6 flex flex-col items-center text-center space-y-8 md:space-y-12",children:[c.jsx("h2",{className:"text-3xl md:text-4xl font-black text-secondary-900 tracking-tight max-w-2xl px-4",children:"Conectamos los puntos más importantes del sur del Huila."}),c.jsxs("div",{className:"flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8",children:[c.jsx(av,{city:"Nátaga"}),c.jsx("div",{className:"w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-300 transform rotate-90 sm:rotate-0",children:c.jsx(ko,{})}),c.jsx(av,{city:"La Plata"})]})]})}),c.jsxs("footer",{className:"bg-secondary-900 py-16 md:py-24 text-white overflow-hidden relative",children:[c.jsx("div",{className:"absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-orange-400 to-transparent"}),c.jsxs("div",{className:"max-w-7xl mx-auto px-6 text-center space-y-8 md:space-y-10 relative z-10",children:[c.jsxs("h2",{className:"text-4xl md:text-5xl font-black tracking-tight leading-tight",children:["¿Listo para llevar tu flota ",c.jsx("br",{className:"hidden md:block"}),"al siguiente nivel?"]}),c.jsx("p",{className:"text-white/50 text-lg md:text-xl max-w-2xl mx-auto px-4",children:"Únete a la red de transporte más moderna de la región. Registra tu vehículo hoy mismo y empieza a ver los beneficios."}),c.jsxs("div",{className:"flex flex-col sm:flex-row justify-center gap-4 md:gap-6 pt-4 px-8 sm:px-0",children:[c.jsx("button",{onClick:e,className:"px-10 md:px-12 py-4 md:py-5 bg-primary-500 text-white font-black rounded-2xl shadow-2xl shadow-primary-500/40 hover:bg-orange-600 transition-all active:scale-95 text-base md:text-xl uppercase tracking-wider",children:"Quiero ser Socio"}),c.jsx("button",{onClick:t,className:"px-10 md:px-12 py-4 md:py-5 bg-white/10 text-white font-black rounded-2xl border border-white/10 hover:bg-white/20 transition-all active:scale-95 text-base md:text-xl uppercase tracking-wider",children:"Acceso Administrativo"})]}),c.jsxs("div",{className:"pt-16 md:pt-20 grid grid-cols-1 md:grid-cols-3 items-center gap-10",children:[c.jsxs("div",{className:"flex items-center gap-2 justify-center md:justify-start",children:[c.jsx("div",{className:"w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10",children:c.jsx("img",{src:"/assets/logo_icon.png",alt:"Ruta-Go Logo",className:"w-7 h-7 object-contain"})}),c.jsx("span",{className:"text-xl font-bold tracking-tighter",children:"Ruta-Go"})]}),c.jsx("div",{className:"text-white/30 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] order-3 md:order-none",children:"ChopCode Solutions © 2026 • Huila, CO"}),c.jsxs("div",{className:"flex justify-center md:justify-end gap-6 text-white/40 text-sm md:text-base order-2 md:order-none",children:[c.jsx("span",{onClick:i,className:"hover:text-primary-500 cursor-pointer transition-colors",children:"Manual"}),c.jsx("span",{onClick:s,className:"hover:text-primary-500 cursor-pointer transition-colors",children:"Privacidad"}),c.jsx("span",{onClick:r,className:"hover:text-primary-500 cursor-pointer transition-colors",children:"Términos"})]})]})]})]})]})}function ov({icon:t,title:e,desc:n,color:r,features:s,actions:i,isStatic:o}){return c.jsxs("div",{className:`bg-white p-8 md:p-10 rounded-3xl md:rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100 transition-all duration-500 group ${o?"hover:shadow-2xl hover:-translate-y-2":""}`,children:[c.jsx("div",{className:`mb-6 md:mb-8 w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center bg-slate-50 ${r} group-hover:scale-110 transition-transform duration-500 shadow-inner`,children:t}),c.jsx("h3",{className:"text-xl md:text-2xl font-black text-secondary-900 mb-3 md:mb-4",children:e}),c.jsx("p",{className:"text-sm md:text-base text-slate-500 leading-relaxed mb-6 md:mb-8 min-h-[3.5rem]",children:n}),c.jsx("ul",{className:"space-y-2 md:space-y-3 mb-8",children:s.map((l,u)=>c.jsxs("li",{className:"flex items-center gap-2 md:gap-3 text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wide",children:[c.jsx(bn,{size:14,className:"text-green-500 md:size-4"})," ",l]},u))}),c.jsx("div",{className:"flex flex-col gap-3",children:i.map((l,u)=>l.link?c.jsxs("a",{href:l.link,target:"_blank",rel:"noopener noreferrer",className:`w-full py-3 rounded-xl font-black text-[10px] uppercase tracking-widest text-center transition-all active:scale-95 flex items-center justify-center gap-2 ${l.type==="primary"?"bg-primary-500 text-white shadow-lg shadow-primary-500/30 hover:bg-orange-600":"bg-slate-50 text-slate-600 border border-slate-200 hover:bg-white"}`,children:[l.label," ",c.jsx(ko,{size:14})]},u):c.jsxs("button",{onClick:l.action,className:`w-full py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 ${l.type==="primary"?"bg-secondary-900 text-white shadow-lg shadow-slate-900/30 hover:bg-black":"bg-slate-50 text-slate-600 border border-slate-200 hover:bg-white"}`,children:[l.label," ",c.jsx(ko,{size:14})]},u))})]})}function av({city:t}){return c.jsxs("div",{className:"px-6 md:px-10 py-4 md:py-6 bg-slate-50 rounded-2xl md:rounded-[2.5rem] border border-slate-100 flex items-center gap-3 md:gap-4 group hover:bg-white hover:shadow-xl transition-all duration-500",children:[c.jsx("div",{className:"w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl shadow-md flex items-center justify-center text-primary-500 group-hover:rotate-12 transition-transform",children:c.jsx(j_,{size:20,className:"md:size-6"})}),c.jsx("span",{className:"text-lg md:text-2xl font-black text-slate-800",children:t})]})}function $A({onShowRegister:t,onBack:e}){const[n,r]=$.useState(""),[s,i]=$.useState(""),[o,l]=$.useState(null),[u,h]=$.useState(!1),m=async p=>{p.preventDefault(),h(!0),l(null);try{await EC(Lo,n,s)}catch{l("Email o contraseña incorrectos. Verifica tus credenciales.")}finally{h(!1)}};return c.jsxs("div",{className:"min-h-screen bg-secondary-900 flex flex-col lg:flex-row overflow-hidden font-sans selection:bg-primary-100",children:[c.jsxs("div",{className:"hidden lg:flex lg:w-1/2 bg-gradient-to-br from-secondary-900 to-slate-800 p-20 flex-col justify-between relative",children:[c.jsx("div",{className:"absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none",children:c.jsx(L_,{size:600,className:"text-white absolute -right-20 -bottom-20 rotate-12"})}),c.jsxs("div",{className:"relative z-10 flex items-center gap-3",children:[c.jsx("img",{src:"/assets/logo_icon.png",alt:"Ruta-Go Logo",className:"w-12 h-12 object-contain"}),c.jsx("span",{className:"text-3xl font-black tracking-tighter text-white",children:"Ruta-Go"})]}),c.jsxs("div",{className:"relative z-10 space-y-8",children:[c.jsxs("h2",{className:"text-6xl font-black text-white leading-tight tracking-tight",children:["Acceso ",c.jsx("br",{}),c.jsx("span",{className:"text-primary-500 text-7xl italic",children:"Inteligente"})," ",c.jsx("br",{}),"Universal."]}),c.jsxs("div",{className:"flex items-center gap-4 text-white/50 font-bold uppercase tracking-widest text-xs border-l-4 border-primary-500 pl-6",children:["Una sola llave para todo el Holding. ",c.jsx("br",{}),"El sistema detectará tu rol automáticamente."]})]}),c.jsx("div",{className:"relative z-10 text-white/30 text-[10px] font-black uppercase tracking-[0.3em]",children:"ChopCode Solutions • Secure Access Gateway"})]}),c.jsxs("div",{className:"flex-1 bg-white p-6 lg:p-20 flex flex-col justify-center relative animate-in fade-in slide-in-from-right-4 duration-500",children:[c.jsx("button",{onClick:e,className:"absolute top-8 left-8 lg:left-20 p-3 text-slate-400 hover:text-primary-500 hover:bg-slate-50 rounded-full transition-all group",children:c.jsx($o,{size:24,className:"group-hover:-translate-x-1 transition-transform"})}),c.jsxs("div",{className:"max-w-md mx-auto w-full space-y-10",children:[c.jsxs("div",{className:"space-y-2",children:[c.jsx("h3",{className:"text-3xl font-black text-slate-800 tracking-tight",children:"Iniciar Sesión"}),c.jsxs("div",{className:"flex items-center gap-2",children:[c.jsx("span",{className:"w-2 h-2 bg-green-500 rounded-full animate-pulse"}),c.jsx("p",{className:"text-slate-400 font-bold text-[10px] uppercase tracking-widest",children:"Puerta de Enlace Única (SSO)"})]})]}),c.jsxs("form",{onSubmit:m,className:"space-y-6",children:[c.jsx(lv,{label:"Correo Corporativo",type:"email",placeholder:"tu@rutago.com",icon:c.jsx(Bo,{size:18}),value:n,onChange:r}),c.jsx(lv,{label:"Contraseña",type:"password",placeholder:"••••••••",icon:c.jsx(A_,{size:18}),value:s,onChange:i}),o&&c.jsxs("div",{className:"p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-[10px] font-black uppercase flex items-center gap-3 animate-shake",children:[c.jsx("div",{className:"w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shrink-0"}),o]}),c.jsx("button",{type:"submit",disabled:u,className:"w-full bg-secondary-900 hover:bg-black text-white font-black py-5 rounded-2xl shadow-2xl shadow-slate-900/30 transition-all transform active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed text-sm uppercase tracking-widest",children:u?c.jsx(Ur,{className:"animate-spin",size:20}):"Entrar a Ruta-Go"})]}),c.jsx("div",{className:"pt-8 border-t border-slate-50 text-center",children:c.jsxs("p",{className:"text-xs font-bold text-slate-400 uppercase tracking-tight",children:["¿Aún no eres socio? "," ",c.jsx("button",{onClick:t,className:"text-primary-500 hover:text-orange-600 transition-colors border-b-2 border-primary-500/20 hover:border-primary-500 pb-0.5",children:"Registrar mi Flota"})]})}),c.jsx("p",{className:"text-center text-[10px] text-slate-300 font-black uppercase tracking-[0.2em]",children:"Ruta-Go Portal © 2026"})]})]})]})}function lv({label:t,type:e,placeholder:n,icon:r,value:s,onChange:i}){return c.jsxs("div",{className:"space-y-1.5 group",children:[c.jsx("label",{className:"text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-primary-500",children:t}),c.jsxs("div",{className:"relative",children:[c.jsx("div",{className:"absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 transition-colors group-focus-within:text-primary-500",children:r}),c.jsx("input",{type:e,required:!0,className:"block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-800 font-bold focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all placeholder:opacity-30 text-sm",placeholder:n,value:s,onChange:o=>i(o.target.value)})]})]})}function BA({onBack:t,initialMode:e="owner"}){const[n,r]=$.useState(e),[s,i]=$.useState(""),[o,l]=$.useState(""),[u,h]=$.useState(""),[m,p]=$.useState(""),[v,S]=$.useState(null),[I,P]=$.useState(!1),[D,T]=$.useState(!1),x=async N=>{N.preventDefault(),P(!0),S(null);try{const M=(await wC(Lo,s,o)).user;await SC(M,{displayName:u});const U=be(Re,`usuarios/${M.uid}`),w={id:M.uid,nombre:u,email:s,telefono:m,rol:n==="owner"?"dueño":"pasajero",fechaRegistro:Date.now(),status:"active"};if(await Sh(U,w),n==="owner"){const y=be(Re,`dueños/${M.uid}`);await Sh(y,"pendiente")}T(!0)}catch(j){j.code==="auth/email-already-in-use"?S("Este correo ya está registrado en Ruta-Go."):S("Ocurrió un error al procesar tu solicitud."),console.error(j)}finally{P(!1)}};return D?c.jsx("div",{className:"min-h-screen bg-secondary-900 flex items-center justify-center p-4",children:c.jsxs("div",{className:"max-w-md w-full bg-white rounded-[3rem] shadow-2xl p-12 text-center space-y-8 animate-in zoom-in-95 duration-500",children:[c.jsx("div",{className:"w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center text-green-600 mx-auto animate-bounce",children:c.jsx(bn,{size:40})}),c.jsxs("div",{className:"space-y-4",children:[c.jsx("h2",{className:"text-3xl font-black text-slate-800 tracking-tight",children:n==="owner"?"¡Solicitud Recibida!":"¡Bienvenido a Ruta-Go!"}),c.jsxs("p",{className:"text-slate-500 font-medium leading-relaxed",children:["Hola ",c.jsx("span",{className:"text-primary-500 font-bold",children:u}),", tu cuenta ha sido creada exitosamente."]}),n==="owner"?c.jsx("div",{className:"p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider",children:"Nuestro equipo administrativo activará tu dashboard en breve."}):c.jsx("div",{className:"p-4 bg-primary-50 rounded-2xl border border-primary-100 text-xs font-bold text-primary-600 uppercase tracking-wider",children:"Ya puedes iniciar sesión y reservar tu primer viaje."})]}),c.jsx("button",{onClick:t,className:"w-full py-4 bg-secondary-900 text-white font-black rounded-2xl shadow-xl hover:bg-black transition-all active:scale-95 uppercase tracking-widest text-sm",children:"Ir al Inicio"})]})}):c.jsxs("div",{className:"min-h-screen bg-secondary-900 flex flex-col lg:flex-row overflow-hidden",children:[c.jsxs("div",{className:"hidden lg:flex lg:w-1/2 bg-gradient-to-br from-secondary-900 to-slate-800 p-20 flex-col justify-between relative",children:[c.jsx("div",{className:"absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none",children:n==="owner"?c.jsx(So,{size:600,className:"text-white absolute -right-20 -bottom-20 rotate-12"}):c.jsx(zr,{size:600,className:"text-white absolute -right-20 -bottom-20 rotate-12"})}),c.jsxs("div",{className:"relative z-10 flex items-center gap-3",children:[c.jsx("img",{src:"/assets/logo_icon.png",alt:"Ruta-Go Logo",className:"w-12 h-12 object-contain"}),c.jsx("span",{className:"text-3xl font-black tracking-tighter text-white",children:"Ruta-Go"})]}),c.jsxs("div",{className:"relative z-10 space-y-8",children:[c.jsxs("h2",{className:"text-6xl font-black text-white leading-tight tracking-tight",children:[n==="owner"?"Únete a la":"Viaja con"," ",c.jsx("br",{}),c.jsx("span",{className:"text-primary-500 text-7xl italic",children:"revolución"})," ",c.jsx("br",{}),n==="owner"?"del transporte.":"del Huila."]}),c.jsx("div",{className:"flex items-center gap-4 text-white/50 font-bold uppercase tracking-widest text-xs border-l-4 border-primary-500 pl-6",children:n==="owner"?"Gestión de flota, contabilidad en vivo y control operativo total.":"Reservas en tiempo real, puntos de fidelidad y la mejor experiencia."})]}),c.jsx("div",{className:"relative z-10 text-white/30 text-[10px] font-black uppercase tracking-[0.3em]",children:"ChopCode Solutions • Engineering for Productivity"})]}),c.jsxs("div",{className:"flex-1 bg-white p-6 lg:p-20 flex flex-col justify-center relative animate-in slide-in-from-right-4 duration-500",children:[c.jsx("button",{onClick:t,className:"absolute top-8 left-8 lg:left-20 p-3 text-slate-400 hover:text-primary-500 hover:bg-slate-50 rounded-full transition-all group",children:c.jsx($o,{size:24,className:"group-hover:-translate-x-1 transition-transform"})}),c.jsxs("div",{className:"max-w-md mx-auto w-full space-y-10",children:[c.jsxs("div",{className:"space-y-4",children:[c.jsxs("div",{className:"space-y-1",children:[c.jsx("h3",{className:"text-3xl font-black text-slate-800 tracking-tight",children:n==="owner"?"Crea tu cuenta de Socio":"Registro de Pasajero"}),c.jsx("p",{className:"text-slate-400 font-bold text-[10px] uppercase tracking-widest",children:n==="owner"?"Registra tus datos para afiliar tu flota":"Únete gratis y reserva tus viajes en segundos"})]}),c.jsxs("div",{className:"flex p-1 bg-slate-100 rounded-2xl",children:[c.jsxs("button",{onClick:()=>r("passenger"),className:`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${n==="passenger"?"bg-white text-primary-500 shadow-lg shadow-slate-200":"text-slate-400 hover:text-slate-600"}`,children:[c.jsx(zr,{size:14})," Soy Pasajero"]}),c.jsxs("button",{onClick:()=>r("owner"),className:`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${n==="owner"?"bg-white text-secondary-900 shadow-lg shadow-slate-200":"text-slate-400 hover:text-slate-600"}`,children:[c.jsx(So,{size:14})," Soy Socio"]})]})]}),c.jsxs("form",{onSubmit:x,className:"space-y-6",children:[c.jsx(Ua,{label:"Nombre Completo",placeholder:"Ej: Juan Pérez",icon:c.jsx(M_,{size:18}),value:u,onChange:h,required:!0}),c.jsx(Ua,{label:"Correo Electrónico",type:"email",placeholder:"tu@email.com",icon:c.jsx(Bo,{size:18}),value:s,onChange:i,required:!0}),c.jsx(Ua,{label:"Teléfono / WhatsApp",placeholder:"321 000 0000",icon:c.jsx(O_,{size:18}),value:m,onChange:p,required:!0}),c.jsx(Ua,{label:"Contraseña",type:"password",placeholder:"••••••••",icon:c.jsx(A_,{size:18}),value:o,onChange:l,required:!0}),v&&c.jsxs("div",{className:"p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-[10px] font-black uppercase flex items-center gap-3 animate-shake",children:[c.jsx("div",{className:"w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shrink-0"}),v]}),c.jsx("button",{type:"submit",disabled:I,className:`w-full text-white font-black py-5 rounded-2xl shadow-2xl transition-all transform active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed text-sm uppercase tracking-widest ${n==="owner"?"bg-secondary-900 hover:bg-black shadow-slate-900/30":"bg-primary-500 hover:bg-orange-600 shadow-primary-500/30"}`,children:I?c.jsx(Ur,{className:"animate-spin",size:20}):n==="owner"?"Enviar Solicitud de Socio":"Crear mi Cuenta de Pasajero"})]}),c.jsx("p",{className:"text-center text-[10px] text-slate-300 font-black uppercase tracking-[0.2em]",children:"Ruta-Go Portal © 2026"})]})]})]})}function Ua({label:t,value:e,onChange:n,type:r="text",placeholder:s,icon:i,required:o=!1}){return c.jsxs("div",{className:"space-y-1.5 group",children:[c.jsx("label",{className:"text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-primary-500",children:t}),c.jsxs("div",{className:"relative",children:[c.jsx("div",{className:"absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 transition-colors group-focus-within:text-primary-500",children:i}),c.jsx("input",{type:r,required:o,placeholder:s,className:"w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all placeholder:opacity-30 text-sm",value:e,onChange:l=>n(l.target.value)})]})]})}function HA({onBack:t}){return c.jsxs("div",{className:"min-h-screen bg-slate-50 font-sans selection:bg-primary-100",children:[c.jsx("nav",{className:"bg-white border-b border-slate-200 sticky top-0 z-50",children:c.jsxs("div",{className:"max-w-4xl mx-auto px-6 h-20 flex items-center gap-4",children:[c.jsx("button",{onClick:t,className:"p-2 text-slate-400 hover:text-primary-500 hover:bg-slate-50 rounded-full transition-all",children:c.jsx($o,{size:24})}),c.jsx("h1",{className:"text-xl font-black text-secondary-900 tracking-tight",children:"Términos y Condiciones"})]})}),c.jsxs("main",{className:"max-w-4xl mx-auto px-6 py-16 space-y-12",children:[c.jsxs("section",{className:"bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 space-y-8 text-justify",children:[c.jsxs("div",{className:"flex items-center gap-4 border-b border-slate-100 pb-6",children:[c.jsx("div",{className:"w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-500 shadow-inner",children:c.jsx(V2,{size:28})}),c.jsxs("div",{children:[c.jsx("p",{className:"text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]",children:"Acuerdo Legal"}),c.jsx("h2",{className:"text-2xl font-black text-slate-800 tracking-tight",children:"Reglas de Operación Ruta-Go"})]})]}),c.jsx("p",{className:"text-slate-600 leading-relaxed italic",children:"Versión 1.4.0 Stable | Vigentes desde el 16 de julio de 2026. Al utilizar la plataforma (App o Web), usted acepta estos términos."}),c.jsxs("div",{className:"space-y-6",children:[c.jsx("h3",{className:"text-lg font-black text-secondary-900 flex items-center gap-2 italic",children:"1. Naturaleza del Servicio"}),c.jsxs("p",{className:"text-slate-600 leading-relaxed",children:["Ruta-Go es un intermediario tecnológico para la optimización del transporte intermunicipal. Actuamos como un motor de gestión de cupos y horarios.",c.jsx("strong",{className:"text-secondary-900",children:" Chop Code Solutions no es una empresa de transportes"})," ni posee flota vehicular propia."]}),c.jsx("h3",{className:"text-lg font-black text-secondary-900 flex items-center gap-2 italic",children:"2. Responsabilidad de Socios y Dueños"}),c.jsx("p",{className:"text-slate-600 leading-relaxed",children:"Los usuarios registrados con rol de Socio/Dueño de Flota se comprometen a utilizar los datos del portal administrativo con fines estrictamente operativos. La información sobre pasajeros, ingresos y conductores es confidencial y su mal uso será motivo de expulsión inmediata."}),c.jsx("h3",{className:"text-lg font-black text-secondary-900 flex items-center gap-2 italic",children:"3. Compromisos de Seguridad"}),c.jsx("p",{className:"text-slate-600 leading-relaxed",children:"Es responsabilidad del transportador garantizar que la información técnica del vehículo (placa y capacidad) sea veraz y se encuentre sincronizada con la base de datos de Ruta-Go para evitar sobreventa de cupos."}),c.jsxs("div",{className:"p-6 bg-red-50 rounded-2xl border border-red-100 flex items-start gap-4",children:[c.jsx(H2,{className:"text-red-500 shrink-0",size:24}),c.jsx("p",{className:"text-xs text-red-700 font-bold leading-relaxed uppercase",children:"Aviso Legal: Chop Code Solutions no asume responsabilidad por fallas mecánicas, accidentes, retrasos físicos o disputas de precios fuera de lo estipulado en la plataforma."})]}),c.jsx("h3",{className:"text-lg font-black text-secondary-900 flex items-center gap-2 italic",children:"4. Propiedad Intelectual"}),c.jsxs("p",{className:"text-slate-600 leading-relaxed",children:["Todo el código fuente, motores de reserva (Seat/Reservation Engine), logotipos y manuales técnicos son propiedad exclusiva de ",c.jsx("strong",{className:"text-primary-500",children:"Chop Code Solutions"}),"."]})]})]}),c.jsx("footer",{className:"text-center pb-10",children:c.jsx("p",{className:"text-[10px] text-slate-300 font-black uppercase tracking-[0.3em]",children:"ChopCode Solutions © 2026 • Nátaga - La Plata, Huila"})})]})]})}function WA({onBack:t}){return c.jsxs("div",{className:"min-h-screen bg-slate-50 font-sans selection:bg-primary-100",children:[c.jsx("nav",{className:"bg-white border-b border-slate-200 sticky top-0 z-50",children:c.jsxs("div",{className:"max-w-4xl mx-auto px-6 h-20 flex items-center gap-4",children:[c.jsx("button",{onClick:t,className:"p-2 text-slate-400 hover:text-primary-500 hover:bg-slate-50 rounded-full transition-all",children:c.jsx($o,{size:24})}),c.jsx("h1",{className:"text-xl font-black text-secondary-900 tracking-tight",children:"Política de Privacidad"})]})}),c.jsxs("main",{className:"max-w-4xl mx-auto px-6 py-16 space-y-12 text-justify",children:[c.jsxs("section",{className:"bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 space-y-8",children:[c.jsxs("div",{className:"flex items-center gap-4 border-b border-slate-100 pb-6",children:[c.jsx("div",{className:"w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 shadow-inner",children:c.jsx(L_,{size:28})}),c.jsxs("div",{children:[c.jsx("p",{className:"text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]",children:"Protección de Datos"}),c.jsx("h2",{className:"text-2xl font-black text-slate-800 tracking-tight",children:"Habeas Data & Seguridad"})]})]}),c.jsxs("p",{className:"text-slate-600 leading-relaxed italic",children:["Estamos comprometidos con la seguridad de sus datos en cumplimiento de la ",c.jsx("strong",{className:"text-secondary-900",children:"Ley 1581 de 2012"})," de la República de Colombia."]}),c.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[c.jsx(cv,{icon:c.jsx(D2,{size:18}),title:"Operación",desc:"Recolectamos nombres, correos y placas para la gestión logística."}),c.jsx(cv,{icon:c.jsx(Bo,{size:18}),title:"Contacto",desc:"El teléfono es esencial para la coordinación real entre chofer y pasajero."})]}),c.jsxs("div",{className:"space-y-6",children:[c.jsx("h3",{className:"text-lg font-black text-secondary-900 italic border-l-4 border-primary-500 pl-4",children:"3. Eliminación de Datos (Derecho al Olvido)"}),c.jsxs("div",{className:"bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4",children:[c.jsx("p",{className:"text-slate-600 text-sm leading-relaxed",children:"En cumplimiento con las políticas de Google Play, proporcionamos métodos claros para borrar su cuenta:"}),c.jsxs("ul",{className:"space-y-3",children:[c.jsxs("li",{className:"flex gap-3 text-xs font-bold text-slate-500",children:[c.jsx("span",{className:"w-5 h-5 bg-white rounded-full flex items-center justify-center text-primary-500 shadow-sm shrink-0",children:"1"}),"Dentro de la App: Perfil > Solicitar borrar cuenta."]}),c.jsxs("li",{className:"flex gap-3 text-xs font-bold text-slate-500",children:[c.jsx("span",{className:"w-5 h-5 bg-white rounded-full flex items-center justify-center text-primary-500 shadow-sm shrink-0",children:"2"}),"Vía Email: Enviando solicitud a ",c.jsx("strong",{className:"text-secondary-900",children:"dazace94@gmail.com"}),"."]})]}),c.jsxs("div",{className:"p-4 bg-amber-50 rounded-xl flex items-center gap-3",children:[c.jsx(_c,{className:"text-amber-500",size:18}),c.jsx("p",{className:"text-[10px] text-amber-700 font-black uppercase",children:"Periodo de gracia: 30 días antes del borrado definitivo."})]})]}),c.jsx("h3",{className:"text-lg font-black text-secondary-900 italic border-l-4 border-primary-500 pl-4",children:"4. Seguridad y Segregación"}),c.jsxs("p",{className:"text-slate-600 leading-relaxed",children:["Implementamos una arquitectura de ",c.jsx("strong",{className:"text-secondary-900",children:"Segregación Total de Roles"}),". Los datos residen en infraestructuras lógicas independientes cifradas mediante protocolos de Firebase de última generación."]})]})]}),c.jsx("footer",{className:"text-center pb-10",children:c.jsx("p",{className:"text-[10px] text-slate-300 font-black uppercase tracking-[0.3em]",children:"ChopCode Solutions © 2026 • Privacidad Blindada"})})]})]})}function cv({icon:t,title:e,desc:n}){return c.jsxs("div",{className:"p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-2",children:[c.jsx("div",{className:"text-primary-500",children:t}),c.jsx("h4",{className:"font-black text-secondary-900 text-xs uppercase tracking-wider",children:e}),c.jsx("p",{className:"text-xs text-slate-500 leading-relaxed",children:n})]})}function GA({onBack:t}){return c.jsxs("div",{className:"min-h-screen bg-slate-50 font-sans selection:bg-primary-100",children:[c.jsx("nav",{className:"bg-white border-b border-slate-200 sticky top-0 z-50",children:c.jsxs("div",{className:"max-w-4xl mx-auto px-6 h-20 flex items-center gap-4",children:[c.jsx("button",{onClick:t,className:"p-2 text-slate-400 hover:text-primary-500 hover:bg-slate-50 rounded-full transition-all",children:c.jsx($o,{size:24})}),c.jsxs("div",{className:"flex items-center gap-2",children:[c.jsx("div",{className:"w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white font-black text-sm",children:"R"}),c.jsx("h1",{className:"text-xl font-black text-secondary-900 tracking-tight",children:"Manual de Usuario"})]})]})}),c.jsxs("main",{className:"max-w-4xl mx-auto px-6 py-12 space-y-16",children:[c.jsxs("header",{className:"text-center space-y-4",children:[c.jsx("div",{className:"w-20 h-20 bg-primary-500 rounded-3xl flex items-center justify-center text-white mx-auto shadow-2xl shadow-primary-500/20 transform -rotate-3",children:c.jsx(R2,{size:40})}),c.jsxs("div",{className:"space-y-2",children:[c.jsx("h2",{className:"text-4xl font-black text-slate-800 tracking-tight leading-none",children:"Centro de Aprendizaje"}),c.jsx("p",{className:"text-slate-500 font-medium text-lg italic",children:"Domina el ecosistema Ruta-Go en pocos pasos."})]})]}),c.jsxs("section",{className:"space-y-8",children:[c.jsxs("div",{className:"flex items-center gap-4 border-b border-slate-200 pb-4",children:[c.jsx("div",{className:"w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20",children:c.jsx(zr,{size:28})}),c.jsxs("div",{children:[c.jsx("h3",{className:"text-2xl font-black text-slate-800 tracking-tight",children:"1. Guía para Pasajeros (App Móvil)"}),c.jsx("p",{className:"text-sm text-slate-400 font-bold uppercase tracking-widest",children:"Reserva y viaja sin estrés"})]})]}),c.jsxs("div",{className:"space-y-6",children:[c.jsx(za,{num:"1",title:"Registro e Identidad",icon:c.jsx(G2,{}),desc:"Descarga la App en la Play Store. Regístrate con tu correo o usa Google para entrar instantáneamente. Tu número de teléfono es vital para que el conductor te contacte si hay algún retraso."}),c.jsx(za,{num:"2",title:"Selección de Trayecto",icon:c.jsx(j_,{}),desc:"En el Dashboard principal, verás las pestañas 'Nátaga -> La Plata' y 'La Plata -> Nátaga'. Elige tu destino y verás la lista de horarios disponibles."}),c.jsx(za,{num:"3",title:"Elige tu Asiento",icon:c.jsx(F2,{}),desc:"Al tocar un horario, se abrirá el mapa del vehículo. Los asientos verdes están libres. Toca el que prefieras y se tornará naranja. ¡Tú tienes el control de tu comodidad!"}),c.jsx(za,{num:"4",title:"Confirmación y Tiquete",icon:c.jsx(Sf,{}),desc:"Revisa el resumen de tu reserva y confirma. Se generará un tiquete digital con un código único. No necesitas imprimirlo; muéstralo desde tu celular al abordar."})]})]}),c.jsxs("section",{className:"space-y-8",children:[c.jsxs("div",{className:"flex items-center gap-4 border-b border-slate-200 pb-4",children:[c.jsx("div",{className:"w-14 h-14 bg-primary-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary-500/20",children:c.jsx(Xr,{size:28})}),c.jsxs("div",{children:[c.jsx("h3",{className:"text-2xl font-black text-slate-800 tracking-tight",children:"2. Guía para Conductores (App Móvil)"}),c.jsx("p",{className:"text-sm text-slate-400 font-bold uppercase tracking-widest",children:"Optimización de ruta y ventas"})]})]}),c.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8",children:[c.jsx(uv,{title:"Gestión de Planilla",icon:c.jsx(vc,{className:"text-primary-500"}),points:["Visualiza tus horarios asignados en la pantalla de inicio.","Usa el botón (+) para registrar pasajeros que abordan en la calle (Venta Física).","El inventario se sincroniza en milisegundos para evitar sobreventa."]}),c.jsx(uv,{title:"Validación de Abordaje",icon:c.jsx(O2,{className:"text-green-500"}),points:["En 'Reservas Pendientes' verás a quienes reservaron por la App.","Toca 'Confirmar Abordaje' cuando el pasajero suba al bus.","Esto asegura que el cupo se marque como 'Finalizado' y se sume a tus ingresos."]})]})]}),c.jsxs("section",{className:"space-y-8",children:[c.jsxs("div",{className:"flex items-center gap-4 border-b border-slate-200 pb-4",children:[c.jsx("div",{className:"w-14 h-14 bg-secondary-900 rounded-2xl flex items-center justify-center text-white shadow-lg",children:c.jsx(P2,{size:28})}),c.jsxs("div",{children:[c.jsx("h3",{className:"text-2xl font-black text-slate-800 tracking-tight",children:"3. Guía para Socios (Portal Web)"}),c.jsx("p",{className:"text-sm text-slate-400 font-bold uppercase tracking-widest",children:"Inteligencia de negocios y activos"})]})]}),c.jsxs("div",{className:"bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl space-y-10",children:[c.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-12",children:[c.jsxs("div",{className:"space-y-4",children:[c.jsxs("div",{className:"flex items-center gap-3",children:[c.jsx(So,{className:"text-primary-500"}),c.jsx("h4",{className:"font-black text-slate-800 uppercase tracking-tight",children:"Monitoreo Financiero"})]}),c.jsx("p",{className:"text-slate-500 leading-relaxed text-sm",children:"Desde tu Dashboard puedes ver el recaudo bruto de toda tu flota en tiempo real. El sistema suma automáticamente los tiquetes confirmados por tus conductores."})]}),c.jsxs("div",{className:"space-y-4",children:[c.jsxs("div",{className:"flex items-center gap-3",children:[c.jsx(xc,{className:"text-blue-500"}),c.jsx("h4",{className:"font-black text-slate-800 uppercase tracking-tight",children:"Vinculación de Personal"})]}),c.jsx("p",{className:"text-slate-500 leading-relaxed text-sm",children:"Para asignar un conductor a tu bus, usa el buscador por Email. Esto creará una relación atómica que permite al chofer operar el vehículo bajo tu supervisión."})]})]}),c.jsxs("div",{className:"p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-4",children:[c.jsx(W2,{className:"text-primary-500 shrink-0",size:24}),c.jsxs("p",{className:"text-xs text-slate-600 font-medium leading-relaxed",children:[c.jsx("strong",{className:"text-secondary-900",children:"Aislamiento Comercial:"})," Ningún otro socio puede ver tus ingresos o la ubicación de tus conductores. Tu información financiera está cifrada y blindada por tu ID de dueño."]})]})]})]}),c.jsxs("section",{className:"bg-red-50 p-8 md:p-10 rounded-[2.5rem] border border-red-100 space-y-6",children:[c.jsxs("div",{className:"flex items-center gap-4",children:[c.jsx("div",{className:"w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600",children:c.jsx(_c,{size:24})}),c.jsx("h3",{className:"text-xl font-black text-red-900",children:"Derecho al Olvido (Eliminar Cuenta)"})]}),c.jsxs("div",{className:"space-y-4",children:[c.jsx("p",{className:"text-red-700/80 text-sm leading-relaxed font-medium",children:"Si deseas retirar tus datos del ecosistema Ruta-Go, el proceso es autónomo e irreversible tras el plazo de gracia:"}),c.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[c.jsx("div",{className:"bg-white/50 p-4 rounded-2xl text-xs font-bold text-red-900 border border-red-200/50",children:"1. Ve a Perfil > Editar Perfil > Solicitar borrar cuenta."}),c.jsx("div",{className:"bg-white/50 p-4 rounded-2xl text-xs font-bold text-red-900 border border-red-200/50",children:"2. Tus datos entran en periodo de gracia por 30 días."})]})]})]}),c.jsxs("footer",{className:"text-center pb-10 space-y-6",children:[c.jsxs("div",{className:"flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 border-t border-slate-200 pt-10",children:[c.jsxs("div",{className:"flex items-center gap-2",children:[c.jsx(bn,{size:16,className:"text-green-500"}),c.jsx("span",{className:"text-[10px] font-black text-slate-400 uppercase tracking-widest",children:"Sincronización Realtime"})]}),c.jsxs("div",{className:"flex items-center gap-2",children:[c.jsx(bn,{size:16,className:"text-green-500"}),c.jsx("span",{className:"text-[10px] font-black text-slate-400 uppercase tracking-widest",children:"Habeas Data OK"})]})]}),c.jsx("p",{className:"text-[10px] text-slate-300 font-black uppercase tracking-[0.3em]",children:"ChopCode Solutions © 2026 • Huila, Colombia"})]})]})]})}function za({num:t,title:e,desc:n,icon:r}){return c.jsxs("div",{className:"flex gap-6 group",children:[c.jsxs("div",{className:"flex flex-col items-center",children:[c.jsx("div",{className:"w-10 h-10 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center font-black text-slate-400 group-hover:border-primary-500 group-hover:text-primary-500 transition-all shadow-sm",children:t}),c.jsx("div",{className:"flex-1 w-0.5 bg-slate-200 my-2 group-last:hidden"})]}),c.jsxs("div",{className:"pb-10 space-y-2",children:[c.jsxs("div",{className:"flex items-center gap-3",children:[c.jsx("div",{className:"text-slate-300 group-hover:text-primary-500 transition-colors",children:r}),c.jsx("h4",{className:"text-lg font-black text-slate-800 uppercase tracking-tight",children:e})]}),c.jsx("p",{className:"text-slate-500 leading-relaxed text-sm max-w-2xl",children:n})]})]})}function uv({title:t,icon:e,points:n}){return c.jsxs("div",{className:"bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 space-y-6",children:[c.jsxs("div",{className:"flex items-center gap-3 border-b border-slate-50 pb-4",children:[e,c.jsx("h4",{className:"font-black text-slate-800 uppercase tracking-tight",children:t})]}),c.jsx("ul",{className:"space-y-4",children:n.map((r,s)=>c.jsxs("li",{className:"flex gap-3 text-sm text-slate-500 leading-relaxed",children:[c.jsx("span",{className:"w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 shrink-0"}),r]},s))})]})}function qA({isOpen:t,onClose:e,activeTab:n,setActiveTab:r,role:s}){const i=()=>TC(Lo),l=[{id:"overview",label:"Vista General",icon:c.jsx(P_,{size:20}),roles:["ADMIN","OWNER","DRIVER","PASSENGER"]},{id:"history",label:"Historial",icon:c.jsx(kf,{size:20}),roles:["ADMIN","OWNER","DRIVER","PASSENGER"]},{id:"drivers",label:"Conductores",icon:c.jsx(Xr,{size:20}),roles:["ADMIN","OWNER"]},{id:"users",label:"Usuarios",icon:c.jsx(zr,{size:20}),roles:["ADMIN"]},{id:"schedules",label:"Horarios",icon:c.jsx(vc,{size:20}),roles:["ADMIN","OWNER"]},{id:"profile",label:"Mi Perfil",icon:c.jsx(j2,{size:20}),roles:["ADMIN","OWNER","DRIVER","PASSENGER"]}].filter(u=>u.roles.includes(s==null?void 0:s.type));return c.jsxs(c.Fragment,{children:[t&&c.jsx("div",{className:"fixed inset-0 bg-secondary-900/60 backdrop-blur-sm z-40 lg:hidden",onClick:e}),c.jsxs("aside",{className:`
        fixed inset-y-0 left-0 z-50 w-72 bg-secondary-900 text-white flex flex-col shadow-2xl transition-transform duration-300
        lg:relative lg:translate-x-0 lg:z-20
        ${t?"translate-x-0":"-translate-x-full"}
      `,children:[c.jsxs("div",{className:"p-8 flex items-center justify-between",children:[c.jsxs("div",{className:"flex items-center gap-3",children:[c.jsx("img",{src:"/assets/logo_icon.png",alt:"Ruta-Go",className:"w-10 h-10 object-contain drop-shadow-md"}),c.jsxs("div",{className:"flex flex-col leading-tight text-left",children:[c.jsx("span",{className:"text-lg font-bold tracking-tight",children:"Ruta-Go"}),c.jsx("span",{className:"text-[10px] text-primary-500 font-bold tracking-widest uppercase opacity-80",children:(s==null?void 0:s.type)==="ADMIN"?"Admin Maestro":(s==null?void 0:s.type)==="OWNER"?"Panel Dueños":(s==null?void 0:s.type)==="DRIVER"?"Panel Conductor":"Portal Pasajero"})]})]}),c.jsx("button",{onClick:e,className:"lg:hidden p-2 text-white/50 hover:text-white",children:c.jsx(wc,{size:20})})]}),c.jsx("nav",{className:"flex-1 px-4 py-4 space-y-1 overflow-y-auto text-left",children:l.map(u=>c.jsx(KA,{icon:u.icon,label:u.label,active:n===u.id,onClick:()=>{r(u.id),window.innerWidth<1024&&e()}},u.id))}),c.jsx("div",{className:"p-4 border-t border-white/5 space-y-1 text-left",children:c.jsxs("button",{onClick:i,className:"w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all font-bold text-xs uppercase tracking-widest",children:[c.jsx(L2,{size:18})," Salir del Portal"]})})]})]})}function KA({icon:t,label:e,active:n,onClick:r}){return c.jsxs("button",{onClick:r,className:`
        w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 group
        ${n?"bg-primary-500 text-white shadow-xl shadow-primary-500/20":"text-white/50 hover:bg-white/5 hover:text-white"}
      `,children:[c.jsx("span",{className:`${n?"scale-110":"group-hover:scale-110"} transition-transform`,children:t}),c.jsx("span",{className:"font-bold text-xs uppercase tracking-widest",children:e})]})}function YA({title:t,userEmail:e,onMenuClick:n,role:r}){const s=(r==null?void 0:r.type)==="ADMIN";r==null||r.type;const i=!(r!=null&&r.type);return c.jsxs("header",{className:"h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 shrink-0 z-30",children:[c.jsxs("div",{className:"flex items-center gap-4",children:[c.jsx("button",{onClick:n,className:"lg:hidden p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-all active:scale-90",children:c.jsx(M2,{size:24})}),c.jsx("h2",{className:"text-xl lg:text-2xl font-black text-slate-800 tracking-tight truncate max-w-[200px] md:max-w-none",children:i?"Verificando...":t})]}),c.jsxs("div",{className:"flex items-center gap-3",children:[c.jsxs("div",{className:"text-right hidden sm:block",children:[c.jsx("p",{className:"text-[11px] font-black text-slate-700 leading-none truncate max-w-[150px]",children:e}),c.jsx("p",{className:`text-[9px] font-bold uppercase tracking-tighter mt-1 ${i?"text-slate-300":s?"text-primary-500":(r==null?void 0:r.type)==="DRIVER"?"text-amber-500":(r==null?void 0:r.type)==="PASSENGER"?"text-green-500":"text-blue-500"}`,children:i?"Cargando Perfil":s?"Sesión Root":(r==null?void 0:r.type)==="OWNER"?"Sesión Dueño":(r==null?void 0:r.type)==="DRIVER"?"Sesión Conductor":"Sesión Pasajero"})]}),c.jsx("div",{className:`w-10 h-10 lg:w-11 lg:h-11 rounded-xl flex items-center justify-center text-white font-black shadow-lg text-sm transition-colors duration-500 ${i?"bg-slate-200 shadow-none":s?"bg-primary-500 shadow-primary-500/20":(r==null?void 0:r.type)==="DRIVER"?"bg-amber-500 shadow-amber-500/20":(r==null?void 0:r.type)==="PASSENGER"?"bg-green-600 shadow-green-500/20":"bg-blue-600 shadow-blue-500/20"}`,children:e==null?void 0:e.substring(0,2).toUpperCase()})]})]})}function Oi({label:t,value:e,icon:n,trend:r}){return c.jsxs("div",{className:"bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40",children:[c.jsx("div",{className:"mb-4 bg-slate-50 w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center scale-90 md:scale-100 origin-left",children:n}),c.jsx("p",{className:"text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-widest",children:t}),c.jsxs("div",{className:"flex items-baseline flex-wrap gap-2 mt-1",children:[c.jsx("h4",{className:"text-2xl md:text-3xl font-black text-slate-800 tracking-tighter",children:e}),c.jsx("span",{className:"text-[9px] md:text-[10px] font-bold text-green-500 uppercase",children:r})]})]})}function dv({driver:t,onEdit:e}){t.status;const n=t.status==="blocked",r=t.horariosAsignados&&t.horariosAsignados.length>0,s=t.status==="inactive"||!r&&!n;return c.jsxs("div",{className:"bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex gap-4 group relative",children:[c.jsx("div",{className:`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-colors ${n?"bg-red-50 text-red-400":"bg-slate-100 text-slate-400"}`,children:c.jsx(Xr,{size:24})}),c.jsxs("div",{className:"flex-1 min-w-0",children:[c.jsxs("div",{className:"flex items-center justify-between mb-1 gap-2 pr-10",children:[c.jsx("h4",{className:"font-bold text-slate-800 text-sm truncate leading-tight",children:t.nombre}),c.jsx("span",{className:`flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase shrink-0 ${n?"bg-red-100 text-red-600":s?"bg-amber-100 text-amber-600":"bg-green-100 text-green-600"}`,children:n?"Bloqueado":s?"Descanso":"En Ruta"})]}),c.jsxs("div",{className:"flex flex-col gap-1 mt-2",children:[c.jsxs("div",{className:"flex items-center gap-2 text-slate-400 text-[11px] font-medium",children:[c.jsx(So,{size:12,className:"text-slate-300"}),c.jsxs("span",{className:"text-slate-600 font-bold",children:["Placa: ",t.placaVehiculo||"N/A"]})]}),c.jsxs("div",{className:"p-2 bg-slate-50 rounded-lg border border-slate-100 mt-1",children:[c.jsx("p",{className:"text-[9px] text-slate-400 font-bold uppercase leading-none mb-1",children:"Turnos"}),c.jsx("p",{className:"text-[11px] text-slate-700 font-bold truncate",children:t.horariosAsignados?t.horariosAsignados.join(" | "):"Sin turnos hoy"})]})]})]}),c.jsx("button",{onClick:()=>e(t),className:"absolute top-4 right-4 p-2 text-slate-300 hover:text-primary-500 hover:bg-primary-50 rounded-full transition-all opacity-0 group-hover:opacity-100",title:"Editar Conductor",children:c.jsx(U2,{size:16})})]})}const sl={updateDriver:async(t,e)=>{const n=be(Re,`conductores/${t}`);try{return await B0(n,e),{success:!0}}catch(r){throw console.error("Error actualizando conductor:",r),r}},deleteDriver:async t=>{const e=be(Re,`conductores/${t}`);try{return await HR(e),{success:!0}}catch(n){throw console.error("Error eliminando conductor:",n),n}},getAllSchedules:async()=>{const t=be(Re,"horarios"),e=await hs(t);return e.exists()?Object.entries(e.val()).map(([n,r])=>({id:n,...r})):[]},registerDriverAndVehicle:async(t,e)=>{const n={};n[`conductores/${t.id}`]={...t,status:"active",fechaRegistro:Date.now()},n[`vehiculos/${e.placa}`]={...e,conductorId:t.id,estado:"activo"};try{return await B0(be(Re),n),{success:!0}}catch(r){throw console.error("Error en registro dual:",r),r}}};function QA({driver:t,onClose:e,onRefresh:n}){const[r,s]=$.useState(!1),[i,o]=$.useState([]),[l,u]=$.useState((t==null?void 0:t.horariosAsignados)||[]),[h,m]=$.useState({nombre:(t==null?void 0:t.nombre)||"",placaVehiculo:(t==null?void 0:t.placaVehiculo)||"",status:(t==null?void 0:t.status)||"active"});if($.useEffect(()=>{let I=!0;return(async()=>{try{const D=await sl.getAllSchedules();I&&o(D)}catch(D){console.error("Error cargando horarios:",D)}})(),()=>{I=!1}},[]),!t)return null;const p=I=>{u(P=>P.includes(I)?P.filter(D=>D!==I):[...P,I])},v=async I=>{I.preventDefault(),s(!0);try{await sl.updateDriver(t.id,{...h,horariosAsignados:l}),n&&n(),e()}catch(P){alert("Error al actualizar: "+P.message)}finally{s(!1)}},S=async()=>{if(window.confirm(`¿Seguro que deseas ELIMINAR a ${t.nombre}? Esta acción no se puede deshacer.`)){s(!0);try{await sl.deleteDriver(t.id),n&&n(),e()}catch(I){alert("Error al eliminar: "+I.message)}finally{s(!1)}}};return c.jsx("div",{className:"fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm transition-all animate-in fade-in duration-200",children:c.jsxs("div",{className:"bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-white/20",children:[c.jsxs("div",{className:"p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50",children:[c.jsxs("div",{children:[c.jsx("h3",{className:"text-2xl font-black text-slate-800 tracking-tight",children:"Editar Conductor"}),c.jsxs("p",{className:"text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1",children:["ID Operativo: ",t.id.substring(0,8)]})]}),c.jsx("button",{onClick:e,className:"p-2 text-slate-400 hover:text-primary-500 hover:bg-slate-100 rounded-full transition-all",children:c.jsx(wc,{size:24})})]}),c.jsxs("form",{onSubmit:v,className:"flex-1 overflow-y-auto p-8 space-y-8",children:[c.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8",children:[c.jsxs("div",{className:"space-y-5",children:[c.jsxs("h4",{className:"text-[10px] font-black text-primary-500 uppercase tracking-widest flex items-center gap-2",children:[c.jsx("div",{className:"w-1 h-3 bg-primary-500 rounded-full"})," Perfil Básico"]}),c.jsx(hv,{label:"Nombre Legal",value:h.nombre,onChange:I=>m({...h,nombre:I})}),c.jsx(hv,{label:"Placa Asignada",value:h.placaVehiculo,onChange:I=>m({...h,placaVehiculo:I.toUpperCase()})}),c.jsxs("div",{className:"space-y-1.5",children:[c.jsx("label",{className:"text-[10px] font-bold text-slate-400 uppercase tracking-tight ml-1",children:"Estado"}),c.jsxs("select",{className:"w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 appearance-none transition-all",value:h.status,onChange:I=>m({...h,status:I.target.value}),children:[c.jsx("option",{value:"active",children:"🟢 En Ruta (Activo)"}),c.jsx("option",{value:"inactive",children:"🟡 Descanso (Inactivo)"}),c.jsx("option",{value:"blocked",children:"🔴 Bloqueado (Sin Acceso)"})]})]})]}),c.jsxs("div",{className:"space-y-5",children:[c.jsxs("h4",{className:"text-[10px] font-black text-primary-500 uppercase tracking-widest flex items-center gap-2",children:[c.jsx(yc,{size:12})," Escalafón de Hoy"]}),c.jsx("div",{className:"bg-slate-50 rounded-[2rem] p-5 border border-slate-100 max-h-[300px] overflow-y-auto space-y-2 custom-scrollbar text-center",children:i.length>0?i.map(I=>c.jsxs("label",{className:"flex items-center gap-3 p-3.5 bg-white rounded-2xl border border-slate-100 hover:border-primary-500/40 cursor-pointer transition-all group",children:[c.jsx("input",{type:"checkbox",className:"w-5 h-5 rounded-lg border-slate-300 text-primary-500 focus:ring-primary-500/20 transition-all cursor-pointer",checked:l.includes(I.id),onChange:()=>p(I.id)}),c.jsxs("div",{className:"flex flex-col text-left",children:[c.jsx("span",{className:"text-xs font-black text-slate-800 leading-none",children:I.hora}),c.jsx("span",{className:"text-[9px] font-bold text-slate-400 uppercase mt-1 truncate max-w-[150px]",children:I.ruta})]})]},I.id)):c.jsxs("div",{className:"py-10 flex flex-col items-center gap-2 opacity-30",children:[c.jsx(Ur,{className:"animate-spin",size:24}),c.jsx("p",{className:"text-[10px] font-bold uppercase italic",children:"Sincronizando horarios..."})]})})]})]}),c.jsxs("div",{className:"p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-3",children:[c.jsx(T_,{className:"text-amber-500 shrink-0 mt-0.5",size:16}),c.jsx("p",{className:"text-[10px] text-amber-700 font-bold leading-relaxed uppercase",children:"Nota: La modificación de turnos es una acción de nivel administrador. Los cambios se reflejarán en la App del conductor inmediatamente."})]})]}),c.jsxs("div",{className:"p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between",children:[c.jsxs("button",{type:"button",disabled:r,onClick:S,className:"flex items-center gap-2 px-6 py-3.5 rounded-2xl text-red-500 hover:bg-red-50 transition-all font-black text-[10px] uppercase disabled:opacity-50 group",children:[c.jsx(_c,{size:16,className:"group-hover:scale-110 transition-transform"})," Eliminar"]}),c.jsxs("div",{className:"flex items-center gap-4",children:[c.jsx("button",{type:"button",onClick:e,className:"px-6 py-3.5 font-black text-[10px] text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors",children:"Cancelar"}),c.jsx("button",{onClick:v,disabled:r,className:"flex items-center gap-3 px-10 py-4 bg-primary-500 hover:bg-orange-600 text-white rounded-2xl shadow-xl shadow-primary-500/30 transition-all transform active:scale-95 font-black text-[10px] uppercase disabled:opacity-70",children:r?c.jsx(Ur,{className:"animate-spin",size:18}):c.jsxs(c.Fragment,{children:[c.jsx(D_,{size:18})," Guardar Cambios"]})})]})]})]})})}function hv({label:t,value:e,onChange:n}){return c.jsxs("div",{className:"space-y-1.5",children:[c.jsx("label",{className:"text-[10px] font-bold text-slate-400 uppercase tracking-tight ml-1",children:t}),c.jsx("input",{type:"text",required:!0,className:"w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all placeholder:opacity-30",value:e,onChange:r=>n(r.target.value)})]})}function XA({onClose:t,users:e,currentUser:n,role:r}){const[s,i]=$.useState(!1),[o,l]=$.useState(null),[u,h]=$.useState({email:"",placa:"",modelo:"",ano:new Date().getFullYear().toString(),capacidad:13,ownerId:(r==null?void 0:r.type)==="OWNER"?n.uid:""});$.useEffect(()=>{if(u.email.includes("@")){const p=e.find(v=>v.email.toLowerCase()===u.email.toLowerCase());l(p||null)}else l(null)},[u.email,e]);const m=async p=>{if(p.preventDefault(),!o){alert("⚠️ Error: El conductor debe registrarse primero en la App móvil con este correo.");return}i(!0);try{const v={id:o.id,nombre:o.nombre,email:o.email,telefono:o.telefono||"N/A",placaVehiculo:u.placa,vehiculoId:u.placa,horariosAsignados:[]},S={id:u.placa,placa:u.placa,modelo:u.modelo,ano:u.ano,capacidad:parseInt(u.capacidad),ownerId:u.ownerId,driverId:o.id};await sl.registerDriverAndVehicle(v,S),alert("✅ Conductor vinculado y vehículo registrado exitosamente."),t()}catch(v){alert("❌ Error: "+v.message)}finally{i(!1)}};return c.jsx("div",{className:"fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200",children:c.jsxs("div",{className:"bg-white w-full max-w-3xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]",children:[c.jsxs("div",{className:"p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50",children:[c.jsxs("div",{className:"flex items-center gap-4",children:[c.jsx("div",{className:"w-12 h-12 bg-primary-500 rounded-2xl flex items-center justify-center text-white shadow-lg",children:c.jsx(xc,{size:24})}),c.jsxs("div",{children:[c.jsx("h3",{className:"text-2xl font-black text-slate-800 tracking-tight",children:"Vincular Operador"}),c.jsx("p",{className:"text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1",children:"Gestión de Flota por Email"})]})]}),c.jsx("button",{onClick:t,className:"p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-all",children:c.jsx(wc,{size:24})})]}),c.jsx("form",{onSubmit:m,className:"flex-1 overflow-y-auto p-8 space-y-8",children:c.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-10",children:[c.jsxs("div",{className:"space-y-6",children:[c.jsxs("h4",{className:"text-[11px] font-black text-primary-500 uppercase tracking-widest flex items-center gap-2",children:[c.jsx("div",{className:"w-1.5 h-4 bg-primary-500 rounded-full"})," 1. Buscar Conductor"]}),c.jsxs("div",{className:"space-y-2",children:[c.jsx(ds,{label:"Correo Electrónico",placeholder:"conductor@gmail.com",type:"email",value:u.email,onChange:p=>h({...u,email:p}),required:!0}),c.jsxs("div",{className:`p-4 rounded-2xl border transition-all flex items-center gap-3 ${o?"bg-green-50 border-green-100 text-green-700":u.email.includes("@")?"bg-red-50 border-red-100 text-red-600":"bg-slate-50 border-slate-100 text-slate-400"}`,children:[o?c.jsx(bn,{size:18}):u.email.includes("@")?c.jsx(T_,{size:18}):c.jsx($2,{size:18}),c.jsxs("div",{className:"flex-1",children:[c.jsx("p",{className:"text-[10px] font-black uppercase tracking-tight",children:o?"Usuario Encontrado":u.email.includes("@")?"Usuario no registrado":"Esperando correo..."}),c.jsx("p",{className:"text-xs font-bold leading-none mt-1",children:o?o.nombre:u.email.includes("@")?"Dile que se registre en la App":"Escribe el email corporativo"})]})]})]}),o&&c.jsx("div",{className:"space-y-4 animate-in slide-in-from-top-2",children:c.jsxs("div",{className:"p-4 bg-slate-50 rounded-2xl border border-slate-100",children:[c.jsx("p",{className:"text-[10px] text-slate-400 font-black uppercase mb-1",children:"Teléfono Registrado"}),c.jsx("p",{className:"text-sm font-bold text-slate-700",children:o.telefono||"No proporcionado"})]})})]}),c.jsxs("div",{className:"space-y-6",children:[c.jsxs("h4",{className:"text-[11px] font-black text-secondary-900 uppercase tracking-widest flex items-center gap-2",children:[c.jsx("div",{className:"w-1.5 h-4 bg-secondary-900 rounded-full"})," 2. Datos del Bus"]}),c.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[c.jsx(ds,{label:"Placa",placeholder:"ABC-123",value:u.placa,onChange:p=>h({...u,placa:p.toUpperCase()}),required:!0}),c.jsx(ds,{label:"Año",type:"number",value:u.ano,onChange:p=>h({...u,ano:p}),required:!0})]}),c.jsx(ds,{label:"Modelo",placeholder:"Ej: Nissan Frontier",value:u.modelo,onChange:p=>h({...u,modelo:p}),required:!0}),c.jsx(ds,{label:"Capacidad",type:"number",value:u.capacidad,onChange:p=>h({...u,capacidad:p}),required:!0}),(r==null?void 0:r.type)==="ADMIN"&&c.jsx(ds,{label:"ID del Dueño (Opcional)",placeholder:"UID del dueño",value:u.ownerId,onChange:p=>h({...u,ownerId:p})})]})]})}),c.jsxs("div",{className:"p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-4",children:[c.jsx("button",{type:"button",onClick:t,className:"px-8 py-4 font-black text-[10px] text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-all",children:"Cancelar"}),c.jsx("button",{onClick:m,disabled:s||!o,className:"flex items-center gap-3 px-12 py-4 bg-secondary-900 hover:bg-black text-white rounded-2xl shadow-xl transition-all transform active:scale-95 font-black text-[10px] uppercase disabled:opacity-30 disabled:cursor-not-allowed",children:s?c.jsx(Ur,{className:"animate-spin",size:18}):c.jsxs(c.Fragment,{children:[c.jsx(D_,{size:18})," Vincular Conductor"]})})]})]})})}function ds({label:t,value:e,onChange:n,type:r="text",placeholder:s,required:i=!1}){return c.jsxs("div",{className:"space-y-1.5",children:[c.jsx("label",{className:"text-[10px] font-black text-slate-400 uppercase tracking-tight ml-1",children:t}),c.jsx("input",{type:r,required:i,placeholder:s,className:"w-full px-4 py-3.5 bg-white border border-slate-200 rounded-2xl font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all placeholder:opacity-40 text-sm",value:e,onChange:o=>n(o.target.value)})]})}function fv({user:t}){if(!t)return null;const e=t.solicitudBorrado===!0;return c.jsxs("div",{className:`bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex gap-4 group ${e?"opacity-60 grayscale-[0.5]":""}`,children:[c.jsx("div",{className:`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${e?"bg-red-50 text-red-400":"bg-blue-50 text-blue-500"}`,children:c.jsx(M_,{size:22})}),c.jsxs("div",{className:"flex-1 min-w-0",children:[c.jsxs("div",{className:"flex items-center justify-between mb-1 gap-2",children:[c.jsx("h4",{className:"font-bold text-slate-800 text-sm truncate leading-tight",children:t.nombre||t.name||"Usuario sin nombre"}),e?c.jsxs("span",{className:"flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-[9px] font-black uppercase shrink-0",children:[c.jsx(_c,{size:10})," Borrado"]}):c.jsx("span",{className:"flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 text-[9px] font-black uppercase shrink-0",children:"Activo"})]}),c.jsxs("div",{className:"flex flex-col gap-1 mt-1",children:[c.jsxs("div",{className:"flex items-center gap-2 text-slate-500 text-[11px]",children:[c.jsx(Bo,{size:12,className:"text-slate-300"}),c.jsx("span",{className:"truncate",children:t.email||"Sin correo"})]}),c.jsxs("div",{className:"flex items-center justify-between mt-1",children:[c.jsxs("div",{className:"flex items-center gap-2 text-slate-500 text-[11px]",children:[c.jsx(O_,{size:12,className:"text-slate-300"}),c.jsx("span",{children:t.telefono||t.phone||"N/A"})]}),c.jsxs("div",{className:"flex items-center gap-1 px-2 py-0.5 bg-amber-50 rounded-lg border border-amber-100",children:[c.jsx(b2,{size:10,className:"text-amber-500"}),c.jsxs("span",{className:"text-[10px] font-bold text-amber-700",children:[t.puntosGo||0," pts"]})]})]})]})]})]})}function Cp({schedules:t,drivers:e,role:n,onManage:r}){const i=(()=>{const o=new Date,l=o.getHours()*60+o.getMinutes();let u=null,h=1/0;return t.forEach(m=>{const[p,v]=m.hora.split(" ");let[S,I]=p.split(":").map(Number);v==="PM"&&S<12&&(S+=12),v==="AM"&&S===12&&(S=0);const D=S*60+I-l;D>0&&D<h&&(h=D,u=m.id)}),u})();return c.jsx("div",{className:"space-y-4 px-2",children:t.length>0?t.map(o=>c.jsx(JA,{schedule:o,drivers:e,role:n,onManage:r,isNext:o.id===i},o.id)):c.jsxs("div",{className:"py-20 text-center space-y-4 opacity-20",children:[c.jsx(yc,{size:48,className:"mx-auto"}),c.jsx("p",{className:"font-black uppercase tracking-widest text-xs",children:"Sin horarios disponibles"})]})})}function JA({schedule:t,drivers:e,role:n,onManage:r,isNext:s}){const[i,o]=t.hora.split(" "),l=t.asientosDisponibles||0,u=l===0&&(t.totalAsientos||0)>0;e.find(m=>m.id===t.conductorId);const h=t.conductorId===(n==null?void 0:n.uid);return c.jsx("div",{className:`card-navy rounded-[2.5rem] p-5 md:p-6 transition-all duration-500 group relative overflow-hidden ${s?"ring-2 ring-primary-500/50":""}`,children:c.jsxs("div",{className:"flex items-center gap-6",children:[c.jsx("div",{className:"relative flex-shrink-0",children:c.jsxs("div",{className:`w-20 h-20 rounded-full border-4 flex flex-col items-center justify-center transition-colors duration-500 ${s?"border-primary-500 shadow-[0_0_15px_rgba(255,109,0,0.3)]":"border-primary-500/30"}`,children:[c.jsx("span",{className:"text-lg font-black text-white leading-none",children:i}),c.jsx("span",{className:"text-[10px] font-black text-primary-500 uppercase mt-1",children:o})]})}),c.jsxs("div",{className:"flex-1 min-w-0 space-y-2",children:[c.jsx("h4",{className:"text-sm md:text-base font-black text-white tracking-tight truncate uppercase",children:t.ruta}),c.jsxs("div",{className:"space-y-1.5",children:[c.jsxs("div",{className:"flex items-center gap-2 text-navy-light",children:[c.jsx(Xr,{size:14,className:"text-primary-500"}),c.jsx("span",{className:"text-[11px] font-bold uppercase tracking-tight",children:u?"Agotado":`${l} disponibles`})]}),c.jsxs("div",{className:"flex items-center gap-2 text-primary-500 font-black",children:[c.jsx(q2,{size:14}),c.jsx("span",{className:"text-xs tracking-tighter",children:"$ 12.000 COP"})]})]}),c.jsxs("div",{className:"flex items-center gap-3 pt-1",children:[c.jsx("span",{className:`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${u?"bg-red-500/20 text-red-500":"bg-green-500/10 text-green-500 border border-green-500/20"}`,children:u?"Lleno":"Disponible"}),s&&c.jsx("span",{className:"bg-slate-700 text-white text-[8px] font-black uppercase px-2 py-1 rounded-md animate-pulse",children:"Siguiente"})]})]}),c.jsx("div",{className:"shrink-0",children:(h||(n==null?void 0:n.type)==="PASSENGER")&&c.jsx("button",{onClick:()=>r?r(t):null,className:"w-14 h-14 bg-primary-500 text-white rounded-full shadow-2xl shadow-primary-500/40 hover:bg-orange-600 transition-all transform active:scale-90 flex items-center justify-center group/btn",children:c.jsx(z2,{size:28,className:"group-hover/btn:rotate-90 transition-transform"})})})]})})}function ZA({schedule:t,onClose:e}){const[n,r]=$.useState(!0),[s,i]=$.useState({}),[o,l]=$.useState(!1);$.useEffect(()=>{if(!(t!=null&&t.id))return;const m=be(Re,`disponibilidadAsientos/${t.id}/asientosOcupados`),p=$n(m,v=>{v.exists()?i(v.val()):i({}),r(!1)});return()=>p()},[t]);const u=async m=>{if(o)return;l(!0);const p=s[m]===!0,v=be(Re,`disponibilidadAsientos/${t.id}`);try{await rP(v,S=>{if(S){S.asientosOcupados||(S.asientosOcupados={});const I=!p;S.asientosOcupados[m]=I;const P=S.asientosDisponibles||0;S.asientosDisponibles=I?Math.max(0,P-1):P+1}return S})}catch(S){console.error("Error toggling seat:",S)}finally{l(!1)}},h=Array.from({length:16},(m,p)=>(p+1).toString());return c.jsxs("div",{className:"fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10",children:[c.jsx("div",{className:"absolute inset-0 bg-secondary-900/80 backdrop-blur-md",onClick:e}),c.jsxs("div",{className:"relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]",children:[c.jsxs("div",{className:"p-8 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50",children:[c.jsxs("div",{className:"flex items-center gap-4",children:[c.jsx("div",{className:"w-12 h-12 bg-primary-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary-500/20",children:c.jsx(Xr,{size:24})}),c.jsxs("div",{children:[c.jsx("h3",{className:"text-xl font-black text-slate-800 uppercase tracking-tight",children:"Venta Física de Pasajes"}),c.jsxs("p",{className:"text-[10px] text-slate-400 font-bold uppercase tracking-widest",children:[t.hora," • ",t.ruta]})]})]}),c.jsx("button",{onClick:e,className:"p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all",children:c.jsx(wc,{size:24})})]}),c.jsx("div",{className:"flex-1 overflow-y-auto p-8 space-y-8",children:c.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8",children:[c.jsxs("div",{className:"space-y-6",children:[c.jsxs("div",{className:"flex items-center justify-between",children:[c.jsx("h4",{className:"text-xs font-black text-slate-400 uppercase tracking-widest",children:"Mapa de Asientos"}),c.jsxs("div",{className:"flex gap-4",children:[c.jsx(pv,{item:"Libre",color:"bg-green-100 border-green-200"}),c.jsx(pv,{item:"Vendido",color:"bg-orange-500 border-orange-600"})]})]}),c.jsx("div",{className:"bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100 relative",children:n?c.jsx("div",{className:"h-64 flex items-center justify-center",children:c.jsx(Ur,{className:"animate-spin text-primary-500",size:32})}):c.jsxs("div",{className:"grid grid-cols-4 gap-4",children:[c.jsx("div",{className:"col-start-4 bg-slate-200/50 rounded-xl h-10 flex items-center justify-center text-slate-400",children:c.jsx("div",{className:"w-6 h-6 rounded-full border-4 border-slate-300"})}),h.map(m=>c.jsx("button",{disabled:o,onClick:()=>u(m),className:`
                          h-12 rounded-xl border-b-4 font-black text-sm transition-all transform active:scale-90
                          ${s[m]===!0?"bg-primary-500 border-orange-700 text-white shadow-lg shadow-primary-500/20":"bg-white border-slate-200 text-slate-400 hover:border-green-400 hover:text-green-500"}
                        `,children:m},m))]})})]}),c.jsxs("div",{className:"space-y-6",children:[c.jsxs("div",{className:"bg-secondary-900 rounded-[2.5rem] p-8 text-white space-y-4",children:[c.jsxs("div",{className:"flex items-center gap-3",children:[c.jsx(xc,{className:"text-primary-500",size:20}),c.jsx("h4",{className:"font-black uppercase text-sm tracking-tight",children:"Instrucciones"})]}),c.jsxs("ul",{className:"space-y-3",children:[c.jsx(id,{text:"Toca un número para marcar el asiento como ocupado (Venta de calle)."}),c.jsx(id,{text:"Vuelve a tocar para liberarlo si el pasajero cancela."}),c.jsx(id,{text:"Los cambios son instantáneos para los pasajeros en la App."})]})]}),c.jsxs("div",{className:"p-6 bg-amber-50 rounded-[2rem] border border-amber-100 flex items-start gap-4",children:[c.jsx(R_,{className:"text-amber-500 shrink-0",size:20}),c.jsxs("p",{className:"text-[11px] text-amber-800 font-medium leading-relaxed",children:[c.jsx("strong",{children:"IMPORTANTE:"})," Asegúrate de cobrar el pasaje antes de marcar el asiento. Esta acción actualiza el inventario global de Ruta-Go."]})]})]})]})}),c.jsx("div",{className:"p-8 border-t border-slate-50 flex justify-end shrink-0",children:c.jsx("button",{onClick:e,className:"px-10 py-4 bg-secondary-900 text-white font-black rounded-2xl shadow-xl hover:bg-black transition-all active:scale-95 uppercase tracking-widest text-xs",children:"Finalizar Gestión"})})]})]})}function pv({item:t,color:e}){return c.jsxs("div",{className:"flex items-center gap-2",children:[c.jsx("div",{className:`w-3 h-3 rounded ${e} border`}),c.jsx("span",{className:"text-[9px] font-bold text-slate-400 uppercase tracking-tighter",children:t})]})}function id({text:t}){return c.jsxs("li",{className:"flex gap-3 text-xs text-white/60 leading-relaxed font-medium",children:[c.jsx(bn,{className:"text-primary-500 shrink-0",size:14}),t]})}const ej=t=>{const[e,n]=$.useState({type:null,uid:null,ownedPlates:[]}),[r,s]=$.useState({totalUsers:0,activeDrivers:0,totalVehicles:0,totalOwners:0,todayReservations:0,totalRevenue:0,confirmedReservations:0,canceledReservations:0,totalUserReservations:0,loading:!0}),[i,o]=$.useState([]),[l,u]=$.useState([]),[h,m]=$.useState([]),[p,v]=$.useState([]),[S,I]=$.useState({toLaPlata:{reservations:0,seats:0},toNataga:{reservations:0,seats:0}});return $.useEffect(()=>{if(!t)return;let P=!0;const D=[],T=async()=>{try{const N=await hs(be(Re,`admins/${t.uid}`));if(N.exists()&&N.val()===!0){P&&(n({type:"ADMIN",uid:t.uid,ownedPlates:[]}),x("ADMIN",[]));return}if((await hs(be(Re,`dueños/${t.uid}`))).exists()){const w=await hs(be(Re,"vehiculos"));let y=[];w.exists()&&(y=Object.entries(w.val()).filter(([_,k])=>k.ownerId===t.uid).map(([_,k])=>_)),P&&(n({type:"OWNER",uid:t.uid,ownedPlates:y}),x("OWNER",y));return}const M=await hs(be(Re,`conductores/${t.uid}`));if(M.exists()){if(P){const w=M.val(),y=w.placaVehiculo||w.vehiculoId;n({type:"DRIVER",uid:t.uid,ownedPlates:y?[y]:[]}),x("DRIVER",y?[y]:[])}return}(await hs(be(Re,`usuarios/${t.uid}`))).exists()?P&&(n({type:"PASSENGER",uid:t.uid,ownedPlates:[]}),x("PASSENGER",[])):P&&(n({type:null,uid:null,ownedPlates:[]}),s(w=>({...w,loading:!1})))}catch(N){console.error("Error resolviendo rol:",N),P&&s(j=>({...j,loading:!1}))}},x=(N,j)=>{const M=new Date,U=M.getTimezoneOffset()*6e4;if(new Date(M.getTime()-U).toISOString().split("T")[0],N==="ADMIN"){const C=$n(be(Re,"usuarios"),E=>{if(E.exists()){const K=Object.entries(E.val()).map(([fe,Je])=>({id:fe,...Je}));u(K),s(fe=>({...fe,totalUsers:K.filter(Je=>!Je.solicitudBorrado).length}))}});D.push(C);const b=$n(be(Re,"dueños"),E=>{if(E.exists()){const K=Object.keys(E.val()).length;s(fe=>({...fe,totalOwners:K}))}});D.push(b)}const w=$n(be(Re,"conductores"),C=>{if(C.exists()){const b=Object.entries(C.val()).map(([K,fe])=>({id:K,...fe})),E=N==="ADMIN"?b:N==="DRIVER"?b.filter(K=>K.id===t.uid):b.filter(K=>j.includes(K.placaVehiculo||K.vehiculoId));o(E),s(K=>({...K,activeDrivers:E.filter(fe=>fe.status==="active").length}))}});D.push(w);const y=$n(be(Re,"vehiculos"),C=>{if(C.exists()){const b=Object.entries(C.val()).map(([K,fe])=>({id:K,...fe})),E=N==="ADMIN"?b:b.filter(K=>K.ownerId===t.uid);s(K=>({...K,totalVehicles:E.length}))}});D.push(y);const _=$n(be(Re,"reservas"),C=>{let b=0,E=0,K=0,fe=0;const Je=[];C.exists()?(Object.entries(C.val()).forEach(([Te,L])=>{const B=L.vehiculoId||L.vehiculoPlaca,G=N==="ADMIN"||j.includes(B),ie=N==="DRIVER"&&L.conductorId===t.uid,Z=N==="PASSENGER"&&L.usuarioId===t.uid;if(G||ie||Z){Je.push({id:Te,...L});const oe=(L.estadoReserva||L.reservationStatus||"").toLowerCase();G&&(oe==="confirmada"||oe==="completada")&&(b+=Number(L.precio||L.price||0)),Z&&(fe++,oe==="confirmada"||oe==="completada"?E++:oe==="cancelada"&&K++)}}),P&&(v(Je),s(Te=>({...Te,totalRevenue:b,confirmedReservations:E,canceledReservations:K,totalUserReservations:fe,loading:!1})))):P&&(v([]),s(Te=>({...Te,loading:!1})))});D.push(_);const k=$n(be(Re,"horarios"),C=>{if(C.exists()){const b=Object.entries(C.val()).map(([L,B])=>({id:L,...B}));m(b);let E=0,K=0,fe=0,Je=0,Te=0;b.forEach(L=>{const B=L.ruta.toLowerCase(),G=L.totalAsientos||0,ie=L.asientosDisponibles||0,Z=Math.max(0,G-ie),oe=N==="DRIVER"&&L.conductorId===t.uid;B.includes("la plata")?(E+=Z,K+=ie):(B.includes("nátaga")||B.includes("nataga"))&&(fe+=Z,Je+=ie),N==="DRIVER"?oe&&(Te+=Z):Te+=Z}),P&&(I({toLaPlata:{reservations:E,seats:K},toNataga:{reservations:fe,seats:Je}}),s(L=>({...L,todayReservations:Te})))}});D.push(k)};return T(),()=>{P=!1,D.forEach(N=>N())}},[t]),{role:e,stats:r,drivers:i,users:l,schedules:h,reservations:p,routeStats:S}};function tj(){const[t,e]=$.useState(null),[n,r]=$.useState("landing"),[s,i]=$.useState("owner"),[o,l]=$.useState("overview"),[u,h]=$.useState(!0),[m,p]=$.useState(!1),[v,S]=$.useState(null),[I,P]=$.useState(!1),[D,T]=$.useState(null);$.useEffect(()=>{const _=IC(Lo,k=>{e(k),h(!1)});return()=>_()},[]);const{role:x,stats:N,drivers:j,users:M,schedules:U,reservations:w,routeStats:y}=ej(t);return u?c.jsxs("div",{className:"h-screen bg-[#061426] flex flex-col items-center justify-center gap-6",children:[c.jsxs("div",{className:"relative",children:[c.jsx("img",{src:"/assets/logo_icon.png",alt:"Ruta-Go",className:"w-16 h-16 object-contain animate-pulse"}),c.jsx(Ur,{className:"text-primary-500 animate-spin absolute -bottom-2 -right-2",size:24})]}),c.jsx("p",{className:"text-white/40 text-[10px] font-black uppercase tracking-widest animate-pulse",children:"Autenticando..."})]}):t?c.jsxs("div",{className:"flex h-screen bg-[#061426] text-white antialiased font-sans overflow-hidden",children:[c.jsx(qA,{isOpen:m,onClose:()=>p(!1),activeTab:o,setActiveTab:l,role:x}),c.jsxs("main",{className:"flex-1 flex flex-col min-w-0 overflow-hidden relative",children:[c.jsx(YA,{title:o==="overview"?x!=null&&x.type?x.type==="ADMIN"?"Panel Maestro":x.type==="OWNER"?"Dashboard Dueño":x.type==="DRIVER"?"Panel de Conductor":"Centro de Reservas":"Cargando...":o==="history"?"Historial de Reservas":o==="profile"?"Mi Perfil":o==="drivers"?"Conductores":o==="users"?"Pasajeros":o==="schedules"?"Planilla":"Dashboard",userEmail:t.email,onMenuClick:()=>p(!0),role:x}),c.jsx("div",{className:"flex-1 overflow-y-auto p-4 lg:p-8 bg-[#061426]",children:o==="overview"?(x==null?void 0:x.type)==="PASSENGER"?c.jsx(nj,{stats:N,routeStats:y,schedules:U,drivers:j,role:x}):(x==null?void 0:x.type)==="DRIVER"?c.jsx(rj,{stats:N,routeStats:y,schedules:U,drivers:j,reservations:w,role:x,onManage:_=>T(_)}):c.jsx(sj,{stats:N,routeStats:y,role:x}):o==="history"?c.jsx(lj,{reservations:w,role:x}):o==="profile"?c.jsx(aj,{user:t,role:x}):o==="drivers"?c.jsx(oj,{drivers:j,onEditDriver:_=>S(_),onAddDriver:()=>P(!0)}):o==="users"?c.jsx(ij,{users:M}):o==="schedules"?c.jsx(cj,{schedules:U,drivers:j,role:x,onManage:_=>T(_)}):null}),c.jsxs("div",{className:"lg:hidden h-20 bg-[#061929] border-t border-white/5 flex items-center justify-around px-6 shrink-0",children:[c.jsx(od,{icon:c.jsx(P_,{size:22}),active:o==="overview",onClick:()=>l("overview")}),c.jsx(od,{icon:c.jsx(kf,{size:22}),active:o==="history",onClick:()=>l("history")}),c.jsx(od,{icon:c.jsx(xc,{size:22}),active:o==="profile",onClick:()=>l("profile")}),c.jsx("button",{onClick:()=>Lo.signOut(),className:"p-3 text-red-400 opacity-50",children:c.jsx(b_,{size:22})})]})]}),v&&c.jsx(QA,{driver:v,onClose:()=>S(null),onRefresh:()=>{}}),I&&c.jsx(XA,{onClose:()=>P(!1),users:M,currentUser:t,role:x}),D&&c.jsx(ZA,{schedule:D,onClose:()=>T(null)})]}):n==="login"?c.jsx($A,{onBack:()=>r("landing"),onShowRegister:()=>{i("owner"),r("register")}}):n==="register"?c.jsx(BA,{onBack:()=>r("landing"),initialMode:s}):n==="terms"?c.jsx(HA,{onBack:()=>r("landing")}):n==="privacy"?c.jsx(WA,{onBack:()=>r("landing")}):n==="manual"?c.jsx(GA,{onBack:()=>r("landing")}):c.jsx(VA,{onLogin:()=>r("login"),onRegisterOwner:()=>{i("owner"),r("register")},onRegisterPassenger:()=>{i("passenger"),r("register")},onViewTerms:()=>r("terms"),onViewPrivacy:()=>r("privacy"),onViewManual:()=>r("manual")})}function od({icon:t,active:e,onClick:n}){return c.jsx("button",{onClick:n,className:`p-4 transition-all ${e?"text-primary-500 scale-110":"text-white/20 hover:text-white/40"}`,children:t})}function nj({stats:t,routeStats:e,schedules:n,drivers:r,role:s}){var m;const[i,o]=$.useState("toLaPlata"),l=n.filter(p=>p.ruta.toLowerCase().includes("nátaga -> la plata")||p.ruta.toLowerCase().includes("nátaga")&&p.ruta.toLowerCase().includes("plata")&&p.ruta.toLowerCase().indexOf("nátaga")<p.ruta.toLowerCase().indexOf("plata")),u=n.filter(p=>p.ruta.toLowerCase().includes("la plata -> nátaga")||p.ruta.toLowerCase().includes("plata")&&p.ruta.toLowerCase().includes("nátaga")&&p.ruta.toLowerCase().indexOf("plata")<p.ruta.toLowerCase().indexOf("nátaga")),h=i==="toLaPlata"?l:u;return c.jsxs("div",{className:"space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700",children:[c.jsxs("div",{className:"bg-primary-500 -mt-4 lg:-mt-8 -mx-4 lg:-mx-8 p-6 lg:p-10 pb-16 relative overflow-hidden shadow-2xl",children:[c.jsxs("div",{className:"max-w-4xl mx-auto flex items-center justify-between relative z-10",children:[c.jsxs("div",{className:"flex items-center gap-5",children:[c.jsx("div",{className:"w-16 h-16 lg:w-20 lg:h-20 bg-white/20 rounded-full border-2 border-secondary-900 p-1 flex items-center justify-center",children:c.jsx("div",{className:"w-full h-full bg-slate-200 rounded-full flex items-center justify-center text-secondary-900 font-black text-xl lg:text-2xl shadow-inner",children:((m=s==null?void 0:s.uid)==null?void 0:m.substring(0,1).toUpperCase())||"P"})}),c.jsxs("div",{className:"text-secondary-900",children:[c.jsx("p",{className:"font-bold text-xs uppercase tracking-widest leading-none mb-1 opacity-60",children:"Welcome!"}),c.jsx("h2",{className:"text-xl lg:text-2xl font-black tracking-tight",children:"Brandon Daza Cerq..."})]})]}),c.jsx("div",{className:"px-4 py-1.5 bg-secondary-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl",children:"Pasajero Activo"})]}),c.jsx("div",{className:"max-w-4xl mx-auto mt-8",children:c.jsxs("div",{className:"card-navy rounded-[2.5rem] p-6 lg:p-8 space-y-8",children:[c.jsxs("div",{className:"grid grid-cols-3 gap-4",children:[c.jsx(ad,{label:"Confirmadas",value:t.confirmedReservations,icon:c.jsx(bn,{size:16,className:"text-orange-500 mb-1"})}),c.jsx(ad,{label:"Canceladas",value:t.canceledReservations,icon:c.jsx(b_,{size:16,className:"text-red-500 mb-1"})}),c.jsx(ad,{label:"Total",value:t.totalUserReservations,icon:c.jsx(bn,{size:16,className:"text-green-500 mb-1"})})]}),c.jsxs("div",{className:"pt-6 border-t border-white/5 flex items-center justify-between text-white/40 cursor-pointer hover:text-white/60 transition-colors",children:[c.jsx("span",{className:"text-[10px] font-bold uppercase tracking-widest",children:"Significado de cada contador"}),c.jsx(A2,{size:14})]})]})})]}),c.jsxs("div",{className:"max-w-4xl mx-auto pt-4 space-y-12",children:[c.jsxs("div",{className:"space-y-6",children:[c.jsxs("div",{className:"flex items-center gap-3 px-2",children:[c.jsx(yc,{className:"text-primary-500",size:24}),c.jsx("h3",{className:"text-lg lg:text-xl font-black uppercase tracking-tight text-white",children:"Horarios disponibles"})]}),c.jsxs("div",{className:"flex bg-[#061929] p-1 rounded-2xl border border-white/5",children:[c.jsx("button",{onClick:()=>o("toLaPlata"),className:`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl text-[10px] font-black uppercase transition-all ${i==="toLaPlata"?"bg-primary-500 text-white shadow-xl":"text-white/40 hover:text-white"}`,children:"NATAGÁ -> LA PLATA"}),c.jsx("button",{onClick:()=>o("toNataga"),className:`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl text-[10px] font-black uppercase transition-all ${i==="toNataga"?"bg-primary-500 text-white shadow-xl":"text-white/40 hover:text-white"}`,children:"LA PLATA -> NATAGÁ"})]})]}),c.jsx(Cp,{schedules:h,drivers:r,role:s}),c.jsxs("div",{className:"space-y-6",children:[c.jsxs("div",{className:"flex items-center gap-3 px-2",children:[c.jsx(Ef,{className:"text-primary-500",size:18}),c.jsx("h3",{className:"text-sm font-black text-white/40 uppercase tracking-widest",children:"Estado por ruta"})]}),c.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4 px-2",children:[c.jsx(ec,{name:"Nátaga → La Plata",reservations:e.toLaPlata.reservations,available:e.toLaPlata.seats,color:"border-orange-500"}),c.jsx(ec,{name:"La Plata → Nátaga",reservations:e.toNataga.reservations,available:e.toNataga.seats,color:"border-secondary-400"})]})]}),c.jsxs("div",{className:"p-8 bg-[#061929] rounded-[2.5rem] border border-white/5 flex flex-col md:flex-row items-center gap-6 opacity-60 mx-2",children:[c.jsx("div",{className:"w-16 h-16 bg-blue-500/20 rounded-3xl flex items-center justify-center text-blue-500 shrink-0",children:c.jsx(R_,{size:32})}),c.jsxs("div",{className:"text-center md:text-left space-y-1",children:[c.jsx("h4",{className:"text-lg font-black text-white uppercase leading-none",children:"Reserva Web en desarrollo"}),c.jsx("p",{className:"text-white/40 font-medium text-sm italic",children:"Estamos trabajando para habilitar el motor de reservas en iPhone muy pronto."})]})]})]})]})}function rj({stats:t,routeStats:e,schedules:n,drivers:r,reservations:s=[],role:i,onManage:o}){const l=r.find(S=>S.id===i.uid)||{},u=l.nombre||"Cargando...",h=l.placaVehiculo||l.vehiculoId||"---",m=n.filter(S=>S.conductorId===i.uid),p=s.filter(S=>S.estadoReserva==="Pendiente"||S.reservationStatus==="Pendiente"),v=S=>new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0}).format(S);return c.jsxs("div",{className:"space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700",children:[c.jsxs("div",{className:"bg-primary-500 -mt-4 lg:-mt-8 -mx-4 lg:-mx-8 p-6 lg:p-10 pb-16 relative overflow-hidden shadow-2xl",children:[c.jsxs("div",{className:"max-w-4xl mx-auto flex items-center justify-between relative z-10 text-secondary-900",children:[c.jsxs("div",{className:"flex items-center gap-5",children:[c.jsx("div",{className:"w-16 h-16 lg:w-20 lg:h-20 bg-white/20 rounded-full border-2 border-secondary-900 p-1",children:c.jsx("div",{className:"w-full h-full bg-slate-200 rounded-full flex items-center justify-center font-black text-xl lg:text-2xl shadow-inner",children:u.substring(0,1)})}),c.jsxs("div",{children:[c.jsx("h2",{className:"text-2xl lg:text-3xl font-black tracking-tight",children:u}),c.jsxs("p",{className:"text-secondary-900/60 font-bold text-sm uppercase tracking-wider",children:["Placa: ",h]})]})]}),c.jsx("div",{className:"px-4 py-1.5 bg-secondary-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl",children:"Conductor Activo"})]}),c.jsx("div",{className:"max-w-4xl mx-auto mt-8",children:c.jsxs("div",{className:"card-navy rounded-[2.5rem] p-6 lg:p-8",children:[c.jsxs("div",{className:"flex items-center justify-between mb-6",children:[c.jsx("h4",{className:"text-[10px] lg:text-xs font-black text-primary-500 uppercase tracking-[0.2em]",children:"Resumen del día"}),c.jsx(Ef,{size:16,className:"text-primary-500"})]}),c.jsxs("div",{className:"grid grid-cols-3 gap-4 text-center",children:[c.jsxs("div",{className:"space-y-1",children:[c.jsx("span",{className:"text-xl lg:text-2xl font-black text-green-500",children:(t==null?void 0:t.todayReservations)||0}),c.jsx("p",{className:"text-[9px] font-bold text-white/40 uppercase tracking-widest",children:"Reservas"})]}),c.jsxs("div",{className:"space-y-1 border-x border-white/5",children:[c.jsx("span",{className:"text-xl lg:text-2xl font-black text-primary-500",children:l.asientosLibres||13}),c.jsx("p",{className:"text-[9px] font-bold text-white/40 uppercase tracking-widest",children:"Libres"})]}),c.jsxs("div",{className:"space-y-1",children:[c.jsx("span",{className:"text-xl lg:text-2xl font-black text-amber-500",children:v((t==null?void 0:t.totalRevenue)||0)}),c.jsx("p",{className:"text-[9px] font-bold text-white/40 uppercase tracking-widest",children:"Ingresos"})]})]})]})})]}),c.jsxs("div",{className:"max-w-4xl mx-auto space-y-12 pb-10",children:[c.jsxs("div",{className:"space-y-6",children:[c.jsxs("div",{className:"flex items-center justify-between px-2",children:[c.jsxs("div",{className:"flex items-center gap-3 text-white",children:[c.jsx(bn,{className:"text-primary-500",size:18}),c.jsx("h3",{className:"text-lg font-black uppercase tracking-tight leading-none",children:"Confirmar Reservas"})]}),c.jsx("span",{className:"bg-primary-500 text-white px-3 py-1 rounded-full text-[10px] font-black shadow-lg shadow-primary-500/20",children:p.length})]}),p.length>0?c.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4 px-2",children:p.map(S=>c.jsxs("div",{className:"card-navy p-6 rounded-[2rem] flex items-center justify-between group",children:[c.jsxs("div",{className:"flex items-center gap-4 text-left",children:[c.jsx("div",{className:"w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white/20 group-hover:text-primary-500 transition-colors",children:c.jsx(Sf,{size:24})}),c.jsxs("div",{children:[c.jsxs("p",{className:"text-sm font-black text-white",children:["Asiento #",S.asientoReservado]}),c.jsxs("p",{className:"text-[10px] font-bold text-white/40 uppercase",children:["Pasajero: ",S.nombreUsuario||"User"]})]})]}),c.jsx("button",{className:"px-6 py-2.5 bg-green-500 text-white text-[10px] font-black uppercase rounded-xl shadow-lg shadow-green-500/20 active:scale-95 transition-all",children:"Confirmar"})]},S.id))}):c.jsx("div",{className:"card-navy p-12 rounded-[2.5rem] flex items-center justify-center text-center mx-2 opacity-50",children:c.jsx("p",{className:"text-white/40 text-xs font-bold uppercase italic tracking-widest",children:"Sin reservas activas"})})]}),c.jsxs("div",{className:"space-y-6",children:[c.jsxs("div",{className:"flex items-center gap-3 px-2 text-white",children:[c.jsx(vc,{className:"text-primary-500",size:18}),c.jsx("h3",{className:"text-lg font-black uppercase tracking-tight",children:"Mi Itinerario"})]}),c.jsx(Cp,{schedules:m,drivers:r,role:i,onManage:o})]})]})]})}function ad({label:t,value:e,icon:n,color:r}){return c.jsxs("div",{className:"flex flex-col items-center text-center space-y-1",children:[n,c.jsx("span",{className:`text-xl lg:text-2xl font-black ${r}`,children:e}),c.jsx("span",{className:"text-[9px] font-bold text-white/20 uppercase tracking-widest",children:t})]})}function sj({stats:t,routeStats:e,role:n}){const r=i=>new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0}).format(i),s=(n==null?void 0:n.type)==="ADMIN";return c.jsxs("div",{className:"space-y-10 animate-in fade-in duration-700",children:[c.jsxs("div",{className:`grid grid-cols-1 md:grid-cols-2 ${s?"lg:grid-cols-5":"lg:grid-cols-3"} gap-6`,children:[s&&c.jsxs(c.Fragment,{children:[c.jsx(Oi,{label:"Usuarios Activos",value:t.totalUsers,icon:c.jsx(zr,{className:"text-blue-400"})}),c.jsx(Oi,{label:"Dueños de Flota",value:t.totalOwners,icon:c.jsx(zr,{className:"text-amber-400"})})]}),c.jsx(Oi,{label:"En Turno",value:t.activeDrivers,icon:c.jsx(Xr,{className:"text-green-400"})}),c.jsx(Oi,{label:"Reservas Hoy",value:t.todayReservations,icon:c.jsx(vc,{className:"text-purple-400"})}),c.jsx(Oi,{label:"Ingresos",value:r(t.totalRevenue),icon:c.jsx(Ef,{className:"text-primary-400"})})]}),c.jsxs("div",{className:"space-y-6",children:[c.jsx("h3",{className:"font-black text-xl uppercase tracking-tighter ml-2",children:"Estado por ruta"}),c.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",children:[c.jsx(ec,{name:"Nátaga → La Plata",reservations:e.toLaPlata.reservations,available:e.toLaPlata.seats,color:"border-orange-500"}),c.jsx(ec,{name:"La Plata → Nátaga",reservations:e.toNataga.reservations,available:e.toNataga.seats,color:"border-secondary-400"})]})]})]})}function ec({name:t,reservations:e,available:n,color:r}){return c.jsxs("div",{className:`card-navy p-6 rounded-[2.5rem] border-l-4 ${r} space-y-6`,children:[c.jsx("h4",{className:"text-[10px] font-black uppercase text-white/40 tracking-widest",children:t}),c.jsxs("div",{className:"flex items-center justify-around",children:[c.jsxs("div",{className:"text-center",children:[c.jsx("span",{className:"text-2xl font-black text-white",children:e}),c.jsx("p",{className:"text-[9px] font-bold text-white/20 uppercase",children:"Reservas"})]}),c.jsx("div",{className:"w-px h-8 bg-white/5"}),c.jsxs("div",{className:"text-center",children:[c.jsx("span",{className:"text-2xl font-black text-green-500",children:n}),c.jsx("p",{className:"text-[9px] font-bold text-white/20 uppercase",children:"Libres"})]})]})]})}function ij({users:t=[]}){const e=t.filter(r=>!r.solicitudBorrado),n=t.filter(r=>r.solicitudBorrado===!0);return c.jsxs("div",{className:"space-y-12 pb-20",children:[c.jsxs("div",{className:"space-y-6",children:[c.jsxs("h3",{className:"text-xl font-black uppercase tracking-tighter ml-2",children:["Pasajeros Activos (",e.length,")"]}),c.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6",children:e.map(r=>c.jsx(fv,{user:r},r.id))})]}),n.length>0&&c.jsxs("div",{className:"space-y-6",children:[c.jsxs("h3",{className:"text-xl font-black uppercase tracking-tighter text-red-500 ml-2",children:["Solicitudes de Borrado (",n.length,")"]}),c.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6",children:n.map(r=>c.jsx(fv,{user:r},r.id))})]})]})}function oj({drivers:t,onEditDriver:e,onAddDriver:n}){const r=t.filter(i=>{var o;return i.status==="active"&&((o=i.horariosAsignados)==null?void 0:o.length)>0}),s=t.filter(i=>{var o;return i.status!=="active"||!((o=i.horariosAsignados)!=null&&o.length)});return c.jsxs("div",{className:"space-y-10 pb-20",children:[c.jsxs("div",{className:"flex items-center justify-between bg-[#061929] p-6 rounded-[2.5rem] border border-white/5",children:[c.jsx("h3",{className:"text-xl font-black uppercase tracking-tighter",children:"Gestión de Operadores"}),c.jsx("button",{onClick:n,className:"px-6 py-4 bg-primary-500 text-white rounded-2xl font-black text-[10px] uppercase shadow-lg shadow-primary-500/20",children:"Registrar Conductor"})]}),c.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-10",children:[c.jsxs("div",{className:"space-y-6",children:[c.jsxs("h4",{className:"font-black uppercase text-xs text-green-500 ml-2",children:["En Ruta (",r.length,")"]}),r.map(i=>c.jsx(dv,{driver:i,onEdit:e},i.id))]}),c.jsxs("div",{className:"space-y-6",children:[c.jsxs("h4",{className:"font-black uppercase text-xs text-white/20 ml-2",children:["Fuera de Servicio (",s.length,")"]}),s.map(i=>c.jsx(dv,{driver:i,onEdit:e},i.id))]})]})]})}function aj({user:t,role:e}){var n;return c.jsxs("div",{className:"max-w-4xl mx-auto space-y-8 pb-20",children:[c.jsxs("div",{className:"card-navy p-10 rounded-[3rem] flex flex-col md:flex-row items-center gap-10",children:[c.jsx("div",{className:"w-32 h-32 bg-slate-100 rounded-[3rem] flex items-center justify-center text-secondary-900 font-black text-5xl shadow-2xl border-4 border-white/10",children:(n=t.email)==null?void 0:n.substring(0,1).toUpperCase()}),c.jsxs("div",{className:"text-center md:text-left space-y-4",children:[c.jsx("h2",{className:"text-4xl font-black tracking-tight",children:t.displayName||"Usuario Ruta-Go"}),c.jsxs("div",{className:"flex flex-wrap justify-center md:justify-start gap-4",children:[c.jsxs("span",{className:"px-6 py-2 bg-white/5 text-white/60 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border border-white/5",children:[c.jsx(Bo,{size:14})," ",t.email]}),c.jsxs("span",{className:"px-6 py-2 bg-primary-500/10 text-primary-500 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border border-primary-500/20",children:["Rango: ",e==null?void 0:e.type]})]})]})]}),c.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8",children:[c.jsxs("div",{className:"card-navy p-8 rounded-[2.5rem] space-y-6",children:[c.jsxs("h3",{className:"font-black uppercase text-xs tracking-widest flex items-center gap-3",children:[c.jsx(B2,{className:"text-primary-500",size:18})," Seguridad"]}),c.jsxs("button",{className:"w-full text-left p-6 bg-white/5 hover:bg-white/10 rounded-[2rem] transition-all flex items-center justify-between group",children:[c.jsxs("div",{children:[c.jsx("p",{className:"text-sm font-black",children:"Cambiar Contraseña"}),c.jsx("p",{className:"text-[10px] text-white/40",children:"Actualiza tus credenciales"})]}),c.jsx(ko,{size:18,className:"text-white/20 group-hover:text-primary-500"})]})]}),c.jsxs("div",{className:"bg-red-500/5 p-8 rounded-[2.5rem] border border-red-500/10 space-y-6 text-center md:text-left",children:[c.jsx("h3",{className:"font-black text-red-500 uppercase text-xs tracking-widest",children:"Borrar Cuenta"}),c.jsx("p",{className:"text-[11px] text-red-500/40 font-medium",children:"Todos tus datos entrarán en periodo de gracia de 30 días."}),c.jsx("button",{className:"w-full py-5 bg-red-500/10 border-2 border-red-500/20 text-red-500 font-black rounded-[2rem] text-[10px] uppercase hover:bg-red-500 hover:text-white transition-all",children:"Eliminar permanentemente"})]})]})]})}function lj({reservations:t,role:e}){const n=t.sort((r,s)=>(s.reservationDate||0)-(r.reservationDate||0));return c.jsxs("div",{className:"space-y-10 pb-20 px-2",children:[c.jsxs("div",{className:"flex items-center justify-between border-b border-white/5 pb-6",children:[c.jsx("h3",{className:"text-2xl font-black uppercase tracking-tighter",children:"Historial de Reservas"}),c.jsxs("span",{className:"px-4 py-1.5 bg-white/5 text-white/40 rounded-full text-[10px] font-black uppercase",children:[n.length," Registros"]})]}),n.length>0?c.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:n.map(r=>c.jsxs("div",{className:"card-navy p-8 rounded-[2.5rem] hover:ring-2 ring-primary-500/30 transition-all group relative overflow-hidden",children:[c.jsxs("div",{className:"flex items-center justify-between mb-8",children:[c.jsx("div",{className:"p-4 bg-white/5 rounded-2xl text-white/20 group-hover:text-primary-500 transition-colors",children:c.jsx(Sf,{size:28})}),c.jsx("span",{className:`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${(r.estadoReserva||r.reservationStatus)==="Confirmada"?"bg-green-500/10 text-green-500":"bg-red-500/10 text-red-500"}`,children:r.estadoReserva||r.reservationStatus})]}),c.jsxs("div",{className:"space-y-6",children:[c.jsxs("div",{children:[c.jsx("p",{className:"text-[10px] text-white/20 font-black uppercase tracking-widest mb-1",children:"Ruta"}),c.jsxs("p",{className:"text-lg font-black",children:[r.origen||"La Plata"," ➔ ",r.destino||"Nátaga"]})]}),c.jsxs("div",{className:"grid grid-cols-2",children:[c.jsxs("div",{children:[c.jsx("p",{className:"text-[10px] text-white/20 font-black uppercase tracking-widest mb-1",children:"Asiento"}),c.jsxs("p",{className:"text-xl font-black",children:["#",r.asientoReservado]})]}),c.jsxs("div",{className:"text-right",children:[c.jsx("p",{className:"text-[10px] text-white/20 font-black uppercase tracking-widest mb-1",children:"Fecha"}),c.jsx("p",{className:"text-sm font-black",children:r.travelDate?new Date(r.travelDate).toLocaleDateString():"--/--/--"})]})]})]})]},r.id))}):c.jsxs("div",{className:"h-96 flex flex-col items-center justify-center text-white/10 italic",children:[c.jsx(kf,{size:64,className:"mb-4 opacity-50"}),c.jsx("p",{children:"No hay actividad registrada"})]})]})}function cj({schedules:t,drivers:e,role:n,onManage:r}){const[s,i]=$.useState("toLaPlata"),o=t.filter(h=>h.ruta.toLowerCase().includes("nátaga -> la plata")||h.ruta.toLowerCase().includes("nátaga")&&h.ruta.toLowerCase().includes("plata")&&h.ruta.toLowerCase().indexOf("nátaga")<h.ruta.toLowerCase().indexOf("plata")),l=t.filter(h=>h.ruta.toLowerCase().includes("la plata -> nátaga")||h.ruta.toLowerCase().includes("plata")&&h.ruta.toLowerCase().includes("nátaga")&&h.ruta.toLowerCase().indexOf("plata")<h.ruta.toLowerCase().indexOf("nátaga")),u=s==="toLaPlata"?o:l;return c.jsxs("div",{className:"space-y-10 pb-20",children:[c.jsxs("div",{className:"flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-8 px-2",children:[c.jsxs("div",{className:"flex items-center gap-4",children:[c.jsx("div",{className:"p-3 bg-primary-500/10 rounded-2xl text-primary-500",children:c.jsx(yc,{size:28})}),c.jsx("h3",{className:"text-2xl font-black uppercase tracking-tighter",children:"Planilla de Despachos"})]}),c.jsxs("div",{className:"flex bg-[#061929] p-1 rounded-2xl border border-white/5",children:[c.jsx("button",{onClick:()=>i("toLaPlata"),className:`px-8 py-4 rounded-xl text-[10px] font-black uppercase transition-all ${s==="toLaPlata"?"bg-primary-500 text-white shadow-2xl":"text-white/40"}`,children:"Nátaga ➔ LP"}),c.jsx("button",{onClick:()=>i("toNataga"),className:`px-8 py-4 rounded-xl text-[10px] font-black uppercase transition-all ${s==="toNataga"?"bg-primary-500 text-white shadow-2xl":"text-white/40"}`,children:"LP ➔ Nátaga"})]})]}),c.jsx(Cp,{schedules:u,drivers:e,role:n,onManage:r})]})}ld.createRoot(document.getElementById("root")).render(c.jsx(pE.StrictMode,{children:c.jsx(tj,{})}));
