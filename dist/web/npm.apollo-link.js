(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{30:function(n,e,t){"use strict";t.d(e,"a",(function(){return q})),t.d(e,"b",(function(){return l})),t.d(e,"c",(function(){return v})),t.d(e,"d",(function(){return a}));var r=t(19),u=t(5),o=t(2),i=t(4);!function(n){function e(e,t){var r=n.call(this,e)||this;return r.link=t,r}Object(o.c)(e,n)}(Error);function c(n){return n.request.length<=1}function a(n){return new r.a((function(e){e.error(n)}))}function f(n,e){var t=Object(o.a)({},n);return Object.defineProperty(e,"setContext",{enumerable:!1,value:function(n){t="function"==typeof n?Object(o.a)({},t,n(t)):Object(o.a)({},t,n)}}),Object.defineProperty(e,"getContext",{enumerable:!1,value:function(){return Object(o.a)({},t)}}),Object.defineProperty(e,"toKey",{enumerable:!1,value:function(){return function(n){var e=n.query,t=n.variables,r=n.operationName;return JSON.stringify([r,e,t])}(e)}}),e}function s(n,e){return e?e(n):r.a.of()}function p(n){return"function"==typeof n?new q(n):n}function b(){return new q((function(){return r.a.of()}))}function w(n){return 0===n.length?b():n.map(p).reduce((function(n,e){return n.concat(e)}))}function y(n,e,t){var u=p(e),o=p(t||new q(s));return c(u)&&c(o)?new q((function(e){return n(e)?u.request(e)||r.a.of():o.request(e)||r.a.of()})):new q((function(e,t){return n(e)?u.request(e,t)||r.a.of():o.request(e,t)||r.a.of()}))}var l=function(n,e){var t=p(n);if(c(t))return t;var u=p(e);return c(u)?new q((function(n){return t.request(n,(function(n){return u.request(n)||r.a.of()}))||r.a.of()})):new q((function(n,e){return t.request(n,(function(n){return u.request(n,e)||r.a.of()}))||r.a.of()}))},q=function(){function n(n){n&&(this.request=n)}return n.prototype.split=function(e,t,r){return this.concat(y(e,t,r||new n(s)))},n.prototype.concat=function(n){return l(this,n)},n.prototype.request=function(n,e){throw new u.a(1)},n.empty=b,n.from=w,n.split=y,n.execute=v,n}();function v(n,e){return n.request(f(e.context,function(n){var e={variables:n.variables||{},extensions:n.extensions||{},operationName:n.operationName,query:n.query};return e.operationName||(e.operationName="string"!=typeof e.query?Object(i.n)(e.query):""),e}(function(n){for(var e=["query","operationName","variables","extensions","context"],t=0,r=Object.keys(n);t<r.length;t++){var o=r[t];if(e.indexOf(o)<0)throw new u.a(2)}return n}(e))))||r.a.of()}}}]);
//# sourceMappingURL=npm.apollo-link.js.map