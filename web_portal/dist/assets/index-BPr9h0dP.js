(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();function F1(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var ty={exports:{}},ql={},ny={exports:{}},Q={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var bo=Symbol.for("react.element"),U1=Symbol.for("react.portal"),z1=Symbol.for("react.fragment"),V1=Symbol.for("react.strict_mode"),$1=Symbol.for("react.profiler"),B1=Symbol.for("react.provider"),H1=Symbol.for("react.context"),W1=Symbol.for("react.forward_ref"),G1=Symbol.for("react.suspense"),K1=Symbol.for("react.memo"),q1=Symbol.for("react.lazy"),dm=Symbol.iterator;function Y1(t){return t===null||typeof t!="object"?null:(t=dm&&t[dm]||t["@@iterator"],typeof t=="function"?t:null)}var ry={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},iy=Object.assign,sy={};function Ki(t,e,n){this.props=t,this.context=e,this.refs=sy,this.updater=n||ry}Ki.prototype.isReactComponent={};Ki.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Ki.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function oy(){}oy.prototype=Ki.prototype;function fh(t,e,n){this.props=t,this.context=e,this.refs=sy,this.updater=n||ry}var ph=fh.prototype=new oy;ph.constructor=fh;iy(ph,Ki.prototype);ph.isPureReactComponent=!0;var hm=Array.isArray,ay=Object.prototype.hasOwnProperty,mh={current:null},ly={key:!0,ref:!0,__self:!0,__source:!0};function cy(t,e,n){var r,i={},s=null,o=null;if(e!=null)for(r in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)ay.call(e,r)&&!ly.hasOwnProperty(r)&&(i[r]=e[r]);var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){for(var c=Array(l),h=0;h<l;h++)c[h]=arguments[h+2];i.children=c}if(t&&t.defaultProps)for(r in l=t.defaultProps,l)i[r]===void 0&&(i[r]=l[r]);return{$$typeof:bo,type:t,key:s,ref:o,props:i,_owner:mh.current}}function Q1(t,e){return{$$typeof:bo,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function gh(t){return typeof t=="object"&&t!==null&&t.$$typeof===bo}function X1(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var fm=/\/+/g;function ru(t,e){return typeof t=="object"&&t!==null&&t.key!=null?X1(""+t.key):e.toString(36)}function Pa(t,e,n,r,i){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case bo:case U1:o=!0}}if(o)return o=t,i=i(o),t=r===""?"."+ru(o,0):r,hm(i)?(n="",t!=null&&(n=t.replace(fm,"$&/")+"/"),Pa(i,e,n,"",function(h){return h})):i!=null&&(gh(i)&&(i=Q1(i,n+(!i.key||o&&o.key===i.key?"":(""+i.key).replace(fm,"$&/")+"/")+t)),e.push(i)),1;if(o=0,r=r===""?".":r+":",hm(t))for(var l=0;l<t.length;l++){s=t[l];var c=r+ru(s,l);o+=Pa(s,e,n,c,i)}else if(c=Y1(t),typeof c=="function")for(t=c.call(t),l=0;!(s=t.next()).done;)s=s.value,c=r+ru(s,l++),o+=Pa(s,e,n,c,i);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function ua(t,e,n){if(t==null)return t;var r=[],i=0;return Pa(t,r,"","",function(s){return e.call(n,s,i++)}),r}function J1(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var st={current:null},ja={transition:null},Z1={ReactCurrentDispatcher:st,ReactCurrentBatchConfig:ja,ReactCurrentOwner:mh};function uy(){throw Error("act(...) is not supported in production builds of React.")}Q.Children={map:ua,forEach:function(t,e,n){ua(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return ua(t,function(){e++}),e},toArray:function(t){return ua(t,function(e){return e})||[]},only:function(t){if(!gh(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};Q.Component=Ki;Q.Fragment=z1;Q.Profiler=$1;Q.PureComponent=fh;Q.StrictMode=V1;Q.Suspense=G1;Q.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Z1;Q.act=uy;Q.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var r=iy({},t.props),i=t.key,s=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=mh.current),e.key!==void 0&&(i=""+e.key),t.type&&t.type.defaultProps)var l=t.type.defaultProps;for(c in e)ay.call(e,c)&&!ly.hasOwnProperty(c)&&(r[c]=e[c]===void 0&&l!==void 0?l[c]:e[c])}var c=arguments.length-2;if(c===1)r.children=n;else if(1<c){l=Array(c);for(var h=0;h<c;h++)l[h]=arguments[h+2];r.children=l}return{$$typeof:bo,type:t.type,key:i,ref:s,props:r,_owner:o}};Q.createContext=function(t){return t={$$typeof:H1,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:B1,_context:t},t.Consumer=t};Q.createElement=cy;Q.createFactory=function(t){var e=cy.bind(null,t);return e.type=t,e};Q.createRef=function(){return{current:null}};Q.forwardRef=function(t){return{$$typeof:W1,render:t}};Q.isValidElement=gh;Q.lazy=function(t){return{$$typeof:q1,_payload:{_status:-1,_result:t},_init:J1}};Q.memo=function(t,e){return{$$typeof:K1,type:t,compare:e===void 0?null:e}};Q.startTransition=function(t){var e=ja.transition;ja.transition={};try{t()}finally{ja.transition=e}};Q.unstable_act=uy;Q.useCallback=function(t,e){return st.current.useCallback(t,e)};Q.useContext=function(t){return st.current.useContext(t)};Q.useDebugValue=function(){};Q.useDeferredValue=function(t){return st.current.useDeferredValue(t)};Q.useEffect=function(t,e){return st.current.useEffect(t,e)};Q.useId=function(){return st.current.useId()};Q.useImperativeHandle=function(t,e,n){return st.current.useImperativeHandle(t,e,n)};Q.useInsertionEffect=function(t,e){return st.current.useInsertionEffect(t,e)};Q.useLayoutEffect=function(t,e){return st.current.useLayoutEffect(t,e)};Q.useMemo=function(t,e){return st.current.useMemo(t,e)};Q.useReducer=function(t,e,n){return st.current.useReducer(t,e,n)};Q.useRef=function(t){return st.current.useRef(t)};Q.useState=function(t){return st.current.useState(t)};Q.useSyncExternalStore=function(t,e,n){return st.current.useSyncExternalStore(t,e,n)};Q.useTransition=function(){return st.current.useTransition()};Q.version="18.3.1";ny.exports=Q;var W=ny.exports;const eE=F1(W);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var tE=W,nE=Symbol.for("react.element"),rE=Symbol.for("react.fragment"),iE=Object.prototype.hasOwnProperty,sE=tE.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,oE={key:!0,ref:!0,__self:!0,__source:!0};function dy(t,e,n){var r,i={},s=null,o=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(r in e)iE.call(e,r)&&!oE.hasOwnProperty(r)&&(i[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)i[r]===void 0&&(i[r]=e[r]);return{$$typeof:nE,type:t,key:s,ref:o,props:i,_owner:sE.current}}ql.Fragment=rE;ql.jsx=dy;ql.jsxs=dy;ty.exports=ql;var d=ty.exports,qu={},hy={exports:{}},St={},fy={exports:{}},py={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(z,$){var G=z.length;z.push($);e:for(;0<G;){var me=G-1>>>1,oe=z[me];if(0<i(oe,$))z[me]=$,z[G]=oe,G=me;else break e}}function n(z){return z.length===0?null:z[0]}function r(z){if(z.length===0)return null;var $=z[0],G=z.pop();if(G!==$){z[0]=G;e:for(var me=0,oe=z.length,Ee=oe>>>1;me<Ee;){var an=2*(me+1)-1,ln=z[an],cn=an+1,un=z[cn];if(0>i(ln,G))cn<oe&&0>i(un,ln)?(z[me]=un,z[cn]=G,me=cn):(z[me]=ln,z[an]=G,me=an);else if(cn<oe&&0>i(un,G))z[me]=un,z[cn]=G,me=cn;else break e}}return $}function i(z,$){var G=z.sortIndex-$.sortIndex;return G!==0?G:z.id-$.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var o=Date,l=o.now();t.unstable_now=function(){return o.now()-l}}var c=[],h=[],m=1,p=null,v=3,N=!1,k=!1,P=!1,M=typeof setTimeout=="function"?setTimeout:null,I=typeof clearTimeout=="function"?clearTimeout:null,w=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function T(z){for(var $=n(h);$!==null;){if($.callback===null)r(h);else if($.startTime<=z)r(h),$.sortIndex=$.expirationTime,e(c,$);else break;$=n(h)}}function j(z){if(P=!1,T(z),!k)if(n(c)!==null)k=!0,Qt(F);else{var $=n(h);$!==null&&vt(j,$.startTime-z)}}function F(z,$){k=!1,P&&(P=!1,I(y),y=-1),N=!0;var G=v;try{for(T($),p=n(c);p!==null&&(!(p.expirationTime>$)||z&&!C());){var me=p.callback;if(typeof me=="function"){p.callback=null,v=p.priorityLevel;var oe=me(p.expirationTime<=$);$=t.unstable_now(),typeof oe=="function"?p.callback=oe:p===n(c)&&r(c),T($)}else r(c);p=n(c)}if(p!==null)var Ee=!0;else{var an=n(h);an!==null&&vt(j,an.startTime-$),Ee=!1}return Ee}finally{p=null,v=G,N=!1}}var U=!1,E=null,y=-1,_=5,S=-1;function C(){return!(t.unstable_now()-S<_)}function b(){if(E!==null){var z=t.unstable_now();S=z;var $=!0;try{$=E(!0,z)}finally{$?x():(U=!1,E=null)}}else U=!1}var x;if(typeof w=="function")x=function(){w(b)};else if(typeof MessageChannel<"u"){var X=new MessageChannel,Ve=X.port2;X.port1.onmessage=b,x=function(){Ve.postMessage(null)}}else x=function(){M(b,0)};function Qt(z){E=z,U||(U=!0,x())}function vt(z,$){y=M(function(){z(t.unstable_now())},$)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(z){z.callback=null},t.unstable_continueExecution=function(){k||N||(k=!0,Qt(F))},t.unstable_forceFrameRate=function(z){0>z||125<z?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):_=0<z?Math.floor(1e3/z):5},t.unstable_getCurrentPriorityLevel=function(){return v},t.unstable_getFirstCallbackNode=function(){return n(c)},t.unstable_next=function(z){switch(v){case 1:case 2:case 3:var $=3;break;default:$=v}var G=v;v=$;try{return z()}finally{v=G}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(z,$){switch(z){case 1:case 2:case 3:case 4:case 5:break;default:z=3}var G=v;v=z;try{return $()}finally{v=G}},t.unstable_scheduleCallback=function(z,$,G){var me=t.unstable_now();switch(typeof G=="object"&&G!==null?(G=G.delay,G=typeof G=="number"&&0<G?me+G:me):G=me,z){case 1:var oe=-1;break;case 2:oe=250;break;case 5:oe=1073741823;break;case 4:oe=1e4;break;default:oe=5e3}return oe=G+oe,z={id:m++,callback:$,priorityLevel:z,startTime:G,expirationTime:oe,sortIndex:-1},G>me?(z.sortIndex=G,e(h,z),n(c)===null&&z===n(h)&&(P?(I(y),y=-1):P=!0,vt(j,G-me))):(z.sortIndex=oe,e(c,z),k||N||(k=!0,Qt(F))),z},t.unstable_shouldYield=C,t.unstable_wrapCallback=function(z){var $=v;return function(){var G=v;v=$;try{return z.apply(this,arguments)}finally{v=G}}}})(py);fy.exports=py;var aE=fy.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var lE=W,Et=aE;function O(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var my=new Set,Js={};function Hr(t,e){Ai(t,e),Ai(t+"Capture",e)}function Ai(t,e){for(Js[t]=e,t=0;t<e.length;t++)my.add(e[t])}var In=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Yu=Object.prototype.hasOwnProperty,cE=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,pm={},mm={};function uE(t){return Yu.call(mm,t)?!0:Yu.call(pm,t)?!1:cE.test(t)?mm[t]=!0:(pm[t]=!0,!1)}function dE(t,e,n,r){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function hE(t,e,n,r){if(e===null||typeof e>"u"||dE(t,e,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function ot(t,e,n,r,i,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var Ue={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){Ue[t]=new ot(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];Ue[e]=new ot(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){Ue[t]=new ot(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){Ue[t]=new ot(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){Ue[t]=new ot(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){Ue[t]=new ot(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){Ue[t]=new ot(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){Ue[t]=new ot(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){Ue[t]=new ot(t,5,!1,t.toLowerCase(),null,!1,!1)});var vh=/[\-:]([a-z])/g;function yh(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(vh,yh);Ue[e]=new ot(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(vh,yh);Ue[e]=new ot(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(vh,yh);Ue[e]=new ot(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){Ue[t]=new ot(t,1,!1,t.toLowerCase(),null,!1,!1)});Ue.xlinkHref=new ot("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){Ue[t]=new ot(t,1,!1,t.toLowerCase(),null,!0,!0)});function _h(t,e,n,r){var i=Ue.hasOwnProperty(e)?Ue[e]:null;(i!==null?i.type!==0:r||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(hE(e,n,i,r)&&(n=null),r||i===null?uE(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):i.mustUseProperty?t[i.propertyName]=n===null?i.type===3?!1:"":n:(e=i.attributeName,r=i.attributeNamespace,n===null?t.removeAttribute(e):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?t.setAttributeNS(r,e,n):t.setAttribute(e,n))))}var An=lE.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,da=Symbol.for("react.element"),oi=Symbol.for("react.portal"),ai=Symbol.for("react.fragment"),xh=Symbol.for("react.strict_mode"),Qu=Symbol.for("react.profiler"),gy=Symbol.for("react.provider"),vy=Symbol.for("react.context"),wh=Symbol.for("react.forward_ref"),Xu=Symbol.for("react.suspense"),Ju=Symbol.for("react.suspense_list"),Eh=Symbol.for("react.memo"),Un=Symbol.for("react.lazy"),yy=Symbol.for("react.offscreen"),gm=Symbol.iterator;function ms(t){return t===null||typeof t!="object"?null:(t=gm&&t[gm]||t["@@iterator"],typeof t=="function"?t:null)}var ye=Object.assign,iu;function Ns(t){if(iu===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);iu=e&&e[1]||""}return`
`+iu+t}var su=!1;function ou(t,e){if(!t||su)return"";su=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(h){var r=h}Reflect.construct(t,[],e)}else{try{e.call()}catch(h){r=h}t.call(e.prototype)}else{try{throw Error()}catch(h){r=h}t()}}catch(h){if(h&&r&&typeof h.stack=="string"){for(var i=h.stack.split(`
`),s=r.stack.split(`
`),o=i.length-1,l=s.length-1;1<=o&&0<=l&&i[o]!==s[l];)l--;for(;1<=o&&0<=l;o--,l--)if(i[o]!==s[l]){if(o!==1||l!==1)do if(o--,l--,0>l||i[o]!==s[l]){var c=`
`+i[o].replace(" at new "," at ");return t.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",t.displayName)),c}while(1<=o&&0<=l);break}}}finally{su=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?Ns(t):""}function fE(t){switch(t.tag){case 5:return Ns(t.type);case 16:return Ns("Lazy");case 13:return Ns("Suspense");case 19:return Ns("SuspenseList");case 0:case 2:case 15:return t=ou(t.type,!1),t;case 11:return t=ou(t.type.render,!1),t;case 1:return t=ou(t.type,!0),t;default:return""}}function Zu(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case ai:return"Fragment";case oi:return"Portal";case Qu:return"Profiler";case xh:return"StrictMode";case Xu:return"Suspense";case Ju:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case vy:return(t.displayName||"Context")+".Consumer";case gy:return(t._context.displayName||"Context")+".Provider";case wh:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Eh:return e=t.displayName||null,e!==null?e:Zu(t.type)||"Memo";case Un:e=t._payload,t=t._init;try{return Zu(t(e))}catch{}}return null}function pE(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Zu(e);case 8:return e===xh?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function lr(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function _y(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function mE(t){var e=_y(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),r=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return i.call(this)},set:function(o){r=""+o,s.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function ha(t){t._valueTracker||(t._valueTracker=mE(t))}function xy(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),r="";return t&&(r=_y(t)?t.checked?"true":"false":t.value),t=r,t!==n?(e.setValue(t),!0):!1}function Xa(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function ed(t,e){var n=e.checked;return ye({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function vm(t,e){var n=e.defaultValue==null?"":e.defaultValue,r=e.checked!=null?e.checked:e.defaultChecked;n=lr(e.value!=null?e.value:n),t._wrapperState={initialChecked:r,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function wy(t,e){e=e.checked,e!=null&&_h(t,"checked",e,!1)}function td(t,e){wy(t,e);var n=lr(e.value),r=e.type;if(n!=null)r==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(r==="submit"||r==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?nd(t,e.type,n):e.hasOwnProperty("defaultValue")&&nd(t,e.type,lr(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function ym(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var r=e.type;if(!(r!=="submit"&&r!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function nd(t,e,n){(e!=="number"||Xa(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var bs=Array.isArray;function xi(t,e,n,r){if(t=t.options,e){e={};for(var i=0;i<n.length;i++)e["$"+n[i]]=!0;for(n=0;n<t.length;n++)i=e.hasOwnProperty("$"+t[n].value),t[n].selected!==i&&(t[n].selected=i),i&&r&&(t[n].defaultSelected=!0)}else{for(n=""+lr(n),e=null,i=0;i<t.length;i++){if(t[i].value===n){t[i].selected=!0,r&&(t[i].defaultSelected=!0);return}e!==null||t[i].disabled||(e=t[i])}e!==null&&(e.selected=!0)}}function rd(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(O(91));return ye({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function _m(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(O(92));if(bs(n)){if(1<n.length)throw Error(O(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:lr(n)}}function Ey(t,e){var n=lr(e.value),r=lr(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),r!=null&&(t.defaultValue=""+r)}function xm(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function Sy(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function id(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?Sy(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var fa,Iy=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,r,i){MSApp.execUnsafeLocalFunction(function(){return t(e,n,r,i)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(fa=fa||document.createElement("div"),fa.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=fa.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function Zs(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var Os={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},gE=["Webkit","ms","Moz","O"];Object.keys(Os).forEach(function(t){gE.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),Os[e]=Os[t]})});function ky(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||Os.hasOwnProperty(t)&&Os[t]?(""+e).trim():e+"px"}function Cy(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=ky(n,e[n],r);n==="float"&&(n="cssFloat"),r?t.setProperty(n,i):t[n]=i}}var vE=ye({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function sd(t,e){if(e){if(vE[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(O(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(O(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(O(61))}if(e.style!=null&&typeof e.style!="object")throw Error(O(62))}}function od(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ad=null;function Sh(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var ld=null,wi=null,Ei=null;function wm(t){if(t=Po(t)){if(typeof ld!="function")throw Error(O(280));var e=t.stateNode;e&&(e=Zl(e),ld(t.stateNode,t.type,e))}}function Ty(t){wi?Ei?Ei.push(t):Ei=[t]:wi=t}function Ny(){if(wi){var t=wi,e=Ei;if(Ei=wi=null,wm(t),e)for(t=0;t<e.length;t++)wm(e[t])}}function by(t,e){return t(e)}function Ry(){}var au=!1;function Ay(t,e,n){if(au)return t(e,n);au=!0;try{return by(t,e,n)}finally{au=!1,(wi!==null||Ei!==null)&&(Ry(),Ny())}}function eo(t,e){var n=t.stateNode;if(n===null)return null;var r=Zl(n);if(r===null)return null;n=r[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(t=t.type,r=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!r;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(O(231,e,typeof n));return n}var cd=!1;if(In)try{var gs={};Object.defineProperty(gs,"passive",{get:function(){cd=!0}}),window.addEventListener("test",gs,gs),window.removeEventListener("test",gs,gs)}catch{cd=!1}function yE(t,e,n,r,i,s,o,l,c){var h=Array.prototype.slice.call(arguments,3);try{e.apply(n,h)}catch(m){this.onError(m)}}var Ds=!1,Ja=null,Za=!1,ud=null,_E={onError:function(t){Ds=!0,Ja=t}};function xE(t,e,n,r,i,s,o,l,c){Ds=!1,Ja=null,yE.apply(_E,arguments)}function wE(t,e,n,r,i,s,o,l,c){if(xE.apply(this,arguments),Ds){if(Ds){var h=Ja;Ds=!1,Ja=null}else throw Error(O(198));Za||(Za=!0,ud=h)}}function Wr(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function Py(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Em(t){if(Wr(t)!==t)throw Error(O(188))}function EE(t){var e=t.alternate;if(!e){if(e=Wr(t),e===null)throw Error(O(188));return e!==t?null:t}for(var n=t,r=e;;){var i=n.return;if(i===null)break;var s=i.alternate;if(s===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===s.child){for(s=i.child;s;){if(s===n)return Em(i),t;if(s===r)return Em(i),e;s=s.sibling}throw Error(O(188))}if(n.return!==r.return)n=i,r=s;else{for(var o=!1,l=i.child;l;){if(l===n){o=!0,n=i,r=s;break}if(l===r){o=!0,r=i,n=s;break}l=l.sibling}if(!o){for(l=s.child;l;){if(l===n){o=!0,n=s,r=i;break}if(l===r){o=!0,r=s,n=i;break}l=l.sibling}if(!o)throw Error(O(189))}}if(n.alternate!==r)throw Error(O(190))}if(n.tag!==3)throw Error(O(188));return n.stateNode.current===n?t:e}function jy(t){return t=EE(t),t!==null?Oy(t):null}function Oy(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=Oy(t);if(e!==null)return e;t=t.sibling}return null}var Dy=Et.unstable_scheduleCallback,Sm=Et.unstable_cancelCallback,SE=Et.unstable_shouldYield,IE=Et.unstable_requestPaint,Ie=Et.unstable_now,kE=Et.unstable_getCurrentPriorityLevel,Ih=Et.unstable_ImmediatePriority,Ly=Et.unstable_UserBlockingPriority,el=Et.unstable_NormalPriority,CE=Et.unstable_LowPriority,My=Et.unstable_IdlePriority,Yl=null,tn=null;function TE(t){if(tn&&typeof tn.onCommitFiberRoot=="function")try{tn.onCommitFiberRoot(Yl,t,void 0,(t.current.flags&128)===128)}catch{}}var Bt=Math.clz32?Math.clz32:RE,NE=Math.log,bE=Math.LN2;function RE(t){return t>>>=0,t===0?32:31-(NE(t)/bE|0)|0}var pa=64,ma=4194304;function Rs(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function tl(t,e){var n=t.pendingLanes;if(n===0)return 0;var r=0,i=t.suspendedLanes,s=t.pingedLanes,o=n&268435455;if(o!==0){var l=o&~i;l!==0?r=Rs(l):(s&=o,s!==0&&(r=Rs(s)))}else o=n&~i,o!==0?r=Rs(o):s!==0&&(r=Rs(s));if(r===0)return 0;if(e!==0&&e!==r&&!(e&i)&&(i=r&-r,s=e&-e,i>=s||i===16&&(s&4194240)!==0))return e;if(r&4&&(r|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=r;0<e;)n=31-Bt(e),i=1<<n,r|=t[n],e&=~i;return r}function AE(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function PE(t,e){for(var n=t.suspendedLanes,r=t.pingedLanes,i=t.expirationTimes,s=t.pendingLanes;0<s;){var o=31-Bt(s),l=1<<o,c=i[o];c===-1?(!(l&n)||l&r)&&(i[o]=AE(l,e)):c<=e&&(t.expiredLanes|=l),s&=~l}}function dd(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function Fy(){var t=pa;return pa<<=1,!(pa&4194240)&&(pa=64),t}function lu(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Ro(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-Bt(e),t[e]=n}function jE(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var r=t.eventTimes;for(t=t.expirationTimes;0<n;){var i=31-Bt(n),s=1<<i;e[i]=0,r[i]=-1,t[i]=-1,n&=~s}}function kh(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var r=31-Bt(n),i=1<<r;i&e|t[r]&e&&(t[r]|=e),n&=~i}}var ie=0;function Uy(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var zy,Ch,Vy,$y,By,hd=!1,ga=[],Qn=null,Xn=null,Jn=null,to=new Map,no=new Map,Vn=[],OE="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Im(t,e){switch(t){case"focusin":case"focusout":Qn=null;break;case"dragenter":case"dragleave":Xn=null;break;case"mouseover":case"mouseout":Jn=null;break;case"pointerover":case"pointerout":to.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":no.delete(e.pointerId)}}function vs(t,e,n,r,i,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:r,nativeEvent:s,targetContainers:[i]},e!==null&&(e=Po(e),e!==null&&Ch(e)),t):(t.eventSystemFlags|=r,e=t.targetContainers,i!==null&&e.indexOf(i)===-1&&e.push(i),t)}function DE(t,e,n,r,i){switch(e){case"focusin":return Qn=vs(Qn,t,e,n,r,i),!0;case"dragenter":return Xn=vs(Xn,t,e,n,r,i),!0;case"mouseover":return Jn=vs(Jn,t,e,n,r,i),!0;case"pointerover":var s=i.pointerId;return to.set(s,vs(to.get(s)||null,t,e,n,r,i)),!0;case"gotpointercapture":return s=i.pointerId,no.set(s,vs(no.get(s)||null,t,e,n,r,i)),!0}return!1}function Hy(t){var e=kr(t.target);if(e!==null){var n=Wr(e);if(n!==null){if(e=n.tag,e===13){if(e=Py(n),e!==null){t.blockedOn=e,By(t.priority,function(){Vy(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Oa(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=fd(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var r=new n.constructor(n.type,n);ad=r,n.target.dispatchEvent(r),ad=null}else return e=Po(n),e!==null&&Ch(e),t.blockedOn=n,!1;e.shift()}return!0}function km(t,e,n){Oa(t)&&n.delete(e)}function LE(){hd=!1,Qn!==null&&Oa(Qn)&&(Qn=null),Xn!==null&&Oa(Xn)&&(Xn=null),Jn!==null&&Oa(Jn)&&(Jn=null),to.forEach(km),no.forEach(km)}function ys(t,e){t.blockedOn===e&&(t.blockedOn=null,hd||(hd=!0,Et.unstable_scheduleCallback(Et.unstable_NormalPriority,LE)))}function ro(t){function e(i){return ys(i,t)}if(0<ga.length){ys(ga[0],t);for(var n=1;n<ga.length;n++){var r=ga[n];r.blockedOn===t&&(r.blockedOn=null)}}for(Qn!==null&&ys(Qn,t),Xn!==null&&ys(Xn,t),Jn!==null&&ys(Jn,t),to.forEach(e),no.forEach(e),n=0;n<Vn.length;n++)r=Vn[n],r.blockedOn===t&&(r.blockedOn=null);for(;0<Vn.length&&(n=Vn[0],n.blockedOn===null);)Hy(n),n.blockedOn===null&&Vn.shift()}var Si=An.ReactCurrentBatchConfig,nl=!0;function ME(t,e,n,r){var i=ie,s=Si.transition;Si.transition=null;try{ie=1,Th(t,e,n,r)}finally{ie=i,Si.transition=s}}function FE(t,e,n,r){var i=ie,s=Si.transition;Si.transition=null;try{ie=4,Th(t,e,n,r)}finally{ie=i,Si.transition=s}}function Th(t,e,n,r){if(nl){var i=fd(t,e,n,r);if(i===null)yu(t,e,r,rl,n),Im(t,r);else if(DE(i,t,e,n,r))r.stopPropagation();else if(Im(t,r),e&4&&-1<OE.indexOf(t)){for(;i!==null;){var s=Po(i);if(s!==null&&zy(s),s=fd(t,e,n,r),s===null&&yu(t,e,r,rl,n),s===i)break;i=s}i!==null&&r.stopPropagation()}else yu(t,e,r,null,n)}}var rl=null;function fd(t,e,n,r){if(rl=null,t=Sh(r),t=kr(t),t!==null)if(e=Wr(t),e===null)t=null;else if(n=e.tag,n===13){if(t=Py(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return rl=t,null}function Wy(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(kE()){case Ih:return 1;case Ly:return 4;case el:case CE:return 16;case My:return 536870912;default:return 16}default:return 16}}var Kn=null,Nh=null,Da=null;function Gy(){if(Da)return Da;var t,e=Nh,n=e.length,r,i="value"in Kn?Kn.value:Kn.textContent,s=i.length;for(t=0;t<n&&e[t]===i[t];t++);var o=n-t;for(r=1;r<=o&&e[n-r]===i[s-r];r++);return Da=i.slice(t,1<r?1-r:void 0)}function La(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function va(){return!0}function Cm(){return!1}function It(t){function e(n,r,i,s,o){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var l in t)t.hasOwnProperty(l)&&(n=t[l],this[l]=n?n(s):s[l]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?va:Cm,this.isPropagationStopped=Cm,this}return ye(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=va)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=va)},persist:function(){},isPersistent:va}),e}var qi={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},bh=It(qi),Ao=ye({},qi,{view:0,detail:0}),UE=It(Ao),cu,uu,_s,Ql=ye({},Ao,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Rh,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==_s&&(_s&&t.type==="mousemove"?(cu=t.screenX-_s.screenX,uu=t.screenY-_s.screenY):uu=cu=0,_s=t),cu)},movementY:function(t){return"movementY"in t?t.movementY:uu}}),Tm=It(Ql),zE=ye({},Ql,{dataTransfer:0}),VE=It(zE),$E=ye({},Ao,{relatedTarget:0}),du=It($E),BE=ye({},qi,{animationName:0,elapsedTime:0,pseudoElement:0}),HE=It(BE),WE=ye({},qi,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),GE=It(WE),KE=ye({},qi,{data:0}),Nm=It(KE),qE={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},YE={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},QE={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function XE(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=QE[t])?!!e[t]:!1}function Rh(){return XE}var JE=ye({},Ao,{key:function(t){if(t.key){var e=qE[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=La(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?YE[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Rh,charCode:function(t){return t.type==="keypress"?La(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?La(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),ZE=It(JE),eS=ye({},Ql,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),bm=It(eS),tS=ye({},Ao,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Rh}),nS=It(tS),rS=ye({},qi,{propertyName:0,elapsedTime:0,pseudoElement:0}),iS=It(rS),sS=ye({},Ql,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),oS=It(sS),aS=[9,13,27,32],Ah=In&&"CompositionEvent"in window,Ls=null;In&&"documentMode"in document&&(Ls=document.documentMode);var lS=In&&"TextEvent"in window&&!Ls,Ky=In&&(!Ah||Ls&&8<Ls&&11>=Ls),Rm=" ",Am=!1;function qy(t,e){switch(t){case"keyup":return aS.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Yy(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var li=!1;function cS(t,e){switch(t){case"compositionend":return Yy(e);case"keypress":return e.which!==32?null:(Am=!0,Rm);case"textInput":return t=e.data,t===Rm&&Am?null:t;default:return null}}function uS(t,e){if(li)return t==="compositionend"||!Ah&&qy(t,e)?(t=Gy(),Da=Nh=Kn=null,li=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Ky&&e.locale!=="ko"?null:e.data;default:return null}}var dS={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Pm(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!dS[t.type]:e==="textarea"}function Qy(t,e,n,r){Ty(r),e=il(e,"onChange"),0<e.length&&(n=new bh("onChange","change",null,n,r),t.push({event:n,listeners:e}))}var Ms=null,io=null;function hS(t){a0(t,0)}function Xl(t){var e=di(t);if(xy(e))return t}function fS(t,e){if(t==="change")return e}var Xy=!1;if(In){var hu;if(In){var fu="oninput"in document;if(!fu){var jm=document.createElement("div");jm.setAttribute("oninput","return;"),fu=typeof jm.oninput=="function"}hu=fu}else hu=!1;Xy=hu&&(!document.documentMode||9<document.documentMode)}function Om(){Ms&&(Ms.detachEvent("onpropertychange",Jy),io=Ms=null)}function Jy(t){if(t.propertyName==="value"&&Xl(io)){var e=[];Qy(e,io,t,Sh(t)),Ay(hS,e)}}function pS(t,e,n){t==="focusin"?(Om(),Ms=e,io=n,Ms.attachEvent("onpropertychange",Jy)):t==="focusout"&&Om()}function mS(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Xl(io)}function gS(t,e){if(t==="click")return Xl(e)}function vS(t,e){if(t==="input"||t==="change")return Xl(e)}function yS(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Gt=typeof Object.is=="function"?Object.is:yS;function so(t,e){if(Gt(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),r=Object.keys(e);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Yu.call(e,i)||!Gt(t[i],e[i]))return!1}return!0}function Dm(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Lm(t,e){var n=Dm(t);t=0;for(var r;n;){if(n.nodeType===3){if(r=t+n.textContent.length,t<=e&&r>=e)return{node:n,offset:e-t};t=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Dm(n)}}function Zy(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?Zy(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function e0(){for(var t=window,e=Xa();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Xa(t.document)}return e}function Ph(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function _S(t){var e=e0(),n=t.focusedElem,r=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&Zy(n.ownerDocument.documentElement,n)){if(r!==null&&Ph(n)){if(e=r.start,t=r.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var i=n.textContent.length,s=Math.min(r.start,i);r=r.end===void 0?s:Math.min(r.end,i),!t.extend&&s>r&&(i=r,r=s,s=i),i=Lm(n,s);var o=Lm(n,r);i&&o&&(t.rangeCount!==1||t.anchorNode!==i.node||t.anchorOffset!==i.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(i.node,i.offset),t.removeAllRanges(),s>r?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var xS=In&&"documentMode"in document&&11>=document.documentMode,ci=null,pd=null,Fs=null,md=!1;function Mm(t,e,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;md||ci==null||ci!==Xa(r)||(r=ci,"selectionStart"in r&&Ph(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Fs&&so(Fs,r)||(Fs=r,r=il(pd,"onSelect"),0<r.length&&(e=new bh("onSelect","select",null,e,n),t.push({event:e,listeners:r}),e.target=ci)))}function ya(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var ui={animationend:ya("Animation","AnimationEnd"),animationiteration:ya("Animation","AnimationIteration"),animationstart:ya("Animation","AnimationStart"),transitionend:ya("Transition","TransitionEnd")},pu={},t0={};In&&(t0=document.createElement("div").style,"AnimationEvent"in window||(delete ui.animationend.animation,delete ui.animationiteration.animation,delete ui.animationstart.animation),"TransitionEvent"in window||delete ui.transitionend.transition);function Jl(t){if(pu[t])return pu[t];if(!ui[t])return t;var e=ui[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in t0)return pu[t]=e[n];return t}var n0=Jl("animationend"),r0=Jl("animationiteration"),i0=Jl("animationstart"),s0=Jl("transitionend"),o0=new Map,Fm="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function fr(t,e){o0.set(t,e),Hr(e,[t])}for(var mu=0;mu<Fm.length;mu++){var gu=Fm[mu],wS=gu.toLowerCase(),ES=gu[0].toUpperCase()+gu.slice(1);fr(wS,"on"+ES)}fr(n0,"onAnimationEnd");fr(r0,"onAnimationIteration");fr(i0,"onAnimationStart");fr("dblclick","onDoubleClick");fr("focusin","onFocus");fr("focusout","onBlur");fr(s0,"onTransitionEnd");Ai("onMouseEnter",["mouseout","mouseover"]);Ai("onMouseLeave",["mouseout","mouseover"]);Ai("onPointerEnter",["pointerout","pointerover"]);Ai("onPointerLeave",["pointerout","pointerover"]);Hr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Hr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Hr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Hr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Hr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Hr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var As="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),SS=new Set("cancel close invalid load scroll toggle".split(" ").concat(As));function Um(t,e,n){var r=t.type||"unknown-event";t.currentTarget=n,wE(r,e,void 0,t),t.currentTarget=null}function a0(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var r=t[n],i=r.event;r=r.listeners;e:{var s=void 0;if(e)for(var o=r.length-1;0<=o;o--){var l=r[o],c=l.instance,h=l.currentTarget;if(l=l.listener,c!==s&&i.isPropagationStopped())break e;Um(i,l,h),s=c}else for(o=0;o<r.length;o++){if(l=r[o],c=l.instance,h=l.currentTarget,l=l.listener,c!==s&&i.isPropagationStopped())break e;Um(i,l,h),s=c}}}if(Za)throw t=ud,Za=!1,ud=null,t}function he(t,e){var n=e[xd];n===void 0&&(n=e[xd]=new Set);var r=t+"__bubble";n.has(r)||(l0(e,t,2,!1),n.add(r))}function vu(t,e,n){var r=0;e&&(r|=4),l0(n,t,r,e)}var _a="_reactListening"+Math.random().toString(36).slice(2);function oo(t){if(!t[_a]){t[_a]=!0,my.forEach(function(n){n!=="selectionchange"&&(SS.has(n)||vu(n,!1,t),vu(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[_a]||(e[_a]=!0,vu("selectionchange",!1,e))}}function l0(t,e,n,r){switch(Wy(e)){case 1:var i=ME;break;case 4:i=FE;break;default:i=Th}n=i.bind(null,e,n,t),i=void 0,!cd||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(i=!0),r?i!==void 0?t.addEventListener(e,n,{capture:!0,passive:i}):t.addEventListener(e,n,!0):i!==void 0?t.addEventListener(e,n,{passive:i}):t.addEventListener(e,n,!1)}function yu(t,e,n,r,i){var s=r;if(!(e&1)&&!(e&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var l=r.stateNode.containerInfo;if(l===i||l.nodeType===8&&l.parentNode===i)break;if(o===4)for(o=r.return;o!==null;){var c=o.tag;if((c===3||c===4)&&(c=o.stateNode.containerInfo,c===i||c.nodeType===8&&c.parentNode===i))return;o=o.return}for(;l!==null;){if(o=kr(l),o===null)return;if(c=o.tag,c===5||c===6){r=s=o;continue e}l=l.parentNode}}r=r.return}Ay(function(){var h=s,m=Sh(n),p=[];e:{var v=o0.get(t);if(v!==void 0){var N=bh,k=t;switch(t){case"keypress":if(La(n)===0)break e;case"keydown":case"keyup":N=ZE;break;case"focusin":k="focus",N=du;break;case"focusout":k="blur",N=du;break;case"beforeblur":case"afterblur":N=du;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":N=Tm;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":N=VE;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":N=nS;break;case n0:case r0:case i0:N=HE;break;case s0:N=iS;break;case"scroll":N=UE;break;case"wheel":N=oS;break;case"copy":case"cut":case"paste":N=GE;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":N=bm}var P=(e&4)!==0,M=!P&&t==="scroll",I=P?v!==null?v+"Capture":null:v;P=[];for(var w=h,T;w!==null;){T=w;var j=T.stateNode;if(T.tag===5&&j!==null&&(T=j,I!==null&&(j=eo(w,I),j!=null&&P.push(ao(w,j,T)))),M)break;w=w.return}0<P.length&&(v=new N(v,k,null,n,m),p.push({event:v,listeners:P}))}}if(!(e&7)){e:{if(v=t==="mouseover"||t==="pointerover",N=t==="mouseout"||t==="pointerout",v&&n!==ad&&(k=n.relatedTarget||n.fromElement)&&(kr(k)||k[kn]))break e;if((N||v)&&(v=m.window===m?m:(v=m.ownerDocument)?v.defaultView||v.parentWindow:window,N?(k=n.relatedTarget||n.toElement,N=h,k=k?kr(k):null,k!==null&&(M=Wr(k),k!==M||k.tag!==5&&k.tag!==6)&&(k=null)):(N=null,k=h),N!==k)){if(P=Tm,j="onMouseLeave",I="onMouseEnter",w="mouse",(t==="pointerout"||t==="pointerover")&&(P=bm,j="onPointerLeave",I="onPointerEnter",w="pointer"),M=N==null?v:di(N),T=k==null?v:di(k),v=new P(j,w+"leave",N,n,m),v.target=M,v.relatedTarget=T,j=null,kr(m)===h&&(P=new P(I,w+"enter",k,n,m),P.target=T,P.relatedTarget=M,j=P),M=j,N&&k)t:{for(P=N,I=k,w=0,T=P;T;T=ni(T))w++;for(T=0,j=I;j;j=ni(j))T++;for(;0<w-T;)P=ni(P),w--;for(;0<T-w;)I=ni(I),T--;for(;w--;){if(P===I||I!==null&&P===I.alternate)break t;P=ni(P),I=ni(I)}P=null}else P=null;N!==null&&zm(p,v,N,P,!1),k!==null&&M!==null&&zm(p,M,k,P,!0)}}e:{if(v=h?di(h):window,N=v.nodeName&&v.nodeName.toLowerCase(),N==="select"||N==="input"&&v.type==="file")var F=fS;else if(Pm(v))if(Xy)F=vS;else{F=mS;var U=pS}else(N=v.nodeName)&&N.toLowerCase()==="input"&&(v.type==="checkbox"||v.type==="radio")&&(F=gS);if(F&&(F=F(t,h))){Qy(p,F,n,m);break e}U&&U(t,v,h),t==="focusout"&&(U=v._wrapperState)&&U.controlled&&v.type==="number"&&nd(v,"number",v.value)}switch(U=h?di(h):window,t){case"focusin":(Pm(U)||U.contentEditable==="true")&&(ci=U,pd=h,Fs=null);break;case"focusout":Fs=pd=ci=null;break;case"mousedown":md=!0;break;case"contextmenu":case"mouseup":case"dragend":md=!1,Mm(p,n,m);break;case"selectionchange":if(xS)break;case"keydown":case"keyup":Mm(p,n,m)}var E;if(Ah)e:{switch(t){case"compositionstart":var y="onCompositionStart";break e;case"compositionend":y="onCompositionEnd";break e;case"compositionupdate":y="onCompositionUpdate";break e}y=void 0}else li?qy(t,n)&&(y="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(y="onCompositionStart");y&&(Ky&&n.locale!=="ko"&&(li||y!=="onCompositionStart"?y==="onCompositionEnd"&&li&&(E=Gy()):(Kn=m,Nh="value"in Kn?Kn.value:Kn.textContent,li=!0)),U=il(h,y),0<U.length&&(y=new Nm(y,t,null,n,m),p.push({event:y,listeners:U}),E?y.data=E:(E=Yy(n),E!==null&&(y.data=E)))),(E=lS?cS(t,n):uS(t,n))&&(h=il(h,"onBeforeInput"),0<h.length&&(m=new Nm("onBeforeInput","beforeinput",null,n,m),p.push({event:m,listeners:h}),m.data=E))}a0(p,e)})}function ao(t,e,n){return{instance:t,listener:e,currentTarget:n}}function il(t,e){for(var n=e+"Capture",r=[];t!==null;){var i=t,s=i.stateNode;i.tag===5&&s!==null&&(i=s,s=eo(t,n),s!=null&&r.unshift(ao(t,s,i)),s=eo(t,e),s!=null&&r.push(ao(t,s,i))),t=t.return}return r}function ni(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function zm(t,e,n,r,i){for(var s=e._reactName,o=[];n!==null&&n!==r;){var l=n,c=l.alternate,h=l.stateNode;if(c!==null&&c===r)break;l.tag===5&&h!==null&&(l=h,i?(c=eo(n,s),c!=null&&o.unshift(ao(n,c,l))):i||(c=eo(n,s),c!=null&&o.push(ao(n,c,l)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var IS=/\r\n?/g,kS=/\u0000|\uFFFD/g;function Vm(t){return(typeof t=="string"?t:""+t).replace(IS,`
`).replace(kS,"")}function xa(t,e,n){if(e=Vm(e),Vm(t)!==e&&n)throw Error(O(425))}function sl(){}var gd=null,vd=null;function yd(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var _d=typeof setTimeout=="function"?setTimeout:void 0,CS=typeof clearTimeout=="function"?clearTimeout:void 0,$m=typeof Promise=="function"?Promise:void 0,TS=typeof queueMicrotask=="function"?queueMicrotask:typeof $m<"u"?function(t){return $m.resolve(null).then(t).catch(NS)}:_d;function NS(t){setTimeout(function(){throw t})}function _u(t,e){var n=e,r=0;do{var i=n.nextSibling;if(t.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){t.removeChild(i),ro(e);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);ro(e)}function Zn(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function Bm(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var Yi=Math.random().toString(36).slice(2),Zt="__reactFiber$"+Yi,lo="__reactProps$"+Yi,kn="__reactContainer$"+Yi,xd="__reactEvents$"+Yi,bS="__reactListeners$"+Yi,RS="__reactHandles$"+Yi;function kr(t){var e=t[Zt];if(e)return e;for(var n=t.parentNode;n;){if(e=n[kn]||n[Zt]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=Bm(t);t!==null;){if(n=t[Zt])return n;t=Bm(t)}return e}t=n,n=t.parentNode}return null}function Po(t){return t=t[Zt]||t[kn],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function di(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(O(33))}function Zl(t){return t[lo]||null}var wd=[],hi=-1;function pr(t){return{current:t}}function fe(t){0>hi||(t.current=wd[hi],wd[hi]=null,hi--)}function ue(t,e){hi++,wd[hi]=t.current,t.current=e}var cr={},qe=pr(cr),ht=pr(!1),Pr=cr;function Pi(t,e){var n=t.type.contextTypes;if(!n)return cr;var r=t.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===e)return r.__reactInternalMemoizedMaskedChildContext;var i={},s;for(s in n)i[s]=e[s];return r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=i),i}function ft(t){return t=t.childContextTypes,t!=null}function ol(){fe(ht),fe(qe)}function Hm(t,e,n){if(qe.current!==cr)throw Error(O(168));ue(qe,e),ue(ht,n)}function c0(t,e,n){var r=t.stateNode;if(e=e.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in e))throw Error(O(108,pE(t)||"Unknown",i));return ye({},n,r)}function al(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||cr,Pr=qe.current,ue(qe,t),ue(ht,ht.current),!0}function Wm(t,e,n){var r=t.stateNode;if(!r)throw Error(O(169));n?(t=c0(t,e,Pr),r.__reactInternalMemoizedMergedChildContext=t,fe(ht),fe(qe),ue(qe,t)):fe(ht),ue(ht,n)}var pn=null,ec=!1,xu=!1;function u0(t){pn===null?pn=[t]:pn.push(t)}function AS(t){ec=!0,u0(t)}function mr(){if(!xu&&pn!==null){xu=!0;var t=0,e=ie;try{var n=pn;for(ie=1;t<n.length;t++){var r=n[t];do r=r(!0);while(r!==null)}pn=null,ec=!1}catch(i){throw pn!==null&&(pn=pn.slice(t+1)),Dy(Ih,mr),i}finally{ie=e,xu=!1}}return null}var fi=[],pi=0,ll=null,cl=0,Ct=[],Tt=0,jr=null,mn=1,gn="";function wr(t,e){fi[pi++]=cl,fi[pi++]=ll,ll=t,cl=e}function d0(t,e,n){Ct[Tt++]=mn,Ct[Tt++]=gn,Ct[Tt++]=jr,jr=t;var r=mn;t=gn;var i=32-Bt(r)-1;r&=~(1<<i),n+=1;var s=32-Bt(e)+i;if(30<s){var o=i-i%5;s=(r&(1<<o)-1).toString(32),r>>=o,i-=o,mn=1<<32-Bt(e)+i|n<<i|r,gn=s+t}else mn=1<<s|n<<i|r,gn=t}function jh(t){t.return!==null&&(wr(t,1),d0(t,1,0))}function Oh(t){for(;t===ll;)ll=fi[--pi],fi[pi]=null,cl=fi[--pi],fi[pi]=null;for(;t===jr;)jr=Ct[--Tt],Ct[Tt]=null,gn=Ct[--Tt],Ct[Tt]=null,mn=Ct[--Tt],Ct[Tt]=null}var xt=null,_t=null,pe=!1,Ut=null;function h0(t,e){var n=Nt(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function Gm(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,xt=t,_t=Zn(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,xt=t,_t=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=jr!==null?{id:mn,overflow:gn}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Nt(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,xt=t,_t=null,!0):!1;default:return!1}}function Ed(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Sd(t){if(pe){var e=_t;if(e){var n=e;if(!Gm(t,e)){if(Ed(t))throw Error(O(418));e=Zn(n.nextSibling);var r=xt;e&&Gm(t,e)?h0(r,n):(t.flags=t.flags&-4097|2,pe=!1,xt=t)}}else{if(Ed(t))throw Error(O(418));t.flags=t.flags&-4097|2,pe=!1,xt=t}}}function Km(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;xt=t}function wa(t){if(t!==xt)return!1;if(!pe)return Km(t),pe=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!yd(t.type,t.memoizedProps)),e&&(e=_t)){if(Ed(t))throw f0(),Error(O(418));for(;e;)h0(t,e),e=Zn(e.nextSibling)}if(Km(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(O(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){_t=Zn(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}_t=null}}else _t=xt?Zn(t.stateNode.nextSibling):null;return!0}function f0(){for(var t=_t;t;)t=Zn(t.nextSibling)}function ji(){_t=xt=null,pe=!1}function Dh(t){Ut===null?Ut=[t]:Ut.push(t)}var PS=An.ReactCurrentBatchConfig;function xs(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(O(309));var r=n.stateNode}if(!r)throw Error(O(147,t));var i=r,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var l=i.refs;o===null?delete l[s]:l[s]=o},e._stringRef=s,e)}if(typeof t!="string")throw Error(O(284));if(!n._owner)throw Error(O(290,t))}return t}function Ea(t,e){throw t=Object.prototype.toString.call(e),Error(O(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function qm(t){var e=t._init;return e(t._payload)}function p0(t){function e(I,w){if(t){var T=I.deletions;T===null?(I.deletions=[w],I.flags|=16):T.push(w)}}function n(I,w){if(!t)return null;for(;w!==null;)e(I,w),w=w.sibling;return null}function r(I,w){for(I=new Map;w!==null;)w.key!==null?I.set(w.key,w):I.set(w.index,w),w=w.sibling;return I}function i(I,w){return I=rr(I,w),I.index=0,I.sibling=null,I}function s(I,w,T){return I.index=T,t?(T=I.alternate,T!==null?(T=T.index,T<w?(I.flags|=2,w):T):(I.flags|=2,w)):(I.flags|=1048576,w)}function o(I){return t&&I.alternate===null&&(I.flags|=2),I}function l(I,w,T,j){return w===null||w.tag!==6?(w=Tu(T,I.mode,j),w.return=I,w):(w=i(w,T),w.return=I,w)}function c(I,w,T,j){var F=T.type;return F===ai?m(I,w,T.props.children,j,T.key):w!==null&&(w.elementType===F||typeof F=="object"&&F!==null&&F.$$typeof===Un&&qm(F)===w.type)?(j=i(w,T.props),j.ref=xs(I,w,T),j.return=I,j):(j=Ba(T.type,T.key,T.props,null,I.mode,j),j.ref=xs(I,w,T),j.return=I,j)}function h(I,w,T,j){return w===null||w.tag!==4||w.stateNode.containerInfo!==T.containerInfo||w.stateNode.implementation!==T.implementation?(w=Nu(T,I.mode,j),w.return=I,w):(w=i(w,T.children||[]),w.return=I,w)}function m(I,w,T,j,F){return w===null||w.tag!==7?(w=Ar(T,I.mode,j,F),w.return=I,w):(w=i(w,T),w.return=I,w)}function p(I,w,T){if(typeof w=="string"&&w!==""||typeof w=="number")return w=Tu(""+w,I.mode,T),w.return=I,w;if(typeof w=="object"&&w!==null){switch(w.$$typeof){case da:return T=Ba(w.type,w.key,w.props,null,I.mode,T),T.ref=xs(I,null,w),T.return=I,T;case oi:return w=Nu(w,I.mode,T),w.return=I,w;case Un:var j=w._init;return p(I,j(w._payload),T)}if(bs(w)||ms(w))return w=Ar(w,I.mode,T,null),w.return=I,w;Ea(I,w)}return null}function v(I,w,T,j){var F=w!==null?w.key:null;if(typeof T=="string"&&T!==""||typeof T=="number")return F!==null?null:l(I,w,""+T,j);if(typeof T=="object"&&T!==null){switch(T.$$typeof){case da:return T.key===F?c(I,w,T,j):null;case oi:return T.key===F?h(I,w,T,j):null;case Un:return F=T._init,v(I,w,F(T._payload),j)}if(bs(T)||ms(T))return F!==null?null:m(I,w,T,j,null);Ea(I,T)}return null}function N(I,w,T,j,F){if(typeof j=="string"&&j!==""||typeof j=="number")return I=I.get(T)||null,l(w,I,""+j,F);if(typeof j=="object"&&j!==null){switch(j.$$typeof){case da:return I=I.get(j.key===null?T:j.key)||null,c(w,I,j,F);case oi:return I=I.get(j.key===null?T:j.key)||null,h(w,I,j,F);case Un:var U=j._init;return N(I,w,T,U(j._payload),F)}if(bs(j)||ms(j))return I=I.get(T)||null,m(w,I,j,F,null);Ea(w,j)}return null}function k(I,w,T,j){for(var F=null,U=null,E=w,y=w=0,_=null;E!==null&&y<T.length;y++){E.index>y?(_=E,E=null):_=E.sibling;var S=v(I,E,T[y],j);if(S===null){E===null&&(E=_);break}t&&E&&S.alternate===null&&e(I,E),w=s(S,w,y),U===null?F=S:U.sibling=S,U=S,E=_}if(y===T.length)return n(I,E),pe&&wr(I,y),F;if(E===null){for(;y<T.length;y++)E=p(I,T[y],j),E!==null&&(w=s(E,w,y),U===null?F=E:U.sibling=E,U=E);return pe&&wr(I,y),F}for(E=r(I,E);y<T.length;y++)_=N(E,I,y,T[y],j),_!==null&&(t&&_.alternate!==null&&E.delete(_.key===null?y:_.key),w=s(_,w,y),U===null?F=_:U.sibling=_,U=_);return t&&E.forEach(function(C){return e(I,C)}),pe&&wr(I,y),F}function P(I,w,T,j){var F=ms(T);if(typeof F!="function")throw Error(O(150));if(T=F.call(T),T==null)throw Error(O(151));for(var U=F=null,E=w,y=w=0,_=null,S=T.next();E!==null&&!S.done;y++,S=T.next()){E.index>y?(_=E,E=null):_=E.sibling;var C=v(I,E,S.value,j);if(C===null){E===null&&(E=_);break}t&&E&&C.alternate===null&&e(I,E),w=s(C,w,y),U===null?F=C:U.sibling=C,U=C,E=_}if(S.done)return n(I,E),pe&&wr(I,y),F;if(E===null){for(;!S.done;y++,S=T.next())S=p(I,S.value,j),S!==null&&(w=s(S,w,y),U===null?F=S:U.sibling=S,U=S);return pe&&wr(I,y),F}for(E=r(I,E);!S.done;y++,S=T.next())S=N(E,I,y,S.value,j),S!==null&&(t&&S.alternate!==null&&E.delete(S.key===null?y:S.key),w=s(S,w,y),U===null?F=S:U.sibling=S,U=S);return t&&E.forEach(function(b){return e(I,b)}),pe&&wr(I,y),F}function M(I,w,T,j){if(typeof T=="object"&&T!==null&&T.type===ai&&T.key===null&&(T=T.props.children),typeof T=="object"&&T!==null){switch(T.$$typeof){case da:e:{for(var F=T.key,U=w;U!==null;){if(U.key===F){if(F=T.type,F===ai){if(U.tag===7){n(I,U.sibling),w=i(U,T.props.children),w.return=I,I=w;break e}}else if(U.elementType===F||typeof F=="object"&&F!==null&&F.$$typeof===Un&&qm(F)===U.type){n(I,U.sibling),w=i(U,T.props),w.ref=xs(I,U,T),w.return=I,I=w;break e}n(I,U);break}else e(I,U);U=U.sibling}T.type===ai?(w=Ar(T.props.children,I.mode,j,T.key),w.return=I,I=w):(j=Ba(T.type,T.key,T.props,null,I.mode,j),j.ref=xs(I,w,T),j.return=I,I=j)}return o(I);case oi:e:{for(U=T.key;w!==null;){if(w.key===U)if(w.tag===4&&w.stateNode.containerInfo===T.containerInfo&&w.stateNode.implementation===T.implementation){n(I,w.sibling),w=i(w,T.children||[]),w.return=I,I=w;break e}else{n(I,w);break}else e(I,w);w=w.sibling}w=Nu(T,I.mode,j),w.return=I,I=w}return o(I);case Un:return U=T._init,M(I,w,U(T._payload),j)}if(bs(T))return k(I,w,T,j);if(ms(T))return P(I,w,T,j);Ea(I,T)}return typeof T=="string"&&T!==""||typeof T=="number"?(T=""+T,w!==null&&w.tag===6?(n(I,w.sibling),w=i(w,T),w.return=I,I=w):(n(I,w),w=Tu(T,I.mode,j),w.return=I,I=w),o(I)):n(I,w)}return M}var Oi=p0(!0),m0=p0(!1),ul=pr(null),dl=null,mi=null,Lh=null;function Mh(){Lh=mi=dl=null}function Fh(t){var e=ul.current;fe(ul),t._currentValue=e}function Id(t,e,n){for(;t!==null;){var r=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,r!==null&&(r.childLanes|=e)):r!==null&&(r.childLanes&e)!==e&&(r.childLanes|=e),t===n)break;t=t.return}}function Ii(t,e){dl=t,Lh=mi=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(ut=!0),t.firstContext=null)}function At(t){var e=t._currentValue;if(Lh!==t)if(t={context:t,memoizedValue:e,next:null},mi===null){if(dl===null)throw Error(O(308));mi=t,dl.dependencies={lanes:0,firstContext:t}}else mi=mi.next=t;return e}var Cr=null;function Uh(t){Cr===null?Cr=[t]:Cr.push(t)}function g0(t,e,n,r){var i=e.interleaved;return i===null?(n.next=n,Uh(e)):(n.next=i.next,i.next=n),e.interleaved=n,Cn(t,r)}function Cn(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var zn=!1;function zh(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function v0(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function wn(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function er(t,e,n){var r=t.updateQueue;if(r===null)return null;if(r=r.shared,Z&2){var i=r.pending;return i===null?e.next=e:(e.next=i.next,i.next=e),r.pending=e,Cn(t,n)}return i=r.interleaved,i===null?(e.next=e,Uh(r)):(e.next=i.next,i.next=e),r.interleaved=e,Cn(t,n)}function Ma(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,kh(t,n)}}function Ym(t,e){var n=t.updateQueue,r=t.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?i=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?i=s=e:s=s.next=e}else i=s=e;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:s,shared:r.shared,effects:r.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function hl(t,e,n,r){var i=t.updateQueue;zn=!1;var s=i.firstBaseUpdate,o=i.lastBaseUpdate,l=i.shared.pending;if(l!==null){i.shared.pending=null;var c=l,h=c.next;c.next=null,o===null?s=h:o.next=h,o=c;var m=t.alternate;m!==null&&(m=m.updateQueue,l=m.lastBaseUpdate,l!==o&&(l===null?m.firstBaseUpdate=h:l.next=h,m.lastBaseUpdate=c))}if(s!==null){var p=i.baseState;o=0,m=h=c=null,l=s;do{var v=l.lane,N=l.eventTime;if((r&v)===v){m!==null&&(m=m.next={eventTime:N,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var k=t,P=l;switch(v=e,N=n,P.tag){case 1:if(k=P.payload,typeof k=="function"){p=k.call(N,p,v);break e}p=k;break e;case 3:k.flags=k.flags&-65537|128;case 0:if(k=P.payload,v=typeof k=="function"?k.call(N,p,v):k,v==null)break e;p=ye({},p,v);break e;case 2:zn=!0}}l.callback!==null&&l.lane!==0&&(t.flags|=64,v=i.effects,v===null?i.effects=[l]:v.push(l))}else N={eventTime:N,lane:v,tag:l.tag,payload:l.payload,callback:l.callback,next:null},m===null?(h=m=N,c=p):m=m.next=N,o|=v;if(l=l.next,l===null){if(l=i.shared.pending,l===null)break;v=l,l=v.next,v.next=null,i.lastBaseUpdate=v,i.shared.pending=null}}while(!0);if(m===null&&(c=p),i.baseState=c,i.firstBaseUpdate=h,i.lastBaseUpdate=m,e=i.shared.interleaved,e!==null){i=e;do o|=i.lane,i=i.next;while(i!==e)}else s===null&&(i.shared.lanes=0);Dr|=o,t.lanes=o,t.memoizedState=p}}function Qm(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var r=t[e],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(O(191,i));i.call(r)}}}var jo={},nn=pr(jo),co=pr(jo),uo=pr(jo);function Tr(t){if(t===jo)throw Error(O(174));return t}function Vh(t,e){switch(ue(uo,e),ue(co,t),ue(nn,jo),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:id(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=id(e,t)}fe(nn),ue(nn,e)}function Di(){fe(nn),fe(co),fe(uo)}function y0(t){Tr(uo.current);var e=Tr(nn.current),n=id(e,t.type);e!==n&&(ue(co,t),ue(nn,n))}function $h(t){co.current===t&&(fe(nn),fe(co))}var ge=pr(0);function fl(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var wu=[];function Bh(){for(var t=0;t<wu.length;t++)wu[t]._workInProgressVersionPrimary=null;wu.length=0}var Fa=An.ReactCurrentDispatcher,Eu=An.ReactCurrentBatchConfig,Or=0,ve=null,Ce=null,Ae=null,pl=!1,Us=!1,ho=0,jS=0;function We(){throw Error(O(321))}function Hh(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!Gt(t[n],e[n]))return!1;return!0}function Wh(t,e,n,r,i,s){if(Or=s,ve=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Fa.current=t===null||t.memoizedState===null?MS:FS,t=n(r,i),Us){s=0;do{if(Us=!1,ho=0,25<=s)throw Error(O(301));s+=1,Ae=Ce=null,e.updateQueue=null,Fa.current=US,t=n(r,i)}while(Us)}if(Fa.current=ml,e=Ce!==null&&Ce.next!==null,Or=0,Ae=Ce=ve=null,pl=!1,e)throw Error(O(300));return t}function Gh(){var t=ho!==0;return ho=0,t}function Jt(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ae===null?ve.memoizedState=Ae=t:Ae=Ae.next=t,Ae}function Pt(){if(Ce===null){var t=ve.alternate;t=t!==null?t.memoizedState:null}else t=Ce.next;var e=Ae===null?ve.memoizedState:Ae.next;if(e!==null)Ae=e,Ce=t;else{if(t===null)throw Error(O(310));Ce=t,t={memoizedState:Ce.memoizedState,baseState:Ce.baseState,baseQueue:Ce.baseQueue,queue:Ce.queue,next:null},Ae===null?ve.memoizedState=Ae=t:Ae=Ae.next=t}return Ae}function fo(t,e){return typeof e=="function"?e(t):e}function Su(t){var e=Pt(),n=e.queue;if(n===null)throw Error(O(311));n.lastRenderedReducer=t;var r=Ce,i=r.baseQueue,s=n.pending;if(s!==null){if(i!==null){var o=i.next;i.next=s.next,s.next=o}r.baseQueue=i=s,n.pending=null}if(i!==null){s=i.next,r=r.baseState;var l=o=null,c=null,h=s;do{var m=h.lane;if((Or&m)===m)c!==null&&(c=c.next={lane:0,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null}),r=h.hasEagerState?h.eagerState:t(r,h.action);else{var p={lane:m,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null};c===null?(l=c=p,o=r):c=c.next=p,ve.lanes|=m,Dr|=m}h=h.next}while(h!==null&&h!==s);c===null?o=r:c.next=l,Gt(r,e.memoizedState)||(ut=!0),e.memoizedState=r,e.baseState=o,e.baseQueue=c,n.lastRenderedState=r}if(t=n.interleaved,t!==null){i=t;do s=i.lane,ve.lanes|=s,Dr|=s,i=i.next;while(i!==t)}else i===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function Iu(t){var e=Pt(),n=e.queue;if(n===null)throw Error(O(311));n.lastRenderedReducer=t;var r=n.dispatch,i=n.pending,s=e.memoizedState;if(i!==null){n.pending=null;var o=i=i.next;do s=t(s,o.action),o=o.next;while(o!==i);Gt(s,e.memoizedState)||(ut=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,r]}function _0(){}function x0(t,e){var n=ve,r=Pt(),i=e(),s=!Gt(r.memoizedState,i);if(s&&(r.memoizedState=i,ut=!0),r=r.queue,Kh(S0.bind(null,n,r,t),[t]),r.getSnapshot!==e||s||Ae!==null&&Ae.memoizedState.tag&1){if(n.flags|=2048,po(9,E0.bind(null,n,r,i,e),void 0,null),je===null)throw Error(O(349));Or&30||w0(n,e,i)}return i}function w0(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=ve.updateQueue,e===null?(e={lastEffect:null,stores:null},ve.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function E0(t,e,n,r){e.value=n,e.getSnapshot=r,I0(e)&&k0(t)}function S0(t,e,n){return n(function(){I0(e)&&k0(t)})}function I0(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!Gt(t,n)}catch{return!0}}function k0(t){var e=Cn(t,1);e!==null&&Ht(e,t,1,-1)}function Xm(t){var e=Jt();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:fo,lastRenderedState:t},e.queue=t,t=t.dispatch=LS.bind(null,ve,t),[e.memoizedState,t]}function po(t,e,n,r){return t={tag:t,create:e,destroy:n,deps:r,next:null},e=ve.updateQueue,e===null?(e={lastEffect:null,stores:null},ve.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(r=n.next,n.next=t,t.next=r,e.lastEffect=t)),t}function C0(){return Pt().memoizedState}function Ua(t,e,n,r){var i=Jt();ve.flags|=t,i.memoizedState=po(1|e,n,void 0,r===void 0?null:r)}function tc(t,e,n,r){var i=Pt();r=r===void 0?null:r;var s=void 0;if(Ce!==null){var o=Ce.memoizedState;if(s=o.destroy,r!==null&&Hh(r,o.deps)){i.memoizedState=po(e,n,s,r);return}}ve.flags|=t,i.memoizedState=po(1|e,n,s,r)}function Jm(t,e){return Ua(8390656,8,t,e)}function Kh(t,e){return tc(2048,8,t,e)}function T0(t,e){return tc(4,2,t,e)}function N0(t,e){return tc(4,4,t,e)}function b0(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function R0(t,e,n){return n=n!=null?n.concat([t]):null,tc(4,4,b0.bind(null,e,t),n)}function qh(){}function A0(t,e){var n=Pt();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&Hh(e,r[1])?r[0]:(n.memoizedState=[t,e],t)}function P0(t,e){var n=Pt();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&Hh(e,r[1])?r[0]:(t=t(),n.memoizedState=[t,e],t)}function j0(t,e,n){return Or&21?(Gt(n,e)||(n=Fy(),ve.lanes|=n,Dr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,ut=!0),t.memoizedState=n)}function OS(t,e){var n=ie;ie=n!==0&&4>n?n:4,t(!0);var r=Eu.transition;Eu.transition={};try{t(!1),e()}finally{ie=n,Eu.transition=r}}function O0(){return Pt().memoizedState}function DS(t,e,n){var r=nr(t);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},D0(t))L0(e,n);else if(n=g0(t,e,n,r),n!==null){var i=nt();Ht(n,t,r,i),M0(n,e,r)}}function LS(t,e,n){var r=nr(t),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(D0(t))L0(e,i);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,l=s(o,n);if(i.hasEagerState=!0,i.eagerState=l,Gt(l,o)){var c=e.interleaved;c===null?(i.next=i,Uh(e)):(i.next=c.next,c.next=i),e.interleaved=i;return}}catch{}finally{}n=g0(t,e,i,r),n!==null&&(i=nt(),Ht(n,t,r,i),M0(n,e,r))}}function D0(t){var e=t.alternate;return t===ve||e!==null&&e===ve}function L0(t,e){Us=pl=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function M0(t,e,n){if(n&4194240){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,kh(t,n)}}var ml={readContext:At,useCallback:We,useContext:We,useEffect:We,useImperativeHandle:We,useInsertionEffect:We,useLayoutEffect:We,useMemo:We,useReducer:We,useRef:We,useState:We,useDebugValue:We,useDeferredValue:We,useTransition:We,useMutableSource:We,useSyncExternalStore:We,useId:We,unstable_isNewReconciler:!1},MS={readContext:At,useCallback:function(t,e){return Jt().memoizedState=[t,e===void 0?null:e],t},useContext:At,useEffect:Jm,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,Ua(4194308,4,b0.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Ua(4194308,4,t,e)},useInsertionEffect:function(t,e){return Ua(4,2,t,e)},useMemo:function(t,e){var n=Jt();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var r=Jt();return e=n!==void 0?n(e):e,r.memoizedState=r.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},r.queue=t,t=t.dispatch=DS.bind(null,ve,t),[r.memoizedState,t]},useRef:function(t){var e=Jt();return t={current:t},e.memoizedState=t},useState:Xm,useDebugValue:qh,useDeferredValue:function(t){return Jt().memoizedState=t},useTransition:function(){var t=Xm(!1),e=t[0];return t=OS.bind(null,t[1]),Jt().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var r=ve,i=Jt();if(pe){if(n===void 0)throw Error(O(407));n=n()}else{if(n=e(),je===null)throw Error(O(349));Or&30||w0(r,e,n)}i.memoizedState=n;var s={value:n,getSnapshot:e};return i.queue=s,Jm(S0.bind(null,r,s,t),[t]),r.flags|=2048,po(9,E0.bind(null,r,s,n,e),void 0,null),n},useId:function(){var t=Jt(),e=je.identifierPrefix;if(pe){var n=gn,r=mn;n=(r&~(1<<32-Bt(r)-1)).toString(32)+n,e=":"+e+"R"+n,n=ho++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=jS++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},FS={readContext:At,useCallback:A0,useContext:At,useEffect:Kh,useImperativeHandle:R0,useInsertionEffect:T0,useLayoutEffect:N0,useMemo:P0,useReducer:Su,useRef:C0,useState:function(){return Su(fo)},useDebugValue:qh,useDeferredValue:function(t){var e=Pt();return j0(e,Ce.memoizedState,t)},useTransition:function(){var t=Su(fo)[0],e=Pt().memoizedState;return[t,e]},useMutableSource:_0,useSyncExternalStore:x0,useId:O0,unstable_isNewReconciler:!1},US={readContext:At,useCallback:A0,useContext:At,useEffect:Kh,useImperativeHandle:R0,useInsertionEffect:T0,useLayoutEffect:N0,useMemo:P0,useReducer:Iu,useRef:C0,useState:function(){return Iu(fo)},useDebugValue:qh,useDeferredValue:function(t){var e=Pt();return Ce===null?e.memoizedState=t:j0(e,Ce.memoizedState,t)},useTransition:function(){var t=Iu(fo)[0],e=Pt().memoizedState;return[t,e]},useMutableSource:_0,useSyncExternalStore:x0,useId:O0,unstable_isNewReconciler:!1};function Mt(t,e){if(t&&t.defaultProps){e=ye({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function kd(t,e,n,r){e=t.memoizedState,n=n(r,e),n=n==null?e:ye({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var nc={isMounted:function(t){return(t=t._reactInternals)?Wr(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var r=nt(),i=nr(t),s=wn(r,i);s.payload=e,n!=null&&(s.callback=n),e=er(t,s,i),e!==null&&(Ht(e,t,i,r),Ma(e,t,i))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var r=nt(),i=nr(t),s=wn(r,i);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=er(t,s,i),e!==null&&(Ht(e,t,i,r),Ma(e,t,i))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=nt(),r=nr(t),i=wn(n,r);i.tag=2,e!=null&&(i.callback=e),e=er(t,i,r),e!==null&&(Ht(e,t,r,n),Ma(e,t,r))}};function Zm(t,e,n,r,i,s,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(r,s,o):e.prototype&&e.prototype.isPureReactComponent?!so(n,r)||!so(i,s):!0}function F0(t,e,n){var r=!1,i=cr,s=e.contextType;return typeof s=="object"&&s!==null?s=At(s):(i=ft(e)?Pr:qe.current,r=e.contextTypes,s=(r=r!=null)?Pi(t,i):cr),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=nc,t.stateNode=e,e._reactInternals=t,r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=i,t.__reactInternalMemoizedMaskedChildContext=s),e}function eg(t,e,n,r){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,r),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,r),e.state!==t&&nc.enqueueReplaceState(e,e.state,null)}function Cd(t,e,n,r){var i=t.stateNode;i.props=n,i.state=t.memoizedState,i.refs={},zh(t);var s=e.contextType;typeof s=="object"&&s!==null?i.context=At(s):(s=ft(e)?Pr:qe.current,i.context=Pi(t,s)),i.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(kd(t,e,s,n),i.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(e=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),e!==i.state&&nc.enqueueReplaceState(i,i.state,null),hl(t,n,i,r),i.state=t.memoizedState),typeof i.componentDidMount=="function"&&(t.flags|=4194308)}function Li(t,e){try{var n="",r=e;do n+=fE(r),r=r.return;while(r);var i=n}catch(s){i=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:i,digest:null}}function ku(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function Td(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var zS=typeof WeakMap=="function"?WeakMap:Map;function U0(t,e,n){n=wn(-1,n),n.tag=3,n.payload={element:null};var r=e.value;return n.callback=function(){vl||(vl=!0,Md=r),Td(t,e)},n}function z0(t,e,n){n=wn(-1,n),n.tag=3;var r=t.type.getDerivedStateFromError;if(typeof r=="function"){var i=e.value;n.payload=function(){return r(i)},n.callback=function(){Td(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){Td(t,e),typeof r!="function"&&(tr===null?tr=new Set([this]):tr.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function tg(t,e,n){var r=t.pingCache;if(r===null){r=t.pingCache=new zS;var i=new Set;r.set(e,i)}else i=r.get(e),i===void 0&&(i=new Set,r.set(e,i));i.has(n)||(i.add(n),t=eI.bind(null,t,e,n),e.then(t,t))}function ng(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function rg(t,e,n,r,i){return t.mode&1?(t.flags|=65536,t.lanes=i,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=wn(-1,1),e.tag=2,er(n,e,1))),n.lanes|=1),t)}var VS=An.ReactCurrentOwner,ut=!1;function Xe(t,e,n,r){e.child=t===null?m0(e,null,n,r):Oi(e,t.child,n,r)}function ig(t,e,n,r,i){n=n.render;var s=e.ref;return Ii(e,i),r=Wh(t,e,n,r,s,i),n=Gh(),t!==null&&!ut?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~i,Tn(t,e,i)):(pe&&n&&jh(e),e.flags|=1,Xe(t,e,r,i),e.child)}function sg(t,e,n,r,i){if(t===null){var s=n.type;return typeof s=="function"&&!nf(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,V0(t,e,s,r,i)):(t=Ba(n.type,null,r,e,e.mode,i),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&i)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:so,n(o,r)&&t.ref===e.ref)return Tn(t,e,i)}return e.flags|=1,t=rr(s,r),t.ref=e.ref,t.return=e,e.child=t}function V0(t,e,n,r,i){if(t!==null){var s=t.memoizedProps;if(so(s,r)&&t.ref===e.ref)if(ut=!1,e.pendingProps=r=s,(t.lanes&i)!==0)t.flags&131072&&(ut=!0);else return e.lanes=t.lanes,Tn(t,e,i)}return Nd(t,e,n,r,i)}function $0(t,e,n){var r=e.pendingProps,i=r.children,s=t!==null?t.memoizedState:null;if(r.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},ue(vi,yt),yt|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,ue(vi,yt),yt|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=s!==null?s.baseLanes:n,ue(vi,yt),yt|=r}else s!==null?(r=s.baseLanes|n,e.memoizedState=null):r=n,ue(vi,yt),yt|=r;return Xe(t,e,i,n),e.child}function B0(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function Nd(t,e,n,r,i){var s=ft(n)?Pr:qe.current;return s=Pi(e,s),Ii(e,i),n=Wh(t,e,n,r,s,i),r=Gh(),t!==null&&!ut?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~i,Tn(t,e,i)):(pe&&r&&jh(e),e.flags|=1,Xe(t,e,n,i),e.child)}function og(t,e,n,r,i){if(ft(n)){var s=!0;al(e)}else s=!1;if(Ii(e,i),e.stateNode===null)za(t,e),F0(e,n,r),Cd(e,n,r,i),r=!0;else if(t===null){var o=e.stateNode,l=e.memoizedProps;o.props=l;var c=o.context,h=n.contextType;typeof h=="object"&&h!==null?h=At(h):(h=ft(n)?Pr:qe.current,h=Pi(e,h));var m=n.getDerivedStateFromProps,p=typeof m=="function"||typeof o.getSnapshotBeforeUpdate=="function";p||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==r||c!==h)&&eg(e,o,r,h),zn=!1;var v=e.memoizedState;o.state=v,hl(e,r,o,i),c=e.memoizedState,l!==r||v!==c||ht.current||zn?(typeof m=="function"&&(kd(e,n,m,r),c=e.memoizedState),(l=zn||Zm(e,n,l,r,v,c,h))?(p||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=r,e.memoizedState=c),o.props=r,o.state=c,o.context=h,r=l):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),r=!1)}else{o=e.stateNode,v0(t,e),l=e.memoizedProps,h=e.type===e.elementType?l:Mt(e.type,l),o.props=h,p=e.pendingProps,v=o.context,c=n.contextType,typeof c=="object"&&c!==null?c=At(c):(c=ft(n)?Pr:qe.current,c=Pi(e,c));var N=n.getDerivedStateFromProps;(m=typeof N=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==p||v!==c)&&eg(e,o,r,c),zn=!1,v=e.memoizedState,o.state=v,hl(e,r,o,i);var k=e.memoizedState;l!==p||v!==k||ht.current||zn?(typeof N=="function"&&(kd(e,n,N,r),k=e.memoizedState),(h=zn||Zm(e,n,h,r,v,k,c)||!1)?(m||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,k,c),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,k,c)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&v===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&v===t.memoizedState||(e.flags|=1024),e.memoizedProps=r,e.memoizedState=k),o.props=r,o.state=k,o.context=c,r=h):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&v===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&v===t.memoizedState||(e.flags|=1024),r=!1)}return bd(t,e,n,r,s,i)}function bd(t,e,n,r,i,s){B0(t,e);var o=(e.flags&128)!==0;if(!r&&!o)return i&&Wm(e,n,!1),Tn(t,e,s);r=e.stateNode,VS.current=e;var l=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return e.flags|=1,t!==null&&o?(e.child=Oi(e,t.child,null,s),e.child=Oi(e,null,l,s)):Xe(t,e,l,s),e.memoizedState=r.state,i&&Wm(e,n,!0),e.child}function H0(t){var e=t.stateNode;e.pendingContext?Hm(t,e.pendingContext,e.pendingContext!==e.context):e.context&&Hm(t,e.context,!1),Vh(t,e.containerInfo)}function ag(t,e,n,r,i){return ji(),Dh(i),e.flags|=256,Xe(t,e,n,r),e.child}var Rd={dehydrated:null,treeContext:null,retryLane:0};function Ad(t){return{baseLanes:t,cachePool:null,transitions:null}}function W0(t,e,n){var r=e.pendingProps,i=ge.current,s=!1,o=(e.flags&128)!==0,l;if((l=o)||(l=t!==null&&t.memoizedState===null?!1:(i&2)!==0),l?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(i|=1),ue(ge,i&1),t===null)return Sd(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=r.children,t=r.fallback,s?(r=e.mode,s=e.child,o={mode:"hidden",children:o},!(r&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=sc(o,r,0,null),t=Ar(t,r,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=Ad(n),e.memoizedState=Rd,t):Yh(e,o));if(i=t.memoizedState,i!==null&&(l=i.dehydrated,l!==null))return $S(t,e,o,r,l,i,n);if(s){s=r.fallback,o=e.mode,i=t.child,l=i.sibling;var c={mode:"hidden",children:r.children};return!(o&1)&&e.child!==i?(r=e.child,r.childLanes=0,r.pendingProps=c,e.deletions=null):(r=rr(i,c),r.subtreeFlags=i.subtreeFlags&14680064),l!==null?s=rr(l,s):(s=Ar(s,o,n,null),s.flags|=2),s.return=e,r.return=e,r.sibling=s,e.child=r,r=s,s=e.child,o=t.child.memoizedState,o=o===null?Ad(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=t.childLanes&~n,e.memoizedState=Rd,r}return s=t.child,t=s.sibling,r=rr(s,{mode:"visible",children:r.children}),!(e.mode&1)&&(r.lanes=n),r.return=e,r.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=r,e.memoizedState=null,r}function Yh(t,e){return e=sc({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function Sa(t,e,n,r){return r!==null&&Dh(r),Oi(e,t.child,null,n),t=Yh(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function $S(t,e,n,r,i,s,o){if(n)return e.flags&256?(e.flags&=-257,r=ku(Error(O(422))),Sa(t,e,o,r)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=r.fallback,i=e.mode,r=sc({mode:"visible",children:r.children},i,0,null),s=Ar(s,i,o,null),s.flags|=2,r.return=e,s.return=e,r.sibling=s,e.child=r,e.mode&1&&Oi(e,t.child,null,o),e.child.memoizedState=Ad(o),e.memoizedState=Rd,s);if(!(e.mode&1))return Sa(t,e,o,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var l=r.dgst;return r=l,s=Error(O(419)),r=ku(s,r,void 0),Sa(t,e,o,r)}if(l=(o&t.childLanes)!==0,ut||l){if(r=je,r!==null){switch(o&-o){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|o)?0:i,i!==0&&i!==s.retryLane&&(s.retryLane=i,Cn(t,i),Ht(r,t,i,-1))}return tf(),r=ku(Error(O(421))),Sa(t,e,o,r)}return i.data==="$?"?(e.flags|=128,e.child=t.child,e=tI.bind(null,t),i._reactRetry=e,null):(t=s.treeContext,_t=Zn(i.nextSibling),xt=e,pe=!0,Ut=null,t!==null&&(Ct[Tt++]=mn,Ct[Tt++]=gn,Ct[Tt++]=jr,mn=t.id,gn=t.overflow,jr=e),e=Yh(e,r.children),e.flags|=4096,e)}function lg(t,e,n){t.lanes|=e;var r=t.alternate;r!==null&&(r.lanes|=e),Id(t.return,e,n)}function Cu(t,e,n,r,i){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=r,s.tail=n,s.tailMode=i)}function G0(t,e,n){var r=e.pendingProps,i=r.revealOrder,s=r.tail;if(Xe(t,e,r.children,n),r=ge.current,r&2)r=r&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&lg(t,n,e);else if(t.tag===19)lg(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}r&=1}if(ue(ge,r),!(e.mode&1))e.memoizedState=null;else switch(i){case"forwards":for(n=e.child,i=null;n!==null;)t=n.alternate,t!==null&&fl(t)===null&&(i=n),n=n.sibling;n=i,n===null?(i=e.child,e.child=null):(i=n.sibling,n.sibling=null),Cu(e,!1,i,n,s);break;case"backwards":for(n=null,i=e.child,e.child=null;i!==null;){if(t=i.alternate,t!==null&&fl(t)===null){e.child=i;break}t=i.sibling,i.sibling=n,n=i,i=t}Cu(e,!0,n,null,s);break;case"together":Cu(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function za(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Tn(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Dr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(O(153));if(e.child!==null){for(t=e.child,n=rr(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=rr(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function BS(t,e,n){switch(e.tag){case 3:H0(e),ji();break;case 5:y0(e);break;case 1:ft(e.type)&&al(e);break;case 4:Vh(e,e.stateNode.containerInfo);break;case 10:var r=e.type._context,i=e.memoizedProps.value;ue(ul,r._currentValue),r._currentValue=i;break;case 13:if(r=e.memoizedState,r!==null)return r.dehydrated!==null?(ue(ge,ge.current&1),e.flags|=128,null):n&e.child.childLanes?W0(t,e,n):(ue(ge,ge.current&1),t=Tn(t,e,n),t!==null?t.sibling:null);ue(ge,ge.current&1);break;case 19:if(r=(n&e.childLanes)!==0,t.flags&128){if(r)return G0(t,e,n);e.flags|=128}if(i=e.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),ue(ge,ge.current),r)break;return null;case 22:case 23:return e.lanes=0,$0(t,e,n)}return Tn(t,e,n)}var K0,Pd,q0,Y0;K0=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Pd=function(){};q0=function(t,e,n,r){var i=t.memoizedProps;if(i!==r){t=e.stateNode,Tr(nn.current);var s=null;switch(n){case"input":i=ed(t,i),r=ed(t,r),s=[];break;case"select":i=ye({},i,{value:void 0}),r=ye({},r,{value:void 0}),s=[];break;case"textarea":i=rd(t,i),r=rd(t,r),s=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(t.onclick=sl)}sd(n,r);var o;n=null;for(h in i)if(!r.hasOwnProperty(h)&&i.hasOwnProperty(h)&&i[h]!=null)if(h==="style"){var l=i[h];for(o in l)l.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else h!=="dangerouslySetInnerHTML"&&h!=="children"&&h!=="suppressContentEditableWarning"&&h!=="suppressHydrationWarning"&&h!=="autoFocus"&&(Js.hasOwnProperty(h)?s||(s=[]):(s=s||[]).push(h,null));for(h in r){var c=r[h];if(l=i!=null?i[h]:void 0,r.hasOwnProperty(h)&&c!==l&&(c!=null||l!=null))if(h==="style")if(l){for(o in l)!l.hasOwnProperty(o)||c&&c.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in c)c.hasOwnProperty(o)&&l[o]!==c[o]&&(n||(n={}),n[o]=c[o])}else n||(s||(s=[]),s.push(h,n)),n=c;else h==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,l=l?l.__html:void 0,c!=null&&l!==c&&(s=s||[]).push(h,c)):h==="children"?typeof c!="string"&&typeof c!="number"||(s=s||[]).push(h,""+c):h!=="suppressContentEditableWarning"&&h!=="suppressHydrationWarning"&&(Js.hasOwnProperty(h)?(c!=null&&h==="onScroll"&&he("scroll",t),s||l===c||(s=[])):(s=s||[]).push(h,c))}n&&(s=s||[]).push("style",n);var h=s;(e.updateQueue=h)&&(e.flags|=4)}};Y0=function(t,e,n,r){n!==r&&(e.flags|=4)};function ws(t,e){if(!pe)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:r.sibling=null}}function Ge(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,r=0;if(e)for(var i=t.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=t,i=i.sibling;else for(i=t.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=t,i=i.sibling;return t.subtreeFlags|=r,t.childLanes=n,e}function HS(t,e,n){var r=e.pendingProps;switch(Oh(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ge(e),null;case 1:return ft(e.type)&&ol(),Ge(e),null;case 3:return r=e.stateNode,Di(),fe(ht),fe(qe),Bh(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(t===null||t.child===null)&&(wa(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Ut!==null&&(zd(Ut),Ut=null))),Pd(t,e),Ge(e),null;case 5:$h(e);var i=Tr(uo.current);if(n=e.type,t!==null&&e.stateNode!=null)q0(t,e,n,r,i),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!r){if(e.stateNode===null)throw Error(O(166));return Ge(e),null}if(t=Tr(nn.current),wa(e)){r=e.stateNode,n=e.type;var s=e.memoizedProps;switch(r[Zt]=e,r[lo]=s,t=(e.mode&1)!==0,n){case"dialog":he("cancel",r),he("close",r);break;case"iframe":case"object":case"embed":he("load",r);break;case"video":case"audio":for(i=0;i<As.length;i++)he(As[i],r);break;case"source":he("error",r);break;case"img":case"image":case"link":he("error",r),he("load",r);break;case"details":he("toggle",r);break;case"input":vm(r,s),he("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!s.multiple},he("invalid",r);break;case"textarea":_m(r,s),he("invalid",r)}sd(n,s),i=null;for(var o in s)if(s.hasOwnProperty(o)){var l=s[o];o==="children"?typeof l=="string"?r.textContent!==l&&(s.suppressHydrationWarning!==!0&&xa(r.textContent,l,t),i=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(s.suppressHydrationWarning!==!0&&xa(r.textContent,l,t),i=["children",""+l]):Js.hasOwnProperty(o)&&l!=null&&o==="onScroll"&&he("scroll",r)}switch(n){case"input":ha(r),ym(r,s,!0);break;case"textarea":ha(r),xm(r);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(r.onclick=sl)}r=i,e.updateQueue=r,r!==null&&(e.flags|=4)}else{o=i.nodeType===9?i:i.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=Sy(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof r.is=="string"?t=o.createElement(n,{is:r.is}):(t=o.createElement(n),n==="select"&&(o=t,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):t=o.createElementNS(t,n),t[Zt]=e,t[lo]=r,K0(t,e,!1,!1),e.stateNode=t;e:{switch(o=od(n,r),n){case"dialog":he("cancel",t),he("close",t),i=r;break;case"iframe":case"object":case"embed":he("load",t),i=r;break;case"video":case"audio":for(i=0;i<As.length;i++)he(As[i],t);i=r;break;case"source":he("error",t),i=r;break;case"img":case"image":case"link":he("error",t),he("load",t),i=r;break;case"details":he("toggle",t),i=r;break;case"input":vm(t,r),i=ed(t,r),he("invalid",t);break;case"option":i=r;break;case"select":t._wrapperState={wasMultiple:!!r.multiple},i=ye({},r,{value:void 0}),he("invalid",t);break;case"textarea":_m(t,r),i=rd(t,r),he("invalid",t);break;default:i=r}sd(n,i),l=i;for(s in l)if(l.hasOwnProperty(s)){var c=l[s];s==="style"?Cy(t,c):s==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&Iy(t,c)):s==="children"?typeof c=="string"?(n!=="textarea"||c!=="")&&Zs(t,c):typeof c=="number"&&Zs(t,""+c):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(Js.hasOwnProperty(s)?c!=null&&s==="onScroll"&&he("scroll",t):c!=null&&_h(t,s,c,o))}switch(n){case"input":ha(t),ym(t,r,!1);break;case"textarea":ha(t),xm(t);break;case"option":r.value!=null&&t.setAttribute("value",""+lr(r.value));break;case"select":t.multiple=!!r.multiple,s=r.value,s!=null?xi(t,!!r.multiple,s,!1):r.defaultValue!=null&&xi(t,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(t.onclick=sl)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Ge(e),null;case 6:if(t&&e.stateNode!=null)Y0(t,e,t.memoizedProps,r);else{if(typeof r!="string"&&e.stateNode===null)throw Error(O(166));if(n=Tr(uo.current),Tr(nn.current),wa(e)){if(r=e.stateNode,n=e.memoizedProps,r[Zt]=e,(s=r.nodeValue!==n)&&(t=xt,t!==null))switch(t.tag){case 3:xa(r.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&xa(r.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[Zt]=e,e.stateNode=r}return Ge(e),null;case 13:if(fe(ge),r=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(pe&&_t!==null&&e.mode&1&&!(e.flags&128))f0(),ji(),e.flags|=98560,s=!1;else if(s=wa(e),r!==null&&r.dehydrated!==null){if(t===null){if(!s)throw Error(O(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(O(317));s[Zt]=e}else ji(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Ge(e),s=!1}else Ut!==null&&(zd(Ut),Ut=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(r=r!==null,r!==(t!==null&&t.memoizedState!==null)&&r&&(e.child.flags|=8192,e.mode&1&&(t===null||ge.current&1?be===0&&(be=3):tf())),e.updateQueue!==null&&(e.flags|=4),Ge(e),null);case 4:return Di(),Pd(t,e),t===null&&oo(e.stateNode.containerInfo),Ge(e),null;case 10:return Fh(e.type._context),Ge(e),null;case 17:return ft(e.type)&&ol(),Ge(e),null;case 19:if(fe(ge),s=e.memoizedState,s===null)return Ge(e),null;if(r=(e.flags&128)!==0,o=s.rendering,o===null)if(r)ws(s,!1);else{if(be!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=fl(t),o!==null){for(e.flags|=128,ws(s,!1),r=o.updateQueue,r!==null&&(e.updateQueue=r,e.flags|=4),e.subtreeFlags=0,r=n,n=e.child;n!==null;)s=n,t=r,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,t=o.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return ue(ge,ge.current&1|2),e.child}t=t.sibling}s.tail!==null&&Ie()>Mi&&(e.flags|=128,r=!0,ws(s,!1),e.lanes=4194304)}else{if(!r)if(t=fl(o),t!==null){if(e.flags|=128,r=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),ws(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!pe)return Ge(e),null}else 2*Ie()-s.renderingStartTime>Mi&&n!==1073741824&&(e.flags|=128,r=!0,ws(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(n=s.last,n!==null?n.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Ie(),e.sibling=null,n=ge.current,ue(ge,r?n&1|2:n&1),e):(Ge(e),null);case 22:case 23:return ef(),r=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==r&&(e.flags|=8192),r&&e.mode&1?yt&1073741824&&(Ge(e),e.subtreeFlags&6&&(e.flags|=8192)):Ge(e),null;case 24:return null;case 25:return null}throw Error(O(156,e.tag))}function WS(t,e){switch(Oh(e),e.tag){case 1:return ft(e.type)&&ol(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Di(),fe(ht),fe(qe),Bh(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return $h(e),null;case 13:if(fe(ge),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(O(340));ji()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return fe(ge),null;case 4:return Di(),null;case 10:return Fh(e.type._context),null;case 22:case 23:return ef(),null;case 24:return null;default:return null}}var Ia=!1,Ke=!1,GS=typeof WeakSet=="function"?WeakSet:Set,V=null;function gi(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){_e(t,e,r)}else n.current=null}function jd(t,e,n){try{n()}catch(r){_e(t,e,r)}}var cg=!1;function KS(t,e){if(gd=nl,t=e0(),Ph(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,s=r.focusNode;r=r.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,l=-1,c=-1,h=0,m=0,p=t,v=null;t:for(;;){for(var N;p!==n||i!==0&&p.nodeType!==3||(l=o+i),p!==s||r!==0&&p.nodeType!==3||(c=o+r),p.nodeType===3&&(o+=p.nodeValue.length),(N=p.firstChild)!==null;)v=p,p=N;for(;;){if(p===t)break t;if(v===n&&++h===i&&(l=o),v===s&&++m===r&&(c=o),(N=p.nextSibling)!==null)break;p=v,v=p.parentNode}p=N}n=l===-1||c===-1?null:{start:l,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(vd={focusedElem:t,selectionRange:n},nl=!1,V=e;V!==null;)if(e=V,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,V=t;else for(;V!==null;){e=V;try{var k=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(k!==null){var P=k.memoizedProps,M=k.memoizedState,I=e.stateNode,w=I.getSnapshotBeforeUpdate(e.elementType===e.type?P:Mt(e.type,P),M);I.__reactInternalSnapshotBeforeUpdate=w}break;case 3:var T=e.stateNode.containerInfo;T.nodeType===1?T.textContent="":T.nodeType===9&&T.documentElement&&T.removeChild(T.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(O(163))}}catch(j){_e(e,e.return,j)}if(t=e.sibling,t!==null){t.return=e.return,V=t;break}V=e.return}return k=cg,cg=!1,k}function zs(t,e,n){var r=e.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&t)===t){var s=i.destroy;i.destroy=void 0,s!==void 0&&jd(e,n,s)}i=i.next}while(i!==r)}}function rc(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var r=n.create;n.destroy=r()}n=n.next}while(n!==e)}}function Od(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function Q0(t){var e=t.alternate;e!==null&&(t.alternate=null,Q0(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[Zt],delete e[lo],delete e[xd],delete e[bS],delete e[RS])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function X0(t){return t.tag===5||t.tag===3||t.tag===4}function ug(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||X0(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Dd(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=sl));else if(r!==4&&(t=t.child,t!==null))for(Dd(t,e,n),t=t.sibling;t!==null;)Dd(t,e,n),t=t.sibling}function Ld(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(r!==4&&(t=t.child,t!==null))for(Ld(t,e,n),t=t.sibling;t!==null;)Ld(t,e,n),t=t.sibling}var Le=null,Ft=!1;function Mn(t,e,n){for(n=n.child;n!==null;)J0(t,e,n),n=n.sibling}function J0(t,e,n){if(tn&&typeof tn.onCommitFiberUnmount=="function")try{tn.onCommitFiberUnmount(Yl,n)}catch{}switch(n.tag){case 5:Ke||gi(n,e);case 6:var r=Le,i=Ft;Le=null,Mn(t,e,n),Le=r,Ft=i,Le!==null&&(Ft?(t=Le,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Le.removeChild(n.stateNode));break;case 18:Le!==null&&(Ft?(t=Le,n=n.stateNode,t.nodeType===8?_u(t.parentNode,n):t.nodeType===1&&_u(t,n),ro(t)):_u(Le,n.stateNode));break;case 4:r=Le,i=Ft,Le=n.stateNode.containerInfo,Ft=!0,Mn(t,e,n),Le=r,Ft=i;break;case 0:case 11:case 14:case 15:if(!Ke&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var s=i,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&jd(n,e,o),i=i.next}while(i!==r)}Mn(t,e,n);break;case 1:if(!Ke&&(gi(n,e),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){_e(n,e,l)}Mn(t,e,n);break;case 21:Mn(t,e,n);break;case 22:n.mode&1?(Ke=(r=Ke)||n.memoizedState!==null,Mn(t,e,n),Ke=r):Mn(t,e,n);break;default:Mn(t,e,n)}}function dg(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new GS),e.forEach(function(r){var i=nI.bind(null,t,r);n.has(r)||(n.add(r),r.then(i,i))})}}function Lt(t,e){var n=e.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var s=t,o=e,l=o;e:for(;l!==null;){switch(l.tag){case 5:Le=l.stateNode,Ft=!1;break e;case 3:Le=l.stateNode.containerInfo,Ft=!0;break e;case 4:Le=l.stateNode.containerInfo,Ft=!0;break e}l=l.return}if(Le===null)throw Error(O(160));J0(s,o,i),Le=null,Ft=!1;var c=i.alternate;c!==null&&(c.return=null),i.return=null}catch(h){_e(i,e,h)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)Z0(e,t),e=e.sibling}function Z0(t,e){var n=t.alternate,r=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Lt(e,t),Xt(t),r&4){try{zs(3,t,t.return),rc(3,t)}catch(P){_e(t,t.return,P)}try{zs(5,t,t.return)}catch(P){_e(t,t.return,P)}}break;case 1:Lt(e,t),Xt(t),r&512&&n!==null&&gi(n,n.return);break;case 5:if(Lt(e,t),Xt(t),r&512&&n!==null&&gi(n,n.return),t.flags&32){var i=t.stateNode;try{Zs(i,"")}catch(P){_e(t,t.return,P)}}if(r&4&&(i=t.stateNode,i!=null)){var s=t.memoizedProps,o=n!==null?n.memoizedProps:s,l=t.type,c=t.updateQueue;if(t.updateQueue=null,c!==null)try{l==="input"&&s.type==="radio"&&s.name!=null&&wy(i,s),od(l,o);var h=od(l,s);for(o=0;o<c.length;o+=2){var m=c[o],p=c[o+1];m==="style"?Cy(i,p):m==="dangerouslySetInnerHTML"?Iy(i,p):m==="children"?Zs(i,p):_h(i,m,p,h)}switch(l){case"input":td(i,s);break;case"textarea":Ey(i,s);break;case"select":var v=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!s.multiple;var N=s.value;N!=null?xi(i,!!s.multiple,N,!1):v!==!!s.multiple&&(s.defaultValue!=null?xi(i,!!s.multiple,s.defaultValue,!0):xi(i,!!s.multiple,s.multiple?[]:"",!1))}i[lo]=s}catch(P){_e(t,t.return,P)}}break;case 6:if(Lt(e,t),Xt(t),r&4){if(t.stateNode===null)throw Error(O(162));i=t.stateNode,s=t.memoizedProps;try{i.nodeValue=s}catch(P){_e(t,t.return,P)}}break;case 3:if(Lt(e,t),Xt(t),r&4&&n!==null&&n.memoizedState.isDehydrated)try{ro(e.containerInfo)}catch(P){_e(t,t.return,P)}break;case 4:Lt(e,t),Xt(t);break;case 13:Lt(e,t),Xt(t),i=t.child,i.flags&8192&&(s=i.memoizedState!==null,i.stateNode.isHidden=s,!s||i.alternate!==null&&i.alternate.memoizedState!==null||(Jh=Ie())),r&4&&dg(t);break;case 22:if(m=n!==null&&n.memoizedState!==null,t.mode&1?(Ke=(h=Ke)||m,Lt(e,t),Ke=h):Lt(e,t),Xt(t),r&8192){if(h=t.memoizedState!==null,(t.stateNode.isHidden=h)&&!m&&t.mode&1)for(V=t,m=t.child;m!==null;){for(p=V=m;V!==null;){switch(v=V,N=v.child,v.tag){case 0:case 11:case 14:case 15:zs(4,v,v.return);break;case 1:gi(v,v.return);var k=v.stateNode;if(typeof k.componentWillUnmount=="function"){r=v,n=v.return;try{e=r,k.props=e.memoizedProps,k.state=e.memoizedState,k.componentWillUnmount()}catch(P){_e(r,n,P)}}break;case 5:gi(v,v.return);break;case 22:if(v.memoizedState!==null){fg(p);continue}}N!==null?(N.return=v,V=N):fg(p)}m=m.sibling}e:for(m=null,p=t;;){if(p.tag===5){if(m===null){m=p;try{i=p.stateNode,h?(s=i.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(l=p.stateNode,c=p.memoizedProps.style,o=c!=null&&c.hasOwnProperty("display")?c.display:null,l.style.display=ky("display",o))}catch(P){_e(t,t.return,P)}}}else if(p.tag===6){if(m===null)try{p.stateNode.nodeValue=h?"":p.memoizedProps}catch(P){_e(t,t.return,P)}}else if((p.tag!==22&&p.tag!==23||p.memoizedState===null||p===t)&&p.child!==null){p.child.return=p,p=p.child;continue}if(p===t)break e;for(;p.sibling===null;){if(p.return===null||p.return===t)break e;m===p&&(m=null),p=p.return}m===p&&(m=null),p.sibling.return=p.return,p=p.sibling}}break;case 19:Lt(e,t),Xt(t),r&4&&dg(t);break;case 21:break;default:Lt(e,t),Xt(t)}}function Xt(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(X0(n)){var r=n;break e}n=n.return}throw Error(O(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(Zs(i,""),r.flags&=-33);var s=ug(t);Ld(t,s,i);break;case 3:case 4:var o=r.stateNode.containerInfo,l=ug(t);Dd(t,l,o);break;default:throw Error(O(161))}}catch(c){_e(t,t.return,c)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function qS(t,e,n){V=t,e_(t)}function e_(t,e,n){for(var r=(t.mode&1)!==0;V!==null;){var i=V,s=i.child;if(i.tag===22&&r){var o=i.memoizedState!==null||Ia;if(!o){var l=i.alternate,c=l!==null&&l.memoizedState!==null||Ke;l=Ia;var h=Ke;if(Ia=o,(Ke=c)&&!h)for(V=i;V!==null;)o=V,c=o.child,o.tag===22&&o.memoizedState!==null?pg(i):c!==null?(c.return=o,V=c):pg(i);for(;s!==null;)V=s,e_(s),s=s.sibling;V=i,Ia=l,Ke=h}hg(t)}else i.subtreeFlags&8772&&s!==null?(s.return=i,V=s):hg(t)}}function hg(t){for(;V!==null;){var e=V;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:Ke||rc(5,e);break;case 1:var r=e.stateNode;if(e.flags&4&&!Ke)if(n===null)r.componentDidMount();else{var i=e.elementType===e.type?n.memoizedProps:Mt(e.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&Qm(e,s,r);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}Qm(e,o,n)}break;case 5:var l=e.stateNode;if(n===null&&e.flags&4){n=l;var c=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var h=e.alternate;if(h!==null){var m=h.memoizedState;if(m!==null){var p=m.dehydrated;p!==null&&ro(p)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(O(163))}Ke||e.flags&512&&Od(e)}catch(v){_e(e,e.return,v)}}if(e===t){V=null;break}if(n=e.sibling,n!==null){n.return=e.return,V=n;break}V=e.return}}function fg(t){for(;V!==null;){var e=V;if(e===t){V=null;break}var n=e.sibling;if(n!==null){n.return=e.return,V=n;break}V=e.return}}function pg(t){for(;V!==null;){var e=V;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{rc(4,e)}catch(c){_e(e,n,c)}break;case 1:var r=e.stateNode;if(typeof r.componentDidMount=="function"){var i=e.return;try{r.componentDidMount()}catch(c){_e(e,i,c)}}var s=e.return;try{Od(e)}catch(c){_e(e,s,c)}break;case 5:var o=e.return;try{Od(e)}catch(c){_e(e,o,c)}}}catch(c){_e(e,e.return,c)}if(e===t){V=null;break}var l=e.sibling;if(l!==null){l.return=e.return,V=l;break}V=e.return}}var YS=Math.ceil,gl=An.ReactCurrentDispatcher,Qh=An.ReactCurrentOwner,Rt=An.ReactCurrentBatchConfig,Z=0,je=null,ke=null,Fe=0,yt=0,vi=pr(0),be=0,mo=null,Dr=0,ic=0,Xh=0,Vs=null,at=null,Jh=0,Mi=1/0,fn=null,vl=!1,Md=null,tr=null,ka=!1,qn=null,yl=0,$s=0,Fd=null,Va=-1,$a=0;function nt(){return Z&6?Ie():Va!==-1?Va:Va=Ie()}function nr(t){return t.mode&1?Z&2&&Fe!==0?Fe&-Fe:PS.transition!==null?($a===0&&($a=Fy()),$a):(t=ie,t!==0||(t=window.event,t=t===void 0?16:Wy(t.type)),t):1}function Ht(t,e,n,r){if(50<$s)throw $s=0,Fd=null,Error(O(185));Ro(t,n,r),(!(Z&2)||t!==je)&&(t===je&&(!(Z&2)&&(ic|=n),be===4&&$n(t,Fe)),pt(t,r),n===1&&Z===0&&!(e.mode&1)&&(Mi=Ie()+500,ec&&mr()))}function pt(t,e){var n=t.callbackNode;PE(t,e);var r=tl(t,t===je?Fe:0);if(r===0)n!==null&&Sm(n),t.callbackNode=null,t.callbackPriority=0;else if(e=r&-r,t.callbackPriority!==e){if(n!=null&&Sm(n),e===1)t.tag===0?AS(mg.bind(null,t)):u0(mg.bind(null,t)),TS(function(){!(Z&6)&&mr()}),n=null;else{switch(Uy(r)){case 1:n=Ih;break;case 4:n=Ly;break;case 16:n=el;break;case 536870912:n=My;break;default:n=el}n=l_(n,t_.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function t_(t,e){if(Va=-1,$a=0,Z&6)throw Error(O(327));var n=t.callbackNode;if(ki()&&t.callbackNode!==n)return null;var r=tl(t,t===je?Fe:0);if(r===0)return null;if(r&30||r&t.expiredLanes||e)e=_l(t,r);else{e=r;var i=Z;Z|=2;var s=r_();(je!==t||Fe!==e)&&(fn=null,Mi=Ie()+500,Rr(t,e));do try{JS();break}catch(l){n_(t,l)}while(!0);Mh(),gl.current=s,Z=i,ke!==null?e=0:(je=null,Fe=0,e=be)}if(e!==0){if(e===2&&(i=dd(t),i!==0&&(r=i,e=Ud(t,i))),e===1)throw n=mo,Rr(t,0),$n(t,r),pt(t,Ie()),n;if(e===6)$n(t,r);else{if(i=t.current.alternate,!(r&30)&&!QS(i)&&(e=_l(t,r),e===2&&(s=dd(t),s!==0&&(r=s,e=Ud(t,s))),e===1))throw n=mo,Rr(t,0),$n(t,r),pt(t,Ie()),n;switch(t.finishedWork=i,t.finishedLanes=r,e){case 0:case 1:throw Error(O(345));case 2:Er(t,at,fn);break;case 3:if($n(t,r),(r&130023424)===r&&(e=Jh+500-Ie(),10<e)){if(tl(t,0)!==0)break;if(i=t.suspendedLanes,(i&r)!==r){nt(),t.pingedLanes|=t.suspendedLanes&i;break}t.timeoutHandle=_d(Er.bind(null,t,at,fn),e);break}Er(t,at,fn);break;case 4:if($n(t,r),(r&4194240)===r)break;for(e=t.eventTimes,i=-1;0<r;){var o=31-Bt(r);s=1<<o,o=e[o],o>i&&(i=o),r&=~s}if(r=i,r=Ie()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*YS(r/1960))-r,10<r){t.timeoutHandle=_d(Er.bind(null,t,at,fn),r);break}Er(t,at,fn);break;case 5:Er(t,at,fn);break;default:throw Error(O(329))}}}return pt(t,Ie()),t.callbackNode===n?t_.bind(null,t):null}function Ud(t,e){var n=Vs;return t.current.memoizedState.isDehydrated&&(Rr(t,e).flags|=256),t=_l(t,e),t!==2&&(e=at,at=n,e!==null&&zd(e)),t}function zd(t){at===null?at=t:at.push.apply(at,t)}function QS(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],s=i.getSnapshot;i=i.value;try{if(!Gt(s(),i))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function $n(t,e){for(e&=~Xh,e&=~ic,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-Bt(e),r=1<<n;t[n]=-1,e&=~r}}function mg(t){if(Z&6)throw Error(O(327));ki();var e=tl(t,0);if(!(e&1))return pt(t,Ie()),null;var n=_l(t,e);if(t.tag!==0&&n===2){var r=dd(t);r!==0&&(e=r,n=Ud(t,r))}if(n===1)throw n=mo,Rr(t,0),$n(t,e),pt(t,Ie()),n;if(n===6)throw Error(O(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,Er(t,at,fn),pt(t,Ie()),null}function Zh(t,e){var n=Z;Z|=1;try{return t(e)}finally{Z=n,Z===0&&(Mi=Ie()+500,ec&&mr())}}function Lr(t){qn!==null&&qn.tag===0&&!(Z&6)&&ki();var e=Z;Z|=1;var n=Rt.transition,r=ie;try{if(Rt.transition=null,ie=1,t)return t()}finally{ie=r,Rt.transition=n,Z=e,!(Z&6)&&mr()}}function ef(){yt=vi.current,fe(vi)}function Rr(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,CS(n)),ke!==null)for(n=ke.return;n!==null;){var r=n;switch(Oh(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&ol();break;case 3:Di(),fe(ht),fe(qe),Bh();break;case 5:$h(r);break;case 4:Di();break;case 13:fe(ge);break;case 19:fe(ge);break;case 10:Fh(r.type._context);break;case 22:case 23:ef()}n=n.return}if(je=t,ke=t=rr(t.current,null),Fe=yt=e,be=0,mo=null,Xh=ic=Dr=0,at=Vs=null,Cr!==null){for(e=0;e<Cr.length;e++)if(n=Cr[e],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,s=n.pending;if(s!==null){var o=s.next;s.next=i,r.next=o}n.pending=r}Cr=null}return t}function n_(t,e){do{var n=ke;try{if(Mh(),Fa.current=ml,pl){for(var r=ve.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}pl=!1}if(Or=0,Ae=Ce=ve=null,Us=!1,ho=0,Qh.current=null,n===null||n.return===null){be=1,mo=e,ke=null;break}e:{var s=t,o=n.return,l=n,c=e;if(e=Fe,l.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var h=c,m=l,p=m.tag;if(!(m.mode&1)&&(p===0||p===11||p===15)){var v=m.alternate;v?(m.updateQueue=v.updateQueue,m.memoizedState=v.memoizedState,m.lanes=v.lanes):(m.updateQueue=null,m.memoizedState=null)}var N=ng(o);if(N!==null){N.flags&=-257,rg(N,o,l,s,e),N.mode&1&&tg(s,h,e),e=N,c=h;var k=e.updateQueue;if(k===null){var P=new Set;P.add(c),e.updateQueue=P}else k.add(c);break e}else{if(!(e&1)){tg(s,h,e),tf();break e}c=Error(O(426))}}else if(pe&&l.mode&1){var M=ng(o);if(M!==null){!(M.flags&65536)&&(M.flags|=256),rg(M,o,l,s,e),Dh(Li(c,l));break e}}s=c=Li(c,l),be!==4&&(be=2),Vs===null?Vs=[s]:Vs.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var I=U0(s,c,e);Ym(s,I);break e;case 1:l=c;var w=s.type,T=s.stateNode;if(!(s.flags&128)&&(typeof w.getDerivedStateFromError=="function"||T!==null&&typeof T.componentDidCatch=="function"&&(tr===null||!tr.has(T)))){s.flags|=65536,e&=-e,s.lanes|=e;var j=z0(s,l,e);Ym(s,j);break e}}s=s.return}while(s!==null)}s_(n)}catch(F){e=F,ke===n&&n!==null&&(ke=n=n.return);continue}break}while(!0)}function r_(){var t=gl.current;return gl.current=ml,t===null?ml:t}function tf(){(be===0||be===3||be===2)&&(be=4),je===null||!(Dr&268435455)&&!(ic&268435455)||$n(je,Fe)}function _l(t,e){var n=Z;Z|=2;var r=r_();(je!==t||Fe!==e)&&(fn=null,Rr(t,e));do try{XS();break}catch(i){n_(t,i)}while(!0);if(Mh(),Z=n,gl.current=r,ke!==null)throw Error(O(261));return je=null,Fe=0,be}function XS(){for(;ke!==null;)i_(ke)}function JS(){for(;ke!==null&&!SE();)i_(ke)}function i_(t){var e=a_(t.alternate,t,yt);t.memoizedProps=t.pendingProps,e===null?s_(t):ke=e,Qh.current=null}function s_(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=WS(n,e),n!==null){n.flags&=32767,ke=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{be=6,ke=null;return}}else if(n=HS(n,e,yt),n!==null){ke=n;return}if(e=e.sibling,e!==null){ke=e;return}ke=e=t}while(e!==null);be===0&&(be=5)}function Er(t,e,n){var r=ie,i=Rt.transition;try{Rt.transition=null,ie=1,ZS(t,e,n,r)}finally{Rt.transition=i,ie=r}return null}function ZS(t,e,n,r){do ki();while(qn!==null);if(Z&6)throw Error(O(327));n=t.finishedWork;var i=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(O(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(jE(t,s),t===je&&(ke=je=null,Fe=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||ka||(ka=!0,l_(el,function(){return ki(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Rt.transition,Rt.transition=null;var o=ie;ie=1;var l=Z;Z|=4,Qh.current=null,KS(t,n),Z0(n,t),_S(vd),nl=!!gd,vd=gd=null,t.current=n,qS(n),IE(),Z=l,ie=o,Rt.transition=s}else t.current=n;if(ka&&(ka=!1,qn=t,yl=i),s=t.pendingLanes,s===0&&(tr=null),TE(n.stateNode),pt(t,Ie()),e!==null)for(r=t.onRecoverableError,n=0;n<e.length;n++)i=e[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(vl)throw vl=!1,t=Md,Md=null,t;return yl&1&&t.tag!==0&&ki(),s=t.pendingLanes,s&1?t===Fd?$s++:($s=0,Fd=t):$s=0,mr(),null}function ki(){if(qn!==null){var t=Uy(yl),e=Rt.transition,n=ie;try{if(Rt.transition=null,ie=16>t?16:t,qn===null)var r=!1;else{if(t=qn,qn=null,yl=0,Z&6)throw Error(O(331));var i=Z;for(Z|=4,V=t.current;V!==null;){var s=V,o=s.child;if(V.flags&16){var l=s.deletions;if(l!==null){for(var c=0;c<l.length;c++){var h=l[c];for(V=h;V!==null;){var m=V;switch(m.tag){case 0:case 11:case 15:zs(8,m,s)}var p=m.child;if(p!==null)p.return=m,V=p;else for(;V!==null;){m=V;var v=m.sibling,N=m.return;if(Q0(m),m===h){V=null;break}if(v!==null){v.return=N,V=v;break}V=N}}}var k=s.alternate;if(k!==null){var P=k.child;if(P!==null){k.child=null;do{var M=P.sibling;P.sibling=null,P=M}while(P!==null)}}V=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,V=o;else e:for(;V!==null;){if(s=V,s.flags&2048)switch(s.tag){case 0:case 11:case 15:zs(9,s,s.return)}var I=s.sibling;if(I!==null){I.return=s.return,V=I;break e}V=s.return}}var w=t.current;for(V=w;V!==null;){o=V;var T=o.child;if(o.subtreeFlags&2064&&T!==null)T.return=o,V=T;else e:for(o=w;V!==null;){if(l=V,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:rc(9,l)}}catch(F){_e(l,l.return,F)}if(l===o){V=null;break e}var j=l.sibling;if(j!==null){j.return=l.return,V=j;break e}V=l.return}}if(Z=i,mr(),tn&&typeof tn.onPostCommitFiberRoot=="function")try{tn.onPostCommitFiberRoot(Yl,t)}catch{}r=!0}return r}finally{ie=n,Rt.transition=e}}return!1}function gg(t,e,n){e=Li(n,e),e=U0(t,e,1),t=er(t,e,1),e=nt(),t!==null&&(Ro(t,1,e),pt(t,e))}function _e(t,e,n){if(t.tag===3)gg(t,t,n);else for(;e!==null;){if(e.tag===3){gg(e,t,n);break}else if(e.tag===1){var r=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(tr===null||!tr.has(r))){t=Li(n,t),t=z0(e,t,1),e=er(e,t,1),t=nt(),e!==null&&(Ro(e,1,t),pt(e,t));break}}e=e.return}}function eI(t,e,n){var r=t.pingCache;r!==null&&r.delete(e),e=nt(),t.pingedLanes|=t.suspendedLanes&n,je===t&&(Fe&n)===n&&(be===4||be===3&&(Fe&130023424)===Fe&&500>Ie()-Jh?Rr(t,0):Xh|=n),pt(t,e)}function o_(t,e){e===0&&(t.mode&1?(e=ma,ma<<=1,!(ma&130023424)&&(ma=4194304)):e=1);var n=nt();t=Cn(t,e),t!==null&&(Ro(t,e,n),pt(t,n))}function tI(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),o_(t,n)}function nI(t,e){var n=0;switch(t.tag){case 13:var r=t.stateNode,i=t.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=t.stateNode;break;default:throw Error(O(314))}r!==null&&r.delete(e),o_(t,n)}var a_;a_=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||ht.current)ut=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return ut=!1,BS(t,e,n);ut=!!(t.flags&131072)}else ut=!1,pe&&e.flags&1048576&&d0(e,cl,e.index);switch(e.lanes=0,e.tag){case 2:var r=e.type;za(t,e),t=e.pendingProps;var i=Pi(e,qe.current);Ii(e,n),i=Wh(null,e,r,t,i,n);var s=Gh();return e.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,ft(r)?(s=!0,al(e)):s=!1,e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,zh(e),i.updater=nc,e.stateNode=i,i._reactInternals=e,Cd(e,r,t,n),e=bd(null,e,r,!0,s,n)):(e.tag=0,pe&&s&&jh(e),Xe(null,e,i,n),e=e.child),e;case 16:r=e.elementType;e:{switch(za(t,e),t=e.pendingProps,i=r._init,r=i(r._payload),e.type=r,i=e.tag=iI(r),t=Mt(r,t),i){case 0:e=Nd(null,e,r,t,n);break e;case 1:e=og(null,e,r,t,n);break e;case 11:e=ig(null,e,r,t,n);break e;case 14:e=sg(null,e,r,Mt(r.type,t),n);break e}throw Error(O(306,r,""))}return e;case 0:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Mt(r,i),Nd(t,e,r,i,n);case 1:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Mt(r,i),og(t,e,r,i,n);case 3:e:{if(H0(e),t===null)throw Error(O(387));r=e.pendingProps,s=e.memoizedState,i=s.element,v0(t,e),hl(e,r,null,n);var o=e.memoizedState;if(r=o.element,s.isDehydrated)if(s={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){i=Li(Error(O(423)),e),e=ag(t,e,r,n,i);break e}else if(r!==i){i=Li(Error(O(424)),e),e=ag(t,e,r,n,i);break e}else for(_t=Zn(e.stateNode.containerInfo.firstChild),xt=e,pe=!0,Ut=null,n=m0(e,null,r,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(ji(),r===i){e=Tn(t,e,n);break e}Xe(t,e,r,n)}e=e.child}return e;case 5:return y0(e),t===null&&Sd(e),r=e.type,i=e.pendingProps,s=t!==null?t.memoizedProps:null,o=i.children,yd(r,i)?o=null:s!==null&&yd(r,s)&&(e.flags|=32),B0(t,e),Xe(t,e,o,n),e.child;case 6:return t===null&&Sd(e),null;case 13:return W0(t,e,n);case 4:return Vh(e,e.stateNode.containerInfo),r=e.pendingProps,t===null?e.child=Oi(e,null,r,n):Xe(t,e,r,n),e.child;case 11:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Mt(r,i),ig(t,e,r,i,n);case 7:return Xe(t,e,e.pendingProps,n),e.child;case 8:return Xe(t,e,e.pendingProps.children,n),e.child;case 12:return Xe(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(r=e.type._context,i=e.pendingProps,s=e.memoizedProps,o=i.value,ue(ul,r._currentValue),r._currentValue=o,s!==null)if(Gt(s.value,o)){if(s.children===i.children&&!ht.current){e=Tn(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var l=s.dependencies;if(l!==null){o=s.child;for(var c=l.firstContext;c!==null;){if(c.context===r){if(s.tag===1){c=wn(-1,n&-n),c.tag=2;var h=s.updateQueue;if(h!==null){h=h.shared;var m=h.pending;m===null?c.next=c:(c.next=m.next,m.next=c),h.pending=c}}s.lanes|=n,c=s.alternate,c!==null&&(c.lanes|=n),Id(s.return,n,e),l.lanes|=n;break}c=c.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(O(341));o.lanes|=n,l=o.alternate,l!==null&&(l.lanes|=n),Id(o,n,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}Xe(t,e,i.children,n),e=e.child}return e;case 9:return i=e.type,r=e.pendingProps.children,Ii(e,n),i=At(i),r=r(i),e.flags|=1,Xe(t,e,r,n),e.child;case 14:return r=e.type,i=Mt(r,e.pendingProps),i=Mt(r.type,i),sg(t,e,r,i,n);case 15:return V0(t,e,e.type,e.pendingProps,n);case 17:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Mt(r,i),za(t,e),e.tag=1,ft(r)?(t=!0,al(e)):t=!1,Ii(e,n),F0(e,r,i),Cd(e,r,i,n),bd(null,e,r,!0,t,n);case 19:return G0(t,e,n);case 22:return $0(t,e,n)}throw Error(O(156,e.tag))};function l_(t,e){return Dy(t,e)}function rI(t,e,n,r){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Nt(t,e,n,r){return new rI(t,e,n,r)}function nf(t){return t=t.prototype,!(!t||!t.isReactComponent)}function iI(t){if(typeof t=="function")return nf(t)?1:0;if(t!=null){if(t=t.$$typeof,t===wh)return 11;if(t===Eh)return 14}return 2}function rr(t,e){var n=t.alternate;return n===null?(n=Nt(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function Ba(t,e,n,r,i,s){var o=2;if(r=t,typeof t=="function")nf(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case ai:return Ar(n.children,i,s,e);case xh:o=8,i|=8;break;case Qu:return t=Nt(12,n,e,i|2),t.elementType=Qu,t.lanes=s,t;case Xu:return t=Nt(13,n,e,i),t.elementType=Xu,t.lanes=s,t;case Ju:return t=Nt(19,n,e,i),t.elementType=Ju,t.lanes=s,t;case yy:return sc(n,i,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case gy:o=10;break e;case vy:o=9;break e;case wh:o=11;break e;case Eh:o=14;break e;case Un:o=16,r=null;break e}throw Error(O(130,t==null?t:typeof t,""))}return e=Nt(o,n,e,i),e.elementType=t,e.type=r,e.lanes=s,e}function Ar(t,e,n,r){return t=Nt(7,t,r,e),t.lanes=n,t}function sc(t,e,n,r){return t=Nt(22,t,r,e),t.elementType=yy,t.lanes=n,t.stateNode={isHidden:!1},t}function Tu(t,e,n){return t=Nt(6,t,null,e),t.lanes=n,t}function Nu(t,e,n){return e=Nt(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function sI(t,e,n,r,i){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=lu(0),this.expirationTimes=lu(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=lu(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function rf(t,e,n,r,i,s,o,l,c){return t=new sI(t,e,n,l,c),e===1?(e=1,s===!0&&(e|=8)):e=0,s=Nt(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},zh(s),t}function oI(t,e,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:oi,key:r==null?null:""+r,children:t,containerInfo:e,implementation:n}}function c_(t){if(!t)return cr;t=t._reactInternals;e:{if(Wr(t)!==t||t.tag!==1)throw Error(O(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(ft(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(O(171))}if(t.tag===1){var n=t.type;if(ft(n))return c0(t,n,e)}return e}function u_(t,e,n,r,i,s,o,l,c){return t=rf(n,r,!0,t,i,s,o,l,c),t.context=c_(null),n=t.current,r=nt(),i=nr(n),s=wn(r,i),s.callback=e??null,er(n,s,i),t.current.lanes=i,Ro(t,i,r),pt(t,r),t}function oc(t,e,n,r){var i=e.current,s=nt(),o=nr(i);return n=c_(n),e.context===null?e.context=n:e.pendingContext=n,e=wn(s,o),e.payload={element:t},r=r===void 0?null:r,r!==null&&(e.callback=r),t=er(i,e,o),t!==null&&(Ht(t,i,o,s),Ma(t,i,o)),o}function xl(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function vg(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function sf(t,e){vg(t,e),(t=t.alternate)&&vg(t,e)}function aI(){return null}var d_=typeof reportError=="function"?reportError:function(t){console.error(t)};function of(t){this._internalRoot=t}ac.prototype.render=of.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(O(409));oc(t,e,null,null)};ac.prototype.unmount=of.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Lr(function(){oc(null,t,null,null)}),e[kn]=null}};function ac(t){this._internalRoot=t}ac.prototype.unstable_scheduleHydration=function(t){if(t){var e=$y();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Vn.length&&e!==0&&e<Vn[n].priority;n++);Vn.splice(n,0,t),n===0&&Hy(t)}};function af(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function lc(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function yg(){}function lI(t,e,n,r,i){if(i){if(typeof r=="function"){var s=r;r=function(){var h=xl(o);s.call(h)}}var o=u_(e,r,t,0,null,!1,!1,"",yg);return t._reactRootContainer=o,t[kn]=o.current,oo(t.nodeType===8?t.parentNode:t),Lr(),o}for(;i=t.lastChild;)t.removeChild(i);if(typeof r=="function"){var l=r;r=function(){var h=xl(c);l.call(h)}}var c=rf(t,0,!1,null,null,!1,!1,"",yg);return t._reactRootContainer=c,t[kn]=c.current,oo(t.nodeType===8?t.parentNode:t),Lr(function(){oc(e,c,n,r)}),c}function cc(t,e,n,r,i){var s=n._reactRootContainer;if(s){var o=s;if(typeof i=="function"){var l=i;i=function(){var c=xl(o);l.call(c)}}oc(e,o,t,i)}else o=lI(n,e,t,i,r);return xl(o)}zy=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=Rs(e.pendingLanes);n!==0&&(kh(e,n|1),pt(e,Ie()),!(Z&6)&&(Mi=Ie()+500,mr()))}break;case 13:Lr(function(){var r=Cn(t,1);if(r!==null){var i=nt();Ht(r,t,1,i)}}),sf(t,1)}};Ch=function(t){if(t.tag===13){var e=Cn(t,134217728);if(e!==null){var n=nt();Ht(e,t,134217728,n)}sf(t,134217728)}};Vy=function(t){if(t.tag===13){var e=nr(t),n=Cn(t,e);if(n!==null){var r=nt();Ht(n,t,e,r)}sf(t,e)}};$y=function(){return ie};By=function(t,e){var n=ie;try{return ie=t,e()}finally{ie=n}};ld=function(t,e,n){switch(e){case"input":if(td(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var r=n[e];if(r!==t&&r.form===t.form){var i=Zl(r);if(!i)throw Error(O(90));xy(r),td(r,i)}}}break;case"textarea":Ey(t,n);break;case"select":e=n.value,e!=null&&xi(t,!!n.multiple,e,!1)}};by=Zh;Ry=Lr;var cI={usingClientEntryPoint:!1,Events:[Po,di,Zl,Ty,Ny,Zh]},Es={findFiberByHostInstance:kr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},uI={bundleType:Es.bundleType,version:Es.version,rendererPackageName:Es.rendererPackageName,rendererConfig:Es.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:An.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=jy(t),t===null?null:t.stateNode},findFiberByHostInstance:Es.findFiberByHostInstance||aI,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ca=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ca.isDisabled&&Ca.supportsFiber)try{Yl=Ca.inject(uI),tn=Ca}catch{}}St.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=cI;St.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!af(e))throw Error(O(200));return oI(t,e,null,n)};St.createRoot=function(t,e){if(!af(t))throw Error(O(299));var n=!1,r="",i=d_;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(r=e.identifierPrefix),e.onRecoverableError!==void 0&&(i=e.onRecoverableError)),e=rf(t,1,!1,null,null,n,!1,r,i),t[kn]=e.current,oo(t.nodeType===8?t.parentNode:t),new of(e)};St.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(O(188)):(t=Object.keys(t).join(","),Error(O(268,t)));return t=jy(e),t=t===null?null:t.stateNode,t};St.flushSync=function(t){return Lr(t)};St.hydrate=function(t,e,n){if(!lc(e))throw Error(O(200));return cc(null,t,e,!0,n)};St.hydrateRoot=function(t,e,n){if(!af(t))throw Error(O(405));var r=n!=null&&n.hydratedSources||null,i=!1,s="",o=d_;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=u_(e,null,t,1,n??null,i,!1,s,o),t[kn]=e.current,oo(t),r)for(t=0;t<r.length;t++)n=r[t],i=n._getVersion,i=i(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,i]:e.mutableSourceEagerHydrationData.push(n,i);return new ac(e)};St.render=function(t,e,n){if(!lc(e))throw Error(O(200));return cc(null,t,e,!1,n)};St.unmountComponentAtNode=function(t){if(!lc(t))throw Error(O(40));return t._reactRootContainer?(Lr(function(){cc(null,null,t,!1,function(){t._reactRootContainer=null,t[kn]=null})}),!0):!1};St.unstable_batchedUpdates=Zh;St.unstable_renderSubtreeIntoContainer=function(t,e,n,r){if(!lc(n))throw Error(O(200));if(t==null||t._reactInternals===void 0)throw Error(O(38));return cc(t,e,n,!1,r)};St.version="18.3.1-next-f1338f8080-20240426";function h_(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(h_)}catch(t){console.error(t)}}h_(),hy.exports=St;var dI=hy.exports,_g=dI;qu.createRoot=_g.createRoot,qu.hydrateRoot=_g.hydrateRoot;/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hI=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),f_=(...t)=>t.filter((e,n,r)=>!!e&&r.indexOf(e)===n).join(" ");/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var fI={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pI=W.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:n=2,absoluteStrokeWidth:r,className:i="",children:s,iconNode:o,...l},c)=>W.createElement("svg",{ref:c,...fI,width:e,height:e,stroke:t,strokeWidth:r?Number(n)*24/Number(e):n,className:f_("lucide",i),...l},[...o.map(([h,m])=>W.createElement(h,m)),...Array.isArray(s)?s:[s]]));/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const re=(t,e)=>{const n=W.forwardRef(({className:r,...i},s)=>W.createElement(pI,{ref:s,iconNode:e,className:f_(`lucide-${hI(t)}`,r),...i}));return n.displayName=`${t}`,n};/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lf=re("Activity",[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uc=re("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mI=re("Award",[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oo=re("Bus",[["path",{d:"M8 6v6",key:"18i7km"}],["path",{d:"M15 6v6",key:"1sg6z9"}],["path",{d:"M2 12h19.6",key:"de5uta"}],["path",{d:"M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3",key:"1wwztk"}],["circle",{cx:"7",cy:"18",r:"2",key:"19iecd"}],["path",{d:"M9 18h5",key:"lrx6i"}],["circle",{cx:"16",cy:"18",r:"2",key:"1v4tcr"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p_=re("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xg=re("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cf=re("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Do=re("CircleCheck",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m_=re("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gI=re("Database",[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vI=re("LayoutDashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fi=re("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g_=re("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yI=re("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dc=re("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wl=re("MapPin",[["path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z",key:"2oe9fu"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _I=re("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xI=re("PenLine",[["path",{d:"M12 20h9",key:"t2du7b"}],["path",{d:"M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",key:"1ykcvy"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v_=re("Phone",[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y_=re("Save",[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wI=re("Scale",[["path",{d:"m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z",key:"7g6ntu"}],["path",{d:"m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z",key:"ijws7r"}],["path",{d:"M7 21h10",key:"1b0cd5"}],["path",{d:"M12 3v18",key:"108xh3"}],["path",{d:"M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2",key:"3gwbw2"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const EI=re("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const SI=re("ShieldAlert",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"M12 8v4",key:"1got3b"}],["path",{d:"M12 16h.01",key:"1drbdi"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const __=re("ShieldCheck",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const II=re("Star",[["polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",key:"8f66p6"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uf=re("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const df=re("TrendingUp",[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x_=re("UserPlus",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"19",x2:"19",y1:"8",y2:"14",key:"1bvyxn"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11",key:"1shjgl"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hf=re("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const El=re("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ff=re("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);var wg={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const w_={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const D=function(t,e){if(!t)throw Qi(e)},Qi=function(t){return new Error("Firebase Database ("+w_.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const E_=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let i=t.charCodeAt(r);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):(i&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},kI=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const i=t[n++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=t[n++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=t[n++],o=t[n++],l=t[n++],c=((i&7)<<18|(s&63)<<12|(o&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{const s=t[n++],o=t[n++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},pf={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<t.length;i+=3){const s=t[i],o=i+1<t.length,l=o?t[i+1]:0,c=i+2<t.length,h=c?t[i+2]:0,m=s>>2,p=(s&3)<<4|l>>4;let v=(l&15)<<2|h>>6,N=h&63;c||(N=64,o||(v=64)),r.push(n[m],n[p],n[v],n[N])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(E_(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):kI(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<t.length;){const s=n[t.charAt(i++)],l=i<t.length?n[t.charAt(i)]:0;++i;const h=i<t.length?n[t.charAt(i)]:64;++i;const p=i<t.length?n[t.charAt(i)]:64;if(++i,s==null||l==null||h==null||p==null)throw new CI;const v=s<<2|l>>4;if(r.push(v),h!==64){const N=l<<4&240|h>>2;if(r.push(N),p!==64){const k=h<<6&192|p;r.push(k)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class CI extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const S_=function(t){const e=E_(t);return pf.encodeByteArray(e,!0)},Sl=function(t){return S_(t).replace(/\./g,"")},Il=function(t){try{return pf.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function TI(t){return I_(void 0,t)}function I_(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!NI(n)||(t[n]=I_(t[n],e[n]));return t}function NI(t){return t!=="__proto__"}/**
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
 */function bI(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const RI=()=>bI().__FIREBASE_DEFAULTS__,AI=()=>{if(typeof process>"u"||typeof wg>"u")return;const t=wg.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},PI=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Il(t[1]);return e&&JSON.parse(e)},mf=()=>{try{return RI()||AI()||PI()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},k_=t=>{var e,n;return(n=(e=mf())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},C_=t=>{const e=k_(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},T_=()=>{var t;return(t=mf())===null||t===void 0?void 0:t.config},N_=t=>{var e;return(e=mf())===null||e===void 0?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lo{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
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
 */function b_(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",i=t.iat||0,s=t.sub||t.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},t);return[Sl(JSON.stringify(n)),Sl(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function it(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function gf(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(it())}function jI(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function R_(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function A_(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function OI(){const t=it();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function DI(){return w_.NODE_ADMIN===!0}function P_(){try{return typeof indexedDB=="object"}catch{return!1}}function j_(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(n){e(n)}})}function LI(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const MI="FirebaseError";class Yt extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=MI,Object.setPrototypeOf(this,Yt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Gr.prototype.create)}}class Gr{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?FI(s,r):"Error",l=`${this.serviceName}: ${o} (${i}).`;return new Yt(i,l,r)}}function FI(t,e){return t.replace(UI,(n,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const UI=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function go(t){return JSON.parse(t)}function Ne(t){return JSON.stringify(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const O_=function(t){let e={},n={},r={},i="";try{const s=t.split(".");e=go(Il(s[0])||""),n=go(Il(s[1])||""),i=s[2],r=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:r,signature:i}},zI=function(t){const e=O_(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},VI=function(t){const e=O_(t).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function on(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function Ui(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function Vd(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function kl(t,e,n){const r={};for(const i in t)Object.prototype.hasOwnProperty.call(t,i)&&(r[i]=e.call(n,t[i],i,t));return r}function vo(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const i of n){if(!r.includes(i))return!1;const s=t[i],o=e[i];if(Eg(s)&&Eg(o)){if(!vo(s,o))return!1}else if(s!==o)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function Eg(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xi(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Ps(t){const e={};return t.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function js(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $I{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const r=this.W_;if(typeof e=="string")for(let p=0;p<16;p++)r[p]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let p=0;p<16;p++)r[p]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let p=16;p<80;p++){const v=r[p-3]^r[p-8]^r[p-14]^r[p-16];r[p]=(v<<1|v>>>31)&4294967295}let i=this.chain_[0],s=this.chain_[1],o=this.chain_[2],l=this.chain_[3],c=this.chain_[4],h,m;for(let p=0;p<80;p++){p<40?p<20?(h=l^s&(o^l),m=1518500249):(h=s^o^l,m=1859775393):p<60?(h=s&o|l&(s|o),m=2400959708):(h=s^o^l,m=3395469782);const v=(i<<5|i>>>27)+h+c+m+r[p]&4294967295;c=l,l=o,o=(s<<30|s>>>2)&4294967295,s=i,i=v}this.chain_[0]=this.chain_[0]+i&4294967295,this.chain_[1]=this.chain_[1]+s&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+l&4294967295,this.chain_[4]=this.chain_[4]+c&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const r=n-this.blockSize;let i=0;const s=this.buf_;let o=this.inbuf_;for(;i<n;){if(o===0)for(;i<=r;)this.compress_(e,i),i+=this.blockSize;if(typeof e=="string"){for(;i<n;)if(s[o]=e.charCodeAt(i),++o,++i,o===this.blockSize){this.compress_(s),o=0;break}}else for(;i<n;)if(s[o]=e[i],++o,++i,o===this.blockSize){this.compress_(s),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let i=this.blockSize-1;i>=56;i--)this.buf_[i]=n&255,n/=256;this.compress_(this.buf_);let r=0;for(let i=0;i<5;i++)for(let s=24;s>=0;s-=8)e[r]=this.chain_[i]>>s&255,++r;return e}}function BI(t,e){const n=new HI(t,e);return n.subscribe.bind(n)}class HI{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let i;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");WI(e,["next","error","complete"])?i=e:i={next:e,error:n,complete:r},i.next===void 0&&(i.next=bu),i.error===void 0&&(i.error=bu),i.complete===void 0&&(i.complete=bu);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function WI(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function bu(){}function hc(t,e){return`${t} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const GI=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let i=t.charCodeAt(r);if(i>=55296&&i<=56319){const s=i-55296;r++,D(r<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(r)-56320;i=65536+(s<<10)+o}i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):i<65536?(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},fc=function(t){let e=0;for(let n=0;n<t.length;n++){const r=t.charCodeAt(n);r<128?e++:r<2048?e+=2:r>=55296&&r<=56319?(e+=4,n++):e+=3}return e};/**
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
 */const KI=1e3,qI=2,YI=4*60*60*1e3,QI=.5;function Sg(t,e=KI,n=qI){const r=e*Math.pow(n,t),i=Math.round(QI*r*(Math.random()-.5)*2);return Math.min(YI,r+i)}/**
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
 */const Sr="[DEFAULT]";/**
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
 */class XI{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new Lo;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(ZI(e))try{this.getOrInitializeService({instanceIdentifier:Sr})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=Sr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Sr){return this.instances.has(e)}getOptions(e=Sr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[s,o]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(s);r===l&&o.resolve(i)}return i}onInit(e,n){var r;const i=this.normalizeInstanceIdentifier(n),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);const o=this.instances.get(i);return o&&e(o,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const i of r)try{i(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:JI(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Sr){return this.component?this.component.multipleInstances?e:Sr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function JI(t){return t===Sr?void 0:t}function ZI(t){return t.instantiationMode==="EAGER"}/**
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
 */class ek{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new XI(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ne;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(ne||(ne={}));const tk={debug:ne.DEBUG,verbose:ne.VERBOSE,info:ne.INFO,warn:ne.WARN,error:ne.ERROR,silent:ne.SILENT},nk=ne.INFO,rk={[ne.DEBUG]:"log",[ne.VERBOSE]:"log",[ne.INFO]:"info",[ne.WARN]:"warn",[ne.ERROR]:"error"},ik=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),i=rk[e];if(i)console[i](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Mo{constructor(e){this.name=e,this._logLevel=nk,this._logHandler=ik,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ne))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?tk[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ne.DEBUG,...e),this._logHandler(this,ne.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ne.VERBOSE,...e),this._logHandler(this,ne.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ne.INFO,...e),this._logHandler(this,ne.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ne.WARN,...e),this._logHandler(this,ne.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ne.ERROR,...e),this._logHandler(this,ne.ERROR,...e)}}const sk=(t,e)=>e.some(n=>t instanceof n);let Ig,kg;function ok(){return Ig||(Ig=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function ak(){return kg||(kg=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const D_=new WeakMap,$d=new WeakMap,L_=new WeakMap,Ru=new WeakMap,vf=new WeakMap;function lk(t){const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("success",s),t.removeEventListener("error",o)},s=()=>{n(ir(t.result)),i()},o=()=>{r(t.error),i()};t.addEventListener("success",s),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&D_.set(n,t)}).catch(()=>{}),vf.set(e,t),e}function ck(t){if($d.has(t))return;const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("complete",s),t.removeEventListener("error",o),t.removeEventListener("abort",o)},s=()=>{n(),i()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",s),t.addEventListener("error",o),t.addEventListener("abort",o)});$d.set(t,e)}let Bd={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return $d.get(t);if(e==="objectStoreNames")return t.objectStoreNames||L_.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return ir(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function uk(t){Bd=t(Bd)}function dk(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(Au(this),e,...n);return L_.set(r,e.sort?e.sort():[e]),ir(r)}:ak().includes(t)?function(...e){return t.apply(Au(this),e),ir(D_.get(this))}:function(...e){return ir(t.apply(Au(this),e))}}function hk(t){return typeof t=="function"?dk(t):(t instanceof IDBTransaction&&ck(t),sk(t,ok())?new Proxy(t,Bd):t)}function ir(t){if(t instanceof IDBRequest)return lk(t);if(Ru.has(t))return Ru.get(t);const e=hk(t);return e!==t&&(Ru.set(t,e),vf.set(e,t)),e}const Au=t=>vf.get(t);function M_(t,e,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(t,e),l=ir(o);return r&&o.addEventListener("upgradeneeded",c=>{r(ir(o.result),c.oldVersion,c.newVersion,ir(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),l.then(c=>{s&&c.addEventListener("close",()=>s()),i&&c.addEventListener("versionchange",h=>i(h.oldVersion,h.newVersion,h))}).catch(()=>{}),l}const fk=["get","getKey","getAll","getAllKeys","count"],pk=["put","add","delete","clear"],Pu=new Map;function Cg(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Pu.get(e))return Pu.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,i=pk.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||fk.includes(n)))return;const s=async function(o,...l){const c=this.transaction(o,i?"readwrite":"readonly");let h=c.store;return r&&(h=h.index(l.shift())),(await Promise.all([h[n](...l),i&&c.done]))[0]};return Pu.set(e,s),s}uk(t=>({...t,get:(e,n,r)=>Cg(e,n)||t.get(e,n,r),has:(e,n)=>!!Cg(e,n)||t.has(e,n)}));/**
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
 */class mk{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(gk(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function gk(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Hd="@firebase/app",Tg="0.10.13";/**
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
 */const Nn=new Mo("@firebase/app"),vk="@firebase/app-compat",yk="@firebase/analytics-compat",_k="@firebase/analytics",xk="@firebase/app-check-compat",wk="@firebase/app-check",Ek="@firebase/auth",Sk="@firebase/auth-compat",Ik="@firebase/database",kk="@firebase/data-connect",Ck="@firebase/database-compat",Tk="@firebase/functions",Nk="@firebase/functions-compat",bk="@firebase/installations",Rk="@firebase/installations-compat",Ak="@firebase/messaging",Pk="@firebase/messaging-compat",jk="@firebase/performance",Ok="@firebase/performance-compat",Dk="@firebase/remote-config",Lk="@firebase/remote-config-compat",Mk="@firebase/storage",Fk="@firebase/storage-compat",Uk="@firebase/firestore",zk="@firebase/vertexai-preview",Vk="@firebase/firestore-compat",$k="firebase",Bk="10.14.1";/**
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
 */const Wd="[DEFAULT]",Hk={[Hd]:"fire-core",[vk]:"fire-core-compat",[_k]:"fire-analytics",[yk]:"fire-analytics-compat",[wk]:"fire-app-check",[xk]:"fire-app-check-compat",[Ek]:"fire-auth",[Sk]:"fire-auth-compat",[Ik]:"fire-rtdb",[kk]:"fire-data-connect",[Ck]:"fire-rtdb-compat",[Tk]:"fire-fn",[Nk]:"fire-fn-compat",[bk]:"fire-iid",[Rk]:"fire-iid-compat",[Ak]:"fire-fcm",[Pk]:"fire-fcm-compat",[jk]:"fire-perf",[Ok]:"fire-perf-compat",[Dk]:"fire-rc",[Lk]:"fire-rc-compat",[Mk]:"fire-gcs",[Fk]:"fire-gcs-compat",[Uk]:"fire-fst",[Vk]:"fire-fst-compat",[zk]:"fire-vertex","fire-js":"fire-js",[$k]:"fire-js-all"};/**
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
 */const Cl=new Map,Wk=new Map,Gd=new Map;function Ng(t,e){try{t.container.addComponent(e)}catch(n){Nn.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Kt(t){const e=t.name;if(Gd.has(e))return Nn.debug(`There were multiple attempts to register component ${e}.`),!1;Gd.set(e,t);for(const n of Cl.values())Ng(n,t);for(const n of Wk.values())Ng(n,t);return!0}function gr(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function en(t){return t.settings!==void 0}/**
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
 */const Gk={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},sr=new Gr("app","Firebase",Gk);/**
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
 */class Kk{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new jt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw sr.create("app-deleted",{appName:this._name})}}/**
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
 */const Kr=Bk;function F_(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Wd,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw sr.create("bad-app-name",{appName:String(i)});if(n||(n=T_()),!n)throw sr.create("no-options");const s=Cl.get(i);if(s){if(vo(n,s.options)&&vo(r,s.config))return s;throw sr.create("duplicate-app",{appName:i})}const o=new ek(i);for(const c of Gd.values())o.addComponent(c);const l=new Kk(n,r,o);return Cl.set(i,l),l}function pc(t=Wd){const e=Cl.get(t);if(!e&&t===Wd&&T_())return F_();if(!e)throw sr.create("no-app",{appName:t});return e}function mt(t,e,n){var r;let i=(r=Hk[t])!==null&&r!==void 0?r:t;n&&(i+=`-${n}`);const s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){const l=[`Unable to register library "${i}" with version "${e}":`];s&&l.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&l.push("and"),o&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Nn.warn(l.join(" "));return}Kt(new jt(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
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
 */const qk="firebase-heartbeat-database",Yk=1,yo="firebase-heartbeat-store";let ju=null;function U_(){return ju||(ju=M_(qk,Yk,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(yo)}catch(n){console.warn(n)}}}}).catch(t=>{throw sr.create("idb-open",{originalErrorMessage:t.message})})),ju}async function Qk(t){try{const n=(await U_()).transaction(yo),r=await n.objectStore(yo).get(z_(t));return await n.done,r}catch(e){if(e instanceof Yt)Nn.warn(e.message);else{const n=sr.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Nn.warn(n.message)}}}async function bg(t,e){try{const r=(await U_()).transaction(yo,"readwrite");await r.objectStore(yo).put(e,z_(t)),await r.done}catch(n){if(n instanceof Yt)Nn.warn(n.message);else{const r=sr.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Nn.warn(r.message)}}}function z_(t){return`${t.name}!${t.options.appId}`}/**
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
 */const Xk=1024,Jk=30*24*60*60*1e3;class Zk{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new tC(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Rg();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s)?void 0:(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const l=new Date(o.date).valueOf();return Date.now()-l<=Jk}),this._storage.overwrite(this._heartbeatsCache))}catch(r){Nn.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Rg(),{heartbeatsToSend:r,unsentEntries:i}=eC(this._heartbeatsCache.heartbeats),s=Sl(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(n){return Nn.warn(n),""}}}function Rg(){return new Date().toISOString().substring(0,10)}function eC(t,e=Xk){const n=[];let r=t.slice();for(const i of t){const s=n.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),Ag(n)>e){s.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),Ag(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class tC{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return P_()?j_().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await Qk(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return bg(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return bg(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function Ag(t){return Sl(JSON.stringify({version:2,heartbeats:t})).length}/**
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
 */function nC(t){Kt(new jt("platform-logger",e=>new mk(e),"PRIVATE")),Kt(new jt("heartbeat",e=>new Zk(e),"PRIVATE")),mt(Hd,Tg,t),mt(Hd,Tg,"esm2017"),mt("fire-js","")}nC("");function yf(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(t);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(t,r[i])&&(n[r[i]]=t[r[i]]);return n}function V_(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const rC=V_,$_=new Gr("auth","Firebase",V_());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tl=new Mo("@firebase/auth");function iC(t,...e){Tl.logLevel<=ne.WARN&&Tl.warn(`Auth (${Kr}): ${t}`,...e)}function Ha(t,...e){Tl.logLevel<=ne.ERROR&&Tl.error(`Auth (${Kr}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qt(t,...e){throw _f(t,...e)}function rn(t,...e){return _f(t,...e)}function B_(t,e,n){const r=Object.assign(Object.assign({},rC()),{[e]:n});return new Gr("auth","Firebase",r).create(e,{appName:t.name})}function En(t){return B_(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function _f(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return $_.create(t,...e)}function H(t,e,...n){if(!t)throw _f(e,...n)}function vn(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Ha(e),new Error(e)}function bn(t,e){t||vn(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kd(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function sC(){return Pg()==="http:"||Pg()==="https:"}function Pg(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oC(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(sC()||R_()||"connection"in navigator)?navigator.onLine:!0}function aC(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fo{constructor(e,n){this.shortDelay=e,this.longDelay=n,bn(n>e,"Short delay should be less than long delay!"),this.isMobile=gf()||A_()}get(){return oC()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xf(t,e){bn(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class H_{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;vn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;vn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;vn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lC={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cC=new Fo(3e4,6e4);function vr(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function Pn(t,e,n,r,i={}){return W_(t,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});const l=Xi(Object.assign({key:t.config.apiKey},o)).slice(1),c=await t._getAdditionalHeaders();c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode);const h=Object.assign({method:e,headers:c},s);return jI()||(h.referrerPolicy="no-referrer"),H_.fetch()(G_(t,t.config.apiHost,n,l),h)})}async function W_(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},lC),e);try{const i=new dC(t),s=await Promise.race([n(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw Ta(t,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const l=s.ok?o.errorMessage:o.error.message,[c,h]=l.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Ta(t,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw Ta(t,"email-already-in-use",o);if(c==="USER_DISABLED")throw Ta(t,"user-disabled",o);const m=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw B_(t,m,h);qt(t,m)}}catch(i){if(i instanceof Yt)throw i;qt(t,"network-request-failed",{message:String(i)})}}async function Uo(t,e,n,r,i={}){const s=await Pn(t,e,n,r,i);return"mfaPendingCredential"in s&&qt(t,"multi-factor-auth-required",{_serverResponse:s}),s}function G_(t,e,n,r){const i=`${e}${n}?${r}`;return t.config.emulator?xf(t.config,i):`${t.config.apiScheme}://${i}`}function uC(t){switch(t){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class dC{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(rn(this.auth,"network-request-failed")),cC.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Ta(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const i=rn(t,e,r);return i.customData._tokenResponse=n,i}function jg(t){return t!==void 0&&t.enterprise!==void 0}class hC{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===e)return uC(n.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}async function fC(t,e){return Pn(t,"GET","/v2/recaptchaConfig",vr(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pC(t,e){return Pn(t,"POST","/v1/accounts:delete",e)}async function K_(t,e){return Pn(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bs(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function mC(t,e=!1){const n=Oe(t),r=await n.getIdToken(e),i=wf(r);H(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:Bs(Ou(i.auth_time)),issuedAtTime:Bs(Ou(i.iat)),expirationTime:Bs(Ou(i.exp)),signInProvider:o||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function Ou(t){return Number(t)*1e3}function wf(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return Ha("JWT malformed, contained fewer than 3 sections"),null;try{const i=Il(n);return i?JSON.parse(i):(Ha("Failed to decode base64 JWT payload"),null)}catch(i){return Ha("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function Og(t){const e=wf(t);return H(e,"internal-error"),H(typeof e.exp<"u","internal-error"),H(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zi(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof Yt&&gC(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function gC({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vC{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const i=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qd{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Bs(this.lastLoginAt),this.creationTime=Bs(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Nl(t){var e;const n=t.auth,r=await t.getIdToken(),i=await zi(t,K_(n,{idToken:r}));H(i==null?void 0:i.users.length,n,"internal-error");const s=i.users[0];t._notifyReloadListener(s);const o=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?q_(s.providerUserInfo):[],l=_C(t.providerData,o),c=t.isAnonymous,h=!(t.email&&s.passwordHash)&&!(l!=null&&l.length),m=c?h:!1,p={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:l,metadata:new qd(s.createdAt,s.lastLoginAt),isAnonymous:m};Object.assign(t,p)}async function yC(t){const e=Oe(t);await Nl(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function _C(t,e){return[...t.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function q_(t){return t.map(e=>{var{providerId:n}=e,r=yf(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xC(t,e){const n=await W_(t,{},async()=>{const r=Xi({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=t.config,o=G_(t,i,"/v1/token",`key=${s}`),l=await t._getAdditionalHeaders();return l["Content-Type"]="application/x-www-form-urlencoded",H_.fetch()(o,{method:"POST",headers:l,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function wC(t,e){return Pn(t,"POST","/v2/accounts:revokeToken",vr(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ci{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){H(e.idToken,"internal-error"),H(typeof e.idToken<"u","internal-error"),H(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Og(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){H(e.length!==0,"internal-error");const n=Og(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(H(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:i,expiresIn:s}=await xC(e,n);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:i,expirationTime:s}=n,o=new Ci;return r&&(H(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(H(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(H(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Ci,this.toJSON())}_performRefresh(){return vn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fn(t,e){H(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class yn{constructor(e){var{uid:n,auth:r,stsTokenManager:i}=e,s=yf(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new vC(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new qd(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const n=await zi(this,this.stsTokenManager.getToken(this.auth,e));return H(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return mC(this,e)}reload(){return yC(this)}_assign(e){this!==e&&(H(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new yn(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){H(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await Nl(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(en(this.auth.app))return Promise.reject(En(this.auth));const e=await this.getIdToken();return await zi(this,pC(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,i,s,o,l,c,h,m;const p=(r=n.displayName)!==null&&r!==void 0?r:void 0,v=(i=n.email)!==null&&i!==void 0?i:void 0,N=(s=n.phoneNumber)!==null&&s!==void 0?s:void 0,k=(o=n.photoURL)!==null&&o!==void 0?o:void 0,P=(l=n.tenantId)!==null&&l!==void 0?l:void 0,M=(c=n._redirectEventId)!==null&&c!==void 0?c:void 0,I=(h=n.createdAt)!==null&&h!==void 0?h:void 0,w=(m=n.lastLoginAt)!==null&&m!==void 0?m:void 0,{uid:T,emailVerified:j,isAnonymous:F,providerData:U,stsTokenManager:E}=n;H(T&&E,e,"internal-error");const y=Ci.fromJSON(this.name,E);H(typeof T=="string",e,"internal-error"),Fn(p,e.name),Fn(v,e.name),H(typeof j=="boolean",e,"internal-error"),H(typeof F=="boolean",e,"internal-error"),Fn(N,e.name),Fn(k,e.name),Fn(P,e.name),Fn(M,e.name),Fn(I,e.name),Fn(w,e.name);const _=new yn({uid:T,auth:e,email:v,emailVerified:j,displayName:p,isAnonymous:F,photoURL:k,phoneNumber:N,tenantId:P,stsTokenManager:y,createdAt:I,lastLoginAt:w});return U&&Array.isArray(U)&&(_.providerData=U.map(S=>Object.assign({},S))),M&&(_._redirectEventId=M),_}static async _fromIdTokenResponse(e,n,r=!1){const i=new Ci;i.updateFromServerResponse(n);const s=new yn({uid:n.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await Nl(s),s}static async _fromGetAccountInfoResponse(e,n,r){const i=n.users[0];H(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?q_(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),l=new Ci;l.updateFromIdToken(r);const c=new yn({uid:i.localId,auth:e,stsTokenManager:l,isAnonymous:o}),h={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new qd(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(c,h),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dg=new Map;function _n(t){bn(t instanceof Function,"Expected a class definition");let e=Dg.get(t);return e?(bn(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Dg.set(t,e),e)}/**
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
 */class Y_{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Y_.type="NONE";const Lg=Y_;/**
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
 */function Wa(t,e,n){return`firebase:${t}:${e}:${n}`}class Ti{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=Wa(this.userKey,i.apiKey,s),this.fullPersistenceKey=Wa("persistence",i.apiKey,s),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?yn._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new Ti(_n(Lg),e,r);const i=(await Promise.all(n.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let s=i[0]||_n(Lg);const o=Wa(r,e.config.apiKey,e.name);let l=null;for(const h of n)try{const m=await h._get(o);if(m){const p=yn._fromJSON(e,m);h!==s&&(l=p),s=h;break}}catch{}const c=i.filter(h=>h._shouldAllowMigration);return!s._shouldAllowMigration||!c.length?new Ti(s,e,r):(s=c[0],l&&await s._set(o,l.toJSON()),await Promise.all(n.map(async h=>{if(h!==s)try{await h._remove(o)}catch{}})),new Ti(s,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mg(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Z_(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Q_(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(tx(e))return"Blackberry";if(nx(e))return"Webos";if(X_(e))return"Safari";if((e.includes("chrome/")||J_(e))&&!e.includes("edge/"))return"Chrome";if(ex(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Q_(t=it()){return/firefox\//i.test(t)}function X_(t=it()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function J_(t=it()){return/crios\//i.test(t)}function Z_(t=it()){return/iemobile/i.test(t)}function ex(t=it()){return/android/i.test(t)}function tx(t=it()){return/blackberry/i.test(t)}function nx(t=it()){return/webos/i.test(t)}function Ef(t=it()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function EC(t=it()){var e;return Ef(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function SC(){return OI()&&document.documentMode===10}function rx(t=it()){return Ef(t)||ex(t)||nx(t)||tx(t)||/windows phone/i.test(t)||Z_(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ix(t,e=[]){let n;switch(t){case"Browser":n=Mg(it());break;case"Worker":n=`${Mg(it())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Kr}/${r}`}/**
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
 */class IC{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=s=>new Promise((o,l)=>{try{const c=e(s);o(c)}catch(c){l(c)}});r.onAbort=n,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const i of n)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
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
 */async function kC(t,e={}){return Pn(t,"GET","/v2/passwordPolicy",vr(t,e))}/**
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
 */const CC=6;class TC{constructor(e){var n,r,i,s;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=o.minPasswordLength)!==null&&n!==void 0?n:CC,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,i,s,o,l;const c={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,c),this.validatePasswordCharacterOptions(e,c),c.isValid&&(c.isValid=(n=c.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),c.isValid&&(c.isValid=(r=c.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),c.isValid&&(c.isValid=(i=c.containsLowercaseLetter)!==null&&i!==void 0?i:!0),c.isValid&&(c.isValid=(s=c.containsUppercaseLetter)!==null&&s!==void 0?s:!0),c.isValid&&(c.isValid=(o=c.containsNumericCharacter)!==null&&o!==void 0?o:!0),c.isValid&&(c.isValid=(l=c.containsNonAlphanumericCharacter)!==null&&l!==void 0?l:!0),c}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),i&&(n.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NC{constructor(e,n,r,i){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Fg(this),this.idTokenSubscription=new Fg(this),this.beforeStateQueue=new IC(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=$_,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=_n(n)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await Ti.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await K_(this,{idToken:e}),r=await yn._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(en(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(l,l))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,l=i==null?void 0:i._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===l)&&(c!=null&&c.user)&&(i=c.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return H(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Nl(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=aC()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(en(this.app))return Promise.reject(En(this));const n=e?Oe(e):null;return n&&H(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&H(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return en(this.app)?Promise.reject(En(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return en(this.app)?Promise.reject(En(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(_n(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await kC(this),n=new TC(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Gr("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await wC(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&_n(e)||this._popupRedirectResolver;H(n,this,"argument-error"),this.redirectPersistenceManager=await Ti.create(this,[_n(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,i){if(this._deleted)return()=>{};const s=typeof n=="function"?n:n.next.bind(n);let o=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(H(l,this,"internal-error"),l.then(()=>{o||s(this.currentUser)}),typeof n=="function"){const c=e.addObserver(n,r,i);return()=>{o=!0,c()}}else{const c=e.addObserver(n);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return H(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=ix(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const i=await this._getAppCheckToken();return i&&(n["X-Firebase-AppCheck"]=i),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&iC(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function qr(t){return Oe(t)}class Fg{constructor(e){this.auth=e,this.observer=null,this.addObserver=BI(n=>this.observer=n)}get next(){return H(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let mc={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function bC(t){mc=t}function sx(t){return mc.loadJS(t)}function RC(){return mc.recaptchaEnterpriseScript}function AC(){return mc.gapiScript}function PC(t){return`__${t}${Math.floor(Math.random()*1e6)}`}const jC="recaptcha-enterprise",OC="NO_RECAPTCHA";class DC{constructor(e){this.type=jC,this.auth=qr(e)}async verify(e="verify",n=!1){async function r(s){if(!n){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(o,l)=>{fC(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)l(new Error("recaptcha Enterprise site key undefined"));else{const h=new hC(c);return s.tenantId==null?s._agentRecaptchaConfig=h:s._tenantRecaptchaConfigs[s.tenantId]=h,o(h.siteKey)}}).catch(c=>{l(c)})})}function i(s,o,l){const c=window.grecaptcha;jg(c)?c.enterprise.ready(()=>{c.enterprise.execute(s,{action:e}).then(h=>{o(h)}).catch(()=>{o(OC)})}):l(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((s,o)=>{r(this.auth).then(l=>{if(!n&&jg(window.grecaptcha))i(l,s,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let c=RC();c.length!==0&&(c+=l),sx(c).then(()=>{i(l,s,o)}).catch(h=>{o(h)})}}).catch(l=>{o(l)})})}}async function Ug(t,e,n,r=!1){const i=new DC(t);let s;try{s=await i.verify(n)}catch{s=await i.verify(n,!0)}const o=Object.assign({},e);return r?Object.assign(o,{captchaResp:s}):Object.assign(o,{captchaResponse:s}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function Yd(t,e,n,r){var i;if(!((i=t._getRecaptchaConfig())===null||i===void 0)&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const s=await Ug(t,e,n,n==="getOobCode");return r(t,s)}else return r(t,e).catch(async s=>{if(s.code==="auth/missing-recaptcha-token"){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await Ug(t,e,n,n==="getOobCode");return r(t,o)}else return Promise.reject(s)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function LC(t,e){const n=gr(t,"auth");if(n.isInitialized()){const i=n.getImmediate(),s=n.getOptions();if(vo(s,e??{}))return i;qt(i,"already-initialized")}return n.initialize({options:e})}function MC(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(_n);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function FC(t,e,n){const r=qr(t);H(r._canInitEmulator,r,"emulator-config-failed"),H(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,s=ox(e),{host:o,port:l}=UC(e),c=l===null?"":`:${l}`;r.config.emulator={url:`${s}//${o}${c}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:l,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})}),zC()}function ox(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function UC(t){const e=ox(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:zg(r.substr(s.length+1))}}else{const[s,o]=r.split(":");return{host:s,port:zg(o)}}}function zg(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function zC(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sf{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return vn("not implemented")}_getIdTokenResponse(e){return vn("not implemented")}_linkToIdToken(e,n){return vn("not implemented")}_getReauthenticationResolver(e){return vn("not implemented")}}async function VC(t,e){return Pn(t,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $C(t,e){return Uo(t,"POST","/v1/accounts:signInWithPassword",vr(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function BC(t,e){return Uo(t,"POST","/v1/accounts:signInWithEmailLink",vr(t,e))}async function HC(t,e){return Uo(t,"POST","/v1/accounts:signInWithEmailLink",vr(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _o extends Sf{constructor(e,n,r,i=null){super("password",r),this._email=e,this._password=n,this._tenantId=i}static _fromEmailAndPassword(e,n){return new _o(e,n,"password")}static _fromEmailAndCode(e,n,r=null){return new _o(e,n,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Yd(e,n,"signInWithPassword",$C);case"emailLink":return BC(e,{email:this._email,oobCode:this._password});default:qt(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":const r={idToken:n,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Yd(e,r,"signUpPassword",VC);case"emailLink":return HC(e,{idToken:n,email:this._email,oobCode:this._password});default:qt(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ni(t,e){return Uo(t,"POST","/v1/accounts:signInWithIdp",vr(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const WC="http://localhost";class Mr extends Sf{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new Mr(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):qt("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=n,s=yf(n,["providerId","signInMethod"]);if(!r||!i)return null;const o=new Mr(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Ni(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,Ni(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Ni(e,n)}buildRequest(){const e={requestUri:WC,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Xi(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function GC(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function KC(t){const e=Ps(js(t)).link,n=e?Ps(js(e)).deep_link_id:null,r=Ps(js(t)).deep_link_id;return(r?Ps(js(r)).link:null)||r||n||e||t}class If{constructor(e){var n,r,i,s,o,l;const c=Ps(js(e)),h=(n=c.apiKey)!==null&&n!==void 0?n:null,m=(r=c.oobCode)!==null&&r!==void 0?r:null,p=GC((i=c.mode)!==null&&i!==void 0?i:null);H(h&&m&&p,"argument-error"),this.apiKey=h,this.operation=p,this.code=m,this.continueUrl=(s=c.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(o=c.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(l=c.tenantId)!==null&&l!==void 0?l:null}static parseLink(e){const n=KC(e);try{return new If(n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ji{constructor(){this.providerId=Ji.PROVIDER_ID}static credential(e,n){return _o._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const r=If.parseLink(n);return H(r,"argument-error"),_o._fromEmailAndCode(e,r.code,r.tenantId)}}Ji.PROVIDER_ID="password";Ji.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Ji.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ax{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class zo extends ax{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bn extends zo{constructor(){super("facebook.com")}static credential(e){return Mr._fromParams({providerId:Bn.PROVIDER_ID,signInMethod:Bn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Bn.credentialFromTaggedObject(e)}static credentialFromError(e){return Bn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Bn.credential(e.oauthAccessToken)}catch{return null}}}Bn.FACEBOOK_SIGN_IN_METHOD="facebook.com";Bn.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hn extends zo{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return Mr._fromParams({providerId:Hn.PROVIDER_ID,signInMethod:Hn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Hn.credentialFromTaggedObject(e)}static credentialFromError(e){return Hn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return Hn.credential(n,r)}catch{return null}}}Hn.GOOGLE_SIGN_IN_METHOD="google.com";Hn.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wn extends zo{constructor(){super("github.com")}static credential(e){return Mr._fromParams({providerId:Wn.PROVIDER_ID,signInMethod:Wn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Wn.credentialFromTaggedObject(e)}static credentialFromError(e){return Wn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Wn.credential(e.oauthAccessToken)}catch{return null}}}Wn.GITHUB_SIGN_IN_METHOD="github.com";Wn.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gn extends zo{constructor(){super("twitter.com")}static credential(e,n){return Mr._fromParams({providerId:Gn.PROVIDER_ID,signInMethod:Gn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Gn.credentialFromTaggedObject(e)}static credentialFromError(e){return Gn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return Gn.credential(n,r)}catch{return null}}}Gn.TWITTER_SIGN_IN_METHOD="twitter.com";Gn.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qC(t,e){return Uo(t,"POST","/v1/accounts:signUp",vr(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fr{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,i=!1){const s=await yn._fromIdTokenResponse(e,r,i),o=Vg(r);return new Fr({user:s,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const i=Vg(r);return new Fr({user:e,providerId:i,_tokenResponse:r,operationType:n})}}function Vg(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bl extends Yt{constructor(e,n,r,i){var s;super(n.code,n.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,bl.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,i){return new bl(e,n,r,i)}}function lx(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?bl._fromErrorAndOperation(t,s,e,r):s})}async function YC(t,e,n=!1){const r=await zi(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Fr._forOperation(t,"link",r)}/**
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
 */async function QC(t,e,n=!1){const{auth:r}=t;if(en(r.app))return Promise.reject(En(r));const i="reauthenticate";try{const s=await zi(t,lx(r,i,e,t),n);H(s.idToken,r,"internal-error");const o=wf(s.idToken);H(o,r,"internal-error");const{sub:l}=o;return H(t.uid===l,r,"user-mismatch"),Fr._forOperation(t,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&qt(r,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cx(t,e,n=!1){if(en(t.app))return Promise.reject(En(t));const r="signIn",i=await lx(t,r,e),s=await Fr._fromIdTokenResponse(t,r,i);return n||await t._updateCurrentUser(s.user),s}async function XC(t,e){return cx(qr(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ux(t){const e=qr(t);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function JC(t,e,n){if(en(t.app))return Promise.reject(En(t));const r=qr(t),o=await Yd(r,{returnSecureToken:!0,email:e,password:n,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",qC).catch(c=>{throw c.code==="auth/password-does-not-meet-requirements"&&ux(t),c}),l=await Fr._fromIdTokenResponse(r,"signIn",o);return await r._updateCurrentUser(l.user),l}function ZC(t,e,n){return en(t.app)?Promise.reject(En(t)):XC(Oe(t),Ji.credential(e,n)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&ux(t),r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eT(t,e){return Pn(t,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tT(t,{displayName:e,photoURL:n}){if(e===void 0&&n===void 0)return;const r=Oe(t),s={idToken:await r.getIdToken(),displayName:e,photoUrl:n,returnSecureToken:!0},o=await zi(r,eT(r.auth,s));r.displayName=o.displayName||null,r.photoURL=o.photoUrl||null;const l=r.providerData.find(({providerId:c})=>c==="password");l&&(l.displayName=r.displayName,l.photoURL=r.photoURL),await r._updateTokensIfNecessary(o)}function nT(t,e,n,r){return Oe(t).onIdTokenChanged(e,n,r)}function rT(t,e,n){return Oe(t).beforeAuthStateChanged(e,n)}function iT(t,e,n,r){return Oe(t).onAuthStateChanged(e,n,r)}function sT(t){return Oe(t).signOut()}const Rl="__sak";/**
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
 */class dx{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Rl,"1"),this.storage.removeItem(Rl),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oT=1e3,aT=10;class hx extends dx{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=rx(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),i=this.localCache[n];r!==i&&e(n,i,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,l,c)=>{this.notifyListeners(o,c)});return}const r=e.key;n?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);SC()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,aT):i()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},oT)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}hx.type="LOCAL";const lT=hx;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fx extends dx{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}fx.type="SESSION";const px=fx;/**
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
 */function cT(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
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
 */class gc{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(i=>i.isListeningto(e));if(n)return n;const r=new gc(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:i,data:s}=n.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const l=Array.from(o).map(async h=>h(n.origin,s)),c=await cT(l);n.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}gc.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kf(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
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
 */class uT{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((l,c)=>{const h=kf("",20);i.port1.start();const m=setTimeout(()=>{c(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(p){const v=p;if(v.data.eventId===h)switch(v.data.status){case"ack":clearTimeout(m),s=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),l(v.data.response);break;default:clearTimeout(m),clearTimeout(s),c(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:h,data:n},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sn(){return window}function dT(t){sn().location.href=t}/**
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
 */function mx(){return typeof sn().WorkerGlobalScope<"u"&&typeof sn().importScripts=="function"}async function hT(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function fT(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function pT(){return mx()?self:null}/**
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
 */const gx="firebaseLocalStorageDb",mT=1,Al="firebaseLocalStorage",vx="fbase_key";class Vo{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function vc(t,e){return t.transaction([Al],e?"readwrite":"readonly").objectStore(Al)}function gT(){const t=indexedDB.deleteDatabase(gx);return new Vo(t).toPromise()}function Qd(){const t=indexedDB.open(gx,mT);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(Al,{keyPath:vx})}catch(i){n(i)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(Al)?e(r):(r.close(),await gT(),e(await Qd()))})})}async function $g(t,e,n){const r=vc(t,!0).put({[vx]:e,value:n});return new Vo(r).toPromise()}async function vT(t,e){const n=vc(t,!1).get(e),r=await new Vo(n).toPromise();return r===void 0?null:r.value}function Bg(t,e){const n=vc(t,!0).delete(e);return new Vo(n).toPromise()}const yT=800,_T=3;class yx{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Qd(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>_T)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return mx()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=gc._getInstance(pT()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await hT(),!this.activeServiceWorker)return;this.sender=new uT(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||fT()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Qd();return await $g(e,Rl,"1"),await Bg(e,Rl),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>$g(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>vT(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Bg(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=vc(i,!1).getAll();return new Vo(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),n.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),n.push(i));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),yT)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}yx.type="LOCAL";const xT=yx;new Fo(3e4,6e4);/**
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
 */function wT(t,e){return e?_n(e):(H(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
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
 */class Cf extends Sf{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Ni(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Ni(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Ni(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function ET(t){return cx(t.auth,new Cf(t),t.bypassAuthState)}function ST(t){const{auth:e,user:n}=t;return H(n,e,"internal-error"),QC(n,new Cf(t),t.bypassAuthState)}async function IT(t){const{auth:e,user:n}=t;return H(n,e,"internal-error"),YC(n,new Cf(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _x{constructor(e,n,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:i,tenantId:s,error:o,type:l}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:n,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(c))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return ET;case"linkViaPopup":case"linkViaRedirect":return IT;case"reauthViaPopup":case"reauthViaRedirect":return ST;default:qt(this.auth,"internal-error")}}resolve(e){bn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){bn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kT=new Fo(2e3,1e4);class yi extends _x{constructor(e,n,r,i,s){super(e,n,i,s),this.provider=r,this.authWindow=null,this.pollId=null,yi.currentPopupAction&&yi.currentPopupAction.cancel(),yi.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return H(e,this.auth,"internal-error"),e}async onExecution(){bn(this.filter.length===1,"Popup operations only handle one event");const e=kf();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(rn(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(rn(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,yi.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(rn(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,kT.get())};e()}}yi.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CT="pendingRedirect",Ga=new Map;class TT extends _x{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=Ga.get(this.auth._key());if(!e){try{const r=await NT(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}Ga.set(this.auth._key(),e)}return this.bypassAuthState||Ga.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function NT(t,e){const n=AT(e),r=RT(t);if(!await r._isAvailable())return!1;const i=await r._get(n)==="true";return await r._remove(n),i}function bT(t,e){Ga.set(t._key(),e)}function RT(t){return _n(t._redirectPersistence)}function AT(t){return Wa(CT,t.config.apiKey,t.name)}async function PT(t,e,n=!1){if(en(t.app))return Promise.reject(En(t));const r=qr(t),i=wT(r,e),o=await new TT(r,i,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jT=10*60*1e3;class OT{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!DT(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!xx(e)){const i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(rn(this.auth,i))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=jT&&this.cachedEventUids.clear(),this.cachedEventUids.has(Hg(e))}saveEventToCache(e){this.cachedEventUids.add(Hg(e)),this.lastProcessedEventTime=Date.now()}}function Hg(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function xx({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function DT(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return xx(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function LT(t,e={}){return Pn(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const MT=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,FT=/^https?/;async function UT(t){if(t.config.emulator)return;const{authorizedDomains:e}=await LT(t);for(const n of e)try{if(zT(n))return}catch{}qt(t,"unauthorized-domain")}function zT(t){const e=Kd(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!FT.test(n))return!1;if(MT.test(t))return r===t;const i=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
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
 */const VT=new Fo(3e4,6e4);function Wg(){const t=sn().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function $T(t){return new Promise((e,n)=>{var r,i,s;function o(){Wg(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Wg(),n(rn(t,"network-request-failed"))},timeout:VT.get()})}if(!((i=(r=sn().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=sn().gapi)===null||s===void 0)&&s.load)o();else{const l=PC("iframefcb");return sn()[l]=()=>{gapi.load?o():n(rn(t,"network-request-failed"))},sx(`${AC()}?onload=${l}`).catch(c=>n(c))}}).catch(e=>{throw Ka=null,e})}let Ka=null;function BT(t){return Ka=Ka||$T(t),Ka}/**
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
 */const HT=new Fo(5e3,15e3),WT="__/auth/iframe",GT="emulator/auth/iframe",KT={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},qT=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function YT(t){const e=t.config;H(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?xf(e,GT):`https://${t.config.authDomain}/${WT}`,r={apiKey:e.apiKey,appName:t.name,v:Kr},i=qT.get(t.config.apiHost);i&&(r.eid=i);const s=t._getFrameworks();return s.length&&(r.fw=s.join(",")),`${n}?${Xi(r).slice(1)}`}async function QT(t){const e=await BT(t),n=sn().gapi;return H(n,t,"internal-error"),e.open({where:document.body,url:YT(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:KT,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const o=rn(t,"network-request-failed"),l=sn().setTimeout(()=>{s(o)},HT.get());function c(){sn().clearTimeout(l),i(r)}r.ping(c).then(c,()=>{s(o)})}))}/**
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
 */const XT={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},JT=500,ZT=600,eN="_blank",tN="http://localhost";class Gg{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function nN(t,e,n,r=JT,i=ZT){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const c=Object.assign(Object.assign({},XT),{width:r.toString(),height:i.toString(),top:s,left:o}),h=it().toLowerCase();n&&(l=J_(h)?eN:n),Q_(h)&&(e=e||tN,c.scrollbars="yes");const m=Object.entries(c).reduce((v,[N,k])=>`${v}${N}=${k},`,"");if(EC(h)&&l!=="_self")return rN(e||"",l),new Gg(null);const p=window.open(e||"",l,m);H(p,t,"popup-blocked");try{p.focus()}catch{}return new Gg(p)}function rN(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
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
 */const iN="__/auth/handler",sN="emulator/auth/handler",oN=encodeURIComponent("fac");async function Kg(t,e,n,r,i,s){H(t.config.authDomain,t,"auth-domain-config-required"),H(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:Kr,eventId:i};if(e instanceof ax){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",Vd(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[m,p]of Object.entries({}))o[m]=p}if(e instanceof zo){const m=e.getScopes().filter(p=>p!=="");m.length>0&&(o.scopes=m.join(","))}t.tenantId&&(o.tid=t.tenantId);const l=o;for(const m of Object.keys(l))l[m]===void 0&&delete l[m];const c=await t._getAppCheckToken(),h=c?`#${oN}=${encodeURIComponent(c)}`:"";return`${aN(t)}?${Xi(l).slice(1)}${h}`}function aN({config:t}){return t.emulator?xf(t,sN):`https://${t.authDomain}/${iN}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Du="webStorageSupport";class lN{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=px,this._completeRedirectFn=PT,this._overrideRedirectResult=bT}async _openPopup(e,n,r,i){var s;bn((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");const o=await Kg(e,n,r,Kd(),i);return nN(e,o,kf())}async _openRedirect(e,n,r,i){await this._originValidation(e);const s=await Kg(e,n,r,Kd(),i);return dT(s),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:i,promise:s}=this.eventManagers[n];return i?Promise.resolve(i):(bn(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await QT(e),r=new OT(e);return n.register("authEvent",i=>(H(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Du,{type:Du},i=>{var s;const o=(s=i==null?void 0:i[0])===null||s===void 0?void 0:s[Du];o!==void 0&&n(!!o),qt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=UT(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return rx()||X_()||Ef()}}const cN=lN;var qg="@firebase/auth",Yg="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uN{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){H(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dN(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function hN(t){Kt(new jt("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:l}=r.options;H(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const c={apiKey:o,authDomain:l,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:ix(t)},h=new NC(r,i,s,c);return MC(h,n),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),Kt(new jt("auth-internal",e=>{const n=qr(e.getProvider("auth").getImmediate());return(r=>new uN(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),mt(qg,Yg,dN(t)),mt(qg,Yg,"esm2017")}/**
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
 */const fN=5*60,pN=N_("authIdTokenMaxAge")||fN;let Qg=null;const mN=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>pN)return;const i=n==null?void 0:n.token;Qg!==i&&(Qg=i,await fetch(t,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function gN(t=pc()){const e=gr(t,"auth");if(e.isInitialized())return e.getImmediate();const n=LC(t,{popupRedirectResolver:cN,persistence:[xT,lT,px]}),r=N_("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const o=mN(s.toString());rT(n,o,()=>o(n.currentUser)),nT(n,l=>o(l))}}const i=k_("auth");return i&&FC(n,`http://${i}`),n}function vN(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}bC({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=i=>{const s=rn("internal-error");s.customData=i,n(s)},r.type="text/javascript",r.charset="UTF-8",vN().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});hN("Browser");var yN="firebase",_N="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */mt(yN,_N,"app");var Xg={};const Jg="@firebase/database",Zg="1.0.8";/**
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
 */let wx="";function xN(t){wx=t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wN{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),Ne(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:go(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class EN{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return on(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ex=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new wN(e)}}catch{}return new EN},Nr=Ex("localStorage"),SN=Ex("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bi=new Mo("@firebase/database"),IN=function(){let t=1;return function(){return t++}}(),Sx=function(t){const e=GI(t),n=new $I;n.update(e);const r=n.digest();return pf.encodeByteArray(r)},$o=function(...t){let e="";for(let n=0;n<t.length;n++){const r=t[n];Array.isArray(r)||r&&typeof r=="object"&&typeof r.length=="number"?e+=$o.apply(null,r):typeof r=="object"?e+=Ne(r):e+=r,e+=" "}return e};let Hs=null,ev=!0;const kN=function(t,e){D(!0,"Can't turn on custom loggers persistently."),bi.logLevel=ne.VERBOSE,Hs=bi.log.bind(bi)},Me=function(...t){if(ev===!0&&(ev=!1,Hs===null&&SN.get("logging_enabled")===!0&&kN()),Hs){const e=$o.apply(null,t);Hs(e)}},Bo=function(t){return function(...e){Me(t,...e)}},Xd=function(...t){const e="FIREBASE INTERNAL ERROR: "+$o(...t);bi.error(e)},Rn=function(...t){const e=`FIREBASE FATAL ERROR: ${$o(...t)}`;throw bi.error(e),new Error(e)},rt=function(...t){const e="FIREBASE WARNING: "+$o(...t);bi.warn(e)},CN=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&rt("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Tf=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},TN=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},Vi="[MIN_NAME]",Ur="[MAX_NAME]",Yr=function(t,e){if(t===e)return 0;if(t===Vi||e===Ur)return-1;if(e===Vi||t===Ur)return 1;{const n=tv(t),r=tv(e);return n!==null?r!==null?n-r===0?t.length-e.length:n-r:-1:r!==null?1:t<e?-1:1}},NN=function(t,e){return t===e?0:t<e?-1:1},Ss=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+Ne(e))},Nf=function(t){if(typeof t!="object"||t===null)return Ne(t);const e=[];for(const r in t)e.push(r);e.sort();let n="{";for(let r=0;r<e.length;r++)r!==0&&(n+=","),n+=Ne(e[r]),n+=":",n+=Nf(t[e[r]]);return n+="}",n},Ix=function(t,e){const n=t.length;if(n<=e)return[t];const r=[];for(let i=0;i<n;i+=e)i+e>n?r.push(t.substring(i,n)):r.push(t.substring(i,i+e));return r};function ze(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const kx=function(t){D(!Tf(t),"Invalid JSON number");const e=11,n=52,r=(1<<e-1)-1;let i,s,o,l,c;t===0?(s=0,o=0,i=1/t===-1/0?1:0):(i=t<0,t=Math.abs(t),t>=Math.pow(2,1-r)?(l=Math.min(Math.floor(Math.log(t)/Math.LN2),r),s=l+r,o=Math.round(t*Math.pow(2,n-l)-Math.pow(2,n))):(s=0,o=Math.round(t/Math.pow(2,1-r-n))));const h=[];for(c=n;c;c-=1)h.push(o%2?1:0),o=Math.floor(o/2);for(c=e;c;c-=1)h.push(s%2?1:0),s=Math.floor(s/2);h.push(i?1:0),h.reverse();const m=h.join("");let p="";for(c=0;c<64;c+=8){let v=parseInt(m.substr(c,8),2).toString(16);v.length===1&&(v="0"+v),p=p+v}return p.toLowerCase()},bN=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},RN=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function AN(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const r=new Error(t+" at "+e._path.toString()+": "+n);return r.code=t.toUpperCase(),r}const PN=new RegExp("^-?(0*)\\d{1,10}$"),jN=-2147483648,ON=2147483647,tv=function(t){if(PN.test(t)){const e=Number(t);if(e>=jN&&e<=ON)return e}return null},Zi=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw rt("Exception was thrown by user callback.",n),e},Math.floor(0))}},DN=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Ws=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
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
 */class LN{constructor(e,n){this.appName_=e,this.appCheckProvider=n,this.appCheck=n==null?void 0:n.getImmediate({optional:!0}),this.appCheck||n==null||n.get().then(r=>this.appCheck=r)}getToken(e){return this.appCheck?this.appCheck.getToken(e):new Promise((n,r)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,r):n(null)},0)})}addTokenChangeListener(e){var n;(n=this.appCheckProvider)===null||n===void 0||n.get().then(r=>r.addTokenListener(e))}notifyForInvalidToken(){rt(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class MN{constructor(e,n,r){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=r,this.auth_=null,this.auth_=r.getImmediate({optional:!0}),this.auth_||r.onInit(i=>this.auth_=i)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(Me("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,r)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,r):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',rt(e)}}class qa{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}qa.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bf="5",Cx="v",Tx="s",Nx="r",bx="f",Rx=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Ax="ls",Px="p",Jd="ac",jx="websocket",Ox="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dx{constructor(e,n,r,i,s=!1,o="",l=!1,c=!1){this.secure=n,this.namespace=r,this.webSocketOnly=i,this.nodeAdmin=s,this.persistenceKey=o,this.includeNamespaceInQueryParams=l,this.isUsingEmulator=c,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=Nr.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&Nr.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function FN(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function Lx(t,e,n){D(typeof e=="string","typeof type must == string"),D(typeof n=="object","typeof params must == object");let r;if(e===jx)r=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===Ox)r=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);FN(t)&&(n.ns=t.namespace);const i=[];return ze(n,(s,o)=>{i.push(s+"="+o)}),r+i.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UN{constructor(){this.counters_={}}incrementCounter(e,n=1){on(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return TI(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lu={},Mu={};function Rf(t){const e=t.toString();return Lu[e]||(Lu[e]=new UN),Lu[e]}function zN(t,e){const n=t.toString();return Mu[n]||(Mu[n]=e()),Mu[n]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VN{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const r=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let i=0;i<r.length;++i)r[i]&&Zi(()=>{this.onMessage_(r[i])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nv="start",$N="close",BN="pLPCommand",HN="pRTLPCB",Mx="id",Fx="pw",Ux="ser",WN="cb",GN="seg",KN="ts",qN="d",YN="dframe",zx=1870,Vx=30,QN=zx-Vx,XN=25e3,JN=3e4;class _i{constructor(e,n,r,i,s,o,l){this.connId=e,this.repoInfo=n,this.applicationId=r,this.appCheckToken=i,this.authToken=s,this.transportSessionId=o,this.lastSessionId=l,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Bo(e),this.stats_=Rf(n),this.urlFn=c=>(this.appCheckToken&&(c[Jd]=this.appCheckToken),Lx(n,Ox,c))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new VN(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(JN)),TN(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Af((...s)=>{const[o,l,c,h,m]=s;if(this.incrementIncomingBytes_(s),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===nv)this.id=l,this.password=c;else if(o===$N)l?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(l,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...s)=>{const[o,l]=s;this.incrementIncomingBytes_(s),this.myPacketOrderer.handleResponse(o,l)},()=>{this.onClosed_()},this.urlFn);const r={};r[nv]="t",r[Ux]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(r[WN]=this.scriptTagHolder.uniqueCallbackIdentifier),r[Cx]=bf,this.transportSessionId&&(r[Tx]=this.transportSessionId),this.lastSessionId&&(r[Ax]=this.lastSessionId),this.applicationId&&(r[Px]=this.applicationId),this.appCheckToken&&(r[Jd]=this.appCheckToken),typeof location<"u"&&location.hostname&&Rx.test(location.hostname)&&(r[Nx]=bx);const i=this.urlFn(r);this.log_("Connecting via long-poll to "+i),this.scriptTagHolder.addTag(i,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){_i.forceAllow_=!0}static forceDisallow(){_i.forceDisallow_=!0}static isAvailable(){return _i.forceAllow_?!0:!_i.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!bN()&&!RN()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=Ne(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const r=S_(n),i=Ix(r,QN);for(let s=0;s<i.length;s++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[s]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const r={};r[YN]="t",r[Mx]=e,r[Fx]=n,this.myDisconnFrame.src=this.urlFn(r),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=Ne(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class Af{constructor(e,n,r,i){this.onDisconnect=r,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=IN(),window[BN+this.uniqueCallbackIdentifier]=e,window[HN+this.uniqueCallbackIdentifier]=n,this.myIFrame=Af.createIFrame_();let s="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(s='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+s+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(l){Me("frame writing exception"),l.stack&&Me(l.stack),Me(l)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||Me("No IE domain setting required")}catch{const r=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+r+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Mx]=this.myID,e[Fx]=this.myPW,e[Ux]=this.currentSerial;let n=this.urlFn(e),r="",i=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Vx+r.length<=zx;){const o=this.pendingSegs.shift();r=r+"&"+GN+i+"="+o.seg+"&"+KN+i+"="+o.ts+"&"+qN+i+"="+o.d,i++}return n=n+r,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,r){this.pendingSegs.push({seg:e,ts:n,d:r}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const r=()=>{this.outstandingRequests.delete(n),this.newRequest_()},i=setTimeout(r,Math.floor(XN)),s=()=>{clearTimeout(i),r()};this.addTag(e,s)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const r=this.myIFrame.doc.createElement("script");r.type="text/javascript",r.async=!0,r.src=e,r.onload=r.onreadystatechange=function(){const i=r.readyState;(!i||i==="loaded"||i==="complete")&&(r.onload=r.onreadystatechange=null,r.parentNode&&r.parentNode.removeChild(r),n())},r.onerror=()=>{Me("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(r)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ZN=16384,e2=45e3;let Pl=null;typeof MozWebSocket<"u"?Pl=MozWebSocket:typeof WebSocket<"u"&&(Pl=WebSocket);class zt{constructor(e,n,r,i,s,o,l){this.connId=e,this.applicationId=r,this.appCheckToken=i,this.authToken=s,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Bo(this.connId),this.stats_=Rf(n),this.connURL=zt.connectionURL_(n,o,l,i,r),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,r,i,s){const o={};return o[Cx]=bf,typeof location<"u"&&location.hostname&&Rx.test(location.hostname)&&(o[Nx]=bx),n&&(o[Tx]=n),r&&(o[Ax]=r),i&&(o[Jd]=i),s&&(o[Px]=s),Lx(e,jx,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,Nr.set("previous_websocket_failure",!0);try{let r;DI(),this.mySock=new Pl(this.connURL,[],r)}catch(r){this.log_("Error instantiating WebSocket.");const i=r.message||r.data;i&&this.log_(i),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=r=>{this.handleIncomingFrame(r)},this.mySock.onerror=r=>{this.log_("WebSocket error.  Closing connection.");const i=r.message||r.data;i&&this.log_(i),this.onClosed_()}}start(){}static forceDisallow(){zt.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,r=navigator.userAgent.match(n);r&&r.length>1&&parseFloat(r[1])<4.4&&(e=!0)}return!e&&Pl!==null&&!zt.forceDisallow_}static previouslyFailed(){return Nr.isInMemoryStorage||Nr.get("previous_websocket_failure")===!0}markConnectionHealthy(){Nr.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const r=go(n);this.onMessage(r)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(D(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const r=this.extractFrameCount_(n);r!==null&&this.appendFrame_(r)}}send(e){this.resetKeepAlive();const n=Ne(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const r=Ix(n,ZN);r.length>1&&this.sendString_(String(r.length));for(let i=0;i<r.length;i++)this.sendString_(r[i])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(e2))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}zt.responsesRequiredToBeHealthy=2;zt.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xo{constructor(e){this.initTransports_(e)}static get ALL_TRANSPORTS(){return[_i,zt]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}initTransports_(e){const n=zt&&zt.isAvailable();let r=n&&!zt.previouslyFailed();if(e.webSocketOnly&&(n||rt("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),r=!0),r)this.transports_=[zt];else{const i=this.transports_=[];for(const s of xo.ALL_TRANSPORTS)s&&s.isAvailable()&&i.push(s);xo.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}xo.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const t2=6e4,n2=5e3,r2=10*1024,i2=100*1024,Fu="t",rv="d",s2="s",iv="r",o2="e",sv="o",ov="a",av="n",lv="p",a2="h";class l2{constructor(e,n,r,i,s,o,l,c,h,m){this.id=e,this.repoInfo_=n,this.applicationId_=r,this.appCheckToken_=i,this.authToken_=s,this.onMessage_=o,this.onReady_=l,this.onDisconnect_=c,this.onKill_=h,this.lastSessionId=m,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Bo("c:"+this.id+":"),this.transportManager_=new xo(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),r=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,r)},Math.floor(0));const i=e.healthyTimeout||0;i>0&&(this.healthyTimeout_=Ws(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>i2?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>r2?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(i)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Fu in e){const n=e[Fu];n===ov?this.upgradeIfSecondaryHealthy_():n===iv?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===sv&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=Ss("t",e),r=Ss("d",e);if(n==="c")this.onSecondaryControl_(r);else if(n==="d")this.pendingDataMessages.push(r);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:lv,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:ov,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:av,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=Ss("t",e),r=Ss("d",e);n==="c"?this.onControl_(r):n==="d"&&this.onDataMessage_(r)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=Ss(Fu,e);if(rv in e){const r=e[rv];if(n===a2){const i=Object.assign({},r);this.repoInfo_.isUsingEmulator&&(i.h=this.repoInfo_.host),this.onHandshake_(i)}else if(n===av){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let i=0;i<this.pendingDataMessages.length;++i)this.onDataMessage_(this.pendingDataMessages[i]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===s2?this.onConnectionShutdown_(r):n===iv?this.onReset_(r):n===o2?Xd("Server Error: "+r):n===sv?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Xd("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,r=e.v,i=e.h;this.sessionId=e.s,this.repoInfo_.host=i,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),bf!==r&&rt("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),r=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,r),Ws(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(t2))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Ws(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(n2))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:lv,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(Nr.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $x{put(e,n,r,i){}merge(e,n,r,i){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,r){}onDisconnectMerge(e,n,r){}onDisconnectCancel(e,n){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bx{constructor(e){this.allowedEvents_=e,this.listeners_={},D(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const r=[...this.listeners_[e]];for(let i=0;i<r.length;i++)r[i].callback.apply(r[i].context,n)}}on(e,n,r){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:r});const i=this.getInitialEvent(e);i&&n.apply(r,i)}off(e,n,r){this.validateEventType_(e);const i=this.listeners_[e]||[];for(let s=0;s<i.length;s++)if(i[s].callback===n&&(!r||r===i[s].context)){i.splice(s,1);return}}validateEventType_(e){D(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jl extends Bx{constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!gf()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}static getInstance(){return new jl}getInitialEvent(e){return D(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cv=32,uv=768;class se{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let r=0;for(let i=0;i<this.pieces_.length;i++)this.pieces_[i].length>0&&(this.pieces_[r]=this.pieces_[i],r++);this.pieces_.length=r,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function te(){return new se("")}function K(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function ur(t){return t.pieces_.length-t.pieceNum_}function ce(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new se(t.pieces_,e)}function Pf(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function c2(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function wo(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function Hx(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new se(e,0)}function xe(t,e){const n=[];for(let r=t.pieceNum_;r<t.pieces_.length;r++)n.push(t.pieces_[r]);if(e instanceof se)for(let r=e.pieceNum_;r<e.pieces_.length;r++)n.push(e.pieces_[r]);else{const r=e.split("/");for(let i=0;i<r.length;i++)r[i].length>0&&n.push(r[i])}return new se(n,0)}function Y(t){return t.pieceNum_>=t.pieces_.length}function tt(t,e){const n=K(t),r=K(e);if(n===null)return e;if(n===r)return tt(ce(t),ce(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function u2(t,e){const n=wo(t,0),r=wo(e,0);for(let i=0;i<n.length&&i<r.length;i++){const s=Yr(n[i],r[i]);if(s!==0)return s}return n.length===r.length?0:n.length<r.length?-1:1}function jf(t,e){if(ur(t)!==ur(e))return!1;for(let n=t.pieceNum_,r=e.pieceNum_;n<=t.pieces_.length;n++,r++)if(t.pieces_[n]!==e.pieces_[r])return!1;return!0}function bt(t,e){let n=t.pieceNum_,r=e.pieceNum_;if(ur(t)>ur(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[r])return!1;++n,++r}return!0}class d2{constructor(e,n){this.errorPrefix_=n,this.parts_=wo(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let r=0;r<this.parts_.length;r++)this.byteLength_+=fc(this.parts_[r]);Wx(this)}}function h2(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=fc(e),Wx(t)}function f2(t){const e=t.parts_.pop();t.byteLength_-=fc(e),t.parts_.length>0&&(t.byteLength_-=1)}function Wx(t){if(t.byteLength_>uv)throw new Error(t.errorPrefix_+"has a key path longer than "+uv+" bytes ("+t.byteLength_+").");if(t.parts_.length>cv)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+cv+") or object contains a cycle "+Ir(t))}function Ir(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Of extends Bx{constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const r=!document[e];r!==this.visible_&&(this.visible_=r,this.trigger("visible",r))},!1)}static getInstance(){return new Of}getInitialEvent(e){return D(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Is=1e3,p2=60*5*1e3,dv=30*1e3,m2=1.3,g2=3e4,v2="server_kill",hv=3;class Sn extends $x{constructor(e,n,r,i,s,o,l,c){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=r,this.onConnectStatus_=i,this.onServerInfoUpdate_=s,this.authTokenProvider_=o,this.appCheckTokenProvider_=l,this.authOverride_=c,this.id=Sn.nextPersistentConnectionId_++,this.log_=Bo("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Is,this.maxReconnectDelay_=p2,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,c)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Of.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&jl.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,r){const i=++this.requestNumber_,s={r:i,a:e,b:n};this.log_(Ne(s)),D(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(s),r&&(this.requestCBHash_[i]=r)}get(e){this.initConnection_();const n=new Lo,i={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const l=o.d;o.s==="ok"?n.resolve(l):n.reject(l)}};this.outstandingGets_.push(i),this.outstandingGetCount_++;const s=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(s),n.promise}listen(e,n,r,i){this.initConnection_();const s=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+s),this.listens.has(o)||this.listens.set(o,new Map),D(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),D(!this.listens.get(o).has(s),"listen() called twice for same path/queryId.");const l={onComplete:i,hashFn:n,query:e,tag:r};this.listens.get(o).set(s,l),this.connected_&&this.sendListen_(l)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,r=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(r)})}sendListen_(e){const n=e.query,r=n._path.toString(),i=n._queryIdentifier;this.log_("Listen on "+r+" for "+i);const s={p:r},o="q";e.tag&&(s.q=n._queryObject,s.t=e.tag),s.h=e.hashFn(),this.sendRequest(o,s,l=>{const c=l.d,h=l.s;Sn.warnOnListenWarnings_(c,n),(this.listens.get(r)&&this.listens.get(r).get(i))===e&&(this.log_("listen response",l),h!=="ok"&&this.removeListen_(r,i),e.onComplete&&e.onComplete(h,c))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&on(e,"w")){const r=Ui(e,"w");if(Array.isArray(r)&&~r.indexOf("no_index")){const i='".indexOn": "'+n._queryParams.getIndex().toString()+'"',s=n._path.toString();rt(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${s} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||VI(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=dv)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=zI(e)?"auth":"gauth",r={cred:e};this.authOverride_===null?r.noauth=!0:typeof this.authOverride_=="object"&&(r.authvar=this.authOverride_),this.sendRequest(n,r,i=>{const s=i.s,o=i.d||"error";this.authToken_===e&&(s==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(s,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,r=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,r)})}unlisten(e,n){const r=e._path.toString(),i=e._queryIdentifier;this.log_("Unlisten called for "+r+" "+i),D(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(r,i)&&this.connected_&&this.sendUnlisten_(r,i,e._queryObject,n)}sendUnlisten_(e,n,r,i){this.log_("Unlisten on "+e+" for "+n);const s={p:e},o="n";i&&(s.q=r,s.t=i),this.sendRequest(o,s)}onDisconnectPut(e,n,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,r):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:r})}onDisconnectMerge(e,n,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,r):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:r})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,r,i){const s={p:n,d:r};this.log_("onDisconnect "+e,s),this.sendRequest(e,s,o=>{i&&setTimeout(()=>{i(o.s,o.d)},Math.floor(0))})}put(e,n,r,i){this.putInternal("p",e,n,r,i)}merge(e,n,r,i){this.putInternal("m",e,n,r,i)}putInternal(e,n,r,i,s){this.initConnection_();const o={p:n,d:r};s!==void 0&&(o.h=s),this.outstandingPuts_.push({action:e,request:o,onComplete:i}),this.outstandingPutCount_++;const l=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(l):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,r=this.outstandingPuts_[e].request,i=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,r,s=>{this.log_(n+" response",s),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),i&&i(s.s,s.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,r=>{if(r.s!=="ok"){const s=r.d;this.log_("reportStats","Error sending stats: "+s)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+Ne(e));const n=e.r,r=this.requestCBHash_[n];r&&(delete this.requestCBHash_[n],r(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):Xd("Unrecognized action received from server: "+Ne(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){D(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Is,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Is,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>g2&&(this.reconnectDelay_=Is),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=new Date().getTime()-this.lastConnectionAttemptTime_;let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*m2)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),r=this.onRealtimeDisconnect_.bind(this),i=this.id+":"+Sn.nextConnectionId_++,s=this.lastSessionId;let o=!1,l=null;const c=function(){l?l.close():(o=!0,r())},h=function(p){D(l,"sendRequest call when we're not connected not allowed."),l.sendRequest(p)};this.realtime_={close:c,sendRequest:h};const m=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[p,v]=await Promise.all([this.authTokenProvider_.getToken(m),this.appCheckTokenProvider_.getToken(m)]);o?Me("getToken() completed but was canceled"):(Me("getToken() completed. Creating connection."),this.authToken_=p&&p.accessToken,this.appCheckToken_=v&&v.token,l=new l2(i,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,r,N=>{rt(N+" ("+this.repoInfo_.toString()+")"),this.interrupt(v2)},s))}catch(p){this.log_("Failed to get token: "+p),o||(this.repoInfo_.nodeAdmin&&rt(p),c())}}}interrupt(e){Me("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){Me("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Vd(this.interruptReasons_)&&(this.reconnectDelay_=Is,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let r;n?r=n.map(s=>Nf(s)).join("$"):r="default";const i=this.removeListen_(e,r);i&&i.onComplete&&i.onComplete("permission_denied")}removeListen_(e,n){const r=new se(e).toString();let i;if(this.listens.has(r)){const s=this.listens.get(r);i=s.get(n),s.delete(n),s.size===0&&this.listens.delete(r)}else i=void 0;return i}onAuthRevoked_(e,n){Me("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=hv&&(this.reconnectDelay_=dv,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){Me("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=hv&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+wx.replace(/\./g,"-")]=1,gf()?e["framework.cordova"]=1:A_()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=jl.getInstance().currentlyOnline();return Vd(this.interruptReasons_)&&e}}Sn.nextPersistentConnectionId_=0;Sn.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q{constructor(e,n){this.name=e,this.node=n}static Wrap(e,n){return new q(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yc{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const r=new q(Vi,e),i=new q(Vi,n);return this.compare(r,i)!==0}minPost(){return q.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Na;class Gx extends yc{static get __EMPTY_NODE(){return Na}static set __EMPTY_NODE(e){Na=e}compare(e,n){return Yr(e.name,n.name)}isDefinedOn(e){throw Qi("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return q.MIN}maxPost(){return new q(Ur,Na)}makePost(e,n){return D(typeof e=="string","KeyIndex indexValue must always be a string."),new q(e,Na)}toString(){return".key"}}const Ri=new Gx;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ba{constructor(e,n,r,i,s=null){this.isReverse_=i,this.resultGenerator_=s,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?r(e.key,n):1,i&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class Pe{constructor(e,n,r,i,s){this.key=e,this.value=n,this.color=r??Pe.RED,this.left=i??dt.EMPTY_NODE,this.right=s??dt.EMPTY_NODE}copy(e,n,r,i,s){return new Pe(e??this.key,n??this.value,r??this.color,i??this.left,s??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let i=this;const s=r(e,i.key);return s<0?i=i.copy(null,null,null,i.left.insert(e,n,r),null):s===0?i=i.copy(null,n,null,null,null):i=i.copy(null,null,null,null,i.right.insert(e,n,r)),i.fixUp_()}removeMin_(){if(this.left.isEmpty())return dt.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let r,i;if(r=this,n(e,r.key)<0)!r.left.isEmpty()&&!r.left.isRed_()&&!r.left.left.isRed_()&&(r=r.moveRedLeft_()),r=r.copy(null,null,null,r.left.remove(e,n),null);else{if(r.left.isRed_()&&(r=r.rotateRight_()),!r.right.isEmpty()&&!r.right.isRed_()&&!r.right.left.isRed_()&&(r=r.moveRedRight_()),n(e,r.key)===0){if(r.right.isEmpty())return dt.EMPTY_NODE;i=r.right.min_(),r=r.copy(i.key,i.value,null,null,r.right.removeMin_())}r=r.copy(null,null,null,null,r.right.remove(e,n))}return r.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,Pe.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,Pe.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}Pe.RED=!0;Pe.BLACK=!1;class y2{copy(e,n,r,i,s){return this}insert(e,n,r){return new Pe(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class dt{constructor(e,n=dt.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new dt(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,Pe.BLACK,null,null))}remove(e){return new dt(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,Pe.BLACK,null,null))}get(e){let n,r=this.root_;for(;!r.isEmpty();){if(n=this.comparator_(e,r.key),n===0)return r.value;n<0?r=r.left:n>0&&(r=r.right)}return null}getPredecessorKey(e){let n,r=this.root_,i=null;for(;!r.isEmpty();)if(n=this.comparator_(e,r.key),n===0){if(r.left.isEmpty())return i?i.key:null;for(r=r.left;!r.right.isEmpty();)r=r.right;return r.key}else n<0?r=r.left:n>0&&(i=r,r=r.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new ba(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new ba(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new ba(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new ba(this.root_,null,this.comparator_,!0,e)}}dt.EMPTY_NODE=new y2;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _2(t,e){return Yr(t.name,e.name)}function Df(t,e){return Yr(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Zd;function x2(t){Zd=t}const Kx=function(t){return typeof t=="number"?"number:"+kx(t):"string:"+t},qx=function(t){if(t.isLeafNode()){const e=t.val();D(typeof e=="string"||typeof e=="number"||typeof e=="object"&&on(e,".sv"),"Priority must be a string or number.")}else D(t===Zd||t.isEmpty(),"priority of unexpected type.");D(t===Zd||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let fv;class Re{constructor(e,n=Re.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,D(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),qx(this.priorityNode_)}static set __childrenNodeConstructor(e){fv=e}static get __childrenNodeConstructor(){return fv}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new Re(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:Re.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return Y(e)?this:K(e)===".priority"?this.priorityNode_:Re.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:Re.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const r=K(e);return r===null?n:n.isEmpty()&&r!==".priority"?this:(D(r!==".priority"||ur(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(r,Re.__childrenNodeConstructor.EMPTY_NODE.updateChild(ce(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Kx(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=kx(this.value_):e+=this.value_,this.lazyHash_=Sx(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===Re.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof Re.__childrenNodeConstructor?-1:(D(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,r=typeof this.value_,i=Re.VALUE_TYPE_ORDER.indexOf(n),s=Re.VALUE_TYPE_ORDER.indexOf(r);return D(i>=0,"Unknown leaf type: "+n),D(s>=0,"Unknown leaf type: "+r),i===s?r==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:s-i}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}Re.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Yx,Qx;function w2(t){Yx=t}function E2(t){Qx=t}class S2 extends yc{compare(e,n){const r=e.node.getPriority(),i=n.node.getPriority(),s=r.compareTo(i);return s===0?Yr(e.name,n.name):s}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return q.MIN}maxPost(){return new q(Ur,new Re("[PRIORITY-POST]",Qx))}makePost(e,n){const r=Yx(e);return new q(n,new Re("[PRIORITY-POST]",r))}toString(){return".priority"}}const we=new S2;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const I2=Math.log(2);class k2{constructor(e){const n=s=>parseInt(Math.log(s)/I2,10),r=s=>parseInt(Array(s+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const i=r(this.count);this.bits_=e+1&i}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Ol=function(t,e,n,r){t.sort(e);const i=function(c,h){const m=h-c;let p,v;if(m===0)return null;if(m===1)return p=t[c],v=n?n(p):p,new Pe(v,p.node,Pe.BLACK,null,null);{const N=parseInt(m/2,10)+c,k=i(c,N),P=i(N+1,h);return p=t[N],v=n?n(p):p,new Pe(v,p.node,Pe.BLACK,k,P)}},s=function(c){let h=null,m=null,p=t.length;const v=function(k,P){const M=p-k,I=p;p-=k;const w=i(M+1,I),T=t[M],j=n?n(T):T;N(new Pe(j,T.node,P,null,w))},N=function(k){h?(h.left=k,h=k):(m=k,h=k)};for(let k=0;k<c.count;++k){const P=c.nextBitIsOne(),M=Math.pow(2,c.count-(k+1));P?v(M,Pe.BLACK):(v(M,Pe.BLACK),v(M,Pe.RED))}return m},o=new k2(t.length),l=s(o);return new dt(r||e,l)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Uu;const ri={};class xn{constructor(e,n){this.indexes_=e,this.indexSet_=n}static get Default(){return D(ri&&we,"ChildrenNode.ts has not been loaded"),Uu=Uu||new xn({".priority":ri},{".priority":we}),Uu}get(e){const n=Ui(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof dt?n:null}hasIndex(e){return on(this.indexSet_,e.toString())}addIndex(e,n){D(e!==Ri,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const r=[];let i=!1;const s=n.getIterator(q.Wrap);let o=s.getNext();for(;o;)i=i||e.isDefinedOn(o.node),r.push(o),o=s.getNext();let l;i?l=Ol(r,e.getCompare()):l=ri;const c=e.toString(),h=Object.assign({},this.indexSet_);h[c]=e;const m=Object.assign({},this.indexes_);return m[c]=l,new xn(m,h)}addToIndexes(e,n){const r=kl(this.indexes_,(i,s)=>{const o=Ui(this.indexSet_,s);if(D(o,"Missing index implementation for "+s),i===ri)if(o.isDefinedOn(e.node)){const l=[],c=n.getIterator(q.Wrap);let h=c.getNext();for(;h;)h.name!==e.name&&l.push(h),h=c.getNext();return l.push(e),Ol(l,o.getCompare())}else return ri;else{const l=n.get(e.name);let c=i;return l&&(c=c.remove(new q(e.name,l))),c.insert(e,e.node)}});return new xn(r,this.indexSet_)}removeFromIndexes(e,n){const r=kl(this.indexes_,i=>{if(i===ri)return i;{const s=n.get(e.name);return s?i.remove(new q(e.name,s)):i}});return new xn(r,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ks;class B{constructor(e,n,r){this.children_=e,this.priorityNode_=n,this.indexMap_=r,this.lazyHash_=null,this.priorityNode_&&qx(this.priorityNode_),this.children_.isEmpty()&&D(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return ks||(ks=new B(new dt(Df),null,xn.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||ks}updatePriority(e){return this.children_.isEmpty()?this:new B(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?ks:n}}getChild(e){const n=K(e);return n===null?this:this.getImmediateChild(n).getChild(ce(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(D(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const r=new q(e,n);let i,s;n.isEmpty()?(i=this.children_.remove(e),s=this.indexMap_.removeFromIndexes(r,this.children_)):(i=this.children_.insert(e,n),s=this.indexMap_.addToIndexes(r,this.children_));const o=i.isEmpty()?ks:this.priorityNode_;return new B(i,o,s)}}updateChild(e,n){const r=K(e);if(r===null)return n;{D(K(e)!==".priority"||ur(e)===1,".priority must be the last token in a path");const i=this.getImmediateChild(r).updateChild(ce(e),n);return this.updateImmediateChild(r,i)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let r=0,i=0,s=!0;if(this.forEachChild(we,(o,l)=>{n[o]=l.val(e),r++,s&&B.INTEGER_REGEXP_.test(o)?i=Math.max(i,Number(o)):s=!1}),!e&&s&&i<2*r){const o=[];for(const l in n)o[l]=n[l];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+Kx(this.getPriority().val())+":"),this.forEachChild(we,(n,r)=>{const i=r.hash();i!==""&&(e+=":"+n+":"+i)}),this.lazyHash_=e===""?"":Sx(e)}return this.lazyHash_}getPredecessorChildName(e,n,r){const i=this.resolveIndex_(r);if(i){const s=i.getPredecessorKey(new q(e,n));return s?s.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const r=n.minKey();return r&&r.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new q(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const r=n.maxKey();return r&&r.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new q(n,this.children_.get(n)):null}forEachChild(e,n){const r=this.resolveIndex_(e);return r?r.inorderTraversal(i=>n(i.name,i.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const r=this.resolveIndex_(n);if(r)return r.getIteratorFrom(e,i=>i);{const i=this.children_.getIteratorFrom(e.name,q.Wrap);let s=i.peek();for(;s!=null&&n.compare(s,e)<0;)i.getNext(),s=i.peek();return i}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const r=this.resolveIndex_(n);if(r)return r.getReverseIteratorFrom(e,i=>i);{const i=this.children_.getReverseIteratorFrom(e.name,q.Wrap);let s=i.peek();for(;s!=null&&n.compare(s,e)>0;)i.getNext(),s=i.peek();return i}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Ho?-1:0}withIndex(e){if(e===Ri||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new B(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===Ri||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const r=this.getIterator(we),i=n.getIterator(we);let s=r.getNext(),o=i.getNext();for(;s&&o;){if(s.name!==o.name||!s.node.equals(o.node))return!1;s=r.getNext(),o=i.getNext()}return s===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Ri?null:this.indexMap_.get(e.toString())}}B.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class C2 extends B{constructor(){super(new dt(Df),B.EMPTY_NODE,xn.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return B.EMPTY_NODE}isEmpty(){return!1}}const Ho=new C2;Object.defineProperties(q,{MIN:{value:new q(Vi,B.EMPTY_NODE)},MAX:{value:new q(Ur,Ho)}});Gx.__EMPTY_NODE=B.EMPTY_NODE;Re.__childrenNodeConstructor=B;x2(Ho);E2(Ho);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const T2=!0;function Te(t,e=null){if(t===null)return B.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),D(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new Re(n,Te(e))}if(!(t instanceof Array)&&T2){const n=[];let r=!1;if(ze(t,(o,l)=>{if(o.substring(0,1)!=="."){const c=Te(l);c.isEmpty()||(r=r||!c.getPriority().isEmpty(),n.push(new q(o,c)))}}),n.length===0)return B.EMPTY_NODE;const s=Ol(n,_2,o=>o.name,Df);if(r){const o=Ol(n,we.getCompare());return new B(s,Te(e),new xn({".priority":o},{".priority":we}))}else return new B(s,Te(e),xn.Default)}else{let n=B.EMPTY_NODE;return ze(t,(r,i)=>{if(on(t,r)&&r.substring(0,1)!=="."){const s=Te(i);(s.isLeafNode()||!s.isEmpty())&&(n=n.updateImmediateChild(r,s))}}),n.updatePriority(Te(e))}}w2(Te);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N2 extends yc{constructor(e){super(),this.indexPath_=e,D(!Y(e)&&K(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const r=this.extractChild(e.node),i=this.extractChild(n.node),s=r.compareTo(i);return s===0?Yr(e.name,n.name):s}makePost(e,n){const r=Te(e),i=B.EMPTY_NODE.updateChild(this.indexPath_,r);return new q(n,i)}maxPost(){const e=B.EMPTY_NODE.updateChild(this.indexPath_,Ho);return new q(Ur,e)}toString(){return wo(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class b2 extends yc{compare(e,n){const r=e.node.compareTo(n.node);return r===0?Yr(e.name,n.name):r}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return q.MIN}maxPost(){return q.MAX}makePost(e,n){const r=Te(e);return new q(n,r)}toString(){return".value"}}const R2=new b2;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xx(t){return{type:"value",snapshotNode:t}}function $i(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function Eo(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function So(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function A2(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lf{constructor(e){this.index_=e}updateChild(e,n,r,i,s,o){D(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const l=e.getImmediateChild(n);return l.getChild(i).equals(r.getChild(i))&&l.isEmpty()===r.isEmpty()||(o!=null&&(r.isEmpty()?e.hasChild(n)?o.trackChildChange(Eo(n,l)):D(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):l.isEmpty()?o.trackChildChange($i(n,r)):o.trackChildChange(So(n,r,l))),e.isLeafNode()&&r.isEmpty())?e:e.updateImmediateChild(n,r).withIndex(this.index_)}updateFullNode(e,n,r){return r!=null&&(e.isLeafNode()||e.forEachChild(we,(i,s)=>{n.hasChild(i)||r.trackChildChange(Eo(i,s))}),n.isLeafNode()||n.forEachChild(we,(i,s)=>{if(e.hasChild(i)){const o=e.getImmediateChild(i);o.equals(s)||r.trackChildChange(So(i,s,o))}else r.trackChildChange($i(i,s))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?B.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Io{constructor(e){this.indexedFilter_=new Lf(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Io.getStartPost_(e),this.endPost_=Io.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,r=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&r}updateChild(e,n,r,i,s,o){return this.matches(new q(n,r))||(r=B.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,r,i,s,o)}updateFullNode(e,n,r){n.isLeafNode()&&(n=B.EMPTY_NODE);let i=n.withIndex(this.index_);i=i.updatePriority(B.EMPTY_NODE);const s=this;return n.forEachChild(we,(o,l)=>{s.matches(new q(o,l))||(i=i.updateImmediateChild(o,B.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,i,r)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P2{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const r=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?r<=0:r<0},this.withinEndPost=n=>{const r=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?r<=0:r<0},this.rangedFilter_=new Io(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,r,i,s,o){return this.rangedFilter_.matches(new q(n,r))||(r=B.EMPTY_NODE),e.getImmediateChild(n).equals(r)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,r,i,s,o):this.fullLimitUpdateChild_(e,n,r,s,o)}updateFullNode(e,n,r){let i;if(n.isLeafNode()||n.isEmpty())i=B.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){i=B.EMPTY_NODE.withIndex(this.index_);let s;this.reverse_?s=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):s=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;s.hasNext()&&o<this.limit_;){const l=s.getNext();if(this.withinDirectionalStart(l))if(this.withinDirectionalEnd(l))i=i.updateImmediateChild(l.name,l.node),o++;else break;else continue}}else{i=n.withIndex(this.index_),i=i.updatePriority(B.EMPTY_NODE);let s;this.reverse_?s=i.getReverseIterator(this.index_):s=i.getIterator(this.index_);let o=0;for(;s.hasNext();){const l=s.getNext();o<this.limit_&&this.withinDirectionalStart(l)&&this.withinDirectionalEnd(l)?o++:i=i.updateImmediateChild(l.name,B.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,i,r)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,r,i,s){let o;if(this.reverse_){const p=this.index_.getCompare();o=(v,N)=>p(N,v)}else o=this.index_.getCompare();const l=e;D(l.numChildren()===this.limit_,"");const c=new q(n,r),h=this.reverse_?l.getFirstChild(this.index_):l.getLastChild(this.index_),m=this.rangedFilter_.matches(c);if(l.hasChild(n)){const p=l.getImmediateChild(n);let v=i.getChildAfterChild(this.index_,h,this.reverse_);for(;v!=null&&(v.name===n||l.hasChild(v.name));)v=i.getChildAfterChild(this.index_,v,this.reverse_);const N=v==null?1:o(v,c);if(m&&!r.isEmpty()&&N>=0)return s!=null&&s.trackChildChange(So(n,r,p)),l.updateImmediateChild(n,r);{s!=null&&s.trackChildChange(Eo(n,p));const P=l.updateImmediateChild(n,B.EMPTY_NODE);return v!=null&&this.rangedFilter_.matches(v)?(s!=null&&s.trackChildChange($i(v.name,v.node)),P.updateImmediateChild(v.name,v.node)):P}}else return r.isEmpty()?e:m&&o(h,c)>=0?(s!=null&&(s.trackChildChange(Eo(h.name,h.node)),s.trackChildChange($i(n,r))),l.updateImmediateChild(n,r).updateImmediateChild(h.name,B.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mf{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=we}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return D(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return D(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Vi}hasEnd(){return this.endSet_}getIndexEndValue(){return D(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return D(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Ur}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return D(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===we}copy(){const e=new Mf;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function j2(t){return t.loadsAllData()?new Lf(t.getIndex()):t.hasLimit()?new P2(t):new Io(t)}function pv(t){const e={};if(t.isDefault())return e;let n;if(t.index_===we?n="$priority":t.index_===R2?n="$value":t.index_===Ri?n="$key":(D(t.index_ instanceof N2,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=Ne(n),t.startSet_){const r=t.startAfterSet_?"startAfter":"startAt";e[r]=Ne(t.indexStartValue_),t.startNameSet_&&(e[r]+=","+Ne(t.indexStartName_))}if(t.endSet_){const r=t.endBeforeSet_?"endBefore":"endAt";e[r]=Ne(t.indexEndValue_),t.endNameSet_&&(e[r]+=","+Ne(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function mv(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==we&&(e.i=t.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dl extends $x{constructor(e,n,r,i){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=r,this.appCheckTokenProvider_=i,this.log_=Bo("p:rest:"),this.listens_={}}reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(D(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}listen(e,n,r,i){const s=e._path.toString();this.log_("Listen called for "+s+" "+e._queryIdentifier);const o=Dl.getListenId_(e,r),l={};this.listens_[o]=l;const c=pv(e._queryParams);this.restRequest_(s+".json",c,(h,m)=>{let p=m;if(h===404&&(p=null,h=null),h===null&&this.onDataUpdate_(s,p,!1,r),Ui(this.listens_,o)===l){let v;h?h===401?v="permission_denied":v="rest_error:"+h:v="ok",i(v,null)}})}unlisten(e,n){const r=Dl.getListenId_(e,n);delete this.listens_[r]}get(e){const n=pv(e._queryParams),r=e._path.toString(),i=new Lo;return this.restRequest_(r+".json",n,(s,o)=>{let l=o;s===404&&(l=null,s=null),s===null?(this.onDataUpdate_(r,l,!1,null),i.resolve(l)):i.reject(new Error(l))}),i.promise}refreshAuthToken(e){}restRequest_(e,n={},r){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([i,s])=>{i&&i.accessToken&&(n.auth=i.accessToken),s&&s.token&&(n.ac=s.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+Xi(n);this.log_("Sending REST request for "+o);const l=new XMLHttpRequest;l.onreadystatechange=()=>{if(r&&l.readyState===4){this.log_("REST Response for "+o+" received. status:",l.status,"response:",l.responseText);let c=null;if(l.status>=200&&l.status<300){try{c=go(l.responseText)}catch{rt("Failed to parse JSON response for "+o+": "+l.responseText)}r(null,c)}else l.status!==401&&l.status!==404&&rt("Got unsuccessful REST response for "+o+" Status: "+l.status),r(l.status);r=null}},l.open("GET",o,!0),l.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O2{constructor(){this.rootNode_=B.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ll(){return{value:null,children:new Map}}function Jx(t,e,n){if(Y(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const r=K(e);t.children.has(r)||t.children.set(r,Ll());const i=t.children.get(r);e=ce(e),Jx(i,e,n)}}function eh(t,e,n){t.value!==null?n(e,t.value):D2(t,(r,i)=>{const s=new se(e.toString()+"/"+r);eh(i,s,n)})}function D2(t,e){t.children.forEach((n,r)=>{e(r,n)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L2{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n=Object.assign({},e);return this.last_&&ze(this.last_,(r,i)=>{n[r]=n[r]-i}),this.last_=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gv=10*1e3,M2=30*1e3,F2=5*60*1e3;class U2{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new L2(e);const r=gv+(M2-gv)*Math.random();Ws(this.reportStats_.bind(this),Math.floor(r))}reportStats_(){const e=this.statsListener_.get(),n={};let r=!1;ze(e,(i,s)=>{s>0&&on(this.statsToReport_,i)&&(n[i]=s,r=!0)}),r&&this.server_.reportStats(n),Ws(this.reportStats_.bind(this),Math.floor(Math.random()*2*F2))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Vt;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(Vt||(Vt={}));function Ff(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Uf(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function zf(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ml{constructor(e,n,r){this.path=e,this.affectedTree=n,this.revert=r,this.type=Vt.ACK_USER_WRITE,this.source=Ff()}operationForChild(e){if(Y(this.path)){if(this.affectedTree.value!=null)return D(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new se(e));return new Ml(te(),n,this.revert)}}else return D(K(this.path)===e,"operationForChild called for unrelated child."),new Ml(ce(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ko{constructor(e,n){this.source=e,this.path=n,this.type=Vt.LISTEN_COMPLETE}operationForChild(e){return Y(this.path)?new ko(this.source,te()):new ko(this.source,ce(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zr{constructor(e,n,r){this.source=e,this.path=n,this.snap=r,this.type=Vt.OVERWRITE}operationForChild(e){return Y(this.path)?new zr(this.source,te(),this.snap.getImmediateChild(e)):new zr(this.source,ce(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bi{constructor(e,n,r){this.source=e,this.path=n,this.children=r,this.type=Vt.MERGE}operationForChild(e){if(Y(this.path)){const n=this.children.subtree(new se(e));return n.isEmpty()?null:n.value?new zr(this.source,te(),n.value):new Bi(this.source,te(),n)}else return D(K(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Bi(this.source,ce(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dr{constructor(e,n,r){this.node_=e,this.fullyInitialized_=n,this.filtered_=r}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(Y(e))return this.isFullyInitialized()&&!this.filtered_;const n=K(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z2{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function V2(t,e,n,r){const i=[],s=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&s.push(A2(o.childName,o.snapshotNode))}),Cs(t,i,"child_removed",e,r,n),Cs(t,i,"child_added",e,r,n),Cs(t,i,"child_moved",s,r,n),Cs(t,i,"child_changed",e,r,n),Cs(t,i,"value",e,r,n),i}function Cs(t,e,n,r,i,s){const o=r.filter(l=>l.type===n);o.sort((l,c)=>B2(t,l,c)),o.forEach(l=>{const c=$2(t,l,s);i.forEach(h=>{h.respondsTo(l.type)&&e.push(h.createEvent(c,t.query_))})})}function $2(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function B2(t,e,n){if(e.childName==null||n.childName==null)throw Qi("Should only compare child_ events.");const r=new q(e.childName,e.snapshotNode),i=new q(n.childName,n.snapshotNode);return t.index_.compare(r,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _c(t,e){return{eventCache:t,serverCache:e}}function Gs(t,e,n,r){return _c(new dr(e,n,r),t.serverCache)}function Zx(t,e,n,r){return _c(t.eventCache,new dr(e,n,r))}function Fl(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function Vr(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let zu;const H2=()=>(zu||(zu=new dt(NN)),zu);class le{constructor(e,n=H2()){this.value=e,this.children=n}static fromObject(e){let n=new le(null);return ze(e,(r,i)=>{n=n.set(new se(r),i)}),n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:te(),value:this.value};if(Y(e))return null;{const r=K(e),i=this.children.get(r);if(i!==null){const s=i.findRootMostMatchingPathAndValue(ce(e),n);return s!=null?{path:xe(new se(r),s.path),value:s.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(Y(e))return this;{const n=K(e),r=this.children.get(n);return r!==null?r.subtree(ce(e)):new le(null)}}set(e,n){if(Y(e))return new le(n,this.children);{const r=K(e),s=(this.children.get(r)||new le(null)).set(ce(e),n),o=this.children.insert(r,s);return new le(this.value,o)}}remove(e){if(Y(e))return this.children.isEmpty()?new le(null):new le(null,this.children);{const n=K(e),r=this.children.get(n);if(r){const i=r.remove(ce(e));let s;return i.isEmpty()?s=this.children.remove(n):s=this.children.insert(n,i),this.value===null&&s.isEmpty()?new le(null):new le(this.value,s)}else return this}}get(e){if(Y(e))return this.value;{const n=K(e),r=this.children.get(n);return r?r.get(ce(e)):null}}setTree(e,n){if(Y(e))return n;{const r=K(e),s=(this.children.get(r)||new le(null)).setTree(ce(e),n);let o;return s.isEmpty()?o=this.children.remove(r):o=this.children.insert(r,s),new le(this.value,o)}}fold(e){return this.fold_(te(),e)}fold_(e,n){const r={};return this.children.inorderTraversal((i,s)=>{r[i]=s.fold_(xe(e,i),n)}),n(e,this.value,r)}findOnPath(e,n){return this.findOnPath_(e,te(),n)}findOnPath_(e,n,r){const i=this.value?r(n,this.value):!1;if(i)return i;if(Y(e))return null;{const s=K(e),o=this.children.get(s);return o?o.findOnPath_(ce(e),xe(n,s),r):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,te(),n)}foreachOnPath_(e,n,r){if(Y(e))return this;{this.value&&r(n,this.value);const i=K(e),s=this.children.get(i);return s?s.foreachOnPath_(ce(e),xe(n,i),r):new le(null)}}foreach(e){this.foreach_(te(),e)}foreach_(e,n){this.children.inorderTraversal((r,i)=>{i.foreach_(xe(e,r),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,r)=>{r.value&&e(n,r.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wt{constructor(e){this.writeTree_=e}static empty(){return new Wt(new le(null))}}function Ks(t,e,n){if(Y(e))return new Wt(new le(n));{const r=t.writeTree_.findRootMostValueAndPath(e);if(r!=null){const i=r.path;let s=r.value;const o=tt(i,e);return s=s.updateChild(o,n),new Wt(t.writeTree_.set(i,s))}else{const i=new le(n),s=t.writeTree_.setTree(e,i);return new Wt(s)}}}function th(t,e,n){let r=t;return ze(n,(i,s)=>{r=Ks(r,xe(e,i),s)}),r}function vv(t,e){if(Y(e))return Wt.empty();{const n=t.writeTree_.setTree(e,new le(null));return new Wt(n)}}function nh(t,e){return Qr(t,e)!=null}function Qr(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(tt(n.path,e)):null}function yv(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(we,(r,i)=>{e.push(new q(r,i))}):t.writeTree_.children.inorderTraversal((r,i)=>{i.value!=null&&e.push(new q(r,i.value))}),e}function or(t,e){if(Y(e))return t;{const n=Qr(t,e);return n!=null?new Wt(new le(n)):new Wt(t.writeTree_.subtree(e))}}function rh(t){return t.writeTree_.isEmpty()}function Hi(t,e){return ew(te(),t.writeTree_,e)}function ew(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let r=null;return e.children.inorderTraversal((i,s)=>{i===".priority"?(D(s.value!==null,"Priority writes must always be leaf nodes"),r=s.value):n=ew(xe(t,i),s,n)}),!n.getChild(t).isEmpty()&&r!==null&&(n=n.updateChild(xe(t,".priority"),r)),n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xc(t,e){return iw(e,t)}function W2(t,e,n,r,i){D(r>t.lastWriteId,"Stacking an older write on top of newer ones"),i===void 0&&(i=!0),t.allWrites.push({path:e,snap:n,writeId:r,visible:i}),i&&(t.visibleWrites=Ks(t.visibleWrites,e,n)),t.lastWriteId=r}function G2(t,e,n,r){D(r>t.lastWriteId,"Stacking an older merge on top of newer ones"),t.allWrites.push({path:e,children:n,writeId:r,visible:!0}),t.visibleWrites=th(t.visibleWrites,e,n),t.lastWriteId=r}function K2(t,e){for(let n=0;n<t.allWrites.length;n++){const r=t.allWrites[n];if(r.writeId===e)return r}return null}function q2(t,e){const n=t.allWrites.findIndex(l=>l.writeId===e);D(n>=0,"removeWrite called with nonexistent writeId.");const r=t.allWrites[n];t.allWrites.splice(n,1);let i=r.visible,s=!1,o=t.allWrites.length-1;for(;i&&o>=0;){const l=t.allWrites[o];l.visible&&(o>=n&&Y2(l,r.path)?i=!1:bt(r.path,l.path)&&(s=!0)),o--}if(i){if(s)return Q2(t),!0;if(r.snap)t.visibleWrites=vv(t.visibleWrites,r.path);else{const l=r.children;ze(l,c=>{t.visibleWrites=vv(t.visibleWrites,xe(r.path,c))})}return!0}else return!1}function Y2(t,e){if(t.snap)return bt(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&bt(xe(t.path,n),e))return!0;return!1}function Q2(t){t.visibleWrites=tw(t.allWrites,X2,te()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function X2(t){return t.visible}function tw(t,e,n){let r=Wt.empty();for(let i=0;i<t.length;++i){const s=t[i];if(e(s)){const o=s.path;let l;if(s.snap)bt(n,o)?(l=tt(n,o),r=Ks(r,l,s.snap)):bt(o,n)&&(l=tt(o,n),r=Ks(r,te(),s.snap.getChild(l)));else if(s.children){if(bt(n,o))l=tt(n,o),r=th(r,l,s.children);else if(bt(o,n))if(l=tt(o,n),Y(l))r=th(r,te(),s.children);else{const c=Ui(s.children,K(l));if(c){const h=c.getChild(ce(l));r=Ks(r,te(),h)}}}else throw Qi("WriteRecord should have .snap or .children")}}return r}function nw(t,e,n,r,i){if(!r&&!i){const s=Qr(t.visibleWrites,e);if(s!=null)return s;{const o=or(t.visibleWrites,e);if(rh(o))return n;if(n==null&&!nh(o,te()))return null;{const l=n||B.EMPTY_NODE;return Hi(o,l)}}}else{const s=or(t.visibleWrites,e);if(!i&&rh(s))return n;if(!i&&n==null&&!nh(s,te()))return null;{const o=function(h){return(h.visible||i)&&(!r||!~r.indexOf(h.writeId))&&(bt(h.path,e)||bt(e,h.path))},l=tw(t.allWrites,o,e),c=n||B.EMPTY_NODE;return Hi(l,c)}}}function J2(t,e,n){let r=B.EMPTY_NODE;const i=Qr(t.visibleWrites,e);if(i)return i.isLeafNode()||i.forEachChild(we,(s,o)=>{r=r.updateImmediateChild(s,o)}),r;if(n){const s=or(t.visibleWrites,e);return n.forEachChild(we,(o,l)=>{const c=Hi(or(s,new se(o)),l);r=r.updateImmediateChild(o,c)}),yv(s).forEach(o=>{r=r.updateImmediateChild(o.name,o.node)}),r}else{const s=or(t.visibleWrites,e);return yv(s).forEach(o=>{r=r.updateImmediateChild(o.name,o.node)}),r}}function Z2(t,e,n,r,i){D(r||i,"Either existingEventSnap or existingServerSnap must exist");const s=xe(e,n);if(nh(t.visibleWrites,s))return null;{const o=or(t.visibleWrites,s);return rh(o)?i.getChild(n):Hi(o,i.getChild(n))}}function eb(t,e,n,r){const i=xe(e,n),s=Qr(t.visibleWrites,i);if(s!=null)return s;if(r.isCompleteForChild(n)){const o=or(t.visibleWrites,i);return Hi(o,r.getNode().getImmediateChild(n))}else return null}function tb(t,e){return Qr(t.visibleWrites,e)}function nb(t,e,n,r,i,s,o){let l;const c=or(t.visibleWrites,e),h=Qr(c,te());if(h!=null)l=h;else if(n!=null)l=Hi(c,n);else return[];if(l=l.withIndex(o),!l.isEmpty()&&!l.isLeafNode()){const m=[],p=o.getCompare(),v=s?l.getReverseIteratorFrom(r,o):l.getIteratorFrom(r,o);let N=v.getNext();for(;N&&m.length<i;)p(N,r)!==0&&m.push(N),N=v.getNext();return m}else return[]}function rb(){return{visibleWrites:Wt.empty(),allWrites:[],lastWriteId:-1}}function Ul(t,e,n,r){return nw(t.writeTree,t.treePath,e,n,r)}function Vf(t,e){return J2(t.writeTree,t.treePath,e)}function _v(t,e,n,r){return Z2(t.writeTree,t.treePath,e,n,r)}function zl(t,e){return tb(t.writeTree,xe(t.treePath,e))}function ib(t,e,n,r,i,s){return nb(t.writeTree,t.treePath,e,n,r,i,s)}function $f(t,e,n){return eb(t.writeTree,t.treePath,e,n)}function rw(t,e){return iw(xe(t.treePath,e),t.writeTree)}function iw(t,e){return{treePath:t,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sb{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,r=e.childName;D(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),D(r!==".priority","Only non-priority child changes can be tracked.");const i=this.changeMap.get(r);if(i){const s=i.type;if(n==="child_added"&&s==="child_removed")this.changeMap.set(r,So(r,e.snapshotNode,i.snapshotNode));else if(n==="child_removed"&&s==="child_added")this.changeMap.delete(r);else if(n==="child_removed"&&s==="child_changed")this.changeMap.set(r,Eo(r,i.oldSnap));else if(n==="child_changed"&&s==="child_added")this.changeMap.set(r,$i(r,e.snapshotNode));else if(n==="child_changed"&&s==="child_changed")this.changeMap.set(r,So(r,e.snapshotNode,i.oldSnap));else throw Qi("Illegal combination of changes: "+e+" occurred after "+i)}else this.changeMap.set(r,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ob{getCompleteChild(e){return null}getChildAfterChild(e,n,r){return null}}const sw=new ob;class Bf{constructor(e,n,r=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=r}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const r=this.optCompleteServerCache_!=null?new dr(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return $f(this.writes_,e,r)}}getChildAfterChild(e,n,r){const i=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Vr(this.viewCache_),s=ib(this.writes_,i,n,1,r,e);return s.length===0?null:s[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ab(t){return{filter:t}}function lb(t,e){D(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),D(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function cb(t,e,n,r,i){const s=new sb;let o,l;if(n.type===Vt.OVERWRITE){const h=n;h.source.fromUser?o=ih(t,e,h.path,h.snap,r,i,s):(D(h.source.fromServer,"Unknown source."),l=h.source.tagged||e.serverCache.isFiltered()&&!Y(h.path),o=Vl(t,e,h.path,h.snap,r,i,l,s))}else if(n.type===Vt.MERGE){const h=n;h.source.fromUser?o=db(t,e,h.path,h.children,r,i,s):(D(h.source.fromServer,"Unknown source."),l=h.source.tagged||e.serverCache.isFiltered(),o=sh(t,e,h.path,h.children,r,i,l,s))}else if(n.type===Vt.ACK_USER_WRITE){const h=n;h.revert?o=pb(t,e,h.path,r,i,s):o=hb(t,e,h.path,h.affectedTree,r,i,s)}else if(n.type===Vt.LISTEN_COMPLETE)o=fb(t,e,n.path,r,s);else throw Qi("Unknown operation type: "+n.type);const c=s.getChanges();return ub(e,o,c),{viewCache:o,changes:c}}function ub(t,e,n){const r=e.eventCache;if(r.isFullyInitialized()){const i=r.getNode().isLeafNode()||r.getNode().isEmpty(),s=Fl(t);(n.length>0||!t.eventCache.isFullyInitialized()||i&&!r.getNode().equals(s)||!r.getNode().getPriority().equals(s.getPriority()))&&n.push(Xx(Fl(e)))}}function ow(t,e,n,r,i,s){const o=e.eventCache;if(zl(r,n)!=null)return e;{let l,c;if(Y(n))if(D(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const h=Vr(e),m=h instanceof B?h:B.EMPTY_NODE,p=Vf(r,m);l=t.filter.updateFullNode(e.eventCache.getNode(),p,s)}else{const h=Ul(r,Vr(e));l=t.filter.updateFullNode(e.eventCache.getNode(),h,s)}else{const h=K(n);if(h===".priority"){D(ur(n)===1,"Can't have a priority with additional path components");const m=o.getNode();c=e.serverCache.getNode();const p=_v(r,n,m,c);p!=null?l=t.filter.updatePriority(m,p):l=o.getNode()}else{const m=ce(n);let p;if(o.isCompleteForChild(h)){c=e.serverCache.getNode();const v=_v(r,n,o.getNode(),c);v!=null?p=o.getNode().getImmediateChild(h).updateChild(m,v):p=o.getNode().getImmediateChild(h)}else p=$f(r,h,e.serverCache);p!=null?l=t.filter.updateChild(o.getNode(),h,p,m,i,s):l=o.getNode()}}return Gs(e,l,o.isFullyInitialized()||Y(n),t.filter.filtersNodes())}}function Vl(t,e,n,r,i,s,o,l){const c=e.serverCache;let h;const m=o?t.filter:t.filter.getIndexedFilter();if(Y(n))h=m.updateFullNode(c.getNode(),r,null);else if(m.filtersNodes()&&!c.isFiltered()){const N=c.getNode().updateChild(n,r);h=m.updateFullNode(c.getNode(),N,null)}else{const N=K(n);if(!c.isCompleteForPath(n)&&ur(n)>1)return e;const k=ce(n),M=c.getNode().getImmediateChild(N).updateChild(k,r);N===".priority"?h=m.updatePriority(c.getNode(),M):h=m.updateChild(c.getNode(),N,M,k,sw,null)}const p=Zx(e,h,c.isFullyInitialized()||Y(n),m.filtersNodes()),v=new Bf(i,p,s);return ow(t,p,n,i,v,l)}function ih(t,e,n,r,i,s,o){const l=e.eventCache;let c,h;const m=new Bf(i,e,s);if(Y(n))h=t.filter.updateFullNode(e.eventCache.getNode(),r,o),c=Gs(e,h,!0,t.filter.filtersNodes());else{const p=K(n);if(p===".priority")h=t.filter.updatePriority(e.eventCache.getNode(),r),c=Gs(e,h,l.isFullyInitialized(),l.isFiltered());else{const v=ce(n),N=l.getNode().getImmediateChild(p);let k;if(Y(v))k=r;else{const P=m.getCompleteChild(p);P!=null?Pf(v)===".priority"&&P.getChild(Hx(v)).isEmpty()?k=P:k=P.updateChild(v,r):k=B.EMPTY_NODE}if(N.equals(k))c=e;else{const P=t.filter.updateChild(l.getNode(),p,k,v,m,o);c=Gs(e,P,l.isFullyInitialized(),t.filter.filtersNodes())}}}return c}function xv(t,e){return t.eventCache.isCompleteForChild(e)}function db(t,e,n,r,i,s,o){let l=e;return r.foreach((c,h)=>{const m=xe(n,c);xv(e,K(m))&&(l=ih(t,l,m,h,i,s,o))}),r.foreach((c,h)=>{const m=xe(n,c);xv(e,K(m))||(l=ih(t,l,m,h,i,s,o))}),l}function wv(t,e,n){return n.foreach((r,i)=>{e=e.updateChild(r,i)}),e}function sh(t,e,n,r,i,s,o,l){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let c=e,h;Y(n)?h=r:h=new le(null).setTree(n,r);const m=e.serverCache.getNode();return h.children.inorderTraversal((p,v)=>{if(m.hasChild(p)){const N=e.serverCache.getNode().getImmediateChild(p),k=wv(t,N,v);c=Vl(t,c,new se(p),k,i,s,o,l)}}),h.children.inorderTraversal((p,v)=>{const N=!e.serverCache.isCompleteForChild(p)&&v.value===null;if(!m.hasChild(p)&&!N){const k=e.serverCache.getNode().getImmediateChild(p),P=wv(t,k,v);c=Vl(t,c,new se(p),P,i,s,o,l)}}),c}function hb(t,e,n,r,i,s,o){if(zl(i,n)!=null)return e;const l=e.serverCache.isFiltered(),c=e.serverCache;if(r.value!=null){if(Y(n)&&c.isFullyInitialized()||c.isCompleteForPath(n))return Vl(t,e,n,c.getNode().getChild(n),i,s,l,o);if(Y(n)){let h=new le(null);return c.getNode().forEachChild(Ri,(m,p)=>{h=h.set(new se(m),p)}),sh(t,e,n,h,i,s,l,o)}else return e}else{let h=new le(null);return r.foreach((m,p)=>{const v=xe(n,m);c.isCompleteForPath(v)&&(h=h.set(m,c.getNode().getChild(v)))}),sh(t,e,n,h,i,s,l,o)}}function fb(t,e,n,r,i){const s=e.serverCache,o=Zx(e,s.getNode(),s.isFullyInitialized()||Y(n),s.isFiltered());return ow(t,o,n,r,sw,i)}function pb(t,e,n,r,i,s){let o;if(zl(r,n)!=null)return e;{const l=new Bf(r,e,i),c=e.eventCache.getNode();let h;if(Y(n)||K(n)===".priority"){let m;if(e.serverCache.isFullyInitialized())m=Ul(r,Vr(e));else{const p=e.serverCache.getNode();D(p instanceof B,"serverChildren would be complete if leaf node"),m=Vf(r,p)}m=m,h=t.filter.updateFullNode(c,m,s)}else{const m=K(n);let p=$f(r,m,e.serverCache);p==null&&e.serverCache.isCompleteForChild(m)&&(p=c.getImmediateChild(m)),p!=null?h=t.filter.updateChild(c,m,p,ce(n),l,s):e.eventCache.getNode().hasChild(m)?h=t.filter.updateChild(c,m,B.EMPTY_NODE,ce(n),l,s):h=c,h.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Ul(r,Vr(e)),o.isLeafNode()&&(h=t.filter.updateFullNode(h,o,s)))}return o=e.serverCache.isFullyInitialized()||zl(r,te())!=null,Gs(e,h,o,t.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mb{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const r=this.query_._queryParams,i=new Lf(r.getIndex()),s=j2(r);this.processor_=ab(s);const o=n.serverCache,l=n.eventCache,c=i.updateFullNode(B.EMPTY_NODE,o.getNode(),null),h=s.updateFullNode(B.EMPTY_NODE,l.getNode(),null),m=new dr(c,o.isFullyInitialized(),i.filtersNodes()),p=new dr(h,l.isFullyInitialized(),s.filtersNodes());this.viewCache_=_c(p,m),this.eventGenerator_=new z2(this.query_)}get query(){return this.query_}}function gb(t){return t.viewCache_.serverCache.getNode()}function vb(t){return Fl(t.viewCache_)}function yb(t,e){const n=Vr(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!Y(e)&&!n.getImmediateChild(K(e)).isEmpty())?n.getChild(e):null}function Ev(t){return t.eventRegistrations_.length===0}function _b(t,e){t.eventRegistrations_.push(e)}function Sv(t,e,n){const r=[];if(n){D(e==null,"A cancel should cancel all event registrations.");const i=t.query._path;t.eventRegistrations_.forEach(s=>{const o=s.createCancelEvent(n,i);o&&r.push(o)})}if(e){let i=[];for(let s=0;s<t.eventRegistrations_.length;++s){const o=t.eventRegistrations_[s];if(!o.matches(e))i.push(o);else if(e.hasAnyCallback()){i=i.concat(t.eventRegistrations_.slice(s+1));break}}t.eventRegistrations_=i}else t.eventRegistrations_=[];return r}function Iv(t,e,n,r){e.type===Vt.MERGE&&e.source.queryId!==null&&(D(Vr(t.viewCache_),"We should always have a full cache before handling merges"),D(Fl(t.viewCache_),"Missing event cache, even though we have a server cache"));const i=t.viewCache_,s=cb(t.processor_,i,e,n,r);return lb(t.processor_,s.viewCache),D(s.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=s.viewCache,aw(t,s.changes,s.viewCache.eventCache.getNode(),null)}function xb(t,e){const n=t.viewCache_.eventCache,r=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(we,(s,o)=>{r.push($i(s,o))}),n.isFullyInitialized()&&r.push(Xx(n.getNode())),aw(t,r,n.getNode(),e)}function aw(t,e,n,r){const i=r?[r]:t.eventRegistrations_;return V2(t.eventGenerator_,e,n,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let $l;class lw{constructor(){this.views=new Map}}function wb(t){D(!$l,"__referenceConstructor has already been defined"),$l=t}function Eb(){return D($l,"Reference.ts has not been loaded"),$l}function Sb(t){return t.views.size===0}function Hf(t,e,n,r){const i=e.source.queryId;if(i!==null){const s=t.views.get(i);return D(s!=null,"SyncTree gave us an op for an invalid query."),Iv(s,e,n,r)}else{let s=[];for(const o of t.views.values())s=s.concat(Iv(o,e,n,r));return s}}function cw(t,e,n,r,i){const s=e._queryIdentifier,o=t.views.get(s);if(!o){let l=Ul(n,i?r:null),c=!1;l?c=!0:r instanceof B?(l=Vf(n,r),c=!1):(l=B.EMPTY_NODE,c=!1);const h=_c(new dr(l,c,!1),new dr(r,i,!1));return new mb(e,h)}return o}function Ib(t,e,n,r,i,s){const o=cw(t,e,r,i,s);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),_b(o,n),xb(o,n)}function kb(t,e,n,r){const i=e._queryIdentifier,s=[];let o=[];const l=hr(t);if(i==="default")for(const[c,h]of t.views.entries())o=o.concat(Sv(h,n,r)),Ev(h)&&(t.views.delete(c),h.query._queryParams.loadsAllData()||s.push(h.query));else{const c=t.views.get(i);c&&(o=o.concat(Sv(c,n,r)),Ev(c)&&(t.views.delete(i),c.query._queryParams.loadsAllData()||s.push(c.query)))}return l&&!hr(t)&&s.push(new(Eb())(e._repo,e._path)),{removed:s,events:o}}function uw(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function ar(t,e){let n=null;for(const r of t.views.values())n=n||yb(r,e);return n}function dw(t,e){if(e._queryParams.loadsAllData())return wc(t);{const r=e._queryIdentifier;return t.views.get(r)}}function hw(t,e){return dw(t,e)!=null}function hr(t){return wc(t)!=null}function wc(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Bl;function Cb(t){D(!Bl,"__referenceConstructor has already been defined"),Bl=t}function Tb(){return D(Bl,"Reference.ts has not been loaded"),Bl}let Nb=1;class kv{constructor(e){this.listenProvider_=e,this.syncPointTree_=new le(null),this.pendingWriteTree_=rb(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function fw(t,e,n,r,i){return W2(t.pendingWriteTree_,e,n,r,i),i?es(t,new zr(Ff(),e,n)):[]}function bb(t,e,n,r){G2(t.pendingWriteTree_,e,n,r);const i=le.fromObject(n);return es(t,new Bi(Ff(),e,i))}function Yn(t,e,n=!1){const r=K2(t.pendingWriteTree_,e);if(q2(t.pendingWriteTree_,e)){let s=new le(null);return r.snap!=null?s=s.set(te(),!0):ze(r.children,o=>{s=s.set(new se(o),!0)}),es(t,new Ml(r.path,s,n))}else return[]}function Wo(t,e,n){return es(t,new zr(Uf(),e,n))}function Rb(t,e,n){const r=le.fromObject(n);return es(t,new Bi(Uf(),e,r))}function Ab(t,e){return es(t,new ko(Uf(),e))}function Pb(t,e,n){const r=Gf(t,n);if(r){const i=Kf(r),s=i.path,o=i.queryId,l=tt(s,e),c=new ko(zf(o),l);return qf(t,s,c)}else return[]}function Hl(t,e,n,r,i=!1){const s=e._path,o=t.syncPointTree_.get(s);let l=[];if(o&&(e._queryIdentifier==="default"||hw(o,e))){const c=kb(o,e,n,r);Sb(o)&&(t.syncPointTree_=t.syncPointTree_.remove(s));const h=c.removed;if(l=c.events,!i){const m=h.findIndex(v=>v._queryParams.loadsAllData())!==-1,p=t.syncPointTree_.findOnPath(s,(v,N)=>hr(N));if(m&&!p){const v=t.syncPointTree_.subtree(s);if(!v.isEmpty()){const N=Db(v);for(let k=0;k<N.length;++k){const P=N[k],M=P.query,I=vw(t,P);t.listenProvider_.startListening(qs(M),Co(t,M),I.hashFn,I.onComplete)}}}!p&&h.length>0&&!r&&(m?t.listenProvider_.stopListening(qs(e),null):h.forEach(v=>{const N=t.queryToTagMap.get(Ec(v));t.listenProvider_.stopListening(qs(v),N)}))}Lb(t,h)}return l}function pw(t,e,n,r){const i=Gf(t,r);if(i!=null){const s=Kf(i),o=s.path,l=s.queryId,c=tt(o,e),h=new zr(zf(l),c,n);return qf(t,o,h)}else return[]}function jb(t,e,n,r){const i=Gf(t,r);if(i){const s=Kf(i),o=s.path,l=s.queryId,c=tt(o,e),h=le.fromObject(n),m=new Bi(zf(l),c,h);return qf(t,o,m)}else return[]}function oh(t,e,n,r=!1){const i=e._path;let s=null,o=!1;t.syncPointTree_.foreachOnPath(i,(v,N)=>{const k=tt(v,i);s=s||ar(N,k),o=o||hr(N)});let l=t.syncPointTree_.get(i);l?(o=o||hr(l),s=s||ar(l,te())):(l=new lw,t.syncPointTree_=t.syncPointTree_.set(i,l));let c;s!=null?c=!0:(c=!1,s=B.EMPTY_NODE,t.syncPointTree_.subtree(i).foreachChild((N,k)=>{const P=ar(k,te());P&&(s=s.updateImmediateChild(N,P))}));const h=hw(l,e);if(!h&&!e._queryParams.loadsAllData()){const v=Ec(e);D(!t.queryToTagMap.has(v),"View does not exist, but we have a tag");const N=Mb();t.queryToTagMap.set(v,N),t.tagToQueryMap.set(N,v)}const m=xc(t.pendingWriteTree_,i);let p=Ib(l,e,n,m,s,c);if(!h&&!o&&!r){const v=dw(l,e);p=p.concat(Fb(t,e,v))}return p}function Wf(t,e,n){const i=t.pendingWriteTree_,s=t.syncPointTree_.findOnPath(e,(o,l)=>{const c=tt(o,e),h=ar(l,c);if(h)return h});return nw(i,e,s,n,!0)}function Ob(t,e){const n=e._path;let r=null;t.syncPointTree_.foreachOnPath(n,(h,m)=>{const p=tt(h,n);r=r||ar(m,p)});let i=t.syncPointTree_.get(n);i?r=r||ar(i,te()):(i=new lw,t.syncPointTree_=t.syncPointTree_.set(n,i));const s=r!=null,o=s?new dr(r,!0,!1):null,l=xc(t.pendingWriteTree_,e._path),c=cw(i,e,l,s?o.getNode():B.EMPTY_NODE,s);return vb(c)}function es(t,e){return mw(e,t.syncPointTree_,null,xc(t.pendingWriteTree_,te()))}function mw(t,e,n,r){if(Y(t.path))return gw(t,e,n,r);{const i=e.get(te());n==null&&i!=null&&(n=ar(i,te()));let s=[];const o=K(t.path),l=t.operationForChild(o),c=e.children.get(o);if(c&&l){const h=n?n.getImmediateChild(o):null,m=rw(r,o);s=s.concat(mw(l,c,h,m))}return i&&(s=s.concat(Hf(i,t,r,n))),s}}function gw(t,e,n,r){const i=e.get(te());n==null&&i!=null&&(n=ar(i,te()));let s=[];return e.children.inorderTraversal((o,l)=>{const c=n?n.getImmediateChild(o):null,h=rw(r,o),m=t.operationForChild(o);m&&(s=s.concat(gw(m,l,c,h)))}),i&&(s=s.concat(Hf(i,t,r,n))),s}function vw(t,e){const n=e.query,r=Co(t,n);return{hashFn:()=>(gb(e)||B.EMPTY_NODE).hash(),onComplete:i=>{if(i==="ok")return r?Pb(t,n._path,r):Ab(t,n._path);{const s=AN(i,n);return Hl(t,n,null,s)}}}}function Co(t,e){const n=Ec(e);return t.queryToTagMap.get(n)}function Ec(t){return t._path.toString()+"$"+t._queryIdentifier}function Gf(t,e){return t.tagToQueryMap.get(e)}function Kf(t){const e=t.indexOf("$");return D(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new se(t.substr(0,e))}}function qf(t,e,n){const r=t.syncPointTree_.get(e);D(r,"Missing sync point for query tag that we're tracking");const i=xc(t.pendingWriteTree_,e);return Hf(r,n,i,null)}function Db(t){return t.fold((e,n,r)=>{if(n&&hr(n))return[wc(n)];{let i=[];return n&&(i=uw(n)),ze(r,(s,o)=>{i=i.concat(o)}),i}})}function qs(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(Tb())(t._repo,t._path):t}function Lb(t,e){for(let n=0;n<e.length;++n){const r=e[n];if(!r._queryParams.loadsAllData()){const i=Ec(r),s=t.queryToTagMap.get(i);t.queryToTagMap.delete(i),t.tagToQueryMap.delete(s)}}}function Mb(){return Nb++}function Fb(t,e,n){const r=e._path,i=Co(t,e),s=vw(t,n),o=t.listenProvider_.startListening(qs(e),i,s.hashFn,s.onComplete),l=t.syncPointTree_.subtree(r);if(i)D(!hr(l.value),"If we're adding a query, it shouldn't be shadowed");else{const c=l.fold((h,m,p)=>{if(!Y(h)&&m&&hr(m))return[wc(m).query];{let v=[];return m&&(v=v.concat(uw(m).map(N=>N.query))),ze(p,(N,k)=>{v=v.concat(k)}),v}});for(let h=0;h<c.length;++h){const m=c[h];t.listenProvider_.stopListening(qs(m),Co(t,m))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yf{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new Yf(n)}node(){return this.node_}}class Qf{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=xe(this.path_,e);return new Qf(this.syncTree_,n)}node(){return Wf(this.syncTree_,this.path_)}}const Ub=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},Cv=function(t,e,n){if(!t||typeof t!="object")return t;if(D(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return zb(t[".sv"],e,n);if(typeof t[".sv"]=="object")return Vb(t[".sv"],e);D(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},zb=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:D(!1,"Unexpected server value: "+t)}},Vb=function(t,e,n){t.hasOwnProperty("increment")||D(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const r=t.increment;typeof r!="number"&&D(!1,"Unexpected increment value: "+r);const i=e.node();if(D(i!==null&&typeof i<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return r;const o=i.getValue();return typeof o!="number"?r:o+r},yw=function(t,e,n,r){return Xf(e,new Qf(n,t),r)},_w=function(t,e,n){return Xf(t,new Yf(e),n)};function Xf(t,e,n){const r=t.getPriority().val(),i=Cv(r,e.getImmediateChild(".priority"),n);let s;if(t.isLeafNode()){const o=t,l=Cv(o.getValue(),e,n);return l!==o.getValue()||i!==o.getPriority().val()?new Re(l,Te(i)):t}else{const o=t;return s=o,i!==o.getPriority().val()&&(s=s.updatePriority(new Re(i))),o.forEachChild(we,(l,c)=>{const h=Xf(c,e.getImmediateChild(l),n);h!==c&&(s=s.updateImmediateChild(l,h))}),s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jf{constructor(e="",n=null,r={children:{},childCount:0}){this.name=e,this.parent=n,this.node=r}}function Zf(t,e){let n=e instanceof se?e:new se(e),r=t,i=K(n);for(;i!==null;){const s=Ui(r.node.children,i)||{children:{},childCount:0};r=new Jf(i,r,s),n=ce(n),i=K(n)}return r}function ts(t){return t.node.value}function xw(t,e){t.node.value=e,ah(t)}function ww(t){return t.node.childCount>0}function $b(t){return ts(t)===void 0&&!ww(t)}function Sc(t,e){ze(t.node.children,(n,r)=>{e(new Jf(n,t,r))})}function Ew(t,e,n,r){n&&e(t),Sc(t,i=>{Ew(i,e,!0)})}function Bb(t,e,n){let r=t.parent;for(;r!==null;){if(e(r))return!0;r=r.parent}return!1}function Go(t){return new se(t.parent===null?t.name:Go(t.parent)+"/"+t.name)}function ah(t){t.parent!==null&&Hb(t.parent,t.name,t)}function Hb(t,e,n){const r=$b(n),i=on(t.node.children,e);r&&i?(delete t.node.children[e],t.node.childCount--,ah(t)):!r&&!i&&(t.node.children[e]=n.node,t.node.childCount++,ah(t))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wb=/[\[\].#$\/\u0000-\u001F\u007F]/,Gb=/[\[\].#$\u0000-\u001F\u007F]/,Vu=10*1024*1024,ep=function(t){return typeof t=="string"&&t.length!==0&&!Wb.test(t)},Sw=function(t){return typeof t=="string"&&t.length!==0&&!Gb.test(t)},Kb=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),Sw(t)},qb=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!Tf(t)||t&&typeof t=="object"&&on(t,".sv")},Yb=function(t,e,n,r){Ic(hc(t,"value"),e,n)},Ic=function(t,e,n){const r=n instanceof se?new d2(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+Ir(r));if(typeof e=="function")throw new Error(t+"contains a function "+Ir(r)+" with contents = "+e.toString());if(Tf(e))throw new Error(t+"contains "+e.toString()+" "+Ir(r));if(typeof e=="string"&&e.length>Vu/3&&fc(e)>Vu)throw new Error(t+"contains a string greater than "+Vu+" utf8 bytes "+Ir(r)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let i=!1,s=!1;if(ze(e,(o,l)=>{if(o===".value")i=!0;else if(o!==".priority"&&o!==".sv"&&(s=!0,!ep(o)))throw new Error(t+" contains an invalid key ("+o+") "+Ir(r)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);h2(r,o),Ic(t,l,r),f2(r)}),i&&s)throw new Error(t+' contains ".value" child '+Ir(r)+" in addition to actual children.")}},Qb=function(t,e){let n,r;for(n=0;n<e.length;n++){r=e[n];const s=wo(r);for(let o=0;o<s.length;o++)if(!(s[o]===".priority"&&o===s.length-1)){if(!ep(s[o]))throw new Error(t+"contains an invalid key ("+s[o]+") in path "+r.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(u2);let i=null;for(n=0;n<e.length;n++){if(r=e[n],i!==null&&bt(i,r))throw new Error(t+"contains a path "+i.toString()+" that is ancestor of another path "+r.toString());i=r}},Xb=function(t,e,n,r){const i=hc(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(i+" must be an object containing the children to replace.");const s=[];ze(e,(o,l)=>{const c=new se(o);if(Ic(i,l,xe(n,c)),Pf(c)===".priority"&&!qb(l))throw new Error(i+"contains an invalid value for '"+c.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");s.push(c)}),Qb(i,s)},Iw=function(t,e,n,r){if(!Sw(n))throw new Error(hc(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},Jb=function(t,e,n,r){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),Iw(t,e,n)},kw=function(t,e){if(K(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},Zb=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!ep(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!Kb(n))throw new Error(hc(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eR{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function kc(t,e){let n=null;for(let r=0;r<e.length;r++){const i=e[r],s=i.getPath();n!==null&&!jf(s,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:s}),n.events.push(i)}n&&t.eventLists_.push(n)}function Cw(t,e,n){kc(t,n),Tw(t,r=>jf(r,e))}function Ot(t,e,n){kc(t,n),Tw(t,r=>bt(r,e)||bt(e,r))}function Tw(t,e){t.recursionDepth_++;let n=!0;for(let r=0;r<t.eventLists_.length;r++){const i=t.eventLists_[r];if(i){const s=i.path;e(s)?(tR(t.eventLists_[r]),t.eventLists_[r]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function tR(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const r=n.getEventRunner();Hs&&Me("event: "+n.toString()),Zi(r)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nR="repo_interrupt",rR=25;class iR{constructor(e,n,r,i){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=r,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new eR,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Ll(),this.transactionQueueTree_=new Jf,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function sR(t,e,n){if(t.stats_=Rf(t.repoInfo_),t.forceRestClient_||DN())t.server_=new Dl(t.repoInfo_,(r,i,s,o)=>{Tv(t,r,i,s,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>Nv(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{Ne(n)}catch(r){throw new Error("Invalid authOverride provided: "+r)}}t.persistentConnection_=new Sn(t.repoInfo_,e,(r,i,s,o)=>{Tv(t,r,i,s,o)},r=>{Nv(t,r)},r=>{aR(t,r)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(r=>{t.server_.refreshAuthToken(r)}),t.appCheckProvider_.addTokenChangeListener(r=>{t.server_.refreshAppCheckToken(r.token)}),t.statsReporter_=zN(t.repoInfo_,()=>new U2(t.stats_,t.server_)),t.infoData_=new O2,t.infoSyncTree_=new kv({startListening:(r,i,s,o)=>{let l=[];const c=t.infoData_.getNode(r._path);return c.isEmpty()||(l=Wo(t.infoSyncTree_,r._path,c),setTimeout(()=>{o("ok")},0)),l},stopListening:()=>{}}),tp(t,"connected",!1),t.serverSyncTree_=new kv({startListening:(r,i,s,o)=>(t.server_.listen(r,s,i,(l,c)=>{const h=o(l,c);Ot(t.eventQueue_,r._path,h)}),[]),stopListening:(r,i)=>{t.server_.unlisten(r,i)}})}function oR(t){const n=t.infoData_.getNode(new se(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function Cc(t){return Ub({timestamp:oR(t)})}function Tv(t,e,n,r,i){t.dataUpdateCount++;const s=new se(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(i)if(r){const c=kl(n,h=>Te(h));o=jb(t.serverSyncTree_,s,c,i)}else{const c=Te(n);o=pw(t.serverSyncTree_,s,c,i)}else if(r){const c=kl(n,h=>Te(h));o=Rb(t.serverSyncTree_,s,c)}else{const c=Te(n);o=Wo(t.serverSyncTree_,s,c)}let l=s;o.length>0&&(l=Wi(t,s)),Ot(t.eventQueue_,l,o)}function Nv(t,e){tp(t,"connected",e),e===!1&&dR(t)}function aR(t,e){ze(e,(n,r)=>{tp(t,n,r)})}function tp(t,e,n){const r=new se("/.info/"+e),i=Te(n);t.infoData_.updateSnapshot(r,i);const s=Wo(t.infoSyncTree_,r,i);Ot(t.eventQueue_,r,s)}function np(t){return t.nextWriteId_++}function lR(t,e,n){const r=Ob(t.serverSyncTree_,e);return r!=null?Promise.resolve(r):t.server_.get(e).then(i=>{const s=Te(i).withIndex(e._queryParams.getIndex());oh(t.serverSyncTree_,e,n,!0);let o;if(e._queryParams.loadsAllData())o=Wo(t.serverSyncTree_,e._path,s);else{const l=Co(t.serverSyncTree_,e);o=pw(t.serverSyncTree_,e._path,s,l)}return Ot(t.eventQueue_,e._path,o),Hl(t.serverSyncTree_,e,n,null,!0),s},i=>(Ko(t,"get for query "+Ne(e)+" failed: "+i),Promise.reject(new Error(i))))}function cR(t,e,n,r,i){Ko(t,"set",{path:e.toString(),value:n,priority:r});const s=Cc(t),o=Te(n,r),l=Wf(t.serverSyncTree_,e),c=_w(o,l,s),h=np(t),m=fw(t.serverSyncTree_,e,c,h,!0);kc(t.eventQueue_,m),t.server_.put(e.toString(),o.val(!0),(v,N)=>{const k=v==="ok";k||rt("set at "+e+" failed: "+v);const P=Yn(t.serverSyncTree_,h,!k);Ot(t.eventQueue_,e,P),lh(t,i,v,N)});const p=ip(t,e);Wi(t,p),Ot(t.eventQueue_,p,[])}function uR(t,e,n,r){Ko(t,"update",{path:e.toString(),value:n});let i=!0;const s=Cc(t),o={};if(ze(n,(l,c)=>{i=!1,o[l]=yw(xe(e,l),Te(c),t.serverSyncTree_,s)}),i)Me("update() called with empty data.  Don't do anything."),lh(t,r,"ok",void 0);else{const l=np(t),c=bb(t.serverSyncTree_,e,o,l);kc(t.eventQueue_,c),t.server_.merge(e.toString(),n,(h,m)=>{const p=h==="ok";p||rt("update at "+e+" failed: "+h);const v=Yn(t.serverSyncTree_,l,!p),N=v.length>0?Wi(t,e):e;Ot(t.eventQueue_,N,v),lh(t,r,h,m)}),ze(n,h=>{const m=ip(t,xe(e,h));Wi(t,m)}),Ot(t.eventQueue_,e,[])}}function dR(t){Ko(t,"onDisconnectEvents");const e=Cc(t),n=Ll();eh(t.onDisconnect_,te(),(i,s)=>{const o=yw(i,s,t.serverSyncTree_,e);Jx(n,i,o)});let r=[];eh(n,te(),(i,s)=>{r=r.concat(Wo(t.serverSyncTree_,i,s));const o=ip(t,i);Wi(t,o)}),t.onDisconnect_=Ll(),Ot(t.eventQueue_,te(),r)}function hR(t,e,n){let r;K(e._path)===".info"?r=oh(t.infoSyncTree_,e,n):r=oh(t.serverSyncTree_,e,n),Cw(t.eventQueue_,e._path,r)}function bv(t,e,n){let r;K(e._path)===".info"?r=Hl(t.infoSyncTree_,e,n):r=Hl(t.serverSyncTree_,e,n),Cw(t.eventQueue_,e._path,r)}function fR(t){t.persistentConnection_&&t.persistentConnection_.interrupt(nR)}function Ko(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),Me(n,...e)}function lh(t,e,n,r){e&&Zi(()=>{if(n==="ok")e(null);else{const i=(n||"error").toUpperCase();let s=i;r&&(s+=": "+r);const o=new Error(s);o.code=i,e(o)}})}function Nw(t,e,n){return Wf(t.serverSyncTree_,e,n)||B.EMPTY_NODE}function rp(t,e=t.transactionQueueTree_){if(e||Tc(t,e),ts(e)){const n=Rw(t,e);D(n.length>0,"Sending zero length transaction queue"),n.every(i=>i.status===0)&&pR(t,Go(e),n)}else ww(e)&&Sc(e,n=>{rp(t,n)})}function pR(t,e,n){const r=n.map(h=>h.currentWriteId),i=Nw(t,e,r);let s=i;const o=i.hash();for(let h=0;h<n.length;h++){const m=n[h];D(m.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),m.status=1,m.retryCount++;const p=tt(e,m.path);s=s.updateChild(p,m.currentOutputSnapshotRaw)}const l=s.val(!0),c=e;t.server_.put(c.toString(),l,h=>{Ko(t,"transaction put response",{path:c.toString(),status:h});let m=[];if(h==="ok"){const p=[];for(let v=0;v<n.length;v++)n[v].status=2,m=m.concat(Yn(t.serverSyncTree_,n[v].currentWriteId)),n[v].onComplete&&p.push(()=>n[v].onComplete(null,!0,n[v].currentOutputSnapshotResolved)),n[v].unwatcher();Tc(t,Zf(t.transactionQueueTree_,e)),rp(t,t.transactionQueueTree_),Ot(t.eventQueue_,e,m);for(let v=0;v<p.length;v++)Zi(p[v])}else{if(h==="datastale")for(let p=0;p<n.length;p++)n[p].status===3?n[p].status=4:n[p].status=0;else{rt("transaction at "+c.toString()+" failed: "+h);for(let p=0;p<n.length;p++)n[p].status=4,n[p].abortReason=h}Wi(t,e)}},o)}function Wi(t,e){const n=bw(t,e),r=Go(n),i=Rw(t,n);return mR(t,i,r),r}function mR(t,e,n){if(e.length===0)return;const r=[];let i=[];const o=e.filter(l=>l.status===0).map(l=>l.currentWriteId);for(let l=0;l<e.length;l++){const c=e[l],h=tt(n,c.path);let m=!1,p;if(D(h!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),c.status===4)m=!0,p=c.abortReason,i=i.concat(Yn(t.serverSyncTree_,c.currentWriteId,!0));else if(c.status===0)if(c.retryCount>=rR)m=!0,p="maxretry",i=i.concat(Yn(t.serverSyncTree_,c.currentWriteId,!0));else{const v=Nw(t,c.path,o);c.currentInputSnapshot=v;const N=e[l].update(v.val());if(N!==void 0){Ic("transaction failed: Data returned ",N,c.path);let k=Te(N);typeof N=="object"&&N!=null&&on(N,".priority")||(k=k.updatePriority(v.getPriority()));const M=c.currentWriteId,I=Cc(t),w=_w(k,v,I);c.currentOutputSnapshotRaw=k,c.currentOutputSnapshotResolved=w,c.currentWriteId=np(t),o.splice(o.indexOf(M),1),i=i.concat(fw(t.serverSyncTree_,c.path,w,c.currentWriteId,c.applyLocally)),i=i.concat(Yn(t.serverSyncTree_,M,!0))}else m=!0,p="nodata",i=i.concat(Yn(t.serverSyncTree_,c.currentWriteId,!0))}Ot(t.eventQueue_,n,i),i=[],m&&(e[l].status=2,function(v){setTimeout(v,Math.floor(0))}(e[l].unwatcher),e[l].onComplete&&(p==="nodata"?r.push(()=>e[l].onComplete(null,!1,e[l].currentInputSnapshot)):r.push(()=>e[l].onComplete(new Error(p),!1,null))))}Tc(t,t.transactionQueueTree_);for(let l=0;l<r.length;l++)Zi(r[l]);rp(t,t.transactionQueueTree_)}function bw(t,e){let n,r=t.transactionQueueTree_;for(n=K(e);n!==null&&ts(r)===void 0;)r=Zf(r,n),e=ce(e),n=K(e);return r}function Rw(t,e){const n=[];return Aw(t,e,n),n.sort((r,i)=>r.order-i.order),n}function Aw(t,e,n){const r=ts(e);if(r)for(let i=0;i<r.length;i++)n.push(r[i]);Sc(e,i=>{Aw(t,i,n)})}function Tc(t,e){const n=ts(e);if(n){let r=0;for(let i=0;i<n.length;i++)n[i].status!==2&&(n[r]=n[i],r++);n.length=r,xw(e,n.length>0?n:void 0)}Sc(e,r=>{Tc(t,r)})}function ip(t,e){const n=Go(bw(t,e)),r=Zf(t.transactionQueueTree_,e);return Bb(r,i=>{$u(t,i)}),$u(t,r),Ew(r,i=>{$u(t,i)}),n}function $u(t,e){const n=ts(e);if(n){const r=[];let i=[],s=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(D(s===o-1,"All SENT items should be at beginning of queue."),s=o,n[o].status=3,n[o].abortReason="set"):(D(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),i=i.concat(Yn(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&r.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));s===-1?xw(e,void 0):n.length=s+1,Ot(t.eventQueue_,Go(e),i);for(let o=0;o<r.length;o++)Zi(r[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gR(t){let e="";const n=t.split("/");for(let r=0;r<n.length;r++)if(n[r].length>0){let i=n[r];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch{}e+="/"+i}return e}function vR(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const r=n.split("=");r.length===2?e[decodeURIComponent(r[0])]=decodeURIComponent(r[1]):rt(`Invalid query segment '${n}' in query '${t}'`)}return e}const Rv=function(t,e){const n=yR(t),r=n.namespace;n.domain==="firebase.com"&&Rn(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!r||r==="undefined")&&n.domain!=="localhost"&&Rn("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||CN();const i=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new Dx(n.host,n.secure,r,i,e,"",r!==n.subdomain),path:new se(n.pathString)}},yR=function(t){let e="",n="",r="",i="",s="",o=!0,l="https",c=443;if(typeof t=="string"){let h=t.indexOf("//");h>=0&&(l=t.substring(0,h-1),t=t.substring(h+2));let m=t.indexOf("/");m===-1&&(m=t.length);let p=t.indexOf("?");p===-1&&(p=t.length),e=t.substring(0,Math.min(m,p)),m<p&&(i=gR(t.substring(m,p)));const v=vR(t.substring(Math.min(t.length,p)));h=e.indexOf(":"),h>=0?(o=l==="https"||l==="wss",c=parseInt(e.substring(h+1),10)):h=e.length;const N=e.slice(0,h);if(N.toLowerCase()==="localhost")n="localhost";else if(N.split(".").length<=2)n=N;else{const k=e.indexOf(".");r=e.substring(0,k).toLowerCase(),n=e.substring(k+1),s=r}"ns"in v&&(s=v.ns)}return{host:e,port:c,domain:n,subdomain:r,secure:o,scheme:l,pathString:i,namespace:s}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _R{constructor(e,n,r,i){this.eventType=e,this.eventRegistration=n,this.snapshot=r,this.prevName=i}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+Ne(this.snapshot.exportVal())}}class xR{constructor(e,n,r){this.eventRegistration=e,this.error=n,this.path=r}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pw{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return D(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sp{constructor(e,n,r,i){this._repo=e,this._path=n,this._queryParams=r,this._orderByCalled=i}get key(){return Y(this._path)?null:Pf(this._path)}get ref(){return new jn(this._repo,this._path)}get _queryIdentifier(){const e=mv(this._queryParams),n=Nf(e);return n==="{}"?"default":n}get _queryObject(){return mv(this._queryParams)}isEqual(e){if(e=Oe(e),!(e instanceof sp))return!1;const n=this._repo===e._repo,r=jf(this._path,e._path),i=this._queryIdentifier===e._queryIdentifier;return n&&r&&i}toJSON(){return this.toString()}toString(){return this._repo.toString()+c2(this._path)}}class jn extends sp{constructor(e,n){super(e,n,new Mf,!1)}get parent(){const e=Hx(this._path);return e===null?null:new jn(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class To{constructor(e,n,r){this._node=e,this.ref=n,this._index=r}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new se(e),r=ch(this.ref,e);return new To(this._node.getChild(n),r,we)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(r,i)=>e(new To(i,ch(this.ref,r),we)))}hasChild(e){const n=new se(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function Je(t,e){return t=Oe(t),t._checkNotDeleted("ref"),e!==void 0?ch(t._root,e):t._root}function ch(t,e){return t=Oe(t),K(t._path)===null?Jb("child","path",e):Iw("child","path",e),new jn(t._repo,xe(t._path,e))}function wR(t){return kw("remove",t._path),uh(t,null)}function uh(t,e){t=Oe(t),kw("set",t._path),Yb("set",e,t._path);const n=new Lo;return cR(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}function Av(t,e){Xb("update",e,t._path);const n=new Lo;return uR(t._repo,t._path,e,n.wrapCallback(()=>{})),n.promise}function Ya(t){t=Oe(t);const e=new Pw(()=>{}),n=new Nc(e);return lR(t._repo,t,n).then(r=>new To(r,new jn(t._repo,t._path),t._queryParams.getIndex()))}class Nc{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const r=n._queryParams.getIndex();return new _R("value",this,new To(e.snapshotNode,new jn(n._repo,n._path),r))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new xR(this,e,n):null}matches(e){return e instanceof Nc?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function ER(t,e,n,r,i){let s;if(typeof r=="object"&&(s=void 0,i=r),typeof r=="function"&&(s=r),i&&i.onlyOnce){const c=n,h=(m,p)=>{bv(t._repo,t,l),c(m,p)};h.userCallback=n.userCallback,h.context=n.context,n=h}const o=new Pw(n,s||void 0),l=new Nc(o);return hR(t._repo,t,l),()=>bv(t._repo,t,l)}function ii(t,e,n,r){return ER(t,"value",e,n,r)}wb(jn);Cb(jn);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const SR="FIREBASE_DATABASE_EMULATOR_HOST",dh={};let IR=!1;function kR(t,e,n,r){t.repoInfo_=new Dx(`${e}:${n}`,!1,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0),r&&(t.authTokenProvider_=r)}function CR(t,e,n,r,i){let s=r||t.options.databaseURL;s===void 0&&(t.options.projectId||Rn("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),Me("Using default host for project ",t.options.projectId),s=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=Rv(s,i),l=o.repoInfo,c;typeof process<"u"&&Xg&&(c=Xg[SR]),c?(s=`http://${c}?ns=${l.namespace}`,o=Rv(s,i),l=o.repoInfo):o.repoInfo.secure;const h=new MN(t.name,t.options,e);Zb("Invalid Firebase Database URL",o),Y(o.path)||Rn("Database URL must point to the root of a Firebase Database (not including a child path).");const m=NR(l,t,h,new LN(t.name,n));return new bR(m,t)}function TR(t,e){const n=dh[e];(!n||n[t.key]!==t)&&Rn(`Database ${e}(${t.repoInfo_}) has already been deleted.`),fR(t),delete n[t.key]}function NR(t,e,n,r){let i=dh[e.name];i||(i={},dh[e.name]=i);let s=i[t.toURLString()];return s&&Rn("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),s=new iR(t,IR,n,r),i[t.toURLString()]=s,s}class bR{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(sR(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new jn(this._repo,te())),this._rootInternal}_delete(){return this._rootInternal!==null&&(TR(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Rn("Cannot call "+e+" on a deleted database.")}}function RR(t=pc(),e){const n=gr(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const r=C_("database");r&&AR(n,...r)}return n}function AR(t,e,n,r={}){t=Oe(t),t._checkNotDeleted("useEmulator"),t._instanceStarted&&Rn("Cannot call useEmulator() after instance has already been initialized.");const i=t._repoInternal;let s;if(i.repoInfo_.nodeAdmin)r.mockUserToken&&Rn('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),s=new qa(qa.OWNER);else if(r.mockUserToken){const o=typeof r.mockUserToken=="string"?r.mockUserToken:b_(r.mockUserToken,t.app.options.projectId);s=new qa(o)}kR(i,e,n,s)}/**
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
 */function PR(t){xN(Kr),Kt(new jt("database",(e,{instanceIdentifier:n})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),s=e.getProvider("app-check-internal");return CR(r,i,s,n)},"PUBLIC").setMultipleInstances(!0)),mt(Jg,Zg,t),mt(Jg,Zg,"esm2017")}Sn.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};Sn.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};PR();var Pv=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var jw;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(E,y){function _(){}_.prototype=y.prototype,E.D=y.prototype,E.prototype=new _,E.prototype.constructor=E,E.C=function(S,C,b){for(var x=Array(arguments.length-2),X=2;X<arguments.length;X++)x[X-2]=arguments[X];return y.prototype[C].apply(S,x)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(E,y,_){_||(_=0);var S=Array(16);if(typeof y=="string")for(var C=0;16>C;++C)S[C]=y.charCodeAt(_++)|y.charCodeAt(_++)<<8|y.charCodeAt(_++)<<16|y.charCodeAt(_++)<<24;else for(C=0;16>C;++C)S[C]=y[_++]|y[_++]<<8|y[_++]<<16|y[_++]<<24;y=E.g[0],_=E.g[1],C=E.g[2];var b=E.g[3],x=y+(b^_&(C^b))+S[0]+3614090360&4294967295;y=_+(x<<7&4294967295|x>>>25),x=b+(C^y&(_^C))+S[1]+3905402710&4294967295,b=y+(x<<12&4294967295|x>>>20),x=C+(_^b&(y^_))+S[2]+606105819&4294967295,C=b+(x<<17&4294967295|x>>>15),x=_+(y^C&(b^y))+S[3]+3250441966&4294967295,_=C+(x<<22&4294967295|x>>>10),x=y+(b^_&(C^b))+S[4]+4118548399&4294967295,y=_+(x<<7&4294967295|x>>>25),x=b+(C^y&(_^C))+S[5]+1200080426&4294967295,b=y+(x<<12&4294967295|x>>>20),x=C+(_^b&(y^_))+S[6]+2821735955&4294967295,C=b+(x<<17&4294967295|x>>>15),x=_+(y^C&(b^y))+S[7]+4249261313&4294967295,_=C+(x<<22&4294967295|x>>>10),x=y+(b^_&(C^b))+S[8]+1770035416&4294967295,y=_+(x<<7&4294967295|x>>>25),x=b+(C^y&(_^C))+S[9]+2336552879&4294967295,b=y+(x<<12&4294967295|x>>>20),x=C+(_^b&(y^_))+S[10]+4294925233&4294967295,C=b+(x<<17&4294967295|x>>>15),x=_+(y^C&(b^y))+S[11]+2304563134&4294967295,_=C+(x<<22&4294967295|x>>>10),x=y+(b^_&(C^b))+S[12]+1804603682&4294967295,y=_+(x<<7&4294967295|x>>>25),x=b+(C^y&(_^C))+S[13]+4254626195&4294967295,b=y+(x<<12&4294967295|x>>>20),x=C+(_^b&(y^_))+S[14]+2792965006&4294967295,C=b+(x<<17&4294967295|x>>>15),x=_+(y^C&(b^y))+S[15]+1236535329&4294967295,_=C+(x<<22&4294967295|x>>>10),x=y+(C^b&(_^C))+S[1]+4129170786&4294967295,y=_+(x<<5&4294967295|x>>>27),x=b+(_^C&(y^_))+S[6]+3225465664&4294967295,b=y+(x<<9&4294967295|x>>>23),x=C+(y^_&(b^y))+S[11]+643717713&4294967295,C=b+(x<<14&4294967295|x>>>18),x=_+(b^y&(C^b))+S[0]+3921069994&4294967295,_=C+(x<<20&4294967295|x>>>12),x=y+(C^b&(_^C))+S[5]+3593408605&4294967295,y=_+(x<<5&4294967295|x>>>27),x=b+(_^C&(y^_))+S[10]+38016083&4294967295,b=y+(x<<9&4294967295|x>>>23),x=C+(y^_&(b^y))+S[15]+3634488961&4294967295,C=b+(x<<14&4294967295|x>>>18),x=_+(b^y&(C^b))+S[4]+3889429448&4294967295,_=C+(x<<20&4294967295|x>>>12),x=y+(C^b&(_^C))+S[9]+568446438&4294967295,y=_+(x<<5&4294967295|x>>>27),x=b+(_^C&(y^_))+S[14]+3275163606&4294967295,b=y+(x<<9&4294967295|x>>>23),x=C+(y^_&(b^y))+S[3]+4107603335&4294967295,C=b+(x<<14&4294967295|x>>>18),x=_+(b^y&(C^b))+S[8]+1163531501&4294967295,_=C+(x<<20&4294967295|x>>>12),x=y+(C^b&(_^C))+S[13]+2850285829&4294967295,y=_+(x<<5&4294967295|x>>>27),x=b+(_^C&(y^_))+S[2]+4243563512&4294967295,b=y+(x<<9&4294967295|x>>>23),x=C+(y^_&(b^y))+S[7]+1735328473&4294967295,C=b+(x<<14&4294967295|x>>>18),x=_+(b^y&(C^b))+S[12]+2368359562&4294967295,_=C+(x<<20&4294967295|x>>>12),x=y+(_^C^b)+S[5]+4294588738&4294967295,y=_+(x<<4&4294967295|x>>>28),x=b+(y^_^C)+S[8]+2272392833&4294967295,b=y+(x<<11&4294967295|x>>>21),x=C+(b^y^_)+S[11]+1839030562&4294967295,C=b+(x<<16&4294967295|x>>>16),x=_+(C^b^y)+S[14]+4259657740&4294967295,_=C+(x<<23&4294967295|x>>>9),x=y+(_^C^b)+S[1]+2763975236&4294967295,y=_+(x<<4&4294967295|x>>>28),x=b+(y^_^C)+S[4]+1272893353&4294967295,b=y+(x<<11&4294967295|x>>>21),x=C+(b^y^_)+S[7]+4139469664&4294967295,C=b+(x<<16&4294967295|x>>>16),x=_+(C^b^y)+S[10]+3200236656&4294967295,_=C+(x<<23&4294967295|x>>>9),x=y+(_^C^b)+S[13]+681279174&4294967295,y=_+(x<<4&4294967295|x>>>28),x=b+(y^_^C)+S[0]+3936430074&4294967295,b=y+(x<<11&4294967295|x>>>21),x=C+(b^y^_)+S[3]+3572445317&4294967295,C=b+(x<<16&4294967295|x>>>16),x=_+(C^b^y)+S[6]+76029189&4294967295,_=C+(x<<23&4294967295|x>>>9),x=y+(_^C^b)+S[9]+3654602809&4294967295,y=_+(x<<4&4294967295|x>>>28),x=b+(y^_^C)+S[12]+3873151461&4294967295,b=y+(x<<11&4294967295|x>>>21),x=C+(b^y^_)+S[15]+530742520&4294967295,C=b+(x<<16&4294967295|x>>>16),x=_+(C^b^y)+S[2]+3299628645&4294967295,_=C+(x<<23&4294967295|x>>>9),x=y+(C^(_|~b))+S[0]+4096336452&4294967295,y=_+(x<<6&4294967295|x>>>26),x=b+(_^(y|~C))+S[7]+1126891415&4294967295,b=y+(x<<10&4294967295|x>>>22),x=C+(y^(b|~_))+S[14]+2878612391&4294967295,C=b+(x<<15&4294967295|x>>>17),x=_+(b^(C|~y))+S[5]+4237533241&4294967295,_=C+(x<<21&4294967295|x>>>11),x=y+(C^(_|~b))+S[12]+1700485571&4294967295,y=_+(x<<6&4294967295|x>>>26),x=b+(_^(y|~C))+S[3]+2399980690&4294967295,b=y+(x<<10&4294967295|x>>>22),x=C+(y^(b|~_))+S[10]+4293915773&4294967295,C=b+(x<<15&4294967295|x>>>17),x=_+(b^(C|~y))+S[1]+2240044497&4294967295,_=C+(x<<21&4294967295|x>>>11),x=y+(C^(_|~b))+S[8]+1873313359&4294967295,y=_+(x<<6&4294967295|x>>>26),x=b+(_^(y|~C))+S[15]+4264355552&4294967295,b=y+(x<<10&4294967295|x>>>22),x=C+(y^(b|~_))+S[6]+2734768916&4294967295,C=b+(x<<15&4294967295|x>>>17),x=_+(b^(C|~y))+S[13]+1309151649&4294967295,_=C+(x<<21&4294967295|x>>>11),x=y+(C^(_|~b))+S[4]+4149444226&4294967295,y=_+(x<<6&4294967295|x>>>26),x=b+(_^(y|~C))+S[11]+3174756917&4294967295,b=y+(x<<10&4294967295|x>>>22),x=C+(y^(b|~_))+S[2]+718787259&4294967295,C=b+(x<<15&4294967295|x>>>17),x=_+(b^(C|~y))+S[9]+3951481745&4294967295,E.g[0]=E.g[0]+y&4294967295,E.g[1]=E.g[1]+(C+(x<<21&4294967295|x>>>11))&4294967295,E.g[2]=E.g[2]+C&4294967295,E.g[3]=E.g[3]+b&4294967295}r.prototype.u=function(E,y){y===void 0&&(y=E.length);for(var _=y-this.blockSize,S=this.B,C=this.h,b=0;b<y;){if(C==0)for(;b<=_;)i(this,E,b),b+=this.blockSize;if(typeof E=="string"){for(;b<y;)if(S[C++]=E.charCodeAt(b++),C==this.blockSize){i(this,S),C=0;break}}else for(;b<y;)if(S[C++]=E[b++],C==this.blockSize){i(this,S),C=0;break}}this.h=C,this.o+=y},r.prototype.v=function(){var E=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);E[0]=128;for(var y=1;y<E.length-8;++y)E[y]=0;var _=8*this.o;for(y=E.length-8;y<E.length;++y)E[y]=_&255,_/=256;for(this.u(E),E=Array(16),y=_=0;4>y;++y)for(var S=0;32>S;S+=8)E[_++]=this.g[y]>>>S&255;return E};function s(E,y){var _=l;return Object.prototype.hasOwnProperty.call(_,E)?_[E]:_[E]=y(E)}function o(E,y){this.h=y;for(var _=[],S=!0,C=E.length-1;0<=C;C--){var b=E[C]|0;S&&b==y||(_[C]=b,S=!1)}this.g=_}var l={};function c(E){return-128<=E&&128>E?s(E,function(y){return new o([y|0],0>y?-1:0)}):new o([E|0],0>E?-1:0)}function h(E){if(isNaN(E)||!isFinite(E))return p;if(0>E)return M(h(-E));for(var y=[],_=1,S=0;E>=_;S++)y[S]=E/_|0,_*=4294967296;return new o(y,0)}function m(E,y){if(E.length==0)throw Error("number format error: empty string");if(y=y||10,2>y||36<y)throw Error("radix out of range: "+y);if(E.charAt(0)=="-")return M(m(E.substring(1),y));if(0<=E.indexOf("-"))throw Error('number format error: interior "-" character');for(var _=h(Math.pow(y,8)),S=p,C=0;C<E.length;C+=8){var b=Math.min(8,E.length-C),x=parseInt(E.substring(C,C+b),y);8>b?(b=h(Math.pow(y,b)),S=S.j(b).add(h(x))):(S=S.j(_),S=S.add(h(x)))}return S}var p=c(0),v=c(1),N=c(16777216);t=o.prototype,t.m=function(){if(P(this))return-M(this).m();for(var E=0,y=1,_=0;_<this.g.length;_++){var S=this.i(_);E+=(0<=S?S:4294967296+S)*y,y*=4294967296}return E},t.toString=function(E){if(E=E||10,2>E||36<E)throw Error("radix out of range: "+E);if(k(this))return"0";if(P(this))return"-"+M(this).toString(E);for(var y=h(Math.pow(E,6)),_=this,S="";;){var C=j(_,y).g;_=I(_,C.j(y));var b=((0<_.g.length?_.g[0]:_.h)>>>0).toString(E);if(_=C,k(_))return b+S;for(;6>b.length;)b="0"+b;S=b+S}},t.i=function(E){return 0>E?0:E<this.g.length?this.g[E]:this.h};function k(E){if(E.h!=0)return!1;for(var y=0;y<E.g.length;y++)if(E.g[y]!=0)return!1;return!0}function P(E){return E.h==-1}t.l=function(E){return E=I(this,E),P(E)?-1:k(E)?0:1};function M(E){for(var y=E.g.length,_=[],S=0;S<y;S++)_[S]=~E.g[S];return new o(_,~E.h).add(v)}t.abs=function(){return P(this)?M(this):this},t.add=function(E){for(var y=Math.max(this.g.length,E.g.length),_=[],S=0,C=0;C<=y;C++){var b=S+(this.i(C)&65535)+(E.i(C)&65535),x=(b>>>16)+(this.i(C)>>>16)+(E.i(C)>>>16);S=x>>>16,b&=65535,x&=65535,_[C]=x<<16|b}return new o(_,_[_.length-1]&-2147483648?-1:0)};function I(E,y){return E.add(M(y))}t.j=function(E){if(k(this)||k(E))return p;if(P(this))return P(E)?M(this).j(M(E)):M(M(this).j(E));if(P(E))return M(this.j(M(E)));if(0>this.l(N)&&0>E.l(N))return h(this.m()*E.m());for(var y=this.g.length+E.g.length,_=[],S=0;S<2*y;S++)_[S]=0;for(S=0;S<this.g.length;S++)for(var C=0;C<E.g.length;C++){var b=this.i(S)>>>16,x=this.i(S)&65535,X=E.i(C)>>>16,Ve=E.i(C)&65535;_[2*S+2*C]+=x*Ve,w(_,2*S+2*C),_[2*S+2*C+1]+=b*Ve,w(_,2*S+2*C+1),_[2*S+2*C+1]+=x*X,w(_,2*S+2*C+1),_[2*S+2*C+2]+=b*X,w(_,2*S+2*C+2)}for(S=0;S<y;S++)_[S]=_[2*S+1]<<16|_[2*S];for(S=y;S<2*y;S++)_[S]=0;return new o(_,0)};function w(E,y){for(;(E[y]&65535)!=E[y];)E[y+1]+=E[y]>>>16,E[y]&=65535,y++}function T(E,y){this.g=E,this.h=y}function j(E,y){if(k(y))throw Error("division by zero");if(k(E))return new T(p,p);if(P(E))return y=j(M(E),y),new T(M(y.g),M(y.h));if(P(y))return y=j(E,M(y)),new T(M(y.g),y.h);if(30<E.g.length){if(P(E)||P(y))throw Error("slowDivide_ only works with positive integers.");for(var _=v,S=y;0>=S.l(E);)_=F(_),S=F(S);var C=U(_,1),b=U(S,1);for(S=U(S,2),_=U(_,2);!k(S);){var x=b.add(S);0>=x.l(E)&&(C=C.add(_),b=x),S=U(S,1),_=U(_,1)}return y=I(E,C.j(y)),new T(C,y)}for(C=p;0<=E.l(y);){for(_=Math.max(1,Math.floor(E.m()/y.m())),S=Math.ceil(Math.log(_)/Math.LN2),S=48>=S?1:Math.pow(2,S-48),b=h(_),x=b.j(y);P(x)||0<x.l(E);)_-=S,b=h(_),x=b.j(y);k(b)&&(b=v),C=C.add(b),E=I(E,x)}return new T(C,E)}t.A=function(E){return j(this,E).h},t.and=function(E){for(var y=Math.max(this.g.length,E.g.length),_=[],S=0;S<y;S++)_[S]=this.i(S)&E.i(S);return new o(_,this.h&E.h)},t.or=function(E){for(var y=Math.max(this.g.length,E.g.length),_=[],S=0;S<y;S++)_[S]=this.i(S)|E.i(S);return new o(_,this.h|E.h)},t.xor=function(E){for(var y=Math.max(this.g.length,E.g.length),_=[],S=0;S<y;S++)_[S]=this.i(S)^E.i(S);return new o(_,this.h^E.h)};function F(E){for(var y=E.g.length+1,_=[],S=0;S<y;S++)_[S]=E.i(S)<<1|E.i(S-1)>>>31;return new o(_,E.h)}function U(E,y){var _=y>>5;y%=32;for(var S=E.g.length-_,C=[],b=0;b<S;b++)C[b]=0<y?E.i(b+_)>>>y|E.i(b+_+1)<<32-y:E.i(b+_);return new o(C,E.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=m,jw=o}).apply(typeof Pv<"u"?Pv:typeof self<"u"?self:typeof window<"u"?window:{});var Ra=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};(function(){var t,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,u,f){return a==Array.prototype||a==Object.prototype||(a[u]=f.value),a};function n(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Ra=="object"&&Ra];for(var u=0;u<a.length;++u){var f=a[u];if(f&&f.Math==Math)return f}throw Error("Cannot find global object")}var r=n(this);function i(a,u){if(u)e:{var f=r;a=a.split(".");for(var g=0;g<a.length-1;g++){var R=a[g];if(!(R in f))break e;f=f[R]}a=a[a.length-1],g=f[a],u=u(g),u!=g&&u!=null&&e(f,a,{configurable:!0,writable:!0,value:u})}}function s(a,u){a instanceof String&&(a+="");var f=0,g=!1,R={next:function(){if(!g&&f<a.length){var A=f++;return{value:u(A,a[A]),done:!1}}return g=!0,{done:!0,value:void 0}}};return R[Symbol.iterator]=function(){return R},R}i("Array.prototype.values",function(a){return a||function(){return s(this,function(u,f){return f})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},l=this||self;function c(a){var u=typeof a;return u=u!="object"?u:a?Array.isArray(a)?"array":u:"null",u=="array"||u=="object"&&typeof a.length=="number"}function h(a){var u=typeof a;return u=="object"&&a!=null||u=="function"}function m(a,u,f){return a.call.apply(a.bind,arguments)}function p(a,u,f){if(!a)throw Error();if(2<arguments.length){var g=Array.prototype.slice.call(arguments,2);return function(){var R=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(R,g),a.apply(u,R)}}return function(){return a.apply(u,arguments)}}function v(a,u,f){return v=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?m:p,v.apply(null,arguments)}function N(a,u){var f=Array.prototype.slice.call(arguments,1);return function(){var g=f.slice();return g.push.apply(g,arguments),a.apply(this,g)}}function k(a,u){function f(){}f.prototype=u.prototype,a.aa=u.prototype,a.prototype=new f,a.prototype.constructor=a,a.Qb=function(g,R,A){for(var L=Array(arguments.length-2),ae=2;ae<arguments.length;ae++)L[ae-2]=arguments[ae];return u.prototype[R].apply(g,L)}}function P(a){const u=a.length;if(0<u){const f=Array(u);for(let g=0;g<u;g++)f[g]=a[g];return f}return[]}function M(a,u){for(let f=1;f<arguments.length;f++){const g=arguments[f];if(c(g)){const R=a.length||0,A=g.length||0;a.length=R+A;for(let L=0;L<A;L++)a[R+L]=g[L]}else a.push(g)}}class I{constructor(u,f){this.i=u,this.j=f,this.h=0,this.g=null}get(){let u;return 0<this.h?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function w(a){return/^[\s\xa0]*$/.test(a)}function T(){var a=l.navigator;return a&&(a=a.userAgent)?a:""}function j(a){return j[" "](a),a}j[" "]=function(){};var F=T().indexOf("Gecko")!=-1&&!(T().toLowerCase().indexOf("webkit")!=-1&&T().indexOf("Edge")==-1)&&!(T().indexOf("Trident")!=-1||T().indexOf("MSIE")!=-1)&&T().indexOf("Edge")==-1;function U(a,u,f){for(const g in a)u.call(f,a[g],g,a)}function E(a,u){for(const f in a)u.call(void 0,a[f],f,a)}function y(a){const u={};for(const f in a)u[f]=a[f];return u}const _="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function S(a,u){let f,g;for(let R=1;R<arguments.length;R++){g=arguments[R];for(f in g)a[f]=g[f];for(let A=0;A<_.length;A++)f=_[A],Object.prototype.hasOwnProperty.call(g,f)&&(a[f]=g[f])}}function C(a){var u=1;a=a.split(":");const f=[];for(;0<u&&a.length;)f.push(a.shift()),u--;return a.length&&f.push(a.join(":")),f}function b(a){l.setTimeout(()=>{throw a},0)}function x(){var a=$;let u=null;return a.g&&(u=a.g,a.g=a.g.next,a.g||(a.h=null),u.next=null),u}class X{constructor(){this.h=this.g=null}add(u,f){const g=Ve.get();g.set(u,f),this.h?this.h.next=g:this.g=g,this.h=g}}var Ve=new I(()=>new Qt,a=>a.reset());class Qt{constructor(){this.next=this.g=this.h=null}set(u,f){this.h=u,this.g=f,this.next=null}reset(){this.next=this.g=this.h=null}}let vt,z=!1,$=new X,G=()=>{const a=l.Promise.resolve(void 0);vt=()=>{a.then(me)}};var me=()=>{for(var a;a=x();){try{a.h.call(a.g)}catch(f){b(f)}var u=Ve;u.j(a),100>u.h&&(u.h++,a.next=u.g,u.g=a)}z=!1};function oe(){this.s=this.s,this.C=this.C}oe.prototype.s=!1,oe.prototype.ma=function(){this.s||(this.s=!0,this.N())},oe.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Ee(a,u){this.type=a,this.g=this.target=u,this.defaultPrevented=!1}Ee.prototype.h=function(){this.defaultPrevented=!0};var an=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var a=!1,u=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const f=()=>{};l.addEventListener("test",f,u),l.removeEventListener("test",f,u)}catch{}return a}();function ln(a,u){if(Ee.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var f=this.type=a.type,g=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=u,u=a.relatedTarget){if(F){e:{try{j(u.nodeName);var R=!0;break e}catch{}R=!1}R||(u=null)}}else f=="mouseover"?u=a.fromElement:f=="mouseout"&&(u=a.toElement);this.relatedTarget=u,g?(this.clientX=g.clientX!==void 0?g.clientX:g.pageX,this.clientY=g.clientY!==void 0?g.clientY:g.pageY,this.screenX=g.screenX||0,this.screenY=g.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:cn[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&ln.aa.h.call(this)}}k(ln,Ee);var cn={2:"touch",3:"pen",4:"mouse"};ln.prototype.h=function(){ln.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var un="closure_listenable_"+(1e6*Math.random()|0),s1=0;function o1(a,u,f,g,R){this.listener=a,this.proxy=null,this.src=u,this.type=f,this.capture=!!g,this.ha=R,this.key=++s1,this.da=this.fa=!1}function Yo(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Qo(a){this.src=a,this.g={},this.h=0}Qo.prototype.add=function(a,u,f,g,R){var A=a.toString();a=this.g[A],a||(a=this.g[A]=[],this.h++);var L=jc(a,u,g,R);return-1<L?(u=a[L],f||(u.fa=!1)):(u=new o1(u,this.src,A,!!g,R),u.fa=f,a.push(u)),u};function Pc(a,u){var f=u.type;if(f in a.g){var g=a.g[f],R=Array.prototype.indexOf.call(g,u,void 0),A;(A=0<=R)&&Array.prototype.splice.call(g,R,1),A&&(Yo(u),a.g[f].length==0&&(delete a.g[f],a.h--))}}function jc(a,u,f,g){for(var R=0;R<a.length;++R){var A=a[R];if(!A.da&&A.listener==u&&A.capture==!!f&&A.ha==g)return R}return-1}var Oc="closure_lm_"+(1e6*Math.random()|0),Dc={};function pp(a,u,f,g,R){if(Array.isArray(u)){for(var A=0;A<u.length;A++)pp(a,u[A],f,g,R);return null}return f=vp(f),a&&a[un]?a.K(u,f,h(g)?!!g.capture:!1,R):a1(a,u,f,!1,g,R)}function a1(a,u,f,g,R,A){if(!u)throw Error("Invalid event type");var L=h(R)?!!R.capture:!!R,ae=Mc(a);if(ae||(a[Oc]=ae=new Qo(a)),f=ae.add(u,f,g,L,A),f.proxy)return f;if(g=l1(),f.proxy=g,g.src=a,g.listener=f,a.addEventListener)an||(R=L),R===void 0&&(R=!1),a.addEventListener(u.toString(),g,R);else if(a.attachEvent)a.attachEvent(gp(u.toString()),g);else if(a.addListener&&a.removeListener)a.addListener(g);else throw Error("addEventListener and attachEvent are unavailable.");return f}function l1(){function a(f){return u.call(a.src,a.listener,f)}const u=c1;return a}function mp(a,u,f,g,R){if(Array.isArray(u))for(var A=0;A<u.length;A++)mp(a,u[A],f,g,R);else g=h(g)?!!g.capture:!!g,f=vp(f),a&&a[un]?(a=a.i,u=String(u).toString(),u in a.g&&(A=a.g[u],f=jc(A,f,g,R),-1<f&&(Yo(A[f]),Array.prototype.splice.call(A,f,1),A.length==0&&(delete a.g[u],a.h--)))):a&&(a=Mc(a))&&(u=a.g[u.toString()],a=-1,u&&(a=jc(u,f,g,R)),(f=-1<a?u[a]:null)&&Lc(f))}function Lc(a){if(typeof a!="number"&&a&&!a.da){var u=a.src;if(u&&u[un])Pc(u.i,a);else{var f=a.type,g=a.proxy;u.removeEventListener?u.removeEventListener(f,g,a.capture):u.detachEvent?u.detachEvent(gp(f),g):u.addListener&&u.removeListener&&u.removeListener(g),(f=Mc(u))?(Pc(f,a),f.h==0&&(f.src=null,u[Oc]=null)):Yo(a)}}}function gp(a){return a in Dc?Dc[a]:Dc[a]="on"+a}function c1(a,u){if(a.da)a=!0;else{u=new ln(u,this);var f=a.listener,g=a.ha||a.src;a.fa&&Lc(a),a=f.call(g,u)}return a}function Mc(a){return a=a[Oc],a instanceof Qo?a:null}var Fc="__closure_events_fn_"+(1e9*Math.random()>>>0);function vp(a){return typeof a=="function"?a:(a[Fc]||(a[Fc]=function(u){return a.handleEvent(u)}),a[Fc])}function $e(){oe.call(this),this.i=new Qo(this),this.M=this,this.F=null}k($e,oe),$e.prototype[un]=!0,$e.prototype.removeEventListener=function(a,u,f,g){mp(this,a,u,f,g)};function Ye(a,u){var f,g=a.F;if(g)for(f=[];g;g=g.F)f.push(g);if(a=a.M,g=u.type||u,typeof u=="string")u=new Ee(u,a);else if(u instanceof Ee)u.target=u.target||a;else{var R=u;u=new Ee(g,a),S(u,R)}if(R=!0,f)for(var A=f.length-1;0<=A;A--){var L=u.g=f[A];R=Xo(L,g,!0,u)&&R}if(L=u.g=a,R=Xo(L,g,!0,u)&&R,R=Xo(L,g,!1,u)&&R,f)for(A=0;A<f.length;A++)L=u.g=f[A],R=Xo(L,g,!1,u)&&R}$e.prototype.N=function(){if($e.aa.N.call(this),this.i){var a=this.i,u;for(u in a.g){for(var f=a.g[u],g=0;g<f.length;g++)Yo(f[g]);delete a.g[u],a.h--}}this.F=null},$e.prototype.K=function(a,u,f,g){return this.i.add(String(a),u,!1,f,g)},$e.prototype.L=function(a,u,f,g){return this.i.add(String(a),u,!0,f,g)};function Xo(a,u,f,g){if(u=a.i.g[String(u)],!u)return!0;u=u.concat();for(var R=!0,A=0;A<u.length;++A){var L=u[A];if(L&&!L.da&&L.capture==f){var ae=L.listener,De=L.ha||L.src;L.fa&&Pc(a.i,L),R=ae.call(De,g)!==!1&&R}}return R&&!g.defaultPrevented}function yp(a,u,f){if(typeof a=="function")f&&(a=v(a,f));else if(a&&typeof a.handleEvent=="function")a=v(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(u)?-1:l.setTimeout(a,u||0)}function _p(a){a.g=yp(()=>{a.g=null,a.i&&(a.i=!1,_p(a))},a.l);const u=a.h;a.h=null,a.m.apply(null,u)}class u1 extends oe{constructor(u,f){super(),this.m=u,this.l=f,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:_p(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ns(a){oe.call(this),this.h=a,this.g={}}k(ns,oe);var xp=[];function wp(a){U(a.g,function(u,f){this.g.hasOwnProperty(f)&&Lc(u)},a),a.g={}}ns.prototype.N=function(){ns.aa.N.call(this),wp(this)},ns.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Uc=l.JSON.stringify,d1=l.JSON.parse,h1=class{stringify(a){return l.JSON.stringify(a,void 0)}parse(a){return l.JSON.parse(a,void 0)}};function zc(){}zc.prototype.h=null;function Ep(a){return a.h||(a.h=a.i())}function f1(){}var rs={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Vc(){Ee.call(this,"d")}k(Vc,Ee);function $c(){Ee.call(this,"c")}k($c,Ee);var Xr={},Sp=null;function Bc(){return Sp=Sp||new $e}Xr.La="serverreachability";function Ip(a){Ee.call(this,Xr.La,a)}k(Ip,Ee);function is(a){const u=Bc();Ye(u,new Ip(u))}Xr.STAT_EVENT="statevent";function kp(a,u){Ee.call(this,Xr.STAT_EVENT,a),this.stat=u}k(kp,Ee);function Qe(a){const u=Bc();Ye(u,new kp(u,a))}Xr.Ma="timingevent";function Cp(a,u){Ee.call(this,Xr.Ma,a),this.size=u}k(Cp,Ee);function ss(a,u){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){a()},u)}function os(){this.g=!0}os.prototype.xa=function(){this.g=!1};function p1(a,u,f,g,R,A){a.info(function(){if(a.g)if(A)for(var L="",ae=A.split("&"),De=0;De<ae.length;De++){var ee=ae[De].split("=");if(1<ee.length){var Be=ee[0];ee=ee[1];var He=Be.split("_");L=2<=He.length&&He[1]=="type"?L+(Be+"="+ee+"&"):L+(Be+"=redacted&")}}else L=null;else L=A;return"XMLHTTP REQ ("+g+") [attempt "+R+"]: "+u+`
`+f+`
`+L})}function m1(a,u,f,g,R,A,L){a.info(function(){return"XMLHTTP RESP ("+g+") [ attempt "+R+"]: "+u+`
`+f+`
`+A+" "+L})}function Jr(a,u,f,g){a.info(function(){return"XMLHTTP TEXT ("+u+"): "+v1(a,f)+(g?" "+g:"")})}function g1(a,u){a.info(function(){return"TIMEOUT: "+u})}os.prototype.info=function(){};function v1(a,u){if(!a.g)return u;if(!u)return null;try{var f=JSON.parse(u);if(f){for(a=0;a<f.length;a++)if(Array.isArray(f[a])){var g=f[a];if(!(2>g.length)){var R=g[1];if(Array.isArray(R)&&!(1>R.length)){var A=R[0];if(A!="noop"&&A!="stop"&&A!="close")for(var L=1;L<R.length;L++)R[L]=""}}}}return Uc(f)}catch{return u}}var Hc={NO_ERROR:0,TIMEOUT:8},y1={},Wc;function Jo(){}k(Jo,zc),Jo.prototype.g=function(){return new XMLHttpRequest},Jo.prototype.i=function(){return{}},Wc=new Jo;function On(a,u,f,g){this.j=a,this.i=u,this.l=f,this.R=g||1,this.U=new ns(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Tp}function Tp(){this.i=null,this.g="",this.h=!1}var Np={},Gc={};function Kc(a,u,f){a.L=1,a.v=na(dn(u)),a.m=f,a.P=!0,bp(a,null)}function bp(a,u){a.F=Date.now(),Zo(a),a.A=dn(a.v);var f=a.A,g=a.R;Array.isArray(g)||(g=[String(g)]),Bp(f.i,"t",g),a.C=0,f=a.j.J,a.h=new Tp,a.g=am(a.j,f?u:null,!a.m),0<a.O&&(a.M=new u1(v(a.Y,a,a.g),a.O)),u=a.U,f=a.g,g=a.ca;var R="readystatechange";Array.isArray(R)||(R&&(xp[0]=R.toString()),R=xp);for(var A=0;A<R.length;A++){var L=pp(f,R[A],g||u.handleEvent,!1,u.h||u);if(!L)break;u.g[L.key]=L}u=a.H?y(a.H):{},a.m?(a.u||(a.u="POST"),u["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,u)):(a.u="GET",a.g.ea(a.A,a.u,null,u)),is(),p1(a.i,a.u,a.A,a.l,a.R,a.m)}On.prototype.ca=function(a){a=a.target;const u=this.M;u&&hn(a)==3?u.j():this.Y(a)},On.prototype.Y=function(a){try{if(a==this.g)e:{const He=hn(this.g);var u=this.g.Ba();const ti=this.g.Z();if(!(3>He)&&(He!=3||this.g&&(this.h.h||this.g.oa()||Qp(this.g)))){this.J||He!=4||u==7||(u==8||0>=ti?is(3):is(2)),qc(this);var f=this.g.Z();this.X=f;t:if(Rp(this)){var g=Qp(this.g);a="";var R=g.length,A=hn(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){yr(this),as(this);var L="";break t}this.h.i=new l.TextDecoder}for(u=0;u<R;u++)this.h.h=!0,a+=this.h.i.decode(g[u],{stream:!(A&&u==R-1)});g.length=0,this.h.g+=a,this.C=0,L=this.h.g}else L=this.g.oa();if(this.o=f==200,m1(this.i,this.u,this.A,this.l,this.R,He,f),this.o){if(this.T&&!this.K){t:{if(this.g){var ae,De=this.g;if((ae=De.g?De.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!w(ae)){var ee=ae;break t}}ee=null}if(f=ee)Jr(this.i,this.l,f,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Yc(this,f);else{this.o=!1,this.s=3,Qe(12),yr(this),as(this);break e}}if(this.P){f=!0;let Dt;for(;!this.J&&this.C<L.length;)if(Dt=_1(this,L),Dt==Gc){He==4&&(this.s=4,Qe(14),f=!1),Jr(this.i,this.l,null,"[Incomplete Response]");break}else if(Dt==Np){this.s=4,Qe(15),Jr(this.i,this.l,L,"[Invalid Chunk]"),f=!1;break}else Jr(this.i,this.l,Dt,null),Yc(this,Dt);if(Rp(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),He!=4||L.length!=0||this.h.h||(this.s=1,Qe(16),f=!1),this.o=this.o&&f,!f)Jr(this.i,this.l,L,"[Invalid Chunked Response]"),yr(this),as(this);else if(0<L.length&&!this.W){this.W=!0;var Be=this.j;Be.g==this&&Be.ba&&!Be.M&&(Be.j.info("Great, no buffering proxy detected. Bytes received: "+L.length),tu(Be),Be.M=!0,Qe(11))}}else Jr(this.i,this.l,L,null),Yc(this,L);He==4&&yr(this),this.o&&!this.J&&(He==4?rm(this.j,this):(this.o=!1,Zo(this)))}else L1(this.g),f==400&&0<L.indexOf("Unknown SID")?(this.s=3,Qe(12)):(this.s=0,Qe(13)),yr(this),as(this)}}}catch{}finally{}};function Rp(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function _1(a,u){var f=a.C,g=u.indexOf(`
`,f);return g==-1?Gc:(f=Number(u.substring(f,g)),isNaN(f)?Np:(g+=1,g+f>u.length?Gc:(u=u.slice(g,g+f),a.C=g+f,u)))}On.prototype.cancel=function(){this.J=!0,yr(this)};function Zo(a){a.S=Date.now()+a.I,Ap(a,a.I)}function Ap(a,u){if(a.B!=null)throw Error("WatchDog timer not null");a.B=ss(v(a.ba,a),u)}function qc(a){a.B&&(l.clearTimeout(a.B),a.B=null)}On.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(g1(this.i,this.A),this.L!=2&&(is(),Qe(17)),yr(this),this.s=2,as(this)):Ap(this,this.S-a)};function as(a){a.j.G==0||a.J||rm(a.j,a)}function yr(a){qc(a);var u=a.M;u&&typeof u.ma=="function"&&u.ma(),a.M=null,wp(a.U),a.g&&(u=a.g,a.g=null,u.abort(),u.ma())}function Yc(a,u){try{var f=a.j;if(f.G!=0&&(f.g==a||Qc(f.h,a))){if(!a.K&&Qc(f.h,a)&&f.G==3){try{var g=f.Da.g.parse(u)}catch{g=null}if(Array.isArray(g)&&g.length==3){var R=g;if(R[0]==0){e:if(!f.u){if(f.g)if(f.g.F+3e3<a.F)la(f),oa(f);else break e;eu(f),Qe(18)}}else f.za=R[1],0<f.za-f.T&&37500>R[2]&&f.F&&f.v==0&&!f.C&&(f.C=ss(v(f.Za,f),6e3));if(1>=Op(f.h)&&f.ca){try{f.ca()}catch{}f.ca=void 0}}else xr(f,11)}else if((a.K||f.g==a)&&la(f),!w(u))for(R=f.Da.g.parse(u),u=0;u<R.length;u++){let ee=R[u];if(f.T=ee[0],ee=ee[1],f.G==2)if(ee[0]=="c"){f.K=ee[1],f.ia=ee[2];const Be=ee[3];Be!=null&&(f.la=Be,f.j.info("VER="+f.la));const He=ee[4];He!=null&&(f.Aa=He,f.j.info("SVER="+f.Aa));const ti=ee[5];ti!=null&&typeof ti=="number"&&0<ti&&(g=1.5*ti,f.L=g,f.j.info("backChannelRequestTimeoutMs_="+g)),g=f;const Dt=a.g;if(Dt){const ca=Dt.g?Dt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(ca){var A=g.h;A.g||ca.indexOf("spdy")==-1&&ca.indexOf("quic")==-1&&ca.indexOf("h2")==-1||(A.j=A.l,A.g=new Set,A.h&&(Xc(A,A.h),A.h=null))}if(g.D){const nu=Dt.g?Dt.g.getResponseHeader("X-HTTP-Session-Id"):null;nu&&(g.ya=nu,de(g.I,g.D,nu))}}f.G=3,f.l&&f.l.ua(),f.ba&&(f.R=Date.now()-a.F,f.j.info("Handshake RTT: "+f.R+"ms")),g=f;var L=a;if(g.qa=om(g,g.J?g.ia:null,g.W),L.K){Dp(g.h,L);var ae=L,De=g.L;De&&(ae.I=De),ae.B&&(qc(ae),Zo(ae)),g.g=L}else tm(g);0<f.i.length&&aa(f)}else ee[0]!="stop"&&ee[0]!="close"||xr(f,7);else f.G==3&&(ee[0]=="stop"||ee[0]=="close"?ee[0]=="stop"?xr(f,7):Zc(f):ee[0]!="noop"&&f.l&&f.l.ta(ee),f.v=0)}}is(4)}catch{}}var x1=class{constructor(a,u){this.g=a,this.map=u}};function Pp(a){this.l=a||10,l.PerformanceNavigationTiming?(a=l.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function jp(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function Op(a){return a.h?1:a.g?a.g.size:0}function Qc(a,u){return a.h?a.h==u:a.g?a.g.has(u):!1}function Xc(a,u){a.g?a.g.add(u):a.h=u}function Dp(a,u){a.h&&a.h==u?a.h=null:a.g&&a.g.has(u)&&a.g.delete(u)}Pp.prototype.cancel=function(){if(this.i=Lp(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Lp(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let u=a.i;for(const f of a.g.values())u=u.concat(f.D);return u}return P(a.i)}function w1(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(c(a)){for(var u=[],f=a.length,g=0;g<f;g++)u.push(a[g]);return u}u=[],f=0;for(g in a)u[f++]=a[g];return u}function E1(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(c(a)||typeof a=="string"){var u=[];a=a.length;for(var f=0;f<a;f++)u.push(f);return u}u=[],f=0;for(const g in a)u[f++]=g;return u}}}function Mp(a,u){if(a.forEach&&typeof a.forEach=="function")a.forEach(u,void 0);else if(c(a)||typeof a=="string")Array.prototype.forEach.call(a,u,void 0);else for(var f=E1(a),g=w1(a),R=g.length,A=0;A<R;A++)u.call(void 0,g[A],f&&f[A],a)}var Fp=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function S1(a,u){if(a){a=a.split("&");for(var f=0;f<a.length;f++){var g=a[f].indexOf("="),R=null;if(0<=g){var A=a[f].substring(0,g);R=a[f].substring(g+1)}else A=a[f];u(A,R?decodeURIComponent(R.replace(/\+/g," ")):"")}}}function _r(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof _r){this.h=a.h,ea(this,a.j),this.o=a.o,this.g=a.g,ta(this,a.s),this.l=a.l;var u=a.i,f=new us;f.i=u.i,u.g&&(f.g=new Map(u.g),f.h=u.h),Up(this,f),this.m=a.m}else a&&(u=String(a).match(Fp))?(this.h=!1,ea(this,u[1]||"",!0),this.o=ls(u[2]||""),this.g=ls(u[3]||"",!0),ta(this,u[4]),this.l=ls(u[5]||"",!0),Up(this,u[6]||"",!0),this.m=ls(u[7]||"")):(this.h=!1,this.i=new us(null,this.h))}_r.prototype.toString=function(){var a=[],u=this.j;u&&a.push(cs(u,zp,!0),":");var f=this.g;return(f||u=="file")&&(a.push("//"),(u=this.o)&&a.push(cs(u,zp,!0),"@"),a.push(encodeURIComponent(String(f)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),f=this.s,f!=null&&a.push(":",String(f))),(f=this.l)&&(this.g&&f.charAt(0)!="/"&&a.push("/"),a.push(cs(f,f.charAt(0)=="/"?C1:k1,!0))),(f=this.i.toString())&&a.push("?",f),(f=this.m)&&a.push("#",cs(f,N1)),a.join("")};function dn(a){return new _r(a)}function ea(a,u,f){a.j=f?ls(u,!0):u,a.j&&(a.j=a.j.replace(/:$/,""))}function ta(a,u){if(u){if(u=Number(u),isNaN(u)||0>u)throw Error("Bad port number "+u);a.s=u}else a.s=null}function Up(a,u,f){u instanceof us?(a.i=u,b1(a.i,a.h)):(f||(u=cs(u,T1)),a.i=new us(u,a.h))}function de(a,u,f){a.i.set(u,f)}function na(a){return de(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function ls(a,u){return a?u?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function cs(a,u,f){return typeof a=="string"?(a=encodeURI(a).replace(u,I1),f&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function I1(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var zp=/[#\/\?@]/g,k1=/[#\?:]/g,C1=/[#\?]/g,T1=/[#\?@]/g,N1=/#/g;function us(a,u){this.h=this.g=null,this.i=a||null,this.j=!!u}function Dn(a){a.g||(a.g=new Map,a.h=0,a.i&&S1(a.i,function(u,f){a.add(decodeURIComponent(u.replace(/\+/g," ")),f)}))}t=us.prototype,t.add=function(a,u){Dn(this),this.i=null,a=Zr(this,a);var f=this.g.get(a);return f||this.g.set(a,f=[]),f.push(u),this.h+=1,this};function Vp(a,u){Dn(a),u=Zr(a,u),a.g.has(u)&&(a.i=null,a.h-=a.g.get(u).length,a.g.delete(u))}function $p(a,u){return Dn(a),u=Zr(a,u),a.g.has(u)}t.forEach=function(a,u){Dn(this),this.g.forEach(function(f,g){f.forEach(function(R){a.call(u,R,g,this)},this)},this)},t.na=function(){Dn(this);const a=Array.from(this.g.values()),u=Array.from(this.g.keys()),f=[];for(let g=0;g<u.length;g++){const R=a[g];for(let A=0;A<R.length;A++)f.push(u[g])}return f},t.V=function(a){Dn(this);let u=[];if(typeof a=="string")$p(this,a)&&(u=u.concat(this.g.get(Zr(this,a))));else{a=Array.from(this.g.values());for(let f=0;f<a.length;f++)u=u.concat(a[f])}return u},t.set=function(a,u){return Dn(this),this.i=null,a=Zr(this,a),$p(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[u]),this.h+=1,this},t.get=function(a,u){return a?(a=this.V(a),0<a.length?String(a[0]):u):u};function Bp(a,u,f){Vp(a,u),0<f.length&&(a.i=null,a.g.set(Zr(a,u),P(f)),a.h+=f.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],u=Array.from(this.g.keys());for(var f=0;f<u.length;f++){var g=u[f];const A=encodeURIComponent(String(g)),L=this.V(g);for(g=0;g<L.length;g++){var R=A;L[g]!==""&&(R+="="+encodeURIComponent(String(L[g]))),a.push(R)}}return this.i=a.join("&")};function Zr(a,u){return u=String(u),a.j&&(u=u.toLowerCase()),u}function b1(a,u){u&&!a.j&&(Dn(a),a.i=null,a.g.forEach(function(f,g){var R=g.toLowerCase();g!=R&&(Vp(this,g),Bp(this,R,f))},a)),a.j=u}function R1(a,u){const f=new os;if(l.Image){const g=new Image;g.onload=N(Ln,f,"TestLoadImage: loaded",!0,u,g),g.onerror=N(Ln,f,"TestLoadImage: error",!1,u,g),g.onabort=N(Ln,f,"TestLoadImage: abort",!1,u,g),g.ontimeout=N(Ln,f,"TestLoadImage: timeout",!1,u,g),l.setTimeout(function(){g.ontimeout&&g.ontimeout()},1e4),g.src=a}else u(!1)}function A1(a,u){const f=new os,g=new AbortController,R=setTimeout(()=>{g.abort(),Ln(f,"TestPingServer: timeout",!1,u)},1e4);fetch(a,{signal:g.signal}).then(A=>{clearTimeout(R),A.ok?Ln(f,"TestPingServer: ok",!0,u):Ln(f,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(R),Ln(f,"TestPingServer: error",!1,u)})}function Ln(a,u,f,g,R){try{R&&(R.onload=null,R.onerror=null,R.onabort=null,R.ontimeout=null),g(f)}catch{}}function P1(){this.g=new h1}function j1(a,u,f){const g=f||"";try{Mp(a,function(R,A){let L=R;h(R)&&(L=Uc(R)),u.push(g+A+"="+encodeURIComponent(L))})}catch(R){throw u.push(g+"type="+encodeURIComponent("_badmap")),R}}function ra(a){this.l=a.Ub||null,this.j=a.eb||!1}k(ra,zc),ra.prototype.g=function(){return new ia(this.l,this.j)},ra.prototype.i=function(a){return function(){return a}}({});function ia(a,u){$e.call(this),this.D=a,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}k(ia,$e),t=ia.prototype,t.open=function(a,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=u,this.readyState=1,hs(this)},t.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const u={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(u.body=a),(this.D||l).fetch(new Request(this.A,u)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,ds(this)),this.readyState=0},t.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,hs(this)),this.g&&(this.readyState=3,hs(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Hp(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function Hp(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}t.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var u=a.value?a.value:new Uint8Array(0);(u=this.v.decode(u,{stream:!a.done}))&&(this.response=this.responseText+=u)}a.done?ds(this):hs(this),this.readyState==3&&Hp(this)}},t.Ra=function(a){this.g&&(this.response=this.responseText=a,ds(this))},t.Qa=function(a){this.g&&(this.response=a,ds(this))},t.ga=function(){this.g&&ds(this)};function ds(a){a.readyState=4,a.l=null,a.j=null,a.v=null,hs(a)}t.setRequestHeader=function(a,u){this.u.append(a,u)},t.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],u=this.h.entries();for(var f=u.next();!f.done;)f=f.value,a.push(f[0]+": "+f[1]),f=u.next();return a.join(`\r
`)};function hs(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(ia.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Wp(a){let u="";return U(a,function(f,g){u+=g,u+=":",u+=f,u+=`\r
`}),u}function Jc(a,u,f){e:{for(g in f){var g=!1;break e}g=!0}g||(f=Wp(f),typeof a=="string"?f!=null&&encodeURIComponent(String(f)):de(a,u,f))}function Se(a){$e.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}k(Se,$e);var O1=/^https?$/i,D1=["POST","PUT"];t=Se.prototype,t.Ha=function(a){this.J=a},t.ea=function(a,u,f,g){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);u=u?u.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Wc.g(),this.v=this.o?Ep(this.o):Ep(Wc),this.g.onreadystatechange=v(this.Ea,this);try{this.B=!0,this.g.open(u,String(a),!0),this.B=!1}catch(A){Gp(this,A);return}if(a=f||"",f=new Map(this.headers),g)if(Object.getPrototypeOf(g)===Object.prototype)for(var R in g)f.set(R,g[R]);else if(typeof g.keys=="function"&&typeof g.get=="function")for(const A of g.keys())f.set(A,g.get(A));else throw Error("Unknown input type for opt_headers: "+String(g));g=Array.from(f.keys()).find(A=>A.toLowerCase()=="content-type"),R=l.FormData&&a instanceof l.FormData,!(0<=Array.prototype.indexOf.call(D1,u,void 0))||g||R||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[A,L]of f)this.g.setRequestHeader(A,L);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Yp(this),this.u=!0,this.g.send(a),this.u=!1}catch(A){Gp(this,A)}};function Gp(a,u){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=u,a.m=5,Kp(a),sa(a)}function Kp(a){a.A||(a.A=!0,Ye(a,"complete"),Ye(a,"error"))}t.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,Ye(this,"complete"),Ye(this,"abort"),sa(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),sa(this,!0)),Se.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?qp(this):this.bb())},t.bb=function(){qp(this)};function qp(a){if(a.h&&typeof o<"u"&&(!a.v[1]||hn(a)!=4||a.Z()!=2)){if(a.u&&hn(a)==4)yp(a.Ea,0,a);else if(Ye(a,"readystatechange"),hn(a)==4){a.h=!1;try{const L=a.Z();e:switch(L){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break e;default:u=!1}var f;if(!(f=u)){var g;if(g=L===0){var R=String(a.D).match(Fp)[1]||null;!R&&l.self&&l.self.location&&(R=l.self.location.protocol.slice(0,-1)),g=!O1.test(R?R.toLowerCase():"")}f=g}if(f)Ye(a,"complete"),Ye(a,"success");else{a.m=6;try{var A=2<hn(a)?a.g.statusText:""}catch{A=""}a.l=A+" ["+a.Z()+"]",Kp(a)}}finally{sa(a)}}}}function sa(a,u){if(a.g){Yp(a);const f=a.g,g=a.v[0]?()=>{}:null;a.g=null,a.v=null,u||Ye(a,"ready");try{f.onreadystatechange=g}catch{}}}function Yp(a){a.I&&(l.clearTimeout(a.I),a.I=null)}t.isActive=function(){return!!this.g};function hn(a){return a.g?a.g.readyState:0}t.Z=function(){try{return 2<hn(this)?this.g.status:-1}catch{return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.Oa=function(a){if(this.g){var u=this.g.responseText;return a&&u.indexOf(a)==0&&(u=u.substring(a.length)),d1(u)}};function Qp(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function L1(a){const u={};a=(a.g&&2<=hn(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let g=0;g<a.length;g++){if(w(a[g]))continue;var f=C(a[g]);const R=f[0];if(f=f[1],typeof f!="string")continue;f=f.trim();const A=u[R]||[];u[R]=A,A.push(f)}E(u,function(g){return g.join(", ")})}t.Ba=function(){return this.m},t.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function fs(a,u,f){return f&&f.internalChannelParams&&f.internalChannelParams[a]||u}function Xp(a){this.Aa=0,this.i=[],this.j=new os,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=fs("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=fs("baseRetryDelayMs",5e3,a),this.cb=fs("retryDelaySeedMs",1e4,a),this.Wa=fs("forwardChannelMaxRetries",2,a),this.wa=fs("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new Pp(a&&a.concurrentRequestLimit),this.Da=new P1,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}t=Xp.prototype,t.la=8,t.G=1,t.connect=function(a,u,f,g){Qe(0),this.W=a,this.H=u||{},f&&g!==void 0&&(this.H.OSID=f,this.H.OAID=g),this.F=this.X,this.I=om(this,null,this.W),aa(this)};function Zc(a){if(Jp(a),a.G==3){var u=a.U++,f=dn(a.I);if(de(f,"SID",a.K),de(f,"RID",u),de(f,"TYPE","terminate"),ps(a,f),u=new On(a,a.j,u),u.L=2,u.v=na(dn(f)),f=!1,l.navigator&&l.navigator.sendBeacon)try{f=l.navigator.sendBeacon(u.v.toString(),"")}catch{}!f&&l.Image&&(new Image().src=u.v,f=!0),f||(u.g=am(u.j,null),u.g.ea(u.v)),u.F=Date.now(),Zo(u)}sm(a)}function oa(a){a.g&&(tu(a),a.g.cancel(),a.g=null)}function Jp(a){oa(a),a.u&&(l.clearTimeout(a.u),a.u=null),la(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&l.clearTimeout(a.s),a.s=null)}function aa(a){if(!jp(a.h)&&!a.s){a.s=!0;var u=a.Ga;vt||G(),z||(vt(),z=!0),$.add(u,a),a.B=0}}function M1(a,u){return Op(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=u.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=ss(v(a.Ga,a,u),im(a,a.B)),a.B++,!0)}t.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const R=new On(this,this.j,a);let A=this.o;if(this.S&&(A?(A=y(A),S(A,this.S)):A=this.S),this.m!==null||this.O||(R.H=A,A=null),this.P)e:{for(var u=0,f=0;f<this.i.length;f++){t:{var g=this.i[f];if("__data__"in g.map&&(g=g.map.__data__,typeof g=="string")){g=g.length;break t}g=void 0}if(g===void 0)break;if(u+=g,4096<u){u=f;break e}if(u===4096||f===this.i.length-1){u=f+1;break e}}u=1e3}else u=1e3;u=em(this,R,u),f=dn(this.I),de(f,"RID",a),de(f,"CVER",22),this.D&&de(f,"X-HTTP-Session-Id",this.D),ps(this,f),A&&(this.O?u="headers="+encodeURIComponent(String(Wp(A)))+"&"+u:this.m&&Jc(f,this.m,A)),Xc(this.h,R),this.Ua&&de(f,"TYPE","init"),this.P?(de(f,"$req",u),de(f,"SID","null"),R.T=!0,Kc(R,f,null)):Kc(R,f,u),this.G=2}}else this.G==3&&(a?Zp(this,a):this.i.length==0||jp(this.h)||Zp(this))};function Zp(a,u){var f;u?f=u.l:f=a.U++;const g=dn(a.I);de(g,"SID",a.K),de(g,"RID",f),de(g,"AID",a.T),ps(a,g),a.m&&a.o&&Jc(g,a.m,a.o),f=new On(a,a.j,f,a.B+1),a.m===null&&(f.H=a.o),u&&(a.i=u.D.concat(a.i)),u=em(a,f,1e3),f.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),Xc(a.h,f),Kc(f,g,u)}function ps(a,u){a.H&&U(a.H,function(f,g){de(u,g,f)}),a.l&&Mp({},function(f,g){de(u,g,f)})}function em(a,u,f){f=Math.min(a.i.length,f);var g=a.l?v(a.l.Na,a.l,a):null;e:{var R=a.i;let A=-1;for(;;){const L=["count="+f];A==-1?0<f?(A=R[0].g,L.push("ofs="+A)):A=0:L.push("ofs="+A);let ae=!0;for(let De=0;De<f;De++){let ee=R[De].g;const Be=R[De].map;if(ee-=A,0>ee)A=Math.max(0,R[De].g-100),ae=!1;else try{j1(Be,L,"req"+ee+"_")}catch{g&&g(Be)}}if(ae){g=L.join("&");break e}}}return a=a.i.splice(0,f),u.D=a,g}function tm(a){if(!a.g&&!a.u){a.Y=1;var u=a.Fa;vt||G(),z||(vt(),z=!0),$.add(u,a),a.v=0}}function eu(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=ss(v(a.Fa,a),im(a,a.v)),a.v++,!0)}t.Fa=function(){if(this.u=null,nm(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=ss(v(this.ab,this),a)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Qe(10),oa(this),nm(this))};function tu(a){a.A!=null&&(l.clearTimeout(a.A),a.A=null)}function nm(a){a.g=new On(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var u=dn(a.qa);de(u,"RID","rpc"),de(u,"SID",a.K),de(u,"AID",a.T),de(u,"CI",a.F?"0":"1"),!a.F&&a.ja&&de(u,"TO",a.ja),de(u,"TYPE","xmlhttp"),ps(a,u),a.m&&a.o&&Jc(u,a.m,a.o),a.L&&(a.g.I=a.L);var f=a.g;a=a.ia,f.L=1,f.v=na(dn(u)),f.m=null,f.P=!0,bp(f,a)}t.Za=function(){this.C!=null&&(this.C=null,oa(this),eu(this),Qe(19))};function la(a){a.C!=null&&(l.clearTimeout(a.C),a.C=null)}function rm(a,u){var f=null;if(a.g==u){la(a),tu(a),a.g=null;var g=2}else if(Qc(a.h,u))f=u.D,Dp(a.h,u),g=1;else return;if(a.G!=0){if(u.o)if(g==1){f=u.m?u.m.length:0,u=Date.now()-u.F;var R=a.B;g=Bc(),Ye(g,new Cp(g,f)),aa(a)}else tm(a);else if(R=u.s,R==3||R==0&&0<u.X||!(g==1&&M1(a,u)||g==2&&eu(a)))switch(f&&0<f.length&&(u=a.h,u.i=u.i.concat(f)),R){case 1:xr(a,5);break;case 4:xr(a,10);break;case 3:xr(a,6);break;default:xr(a,2)}}}function im(a,u){let f=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(f*=2),f*u}function xr(a,u){if(a.j.info("Error code "+u),u==2){var f=v(a.fb,a),g=a.Xa;const R=!g;g=new _r(g||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||ea(g,"https"),na(g),R?R1(g.toString(),f):A1(g.toString(),f)}else Qe(2);a.G=0,a.l&&a.l.sa(u),sm(a),Jp(a)}t.fb=function(a){a?(this.j.info("Successfully pinged google.com"),Qe(2)):(this.j.info("Failed to ping google.com"),Qe(1))};function sm(a){if(a.G=0,a.ka=[],a.l){const u=Lp(a.h);(u.length!=0||a.i.length!=0)&&(M(a.ka,u),M(a.ka,a.i),a.h.i.length=0,P(a.i),a.i.length=0),a.l.ra()}}function om(a,u,f){var g=f instanceof _r?dn(f):new _r(f);if(g.g!="")u&&(g.g=u+"."+g.g),ta(g,g.s);else{var R=l.location;g=R.protocol,u=u?u+"."+R.hostname:R.hostname,R=+R.port;var A=new _r(null);g&&ea(A,g),u&&(A.g=u),R&&ta(A,R),f&&(A.l=f),g=A}return f=a.D,u=a.ya,f&&u&&de(g,f,u),de(g,"VER",a.la),ps(a,g),g}function am(a,u,f){if(u&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return u=a.Ca&&!a.pa?new Se(new ra({eb:f})):new Se(a.pa),u.Ha(a.J),u}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function lm(){}t=lm.prototype,t.ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){};function kt(a,u){$e.call(this),this.g=new Xp(u),this.l=a,this.h=u&&u.messageUrlParams||null,a=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(a?a["X-WebChannel-Content-Type"]=u.messageContentType:a={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.va&&(a?a["X-WebChannel-Client-Profile"]=u.va:a={"X-WebChannel-Client-Profile":u.va}),this.g.S=a,(a=u&&u.Sb)&&!w(a)&&(this.g.m=a),this.v=u&&u.supportsCrossDomainXhr||!1,this.u=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!w(u)&&(this.g.D=u,a=this.h,a!==null&&u in a&&(a=this.h,u in a&&delete a[u])),this.j=new ei(this)}k(kt,$e),kt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},kt.prototype.close=function(){Zc(this.g)},kt.prototype.o=function(a){var u=this.g;if(typeof a=="string"){var f={};f.__data__=a,a=f}else this.u&&(f={},f.__data__=Uc(a),a=f);u.i.push(new x1(u.Ya++,a)),u.G==3&&aa(u)},kt.prototype.N=function(){this.g.l=null,delete this.j,Zc(this.g),delete this.g,kt.aa.N.call(this)};function cm(a){Vc.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var u=a.__sm__;if(u){e:{for(const f in u){a=f;break e}a=void 0}(this.i=a)&&(a=this.i,u=u!==null&&a in u?u[a]:void 0),this.data=u}else this.data=a}k(cm,Vc);function um(){$c.call(this),this.status=1}k(um,$c);function ei(a){this.g=a}k(ei,lm),ei.prototype.ua=function(){Ye(this.g,"a")},ei.prototype.ta=function(a){Ye(this.g,new cm(a))},ei.prototype.sa=function(a){Ye(this.g,new um)},ei.prototype.ra=function(){Ye(this.g,"b")},kt.prototype.send=kt.prototype.o,kt.prototype.open=kt.prototype.m,kt.prototype.close=kt.prototype.close,Hc.NO_ERROR=0,Hc.TIMEOUT=8,Hc.HTTP_ERROR=6,y1.COMPLETE="complete",f1.EventType=rs,rs.OPEN="a",rs.CLOSE="b",rs.ERROR="c",rs.MESSAGE="d",$e.prototype.listen=$e.prototype.K,Se.prototype.listenOnce=Se.prototype.L,Se.prototype.getLastError=Se.prototype.Ka,Se.prototype.getLastErrorCode=Se.prototype.Ba,Se.prototype.getStatus=Se.prototype.Z,Se.prototype.getResponseJson=Se.prototype.Oa,Se.prototype.getResponseText=Se.prototype.oa,Se.prototype.send=Se.prototype.ea,Se.prototype.setWithCredentials=Se.prototype.Ha}).apply(typeof Ra<"u"?Ra:typeof self<"u"?self:typeof window<"u"?window:{});const jv="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */let qo="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gi=new Mo("@firebase/firestore");function $t(t,...e){if(Gi.logLevel<=ne.DEBUG){const n=e.map(op);Gi.debug(`Firestore (${qo}): ${t}`,...n)}}function Ow(t,...e){if(Gi.logLevel<=ne.ERROR){const n=e.map(op);Gi.error(`Firestore (${qo}): ${t}`,...n)}}function jR(t,...e){if(Gi.logLevel<=ne.WARN){const n=e.map(op);Gi.warn(`Firestore (${qo}): ${t}`,...n)}}function op(t){if(typeof t=="string")return t;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
 */function ap(t="Unexpected state"){const e=`FIRESTORE (${qo}) INTERNAL ASSERTION FAILED: `+t;throw Ow(e),new Error(e)}function Ys(t,e){t||ap()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class Qs{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dw{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class OR{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(et.UNAUTHENTICATED))}shutdown(){}}class DR{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class LR{constructor(e){this.t=e,this.currentUser=et.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){Ys(this.o===void 0);let r=this.i;const i=c=>this.i!==r?(r=this.i,n(c)):Promise.resolve();let s=new Qs;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new Qs,e.enqueueRetryable(()=>i(this.currentUser))};const o=()=>{const c=s;e.enqueueRetryable(async()=>{await c.promise,await i(this.currentUser)})},l=c=>{$t("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(c=>l(c)),setTimeout(()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?l(c):($t("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new Qs)}},0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?($t("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Ys(typeof r.accessToken=="string"),new Dw(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Ys(e===null||typeof e=="string"),new et(e)}}class MR{constructor(e,n,r){this.l=e,this.h=n,this.P=r,this.type="FirstParty",this.user=et.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class FR{constructor(e,n,r){this.l=e,this.h=n,this.P=r}getToken(){return Promise.resolve(new MR(this.l,this.h,this.P))}start(e,n){e.enqueueRetryable(()=>n(et.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class UR{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class zR{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,n){Ys(this.o===void 0);const r=s=>{s.error!=null&&$t("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const o=s.token!==this.R;return this.R=s.token,$t("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};const i=s=>{$t("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){const s=this.A.getImmediate({optional:!0});s?i(s):$t("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(Ys(typeof n.token=="string"),this.R=n.token,new UR(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}function VR(t){return t.name==="IndexedDbTransactionError"}class Wl{constructor(e,n){this.projectId=e,this.database=n||"(default)"}static empty(){return new Wl("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof Wl&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ov,J;(J=Ov||(Ov={}))[J.OK=0]="OK",J[J.CANCELLED=1]="CANCELLED",J[J.UNKNOWN=2]="UNKNOWN",J[J.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",J[J.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",J[J.NOT_FOUND=5]="NOT_FOUND",J[J.ALREADY_EXISTS=6]="ALREADY_EXISTS",J[J.PERMISSION_DENIED=7]="PERMISSION_DENIED",J[J.UNAUTHENTICATED=16]="UNAUTHENTICATED",J[J.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",J[J.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",J[J.ABORTED=10]="ABORTED",J[J.OUT_OF_RANGE=11]="OUT_OF_RANGE",J[J.UNIMPLEMENTED=12]="UNIMPLEMENTED",J[J.INTERNAL=13]="INTERNAL",J[J.UNAVAILABLE=14]="UNAVAILABLE",J[J.DATA_LOSS=15]="DATA_LOSS";/**
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
 */new jw([4294967295,4294967295],0);function Bu(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $R{constructor(e,n,r=1e3,i=1.5,s=6e4){this.ui=e,this.timerId=n,this.ko=r,this.qo=i,this.Qo=s,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const n=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),i=Math.max(0,n-r);i>0&&$t("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Ko} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,i,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lp{constructor(e,n,r,i,s){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new Qs,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,i,s){const o=Date.now()+r,l=new lp(e,n,o,i,s);return l.start(r),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new ct(lt.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}var Dv,Lv;(Lv=Dv||(Dv={})).ea="default",Lv.Cache="cache";/**
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
 */function BR(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mv=new Map;function HR(t,e,n,r){if(e===!0&&r===!0)throw new ct(lt.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function WR(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":ap()}function GR(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new ct(lt.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=WR(t);throw new ct(lt.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fv{constructor(e){var n,r;if(e.host===void 0){if(e.ssl!==void 0)throw new ct(lt.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(n=e.ssl)===null||n===void 0||n;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new ct(lt.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}HR("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=BR((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new ct(lt.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new ct(lt.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new ct(lt.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Lw{constructor(e,n,r,i){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Fv({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new ct(lt.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new ct(lt.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Fv(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new OR;switch(r.type){case"firstParty":return new FR(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new ct(lt.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const r=Mv.get(n);r&&($t("ComponentProvider","Removing Datastore"),Mv.delete(n),r.terminate())}(this),Promise.resolve()}}function KR(t,e,n,r={}){var i;const s=(t=GR(t,Lw))._getSettings(),o=`${e}:${n}`;if(s.host!=="firestore.googleapis.com"&&s.host!==o&&jR("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),t._setSettings(Object.assign(Object.assign({},s),{host:o,ssl:!1})),r.mockUserToken){let l,c;if(typeof r.mockUserToken=="string")l=r.mockUserToken,c=et.MOCK_USER;else{l=b_(r.mockUserToken,(i=t._app)===null||i===void 0?void 0:i.options.projectId);const h=r.mockUserToken.sub||r.mockUserToken.user_id;if(!h)throw new ct(lt.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");c=new et(h)}t._authCredentials=new DR(new Dw(l,c))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uv{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new $R(this,"async_queue_retry"),this.Vu=()=>{const r=Bu();r&&$t("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const n=Bu();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const n=Bu();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const n=new Qs;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!VR(e))throw e;$t("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const n=this.mu.then(()=>(this.du=!0,e().catch(r=>{this.Eu=r,this.du=!1;const i=function(o){let l=o.message||"";return o.stack&&(l=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),l}(r);throw Ow("INTERNAL UNHANDLED ERROR: ",i),r}).then(r=>(this.du=!1,r))));return this.mu=n,n}enqueueAfterDelay(e,n,r){this.fu(),this.Ru.indexOf(e)>-1&&(n=0);const i=lp.createAndSchedule(this,e,n,r,s=>this.yu(s));return this.Tu.push(i),i}fu(){this.Eu&&ap()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const n of this.Tu)if(n.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.Tu)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const n=this.Tu.indexOf(e);this.Tu.splice(n,1)}}class qR extends Lw{constructor(e,n,r,i){super(e,n,r,i),this.type="firestore",this._queue=new Uv,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Uv(e),this._firestoreClient=void 0,await e}}}function YR(t,e){const n=typeof t=="object"?t:pc(),r=typeof t=="string"?t:"(default)",i=gr(n,"firestore").getImmediate({identifier:r});if(!i._initialized){const s=C_("firestore");s&&KR(i,...s)}return i}(function(e,n=!0){(function(i){qo=i})(Kr),Kt(new jt("firestore",(r,{instanceIdentifier:i,options:s})=>{const o=r.getProvider("app").getImmediate(),l=new qR(new LR(r.getProvider("auth-internal")),new zR(r.getProvider("app-check-internal")),function(h,m){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new ct(lt.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Wl(h.options.projectId,m)}(o,i),o);return s=Object.assign({useFetchStreams:n},s),l._setSettings(s),l},"PUBLIC").setMultipleInstances(!0)),mt(jv,"4.7.3",e),mt(jv,"4.7.3","esm2017")})();const Mw="@firebase/installations",cp="0.6.9";/**
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
 */const Fw=1e4,Uw=`w:${cp}`,zw="FIS_v2",QR="https://firebaseinstallations.googleapis.com/v1",XR=60*60*1e3,JR="installations",ZR="Installations";/**
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
 */const eA={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},$r=new Gr(JR,ZR,eA);function Vw(t){return t instanceof Yt&&t.code.includes("request-failed")}/**
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
 */function $w({projectId:t}){return`${QR}/projects/${t}/installations`}function Bw(t){return{token:t.token,requestStatus:2,expiresIn:nA(t.expiresIn),creationTime:Date.now()}}async function Hw(t,e){const r=(await e.json()).error;return $r.create("request-failed",{requestName:t,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function Ww({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function tA(t,{refreshToken:e}){const n=Ww(t);return n.append("Authorization",rA(e)),n}async function Gw(t){const e=await t();return e.status>=500&&e.status<600?t():e}function nA(t){return Number(t.replace("s","000"))}function rA(t){return`${zw} ${t}`}/**
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
 */async function iA({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const r=$w(t),i=Ww(t),s=e.getImmediate({optional:!0});if(s){const h=await s.getHeartbeatsHeader();h&&i.append("x-firebase-client",h)}const o={fid:n,authVersion:zw,appId:t.appId,sdkVersion:Uw},l={method:"POST",headers:i,body:JSON.stringify(o)},c=await Gw(()=>fetch(r,l));if(c.ok){const h=await c.json();return{fid:h.fid||n,registrationStatus:2,refreshToken:h.refreshToken,authToken:Bw(h.authToken)}}else throw await Hw("Create Installation",c)}/**
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
 */function Kw(t){return new Promise(e=>{setTimeout(e,t)})}/**
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
 */function sA(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */const oA=/^[cdef][\w-]{21}$/,hh="";function aA(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const n=lA(t);return oA.test(n)?n:hh}catch{return hh}}function lA(t){return sA(t).substr(0,22)}/**
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
 */function bc(t){return`${t.appName}!${t.appId}`}/**
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
 */const qw=new Map;function Yw(t,e){const n=bc(t);Qw(n,e),cA(n,e)}function Qw(t,e){const n=qw.get(t);if(n)for(const r of n)r(e)}function cA(t,e){const n=uA();n&&n.postMessage({key:t,fid:e}),dA()}let br=null;function uA(){return!br&&"BroadcastChannel"in self&&(br=new BroadcastChannel("[Firebase] FID Change"),br.onmessage=t=>{Qw(t.data.key,t.data.fid)}),br}function dA(){qw.size===0&&br&&(br.close(),br=null)}/**
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
 */const hA="firebase-installations-database",fA=1,Br="firebase-installations-store";let Hu=null;function up(){return Hu||(Hu=M_(hA,fA,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(Br)}}})),Hu}async function Gl(t,e){const n=bc(t),i=(await up()).transaction(Br,"readwrite"),s=i.objectStore(Br),o=await s.get(n);return await s.put(e,n),await i.done,(!o||o.fid!==e.fid)&&Yw(t,e.fid),e}async function Xw(t){const e=bc(t),r=(await up()).transaction(Br,"readwrite");await r.objectStore(Br).delete(e),await r.done}async function Rc(t,e){const n=bc(t),i=(await up()).transaction(Br,"readwrite"),s=i.objectStore(Br),o=await s.get(n),l=e(o);return l===void 0?await s.delete(n):await s.put(l,n),await i.done,l&&(!o||o.fid!==l.fid)&&Yw(t,l.fid),l}/**
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
 */async function dp(t){let e;const n=await Rc(t.appConfig,r=>{const i=pA(r),s=mA(t,i);return e=s.registrationPromise,s.installationEntry});return n.fid===hh?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function pA(t){const e=t||{fid:aA(),registrationStatus:0};return Jw(e)}function mA(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const i=Promise.reject($r.create("app-offline"));return{installationEntry:e,registrationPromise:i}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},r=gA(t,n);return{installationEntry:n,registrationPromise:r}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:vA(t)}:{installationEntry:e}}async function gA(t,e){try{const n=await iA(t,e);return Gl(t.appConfig,n)}catch(n){throw Vw(n)&&n.customData.serverCode===409?await Xw(t.appConfig):await Gl(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function vA(t){let e=await zv(t.appConfig);for(;e.registrationStatus===1;)await Kw(100),e=await zv(t.appConfig);if(e.registrationStatus===0){const{installationEntry:n,registrationPromise:r}=await dp(t);return r||n}return e}function zv(t){return Rc(t,e=>{if(!e)throw $r.create("installation-not-found");return Jw(e)})}function Jw(t){return yA(t)?{fid:t.fid,registrationStatus:0}:t}function yA(t){return t.registrationStatus===1&&t.registrationTime+Fw<Date.now()}/**
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
 */async function _A({appConfig:t,heartbeatServiceProvider:e},n){const r=xA(t,n),i=tA(t,n),s=e.getImmediate({optional:!0});if(s){const h=await s.getHeartbeatsHeader();h&&i.append("x-firebase-client",h)}const o={installation:{sdkVersion:Uw,appId:t.appId}},l={method:"POST",headers:i,body:JSON.stringify(o)},c=await Gw(()=>fetch(r,l));if(c.ok){const h=await c.json();return Bw(h)}else throw await Hw("Generate Auth Token",c)}function xA(t,{fid:e}){return`${$w(t)}/${e}/authTokens:generate`}/**
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
 */async function hp(t,e=!1){let n;const r=await Rc(t.appConfig,s=>{if(!Zw(s))throw $r.create("not-registered");const o=s.authToken;if(!e&&SA(o))return s;if(o.requestStatus===1)return n=wA(t,e),s;{if(!navigator.onLine)throw $r.create("app-offline");const l=kA(s);return n=EA(t,l),l}});return n?await n:r.authToken}async function wA(t,e){let n=await Vv(t.appConfig);for(;n.authToken.requestStatus===1;)await Kw(100),n=await Vv(t.appConfig);const r=n.authToken;return r.requestStatus===0?hp(t,e):r}function Vv(t){return Rc(t,e=>{if(!Zw(e))throw $r.create("not-registered");const n=e.authToken;return CA(n)?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}async function EA(t,e){try{const n=await _A(t,e),r=Object.assign(Object.assign({},e),{authToken:n});return await Gl(t.appConfig,r),n}catch(n){if(Vw(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await Xw(t.appConfig);else{const r=Object.assign(Object.assign({},e),{authToken:{requestStatus:0}});await Gl(t.appConfig,r)}throw n}}function Zw(t){return t!==void 0&&t.registrationStatus===2}function SA(t){return t.requestStatus===2&&!IA(t)}function IA(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+XR}function kA(t){const e={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},t),{authToken:e})}function CA(t){return t.requestStatus===1&&t.requestTime+Fw<Date.now()}/**
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
 */async function TA(t){const e=t,{installationEntry:n,registrationPromise:r}=await dp(e);return r?r.catch(console.error):hp(e).catch(console.error),n.fid}/**
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
 */async function NA(t,e=!1){const n=t;return await bA(n),(await hp(n,e)).token}async function bA(t){const{registrationPromise:e}=await dp(t);e&&await e}/**
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
 */function RA(t){if(!t||!t.options)throw Wu("App Configuration");if(!t.name)throw Wu("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw Wu(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function Wu(t){return $r.create("missing-app-config-values",{valueName:t})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const e1="installations",AA="installations-internal",PA=t=>{const e=t.getProvider("app").getImmediate(),n=RA(e),r=gr(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},jA=t=>{const e=t.getProvider("app").getImmediate(),n=gr(e,e1).getImmediate();return{getId:()=>TA(n),getToken:i=>NA(n,i)}};function OA(){Kt(new jt(e1,PA,"PUBLIC")),Kt(new jt(AA,jA,"PRIVATE"))}OA();mt(Mw,cp);mt(Mw,cp,"esm2017");/**
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
 */const Kl="analytics",DA="firebase_id",LA="origin",MA=60*1e3,FA="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",fp="https://www.googletagmanager.com/gtag/js";/**
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
 */const gt=new Mo("@firebase/analytics");/**
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
 */const UA={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},wt=new Gr("analytics","Analytics",UA);/**
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
 */function zA(t){if(!t.startsWith(fp)){const e=wt.create("invalid-gtag-resource",{gtagURL:t});return gt.warn(e.message),""}return t}function t1(t){return Promise.all(t.map(e=>e.catch(n=>n)))}function VA(t,e){let n;return window.trustedTypes&&(n=window.trustedTypes.createPolicy(t,e)),n}function $A(t,e){const n=VA("firebase-js-sdk-policy",{createScriptURL:zA}),r=document.createElement("script"),i=`${fp}?l=${t}&id=${e}`;r.src=n?n==null?void 0:n.createScriptURL(i):i,r.async=!0,document.head.appendChild(r)}function BA(t){let e=[];return Array.isArray(window[t])?e=window[t]:window[t]=e,e}async function HA(t,e,n,r,i,s){const o=r[i];try{if(o)await e[o];else{const c=(await t1(n)).find(h=>h.measurementId===i);c&&await e[c.appId]}}catch(l){gt.error(l)}t("config",i,s)}async function WA(t,e,n,r,i){try{let s=[];if(i&&i.send_to){let o=i.send_to;Array.isArray(o)||(o=[o]);const l=await t1(n);for(const c of o){const h=l.find(p=>p.measurementId===c),m=h&&e[h.appId];if(m)s.push(m);else{s=[];break}}}s.length===0&&(s=Object.values(e)),await Promise.all(s),t("event",r,i||{})}catch(s){gt.error(s)}}function GA(t,e,n,r){async function i(s,...o){try{if(s==="event"){const[l,c]=o;await WA(t,e,n,l,c)}else if(s==="config"){const[l,c]=o;await HA(t,e,n,r,l,c)}else if(s==="consent"){const[l,c]=o;t("consent",l,c)}else if(s==="get"){const[l,c,h]=o;t("get",l,c,h)}else if(s==="set"){const[l]=o;t("set",l)}else t(s,...o)}catch(l){gt.error(l)}}return i}function KA(t,e,n,r,i){let s=function(...o){window[r].push(arguments)};return window[i]&&typeof window[i]=="function"&&(s=window[i]),window[i]=GA(s,t,e,n),{gtagCore:s,wrappedGtag:window[i]}}function qA(t){const e=window.document.getElementsByTagName("script");for(const n of Object.values(e))if(n.src&&n.src.includes(fp)&&n.src.includes(t))return n;return null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const YA=30,QA=1e3;class XA{constructor(e={},n=QA){this.throttleMetadata=e,this.intervalMillis=n}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,n){this.throttleMetadata[e]=n}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const n1=new XA;function JA(t){return new Headers({Accept:"application/json","x-goog-api-key":t})}async function ZA(t){var e;const{appId:n,apiKey:r}=t,i={method:"GET",headers:JA(r)},s=FA.replace("{app-id}",n),o=await fetch(s,i);if(o.status!==200&&o.status!==304){let l="";try{const c=await o.json();!((e=c.error)===null||e===void 0)&&e.message&&(l=c.error.message)}catch{}throw wt.create("config-fetch-failed",{httpStatus:o.status,responseMessage:l})}return o.json()}async function eP(t,e=n1,n){const{appId:r,apiKey:i,measurementId:s}=t.options;if(!r)throw wt.create("no-app-id");if(!i){if(s)return{measurementId:s,appId:r};throw wt.create("no-api-key")}const o=e.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},l=new rP;return setTimeout(async()=>{l.abort()},MA),r1({appId:r,apiKey:i,measurementId:s},o,l,e)}async function r1(t,{throttleEndTimeMillis:e,backoffCount:n},r,i=n1){var s;const{appId:o,measurementId:l}=t;try{await tP(r,e)}catch(c){if(l)return gt.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${l} provided in the "measurementId" field in the local Firebase config. [${c==null?void 0:c.message}]`),{appId:o,measurementId:l};throw c}try{const c=await ZA(t);return i.deleteThrottleMetadata(o),c}catch(c){const h=c;if(!nP(h)){if(i.deleteThrottleMetadata(o),l)return gt.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${l} provided in the "measurementId" field in the local Firebase config. [${h==null?void 0:h.message}]`),{appId:o,measurementId:l};throw c}const m=Number((s=h==null?void 0:h.customData)===null||s===void 0?void 0:s.httpStatus)===503?Sg(n,i.intervalMillis,YA):Sg(n,i.intervalMillis),p={throttleEndTimeMillis:Date.now()+m,backoffCount:n+1};return i.setThrottleMetadata(o,p),gt.debug(`Calling attemptFetch again in ${m} millis`),r1(t,p,r,i)}}function tP(t,e){return new Promise((n,r)=>{const i=Math.max(e-Date.now(),0),s=setTimeout(n,i);t.addEventListener(()=>{clearTimeout(s),r(wt.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function nP(t){if(!(t instanceof Yt)||!t.customData)return!1;const e=Number(t.customData.httpStatus);return e===429||e===500||e===503||e===504}class rP{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function iP(t,e,n,r,i){if(i&&i.global){t("event",n,r);return}else{const s=await e,o=Object.assign(Object.assign({},r),{send_to:s});t("event",n,o)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function sP(){if(P_())try{await j_()}catch(t){return gt.warn(wt.create("indexeddb-unavailable",{errorInfo:t==null?void 0:t.toString()}).message),!1}else return gt.warn(wt.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function oP(t,e,n,r,i,s,o){var l;const c=eP(t);c.then(N=>{n[N.measurementId]=N.appId,t.options.measurementId&&N.measurementId!==t.options.measurementId&&gt.warn(`The measurement ID in the local Firebase config (${t.options.measurementId}) does not match the measurement ID fetched from the server (${N.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(N=>gt.error(N)),e.push(c);const h=sP().then(N=>{if(N)return r.getId()}),[m,p]=await Promise.all([c,h]);qA(s)||$A(s,m.measurementId),i("js",new Date);const v=(l=o==null?void 0:o.config)!==null&&l!==void 0?l:{};return v[LA]="firebase",v.update=!0,p!=null&&(v[DA]=p),i("config",m.measurementId,v),m.measurementId}/**
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
 */class aP{constructor(e){this.app=e}_delete(){return delete Xs[this.app.options.appId],Promise.resolve()}}let Xs={},$v=[];const Bv={};let Gu="dataLayer",lP="gtag",Hv,i1,Wv=!1;function cP(){const t=[];if(R_()&&t.push("This is a browser extension environment."),LI()||t.push("Cookies are not available."),t.length>0){const e=t.map((r,i)=>`(${i+1}) ${r}`).join(" "),n=wt.create("invalid-analytics-context",{errorInfo:e});gt.warn(n.message)}}function uP(t,e,n){cP();const r=t.options.appId;if(!r)throw wt.create("no-app-id");if(!t.options.apiKey)if(t.options.measurementId)gt.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${t.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw wt.create("no-api-key");if(Xs[r]!=null)throw wt.create("already-exists",{id:r});if(!Wv){BA(Gu);const{wrappedGtag:s,gtagCore:o}=KA(Xs,$v,Bv,Gu,lP);i1=s,Hv=o,Wv=!0}return Xs[r]=oP(t,$v,Bv,e,Hv,Gu,n),new aP(t)}function dP(t=pc()){t=Oe(t);const e=gr(t,Kl);return e.isInitialized()?e.getImmediate():hP(t)}function hP(t,e={}){const n=gr(t,Kl);if(n.isInitialized()){const i=n.getImmediate();if(vo(e,n.getOptions()))return i;throw wt.create("already-initialized")}return n.initialize({options:e})}function fP(t,e,n,r){t=Oe(t),iP(i1,Xs[t.app.options.appId],e,n,r).catch(i=>gt.error(i))}const Gv="@firebase/analytics",Kv="0.10.8";function pP(){Kt(new jt(Kl,(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("installations-internal").getImmediate();return uP(r,i,n)},"PUBLIC")),Kt(new jt("analytics-internal",t,"PRIVATE")),mt(Gv,Kv),mt(Gv,Kv,"esm2017");function t(e){try{const n=e.getProvider(Kl).getImmediate();return{logEvent:(r,i,s)=>fP(n,r,i,s)}}catch(n){throw wt.create("interop-component-reg-failed",{reason:n})}}}pP();const mP={apiKey:"AIzaSyDyM1bZvabUpqINlIyF66DEaiHSePhzrB0",authDomain:"trasnporte-nataga---la-plata.firebaseapp.com",databaseURL:"https://trasnporte-nataga---la-plata-default-rtdb.firebaseio.com",projectId:"trasnporte-nataga---la-plata",storageBucket:"trasnporte-nataga---la-plata.firebasestorage.app",messagingSenderId:"175264872585",appId:"1:175264872585:web:124a80135af84a38f72e58",measurementId:"G-QXERYS2M87"},Ac=F_(mP);dP(Ac);const No=gN(Ac),Ze=RR(Ac);YR(Ac);function gP({onLogin:t,onRegisterOwner:e,onViewTerms:n,onViewPrivacy:r}){return d.jsxs("div",{className:"min-h-screen bg-white text-slate-900 font-sans selection:bg-primary-100",children:[d.jsx("nav",{className:"fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100",children:d.jsxs("div",{className:"max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between",children:[d.jsxs("div",{className:"flex items-center gap-3",children:[d.jsx("div",{className:"w-10 h-10 bg-secondary-900 rounded-xl flex items-center justify-center shadow-lg",children:d.jsx("img",{src:"/assets/logo_icon.png",alt:"Ruta-Go Logo",className:"w-7 h-7 object-contain"})}),d.jsx("span",{className:"text-xl md:text-2xl font-black tracking-tighter text-secondary-900",children:"Ruta-Go"})]}),d.jsxs("div",{className:"flex items-center gap-2 md:gap-4",children:[d.jsx("button",{onClick:t,className:"px-3 md:px-6 py-2.5 font-bold text-slate-600 hover:text-primary-500 transition-colors text-xs md:text-sm",children:"Iniciar Sesión"}),d.jsxs("button",{onClick:e,className:"px-4 md:px-6 py-2.5 bg-secondary-900 text-white font-bold rounded-xl shadow-xl hover:bg-black transition-all active:scale-95 text-[10px] md:text-sm uppercase tracking-wider",children:["Ser Dueño",d.jsx("span",{className:"hidden md:inline",children:" de Flota"})]})]})]})}),d.jsxs("header",{className:"pt-32 md:pt-40 pb-16 md:pb-20 px-6 overflow-hidden relative",children:[d.jsx("div",{className:"absolute top-20 right-0 w-64 md:w-96 h-64 md:h-96 bg-primary-500/10 rounded-full blur-3xl -z-10 animate-pulse"}),d.jsxs("div",{className:"max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center",children:[d.jsxs("div",{className:"space-y-6 md:space-y-8 text-center lg:text-left",children:[d.jsxs("div",{className:"inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full text-primary-600 font-black text-[9px] md:text-[10px] uppercase tracking-widest border border-primary-100 mx-auto lg:mx-0",children:[d.jsx(II,{size:14})," El futuro del transporte huilense"]}),d.jsxs("h1",{className:"text-4xl md:text-5xl lg:text-7xl font-black text-secondary-900 leading-[1.1] tracking-tight",children:["Conectando ",d.jsx("span",{className:"text-primary-500",children:"Natagá"})," y La Plata con tecnología."]}),d.jsx("p",{className:"text-lg md:text-xl text-slate-500 leading-relaxed max-w-lg mx-auto lg:mx-0",children:"Ruta-Go profesionaliza el transporte intermunicipal. Reservas en tiempo real, control de flota y una experiencia premium para todos."}),d.jsxs("div",{className:"flex flex-col sm:flex-row gap-4 justify-center lg:justify-start",children:[d.jsxs("a",{href:"https://play.google.com/store/apps/details?id=com.chopcode.rutago.app",target:"_blank",rel:"noopener noreferrer",className:"px-8 md:px-10 py-4 md:py-5 bg-primary-500 text-white font-black rounded-2xl shadow-2xl shadow-primary-500/40 hover:bg-orange-600 transition-all active:scale-95 flex items-center justify-center gap-3 group text-base md:text-lg",children:["Descargar App ",d.jsx(xg,{className:"group-hover:translate-x-1 transition-transform"})]}),d.jsx("button",{onClick:e,className:"px-8 md:px-10 py-4 md:py-5 bg-slate-50 text-slate-700 font-black rounded-2xl border border-slate-200 hover:bg-white transition-all active:scale-95 text-base md:text-lg",children:"Afiliar mi vehículo"})]})]}),d.jsxs("div",{className:"relative mt-8 lg:mt-0",children:[d.jsx("div",{className:"bg-gradient-to-tr from-secondary-900 to-slate-800 rounded-[2.5rem] md:rounded-[3rem] p-4 md:p-8 shadow-2xl shadow-slate-900/20 transform lg:rotate-2",children:d.jsx("div",{className:"bg-white rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-inner",children:d.jsx("img",{src:"https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2069",alt:"Ruta-Go App Preview",className:"w-full h-64 md:h-96 object-cover"})})}),d.jsxs("div",{className:"absolute -bottom-4 -left-2 md:-bottom-6 md:-left-6 bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-2xl border border-slate-100 flex items-center gap-3 md:gap-4 animate-bounce-slow",children:[d.jsx("div",{className:"w-10 h-10 md:w-12 h-12 bg-green-100 rounded-xl md:rounded-2xl flex items-center justify-center text-green-600",children:d.jsx(Do,{size:20})}),d.jsxs("div",{children:[d.jsx("p",{className:"text-[10px] text-slate-400 font-bold uppercase",children:"Asientos Libres"}),d.jsx("p",{className:"text-base md:text-lg font-black text-slate-800 leading-none",children:"12 Disponibles"})]})]})]})]})]}),d.jsx("section",{className:"py-16 md:py-24 bg-slate-50",children:d.jsxs("div",{className:"max-w-7xl mx-auto px-6",children:[d.jsxs("div",{className:"text-center mb-12 md:mb-20 space-y-4",children:[d.jsx("h2",{className:"text-3xl md:text-4xl font-black text-secondary-900 tracking-tight px-4",children:"Soluciones para todo el ecosistema"}),d.jsx("p",{className:"text-slate-500 font-medium text-sm md:text-base",children:"Diseñamos una herramienta pensada en la productividad y comodidad."})]}),d.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10",children:[d.jsx(Ku,{icon:d.jsx(El,{size:32}),title:"Pasajeros",desc:"Adiós a la incertidumbre. Reserva tu asiento desde casa, acumula Puntos Go en cada viaje y sube de nivel para desbloquear beneficios exclusivos.",color:"text-blue-500",features:["Puntos Go por fidelidad","Estatus PRO (Plata/Oro/Diamante)","Chat directo con el conductor"]}),d.jsx(Ku,{icon:d.jsx(Oo,{size:32}),title:"Conductores",desc:"Optimiza tus ingresos con el Estatus Estrella. Gestiona tu planilla digital, visualiza tu rentabilidad diaria y asegura tus cupos antes de salir.",color:"text-primary-500",features:["Estatus Estrella de confianza","Check-in digital de pasajeros","Reporte de rentabilidad diaria"]}),d.jsx(Ku,{icon:d.jsx(df,{size:32}),title:"Dueños de Flota",desc:"Control room total de tus activos. Vigila la ocupación en tiempo real, monitorea ingresos y recibe alertas legales de tu flota desde un solo lugar.",color:"text-green-500",features:["Aislamiento de datos de propiedad","Seguimiento de buses en vivo","Panel financiero centralizado"]})]})]})}),d.jsx("section",{className:"py-16 md:py-24 bg-white",children:d.jsxs("div",{className:"max-w-7xl mx-auto px-6 flex flex-col items-center text-center space-y-8 md:space-y-12",children:[d.jsx("h2",{className:"text-3xl md:text-4xl font-black text-secondary-900 tracking-tight max-w-2xl px-4",children:"Conectamos los puntos más importantes del sur del Huila."}),d.jsxs("div",{className:"flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8",children:[d.jsx(qv,{city:"Natagá"}),d.jsx("div",{className:"w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-300 transform rotate-90 sm:rotate-0",children:d.jsx(xg,{})}),d.jsx(qv,{city:"La Plata"})]})]})}),d.jsxs("footer",{className:"bg-secondary-900 py-16 md:py-24 text-white overflow-hidden relative",children:[d.jsx("div",{className:"absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-orange-400 to-transparent"}),d.jsxs("div",{className:"max-w-7xl mx-auto px-6 text-center space-y-8 md:space-y-10 relative z-10",children:[d.jsxs("h2",{className:"text-4xl md:text-5xl font-black tracking-tight leading-tight",children:["¿Listo para llevar tu flota ",d.jsx("br",{className:"hidden md:block"}),"al siguiente nivel?"]}),d.jsx("p",{className:"text-white/50 text-lg md:text-xl max-w-2xl mx-auto px-4",children:"Únete a la red de transporte más moderna de la región. Registra tu vehículo hoy mismo y empieza a ver los beneficios."}),d.jsxs("div",{className:"flex flex-col sm:flex-row justify-center gap-4 md:gap-6 pt-4 px-8 sm:px-0",children:[d.jsx("button",{onClick:e,className:"px-10 md:px-12 py-4 md:py-5 bg-primary-500 text-white font-black rounded-2xl shadow-2xl shadow-primary-500/40 hover:bg-orange-600 transition-all active:scale-95 text-base md:text-xl uppercase tracking-wider",children:"Quiero ser Socio"}),d.jsx("button",{onClick:t,className:"px-10 md:px-12 py-4 md:py-5 bg-white/10 text-white font-black rounded-2xl border border-white/10 hover:bg-white/20 transition-all active:scale-95 text-base md:text-xl uppercase tracking-wider",children:"Acceso Administrativo"})]}),d.jsxs("div",{className:"pt-16 md:pt-20 grid grid-cols-1 md:grid-cols-3 items-center gap-10",children:[d.jsxs("div",{className:"flex items-center gap-2 justify-center md:justify-start",children:[d.jsx("div",{className:"w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10",children:d.jsx("img",{src:"/assets/logo_icon.png",alt:"Ruta-Go Logo",className:"w-7 h-7 object-contain"})}),d.jsx("span",{className:"text-xl font-bold tracking-tighter",children:"Ruta-Go"})]}),d.jsx("div",{className:"text-white/30 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] order-3 md:order-none",children:"ChopCode Solutions © 2026 • Huila, CO"}),d.jsxs("div",{className:"flex justify-center md:justify-end gap-6 text-white/40 text-sm md:text-base order-2 md:order-none",children:[d.jsx("span",{onClick:r,className:"hover:text-primary-500 cursor-pointer transition-colors",children:"Privacidad"}),d.jsx("span",{onClick:n,className:"hover:text-primary-500 cursor-pointer transition-colors",children:"Términos"})]})]})]})]})]})}function Ku({icon:t,title:e,desc:n,color:r,features:i}){return d.jsxs("div",{className:"bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl transition-all duration-500 group",children:[d.jsx("div",{className:`mb-8 w-16 h-16 rounded-2xl flex items-center justify-center bg-slate-50 ${r} group-hover:scale-110 transition-transform duration-500 shadow-inner`,children:t}),d.jsx("h3",{className:"text-2xl font-black text-secondary-900 mb-4",children:e}),d.jsx("p",{className:"text-slate-500 leading-relaxed mb-8",children:n}),d.jsx("ul",{className:"space-y-3",children:i.map((s,o)=>d.jsxs("li",{className:"flex items-center gap-3 text-xs font-bold text-slate-400 uppercase tracking-wide",children:[d.jsx(Do,{size:16,className:"text-green-500"})," ",s]},o))})]})}function qv({city:t}){return d.jsxs("div",{className:"px-10 py-6 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex items-center gap-4 group hover:bg-white hover:shadow-xl transition-all duration-500",children:[d.jsx("div",{className:"w-12 h-12 bg-white rounded-2xl shadow-md flex items-center justify-center text-primary-500 group-hover:rotate-12 transition-transform",children:d.jsx(wl,{size:24})}),d.jsx("span",{className:"text-2xl font-black text-slate-800",children:t})]})}function vP({onShowRegister:t,onBack:e}){const[n,r]=W.useState(""),[i,s]=W.useState(""),[o,l]=W.useState(null),[c,h]=W.useState(!1),m=async p=>{p.preventDefault(),h(!0),l(null);try{await ZC(No,n,i)}catch{l("Email o contraseña incorrectos. Verifica tus credenciales.")}finally{h(!1)}};return d.jsxs("div",{className:"min-h-screen bg-secondary-900 flex flex-col lg:flex-row overflow-hidden font-sans selection:bg-primary-100",children:[d.jsxs("div",{className:"hidden lg:flex lg:w-1/2 bg-gradient-to-br from-secondary-900 to-slate-800 p-20 flex-col justify-between relative",children:[d.jsx("div",{className:"absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none",children:d.jsx(__,{size:600,className:"text-white absolute -right-20 -bottom-20 rotate-12"})}),d.jsxs("div",{className:"relative z-10 flex items-center gap-3",children:[d.jsx("img",{src:"/assets/logo_icon.png",alt:"Ruta-Go Logo",className:"w-12 h-12 object-contain"}),d.jsx("span",{className:"text-3xl font-black tracking-tighter text-white",children:"Ruta-Go"})]}),d.jsxs("div",{className:"relative z-10 space-y-8",children:[d.jsxs("h2",{className:"text-6xl font-black text-white leading-tight tracking-tight",children:["Acceso al ",d.jsx("br",{}),d.jsx("span",{className:"text-primary-500 text-7xl italic",children:"centro de"})," ",d.jsx("br",{}),"control."]}),d.jsxs("div",{className:"flex items-center gap-4 text-white/50 font-bold uppercase tracking-widest text-xs border-l-4 border-primary-500 pl-6",children:["Ingresa para gestionar tu flota, ",d.jsx("br",{}),"monitorear rutas y revisar ingresos."]})]}),d.jsx("div",{className:"relative z-10 text-white/30 text-[10px] font-black uppercase tracking-[0.3em]",children:"ChopCode Solutions • Secure Access Gateway"})]}),d.jsxs("div",{className:"flex-1 bg-white p-6 lg:p-20 flex flex-col justify-center relative animate-in fade-in slide-in-from-right-4 duration-500",children:[d.jsx("button",{onClick:e,className:"absolute top-8 left-8 lg:left-20 p-3 text-slate-400 hover:text-primary-500 hover:bg-slate-50 rounded-full transition-all group",children:d.jsx(uc,{size:24,className:"group-hover:-translate-x-1 transition-transform"})}),d.jsxs("div",{className:"max-w-md mx-auto w-full space-y-10",children:[d.jsxs("div",{className:"space-y-2",children:[d.jsx("h3",{className:"text-3xl font-black text-slate-800 tracking-tight",children:"Iniciar Sesión"}),d.jsx("p",{className:"text-slate-400 font-bold text-xs uppercase tracking-widest",children:"Portal de Administradores y Socios"})]}),d.jsxs("form",{onSubmit:m,className:"space-y-6",children:[d.jsx(Yv,{label:"Correo Corporativo",type:"email",placeholder:"tu@rutago.com",icon:d.jsx(dc,{size:18}),value:n,onChange:r}),d.jsx(Yv,{label:"Contraseña",type:"password",placeholder:"••••••••",icon:d.jsx(g_,{size:18}),value:i,onChange:s}),o&&d.jsxs("div",{className:"p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-[10px] font-black uppercase flex items-center gap-3 animate-shake",children:[d.jsx("div",{className:"w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shrink-0"}),o]}),d.jsx("button",{type:"submit",disabled:c,className:"w-full bg-secondary-900 hover:bg-black text-white font-black py-5 rounded-2xl shadow-2xl shadow-slate-900/30 transition-all transform active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed text-sm uppercase tracking-widest",children:c?d.jsx(Fi,{className:"animate-spin",size:20}):"Ingresar al Dashboard"})]}),d.jsx("div",{className:"pt-8 border-t border-slate-50 text-center",children:d.jsxs("p",{className:"text-xs font-bold text-slate-400 uppercase tracking-tight",children:["¿Aún no eres socio? "," ",d.jsx("button",{onClick:t,className:"text-primary-500 hover:text-orange-600 transition-colors border-b-2 border-primary-500/20 hover:border-primary-500 pb-0.5",children:"Registrar mi Flota"})]})}),d.jsx("p",{className:"text-center text-[10px] text-slate-300 font-black uppercase tracking-[0.2em]",children:"Ruta-Go Portal © 2026"})]})]})]})}function Yv({label:t,type:e,placeholder:n,icon:r,value:i,onChange:s}){return d.jsxs("div",{className:"space-y-1.5 group",children:[d.jsx("label",{className:"text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-primary-500",children:t}),d.jsxs("div",{className:"relative",children:[d.jsx("div",{className:"absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 transition-colors group-focus-within:text-primary-500",children:r}),d.jsx("input",{type:e,required:!0,className:"block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-800 font-bold focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all placeholder:opacity-30 text-sm",placeholder:n,value:i,onChange:o=>s(o.target.value)})]})]})}function yP({onBack:t}){const[e,n]=W.useState(""),[r,i]=W.useState(""),[s,o]=W.useState(""),[l,c]=W.useState(""),[h,m]=W.useState(null),[p,v]=W.useState(!1),[N,k]=W.useState(!1),P=async M=>{M.preventDefault(),v(!0),m(null);try{const w=(await JC(No,e,r)).user;await tT(w,{displayName:s});const T=Je(Ze,`usuarios/${w.uid}`);await uh(T,{id:w.uid,nombre:s,email:e,telefono:l,rol:"dueño",fechaRegistro:Date.now(),status:"active"});const j=Je(Ze,`dueños/${w.uid}`);await uh(j,!0),k(!0)}catch(I){I.code==="auth/email-already-in-use"?m("Este correo ya está registrado en Ruta-Go."):m("Ocurrió un error al procesar tu solicitud."),console.error(I)}finally{v(!1)}};return N?d.jsx("div",{className:"min-h-screen bg-secondary-900 flex items-center justify-center p-4",children:d.jsxs("div",{className:"max-w-md w-full bg-white rounded-[3rem] shadow-2xl p-12 text-center space-y-8",children:[d.jsx("div",{className:"w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center text-green-600 mx-auto animate-bounce",children:d.jsx(Do,{size:40})}),d.jsxs("div",{className:"space-y-4",children:[d.jsx("h2",{className:"text-3xl font-black text-slate-800 tracking-tight",children:"¡Solicitud Enviada!"}),d.jsxs("p",{className:"text-slate-500 font-medium leading-relaxed",children:["Hola ",d.jsx("span",{className:"text-primary-500 font-bold",children:s}),", hemos recibido tu solicitud para ser dueño de flota."]}),d.jsx("div",{className:"p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider",children:"Nuestro equipo administrativo revisará tu perfil y activará tu dashboard en breve."})]}),d.jsx("button",{onClick:t,className:"w-full py-4 bg-secondary-900 text-white font-black rounded-2xl shadow-xl hover:bg-black transition-all active:scale-95 uppercase tracking-widest text-sm",children:"Volver al Inicio"})]})}):d.jsxs("div",{className:"min-h-screen bg-secondary-900 flex flex-col lg:flex-row overflow-hidden",children:[d.jsxs("div",{className:"hidden lg:flex lg:w-1/2 bg-gradient-to-br from-secondary-900 to-slate-800 p-20 flex-col justify-between relative",children:[d.jsx("div",{className:"absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none",children:d.jsx(df,{size:600,className:"text-white absolute -right-20 -bottom-20 rotate-12"})}),d.jsxs("div",{className:"relative z-10 flex items-center gap-3",children:[d.jsx("img",{src:"/assets/logo_icon.png",alt:"Ruta-Go Logo",className:"w-12 h-12 object-contain"}),d.jsx("span",{className:"text-3xl font-black tracking-tighter text-white",children:"Ruta-Go"})]}),d.jsxs("div",{className:"relative z-10 space-y-8",children:[d.jsxs("h2",{className:"text-6xl font-black text-white leading-tight tracking-tight",children:["Únete a la ",d.jsx("br",{}),d.jsx("span",{className:"text-primary-500 text-7xl italic",children:"revolución"})," ",d.jsx("br",{}),"del transporte."]}),d.jsxs("div",{className:"flex items-center gap-4 text-white/50 font-bold uppercase tracking-widest text-xs border-l-4 border-primary-500 pl-6",children:["Gestión de flota, contabilidad en vivo ",d.jsx("br",{})," y control operativo total."]})]}),d.jsx("div",{className:"relative z-10 text-white/30 text-[10px] font-black uppercase tracking-[0.3em]",children:"ChopCode Solutions • Engineering for Productivity"})]}),d.jsxs("div",{className:"flex-1 bg-white p-6 lg:p-20 flex flex-col justify-center relative",children:[d.jsx("button",{onClick:t,className:"absolute top-8 left-8 lg:left-20 p-3 text-slate-400 hover:text-primary-500 hover:bg-slate-50 rounded-full transition-all group",children:d.jsx(uc,{size:24,className:"group-hover:-translate-x-1 transition-transform"})}),d.jsxs("div",{className:"max-w-md mx-auto w-full space-y-10",children:[d.jsxs("div",{className:"space-y-2",children:[d.jsx("h3",{className:"text-3xl font-black text-slate-800 tracking-tight",children:"Crea tu cuenta de Socio"}),d.jsx("p",{className:"text-slate-400 font-bold text-xs uppercase tracking-widest",children:"Registra tus datos para afiliar tu flota"})]}),d.jsxs("form",{onSubmit:P,className:"space-y-6",children:[d.jsx(Aa,{label:"Nombre del Propietario",placeholder:"Nombre y Apellidos",icon:d.jsx(hf,{size:18}),value:s,onChange:o,required:!0}),d.jsx(Aa,{label:"Email de Socio",type:"email",placeholder:"tu@correo.com",icon:d.jsx(dc,{size:18}),value:e,onChange:n,required:!0}),d.jsx(Aa,{label:"Teléfono / WhatsApp",placeholder:"321 000 0000",icon:d.jsx(v_,{size:18}),value:l,onChange:c,required:!0}),d.jsx(Aa,{label:"Contraseña de Acceso",type:"password",placeholder:"••••••••",icon:d.jsx(g_,{size:18}),value:r,onChange:i,required:!0}),h&&d.jsxs("div",{className:"p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-[10px] font-black uppercase flex items-center gap-3 animate-shake",children:[d.jsx("div",{className:"w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shrink-0"}),h]}),d.jsx("button",{type:"submit",disabled:p,className:"w-full bg-primary-500 hover:bg-orange-600 text-white font-black py-5 rounded-2xl shadow-2xl shadow-primary-500/30 transition-all transform active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed text-sm uppercase tracking-widest",children:p?d.jsx(Fi,{className:"animate-spin",size:20}):"Enviar Solicitud de Socio"})]}),d.jsx("p",{className:"text-center text-[10px] text-slate-300 font-black uppercase tracking-[0.2em]",children:"Ruta-Go Business 2026"})]})]})]})}function Aa({label:t,value:e,onChange:n,type:r="text",placeholder:i,icon:s,required:o=!1}){return d.jsxs("div",{className:"space-y-1.5",children:[d.jsx("label",{className:"text-[10px] font-black text-slate-400 uppercase tracking-tight ml-1",children:t}),d.jsxs("div",{className:"relative",children:[d.jsx("div",{className:"absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 transition-colors group-focus-within:text-primary-500",children:s}),d.jsx("input",{type:r,required:o,placeholder:i,className:"w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all placeholder:opacity-30 text-sm",value:e,onChange:l=>n(l.target.value)})]})]})}function _P({onBack:t}){return d.jsxs("div",{className:"min-h-screen bg-slate-50 font-sans selection:bg-primary-100",children:[d.jsx("nav",{className:"bg-white border-b border-slate-200 sticky top-0 z-50",children:d.jsxs("div",{className:"max-w-4xl mx-auto px-6 h-20 flex items-center gap-4",children:[d.jsx("button",{onClick:t,className:"p-2 text-slate-400 hover:text-primary-500 hover:bg-slate-50 rounded-full transition-all",children:d.jsx(uc,{size:24})}),d.jsx("h1",{className:"text-xl font-black text-secondary-900 tracking-tight",children:"Términos y Condiciones"})]})}),d.jsxs("main",{className:"max-w-4xl mx-auto px-6 py-16 space-y-12",children:[d.jsxs("section",{className:"bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 space-y-8 text-justify",children:[d.jsxs("div",{className:"flex items-center gap-4 border-b border-slate-100 pb-6",children:[d.jsx("div",{className:"w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-500 shadow-inner",children:d.jsx(wI,{size:28})}),d.jsxs("div",{children:[d.jsx("p",{className:"text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]",children:"Acuerdo Legal"}),d.jsx("h2",{className:"text-2xl font-black text-slate-800 tracking-tight",children:"Reglas de Operación Ruta-Go"})]})]}),d.jsx("p",{className:"text-slate-600 leading-relaxed italic",children:"Versión 1.4.0 Stable | Vigentes desde el 16 de julio de 2026. Al utilizar la plataforma (App o Web), usted acepta estos términos."}),d.jsxs("div",{className:"space-y-6",children:[d.jsx("h3",{className:"text-lg font-black text-secondary-900 flex items-center gap-2 italic",children:"1. Naturaleza del Servicio"}),d.jsxs("p",{className:"text-slate-600 leading-relaxed",children:["Ruta-Go es un intermediario tecnológico para la optimización del transporte intermunicipal. Actuamos como un motor de gestión de cupos y horarios.",d.jsx("strong",{className:"text-secondary-900",children:" Chop Code Solutions no es una empresa de transportes"})," ni posee flota vehicular propia."]}),d.jsx("h3",{className:"text-lg font-black text-secondary-900 flex items-center gap-2 italic",children:"2. Responsabilidad de Socios y Dueños"}),d.jsx("p",{className:"text-slate-600 leading-relaxed",children:"Los usuarios registrados con rol de Socio/Dueño de Flota se comprometen a utilizar los datos del portal administrativo con fines estrictamente operativos. La información sobre pasajeros, ingresos y conductores es confidencial y su mal uso será motivo de expulsión inmediata."}),d.jsx("h3",{className:"text-lg font-black text-secondary-900 flex items-center gap-2 italic",children:"3. Compromisos de Seguridad"}),d.jsx("p",{className:"text-slate-600 leading-relaxed",children:"Es responsabilidad del transportador garantizar que la información técnica del vehículo (placa y capacidad) sea veraz y se encuentre sincronizada con la base de datos de Ruta-Go para evitar sobreventa de cupos."}),d.jsxs("div",{className:"p-6 bg-red-50 rounded-2xl border border-red-100 flex items-start gap-4",children:[d.jsx(SI,{className:"text-red-500 shrink-0",size:24}),d.jsx("p",{className:"text-xs text-red-700 font-bold leading-relaxed uppercase",children:"Aviso Legal: Chop Code Solutions no asume responsabilidad por fallas mecánicas, accidentes, retrasos físicos o disputas de precios fuera de lo estipulado en la plataforma."})]}),d.jsx("h3",{className:"text-lg font-black text-secondary-900 flex items-center gap-2 italic",children:"4. Propiedad Intelectual"}),d.jsxs("p",{className:"text-slate-600 leading-relaxed",children:["Todo el código fuente, motores de reserva (Seat/Reservation Engine), logotipos y manuales técnicos son propiedad exclusiva de ",d.jsx("strong",{className:"text-primary-500",children:"Chop Code Solutions"}),"."]})]})]}),d.jsx("footer",{className:"text-center pb-10",children:d.jsx("p",{className:"text-[10px] text-slate-300 font-black uppercase tracking-[0.3em]",children:"ChopCode Solutions © 2026 • Natagá - La Plata, Huila"})})]})]})}function xP({onBack:t}){return d.jsxs("div",{className:"min-h-screen bg-slate-50 font-sans selection:bg-primary-100",children:[d.jsx("nav",{className:"bg-white border-b border-slate-200 sticky top-0 z-50",children:d.jsxs("div",{className:"max-w-4xl mx-auto px-6 h-20 flex items-center gap-4",children:[d.jsx("button",{onClick:t,className:"p-2 text-slate-400 hover:text-primary-500 hover:bg-slate-50 rounded-full transition-all",children:d.jsx(uc,{size:24})}),d.jsx("h1",{className:"text-xl font-black text-secondary-900 tracking-tight",children:"Política de Privacidad"})]})}),d.jsxs("main",{className:"max-w-4xl mx-auto px-6 py-16 space-y-12 text-justify",children:[d.jsxs("section",{className:"bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 space-y-8",children:[d.jsxs("div",{className:"flex items-center gap-4 border-b border-slate-100 pb-6",children:[d.jsx("div",{className:"w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 shadow-inner",children:d.jsx(__,{size:28})}),d.jsxs("div",{children:[d.jsx("p",{className:"text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]",children:"Protección de Datos"}),d.jsx("h2",{className:"text-2xl font-black text-slate-800 tracking-tight",children:"Habeas Data & Seguridad"})]})]}),d.jsxs("p",{className:"text-slate-600 leading-relaxed italic",children:["Estamos comprometidos con la seguridad de sus datos en cumplimiento de la ",d.jsx("strong",{className:"text-secondary-900",children:"Ley 1581 de 2012"})," de la República de Colombia."]}),d.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[d.jsx(Qv,{icon:d.jsx(gI,{size:18}),title:"Operación",desc:"Recolectamos nombres, correos y placas para la gestión logística."}),d.jsx(Qv,{icon:d.jsx(dc,{size:18}),title:"Contacto",desc:"El teléfono es esencial para la coordinación real entre chofer y pasajero."})]}),d.jsxs("div",{className:"space-y-6",children:[d.jsx("h3",{className:"text-lg font-black text-secondary-900 italic border-l-4 border-primary-500 pl-4",children:"3. Eliminación de Datos (Derecho al Olvido)"}),d.jsxs("div",{className:"bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4",children:[d.jsx("p",{className:"text-slate-600 text-sm leading-relaxed",children:"En cumplimiento con las políticas de Google Play, proporcionamos métodos claros para borrar su cuenta:"}),d.jsxs("ul",{className:"space-y-3",children:[d.jsxs("li",{className:"flex gap-3 text-xs font-bold text-slate-500",children:[d.jsx("span",{className:"w-5 h-5 bg-white rounded-full flex items-center justify-center text-primary-500 shadow-sm shrink-0",children:"1"}),"Dentro de la App: Perfil > Solicitar borrar cuenta."]}),d.jsxs("li",{className:"flex gap-3 text-xs font-bold text-slate-500",children:[d.jsx("span",{className:"w-5 h-5 bg-white rounded-full flex items-center justify-center text-primary-500 shadow-sm shrink-0",children:"2"}),"Vía Email: Enviando solicitud a ",d.jsx("strong",{className:"text-secondary-900",children:"dazace94@gmail.com"}),"."]})]}),d.jsxs("div",{className:"p-4 bg-amber-50 rounded-xl flex items-center gap-3",children:[d.jsx(uf,{className:"text-amber-500",size:18}),d.jsx("p",{className:"text-[10px] text-amber-700 font-black uppercase",children:"Periodo de gracia: 30 días antes del borrado definitivo."})]})]}),d.jsx("h3",{className:"text-lg font-black text-secondary-900 italic border-l-4 border-primary-500 pl-4",children:"4. Seguridad y Segregación"}),d.jsxs("p",{className:"text-slate-600 leading-relaxed",children:["Implementamos una arquitectura de ",d.jsx("strong",{className:"text-secondary-900",children:"Segregación Total de Roles"}),". Los datos residen en infraestructuras lógicas independientes cifradas mediante protocolos de Firebase de última generación."]})]})]}),d.jsx("footer",{className:"text-center pb-10",children:d.jsx("p",{className:"text-[10px] text-slate-300 font-black uppercase tracking-[0.3em]",children:"ChopCode Solutions © 2026 • Privacidad Blindada"})})]})]})}function Qv({icon:t,title:e,desc:n}){return d.jsxs("div",{className:"p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-2",children:[d.jsx("div",{className:"text-primary-500",children:t}),d.jsx("h4",{className:"font-black text-secondary-900 text-xs uppercase tracking-wider",children:e}),d.jsx("p",{className:"text-xs text-slate-500 leading-relaxed",children:n})]})}function wP({isOpen:t,onClose:e,activeTab:n,setActiveTab:r,role:i}){const s=()=>sT(No),l=[{id:"overview",label:"Vista General",icon:d.jsx(vI,{size:20}),roles:["ADMIN","OWNER"]},{id:"drivers",label:"Conductores",icon:d.jsx(Oo,{size:20}),roles:["ADMIN","OWNER"]},{id:"users",label:"Usuarios",icon:d.jsx(El,{size:20}),roles:["ADMIN"]},{id:"schedules",label:"Horarios",icon:d.jsx(p_,{size:20}),roles:["ADMIN","OWNER"]}].filter(c=>c.roles.includes(i==null?void 0:i.type));return d.jsxs(d.Fragment,{children:[t&&d.jsx("div",{className:"fixed inset-0 bg-secondary-900/60 backdrop-blur-sm z-40 lg:hidden",onClick:e}),d.jsxs("aside",{className:`
        fixed inset-y-0 left-0 z-50 w-72 bg-secondary-900 text-white flex flex-col shadow-2xl transition-transform duration-300
        lg:relative lg:translate-x-0 lg:z-20
        ${t?"translate-x-0":"-translate-x-full"}
      `,children:[d.jsxs("div",{className:"p-8 flex items-center justify-between",children:[d.jsxs("div",{className:"flex items-center gap-3",children:[d.jsx("img",{src:"/assets/logo_icon.png",alt:"Ruta-Go",className:"w-10 h-10 object-contain drop-shadow-md"}),d.jsxs("div",{className:"flex flex-col leading-tight text-left",children:[d.jsx("span",{className:"text-lg font-bold tracking-tight",children:"Ruta-Go"}),d.jsx("span",{className:"text-[10px] text-primary-500 font-bold tracking-widest uppercase opacity-80",children:(i==null?void 0:i.type)==="ADMIN"?"Admin Maestro":"Panel Dueños"})]})]}),d.jsx("button",{onClick:e,className:"lg:hidden p-2 text-white/50 hover:text-white",children:d.jsx(ff,{size:20})})]}),d.jsx("nav",{className:"flex-1 px-4 py-4 space-y-1 overflow-y-auto text-left",children:l.map(c=>d.jsx(EP,{icon:c.icon,label:c.label,active:n===c.id,onClick:()=>{r(c.id),window.innerWidth<1024&&e()}},c.id))}),d.jsx("div",{className:"p-4 border-t border-white/5 space-y-1 text-left",children:d.jsxs("button",{onClick:s,className:"w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all font-bold text-xs uppercase tracking-widest",children:[d.jsx(yI,{size:18})," Salir del Portal"]})})]})]})}function EP({icon:t,label:e,active:n,onClick:r}){return d.jsxs("button",{onClick:r,className:`
        w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 group
        ${n?"bg-primary-500 text-white shadow-xl shadow-primary-500/20":"text-white/50 hover:bg-white/5 hover:text-white"}
      `,children:[d.jsx("span",{className:`${n?"scale-110":"group-hover:scale-110"} transition-transform`,children:t}),d.jsx("span",{className:"font-bold text-xs uppercase tracking-widest",children:e})]})}function SP({title:t,userEmail:e,onMenuClick:n,role:r}){const i=(r==null?void 0:r.type)==="ADMIN";r==null||r.type;const s=!(r!=null&&r.type);return d.jsxs("header",{className:"h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 shrink-0 z-30",children:[d.jsxs("div",{className:"flex items-center gap-4",children:[d.jsx("button",{onClick:n,className:"lg:hidden p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-all active:scale-90",children:d.jsx(_I,{size:24})}),d.jsx("h2",{className:"text-xl lg:text-2xl font-black text-slate-800 tracking-tight truncate max-w-[200px] md:max-w-none",children:s?"Verificando...":t})]}),d.jsxs("div",{className:"flex items-center gap-3",children:[d.jsxs("div",{className:"text-right hidden sm:block",children:[d.jsx("p",{className:"text-[11px] font-black text-slate-700 leading-none truncate max-w-[150px]",children:e}),d.jsx("p",{className:`text-[9px] font-bold uppercase tracking-tighter mt-1 ${s?"text-slate-300":i?"text-primary-500":"text-blue-500"}`,children:s?"Cargando Perfil":i?"Sesión Root":"Sesión Dueño"})]}),d.jsx("div",{className:`w-10 h-10 lg:w-11 lg:h-11 rounded-xl flex items-center justify-center text-white font-black shadow-lg text-sm transition-colors duration-500 ${s?"bg-slate-200 shadow-none":i?"bg-primary-500 shadow-primary-500/20":"bg-blue-600 shadow-blue-500/20"}`,children:e==null?void 0:e.substring(0,2).toUpperCase()})]})]})}function Ts({label:t,value:e,icon:n,trend:r}){return d.jsxs("div",{className:"bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40",children:[d.jsx("div",{className:"mb-4 bg-slate-50 w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center scale-90 md:scale-100 origin-left",children:n}),d.jsx("p",{className:"text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-widest",children:t}),d.jsxs("div",{className:"flex items-baseline flex-wrap gap-2 mt-1",children:[d.jsx("h4",{className:"text-2xl md:text-3xl font-black text-slate-800 tracking-tighter",children:e}),d.jsx("span",{className:"text-[9px] md:text-[10px] font-bold text-green-500 uppercase",children:r})]})]})}function Xv({label:t,value:e,color:n,icon:r}){const i=Math.min(e/50*100,100);return d.jsxs("div",{className:"space-y-4",children:[d.jsxs("div",{className:"flex items-center justify-between",children:[d.jsxs("div",{className:"flex items-center gap-2",children:[d.jsx("div",{className:`p-2 rounded-lg ${n} text-white`,children:r}),d.jsx("span",{className:"font-bold text-slate-700",children:t})]}),d.jsxs("span",{className:"text-xl font-black text-slate-800",children:[e," ",d.jsx("small",{className:"text-[10px] text-slate-400 uppercase",children:"Pax"})]})]}),d.jsx("div",{className:"h-3 w-full bg-slate-100 rounded-full overflow-hidden",children:d.jsx("div",{className:`h-full ${n} transition-all duration-1000 ease-out shadow-lg`,style:{width:`${i}%`}})}),d.jsx("p",{className:"text-[10px] text-slate-400 font-bold uppercase tracking-tighter",children:"Ocupación estimada del día"})]})}function Jv({driver:t,onEdit:e}){t.status;const n=t.status==="blocked",r=t.horariosAsignados&&t.horariosAsignados.length>0,i=t.status==="inactive"||!r&&!n;return d.jsxs("div",{className:"bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex gap-4 group relative",children:[d.jsx("div",{className:`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-colors ${n?"bg-red-50 text-red-400":"bg-slate-100 text-slate-400"}`,children:d.jsx(Oo,{size:24})}),d.jsxs("div",{className:"flex-1 min-w-0",children:[d.jsxs("div",{className:"flex items-center justify-between mb-1 gap-2 pr-10",children:[d.jsx("h4",{className:"font-bold text-slate-800 text-sm truncate leading-tight",children:t.nombre}),d.jsx("span",{className:`flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase shrink-0 ${n?"bg-red-100 text-red-600":i?"bg-amber-100 text-amber-600":"bg-green-100 text-green-600"}`,children:n?"Bloqueado":i?"Descanso":"En Ruta"})]}),d.jsxs("div",{className:"flex flex-col gap-1 mt-2",children:[d.jsxs("div",{className:"flex items-center gap-2 text-slate-400 text-[11px] font-medium",children:[d.jsx(df,{size:12,className:"text-slate-300"}),d.jsxs("span",{className:"text-slate-600 font-bold",children:["Placa: ",t.placaVehiculo||"N/A"]})]}),d.jsxs("div",{className:"p-2 bg-slate-50 rounded-lg border border-slate-100 mt-1",children:[d.jsx("p",{className:"text-[9px] text-slate-400 font-bold uppercase leading-none mb-1",children:"Turnos"}),d.jsx("p",{className:"text-[11px] text-slate-700 font-bold truncate",children:t.horariosAsignados?t.horariosAsignados.join(" | "):"Sin turnos hoy"})]})]})]}),d.jsx("button",{onClick:()=>e(t),className:"absolute top-4 right-4 p-2 text-slate-300 hover:text-primary-500 hover:bg-primary-50 rounded-full transition-all opacity-0 group-hover:opacity-100",title:"Editar Conductor",children:d.jsx(xI,{size:16})})]})}const Qa={updateDriver:async(t,e)=>{const n=Je(Ze,`conductores/${t}`);try{return await Av(n,e),{success:!0}}catch(r){throw console.error("Error actualizando conductor:",r),r}},deleteDriver:async t=>{const e=Je(Ze,`conductores/${t}`);try{return await wR(e),{success:!0}}catch(n){throw console.error("Error eliminando conductor:",n),n}},getAllSchedules:async()=>{const t=Je(Ze,"horarios"),e=await Ya(t);return e.exists()?Object.entries(e.val()).map(([n,r])=>({id:n,...r})):[]},registerDriverAndVehicle:async(t,e)=>{const n={};n[`conductores/${t.id}`]={...t,status:"active",fechaRegistro:Date.now()},n[`vehiculos/${e.placa}`]={...e,conductorId:t.id,estado:"activo"};try{return await Av(Je(Ze),n),{success:!0}}catch(r){throw console.error("Error en registro dual:",r),r}}};function IP({driver:t,onClose:e,onRefresh:n}){const[r,i]=W.useState(!1),[s,o]=W.useState([]),[l,c]=W.useState((t==null?void 0:t.horariosAsignados)||[]),[h,m]=W.useState({nombre:(t==null?void 0:t.nombre)||"",placaVehiculo:(t==null?void 0:t.placaVehiculo)||"",status:(t==null?void 0:t.status)||"active"});if(W.useEffect(()=>{let k=!0;return(async()=>{try{const M=await Qa.getAllSchedules();k&&o(M)}catch(M){console.error("Error cargando horarios:",M)}})(),()=>{k=!1}},[]),!t)return null;const p=k=>{c(P=>P.includes(k)?P.filter(M=>M!==k):[...P,k])},v=async k=>{k.preventDefault(),i(!0);try{await Qa.updateDriver(t.id,{...h,horariosAsignados:l}),n&&n(),e()}catch(P){alert("Error al actualizar: "+P.message)}finally{i(!1)}},N=async()=>{if(window.confirm(`¿Seguro que deseas ELIMINAR a ${t.nombre}? Esta acción no se puede deshacer.`)){i(!0);try{await Qa.deleteDriver(t.id),n&&n(),e()}catch(k){alert("Error al eliminar: "+k.message)}finally{i(!1)}}};return d.jsx("div",{className:"fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm transition-all animate-in fade-in duration-200",children:d.jsxs("div",{className:"bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-white/20",children:[d.jsxs("div",{className:"p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50",children:[d.jsxs("div",{children:[d.jsx("h3",{className:"text-2xl font-black text-slate-800 tracking-tight",children:"Editar Conductor"}),d.jsxs("p",{className:"text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1",children:["ID Operativo: ",t.id.substring(0,8)]})]}),d.jsx("button",{onClick:e,className:"p-2 text-slate-400 hover:text-primary-500 hover:bg-slate-100 rounded-full transition-all",children:d.jsx(ff,{size:24})})]}),d.jsxs("form",{onSubmit:v,className:"flex-1 overflow-y-auto p-8 space-y-8",children:[d.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8",children:[d.jsxs("div",{className:"space-y-5",children:[d.jsxs("h4",{className:"text-[10px] font-black text-primary-500 uppercase tracking-widest flex items-center gap-2",children:[d.jsx("div",{className:"w-1 h-3 bg-primary-500 rounded-full"})," Perfil Básico"]}),d.jsx(Zv,{label:"Nombre Legal",value:h.nombre,onChange:k=>m({...h,nombre:k})}),d.jsx(Zv,{label:"Placa Asignada",value:h.placaVehiculo,onChange:k=>m({...h,placaVehiculo:k.toUpperCase()})}),d.jsxs("div",{className:"space-y-1.5",children:[d.jsx("label",{className:"text-[10px] font-bold text-slate-400 uppercase tracking-tight ml-1",children:"Estado"}),d.jsxs("select",{className:"w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 appearance-none transition-all",value:h.status,onChange:k=>m({...h,status:k.target.value}),children:[d.jsx("option",{value:"active",children:"🟢 En Ruta (Activo)"}),d.jsx("option",{value:"inactive",children:"🟡 Descanso (Inactivo)"}),d.jsx("option",{value:"blocked",children:"🔴 Bloqueado (Sin Acceso)"})]})]})]}),d.jsxs("div",{className:"space-y-5",children:[d.jsxs("h4",{className:"text-[10px] font-black text-primary-500 uppercase tracking-widest flex items-center gap-2",children:[d.jsx(m_,{size:12})," Escalafón de Hoy"]}),d.jsx("div",{className:"bg-slate-50 rounded-[2rem] p-5 border border-slate-100 max-h-[300px] overflow-y-auto space-y-2 custom-scrollbar text-center",children:s.length>0?s.map(k=>d.jsxs("label",{className:"flex items-center gap-3 p-3.5 bg-white rounded-2xl border border-slate-100 hover:border-primary-500/40 cursor-pointer transition-all group",children:[d.jsx("input",{type:"checkbox",className:"w-5 h-5 rounded-lg border-slate-300 text-primary-500 focus:ring-primary-500/20 transition-all cursor-pointer",checked:l.includes(k.id),onChange:()=>p(k.id)}),d.jsxs("div",{className:"flex flex-col text-left",children:[d.jsx("span",{className:"text-xs font-black text-slate-800 leading-none",children:k.hora}),d.jsx("span",{className:"text-[9px] font-bold text-slate-400 uppercase mt-1 truncate max-w-[150px]",children:k.ruta})]})]},k.id)):d.jsxs("div",{className:"py-10 flex flex-col items-center gap-2 opacity-30",children:[d.jsx(Fi,{className:"animate-spin",size:24}),d.jsx("p",{className:"text-[10px] font-bold uppercase italic",children:"Sincronizando horarios..."})]})})]})]}),d.jsxs("div",{className:"p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-3",children:[d.jsx(cf,{className:"text-amber-500 shrink-0 mt-0.5",size:16}),d.jsx("p",{className:"text-[10px] text-amber-700 font-bold leading-relaxed uppercase",children:"Nota: La modificación de turnos es una acción de nivel administrador. Los cambios se reflejarán en la App del conductor inmediatamente."})]})]}),d.jsxs("div",{className:"p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between",children:[d.jsxs("button",{type:"button",disabled:r,onClick:N,className:"flex items-center gap-2 px-6 py-3.5 rounded-2xl text-red-500 hover:bg-red-50 transition-all font-black text-[10px] uppercase disabled:opacity-50 group",children:[d.jsx(uf,{size:16,className:"group-hover:scale-110 transition-transform"})," Eliminar"]}),d.jsxs("div",{className:"flex items-center gap-4",children:[d.jsx("button",{type:"button",onClick:e,className:"px-6 py-3.5 font-black text-[10px] text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors",children:"Cancelar"}),d.jsx("button",{onClick:v,disabled:r,className:"flex items-center gap-3 px-10 py-4 bg-primary-500 hover:bg-orange-600 text-white rounded-2xl shadow-xl shadow-primary-500/30 transition-all transform active:scale-95 font-black text-[10px] uppercase disabled:opacity-70",children:r?d.jsx(Fi,{className:"animate-spin",size:18}):d.jsxs(d.Fragment,{children:[d.jsx(y_,{size:18})," Guardar Cambios"]})})]})]})]})})}function Zv({label:t,value:e,onChange:n}){return d.jsxs("div",{className:"space-y-1.5",children:[d.jsx("label",{className:"text-[10px] font-bold text-slate-400 uppercase tracking-tight ml-1",children:t}),d.jsx("input",{type:"text",required:!0,className:"w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all placeholder:opacity-30",value:e,onChange:r=>n(r.target.value)})]})}function kP({onClose:t,users:e,currentUser:n,role:r}){const[i,s]=W.useState(!1),[o,l]=W.useState(null),[c,h]=W.useState({email:"",placa:"",modelo:"",ano:new Date().getFullYear().toString(),capacidad:13,ownerId:(r==null?void 0:r.type)==="OWNER"?n.uid:""});W.useEffect(()=>{if(c.email.includes("@")){const p=e.find(v=>v.email.toLowerCase()===c.email.toLowerCase());l(p||null)}else l(null)},[c.email,e]);const m=async p=>{if(p.preventDefault(),!o){alert("⚠️ Error: El conductor debe registrarse primero en la App móvil con este correo.");return}s(!0);try{const v={id:o.id,nombre:o.nombre,email:o.email,telefono:o.telefono||"N/A",placaVehiculo:c.placa,vehiculoId:c.placa,horariosAsignados:[]},N={id:c.placa,placa:c.placa,modelo:c.modelo,ano:c.ano,capacidad:parseInt(c.capacidad),ownerId:c.ownerId,driverId:o.id};await Qa.registerDriverAndVehicle(v,N),alert("✅ Conductor vinculado y vehículo registrado exitosamente."),t()}catch(v){alert("❌ Error: "+v.message)}finally{s(!1)}};return d.jsx("div",{className:"fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200",children:d.jsxs("div",{className:"bg-white w-full max-w-3xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]",children:[d.jsxs("div",{className:"p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50",children:[d.jsxs("div",{className:"flex items-center gap-4",children:[d.jsx("div",{className:"w-12 h-12 bg-primary-500 rounded-2xl flex items-center justify-center text-white shadow-lg",children:d.jsx(x_,{size:24})}),d.jsxs("div",{children:[d.jsx("h3",{className:"text-2xl font-black text-slate-800 tracking-tight",children:"Vincular Operador"}),d.jsx("p",{className:"text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1",children:"Gestión de Flota por Email"})]})]}),d.jsx("button",{onClick:t,className:"p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-all",children:d.jsx(ff,{size:24})})]}),d.jsx("form",{onSubmit:m,className:"flex-1 overflow-y-auto p-8 space-y-8",children:d.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-10",children:[d.jsxs("div",{className:"space-y-6",children:[d.jsxs("h4",{className:"text-[11px] font-black text-primary-500 uppercase tracking-widest flex items-center gap-2",children:[d.jsx("div",{className:"w-1.5 h-4 bg-primary-500 rounded-full"})," 1. Buscar Conductor"]}),d.jsxs("div",{className:"space-y-2",children:[d.jsx(si,{label:"Correo Electrónico",placeholder:"conductor@gmail.com",type:"email",value:c.email,onChange:p=>h({...c,email:p}),required:!0}),d.jsxs("div",{className:`p-4 rounded-2xl border transition-all flex items-center gap-3 ${o?"bg-green-50 border-green-100 text-green-700":c.email.includes("@")?"bg-red-50 border-red-100 text-red-600":"bg-slate-50 border-slate-100 text-slate-400"}`,children:[o?d.jsx(Do,{size:18}):c.email.includes("@")?d.jsx(cf,{size:18}):d.jsx(EI,{size:18}),d.jsxs("div",{className:"flex-1",children:[d.jsx("p",{className:"text-[10px] font-black uppercase tracking-tight",children:o?"Usuario Encontrado":c.email.includes("@")?"Usuario no registrado":"Esperando correo..."}),d.jsx("p",{className:"text-xs font-bold leading-none mt-1",children:o?o.nombre:c.email.includes("@")?"Dile que se registre en la App":"Escribe el email corporativo"})]})]})]}),o&&d.jsx("div",{className:"space-y-4 animate-in slide-in-from-top-2",children:d.jsxs("div",{className:"p-4 bg-slate-50 rounded-2xl border border-slate-100",children:[d.jsx("p",{className:"text-[10px] text-slate-400 font-black uppercase mb-1",children:"Teléfono Registrado"}),d.jsx("p",{className:"text-sm font-bold text-slate-700",children:o.telefono||"No proporcionado"})]})})]}),d.jsxs("div",{className:"space-y-6",children:[d.jsxs("h4",{className:"text-[11px] font-black text-secondary-900 uppercase tracking-widest flex items-center gap-2",children:[d.jsx("div",{className:"w-1.5 h-4 bg-secondary-900 rounded-full"})," 2. Datos del Bus"]}),d.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[d.jsx(si,{label:"Placa",placeholder:"ABC-123",value:c.placa,onChange:p=>h({...c,placa:p.toUpperCase()}),required:!0}),d.jsx(si,{label:"Año",type:"number",value:c.ano,onChange:p=>h({...c,ano:p}),required:!0})]}),d.jsx(si,{label:"Modelo",placeholder:"Ej: Nissan Frontier",value:c.modelo,onChange:p=>h({...c,modelo:p}),required:!0}),d.jsx(si,{label:"Capacidad",type:"number",value:c.capacidad,onChange:p=>h({...c,capacidad:p}),required:!0}),(r==null?void 0:r.type)==="ADMIN"&&d.jsx(si,{label:"ID del Dueño (Opcional)",placeholder:"UID del dueño",value:c.ownerId,onChange:p=>h({...c,ownerId:p})})]})]})}),d.jsxs("div",{className:"p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-4",children:[d.jsx("button",{type:"button",onClick:t,className:"px-8 py-4 font-black text-[10px] text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-all",children:"Cancelar"}),d.jsx("button",{onClick:m,disabled:i||!o,className:"flex items-center gap-3 px-12 py-4 bg-secondary-900 hover:bg-black text-white rounded-2xl shadow-xl transition-all transform active:scale-95 font-black text-[10px] uppercase disabled:opacity-30 disabled:cursor-not-allowed",children:i?d.jsx(Fi,{className:"animate-spin",size:18}):d.jsxs(d.Fragment,{children:[d.jsx(y_,{size:18})," Vincular Conductor"]})})]})]})})}function si({label:t,value:e,onChange:n,type:r="text",placeholder:i,required:s=!1}){return d.jsxs("div",{className:"space-y-1.5",children:[d.jsx("label",{className:"text-[10px] font-black text-slate-400 uppercase tracking-tight ml-1",children:t}),d.jsx("input",{type:r,required:s,placeholder:i,className:"w-full px-4 py-3.5 bg-white border border-slate-200 rounded-2xl font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all placeholder:opacity-40 text-sm",value:e,onChange:o=>n(o.target.value)})]})}function ey({user:t}){if(!t)return null;const e=t.solicitudBorrado===!0;return d.jsxs("div",{className:`bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex gap-4 group ${e?"opacity-60 grayscale-[0.5]":""}`,children:[d.jsx("div",{className:`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${e?"bg-red-50 text-red-400":"bg-blue-50 text-blue-500"}`,children:d.jsx(hf,{size:22})}),d.jsxs("div",{className:"flex-1 min-w-0",children:[d.jsxs("div",{className:"flex items-center justify-between mb-1 gap-2",children:[d.jsx("h4",{className:"font-bold text-slate-800 text-sm truncate leading-tight",children:t.nombre||t.name||"Usuario sin nombre"}),e?d.jsxs("span",{className:"flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-[9px] font-black uppercase shrink-0",children:[d.jsx(uf,{size:10})," Borrado"]}):d.jsx("span",{className:"flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 text-[9px] font-black uppercase shrink-0",children:"Activo"})]}),d.jsxs("div",{className:"flex flex-col gap-1 mt-1",children:[d.jsxs("div",{className:"flex items-center gap-2 text-slate-500 text-[11px]",children:[d.jsx(dc,{size:12,className:"text-slate-300"}),d.jsx("span",{className:"truncate",children:t.email||"Sin correo"})]}),d.jsxs("div",{className:"flex items-center justify-between mt-1",children:[d.jsxs("div",{className:"flex items-center gap-2 text-slate-500 text-[11px]",children:[d.jsx(v_,{size:12,className:"text-slate-300"}),d.jsx("span",{children:t.telefono||t.phone||"N/A"})]}),d.jsxs("div",{className:"flex items-center gap-1 px-2 py-0.5 bg-amber-50 rounded-lg border border-amber-100",children:[d.jsx(mI,{size:10,className:"text-amber-500"}),d.jsxs("span",{className:"text-[10px] font-bold text-amber-700",children:[t.puntosGo||0," pts"]})]})]})]})]})]})}function CP({schedules:t,drivers:e,role:n}){const r=i=>{if(!i)return{name:"Sin asignar",isExternal:!1};const s=e.find(l=>l.id===i);if((n==null?void 0:n.type)==="ADMIN")return{name:s?s.nombre:"Cargando...",isExternal:!1};const o=e.some(l=>l.id===i);return{name:s?s.nombre:"Conductor Externo",isExternal:!o}};return d.jsx("div",{className:"bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden",children:d.jsx("div",{className:"overflow-x-auto scrollbar-hide",children:d.jsxs("table",{className:"w-full text-left border-collapse min-w-[600px]",children:[d.jsx("thead",{children:d.jsxs("tr",{className:"bg-slate-50 border-b border-slate-100",children:[d.jsx("th",{className:"px-4 md:px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest",children:"Hora & Ruta"}),d.jsx("th",{className:"px-4 md:px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest",children:"Conductor Asignado"}),d.jsx("th",{className:"px-4 md:px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center",children:"Disponibilidad"}),d.jsx("th",{className:"px-4 md:px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center",children:"Estado"})]})}),d.jsx("tbody",{className:"divide-y divide-slate-50",children:t.map(i=>{const s=r(i.conductorId),o=i.totalAsientos||0,l=i.asientosDisponibles||0,c=o-l,h=o>0?Math.round(c/o*100):0,m=l===0&&o>0,p=!i.conductorId;return d.jsxs("tr",{className:"hover:bg-slate-50/50 transition-colors group",children:[d.jsx("td",{className:"px-4 md:px-6 py-4 md:py-5",children:d.jsxs("div",{className:"flex items-center gap-3 md:gap-4",children:[d.jsxs("div",{className:"w-10 h-10 md:w-12 md:h-12 bg-primary-50 rounded-xl md:rounded-2xl flex flex-col items-center justify-center text-primary-600 shrink-0",children:[d.jsx(m_,{size:14,className:"md:size-4"}),d.jsx("span",{className:"text-[8px] md:text-[10px] font-black mt-0.5 uppercase tracking-tighter leading-none",children:i.hora.split(" ")[1]})]}),d.jsxs("div",{className:"min-w-0",children:[d.jsx("p",{className:"text-xs md:text-sm font-black text-slate-800 leading-tight mb-0.5",children:i.hora.split(" ")[0]}),d.jsxs("div",{className:"flex items-center gap-1 text-slate-400",children:[d.jsx(wl,{size:10,className:"shrink-0"}),d.jsx("span",{className:"text-[9px] md:text-[10px] font-bold uppercase tracking-tight truncate",children:i.ruta})]})]})]})}),d.jsx("td",{className:"px-4 md:px-6 py-4 md:py-5",children:d.jsxs("div",{className:"flex items-center gap-2 md:gap-3",children:[d.jsx("div",{className:`p-1.5 md:p-2 rounded-lg md:rounded-xl shrink-0 ${p?"bg-red-50 text-red-400":s.isExternal?"bg-slate-50 text-slate-300":"bg-slate-100 text-slate-500"}`,children:d.jsx(hf,{size:14,className:"md:size-4"})}),d.jsx("span",{className:`text-xs md:text-sm font-bold truncate max-w-[120px] md:max-w-none ${p?"text-red-500 italic":s.isExternal?"text-slate-400 italic font-medium":"text-slate-700"}`,children:s.name})]})}),d.jsx("td",{className:"px-4 md:px-6 py-4 md:py-5",children:d.jsx("div",{className:"flex justify-center",children:(n==null?void 0:n.type)!=="ADMIN"&&s.isExternal?d.jsxs("div",{className:"flex items-center gap-2 text-[9px] md:text-[10px] font-bold text-slate-300 uppercase tracking-widest italic leading-none",children:[d.jsx("div",{className:"w-6 md:w-8 h-1 bg-slate-100 rounded-full"}),"Privado"]}):d.jsxs("div",{className:"space-y-1.5 w-full max-w-[100px] md:max-w-[140px]",children:[d.jsxs("div",{className:"flex items-center justify-between text-[8px] md:text-[10px] font-black uppercase tracking-tighter",children:[d.jsx("span",{className:m?"text-red-500":"text-slate-400",children:m?"Agotado":`${l} Libres`}),d.jsxs("span",{className:"text-slate-800",children:[h,"%"]})]}),d.jsx("div",{className:"h-1 md:h-1.5 w-full bg-slate-100 rounded-full overflow-hidden",children:d.jsx("div",{className:`h-full transition-all duration-1000 ${m?"bg-red-500":"bg-primary-500 shadow-[0_0_8px_rgba(255,109,0,0.3)]"}`,style:{width:`${h}%`}})})]})})}),d.jsx("td",{className:"px-4 md:px-6 py-4 md:py-5 text-center",children:d.jsx("div",{className:"inline-flex items-center gap-1.5 px-2 md:px-3 py-1 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest shrink-0",children:p?d.jsxs("span",{className:"bg-red-100 text-red-600 px-2 md:px-3 py-1 rounded-full flex items-center gap-1 leading-none",children:[d.jsx(cf,{size:10})," Pendiente"]}):m?d.jsx("span",{className:"bg-slate-800 text-white px-2 md:px-3 py-1 rounded-full flex items-center gap-1 shadow-lg shadow-slate-800/20 leading-none",children:"Completado"}):d.jsxs("span",{className:"bg-green-100 text-green-600 px-2 md:px-3 py-1 rounded-full flex items-center gap-1 leading-none",children:[d.jsx(Do,{size:10})," En Venta"]})})})]},i.id)})})]})})})}const TP=t=>{const[e,n]=W.useState({type:null,ownedPlates:[]}),[r,i]=W.useState({totalUsers:0,activeDrivers:0,totalVehicles:0,totalOwners:0,todayReservations:0,totalRevenue:0,loading:!0}),[s,o]=W.useState([]),[l,c]=W.useState([]),[h,m]=W.useState([]),[p,v]=W.useState({toLaPlata:0,toNataga:0});return W.useEffect(()=>{if(!t)return;let N=!0;const k=[],P=async()=>{try{const I=await Ya(Je(Ze,`admins/${t.uid}`));if(I.exists()&&I.val()===!0){N&&(n({type:"ADMIN",ownedPlates:[]}),M("ADMIN",[]));return}if((await Ya(Je(Ze,`dueños/${t.uid}`))).exists()){const T=await Ya(Je(Ze,"vehiculos"));let j=[];T.exists()&&(j=Object.entries(T.val()).filter(([F,U])=>U.ownerId===t.uid).map(([F,U])=>F)),N&&(n({type:"OWNER",ownedPlates:j}),M("OWNER",j))}else N&&(n({type:null,ownedPlates:[]}),i(T=>({...T,loading:!1})))}catch(I){console.error("Error resolviendo rol:",I),N&&i(w=>({...w,loading:!1}))}},M=(I,w)=>{const T=new Date,j=T.getTimezoneOffset()*6e4,F=new Date(T.getTime()-j).toISOString().split("T")[0];if(I==="ADMIN"){const _=ii(Je(Ze,"usuarios"),C=>{if(C.exists()){const b=Object.entries(C.val()).map(([x,X])=>({id:x,...X}));c(b),i(x=>({...x,totalUsers:b.filter(X=>!X.solicitudBorrado).length}))}});k.push(_);const S=ii(Je(Ze,"dueños"),C=>{if(C.exists()){const b=Object.keys(C.val()).length;i(x=>({...x,totalOwners:b}))}});k.push(S)}const U=ii(Je(Ze,"vehiculos"),_=>{if(_.exists()){const S=Object.entries(_.val()).map(([b,x])=>({id:b,...x})),C=I==="ADMIN"?S:S.filter(b=>b.ownerId===t.uid);i(b=>({...b,totalVehicles:C.length})),ii(Je(Ze,"conductores"),b=>{if(b.exists()){const x=Object.entries(b.val()).map(([Ve,Qt])=>({id:Ve,...Qt})),X=I==="ADMIN"?x:x.filter(Ve=>w.includes(Ve.placaVehiculo||Ve.vehiculoId));o(X),i(Ve=>({...Ve,activeDrivers:X.filter(Qt=>Qt.status==="active").length}))}},{onlyOnce:!0})}});k.push(U);const E=ii(Je(Ze,"reservas"),_=>{let S=0,C=0,b=0,x=0;_.exists()?(Object.values(_.val()).forEach(X=>{const Ve=X.vehiculoId||X.vehiculoPlaca;if(I==="ADMIN"||w.includes(Ve)){const $=(X.estadoReserva||X.reservationStatus||"").toLowerCase();($==="confirmada"||$==="completada")&&(x+=Number(X.precio||X.price||0))}const vt=X.fechaViaje||X.travelDate||X.reservationDate||X.fechaReserva;if((typeof vt=="number"?new Date(vt-j).toISOString().split("T")[0]:vt)===F){S++;const $=(X.destino||X.destination||"").toLowerCase();$.includes("la plata")?C++:($.includes("natagá")||$.includes("nataga"))&&b++}}),N&&(i(X=>({...X,todayReservations:S,totalRevenue:x,loading:!1})),v({toLaPlata:C,toNataga:b}))):N&&i(X=>({...X,loading:!1}))});k.push(E);const y=ii(Je(Ze,"horarios"),_=>{if(_.exists()){const S=Object.entries(_.val()).map(([C,b])=>({id:C,...b}));m(S)}});k.push(y)};return P(),()=>{N=!1,k.forEach(I=>I())}},[t]),{role:e,stats:r,drivers:s,users:l,schedules:h,routeStats:p}};function NP(){const[t,e]=W.useState(null),[n,r]=W.useState("landing"),[i,s]=W.useState("overview"),[o,l]=W.useState(!0),[c,h]=W.useState(!1),[m,p]=W.useState(null),[v,N]=W.useState(!1);W.useEffect(()=>{const j=iT(No,F=>{e(F),l(!1)});return()=>j()},[]);const{role:k,stats:P,drivers:M,users:I,schedules:w,routeStats:T}=TP(t);return o?d.jsxs("div",{className:"h-screen bg-secondary-900 flex flex-col items-center justify-center gap-6",children:[d.jsxs("div",{className:"relative",children:[d.jsx("img",{src:"/assets/logo_icon.png",alt:"Ruta-Go",className:"w-16 h-16 object-contain animate-pulse"}),d.jsx(Fi,{className:"text-primary-500 animate-spin absolute -bottom-2 -right-2",size:24})]}),d.jsx("p",{className:"text-white/40 text-[10px] font-black uppercase tracking-widest animate-pulse",children:"Autenticando..."})]}):t?!P.loading&&!(k!=null&&k.type)?d.jsxs("div",{className:"h-screen bg-secondary-900 flex flex-col items-center justify-center p-10 text-center gap-6",children:[d.jsx("div",{className:"w-20 h-20 bg-red-500/20 rounded-3xl flex items-center justify-center text-red-500",children:d.jsx(lf,{size:40})}),d.jsxs("div",{children:[d.jsx("h2",{className:"text-white text-2xl font-black tracking-tight",children:"Acceso Denegado"}),d.jsx("p",{className:"text-white/40 text-sm mt-2 max-w-xs mx-auto",children:"Tu cuenta no tiene permisos administrativos para este portal."})]}),d.jsx("button",{onClick:()=>No.signOut(),className:"px-8 py-3 bg-white text-secondary-900 font-bold rounded-xl shadow-xl active:scale-95 transition-all",children:"Cerrar Sesión"})]}):d.jsxs("div",{className:"flex h-screen bg-slate-50 text-slate-900 antialiased font-sans overflow-hidden",children:[d.jsx(wP,{isOpen:c,onClose:()=>h(!1),activeTab:i,setActiveTab:s,role:k}),d.jsxs("main",{className:"flex-1 flex flex-col min-w-0 overflow-hidden relative",children:[d.jsx(SP,{title:i==="overview"?k!=null&&k.type?k.type==="ADMIN"?"Panel Maestro":"Dashboard Dueño":"Cargando...":i==="drivers"?"Gestión de Conductores":i==="users"?"Base de Clientes (Pasajeros)":i==="schedules"?"Planilla de Despachos":"Dashboard",userEmail:t.email,onMenuClick:()=>h(!0),role:k}),d.jsx("div",{className:"flex-1 overflow-y-auto p-4 lg:p-10 bg-slate-50/50",children:i==="overview"?d.jsx(bP,{stats:P,routeStats:T,role:k}):i==="drivers"?d.jsx(PP,{drivers:M,onEditDriver:j=>p(j),onAddDriver:()=>N(!0)}):i==="users"?d.jsx(AP,{users:I}):i==="schedules"?d.jsx(RP,{schedules:w,drivers:M,role:k}):d.jsx("div",{className:"flex items-center justify-center h-full text-slate-400 font-medium italic",children:"Módulo en desarrollo (Fase 2)..."})})]}),m&&d.jsx(IP,{driver:m,onClose:()=>p(null),onRefresh:()=>{}}),v&&d.jsx(kP,{onClose:()=>N(!1),users:I,currentUser:t,role:k})]}):n==="login"?d.jsx(vP,{onBack:()=>r("landing"),onShowRegister:()=>r("register")}):n==="register"?d.jsx(yP,{onBack:()=>r("landing")}):n==="terms"?d.jsx(_P,{onBack:()=>r("landing")}):n==="privacy"?d.jsx(xP,{onBack:()=>r("landing")}):d.jsx(gP,{onLogin:()=>r("login"),onRegisterOwner:()=>r("register"),onViewTerms:()=>r("terms"),onViewPrivacy:()=>r("privacy")})}function bP({stats:t,routeStats:e,role:n}){const r=s=>new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0}).format(s),i=(n==null?void 0:n.type)==="ADMIN";return d.jsxs(d.Fragment,{children:[d.jsxs("div",{className:`grid grid-cols-1 md:grid-cols-2 ${i?"lg:grid-cols-5":"lg:grid-cols-3"} gap-8 mb-10`,children:[i&&d.jsxs(d.Fragment,{children:[d.jsx(Ts,{label:"Usuarios Activos",value:t.totalUsers,icon:d.jsx(El,{className:"text-blue-500"}),trend:"Habeas Data OK"}),d.jsx(Ts,{label:"Dueños de Flota",value:t.totalOwners,icon:d.jsx(El,{className:"text-amber-500"}),trend:"Socios Activos"})]}),d.jsx(Ts,{label:"Conductores en Turno",value:t.activeDrivers,icon:d.jsx(Oo,{className:"text-green-500"}),trend:"Estado: Active"}),d.jsx(Ts,{label:"Reservas Hoy",value:t.todayReservations,icon:d.jsx(p_,{className:"text-purple-500"}),trend:"Fecha Actual"}),d.jsx(Ts,{label:"Ingresos Generados",value:r(t.totalRevenue),icon:d.jsx(lf,{className:"text-primary-500"}),trend:i?"Holding Total":"Tus Vehículos"})]}),d.jsxs("div",{className:"bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50",children:[d.jsxs("div",{className:"flex items-center justify-between mb-8",children:[d.jsxs("div",{children:[d.jsx("h3",{className:"font-bold text-xl text-slate-800 tracking-tight",children:"Monitor de Demanda por Ruta"}),d.jsx("p",{className:"text-xs text-slate-400 font-medium uppercase mt-1",children:"Tráfico de pasajeros en tiempo real"})]}),d.jsx("div",{className:"px-3 py-1 bg-primary-50 rounded-full text-[10px] font-black text-primary-600 uppercase",children:"Live Feedback"})]}),d.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-10",children:[d.jsx(Xv,{label:"Natagá → La Plata",value:e.toLaPlata,color:"bg-orange-500",icon:d.jsx(wl,{size:16})}),d.jsx(Xv,{label:"La Plata → Natagá",value:e.toNataga,color:"bg-secondary-900",icon:d.jsx(wl,{size:16})})]})]})]})}function RP({schedules:t,drivers:e,role:n}){const[r,i]=W.useState("toLaPlata"),s=t.filter(c=>c.ruta.toLowerCase().includes("natagá -> la plata")||c.ruta.toLowerCase().includes("nataga")&&c.ruta.toLowerCase().includes("plata")&&c.ruta.toLowerCase().indexOf("nataga")<c.ruta.toLowerCase().indexOf("plata")),o=t.filter(c=>c.ruta.toLowerCase().includes("la plata -> natagá")||c.ruta.toLowerCase().includes("plata")&&c.ruta.toLowerCase().includes("nataga")&&c.ruta.toLowerCase().indexOf("plata")<c.ruta.toLowerCase().indexOf("nataga")),l=r==="toLaPlata"?s:o;return d.jsxs("div",{className:"space-y-6",children:[d.jsxs("div",{className:"flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4",children:[d.jsxs("div",{className:"flex items-center gap-3",children:[d.jsx("div",{className:"w-2 h-6 bg-primary-500 rounded-full"}),d.jsx("h3",{className:"text-xl font-black text-slate-800 uppercase tracking-tight",children:"Planilla de Despachos"})]}),d.jsxs("div",{className:"flex bg-slate-100 p-1 rounded-xl shrink-0",children:[d.jsx("button",{onClick:()=>i("toLaPlata"),className:`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${r==="toLaPlata"?"bg-white text-primary-500 shadow-sm":"text-slate-400 hover:text-slate-600"}`,children:"Natagá → La Plata"}),d.jsx("button",{onClick:()=>i("toNataga"),className:`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${r==="toNataga"?"bg-white text-secondary-900 shadow-sm":"text-slate-400 hover:text-slate-600"}`,children:"La Plata → Natagá"})]})]}),d.jsxs("div",{className:"flex items-center gap-4 mb-2",children:[d.jsxs("span",{className:"px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[10px] font-black uppercase",children:[l.length," Salidas Programadas"]}),d.jsx("span",{className:`px-3 py-1 rounded-full text-[10px] font-black uppercase ${r==="toLaPlata"?"bg-orange-50 text-orange-600":"bg-secondary-50 text-secondary-900"}`,children:r==="toLaPlata"?"Sentido Occidente":"Sentido Oriente"})]}),d.jsx(CP,{schedules:l,drivers:e,role:n}),d.jsxs("div",{className:"p-6 bg-blue-50 rounded-3xl border border-blue-100 flex items-center gap-4 mt-8",children:[d.jsx("div",{className:"w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 shrink-0",children:d.jsx(lf,{size:24})}),d.jsxs("div",{children:[d.jsx("h4",{className:"text-sm font-black text-blue-900 uppercase",children:"Estado de la Operación"}),d.jsxs("p",{className:"text-xs text-blue-700 font-medium",children:["Mostrando planilla en tiempo real para la ruta:",d.jsx("strong",{className:"ml-1 uppercase",children:r==="toLaPlata"?"Natagá a La Plata":"La Plata a Natagá"}),"."]})]})]})]})}function AP({users:t=[]}){const e=(t||[]).filter(r=>!r.solicitudBorrado),n=(t||[]).filter(r=>r.solicitudBorrado===!0);return d.jsxs("div",{className:"space-y-12",children:[d.jsxs("div",{className:"space-y-6",children:[d.jsxs("div",{className:"flex items-center gap-3 border-b border-slate-200 pb-4",children:[d.jsx("div",{className:"w-2 h-6 bg-blue-500 rounded-full"}),d.jsx("h3",{className:"text-lg font-black text-slate-800 uppercase tracking-tight",children:"Pasajeros Activos"}),d.jsxs("span",{className:"px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-[10px] font-bold",children:[e.length," TOTAL"]})]}),d.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6",children:e.length>0?e.map(r=>d.jsx(ey,{user:r},r.id)):d.jsx("p",{className:"col-span-full text-center py-10 text-slate-400 italic",children:"No hay usuarios registrados aún"})})]}),n.length>0&&d.jsxs("div",{className:"space-y-6",children:[d.jsxs("div",{className:"flex items-center gap-3 border-b border-slate-200 pb-4",children:[d.jsx("div",{className:"w-2 h-6 bg-red-500 rounded-full"}),d.jsx("h3",{className:"text-lg font-black text-slate-800 uppercase tracking-tight text-red-600",children:"Solicitudes de Borrado"}),d.jsxs("span",{className:"px-3 py-1 bg-red-100 text-red-600 rounded-full text-[10px] font-bold",children:[n.length," PENDIENTES"]})]}),d.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6",children:n.map(r=>d.jsx(ey,{user:r},r.id))}),d.jsx("div",{className:"p-4 bg-red-50 rounded-2xl border border-red-100",children:d.jsx("p",{className:"text-[10px] text-red-700 font-bold uppercase leading-relaxed",children:"⚠️ Nota Legal: Estas cuentas han solicitado el ejercicio de su Derecho al Olvido. Serán eliminadas permanentemente por la Cloud Function tras cumplirse el periodo de gracia de 30 días."})})]})]})}function PP({drivers:t,onEditDriver:e,onAddDriver:n}){const r=t.filter(s=>s.status==="active"&&s.horariosAsignados&&s.horariosAsignados.length>0),i=t.filter(s=>s.status!=="active"||!s.horariosAsignados||s.horariosAsignados.length===0);return d.jsxs("div",{className:"space-y-10",children:[d.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40",children:[d.jsxs("div",{children:[d.jsx("h3",{className:"text-xl font-black text-slate-800 uppercase tracking-tight",children:"Gestión de Operadores"}),d.jsx("p",{className:"text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1",children:"Control de flota y personal"})]}),d.jsxs("button",{onClick:n,className:"flex items-center justify-center gap-3 px-8 py-4 bg-primary-500 hover:bg-orange-600 text-white rounded-2xl shadow-lg shadow-primary-500/30 transition-all transform active:scale-95 font-black text-[10px] uppercase",children:[d.jsx(x_,{size:18})," Registrar Nuevo Conductor"]})]}),d.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-10",children:[d.jsxs("div",{className:"space-y-6",children:[d.jsxs("div",{className:"flex items-center justify-between border-b border-slate-200 pb-4",children:[d.jsxs("div",{className:"flex items-center gap-3",children:[d.jsx("div",{className:"w-2 h-6 bg-green-500 rounded-full"}),d.jsx("h3",{className:"text-lg font-black text-slate-800 uppercase tracking-tight",children:"Operando Hoy"})]}),d.jsxs("span",{className:"px-3 py-1 bg-green-100 text-green-600 rounded-full text-[10px] font-black",children:[r.length," ACTIVOS"]})]}),d.jsx("div",{className:"grid grid-cols-1 gap-4",children:r.length>0?r.map(s=>d.jsx(Jv,{driver:s,onEdit:e},s.id)):d.jsxs("div",{className:"p-8 bg-white rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400",children:[d.jsx(Oo,{size:32,className:"mb-2 opacity-20"}),d.jsx("p",{className:"text-xs font-bold uppercase italic",children:"Sin actividad en ruta"})]})})]}),d.jsxs("div",{className:"space-y-6",children:[d.jsxs("div",{className:"flex items-center justify-between border-b border-slate-200 pb-4",children:[d.jsxs("div",{className:"flex items-center gap-3",children:[d.jsx("div",{className:"w-2 h-6 bg-slate-300 rounded-full"}),d.jsx("h3",{className:"text-lg font-black text-slate-800 uppercase tracking-tight",children:"Fuera de Servicio"})]}),d.jsxs("span",{className:"px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[10px] font-black",children:[i.length," TOTAL"]})]}),d.jsx("div",{className:"grid grid-cols-1 gap-4 opacity-90 grayscale-[0.3]",children:i.length>0?i.map(s=>d.jsx(Jv,{driver:s,onEdit:e},s.id)):d.jsx("div",{className:"p-8 bg-white rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400",children:d.jsx("p",{className:"text-xs font-bold uppercase italic",children:"Personal completo en ruta"})})})]})]})]})}qu.createRoot(document.getElementById("root")).render(d.jsx(eE.StrictMode,{children:d.jsx(NP,{})}));
