(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{336:function(e,t,r){"use strict";r.r(t);var n=r(78);Object(n.c)("confirmedBy",{params:["target"],validate:function(e,t){return e===t.target},message:"The {_field_} does not match the {target}"});var a={name:"Example",components:{ValidationProvider:n.b,ValidationObserver:n.a},data:function(){return{first:"first",second:"second"}},methods:{}},o=r(31),s=Object(o.a)(a,function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("ValidationObserver",{ref:"form"},[r("ValidationProvider",{attrs:{vid:"first",name:"First",rules:"required|confirmedBy:@second"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.errors;return[e._v("\n      First\n      "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.first,expression:"first"}],attrs:{type:"text"},domProps:{value:e.first},on:{input:function(t){t.target.composing||(e.first=t.target.value)}}}),e._v(" "),r("span",[e._v(e._s(n[0]))])]}}])}),e._v(" "),r("ValidationProvider",{attrs:{vid:"second",name:"Second",rules:"required"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.errors;return[e._v("\n      Second\n      "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.second,expression:"second"}],attrs:{type:"text"},domProps:{value:e.second},on:{input:function(t){t.target.composing||(e.second=t.target.value)}}}),e._v(" "),r("span",[e._v(e._s(n[0]))])]}}])})],1)],1)},[],!1,null,"15eaa992",null);t.default=s.exports}}]);