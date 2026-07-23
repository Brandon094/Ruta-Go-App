(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();function $1(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var av={exports:{}},Zl={},lv={exports:{}},X={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Do=Symbol.for("react.element"),B1=Symbol.for("react.portal"),H1=Symbol.for("react.fragment"),W1=Symbol.for("react.strict_mode"),G1=Symbol.for("react.profiler"),q1=Symbol.for("react.provider"),K1=Symbol.for("react.context"),Y1=Symbol.for("react.forward_ref"),Q1=Symbol.for("react.suspense"),X1=Symbol.for("react.memo"),J1=Symbol.for("react.lazy"),gm=Symbol.iterator;function Z1(t){return t===null||typeof t!="object"?null:(t=gm&&t[gm]||t["@@iterator"],typeof t=="function"?t:null)}var cv={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},uv=Object.assign,dv={};function Js(t,e,n){this.props=t,this.context=e,this.refs=dv,this.updater=n||cv}Js.prototype.isReactComponent={};Js.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Js.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function hv(){}hv.prototype=Js.prototype;function xh(t,e,n){this.props=t,this.context=e,this.refs=dv,this.updater=n||cv}var wh=xh.prototype=new hv;wh.constructor=xh;uv(wh,Js.prototype);wh.isPureReactComponent=!0;var vm=Array.isArray,fv=Object.prototype.hasOwnProperty,Eh={current:null},pv={key:!0,ref:!0,__self:!0,__source:!0};function mv(t,e,n){var r,s={},i=null,o=null;if(e!=null)for(r in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(i=""+e.key),e)fv.call(e,r)&&!pv.hasOwnProperty(r)&&(s[r]=e[r]);var l=arguments.length-2;if(l===1)s.children=n;else if(1<l){for(var u=Array(l),h=0;h<l;h++)u[h]=arguments[h+2];s.children=u}if(t&&t.defaultProps)for(r in l=t.defaultProps,l)s[r]===void 0&&(s[r]=l[r]);return{$$typeof:Do,type:t,key:i,ref:o,props:s,_owner:Eh.current}}function eE(t,e){return{$$typeof:Do,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function kh(t){return typeof t=="object"&&t!==null&&t.$$typeof===Do}function tE(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var ym=/\/+/g;function du(t,e){return typeof t=="object"&&t!==null&&t.key!=null?tE(""+t.key):e.toString(36)}function Fa(t,e,n,r,s){var i=typeof t;(i==="undefined"||i==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(i){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case Do:case B1:o=!0}}if(o)return o=t,s=s(o),t=r===""?"."+du(o,0):r,vm(s)?(n="",t!=null&&(n=t.replace(ym,"$&/")+"/"),Fa(s,e,n,"",function(h){return h})):s!=null&&(kh(s)&&(s=eE(s,n+(!s.key||o&&o.key===s.key?"":(""+s.key).replace(ym,"$&/")+"/")+t)),e.push(s)),1;if(o=0,r=r===""?".":r+":",vm(t))for(var l=0;l<t.length;l++){i=t[l];var u=r+du(i,l);o+=Fa(i,e,n,u,s)}else if(u=Z1(t),typeof u=="function")for(t=u.call(t),l=0;!(i=t.next()).done;)i=i.value,u=r+du(i,l++),o+=Fa(i,e,n,u,s);else if(i==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function ma(t,e,n){if(t==null)return t;var r=[],s=0;return Fa(t,r,"","",function(i){return e.call(n,i,s++)}),r}function nE(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var it={current:null},Ua={transition:null},rE={ReactCurrentDispatcher:it,ReactCurrentBatchConfig:Ua,ReactCurrentOwner:Eh};function gv(){throw Error("act(...) is not supported in production builds of React.")}X.Children={map:ma,forEach:function(t,e,n){ma(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return ma(t,function(){e++}),e},toArray:function(t){return ma(t,function(e){return e})||[]},only:function(t){if(!kh(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};X.Component=Js;X.Fragment=H1;X.Profiler=G1;X.PureComponent=xh;X.StrictMode=W1;X.Suspense=Q1;X.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=rE;X.act=gv;X.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var r=uv({},t.props),s=t.key,i=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(i=e.ref,o=Eh.current),e.key!==void 0&&(s=""+e.key),t.type&&t.type.defaultProps)var l=t.type.defaultProps;for(u in e)fv.call(e,u)&&!pv.hasOwnProperty(u)&&(r[u]=e[u]===void 0&&l!==void 0?l[u]:e[u])}var u=arguments.length-2;if(u===1)r.children=n;else if(1<u){l=Array(u);for(var h=0;h<u;h++)l[h]=arguments[h+2];r.children=l}return{$$typeof:Do,type:t.type,key:s,ref:i,props:r,_owner:o}};X.createContext=function(t){return t={$$typeof:K1,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:q1,_context:t},t.Consumer=t};X.createElement=mv;X.createFactory=function(t){var e=mv.bind(null,t);return e.type=t,e};X.createRef=function(){return{current:null}};X.forwardRef=function(t){return{$$typeof:Y1,render:t}};X.isValidElement=kh;X.lazy=function(t){return{$$typeof:J1,_payload:{_status:-1,_result:t},_init:nE}};X.memo=function(t,e){return{$$typeof:X1,type:t,compare:e===void 0?null:e}};X.startTransition=function(t){var e=Ua.transition;Ua.transition={};try{t()}finally{Ua.transition=e}};X.unstable_act=gv;X.useCallback=function(t,e){return it.current.useCallback(t,e)};X.useContext=function(t){return it.current.useContext(t)};X.useDebugValue=function(){};X.useDeferredValue=function(t){return it.current.useDeferredValue(t)};X.useEffect=function(t,e){return it.current.useEffect(t,e)};X.useId=function(){return it.current.useId()};X.useImperativeHandle=function(t,e,n){return it.current.useImperativeHandle(t,e,n)};X.useInsertionEffect=function(t,e){return it.current.useInsertionEffect(t,e)};X.useLayoutEffect=function(t,e){return it.current.useLayoutEffect(t,e)};X.useMemo=function(t,e){return it.current.useMemo(t,e)};X.useReducer=function(t,e,n){return it.current.useReducer(t,e,n)};X.useRef=function(t){return it.current.useRef(t)};X.useState=function(t){return it.current.useState(t)};X.useSyncExternalStore=function(t,e,n){return it.current.useSyncExternalStore(t,e,n)};X.useTransition=function(){return it.current.useTransition()};X.version="18.3.1";lv.exports=X;var H=lv.exports;const sE=$1(H);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var iE=H,oE=Symbol.for("react.element"),aE=Symbol.for("react.fragment"),lE=Object.prototype.hasOwnProperty,cE=iE.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,uE={key:!0,ref:!0,__self:!0,__source:!0};function vv(t,e,n){var r,s={},i=null,o=null;n!==void 0&&(i=""+n),e.key!==void 0&&(i=""+e.key),e.ref!==void 0&&(o=e.ref);for(r in e)lE.call(e,r)&&!uE.hasOwnProperty(r)&&(s[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)s[r]===void 0&&(s[r]=e[r]);return{$$typeof:oE,type:t,key:i,ref:o,props:s,_owner:cE.current}}Zl.Fragment=aE;Zl.jsx=vv;Zl.jsxs=vv;av.exports=Zl;var c=av.exports,td={},yv={exports:{}},kt={},_v={exports:{}},xv={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(z,$){var G=z.length;z.push($);e:for(;0<G;){var me=G-1>>>1,oe=z[me];if(0<s(oe,$))z[me]=$,z[G]=oe,G=me;else break e}}function n(z){return z.length===0?null:z[0]}function r(z){if(z.length===0)return null;var $=z[0],G=z.pop();if(G!==$){z[0]=G;e:for(var me=0,oe=z.length,Ee=oe>>>1;me<Ee;){var an=2*(me+1)-1,ln=z[an],cn=an+1,un=z[cn];if(0>s(ln,G))cn<oe&&0>s(un,ln)?(z[me]=un,z[cn]=G,me=cn):(z[me]=ln,z[an]=G,me=an);else if(cn<oe&&0>s(un,G))z[me]=un,z[cn]=G,me=cn;else break e}}return $}function s(z,$){var G=z.sortIndex-$.sortIndex;return G!==0?G:z.id-$.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;t.unstable_now=function(){return i.now()}}else{var o=Date,l=o.now();t.unstable_now=function(){return o.now()-l}}var u=[],h=[],m=1,p=null,v=3,T=!1,I=!1,A=!1,O=typeof setTimeout=="function"?setTimeout:null,S=typeof clearTimeout=="function"?clearTimeout:null,E=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function C(z){for(var $=n(h);$!==null;){if($.callback===null)r(h);else if($.startTime<=z)r(h),$.sortIndex=$.expirationTime,e(u,$);else break;$=n(h)}}function j(z){if(A=!1,C(z),!I)if(n(u)!==null)I=!0,Qt(L);else{var $=n(h);$!==null&&vt(j,$.startTime-z)}}function L(z,$){I=!1,A&&(A=!1,S(y),y=-1),T=!0;var G=v;try{for(C($),p=n(u);p!==null&&(!(p.expirationTime>$)||z&&!N());){var me=p.callback;if(typeof me=="function"){p.callback=null,v=p.priorityLevel;var oe=me(p.expirationTime<=$);$=t.unstable_now(),typeof oe=="function"?p.callback=oe:p===n(u)&&r(u),C($)}else r(u);p=n(u)}if(p!==null)var Ee=!0;else{var an=n(h);an!==null&&vt(j,an.startTime-$),Ee=!1}return Ee}finally{p=null,v=G,T=!1}}var M=!1,x=null,y=-1,_=5,k=-1;function N(){return!(t.unstable_now()-k<_)}function b(){if(x!==null){var z=t.unstable_now();k=z;var $=!0;try{$=x(!0,z)}finally{$?w():(M=!1,x=null)}}else M=!1}var w;if(typeof E=="function")w=function(){E(b)};else if(typeof MessageChannel<"u"){var J=new MessageChannel,Be=J.port2;J.port1.onmessage=b,w=function(){Be.postMessage(null)}}else w=function(){O(b,0)};function Qt(z){x=z,M||(M=!0,w())}function vt(z,$){y=O(function(){z(t.unstable_now())},$)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(z){z.callback=null},t.unstable_continueExecution=function(){I||T||(I=!0,Qt(L))},t.unstable_forceFrameRate=function(z){0>z||125<z?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):_=0<z?Math.floor(1e3/z):5},t.unstable_getCurrentPriorityLevel=function(){return v},t.unstable_getFirstCallbackNode=function(){return n(u)},t.unstable_next=function(z){switch(v){case 1:case 2:case 3:var $=3;break;default:$=v}var G=v;v=$;try{return z()}finally{v=G}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(z,$){switch(z){case 1:case 2:case 3:case 4:case 5:break;default:z=3}var G=v;v=z;try{return $()}finally{v=G}},t.unstable_scheduleCallback=function(z,$,G){var me=t.unstable_now();switch(typeof G=="object"&&G!==null?(G=G.delay,G=typeof G=="number"&&0<G?me+G:me):G=me,z){case 1:var oe=-1;break;case 2:oe=250;break;case 5:oe=1073741823;break;case 4:oe=1e4;break;default:oe=5e3}return oe=G+oe,z={id:m++,callback:$,priorityLevel:z,startTime:G,expirationTime:oe,sortIndex:-1},G>me?(z.sortIndex=G,e(h,z),n(u)===null&&z===n(h)&&(A?(S(y),y=-1):A=!0,vt(j,G-me))):(z.sortIndex=oe,e(u,z),I||T||(I=!0,Qt(L))),z},t.unstable_shouldYield=N,t.unstable_wrapCallback=function(z){var $=v;return function(){var G=v;v=$;try{return z.apply(this,arguments)}finally{v=G}}}})(xv);_v.exports=xv;var dE=_v.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var hE=H,Et=dE;function D(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var wv=new Set,ro={};function qr(t,e){Ds(t,e),Ds(t+"Capture",e)}function Ds(t,e){for(ro[t]=e,t=0;t<e.length;t++)wv.add(e[t])}var Sn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),nd=Object.prototype.hasOwnProperty,fE=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,_m={},xm={};function pE(t){return nd.call(xm,t)?!0:nd.call(_m,t)?!1:fE.test(t)?xm[t]=!0:(_m[t]=!0,!1)}function mE(t,e,n,r){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function gE(t,e,n,r){if(e===null||typeof e>"u"||mE(t,e,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function ot(t,e,n,r,s,i,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=r,this.attributeNamespace=s,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=i,this.removeEmptyString=o}var Ve={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){Ve[t]=new ot(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];Ve[e]=new ot(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){Ve[t]=new ot(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){Ve[t]=new ot(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){Ve[t]=new ot(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){Ve[t]=new ot(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){Ve[t]=new ot(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){Ve[t]=new ot(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){Ve[t]=new ot(t,5,!1,t.toLowerCase(),null,!1,!1)});var Sh=/[\-:]([a-z])/g;function Nh(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Sh,Nh);Ve[e]=new ot(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Sh,Nh);Ve[e]=new ot(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Sh,Nh);Ve[e]=new ot(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){Ve[t]=new ot(t,1,!1,t.toLowerCase(),null,!1,!1)});Ve.xlinkHref=new ot("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){Ve[t]=new ot(t,1,!1,t.toLowerCase(),null,!0,!0)});function Ch(t,e,n,r){var s=Ve.hasOwnProperty(e)?Ve[e]:null;(s!==null?s.type!==0:r||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(gE(e,n,s,r)&&(n=null),r||s===null?pE(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):s.mustUseProperty?t[s.propertyName]=n===null?s.type===3?!1:"":n:(e=s.attributeName,r=s.attributeNamespace,n===null?t.removeAttribute(e):(s=s.type,n=s===3||s===4&&n===!0?"":""+n,r?t.setAttributeNS(r,e,n):t.setAttribute(e,n))))}var Pn=hE.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ga=Symbol.for("react.element"),us=Symbol.for("react.portal"),ds=Symbol.for("react.fragment"),Ih=Symbol.for("react.strict_mode"),rd=Symbol.for("react.profiler"),Ev=Symbol.for("react.provider"),kv=Symbol.for("react.context"),Th=Symbol.for("react.forward_ref"),sd=Symbol.for("react.suspense"),id=Symbol.for("react.suspense_list"),bh=Symbol.for("react.memo"),Un=Symbol.for("react.lazy"),Sv=Symbol.for("react.offscreen"),wm=Symbol.iterator;function xi(t){return t===null||typeof t!="object"?null:(t=wm&&t[wm]||t["@@iterator"],typeof t=="function"?t:null)}var ye=Object.assign,hu;function ji(t){if(hu===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);hu=e&&e[1]||""}return`
`+hu+t}var fu=!1;function pu(t,e){if(!t||fu)return"";fu=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(h){var r=h}Reflect.construct(t,[],e)}else{try{e.call()}catch(h){r=h}t.call(e.prototype)}else{try{throw Error()}catch(h){r=h}t()}}catch(h){if(h&&r&&typeof h.stack=="string"){for(var s=h.stack.split(`
`),i=r.stack.split(`
`),o=s.length-1,l=i.length-1;1<=o&&0<=l&&s[o]!==i[l];)l--;for(;1<=o&&0<=l;o--,l--)if(s[o]!==i[l]){if(o!==1||l!==1)do if(o--,l--,0>l||s[o]!==i[l]){var u=`
`+s[o].replace(" at new "," at ");return t.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",t.displayName)),u}while(1<=o&&0<=l);break}}}finally{fu=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?ji(t):""}function vE(t){switch(t.tag){case 5:return ji(t.type);case 16:return ji("Lazy");case 13:return ji("Suspense");case 19:return ji("SuspenseList");case 0:case 2:case 15:return t=pu(t.type,!1),t;case 11:return t=pu(t.type.render,!1),t;case 1:return t=pu(t.type,!0),t;default:return""}}function od(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case ds:return"Fragment";case us:return"Portal";case rd:return"Profiler";case Ih:return"StrictMode";case sd:return"Suspense";case id:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case kv:return(t.displayName||"Context")+".Consumer";case Ev:return(t._context.displayName||"Context")+".Provider";case Th:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case bh:return e=t.displayName||null,e!==null?e:od(t.type)||"Memo";case Un:e=t._payload,t=t._init;try{return od(t(e))}catch{}}return null}function yE(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return od(e);case 8:return e===Ih?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function cr(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Nv(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function _E(t){var e=Nv(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),r=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var s=n.get,i=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return s.call(this)},set:function(o){r=""+o,i.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function va(t){t._valueTracker||(t._valueTracker=_E(t))}function Cv(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),r="";return t&&(r=Nv(t)?t.checked?"true":"false":t.value),t=r,t!==n?(e.setValue(t),!0):!1}function nl(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function ad(t,e){var n=e.checked;return ye({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function Em(t,e){var n=e.defaultValue==null?"":e.defaultValue,r=e.checked!=null?e.checked:e.defaultChecked;n=cr(e.value!=null?e.value:n),t._wrapperState={initialChecked:r,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function Iv(t,e){e=e.checked,e!=null&&Ch(t,"checked",e,!1)}function ld(t,e){Iv(t,e);var n=cr(e.value),r=e.type;if(n!=null)r==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(r==="submit"||r==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?cd(t,e.type,n):e.hasOwnProperty("defaultValue")&&cd(t,e.type,cr(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function km(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var r=e.type;if(!(r!=="submit"&&r!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function cd(t,e,n){(e!=="number"||nl(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var Oi=Array.isArray;function Ss(t,e,n,r){if(t=t.options,e){e={};for(var s=0;s<n.length;s++)e["$"+n[s]]=!0;for(n=0;n<t.length;n++)s=e.hasOwnProperty("$"+t[n].value),t[n].selected!==s&&(t[n].selected=s),s&&r&&(t[n].defaultSelected=!0)}else{for(n=""+cr(n),e=null,s=0;s<t.length;s++){if(t[s].value===n){t[s].selected=!0,r&&(t[s].defaultSelected=!0);return}e!==null||t[s].disabled||(e=t[s])}e!==null&&(e.selected=!0)}}function ud(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(D(91));return ye({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function Sm(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(D(92));if(Oi(n)){if(1<n.length)throw Error(D(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:cr(n)}}function Tv(t,e){var n=cr(e.value),r=cr(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),r!=null&&(t.defaultValue=""+r)}function Nm(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function bv(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function dd(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?bv(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var ya,Rv=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,r,s){MSApp.execUnsafeLocalFunction(function(){return t(e,n,r,s)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(ya=ya||document.createElement("div"),ya.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=ya.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function so(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var Ui={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},xE=["Webkit","ms","Moz","O"];Object.keys(Ui).forEach(function(t){xE.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),Ui[e]=Ui[t]})});function Pv(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||Ui.hasOwnProperty(t)&&Ui[t]?(""+e).trim():e+"px"}function Av(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var r=n.indexOf("--")===0,s=Pv(n,e[n],r);n==="float"&&(n="cssFloat"),r?t.setProperty(n,s):t[n]=s}}var wE=ye({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function hd(t,e){if(e){if(wE[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(D(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(D(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(D(61))}if(e.style!=null&&typeof e.style!="object")throw Error(D(62))}}function fd(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var pd=null;function Rh(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var md=null,Ns=null,Cs=null;function Cm(t){if(t=Fo(t)){if(typeof md!="function")throw Error(D(280));var e=t.stateNode;e&&(e=sc(e),md(t.stateNode,t.type,e))}}function jv(t){Ns?Cs?Cs.push(t):Cs=[t]:Ns=t}function Ov(){if(Ns){var t=Ns,e=Cs;if(Cs=Ns=null,Cm(t),e)for(t=0;t<e.length;t++)Cm(e[t])}}function Dv(t,e){return t(e)}function Lv(){}var mu=!1;function Mv(t,e,n){if(mu)return t(e,n);mu=!0;try{return Dv(t,e,n)}finally{mu=!1,(Ns!==null||Cs!==null)&&(Lv(),Ov())}}function io(t,e){var n=t.stateNode;if(n===null)return null;var r=sc(n);if(r===null)return null;n=r[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(t=t.type,r=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!r;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(D(231,e,typeof n));return n}var gd=!1;if(Sn)try{var wi={};Object.defineProperty(wi,"passive",{get:function(){gd=!0}}),window.addEventListener("test",wi,wi),window.removeEventListener("test",wi,wi)}catch{gd=!1}function EE(t,e,n,r,s,i,o,l,u){var h=Array.prototype.slice.call(arguments,3);try{e.apply(n,h)}catch(m){this.onError(m)}}var zi=!1,rl=null,sl=!1,vd=null,kE={onError:function(t){zi=!0,rl=t}};function SE(t,e,n,r,s,i,o,l,u){zi=!1,rl=null,EE.apply(kE,arguments)}function NE(t,e,n,r,s,i,o,l,u){if(SE.apply(this,arguments),zi){if(zi){var h=rl;zi=!1,rl=null}else throw Error(D(198));sl||(sl=!0,vd=h)}}function Kr(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function Fv(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Im(t){if(Kr(t)!==t)throw Error(D(188))}function CE(t){var e=t.alternate;if(!e){if(e=Kr(t),e===null)throw Error(D(188));return e!==t?null:t}for(var n=t,r=e;;){var s=n.return;if(s===null)break;var i=s.alternate;if(i===null){if(r=s.return,r!==null){n=r;continue}break}if(s.child===i.child){for(i=s.child;i;){if(i===n)return Im(s),t;if(i===r)return Im(s),e;i=i.sibling}throw Error(D(188))}if(n.return!==r.return)n=s,r=i;else{for(var o=!1,l=s.child;l;){if(l===n){o=!0,n=s,r=i;break}if(l===r){o=!0,r=s,n=i;break}l=l.sibling}if(!o){for(l=i.child;l;){if(l===n){o=!0,n=i,r=s;break}if(l===r){o=!0,r=i,n=s;break}l=l.sibling}if(!o)throw Error(D(189))}}if(n.alternate!==r)throw Error(D(190))}if(n.tag!==3)throw Error(D(188));return n.stateNode.current===n?t:e}function Uv(t){return t=CE(t),t!==null?zv(t):null}function zv(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=zv(t);if(e!==null)return e;t=t.sibling}return null}var Vv=Et.unstable_scheduleCallback,Tm=Et.unstable_cancelCallback,IE=Et.unstable_shouldYield,TE=Et.unstable_requestPaint,Se=Et.unstable_now,bE=Et.unstable_getCurrentPriorityLevel,Ph=Et.unstable_ImmediatePriority,$v=Et.unstable_UserBlockingPriority,il=Et.unstable_NormalPriority,RE=Et.unstable_LowPriority,Bv=Et.unstable_IdlePriority,ec=null,tn=null;function PE(t){if(tn&&typeof tn.onCommitFiberRoot=="function")try{tn.onCommitFiberRoot(ec,t,void 0,(t.current.flags&128)===128)}catch{}}var Bt=Math.clz32?Math.clz32:OE,AE=Math.log,jE=Math.LN2;function OE(t){return t>>>=0,t===0?32:31-(AE(t)/jE|0)|0}var _a=64,xa=4194304;function Di(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function ol(t,e){var n=t.pendingLanes;if(n===0)return 0;var r=0,s=t.suspendedLanes,i=t.pingedLanes,o=n&268435455;if(o!==0){var l=o&~s;l!==0?r=Di(l):(i&=o,i!==0&&(r=Di(i)))}else o=n&~s,o!==0?r=Di(o):i!==0&&(r=Di(i));if(r===0)return 0;if(e!==0&&e!==r&&!(e&s)&&(s=r&-r,i=e&-e,s>=i||s===16&&(i&4194240)!==0))return e;if(r&4&&(r|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=r;0<e;)n=31-Bt(e),s=1<<n,r|=t[n],e&=~s;return r}function DE(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function LE(t,e){for(var n=t.suspendedLanes,r=t.pingedLanes,s=t.expirationTimes,i=t.pendingLanes;0<i;){var o=31-Bt(i),l=1<<o,u=s[o];u===-1?(!(l&n)||l&r)&&(s[o]=DE(l,e)):u<=e&&(t.expiredLanes|=l),i&=~l}}function yd(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function Hv(){var t=_a;return _a<<=1,!(_a&4194240)&&(_a=64),t}function gu(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Lo(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-Bt(e),t[e]=n}function ME(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var r=t.eventTimes;for(t=t.expirationTimes;0<n;){var s=31-Bt(n),i=1<<s;e[s]=0,r[s]=-1,t[s]=-1,n&=~i}}function Ah(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var r=31-Bt(n),s=1<<r;s&e|t[r]&e&&(t[r]|=e),n&=~s}}var se=0;function Wv(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var Gv,jh,qv,Kv,Yv,_d=!1,wa=[],Qn=null,Xn=null,Jn=null,oo=new Map,ao=new Map,Vn=[],FE="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function bm(t,e){switch(t){case"focusin":case"focusout":Qn=null;break;case"dragenter":case"dragleave":Xn=null;break;case"mouseover":case"mouseout":Jn=null;break;case"pointerover":case"pointerout":oo.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":ao.delete(e.pointerId)}}function Ei(t,e,n,r,s,i){return t===null||t.nativeEvent!==i?(t={blockedOn:e,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[s]},e!==null&&(e=Fo(e),e!==null&&jh(e)),t):(t.eventSystemFlags|=r,e=t.targetContainers,s!==null&&e.indexOf(s)===-1&&e.push(s),t)}function UE(t,e,n,r,s){switch(e){case"focusin":return Qn=Ei(Qn,t,e,n,r,s),!0;case"dragenter":return Xn=Ei(Xn,t,e,n,r,s),!0;case"mouseover":return Jn=Ei(Jn,t,e,n,r,s),!0;case"pointerover":var i=s.pointerId;return oo.set(i,Ei(oo.get(i)||null,t,e,n,r,s)),!0;case"gotpointercapture":return i=s.pointerId,ao.set(i,Ei(ao.get(i)||null,t,e,n,r,s)),!0}return!1}function Qv(t){var e=Ir(t.target);if(e!==null){var n=Kr(e);if(n!==null){if(e=n.tag,e===13){if(e=Fv(n),e!==null){t.blockedOn=e,Yv(t.priority,function(){qv(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function za(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=xd(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var r=new n.constructor(n.type,n);pd=r,n.target.dispatchEvent(r),pd=null}else return e=Fo(n),e!==null&&jh(e),t.blockedOn=n,!1;e.shift()}return!0}function Rm(t,e,n){za(t)&&n.delete(e)}function zE(){_d=!1,Qn!==null&&za(Qn)&&(Qn=null),Xn!==null&&za(Xn)&&(Xn=null),Jn!==null&&za(Jn)&&(Jn=null),oo.forEach(Rm),ao.forEach(Rm)}function ki(t,e){t.blockedOn===e&&(t.blockedOn=null,_d||(_d=!0,Et.unstable_scheduleCallback(Et.unstable_NormalPriority,zE)))}function lo(t){function e(s){return ki(s,t)}if(0<wa.length){ki(wa[0],t);for(var n=1;n<wa.length;n++){var r=wa[n];r.blockedOn===t&&(r.blockedOn=null)}}for(Qn!==null&&ki(Qn,t),Xn!==null&&ki(Xn,t),Jn!==null&&ki(Jn,t),oo.forEach(e),ao.forEach(e),n=0;n<Vn.length;n++)r=Vn[n],r.blockedOn===t&&(r.blockedOn=null);for(;0<Vn.length&&(n=Vn[0],n.blockedOn===null);)Qv(n),n.blockedOn===null&&Vn.shift()}var Is=Pn.ReactCurrentBatchConfig,al=!0;function VE(t,e,n,r){var s=se,i=Is.transition;Is.transition=null;try{se=1,Oh(t,e,n,r)}finally{se=s,Is.transition=i}}function $E(t,e,n,r){var s=se,i=Is.transition;Is.transition=null;try{se=4,Oh(t,e,n,r)}finally{se=s,Is.transition=i}}function Oh(t,e,n,r){if(al){var s=xd(t,e,n,r);if(s===null)Cu(t,e,r,ll,n),bm(t,r);else if(UE(s,t,e,n,r))r.stopPropagation();else if(bm(t,r),e&4&&-1<FE.indexOf(t)){for(;s!==null;){var i=Fo(s);if(i!==null&&Gv(i),i=xd(t,e,n,r),i===null&&Cu(t,e,r,ll,n),i===s)break;s=i}s!==null&&r.stopPropagation()}else Cu(t,e,r,null,n)}}var ll=null;function xd(t,e,n,r){if(ll=null,t=Rh(r),t=Ir(t),t!==null)if(e=Kr(t),e===null)t=null;else if(n=e.tag,n===13){if(t=Fv(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return ll=t,null}function Xv(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(bE()){case Ph:return 1;case $v:return 4;case il:case RE:return 16;case Bv:return 536870912;default:return 16}default:return 16}}var qn=null,Dh=null,Va=null;function Jv(){if(Va)return Va;var t,e=Dh,n=e.length,r,s="value"in qn?qn.value:qn.textContent,i=s.length;for(t=0;t<n&&e[t]===s[t];t++);var o=n-t;for(r=1;r<=o&&e[n-r]===s[i-r];r++);return Va=s.slice(t,1<r?1-r:void 0)}function $a(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Ea(){return!0}function Pm(){return!1}function St(t){function e(n,r,s,i,o){this._reactName=n,this._targetInst=s,this.type=r,this.nativeEvent=i,this.target=o,this.currentTarget=null;for(var l in t)t.hasOwnProperty(l)&&(n=t[l],this[l]=n?n(i):i[l]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Ea:Pm,this.isPropagationStopped=Pm,this}return ye(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Ea)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Ea)},persist:function(){},isPersistent:Ea}),e}var Zs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Lh=St(Zs),Mo=ye({},Zs,{view:0,detail:0}),BE=St(Mo),vu,yu,Si,tc=ye({},Mo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Mh,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Si&&(Si&&t.type==="mousemove"?(vu=t.screenX-Si.screenX,yu=t.screenY-Si.screenY):yu=vu=0,Si=t),vu)},movementY:function(t){return"movementY"in t?t.movementY:yu}}),Am=St(tc),HE=ye({},tc,{dataTransfer:0}),WE=St(HE),GE=ye({},Mo,{relatedTarget:0}),_u=St(GE),qE=ye({},Zs,{animationName:0,elapsedTime:0,pseudoElement:0}),KE=St(qE),YE=ye({},Zs,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),QE=St(YE),XE=ye({},Zs,{data:0}),jm=St(XE),JE={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},ZE={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},ek={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function tk(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=ek[t])?!!e[t]:!1}function Mh(){return tk}var nk=ye({},Mo,{key:function(t){if(t.key){var e=JE[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=$a(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?ZE[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Mh,charCode:function(t){return t.type==="keypress"?$a(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?$a(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),rk=St(nk),sk=ye({},tc,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Om=St(sk),ik=ye({},Mo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Mh}),ok=St(ik),ak=ye({},Zs,{propertyName:0,elapsedTime:0,pseudoElement:0}),lk=St(ak),ck=ye({},tc,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),uk=St(ck),dk=[9,13,27,32],Fh=Sn&&"CompositionEvent"in window,Vi=null;Sn&&"documentMode"in document&&(Vi=document.documentMode);var hk=Sn&&"TextEvent"in window&&!Vi,Zv=Sn&&(!Fh||Vi&&8<Vi&&11>=Vi),Dm=" ",Lm=!1;function ey(t,e){switch(t){case"keyup":return dk.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function ty(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var hs=!1;function fk(t,e){switch(t){case"compositionend":return ty(e);case"keypress":return e.which!==32?null:(Lm=!0,Dm);case"textInput":return t=e.data,t===Dm&&Lm?null:t;default:return null}}function pk(t,e){if(hs)return t==="compositionend"||!Fh&&ey(t,e)?(t=Jv(),Va=Dh=qn=null,hs=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Zv&&e.locale!=="ko"?null:e.data;default:return null}}var mk={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Mm(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!mk[t.type]:e==="textarea"}function ny(t,e,n,r){jv(r),e=cl(e,"onChange"),0<e.length&&(n=new Lh("onChange","change",null,n,r),t.push({event:n,listeners:e}))}var $i=null,co=null;function gk(t){fy(t,0)}function nc(t){var e=ms(t);if(Cv(e))return t}function vk(t,e){if(t==="change")return e}var ry=!1;if(Sn){var xu;if(Sn){var wu="oninput"in document;if(!wu){var Fm=document.createElement("div");Fm.setAttribute("oninput","return;"),wu=typeof Fm.oninput=="function"}xu=wu}else xu=!1;ry=xu&&(!document.documentMode||9<document.documentMode)}function Um(){$i&&($i.detachEvent("onpropertychange",sy),co=$i=null)}function sy(t){if(t.propertyName==="value"&&nc(co)){var e=[];ny(e,co,t,Rh(t)),Mv(gk,e)}}function yk(t,e,n){t==="focusin"?(Um(),$i=e,co=n,$i.attachEvent("onpropertychange",sy)):t==="focusout"&&Um()}function _k(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return nc(co)}function xk(t,e){if(t==="click")return nc(e)}function wk(t,e){if(t==="input"||t==="change")return nc(e)}function Ek(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Gt=typeof Object.is=="function"?Object.is:Ek;function uo(t,e){if(Gt(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),r=Object.keys(e);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var s=n[r];if(!nd.call(e,s)||!Gt(t[s],e[s]))return!1}return!0}function zm(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Vm(t,e){var n=zm(t);t=0;for(var r;n;){if(n.nodeType===3){if(r=t+n.textContent.length,t<=e&&r>=e)return{node:n,offset:e-t};t=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=zm(n)}}function iy(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?iy(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function oy(){for(var t=window,e=nl();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=nl(t.document)}return e}function Uh(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function kk(t){var e=oy(),n=t.focusedElem,r=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&iy(n.ownerDocument.documentElement,n)){if(r!==null&&Uh(n)){if(e=r.start,t=r.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var s=n.textContent.length,i=Math.min(r.start,s);r=r.end===void 0?i:Math.min(r.end,s),!t.extend&&i>r&&(s=r,r=i,i=s),s=Vm(n,i);var o=Vm(n,r);s&&o&&(t.rangeCount!==1||t.anchorNode!==s.node||t.anchorOffset!==s.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(s.node,s.offset),t.removeAllRanges(),i>r?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var Sk=Sn&&"documentMode"in document&&11>=document.documentMode,fs=null,wd=null,Bi=null,Ed=!1;function $m(t,e,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Ed||fs==null||fs!==nl(r)||(r=fs,"selectionStart"in r&&Uh(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Bi&&uo(Bi,r)||(Bi=r,r=cl(wd,"onSelect"),0<r.length&&(e=new Lh("onSelect","select",null,e,n),t.push({event:e,listeners:r}),e.target=fs)))}function ka(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var ps={animationend:ka("Animation","AnimationEnd"),animationiteration:ka("Animation","AnimationIteration"),animationstart:ka("Animation","AnimationStart"),transitionend:ka("Transition","TransitionEnd")},Eu={},ay={};Sn&&(ay=document.createElement("div").style,"AnimationEvent"in window||(delete ps.animationend.animation,delete ps.animationiteration.animation,delete ps.animationstart.animation),"TransitionEvent"in window||delete ps.transitionend.transition);function rc(t){if(Eu[t])return Eu[t];if(!ps[t])return t;var e=ps[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in ay)return Eu[t]=e[n];return t}var ly=rc("animationend"),cy=rc("animationiteration"),uy=rc("animationstart"),dy=rc("transitionend"),hy=new Map,Bm="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function pr(t,e){hy.set(t,e),qr(e,[t])}for(var ku=0;ku<Bm.length;ku++){var Su=Bm[ku],Nk=Su.toLowerCase(),Ck=Su[0].toUpperCase()+Su.slice(1);pr(Nk,"on"+Ck)}pr(ly,"onAnimationEnd");pr(cy,"onAnimationIteration");pr(uy,"onAnimationStart");pr("dblclick","onDoubleClick");pr("focusin","onFocus");pr("focusout","onBlur");pr(dy,"onTransitionEnd");Ds("onMouseEnter",["mouseout","mouseover"]);Ds("onMouseLeave",["mouseout","mouseover"]);Ds("onPointerEnter",["pointerout","pointerover"]);Ds("onPointerLeave",["pointerout","pointerover"]);qr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));qr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));qr("onBeforeInput",["compositionend","keypress","textInput","paste"]);qr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));qr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));qr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Li="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Ik=new Set("cancel close invalid load scroll toggle".split(" ").concat(Li));function Hm(t,e,n){var r=t.type||"unknown-event";t.currentTarget=n,NE(r,e,void 0,t),t.currentTarget=null}function fy(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var r=t[n],s=r.event;r=r.listeners;e:{var i=void 0;if(e)for(var o=r.length-1;0<=o;o--){var l=r[o],u=l.instance,h=l.currentTarget;if(l=l.listener,u!==i&&s.isPropagationStopped())break e;Hm(s,l,h),i=u}else for(o=0;o<r.length;o++){if(l=r[o],u=l.instance,h=l.currentTarget,l=l.listener,u!==i&&s.isPropagationStopped())break e;Hm(s,l,h),i=u}}}if(sl)throw t=vd,sl=!1,vd=null,t}function he(t,e){var n=e[Id];n===void 0&&(n=e[Id]=new Set);var r=t+"__bubble";n.has(r)||(py(e,t,2,!1),n.add(r))}function Nu(t,e,n){var r=0;e&&(r|=4),py(n,t,r,e)}var Sa="_reactListening"+Math.random().toString(36).slice(2);function ho(t){if(!t[Sa]){t[Sa]=!0,wv.forEach(function(n){n!=="selectionchange"&&(Ik.has(n)||Nu(n,!1,t),Nu(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Sa]||(e[Sa]=!0,Nu("selectionchange",!1,e))}}function py(t,e,n,r){switch(Xv(e)){case 1:var s=VE;break;case 4:s=$E;break;default:s=Oh}n=s.bind(null,e,n,t),s=void 0,!gd||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(s=!0),r?s!==void 0?t.addEventListener(e,n,{capture:!0,passive:s}):t.addEventListener(e,n,!0):s!==void 0?t.addEventListener(e,n,{passive:s}):t.addEventListener(e,n,!1)}function Cu(t,e,n,r,s){var i=r;if(!(e&1)&&!(e&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var l=r.stateNode.containerInfo;if(l===s||l.nodeType===8&&l.parentNode===s)break;if(o===4)for(o=r.return;o!==null;){var u=o.tag;if((u===3||u===4)&&(u=o.stateNode.containerInfo,u===s||u.nodeType===8&&u.parentNode===s))return;o=o.return}for(;l!==null;){if(o=Ir(l),o===null)return;if(u=o.tag,u===5||u===6){r=i=o;continue e}l=l.parentNode}}r=r.return}Mv(function(){var h=i,m=Rh(n),p=[];e:{var v=hy.get(t);if(v!==void 0){var T=Lh,I=t;switch(t){case"keypress":if($a(n)===0)break e;case"keydown":case"keyup":T=rk;break;case"focusin":I="focus",T=_u;break;case"focusout":I="blur",T=_u;break;case"beforeblur":case"afterblur":T=_u;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":T=Am;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":T=WE;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":T=ok;break;case ly:case cy:case uy:T=KE;break;case dy:T=lk;break;case"scroll":T=BE;break;case"wheel":T=uk;break;case"copy":case"cut":case"paste":T=QE;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":T=Om}var A=(e&4)!==0,O=!A&&t==="scroll",S=A?v!==null?v+"Capture":null:v;A=[];for(var E=h,C;E!==null;){C=E;var j=C.stateNode;if(C.tag===5&&j!==null&&(C=j,S!==null&&(j=io(E,S),j!=null&&A.push(fo(E,j,C)))),O)break;E=E.return}0<A.length&&(v=new T(v,I,null,n,m),p.push({event:v,listeners:A}))}}if(!(e&7)){e:{if(v=t==="mouseover"||t==="pointerover",T=t==="mouseout"||t==="pointerout",v&&n!==pd&&(I=n.relatedTarget||n.fromElement)&&(Ir(I)||I[Nn]))break e;if((T||v)&&(v=m.window===m?m:(v=m.ownerDocument)?v.defaultView||v.parentWindow:window,T?(I=n.relatedTarget||n.toElement,T=h,I=I?Ir(I):null,I!==null&&(O=Kr(I),I!==O||I.tag!==5&&I.tag!==6)&&(I=null)):(T=null,I=h),T!==I)){if(A=Am,j="onMouseLeave",S="onMouseEnter",E="mouse",(t==="pointerout"||t==="pointerover")&&(A=Om,j="onPointerLeave",S="onPointerEnter",E="pointer"),O=T==null?v:ms(T),C=I==null?v:ms(I),v=new A(j,E+"leave",T,n,m),v.target=O,v.relatedTarget=C,j=null,Ir(m)===h&&(A=new A(S,E+"enter",I,n,m),A.target=C,A.relatedTarget=O,j=A),O=j,T&&I)t:{for(A=T,S=I,E=0,C=A;C;C=is(C))E++;for(C=0,j=S;j;j=is(j))C++;for(;0<E-C;)A=is(A),E--;for(;0<C-E;)S=is(S),C--;for(;E--;){if(A===S||S!==null&&A===S.alternate)break t;A=is(A),S=is(S)}A=null}else A=null;T!==null&&Wm(p,v,T,A,!1),I!==null&&O!==null&&Wm(p,O,I,A,!0)}}e:{if(v=h?ms(h):window,T=v.nodeName&&v.nodeName.toLowerCase(),T==="select"||T==="input"&&v.type==="file")var L=vk;else if(Mm(v))if(ry)L=wk;else{L=_k;var M=yk}else(T=v.nodeName)&&T.toLowerCase()==="input"&&(v.type==="checkbox"||v.type==="radio")&&(L=xk);if(L&&(L=L(t,h))){ny(p,L,n,m);break e}M&&M(t,v,h),t==="focusout"&&(M=v._wrapperState)&&M.controlled&&v.type==="number"&&cd(v,"number",v.value)}switch(M=h?ms(h):window,t){case"focusin":(Mm(M)||M.contentEditable==="true")&&(fs=M,wd=h,Bi=null);break;case"focusout":Bi=wd=fs=null;break;case"mousedown":Ed=!0;break;case"contextmenu":case"mouseup":case"dragend":Ed=!1,$m(p,n,m);break;case"selectionchange":if(Sk)break;case"keydown":case"keyup":$m(p,n,m)}var x;if(Fh)e:{switch(t){case"compositionstart":var y="onCompositionStart";break e;case"compositionend":y="onCompositionEnd";break e;case"compositionupdate":y="onCompositionUpdate";break e}y=void 0}else hs?ey(t,n)&&(y="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(y="onCompositionStart");y&&(Zv&&n.locale!=="ko"&&(hs||y!=="onCompositionStart"?y==="onCompositionEnd"&&hs&&(x=Jv()):(qn=m,Dh="value"in qn?qn.value:qn.textContent,hs=!0)),M=cl(h,y),0<M.length&&(y=new jm(y,t,null,n,m),p.push({event:y,listeners:M}),x?y.data=x:(x=ty(n),x!==null&&(y.data=x)))),(x=hk?fk(t,n):pk(t,n))&&(h=cl(h,"onBeforeInput"),0<h.length&&(m=new jm("onBeforeInput","beforeinput",null,n,m),p.push({event:m,listeners:h}),m.data=x))}fy(p,e)})}function fo(t,e,n){return{instance:t,listener:e,currentTarget:n}}function cl(t,e){for(var n=e+"Capture",r=[];t!==null;){var s=t,i=s.stateNode;s.tag===5&&i!==null&&(s=i,i=io(t,n),i!=null&&r.unshift(fo(t,i,s)),i=io(t,e),i!=null&&r.push(fo(t,i,s))),t=t.return}return r}function is(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function Wm(t,e,n,r,s){for(var i=e._reactName,o=[];n!==null&&n!==r;){var l=n,u=l.alternate,h=l.stateNode;if(u!==null&&u===r)break;l.tag===5&&h!==null&&(l=h,s?(u=io(n,i),u!=null&&o.unshift(fo(n,u,l))):s||(u=io(n,i),u!=null&&o.push(fo(n,u,l)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var Tk=/\r\n?/g,bk=/\u0000|\uFFFD/g;function Gm(t){return(typeof t=="string"?t:""+t).replace(Tk,`
`).replace(bk,"")}function Na(t,e,n){if(e=Gm(e),Gm(t)!==e&&n)throw Error(D(425))}function ul(){}var kd=null,Sd=null;function Nd(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Cd=typeof setTimeout=="function"?setTimeout:void 0,Rk=typeof clearTimeout=="function"?clearTimeout:void 0,qm=typeof Promise=="function"?Promise:void 0,Pk=typeof queueMicrotask=="function"?queueMicrotask:typeof qm<"u"?function(t){return qm.resolve(null).then(t).catch(Ak)}:Cd;function Ak(t){setTimeout(function(){throw t})}function Iu(t,e){var n=e,r=0;do{var s=n.nextSibling;if(t.removeChild(n),s&&s.nodeType===8)if(n=s.data,n==="/$"){if(r===0){t.removeChild(s),lo(e);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=s}while(n);lo(e)}function Zn(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function Km(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var ei=Math.random().toString(36).slice(2),Zt="__reactFiber$"+ei,po="__reactProps$"+ei,Nn="__reactContainer$"+ei,Id="__reactEvents$"+ei,jk="__reactListeners$"+ei,Ok="__reactHandles$"+ei;function Ir(t){var e=t[Zt];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Nn]||n[Zt]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=Km(t);t!==null;){if(n=t[Zt])return n;t=Km(t)}return e}t=n,n=t.parentNode}return null}function Fo(t){return t=t[Zt]||t[Nn],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function ms(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(D(33))}function sc(t){return t[po]||null}var Td=[],gs=-1;function mr(t){return{current:t}}function fe(t){0>gs||(t.current=Td[gs],Td[gs]=null,gs--)}function ue(t,e){gs++,Td[gs]=t.current,t.current=e}var ur={},Qe=mr(ur),ht=mr(!1),Or=ur;function Ls(t,e){var n=t.type.contextTypes;if(!n)return ur;var r=t.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===e)return r.__reactInternalMemoizedMaskedChildContext;var s={},i;for(i in n)s[i]=e[i];return r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=s),s}function ft(t){return t=t.childContextTypes,t!=null}function dl(){fe(ht),fe(Qe)}function Ym(t,e,n){if(Qe.current!==ur)throw Error(D(168));ue(Qe,e),ue(ht,n)}function my(t,e,n){var r=t.stateNode;if(e=e.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var s in r)if(!(s in e))throw Error(D(108,yE(t)||"Unknown",s));return ye({},n,r)}function hl(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||ur,Or=Qe.current,ue(Qe,t),ue(ht,ht.current),!0}function Qm(t,e,n){var r=t.stateNode;if(!r)throw Error(D(169));n?(t=my(t,e,Or),r.__reactInternalMemoizedMergedChildContext=t,fe(ht),fe(Qe),ue(Qe,t)):fe(ht),ue(ht,n)}var pn=null,ic=!1,Tu=!1;function gy(t){pn===null?pn=[t]:pn.push(t)}function Dk(t){ic=!0,gy(t)}function gr(){if(!Tu&&pn!==null){Tu=!0;var t=0,e=se;try{var n=pn;for(se=1;t<n.length;t++){var r=n[t];do r=r(!0);while(r!==null)}pn=null,ic=!1}catch(s){throw pn!==null&&(pn=pn.slice(t+1)),Vv(Ph,gr),s}finally{se=e,Tu=!1}}return null}var vs=[],ys=0,fl=null,pl=0,Ct=[],It=0,Dr=null,mn=1,gn="";function kr(t,e){vs[ys++]=pl,vs[ys++]=fl,fl=t,pl=e}function vy(t,e,n){Ct[It++]=mn,Ct[It++]=gn,Ct[It++]=Dr,Dr=t;var r=mn;t=gn;var s=32-Bt(r)-1;r&=~(1<<s),n+=1;var i=32-Bt(e)+s;if(30<i){var o=s-s%5;i=(r&(1<<o)-1).toString(32),r>>=o,s-=o,mn=1<<32-Bt(e)+s|n<<s|r,gn=i+t}else mn=1<<i|n<<s|r,gn=t}function zh(t){t.return!==null&&(kr(t,1),vy(t,1,0))}function Vh(t){for(;t===fl;)fl=vs[--ys],vs[ys]=null,pl=vs[--ys],vs[ys]=null;for(;t===Dr;)Dr=Ct[--It],Ct[It]=null,gn=Ct[--It],Ct[It]=null,mn=Ct[--It],Ct[It]=null}var xt=null,_t=null,pe=!1,Ut=null;function yy(t,e){var n=Tt(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function Xm(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,xt=t,_t=Zn(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,xt=t,_t=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Dr!==null?{id:mn,overflow:gn}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Tt(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,xt=t,_t=null,!0):!1;default:return!1}}function bd(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Rd(t){if(pe){var e=_t;if(e){var n=e;if(!Xm(t,e)){if(bd(t))throw Error(D(418));e=Zn(n.nextSibling);var r=xt;e&&Xm(t,e)?yy(r,n):(t.flags=t.flags&-4097|2,pe=!1,xt=t)}}else{if(bd(t))throw Error(D(418));t.flags=t.flags&-4097|2,pe=!1,xt=t}}}function Jm(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;xt=t}function Ca(t){if(t!==xt)return!1;if(!pe)return Jm(t),pe=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Nd(t.type,t.memoizedProps)),e&&(e=_t)){if(bd(t))throw _y(),Error(D(418));for(;e;)yy(t,e),e=Zn(e.nextSibling)}if(Jm(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(D(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){_t=Zn(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}_t=null}}else _t=xt?Zn(t.stateNode.nextSibling):null;return!0}function _y(){for(var t=_t;t;)t=Zn(t.nextSibling)}function Ms(){_t=xt=null,pe=!1}function $h(t){Ut===null?Ut=[t]:Ut.push(t)}var Lk=Pn.ReactCurrentBatchConfig;function Ni(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(D(309));var r=n.stateNode}if(!r)throw Error(D(147,t));var s=r,i=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===i?e.ref:(e=function(o){var l=s.refs;o===null?delete l[i]:l[i]=o},e._stringRef=i,e)}if(typeof t!="string")throw Error(D(284));if(!n._owner)throw Error(D(290,t))}return t}function Ia(t,e){throw t=Object.prototype.toString.call(e),Error(D(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function Zm(t){var e=t._init;return e(t._payload)}function xy(t){function e(S,E){if(t){var C=S.deletions;C===null?(S.deletions=[E],S.flags|=16):C.push(E)}}function n(S,E){if(!t)return null;for(;E!==null;)e(S,E),E=E.sibling;return null}function r(S,E){for(S=new Map;E!==null;)E.key!==null?S.set(E.key,E):S.set(E.index,E),E=E.sibling;return S}function s(S,E){return S=rr(S,E),S.index=0,S.sibling=null,S}function i(S,E,C){return S.index=C,t?(C=S.alternate,C!==null?(C=C.index,C<E?(S.flags|=2,E):C):(S.flags|=2,E)):(S.flags|=1048576,E)}function o(S){return t&&S.alternate===null&&(S.flags|=2),S}function l(S,E,C,j){return E===null||E.tag!==6?(E=Du(C,S.mode,j),E.return=S,E):(E=s(E,C),E.return=S,E)}function u(S,E,C,j){var L=C.type;return L===ds?m(S,E,C.props.children,j,C.key):E!==null&&(E.elementType===L||typeof L=="object"&&L!==null&&L.$$typeof===Un&&Zm(L)===E.type)?(j=s(E,C.props),j.ref=Ni(S,E,C),j.return=S,j):(j=Ya(C.type,C.key,C.props,null,S.mode,j),j.ref=Ni(S,E,C),j.return=S,j)}function h(S,E,C,j){return E===null||E.tag!==4||E.stateNode.containerInfo!==C.containerInfo||E.stateNode.implementation!==C.implementation?(E=Lu(C,S.mode,j),E.return=S,E):(E=s(E,C.children||[]),E.return=S,E)}function m(S,E,C,j,L){return E===null||E.tag!==7?(E=jr(C,S.mode,j,L),E.return=S,E):(E=s(E,C),E.return=S,E)}function p(S,E,C){if(typeof E=="string"&&E!==""||typeof E=="number")return E=Du(""+E,S.mode,C),E.return=S,E;if(typeof E=="object"&&E!==null){switch(E.$$typeof){case ga:return C=Ya(E.type,E.key,E.props,null,S.mode,C),C.ref=Ni(S,null,E),C.return=S,C;case us:return E=Lu(E,S.mode,C),E.return=S,E;case Un:var j=E._init;return p(S,j(E._payload),C)}if(Oi(E)||xi(E))return E=jr(E,S.mode,C,null),E.return=S,E;Ia(S,E)}return null}function v(S,E,C,j){var L=E!==null?E.key:null;if(typeof C=="string"&&C!==""||typeof C=="number")return L!==null?null:l(S,E,""+C,j);if(typeof C=="object"&&C!==null){switch(C.$$typeof){case ga:return C.key===L?u(S,E,C,j):null;case us:return C.key===L?h(S,E,C,j):null;case Un:return L=C._init,v(S,E,L(C._payload),j)}if(Oi(C)||xi(C))return L!==null?null:m(S,E,C,j,null);Ia(S,C)}return null}function T(S,E,C,j,L){if(typeof j=="string"&&j!==""||typeof j=="number")return S=S.get(C)||null,l(E,S,""+j,L);if(typeof j=="object"&&j!==null){switch(j.$$typeof){case ga:return S=S.get(j.key===null?C:j.key)||null,u(E,S,j,L);case us:return S=S.get(j.key===null?C:j.key)||null,h(E,S,j,L);case Un:var M=j._init;return T(S,E,C,M(j._payload),L)}if(Oi(j)||xi(j))return S=S.get(C)||null,m(E,S,j,L,null);Ia(E,j)}return null}function I(S,E,C,j){for(var L=null,M=null,x=E,y=E=0,_=null;x!==null&&y<C.length;y++){x.index>y?(_=x,x=null):_=x.sibling;var k=v(S,x,C[y],j);if(k===null){x===null&&(x=_);break}t&&x&&k.alternate===null&&e(S,x),E=i(k,E,y),M===null?L=k:M.sibling=k,M=k,x=_}if(y===C.length)return n(S,x),pe&&kr(S,y),L;if(x===null){for(;y<C.length;y++)x=p(S,C[y],j),x!==null&&(E=i(x,E,y),M===null?L=x:M.sibling=x,M=x);return pe&&kr(S,y),L}for(x=r(S,x);y<C.length;y++)_=T(x,S,y,C[y],j),_!==null&&(t&&_.alternate!==null&&x.delete(_.key===null?y:_.key),E=i(_,E,y),M===null?L=_:M.sibling=_,M=_);return t&&x.forEach(function(N){return e(S,N)}),pe&&kr(S,y),L}function A(S,E,C,j){var L=xi(C);if(typeof L!="function")throw Error(D(150));if(C=L.call(C),C==null)throw Error(D(151));for(var M=L=null,x=E,y=E=0,_=null,k=C.next();x!==null&&!k.done;y++,k=C.next()){x.index>y?(_=x,x=null):_=x.sibling;var N=v(S,x,k.value,j);if(N===null){x===null&&(x=_);break}t&&x&&N.alternate===null&&e(S,x),E=i(N,E,y),M===null?L=N:M.sibling=N,M=N,x=_}if(k.done)return n(S,x),pe&&kr(S,y),L;if(x===null){for(;!k.done;y++,k=C.next())k=p(S,k.value,j),k!==null&&(E=i(k,E,y),M===null?L=k:M.sibling=k,M=k);return pe&&kr(S,y),L}for(x=r(S,x);!k.done;y++,k=C.next())k=T(x,S,y,k.value,j),k!==null&&(t&&k.alternate!==null&&x.delete(k.key===null?y:k.key),E=i(k,E,y),M===null?L=k:M.sibling=k,M=k);return t&&x.forEach(function(b){return e(S,b)}),pe&&kr(S,y),L}function O(S,E,C,j){if(typeof C=="object"&&C!==null&&C.type===ds&&C.key===null&&(C=C.props.children),typeof C=="object"&&C!==null){switch(C.$$typeof){case ga:e:{for(var L=C.key,M=E;M!==null;){if(M.key===L){if(L=C.type,L===ds){if(M.tag===7){n(S,M.sibling),E=s(M,C.props.children),E.return=S,S=E;break e}}else if(M.elementType===L||typeof L=="object"&&L!==null&&L.$$typeof===Un&&Zm(L)===M.type){n(S,M.sibling),E=s(M,C.props),E.ref=Ni(S,M,C),E.return=S,S=E;break e}n(S,M);break}else e(S,M);M=M.sibling}C.type===ds?(E=jr(C.props.children,S.mode,j,C.key),E.return=S,S=E):(j=Ya(C.type,C.key,C.props,null,S.mode,j),j.ref=Ni(S,E,C),j.return=S,S=j)}return o(S);case us:e:{for(M=C.key;E!==null;){if(E.key===M)if(E.tag===4&&E.stateNode.containerInfo===C.containerInfo&&E.stateNode.implementation===C.implementation){n(S,E.sibling),E=s(E,C.children||[]),E.return=S,S=E;break e}else{n(S,E);break}else e(S,E);E=E.sibling}E=Lu(C,S.mode,j),E.return=S,S=E}return o(S);case Un:return M=C._init,O(S,E,M(C._payload),j)}if(Oi(C))return I(S,E,C,j);if(xi(C))return A(S,E,C,j);Ia(S,C)}return typeof C=="string"&&C!==""||typeof C=="number"?(C=""+C,E!==null&&E.tag===6?(n(S,E.sibling),E=s(E,C),E.return=S,S=E):(n(S,E),E=Du(C,S.mode,j),E.return=S,S=E),o(S)):n(S,E)}return O}var Fs=xy(!0),wy=xy(!1),ml=mr(null),gl=null,_s=null,Bh=null;function Hh(){Bh=_s=gl=null}function Wh(t){var e=ml.current;fe(ml),t._currentValue=e}function Pd(t,e,n){for(;t!==null;){var r=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,r!==null&&(r.childLanes|=e)):r!==null&&(r.childLanes&e)!==e&&(r.childLanes|=e),t===n)break;t=t.return}}function Ts(t,e){gl=t,Bh=_s=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(ut=!0),t.firstContext=null)}function Pt(t){var e=t._currentValue;if(Bh!==t)if(t={context:t,memoizedValue:e,next:null},_s===null){if(gl===null)throw Error(D(308));_s=t,gl.dependencies={lanes:0,firstContext:t}}else _s=_s.next=t;return e}var Tr=null;function Gh(t){Tr===null?Tr=[t]:Tr.push(t)}function Ey(t,e,n,r){var s=e.interleaved;return s===null?(n.next=n,Gh(e)):(n.next=s.next,s.next=n),e.interleaved=n,Cn(t,r)}function Cn(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var zn=!1;function qh(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function ky(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function wn(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function er(t,e,n){var r=t.updateQueue;if(r===null)return null;if(r=r.shared,ee&2){var s=r.pending;return s===null?e.next=e:(e.next=s.next,s.next=e),r.pending=e,Cn(t,n)}return s=r.interleaved,s===null?(e.next=e,Gh(r)):(e.next=s.next,s.next=e),r.interleaved=e,Cn(t,n)}function Ba(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,Ah(t,n)}}function eg(t,e){var n=t.updateQueue,r=t.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var s=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?s=i=o:i=i.next=o,n=n.next}while(n!==null);i===null?s=i=e:i=i.next=e}else s=i=e;n={baseState:r.baseState,firstBaseUpdate:s,lastBaseUpdate:i,shared:r.shared,effects:r.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function vl(t,e,n,r){var s=t.updateQueue;zn=!1;var i=s.firstBaseUpdate,o=s.lastBaseUpdate,l=s.shared.pending;if(l!==null){s.shared.pending=null;var u=l,h=u.next;u.next=null,o===null?i=h:o.next=h,o=u;var m=t.alternate;m!==null&&(m=m.updateQueue,l=m.lastBaseUpdate,l!==o&&(l===null?m.firstBaseUpdate=h:l.next=h,m.lastBaseUpdate=u))}if(i!==null){var p=s.baseState;o=0,m=h=u=null,l=i;do{var v=l.lane,T=l.eventTime;if((r&v)===v){m!==null&&(m=m.next={eventTime:T,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var I=t,A=l;switch(v=e,T=n,A.tag){case 1:if(I=A.payload,typeof I=="function"){p=I.call(T,p,v);break e}p=I;break e;case 3:I.flags=I.flags&-65537|128;case 0:if(I=A.payload,v=typeof I=="function"?I.call(T,p,v):I,v==null)break e;p=ye({},p,v);break e;case 2:zn=!0}}l.callback!==null&&l.lane!==0&&(t.flags|=64,v=s.effects,v===null?s.effects=[l]:v.push(l))}else T={eventTime:T,lane:v,tag:l.tag,payload:l.payload,callback:l.callback,next:null},m===null?(h=m=T,u=p):m=m.next=T,o|=v;if(l=l.next,l===null){if(l=s.shared.pending,l===null)break;v=l,l=v.next,v.next=null,s.lastBaseUpdate=v,s.shared.pending=null}}while(!0);if(m===null&&(u=p),s.baseState=u,s.firstBaseUpdate=h,s.lastBaseUpdate=m,e=s.shared.interleaved,e!==null){s=e;do o|=s.lane,s=s.next;while(s!==e)}else i===null&&(s.shared.lanes=0);Mr|=o,t.lanes=o,t.memoizedState=p}}function tg(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var r=t[e],s=r.callback;if(s!==null){if(r.callback=null,r=n,typeof s!="function")throw Error(D(191,s));s.call(r)}}}var Uo={},nn=mr(Uo),mo=mr(Uo),go=mr(Uo);function br(t){if(t===Uo)throw Error(D(174));return t}function Kh(t,e){switch(ue(go,e),ue(mo,t),ue(nn,Uo),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:dd(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=dd(e,t)}fe(nn),ue(nn,e)}function Us(){fe(nn),fe(mo),fe(go)}function Sy(t){br(go.current);var e=br(nn.current),n=dd(e,t.type);e!==n&&(ue(mo,t),ue(nn,n))}function Yh(t){mo.current===t&&(fe(nn),fe(mo))}var ge=mr(0);function yl(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var bu=[];function Qh(){for(var t=0;t<bu.length;t++)bu[t]._workInProgressVersionPrimary=null;bu.length=0}var Ha=Pn.ReactCurrentDispatcher,Ru=Pn.ReactCurrentBatchConfig,Lr=0,ve=null,Ce=null,Pe=null,_l=!1,Hi=!1,vo=0,Mk=0;function qe(){throw Error(D(321))}function Xh(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!Gt(t[n],e[n]))return!1;return!0}function Jh(t,e,n,r,s,i){if(Lr=i,ve=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Ha.current=t===null||t.memoizedState===null?Vk:$k,t=n(r,s),Hi){i=0;do{if(Hi=!1,vo=0,25<=i)throw Error(D(301));i+=1,Pe=Ce=null,e.updateQueue=null,Ha.current=Bk,t=n(r,s)}while(Hi)}if(Ha.current=xl,e=Ce!==null&&Ce.next!==null,Lr=0,Pe=Ce=ve=null,_l=!1,e)throw Error(D(300));return t}function Zh(){var t=vo!==0;return vo=0,t}function Jt(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Pe===null?ve.memoizedState=Pe=t:Pe=Pe.next=t,Pe}function At(){if(Ce===null){var t=ve.alternate;t=t!==null?t.memoizedState:null}else t=Ce.next;var e=Pe===null?ve.memoizedState:Pe.next;if(e!==null)Pe=e,Ce=t;else{if(t===null)throw Error(D(310));Ce=t,t={memoizedState:Ce.memoizedState,baseState:Ce.baseState,baseQueue:Ce.baseQueue,queue:Ce.queue,next:null},Pe===null?ve.memoizedState=Pe=t:Pe=Pe.next=t}return Pe}function yo(t,e){return typeof e=="function"?e(t):e}function Pu(t){var e=At(),n=e.queue;if(n===null)throw Error(D(311));n.lastRenderedReducer=t;var r=Ce,s=r.baseQueue,i=n.pending;if(i!==null){if(s!==null){var o=s.next;s.next=i.next,i.next=o}r.baseQueue=s=i,n.pending=null}if(s!==null){i=s.next,r=r.baseState;var l=o=null,u=null,h=i;do{var m=h.lane;if((Lr&m)===m)u!==null&&(u=u.next={lane:0,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null}),r=h.hasEagerState?h.eagerState:t(r,h.action);else{var p={lane:m,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null};u===null?(l=u=p,o=r):u=u.next=p,ve.lanes|=m,Mr|=m}h=h.next}while(h!==null&&h!==i);u===null?o=r:u.next=l,Gt(r,e.memoizedState)||(ut=!0),e.memoizedState=r,e.baseState=o,e.baseQueue=u,n.lastRenderedState=r}if(t=n.interleaved,t!==null){s=t;do i=s.lane,ve.lanes|=i,Mr|=i,s=s.next;while(s!==t)}else s===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function Au(t){var e=At(),n=e.queue;if(n===null)throw Error(D(311));n.lastRenderedReducer=t;var r=n.dispatch,s=n.pending,i=e.memoizedState;if(s!==null){n.pending=null;var o=s=s.next;do i=t(i,o.action),o=o.next;while(o!==s);Gt(i,e.memoizedState)||(ut=!0),e.memoizedState=i,e.baseQueue===null&&(e.baseState=i),n.lastRenderedState=i}return[i,r]}function Ny(){}function Cy(t,e){var n=ve,r=At(),s=e(),i=!Gt(r.memoizedState,s);if(i&&(r.memoizedState=s,ut=!0),r=r.queue,ef(by.bind(null,n,r,t),[t]),r.getSnapshot!==e||i||Pe!==null&&Pe.memoizedState.tag&1){if(n.flags|=2048,_o(9,Ty.bind(null,n,r,s,e),void 0,null),je===null)throw Error(D(349));Lr&30||Iy(n,e,s)}return s}function Iy(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=ve.updateQueue,e===null?(e={lastEffect:null,stores:null},ve.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function Ty(t,e,n,r){e.value=n,e.getSnapshot=r,Ry(e)&&Py(t)}function by(t,e,n){return n(function(){Ry(e)&&Py(t)})}function Ry(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!Gt(t,n)}catch{return!0}}function Py(t){var e=Cn(t,1);e!==null&&Ht(e,t,1,-1)}function ng(t){var e=Jt();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:yo,lastRenderedState:t},e.queue=t,t=t.dispatch=zk.bind(null,ve,t),[e.memoizedState,t]}function _o(t,e,n,r){return t={tag:t,create:e,destroy:n,deps:r,next:null},e=ve.updateQueue,e===null?(e={lastEffect:null,stores:null},ve.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(r=n.next,n.next=t,t.next=r,e.lastEffect=t)),t}function Ay(){return At().memoizedState}function Wa(t,e,n,r){var s=Jt();ve.flags|=t,s.memoizedState=_o(1|e,n,void 0,r===void 0?null:r)}function oc(t,e,n,r){var s=At();r=r===void 0?null:r;var i=void 0;if(Ce!==null){var o=Ce.memoizedState;if(i=o.destroy,r!==null&&Xh(r,o.deps)){s.memoizedState=_o(e,n,i,r);return}}ve.flags|=t,s.memoizedState=_o(1|e,n,i,r)}function rg(t,e){return Wa(8390656,8,t,e)}function ef(t,e){return oc(2048,8,t,e)}function jy(t,e){return oc(4,2,t,e)}function Oy(t,e){return oc(4,4,t,e)}function Dy(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Ly(t,e,n){return n=n!=null?n.concat([t]):null,oc(4,4,Dy.bind(null,e,t),n)}function tf(){}function My(t,e){var n=At();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&Xh(e,r[1])?r[0]:(n.memoizedState=[t,e],t)}function Fy(t,e){var n=At();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&Xh(e,r[1])?r[0]:(t=t(),n.memoizedState=[t,e],t)}function Uy(t,e,n){return Lr&21?(Gt(n,e)||(n=Hv(),ve.lanes|=n,Mr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,ut=!0),t.memoizedState=n)}function Fk(t,e){var n=se;se=n!==0&&4>n?n:4,t(!0);var r=Ru.transition;Ru.transition={};try{t(!1),e()}finally{se=n,Ru.transition=r}}function zy(){return At().memoizedState}function Uk(t,e,n){var r=nr(t);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Vy(t))$y(e,n);else if(n=Ey(t,e,n,r),n!==null){var s=nt();Ht(n,t,r,s),By(n,e,r)}}function zk(t,e,n){var r=nr(t),s={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Vy(t))$y(e,s);else{var i=t.alternate;if(t.lanes===0&&(i===null||i.lanes===0)&&(i=e.lastRenderedReducer,i!==null))try{var o=e.lastRenderedState,l=i(o,n);if(s.hasEagerState=!0,s.eagerState=l,Gt(l,o)){var u=e.interleaved;u===null?(s.next=s,Gh(e)):(s.next=u.next,u.next=s),e.interleaved=s;return}}catch{}finally{}n=Ey(t,e,s,r),n!==null&&(s=nt(),Ht(n,t,r,s),By(n,e,r))}}function Vy(t){var e=t.alternate;return t===ve||e!==null&&e===ve}function $y(t,e){Hi=_l=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function By(t,e,n){if(n&4194240){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,Ah(t,n)}}var xl={readContext:Pt,useCallback:qe,useContext:qe,useEffect:qe,useImperativeHandle:qe,useInsertionEffect:qe,useLayoutEffect:qe,useMemo:qe,useReducer:qe,useRef:qe,useState:qe,useDebugValue:qe,useDeferredValue:qe,useTransition:qe,useMutableSource:qe,useSyncExternalStore:qe,useId:qe,unstable_isNewReconciler:!1},Vk={readContext:Pt,useCallback:function(t,e){return Jt().memoizedState=[t,e===void 0?null:e],t},useContext:Pt,useEffect:rg,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,Wa(4194308,4,Dy.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Wa(4194308,4,t,e)},useInsertionEffect:function(t,e){return Wa(4,2,t,e)},useMemo:function(t,e){var n=Jt();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var r=Jt();return e=n!==void 0?n(e):e,r.memoizedState=r.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},r.queue=t,t=t.dispatch=Uk.bind(null,ve,t),[r.memoizedState,t]},useRef:function(t){var e=Jt();return t={current:t},e.memoizedState=t},useState:ng,useDebugValue:tf,useDeferredValue:function(t){return Jt().memoizedState=t},useTransition:function(){var t=ng(!1),e=t[0];return t=Fk.bind(null,t[1]),Jt().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var r=ve,s=Jt();if(pe){if(n===void 0)throw Error(D(407));n=n()}else{if(n=e(),je===null)throw Error(D(349));Lr&30||Iy(r,e,n)}s.memoizedState=n;var i={value:n,getSnapshot:e};return s.queue=i,rg(by.bind(null,r,i,t),[t]),r.flags|=2048,_o(9,Ty.bind(null,r,i,n,e),void 0,null),n},useId:function(){var t=Jt(),e=je.identifierPrefix;if(pe){var n=gn,r=mn;n=(r&~(1<<32-Bt(r)-1)).toString(32)+n,e=":"+e+"R"+n,n=vo++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=Mk++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},$k={readContext:Pt,useCallback:My,useContext:Pt,useEffect:ef,useImperativeHandle:Ly,useInsertionEffect:jy,useLayoutEffect:Oy,useMemo:Fy,useReducer:Pu,useRef:Ay,useState:function(){return Pu(yo)},useDebugValue:tf,useDeferredValue:function(t){var e=At();return Uy(e,Ce.memoizedState,t)},useTransition:function(){var t=Pu(yo)[0],e=At().memoizedState;return[t,e]},useMutableSource:Ny,useSyncExternalStore:Cy,useId:zy,unstable_isNewReconciler:!1},Bk={readContext:Pt,useCallback:My,useContext:Pt,useEffect:ef,useImperativeHandle:Ly,useInsertionEffect:jy,useLayoutEffect:Oy,useMemo:Fy,useReducer:Au,useRef:Ay,useState:function(){return Au(yo)},useDebugValue:tf,useDeferredValue:function(t){var e=At();return Ce===null?e.memoizedState=t:Uy(e,Ce.memoizedState,t)},useTransition:function(){var t=Au(yo)[0],e=At().memoizedState;return[t,e]},useMutableSource:Ny,useSyncExternalStore:Cy,useId:zy,unstable_isNewReconciler:!1};function Mt(t,e){if(t&&t.defaultProps){e=ye({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function Ad(t,e,n,r){e=t.memoizedState,n=n(r,e),n=n==null?e:ye({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var ac={isMounted:function(t){return(t=t._reactInternals)?Kr(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var r=nt(),s=nr(t),i=wn(r,s);i.payload=e,n!=null&&(i.callback=n),e=er(t,i,s),e!==null&&(Ht(e,t,s,r),Ba(e,t,s))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var r=nt(),s=nr(t),i=wn(r,s);i.tag=1,i.payload=e,n!=null&&(i.callback=n),e=er(t,i,s),e!==null&&(Ht(e,t,s,r),Ba(e,t,s))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=nt(),r=nr(t),s=wn(n,r);s.tag=2,e!=null&&(s.callback=e),e=er(t,s,r),e!==null&&(Ht(e,t,r,n),Ba(e,t,r))}};function sg(t,e,n,r,s,i,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(r,i,o):e.prototype&&e.prototype.isPureReactComponent?!uo(n,r)||!uo(s,i):!0}function Hy(t,e,n){var r=!1,s=ur,i=e.contextType;return typeof i=="object"&&i!==null?i=Pt(i):(s=ft(e)?Or:Qe.current,r=e.contextTypes,i=(r=r!=null)?Ls(t,s):ur),e=new e(n,i),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=ac,t.stateNode=e,e._reactInternals=t,r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=s,t.__reactInternalMemoizedMaskedChildContext=i),e}function ig(t,e,n,r){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,r),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,r),e.state!==t&&ac.enqueueReplaceState(e,e.state,null)}function jd(t,e,n,r){var s=t.stateNode;s.props=n,s.state=t.memoizedState,s.refs={},qh(t);var i=e.contextType;typeof i=="object"&&i!==null?s.context=Pt(i):(i=ft(e)?Or:Qe.current,s.context=Ls(t,i)),s.state=t.memoizedState,i=e.getDerivedStateFromProps,typeof i=="function"&&(Ad(t,e,i,n),s.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(e=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),e!==s.state&&ac.enqueueReplaceState(s,s.state,null),vl(t,n,s,r),s.state=t.memoizedState),typeof s.componentDidMount=="function"&&(t.flags|=4194308)}function zs(t,e){try{var n="",r=e;do n+=vE(r),r=r.return;while(r);var s=n}catch(i){s=`
Error generating stack: `+i.message+`
`+i.stack}return{value:t,source:e,stack:s,digest:null}}function ju(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function Od(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var Hk=typeof WeakMap=="function"?WeakMap:Map;function Wy(t,e,n){n=wn(-1,n),n.tag=3,n.payload={element:null};var r=e.value;return n.callback=function(){El||(El=!0,Hd=r),Od(t,e)},n}function Gy(t,e,n){n=wn(-1,n),n.tag=3;var r=t.type.getDerivedStateFromError;if(typeof r=="function"){var s=e.value;n.payload=function(){return r(s)},n.callback=function(){Od(t,e)}}var i=t.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){Od(t,e),typeof r!="function"&&(tr===null?tr=new Set([this]):tr.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function og(t,e,n){var r=t.pingCache;if(r===null){r=t.pingCache=new Hk;var s=new Set;r.set(e,s)}else s=r.get(e),s===void 0&&(s=new Set,r.set(e,s));s.has(n)||(s.add(n),t=sS.bind(null,t,e,n),e.then(t,t))}function ag(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function lg(t,e,n,r,s){return t.mode&1?(t.flags|=65536,t.lanes=s,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=wn(-1,1),e.tag=2,er(n,e,1))),n.lanes|=1),t)}var Wk=Pn.ReactCurrentOwner,ut=!1;function Ze(t,e,n,r){e.child=t===null?wy(e,null,n,r):Fs(e,t.child,n,r)}function cg(t,e,n,r,s){n=n.render;var i=e.ref;return Ts(e,s),r=Jh(t,e,n,r,i,s),n=Zh(),t!==null&&!ut?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~s,In(t,e,s)):(pe&&n&&zh(e),e.flags|=1,Ze(t,e,r,s),e.child)}function ug(t,e,n,r,s){if(t===null){var i=n.type;return typeof i=="function"&&!uf(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=i,qy(t,e,i,r,s)):(t=Ya(n.type,null,r,e,e.mode,s),t.ref=e.ref,t.return=e,e.child=t)}if(i=t.child,!(t.lanes&s)){var o=i.memoizedProps;if(n=n.compare,n=n!==null?n:uo,n(o,r)&&t.ref===e.ref)return In(t,e,s)}return e.flags|=1,t=rr(i,r),t.ref=e.ref,t.return=e,e.child=t}function qy(t,e,n,r,s){if(t!==null){var i=t.memoizedProps;if(uo(i,r)&&t.ref===e.ref)if(ut=!1,e.pendingProps=r=i,(t.lanes&s)!==0)t.flags&131072&&(ut=!0);else return e.lanes=t.lanes,In(t,e,s)}return Dd(t,e,n,r,s)}function Ky(t,e,n){var r=e.pendingProps,s=r.children,i=t!==null?t.memoizedState:null;if(r.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},ue(ws,yt),yt|=n;else{if(!(n&1073741824))return t=i!==null?i.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,ue(ws,yt),yt|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=i!==null?i.baseLanes:n,ue(ws,yt),yt|=r}else i!==null?(r=i.baseLanes|n,e.memoizedState=null):r=n,ue(ws,yt),yt|=r;return Ze(t,e,s,n),e.child}function Yy(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function Dd(t,e,n,r,s){var i=ft(n)?Or:Qe.current;return i=Ls(e,i),Ts(e,s),n=Jh(t,e,n,r,i,s),r=Zh(),t!==null&&!ut?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~s,In(t,e,s)):(pe&&r&&zh(e),e.flags|=1,Ze(t,e,n,s),e.child)}function dg(t,e,n,r,s){if(ft(n)){var i=!0;hl(e)}else i=!1;if(Ts(e,s),e.stateNode===null)Ga(t,e),Hy(e,n,r),jd(e,n,r,s),r=!0;else if(t===null){var o=e.stateNode,l=e.memoizedProps;o.props=l;var u=o.context,h=n.contextType;typeof h=="object"&&h!==null?h=Pt(h):(h=ft(n)?Or:Qe.current,h=Ls(e,h));var m=n.getDerivedStateFromProps,p=typeof m=="function"||typeof o.getSnapshotBeforeUpdate=="function";p||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==r||u!==h)&&ig(e,o,r,h),zn=!1;var v=e.memoizedState;o.state=v,vl(e,r,o,s),u=e.memoizedState,l!==r||v!==u||ht.current||zn?(typeof m=="function"&&(Ad(e,n,m,r),u=e.memoizedState),(l=zn||sg(e,n,l,r,v,u,h))?(p||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=r,e.memoizedState=u),o.props=r,o.state=u,o.context=h,r=l):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),r=!1)}else{o=e.stateNode,ky(t,e),l=e.memoizedProps,h=e.type===e.elementType?l:Mt(e.type,l),o.props=h,p=e.pendingProps,v=o.context,u=n.contextType,typeof u=="object"&&u!==null?u=Pt(u):(u=ft(n)?Or:Qe.current,u=Ls(e,u));var T=n.getDerivedStateFromProps;(m=typeof T=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==p||v!==u)&&ig(e,o,r,u),zn=!1,v=e.memoizedState,o.state=v,vl(e,r,o,s);var I=e.memoizedState;l!==p||v!==I||ht.current||zn?(typeof T=="function"&&(Ad(e,n,T,r),I=e.memoizedState),(h=zn||sg(e,n,h,r,v,I,u)||!1)?(m||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,I,u),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,I,u)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&v===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&v===t.memoizedState||(e.flags|=1024),e.memoizedProps=r,e.memoizedState=I),o.props=r,o.state=I,o.context=u,r=h):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&v===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&v===t.memoizedState||(e.flags|=1024),r=!1)}return Ld(t,e,n,r,i,s)}function Ld(t,e,n,r,s,i){Yy(t,e);var o=(e.flags&128)!==0;if(!r&&!o)return s&&Qm(e,n,!1),In(t,e,i);r=e.stateNode,Wk.current=e;var l=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return e.flags|=1,t!==null&&o?(e.child=Fs(e,t.child,null,i),e.child=Fs(e,null,l,i)):Ze(t,e,l,i),e.memoizedState=r.state,s&&Qm(e,n,!0),e.child}function Qy(t){var e=t.stateNode;e.pendingContext?Ym(t,e.pendingContext,e.pendingContext!==e.context):e.context&&Ym(t,e.context,!1),Kh(t,e.containerInfo)}function hg(t,e,n,r,s){return Ms(),$h(s),e.flags|=256,Ze(t,e,n,r),e.child}var Md={dehydrated:null,treeContext:null,retryLane:0};function Fd(t){return{baseLanes:t,cachePool:null,transitions:null}}function Xy(t,e,n){var r=e.pendingProps,s=ge.current,i=!1,o=(e.flags&128)!==0,l;if((l=o)||(l=t!==null&&t.memoizedState===null?!1:(s&2)!==0),l?(i=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(s|=1),ue(ge,s&1),t===null)return Rd(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=r.children,t=r.fallback,i?(r=e.mode,i=e.child,o={mode:"hidden",children:o},!(r&1)&&i!==null?(i.childLanes=0,i.pendingProps=o):i=uc(o,r,0,null),t=jr(t,r,n,null),i.return=e,t.return=e,i.sibling=t,e.child=i,e.child.memoizedState=Fd(n),e.memoizedState=Md,t):nf(e,o));if(s=t.memoizedState,s!==null&&(l=s.dehydrated,l!==null))return Gk(t,e,o,r,l,s,n);if(i){i=r.fallback,o=e.mode,s=t.child,l=s.sibling;var u={mode:"hidden",children:r.children};return!(o&1)&&e.child!==s?(r=e.child,r.childLanes=0,r.pendingProps=u,e.deletions=null):(r=rr(s,u),r.subtreeFlags=s.subtreeFlags&14680064),l!==null?i=rr(l,i):(i=jr(i,o,n,null),i.flags|=2),i.return=e,r.return=e,r.sibling=i,e.child=r,r=i,i=e.child,o=t.child.memoizedState,o=o===null?Fd(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},i.memoizedState=o,i.childLanes=t.childLanes&~n,e.memoizedState=Md,r}return i=t.child,t=i.sibling,r=rr(i,{mode:"visible",children:r.children}),!(e.mode&1)&&(r.lanes=n),r.return=e,r.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=r,e.memoizedState=null,r}function nf(t,e){return e=uc({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function Ta(t,e,n,r){return r!==null&&$h(r),Fs(e,t.child,null,n),t=nf(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function Gk(t,e,n,r,s,i,o){if(n)return e.flags&256?(e.flags&=-257,r=ju(Error(D(422))),Ta(t,e,o,r)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(i=r.fallback,s=e.mode,r=uc({mode:"visible",children:r.children},s,0,null),i=jr(i,s,o,null),i.flags|=2,r.return=e,i.return=e,r.sibling=i,e.child=r,e.mode&1&&Fs(e,t.child,null,o),e.child.memoizedState=Fd(o),e.memoizedState=Md,i);if(!(e.mode&1))return Ta(t,e,o,null);if(s.data==="$!"){if(r=s.nextSibling&&s.nextSibling.dataset,r)var l=r.dgst;return r=l,i=Error(D(419)),r=ju(i,r,void 0),Ta(t,e,o,r)}if(l=(o&t.childLanes)!==0,ut||l){if(r=je,r!==null){switch(o&-o){case 4:s=2;break;case 16:s=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:s=32;break;case 536870912:s=268435456;break;default:s=0}s=s&(r.suspendedLanes|o)?0:s,s!==0&&s!==i.retryLane&&(i.retryLane=s,Cn(t,s),Ht(r,t,s,-1))}return cf(),r=ju(Error(D(421))),Ta(t,e,o,r)}return s.data==="$?"?(e.flags|=128,e.child=t.child,e=iS.bind(null,t),s._reactRetry=e,null):(t=i.treeContext,_t=Zn(s.nextSibling),xt=e,pe=!0,Ut=null,t!==null&&(Ct[It++]=mn,Ct[It++]=gn,Ct[It++]=Dr,mn=t.id,gn=t.overflow,Dr=e),e=nf(e,r.children),e.flags|=4096,e)}function fg(t,e,n){t.lanes|=e;var r=t.alternate;r!==null&&(r.lanes|=e),Pd(t.return,e,n)}function Ou(t,e,n,r,s){var i=t.memoizedState;i===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:s}:(i.isBackwards=e,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=s)}function Jy(t,e,n){var r=e.pendingProps,s=r.revealOrder,i=r.tail;if(Ze(t,e,r.children,n),r=ge.current,r&2)r=r&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&fg(t,n,e);else if(t.tag===19)fg(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}r&=1}if(ue(ge,r),!(e.mode&1))e.memoizedState=null;else switch(s){case"forwards":for(n=e.child,s=null;n!==null;)t=n.alternate,t!==null&&yl(t)===null&&(s=n),n=n.sibling;n=s,n===null?(s=e.child,e.child=null):(s=n.sibling,n.sibling=null),Ou(e,!1,s,n,i);break;case"backwards":for(n=null,s=e.child,e.child=null;s!==null;){if(t=s.alternate,t!==null&&yl(t)===null){e.child=s;break}t=s.sibling,s.sibling=n,n=s,s=t}Ou(e,!0,n,null,i);break;case"together":Ou(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function Ga(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function In(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Mr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(D(153));if(e.child!==null){for(t=e.child,n=rr(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=rr(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function qk(t,e,n){switch(e.tag){case 3:Qy(e),Ms();break;case 5:Sy(e);break;case 1:ft(e.type)&&hl(e);break;case 4:Kh(e,e.stateNode.containerInfo);break;case 10:var r=e.type._context,s=e.memoizedProps.value;ue(ml,r._currentValue),r._currentValue=s;break;case 13:if(r=e.memoizedState,r!==null)return r.dehydrated!==null?(ue(ge,ge.current&1),e.flags|=128,null):n&e.child.childLanes?Xy(t,e,n):(ue(ge,ge.current&1),t=In(t,e,n),t!==null?t.sibling:null);ue(ge,ge.current&1);break;case 19:if(r=(n&e.childLanes)!==0,t.flags&128){if(r)return Jy(t,e,n);e.flags|=128}if(s=e.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),ue(ge,ge.current),r)break;return null;case 22:case 23:return e.lanes=0,Ky(t,e,n)}return In(t,e,n)}var Zy,Ud,e_,t_;Zy=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Ud=function(){};e_=function(t,e,n,r){var s=t.memoizedProps;if(s!==r){t=e.stateNode,br(nn.current);var i=null;switch(n){case"input":s=ad(t,s),r=ad(t,r),i=[];break;case"select":s=ye({},s,{value:void 0}),r=ye({},r,{value:void 0}),i=[];break;case"textarea":s=ud(t,s),r=ud(t,r),i=[];break;default:typeof s.onClick!="function"&&typeof r.onClick=="function"&&(t.onclick=ul)}hd(n,r);var o;n=null;for(h in s)if(!r.hasOwnProperty(h)&&s.hasOwnProperty(h)&&s[h]!=null)if(h==="style"){var l=s[h];for(o in l)l.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else h!=="dangerouslySetInnerHTML"&&h!=="children"&&h!=="suppressContentEditableWarning"&&h!=="suppressHydrationWarning"&&h!=="autoFocus"&&(ro.hasOwnProperty(h)?i||(i=[]):(i=i||[]).push(h,null));for(h in r){var u=r[h];if(l=s!=null?s[h]:void 0,r.hasOwnProperty(h)&&u!==l&&(u!=null||l!=null))if(h==="style")if(l){for(o in l)!l.hasOwnProperty(o)||u&&u.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in u)u.hasOwnProperty(o)&&l[o]!==u[o]&&(n||(n={}),n[o]=u[o])}else n||(i||(i=[]),i.push(h,n)),n=u;else h==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,l=l?l.__html:void 0,u!=null&&l!==u&&(i=i||[]).push(h,u)):h==="children"?typeof u!="string"&&typeof u!="number"||(i=i||[]).push(h,""+u):h!=="suppressContentEditableWarning"&&h!=="suppressHydrationWarning"&&(ro.hasOwnProperty(h)?(u!=null&&h==="onScroll"&&he("scroll",t),i||l===u||(i=[])):(i=i||[]).push(h,u))}n&&(i=i||[]).push("style",n);var h=i;(e.updateQueue=h)&&(e.flags|=4)}};t_=function(t,e,n,r){n!==r&&(e.flags|=4)};function Ci(t,e){if(!pe)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:r.sibling=null}}function Ke(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,r=0;if(e)for(var s=t.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags&14680064,r|=s.flags&14680064,s.return=t,s=s.sibling;else for(s=t.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags,r|=s.flags,s.return=t,s=s.sibling;return t.subtreeFlags|=r,t.childLanes=n,e}function Kk(t,e,n){var r=e.pendingProps;switch(Vh(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ke(e),null;case 1:return ft(e.type)&&dl(),Ke(e),null;case 3:return r=e.stateNode,Us(),fe(ht),fe(Qe),Qh(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(t===null||t.child===null)&&(Ca(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Ut!==null&&(qd(Ut),Ut=null))),Ud(t,e),Ke(e),null;case 5:Yh(e);var s=br(go.current);if(n=e.type,t!==null&&e.stateNode!=null)e_(t,e,n,r,s),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!r){if(e.stateNode===null)throw Error(D(166));return Ke(e),null}if(t=br(nn.current),Ca(e)){r=e.stateNode,n=e.type;var i=e.memoizedProps;switch(r[Zt]=e,r[po]=i,t=(e.mode&1)!==0,n){case"dialog":he("cancel",r),he("close",r);break;case"iframe":case"object":case"embed":he("load",r);break;case"video":case"audio":for(s=0;s<Li.length;s++)he(Li[s],r);break;case"source":he("error",r);break;case"img":case"image":case"link":he("error",r),he("load",r);break;case"details":he("toggle",r);break;case"input":Em(r,i),he("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},he("invalid",r);break;case"textarea":Sm(r,i),he("invalid",r)}hd(n,i),s=null;for(var o in i)if(i.hasOwnProperty(o)){var l=i[o];o==="children"?typeof l=="string"?r.textContent!==l&&(i.suppressHydrationWarning!==!0&&Na(r.textContent,l,t),s=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(i.suppressHydrationWarning!==!0&&Na(r.textContent,l,t),s=["children",""+l]):ro.hasOwnProperty(o)&&l!=null&&o==="onScroll"&&he("scroll",r)}switch(n){case"input":va(r),km(r,i,!0);break;case"textarea":va(r),Nm(r);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(r.onclick=ul)}r=s,e.updateQueue=r,r!==null&&(e.flags|=4)}else{o=s.nodeType===9?s:s.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=bv(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof r.is=="string"?t=o.createElement(n,{is:r.is}):(t=o.createElement(n),n==="select"&&(o=t,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):t=o.createElementNS(t,n),t[Zt]=e,t[po]=r,Zy(t,e,!1,!1),e.stateNode=t;e:{switch(o=fd(n,r),n){case"dialog":he("cancel",t),he("close",t),s=r;break;case"iframe":case"object":case"embed":he("load",t),s=r;break;case"video":case"audio":for(s=0;s<Li.length;s++)he(Li[s],t);s=r;break;case"source":he("error",t),s=r;break;case"img":case"image":case"link":he("error",t),he("load",t),s=r;break;case"details":he("toggle",t),s=r;break;case"input":Em(t,r),s=ad(t,r),he("invalid",t);break;case"option":s=r;break;case"select":t._wrapperState={wasMultiple:!!r.multiple},s=ye({},r,{value:void 0}),he("invalid",t);break;case"textarea":Sm(t,r),s=ud(t,r),he("invalid",t);break;default:s=r}hd(n,s),l=s;for(i in l)if(l.hasOwnProperty(i)){var u=l[i];i==="style"?Av(t,u):i==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&Rv(t,u)):i==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&so(t,u):typeof u=="number"&&so(t,""+u):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(ro.hasOwnProperty(i)?u!=null&&i==="onScroll"&&he("scroll",t):u!=null&&Ch(t,i,u,o))}switch(n){case"input":va(t),km(t,r,!1);break;case"textarea":va(t),Nm(t);break;case"option":r.value!=null&&t.setAttribute("value",""+cr(r.value));break;case"select":t.multiple=!!r.multiple,i=r.value,i!=null?Ss(t,!!r.multiple,i,!1):r.defaultValue!=null&&Ss(t,!!r.multiple,r.defaultValue,!0);break;default:typeof s.onClick=="function"&&(t.onclick=ul)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Ke(e),null;case 6:if(t&&e.stateNode!=null)t_(t,e,t.memoizedProps,r);else{if(typeof r!="string"&&e.stateNode===null)throw Error(D(166));if(n=br(go.current),br(nn.current),Ca(e)){if(r=e.stateNode,n=e.memoizedProps,r[Zt]=e,(i=r.nodeValue!==n)&&(t=xt,t!==null))switch(t.tag){case 3:Na(r.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&Na(r.nodeValue,n,(t.mode&1)!==0)}i&&(e.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[Zt]=e,e.stateNode=r}return Ke(e),null;case 13:if(fe(ge),r=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(pe&&_t!==null&&e.mode&1&&!(e.flags&128))_y(),Ms(),e.flags|=98560,i=!1;else if(i=Ca(e),r!==null&&r.dehydrated!==null){if(t===null){if(!i)throw Error(D(318));if(i=e.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(D(317));i[Zt]=e}else Ms(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Ke(e),i=!1}else Ut!==null&&(qd(Ut),Ut=null),i=!0;if(!i)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(r=r!==null,r!==(t!==null&&t.memoizedState!==null)&&r&&(e.child.flags|=8192,e.mode&1&&(t===null||ge.current&1?be===0&&(be=3):cf())),e.updateQueue!==null&&(e.flags|=4),Ke(e),null);case 4:return Us(),Ud(t,e),t===null&&ho(e.stateNode.containerInfo),Ke(e),null;case 10:return Wh(e.type._context),Ke(e),null;case 17:return ft(e.type)&&dl(),Ke(e),null;case 19:if(fe(ge),i=e.memoizedState,i===null)return Ke(e),null;if(r=(e.flags&128)!==0,o=i.rendering,o===null)if(r)Ci(i,!1);else{if(be!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=yl(t),o!==null){for(e.flags|=128,Ci(i,!1),r=o.updateQueue,r!==null&&(e.updateQueue=r,e.flags|=4),e.subtreeFlags=0,r=n,n=e.child;n!==null;)i=n,t=r,i.flags&=14680066,o=i.alternate,o===null?(i.childLanes=0,i.lanes=t,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=o.childLanes,i.lanes=o.lanes,i.child=o.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=o.memoizedProps,i.memoizedState=o.memoizedState,i.updateQueue=o.updateQueue,i.type=o.type,t=o.dependencies,i.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return ue(ge,ge.current&1|2),e.child}t=t.sibling}i.tail!==null&&Se()>Vs&&(e.flags|=128,r=!0,Ci(i,!1),e.lanes=4194304)}else{if(!r)if(t=yl(o),t!==null){if(e.flags|=128,r=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),Ci(i,!0),i.tail===null&&i.tailMode==="hidden"&&!o.alternate&&!pe)return Ke(e),null}else 2*Se()-i.renderingStartTime>Vs&&n!==1073741824&&(e.flags|=128,r=!0,Ci(i,!1),e.lanes=4194304);i.isBackwards?(o.sibling=e.child,e.child=o):(n=i.last,n!==null?n.sibling=o:e.child=o,i.last=o)}return i.tail!==null?(e=i.tail,i.rendering=e,i.tail=e.sibling,i.renderingStartTime=Se(),e.sibling=null,n=ge.current,ue(ge,r?n&1|2:n&1),e):(Ke(e),null);case 22:case 23:return lf(),r=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==r&&(e.flags|=8192),r&&e.mode&1?yt&1073741824&&(Ke(e),e.subtreeFlags&6&&(e.flags|=8192)):Ke(e),null;case 24:return null;case 25:return null}throw Error(D(156,e.tag))}function Yk(t,e){switch(Vh(e),e.tag){case 1:return ft(e.type)&&dl(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Us(),fe(ht),fe(Qe),Qh(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return Yh(e),null;case 13:if(fe(ge),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(D(340));Ms()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return fe(ge),null;case 4:return Us(),null;case 10:return Wh(e.type._context),null;case 22:case 23:return lf(),null;case 24:return null;default:return null}}var ba=!1,Ye=!1,Qk=typeof WeakSet=="function"?WeakSet:Set,V=null;function xs(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){_e(t,e,r)}else n.current=null}function zd(t,e,n){try{n()}catch(r){_e(t,e,r)}}var pg=!1;function Xk(t,e){if(kd=al,t=oy(),Uh(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var s=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var o=0,l=-1,u=-1,h=0,m=0,p=t,v=null;t:for(;;){for(var T;p!==n||s!==0&&p.nodeType!==3||(l=o+s),p!==i||r!==0&&p.nodeType!==3||(u=o+r),p.nodeType===3&&(o+=p.nodeValue.length),(T=p.firstChild)!==null;)v=p,p=T;for(;;){if(p===t)break t;if(v===n&&++h===s&&(l=o),v===i&&++m===r&&(u=o),(T=p.nextSibling)!==null)break;p=v,v=p.parentNode}p=T}n=l===-1||u===-1?null:{start:l,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(Sd={focusedElem:t,selectionRange:n},al=!1,V=e;V!==null;)if(e=V,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,V=t;else for(;V!==null;){e=V;try{var I=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(I!==null){var A=I.memoizedProps,O=I.memoizedState,S=e.stateNode,E=S.getSnapshotBeforeUpdate(e.elementType===e.type?A:Mt(e.type,A),O);S.__reactInternalSnapshotBeforeUpdate=E}break;case 3:var C=e.stateNode.containerInfo;C.nodeType===1?C.textContent="":C.nodeType===9&&C.documentElement&&C.removeChild(C.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(D(163))}}catch(j){_e(e,e.return,j)}if(t=e.sibling,t!==null){t.return=e.return,V=t;break}V=e.return}return I=pg,pg=!1,I}function Wi(t,e,n){var r=e.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var s=r=r.next;do{if((s.tag&t)===t){var i=s.destroy;s.destroy=void 0,i!==void 0&&zd(e,n,i)}s=s.next}while(s!==r)}}function lc(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var r=n.create;n.destroy=r()}n=n.next}while(n!==e)}}function Vd(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function n_(t){var e=t.alternate;e!==null&&(t.alternate=null,n_(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[Zt],delete e[po],delete e[Id],delete e[jk],delete e[Ok])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function r_(t){return t.tag===5||t.tag===3||t.tag===4}function mg(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||r_(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function $d(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=ul));else if(r!==4&&(t=t.child,t!==null))for($d(t,e,n),t=t.sibling;t!==null;)$d(t,e,n),t=t.sibling}function Bd(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(r!==4&&(t=t.child,t!==null))for(Bd(t,e,n),t=t.sibling;t!==null;)Bd(t,e,n),t=t.sibling}var Le=null,Ft=!1;function Mn(t,e,n){for(n=n.child;n!==null;)s_(t,e,n),n=n.sibling}function s_(t,e,n){if(tn&&typeof tn.onCommitFiberUnmount=="function")try{tn.onCommitFiberUnmount(ec,n)}catch{}switch(n.tag){case 5:Ye||xs(n,e);case 6:var r=Le,s=Ft;Le=null,Mn(t,e,n),Le=r,Ft=s,Le!==null&&(Ft?(t=Le,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Le.removeChild(n.stateNode));break;case 18:Le!==null&&(Ft?(t=Le,n=n.stateNode,t.nodeType===8?Iu(t.parentNode,n):t.nodeType===1&&Iu(t,n),lo(t)):Iu(Le,n.stateNode));break;case 4:r=Le,s=Ft,Le=n.stateNode.containerInfo,Ft=!0,Mn(t,e,n),Le=r,Ft=s;break;case 0:case 11:case 14:case 15:if(!Ye&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){s=r=r.next;do{var i=s,o=i.destroy;i=i.tag,o!==void 0&&(i&2||i&4)&&zd(n,e,o),s=s.next}while(s!==r)}Mn(t,e,n);break;case 1:if(!Ye&&(xs(n,e),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){_e(n,e,l)}Mn(t,e,n);break;case 21:Mn(t,e,n);break;case 22:n.mode&1?(Ye=(r=Ye)||n.memoizedState!==null,Mn(t,e,n),Ye=r):Mn(t,e,n);break;default:Mn(t,e,n)}}function gg(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new Qk),e.forEach(function(r){var s=oS.bind(null,t,r);n.has(r)||(n.add(r),r.then(s,s))})}}function Lt(t,e){var n=e.deletions;if(n!==null)for(var r=0;r<n.length;r++){var s=n[r];try{var i=t,o=e,l=o;e:for(;l!==null;){switch(l.tag){case 5:Le=l.stateNode,Ft=!1;break e;case 3:Le=l.stateNode.containerInfo,Ft=!0;break e;case 4:Le=l.stateNode.containerInfo,Ft=!0;break e}l=l.return}if(Le===null)throw Error(D(160));s_(i,o,s),Le=null,Ft=!1;var u=s.alternate;u!==null&&(u.return=null),s.return=null}catch(h){_e(s,e,h)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)i_(e,t),e=e.sibling}function i_(t,e){var n=t.alternate,r=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Lt(e,t),Xt(t),r&4){try{Wi(3,t,t.return),lc(3,t)}catch(A){_e(t,t.return,A)}try{Wi(5,t,t.return)}catch(A){_e(t,t.return,A)}}break;case 1:Lt(e,t),Xt(t),r&512&&n!==null&&xs(n,n.return);break;case 5:if(Lt(e,t),Xt(t),r&512&&n!==null&&xs(n,n.return),t.flags&32){var s=t.stateNode;try{so(s,"")}catch(A){_e(t,t.return,A)}}if(r&4&&(s=t.stateNode,s!=null)){var i=t.memoizedProps,o=n!==null?n.memoizedProps:i,l=t.type,u=t.updateQueue;if(t.updateQueue=null,u!==null)try{l==="input"&&i.type==="radio"&&i.name!=null&&Iv(s,i),fd(l,o);var h=fd(l,i);for(o=0;o<u.length;o+=2){var m=u[o],p=u[o+1];m==="style"?Av(s,p):m==="dangerouslySetInnerHTML"?Rv(s,p):m==="children"?so(s,p):Ch(s,m,p,h)}switch(l){case"input":ld(s,i);break;case"textarea":Tv(s,i);break;case"select":var v=s._wrapperState.wasMultiple;s._wrapperState.wasMultiple=!!i.multiple;var T=i.value;T!=null?Ss(s,!!i.multiple,T,!1):v!==!!i.multiple&&(i.defaultValue!=null?Ss(s,!!i.multiple,i.defaultValue,!0):Ss(s,!!i.multiple,i.multiple?[]:"",!1))}s[po]=i}catch(A){_e(t,t.return,A)}}break;case 6:if(Lt(e,t),Xt(t),r&4){if(t.stateNode===null)throw Error(D(162));s=t.stateNode,i=t.memoizedProps;try{s.nodeValue=i}catch(A){_e(t,t.return,A)}}break;case 3:if(Lt(e,t),Xt(t),r&4&&n!==null&&n.memoizedState.isDehydrated)try{lo(e.containerInfo)}catch(A){_e(t,t.return,A)}break;case 4:Lt(e,t),Xt(t);break;case 13:Lt(e,t),Xt(t),s=t.child,s.flags&8192&&(i=s.memoizedState!==null,s.stateNode.isHidden=i,!i||s.alternate!==null&&s.alternate.memoizedState!==null||(of=Se())),r&4&&gg(t);break;case 22:if(m=n!==null&&n.memoizedState!==null,t.mode&1?(Ye=(h=Ye)||m,Lt(e,t),Ye=h):Lt(e,t),Xt(t),r&8192){if(h=t.memoizedState!==null,(t.stateNode.isHidden=h)&&!m&&t.mode&1)for(V=t,m=t.child;m!==null;){for(p=V=m;V!==null;){switch(v=V,T=v.child,v.tag){case 0:case 11:case 14:case 15:Wi(4,v,v.return);break;case 1:xs(v,v.return);var I=v.stateNode;if(typeof I.componentWillUnmount=="function"){r=v,n=v.return;try{e=r,I.props=e.memoizedProps,I.state=e.memoizedState,I.componentWillUnmount()}catch(A){_e(r,n,A)}}break;case 5:xs(v,v.return);break;case 22:if(v.memoizedState!==null){yg(p);continue}}T!==null?(T.return=v,V=T):yg(p)}m=m.sibling}e:for(m=null,p=t;;){if(p.tag===5){if(m===null){m=p;try{s=p.stateNode,h?(i=s.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(l=p.stateNode,u=p.memoizedProps.style,o=u!=null&&u.hasOwnProperty("display")?u.display:null,l.style.display=Pv("display",o))}catch(A){_e(t,t.return,A)}}}else if(p.tag===6){if(m===null)try{p.stateNode.nodeValue=h?"":p.memoizedProps}catch(A){_e(t,t.return,A)}}else if((p.tag!==22&&p.tag!==23||p.memoizedState===null||p===t)&&p.child!==null){p.child.return=p,p=p.child;continue}if(p===t)break e;for(;p.sibling===null;){if(p.return===null||p.return===t)break e;m===p&&(m=null),p=p.return}m===p&&(m=null),p.sibling.return=p.return,p=p.sibling}}break;case 19:Lt(e,t),Xt(t),r&4&&gg(t);break;case 21:break;default:Lt(e,t),Xt(t)}}function Xt(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(r_(n)){var r=n;break e}n=n.return}throw Error(D(160))}switch(r.tag){case 5:var s=r.stateNode;r.flags&32&&(so(s,""),r.flags&=-33);var i=mg(t);Bd(t,i,s);break;case 3:case 4:var o=r.stateNode.containerInfo,l=mg(t);$d(t,l,o);break;default:throw Error(D(161))}}catch(u){_e(t,t.return,u)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function Jk(t,e,n){V=t,o_(t)}function o_(t,e,n){for(var r=(t.mode&1)!==0;V!==null;){var s=V,i=s.child;if(s.tag===22&&r){var o=s.memoizedState!==null||ba;if(!o){var l=s.alternate,u=l!==null&&l.memoizedState!==null||Ye;l=ba;var h=Ye;if(ba=o,(Ye=u)&&!h)for(V=s;V!==null;)o=V,u=o.child,o.tag===22&&o.memoizedState!==null?_g(s):u!==null?(u.return=o,V=u):_g(s);for(;i!==null;)V=i,o_(i),i=i.sibling;V=s,ba=l,Ye=h}vg(t)}else s.subtreeFlags&8772&&i!==null?(i.return=s,V=i):vg(t)}}function vg(t){for(;V!==null;){var e=V;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:Ye||lc(5,e);break;case 1:var r=e.stateNode;if(e.flags&4&&!Ye)if(n===null)r.componentDidMount();else{var s=e.elementType===e.type?n.memoizedProps:Mt(e.type,n.memoizedProps);r.componentDidUpdate(s,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=e.updateQueue;i!==null&&tg(e,i,r);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}tg(e,o,n)}break;case 5:var l=e.stateNode;if(n===null&&e.flags&4){n=l;var u=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var h=e.alternate;if(h!==null){var m=h.memoizedState;if(m!==null){var p=m.dehydrated;p!==null&&lo(p)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(D(163))}Ye||e.flags&512&&Vd(e)}catch(v){_e(e,e.return,v)}}if(e===t){V=null;break}if(n=e.sibling,n!==null){n.return=e.return,V=n;break}V=e.return}}function yg(t){for(;V!==null;){var e=V;if(e===t){V=null;break}var n=e.sibling;if(n!==null){n.return=e.return,V=n;break}V=e.return}}function _g(t){for(;V!==null;){var e=V;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{lc(4,e)}catch(u){_e(e,n,u)}break;case 1:var r=e.stateNode;if(typeof r.componentDidMount=="function"){var s=e.return;try{r.componentDidMount()}catch(u){_e(e,s,u)}}var i=e.return;try{Vd(e)}catch(u){_e(e,i,u)}break;case 5:var o=e.return;try{Vd(e)}catch(u){_e(e,o,u)}}}catch(u){_e(e,e.return,u)}if(e===t){V=null;break}var l=e.sibling;if(l!==null){l.return=e.return,V=l;break}V=e.return}}var Zk=Math.ceil,wl=Pn.ReactCurrentDispatcher,rf=Pn.ReactCurrentOwner,Rt=Pn.ReactCurrentBatchConfig,ee=0,je=null,Ne=null,ze=0,yt=0,ws=mr(0),be=0,xo=null,Mr=0,cc=0,sf=0,Gi=null,at=null,of=0,Vs=1/0,fn=null,El=!1,Hd=null,tr=null,Ra=!1,Kn=null,kl=0,qi=0,Wd=null,qa=-1,Ka=0;function nt(){return ee&6?Se():qa!==-1?qa:qa=Se()}function nr(t){return t.mode&1?ee&2&&ze!==0?ze&-ze:Lk.transition!==null?(Ka===0&&(Ka=Hv()),Ka):(t=se,t!==0||(t=window.event,t=t===void 0?16:Xv(t.type)),t):1}function Ht(t,e,n,r){if(50<qi)throw qi=0,Wd=null,Error(D(185));Lo(t,n,r),(!(ee&2)||t!==je)&&(t===je&&(!(ee&2)&&(cc|=n),be===4&&$n(t,ze)),pt(t,r),n===1&&ee===0&&!(e.mode&1)&&(Vs=Se()+500,ic&&gr()))}function pt(t,e){var n=t.callbackNode;LE(t,e);var r=ol(t,t===je?ze:0);if(r===0)n!==null&&Tm(n),t.callbackNode=null,t.callbackPriority=0;else if(e=r&-r,t.callbackPriority!==e){if(n!=null&&Tm(n),e===1)t.tag===0?Dk(xg.bind(null,t)):gy(xg.bind(null,t)),Pk(function(){!(ee&6)&&gr()}),n=null;else{switch(Wv(r)){case 1:n=Ph;break;case 4:n=$v;break;case 16:n=il;break;case 536870912:n=Bv;break;default:n=il}n=p_(n,a_.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function a_(t,e){if(qa=-1,Ka=0,ee&6)throw Error(D(327));var n=t.callbackNode;if(bs()&&t.callbackNode!==n)return null;var r=ol(t,t===je?ze:0);if(r===0)return null;if(r&30||r&t.expiredLanes||e)e=Sl(t,r);else{e=r;var s=ee;ee|=2;var i=c_();(je!==t||ze!==e)&&(fn=null,Vs=Se()+500,Ar(t,e));do try{nS();break}catch(l){l_(t,l)}while(!0);Hh(),wl.current=i,ee=s,Ne!==null?e=0:(je=null,ze=0,e=be)}if(e!==0){if(e===2&&(s=yd(t),s!==0&&(r=s,e=Gd(t,s))),e===1)throw n=xo,Ar(t,0),$n(t,r),pt(t,Se()),n;if(e===6)$n(t,r);else{if(s=t.current.alternate,!(r&30)&&!eS(s)&&(e=Sl(t,r),e===2&&(i=yd(t),i!==0&&(r=i,e=Gd(t,i))),e===1))throw n=xo,Ar(t,0),$n(t,r),pt(t,Se()),n;switch(t.finishedWork=s,t.finishedLanes=r,e){case 0:case 1:throw Error(D(345));case 2:Sr(t,at,fn);break;case 3:if($n(t,r),(r&130023424)===r&&(e=of+500-Se(),10<e)){if(ol(t,0)!==0)break;if(s=t.suspendedLanes,(s&r)!==r){nt(),t.pingedLanes|=t.suspendedLanes&s;break}t.timeoutHandle=Cd(Sr.bind(null,t,at,fn),e);break}Sr(t,at,fn);break;case 4:if($n(t,r),(r&4194240)===r)break;for(e=t.eventTimes,s=-1;0<r;){var o=31-Bt(r);i=1<<o,o=e[o],o>s&&(s=o),r&=~i}if(r=s,r=Se()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Zk(r/1960))-r,10<r){t.timeoutHandle=Cd(Sr.bind(null,t,at,fn),r);break}Sr(t,at,fn);break;case 5:Sr(t,at,fn);break;default:throw Error(D(329))}}}return pt(t,Se()),t.callbackNode===n?a_.bind(null,t):null}function Gd(t,e){var n=Gi;return t.current.memoizedState.isDehydrated&&(Ar(t,e).flags|=256),t=Sl(t,e),t!==2&&(e=at,at=n,e!==null&&qd(e)),t}function qd(t){at===null?at=t:at.push.apply(at,t)}function eS(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var s=n[r],i=s.getSnapshot;s=s.value;try{if(!Gt(i(),s))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function $n(t,e){for(e&=~sf,e&=~cc,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-Bt(e),r=1<<n;t[n]=-1,e&=~r}}function xg(t){if(ee&6)throw Error(D(327));bs();var e=ol(t,0);if(!(e&1))return pt(t,Se()),null;var n=Sl(t,e);if(t.tag!==0&&n===2){var r=yd(t);r!==0&&(e=r,n=Gd(t,r))}if(n===1)throw n=xo,Ar(t,0),$n(t,e),pt(t,Se()),n;if(n===6)throw Error(D(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,Sr(t,at,fn),pt(t,Se()),null}function af(t,e){var n=ee;ee|=1;try{return t(e)}finally{ee=n,ee===0&&(Vs=Se()+500,ic&&gr())}}function Fr(t){Kn!==null&&Kn.tag===0&&!(ee&6)&&bs();var e=ee;ee|=1;var n=Rt.transition,r=se;try{if(Rt.transition=null,se=1,t)return t()}finally{se=r,Rt.transition=n,ee=e,!(ee&6)&&gr()}}function lf(){yt=ws.current,fe(ws)}function Ar(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,Rk(n)),Ne!==null)for(n=Ne.return;n!==null;){var r=n;switch(Vh(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&dl();break;case 3:Us(),fe(ht),fe(Qe),Qh();break;case 5:Yh(r);break;case 4:Us();break;case 13:fe(ge);break;case 19:fe(ge);break;case 10:Wh(r.type._context);break;case 22:case 23:lf()}n=n.return}if(je=t,Ne=t=rr(t.current,null),ze=yt=e,be=0,xo=null,sf=cc=Mr=0,at=Gi=null,Tr!==null){for(e=0;e<Tr.length;e++)if(n=Tr[e],r=n.interleaved,r!==null){n.interleaved=null;var s=r.next,i=n.pending;if(i!==null){var o=i.next;i.next=s,r.next=o}n.pending=r}Tr=null}return t}function l_(t,e){do{var n=Ne;try{if(Hh(),Ha.current=xl,_l){for(var r=ve.memoizedState;r!==null;){var s=r.queue;s!==null&&(s.pending=null),r=r.next}_l=!1}if(Lr=0,Pe=Ce=ve=null,Hi=!1,vo=0,rf.current=null,n===null||n.return===null){be=1,xo=e,Ne=null;break}e:{var i=t,o=n.return,l=n,u=e;if(e=ze,l.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var h=u,m=l,p=m.tag;if(!(m.mode&1)&&(p===0||p===11||p===15)){var v=m.alternate;v?(m.updateQueue=v.updateQueue,m.memoizedState=v.memoizedState,m.lanes=v.lanes):(m.updateQueue=null,m.memoizedState=null)}var T=ag(o);if(T!==null){T.flags&=-257,lg(T,o,l,i,e),T.mode&1&&og(i,h,e),e=T,u=h;var I=e.updateQueue;if(I===null){var A=new Set;A.add(u),e.updateQueue=A}else I.add(u);break e}else{if(!(e&1)){og(i,h,e),cf();break e}u=Error(D(426))}}else if(pe&&l.mode&1){var O=ag(o);if(O!==null){!(O.flags&65536)&&(O.flags|=256),lg(O,o,l,i,e),$h(zs(u,l));break e}}i=u=zs(u,l),be!==4&&(be=2),Gi===null?Gi=[i]:Gi.push(i),i=o;do{switch(i.tag){case 3:i.flags|=65536,e&=-e,i.lanes|=e;var S=Wy(i,u,e);eg(i,S);break e;case 1:l=u;var E=i.type,C=i.stateNode;if(!(i.flags&128)&&(typeof E.getDerivedStateFromError=="function"||C!==null&&typeof C.componentDidCatch=="function"&&(tr===null||!tr.has(C)))){i.flags|=65536,e&=-e,i.lanes|=e;var j=Gy(i,l,e);eg(i,j);break e}}i=i.return}while(i!==null)}d_(n)}catch(L){e=L,Ne===n&&n!==null&&(Ne=n=n.return);continue}break}while(!0)}function c_(){var t=wl.current;return wl.current=xl,t===null?xl:t}function cf(){(be===0||be===3||be===2)&&(be=4),je===null||!(Mr&268435455)&&!(cc&268435455)||$n(je,ze)}function Sl(t,e){var n=ee;ee|=2;var r=c_();(je!==t||ze!==e)&&(fn=null,Ar(t,e));do try{tS();break}catch(s){l_(t,s)}while(!0);if(Hh(),ee=n,wl.current=r,Ne!==null)throw Error(D(261));return je=null,ze=0,be}function tS(){for(;Ne!==null;)u_(Ne)}function nS(){for(;Ne!==null&&!IE();)u_(Ne)}function u_(t){var e=f_(t.alternate,t,yt);t.memoizedProps=t.pendingProps,e===null?d_(t):Ne=e,rf.current=null}function d_(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=Yk(n,e),n!==null){n.flags&=32767,Ne=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{be=6,Ne=null;return}}else if(n=Kk(n,e,yt),n!==null){Ne=n;return}if(e=e.sibling,e!==null){Ne=e;return}Ne=e=t}while(e!==null);be===0&&(be=5)}function Sr(t,e,n){var r=se,s=Rt.transition;try{Rt.transition=null,se=1,rS(t,e,n,r)}finally{Rt.transition=s,se=r}return null}function rS(t,e,n,r){do bs();while(Kn!==null);if(ee&6)throw Error(D(327));n=t.finishedWork;var s=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(D(177));t.callbackNode=null,t.callbackPriority=0;var i=n.lanes|n.childLanes;if(ME(t,i),t===je&&(Ne=je=null,ze=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Ra||(Ra=!0,p_(il,function(){return bs(),null})),i=(n.flags&15990)!==0,n.subtreeFlags&15990||i){i=Rt.transition,Rt.transition=null;var o=se;se=1;var l=ee;ee|=4,rf.current=null,Xk(t,n),i_(n,t),kk(Sd),al=!!kd,Sd=kd=null,t.current=n,Jk(n),TE(),ee=l,se=o,Rt.transition=i}else t.current=n;if(Ra&&(Ra=!1,Kn=t,kl=s),i=t.pendingLanes,i===0&&(tr=null),PE(n.stateNode),pt(t,Se()),e!==null)for(r=t.onRecoverableError,n=0;n<e.length;n++)s=e[n],r(s.value,{componentStack:s.stack,digest:s.digest});if(El)throw El=!1,t=Hd,Hd=null,t;return kl&1&&t.tag!==0&&bs(),i=t.pendingLanes,i&1?t===Wd?qi++:(qi=0,Wd=t):qi=0,gr(),null}function bs(){if(Kn!==null){var t=Wv(kl),e=Rt.transition,n=se;try{if(Rt.transition=null,se=16>t?16:t,Kn===null)var r=!1;else{if(t=Kn,Kn=null,kl=0,ee&6)throw Error(D(331));var s=ee;for(ee|=4,V=t.current;V!==null;){var i=V,o=i.child;if(V.flags&16){var l=i.deletions;if(l!==null){for(var u=0;u<l.length;u++){var h=l[u];for(V=h;V!==null;){var m=V;switch(m.tag){case 0:case 11:case 15:Wi(8,m,i)}var p=m.child;if(p!==null)p.return=m,V=p;else for(;V!==null;){m=V;var v=m.sibling,T=m.return;if(n_(m),m===h){V=null;break}if(v!==null){v.return=T,V=v;break}V=T}}}var I=i.alternate;if(I!==null){var A=I.child;if(A!==null){I.child=null;do{var O=A.sibling;A.sibling=null,A=O}while(A!==null)}}V=i}}if(i.subtreeFlags&2064&&o!==null)o.return=i,V=o;else e:for(;V!==null;){if(i=V,i.flags&2048)switch(i.tag){case 0:case 11:case 15:Wi(9,i,i.return)}var S=i.sibling;if(S!==null){S.return=i.return,V=S;break e}V=i.return}}var E=t.current;for(V=E;V!==null;){o=V;var C=o.child;if(o.subtreeFlags&2064&&C!==null)C.return=o,V=C;else e:for(o=E;V!==null;){if(l=V,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:lc(9,l)}}catch(L){_e(l,l.return,L)}if(l===o){V=null;break e}var j=l.sibling;if(j!==null){j.return=l.return,V=j;break e}V=l.return}}if(ee=s,gr(),tn&&typeof tn.onPostCommitFiberRoot=="function")try{tn.onPostCommitFiberRoot(ec,t)}catch{}r=!0}return r}finally{se=n,Rt.transition=e}}return!1}function wg(t,e,n){e=zs(n,e),e=Wy(t,e,1),t=er(t,e,1),e=nt(),t!==null&&(Lo(t,1,e),pt(t,e))}function _e(t,e,n){if(t.tag===3)wg(t,t,n);else for(;e!==null;){if(e.tag===3){wg(e,t,n);break}else if(e.tag===1){var r=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(tr===null||!tr.has(r))){t=zs(n,t),t=Gy(e,t,1),e=er(e,t,1),t=nt(),e!==null&&(Lo(e,1,t),pt(e,t));break}}e=e.return}}function sS(t,e,n){var r=t.pingCache;r!==null&&r.delete(e),e=nt(),t.pingedLanes|=t.suspendedLanes&n,je===t&&(ze&n)===n&&(be===4||be===3&&(ze&130023424)===ze&&500>Se()-of?Ar(t,0):sf|=n),pt(t,e)}function h_(t,e){e===0&&(t.mode&1?(e=xa,xa<<=1,!(xa&130023424)&&(xa=4194304)):e=1);var n=nt();t=Cn(t,e),t!==null&&(Lo(t,e,n),pt(t,n))}function iS(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),h_(t,n)}function oS(t,e){var n=0;switch(t.tag){case 13:var r=t.stateNode,s=t.memoizedState;s!==null&&(n=s.retryLane);break;case 19:r=t.stateNode;break;default:throw Error(D(314))}r!==null&&r.delete(e),h_(t,n)}var f_;f_=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||ht.current)ut=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return ut=!1,qk(t,e,n);ut=!!(t.flags&131072)}else ut=!1,pe&&e.flags&1048576&&vy(e,pl,e.index);switch(e.lanes=0,e.tag){case 2:var r=e.type;Ga(t,e),t=e.pendingProps;var s=Ls(e,Qe.current);Ts(e,n),s=Jh(null,e,r,t,s,n);var i=Zh();return e.flags|=1,typeof s=="object"&&s!==null&&typeof s.render=="function"&&s.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,ft(r)?(i=!0,hl(e)):i=!1,e.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,qh(e),s.updater=ac,e.stateNode=s,s._reactInternals=e,jd(e,r,t,n),e=Ld(null,e,r,!0,i,n)):(e.tag=0,pe&&i&&zh(e),Ze(null,e,s,n),e=e.child),e;case 16:r=e.elementType;e:{switch(Ga(t,e),t=e.pendingProps,s=r._init,r=s(r._payload),e.type=r,s=e.tag=lS(r),t=Mt(r,t),s){case 0:e=Dd(null,e,r,t,n);break e;case 1:e=dg(null,e,r,t,n);break e;case 11:e=cg(null,e,r,t,n);break e;case 14:e=ug(null,e,r,Mt(r.type,t),n);break e}throw Error(D(306,r,""))}return e;case 0:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:Mt(r,s),Dd(t,e,r,s,n);case 1:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:Mt(r,s),dg(t,e,r,s,n);case 3:e:{if(Qy(e),t===null)throw Error(D(387));r=e.pendingProps,i=e.memoizedState,s=i.element,ky(t,e),vl(e,r,null,n);var o=e.memoizedState;if(r=o.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=i,e.memoizedState=i,e.flags&256){s=zs(Error(D(423)),e),e=hg(t,e,r,n,s);break e}else if(r!==s){s=zs(Error(D(424)),e),e=hg(t,e,r,n,s);break e}else for(_t=Zn(e.stateNode.containerInfo.firstChild),xt=e,pe=!0,Ut=null,n=wy(e,null,r,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Ms(),r===s){e=In(t,e,n);break e}Ze(t,e,r,n)}e=e.child}return e;case 5:return Sy(e),t===null&&Rd(e),r=e.type,s=e.pendingProps,i=t!==null?t.memoizedProps:null,o=s.children,Nd(r,s)?o=null:i!==null&&Nd(r,i)&&(e.flags|=32),Yy(t,e),Ze(t,e,o,n),e.child;case 6:return t===null&&Rd(e),null;case 13:return Xy(t,e,n);case 4:return Kh(e,e.stateNode.containerInfo),r=e.pendingProps,t===null?e.child=Fs(e,null,r,n):Ze(t,e,r,n),e.child;case 11:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:Mt(r,s),cg(t,e,r,s,n);case 7:return Ze(t,e,e.pendingProps,n),e.child;case 8:return Ze(t,e,e.pendingProps.children,n),e.child;case 12:return Ze(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(r=e.type._context,s=e.pendingProps,i=e.memoizedProps,o=s.value,ue(ml,r._currentValue),r._currentValue=o,i!==null)if(Gt(i.value,o)){if(i.children===s.children&&!ht.current){e=In(t,e,n);break e}}else for(i=e.child,i!==null&&(i.return=e);i!==null;){var l=i.dependencies;if(l!==null){o=i.child;for(var u=l.firstContext;u!==null;){if(u.context===r){if(i.tag===1){u=wn(-1,n&-n),u.tag=2;var h=i.updateQueue;if(h!==null){h=h.shared;var m=h.pending;m===null?u.next=u:(u.next=m.next,m.next=u),h.pending=u}}i.lanes|=n,u=i.alternate,u!==null&&(u.lanes|=n),Pd(i.return,n,e),l.lanes|=n;break}u=u.next}}else if(i.tag===10)o=i.type===e.type?null:i.child;else if(i.tag===18){if(o=i.return,o===null)throw Error(D(341));o.lanes|=n,l=o.alternate,l!==null&&(l.lanes|=n),Pd(o,n,e),o=i.sibling}else o=i.child;if(o!==null)o.return=i;else for(o=i;o!==null;){if(o===e){o=null;break}if(i=o.sibling,i!==null){i.return=o.return,o=i;break}o=o.return}i=o}Ze(t,e,s.children,n),e=e.child}return e;case 9:return s=e.type,r=e.pendingProps.children,Ts(e,n),s=Pt(s),r=r(s),e.flags|=1,Ze(t,e,r,n),e.child;case 14:return r=e.type,s=Mt(r,e.pendingProps),s=Mt(r.type,s),ug(t,e,r,s,n);case 15:return qy(t,e,e.type,e.pendingProps,n);case 17:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:Mt(r,s),Ga(t,e),e.tag=1,ft(r)?(t=!0,hl(e)):t=!1,Ts(e,n),Hy(e,r,s),jd(e,r,s,n),Ld(null,e,r,!0,t,n);case 19:return Jy(t,e,n);case 22:return Ky(t,e,n)}throw Error(D(156,e.tag))};function p_(t,e){return Vv(t,e)}function aS(t,e,n,r){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Tt(t,e,n,r){return new aS(t,e,n,r)}function uf(t){return t=t.prototype,!(!t||!t.isReactComponent)}function lS(t){if(typeof t=="function")return uf(t)?1:0;if(t!=null){if(t=t.$$typeof,t===Th)return 11;if(t===bh)return 14}return 2}function rr(t,e){var n=t.alternate;return n===null?(n=Tt(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function Ya(t,e,n,r,s,i){var o=2;if(r=t,typeof t=="function")uf(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case ds:return jr(n.children,s,i,e);case Ih:o=8,s|=8;break;case rd:return t=Tt(12,n,e,s|2),t.elementType=rd,t.lanes=i,t;case sd:return t=Tt(13,n,e,s),t.elementType=sd,t.lanes=i,t;case id:return t=Tt(19,n,e,s),t.elementType=id,t.lanes=i,t;case Sv:return uc(n,s,i,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Ev:o=10;break e;case kv:o=9;break e;case Th:o=11;break e;case bh:o=14;break e;case Un:o=16,r=null;break e}throw Error(D(130,t==null?t:typeof t,""))}return e=Tt(o,n,e,s),e.elementType=t,e.type=r,e.lanes=i,e}function jr(t,e,n,r){return t=Tt(7,t,r,e),t.lanes=n,t}function uc(t,e,n,r){return t=Tt(22,t,r,e),t.elementType=Sv,t.lanes=n,t.stateNode={isHidden:!1},t}function Du(t,e,n){return t=Tt(6,t,null,e),t.lanes=n,t}function Lu(t,e,n){return e=Tt(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function cS(t,e,n,r,s){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=gu(0),this.expirationTimes=gu(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=gu(0),this.identifierPrefix=r,this.onRecoverableError=s,this.mutableSourceEagerHydrationData=null}function df(t,e,n,r,s,i,o,l,u){return t=new cS(t,e,n,l,u),e===1?(e=1,i===!0&&(e|=8)):e=0,i=Tt(3,null,null,e),t.current=i,i.stateNode=t,i.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},qh(i),t}function uS(t,e,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:us,key:r==null?null:""+r,children:t,containerInfo:e,implementation:n}}function m_(t){if(!t)return ur;t=t._reactInternals;e:{if(Kr(t)!==t||t.tag!==1)throw Error(D(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(ft(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(D(171))}if(t.tag===1){var n=t.type;if(ft(n))return my(t,n,e)}return e}function g_(t,e,n,r,s,i,o,l,u){return t=df(n,r,!0,t,s,i,o,l,u),t.context=m_(null),n=t.current,r=nt(),s=nr(n),i=wn(r,s),i.callback=e??null,er(n,i,s),t.current.lanes=s,Lo(t,s,r),pt(t,r),t}function dc(t,e,n,r){var s=e.current,i=nt(),o=nr(s);return n=m_(n),e.context===null?e.context=n:e.pendingContext=n,e=wn(i,o),e.payload={element:t},r=r===void 0?null:r,r!==null&&(e.callback=r),t=er(s,e,o),t!==null&&(Ht(t,s,o,i),Ba(t,s,o)),o}function Nl(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Eg(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function hf(t,e){Eg(t,e),(t=t.alternate)&&Eg(t,e)}function dS(){return null}var v_=typeof reportError=="function"?reportError:function(t){console.error(t)};function ff(t){this._internalRoot=t}hc.prototype.render=ff.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(D(409));dc(t,e,null,null)};hc.prototype.unmount=ff.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Fr(function(){dc(null,t,null,null)}),e[Nn]=null}};function hc(t){this._internalRoot=t}hc.prototype.unstable_scheduleHydration=function(t){if(t){var e=Kv();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Vn.length&&e!==0&&e<Vn[n].priority;n++);Vn.splice(n,0,t),n===0&&Qv(t)}};function pf(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function fc(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function kg(){}function hS(t,e,n,r,s){if(s){if(typeof r=="function"){var i=r;r=function(){var h=Nl(o);i.call(h)}}var o=g_(e,r,t,0,null,!1,!1,"",kg);return t._reactRootContainer=o,t[Nn]=o.current,ho(t.nodeType===8?t.parentNode:t),Fr(),o}for(;s=t.lastChild;)t.removeChild(s);if(typeof r=="function"){var l=r;r=function(){var h=Nl(u);l.call(h)}}var u=df(t,0,!1,null,null,!1,!1,"",kg);return t._reactRootContainer=u,t[Nn]=u.current,ho(t.nodeType===8?t.parentNode:t),Fr(function(){dc(e,u,n,r)}),u}function pc(t,e,n,r,s){var i=n._reactRootContainer;if(i){var o=i;if(typeof s=="function"){var l=s;s=function(){var u=Nl(o);l.call(u)}}dc(e,o,t,s)}else o=hS(n,e,t,s,r);return Nl(o)}Gv=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=Di(e.pendingLanes);n!==0&&(Ah(e,n|1),pt(e,Se()),!(ee&6)&&(Vs=Se()+500,gr()))}break;case 13:Fr(function(){var r=Cn(t,1);if(r!==null){var s=nt();Ht(r,t,1,s)}}),hf(t,1)}};jh=function(t){if(t.tag===13){var e=Cn(t,134217728);if(e!==null){var n=nt();Ht(e,t,134217728,n)}hf(t,134217728)}};qv=function(t){if(t.tag===13){var e=nr(t),n=Cn(t,e);if(n!==null){var r=nt();Ht(n,t,e,r)}hf(t,e)}};Kv=function(){return se};Yv=function(t,e){var n=se;try{return se=t,e()}finally{se=n}};md=function(t,e,n){switch(e){case"input":if(ld(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var r=n[e];if(r!==t&&r.form===t.form){var s=sc(r);if(!s)throw Error(D(90));Cv(r),ld(r,s)}}}break;case"textarea":Tv(t,n);break;case"select":e=n.value,e!=null&&Ss(t,!!n.multiple,e,!1)}};Dv=af;Lv=Fr;var fS={usingClientEntryPoint:!1,Events:[Fo,ms,sc,jv,Ov,af]},Ii={findFiberByHostInstance:Ir,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},pS={bundleType:Ii.bundleType,version:Ii.version,rendererPackageName:Ii.rendererPackageName,rendererConfig:Ii.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Pn.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=Uv(t),t===null?null:t.stateNode},findFiberByHostInstance:Ii.findFiberByHostInstance||dS,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Pa=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Pa.isDisabled&&Pa.supportsFiber)try{ec=Pa.inject(pS),tn=Pa}catch{}}kt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=fS;kt.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!pf(e))throw Error(D(200));return uS(t,e,null,n)};kt.createRoot=function(t,e){if(!pf(t))throw Error(D(299));var n=!1,r="",s=v_;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(r=e.identifierPrefix),e.onRecoverableError!==void 0&&(s=e.onRecoverableError)),e=df(t,1,!1,null,null,n,!1,r,s),t[Nn]=e.current,ho(t.nodeType===8?t.parentNode:t),new ff(e)};kt.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(D(188)):(t=Object.keys(t).join(","),Error(D(268,t)));return t=Uv(e),t=t===null?null:t.stateNode,t};kt.flushSync=function(t){return Fr(t)};kt.hydrate=function(t,e,n){if(!fc(e))throw Error(D(200));return pc(null,t,e,!0,n)};kt.hydrateRoot=function(t,e,n){if(!pf(t))throw Error(D(405));var r=n!=null&&n.hydratedSources||null,s=!1,i="",o=v_;if(n!=null&&(n.unstable_strictMode===!0&&(s=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=g_(e,null,t,1,n??null,s,!1,i,o),t[Nn]=e.current,ho(t),r)for(t=0;t<r.length;t++)n=r[t],s=n._getVersion,s=s(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,s]:e.mutableSourceEagerHydrationData.push(n,s);return new hc(e)};kt.render=function(t,e,n){if(!fc(e))throw Error(D(200));return pc(null,t,e,!1,n)};kt.unmountComponentAtNode=function(t){if(!fc(t))throw Error(D(40));return t._reactRootContainer?(Fr(function(){pc(null,null,t,!1,function(){t._reactRootContainer=null,t[Nn]=null})}),!0):!1};kt.unstable_batchedUpdates=af;kt.unstable_renderSubtreeIntoContainer=function(t,e,n,r){if(!fc(n))throw Error(D(200));if(t==null||t._reactInternals===void 0)throw Error(D(38));return pc(t,e,n,!1,r)};kt.version="18.3.1-next-f1338f8080-20240426";function y_(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(y_)}catch(t){console.error(t)}}y_(),yv.exports=kt;var mS=yv.exports,Sg=mS;td.createRoot=Sg.createRoot,td.hydrateRoot=Sg.hydrateRoot;/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gS=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),__=(...t)=>t.filter((e,n,r)=>!!e&&r.indexOf(e)===n).join(" ");/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var vS={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yS=H.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:n=2,absoluteStrokeWidth:r,className:s="",children:i,iconNode:o,...l},u)=>H.createElement("svg",{ref:u,...vS,width:e,height:e,stroke:t,strokeWidth:r?Number(n)*24/Number(e):n,className:__("lucide",s),...l},[...o.map(([h,m])=>H.createElement(h,m)),...Array.isArray(i)?i:[i]]));/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y=(t,e)=>{const n=H.forwardRef(({className:r,...s},i)=>H.createElement(yS,{ref:i,iconNode:e,className:__(`lucide-${gS(t)}`,r),...s}));return n.displayName=`${t}`,n};/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mc=Y("Activity",[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zo=Y("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _S=Y("Award",[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xS=Y("BookOpen",[["path",{d:"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z",key:"vv98re"}],["path",{d:"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",key:"1cyq3y"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wS=Y("Briefcase",[["path",{d:"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",key:"jecpp"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2",key:"i6l2r4"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vr=Y("Bus",[["path",{d:"M8 6v6",key:"18i7km"}],["path",{d:"M15 6v6",key:"1sg6z9"}],["path",{d:"M2 12h19.6",key:"de5uta"}],["path",{d:"M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3",key:"1wwztk"}],["circle",{cx:"7",cy:"18",r:"2",key:"19iecd"}],["path",{d:"M9 18h5",key:"lrx6i"}],["circle",{cx:"16",cy:"18",r:"2",key:"1v4tcr"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gc=Y("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cl=Y("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mf=Y("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $s=Y("CircleCheck",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ES=Y("ClipboardCheck",[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1",key:"tgr4d6"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",key:"116196"}],["path",{d:"m9 14 2 2 4-4",key:"df797q"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x_=Y("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kS=Y("Database",[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const SS=Y("LayoutDashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bs=Y("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w_=Y("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const NS=Y("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vc=Y("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sr=Y("MapPin",[["path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z",key:"2oe9fu"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const CS=Y("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const IS=Y("MousePointer2",[["path",{d:"m4 4 7.07 17 2.51-7.39L21 11.07z",key:"1vqm48"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const TS=Y("PenLine",[["path",{d:"M12 20h9",key:"t2du7b"}],["path",{d:"M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",key:"1ykcvy"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E_=Y("Phone",[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k_=Y("Save",[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bS=Y("Scale",[["path",{d:"m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z",key:"7g6ntu"}],["path",{d:"m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z",key:"ijws7r"}],["path",{d:"M7 21h10",key:"1b0cd5"}],["path",{d:"M12 3v18",key:"108xh3"}],["path",{d:"M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2",key:"3gwbw2"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const RS=Y("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const PS=Y("ShieldAlert",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"M12 8v4",key:"1got3b"}],["path",{d:"M12 16h.01",key:"1drbdi"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S_=Y("ShieldCheck",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const AS=Y("ShieldQuestion",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3",key:"mhlwft"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jS=Y("Smartphone",[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2",key:"1yt0o3"}],["path",{d:"M12 18h.01",key:"mhygvu"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ng=Y("Star",[["polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",key:"8f66p6"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const OS=Y("Ticket",[["path",{d:"M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",key:"qn84l0"}],["path",{d:"M13 5v2",key:"dyzc3o"}],["path",{d:"M13 17v2",key:"1ont0d"}],["path",{d:"M13 11v2",key:"1wjjxi"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yc=Y("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wo=Y("TrendingUp",[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _c=Y("UserPlus",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"19",x2:"19",y1:"8",y2:"14",key:"1bvyxn"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11",key:"1shjgl"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gf=Y("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ur=Y("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vf=Y("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);var Cg={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const N_={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const F=function(t,e){if(!t)throw ti(e)},ti=function(t){return new Error("Firebase Database ("+N_.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const C_=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},DS=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=t[n++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=t[n++],o=t[n++],l=t[n++],u=((s&7)<<18|(i&63)<<12|(o&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const i=t[n++],o=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},yf={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const i=t[s],o=s+1<t.length,l=o?t[s+1]:0,u=s+2<t.length,h=u?t[s+2]:0,m=i>>2,p=(i&3)<<4|l>>4;let v=(l&15)<<2|h>>6,T=h&63;u||(T=64,o||(v=64)),r.push(n[m],n[p],n[v],n[T])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(C_(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):DS(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const i=n[t.charAt(s++)],l=s<t.length?n[t.charAt(s)]:0;++s;const h=s<t.length?n[t.charAt(s)]:64;++s;const p=s<t.length?n[t.charAt(s)]:64;if(++s,i==null||l==null||h==null||p==null)throw new LS;const v=i<<2|l>>4;if(r.push(v),h!==64){const T=l<<4&240|h>>2;if(r.push(T),p!==64){const I=h<<6&192|p;r.push(I)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class LS extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const I_=function(t){const e=C_(t);return yf.encodeByteArray(e,!0)},Il=function(t){return I_(t).replace(/\./g,"")},Tl=function(t){try{return yf.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function MS(t){return T_(void 0,t)}function T_(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!FS(n)||(t[n]=T_(t[n],e[n]));return t}function FS(t){return t!=="__proto__"}/**
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
 */function US(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const zS=()=>US().__FIREBASE_DEFAULTS__,VS=()=>{if(typeof process>"u"||typeof Cg>"u")return;const t=Cg.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},$S=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Tl(t[1]);return e&&JSON.parse(e)},_f=()=>{try{return zS()||VS()||$S()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},b_=t=>{var e,n;return(n=(e=_f())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},R_=t=>{const e=b_(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},P_=()=>{var t;return(t=_f())===null||t===void 0?void 0:t.config},A_=t=>{var e;return(e=_f())===null||e===void 0?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vo{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
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
 */function j_(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",s=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},t);return[Il(JSON.stringify(n)),Il(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function st(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function xf(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(st())}function BS(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function O_(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function D_(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function HS(){const t=st();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function WS(){return N_.NODE_ADMIN===!0}function L_(){try{return typeof indexedDB=="object"}catch{return!1}}function M_(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(n){e(n)}})}function GS(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qS="FirebaseError";class Yt extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=qS,Object.setPrototypeOf(this,Yt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Yr.prototype.create)}}class Yr{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?KS(i,r):"Error",l=`${this.serviceName}: ${o} (${s}).`;return new Yt(s,l,r)}}function KS(t,e){return t.replace(YS,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const YS=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Eo(t){return JSON.parse(t)}function Te(t){return JSON.stringify(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const F_=function(t){let e={},n={},r={},s="";try{const i=t.split(".");e=Eo(Tl(i[0])||""),n=Eo(Tl(i[1])||""),s=i[2],r=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:r,signature:s}},QS=function(t){const e=F_(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},XS=function(t){const e=F_(t).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function on(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function Hs(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function Kd(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function bl(t,e,n){const r={};for(const s in t)Object.prototype.hasOwnProperty.call(t,s)&&(r[s]=e.call(n,t[s],s,t));return r}function ko(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const i=t[s],o=e[s];if(Ig(i)&&Ig(o)){if(!ko(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function Ig(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ni(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Mi(t){const e={};return t.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function Fi(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JS{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const r=this.W_;if(typeof e=="string")for(let p=0;p<16;p++)r[p]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let p=0;p<16;p++)r[p]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let p=16;p<80;p++){const v=r[p-3]^r[p-8]^r[p-14]^r[p-16];r[p]=(v<<1|v>>>31)&4294967295}let s=this.chain_[0],i=this.chain_[1],o=this.chain_[2],l=this.chain_[3],u=this.chain_[4],h,m;for(let p=0;p<80;p++){p<40?p<20?(h=l^i&(o^l),m=1518500249):(h=i^o^l,m=1859775393):p<60?(h=i&o|l&(i|o),m=2400959708):(h=i^o^l,m=3395469782);const v=(s<<5|s>>>27)+h+u+m+r[p]&4294967295;u=l,l=o,o=(i<<30|i>>>2)&4294967295,i=s,s=v}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+i&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+l&4294967295,this.chain_[4]=this.chain_[4]+u&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const r=n-this.blockSize;let s=0;const i=this.buf_;let o=this.inbuf_;for(;s<n;){if(o===0)for(;s<=r;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<n;)if(i[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(i),o=0;break}}else for(;s<n;)if(i[o]=e[s],++o,++s,o===this.blockSize){this.compress_(i),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=n&255,n/=256;this.compress_(this.buf_);let r=0;for(let s=0;s<5;s++)for(let i=24;i>=0;i-=8)e[r]=this.chain_[s]>>i&255,++r;return e}}function ZS(t,e){const n=new eN(t,e);return n.subscribe.bind(n)}class eN{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let s;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");tN(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:r},s.next===void 0&&(s.next=Mu),s.error===void 0&&(s.error=Mu),s.complete===void 0&&(s.complete=Mu);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function tN(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function Mu(){}function xc(t,e){return`${t} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nN=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);if(s>=55296&&s<=56319){const i=s-55296;r++,F(r<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(r)-56320;s=65536+(i<<10)+o}s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):s<65536?(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},wc=function(t){let e=0;for(let n=0;n<t.length;n++){const r=t.charCodeAt(n);r<128?e++:r<2048?e+=2:r>=55296&&r<=56319?(e+=4,n++):e+=3}return e};/**
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
 */const rN=1e3,sN=2,iN=4*60*60*1e3,oN=.5;function Tg(t,e=rN,n=sN){const r=e*Math.pow(n,t),s=Math.round(oN*r*(Math.random()-.5)*2);return Math.min(iN,r+s)}/**
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
 */function Oe(t){return t&&t._delegate?t._delegate:t}class jt{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */class aN{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new Vo;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(cN(e))try{this.getOrInitializeService({instanceIdentifier:Nr})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=Nr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Nr){return this.instances.has(e)}getOptions(e=Nr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,o]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(i);r===l&&o.resolve(s)}return s}onInit(e,n){var r;const s=this.normalizeInstanceIdentifier(n),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const o=this.instances.get(s);return o&&e(o,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:lN(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Nr){return this.component?this.component.multipleInstances?e:Nr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function lN(t){return t===Nr?void 0:t}function cN(t){return t.instantiationMode==="EAGER"}/**
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
 */class uN{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new aN(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var re;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(re||(re={}));const dN={debug:re.DEBUG,verbose:re.VERBOSE,info:re.INFO,warn:re.WARN,error:re.ERROR,silent:re.SILENT},hN=re.INFO,fN={[re.DEBUG]:"log",[re.VERBOSE]:"log",[re.INFO]:"info",[re.WARN]:"warn",[re.ERROR]:"error"},pN=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=fN[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class $o{constructor(e){this.name=e,this._logLevel=hN,this._logHandler=pN,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in re))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?dN[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,re.DEBUG,...e),this._logHandler(this,re.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,re.VERBOSE,...e),this._logHandler(this,re.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,re.INFO,...e),this._logHandler(this,re.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,re.WARN,...e),this._logHandler(this,re.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,re.ERROR,...e),this._logHandler(this,re.ERROR,...e)}}const mN=(t,e)=>e.some(n=>t instanceof n);let bg,Rg;function gN(){return bg||(bg=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function vN(){return Rg||(Rg=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const U_=new WeakMap,Yd=new WeakMap,z_=new WeakMap,Fu=new WeakMap,wf=new WeakMap;function yN(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(ir(t.result)),s()},o=()=>{r(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&U_.set(n,t)}).catch(()=>{}),wf.set(e,t),e}function _N(t){if(Yd.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),s()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});Yd.set(t,e)}let Qd={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Yd.get(t);if(e==="objectStoreNames")return t.objectStoreNames||z_.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return ir(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function xN(t){Qd=t(Qd)}function wN(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(Uu(this),e,...n);return z_.set(r,e.sort?e.sort():[e]),ir(r)}:vN().includes(t)?function(...e){return t.apply(Uu(this),e),ir(U_.get(this))}:function(...e){return ir(t.apply(Uu(this),e))}}function EN(t){return typeof t=="function"?wN(t):(t instanceof IDBTransaction&&_N(t),mN(t,gN())?new Proxy(t,Qd):t)}function ir(t){if(t instanceof IDBRequest)return yN(t);if(Fu.has(t))return Fu.get(t);const e=EN(t);return e!==t&&(Fu.set(t,e),wf.set(e,t)),e}const Uu=t=>wf.get(t);function V_(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(t,e),l=ir(o);return r&&o.addEventListener("upgradeneeded",u=>{r(ir(o.result),u.oldVersion,u.newVersion,ir(o.transaction),u)}),n&&o.addEventListener("blocked",u=>n(u.oldVersion,u.newVersion,u)),l.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),l}const kN=["get","getKey","getAll","getAllKeys","count"],SN=["put","add","delete","clear"],zu=new Map;function Pg(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(zu.get(e))return zu.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=SN.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||kN.includes(n)))return;const i=async function(o,...l){const u=this.transaction(o,s?"readwrite":"readonly");let h=u.store;return r&&(h=h.index(l.shift())),(await Promise.all([h[n](...l),s&&u.done]))[0]};return zu.set(e,i),i}xN(t=>({...t,get:(e,n,r)=>Pg(e,n)||t.get(e,n,r),has:(e,n)=>!!Pg(e,n)||t.has(e,n)}));/**
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
 */class NN{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(CN(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function CN(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Xd="@firebase/app",Ag="0.10.13";/**
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
 */const Tn=new $o("@firebase/app"),IN="@firebase/app-compat",TN="@firebase/analytics-compat",bN="@firebase/analytics",RN="@firebase/app-check-compat",PN="@firebase/app-check",AN="@firebase/auth",jN="@firebase/auth-compat",ON="@firebase/database",DN="@firebase/data-connect",LN="@firebase/database-compat",MN="@firebase/functions",FN="@firebase/functions-compat",UN="@firebase/installations",zN="@firebase/installations-compat",VN="@firebase/messaging",$N="@firebase/messaging-compat",BN="@firebase/performance",HN="@firebase/performance-compat",WN="@firebase/remote-config",GN="@firebase/remote-config-compat",qN="@firebase/storage",KN="@firebase/storage-compat",YN="@firebase/firestore",QN="@firebase/vertexai-preview",XN="@firebase/firestore-compat",JN="firebase",ZN="10.14.1";/**
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
 */const Jd="[DEFAULT]",eC={[Xd]:"fire-core",[IN]:"fire-core-compat",[bN]:"fire-analytics",[TN]:"fire-analytics-compat",[PN]:"fire-app-check",[RN]:"fire-app-check-compat",[AN]:"fire-auth",[jN]:"fire-auth-compat",[ON]:"fire-rtdb",[DN]:"fire-data-connect",[LN]:"fire-rtdb-compat",[MN]:"fire-fn",[FN]:"fire-fn-compat",[UN]:"fire-iid",[zN]:"fire-iid-compat",[VN]:"fire-fcm",[$N]:"fire-fcm-compat",[BN]:"fire-perf",[HN]:"fire-perf-compat",[WN]:"fire-rc",[GN]:"fire-rc-compat",[qN]:"fire-gcs",[KN]:"fire-gcs-compat",[YN]:"fire-fst",[XN]:"fire-fst-compat",[QN]:"fire-vertex","fire-js":"fire-js",[JN]:"fire-js-all"};/**
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
 */const Rl=new Map,tC=new Map,Zd=new Map;function jg(t,e){try{t.container.addComponent(e)}catch(n){Tn.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function qt(t){const e=t.name;if(Zd.has(e))return Tn.debug(`There were multiple attempts to register component ${e}.`),!1;Zd.set(e,t);for(const n of Rl.values())jg(n,t);for(const n of tC.values())jg(n,t);return!0}function yr(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function en(t){return t.settings!==void 0}/**
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
 */const nC={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},or=new Yr("app","Firebase",nC);/**
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
 */class rC{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new jt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw or.create("app-deleted",{appName:this._name})}}/**
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
 */const Qr=ZN;function $_(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Jd,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw or.create("bad-app-name",{appName:String(s)});if(n||(n=P_()),!n)throw or.create("no-options");const i=Rl.get(s);if(i){if(ko(n,i.options)&&ko(r,i.config))return i;throw or.create("duplicate-app",{appName:s})}const o=new uN(s);for(const u of Zd.values())o.addComponent(u);const l=new rC(n,r,o);return Rl.set(s,l),l}function Ec(t=Jd){const e=Rl.get(t);if(!e&&t===Jd&&P_())return $_();if(!e)throw or.create("no-app",{appName:t});return e}function mt(t,e,n){var r;let s=(r=eC[t])!==null&&r!==void 0?r:t;n&&(s+=`-${n}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const l=[`Unable to register library "${s}" with version "${e}":`];i&&l.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&l.push("and"),o&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Tn.warn(l.join(" "));return}qt(new jt(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const sC="firebase-heartbeat-database",iC=1,So="firebase-heartbeat-store";let Vu=null;function B_(){return Vu||(Vu=V_(sC,iC,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(So)}catch(n){console.warn(n)}}}}).catch(t=>{throw or.create("idb-open",{originalErrorMessage:t.message})})),Vu}async function oC(t){try{const n=(await B_()).transaction(So),r=await n.objectStore(So).get(H_(t));return await n.done,r}catch(e){if(e instanceof Yt)Tn.warn(e.message);else{const n=or.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Tn.warn(n.message)}}}async function Og(t,e){try{const r=(await B_()).transaction(So,"readwrite");await r.objectStore(So).put(e,H_(t)),await r.done}catch(n){if(n instanceof Yt)Tn.warn(n.message);else{const r=or.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Tn.warn(r.message)}}}function H_(t){return`${t.name}!${t.options.appId}`}/**
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
 */const aC=1024,lC=30*24*60*60*1e3;class cC{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new dC(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Dg();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i)?void 0:(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const l=new Date(o.date).valueOf();return Date.now()-l<=lC}),this._storage.overwrite(this._heartbeatsCache))}catch(r){Tn.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Dg(),{heartbeatsToSend:r,unsentEntries:s}=uC(this._heartbeatsCache.heartbeats),i=Il(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(n){return Tn.warn(n),""}}}function Dg(){return new Date().toISOString().substring(0,10)}function uC(t,e=aC){const n=[];let r=t.slice();for(const s of t){const i=n.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),Lg(n)>e){i.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),Lg(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class dC{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return L_()?M_().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await oC(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return Og(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return Og(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Lg(t){return Il(JSON.stringify({version:2,heartbeats:t})).length}/**
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
 */function hC(t){qt(new jt("platform-logger",e=>new NN(e),"PRIVATE")),qt(new jt("heartbeat",e=>new cC(e),"PRIVATE")),mt(Xd,Ag,t),mt(Xd,Ag,"esm2017"),mt("fire-js","")}hC("");function Ef(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(t);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(t,r[s])&&(n[r[s]]=t[r[s]]);return n}function W_(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const fC=W_,G_=new Yr("auth","Firebase",W_());/**
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
 */const Pl=new $o("@firebase/auth");function pC(t,...e){Pl.logLevel<=re.WARN&&Pl.warn(`Auth (${Qr}): ${t}`,...e)}function Qa(t,...e){Pl.logLevel<=re.ERROR&&Pl.error(`Auth (${Qr}): ${t}`,...e)}/**
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
 */function Kt(t,...e){throw kf(t,...e)}function rn(t,...e){return kf(t,...e)}function q_(t,e,n){const r=Object.assign(Object.assign({},fC()),{[e]:n});return new Yr("auth","Firebase",r).create(e,{appName:t.name})}function En(t){return q_(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function kf(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return G_.create(t,...e)}function W(t,e,...n){if(!t)throw kf(e,...n)}function vn(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Qa(e),new Error(e)}function bn(t,e){t||vn(e)}/**
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
 */function eh(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function mC(){return Mg()==="http:"||Mg()==="https:"}function Mg(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
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
 */function gC(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(mC()||O_()||"connection"in navigator)?navigator.onLine:!0}function vC(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
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
 */class Bo{constructor(e,n){this.shortDelay=e,this.longDelay=n,bn(n>e,"Short delay should be less than long delay!"),this.isMobile=xf()||D_()}get(){return gC()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function Sf(t,e){bn(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
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
 */class K_{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;vn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;vn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;vn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const yC={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const _C=new Bo(3e4,6e4);function _r(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function An(t,e,n,r,s={}){return Y_(t,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const l=ni(Object.assign({key:t.config.apiKey},o)).slice(1),u=await t._getAdditionalHeaders();u["Content-Type"]="application/json",t.languageCode&&(u["X-Firebase-Locale"]=t.languageCode);const h=Object.assign({method:e,headers:u},i);return BS()||(h.referrerPolicy="no-referrer"),K_.fetch()(Q_(t,t.config.apiHost,n,l),h)})}async function Y_(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},yC),e);try{const s=new wC(t),i=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw Aa(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const l=i.ok?o.errorMessage:o.error.message,[u,h]=l.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw Aa(t,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw Aa(t,"email-already-in-use",o);if(u==="USER_DISABLED")throw Aa(t,"user-disabled",o);const m=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw q_(t,m,h);Kt(t,m)}}catch(s){if(s instanceof Yt)throw s;Kt(t,"network-request-failed",{message:String(s)})}}async function Ho(t,e,n,r,s={}){const i=await An(t,e,n,r,s);return"mfaPendingCredential"in i&&Kt(t,"multi-factor-auth-required",{_serverResponse:i}),i}function Q_(t,e,n,r){const s=`${e}${n}?${r}`;return t.config.emulator?Sf(t.config,s):`${t.config.apiScheme}://${s}`}function xC(t){switch(t){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class wC{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(rn(this.auth,"network-request-failed")),_C.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Aa(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=rn(t,e,r);return s.customData._tokenResponse=n,s}function Fg(t){return t!==void 0&&t.enterprise!==void 0}class EC{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===e)return xC(n.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}async function kC(t,e){return An(t,"GET","/v2/recaptchaConfig",_r(t,e))}/**
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
 */async function SC(t,e){return An(t,"POST","/v1/accounts:delete",e)}async function X_(t,e){return An(t,"POST","/v1/accounts:lookup",e)}/**
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
 */function Ki(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function NC(t,e=!1){const n=Oe(t),r=await n.getIdToken(e),s=Nf(r);W(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:Ki($u(s.auth_time)),issuedAtTime:Ki($u(s.iat)),expirationTime:Ki($u(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function $u(t){return Number(t)*1e3}function Nf(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return Qa("JWT malformed, contained fewer than 3 sections"),null;try{const s=Tl(n);return s?JSON.parse(s):(Qa("Failed to decode base64 JWT payload"),null)}catch(s){return Qa("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Ug(t){const e=Nf(t);return W(e,"internal-error"),W(typeof e.exp<"u","internal-error"),W(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function Ws(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof Yt&&CC(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function CC({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
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
 */class IC{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class th{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ki(this.lastLoginAt),this.creationTime=Ki(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Al(t){var e;const n=t.auth,r=await t.getIdToken(),s=await Ws(t,X_(n,{idToken:r}));W(s==null?void 0:s.users.length,n,"internal-error");const i=s.users[0];t._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?J_(i.providerUserInfo):[],l=bC(t.providerData,o),u=t.isAnonymous,h=!(t.email&&i.passwordHash)&&!(l!=null&&l.length),m=u?h:!1,p={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:l,metadata:new th(i.createdAt,i.lastLoginAt),isAnonymous:m};Object.assign(t,p)}async function TC(t){const e=Oe(t);await Al(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function bC(t,e){return[...t.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function J_(t){return t.map(e=>{var{providerId:n}=e,r=Ef(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
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
 */async function RC(t,e){const n=await Y_(t,{},async()=>{const r=ni({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=t.config,o=Q_(t,s,"/v1/token",`key=${i}`),l=await t._getAdditionalHeaders();return l["Content-Type"]="application/x-www-form-urlencoded",K_.fetch()(o,{method:"POST",headers:l,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function PC(t,e){return An(t,"POST","/v2/accounts:revokeToken",_r(t,e))}/**
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
 */class Rs{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){W(e.idToken,"internal-error"),W(typeof e.idToken<"u","internal-error"),W(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Ug(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){W(e.length!==0,"internal-error");const n=Ug(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(W(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:s,expiresIn:i}=await RC(e,n);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:s,expirationTime:i}=n,o=new Rs;return r&&(W(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(W(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(W(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Rs,this.toJSON())}_performRefresh(){return vn("not implemented")}}/**
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
 */function Fn(t,e){W(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class yn{constructor(e){var{uid:n,auth:r,stsTokenManager:s}=e,i=Ef(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new IC(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new th(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await Ws(this,this.stsTokenManager.getToken(this.auth,e));return W(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return NC(this,e)}reload(){return TC(this)}_assign(e){this!==e&&(W(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new yn(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){W(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await Al(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(en(this.auth.app))return Promise.reject(En(this.auth));const e=await this.getIdToken();return await Ws(this,SC(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,s,i,o,l,u,h,m;const p=(r=n.displayName)!==null&&r!==void 0?r:void 0,v=(s=n.email)!==null&&s!==void 0?s:void 0,T=(i=n.phoneNumber)!==null&&i!==void 0?i:void 0,I=(o=n.photoURL)!==null&&o!==void 0?o:void 0,A=(l=n.tenantId)!==null&&l!==void 0?l:void 0,O=(u=n._redirectEventId)!==null&&u!==void 0?u:void 0,S=(h=n.createdAt)!==null&&h!==void 0?h:void 0,E=(m=n.lastLoginAt)!==null&&m!==void 0?m:void 0,{uid:C,emailVerified:j,isAnonymous:L,providerData:M,stsTokenManager:x}=n;W(C&&x,e,"internal-error");const y=Rs.fromJSON(this.name,x);W(typeof C=="string",e,"internal-error"),Fn(p,e.name),Fn(v,e.name),W(typeof j=="boolean",e,"internal-error"),W(typeof L=="boolean",e,"internal-error"),Fn(T,e.name),Fn(I,e.name),Fn(A,e.name),Fn(O,e.name),Fn(S,e.name),Fn(E,e.name);const _=new yn({uid:C,auth:e,email:v,emailVerified:j,displayName:p,isAnonymous:L,photoURL:I,phoneNumber:T,tenantId:A,stsTokenManager:y,createdAt:S,lastLoginAt:E});return M&&Array.isArray(M)&&(_.providerData=M.map(k=>Object.assign({},k))),O&&(_._redirectEventId=O),_}static async _fromIdTokenResponse(e,n,r=!1){const s=new Rs;s.updateFromServerResponse(n);const i=new yn({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Al(i),i}static async _fromGetAccountInfoResponse(e,n,r){const s=n.users[0];W(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?J_(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),l=new Rs;l.updateFromIdToken(r);const u=new yn({uid:s.localId,auth:e,stsTokenManager:l,isAnonymous:o}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new th(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(u,h),u}}/**
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
 */const zg=new Map;function _n(t){bn(t instanceof Function,"Expected a class definition");let e=zg.get(t);return e?(bn(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,zg.set(t,e),e)}/**
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
 */class Z_{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Z_.type="NONE";const Vg=Z_;/**
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
 */function Xa(t,e,n){return`firebase:${t}:${e}:${n}`}class Ps{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=Xa(this.userKey,s.apiKey,i),this.fullPersistenceKey=Xa("persistence",s.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?yn._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new Ps(_n(Vg),e,r);const s=(await Promise.all(n.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||_n(Vg);const o=Xa(r,e.config.apiKey,e.name);let l=null;for(const h of n)try{const m=await h._get(o);if(m){const p=yn._fromJSON(e,m);h!==i&&(l=p),i=h;break}}catch{}const u=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new Ps(i,e,r):(i=u[0],l&&await i._set(o,l.toJSON()),await Promise.all(n.map(async h=>{if(h!==i)try{await h._remove(o)}catch{}})),new Ps(i,e,r))}}/**
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
 */function $g(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(rx(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(ex(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(ix(e))return"Blackberry";if(ox(e))return"Webos";if(tx(e))return"Safari";if((e.includes("chrome/")||nx(e))&&!e.includes("edge/"))return"Chrome";if(sx(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function ex(t=st()){return/firefox\//i.test(t)}function tx(t=st()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function nx(t=st()){return/crios\//i.test(t)}function rx(t=st()){return/iemobile/i.test(t)}function sx(t=st()){return/android/i.test(t)}function ix(t=st()){return/blackberry/i.test(t)}function ox(t=st()){return/webos/i.test(t)}function Cf(t=st()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function AC(t=st()){var e;return Cf(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function jC(){return HS()&&document.documentMode===10}function ax(t=st()){return Cf(t)||sx(t)||ox(t)||ix(t)||/windows phone/i.test(t)||rx(t)}/**
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
 */function lx(t,e=[]){let n;switch(t){case"Browser":n=$g(st());break;case"Worker":n=`${$g(st())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Qr}/${r}`}/**
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
 */class OC{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=i=>new Promise((o,l)=>{try{const u=e(i);o(u)}catch(u){l(u)}});r.onAbort=n,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
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
 */async function DC(t,e={}){return An(t,"GET","/v2/passwordPolicy",_r(t,e))}/**
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
 */const LC=6;class MC{constructor(e){var n,r,s,i;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=o.minPasswordLength)!==null&&n!==void 0?n:LC,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,s,i,o,l;const u={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,u),this.validatePasswordCharacterOptions(e,u),u.isValid&&(u.isValid=(n=u.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),u.isValid&&(u.isValid=(r=u.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),u.isValid&&(u.isValid=(s=u.containsLowercaseLetter)!==null&&s!==void 0?s:!0),u.isValid&&(u.isValid=(i=u.containsUppercaseLetter)!==null&&i!==void 0?i:!0),u.isValid&&(u.isValid=(o=u.containsNumericCharacter)!==null&&o!==void 0?o:!0),u.isValid&&(u.isValid=(l=u.containsNonAlphanumericCharacter)!==null&&l!==void 0?l:!0),u}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
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
 */class FC{constructor(e,n,r,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Bg(this),this.idTokenSubscription=new Bg(this),this.beforeStateQueue=new OC(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=G_,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=_n(n)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await Ps.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await X_(this,{idToken:e}),r=await yn._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(en(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(l,l))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,l=s==null?void 0:s._redirectEventId,u=await this.tryRedirectSignIn(e);(!o||o===l)&&(u!=null&&u.user)&&(s=u.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return W(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Al(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=vC()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(en(this.app))return Promise.reject(En(this));const n=e?Oe(e):null;return n&&W(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&W(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return en(this.app)?Promise.reject(En(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return en(this.app)?Promise.reject(En(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(_n(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await DC(this),n=new MC(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Yr("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await PC(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&_n(e)||this._popupRedirectResolver;W(n,this,"argument-error"),this.redirectPersistenceManager=await Ps.create(this,[_n(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,s){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let o=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(W(l,this,"internal-error"),l.then(()=>{o||i(this.currentUser)}),typeof n=="function"){const u=e.addObserver(n,r,s);return()=>{o=!0,u()}}else{const u=e.addObserver(n);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return W(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=lx(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(n["X-Firebase-AppCheck"]=s),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&pC(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function Xr(t){return Oe(t)}class Bg{constructor(e){this.auth=e,this.observer=null,this.addObserver=ZS(n=>this.observer=n)}get next(){return W(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let kc={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function UC(t){kc=t}function cx(t){return kc.loadJS(t)}function zC(){return kc.recaptchaEnterpriseScript}function VC(){return kc.gapiScript}function $C(t){return`__${t}${Math.floor(Math.random()*1e6)}`}const BC="recaptcha-enterprise",HC="NO_RECAPTCHA";class WC{constructor(e){this.type=BC,this.auth=Xr(e)}async verify(e="verify",n=!1){async function r(i){if(!n){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,l)=>{kC(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)l(new Error("recaptcha Enterprise site key undefined"));else{const h=new EC(u);return i.tenantId==null?i._agentRecaptchaConfig=h:i._tenantRecaptchaConfigs[i.tenantId]=h,o(h.siteKey)}}).catch(u=>{l(u)})})}function s(i,o,l){const u=window.grecaptcha;Fg(u)?u.enterprise.ready(()=>{u.enterprise.execute(i,{action:e}).then(h=>{o(h)}).catch(()=>{o(HC)})}):l(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((i,o)=>{r(this.auth).then(l=>{if(!n&&Fg(window.grecaptcha))s(l,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let u=zC();u.length!==0&&(u+=l),cx(u).then(()=>{s(l,i,o)}).catch(h=>{o(h)})}}).catch(l=>{o(l)})})}}async function Hg(t,e,n,r=!1){const s=new WC(t);let i;try{i=await s.verify(n)}catch{i=await s.verify(n,!0)}const o=Object.assign({},e);return r?Object.assign(o,{captchaResp:i}):Object.assign(o,{captchaResponse:i}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function nh(t,e,n,r){var s;if(!((s=t._getRecaptchaConfig())===null||s===void 0)&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const i=await Hg(t,e,n,n==="getOobCode");return r(t,i)}else return r(t,e).catch(async i=>{if(i.code==="auth/missing-recaptcha-token"){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await Hg(t,e,n,n==="getOobCode");return r(t,o)}else return Promise.reject(i)})}/**
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
 */function GC(t,e){const n=yr(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),i=n.getOptions();if(ko(i,e??{}))return s;Kt(s,"already-initialized")}return n.initialize({options:e})}function qC(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(_n);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function KC(t,e,n){const r=Xr(t);W(r._canInitEmulator,r,"emulator-config-failed"),W(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=ux(e),{host:o,port:l}=YC(e),u=l===null?"":`:${l}`;r.config.emulator={url:`${i}//${o}${u}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:l,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})}),QC()}function ux(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function YC(t){const e=ux(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:Wg(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:Wg(o)}}}function Wg(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function QC(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
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
 */class If{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return vn("not implemented")}_getIdTokenResponse(e){return vn("not implemented")}_linkToIdToken(e,n){return vn("not implemented")}_getReauthenticationResolver(e){return vn("not implemented")}}async function XC(t,e){return An(t,"POST","/v1/accounts:signUp",e)}/**
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
 */async function JC(t,e){return Ho(t,"POST","/v1/accounts:signInWithPassword",_r(t,e))}/**
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
 */async function ZC(t,e){return Ho(t,"POST","/v1/accounts:signInWithEmailLink",_r(t,e))}async function eI(t,e){return Ho(t,"POST","/v1/accounts:signInWithEmailLink",_r(t,e))}/**
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
 */class No extends If{constructor(e,n,r,s=null){super("password",r),this._email=e,this._password=n,this._tenantId=s}static _fromEmailAndPassword(e,n){return new No(e,n,"password")}static _fromEmailAndCode(e,n,r=null){return new No(e,n,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return nh(e,n,"signInWithPassword",JC);case"emailLink":return ZC(e,{email:this._email,oobCode:this._password});default:Kt(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":const r={idToken:n,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return nh(e,r,"signUpPassword",XC);case"emailLink":return eI(e,{idToken:n,email:this._email,oobCode:this._password});default:Kt(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */async function As(t,e){return Ho(t,"POST","/v1/accounts:signInWithIdp",_r(t,e))}/**
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
 */const tI="http://localhost";class zr extends If{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new zr(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):Kt("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=n,i=Ef(n,["providerId","signInMethod"]);if(!r||!s)return null;const o=new zr(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return As(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,As(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,As(e,n)}buildRequest(){const e={requestUri:tI,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=ni(n)}return e}}/**
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
 */function nI(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function rI(t){const e=Mi(Fi(t)).link,n=e?Mi(Fi(e)).deep_link_id:null,r=Mi(Fi(t)).deep_link_id;return(r?Mi(Fi(r)).link:null)||r||n||e||t}class Tf{constructor(e){var n,r,s,i,o,l;const u=Mi(Fi(e)),h=(n=u.apiKey)!==null&&n!==void 0?n:null,m=(r=u.oobCode)!==null&&r!==void 0?r:null,p=nI((s=u.mode)!==null&&s!==void 0?s:null);W(h&&m&&p,"argument-error"),this.apiKey=h,this.operation=p,this.code=m,this.continueUrl=(i=u.continueUrl)!==null&&i!==void 0?i:null,this.languageCode=(o=u.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(l=u.tenantId)!==null&&l!==void 0?l:null}static parseLink(e){const n=rI(e);try{return new Tf(n)}catch{return null}}}/**
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
 */class ri{constructor(){this.providerId=ri.PROVIDER_ID}static credential(e,n){return No._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const r=Tf.parseLink(n);return W(r,"argument-error"),No._fromEmailAndCode(e,r.code,r.tenantId)}}ri.PROVIDER_ID="password";ri.EMAIL_PASSWORD_SIGN_IN_METHOD="password";ri.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class dx{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class Wo extends dx{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class Bn extends Wo{constructor(){super("facebook.com")}static credential(e){return zr._fromParams({providerId:Bn.PROVIDER_ID,signInMethod:Bn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Bn.credentialFromTaggedObject(e)}static credentialFromError(e){return Bn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Bn.credential(e.oauthAccessToken)}catch{return null}}}Bn.FACEBOOK_SIGN_IN_METHOD="facebook.com";Bn.PROVIDER_ID="facebook.com";/**
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
 */class Hn extends Wo{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return zr._fromParams({providerId:Hn.PROVIDER_ID,signInMethod:Hn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Hn.credentialFromTaggedObject(e)}static credentialFromError(e){return Hn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return Hn.credential(n,r)}catch{return null}}}Hn.GOOGLE_SIGN_IN_METHOD="google.com";Hn.PROVIDER_ID="google.com";/**
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
 */class Wn extends Wo{constructor(){super("github.com")}static credential(e){return zr._fromParams({providerId:Wn.PROVIDER_ID,signInMethod:Wn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Wn.credentialFromTaggedObject(e)}static credentialFromError(e){return Wn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Wn.credential(e.oauthAccessToken)}catch{return null}}}Wn.GITHUB_SIGN_IN_METHOD="github.com";Wn.PROVIDER_ID="github.com";/**
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
 */class Gn extends Wo{constructor(){super("twitter.com")}static credential(e,n){return zr._fromParams({providerId:Gn.PROVIDER_ID,signInMethod:Gn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Gn.credentialFromTaggedObject(e)}static credentialFromError(e){return Gn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return Gn.credential(n,r)}catch{return null}}}Gn.TWITTER_SIGN_IN_METHOD="twitter.com";Gn.PROVIDER_ID="twitter.com";/**
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
 */async function sI(t,e){return Ho(t,"POST","/v1/accounts:signUp",_r(t,e))}/**
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
 */class Vr{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,s=!1){const i=await yn._fromIdTokenResponse(e,r,s),o=Gg(r);return new Vr({user:i,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const s=Gg(r);return new Vr({user:e,providerId:s,_tokenResponse:r,operationType:n})}}function Gg(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
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
 */class jl extends Yt{constructor(e,n,r,s){var i;super(n.code,n.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,jl.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,s){return new jl(e,n,r,s)}}function hx(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?jl._fromErrorAndOperation(t,i,e,r):i})}async function iI(t,e,n=!1){const r=await Ws(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Vr._forOperation(t,"link",r)}/**
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
 */async function oI(t,e,n=!1){const{auth:r}=t;if(en(r.app))return Promise.reject(En(r));const s="reauthenticate";try{const i=await Ws(t,hx(r,s,e,t),n);W(i.idToken,r,"internal-error");const o=Nf(i.idToken);W(o,r,"internal-error");const{sub:l}=o;return W(t.uid===l,r,"user-mismatch"),Vr._forOperation(t,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&Kt(r,"user-mismatch"),i}}/**
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
 */async function fx(t,e,n=!1){if(en(t.app))return Promise.reject(En(t));const r="signIn",s=await hx(t,r,e),i=await Vr._fromIdTokenResponse(t,r,s);return n||await t._updateCurrentUser(i.user),i}async function aI(t,e){return fx(Xr(t),e)}/**
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
 */async function px(t){const e=Xr(t);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function lI(t,e,n){if(en(t.app))return Promise.reject(En(t));const r=Xr(t),o=await nh(r,{returnSecureToken:!0,email:e,password:n,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",sI).catch(u=>{throw u.code==="auth/password-does-not-meet-requirements"&&px(t),u}),l=await Vr._fromIdTokenResponse(r,"signIn",o);return await r._updateCurrentUser(l.user),l}function cI(t,e,n){return en(t.app)?Promise.reject(En(t)):aI(Oe(t),ri.credential(e,n)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&px(t),r})}/**
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
 */async function uI(t,e){return An(t,"POST","/v1/accounts:update",e)}/**
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
 */async function dI(t,{displayName:e,photoURL:n}){if(e===void 0&&n===void 0)return;const r=Oe(t),i={idToken:await r.getIdToken(),displayName:e,photoUrl:n,returnSecureToken:!0},o=await Ws(r,uI(r.auth,i));r.displayName=o.displayName||null,r.photoURL=o.photoUrl||null;const l=r.providerData.find(({providerId:u})=>u==="password");l&&(l.displayName=r.displayName,l.photoURL=r.photoURL),await r._updateTokensIfNecessary(o)}function hI(t,e,n,r){return Oe(t).onIdTokenChanged(e,n,r)}function fI(t,e,n){return Oe(t).beforeAuthStateChanged(e,n)}function pI(t,e,n,r){return Oe(t).onAuthStateChanged(e,n,r)}function mI(t){return Oe(t).signOut()}const Ol="__sak";/**
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
 */class mx{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Ol,"1"),this.storage.removeItem(Ol),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const gI=1e3,vI=10;class gx extends mx{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=ax(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),s=this.localCache[n];r!==s&&e(n,s,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,l,u)=>{this.notifyListeners(o,u)});return}const r=e.key;n?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);jC()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,vI):s()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},gI)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}gx.type="LOCAL";const yI=gx;/**
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
 */class vx extends mx{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}vx.type="SESSION";const yx=vx;/**
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
 */function _I(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
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
 */class Sc{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const r=new Sc(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:s,data:i}=n.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const l=Array.from(o).map(async h=>h(n.origin,i)),u=await _I(l);n.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Sc.receivers=[];/**
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
 */function bf(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
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
 */class xI{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((l,u)=>{const h=bf("",20);s.port1.start();const m=setTimeout(()=>{u(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(p){const v=p;if(v.data.eventId===h)switch(v.data.status){case"ack":clearTimeout(m),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),l(v.data.response);break;default:clearTimeout(m),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:h,data:n},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function sn(){return window}function wI(t){sn().location.href=t}/**
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
 */function _x(){return typeof sn().WorkerGlobalScope<"u"&&typeof sn().importScripts=="function"}async function EI(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function kI(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function SI(){return _x()?self:null}/**
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
 */const xx="firebaseLocalStorageDb",NI=1,Dl="firebaseLocalStorage",wx="fbase_key";class Go{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function Nc(t,e){return t.transaction([Dl],e?"readwrite":"readonly").objectStore(Dl)}function CI(){const t=indexedDB.deleteDatabase(xx);return new Go(t).toPromise()}function rh(){const t=indexedDB.open(xx,NI);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(Dl,{keyPath:wx})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(Dl)?e(r):(r.close(),await CI(),e(await rh()))})})}async function qg(t,e,n){const r=Nc(t,!0).put({[wx]:e,value:n});return new Go(r).toPromise()}async function II(t,e){const n=Nc(t,!1).get(e),r=await new Go(n).toPromise();return r===void 0?null:r.value}function Kg(t,e){const n=Nc(t,!0).delete(e);return new Go(n).toPromise()}const TI=800,bI=3;class Ex{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await rh(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>bI)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return _x()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Sc._getInstance(SI()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await EI(),!this.activeServiceWorker)return;this.sender=new xI(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||kI()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await rh();return await qg(e,Ol,"1"),await Kg(e,Ol),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>qg(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>II(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Kg(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Nc(s,!1).getAll();return new Go(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),TI)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Ex.type="LOCAL";const RI=Ex;new Bo(3e4,6e4);/**
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
 */function PI(t,e){return e?_n(e):(W(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
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
 */class Rf extends If{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return As(e,this._buildIdpRequest())}_linkToIdToken(e,n){return As(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return As(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function AI(t){return fx(t.auth,new Rf(t),t.bypassAuthState)}function jI(t){const{auth:e,user:n}=t;return W(n,e,"internal-error"),oI(n,new Rf(t),t.bypassAuthState)}async function OI(t){const{auth:e,user:n}=t;return W(n,e,"internal-error"),iI(n,new Rf(t),t.bypassAuthState)}/**
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
 */class kx{constructor(e,n,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:s,tenantId:i,error:o,type:l}=e;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:n,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(u))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return AI;case"linkViaPopup":case"linkViaRedirect":return OI;case"reauthViaPopup":case"reauthViaRedirect":return jI;default:Kt(this.auth,"internal-error")}}resolve(e){bn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){bn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const DI=new Bo(2e3,1e4);class Es extends kx{constructor(e,n,r,s,i){super(e,n,s,i),this.provider=r,this.authWindow=null,this.pollId=null,Es.currentPopupAction&&Es.currentPopupAction.cancel(),Es.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return W(e,this.auth,"internal-error"),e}async onExecution(){bn(this.filter.length===1,"Popup operations only handle one event");const e=bf();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(rn(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(rn(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Es.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(rn(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,DI.get())};e()}}Es.currentPopupAction=null;/**
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
 */const LI="pendingRedirect",Ja=new Map;class MI extends kx{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=Ja.get(this.auth._key());if(!e){try{const r=await FI(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}Ja.set(this.auth._key(),e)}return this.bypassAuthState||Ja.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function FI(t,e){const n=VI(e),r=zI(t);if(!await r._isAvailable())return!1;const s=await r._get(n)==="true";return await r._remove(n),s}function UI(t,e){Ja.set(t._key(),e)}function zI(t){return _n(t._redirectPersistence)}function VI(t){return Xa(LI,t.config.apiKey,t.name)}async function $I(t,e,n=!1){if(en(t.app))return Promise.reject(En(t));const r=Xr(t),s=PI(r,e),o=await new MI(r,s,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
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
 */const BI=10*60*1e3;class HI{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!WI(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!Sx(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(rn(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=BI&&this.cachedEventUids.clear(),this.cachedEventUids.has(Yg(e))}saveEventToCache(e){this.cachedEventUids.add(Yg(e)),this.lastProcessedEventTime=Date.now()}}function Yg(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function Sx({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function WI(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Sx(t);default:return!1}}/**
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
 */async function GI(t,e={}){return An(t,"GET","/v1/projects",e)}/**
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
 */const qI=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,KI=/^https?/;async function YI(t){if(t.config.emulator)return;const{authorizedDomains:e}=await GI(t);for(const n of e)try{if(QI(n))return}catch{}Kt(t,"unauthorized-domain")}function QI(t){const e=eh(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!KI.test(n))return!1;if(qI.test(t))return r===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
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
 */const XI=new Bo(3e4,6e4);function Qg(){const t=sn().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function JI(t){return new Promise((e,n)=>{var r,s,i;function o(){Qg(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Qg(),n(rn(t,"network-request-failed"))},timeout:XI.get()})}if(!((s=(r=sn().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=sn().gapi)===null||i===void 0)&&i.load)o();else{const l=$C("iframefcb");return sn()[l]=()=>{gapi.load?o():n(rn(t,"network-request-failed"))},cx(`${VC()}?onload=${l}`).catch(u=>n(u))}}).catch(e=>{throw Za=null,e})}let Za=null;function ZI(t){return Za=Za||JI(t),Za}/**
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
 */const e2=new Bo(5e3,15e3),t2="__/auth/iframe",n2="emulator/auth/iframe",r2={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},s2=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function i2(t){const e=t.config;W(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Sf(e,n2):`https://${t.config.authDomain}/${t2}`,r={apiKey:e.apiKey,appName:t.name,v:Qr},s=s2.get(t.config.apiHost);s&&(r.eid=s);const i=t._getFrameworks();return i.length&&(r.fw=i.join(",")),`${n}?${ni(r).slice(1)}`}async function o2(t){const e=await ZI(t),n=sn().gapi;return W(n,t,"internal-error"),e.open({where:document.body,url:i2(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:r2,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=rn(t,"network-request-failed"),l=sn().setTimeout(()=>{i(o)},e2.get());function u(){sn().clearTimeout(l),s(r)}r.ping(u).then(u,()=>{i(o)})}))}/**
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
 */const a2={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},l2=500,c2=600,u2="_blank",d2="http://localhost";class Xg{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function h2(t,e,n,r=l2,s=c2){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const u=Object.assign(Object.assign({},a2),{width:r.toString(),height:s.toString(),top:i,left:o}),h=st().toLowerCase();n&&(l=nx(h)?u2:n),ex(h)&&(e=e||d2,u.scrollbars="yes");const m=Object.entries(u).reduce((v,[T,I])=>`${v}${T}=${I},`,"");if(AC(h)&&l!=="_self")return f2(e||"",l),new Xg(null);const p=window.open(e||"",l,m);W(p,t,"popup-blocked");try{p.focus()}catch{}return new Xg(p)}function f2(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
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
 */const p2="__/auth/handler",m2="emulator/auth/handler",g2=encodeURIComponent("fac");async function Jg(t,e,n,r,s,i){W(t.config.authDomain,t,"auth-domain-config-required"),W(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:Qr,eventId:s};if(e instanceof dx){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",Kd(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[m,p]of Object.entries({}))o[m]=p}if(e instanceof Wo){const m=e.getScopes().filter(p=>p!=="");m.length>0&&(o.scopes=m.join(","))}t.tenantId&&(o.tid=t.tenantId);const l=o;for(const m of Object.keys(l))l[m]===void 0&&delete l[m];const u=await t._getAppCheckToken(),h=u?`#${g2}=${encodeURIComponent(u)}`:"";return`${v2(t)}?${ni(l).slice(1)}${h}`}function v2({config:t}){return t.emulator?Sf(t,m2):`https://${t.authDomain}/${p2}`}/**
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
 */const Bu="webStorageSupport";class y2{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=yx,this._completeRedirectFn=$I,this._overrideRedirectResult=UI}async _openPopup(e,n,r,s){var i;bn((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=await Jg(e,n,r,eh(),s);return h2(e,o,bf())}async _openRedirect(e,n,r,s){await this._originValidation(e);const i=await Jg(e,n,r,eh(),s);return wI(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:i}=this.eventManagers[n];return s?Promise.resolve(s):(bn(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await o2(e),r=new HI(e);return n.register("authEvent",s=>(W(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Bu,{type:Bu},s=>{var i;const o=(i=s==null?void 0:s[0])===null||i===void 0?void 0:i[Bu];o!==void 0&&n(!!o),Kt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=YI(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return ax()||tx()||Cf()}}const _2=y2;var Zg="@firebase/auth",e0="1.7.9";/**
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
 */class x2{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){W(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function w2(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function E2(t){qt(new jt("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:l}=r.options;W(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:o,authDomain:l,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:lx(t)},h=new FC(r,s,i,u);return qC(h,n),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),qt(new jt("auth-internal",e=>{const n=Xr(e.getProvider("auth").getImmediate());return(r=>new x2(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),mt(Zg,e0,w2(t)),mt(Zg,e0,"esm2017")}/**
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
 */const k2=5*60,S2=A_("authIdTokenMaxAge")||k2;let t0=null;const N2=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>S2)return;const s=n==null?void 0:n.token;t0!==s&&(t0=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function C2(t=Ec()){const e=yr(t,"auth");if(e.isInitialized())return e.getImmediate();const n=GC(t,{popupRedirectResolver:_2,persistence:[RI,yI,yx]}),r=A_("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=N2(i.toString());fI(n,o,()=>o(n.currentUser)),hI(n,l=>o(l))}}const s=b_("auth");return s&&KC(n,`http://${s}`),n}function I2(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}UC({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=s=>{const i=rn("internal-error");i.customData=s,n(i)},r.type="text/javascript",r.charset="UTF-8",I2().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});E2("Browser");var T2="firebase",b2="10.14.1";/**
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
 */mt(T2,b2,"app");var n0={};const r0="@firebase/database",s0="1.0.8";/**
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
 */let Nx="";function R2(t){Nx=t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P2{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),Te(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:Eo(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A2{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return on(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cx=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new P2(e)}}catch{}return new A2},Rr=Cx("localStorage"),j2=Cx("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const js=new $o("@firebase/database"),O2=function(){let t=1;return function(){return t++}}(),Ix=function(t){const e=nN(t),n=new JS;n.update(e);const r=n.digest();return yf.encodeByteArray(r)},qo=function(...t){let e="";for(let n=0;n<t.length;n++){const r=t[n];Array.isArray(r)||r&&typeof r=="object"&&typeof r.length=="number"?e+=qo.apply(null,r):typeof r=="object"?e+=Te(r):e+=r,e+=" "}return e};let Yi=null,i0=!0;const D2=function(t,e){F(!0,"Can't turn on custom loggers persistently."),js.logLevel=re.VERBOSE,Yi=js.log.bind(js)},Ue=function(...t){if(i0===!0&&(i0=!1,Yi===null&&j2.get("logging_enabled")===!0&&D2()),Yi){const e=qo.apply(null,t);Yi(e)}},Ko=function(t){return function(...e){Ue(t,...e)}},sh=function(...t){const e="FIREBASE INTERNAL ERROR: "+qo(...t);js.error(e)},Rn=function(...t){const e=`FIREBASE FATAL ERROR: ${qo(...t)}`;throw js.error(e),new Error(e)},rt=function(...t){const e="FIREBASE WARNING: "+qo(...t);js.warn(e)},L2=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&rt("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Pf=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},M2=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},Gs="[MIN_NAME]",$r="[MAX_NAME]",Jr=function(t,e){if(t===e)return 0;if(t===Gs||e===$r)return-1;if(e===Gs||t===$r)return 1;{const n=o0(t),r=o0(e);return n!==null?r!==null?n-r===0?t.length-e.length:n-r:-1:r!==null?1:t<e?-1:1}},F2=function(t,e){return t===e?0:t<e?-1:1},Ti=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+Te(e))},Af=function(t){if(typeof t!="object"||t===null)return Te(t);const e=[];for(const r in t)e.push(r);e.sort();let n="{";for(let r=0;r<e.length;r++)r!==0&&(n+=","),n+=Te(e[r]),n+=":",n+=Af(t[e[r]]);return n+="}",n},Tx=function(t,e){const n=t.length;if(n<=e)return[t];const r=[];for(let s=0;s<n;s+=e)s+e>n?r.push(t.substring(s,n)):r.push(t.substring(s,s+e));return r};function $e(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const bx=function(t){F(!Pf(t),"Invalid JSON number");const e=11,n=52,r=(1<<e-1)-1;let s,i,o,l,u;t===0?(i=0,o=0,s=1/t===-1/0?1:0):(s=t<0,t=Math.abs(t),t>=Math.pow(2,1-r)?(l=Math.min(Math.floor(Math.log(t)/Math.LN2),r),i=l+r,o=Math.round(t*Math.pow(2,n-l)-Math.pow(2,n))):(i=0,o=Math.round(t/Math.pow(2,1-r-n))));const h=[];for(u=n;u;u-=1)h.push(o%2?1:0),o=Math.floor(o/2);for(u=e;u;u-=1)h.push(i%2?1:0),i=Math.floor(i/2);h.push(s?1:0),h.reverse();const m=h.join("");let p="";for(u=0;u<64;u+=8){let v=parseInt(m.substr(u,8),2).toString(16);v.length===1&&(v="0"+v),p=p+v}return p.toLowerCase()},U2=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},z2=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function V2(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const r=new Error(t+" at "+e._path.toString()+": "+n);return r.code=t.toUpperCase(),r}const $2=new RegExp("^-?(0*)\\d{1,10}$"),B2=-2147483648,H2=2147483647,o0=function(t){if($2.test(t)){const e=Number(t);if(e>=B2&&e<=H2)return e}return null},si=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw rt("Exception was thrown by user callback.",n),e},Math.floor(0))}},W2=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Qi=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
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
 */class G2{constructor(e,n){this.appName_=e,this.appCheckProvider=n,this.appCheck=n==null?void 0:n.getImmediate({optional:!0}),this.appCheck||n==null||n.get().then(r=>this.appCheck=r)}getToken(e){return this.appCheck?this.appCheck.getToken(e):new Promise((n,r)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,r):n(null)},0)})}addTokenChangeListener(e){var n;(n=this.appCheckProvider)===null||n===void 0||n.get().then(r=>r.addTokenListener(e))}notifyForInvalidToken(){rt(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q2{constructor(e,n,r){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=r,this.auth_=null,this.auth_=r.getImmediate({optional:!0}),this.auth_||r.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(Ue("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,r)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,r):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',rt(e)}}class el{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}el.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jf="5",Rx="v",Px="s",Ax="r",jx="f",Ox=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Dx="ls",Lx="p",ih="ac",Mx="websocket",Fx="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ux{constructor(e,n,r,s,i=!1,o="",l=!1,u=!1){this.secure=n,this.namespace=r,this.webSocketOnly=s,this.nodeAdmin=i,this.persistenceKey=o,this.includeNamespaceInQueryParams=l,this.isUsingEmulator=u,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=Rr.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&Rr.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function K2(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function zx(t,e,n){F(typeof e=="string","typeof type must == string"),F(typeof n=="object","typeof params must == object");let r;if(e===Mx)r=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===Fx)r=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);K2(t)&&(n.ns=t.namespace);const s=[];return $e(n,(i,o)=>{s.push(i+"="+o)}),r+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y2{constructor(){this.counters_={}}incrementCounter(e,n=1){on(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return MS(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hu={},Wu={};function Of(t){const e=t.toString();return Hu[e]||(Hu[e]=new Y2),Hu[e]}function Q2(t,e){const n=t.toString();return Wu[n]||(Wu[n]=e()),Wu[n]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X2{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const r=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<r.length;++s)r[s]&&si(()=>{this.onMessage_(r[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const a0="start",J2="close",Z2="pLPCommand",eT="pRTLPCB",Vx="id",$x="pw",Bx="ser",tT="cb",nT="seg",rT="ts",sT="d",iT="dframe",Hx=1870,Wx=30,oT=Hx-Wx,aT=25e3,lT=3e4;class ks{constructor(e,n,r,s,i,o,l){this.connId=e,this.repoInfo=n,this.applicationId=r,this.appCheckToken=s,this.authToken=i,this.transportSessionId=o,this.lastSessionId=l,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Ko(e),this.stats_=Of(n),this.urlFn=u=>(this.appCheckToken&&(u[ih]=this.appCheckToken),zx(n,Fx,u))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new X2(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(lT)),M2(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Df((...i)=>{const[o,l,u,h,m]=i;if(this.incrementIncomingBytes_(i),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===a0)this.id=l,this.password=u;else if(o===J2)l?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(l,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...i)=>{const[o,l]=i;this.incrementIncomingBytes_(i),this.myPacketOrderer.handleResponse(o,l)},()=>{this.onClosed_()},this.urlFn);const r={};r[a0]="t",r[Bx]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(r[tT]=this.scriptTagHolder.uniqueCallbackIdentifier),r[Rx]=jf,this.transportSessionId&&(r[Px]=this.transportSessionId),this.lastSessionId&&(r[Dx]=this.lastSessionId),this.applicationId&&(r[Lx]=this.applicationId),this.appCheckToken&&(r[ih]=this.appCheckToken),typeof location<"u"&&location.hostname&&Ox.test(location.hostname)&&(r[Ax]=jx);const s=this.urlFn(r);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){ks.forceAllow_=!0}static forceDisallow(){ks.forceDisallow_=!0}static isAvailable(){return ks.forceAllow_?!0:!ks.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!U2()&&!z2()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=Te(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const r=I_(n),s=Tx(r,oT);for(let i=0;i<s.length;i++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[i]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const r={};r[iT]="t",r[Vx]=e,r[$x]=n,this.myDisconnFrame.src=this.urlFn(r),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=Te(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class Df{constructor(e,n,r,s){this.onDisconnect=r,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=O2(),window[Z2+this.uniqueCallbackIdentifier]=e,window[eT+this.uniqueCallbackIdentifier]=n,this.myIFrame=Df.createIFrame_();let i="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(i='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+i+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(l){Ue("frame writing exception"),l.stack&&Ue(l.stack),Ue(l)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||Ue("No IE domain setting required")}catch{const r=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+r+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Vx]=this.myID,e[$x]=this.myPW,e[Bx]=this.currentSerial;let n=this.urlFn(e),r="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Wx+r.length<=Hx;){const o=this.pendingSegs.shift();r=r+"&"+nT+s+"="+o.seg+"&"+rT+s+"="+o.ts+"&"+sT+s+"="+o.d,s++}return n=n+r,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,r){this.pendingSegs.push({seg:e,ts:n,d:r}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const r=()=>{this.outstandingRequests.delete(n),this.newRequest_()},s=setTimeout(r,Math.floor(aT)),i=()=>{clearTimeout(s),r()};this.addTag(e,i)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const r=this.myIFrame.doc.createElement("script");r.type="text/javascript",r.async=!0,r.src=e,r.onload=r.onreadystatechange=function(){const s=r.readyState;(!s||s==="loaded"||s==="complete")&&(r.onload=r.onreadystatechange=null,r.parentNode&&r.parentNode.removeChild(r),n())},r.onerror=()=>{Ue("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(r)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cT=16384,uT=45e3;let Ll=null;typeof MozWebSocket<"u"?Ll=MozWebSocket:typeof WebSocket<"u"&&(Ll=WebSocket);class zt{constructor(e,n,r,s,i,o,l){this.connId=e,this.applicationId=r,this.appCheckToken=s,this.authToken=i,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Ko(this.connId),this.stats_=Of(n),this.connURL=zt.connectionURL_(n,o,l,s,r),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,r,s,i){const o={};return o[Rx]=jf,typeof location<"u"&&location.hostname&&Ox.test(location.hostname)&&(o[Ax]=jx),n&&(o[Px]=n),r&&(o[Dx]=r),s&&(o[ih]=s),i&&(o[Lx]=i),zx(e,Mx,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,Rr.set("previous_websocket_failure",!0);try{let r;WS(),this.mySock=new Ll(this.connURL,[],r)}catch(r){this.log_("Error instantiating WebSocket.");const s=r.message||r.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=r=>{this.handleIncomingFrame(r)},this.mySock.onerror=r=>{this.log_("WebSocket error.  Closing connection.");const s=r.message||r.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){zt.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,r=navigator.userAgent.match(n);r&&r.length>1&&parseFloat(r[1])<4.4&&(e=!0)}return!e&&Ll!==null&&!zt.forceDisallow_}static previouslyFailed(){return Rr.isInMemoryStorage||Rr.get("previous_websocket_failure")===!0}markConnectionHealthy(){Rr.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const r=Eo(n);this.onMessage(r)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(F(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const r=this.extractFrameCount_(n);r!==null&&this.appendFrame_(r)}}send(e){this.resetKeepAlive();const n=Te(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const r=Tx(n,cT);r.length>1&&this.sendString_(String(r.length));for(let s=0;s<r.length;s++)this.sendString_(r[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(uT))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}zt.responsesRequiredToBeHealthy=2;zt.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Co{constructor(e){this.initTransports_(e)}static get ALL_TRANSPORTS(){return[ks,zt]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}initTransports_(e){const n=zt&&zt.isAvailable();let r=n&&!zt.previouslyFailed();if(e.webSocketOnly&&(n||rt("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),r=!0),r)this.transports_=[zt];else{const s=this.transports_=[];for(const i of Co.ALL_TRANSPORTS)i&&i.isAvailable()&&s.push(i);Co.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Co.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dT=6e4,hT=5e3,fT=10*1024,pT=100*1024,Gu="t",l0="d",mT="s",c0="r",gT="e",u0="o",d0="a",h0="n",f0="p",vT="h";class yT{constructor(e,n,r,s,i,o,l,u,h,m){this.id=e,this.repoInfo_=n,this.applicationId_=r,this.appCheckToken_=s,this.authToken_=i,this.onMessage_=o,this.onReady_=l,this.onDisconnect_=u,this.onKill_=h,this.lastSessionId=m,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Ko("c:"+this.id+":"),this.transportManager_=new Co(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),r=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,r)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=Qi(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>pT?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>fT?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Gu in e){const n=e[Gu];n===d0?this.upgradeIfSecondaryHealthy_():n===c0?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===u0&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=Ti("t",e),r=Ti("d",e);if(n==="c")this.onSecondaryControl_(r);else if(n==="d")this.pendingDataMessages.push(r);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:f0,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:d0,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:h0,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=Ti("t",e),r=Ti("d",e);n==="c"?this.onControl_(r):n==="d"&&this.onDataMessage_(r)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=Ti(Gu,e);if(l0 in e){const r=e[l0];if(n===vT){const s=Object.assign({},r);this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(n===h0){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===mT?this.onConnectionShutdown_(r):n===c0?this.onReset_(r):n===gT?sh("Server Error: "+r):n===u0?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):sh("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,r=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),jf!==r&&rt("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),r=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,r),Qi(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(dT))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Qi(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(hT))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:f0,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(Rr.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gx{put(e,n,r,s){}merge(e,n,r,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,r){}onDisconnectMerge(e,n,r){}onDisconnectCancel(e,n){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qx{constructor(e){this.allowedEvents_=e,this.listeners_={},F(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const r=[...this.listeners_[e]];for(let s=0;s<r.length;s++)r[s].callback.apply(r[s].context,n)}}on(e,n,r){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:r});const s=this.getInitialEvent(e);s&&n.apply(r,s)}off(e,n,r){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let i=0;i<s.length;i++)if(s[i].callback===n&&(!r||r===s[i].context)){s.splice(i,1);return}}validateEventType_(e){F(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ml extends qx{constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!xf()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}static getInstance(){return new Ml}getInitialEvent(e){return F(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const p0=32,m0=768;class ie{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let r=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[r]=this.pieces_[s],r++);this.pieces_.length=r,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function ne(){return new ie("")}function q(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function dr(t){return t.pieces_.length-t.pieceNum_}function ce(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new ie(t.pieces_,e)}function Lf(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function _T(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function Io(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function Kx(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new ie(e,0)}function xe(t,e){const n=[];for(let r=t.pieceNum_;r<t.pieces_.length;r++)n.push(t.pieces_[r]);if(e instanceof ie)for(let r=e.pieceNum_;r<e.pieces_.length;r++)n.push(e.pieces_[r]);else{const r=e.split("/");for(let s=0;s<r.length;s++)r[s].length>0&&n.push(r[s])}return new ie(n,0)}function Q(t){return t.pieceNum_>=t.pieces_.length}function tt(t,e){const n=q(t),r=q(e);if(n===null)return e;if(n===r)return tt(ce(t),ce(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function xT(t,e){const n=Io(t,0),r=Io(e,0);for(let s=0;s<n.length&&s<r.length;s++){const i=Jr(n[s],r[s]);if(i!==0)return i}return n.length===r.length?0:n.length<r.length?-1:1}function Mf(t,e){if(dr(t)!==dr(e))return!1;for(let n=t.pieceNum_,r=e.pieceNum_;n<=t.pieces_.length;n++,r++)if(t.pieces_[n]!==e.pieces_[r])return!1;return!0}function bt(t,e){let n=t.pieceNum_,r=e.pieceNum_;if(dr(t)>dr(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[r])return!1;++n,++r}return!0}class wT{constructor(e,n){this.errorPrefix_=n,this.parts_=Io(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let r=0;r<this.parts_.length;r++)this.byteLength_+=wc(this.parts_[r]);Yx(this)}}function ET(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=wc(e),Yx(t)}function kT(t){const e=t.parts_.pop();t.byteLength_-=wc(e),t.parts_.length>0&&(t.byteLength_-=1)}function Yx(t){if(t.byteLength_>m0)throw new Error(t.errorPrefix_+"has a key path longer than "+m0+" bytes ("+t.byteLength_+").");if(t.parts_.length>p0)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+p0+") or object contains a cycle "+Cr(t))}function Cr(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ff extends qx{constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const r=!document[e];r!==this.visible_&&(this.visible_=r,this.trigger("visible",r))},!1)}static getInstance(){return new Ff}getInitialEvent(e){return F(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bi=1e3,ST=60*5*1e3,g0=30*1e3,NT=1.3,CT=3e4,IT="server_kill",v0=3;class kn extends Gx{constructor(e,n,r,s,i,o,l,u){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=r,this.onConnectStatus_=s,this.onServerInfoUpdate_=i,this.authTokenProvider_=o,this.appCheckTokenProvider_=l,this.authOverride_=u,this.id=kn.nextPersistentConnectionId_++,this.log_=Ko("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=bi,this.maxReconnectDelay_=ST,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,u)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Ff.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Ml.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,r){const s=++this.requestNumber_,i={r:s,a:e,b:n};this.log_(Te(i)),F(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(i),r&&(this.requestCBHash_[s]=r)}get(e){this.initConnection_();const n=new Vo,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const l=o.d;o.s==="ok"?n.resolve(l):n.reject(l)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const i=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(i),n.promise}listen(e,n,r,s){this.initConnection_();const i=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+i),this.listens.has(o)||this.listens.set(o,new Map),F(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),F(!this.listens.get(o).has(i),"listen() called twice for same path/queryId.");const l={onComplete:s,hashFn:n,query:e,tag:r};this.listens.get(o).set(i,l),this.connected_&&this.sendListen_(l)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,r=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(r)})}sendListen_(e){const n=e.query,r=n._path.toString(),s=n._queryIdentifier;this.log_("Listen on "+r+" for "+s);const i={p:r},o="q";e.tag&&(i.q=n._queryObject,i.t=e.tag),i.h=e.hashFn(),this.sendRequest(o,i,l=>{const u=l.d,h=l.s;kn.warnOnListenWarnings_(u,n),(this.listens.get(r)&&this.listens.get(r).get(s))===e&&(this.log_("listen response",l),h!=="ok"&&this.removeListen_(r,s),e.onComplete&&e.onComplete(h,u))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&on(e,"w")){const r=Hs(e,"w");if(Array.isArray(r)&&~r.indexOf("no_index")){const s='".indexOn": "'+n._queryParams.getIndex().toString()+'"',i=n._path.toString();rt(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${i} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||XS(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=g0)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=QS(e)?"auth":"gauth",r={cred:e};this.authOverride_===null?r.noauth=!0:typeof this.authOverride_=="object"&&(r.authvar=this.authOverride_),this.sendRequest(n,r,s=>{const i=s.s,o=s.d||"error";this.authToken_===e&&(i==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(i,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,r=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,r)})}unlisten(e,n){const r=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+r+" "+s),F(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(r,s)&&this.connected_&&this.sendUnlisten_(r,s,e._queryObject,n)}sendUnlisten_(e,n,r,s){this.log_("Unlisten on "+e+" for "+n);const i={p:e},o="n";s&&(i.q=r,i.t=s),this.sendRequest(o,i)}onDisconnectPut(e,n,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,r):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:r})}onDisconnectMerge(e,n,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,r):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:r})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,r,s){const i={p:n,d:r};this.log_("onDisconnect "+e,i),this.sendRequest(e,i,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,n,r,s){this.putInternal("p",e,n,r,s)}merge(e,n,r,s){this.putInternal("m",e,n,r,s)}putInternal(e,n,r,s,i){this.initConnection_();const o={p:n,d:r};i!==void 0&&(o.h=i),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const l=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(l):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,r=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,r,i=>{this.log_(n+" response",i),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(i.s,i.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,r=>{if(r.s!=="ok"){const i=r.d;this.log_("reportStats","Error sending stats: "+i)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+Te(e));const n=e.r,r=this.requestCBHash_[n];r&&(delete this.requestCBHash_[n],r(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):sh("Unrecognized action received from server: "+Te(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){F(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=bi,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=bi,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>CT&&(this.reconnectDelay_=bi),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=new Date().getTime()-this.lastConnectionAttemptTime_;let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*NT)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),r=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+kn.nextConnectionId_++,i=this.lastSessionId;let o=!1,l=null;const u=function(){l?l.close():(o=!0,r())},h=function(p){F(l,"sendRequest call when we're not connected not allowed."),l.sendRequest(p)};this.realtime_={close:u,sendRequest:h};const m=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[p,v]=await Promise.all([this.authTokenProvider_.getToken(m),this.appCheckTokenProvider_.getToken(m)]);o?Ue("getToken() completed but was canceled"):(Ue("getToken() completed. Creating connection."),this.authToken_=p&&p.accessToken,this.appCheckToken_=v&&v.token,l=new yT(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,r,T=>{rt(T+" ("+this.repoInfo_.toString()+")"),this.interrupt(IT)},i))}catch(p){this.log_("Failed to get token: "+p),o||(this.repoInfo_.nodeAdmin&&rt(p),u())}}}interrupt(e){Ue("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){Ue("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Kd(this.interruptReasons_)&&(this.reconnectDelay_=bi,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let r;n?r=n.map(i=>Af(i)).join("$"):r="default";const s=this.removeListen_(e,r);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,n){const r=new ie(e).toString();let s;if(this.listens.has(r)){const i=this.listens.get(r);s=i.get(n),i.delete(n),i.size===0&&this.listens.delete(r)}else s=void 0;return s}onAuthRevoked_(e,n){Ue("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=v0&&(this.reconnectDelay_=g0,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){Ue("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=v0&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+Nx.replace(/\./g,"-")]=1,xf()?e["framework.cordova"]=1:D_()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Ml.getInstance().currentlyOnline();return Kd(this.interruptReasons_)&&e}}kn.nextPersistentConnectionId_=0;kn.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K{constructor(e,n){this.name=e,this.node=n}static Wrap(e,n){return new K(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cc{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const r=new K(Gs,e),s=new K(Gs,n);return this.compare(r,s)!==0}minPost(){return K.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ja;class Qx extends Cc{static get __EMPTY_NODE(){return ja}static set __EMPTY_NODE(e){ja=e}compare(e,n){return Jr(e.name,n.name)}isDefinedOn(e){throw ti("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return K.MIN}maxPost(){return new K($r,ja)}makePost(e,n){return F(typeof e=="string","KeyIndex indexValue must always be a string."),new K(e,ja)}toString(){return".key"}}const Os=new Qx;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oa{constructor(e,n,r,s,i=null){this.isReverse_=s,this.resultGenerator_=i,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?r(e.key,n):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class Ae{constructor(e,n,r,s,i){this.key=e,this.value=n,this.color=r??Ae.RED,this.left=s??dt.EMPTY_NODE,this.right=i??dt.EMPTY_NODE}copy(e,n,r,s,i){return new Ae(e??this.key,n??this.value,r??this.color,s??this.left,i??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let s=this;const i=r(e,s.key);return i<0?s=s.copy(null,null,null,s.left.insert(e,n,r),null):i===0?s=s.copy(null,n,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,n,r)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return dt.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let r,s;if(r=this,n(e,r.key)<0)!r.left.isEmpty()&&!r.left.isRed_()&&!r.left.left.isRed_()&&(r=r.moveRedLeft_()),r=r.copy(null,null,null,r.left.remove(e,n),null);else{if(r.left.isRed_()&&(r=r.rotateRight_()),!r.right.isEmpty()&&!r.right.isRed_()&&!r.right.left.isRed_()&&(r=r.moveRedRight_()),n(e,r.key)===0){if(r.right.isEmpty())return dt.EMPTY_NODE;s=r.right.min_(),r=r.copy(s.key,s.value,null,null,r.right.removeMin_())}r=r.copy(null,null,null,null,r.right.remove(e,n))}return r.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,Ae.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,Ae.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}Ae.RED=!0;Ae.BLACK=!1;class TT{copy(e,n,r,s,i){return this}insert(e,n,r){return new Ae(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class dt{constructor(e,n=dt.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new dt(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,Ae.BLACK,null,null))}remove(e){return new dt(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,Ae.BLACK,null,null))}get(e){let n,r=this.root_;for(;!r.isEmpty();){if(n=this.comparator_(e,r.key),n===0)return r.value;n<0?r=r.left:n>0&&(r=r.right)}return null}getPredecessorKey(e){let n,r=this.root_,s=null;for(;!r.isEmpty();)if(n=this.comparator_(e,r.key),n===0){if(r.left.isEmpty())return s?s.key:null;for(r=r.left;!r.right.isEmpty();)r=r.right;return r.key}else n<0?r=r.left:n>0&&(s=r,r=r.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Oa(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new Oa(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new Oa(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new Oa(this.root_,null,this.comparator_,!0,e)}}dt.EMPTY_NODE=new TT;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bT(t,e){return Jr(t.name,e.name)}function Uf(t,e){return Jr(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let oh;function RT(t){oh=t}const Xx=function(t){return typeof t=="number"?"number:"+bx(t):"string:"+t},Jx=function(t){if(t.isLeafNode()){const e=t.val();F(typeof e=="string"||typeof e=="number"||typeof e=="object"&&on(e,".sv"),"Priority must be a string or number.")}else F(t===oh||t.isEmpty(),"priority of unexpected type.");F(t===oh||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let y0;class Re{constructor(e,n=Re.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,F(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Jx(this.priorityNode_)}static set __childrenNodeConstructor(e){y0=e}static get __childrenNodeConstructor(){return y0}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new Re(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:Re.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return Q(e)?this:q(e)===".priority"?this.priorityNode_:Re.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:Re.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const r=q(e);return r===null?n:n.isEmpty()&&r!==".priority"?this:(F(r!==".priority"||dr(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(r,Re.__childrenNodeConstructor.EMPTY_NODE.updateChild(ce(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Xx(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=bx(this.value_):e+=this.value_,this.lazyHash_=Ix(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===Re.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof Re.__childrenNodeConstructor?-1:(F(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,r=typeof this.value_,s=Re.VALUE_TYPE_ORDER.indexOf(n),i=Re.VALUE_TYPE_ORDER.indexOf(r);return F(s>=0,"Unknown leaf type: "+n),F(i>=0,"Unknown leaf type: "+r),s===i?r==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:i-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}Re.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Zx,ew;function PT(t){Zx=t}function AT(t){ew=t}class jT extends Cc{compare(e,n){const r=e.node.getPriority(),s=n.node.getPriority(),i=r.compareTo(s);return i===0?Jr(e.name,n.name):i}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return K.MIN}maxPost(){return new K($r,new Re("[PRIORITY-POST]",ew))}makePost(e,n){const r=Zx(e);return new K(n,new Re("[PRIORITY-POST]",r))}toString(){return".priority"}}const we=new jT;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const OT=Math.log(2);class DT{constructor(e){const n=i=>parseInt(Math.log(i)/OT,10),r=i=>parseInt(Array(i+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const s=r(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Fl=function(t,e,n,r){t.sort(e);const s=function(u,h){const m=h-u;let p,v;if(m===0)return null;if(m===1)return p=t[u],v=n?n(p):p,new Ae(v,p.node,Ae.BLACK,null,null);{const T=parseInt(m/2,10)+u,I=s(u,T),A=s(T+1,h);return p=t[T],v=n?n(p):p,new Ae(v,p.node,Ae.BLACK,I,A)}},i=function(u){let h=null,m=null,p=t.length;const v=function(I,A){const O=p-I,S=p;p-=I;const E=s(O+1,S),C=t[O],j=n?n(C):C;T(new Ae(j,C.node,A,null,E))},T=function(I){h?(h.left=I,h=I):(m=I,h=I)};for(let I=0;I<u.count;++I){const A=u.nextBitIsOne(),O=Math.pow(2,u.count-(I+1));A?v(O,Ae.BLACK):(v(O,Ae.BLACK),v(O,Ae.RED))}return m},o=new DT(t.length),l=i(o);return new dt(r||e,l)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let qu;const os={};class xn{constructor(e,n){this.indexes_=e,this.indexSet_=n}static get Default(){return F(os&&we,"ChildrenNode.ts has not been loaded"),qu=qu||new xn({".priority":os},{".priority":we}),qu}get(e){const n=Hs(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof dt?n:null}hasIndex(e){return on(this.indexSet_,e.toString())}addIndex(e,n){F(e!==Os,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const r=[];let s=!1;const i=n.getIterator(K.Wrap);let o=i.getNext();for(;o;)s=s||e.isDefinedOn(o.node),r.push(o),o=i.getNext();let l;s?l=Fl(r,e.getCompare()):l=os;const u=e.toString(),h=Object.assign({},this.indexSet_);h[u]=e;const m=Object.assign({},this.indexes_);return m[u]=l,new xn(m,h)}addToIndexes(e,n){const r=bl(this.indexes_,(s,i)=>{const o=Hs(this.indexSet_,i);if(F(o,"Missing index implementation for "+i),s===os)if(o.isDefinedOn(e.node)){const l=[],u=n.getIterator(K.Wrap);let h=u.getNext();for(;h;)h.name!==e.name&&l.push(h),h=u.getNext();return l.push(e),Fl(l,o.getCompare())}else return os;else{const l=n.get(e.name);let u=s;return l&&(u=u.remove(new K(e.name,l))),u.insert(e,e.node)}});return new xn(r,this.indexSet_)}removeFromIndexes(e,n){const r=bl(this.indexes_,s=>{if(s===os)return s;{const i=n.get(e.name);return i?s.remove(new K(e.name,i)):s}});return new xn(r,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ri;class B{constructor(e,n,r){this.children_=e,this.priorityNode_=n,this.indexMap_=r,this.lazyHash_=null,this.priorityNode_&&Jx(this.priorityNode_),this.children_.isEmpty()&&F(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return Ri||(Ri=new B(new dt(Uf),null,xn.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||Ri}updatePriority(e){return this.children_.isEmpty()?this:new B(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?Ri:n}}getChild(e){const n=q(e);return n===null?this:this.getImmediateChild(n).getChild(ce(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(F(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const r=new K(e,n);let s,i;n.isEmpty()?(s=this.children_.remove(e),i=this.indexMap_.removeFromIndexes(r,this.children_)):(s=this.children_.insert(e,n),i=this.indexMap_.addToIndexes(r,this.children_));const o=s.isEmpty()?Ri:this.priorityNode_;return new B(s,o,i)}}updateChild(e,n){const r=q(e);if(r===null)return n;{F(q(e)!==".priority"||dr(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(r).updateChild(ce(e),n);return this.updateImmediateChild(r,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let r=0,s=0,i=!0;if(this.forEachChild(we,(o,l)=>{n[o]=l.val(e),r++,i&&B.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):i=!1}),!e&&i&&s<2*r){const o=[];for(const l in n)o[l]=n[l];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+Xx(this.getPriority().val())+":"),this.forEachChild(we,(n,r)=>{const s=r.hash();s!==""&&(e+=":"+n+":"+s)}),this.lazyHash_=e===""?"":Ix(e)}return this.lazyHash_}getPredecessorChildName(e,n,r){const s=this.resolveIndex_(r);if(s){const i=s.getPredecessorKey(new K(e,n));return i?i.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const r=n.minKey();return r&&r.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new K(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const r=n.maxKey();return r&&r.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new K(n,this.children_.get(n)):null}forEachChild(e,n){const r=this.resolveIndex_(e);return r?r.inorderTraversal(s=>n(s.name,s.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const r=this.resolveIndex_(n);if(r)return r.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,K.Wrap);let i=s.peek();for(;i!=null&&n.compare(i,e)<0;)s.getNext(),i=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const r=this.resolveIndex_(n);if(r)return r.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,K.Wrap);let i=s.peek();for(;i!=null&&n.compare(i,e)>0;)s.getNext(),i=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Yo?-1:0}withIndex(e){if(e===Os||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new B(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===Os||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const r=this.getIterator(we),s=n.getIterator(we);let i=r.getNext(),o=s.getNext();for(;i&&o;){if(i.name!==o.name||!i.node.equals(o.node))return!1;i=r.getNext(),o=s.getNext()}return i===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Os?null:this.indexMap_.get(e.toString())}}B.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class LT extends B{constructor(){super(new dt(Uf),B.EMPTY_NODE,xn.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return B.EMPTY_NODE}isEmpty(){return!1}}const Yo=new LT;Object.defineProperties(K,{MIN:{value:new K(Gs,B.EMPTY_NODE)},MAX:{value:new K($r,Yo)}});Qx.__EMPTY_NODE=B.EMPTY_NODE;Re.__childrenNodeConstructor=B;RT(Yo);AT(Yo);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const MT=!0;function Ie(t,e=null){if(t===null)return B.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),F(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new Re(n,Ie(e))}if(!(t instanceof Array)&&MT){const n=[];let r=!1;if($e(t,(o,l)=>{if(o.substring(0,1)!=="."){const u=Ie(l);u.isEmpty()||(r=r||!u.getPriority().isEmpty(),n.push(new K(o,u)))}}),n.length===0)return B.EMPTY_NODE;const i=Fl(n,bT,o=>o.name,Uf);if(r){const o=Fl(n,we.getCompare());return new B(i,Ie(e),new xn({".priority":o},{".priority":we}))}else return new B(i,Ie(e),xn.Default)}else{let n=B.EMPTY_NODE;return $e(t,(r,s)=>{if(on(t,r)&&r.substring(0,1)!=="."){const i=Ie(s);(i.isLeafNode()||!i.isEmpty())&&(n=n.updateImmediateChild(r,i))}}),n.updatePriority(Ie(e))}}PT(Ie);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FT extends Cc{constructor(e){super(),this.indexPath_=e,F(!Q(e)&&q(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const r=this.extractChild(e.node),s=this.extractChild(n.node),i=r.compareTo(s);return i===0?Jr(e.name,n.name):i}makePost(e,n){const r=Ie(e),s=B.EMPTY_NODE.updateChild(this.indexPath_,r);return new K(n,s)}maxPost(){const e=B.EMPTY_NODE.updateChild(this.indexPath_,Yo);return new K($r,e)}toString(){return Io(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UT extends Cc{compare(e,n){const r=e.node.compareTo(n.node);return r===0?Jr(e.name,n.name):r}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return K.MIN}maxPost(){return K.MAX}makePost(e,n){const r=Ie(e);return new K(n,r)}toString(){return".value"}}const zT=new UT;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tw(t){return{type:"value",snapshotNode:t}}function qs(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function To(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function bo(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function VT(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zf{constructor(e){this.index_=e}updateChild(e,n,r,s,i,o){F(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const l=e.getImmediateChild(n);return l.getChild(s).equals(r.getChild(s))&&l.isEmpty()===r.isEmpty()||(o!=null&&(r.isEmpty()?e.hasChild(n)?o.trackChildChange(To(n,l)):F(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):l.isEmpty()?o.trackChildChange(qs(n,r)):o.trackChildChange(bo(n,r,l))),e.isLeafNode()&&r.isEmpty())?e:e.updateImmediateChild(n,r).withIndex(this.index_)}updateFullNode(e,n,r){return r!=null&&(e.isLeafNode()||e.forEachChild(we,(s,i)=>{n.hasChild(s)||r.trackChildChange(To(s,i))}),n.isLeafNode()||n.forEachChild(we,(s,i)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(i)||r.trackChildChange(bo(s,i,o))}else r.trackChildChange(qs(s,i))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?B.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ro{constructor(e){this.indexedFilter_=new zf(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Ro.getStartPost_(e),this.endPost_=Ro.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,r=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&r}updateChild(e,n,r,s,i,o){return this.matches(new K(n,r))||(r=B.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,r,s,i,o)}updateFullNode(e,n,r){n.isLeafNode()&&(n=B.EMPTY_NODE);let s=n.withIndex(this.index_);s=s.updatePriority(B.EMPTY_NODE);const i=this;return n.forEachChild(we,(o,l)=>{i.matches(new K(o,l))||(s=s.updateImmediateChild(o,B.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,r)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $T{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const r=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?r<=0:r<0},this.withinEndPost=n=>{const r=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?r<=0:r<0},this.rangedFilter_=new Ro(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,r,s,i,o){return this.rangedFilter_.matches(new K(n,r))||(r=B.EMPTY_NODE),e.getImmediateChild(n).equals(r)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,r,s,i,o):this.fullLimitUpdateChild_(e,n,r,i,o)}updateFullNode(e,n,r){let s;if(n.isLeafNode()||n.isEmpty())s=B.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){s=B.EMPTY_NODE.withIndex(this.index_);let i;this.reverse_?i=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):i=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;i.hasNext()&&o<this.limit_;){const l=i.getNext();if(this.withinDirectionalStart(l))if(this.withinDirectionalEnd(l))s=s.updateImmediateChild(l.name,l.node),o++;else break;else continue}}else{s=n.withIndex(this.index_),s=s.updatePriority(B.EMPTY_NODE);let i;this.reverse_?i=s.getReverseIterator(this.index_):i=s.getIterator(this.index_);let o=0;for(;i.hasNext();){const l=i.getNext();o<this.limit_&&this.withinDirectionalStart(l)&&this.withinDirectionalEnd(l)?o++:s=s.updateImmediateChild(l.name,B.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,r)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,r,s,i){let o;if(this.reverse_){const p=this.index_.getCompare();o=(v,T)=>p(T,v)}else o=this.index_.getCompare();const l=e;F(l.numChildren()===this.limit_,"");const u=new K(n,r),h=this.reverse_?l.getFirstChild(this.index_):l.getLastChild(this.index_),m=this.rangedFilter_.matches(u);if(l.hasChild(n)){const p=l.getImmediateChild(n);let v=s.getChildAfterChild(this.index_,h,this.reverse_);for(;v!=null&&(v.name===n||l.hasChild(v.name));)v=s.getChildAfterChild(this.index_,v,this.reverse_);const T=v==null?1:o(v,u);if(m&&!r.isEmpty()&&T>=0)return i!=null&&i.trackChildChange(bo(n,r,p)),l.updateImmediateChild(n,r);{i!=null&&i.trackChildChange(To(n,p));const A=l.updateImmediateChild(n,B.EMPTY_NODE);return v!=null&&this.rangedFilter_.matches(v)?(i!=null&&i.trackChildChange(qs(v.name,v.node)),A.updateImmediateChild(v.name,v.node)):A}}else return r.isEmpty()?e:m&&o(h,u)>=0?(i!=null&&(i.trackChildChange(To(h.name,h.node)),i.trackChildChange(qs(n,r))),l.updateImmediateChild(n,r).updateImmediateChild(h.name,B.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vf{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=we}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return F(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return F(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Gs}hasEnd(){return this.endSet_}getIndexEndValue(){return F(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return F(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:$r}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return F(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===we}copy(){const e=new Vf;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function BT(t){return t.loadsAllData()?new zf(t.getIndex()):t.hasLimit()?new $T(t):new Ro(t)}function _0(t){const e={};if(t.isDefault())return e;let n;if(t.index_===we?n="$priority":t.index_===zT?n="$value":t.index_===Os?n="$key":(F(t.index_ instanceof FT,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=Te(n),t.startSet_){const r=t.startAfterSet_?"startAfter":"startAt";e[r]=Te(t.indexStartValue_),t.startNameSet_&&(e[r]+=","+Te(t.indexStartName_))}if(t.endSet_){const r=t.endBeforeSet_?"endBefore":"endAt";e[r]=Te(t.indexEndValue_),t.endNameSet_&&(e[r]+=","+Te(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function x0(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==we&&(e.i=t.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ul extends Gx{constructor(e,n,r,s){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=r,this.appCheckTokenProvider_=s,this.log_=Ko("p:rest:"),this.listens_={}}reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(F(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}listen(e,n,r,s){const i=e._path.toString();this.log_("Listen called for "+i+" "+e._queryIdentifier);const o=Ul.getListenId_(e,r),l={};this.listens_[o]=l;const u=_0(e._queryParams);this.restRequest_(i+".json",u,(h,m)=>{let p=m;if(h===404&&(p=null,h=null),h===null&&this.onDataUpdate_(i,p,!1,r),Hs(this.listens_,o)===l){let v;h?h===401?v="permission_denied":v="rest_error:"+h:v="ok",s(v,null)}})}unlisten(e,n){const r=Ul.getListenId_(e,n);delete this.listens_[r]}get(e){const n=_0(e._queryParams),r=e._path.toString(),s=new Vo;return this.restRequest_(r+".json",n,(i,o)=>{let l=o;i===404&&(l=null,i=null),i===null?(this.onDataUpdate_(r,l,!1,null),s.resolve(l)):s.reject(new Error(l))}),s.promise}refreshAuthToken(e){}restRequest_(e,n={},r){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,i])=>{s&&s.accessToken&&(n.auth=s.accessToken),i&&i.token&&(n.ac=i.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+ni(n);this.log_("Sending REST request for "+o);const l=new XMLHttpRequest;l.onreadystatechange=()=>{if(r&&l.readyState===4){this.log_("REST Response for "+o+" received. status:",l.status,"response:",l.responseText);let u=null;if(l.status>=200&&l.status<300){try{u=Eo(l.responseText)}catch{rt("Failed to parse JSON response for "+o+": "+l.responseText)}r(null,u)}else l.status!==401&&l.status!==404&&rt("Got unsuccessful REST response for "+o+" Status: "+l.status),r(l.status);r=null}},l.open("GET",o,!0),l.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HT{constructor(){this.rootNode_=B.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zl(){return{value:null,children:new Map}}function nw(t,e,n){if(Q(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const r=q(e);t.children.has(r)||t.children.set(r,zl());const s=t.children.get(r);e=ce(e),nw(s,e,n)}}function ah(t,e,n){t.value!==null?n(e,t.value):WT(t,(r,s)=>{const i=new ie(e.toString()+"/"+r);ah(s,i,n)})}function WT(t,e){t.children.forEach((n,r)=>{e(r,n)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GT{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n=Object.assign({},e);return this.last_&&$e(this.last_,(r,s)=>{n[r]=n[r]-s}),this.last_=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const w0=10*1e3,qT=30*1e3,KT=5*60*1e3;class YT{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new GT(e);const r=w0+(qT-w0)*Math.random();Qi(this.reportStats_.bind(this),Math.floor(r))}reportStats_(){const e=this.statsListener_.get(),n={};let r=!1;$e(e,(s,i)=>{i>0&&on(this.statsToReport_,s)&&(n[s]=i,r=!0)}),r&&this.server_.reportStats(n),Qi(this.reportStats_.bind(this),Math.floor(Math.random()*2*KT))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Vt;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(Vt||(Vt={}));function $f(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Bf(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Hf(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vl{constructor(e,n,r){this.path=e,this.affectedTree=n,this.revert=r,this.type=Vt.ACK_USER_WRITE,this.source=$f()}operationForChild(e){if(Q(this.path)){if(this.affectedTree.value!=null)return F(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new ie(e));return new Vl(ne(),n,this.revert)}}else return F(q(this.path)===e,"operationForChild called for unrelated child."),new Vl(ce(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Po{constructor(e,n){this.source=e,this.path=n,this.type=Vt.LISTEN_COMPLETE}operationForChild(e){return Q(this.path)?new Po(this.source,ne()):new Po(this.source,ce(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Br{constructor(e,n,r){this.source=e,this.path=n,this.snap=r,this.type=Vt.OVERWRITE}operationForChild(e){return Q(this.path)?new Br(this.source,ne(),this.snap.getImmediateChild(e)):new Br(this.source,ce(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ks{constructor(e,n,r){this.source=e,this.path=n,this.children=r,this.type=Vt.MERGE}operationForChild(e){if(Q(this.path)){const n=this.children.subtree(new ie(e));return n.isEmpty()?null:n.value?new Br(this.source,ne(),n.value):new Ks(this.source,ne(),n)}else return F(q(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Ks(this.source,ce(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hr{constructor(e,n,r){this.node_=e,this.fullyInitialized_=n,this.filtered_=r}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(Q(e))return this.isFullyInitialized()&&!this.filtered_;const n=q(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QT{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function XT(t,e,n,r){const s=[],i=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&i.push(VT(o.childName,o.snapshotNode))}),Pi(t,s,"child_removed",e,r,n),Pi(t,s,"child_added",e,r,n),Pi(t,s,"child_moved",i,r,n),Pi(t,s,"child_changed",e,r,n),Pi(t,s,"value",e,r,n),s}function Pi(t,e,n,r,s,i){const o=r.filter(l=>l.type===n);o.sort((l,u)=>ZT(t,l,u)),o.forEach(l=>{const u=JT(t,l,i);s.forEach(h=>{h.respondsTo(l.type)&&e.push(h.createEvent(u,t.query_))})})}function JT(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function ZT(t,e,n){if(e.childName==null||n.childName==null)throw ti("Should only compare child_ events.");const r=new K(e.childName,e.snapshotNode),s=new K(n.childName,n.snapshotNode);return t.index_.compare(r,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ic(t,e){return{eventCache:t,serverCache:e}}function Xi(t,e,n,r){return Ic(new hr(e,n,r),t.serverCache)}function rw(t,e,n,r){return Ic(t.eventCache,new hr(e,n,r))}function $l(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function Hr(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ku;const eb=()=>(Ku||(Ku=new dt(F2)),Ku);class le{constructor(e,n=eb()){this.value=e,this.children=n}static fromObject(e){let n=new le(null);return $e(e,(r,s)=>{n=n.set(new ie(r),s)}),n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:ne(),value:this.value};if(Q(e))return null;{const r=q(e),s=this.children.get(r);if(s!==null){const i=s.findRootMostMatchingPathAndValue(ce(e),n);return i!=null?{path:xe(new ie(r),i.path),value:i.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(Q(e))return this;{const n=q(e),r=this.children.get(n);return r!==null?r.subtree(ce(e)):new le(null)}}set(e,n){if(Q(e))return new le(n,this.children);{const r=q(e),i=(this.children.get(r)||new le(null)).set(ce(e),n),o=this.children.insert(r,i);return new le(this.value,o)}}remove(e){if(Q(e))return this.children.isEmpty()?new le(null):new le(null,this.children);{const n=q(e),r=this.children.get(n);if(r){const s=r.remove(ce(e));let i;return s.isEmpty()?i=this.children.remove(n):i=this.children.insert(n,s),this.value===null&&i.isEmpty()?new le(null):new le(this.value,i)}else return this}}get(e){if(Q(e))return this.value;{const n=q(e),r=this.children.get(n);return r?r.get(ce(e)):null}}setTree(e,n){if(Q(e))return n;{const r=q(e),i=(this.children.get(r)||new le(null)).setTree(ce(e),n);let o;return i.isEmpty()?o=this.children.remove(r):o=this.children.insert(r,i),new le(this.value,o)}}fold(e){return this.fold_(ne(),e)}fold_(e,n){const r={};return this.children.inorderTraversal((s,i)=>{r[s]=i.fold_(xe(e,s),n)}),n(e,this.value,r)}findOnPath(e,n){return this.findOnPath_(e,ne(),n)}findOnPath_(e,n,r){const s=this.value?r(n,this.value):!1;if(s)return s;if(Q(e))return null;{const i=q(e),o=this.children.get(i);return o?o.findOnPath_(ce(e),xe(n,i),r):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,ne(),n)}foreachOnPath_(e,n,r){if(Q(e))return this;{this.value&&r(n,this.value);const s=q(e),i=this.children.get(s);return i?i.foreachOnPath_(ce(e),xe(n,s),r):new le(null)}}foreach(e){this.foreach_(ne(),e)}foreach_(e,n){this.children.inorderTraversal((r,s)=>{s.foreach_(xe(e,r),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,r)=>{r.value&&e(n,r.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wt{constructor(e){this.writeTree_=e}static empty(){return new Wt(new le(null))}}function Ji(t,e,n){if(Q(e))return new Wt(new le(n));{const r=t.writeTree_.findRootMostValueAndPath(e);if(r!=null){const s=r.path;let i=r.value;const o=tt(s,e);return i=i.updateChild(o,n),new Wt(t.writeTree_.set(s,i))}else{const s=new le(n),i=t.writeTree_.setTree(e,s);return new Wt(i)}}}function lh(t,e,n){let r=t;return $e(n,(s,i)=>{r=Ji(r,xe(e,s),i)}),r}function E0(t,e){if(Q(e))return Wt.empty();{const n=t.writeTree_.setTree(e,new le(null));return new Wt(n)}}function ch(t,e){return Zr(t,e)!=null}function Zr(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(tt(n.path,e)):null}function k0(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(we,(r,s)=>{e.push(new K(r,s))}):t.writeTree_.children.inorderTraversal((r,s)=>{s.value!=null&&e.push(new K(r,s.value))}),e}function ar(t,e){if(Q(e))return t;{const n=Zr(t,e);return n!=null?new Wt(new le(n)):new Wt(t.writeTree_.subtree(e))}}function uh(t){return t.writeTree_.isEmpty()}function Ys(t,e){return sw(ne(),t.writeTree_,e)}function sw(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let r=null;return e.children.inorderTraversal((s,i)=>{s===".priority"?(F(i.value!==null,"Priority writes must always be leaf nodes"),r=i.value):n=sw(xe(t,s),i,n)}),!n.getChild(t).isEmpty()&&r!==null&&(n=n.updateChild(xe(t,".priority"),r)),n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tc(t,e){return lw(e,t)}function tb(t,e,n,r,s){F(r>t.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),t.allWrites.push({path:e,snap:n,writeId:r,visible:s}),s&&(t.visibleWrites=Ji(t.visibleWrites,e,n)),t.lastWriteId=r}function nb(t,e,n,r){F(r>t.lastWriteId,"Stacking an older merge on top of newer ones"),t.allWrites.push({path:e,children:n,writeId:r,visible:!0}),t.visibleWrites=lh(t.visibleWrites,e,n),t.lastWriteId=r}function rb(t,e){for(let n=0;n<t.allWrites.length;n++){const r=t.allWrites[n];if(r.writeId===e)return r}return null}function sb(t,e){const n=t.allWrites.findIndex(l=>l.writeId===e);F(n>=0,"removeWrite called with nonexistent writeId.");const r=t.allWrites[n];t.allWrites.splice(n,1);let s=r.visible,i=!1,o=t.allWrites.length-1;for(;s&&o>=0;){const l=t.allWrites[o];l.visible&&(o>=n&&ib(l,r.path)?s=!1:bt(r.path,l.path)&&(i=!0)),o--}if(s){if(i)return ob(t),!0;if(r.snap)t.visibleWrites=E0(t.visibleWrites,r.path);else{const l=r.children;$e(l,u=>{t.visibleWrites=E0(t.visibleWrites,xe(r.path,u))})}return!0}else return!1}function ib(t,e){if(t.snap)return bt(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&bt(xe(t.path,n),e))return!0;return!1}function ob(t){t.visibleWrites=iw(t.allWrites,ab,ne()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function ab(t){return t.visible}function iw(t,e,n){let r=Wt.empty();for(let s=0;s<t.length;++s){const i=t[s];if(e(i)){const o=i.path;let l;if(i.snap)bt(n,o)?(l=tt(n,o),r=Ji(r,l,i.snap)):bt(o,n)&&(l=tt(o,n),r=Ji(r,ne(),i.snap.getChild(l)));else if(i.children){if(bt(n,o))l=tt(n,o),r=lh(r,l,i.children);else if(bt(o,n))if(l=tt(o,n),Q(l))r=lh(r,ne(),i.children);else{const u=Hs(i.children,q(l));if(u){const h=u.getChild(ce(l));r=Ji(r,ne(),h)}}}else throw ti("WriteRecord should have .snap or .children")}}return r}function ow(t,e,n,r,s){if(!r&&!s){const i=Zr(t.visibleWrites,e);if(i!=null)return i;{const o=ar(t.visibleWrites,e);if(uh(o))return n;if(n==null&&!ch(o,ne()))return null;{const l=n||B.EMPTY_NODE;return Ys(o,l)}}}else{const i=ar(t.visibleWrites,e);if(!s&&uh(i))return n;if(!s&&n==null&&!ch(i,ne()))return null;{const o=function(h){return(h.visible||s)&&(!r||!~r.indexOf(h.writeId))&&(bt(h.path,e)||bt(e,h.path))},l=iw(t.allWrites,o,e),u=n||B.EMPTY_NODE;return Ys(l,u)}}}function lb(t,e,n){let r=B.EMPTY_NODE;const s=Zr(t.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(we,(i,o)=>{r=r.updateImmediateChild(i,o)}),r;if(n){const i=ar(t.visibleWrites,e);return n.forEachChild(we,(o,l)=>{const u=Ys(ar(i,new ie(o)),l);r=r.updateImmediateChild(o,u)}),k0(i).forEach(o=>{r=r.updateImmediateChild(o.name,o.node)}),r}else{const i=ar(t.visibleWrites,e);return k0(i).forEach(o=>{r=r.updateImmediateChild(o.name,o.node)}),r}}function cb(t,e,n,r,s){F(r||s,"Either existingEventSnap or existingServerSnap must exist");const i=xe(e,n);if(ch(t.visibleWrites,i))return null;{const o=ar(t.visibleWrites,i);return uh(o)?s.getChild(n):Ys(o,s.getChild(n))}}function ub(t,e,n,r){const s=xe(e,n),i=Zr(t.visibleWrites,s);if(i!=null)return i;if(r.isCompleteForChild(n)){const o=ar(t.visibleWrites,s);return Ys(o,r.getNode().getImmediateChild(n))}else return null}function db(t,e){return Zr(t.visibleWrites,e)}function hb(t,e,n,r,s,i,o){let l;const u=ar(t.visibleWrites,e),h=Zr(u,ne());if(h!=null)l=h;else if(n!=null)l=Ys(u,n);else return[];if(l=l.withIndex(o),!l.isEmpty()&&!l.isLeafNode()){const m=[],p=o.getCompare(),v=i?l.getReverseIteratorFrom(r,o):l.getIteratorFrom(r,o);let T=v.getNext();for(;T&&m.length<s;)p(T,r)!==0&&m.push(T),T=v.getNext();return m}else return[]}function fb(){return{visibleWrites:Wt.empty(),allWrites:[],lastWriteId:-1}}function Bl(t,e,n,r){return ow(t.writeTree,t.treePath,e,n,r)}function Wf(t,e){return lb(t.writeTree,t.treePath,e)}function S0(t,e,n,r){return cb(t.writeTree,t.treePath,e,n,r)}function Hl(t,e){return db(t.writeTree,xe(t.treePath,e))}function pb(t,e,n,r,s,i){return hb(t.writeTree,t.treePath,e,n,r,s,i)}function Gf(t,e,n){return ub(t.writeTree,t.treePath,e,n)}function aw(t,e){return lw(xe(t.treePath,e),t.writeTree)}function lw(t,e){return{treePath:t,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mb{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,r=e.childName;F(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),F(r!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(r);if(s){const i=s.type;if(n==="child_added"&&i==="child_removed")this.changeMap.set(r,bo(r,e.snapshotNode,s.snapshotNode));else if(n==="child_removed"&&i==="child_added")this.changeMap.delete(r);else if(n==="child_removed"&&i==="child_changed")this.changeMap.set(r,To(r,s.oldSnap));else if(n==="child_changed"&&i==="child_added")this.changeMap.set(r,qs(r,e.snapshotNode));else if(n==="child_changed"&&i==="child_changed")this.changeMap.set(r,bo(r,e.snapshotNode,s.oldSnap));else throw ti("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(r,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gb{getCompleteChild(e){return null}getChildAfterChild(e,n,r){return null}}const cw=new gb;class qf{constructor(e,n,r=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=r}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const r=this.optCompleteServerCache_!=null?new hr(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Gf(this.writes_,e,r)}}getChildAfterChild(e,n,r){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Hr(this.viewCache_),i=pb(this.writes_,s,n,1,r,e);return i.length===0?null:i[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vb(t){return{filter:t}}function yb(t,e){F(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),F(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function _b(t,e,n,r,s){const i=new mb;let o,l;if(n.type===Vt.OVERWRITE){const h=n;h.source.fromUser?o=dh(t,e,h.path,h.snap,r,s,i):(F(h.source.fromServer,"Unknown source."),l=h.source.tagged||e.serverCache.isFiltered()&&!Q(h.path),o=Wl(t,e,h.path,h.snap,r,s,l,i))}else if(n.type===Vt.MERGE){const h=n;h.source.fromUser?o=wb(t,e,h.path,h.children,r,s,i):(F(h.source.fromServer,"Unknown source."),l=h.source.tagged||e.serverCache.isFiltered(),o=hh(t,e,h.path,h.children,r,s,l,i))}else if(n.type===Vt.ACK_USER_WRITE){const h=n;h.revert?o=Sb(t,e,h.path,r,s,i):o=Eb(t,e,h.path,h.affectedTree,r,s,i)}else if(n.type===Vt.LISTEN_COMPLETE)o=kb(t,e,n.path,r,i);else throw ti("Unknown operation type: "+n.type);const u=i.getChanges();return xb(e,o,u),{viewCache:o,changes:u}}function xb(t,e,n){const r=e.eventCache;if(r.isFullyInitialized()){const s=r.getNode().isLeafNode()||r.getNode().isEmpty(),i=$l(t);(n.length>0||!t.eventCache.isFullyInitialized()||s&&!r.getNode().equals(i)||!r.getNode().getPriority().equals(i.getPriority()))&&n.push(tw($l(e)))}}function uw(t,e,n,r,s,i){const o=e.eventCache;if(Hl(r,n)!=null)return e;{let l,u;if(Q(n))if(F(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const h=Hr(e),m=h instanceof B?h:B.EMPTY_NODE,p=Wf(r,m);l=t.filter.updateFullNode(e.eventCache.getNode(),p,i)}else{const h=Bl(r,Hr(e));l=t.filter.updateFullNode(e.eventCache.getNode(),h,i)}else{const h=q(n);if(h===".priority"){F(dr(n)===1,"Can't have a priority with additional path components");const m=o.getNode();u=e.serverCache.getNode();const p=S0(r,n,m,u);p!=null?l=t.filter.updatePriority(m,p):l=o.getNode()}else{const m=ce(n);let p;if(o.isCompleteForChild(h)){u=e.serverCache.getNode();const v=S0(r,n,o.getNode(),u);v!=null?p=o.getNode().getImmediateChild(h).updateChild(m,v):p=o.getNode().getImmediateChild(h)}else p=Gf(r,h,e.serverCache);p!=null?l=t.filter.updateChild(o.getNode(),h,p,m,s,i):l=o.getNode()}}return Xi(e,l,o.isFullyInitialized()||Q(n),t.filter.filtersNodes())}}function Wl(t,e,n,r,s,i,o,l){const u=e.serverCache;let h;const m=o?t.filter:t.filter.getIndexedFilter();if(Q(n))h=m.updateFullNode(u.getNode(),r,null);else if(m.filtersNodes()&&!u.isFiltered()){const T=u.getNode().updateChild(n,r);h=m.updateFullNode(u.getNode(),T,null)}else{const T=q(n);if(!u.isCompleteForPath(n)&&dr(n)>1)return e;const I=ce(n),O=u.getNode().getImmediateChild(T).updateChild(I,r);T===".priority"?h=m.updatePriority(u.getNode(),O):h=m.updateChild(u.getNode(),T,O,I,cw,null)}const p=rw(e,h,u.isFullyInitialized()||Q(n),m.filtersNodes()),v=new qf(s,p,i);return uw(t,p,n,s,v,l)}function dh(t,e,n,r,s,i,o){const l=e.eventCache;let u,h;const m=new qf(s,e,i);if(Q(n))h=t.filter.updateFullNode(e.eventCache.getNode(),r,o),u=Xi(e,h,!0,t.filter.filtersNodes());else{const p=q(n);if(p===".priority")h=t.filter.updatePriority(e.eventCache.getNode(),r),u=Xi(e,h,l.isFullyInitialized(),l.isFiltered());else{const v=ce(n),T=l.getNode().getImmediateChild(p);let I;if(Q(v))I=r;else{const A=m.getCompleteChild(p);A!=null?Lf(v)===".priority"&&A.getChild(Kx(v)).isEmpty()?I=A:I=A.updateChild(v,r):I=B.EMPTY_NODE}if(T.equals(I))u=e;else{const A=t.filter.updateChild(l.getNode(),p,I,v,m,o);u=Xi(e,A,l.isFullyInitialized(),t.filter.filtersNodes())}}}return u}function N0(t,e){return t.eventCache.isCompleteForChild(e)}function wb(t,e,n,r,s,i,o){let l=e;return r.foreach((u,h)=>{const m=xe(n,u);N0(e,q(m))&&(l=dh(t,l,m,h,s,i,o))}),r.foreach((u,h)=>{const m=xe(n,u);N0(e,q(m))||(l=dh(t,l,m,h,s,i,o))}),l}function C0(t,e,n){return n.foreach((r,s)=>{e=e.updateChild(r,s)}),e}function hh(t,e,n,r,s,i,o,l){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let u=e,h;Q(n)?h=r:h=new le(null).setTree(n,r);const m=e.serverCache.getNode();return h.children.inorderTraversal((p,v)=>{if(m.hasChild(p)){const T=e.serverCache.getNode().getImmediateChild(p),I=C0(t,T,v);u=Wl(t,u,new ie(p),I,s,i,o,l)}}),h.children.inorderTraversal((p,v)=>{const T=!e.serverCache.isCompleteForChild(p)&&v.value===null;if(!m.hasChild(p)&&!T){const I=e.serverCache.getNode().getImmediateChild(p),A=C0(t,I,v);u=Wl(t,u,new ie(p),A,s,i,o,l)}}),u}function Eb(t,e,n,r,s,i,o){if(Hl(s,n)!=null)return e;const l=e.serverCache.isFiltered(),u=e.serverCache;if(r.value!=null){if(Q(n)&&u.isFullyInitialized()||u.isCompleteForPath(n))return Wl(t,e,n,u.getNode().getChild(n),s,i,l,o);if(Q(n)){let h=new le(null);return u.getNode().forEachChild(Os,(m,p)=>{h=h.set(new ie(m),p)}),hh(t,e,n,h,s,i,l,o)}else return e}else{let h=new le(null);return r.foreach((m,p)=>{const v=xe(n,m);u.isCompleteForPath(v)&&(h=h.set(m,u.getNode().getChild(v)))}),hh(t,e,n,h,s,i,l,o)}}function kb(t,e,n,r,s){const i=e.serverCache,o=rw(e,i.getNode(),i.isFullyInitialized()||Q(n),i.isFiltered());return uw(t,o,n,r,cw,s)}function Sb(t,e,n,r,s,i){let o;if(Hl(r,n)!=null)return e;{const l=new qf(r,e,s),u=e.eventCache.getNode();let h;if(Q(n)||q(n)===".priority"){let m;if(e.serverCache.isFullyInitialized())m=Bl(r,Hr(e));else{const p=e.serverCache.getNode();F(p instanceof B,"serverChildren would be complete if leaf node"),m=Wf(r,p)}m=m,h=t.filter.updateFullNode(u,m,i)}else{const m=q(n);let p=Gf(r,m,e.serverCache);p==null&&e.serverCache.isCompleteForChild(m)&&(p=u.getImmediateChild(m)),p!=null?h=t.filter.updateChild(u,m,p,ce(n),l,i):e.eventCache.getNode().hasChild(m)?h=t.filter.updateChild(u,m,B.EMPTY_NODE,ce(n),l,i):h=u,h.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Bl(r,Hr(e)),o.isLeafNode()&&(h=t.filter.updateFullNode(h,o,i)))}return o=e.serverCache.isFullyInitialized()||Hl(r,ne())!=null,Xi(e,h,o,t.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nb{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const r=this.query_._queryParams,s=new zf(r.getIndex()),i=BT(r);this.processor_=vb(i);const o=n.serverCache,l=n.eventCache,u=s.updateFullNode(B.EMPTY_NODE,o.getNode(),null),h=i.updateFullNode(B.EMPTY_NODE,l.getNode(),null),m=new hr(u,o.isFullyInitialized(),s.filtersNodes()),p=new hr(h,l.isFullyInitialized(),i.filtersNodes());this.viewCache_=Ic(p,m),this.eventGenerator_=new QT(this.query_)}get query(){return this.query_}}function Cb(t){return t.viewCache_.serverCache.getNode()}function Ib(t){return $l(t.viewCache_)}function Tb(t,e){const n=Hr(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!Q(e)&&!n.getImmediateChild(q(e)).isEmpty())?n.getChild(e):null}function I0(t){return t.eventRegistrations_.length===0}function bb(t,e){t.eventRegistrations_.push(e)}function T0(t,e,n){const r=[];if(n){F(e==null,"A cancel should cancel all event registrations.");const s=t.query._path;t.eventRegistrations_.forEach(i=>{const o=i.createCancelEvent(n,s);o&&r.push(o)})}if(e){let s=[];for(let i=0;i<t.eventRegistrations_.length;++i){const o=t.eventRegistrations_[i];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(t.eventRegistrations_.slice(i+1));break}}t.eventRegistrations_=s}else t.eventRegistrations_=[];return r}function b0(t,e,n,r){e.type===Vt.MERGE&&e.source.queryId!==null&&(F(Hr(t.viewCache_),"We should always have a full cache before handling merges"),F($l(t.viewCache_),"Missing event cache, even though we have a server cache"));const s=t.viewCache_,i=_b(t.processor_,s,e,n,r);return yb(t.processor_,i.viewCache),F(i.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=i.viewCache,dw(t,i.changes,i.viewCache.eventCache.getNode(),null)}function Rb(t,e){const n=t.viewCache_.eventCache,r=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(we,(i,o)=>{r.push(qs(i,o))}),n.isFullyInitialized()&&r.push(tw(n.getNode())),dw(t,r,n.getNode(),e)}function dw(t,e,n,r){const s=r?[r]:t.eventRegistrations_;return XT(t.eventGenerator_,e,n,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Gl;class hw{constructor(){this.views=new Map}}function Pb(t){F(!Gl,"__referenceConstructor has already been defined"),Gl=t}function Ab(){return F(Gl,"Reference.ts has not been loaded"),Gl}function jb(t){return t.views.size===0}function Kf(t,e,n,r){const s=e.source.queryId;if(s!==null){const i=t.views.get(s);return F(i!=null,"SyncTree gave us an op for an invalid query."),b0(i,e,n,r)}else{let i=[];for(const o of t.views.values())i=i.concat(b0(o,e,n,r));return i}}function fw(t,e,n,r,s){const i=e._queryIdentifier,o=t.views.get(i);if(!o){let l=Bl(n,s?r:null),u=!1;l?u=!0:r instanceof B?(l=Wf(n,r),u=!1):(l=B.EMPTY_NODE,u=!1);const h=Ic(new hr(l,u,!1),new hr(r,s,!1));return new Nb(e,h)}return o}function Ob(t,e,n,r,s,i){const o=fw(t,e,r,s,i);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),bb(o,n),Rb(o,n)}function Db(t,e,n,r){const s=e._queryIdentifier,i=[];let o=[];const l=fr(t);if(s==="default")for(const[u,h]of t.views.entries())o=o.concat(T0(h,n,r)),I0(h)&&(t.views.delete(u),h.query._queryParams.loadsAllData()||i.push(h.query));else{const u=t.views.get(s);u&&(o=o.concat(T0(u,n,r)),I0(u)&&(t.views.delete(s),u.query._queryParams.loadsAllData()||i.push(u.query)))}return l&&!fr(t)&&i.push(new(Ab())(e._repo,e._path)),{removed:i,events:o}}function pw(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function lr(t,e){let n=null;for(const r of t.views.values())n=n||Tb(r,e);return n}function mw(t,e){if(e._queryParams.loadsAllData())return bc(t);{const r=e._queryIdentifier;return t.views.get(r)}}function gw(t,e){return mw(t,e)!=null}function fr(t){return bc(t)!=null}function bc(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ql;function Lb(t){F(!ql,"__referenceConstructor has already been defined"),ql=t}function Mb(){return F(ql,"Reference.ts has not been loaded"),ql}let Fb=1;class R0{constructor(e){this.listenProvider_=e,this.syncPointTree_=new le(null),this.pendingWriteTree_=fb(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function vw(t,e,n,r,s){return tb(t.pendingWriteTree_,e,n,r,s),s?ii(t,new Br($f(),e,n)):[]}function Ub(t,e,n,r){nb(t.pendingWriteTree_,e,n,r);const s=le.fromObject(n);return ii(t,new Ks($f(),e,s))}function Yn(t,e,n=!1){const r=rb(t.pendingWriteTree_,e);if(sb(t.pendingWriteTree_,e)){let i=new le(null);return r.snap!=null?i=i.set(ne(),!0):$e(r.children,o=>{i=i.set(new ie(o),!0)}),ii(t,new Vl(r.path,i,n))}else return[]}function Qo(t,e,n){return ii(t,new Br(Bf(),e,n))}function zb(t,e,n){const r=le.fromObject(n);return ii(t,new Ks(Bf(),e,r))}function Vb(t,e){return ii(t,new Po(Bf(),e))}function $b(t,e,n){const r=Qf(t,n);if(r){const s=Xf(r),i=s.path,o=s.queryId,l=tt(i,e),u=new Po(Hf(o),l);return Jf(t,i,u)}else return[]}function Kl(t,e,n,r,s=!1){const i=e._path,o=t.syncPointTree_.get(i);let l=[];if(o&&(e._queryIdentifier==="default"||gw(o,e))){const u=Db(o,e,n,r);jb(o)&&(t.syncPointTree_=t.syncPointTree_.remove(i));const h=u.removed;if(l=u.events,!s){const m=h.findIndex(v=>v._queryParams.loadsAllData())!==-1,p=t.syncPointTree_.findOnPath(i,(v,T)=>fr(T));if(m&&!p){const v=t.syncPointTree_.subtree(i);if(!v.isEmpty()){const T=Wb(v);for(let I=0;I<T.length;++I){const A=T[I],O=A.query,S=ww(t,A);t.listenProvider_.startListening(Zi(O),Ao(t,O),S.hashFn,S.onComplete)}}}!p&&h.length>0&&!r&&(m?t.listenProvider_.stopListening(Zi(e),null):h.forEach(v=>{const T=t.queryToTagMap.get(Rc(v));t.listenProvider_.stopListening(Zi(v),T)}))}Gb(t,h)}return l}function yw(t,e,n,r){const s=Qf(t,r);if(s!=null){const i=Xf(s),o=i.path,l=i.queryId,u=tt(o,e),h=new Br(Hf(l),u,n);return Jf(t,o,h)}else return[]}function Bb(t,e,n,r){const s=Qf(t,r);if(s){const i=Xf(s),o=i.path,l=i.queryId,u=tt(o,e),h=le.fromObject(n),m=new Ks(Hf(l),u,h);return Jf(t,o,m)}else return[]}function fh(t,e,n,r=!1){const s=e._path;let i=null,o=!1;t.syncPointTree_.foreachOnPath(s,(v,T)=>{const I=tt(v,s);i=i||lr(T,I),o=o||fr(T)});let l=t.syncPointTree_.get(s);l?(o=o||fr(l),i=i||lr(l,ne())):(l=new hw,t.syncPointTree_=t.syncPointTree_.set(s,l));let u;i!=null?u=!0:(u=!1,i=B.EMPTY_NODE,t.syncPointTree_.subtree(s).foreachChild((T,I)=>{const A=lr(I,ne());A&&(i=i.updateImmediateChild(T,A))}));const h=gw(l,e);if(!h&&!e._queryParams.loadsAllData()){const v=Rc(e);F(!t.queryToTagMap.has(v),"View does not exist, but we have a tag");const T=qb();t.queryToTagMap.set(v,T),t.tagToQueryMap.set(T,v)}const m=Tc(t.pendingWriteTree_,s);let p=Ob(l,e,n,m,i,u);if(!h&&!o&&!r){const v=mw(l,e);p=p.concat(Kb(t,e,v))}return p}function Yf(t,e,n){const s=t.pendingWriteTree_,i=t.syncPointTree_.findOnPath(e,(o,l)=>{const u=tt(o,e),h=lr(l,u);if(h)return h});return ow(s,e,i,n,!0)}function Hb(t,e){const n=e._path;let r=null;t.syncPointTree_.foreachOnPath(n,(h,m)=>{const p=tt(h,n);r=r||lr(m,p)});let s=t.syncPointTree_.get(n);s?r=r||lr(s,ne()):(s=new hw,t.syncPointTree_=t.syncPointTree_.set(n,s));const i=r!=null,o=i?new hr(r,!0,!1):null,l=Tc(t.pendingWriteTree_,e._path),u=fw(s,e,l,i?o.getNode():B.EMPTY_NODE,i);return Ib(u)}function ii(t,e){return _w(e,t.syncPointTree_,null,Tc(t.pendingWriteTree_,ne()))}function _w(t,e,n,r){if(Q(t.path))return xw(t,e,n,r);{const s=e.get(ne());n==null&&s!=null&&(n=lr(s,ne()));let i=[];const o=q(t.path),l=t.operationForChild(o),u=e.children.get(o);if(u&&l){const h=n?n.getImmediateChild(o):null,m=aw(r,o);i=i.concat(_w(l,u,h,m))}return s&&(i=i.concat(Kf(s,t,r,n))),i}}function xw(t,e,n,r){const s=e.get(ne());n==null&&s!=null&&(n=lr(s,ne()));let i=[];return e.children.inorderTraversal((o,l)=>{const u=n?n.getImmediateChild(o):null,h=aw(r,o),m=t.operationForChild(o);m&&(i=i.concat(xw(m,l,u,h)))}),s&&(i=i.concat(Kf(s,t,r,n))),i}function ww(t,e){const n=e.query,r=Ao(t,n);return{hashFn:()=>(Cb(e)||B.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return r?$b(t,n._path,r):Vb(t,n._path);{const i=V2(s,n);return Kl(t,n,null,i)}}}}function Ao(t,e){const n=Rc(e);return t.queryToTagMap.get(n)}function Rc(t){return t._path.toString()+"$"+t._queryIdentifier}function Qf(t,e){return t.tagToQueryMap.get(e)}function Xf(t){const e=t.indexOf("$");return F(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new ie(t.substr(0,e))}}function Jf(t,e,n){const r=t.syncPointTree_.get(e);F(r,"Missing sync point for query tag that we're tracking");const s=Tc(t.pendingWriteTree_,e);return Kf(r,n,s,null)}function Wb(t){return t.fold((e,n,r)=>{if(n&&fr(n))return[bc(n)];{let s=[];return n&&(s=pw(n)),$e(r,(i,o)=>{s=s.concat(o)}),s}})}function Zi(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(Mb())(t._repo,t._path):t}function Gb(t,e){for(let n=0;n<e.length;++n){const r=e[n];if(!r._queryParams.loadsAllData()){const s=Rc(r),i=t.queryToTagMap.get(s);t.queryToTagMap.delete(s),t.tagToQueryMap.delete(i)}}}function qb(){return Fb++}function Kb(t,e,n){const r=e._path,s=Ao(t,e),i=ww(t,n),o=t.listenProvider_.startListening(Zi(e),s,i.hashFn,i.onComplete),l=t.syncPointTree_.subtree(r);if(s)F(!fr(l.value),"If we're adding a query, it shouldn't be shadowed");else{const u=l.fold((h,m,p)=>{if(!Q(h)&&m&&fr(m))return[bc(m).query];{let v=[];return m&&(v=v.concat(pw(m).map(T=>T.query))),$e(p,(T,I)=>{v=v.concat(I)}),v}});for(let h=0;h<u.length;++h){const m=u[h];t.listenProvider_.stopListening(Zi(m),Ao(t,m))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zf{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new Zf(n)}node(){return this.node_}}class ep{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=xe(this.path_,e);return new ep(this.syncTree_,n)}node(){return Yf(this.syncTree_,this.path_)}}const Yb=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},P0=function(t,e,n){if(!t||typeof t!="object")return t;if(F(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return Qb(t[".sv"],e,n);if(typeof t[".sv"]=="object")return Xb(t[".sv"],e);F(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},Qb=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:F(!1,"Unexpected server value: "+t)}},Xb=function(t,e,n){t.hasOwnProperty("increment")||F(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const r=t.increment;typeof r!="number"&&F(!1,"Unexpected increment value: "+r);const s=e.node();if(F(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return r;const o=s.getValue();return typeof o!="number"?r:o+r},Ew=function(t,e,n,r){return tp(e,new ep(n,t),r)},kw=function(t,e,n){return tp(t,new Zf(e),n)};function tp(t,e,n){const r=t.getPriority().val(),s=P0(r,e.getImmediateChild(".priority"),n);let i;if(t.isLeafNode()){const o=t,l=P0(o.getValue(),e,n);return l!==o.getValue()||s!==o.getPriority().val()?new Re(l,Ie(s)):t}else{const o=t;return i=o,s!==o.getPriority().val()&&(i=i.updatePriority(new Re(s))),o.forEachChild(we,(l,u)=>{const h=tp(u,e.getImmediateChild(l),n);h!==u&&(i=i.updateImmediateChild(l,h))}),i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class np{constructor(e="",n=null,r={children:{},childCount:0}){this.name=e,this.parent=n,this.node=r}}function rp(t,e){let n=e instanceof ie?e:new ie(e),r=t,s=q(n);for(;s!==null;){const i=Hs(r.node.children,s)||{children:{},childCount:0};r=new np(s,r,i),n=ce(n),s=q(n)}return r}function oi(t){return t.node.value}function Sw(t,e){t.node.value=e,ph(t)}function Nw(t){return t.node.childCount>0}function Jb(t){return oi(t)===void 0&&!Nw(t)}function Pc(t,e){$e(t.node.children,(n,r)=>{e(new np(n,t,r))})}function Cw(t,e,n,r){n&&e(t),Pc(t,s=>{Cw(s,e,!0)})}function Zb(t,e,n){let r=t.parent;for(;r!==null;){if(e(r))return!0;r=r.parent}return!1}function Xo(t){return new ie(t.parent===null?t.name:Xo(t.parent)+"/"+t.name)}function ph(t){t.parent!==null&&eR(t.parent,t.name,t)}function eR(t,e,n){const r=Jb(n),s=on(t.node.children,e);r&&s?(delete t.node.children[e],t.node.childCount--,ph(t)):!r&&!s&&(t.node.children[e]=n.node,t.node.childCount++,ph(t))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tR=/[\[\].#$\/\u0000-\u001F\u007F]/,nR=/[\[\].#$\u0000-\u001F\u007F]/,Yu=10*1024*1024,sp=function(t){return typeof t=="string"&&t.length!==0&&!tR.test(t)},Iw=function(t){return typeof t=="string"&&t.length!==0&&!nR.test(t)},rR=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),Iw(t)},sR=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!Pf(t)||t&&typeof t=="object"&&on(t,".sv")},iR=function(t,e,n,r){Ac(xc(t,"value"),e,n)},Ac=function(t,e,n){const r=n instanceof ie?new wT(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+Cr(r));if(typeof e=="function")throw new Error(t+"contains a function "+Cr(r)+" with contents = "+e.toString());if(Pf(e))throw new Error(t+"contains "+e.toString()+" "+Cr(r));if(typeof e=="string"&&e.length>Yu/3&&wc(e)>Yu)throw new Error(t+"contains a string greater than "+Yu+" utf8 bytes "+Cr(r)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,i=!1;if($e(e,(o,l)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(i=!0,!sp(o)))throw new Error(t+" contains an invalid key ("+o+") "+Cr(r)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);ET(r,o),Ac(t,l,r),kT(r)}),s&&i)throw new Error(t+' contains ".value" child '+Cr(r)+" in addition to actual children.")}},oR=function(t,e){let n,r;for(n=0;n<e.length;n++){r=e[n];const i=Io(r);for(let o=0;o<i.length;o++)if(!(i[o]===".priority"&&o===i.length-1)){if(!sp(i[o]))throw new Error(t+"contains an invalid key ("+i[o]+") in path "+r.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(xT);let s=null;for(n=0;n<e.length;n++){if(r=e[n],s!==null&&bt(s,r))throw new Error(t+"contains a path "+s.toString()+" that is ancestor of another path "+r.toString());s=r}},aR=function(t,e,n,r){const s=xc(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const i=[];$e(e,(o,l)=>{const u=new ie(o);if(Ac(s,l,xe(n,u)),Lf(u)===".priority"&&!sR(l))throw new Error(s+"contains an invalid value for '"+u.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");i.push(u)}),oR(s,i)},Tw=function(t,e,n,r){if(!Iw(n))throw new Error(xc(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},lR=function(t,e,n,r){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),Tw(t,e,n)},bw=function(t,e){if(q(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},cR=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!sp(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!rR(n))throw new Error(xc(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uR{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function jc(t,e){let n=null;for(let r=0;r<e.length;r++){const s=e[r],i=s.getPath();n!==null&&!Mf(i,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:i}),n.events.push(s)}n&&t.eventLists_.push(n)}function Rw(t,e,n){jc(t,n),Pw(t,r=>Mf(r,e))}function Ot(t,e,n){jc(t,n),Pw(t,r=>bt(r,e)||bt(e,r))}function Pw(t,e){t.recursionDepth_++;let n=!0;for(let r=0;r<t.eventLists_.length;r++){const s=t.eventLists_[r];if(s){const i=s.path;e(i)?(dR(t.eventLists_[r]),t.eventLists_[r]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function dR(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const r=n.getEventRunner();Yi&&Ue("event: "+n.toString()),si(r)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hR="repo_interrupt",fR=25;class pR{constructor(e,n,r,s){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=r,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new uR,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=zl(),this.transactionQueueTree_=new np,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function mR(t,e,n){if(t.stats_=Of(t.repoInfo_),t.forceRestClient_||W2())t.server_=new Ul(t.repoInfo_,(r,s,i,o)=>{A0(t,r,s,i,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>j0(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{Te(n)}catch(r){throw new Error("Invalid authOverride provided: "+r)}}t.persistentConnection_=new kn(t.repoInfo_,e,(r,s,i,o)=>{A0(t,r,s,i,o)},r=>{j0(t,r)},r=>{vR(t,r)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(r=>{t.server_.refreshAuthToken(r)}),t.appCheckProvider_.addTokenChangeListener(r=>{t.server_.refreshAppCheckToken(r.token)}),t.statsReporter_=Q2(t.repoInfo_,()=>new YT(t.stats_,t.server_)),t.infoData_=new HT,t.infoSyncTree_=new R0({startListening:(r,s,i,o)=>{let l=[];const u=t.infoData_.getNode(r._path);return u.isEmpty()||(l=Qo(t.infoSyncTree_,r._path,u),setTimeout(()=>{o("ok")},0)),l},stopListening:()=>{}}),ip(t,"connected",!1),t.serverSyncTree_=new R0({startListening:(r,s,i,o)=>(t.server_.listen(r,i,s,(l,u)=>{const h=o(l,u);Ot(t.eventQueue_,r._path,h)}),[]),stopListening:(r,s)=>{t.server_.unlisten(r,s)}})}function gR(t){const n=t.infoData_.getNode(new ie(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function Oc(t){return Yb({timestamp:gR(t)})}function A0(t,e,n,r,s){t.dataUpdateCount++;const i=new ie(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(s)if(r){const u=bl(n,h=>Ie(h));o=Bb(t.serverSyncTree_,i,u,s)}else{const u=Ie(n);o=yw(t.serverSyncTree_,i,u,s)}else if(r){const u=bl(n,h=>Ie(h));o=zb(t.serverSyncTree_,i,u)}else{const u=Ie(n);o=Qo(t.serverSyncTree_,i,u)}let l=i;o.length>0&&(l=Qs(t,i)),Ot(t.eventQueue_,l,o)}function j0(t,e){ip(t,"connected",e),e===!1&&wR(t)}function vR(t,e){$e(e,(n,r)=>{ip(t,n,r)})}function ip(t,e,n){const r=new ie("/.info/"+e),s=Ie(n);t.infoData_.updateSnapshot(r,s);const i=Qo(t.infoSyncTree_,r,s);Ot(t.eventQueue_,r,i)}function op(t){return t.nextWriteId_++}function yR(t,e,n){const r=Hb(t.serverSyncTree_,e);return r!=null?Promise.resolve(r):t.server_.get(e).then(s=>{const i=Ie(s).withIndex(e._queryParams.getIndex());fh(t.serverSyncTree_,e,n,!0);let o;if(e._queryParams.loadsAllData())o=Qo(t.serverSyncTree_,e._path,i);else{const l=Ao(t.serverSyncTree_,e);o=yw(t.serverSyncTree_,e._path,i,l)}return Ot(t.eventQueue_,e._path,o),Kl(t.serverSyncTree_,e,n,null,!0),i},s=>(Jo(t,"get for query "+Te(e)+" failed: "+s),Promise.reject(new Error(s))))}function _R(t,e,n,r,s){Jo(t,"set",{path:e.toString(),value:n,priority:r});const i=Oc(t),o=Ie(n,r),l=Yf(t.serverSyncTree_,e),u=kw(o,l,i),h=op(t),m=vw(t.serverSyncTree_,e,u,h,!0);jc(t.eventQueue_,m),t.server_.put(e.toString(),o.val(!0),(v,T)=>{const I=v==="ok";I||rt("set at "+e+" failed: "+v);const A=Yn(t.serverSyncTree_,h,!I);Ot(t.eventQueue_,e,A),mh(t,s,v,T)});const p=lp(t,e);Qs(t,p),Ot(t.eventQueue_,p,[])}function xR(t,e,n,r){Jo(t,"update",{path:e.toString(),value:n});let s=!0;const i=Oc(t),o={};if($e(n,(l,u)=>{s=!1,o[l]=Ew(xe(e,l),Ie(u),t.serverSyncTree_,i)}),s)Ue("update() called with empty data.  Don't do anything."),mh(t,r,"ok",void 0);else{const l=op(t),u=Ub(t.serverSyncTree_,e,o,l);jc(t.eventQueue_,u),t.server_.merge(e.toString(),n,(h,m)=>{const p=h==="ok";p||rt("update at "+e+" failed: "+h);const v=Yn(t.serverSyncTree_,l,!p),T=v.length>0?Qs(t,e):e;Ot(t.eventQueue_,T,v),mh(t,r,h,m)}),$e(n,h=>{const m=lp(t,xe(e,h));Qs(t,m)}),Ot(t.eventQueue_,e,[])}}function wR(t){Jo(t,"onDisconnectEvents");const e=Oc(t),n=zl();ah(t.onDisconnect_,ne(),(s,i)=>{const o=Ew(s,i,t.serverSyncTree_,e);nw(n,s,o)});let r=[];ah(n,ne(),(s,i)=>{r=r.concat(Qo(t.serverSyncTree_,s,i));const o=lp(t,s);Qs(t,o)}),t.onDisconnect_=zl(),Ot(t.eventQueue_,ne(),r)}function ER(t,e,n){let r;q(e._path)===".info"?r=fh(t.infoSyncTree_,e,n):r=fh(t.serverSyncTree_,e,n),Rw(t.eventQueue_,e._path,r)}function O0(t,e,n){let r;q(e._path)===".info"?r=Kl(t.infoSyncTree_,e,n):r=Kl(t.serverSyncTree_,e,n),Rw(t.eventQueue_,e._path,r)}function kR(t){t.persistentConnection_&&t.persistentConnection_.interrupt(hR)}function Jo(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),Ue(n,...e)}function mh(t,e,n,r){e&&si(()=>{if(n==="ok")e(null);else{const s=(n||"error").toUpperCase();let i=s;r&&(i+=": "+r);const o=new Error(i);o.code=s,e(o)}})}function Aw(t,e,n){return Yf(t.serverSyncTree_,e,n)||B.EMPTY_NODE}function ap(t,e=t.transactionQueueTree_){if(e||Dc(t,e),oi(e)){const n=Ow(t,e);F(n.length>0,"Sending zero length transaction queue"),n.every(s=>s.status===0)&&SR(t,Xo(e),n)}else Nw(e)&&Pc(e,n=>{ap(t,n)})}function SR(t,e,n){const r=n.map(h=>h.currentWriteId),s=Aw(t,e,r);let i=s;const o=s.hash();for(let h=0;h<n.length;h++){const m=n[h];F(m.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),m.status=1,m.retryCount++;const p=tt(e,m.path);i=i.updateChild(p,m.currentOutputSnapshotRaw)}const l=i.val(!0),u=e;t.server_.put(u.toString(),l,h=>{Jo(t,"transaction put response",{path:u.toString(),status:h});let m=[];if(h==="ok"){const p=[];for(let v=0;v<n.length;v++)n[v].status=2,m=m.concat(Yn(t.serverSyncTree_,n[v].currentWriteId)),n[v].onComplete&&p.push(()=>n[v].onComplete(null,!0,n[v].currentOutputSnapshotResolved)),n[v].unwatcher();Dc(t,rp(t.transactionQueueTree_,e)),ap(t,t.transactionQueueTree_),Ot(t.eventQueue_,e,m);for(let v=0;v<p.length;v++)si(p[v])}else{if(h==="datastale")for(let p=0;p<n.length;p++)n[p].status===3?n[p].status=4:n[p].status=0;else{rt("transaction at "+u.toString()+" failed: "+h);for(let p=0;p<n.length;p++)n[p].status=4,n[p].abortReason=h}Qs(t,e)}},o)}function Qs(t,e){const n=jw(t,e),r=Xo(n),s=Ow(t,n);return NR(t,s,r),r}function NR(t,e,n){if(e.length===0)return;const r=[];let s=[];const o=e.filter(l=>l.status===0).map(l=>l.currentWriteId);for(let l=0;l<e.length;l++){const u=e[l],h=tt(n,u.path);let m=!1,p;if(F(h!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),u.status===4)m=!0,p=u.abortReason,s=s.concat(Yn(t.serverSyncTree_,u.currentWriteId,!0));else if(u.status===0)if(u.retryCount>=fR)m=!0,p="maxretry",s=s.concat(Yn(t.serverSyncTree_,u.currentWriteId,!0));else{const v=Aw(t,u.path,o);u.currentInputSnapshot=v;const T=e[l].update(v.val());if(T!==void 0){Ac("transaction failed: Data returned ",T,u.path);let I=Ie(T);typeof T=="object"&&T!=null&&on(T,".priority")||(I=I.updatePriority(v.getPriority()));const O=u.currentWriteId,S=Oc(t),E=kw(I,v,S);u.currentOutputSnapshotRaw=I,u.currentOutputSnapshotResolved=E,u.currentWriteId=op(t),o.splice(o.indexOf(O),1),s=s.concat(vw(t.serverSyncTree_,u.path,E,u.currentWriteId,u.applyLocally)),s=s.concat(Yn(t.serverSyncTree_,O,!0))}else m=!0,p="nodata",s=s.concat(Yn(t.serverSyncTree_,u.currentWriteId,!0))}Ot(t.eventQueue_,n,s),s=[],m&&(e[l].status=2,function(v){setTimeout(v,Math.floor(0))}(e[l].unwatcher),e[l].onComplete&&(p==="nodata"?r.push(()=>e[l].onComplete(null,!1,e[l].currentInputSnapshot)):r.push(()=>e[l].onComplete(new Error(p),!1,null))))}Dc(t,t.transactionQueueTree_);for(let l=0;l<r.length;l++)si(r[l]);ap(t,t.transactionQueueTree_)}function jw(t,e){let n,r=t.transactionQueueTree_;for(n=q(e);n!==null&&oi(r)===void 0;)r=rp(r,n),e=ce(e),n=q(e);return r}function Ow(t,e){const n=[];return Dw(t,e,n),n.sort((r,s)=>r.order-s.order),n}function Dw(t,e,n){const r=oi(e);if(r)for(let s=0;s<r.length;s++)n.push(r[s]);Pc(e,s=>{Dw(t,s,n)})}function Dc(t,e){const n=oi(e);if(n){let r=0;for(let s=0;s<n.length;s++)n[s].status!==2&&(n[r]=n[s],r++);n.length=r,Sw(e,n.length>0?n:void 0)}Pc(e,r=>{Dc(t,r)})}function lp(t,e){const n=Xo(jw(t,e)),r=rp(t.transactionQueueTree_,e);return Zb(r,s=>{Qu(t,s)}),Qu(t,r),Cw(r,s=>{Qu(t,s)}),n}function Qu(t,e){const n=oi(e);if(n){const r=[];let s=[],i=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(F(i===o-1,"All SENT items should be at beginning of queue."),i=o,n[o].status=3,n[o].abortReason="set"):(F(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),s=s.concat(Yn(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&r.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));i===-1?Sw(e,void 0):n.length=i+1,Ot(t.eventQueue_,Xo(e),s);for(let o=0;o<r.length;o++)si(r[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function CR(t){let e="";const n=t.split("/");for(let r=0;r<n.length;r++)if(n[r].length>0){let s=n[r];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function IR(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const r=n.split("=");r.length===2?e[decodeURIComponent(r[0])]=decodeURIComponent(r[1]):rt(`Invalid query segment '${n}' in query '${t}'`)}return e}const D0=function(t,e){const n=TR(t),r=n.namespace;n.domain==="firebase.com"&&Rn(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!r||r==="undefined")&&n.domain!=="localhost"&&Rn("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||L2();const s=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new Ux(n.host,n.secure,r,s,e,"",r!==n.subdomain),path:new ie(n.pathString)}},TR=function(t){let e="",n="",r="",s="",i="",o=!0,l="https",u=443;if(typeof t=="string"){let h=t.indexOf("//");h>=0&&(l=t.substring(0,h-1),t=t.substring(h+2));let m=t.indexOf("/");m===-1&&(m=t.length);let p=t.indexOf("?");p===-1&&(p=t.length),e=t.substring(0,Math.min(m,p)),m<p&&(s=CR(t.substring(m,p)));const v=IR(t.substring(Math.min(t.length,p)));h=e.indexOf(":"),h>=0?(o=l==="https"||l==="wss",u=parseInt(e.substring(h+1),10)):h=e.length;const T=e.slice(0,h);if(T.toLowerCase()==="localhost")n="localhost";else if(T.split(".").length<=2)n=T;else{const I=e.indexOf(".");r=e.substring(0,I).toLowerCase(),n=e.substring(I+1),i=r}"ns"in v&&(i=v.ns)}return{host:e,port:u,domain:n,subdomain:r,secure:o,scheme:l,pathString:s,namespace:i}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bR{constructor(e,n,r,s){this.eventType=e,this.eventRegistration=n,this.snapshot=r,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+Te(this.snapshot.exportVal())}}class RR{constructor(e,n,r){this.eventRegistration=e,this.error=n,this.path=r}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lw{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return F(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class cp{constructor(e,n,r,s){this._repo=e,this._path=n,this._queryParams=r,this._orderByCalled=s}get key(){return Q(this._path)?null:Lf(this._path)}get ref(){return new jn(this._repo,this._path)}get _queryIdentifier(){const e=x0(this._queryParams),n=Af(e);return n==="{}"?"default":n}get _queryObject(){return x0(this._queryParams)}isEqual(e){if(e=Oe(e),!(e instanceof cp))return!1;const n=this._repo===e._repo,r=Mf(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return n&&r&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+_T(this._path)}}class jn extends cp{constructor(e,n){super(e,n,new Vf,!1)}get parent(){const e=Kx(this._path);return e===null?null:new jn(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class jo{constructor(e,n,r){this._node=e,this.ref=n,this._index=r}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new ie(e),r=gh(this.ref,e);return new jo(this._node.getChild(n),r,we)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(r,s)=>e(new jo(s,gh(this.ref,r),we)))}hasChild(e){const n=new ie(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function Me(t,e){return t=Oe(t),t._checkNotDeleted("ref"),e!==void 0?gh(t._root,e):t._root}function gh(t,e){return t=Oe(t),q(t._path)===null?lR("child","path",e):Tw("child","path",e),new jn(t._repo,xe(t._path,e))}function PR(t){return bw("remove",t._path),vh(t,null)}function vh(t,e){t=Oe(t),bw("set",t._path),iR("set",e,t._path);const n=new Vo;return _R(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}function L0(t,e){aR("update",e,t._path);const n=new Vo;return xR(t._repo,t._path,e,n.wrapCallback(()=>{})),n.promise}function cs(t){t=Oe(t);const e=new Lw(()=>{}),n=new Lc(e);return yR(t._repo,t,n).then(r=>new jo(r,new jn(t._repo,t._path),t._queryParams.getIndex()))}class Lc{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const r=n._queryParams.getIndex();return new bR("value",this,new jo(e.snapshotNode,new jn(n._repo,n._path),r))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new RR(this,e,n):null}matches(e){return e instanceof Lc?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function AR(t,e,n,r,s){let i;if(typeof r=="object"&&(i=void 0,s=r),typeof r=="function"&&(i=r),s&&s.onlyOnce){const u=n,h=(m,p)=>{O0(t._repo,t,l),u(m,p)};h.userCallback=n.userCallback,h.context=n.context,n=h}const o=new Lw(n,i||void 0),l=new Lc(o);return ER(t._repo,t,l),()=>O0(t._repo,t,l)}function as(t,e,n,r){return AR(t,"value",e,n,r)}Pb(jn);Lb(jn);/**
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
 */const jR="FIREBASE_DATABASE_EMULATOR_HOST",yh={};let OR=!1;function DR(t,e,n,r){t.repoInfo_=new Ux(`${e}:${n}`,!1,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0),r&&(t.authTokenProvider_=r)}function LR(t,e,n,r,s){let i=r||t.options.databaseURL;i===void 0&&(t.options.projectId||Rn("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),Ue("Using default host for project ",t.options.projectId),i=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=D0(i,s),l=o.repoInfo,u;typeof process<"u"&&n0&&(u=n0[jR]),u?(i=`http://${u}?ns=${l.namespace}`,o=D0(i,s),l=o.repoInfo):o.repoInfo.secure;const h=new q2(t.name,t.options,e);cR("Invalid Firebase Database URL",o),Q(o.path)||Rn("Database URL must point to the root of a Firebase Database (not including a child path).");const m=FR(l,t,h,new G2(t.name,n));return new UR(m,t)}function MR(t,e){const n=yh[e];(!n||n[t.key]!==t)&&Rn(`Database ${e}(${t.repoInfo_}) has already been deleted.`),kR(t),delete n[t.key]}function FR(t,e,n,r){let s=yh[e.name];s||(s={},yh[e.name]=s);let i=s[t.toURLString()];return i&&Rn("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),i=new pR(t,OR,n,r),s[t.toURLString()]=i,i}class UR{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(mR(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new jn(this._repo,ne())),this._rootInternal}_delete(){return this._rootInternal!==null&&(MR(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Rn("Cannot call "+e+" on a deleted database.")}}function zR(t=Ec(),e){const n=yr(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const r=R_("database");r&&VR(n,...r)}return n}function VR(t,e,n,r={}){t=Oe(t),t._checkNotDeleted("useEmulator"),t._instanceStarted&&Rn("Cannot call useEmulator() after instance has already been initialized.");const s=t._repoInternal;let i;if(s.repoInfo_.nodeAdmin)r.mockUserToken&&Rn('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),i=new el(el.OWNER);else if(r.mockUserToken){const o=typeof r.mockUserToken=="string"?r.mockUserToken:j_(r.mockUserToken,t.app.options.projectId);i=new el(o)}DR(s,e,n,i)}/**
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
 */function $R(t){R2(Qr),qt(new jt("database",(e,{instanceIdentifier:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),i=e.getProvider("app-check-internal");return LR(r,s,i,n)},"PUBLIC").setMultipleInstances(!0)),mt(r0,s0,t),mt(r0,s0,"esm2017")}kn.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};kn.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};$R();var M0=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Mw;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(x,y){function _(){}_.prototype=y.prototype,x.D=y.prototype,x.prototype=new _,x.prototype.constructor=x,x.C=function(k,N,b){for(var w=Array(arguments.length-2),J=2;J<arguments.length;J++)w[J-2]=arguments[J];return y.prototype[N].apply(k,w)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(x,y,_){_||(_=0);var k=Array(16);if(typeof y=="string")for(var N=0;16>N;++N)k[N]=y.charCodeAt(_++)|y.charCodeAt(_++)<<8|y.charCodeAt(_++)<<16|y.charCodeAt(_++)<<24;else for(N=0;16>N;++N)k[N]=y[_++]|y[_++]<<8|y[_++]<<16|y[_++]<<24;y=x.g[0],_=x.g[1],N=x.g[2];var b=x.g[3],w=y+(b^_&(N^b))+k[0]+3614090360&4294967295;y=_+(w<<7&4294967295|w>>>25),w=b+(N^y&(_^N))+k[1]+3905402710&4294967295,b=y+(w<<12&4294967295|w>>>20),w=N+(_^b&(y^_))+k[2]+606105819&4294967295,N=b+(w<<17&4294967295|w>>>15),w=_+(y^N&(b^y))+k[3]+3250441966&4294967295,_=N+(w<<22&4294967295|w>>>10),w=y+(b^_&(N^b))+k[4]+4118548399&4294967295,y=_+(w<<7&4294967295|w>>>25),w=b+(N^y&(_^N))+k[5]+1200080426&4294967295,b=y+(w<<12&4294967295|w>>>20),w=N+(_^b&(y^_))+k[6]+2821735955&4294967295,N=b+(w<<17&4294967295|w>>>15),w=_+(y^N&(b^y))+k[7]+4249261313&4294967295,_=N+(w<<22&4294967295|w>>>10),w=y+(b^_&(N^b))+k[8]+1770035416&4294967295,y=_+(w<<7&4294967295|w>>>25),w=b+(N^y&(_^N))+k[9]+2336552879&4294967295,b=y+(w<<12&4294967295|w>>>20),w=N+(_^b&(y^_))+k[10]+4294925233&4294967295,N=b+(w<<17&4294967295|w>>>15),w=_+(y^N&(b^y))+k[11]+2304563134&4294967295,_=N+(w<<22&4294967295|w>>>10),w=y+(b^_&(N^b))+k[12]+1804603682&4294967295,y=_+(w<<7&4294967295|w>>>25),w=b+(N^y&(_^N))+k[13]+4254626195&4294967295,b=y+(w<<12&4294967295|w>>>20),w=N+(_^b&(y^_))+k[14]+2792965006&4294967295,N=b+(w<<17&4294967295|w>>>15),w=_+(y^N&(b^y))+k[15]+1236535329&4294967295,_=N+(w<<22&4294967295|w>>>10),w=y+(N^b&(_^N))+k[1]+4129170786&4294967295,y=_+(w<<5&4294967295|w>>>27),w=b+(_^N&(y^_))+k[6]+3225465664&4294967295,b=y+(w<<9&4294967295|w>>>23),w=N+(y^_&(b^y))+k[11]+643717713&4294967295,N=b+(w<<14&4294967295|w>>>18),w=_+(b^y&(N^b))+k[0]+3921069994&4294967295,_=N+(w<<20&4294967295|w>>>12),w=y+(N^b&(_^N))+k[5]+3593408605&4294967295,y=_+(w<<5&4294967295|w>>>27),w=b+(_^N&(y^_))+k[10]+38016083&4294967295,b=y+(w<<9&4294967295|w>>>23),w=N+(y^_&(b^y))+k[15]+3634488961&4294967295,N=b+(w<<14&4294967295|w>>>18),w=_+(b^y&(N^b))+k[4]+3889429448&4294967295,_=N+(w<<20&4294967295|w>>>12),w=y+(N^b&(_^N))+k[9]+568446438&4294967295,y=_+(w<<5&4294967295|w>>>27),w=b+(_^N&(y^_))+k[14]+3275163606&4294967295,b=y+(w<<9&4294967295|w>>>23),w=N+(y^_&(b^y))+k[3]+4107603335&4294967295,N=b+(w<<14&4294967295|w>>>18),w=_+(b^y&(N^b))+k[8]+1163531501&4294967295,_=N+(w<<20&4294967295|w>>>12),w=y+(N^b&(_^N))+k[13]+2850285829&4294967295,y=_+(w<<5&4294967295|w>>>27),w=b+(_^N&(y^_))+k[2]+4243563512&4294967295,b=y+(w<<9&4294967295|w>>>23),w=N+(y^_&(b^y))+k[7]+1735328473&4294967295,N=b+(w<<14&4294967295|w>>>18),w=_+(b^y&(N^b))+k[12]+2368359562&4294967295,_=N+(w<<20&4294967295|w>>>12),w=y+(_^N^b)+k[5]+4294588738&4294967295,y=_+(w<<4&4294967295|w>>>28),w=b+(y^_^N)+k[8]+2272392833&4294967295,b=y+(w<<11&4294967295|w>>>21),w=N+(b^y^_)+k[11]+1839030562&4294967295,N=b+(w<<16&4294967295|w>>>16),w=_+(N^b^y)+k[14]+4259657740&4294967295,_=N+(w<<23&4294967295|w>>>9),w=y+(_^N^b)+k[1]+2763975236&4294967295,y=_+(w<<4&4294967295|w>>>28),w=b+(y^_^N)+k[4]+1272893353&4294967295,b=y+(w<<11&4294967295|w>>>21),w=N+(b^y^_)+k[7]+4139469664&4294967295,N=b+(w<<16&4294967295|w>>>16),w=_+(N^b^y)+k[10]+3200236656&4294967295,_=N+(w<<23&4294967295|w>>>9),w=y+(_^N^b)+k[13]+681279174&4294967295,y=_+(w<<4&4294967295|w>>>28),w=b+(y^_^N)+k[0]+3936430074&4294967295,b=y+(w<<11&4294967295|w>>>21),w=N+(b^y^_)+k[3]+3572445317&4294967295,N=b+(w<<16&4294967295|w>>>16),w=_+(N^b^y)+k[6]+76029189&4294967295,_=N+(w<<23&4294967295|w>>>9),w=y+(_^N^b)+k[9]+3654602809&4294967295,y=_+(w<<4&4294967295|w>>>28),w=b+(y^_^N)+k[12]+3873151461&4294967295,b=y+(w<<11&4294967295|w>>>21),w=N+(b^y^_)+k[15]+530742520&4294967295,N=b+(w<<16&4294967295|w>>>16),w=_+(N^b^y)+k[2]+3299628645&4294967295,_=N+(w<<23&4294967295|w>>>9),w=y+(N^(_|~b))+k[0]+4096336452&4294967295,y=_+(w<<6&4294967295|w>>>26),w=b+(_^(y|~N))+k[7]+1126891415&4294967295,b=y+(w<<10&4294967295|w>>>22),w=N+(y^(b|~_))+k[14]+2878612391&4294967295,N=b+(w<<15&4294967295|w>>>17),w=_+(b^(N|~y))+k[5]+4237533241&4294967295,_=N+(w<<21&4294967295|w>>>11),w=y+(N^(_|~b))+k[12]+1700485571&4294967295,y=_+(w<<6&4294967295|w>>>26),w=b+(_^(y|~N))+k[3]+2399980690&4294967295,b=y+(w<<10&4294967295|w>>>22),w=N+(y^(b|~_))+k[10]+4293915773&4294967295,N=b+(w<<15&4294967295|w>>>17),w=_+(b^(N|~y))+k[1]+2240044497&4294967295,_=N+(w<<21&4294967295|w>>>11),w=y+(N^(_|~b))+k[8]+1873313359&4294967295,y=_+(w<<6&4294967295|w>>>26),w=b+(_^(y|~N))+k[15]+4264355552&4294967295,b=y+(w<<10&4294967295|w>>>22),w=N+(y^(b|~_))+k[6]+2734768916&4294967295,N=b+(w<<15&4294967295|w>>>17),w=_+(b^(N|~y))+k[13]+1309151649&4294967295,_=N+(w<<21&4294967295|w>>>11),w=y+(N^(_|~b))+k[4]+4149444226&4294967295,y=_+(w<<6&4294967295|w>>>26),w=b+(_^(y|~N))+k[11]+3174756917&4294967295,b=y+(w<<10&4294967295|w>>>22),w=N+(y^(b|~_))+k[2]+718787259&4294967295,N=b+(w<<15&4294967295|w>>>17),w=_+(b^(N|~y))+k[9]+3951481745&4294967295,x.g[0]=x.g[0]+y&4294967295,x.g[1]=x.g[1]+(N+(w<<21&4294967295|w>>>11))&4294967295,x.g[2]=x.g[2]+N&4294967295,x.g[3]=x.g[3]+b&4294967295}r.prototype.u=function(x,y){y===void 0&&(y=x.length);for(var _=y-this.blockSize,k=this.B,N=this.h,b=0;b<y;){if(N==0)for(;b<=_;)s(this,x,b),b+=this.blockSize;if(typeof x=="string"){for(;b<y;)if(k[N++]=x.charCodeAt(b++),N==this.blockSize){s(this,k),N=0;break}}else for(;b<y;)if(k[N++]=x[b++],N==this.blockSize){s(this,k),N=0;break}}this.h=N,this.o+=y},r.prototype.v=function(){var x=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);x[0]=128;for(var y=1;y<x.length-8;++y)x[y]=0;var _=8*this.o;for(y=x.length-8;y<x.length;++y)x[y]=_&255,_/=256;for(this.u(x),x=Array(16),y=_=0;4>y;++y)for(var k=0;32>k;k+=8)x[_++]=this.g[y]>>>k&255;return x};function i(x,y){var _=l;return Object.prototype.hasOwnProperty.call(_,x)?_[x]:_[x]=y(x)}function o(x,y){this.h=y;for(var _=[],k=!0,N=x.length-1;0<=N;N--){var b=x[N]|0;k&&b==y||(_[N]=b,k=!1)}this.g=_}var l={};function u(x){return-128<=x&&128>x?i(x,function(y){return new o([y|0],0>y?-1:0)}):new o([x|0],0>x?-1:0)}function h(x){if(isNaN(x)||!isFinite(x))return p;if(0>x)return O(h(-x));for(var y=[],_=1,k=0;x>=_;k++)y[k]=x/_|0,_*=4294967296;return new o(y,0)}function m(x,y){if(x.length==0)throw Error("number format error: empty string");if(y=y||10,2>y||36<y)throw Error("radix out of range: "+y);if(x.charAt(0)=="-")return O(m(x.substring(1),y));if(0<=x.indexOf("-"))throw Error('number format error: interior "-" character');for(var _=h(Math.pow(y,8)),k=p,N=0;N<x.length;N+=8){var b=Math.min(8,x.length-N),w=parseInt(x.substring(N,N+b),y);8>b?(b=h(Math.pow(y,b)),k=k.j(b).add(h(w))):(k=k.j(_),k=k.add(h(w)))}return k}var p=u(0),v=u(1),T=u(16777216);t=o.prototype,t.m=function(){if(A(this))return-O(this).m();for(var x=0,y=1,_=0;_<this.g.length;_++){var k=this.i(_);x+=(0<=k?k:4294967296+k)*y,y*=4294967296}return x},t.toString=function(x){if(x=x||10,2>x||36<x)throw Error("radix out of range: "+x);if(I(this))return"0";if(A(this))return"-"+O(this).toString(x);for(var y=h(Math.pow(x,6)),_=this,k="";;){var N=j(_,y).g;_=S(_,N.j(y));var b=((0<_.g.length?_.g[0]:_.h)>>>0).toString(x);if(_=N,I(_))return b+k;for(;6>b.length;)b="0"+b;k=b+k}},t.i=function(x){return 0>x?0:x<this.g.length?this.g[x]:this.h};function I(x){if(x.h!=0)return!1;for(var y=0;y<x.g.length;y++)if(x.g[y]!=0)return!1;return!0}function A(x){return x.h==-1}t.l=function(x){return x=S(this,x),A(x)?-1:I(x)?0:1};function O(x){for(var y=x.g.length,_=[],k=0;k<y;k++)_[k]=~x.g[k];return new o(_,~x.h).add(v)}t.abs=function(){return A(this)?O(this):this},t.add=function(x){for(var y=Math.max(this.g.length,x.g.length),_=[],k=0,N=0;N<=y;N++){var b=k+(this.i(N)&65535)+(x.i(N)&65535),w=(b>>>16)+(this.i(N)>>>16)+(x.i(N)>>>16);k=w>>>16,b&=65535,w&=65535,_[N]=w<<16|b}return new o(_,_[_.length-1]&-2147483648?-1:0)};function S(x,y){return x.add(O(y))}t.j=function(x){if(I(this)||I(x))return p;if(A(this))return A(x)?O(this).j(O(x)):O(O(this).j(x));if(A(x))return O(this.j(O(x)));if(0>this.l(T)&&0>x.l(T))return h(this.m()*x.m());for(var y=this.g.length+x.g.length,_=[],k=0;k<2*y;k++)_[k]=0;for(k=0;k<this.g.length;k++)for(var N=0;N<x.g.length;N++){var b=this.i(k)>>>16,w=this.i(k)&65535,J=x.i(N)>>>16,Be=x.i(N)&65535;_[2*k+2*N]+=w*Be,E(_,2*k+2*N),_[2*k+2*N+1]+=b*Be,E(_,2*k+2*N+1),_[2*k+2*N+1]+=w*J,E(_,2*k+2*N+1),_[2*k+2*N+2]+=b*J,E(_,2*k+2*N+2)}for(k=0;k<y;k++)_[k]=_[2*k+1]<<16|_[2*k];for(k=y;k<2*y;k++)_[k]=0;return new o(_,0)};function E(x,y){for(;(x[y]&65535)!=x[y];)x[y+1]+=x[y]>>>16,x[y]&=65535,y++}function C(x,y){this.g=x,this.h=y}function j(x,y){if(I(y))throw Error("division by zero");if(I(x))return new C(p,p);if(A(x))return y=j(O(x),y),new C(O(y.g),O(y.h));if(A(y))return y=j(x,O(y)),new C(O(y.g),y.h);if(30<x.g.length){if(A(x)||A(y))throw Error("slowDivide_ only works with positive integers.");for(var _=v,k=y;0>=k.l(x);)_=L(_),k=L(k);var N=M(_,1),b=M(k,1);for(k=M(k,2),_=M(_,2);!I(k);){var w=b.add(k);0>=w.l(x)&&(N=N.add(_),b=w),k=M(k,1),_=M(_,1)}return y=S(x,N.j(y)),new C(N,y)}for(N=p;0<=x.l(y);){for(_=Math.max(1,Math.floor(x.m()/y.m())),k=Math.ceil(Math.log(_)/Math.LN2),k=48>=k?1:Math.pow(2,k-48),b=h(_),w=b.j(y);A(w)||0<w.l(x);)_-=k,b=h(_),w=b.j(y);I(b)&&(b=v),N=N.add(b),x=S(x,w)}return new C(N,x)}t.A=function(x){return j(this,x).h},t.and=function(x){for(var y=Math.max(this.g.length,x.g.length),_=[],k=0;k<y;k++)_[k]=this.i(k)&x.i(k);return new o(_,this.h&x.h)},t.or=function(x){for(var y=Math.max(this.g.length,x.g.length),_=[],k=0;k<y;k++)_[k]=this.i(k)|x.i(k);return new o(_,this.h|x.h)},t.xor=function(x){for(var y=Math.max(this.g.length,x.g.length),_=[],k=0;k<y;k++)_[k]=this.i(k)^x.i(k);return new o(_,this.h^x.h)};function L(x){for(var y=x.g.length+1,_=[],k=0;k<y;k++)_[k]=x.i(k)<<1|x.i(k-1)>>>31;return new o(_,x.h)}function M(x,y){var _=y>>5;y%=32;for(var k=x.g.length-_,N=[],b=0;b<k;b++)N[b]=0<y?x.i(b+_)>>>y|x.i(b+_+1)<<32-y:x.i(b+_);return new o(N,x.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=m,Mw=o}).apply(typeof M0<"u"?M0:typeof self<"u"?self:typeof window<"u"?window:{});var Da=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};(function(){var t,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,d,f){return a==Array.prototype||a==Object.prototype||(a[d]=f.value),a};function n(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Da=="object"&&Da];for(var d=0;d<a.length;++d){var f=a[d];if(f&&f.Math==Math)return f}throw Error("Cannot find global object")}var r=n(this);function s(a,d){if(d)e:{var f=r;a=a.split(".");for(var g=0;g<a.length-1;g++){var R=a[g];if(!(R in f))break e;f=f[R]}a=a[a.length-1],g=f[a],d=d(g),d!=g&&d!=null&&e(f,a,{configurable:!0,writable:!0,value:d})}}function i(a,d){a instanceof String&&(a+="");var f=0,g=!1,R={next:function(){if(!g&&f<a.length){var P=f++;return{value:d(P,a[P]),done:!1}}return g=!0,{done:!0,value:void 0}}};return R[Symbol.iterator]=function(){return R},R}s("Array.prototype.values",function(a){return a||function(){return i(this,function(d,f){return f})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},l=this||self;function u(a){var d=typeof a;return d=d!="object"?d:a?Array.isArray(a)?"array":d:"null",d=="array"||d=="object"&&typeof a.length=="number"}function h(a){var d=typeof a;return d=="object"&&a!=null||d=="function"}function m(a,d,f){return a.call.apply(a.bind,arguments)}function p(a,d,f){if(!a)throw Error();if(2<arguments.length){var g=Array.prototype.slice.call(arguments,2);return function(){var R=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(R,g),a.apply(d,R)}}return function(){return a.apply(d,arguments)}}function v(a,d,f){return v=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?m:p,v.apply(null,arguments)}function T(a,d){var f=Array.prototype.slice.call(arguments,1);return function(){var g=f.slice();return g.push.apply(g,arguments),a.apply(this,g)}}function I(a,d){function f(){}f.prototype=d.prototype,a.aa=d.prototype,a.prototype=new f,a.prototype.constructor=a,a.Qb=function(g,R,P){for(var U=Array(arguments.length-2),ae=2;ae<arguments.length;ae++)U[ae-2]=arguments[ae];return d.prototype[R].apply(g,U)}}function A(a){const d=a.length;if(0<d){const f=Array(d);for(let g=0;g<d;g++)f[g]=a[g];return f}return[]}function O(a,d){for(let f=1;f<arguments.length;f++){const g=arguments[f];if(u(g)){const R=a.length||0,P=g.length||0;a.length=R+P;for(let U=0;U<P;U++)a[R+U]=g[U]}else a.push(g)}}class S{constructor(d,f){this.i=d,this.j=f,this.h=0,this.g=null}get(){let d;return 0<this.h?(this.h--,d=this.g,this.g=d.next,d.next=null):d=this.i(),d}}function E(a){return/^[\s\xa0]*$/.test(a)}function C(){var a=l.navigator;return a&&(a=a.userAgent)?a:""}function j(a){return j[" "](a),a}j[" "]=function(){};var L=C().indexOf("Gecko")!=-1&&!(C().toLowerCase().indexOf("webkit")!=-1&&C().indexOf("Edge")==-1)&&!(C().indexOf("Trident")!=-1||C().indexOf("MSIE")!=-1)&&C().indexOf("Edge")==-1;function M(a,d,f){for(const g in a)d.call(f,a[g],g,a)}function x(a,d){for(const f in a)d.call(void 0,a[f],f,a)}function y(a){const d={};for(const f in a)d[f]=a[f];return d}const _="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function k(a,d){let f,g;for(let R=1;R<arguments.length;R++){g=arguments[R];for(f in g)a[f]=g[f];for(let P=0;P<_.length;P++)f=_[P],Object.prototype.hasOwnProperty.call(g,f)&&(a[f]=g[f])}}function N(a){var d=1;a=a.split(":");const f=[];for(;0<d&&a.length;)f.push(a.shift()),d--;return a.length&&f.push(a.join(":")),f}function b(a){l.setTimeout(()=>{throw a},0)}function w(){var a=$;let d=null;return a.g&&(d=a.g,a.g=a.g.next,a.g||(a.h=null),d.next=null),d}class J{constructor(){this.h=this.g=null}add(d,f){const g=Be.get();g.set(d,f),this.h?this.h.next=g:this.g=g,this.h=g}}var Be=new S(()=>new Qt,a=>a.reset());class Qt{constructor(){this.next=this.g=this.h=null}set(d,f){this.h=d,this.g=f,this.next=null}reset(){this.next=this.g=this.h=null}}let vt,z=!1,$=new J,G=()=>{const a=l.Promise.resolve(void 0);vt=()=>{a.then(me)}};var me=()=>{for(var a;a=w();){try{a.h.call(a.g)}catch(f){b(f)}var d=Be;d.j(a),100>d.h&&(d.h++,a.next=d.g,d.g=a)}z=!1};function oe(){this.s=this.s,this.C=this.C}oe.prototype.s=!1,oe.prototype.ma=function(){this.s||(this.s=!0,this.N())},oe.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Ee(a,d){this.type=a,this.g=this.target=d,this.defaultPrevented=!1}Ee.prototype.h=function(){this.defaultPrevented=!0};var an=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var a=!1,d=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const f=()=>{};l.addEventListener("test",f,d),l.removeEventListener("test",f,d)}catch{}return a}();function ln(a,d){if(Ee.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var f=this.type=a.type,g=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=d,d=a.relatedTarget){if(L){e:{try{j(d.nodeName);var R=!0;break e}catch{}R=!1}R||(d=null)}}else f=="mouseover"?d=a.fromElement:f=="mouseout"&&(d=a.toElement);this.relatedTarget=d,g?(this.clientX=g.clientX!==void 0?g.clientX:g.pageX,this.clientY=g.clientY!==void 0?g.clientY:g.pageY,this.screenX=g.screenX||0,this.screenY=g.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:cn[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&ln.aa.h.call(this)}}I(ln,Ee);var cn={2:"touch",3:"pen",4:"mouse"};ln.prototype.h=function(){ln.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var un="closure_listenable_"+(1e6*Math.random()|0),c1=0;function u1(a,d,f,g,R){this.listener=a,this.proxy=null,this.src=d,this.type=f,this.capture=!!g,this.ha=R,this.key=++c1,this.da=this.fa=!1}function ea(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function ta(a){this.src=a,this.g={},this.h=0}ta.prototype.add=function(a,d,f,g,R){var P=a.toString();a=this.g[P],a||(a=this.g[P]=[],this.h++);var U=Vc(a,d,g,R);return-1<U?(d=a[U],f||(d.fa=!1)):(d=new u1(d,this.src,P,!!g,R),d.fa=f,a.push(d)),d};function zc(a,d){var f=d.type;if(f in a.g){var g=a.g[f],R=Array.prototype.indexOf.call(g,d,void 0),P;(P=0<=R)&&Array.prototype.splice.call(g,R,1),P&&(ea(d),a.g[f].length==0&&(delete a.g[f],a.h--))}}function Vc(a,d,f,g){for(var R=0;R<a.length;++R){var P=a[R];if(!P.da&&P.listener==d&&P.capture==!!f&&P.ha==g)return R}return-1}var $c="closure_lm_"+(1e6*Math.random()|0),Bc={};function _p(a,d,f,g,R){if(Array.isArray(d)){for(var P=0;P<d.length;P++)_p(a,d[P],f,g,R);return null}return f=Ep(f),a&&a[un]?a.K(d,f,h(g)?!!g.capture:!1,R):d1(a,d,f,!1,g,R)}function d1(a,d,f,g,R,P){if(!d)throw Error("Invalid event type");var U=h(R)?!!R.capture:!!R,ae=Wc(a);if(ae||(a[$c]=ae=new ta(a)),f=ae.add(d,f,g,U,P),f.proxy)return f;if(g=h1(),f.proxy=g,g.src=a,g.listener=f,a.addEventListener)an||(R=U),R===void 0&&(R=!1),a.addEventListener(d.toString(),g,R);else if(a.attachEvent)a.attachEvent(wp(d.toString()),g);else if(a.addListener&&a.removeListener)a.addListener(g);else throw Error("addEventListener and attachEvent are unavailable.");return f}function h1(){function a(f){return d.call(a.src,a.listener,f)}const d=f1;return a}function xp(a,d,f,g,R){if(Array.isArray(d))for(var P=0;P<d.length;P++)xp(a,d[P],f,g,R);else g=h(g)?!!g.capture:!!g,f=Ep(f),a&&a[un]?(a=a.i,d=String(d).toString(),d in a.g&&(P=a.g[d],f=Vc(P,f,g,R),-1<f&&(ea(P[f]),Array.prototype.splice.call(P,f,1),P.length==0&&(delete a.g[d],a.h--)))):a&&(a=Wc(a))&&(d=a.g[d.toString()],a=-1,d&&(a=Vc(d,f,g,R)),(f=-1<a?d[a]:null)&&Hc(f))}function Hc(a){if(typeof a!="number"&&a&&!a.da){var d=a.src;if(d&&d[un])zc(d.i,a);else{var f=a.type,g=a.proxy;d.removeEventListener?d.removeEventListener(f,g,a.capture):d.detachEvent?d.detachEvent(wp(f),g):d.addListener&&d.removeListener&&d.removeListener(g),(f=Wc(d))?(zc(f,a),f.h==0&&(f.src=null,d[$c]=null)):ea(a)}}}function wp(a){return a in Bc?Bc[a]:Bc[a]="on"+a}function f1(a,d){if(a.da)a=!0;else{d=new ln(d,this);var f=a.listener,g=a.ha||a.src;a.fa&&Hc(a),a=f.call(g,d)}return a}function Wc(a){return a=a[$c],a instanceof ta?a:null}var Gc="__closure_events_fn_"+(1e9*Math.random()>>>0);function Ep(a){return typeof a=="function"?a:(a[Gc]||(a[Gc]=function(d){return a.handleEvent(d)}),a[Gc])}function He(){oe.call(this),this.i=new ta(this),this.M=this,this.F=null}I(He,oe),He.prototype[un]=!0,He.prototype.removeEventListener=function(a,d,f,g){xp(this,a,d,f,g)};function Xe(a,d){var f,g=a.F;if(g)for(f=[];g;g=g.F)f.push(g);if(a=a.M,g=d.type||d,typeof d=="string")d=new Ee(d,a);else if(d instanceof Ee)d.target=d.target||a;else{var R=d;d=new Ee(g,a),k(d,R)}if(R=!0,f)for(var P=f.length-1;0<=P;P--){var U=d.g=f[P];R=na(U,g,!0,d)&&R}if(U=d.g=a,R=na(U,g,!0,d)&&R,R=na(U,g,!1,d)&&R,f)for(P=0;P<f.length;P++)U=d.g=f[P],R=na(U,g,!1,d)&&R}He.prototype.N=function(){if(He.aa.N.call(this),this.i){var a=this.i,d;for(d in a.g){for(var f=a.g[d],g=0;g<f.length;g++)ea(f[g]);delete a.g[d],a.h--}}this.F=null},He.prototype.K=function(a,d,f,g){return this.i.add(String(a),d,!1,f,g)},He.prototype.L=function(a,d,f,g){return this.i.add(String(a),d,!0,f,g)};function na(a,d,f,g){if(d=a.i.g[String(d)],!d)return!0;d=d.concat();for(var R=!0,P=0;P<d.length;++P){var U=d[P];if(U&&!U.da&&U.capture==f){var ae=U.listener,De=U.ha||U.src;U.fa&&zc(a.i,U),R=ae.call(De,g)!==!1&&R}}return R&&!g.defaultPrevented}function kp(a,d,f){if(typeof a=="function")f&&(a=v(a,f));else if(a&&typeof a.handleEvent=="function")a=v(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(d)?-1:l.setTimeout(a,d||0)}function Sp(a){a.g=kp(()=>{a.g=null,a.i&&(a.i=!1,Sp(a))},a.l);const d=a.h;a.h=null,a.m.apply(null,d)}class p1 extends oe{constructor(d,f){super(),this.m=d,this.l=f,this.h=null,this.i=!1,this.g=null}j(d){this.h=arguments,this.g?this.i=!0:Sp(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ai(a){oe.call(this),this.h=a,this.g={}}I(ai,oe);var Np=[];function Cp(a){M(a.g,function(d,f){this.g.hasOwnProperty(f)&&Hc(d)},a),a.g={}}ai.prototype.N=function(){ai.aa.N.call(this),Cp(this)},ai.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var qc=l.JSON.stringify,m1=l.JSON.parse,g1=class{stringify(a){return l.JSON.stringify(a,void 0)}parse(a){return l.JSON.parse(a,void 0)}};function Kc(){}Kc.prototype.h=null;function Ip(a){return a.h||(a.h=a.i())}function v1(){}var li={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Yc(){Ee.call(this,"d")}I(Yc,Ee);function Qc(){Ee.call(this,"c")}I(Qc,Ee);var es={},Tp=null;function Xc(){return Tp=Tp||new He}es.La="serverreachability";function bp(a){Ee.call(this,es.La,a)}I(bp,Ee);function ci(a){const d=Xc();Xe(d,new bp(d))}es.STAT_EVENT="statevent";function Rp(a,d){Ee.call(this,es.STAT_EVENT,a),this.stat=d}I(Rp,Ee);function Je(a){const d=Xc();Xe(d,new Rp(d,a))}es.Ma="timingevent";function Pp(a,d){Ee.call(this,es.Ma,a),this.size=d}I(Pp,Ee);function ui(a,d){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){a()},d)}function di(){this.g=!0}di.prototype.xa=function(){this.g=!1};function y1(a,d,f,g,R,P){a.info(function(){if(a.g)if(P)for(var U="",ae=P.split("&"),De=0;De<ae.length;De++){var te=ae[De].split("=");if(1<te.length){var We=te[0];te=te[1];var Ge=We.split("_");U=2<=Ge.length&&Ge[1]=="type"?U+(We+"="+te+"&"):U+(We+"=redacted&")}}else U=null;else U=P;return"XMLHTTP REQ ("+g+") [attempt "+R+"]: "+d+`
`+f+`
`+U})}function _1(a,d,f,g,R,P,U){a.info(function(){return"XMLHTTP RESP ("+g+") [ attempt "+R+"]: "+d+`
`+f+`
`+P+" "+U})}function ts(a,d,f,g){a.info(function(){return"XMLHTTP TEXT ("+d+"): "+w1(a,f)+(g?" "+g:"")})}function x1(a,d){a.info(function(){return"TIMEOUT: "+d})}di.prototype.info=function(){};function w1(a,d){if(!a.g)return d;if(!d)return null;try{var f=JSON.parse(d);if(f){for(a=0;a<f.length;a++)if(Array.isArray(f[a])){var g=f[a];if(!(2>g.length)){var R=g[1];if(Array.isArray(R)&&!(1>R.length)){var P=R[0];if(P!="noop"&&P!="stop"&&P!="close")for(var U=1;U<R.length;U++)R[U]=""}}}}return qc(f)}catch{return d}}var Jc={NO_ERROR:0,TIMEOUT:8},E1={},Zc;function ra(){}I(ra,Kc),ra.prototype.g=function(){return new XMLHttpRequest},ra.prototype.i=function(){return{}},Zc=new ra;function On(a,d,f,g){this.j=a,this.i=d,this.l=f,this.R=g||1,this.U=new ai(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Ap}function Ap(){this.i=null,this.g="",this.h=!1}var jp={},eu={};function tu(a,d,f){a.L=1,a.v=aa(dn(d)),a.m=f,a.P=!0,Op(a,null)}function Op(a,d){a.F=Date.now(),sa(a),a.A=dn(a.v);var f=a.A,g=a.R;Array.isArray(g)||(g=[String(g)]),Kp(f.i,"t",g),a.C=0,f=a.j.J,a.h=new Ap,a.g=hm(a.j,f?d:null,!a.m),0<a.O&&(a.M=new p1(v(a.Y,a,a.g),a.O)),d=a.U,f=a.g,g=a.ca;var R="readystatechange";Array.isArray(R)||(R&&(Np[0]=R.toString()),R=Np);for(var P=0;P<R.length;P++){var U=_p(f,R[P],g||d.handleEvent,!1,d.h||d);if(!U)break;d.g[U.key]=U}d=a.H?y(a.H):{},a.m?(a.u||(a.u="POST"),d["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,d)):(a.u="GET",a.g.ea(a.A,a.u,null,d)),ci(),y1(a.i,a.u,a.A,a.l,a.R,a.m)}On.prototype.ca=function(a){a=a.target;const d=this.M;d&&hn(a)==3?d.j():this.Y(a)},On.prototype.Y=function(a){try{if(a==this.g)e:{const Ge=hn(this.g);var d=this.g.Ba();const ss=this.g.Z();if(!(3>Ge)&&(Ge!=3||this.g&&(this.h.h||this.g.oa()||tm(this.g)))){this.J||Ge!=4||d==7||(d==8||0>=ss?ci(3):ci(2)),nu(this);var f=this.g.Z();this.X=f;t:if(Dp(this)){var g=tm(this.g);a="";var R=g.length,P=hn(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){xr(this),hi(this);var U="";break t}this.h.i=new l.TextDecoder}for(d=0;d<R;d++)this.h.h=!0,a+=this.h.i.decode(g[d],{stream:!(P&&d==R-1)});g.length=0,this.h.g+=a,this.C=0,U=this.h.g}else U=this.g.oa();if(this.o=f==200,_1(this.i,this.u,this.A,this.l,this.R,Ge,f),this.o){if(this.T&&!this.K){t:{if(this.g){var ae,De=this.g;if((ae=De.g?De.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!E(ae)){var te=ae;break t}}te=null}if(f=te)ts(this.i,this.l,f,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,ru(this,f);else{this.o=!1,this.s=3,Je(12),xr(this),hi(this);break e}}if(this.P){f=!0;let Dt;for(;!this.J&&this.C<U.length;)if(Dt=k1(this,U),Dt==eu){Ge==4&&(this.s=4,Je(14),f=!1),ts(this.i,this.l,null,"[Incomplete Response]");break}else if(Dt==jp){this.s=4,Je(15),ts(this.i,this.l,U,"[Invalid Chunk]"),f=!1;break}else ts(this.i,this.l,Dt,null),ru(this,Dt);if(Dp(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Ge!=4||U.length!=0||this.h.h||(this.s=1,Je(16),f=!1),this.o=this.o&&f,!f)ts(this.i,this.l,U,"[Invalid Chunked Response]"),xr(this),hi(this);else if(0<U.length&&!this.W){this.W=!0;var We=this.j;We.g==this&&We.ba&&!We.M&&(We.j.info("Great, no buffering proxy detected. Bytes received: "+U.length),cu(We),We.M=!0,Je(11))}}else ts(this.i,this.l,U,null),ru(this,U);Ge==4&&xr(this),this.o&&!this.J&&(Ge==4?lm(this.j,this):(this.o=!1,sa(this)))}else z1(this.g),f==400&&0<U.indexOf("Unknown SID")?(this.s=3,Je(12)):(this.s=0,Je(13)),xr(this),hi(this)}}}catch{}finally{}};function Dp(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function k1(a,d){var f=a.C,g=d.indexOf(`
`,f);return g==-1?eu:(f=Number(d.substring(f,g)),isNaN(f)?jp:(g+=1,g+f>d.length?eu:(d=d.slice(g,g+f),a.C=g+f,d)))}On.prototype.cancel=function(){this.J=!0,xr(this)};function sa(a){a.S=Date.now()+a.I,Lp(a,a.I)}function Lp(a,d){if(a.B!=null)throw Error("WatchDog timer not null");a.B=ui(v(a.ba,a),d)}function nu(a){a.B&&(l.clearTimeout(a.B),a.B=null)}On.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(x1(this.i,this.A),this.L!=2&&(ci(),Je(17)),xr(this),this.s=2,hi(this)):Lp(this,this.S-a)};function hi(a){a.j.G==0||a.J||lm(a.j,a)}function xr(a){nu(a);var d=a.M;d&&typeof d.ma=="function"&&d.ma(),a.M=null,Cp(a.U),a.g&&(d=a.g,a.g=null,d.abort(),d.ma())}function ru(a,d){try{var f=a.j;if(f.G!=0&&(f.g==a||su(f.h,a))){if(!a.K&&su(f.h,a)&&f.G==3){try{var g=f.Da.g.parse(d)}catch{g=null}if(Array.isArray(g)&&g.length==3){var R=g;if(R[0]==0){e:if(!f.u){if(f.g)if(f.g.F+3e3<a.F)fa(f),da(f);else break e;lu(f),Je(18)}}else f.za=R[1],0<f.za-f.T&&37500>R[2]&&f.F&&f.v==0&&!f.C&&(f.C=ui(v(f.Za,f),6e3));if(1>=Up(f.h)&&f.ca){try{f.ca()}catch{}f.ca=void 0}}else Er(f,11)}else if((a.K||f.g==a)&&fa(f),!E(d))for(R=f.Da.g.parse(d),d=0;d<R.length;d++){let te=R[d];if(f.T=te[0],te=te[1],f.G==2)if(te[0]=="c"){f.K=te[1],f.ia=te[2];const We=te[3];We!=null&&(f.la=We,f.j.info("VER="+f.la));const Ge=te[4];Ge!=null&&(f.Aa=Ge,f.j.info("SVER="+f.Aa));const ss=te[5];ss!=null&&typeof ss=="number"&&0<ss&&(g=1.5*ss,f.L=g,f.j.info("backChannelRequestTimeoutMs_="+g)),g=f;const Dt=a.g;if(Dt){const pa=Dt.g?Dt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(pa){var P=g.h;P.g||pa.indexOf("spdy")==-1&&pa.indexOf("quic")==-1&&pa.indexOf("h2")==-1||(P.j=P.l,P.g=new Set,P.h&&(iu(P,P.h),P.h=null))}if(g.D){const uu=Dt.g?Dt.g.getResponseHeader("X-HTTP-Session-Id"):null;uu&&(g.ya=uu,de(g.I,g.D,uu))}}f.G=3,f.l&&f.l.ua(),f.ba&&(f.R=Date.now()-a.F,f.j.info("Handshake RTT: "+f.R+"ms")),g=f;var U=a;if(g.qa=dm(g,g.J?g.ia:null,g.W),U.K){zp(g.h,U);var ae=U,De=g.L;De&&(ae.I=De),ae.B&&(nu(ae),sa(ae)),g.g=U}else om(g);0<f.i.length&&ha(f)}else te[0]!="stop"&&te[0]!="close"||Er(f,7);else f.G==3&&(te[0]=="stop"||te[0]=="close"?te[0]=="stop"?Er(f,7):au(f):te[0]!="noop"&&f.l&&f.l.ta(te),f.v=0)}}ci(4)}catch{}}var S1=class{constructor(a,d){this.g=a,this.map=d}};function Mp(a){this.l=a||10,l.PerformanceNavigationTiming?(a=l.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Fp(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function Up(a){return a.h?1:a.g?a.g.size:0}function su(a,d){return a.h?a.h==d:a.g?a.g.has(d):!1}function iu(a,d){a.g?a.g.add(d):a.h=d}function zp(a,d){a.h&&a.h==d?a.h=null:a.g&&a.g.has(d)&&a.g.delete(d)}Mp.prototype.cancel=function(){if(this.i=Vp(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Vp(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let d=a.i;for(const f of a.g.values())d=d.concat(f.D);return d}return A(a.i)}function N1(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(u(a)){for(var d=[],f=a.length,g=0;g<f;g++)d.push(a[g]);return d}d=[],f=0;for(g in a)d[f++]=a[g];return d}function C1(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(u(a)||typeof a=="string"){var d=[];a=a.length;for(var f=0;f<a;f++)d.push(f);return d}d=[],f=0;for(const g in a)d[f++]=g;return d}}}function $p(a,d){if(a.forEach&&typeof a.forEach=="function")a.forEach(d,void 0);else if(u(a)||typeof a=="string")Array.prototype.forEach.call(a,d,void 0);else for(var f=C1(a),g=N1(a),R=g.length,P=0;P<R;P++)d.call(void 0,g[P],f&&f[P],a)}var Bp=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function I1(a,d){if(a){a=a.split("&");for(var f=0;f<a.length;f++){var g=a[f].indexOf("="),R=null;if(0<=g){var P=a[f].substring(0,g);R=a[f].substring(g+1)}else P=a[f];d(P,R?decodeURIComponent(R.replace(/\+/g," ")):"")}}}function wr(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof wr){this.h=a.h,ia(this,a.j),this.o=a.o,this.g=a.g,oa(this,a.s),this.l=a.l;var d=a.i,f=new mi;f.i=d.i,d.g&&(f.g=new Map(d.g),f.h=d.h),Hp(this,f),this.m=a.m}else a&&(d=String(a).match(Bp))?(this.h=!1,ia(this,d[1]||"",!0),this.o=fi(d[2]||""),this.g=fi(d[3]||"",!0),oa(this,d[4]),this.l=fi(d[5]||"",!0),Hp(this,d[6]||"",!0),this.m=fi(d[7]||"")):(this.h=!1,this.i=new mi(null,this.h))}wr.prototype.toString=function(){var a=[],d=this.j;d&&a.push(pi(d,Wp,!0),":");var f=this.g;return(f||d=="file")&&(a.push("//"),(d=this.o)&&a.push(pi(d,Wp,!0),"@"),a.push(encodeURIComponent(String(f)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),f=this.s,f!=null&&a.push(":",String(f))),(f=this.l)&&(this.g&&f.charAt(0)!="/"&&a.push("/"),a.push(pi(f,f.charAt(0)=="/"?R1:b1,!0))),(f=this.i.toString())&&a.push("?",f),(f=this.m)&&a.push("#",pi(f,A1)),a.join("")};function dn(a){return new wr(a)}function ia(a,d,f){a.j=f?fi(d,!0):d,a.j&&(a.j=a.j.replace(/:$/,""))}function oa(a,d){if(d){if(d=Number(d),isNaN(d)||0>d)throw Error("Bad port number "+d);a.s=d}else a.s=null}function Hp(a,d,f){d instanceof mi?(a.i=d,j1(a.i,a.h)):(f||(d=pi(d,P1)),a.i=new mi(d,a.h))}function de(a,d,f){a.i.set(d,f)}function aa(a){return de(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function fi(a,d){return a?d?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function pi(a,d,f){return typeof a=="string"?(a=encodeURI(a).replace(d,T1),f&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function T1(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Wp=/[#\/\?@]/g,b1=/[#\?:]/g,R1=/[#\?]/g,P1=/[#\?@]/g,A1=/#/g;function mi(a,d){this.h=this.g=null,this.i=a||null,this.j=!!d}function Dn(a){a.g||(a.g=new Map,a.h=0,a.i&&I1(a.i,function(d,f){a.add(decodeURIComponent(d.replace(/\+/g," ")),f)}))}t=mi.prototype,t.add=function(a,d){Dn(this),this.i=null,a=ns(this,a);var f=this.g.get(a);return f||this.g.set(a,f=[]),f.push(d),this.h+=1,this};function Gp(a,d){Dn(a),d=ns(a,d),a.g.has(d)&&(a.i=null,a.h-=a.g.get(d).length,a.g.delete(d))}function qp(a,d){return Dn(a),d=ns(a,d),a.g.has(d)}t.forEach=function(a,d){Dn(this),this.g.forEach(function(f,g){f.forEach(function(R){a.call(d,R,g,this)},this)},this)},t.na=function(){Dn(this);const a=Array.from(this.g.values()),d=Array.from(this.g.keys()),f=[];for(let g=0;g<d.length;g++){const R=a[g];for(let P=0;P<R.length;P++)f.push(d[g])}return f},t.V=function(a){Dn(this);let d=[];if(typeof a=="string")qp(this,a)&&(d=d.concat(this.g.get(ns(this,a))));else{a=Array.from(this.g.values());for(let f=0;f<a.length;f++)d=d.concat(a[f])}return d},t.set=function(a,d){return Dn(this),this.i=null,a=ns(this,a),qp(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[d]),this.h+=1,this},t.get=function(a,d){return a?(a=this.V(a),0<a.length?String(a[0]):d):d};function Kp(a,d,f){Gp(a,d),0<f.length&&(a.i=null,a.g.set(ns(a,d),A(f)),a.h+=f.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],d=Array.from(this.g.keys());for(var f=0;f<d.length;f++){var g=d[f];const P=encodeURIComponent(String(g)),U=this.V(g);for(g=0;g<U.length;g++){var R=P;U[g]!==""&&(R+="="+encodeURIComponent(String(U[g]))),a.push(R)}}return this.i=a.join("&")};function ns(a,d){return d=String(d),a.j&&(d=d.toLowerCase()),d}function j1(a,d){d&&!a.j&&(Dn(a),a.i=null,a.g.forEach(function(f,g){var R=g.toLowerCase();g!=R&&(Gp(this,g),Kp(this,R,f))},a)),a.j=d}function O1(a,d){const f=new di;if(l.Image){const g=new Image;g.onload=T(Ln,f,"TestLoadImage: loaded",!0,d,g),g.onerror=T(Ln,f,"TestLoadImage: error",!1,d,g),g.onabort=T(Ln,f,"TestLoadImage: abort",!1,d,g),g.ontimeout=T(Ln,f,"TestLoadImage: timeout",!1,d,g),l.setTimeout(function(){g.ontimeout&&g.ontimeout()},1e4),g.src=a}else d(!1)}function D1(a,d){const f=new di,g=new AbortController,R=setTimeout(()=>{g.abort(),Ln(f,"TestPingServer: timeout",!1,d)},1e4);fetch(a,{signal:g.signal}).then(P=>{clearTimeout(R),P.ok?Ln(f,"TestPingServer: ok",!0,d):Ln(f,"TestPingServer: server error",!1,d)}).catch(()=>{clearTimeout(R),Ln(f,"TestPingServer: error",!1,d)})}function Ln(a,d,f,g,R){try{R&&(R.onload=null,R.onerror=null,R.onabort=null,R.ontimeout=null),g(f)}catch{}}function L1(){this.g=new g1}function M1(a,d,f){const g=f||"";try{$p(a,function(R,P){let U=R;h(R)&&(U=qc(R)),d.push(g+P+"="+encodeURIComponent(U))})}catch(R){throw d.push(g+"type="+encodeURIComponent("_badmap")),R}}function la(a){this.l=a.Ub||null,this.j=a.eb||!1}I(la,Kc),la.prototype.g=function(){return new ca(this.l,this.j)},la.prototype.i=function(a){return function(){return a}}({});function ca(a,d){He.call(this),this.D=a,this.o=d,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}I(ca,He),t=ca.prototype,t.open=function(a,d){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=d,this.readyState=1,vi(this)},t.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const d={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(d.body=a),(this.D||l).fetch(new Request(this.A,d)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,gi(this)),this.readyState=0},t.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,vi(this)),this.g&&(this.readyState=3,vi(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Yp(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function Yp(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}t.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var d=a.value?a.value:new Uint8Array(0);(d=this.v.decode(d,{stream:!a.done}))&&(this.response=this.responseText+=d)}a.done?gi(this):vi(this),this.readyState==3&&Yp(this)}},t.Ra=function(a){this.g&&(this.response=this.responseText=a,gi(this))},t.Qa=function(a){this.g&&(this.response=a,gi(this))},t.ga=function(){this.g&&gi(this)};function gi(a){a.readyState=4,a.l=null,a.j=null,a.v=null,vi(a)}t.setRequestHeader=function(a,d){this.u.append(a,d)},t.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],d=this.h.entries();for(var f=d.next();!f.done;)f=f.value,a.push(f[0]+": "+f[1]),f=d.next();return a.join(`\r
`)};function vi(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(ca.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Qp(a){let d="";return M(a,function(f,g){d+=g,d+=":",d+=f,d+=`\r
`}),d}function ou(a,d,f){e:{for(g in f){var g=!1;break e}g=!0}g||(f=Qp(f),typeof a=="string"?f!=null&&encodeURIComponent(String(f)):de(a,d,f))}function ke(a){He.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}I(ke,He);var F1=/^https?$/i,U1=["POST","PUT"];t=ke.prototype,t.Ha=function(a){this.J=a},t.ea=function(a,d,f,g){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);d=d?d.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Zc.g(),this.v=this.o?Ip(this.o):Ip(Zc),this.g.onreadystatechange=v(this.Ea,this);try{this.B=!0,this.g.open(d,String(a),!0),this.B=!1}catch(P){Xp(this,P);return}if(a=f||"",f=new Map(this.headers),g)if(Object.getPrototypeOf(g)===Object.prototype)for(var R in g)f.set(R,g[R]);else if(typeof g.keys=="function"&&typeof g.get=="function")for(const P of g.keys())f.set(P,g.get(P));else throw Error("Unknown input type for opt_headers: "+String(g));g=Array.from(f.keys()).find(P=>P.toLowerCase()=="content-type"),R=l.FormData&&a instanceof l.FormData,!(0<=Array.prototype.indexOf.call(U1,d,void 0))||g||R||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[P,U]of f)this.g.setRequestHeader(P,U);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{em(this),this.u=!0,this.g.send(a),this.u=!1}catch(P){Xp(this,P)}};function Xp(a,d){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=d,a.m=5,Jp(a),ua(a)}function Jp(a){a.A||(a.A=!0,Xe(a,"complete"),Xe(a,"error"))}t.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,Xe(this,"complete"),Xe(this,"abort"),ua(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),ua(this,!0)),ke.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?Zp(this):this.bb())},t.bb=function(){Zp(this)};function Zp(a){if(a.h&&typeof o<"u"&&(!a.v[1]||hn(a)!=4||a.Z()!=2)){if(a.u&&hn(a)==4)kp(a.Ea,0,a);else if(Xe(a,"readystatechange"),hn(a)==4){a.h=!1;try{const U=a.Z();e:switch(U){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var d=!0;break e;default:d=!1}var f;if(!(f=d)){var g;if(g=U===0){var R=String(a.D).match(Bp)[1]||null;!R&&l.self&&l.self.location&&(R=l.self.location.protocol.slice(0,-1)),g=!F1.test(R?R.toLowerCase():"")}f=g}if(f)Xe(a,"complete"),Xe(a,"success");else{a.m=6;try{var P=2<hn(a)?a.g.statusText:""}catch{P=""}a.l=P+" ["+a.Z()+"]",Jp(a)}}finally{ua(a)}}}}function ua(a,d){if(a.g){em(a);const f=a.g,g=a.v[0]?()=>{}:null;a.g=null,a.v=null,d||Xe(a,"ready");try{f.onreadystatechange=g}catch{}}}function em(a){a.I&&(l.clearTimeout(a.I),a.I=null)}t.isActive=function(){return!!this.g};function hn(a){return a.g?a.g.readyState:0}t.Z=function(){try{return 2<hn(this)?this.g.status:-1}catch{return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.Oa=function(a){if(this.g){var d=this.g.responseText;return a&&d.indexOf(a)==0&&(d=d.substring(a.length)),m1(d)}};function tm(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function z1(a){const d={};a=(a.g&&2<=hn(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let g=0;g<a.length;g++){if(E(a[g]))continue;var f=N(a[g]);const R=f[0];if(f=f[1],typeof f!="string")continue;f=f.trim();const P=d[R]||[];d[R]=P,P.push(f)}x(d,function(g){return g.join(", ")})}t.Ba=function(){return this.m},t.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function yi(a,d,f){return f&&f.internalChannelParams&&f.internalChannelParams[a]||d}function nm(a){this.Aa=0,this.i=[],this.j=new di,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=yi("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=yi("baseRetryDelayMs",5e3,a),this.cb=yi("retryDelaySeedMs",1e4,a),this.Wa=yi("forwardChannelMaxRetries",2,a),this.wa=yi("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new Mp(a&&a.concurrentRequestLimit),this.Da=new L1,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}t=nm.prototype,t.la=8,t.G=1,t.connect=function(a,d,f,g){Je(0),this.W=a,this.H=d||{},f&&g!==void 0&&(this.H.OSID=f,this.H.OAID=g),this.F=this.X,this.I=dm(this,null,this.W),ha(this)};function au(a){if(rm(a),a.G==3){var d=a.U++,f=dn(a.I);if(de(f,"SID",a.K),de(f,"RID",d),de(f,"TYPE","terminate"),_i(a,f),d=new On(a,a.j,d),d.L=2,d.v=aa(dn(f)),f=!1,l.navigator&&l.navigator.sendBeacon)try{f=l.navigator.sendBeacon(d.v.toString(),"")}catch{}!f&&l.Image&&(new Image().src=d.v,f=!0),f||(d.g=hm(d.j,null),d.g.ea(d.v)),d.F=Date.now(),sa(d)}um(a)}function da(a){a.g&&(cu(a),a.g.cancel(),a.g=null)}function rm(a){da(a),a.u&&(l.clearTimeout(a.u),a.u=null),fa(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&l.clearTimeout(a.s),a.s=null)}function ha(a){if(!Fp(a.h)&&!a.s){a.s=!0;var d=a.Ga;vt||G(),z||(vt(),z=!0),$.add(d,a),a.B=0}}function V1(a,d){return Up(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=d.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=ui(v(a.Ga,a,d),cm(a,a.B)),a.B++,!0)}t.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const R=new On(this,this.j,a);let P=this.o;if(this.S&&(P?(P=y(P),k(P,this.S)):P=this.S),this.m!==null||this.O||(R.H=P,P=null),this.P)e:{for(var d=0,f=0;f<this.i.length;f++){t:{var g=this.i[f];if("__data__"in g.map&&(g=g.map.__data__,typeof g=="string")){g=g.length;break t}g=void 0}if(g===void 0)break;if(d+=g,4096<d){d=f;break e}if(d===4096||f===this.i.length-1){d=f+1;break e}}d=1e3}else d=1e3;d=im(this,R,d),f=dn(this.I),de(f,"RID",a),de(f,"CVER",22),this.D&&de(f,"X-HTTP-Session-Id",this.D),_i(this,f),P&&(this.O?d="headers="+encodeURIComponent(String(Qp(P)))+"&"+d:this.m&&ou(f,this.m,P)),iu(this.h,R),this.Ua&&de(f,"TYPE","init"),this.P?(de(f,"$req",d),de(f,"SID","null"),R.T=!0,tu(R,f,null)):tu(R,f,d),this.G=2}}else this.G==3&&(a?sm(this,a):this.i.length==0||Fp(this.h)||sm(this))};function sm(a,d){var f;d?f=d.l:f=a.U++;const g=dn(a.I);de(g,"SID",a.K),de(g,"RID",f),de(g,"AID",a.T),_i(a,g),a.m&&a.o&&ou(g,a.m,a.o),f=new On(a,a.j,f,a.B+1),a.m===null&&(f.H=a.o),d&&(a.i=d.D.concat(a.i)),d=im(a,f,1e3),f.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),iu(a.h,f),tu(f,g,d)}function _i(a,d){a.H&&M(a.H,function(f,g){de(d,g,f)}),a.l&&$p({},function(f,g){de(d,g,f)})}function im(a,d,f){f=Math.min(a.i.length,f);var g=a.l?v(a.l.Na,a.l,a):null;e:{var R=a.i;let P=-1;for(;;){const U=["count="+f];P==-1?0<f?(P=R[0].g,U.push("ofs="+P)):P=0:U.push("ofs="+P);let ae=!0;for(let De=0;De<f;De++){let te=R[De].g;const We=R[De].map;if(te-=P,0>te)P=Math.max(0,R[De].g-100),ae=!1;else try{M1(We,U,"req"+te+"_")}catch{g&&g(We)}}if(ae){g=U.join("&");break e}}}return a=a.i.splice(0,f),d.D=a,g}function om(a){if(!a.g&&!a.u){a.Y=1;var d=a.Fa;vt||G(),z||(vt(),z=!0),$.add(d,a),a.v=0}}function lu(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=ui(v(a.Fa,a),cm(a,a.v)),a.v++,!0)}t.Fa=function(){if(this.u=null,am(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=ui(v(this.ab,this),a)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Je(10),da(this),am(this))};function cu(a){a.A!=null&&(l.clearTimeout(a.A),a.A=null)}function am(a){a.g=new On(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var d=dn(a.qa);de(d,"RID","rpc"),de(d,"SID",a.K),de(d,"AID",a.T),de(d,"CI",a.F?"0":"1"),!a.F&&a.ja&&de(d,"TO",a.ja),de(d,"TYPE","xmlhttp"),_i(a,d),a.m&&a.o&&ou(d,a.m,a.o),a.L&&(a.g.I=a.L);var f=a.g;a=a.ia,f.L=1,f.v=aa(dn(d)),f.m=null,f.P=!0,Op(f,a)}t.Za=function(){this.C!=null&&(this.C=null,da(this),lu(this),Je(19))};function fa(a){a.C!=null&&(l.clearTimeout(a.C),a.C=null)}function lm(a,d){var f=null;if(a.g==d){fa(a),cu(a),a.g=null;var g=2}else if(su(a.h,d))f=d.D,zp(a.h,d),g=1;else return;if(a.G!=0){if(d.o)if(g==1){f=d.m?d.m.length:0,d=Date.now()-d.F;var R=a.B;g=Xc(),Xe(g,new Pp(g,f)),ha(a)}else om(a);else if(R=d.s,R==3||R==0&&0<d.X||!(g==1&&V1(a,d)||g==2&&lu(a)))switch(f&&0<f.length&&(d=a.h,d.i=d.i.concat(f)),R){case 1:Er(a,5);break;case 4:Er(a,10);break;case 3:Er(a,6);break;default:Er(a,2)}}}function cm(a,d){let f=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(f*=2),f*d}function Er(a,d){if(a.j.info("Error code "+d),d==2){var f=v(a.fb,a),g=a.Xa;const R=!g;g=new wr(g||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||ia(g,"https"),aa(g),R?O1(g.toString(),f):D1(g.toString(),f)}else Je(2);a.G=0,a.l&&a.l.sa(d),um(a),rm(a)}t.fb=function(a){a?(this.j.info("Successfully pinged google.com"),Je(2)):(this.j.info("Failed to ping google.com"),Je(1))};function um(a){if(a.G=0,a.ka=[],a.l){const d=Vp(a.h);(d.length!=0||a.i.length!=0)&&(O(a.ka,d),O(a.ka,a.i),a.h.i.length=0,A(a.i),a.i.length=0),a.l.ra()}}function dm(a,d,f){var g=f instanceof wr?dn(f):new wr(f);if(g.g!="")d&&(g.g=d+"."+g.g),oa(g,g.s);else{var R=l.location;g=R.protocol,d=d?d+"."+R.hostname:R.hostname,R=+R.port;var P=new wr(null);g&&ia(P,g),d&&(P.g=d),R&&oa(P,R),f&&(P.l=f),g=P}return f=a.D,d=a.ya,f&&d&&de(g,f,d),de(g,"VER",a.la),_i(a,g),g}function hm(a,d,f){if(d&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return d=a.Ca&&!a.pa?new ke(new la({eb:f})):new ke(a.pa),d.Ha(a.J),d}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function fm(){}t=fm.prototype,t.ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){};function Nt(a,d){He.call(this),this.g=new nm(d),this.l=a,this.h=d&&d.messageUrlParams||null,a=d&&d.messageHeaders||null,d&&d.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=d&&d.initMessageHeaders||null,d&&d.messageContentType&&(a?a["X-WebChannel-Content-Type"]=d.messageContentType:a={"X-WebChannel-Content-Type":d.messageContentType}),d&&d.va&&(a?a["X-WebChannel-Client-Profile"]=d.va:a={"X-WebChannel-Client-Profile":d.va}),this.g.S=a,(a=d&&d.Sb)&&!E(a)&&(this.g.m=a),this.v=d&&d.supportsCrossDomainXhr||!1,this.u=d&&d.sendRawJson||!1,(d=d&&d.httpSessionIdParam)&&!E(d)&&(this.g.D=d,a=this.h,a!==null&&d in a&&(a=this.h,d in a&&delete a[d])),this.j=new rs(this)}I(Nt,He),Nt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Nt.prototype.close=function(){au(this.g)},Nt.prototype.o=function(a){var d=this.g;if(typeof a=="string"){var f={};f.__data__=a,a=f}else this.u&&(f={},f.__data__=qc(a),a=f);d.i.push(new S1(d.Ya++,a)),d.G==3&&ha(d)},Nt.prototype.N=function(){this.g.l=null,delete this.j,au(this.g),delete this.g,Nt.aa.N.call(this)};function pm(a){Yc.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var d=a.__sm__;if(d){e:{for(const f in d){a=f;break e}a=void 0}(this.i=a)&&(a=this.i,d=d!==null&&a in d?d[a]:void 0),this.data=d}else this.data=a}I(pm,Yc);function mm(){Qc.call(this),this.status=1}I(mm,Qc);function rs(a){this.g=a}I(rs,fm),rs.prototype.ua=function(){Xe(this.g,"a")},rs.prototype.ta=function(a){Xe(this.g,new pm(a))},rs.prototype.sa=function(a){Xe(this.g,new mm)},rs.prototype.ra=function(){Xe(this.g,"b")},Nt.prototype.send=Nt.prototype.o,Nt.prototype.open=Nt.prototype.m,Nt.prototype.close=Nt.prototype.close,Jc.NO_ERROR=0,Jc.TIMEOUT=8,Jc.HTTP_ERROR=6,E1.COMPLETE="complete",v1.EventType=li,li.OPEN="a",li.CLOSE="b",li.ERROR="c",li.MESSAGE="d",He.prototype.listen=He.prototype.K,ke.prototype.listenOnce=ke.prototype.L,ke.prototype.getLastError=ke.prototype.Ka,ke.prototype.getLastErrorCode=ke.prototype.Ba,ke.prototype.getStatus=ke.prototype.Z,ke.prototype.getResponseJson=ke.prototype.Oa,ke.prototype.getResponseText=ke.prototype.oa,ke.prototype.send=ke.prototype.ea,ke.prototype.setWithCredentials=ke.prototype.Ha}).apply(typeof Da<"u"?Da:typeof self<"u"?self:typeof window<"u"?window:{});const F0="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class et{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}et.UNAUTHENTICATED=new et(null),et.GOOGLE_CREDENTIALS=new et("google-credentials-uid"),et.FIRST_PARTY=new et("first-party-uid"),et.MOCK_USER=new et("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Zo="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xs=new $o("@firebase/firestore");function $t(t,...e){if(Xs.logLevel<=re.DEBUG){const n=e.map(up);Xs.debug(`Firestore (${Zo}): ${t}`,...n)}}function Fw(t,...e){if(Xs.logLevel<=re.ERROR){const n=e.map(up);Xs.error(`Firestore (${Zo}): ${t}`,...n)}}function BR(t,...e){if(Xs.logLevel<=re.WARN){const n=e.map(up);Xs.warn(`Firestore (${Zo}): ${t}`,...n)}}function up(t){if(typeof t=="string")return t;try{/**
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
 */function dp(t="Unexpected state"){const e=`FIRESTORE (${Zo}) INTERNAL ASSERTION FAILED: `+t;throw Fw(e),new Error(e)}function eo(t,e){t||dp()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lt={CANCELLED:"cancelled",INVALID_ARGUMENT:"invalid-argument",FAILED_PRECONDITION:"failed-precondition"};class ct extends Yt{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class to{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uw{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class HR{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(et.UNAUTHENTICATED))}shutdown(){}}class WR{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class GR{constructor(e){this.t=e,this.currentUser=et.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){eo(this.o===void 0);let r=this.i;const s=u=>this.i!==r?(r=this.i,n(u)):Promise.resolve();let i=new to;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new to,e.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const u=i;e.enqueueRetryable(async()=>{await u.promise,await s(this.currentUser)})},l=u=>{$t("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(u=>l(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?l(u):($t("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new to)}},0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?($t("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(eo(typeof r.accessToken=="string"),new Uw(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return eo(e===null||typeof e=="string"),new et(e)}}class qR{constructor(e,n,r){this.l=e,this.h=n,this.P=r,this.type="FirstParty",this.user=et.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class KR{constructor(e,n,r){this.l=e,this.h=n,this.P=r}getToken(){return Promise.resolve(new qR(this.l,this.h,this.P))}start(e,n){e.enqueueRetryable(()=>n(et.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class YR{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class QR{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,n){eo(this.o===void 0);const r=i=>{i.error!=null&&$t("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.R;return this.R=i.token,$t("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{$t("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.A.getImmediate({optional:!0});i?s(i):$t("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(eo(typeof n.token=="string"),this.R=n.token,new YR(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}function XR(t){return t.name==="IndexedDbTransactionError"}class Yl{constructor(e,n){this.projectId=e,this.database=n||"(default)"}static empty(){return new Yl("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof Yl&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var U0,Z;(Z=U0||(U0={}))[Z.OK=0]="OK",Z[Z.CANCELLED=1]="CANCELLED",Z[Z.UNKNOWN=2]="UNKNOWN",Z[Z.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Z[Z.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Z[Z.NOT_FOUND=5]="NOT_FOUND",Z[Z.ALREADY_EXISTS=6]="ALREADY_EXISTS",Z[Z.PERMISSION_DENIED=7]="PERMISSION_DENIED",Z[Z.UNAUTHENTICATED=16]="UNAUTHENTICATED",Z[Z.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Z[Z.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Z[Z.ABORTED=10]="ABORTED",Z[Z.OUT_OF_RANGE=11]="OUT_OF_RANGE",Z[Z.UNIMPLEMENTED=12]="UNIMPLEMENTED",Z[Z.INTERNAL=13]="INTERNAL",Z[Z.UNAVAILABLE=14]="UNAVAILABLE",Z[Z.DATA_LOSS=15]="DATA_LOSS";/**
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
 */new Mw([4294967295,4294967295],0);function Xu(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JR{constructor(e,n,r=1e3,s=1.5,i=6e4){this.ui=e,this.timerId=n,this.ko=r,this.qo=s,this.Qo=i,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const n=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),s=Math.max(0,n-r);s>0&&$t("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ko} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,s,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hp{constructor(e,n,r,s,i){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new to,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,s,i){const o=Date.now()+r,l=new hp(e,n,o,s,i);return l.start(r),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new ct(lt.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}var z0,V0;(V0=z0||(z0={})).ea="default",V0.Cache="cache";/**
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
 */function ZR(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
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
 */const $0=new Map;function eP(t,e,n,r){if(e===!0&&r===!0)throw new ct(lt.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function tP(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":dp()}function nP(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new ct(lt.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=tP(t);throw new ct(lt.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
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
 */class B0{constructor(e){var n,r;if(e.host===void 0){if(e.ssl!==void 0)throw new ct(lt.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(n=e.ssl)===null||n===void 0||n;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new ct(lt.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}eP("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=ZR((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new ct(lt.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new ct(lt.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new ct(lt.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class zw{constructor(e,n,r,s){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new B0({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new ct(lt.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new ct(lt.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new B0(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new HR;switch(r.type){case"firstParty":return new KR(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new ct(lt.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const r=$0.get(n);r&&($t("ComponentProvider","Removing Datastore"),$0.delete(n),r.terminate())}(this),Promise.resolve()}}function rP(t,e,n,r={}){var s;const i=(t=nP(t,zw))._getSettings(),o=`${e}:${n}`;if(i.host!=="firestore.googleapis.com"&&i.host!==o&&BR("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),t._setSettings(Object.assign(Object.assign({},i),{host:o,ssl:!1})),r.mockUserToken){let l,u;if(typeof r.mockUserToken=="string")l=r.mockUserToken,u=et.MOCK_USER;else{l=j_(r.mockUserToken,(s=t._app)===null||s===void 0?void 0:s.options.projectId);const h=r.mockUserToken.sub||r.mockUserToken.user_id;if(!h)throw new ct(lt.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");u=new et(h)}t._authCredentials=new WR(new Uw(l,u))}}/**
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
 */class H0{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new JR(this,"async_queue_retry"),this.Vu=()=>{const r=Xu();r&&$t("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const n=Xu();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const n=Xu();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const n=new to;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!XR(e))throw e;$t("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const n=this.mu.then(()=>(this.du=!0,e().catch(r=>{this.Eu=r,this.du=!1;const s=function(o){let l=o.message||"";return o.stack&&(l=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),l}(r);throw Fw("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.du=!1,r))));return this.mu=n,n}enqueueAfterDelay(e,n,r){this.fu(),this.Ru.indexOf(e)>-1&&(n=0);const s=hp.createAndSchedule(this,e,n,r,i=>this.yu(i));return this.Tu.push(s),s}fu(){this.Eu&&dp()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const n of this.Tu)if(n.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.Tu)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const n=this.Tu.indexOf(e);this.Tu.splice(n,1)}}class sP extends zw{constructor(e,n,r,s){super(e,n,r,s),this.type="firestore",this._queue=new H0,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new H0(e),this._firestoreClient=void 0,await e}}}function iP(t,e){const n=typeof t=="object"?t:Ec(),r=typeof t=="string"?t:"(default)",s=yr(n,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=R_("firestore");i&&rP(s,...i)}return s}(function(e,n=!0){(function(s){Zo=s})(Qr),qt(new jt("firestore",(r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),l=new sP(new GR(r.getProvider("auth-internal")),new QR(r.getProvider("app-check-internal")),function(h,m){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new ct(lt.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Yl(h.options.projectId,m)}(o,s),o);return i=Object.assign({useFetchStreams:n},i),l._setSettings(i),l},"PUBLIC").setMultipleInstances(!0)),mt(F0,"4.7.3",e),mt(F0,"4.7.3","esm2017")})();const Vw="@firebase/installations",fp="0.6.9";/**
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
 */const $w=1e4,Bw=`w:${fp}`,Hw="FIS_v2",oP="https://firebaseinstallations.googleapis.com/v1",aP=60*60*1e3,lP="installations",cP="Installations";/**
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
 */const uP={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},Wr=new Yr(lP,cP,uP);function Ww(t){return t instanceof Yt&&t.code.includes("request-failed")}/**
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
 */function Gw({projectId:t}){return`${oP}/projects/${t}/installations`}function qw(t){return{token:t.token,requestStatus:2,expiresIn:hP(t.expiresIn),creationTime:Date.now()}}async function Kw(t,e){const r=(await e.json()).error;return Wr.create("request-failed",{requestName:t,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function Yw({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function dP(t,{refreshToken:e}){const n=Yw(t);return n.append("Authorization",fP(e)),n}async function Qw(t){const e=await t();return e.status>=500&&e.status<600?t():e}function hP(t){return Number(t.replace("s","000"))}function fP(t){return`${Hw} ${t}`}/**
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
 */async function pP({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const r=Gw(t),s=Yw(t),i=e.getImmediate({optional:!0});if(i){const h=await i.getHeartbeatsHeader();h&&s.append("x-firebase-client",h)}const o={fid:n,authVersion:Hw,appId:t.appId,sdkVersion:Bw},l={method:"POST",headers:s,body:JSON.stringify(o)},u=await Qw(()=>fetch(r,l));if(u.ok){const h=await u.json();return{fid:h.fid||n,registrationStatus:2,refreshToken:h.refreshToken,authToken:qw(h.authToken)}}else throw await Kw("Create Installation",u)}/**
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
 */function Xw(t){return new Promise(e=>{setTimeout(e,t)})}/**
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
 */function mP(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */const gP=/^[cdef][\w-]{21}$/,_h="";function vP(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const n=yP(t);return gP.test(n)?n:_h}catch{return _h}}function yP(t){return mP(t).substr(0,22)}/**
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
 */function Mc(t){return`${t.appName}!${t.appId}`}/**
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
 */const Jw=new Map;function Zw(t,e){const n=Mc(t);e1(n,e),_P(n,e)}function e1(t,e){const n=Jw.get(t);if(n)for(const r of n)r(e)}function _P(t,e){const n=xP();n&&n.postMessage({key:t,fid:e}),wP()}let Pr=null;function xP(){return!Pr&&"BroadcastChannel"in self&&(Pr=new BroadcastChannel("[Firebase] FID Change"),Pr.onmessage=t=>{e1(t.data.key,t.data.fid)}),Pr}function wP(){Jw.size===0&&Pr&&(Pr.close(),Pr=null)}/**
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
 */const EP="firebase-installations-database",kP=1,Gr="firebase-installations-store";let Ju=null;function pp(){return Ju||(Ju=V_(EP,kP,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(Gr)}}})),Ju}async function Ql(t,e){const n=Mc(t),s=(await pp()).transaction(Gr,"readwrite"),i=s.objectStore(Gr),o=await i.get(n);return await i.put(e,n),await s.done,(!o||o.fid!==e.fid)&&Zw(t,e.fid),e}async function t1(t){const e=Mc(t),r=(await pp()).transaction(Gr,"readwrite");await r.objectStore(Gr).delete(e),await r.done}async function Fc(t,e){const n=Mc(t),s=(await pp()).transaction(Gr,"readwrite"),i=s.objectStore(Gr),o=await i.get(n),l=e(o);return l===void 0?await i.delete(n):await i.put(l,n),await s.done,l&&(!o||o.fid!==l.fid)&&Zw(t,l.fid),l}/**
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
 */async function mp(t){let e;const n=await Fc(t.appConfig,r=>{const s=SP(r),i=NP(t,s);return e=i.registrationPromise,i.installationEntry});return n.fid===_h?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function SP(t){const e=t||{fid:vP(),registrationStatus:0};return n1(e)}function NP(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(Wr.create("app-offline"));return{installationEntry:e,registrationPromise:s}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},r=CP(t,n);return{installationEntry:n,registrationPromise:r}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:IP(t)}:{installationEntry:e}}async function CP(t,e){try{const n=await pP(t,e);return Ql(t.appConfig,n)}catch(n){throw Ww(n)&&n.customData.serverCode===409?await t1(t.appConfig):await Ql(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function IP(t){let e=await W0(t.appConfig);for(;e.registrationStatus===1;)await Xw(100),e=await W0(t.appConfig);if(e.registrationStatus===0){const{installationEntry:n,registrationPromise:r}=await mp(t);return r||n}return e}function W0(t){return Fc(t,e=>{if(!e)throw Wr.create("installation-not-found");return n1(e)})}function n1(t){return TP(t)?{fid:t.fid,registrationStatus:0}:t}function TP(t){return t.registrationStatus===1&&t.registrationTime+$w<Date.now()}/**
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
 */async function bP({appConfig:t,heartbeatServiceProvider:e},n){const r=RP(t,n),s=dP(t,n),i=e.getImmediate({optional:!0});if(i){const h=await i.getHeartbeatsHeader();h&&s.append("x-firebase-client",h)}const o={installation:{sdkVersion:Bw,appId:t.appId}},l={method:"POST",headers:s,body:JSON.stringify(o)},u=await Qw(()=>fetch(r,l));if(u.ok){const h=await u.json();return qw(h)}else throw await Kw("Generate Auth Token",u)}function RP(t,{fid:e}){return`${Gw(t)}/${e}/authTokens:generate`}/**
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
 */async function gp(t,e=!1){let n;const r=await Fc(t.appConfig,i=>{if(!r1(i))throw Wr.create("not-registered");const o=i.authToken;if(!e&&jP(o))return i;if(o.requestStatus===1)return n=PP(t,e),i;{if(!navigator.onLine)throw Wr.create("app-offline");const l=DP(i);return n=AP(t,l),l}});return n?await n:r.authToken}async function PP(t,e){let n=await G0(t.appConfig);for(;n.authToken.requestStatus===1;)await Xw(100),n=await G0(t.appConfig);const r=n.authToken;return r.requestStatus===0?gp(t,e):r}function G0(t){return Fc(t,e=>{if(!r1(e))throw Wr.create("not-registered");const n=e.authToken;return LP(n)?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}async function AP(t,e){try{const n=await bP(t,e),r=Object.assign(Object.assign({},e),{authToken:n});return await Ql(t.appConfig,r),n}catch(n){if(Ww(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await t1(t.appConfig);else{const r=Object.assign(Object.assign({},e),{authToken:{requestStatus:0}});await Ql(t.appConfig,r)}throw n}}function r1(t){return t!==void 0&&t.registrationStatus===2}function jP(t){return t.requestStatus===2&&!OP(t)}function OP(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+aP}function DP(t){const e={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},t),{authToken:e})}function LP(t){return t.requestStatus===1&&t.requestTime+$w<Date.now()}/**
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
 */async function MP(t){const e=t,{installationEntry:n,registrationPromise:r}=await mp(e);return r?r.catch(console.error):gp(e).catch(console.error),n.fid}/**
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
 */async function FP(t,e=!1){const n=t;return await UP(n),(await gp(n,e)).token}async function UP(t){const{registrationPromise:e}=await mp(t);e&&await e}/**
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
 */function zP(t){if(!t||!t.options)throw Zu("App Configuration");if(!t.name)throw Zu("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw Zu(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function Zu(t){return Wr.create("missing-app-config-values",{valueName:t})}/**
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
 */const s1="installations",VP="installations-internal",$P=t=>{const e=t.getProvider("app").getImmediate(),n=zP(e),r=yr(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},BP=t=>{const e=t.getProvider("app").getImmediate(),n=yr(e,s1).getImmediate();return{getId:()=>MP(n),getToken:s=>FP(n,s)}};function HP(){qt(new jt(s1,$P,"PUBLIC")),qt(new jt(VP,BP,"PRIVATE"))}HP();mt(Vw,fp);mt(Vw,fp,"esm2017");/**
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
 */const Xl="analytics",WP="firebase_id",GP="origin",qP=60*1e3,KP="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",vp="https://www.googletagmanager.com/gtag/js";/**
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
 */const gt=new $o("@firebase/analytics");/**
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
 */const YP={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},wt=new Yr("analytics","Analytics",YP);/**
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
 */function QP(t){if(!t.startsWith(vp)){const e=wt.create("invalid-gtag-resource",{gtagURL:t});return gt.warn(e.message),""}return t}function i1(t){return Promise.all(t.map(e=>e.catch(n=>n)))}function XP(t,e){let n;return window.trustedTypes&&(n=window.trustedTypes.createPolicy(t,e)),n}function JP(t,e){const n=XP("firebase-js-sdk-policy",{createScriptURL:QP}),r=document.createElement("script"),s=`${vp}?l=${t}&id=${e}`;r.src=n?n==null?void 0:n.createScriptURL(s):s,r.async=!0,document.head.appendChild(r)}function ZP(t){let e=[];return Array.isArray(window[t])?e=window[t]:window[t]=e,e}async function eA(t,e,n,r,s,i){const o=r[s];try{if(o)await e[o];else{const u=(await i1(n)).find(h=>h.measurementId===s);u&&await e[u.appId]}}catch(l){gt.error(l)}t("config",s,i)}async function tA(t,e,n,r,s){try{let i=[];if(s&&s.send_to){let o=s.send_to;Array.isArray(o)||(o=[o]);const l=await i1(n);for(const u of o){const h=l.find(p=>p.measurementId===u),m=h&&e[h.appId];if(m)i.push(m);else{i=[];break}}}i.length===0&&(i=Object.values(e)),await Promise.all(i),t("event",r,s||{})}catch(i){gt.error(i)}}function nA(t,e,n,r){async function s(i,...o){try{if(i==="event"){const[l,u]=o;await tA(t,e,n,l,u)}else if(i==="config"){const[l,u]=o;await eA(t,e,n,r,l,u)}else if(i==="consent"){const[l,u]=o;t("consent",l,u)}else if(i==="get"){const[l,u,h]=o;t("get",l,u,h)}else if(i==="set"){const[l]=o;t("set",l)}else t(i,...o)}catch(l){gt.error(l)}}return s}function rA(t,e,n,r,s){let i=function(...o){window[r].push(arguments)};return window[s]&&typeof window[s]=="function"&&(i=window[s]),window[s]=nA(i,t,e,n),{gtagCore:i,wrappedGtag:window[s]}}function sA(t){const e=window.document.getElementsByTagName("script");for(const n of Object.values(e))if(n.src&&n.src.includes(vp)&&n.src.includes(t))return n;return null}/**
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
 */const iA=30,oA=1e3;class aA{constructor(e={},n=oA){this.throttleMetadata=e,this.intervalMillis=n}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,n){this.throttleMetadata[e]=n}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const o1=new aA;function lA(t){return new Headers({Accept:"application/json","x-goog-api-key":t})}async function cA(t){var e;const{appId:n,apiKey:r}=t,s={method:"GET",headers:lA(r)},i=KP.replace("{app-id}",n),o=await fetch(i,s);if(o.status!==200&&o.status!==304){let l="";try{const u=await o.json();!((e=u.error)===null||e===void 0)&&e.message&&(l=u.error.message)}catch{}throw wt.create("config-fetch-failed",{httpStatus:o.status,responseMessage:l})}return o.json()}async function uA(t,e=o1,n){const{appId:r,apiKey:s,measurementId:i}=t.options;if(!r)throw wt.create("no-app-id");if(!s){if(i)return{measurementId:i,appId:r};throw wt.create("no-api-key")}const o=e.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},l=new fA;return setTimeout(async()=>{l.abort()},qP),a1({appId:r,apiKey:s,measurementId:i},o,l,e)}async function a1(t,{throttleEndTimeMillis:e,backoffCount:n},r,s=o1){var i;const{appId:o,measurementId:l}=t;try{await dA(r,e)}catch(u){if(l)return gt.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${l} provided in the "measurementId" field in the local Firebase config. [${u==null?void 0:u.message}]`),{appId:o,measurementId:l};throw u}try{const u=await cA(t);return s.deleteThrottleMetadata(o),u}catch(u){const h=u;if(!hA(h)){if(s.deleteThrottleMetadata(o),l)return gt.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${l} provided in the "measurementId" field in the local Firebase config. [${h==null?void 0:h.message}]`),{appId:o,measurementId:l};throw u}const m=Number((i=h==null?void 0:h.customData)===null||i===void 0?void 0:i.httpStatus)===503?Tg(n,s.intervalMillis,iA):Tg(n,s.intervalMillis),p={throttleEndTimeMillis:Date.now()+m,backoffCount:n+1};return s.setThrottleMetadata(o,p),gt.debug(`Calling attemptFetch again in ${m} millis`),a1(t,p,r,s)}}function dA(t,e){return new Promise((n,r)=>{const s=Math.max(e-Date.now(),0),i=setTimeout(n,s);t.addEventListener(()=>{clearTimeout(i),r(wt.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function hA(t){if(!(t instanceof Yt)||!t.customData)return!1;const e=Number(t.customData.httpStatus);return e===429||e===500||e===503||e===504}class fA{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function pA(t,e,n,r,s){if(s&&s.global){t("event",n,r);return}else{const i=await e,o=Object.assign(Object.assign({},r),{send_to:i});t("event",n,o)}}/**
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
 */async function mA(){if(L_())try{await M_()}catch(t){return gt.warn(wt.create("indexeddb-unavailable",{errorInfo:t==null?void 0:t.toString()}).message),!1}else return gt.warn(wt.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function gA(t,e,n,r,s,i,o){var l;const u=uA(t);u.then(T=>{n[T.measurementId]=T.appId,t.options.measurementId&&T.measurementId!==t.options.measurementId&&gt.warn(`The measurement ID in the local Firebase config (${t.options.measurementId}) does not match the measurement ID fetched from the server (${T.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(T=>gt.error(T)),e.push(u);const h=mA().then(T=>{if(T)return r.getId()}),[m,p]=await Promise.all([u,h]);sA(i)||JP(i,m.measurementId),s("js",new Date);const v=(l=o==null?void 0:o.config)!==null&&l!==void 0?l:{};return v[GP]="firebase",v.update=!0,p!=null&&(v[WP]=p),s("config",m.measurementId,v),m.measurementId}/**
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
 */class vA{constructor(e){this.app=e}_delete(){return delete no[this.app.options.appId],Promise.resolve()}}let no={},q0=[];const K0={};let ed="dataLayer",yA="gtag",Y0,l1,Q0=!1;function _A(){const t=[];if(O_()&&t.push("This is a browser extension environment."),GS()||t.push("Cookies are not available."),t.length>0){const e=t.map((r,s)=>`(${s+1}) ${r}`).join(" "),n=wt.create("invalid-analytics-context",{errorInfo:e});gt.warn(n.message)}}function xA(t,e,n){_A();const r=t.options.appId;if(!r)throw wt.create("no-app-id");if(!t.options.apiKey)if(t.options.measurementId)gt.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${t.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw wt.create("no-api-key");if(no[r]!=null)throw wt.create("already-exists",{id:r});if(!Q0){ZP(ed);const{wrappedGtag:i,gtagCore:o}=rA(no,q0,K0,ed,yA);l1=i,Y0=o,Q0=!0}return no[r]=gA(t,q0,K0,e,Y0,ed,n),new vA(t)}function wA(t=Ec()){t=Oe(t);const e=yr(t,Xl);return e.isInitialized()?e.getImmediate():EA(t)}function EA(t,e={}){const n=yr(t,Xl);if(n.isInitialized()){const s=n.getImmediate();if(ko(e,n.getOptions()))return s;throw wt.create("already-initialized")}return n.initialize({options:e})}function kA(t,e,n,r){t=Oe(t),pA(l1,no[t.app.options.appId],e,n,r).catch(s=>gt.error(s))}const X0="@firebase/analytics",J0="0.10.8";function SA(){qt(new jt(Xl,(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("installations-internal").getImmediate();return xA(r,s,n)},"PUBLIC")),qt(new jt("analytics-internal",t,"PRIVATE")),mt(X0,J0),mt(X0,J0,"esm2017");function t(e){try{const n=e.getProvider(Xl).getImmediate();return{logEvent:(r,s,i)=>kA(n,r,s,i)}}catch(n){throw wt.create("interop-component-reg-failed",{reason:n})}}}SA();const NA={apiKey:"AIzaSyDyM1bZvabUpqINlIyF66DEaiHSePhzrB0",authDomain:"trasnporte-nataga---la-plata.firebaseapp.com",databaseURL:"https://trasnporte-nataga---la-plata-default-rtdb.firebaseio.com",projectId:"trasnporte-nataga---la-plata",storageBucket:"trasnporte-nataga---la-plata.firebasestorage.app",messagingSenderId:"175264872585",appId:"1:175264872585:web:124a80135af84a38f72e58",measurementId:"G-QXERYS2M87"},Uc=$_(NA);wA(Uc);const Oo=C2(Uc),Fe=zR(Uc);iP(Uc);function CA({onLogin:t,onRegisterOwner:e,onRegisterPassenger:n,onViewTerms:r,onViewPrivacy:s,onViewManual:i}){const[o,l]=H.useState(0),u=[{icon:c.jsx(Ur,{size:32}),title:"Pasajeros",desc:"Reserva tu asiento desde cualquier dispositivo. Usa la App nativa en Android o nuestra plataforma web optimizada para iPhone.",color:"text-blue-500",features:["Reserva Web & App","Puntos Go por fidelidad","Estatus PRO exclusivo"],actions:[{label:"Android App",type:"primary",link:"https://play.google.com/store/apps/details?id=com.chopcode.rutago.app"},{label:"Versión Web",type:"secondary",action:n}]},{icon:c.jsx(vr,{size:32}),title:"Conductores",desc:"Optimiza tus ingresos con herramientas digitales. Gestiona tu planilla desde Android o consulta tu ruta desde la web.",color:"text-primary-500",features:["Planilla Digital","Estatus Estrella","Check-in en vivo"],actions:[{label:"Descargar App",type:"primary",link:"https://play.google.com/store/apps/details?id=com.chopcode.rutago.app"},{label:"Acceso Web",type:"secondary",action:t}]},{icon:c.jsx(wo,{size:32}),title:"Dueños de Flota",desc:"Control room total de tus activos. Vigila la ocupación en tiempo real y monitorea ingresos desde tu oficina o celular.",color:"text-green-500",features:["Aislamiento de propiedad","Métricas en tiempo real","Control de flota"],actions:[{label:"Entrar al Portal",type:"primary",action:t},{label:"Afiliar Flota",type:"secondary",action:e}]}];return H.useEffect(()=>{const h=setInterval(()=>{l(m=>(m+1)%u.length)},5e3);return()=>clearInterval(h)},[]),c.jsxs("div",{className:"min-h-screen bg-white text-slate-900 font-sans selection:bg-primary-100",children:[c.jsx("nav",{className:"fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100",children:c.jsxs("div",{className:"max-w-7xl mx-auto px-3 md:px-6 h-16 md:h-20 flex items-center justify-between",children:[c.jsxs("div",{className:"flex items-center gap-2 md:gap-3",children:[c.jsx("div",{className:"w-8 h-8 md:w-10 md:h-10 bg-secondary-900 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg shrink-0",children:c.jsx("img",{src:"/assets/logo_icon.png",alt:"Ruta-Go Logo",className:"w-5 h-5 md:w-7 md:h-7 object-contain"})}),c.jsx("span",{className:"text-lg md:text-2xl font-black tracking-tighter text-secondary-900",children:"Ruta-Go"})]}),c.jsxs("div",{className:"flex items-center gap-1.5 md:gap-4",children:[c.jsx("button",{onClick:t,className:"px-2 md:px-6 py-2 font-bold text-slate-600 hover:text-primary-500 transition-colors text-[10px] md:text-sm",children:"Iniciar Sesión"}),c.jsxs("button",{onClick:e,className:"px-3 md:px-6 py-2 bg-secondary-900 text-white font-bold rounded-xl shadow-xl hover:bg-black transition-all active:scale-95 text-[9px] md:text-sm uppercase tracking-wider",children:["Ser Dueño",c.jsx("span",{className:"hidden md:inline",children:" de Flota"})]})]})]})}),c.jsxs("header",{className:"pt-28 md:pt-40 pb-12 md:pb-20 px-4 md:px-6 overflow-hidden relative",children:[c.jsx("div",{className:"absolute top-20 right-0 w-64 md:w-96 h-64 md:h-96 bg-primary-500/10 rounded-full blur-3xl -z-10 animate-pulse"}),c.jsxs("div",{className:"max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center",children:[c.jsxs("div",{className:"space-y-4 md:space-y-8 text-center lg:text-left",children:[c.jsxs("div",{className:"inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-primary-50 rounded-full text-primary-600 font-black text-[8px] md:text-[10px] uppercase tracking-widest border border-primary-100 mx-auto lg:mx-0",children:[c.jsx(Ng,{size:12,className:"md:size-[14px]"})," El futuro del transporte huilense"]}),c.jsxs("h1",{className:"text-3xl md:text-5xl lg:text-7xl font-black text-secondary-900 leading-[1.1] tracking-tight",children:["Conectando ",c.jsx("span",{className:"text-primary-500",children:"Nátaga"})," y La Plata con tecnología."]}),c.jsx("p",{className:"text-base md:text-xl text-slate-500 leading-relaxed max-w-lg mx-auto lg:mx-0 px-2 md:px-0",children:"Ruta-Go profesionaliza el transporte intermunicipal. Reservas en tiempo real, control de flota y una experiencia premium para todos."}),c.jsxs("div",{className:"flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start px-4 sm:px-0",children:[c.jsxs("a",{href:"https://play.google.com/store/apps/details?id=com.chopcode.rutago.app",target:"_blank",rel:"noopener noreferrer",className:"px-6 md:px-10 py-3.5 md:py-5 bg-primary-500 text-white font-black rounded-2xl shadow-2xl shadow-primary-500/40 hover:bg-orange-600 transition-all active:scale-95 flex items-center justify-center gap-2 md:gap-3 group text-sm md:text-lg",children:["Android App ",c.jsx(Cl,{size:18,className:"group-hover:translate-x-1 transition-transform"})]}),c.jsx("button",{onClick:n,className:"px-6 md:px-10 py-3.5 md:py-5 bg-white text-secondary-900 font-black rounded-2xl border-2 border-secondary-900 hover:bg-secondary-50 transition-all active:scale-95 text-sm md:text-lg",children:"Versión Web (iPhone)"})]})]}),c.jsxs("div",{className:"relative mt-8 lg:mt-0",children:[c.jsx("div",{className:"bg-gradient-to-tr from-secondary-900 to-slate-800 rounded-[2.5rem] md:rounded-[3rem] p-4 md:p-8 shadow-2xl shadow-slate-900/20 transform lg:rotate-2",children:c.jsx("div",{className:"bg-white rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-inner",children:c.jsx("img",{src:"https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2069",alt:"Ruta-Go App Preview",className:"w-full h-64 md:h-96 object-cover"})})}),c.jsxs("div",{className:"absolute -bottom-4 -left-2 md:-bottom-6 md:-left-6 bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-2xl border border-slate-100 flex items-center gap-3 md:gap-4 animate-bounce-slow",children:[c.jsx("div",{className:"w-10 h-10 md:w-12 h-12 bg-amber-50 rounded-xl md:rounded-2xl flex items-center justify-center text-amber-500",children:c.jsx(Ng,{size:22,fill:"currentColor"})}),c.jsxs("div",{children:[c.jsx("p",{className:"text-[10px] text-slate-400 font-bold uppercase",children:"Calificación App"}),c.jsx("p",{className:"text-base md:text-lg font-black text-slate-800 leading-none",children:"4.9 / 5.0"})]})]})]})]})]}),c.jsx("section",{className:"py-16 md:py-24 bg-slate-50 overflow-hidden",children:c.jsxs("div",{className:"max-w-7xl mx-auto px-6",children:[c.jsxs("div",{className:"text-center mb-12 md:mb-16 space-y-4",children:[c.jsx("h2",{className:"text-3xl md:text-4xl font-black text-secondary-900 tracking-tight px-4",children:"Soluciones para todo el ecosistema"}),c.jsx("p",{className:"text-slate-500 font-medium text-sm md:text-base",children:"Haz clic en tu perfil para comenzar."})]}),c.jsx("div",{className:"hidden lg:grid grid-cols-3 gap-8",children:u.map((h,m)=>c.jsx(Z0,{...h,onClick:h.action,isStatic:!0},m))}),c.jsxs("div",{className:"lg:hidden relative max-w-sm mx-auto h-[460px]",children:[u.map((h,m)=>{const p=m===o;return c.jsx("div",{className:`absolute inset-0 transition-all duration-700 ease-in-out transform ${p?"translate-x-0 opacity-100 scale-100 z-30":"translate-x-full opacity-0 scale-95 z-0"}`,children:c.jsx(Z0,{...h,onClick:h.action})},m)}),c.jsx("div",{className:"absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-3",children:u.map((h,m)=>c.jsx("button",{onClick:()=>l(m),className:`h-2 rounded-full transition-all duration-300 ${m===o?"w-8 bg-primary-500":"w-2 bg-slate-200"}`},m))})]})]})}),c.jsx("section",{className:"py-16 md:py-24 bg-white",children:c.jsxs("div",{className:"max-w-7xl mx-auto px-6 flex flex-col items-center text-center space-y-8 md:space-y-12",children:[c.jsx("h2",{className:"text-3xl md:text-4xl font-black text-secondary-900 tracking-tight max-w-2xl px-4",children:"Conectamos los puntos más importantes del sur del Huila."}),c.jsxs("div",{className:"flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8",children:[c.jsx(ev,{city:"Nátaga"}),c.jsx("div",{className:"w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-300 transform rotate-90 sm:rotate-0",children:c.jsx(Cl,{})}),c.jsx(ev,{city:"La Plata"})]})]})}),c.jsxs("footer",{className:"bg-secondary-900 py-16 md:py-24 text-white overflow-hidden relative",children:[c.jsx("div",{className:"absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-orange-400 to-transparent"}),c.jsxs("div",{className:"max-w-7xl mx-auto px-6 text-center space-y-8 md:space-y-10 relative z-10",children:[c.jsxs("h2",{className:"text-4xl md:text-5xl font-black tracking-tight leading-tight",children:["¿Listo para llevar tu flota ",c.jsx("br",{className:"hidden md:block"}),"al siguiente nivel?"]}),c.jsx("p",{className:"text-white/50 text-lg md:text-xl max-w-2xl mx-auto px-4",children:"Únete a la red de transporte más moderna de la región. Registra tu vehículo hoy mismo y empieza a ver los beneficios."}),c.jsxs("div",{className:"flex flex-col sm:flex-row justify-center gap-4 md:gap-6 pt-4 px-8 sm:px-0",children:[c.jsx("button",{onClick:e,className:"px-10 md:px-12 py-4 md:py-5 bg-primary-500 text-white font-black rounded-2xl shadow-2xl shadow-primary-500/40 hover:bg-orange-600 transition-all active:scale-95 text-base md:text-xl uppercase tracking-wider",children:"Quiero ser Socio"}),c.jsx("button",{onClick:t,className:"px-10 md:px-12 py-4 md:py-5 bg-white/10 text-white font-black rounded-2xl border border-white/10 hover:bg-white/20 transition-all active:scale-95 text-base md:text-xl uppercase tracking-wider",children:"Acceso Administrativo"})]}),c.jsxs("div",{className:"pt-16 md:pt-20 grid grid-cols-1 md:grid-cols-3 items-center gap-10",children:[c.jsxs("div",{className:"flex items-center gap-2 justify-center md:justify-start",children:[c.jsx("div",{className:"w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10",children:c.jsx("img",{src:"/assets/logo_icon.png",alt:"Ruta-Go Logo",className:"w-7 h-7 object-contain"})}),c.jsx("span",{className:"text-xl font-bold tracking-tighter",children:"Ruta-Go"})]}),c.jsx("div",{className:"text-white/30 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] order-3 md:order-none",children:"ChopCode Solutions © 2026 • Huila, CO"}),c.jsxs("div",{className:"flex justify-center md:justify-end gap-6 text-white/40 text-sm md:text-base order-2 md:order-none",children:[c.jsx("span",{onClick:i,className:"hover:text-primary-500 cursor-pointer transition-colors",children:"Manual"}),c.jsx("span",{onClick:s,className:"hover:text-primary-500 cursor-pointer transition-colors",children:"Privacidad"}),c.jsx("span",{onClick:r,className:"hover:text-primary-500 cursor-pointer transition-colors",children:"Términos"})]})]})]})]})]})}function Z0({icon:t,title:e,desc:n,color:r,features:s,actions:i,isStatic:o}){return c.jsxs("div",{className:`bg-white p-8 md:p-10 rounded-3xl md:rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100 transition-all duration-500 group ${o?"hover:shadow-2xl hover:-translate-y-2":""}`,children:[c.jsx("div",{className:`mb-6 md:mb-8 w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center bg-slate-50 ${r} group-hover:scale-110 transition-transform duration-500 shadow-inner`,children:t}),c.jsx("h3",{className:"text-xl md:text-2xl font-black text-secondary-900 mb-3 md:mb-4",children:e}),c.jsx("p",{className:"text-sm md:text-base text-slate-500 leading-relaxed mb-6 md:mb-8 min-h-[3.5rem]",children:n}),c.jsx("ul",{className:"space-y-2 md:space-y-3 mb-8",children:s.map((l,u)=>c.jsxs("li",{className:"flex items-center gap-2 md:gap-3 text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wide",children:[c.jsx($s,{size:14,className:"text-green-500 md:size-4"})," ",l]},u))}),c.jsx("div",{className:"flex flex-col gap-3",children:i.map((l,u)=>l.link?c.jsxs("a",{href:l.link,target:"_blank",rel:"noopener noreferrer",className:`w-full py-3 rounded-xl font-black text-[10px] uppercase tracking-widest text-center transition-all active:scale-95 flex items-center justify-center gap-2 ${l.type==="primary"?"bg-primary-500 text-white shadow-lg shadow-primary-500/30 hover:bg-orange-600":"bg-slate-50 text-slate-600 border border-slate-200 hover:bg-white"}`,children:[l.label," ",c.jsx(Cl,{size:14})]},u):c.jsxs("button",{onClick:l.action,className:`w-full py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 ${l.type==="primary"?"bg-secondary-900 text-white shadow-lg shadow-slate-900/30 hover:bg-black":"bg-slate-50 text-slate-600 border border-slate-200 hover:bg-white"}`,children:[l.label," ",c.jsx(Cl,{size:14})]},u))})]})}function ev({city:t}){return c.jsxs("div",{className:"px-6 md:px-10 py-4 md:py-6 bg-slate-50 rounded-2xl md:rounded-[2.5rem] border border-slate-100 flex items-center gap-3 md:gap-4 group hover:bg-white hover:shadow-xl transition-all duration-500",children:[c.jsx("div",{className:"w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl shadow-md flex items-center justify-center text-primary-500 group-hover:rotate-12 transition-transform",children:c.jsx(sr,{size:20,className:"md:size-6"})}),c.jsx("span",{className:"text-lg md:text-2xl font-black text-slate-800",children:t})]})}function IA({onShowRegister:t,onBack:e}){const[n,r]=H.useState(""),[s,i]=H.useState(""),[o,l]=H.useState(null),[u,h]=H.useState(!1),m=async p=>{p.preventDefault(),h(!0),l(null);try{await cI(Oo,n,s)}catch{l("Email o contraseña incorrectos. Verifica tus credenciales.")}finally{h(!1)}};return c.jsxs("div",{className:"min-h-screen bg-secondary-900 flex flex-col lg:flex-row overflow-hidden font-sans selection:bg-primary-100",children:[c.jsxs("div",{className:"hidden lg:flex lg:w-1/2 bg-gradient-to-br from-secondary-900 to-slate-800 p-20 flex-col justify-between relative",children:[c.jsx("div",{className:"absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none",children:c.jsx(S_,{size:600,className:"text-white absolute -right-20 -bottom-20 rotate-12"})}),c.jsxs("div",{className:"relative z-10 flex items-center gap-3",children:[c.jsx("img",{src:"/assets/logo_icon.png",alt:"Ruta-Go Logo",className:"w-12 h-12 object-contain"}),c.jsx("span",{className:"text-3xl font-black tracking-tighter text-white",children:"Ruta-Go"})]}),c.jsxs("div",{className:"relative z-10 space-y-8",children:[c.jsxs("h2",{className:"text-6xl font-black text-white leading-tight tracking-tight",children:["Acceso ",c.jsx("br",{}),c.jsx("span",{className:"text-primary-500 text-7xl italic",children:"Inteligente"})," ",c.jsx("br",{}),"Universal."]}),c.jsxs("div",{className:"flex items-center gap-4 text-white/50 font-bold uppercase tracking-widest text-xs border-l-4 border-primary-500 pl-6",children:["Una sola llave para todo el Holding. ",c.jsx("br",{}),"El sistema detectará tu rol automáticamente."]})]}),c.jsx("div",{className:"relative z-10 text-white/30 text-[10px] font-black uppercase tracking-[0.3em]",children:"ChopCode Solutions • Secure Access Gateway"})]}),c.jsxs("div",{className:"flex-1 bg-white p-6 lg:p-20 flex flex-col justify-center relative animate-in fade-in slide-in-from-right-4 duration-500",children:[c.jsx("button",{onClick:e,className:"absolute top-8 left-8 lg:left-20 p-3 text-slate-400 hover:text-primary-500 hover:bg-slate-50 rounded-full transition-all group",children:c.jsx(zo,{size:24,className:"group-hover:-translate-x-1 transition-transform"})}),c.jsxs("div",{className:"max-w-md mx-auto w-full space-y-10",children:[c.jsxs("div",{className:"space-y-2",children:[c.jsx("h3",{className:"text-3xl font-black text-slate-800 tracking-tight",children:"Iniciar Sesión"}),c.jsxs("div",{className:"flex items-center gap-2",children:[c.jsx("span",{className:"w-2 h-2 bg-green-500 rounded-full animate-pulse"}),c.jsx("p",{className:"text-slate-400 font-bold text-[10px] uppercase tracking-widest",children:"Puerta de Enlace Única (SSO)"})]})]}),c.jsxs("form",{onSubmit:m,className:"space-y-6",children:[c.jsx(tv,{label:"Correo Corporativo",type:"email",placeholder:"tu@rutago.com",icon:c.jsx(vc,{size:18}),value:n,onChange:r}),c.jsx(tv,{label:"Contraseña",type:"password",placeholder:"••••••••",icon:c.jsx(w_,{size:18}),value:s,onChange:i}),o&&c.jsxs("div",{className:"p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-[10px] font-black uppercase flex items-center gap-3 animate-shake",children:[c.jsx("div",{className:"w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shrink-0"}),o]}),c.jsx("button",{type:"submit",disabled:u,className:"w-full bg-secondary-900 hover:bg-black text-white font-black py-5 rounded-2xl shadow-2xl shadow-slate-900/30 transition-all transform active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed text-sm uppercase tracking-widest",children:u?c.jsx(Bs,{className:"animate-spin",size:20}):"Entrar a Ruta-Go"})]}),c.jsx("div",{className:"pt-8 border-t border-slate-50 text-center",children:c.jsxs("p",{className:"text-xs font-bold text-slate-400 uppercase tracking-tight",children:["¿Aún no eres socio? "," ",c.jsx("button",{onClick:t,className:"text-primary-500 hover:text-orange-600 transition-colors border-b-2 border-primary-500/20 hover:border-primary-500 pb-0.5",children:"Registrar mi Flota"})]})}),c.jsx("p",{className:"text-center text-[10px] text-slate-300 font-black uppercase tracking-[0.2em]",children:"Ruta-Go Portal © 2026"})]})]})]})}function tv({label:t,type:e,placeholder:n,icon:r,value:s,onChange:i}){return c.jsxs("div",{className:"space-y-1.5 group",children:[c.jsx("label",{className:"text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-primary-500",children:t}),c.jsxs("div",{className:"relative",children:[c.jsx("div",{className:"absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 transition-colors group-focus-within:text-primary-500",children:r}),c.jsx("input",{type:e,required:!0,className:"block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-800 font-bold focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all placeholder:opacity-30 text-sm",placeholder:n,value:s,onChange:o=>i(o.target.value)})]})]})}function TA({onBack:t,initialMode:e="owner"}){const[n,r]=H.useState(e),[s,i]=H.useState(""),[o,l]=H.useState(""),[u,h]=H.useState(""),[m,p]=H.useState(""),[v,T]=H.useState(null),[I,A]=H.useState(!1),[O,S]=H.useState(!1),E=async C=>{C.preventDefault(),A(!0),T(null);try{const L=(await lI(Oo,s,o)).user;await dI(L,{displayName:u});const M=Me(Fe,`usuarios/${L.uid}`),x={id:L.uid,nombre:u,email:s,telefono:m,rol:n==="owner"?"dueño":"pasajero",fechaRegistro:Date.now(),status:"active"};if(await vh(M,x),n==="owner"){const y=Me(Fe,`dueños/${L.uid}`);await vh(y,"pendiente")}S(!0)}catch(j){j.code==="auth/email-already-in-use"?T("Este correo ya está registrado en Ruta-Go."):T("Ocurrió un error al procesar tu solicitud."),console.error(j)}finally{A(!1)}};return O?c.jsx("div",{className:"min-h-screen bg-secondary-900 flex items-center justify-center p-4",children:c.jsxs("div",{className:"max-w-md w-full bg-white rounded-[3rem] shadow-2xl p-12 text-center space-y-8 animate-in zoom-in-95 duration-500",children:[c.jsx("div",{className:"w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center text-green-600 mx-auto animate-bounce",children:c.jsx($s,{size:40})}),c.jsxs("div",{className:"space-y-4",children:[c.jsx("h2",{className:"text-3xl font-black text-slate-800 tracking-tight",children:n==="owner"?"¡Solicitud Recibida!":"¡Bienvenido a Ruta-Go!"}),c.jsxs("p",{className:"text-slate-500 font-medium leading-relaxed",children:["Hola ",c.jsx("span",{className:"text-primary-500 font-bold",children:u}),", tu cuenta ha sido creada exitosamente."]}),n==="owner"?c.jsx("div",{className:"p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider",children:"Nuestro equipo administrativo activará tu dashboard en breve."}):c.jsx("div",{className:"p-4 bg-primary-50 rounded-2xl border border-primary-100 text-xs font-bold text-primary-600 uppercase tracking-wider",children:"Ya puedes iniciar sesión y reservar tu primer viaje."})]}),c.jsx("button",{onClick:t,className:"w-full py-4 bg-secondary-900 text-white font-black rounded-2xl shadow-xl hover:bg-black transition-all active:scale-95 uppercase tracking-widest text-sm",children:"Ir al Inicio"})]})}):c.jsxs("div",{className:"min-h-screen bg-secondary-900 flex flex-col lg:flex-row overflow-hidden",children:[c.jsxs("div",{className:"hidden lg:flex lg:w-1/2 bg-gradient-to-br from-secondary-900 to-slate-800 p-20 flex-col justify-between relative",children:[c.jsx("div",{className:"absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none",children:n==="owner"?c.jsx(wo,{size:600,className:"text-white absolute -right-20 -bottom-20 rotate-12"}):c.jsx(Ur,{size:600,className:"text-white absolute -right-20 -bottom-20 rotate-12"})}),c.jsxs("div",{className:"relative z-10 flex items-center gap-3",children:[c.jsx("img",{src:"/assets/logo_icon.png",alt:"Ruta-Go Logo",className:"w-12 h-12 object-contain"}),c.jsx("span",{className:"text-3xl font-black tracking-tighter text-white",children:"Ruta-Go"})]}),c.jsxs("div",{className:"relative z-10 space-y-8",children:[c.jsxs("h2",{className:"text-6xl font-black text-white leading-tight tracking-tight",children:[n==="owner"?"Únete a la":"Viaja con"," ",c.jsx("br",{}),c.jsx("span",{className:"text-primary-500 text-7xl italic",children:"revolución"})," ",c.jsx("br",{}),n==="owner"?"del transporte.":"del Huila."]}),c.jsx("div",{className:"flex items-center gap-4 text-white/50 font-bold uppercase tracking-widest text-xs border-l-4 border-primary-500 pl-6",children:n==="owner"?"Gestión de flota, contabilidad en vivo y control operativo total.":"Reservas en tiempo real, puntos de fidelidad y la mejor experiencia."})]}),c.jsx("div",{className:"relative z-10 text-white/30 text-[10px] font-black uppercase tracking-[0.3em]",children:"ChopCode Solutions • Engineering for Productivity"})]}),c.jsxs("div",{className:"flex-1 bg-white p-6 lg:p-20 flex flex-col justify-center relative animate-in slide-in-from-right-4 duration-500",children:[c.jsx("button",{onClick:t,className:"absolute top-8 left-8 lg:left-20 p-3 text-slate-400 hover:text-primary-500 hover:bg-slate-50 rounded-full transition-all group",children:c.jsx(zo,{size:24,className:"group-hover:-translate-x-1 transition-transform"})}),c.jsxs("div",{className:"max-w-md mx-auto w-full space-y-10",children:[c.jsxs("div",{className:"space-y-4",children:[c.jsxs("div",{className:"space-y-1",children:[c.jsx("h3",{className:"text-3xl font-black text-slate-800 tracking-tight",children:n==="owner"?"Crea tu cuenta de Socio":"Registro de Pasajero"}),c.jsx("p",{className:"text-slate-400 font-bold text-[10px] uppercase tracking-widest",children:n==="owner"?"Registra tus datos para afiliar tu flota":"Únete gratis y reserva tus viajes en segundos"})]}),c.jsxs("div",{className:"flex p-1 bg-slate-100 rounded-2xl",children:[c.jsxs("button",{onClick:()=>r("passenger"),className:`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${n==="passenger"?"bg-white text-primary-500 shadow-lg shadow-slate-200":"text-slate-400 hover:text-slate-600"}`,children:[c.jsx(Ur,{size:14})," Soy Pasajero"]}),c.jsxs("button",{onClick:()=>r("owner"),className:`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${n==="owner"?"bg-white text-secondary-900 shadow-lg shadow-slate-200":"text-slate-400 hover:text-slate-600"}`,children:[c.jsx(wo,{size:14})," Soy Socio"]})]})]}),c.jsxs("form",{onSubmit:E,className:"space-y-6",children:[c.jsx(La,{label:"Nombre Completo",placeholder:"Ej: Juan Pérez",icon:c.jsx(gf,{size:18}),value:u,onChange:h,required:!0}),c.jsx(La,{label:"Correo Electrónico",type:"email",placeholder:"tu@email.com",icon:c.jsx(vc,{size:18}),value:s,onChange:i,required:!0}),c.jsx(La,{label:"Teléfono / WhatsApp",placeholder:"321 000 0000",icon:c.jsx(E_,{size:18}),value:m,onChange:p,required:!0}),c.jsx(La,{label:"Contraseña",type:"password",placeholder:"••••••••",icon:c.jsx(w_,{size:18}),value:o,onChange:l,required:!0}),v&&c.jsxs("div",{className:"p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-[10px] font-black uppercase flex items-center gap-3 animate-shake",children:[c.jsx("div",{className:"w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shrink-0"}),v]}),c.jsx("button",{type:"submit",disabled:I,className:`w-full text-white font-black py-5 rounded-2xl shadow-2xl transition-all transform active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed text-sm uppercase tracking-widest ${n==="owner"?"bg-secondary-900 hover:bg-black shadow-slate-900/30":"bg-primary-500 hover:bg-orange-600 shadow-primary-500/30"}`,children:I?c.jsx(Bs,{className:"animate-spin",size:20}):n==="owner"?"Enviar Solicitud de Socio":"Crear mi Cuenta de Pasajero"})]}),c.jsx("p",{className:"text-center text-[10px] text-slate-300 font-black uppercase tracking-[0.2em]",children:"Ruta-Go Portal © 2026"})]})]})]})}function La({label:t,value:e,onChange:n,type:r="text",placeholder:s,icon:i,required:o=!1}){return c.jsxs("div",{className:"space-y-1.5 group",children:[c.jsx("label",{className:"text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-primary-500",children:t}),c.jsxs("div",{className:"relative",children:[c.jsx("div",{className:"absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 transition-colors group-focus-within:text-primary-500",children:i}),c.jsx("input",{type:r,required:o,placeholder:s,className:"w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all placeholder:opacity-30 text-sm",value:e,onChange:l=>n(l.target.value)})]})]})}function bA({onBack:t}){return c.jsxs("div",{className:"min-h-screen bg-slate-50 font-sans selection:bg-primary-100",children:[c.jsx("nav",{className:"bg-white border-b border-slate-200 sticky top-0 z-50",children:c.jsxs("div",{className:"max-w-4xl mx-auto px-6 h-20 flex items-center gap-4",children:[c.jsx("button",{onClick:t,className:"p-2 text-slate-400 hover:text-primary-500 hover:bg-slate-50 rounded-full transition-all",children:c.jsx(zo,{size:24})}),c.jsx("h1",{className:"text-xl font-black text-secondary-900 tracking-tight",children:"Términos y Condiciones"})]})}),c.jsxs("main",{className:"max-w-4xl mx-auto px-6 py-16 space-y-12",children:[c.jsxs("section",{className:"bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 space-y-8 text-justify",children:[c.jsxs("div",{className:"flex items-center gap-4 border-b border-slate-100 pb-6",children:[c.jsx("div",{className:"w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-500 shadow-inner",children:c.jsx(bS,{size:28})}),c.jsxs("div",{children:[c.jsx("p",{className:"text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]",children:"Acuerdo Legal"}),c.jsx("h2",{className:"text-2xl font-black text-slate-800 tracking-tight",children:"Reglas de Operación Ruta-Go"})]})]}),c.jsx("p",{className:"text-slate-600 leading-relaxed italic",children:"Versión 1.4.0 Stable | Vigentes desde el 16 de julio de 2026. Al utilizar la plataforma (App o Web), usted acepta estos términos."}),c.jsxs("div",{className:"space-y-6",children:[c.jsx("h3",{className:"text-lg font-black text-secondary-900 flex items-center gap-2 italic",children:"1. Naturaleza del Servicio"}),c.jsxs("p",{className:"text-slate-600 leading-relaxed",children:["Ruta-Go es un intermediario tecnológico para la optimización del transporte intermunicipal. Actuamos como un motor de gestión de cupos y horarios.",c.jsx("strong",{className:"text-secondary-900",children:" Chop Code Solutions no es una empresa de transportes"})," ni posee flota vehicular propia."]}),c.jsx("h3",{className:"text-lg font-black text-secondary-900 flex items-center gap-2 italic",children:"2. Responsabilidad de Socios y Dueños"}),c.jsx("p",{className:"text-slate-600 leading-relaxed",children:"Los usuarios registrados con rol de Socio/Dueño de Flota se comprometen a utilizar los datos del portal administrativo con fines estrictamente operativos. La información sobre pasajeros, ingresos y conductores es confidencial y su mal uso será motivo de expulsión inmediata."}),c.jsx("h3",{className:"text-lg font-black text-secondary-900 flex items-center gap-2 italic",children:"3. Compromisos de Seguridad"}),c.jsx("p",{className:"text-slate-600 leading-relaxed",children:"Es responsabilidad del transportador garantizar que la información técnica del vehículo (placa y capacidad) sea veraz y se encuentre sincronizada con la base de datos de Ruta-Go para evitar sobreventa de cupos."}),c.jsxs("div",{className:"p-6 bg-red-50 rounded-2xl border border-red-100 flex items-start gap-4",children:[c.jsx(PS,{className:"text-red-500 shrink-0",size:24}),c.jsx("p",{className:"text-xs text-red-700 font-bold leading-relaxed uppercase",children:"Aviso Legal: Chop Code Solutions no asume responsabilidad por fallas mecánicas, accidentes, retrasos físicos o disputas de precios fuera de lo estipulado en la plataforma."})]}),c.jsx("h3",{className:"text-lg font-black text-secondary-900 flex items-center gap-2 italic",children:"4. Propiedad Intelectual"}),c.jsxs("p",{className:"text-slate-600 leading-relaxed",children:["Todo el código fuente, motores de reserva (Seat/Reservation Engine), logotipos y manuales técnicos son propiedad exclusiva de ",c.jsx("strong",{className:"text-primary-500",children:"Chop Code Solutions"}),"."]})]})]}),c.jsx("footer",{className:"text-center pb-10",children:c.jsx("p",{className:"text-[10px] text-slate-300 font-black uppercase tracking-[0.3em]",children:"ChopCode Solutions © 2026 • Nátaga - La Plata, Huila"})})]})]})}function RA({onBack:t}){return c.jsxs("div",{className:"min-h-screen bg-slate-50 font-sans selection:bg-primary-100",children:[c.jsx("nav",{className:"bg-white border-b border-slate-200 sticky top-0 z-50",children:c.jsxs("div",{className:"max-w-4xl mx-auto px-6 h-20 flex items-center gap-4",children:[c.jsx("button",{onClick:t,className:"p-2 text-slate-400 hover:text-primary-500 hover:bg-slate-50 rounded-full transition-all",children:c.jsx(zo,{size:24})}),c.jsx("h1",{className:"text-xl font-black text-secondary-900 tracking-tight",children:"Política de Privacidad"})]})}),c.jsxs("main",{className:"max-w-4xl mx-auto px-6 py-16 space-y-12 text-justify",children:[c.jsxs("section",{className:"bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 space-y-8",children:[c.jsxs("div",{className:"flex items-center gap-4 border-b border-slate-100 pb-6",children:[c.jsx("div",{className:"w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 shadow-inner",children:c.jsx(S_,{size:28})}),c.jsxs("div",{children:[c.jsx("p",{className:"text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]",children:"Protección de Datos"}),c.jsx("h2",{className:"text-2xl font-black text-slate-800 tracking-tight",children:"Habeas Data & Seguridad"})]})]}),c.jsxs("p",{className:"text-slate-600 leading-relaxed italic",children:["Estamos comprometidos con la seguridad de sus datos en cumplimiento de la ",c.jsx("strong",{className:"text-secondary-900",children:"Ley 1581 de 2012"})," de la República de Colombia."]}),c.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[c.jsx(nv,{icon:c.jsx(kS,{size:18}),title:"Operación",desc:"Recolectamos nombres, correos y placas para la gestión logística."}),c.jsx(nv,{icon:c.jsx(vc,{size:18}),title:"Contacto",desc:"El teléfono es esencial para la coordinación real entre chofer y pasajero."})]}),c.jsxs("div",{className:"space-y-6",children:[c.jsx("h3",{className:"text-lg font-black text-secondary-900 italic border-l-4 border-primary-500 pl-4",children:"3. Eliminación de Datos (Derecho al Olvido)"}),c.jsxs("div",{className:"bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4",children:[c.jsx("p",{className:"text-slate-600 text-sm leading-relaxed",children:"En cumplimiento con las políticas de Google Play, proporcionamos métodos claros para borrar su cuenta:"}),c.jsxs("ul",{className:"space-y-3",children:[c.jsxs("li",{className:"flex gap-3 text-xs font-bold text-slate-500",children:[c.jsx("span",{className:"w-5 h-5 bg-white rounded-full flex items-center justify-center text-primary-500 shadow-sm shrink-0",children:"1"}),"Dentro de la App: Perfil > Solicitar borrar cuenta."]}),c.jsxs("li",{className:"flex gap-3 text-xs font-bold text-slate-500",children:[c.jsx("span",{className:"w-5 h-5 bg-white rounded-full flex items-center justify-center text-primary-500 shadow-sm shrink-0",children:"2"}),"Vía Email: Enviando solicitud a ",c.jsx("strong",{className:"text-secondary-900",children:"dazace94@gmail.com"}),"."]})]}),c.jsxs("div",{className:"p-4 bg-amber-50 rounded-xl flex items-center gap-3",children:[c.jsx(yc,{className:"text-amber-500",size:18}),c.jsx("p",{className:"text-[10px] text-amber-700 font-black uppercase",children:"Periodo de gracia: 30 días antes del borrado definitivo."})]})]}),c.jsx("h3",{className:"text-lg font-black text-secondary-900 italic border-l-4 border-primary-500 pl-4",children:"4. Seguridad y Segregación"}),c.jsxs("p",{className:"text-slate-600 leading-relaxed",children:["Implementamos una arquitectura de ",c.jsx("strong",{className:"text-secondary-900",children:"Segregación Total de Roles"}),". Los datos residen en infraestructuras lógicas independientes cifradas mediante protocolos de Firebase de última generación."]})]})]}),c.jsx("footer",{className:"text-center pb-10",children:c.jsx("p",{className:"text-[10px] text-slate-300 font-black uppercase tracking-[0.3em]",children:"ChopCode Solutions © 2026 • Privacidad Blindada"})})]})]})}function nv({icon:t,title:e,desc:n}){return c.jsxs("div",{className:"p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-2",children:[c.jsx("div",{className:"text-primary-500",children:t}),c.jsx("h4",{className:"font-black text-secondary-900 text-xs uppercase tracking-wider",children:e}),c.jsx("p",{className:"text-xs text-slate-500 leading-relaxed",children:n})]})}function PA({onBack:t}){return c.jsxs("div",{className:"min-h-screen bg-slate-50 font-sans selection:bg-primary-100",children:[c.jsx("nav",{className:"bg-white border-b border-slate-200 sticky top-0 z-50",children:c.jsxs("div",{className:"max-w-4xl mx-auto px-6 h-20 flex items-center gap-4",children:[c.jsx("button",{onClick:t,className:"p-2 text-slate-400 hover:text-primary-500 hover:bg-slate-50 rounded-full transition-all",children:c.jsx(zo,{size:24})}),c.jsxs("div",{className:"flex items-center gap-2",children:[c.jsx("div",{className:"w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white font-black text-sm",children:"R"}),c.jsx("h1",{className:"text-xl font-black text-secondary-900 tracking-tight",children:"Manual de Usuario"})]})]})}),c.jsxs("main",{className:"max-w-4xl mx-auto px-6 py-12 space-y-16",children:[c.jsxs("header",{className:"text-center space-y-4",children:[c.jsx("div",{className:"w-20 h-20 bg-primary-500 rounded-3xl flex items-center justify-center text-white mx-auto shadow-2xl shadow-primary-500/20 transform -rotate-3",children:c.jsx(xS,{size:40})}),c.jsxs("div",{className:"space-y-2",children:[c.jsx("h2",{className:"text-4xl font-black text-slate-800 tracking-tight leading-none",children:"Centro de Aprendizaje"}),c.jsx("p",{className:"text-slate-500 font-medium text-lg italic",children:"Domina el ecosistema Ruta-Go en pocos pasos."})]})]}),c.jsxs("section",{className:"space-y-8",children:[c.jsxs("div",{className:"flex items-center gap-4 border-b border-slate-200 pb-4",children:[c.jsx("div",{className:"w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20",children:c.jsx(Ur,{size:28})}),c.jsxs("div",{children:[c.jsx("h3",{className:"text-2xl font-black text-slate-800 tracking-tight",children:"1. Guía para Pasajeros (App Móvil)"}),c.jsx("p",{className:"text-sm text-slate-400 font-bold uppercase tracking-widest",children:"Reserva y viaja sin estrés"})]})]}),c.jsxs("div",{className:"space-y-6",children:[c.jsx(Ma,{num:"1",title:"Registro e Identidad",icon:c.jsx(jS,{}),desc:"Descarga la App en la Play Store. Regístrate con tu correo o usa Google para entrar instantáneamente. Tu número de teléfono es vital para que el conductor te contacte si hay algún retraso."}),c.jsx(Ma,{num:"2",title:"Selección de Trayecto",icon:c.jsx(sr,{}),desc:"En el Dashboard principal, verás las pestañas 'Nátaga -> La Plata' y 'La Plata -> Nátaga'. Elige tu destino y verás la lista de horarios disponibles."}),c.jsx(Ma,{num:"3",title:"Elige tu Asiento",icon:c.jsx(IS,{}),desc:"Al tocar un horario, se abrirá el mapa del vehículo. Los asientos verdes están libres. Toca el que prefieras y se tornará naranja. ¡Tú tienes el control de tu comodidad!"}),c.jsx(Ma,{num:"4",title:"Confirmación y Tiquete",icon:c.jsx(OS,{}),desc:"Revisa el resumen de tu reserva y confirma. Se generará un tiquete digital con un código único. No necesitas imprimirlo; muéstralo desde tu celular al abordar."})]})]}),c.jsxs("section",{className:"space-y-8",children:[c.jsxs("div",{className:"flex items-center gap-4 border-b border-slate-200 pb-4",children:[c.jsx("div",{className:"w-14 h-14 bg-primary-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary-500/20",children:c.jsx(vr,{size:28})}),c.jsxs("div",{children:[c.jsx("h3",{className:"text-2xl font-black text-slate-800 tracking-tight",children:"2. Guía para Conductores (App Móvil)"}),c.jsx("p",{className:"text-sm text-slate-400 font-bold uppercase tracking-widest",children:"Optimización de ruta y ventas"})]})]}),c.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8",children:[c.jsx(rv,{title:"Gestión de Planilla",icon:c.jsx(gc,{className:"text-primary-500"}),points:["Visualiza tus horarios asignados en la pantalla de inicio.","Usa el botón (+) para registrar pasajeros que abordan en la calle (Venta Física).","El inventario se sincroniza en milisegundos para evitar sobreventa."]}),c.jsx(rv,{title:"Validación de Abordaje",icon:c.jsx(ES,{className:"text-green-500"}),points:["En 'Reservas Pendientes' verás a quienes reservaron por la App.","Toca 'Confirmar Abordaje' cuando el pasajero suba al bus.","Esto asegura que el cupo se marque como 'Finalizado' y se sume a tus ingresos."]})]})]}),c.jsxs("section",{className:"space-y-8",children:[c.jsxs("div",{className:"flex items-center gap-4 border-b border-slate-200 pb-4",children:[c.jsx("div",{className:"w-14 h-14 bg-secondary-900 rounded-2xl flex items-center justify-center text-white shadow-lg",children:c.jsx(wS,{size:28})}),c.jsxs("div",{children:[c.jsx("h3",{className:"text-2xl font-black text-slate-800 tracking-tight",children:"3. Guía para Socios (Portal Web)"}),c.jsx("p",{className:"text-sm text-slate-400 font-bold uppercase tracking-widest",children:"Inteligencia de negocios y activos"})]})]}),c.jsxs("div",{className:"bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl space-y-10",children:[c.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-12",children:[c.jsxs("div",{className:"space-y-4",children:[c.jsxs("div",{className:"flex items-center gap-3",children:[c.jsx(wo,{className:"text-primary-500"}),c.jsx("h4",{className:"font-black text-slate-800 uppercase tracking-tight",children:"Monitoreo Financiero"})]}),c.jsx("p",{className:"text-slate-500 leading-relaxed text-sm",children:"Desde tu Dashboard puedes ver el recaudo bruto de toda tu flota en tiempo real. El sistema suma automáticamente los tiquetes confirmados por tus conductores."})]}),c.jsxs("div",{className:"space-y-4",children:[c.jsxs("div",{className:"flex items-center gap-3",children:[c.jsx(_c,{className:"text-blue-500"}),c.jsx("h4",{className:"font-black text-slate-800 uppercase tracking-tight",children:"Vinculación de Personal"})]}),c.jsx("p",{className:"text-slate-500 leading-relaxed text-sm",children:"Para asignar un conductor a tu bus, usa el buscador por Email. Esto creará una relación atómica que permite al chofer operar el vehículo bajo tu supervisión."})]})]}),c.jsxs("div",{className:"p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-4",children:[c.jsx(AS,{className:"text-primary-500 shrink-0",size:24}),c.jsxs("p",{className:"text-xs text-slate-600 font-medium leading-relaxed",children:[c.jsx("strong",{className:"text-secondary-900",children:"Aislamiento Comercial:"})," Ningún otro socio puede ver tus ingresos o la ubicación de tus conductores. Tu información financiera está cifrada y blindada por tu ID de dueño."]})]})]})]}),c.jsxs("section",{className:"bg-red-50 p-8 md:p-10 rounded-[2.5rem] border border-red-100 space-y-6",children:[c.jsxs("div",{className:"flex items-center gap-4",children:[c.jsx("div",{className:"w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600",children:c.jsx(yc,{size:24})}),c.jsx("h3",{className:"text-xl font-black text-red-900",children:"Derecho al Olvido (Eliminar Cuenta)"})]}),c.jsxs("div",{className:"space-y-4",children:[c.jsx("p",{className:"text-red-700/80 text-sm leading-relaxed font-medium",children:"Si deseas retirar tus datos del ecosistema Ruta-Go, el proceso es autónomo e irreversible tras el plazo de gracia:"}),c.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[c.jsx("div",{className:"bg-white/50 p-4 rounded-2xl text-xs font-bold text-red-900 border border-red-200/50",children:"1. Ve a Perfil > Editar Perfil > Solicitar borrar cuenta."}),c.jsx("div",{className:"bg-white/50 p-4 rounded-2xl text-xs font-bold text-red-900 border border-red-200/50",children:"2. Tus datos entran en periodo de gracia por 30 días."})]})]})]}),c.jsxs("footer",{className:"text-center pb-10 space-y-6",children:[c.jsxs("div",{className:"flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 border-t border-slate-200 pt-10",children:[c.jsxs("div",{className:"flex items-center gap-2",children:[c.jsx($s,{size:16,className:"text-green-500"}),c.jsx("span",{className:"text-[10px] font-black text-slate-400 uppercase tracking-widest",children:"Sincronización Realtime"})]}),c.jsxs("div",{className:"flex items-center gap-2",children:[c.jsx($s,{size:16,className:"text-green-500"}),c.jsx("span",{className:"text-[10px] font-black text-slate-400 uppercase tracking-widest",children:"Habeas Data OK"})]})]}),c.jsx("p",{className:"text-[10px] text-slate-300 font-black uppercase tracking-[0.3em]",children:"ChopCode Solutions © 2026 • Huila, Colombia"})]})]})]})}function Ma({num:t,title:e,desc:n,icon:r}){return c.jsxs("div",{className:"flex gap-6 group",children:[c.jsxs("div",{className:"flex flex-col items-center",children:[c.jsx("div",{className:"w-10 h-10 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center font-black text-slate-400 group-hover:border-primary-500 group-hover:text-primary-500 transition-all shadow-sm",children:t}),c.jsx("div",{className:"flex-1 w-0.5 bg-slate-200 my-2 group-last:hidden"})]}),c.jsxs("div",{className:"pb-10 space-y-2",children:[c.jsxs("div",{className:"flex items-center gap-3",children:[c.jsx("div",{className:"text-slate-300 group-hover:text-primary-500 transition-colors",children:r}),c.jsx("h4",{className:"text-lg font-black text-slate-800 uppercase tracking-tight",children:e})]}),c.jsx("p",{className:"text-slate-500 leading-relaxed text-sm max-w-2xl",children:n})]})]})}function rv({title:t,icon:e,points:n}){return c.jsxs("div",{className:"bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 space-y-6",children:[c.jsxs("div",{className:"flex items-center gap-3 border-b border-slate-50 pb-4",children:[e,c.jsx("h4",{className:"font-black text-slate-800 uppercase tracking-tight",children:t})]}),c.jsx("ul",{className:"space-y-4",children:n.map((r,s)=>c.jsxs("li",{className:"flex gap-3 text-sm text-slate-500 leading-relaxed",children:[c.jsx("span",{className:"w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 shrink-0"}),r]},s))})]})}function AA({isOpen:t,onClose:e,activeTab:n,setActiveTab:r,role:s}){const i=()=>mI(Oo),l=[{id:"overview",label:"Vista General",icon:c.jsx(SS,{size:20}),roles:["ADMIN","OWNER"]},{id:"drivers",label:"Conductores",icon:c.jsx(vr,{size:20}),roles:["ADMIN","OWNER"]},{id:"users",label:"Usuarios",icon:c.jsx(Ur,{size:20}),roles:["ADMIN"]},{id:"schedules",label:"Horarios",icon:c.jsx(gc,{size:20}),roles:["ADMIN","OWNER"]}].filter(u=>u.roles.includes(s==null?void 0:s.type));return c.jsxs(c.Fragment,{children:[t&&c.jsx("div",{className:"fixed inset-0 bg-secondary-900/60 backdrop-blur-sm z-40 lg:hidden",onClick:e}),c.jsxs("aside",{className:`
        fixed inset-y-0 left-0 z-50 w-72 bg-secondary-900 text-white flex flex-col shadow-2xl transition-transform duration-300
        lg:relative lg:translate-x-0 lg:z-20
        ${t?"translate-x-0":"-translate-x-full"}
      `,children:[c.jsxs("div",{className:"p-8 flex items-center justify-between",children:[c.jsxs("div",{className:"flex items-center gap-3",children:[c.jsx("img",{src:"/assets/logo_icon.png",alt:"Ruta-Go",className:"w-10 h-10 object-contain drop-shadow-md"}),c.jsxs("div",{className:"flex flex-col leading-tight text-left",children:[c.jsx("span",{className:"text-lg font-bold tracking-tight",children:"Ruta-Go"}),c.jsx("span",{className:"text-[10px] text-primary-500 font-bold tracking-widest uppercase opacity-80",children:(s==null?void 0:s.type)==="ADMIN"?"Admin Maestro":(s==null?void 0:s.type)==="OWNER"?"Panel Dueños":(s==null?void 0:s.type)==="DRIVER"?"Panel Conductor":"Portal Pasajero"})]})]}),c.jsx("button",{onClick:e,className:"lg:hidden p-2 text-white/50 hover:text-white",children:c.jsx(vf,{size:20})})]}),c.jsx("nav",{className:"flex-1 px-4 py-4 space-y-1 overflow-y-auto text-left",children:l.map(u=>c.jsx(jA,{icon:u.icon,label:u.label,active:n===u.id,onClick:()=>{r(u.id),window.innerWidth<1024&&e()}},u.id))}),c.jsx("div",{className:"p-4 border-t border-white/5 space-y-1 text-left",children:c.jsxs("button",{onClick:i,className:"w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all font-bold text-xs uppercase tracking-widest",children:[c.jsx(NS,{size:18})," Salir del Portal"]})})]})]})}function jA({icon:t,label:e,active:n,onClick:r}){return c.jsxs("button",{onClick:r,className:`
        w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 group
        ${n?"bg-primary-500 text-white shadow-xl shadow-primary-500/20":"text-white/50 hover:bg-white/5 hover:text-white"}
      `,children:[c.jsx("span",{className:`${n?"scale-110":"group-hover:scale-110"} transition-transform`,children:t}),c.jsx("span",{className:"font-bold text-xs uppercase tracking-widest",children:e})]})}function OA({title:t,userEmail:e,onMenuClick:n,role:r}){const s=(r==null?void 0:r.type)==="ADMIN";r==null||r.type;const i=!(r!=null&&r.type);return c.jsxs("header",{className:"h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 shrink-0 z-30",children:[c.jsxs("div",{className:"flex items-center gap-4",children:[c.jsx("button",{onClick:n,className:"lg:hidden p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-all active:scale-90",children:c.jsx(CS,{size:24})}),c.jsx("h2",{className:"text-xl lg:text-2xl font-black text-slate-800 tracking-tight truncate max-w-[200px] md:max-w-none",children:i?"Verificando...":t})]}),c.jsxs("div",{className:"flex items-center gap-3",children:[c.jsxs("div",{className:"text-right hidden sm:block",children:[c.jsx("p",{className:"text-[11px] font-black text-slate-700 leading-none truncate max-w-[150px]",children:e}),c.jsx("p",{className:`text-[9px] font-bold uppercase tracking-tighter mt-1 ${i?"text-slate-300":s?"text-primary-500":(r==null?void 0:r.type)==="DRIVER"?"text-amber-500":(r==null?void 0:r.type)==="PASSENGER"?"text-green-500":"text-blue-500"}`,children:i?"Cargando Perfil":s?"Sesión Root":(r==null?void 0:r.type)==="OWNER"?"Sesión Dueño":(r==null?void 0:r.type)==="DRIVER"?"Sesión Conductor":"Sesión Pasajero"})]}),c.jsx("div",{className:`w-10 h-10 lg:w-11 lg:h-11 rounded-xl flex items-center justify-center text-white font-black shadow-lg text-sm transition-colors duration-500 ${i?"bg-slate-200 shadow-none":s?"bg-primary-500 shadow-primary-500/20":(r==null?void 0:r.type)==="DRIVER"?"bg-amber-500 shadow-amber-500/20":(r==null?void 0:r.type)==="PASSENGER"?"bg-green-600 shadow-green-500/20":"bg-blue-600 shadow-blue-500/20"}`,children:e==null?void 0:e.substring(0,2).toUpperCase()})]})]})}function Ai({label:t,value:e,icon:n,trend:r}){return c.jsxs("div",{className:"bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40",children:[c.jsx("div",{className:"mb-4 bg-slate-50 w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center scale-90 md:scale-100 origin-left",children:n}),c.jsx("p",{className:"text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-widest",children:t}),c.jsxs("div",{className:"flex items-baseline flex-wrap gap-2 mt-1",children:[c.jsx("h4",{className:"text-2xl md:text-3xl font-black text-slate-800 tracking-tighter",children:e}),c.jsx("span",{className:"text-[9px] md:text-[10px] font-bold text-green-500 uppercase",children:r})]})]})}function Jl({label:t,value:e,color:n,icon:r}){const s=Math.min(e/50*100,100);return c.jsxs("div",{className:"space-y-4",children:[c.jsxs("div",{className:"flex items-center justify-between",children:[c.jsxs("div",{className:"flex items-center gap-2",children:[c.jsx("div",{className:`p-2 rounded-lg ${n} text-white`,children:r}),c.jsx("span",{className:"font-bold text-slate-700",children:t})]}),c.jsxs("span",{className:"text-xl font-black text-slate-800",children:[e," ",c.jsx("small",{className:"text-[10px] text-slate-400 uppercase",children:"Pax"})]})]}),c.jsx("div",{className:"h-3 w-full bg-slate-100 rounded-full overflow-hidden",children:c.jsx("div",{className:`h-full ${n} transition-all duration-1000 ease-out shadow-lg`,style:{width:`${s}%`}})}),c.jsx("p",{className:"text-[10px] text-slate-400 font-bold uppercase tracking-tighter",children:"Ocupación estimada del día"})]})}function sv({driver:t,onEdit:e}){t.status;const n=t.status==="blocked",r=t.horariosAsignados&&t.horariosAsignados.length>0,s=t.status==="inactive"||!r&&!n;return c.jsxs("div",{className:"bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex gap-4 group relative",children:[c.jsx("div",{className:`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-colors ${n?"bg-red-50 text-red-400":"bg-slate-100 text-slate-400"}`,children:c.jsx(vr,{size:24})}),c.jsxs("div",{className:"flex-1 min-w-0",children:[c.jsxs("div",{className:"flex items-center justify-between mb-1 gap-2 pr-10",children:[c.jsx("h4",{className:"font-bold text-slate-800 text-sm truncate leading-tight",children:t.nombre}),c.jsx("span",{className:`flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase shrink-0 ${n?"bg-red-100 text-red-600":s?"bg-amber-100 text-amber-600":"bg-green-100 text-green-600"}`,children:n?"Bloqueado":s?"Descanso":"En Ruta"})]}),c.jsxs("div",{className:"flex flex-col gap-1 mt-2",children:[c.jsxs("div",{className:"flex items-center gap-2 text-slate-400 text-[11px] font-medium",children:[c.jsx(wo,{size:12,className:"text-slate-300"}),c.jsxs("span",{className:"text-slate-600 font-bold",children:["Placa: ",t.placaVehiculo||"N/A"]})]}),c.jsxs("div",{className:"p-2 bg-slate-50 rounded-lg border border-slate-100 mt-1",children:[c.jsx("p",{className:"text-[9px] text-slate-400 font-bold uppercase leading-none mb-1",children:"Turnos"}),c.jsx("p",{className:"text-[11px] text-slate-700 font-bold truncate",children:t.horariosAsignados?t.horariosAsignados.join(" | "):"Sin turnos hoy"})]})]})]}),c.jsx("button",{onClick:()=>e(t),className:"absolute top-4 right-4 p-2 text-slate-300 hover:text-primary-500 hover:bg-primary-50 rounded-full transition-all opacity-0 group-hover:opacity-100",title:"Editar Conductor",children:c.jsx(TS,{size:16})})]})}const tl={updateDriver:async(t,e)=>{const n=Me(Fe,`conductores/${t}`);try{return await L0(n,e),{success:!0}}catch(r){throw console.error("Error actualizando conductor:",r),r}},deleteDriver:async t=>{const e=Me(Fe,`conductores/${t}`);try{return await PR(e),{success:!0}}catch(n){throw console.error("Error eliminando conductor:",n),n}},getAllSchedules:async()=>{const t=Me(Fe,"horarios"),e=await cs(t);return e.exists()?Object.entries(e.val()).map(([n,r])=>({id:n,...r})):[]},registerDriverAndVehicle:async(t,e)=>{const n={};n[`conductores/${t.id}`]={...t,status:"active",fechaRegistro:Date.now()},n[`vehiculos/${e.placa}`]={...e,conductorId:t.id,estado:"activo"};try{return await L0(Me(Fe),n),{success:!0}}catch(r){throw console.error("Error en registro dual:",r),r}}};function DA({driver:t,onClose:e,onRefresh:n}){const[r,s]=H.useState(!1),[i,o]=H.useState([]),[l,u]=H.useState((t==null?void 0:t.horariosAsignados)||[]),[h,m]=H.useState({nombre:(t==null?void 0:t.nombre)||"",placaVehiculo:(t==null?void 0:t.placaVehiculo)||"",status:(t==null?void 0:t.status)||"active"});if(H.useEffect(()=>{let I=!0;return(async()=>{try{const O=await tl.getAllSchedules();I&&o(O)}catch(O){console.error("Error cargando horarios:",O)}})(),()=>{I=!1}},[]),!t)return null;const p=I=>{u(A=>A.includes(I)?A.filter(O=>O!==I):[...A,I])},v=async I=>{I.preventDefault(),s(!0);try{await tl.updateDriver(t.id,{...h,horariosAsignados:l}),n&&n(),e()}catch(A){alert("Error al actualizar: "+A.message)}finally{s(!1)}},T=async()=>{if(window.confirm(`¿Seguro que deseas ELIMINAR a ${t.nombre}? Esta acción no se puede deshacer.`)){s(!0);try{await tl.deleteDriver(t.id),n&&n(),e()}catch(I){alert("Error al eliminar: "+I.message)}finally{s(!1)}}};return c.jsx("div",{className:"fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm transition-all animate-in fade-in duration-200",children:c.jsxs("div",{className:"bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-white/20",children:[c.jsxs("div",{className:"p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50",children:[c.jsxs("div",{children:[c.jsx("h3",{className:"text-2xl font-black text-slate-800 tracking-tight",children:"Editar Conductor"}),c.jsxs("p",{className:"text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1",children:["ID Operativo: ",t.id.substring(0,8)]})]}),c.jsx("button",{onClick:e,className:"p-2 text-slate-400 hover:text-primary-500 hover:bg-slate-100 rounded-full transition-all",children:c.jsx(vf,{size:24})})]}),c.jsxs("form",{onSubmit:v,className:"flex-1 overflow-y-auto p-8 space-y-8",children:[c.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8",children:[c.jsxs("div",{className:"space-y-5",children:[c.jsxs("h4",{className:"text-[10px] font-black text-primary-500 uppercase tracking-widest flex items-center gap-2",children:[c.jsx("div",{className:"w-1 h-3 bg-primary-500 rounded-full"})," Perfil Básico"]}),c.jsx(iv,{label:"Nombre Legal",value:h.nombre,onChange:I=>m({...h,nombre:I})}),c.jsx(iv,{label:"Placa Asignada",value:h.placaVehiculo,onChange:I=>m({...h,placaVehiculo:I.toUpperCase()})}),c.jsxs("div",{className:"space-y-1.5",children:[c.jsx("label",{className:"text-[10px] font-bold text-slate-400 uppercase tracking-tight ml-1",children:"Estado"}),c.jsxs("select",{className:"w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 appearance-none transition-all",value:h.status,onChange:I=>m({...h,status:I.target.value}),children:[c.jsx("option",{value:"active",children:"🟢 En Ruta (Activo)"}),c.jsx("option",{value:"inactive",children:"🟡 Descanso (Inactivo)"}),c.jsx("option",{value:"blocked",children:"🔴 Bloqueado (Sin Acceso)"})]})]})]}),c.jsxs("div",{className:"space-y-5",children:[c.jsxs("h4",{className:"text-[10px] font-black text-primary-500 uppercase tracking-widest flex items-center gap-2",children:[c.jsx(x_,{size:12})," Escalafón de Hoy"]}),c.jsx("div",{className:"bg-slate-50 rounded-[2rem] p-5 border border-slate-100 max-h-[300px] overflow-y-auto space-y-2 custom-scrollbar text-center",children:i.length>0?i.map(I=>c.jsxs("label",{className:"flex items-center gap-3 p-3.5 bg-white rounded-2xl border border-slate-100 hover:border-primary-500/40 cursor-pointer transition-all group",children:[c.jsx("input",{type:"checkbox",className:"w-5 h-5 rounded-lg border-slate-300 text-primary-500 focus:ring-primary-500/20 transition-all cursor-pointer",checked:l.includes(I.id),onChange:()=>p(I.id)}),c.jsxs("div",{className:"flex flex-col text-left",children:[c.jsx("span",{className:"text-xs font-black text-slate-800 leading-none",children:I.hora}),c.jsx("span",{className:"text-[9px] font-bold text-slate-400 uppercase mt-1 truncate max-w-[150px]",children:I.ruta})]})]},I.id)):c.jsxs("div",{className:"py-10 flex flex-col items-center gap-2 opacity-30",children:[c.jsx(Bs,{className:"animate-spin",size:24}),c.jsx("p",{className:"text-[10px] font-bold uppercase italic",children:"Sincronizando horarios..."})]})})]})]}),c.jsxs("div",{className:"p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-3",children:[c.jsx(mf,{className:"text-amber-500 shrink-0 mt-0.5",size:16}),c.jsx("p",{className:"text-[10px] text-amber-700 font-bold leading-relaxed uppercase",children:"Nota: La modificación de turnos es una acción de nivel administrador. Los cambios se reflejarán en la App del conductor inmediatamente."})]})]}),c.jsxs("div",{className:"p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between",children:[c.jsxs("button",{type:"button",disabled:r,onClick:T,className:"flex items-center gap-2 px-6 py-3.5 rounded-2xl text-red-500 hover:bg-red-50 transition-all font-black text-[10px] uppercase disabled:opacity-50 group",children:[c.jsx(yc,{size:16,className:"group-hover:scale-110 transition-transform"})," Eliminar"]}),c.jsxs("div",{className:"flex items-center gap-4",children:[c.jsx("button",{type:"button",onClick:e,className:"px-6 py-3.5 font-black text-[10px] text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors",children:"Cancelar"}),c.jsx("button",{onClick:v,disabled:r,className:"flex items-center gap-3 px-10 py-4 bg-primary-500 hover:bg-orange-600 text-white rounded-2xl shadow-xl shadow-primary-500/30 transition-all transform active:scale-95 font-black text-[10px] uppercase disabled:opacity-70",children:r?c.jsx(Bs,{className:"animate-spin",size:18}):c.jsxs(c.Fragment,{children:[c.jsx(k_,{size:18})," Guardar Cambios"]})})]})]})]})})}function iv({label:t,value:e,onChange:n}){return c.jsxs("div",{className:"space-y-1.5",children:[c.jsx("label",{className:"text-[10px] font-bold text-slate-400 uppercase tracking-tight ml-1",children:t}),c.jsx("input",{type:"text",required:!0,className:"w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all placeholder:opacity-30",value:e,onChange:r=>n(r.target.value)})]})}function LA({onClose:t,users:e,currentUser:n,role:r}){const[s,i]=H.useState(!1),[o,l]=H.useState(null),[u,h]=H.useState({email:"",placa:"",modelo:"",ano:new Date().getFullYear().toString(),capacidad:13,ownerId:(r==null?void 0:r.type)==="OWNER"?n.uid:""});H.useEffect(()=>{if(u.email.includes("@")){const p=e.find(v=>v.email.toLowerCase()===u.email.toLowerCase());l(p||null)}else l(null)},[u.email,e]);const m=async p=>{if(p.preventDefault(),!o){alert("⚠️ Error: El conductor debe registrarse primero en la App móvil con este correo.");return}i(!0);try{const v={id:o.id,nombre:o.nombre,email:o.email,telefono:o.telefono||"N/A",placaVehiculo:u.placa,vehiculoId:u.placa,horariosAsignados:[]},T={id:u.placa,placa:u.placa,modelo:u.modelo,ano:u.ano,capacidad:parseInt(u.capacidad),ownerId:u.ownerId,driverId:o.id};await tl.registerDriverAndVehicle(v,T),alert("✅ Conductor vinculado y vehículo registrado exitosamente."),t()}catch(v){alert("❌ Error: "+v.message)}finally{i(!1)}};return c.jsx("div",{className:"fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200",children:c.jsxs("div",{className:"bg-white w-full max-w-3xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]",children:[c.jsxs("div",{className:"p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50",children:[c.jsxs("div",{className:"flex items-center gap-4",children:[c.jsx("div",{className:"w-12 h-12 bg-primary-500 rounded-2xl flex items-center justify-center text-white shadow-lg",children:c.jsx(_c,{size:24})}),c.jsxs("div",{children:[c.jsx("h3",{className:"text-2xl font-black text-slate-800 tracking-tight",children:"Vincular Operador"}),c.jsx("p",{className:"text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1",children:"Gestión de Flota por Email"})]})]}),c.jsx("button",{onClick:t,className:"p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-all",children:c.jsx(vf,{size:24})})]}),c.jsx("form",{onSubmit:m,className:"flex-1 overflow-y-auto p-8 space-y-8",children:c.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-10",children:[c.jsxs("div",{className:"space-y-6",children:[c.jsxs("h4",{className:"text-[11px] font-black text-primary-500 uppercase tracking-widest flex items-center gap-2",children:[c.jsx("div",{className:"w-1.5 h-4 bg-primary-500 rounded-full"})," 1. Buscar Conductor"]}),c.jsxs("div",{className:"space-y-2",children:[c.jsx(ls,{label:"Correo Electrónico",placeholder:"conductor@gmail.com",type:"email",value:u.email,onChange:p=>h({...u,email:p}),required:!0}),c.jsxs("div",{className:`p-4 rounded-2xl border transition-all flex items-center gap-3 ${o?"bg-green-50 border-green-100 text-green-700":u.email.includes("@")?"bg-red-50 border-red-100 text-red-600":"bg-slate-50 border-slate-100 text-slate-400"}`,children:[o?c.jsx($s,{size:18}):u.email.includes("@")?c.jsx(mf,{size:18}):c.jsx(RS,{size:18}),c.jsxs("div",{className:"flex-1",children:[c.jsx("p",{className:"text-[10px] font-black uppercase tracking-tight",children:o?"Usuario Encontrado":u.email.includes("@")?"Usuario no registrado":"Esperando correo..."}),c.jsx("p",{className:"text-xs font-bold leading-none mt-1",children:o?o.nombre:u.email.includes("@")?"Dile que se registre en la App":"Escribe el email corporativo"})]})]})]}),o&&c.jsx("div",{className:"space-y-4 animate-in slide-in-from-top-2",children:c.jsxs("div",{className:"p-4 bg-slate-50 rounded-2xl border border-slate-100",children:[c.jsx("p",{className:"text-[10px] text-slate-400 font-black uppercase mb-1",children:"Teléfono Registrado"}),c.jsx("p",{className:"text-sm font-bold text-slate-700",children:o.telefono||"No proporcionado"})]})})]}),c.jsxs("div",{className:"space-y-6",children:[c.jsxs("h4",{className:"text-[11px] font-black text-secondary-900 uppercase tracking-widest flex items-center gap-2",children:[c.jsx("div",{className:"w-1.5 h-4 bg-secondary-900 rounded-full"})," 2. Datos del Bus"]}),c.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[c.jsx(ls,{label:"Placa",placeholder:"ABC-123",value:u.placa,onChange:p=>h({...u,placa:p.toUpperCase()}),required:!0}),c.jsx(ls,{label:"Año",type:"number",value:u.ano,onChange:p=>h({...u,ano:p}),required:!0})]}),c.jsx(ls,{label:"Modelo",placeholder:"Ej: Nissan Frontier",value:u.modelo,onChange:p=>h({...u,modelo:p}),required:!0}),c.jsx(ls,{label:"Capacidad",type:"number",value:u.capacidad,onChange:p=>h({...u,capacidad:p}),required:!0}),(r==null?void 0:r.type)==="ADMIN"&&c.jsx(ls,{label:"ID del Dueño (Opcional)",placeholder:"UID del dueño",value:u.ownerId,onChange:p=>h({...u,ownerId:p})})]})]})}),c.jsxs("div",{className:"p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-4",children:[c.jsx("button",{type:"button",onClick:t,className:"px-8 py-4 font-black text-[10px] text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-all",children:"Cancelar"}),c.jsx("button",{onClick:m,disabled:s||!o,className:"flex items-center gap-3 px-12 py-4 bg-secondary-900 hover:bg-black text-white rounded-2xl shadow-xl transition-all transform active:scale-95 font-black text-[10px] uppercase disabled:opacity-30 disabled:cursor-not-allowed",children:s?c.jsx(Bs,{className:"animate-spin",size:18}):c.jsxs(c.Fragment,{children:[c.jsx(k_,{size:18})," Vincular Conductor"]})})]})]})})}function ls({label:t,value:e,onChange:n,type:r="text",placeholder:s,required:i=!1}){return c.jsxs("div",{className:"space-y-1.5",children:[c.jsx("label",{className:"text-[10px] font-black text-slate-400 uppercase tracking-tight ml-1",children:t}),c.jsx("input",{type:r,required:i,placeholder:s,className:"w-full px-4 py-3.5 bg-white border border-slate-200 rounded-2xl font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all placeholder:opacity-40 text-sm",value:e,onChange:o=>n(o.target.value)})]})}function ov({user:t}){if(!t)return null;const e=t.solicitudBorrado===!0;return c.jsxs("div",{className:`bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex gap-4 group ${e?"opacity-60 grayscale-[0.5]":""}`,children:[c.jsx("div",{className:`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${e?"bg-red-50 text-red-400":"bg-blue-50 text-blue-500"}`,children:c.jsx(gf,{size:22})}),c.jsxs("div",{className:"flex-1 min-w-0",children:[c.jsxs("div",{className:"flex items-center justify-between mb-1 gap-2",children:[c.jsx("h4",{className:"font-bold text-slate-800 text-sm truncate leading-tight",children:t.nombre||t.name||"Usuario sin nombre"}),e?c.jsxs("span",{className:"flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-[9px] font-black uppercase shrink-0",children:[c.jsx(yc,{size:10})," Borrado"]}):c.jsx("span",{className:"flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 text-[9px] font-black uppercase shrink-0",children:"Activo"})]}),c.jsxs("div",{className:"flex flex-col gap-1 mt-1",children:[c.jsxs("div",{className:"flex items-center gap-2 text-slate-500 text-[11px]",children:[c.jsx(vc,{size:12,className:"text-slate-300"}),c.jsx("span",{className:"truncate",children:t.email||"Sin correo"})]}),c.jsxs("div",{className:"flex items-center justify-between mt-1",children:[c.jsxs("div",{className:"flex items-center gap-2 text-slate-500 text-[11px]",children:[c.jsx(E_,{size:12,className:"text-slate-300"}),c.jsx("span",{children:t.telefono||t.phone||"N/A"})]}),c.jsxs("div",{className:"flex items-center gap-1 px-2 py-0.5 bg-amber-50 rounded-lg border border-amber-100",children:[c.jsx(_S,{size:10,className:"text-amber-500"}),c.jsxs("span",{className:"text-[10px] font-bold text-amber-700",children:[t.puntosGo||0," pts"]})]})]})]})]})]})}function yp({schedules:t,drivers:e,role:n}){const r=s=>{if(!s)return{name:"Sin asignar",isExternal:!1};const i=e.find(l=>l.id===s);if((n==null?void 0:n.type)==="ADMIN")return{name:i?i.nombre:"Cargando...",isExternal:!1};const o=e.some(l=>l.id===s);return{name:i?i.nombre:"Conductor Externo",isExternal:!o}};return c.jsx("div",{className:"bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden",children:c.jsx("div",{className:"overflow-x-auto scrollbar-hide",children:c.jsxs("table",{className:"w-full text-left border-collapse min-w-[600px]",children:[c.jsx("thead",{children:c.jsxs("tr",{className:"bg-slate-50 border-b border-slate-100",children:[c.jsx("th",{className:"px-4 md:px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest",children:"Hora & Ruta"}),c.jsx("th",{className:"px-4 md:px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest",children:"Conductor Asignado"}),c.jsx("th",{className:"px-4 md:px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center",children:"Disponibilidad"}),c.jsx("th",{className:"px-4 md:px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center",children:"Estado"})]})}),c.jsx("tbody",{className:"divide-y divide-slate-50",children:t.map(s=>{const i=r(s.conductorId),o=s.totalAsientos||0,l=s.asientosDisponibles||0,u=o-l,h=o>0?Math.round(u/o*100):0,m=l===0&&o>0,p=!s.conductorId;return c.jsxs("tr",{className:"hover:bg-slate-50/50 transition-colors group",children:[c.jsx("td",{className:"px-4 md:px-6 py-4 md:py-5",children:c.jsxs("div",{className:"flex items-center gap-3 md:gap-4",children:[c.jsxs("div",{className:"w-10 h-10 md:w-12 md:h-12 bg-primary-50 rounded-xl md:rounded-2xl flex flex-col items-center justify-center text-primary-600 shrink-0",children:[c.jsx(x_,{size:14,className:"md:size-4"}),c.jsx("span",{className:"text-[8px] md:text-[10px] font-black mt-0.5 uppercase tracking-tighter leading-none",children:s.hora.split(" ")[1]})]}),c.jsxs("div",{className:"min-w-0",children:[c.jsx("p",{className:"text-xs md:text-sm font-black text-slate-800 leading-tight mb-0.5",children:s.hora.split(" ")[0]}),c.jsxs("div",{className:"flex items-center gap-1 text-slate-400",children:[c.jsx(sr,{size:10,className:"shrink-0"}),c.jsx("span",{className:"text-[9px] md:text-[10px] font-bold uppercase tracking-tight truncate",children:s.ruta})]})]})]})}),c.jsx("td",{className:"px-4 md:px-6 py-4 md:py-5",children:c.jsxs("div",{className:"flex items-center gap-2 md:gap-3",children:[c.jsx("div",{className:`p-1.5 md:p-2 rounded-lg md:rounded-xl shrink-0 ${p?"bg-red-50 text-red-400":i.isExternal?"bg-slate-50 text-slate-300":"bg-slate-100 text-slate-500"}`,children:c.jsx(gf,{size:14,className:"md:size-4"})}),c.jsx("span",{className:`text-xs md:text-sm font-bold truncate max-w-[120px] md:max-w-none ${p?"text-red-500 italic":i.isExternal?"text-slate-400 italic font-medium":"text-slate-700"}`,children:i.name})]})}),c.jsx("td",{className:"px-4 md:px-6 py-4 md:py-5",children:c.jsx("div",{className:"flex justify-center",children:(n==null?void 0:n.type)!=="ADMIN"&&i.isExternal?c.jsxs("div",{className:"flex items-center gap-2 text-[9px] md:text-[10px] font-bold text-slate-300 uppercase tracking-widest italic leading-none",children:[c.jsx("div",{className:"w-6 md:w-8 h-1 bg-slate-100 rounded-full"}),"Privado"]}):c.jsxs("div",{className:"space-y-1.5 w-full max-w-[100px] md:max-w-[140px]",children:[c.jsxs("div",{className:"flex items-center justify-between text-[8px] md:text-[10px] font-black uppercase tracking-tighter",children:[c.jsx("span",{className:m?"text-red-500":"text-slate-400",children:m?"Agotado":`${l} Libres`}),c.jsxs("span",{className:"text-slate-800",children:[h,"%"]})]}),c.jsx("div",{className:"h-1 md:h-1.5 w-full bg-slate-100 rounded-full overflow-hidden",children:c.jsx("div",{className:`h-full transition-all duration-1000 ${m?"bg-red-500":"bg-primary-500 shadow-[0_0_8px_rgba(255,109,0,0.3)]"}`,style:{width:`${h}%`}})})]})})}),c.jsx("td",{className:"px-4 md:px-6 py-4 md:py-5 text-center",children:c.jsx("div",{className:"inline-flex items-center gap-1.5 px-2 md:px-3 py-1 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest shrink-0",children:p?c.jsxs("span",{className:"bg-red-100 text-red-600 px-2 md:px-3 py-1 rounded-full flex items-center gap-1 leading-none",children:[c.jsx(mf,{size:10})," Pendiente"]}):m?c.jsx("span",{className:"bg-slate-800 text-white px-2 md:px-3 py-1 rounded-full flex items-center gap-1 shadow-lg shadow-slate-800/20 leading-none",children:"Completado"}):c.jsxs("span",{className:"bg-green-100 text-green-600 px-2 md:px-3 py-1 rounded-full flex items-center gap-1 leading-none",children:[c.jsx($s,{size:10})," En Venta"]})})})]},s.id)})})]})})})}const MA=t=>{const[e,n]=H.useState({type:null,ownedPlates:[]}),[r,s]=H.useState({totalUsers:0,activeDrivers:0,totalVehicles:0,totalOwners:0,todayReservations:0,totalRevenue:0,loading:!0}),[i,o]=H.useState([]),[l,u]=H.useState([]),[h,m]=H.useState([]),[p,v]=H.useState({toLaPlata:0,toNataga:0});return H.useEffect(()=>{if(!t)return;let T=!0;const I=[],A=async()=>{try{const S=await cs(Me(Fe,`admins/${t.uid}`));if(S.exists()&&S.val()===!0){T&&(n({type:"ADMIN",ownedPlates:[]}),O("ADMIN",[]));return}if((await cs(Me(Fe,`dueños/${t.uid}`))).exists()){const L=await cs(Me(Fe,"vehiculos"));let M=[];L.exists()&&(M=Object.entries(L.val()).filter(([x,y])=>y.ownerId===t.uid).map(([x,y])=>x)),T&&(n({type:"OWNER",ownedPlates:M}),O("OWNER",M));return}const C=await cs(Me(Fe,`conductores/${t.uid}`));if(C.exists()){if(T){const L=C.val(),M=L.placaVehiculo||L.vehiculoId;n({type:"DRIVER",ownedPlates:M?[M]:[]}),O("DRIVER",M?[M]:[])}return}(await cs(Me(Fe,`usuarios/${t.uid}`))).exists()?T&&(n({type:"PASSENGER",ownedPlates:[]}),O("PASSENGER",[])):T&&(n({type:null,ownedPlates:[]}),s(L=>({...L,loading:!1})))}catch(S){console.error("Error resolviendo rol:",S),T&&s(E=>({...E,loading:!1}))}},O=(S,E)=>{const C=new Date,j=C.getTimezoneOffset()*6e4,L=new Date(C.getTime()-j).toISOString().split("T")[0];if(S==="ADMIN"){const _=as(Me(Fe,"usuarios"),N=>{if(N.exists()){const b=Object.entries(N.val()).map(([w,J])=>({id:w,...J}));u(b),s(w=>({...w,totalUsers:b.filter(J=>!J.solicitudBorrado).length}))}});I.push(_);const k=as(Me(Fe,"dueños"),N=>{if(N.exists()){const b=Object.keys(N.val()).length;s(w=>({...w,totalOwners:b}))}});I.push(k)}const M=as(Me(Fe,"vehiculos"),_=>{if(_.exists()){const k=Object.entries(_.val()).map(([b,w])=>({id:b,...w})),N=S==="ADMIN"?k:k.filter(b=>b.ownerId===t.uid);s(b=>({...b,totalVehicles:N.length})),as(Me(Fe,"conductores"),b=>{if(b.exists()){const w=Object.entries(b.val()).map(([Be,Qt])=>({id:Be,...Qt})),J=S==="ADMIN"?w:w.filter(Be=>E.includes(Be.placaVehiculo||Be.vehiculoId));o(J),s(Be=>({...Be,activeDrivers:J.filter(Qt=>Qt.status==="active").length}))}},{onlyOnce:!0})}});I.push(M);const x=as(Me(Fe,"reservas"),_=>{let k=0,N=0,b=0,w=0;_.exists()?(Object.values(_.val()).forEach(J=>{const Be=J.vehiculoId||J.vehiculoPlaca;if(S==="ADMIN"||E.includes(Be)){const $=(J.estadoReserva||J.reservationStatus||"").toLowerCase();($==="confirmada"||$==="completada")&&(w+=Number(J.precio||J.price||0))}const vt=J.fechaViaje||J.travelDate||J.reservationDate||J.fechaReserva;if((typeof vt=="number"?new Date(vt-j).toISOString().split("T")[0]:vt)===L){k++;const $=(J.destino||J.destination||"").toLowerCase();$.includes("la plata")?N++:($.includes("nátaga")||$.includes("nataga"))&&b++}}),T&&(s(J=>({...J,todayReservations:k,totalRevenue:w,loading:!1})),v({toLaPlata:N,toNataga:b}))):T&&s(J=>({...J,loading:!1}))});I.push(x);const y=as(Me(Fe,"horarios"),_=>{if(_.exists()){const k=Object.entries(_.val()).map(([N,b])=>({id:N,...b}));m(k)}});I.push(y)};return A(),()=>{T=!1,I.forEach(S=>S())}},[t]),{role:e,stats:r,drivers:i,users:l,schedules:h,routeStats:p}};function FA(){const[t,e]=H.useState(null),[n,r]=H.useState("landing"),[s,i]=H.useState("owner"),[o,l]=H.useState("overview"),[u,h]=H.useState(!0),[m,p]=H.useState(!1),[v,T]=H.useState(null),[I,A]=H.useState(!1);H.useEffect(()=>{const M=pI(Oo,x=>{e(x),h(!1)});return()=>M()},[]);const{role:O,stats:S,drivers:E,users:C,schedules:j,routeStats:L}=MA(t);return u?c.jsxs("div",{className:"h-screen bg-secondary-900 flex flex-col items-center justify-center gap-6",children:[c.jsxs("div",{className:"relative",children:[c.jsx("img",{src:"/assets/logo_icon.png",alt:"Ruta-Go",className:"w-16 h-16 object-contain animate-pulse"}),c.jsx(Bs,{className:"text-primary-500 animate-spin absolute -bottom-2 -right-2",size:24})]}),c.jsx("p",{className:"text-white/40 text-[10px] font-black uppercase tracking-widest animate-pulse",children:"Autenticando..."})]}):t?!S.loading&&!(O!=null&&O.type)?c.jsxs("div",{className:"h-screen bg-secondary-900 flex flex-col items-center justify-center p-10 text-center gap-6",children:[c.jsx("div",{className:"w-20 h-20 bg-red-500/20 rounded-3xl flex items-center justify-center text-red-500",children:c.jsx(mc,{size:40})}),c.jsxs("div",{children:[c.jsx("h2",{className:"text-white text-2xl font-black tracking-tight",children:"Acceso Denegado"}),c.jsx("p",{className:"text-white/40 text-sm mt-2 max-w-xs mx-auto",children:"Tu cuenta no tiene permisos administrativos para este portal."})]}),c.jsx("button",{onClick:()=>Oo.signOut(),className:"px-8 py-3 bg-white text-secondary-900 font-bold rounded-xl shadow-xl active:scale-95 transition-all",children:"Cerrar Sesión"})]}):c.jsxs("div",{className:"flex h-screen bg-slate-50 text-slate-900 antialiased font-sans overflow-hidden",children:[c.jsx(AA,{isOpen:m,onClose:()=>p(!1),activeTab:o,setActiveTab:l,role:O}),c.jsxs("main",{className:"flex-1 flex flex-col min-w-0 overflow-hidden relative",children:[c.jsx(OA,{title:o==="overview"?O!=null&&O.type?O.type==="ADMIN"?"Panel Maestro":O.type==="OWNER"?"Dashboard Dueño":"Centro de Reservas":"Cargando...":o==="drivers"?"Gestión de Conductores":o==="users"?"Base de Clientes (Pasajeros)":o==="schedules"?"Planilla de Despachos":"Dashboard",userEmail:t.email,onMenuClick:()=>p(!0),role:O}),c.jsx("div",{className:"flex-1 overflow-y-auto p-4 lg:p-10 bg-slate-50/50",children:(O==null?void 0:O.type)==="PASSENGER"?c.jsx(BA,{routeStats:L,schedules:j,drivers:E,role:O}):(O==null?void 0:O.type)==="DRIVER"?c.jsx(HA,{routeStats:L,schedules:j,drivers:E,role:O}):o==="overview"?c.jsx(UA,{stats:S,routeStats:L,role:O}):o==="drivers"?c.jsx($A,{drivers:E,onEditDriver:M=>T(M),onAddDriver:()=>A(!0)}):o==="users"?c.jsx(VA,{users:C}):o==="schedules"?c.jsx(zA,{schedules:j,drivers:E,role:O}):c.jsx("div",{className:"flex items-center justify-center h-full text-slate-400 font-medium italic",children:"Módulo en desarrollo (Fase 2)..."})})]}),v&&c.jsx(DA,{driver:v,onClose:()=>T(null),onRefresh:()=>{}}),I&&c.jsx(LA,{onClose:()=>A(!1),users:C,currentUser:t,role:O})]}):n==="login"?c.jsx(IA,{onBack:()=>r("landing"),onShowRegister:()=>{i("owner"),r("register")}}):n==="register"?c.jsx(TA,{onBack:()=>r("landing"),initialMode:s}):n==="terms"?c.jsx(bA,{onBack:()=>r("landing")}):n==="privacy"?c.jsx(RA,{onBack:()=>r("landing")}):n==="manual"?c.jsx(PA,{onBack:()=>r("landing")}):c.jsx(CA,{onLogin:()=>r("login"),onRegisterOwner:()=>{i("owner"),r("register")},onRegisterPassenger:()=>{i("passenger"),r("register")},onViewTerms:()=>r("terms"),onViewPrivacy:()=>r("privacy"),onViewManual:()=>r("manual")})}function UA({stats:t,routeStats:e,role:n}){const r=i=>new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0}).format(i),s=(n==null?void 0:n.type)==="ADMIN";return c.jsxs(c.Fragment,{children:[c.jsxs("div",{className:`grid grid-cols-1 md:grid-cols-2 ${s?"lg:grid-cols-5":"lg:grid-cols-3"} gap-8 mb-10`,children:[s&&c.jsxs(c.Fragment,{children:[c.jsx(Ai,{label:"Usuarios Activos",value:t.totalUsers,icon:c.jsx(Ur,{className:"text-blue-500"}),trend:"Habeas Data OK"}),c.jsx(Ai,{label:"Dueños de Flota",value:t.totalOwners,icon:c.jsx(Ur,{className:"text-amber-500"}),trend:"Socios Activos"})]}),c.jsx(Ai,{label:"Conductores en Turno",value:t.activeDrivers,icon:c.jsx(vr,{className:"text-green-500"}),trend:"Estado: Active"}),c.jsx(Ai,{label:"Reservas Hoy",value:t.todayReservations,icon:c.jsx(gc,{className:"text-purple-500"}),trend:"Fecha Actual"}),c.jsx(Ai,{label:"Ingresos Generados",value:r(t.totalRevenue),icon:c.jsx(mc,{className:"text-primary-500"}),trend:s?"Holding Total":"Tus Vehículos"})]}),c.jsxs("div",{className:"bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50",children:[c.jsxs("div",{className:"flex items-center justify-between mb-8",children:[c.jsxs("div",{children:[c.jsx("h3",{className:"font-bold text-xl text-slate-800 tracking-tight",children:"Monitor de Demanda por Ruta"}),c.jsx("p",{className:"text-xs text-slate-400 font-medium uppercase mt-1",children:"Tráfico de pasajeros en tiempo real"})]}),c.jsx("div",{className:"px-3 py-1 bg-primary-50 rounded-full text-[10px] font-black text-primary-600 uppercase",children:"Live Feedback"})]}),c.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-10",children:[c.jsx(Jl,{label:"Nátaga → La Plata",value:e.toLaPlata,color:"bg-orange-500",icon:c.jsx(sr,{size:16})}),c.jsx(Jl,{label:"La Plata → Nátaga",value:e.toNataga,color:"bg-secondary-900",icon:c.jsx(sr,{size:16})})]})]})]})}function zA({schedules:t,drivers:e,role:n}){const[r,s]=H.useState("toLaPlata"),i=t.filter(u=>u.ruta.toLowerCase().includes("nátaga -> la plata")||u.ruta.toLowerCase().includes("nátaga")&&u.ruta.toLowerCase().includes("plata")&&u.ruta.toLowerCase().indexOf("nátaga")<u.ruta.toLowerCase().indexOf("plata")),o=t.filter(u=>u.ruta.toLowerCase().includes("la plata -> nátaga")||u.ruta.toLowerCase().includes("plata")&&u.ruta.toLowerCase().includes("nátaga")&&u.ruta.toLowerCase().indexOf("plata")<u.ruta.toLowerCase().indexOf("nátaga")),l=r==="toLaPlata"?i:o;return c.jsxs("div",{className:"space-y-6",children:[c.jsxs("div",{className:"flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4",children:[c.jsxs("div",{className:"flex items-center gap-3",children:[c.jsx("div",{className:"w-2 h-6 bg-primary-500 rounded-full"}),c.jsx("h3",{className:"text-xl font-black text-slate-800 uppercase tracking-tight",children:"Planilla de Despachos"})]}),c.jsxs("div",{className:"flex bg-slate-100 p-1 rounded-xl shrink-0",children:[c.jsx("button",{onClick:()=>s("toLaPlata"),className:`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${r==="toLaPlata"?"bg-white text-primary-500 shadow-sm":"text-slate-400 hover:text-slate-600"}`,children:"Nátaga → La Plata"}),c.jsx("button",{onClick:()=>s("toNataga"),className:`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${r==="toNataga"?"bg-white text-secondary-900 shadow-sm":"text-slate-400 hover:text-slate-600"}`,children:"La Plata → Nátaga"})]})]}),c.jsxs("div",{className:"flex items-center gap-4 mb-2",children:[c.jsxs("span",{className:"px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[10px] font-black uppercase",children:[l.length," Salidas Programadas"]}),c.jsx("span",{className:`px-3 py-1 rounded-full text-[10px] font-black uppercase ${r==="toLaPlata"?"bg-orange-50 text-orange-600":"bg-secondary-50 text-secondary-900"}`,children:r==="toLaPlata"?"Sentido Occidente":"Sentido Oriente"})]}),c.jsx(yp,{schedules:l,drivers:e,role:n}),c.jsxs("div",{className:"p-6 bg-blue-50 rounded-3xl border border-blue-100 flex items-center gap-4 mt-8",children:[c.jsx("div",{className:"w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 shrink-0",children:c.jsx(mc,{size:24})}),c.jsxs("div",{children:[c.jsx("h4",{className:"text-sm font-black text-blue-900 uppercase",children:"Estado de la Operación"}),c.jsxs("p",{className:"text-xs text-blue-700 font-medium",children:["Mostrando planilla en tiempo real para la ruta:",c.jsx("strong",{className:"ml-1 uppercase",children:r==="toLaPlata"?"Nátaga a La Plata":"La Plata a Nátaga"}),"."]})]})]})]})}function VA({users:t=[]}){const e=(t||[]).filter(r=>!r.solicitudBorrado),n=(t||[]).filter(r=>r.solicitudBorrado===!0);return c.jsxs("div",{className:"space-y-12",children:[c.jsxs("div",{className:"space-y-6",children:[c.jsxs("div",{className:"flex items-center gap-3 border-b border-slate-200 pb-4",children:[c.jsx("div",{className:"w-2 h-6 bg-blue-500 rounded-full"}),c.jsx("h3",{className:"text-lg font-black text-slate-800 uppercase tracking-tight",children:"Pasajeros Activos"}),c.jsxs("span",{className:"px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-[10px] font-bold",children:[e.length," TOTAL"]})]}),c.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6",children:e.length>0?e.map(r=>c.jsx(ov,{user:r},r.id)):c.jsx("p",{className:"col-span-full text-center py-10 text-slate-400 italic",children:"No hay usuarios registrados aún"})})]}),n.length>0&&c.jsxs("div",{className:"space-y-6",children:[c.jsxs("div",{className:"flex items-center gap-3 border-b border-slate-200 pb-4",children:[c.jsx("div",{className:"w-2 h-6 bg-red-500 rounded-full"}),c.jsx("h3",{className:"text-lg font-black text-slate-800 uppercase tracking-tight text-red-600",children:"Solicitudes de Borrado"}),c.jsxs("span",{className:"px-3 py-1 bg-red-100 text-red-600 rounded-full text-[10px] font-bold",children:[n.length," PENDIENTES"]})]}),c.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6",children:n.map(r=>c.jsx(ov,{user:r},r.id))}),c.jsx("div",{className:"p-4 bg-red-50 rounded-2xl border border-red-100",children:c.jsx("p",{className:"text-[10px] text-red-700 font-bold uppercase leading-relaxed",children:"⚠️ Nota Legal: Estas cuentas han solicitado el ejercicio de su Derecho al Olvido. Serán eliminadas permanentemente por la Cloud Function tras cumplirse el periodo de gracia de 30 días."})})]})]})}function $A({drivers:t,onEditDriver:e,onAddDriver:n}){const r=t.filter(i=>i.status==="active"&&i.horariosAsignados&&i.horariosAsignados.length>0),s=t.filter(i=>i.status!=="active"||!i.horariosAsignados||i.horariosAsignados.length===0);return c.jsxs("div",{className:"space-y-10",children:[c.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40",children:[c.jsxs("div",{children:[c.jsx("h3",{className:"text-xl font-black text-slate-800 uppercase tracking-tight",children:"Gestión de Operadores"}),c.jsx("p",{className:"text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1",children:"Control de flota y personal"})]}),c.jsxs("button",{onClick:n,className:"flex items-center justify-center gap-3 px-8 py-4 bg-primary-500 hover:bg-orange-600 text-white rounded-2xl shadow-lg shadow-primary-500/30 transition-all transform active:scale-95 font-black text-[10px] uppercase",children:[c.jsx(_c,{size:18})," Registrar Nuevo Conductor"]})]}),c.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-10",children:[c.jsxs("div",{className:"space-y-6",children:[c.jsxs("div",{className:"flex items-center justify-between border-b border-slate-200 pb-4",children:[c.jsxs("div",{className:"flex items-center gap-3",children:[c.jsx("div",{className:"w-2 h-6 bg-green-500 rounded-full"}),c.jsx("h3",{className:"text-lg font-black text-slate-800 uppercase tracking-tight",children:"Operando Hoy"})]}),c.jsxs("span",{className:"px-3 py-1 bg-green-100 text-green-600 rounded-full text-[10px] font-black",children:[r.length," ACTIVOS"]})]}),c.jsx("div",{className:"grid grid-cols-1 gap-4",children:r.length>0?r.map(i=>c.jsx(sv,{driver:i,onEdit:e},i.id)):c.jsxs("div",{className:"p-8 bg-white rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400",children:[c.jsx(vr,{size:32,className:"mb-2 opacity-20"}),c.jsx("p",{className:"text-xs font-bold uppercase italic",children:"Sin actividad en ruta"})]})})]}),c.jsxs("div",{className:"space-y-6",children:[c.jsxs("div",{className:"flex items-center justify-between border-b border-slate-200 pb-4",children:[c.jsxs("div",{className:"flex items-center gap-3",children:[c.jsx("div",{className:"w-2 h-6 bg-slate-300 rounded-full"}),c.jsx("h3",{className:"text-lg font-black text-slate-800 uppercase tracking-tight",children:"Fuera de Servicio"})]}),c.jsxs("span",{className:"px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[10px] font-black",children:[s.length," TOTAL"]})]}),c.jsx("div",{className:"grid grid-cols-1 gap-4 opacity-90 grayscale-[0.3]",children:s.length>0?s.map(i=>c.jsx(sv,{driver:i,onEdit:e},i.id)):c.jsx("div",{className:"p-8 bg-white rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400",children:c.jsx("p",{className:"text-xs font-bold uppercase italic",children:"Personal completo en ruta"})})})]})]})]})}function BA({routeStats:t,schedules:e,drivers:n,role:r}){return c.jsxs("div",{className:"space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700",children:[c.jsxs("div",{className:"bg-gradient-to-br from-primary-500 to-orange-600 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-primary-500/20 relative overflow-hidden",children:[c.jsxs("div",{className:"relative z-10 space-y-2",children:[c.jsx("h2",{className:"text-3xl font-black tracking-tight",children:"¡Hola Pasajero! 🎒"}),c.jsx("p",{className:"text-white/80 font-medium max-w-md",children:"Bienvenido a la Web App de Ruta-Go. Reserva tu próximo viaje de forma rápida y segura."})]}),c.jsx("img",{src:"/assets/logo_icon.png",className:"absolute -right-10 -bottom-10 w-48 h-48 opacity-10 rotate-12",alt:"bg"})]}),c.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8",children:[c.jsxs("div",{className:"bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl",children:[c.jsxs("h3",{className:"text-xl font-black text-slate-800 mb-6 flex items-center gap-3",children:[c.jsx(sr,{className:"text-primary-500"})," Próximas Salidas"]}),c.jsx("p",{className:"text-slate-400 text-sm font-medium mb-8",children:"Selecciona tu destino para ver los horarios disponibles."}),c.jsxs("div",{className:"space-y-4",children:[c.jsx(Jl,{label:"Nátaga → La Plata",value:t.toLaPlata,color:"bg-orange-500",icon:c.jsx(sr,{size:16})}),c.jsx(Jl,{label:"La Plata → Nátaga",value:t.toNataga,color:"bg-secondary-900",icon:c.jsx(sr,{size:16})})]})]}),c.jsxs("div",{className:"bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl flex flex-col justify-center items-center text-center space-y-6",children:[c.jsx("div",{className:"w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-primary-400",children:c.jsx(vr,{size:32})}),c.jsxs("div",{className:"space-y-2",children:[c.jsx("h4",{className:"text-xl font-black",children:"Reserva en Línea"}),c.jsx("p",{className:"text-white/40 text-sm",children:"El motor de reservas web está en mantenimiento técnico. Por favor consulta la planilla abajo."})]}),c.jsx("button",{className:"px-8 py-3 bg-primary-500 text-white font-black rounded-xl text-xs uppercase tracking-widest opacity-50 cursor-not-allowed",children:"Próximamente"})]})]}),c.jsxs("div",{className:"space-y-6 pt-4",children:[c.jsxs("div",{className:"flex items-center gap-3",children:[c.jsx("div",{className:"w-2 h-6 bg-primary-500 rounded-full"}),c.jsx("h3",{className:"text-xl font-black text-slate-800 uppercase tracking-tight",children:"Planilla de Horarios Realtime"})]}),c.jsx(yp,{schedules:e,drivers:n,role:r})]})]})}function HA({routeStats:t,schedules:e,drivers:n,role:r}){var i;const s=((i=r.ownedPlates)==null?void 0:i[0])||"Sin Asignar";return c.jsxs("div",{className:"space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700",children:[c.jsxs("div",{className:"bg-gradient-to-br from-secondary-900 to-slate-800 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden",children:[c.jsxs("div",{className:"relative z-10 space-y-2",children:[c.jsx("h2",{className:"text-3xl font-black tracking-tight",children:"¡Hola Conductor! 👨‍✈️"}),c.jsx("p",{className:"text-white/40 font-medium max-w-md",children:"Panel operativo web. Gestiona tu planilla y consulta el estado de tus rutas."}),c.jsxs("div",{className:"inline-flex items-center gap-2 px-4 py-2 bg-primary-500 rounded-xl text-[10px] font-black uppercase tracking-widest mt-4",children:[c.jsx(vr,{size:14})," Vehículo: ",s]})]}),c.jsx("img",{src:"/assets/logo_icon.png",className:"absolute -right-10 -bottom-10 w-48 h-48 opacity-10 rotate-12",alt:"bg"})]}),c.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-8",children:[c.jsxs("div",{className:"bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl flex flex-col items-center text-center space-y-4",children:[c.jsx("div",{className:"w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500",children:c.jsx(gc,{size:28})}),c.jsxs("div",{children:[c.jsx("h4",{className:"font-black text-slate-800 uppercase text-xs tracking-tighter",children:"Mi Planilla"}),c.jsx("p",{className:"text-slate-400 text-[10px] font-bold uppercase mt-1",children:"Consulta tus turnos asignados"})]})]}),c.jsxs("div",{className:"bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl flex flex-col items-center text-center space-y-4",children:[c.jsx("div",{className:"w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500",children:c.jsx(mc,{size:28})}),c.jsxs("div",{children:[c.jsx("h4",{className:"font-black text-slate-800 uppercase text-xs tracking-tighter",children:"Estado de Ruta"}),c.jsx("p",{className:"text-slate-400 text-[10px] font-bold uppercase mt-1",children:"Ocupación en tiempo real"})]})]}),c.jsxs("div",{className:"bg-primary-500 p-8 rounded-[3rem] text-white shadow-xl shadow-primary-500/20 flex flex-col items-center text-center space-y-4",children:[c.jsx("div",{className:"w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-white",children:c.jsx(_c,{size:28})}),c.jsxs("div",{children:[c.jsx("h4",{className:"font-black uppercase text-xs tracking-tighter",children:"Venta Física"}),c.jsx("p",{className:"text-white/60 text-[10px] font-bold uppercase mt-1",children:"Próximamente en Web"})]})]})]}),c.jsxs("div",{className:"space-y-6 pt-4",children:[c.jsxs("div",{className:"flex items-center gap-3",children:[c.jsx("div",{className:"w-2 h-6 bg-secondary-900 rounded-full"}),c.jsx("h3",{className:"text-xl font-black text-slate-800 uppercase tracking-tight",children:"Tu Planilla de Trabajo"})]}),c.jsx(yp,{schedules:e,drivers:n,role:r})]})]})}td.createRoot(document.getElementById("root")).render(c.jsx(sE.StrictMode,{children:c.jsx(FA,{})}));
