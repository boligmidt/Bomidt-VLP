(window.webpackJsonp=window.webpackJsonp||[]).push([[83],{1036:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return b}));var r=n(0),a=n.n(r),i=n(103),l=n(7),o=n(1),s=n.n(o),d=n(1010),u=n.n(d),c=n(699),p=n(944),m=n(613),g=n(71),f=n(652),v=n(945),$=l.d.div.withConfig({displayName:"AllAssessments__Wrapper",componentId:"sc-1gbsnmc-0"})(["margin:0 10px;.fullheight{width:100%;height:270mm;page-break-after:always;font-family:sans-serif;border:1px solid black;}h1{margin:10px 0 20px;text-align:center;font-weight:900;}h2{margin:10px 0 20px;text-align:center;font-weight:900;}h3{margin:10px 0 40px;text-align:center;font-weight:900;}table{border-collapse:collapse;width:100%;margin-bottom:40px;}table td{padding:8px 10px;font-size:12px;border:1px solid black;}table td .content{font-size:14px;}.label-cell,table tr td:first-of-type{width:15%;font-weight:bold;border-left:none;}table tr td:last-of-type{border-right:none;}table tr:last-of-type td{border-bottom:none;}thead tr td{font-weight:900;}img{display:block;max-width:80%;max-height:450px;margin:0 auto;}.info-table tr td:nth-of-type(3),.info-table tr td:first-of-type{width:15%;}.info-table tr td:nth-of-type(2),.info-table tr td:last-of-type{width:35%;}.state-level-indicator{width:30px;height:20px;display:inline-block;vertical-align:bottom;margin-right:10px;-webkit-print-color-adjust:exact;}.state-level-indicator.tgiu{background:#4e67ab;}.state-level-indicator.tg0{background:#8bc34a;}.state-level-indicator.tg1{background:#8bc34a;}.state-level-indicator.tg2{background:#e8a72e;}.state-level-indicator.tg3{background:#db2424;}"]);function b(t){var e=t.history,n=Object(g.b)(),r=n.currentHousingCooperative,l=n.search,o=n.address,d=Object(i.c)(c.d,{variables:{stateLevel:["tgiu","tg0","tg1","tg2","tg3"],housingCooperativeId:r||"",orderBy:"groupOrder",search:l,address:o}}),b=d.loading,h=d.error,E=d.data,y=Object(i.c)(p.b,{variables:{housingCooperativeId:r,name:"generell-informasjon"}}),k=y.loading,I=y.data,S=(I=void 0===I?{}:I).generalInfo,C=void 0===S?null:S,A=I.housingCooperative,T=void 0===A?null:A,w=Object(i.c)(m.c,{variables:{housingCooperativeId:r,page:"generell-informasjon-images"}}),D=w.data,_=(D=void 0===D?{}:D).files,x=void 0===_?null:_,N=w.loading;if(b||k||N||h||!E)return a.a.createElement("p",null,"Laster...");var j="";x&&x.items&&x.items.length&&(j=x.items.filter((function(t){return t.fileType&&t.fileType.includes("image")}))[0].fileUrl);var O=E.assessmentGroups;return a.a.createElement(u.a,{onLoaded:function(){window.onafterprint=function(){return e.goBack()},window.print()}},a.a.createElement($,null,C?a.a.createElement("div",{className:"fullheight"},a.a.createElement("div",null,a.a.createElement("h1",null,"Tilstandsvurderinger"),a.a.createElement("h2",null,C.housingcooperative||T.title)),a.a.createElement("table",null,a.a.createElement("tbody",null,j&&a.a.createElement("tr",null,a.a.createElement("td",{colSpan:"4"},a.a.createElement("img",{src:j}))),a.a.createElement("tr",null,a.a.createElement("td",null,a.a.createElement("strong",null,"Adresse")),a.a.createElement("td",null,C.address),a.a.createElement("td",null,a.a.createElement("strong",null,"Byggematerialer")),a.a.createElement("td",null,C.buildMaterials)),a.a.createElement("tr",null,a.a.createElement("td",null,a.a.createElement("strong",null,"Postnr og sted")),a.a.createElement("td",null,C.zipCode),a.a.createElement("td",null,a.a.createElement("strong",null,"Tomteareal m2")),a.a.createElement("td",null,C.plotSize)),a.a.createElement("tr",null,a.a.createElement("td",null,a.a.createElement("strong",null,"Gårdsnr")),a.a.createElement("td",null,C.plotNumberOne),a.a.createElement("td",null,a.a.createElement("strong",null,"Bruttoareal m2")),a.a.createElement("td",null,C.plotSizeBTA)),a.a.createElement("tr",null,a.a.createElement("td",null,a.a.createElement("strong",null,"Bruksnr")),a.a.createElement("td",null,C.plotNumberTwo),a.a.createElement("td",null,a.a.createElement("strong",null,"Antall bygninger")),a.a.createElement("td",null,C.units)),a.a.createElement("tr",null,a.a.createElement("td",null,a.a.createElement("strong",null,"Byggeår")),a.a.createElement("td",null,C.buildYear),a.a.createElement("td",null,a.a.createElement("strong",null,"Antall leilighter")),a.a.createElement("td",null,C.apartmentUnits)),a.a.createElement("tr",null,a.a.createElement("td",null,a.a.createElement("strong",null,"Befaringsdato")),a.a.createElement("td",null,C.inspectionDate),a.a.createElement("td",null,a.a.createElement("strong",null,"Polisenr")),a.a.createElement("td",null,C.policyId)),a.a.createElement("tr",null,a.a.createElement("td",{valign:"top"},a.a.createElement("strong",null,"Hovedkonklusjon")),a.a.createElement("td",{colSpan:"3",style:{whiteSpace:"pre-line"}},C.conclusionContent||v.a)),a.a.createElement("tr",null,a.a.createElement("td",{colSpan:"4"}," "))))):null,O&&O.length?O.map((function(t,e){return t.subGroups&&t.subGroups.map((function(t,e){return t.items&&t.items.map((function(e){var n=f.d.find((function(t){return t.value===e.stateLevel})),r="";return e.files&&e.files.length&&(e.files.filter((function(t){return t.fileType&&t.fileType.includes("image")})),r=e.files[0].fileUrl,e.primaryImageId&&e.files.forEach((function(t){t._id===e.primaryImageId&&(r=t.fileUrl)}))),a.a.createElement("div",{key:e._id,className:"fullheight"},t.isSeparated&&a.a.createElement("h2",null,t.title),a.a.createElement("h3",null,"".concat(e.addressName," - ").concat(e.name)),a.a.createElement("table",null,a.a.createElement("tbody",null,a.a.createElement("tr",null,a.a.createElement("td",null,"Tilstandsbeskrivelse"),a.a.createElement("td",{colSpan:"3"},e.description)),a.a.createElement("tr",null,a.a.createElement("td",null,"Tiltak"),a.a.createElement("td",{colSpan:"3"},e.measure)),a.a.createElement("tr",null,a.a.createElement("td",null,"Levetider"),a.a.createElement("td",{colSpan:"3"},e.lifespan&&e.lifespan.join(", "))),a.a.createElement("tr",null,a.a.createElement("td",null,"Adresse"),a.a.createElement("td",{colSpan:"3"},e.addressName)),a.a.createElement("tr",null,a.a.createElement("td",null,a.a.createElement("strong",null,"Tilstandsgrad")),a.a.createElement("td",null,a.a.createElement("span",{className:"state-level-indicator ".concat(n.value)}),n.label),a.a.createElement("td",{className:"label-cell"},a.a.createElement("strong",null,"Kostnad inkl. mva")),a.a.createElement("td",null,isNaN(e.cost)?" ":e.cost)),a.a.createElement("tr",null,a.a.createElement("td",null,a.a.createElement("strong",null,"Mengde, Enhet")),a.a.createElement("td",null,e.unitAmount),a.a.createElement("td",{className:"label-cell"},a.a.createElement("strong",null,"Dimensjoner")),a.a.createElement("td",null,e.dimensions)),a.a.createElement("tr",null,a.a.createElement("td",null,"Opprettet"),a.a.createElement("td",null,s()(e.createdAt).format("YYYY/MM/DD")),a.a.createElement("td",{className:"label-cell"},a.a.createElement("strong",null,"Frist")),a.a.createElement("td",null,e.dueDate&&s()(e.dueDate).format("YYYY/MM"))),a.a.createElement("tr",null,a.a.createElement("td",null,a.a.createElement("strong",null,"Produksjonsår")),a.a.createElement("td",null,e.productionYear),a.a.createElement("td",null,a.a.createElement("strong",null,"Sist vedlikeholdt")),a.a.createElement("td",null,e.lastMaintained)),a.a.createElement("tr",null,a.a.createElement("td",null,a.a.createElement("strong",null,"Ferdigstilt")),a.a.createElement("td",{colSpan:"3"},e.isCompleted?s()(e.completedAt).format("YYYY/MM/DD"):"Ikke ferdigstilt")),a.a.createElement("tr",null,a.a.createElement("td",{colSpan:"4"},r?a.a.createElement("img",{src:r}):" ")))))}))}))})):null))}},613:function(t,e,n){"use strict";n.d(e,"c",(function(){return p})),n.d(e,"a",(function(){return m})),n.d(e,"e",(function(){return g})),n.d(e,"d",(function(){return f})),n.d(e,"b",(function(){return v}));var r=n(23),a=n.n(r),i=n(141),l=n.n(i);function o(){var t=a()(["\n\tmutation deleteFile($_id: ID!) {\n\t\tdeleteOneFile(_id: $_id)\n\t}\n"]);return o=function(){return t},t}function s(){var t=a()(["\n\tmutation getUploadUrl($key: String!, $fileContentType: String!) {\n\t\tuploadUrl: getUploadUrl(key: $key, fileContentType: $fileContentType)\n\t}\n"]);return s=function(){return t},t}function d(){var t=a()(["\n\tmutation updateOneFile($_id: ID!, $isDeleted: Boolean, $fileName: String) {\n\t\tupdateOneFile(_id: $_id, isDeleted: $isDeleted, fileName: $fileName) {\n\t\t\t_id\n\t\t}\n\t}\n"]);return d=function(){return t},t}function u(){var t=a()(["\n\tmutation uploadOneFile(\n\t\t$fileType: String\n\t\t$fileName: String\n\t\t$fileUrl: String\n\t\t$docId: ID\n\t\t$page: String\n\t\t$housingCooperativeId: ID\n\t) {\n\t\tfile: insertOneFile(\n\t\t\tfileType: $fileType\n\t\t\tfileName: $fileName\n\t\t\tfileUrl: $fileUrl\n\t\t\tdocId: $docId\n\t\t\tpage: $page\n\t\t\thousingCooperativeId: $housingCooperativeId\n\t\t) {\n\t\t\t_id\n\t\t\tfileType\n\t\t\tfileName\n\t\t\tfileUrl\n\t\t\tdocId\n\t\t\tpage\n\t\t\thousingCooperativeId\n\t\t\tcreatedAt\n\t\t}\n\t}\n"]);return u=function(){return t},t}function c(){var t=a()(["\n\tquery findFiles($housingCooperativeId: ID, $docId: ID, $page: String) {\n\t\tfiles: findFiles(\n\t\t\thousingCooperativeId: $housingCooperativeId\n\t\t\tdocId: $docId\n\t\t\tpage: $page\n\t\t) {\n\t\t\titems {\n\t\t\t\t_id\n\t\t\t\tdocId\n\t\t\t\tfileType\n\t\t\t\tfileName\n\t\t\t\tfileUrl\n\t\t\t\tpage\n\t\t\t\thousingCooperativeId\n\t\t\t\tcreatedAt\n\t\t\t}\n\t\t\tcount\n\t\t}\n\t}\n"]);return c=function(){return t},t}var p=l()(c()),m=l()(u()),g=l()(d()),f=l()(s()),v=l()(o())},652:function(t,e,n){"use strict";n.d(e,"c",(function(){return f})),n.d(e,"d",(function(){return v})),n.d(e,"b",(function(){return b})),n.d(e,"a",(function(){return y}));var r=n(20),a=n.n(r),i=n(15),l=n.n(i),o=n(0),s=n.n(o),d=n(7),u=n(140),c=n(735),p=d.d.div.withConfig({displayName:"StateLevels__StateLevelWrap",componentId:"sc-1iaj3l6-0"})(["display:flex;flex-wrap:wrap;margin-bottom:40px;"]),m=d.d.div.withConfig({displayName:"StateLevels__CheckBoxWrap",componentId:"sc-1iaj3l6-1"})(["display:flex;margin:0 10px 13px 0;"]),g=d.d.div.withConfig({displayName:"StateLevels__LabelWrap",componentId:"sc-1iaj3l6-2"})(["font-weight:bold;margin-right:6px;"]);function f(t){var e=t.active,n=t.handleFilterClick;return s.a.createElement(p,null,v.map((function(t){return s.a.createElement(m,{key:t.value,onClick:function(e){return n(t.value)}},s.a.createElement(c.a,{checked:-1!==e.indexOf(t.value),color:t.color}),s.a.createElement(g,null,t.label),s.a.createElement("span",null,t.desc))})))}var v=[{value:"tgiu",label:"TGiU",desc:"Ikke undersøkt",color:u.a.colors.blue},{value:"tg0",label:"TG0",desc:"Ingen symptomer (under 5 år)",color:u.a.colors.green},{value:"tg1",label:"TG1",desc:"Svake symptomer",color:u.a.colors.green},{value:"tg2",desc:"Middels kraftige symptomer",label:"TG2",color:u.a.colors.orange},{value:"tg3",label:"TG3",desc:"Kraftige symptomer",color:u.a.colors.red}],$=d.d.div.withConfig({displayName:"StateLevels__Tag",componentId:"sc-1iaj3l6-3"})(["background-color:",";width:44px;height:20px;border-radius:50px;color:white;text-align:center;font-size:13px;font-weight:700;letter-spacing:0.13px;text-transform:uppercase;line-height:1.7;"],(function(t){return t.color}));function b(t){var e=t.stateLevel,n={};return v.forEach((function(t){t.value===e&&(n=t)})),s.a.createElement($,{color:n.color},n.label)}var h=d.d.div.withConfig({displayName:"StateLevels__TagsWrap",componentId:"sc-1iaj3l6-4"})(["display:flex;justify-content:space-between;pointer-events:",";"],(function(t){return t.disabled?"none":"initial"})),E=Object(d.d)($).withConfig({displayName:"StateLevels__ExtendedTag",componentId:"sc-1iaj3l6-5"})(["background-color:",";transition:background-color 0.2s;width:57px;height:26px;line-height:26px;cursor:pointer;&:hover{background-color:",";}"],(function(t){return t.active?t.color:t.theme.colors.darkGray}),(function(t){return t.color}));function y(t){var e=t.onSelect,n=t.defaultValue,r=t.disabled,i=void 0===r?null:r,d=Object(o.useState)(n),u=l()(d,2),c=u[0],p=u[1];return s.a.createElement(h,{disabled:i},v.map((function(t){return s.a.createElement(E,a()({key:t.value,active:c===t.value,onClick:function(n){if(i)return null;p(t.value),e(t.value)}},t),t.label)})),s.a.createElement("input",{type:"hidden",name:"stateLevel",value:c}))}},699:function(t,e,n){"use strict";n.d(e,"a",(function(){return g})),n.d(e,"d",(function(){return f})),n.d(e,"c",(function(){return v})),n.d(e,"f",(function(){return $})),n.d(e,"b",(function(){return b})),n.d(e,"e",(function(){return h}));var r=n(23),a=n.n(r),i=n(141),l=n.n(i);function o(){var t=a()(["\n\tmutation massEditAssessmentCreatedAt($ids: [ID]!, $createdAt: DateTime!) {\n\t\tmassEditAssessmentCreatedAt(ids: $ids, createdAt: $createdAt)\n\t}\n"]);return o=function(){return t},t}function s(){var t=a()(["\n\tmutation deleteOneAssessment($_id: ID!) {\n\t\tdeleteOneAssessment(_id: $_id)\n\t}\n"]);return s=function(){return t},t}function d(){var t=a()(["\n\tmutation updateOneAssessment(\n\t\t$_id: ID!\n\t\t$name: String\n\t\t$objectType: String\n\t\t$lifespan: [String]\n\t\t$stateLevel: String\n\t\t$description: String\n\t\t$measure: String\n\t\t$address: ID\n\t\t$cost: String\n\t\t$productionYear: String\n\t\t$lastMaintained: String\n\t\t$unitAmount: String\n\t\t$createdAt: DateTime\n\t\t$dimensions: String\n\t\t$dueDate: DateTime\n\t\t$isActive: Boolean\n\t\t$isCompleted: Boolean\n\t\t$primaryImageId: ID\n\t) {\n\t\tupdateOneAssessment(\n\t\t\t_id: $_id\n\t\t\tname: $name\n\t\t\tobjectType: $objectType\n\t\t\tlifespan: $lifespan\n\t\t\tstateLevel: $stateLevel\n\t\t\tdescription: $description\n\t\t\tmeasure: $measure\n\t\t\taddress: $address\n\t\t\tcost: $cost\n\t\t\tcreatedAt: $createdAt\n\t\t\tproductionYear: $productionYear\n\t\t\tlastMaintained: $lastMaintained\n\t\t\tunitAmount: $unitAmount\n\t\t\tdimensions: $dimensions\n\t\t\tdueDate: $dueDate\n\t\t\tisActive: $isActive\n\t\t\tisCompleted: $isCompleted\n\t\t\tprimaryImageId: $primaryImageId\n\t\t) {\n\t\t\t_id\n\t\t}\n\t}\n"]);return d=function(){return t},t}function u(){var t=a()(["\n\tmutation addAssessment(\n\t\t$housingCooperativeId: ID!\n\t\t$name: String\n\t\t$objectType: String\n\t\t$lifespan: [String]\n\t\t$stateLevel: String\n\t\t$description: String\n\t\t$measure: String\n\t\t$address: ID\n\t\t$cost: String\n\t\t$productionYear: String\n\t\t$lastMaintained: String\n\t\t$unitAmount: String\n\t\t$dimensions: String\n\t\t$groupKey: Int\n\t\t$groupOrder: Int\n\t\t$category: String\n\t\t$dueDate: DateTime\n\t) {\n\t\tinsertOneAssessment(\n\t\t\thousingCooperativeId: $housingCooperativeId\n\t\t\tname: $name\n\t\t\tobjectType: $objectType\n\t\t\tlifespan: $lifespan\n\t\t\tstateLevel: $stateLevel\n\t\t\tdescription: $description\n\t\t\tmeasure: $measure\n\t\t\taddress: $address\n\t\t\tcost: $cost\n\t\t\tproductionYear: $productionYear\n\t\t\tlastMaintained: $lastMaintained\n\t\t\tunitAmount: $unitAmount\n\t\t\tdimensions: $dimensions\n\t\t\tgroupKey: $groupKey\n\t\t\tgroupOrder: $groupOrder\n\t\t\tcategory: $category\n\t\t\tdueDate: $dueDate\n\t\t) {\n\t\t\t_id\n\t\t\thousingCooperativeId\n\t\t\tname\n\t\t\tobjectType\n\t\t\tlifespan\n\t\t\tstateLevel\n\t\t\tdescription\n\t\t\tmeasure\n\t\t\taddress\n\t\t\tcost\n\t\t\tproductionYear\n\t\t\tlastMaintained\n\t\t\tunitAmount\n\t\t\tdimensions\n\t\t\tgroupKey\n\t\t\tgroupOrder\n\t\t\tcategory\n\t\t\tdueDate\n\t\t\tisActive\n\t\t\tcategoryId\n\t\t}\n\t}\n"]);return u=function(){return t},t}function c(){var t=a()(["\n\tquery getAssessment($_id: ID!, $categoryId: ID) {\n\t\tassessment: findOneAssessment(_id: $_id) {\n\t\t\t_id\n\t\t\thousingCooperativeId\n\t\t\tname\n\t\t\tdescription\n\t\t\taddress\n\t\t\taddressName\n\t\t\tstateLevel\n\t\t\tcategory\n\t\t\tobjectType\n\t\t\tlifespan\n\t\t\tmeasure\n\t\t\tcost\n\t\t\tproductionYear\n\t\t\tdimensions\n\t\t\tunitAmount\n\t\t\tgroupKey\n\t\t\tgroupOrder\n\t\t\tcreatedAt\n\t\t\tdueDate\n\t\t\tisActive\n\t\t\tcategoryId\n\t\t\tprimaryImageId\n\t\t\tlastMaintained\n\t\t\tisCompleted\n\t\t\tmodifiedAt\n\t\t}\n\t\tcategory: findOneCategory(_id: $categoryId) {\n\t\t\t_id\n\t\t\tlifeSpans {\n\t\t\t\tname\n\t\t\t}\n\t\t}\n\t\tfiles: findFiles(docId: $_id) {\n\t\t\titems {\n\t\t\t\t_id\n\t\t\t\tfileName\n\t\t\t\tfileUrl\n\t\t\t\tfileType\n\t\t\t}\n\t\t\tcount\n\t\t}\n\t}\n"]);return c=function(){return t},t}function p(){var t=a()(["\n\tquery getAssessments(\n\t\t$housingCooperativeId: ID!\n\t\t$stateLevel: [String]\n\t\t$isActive: Boolean\n\t\t$isCompleted: Boolean\n\t\t$search: String\n\t\t$address: ID\n\t\t$orderBy: String\n\t\t$year: Int\n\t) {\n\t\tassessmentGroups: findGroupedAssessments(\n\t\t\thousingCooperativeId: $housingCooperativeId\n\t\t\tstateLevel: $stateLevel\n\t\t\tisActive: $isActive\n\t\t\tisCompleted: $isCompleted\n\t\t\tsearch: $search\n\t\t\taddress: $address\n\t\t\torderBy: $orderBy\n\t\t\tyear: $year\n\t\t) {\n\t\t\ttitle\n\t\t\tsubGroups {\n\t\t\t\ttitle\n\t\t\t\tisSeparated\n\t\t\t\titems {\n\t\t\t\t\t_id\n\t\t\t\t\tindex\n\t\t\t\t\thousingCooperativeId\n\t\t\t\t\tname\n\t\t\t\t\tstateLevel\n\t\t\t\t\tcost\n\t\t\t\t\tunitAmount\n\t\t\t\t\tcreatedAt\n\t\t\t\t\tdueDate\n\t\t\t\t\tisActive\n\t\t\t\t\tprimaryImageId\n\t\t\t\t\tcategoryId\n\t\t\t\t\tdescription\n\t\t\t\t\tmeasure\n\t\t\t\t\tlifespan\n\t\t\t\t\taddress\n\t\t\t\t\taddressName\n\t\t\t\t\tdimensions\n\t\t\t\t\tisCompleted\n\t\t\t\t\tcompletedAt\n\t\t\t\t\tmodifiedAt\n\t\t\t\t\tproductionYear\n\t\t\t\t\tisFreshDuplicate\n\t\t\t\t\tlastMaintained\n\t\t\t\t\tfiles {\n\t\t\t\t\t\t_id\n\t\t\t\t\t\tfileName\n\t\t\t\t\t\tfileUrl\n\t\t\t\t\t\tfileType\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"]);return p=function(){return t},t}function m(){var t=a()(["\n\tmutation addAssessments($assessments: [AssessmentInput]) {\n\t\tinsertAssessments(assessments: $assessments)\n\t}\n"]);return m=function(){return t},t}var g=l()(m()),f=l()(p()),v=l()(c()),$=(l()(u()),l()(d())),b=l()(s()),h=l()(o())},735:function(t,e,n){"use strict";var r=n(0),a=n.n(r),i=n(7),l=n(20),o=n.n(l),s=n(46),d=n.n(s),u=function(t){t.styles;var e=d()(t,["styles"]);return a.a.createElement("svg",o()({fill:"#fff",viewBox:"0 0 17.038 11.75",xmlns:"http://www.w3.org/2000/svg"},e),a.a.createElement("path",{d:"M6.756 11.75L0 4.994l1.371-1.371L6.756 8.91 15.667 0l1.371 1.371z"}))};n.d(e,"a",(function(){return p}));var c=i.d.div.withConfig({displayName:"CheckBox__Wrapper",componentId:"nsl7wg-0"})(["background-color:",";background-size:16px auto;background-repeat:no-repeat;background-position:50%;border:2px solid ",";cursor:pointer;margin-right:8px;height:24px;width:24px;"],(function(t){return t.checked?t.color:"transparent"}),(function(t){return t.checked?t.color:t.theme.colors.lightGray}));function p(t){var e=t.checked,n=t.color;return a.a.createElement(c,{checked:e,color:n},e&&a.a.createElement(u,null))}},944:function(t,e,n){"use strict";n.d(e,"b",(function(){return u})),n.d(e,"a",(function(){return c})),n.d(e,"c",(function(){return p}));var r=n(23),a=n.n(r),i=n(141),l=n.n(i);function o(){var t=a()(["\n\tmutation updateGeneralInformation(\n\t\t$_id: ID!\n\t\t$housingCooperativeId: ID!\n\t\t$housingcooperative: String\n\t\t$name: String!\n\t\t$policyId: String\n\t\t$units: String\n\t\t$plotNumberOne: String\n\t\t$plotNumberTwo: String\n\t\t$address: String\n\t\t$zipCode: String\n\t\t$buildYear: String\n\t\t$buildMaterials: String\n\t\t$conclusionContent: String\n\t\t$generalContent: String\n\t\t$costContent: String\n\t\t$plotSize: String\n\t\t$plotSizeBTA: String\n\t\t$apartmentUnits: String\n\t\t$inspectionDate: String\n\t\t$responsible: String\n\t) {\n\t\tupdateGeneralInfo(\n\t\t\t_id: $_id\n\t\t\thousingCooperativeId: $housingCooperativeId\n\t\t\thousingcooperative: $housingcooperative\n\t\t\tname: $name\n\t\t\tpolicyId: $policyId\n\t\t\tunits: $units\n\t\t\tplotNumberOne: $plotNumberOne\n\t\t\tplotNumberTwo: $plotNumberTwo\n\t\t\taddress: $address\n\t\t\tzipCode: $zipCode\n\t\t\tbuildYear: $buildYear\n\t\t\tbuildMaterials: $buildMaterials\n\t\t\tconclusionContent: $conclusionContent\n\t\t\tgeneralContent: $generalContent\n\t\t\tcostContent: $costContent\n\t\t\tplotSize: $plotSize\n\t\t\tplotSizeBTA: $plotSizeBTA\n\t\t\tapartmentUnits: $apartmentUnits\n\t\t\tinspectionDate: $inspectionDate\n\t\t\tresponsible: $responsible\n\t\t) {\n\t\t\t_id\n\t\t\thousingCooperativeId\n\t\t\thousingcooperative\n\t\t\tname\n\t\t\tpolicyId\n\t\t\tunits\n\t\t\tplotNumberOne\n\t\t\tplotNumberTwo\n\t\t\taddress\n\t\t\tzipCode\n\t\t\tbuildYear\n\t\t\tbuildMaterials\n\t\t\tconclusionContent\n\t\t\tgeneralContent\n\t\t\tcostContent\n\t\t\tplotSize\n\t\t\tplotSizeBTA\n\t\t\tapartmentUnits\n\t\t\tinspectionDate\n\t\t\tresponsible\n\t\t}\n\t}\n"]);return o=function(){return t},t}function s(){var t=a()(["\n\tmutation insertGeneralInformation(\n\t\t$housingCooperativeId: ID!\n\t\t$housingcooperative: String\n\t\t$name: String!\n\t\t$policyId: String\n\t\t$units: String\n\t\t$plotNumberOne: String\n\t\t$plotNumberTwo: String\n\t\t$address: String\n\t\t$zipCode: String\n\t\t$buildYear: String\n\t\t$buildMaterials: String\n\t\t$conclusionContent: String\n\t\t$generalContent: String\n\t\t$costContent: String\n\t\t$plotSize: String\n\t\t$plotSizeBTA: String\n\t\t$apartmentUnits: String\n\t\t$inspectionDate: String\n\t\t$responsible: String\n\t) {\n\t\tgeneralInfo: insertGeneralInfo(\n\t\t\thousingCooperativeId: $housingCooperativeId\n\t\t\thousingcooperative: $housingcooperative\n\t\t\tname: $name\n\t\t\tpolicyId: $policyId\n\t\t\tunits: $units\n\t\t\tplotNumberOne: $plotNumberOne\n\t\t\tplotNumberTwo: $plotNumberTwo\n\t\t\taddress: $address\n\t\t\tzipCode: $zipCode\n\t\t\tbuildYear: $buildYear\n\t\t\tbuildMaterials: $buildMaterials\n\t\t\tconclusionContent: $conclusionContent\n\t\t\tgeneralContent: $generalContent\n\t\t\tcostContent: $costContent\n\t\t\tplotSize: $plotSize\n\t\t\tplotSizeBTA: $plotSizeBTA\n\t\t\tapartmentUnits: $apartmentUnits\n\t\t\tinspectionDate: $inspectionDate\n\t\t\tresponsible: $responsible\n\t\t) {\n\t\t\t_id\n\t\t\thousingCooperativeId\n\t\t\thousingcooperative\n\t\t\tname\n\t\t\tpolicyId\n\t\t\tunits\n\t\t\tplotNumberOne\n\t\t\tplotNumberTwo\n\t\t\taddress\n\t\t\tzipCode\n\t\t\tbuildYear\n\t\t\tbuildMaterials\n\t\t\tconclusionContent\n\t\t\tgeneralContent\n\t\t\tcostContent\n\t\t\tplotSize\n\t\t\tplotSizeBTA\n\t\t\tapartmentUnits\n\t\t\tinspectionDate\n\t\t\tresponsible\n\t\t}\n\t}\n"]);return s=function(){return t},t}function d(){var t=a()(["\n\tquery findGeneralInfo(\n\t\t$housingCooperativeId: ID!\n\t\t$_id: ID\n\t\t$policyId: String\n\t\t$name: String!\n\t) {\n\t\tgeneralInfo: findGeneralInfo(\n\t\t\thousingCooperativeId: $housingCooperativeId\n\t\t\t_id: $_id\n\t\t\tpolicyId: $policyId\n\t\t\tname: $name\n\t\t) {\n\t\t\t_id\n\t\t\thousingCooperativeId\n\t\t\thousingcooperative\n\t\t\tname\n\t\t\tpolicyId\n\t\t\tunits\n\t\t\tplotNumberOne\n\t\t\tplotNumberTwo\n\t\t\taddress\n\t\t\tzipCode\n\t\t\tbuildYear\n\t\t\tbuildMaterials\n\t\t\tconclusionContent\n\t\t\tgeneralContent\n\t\t\tcostContent\n\t\t\tplotSize\n\t\t\tplotSizeBTA\n\t\t\tapartmentUnits\n\t\t\tinspectionDate\n\t\t\tresponsible\n\t\t}\n\t\thousingCooperative: findOneHousingCooperative(\n\t\t\t_id: $housingCooperativeId\n\t\t) {\n\t\t\t_id\n\t\t\ttitle\n\t\t}\n\t}\n"]);return d=function(){return t},t}var u=l()(d()),c=l()(s()),p=l()(o())},945:function(t,e,n){"use strict";n.d(e,"a",(function(){return r})),n.d(e,"c",(function(){return a})),n.d(e,"b",(function(){return i}));var r="Boligselskapets bygninger og uteområder er i normalt god tilstand i forhold til bygningsalderen (byggeår). Boligselskapet fremstår med god orden og med et aktivt styre som har fokus på godt bomiljø. \n\nVær, vind og alder gjør allikevel at enkelte elementer slites ned. Riktig og jevnlig vedlikehold er viktig slik at levealderen på bygningselementene blir så lang som mulig. I tillegg er det viktig at gjennomføringen av vedlikeholdsoppgaver gjøres på en god og riktig måte slik at denne ikke er med på å forringe bygget.",a="<p>Formålet med vedlikeholdsplan er å få en generell oversikt over tilstand og aktuelle tiltak. Planen danner grunnlag for videre detaljert planlegging og gjennomføring av bolig- og miljøforbedrende tiltak. Vedlikeholdsplanen er til hjelp for å velge hvilke oppgaver som bør prioriteres for at nedbryting-prosessen bremses.</p><p>Vedlikeholdsplan omhandler de forhold som normalt må vurderes før det tas beslutninger om hvilke tiltak som skal gjennomføres. Den er derfor et hjelpemiddel for boligselskapet til å treffe de overordnede beslutninger om vedlikehold og utbedringer.</p><p>Vedlikeholdsplan gir en oversikt over hvilke vedlikeholdsoppgaver som forventes i boligselskapet 10 år fram i tid.</p><p>Innholdet i vedlikeholdsplan er kommet fram på grunnlag av tilgjengelig skriftlig informasjon (tegninger, beskrivelser etc), opplysninger fra boligselskapets representanter og en befaring med konkret tilstandsvurdering.</p><p>Tilstandsvurderingen skal utføres med utgangspunkt i NS3424:2012 «Tilstandsanalyse av byggverk». Referansenivået for analysen er de lovbestemte kravene som gjaldt det året bygget ble oppført.</p><p>Tilstandsvurderingen skal utføres på minimum analysenivå 1. Når symptomer eller formål tilsier det, skal det utføres grundigere undersøkelser på analysenivå 2.</p><p><strong>Om boligselskapet avsetter midler til vedlikehold gjennom felleskostnadene over lang tid, unngår styret å måtte foreta store låneopptak og dermed store økninger i felleskostnadene.</strong></p>",i="<p>Aktuelle vedlikeholds- og utbedringsarbeider er fordelt over en periode på 10 år.</p><p>Veiledende kostnader inkl. mva. er basert på erfaringer fra tilsvarende arbeider andre steder, og gjelder for innkjøpte tjenester fra entreprenører.</p><p>Kostnadene er å betrakte som budsjettpriser. Endelige kostnader vil først foreligge etter at det er innhentet pristilbud.</p><p>Det er foretatt en skjønnsmessig prioritering av tiltakene med en anbefalt tidsfrist. Boligselskapet kan selvsagt foreta en annen prioritering dersom laget finner det mer hensiktsmessig mtp tid og økonomi/felleskostnader.</p>"}}]);
//# sourceMappingURL=printAllAssessments.js.map