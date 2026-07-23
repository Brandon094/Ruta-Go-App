(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();function K1(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var gv={exports:{}},tc={},vv={exports:{}},J={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Mo=Symbol.for("react.element"),Y1=Symbol.for("react.portal"),Q1=Symbol.for("react.fragment"),X1=Symbol.for("react.strict_mode"),J1=Symbol.for("react.profiler"),Z1=Symbol.for("react.provider"),eE=Symbol.for("react.context"),tE=Symbol.for("react.forward_ref"),nE=Symbol.for("react.suspense"),rE=Symbol.for("react.memo"),sE=Symbol.for("react.lazy"),km=Symbol.iterator;function iE(t){return t===null||typeof t!="object"?null:(t=km&&t[km]||t["@@iterator"],typeof t=="function"?t:null)}var yv={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},xv=Object.assign,_v={};function Zs(t,e,n){this.props=t,this.context=e,this.refs=_v,this.updater=n||yv}Zs.prototype.isReactComponent={};Zs.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Zs.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function wv(){}wv.prototype=Zs.prototype;function Ch(t,e,n){this.props=t,this.context=e,this.refs=_v,this.updater=n||yv}var bh=Ch.prototype=new wv;bh.constructor=Ch;xv(bh,Zs.prototype);bh.isPureReactComponent=!0;var Sm=Array.isArray,Ev=Object.prototype.hasOwnProperty,Th={current:null},Nv={key:!0,ref:!0,__self:!0,__source:!0};function kv(t,e,n){var r,s={},i=null,o=null;if(e!=null)for(r in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(i=""+e.key),e)Ev.call(e,r)&&!Nv.hasOwnProperty(r)&&(s[r]=e[r]);var c=arguments.length-2;if(c===1)s.children=n;else if(1<c){for(var u=Array(c),h=0;h<c;h++)u[h]=arguments[h+2];s.children=u}if(t&&t.defaultProps)for(r in c=t.defaultProps,c)s[r]===void 0&&(s[r]=c[r]);return{$$typeof:Mo,type:t,key:i,ref:o,props:s,_owner:Th.current}}function oE(t,e){return{$$typeof:Mo,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function Rh(t){return typeof t=="object"&&t!==null&&t.$$typeof===Mo}function aE(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Im=/\/+/g;function gu(t,e){return typeof t=="object"&&t!==null&&t.key!=null?aE(""+t.key):e.toString(36)}function za(t,e,n,r,s){var i=typeof t;(i==="undefined"||i==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(i){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case Mo:case Y1:o=!0}}if(o)return o=t,s=s(o),t=r===""?"."+gu(o,0):r,Sm(s)?(n="",t!=null&&(n=t.replace(Im,"$&/")+"/"),za(s,e,n,"",function(h){return h})):s!=null&&(Rh(s)&&(s=oE(s,n+(!s.key||o&&o.key===s.key?"":(""+s.key).replace(Im,"$&/")+"/")+t)),e.push(s)),1;if(o=0,r=r===""?".":r+":",Sm(t))for(var c=0;c<t.length;c++){i=t[c];var u=r+gu(i,c);o+=za(i,e,n,u,s)}else if(u=iE(t),typeof u=="function")for(t=u.call(t),c=0;!(i=t.next()).done;)i=i.value,u=r+gu(i,c++),o+=za(i,e,n,u,s);else if(i==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function va(t,e,n){if(t==null)return t;var r=[],s=0;return za(t,r,"","",function(i){return e.call(n,i,s++)}),r}function lE(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var at={current:null},Va={transition:null},cE={ReactCurrentDispatcher:at,ReactCurrentBatchConfig:Va,ReactCurrentOwner:Th};function Sv(){throw Error("act(...) is not supported in production builds of React.")}J.Children={map:va,forEach:function(t,e,n){va(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return va(t,function(){e++}),e},toArray:function(t){return va(t,function(e){return e})||[]},only:function(t){if(!Rh(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};J.Component=Zs;J.Fragment=Q1;J.Profiler=J1;J.PureComponent=Ch;J.StrictMode=X1;J.Suspense=nE;J.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=cE;J.act=Sv;J.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var r=xv({},t.props),s=t.key,i=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(i=e.ref,o=Th.current),e.key!==void 0&&(s=""+e.key),t.type&&t.type.defaultProps)var c=t.type.defaultProps;for(u in e)Ev.call(e,u)&&!Nv.hasOwnProperty(u)&&(r[u]=e[u]===void 0&&c!==void 0?c[u]:e[u])}var u=arguments.length-2;if(u===1)r.children=n;else if(1<u){c=Array(u);for(var h=0;h<u;h++)c[h]=arguments[h+2];r.children=c}return{$$typeof:Mo,type:t.type,key:s,ref:i,props:r,_owner:o}};J.createContext=function(t){return t={$$typeof:eE,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:Z1,_context:t},t.Consumer=t};J.createElement=kv;J.createFactory=function(t){var e=kv.bind(null,t);return e.type=t,e};J.createRef=function(){return{current:null}};J.forwardRef=function(t){return{$$typeof:tE,render:t}};J.isValidElement=Rh;J.lazy=function(t){return{$$typeof:sE,_payload:{_status:-1,_result:t},_init:lE}};J.memo=function(t,e){return{$$typeof:rE,type:t,compare:e===void 0?null:e}};J.startTransition=function(t){var e=Va.transition;Va.transition={};try{t()}finally{Va.transition=e}};J.unstable_act=Sv;J.useCallback=function(t,e){return at.current.useCallback(t,e)};J.useContext=function(t){return at.current.useContext(t)};J.useDebugValue=function(){};J.useDeferredValue=function(t){return at.current.useDeferredValue(t)};J.useEffect=function(t,e){return at.current.useEffect(t,e)};J.useId=function(){return at.current.useId()};J.useImperativeHandle=function(t,e,n){return at.current.useImperativeHandle(t,e,n)};J.useInsertionEffect=function(t,e){return at.current.useInsertionEffect(t,e)};J.useLayoutEffect=function(t,e){return at.current.useLayoutEffect(t,e)};J.useMemo=function(t,e){return at.current.useMemo(t,e)};J.useReducer=function(t,e,n){return at.current.useReducer(t,e,n)};J.useRef=function(t){return at.current.useRef(t)};J.useState=function(t){return at.current.useState(t)};J.useSyncExternalStore=function(t,e,n){return at.current.useSyncExternalStore(t,e,n)};J.useTransition=function(){return at.current.useTransition()};J.version="18.3.1";vv.exports=J;var B=vv.exports;const uE=K1(B);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var dE=B,hE=Symbol.for("react.element"),fE=Symbol.for("react.fragment"),pE=Object.prototype.hasOwnProperty,mE=dE.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,gE={key:!0,ref:!0,__self:!0,__source:!0};function Iv(t,e,n){var r,s={},i=null,o=null;n!==void 0&&(i=""+n),e.key!==void 0&&(i=""+e.key),e.ref!==void 0&&(o=e.ref);for(r in e)pE.call(e,r)&&!gE.hasOwnProperty(r)&&(s[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)s[r]===void 0&&(s[r]=e[r]);return{$$typeof:hE,type:t,key:i,ref:o,props:s,_owner:mE.current}}tc.Fragment=fE;tc.jsx=Iv;tc.jsxs=Iv;gv.exports=tc;var l=gv.exports,ld={},Cv={exports:{}},St={},bv={exports:{}},Tv={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(U,$){var G=U.length;U.push($);e:for(;0<G;){var ie=G-1>>>1,Z=U[ie];if(0<s(Z,$))U[ie]=$,U[G]=Z,G=ie;else break e}}function n(U){return U.length===0?null:U[0]}function r(U){if(U.length===0)return null;var $=U[0],G=U.pop();if(G!==$){U[0]=G;e:for(var ie=0,Z=U.length,ye=Z>>>1;ie<ye;){var cn=2*(ie+1)-1,un=U[cn],dn=cn+1,hn=U[dn];if(0>s(un,G))dn<Z&&0>s(hn,un)?(U[ie]=hn,U[dn]=G,ie=dn):(U[ie]=un,U[cn]=G,ie=cn);else if(dn<Z&&0>s(hn,G))U[ie]=hn,U[dn]=G,ie=dn;else break e}}return $}function s(U,$){var G=U.sortIndex-$.sortIndex;return G!==0?G:U.id-$.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;t.unstable_now=function(){return i.now()}}else{var o=Date,c=o.now();t.unstable_now=function(){return o.now()-c}}var u=[],h=[],m=1,p=null,v=3,k=!1,C=!1,j=!1,D=typeof setTimeout=="function"?setTimeout:null,b=typeof clearTimeout=="function"?clearTimeout:null,x=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function S(U){for(var $=n(h);$!==null;){if($.callback===null)r(h);else if($.startTime<=U)r(h),$.sortIndex=$.expirationTime,e(u,$);else break;$=n(h)}}function A(U){if(j=!1,S(U),!C)if(n(u)!==null)C=!0,De(L);else{var $=n(h);$!==null&&ve(A,$.startTime-U)}}function L(U,$){C=!1,j&&(j=!1,b(y),y=-1),k=!0;var G=v;try{for(S($),p=n(u);p!==null&&(!(p.expirationTime>$)||U&&!I());){var ie=p.callback;if(typeof ie=="function"){p.callback=null,v=p.priorityLevel;var Z=ie(p.expirationTime<=$);$=t.unstable_now(),typeof Z=="function"?p.callback=Z:p===n(u)&&r(u),S($)}else r(u);p=n(u)}if(p!==null)var ye=!0;else{var cn=n(h);cn!==null&&ve(A,cn.startTime-$),ye=!1}return ye}finally{p=null,v=G,k=!1}}var F=!1,w=null,y=-1,_=5,N=-1;function I(){return!(t.unstable_now()-N<_)}function T(){if(w!==null){var U=t.unstable_now();N=U;var $=!0;try{$=w(!0,U)}finally{$?E():(F=!1,w=null)}}else F=!1}var E;if(typeof x=="function")E=function(){x(T)};else if(typeof MessageChannel<"u"){var K=new MessageChannel,me=K.port2;K.port1.onmessage=T,E=function(){me.postMessage(null)}}else E=function(){D(T,0)};function De(U){w=U,F||(F=!0,E())}function ve(U,$){y=D(function(){U(t.unstable_now())},$)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(U){U.callback=null},t.unstable_continueExecution=function(){C||k||(C=!0,De(L))},t.unstable_forceFrameRate=function(U){0>U||125<U?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):_=0<U?Math.floor(1e3/U):5},t.unstable_getCurrentPriorityLevel=function(){return v},t.unstable_getFirstCallbackNode=function(){return n(u)},t.unstable_next=function(U){switch(v){case 1:case 2:case 3:var $=3;break;default:$=v}var G=v;v=$;try{return U()}finally{v=G}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(U,$){switch(U){case 1:case 2:case 3:case 4:case 5:break;default:U=3}var G=v;v=U;try{return $()}finally{v=G}},t.unstable_scheduleCallback=function(U,$,G){var ie=t.unstable_now();switch(typeof G=="object"&&G!==null?(G=G.delay,G=typeof G=="number"&&0<G?ie+G:ie):G=ie,U){case 1:var Z=-1;break;case 2:Z=250;break;case 5:Z=1073741823;break;case 4:Z=1e4;break;default:Z=5e3}return Z=G+Z,U={id:m++,callback:$,priorityLevel:U,startTime:G,expirationTime:Z,sortIndex:-1},G>ie?(U.sortIndex=G,e(h,U),n(u)===null&&U===n(h)&&(j?(b(y),y=-1):j=!0,ve(A,G-ie))):(U.sortIndex=Z,e(u,U),C||k||(C=!0,De(L))),U},t.unstable_shouldYield=I,t.unstable_wrapCallback=function(U){var $=v;return function(){var G=v;v=$;try{return U.apply(this,arguments)}finally{v=G}}}})(Tv);bv.exports=Tv;var vE=bv.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var yE=B,Nt=vE;function O(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Rv=new Set,oo={};function Qr(t,e){Fs(t,e),Fs(t+"Capture",e)}function Fs(t,e){for(oo[t]=e,t=0;t<e.length;t++)Rv.add(e[t])}var In=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),cd=Object.prototype.hasOwnProperty,xE=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Cm={},bm={};function _E(t){return cd.call(bm,t)?!0:cd.call(Cm,t)?!1:xE.test(t)?bm[t]=!0:(Cm[t]=!0,!1)}function wE(t,e,n,r){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function EE(t,e,n,r){if(e===null||typeof e>"u"||wE(t,e,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function lt(t,e,n,r,s,i,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=r,this.attributeNamespace=s,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=i,this.removeEmptyString=o}var He={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){He[t]=new lt(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];He[e]=new lt(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){He[t]=new lt(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){He[t]=new lt(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){He[t]=new lt(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){He[t]=new lt(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){He[t]=new lt(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){He[t]=new lt(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){He[t]=new lt(t,5,!1,t.toLowerCase(),null,!1,!1)});var jh=/[\-:]([a-z])/g;function Ph(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(jh,Ph);He[e]=new lt(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(jh,Ph);He[e]=new lt(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(jh,Ph);He[e]=new lt(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){He[t]=new lt(t,1,!1,t.toLowerCase(),null,!1,!1)});He.xlinkHref=new lt("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){He[t]=new lt(t,1,!1,t.toLowerCase(),null,!0,!0)});function Ah(t,e,n,r){var s=He.hasOwnProperty(e)?He[e]:null;(s!==null?s.type!==0:r||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(EE(e,n,s,r)&&(n=null),r||s===null?_E(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):s.mustUseProperty?t[s.propertyName]=n===null?s.type===3?!1:"":n:(e=s.attributeName,r=s.attributeNamespace,n===null?t.removeAttribute(e):(s=s.type,n=s===3||s===4&&n===!0?"":""+n,r?t.setAttributeNS(r,e,n):t.setAttribute(e,n))))}var On=yE.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ya=Symbol.for("react.element"),fs=Symbol.for("react.portal"),ps=Symbol.for("react.fragment"),Oh=Symbol.for("react.strict_mode"),ud=Symbol.for("react.profiler"),jv=Symbol.for("react.provider"),Pv=Symbol.for("react.context"),Dh=Symbol.for("react.forward_ref"),dd=Symbol.for("react.suspense"),hd=Symbol.for("react.suspense_list"),Lh=Symbol.for("react.memo"),Vn=Symbol.for("react.lazy"),Av=Symbol.for("react.offscreen"),Tm=Symbol.iterator;function Ni(t){return t===null||typeof t!="object"?null:(t=Tm&&t[Tm]||t["@@iterator"],typeof t=="function"?t:null)}var Ee=Object.assign,vu;function Li(t){if(vu===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);vu=e&&e[1]||""}return`
`+vu+t}var yu=!1;function xu(t,e){if(!t||yu)return"";yu=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(h){var r=h}Reflect.construct(t,[],e)}else{try{e.call()}catch(h){r=h}t.call(e.prototype)}else{try{throw Error()}catch(h){r=h}t()}}catch(h){if(h&&r&&typeof h.stack=="string"){for(var s=h.stack.split(`
`),i=r.stack.split(`
`),o=s.length-1,c=i.length-1;1<=o&&0<=c&&s[o]!==i[c];)c--;for(;1<=o&&0<=c;o--,c--)if(s[o]!==i[c]){if(o!==1||c!==1)do if(o--,c--,0>c||s[o]!==i[c]){var u=`
`+s[o].replace(" at new "," at ");return t.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",t.displayName)),u}while(1<=o&&0<=c);break}}}finally{yu=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?Li(t):""}function NE(t){switch(t.tag){case 5:return Li(t.type);case 16:return Li("Lazy");case 13:return Li("Suspense");case 19:return Li("SuspenseList");case 0:case 2:case 15:return t=xu(t.type,!1),t;case 11:return t=xu(t.type.render,!1),t;case 1:return t=xu(t.type,!0),t;default:return""}}function fd(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case ps:return"Fragment";case fs:return"Portal";case ud:return"Profiler";case Oh:return"StrictMode";case dd:return"Suspense";case hd:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case Pv:return(t.displayName||"Context")+".Consumer";case jv:return(t._context.displayName||"Context")+".Provider";case Dh:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Lh:return e=t.displayName||null,e!==null?e:fd(t.type)||"Memo";case Vn:e=t._payload,t=t._init;try{return fd(t(e))}catch{}}return null}function kE(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return fd(e);case 8:return e===Oh?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function dr(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Ov(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function SE(t){var e=Ov(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),r=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var s=n.get,i=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return s.call(this)},set:function(o){r=""+o,i.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function xa(t){t._valueTracker||(t._valueTracker=SE(t))}function Dv(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),r="";return t&&(r=Ov(t)?t.checked?"true":"false":t.value),t=r,t!==n?(e.setValue(t),!0):!1}function sl(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function pd(t,e){var n=e.checked;return Ee({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function Rm(t,e){var n=e.defaultValue==null?"":e.defaultValue,r=e.checked!=null?e.checked:e.defaultChecked;n=dr(e.value!=null?e.value:n),t._wrapperState={initialChecked:r,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function Lv(t,e){e=e.checked,e!=null&&Ah(t,"checked",e,!1)}function md(t,e){Lv(t,e);var n=dr(e.value),r=e.type;if(n!=null)r==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(r==="submit"||r==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?gd(t,e.type,n):e.hasOwnProperty("defaultValue")&&gd(t,e.type,dr(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function jm(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var r=e.type;if(!(r!=="submit"&&r!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function gd(t,e,n){(e!=="number"||sl(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var Mi=Array.isArray;function Cs(t,e,n,r){if(t=t.options,e){e={};for(var s=0;s<n.length;s++)e["$"+n[s]]=!0;for(n=0;n<t.length;n++)s=e.hasOwnProperty("$"+t[n].value),t[n].selected!==s&&(t[n].selected=s),s&&r&&(t[n].defaultSelected=!0)}else{for(n=""+dr(n),e=null,s=0;s<t.length;s++){if(t[s].value===n){t[s].selected=!0,r&&(t[s].defaultSelected=!0);return}e!==null||t[s].disabled||(e=t[s])}e!==null&&(e.selected=!0)}}function vd(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(O(91));return Ee({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function Pm(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(O(92));if(Mi(n)){if(1<n.length)throw Error(O(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:dr(n)}}function Mv(t,e){var n=dr(e.value),r=dr(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),r!=null&&(t.defaultValue=""+r)}function Am(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function Fv(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function yd(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?Fv(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var _a,Uv=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,r,s){MSApp.execUnsafeLocalFunction(function(){return t(e,n,r,s)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(_a=_a||document.createElement("div"),_a.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=_a.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function ao(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var $i={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},IE=["Webkit","ms","Moz","O"];Object.keys($i).forEach(function(t){IE.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),$i[e]=$i[t]})});function zv(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||$i.hasOwnProperty(t)&&$i[t]?(""+e).trim():e+"px"}function Vv(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var r=n.indexOf("--")===0,s=zv(n,e[n],r);n==="float"&&(n="cssFloat"),r?t.setProperty(n,s):t[n]=s}}var CE=Ee({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function xd(t,e){if(e){if(CE[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(O(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(O(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(O(61))}if(e.style!=null&&typeof e.style!="object")throw Error(O(62))}}function _d(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var wd=null;function Mh(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Ed=null,bs=null,Ts=null;function Om(t){if(t=zo(t)){if(typeof Ed!="function")throw Error(O(280));var e=t.stateNode;e&&(e=oc(e),Ed(t.stateNode,t.type,e))}}function $v(t){bs?Ts?Ts.push(t):Ts=[t]:bs=t}function Bv(){if(bs){var t=bs,e=Ts;if(Ts=bs=null,Om(t),e)for(t=0;t<e.length;t++)Om(e[t])}}function Hv(t,e){return t(e)}function Wv(){}var _u=!1;function Gv(t,e,n){if(_u)return t(e,n);_u=!0;try{return Hv(t,e,n)}finally{_u=!1,(bs!==null||Ts!==null)&&(Wv(),Bv())}}function lo(t,e){var n=t.stateNode;if(n===null)return null;var r=oc(n);if(r===null)return null;n=r[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(t=t.type,r=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!r;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(O(231,e,typeof n));return n}var Nd=!1;if(In)try{var ki={};Object.defineProperty(ki,"passive",{get:function(){Nd=!0}}),window.addEventListener("test",ki,ki),window.removeEventListener("test",ki,ki)}catch{Nd=!1}function bE(t,e,n,r,s,i,o,c,u){var h=Array.prototype.slice.call(arguments,3);try{e.apply(n,h)}catch(m){this.onError(m)}}var Bi=!1,il=null,ol=!1,kd=null,TE={onError:function(t){Bi=!0,il=t}};function RE(t,e,n,r,s,i,o,c,u){Bi=!1,il=null,bE.apply(TE,arguments)}function jE(t,e,n,r,s,i,o,c,u){if(RE.apply(this,arguments),Bi){if(Bi){var h=il;Bi=!1,il=null}else throw Error(O(198));ol||(ol=!0,kd=h)}}function Xr(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function qv(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Dm(t){if(Xr(t)!==t)throw Error(O(188))}function PE(t){var e=t.alternate;if(!e){if(e=Xr(t),e===null)throw Error(O(188));return e!==t?null:t}for(var n=t,r=e;;){var s=n.return;if(s===null)break;var i=s.alternate;if(i===null){if(r=s.return,r!==null){n=r;continue}break}if(s.child===i.child){for(i=s.child;i;){if(i===n)return Dm(s),t;if(i===r)return Dm(s),e;i=i.sibling}throw Error(O(188))}if(n.return!==r.return)n=s,r=i;else{for(var o=!1,c=s.child;c;){if(c===n){o=!0,n=s,r=i;break}if(c===r){o=!0,r=s,n=i;break}c=c.sibling}if(!o){for(c=i.child;c;){if(c===n){o=!0,n=i,r=s;break}if(c===r){o=!0,r=i,n=s;break}c=c.sibling}if(!o)throw Error(O(189))}}if(n.alternate!==r)throw Error(O(190))}if(n.tag!==3)throw Error(O(188));return n.stateNode.current===n?t:e}function Kv(t){return t=PE(t),t!==null?Yv(t):null}function Yv(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=Yv(t);if(e!==null)return e;t=t.sibling}return null}var Qv=Nt.unstable_scheduleCallback,Lm=Nt.unstable_cancelCallback,AE=Nt.unstable_shouldYield,OE=Nt.unstable_requestPaint,Ie=Nt.unstable_now,DE=Nt.unstable_getCurrentPriorityLevel,Fh=Nt.unstable_ImmediatePriority,Xv=Nt.unstable_UserBlockingPriority,al=Nt.unstable_NormalPriority,LE=Nt.unstable_LowPriority,Jv=Nt.unstable_IdlePriority,nc=null,nn=null;function ME(t){if(nn&&typeof nn.onCommitFiberRoot=="function")try{nn.onCommitFiberRoot(nc,t,void 0,(t.current.flags&128)===128)}catch{}}var Ht=Math.clz32?Math.clz32:zE,FE=Math.log,UE=Math.LN2;function zE(t){return t>>>=0,t===0?32:31-(FE(t)/UE|0)|0}var wa=64,Ea=4194304;function Fi(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function ll(t,e){var n=t.pendingLanes;if(n===0)return 0;var r=0,s=t.suspendedLanes,i=t.pingedLanes,o=n&268435455;if(o!==0){var c=o&~s;c!==0?r=Fi(c):(i&=o,i!==0&&(r=Fi(i)))}else o=n&~s,o!==0?r=Fi(o):i!==0&&(r=Fi(i));if(r===0)return 0;if(e!==0&&e!==r&&!(e&s)&&(s=r&-r,i=e&-e,s>=i||s===16&&(i&4194240)!==0))return e;if(r&4&&(r|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=r;0<e;)n=31-Ht(e),s=1<<n,r|=t[n],e&=~s;return r}function VE(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function $E(t,e){for(var n=t.suspendedLanes,r=t.pingedLanes,s=t.expirationTimes,i=t.pendingLanes;0<i;){var o=31-Ht(i),c=1<<o,u=s[o];u===-1?(!(c&n)||c&r)&&(s[o]=VE(c,e)):u<=e&&(t.expiredLanes|=c),i&=~c}}function Sd(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function Zv(){var t=wa;return wa<<=1,!(wa&4194240)&&(wa=64),t}function wu(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Fo(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-Ht(e),t[e]=n}function BE(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var r=t.eventTimes;for(t=t.expirationTimes;0<n;){var s=31-Ht(n),i=1<<s;e[s]=0,r[s]=-1,t[s]=-1,n&=~i}}function Uh(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var r=31-Ht(n),s=1<<r;s&e|t[r]&e&&(t[r]|=e),n&=~s}}var oe=0;function ey(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var ty,zh,ny,ry,sy,Id=!1,Na=[],Zn=null,er=null,tr=null,co=new Map,uo=new Map,Hn=[],HE="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Mm(t,e){switch(t){case"focusin":case"focusout":Zn=null;break;case"dragenter":case"dragleave":er=null;break;case"mouseover":case"mouseout":tr=null;break;case"pointerover":case"pointerout":co.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":uo.delete(e.pointerId)}}function Si(t,e,n,r,s,i){return t===null||t.nativeEvent!==i?(t={blockedOn:e,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[s]},e!==null&&(e=zo(e),e!==null&&zh(e)),t):(t.eventSystemFlags|=r,e=t.targetContainers,s!==null&&e.indexOf(s)===-1&&e.push(s),t)}function WE(t,e,n,r,s){switch(e){case"focusin":return Zn=Si(Zn,t,e,n,r,s),!0;case"dragenter":return er=Si(er,t,e,n,r,s),!0;case"mouseover":return tr=Si(tr,t,e,n,r,s),!0;case"pointerover":var i=s.pointerId;return co.set(i,Si(co.get(i)||null,t,e,n,r,s)),!0;case"gotpointercapture":return i=s.pointerId,uo.set(i,Si(uo.get(i)||null,t,e,n,r,s)),!0}return!1}function iy(t){var e=Tr(t.target);if(e!==null){var n=Xr(e);if(n!==null){if(e=n.tag,e===13){if(e=qv(n),e!==null){t.blockedOn=e,sy(t.priority,function(){ny(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function $a(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Cd(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var r=new n.constructor(n.type,n);wd=r,n.target.dispatchEvent(r),wd=null}else return e=zo(n),e!==null&&zh(e),t.blockedOn=n,!1;e.shift()}return!0}function Fm(t,e,n){$a(t)&&n.delete(e)}function GE(){Id=!1,Zn!==null&&$a(Zn)&&(Zn=null),er!==null&&$a(er)&&(er=null),tr!==null&&$a(tr)&&(tr=null),co.forEach(Fm),uo.forEach(Fm)}function Ii(t,e){t.blockedOn===e&&(t.blockedOn=null,Id||(Id=!0,Nt.unstable_scheduleCallback(Nt.unstable_NormalPriority,GE)))}function ho(t){function e(s){return Ii(s,t)}if(0<Na.length){Ii(Na[0],t);for(var n=1;n<Na.length;n++){var r=Na[n];r.blockedOn===t&&(r.blockedOn=null)}}for(Zn!==null&&Ii(Zn,t),er!==null&&Ii(er,t),tr!==null&&Ii(tr,t),co.forEach(e),uo.forEach(e),n=0;n<Hn.length;n++)r=Hn[n],r.blockedOn===t&&(r.blockedOn=null);for(;0<Hn.length&&(n=Hn[0],n.blockedOn===null);)iy(n),n.blockedOn===null&&Hn.shift()}var Rs=On.ReactCurrentBatchConfig,cl=!0;function qE(t,e,n,r){var s=oe,i=Rs.transition;Rs.transition=null;try{oe=1,Vh(t,e,n,r)}finally{oe=s,Rs.transition=i}}function KE(t,e,n,r){var s=oe,i=Rs.transition;Rs.transition=null;try{oe=4,Vh(t,e,n,r)}finally{oe=s,Rs.transition=i}}function Vh(t,e,n,r){if(cl){var s=Cd(t,e,n,r);if(s===null)ju(t,e,r,ul,n),Mm(t,r);else if(WE(s,t,e,n,r))r.stopPropagation();else if(Mm(t,r),e&4&&-1<HE.indexOf(t)){for(;s!==null;){var i=zo(s);if(i!==null&&ty(i),i=Cd(t,e,n,r),i===null&&ju(t,e,r,ul,n),i===s)break;s=i}s!==null&&r.stopPropagation()}else ju(t,e,r,null,n)}}var ul=null;function Cd(t,e,n,r){if(ul=null,t=Mh(r),t=Tr(t),t!==null)if(e=Xr(t),e===null)t=null;else if(n=e.tag,n===13){if(t=qv(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return ul=t,null}function oy(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(DE()){case Fh:return 1;case Xv:return 4;case al:case LE:return 16;case Jv:return 536870912;default:return 16}default:return 16}}var Qn=null,$h=null,Ba=null;function ay(){if(Ba)return Ba;var t,e=$h,n=e.length,r,s="value"in Qn?Qn.value:Qn.textContent,i=s.length;for(t=0;t<n&&e[t]===s[t];t++);var o=n-t;for(r=1;r<=o&&e[n-r]===s[i-r];r++);return Ba=s.slice(t,1<r?1-r:void 0)}function Ha(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function ka(){return!0}function Um(){return!1}function It(t){function e(n,r,s,i,o){this._reactName=n,this._targetInst=s,this.type=r,this.nativeEvent=i,this.target=o,this.currentTarget=null;for(var c in t)t.hasOwnProperty(c)&&(n=t[c],this[c]=n?n(i):i[c]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?ka:Um,this.isPropagationStopped=Um,this}return Ee(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=ka)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=ka)},persist:function(){},isPersistent:ka}),e}var ei={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Bh=It(ei),Uo=Ee({},ei,{view:0,detail:0}),YE=It(Uo),Eu,Nu,Ci,rc=Ee({},Uo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Hh,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Ci&&(Ci&&t.type==="mousemove"?(Eu=t.screenX-Ci.screenX,Nu=t.screenY-Ci.screenY):Nu=Eu=0,Ci=t),Eu)},movementY:function(t){return"movementY"in t?t.movementY:Nu}}),zm=It(rc),QE=Ee({},rc,{dataTransfer:0}),XE=It(QE),JE=Ee({},Uo,{relatedTarget:0}),ku=It(JE),ZE=Ee({},ei,{animationName:0,elapsedTime:0,pseudoElement:0}),eN=It(ZE),tN=Ee({},ei,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),nN=It(tN),rN=Ee({},ei,{data:0}),Vm=It(rN),sN={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},iN={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},oN={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function aN(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=oN[t])?!!e[t]:!1}function Hh(){return aN}var lN=Ee({},Uo,{key:function(t){if(t.key){var e=sN[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Ha(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?iN[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Hh,charCode:function(t){return t.type==="keypress"?Ha(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Ha(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),cN=It(lN),uN=Ee({},rc,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),$m=It(uN),dN=Ee({},Uo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Hh}),hN=It(dN),fN=Ee({},ei,{propertyName:0,elapsedTime:0,pseudoElement:0}),pN=It(fN),mN=Ee({},rc,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),gN=It(mN),vN=[9,13,27,32],Wh=In&&"CompositionEvent"in window,Hi=null;In&&"documentMode"in document&&(Hi=document.documentMode);var yN=In&&"TextEvent"in window&&!Hi,ly=In&&(!Wh||Hi&&8<Hi&&11>=Hi),Bm=" ",Hm=!1;function cy(t,e){switch(t){case"keyup":return vN.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function uy(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var ms=!1;function xN(t,e){switch(t){case"compositionend":return uy(e);case"keypress":return e.which!==32?null:(Hm=!0,Bm);case"textInput":return t=e.data,t===Bm&&Hm?null:t;default:return null}}function _N(t,e){if(ms)return t==="compositionend"||!Wh&&cy(t,e)?(t=ay(),Ba=$h=Qn=null,ms=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return ly&&e.locale!=="ko"?null:e.data;default:return null}}var wN={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Wm(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!wN[t.type]:e==="textarea"}function dy(t,e,n,r){$v(r),e=dl(e,"onChange"),0<e.length&&(n=new Bh("onChange","change",null,n,r),t.push({event:n,listeners:e}))}var Wi=null,fo=null;function EN(t){Ey(t,0)}function sc(t){var e=ys(t);if(Dv(e))return t}function NN(t,e){if(t==="change")return e}var hy=!1;if(In){var Su;if(In){var Iu="oninput"in document;if(!Iu){var Gm=document.createElement("div");Gm.setAttribute("oninput","return;"),Iu=typeof Gm.oninput=="function"}Su=Iu}else Su=!1;hy=Su&&(!document.documentMode||9<document.documentMode)}function qm(){Wi&&(Wi.detachEvent("onpropertychange",fy),fo=Wi=null)}function fy(t){if(t.propertyName==="value"&&sc(fo)){var e=[];dy(e,fo,t,Mh(t)),Gv(EN,e)}}function kN(t,e,n){t==="focusin"?(qm(),Wi=e,fo=n,Wi.attachEvent("onpropertychange",fy)):t==="focusout"&&qm()}function SN(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return sc(fo)}function IN(t,e){if(t==="click")return sc(e)}function CN(t,e){if(t==="input"||t==="change")return sc(e)}function bN(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var qt=typeof Object.is=="function"?Object.is:bN;function po(t,e){if(qt(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),r=Object.keys(e);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var s=n[r];if(!cd.call(e,s)||!qt(t[s],e[s]))return!1}return!0}function Km(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Ym(t,e){var n=Km(t);t=0;for(var r;n;){if(n.nodeType===3){if(r=t+n.textContent.length,t<=e&&r>=e)return{node:n,offset:e-t};t=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Km(n)}}function py(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?py(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function my(){for(var t=window,e=sl();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=sl(t.document)}return e}function Gh(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function TN(t){var e=my(),n=t.focusedElem,r=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&py(n.ownerDocument.documentElement,n)){if(r!==null&&Gh(n)){if(e=r.start,t=r.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var s=n.textContent.length,i=Math.min(r.start,s);r=r.end===void 0?i:Math.min(r.end,s),!t.extend&&i>r&&(s=r,r=i,i=s),s=Ym(n,i);var o=Ym(n,r);s&&o&&(t.rangeCount!==1||t.anchorNode!==s.node||t.anchorOffset!==s.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(s.node,s.offset),t.removeAllRanges(),i>r?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var RN=In&&"documentMode"in document&&11>=document.documentMode,gs=null,bd=null,Gi=null,Td=!1;function Qm(t,e,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Td||gs==null||gs!==sl(r)||(r=gs,"selectionStart"in r&&Gh(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Gi&&po(Gi,r)||(Gi=r,r=dl(bd,"onSelect"),0<r.length&&(e=new Bh("onSelect","select",null,e,n),t.push({event:e,listeners:r}),e.target=gs)))}function Sa(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var vs={animationend:Sa("Animation","AnimationEnd"),animationiteration:Sa("Animation","AnimationIteration"),animationstart:Sa("Animation","AnimationStart"),transitionend:Sa("Transition","TransitionEnd")},Cu={},gy={};In&&(gy=document.createElement("div").style,"AnimationEvent"in window||(delete vs.animationend.animation,delete vs.animationiteration.animation,delete vs.animationstart.animation),"TransitionEvent"in window||delete vs.transitionend.transition);function ic(t){if(Cu[t])return Cu[t];if(!vs[t])return t;var e=vs[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in gy)return Cu[t]=e[n];return t}var vy=ic("animationend"),yy=ic("animationiteration"),xy=ic("animationstart"),_y=ic("transitionend"),wy=new Map,Xm="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function vr(t,e){wy.set(t,e),Qr(e,[t])}for(var bu=0;bu<Xm.length;bu++){var Tu=Xm[bu],jN=Tu.toLowerCase(),PN=Tu[0].toUpperCase()+Tu.slice(1);vr(jN,"on"+PN)}vr(vy,"onAnimationEnd");vr(yy,"onAnimationIteration");vr(xy,"onAnimationStart");vr("dblclick","onDoubleClick");vr("focusin","onFocus");vr("focusout","onBlur");vr(_y,"onTransitionEnd");Fs("onMouseEnter",["mouseout","mouseover"]);Fs("onMouseLeave",["mouseout","mouseover"]);Fs("onPointerEnter",["pointerout","pointerover"]);Fs("onPointerLeave",["pointerout","pointerover"]);Qr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Qr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Qr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Qr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Qr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Qr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ui="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),AN=new Set("cancel close invalid load scroll toggle".split(" ").concat(Ui));function Jm(t,e,n){var r=t.type||"unknown-event";t.currentTarget=n,jE(r,e,void 0,t),t.currentTarget=null}function Ey(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var r=t[n],s=r.event;r=r.listeners;e:{var i=void 0;if(e)for(var o=r.length-1;0<=o;o--){var c=r[o],u=c.instance,h=c.currentTarget;if(c=c.listener,u!==i&&s.isPropagationStopped())break e;Jm(s,c,h),i=u}else for(o=0;o<r.length;o++){if(c=r[o],u=c.instance,h=c.currentTarget,c=c.listener,u!==i&&s.isPropagationStopped())break e;Jm(s,c,h),i=u}}}if(ol)throw t=kd,ol=!1,kd=null,t}function fe(t,e){var n=e[Od];n===void 0&&(n=e[Od]=new Set);var r=t+"__bubble";n.has(r)||(Ny(e,t,2,!1),n.add(r))}function Ru(t,e,n){var r=0;e&&(r|=4),Ny(n,t,r,e)}var Ia="_reactListening"+Math.random().toString(36).slice(2);function mo(t){if(!t[Ia]){t[Ia]=!0,Rv.forEach(function(n){n!=="selectionchange"&&(AN.has(n)||Ru(n,!1,t),Ru(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Ia]||(e[Ia]=!0,Ru("selectionchange",!1,e))}}function Ny(t,e,n,r){switch(oy(e)){case 1:var s=qE;break;case 4:s=KE;break;default:s=Vh}n=s.bind(null,e,n,t),s=void 0,!Nd||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(s=!0),r?s!==void 0?t.addEventListener(e,n,{capture:!0,passive:s}):t.addEventListener(e,n,!0):s!==void 0?t.addEventListener(e,n,{passive:s}):t.addEventListener(e,n,!1)}function ju(t,e,n,r,s){var i=r;if(!(e&1)&&!(e&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var c=r.stateNode.containerInfo;if(c===s||c.nodeType===8&&c.parentNode===s)break;if(o===4)for(o=r.return;o!==null;){var u=o.tag;if((u===3||u===4)&&(u=o.stateNode.containerInfo,u===s||u.nodeType===8&&u.parentNode===s))return;o=o.return}for(;c!==null;){if(o=Tr(c),o===null)return;if(u=o.tag,u===5||u===6){r=i=o;continue e}c=c.parentNode}}r=r.return}Gv(function(){var h=i,m=Mh(n),p=[];e:{var v=wy.get(t);if(v!==void 0){var k=Bh,C=t;switch(t){case"keypress":if(Ha(n)===0)break e;case"keydown":case"keyup":k=cN;break;case"focusin":C="focus",k=ku;break;case"focusout":C="blur",k=ku;break;case"beforeblur":case"afterblur":k=ku;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":k=zm;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":k=XE;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":k=hN;break;case vy:case yy:case xy:k=eN;break;case _y:k=pN;break;case"scroll":k=YE;break;case"wheel":k=gN;break;case"copy":case"cut":case"paste":k=nN;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":k=$m}var j=(e&4)!==0,D=!j&&t==="scroll",b=j?v!==null?v+"Capture":null:v;j=[];for(var x=h,S;x!==null;){S=x;var A=S.stateNode;if(S.tag===5&&A!==null&&(S=A,b!==null&&(A=lo(x,b),A!=null&&j.push(go(x,A,S)))),D)break;x=x.return}0<j.length&&(v=new k(v,C,null,n,m),p.push({event:v,listeners:j}))}}if(!(e&7)){e:{if(v=t==="mouseover"||t==="pointerover",k=t==="mouseout"||t==="pointerout",v&&n!==wd&&(C=n.relatedTarget||n.fromElement)&&(Tr(C)||C[Cn]))break e;if((k||v)&&(v=m.window===m?m:(v=m.ownerDocument)?v.defaultView||v.parentWindow:window,k?(C=n.relatedTarget||n.toElement,k=h,C=C?Tr(C):null,C!==null&&(D=Xr(C),C!==D||C.tag!==5&&C.tag!==6)&&(C=null)):(k=null,C=h),k!==C)){if(j=zm,A="onMouseLeave",b="onMouseEnter",x="mouse",(t==="pointerout"||t==="pointerover")&&(j=$m,A="onPointerLeave",b="onPointerEnter",x="pointer"),D=k==null?v:ys(k),S=C==null?v:ys(C),v=new j(A,x+"leave",k,n,m),v.target=D,v.relatedTarget=S,A=null,Tr(m)===h&&(j=new j(b,x+"enter",C,n,m),j.target=S,j.relatedTarget=D,A=j),D=A,k&&C)t:{for(j=k,b=C,x=0,S=j;S;S=cs(S))x++;for(S=0,A=b;A;A=cs(A))S++;for(;0<x-S;)j=cs(j),x--;for(;0<S-x;)b=cs(b),S--;for(;x--;){if(j===b||b!==null&&j===b.alternate)break t;j=cs(j),b=cs(b)}j=null}else j=null;k!==null&&Zm(p,v,k,j,!1),C!==null&&D!==null&&Zm(p,D,C,j,!0)}}e:{if(v=h?ys(h):window,k=v.nodeName&&v.nodeName.toLowerCase(),k==="select"||k==="input"&&v.type==="file")var L=NN;else if(Wm(v))if(hy)L=CN;else{L=SN;var F=kN}else(k=v.nodeName)&&k.toLowerCase()==="input"&&(v.type==="checkbox"||v.type==="radio")&&(L=IN);if(L&&(L=L(t,h))){dy(p,L,n,m);break e}F&&F(t,v,h),t==="focusout"&&(F=v._wrapperState)&&F.controlled&&v.type==="number"&&gd(v,"number",v.value)}switch(F=h?ys(h):window,t){case"focusin":(Wm(F)||F.contentEditable==="true")&&(gs=F,bd=h,Gi=null);break;case"focusout":Gi=bd=gs=null;break;case"mousedown":Td=!0;break;case"contextmenu":case"mouseup":case"dragend":Td=!1,Qm(p,n,m);break;case"selectionchange":if(RN)break;case"keydown":case"keyup":Qm(p,n,m)}var w;if(Wh)e:{switch(t){case"compositionstart":var y="onCompositionStart";break e;case"compositionend":y="onCompositionEnd";break e;case"compositionupdate":y="onCompositionUpdate";break e}y=void 0}else ms?cy(t,n)&&(y="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(y="onCompositionStart");y&&(ly&&n.locale!=="ko"&&(ms||y!=="onCompositionStart"?y==="onCompositionEnd"&&ms&&(w=ay()):(Qn=m,$h="value"in Qn?Qn.value:Qn.textContent,ms=!0)),F=dl(h,y),0<F.length&&(y=new Vm(y,t,null,n,m),p.push({event:y,listeners:F}),w?y.data=w:(w=uy(n),w!==null&&(y.data=w)))),(w=yN?xN(t,n):_N(t,n))&&(h=dl(h,"onBeforeInput"),0<h.length&&(m=new Vm("onBeforeInput","beforeinput",null,n,m),p.push({event:m,listeners:h}),m.data=w))}Ey(p,e)})}function go(t,e,n){return{instance:t,listener:e,currentTarget:n}}function dl(t,e){for(var n=e+"Capture",r=[];t!==null;){var s=t,i=s.stateNode;s.tag===5&&i!==null&&(s=i,i=lo(t,n),i!=null&&r.unshift(go(t,i,s)),i=lo(t,e),i!=null&&r.push(go(t,i,s))),t=t.return}return r}function cs(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function Zm(t,e,n,r,s){for(var i=e._reactName,o=[];n!==null&&n!==r;){var c=n,u=c.alternate,h=c.stateNode;if(u!==null&&u===r)break;c.tag===5&&h!==null&&(c=h,s?(u=lo(n,i),u!=null&&o.unshift(go(n,u,c))):s||(u=lo(n,i),u!=null&&o.push(go(n,u,c)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var ON=/\r\n?/g,DN=/\u0000|\uFFFD/g;function eg(t){return(typeof t=="string"?t:""+t).replace(ON,`
`).replace(DN,"")}function Ca(t,e,n){if(e=eg(e),eg(t)!==e&&n)throw Error(O(425))}function hl(){}var Rd=null,jd=null;function Pd(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Ad=typeof setTimeout=="function"?setTimeout:void 0,LN=typeof clearTimeout=="function"?clearTimeout:void 0,tg=typeof Promise=="function"?Promise:void 0,MN=typeof queueMicrotask=="function"?queueMicrotask:typeof tg<"u"?function(t){return tg.resolve(null).then(t).catch(FN)}:Ad;function FN(t){setTimeout(function(){throw t})}function Pu(t,e){var n=e,r=0;do{var s=n.nextSibling;if(t.removeChild(n),s&&s.nodeType===8)if(n=s.data,n==="/$"){if(r===0){t.removeChild(s),ho(e);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=s}while(n);ho(e)}function nr(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function ng(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var ti=Math.random().toString(36).slice(2),en="__reactFiber$"+ti,vo="__reactProps$"+ti,Cn="__reactContainer$"+ti,Od="__reactEvents$"+ti,UN="__reactListeners$"+ti,zN="__reactHandles$"+ti;function Tr(t){var e=t[en];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Cn]||n[en]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=ng(t);t!==null;){if(n=t[en])return n;t=ng(t)}return e}t=n,n=t.parentNode}return null}function zo(t){return t=t[en]||t[Cn],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function ys(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(O(33))}function oc(t){return t[vo]||null}var Dd=[],xs=-1;function yr(t){return{current:t}}function pe(t){0>xs||(t.current=Dd[xs],Dd[xs]=null,xs--)}function de(t,e){xs++,Dd[xs]=t.current,t.current=e}var hr={},Je=yr(hr),pt=yr(!1),Lr=hr;function Us(t,e){var n=t.type.contextTypes;if(!n)return hr;var r=t.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===e)return r.__reactInternalMemoizedMaskedChildContext;var s={},i;for(i in n)s[i]=e[i];return r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=s),s}function mt(t){return t=t.childContextTypes,t!=null}function fl(){pe(pt),pe(Je)}function rg(t,e,n){if(Je.current!==hr)throw Error(O(168));de(Je,e),de(pt,n)}function ky(t,e,n){var r=t.stateNode;if(e=e.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var s in r)if(!(s in e))throw Error(O(108,kE(t)||"Unknown",s));return Ee({},n,r)}function pl(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||hr,Lr=Je.current,de(Je,t),de(pt,pt.current),!0}function sg(t,e,n){var r=t.stateNode;if(!r)throw Error(O(169));n?(t=ky(t,e,Lr),r.__reactInternalMemoizedMergedChildContext=t,pe(pt),pe(Je),de(Je,t)):pe(pt),de(pt,n)}var gn=null,ac=!1,Au=!1;function Sy(t){gn===null?gn=[t]:gn.push(t)}function VN(t){ac=!0,Sy(t)}function xr(){if(!Au&&gn!==null){Au=!0;var t=0,e=oe;try{var n=gn;for(oe=1;t<n.length;t++){var r=n[t];do r=r(!0);while(r!==null)}gn=null,ac=!1}catch(s){throw gn!==null&&(gn=gn.slice(t+1)),Qv(Fh,xr),s}finally{oe=e,Au=!1}}return null}var _s=[],ws=0,ml=null,gl=0,bt=[],Tt=0,Mr=null,vn=1,yn="";function Sr(t,e){_s[ws++]=gl,_s[ws++]=ml,ml=t,gl=e}function Iy(t,e,n){bt[Tt++]=vn,bt[Tt++]=yn,bt[Tt++]=Mr,Mr=t;var r=vn;t=yn;var s=32-Ht(r)-1;r&=~(1<<s),n+=1;var i=32-Ht(e)+s;if(30<i){var o=s-s%5;i=(r&(1<<o)-1).toString(32),r>>=o,s-=o,vn=1<<32-Ht(e)+s|n<<s|r,yn=i+t}else vn=1<<i|n<<s|r,yn=t}function qh(t){t.return!==null&&(Sr(t,1),Iy(t,1,0))}function Kh(t){for(;t===ml;)ml=_s[--ws],_s[ws]=null,gl=_s[--ws],_s[ws]=null;for(;t===Mr;)Mr=bt[--Tt],bt[Tt]=null,yn=bt[--Tt],bt[Tt]=null,vn=bt[--Tt],bt[Tt]=null}var wt=null,_t=null,ge=!1,zt=null;function Cy(t,e){var n=Rt(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function ig(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,wt=t,_t=nr(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,wt=t,_t=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Mr!==null?{id:vn,overflow:yn}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Rt(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,wt=t,_t=null,!0):!1;default:return!1}}function Ld(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Md(t){if(ge){var e=_t;if(e){var n=e;if(!ig(t,e)){if(Ld(t))throw Error(O(418));e=nr(n.nextSibling);var r=wt;e&&ig(t,e)?Cy(r,n):(t.flags=t.flags&-4097|2,ge=!1,wt=t)}}else{if(Ld(t))throw Error(O(418));t.flags=t.flags&-4097|2,ge=!1,wt=t}}}function og(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;wt=t}function ba(t){if(t!==wt)return!1;if(!ge)return og(t),ge=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Pd(t.type,t.memoizedProps)),e&&(e=_t)){if(Ld(t))throw by(),Error(O(418));for(;e;)Cy(t,e),e=nr(e.nextSibling)}if(og(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(O(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){_t=nr(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}_t=null}}else _t=wt?nr(t.stateNode.nextSibling):null;return!0}function by(){for(var t=_t;t;)t=nr(t.nextSibling)}function zs(){_t=wt=null,ge=!1}function Yh(t){zt===null?zt=[t]:zt.push(t)}var $N=On.ReactCurrentBatchConfig;function bi(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(O(309));var r=n.stateNode}if(!r)throw Error(O(147,t));var s=r,i=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===i?e.ref:(e=function(o){var c=s.refs;o===null?delete c[i]:c[i]=o},e._stringRef=i,e)}if(typeof t!="string")throw Error(O(284));if(!n._owner)throw Error(O(290,t))}return t}function Ta(t,e){throw t=Object.prototype.toString.call(e),Error(O(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function ag(t){var e=t._init;return e(t._payload)}function Ty(t){function e(b,x){if(t){var S=b.deletions;S===null?(b.deletions=[x],b.flags|=16):S.push(x)}}function n(b,x){if(!t)return null;for(;x!==null;)e(b,x),x=x.sibling;return null}function r(b,x){for(b=new Map;x!==null;)x.key!==null?b.set(x.key,x):b.set(x.index,x),x=x.sibling;return b}function s(b,x){return b=or(b,x),b.index=0,b.sibling=null,b}function i(b,x,S){return b.index=S,t?(S=b.alternate,S!==null?(S=S.index,S<x?(b.flags|=2,x):S):(b.flags|=2,x)):(b.flags|=1048576,x)}function o(b){return t&&b.alternate===null&&(b.flags|=2),b}function c(b,x,S,A){return x===null||x.tag!==6?(x=zu(S,b.mode,A),x.return=b,x):(x=s(x,S),x.return=b,x)}function u(b,x,S,A){var L=S.type;return L===ps?m(b,x,S.props.children,A,S.key):x!==null&&(x.elementType===L||typeof L=="object"&&L!==null&&L.$$typeof===Vn&&ag(L)===x.type)?(A=s(x,S.props),A.ref=bi(b,x,S),A.return=b,A):(A=Xa(S.type,S.key,S.props,null,b.mode,A),A.ref=bi(b,x,S),A.return=b,A)}function h(b,x,S,A){return x===null||x.tag!==4||x.stateNode.containerInfo!==S.containerInfo||x.stateNode.implementation!==S.implementation?(x=Vu(S,b.mode,A),x.return=b,x):(x=s(x,S.children||[]),x.return=b,x)}function m(b,x,S,A,L){return x===null||x.tag!==7?(x=Dr(S,b.mode,A,L),x.return=b,x):(x=s(x,S),x.return=b,x)}function p(b,x,S){if(typeof x=="string"&&x!==""||typeof x=="number")return x=zu(""+x,b.mode,S),x.return=b,x;if(typeof x=="object"&&x!==null){switch(x.$$typeof){case ya:return S=Xa(x.type,x.key,x.props,null,b.mode,S),S.ref=bi(b,null,x),S.return=b,S;case fs:return x=Vu(x,b.mode,S),x.return=b,x;case Vn:var A=x._init;return p(b,A(x._payload),S)}if(Mi(x)||Ni(x))return x=Dr(x,b.mode,S,null),x.return=b,x;Ta(b,x)}return null}function v(b,x,S,A){var L=x!==null?x.key:null;if(typeof S=="string"&&S!==""||typeof S=="number")return L!==null?null:c(b,x,""+S,A);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case ya:return S.key===L?u(b,x,S,A):null;case fs:return S.key===L?h(b,x,S,A):null;case Vn:return L=S._init,v(b,x,L(S._payload),A)}if(Mi(S)||Ni(S))return L!==null?null:m(b,x,S,A,null);Ta(b,S)}return null}function k(b,x,S,A,L){if(typeof A=="string"&&A!==""||typeof A=="number")return b=b.get(S)||null,c(x,b,""+A,L);if(typeof A=="object"&&A!==null){switch(A.$$typeof){case ya:return b=b.get(A.key===null?S:A.key)||null,u(x,b,A,L);case fs:return b=b.get(A.key===null?S:A.key)||null,h(x,b,A,L);case Vn:var F=A._init;return k(b,x,S,F(A._payload),L)}if(Mi(A)||Ni(A))return b=b.get(S)||null,m(x,b,A,L,null);Ta(x,A)}return null}function C(b,x,S,A){for(var L=null,F=null,w=x,y=x=0,_=null;w!==null&&y<S.length;y++){w.index>y?(_=w,w=null):_=w.sibling;var N=v(b,w,S[y],A);if(N===null){w===null&&(w=_);break}t&&w&&N.alternate===null&&e(b,w),x=i(N,x,y),F===null?L=N:F.sibling=N,F=N,w=_}if(y===S.length)return n(b,w),ge&&Sr(b,y),L;if(w===null){for(;y<S.length;y++)w=p(b,S[y],A),w!==null&&(x=i(w,x,y),F===null?L=w:F.sibling=w,F=w);return ge&&Sr(b,y),L}for(w=r(b,w);y<S.length;y++)_=k(w,b,y,S[y],A),_!==null&&(t&&_.alternate!==null&&w.delete(_.key===null?y:_.key),x=i(_,x,y),F===null?L=_:F.sibling=_,F=_);return t&&w.forEach(function(I){return e(b,I)}),ge&&Sr(b,y),L}function j(b,x,S,A){var L=Ni(S);if(typeof L!="function")throw Error(O(150));if(S=L.call(S),S==null)throw Error(O(151));for(var F=L=null,w=x,y=x=0,_=null,N=S.next();w!==null&&!N.done;y++,N=S.next()){w.index>y?(_=w,w=null):_=w.sibling;var I=v(b,w,N.value,A);if(I===null){w===null&&(w=_);break}t&&w&&I.alternate===null&&e(b,w),x=i(I,x,y),F===null?L=I:F.sibling=I,F=I,w=_}if(N.done)return n(b,w),ge&&Sr(b,y),L;if(w===null){for(;!N.done;y++,N=S.next())N=p(b,N.value,A),N!==null&&(x=i(N,x,y),F===null?L=N:F.sibling=N,F=N);return ge&&Sr(b,y),L}for(w=r(b,w);!N.done;y++,N=S.next())N=k(w,b,y,N.value,A),N!==null&&(t&&N.alternate!==null&&w.delete(N.key===null?y:N.key),x=i(N,x,y),F===null?L=N:F.sibling=N,F=N);return t&&w.forEach(function(T){return e(b,T)}),ge&&Sr(b,y),L}function D(b,x,S,A){if(typeof S=="object"&&S!==null&&S.type===ps&&S.key===null&&(S=S.props.children),typeof S=="object"&&S!==null){switch(S.$$typeof){case ya:e:{for(var L=S.key,F=x;F!==null;){if(F.key===L){if(L=S.type,L===ps){if(F.tag===7){n(b,F.sibling),x=s(F,S.props.children),x.return=b,b=x;break e}}else if(F.elementType===L||typeof L=="object"&&L!==null&&L.$$typeof===Vn&&ag(L)===F.type){n(b,F.sibling),x=s(F,S.props),x.ref=bi(b,F,S),x.return=b,b=x;break e}n(b,F);break}else e(b,F);F=F.sibling}S.type===ps?(x=Dr(S.props.children,b.mode,A,S.key),x.return=b,b=x):(A=Xa(S.type,S.key,S.props,null,b.mode,A),A.ref=bi(b,x,S),A.return=b,b=A)}return o(b);case fs:e:{for(F=S.key;x!==null;){if(x.key===F)if(x.tag===4&&x.stateNode.containerInfo===S.containerInfo&&x.stateNode.implementation===S.implementation){n(b,x.sibling),x=s(x,S.children||[]),x.return=b,b=x;break e}else{n(b,x);break}else e(b,x);x=x.sibling}x=Vu(S,b.mode,A),x.return=b,b=x}return o(b);case Vn:return F=S._init,D(b,x,F(S._payload),A)}if(Mi(S))return C(b,x,S,A);if(Ni(S))return j(b,x,S,A);Ta(b,S)}return typeof S=="string"&&S!==""||typeof S=="number"?(S=""+S,x!==null&&x.tag===6?(n(b,x.sibling),x=s(x,S),x.return=b,b=x):(n(b,x),x=zu(S,b.mode,A),x.return=b,b=x),o(b)):n(b,x)}return D}var Vs=Ty(!0),Ry=Ty(!1),vl=yr(null),yl=null,Es=null,Qh=null;function Xh(){Qh=Es=yl=null}function Jh(t){var e=vl.current;pe(vl),t._currentValue=e}function Fd(t,e,n){for(;t!==null;){var r=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,r!==null&&(r.childLanes|=e)):r!==null&&(r.childLanes&e)!==e&&(r.childLanes|=e),t===n)break;t=t.return}}function js(t,e){yl=t,Qh=Es=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(ht=!0),t.firstContext=null)}function At(t){var e=t._currentValue;if(Qh!==t)if(t={context:t,memoizedValue:e,next:null},Es===null){if(yl===null)throw Error(O(308));Es=t,yl.dependencies={lanes:0,firstContext:t}}else Es=Es.next=t;return e}var Rr=null;function Zh(t){Rr===null?Rr=[t]:Rr.push(t)}function jy(t,e,n,r){var s=e.interleaved;return s===null?(n.next=n,Zh(e)):(n.next=s.next,s.next=n),e.interleaved=n,bn(t,r)}function bn(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var $n=!1;function ef(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Py(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Nn(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function rr(t,e,n){var r=t.updateQueue;if(r===null)return null;if(r=r.shared,te&2){var s=r.pending;return s===null?e.next=e:(e.next=s.next,s.next=e),r.pending=e,bn(t,n)}return s=r.interleaved,s===null?(e.next=e,Zh(r)):(e.next=s.next,s.next=e),r.interleaved=e,bn(t,n)}function Wa(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,Uh(t,n)}}function lg(t,e){var n=t.updateQueue,r=t.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var s=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?s=i=o:i=i.next=o,n=n.next}while(n!==null);i===null?s=i=e:i=i.next=e}else s=i=e;n={baseState:r.baseState,firstBaseUpdate:s,lastBaseUpdate:i,shared:r.shared,effects:r.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function xl(t,e,n,r){var s=t.updateQueue;$n=!1;var i=s.firstBaseUpdate,o=s.lastBaseUpdate,c=s.shared.pending;if(c!==null){s.shared.pending=null;var u=c,h=u.next;u.next=null,o===null?i=h:o.next=h,o=u;var m=t.alternate;m!==null&&(m=m.updateQueue,c=m.lastBaseUpdate,c!==o&&(c===null?m.firstBaseUpdate=h:c.next=h,m.lastBaseUpdate=u))}if(i!==null){var p=s.baseState;o=0,m=h=u=null,c=i;do{var v=c.lane,k=c.eventTime;if((r&v)===v){m!==null&&(m=m.next={eventTime:k,lane:0,tag:c.tag,payload:c.payload,callback:c.callback,next:null});e:{var C=t,j=c;switch(v=e,k=n,j.tag){case 1:if(C=j.payload,typeof C=="function"){p=C.call(k,p,v);break e}p=C;break e;case 3:C.flags=C.flags&-65537|128;case 0:if(C=j.payload,v=typeof C=="function"?C.call(k,p,v):C,v==null)break e;p=Ee({},p,v);break e;case 2:$n=!0}}c.callback!==null&&c.lane!==0&&(t.flags|=64,v=s.effects,v===null?s.effects=[c]:v.push(c))}else k={eventTime:k,lane:v,tag:c.tag,payload:c.payload,callback:c.callback,next:null},m===null?(h=m=k,u=p):m=m.next=k,o|=v;if(c=c.next,c===null){if(c=s.shared.pending,c===null)break;v=c,c=v.next,v.next=null,s.lastBaseUpdate=v,s.shared.pending=null}}while(!0);if(m===null&&(u=p),s.baseState=u,s.firstBaseUpdate=h,s.lastBaseUpdate=m,e=s.shared.interleaved,e!==null){s=e;do o|=s.lane,s=s.next;while(s!==e)}else i===null&&(s.shared.lanes=0);Ur|=o,t.lanes=o,t.memoizedState=p}}function cg(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var r=t[e],s=r.callback;if(s!==null){if(r.callback=null,r=n,typeof s!="function")throw Error(O(191,s));s.call(r)}}}var Vo={},rn=yr(Vo),yo=yr(Vo),xo=yr(Vo);function jr(t){if(t===Vo)throw Error(O(174));return t}function tf(t,e){switch(de(xo,e),de(yo,t),de(rn,Vo),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:yd(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=yd(e,t)}pe(rn),de(rn,e)}function $s(){pe(rn),pe(yo),pe(xo)}function Ay(t){jr(xo.current);var e=jr(rn.current),n=yd(e,t.type);e!==n&&(de(yo,t),de(rn,n))}function nf(t){yo.current===t&&(pe(rn),pe(yo))}var xe=yr(0);function _l(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Ou=[];function rf(){for(var t=0;t<Ou.length;t++)Ou[t]._workInProgressVersionPrimary=null;Ou.length=0}var Ga=On.ReactCurrentDispatcher,Du=On.ReactCurrentBatchConfig,Fr=0,we=null,je=null,Me=null,wl=!1,qi=!1,_o=0,BN=0;function Ye(){throw Error(O(321))}function sf(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!qt(t[n],e[n]))return!1;return!0}function of(t,e,n,r,s,i){if(Fr=i,we=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Ga.current=t===null||t.memoizedState===null?qN:KN,t=n(r,s),qi){i=0;do{if(qi=!1,_o=0,25<=i)throw Error(O(301));i+=1,Me=je=null,e.updateQueue=null,Ga.current=YN,t=n(r,s)}while(qi)}if(Ga.current=El,e=je!==null&&je.next!==null,Fr=0,Me=je=we=null,wl=!1,e)throw Error(O(300));return t}function af(){var t=_o!==0;return _o=0,t}function Zt(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Me===null?we.memoizedState=Me=t:Me=Me.next=t,Me}function Ot(){if(je===null){var t=we.alternate;t=t!==null?t.memoizedState:null}else t=je.next;var e=Me===null?we.memoizedState:Me.next;if(e!==null)Me=e,je=t;else{if(t===null)throw Error(O(310));je=t,t={memoizedState:je.memoizedState,baseState:je.baseState,baseQueue:je.baseQueue,queue:je.queue,next:null},Me===null?we.memoizedState=Me=t:Me=Me.next=t}return Me}function wo(t,e){return typeof e=="function"?e(t):e}function Lu(t){var e=Ot(),n=e.queue;if(n===null)throw Error(O(311));n.lastRenderedReducer=t;var r=je,s=r.baseQueue,i=n.pending;if(i!==null){if(s!==null){var o=s.next;s.next=i.next,i.next=o}r.baseQueue=s=i,n.pending=null}if(s!==null){i=s.next,r=r.baseState;var c=o=null,u=null,h=i;do{var m=h.lane;if((Fr&m)===m)u!==null&&(u=u.next={lane:0,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null}),r=h.hasEagerState?h.eagerState:t(r,h.action);else{var p={lane:m,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null};u===null?(c=u=p,o=r):u=u.next=p,we.lanes|=m,Ur|=m}h=h.next}while(h!==null&&h!==i);u===null?o=r:u.next=c,qt(r,e.memoizedState)||(ht=!0),e.memoizedState=r,e.baseState=o,e.baseQueue=u,n.lastRenderedState=r}if(t=n.interleaved,t!==null){s=t;do i=s.lane,we.lanes|=i,Ur|=i,s=s.next;while(s!==t)}else s===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function Mu(t){var e=Ot(),n=e.queue;if(n===null)throw Error(O(311));n.lastRenderedReducer=t;var r=n.dispatch,s=n.pending,i=e.memoizedState;if(s!==null){n.pending=null;var o=s=s.next;do i=t(i,o.action),o=o.next;while(o!==s);qt(i,e.memoizedState)||(ht=!0),e.memoizedState=i,e.baseQueue===null&&(e.baseState=i),n.lastRenderedState=i}return[i,r]}function Oy(){}function Dy(t,e){var n=we,r=Ot(),s=e(),i=!qt(r.memoizedState,s);if(i&&(r.memoizedState=s,ht=!0),r=r.queue,lf(Fy.bind(null,n,r,t),[t]),r.getSnapshot!==e||i||Me!==null&&Me.memoizedState.tag&1){if(n.flags|=2048,Eo(9,My.bind(null,n,r,s,e),void 0,null),Ue===null)throw Error(O(349));Fr&30||Ly(n,e,s)}return s}function Ly(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=we.updateQueue,e===null?(e={lastEffect:null,stores:null},we.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function My(t,e,n,r){e.value=n,e.getSnapshot=r,Uy(e)&&zy(t)}function Fy(t,e,n){return n(function(){Uy(e)&&zy(t)})}function Uy(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!qt(t,n)}catch{return!0}}function zy(t){var e=bn(t,1);e!==null&&Wt(e,t,1,-1)}function ug(t){var e=Zt();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:wo,lastRenderedState:t},e.queue=t,t=t.dispatch=GN.bind(null,we,t),[e.memoizedState,t]}function Eo(t,e,n,r){return t={tag:t,create:e,destroy:n,deps:r,next:null},e=we.updateQueue,e===null?(e={lastEffect:null,stores:null},we.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(r=n.next,n.next=t,t.next=r,e.lastEffect=t)),t}function Vy(){return Ot().memoizedState}function qa(t,e,n,r){var s=Zt();we.flags|=t,s.memoizedState=Eo(1|e,n,void 0,r===void 0?null:r)}function lc(t,e,n,r){var s=Ot();r=r===void 0?null:r;var i=void 0;if(je!==null){var o=je.memoizedState;if(i=o.destroy,r!==null&&sf(r,o.deps)){s.memoizedState=Eo(e,n,i,r);return}}we.flags|=t,s.memoizedState=Eo(1|e,n,i,r)}function dg(t,e){return qa(8390656,8,t,e)}function lf(t,e){return lc(2048,8,t,e)}function $y(t,e){return lc(4,2,t,e)}function By(t,e){return lc(4,4,t,e)}function Hy(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Wy(t,e,n){return n=n!=null?n.concat([t]):null,lc(4,4,Hy.bind(null,e,t),n)}function cf(){}function Gy(t,e){var n=Ot();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&sf(e,r[1])?r[0]:(n.memoizedState=[t,e],t)}function qy(t,e){var n=Ot();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&sf(e,r[1])?r[0]:(t=t(),n.memoizedState=[t,e],t)}function Ky(t,e,n){return Fr&21?(qt(n,e)||(n=Zv(),we.lanes|=n,Ur|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,ht=!0),t.memoizedState=n)}function HN(t,e){var n=oe;oe=n!==0&&4>n?n:4,t(!0);var r=Du.transition;Du.transition={};try{t(!1),e()}finally{oe=n,Du.transition=r}}function Yy(){return Ot().memoizedState}function WN(t,e,n){var r=ir(t);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Qy(t))Xy(e,n);else if(n=jy(t,e,n,r),n!==null){var s=st();Wt(n,t,r,s),Jy(n,e,r)}}function GN(t,e,n){var r=ir(t),s={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Qy(t))Xy(e,s);else{var i=t.alternate;if(t.lanes===0&&(i===null||i.lanes===0)&&(i=e.lastRenderedReducer,i!==null))try{var o=e.lastRenderedState,c=i(o,n);if(s.hasEagerState=!0,s.eagerState=c,qt(c,o)){var u=e.interleaved;u===null?(s.next=s,Zh(e)):(s.next=u.next,u.next=s),e.interleaved=s;return}}catch{}finally{}n=jy(t,e,s,r),n!==null&&(s=st(),Wt(n,t,r,s),Jy(n,e,r))}}function Qy(t){var e=t.alternate;return t===we||e!==null&&e===we}function Xy(t,e){qi=wl=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function Jy(t,e,n){if(n&4194240){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,Uh(t,n)}}var El={readContext:At,useCallback:Ye,useContext:Ye,useEffect:Ye,useImperativeHandle:Ye,useInsertionEffect:Ye,useLayoutEffect:Ye,useMemo:Ye,useReducer:Ye,useRef:Ye,useState:Ye,useDebugValue:Ye,useDeferredValue:Ye,useTransition:Ye,useMutableSource:Ye,useSyncExternalStore:Ye,useId:Ye,unstable_isNewReconciler:!1},qN={readContext:At,useCallback:function(t,e){return Zt().memoizedState=[t,e===void 0?null:e],t},useContext:At,useEffect:dg,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,qa(4194308,4,Hy.bind(null,e,t),n)},useLayoutEffect:function(t,e){return qa(4194308,4,t,e)},useInsertionEffect:function(t,e){return qa(4,2,t,e)},useMemo:function(t,e){var n=Zt();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var r=Zt();return e=n!==void 0?n(e):e,r.memoizedState=r.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},r.queue=t,t=t.dispatch=WN.bind(null,we,t),[r.memoizedState,t]},useRef:function(t){var e=Zt();return t={current:t},e.memoizedState=t},useState:ug,useDebugValue:cf,useDeferredValue:function(t){return Zt().memoizedState=t},useTransition:function(){var t=ug(!1),e=t[0];return t=HN.bind(null,t[1]),Zt().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var r=we,s=Zt();if(ge){if(n===void 0)throw Error(O(407));n=n()}else{if(n=e(),Ue===null)throw Error(O(349));Fr&30||Ly(r,e,n)}s.memoizedState=n;var i={value:n,getSnapshot:e};return s.queue=i,dg(Fy.bind(null,r,i,t),[t]),r.flags|=2048,Eo(9,My.bind(null,r,i,n,e),void 0,null),n},useId:function(){var t=Zt(),e=Ue.identifierPrefix;if(ge){var n=yn,r=vn;n=(r&~(1<<32-Ht(r)-1)).toString(32)+n,e=":"+e+"R"+n,n=_o++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=BN++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},KN={readContext:At,useCallback:Gy,useContext:At,useEffect:lf,useImperativeHandle:Wy,useInsertionEffect:$y,useLayoutEffect:By,useMemo:qy,useReducer:Lu,useRef:Vy,useState:function(){return Lu(wo)},useDebugValue:cf,useDeferredValue:function(t){var e=Ot();return Ky(e,je.memoizedState,t)},useTransition:function(){var t=Lu(wo)[0],e=Ot().memoizedState;return[t,e]},useMutableSource:Oy,useSyncExternalStore:Dy,useId:Yy,unstable_isNewReconciler:!1},YN={readContext:At,useCallback:Gy,useContext:At,useEffect:lf,useImperativeHandle:Wy,useInsertionEffect:$y,useLayoutEffect:By,useMemo:qy,useReducer:Mu,useRef:Vy,useState:function(){return Mu(wo)},useDebugValue:cf,useDeferredValue:function(t){var e=Ot();return je===null?e.memoizedState=t:Ky(e,je.memoizedState,t)},useTransition:function(){var t=Mu(wo)[0],e=Ot().memoizedState;return[t,e]},useMutableSource:Oy,useSyncExternalStore:Dy,useId:Yy,unstable_isNewReconciler:!1};function Ft(t,e){if(t&&t.defaultProps){e=Ee({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function Ud(t,e,n,r){e=t.memoizedState,n=n(r,e),n=n==null?e:Ee({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var cc={isMounted:function(t){return(t=t._reactInternals)?Xr(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var r=st(),s=ir(t),i=Nn(r,s);i.payload=e,n!=null&&(i.callback=n),e=rr(t,i,s),e!==null&&(Wt(e,t,s,r),Wa(e,t,s))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var r=st(),s=ir(t),i=Nn(r,s);i.tag=1,i.payload=e,n!=null&&(i.callback=n),e=rr(t,i,s),e!==null&&(Wt(e,t,s,r),Wa(e,t,s))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=st(),r=ir(t),s=Nn(n,r);s.tag=2,e!=null&&(s.callback=e),e=rr(t,s,r),e!==null&&(Wt(e,t,r,n),Wa(e,t,r))}};function hg(t,e,n,r,s,i,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(r,i,o):e.prototype&&e.prototype.isPureReactComponent?!po(n,r)||!po(s,i):!0}function Zy(t,e,n){var r=!1,s=hr,i=e.contextType;return typeof i=="object"&&i!==null?i=At(i):(s=mt(e)?Lr:Je.current,r=e.contextTypes,i=(r=r!=null)?Us(t,s):hr),e=new e(n,i),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=cc,t.stateNode=e,e._reactInternals=t,r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=s,t.__reactInternalMemoizedMaskedChildContext=i),e}function fg(t,e,n,r){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,r),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,r),e.state!==t&&cc.enqueueReplaceState(e,e.state,null)}function zd(t,e,n,r){var s=t.stateNode;s.props=n,s.state=t.memoizedState,s.refs={},ef(t);var i=e.contextType;typeof i=="object"&&i!==null?s.context=At(i):(i=mt(e)?Lr:Je.current,s.context=Us(t,i)),s.state=t.memoizedState,i=e.getDerivedStateFromProps,typeof i=="function"&&(Ud(t,e,i,n),s.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(e=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),e!==s.state&&cc.enqueueReplaceState(s,s.state,null),xl(t,n,s,r),s.state=t.memoizedState),typeof s.componentDidMount=="function"&&(t.flags|=4194308)}function Bs(t,e){try{var n="",r=e;do n+=NE(r),r=r.return;while(r);var s=n}catch(i){s=`
Error generating stack: `+i.message+`
`+i.stack}return{value:t,source:e,stack:s,digest:null}}function Fu(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function Vd(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var QN=typeof WeakMap=="function"?WeakMap:Map;function ex(t,e,n){n=Nn(-1,n),n.tag=3,n.payload={element:null};var r=e.value;return n.callback=function(){kl||(kl=!0,Xd=r),Vd(t,e)},n}function tx(t,e,n){n=Nn(-1,n),n.tag=3;var r=t.type.getDerivedStateFromError;if(typeof r=="function"){var s=e.value;n.payload=function(){return r(s)},n.callback=function(){Vd(t,e)}}var i=t.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){Vd(t,e),typeof r!="function"&&(sr===null?sr=new Set([this]):sr.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function pg(t,e,n){var r=t.pingCache;if(r===null){r=t.pingCache=new QN;var s=new Set;r.set(e,s)}else s=r.get(e),s===void 0&&(s=new Set,r.set(e,s));s.has(n)||(s.add(n),t=uk.bind(null,t,e,n),e.then(t,t))}function mg(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function gg(t,e,n,r,s){return t.mode&1?(t.flags|=65536,t.lanes=s,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Nn(-1,1),e.tag=2,rr(n,e,1))),n.lanes|=1),t)}var XN=On.ReactCurrentOwner,ht=!1;function tt(t,e,n,r){e.child=t===null?Ry(e,null,n,r):Vs(e,t.child,n,r)}function vg(t,e,n,r,s){n=n.render;var i=e.ref;return js(e,s),r=of(t,e,n,r,i,s),n=af(),t!==null&&!ht?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~s,Tn(t,e,s)):(ge&&n&&qh(e),e.flags|=1,tt(t,e,r,s),e.child)}function yg(t,e,n,r,s){if(t===null){var i=n.type;return typeof i=="function"&&!vf(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=i,nx(t,e,i,r,s)):(t=Xa(n.type,null,r,e,e.mode,s),t.ref=e.ref,t.return=e,e.child=t)}if(i=t.child,!(t.lanes&s)){var o=i.memoizedProps;if(n=n.compare,n=n!==null?n:po,n(o,r)&&t.ref===e.ref)return Tn(t,e,s)}return e.flags|=1,t=or(i,r),t.ref=e.ref,t.return=e,e.child=t}function nx(t,e,n,r,s){if(t!==null){var i=t.memoizedProps;if(po(i,r)&&t.ref===e.ref)if(ht=!1,e.pendingProps=r=i,(t.lanes&s)!==0)t.flags&131072&&(ht=!0);else return e.lanes=t.lanes,Tn(t,e,s)}return $d(t,e,n,r,s)}function rx(t,e,n){var r=e.pendingProps,s=r.children,i=t!==null?t.memoizedState:null;if(r.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},de(ks,xt),xt|=n;else{if(!(n&1073741824))return t=i!==null?i.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,de(ks,xt),xt|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=i!==null?i.baseLanes:n,de(ks,xt),xt|=r}else i!==null?(r=i.baseLanes|n,e.memoizedState=null):r=n,de(ks,xt),xt|=r;return tt(t,e,s,n),e.child}function sx(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function $d(t,e,n,r,s){var i=mt(n)?Lr:Je.current;return i=Us(e,i),js(e,s),n=of(t,e,n,r,i,s),r=af(),t!==null&&!ht?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~s,Tn(t,e,s)):(ge&&r&&qh(e),e.flags|=1,tt(t,e,n,s),e.child)}function xg(t,e,n,r,s){if(mt(n)){var i=!0;pl(e)}else i=!1;if(js(e,s),e.stateNode===null)Ka(t,e),Zy(e,n,r),zd(e,n,r,s),r=!0;else if(t===null){var o=e.stateNode,c=e.memoizedProps;o.props=c;var u=o.context,h=n.contextType;typeof h=="object"&&h!==null?h=At(h):(h=mt(n)?Lr:Je.current,h=Us(e,h));var m=n.getDerivedStateFromProps,p=typeof m=="function"||typeof o.getSnapshotBeforeUpdate=="function";p||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(c!==r||u!==h)&&fg(e,o,r,h),$n=!1;var v=e.memoizedState;o.state=v,xl(e,r,o,s),u=e.memoizedState,c!==r||v!==u||pt.current||$n?(typeof m=="function"&&(Ud(e,n,m,r),u=e.memoizedState),(c=$n||hg(e,n,c,r,v,u,h))?(p||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=r,e.memoizedState=u),o.props=r,o.state=u,o.context=h,r=c):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),r=!1)}else{o=e.stateNode,Py(t,e),c=e.memoizedProps,h=e.type===e.elementType?c:Ft(e.type,c),o.props=h,p=e.pendingProps,v=o.context,u=n.contextType,typeof u=="object"&&u!==null?u=At(u):(u=mt(n)?Lr:Je.current,u=Us(e,u));var k=n.getDerivedStateFromProps;(m=typeof k=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(c!==p||v!==u)&&fg(e,o,r,u),$n=!1,v=e.memoizedState,o.state=v,xl(e,r,o,s);var C=e.memoizedState;c!==p||v!==C||pt.current||$n?(typeof k=="function"&&(Ud(e,n,k,r),C=e.memoizedState),(h=$n||hg(e,n,h,r,v,C,u)||!1)?(m||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,C,u),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,C,u)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||c===t.memoizedProps&&v===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||c===t.memoizedProps&&v===t.memoizedState||(e.flags|=1024),e.memoizedProps=r,e.memoizedState=C),o.props=r,o.state=C,o.context=u,r=h):(typeof o.componentDidUpdate!="function"||c===t.memoizedProps&&v===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||c===t.memoizedProps&&v===t.memoizedState||(e.flags|=1024),r=!1)}return Bd(t,e,n,r,i,s)}function Bd(t,e,n,r,s,i){sx(t,e);var o=(e.flags&128)!==0;if(!r&&!o)return s&&sg(e,n,!1),Tn(t,e,i);r=e.stateNode,XN.current=e;var c=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return e.flags|=1,t!==null&&o?(e.child=Vs(e,t.child,null,i),e.child=Vs(e,null,c,i)):tt(t,e,c,i),e.memoizedState=r.state,s&&sg(e,n,!0),e.child}function ix(t){var e=t.stateNode;e.pendingContext?rg(t,e.pendingContext,e.pendingContext!==e.context):e.context&&rg(t,e.context,!1),tf(t,e.containerInfo)}function _g(t,e,n,r,s){return zs(),Yh(s),e.flags|=256,tt(t,e,n,r),e.child}var Hd={dehydrated:null,treeContext:null,retryLane:0};function Wd(t){return{baseLanes:t,cachePool:null,transitions:null}}function ox(t,e,n){var r=e.pendingProps,s=xe.current,i=!1,o=(e.flags&128)!==0,c;if((c=o)||(c=t!==null&&t.memoizedState===null?!1:(s&2)!==0),c?(i=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(s|=1),de(xe,s&1),t===null)return Md(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=r.children,t=r.fallback,i?(r=e.mode,i=e.child,o={mode:"hidden",children:o},!(r&1)&&i!==null?(i.childLanes=0,i.pendingProps=o):i=hc(o,r,0,null),t=Dr(t,r,n,null),i.return=e,t.return=e,i.sibling=t,e.child=i,e.child.memoizedState=Wd(n),e.memoizedState=Hd,t):uf(e,o));if(s=t.memoizedState,s!==null&&(c=s.dehydrated,c!==null))return JN(t,e,o,r,c,s,n);if(i){i=r.fallback,o=e.mode,s=t.child,c=s.sibling;var u={mode:"hidden",children:r.children};return!(o&1)&&e.child!==s?(r=e.child,r.childLanes=0,r.pendingProps=u,e.deletions=null):(r=or(s,u),r.subtreeFlags=s.subtreeFlags&14680064),c!==null?i=or(c,i):(i=Dr(i,o,n,null),i.flags|=2),i.return=e,r.return=e,r.sibling=i,e.child=r,r=i,i=e.child,o=t.child.memoizedState,o=o===null?Wd(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},i.memoizedState=o,i.childLanes=t.childLanes&~n,e.memoizedState=Hd,r}return i=t.child,t=i.sibling,r=or(i,{mode:"visible",children:r.children}),!(e.mode&1)&&(r.lanes=n),r.return=e,r.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=r,e.memoizedState=null,r}function uf(t,e){return e=hc({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function Ra(t,e,n,r){return r!==null&&Yh(r),Vs(e,t.child,null,n),t=uf(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function JN(t,e,n,r,s,i,o){if(n)return e.flags&256?(e.flags&=-257,r=Fu(Error(O(422))),Ra(t,e,o,r)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(i=r.fallback,s=e.mode,r=hc({mode:"visible",children:r.children},s,0,null),i=Dr(i,s,o,null),i.flags|=2,r.return=e,i.return=e,r.sibling=i,e.child=r,e.mode&1&&Vs(e,t.child,null,o),e.child.memoizedState=Wd(o),e.memoizedState=Hd,i);if(!(e.mode&1))return Ra(t,e,o,null);if(s.data==="$!"){if(r=s.nextSibling&&s.nextSibling.dataset,r)var c=r.dgst;return r=c,i=Error(O(419)),r=Fu(i,r,void 0),Ra(t,e,o,r)}if(c=(o&t.childLanes)!==0,ht||c){if(r=Ue,r!==null){switch(o&-o){case 4:s=2;break;case 16:s=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:s=32;break;case 536870912:s=268435456;break;default:s=0}s=s&(r.suspendedLanes|o)?0:s,s!==0&&s!==i.retryLane&&(i.retryLane=s,bn(t,s),Wt(r,t,s,-1))}return gf(),r=Fu(Error(O(421))),Ra(t,e,o,r)}return s.data==="$?"?(e.flags|=128,e.child=t.child,e=dk.bind(null,t),s._reactRetry=e,null):(t=i.treeContext,_t=nr(s.nextSibling),wt=e,ge=!0,zt=null,t!==null&&(bt[Tt++]=vn,bt[Tt++]=yn,bt[Tt++]=Mr,vn=t.id,yn=t.overflow,Mr=e),e=uf(e,r.children),e.flags|=4096,e)}function wg(t,e,n){t.lanes|=e;var r=t.alternate;r!==null&&(r.lanes|=e),Fd(t.return,e,n)}function Uu(t,e,n,r,s){var i=t.memoizedState;i===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:s}:(i.isBackwards=e,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=s)}function ax(t,e,n){var r=e.pendingProps,s=r.revealOrder,i=r.tail;if(tt(t,e,r.children,n),r=xe.current,r&2)r=r&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&wg(t,n,e);else if(t.tag===19)wg(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}r&=1}if(de(xe,r),!(e.mode&1))e.memoizedState=null;else switch(s){case"forwards":for(n=e.child,s=null;n!==null;)t=n.alternate,t!==null&&_l(t)===null&&(s=n),n=n.sibling;n=s,n===null?(s=e.child,e.child=null):(s=n.sibling,n.sibling=null),Uu(e,!1,s,n,i);break;case"backwards":for(n=null,s=e.child,e.child=null;s!==null;){if(t=s.alternate,t!==null&&_l(t)===null){e.child=s;break}t=s.sibling,s.sibling=n,n=s,s=t}Uu(e,!0,n,null,i);break;case"together":Uu(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function Ka(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Tn(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Ur|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(O(153));if(e.child!==null){for(t=e.child,n=or(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=or(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function ZN(t,e,n){switch(e.tag){case 3:ix(e),zs();break;case 5:Ay(e);break;case 1:mt(e.type)&&pl(e);break;case 4:tf(e,e.stateNode.containerInfo);break;case 10:var r=e.type._context,s=e.memoizedProps.value;de(vl,r._currentValue),r._currentValue=s;break;case 13:if(r=e.memoizedState,r!==null)return r.dehydrated!==null?(de(xe,xe.current&1),e.flags|=128,null):n&e.child.childLanes?ox(t,e,n):(de(xe,xe.current&1),t=Tn(t,e,n),t!==null?t.sibling:null);de(xe,xe.current&1);break;case 19:if(r=(n&e.childLanes)!==0,t.flags&128){if(r)return ax(t,e,n);e.flags|=128}if(s=e.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),de(xe,xe.current),r)break;return null;case 22:case 23:return e.lanes=0,rx(t,e,n)}return Tn(t,e,n)}var lx,Gd,cx,ux;lx=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Gd=function(){};cx=function(t,e,n,r){var s=t.memoizedProps;if(s!==r){t=e.stateNode,jr(rn.current);var i=null;switch(n){case"input":s=pd(t,s),r=pd(t,r),i=[];break;case"select":s=Ee({},s,{value:void 0}),r=Ee({},r,{value:void 0}),i=[];break;case"textarea":s=vd(t,s),r=vd(t,r),i=[];break;default:typeof s.onClick!="function"&&typeof r.onClick=="function"&&(t.onclick=hl)}xd(n,r);var o;n=null;for(h in s)if(!r.hasOwnProperty(h)&&s.hasOwnProperty(h)&&s[h]!=null)if(h==="style"){var c=s[h];for(o in c)c.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else h!=="dangerouslySetInnerHTML"&&h!=="children"&&h!=="suppressContentEditableWarning"&&h!=="suppressHydrationWarning"&&h!=="autoFocus"&&(oo.hasOwnProperty(h)?i||(i=[]):(i=i||[]).push(h,null));for(h in r){var u=r[h];if(c=s!=null?s[h]:void 0,r.hasOwnProperty(h)&&u!==c&&(u!=null||c!=null))if(h==="style")if(c){for(o in c)!c.hasOwnProperty(o)||u&&u.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in u)u.hasOwnProperty(o)&&c[o]!==u[o]&&(n||(n={}),n[o]=u[o])}else n||(i||(i=[]),i.push(h,n)),n=u;else h==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,c=c?c.__html:void 0,u!=null&&c!==u&&(i=i||[]).push(h,u)):h==="children"?typeof u!="string"&&typeof u!="number"||(i=i||[]).push(h,""+u):h!=="suppressContentEditableWarning"&&h!=="suppressHydrationWarning"&&(oo.hasOwnProperty(h)?(u!=null&&h==="onScroll"&&fe("scroll",t),i||c===u||(i=[])):(i=i||[]).push(h,u))}n&&(i=i||[]).push("style",n);var h=i;(e.updateQueue=h)&&(e.flags|=4)}};ux=function(t,e,n,r){n!==r&&(e.flags|=4)};function Ti(t,e){if(!ge)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:r.sibling=null}}function Qe(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,r=0;if(e)for(var s=t.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags&14680064,r|=s.flags&14680064,s.return=t,s=s.sibling;else for(s=t.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags,r|=s.flags,s.return=t,s=s.sibling;return t.subtreeFlags|=r,t.childLanes=n,e}function ek(t,e,n){var r=e.pendingProps;switch(Kh(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Qe(e),null;case 1:return mt(e.type)&&fl(),Qe(e),null;case 3:return r=e.stateNode,$s(),pe(pt),pe(Je),rf(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(t===null||t.child===null)&&(ba(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,zt!==null&&(eh(zt),zt=null))),Gd(t,e),Qe(e),null;case 5:nf(e);var s=jr(xo.current);if(n=e.type,t!==null&&e.stateNode!=null)cx(t,e,n,r,s),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!r){if(e.stateNode===null)throw Error(O(166));return Qe(e),null}if(t=jr(rn.current),ba(e)){r=e.stateNode,n=e.type;var i=e.memoizedProps;switch(r[en]=e,r[vo]=i,t=(e.mode&1)!==0,n){case"dialog":fe("cancel",r),fe("close",r);break;case"iframe":case"object":case"embed":fe("load",r);break;case"video":case"audio":for(s=0;s<Ui.length;s++)fe(Ui[s],r);break;case"source":fe("error",r);break;case"img":case"image":case"link":fe("error",r),fe("load",r);break;case"details":fe("toggle",r);break;case"input":Rm(r,i),fe("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},fe("invalid",r);break;case"textarea":Pm(r,i),fe("invalid",r)}xd(n,i),s=null;for(var o in i)if(i.hasOwnProperty(o)){var c=i[o];o==="children"?typeof c=="string"?r.textContent!==c&&(i.suppressHydrationWarning!==!0&&Ca(r.textContent,c,t),s=["children",c]):typeof c=="number"&&r.textContent!==""+c&&(i.suppressHydrationWarning!==!0&&Ca(r.textContent,c,t),s=["children",""+c]):oo.hasOwnProperty(o)&&c!=null&&o==="onScroll"&&fe("scroll",r)}switch(n){case"input":xa(r),jm(r,i,!0);break;case"textarea":xa(r),Am(r);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(r.onclick=hl)}r=s,e.updateQueue=r,r!==null&&(e.flags|=4)}else{o=s.nodeType===9?s:s.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=Fv(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof r.is=="string"?t=o.createElement(n,{is:r.is}):(t=o.createElement(n),n==="select"&&(o=t,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):t=o.createElementNS(t,n),t[en]=e,t[vo]=r,lx(t,e,!1,!1),e.stateNode=t;e:{switch(o=_d(n,r),n){case"dialog":fe("cancel",t),fe("close",t),s=r;break;case"iframe":case"object":case"embed":fe("load",t),s=r;break;case"video":case"audio":for(s=0;s<Ui.length;s++)fe(Ui[s],t);s=r;break;case"source":fe("error",t),s=r;break;case"img":case"image":case"link":fe("error",t),fe("load",t),s=r;break;case"details":fe("toggle",t),s=r;break;case"input":Rm(t,r),s=pd(t,r),fe("invalid",t);break;case"option":s=r;break;case"select":t._wrapperState={wasMultiple:!!r.multiple},s=Ee({},r,{value:void 0}),fe("invalid",t);break;case"textarea":Pm(t,r),s=vd(t,r),fe("invalid",t);break;default:s=r}xd(n,s),c=s;for(i in c)if(c.hasOwnProperty(i)){var u=c[i];i==="style"?Vv(t,u):i==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&Uv(t,u)):i==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&ao(t,u):typeof u=="number"&&ao(t,""+u):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(oo.hasOwnProperty(i)?u!=null&&i==="onScroll"&&fe("scroll",t):u!=null&&Ah(t,i,u,o))}switch(n){case"input":xa(t),jm(t,r,!1);break;case"textarea":xa(t),Am(t);break;case"option":r.value!=null&&t.setAttribute("value",""+dr(r.value));break;case"select":t.multiple=!!r.multiple,i=r.value,i!=null?Cs(t,!!r.multiple,i,!1):r.defaultValue!=null&&Cs(t,!!r.multiple,r.defaultValue,!0);break;default:typeof s.onClick=="function"&&(t.onclick=hl)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Qe(e),null;case 6:if(t&&e.stateNode!=null)ux(t,e,t.memoizedProps,r);else{if(typeof r!="string"&&e.stateNode===null)throw Error(O(166));if(n=jr(xo.current),jr(rn.current),ba(e)){if(r=e.stateNode,n=e.memoizedProps,r[en]=e,(i=r.nodeValue!==n)&&(t=wt,t!==null))switch(t.tag){case 3:Ca(r.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&Ca(r.nodeValue,n,(t.mode&1)!==0)}i&&(e.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[en]=e,e.stateNode=r}return Qe(e),null;case 13:if(pe(xe),r=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(ge&&_t!==null&&e.mode&1&&!(e.flags&128))by(),zs(),e.flags|=98560,i=!1;else if(i=ba(e),r!==null&&r.dehydrated!==null){if(t===null){if(!i)throw Error(O(318));if(i=e.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(O(317));i[en]=e}else zs(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Qe(e),i=!1}else zt!==null&&(eh(zt),zt=null),i=!0;if(!i)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(r=r!==null,r!==(t!==null&&t.memoizedState!==null)&&r&&(e.child.flags|=8192,e.mode&1&&(t===null||xe.current&1?Ae===0&&(Ae=3):gf())),e.updateQueue!==null&&(e.flags|=4),Qe(e),null);case 4:return $s(),Gd(t,e),t===null&&mo(e.stateNode.containerInfo),Qe(e),null;case 10:return Jh(e.type._context),Qe(e),null;case 17:return mt(e.type)&&fl(),Qe(e),null;case 19:if(pe(xe),i=e.memoizedState,i===null)return Qe(e),null;if(r=(e.flags&128)!==0,o=i.rendering,o===null)if(r)Ti(i,!1);else{if(Ae!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=_l(t),o!==null){for(e.flags|=128,Ti(i,!1),r=o.updateQueue,r!==null&&(e.updateQueue=r,e.flags|=4),e.subtreeFlags=0,r=n,n=e.child;n!==null;)i=n,t=r,i.flags&=14680066,o=i.alternate,o===null?(i.childLanes=0,i.lanes=t,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=o.childLanes,i.lanes=o.lanes,i.child=o.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=o.memoizedProps,i.memoizedState=o.memoizedState,i.updateQueue=o.updateQueue,i.type=o.type,t=o.dependencies,i.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return de(xe,xe.current&1|2),e.child}t=t.sibling}i.tail!==null&&Ie()>Hs&&(e.flags|=128,r=!0,Ti(i,!1),e.lanes=4194304)}else{if(!r)if(t=_l(o),t!==null){if(e.flags|=128,r=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),Ti(i,!0),i.tail===null&&i.tailMode==="hidden"&&!o.alternate&&!ge)return Qe(e),null}else 2*Ie()-i.renderingStartTime>Hs&&n!==1073741824&&(e.flags|=128,r=!0,Ti(i,!1),e.lanes=4194304);i.isBackwards?(o.sibling=e.child,e.child=o):(n=i.last,n!==null?n.sibling=o:e.child=o,i.last=o)}return i.tail!==null?(e=i.tail,i.rendering=e,i.tail=e.sibling,i.renderingStartTime=Ie(),e.sibling=null,n=xe.current,de(xe,r?n&1|2:n&1),e):(Qe(e),null);case 22:case 23:return mf(),r=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==r&&(e.flags|=8192),r&&e.mode&1?xt&1073741824&&(Qe(e),e.subtreeFlags&6&&(e.flags|=8192)):Qe(e),null;case 24:return null;case 25:return null}throw Error(O(156,e.tag))}function tk(t,e){switch(Kh(e),e.tag){case 1:return mt(e.type)&&fl(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return $s(),pe(pt),pe(Je),rf(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return nf(e),null;case 13:if(pe(xe),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(O(340));zs()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return pe(xe),null;case 4:return $s(),null;case 10:return Jh(e.type._context),null;case 22:case 23:return mf(),null;case 24:return null;default:return null}}var ja=!1,Xe=!1,nk=typeof WeakSet=="function"?WeakSet:Set,V=null;function Ns(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){Ne(t,e,r)}else n.current=null}function qd(t,e,n){try{n()}catch(r){Ne(t,e,r)}}var Eg=!1;function rk(t,e){if(Rd=cl,t=my(),Gh(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var s=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var o=0,c=-1,u=-1,h=0,m=0,p=t,v=null;t:for(;;){for(var k;p!==n||s!==0&&p.nodeType!==3||(c=o+s),p!==i||r!==0&&p.nodeType!==3||(u=o+r),p.nodeType===3&&(o+=p.nodeValue.length),(k=p.firstChild)!==null;)v=p,p=k;for(;;){if(p===t)break t;if(v===n&&++h===s&&(c=o),v===i&&++m===r&&(u=o),(k=p.nextSibling)!==null)break;p=v,v=p.parentNode}p=k}n=c===-1||u===-1?null:{start:c,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(jd={focusedElem:t,selectionRange:n},cl=!1,V=e;V!==null;)if(e=V,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,V=t;else for(;V!==null;){e=V;try{var C=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(C!==null){var j=C.memoizedProps,D=C.memoizedState,b=e.stateNode,x=b.getSnapshotBeforeUpdate(e.elementType===e.type?j:Ft(e.type,j),D);b.__reactInternalSnapshotBeforeUpdate=x}break;case 3:var S=e.stateNode.containerInfo;S.nodeType===1?S.textContent="":S.nodeType===9&&S.documentElement&&S.removeChild(S.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(O(163))}}catch(A){Ne(e,e.return,A)}if(t=e.sibling,t!==null){t.return=e.return,V=t;break}V=e.return}return C=Eg,Eg=!1,C}function Ki(t,e,n){var r=e.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var s=r=r.next;do{if((s.tag&t)===t){var i=s.destroy;s.destroy=void 0,i!==void 0&&qd(e,n,i)}s=s.next}while(s!==r)}}function uc(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var r=n.create;n.destroy=r()}n=n.next}while(n!==e)}}function Kd(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function dx(t){var e=t.alternate;e!==null&&(t.alternate=null,dx(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[en],delete e[vo],delete e[Od],delete e[UN],delete e[zN])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function hx(t){return t.tag===5||t.tag===3||t.tag===4}function Ng(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||hx(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Yd(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=hl));else if(r!==4&&(t=t.child,t!==null))for(Yd(t,e,n),t=t.sibling;t!==null;)Yd(t,e,n),t=t.sibling}function Qd(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(r!==4&&(t=t.child,t!==null))for(Qd(t,e,n),t=t.sibling;t!==null;)Qd(t,e,n),t=t.sibling}var Ve=null,Ut=!1;function Un(t,e,n){for(n=n.child;n!==null;)fx(t,e,n),n=n.sibling}function fx(t,e,n){if(nn&&typeof nn.onCommitFiberUnmount=="function")try{nn.onCommitFiberUnmount(nc,n)}catch{}switch(n.tag){case 5:Xe||Ns(n,e);case 6:var r=Ve,s=Ut;Ve=null,Un(t,e,n),Ve=r,Ut=s,Ve!==null&&(Ut?(t=Ve,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Ve.removeChild(n.stateNode));break;case 18:Ve!==null&&(Ut?(t=Ve,n=n.stateNode,t.nodeType===8?Pu(t.parentNode,n):t.nodeType===1&&Pu(t,n),ho(t)):Pu(Ve,n.stateNode));break;case 4:r=Ve,s=Ut,Ve=n.stateNode.containerInfo,Ut=!0,Un(t,e,n),Ve=r,Ut=s;break;case 0:case 11:case 14:case 15:if(!Xe&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){s=r=r.next;do{var i=s,o=i.destroy;i=i.tag,o!==void 0&&(i&2||i&4)&&qd(n,e,o),s=s.next}while(s!==r)}Un(t,e,n);break;case 1:if(!Xe&&(Ns(n,e),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(c){Ne(n,e,c)}Un(t,e,n);break;case 21:Un(t,e,n);break;case 22:n.mode&1?(Xe=(r=Xe)||n.memoizedState!==null,Un(t,e,n),Xe=r):Un(t,e,n);break;default:Un(t,e,n)}}function kg(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new nk),e.forEach(function(r){var s=hk.bind(null,t,r);n.has(r)||(n.add(r),r.then(s,s))})}}function Mt(t,e){var n=e.deletions;if(n!==null)for(var r=0;r<n.length;r++){var s=n[r];try{var i=t,o=e,c=o;e:for(;c!==null;){switch(c.tag){case 5:Ve=c.stateNode,Ut=!1;break e;case 3:Ve=c.stateNode.containerInfo,Ut=!0;break e;case 4:Ve=c.stateNode.containerInfo,Ut=!0;break e}c=c.return}if(Ve===null)throw Error(O(160));fx(i,o,s),Ve=null,Ut=!1;var u=s.alternate;u!==null&&(u.return=null),s.return=null}catch(h){Ne(s,e,h)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)px(e,t),e=e.sibling}function px(t,e){var n=t.alternate,r=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Mt(e,t),Jt(t),r&4){try{Ki(3,t,t.return),uc(3,t)}catch(j){Ne(t,t.return,j)}try{Ki(5,t,t.return)}catch(j){Ne(t,t.return,j)}}break;case 1:Mt(e,t),Jt(t),r&512&&n!==null&&Ns(n,n.return);break;case 5:if(Mt(e,t),Jt(t),r&512&&n!==null&&Ns(n,n.return),t.flags&32){var s=t.stateNode;try{ao(s,"")}catch(j){Ne(t,t.return,j)}}if(r&4&&(s=t.stateNode,s!=null)){var i=t.memoizedProps,o=n!==null?n.memoizedProps:i,c=t.type,u=t.updateQueue;if(t.updateQueue=null,u!==null)try{c==="input"&&i.type==="radio"&&i.name!=null&&Lv(s,i),_d(c,o);var h=_d(c,i);for(o=0;o<u.length;o+=2){var m=u[o],p=u[o+1];m==="style"?Vv(s,p):m==="dangerouslySetInnerHTML"?Uv(s,p):m==="children"?ao(s,p):Ah(s,m,p,h)}switch(c){case"input":md(s,i);break;case"textarea":Mv(s,i);break;case"select":var v=s._wrapperState.wasMultiple;s._wrapperState.wasMultiple=!!i.multiple;var k=i.value;k!=null?Cs(s,!!i.multiple,k,!1):v!==!!i.multiple&&(i.defaultValue!=null?Cs(s,!!i.multiple,i.defaultValue,!0):Cs(s,!!i.multiple,i.multiple?[]:"",!1))}s[vo]=i}catch(j){Ne(t,t.return,j)}}break;case 6:if(Mt(e,t),Jt(t),r&4){if(t.stateNode===null)throw Error(O(162));s=t.stateNode,i=t.memoizedProps;try{s.nodeValue=i}catch(j){Ne(t,t.return,j)}}break;case 3:if(Mt(e,t),Jt(t),r&4&&n!==null&&n.memoizedState.isDehydrated)try{ho(e.containerInfo)}catch(j){Ne(t,t.return,j)}break;case 4:Mt(e,t),Jt(t);break;case 13:Mt(e,t),Jt(t),s=t.child,s.flags&8192&&(i=s.memoizedState!==null,s.stateNode.isHidden=i,!i||s.alternate!==null&&s.alternate.memoizedState!==null||(ff=Ie())),r&4&&kg(t);break;case 22:if(m=n!==null&&n.memoizedState!==null,t.mode&1?(Xe=(h=Xe)||m,Mt(e,t),Xe=h):Mt(e,t),Jt(t),r&8192){if(h=t.memoizedState!==null,(t.stateNode.isHidden=h)&&!m&&t.mode&1)for(V=t,m=t.child;m!==null;){for(p=V=m;V!==null;){switch(v=V,k=v.child,v.tag){case 0:case 11:case 14:case 15:Ki(4,v,v.return);break;case 1:Ns(v,v.return);var C=v.stateNode;if(typeof C.componentWillUnmount=="function"){r=v,n=v.return;try{e=r,C.props=e.memoizedProps,C.state=e.memoizedState,C.componentWillUnmount()}catch(j){Ne(r,n,j)}}break;case 5:Ns(v,v.return);break;case 22:if(v.memoizedState!==null){Ig(p);continue}}k!==null?(k.return=v,V=k):Ig(p)}m=m.sibling}e:for(m=null,p=t;;){if(p.tag===5){if(m===null){m=p;try{s=p.stateNode,h?(i=s.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(c=p.stateNode,u=p.memoizedProps.style,o=u!=null&&u.hasOwnProperty("display")?u.display:null,c.style.display=zv("display",o))}catch(j){Ne(t,t.return,j)}}}else if(p.tag===6){if(m===null)try{p.stateNode.nodeValue=h?"":p.memoizedProps}catch(j){Ne(t,t.return,j)}}else if((p.tag!==22&&p.tag!==23||p.memoizedState===null||p===t)&&p.child!==null){p.child.return=p,p=p.child;continue}if(p===t)break e;for(;p.sibling===null;){if(p.return===null||p.return===t)break e;m===p&&(m=null),p=p.return}m===p&&(m=null),p.sibling.return=p.return,p=p.sibling}}break;case 19:Mt(e,t),Jt(t),r&4&&kg(t);break;case 21:break;default:Mt(e,t),Jt(t)}}function Jt(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(hx(n)){var r=n;break e}n=n.return}throw Error(O(160))}switch(r.tag){case 5:var s=r.stateNode;r.flags&32&&(ao(s,""),r.flags&=-33);var i=Ng(t);Qd(t,i,s);break;case 3:case 4:var o=r.stateNode.containerInfo,c=Ng(t);Yd(t,c,o);break;default:throw Error(O(161))}}catch(u){Ne(t,t.return,u)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function sk(t,e,n){V=t,mx(t)}function mx(t,e,n){for(var r=(t.mode&1)!==0;V!==null;){var s=V,i=s.child;if(s.tag===22&&r){var o=s.memoizedState!==null||ja;if(!o){var c=s.alternate,u=c!==null&&c.memoizedState!==null||Xe;c=ja;var h=Xe;if(ja=o,(Xe=u)&&!h)for(V=s;V!==null;)o=V,u=o.child,o.tag===22&&o.memoizedState!==null?Cg(s):u!==null?(u.return=o,V=u):Cg(s);for(;i!==null;)V=i,mx(i),i=i.sibling;V=s,ja=c,Xe=h}Sg(t)}else s.subtreeFlags&8772&&i!==null?(i.return=s,V=i):Sg(t)}}function Sg(t){for(;V!==null;){var e=V;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:Xe||uc(5,e);break;case 1:var r=e.stateNode;if(e.flags&4&&!Xe)if(n===null)r.componentDidMount();else{var s=e.elementType===e.type?n.memoizedProps:Ft(e.type,n.memoizedProps);r.componentDidUpdate(s,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=e.updateQueue;i!==null&&cg(e,i,r);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}cg(e,o,n)}break;case 5:var c=e.stateNode;if(n===null&&e.flags&4){n=c;var u=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var h=e.alternate;if(h!==null){var m=h.memoizedState;if(m!==null){var p=m.dehydrated;p!==null&&ho(p)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(O(163))}Xe||e.flags&512&&Kd(e)}catch(v){Ne(e,e.return,v)}}if(e===t){V=null;break}if(n=e.sibling,n!==null){n.return=e.return,V=n;break}V=e.return}}function Ig(t){for(;V!==null;){var e=V;if(e===t){V=null;break}var n=e.sibling;if(n!==null){n.return=e.return,V=n;break}V=e.return}}function Cg(t){for(;V!==null;){var e=V;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{uc(4,e)}catch(u){Ne(e,n,u)}break;case 1:var r=e.stateNode;if(typeof r.componentDidMount=="function"){var s=e.return;try{r.componentDidMount()}catch(u){Ne(e,s,u)}}var i=e.return;try{Kd(e)}catch(u){Ne(e,i,u)}break;case 5:var o=e.return;try{Kd(e)}catch(u){Ne(e,o,u)}}}catch(u){Ne(e,e.return,u)}if(e===t){V=null;break}var c=e.sibling;if(c!==null){c.return=e.return,V=c;break}V=e.return}}var ik=Math.ceil,Nl=On.ReactCurrentDispatcher,df=On.ReactCurrentOwner,Pt=On.ReactCurrentBatchConfig,te=0,Ue=null,be=null,Be=0,xt=0,ks=yr(0),Ae=0,No=null,Ur=0,dc=0,hf=0,Yi=null,ct=null,ff=0,Hs=1/0,mn=null,kl=!1,Xd=null,sr=null,Pa=!1,Xn=null,Sl=0,Qi=0,Jd=null,Ya=-1,Qa=0;function st(){return te&6?Ie():Ya!==-1?Ya:Ya=Ie()}function ir(t){return t.mode&1?te&2&&Be!==0?Be&-Be:$N.transition!==null?(Qa===0&&(Qa=Zv()),Qa):(t=oe,t!==0||(t=window.event,t=t===void 0?16:oy(t.type)),t):1}function Wt(t,e,n,r){if(50<Qi)throw Qi=0,Jd=null,Error(O(185));Fo(t,n,r),(!(te&2)||t!==Ue)&&(t===Ue&&(!(te&2)&&(dc|=n),Ae===4&&Wn(t,Be)),gt(t,r),n===1&&te===0&&!(e.mode&1)&&(Hs=Ie()+500,ac&&xr()))}function gt(t,e){var n=t.callbackNode;$E(t,e);var r=ll(t,t===Ue?Be:0);if(r===0)n!==null&&Lm(n),t.callbackNode=null,t.callbackPriority=0;else if(e=r&-r,t.callbackPriority!==e){if(n!=null&&Lm(n),e===1)t.tag===0?VN(bg.bind(null,t)):Sy(bg.bind(null,t)),MN(function(){!(te&6)&&xr()}),n=null;else{switch(ey(r)){case 1:n=Fh;break;case 4:n=Xv;break;case 16:n=al;break;case 536870912:n=Jv;break;default:n=al}n=Nx(n,gx.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function gx(t,e){if(Ya=-1,Qa=0,te&6)throw Error(O(327));var n=t.callbackNode;if(Ps()&&t.callbackNode!==n)return null;var r=ll(t,t===Ue?Be:0);if(r===0)return null;if(r&30||r&t.expiredLanes||e)e=Il(t,r);else{e=r;var s=te;te|=2;var i=yx();(Ue!==t||Be!==e)&&(mn=null,Hs=Ie()+500,Or(t,e));do try{lk();break}catch(c){vx(t,c)}while(!0);Xh(),Nl.current=i,te=s,be!==null?e=0:(Ue=null,Be=0,e=Ae)}if(e!==0){if(e===2&&(s=Sd(t),s!==0&&(r=s,e=Zd(t,s))),e===1)throw n=No,Or(t,0),Wn(t,r),gt(t,Ie()),n;if(e===6)Wn(t,r);else{if(s=t.current.alternate,!(r&30)&&!ok(s)&&(e=Il(t,r),e===2&&(i=Sd(t),i!==0&&(r=i,e=Zd(t,i))),e===1))throw n=No,Or(t,0),Wn(t,r),gt(t,Ie()),n;switch(t.finishedWork=s,t.finishedLanes=r,e){case 0:case 1:throw Error(O(345));case 2:Ir(t,ct,mn);break;case 3:if(Wn(t,r),(r&130023424)===r&&(e=ff+500-Ie(),10<e)){if(ll(t,0)!==0)break;if(s=t.suspendedLanes,(s&r)!==r){st(),t.pingedLanes|=t.suspendedLanes&s;break}t.timeoutHandle=Ad(Ir.bind(null,t,ct,mn),e);break}Ir(t,ct,mn);break;case 4:if(Wn(t,r),(r&4194240)===r)break;for(e=t.eventTimes,s=-1;0<r;){var o=31-Ht(r);i=1<<o,o=e[o],o>s&&(s=o),r&=~i}if(r=s,r=Ie()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*ik(r/1960))-r,10<r){t.timeoutHandle=Ad(Ir.bind(null,t,ct,mn),r);break}Ir(t,ct,mn);break;case 5:Ir(t,ct,mn);break;default:throw Error(O(329))}}}return gt(t,Ie()),t.callbackNode===n?gx.bind(null,t):null}function Zd(t,e){var n=Yi;return t.current.memoizedState.isDehydrated&&(Or(t,e).flags|=256),t=Il(t,e),t!==2&&(e=ct,ct=n,e!==null&&eh(e)),t}function eh(t){ct===null?ct=t:ct.push.apply(ct,t)}function ok(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var s=n[r],i=s.getSnapshot;s=s.value;try{if(!qt(i(),s))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Wn(t,e){for(e&=~hf,e&=~dc,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-Ht(e),r=1<<n;t[n]=-1,e&=~r}}function bg(t){if(te&6)throw Error(O(327));Ps();var e=ll(t,0);if(!(e&1))return gt(t,Ie()),null;var n=Il(t,e);if(t.tag!==0&&n===2){var r=Sd(t);r!==0&&(e=r,n=Zd(t,r))}if(n===1)throw n=No,Or(t,0),Wn(t,e),gt(t,Ie()),n;if(n===6)throw Error(O(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,Ir(t,ct,mn),gt(t,Ie()),null}function pf(t,e){var n=te;te|=1;try{return t(e)}finally{te=n,te===0&&(Hs=Ie()+500,ac&&xr())}}function zr(t){Xn!==null&&Xn.tag===0&&!(te&6)&&Ps();var e=te;te|=1;var n=Pt.transition,r=oe;try{if(Pt.transition=null,oe=1,t)return t()}finally{oe=r,Pt.transition=n,te=e,!(te&6)&&xr()}}function mf(){xt=ks.current,pe(ks)}function Or(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,LN(n)),be!==null)for(n=be.return;n!==null;){var r=n;switch(Kh(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&fl();break;case 3:$s(),pe(pt),pe(Je),rf();break;case 5:nf(r);break;case 4:$s();break;case 13:pe(xe);break;case 19:pe(xe);break;case 10:Jh(r.type._context);break;case 22:case 23:mf()}n=n.return}if(Ue=t,be=t=or(t.current,null),Be=xt=e,Ae=0,No=null,hf=dc=Ur=0,ct=Yi=null,Rr!==null){for(e=0;e<Rr.length;e++)if(n=Rr[e],r=n.interleaved,r!==null){n.interleaved=null;var s=r.next,i=n.pending;if(i!==null){var o=i.next;i.next=s,r.next=o}n.pending=r}Rr=null}return t}function vx(t,e){do{var n=be;try{if(Xh(),Ga.current=El,wl){for(var r=we.memoizedState;r!==null;){var s=r.queue;s!==null&&(s.pending=null),r=r.next}wl=!1}if(Fr=0,Me=je=we=null,qi=!1,_o=0,df.current=null,n===null||n.return===null){Ae=1,No=e,be=null;break}e:{var i=t,o=n.return,c=n,u=e;if(e=Be,c.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var h=u,m=c,p=m.tag;if(!(m.mode&1)&&(p===0||p===11||p===15)){var v=m.alternate;v?(m.updateQueue=v.updateQueue,m.memoizedState=v.memoizedState,m.lanes=v.lanes):(m.updateQueue=null,m.memoizedState=null)}var k=mg(o);if(k!==null){k.flags&=-257,gg(k,o,c,i,e),k.mode&1&&pg(i,h,e),e=k,u=h;var C=e.updateQueue;if(C===null){var j=new Set;j.add(u),e.updateQueue=j}else C.add(u);break e}else{if(!(e&1)){pg(i,h,e),gf();break e}u=Error(O(426))}}else if(ge&&c.mode&1){var D=mg(o);if(D!==null){!(D.flags&65536)&&(D.flags|=256),gg(D,o,c,i,e),Yh(Bs(u,c));break e}}i=u=Bs(u,c),Ae!==4&&(Ae=2),Yi===null?Yi=[i]:Yi.push(i),i=o;do{switch(i.tag){case 3:i.flags|=65536,e&=-e,i.lanes|=e;var b=ex(i,u,e);lg(i,b);break e;case 1:c=u;var x=i.type,S=i.stateNode;if(!(i.flags&128)&&(typeof x.getDerivedStateFromError=="function"||S!==null&&typeof S.componentDidCatch=="function"&&(sr===null||!sr.has(S)))){i.flags|=65536,e&=-e,i.lanes|=e;var A=tx(i,c,e);lg(i,A);break e}}i=i.return}while(i!==null)}_x(n)}catch(L){e=L,be===n&&n!==null&&(be=n=n.return);continue}break}while(!0)}function yx(){var t=Nl.current;return Nl.current=El,t===null?El:t}function gf(){(Ae===0||Ae===3||Ae===2)&&(Ae=4),Ue===null||!(Ur&268435455)&&!(dc&268435455)||Wn(Ue,Be)}function Il(t,e){var n=te;te|=2;var r=yx();(Ue!==t||Be!==e)&&(mn=null,Or(t,e));do try{ak();break}catch(s){vx(t,s)}while(!0);if(Xh(),te=n,Nl.current=r,be!==null)throw Error(O(261));return Ue=null,Be=0,Ae}function ak(){for(;be!==null;)xx(be)}function lk(){for(;be!==null&&!AE();)xx(be)}function xx(t){var e=Ex(t.alternate,t,xt);t.memoizedProps=t.pendingProps,e===null?_x(t):be=e,df.current=null}function _x(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=tk(n,e),n!==null){n.flags&=32767,be=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Ae=6,be=null;return}}else if(n=ek(n,e,xt),n!==null){be=n;return}if(e=e.sibling,e!==null){be=e;return}be=e=t}while(e!==null);Ae===0&&(Ae=5)}function Ir(t,e,n){var r=oe,s=Pt.transition;try{Pt.transition=null,oe=1,ck(t,e,n,r)}finally{Pt.transition=s,oe=r}return null}function ck(t,e,n,r){do Ps();while(Xn!==null);if(te&6)throw Error(O(327));n=t.finishedWork;var s=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(O(177));t.callbackNode=null,t.callbackPriority=0;var i=n.lanes|n.childLanes;if(BE(t,i),t===Ue&&(be=Ue=null,Be=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Pa||(Pa=!0,Nx(al,function(){return Ps(),null})),i=(n.flags&15990)!==0,n.subtreeFlags&15990||i){i=Pt.transition,Pt.transition=null;var o=oe;oe=1;var c=te;te|=4,df.current=null,rk(t,n),px(n,t),TN(jd),cl=!!Rd,jd=Rd=null,t.current=n,sk(n),OE(),te=c,oe=o,Pt.transition=i}else t.current=n;if(Pa&&(Pa=!1,Xn=t,Sl=s),i=t.pendingLanes,i===0&&(sr=null),ME(n.stateNode),gt(t,Ie()),e!==null)for(r=t.onRecoverableError,n=0;n<e.length;n++)s=e[n],r(s.value,{componentStack:s.stack,digest:s.digest});if(kl)throw kl=!1,t=Xd,Xd=null,t;return Sl&1&&t.tag!==0&&Ps(),i=t.pendingLanes,i&1?t===Jd?Qi++:(Qi=0,Jd=t):Qi=0,xr(),null}function Ps(){if(Xn!==null){var t=ey(Sl),e=Pt.transition,n=oe;try{if(Pt.transition=null,oe=16>t?16:t,Xn===null)var r=!1;else{if(t=Xn,Xn=null,Sl=0,te&6)throw Error(O(331));var s=te;for(te|=4,V=t.current;V!==null;){var i=V,o=i.child;if(V.flags&16){var c=i.deletions;if(c!==null){for(var u=0;u<c.length;u++){var h=c[u];for(V=h;V!==null;){var m=V;switch(m.tag){case 0:case 11:case 15:Ki(8,m,i)}var p=m.child;if(p!==null)p.return=m,V=p;else for(;V!==null;){m=V;var v=m.sibling,k=m.return;if(dx(m),m===h){V=null;break}if(v!==null){v.return=k,V=v;break}V=k}}}var C=i.alternate;if(C!==null){var j=C.child;if(j!==null){C.child=null;do{var D=j.sibling;j.sibling=null,j=D}while(j!==null)}}V=i}}if(i.subtreeFlags&2064&&o!==null)o.return=i,V=o;else e:for(;V!==null;){if(i=V,i.flags&2048)switch(i.tag){case 0:case 11:case 15:Ki(9,i,i.return)}var b=i.sibling;if(b!==null){b.return=i.return,V=b;break e}V=i.return}}var x=t.current;for(V=x;V!==null;){o=V;var S=o.child;if(o.subtreeFlags&2064&&S!==null)S.return=o,V=S;else e:for(o=x;V!==null;){if(c=V,c.flags&2048)try{switch(c.tag){case 0:case 11:case 15:uc(9,c)}}catch(L){Ne(c,c.return,L)}if(c===o){V=null;break e}var A=c.sibling;if(A!==null){A.return=c.return,V=A;break e}V=c.return}}if(te=s,xr(),nn&&typeof nn.onPostCommitFiberRoot=="function")try{nn.onPostCommitFiberRoot(nc,t)}catch{}r=!0}return r}finally{oe=n,Pt.transition=e}}return!1}function Tg(t,e,n){e=Bs(n,e),e=ex(t,e,1),t=rr(t,e,1),e=st(),t!==null&&(Fo(t,1,e),gt(t,e))}function Ne(t,e,n){if(t.tag===3)Tg(t,t,n);else for(;e!==null;){if(e.tag===3){Tg(e,t,n);break}else if(e.tag===1){var r=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(sr===null||!sr.has(r))){t=Bs(n,t),t=tx(e,t,1),e=rr(e,t,1),t=st(),e!==null&&(Fo(e,1,t),gt(e,t));break}}e=e.return}}function uk(t,e,n){var r=t.pingCache;r!==null&&r.delete(e),e=st(),t.pingedLanes|=t.suspendedLanes&n,Ue===t&&(Be&n)===n&&(Ae===4||Ae===3&&(Be&130023424)===Be&&500>Ie()-ff?Or(t,0):hf|=n),gt(t,e)}function wx(t,e){e===0&&(t.mode&1?(e=Ea,Ea<<=1,!(Ea&130023424)&&(Ea=4194304)):e=1);var n=st();t=bn(t,e),t!==null&&(Fo(t,e,n),gt(t,n))}function dk(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),wx(t,n)}function hk(t,e){var n=0;switch(t.tag){case 13:var r=t.stateNode,s=t.memoizedState;s!==null&&(n=s.retryLane);break;case 19:r=t.stateNode;break;default:throw Error(O(314))}r!==null&&r.delete(e),wx(t,n)}var Ex;Ex=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||pt.current)ht=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return ht=!1,ZN(t,e,n);ht=!!(t.flags&131072)}else ht=!1,ge&&e.flags&1048576&&Iy(e,gl,e.index);switch(e.lanes=0,e.tag){case 2:var r=e.type;Ka(t,e),t=e.pendingProps;var s=Us(e,Je.current);js(e,n),s=of(null,e,r,t,s,n);var i=af();return e.flags|=1,typeof s=="object"&&s!==null&&typeof s.render=="function"&&s.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,mt(r)?(i=!0,pl(e)):i=!1,e.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,ef(e),s.updater=cc,e.stateNode=s,s._reactInternals=e,zd(e,r,t,n),e=Bd(null,e,r,!0,i,n)):(e.tag=0,ge&&i&&qh(e),tt(null,e,s,n),e=e.child),e;case 16:r=e.elementType;e:{switch(Ka(t,e),t=e.pendingProps,s=r._init,r=s(r._payload),e.type=r,s=e.tag=pk(r),t=Ft(r,t),s){case 0:e=$d(null,e,r,t,n);break e;case 1:e=xg(null,e,r,t,n);break e;case 11:e=vg(null,e,r,t,n);break e;case 14:e=yg(null,e,r,Ft(r.type,t),n);break e}throw Error(O(306,r,""))}return e;case 0:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:Ft(r,s),$d(t,e,r,s,n);case 1:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:Ft(r,s),xg(t,e,r,s,n);case 3:e:{if(ix(e),t===null)throw Error(O(387));r=e.pendingProps,i=e.memoizedState,s=i.element,Py(t,e),xl(e,r,null,n);var o=e.memoizedState;if(r=o.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=i,e.memoizedState=i,e.flags&256){s=Bs(Error(O(423)),e),e=_g(t,e,r,n,s);break e}else if(r!==s){s=Bs(Error(O(424)),e),e=_g(t,e,r,n,s);break e}else for(_t=nr(e.stateNode.containerInfo.firstChild),wt=e,ge=!0,zt=null,n=Ry(e,null,r,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(zs(),r===s){e=Tn(t,e,n);break e}tt(t,e,r,n)}e=e.child}return e;case 5:return Ay(e),t===null&&Md(e),r=e.type,s=e.pendingProps,i=t!==null?t.memoizedProps:null,o=s.children,Pd(r,s)?o=null:i!==null&&Pd(r,i)&&(e.flags|=32),sx(t,e),tt(t,e,o,n),e.child;case 6:return t===null&&Md(e),null;case 13:return ox(t,e,n);case 4:return tf(e,e.stateNode.containerInfo),r=e.pendingProps,t===null?e.child=Vs(e,null,r,n):tt(t,e,r,n),e.child;case 11:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:Ft(r,s),vg(t,e,r,s,n);case 7:return tt(t,e,e.pendingProps,n),e.child;case 8:return tt(t,e,e.pendingProps.children,n),e.child;case 12:return tt(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(r=e.type._context,s=e.pendingProps,i=e.memoizedProps,o=s.value,de(vl,r._currentValue),r._currentValue=o,i!==null)if(qt(i.value,o)){if(i.children===s.children&&!pt.current){e=Tn(t,e,n);break e}}else for(i=e.child,i!==null&&(i.return=e);i!==null;){var c=i.dependencies;if(c!==null){o=i.child;for(var u=c.firstContext;u!==null;){if(u.context===r){if(i.tag===1){u=Nn(-1,n&-n),u.tag=2;var h=i.updateQueue;if(h!==null){h=h.shared;var m=h.pending;m===null?u.next=u:(u.next=m.next,m.next=u),h.pending=u}}i.lanes|=n,u=i.alternate,u!==null&&(u.lanes|=n),Fd(i.return,n,e),c.lanes|=n;break}u=u.next}}else if(i.tag===10)o=i.type===e.type?null:i.child;else if(i.tag===18){if(o=i.return,o===null)throw Error(O(341));o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),Fd(o,n,e),o=i.sibling}else o=i.child;if(o!==null)o.return=i;else for(o=i;o!==null;){if(o===e){o=null;break}if(i=o.sibling,i!==null){i.return=o.return,o=i;break}o=o.return}i=o}tt(t,e,s.children,n),e=e.child}return e;case 9:return s=e.type,r=e.pendingProps.children,js(e,n),s=At(s),r=r(s),e.flags|=1,tt(t,e,r,n),e.child;case 14:return r=e.type,s=Ft(r,e.pendingProps),s=Ft(r.type,s),yg(t,e,r,s,n);case 15:return nx(t,e,e.type,e.pendingProps,n);case 17:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:Ft(r,s),Ka(t,e),e.tag=1,mt(r)?(t=!0,pl(e)):t=!1,js(e,n),Zy(e,r,s),zd(e,r,s,n),Bd(null,e,r,!0,t,n);case 19:return ax(t,e,n);case 22:return rx(t,e,n)}throw Error(O(156,e.tag))};function Nx(t,e){return Qv(t,e)}function fk(t,e,n,r){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Rt(t,e,n,r){return new fk(t,e,n,r)}function vf(t){return t=t.prototype,!(!t||!t.isReactComponent)}function pk(t){if(typeof t=="function")return vf(t)?1:0;if(t!=null){if(t=t.$$typeof,t===Dh)return 11;if(t===Lh)return 14}return 2}function or(t,e){var n=t.alternate;return n===null?(n=Rt(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function Xa(t,e,n,r,s,i){var o=2;if(r=t,typeof t=="function")vf(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case ps:return Dr(n.children,s,i,e);case Oh:o=8,s|=8;break;case ud:return t=Rt(12,n,e,s|2),t.elementType=ud,t.lanes=i,t;case dd:return t=Rt(13,n,e,s),t.elementType=dd,t.lanes=i,t;case hd:return t=Rt(19,n,e,s),t.elementType=hd,t.lanes=i,t;case Av:return hc(n,s,i,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case jv:o=10;break e;case Pv:o=9;break e;case Dh:o=11;break e;case Lh:o=14;break e;case Vn:o=16,r=null;break e}throw Error(O(130,t==null?t:typeof t,""))}return e=Rt(o,n,e,s),e.elementType=t,e.type=r,e.lanes=i,e}function Dr(t,e,n,r){return t=Rt(7,t,r,e),t.lanes=n,t}function hc(t,e,n,r){return t=Rt(22,t,r,e),t.elementType=Av,t.lanes=n,t.stateNode={isHidden:!1},t}function zu(t,e,n){return t=Rt(6,t,null,e),t.lanes=n,t}function Vu(t,e,n){return e=Rt(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function mk(t,e,n,r,s){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=wu(0),this.expirationTimes=wu(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=wu(0),this.identifierPrefix=r,this.onRecoverableError=s,this.mutableSourceEagerHydrationData=null}function yf(t,e,n,r,s,i,o,c,u){return t=new mk(t,e,n,c,u),e===1?(e=1,i===!0&&(e|=8)):e=0,i=Rt(3,null,null,e),t.current=i,i.stateNode=t,i.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},ef(i),t}function gk(t,e,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:fs,key:r==null?null:""+r,children:t,containerInfo:e,implementation:n}}function kx(t){if(!t)return hr;t=t._reactInternals;e:{if(Xr(t)!==t||t.tag!==1)throw Error(O(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(mt(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(O(171))}if(t.tag===1){var n=t.type;if(mt(n))return ky(t,n,e)}return e}function Sx(t,e,n,r,s,i,o,c,u){return t=yf(n,r,!0,t,s,i,o,c,u),t.context=kx(null),n=t.current,r=st(),s=ir(n),i=Nn(r,s),i.callback=e??null,rr(n,i,s),t.current.lanes=s,Fo(t,s,r),gt(t,r),t}function fc(t,e,n,r){var s=e.current,i=st(),o=ir(s);return n=kx(n),e.context===null?e.context=n:e.pendingContext=n,e=Nn(i,o),e.payload={element:t},r=r===void 0?null:r,r!==null&&(e.callback=r),t=rr(s,e,o),t!==null&&(Wt(t,s,o,i),Wa(t,s,o)),o}function Cl(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Rg(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function xf(t,e){Rg(t,e),(t=t.alternate)&&Rg(t,e)}function vk(){return null}var Ix=typeof reportError=="function"?reportError:function(t){console.error(t)};function _f(t){this._internalRoot=t}pc.prototype.render=_f.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(O(409));fc(t,e,null,null)};pc.prototype.unmount=_f.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;zr(function(){fc(null,t,null,null)}),e[Cn]=null}};function pc(t){this._internalRoot=t}pc.prototype.unstable_scheduleHydration=function(t){if(t){var e=ry();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Hn.length&&e!==0&&e<Hn[n].priority;n++);Hn.splice(n,0,t),n===0&&iy(t)}};function wf(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function mc(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function jg(){}function yk(t,e,n,r,s){if(s){if(typeof r=="function"){var i=r;r=function(){var h=Cl(o);i.call(h)}}var o=Sx(e,r,t,0,null,!1,!1,"",jg);return t._reactRootContainer=o,t[Cn]=o.current,mo(t.nodeType===8?t.parentNode:t),zr(),o}for(;s=t.lastChild;)t.removeChild(s);if(typeof r=="function"){var c=r;r=function(){var h=Cl(u);c.call(h)}}var u=yf(t,0,!1,null,null,!1,!1,"",jg);return t._reactRootContainer=u,t[Cn]=u.current,mo(t.nodeType===8?t.parentNode:t),zr(function(){fc(e,u,n,r)}),u}function gc(t,e,n,r,s){var i=n._reactRootContainer;if(i){var o=i;if(typeof s=="function"){var c=s;s=function(){var u=Cl(o);c.call(u)}}fc(e,o,t,s)}else o=yk(n,e,t,s,r);return Cl(o)}ty=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=Fi(e.pendingLanes);n!==0&&(Uh(e,n|1),gt(e,Ie()),!(te&6)&&(Hs=Ie()+500,xr()))}break;case 13:zr(function(){var r=bn(t,1);if(r!==null){var s=st();Wt(r,t,1,s)}}),xf(t,1)}};zh=function(t){if(t.tag===13){var e=bn(t,134217728);if(e!==null){var n=st();Wt(e,t,134217728,n)}xf(t,134217728)}};ny=function(t){if(t.tag===13){var e=ir(t),n=bn(t,e);if(n!==null){var r=st();Wt(n,t,e,r)}xf(t,e)}};ry=function(){return oe};sy=function(t,e){var n=oe;try{return oe=t,e()}finally{oe=n}};Ed=function(t,e,n){switch(e){case"input":if(md(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var r=n[e];if(r!==t&&r.form===t.form){var s=oc(r);if(!s)throw Error(O(90));Dv(r),md(r,s)}}}break;case"textarea":Mv(t,n);break;case"select":e=n.value,e!=null&&Cs(t,!!n.multiple,e,!1)}};Hv=pf;Wv=zr;var xk={usingClientEntryPoint:!1,Events:[zo,ys,oc,$v,Bv,pf]},Ri={findFiberByHostInstance:Tr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},_k={bundleType:Ri.bundleType,version:Ri.version,rendererPackageName:Ri.rendererPackageName,rendererConfig:Ri.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:On.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=Kv(t),t===null?null:t.stateNode},findFiberByHostInstance:Ri.findFiberByHostInstance||vk,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Aa=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Aa.isDisabled&&Aa.supportsFiber)try{nc=Aa.inject(_k),nn=Aa}catch{}}St.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=xk;St.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!wf(e))throw Error(O(200));return gk(t,e,null,n)};St.createRoot=function(t,e){if(!wf(t))throw Error(O(299));var n=!1,r="",s=Ix;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(r=e.identifierPrefix),e.onRecoverableError!==void 0&&(s=e.onRecoverableError)),e=yf(t,1,!1,null,null,n,!1,r,s),t[Cn]=e.current,mo(t.nodeType===8?t.parentNode:t),new _f(e)};St.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(O(188)):(t=Object.keys(t).join(","),Error(O(268,t)));return t=Kv(e),t=t===null?null:t.stateNode,t};St.flushSync=function(t){return zr(t)};St.hydrate=function(t,e,n){if(!mc(e))throw Error(O(200));return gc(null,t,e,!0,n)};St.hydrateRoot=function(t,e,n){if(!wf(t))throw Error(O(405));var r=n!=null&&n.hydratedSources||null,s=!1,i="",o=Ix;if(n!=null&&(n.unstable_strictMode===!0&&(s=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=Sx(e,null,t,1,n??null,s,!1,i,o),t[Cn]=e.current,mo(t),r)for(t=0;t<r.length;t++)n=r[t],s=n._getVersion,s=s(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,s]:e.mutableSourceEagerHydrationData.push(n,s);return new pc(e)};St.render=function(t,e,n){if(!mc(e))throw Error(O(200));return gc(null,t,e,!1,n)};St.unmountComponentAtNode=function(t){if(!mc(t))throw Error(O(40));return t._reactRootContainer?(zr(function(){gc(null,null,t,!1,function(){t._reactRootContainer=null,t[Cn]=null})}),!0):!1};St.unstable_batchedUpdates=pf;St.unstable_renderSubtreeIntoContainer=function(t,e,n,r){if(!mc(n))throw Error(O(200));if(t==null||t._reactInternals===void 0)throw Error(O(38));return gc(t,e,n,!1,r)};St.version="18.3.1-next-f1338f8080-20240426";function Cx(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Cx)}catch(t){console.error(t)}}Cx(),Cv.exports=St;var wk=Cv.exports,Pg=wk;ld.createRoot=Pg.createRoot,ld.hydrateRoot=Pg.hydrateRoot;/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ek=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),bx=(...t)=>t.filter((e,n,r)=>!!e&&r.indexOf(e)===n).join(" ");/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Nk={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kk=B.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:n=2,absoluteStrokeWidth:r,className:s="",children:i,iconNode:o,...c},u)=>B.createElement("svg",{ref:u,...Nk,width:e,height:e,stroke:t,strokeWidth:r?Number(n)*24/Number(e):n,className:bx("lucide",s),...c},[...o.map(([h,m])=>B.createElement(h,m)),...Array.isArray(i)?i:[i]]));/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q=(t,e)=>{const n=B.forwardRef(({className:r,...s},i)=>B.createElement(kk,{ref:i,iconNode:e,className:bx(`lucide-${Ek(t)}`,r),...s}));return n.displayName=`${t}`,n};/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ni=q("Activity",[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $o=q("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sk=q("Award",[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ik=q("BookOpen",[["path",{d:"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z",key:"vv98re"}],["path",{d:"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",key:"1cyq3y"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ck=q("Briefcase",[["path",{d:"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",key:"jecpp"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2",key:"i6l2r4"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const an=q("Bus",[["path",{d:"M8 6v6",key:"18i7km"}],["path",{d:"M15 6v6",key:"1sg6z9"}],["path",{d:"M2 12h19.6",key:"de5uta"}],["path",{d:"M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3",key:"1wwztk"}],["circle",{cx:"7",cy:"18",r:"2",key:"19iecd"}],["path",{d:"M9 18h5",key:"lrx6i"}],["circle",{cx:"16",cy:"18",r:"2",key:"1v4tcr"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vc=q("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bl=q("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ef=q("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rn=q("CircleCheck",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bk=q("CircleUser",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}],["path",{d:"M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662",key:"154egf"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tk=q("ClipboardCheck",[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1",key:"tgr4d6"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",key:"116196"}],["path",{d:"m9 14 2 2 4-4",key:"df797q"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tx=q("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rk=q("Database",[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jk=q("History",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M12 7v5l4 2",key:"1fdv2h"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pk=q("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ak=q("LayoutDashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vr=q("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rx=q("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ok=q("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yc=q("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xc=q("MapPin",[["path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z",key:"2oe9fu"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dk=q("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lk=q("MousePointer2",[["path",{d:"m4 4 7.07 17 2.51-7.39L21 11.07z",key:"1vqm48"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mk=q("PenLine",[["path",{d:"M12 20h9",key:"t2du7b"}],["path",{d:"M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",key:"1ykcvy"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jx=q("Phone",[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Px=q("Save",[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fk=q("Scale",[["path",{d:"m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z",key:"7g6ntu"}],["path",{d:"m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z",key:"ijws7r"}],["path",{d:"M7 21h10",key:"1b0cd5"}],["path",{d:"M12 3v18",key:"108xh3"}],["path",{d:"M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2",key:"3gwbw2"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Uk=q("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zk=q("ShieldAlert",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"M12 8v4",key:"1got3b"}],["path",{d:"M12 16h.01",key:"1drbdi"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ax=q("ShieldCheck",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vk=q("ShieldQuestion",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3",key:"mhlwft"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $k=q("Smartphone",[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2",key:"1yt0o3"}],["path",{d:"M12 18h.01",key:"mhygvu"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ag=q("Star",[["polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",key:"8f66p6"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nf=q("Ticket",[["path",{d:"M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",key:"qn84l0"}],["path",{d:"M13 5v2",key:"dyzc3o"}],["path",{d:"M13 17v2",key:"1ont0d"}],["path",{d:"M13 11v2",key:"1wjjxi"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _c=q("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ko=q("TrendingUp",[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wc=q("UserPlus",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"19",x2:"19",y1:"8",y2:"14",key:"1bvyxn"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11",key:"1shjgl"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kf=q("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fr=q("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ec=q("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);var Og={};/**
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
 */const Ox={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
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
 */const M=function(t,e){if(!t)throw ri(e)},ri=function(t){return new Error("Firebase Database ("+Ox.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
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
 */const Dx=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},Bk=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=t[n++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=t[n++],o=t[n++],c=t[n++],u=((s&7)<<18|(i&63)<<12|(o&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const i=t[n++],o=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},Sf={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const i=t[s],o=s+1<t.length,c=o?t[s+1]:0,u=s+2<t.length,h=u?t[s+2]:0,m=i>>2,p=(i&3)<<4|c>>4;let v=(c&15)<<2|h>>6,k=h&63;u||(k=64,o||(v=64)),r.push(n[m],n[p],n[v],n[k])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Dx(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):Bk(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const i=n[t.charAt(s++)],c=s<t.length?n[t.charAt(s)]:0;++s;const h=s<t.length?n[t.charAt(s)]:64;++s;const p=s<t.length?n[t.charAt(s)]:64;if(++s,i==null||c==null||h==null||p==null)throw new Hk;const v=i<<2|c>>4;if(r.push(v),h!==64){const k=c<<4&240|h>>2;if(r.push(k),p!==64){const C=h<<6&192|p;r.push(C)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class Hk extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Lx=function(t){const e=Dx(t);return Sf.encodeByteArray(e,!0)},Tl=function(t){return Lx(t).replace(/\./g,"")},Rl=function(t){try{return Sf.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function Wk(t){return Mx(void 0,t)}function Mx(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!Gk(n)||(t[n]=Mx(t[n],e[n]));return t}function Gk(t){return t!=="__proto__"}/**
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
 */function qk(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Kk=()=>qk().__FIREBASE_DEFAULTS__,Yk=()=>{if(typeof process>"u"||typeof Og>"u")return;const t=Og.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Qk=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Rl(t[1]);return e&&JSON.parse(e)},If=()=>{try{return Kk()||Yk()||Qk()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Fx=t=>{var e,n;return(n=(e=If())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},Ux=t=>{const e=Fx(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},zx=()=>{var t;return(t=If())===null||t===void 0?void 0:t.config},Vx=t=>{var e;return(e=If())===null||e===void 0?void 0:e[`_${t}`]};/**
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
 */class si{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
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
 */function $x(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",s=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},t);return[Tl(JSON.stringify(n)),Tl(JSON.stringify(o)),""].join(".")}/**
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
 */function ot(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Cf(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ot())}function Xk(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Bx(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function Hx(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Jk(){const t=ot();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function Zk(){return Ox.NODE_ADMIN===!0}function Wx(){try{return typeof indexedDB=="object"}catch{return!1}}function Gx(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(n){e(n)}})}function eS(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
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
 */const tS="FirebaseError";class Qt extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=tS,Object.setPrototypeOf(this,Qt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Jr.prototype.create)}}class Jr{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?nS(i,r):"Error",c=`${this.serviceName}: ${o} (${s}).`;return new Qt(s,c,r)}}function nS(t,e){return t.replace(rS,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const rS=/\{\$([^}]+)}/g;/**
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
 */function So(t){return JSON.parse(t)}function Pe(t){return JSON.stringify(t)}/**
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
 */const qx=function(t){let e={},n={},r={},s="";try{const i=t.split(".");e=So(Rl(i[0])||""),n=So(Rl(i[1])||""),s=i[2],r=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:r,signature:s}},sS=function(t){const e=qx(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},iS=function(t){const e=qx(t).claims;return typeof e=="object"&&e.admin===!0};/**
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
 */function Xt(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function $r(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function th(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function jl(t,e,n){const r={};for(const s in t)Object.prototype.hasOwnProperty.call(t,s)&&(r[s]=e.call(n,t[s],s,t));return r}function Io(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const i=t[s],o=e[s];if(Dg(i)&&Dg(o)){if(!Io(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function Dg(t){return t!==null&&typeof t=="object"}/**
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
 */function ii(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function zi(t){const e={};return t.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function Vi(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}/**
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
 */class oS{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const r=this.W_;if(typeof e=="string")for(let p=0;p<16;p++)r[p]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let p=0;p<16;p++)r[p]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let p=16;p<80;p++){const v=r[p-3]^r[p-8]^r[p-14]^r[p-16];r[p]=(v<<1|v>>>31)&4294967295}let s=this.chain_[0],i=this.chain_[1],o=this.chain_[2],c=this.chain_[3],u=this.chain_[4],h,m;for(let p=0;p<80;p++){p<40?p<20?(h=c^i&(o^c),m=1518500249):(h=i^o^c,m=1859775393):p<60?(h=i&o|c&(i|o),m=2400959708):(h=i^o^c,m=3395469782);const v=(s<<5|s>>>27)+h+u+m+r[p]&4294967295;u=c,c=o,o=(i<<30|i>>>2)&4294967295,i=s,s=v}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+i&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+c&4294967295,this.chain_[4]=this.chain_[4]+u&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const r=n-this.blockSize;let s=0;const i=this.buf_;let o=this.inbuf_;for(;s<n;){if(o===0)for(;s<=r;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<n;)if(i[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(i),o=0;break}}else for(;s<n;)if(i[o]=e[s],++o,++s,o===this.blockSize){this.compress_(i),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=n&255,n/=256;this.compress_(this.buf_);let r=0;for(let s=0;s<5;s++)for(let i=24;i>=0;i-=8)e[r]=this.chain_[s]>>i&255,++r;return e}}function aS(t,e){const n=new lS(t,e);return n.subscribe.bind(n)}class lS{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let s;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");cS(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:r},s.next===void 0&&(s.next=$u),s.error===void 0&&(s.error=$u),s.complete===void 0&&(s.complete=$u);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function cS(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function $u(){}function Nc(t,e){return`${t} failed: ${e} argument `}/**
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
 */const uS=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);if(s>=55296&&s<=56319){const i=s-55296;r++,M(r<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(r)-56320;s=65536+(i<<10)+o}s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):s<65536?(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},kc=function(t){let e=0;for(let n=0;n<t.length;n++){const r=t.charCodeAt(n);r<128?e++:r<2048?e+=2:r>=55296&&r<=56319?(e+=4,n++):e+=3}return e};/**
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
 */const dS=1e3,hS=2,fS=4*60*60*1e3,pS=.5;function Lg(t,e=dS,n=hS){const r=e*Math.pow(n,t),s=Math.round(pS*r*(Math.random()-.5)*2);return Math.min(fS,r+s)}/**
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
 */const Cr="[DEFAULT]";/**
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
 */class mS{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new si;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(vS(e))try{this.getOrInitializeService({instanceIdentifier:Cr})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=Cr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Cr){return this.instances.has(e)}getOptions(e=Cr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&o.resolve(s)}return s}onInit(e,n){var r;const s=this.normalizeInstanceIdentifier(n),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const o=this.instances.get(s);return o&&e(o,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:gS(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Cr){return this.component?this.component.multipleInstances?e:Cr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function gS(t){return t===Cr?void 0:t}function vS(t){return t.instantiationMode==="EAGER"}/**
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
 */class yS{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new mS(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var se;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(se||(se={}));const xS={debug:se.DEBUG,verbose:se.VERBOSE,info:se.INFO,warn:se.WARN,error:se.ERROR,silent:se.SILENT},_S=se.INFO,wS={[se.DEBUG]:"log",[se.VERBOSE]:"log",[se.INFO]:"info",[se.WARN]:"warn",[se.ERROR]:"error"},ES=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=wS[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Bo{constructor(e){this.name=e,this._logLevel=_S,this._logHandler=ES,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in se))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?xS[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,se.DEBUG,...e),this._logHandler(this,se.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,se.VERBOSE,...e),this._logHandler(this,se.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,se.INFO,...e),this._logHandler(this,se.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,se.WARN,...e),this._logHandler(this,se.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,se.ERROR,...e),this._logHandler(this,se.ERROR,...e)}}const NS=(t,e)=>e.some(n=>t instanceof n);let Mg,Fg;function kS(){return Mg||(Mg=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function SS(){return Fg||(Fg=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Kx=new WeakMap,nh=new WeakMap,Yx=new WeakMap,Bu=new WeakMap,bf=new WeakMap;function IS(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(ar(t.result)),s()},o=()=>{r(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&Kx.set(n,t)}).catch(()=>{}),bf.set(e,t),e}function CS(t){if(nh.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),s()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});nh.set(t,e)}let rh={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return nh.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Yx.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return ar(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function bS(t){rh=t(rh)}function TS(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(Hu(this),e,...n);return Yx.set(r,e.sort?e.sort():[e]),ar(r)}:SS().includes(t)?function(...e){return t.apply(Hu(this),e),ar(Kx.get(this))}:function(...e){return ar(t.apply(Hu(this),e))}}function RS(t){return typeof t=="function"?TS(t):(t instanceof IDBTransaction&&CS(t),NS(t,kS())?new Proxy(t,rh):t)}function ar(t){if(t instanceof IDBRequest)return IS(t);if(Bu.has(t))return Bu.get(t);const e=RS(t);return e!==t&&(Bu.set(t,e),bf.set(e,t)),e}const Hu=t=>bf.get(t);function Qx(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(t,e),c=ar(o);return r&&o.addEventListener("upgradeneeded",u=>{r(ar(o.result),u.oldVersion,u.newVersion,ar(o.transaction),u)}),n&&o.addEventListener("blocked",u=>n(u.oldVersion,u.newVersion,u)),c.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}const jS=["get","getKey","getAll","getAllKeys","count"],PS=["put","add","delete","clear"],Wu=new Map;function Ug(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Wu.get(e))return Wu.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=PS.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||jS.includes(n)))return;const i=async function(o,...c){const u=this.transaction(o,s?"readwrite":"readonly");let h=u.store;return r&&(h=h.index(c.shift())),(await Promise.all([h[n](...c),s&&u.done]))[0]};return Wu.set(e,i),i}bS(t=>({...t,get:(e,n,r)=>Ug(e,n)||t.get(e,n,r),has:(e,n)=>!!Ug(e,n)||t.has(e,n)}));/**
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
 */class AS{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(OS(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function OS(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const sh="@firebase/app",zg="0.10.13";/**
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
 */const jn=new Bo("@firebase/app"),DS="@firebase/app-compat",LS="@firebase/analytics-compat",MS="@firebase/analytics",FS="@firebase/app-check-compat",US="@firebase/app-check",zS="@firebase/auth",VS="@firebase/auth-compat",$S="@firebase/database",BS="@firebase/data-connect",HS="@firebase/database-compat",WS="@firebase/functions",GS="@firebase/functions-compat",qS="@firebase/installations",KS="@firebase/installations-compat",YS="@firebase/messaging",QS="@firebase/messaging-compat",XS="@firebase/performance",JS="@firebase/performance-compat",ZS="@firebase/remote-config",eI="@firebase/remote-config-compat",tI="@firebase/storage",nI="@firebase/storage-compat",rI="@firebase/firestore",sI="@firebase/vertexai-preview",iI="@firebase/firestore-compat",oI="firebase",aI="10.14.1";/**
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
 */const ih="[DEFAULT]",lI={[sh]:"fire-core",[DS]:"fire-core-compat",[MS]:"fire-analytics",[LS]:"fire-analytics-compat",[US]:"fire-app-check",[FS]:"fire-app-check-compat",[zS]:"fire-auth",[VS]:"fire-auth-compat",[$S]:"fire-rtdb",[BS]:"fire-data-connect",[HS]:"fire-rtdb-compat",[WS]:"fire-fn",[GS]:"fire-fn-compat",[qS]:"fire-iid",[KS]:"fire-iid-compat",[YS]:"fire-fcm",[QS]:"fire-fcm-compat",[XS]:"fire-perf",[JS]:"fire-perf-compat",[ZS]:"fire-rc",[eI]:"fire-rc-compat",[tI]:"fire-gcs",[nI]:"fire-gcs-compat",[rI]:"fire-fst",[iI]:"fire-fst-compat",[sI]:"fire-vertex","fire-js":"fire-js",[oI]:"fire-js-all"};/**
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
 */const Pl=new Map,cI=new Map,oh=new Map;function Vg(t,e){try{t.container.addComponent(e)}catch(n){jn.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Kt(t){const e=t.name;if(oh.has(e))return jn.debug(`There were multiple attempts to register component ${e}.`),!1;oh.set(e,t);for(const n of Pl.values())Vg(n,t);for(const n of cI.values())Vg(n,t);return!0}function _r(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function tn(t){return t.settings!==void 0}/**
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
 */const uI={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},lr=new Jr("app","Firebase",uI);/**
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
 */class dI{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Dt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw lr.create("app-deleted",{appName:this._name})}}/**
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
 */const Zr=aI;function Xx(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:ih,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw lr.create("bad-app-name",{appName:String(s)});if(n||(n=zx()),!n)throw lr.create("no-options");const i=Pl.get(s);if(i){if(Io(n,i.options)&&Io(r,i.config))return i;throw lr.create("duplicate-app",{appName:s})}const o=new yS(s);for(const u of oh.values())o.addComponent(u);const c=new dI(n,r,o);return Pl.set(s,c),c}function Sc(t=ih){const e=Pl.get(t);if(!e&&t===ih&&zx())return Xx();if(!e)throw lr.create("no-app",{appName:t});return e}function vt(t,e,n){var r;let s=(r=lI[t])!==null&&r!==void 0?r:t;n&&(s+=`-${n}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const c=[`Unable to register library "${s}" with version "${e}":`];i&&c.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&c.push("and"),o&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),jn.warn(c.join(" "));return}Kt(new Dt(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const hI="firebase-heartbeat-database",fI=1,Co="firebase-heartbeat-store";let Gu=null;function Jx(){return Gu||(Gu=Qx(hI,fI,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Co)}catch(n){console.warn(n)}}}}).catch(t=>{throw lr.create("idb-open",{originalErrorMessage:t.message})})),Gu}async function pI(t){try{const n=(await Jx()).transaction(Co),r=await n.objectStore(Co).get(Zx(t));return await n.done,r}catch(e){if(e instanceof Qt)jn.warn(e.message);else{const n=lr.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});jn.warn(n.message)}}}async function $g(t,e){try{const r=(await Jx()).transaction(Co,"readwrite");await r.objectStore(Co).put(e,Zx(t)),await r.done}catch(n){if(n instanceof Qt)jn.warn(n.message);else{const r=lr.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});jn.warn(r.message)}}}function Zx(t){return`${t.name}!${t.options.appId}`}/**
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
 */const mI=1024,gI=30*24*60*60*1e3;class vI{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new xI(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Bg();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i)?void 0:(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const c=new Date(o.date).valueOf();return Date.now()-c<=gI}),this._storage.overwrite(this._heartbeatsCache))}catch(r){jn.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Bg(),{heartbeatsToSend:r,unsentEntries:s}=yI(this._heartbeatsCache.heartbeats),i=Tl(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(n){return jn.warn(n),""}}}function Bg(){return new Date().toISOString().substring(0,10)}function yI(t,e=mI){const n=[];let r=t.slice();for(const s of t){const i=n.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),Hg(n)>e){i.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),Hg(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class xI{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Wx()?Gx().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await pI(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return $g(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return $g(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Hg(t){return Tl(JSON.stringify({version:2,heartbeats:t})).length}/**
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
 */function _I(t){Kt(new Dt("platform-logger",e=>new AS(e),"PRIVATE")),Kt(new Dt("heartbeat",e=>new vI(e),"PRIVATE")),vt(sh,zg,t),vt(sh,zg,"esm2017"),vt("fire-js","")}_I("");function Tf(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(t);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(t,r[s])&&(n[r[s]]=t[r[s]]);return n}function e_(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const wI=e_,t_=new Jr("auth","Firebase",e_());/**
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
 */const Al=new Bo("@firebase/auth");function EI(t,...e){Al.logLevel<=se.WARN&&Al.warn(`Auth (${Zr}): ${t}`,...e)}function Ja(t,...e){Al.logLevel<=se.ERROR&&Al.error(`Auth (${Zr}): ${t}`,...e)}/**
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
 */function Yt(t,...e){throw Rf(t,...e)}function sn(t,...e){return Rf(t,...e)}function n_(t,e,n){const r=Object.assign(Object.assign({},wI()),{[e]:n});return new Jr("auth","Firebase",r).create(e,{appName:t.name})}function kn(t){return n_(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Rf(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return t_.create(t,...e)}function W(t,e,...n){if(!t)throw Rf(e,...n)}function xn(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Ja(e),new Error(e)}function Pn(t,e){t||xn(e)}/**
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
 */function ah(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function NI(){return Wg()==="http:"||Wg()==="https:"}function Wg(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
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
 */function kI(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(NI()||Bx()||"connection"in navigator)?navigator.onLine:!0}function SI(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
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
 */class Ho{constructor(e,n){this.shortDelay=e,this.longDelay=n,Pn(n>e,"Short delay should be less than long delay!"),this.isMobile=Cf()||Hx()}get(){return kI()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function jf(t,e){Pn(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
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
 */class r_{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;xn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;xn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;xn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const II={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const CI=new Ho(3e4,6e4);function wr(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function Dn(t,e,n,r,s={}){return s_(t,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const c=ii(Object.assign({key:t.config.apiKey},o)).slice(1),u=await t._getAdditionalHeaders();u["Content-Type"]="application/json",t.languageCode&&(u["X-Firebase-Locale"]=t.languageCode);const h=Object.assign({method:e,headers:u},i);return Xk()||(h.referrerPolicy="no-referrer"),r_.fetch()(i_(t,t.config.apiHost,n,c),h)})}async function s_(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},II),e);try{const s=new TI(t),i=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw Oa(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const c=i.ok?o.errorMessage:o.error.message,[u,h]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw Oa(t,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw Oa(t,"email-already-in-use",o);if(u==="USER_DISABLED")throw Oa(t,"user-disabled",o);const m=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw n_(t,m,h);Yt(t,m)}}catch(s){if(s instanceof Qt)throw s;Yt(t,"network-request-failed",{message:String(s)})}}async function Wo(t,e,n,r,s={}){const i=await Dn(t,e,n,r,s);return"mfaPendingCredential"in i&&Yt(t,"multi-factor-auth-required",{_serverResponse:i}),i}function i_(t,e,n,r){const s=`${e}${n}?${r}`;return t.config.emulator?jf(t.config,s):`${t.config.apiScheme}://${s}`}function bI(t){switch(t){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class TI{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(sn(this.auth,"network-request-failed")),CI.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Oa(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=sn(t,e,r);return s.customData._tokenResponse=n,s}function Gg(t){return t!==void 0&&t.enterprise!==void 0}class RI{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===e)return bI(n.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}async function jI(t,e){return Dn(t,"GET","/v2/recaptchaConfig",wr(t,e))}/**
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
 */async function PI(t,e){return Dn(t,"POST","/v1/accounts:delete",e)}async function o_(t,e){return Dn(t,"POST","/v1/accounts:lookup",e)}/**
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
 */function Xi(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function AI(t,e=!1){const n=Oe(t),r=await n.getIdToken(e),s=Pf(r);W(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:Xi(qu(s.auth_time)),issuedAtTime:Xi(qu(s.iat)),expirationTime:Xi(qu(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function qu(t){return Number(t)*1e3}function Pf(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return Ja("JWT malformed, contained fewer than 3 sections"),null;try{const s=Rl(n);return s?JSON.parse(s):(Ja("Failed to decode base64 JWT payload"),null)}catch(s){return Ja("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function qg(t){const e=Pf(t);return W(e,"internal-error"),W(typeof e.exp<"u","internal-error"),W(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function Ws(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof Qt&&OI(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function OI({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
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
 */class DI{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class lh{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Xi(this.lastLoginAt),this.creationTime=Xi(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Ol(t){var e;const n=t.auth,r=await t.getIdToken(),s=await Ws(t,o_(n,{idToken:r}));W(s==null?void 0:s.users.length,n,"internal-error");const i=s.users[0];t._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?a_(i.providerUserInfo):[],c=MI(t.providerData,o),u=t.isAnonymous,h=!(t.email&&i.passwordHash)&&!(c!=null&&c.length),m=u?h:!1,p={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:c,metadata:new lh(i.createdAt,i.lastLoginAt),isAnonymous:m};Object.assign(t,p)}async function LI(t){const e=Oe(t);await Ol(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function MI(t,e){return[...t.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function a_(t){return t.map(e=>{var{providerId:n}=e,r=Tf(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
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
 */async function FI(t,e){const n=await s_(t,{},async()=>{const r=ii({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=t.config,o=i_(t,s,"/v1/token",`key=${i}`),c=await t._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",r_.fetch()(o,{method:"POST",headers:c,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function UI(t,e){return Dn(t,"POST","/v2/accounts:revokeToken",wr(t,e))}/**
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
 */class As{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){W(e.idToken,"internal-error"),W(typeof e.idToken<"u","internal-error"),W(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):qg(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){W(e.length!==0,"internal-error");const n=qg(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(W(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:s,expiresIn:i}=await FI(e,n);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:s,expirationTime:i}=n,o=new As;return r&&(W(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(W(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(W(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new As,this.toJSON())}_performRefresh(){return xn("not implemented")}}/**
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
 */function zn(t,e){W(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class _n{constructor(e){var{uid:n,auth:r,stsTokenManager:s}=e,i=Tf(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new DI(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new lh(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await Ws(this,this.stsTokenManager.getToken(this.auth,e));return W(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return AI(this,e)}reload(){return LI(this)}_assign(e){this!==e&&(W(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new _n(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){W(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await Ol(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(tn(this.auth.app))return Promise.reject(kn(this.auth));const e=await this.getIdToken();return await Ws(this,PI(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,s,i,o,c,u,h,m;const p=(r=n.displayName)!==null&&r!==void 0?r:void 0,v=(s=n.email)!==null&&s!==void 0?s:void 0,k=(i=n.phoneNumber)!==null&&i!==void 0?i:void 0,C=(o=n.photoURL)!==null&&o!==void 0?o:void 0,j=(c=n.tenantId)!==null&&c!==void 0?c:void 0,D=(u=n._redirectEventId)!==null&&u!==void 0?u:void 0,b=(h=n.createdAt)!==null&&h!==void 0?h:void 0,x=(m=n.lastLoginAt)!==null&&m!==void 0?m:void 0,{uid:S,emailVerified:A,isAnonymous:L,providerData:F,stsTokenManager:w}=n;W(S&&w,e,"internal-error");const y=As.fromJSON(this.name,w);W(typeof S=="string",e,"internal-error"),zn(p,e.name),zn(v,e.name),W(typeof A=="boolean",e,"internal-error"),W(typeof L=="boolean",e,"internal-error"),zn(k,e.name),zn(C,e.name),zn(j,e.name),zn(D,e.name),zn(b,e.name),zn(x,e.name);const _=new _n({uid:S,auth:e,email:v,emailVerified:A,displayName:p,isAnonymous:L,photoURL:C,phoneNumber:k,tenantId:j,stsTokenManager:y,createdAt:b,lastLoginAt:x});return F&&Array.isArray(F)&&(_.providerData=F.map(N=>Object.assign({},N))),D&&(_._redirectEventId=D),_}static async _fromIdTokenResponse(e,n,r=!1){const s=new As;s.updateFromServerResponse(n);const i=new _n({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Ol(i),i}static async _fromGetAccountInfoResponse(e,n,r){const s=n.users[0];W(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?a_(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),c=new As;c.updateFromIdToken(r);const u=new _n({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:o}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new lh(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(u,h),u}}/**
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
 */const Kg=new Map;function wn(t){Pn(t instanceof Function,"Expected a class definition");let e=Kg.get(t);return e?(Pn(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Kg.set(t,e),e)}/**
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
 */class l_{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}l_.type="NONE";const Yg=l_;/**
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
 */function Za(t,e,n){return`firebase:${t}:${e}:${n}`}class Os{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=Za(this.userKey,s.apiKey,i),this.fullPersistenceKey=Za("persistence",s.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?_n._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new Os(wn(Yg),e,r);const s=(await Promise.all(n.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||wn(Yg);const o=Za(r,e.config.apiKey,e.name);let c=null;for(const h of n)try{const m=await h._get(o);if(m){const p=_n._fromJSON(e,m);h!==i&&(c=p),i=h;break}}catch{}const u=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new Os(i,e,r):(i=u[0],c&&await i._set(o,c.toJSON()),await Promise.all(n.map(async h=>{if(h!==i)try{await h._remove(o)}catch{}})),new Os(i,e,r))}}/**
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
 */function Qg(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(h_(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(c_(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(p_(e))return"Blackberry";if(m_(e))return"Webos";if(u_(e))return"Safari";if((e.includes("chrome/")||d_(e))&&!e.includes("edge/"))return"Chrome";if(f_(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function c_(t=ot()){return/firefox\//i.test(t)}function u_(t=ot()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function d_(t=ot()){return/crios\//i.test(t)}function h_(t=ot()){return/iemobile/i.test(t)}function f_(t=ot()){return/android/i.test(t)}function p_(t=ot()){return/blackberry/i.test(t)}function m_(t=ot()){return/webos/i.test(t)}function Af(t=ot()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function zI(t=ot()){var e;return Af(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function VI(){return Jk()&&document.documentMode===10}function g_(t=ot()){return Af(t)||f_(t)||m_(t)||p_(t)||/windows phone/i.test(t)||h_(t)}/**
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
 */function v_(t,e=[]){let n;switch(t){case"Browser":n=Qg(ot());break;case"Worker":n=`${Qg(ot())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Zr}/${r}`}/**
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
 */class $I{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=i=>new Promise((o,c)=>{try{const u=e(i);o(u)}catch(u){c(u)}});r.onAbort=n,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
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
 */async function BI(t,e={}){return Dn(t,"GET","/v2/passwordPolicy",wr(t,e))}/**
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
 */const HI=6;class WI{constructor(e){var n,r,s,i;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=o.minPasswordLength)!==null&&n!==void 0?n:HI,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,s,i,o,c;const u={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,u),this.validatePasswordCharacterOptions(e,u),u.isValid&&(u.isValid=(n=u.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),u.isValid&&(u.isValid=(r=u.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),u.isValid&&(u.isValid=(s=u.containsLowercaseLetter)!==null&&s!==void 0?s:!0),u.isValid&&(u.isValid=(i=u.containsUppercaseLetter)!==null&&i!==void 0?i:!0),u.isValid&&(u.isValid=(o=u.containsNumericCharacter)!==null&&o!==void 0?o:!0),u.isValid&&(u.isValid=(c=u.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),u}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
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
 */class GI{constructor(e,n,r,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Xg(this),this.idTokenSubscription=new Xg(this),this.beforeStateQueue=new $I(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=t_,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=wn(n)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await Os.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await o_(this,{idToken:e}),r=await _n._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(tn(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,c=s==null?void 0:s._redirectEventId,u=await this.tryRedirectSignIn(e);(!o||o===c)&&(u!=null&&u.user)&&(s=u.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return W(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Ol(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=SI()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(tn(this.app))return Promise.reject(kn(this));const n=e?Oe(e):null;return n&&W(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&W(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return tn(this.app)?Promise.reject(kn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return tn(this.app)?Promise.reject(kn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(wn(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await BI(this),n=new WI(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Jr("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await UI(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&wn(e)||this._popupRedirectResolver;W(n,this,"argument-error"),this.redirectPersistenceManager=await Os.create(this,[wn(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,s){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(W(c,this,"internal-error"),c.then(()=>{o||i(this.currentUser)}),typeof n=="function"){const u=e.addObserver(n,r,s);return()=>{o=!0,u()}}else{const u=e.addObserver(n);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return W(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=v_(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(n["X-Firebase-AppCheck"]=s),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&EI(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function es(t){return Oe(t)}class Xg{constructor(e){this.auth=e,this.observer=null,this.addObserver=aS(n=>this.observer=n)}get next(){return W(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let Ic={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function qI(t){Ic=t}function y_(t){return Ic.loadJS(t)}function KI(){return Ic.recaptchaEnterpriseScript}function YI(){return Ic.gapiScript}function QI(t){return`__${t}${Math.floor(Math.random()*1e6)}`}const XI="recaptcha-enterprise",JI="NO_RECAPTCHA";class ZI{constructor(e){this.type=XI,this.auth=es(e)}async verify(e="verify",n=!1){async function r(i){if(!n){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,c)=>{jI(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const h=new RI(u);return i.tenantId==null?i._agentRecaptchaConfig=h:i._tenantRecaptchaConfigs[i.tenantId]=h,o(h.siteKey)}}).catch(u=>{c(u)})})}function s(i,o,c){const u=window.grecaptcha;Gg(u)?u.enterprise.ready(()=>{u.enterprise.execute(i,{action:e}).then(h=>{o(h)}).catch(()=>{o(JI)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((i,o)=>{r(this.auth).then(c=>{if(!n&&Gg(window.grecaptcha))s(c,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let u=KI();u.length!==0&&(u+=c),y_(u).then(()=>{s(c,i,o)}).catch(h=>{o(h)})}}).catch(c=>{o(c)})})}}async function Jg(t,e,n,r=!1){const s=new ZI(t);let i;try{i=await s.verify(n)}catch{i=await s.verify(n,!0)}const o=Object.assign({},e);return r?Object.assign(o,{captchaResp:i}):Object.assign(o,{captchaResponse:i}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function ch(t,e,n,r){var s;if(!((s=t._getRecaptchaConfig())===null||s===void 0)&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const i=await Jg(t,e,n,n==="getOobCode");return r(t,i)}else return r(t,e).catch(async i=>{if(i.code==="auth/missing-recaptcha-token"){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await Jg(t,e,n,n==="getOobCode");return r(t,o)}else return Promise.reject(i)})}/**
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
 */function eC(t,e){const n=_r(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),i=n.getOptions();if(Io(i,e??{}))return s;Yt(s,"already-initialized")}return n.initialize({options:e})}function tC(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(wn);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function nC(t,e,n){const r=es(t);W(r._canInitEmulator,r,"emulator-config-failed"),W(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=x_(e),{host:o,port:c}=rC(e),u=c===null?"":`:${c}`;r.config.emulator={url:`${i}//${o}${u}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})}),sC()}function x_(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function rC(t){const e=x_(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:Zg(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:Zg(o)}}}function Zg(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function sC(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
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
 */class Of{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return xn("not implemented")}_getIdTokenResponse(e){return xn("not implemented")}_linkToIdToken(e,n){return xn("not implemented")}_getReauthenticationResolver(e){return xn("not implemented")}}async function iC(t,e){return Dn(t,"POST","/v1/accounts:signUp",e)}/**
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
 */async function oC(t,e){return Wo(t,"POST","/v1/accounts:signInWithPassword",wr(t,e))}/**
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
 */async function aC(t,e){return Wo(t,"POST","/v1/accounts:signInWithEmailLink",wr(t,e))}async function lC(t,e){return Wo(t,"POST","/v1/accounts:signInWithEmailLink",wr(t,e))}/**
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
 */class bo extends Of{constructor(e,n,r,s=null){super("password",r),this._email=e,this._password=n,this._tenantId=s}static _fromEmailAndPassword(e,n){return new bo(e,n,"password")}static _fromEmailAndCode(e,n,r=null){return new bo(e,n,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ch(e,n,"signInWithPassword",oC);case"emailLink":return aC(e,{email:this._email,oobCode:this._password});default:Yt(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":const r={idToken:n,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ch(e,r,"signUpPassword",iC);case"emailLink":return lC(e,{idToken:n,email:this._email,oobCode:this._password});default:Yt(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */async function Ds(t,e){return Wo(t,"POST","/v1/accounts:signInWithIdp",wr(t,e))}/**
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
 */const cC="http://localhost";class Br extends Of{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new Br(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):Yt("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=n,i=Tf(n,["providerId","signInMethod"]);if(!r||!s)return null;const o=new Br(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Ds(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,Ds(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Ds(e,n)}buildRequest(){const e={requestUri:cC,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=ii(n)}return e}}/**
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
 */function uC(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function dC(t){const e=zi(Vi(t)).link,n=e?zi(Vi(e)).deep_link_id:null,r=zi(Vi(t)).deep_link_id;return(r?zi(Vi(r)).link:null)||r||n||e||t}class Df{constructor(e){var n,r,s,i,o,c;const u=zi(Vi(e)),h=(n=u.apiKey)!==null&&n!==void 0?n:null,m=(r=u.oobCode)!==null&&r!==void 0?r:null,p=uC((s=u.mode)!==null&&s!==void 0?s:null);W(h&&m&&p,"argument-error"),this.apiKey=h,this.operation=p,this.code=m,this.continueUrl=(i=u.continueUrl)!==null&&i!==void 0?i:null,this.languageCode=(o=u.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(c=u.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){const n=dC(e);try{return new Df(n)}catch{return null}}}/**
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
 */class oi{constructor(){this.providerId=oi.PROVIDER_ID}static credential(e,n){return bo._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const r=Df.parseLink(n);return W(r,"argument-error"),bo._fromEmailAndCode(e,r.code,r.tenantId)}}oi.PROVIDER_ID="password";oi.EMAIL_PASSWORD_SIGN_IN_METHOD="password";oi.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class __{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class Go extends __{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class Gn extends Go{constructor(){super("facebook.com")}static credential(e){return Br._fromParams({providerId:Gn.PROVIDER_ID,signInMethod:Gn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Gn.credentialFromTaggedObject(e)}static credentialFromError(e){return Gn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Gn.credential(e.oauthAccessToken)}catch{return null}}}Gn.FACEBOOK_SIGN_IN_METHOD="facebook.com";Gn.PROVIDER_ID="facebook.com";/**
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
 */class qn extends Go{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return Br._fromParams({providerId:qn.PROVIDER_ID,signInMethod:qn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return qn.credentialFromTaggedObject(e)}static credentialFromError(e){return qn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return qn.credential(n,r)}catch{return null}}}qn.GOOGLE_SIGN_IN_METHOD="google.com";qn.PROVIDER_ID="google.com";/**
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
 */class Kn extends Go{constructor(){super("github.com")}static credential(e){return Br._fromParams({providerId:Kn.PROVIDER_ID,signInMethod:Kn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Kn.credentialFromTaggedObject(e)}static credentialFromError(e){return Kn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Kn.credential(e.oauthAccessToken)}catch{return null}}}Kn.GITHUB_SIGN_IN_METHOD="github.com";Kn.PROVIDER_ID="github.com";/**
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
 */class Yn extends Go{constructor(){super("twitter.com")}static credential(e,n){return Br._fromParams({providerId:Yn.PROVIDER_ID,signInMethod:Yn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Yn.credentialFromTaggedObject(e)}static credentialFromError(e){return Yn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return Yn.credential(n,r)}catch{return null}}}Yn.TWITTER_SIGN_IN_METHOD="twitter.com";Yn.PROVIDER_ID="twitter.com";/**
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
 */async function hC(t,e){return Wo(t,"POST","/v1/accounts:signUp",wr(t,e))}/**
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
 */class Hr{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,s=!1){const i=await _n._fromIdTokenResponse(e,r,s),o=e0(r);return new Hr({user:i,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const s=e0(r);return new Hr({user:e,providerId:s,_tokenResponse:r,operationType:n})}}function e0(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
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
 */class Dl extends Qt{constructor(e,n,r,s){var i;super(n.code,n.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Dl.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,s){return new Dl(e,n,r,s)}}function w_(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Dl._fromErrorAndOperation(t,i,e,r):i})}async function fC(t,e,n=!1){const r=await Ws(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Hr._forOperation(t,"link",r)}/**
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
 */async function pC(t,e,n=!1){const{auth:r}=t;if(tn(r.app))return Promise.reject(kn(r));const s="reauthenticate";try{const i=await Ws(t,w_(r,s,e,t),n);W(i.idToken,r,"internal-error");const o=Pf(i.idToken);W(o,r,"internal-error");const{sub:c}=o;return W(t.uid===c,r,"user-mismatch"),Hr._forOperation(t,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&Yt(r,"user-mismatch"),i}}/**
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
 */async function E_(t,e,n=!1){if(tn(t.app))return Promise.reject(kn(t));const r="signIn",s=await w_(t,r,e),i=await Hr._fromIdTokenResponse(t,r,s);return n||await t._updateCurrentUser(i.user),i}async function mC(t,e){return E_(es(t),e)}/**
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
 */async function N_(t){const e=es(t);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function gC(t,e,n){if(tn(t.app))return Promise.reject(kn(t));const r=es(t),o=await ch(r,{returnSecureToken:!0,email:e,password:n,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",hC).catch(u=>{throw u.code==="auth/password-does-not-meet-requirements"&&N_(t),u}),c=await Hr._fromIdTokenResponse(r,"signIn",o);return await r._updateCurrentUser(c.user),c}function vC(t,e,n){return tn(t.app)?Promise.reject(kn(t)):mC(Oe(t),oi.credential(e,n)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&N_(t),r})}/**
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
 */async function yC(t,e){return Dn(t,"POST","/v1/accounts:update",e)}/**
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
 */async function xC(t,{displayName:e,photoURL:n}){if(e===void 0&&n===void 0)return;const r=Oe(t),i={idToken:await r.getIdToken(),displayName:e,photoUrl:n,returnSecureToken:!0},o=await Ws(r,yC(r.auth,i));r.displayName=o.displayName||null,r.photoURL=o.photoUrl||null;const c=r.providerData.find(({providerId:u})=>u==="password");c&&(c.displayName=r.displayName,c.photoURL=r.photoURL),await r._updateTokensIfNecessary(o)}function _C(t,e,n,r){return Oe(t).onIdTokenChanged(e,n,r)}function wC(t,e,n){return Oe(t).beforeAuthStateChanged(e,n)}function EC(t,e,n,r){return Oe(t).onAuthStateChanged(e,n,r)}function NC(t){return Oe(t).signOut()}const Ll="__sak";/**
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
 */class k_{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Ll,"1"),this.storage.removeItem(Ll),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const kC=1e3,SC=10;class S_ extends k_{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=g_(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),s=this.localCache[n];r!==s&&e(n,s,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,c,u)=>{this.notifyListeners(o,u)});return}const r=e.key;n?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);VI()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,SC):s()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},kC)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}S_.type="LOCAL";const IC=S_;/**
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
 */class I_ extends k_{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}I_.type="SESSION";const C_=I_;/**
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
 */function CC(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
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
 */class Cc{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const r=new Cc(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:s,data:i}=n.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(o).map(async h=>h(n.origin,i)),u=await CC(c);n.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Cc.receivers=[];/**
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
 */class bC{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((c,u)=>{const h=Lf("",20);s.port1.start();const m=setTimeout(()=>{u(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(p){const v=p;if(v.data.eventId===h)switch(v.data.status){case"ack":clearTimeout(m),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(v.data.response);break;default:clearTimeout(m),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:h,data:n},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function on(){return window}function TC(t){on().location.href=t}/**
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
 */function b_(){return typeof on().WorkerGlobalScope<"u"&&typeof on().importScripts=="function"}async function RC(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function jC(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function PC(){return b_()?self:null}/**
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
 */const T_="firebaseLocalStorageDb",AC=1,Ml="firebaseLocalStorage",R_="fbase_key";class qo{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function bc(t,e){return t.transaction([Ml],e?"readwrite":"readonly").objectStore(Ml)}function OC(){const t=indexedDB.deleteDatabase(T_);return new qo(t).toPromise()}function uh(){const t=indexedDB.open(T_,AC);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(Ml,{keyPath:R_})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(Ml)?e(r):(r.close(),await OC(),e(await uh()))})})}async function t0(t,e,n){const r=bc(t,!0).put({[R_]:e,value:n});return new qo(r).toPromise()}async function DC(t,e){const n=bc(t,!1).get(e),r=await new qo(n).toPromise();return r===void 0?null:r.value}function n0(t,e){const n=bc(t,!0).delete(e);return new qo(n).toPromise()}const LC=800,MC=3;class j_{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await uh(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>MC)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return b_()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Cc._getInstance(PC()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await RC(),!this.activeServiceWorker)return;this.sender=new bC(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||jC()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await uh();return await t0(e,Ll,"1"),await n0(e,Ll),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>t0(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>DC(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>n0(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=bc(s,!1).getAll();return new qo(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),LC)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}j_.type="LOCAL";const FC=j_;new Ho(3e4,6e4);/**
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
 */function UC(t,e){return e?wn(e):(W(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
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
 */class Mf extends Of{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Ds(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Ds(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Ds(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function zC(t){return E_(t.auth,new Mf(t),t.bypassAuthState)}function VC(t){const{auth:e,user:n}=t;return W(n,e,"internal-error"),pC(n,new Mf(t),t.bypassAuthState)}async function $C(t){const{auth:e,user:n}=t;return W(n,e,"internal-error"),fC(n,new Mf(t),t.bypassAuthState)}/**
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
 */class P_{constructor(e,n,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:s,tenantId:i,error:o,type:c}=e;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:n,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return zC;case"linkViaPopup":case"linkViaRedirect":return $C;case"reauthViaPopup":case"reauthViaRedirect":return VC;default:Yt(this.auth,"internal-error")}}resolve(e){Pn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Pn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const BC=new Ho(2e3,1e4);class Ss extends P_{constructor(e,n,r,s,i){super(e,n,s,i),this.provider=r,this.authWindow=null,this.pollId=null,Ss.currentPopupAction&&Ss.currentPopupAction.cancel(),Ss.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return W(e,this.auth,"internal-error"),e}async onExecution(){Pn(this.filter.length===1,"Popup operations only handle one event");const e=Lf();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(sn(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(sn(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Ss.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(sn(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,BC.get())};e()}}Ss.currentPopupAction=null;/**
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
 */const HC="pendingRedirect",el=new Map;class WC extends P_{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=el.get(this.auth._key());if(!e){try{const r=await GC(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}el.set(this.auth._key(),e)}return this.bypassAuthState||el.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function GC(t,e){const n=YC(e),r=KC(t);if(!await r._isAvailable())return!1;const s=await r._get(n)==="true";return await r._remove(n),s}function qC(t,e){el.set(t._key(),e)}function KC(t){return wn(t._redirectPersistence)}function YC(t){return Za(HC,t.config.apiKey,t.name)}async function QC(t,e,n=!1){if(tn(t.app))return Promise.reject(kn(t));const r=es(t),s=UC(r,e),o=await new WC(r,s,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
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
 */const XC=10*60*1e3;class JC{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!ZC(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!A_(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(sn(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=XC&&this.cachedEventUids.clear(),this.cachedEventUids.has(r0(e))}saveEventToCache(e){this.cachedEventUids.add(r0(e)),this.lastProcessedEventTime=Date.now()}}function r0(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function A_({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function ZC(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return A_(t);default:return!1}}/**
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
 */async function e2(t,e={}){return Dn(t,"GET","/v1/projects",e)}/**
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
 */const t2=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,n2=/^https?/;async function r2(t){if(t.config.emulator)return;const{authorizedDomains:e}=await e2(t);for(const n of e)try{if(s2(n))return}catch{}Yt(t,"unauthorized-domain")}function s2(t){const e=ah(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!n2.test(n))return!1;if(t2.test(t))return r===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
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
 */const i2=new Ho(3e4,6e4);function s0(){const t=on().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function o2(t){return new Promise((e,n)=>{var r,s,i;function o(){s0(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{s0(),n(sn(t,"network-request-failed"))},timeout:i2.get()})}if(!((s=(r=on().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=on().gapi)===null||i===void 0)&&i.load)o();else{const c=QI("iframefcb");return on()[c]=()=>{gapi.load?o():n(sn(t,"network-request-failed"))},y_(`${YI()}?onload=${c}`).catch(u=>n(u))}}).catch(e=>{throw tl=null,e})}let tl=null;function a2(t){return tl=tl||o2(t),tl}/**
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
 */const l2=new Ho(5e3,15e3),c2="__/auth/iframe",u2="emulator/auth/iframe",d2={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},h2=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function f2(t){const e=t.config;W(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?jf(e,u2):`https://${t.config.authDomain}/${c2}`,r={apiKey:e.apiKey,appName:t.name,v:Zr},s=h2.get(t.config.apiHost);s&&(r.eid=s);const i=t._getFrameworks();return i.length&&(r.fw=i.join(",")),`${n}?${ii(r).slice(1)}`}async function p2(t){const e=await a2(t),n=on().gapi;return W(n,t,"internal-error"),e.open({where:document.body,url:f2(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:d2,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=sn(t,"network-request-failed"),c=on().setTimeout(()=>{i(o)},l2.get());function u(){on().clearTimeout(c),s(r)}r.ping(u).then(u,()=>{i(o)})}))}/**
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
 */const m2={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},g2=500,v2=600,y2="_blank",x2="http://localhost";class i0{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function _2(t,e,n,r=g2,s=v2){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const u=Object.assign(Object.assign({},m2),{width:r.toString(),height:s.toString(),top:i,left:o}),h=ot().toLowerCase();n&&(c=d_(h)?y2:n),c_(h)&&(e=e||x2,u.scrollbars="yes");const m=Object.entries(u).reduce((v,[k,C])=>`${v}${k}=${C},`,"");if(zI(h)&&c!=="_self")return w2(e||"",c),new i0(null);const p=window.open(e||"",c,m);W(p,t,"popup-blocked");try{p.focus()}catch{}return new i0(p)}function w2(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
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
 */const E2="__/auth/handler",N2="emulator/auth/handler",k2=encodeURIComponent("fac");async function o0(t,e,n,r,s,i){W(t.config.authDomain,t,"auth-domain-config-required"),W(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:Zr,eventId:s};if(e instanceof __){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",th(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[m,p]of Object.entries({}))o[m]=p}if(e instanceof Go){const m=e.getScopes().filter(p=>p!=="");m.length>0&&(o.scopes=m.join(","))}t.tenantId&&(o.tid=t.tenantId);const c=o;for(const m of Object.keys(c))c[m]===void 0&&delete c[m];const u=await t._getAppCheckToken(),h=u?`#${k2}=${encodeURIComponent(u)}`:"";return`${S2(t)}?${ii(c).slice(1)}${h}`}function S2({config:t}){return t.emulator?jf(t,N2):`https://${t.authDomain}/${E2}`}/**
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
 */const Ku="webStorageSupport";class I2{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=C_,this._completeRedirectFn=QC,this._overrideRedirectResult=qC}async _openPopup(e,n,r,s){var i;Pn((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=await o0(e,n,r,ah(),s);return _2(e,o,Lf())}async _openRedirect(e,n,r,s){await this._originValidation(e);const i=await o0(e,n,r,ah(),s);return TC(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:i}=this.eventManagers[n];return s?Promise.resolve(s):(Pn(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await p2(e),r=new JC(e);return n.register("authEvent",s=>(W(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Ku,{type:Ku},s=>{var i;const o=(i=s==null?void 0:s[0])===null||i===void 0?void 0:i[Ku];o!==void 0&&n(!!o),Yt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=r2(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return g_()||u_()||Af()}}const C2=I2;var a0="@firebase/auth",l0="1.7.9";/**
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
 */class b2{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){W(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function T2(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function R2(t){Kt(new Dt("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=r.options;W(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:o,authDomain:c,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:v_(t)},h=new GI(r,s,i,u);return tC(h,n),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),Kt(new Dt("auth-internal",e=>{const n=es(e.getProvider("auth").getImmediate());return(r=>new b2(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),vt(a0,l0,T2(t)),vt(a0,l0,"esm2017")}/**
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
 */const j2=5*60,P2=Vx("authIdTokenMaxAge")||j2;let c0=null;const A2=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>P2)return;const s=n==null?void 0:n.token;c0!==s&&(c0=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function O2(t=Sc()){const e=_r(t,"auth");if(e.isInitialized())return e.getImmediate();const n=eC(t,{popupRedirectResolver:C2,persistence:[FC,IC,C_]}),r=Vx("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=A2(i.toString());wC(n,o,()=>o(n.currentUser)),_C(n,c=>o(c))}}const s=Fx("auth");return s&&nC(n,`http://${s}`),n}function D2(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}qI({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=s=>{const i=sn("internal-error");i.customData=s,n(i)},r.type="text/javascript",r.charset="UTF-8",D2().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});R2("Browser");var L2="firebase",M2="10.14.1";/**
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
 */vt(L2,M2,"app");var u0={};const d0="@firebase/database",h0="1.0.8";/**
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
 */let O_="";function F2(t){O_=t}/**
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
 */class U2{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),Pe(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:So(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
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
 */class z2{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return Xt(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
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
 */const D_=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new U2(e)}}catch{}return new z2},Pr=D_("localStorage"),V2=D_("sessionStorage");/**
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
 */const Ls=new Bo("@firebase/database"),L_=function(){let t=1;return function(){return t++}}(),M_=function(t){const e=uS(t),n=new oS;n.update(e);const r=n.digest();return Sf.encodeByteArray(r)},Ko=function(...t){let e="";for(let n=0;n<t.length;n++){const r=t[n];Array.isArray(r)||r&&typeof r=="object"&&typeof r.length=="number"?e+=Ko.apply(null,r):typeof r=="object"?e+=Pe(r):e+=r,e+=" "}return e};let Ji=null,f0=!0;const $2=function(t,e){M(!0,"Can't turn on custom loggers persistently."),Ls.logLevel=se.VERBOSE,Ji=Ls.log.bind(Ls)},$e=function(...t){if(f0===!0&&(f0=!1,Ji===null&&V2.get("logging_enabled")===!0&&$2()),Ji){const e=Ko.apply(null,t);Ji(e)}},Yo=function(t){return function(...e){$e(t,...e)}},dh=function(...t){const e="FIREBASE INTERNAL ERROR: "+Ko(...t);Ls.error(e)},An=function(...t){const e=`FIREBASE FATAL ERROR: ${Ko(...t)}`;throw Ls.error(e),new Error(e)},it=function(...t){const e="FIREBASE WARNING: "+Ko(...t);Ls.warn(e)},B2=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&it("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Ff=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},H2=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},Gs="[MIN_NAME]",Wr="[MAX_NAME]",ts=function(t,e){if(t===e)return 0;if(t===Gs||e===Wr)return-1;if(e===Gs||t===Wr)return 1;{const n=p0(t),r=p0(e);return n!==null?r!==null?n-r===0?t.length-e.length:n-r:-1:r!==null?1:t<e?-1:1}},W2=function(t,e){return t===e?0:t<e?-1:1},ji=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+Pe(e))},Uf=function(t){if(typeof t!="object"||t===null)return Pe(t);const e=[];for(const r in t)e.push(r);e.sort();let n="{";for(let r=0;r<e.length;r++)r!==0&&(n+=","),n+=Pe(e[r]),n+=":",n+=Uf(t[e[r]]);return n+="}",n},F_=function(t,e){const n=t.length;if(n<=e)return[t];const r=[];for(let s=0;s<n;s+=e)s+e>n?r.push(t.substring(s,n)):r.push(t.substring(s,s+e));return r};function We(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const U_=function(t){M(!Ff(t),"Invalid JSON number");const e=11,n=52,r=(1<<e-1)-1;let s,i,o,c,u;t===0?(i=0,o=0,s=1/t===-1/0?1:0):(s=t<0,t=Math.abs(t),t>=Math.pow(2,1-r)?(c=Math.min(Math.floor(Math.log(t)/Math.LN2),r),i=c+r,o=Math.round(t*Math.pow(2,n-c)-Math.pow(2,n))):(i=0,o=Math.round(t/Math.pow(2,1-r-n))));const h=[];for(u=n;u;u-=1)h.push(o%2?1:0),o=Math.floor(o/2);for(u=e;u;u-=1)h.push(i%2?1:0),i=Math.floor(i/2);h.push(s?1:0),h.reverse();const m=h.join("");let p="";for(u=0;u<64;u+=8){let v=parseInt(m.substr(u,8),2).toString(16);v.length===1&&(v="0"+v),p=p+v}return p.toLowerCase()},G2=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},q2=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function K2(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const r=new Error(t+" at "+e._path.toString()+": "+n);return r.code=t.toUpperCase(),r}const Y2=new RegExp("^-?(0*)\\d{1,10}$"),Q2=-2147483648,X2=2147483647,p0=function(t){if(Y2.test(t)){const e=Number(t);if(e>=Q2&&e<=X2)return e}return null},ai=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw it("Exception was thrown by user callback.",n),e},Math.floor(0))}},J2=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Zi=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
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
 */class Z2{constructor(e,n){this.appName_=e,this.appCheckProvider=n,this.appCheck=n==null?void 0:n.getImmediate({optional:!0}),this.appCheck||n==null||n.get().then(r=>this.appCheck=r)}getToken(e){return this.appCheck?this.appCheck.getToken(e):new Promise((n,r)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,r):n(null)},0)})}addTokenChangeListener(e){var n;(n=this.appCheckProvider)===null||n===void 0||n.get().then(r=>r.addTokenListener(e))}notifyForInvalidToken(){it(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
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
 */class eb{constructor(e,n,r){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=r,this.auth_=null,this.auth_=r.getImmediate({optional:!0}),this.auth_||r.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?($e("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,r)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,r):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',it(e)}}class nl{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}nl.OWNER="owner";/**
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
 */const zf="5",z_="v",V_="s",$_="r",B_="f",H_=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,W_="ls",G_="p",hh="ac",q_="websocket",K_="long_polling";/**
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
 */class Y_{constructor(e,n,r,s,i=!1,o="",c=!1,u=!1){this.secure=n,this.namespace=r,this.webSocketOnly=s,this.nodeAdmin=i,this.persistenceKey=o,this.includeNamespaceInQueryParams=c,this.isUsingEmulator=u,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=Pr.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&Pr.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function tb(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function Q_(t,e,n){M(typeof e=="string","typeof type must == string"),M(typeof n=="object","typeof params must == object");let r;if(e===q_)r=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===K_)r=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);tb(t)&&(n.ns=t.namespace);const s=[];return We(n,(i,o)=>{s.push(i+"="+o)}),r+s.join("&")}/**
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
 */class nb{constructor(){this.counters_={}}incrementCounter(e,n=1){Xt(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return Wk(this.counters_)}}/**
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
 */const Yu={},Qu={};function Vf(t){const e=t.toString();return Yu[e]||(Yu[e]=new nb),Yu[e]}function rb(t,e){const n=t.toString();return Qu[n]||(Qu[n]=e()),Qu[n]}/**
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
 */class sb{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const r=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<r.length;++s)r[s]&&ai(()=>{this.onMessage_(r[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
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
 */const m0="start",ib="close",ob="pLPCommand",ab="pRTLPCB",X_="id",J_="pw",Z_="ser",lb="cb",cb="seg",ub="ts",db="d",hb="dframe",ew=1870,tw=30,fb=ew-tw,pb=25e3,mb=3e4;class Is{constructor(e,n,r,s,i,o,c){this.connId=e,this.repoInfo=n,this.applicationId=r,this.appCheckToken=s,this.authToken=i,this.transportSessionId=o,this.lastSessionId=c,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Yo(e),this.stats_=Vf(n),this.urlFn=u=>(this.appCheckToken&&(u[hh]=this.appCheckToken),Q_(n,K_,u))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new sb(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(mb)),H2(()=>{if(this.isClosed_)return;this.scriptTagHolder=new $f((...i)=>{const[o,c,u,h,m]=i;if(this.incrementIncomingBytes_(i),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===m0)this.id=c,this.password=u;else if(o===ib)c?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(c,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...i)=>{const[o,c]=i;this.incrementIncomingBytes_(i),this.myPacketOrderer.handleResponse(o,c)},()=>{this.onClosed_()},this.urlFn);const r={};r[m0]="t",r[Z_]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(r[lb]=this.scriptTagHolder.uniqueCallbackIdentifier),r[z_]=zf,this.transportSessionId&&(r[V_]=this.transportSessionId),this.lastSessionId&&(r[W_]=this.lastSessionId),this.applicationId&&(r[G_]=this.applicationId),this.appCheckToken&&(r[hh]=this.appCheckToken),typeof location<"u"&&location.hostname&&H_.test(location.hostname)&&(r[$_]=B_);const s=this.urlFn(r);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Is.forceAllow_=!0}static forceDisallow(){Is.forceDisallow_=!0}static isAvailable(){return Is.forceAllow_?!0:!Is.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!G2()&&!q2()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=Pe(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const r=Lx(n),s=F_(r,fb);for(let i=0;i<s.length;i++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[i]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const r={};r[hb]="t",r[X_]=e,r[J_]=n,this.myDisconnFrame.src=this.urlFn(r),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=Pe(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class $f{constructor(e,n,r,s){this.onDisconnect=r,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=L_(),window[ob+this.uniqueCallbackIdentifier]=e,window[ab+this.uniqueCallbackIdentifier]=n,this.myIFrame=$f.createIFrame_();let i="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(i='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+i+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(c){$e("frame writing exception"),c.stack&&$e(c.stack),$e(c)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||$e("No IE domain setting required")}catch{const r=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+r+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[X_]=this.myID,e[J_]=this.myPW,e[Z_]=this.currentSerial;let n=this.urlFn(e),r="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+tw+r.length<=ew;){const o=this.pendingSegs.shift();r=r+"&"+cb+s+"="+o.seg+"&"+ub+s+"="+o.ts+"&"+db+s+"="+o.d,s++}return n=n+r,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,r){this.pendingSegs.push({seg:e,ts:n,d:r}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const r=()=>{this.outstandingRequests.delete(n),this.newRequest_()},s=setTimeout(r,Math.floor(pb)),i=()=>{clearTimeout(s),r()};this.addTag(e,i)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const r=this.myIFrame.doc.createElement("script");r.type="text/javascript",r.async=!0,r.src=e,r.onload=r.onreadystatechange=function(){const s=r.readyState;(!s||s==="loaded"||s==="complete")&&(r.onload=r.onreadystatechange=null,r.parentNode&&r.parentNode.removeChild(r),n())},r.onerror=()=>{$e("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(r)}catch{}},Math.floor(1))}}/**
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
 */const gb=16384,vb=45e3;let Fl=null;typeof MozWebSocket<"u"?Fl=MozWebSocket:typeof WebSocket<"u"&&(Fl=WebSocket);class Vt{constructor(e,n,r,s,i,o,c){this.connId=e,this.applicationId=r,this.appCheckToken=s,this.authToken=i,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Yo(this.connId),this.stats_=Vf(n),this.connURL=Vt.connectionURL_(n,o,c,s,r),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,r,s,i){const o={};return o[z_]=zf,typeof location<"u"&&location.hostname&&H_.test(location.hostname)&&(o[$_]=B_),n&&(o[V_]=n),r&&(o[W_]=r),s&&(o[hh]=s),i&&(o[G_]=i),Q_(e,q_,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,Pr.set("previous_websocket_failure",!0);try{let r;Zk(),this.mySock=new Fl(this.connURL,[],r)}catch(r){this.log_("Error instantiating WebSocket.");const s=r.message||r.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=r=>{this.handleIncomingFrame(r)},this.mySock.onerror=r=>{this.log_("WebSocket error.  Closing connection.");const s=r.message||r.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){Vt.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,r=navigator.userAgent.match(n);r&&r.length>1&&parseFloat(r[1])<4.4&&(e=!0)}return!e&&Fl!==null&&!Vt.forceDisallow_}static previouslyFailed(){return Pr.isInMemoryStorage||Pr.get("previous_websocket_failure")===!0}markConnectionHealthy(){Pr.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const r=So(n);this.onMessage(r)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(M(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const r=this.extractFrameCount_(n);r!==null&&this.appendFrame_(r)}}send(e){this.resetKeepAlive();const n=Pe(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const r=F_(n,gb);r.length>1&&this.sendString_(String(r.length));for(let s=0;s<r.length;s++)this.sendString_(r[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(vb))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}Vt.responsesRequiredToBeHealthy=2;Vt.healthyTimeout=3e4;/**
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
 */class To{constructor(e){this.initTransports_(e)}static get ALL_TRANSPORTS(){return[Is,Vt]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}initTransports_(e){const n=Vt&&Vt.isAvailable();let r=n&&!Vt.previouslyFailed();if(e.webSocketOnly&&(n||it("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),r=!0),r)this.transports_=[Vt];else{const s=this.transports_=[];for(const i of To.ALL_TRANSPORTS)i&&i.isAvailable()&&s.push(i);To.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}To.globalTransportInitialized_=!1;/**
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
 */const yb=6e4,xb=5e3,_b=10*1024,wb=100*1024,Xu="t",g0="d",Eb="s",v0="r",Nb="e",y0="o",x0="a",_0="n",w0="p",kb="h";class Sb{constructor(e,n,r,s,i,o,c,u,h,m){this.id=e,this.repoInfo_=n,this.applicationId_=r,this.appCheckToken_=s,this.authToken_=i,this.onMessage_=o,this.onReady_=c,this.onDisconnect_=u,this.onKill_=h,this.lastSessionId=m,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Yo("c:"+this.id+":"),this.transportManager_=new To(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),r=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,r)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=Zi(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>wb?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>_b?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Xu in e){const n=e[Xu];n===x0?this.upgradeIfSecondaryHealthy_():n===v0?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===y0&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=ji("t",e),r=ji("d",e);if(n==="c")this.onSecondaryControl_(r);else if(n==="d")this.pendingDataMessages.push(r);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:w0,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:x0,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:_0,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=ji("t",e),r=ji("d",e);n==="c"?this.onControl_(r):n==="d"&&this.onDataMessage_(r)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=ji(Xu,e);if(g0 in e){const r=e[g0];if(n===kb){const s=Object.assign({},r);this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(n===_0){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===Eb?this.onConnectionShutdown_(r):n===v0?this.onReset_(r):n===Nb?dh("Server Error: "+r):n===y0?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):dh("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,r=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),zf!==r&&it("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),r=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,r),Zi(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(yb))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Zi(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(xb))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:w0,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(Pr.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
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
 */class nw{put(e,n,r,s){}merge(e,n,r,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,r){}onDisconnectMerge(e,n,r){}onDisconnectCancel(e,n){}reportStats(e){}}/**
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
 */class rw{constructor(e){this.allowedEvents_=e,this.listeners_={},M(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const r=[...this.listeners_[e]];for(let s=0;s<r.length;s++)r[s].callback.apply(r[s].context,n)}}on(e,n,r){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:r});const s=this.getInitialEvent(e);s&&n.apply(r,s)}off(e,n,r){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let i=0;i<s.length;i++)if(s[i].callback===n&&(!r||r===s[i].context)){s.splice(i,1);return}}validateEventType_(e){M(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
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
 */class Ul extends rw{constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Cf()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}static getInstance(){return new Ul}getInitialEvent(e){return M(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
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
 */const E0=32,N0=768;class ae{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let r=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[r]=this.pieces_[s],r++);this.pieces_.length=r,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function re(){return new ae("")}function Y(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function pr(t){return t.pieces_.length-t.pieceNum_}function ue(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new ae(t.pieces_,e)}function Bf(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function Ib(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function Ro(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function sw(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new ae(e,0)}function ke(t,e){const n=[];for(let r=t.pieceNum_;r<t.pieces_.length;r++)n.push(t.pieces_[r]);if(e instanceof ae)for(let r=e.pieceNum_;r<e.pieces_.length;r++)n.push(e.pieces_[r]);else{const r=e.split("/");for(let s=0;s<r.length;s++)r[s].length>0&&n.push(r[s])}return new ae(n,0)}function X(t){return t.pieceNum_>=t.pieces_.length}function rt(t,e){const n=Y(t),r=Y(e);if(n===null)return e;if(n===r)return rt(ue(t),ue(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function Cb(t,e){const n=Ro(t,0),r=Ro(e,0);for(let s=0;s<n.length&&s<r.length;s++){const i=ts(n[s],r[s]);if(i!==0)return i}return n.length===r.length?0:n.length<r.length?-1:1}function Hf(t,e){if(pr(t)!==pr(e))return!1;for(let n=t.pieceNum_,r=e.pieceNum_;n<=t.pieces_.length;n++,r++)if(t.pieces_[n]!==e.pieces_[r])return!1;return!0}function jt(t,e){let n=t.pieceNum_,r=e.pieceNum_;if(pr(t)>pr(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[r])return!1;++n,++r}return!0}class bb{constructor(e,n){this.errorPrefix_=n,this.parts_=Ro(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let r=0;r<this.parts_.length;r++)this.byteLength_+=kc(this.parts_[r]);iw(this)}}function Tb(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=kc(e),iw(t)}function Rb(t){const e=t.parts_.pop();t.byteLength_-=kc(e),t.parts_.length>0&&(t.byteLength_-=1)}function iw(t){if(t.byteLength_>N0)throw new Error(t.errorPrefix_+"has a key path longer than "+N0+" bytes ("+t.byteLength_+").");if(t.parts_.length>E0)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+E0+") or object contains a cycle "+br(t))}function br(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
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
 */class Wf extends rw{constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const r=!document[e];r!==this.visible_&&(this.visible_=r,this.trigger("visible",r))},!1)}static getInstance(){return new Wf}getInitialEvent(e){return M(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
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
 */const Pi=1e3,jb=60*5*1e3,k0=30*1e3,Pb=1.3,Ab=3e4,Ob="server_kill",S0=3;class Sn extends nw{constructor(e,n,r,s,i,o,c,u){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=r,this.onConnectStatus_=s,this.onServerInfoUpdate_=i,this.authTokenProvider_=o,this.appCheckTokenProvider_=c,this.authOverride_=u,this.id=Sn.nextPersistentConnectionId_++,this.log_=Yo("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Pi,this.maxReconnectDelay_=jb,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,u)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Wf.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Ul.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,r){const s=++this.requestNumber_,i={r:s,a:e,b:n};this.log_(Pe(i)),M(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(i),r&&(this.requestCBHash_[s]=r)}get(e){this.initConnection_();const n=new si,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const c=o.d;o.s==="ok"?n.resolve(c):n.reject(c)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const i=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(i),n.promise}listen(e,n,r,s){this.initConnection_();const i=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+i),this.listens.has(o)||this.listens.set(o,new Map),M(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),M(!this.listens.get(o).has(i),"listen() called twice for same path/queryId.");const c={onComplete:s,hashFn:n,query:e,tag:r};this.listens.get(o).set(i,c),this.connected_&&this.sendListen_(c)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,r=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(r)})}sendListen_(e){const n=e.query,r=n._path.toString(),s=n._queryIdentifier;this.log_("Listen on "+r+" for "+s);const i={p:r},o="q";e.tag&&(i.q=n._queryObject,i.t=e.tag),i.h=e.hashFn(),this.sendRequest(o,i,c=>{const u=c.d,h=c.s;Sn.warnOnListenWarnings_(u,n),(this.listens.get(r)&&this.listens.get(r).get(s))===e&&(this.log_("listen response",c),h!=="ok"&&this.removeListen_(r,s),e.onComplete&&e.onComplete(h,u))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&Xt(e,"w")){const r=$r(e,"w");if(Array.isArray(r)&&~r.indexOf("no_index")){const s='".indexOn": "'+n._queryParams.getIndex().toString()+'"',i=n._path.toString();it(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${i} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||iS(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=k0)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=sS(e)?"auth":"gauth",r={cred:e};this.authOverride_===null?r.noauth=!0:typeof this.authOverride_=="object"&&(r.authvar=this.authOverride_),this.sendRequest(n,r,s=>{const i=s.s,o=s.d||"error";this.authToken_===e&&(i==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(i,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,r=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,r)})}unlisten(e,n){const r=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+r+" "+s),M(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(r,s)&&this.connected_&&this.sendUnlisten_(r,s,e._queryObject,n)}sendUnlisten_(e,n,r,s){this.log_("Unlisten on "+e+" for "+n);const i={p:e},o="n";s&&(i.q=r,i.t=s),this.sendRequest(o,i)}onDisconnectPut(e,n,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,r):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:r})}onDisconnectMerge(e,n,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,r):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:r})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,r,s){const i={p:n,d:r};this.log_("onDisconnect "+e,i),this.sendRequest(e,i,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,n,r,s){this.putInternal("p",e,n,r,s)}merge(e,n,r,s){this.putInternal("m",e,n,r,s)}putInternal(e,n,r,s,i){this.initConnection_();const o={p:n,d:r};i!==void 0&&(o.h=i),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const c=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(c):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,r=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,r,i=>{this.log_(n+" response",i),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(i.s,i.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,r=>{if(r.s!=="ok"){const i=r.d;this.log_("reportStats","Error sending stats: "+i)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+Pe(e));const n=e.r,r=this.requestCBHash_[n];r&&(delete this.requestCBHash_[n],r(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):dh("Unrecognized action received from server: "+Pe(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){M(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Pi,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Pi,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>Ab&&(this.reconnectDelay_=Pi),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=new Date().getTime()-this.lastConnectionAttemptTime_;let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*Pb)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),r=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+Sn.nextConnectionId_++,i=this.lastSessionId;let o=!1,c=null;const u=function(){c?c.close():(o=!0,r())},h=function(p){M(c,"sendRequest call when we're not connected not allowed."),c.sendRequest(p)};this.realtime_={close:u,sendRequest:h};const m=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[p,v]=await Promise.all([this.authTokenProvider_.getToken(m),this.appCheckTokenProvider_.getToken(m)]);o?$e("getToken() completed but was canceled"):($e("getToken() completed. Creating connection."),this.authToken_=p&&p.accessToken,this.appCheckToken_=v&&v.token,c=new Sb(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,r,k=>{it(k+" ("+this.repoInfo_.toString()+")"),this.interrupt(Ob)},i))}catch(p){this.log_("Failed to get token: "+p),o||(this.repoInfo_.nodeAdmin&&it(p),u())}}}interrupt(e){$e("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){$e("Resuming connection for reason: "+e),delete this.interruptReasons_[e],th(this.interruptReasons_)&&(this.reconnectDelay_=Pi,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let r;n?r=n.map(i=>Uf(i)).join("$"):r="default";const s=this.removeListen_(e,r);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,n){const r=new ae(e).toString();let s;if(this.listens.has(r)){const i=this.listens.get(r);s=i.get(n),i.delete(n),i.size===0&&this.listens.delete(r)}else s=void 0;return s}onAuthRevoked_(e,n){$e("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=S0&&(this.reconnectDelay_=k0,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){$e("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=S0&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+O_.replace(/\./g,"-")]=1,Cf()?e["framework.cordova"]=1:Hx()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Ul.getInstance().currentlyOnline();return th(this.interruptReasons_)&&e}}Sn.nextPersistentConnectionId_=0;Sn.nextConnectionId_=0;/**
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
 */let Da;class ow extends Tc{static get __EMPTY_NODE(){return Da}static set __EMPTY_NODE(e){Da=e}compare(e,n){return ts(e.name,n.name)}isDefinedOn(e){throw ri("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return Q.MIN}maxPost(){return new Q(Wr,Da)}makePost(e,n){return M(typeof e=="string","KeyIndex indexValue must always be a string."),new Q(e,Da)}toString(){return".key"}}const Ms=new ow;/**
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
 */class La{constructor(e,n,r,s,i=null){this.isReverse_=s,this.resultGenerator_=i,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?r(e.key,n):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class Fe{constructor(e,n,r,s,i){this.key=e,this.value=n,this.color=r??Fe.RED,this.left=s??ft.EMPTY_NODE,this.right=i??ft.EMPTY_NODE}copy(e,n,r,s,i){return new Fe(e??this.key,n??this.value,r??this.color,s??this.left,i??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let s=this;const i=r(e,s.key);return i<0?s=s.copy(null,null,null,s.left.insert(e,n,r),null):i===0?s=s.copy(null,n,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,n,r)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return ft.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let r,s;if(r=this,n(e,r.key)<0)!r.left.isEmpty()&&!r.left.isRed_()&&!r.left.left.isRed_()&&(r=r.moveRedLeft_()),r=r.copy(null,null,null,r.left.remove(e,n),null);else{if(r.left.isRed_()&&(r=r.rotateRight_()),!r.right.isEmpty()&&!r.right.isRed_()&&!r.right.left.isRed_()&&(r=r.moveRedRight_()),n(e,r.key)===0){if(r.right.isEmpty())return ft.EMPTY_NODE;s=r.right.min_(),r=r.copy(s.key,s.value,null,null,r.right.removeMin_())}r=r.copy(null,null,null,null,r.right.remove(e,n))}return r.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,Fe.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,Fe.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}Fe.RED=!0;Fe.BLACK=!1;class Db{copy(e,n,r,s,i){return this}insert(e,n,r){return new Fe(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class ft{constructor(e,n=ft.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new ft(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,Fe.BLACK,null,null))}remove(e){return new ft(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,Fe.BLACK,null,null))}get(e){let n,r=this.root_;for(;!r.isEmpty();){if(n=this.comparator_(e,r.key),n===0)return r.value;n<0?r=r.left:n>0&&(r=r.right)}return null}getPredecessorKey(e){let n,r=this.root_,s=null;for(;!r.isEmpty();)if(n=this.comparator_(e,r.key),n===0){if(r.left.isEmpty())return s?s.key:null;for(r=r.left;!r.right.isEmpty();)r=r.right;return r.key}else n<0?r=r.left:n>0&&(s=r,r=r.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new La(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new La(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new La(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new La(this.root_,null,this.comparator_,!0,e)}}ft.EMPTY_NODE=new Db;/**
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
 */function Lb(t,e){return ts(t.name,e.name)}function Gf(t,e){return ts(t,e)}/**
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
 */let fh;function Mb(t){fh=t}const aw=function(t){return typeof t=="number"?"number:"+U_(t):"string:"+t},lw=function(t){if(t.isLeafNode()){const e=t.val();M(typeof e=="string"||typeof e=="number"||typeof e=="object"&&Xt(e,".sv"),"Priority must be a string or number.")}else M(t===fh||t.isEmpty(),"priority of unexpected type.");M(t===fh||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
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
 */let I0;class Le{constructor(e,n=Le.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,M(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),lw(this.priorityNode_)}static set __childrenNodeConstructor(e){I0=e}static get __childrenNodeConstructor(){return I0}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new Le(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:Le.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return X(e)?this:Y(e)===".priority"?this.priorityNode_:Le.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:Le.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const r=Y(e);return r===null?n:n.isEmpty()&&r!==".priority"?this:(M(r!==".priority"||pr(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(r,Le.__childrenNodeConstructor.EMPTY_NODE.updateChild(ue(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+aw(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=U_(this.value_):e+=this.value_,this.lazyHash_=M_(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===Le.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof Le.__childrenNodeConstructor?-1:(M(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,r=typeof this.value_,s=Le.VALUE_TYPE_ORDER.indexOf(n),i=Le.VALUE_TYPE_ORDER.indexOf(r);return M(s>=0,"Unknown leaf type: "+n),M(i>=0,"Unknown leaf type: "+r),s===i?r==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:i-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}Le.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
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
 */let cw,uw;function Fb(t){cw=t}function Ub(t){uw=t}class zb extends Tc{compare(e,n){const r=e.node.getPriority(),s=n.node.getPriority(),i=r.compareTo(s);return i===0?ts(e.name,n.name):i}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return Q.MIN}maxPost(){return new Q(Wr,new Le("[PRIORITY-POST]",uw))}makePost(e,n){const r=cw(e);return new Q(n,new Le("[PRIORITY-POST]",r))}toString(){return".priority"}}const _e=new zb;/**
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
 */const Vb=Math.log(2);class $b{constructor(e){const n=i=>parseInt(Math.log(i)/Vb,10),r=i=>parseInt(Array(i+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const s=r(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const zl=function(t,e,n,r){t.sort(e);const s=function(u,h){const m=h-u;let p,v;if(m===0)return null;if(m===1)return p=t[u],v=n?n(p):p,new Fe(v,p.node,Fe.BLACK,null,null);{const k=parseInt(m/2,10)+u,C=s(u,k),j=s(k+1,h);return p=t[k],v=n?n(p):p,new Fe(v,p.node,Fe.BLACK,C,j)}},i=function(u){let h=null,m=null,p=t.length;const v=function(C,j){const D=p-C,b=p;p-=C;const x=s(D+1,b),S=t[D],A=n?n(S):S;k(new Fe(A,S.node,j,null,x))},k=function(C){h?(h.left=C,h=C):(m=C,h=C)};for(let C=0;C<u.count;++C){const j=u.nextBitIsOne(),D=Math.pow(2,u.count-(C+1));j?v(D,Fe.BLACK):(v(D,Fe.BLACK),v(D,Fe.RED))}return m},o=new $b(t.length),c=i(o);return new ft(r||e,c)};/**
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
 */let Ju;const us={};class En{constructor(e,n){this.indexes_=e,this.indexSet_=n}static get Default(){return M(us&&_e,"ChildrenNode.ts has not been loaded"),Ju=Ju||new En({".priority":us},{".priority":_e}),Ju}get(e){const n=$r(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof ft?n:null}hasIndex(e){return Xt(this.indexSet_,e.toString())}addIndex(e,n){M(e!==Ms,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const r=[];let s=!1;const i=n.getIterator(Q.Wrap);let o=i.getNext();for(;o;)s=s||e.isDefinedOn(o.node),r.push(o),o=i.getNext();let c;s?c=zl(r,e.getCompare()):c=us;const u=e.toString(),h=Object.assign({},this.indexSet_);h[u]=e;const m=Object.assign({},this.indexes_);return m[u]=c,new En(m,h)}addToIndexes(e,n){const r=jl(this.indexes_,(s,i)=>{const o=$r(this.indexSet_,i);if(M(o,"Missing index implementation for "+i),s===us)if(o.isDefinedOn(e.node)){const c=[],u=n.getIterator(Q.Wrap);let h=u.getNext();for(;h;)h.name!==e.name&&c.push(h),h=u.getNext();return c.push(e),zl(c,o.getCompare())}else return us;else{const c=n.get(e.name);let u=s;return c&&(u=u.remove(new Q(e.name,c))),u.insert(e,e.node)}});return new En(r,this.indexSet_)}removeFromIndexes(e,n){const r=jl(this.indexes_,s=>{if(s===us)return s;{const i=n.get(e.name);return i?s.remove(new Q(e.name,i)):s}});return new En(r,this.indexSet_)}}/**
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
 */let Ai;class H{constructor(e,n,r){this.children_=e,this.priorityNode_=n,this.indexMap_=r,this.lazyHash_=null,this.priorityNode_&&lw(this.priorityNode_),this.children_.isEmpty()&&M(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return Ai||(Ai=new H(new ft(Gf),null,En.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||Ai}updatePriority(e){return this.children_.isEmpty()?this:new H(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?Ai:n}}getChild(e){const n=Y(e);return n===null?this:this.getImmediateChild(n).getChild(ue(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(M(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const r=new Q(e,n);let s,i;n.isEmpty()?(s=this.children_.remove(e),i=this.indexMap_.removeFromIndexes(r,this.children_)):(s=this.children_.insert(e,n),i=this.indexMap_.addToIndexes(r,this.children_));const o=s.isEmpty()?Ai:this.priorityNode_;return new H(s,o,i)}}updateChild(e,n){const r=Y(e);if(r===null)return n;{M(Y(e)!==".priority"||pr(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(r).updateChild(ue(e),n);return this.updateImmediateChild(r,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let r=0,s=0,i=!0;if(this.forEachChild(_e,(o,c)=>{n[o]=c.val(e),r++,i&&H.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):i=!1}),!e&&i&&s<2*r){const o=[];for(const c in n)o[c]=n[c];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+aw(this.getPriority().val())+":"),this.forEachChild(_e,(n,r)=>{const s=r.hash();s!==""&&(e+=":"+n+":"+s)}),this.lazyHash_=e===""?"":M_(e)}return this.lazyHash_}getPredecessorChildName(e,n,r){const s=this.resolveIndex_(r);if(s){const i=s.getPredecessorKey(new Q(e,n));return i?i.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const r=n.minKey();return r&&r.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new Q(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const r=n.maxKey();return r&&r.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new Q(n,this.children_.get(n)):null}forEachChild(e,n){const r=this.resolveIndex_(e);return r?r.inorderTraversal(s=>n(s.name,s.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const r=this.resolveIndex_(n);if(r)return r.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,Q.Wrap);let i=s.peek();for(;i!=null&&n.compare(i,e)<0;)s.getNext(),i=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const r=this.resolveIndex_(n);if(r)return r.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,Q.Wrap);let i=s.peek();for(;i!=null&&n.compare(i,e)>0;)s.getNext(),i=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Qo?-1:0}withIndex(e){if(e===Ms||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new H(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===Ms||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const r=this.getIterator(_e),s=n.getIterator(_e);let i=r.getNext(),o=s.getNext();for(;i&&o;){if(i.name!==o.name||!i.node.equals(o.node))return!1;i=r.getNext(),o=s.getNext()}return i===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Ms?null:this.indexMap_.get(e.toString())}}H.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class Bb extends H{constructor(){super(new ft(Gf),H.EMPTY_NODE,En.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return H.EMPTY_NODE}isEmpty(){return!1}}const Qo=new Bb;Object.defineProperties(Q,{MIN:{value:new Q(Gs,H.EMPTY_NODE)},MAX:{value:new Q(Wr,Qo)}});ow.__EMPTY_NODE=H.EMPTY_NODE;Le.__childrenNodeConstructor=H;Mb(Qo);Ub(Qo);/**
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
 */const Hb=!0;function Ce(t,e=null){if(t===null)return H.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),M(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new Le(n,Ce(e))}if(!(t instanceof Array)&&Hb){const n=[];let r=!1;if(We(t,(o,c)=>{if(o.substring(0,1)!=="."){const u=Ce(c);u.isEmpty()||(r=r||!u.getPriority().isEmpty(),n.push(new Q(o,u)))}}),n.length===0)return H.EMPTY_NODE;const i=zl(n,Lb,o=>o.name,Gf);if(r){const o=zl(n,_e.getCompare());return new H(i,Ce(e),new En({".priority":o},{".priority":_e}))}else return new H(i,Ce(e),En.Default)}else{let n=H.EMPTY_NODE;return We(t,(r,s)=>{if(Xt(t,r)&&r.substring(0,1)!=="."){const i=Ce(s);(i.isLeafNode()||!i.isEmpty())&&(n=n.updateImmediateChild(r,i))}}),n.updatePriority(Ce(e))}}Fb(Ce);/**
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
 */class Wb extends Tc{constructor(e){super(),this.indexPath_=e,M(!X(e)&&Y(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const r=this.extractChild(e.node),s=this.extractChild(n.node),i=r.compareTo(s);return i===0?ts(e.name,n.name):i}makePost(e,n){const r=Ce(e),s=H.EMPTY_NODE.updateChild(this.indexPath_,r);return new Q(n,s)}maxPost(){const e=H.EMPTY_NODE.updateChild(this.indexPath_,Qo);return new Q(Wr,e)}toString(){return Ro(this.indexPath_,0).join("/")}}/**
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
 */class Gb extends Tc{compare(e,n){const r=e.node.compareTo(n.node);return r===0?ts(e.name,n.name):r}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return Q.MIN}maxPost(){return Q.MAX}makePost(e,n){const r=Ce(e);return new Q(n,r)}toString(){return".value"}}const qb=new Gb;/**
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
 */function dw(t){return{type:"value",snapshotNode:t}}function qs(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function jo(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function Po(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function Kb(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
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
 */class qf{constructor(e){this.index_=e}updateChild(e,n,r,s,i,o){M(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const c=e.getImmediateChild(n);return c.getChild(s).equals(r.getChild(s))&&c.isEmpty()===r.isEmpty()||(o!=null&&(r.isEmpty()?e.hasChild(n)?o.trackChildChange(jo(n,c)):M(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):c.isEmpty()?o.trackChildChange(qs(n,r)):o.trackChildChange(Po(n,r,c))),e.isLeafNode()&&r.isEmpty())?e:e.updateImmediateChild(n,r).withIndex(this.index_)}updateFullNode(e,n,r){return r!=null&&(e.isLeafNode()||e.forEachChild(_e,(s,i)=>{n.hasChild(s)||r.trackChildChange(jo(s,i))}),n.isLeafNode()||n.forEachChild(_e,(s,i)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(i)||r.trackChildChange(Po(s,i,o))}else r.trackChildChange(qs(s,i))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?H.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
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
 */class Ao{constructor(e){this.indexedFilter_=new qf(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Ao.getStartPost_(e),this.endPost_=Ao.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,r=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&r}updateChild(e,n,r,s,i,o){return this.matches(new Q(n,r))||(r=H.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,r,s,i,o)}updateFullNode(e,n,r){n.isLeafNode()&&(n=H.EMPTY_NODE);let s=n.withIndex(this.index_);s=s.updatePriority(H.EMPTY_NODE);const i=this;return n.forEachChild(_e,(o,c)=>{i.matches(new Q(o,c))||(s=s.updateImmediateChild(o,H.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,r)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
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
 */class Yb{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const r=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?r<=0:r<0},this.withinEndPost=n=>{const r=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?r<=0:r<0},this.rangedFilter_=new Ao(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,r,s,i,o){return this.rangedFilter_.matches(new Q(n,r))||(r=H.EMPTY_NODE),e.getImmediateChild(n).equals(r)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,r,s,i,o):this.fullLimitUpdateChild_(e,n,r,i,o)}updateFullNode(e,n,r){let s;if(n.isLeafNode()||n.isEmpty())s=H.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){s=H.EMPTY_NODE.withIndex(this.index_);let i;this.reverse_?i=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):i=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;i.hasNext()&&o<this.limit_;){const c=i.getNext();if(this.withinDirectionalStart(c))if(this.withinDirectionalEnd(c))s=s.updateImmediateChild(c.name,c.node),o++;else break;else continue}}else{s=n.withIndex(this.index_),s=s.updatePriority(H.EMPTY_NODE);let i;this.reverse_?i=s.getReverseIterator(this.index_):i=s.getIterator(this.index_);let o=0;for(;i.hasNext();){const c=i.getNext();o<this.limit_&&this.withinDirectionalStart(c)&&this.withinDirectionalEnd(c)?o++:s=s.updateImmediateChild(c.name,H.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,r)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,r,s,i){let o;if(this.reverse_){const p=this.index_.getCompare();o=(v,k)=>p(k,v)}else o=this.index_.getCompare();const c=e;M(c.numChildren()===this.limit_,"");const u=new Q(n,r),h=this.reverse_?c.getFirstChild(this.index_):c.getLastChild(this.index_),m=this.rangedFilter_.matches(u);if(c.hasChild(n)){const p=c.getImmediateChild(n);let v=s.getChildAfterChild(this.index_,h,this.reverse_);for(;v!=null&&(v.name===n||c.hasChild(v.name));)v=s.getChildAfterChild(this.index_,v,this.reverse_);const k=v==null?1:o(v,u);if(m&&!r.isEmpty()&&k>=0)return i!=null&&i.trackChildChange(Po(n,r,p)),c.updateImmediateChild(n,r);{i!=null&&i.trackChildChange(jo(n,p));const j=c.updateImmediateChild(n,H.EMPTY_NODE);return v!=null&&this.rangedFilter_.matches(v)?(i!=null&&i.trackChildChange(qs(v.name,v.node)),j.updateImmediateChild(v.name,v.node)):j}}else return r.isEmpty()?e:m&&o(h,u)>=0?(i!=null&&(i.trackChildChange(jo(h.name,h.node)),i.trackChildChange(qs(n,r))),c.updateImmediateChild(n,r).updateImmediateChild(h.name,H.EMPTY_NODE)):e}}/**
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
 */class Kf{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=_e}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return M(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return M(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Gs}hasEnd(){return this.endSet_}getIndexEndValue(){return M(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return M(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Wr}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return M(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===_e}copy(){const e=new Kf;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function Qb(t){return t.loadsAllData()?new qf(t.getIndex()):t.hasLimit()?new Yb(t):new Ao(t)}function C0(t){const e={};if(t.isDefault())return e;let n;if(t.index_===_e?n="$priority":t.index_===qb?n="$value":t.index_===Ms?n="$key":(M(t.index_ instanceof Wb,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=Pe(n),t.startSet_){const r=t.startAfterSet_?"startAfter":"startAt";e[r]=Pe(t.indexStartValue_),t.startNameSet_&&(e[r]+=","+Pe(t.indexStartName_))}if(t.endSet_){const r=t.endBeforeSet_?"endBefore":"endAt";e[r]=Pe(t.indexEndValue_),t.endNameSet_&&(e[r]+=","+Pe(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function b0(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==_e&&(e.i=t.index_.toString()),e}/**
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
 */class Vl extends nw{constructor(e,n,r,s){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=r,this.appCheckTokenProvider_=s,this.log_=Yo("p:rest:"),this.listens_={}}reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(M(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}listen(e,n,r,s){const i=e._path.toString();this.log_("Listen called for "+i+" "+e._queryIdentifier);const o=Vl.getListenId_(e,r),c={};this.listens_[o]=c;const u=C0(e._queryParams);this.restRequest_(i+".json",u,(h,m)=>{let p=m;if(h===404&&(p=null,h=null),h===null&&this.onDataUpdate_(i,p,!1,r),$r(this.listens_,o)===c){let v;h?h===401?v="permission_denied":v="rest_error:"+h:v="ok",s(v,null)}})}unlisten(e,n){const r=Vl.getListenId_(e,n);delete this.listens_[r]}get(e){const n=C0(e._queryParams),r=e._path.toString(),s=new si;return this.restRequest_(r+".json",n,(i,o)=>{let c=o;i===404&&(c=null,i=null),i===null?(this.onDataUpdate_(r,c,!1,null),s.resolve(c)):s.reject(new Error(c))}),s.promise}refreshAuthToken(e){}restRequest_(e,n={},r){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,i])=>{s&&s.accessToken&&(n.auth=s.accessToken),i&&i.token&&(n.ac=i.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+ii(n);this.log_("Sending REST request for "+o);const c=new XMLHttpRequest;c.onreadystatechange=()=>{if(r&&c.readyState===4){this.log_("REST Response for "+o+" received. status:",c.status,"response:",c.responseText);let u=null;if(c.status>=200&&c.status<300){try{u=So(c.responseText)}catch{it("Failed to parse JSON response for "+o+": "+c.responseText)}r(null,u)}else c.status!==401&&c.status!==404&&it("Got unsuccessful REST response for "+o+" Status: "+c.status),r(c.status);r=null}},c.open("GET",o,!0),c.send()})}}/**
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
 */class Xb{constructor(){this.rootNode_=H.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
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
 */function $l(){return{value:null,children:new Map}}function hw(t,e,n){if(X(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const r=Y(e);t.children.has(r)||t.children.set(r,$l());const s=t.children.get(r);e=ue(e),hw(s,e,n)}}function ph(t,e,n){t.value!==null?n(e,t.value):Jb(t,(r,s)=>{const i=new ae(e.toString()+"/"+r);ph(s,i,n)})}function Jb(t,e){t.children.forEach((n,r)=>{e(r,n)})}/**
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
 */class Zb{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n=Object.assign({},e);return this.last_&&We(this.last_,(r,s)=>{n[r]=n[r]-s}),this.last_=e,n}}/**
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
 */const T0=10*1e3,eT=30*1e3,tT=5*60*1e3;class nT{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new Zb(e);const r=T0+(eT-T0)*Math.random();Zi(this.reportStats_.bind(this),Math.floor(r))}reportStats_(){const e=this.statsListener_.get(),n={};let r=!1;We(e,(s,i)=>{i>0&&Xt(this.statsToReport_,s)&&(n[s]=i,r=!0)}),r&&this.server_.reportStats(n),Zi(this.reportStats_.bind(this),Math.floor(Math.random()*2*tT))}}/**
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
 */class Bl{constructor(e,n,r){this.path=e,this.affectedTree=n,this.revert=r,this.type=$t.ACK_USER_WRITE,this.source=Yf()}operationForChild(e){if(X(this.path)){if(this.affectedTree.value!=null)return M(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new ae(e));return new Bl(re(),n,this.revert)}}else return M(Y(this.path)===e,"operationForChild called for unrelated child."),new Bl(ue(this.path),this.affectedTree,this.revert)}}/**
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
 */class Oo{constructor(e,n){this.source=e,this.path=n,this.type=$t.LISTEN_COMPLETE}operationForChild(e){return X(this.path)?new Oo(this.source,re()):new Oo(this.source,ue(this.path))}}/**
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
 */class Gr{constructor(e,n,r){this.source=e,this.path=n,this.snap=r,this.type=$t.OVERWRITE}operationForChild(e){return X(this.path)?new Gr(this.source,re(),this.snap.getImmediateChild(e)):new Gr(this.source,ue(this.path),this.snap)}}/**
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
 */class Ks{constructor(e,n,r){this.source=e,this.path=n,this.children=r,this.type=$t.MERGE}operationForChild(e){if(X(this.path)){const n=this.children.subtree(new ae(e));return n.isEmpty()?null:n.value?new Gr(this.source,re(),n.value):new Ks(this.source,re(),n)}else return M(Y(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Ks(this.source,ue(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
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
 */class mr{constructor(e,n,r){this.node_=e,this.fullyInitialized_=n,this.filtered_=r}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(X(e))return this.isFullyInitialized()&&!this.filtered_;const n=Y(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
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
 */class rT{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function sT(t,e,n,r){const s=[],i=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&i.push(Kb(o.childName,o.snapshotNode))}),Oi(t,s,"child_removed",e,r,n),Oi(t,s,"child_added",e,r,n),Oi(t,s,"child_moved",i,r,n),Oi(t,s,"child_changed",e,r,n),Oi(t,s,"value",e,r,n),s}function Oi(t,e,n,r,s,i){const o=r.filter(c=>c.type===n);o.sort((c,u)=>oT(t,c,u)),o.forEach(c=>{const u=iT(t,c,i);s.forEach(h=>{h.respondsTo(c.type)&&e.push(h.createEvent(u,t.query_))})})}function iT(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function oT(t,e,n){if(e.childName==null||n.childName==null)throw ri("Should only compare child_ events.");const r=new Q(e.childName,e.snapshotNode),s=new Q(n.childName,n.snapshotNode);return t.index_.compare(r,s)}/**
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
 */function Rc(t,e){return{eventCache:t,serverCache:e}}function eo(t,e,n,r){return Rc(new mr(e,n,r),t.serverCache)}function fw(t,e,n,r){return Rc(t.eventCache,new mr(e,n,r))}function Hl(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function qr(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
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
 */let Zu;const aT=()=>(Zu||(Zu=new ft(W2)),Zu);class ce{constructor(e,n=aT()){this.value=e,this.children=n}static fromObject(e){let n=new ce(null);return We(e,(r,s)=>{n=n.set(new ae(r),s)}),n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:re(),value:this.value};if(X(e))return null;{const r=Y(e),s=this.children.get(r);if(s!==null){const i=s.findRootMostMatchingPathAndValue(ue(e),n);return i!=null?{path:ke(new ae(r),i.path),value:i.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(X(e))return this;{const n=Y(e),r=this.children.get(n);return r!==null?r.subtree(ue(e)):new ce(null)}}set(e,n){if(X(e))return new ce(n,this.children);{const r=Y(e),i=(this.children.get(r)||new ce(null)).set(ue(e),n),o=this.children.insert(r,i);return new ce(this.value,o)}}remove(e){if(X(e))return this.children.isEmpty()?new ce(null):new ce(null,this.children);{const n=Y(e),r=this.children.get(n);if(r){const s=r.remove(ue(e));let i;return s.isEmpty()?i=this.children.remove(n):i=this.children.insert(n,s),this.value===null&&i.isEmpty()?new ce(null):new ce(this.value,i)}else return this}}get(e){if(X(e))return this.value;{const n=Y(e),r=this.children.get(n);return r?r.get(ue(e)):null}}setTree(e,n){if(X(e))return n;{const r=Y(e),i=(this.children.get(r)||new ce(null)).setTree(ue(e),n);let o;return i.isEmpty()?o=this.children.remove(r):o=this.children.insert(r,i),new ce(this.value,o)}}fold(e){return this.fold_(re(),e)}fold_(e,n){const r={};return this.children.inorderTraversal((s,i)=>{r[s]=i.fold_(ke(e,s),n)}),n(e,this.value,r)}findOnPath(e,n){return this.findOnPath_(e,re(),n)}findOnPath_(e,n,r){const s=this.value?r(n,this.value):!1;if(s)return s;if(X(e))return null;{const i=Y(e),o=this.children.get(i);return o?o.findOnPath_(ue(e),ke(n,i),r):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,re(),n)}foreachOnPath_(e,n,r){if(X(e))return this;{this.value&&r(n,this.value);const s=Y(e),i=this.children.get(s);return i?i.foreachOnPath_(ue(e),ke(n,s),r):new ce(null)}}foreach(e){this.foreach_(re(),e)}foreach_(e,n){this.children.inorderTraversal((r,s)=>{s.foreach_(ke(e,r),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,r)=>{r.value&&e(n,r.value)})}}/**
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
 */class Gt{constructor(e){this.writeTree_=e}static empty(){return new Gt(new ce(null))}}function to(t,e,n){if(X(e))return new Gt(new ce(n));{const r=t.writeTree_.findRootMostValueAndPath(e);if(r!=null){const s=r.path;let i=r.value;const o=rt(s,e);return i=i.updateChild(o,n),new Gt(t.writeTree_.set(s,i))}else{const s=new ce(n),i=t.writeTree_.setTree(e,s);return new Gt(i)}}}function mh(t,e,n){let r=t;return We(n,(s,i)=>{r=to(r,ke(e,s),i)}),r}function R0(t,e){if(X(e))return Gt.empty();{const n=t.writeTree_.setTree(e,new ce(null));return new Gt(n)}}function gh(t,e){return ns(t,e)!=null}function ns(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(rt(n.path,e)):null}function j0(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(_e,(r,s)=>{e.push(new Q(r,s))}):t.writeTree_.children.inorderTraversal((r,s)=>{s.value!=null&&e.push(new Q(r,s.value))}),e}function cr(t,e){if(X(e))return t;{const n=ns(t,e);return n!=null?new Gt(new ce(n)):new Gt(t.writeTree_.subtree(e))}}function vh(t){return t.writeTree_.isEmpty()}function Ys(t,e){return pw(re(),t.writeTree_,e)}function pw(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let r=null;return e.children.inorderTraversal((s,i)=>{s===".priority"?(M(i.value!==null,"Priority writes must always be leaf nodes"),r=i.value):n=pw(ke(t,s),i,n)}),!n.getChild(t).isEmpty()&&r!==null&&(n=n.updateChild(ke(t,".priority"),r)),n}}/**
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
 */function jc(t,e){return yw(e,t)}function lT(t,e,n,r,s){M(r>t.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),t.allWrites.push({path:e,snap:n,writeId:r,visible:s}),s&&(t.visibleWrites=to(t.visibleWrites,e,n)),t.lastWriteId=r}function cT(t,e,n,r){M(r>t.lastWriteId,"Stacking an older merge on top of newer ones"),t.allWrites.push({path:e,children:n,writeId:r,visible:!0}),t.visibleWrites=mh(t.visibleWrites,e,n),t.lastWriteId=r}function uT(t,e){for(let n=0;n<t.allWrites.length;n++){const r=t.allWrites[n];if(r.writeId===e)return r}return null}function dT(t,e){const n=t.allWrites.findIndex(c=>c.writeId===e);M(n>=0,"removeWrite called with nonexistent writeId.");const r=t.allWrites[n];t.allWrites.splice(n,1);let s=r.visible,i=!1,o=t.allWrites.length-1;for(;s&&o>=0;){const c=t.allWrites[o];c.visible&&(o>=n&&hT(c,r.path)?s=!1:jt(r.path,c.path)&&(i=!0)),o--}if(s){if(i)return fT(t),!0;if(r.snap)t.visibleWrites=R0(t.visibleWrites,r.path);else{const c=r.children;We(c,u=>{t.visibleWrites=R0(t.visibleWrites,ke(r.path,u))})}return!0}else return!1}function hT(t,e){if(t.snap)return jt(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&jt(ke(t.path,n),e))return!0;return!1}function fT(t){t.visibleWrites=mw(t.allWrites,pT,re()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function pT(t){return t.visible}function mw(t,e,n){let r=Gt.empty();for(let s=0;s<t.length;++s){const i=t[s];if(e(i)){const o=i.path;let c;if(i.snap)jt(n,o)?(c=rt(n,o),r=to(r,c,i.snap)):jt(o,n)&&(c=rt(o,n),r=to(r,re(),i.snap.getChild(c)));else if(i.children){if(jt(n,o))c=rt(n,o),r=mh(r,c,i.children);else if(jt(o,n))if(c=rt(o,n),X(c))r=mh(r,re(),i.children);else{const u=$r(i.children,Y(c));if(u){const h=u.getChild(ue(c));r=to(r,re(),h)}}}else throw ri("WriteRecord should have .snap or .children")}}return r}function gw(t,e,n,r,s){if(!r&&!s){const i=ns(t.visibleWrites,e);if(i!=null)return i;{const o=cr(t.visibleWrites,e);if(vh(o))return n;if(n==null&&!gh(o,re()))return null;{const c=n||H.EMPTY_NODE;return Ys(o,c)}}}else{const i=cr(t.visibleWrites,e);if(!s&&vh(i))return n;if(!s&&n==null&&!gh(i,re()))return null;{const o=function(h){return(h.visible||s)&&(!r||!~r.indexOf(h.writeId))&&(jt(h.path,e)||jt(e,h.path))},c=mw(t.allWrites,o,e),u=n||H.EMPTY_NODE;return Ys(c,u)}}}function mT(t,e,n){let r=H.EMPTY_NODE;const s=ns(t.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(_e,(i,o)=>{r=r.updateImmediateChild(i,o)}),r;if(n){const i=cr(t.visibleWrites,e);return n.forEachChild(_e,(o,c)=>{const u=Ys(cr(i,new ae(o)),c);r=r.updateImmediateChild(o,u)}),j0(i).forEach(o=>{r=r.updateImmediateChild(o.name,o.node)}),r}else{const i=cr(t.visibleWrites,e);return j0(i).forEach(o=>{r=r.updateImmediateChild(o.name,o.node)}),r}}function gT(t,e,n,r,s){M(r||s,"Either existingEventSnap or existingServerSnap must exist");const i=ke(e,n);if(gh(t.visibleWrites,i))return null;{const o=cr(t.visibleWrites,i);return vh(o)?s.getChild(n):Ys(o,s.getChild(n))}}function vT(t,e,n,r){const s=ke(e,n),i=ns(t.visibleWrites,s);if(i!=null)return i;if(r.isCompleteForChild(n)){const o=cr(t.visibleWrites,s);return Ys(o,r.getNode().getImmediateChild(n))}else return null}function yT(t,e){return ns(t.visibleWrites,e)}function xT(t,e,n,r,s,i,o){let c;const u=cr(t.visibleWrites,e),h=ns(u,re());if(h!=null)c=h;else if(n!=null)c=Ys(u,n);else return[];if(c=c.withIndex(o),!c.isEmpty()&&!c.isLeafNode()){const m=[],p=o.getCompare(),v=i?c.getReverseIteratorFrom(r,o):c.getIteratorFrom(r,o);let k=v.getNext();for(;k&&m.length<s;)p(k,r)!==0&&m.push(k),k=v.getNext();return m}else return[]}function _T(){return{visibleWrites:Gt.empty(),allWrites:[],lastWriteId:-1}}function Wl(t,e,n,r){return gw(t.writeTree,t.treePath,e,n,r)}function Jf(t,e){return mT(t.writeTree,t.treePath,e)}function P0(t,e,n,r){return gT(t.writeTree,t.treePath,e,n,r)}function Gl(t,e){return yT(t.writeTree,ke(t.treePath,e))}function wT(t,e,n,r,s,i){return xT(t.writeTree,t.treePath,e,n,r,s,i)}function Zf(t,e,n){return vT(t.writeTree,t.treePath,e,n)}function vw(t,e){return yw(ke(t.treePath,e),t.writeTree)}function yw(t,e){return{treePath:t,writeTree:e}}/**
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
 */class ET{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,r=e.childName;M(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),M(r!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(r);if(s){const i=s.type;if(n==="child_added"&&i==="child_removed")this.changeMap.set(r,Po(r,e.snapshotNode,s.snapshotNode));else if(n==="child_removed"&&i==="child_added")this.changeMap.delete(r);else if(n==="child_removed"&&i==="child_changed")this.changeMap.set(r,jo(r,s.oldSnap));else if(n==="child_changed"&&i==="child_added")this.changeMap.set(r,qs(r,e.snapshotNode));else if(n==="child_changed"&&i==="child_changed")this.changeMap.set(r,Po(r,e.snapshotNode,s.oldSnap));else throw ri("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(r,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
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
 */class NT{getCompleteChild(e){return null}getChildAfterChild(e,n,r){return null}}const xw=new NT;class ep{constructor(e,n,r=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=r}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const r=this.optCompleteServerCache_!=null?new mr(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Zf(this.writes_,e,r)}}getChildAfterChild(e,n,r){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:qr(this.viewCache_),i=wT(this.writes_,s,n,1,r,e);return i.length===0?null:i[0]}}/**
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
 */function kT(t){return{filter:t}}function ST(t,e){M(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),M(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function IT(t,e,n,r,s){const i=new ET;let o,c;if(n.type===$t.OVERWRITE){const h=n;h.source.fromUser?o=yh(t,e,h.path,h.snap,r,s,i):(M(h.source.fromServer,"Unknown source."),c=h.source.tagged||e.serverCache.isFiltered()&&!X(h.path),o=ql(t,e,h.path,h.snap,r,s,c,i))}else if(n.type===$t.MERGE){const h=n;h.source.fromUser?o=bT(t,e,h.path,h.children,r,s,i):(M(h.source.fromServer,"Unknown source."),c=h.source.tagged||e.serverCache.isFiltered(),o=xh(t,e,h.path,h.children,r,s,c,i))}else if(n.type===$t.ACK_USER_WRITE){const h=n;h.revert?o=jT(t,e,h.path,r,s,i):o=TT(t,e,h.path,h.affectedTree,r,s,i)}else if(n.type===$t.LISTEN_COMPLETE)o=RT(t,e,n.path,r,i);else throw ri("Unknown operation type: "+n.type);const u=i.getChanges();return CT(e,o,u),{viewCache:o,changes:u}}function CT(t,e,n){const r=e.eventCache;if(r.isFullyInitialized()){const s=r.getNode().isLeafNode()||r.getNode().isEmpty(),i=Hl(t);(n.length>0||!t.eventCache.isFullyInitialized()||s&&!r.getNode().equals(i)||!r.getNode().getPriority().equals(i.getPriority()))&&n.push(dw(Hl(e)))}}function _w(t,e,n,r,s,i){const o=e.eventCache;if(Gl(r,n)!=null)return e;{let c,u;if(X(n))if(M(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const h=qr(e),m=h instanceof H?h:H.EMPTY_NODE,p=Jf(r,m);c=t.filter.updateFullNode(e.eventCache.getNode(),p,i)}else{const h=Wl(r,qr(e));c=t.filter.updateFullNode(e.eventCache.getNode(),h,i)}else{const h=Y(n);if(h===".priority"){M(pr(n)===1,"Can't have a priority with additional path components");const m=o.getNode();u=e.serverCache.getNode();const p=P0(r,n,m,u);p!=null?c=t.filter.updatePriority(m,p):c=o.getNode()}else{const m=ue(n);let p;if(o.isCompleteForChild(h)){u=e.serverCache.getNode();const v=P0(r,n,o.getNode(),u);v!=null?p=o.getNode().getImmediateChild(h).updateChild(m,v):p=o.getNode().getImmediateChild(h)}else p=Zf(r,h,e.serverCache);p!=null?c=t.filter.updateChild(o.getNode(),h,p,m,s,i):c=o.getNode()}}return eo(e,c,o.isFullyInitialized()||X(n),t.filter.filtersNodes())}}function ql(t,e,n,r,s,i,o,c){const u=e.serverCache;let h;const m=o?t.filter:t.filter.getIndexedFilter();if(X(n))h=m.updateFullNode(u.getNode(),r,null);else if(m.filtersNodes()&&!u.isFiltered()){const k=u.getNode().updateChild(n,r);h=m.updateFullNode(u.getNode(),k,null)}else{const k=Y(n);if(!u.isCompleteForPath(n)&&pr(n)>1)return e;const C=ue(n),D=u.getNode().getImmediateChild(k).updateChild(C,r);k===".priority"?h=m.updatePriority(u.getNode(),D):h=m.updateChild(u.getNode(),k,D,C,xw,null)}const p=fw(e,h,u.isFullyInitialized()||X(n),m.filtersNodes()),v=new ep(s,p,i);return _w(t,p,n,s,v,c)}function yh(t,e,n,r,s,i,o){const c=e.eventCache;let u,h;const m=new ep(s,e,i);if(X(n))h=t.filter.updateFullNode(e.eventCache.getNode(),r,o),u=eo(e,h,!0,t.filter.filtersNodes());else{const p=Y(n);if(p===".priority")h=t.filter.updatePriority(e.eventCache.getNode(),r),u=eo(e,h,c.isFullyInitialized(),c.isFiltered());else{const v=ue(n),k=c.getNode().getImmediateChild(p);let C;if(X(v))C=r;else{const j=m.getCompleteChild(p);j!=null?Bf(v)===".priority"&&j.getChild(sw(v)).isEmpty()?C=j:C=j.updateChild(v,r):C=H.EMPTY_NODE}if(k.equals(C))u=e;else{const j=t.filter.updateChild(c.getNode(),p,C,v,m,o);u=eo(e,j,c.isFullyInitialized(),t.filter.filtersNodes())}}}return u}function A0(t,e){return t.eventCache.isCompleteForChild(e)}function bT(t,e,n,r,s,i,o){let c=e;return r.foreach((u,h)=>{const m=ke(n,u);A0(e,Y(m))&&(c=yh(t,c,m,h,s,i,o))}),r.foreach((u,h)=>{const m=ke(n,u);A0(e,Y(m))||(c=yh(t,c,m,h,s,i,o))}),c}function O0(t,e,n){return n.foreach((r,s)=>{e=e.updateChild(r,s)}),e}function xh(t,e,n,r,s,i,o,c){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let u=e,h;X(n)?h=r:h=new ce(null).setTree(n,r);const m=e.serverCache.getNode();return h.children.inorderTraversal((p,v)=>{if(m.hasChild(p)){const k=e.serverCache.getNode().getImmediateChild(p),C=O0(t,k,v);u=ql(t,u,new ae(p),C,s,i,o,c)}}),h.children.inorderTraversal((p,v)=>{const k=!e.serverCache.isCompleteForChild(p)&&v.value===null;if(!m.hasChild(p)&&!k){const C=e.serverCache.getNode().getImmediateChild(p),j=O0(t,C,v);u=ql(t,u,new ae(p),j,s,i,o,c)}}),u}function TT(t,e,n,r,s,i,o){if(Gl(s,n)!=null)return e;const c=e.serverCache.isFiltered(),u=e.serverCache;if(r.value!=null){if(X(n)&&u.isFullyInitialized()||u.isCompleteForPath(n))return ql(t,e,n,u.getNode().getChild(n),s,i,c,o);if(X(n)){let h=new ce(null);return u.getNode().forEachChild(Ms,(m,p)=>{h=h.set(new ae(m),p)}),xh(t,e,n,h,s,i,c,o)}else return e}else{let h=new ce(null);return r.foreach((m,p)=>{const v=ke(n,m);u.isCompleteForPath(v)&&(h=h.set(m,u.getNode().getChild(v)))}),xh(t,e,n,h,s,i,c,o)}}function RT(t,e,n,r,s){const i=e.serverCache,o=fw(e,i.getNode(),i.isFullyInitialized()||X(n),i.isFiltered());return _w(t,o,n,r,xw,s)}function jT(t,e,n,r,s,i){let o;if(Gl(r,n)!=null)return e;{const c=new ep(r,e,s),u=e.eventCache.getNode();let h;if(X(n)||Y(n)===".priority"){let m;if(e.serverCache.isFullyInitialized())m=Wl(r,qr(e));else{const p=e.serverCache.getNode();M(p instanceof H,"serverChildren would be complete if leaf node"),m=Jf(r,p)}m=m,h=t.filter.updateFullNode(u,m,i)}else{const m=Y(n);let p=Zf(r,m,e.serverCache);p==null&&e.serverCache.isCompleteForChild(m)&&(p=u.getImmediateChild(m)),p!=null?h=t.filter.updateChild(u,m,p,ue(n),c,i):e.eventCache.getNode().hasChild(m)?h=t.filter.updateChild(u,m,H.EMPTY_NODE,ue(n),c,i):h=u,h.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Wl(r,qr(e)),o.isLeafNode()&&(h=t.filter.updateFullNode(h,o,i)))}return o=e.serverCache.isFullyInitialized()||Gl(r,re())!=null,eo(e,h,o,t.filter.filtersNodes())}}/**
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
 */class PT{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const r=this.query_._queryParams,s=new qf(r.getIndex()),i=Qb(r);this.processor_=kT(i);const o=n.serverCache,c=n.eventCache,u=s.updateFullNode(H.EMPTY_NODE,o.getNode(),null),h=i.updateFullNode(H.EMPTY_NODE,c.getNode(),null),m=new mr(u,o.isFullyInitialized(),s.filtersNodes()),p=new mr(h,c.isFullyInitialized(),i.filtersNodes());this.viewCache_=Rc(p,m),this.eventGenerator_=new rT(this.query_)}get query(){return this.query_}}function AT(t){return t.viewCache_.serverCache.getNode()}function OT(t){return Hl(t.viewCache_)}function DT(t,e){const n=qr(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!X(e)&&!n.getImmediateChild(Y(e)).isEmpty())?n.getChild(e):null}function D0(t){return t.eventRegistrations_.length===0}function LT(t,e){t.eventRegistrations_.push(e)}function L0(t,e,n){const r=[];if(n){M(e==null,"A cancel should cancel all event registrations.");const s=t.query._path;t.eventRegistrations_.forEach(i=>{const o=i.createCancelEvent(n,s);o&&r.push(o)})}if(e){let s=[];for(let i=0;i<t.eventRegistrations_.length;++i){const o=t.eventRegistrations_[i];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(t.eventRegistrations_.slice(i+1));break}}t.eventRegistrations_=s}else t.eventRegistrations_=[];return r}function M0(t,e,n,r){e.type===$t.MERGE&&e.source.queryId!==null&&(M(qr(t.viewCache_),"We should always have a full cache before handling merges"),M(Hl(t.viewCache_),"Missing event cache, even though we have a server cache"));const s=t.viewCache_,i=IT(t.processor_,s,e,n,r);return ST(t.processor_,i.viewCache),M(i.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=i.viewCache,ww(t,i.changes,i.viewCache.eventCache.getNode(),null)}function MT(t,e){const n=t.viewCache_.eventCache,r=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(_e,(i,o)=>{r.push(qs(i,o))}),n.isFullyInitialized()&&r.push(dw(n.getNode())),ww(t,r,n.getNode(),e)}function ww(t,e,n,r){const s=r?[r]:t.eventRegistrations_;return sT(t.eventGenerator_,e,n,s)}/**
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
 */let Kl;class Ew{constructor(){this.views=new Map}}function FT(t){M(!Kl,"__referenceConstructor has already been defined"),Kl=t}function UT(){return M(Kl,"Reference.ts has not been loaded"),Kl}function zT(t){return t.views.size===0}function tp(t,e,n,r){const s=e.source.queryId;if(s!==null){const i=t.views.get(s);return M(i!=null,"SyncTree gave us an op for an invalid query."),M0(i,e,n,r)}else{let i=[];for(const o of t.views.values())i=i.concat(M0(o,e,n,r));return i}}function Nw(t,e,n,r,s){const i=e._queryIdentifier,o=t.views.get(i);if(!o){let c=Wl(n,s?r:null),u=!1;c?u=!0:r instanceof H?(c=Jf(n,r),u=!1):(c=H.EMPTY_NODE,u=!1);const h=Rc(new mr(c,u,!1),new mr(r,s,!1));return new PT(e,h)}return o}function VT(t,e,n,r,s,i){const o=Nw(t,e,r,s,i);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),LT(o,n),MT(o,n)}function $T(t,e,n,r){const s=e._queryIdentifier,i=[];let o=[];const c=gr(t);if(s==="default")for(const[u,h]of t.views.entries())o=o.concat(L0(h,n,r)),D0(h)&&(t.views.delete(u),h.query._queryParams.loadsAllData()||i.push(h.query));else{const u=t.views.get(s);u&&(o=o.concat(L0(u,n,r)),D0(u)&&(t.views.delete(s),u.query._queryParams.loadsAllData()||i.push(u.query)))}return c&&!gr(t)&&i.push(new(UT())(e._repo,e._path)),{removed:i,events:o}}function kw(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function ur(t,e){let n=null;for(const r of t.views.values())n=n||DT(r,e);return n}function Sw(t,e){if(e._queryParams.loadsAllData())return Pc(t);{const r=e._queryIdentifier;return t.views.get(r)}}function Iw(t,e){return Sw(t,e)!=null}function gr(t){return Pc(t)!=null}function Pc(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
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
 */let Yl;function BT(t){M(!Yl,"__referenceConstructor has already been defined"),Yl=t}function HT(){return M(Yl,"Reference.ts has not been loaded"),Yl}let WT=1;class F0{constructor(e){this.listenProvider_=e,this.syncPointTree_=new ce(null),this.pendingWriteTree_=_T(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function np(t,e,n,r,s){return lT(t.pendingWriteTree_,e,n,r,s),s?li(t,new Gr(Yf(),e,n)):[]}function GT(t,e,n,r){cT(t.pendingWriteTree_,e,n,r);const s=ce.fromObject(n);return li(t,new Ks(Yf(),e,s))}function Jn(t,e,n=!1){const r=uT(t.pendingWriteTree_,e);if(dT(t.pendingWriteTree_,e)){let i=new ce(null);return r.snap!=null?i=i.set(re(),!0):We(r.children,o=>{i=i.set(new ae(o),!0)}),li(t,new Bl(r.path,i,n))}else return[]}function Xo(t,e,n){return li(t,new Gr(Qf(),e,n))}function qT(t,e,n){const r=ce.fromObject(n);return li(t,new Ks(Qf(),e,r))}function KT(t,e){return li(t,new Oo(Qf(),e))}function YT(t,e,n){const r=rp(t,n);if(r){const s=sp(r),i=s.path,o=s.queryId,c=rt(i,e),u=new Oo(Xf(o),c);return ip(t,i,u)}else return[]}function Ql(t,e,n,r,s=!1){const i=e._path,o=t.syncPointTree_.get(i);let c=[];if(o&&(e._queryIdentifier==="default"||Iw(o,e))){const u=$T(o,e,n,r);zT(o)&&(t.syncPointTree_=t.syncPointTree_.remove(i));const h=u.removed;if(c=u.events,!s){const m=h.findIndex(v=>v._queryParams.loadsAllData())!==-1,p=t.syncPointTree_.findOnPath(i,(v,k)=>gr(k));if(m&&!p){const v=t.syncPointTree_.subtree(i);if(!v.isEmpty()){const k=JT(v);for(let C=0;C<k.length;++C){const j=k[C],D=j.query,b=Rw(t,j);t.listenProvider_.startListening(no(D),Do(t,D),b.hashFn,b.onComplete)}}}!p&&h.length>0&&!r&&(m?t.listenProvider_.stopListening(no(e),null):h.forEach(v=>{const k=t.queryToTagMap.get(Oc(v));t.listenProvider_.stopListening(no(v),k)}))}ZT(t,h)}return c}function Cw(t,e,n,r){const s=rp(t,r);if(s!=null){const i=sp(s),o=i.path,c=i.queryId,u=rt(o,e),h=new Gr(Xf(c),u,n);return ip(t,o,h)}else return[]}function QT(t,e,n,r){const s=rp(t,r);if(s){const i=sp(s),o=i.path,c=i.queryId,u=rt(o,e),h=ce.fromObject(n),m=new Ks(Xf(c),u,h);return ip(t,o,m)}else return[]}function _h(t,e,n,r=!1){const s=e._path;let i=null,o=!1;t.syncPointTree_.foreachOnPath(s,(v,k)=>{const C=rt(v,s);i=i||ur(k,C),o=o||gr(k)});let c=t.syncPointTree_.get(s);c?(o=o||gr(c),i=i||ur(c,re())):(c=new Ew,t.syncPointTree_=t.syncPointTree_.set(s,c));let u;i!=null?u=!0:(u=!1,i=H.EMPTY_NODE,t.syncPointTree_.subtree(s).foreachChild((k,C)=>{const j=ur(C,re());j&&(i=i.updateImmediateChild(k,j))}));const h=Iw(c,e);if(!h&&!e._queryParams.loadsAllData()){const v=Oc(e);M(!t.queryToTagMap.has(v),"View does not exist, but we have a tag");const k=eR();t.queryToTagMap.set(v,k),t.tagToQueryMap.set(k,v)}const m=jc(t.pendingWriteTree_,s);let p=VT(c,e,n,m,i,u);if(!h&&!o&&!r){const v=Sw(c,e);p=p.concat(tR(t,e,v))}return p}function Ac(t,e,n){const s=t.pendingWriteTree_,i=t.syncPointTree_.findOnPath(e,(o,c)=>{const u=rt(o,e),h=ur(c,u);if(h)return h});return gw(s,e,i,n,!0)}function XT(t,e){const n=e._path;let r=null;t.syncPointTree_.foreachOnPath(n,(h,m)=>{const p=rt(h,n);r=r||ur(m,p)});let s=t.syncPointTree_.get(n);s?r=r||ur(s,re()):(s=new Ew,t.syncPointTree_=t.syncPointTree_.set(n,s));const i=r!=null,o=i?new mr(r,!0,!1):null,c=jc(t.pendingWriteTree_,e._path),u=Nw(s,e,c,i?o.getNode():H.EMPTY_NODE,i);return OT(u)}function li(t,e){return bw(e,t.syncPointTree_,null,jc(t.pendingWriteTree_,re()))}function bw(t,e,n,r){if(X(t.path))return Tw(t,e,n,r);{const s=e.get(re());n==null&&s!=null&&(n=ur(s,re()));let i=[];const o=Y(t.path),c=t.operationForChild(o),u=e.children.get(o);if(u&&c){const h=n?n.getImmediateChild(o):null,m=vw(r,o);i=i.concat(bw(c,u,h,m))}return s&&(i=i.concat(tp(s,t,r,n))),i}}function Tw(t,e,n,r){const s=e.get(re());n==null&&s!=null&&(n=ur(s,re()));let i=[];return e.children.inorderTraversal((o,c)=>{const u=n?n.getImmediateChild(o):null,h=vw(r,o),m=t.operationForChild(o);m&&(i=i.concat(Tw(m,c,u,h)))}),s&&(i=i.concat(tp(s,t,r,n))),i}function Rw(t,e){const n=e.query,r=Do(t,n);return{hashFn:()=>(AT(e)||H.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return r?YT(t,n._path,r):KT(t,n._path);{const i=K2(s,n);return Ql(t,n,null,i)}}}}function Do(t,e){const n=Oc(e);return t.queryToTagMap.get(n)}function Oc(t){return t._path.toString()+"$"+t._queryIdentifier}function rp(t,e){return t.tagToQueryMap.get(e)}function sp(t){const e=t.indexOf("$");return M(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new ae(t.substr(0,e))}}function ip(t,e,n){const r=t.syncPointTree_.get(e);M(r,"Missing sync point for query tag that we're tracking");const s=jc(t.pendingWriteTree_,e);return tp(r,n,s,null)}function JT(t){return t.fold((e,n,r)=>{if(n&&gr(n))return[Pc(n)];{let s=[];return n&&(s=kw(n)),We(r,(i,o)=>{s=s.concat(o)}),s}})}function no(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(HT())(t._repo,t._path):t}function ZT(t,e){for(let n=0;n<e.length;++n){const r=e[n];if(!r._queryParams.loadsAllData()){const s=Oc(r),i=t.queryToTagMap.get(s);t.queryToTagMap.delete(s),t.tagToQueryMap.delete(i)}}}function eR(){return WT++}function tR(t,e,n){const r=e._path,s=Do(t,e),i=Rw(t,n),o=t.listenProvider_.startListening(no(e),s,i.hashFn,i.onComplete),c=t.syncPointTree_.subtree(r);if(s)M(!gr(c.value),"If we're adding a query, it shouldn't be shadowed");else{const u=c.fold((h,m,p)=>{if(!X(h)&&m&&gr(m))return[Pc(m).query];{let v=[];return m&&(v=v.concat(kw(m).map(k=>k.query))),We(p,(k,C)=>{v=v.concat(C)}),v}});for(let h=0;h<u.length;++h){const m=u[h];t.listenProvider_.stopListening(no(m),Do(t,m))}}return o}/**
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
 */class op{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new op(n)}node(){return this.node_}}class ap{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=ke(this.path_,e);return new ap(this.syncTree_,n)}node(){return Ac(this.syncTree_,this.path_)}}const nR=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},U0=function(t,e,n){if(!t||typeof t!="object")return t;if(M(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return rR(t[".sv"],e,n);if(typeof t[".sv"]=="object")return sR(t[".sv"],e);M(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},rR=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:M(!1,"Unexpected server value: "+t)}},sR=function(t,e,n){t.hasOwnProperty("increment")||M(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const r=t.increment;typeof r!="number"&&M(!1,"Unexpected increment value: "+r);const s=e.node();if(M(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return r;const o=s.getValue();return typeof o!="number"?r:o+r},jw=function(t,e,n,r){return cp(e,new ap(n,t),r)},lp=function(t,e,n){return cp(t,new op(e),n)};function cp(t,e,n){const r=t.getPriority().val(),s=U0(r,e.getImmediateChild(".priority"),n);let i;if(t.isLeafNode()){const o=t,c=U0(o.getValue(),e,n);return c!==o.getValue()||s!==o.getPriority().val()?new Le(c,Ce(s)):t}else{const o=t;return i=o,s!==o.getPriority().val()&&(i=i.updatePriority(new Le(s))),o.forEachChild(_e,(c,u)=>{const h=cp(u,e.getImmediateChild(c),n);h!==u&&(i=i.updateImmediateChild(c,h))}),i}}/**
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
 */class up{constructor(e="",n=null,r={children:{},childCount:0}){this.name=e,this.parent=n,this.node=r}}function Dc(t,e){let n=e instanceof ae?e:new ae(e),r=t,s=Y(n);for(;s!==null;){const i=$r(r.node.children,s)||{children:{},childCount:0};r=new up(s,r,i),n=ue(n),s=Y(n)}return r}function rs(t){return t.node.value}function dp(t,e){t.node.value=e,wh(t)}function Pw(t){return t.node.childCount>0}function iR(t){return rs(t)===void 0&&!Pw(t)}function Lc(t,e){We(t.node.children,(n,r)=>{e(new up(n,t,r))})}function Aw(t,e,n,r){n&&e(t),Lc(t,s=>{Aw(s,e,!0)})}function oR(t,e,n){let r=t.parent;for(;r!==null;){if(e(r))return!0;r=r.parent}return!1}function Jo(t){return new ae(t.parent===null?t.name:Jo(t.parent)+"/"+t.name)}function wh(t){t.parent!==null&&aR(t.parent,t.name,t)}function aR(t,e,n){const r=iR(n),s=Xt(t.node.children,e);r&&s?(delete t.node.children[e],t.node.childCount--,wh(t)):!r&&!s&&(t.node.children[e]=n.node,t.node.childCount++,wh(t))}/**
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
 */const lR=/[\[\].#$\/\u0000-\u001F\u007F]/,cR=/[\[\].#$\u0000-\u001F\u007F]/,ed=10*1024*1024,hp=function(t){return typeof t=="string"&&t.length!==0&&!lR.test(t)},Ow=function(t){return typeof t=="string"&&t.length!==0&&!cR.test(t)},uR=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),Ow(t)},Dw=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!Ff(t)||t&&typeof t=="object"&&Xt(t,".sv")},dR=function(t,e,n,r){Zo(Nc(t,"value"),e,n)},Zo=function(t,e,n){const r=n instanceof ae?new bb(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+br(r));if(typeof e=="function")throw new Error(t+"contains a function "+br(r)+" with contents = "+e.toString());if(Ff(e))throw new Error(t+"contains "+e.toString()+" "+br(r));if(typeof e=="string"&&e.length>ed/3&&kc(e)>ed)throw new Error(t+"contains a string greater than "+ed+" utf8 bytes "+br(r)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,i=!1;if(We(e,(o,c)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(i=!0,!hp(o)))throw new Error(t+" contains an invalid key ("+o+") "+br(r)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);Tb(r,o),Zo(t,c,r),Rb(r)}),s&&i)throw new Error(t+' contains ".value" child '+br(r)+" in addition to actual children.")}},hR=function(t,e){let n,r;for(n=0;n<e.length;n++){r=e[n];const i=Ro(r);for(let o=0;o<i.length;o++)if(!(i[o]===".priority"&&o===i.length-1)){if(!hp(i[o]))throw new Error(t+"contains an invalid key ("+i[o]+") in path "+r.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(Cb);let s=null;for(n=0;n<e.length;n++){if(r=e[n],s!==null&&jt(s,r))throw new Error(t+"contains a path "+s.toString()+" that is ancestor of another path "+r.toString());s=r}},fR=function(t,e,n,r){const s=Nc(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const i=[];We(e,(o,c)=>{const u=new ae(o);if(Zo(s,c,ke(n,u)),Bf(u)===".priority"&&!Dw(c))throw new Error(s+"contains an invalid value for '"+u.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");i.push(u)}),hR(s,i)},Lw=function(t,e,n,r){if(!Ow(n))throw new Error(Nc(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},pR=function(t,e,n,r){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),Lw(t,e,n)},fp=function(t,e){if(Y(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},mR=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!hp(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!uR(n))throw new Error(Nc(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
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
 */class gR{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Mc(t,e){let n=null;for(let r=0;r<e.length;r++){const s=e[r],i=s.getPath();n!==null&&!Hf(i,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:i}),n.events.push(s)}n&&t.eventLists_.push(n)}function Mw(t,e,n){Mc(t,n),Fw(t,r=>Hf(r,e))}function kt(t,e,n){Mc(t,n),Fw(t,r=>jt(r,e)||jt(e,r))}function Fw(t,e){t.recursionDepth_++;let n=!0;for(let r=0;r<t.eventLists_.length;r++){const s=t.eventLists_[r];if(s){const i=s.path;e(i)?(vR(t.eventLists_[r]),t.eventLists_[r]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function vR(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const r=n.getEventRunner();Ji&&$e("event: "+n.toString()),ai(r)}}}/**
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
 */const yR="repo_interrupt",xR=25;class _R{constructor(e,n,r,s){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=r,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new gR,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=$l(),this.transactionQueueTree_=new up,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function wR(t,e,n){if(t.stats_=Vf(t.repoInfo_),t.forceRestClient_||J2())t.server_=new Vl(t.repoInfo_,(r,s,i,o)=>{z0(t,r,s,i,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>V0(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{Pe(n)}catch(r){throw new Error("Invalid authOverride provided: "+r)}}t.persistentConnection_=new Sn(t.repoInfo_,e,(r,s,i,o)=>{z0(t,r,s,i,o)},r=>{V0(t,r)},r=>{NR(t,r)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(r=>{t.server_.refreshAuthToken(r)}),t.appCheckProvider_.addTokenChangeListener(r=>{t.server_.refreshAppCheckToken(r.token)}),t.statsReporter_=rb(t.repoInfo_,()=>new nT(t.stats_,t.server_)),t.infoData_=new Xb,t.infoSyncTree_=new F0({startListening:(r,s,i,o)=>{let c=[];const u=t.infoData_.getNode(r._path);return u.isEmpty()||(c=Xo(t.infoSyncTree_,r._path,u),setTimeout(()=>{o("ok")},0)),c},stopListening:()=>{}}),pp(t,"connected",!1),t.serverSyncTree_=new F0({startListening:(r,s,i,o)=>(t.server_.listen(r,i,s,(c,u)=>{const h=o(c,u);kt(t.eventQueue_,r._path,h)}),[]),stopListening:(r,s)=>{t.server_.unlisten(r,s)}})}function ER(t){const n=t.infoData_.getNode(new ae(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function ea(t){return nR({timestamp:ER(t)})}function z0(t,e,n,r,s){t.dataUpdateCount++;const i=new ae(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(s)if(r){const u=jl(n,h=>Ce(h));o=QT(t.serverSyncTree_,i,u,s)}else{const u=Ce(n);o=Cw(t.serverSyncTree_,i,u,s)}else if(r){const u=jl(n,h=>Ce(h));o=qT(t.serverSyncTree_,i,u)}else{const u=Ce(n);o=Xo(t.serverSyncTree_,i,u)}let c=i;o.length>0&&(c=Qs(t,i)),kt(t.eventQueue_,c,o)}function V0(t,e){pp(t,"connected",e),e===!1&&CR(t)}function NR(t,e){We(e,(n,r)=>{pp(t,n,r)})}function pp(t,e,n){const r=new ae("/.info/"+e),s=Ce(n);t.infoData_.updateSnapshot(r,s);const i=Xo(t.infoSyncTree_,r,s);kt(t.eventQueue_,r,i)}function Fc(t){return t.nextWriteId_++}function kR(t,e,n){const r=XT(t.serverSyncTree_,e);return r!=null?Promise.resolve(r):t.server_.get(e).then(s=>{const i=Ce(s).withIndex(e._queryParams.getIndex());_h(t.serverSyncTree_,e,n,!0);let o;if(e._queryParams.loadsAllData())o=Xo(t.serverSyncTree_,e._path,i);else{const c=Do(t.serverSyncTree_,e);o=Cw(t.serverSyncTree_,e._path,i,c)}return kt(t.eventQueue_,e._path,o),Ql(t.serverSyncTree_,e,n,null,!0),i},s=>(ci(t,"get for query "+Pe(e)+" failed: "+s),Promise.reject(new Error(s))))}function SR(t,e,n,r,s){ci(t,"set",{path:e.toString(),value:n,priority:r});const i=ea(t),o=Ce(n,r),c=Ac(t.serverSyncTree_,e),u=lp(o,c,i),h=Fc(t),m=np(t.serverSyncTree_,e,u,h,!0);Mc(t.eventQueue_,m),t.server_.put(e.toString(),o.val(!0),(v,k)=>{const C=v==="ok";C||it("set at "+e+" failed: "+v);const j=Jn(t.serverSyncTree_,h,!C);kt(t.eventQueue_,e,j),Eh(t,s,v,k)});const p=gp(t,e);Qs(t,p),kt(t.eventQueue_,p,[])}function IR(t,e,n,r){ci(t,"update",{path:e.toString(),value:n});let s=!0;const i=ea(t),o={};if(We(n,(c,u)=>{s=!1,o[c]=jw(ke(e,c),Ce(u),t.serverSyncTree_,i)}),s)$e("update() called with empty data.  Don't do anything."),Eh(t,r,"ok",void 0);else{const c=Fc(t),u=GT(t.serverSyncTree_,e,o,c);Mc(t.eventQueue_,u),t.server_.merge(e.toString(),n,(h,m)=>{const p=h==="ok";p||it("update at "+e+" failed: "+h);const v=Jn(t.serverSyncTree_,c,!p),k=v.length>0?Qs(t,e):e;kt(t.eventQueue_,k,v),Eh(t,r,h,m)}),We(n,h=>{const m=gp(t,ke(e,h));Qs(t,m)}),kt(t.eventQueue_,e,[])}}function CR(t){ci(t,"onDisconnectEvents");const e=ea(t),n=$l();ph(t.onDisconnect_,re(),(s,i)=>{const o=jw(s,i,t.serverSyncTree_,e);hw(n,s,o)});let r=[];ph(n,re(),(s,i)=>{r=r.concat(Xo(t.serverSyncTree_,s,i));const o=gp(t,s);Qs(t,o)}),t.onDisconnect_=$l(),kt(t.eventQueue_,re(),r)}function bR(t,e,n){let r;Y(e._path)===".info"?r=_h(t.infoSyncTree_,e,n):r=_h(t.serverSyncTree_,e,n),Mw(t.eventQueue_,e._path,r)}function TR(t,e,n){let r;Y(e._path)===".info"?r=Ql(t.infoSyncTree_,e,n):r=Ql(t.serverSyncTree_,e,n),Mw(t.eventQueue_,e._path,r)}function RR(t){t.persistentConnection_&&t.persistentConnection_.interrupt(yR)}function ci(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),$e(n,...e)}function Eh(t,e,n,r){e&&ai(()=>{if(n==="ok")e(null);else{const s=(n||"error").toUpperCase();let i=s;r&&(i+=": "+r);const o=new Error(i);o.code=s,e(o)}})}function jR(t,e,n,r,s,i){ci(t,"transaction on "+e);const o={path:e,update:n,onComplete:r,status:null,order:L_(),applyLocally:i,retryCount:0,unwatcher:s,abortReason:null,currentWriteId:null,currentInputSnapshot:null,currentOutputSnapshotRaw:null,currentOutputSnapshotResolved:null},c=mp(t,e,void 0);o.currentInputSnapshot=c;const u=o.update(c.val());if(u===void 0)o.unwatcher(),o.currentOutputSnapshotRaw=null,o.currentOutputSnapshotResolved=null,o.onComplete&&o.onComplete(null,!1,o.currentInputSnapshot);else{Zo("transaction failed: Data returned ",u,o.path),o.status=0;const h=Dc(t.transactionQueueTree_,e),m=rs(h)||[];m.push(o),dp(h,m);let p;typeof u=="object"&&u!==null&&Xt(u,".priority")?(p=$r(u,".priority"),M(Dw(p),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):p=(Ac(t.serverSyncTree_,e)||H.EMPTY_NODE).getPriority().val();const v=ea(t),k=Ce(u,p),C=lp(k,c,v);o.currentOutputSnapshotRaw=k,o.currentOutputSnapshotResolved=C,o.currentWriteId=Fc(t);const j=np(t.serverSyncTree_,e,C,o.currentWriteId,o.applyLocally);kt(t.eventQueue_,e,j),Uc(t,t.transactionQueueTree_)}}function mp(t,e,n){return Ac(t.serverSyncTree_,e,n)||H.EMPTY_NODE}function Uc(t,e=t.transactionQueueTree_){if(e||zc(t,e),rs(e)){const n=zw(t,e);M(n.length>0,"Sending zero length transaction queue"),n.every(s=>s.status===0)&&PR(t,Jo(e),n)}else Pw(e)&&Lc(e,n=>{Uc(t,n)})}function PR(t,e,n){const r=n.map(h=>h.currentWriteId),s=mp(t,e,r);let i=s;const o=s.hash();for(let h=0;h<n.length;h++){const m=n[h];M(m.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),m.status=1,m.retryCount++;const p=rt(e,m.path);i=i.updateChild(p,m.currentOutputSnapshotRaw)}const c=i.val(!0),u=e;t.server_.put(u.toString(),c,h=>{ci(t,"transaction put response",{path:u.toString(),status:h});let m=[];if(h==="ok"){const p=[];for(let v=0;v<n.length;v++)n[v].status=2,m=m.concat(Jn(t.serverSyncTree_,n[v].currentWriteId)),n[v].onComplete&&p.push(()=>n[v].onComplete(null,!0,n[v].currentOutputSnapshotResolved)),n[v].unwatcher();zc(t,Dc(t.transactionQueueTree_,e)),Uc(t,t.transactionQueueTree_),kt(t.eventQueue_,e,m);for(let v=0;v<p.length;v++)ai(p[v])}else{if(h==="datastale")for(let p=0;p<n.length;p++)n[p].status===3?n[p].status=4:n[p].status=0;else{it("transaction at "+u.toString()+" failed: "+h);for(let p=0;p<n.length;p++)n[p].status=4,n[p].abortReason=h}Qs(t,e)}},o)}function Qs(t,e){const n=Uw(t,e),r=Jo(n),s=zw(t,n);return AR(t,s,r),r}function AR(t,e,n){if(e.length===0)return;const r=[];let s=[];const o=e.filter(c=>c.status===0).map(c=>c.currentWriteId);for(let c=0;c<e.length;c++){const u=e[c],h=rt(n,u.path);let m=!1,p;if(M(h!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),u.status===4)m=!0,p=u.abortReason,s=s.concat(Jn(t.serverSyncTree_,u.currentWriteId,!0));else if(u.status===0)if(u.retryCount>=xR)m=!0,p="maxretry",s=s.concat(Jn(t.serverSyncTree_,u.currentWriteId,!0));else{const v=mp(t,u.path,o);u.currentInputSnapshot=v;const k=e[c].update(v.val());if(k!==void 0){Zo("transaction failed: Data returned ",k,u.path);let C=Ce(k);typeof k=="object"&&k!=null&&Xt(k,".priority")||(C=C.updatePriority(v.getPriority()));const D=u.currentWriteId,b=ea(t),x=lp(C,v,b);u.currentOutputSnapshotRaw=C,u.currentOutputSnapshotResolved=x,u.currentWriteId=Fc(t),o.splice(o.indexOf(D),1),s=s.concat(np(t.serverSyncTree_,u.path,x,u.currentWriteId,u.applyLocally)),s=s.concat(Jn(t.serverSyncTree_,D,!0))}else m=!0,p="nodata",s=s.concat(Jn(t.serverSyncTree_,u.currentWriteId,!0))}kt(t.eventQueue_,n,s),s=[],m&&(e[c].status=2,function(v){setTimeout(v,Math.floor(0))}(e[c].unwatcher),e[c].onComplete&&(p==="nodata"?r.push(()=>e[c].onComplete(null,!1,e[c].currentInputSnapshot)):r.push(()=>e[c].onComplete(new Error(p),!1,null))))}zc(t,t.transactionQueueTree_);for(let c=0;c<r.length;c++)ai(r[c]);Uc(t,t.transactionQueueTree_)}function Uw(t,e){let n,r=t.transactionQueueTree_;for(n=Y(e);n!==null&&rs(r)===void 0;)r=Dc(r,n),e=ue(e),n=Y(e);return r}function zw(t,e){const n=[];return Vw(t,e,n),n.sort((r,s)=>r.order-s.order),n}function Vw(t,e,n){const r=rs(e);if(r)for(let s=0;s<r.length;s++)n.push(r[s]);Lc(e,s=>{Vw(t,s,n)})}function zc(t,e){const n=rs(e);if(n){let r=0;for(let s=0;s<n.length;s++)n[s].status!==2&&(n[r]=n[s],r++);n.length=r,dp(e,n.length>0?n:void 0)}Lc(e,r=>{zc(t,r)})}function gp(t,e){const n=Jo(Uw(t,e)),r=Dc(t.transactionQueueTree_,e);return oR(r,s=>{td(t,s)}),td(t,r),Aw(r,s=>{td(t,s)}),n}function td(t,e){const n=rs(e);if(n){const r=[];let s=[],i=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(M(i===o-1,"All SENT items should be at beginning of queue."),i=o,n[o].status=3,n[o].abortReason="set"):(M(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),s=s.concat(Jn(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&r.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));i===-1?dp(e,void 0):n.length=i+1,kt(t.eventQueue_,Jo(e),s);for(let o=0;o<r.length;o++)ai(r[o])}}/**
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
 */function OR(t){let e="";const n=t.split("/");for(let r=0;r<n.length;r++)if(n[r].length>0){let s=n[r];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function DR(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const r=n.split("=");r.length===2?e[decodeURIComponent(r[0])]=decodeURIComponent(r[1]):it(`Invalid query segment '${n}' in query '${t}'`)}return e}const $0=function(t,e){const n=LR(t),r=n.namespace;n.domain==="firebase.com"&&An(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!r||r==="undefined")&&n.domain!=="localhost"&&An("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||B2();const s=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new Y_(n.host,n.secure,r,s,e,"",r!==n.subdomain),path:new ae(n.pathString)}},LR=function(t){let e="",n="",r="",s="",i="",o=!0,c="https",u=443;if(typeof t=="string"){let h=t.indexOf("//");h>=0&&(c=t.substring(0,h-1),t=t.substring(h+2));let m=t.indexOf("/");m===-1&&(m=t.length);let p=t.indexOf("?");p===-1&&(p=t.length),e=t.substring(0,Math.min(m,p)),m<p&&(s=OR(t.substring(m,p)));const v=DR(t.substring(Math.min(t.length,p)));h=e.indexOf(":"),h>=0?(o=c==="https"||c==="wss",u=parseInt(e.substring(h+1),10)):h=e.length;const k=e.slice(0,h);if(k.toLowerCase()==="localhost")n="localhost";else if(k.split(".").length<=2)n=k;else{const C=e.indexOf(".");r=e.substring(0,C).toLowerCase(),n=e.substring(C+1),i=r}"ns"in v&&(i=v.ns)}return{host:e,port:u,domain:n,subdomain:r,secure:o,scheme:c,pathString:s,namespace:i}};/**
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
 */class MR{constructor(e,n,r,s){this.eventType=e,this.eventRegistration=n,this.snapshot=r,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+Pe(this.snapshot.exportVal())}}class FR{constructor(e,n,r){this.eventRegistration=e,this.error=n,this.path=r}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
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
 */class $w{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return M(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class vp{constructor(e,n,r,s){this._repo=e,this._path=n,this._queryParams=r,this._orderByCalled=s}get key(){return X(this._path)?null:Bf(this._path)}get ref(){return new ln(this._repo,this._path)}get _queryIdentifier(){const e=b0(this._queryParams),n=Uf(e);return n==="{}"?"default":n}get _queryObject(){return b0(this._queryParams)}isEqual(e){if(e=Oe(e),!(e instanceof vp))return!1;const n=this._repo===e._repo,r=Hf(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return n&&r&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+Ib(this._path)}}class ln extends vp{constructor(e,n){super(e,n,new Kf,!1)}get parent(){const e=sw(this._path);return e===null?null:new ln(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class Xs{constructor(e,n,r){this._node=e,this.ref=n,this._index=r}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new ae(e),r=Nh(this.ref,e);return new Xs(this._node.getChild(n),r,_e)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(r,s)=>e(new Xs(s,Nh(this.ref,r),_e)))}hasChild(e){const n=new ae(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function Te(t,e){return t=Oe(t),t._checkNotDeleted("ref"),e!==void 0?Nh(t._root,e):t._root}function Nh(t,e){return t=Oe(t),Y(t._path)===null?pR("child","path",e):Lw("child","path",e),new ln(t._repo,ke(t._path,e))}function UR(t){return fp("remove",t._path),kh(t,null)}function kh(t,e){t=Oe(t),fp("set",t._path),dR("set",e,t._path);const n=new si;return SR(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}function B0(t,e){fR("update",e,t._path);const n=new si;return IR(t._repo,t._path,e,n.wrapCallback(()=>{})),n.promise}function hs(t){t=Oe(t);const e=new $w(()=>{}),n=new Vc(e);return kR(t._repo,t,n).then(r=>new Xs(r,new ln(t._repo,t._path),t._queryParams.getIndex()))}class Vc{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const r=n._queryParams.getIndex();return new MR("value",this,new Xs(e.snapshotNode,new ln(n._repo,n._path),r))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new FR(this,e,n):null}matches(e){return e instanceof Vc?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function zR(t,e,n,r,s){const i=new $w(n,void 0),o=new Vc(i);return bR(t._repo,t,o),()=>TR(t._repo,t,o)}function Bn(t,e,n,r){return zR(t,"value",e)}FT(ln);BT(ln);/**
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
 */const VR="FIREBASE_DATABASE_EMULATOR_HOST",Sh={};let $R=!1;function BR(t,e,n,r){t.repoInfo_=new Y_(`${e}:${n}`,!1,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0),r&&(t.authTokenProvider_=r)}function HR(t,e,n,r,s){let i=r||t.options.databaseURL;i===void 0&&(t.options.projectId||An("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),$e("Using default host for project ",t.options.projectId),i=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=$0(i,s),c=o.repoInfo,u;typeof process<"u"&&u0&&(u=u0[VR]),u?(i=`http://${u}?ns=${c.namespace}`,o=$0(i,s),c=o.repoInfo):o.repoInfo.secure;const h=new eb(t.name,t.options,e);mR("Invalid Firebase Database URL",o),X(o.path)||An("Database URL must point to the root of a Firebase Database (not including a child path).");const m=GR(c,t,h,new Z2(t.name,n));return new qR(m,t)}function WR(t,e){const n=Sh[e];(!n||n[t.key]!==t)&&An(`Database ${e}(${t.repoInfo_}) has already been deleted.`),RR(t),delete n[t.key]}function GR(t,e,n,r){let s=Sh[e.name];s||(s={},Sh[e.name]=s);let i=s[t.toURLString()];return i&&An("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),i=new _R(t,$R,n,r),s[t.toURLString()]=i,i}class qR{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(wR(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new ln(this._repo,re())),this._rootInternal}_delete(){return this._rootInternal!==null&&(WR(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&An("Cannot call "+e+" on a deleted database.")}}function KR(t=Sc(),e){const n=_r(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const r=Ux("database");r&&YR(n,...r)}return n}function YR(t,e,n,r={}){t=Oe(t),t._checkNotDeleted("useEmulator"),t._instanceStarted&&An("Cannot call useEmulator() after instance has already been initialized.");const s=t._repoInternal;let i;if(s.repoInfo_.nodeAdmin)r.mockUserToken&&An('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),i=new nl(nl.OWNER);else if(r.mockUserToken){const o=typeof r.mockUserToken=="string"?r.mockUserToken:$x(r.mockUserToken,t.app.options.projectId);i=new nl(o)}BR(s,e,n,i)}/**
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
 */function QR(t){F2(Zr),Kt(new Dt("database",(e,{instanceIdentifier:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),i=e.getProvider("app-check-internal");return HR(r,s,i,n)},"PUBLIC").setMultipleInstances(!0)),vt(d0,h0,t),vt(d0,h0,"esm2017")}/**
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
 */class XR{constructor(e,n){this.committed=e,this.snapshot=n}toJSON(){return{committed:this.committed,snapshot:this.snapshot.toJSON()}}}function JR(t,e,n){var r;if(t=Oe(t),fp("Reference.transaction",t._path),t.key===".length"||t.key===".keys")throw"Reference.transaction failed: "+t.key+" is a read-only object.";const s=(r=void 0)!==null&&r!==void 0?r:!0,i=new si,o=(u,h,m)=>{let p=null;u?i.reject(u):(p=new Xs(m,new ln(t._repo,t._path),_e),i.resolve(new XR(h,p)))},c=Bn(t,()=>{});return jR(t._repo,t._path,e,o,c,s),i.promise}Sn.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};Sn.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};QR();var H0=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Bw;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(w,y){function _(){}_.prototype=y.prototype,w.D=y.prototype,w.prototype=new _,w.prototype.constructor=w,w.C=function(N,I,T){for(var E=Array(arguments.length-2),K=2;K<arguments.length;K++)E[K-2]=arguments[K];return y.prototype[I].apply(N,E)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(w,y,_){_||(_=0);var N=Array(16);if(typeof y=="string")for(var I=0;16>I;++I)N[I]=y.charCodeAt(_++)|y.charCodeAt(_++)<<8|y.charCodeAt(_++)<<16|y.charCodeAt(_++)<<24;else for(I=0;16>I;++I)N[I]=y[_++]|y[_++]<<8|y[_++]<<16|y[_++]<<24;y=w.g[0],_=w.g[1],I=w.g[2];var T=w.g[3],E=y+(T^_&(I^T))+N[0]+3614090360&4294967295;y=_+(E<<7&4294967295|E>>>25),E=T+(I^y&(_^I))+N[1]+3905402710&4294967295,T=y+(E<<12&4294967295|E>>>20),E=I+(_^T&(y^_))+N[2]+606105819&4294967295,I=T+(E<<17&4294967295|E>>>15),E=_+(y^I&(T^y))+N[3]+3250441966&4294967295,_=I+(E<<22&4294967295|E>>>10),E=y+(T^_&(I^T))+N[4]+4118548399&4294967295,y=_+(E<<7&4294967295|E>>>25),E=T+(I^y&(_^I))+N[5]+1200080426&4294967295,T=y+(E<<12&4294967295|E>>>20),E=I+(_^T&(y^_))+N[6]+2821735955&4294967295,I=T+(E<<17&4294967295|E>>>15),E=_+(y^I&(T^y))+N[7]+4249261313&4294967295,_=I+(E<<22&4294967295|E>>>10),E=y+(T^_&(I^T))+N[8]+1770035416&4294967295,y=_+(E<<7&4294967295|E>>>25),E=T+(I^y&(_^I))+N[9]+2336552879&4294967295,T=y+(E<<12&4294967295|E>>>20),E=I+(_^T&(y^_))+N[10]+4294925233&4294967295,I=T+(E<<17&4294967295|E>>>15),E=_+(y^I&(T^y))+N[11]+2304563134&4294967295,_=I+(E<<22&4294967295|E>>>10),E=y+(T^_&(I^T))+N[12]+1804603682&4294967295,y=_+(E<<7&4294967295|E>>>25),E=T+(I^y&(_^I))+N[13]+4254626195&4294967295,T=y+(E<<12&4294967295|E>>>20),E=I+(_^T&(y^_))+N[14]+2792965006&4294967295,I=T+(E<<17&4294967295|E>>>15),E=_+(y^I&(T^y))+N[15]+1236535329&4294967295,_=I+(E<<22&4294967295|E>>>10),E=y+(I^T&(_^I))+N[1]+4129170786&4294967295,y=_+(E<<5&4294967295|E>>>27),E=T+(_^I&(y^_))+N[6]+3225465664&4294967295,T=y+(E<<9&4294967295|E>>>23),E=I+(y^_&(T^y))+N[11]+643717713&4294967295,I=T+(E<<14&4294967295|E>>>18),E=_+(T^y&(I^T))+N[0]+3921069994&4294967295,_=I+(E<<20&4294967295|E>>>12),E=y+(I^T&(_^I))+N[5]+3593408605&4294967295,y=_+(E<<5&4294967295|E>>>27),E=T+(_^I&(y^_))+N[10]+38016083&4294967295,T=y+(E<<9&4294967295|E>>>23),E=I+(y^_&(T^y))+N[15]+3634488961&4294967295,I=T+(E<<14&4294967295|E>>>18),E=_+(T^y&(I^T))+N[4]+3889429448&4294967295,_=I+(E<<20&4294967295|E>>>12),E=y+(I^T&(_^I))+N[9]+568446438&4294967295,y=_+(E<<5&4294967295|E>>>27),E=T+(_^I&(y^_))+N[14]+3275163606&4294967295,T=y+(E<<9&4294967295|E>>>23),E=I+(y^_&(T^y))+N[3]+4107603335&4294967295,I=T+(E<<14&4294967295|E>>>18),E=_+(T^y&(I^T))+N[8]+1163531501&4294967295,_=I+(E<<20&4294967295|E>>>12),E=y+(I^T&(_^I))+N[13]+2850285829&4294967295,y=_+(E<<5&4294967295|E>>>27),E=T+(_^I&(y^_))+N[2]+4243563512&4294967295,T=y+(E<<9&4294967295|E>>>23),E=I+(y^_&(T^y))+N[7]+1735328473&4294967295,I=T+(E<<14&4294967295|E>>>18),E=_+(T^y&(I^T))+N[12]+2368359562&4294967295,_=I+(E<<20&4294967295|E>>>12),E=y+(_^I^T)+N[5]+4294588738&4294967295,y=_+(E<<4&4294967295|E>>>28),E=T+(y^_^I)+N[8]+2272392833&4294967295,T=y+(E<<11&4294967295|E>>>21),E=I+(T^y^_)+N[11]+1839030562&4294967295,I=T+(E<<16&4294967295|E>>>16),E=_+(I^T^y)+N[14]+4259657740&4294967295,_=I+(E<<23&4294967295|E>>>9),E=y+(_^I^T)+N[1]+2763975236&4294967295,y=_+(E<<4&4294967295|E>>>28),E=T+(y^_^I)+N[4]+1272893353&4294967295,T=y+(E<<11&4294967295|E>>>21),E=I+(T^y^_)+N[7]+4139469664&4294967295,I=T+(E<<16&4294967295|E>>>16),E=_+(I^T^y)+N[10]+3200236656&4294967295,_=I+(E<<23&4294967295|E>>>9),E=y+(_^I^T)+N[13]+681279174&4294967295,y=_+(E<<4&4294967295|E>>>28),E=T+(y^_^I)+N[0]+3936430074&4294967295,T=y+(E<<11&4294967295|E>>>21),E=I+(T^y^_)+N[3]+3572445317&4294967295,I=T+(E<<16&4294967295|E>>>16),E=_+(I^T^y)+N[6]+76029189&4294967295,_=I+(E<<23&4294967295|E>>>9),E=y+(_^I^T)+N[9]+3654602809&4294967295,y=_+(E<<4&4294967295|E>>>28),E=T+(y^_^I)+N[12]+3873151461&4294967295,T=y+(E<<11&4294967295|E>>>21),E=I+(T^y^_)+N[15]+530742520&4294967295,I=T+(E<<16&4294967295|E>>>16),E=_+(I^T^y)+N[2]+3299628645&4294967295,_=I+(E<<23&4294967295|E>>>9),E=y+(I^(_|~T))+N[0]+4096336452&4294967295,y=_+(E<<6&4294967295|E>>>26),E=T+(_^(y|~I))+N[7]+1126891415&4294967295,T=y+(E<<10&4294967295|E>>>22),E=I+(y^(T|~_))+N[14]+2878612391&4294967295,I=T+(E<<15&4294967295|E>>>17),E=_+(T^(I|~y))+N[5]+4237533241&4294967295,_=I+(E<<21&4294967295|E>>>11),E=y+(I^(_|~T))+N[12]+1700485571&4294967295,y=_+(E<<6&4294967295|E>>>26),E=T+(_^(y|~I))+N[3]+2399980690&4294967295,T=y+(E<<10&4294967295|E>>>22),E=I+(y^(T|~_))+N[10]+4293915773&4294967295,I=T+(E<<15&4294967295|E>>>17),E=_+(T^(I|~y))+N[1]+2240044497&4294967295,_=I+(E<<21&4294967295|E>>>11),E=y+(I^(_|~T))+N[8]+1873313359&4294967295,y=_+(E<<6&4294967295|E>>>26),E=T+(_^(y|~I))+N[15]+4264355552&4294967295,T=y+(E<<10&4294967295|E>>>22),E=I+(y^(T|~_))+N[6]+2734768916&4294967295,I=T+(E<<15&4294967295|E>>>17),E=_+(T^(I|~y))+N[13]+1309151649&4294967295,_=I+(E<<21&4294967295|E>>>11),E=y+(I^(_|~T))+N[4]+4149444226&4294967295,y=_+(E<<6&4294967295|E>>>26),E=T+(_^(y|~I))+N[11]+3174756917&4294967295,T=y+(E<<10&4294967295|E>>>22),E=I+(y^(T|~_))+N[2]+718787259&4294967295,I=T+(E<<15&4294967295|E>>>17),E=_+(T^(I|~y))+N[9]+3951481745&4294967295,w.g[0]=w.g[0]+y&4294967295,w.g[1]=w.g[1]+(I+(E<<21&4294967295|E>>>11))&4294967295,w.g[2]=w.g[2]+I&4294967295,w.g[3]=w.g[3]+T&4294967295}r.prototype.u=function(w,y){y===void 0&&(y=w.length);for(var _=y-this.blockSize,N=this.B,I=this.h,T=0;T<y;){if(I==0)for(;T<=_;)s(this,w,T),T+=this.blockSize;if(typeof w=="string"){for(;T<y;)if(N[I++]=w.charCodeAt(T++),I==this.blockSize){s(this,N),I=0;break}}else for(;T<y;)if(N[I++]=w[T++],I==this.blockSize){s(this,N),I=0;break}}this.h=I,this.o+=y},r.prototype.v=function(){var w=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);w[0]=128;for(var y=1;y<w.length-8;++y)w[y]=0;var _=8*this.o;for(y=w.length-8;y<w.length;++y)w[y]=_&255,_/=256;for(this.u(w),w=Array(16),y=_=0;4>y;++y)for(var N=0;32>N;N+=8)w[_++]=this.g[y]>>>N&255;return w};function i(w,y){var _=c;return Object.prototype.hasOwnProperty.call(_,w)?_[w]:_[w]=y(w)}function o(w,y){this.h=y;for(var _=[],N=!0,I=w.length-1;0<=I;I--){var T=w[I]|0;N&&T==y||(_[I]=T,N=!1)}this.g=_}var c={};function u(w){return-128<=w&&128>w?i(w,function(y){return new o([y|0],0>y?-1:0)}):new o([w|0],0>w?-1:0)}function h(w){if(isNaN(w)||!isFinite(w))return p;if(0>w)return D(h(-w));for(var y=[],_=1,N=0;w>=_;N++)y[N]=w/_|0,_*=4294967296;return new o(y,0)}function m(w,y){if(w.length==0)throw Error("number format error: empty string");if(y=y||10,2>y||36<y)throw Error("radix out of range: "+y);if(w.charAt(0)=="-")return D(m(w.substring(1),y));if(0<=w.indexOf("-"))throw Error('number format error: interior "-" character');for(var _=h(Math.pow(y,8)),N=p,I=0;I<w.length;I+=8){var T=Math.min(8,w.length-I),E=parseInt(w.substring(I,I+T),y);8>T?(T=h(Math.pow(y,T)),N=N.j(T).add(h(E))):(N=N.j(_),N=N.add(h(E)))}return N}var p=u(0),v=u(1),k=u(16777216);t=o.prototype,t.m=function(){if(j(this))return-D(this).m();for(var w=0,y=1,_=0;_<this.g.length;_++){var N=this.i(_);w+=(0<=N?N:4294967296+N)*y,y*=4294967296}return w},t.toString=function(w){if(w=w||10,2>w||36<w)throw Error("radix out of range: "+w);if(C(this))return"0";if(j(this))return"-"+D(this).toString(w);for(var y=h(Math.pow(w,6)),_=this,N="";;){var I=A(_,y).g;_=b(_,I.j(y));var T=((0<_.g.length?_.g[0]:_.h)>>>0).toString(w);if(_=I,C(_))return T+N;for(;6>T.length;)T="0"+T;N=T+N}},t.i=function(w){return 0>w?0:w<this.g.length?this.g[w]:this.h};function C(w){if(w.h!=0)return!1;for(var y=0;y<w.g.length;y++)if(w.g[y]!=0)return!1;return!0}function j(w){return w.h==-1}t.l=function(w){return w=b(this,w),j(w)?-1:C(w)?0:1};function D(w){for(var y=w.g.length,_=[],N=0;N<y;N++)_[N]=~w.g[N];return new o(_,~w.h).add(v)}t.abs=function(){return j(this)?D(this):this},t.add=function(w){for(var y=Math.max(this.g.length,w.g.length),_=[],N=0,I=0;I<=y;I++){var T=N+(this.i(I)&65535)+(w.i(I)&65535),E=(T>>>16)+(this.i(I)>>>16)+(w.i(I)>>>16);N=E>>>16,T&=65535,E&=65535,_[I]=E<<16|T}return new o(_,_[_.length-1]&-2147483648?-1:0)};function b(w,y){return w.add(D(y))}t.j=function(w){if(C(this)||C(w))return p;if(j(this))return j(w)?D(this).j(D(w)):D(D(this).j(w));if(j(w))return D(this.j(D(w)));if(0>this.l(k)&&0>w.l(k))return h(this.m()*w.m());for(var y=this.g.length+w.g.length,_=[],N=0;N<2*y;N++)_[N]=0;for(N=0;N<this.g.length;N++)for(var I=0;I<w.g.length;I++){var T=this.i(N)>>>16,E=this.i(N)&65535,K=w.i(I)>>>16,me=w.i(I)&65535;_[2*N+2*I]+=E*me,x(_,2*N+2*I),_[2*N+2*I+1]+=T*me,x(_,2*N+2*I+1),_[2*N+2*I+1]+=E*K,x(_,2*N+2*I+1),_[2*N+2*I+2]+=T*K,x(_,2*N+2*I+2)}for(N=0;N<y;N++)_[N]=_[2*N+1]<<16|_[2*N];for(N=y;N<2*y;N++)_[N]=0;return new o(_,0)};function x(w,y){for(;(w[y]&65535)!=w[y];)w[y+1]+=w[y]>>>16,w[y]&=65535,y++}function S(w,y){this.g=w,this.h=y}function A(w,y){if(C(y))throw Error("division by zero");if(C(w))return new S(p,p);if(j(w))return y=A(D(w),y),new S(D(y.g),D(y.h));if(j(y))return y=A(w,D(y)),new S(D(y.g),y.h);if(30<w.g.length){if(j(w)||j(y))throw Error("slowDivide_ only works with positive integers.");for(var _=v,N=y;0>=N.l(w);)_=L(_),N=L(N);var I=F(_,1),T=F(N,1);for(N=F(N,2),_=F(_,2);!C(N);){var E=T.add(N);0>=E.l(w)&&(I=I.add(_),T=E),N=F(N,1),_=F(_,1)}return y=b(w,I.j(y)),new S(I,y)}for(I=p;0<=w.l(y);){for(_=Math.max(1,Math.floor(w.m()/y.m())),N=Math.ceil(Math.log(_)/Math.LN2),N=48>=N?1:Math.pow(2,N-48),T=h(_),E=T.j(y);j(E)||0<E.l(w);)_-=N,T=h(_),E=T.j(y);C(T)&&(T=v),I=I.add(T),w=b(w,E)}return new S(I,w)}t.A=function(w){return A(this,w).h},t.and=function(w){for(var y=Math.max(this.g.length,w.g.length),_=[],N=0;N<y;N++)_[N]=this.i(N)&w.i(N);return new o(_,this.h&w.h)},t.or=function(w){for(var y=Math.max(this.g.length,w.g.length),_=[],N=0;N<y;N++)_[N]=this.i(N)|w.i(N);return new o(_,this.h|w.h)},t.xor=function(w){for(var y=Math.max(this.g.length,w.g.length),_=[],N=0;N<y;N++)_[N]=this.i(N)^w.i(N);return new o(_,this.h^w.h)};function L(w){for(var y=w.g.length+1,_=[],N=0;N<y;N++)_[N]=w.i(N)<<1|w.i(N-1)>>>31;return new o(_,w.h)}function F(w,y){var _=y>>5;y%=32;for(var N=w.g.length-_,I=[],T=0;T<N;T++)I[T]=0<y?w.i(T+_)>>>y|w.i(T+_+1)<<32-y:w.i(T+_);return new o(I,w.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=m,Bw=o}).apply(typeof H0<"u"?H0:typeof self<"u"?self:typeof window<"u"?window:{});var Ma=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};(function(){var t,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,d,f){return a==Array.prototype||a==Object.prototype||(a[d]=f.value),a};function n(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Ma=="object"&&Ma];for(var d=0;d<a.length;++d){var f=a[d];if(f&&f.Math==Math)return f}throw Error("Cannot find global object")}var r=n(this);function s(a,d){if(d)e:{var f=r;a=a.split(".");for(var g=0;g<a.length-1;g++){var R=a[g];if(!(R in f))break e;f=f[R]}a=a[a.length-1],g=f[a],d=d(g),d!=g&&d!=null&&e(f,a,{configurable:!0,writable:!0,value:d})}}function i(a,d){a instanceof String&&(a+="");var f=0,g=!1,R={next:function(){if(!g&&f<a.length){var P=f++;return{value:d(P,a[P]),done:!1}}return g=!0,{done:!0,value:void 0}}};return R[Symbol.iterator]=function(){return R},R}s("Array.prototype.values",function(a){return a||function(){return i(this,function(d,f){return f})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},c=this||self;function u(a){var d=typeof a;return d=d!="object"?d:a?Array.isArray(a)?"array":d:"null",d=="array"||d=="object"&&typeof a.length=="number"}function h(a){var d=typeof a;return d=="object"&&a!=null||d=="function"}function m(a,d,f){return a.call.apply(a.bind,arguments)}function p(a,d,f){if(!a)throw Error();if(2<arguments.length){var g=Array.prototype.slice.call(arguments,2);return function(){var R=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(R,g),a.apply(d,R)}}return function(){return a.apply(d,arguments)}}function v(a,d,f){return v=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?m:p,v.apply(null,arguments)}function k(a,d){var f=Array.prototype.slice.call(arguments,1);return function(){var g=f.slice();return g.push.apply(g,arguments),a.apply(this,g)}}function C(a,d){function f(){}f.prototype=d.prototype,a.aa=d.prototype,a.prototype=new f,a.prototype.constructor=a,a.Qb=function(g,R,P){for(var z=Array(arguments.length-2),le=2;le<arguments.length;le++)z[le-2]=arguments[le];return d.prototype[R].apply(g,z)}}function j(a){const d=a.length;if(0<d){const f=Array(d);for(let g=0;g<d;g++)f[g]=a[g];return f}return[]}function D(a,d){for(let f=1;f<arguments.length;f++){const g=arguments[f];if(u(g)){const R=a.length||0,P=g.length||0;a.length=R+P;for(let z=0;z<P;z++)a[R+z]=g[z]}else a.push(g)}}class b{constructor(d,f){this.i=d,this.j=f,this.h=0,this.g=null}get(){let d;return 0<this.h?(this.h--,d=this.g,this.g=d.next,d.next=null):d=this.i(),d}}function x(a){return/^[\s\xa0]*$/.test(a)}function S(){var a=c.navigator;return a&&(a=a.userAgent)?a:""}function A(a){return A[" "](a),a}A[" "]=function(){};var L=S().indexOf("Gecko")!=-1&&!(S().toLowerCase().indexOf("webkit")!=-1&&S().indexOf("Edge")==-1)&&!(S().indexOf("Trident")!=-1||S().indexOf("MSIE")!=-1)&&S().indexOf("Edge")==-1;function F(a,d,f){for(const g in a)d.call(f,a[g],g,a)}function w(a,d){for(const f in a)d.call(void 0,a[f],f,a)}function y(a){const d={};for(const f in a)d[f]=a[f];return d}const _="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function N(a,d){let f,g;for(let R=1;R<arguments.length;R++){g=arguments[R];for(f in g)a[f]=g[f];for(let P=0;P<_.length;P++)f=_[P],Object.prototype.hasOwnProperty.call(g,f)&&(a[f]=g[f])}}function I(a){var d=1;a=a.split(":");const f=[];for(;0<d&&a.length;)f.push(a.shift()),d--;return a.length&&f.push(a.join(":")),f}function T(a){c.setTimeout(()=>{throw a},0)}function E(){var a=$;let d=null;return a.g&&(d=a.g,a.g=a.g.next,a.g||(a.h=null),d.next=null),d}class K{constructor(){this.h=this.g=null}add(d,f){const g=me.get();g.set(d,f),this.h?this.h.next=g:this.g=g,this.h=g}}var me=new b(()=>new De,a=>a.reset());class De{constructor(){this.next=this.g=this.h=null}set(d,f){this.h=d,this.g=f,this.next=null}reset(){this.next=this.g=this.h=null}}let ve,U=!1,$=new K,G=()=>{const a=c.Promise.resolve(void 0);ve=()=>{a.then(ie)}};var ie=()=>{for(var a;a=E();){try{a.h.call(a.g)}catch(f){T(f)}var d=me;d.j(a),100>d.h&&(d.h++,a.next=d.g,d.g=a)}U=!1};function Z(){this.s=this.s,this.C=this.C}Z.prototype.s=!1,Z.prototype.ma=function(){this.s||(this.s=!0,this.N())},Z.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function ye(a,d){this.type=a,this.g=this.target=d,this.defaultPrevented=!1}ye.prototype.h=function(){this.defaultPrevented=!0};var cn=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var a=!1,d=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const f=()=>{};c.addEventListener("test",f,d),c.removeEventListener("test",f,d)}catch{}return a}();function un(a,d){if(ye.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var f=this.type=a.type,g=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=d,d=a.relatedTarget){if(L){e:{try{A(d.nodeName);var R=!0;break e}catch{}R=!1}R||(d=null)}}else f=="mouseover"?d=a.fromElement:f=="mouseout"&&(d=a.toElement);this.relatedTarget=d,g?(this.clientX=g.clientX!==void 0?g.clientX:g.pageX,this.clientY=g.clientY!==void 0?g.clientY:g.pageY,this.screenX=g.screenX||0,this.screenY=g.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:dn[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&un.aa.h.call(this)}}C(un,ye);var dn={2:"touch",3:"pen",4:"mouse"};un.prototype.h=function(){un.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var hn="closure_listenable_"+(1e6*Math.random()|0),m1=0;function g1(a,d,f,g,R){this.listener=a,this.proxy=null,this.src=d,this.type=f,this.capture=!!g,this.ha=R,this.key=++m1,this.da=this.fa=!1}function na(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function ra(a){this.src=a,this.g={},this.h=0}ra.prototype.add=function(a,d,f,g,R){var P=a.toString();a=this.g[P],a||(a=this.g[P]=[],this.h++);var z=Gc(a,d,g,R);return-1<z?(d=a[z],f||(d.fa=!1)):(d=new g1(d,this.src,P,!!g,R),d.fa=f,a.push(d)),d};function Wc(a,d){var f=d.type;if(f in a.g){var g=a.g[f],R=Array.prototype.indexOf.call(g,d,void 0),P;(P=0<=R)&&Array.prototype.splice.call(g,R,1),P&&(na(d),a.g[f].length==0&&(delete a.g[f],a.h--))}}function Gc(a,d,f,g){for(var R=0;R<a.length;++R){var P=a[R];if(!P.da&&P.listener==d&&P.capture==!!f&&P.ha==g)return R}return-1}var qc="closure_lm_"+(1e6*Math.random()|0),Kc={};function Cp(a,d,f,g,R){if(Array.isArray(d)){for(var P=0;P<d.length;P++)Cp(a,d[P],f,g,R);return null}return f=Rp(f),a&&a[hn]?a.K(d,f,h(g)?!!g.capture:!1,R):v1(a,d,f,!1,g,R)}function v1(a,d,f,g,R,P){if(!d)throw Error("Invalid event type");var z=h(R)?!!R.capture:!!R,le=Qc(a);if(le||(a[qc]=le=new ra(a)),f=le.add(d,f,g,z,P),f.proxy)return f;if(g=y1(),f.proxy=g,g.src=a,g.listener=f,a.addEventListener)cn||(R=z),R===void 0&&(R=!1),a.addEventListener(d.toString(),g,R);else if(a.attachEvent)a.attachEvent(Tp(d.toString()),g);else if(a.addListener&&a.removeListener)a.addListener(g);else throw Error("addEventListener and attachEvent are unavailable.");return f}function y1(){function a(f){return d.call(a.src,a.listener,f)}const d=x1;return a}function bp(a,d,f,g,R){if(Array.isArray(d))for(var P=0;P<d.length;P++)bp(a,d[P],f,g,R);else g=h(g)?!!g.capture:!!g,f=Rp(f),a&&a[hn]?(a=a.i,d=String(d).toString(),d in a.g&&(P=a.g[d],f=Gc(P,f,g,R),-1<f&&(na(P[f]),Array.prototype.splice.call(P,f,1),P.length==0&&(delete a.g[d],a.h--)))):a&&(a=Qc(a))&&(d=a.g[d.toString()],a=-1,d&&(a=Gc(d,f,g,R)),(f=-1<a?d[a]:null)&&Yc(f))}function Yc(a){if(typeof a!="number"&&a&&!a.da){var d=a.src;if(d&&d[hn])Wc(d.i,a);else{var f=a.type,g=a.proxy;d.removeEventListener?d.removeEventListener(f,g,a.capture):d.detachEvent?d.detachEvent(Tp(f),g):d.addListener&&d.removeListener&&d.removeListener(g),(f=Qc(d))?(Wc(f,a),f.h==0&&(f.src=null,d[qc]=null)):na(a)}}}function Tp(a){return a in Kc?Kc[a]:Kc[a]="on"+a}function x1(a,d){if(a.da)a=!0;else{d=new un(d,this);var f=a.listener,g=a.ha||a.src;a.fa&&Yc(a),a=f.call(g,d)}return a}function Qc(a){return a=a[qc],a instanceof ra?a:null}var Xc="__closure_events_fn_"+(1e9*Math.random()>>>0);function Rp(a){return typeof a=="function"?a:(a[Xc]||(a[Xc]=function(d){return a.handleEvent(d)}),a[Xc])}function Ge(){Z.call(this),this.i=new ra(this),this.M=this,this.F=null}C(Ge,Z),Ge.prototype[hn]=!0,Ge.prototype.removeEventListener=function(a,d,f,g){bp(this,a,d,f,g)};function Ze(a,d){var f,g=a.F;if(g)for(f=[];g;g=g.F)f.push(g);if(a=a.M,g=d.type||d,typeof d=="string")d=new ye(d,a);else if(d instanceof ye)d.target=d.target||a;else{var R=d;d=new ye(g,a),N(d,R)}if(R=!0,f)for(var P=f.length-1;0<=P;P--){var z=d.g=f[P];R=sa(z,g,!0,d)&&R}if(z=d.g=a,R=sa(z,g,!0,d)&&R,R=sa(z,g,!1,d)&&R,f)for(P=0;P<f.length;P++)z=d.g=f[P],R=sa(z,g,!1,d)&&R}Ge.prototype.N=function(){if(Ge.aa.N.call(this),this.i){var a=this.i,d;for(d in a.g){for(var f=a.g[d],g=0;g<f.length;g++)na(f[g]);delete a.g[d],a.h--}}this.F=null},Ge.prototype.K=function(a,d,f,g){return this.i.add(String(a),d,!1,f,g)},Ge.prototype.L=function(a,d,f,g){return this.i.add(String(a),d,!0,f,g)};function sa(a,d,f,g){if(d=a.i.g[String(d)],!d)return!0;d=d.concat();for(var R=!0,P=0;P<d.length;++P){var z=d[P];if(z&&!z.da&&z.capture==f){var le=z.listener,ze=z.ha||z.src;z.fa&&Wc(a.i,z),R=le.call(ze,g)!==!1&&R}}return R&&!g.defaultPrevented}function jp(a,d,f){if(typeof a=="function")f&&(a=v(a,f));else if(a&&typeof a.handleEvent=="function")a=v(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(d)?-1:c.setTimeout(a,d||0)}function Pp(a){a.g=jp(()=>{a.g=null,a.i&&(a.i=!1,Pp(a))},a.l);const d=a.h;a.h=null,a.m.apply(null,d)}class _1 extends Z{constructor(d,f){super(),this.m=d,this.l=f,this.h=null,this.i=!1,this.g=null}j(d){this.h=arguments,this.g?this.i=!0:Pp(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ui(a){Z.call(this),this.h=a,this.g={}}C(ui,Z);var Ap=[];function Op(a){F(a.g,function(d,f){this.g.hasOwnProperty(f)&&Yc(d)},a),a.g={}}ui.prototype.N=function(){ui.aa.N.call(this),Op(this)},ui.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Jc=c.JSON.stringify,w1=c.JSON.parse,E1=class{stringify(a){return c.JSON.stringify(a,void 0)}parse(a){return c.JSON.parse(a,void 0)}};function Zc(){}Zc.prototype.h=null;function Dp(a){return a.h||(a.h=a.i())}function N1(){}var di={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function eu(){ye.call(this,"d")}C(eu,ye);function tu(){ye.call(this,"c")}C(tu,ye);var ss={},Lp=null;function nu(){return Lp=Lp||new Ge}ss.La="serverreachability";function Mp(a){ye.call(this,ss.La,a)}C(Mp,ye);function hi(a){const d=nu();Ze(d,new Mp(d))}ss.STAT_EVENT="statevent";function Fp(a,d){ye.call(this,ss.STAT_EVENT,a),this.stat=d}C(Fp,ye);function et(a){const d=nu();Ze(d,new Fp(d,a))}ss.Ma="timingevent";function Up(a,d){ye.call(this,ss.Ma,a),this.size=d}C(Up,ye);function fi(a,d){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){a()},d)}function pi(){this.g=!0}pi.prototype.xa=function(){this.g=!1};function k1(a,d,f,g,R,P){a.info(function(){if(a.g)if(P)for(var z="",le=P.split("&"),ze=0;ze<le.length;ze++){var ne=le[ze].split("=");if(1<ne.length){var qe=ne[0];ne=ne[1];var Ke=qe.split("_");z=2<=Ke.length&&Ke[1]=="type"?z+(qe+"="+ne+"&"):z+(qe+"=redacted&")}}else z=null;else z=P;return"XMLHTTP REQ ("+g+") [attempt "+R+"]: "+d+`
`+f+`
`+z})}function S1(a,d,f,g,R,P,z){a.info(function(){return"XMLHTTP RESP ("+g+") [ attempt "+R+"]: "+d+`
`+f+`
`+P+" "+z})}function is(a,d,f,g){a.info(function(){return"XMLHTTP TEXT ("+d+"): "+C1(a,f)+(g?" "+g:"")})}function I1(a,d){a.info(function(){return"TIMEOUT: "+d})}pi.prototype.info=function(){};function C1(a,d){if(!a.g)return d;if(!d)return null;try{var f=JSON.parse(d);if(f){for(a=0;a<f.length;a++)if(Array.isArray(f[a])){var g=f[a];if(!(2>g.length)){var R=g[1];if(Array.isArray(R)&&!(1>R.length)){var P=R[0];if(P!="noop"&&P!="stop"&&P!="close")for(var z=1;z<R.length;z++)R[z]=""}}}}return Jc(f)}catch{return d}}var ru={NO_ERROR:0,TIMEOUT:8},b1={},su;function ia(){}C(ia,Zc),ia.prototype.g=function(){return new XMLHttpRequest},ia.prototype.i=function(){return{}},su=new ia;function Ln(a,d,f,g){this.j=a,this.i=d,this.l=f,this.R=g||1,this.U=new ui(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new zp}function zp(){this.i=null,this.g="",this.h=!1}var Vp={},iu={};function ou(a,d,f){a.L=1,a.v=ca(fn(d)),a.m=f,a.P=!0,$p(a,null)}function $p(a,d){a.F=Date.now(),oa(a),a.A=fn(a.v);var f=a.A,g=a.R;Array.isArray(g)||(g=[String(g)]),nm(f.i,"t",g),a.C=0,f=a.j.J,a.h=new zp,a.g=_m(a.j,f?d:null,!a.m),0<a.O&&(a.M=new _1(v(a.Y,a,a.g),a.O)),d=a.U,f=a.g,g=a.ca;var R="readystatechange";Array.isArray(R)||(R&&(Ap[0]=R.toString()),R=Ap);for(var P=0;P<R.length;P++){var z=Cp(f,R[P],g||d.handleEvent,!1,d.h||d);if(!z)break;d.g[z.key]=z}d=a.H?y(a.H):{},a.m?(a.u||(a.u="POST"),d["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,d)):(a.u="GET",a.g.ea(a.A,a.u,null,d)),hi(),k1(a.i,a.u,a.A,a.l,a.R,a.m)}Ln.prototype.ca=function(a){a=a.target;const d=this.M;d&&pn(a)==3?d.j():this.Y(a)},Ln.prototype.Y=function(a){try{if(a==this.g)e:{const Ke=pn(this.g);var d=this.g.Ba();const ls=this.g.Z();if(!(3>Ke)&&(Ke!=3||this.g&&(this.h.h||this.g.oa()||cm(this.g)))){this.J||Ke!=4||d==7||(d==8||0>=ls?hi(3):hi(2)),au(this);var f=this.g.Z();this.X=f;t:if(Bp(this)){var g=cm(this.g);a="";var R=g.length,P=pn(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Er(this),mi(this);var z="";break t}this.h.i=new c.TextDecoder}for(d=0;d<R;d++)this.h.h=!0,a+=this.h.i.decode(g[d],{stream:!(P&&d==R-1)});g.length=0,this.h.g+=a,this.C=0,z=this.h.g}else z=this.g.oa();if(this.o=f==200,S1(this.i,this.u,this.A,this.l,this.R,Ke,f),this.o){if(this.T&&!this.K){t:{if(this.g){var le,ze=this.g;if((le=ze.g?ze.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!x(le)){var ne=le;break t}}ne=null}if(f=ne)is(this.i,this.l,f,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,lu(this,f);else{this.o=!1,this.s=3,et(12),Er(this),mi(this);break e}}if(this.P){f=!0;let Lt;for(;!this.J&&this.C<z.length;)if(Lt=T1(this,z),Lt==iu){Ke==4&&(this.s=4,et(14),f=!1),is(this.i,this.l,null,"[Incomplete Response]");break}else if(Lt==Vp){this.s=4,et(15),is(this.i,this.l,z,"[Invalid Chunk]"),f=!1;break}else is(this.i,this.l,Lt,null),lu(this,Lt);if(Bp(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Ke!=4||z.length!=0||this.h.h||(this.s=1,et(16),f=!1),this.o=this.o&&f,!f)is(this.i,this.l,z,"[Invalid Chunked Response]"),Er(this),mi(this);else if(0<z.length&&!this.W){this.W=!0;var qe=this.j;qe.g==this&&qe.ba&&!qe.M&&(qe.j.info("Great, no buffering proxy detected. Bytes received: "+z.length),pu(qe),qe.M=!0,et(11))}}else is(this.i,this.l,z,null),lu(this,z);Ke==4&&Er(this),this.o&&!this.J&&(Ke==4?gm(this.j,this):(this.o=!1,oa(this)))}else G1(this.g),f==400&&0<z.indexOf("Unknown SID")?(this.s=3,et(12)):(this.s=0,et(13)),Er(this),mi(this)}}}catch{}finally{}};function Bp(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function T1(a,d){var f=a.C,g=d.indexOf(`
`,f);return g==-1?iu:(f=Number(d.substring(f,g)),isNaN(f)?Vp:(g+=1,g+f>d.length?iu:(d=d.slice(g,g+f),a.C=g+f,d)))}Ln.prototype.cancel=function(){this.J=!0,Er(this)};function oa(a){a.S=Date.now()+a.I,Hp(a,a.I)}function Hp(a,d){if(a.B!=null)throw Error("WatchDog timer not null");a.B=fi(v(a.ba,a),d)}function au(a){a.B&&(c.clearTimeout(a.B),a.B=null)}Ln.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(I1(this.i,this.A),this.L!=2&&(hi(),et(17)),Er(this),this.s=2,mi(this)):Hp(this,this.S-a)};function mi(a){a.j.G==0||a.J||gm(a.j,a)}function Er(a){au(a);var d=a.M;d&&typeof d.ma=="function"&&d.ma(),a.M=null,Op(a.U),a.g&&(d=a.g,a.g=null,d.abort(),d.ma())}function lu(a,d){try{var f=a.j;if(f.G!=0&&(f.g==a||cu(f.h,a))){if(!a.K&&cu(f.h,a)&&f.G==3){try{var g=f.Da.g.parse(d)}catch{g=null}if(Array.isArray(g)&&g.length==3){var R=g;if(R[0]==0){e:if(!f.u){if(f.g)if(f.g.F+3e3<a.F)ma(f),fa(f);else break e;fu(f),et(18)}}else f.za=R[1],0<f.za-f.T&&37500>R[2]&&f.F&&f.v==0&&!f.C&&(f.C=fi(v(f.Za,f),6e3));if(1>=qp(f.h)&&f.ca){try{f.ca()}catch{}f.ca=void 0}}else kr(f,11)}else if((a.K||f.g==a)&&ma(f),!x(d))for(R=f.Da.g.parse(d),d=0;d<R.length;d++){let ne=R[d];if(f.T=ne[0],ne=ne[1],f.G==2)if(ne[0]=="c"){f.K=ne[1],f.ia=ne[2];const qe=ne[3];qe!=null&&(f.la=qe,f.j.info("VER="+f.la));const Ke=ne[4];Ke!=null&&(f.Aa=Ke,f.j.info("SVER="+f.Aa));const ls=ne[5];ls!=null&&typeof ls=="number"&&0<ls&&(g=1.5*ls,f.L=g,f.j.info("backChannelRequestTimeoutMs_="+g)),g=f;const Lt=a.g;if(Lt){const ga=Lt.g?Lt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(ga){var P=g.h;P.g||ga.indexOf("spdy")==-1&&ga.indexOf("quic")==-1&&ga.indexOf("h2")==-1||(P.j=P.l,P.g=new Set,P.h&&(uu(P,P.h),P.h=null))}if(g.D){const mu=Lt.g?Lt.g.getResponseHeader("X-HTTP-Session-Id"):null;mu&&(g.ya=mu,he(g.I,g.D,mu))}}f.G=3,f.l&&f.l.ua(),f.ba&&(f.R=Date.now()-a.F,f.j.info("Handshake RTT: "+f.R+"ms")),g=f;var z=a;if(g.qa=xm(g,g.J?g.ia:null,g.W),z.K){Kp(g.h,z);var le=z,ze=g.L;ze&&(le.I=ze),le.B&&(au(le),oa(le)),g.g=z}else pm(g);0<f.i.length&&pa(f)}else ne[0]!="stop"&&ne[0]!="close"||kr(f,7);else f.G==3&&(ne[0]=="stop"||ne[0]=="close"?ne[0]=="stop"?kr(f,7):hu(f):ne[0]!="noop"&&f.l&&f.l.ta(ne),f.v=0)}}hi(4)}catch{}}var R1=class{constructor(a,d){this.g=a,this.map=d}};function Wp(a){this.l=a||10,c.PerformanceNavigationTiming?(a=c.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Gp(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function qp(a){return a.h?1:a.g?a.g.size:0}function cu(a,d){return a.h?a.h==d:a.g?a.g.has(d):!1}function uu(a,d){a.g?a.g.add(d):a.h=d}function Kp(a,d){a.h&&a.h==d?a.h=null:a.g&&a.g.has(d)&&a.g.delete(d)}Wp.prototype.cancel=function(){if(this.i=Yp(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Yp(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let d=a.i;for(const f of a.g.values())d=d.concat(f.D);return d}return j(a.i)}function j1(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(u(a)){for(var d=[],f=a.length,g=0;g<f;g++)d.push(a[g]);return d}d=[],f=0;for(g in a)d[f++]=a[g];return d}function P1(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(u(a)||typeof a=="string"){var d=[];a=a.length;for(var f=0;f<a;f++)d.push(f);return d}d=[],f=0;for(const g in a)d[f++]=g;return d}}}function Qp(a,d){if(a.forEach&&typeof a.forEach=="function")a.forEach(d,void 0);else if(u(a)||typeof a=="string")Array.prototype.forEach.call(a,d,void 0);else for(var f=P1(a),g=j1(a),R=g.length,P=0;P<R;P++)d.call(void 0,g[P],f&&f[P],a)}var Xp=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function A1(a,d){if(a){a=a.split("&");for(var f=0;f<a.length;f++){var g=a[f].indexOf("="),R=null;if(0<=g){var P=a[f].substring(0,g);R=a[f].substring(g+1)}else P=a[f];d(P,R?decodeURIComponent(R.replace(/\+/g," ")):"")}}}function Nr(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof Nr){this.h=a.h,aa(this,a.j),this.o=a.o,this.g=a.g,la(this,a.s),this.l=a.l;var d=a.i,f=new yi;f.i=d.i,d.g&&(f.g=new Map(d.g),f.h=d.h),Jp(this,f),this.m=a.m}else a&&(d=String(a).match(Xp))?(this.h=!1,aa(this,d[1]||"",!0),this.o=gi(d[2]||""),this.g=gi(d[3]||"",!0),la(this,d[4]),this.l=gi(d[5]||"",!0),Jp(this,d[6]||"",!0),this.m=gi(d[7]||"")):(this.h=!1,this.i=new yi(null,this.h))}Nr.prototype.toString=function(){var a=[],d=this.j;d&&a.push(vi(d,Zp,!0),":");var f=this.g;return(f||d=="file")&&(a.push("//"),(d=this.o)&&a.push(vi(d,Zp,!0),"@"),a.push(encodeURIComponent(String(f)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),f=this.s,f!=null&&a.push(":",String(f))),(f=this.l)&&(this.g&&f.charAt(0)!="/"&&a.push("/"),a.push(vi(f,f.charAt(0)=="/"?L1:D1,!0))),(f=this.i.toString())&&a.push("?",f),(f=this.m)&&a.push("#",vi(f,F1)),a.join("")};function fn(a){return new Nr(a)}function aa(a,d,f){a.j=f?gi(d,!0):d,a.j&&(a.j=a.j.replace(/:$/,""))}function la(a,d){if(d){if(d=Number(d),isNaN(d)||0>d)throw Error("Bad port number "+d);a.s=d}else a.s=null}function Jp(a,d,f){d instanceof yi?(a.i=d,U1(a.i,a.h)):(f||(d=vi(d,M1)),a.i=new yi(d,a.h))}function he(a,d,f){a.i.set(d,f)}function ca(a){return he(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function gi(a,d){return a?d?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function vi(a,d,f){return typeof a=="string"?(a=encodeURI(a).replace(d,O1),f&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function O1(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Zp=/[#\/\?@]/g,D1=/[#\?:]/g,L1=/[#\?]/g,M1=/[#\?@]/g,F1=/#/g;function yi(a,d){this.h=this.g=null,this.i=a||null,this.j=!!d}function Mn(a){a.g||(a.g=new Map,a.h=0,a.i&&A1(a.i,function(d,f){a.add(decodeURIComponent(d.replace(/\+/g," ")),f)}))}t=yi.prototype,t.add=function(a,d){Mn(this),this.i=null,a=os(this,a);var f=this.g.get(a);return f||this.g.set(a,f=[]),f.push(d),this.h+=1,this};function em(a,d){Mn(a),d=os(a,d),a.g.has(d)&&(a.i=null,a.h-=a.g.get(d).length,a.g.delete(d))}function tm(a,d){return Mn(a),d=os(a,d),a.g.has(d)}t.forEach=function(a,d){Mn(this),this.g.forEach(function(f,g){f.forEach(function(R){a.call(d,R,g,this)},this)},this)},t.na=function(){Mn(this);const a=Array.from(this.g.values()),d=Array.from(this.g.keys()),f=[];for(let g=0;g<d.length;g++){const R=a[g];for(let P=0;P<R.length;P++)f.push(d[g])}return f},t.V=function(a){Mn(this);let d=[];if(typeof a=="string")tm(this,a)&&(d=d.concat(this.g.get(os(this,a))));else{a=Array.from(this.g.values());for(let f=0;f<a.length;f++)d=d.concat(a[f])}return d},t.set=function(a,d){return Mn(this),this.i=null,a=os(this,a),tm(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[d]),this.h+=1,this},t.get=function(a,d){return a?(a=this.V(a),0<a.length?String(a[0]):d):d};function nm(a,d,f){em(a,d),0<f.length&&(a.i=null,a.g.set(os(a,d),j(f)),a.h+=f.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],d=Array.from(this.g.keys());for(var f=0;f<d.length;f++){var g=d[f];const P=encodeURIComponent(String(g)),z=this.V(g);for(g=0;g<z.length;g++){var R=P;z[g]!==""&&(R+="="+encodeURIComponent(String(z[g]))),a.push(R)}}return this.i=a.join("&")};function os(a,d){return d=String(d),a.j&&(d=d.toLowerCase()),d}function U1(a,d){d&&!a.j&&(Mn(a),a.i=null,a.g.forEach(function(f,g){var R=g.toLowerCase();g!=R&&(em(this,g),nm(this,R,f))},a)),a.j=d}function z1(a,d){const f=new pi;if(c.Image){const g=new Image;g.onload=k(Fn,f,"TestLoadImage: loaded",!0,d,g),g.onerror=k(Fn,f,"TestLoadImage: error",!1,d,g),g.onabort=k(Fn,f,"TestLoadImage: abort",!1,d,g),g.ontimeout=k(Fn,f,"TestLoadImage: timeout",!1,d,g),c.setTimeout(function(){g.ontimeout&&g.ontimeout()},1e4),g.src=a}else d(!1)}function V1(a,d){const f=new pi,g=new AbortController,R=setTimeout(()=>{g.abort(),Fn(f,"TestPingServer: timeout",!1,d)},1e4);fetch(a,{signal:g.signal}).then(P=>{clearTimeout(R),P.ok?Fn(f,"TestPingServer: ok",!0,d):Fn(f,"TestPingServer: server error",!1,d)}).catch(()=>{clearTimeout(R),Fn(f,"TestPingServer: error",!1,d)})}function Fn(a,d,f,g,R){try{R&&(R.onload=null,R.onerror=null,R.onabort=null,R.ontimeout=null),g(f)}catch{}}function $1(){this.g=new E1}function B1(a,d,f){const g=f||"";try{Qp(a,function(R,P){let z=R;h(R)&&(z=Jc(R)),d.push(g+P+"="+encodeURIComponent(z))})}catch(R){throw d.push(g+"type="+encodeURIComponent("_badmap")),R}}function ua(a){this.l=a.Ub||null,this.j=a.eb||!1}C(ua,Zc),ua.prototype.g=function(){return new da(this.l,this.j)},ua.prototype.i=function(a){return function(){return a}}({});function da(a,d){Ge.call(this),this.D=a,this.o=d,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}C(da,Ge),t=da.prototype,t.open=function(a,d){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=d,this.readyState=1,_i(this)},t.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const d={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(d.body=a),(this.D||c).fetch(new Request(this.A,d)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,xi(this)),this.readyState=0},t.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,_i(this)),this.g&&(this.readyState=3,_i(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;rm(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function rm(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}t.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var d=a.value?a.value:new Uint8Array(0);(d=this.v.decode(d,{stream:!a.done}))&&(this.response=this.responseText+=d)}a.done?xi(this):_i(this),this.readyState==3&&rm(this)}},t.Ra=function(a){this.g&&(this.response=this.responseText=a,xi(this))},t.Qa=function(a){this.g&&(this.response=a,xi(this))},t.ga=function(){this.g&&xi(this)};function xi(a){a.readyState=4,a.l=null,a.j=null,a.v=null,_i(a)}t.setRequestHeader=function(a,d){this.u.append(a,d)},t.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],d=this.h.entries();for(var f=d.next();!f.done;)f=f.value,a.push(f[0]+": "+f[1]),f=d.next();return a.join(`\r
`)};function _i(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(da.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function sm(a){let d="";return F(a,function(f,g){d+=g,d+=":",d+=f,d+=`\r
`}),d}function du(a,d,f){e:{for(g in f){var g=!1;break e}g=!0}g||(f=sm(f),typeof a=="string"?f!=null&&encodeURIComponent(String(f)):he(a,d,f))}function Se(a){Ge.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}C(Se,Ge);var H1=/^https?$/i,W1=["POST","PUT"];t=Se.prototype,t.Ha=function(a){this.J=a},t.ea=function(a,d,f,g){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);d=d?d.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():su.g(),this.v=this.o?Dp(this.o):Dp(su),this.g.onreadystatechange=v(this.Ea,this);try{this.B=!0,this.g.open(d,String(a),!0),this.B=!1}catch(P){im(this,P);return}if(a=f||"",f=new Map(this.headers),g)if(Object.getPrototypeOf(g)===Object.prototype)for(var R in g)f.set(R,g[R]);else if(typeof g.keys=="function"&&typeof g.get=="function")for(const P of g.keys())f.set(P,g.get(P));else throw Error("Unknown input type for opt_headers: "+String(g));g=Array.from(f.keys()).find(P=>P.toLowerCase()=="content-type"),R=c.FormData&&a instanceof c.FormData,!(0<=Array.prototype.indexOf.call(W1,d,void 0))||g||R||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[P,z]of f)this.g.setRequestHeader(P,z);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{lm(this),this.u=!0,this.g.send(a),this.u=!1}catch(P){im(this,P)}};function im(a,d){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=d,a.m=5,om(a),ha(a)}function om(a){a.A||(a.A=!0,Ze(a,"complete"),Ze(a,"error"))}t.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,Ze(this,"complete"),Ze(this,"abort"),ha(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),ha(this,!0)),Se.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?am(this):this.bb())},t.bb=function(){am(this)};function am(a){if(a.h&&typeof o<"u"&&(!a.v[1]||pn(a)!=4||a.Z()!=2)){if(a.u&&pn(a)==4)jp(a.Ea,0,a);else if(Ze(a,"readystatechange"),pn(a)==4){a.h=!1;try{const z=a.Z();e:switch(z){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var d=!0;break e;default:d=!1}var f;if(!(f=d)){var g;if(g=z===0){var R=String(a.D).match(Xp)[1]||null;!R&&c.self&&c.self.location&&(R=c.self.location.protocol.slice(0,-1)),g=!H1.test(R?R.toLowerCase():"")}f=g}if(f)Ze(a,"complete"),Ze(a,"success");else{a.m=6;try{var P=2<pn(a)?a.g.statusText:""}catch{P=""}a.l=P+" ["+a.Z()+"]",om(a)}}finally{ha(a)}}}}function ha(a,d){if(a.g){lm(a);const f=a.g,g=a.v[0]?()=>{}:null;a.g=null,a.v=null,d||Ze(a,"ready");try{f.onreadystatechange=g}catch{}}}function lm(a){a.I&&(c.clearTimeout(a.I),a.I=null)}t.isActive=function(){return!!this.g};function pn(a){return a.g?a.g.readyState:0}t.Z=function(){try{return 2<pn(this)?this.g.status:-1}catch{return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.Oa=function(a){if(this.g){var d=this.g.responseText;return a&&d.indexOf(a)==0&&(d=d.substring(a.length)),w1(d)}};function cm(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function G1(a){const d={};a=(a.g&&2<=pn(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let g=0;g<a.length;g++){if(x(a[g]))continue;var f=I(a[g]);const R=f[0];if(f=f[1],typeof f!="string")continue;f=f.trim();const P=d[R]||[];d[R]=P,P.push(f)}w(d,function(g){return g.join(", ")})}t.Ba=function(){return this.m},t.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function wi(a,d,f){return f&&f.internalChannelParams&&f.internalChannelParams[a]||d}function um(a){this.Aa=0,this.i=[],this.j=new pi,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=wi("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=wi("baseRetryDelayMs",5e3,a),this.cb=wi("retryDelaySeedMs",1e4,a),this.Wa=wi("forwardChannelMaxRetries",2,a),this.wa=wi("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new Wp(a&&a.concurrentRequestLimit),this.Da=new $1,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}t=um.prototype,t.la=8,t.G=1,t.connect=function(a,d,f,g){et(0),this.W=a,this.H=d||{},f&&g!==void 0&&(this.H.OSID=f,this.H.OAID=g),this.F=this.X,this.I=xm(this,null,this.W),pa(this)};function hu(a){if(dm(a),a.G==3){var d=a.U++,f=fn(a.I);if(he(f,"SID",a.K),he(f,"RID",d),he(f,"TYPE","terminate"),Ei(a,f),d=new Ln(a,a.j,d),d.L=2,d.v=ca(fn(f)),f=!1,c.navigator&&c.navigator.sendBeacon)try{f=c.navigator.sendBeacon(d.v.toString(),"")}catch{}!f&&c.Image&&(new Image().src=d.v,f=!0),f||(d.g=_m(d.j,null),d.g.ea(d.v)),d.F=Date.now(),oa(d)}ym(a)}function fa(a){a.g&&(pu(a),a.g.cancel(),a.g=null)}function dm(a){fa(a),a.u&&(c.clearTimeout(a.u),a.u=null),ma(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&c.clearTimeout(a.s),a.s=null)}function pa(a){if(!Gp(a.h)&&!a.s){a.s=!0;var d=a.Ga;ve||G(),U||(ve(),U=!0),$.add(d,a),a.B=0}}function q1(a,d){return qp(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=d.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=fi(v(a.Ga,a,d),vm(a,a.B)),a.B++,!0)}t.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const R=new Ln(this,this.j,a);let P=this.o;if(this.S&&(P?(P=y(P),N(P,this.S)):P=this.S),this.m!==null||this.O||(R.H=P,P=null),this.P)e:{for(var d=0,f=0;f<this.i.length;f++){t:{var g=this.i[f];if("__data__"in g.map&&(g=g.map.__data__,typeof g=="string")){g=g.length;break t}g=void 0}if(g===void 0)break;if(d+=g,4096<d){d=f;break e}if(d===4096||f===this.i.length-1){d=f+1;break e}}d=1e3}else d=1e3;d=fm(this,R,d),f=fn(this.I),he(f,"RID",a),he(f,"CVER",22),this.D&&he(f,"X-HTTP-Session-Id",this.D),Ei(this,f),P&&(this.O?d="headers="+encodeURIComponent(String(sm(P)))+"&"+d:this.m&&du(f,this.m,P)),uu(this.h,R),this.Ua&&he(f,"TYPE","init"),this.P?(he(f,"$req",d),he(f,"SID","null"),R.T=!0,ou(R,f,null)):ou(R,f,d),this.G=2}}else this.G==3&&(a?hm(this,a):this.i.length==0||Gp(this.h)||hm(this))};function hm(a,d){var f;d?f=d.l:f=a.U++;const g=fn(a.I);he(g,"SID",a.K),he(g,"RID",f),he(g,"AID",a.T),Ei(a,g),a.m&&a.o&&du(g,a.m,a.o),f=new Ln(a,a.j,f,a.B+1),a.m===null&&(f.H=a.o),d&&(a.i=d.D.concat(a.i)),d=fm(a,f,1e3),f.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),uu(a.h,f),ou(f,g,d)}function Ei(a,d){a.H&&F(a.H,function(f,g){he(d,g,f)}),a.l&&Qp({},function(f,g){he(d,g,f)})}function fm(a,d,f){f=Math.min(a.i.length,f);var g=a.l?v(a.l.Na,a.l,a):null;e:{var R=a.i;let P=-1;for(;;){const z=["count="+f];P==-1?0<f?(P=R[0].g,z.push("ofs="+P)):P=0:z.push("ofs="+P);let le=!0;for(let ze=0;ze<f;ze++){let ne=R[ze].g;const qe=R[ze].map;if(ne-=P,0>ne)P=Math.max(0,R[ze].g-100),le=!1;else try{B1(qe,z,"req"+ne+"_")}catch{g&&g(qe)}}if(le){g=z.join("&");break e}}}return a=a.i.splice(0,f),d.D=a,g}function pm(a){if(!a.g&&!a.u){a.Y=1;var d=a.Fa;ve||G(),U||(ve(),U=!0),$.add(d,a),a.v=0}}function fu(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=fi(v(a.Fa,a),vm(a,a.v)),a.v++,!0)}t.Fa=function(){if(this.u=null,mm(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=fi(v(this.ab,this),a)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,et(10),fa(this),mm(this))};function pu(a){a.A!=null&&(c.clearTimeout(a.A),a.A=null)}function mm(a){a.g=new Ln(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var d=fn(a.qa);he(d,"RID","rpc"),he(d,"SID",a.K),he(d,"AID",a.T),he(d,"CI",a.F?"0":"1"),!a.F&&a.ja&&he(d,"TO",a.ja),he(d,"TYPE","xmlhttp"),Ei(a,d),a.m&&a.o&&du(d,a.m,a.o),a.L&&(a.g.I=a.L);var f=a.g;a=a.ia,f.L=1,f.v=ca(fn(d)),f.m=null,f.P=!0,$p(f,a)}t.Za=function(){this.C!=null&&(this.C=null,fa(this),fu(this),et(19))};function ma(a){a.C!=null&&(c.clearTimeout(a.C),a.C=null)}function gm(a,d){var f=null;if(a.g==d){ma(a),pu(a),a.g=null;var g=2}else if(cu(a.h,d))f=d.D,Kp(a.h,d),g=1;else return;if(a.G!=0){if(d.o)if(g==1){f=d.m?d.m.length:0,d=Date.now()-d.F;var R=a.B;g=nu(),Ze(g,new Up(g,f)),pa(a)}else pm(a);else if(R=d.s,R==3||R==0&&0<d.X||!(g==1&&q1(a,d)||g==2&&fu(a)))switch(f&&0<f.length&&(d=a.h,d.i=d.i.concat(f)),R){case 1:kr(a,5);break;case 4:kr(a,10);break;case 3:kr(a,6);break;default:kr(a,2)}}}function vm(a,d){let f=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(f*=2),f*d}function kr(a,d){if(a.j.info("Error code "+d),d==2){var f=v(a.fb,a),g=a.Xa;const R=!g;g=new Nr(g||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||aa(g,"https"),ca(g),R?z1(g.toString(),f):V1(g.toString(),f)}else et(2);a.G=0,a.l&&a.l.sa(d),ym(a),dm(a)}t.fb=function(a){a?(this.j.info("Successfully pinged google.com"),et(2)):(this.j.info("Failed to ping google.com"),et(1))};function ym(a){if(a.G=0,a.ka=[],a.l){const d=Yp(a.h);(d.length!=0||a.i.length!=0)&&(D(a.ka,d),D(a.ka,a.i),a.h.i.length=0,j(a.i),a.i.length=0),a.l.ra()}}function xm(a,d,f){var g=f instanceof Nr?fn(f):new Nr(f);if(g.g!="")d&&(g.g=d+"."+g.g),la(g,g.s);else{var R=c.location;g=R.protocol,d=d?d+"."+R.hostname:R.hostname,R=+R.port;var P=new Nr(null);g&&aa(P,g),d&&(P.g=d),R&&la(P,R),f&&(P.l=f),g=P}return f=a.D,d=a.ya,f&&d&&he(g,f,d),he(g,"VER",a.la),Ei(a,g),g}function _m(a,d,f){if(d&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return d=a.Ca&&!a.pa?new Se(new ua({eb:f})):new Se(a.pa),d.Ha(a.J),d}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function wm(){}t=wm.prototype,t.ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){};function Ct(a,d){Ge.call(this),this.g=new um(d),this.l=a,this.h=d&&d.messageUrlParams||null,a=d&&d.messageHeaders||null,d&&d.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=d&&d.initMessageHeaders||null,d&&d.messageContentType&&(a?a["X-WebChannel-Content-Type"]=d.messageContentType:a={"X-WebChannel-Content-Type":d.messageContentType}),d&&d.va&&(a?a["X-WebChannel-Client-Profile"]=d.va:a={"X-WebChannel-Client-Profile":d.va}),this.g.S=a,(a=d&&d.Sb)&&!x(a)&&(this.g.m=a),this.v=d&&d.supportsCrossDomainXhr||!1,this.u=d&&d.sendRawJson||!1,(d=d&&d.httpSessionIdParam)&&!x(d)&&(this.g.D=d,a=this.h,a!==null&&d in a&&(a=this.h,d in a&&delete a[d])),this.j=new as(this)}C(Ct,Ge),Ct.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Ct.prototype.close=function(){hu(this.g)},Ct.prototype.o=function(a){var d=this.g;if(typeof a=="string"){var f={};f.__data__=a,a=f}else this.u&&(f={},f.__data__=Jc(a),a=f);d.i.push(new R1(d.Ya++,a)),d.G==3&&pa(d)},Ct.prototype.N=function(){this.g.l=null,delete this.j,hu(this.g),delete this.g,Ct.aa.N.call(this)};function Em(a){eu.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var d=a.__sm__;if(d){e:{for(const f in d){a=f;break e}a=void 0}(this.i=a)&&(a=this.i,d=d!==null&&a in d?d[a]:void 0),this.data=d}else this.data=a}C(Em,eu);function Nm(){tu.call(this),this.status=1}C(Nm,tu);function as(a){this.g=a}C(as,wm),as.prototype.ua=function(){Ze(this.g,"a")},as.prototype.ta=function(a){Ze(this.g,new Em(a))},as.prototype.sa=function(a){Ze(this.g,new Nm)},as.prototype.ra=function(){Ze(this.g,"b")},Ct.prototype.send=Ct.prototype.o,Ct.prototype.open=Ct.prototype.m,Ct.prototype.close=Ct.prototype.close,ru.NO_ERROR=0,ru.TIMEOUT=8,ru.HTTP_ERROR=6,b1.COMPLETE="complete",N1.EventType=di,di.OPEN="a",di.CLOSE="b",di.ERROR="c",di.MESSAGE="d",Ge.prototype.listen=Ge.prototype.K,Se.prototype.listenOnce=Se.prototype.L,Se.prototype.getLastError=Se.prototype.Ka,Se.prototype.getLastErrorCode=Se.prototype.Ba,Se.prototype.getStatus=Se.prototype.Z,Se.prototype.getResponseJson=Se.prototype.Oa,Se.prototype.getResponseText=Se.prototype.oa,Se.prototype.send=Se.prototype.ea,Se.prototype.setWithCredentials=Se.prototype.Ha}).apply(typeof Ma<"u"?Ma:typeof self<"u"?self:typeof window<"u"?window:{});const W0="@firebase/firestore";/**
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
 */let ta="10.14.0";/**
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
 */const Js=new Bo("@firebase/firestore");function Bt(t,...e){if(Js.logLevel<=se.DEBUG){const n=e.map(yp);Js.debug(`Firestore (${ta}): ${t}`,...n)}}function Hw(t,...e){if(Js.logLevel<=se.ERROR){const n=e.map(yp);Js.error(`Firestore (${ta}): ${t}`,...n)}}function ZR(t,...e){if(Js.logLevel<=se.WARN){const n=e.map(yp);Js.warn(`Firestore (${ta}): ${t}`,...n)}}function yp(t){if(typeof t=="string")return t;try{/**
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
 */function xp(t="Unexpected state"){const e=`FIRESTORE (${ta}) INTERNAL ASSERTION FAILED: `+t;throw Hw(e),new Error(e)}function ro(t,e){t||xp()}/**
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
 */class so{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
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
 */class Ww{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class ej{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(nt.UNAUTHENTICATED))}shutdown(){}}class tj{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class nj{constructor(e){this.t=e,this.currentUser=nt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){ro(this.o===void 0);let r=this.i;const s=u=>this.i!==r?(r=this.i,n(u)):Promise.resolve();let i=new so;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new so,e.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const u=i;e.enqueueRetryable(async()=>{await u.promise,await s(this.currentUser)})},c=u=>{Bt("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(u=>c(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(Bt("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new so)}},0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?(Bt("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(ro(typeof r.accessToken=="string"),new Ww(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return ro(e===null||typeof e=="string"),new nt(e)}}class rj{constructor(e,n,r){this.l=e,this.h=n,this.P=r,this.type="FirstParty",this.user=nt.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class sj{constructor(e,n,r){this.l=e,this.h=n,this.P=r}getToken(){return Promise.resolve(new rj(this.l,this.h,this.P))}start(e,n){e.enqueueRetryable(()=>n(nt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class ij{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class oj{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,n){ro(this.o===void 0);const r=i=>{i.error!=null&&Bt("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.R;return this.R=i.token,Bt("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{Bt("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.A.getImmediate({optional:!0});i?s(i):Bt("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(ro(typeof n.token=="string"),this.R=n.token,new ij(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}function aj(t){return t.name==="IndexedDbTransactionError"}class Xl{constructor(e,n){this.projectId=e,this.database=n||"(default)"}static empty(){return new Xl("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof Xl&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */new Bw([4294967295,4294967295],0);function nd(){return typeof document<"u"?document:null}/**
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
 */class lj{constructor(e,n,r=1e3,s=1.5,i=6e4){this.ui=e,this.timerId=n,this.ko=r,this.qo=s,this.Qo=i,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const n=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),s=Math.max(0,n-r);s>0&&Bt("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ko} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,s,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
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
 */class _p{constructor(e,n,r,s,i){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new so,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,s,i){const o=Date.now()+r,c=new _p(e,n,o,s,i);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new dt(ut.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}var q0,K0;(K0=q0||(q0={})).ea="default",K0.Cache="cache";/**
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
 */function cj(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
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
 */const Y0=new Map;function uj(t,e,n,r){if(e===!0&&r===!0)throw new dt(ut.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function dj(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":xp()}function hj(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new dt(ut.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=dj(t);throw new dt(ut.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
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
 */class Q0{constructor(e){var n,r;if(e.host===void 0){if(e.ssl!==void 0)throw new dt(ut.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(n=e.ssl)===null||n===void 0||n;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new dt(ut.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}uj("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=cj((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new dt(ut.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new dt(ut.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new dt(ut.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Gw{constructor(e,n,r,s){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Q0({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new dt(ut.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new dt(ut.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Q0(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new ej;switch(r.type){case"firstParty":return new sj(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new dt(ut.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const r=Y0.get(n);r&&(Bt("ComponentProvider","Removing Datastore"),Y0.delete(n),r.terminate())}(this),Promise.resolve()}}function fj(t,e,n,r={}){var s;const i=(t=hj(t,Gw))._getSettings(),o=`${e}:${n}`;if(i.host!=="firestore.googleapis.com"&&i.host!==o&&ZR("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),t._setSettings(Object.assign(Object.assign({},i),{host:o,ssl:!1})),r.mockUserToken){let c,u;if(typeof r.mockUserToken=="string")c=r.mockUserToken,u=nt.MOCK_USER;else{c=$x(r.mockUserToken,(s=t._app)===null||s===void 0?void 0:s.options.projectId);const h=r.mockUserToken.sub||r.mockUserToken.user_id;if(!h)throw new dt(ut.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");u=new nt(h)}t._authCredentials=new tj(new Ww(c,u))}}/**
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
 */class X0{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new lj(this,"async_queue_retry"),this.Vu=()=>{const r=nd();r&&Bt("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const n=nd();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const n=nd();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const n=new so;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!aj(e))throw e;Bt("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const n=this.mu.then(()=>(this.du=!0,e().catch(r=>{this.Eu=r,this.du=!1;const s=function(o){let c=o.message||"";return o.stack&&(c=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),c}(r);throw Hw("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.du=!1,r))));return this.mu=n,n}enqueueAfterDelay(e,n,r){this.fu(),this.Ru.indexOf(e)>-1&&(n=0);const s=_p.createAndSchedule(this,e,n,r,i=>this.yu(i));return this.Tu.push(s),s}fu(){this.Eu&&xp()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const n of this.Tu)if(n.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.Tu)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const n=this.Tu.indexOf(e);this.Tu.splice(n,1)}}class pj extends Gw{constructor(e,n,r,s){super(e,n,r,s),this.type="firestore",this._queue=new X0,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new X0(e),this._firestoreClient=void 0,await e}}}function mj(t,e){const n=typeof t=="object"?t:Sc(),r=typeof t=="string"?t:"(default)",s=_r(n,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=Ux("firestore");i&&fj(s,...i)}return s}(function(e,n=!0){(function(s){ta=s})(Zr),Kt(new Dt("firestore",(r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),c=new pj(new nj(r.getProvider("auth-internal")),new oj(r.getProvider("app-check-internal")),function(h,m){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new dt(ut.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Xl(h.options.projectId,m)}(o,s),o);return i=Object.assign({useFetchStreams:n},i),c._setSettings(i),c},"PUBLIC").setMultipleInstances(!0)),vt(W0,"4.7.3",e),vt(W0,"4.7.3","esm2017")})();const qw="@firebase/installations",wp="0.6.9";/**
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
 */const Kw=1e4,Yw=`w:${wp}`,Qw="FIS_v2",gj="https://firebaseinstallations.googleapis.com/v1",vj=60*60*1e3,yj="installations",xj="Installations";/**
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
 */const _j={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},Kr=new Jr(yj,xj,_j);function Xw(t){return t instanceof Qt&&t.code.includes("request-failed")}/**
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
 */function Jw({projectId:t}){return`${gj}/projects/${t}/installations`}function Zw(t){return{token:t.token,requestStatus:2,expiresIn:Ej(t.expiresIn),creationTime:Date.now()}}async function e1(t,e){const r=(await e.json()).error;return Kr.create("request-failed",{requestName:t,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function t1({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function wj(t,{refreshToken:e}){const n=t1(t);return n.append("Authorization",Nj(e)),n}async function n1(t){const e=await t();return e.status>=500&&e.status<600?t():e}function Ej(t){return Number(t.replace("s","000"))}function Nj(t){return`${Qw} ${t}`}/**
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
 */async function kj({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const r=Jw(t),s=t1(t),i=e.getImmediate({optional:!0});if(i){const h=await i.getHeartbeatsHeader();h&&s.append("x-firebase-client",h)}const o={fid:n,authVersion:Qw,appId:t.appId,sdkVersion:Yw},c={method:"POST",headers:s,body:JSON.stringify(o)},u=await n1(()=>fetch(r,c));if(u.ok){const h=await u.json();return{fid:h.fid||n,registrationStatus:2,refreshToken:h.refreshToken,authToken:Zw(h.authToken)}}else throw await e1("Create Installation",u)}/**
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
 */function r1(t){return new Promise(e=>{setTimeout(e,t)})}/**
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
 */function Sj(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */const Ij=/^[cdef][\w-]{21}$/,Ih="";function Cj(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const n=bj(t);return Ij.test(n)?n:Ih}catch{return Ih}}function bj(t){return Sj(t).substr(0,22)}/**
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
 */function $c(t){return`${t.appName}!${t.appId}`}/**
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
 */const s1=new Map;function i1(t,e){const n=$c(t);o1(n,e),Tj(n,e)}function o1(t,e){const n=s1.get(t);if(n)for(const r of n)r(e)}function Tj(t,e){const n=Rj();n&&n.postMessage({key:t,fid:e}),jj()}let Ar=null;function Rj(){return!Ar&&"BroadcastChannel"in self&&(Ar=new BroadcastChannel("[Firebase] FID Change"),Ar.onmessage=t=>{o1(t.data.key,t.data.fid)}),Ar}function jj(){s1.size===0&&Ar&&(Ar.close(),Ar=null)}/**
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
 */const Pj="firebase-installations-database",Aj=1,Yr="firebase-installations-store";let rd=null;function Ep(){return rd||(rd=Qx(Pj,Aj,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(Yr)}}})),rd}async function Jl(t,e){const n=$c(t),s=(await Ep()).transaction(Yr,"readwrite"),i=s.objectStore(Yr),o=await i.get(n);return await i.put(e,n),await s.done,(!o||o.fid!==e.fid)&&i1(t,e.fid),e}async function a1(t){const e=$c(t),r=(await Ep()).transaction(Yr,"readwrite");await r.objectStore(Yr).delete(e),await r.done}async function Bc(t,e){const n=$c(t),s=(await Ep()).transaction(Yr,"readwrite"),i=s.objectStore(Yr),o=await i.get(n),c=e(o);return c===void 0?await i.delete(n):await i.put(c,n),await s.done,c&&(!o||o.fid!==c.fid)&&i1(t,c.fid),c}/**
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
 */async function Np(t){let e;const n=await Bc(t.appConfig,r=>{const s=Oj(r),i=Dj(t,s);return e=i.registrationPromise,i.installationEntry});return n.fid===Ih?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function Oj(t){const e=t||{fid:Cj(),registrationStatus:0};return l1(e)}function Dj(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(Kr.create("app-offline"));return{installationEntry:e,registrationPromise:s}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},r=Lj(t,n);return{installationEntry:n,registrationPromise:r}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:Mj(t)}:{installationEntry:e}}async function Lj(t,e){try{const n=await kj(t,e);return Jl(t.appConfig,n)}catch(n){throw Xw(n)&&n.customData.serverCode===409?await a1(t.appConfig):await Jl(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function Mj(t){let e=await J0(t.appConfig);for(;e.registrationStatus===1;)await r1(100),e=await J0(t.appConfig);if(e.registrationStatus===0){const{installationEntry:n,registrationPromise:r}=await Np(t);return r||n}return e}function J0(t){return Bc(t,e=>{if(!e)throw Kr.create("installation-not-found");return l1(e)})}function l1(t){return Fj(t)?{fid:t.fid,registrationStatus:0}:t}function Fj(t){return t.registrationStatus===1&&t.registrationTime+Kw<Date.now()}/**
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
 */async function Uj({appConfig:t,heartbeatServiceProvider:e},n){const r=zj(t,n),s=wj(t,n),i=e.getImmediate({optional:!0});if(i){const h=await i.getHeartbeatsHeader();h&&s.append("x-firebase-client",h)}const o={installation:{sdkVersion:Yw,appId:t.appId}},c={method:"POST",headers:s,body:JSON.stringify(o)},u=await n1(()=>fetch(r,c));if(u.ok){const h=await u.json();return Zw(h)}else throw await e1("Generate Auth Token",u)}function zj(t,{fid:e}){return`${Jw(t)}/${e}/authTokens:generate`}/**
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
 */async function kp(t,e=!1){let n;const r=await Bc(t.appConfig,i=>{if(!c1(i))throw Kr.create("not-registered");const o=i.authToken;if(!e&&Bj(o))return i;if(o.requestStatus===1)return n=Vj(t,e),i;{if(!navigator.onLine)throw Kr.create("app-offline");const c=Wj(i);return n=$j(t,c),c}});return n?await n:r.authToken}async function Vj(t,e){let n=await Z0(t.appConfig);for(;n.authToken.requestStatus===1;)await r1(100),n=await Z0(t.appConfig);const r=n.authToken;return r.requestStatus===0?kp(t,e):r}function Z0(t){return Bc(t,e=>{if(!c1(e))throw Kr.create("not-registered");const n=e.authToken;return Gj(n)?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}async function $j(t,e){try{const n=await Uj(t,e),r=Object.assign(Object.assign({},e),{authToken:n});return await Jl(t.appConfig,r),n}catch(n){if(Xw(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await a1(t.appConfig);else{const r=Object.assign(Object.assign({},e),{authToken:{requestStatus:0}});await Jl(t.appConfig,r)}throw n}}function c1(t){return t!==void 0&&t.registrationStatus===2}function Bj(t){return t.requestStatus===2&&!Hj(t)}function Hj(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+vj}function Wj(t){const e={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},t),{authToken:e})}function Gj(t){return t.requestStatus===1&&t.requestTime+Kw<Date.now()}/**
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
 */async function qj(t){const e=t,{installationEntry:n,registrationPromise:r}=await Np(e);return r?r.catch(console.error):kp(e).catch(console.error),n.fid}/**
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
 */async function Kj(t,e=!1){const n=t;return await Yj(n),(await kp(n,e)).token}async function Yj(t){const{registrationPromise:e}=await Np(t);e&&await e}/**
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
 */function Qj(t){if(!t||!t.options)throw sd("App Configuration");if(!t.name)throw sd("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw sd(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function sd(t){return Kr.create("missing-app-config-values",{valueName:t})}/**
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
 */const u1="installations",Xj="installations-internal",Jj=t=>{const e=t.getProvider("app").getImmediate(),n=Qj(e),r=_r(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},Zj=t=>{const e=t.getProvider("app").getImmediate(),n=_r(e,u1).getImmediate();return{getId:()=>qj(n),getToken:s=>Kj(n,s)}};function eP(){Kt(new Dt(u1,Jj,"PUBLIC")),Kt(new Dt(Xj,Zj,"PRIVATE"))}eP();vt(qw,wp);vt(qw,wp,"esm2017");/**
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
 */const Zl="analytics",tP="firebase_id",nP="origin",rP=60*1e3,sP="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",Sp="https://www.googletagmanager.com/gtag/js";/**
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
 */const yt=new Bo("@firebase/analytics");/**
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
 */const iP={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},Et=new Jr("analytics","Analytics",iP);/**
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
 */function oP(t){if(!t.startsWith(Sp)){const e=Et.create("invalid-gtag-resource",{gtagURL:t});return yt.warn(e.message),""}return t}function d1(t){return Promise.all(t.map(e=>e.catch(n=>n)))}function aP(t,e){let n;return window.trustedTypes&&(n=window.trustedTypes.createPolicy(t,e)),n}function lP(t,e){const n=aP("firebase-js-sdk-policy",{createScriptURL:oP}),r=document.createElement("script"),s=`${Sp}?l=${t}&id=${e}`;r.src=n?n==null?void 0:n.createScriptURL(s):s,r.async=!0,document.head.appendChild(r)}function cP(t){let e=[];return Array.isArray(window[t])?e=window[t]:window[t]=e,e}async function uP(t,e,n,r,s,i){const o=r[s];try{if(o)await e[o];else{const u=(await d1(n)).find(h=>h.measurementId===s);u&&await e[u.appId]}}catch(c){yt.error(c)}t("config",s,i)}async function dP(t,e,n,r,s){try{let i=[];if(s&&s.send_to){let o=s.send_to;Array.isArray(o)||(o=[o]);const c=await d1(n);for(const u of o){const h=c.find(p=>p.measurementId===u),m=h&&e[h.appId];if(m)i.push(m);else{i=[];break}}}i.length===0&&(i=Object.values(e)),await Promise.all(i),t("event",r,s||{})}catch(i){yt.error(i)}}function hP(t,e,n,r){async function s(i,...o){try{if(i==="event"){const[c,u]=o;await dP(t,e,n,c,u)}else if(i==="config"){const[c,u]=o;await uP(t,e,n,r,c,u)}else if(i==="consent"){const[c,u]=o;t("consent",c,u)}else if(i==="get"){const[c,u,h]=o;t("get",c,u,h)}else if(i==="set"){const[c]=o;t("set",c)}else t(i,...o)}catch(c){yt.error(c)}}return s}function fP(t,e,n,r,s){let i=function(...o){window[r].push(arguments)};return window[s]&&typeof window[s]=="function"&&(i=window[s]),window[s]=hP(i,t,e,n),{gtagCore:i,wrappedGtag:window[s]}}function pP(t){const e=window.document.getElementsByTagName("script");for(const n of Object.values(e))if(n.src&&n.src.includes(Sp)&&n.src.includes(t))return n;return null}/**
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
 */const mP=30,gP=1e3;class vP{constructor(e={},n=gP){this.throttleMetadata=e,this.intervalMillis=n}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,n){this.throttleMetadata[e]=n}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const h1=new vP;function yP(t){return new Headers({Accept:"application/json","x-goog-api-key":t})}async function xP(t){var e;const{appId:n,apiKey:r}=t,s={method:"GET",headers:yP(r)},i=sP.replace("{app-id}",n),o=await fetch(i,s);if(o.status!==200&&o.status!==304){let c="";try{const u=await o.json();!((e=u.error)===null||e===void 0)&&e.message&&(c=u.error.message)}catch{}throw Et.create("config-fetch-failed",{httpStatus:o.status,responseMessage:c})}return o.json()}async function _P(t,e=h1,n){const{appId:r,apiKey:s,measurementId:i}=t.options;if(!r)throw Et.create("no-app-id");if(!s){if(i)return{measurementId:i,appId:r};throw Et.create("no-api-key")}const o=e.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},c=new NP;return setTimeout(async()=>{c.abort()},rP),f1({appId:r,apiKey:s,measurementId:i},o,c,e)}async function f1(t,{throttleEndTimeMillis:e,backoffCount:n},r,s=h1){var i;const{appId:o,measurementId:c}=t;try{await wP(r,e)}catch(u){if(c)return yt.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${c} provided in the "measurementId" field in the local Firebase config. [${u==null?void 0:u.message}]`),{appId:o,measurementId:c};throw u}try{const u=await xP(t);return s.deleteThrottleMetadata(o),u}catch(u){const h=u;if(!EP(h)){if(s.deleteThrottleMetadata(o),c)return yt.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${c} provided in the "measurementId" field in the local Firebase config. [${h==null?void 0:h.message}]`),{appId:o,measurementId:c};throw u}const m=Number((i=h==null?void 0:h.customData)===null||i===void 0?void 0:i.httpStatus)===503?Lg(n,s.intervalMillis,mP):Lg(n,s.intervalMillis),p={throttleEndTimeMillis:Date.now()+m,backoffCount:n+1};return s.setThrottleMetadata(o,p),yt.debug(`Calling attemptFetch again in ${m} millis`),f1(t,p,r,s)}}function wP(t,e){return new Promise((n,r)=>{const s=Math.max(e-Date.now(),0),i=setTimeout(n,s);t.addEventListener(()=>{clearTimeout(i),r(Et.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function EP(t){if(!(t instanceof Qt)||!t.customData)return!1;const e=Number(t.customData.httpStatus);return e===429||e===500||e===503||e===504}class NP{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function kP(t,e,n,r,s){if(s&&s.global){t("event",n,r);return}else{const i=await e,o=Object.assign(Object.assign({},r),{send_to:i});t("event",n,o)}}/**
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
 */async function SP(){if(Wx())try{await Gx()}catch(t){return yt.warn(Et.create("indexeddb-unavailable",{errorInfo:t==null?void 0:t.toString()}).message),!1}else return yt.warn(Et.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function IP(t,e,n,r,s,i,o){var c;const u=_P(t);u.then(k=>{n[k.measurementId]=k.appId,t.options.measurementId&&k.measurementId!==t.options.measurementId&&yt.warn(`The measurement ID in the local Firebase config (${t.options.measurementId}) does not match the measurement ID fetched from the server (${k.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(k=>yt.error(k)),e.push(u);const h=SP().then(k=>{if(k)return r.getId()}),[m,p]=await Promise.all([u,h]);pP(i)||lP(i,m.measurementId),s("js",new Date);const v=(c=o==null?void 0:o.config)!==null&&c!==void 0?c:{};return v[nP]="firebase",v.update=!0,p!=null&&(v[tP]=p),s("config",m.measurementId,v),m.measurementId}/**
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
 */class CP{constructor(e){this.app=e}_delete(){return delete io[this.app.options.appId],Promise.resolve()}}let io={},ev=[];const tv={};let id="dataLayer",bP="gtag",nv,p1,rv=!1;function TP(){const t=[];if(Bx()&&t.push("This is a browser extension environment."),eS()||t.push("Cookies are not available."),t.length>0){const e=t.map((r,s)=>`(${s+1}) ${r}`).join(" "),n=Et.create("invalid-analytics-context",{errorInfo:e});yt.warn(n.message)}}function RP(t,e,n){TP();const r=t.options.appId;if(!r)throw Et.create("no-app-id");if(!t.options.apiKey)if(t.options.measurementId)yt.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${t.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw Et.create("no-api-key");if(io[r]!=null)throw Et.create("already-exists",{id:r});if(!rv){cP(id);const{wrappedGtag:i,gtagCore:o}=fP(io,ev,tv,id,bP);p1=i,nv=o,rv=!0}return io[r]=IP(t,ev,tv,e,nv,id,n),new CP(t)}function jP(t=Sc()){t=Oe(t);const e=_r(t,Zl);return e.isInitialized()?e.getImmediate():PP(t)}function PP(t,e={}){const n=_r(t,Zl);if(n.isInitialized()){const s=n.getImmediate();if(Io(e,n.getOptions()))return s;throw Et.create("already-initialized")}return n.initialize({options:e})}function AP(t,e,n,r){t=Oe(t),kP(p1,io[t.app.options.appId],e,n,r).catch(s=>yt.error(s))}const sv="@firebase/analytics",iv="0.10.8";function OP(){Kt(new Dt(Zl,(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("installations-internal").getImmediate();return RP(r,s,n)},"PUBLIC")),Kt(new Dt("analytics-internal",t,"PRIVATE")),vt(sv,iv),vt(sv,iv,"esm2017");function t(e){try{const n=e.getProvider(Zl).getImmediate();return{logEvent:(r,s,i)=>AP(n,r,s,i)}}catch(n){throw Et.create("interop-component-reg-failed",{reason:n})}}}OP();const DP={apiKey:"AIzaSyDyM1bZvabUpqINlIyF66DEaiHSePhzrB0",authDomain:"trasnporte-nataga---la-plata.firebaseapp.com",databaseURL:"https://trasnporte-nataga---la-plata-default-rtdb.firebaseio.com",projectId:"trasnporte-nataga---la-plata",storageBucket:"trasnporte-nataga---la-plata.firebasestorage.app",messagingSenderId:"175264872585",appId:"1:175264872585:web:124a80135af84a38f72e58",measurementId:"G-QXERYS2M87"},Hc=Xx(DP);jP(Hc);const Lo=O2(Hc),Re=KR(Hc);mj(Hc);function LP({onLogin:t,onRegisterOwner:e,onRegisterPassenger:n,onViewTerms:r,onViewPrivacy:s,onViewManual:i}){const[o,c]=B.useState(0),u=[{icon:l.jsx(fr,{size:32}),title:"Pasajeros",desc:"Reserva tu asiento desde cualquier dispositivo. Usa la App nativa en Android o nuestra plataforma web optimizada para iPhone.",color:"text-blue-500",features:["Reserva Web & App","Puntos Go por fidelidad","Estatus PRO exclusivo"],actions:[{label:"Android App",type:"primary",link:"https://play.google.com/store/apps/details?id=com.chopcode.rutago.app"},{label:"Versión Web",type:"secondary",action:n}]},{icon:l.jsx(an,{size:32}),title:"Conductores",desc:"Optimiza tus ingresos con herramientas digitales. Gestiona tu planilla desde Android o consulta tu ruta desde la web.",color:"text-primary-500",features:["Planilla Digital","Estatus Estrella","Check-in en vivo"],actions:[{label:"Descargar App",type:"primary",link:"https://play.google.com/store/apps/details?id=com.chopcode.rutago.app"},{label:"Acceso Web",type:"secondary",action:t}]},{icon:l.jsx(ko,{size:32}),title:"Dueños de Flota",desc:"Control room total de tus activos. Vigila la ocupación en tiempo real y monitorea ingresos desde tu oficina o celular.",color:"text-green-500",features:["Aislamiento de propiedad","Métricas en tiempo real","Control de flota"],actions:[{label:"Entrar al Portal",type:"primary",action:t},{label:"Afiliar Flota",type:"secondary",action:e}]}];return B.useEffect(()=>{const h=setInterval(()=>{c(m=>(m+1)%u.length)},5e3);return()=>clearInterval(h)},[]),l.jsxs("div",{className:"min-h-screen bg-white text-slate-900 font-sans selection:bg-primary-100",children:[l.jsx("nav",{className:"fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100",children:l.jsxs("div",{className:"max-w-7xl mx-auto px-3 md:px-6 h-16 md:h-20 flex items-center justify-between",children:[l.jsxs("div",{className:"flex items-center gap-2 md:gap-3",children:[l.jsx("div",{className:"w-8 h-8 md:w-10 md:h-10 bg-secondary-900 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg shrink-0",children:l.jsx("img",{src:"/assets/logo_icon.png",alt:"Ruta-Go Logo",className:"w-5 h-5 md:w-7 md:h-7 object-contain"})}),l.jsx("span",{className:"text-lg md:text-2xl font-black tracking-tighter text-secondary-900",children:"Ruta-Go"})]}),l.jsxs("div",{className:"flex items-center gap-1.5 md:gap-4",children:[l.jsx("button",{onClick:t,className:"px-2 md:px-6 py-2 font-bold text-slate-600 hover:text-primary-500 transition-colors text-[10px] md:text-sm",children:"Iniciar Sesión"}),l.jsxs("button",{onClick:e,className:"px-3 md:px-6 py-2 bg-secondary-900 text-white font-bold rounded-xl shadow-xl hover:bg-black transition-all active:scale-95 text-[9px] md:text-sm uppercase tracking-wider",children:["Ser Dueño",l.jsx("span",{className:"hidden md:inline",children:" de Flota"})]})]})]})}),l.jsxs("header",{className:"pt-28 md:pt-40 pb-12 md:pb-20 px-4 md:px-6 overflow-hidden relative",children:[l.jsx("div",{className:"absolute top-20 right-0 w-64 md:w-96 h-64 md:h-96 bg-primary-500/10 rounded-full blur-3xl -z-10 animate-pulse"}),l.jsxs("div",{className:"max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center",children:[l.jsxs("div",{className:"space-y-4 md:space-y-8 text-center lg:text-left",children:[l.jsxs("div",{className:"inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-primary-50 rounded-full text-primary-600 font-black text-[8px] md:text-[10px] uppercase tracking-widest border border-primary-100 mx-auto lg:mx-0",children:[l.jsx(Ag,{size:12,className:"md:size-[14px]"})," El futuro del transporte huilense"]}),l.jsxs("h1",{className:"text-3xl md:text-5xl lg:text-7xl font-black text-secondary-900 leading-[1.1] tracking-tight",children:["Conectando ",l.jsx("span",{className:"text-primary-500",children:"Nátaga"})," y La Plata con tecnología."]}),l.jsx("p",{className:"text-base md:text-xl text-slate-500 leading-relaxed max-w-lg mx-auto lg:mx-0 px-2 md:px-0",children:"Ruta-Go profesionaliza el transporte intermunicipal. Reservas en tiempo real, control de flota y una experiencia premium para todos."}),l.jsxs("div",{className:"flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start px-4 sm:px-0",children:[l.jsxs("a",{href:"https://play.google.com/store/apps/details?id=com.chopcode.rutago.app",target:"_blank",rel:"noopener noreferrer",className:"px-6 md:px-10 py-3.5 md:py-5 bg-primary-500 text-white font-black rounded-2xl shadow-2xl shadow-primary-500/40 hover:bg-orange-600 transition-all active:scale-95 flex items-center justify-center gap-2 md:gap-3 group text-sm md:text-lg",children:["Android App ",l.jsx(bl,{size:18,className:"group-hover:translate-x-1 transition-transform"})]}),l.jsx("button",{onClick:n,className:"px-6 md:px-10 py-3.5 md:py-5 bg-white text-secondary-900 font-black rounded-2xl border-2 border-secondary-900 hover:bg-secondary-50 transition-all active:scale-95 text-sm md:text-lg",children:"Versión Web (iPhone)"})]})]}),l.jsxs("div",{className:"relative mt-8 lg:mt-0",children:[l.jsx("div",{className:"bg-gradient-to-tr from-secondary-900 to-slate-800 rounded-[2.5rem] md:rounded-[3rem] p-4 md:p-8 shadow-2xl shadow-slate-900/20 transform lg:rotate-2",children:l.jsx("div",{className:"bg-white rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-inner",children:l.jsx("img",{src:"https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2069",alt:"Ruta-Go App Preview",className:"w-full h-64 md:h-96 object-cover"})})}),l.jsxs("div",{className:"absolute -bottom-4 -left-2 md:-bottom-6 md:-left-6 bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-2xl border border-slate-100 flex items-center gap-3 md:gap-4 animate-bounce-slow",children:[l.jsx("div",{className:"w-10 h-10 md:w-12 h-12 bg-amber-50 rounded-xl md:rounded-2xl flex items-center justify-center text-amber-500",children:l.jsx(Ag,{size:22,fill:"currentColor"})}),l.jsxs("div",{children:[l.jsx("p",{className:"text-[10px] text-slate-400 font-bold uppercase",children:"Calificación App"}),l.jsx("p",{className:"text-base md:text-lg font-black text-slate-800 leading-none",children:"4.9 / 5.0"})]})]})]})]})]}),l.jsx("section",{className:"py-16 md:py-24 bg-slate-50 overflow-hidden",children:l.jsxs("div",{className:"max-w-7xl mx-auto px-6",children:[l.jsxs("div",{className:"text-center mb-12 md:mb-16 space-y-4",children:[l.jsx("h2",{className:"text-3xl md:text-4xl font-black text-secondary-900 tracking-tight px-4",children:"Soluciones para todo el ecosistema"}),l.jsx("p",{className:"text-slate-500 font-medium text-sm md:text-base",children:"Haz clic en tu perfil para comenzar."})]}),l.jsx("div",{className:"hidden lg:grid grid-cols-3 gap-8",children:u.map((h,m)=>l.jsx(ov,{...h,onClick:h.action,isStatic:!0},m))}),l.jsxs("div",{className:"lg:hidden relative max-w-sm mx-auto h-[460px]",children:[u.map((h,m)=>{const p=m===o;return l.jsx("div",{className:`absolute inset-0 transition-all duration-700 ease-in-out transform ${p?"translate-x-0 opacity-100 scale-100 z-30":"translate-x-full opacity-0 scale-95 z-0"}`,children:l.jsx(ov,{...h,onClick:h.action})},m)}),l.jsx("div",{className:"absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-3",children:u.map((h,m)=>l.jsx("button",{onClick:()=>c(m),className:`h-2 rounded-full transition-all duration-300 ${m===o?"w-8 bg-primary-500":"w-2 bg-slate-200"}`},m))})]})]})}),l.jsx("section",{className:"py-16 md:py-24 bg-white",children:l.jsxs("div",{className:"max-w-7xl mx-auto px-6 flex flex-col items-center text-center space-y-8 md:space-y-12",children:[l.jsx("h2",{className:"text-3xl md:text-4xl font-black text-secondary-900 tracking-tight max-w-2xl px-4",children:"Conectamos los puntos más importantes del sur del Huila."}),l.jsxs("div",{className:"flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8",children:[l.jsx(av,{city:"Nátaga"}),l.jsx("div",{className:"w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-300 transform rotate-90 sm:rotate-0",children:l.jsx(bl,{})}),l.jsx(av,{city:"La Plata"})]})]})}),l.jsxs("footer",{className:"bg-secondary-900 py-16 md:py-24 text-white overflow-hidden relative",children:[l.jsx("div",{className:"absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-orange-400 to-transparent"}),l.jsxs("div",{className:"max-w-7xl mx-auto px-6 text-center space-y-8 md:space-y-10 relative z-10",children:[l.jsxs("h2",{className:"text-4xl md:text-5xl font-black tracking-tight leading-tight",children:["¿Listo para llevar tu flota ",l.jsx("br",{className:"hidden md:block"}),"al siguiente nivel?"]}),l.jsx("p",{className:"text-white/50 text-lg md:text-xl max-w-2xl mx-auto px-4",children:"Únete a la red de transporte más moderna de la región. Registra tu vehículo hoy mismo y empieza a ver los beneficios."}),l.jsxs("div",{className:"flex flex-col sm:flex-row justify-center gap-4 md:gap-6 pt-4 px-8 sm:px-0",children:[l.jsx("button",{onClick:e,className:"px-10 md:px-12 py-4 md:py-5 bg-primary-500 text-white font-black rounded-2xl shadow-2xl shadow-primary-500/40 hover:bg-orange-600 transition-all active:scale-95 text-base md:text-xl uppercase tracking-wider",children:"Quiero ser Socio"}),l.jsx("button",{onClick:t,className:"px-10 md:px-12 py-4 md:py-5 bg-white/10 text-white font-black rounded-2xl border border-white/10 hover:bg-white/20 transition-all active:scale-95 text-base md:text-xl uppercase tracking-wider",children:"Acceso Administrativo"})]}),l.jsxs("div",{className:"pt-16 md:pt-20 grid grid-cols-1 md:grid-cols-3 items-center gap-10",children:[l.jsxs("div",{className:"flex items-center gap-2 justify-center md:justify-start",children:[l.jsx("div",{className:"w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10",children:l.jsx("img",{src:"/assets/logo_icon.png",alt:"Ruta-Go Logo",className:"w-7 h-7 object-contain"})}),l.jsx("span",{className:"text-xl font-bold tracking-tighter",children:"Ruta-Go"})]}),l.jsx("div",{className:"text-white/30 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] order-3 md:order-none",children:"ChopCode Solutions © 2026 • Huila, CO"}),l.jsxs("div",{className:"flex justify-center md:justify-end gap-6 text-white/40 text-sm md:text-base order-2 md:order-none",children:[l.jsx("span",{onClick:i,className:"hover:text-primary-500 cursor-pointer transition-colors",children:"Manual"}),l.jsx("span",{onClick:s,className:"hover:text-primary-500 cursor-pointer transition-colors",children:"Privacidad"}),l.jsx("span",{onClick:r,className:"hover:text-primary-500 cursor-pointer transition-colors",children:"Términos"})]})]})]})]})]})}function ov({icon:t,title:e,desc:n,color:r,features:s,actions:i,isStatic:o}){return l.jsxs("div",{className:`bg-white p-8 md:p-10 rounded-3xl md:rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100 transition-all duration-500 group ${o?"hover:shadow-2xl hover:-translate-y-2":""}`,children:[l.jsx("div",{className:`mb-6 md:mb-8 w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center bg-slate-50 ${r} group-hover:scale-110 transition-transform duration-500 shadow-inner`,children:t}),l.jsx("h3",{className:"text-xl md:text-2xl font-black text-secondary-900 mb-3 md:mb-4",children:e}),l.jsx("p",{className:"text-sm md:text-base text-slate-500 leading-relaxed mb-6 md:mb-8 min-h-[3.5rem]",children:n}),l.jsx("ul",{className:"space-y-2 md:space-y-3 mb-8",children:s.map((c,u)=>l.jsxs("li",{className:"flex items-center gap-2 md:gap-3 text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wide",children:[l.jsx(Rn,{size:14,className:"text-green-500 md:size-4"})," ",c]},u))}),l.jsx("div",{className:"flex flex-col gap-3",children:i.map((c,u)=>c.link?l.jsxs("a",{href:c.link,target:"_blank",rel:"noopener noreferrer",className:`w-full py-3 rounded-xl font-black text-[10px] uppercase tracking-widest text-center transition-all active:scale-95 flex items-center justify-center gap-2 ${c.type==="primary"?"bg-primary-500 text-white shadow-lg shadow-primary-500/30 hover:bg-orange-600":"bg-slate-50 text-slate-600 border border-slate-200 hover:bg-white"}`,children:[c.label," ",l.jsx(bl,{size:14})]},u):l.jsxs("button",{onClick:c.action,className:`w-full py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 ${c.type==="primary"?"bg-secondary-900 text-white shadow-lg shadow-slate-900/30 hover:bg-black":"bg-slate-50 text-slate-600 border border-slate-200 hover:bg-white"}`,children:[c.label," ",l.jsx(bl,{size:14})]},u))})]})}function av({city:t}){return l.jsxs("div",{className:"px-6 md:px-10 py-4 md:py-6 bg-slate-50 rounded-2xl md:rounded-[2.5rem] border border-slate-100 flex items-center gap-3 md:gap-4 group hover:bg-white hover:shadow-xl transition-all duration-500",children:[l.jsx("div",{className:"w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl shadow-md flex items-center justify-center text-primary-500 group-hover:rotate-12 transition-transform",children:l.jsx(xc,{size:20,className:"md:size-6"})}),l.jsx("span",{className:"text-lg md:text-2xl font-black text-slate-800",children:t})]})}function MP({onShowRegister:t,onBack:e}){const[n,r]=B.useState(""),[s,i]=B.useState(""),[o,c]=B.useState(null),[u,h]=B.useState(!1),m=async p=>{p.preventDefault(),h(!0),c(null);try{await vC(Lo,n,s)}catch{c("Email o contraseña incorrectos. Verifica tus credenciales.")}finally{h(!1)}};return l.jsxs("div",{className:"min-h-screen bg-secondary-900 flex flex-col lg:flex-row overflow-hidden font-sans selection:bg-primary-100",children:[l.jsxs("div",{className:"hidden lg:flex lg:w-1/2 bg-gradient-to-br from-secondary-900 to-slate-800 p-20 flex-col justify-between relative",children:[l.jsx("div",{className:"absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none",children:l.jsx(Ax,{size:600,className:"text-white absolute -right-20 -bottom-20 rotate-12"})}),l.jsxs("div",{className:"relative z-10 flex items-center gap-3",children:[l.jsx("img",{src:"/assets/logo_icon.png",alt:"Ruta-Go Logo",className:"w-12 h-12 object-contain"}),l.jsx("span",{className:"text-3xl font-black tracking-tighter text-white",children:"Ruta-Go"})]}),l.jsxs("div",{className:"relative z-10 space-y-8",children:[l.jsxs("h2",{className:"text-6xl font-black text-white leading-tight tracking-tight",children:["Acceso ",l.jsx("br",{}),l.jsx("span",{className:"text-primary-500 text-7xl italic",children:"Inteligente"})," ",l.jsx("br",{}),"Universal."]}),l.jsxs("div",{className:"flex items-center gap-4 text-white/50 font-bold uppercase tracking-widest text-xs border-l-4 border-primary-500 pl-6",children:["Una sola llave para todo el Holding. ",l.jsx("br",{}),"El sistema detectará tu rol automáticamente."]})]}),l.jsx("div",{className:"relative z-10 text-white/30 text-[10px] font-black uppercase tracking-[0.3em]",children:"ChopCode Solutions • Secure Access Gateway"})]}),l.jsxs("div",{className:"flex-1 bg-white p-6 lg:p-20 flex flex-col justify-center relative animate-in fade-in slide-in-from-right-4 duration-500",children:[l.jsx("button",{onClick:e,className:"absolute top-8 left-8 lg:left-20 p-3 text-slate-400 hover:text-primary-500 hover:bg-slate-50 rounded-full transition-all group",children:l.jsx($o,{size:24,className:"group-hover:-translate-x-1 transition-transform"})}),l.jsxs("div",{className:"max-w-md mx-auto w-full space-y-10",children:[l.jsxs("div",{className:"space-y-2",children:[l.jsx("h3",{className:"text-3xl font-black text-slate-800 tracking-tight",children:"Iniciar Sesión"}),l.jsxs("div",{className:"flex items-center gap-2",children:[l.jsx("span",{className:"w-2 h-2 bg-green-500 rounded-full animate-pulse"}),l.jsx("p",{className:"text-slate-400 font-bold text-[10px] uppercase tracking-widest",children:"Puerta de Enlace Única (SSO)"})]})]}),l.jsxs("form",{onSubmit:m,className:"space-y-6",children:[l.jsx(lv,{label:"Correo Corporativo",type:"email",placeholder:"tu@rutago.com",icon:l.jsx(yc,{size:18}),value:n,onChange:r}),l.jsx(lv,{label:"Contraseña",type:"password",placeholder:"••••••••",icon:l.jsx(Rx,{size:18}),value:s,onChange:i}),o&&l.jsxs("div",{className:"p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-[10px] font-black uppercase flex items-center gap-3 animate-shake",children:[l.jsx("div",{className:"w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shrink-0"}),o]}),l.jsx("button",{type:"submit",disabled:u,className:"w-full bg-secondary-900 hover:bg-black text-white font-black py-5 rounded-2xl shadow-2xl shadow-slate-900/30 transition-all transform active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed text-sm uppercase tracking-widest",children:u?l.jsx(Vr,{className:"animate-spin",size:20}):"Entrar a Ruta-Go"})]}),l.jsx("div",{className:"pt-8 border-t border-slate-50 text-center",children:l.jsxs("p",{className:"text-xs font-bold text-slate-400 uppercase tracking-tight",children:["¿Aún no eres socio? "," ",l.jsx("button",{onClick:t,className:"text-primary-500 hover:text-orange-600 transition-colors border-b-2 border-primary-500/20 hover:border-primary-500 pb-0.5",children:"Registrar mi Flota"})]})}),l.jsx("p",{className:"text-center text-[10px] text-slate-300 font-black uppercase tracking-[0.2em]",children:"Ruta-Go Portal © 2026"})]})]})]})}function lv({label:t,type:e,placeholder:n,icon:r,value:s,onChange:i}){return l.jsxs("div",{className:"space-y-1.5 group",children:[l.jsx("label",{className:"text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-primary-500",children:t}),l.jsxs("div",{className:"relative",children:[l.jsx("div",{className:"absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 transition-colors group-focus-within:text-primary-500",children:r}),l.jsx("input",{type:e,required:!0,className:"block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-800 font-bold focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all placeholder:opacity-30 text-sm",placeholder:n,value:s,onChange:o=>i(o.target.value)})]})]})}function FP({onBack:t,initialMode:e="owner"}){const[n,r]=B.useState(e),[s,i]=B.useState(""),[o,c]=B.useState(""),[u,h]=B.useState(""),[m,p]=B.useState(""),[v,k]=B.useState(null),[C,j]=B.useState(!1),[D,b]=B.useState(!1),x=async S=>{S.preventDefault(),j(!0),k(null);try{const L=(await gC(Lo,s,o)).user;await xC(L,{displayName:u});const F=Te(Re,`usuarios/${L.uid}`),w={id:L.uid,nombre:u,email:s,telefono:m,rol:n==="owner"?"dueño":"pasajero",fechaRegistro:Date.now(),status:"active"};if(await kh(F,w),n==="owner"){const y=Te(Re,`dueños/${L.uid}`);await kh(y,"pendiente")}b(!0)}catch(A){A.code==="auth/email-already-in-use"?k("Este correo ya está registrado en Ruta-Go."):k("Ocurrió un error al procesar tu solicitud."),console.error(A)}finally{j(!1)}};return D?l.jsx("div",{className:"min-h-screen bg-secondary-900 flex items-center justify-center p-4",children:l.jsxs("div",{className:"max-w-md w-full bg-white rounded-[3rem] shadow-2xl p-12 text-center space-y-8 animate-in zoom-in-95 duration-500",children:[l.jsx("div",{className:"w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center text-green-600 mx-auto animate-bounce",children:l.jsx(Rn,{size:40})}),l.jsxs("div",{className:"space-y-4",children:[l.jsx("h2",{className:"text-3xl font-black text-slate-800 tracking-tight",children:n==="owner"?"¡Solicitud Recibida!":"¡Bienvenido a Ruta-Go!"}),l.jsxs("p",{className:"text-slate-500 font-medium leading-relaxed",children:["Hola ",l.jsx("span",{className:"text-primary-500 font-bold",children:u}),", tu cuenta ha sido creada exitosamente."]}),n==="owner"?l.jsx("div",{className:"p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider",children:"Nuestro equipo administrativo activará tu dashboard en breve."}):l.jsx("div",{className:"p-4 bg-primary-50 rounded-2xl border border-primary-100 text-xs font-bold text-primary-600 uppercase tracking-wider",children:"Ya puedes iniciar sesión y reservar tu primer viaje."})]}),l.jsx("button",{onClick:t,className:"w-full py-4 bg-secondary-900 text-white font-black rounded-2xl shadow-xl hover:bg-black transition-all active:scale-95 uppercase tracking-widest text-sm",children:"Ir al Inicio"})]})}):l.jsxs("div",{className:"min-h-screen bg-secondary-900 flex flex-col lg:flex-row overflow-hidden",children:[l.jsxs("div",{className:"hidden lg:flex lg:w-1/2 bg-gradient-to-br from-secondary-900 to-slate-800 p-20 flex-col justify-between relative",children:[l.jsx("div",{className:"absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none",children:n==="owner"?l.jsx(ko,{size:600,className:"text-white absolute -right-20 -bottom-20 rotate-12"}):l.jsx(fr,{size:600,className:"text-white absolute -right-20 -bottom-20 rotate-12"})}),l.jsxs("div",{className:"relative z-10 flex items-center gap-3",children:[l.jsx("img",{src:"/assets/logo_icon.png",alt:"Ruta-Go Logo",className:"w-12 h-12 object-contain"}),l.jsx("span",{className:"text-3xl font-black tracking-tighter text-white",children:"Ruta-Go"})]}),l.jsxs("div",{className:"relative z-10 space-y-8",children:[l.jsxs("h2",{className:"text-6xl font-black text-white leading-tight tracking-tight",children:[n==="owner"?"Únete a la":"Viaja con"," ",l.jsx("br",{}),l.jsx("span",{className:"text-primary-500 text-7xl italic",children:"revolución"})," ",l.jsx("br",{}),n==="owner"?"del transporte.":"del Huila."]}),l.jsx("div",{className:"flex items-center gap-4 text-white/50 font-bold uppercase tracking-widest text-xs border-l-4 border-primary-500 pl-6",children:n==="owner"?"Gestión de flota, contabilidad en vivo y control operativo total.":"Reservas en tiempo real, puntos de fidelidad y la mejor experiencia."})]}),l.jsx("div",{className:"relative z-10 text-white/30 text-[10px] font-black uppercase tracking-[0.3em]",children:"ChopCode Solutions • Engineering for Productivity"})]}),l.jsxs("div",{className:"flex-1 bg-white p-6 lg:p-20 flex flex-col justify-center relative animate-in slide-in-from-right-4 duration-500",children:[l.jsx("button",{onClick:t,className:"absolute top-8 left-8 lg:left-20 p-3 text-slate-400 hover:text-primary-500 hover:bg-slate-50 rounded-full transition-all group",children:l.jsx($o,{size:24,className:"group-hover:-translate-x-1 transition-transform"})}),l.jsxs("div",{className:"max-w-md mx-auto w-full space-y-10",children:[l.jsxs("div",{className:"space-y-4",children:[l.jsxs("div",{className:"space-y-1",children:[l.jsx("h3",{className:"text-3xl font-black text-slate-800 tracking-tight",children:n==="owner"?"Crea tu cuenta de Socio":"Registro de Pasajero"}),l.jsx("p",{className:"text-slate-400 font-bold text-[10px] uppercase tracking-widest",children:n==="owner"?"Registra tus datos para afiliar tu flota":"Únete gratis y reserva tus viajes en segundos"})]}),l.jsxs("div",{className:"flex p-1 bg-slate-100 rounded-2xl",children:[l.jsxs("button",{onClick:()=>r("passenger"),className:`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${n==="passenger"?"bg-white text-primary-500 shadow-lg shadow-slate-200":"text-slate-400 hover:text-slate-600"}`,children:[l.jsx(fr,{size:14})," Soy Pasajero"]}),l.jsxs("button",{onClick:()=>r("owner"),className:`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${n==="owner"?"bg-white text-secondary-900 shadow-lg shadow-slate-200":"text-slate-400 hover:text-slate-600"}`,children:[l.jsx(ko,{size:14})," Soy Socio"]})]})]}),l.jsxs("form",{onSubmit:x,className:"space-y-6",children:[l.jsx(Fa,{label:"Nombre Completo",placeholder:"Ej: Juan Pérez",icon:l.jsx(kf,{size:18}),value:u,onChange:h,required:!0}),l.jsx(Fa,{label:"Correo Electrónico",type:"email",placeholder:"tu@email.com",icon:l.jsx(yc,{size:18}),value:s,onChange:i,required:!0}),l.jsx(Fa,{label:"Teléfono / WhatsApp",placeholder:"321 000 0000",icon:l.jsx(jx,{size:18}),value:m,onChange:p,required:!0}),l.jsx(Fa,{label:"Contraseña",type:"password",placeholder:"••••••••",icon:l.jsx(Rx,{size:18}),value:o,onChange:c,required:!0}),v&&l.jsxs("div",{className:"p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-[10px] font-black uppercase flex items-center gap-3 animate-shake",children:[l.jsx("div",{className:"w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shrink-0"}),v]}),l.jsx("button",{type:"submit",disabled:C,className:`w-full text-white font-black py-5 rounded-2xl shadow-2xl transition-all transform active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed text-sm uppercase tracking-widest ${n==="owner"?"bg-secondary-900 hover:bg-black shadow-slate-900/30":"bg-primary-500 hover:bg-orange-600 shadow-primary-500/30"}`,children:C?l.jsx(Vr,{className:"animate-spin",size:20}):n==="owner"?"Enviar Solicitud de Socio":"Crear mi Cuenta de Pasajero"})]}),l.jsx("p",{className:"text-center text-[10px] text-slate-300 font-black uppercase tracking-[0.2em]",children:"Ruta-Go Portal © 2026"})]})]})]})}function Fa({label:t,value:e,onChange:n,type:r="text",placeholder:s,icon:i,required:o=!1}){return l.jsxs("div",{className:"space-y-1.5 group",children:[l.jsx("label",{className:"text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-primary-500",children:t}),l.jsxs("div",{className:"relative",children:[l.jsx("div",{className:"absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 transition-colors group-focus-within:text-primary-500",children:i}),l.jsx("input",{type:r,required:o,placeholder:s,className:"w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all placeholder:opacity-30 text-sm",value:e,onChange:c=>n(c.target.value)})]})]})}function UP({onBack:t}){return l.jsxs("div",{className:"min-h-screen bg-slate-50 font-sans selection:bg-primary-100",children:[l.jsx("nav",{className:"bg-white border-b border-slate-200 sticky top-0 z-50",children:l.jsxs("div",{className:"max-w-4xl mx-auto px-6 h-20 flex items-center gap-4",children:[l.jsx("button",{onClick:t,className:"p-2 text-slate-400 hover:text-primary-500 hover:bg-slate-50 rounded-full transition-all",children:l.jsx($o,{size:24})}),l.jsx("h1",{className:"text-xl font-black text-secondary-900 tracking-tight",children:"Términos y Condiciones"})]})}),l.jsxs("main",{className:"max-w-4xl mx-auto px-6 py-16 space-y-12",children:[l.jsxs("section",{className:"bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 space-y-8 text-justify",children:[l.jsxs("div",{className:"flex items-center gap-4 border-b border-slate-100 pb-6",children:[l.jsx("div",{className:"w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-500 shadow-inner",children:l.jsx(Fk,{size:28})}),l.jsxs("div",{children:[l.jsx("p",{className:"text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]",children:"Acuerdo Legal"}),l.jsx("h2",{className:"text-2xl font-black text-slate-800 tracking-tight",children:"Reglas de Operación Ruta-Go"})]})]}),l.jsx("p",{className:"text-slate-600 leading-relaxed italic",children:"Versión 1.4.0 Stable | Vigentes desde el 16 de julio de 2026. Al utilizar la plataforma (App o Web), usted acepta estos términos."}),l.jsxs("div",{className:"space-y-6",children:[l.jsx("h3",{className:"text-lg font-black text-secondary-900 flex items-center gap-2 italic",children:"1. Naturaleza del Servicio"}),l.jsxs("p",{className:"text-slate-600 leading-relaxed",children:["Ruta-Go es un intermediario tecnológico para la optimización del transporte intermunicipal. Actuamos como un motor de gestión de cupos y horarios.",l.jsx("strong",{className:"text-secondary-900",children:" Chop Code Solutions no es una empresa de transportes"})," ni posee flota vehicular propia."]}),l.jsx("h3",{className:"text-lg font-black text-secondary-900 flex items-center gap-2 italic",children:"2. Responsabilidad de Socios y Dueños"}),l.jsx("p",{className:"text-slate-600 leading-relaxed",children:"Los usuarios registrados con rol de Socio/Dueño de Flota se comprometen a utilizar los datos del portal administrativo con fines estrictamente operativos. La información sobre pasajeros, ingresos y conductores es confidencial y su mal uso será motivo de expulsión inmediata."}),l.jsx("h3",{className:"text-lg font-black text-secondary-900 flex items-center gap-2 italic",children:"3. Compromisos de Seguridad"}),l.jsx("p",{className:"text-slate-600 leading-relaxed",children:"Es responsabilidad del transportador garantizar que la información técnica del vehículo (placa y capacidad) sea veraz y se encuentre sincronizada con la base de datos de Ruta-Go para evitar sobreventa de cupos."}),l.jsxs("div",{className:"p-6 bg-red-50 rounded-2xl border border-red-100 flex items-start gap-4",children:[l.jsx(zk,{className:"text-red-500 shrink-0",size:24}),l.jsx("p",{className:"text-xs text-red-700 font-bold leading-relaxed uppercase",children:"Aviso Legal: Chop Code Solutions no asume responsabilidad por fallas mecánicas, accidentes, retrasos físicos o disputas de precios fuera de lo estipulado en la plataforma."})]}),l.jsx("h3",{className:"text-lg font-black text-secondary-900 flex items-center gap-2 italic",children:"4. Propiedad Intelectual"}),l.jsxs("p",{className:"text-slate-600 leading-relaxed",children:["Todo el código fuente, motores de reserva (Seat/Reservation Engine), logotipos y manuales técnicos son propiedad exclusiva de ",l.jsx("strong",{className:"text-primary-500",children:"Chop Code Solutions"}),"."]})]})]}),l.jsx("footer",{className:"text-center pb-10",children:l.jsx("p",{className:"text-[10px] text-slate-300 font-black uppercase tracking-[0.3em]",children:"ChopCode Solutions © 2026 • Nátaga - La Plata, Huila"})})]})]})}function zP({onBack:t}){return l.jsxs("div",{className:"min-h-screen bg-slate-50 font-sans selection:bg-primary-100",children:[l.jsx("nav",{className:"bg-white border-b border-slate-200 sticky top-0 z-50",children:l.jsxs("div",{className:"max-w-4xl mx-auto px-6 h-20 flex items-center gap-4",children:[l.jsx("button",{onClick:t,className:"p-2 text-slate-400 hover:text-primary-500 hover:bg-slate-50 rounded-full transition-all",children:l.jsx($o,{size:24})}),l.jsx("h1",{className:"text-xl font-black text-secondary-900 tracking-tight",children:"Política de Privacidad"})]})}),l.jsxs("main",{className:"max-w-4xl mx-auto px-6 py-16 space-y-12 text-justify",children:[l.jsxs("section",{className:"bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 space-y-8",children:[l.jsxs("div",{className:"flex items-center gap-4 border-b border-slate-100 pb-6",children:[l.jsx("div",{className:"w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 shadow-inner",children:l.jsx(Ax,{size:28})}),l.jsxs("div",{children:[l.jsx("p",{className:"text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]",children:"Protección de Datos"}),l.jsx("h2",{className:"text-2xl font-black text-slate-800 tracking-tight",children:"Habeas Data & Seguridad"})]})]}),l.jsxs("p",{className:"text-slate-600 leading-relaxed italic",children:["Estamos comprometidos con la seguridad de sus datos en cumplimiento de la ",l.jsx("strong",{className:"text-secondary-900",children:"Ley 1581 de 2012"})," de la República de Colombia."]}),l.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[l.jsx(cv,{icon:l.jsx(Rk,{size:18}),title:"Operación",desc:"Recolectamos nombres, correos y placas para la gestión logística."}),l.jsx(cv,{icon:l.jsx(yc,{size:18}),title:"Contacto",desc:"El teléfono es esencial para la coordinación real entre chofer y pasajero."})]}),l.jsxs("div",{className:"space-y-6",children:[l.jsx("h3",{className:"text-lg font-black text-secondary-900 italic border-l-4 border-primary-500 pl-4",children:"3. Eliminación de Datos (Derecho al Olvido)"}),l.jsxs("div",{className:"bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4",children:[l.jsx("p",{className:"text-slate-600 text-sm leading-relaxed",children:"En cumplimiento con las políticas de Google Play, proporcionamos métodos claros para borrar su cuenta:"}),l.jsxs("ul",{className:"space-y-3",children:[l.jsxs("li",{className:"flex gap-3 text-xs font-bold text-slate-500",children:[l.jsx("span",{className:"w-5 h-5 bg-white rounded-full flex items-center justify-center text-primary-500 shadow-sm shrink-0",children:"1"}),"Dentro de la App: Perfil > Solicitar borrar cuenta."]}),l.jsxs("li",{className:"flex gap-3 text-xs font-bold text-slate-500",children:[l.jsx("span",{className:"w-5 h-5 bg-white rounded-full flex items-center justify-center text-primary-500 shadow-sm shrink-0",children:"2"}),"Vía Email: Enviando solicitud a ",l.jsx("strong",{className:"text-secondary-900",children:"dazace94@gmail.com"}),"."]})]}),l.jsxs("div",{className:"p-4 bg-amber-50 rounded-xl flex items-center gap-3",children:[l.jsx(_c,{className:"text-amber-500",size:18}),l.jsx("p",{className:"text-[10px] text-amber-700 font-black uppercase",children:"Periodo de gracia: 30 días antes del borrado definitivo."})]})]}),l.jsx("h3",{className:"text-lg font-black text-secondary-900 italic border-l-4 border-primary-500 pl-4",children:"4. Seguridad y Segregación"}),l.jsxs("p",{className:"text-slate-600 leading-relaxed",children:["Implementamos una arquitectura de ",l.jsx("strong",{className:"text-secondary-900",children:"Segregación Total de Roles"}),". Los datos residen en infraestructuras lógicas independientes cifradas mediante protocolos de Firebase de última generación."]})]})]}),l.jsx("footer",{className:"text-center pb-10",children:l.jsx("p",{className:"text-[10px] text-slate-300 font-black uppercase tracking-[0.3em]",children:"ChopCode Solutions © 2026 • Privacidad Blindada"})})]})]})}function cv({icon:t,title:e,desc:n}){return l.jsxs("div",{className:"p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-2",children:[l.jsx("div",{className:"text-primary-500",children:t}),l.jsx("h4",{className:"font-black text-secondary-900 text-xs uppercase tracking-wider",children:e}),l.jsx("p",{className:"text-xs text-slate-500 leading-relaxed",children:n})]})}function VP({onBack:t}){return l.jsxs("div",{className:"min-h-screen bg-slate-50 font-sans selection:bg-primary-100",children:[l.jsx("nav",{className:"bg-white border-b border-slate-200 sticky top-0 z-50",children:l.jsxs("div",{className:"max-w-4xl mx-auto px-6 h-20 flex items-center gap-4",children:[l.jsx("button",{onClick:t,className:"p-2 text-slate-400 hover:text-primary-500 hover:bg-slate-50 rounded-full transition-all",children:l.jsx($o,{size:24})}),l.jsxs("div",{className:"flex items-center gap-2",children:[l.jsx("div",{className:"w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white font-black text-sm",children:"R"}),l.jsx("h1",{className:"text-xl font-black text-secondary-900 tracking-tight",children:"Manual de Usuario"})]})]})}),l.jsxs("main",{className:"max-w-4xl mx-auto px-6 py-12 space-y-16",children:[l.jsxs("header",{className:"text-center space-y-4",children:[l.jsx("div",{className:"w-20 h-20 bg-primary-500 rounded-3xl flex items-center justify-center text-white mx-auto shadow-2xl shadow-primary-500/20 transform -rotate-3",children:l.jsx(Ik,{size:40})}),l.jsxs("div",{className:"space-y-2",children:[l.jsx("h2",{className:"text-4xl font-black text-slate-800 tracking-tight leading-none",children:"Centro de Aprendizaje"}),l.jsx("p",{className:"text-slate-500 font-medium text-lg italic",children:"Domina el ecosistema Ruta-Go en pocos pasos."})]})]}),l.jsxs("section",{className:"space-y-8",children:[l.jsxs("div",{className:"flex items-center gap-4 border-b border-slate-200 pb-4",children:[l.jsx("div",{className:"w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20",children:l.jsx(fr,{size:28})}),l.jsxs("div",{children:[l.jsx("h3",{className:"text-2xl font-black text-slate-800 tracking-tight",children:"1. Guía para Pasajeros (App Móvil)"}),l.jsx("p",{className:"text-sm text-slate-400 font-bold uppercase tracking-widest",children:"Reserva y viaja sin estrés"})]})]}),l.jsxs("div",{className:"space-y-6",children:[l.jsx(Ua,{num:"1",title:"Registro e Identidad",icon:l.jsx($k,{}),desc:"Descarga la App en la Play Store. Regístrate con tu correo o usa Google para entrar instantáneamente. Tu número de teléfono es vital para que el conductor te contacte si hay algún retraso."}),l.jsx(Ua,{num:"2",title:"Selección de Trayecto",icon:l.jsx(xc,{}),desc:"En el Dashboard principal, verás las pestañas 'Nátaga -> La Plata' y 'La Plata -> Nátaga'. Elige tu destino y verás la lista de horarios disponibles."}),l.jsx(Ua,{num:"3",title:"Elige tu Asiento",icon:l.jsx(Lk,{}),desc:"Al tocar un horario, se abrirá el mapa del vehículo. Los asientos verdes están libres. Toca el que prefieras y se tornará naranja. ¡Tú tienes el control de tu comodidad!"}),l.jsx(Ua,{num:"4",title:"Confirmación y Tiquete",icon:l.jsx(Nf,{}),desc:"Revisa el resumen de tu reserva y confirma. Se generará un tiquete digital con un código único. No necesitas imprimirlo; muéstralo desde tu celular al abordar."})]})]}),l.jsxs("section",{className:"space-y-8",children:[l.jsxs("div",{className:"flex items-center gap-4 border-b border-slate-200 pb-4",children:[l.jsx("div",{className:"w-14 h-14 bg-primary-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary-500/20",children:l.jsx(an,{size:28})}),l.jsxs("div",{children:[l.jsx("h3",{className:"text-2xl font-black text-slate-800 tracking-tight",children:"2. Guía para Conductores (App Móvil)"}),l.jsx("p",{className:"text-sm text-slate-400 font-bold uppercase tracking-widest",children:"Optimización de ruta y ventas"})]})]}),l.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8",children:[l.jsx(uv,{title:"Gestión de Planilla",icon:l.jsx(vc,{className:"text-primary-500"}),points:["Visualiza tus horarios asignados en la pantalla de inicio.","Usa el botón (+) para registrar pasajeros que abordan en la calle (Venta Física).","El inventario se sincroniza en milisegundos para evitar sobreventa."]}),l.jsx(uv,{title:"Validación de Abordaje",icon:l.jsx(Tk,{className:"text-green-500"}),points:["En 'Reservas Pendientes' verás a quienes reservaron por la App.","Toca 'Confirmar Abordaje' cuando el pasajero suba al bus.","Esto asegura que el cupo se marque como 'Finalizado' y se sume a tus ingresos."]})]})]}),l.jsxs("section",{className:"space-y-8",children:[l.jsxs("div",{className:"flex items-center gap-4 border-b border-slate-200 pb-4",children:[l.jsx("div",{className:"w-14 h-14 bg-secondary-900 rounded-2xl flex items-center justify-center text-white shadow-lg",children:l.jsx(Ck,{size:28})}),l.jsxs("div",{children:[l.jsx("h3",{className:"text-2xl font-black text-slate-800 tracking-tight",children:"3. Guía para Socios (Portal Web)"}),l.jsx("p",{className:"text-sm text-slate-400 font-bold uppercase tracking-widest",children:"Inteligencia de negocios y activos"})]})]}),l.jsxs("div",{className:"bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl space-y-10",children:[l.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-12",children:[l.jsxs("div",{className:"space-y-4",children:[l.jsxs("div",{className:"flex items-center gap-3",children:[l.jsx(ko,{className:"text-primary-500"}),l.jsx("h4",{className:"font-black text-slate-800 uppercase tracking-tight",children:"Monitoreo Financiero"})]}),l.jsx("p",{className:"text-slate-500 leading-relaxed text-sm",children:"Desde tu Dashboard puedes ver el recaudo bruto de toda tu flota en tiempo real. El sistema suma automáticamente los tiquetes confirmados por tus conductores."})]}),l.jsxs("div",{className:"space-y-4",children:[l.jsxs("div",{className:"flex items-center gap-3",children:[l.jsx(wc,{className:"text-blue-500"}),l.jsx("h4",{className:"font-black text-slate-800 uppercase tracking-tight",children:"Vinculación de Personal"})]}),l.jsx("p",{className:"text-slate-500 leading-relaxed text-sm",children:"Para asignar un conductor a tu bus, usa el buscador por Email. Esto creará una relación atómica que permite al chofer operar el vehículo bajo tu supervisión."})]})]}),l.jsxs("div",{className:"p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-4",children:[l.jsx(Vk,{className:"text-primary-500 shrink-0",size:24}),l.jsxs("p",{className:"text-xs text-slate-600 font-medium leading-relaxed",children:[l.jsx("strong",{className:"text-secondary-900",children:"Aislamiento Comercial:"})," Ningún otro socio puede ver tus ingresos o la ubicación de tus conductores. Tu información financiera está cifrada y blindada por tu ID de dueño."]})]})]})]}),l.jsxs("section",{className:"bg-red-50 p-8 md:p-10 rounded-[2.5rem] border border-red-100 space-y-6",children:[l.jsxs("div",{className:"flex items-center gap-4",children:[l.jsx("div",{className:"w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600",children:l.jsx(_c,{size:24})}),l.jsx("h3",{className:"text-xl font-black text-red-900",children:"Derecho al Olvido (Eliminar Cuenta)"})]}),l.jsxs("div",{className:"space-y-4",children:[l.jsx("p",{className:"text-red-700/80 text-sm leading-relaxed font-medium",children:"Si deseas retirar tus datos del ecosistema Ruta-Go, el proceso es autónomo e irreversible tras el plazo de gracia:"}),l.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[l.jsx("div",{className:"bg-white/50 p-4 rounded-2xl text-xs font-bold text-red-900 border border-red-200/50",children:"1. Ve a Perfil > Editar Perfil > Solicitar borrar cuenta."}),l.jsx("div",{className:"bg-white/50 p-4 rounded-2xl text-xs font-bold text-red-900 border border-red-200/50",children:"2. Tus datos entran en periodo de gracia por 30 días."})]})]})]}),l.jsxs("footer",{className:"text-center pb-10 space-y-6",children:[l.jsxs("div",{className:"flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 border-t border-slate-200 pt-10",children:[l.jsxs("div",{className:"flex items-center gap-2",children:[l.jsx(Rn,{size:16,className:"text-green-500"}),l.jsx("span",{className:"text-[10px] font-black text-slate-400 uppercase tracking-widest",children:"Sincronización Realtime"})]}),l.jsxs("div",{className:"flex items-center gap-2",children:[l.jsx(Rn,{size:16,className:"text-green-500"}),l.jsx("span",{className:"text-[10px] font-black text-slate-400 uppercase tracking-widest",children:"Habeas Data OK"})]})]}),l.jsx("p",{className:"text-[10px] text-slate-300 font-black uppercase tracking-[0.3em]",children:"ChopCode Solutions © 2026 • Huila, Colombia"})]})]})]})}function Ua({num:t,title:e,desc:n,icon:r}){return l.jsxs("div",{className:"flex gap-6 group",children:[l.jsxs("div",{className:"flex flex-col items-center",children:[l.jsx("div",{className:"w-10 h-10 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center font-black text-slate-400 group-hover:border-primary-500 group-hover:text-primary-500 transition-all shadow-sm",children:t}),l.jsx("div",{className:"flex-1 w-0.5 bg-slate-200 my-2 group-last:hidden"})]}),l.jsxs("div",{className:"pb-10 space-y-2",children:[l.jsxs("div",{className:"flex items-center gap-3",children:[l.jsx("div",{className:"text-slate-300 group-hover:text-primary-500 transition-colors",children:r}),l.jsx("h4",{className:"text-lg font-black text-slate-800 uppercase tracking-tight",children:e})]}),l.jsx("p",{className:"text-slate-500 leading-relaxed text-sm max-w-2xl",children:n})]})]})}function uv({title:t,icon:e,points:n}){return l.jsxs("div",{className:"bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 space-y-6",children:[l.jsxs("div",{className:"flex items-center gap-3 border-b border-slate-50 pb-4",children:[e,l.jsx("h4",{className:"font-black text-slate-800 uppercase tracking-tight",children:t})]}),l.jsx("ul",{className:"space-y-4",children:n.map((r,s)=>l.jsxs("li",{className:"flex gap-3 text-sm text-slate-500 leading-relaxed",children:[l.jsx("span",{className:"w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 shrink-0"}),r]},s))})]})}function $P({isOpen:t,onClose:e,activeTab:n,setActiveTab:r,role:s}){const i=()=>NC(Lo),c=[{id:"overview",label:"Vista General",icon:l.jsx(Ak,{size:20}),roles:["ADMIN","OWNER","DRIVER","PASSENGER"]},{id:"history",label:"Historial",icon:l.jsx(jk,{size:20}),roles:["ADMIN","OWNER","DRIVER","PASSENGER"]},{id:"drivers",label:"Conductores",icon:l.jsx(an,{size:20}),roles:["ADMIN","OWNER"]},{id:"users",label:"Usuarios",icon:l.jsx(fr,{size:20}),roles:["ADMIN"]},{id:"schedules",label:"Horarios",icon:l.jsx(vc,{size:20}),roles:["ADMIN","OWNER"]},{id:"profile",label:"Mi Perfil",icon:l.jsx(bk,{size:20}),roles:["ADMIN","OWNER","DRIVER","PASSENGER"]}].filter(u=>u.roles.includes(s==null?void 0:s.type));return l.jsxs(l.Fragment,{children:[t&&l.jsx("div",{className:"fixed inset-0 bg-secondary-900/60 backdrop-blur-sm z-40 lg:hidden",onClick:e}),l.jsxs("aside",{className:`
        fixed inset-y-0 left-0 z-50 w-72 bg-secondary-900 text-white flex flex-col shadow-2xl transition-transform duration-300
        lg:relative lg:translate-x-0 lg:z-20
        ${t?"translate-x-0":"-translate-x-full"}
      `,children:[l.jsxs("div",{className:"p-8 flex items-center justify-between",children:[l.jsxs("div",{className:"flex items-center gap-3",children:[l.jsx("img",{src:"/assets/logo_icon.png",alt:"Ruta-Go",className:"w-10 h-10 object-contain drop-shadow-md"}),l.jsxs("div",{className:"flex flex-col leading-tight text-left",children:[l.jsx("span",{className:"text-lg font-bold tracking-tight",children:"Ruta-Go"}),l.jsx("span",{className:"text-[10px] text-primary-500 font-bold tracking-widest uppercase opacity-80",children:(s==null?void 0:s.type)==="ADMIN"?"Admin Maestro":(s==null?void 0:s.type)==="OWNER"?"Panel Dueños":(s==null?void 0:s.type)==="DRIVER"?"Panel Conductor":"Portal Pasajero"})]})]}),l.jsx("button",{onClick:e,className:"lg:hidden p-2 text-white/50 hover:text-white",children:l.jsx(Ec,{size:20})})]}),l.jsx("nav",{className:"flex-1 px-4 py-4 space-y-1 overflow-y-auto text-left",children:c.map(u=>l.jsx(BP,{icon:u.icon,label:u.label,active:n===u.id,onClick:()=>{r(u.id),window.innerWidth<1024&&e()}},u.id))}),l.jsx("div",{className:"p-4 border-t border-white/5 space-y-1 text-left",children:l.jsxs("button",{onClick:i,className:"w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all font-bold text-xs uppercase tracking-widest",children:[l.jsx(Ok,{size:18})," Salir del Portal"]})})]})]})}function BP({icon:t,label:e,active:n,onClick:r}){return l.jsxs("button",{onClick:r,className:`
        w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 group
        ${n?"bg-primary-500 text-white shadow-xl shadow-primary-500/20":"text-white/50 hover:bg-white/5 hover:text-white"}
      `,children:[l.jsx("span",{className:`${n?"scale-110":"group-hover:scale-110"} transition-transform`,children:t}),l.jsx("span",{className:"font-bold text-xs uppercase tracking-widest",children:e})]})}function HP({title:t,userEmail:e,onMenuClick:n,role:r}){const s=(r==null?void 0:r.type)==="ADMIN";r==null||r.type;const i=!(r!=null&&r.type);return l.jsxs("header",{className:"h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 shrink-0 z-30",children:[l.jsxs("div",{className:"flex items-center gap-4",children:[l.jsx("button",{onClick:n,className:"lg:hidden p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-all active:scale-90",children:l.jsx(Dk,{size:24})}),l.jsx("h2",{className:"text-xl lg:text-2xl font-black text-slate-800 tracking-tight truncate max-w-[200px] md:max-w-none",children:i?"Verificando...":t})]}),l.jsxs("div",{className:"flex items-center gap-3",children:[l.jsxs("div",{className:"text-right hidden sm:block",children:[l.jsx("p",{className:"text-[11px] font-black text-slate-700 leading-none truncate max-w-[150px]",children:e}),l.jsx("p",{className:`text-[9px] font-bold uppercase tracking-tighter mt-1 ${i?"text-slate-300":s?"text-primary-500":(r==null?void 0:r.type)==="DRIVER"?"text-amber-500":(r==null?void 0:r.type)==="PASSENGER"?"text-green-500":"text-blue-500"}`,children:i?"Cargando Perfil":s?"Sesión Root":(r==null?void 0:r.type)==="OWNER"?"Sesión Dueño":(r==null?void 0:r.type)==="DRIVER"?"Sesión Conductor":"Sesión Pasajero"})]}),l.jsx("div",{className:`w-10 h-10 lg:w-11 lg:h-11 rounded-xl flex items-center justify-center text-white font-black shadow-lg text-sm transition-colors duration-500 ${i?"bg-slate-200 shadow-none":s?"bg-primary-500 shadow-primary-500/20":(r==null?void 0:r.type)==="DRIVER"?"bg-amber-500 shadow-amber-500/20":(r==null?void 0:r.type)==="PASSENGER"?"bg-green-600 shadow-green-500/20":"bg-blue-600 shadow-blue-500/20"}`,children:e==null?void 0:e.substring(0,2).toUpperCase()})]})]})}function Di({label:t,value:e,icon:n,trend:r}){return l.jsxs("div",{className:"bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40",children:[l.jsx("div",{className:"mb-4 bg-slate-50 w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center scale-90 md:scale-100 origin-left",children:n}),l.jsx("p",{className:"text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-widest",children:t}),l.jsxs("div",{className:"flex items-baseline flex-wrap gap-2 mt-1",children:[l.jsx("h4",{className:"text-2xl md:text-3xl font-black text-slate-800 tracking-tighter",children:e}),l.jsx("span",{className:"text-[9px] md:text-[10px] font-bold text-green-500 uppercase",children:r})]})]})}function dv({driver:t,onEdit:e}){t.status;const n=t.status==="blocked",r=t.horariosAsignados&&t.horariosAsignados.length>0,s=t.status==="inactive"||!r&&!n;return l.jsxs("div",{className:"bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex gap-4 group relative",children:[l.jsx("div",{className:`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-colors ${n?"bg-red-50 text-red-400":"bg-slate-100 text-slate-400"}`,children:l.jsx(an,{size:24})}),l.jsxs("div",{className:"flex-1 min-w-0",children:[l.jsxs("div",{className:"flex items-center justify-between mb-1 gap-2 pr-10",children:[l.jsx("h4",{className:"font-bold text-slate-800 text-sm truncate leading-tight",children:t.nombre}),l.jsx("span",{className:`flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase shrink-0 ${n?"bg-red-100 text-red-600":s?"bg-amber-100 text-amber-600":"bg-green-100 text-green-600"}`,children:n?"Bloqueado":s?"Descanso":"En Ruta"})]}),l.jsxs("div",{className:"flex flex-col gap-1 mt-2",children:[l.jsxs("div",{className:"flex items-center gap-2 text-slate-400 text-[11px] font-medium",children:[l.jsx(ko,{size:12,className:"text-slate-300"}),l.jsxs("span",{className:"text-slate-600 font-bold",children:["Placa: ",t.placaVehiculo||"N/A"]})]}),l.jsxs("div",{className:"p-2 bg-slate-50 rounded-lg border border-slate-100 mt-1",children:[l.jsx("p",{className:"text-[9px] text-slate-400 font-bold uppercase leading-none mb-1",children:"Turnos"}),l.jsx("p",{className:"text-[11px] text-slate-700 font-bold truncate",children:t.horariosAsignados?t.horariosAsignados.join(" | "):"Sin turnos hoy"})]})]})]}),l.jsx("button",{onClick:()=>e(t),className:"absolute top-4 right-4 p-2 text-slate-300 hover:text-primary-500 hover:bg-primary-50 rounded-full transition-all opacity-0 group-hover:opacity-100",title:"Editar Conductor",children:l.jsx(Mk,{size:16})})]})}const rl={updateDriver:async(t,e)=>{const n=Te(Re,`conductores/${t}`);try{return await B0(n,e),{success:!0}}catch(r){throw console.error("Error actualizando conductor:",r),r}},deleteDriver:async t=>{const e=Te(Re,`conductores/${t}`);try{return await UR(e),{success:!0}}catch(n){throw console.error("Error eliminando conductor:",n),n}},getAllSchedules:async()=>{const t=Te(Re,"horarios"),e=await hs(t);return e.exists()?Object.entries(e.val()).map(([n,r])=>({id:n,...r})):[]},registerDriverAndVehicle:async(t,e)=>{const n={};n[`conductores/${t.id}`]={...t,status:"active",fechaRegistro:Date.now()},n[`vehiculos/${e.placa}`]={...e,conductorId:t.id,estado:"activo"};try{return await B0(Te(Re),n),{success:!0}}catch(r){throw console.error("Error en registro dual:",r),r}}};function WP({driver:t,onClose:e,onRefresh:n}){const[r,s]=B.useState(!1),[i,o]=B.useState([]),[c,u]=B.useState((t==null?void 0:t.horariosAsignados)||[]),[h,m]=B.useState({nombre:(t==null?void 0:t.nombre)||"",placaVehiculo:(t==null?void 0:t.placaVehiculo)||"",status:(t==null?void 0:t.status)||"active"});if(B.useEffect(()=>{let C=!0;return(async()=>{try{const D=await rl.getAllSchedules();C&&o(D)}catch(D){console.error("Error cargando horarios:",D)}})(),()=>{C=!1}},[]),!t)return null;const p=C=>{u(j=>j.includes(C)?j.filter(D=>D!==C):[...j,C])},v=async C=>{C.preventDefault(),s(!0);try{await rl.updateDriver(t.id,{...h,horariosAsignados:c}),n&&n(),e()}catch(j){alert("Error al actualizar: "+j.message)}finally{s(!1)}},k=async()=>{if(window.confirm(`¿Seguro que deseas ELIMINAR a ${t.nombre}? Esta acción no se puede deshacer.`)){s(!0);try{await rl.deleteDriver(t.id),n&&n(),e()}catch(C){alert("Error al eliminar: "+C.message)}finally{s(!1)}}};return l.jsx("div",{className:"fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm transition-all animate-in fade-in duration-200",children:l.jsxs("div",{className:"bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-white/20",children:[l.jsxs("div",{className:"p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50",children:[l.jsxs("div",{children:[l.jsx("h3",{className:"text-2xl font-black text-slate-800 tracking-tight",children:"Editar Conductor"}),l.jsxs("p",{className:"text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1",children:["ID Operativo: ",t.id.substring(0,8)]})]}),l.jsx("button",{onClick:e,className:"p-2 text-slate-400 hover:text-primary-500 hover:bg-slate-100 rounded-full transition-all",children:l.jsx(Ec,{size:24})})]}),l.jsxs("form",{onSubmit:v,className:"flex-1 overflow-y-auto p-8 space-y-8",children:[l.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8",children:[l.jsxs("div",{className:"space-y-5",children:[l.jsxs("h4",{className:"text-[10px] font-black text-primary-500 uppercase tracking-widest flex items-center gap-2",children:[l.jsx("div",{className:"w-1 h-3 bg-primary-500 rounded-full"})," Perfil Básico"]}),l.jsx(hv,{label:"Nombre Legal",value:h.nombre,onChange:C=>m({...h,nombre:C})}),l.jsx(hv,{label:"Placa Asignada",value:h.placaVehiculo,onChange:C=>m({...h,placaVehiculo:C.toUpperCase()})}),l.jsxs("div",{className:"space-y-1.5",children:[l.jsx("label",{className:"text-[10px] font-bold text-slate-400 uppercase tracking-tight ml-1",children:"Estado"}),l.jsxs("select",{className:"w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 appearance-none transition-all",value:h.status,onChange:C=>m({...h,status:C.target.value}),children:[l.jsx("option",{value:"active",children:"🟢 En Ruta (Activo)"}),l.jsx("option",{value:"inactive",children:"🟡 Descanso (Inactivo)"}),l.jsx("option",{value:"blocked",children:"🔴 Bloqueado (Sin Acceso)"})]})]})]}),l.jsxs("div",{className:"space-y-5",children:[l.jsxs("h4",{className:"text-[10px] font-black text-primary-500 uppercase tracking-widest flex items-center gap-2",children:[l.jsx(Tx,{size:12})," Escalafón de Hoy"]}),l.jsx("div",{className:"bg-slate-50 rounded-[2rem] p-5 border border-slate-100 max-h-[300px] overflow-y-auto space-y-2 custom-scrollbar text-center",children:i.length>0?i.map(C=>l.jsxs("label",{className:"flex items-center gap-3 p-3.5 bg-white rounded-2xl border border-slate-100 hover:border-primary-500/40 cursor-pointer transition-all group",children:[l.jsx("input",{type:"checkbox",className:"w-5 h-5 rounded-lg border-slate-300 text-primary-500 focus:ring-primary-500/20 transition-all cursor-pointer",checked:c.includes(C.id),onChange:()=>p(C.id)}),l.jsxs("div",{className:"flex flex-col text-left",children:[l.jsx("span",{className:"text-xs font-black text-slate-800 leading-none",children:C.hora}),l.jsx("span",{className:"text-[9px] font-bold text-slate-400 uppercase mt-1 truncate max-w-[150px]",children:C.ruta})]})]},C.id)):l.jsxs("div",{className:"py-10 flex flex-col items-center gap-2 opacity-30",children:[l.jsx(Vr,{className:"animate-spin",size:24}),l.jsx("p",{className:"text-[10px] font-bold uppercase italic",children:"Sincronizando horarios..."})]})})]})]}),l.jsxs("div",{className:"p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-3",children:[l.jsx(Ef,{className:"text-amber-500 shrink-0 mt-0.5",size:16}),l.jsx("p",{className:"text-[10px] text-amber-700 font-bold leading-relaxed uppercase",children:"Nota: La modificación de turnos es una acción de nivel administrador. Los cambios se reflejarán en la App del conductor inmediatamente."})]})]}),l.jsxs("div",{className:"p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between",children:[l.jsxs("button",{type:"button",disabled:r,onClick:k,className:"flex items-center gap-2 px-6 py-3.5 rounded-2xl text-red-500 hover:bg-red-50 transition-all font-black text-[10px] uppercase disabled:opacity-50 group",children:[l.jsx(_c,{size:16,className:"group-hover:scale-110 transition-transform"})," Eliminar"]}),l.jsxs("div",{className:"flex items-center gap-4",children:[l.jsx("button",{type:"button",onClick:e,className:"px-6 py-3.5 font-black text-[10px] text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors",children:"Cancelar"}),l.jsx("button",{onClick:v,disabled:r,className:"flex items-center gap-3 px-10 py-4 bg-primary-500 hover:bg-orange-600 text-white rounded-2xl shadow-xl shadow-primary-500/30 transition-all transform active:scale-95 font-black text-[10px] uppercase disabled:opacity-70",children:r?l.jsx(Vr,{className:"animate-spin",size:18}):l.jsxs(l.Fragment,{children:[l.jsx(Px,{size:18})," Guardar Cambios"]})})]})]})]})})}function hv({label:t,value:e,onChange:n}){return l.jsxs("div",{className:"space-y-1.5",children:[l.jsx("label",{className:"text-[10px] font-bold text-slate-400 uppercase tracking-tight ml-1",children:t}),l.jsx("input",{type:"text",required:!0,className:"w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all placeholder:opacity-30",value:e,onChange:r=>n(r.target.value)})]})}function GP({onClose:t,users:e,currentUser:n,role:r}){const[s,i]=B.useState(!1),[o,c]=B.useState(null),[u,h]=B.useState({email:"",placa:"",modelo:"",ano:new Date().getFullYear().toString(),capacidad:13,ownerId:(r==null?void 0:r.type)==="OWNER"?n.uid:""});B.useEffect(()=>{if(u.email.includes("@")){const p=e.find(v=>v.email.toLowerCase()===u.email.toLowerCase());c(p||null)}else c(null)},[u.email,e]);const m=async p=>{if(p.preventDefault(),!o){alert("⚠️ Error: El conductor debe registrarse primero en la App móvil con este correo.");return}i(!0);try{const v={id:o.id,nombre:o.nombre,email:o.email,telefono:o.telefono||"N/A",placaVehiculo:u.placa,vehiculoId:u.placa,horariosAsignados:[]},k={id:u.placa,placa:u.placa,modelo:u.modelo,ano:u.ano,capacidad:parseInt(u.capacidad),ownerId:u.ownerId,driverId:o.id};await rl.registerDriverAndVehicle(v,k),alert("✅ Conductor vinculado y vehículo registrado exitosamente."),t()}catch(v){alert("❌ Error: "+v.message)}finally{i(!1)}};return l.jsx("div",{className:"fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200",children:l.jsxs("div",{className:"bg-white w-full max-w-3xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]",children:[l.jsxs("div",{className:"p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50",children:[l.jsxs("div",{className:"flex items-center gap-4",children:[l.jsx("div",{className:"w-12 h-12 bg-primary-500 rounded-2xl flex items-center justify-center text-white shadow-lg",children:l.jsx(wc,{size:24})}),l.jsxs("div",{children:[l.jsx("h3",{className:"text-2xl font-black text-slate-800 tracking-tight",children:"Vincular Operador"}),l.jsx("p",{className:"text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1",children:"Gestión de Flota por Email"})]})]}),l.jsx("button",{onClick:t,className:"p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-all",children:l.jsx(Ec,{size:24})})]}),l.jsx("form",{onSubmit:m,className:"flex-1 overflow-y-auto p-8 space-y-8",children:l.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-10",children:[l.jsxs("div",{className:"space-y-6",children:[l.jsxs("h4",{className:"text-[11px] font-black text-primary-500 uppercase tracking-widest flex items-center gap-2",children:[l.jsx("div",{className:"w-1.5 h-4 bg-primary-500 rounded-full"})," 1. Buscar Conductor"]}),l.jsxs("div",{className:"space-y-2",children:[l.jsx(ds,{label:"Correo Electrónico",placeholder:"conductor@gmail.com",type:"email",value:u.email,onChange:p=>h({...u,email:p}),required:!0}),l.jsxs("div",{className:`p-4 rounded-2xl border transition-all flex items-center gap-3 ${o?"bg-green-50 border-green-100 text-green-700":u.email.includes("@")?"bg-red-50 border-red-100 text-red-600":"bg-slate-50 border-slate-100 text-slate-400"}`,children:[o?l.jsx(Rn,{size:18}):u.email.includes("@")?l.jsx(Ef,{size:18}):l.jsx(Uk,{size:18}),l.jsxs("div",{className:"flex-1",children:[l.jsx("p",{className:"text-[10px] font-black uppercase tracking-tight",children:o?"Usuario Encontrado":u.email.includes("@")?"Usuario no registrado":"Esperando correo..."}),l.jsx("p",{className:"text-xs font-bold leading-none mt-1",children:o?o.nombre:u.email.includes("@")?"Dile que se registre en la App":"Escribe el email corporativo"})]})]})]}),o&&l.jsx("div",{className:"space-y-4 animate-in slide-in-from-top-2",children:l.jsxs("div",{className:"p-4 bg-slate-50 rounded-2xl border border-slate-100",children:[l.jsx("p",{className:"text-[10px] text-slate-400 font-black uppercase mb-1",children:"Teléfono Registrado"}),l.jsx("p",{className:"text-sm font-bold text-slate-700",children:o.telefono||"No proporcionado"})]})})]}),l.jsxs("div",{className:"space-y-6",children:[l.jsxs("h4",{className:"text-[11px] font-black text-secondary-900 uppercase tracking-widest flex items-center gap-2",children:[l.jsx("div",{className:"w-1.5 h-4 bg-secondary-900 rounded-full"})," 2. Datos del Bus"]}),l.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[l.jsx(ds,{label:"Placa",placeholder:"ABC-123",value:u.placa,onChange:p=>h({...u,placa:p.toUpperCase()}),required:!0}),l.jsx(ds,{label:"Año",type:"number",value:u.ano,onChange:p=>h({...u,ano:p}),required:!0})]}),l.jsx(ds,{label:"Modelo",placeholder:"Ej: Nissan Frontier",value:u.modelo,onChange:p=>h({...u,modelo:p}),required:!0}),l.jsx(ds,{label:"Capacidad",type:"number",value:u.capacidad,onChange:p=>h({...u,capacidad:p}),required:!0}),(r==null?void 0:r.type)==="ADMIN"&&l.jsx(ds,{label:"ID del Dueño (Opcional)",placeholder:"UID del dueño",value:u.ownerId,onChange:p=>h({...u,ownerId:p})})]})]})}),l.jsxs("div",{className:"p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-4",children:[l.jsx("button",{type:"button",onClick:t,className:"px-8 py-4 font-black text-[10px] text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-all",children:"Cancelar"}),l.jsx("button",{onClick:m,disabled:s||!o,className:"flex items-center gap-3 px-12 py-4 bg-secondary-900 hover:bg-black text-white rounded-2xl shadow-xl transition-all transform active:scale-95 font-black text-[10px] uppercase disabled:opacity-30 disabled:cursor-not-allowed",children:s?l.jsx(Vr,{className:"animate-spin",size:18}):l.jsxs(l.Fragment,{children:[l.jsx(Px,{size:18})," Vincular Conductor"]})})]})]})})}function ds({label:t,value:e,onChange:n,type:r="text",placeholder:s,required:i=!1}){return l.jsxs("div",{className:"space-y-1.5",children:[l.jsx("label",{className:"text-[10px] font-black text-slate-400 uppercase tracking-tight ml-1",children:t}),l.jsx("input",{type:r,required:i,placeholder:s,className:"w-full px-4 py-3.5 bg-white border border-slate-200 rounded-2xl font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all placeholder:opacity-40 text-sm",value:e,onChange:o=>n(o.target.value)})]})}function fv({user:t}){if(!t)return null;const e=t.solicitudBorrado===!0;return l.jsxs("div",{className:`bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex gap-4 group ${e?"opacity-60 grayscale-[0.5]":""}`,children:[l.jsx("div",{className:`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${e?"bg-red-50 text-red-400":"bg-blue-50 text-blue-500"}`,children:l.jsx(kf,{size:22})}),l.jsxs("div",{className:"flex-1 min-w-0",children:[l.jsxs("div",{className:"flex items-center justify-between mb-1 gap-2",children:[l.jsx("h4",{className:"font-bold text-slate-800 text-sm truncate leading-tight",children:t.nombre||t.name||"Usuario sin nombre"}),e?l.jsxs("span",{className:"flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-[9px] font-black uppercase shrink-0",children:[l.jsx(_c,{size:10})," Borrado"]}):l.jsx("span",{className:"flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 text-[9px] font-black uppercase shrink-0",children:"Activo"})]}),l.jsxs("div",{className:"flex flex-col gap-1 mt-1",children:[l.jsxs("div",{className:"flex items-center gap-2 text-slate-500 text-[11px]",children:[l.jsx(yc,{size:12,className:"text-slate-300"}),l.jsx("span",{className:"truncate",children:t.email||"Sin correo"})]}),l.jsxs("div",{className:"flex items-center justify-between mt-1",children:[l.jsxs("div",{className:"flex items-center gap-2 text-slate-500 text-[11px]",children:[l.jsx(jx,{size:12,className:"text-slate-300"}),l.jsx("span",{children:t.telefono||t.phone||"N/A"})]}),l.jsxs("div",{className:"flex items-center gap-1 px-2 py-0.5 bg-amber-50 rounded-lg border border-amber-100",children:[l.jsx(Sk,{size:10,className:"text-amber-500"}),l.jsxs("span",{className:"text-[10px] font-bold text-amber-700",children:[t.puntosGo||0," pts"]})]})]})]})]})]})}function Ip({schedules:t,drivers:e,role:n,onManage:r}){const s=i=>{if(!i)return{name:"Sin asignar",isExternal:!1,isMe:!1};const o=e.find(h=>h.id===i),c=i===(n==null?void 0:n.uid);if((n==null?void 0:n.type)==="ADMIN")return{name:o?o.nombre:"Cargando...",isExternal:!1,isMe:c};const u=e.some(h=>h.id===i);return{name:o?o.nombre:"Conductor Externo",isExternal:!u,isMe:c}};return l.jsx("div",{className:"bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden",children:l.jsx("div",{className:"overflow-x-auto scrollbar-hide",children:l.jsxs("table",{className:"w-full text-left border-collapse min-w-[600px]",children:[l.jsx("thead",{children:l.jsxs("tr",{className:"bg-slate-50 border-b border-slate-100",children:[l.jsx("th",{className:"px-4 md:px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest",children:"Hora & Ruta"}),l.jsx("th",{className:"px-4 md:px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest",children:"Conductor Asignado"}),l.jsx("th",{className:"px-4 md:px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center",children:"Disponibilidad"}),l.jsx("th",{className:"px-4 md:px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center",children:"Estado"})]})}),l.jsx("tbody",{className:"divide-y divide-slate-50",children:t.map(i=>{const o=s(i.conductorId),c=i.totalAsientos||0,u=i.asientosDisponibles||0,h=c-u,m=c>0?Math.round(h/c*100):0,p=u===0&&c>0,v=!i.conductorId;return l.jsxs("tr",{className:"hover:bg-slate-50/50 transition-colors group",children:[l.jsx("td",{className:"px-4 md:px-6 py-4 md:py-5",children:l.jsxs("div",{className:"flex items-center justify-between",children:[l.jsxs("div",{className:"flex items-center gap-3 md:gap-4 min-w-0",children:[l.jsxs("div",{className:"w-10 h-10 md:w-12 md:h-12 bg-primary-50 rounded-xl md:rounded-2xl flex flex-col items-center justify-center text-primary-600 shrink-0",children:[l.jsx(Tx,{size:14,className:"md:size-4"}),l.jsx("span",{className:"text-[8px] md:text-[10px] font-black mt-0.5 uppercase tracking-tighter leading-none",children:i.hora.split(" ")[1]})]}),l.jsxs("div",{className:"min-w-0",children:[l.jsx("p",{className:"text-xs md:text-sm font-black text-slate-800 leading-tight mb-0.5",children:i.hora.split(" ")[0]}),l.jsxs("div",{className:"flex items-center gap-1 text-slate-400",children:[l.jsx(xc,{size:10,className:"shrink-0"}),l.jsx("span",{className:"text-[9px] md:text-[10px] font-bold uppercase tracking-tight truncate",children:i.ruta})]})]})]}),o.isMe&&r&&l.jsxs("button",{onClick:()=>r(i),className:"ml-4 p-2 bg-primary-500 text-white rounded-lg shadow-lg shadow-primary-500/20 hover:bg-orange-600 transition-all transform active:scale-90 flex items-center gap-2",children:[l.jsx(fr,{size:14}),l.jsx("span",{className:"text-[10px] font-black uppercase hidden md:inline",children:"Gestionar"})]})]})}),l.jsx("td",{className:"px-4 md:px-6 py-4 md:py-5",children:l.jsxs("div",{className:"flex items-center gap-2 md:gap-3",children:[l.jsx("div",{className:`p-1.5 md:p-2 rounded-lg md:rounded-xl shrink-0 ${v?"bg-red-50 text-red-400":o.isExternal?"bg-slate-50 text-slate-300":"bg-slate-100 text-slate-500"}`,children:l.jsx(kf,{size:14,className:"md:size-4"})}),l.jsx("span",{className:`text-xs md:text-sm font-bold truncate max-w-[120px] md:max-w-none ${v?"text-red-500 italic":o.isExternal?"text-slate-400 italic font-medium":"text-slate-700"}`,children:o.name})]})}),l.jsx("td",{className:"px-4 md:px-6 py-4 md:py-5",children:l.jsx("div",{className:"flex justify-center",children:(n==null?void 0:n.type)!=="ADMIN"&&o.isExternal?l.jsxs("div",{className:"flex items-center gap-2 text-[9px] md:text-[10px] font-bold text-slate-300 uppercase tracking-widest italic leading-none",children:[l.jsx("div",{className:"w-6 md:w-8 h-1 bg-slate-100 rounded-full"}),"Privado"]}):l.jsxs("div",{className:"space-y-1.5 w-full max-w-[100px] md:max-w-[140px]",children:[l.jsxs("div",{className:"flex items-center justify-between text-[8px] md:text-[10px] font-black uppercase tracking-tighter",children:[l.jsx("span",{className:p?"text-red-500":"text-slate-400",children:p?"Agotado":`${u} Libres`}),l.jsxs("span",{className:"text-slate-800",children:[m,"%"]})]}),l.jsx("div",{className:"h-1 md:h-1.5 w-full bg-slate-100 rounded-full overflow-hidden",children:l.jsx("div",{className:`h-full transition-all duration-1000 ${p?"bg-red-500":"bg-primary-500 shadow-[0_0_8px_rgba(255,109,0,0.3)]"}`,style:{width:`${m}%`}})})]})})}),l.jsx("td",{className:"px-4 md:px-6 py-4 md:py-5 text-center",children:l.jsx("div",{className:"inline-flex items-center gap-1.5 px-2 md:px-3 py-1 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest shrink-0",children:v?l.jsxs("span",{className:"bg-red-100 text-red-600 px-2 md:px-3 py-1 rounded-full flex items-center gap-1 leading-none",children:[l.jsx(Ef,{size:10})," Pendiente"]}):p?l.jsx("span",{className:"bg-slate-800 text-white px-2 md:px-3 py-1 rounded-full flex items-center gap-1 shadow-lg shadow-slate-800/20 leading-none",children:"Completado"}):l.jsxs("span",{className:"bg-green-100 text-green-600 px-2 md:px-3 py-1 rounded-full flex items-center gap-1 leading-none",children:[l.jsx(Rn,{size:10})," En Venta"]})})})]},i.id)})})]})})})}function qP({schedule:t,onClose:e}){const[n,r]=B.useState(!0),[s,i]=B.useState({}),[o,c]=B.useState(!1);B.useEffect(()=>{if(!(t!=null&&t.id))return;const m=Te(Re,`disponibilidadAsientos/${t.id}/asientosOcupados`),p=Bn(m,v=>{v.exists()?i(v.val()):i({}),r(!1)});return()=>p()},[t]);const u=async m=>{if(o)return;c(!0);const p=s[m]===!0,v=Te(Re,`disponibilidadAsientos/${t.id}`);try{await JR(v,k=>{if(k){k.asientosOcupados||(k.asientosOcupados={});const C=!p;k.asientosOcupados[m]=C;const j=k.asientosDisponibles||0;k.asientosDisponibles=C?Math.max(0,j-1):j+1}return k})}catch(k){console.error("Error toggling seat:",k)}finally{c(!1)}},h=Array.from({length:16},(m,p)=>(p+1).toString());return l.jsxs("div",{className:"fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10",children:[l.jsx("div",{className:"absolute inset-0 bg-secondary-900/80 backdrop-blur-md",onClick:e}),l.jsxs("div",{className:"relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]",children:[l.jsxs("div",{className:"p-8 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50",children:[l.jsxs("div",{className:"flex items-center gap-4",children:[l.jsx("div",{className:"w-12 h-12 bg-primary-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary-500/20",children:l.jsx(an,{size:24})}),l.jsxs("div",{children:[l.jsx("h3",{className:"text-xl font-black text-slate-800 uppercase tracking-tight",children:"Venta Física de Pasajes"}),l.jsxs("p",{className:"text-[10px] text-slate-400 font-bold uppercase tracking-widest",children:[t.hora," • ",t.ruta]})]})]}),l.jsx("button",{onClick:e,className:"p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all",children:l.jsx(Ec,{size:24})})]}),l.jsx("div",{className:"flex-1 overflow-y-auto p-8 space-y-8",children:l.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8",children:[l.jsxs("div",{className:"space-y-6",children:[l.jsxs("div",{className:"flex items-center justify-between",children:[l.jsx("h4",{className:"text-xs font-black text-slate-400 uppercase tracking-widest",children:"Mapa de Asientos"}),l.jsxs("div",{className:"flex gap-4",children:[l.jsx(pv,{item:"Libre",color:"bg-green-100 border-green-200"}),l.jsx(pv,{item:"Vendido",color:"bg-orange-500 border-orange-600"})]})]}),l.jsx("div",{className:"bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100 relative",children:n?l.jsx("div",{className:"h-64 flex items-center justify-center",children:l.jsx(Vr,{className:"animate-spin text-primary-500",size:32})}):l.jsxs("div",{className:"grid grid-cols-4 gap-4",children:[l.jsx("div",{className:"col-start-4 bg-slate-200/50 rounded-xl h-10 flex items-center justify-center text-slate-400",children:l.jsx("div",{className:"w-6 h-6 rounded-full border-4 border-slate-300"})}),h.map(m=>l.jsx("button",{disabled:o,onClick:()=>u(m),className:`
                          h-12 rounded-xl border-b-4 font-black text-sm transition-all transform active:scale-90
                          ${s[m]===!0?"bg-primary-500 border-orange-700 text-white shadow-lg shadow-primary-500/20":"bg-white border-slate-200 text-slate-400 hover:border-green-400 hover:text-green-500"}
                        `,children:m},m))]})})]}),l.jsxs("div",{className:"space-y-6",children:[l.jsxs("div",{className:"bg-secondary-900 rounded-[2.5rem] p-8 text-white space-y-4",children:[l.jsxs("div",{className:"flex items-center gap-3",children:[l.jsx(wc,{className:"text-primary-500",size:20}),l.jsx("h4",{className:"font-black uppercase text-sm tracking-tight",children:"Instrucciones"})]}),l.jsxs("ul",{className:"space-y-3",children:[l.jsx(od,{text:"Toca un número para marcar el asiento como ocupado (Venta de calle)."}),l.jsx(od,{text:"Vuelve a tocar para liberarlo si el pasajero cancela."}),l.jsx(od,{text:"Los cambios son instantáneos para los pasajeros en la App."})]})]}),l.jsxs("div",{className:"p-6 bg-amber-50 rounded-[2rem] border border-amber-100 flex items-start gap-4",children:[l.jsx(Pk,{className:"text-amber-500 shrink-0",size:20}),l.jsxs("p",{className:"text-[11px] text-amber-800 font-medium leading-relaxed",children:[l.jsx("strong",{children:"IMPORTANTE:"})," Asegúrate de cobrar el pasaje antes de marcar el asiento. Esta acción actualiza el inventario global de Ruta-Go."]})]})]})]})}),l.jsx("div",{className:"p-8 border-t border-slate-50 flex justify-end shrink-0",children:l.jsx("button",{onClick:e,className:"px-10 py-4 bg-secondary-900 text-white font-black rounded-2xl shadow-xl hover:bg-black transition-all active:scale-95 uppercase tracking-widest text-xs",children:"Finalizar Gestión"})})]})]})}function pv({item:t,color:e}){return l.jsxs("div",{className:"flex items-center gap-2",children:[l.jsx("div",{className:`w-3 h-3 rounded ${e} border`}),l.jsx("span",{className:"text-[9px] font-bold text-slate-400 uppercase tracking-tighter",children:t})]})}function od({text:t}){return l.jsxs("li",{className:"flex gap-3 text-xs text-white/60 leading-relaxed font-medium",children:[l.jsx(Rn,{className:"text-primary-500 shrink-0",size:14}),t]})}const KP=t=>{const[e,n]=B.useState({type:null,uid:null,ownedPlates:[]}),[r,s]=B.useState({totalUsers:0,activeDrivers:0,totalVehicles:0,totalOwners:0,todayReservations:0,totalRevenue:0,loading:!0}),[i,o]=B.useState([]),[c,u]=B.useState([]),[h,m]=B.useState([]),[p,v]=B.useState([]),[k,C]=B.useState({toLaPlata:{reservations:0,seats:0},toNataga:{reservations:0,seats:0}});return B.useEffect(()=>{if(!t)return;let j=!0;const D=[],b=async()=>{try{const S=await hs(Te(Re,`admins/${t.uid}`));if(S.exists()&&S.val()===!0){j&&(n({type:"ADMIN",uid:t.uid,ownedPlates:[]}),x("ADMIN",[]));return}if((await hs(Te(Re,`dueños/${t.uid}`))).exists()){const w=await hs(Te(Re,"vehiculos"));let y=[];w.exists()&&(y=Object.entries(w.val()).filter(([_,N])=>N.ownerId===t.uid).map(([_,N])=>_)),j&&(n({type:"OWNER",uid:t.uid,ownedPlates:y}),x("OWNER",y));return}const L=await hs(Te(Re,`conductores/${t.uid}`));if(L.exists()){if(j){const w=L.val(),y=w.placaVehiculo||w.vehiculoId;n({type:"DRIVER",uid:t.uid,ownedPlates:y?[y]:[]}),x("DRIVER",y?[y]:[])}return}(await hs(Te(Re,`usuarios/${t.uid}`))).exists()?j&&(n({type:"PASSENGER",uid:t.uid,ownedPlates:[]}),x("PASSENGER",[])):j&&(n({type:null,uid:null,ownedPlates:[]}),s(w=>({...w,loading:!1})))}catch(S){console.error("Error resolviendo rol:",S),j&&s(A=>({...A,loading:!1}))}},x=(S,A)=>{const L=new Date,F=L.getTimezoneOffset()*6e4;if(new Date(L.getTime()-F).toISOString().split("T")[0],S==="ADMIN"){const I=Bn(Te(Re,"usuarios"),E=>{if(E.exists()){const K=Object.entries(E.val()).map(([me,De])=>({id:me,...De}));u(K),s(me=>({...me,totalUsers:K.filter(De=>!De.solicitudBorrado).length}))}});D.push(I);const T=Bn(Te(Re,"dueños"),E=>{if(E.exists()){const K=Object.keys(E.val()).length;s(me=>({...me,totalOwners:K}))}});D.push(T)}const w=Bn(Te(Re,"conductores"),I=>{if(I.exists()){const T=Object.entries(I.val()).map(([K,me])=>({id:K,...me})),E=S==="ADMIN"?T:S==="DRIVER"?T.filter(K=>K.id===t.uid):T.filter(K=>A.includes(K.placaVehiculo||K.vehiculoId));o(E),s(K=>({...K,activeDrivers:E.filter(me=>me.status==="active").length}))}});D.push(w);const y=Bn(Te(Re,"vehiculos"),I=>{if(I.exists()){const T=Object.entries(I.val()).map(([K,me])=>({id:K,...me})),E=S==="ADMIN"?T:T.filter(K=>K.ownerId===t.uid);s(K=>({...K,totalVehicles:E.length}))}});D.push(y);const _=Bn(Te(Re,"reservas"),I=>{let T=0;const E=[],K=new Date,me=K.getTimezoneOffset()*6e4;new Date(K.getTime()-me).toISOString().split("T")[0],I.exists()?(Object.entries(I.val()).forEach(([De,ve])=>{const U=ve.vehiculoId||ve.vehiculoPlaca,$=S==="ADMIN"||A.includes(U),G=S==="DRIVER"&&ve.conductorId===t.uid,ie=S==="PASSENGER"&&ve.usuarioId===t.uid;if($||G||ie){E.push({id:De,...ve});const Z=(ve.estadoReserva||ve.reservationStatus||"").toLowerCase();$&&(Z==="confirmada"||Z==="completada")&&(T+=Number(ve.precio||ve.price||0))}}),j&&(v(E),s(De=>({...De,totalRevenue:T,loading:!1})))):j&&(v([]),s(De=>({...De,loading:!1})))});D.push(_);const N=Bn(Te(Re,"horarios"),I=>{if(I.exists()){const T=Object.entries(I.val()).map(([U,$])=>({id:U,...$}));m(T);let E=0,K=0,me=0,De=0,ve=0;T.forEach(U=>{const $=U.ruta.toLowerCase(),G=U.totalAsientos||0,ie=U.asientosDisponibles||0,Z=Math.max(0,G-ie),ye=S==="DRIVER"&&U.conductorId===t.uid;$.includes("la plata")?(E+=Z,K+=ie):($.includes("nátaga")||$.includes("nataga"))&&(me+=Z,De+=ie),S==="DRIVER"?ye&&(ve+=Z):ve+=Z}),j&&(C({toLaPlata:{reservations:E,seats:K},toNataga:{reservations:me,seats:De}}),s(U=>({...U,todayReservations:ve})))}});D.push(N)};return b(),()=>{j=!1,D.forEach(S=>S())}},[t]),{role:e,stats:r,drivers:i,users:c,schedules:h,reservations:p,routeStats:k}};function YP(){const[t,e]=B.useState(null),[n,r]=B.useState("landing"),[s,i]=B.useState("owner"),[o,c]=B.useState("overview"),[u,h]=B.useState(!0),[m,p]=B.useState(!1),[v,k]=B.useState(null),[C,j]=B.useState(!1),[D,b]=B.useState(null);B.useEffect(()=>{const _=EC(Lo,N=>{e(N),h(!1)});return()=>_()},[]);const{role:x,stats:S,drivers:A,users:L,schedules:F,reservations:w,routeStats:y}=KP(t);return u?l.jsxs("div",{className:"h-screen bg-secondary-900 flex flex-col items-center justify-center gap-6",children:[l.jsxs("div",{className:"relative",children:[l.jsx("img",{src:"/assets/logo_icon.png",alt:"Ruta-Go",className:"w-16 h-16 object-contain animate-pulse"}),l.jsx(Vr,{className:"text-primary-500 animate-spin absolute -bottom-2 -right-2",size:24})]}),l.jsx("p",{className:"text-white/40 text-[10px] font-black uppercase tracking-widest animate-pulse",children:"Autenticando..."})]}):t?!S.loading&&!(x!=null&&x.type)?l.jsxs("div",{className:"h-screen bg-secondary-900 flex flex-col items-center justify-center p-10 text-center gap-6",children:[l.jsx("div",{className:"w-20 h-20 bg-red-500/20 rounded-3xl flex items-center justify-center text-red-500",children:l.jsx(ni,{size:40})}),l.jsxs("div",{children:[l.jsx("h2",{className:"text-white text-2xl font-black tracking-tight",children:"Acceso Denegado"}),l.jsx("p",{className:"text-white/40 text-sm mt-2 max-w-xs mx-auto",children:"Tu cuenta no tiene permisos para este portal."})]}),l.jsx("button",{onClick:()=>Lo.signOut(),className:"px-8 py-3 bg-white text-secondary-900 font-bold rounded-xl shadow-xl active:scale-95 transition-all",children:"Cerrar Sesión"})]}):l.jsxs("div",{className:"flex h-screen bg-slate-50 text-slate-900 antialiased font-sans overflow-hidden",children:[l.jsx($P,{isOpen:m,onClose:()=>p(!1),activeTab:o,setActiveTab:c,role:x}),l.jsxs("main",{className:"flex-1 flex flex-col min-w-0 overflow-hidden relative",children:[l.jsx(HP,{title:o==="overview"?x!=null&&x.type?x.type==="ADMIN"?"Panel Maestro":x.type==="OWNER"?"Dashboard Dueño":x.type==="DRIVER"?"Panel de Conductor":"Centro de Reservas":"Cargando...":o==="history"?"Historial de Reservas":o==="profile"?"Mi Perfil de Usuario":o==="drivers"?"Gestión de Conductores":o==="users"?"Base de Clientes (Pasajeros)":o==="schedules"?"Planilla de Despachos":"Dashboard",userEmail:t.email,onMenuClick:()=>p(!0),role:x}),l.jsx("div",{className:"flex-1 overflow-y-auto p-4 lg:p-10 bg-slate-50/50",children:o==="overview"?(x==null?void 0:x.type)==="PASSENGER"?l.jsx(XP,{routeStats:y,schedules:F,drivers:A,role:x}):(x==null?void 0:x.type)==="DRIVER"?l.jsx(JP,{stats:S,routeStats:y,schedules:F,drivers:A,reservations:w,role:x,onManage:_=>b(_)}):l.jsx(QP,{stats:S,routeStats:y,role:x}):o==="history"?l.jsx(rA,{reservations:w,role:x}):o==="profile"?l.jsx(nA,{user:t,role:x}):o==="drivers"?l.jsx(tA,{drivers:A,onEditDriver:_=>k(_),onAddDriver:()=>j(!0)}):o==="users"?l.jsx(eA,{users:L}):o==="schedules"?l.jsx(ZP,{schedules:F,drivers:A,role:x,onManage:_=>b(_)}):l.jsx("div",{className:"flex items-center justify-center h-full text-slate-400 font-medium italic",children:"Módulo en desarrollo (Fase 2)..."})})]}),v&&l.jsx(WP,{driver:v,onClose:()=>k(null),onRefresh:()=>{}}),C&&l.jsx(GP,{onClose:()=>j(!1),users:L,currentUser:t,role:x}),D&&l.jsx(qP,{schedule:D,onClose:()=>b(null)})]}):n==="login"?l.jsx(MP,{onBack:()=>r("landing"),onShowRegister:()=>{i("owner"),r("register")}}):n==="register"?l.jsx(FP,{onBack:()=>r("landing"),initialMode:s}):n==="terms"?l.jsx(UP,{onBack:()=>r("landing")}):n==="privacy"?l.jsx(zP,{onBack:()=>r("landing")}):n==="manual"?l.jsx(VP,{onBack:()=>r("landing")}):l.jsx(LP,{onLogin:()=>r("login"),onRegisterOwner:()=>{i("owner"),r("register")},onRegisterPassenger:()=>{i("passenger"),r("register")},onViewTerms:()=>r("terms"),onViewPrivacy:()=>r("privacy"),onViewManual:()=>r("manual")})}function QP({stats:t,routeStats:e,role:n}){const r=i=>new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0}).format(i),s=(n==null?void 0:n.type)==="ADMIN";return l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:`grid grid-cols-1 md:grid-cols-2 ${s?"lg:grid-cols-5":"lg:grid-cols-3"} gap-8 mb-10`,children:[s&&l.jsxs(l.Fragment,{children:[l.jsx(Di,{label:"Usuarios Activos",value:t.totalUsers,icon:l.jsx(fr,{className:"text-blue-500"}),trend:"Habeas Data OK"}),l.jsx(Di,{label:"Dueños de Flota",value:t.totalOwners,icon:l.jsx(fr,{className:"text-amber-500"}),trend:"Socios Activos"})]}),l.jsx(Di,{label:"Conductores en Turno",value:t.activeDrivers,icon:l.jsx(an,{className:"text-green-500"}),trend:"Estado: Active"}),l.jsx(Di,{label:"Reservas Hoy",value:t.todayReservations,icon:l.jsx(vc,{className:"text-purple-500"}),trend:"Fecha Actual"}),l.jsx(Di,{label:"Ingresos Generados",value:r(t.totalRevenue),icon:l.jsx(ni,{className:"text-primary-500"}),trend:s?"Holding Total":"Tus Vehículos"})]}),l.jsxs("div",{className:"space-y-6",children:[l.jsxs("div",{className:"flex items-center justify-between",children:[l.jsxs("div",{children:[l.jsx("h3",{className:"font-bold text-xl text-slate-800 tracking-tight",children:"Estado por ruta"}),l.jsx("p",{className:"text-xs text-slate-400 font-medium uppercase mt-1",children:"Tráfico de pasajeros en tiempo real"})]}),l.jsx("div",{className:"px-3 py-1 bg-primary-50 rounded-full text-[10px] font-black text-primary-600 uppercase",children:"Live Feedback"})]}),l.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",children:[l.jsx(ec,{name:"Nátaga → La Plata",reservations:e.toLaPlata.reservations,available:e.toLaPlata.seats,color:"bg-orange-500"}),l.jsx(ec,{name:"La Plata → Nátaga",reservations:e.toNataga.reservations,available:e.toNataga.seats,color:"bg-secondary-900"})]})]})]})}function ec({name:t,reservations:e,available:n,color:r}){return l.jsxs("div",{className:"bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 space-y-4",children:[l.jsxs("div",{className:"space-y-1",children:[l.jsx("h4",{className:`text-[10px] font-black uppercase tracking-tight ${r==="bg-orange-500"?"text-primary-500":"text-secondary-900"}`,children:t}),l.jsx("div",{className:`w-6 h-0.5 rounded-full ${r}`})]}),l.jsxs("div",{className:"flex items-center gap-6",children:[l.jsxs("div",{className:"flex-1 flex flex-col items-center text-center space-y-1",children:[l.jsx(ni,{size:18,className:"text-slate-300"}),l.jsx("span",{className:"text-lg font-black text-slate-800 leading-none",children:e}),l.jsx("span",{className:"text-[10px] font-bold text-slate-400 uppercase tracking-tighter",children:"Reservas"})]}),l.jsx("div",{className:"w-px h-10 bg-slate-100"}),l.jsxs("div",{className:"flex-1 flex flex-col items-center text-center space-y-1",children:[l.jsx(an,{size:18,className:"text-green-500"}),l.jsx("span",{className:"text-lg font-black text-green-500 leading-none",children:n}),l.jsx("span",{className:"text-[10px] font-bold text-slate-400 uppercase tracking-tighter",children:"Libres"})]})]})]})}function XP({routeStats:t,schedules:e,drivers:n,role:r}){return l.jsxs("div",{className:"space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700",children:[l.jsxs("div",{className:"bg-gradient-to-br from-primary-500 to-orange-600 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-primary-500/20 relative overflow-hidden",children:[l.jsxs("div",{className:"relative z-10 space-y-2",children:[l.jsx("h2",{className:"text-3xl font-black tracking-tight",children:"¡Hola Pasajero! 🎒"}),l.jsx("p",{className:"text-white/80 font-medium max-w-md",children:"Bienvenido a la Web App de Ruta-Go. Reserva tu próximo viaje de forma rápida y segura."})]}),l.jsx("img",{src:"/assets/logo_icon.png",className:"absolute -right-10 -bottom-10 w-48 h-48 opacity-10 rotate-12",alt:"bg"})]}),l.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8",children:[l.jsxs("div",{className:"space-y-6",children:[l.jsxs("h3",{className:"text-xl font-black text-slate-800 flex items-center gap-3",children:[l.jsx(xc,{className:"text-primary-500"})," Estado por ruta"]}),l.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[l.jsx(ec,{name:"Nátaga → La Plata",reservations:t.toLaPlata.reservations,available:t.toLaPlata.seats,color:"bg-orange-500"}),l.jsx(ec,{name:"La Plata → Nátaga",reservations:t.toNataga.reservations,available:t.toNataga.seats,color:"bg-secondary-900"})]})]}),l.jsxs("div",{className:"bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl flex flex-col justify-center items-center text-center space-y-6",children:[l.jsx("div",{className:"w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-primary-400",children:l.jsx(an,{size:32})}),l.jsxs("div",{className:"space-y-2",children:[l.jsx("h4",{className:"text-xl font-black",children:"Reserva en Línea"}),l.jsx("p",{className:"text-white/40 text-sm",children:"El motor de reservas web está en mantenimiento técnico. Por favor consulta la planilla abajo."})]}),l.jsx("button",{className:"px-8 py-3 bg-primary-500 text-white font-black rounded-xl text-xs uppercase tracking-widest opacity-50 cursor-not-allowed",children:"Próximamente"})]})]}),l.jsxs("div",{className:"space-y-6 pt-4",children:[l.jsxs("div",{className:"flex items-center gap-3",children:[l.jsx("div",{className:"w-2 h-6 bg-primary-500 rounded-full"}),l.jsx("h3",{className:"text-xl font-black text-slate-800 uppercase tracking-tight",children:"Planilla de Horarios Realtime"})]}),l.jsx(Ip,{schedules:e,drivers:n,role:r})]})]})}function JP({stats:t,routeStats:e,schedules:n,drivers:r,reservations:s=[],role:i,onManage:o}){const c=r.find(k=>k.id===i.uid)||{},u=c.nombre||"Cargando...",h=c.placaVehiculo||c.vehiculoId||"---",m=n.filter(k=>k.conductorId===i.uid),p=s.filter(k=>k.estadoReserva==="Pendiente"||k.reservationStatus==="Pendiente"),v=k=>new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0}).format(k);return l.jsxs("div",{className:"space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700",children:[l.jsxs("div",{className:"bg-primary-500 -mt-4 lg:-mt-10 -mx-4 lg:-mx-10 p-6 lg:p-10 pb-16 lg:pb-20 relative overflow-hidden",children:[l.jsxs("div",{className:"max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10",children:[l.jsxs("div",{className:"flex items-center gap-5",children:[l.jsx("div",{className:"w-16 h-16 lg:w-20 lg:h-20 bg-white/20 rounded-full border-2 border-secondary-900 p-1",children:l.jsx("div",{className:"w-full h-full bg-slate-200 rounded-full flex items-center justify-center text-secondary-900 font-black text-xl lg:text-2xl",children:u.substring(0,1)})}),l.jsxs("div",{children:[l.jsx("h2",{className:"text-2xl lg:text-3xl font-black text-secondary-900 tracking-tight",children:u}),l.jsxs("p",{className:"text-secondary-900/60 font-bold text-sm lg:text-base uppercase tracking-wider",children:["Placa: ",h]})]})]}),l.jsx("div",{className:"inline-flex items-center px-4 py-2 bg-secondary-900 text-white rounded-full text-[10px] lg:text-xs font-black uppercase tracking-widest self-start md:self-auto",children:"Conductor Activo"})]}),l.jsx("div",{className:"max-w-5xl mx-auto mt-8 lg:mt-12",children:l.jsxs("div",{className:"bg-secondary-900 rounded-3xl p-6 lg:p-8 shadow-2xl shadow-black/20 border border-white/5",children:[l.jsxs("div",{className:"flex items-center justify-between mb-6",children:[l.jsx("h4",{className:"text-[10px] lg:text-xs font-black text-primary-500 uppercase tracking-[0.2em]",children:"Resumen del día"}),l.jsx("button",{className:"text-primary-500 hover:rotate-180 transition-transform duration-500",children:l.jsx(ni,{size:16})})]}),l.jsxs("div",{className:"grid grid-cols-3 gap-4",children:[l.jsx(ad,{label:"Reservas",value:(t==null?void 0:t.todayReservations)||0,color:"text-green-500"}),l.jsx(ad,{label:"Libres",value:c.asientosLibres||26,color:"text-primary-500"}),l.jsx(ad,{label:"Ingresos",value:v((t==null?void 0:t.totalRevenue)||0),color:"text-amber-500"})]})]})})]}),l.jsxs("div",{className:"max-w-5xl mx-auto space-y-10 pb-10",children:[l.jsxs("div",{className:"space-y-4",children:[l.jsxs("div",{className:"flex items-center justify-between px-2",children:[l.jsxs("div",{className:"flex items-center gap-3",children:[l.jsx(Rn,{className:"text-primary-500",size:18}),l.jsx("h3",{className:"text-sm lg:text-base font-black text-slate-800 uppercase tracking-tight",children:"Confirmar Reservas"})]}),l.jsx("span",{className:"bg-primary-500 text-white px-3 py-1 rounded-full text-[10px] font-black",children:p.length})]}),p.length>0?l.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:p.map(k=>l.jsxs("div",{className:"bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl flex items-center justify-between group",children:[l.jsxs("div",{className:"flex items-center gap-4",children:[l.jsx("div",{className:"w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-primary-500 transition-colors",children:l.jsx(Nf,{size:24})}),l.jsxs("div",{children:[l.jsxs("p",{className:"text-sm font-black text-slate-800",children:["Asiento #",k.asientoReservado||k.reservedSeat]}),l.jsxs("p",{className:"text-[10px] font-bold text-slate-400 uppercase",children:["Pasajero: ",k.nombreUsuario||"App User"]})]})]}),l.jsx("button",{className:"px-4 py-2 bg-green-500 text-white text-[10px] font-black uppercase rounded-xl shadow-lg shadow-green-500/20 active:scale-95 transition-all",children:"Confirmar"})]},k.id))}):l.jsx("div",{className:"bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl flex items-center justify-center text-center",children:l.jsx("p",{className:"text-slate-400 text-xs font-bold uppercase italic",children:"No hay reservas activas en este momento"})})]}),l.jsxs("div",{className:"space-y-4",children:[l.jsx("h3",{className:"text-sm lg:text-base font-black text-slate-800 uppercase tracking-tight px-2",children:"Estado por ruta"}),l.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[l.jsx(mv,{name:"Nátaga → La Plata",reservations:e.toLaPlata.reservations,available:e.toLaPlata.seats,color:"border-orange-500"}),l.jsx(mv,{name:"La Plata → Nátaga",reservations:e.toNataga.reservations,available:e.toNataga.seats,color:"border-secondary-900"})]})]}),l.jsxs("div",{className:"space-y-4",children:[l.jsxs("div",{className:"flex items-center justify-between px-2",children:[l.jsxs("div",{className:"flex items-center gap-3",children:[l.jsx(vc,{className:"text-primary-500",size:18}),l.jsx("h3",{className:"text-sm lg:text-base font-black text-slate-800 uppercase tracking-tight",children:"Mi Itinerario"})]}),l.jsx("span",{className:"bg-slate-100 text-slate-400 px-3 py-1 rounded-full text-[10px] font-black",children:m.length})]}),l.jsx(Ip,{schedules:m,drivers:r,role:i,onManage:o})]})]})]})}function ad({label:t,value:e,color:n}){return l.jsxs("div",{className:"flex flex-col items-center text-center space-y-1",children:[l.jsx("span",{className:`text-xl lg:text-2xl font-black ${n}`,children:e}),l.jsx("span",{className:"text-[9px] lg:text-[10px] font-bold text-white/40 uppercase tracking-widest",children:t})]})}function mv({name:t,reservations:e,available:n,color:r}){return l.jsxs("div",{className:`bg-white p-6 rounded-[2rem] border-l-4 ${r} shadow-xl shadow-slate-200/50 space-y-5`,children:[l.jsx("h4",{className:"text-[11px] font-black text-slate-400 uppercase tracking-tight",children:t}),l.jsxs("div",{className:"flex items-center gap-8",children:[l.jsxs("div",{className:"flex flex-col items-center gap-1",children:[l.jsx(Rn,{size:16,className:"text-slate-300"}),l.jsx("span",{className:"text-lg font-black text-slate-800",children:e}),l.jsx("span",{className:"text-[9px] font-bold text-slate-400 uppercase",children:"Reservas"})]}),l.jsxs("div",{className:"flex flex-col items-center gap-1",children:[l.jsx(an,{size:16,className:"text-green-500"}),l.jsx("span",{className:"text-lg font-black text-green-500",children:n}),l.jsx("span",{className:"text-[9px] font-bold text-slate-400 uppercase",children:"Libres"})]})]})]})}function ZP({schedules:t,drivers:e,role:n,onManage:r}){const[s,i]=B.useState("toLaPlata"),o=t.filter(h=>h.ruta.toLowerCase().includes("nátaga -> la plata")||h.ruta.toLowerCase().includes("nátaga")&&h.ruta.toLowerCase().includes("plata")&&h.ruta.toLowerCase().indexOf("nátaga")<h.ruta.toLowerCase().indexOf("plata")),c=t.filter(h=>h.ruta.toLowerCase().includes("la plata -> nátaga")||h.ruta.toLowerCase().includes("plata")&&h.ruta.toLowerCase().includes("nátaga")&&h.ruta.toLowerCase().indexOf("plata")<h.ruta.toLowerCase().indexOf("nátaga")),u=s==="toLaPlata"?o:c;return l.jsxs("div",{className:"space-y-6",children:[l.jsxs("div",{className:"flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4",children:[l.jsxs("div",{className:"flex items-center gap-3",children:[l.jsx("div",{className:"w-2 h-6 bg-primary-500 rounded-full"}),l.jsx("h3",{className:"text-xl font-black text-slate-800 uppercase tracking-tight",children:"Planilla de Despachos"})]}),l.jsxs("div",{className:"flex bg-slate-100 p-1 rounded-xl shrink-0",children:[l.jsx("button",{onClick:()=>i("toLaPlata"),className:`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${s==="toLaPlata"?"bg-white text-primary-500 shadow-sm":"text-slate-400 hover:text-slate-600"}`,children:"Nátaga → La Plata"}),l.jsx("button",{onClick:()=>i("toNataga"),className:`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${s==="toNataga"?"bg-white text-secondary-900 shadow-sm":"text-slate-400 hover:text-slate-600"}`,children:"La Plata → Nátaga"})]})]}),l.jsxs("div",{className:"flex items-center gap-4 mb-2",children:[l.jsxs("span",{className:"px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[10px] font-black uppercase",children:[u.length," Salidas Programadas"]}),l.jsx("span",{className:`px-3 py-1 rounded-full text-[10px] font-black uppercase ${s==="toLaPlata"?"bg-orange-50 text-orange-600":"bg-secondary-50 text-secondary-900"}`,children:s==="toLaPlata"?"Sentido Occidente":"Sentido Oriente"})]}),l.jsx(Ip,{schedules:u,drivers:e,role:n,onManage:r}),l.jsxs("div",{className:"p-6 bg-blue-50 rounded-3xl border border-blue-100 flex items-center gap-4 mt-8",children:[l.jsx("div",{className:"w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 shrink-0",children:l.jsx(ni,{size:24})}),l.jsxs("div",{children:[l.jsx("h4",{className:"text-sm font-black text-blue-900 uppercase",children:"Estado de la Operación"}),l.jsxs("p",{className:"text-xs text-blue-700 font-medium",children:["Mostrando planilla en tiempo real para la ruta:",l.jsx("strong",{className:"ml-1 uppercase",children:s==="toLaPlata"?"Nátaga a La Plata":"La Plata a Nátaga"}),"."]})]})]})]})}function eA({users:t=[]}){const e=(t||[]).filter(r=>!r.solicitudBorrado),n=(t||[]).filter(r=>r.solicitudBorrado===!0);return l.jsxs("div",{className:"space-y-12",children:[l.jsxs("div",{className:"space-y-6",children:[l.jsxs("div",{className:"flex items-center gap-3 border-b border-slate-200 pb-4",children:[l.jsx("div",{className:"w-2 h-6 bg-blue-500 rounded-full"}),l.jsx("h3",{className:"text-lg font-black text-slate-800 uppercase tracking-tight",children:"Pasajeros Activos"}),l.jsxs("span",{className:"px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-[10px] font-bold",children:[e.length," TOTAL"]})]}),l.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6",children:e.length>0?e.map(r=>l.jsx(fv,{user:r},r.id)):l.jsx("p",{className:"col-span-full text-center py-10 text-slate-400 italic",children:"No hay usuarios registrados aún"})})]}),n.length>0&&l.jsxs("div",{className:"space-y-6",children:[l.jsxs("div",{className:"flex items-center gap-3 border-b border-slate-200 pb-4",children:[l.jsx("div",{className:"w-2 h-6 bg-red-500 rounded-full"}),l.jsx("h3",{className:"text-lg font-black text-slate-800 uppercase tracking-tight text-red-600",children:"Solicitudes de Borrado"}),l.jsxs("span",{className:"px-3 py-1 bg-red-100 text-red-600 rounded-full text-[10px] font-bold",children:[n.length," PENDIENTES"]})]}),l.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6",children:n.map(r=>l.jsx(fv,{user:r},r.id))}),l.jsx("div",{className:"p-4 bg-red-50 rounded-2xl border border-red-100",children:l.jsx("p",{className:"text-[10px] text-red-700 font-bold uppercase leading-relaxed",children:"⚠️ Nota Legal: Estas cuentas han solicitado el ejercicio de su Derecho al Olvido. Serán eliminadas permanentemente por la Cloud Function tras cumplirse el periodo de gracia de 30 días."})})]})]})}function tA({drivers:t,onEditDriver:e,onAddDriver:n}){const r=t.filter(i=>i.status==="active"&&i.horariosAsignados&&i.horariosAsignados.length>0),s=t.filter(i=>i.status!=="active"||!i.horariosAsignados||i.horariosAsignados.length===0);return l.jsxs("div",{className:"space-y-10",children:[l.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40",children:[l.jsxs("div",{children:[l.jsx("h3",{className:"text-xl font-black text-slate-800 uppercase tracking-tight",children:"Gestión de Operadores"}),l.jsx("p",{className:"text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1",children:"Control de flota y personal"})]}),l.jsxs("button",{onClick:n,className:"flex items-center justify-center gap-3 px-8 py-4 bg-primary-500 hover:bg-orange-600 text-white rounded-2xl shadow-lg shadow-primary-500/30 transition-all transform active:scale-95 font-black text-[10px] uppercase",children:[l.jsx(wc,{size:18})," Registrar Nuevo Conductor"]})]}),l.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-10",children:[l.jsxs("div",{className:"space-y-6",children:[l.jsxs("div",{className:"flex items-center justify-between border-b border-slate-200 pb-4",children:[l.jsxs("div",{className:"flex items-center gap-3",children:[l.jsx("div",{className:"w-2 h-6 bg-green-500 rounded-full"}),l.jsx("h3",{className:"text-lg font-black text-slate-800 uppercase tracking-tight",children:"Operando Hoy"})]}),l.jsxs("span",{className:"px-3 py-1 bg-green-100 text-green-600 rounded-full text-[10px] font-black",children:[r.length," ACTIVOS"]})]}),l.jsx("div",{className:"grid grid-cols-1 gap-4",children:r.length>0?r.map(i=>l.jsx(dv,{driver:i,onEdit:e},i.id)):l.jsxs("div",{className:"p-8 bg-white rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400",children:[l.jsx(an,{size:32,className:"mb-2 opacity-20"}),l.jsx("p",{className:"text-xs font-bold uppercase italic",children:"Sin actividad en ruta"})]})})]}),l.jsxs("div",{className:"space-y-6",children:[l.jsxs("div",{className:"flex items-center justify-between border-b border-slate-200 pb-4",children:[l.jsxs("div",{className:"flex items-center gap-3",children:[l.jsx("div",{className:"w-2 h-6 bg-slate-300 rounded-full"}),l.jsx("h3",{className:"text-lg font-black text-slate-800 uppercase tracking-tight",children:"Fuera de Servicio"})]}),l.jsxs("span",{className:"px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[10px] font-black",children:[s.length," TOTAL"]})]}),l.jsx("div",{className:"grid grid-cols-1 gap-4 opacity-90 grayscale-[0.3]",children:s.length>0?s.map(i=>l.jsx(dv,{driver:i,onEdit:e},i.id)):l.jsx("div",{className:"p-8 bg-white rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400",children:l.jsx("p",{className:"text-xs font-bold uppercase italic",children:"Personal completo en ruta"})})})]})]})]})}function nA({user:t,role:e}){var i;const n=(e==null?void 0:e.type)==="DRIVER",r=(e==null?void 0:e.type)==="OWNER",s=(e==null?void 0:e.type)==="ADMIN";return l.jsxs("div",{className:"max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700",children:[l.jsxs("div",{className:"bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-slate-100 relative overflow-hidden",children:[l.jsx("div",{className:"absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full -mr-16 -mt-16 blur-2xl"}),l.jsxs("div",{className:"flex flex-col md:flex-row items-center gap-8 relative z-10",children:[l.jsx("div",{className:"w-24 h-24 lg:w-32 lg:h-32 bg-slate-100 rounded-[2.5rem] flex items-center justify-center text-secondary-900 font-black text-4xl border-4 border-white shadow-xl",children:(i=t.email)==null?void 0:i.substring(0,1).toUpperCase()}),l.jsxs("div",{className:"text-center md:text-left space-y-2",children:[l.jsx("h2",{className:"text-3xl font-black text-slate-800 tracking-tight",children:t.displayName||"Usuario de Ruta-Go"}),l.jsxs("div",{className:"flex flex-wrap justify-center md:justify-start gap-3",children:[l.jsxs("span",{className:"px-4 py-1.5 bg-slate-100 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2",children:[l.jsx(Mail,{size:12})," ",t.email]}),l.jsxs("span",{className:`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${s?"bg-orange-100 text-orange-600":r?"bg-blue-100 text-blue-600":n?"bg-amber-100 text-amber-600":"bg-green-100 text-green-600"}`,children:[l.jsx(ni,{size:12})," Rango: ",e==null?void 0:e.type]})]})]})]})]}),l.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8 pb-10",children:[l.jsxs("div",{className:"bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-lg space-y-6",children:[l.jsxs("h3",{className:"font-black text-slate-800 uppercase text-xs tracking-widest flex items-center gap-3",children:[l.jsx(Settings,{className:"text-primary-500",size:18})," Ajustes de Seguridad"]}),l.jsx("div",{className:"space-y-4",children:l.jsxs("button",{className:"w-full text-left p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-all group flex items-center justify-between",children:[l.jsxs("div",{children:[l.jsx("p",{className:"text-sm font-bold text-slate-700",children:"Cambiar Contraseña"}),l.jsx("p",{className:"text-[10px] text-slate-400 font-medium",children:"Actualiza tu clave de acceso"})]}),l.jsx(ChevronRight,{size:16,className:"text-slate-300 group-hover:text-primary-500 transition-colors"})]})})]}),l.jsxs("div",{className:"bg-red-50 p-8 rounded-[2.5rem] border border-red-100 shadow-sm space-y-6",children:[l.jsx("h3",{className:"font-black text-red-600 uppercase text-xs tracking-widest",children:"Zona de Peligro"}),l.jsx("p",{className:"text-[11px] text-red-700/60 font-medium leading-relaxed",children:"Si decides eliminar tu cuenta, todos tus datos y transacciones entrarán en un periodo de gracia de 30 días antes del borrado definitivo (Habeas Data)."}),l.jsx("button",{className:"w-full py-4 bg-white border-2 border-red-100 text-red-500 font-black rounded-2xl text-[10px] uppercase hover:bg-red-500 hover:text-white hover:border-red-500 transition-all active:scale-95",children:"Solicitar Borrado de Cuenta"})]})]})]})}function rA({reservations:t,role:e}){e==null||e.type,e==null||e.type;const n=t.sort((r,s)=>(s.reservationDate||0)-(r.reservationDate||0));return l.jsxs("div",{className:"space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700",children:[l.jsxs("div",{className:"flex items-center justify-between border-b border-slate-200 pb-4",children:[l.jsxs("div",{className:"flex items-center gap-3",children:[l.jsx("div",{className:"w-2 h-6 bg-secondary-900 rounded-full"}),l.jsx("h3",{className:"text-xl font-black text-slate-800 uppercase tracking-tight",children:"Cronología de Reservas"})]}),l.jsxs("span",{className:"px-4 py-1.5 bg-slate-100 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest",children:[n.length," Registros Encontrados"]})]}),n.length>0?l.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10",children:n.map(r=>l.jsxs("div",{className:"bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-xl hover:shadow-2xl transition-all group overflow-hidden relative",children:[l.jsxs("div",{className:"flex items-center justify-between mb-6",children:[l.jsx("div",{className:"p-3 bg-slate-50 rounded-2xl text-slate-400 group-hover:text-primary-500 transition-colors",children:l.jsx(Nf,{size:24})}),l.jsx("span",{className:`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${(r.estadoReserva||r.reservationStatus)==="Confirmada"||(r.estadoReserva||r.reservationStatus)==="Completada"?"bg-green-100 text-green-600":"bg-red-100 text-red-600"}`,children:r.estadoReserva||r.reservationStatus})]}),l.jsxs("div",{className:"space-y-4",children:[l.jsxs("div",{children:[l.jsx("p",{className:"text-[10px] text-slate-400 font-bold uppercase tracking-widest",children:"Trayecto"}),l.jsxs("p",{className:"text-sm font-black text-slate-800",children:[r.origen||"La Plata"," ➔ ",r.destino||"Nátaga"]})]}),l.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[l.jsxs("div",{children:[l.jsx("p",{className:"text-[10px] text-slate-400 font-bold uppercase tracking-widest",children:"Asiento"}),l.jsxs("p",{className:"text-sm font-black text-slate-800",children:["#",r.asientoReservado||r.reservedSeat]})]}),l.jsxs("div",{children:[l.jsx("p",{className:"text-[10px] text-slate-400 font-bold uppercase tracking-widest",children:"Fecha"}),l.jsx("p",{className:"text-sm font-black text-slate-800",children:r.travelDate||r.reservationDate?new Date(r.travelDate||r.reservationDate).toLocaleDateString():"---"})]})]})]}),l.jsx("div",{className:"absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 bg-primary-500/5 rounded-full group-hover:bg-primary-500/10 transition-colors"})]},r.id))}):l.jsxs("div",{className:"h-96 bg-white rounded-[3rem] border-2 border-dashed border-slate-100 flex flex-col items-center justify-center text-slate-400 space-y-4",children:[l.jsx(History,{size:48,className:"opacity-10"}),l.jsx("p",{className:"text-sm font-bold uppercase italic",children:"No hay actividad registrada en el historial"})]})]})}ld.createRoot(document.getElementById("root")).render(l.jsx(uE.StrictMode,{children:l.jsx(YP,{})}));
