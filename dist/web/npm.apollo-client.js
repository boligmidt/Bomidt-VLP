(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{56:function(t,e,r){"use strict";r.d(e,"a",(function(){return M})),r.d(e,"b",(function(){return b})),r.d(e,"c",(function(){return o}));var o,n=r(2),i=r(4),s=r(13),a=r(19),u=r(30),c=r(322),l=r(5),h=r(26);function p(t){return t<7}!function(t){t[t.loading=1]="loading",t[t.setVariables=2]="setVariables",t[t.fetchMore=3]="fetchMore",t[t.refetch=4]="refetch",t[t.poll=6]="poll",t[t.ready=7]="ready",t[t.error=8]="error"}(o||(o={}));var f=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return Object(n.c)(e,t),e.prototype[c.a]=function(){return this},e.prototype["@@observable"]=function(){return this},e}(a.a);function y(t){return Array.isArray(t)&&t.length>0}var d,v=function(t){var e="";return y(t.graphQLErrors)&&t.graphQLErrors.forEach((function(t){var r=t?t.message:"Error message not found.";e+="GraphQL error: "+r+"\n"})),t.networkError&&(e+="Network error: "+t.networkError.message+"\n"),e=e.replace(/\n$/,"")},b=function(t){function e(r){var o=r.graphQLErrors,n=r.networkError,i=r.errorMessage,s=r.extraInfo,a=t.call(this,i)||this;return a.graphQLErrors=o||[],a.networkError=n||null,a.message=i||v(a),a.extraInfo=s,a.__proto__=e.prototype,a}return Object(n.c)(e,t),e}(Error);!function(t){t[t.normal=1]="normal",t[t.refetch=2]="refetch",t[t.poll=3]="poll"}(d||(d={}));var m=function(t){function e(e){var r=e.queryManager,o=e.options,n=e.shouldSubscribe,s=void 0===n||n,a=t.call(this,(function(t){return a.onSubscribe(t)}))||this;a.observers=new Set,a.subscriptions=new Set,a.isTornDown=!1,a.options=o,a.variables=o.variables||{},a.queryId=r.generateQueryId(),a.shouldSubscribe=s;var u=Object(i.m)(o.query);return a.queryName=u&&u.name&&u.name.value,a.queryManager=r,a}return Object(n.c)(e,t),e.prototype.result=function(){var t=this;return new Promise((function(e,r){var o={next:function(r){e(r),t.observers.delete(o),t.observers.size||t.queryManager.removeQuery(t.queryId),setTimeout((function(){n.unsubscribe()}),0)},error:r},n=t.subscribe(o)}))},e.prototype.currentResult=function(){var t=this.getCurrentResult();return void 0===t.data&&(t.data={}),t},e.prototype.getCurrentResult=function(){if(this.isTornDown){var t=this.lastResult;return{data:!this.lastError&&t&&t.data||void 0,error:this.lastError,loading:!1,networkStatus:o.error}}var e,r,i,s=this.queryManager.getCurrentQueryResult(this),a=s.data,u=s.partial,c=this.queryManager.queryStore.get(this.queryId),l=this.options.fetchPolicy,h="network-only"===l||"no-cache"===l;if(c){var f=c.networkStatus;if(r=c,void 0===(i=this.options.errorPolicy)&&(i="none"),r&&(r.networkError||"none"===i&&y(r.graphQLErrors)))return{data:void 0,loading:!1,networkStatus:f,error:new b({graphQLErrors:c.graphQLErrors,networkError:c.networkError})};c.variables&&(this.options.variables=Object(n.a)({},this.options.variables,c.variables),this.variables=this.options.variables),e={data:a,loading:p(f),networkStatus:f},c.graphQLErrors&&"all"===this.options.errorPolicy&&(e.errors=c.graphQLErrors)}else{var d=h||u&&"cache-only"!==l;e={data:a,loading:d,networkStatus:d?o.loading:o.ready}}return u||this.updateLastResult(Object(n.a)({},e,{stale:!1})),Object(n.a)({},e,{partial:u})},e.prototype.isDifferentFromLastResult=function(t){var e=this.lastResultSnapshot;return!(e&&t&&e.networkStatus===t.networkStatus&&e.stale===t.stale&&Object(s.a)(e.data,t.data))},e.prototype.getLastResult=function(){return this.lastResult},e.prototype.getLastError=function(){return this.lastError},e.prototype.resetLastResults=function(){delete this.lastResult,delete this.lastResultSnapshot,delete this.lastError,this.isTornDown=!1},e.prototype.resetQueryStoreErrors=function(){var t=this.queryManager.queryStore.get(this.queryId);t&&(t.networkError=null,t.graphQLErrors=[])},e.prototype.refetch=function(t){var e=this.options.fetchPolicy;return"cache-only"===e?Promise.reject(new l.a(3)):("no-cache"!==e&&"cache-and-network"!==e&&(e="network-only"),Object(s.a)(this.variables,t)||(this.variables=Object(n.a)({},this.variables,t)),Object(s.a)(this.options.variables,this.variables)||(this.options.variables=Object(n.a)({},this.options.variables,this.variables)),this.queryManager.fetchQuery(this.queryId,Object(n.a)({},this.options,{fetchPolicy:e}),d.refetch))},e.prototype.fetchMore=function(t){var e=this;Object(l.b)(t.updateQuery,4);var r=Object(n.a)({},t.query?t:Object(n.a)({},this.options,t,{variables:Object(n.a)({},this.variables,t.variables)}),{fetchPolicy:"network-only"}),o=this.queryManager.generateQueryId();return this.queryManager.fetchQuery(o,r,d.normal,this.queryId).then((function(n){return e.updateQuery((function(e){return t.updateQuery(e,{fetchMoreResult:n.data,variables:r.variables})})),e.queryManager.stopQuery(o),n}),(function(t){throw e.queryManager.stopQuery(o),t}))},e.prototype.subscribeToMore=function(t){var e=this,r=this.queryManager.startGraphQLSubscription({query:t.document,variables:t.variables}).subscribe({next:function(r){var o=t.updateQuery;o&&e.updateQuery((function(t,e){var n=e.variables;return o(t,{subscriptionData:r,variables:n})}))},error:function(e){t.onError&&t.onError(e)}});return this.subscriptions.add(r),function(){e.subscriptions.delete(r)&&r.unsubscribe()}},e.prototype.setOptions=function(t){var e=this.options.fetchPolicy;this.options=Object(n.a)({},this.options,t),t.pollInterval?this.startPolling(t.pollInterval):0===t.pollInterval&&this.stopPolling();var r=t.fetchPolicy;return this.setVariables(this.options.variables,e!==r&&("cache-only"===e||"standby"===e||"network-only"===r),t.fetchResults)},e.prototype.setVariables=function(t,e,r){return void 0===e&&(e=!1),void 0===r&&(r=!0),this.isTornDown=!1,t=t||this.variables,!e&&Object(s.a)(t,this.variables)?this.observers.size&&r?this.result():Promise.resolve():(this.variables=this.options.variables=t,this.observers.size?this.queryManager.fetchQuery(this.queryId,this.options):Promise.resolve())},e.prototype.updateQuery=function(t){var e=this.queryManager,r=e.getQueryWithPreviousResult(this.queryId),o=r.previousResult,n=r.variables,s=r.document,a=Object(i.I)((function(){return t(o,{variables:n})}));a&&(e.dataStore.markUpdateQueryResult(s,n,a),e.broadcastQueries())},e.prototype.stopPolling=function(){this.queryManager.stopPollingQuery(this.queryId),this.options.pollInterval=void 0},e.prototype.startPolling=function(t){O(this),this.options.pollInterval=t,this.queryManager.startPollingQuery(this.options,this.queryId)},e.prototype.updateLastResult=function(t){var e=this.lastResult;return this.lastResult=t,this.lastResultSnapshot=this.queryManager.assumeImmutableResults?t:Object(i.f)(t),e},e.prototype.onSubscribe=function(t){var e=this;try{var r=t._subscription._observer;r&&!r.error&&(r.error=Q)}catch(t){}var o=!this.observers.size;return this.observers.add(t),t.next&&this.lastResult&&t.next(this.lastResult),t.error&&this.lastError&&t.error(this.lastError),o&&this.setUpQuery(),function(){e.observers.delete(t)&&!e.observers.size&&e.tearDownQuery()}},e.prototype.setUpQuery=function(){var t=this,e=this.queryManager,r=this.queryId;this.shouldSubscribe&&e.addObservableQuery(r,this),this.options.pollInterval&&(O(this),e.startPollingQuery(this.options,r));var i=function(e){t.updateLastResult(Object(n.a)({},t.lastResult,{errors:e.graphQLErrors,networkStatus:o.error,loading:!1})),g(t.observers,"error",t.lastError=e)};e.observeQuery(r,this.options,{next:function(r){if(t.lastError||t.isDifferentFromLastResult(r)){var o=t.updateLastResult(r),n=t.options,i=n.query,a=n.variables,u=n.fetchPolicy;e.transform(i).hasClientExports?e.getLocalState().addExportedVariables(i,a).then((function(n){var a=t.variables;t.variables=t.options.variables=n,!r.loading&&o&&"cache-only"!==u&&e.transform(i).serverQuery&&!Object(s.a)(a,n)?t.refetch():g(t.observers,"next",r)})):g(t.observers,"next",r)}},error:i}).catch(i)},e.prototype.tearDownQuery=function(){var t=this.queryManager;this.isTornDown=!0,t.stopPollingQuery(this.queryId),this.subscriptions.forEach((function(t){return t.unsubscribe()})),this.subscriptions.clear(),t.removeObservableQuery(this.queryId),t.stopQuery(this.queryId),this.observers.clear()},e}(f);function Q(t){}function g(t,e,r){var o=[];t.forEach((function(t){return t[e]&&o.push(t)})),o.forEach((function(t){return t[e](r)}))}function O(t){var e=t.options.fetchPolicy;Object(l.b)("cache-first"!==e&&"cache-only"!==e,5)}var w=function(){function t(){this.store={}}return t.prototype.getStore=function(){return this.store},t.prototype.get=function(t){return this.store[t]},t.prototype.initMutation=function(t,e,r){this.store[t]={mutation:e,variables:r||{},loading:!0,error:null}},t.prototype.markMutationError=function(t,e){var r=this.store[t];r&&(r.loading=!1,r.error=e)},t.prototype.markMutationResult=function(t){var e=this.store[t];e&&(e.loading=!1,e.error=null)},t.prototype.reset=function(){this.store={}},t}(),S=function(){function t(){this.store={}}return t.prototype.getStore=function(){return this.store},t.prototype.get=function(t){return this.store[t]},t.prototype.initQuery=function(t){var e=this.store[t.queryId];Object(l.b)(!e||e.document===t.document||Object(s.a)(e.document,t.document),19);var r,n=!1,i=null;t.storePreviousVariables&&e&&e.networkStatus!==o.loading&&(Object(s.a)(e.variables,t.variables)||(n=!0,i=e.variables)),r=n?o.setVariables:t.isPoll?o.poll:t.isRefetch?o.refetch:o.loading;var a=[];e&&e.graphQLErrors&&(a=e.graphQLErrors),this.store[t.queryId]={document:t.document,variables:t.variables,previousVariables:i,networkError:null,graphQLErrors:a,networkStatus:r,metadata:t.metadata},"string"==typeof t.fetchMoreForQueryId&&this.store[t.fetchMoreForQueryId]&&(this.store[t.fetchMoreForQueryId].networkStatus=o.fetchMore)},t.prototype.markQueryResult=function(t,e,r){this.store&&this.store[t]&&(this.store[t].networkError=null,this.store[t].graphQLErrors=y(e.errors)?e.errors:[],this.store[t].previousVariables=null,this.store[t].networkStatus=o.ready,"string"==typeof r&&this.store[r]&&(this.store[r].networkStatus=o.ready))},t.prototype.markQueryError=function(t,e,r){this.store&&this.store[t]&&(this.store[t].networkError=e,this.store[t].networkStatus=o.error,"string"==typeof r&&this.markQueryResultClient(r,!0))},t.prototype.markQueryResultClient=function(t,e){var r=this.store&&this.store[t];r&&(r.networkError=null,r.previousVariables=null,e&&(r.networkStatus=o.ready))},t.prototype.stopQuery=function(t){delete this.store[t]},t.prototype.reset=function(t){var e=this;Object.keys(this.store).forEach((function(r){t.indexOf(r)<0?e.stopQuery(r):e.store[r].networkStatus=o.loading}))},t}();var q=function(){function t(t){var e=t.cache,r=t.client,o=t.resolvers,n=t.fragmentMatcher;this.cache=e,r&&(this.client=r),o&&this.addResolvers(o),n&&this.setFragmentMatcher(n)}return t.prototype.addResolvers=function(t){var e=this;this.resolvers=this.resolvers||{},Array.isArray(t)?t.forEach((function(t){e.resolvers=Object(i.A)(e.resolvers,t)})):this.resolvers=Object(i.A)(this.resolvers,t)},t.prototype.setResolvers=function(t){this.resolvers={},this.addResolvers(t)},t.prototype.getResolvers=function(){return this.resolvers||{}},t.prototype.runResolvers=function(t){var e=t.document,r=t.remoteResult,o=t.context,i=t.variables,s=t.onlyRunForcedResolvers,a=void 0!==s&&s;return Object(n.b)(this,void 0,void 0,(function(){return Object(n.d)(this,(function(t){return e?[2,this.resolveDocument(e,r.data,o,i,this.fragmentMatcher,a).then((function(t){return Object(n.a)({},r,{data:t.result})}))]:[2,r]}))}))},t.prototype.setFragmentMatcher=function(t){this.fragmentMatcher=t},t.prototype.getFragmentMatcher=function(){return this.fragmentMatcher},t.prototype.clientQuery=function(t){return Object(i.s)(["client"],t)&&this.resolvers?t:null},t.prototype.serverQuery=function(t){return this.resolvers?Object(i.C)(t):t},t.prototype.prepareContext=function(t){void 0===t&&(t={});var e=this.cache;return Object(n.a)({},t,{cache:e,getCacheKey:function(t){if(e.config)return e.config.dataIdFromObject(t);Object(l.b)(!1,6)}})},t.prototype.addExportedVariables=function(t,e,r){return void 0===e&&(e={}),void 0===r&&(r={}),Object(n.b)(this,void 0,void 0,(function(){return Object(n.d)(this,(function(o){return t?[2,this.resolveDocument(t,this.buildRootValueFromCache(t,e)||{},this.prepareContext(r),e).then((function(t){return Object(n.a)({},e,t.exportedVariables)}))]:[2,Object(n.a)({},e)]}))}))},t.prototype.shouldForceResolvers=function(t){var e=!1;return Object(h.b)(t,{Directive:{enter:function(t){if("client"===t.name.value&&t.arguments&&(e=t.arguments.some((function(t){return"always"===t.name.value&&"BooleanValue"===t.value.kind&&!0===t.value.value}))))return h.a}}}),e},t.prototype.buildRootValueFromCache=function(t,e){return this.cache.diff({query:Object(i.d)(t),variables:e,returnPartialData:!0,optimistic:!1}).result},t.prototype.resolveDocument=function(t,e,r,o,s,a){return void 0===r&&(r={}),void 0===o&&(o={}),void 0===s&&(s=function(){return!0}),void 0===a&&(a=!1),Object(n.b)(this,void 0,void 0,(function(){var u,c,l,h,p,f,y,d,v;return Object(n.d)(this,(function(b){var m;return u=Object(i.l)(t),c=Object(i.j)(t),l=Object(i.g)(c),h=u.operation,p=h?(m=h).charAt(0).toUpperCase()+m.slice(1):"Query",y=(f=this).cache,d=f.client,v={fragmentMap:l,context:Object(n.a)({},r,{cache:y,client:d}),variables:o,fragmentMatcher:s,defaultOperationType:p,exportedVariables:{},onlyRunForcedResolvers:a},[2,this.resolveSelectionSet(u.selectionSet,e,v).then((function(t){return{result:t,exportedVariables:v.exportedVariables}}))]}))}))},t.prototype.resolveSelectionSet=function(t,e,r){return Object(n.b)(this,void 0,void 0,(function(){var o,s,a,u,c,h=this;return Object(n.d)(this,(function(p){return o=r.fragmentMap,s=r.context,a=r.variables,u=[e],c=function(t){return Object(n.b)(h,void 0,void 0,(function(){var c,h;return Object(n.d)(this,(function(n){return Object(i.F)(t,a)?Object(i.t)(t)?[2,this.resolveField(t,e,r).then((function(e){var r;void 0!==e&&u.push(((r={})[Object(i.E)(t)]=e,r))}))]:(Object(i.v)(t)?c=t:(c=o[t.name.value],Object(l.b)(c,7)),c&&c.typeCondition&&(h=c.typeCondition.name.value,r.fragmentMatcher(e,h,s))?[2,this.resolveSelectionSet(c.selectionSet,e,r).then((function(t){u.push(t)}))]:[2]):[2]}))}))},[2,Promise.all(t.selections.map(c)).then((function(){return Object(i.B)(u)}))]}))}))},t.prototype.resolveField=function(t,e,r){return Object(n.b)(this,void 0,void 0,(function(){var o,s,a,u,c,l,h,p,f,y=this;return Object(n.d)(this,(function(n){return o=r.variables,s=t.name.value,a=Object(i.E)(t),u=s!==a,c=e[a]||e[s],l=Promise.resolve(c),r.onlyRunForcedResolvers&&!this.shouldForceResolvers(t)||(h=e.__typename||r.defaultOperationType,(p=this.resolvers&&this.resolvers[h])&&(f=p[u?s:a])&&(l=Promise.resolve(f(e,Object(i.b)(t,o),r.context,{field:t})))),[2,l.then((function(e){return void 0===e&&(e=c),t.directives&&t.directives.forEach((function(t){"export"===t.name.value&&t.arguments&&t.arguments.forEach((function(t){"as"===t.name.value&&"StringValue"===t.value.kind&&(r.exportedVariables[t.value.value]=e)}))})),t.selectionSet?null==e?e:Array.isArray(e)?y.resolveSubSelectedArray(t,e,r):t.selectionSet?y.resolveSelectionSet(t.selectionSet,e,r):void 0:e}))]}))}))},t.prototype.resolveSubSelectedArray=function(t,e,r){var o=this;return Promise.all(e.map((function(e){return null===e?null:Array.isArray(e)?o.resolveSubSelectedArray(t,e,r):t.selectionSet?o.resolveSelectionSet(t.selectionSet,e,r):void 0})))},t}();function k(t){var e=new Set,r=null;return new f((function(o){return e.add(o),r=r||t.subscribe({next:function(t){e.forEach((function(e){return e.next&&e.next(t)}))},error:function(t){e.forEach((function(e){return e.error&&e.error(t)}))},complete:function(){e.forEach((function(t){return t.complete&&t.complete()}))}}),function(){e.delete(o)&&!e.size&&r&&(r.unsubscribe(),r=null)}}))}var R=Object.prototype.hasOwnProperty,j=function(){function t(t){var e=t.link,r=t.queryDeduplication,o=void 0!==r&&r,n=t.store,s=t.onBroadcast,a=void 0===s?function(){}:s,u=t.ssrMode,c=void 0!==u&&u,l=t.clientAwareness,h=void 0===l?{}:l,p=t.localState,f=t.assumeImmutableResults;this.mutationStore=new w,this.queryStore=new S,this.clientAwareness={},this.idCounter=1,this.queries=new Map,this.fetchQueryRejectFns=new Map,this.transformCache=new(i.e?WeakMap:Map),this.inFlightLinkObservables=new Map,this.pollingInfoByQueryId=new Map,this.link=e,this.queryDeduplication=o,this.dataStore=n,this.onBroadcast=a,this.clientAwareness=h,this.localState=p||new q({cache:n.getCache()}),this.ssrMode=c,this.assumeImmutableResults=!!f}return t.prototype.stop=function(){var t=this;this.queries.forEach((function(e,r){t.stopQueryNoBroadcast(r)})),this.fetchQueryRejectFns.forEach((function(t){t(new l.a(8))}))},t.prototype.mutate=function(t){var e=t.mutation,r=t.variables,o=t.optimisticResponse,s=t.updateQueries,a=t.refetchQueries,u=void 0===a?[]:a,c=t.awaitRefetchQueries,h=void 0!==c&&c,p=t.update,f=t.errorPolicy,d=void 0===f?"none":f,v=t.fetchPolicy,m=t.context,Q=void 0===m?{}:m;return Object(n.b)(this,void 0,void 0,(function(){var t,a,c,f=this;return Object(n.d)(this,(function(m){switch(m.label){case 0:return Object(l.b)(e,9),Object(l.b)(!v||"no-cache"===v,10),t=this.generateQueryId(),e=this.transform(e).document,this.setQuery(t,(function(){return{document:e}})),r=this.getVariables(e,r),this.transform(e).hasClientExports?[4,this.localState.addExportedVariables(e,r,Q)]:[3,2];case 1:r=m.sent(),m.label=2;case 2:return a=function(){var t={};return s&&f.queries.forEach((function(e,r){var o=e.observableQuery;if(o){var n=o.queryName;n&&R.call(s,n)&&(t[r]={updater:s[n],query:f.queryStore.get(r)})}})),t},this.mutationStore.initMutation(t,e,r),this.dataStore.markMutationInit({mutationId:t,document:e,variables:r,updateQueries:a(),update:p,optimisticResponse:o}),this.broadcastQueries(),c=this,[2,new Promise((function(s,l){var f,m;c.getObservableFromLink(e,Object(n.a)({},Q,{optimisticResponse:o}),r,!1).subscribe({next:function(o){Object(i.q)(o)&&"none"===d?m=new b({graphQLErrors:o.errors}):(c.mutationStore.markMutationResult(t),"no-cache"!==v&&c.dataStore.markMutationResult({mutationId:t,result:o,document:e,variables:r,updateQueries:a(),update:p}),f=o)},error:function(e){c.mutationStore.markMutationError(t,e),c.dataStore.markMutationComplete({mutationId:t,optimisticResponse:o}),c.broadcastQueries(),c.setQuery(t,(function(){return{document:null}})),l(new b({networkError:e}))},complete:function(){if(m&&c.mutationStore.markMutationError(t,m),c.dataStore.markMutationComplete({mutationId:t,optimisticResponse:o}),c.broadcastQueries(),m)l(m);else{"function"==typeof u&&(u=u(f));var e=[];y(u)&&u.forEach((function(t){if("string"==typeof t)c.queries.forEach((function(r){var o=r.observableQuery;o&&o.queryName===t&&e.push(o.refetch())}));else{var r={query:t.query,variables:t.variables,fetchPolicy:"network-only"};t.context&&(r.context=t.context),e.push(c.query(r))}})),Promise.all(h?e:[]).then((function(){c.setQuery(t,(function(){return{document:null}})),"ignore"===d&&f&&Object(i.q)(f)&&delete f.errors,s(f)}))}}})}))]}}))}))},t.prototype.fetchQuery=function(t,e,r,o){return Object(n.b)(this,void 0,void 0,(function(){var s,a,u,c,l,h,p,f,y,v,m,Q,g,O,w,S,q,k,R=this;return Object(n.d)(this,(function(j){switch(j.label){case 0:return s=e.metadata,a=void 0===s?null:s,u=e.fetchPolicy,c=void 0===u?"cache-first":u,l=e.context,h=void 0===l?{}:l,p=this.transform(e.query).document,f=this.getVariables(p,e.variables),this.transform(p).hasClientExports?[4,this.localState.addExportedVariables(p,f,h)]:[3,2];case 1:f=j.sent(),j.label=2;case 2:if(e=Object(n.a)({},e,{variables:f}),m=v="network-only"===c||"no-cache"===c,v||(Q=this.dataStore.getCache().diff({query:p,variables:f,returnPartialData:!0,optimistic:!1}),g=Q.complete,O=Q.result,m=!g||"cache-and-network"===c,y=O),w=m&&"cache-only"!==c&&"standby"!==c,Object(i.s)(["live"],p)&&(w=!0),S=this.idCounter++,q="no-cache"!==c?this.updateQueryWatch(t,p,e):void 0,this.setQuery(t,(function(){return{document:p,lastRequestId:S,invalidated:!0,cancel:q}})),this.invalidate(o),this.queryStore.initQuery({queryId:t,document:p,storePreviousVariables:w,variables:f,isPoll:r===d.poll,isRefetch:r===d.refetch,metadata:a,fetchMoreForQueryId:o}),this.broadcastQueries(),w){if(k=this.fetchRequest({requestId:S,queryId:t,document:p,options:e,fetchMoreForQueryId:o}).catch((function(e){throw e.hasOwnProperty("graphQLErrors")?e:(S>=R.getQuery(t).lastRequestId&&(R.queryStore.markQueryError(t,e,o),R.invalidate(t),R.invalidate(o),R.broadcastQueries()),new b({networkError:e}))})),"cache-and-network"!==c)return[2,k];k.catch((function(){}))}return this.queryStore.markQueryResultClient(t,!w),this.invalidate(t),this.invalidate(o),this.transform(p).hasForcedResolvers?[2,this.localState.runResolvers({document:p,remoteResult:{data:y},context:h,variables:f,onlyRunForcedResolvers:!0}).then((function(r){return R.markQueryResult(t,r,e,o),R.broadcastQueries(),r}))]:(this.broadcastQueries(),[2,{data:y}])}}))}))},t.prototype.markQueryResult=function(t,e,r,o){var n=r.fetchPolicy,i=r.variables,s=r.errorPolicy;"no-cache"===n?this.setQuery(t,(function(){return{newData:{result:e.data,complete:!0}}})):this.dataStore.markQueryResult(e,this.getQuery(t).document,i,o,"ignore"===s||"all"===s)},t.prototype.queryListenerForObserver=function(t,e,r){var o=this;function n(t,e){if(r[t])try{r[t](e)}catch(t){}}return function(r,i){if(o.invalidate(t,!1),r){var s=o.getQuery(t),a=s.observableQuery,u=s.document,c=a?a.options.fetchPolicy:e.fetchPolicy;if("standby"!==c){var l=p(r.networkStatus),h=a&&a.getLastResult(),f=!(!h||h.networkStatus===r.networkStatus),d=e.returnPartialData||!i&&r.previousVariables||f&&e.notifyOnNetworkStatusChange||"cache-only"===c||"cache-and-network"===c;if(!l||d){var v=y(r.graphQLErrors),m=a&&a.options.errorPolicy||e.errorPolicy||"none";if("none"===m&&v||r.networkError)return n("error",new b({graphQLErrors:r.graphQLErrors,networkError:r.networkError}));try{var Q=void 0,g=void 0;if(i)"no-cache"!==c&&"network-only"!==c&&o.setQuery(t,(function(){return{newData:null}})),Q=i.result,g=!i.complete;else{var O=a&&a.getLastError(),w="none"!==m&&(O&&O.graphQLErrors)!==r.graphQLErrors;if(h&&h.data&&!w)Q=h.data,g=!1;else{var S=o.dataStore.getCache().diff({query:u,variables:r.previousVariables||r.variables,returnPartialData:!0,optimistic:!0});Q=S.result,g=!S.complete}}var q=g&&!(e.returnPartialData||"cache-only"===c),k={data:q?h&&h.data:Q,loading:l,networkStatus:r.networkStatus,stale:q};"all"===m&&v&&(k.errors=r.graphQLErrors),n("next",k)}catch(t){n("error",new b({networkError:t}))}}}}}},t.prototype.transform=function(t){var e=this.transformCache;if(!e.has(t)){var r=this.dataStore.getCache(),o=r.transformDocument(t),n=Object(i.D)(r.transformForLink(o)),s=this.localState.clientQuery(o),a=this.localState.serverQuery(n),u={document:o,hasClientExports:Object(i.r)(o),hasForcedResolvers:this.localState.shouldForceResolvers(o),clientQuery:s,serverQuery:a,defaultVars:Object(i.h)(Object(i.m)(o))},c=function(t){t&&!e.has(t)&&e.set(t,u)};c(t),c(o),c(s),c(a)}return e.get(t)},t.prototype.getVariables=function(t,e){return Object(n.a)({},this.transform(t).defaultVars,e)},t.prototype.watchQuery=function(t,e){void 0===e&&(e=!0),Object(l.b)("standby"!==t.fetchPolicy,11),t.variables=this.getVariables(t.query,t.variables),void 0===t.notifyOnNetworkStatusChange&&(t.notifyOnNetworkStatusChange=!1);var r=Object(n.a)({},t);return new m({queryManager:this,options:r,shouldSubscribe:e})},t.prototype.query=function(t){var e=this;return Object(l.b)(t.query,12),Object(l.b)("Document"===t.query.kind,13),Object(l.b)(!t.returnPartialData,14),Object(l.b)(!t.pollInterval,15),new Promise((function(r,o){var n=e.watchQuery(t,!1);e.fetchQueryRejectFns.set("query:"+n.queryId,o),n.result().then(r,o).then((function(){return e.fetchQueryRejectFns.delete("query:"+n.queryId)}))}))},t.prototype.generateQueryId=function(){return String(this.idCounter++)},t.prototype.stopQueryInStore=function(t){this.stopQueryInStoreNoBroadcast(t),this.broadcastQueries()},t.prototype.stopQueryInStoreNoBroadcast=function(t){this.stopPollingQuery(t),this.queryStore.stopQuery(t),this.invalidate(t)},t.prototype.addQueryListener=function(t,e){this.setQuery(t,(function(t){return t.listeners.add(e),{invalidated:!1}}))},t.prototype.updateQueryWatch=function(t,e,r){var o=this,n=this.getQuery(t).cancel;n&&n();return this.dataStore.getCache().watch({query:e,variables:r.variables,optimistic:!0,previousResult:function(){var e=null,r=o.getQuery(t).observableQuery;if(r){var n=r.getLastResult();n&&(e=n.data)}return e},callback:function(e){o.setQuery(t,(function(){return{invalidated:!0,newData:e}}))}})},t.prototype.addObservableQuery=function(t,e){this.setQuery(t,(function(){return{observableQuery:e}}))},t.prototype.removeObservableQuery=function(t){var e=this.getQuery(t).cancel;this.setQuery(t,(function(){return{observableQuery:null}})),e&&e()},t.prototype.clearStore=function(){this.fetchQueryRejectFns.forEach((function(t){t(new l.a(16))}));var t=[];return this.queries.forEach((function(e,r){e.observableQuery&&t.push(r)})),this.queryStore.reset(t),this.mutationStore.reset(),this.dataStore.reset()},t.prototype.resetStore=function(){var t=this;return this.clearStore().then((function(){return t.reFetchObservableQueries()}))},t.prototype.reFetchObservableQueries=function(t){var e=this;void 0===t&&(t=!1);var r=[];return this.queries.forEach((function(o,n){var i=o.observableQuery;if(i){var s=i.options.fetchPolicy;i.resetLastResults(),"cache-only"===s||!t&&"standby"===s||r.push(i.refetch()),e.setQuery(n,(function(){return{newData:null}})),e.invalidate(n)}})),this.broadcastQueries(),Promise.all(r)},t.prototype.observeQuery=function(t,e,r){return this.addQueryListener(t,this.queryListenerForObserver(t,e,r)),this.fetchQuery(t,e)},t.prototype.startQuery=function(t,e,r){return this.addQueryListener(t,r),this.fetchQuery(t,e).catch((function(){})),t},t.prototype.startGraphQLSubscription=function(t){var e=this,r=t.query,o=t.fetchPolicy,n=t.variables;r=this.transform(r).document,n=this.getVariables(r,n);var s=function(t){return e.getObservableFromLink(r,{},t,!1).map((function(n){if(o&&"no-cache"===o||(e.dataStore.markSubscriptionResult(n,r,t),e.broadcastQueries()),Object(i.q)(n))throw new b({graphQLErrors:n.errors});return n}))};if(this.transform(r).hasClientExports){var a=this.localState.addExportedVariables(r,n).then(s);return new f((function(t){var e=null;return a.then((function(r){return e=r.subscribe(t)}),t.error),function(){return e&&e.unsubscribe()}}))}return s(n)},t.prototype.stopQuery=function(t){this.stopQueryNoBroadcast(t),this.broadcastQueries()},t.prototype.stopQueryNoBroadcast=function(t){this.stopQueryInStoreNoBroadcast(t),this.removeQuery(t)},t.prototype.removeQuery=function(t){this.fetchQueryRejectFns.delete("query:"+t),this.fetchQueryRejectFns.delete("fetchRequest:"+t),this.getQuery(t).subscriptions.forEach((function(t){return t.unsubscribe()})),this.queries.delete(t)},t.prototype.getCurrentQueryResult=function(t,e){void 0===e&&(e=!0);var r=t.options,o=r.variables,n=r.query,i=r.fetchPolicy,s=r.returnPartialData,a=t.getLastResult(),u=this.getQuery(t.queryId).newData;if(u&&u.complete)return{data:u.result,partial:!1};if("no-cache"===i||"network-only"===i)return{data:void 0,partial:!1};var c=this.dataStore.getCache().diff({query:n,variables:o,previousResult:a?a.data:void 0,returnPartialData:!0,optimistic:e}),l=c.result,h=c.complete;return{data:h||s?l:void 0,partial:!h}},t.prototype.getQueryWithPreviousResult=function(t){var e;if("string"==typeof t){var r=this.getQuery(t).observableQuery;Object(l.b)(r,17),e=r}else e=t;var o=e.options,n=o.variables,i=o.query;return{previousResult:this.getCurrentQueryResult(e,!1).data,variables:n,document:i}},t.prototype.broadcastQueries=function(){var t=this;this.onBroadcast(),this.queries.forEach((function(e,r){e.invalidated&&e.listeners.forEach((function(o){o&&o(t.queryStore.get(r),e.newData)}))}))},t.prototype.getLocalState=function(){return this.localState},t.prototype.getObservableFromLink=function(t,e,r,o){var s,a=this;void 0===o&&(o=this.queryDeduplication);var c=this.transform(t).serverQuery;if(c){var l=this.inFlightLinkObservables,h=this.link,p={query:c,variables:r,operationName:Object(i.n)(c)||void 0,context:this.prepareContext(Object(n.a)({},e,{forceFetch:!o}))};if(e=p.context,o){var y=l.get(c)||new Map;l.set(c,y);var d=JSON.stringify(r);if(!(s=y.get(d))){y.set(d,s=k(Object(u.c)(h,p)));var v=function(){y.delete(d),y.size||l.delete(c),b.unsubscribe()},b=s.subscribe({next:v,error:v,complete:v})}}else s=k(Object(u.c)(h,p))}else s=f.of({data:{}}),e=this.prepareContext(e);var m=this.transform(t).clientQuery;return m&&(s=function(t,e){return new f((function(r){var o=r.next,n=r.error,i=r.complete,s=0,a=!1,u={next:function(t){++s,new Promise((function(r){r(e(t))})).then((function(t){--s,o&&o.call(r,t),a&&u.complete()}),(function(t){--s,n&&n.call(r,t)}))},error:function(t){n&&n.call(r,t)},complete:function(){a=!0,s||i&&i.call(r)}},c=t.subscribe(u);return function(){return c.unsubscribe()}}))}(s,(function(t){return a.localState.runResolvers({document:m,remoteResult:t,context:e,variables:r})}))),s},t.prototype.fetchRequest=function(t){var e,r,n=this,i=t.requestId,s=t.queryId,a=t.document,u=t.options,c=t.fetchMoreForQueryId,l=u.variables,h=u.errorPolicy,p=void 0===h?"none":h,f=u.fetchPolicy;return new Promise((function(t,h){var d=n.getObservableFromLink(a,u.context,l),v="fetchRequest:"+s;n.fetchQueryRejectFns.set(v,h);var m=function(){n.fetchQueryRejectFns.delete(v),n.setQuery(s,(function(t){t.subscriptions.delete(Q)}))},Q=d.map((function(t){if(i>=n.getQuery(s).lastRequestId&&(n.markQueryResult(s,t,u,c),n.queryStore.markQueryResult(s,t,c),n.invalidate(s),n.invalidate(c),n.broadcastQueries()),"none"===p&&y(t.errors))return h(new b({graphQLErrors:t.errors}));if("all"===p&&(r=t.errors),c||"no-cache"===f)e=t.data;else{var o=n.dataStore.getCache().diff({variables:l,query:a,optimistic:!1,returnPartialData:!0}),d=o.result;(o.complete||u.returnPartialData)&&(e=d)}})).subscribe({error:function(t){m(),h(t)},complete:function(){m(),t({data:e,errors:r,loading:!1,networkStatus:o.ready,stale:!1})}});n.setQuery(s,(function(t){t.subscriptions.add(Q)}))}))},t.prototype.getQuery=function(t){return this.queries.get(t)||{listeners:new Set,invalidated:!1,document:null,newData:null,lastRequestId:1,observableQuery:null,subscriptions:new Set}},t.prototype.setQuery=function(t,e){var r=this.getQuery(t),o=Object(n.a)({},r,e(r));this.queries.set(t,o)},t.prototype.invalidate=function(t,e){void 0===e&&(e=!0),t&&this.setQuery(t,(function(){return{invalidated:e}}))},t.prototype.prepareContext=function(t){void 0===t&&(t={});var e=this.localState.prepareContext(t);return Object(n.a)({},e,{clientAwareness:this.clientAwareness})},t.prototype.checkInFlight=function(t){var e=this.queryStore.get(t);return e&&e.networkStatus!==o.ready&&e.networkStatus!==o.error},t.prototype.startPollingQuery=function(t,e,r){var o=this,i=t.pollInterval;if(Object(l.b)(i,18),!this.ssrMode){var s=this.pollingInfoByQueryId.get(e);s||this.pollingInfoByQueryId.set(e,s={}),s.interval=i,s.options=Object(n.a)({},t,{fetchPolicy:"network-only"});var a=function(){var t=o.pollingInfoByQueryId.get(e);t&&(o.checkInFlight(e)?u():o.fetchQuery(e,t.options,d.poll).then(u,u))},u=function(){var t=o.pollingInfoByQueryId.get(e);t&&(clearTimeout(t.timeout),t.timeout=setTimeout(a,t.interval))};r&&this.addQueryListener(e,r),u()}return e},t.prototype.stopPollingQuery=function(t){this.pollingInfoByQueryId.delete(t)},t}(),E=function(){function t(t){this.cache=t}return t.prototype.getCache=function(){return this.cache},t.prototype.markQueryResult=function(t,e,r,o,n){void 0===n&&(n=!1);var s=!Object(i.q)(t);n&&Object(i.q)(t)&&t.data&&(s=!0),!o&&s&&this.cache.write({result:t.data,dataId:"ROOT_QUERY",query:e,variables:r})},t.prototype.markSubscriptionResult=function(t,e,r){Object(i.q)(t)||this.cache.write({result:t.data,dataId:"ROOT_SUBSCRIPTION",query:e,variables:r})},t.prototype.markMutationInit=function(t){var e,r=this;t.optimisticResponse&&(e="function"==typeof t.optimisticResponse?t.optimisticResponse(t.variables):t.optimisticResponse,this.cache.recordOptimisticTransaction((function(o){var n=r.cache;r.cache=o;try{r.markMutationResult({mutationId:t.mutationId,result:{data:e},document:t.document,variables:t.variables,updateQueries:t.updateQueries,update:t.update})}finally{r.cache=n}}),t.mutationId))},t.prototype.markMutationResult=function(t){var e=this;if(!Object(i.q)(t.result)){var r=[{result:t.result.data,dataId:"ROOT_MUTATION",query:t.document,variables:t.variables}],o=t.updateQueries;o&&Object.keys(o).forEach((function(n){var s=o[n],a=s.query,u=s.updater,c=e.cache.diff({query:a.document,variables:a.variables,returnPartialData:!0,optimistic:!1}),l=c.result;if(c.complete){var h=Object(i.I)((function(){return u(l,{mutationResult:t.result,queryName:Object(i.n)(a.document)||void 0,queryVariables:a.variables})}));h&&r.push({result:h,dataId:"ROOT_QUERY",query:a.document,variables:a.variables})}})),this.cache.performTransaction((function(e){r.forEach((function(t){return e.write(t)}));var o=t.update;o&&Object(i.I)((function(){return o(e,t.result)}))}))}},t.prototype.markMutationComplete=function(t){var e=t.mutationId;t.optimisticResponse&&this.cache.removeOptimistic(e)},t.prototype.markUpdateQueryResult=function(t,e,r){this.cache.write({result:r,dataId:"ROOT_QUERY",variables:e,query:t})},t.prototype.reset=function(){return this.cache.reset()},t}(),I="2.6.4",M=function(){function t(t){var e=this;this.defaultOptions={},this.resetStoreCallbacks=[],this.clearStoreCallbacks=[];var r=t.cache,o=t.ssrMode,n=void 0!==o&&o,i=t.ssrForceFetchDelay,s=void 0===i?0:i,a=t.connectToDevTools,c=t.queryDeduplication,h=void 0===c||c,p=t.defaultOptions,f=t.assumeImmutableResults,y=void 0!==f&&f,d=t.resolvers,v=t.typeDefs,b=t.fragmentMatcher,m=t.name,Q=t.version,g=t.link;if(!g&&d&&(g=u.a.empty()),!g||!r)throw new l.a(1);this.link=g,this.cache=r,this.store=new E(r),this.disableNetworkFetches=n||s>0,this.queryDeduplication=h,this.defaultOptions=p||{},this.typeDefs=v,s&&setTimeout((function(){return e.disableNetworkFetches=!1}),s),this.watchQuery=this.watchQuery.bind(this),this.query=this.query.bind(this),this.mutate=this.mutate.bind(this),this.resetStore=this.resetStore.bind(this),this.reFetchObservableQueries=this.reFetchObservableQueries.bind(this);void 0!==a&&(a&&"undefined"!=typeof window)&&(window.__APOLLO_CLIENT__=this),this.version=I,this.localState=new q({cache:r,client:this,resolvers:d,fragmentMatcher:b}),this.queryManager=new j({link:this.link,store:this.store,queryDeduplication:h,ssrMode:n,clientAwareness:{name:m,version:Q},localState:this.localState,assumeImmutableResults:y,onBroadcast:function(){e.devToolsHookCb&&e.devToolsHookCb({action:{},state:{queries:e.queryManager.queryStore.getStore(),mutations:e.queryManager.mutationStore.getStore()},dataWithOptimisticResults:e.cache.extract(!0)})}})}return t.prototype.stop=function(){this.queryManager.stop()},t.prototype.watchQuery=function(t){return this.defaultOptions.watchQuery&&(t=Object(n.a)({},this.defaultOptions.watchQuery,t)),!this.disableNetworkFetches||"network-only"!==t.fetchPolicy&&"cache-and-network"!==t.fetchPolicy||(t=Object(n.a)({},t,{fetchPolicy:"cache-first"})),this.queryManager.watchQuery(t)},t.prototype.query=function(t){return this.defaultOptions.query&&(t=Object(n.a)({},this.defaultOptions.query,t)),Object(l.b)("cache-and-network"!==t.fetchPolicy,2),this.disableNetworkFetches&&"network-only"===t.fetchPolicy&&(t=Object(n.a)({},t,{fetchPolicy:"cache-first"})),this.queryManager.query(t)},t.prototype.mutate=function(t){return this.defaultOptions.mutate&&(t=Object(n.a)({},this.defaultOptions.mutate,t)),this.queryManager.mutate(t)},t.prototype.subscribe=function(t){return this.queryManager.startGraphQLSubscription(t)},t.prototype.readQuery=function(t,e){return void 0===e&&(e=!1),this.cache.readQuery(t,e)},t.prototype.readFragment=function(t,e){return void 0===e&&(e=!1),this.cache.readFragment(t,e)},t.prototype.writeQuery=function(t){var e=this.cache.writeQuery(t);return this.queryManager.broadcastQueries(),e},t.prototype.writeFragment=function(t){var e=this.cache.writeFragment(t);return this.queryManager.broadcastQueries(),e},t.prototype.writeData=function(t){var e=this.cache.writeData(t);return this.queryManager.broadcastQueries(),e},t.prototype.__actionHookForDevTools=function(t){this.devToolsHookCb=t},t.prototype.__requestRaw=function(t){return Object(u.c)(this.link,t)},t.prototype.initQueryManager=function(){return this.queryManager},t.prototype.resetStore=function(){var t=this;return Promise.resolve().then((function(){return t.queryManager.clearStore()})).then((function(){return Promise.all(t.resetStoreCallbacks.map((function(t){return t()})))})).then((function(){return t.reFetchObservableQueries()}))},t.prototype.clearStore=function(){var t=this;return Promise.resolve().then((function(){return t.queryManager.clearStore()})).then((function(){return Promise.all(t.clearStoreCallbacks.map((function(t){return t()})))}))},t.prototype.onResetStore=function(t){var e=this;return this.resetStoreCallbacks.push(t),function(){e.resetStoreCallbacks=e.resetStoreCallbacks.filter((function(e){return e!==t}))}},t.prototype.onClearStore=function(t){var e=this;return this.clearStoreCallbacks.push(t),function(){e.clearStoreCallbacks=e.clearStoreCallbacks.filter((function(e){return e!==t}))}},t.prototype.reFetchObservableQueries=function(t){return this.queryManager.reFetchObservableQueries(t)},t.prototype.extract=function(t){return this.cache.extract(t)},t.prototype.restore=function(t){return this.cache.restore(t)},t.prototype.addResolvers=function(t){this.localState.addResolvers(t)},t.prototype.setResolvers=function(t){this.localState.setResolvers(t)},t.prototype.getResolvers=function(){return this.localState.getResolvers()},t.prototype.setLocalStateFragmentMatcher=function(t){this.localState.setFragmentMatcher(t)},t}()}}]);
//# sourceMappingURL=npm.apollo-client.js.map