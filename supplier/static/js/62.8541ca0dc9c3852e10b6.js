webpackJsonp([62],{"326/":function(n,t,e){var i=e("t6uw");"string"==typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);e("rjj0")("4730262f",i,!0)},SKS4:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=e("//Fk"),a=e.n(i),o=e("NYxO"),s={name:"",computed:Object(o.b)(["adminTradeGoodList","adminProductLine","adminLinePrepare","adminTimeActivitiesList","adminScheduleTimeList","adminEventDiningList","updateAdminActiveFoodObj","adminTimeActivitiesList","adminActivityMealManagementId"]),data:function(){return{userName:"",GoodId:"",LineID:"",TimeID:"",userSearchID:"",TimeActiveID:"",isLoading:!1,addAdminActiveFoodBox:!1,updateAdminActiveFoodBox:!1,addAdminActiveFoodObj:{loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:{ts_sf_TimeActivityID:"",ts_af_Type:"",ts_af_Distance:"",ts_af_DoWork:"",ts_af_Time:"",ts_af_Remark:""}},formLabelWidth:"120px",typeList:[{label:"早餐",value:0},{label:"午餐",value:1},{label:"晚餐",value:2}],typeValue:"",userSearch:{id:""}}},methods:{handleSelect:function(n){this.userName=n.value;var t={loginUserID:"huileyou",loginUserPass:123,goodID:n.id?n.id:""};this.$store.dispatch("initAdminProductLine",t)},loadAll:function(n,t){var e=this;return new a.a(function(n,i){var a=JSON.parse(sessionStorage.getItem("admin")),o={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",tradeID:a.sm_ui_ID?a.sm_ui_ID:"",goodTitle:t||"",userID:"",pcName:"",ID:"",isDelete:0,page:1,rows:100};e.$store.dispatch("initAdminTradeGoodList",o).then(function(t){n(t)},function(n){e.$notify({message:n,type:"error"})})})},querySearchAsync:function(n,t){var e=this;this.loadAll(1,n).then(function(n){n=(n=n.data).map(function(n){return{id:n.ta_tg_ID,value:n.ta_tg_Title}}),e.restaurants=n,clearTimeout(e.timeout),e.timeout=setTimeout(function(){t(e.restaurants)},10)})},changeLineID:function(){var n=this;this.LineID="";var t={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",goodID:this.userSearchID?this.userSearchID:""};this.$store.dispatch("initAdminLinePrepare",t).then(function(){},function(t){n.$notify({message:t,type:"error"})})},changeLineTime:function(){this.TimeID="";var n={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",isDelete:"0",goodID:this.LineID?this.LineID:""};this.$store.dispatch("initAdminScheduleTime",n)},changeTimeActive:function(){var n=this,t={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",goodID:this.TimeID?this.TimeID:""};this.$store.dispatch("initAdminTimeActivities",t).then(function(){},function(t){n.$notify({message:t,type:"error"})})},initData:function(n){var t=this,e={loginUserID:"huileyou",loginUserPass:"123",goodID:n||""};this.isLoading=!0,this.$store.dispatch("initAdminEventDining",e).then(function(){},function(n){t.$notify({message:n,type:"error"})}),this.isLoading=!1},search:function(){this.initData(this.TimeActiveID)},searchInitData:function(){this.adminActivityMealManagementId&&this.initData(this.adminActivityMealManagementId)},addAdminActiveFood:function(){this.addAdminActiveFoodBox=!0,this.$store.commit("setTranstionFalse")},addAdminActiveFoodSubmit:function(){var n=this;this.$store.dispatch("initAdminActiveFood",this.addAdminActiveFoodObj).then(function(t){n.$notify({message:t,type:"success"}),n.initData(n.addAdminActiveFoodObj.data.ts_sf_TimeActivityID)},function(t){n.$notify({message:t,type:"error"})}),this.addAdminActiveFoodBox=!1},updateAdminActiveFood:function(n){this.$store.commit("initUpdateAdminActiveFoodObj",n),this.$store.commit("setTranstionFalse"),this.updateAdminActiveFoodBox=!0},updateAdminActiveFoodSubmit:function(){var n=this;if(isNaN(this.updateAdminActiveFoodObj.ts_af_Distance)||isNaN(this.updateAdminActiveFoodObj.ts_af_Time))this.$notify({message:"行驶距离和花费时间为数字!",type:"error"});else{var t={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:{ts_af_ID:this.updateAdminActiveFoodObj.ts_af_ID,ts_sf_TimeActivityID:this.updateAdminActiveFoodObj.ts_sf_TimeActivityID,ts_af_Type:this.updateAdminActiveFoodObj.ts_af_Type,ts_af_Distance:this.updateAdminActiveFoodObj.ts_af_Distance,ts_af_DoWork:this.updateAdminActiveFoodObj.ts_af_DoWork,ts_af_Time:this.updateAdminActiveFoodObj.ts_af_Time,ts_af_IsDelete:this.updateAdminActiveFoodObj.ts_af_IsDelete,ts_af_Remark:this.updateAdminActiveFoodObj.ts_af_Remark}};this.$store.dispatch("updateAdminActiveFoodSubmit",t).then(function(t){n.$notify({message:t,type:"success"}),n.initData(n.updateAdminActiveFoodObj.ts_sf_TimeActivityID)},function(t){n.$notify({message:t,type:"error"})}),this.updateAdminActiveFoodBox=!1}},deleteAdminActiveFood:function(n){var t=this,e={loginUserID:"huileyou",loginUserPass:"123",afID:n};this.$store.dispatch("deleteAdminActiveFood",e).then(function(n){t.$notify({message:n,type:"success"}),t.adminActivityMealManagementId&&t.initData(t.adminActivityMealManagementId)},function(n){t.$notify({message:n,type:"error"})})}},mounted:function(){this.searchInitData()}},d={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"clearfix",attrs:{id:"wrap"}},[e("h1",{staticClass:"userClass"},[n._v("活动用餐")]),n._v(" "),e("el-col",{staticClass:"formSearch",attrs:{span:24}},[e("el-form",{attrs:{inline:!0}},[e("el-form-item",[e("span",[n._v("活动用餐筛选:")])]),n._v(" "),e("el-form-item",[e("el-autocomplete",{staticStyle:{width:"200px"},attrs:{"fetch-suggestions":n.querySearchAsync,placeholder:"请选择产品"},on:{select:n.handleSelect},model:{value:n.userName,callback:function(t){n.userName=t},expression:"userName"}})],1),n._v(" "),e("el-form-item",[e("el-select",{staticStyle:{width:"150px"},attrs:{placeholder:"请选择产品线路"},on:{change:n.changeLineID},model:{value:n.userSearchID,callback:function(t){n.userSearchID=t},expression:"userSearchID"}},n._l(n.adminProductLine,function(n){return e("el-option",{key:n.ts_pt_ID,attrs:{label:n.ts_pt_Name,value:n.ts_pt_ID}})}))],1),n._v(" "),e("el-form-item",[e("el-select",{staticStyle:{width:"150px"},attrs:{placeholder:"请选择线路日程"},on:{change:n.changeLineTime},model:{value:n.LineID,callback:function(t){n.LineID=t},expression:"LineID"}},n._l(n.adminLinePrepare,function(n){return e("el-option",{key:n.ts_pt_ID,attrs:{label:"第"+n.ts_pt_Day+"天",value:n.ts_pt_ID}})}))],1),n._v(" "),e("el-form-item",[e("el-select",{staticStyle:{width:"150px"},attrs:{placeholder:"请选择日程时间"},on:{change:n.changeTimeActive},model:{value:n.TimeID,callback:function(t){n.TimeID=t},expression:"TimeID"}},n._l(n.adminScheduleTimeList,function(n){return e("el-option",{key:n.ts_tt_ID,attrs:{label:n.ts_tt_DoTime,value:n.ts_tt_ID}})}))],1),n._v(" "),e("el-form-item",[e("el-select",{staticStyle:{width:"150px"},attrs:{placeholder:"请选择时间活动"},model:{value:n.TimeActiveID,callback:function(t){n.TimeActiveID=t},expression:"TimeActiveID"}},n._l(n.adminTimeActivitiesList,function(n){return e("el-option",{key:n.ts_ta_ID,attrs:{label:n.ts_ta_DoWork,value:n.ts_ta_ID}})}))],1),n._v(" "),e("el-form-item",[e("el-button",{attrs:{type:"primary"},on:{click:n.search}},[n._v("查询")]),n._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:n.addAdminActiveFood}},[n._v("新增")])],1)],1)],1),n._v(" "),e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:n.isLoading,expression:"isLoading"}],staticStyle:{width:"100%"},attrs:{data:n.adminEventDiningList}},[e("el-table-column",{attrs:{align:"center",prop:"ts_af_ID",label:"主键编号"}}),n._v(" "),e("el-table-column",{attrs:{align:"center",prop:"ts_sf_TimeActivityID",label:"时间活动编号"}}),n._v(" "),e("el-table-column",{attrs:{align:"center",prop:"ts_af_DoWork",label:"做的事情"}}),n._v(" "),e("el-table-column",{attrs:{align:"center",label:"行驶距离"},scopedSlots:n._u([{key:"default",fn:function(t){return[n._v("\n        "+n._s(t.row.ts_af_Distance)+"km\n      ")]}}])}),n._v(" "),e("el-table-column",{attrs:{align:"center",label:"用餐时间"},scopedSlots:n._u([{key:"default",fn:function(t){return[n._v("\n        "+n._s(t.row.ts_af_Time)+"分钟\n      ")]}}])}),n._v(" "),e("el-table-column",{attrs:{align:"center",prop:"ts_af_Type",label:"用餐类型"}}),n._v(" "),e("el-table-column",{attrs:{align:"center",prop:"ts_af_Remark",label:"备注"}}),n._v(" "),e("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:n._u([{key:"default",fn:function(t){return[e("el-button",{attrs:{size:"mini"},on:{click:function(e){n.updateAdminActiveFood(t.row.ts_af_ID)}}},[n._v("修改\n        ")]),n._v(" "),e("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(e){n.deleteAdminActiveFood(t.row.ts_af_ID)}}},[n._v("删除\n        ")])]}}])})],1),n._v(" "),e("el-dialog",{attrs:{title:"添加活动用餐",visible:n.addAdminActiveFoodBox},on:{"update:visible":function(t){n.addAdminActiveFoodBox=t}}},[e("el-form",{attrs:{model:n.addAdminActiveFoodObj}},[e("el-form-item",{attrs:{label:"时间活动:","label-width":n.formLabelWidth}},[e("el-select",{staticStyle:{width:"150px"},attrs:{placeholder:"请选择时间活动"},model:{value:n.addAdminActiveFoodObj.data.ts_sf_TimeActivityID,callback:function(t){n.$set(n.addAdminActiveFoodObj.data,"ts_sf_TimeActivityID",t)},expression:"addAdminActiveFoodObj.data.ts_sf_TimeActivityID"}},n._l(n.adminTimeActivitiesList,function(n){return e("el-option",{key:n.ts_ta_ID,attrs:{label:n.ts_ta_DoWork,value:n.ts_ta_ID}})}))],1),n._v(" "),e("el-form-item",{attrs:{label:"用餐类型:","label-width":n.formLabelWidth}},[e("el-select",{attrs:{placeholder:"请选择"},model:{value:n.addAdminActiveFoodObj.data.ts_af_Type,callback:function(t){n.$set(n.addAdminActiveFoodObj.data,"ts_af_Type",t)},expression:"addAdminActiveFoodObj.data.ts_af_Type"}},n._l(n.typeList,function(n){return e("el-option",{key:n.value,attrs:{label:n.label,value:n.value}})}))],1),n._v(" "),e("el-form-item",{attrs:{label:"行驶距离:","label-width":n.formLabelWidth}},[e("el-input",{model:{value:n.addAdminActiveFoodObj.data.ts_af_Distance,callback:function(t){n.$set(n.addAdminActiveFoodObj.data,"ts_af_Distance",t)},expression:"addAdminActiveFoodObj.data.ts_af_Distance"}}),e("span",{staticStyle:{color:"#f60"}},[n._v("(单位:km)")])],1),n._v(" "),e("el-form-item",{attrs:{label:"做的事情:","label-width":n.formLabelWidth}},[e("el-input",{model:{value:n.addAdminActiveFoodObj.data.ts_af_DoWork,callback:function(t){n.$set(n.addAdminActiveFoodObj.data,"ts_af_DoWork",t)},expression:"addAdminActiveFoodObj.data.ts_af_DoWork"}})],1),n._v(" "),e("el-form-item",{attrs:{label:"花费时间:","label-width":n.formLabelWidth}},[e("el-input",{model:{value:n.addAdminActiveFoodObj.data.ts_af_Time,callback:function(t){n.$set(n.addAdminActiveFoodObj.data,"ts_af_Time",t)},expression:"addAdminActiveFoodObj.data.ts_af_Time"}}),e("span",{staticStyle:{color:"#f60"}},[n._v("(单位:分钟)")])],1),n._v(" "),e("el-form-item",{attrs:{label:"备注:","label-width":n.formLabelWidth}},[e("el-input",{model:{value:n.addAdminActiveFoodObj.data.ts_af_Remark,callback:function(t){n.$set(n.addAdminActiveFoodObj.data,"ts_af_Remark",t)},expression:"addAdminActiveFoodObj.data.ts_af_Remark"}})],1)],1),n._v(" "),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(t){n.addAdminActiveFoodBox=!1}}},[n._v("取 消")]),n._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:n.addAdminActiveFoodSubmit}},[n._v("确 定")])],1)],1),n._v(" "),e("el-dialog",{attrs:{title:"修改活动用餐",visible:n.updateAdminActiveFoodBox},on:{"update:visible":function(t){n.updateAdminActiveFoodBox=t}}},[e("el-form",{attrs:{model:n.updateAdminActiveFoodObj}},[e("el-form-item",{attrs:{label:"时间活动:","label-width":n.formLabelWidth}},[e("el-select",{staticStyle:{width:"150px"},attrs:{placeholder:"请选择时间活动"},model:{value:n.updateAdminActiveFoodObj.ts_sf_TimeActivityID,callback:function(t){n.$set(n.updateAdminActiveFoodObj,"ts_sf_TimeActivityID",t)},expression:"updateAdminActiveFoodObj.ts_sf_TimeActivityID"}},n._l(n.adminTimeActivitiesList,function(n){return e("el-option",{key:n.ts_ta_ID,attrs:{label:n.ts_ta_DoWork,value:n.ts_ta_ID}})}))],1),n._v(" "),e("el-form-item",{attrs:{label:"用餐类型:","label-width":n.formLabelWidth}},[e("el-select",{attrs:{placeholder:"请选择"},model:{value:n.updateAdminActiveFoodObj.ts_af_Type,callback:function(t){n.$set(n.updateAdminActiveFoodObj,"ts_af_Type",t)},expression:"updateAdminActiveFoodObj.ts_af_Type"}},n._l(n.typeList,function(n){return e("el-option",{key:n.value,attrs:{label:n.label,value:n.value}})}))],1),n._v(" "),e("el-form-item",{attrs:{label:"行驶距离:","label-width":n.formLabelWidth}},[e("el-input",{model:{value:n.updateAdminActiveFoodObj.ts_af_Distance,callback:function(t){n.$set(n.updateAdminActiveFoodObj,"ts_af_Distance",t)},expression:"updateAdminActiveFoodObj.ts_af_Distance"}}),e("span",{staticStyle:{color:"#f60"}},[n._v("(单位:km)")])],1),n._v(" "),e("el-form-item",{attrs:{label:"做的事情:","label-width":n.formLabelWidth}},[e("el-input",{model:{value:n.updateAdminActiveFoodObj.ts_af_DoWork,callback:function(t){n.$set(n.updateAdminActiveFoodObj,"ts_af_DoWork",t)},expression:"updateAdminActiveFoodObj.ts_af_DoWork"}})],1),n._v(" "),e("el-form-item",{attrs:{label:"花费时间:","label-width":n.formLabelWidth}},[e("el-input",{model:{value:n.updateAdminActiveFoodObj.ts_af_Time,callback:function(t){n.$set(n.updateAdminActiveFoodObj,"ts_af_Time",t)},expression:"updateAdminActiveFoodObj.ts_af_Time"}}),e("span",{staticStyle:{color:"#f60"}},[n._v("(单位:分钟)")])],1),n._v(" "),e("el-form-item",{attrs:{label:"备注:","label-width":n.formLabelWidth}},[e("el-input",{model:{value:n.updateAdminActiveFoodObj.ts_af_Remark,callback:function(t){n.$set(n.updateAdminActiveFoodObj,"ts_af_Remark",t)},expression:"updateAdminActiveFoodObj.ts_af_Remark"}})],1)],1),n._v(" "),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(t){n.updateAdminActiveFoodBox=!1}}},[n._v("取 消")]),n._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:n.updateAdminActiveFoodSubmit}},[n._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var l=e("VU/8")(s,d,!1,function(n){e("326/")},null,null);t.default=l.exports},t6uw:function(n,t,e){(n.exports=e("FZ+f")(!1)).push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])}});