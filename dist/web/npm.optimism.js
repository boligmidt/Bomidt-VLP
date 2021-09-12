(window.webpackJsonp=window.webpackJsonp||[]).push([[55],{57:function(t,e,n){"use strict";n.d(e,"a",(function(){return E})),n.d(e,"b",(function(){return O}));var r=n(69);function i(){}var s=function(){function t(t,e){void 0===t&&(t=1/0),void 0===e&&(e=i),this.max=t,this.dispose=e,this.map=new Map,this.newest=null,this.oldest=null}return t.prototype.has=function(t){return this.map.has(t)},t.prototype.get=function(t){var e=this.getEntry(t);return e&&e.value},t.prototype.getEntry=function(t){var e=this.map.get(t);if(e&&e!==this.newest){var n=e.older,r=e.newer;r&&(r.older=n),n&&(n.newer=r),e.older=this.newest,e.older.newer=e,e.newer=null,this.newest=e,e===this.oldest&&(this.oldest=r)}return e},t.prototype.set=function(t,e){var n=this.getEntry(t);return n?n.value=e:(n={key:t,value:e,newer:null,older:this.newest},this.newest&&(this.newest.newer=n),this.newest=n,this.oldest=this.oldest||n,this.map.set(t,n),n.value)},t.prototype.clean=function(){for(;this.oldest&&this.map.size>this.max;)this.delete(this.oldest.key)},t.prototype.delete=function(t){var e=this.map.get(t);return!!e&&(e===this.newest&&(this.newest=e.older),e===this.oldest&&(this.oldest=e.newer),e.newer&&(e.newer.older=e.older),e.older&&(e.older.newer=e.newer),this.map.delete(t),this.dispose(e.value,t),!0)},t}(),o=new r.a,u=[],a=[],l=100;function h(t,e){if(!t)throw new Error(e||"assertion failure")}function c(t){switch(t.length){case 0:throw new Error("unknown value");case 1:return t[0];case 2:throw t[1]}}var p=function(){function t(e,n){this.fn=e,this.args=n,this.parents=new Set,this.childValues=new Map,this.dirtyChildren=null,this.dirty=!0,this.recomputing=!1,this.value=[],++t.count}return t.prototype.recompute=function(){if(h(!this.recomputing,"already recomputing"),function(t){var e=o.getValue();if(e)return t.parents.add(e),e.childValues.has(t)||e.childValues.set(t,[]),f(t)?v(e,t):g(e,t),e}(this)||!k(this))return f(this)?function(t){var e=m(t);o.withValue(t,d,[t]),function(t){if("function"==typeof t.subscribe)try{C(t),t.unsubscribe=t.subscribe.apply(null,t.args)}catch(e){return t.setDirty(),!1}return!0}(t)&&function(t){if(t.dirty=!1,f(t))return;w(t)}(t);return e.forEach(k),c(t.value)}(this):c(this.value)},t.prototype.setDirty=function(){this.dirty||(this.dirty=!0,this.value.length=0,y(this),C(this))},t.prototype.dispose=function(){var t=this;m(this).forEach(k),C(this),this.parents.forEach((function(e){e.setDirty(),V(e,t)}))},t.count=0,t}();function d(t){t.recomputing=!0,t.value.length=0;try{t.value[0]=t.fn.apply(null,t.args)}catch(e){t.value[1]=e}t.recomputing=!1}function f(t){return t.dirty||!(!t.dirtyChildren||!t.dirtyChildren.size)}function y(t){t.parents.forEach((function(e){return v(e,t)}))}function w(t){t.parents.forEach((function(e){return g(e,t)}))}function v(t,e){if(h(t.childValues.has(e)),h(f(e)),t.dirtyChildren){if(t.dirtyChildren.has(e))return}else t.dirtyChildren=a.pop()||new Set;t.dirtyChildren.add(e),y(t)}function g(t,e){h(t.childValues.has(e)),h(!f(e));var n,r,i,s=t.childValues.get(e);0===s.length?t.childValues.set(e,e.value.slice(0)):(n=s,r=e.value,(i=n.length)>0&&i===r.length&&n[i-1]===r[i-1]||t.setDirty()),b(t,e),f(t)||w(t)}function b(t,e){var n=t.dirtyChildren;n&&(n.delete(e),0===n.size&&(a.length<l&&a.push(n),t.dirtyChildren=null))}function k(t){return 0===t.parents.size&&"function"==typeof t.reportOrphan&&!0===t.reportOrphan()}function m(t){var e=u;return t.childValues.size>0&&(e=[],t.childValues.forEach((function(n,r){V(t,r),e.push(r)}))),h(null===t.dirtyChildren),e}function V(t,e){e.parents.delete(t),t.childValues.delete(e),b(t,e)}function C(t){var e=t.unsubscribe;"function"==typeof e&&(t.unsubscribe=void 0,e())}var E=function(){function t(t){this.weakness=t}return t.prototype.lookup=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return this.lookupArray(t)},t.prototype.lookupArray=function(t){var e=this;return t.forEach((function(t){return e=e.getChildTrie(t)})),e.data||(e.data=Object.create(null))},t.prototype.getChildTrie=function(e){var n=this.weakness&&function(t){switch(typeof t){case"object":if(null===t)break;case"function":return!0}return!1}(e)?this.weak||(this.weak=new WeakMap):this.strong||(this.strong=new Map),r=n.get(e);return r||n.set(e,r=new t(this.weakness)),r},t}();var M=new E("function"==typeof WeakMap);function z(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return M.lookupArray(t)}var D=new Set;function O(t,e){void 0===e&&(e=Object.create(null));var n=new s(e.max||Math.pow(2,16),(function(t){return t.dispose()})),r=!!e.disposable,i=e.makeCacheKey||z;function u(){if(!r||o.hasValue()){var s=i.apply(null,arguments);if(void 0===s)return t.apply(null,arguments);var u=Array.prototype.slice.call(arguments),a=n.get(s);a?a.args=u:(a=new p(t,u),n.set(s,a),a.subscribe=e.subscribe,r&&(a.reportOrphan=function(){return n.delete(s)}));var l=a.recompute();return n.set(s,a),D.add(n),o.hasValue()||(D.forEach((function(t){return t.clean()})),D.clear()),r?void 0:l}}return u.dirty=function(){var t=i.apply(null,arguments),e=void 0!==t&&n.get(t);e&&e.setDirty()},u}}}]);
//# sourceMappingURL=npm.optimism.js.map