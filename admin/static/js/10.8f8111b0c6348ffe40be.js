webpackJsonp([10],{"79gu":function(n,t,e){(n.exports=e("FZ+f")(!1)).push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},G2L4:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=e("SJI6"),a={computed:Object(s.mapGetters)(["scenicSpotList"]),data:function(){return{num:0,toExamineID:"",ticketName:"",isLoading:!1,isPass:[{value:0,label:"审核中"},{value:1,label:"通过审核"},{value:2,label:"未通过审核"}],toExamineDialog:!1,formLabelWidth:"120px",toExamine:{tm_ts_Code:"",tm_ts_IsPass:"",tm_ts_FailReason:""},isShow:!1,total:0}},methods:{handleCurrentChange:function(n){this.initData(n),this.num=n},initData:function(n){var t=this,e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",tm_ts_Code:"",tm_ts_Name:this.ticketName?this.ticketName:"",tm_ts_TradeInfoID:"",tm_ts_IsDelete:0,tm_ts_IsPass:this.toExamineID?this.toExamineID:"",tm_ts_ShowTop:"",tm_ts_IsHot:"",tm_ts_ThemeTypeID:"",page:n||1,rows:10};0==this.toExamineID&&(e.tm_ts_IsPass=0),this.isLoading=!0,this.$store.dispatch("initScenicSpot",e).then(function(n){t.isLoading=!1,t.total=n})},search:function(){this.initData()},look:function(n){var t=this,e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",tm_ts_Code:n};this.$store.dispatch("ticketLookToExamine",e).then(function(n){t.$alert(n,{confirmButtonText:"确定"})},function(n){t.$notify({message:n,type:"error"})})},toExamineS:function(n){this.$store.commit("setTranstionFalse"),this.toExamine.tm_ts_Code=n,this.toExamineDialog=!0},showReason:function(){2==this.toExamine.tm_ts_IsPass?this.isShow=!0:this.isShow=!1},toExamineSubmit:function(){var n=this,t={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",tm_ts_Code:this.toExamine.tm_ts_Code,tm_ts_IsPass:this.toExamine.tm_ts_IsPass,tm_ts_FailReason:this.toExamine.tm_ts_FailReason};this.$store.dispatch("toExamineSubmit",t).then(function(t){n.$notify({message:t,type:"success"}),n.toExamine.tm_ts_IsPass="",n.initData(n.num)},function(t){n.$notify({message:t,type:"error"})}),this.toExamineDialog=!1}},created:function(){this.initData()}},o={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",[e("section",{attrs:{id:"wrap"}},[e("h1",{staticClass:"userClass"},[n._v("审核景点")]),n._v(" "),e("el-col",{staticClass:"formSearch",attrs:{span:24}},[e("el-form",{attrs:{inline:!0}},[e("el-form-item",[e("span",[n._v("审核状态筛选:")])]),n._v(" "),e("el-form-item",[e("el-select",{attrs:{placeholder:"请选择审核状态",size:"small"},model:{value:n.toExamineID,callback:function(t){n.toExamineID=t},expression:"toExamineID"}},n._l(n.isPass,function(n){return e("el-option",{key:n.value,attrs:{label:n.label,value:n.value}})}))],1),n._v(" "),e("el-form-item",[e("el-input",{attrs:{placeholder:"请输入景点名称",size:"small"},model:{value:n.ticketName,callback:function(t){n.ticketName=t},expression:"ticketName"}})],1),n._v(" "),e("el-form-item",[e("el-button",{attrs:{type:"primary",size:"small"},on:{click:n.search}},[n._v("查询")])],1)],1)],1),n._v(" "),e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:n.isLoading,expression:"isLoading"}],staticStyle:{width:"100%","margin-top":"20px"},attrs:{data:n.scenicSpotList}},[e("el-table-column",{attrs:{type:"expand"},scopedSlots:n._u([{key:"default",fn:function(t){return[e("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:""}},[e("el-form-item",{attrs:{label:"景点编码(主键):"}},[e("span",[n._v(n._s(t.row.tm_ts_Code))])]),n._v(" "),e("el-form-item",{attrs:{label:"景点名称:"}},[e("span",[n._v(n._s(t.row.tm_ts_Name))])]),n._v(" "),e("el-form-item",{attrs:{label:"主题名称:"}},[e("span",[n._v(n._s(t.row.tm_ts_ThemeTypeID))])]),n._v(" "),e("el-form-item",{attrs:{label:"预订须知编号:"}},[e("span",[n._v(n._s(t.row.tm_bk_ID))])]),n._v(" "),e("el-form-item",{attrs:{label:"票种编号:"}},[e("span",[n._v(n._s(t.row.tm_tm_ID))])]),n._v(" "),e("el-form-item",{attrs:{label:"洲:"}},[e("span",[n._v(n._s(t.row.tm_ts_GreatName))])]),n._v(" "),e("el-form-item",{attrs:{label:"国:"}},[e("span",[n._v(n._s(t.row.tm_ts_CountrieName))])]),n._v(" "),e("el-form-item",{attrs:{label:"省:"}},[e("span",[n._v(n._s(t.row.tm_ts_ProviceName))])]),n._v(" "),e("el-form-item",{attrs:{label:"市:"}},[e("span",[n._v(n._s(t.row.tm_ts_CityName))])]),n._v(" "),e("el-form-item",{attrs:{label:"县:"}},[e("span",[n._v(n._s(t.row.tm_ts_ContryName))])]),n._v(" "),e("el-form-item",{attrs:{label:"展示图片:"}},n._l(t.row.tm_ts_ShowImage,function(n,t){return e("img",{staticStyle:{"margin-top":"10px"},attrs:{src:n,width:"300",height:"150"}})})),n._v(" "),e("el-form-item",{attrs:{label:"介绍:"}},[e("span",[n._v(n._s(t.row.tm_ts_Introduce))])]),n._v(" "),e("el-form-item",{attrs:{label:"详细介绍:"}},[e("span",[n._v(n._s(t.row.tm_ts_Detailedintroduction))])]),n._v(" "),e("el-form-item",{attrs:{label:"详细地址:"}},[e("span",[n._v(n._s(t.row.tm_ts_Address))])]),n._v(" "),e("el-form-item",{attrs:{label:"开放时间:"}},[e("span",[n._v(n._s(t.row.tm_ts_Opentime))])]),n._v(" "),e("el-form-item",{attrs:{label:"建议游玩时间:"}},[e("span",[n._v(n._s(t.row.tm_ts_Time))])]),n._v(" "),e("el-form-item",{attrs:{label:"联系电话号码:"}},[e("span",[n._v(n._s(t.row.tm_ts_Phone))])]),n._v(" "),e("el-form-item",{attrs:{label:"经度:"}},[e("span",[n._v(n._s(t.row.tm_ts_Longitude))])]),n._v(" "),e("el-form-item",{attrs:{label:"纬度:"}},[e("span",[n._v(n._s(t.row.tm_ts_Latitude))])]),n._v(" "),e("el-form-item",{attrs:{label:"是否热门景点:"}},[e("span",[n._v(n._s(t.row.tm_ts_IsHot))])]),n._v(" "),e("el-form-item",{attrs:{label:"是否境外景点:"}},[e("span",[n._v(n._s(t.row.tm_ts_IsOversea))])]),n._v(" "),e("el-form-item",{attrs:{label:"是否当季精选:"}},[e("span",[n._v(n._s(t.row.tm_ts_IsSeasonChoice))])]),n._v(" "),e("el-form-item",{attrs:{label:"建议价格:"}},[e("span",[n._v(n._s(t.row.tm_ts_SuggestPrice)+"元")])]),n._v(" "),e("el-form-item",{attrs:{label:"创建时间:"}},[e("span",[n._v(n._s(t.row.tm_ts_CreateTime))])]),n._v(" "),e("el-form-item",{attrs:{label:"备注:"}},[e("span",[n._v(n._s(t.row.tm_ts_Remark))])])],1)]}}])}),n._v(" "),e("el-table-column",{attrs:{label:"景点名称",prop:"tm_ts_Name"}}),n._v(" "),e("el-table-column",{attrs:{label:"联系电话号码",prop:"tm_ts_Phone"}}),n._v(" "),e("el-table-column",{staticStyle:{width:"1000px"},attrs:{label:"操作",align:"center"},scopedSlots:n._u([{key:"default",fn:function(t){return[e("el-button",{attrs:{size:"mini"},on:{click:function(e){n.look(t.row.tm_ts_Code)}}},[n._v("查看审核状态\n          ")]),n._v(" "),e("el-button",{directives:[{name:"show",rawName:"v-show",value:0==t.row.tm_ts_IsPass,expression:"scope.row.tm_ts_IsPass == 0"}],attrs:{size:"mini"},on:{click:function(e){n.toExamineS(t.row.tm_ts_Code)}}},[n._v("审核此景点\n          ")])]}}])})],1),n._v(" "),e("el-dialog",{attrs:{title:"审核弹窗",visible:n.toExamineDialog},on:{"update:visible":function(t){n.toExamineDialog=t}}},[e("el-form",{attrs:{model:n.toExamine}},[e("el-form-item",{attrs:{label:"审核状态:","label-width":n.formLabelWidth}},[e("el-select",{attrs:{placeholder:"请选择审核状态"},on:{change:n.showReason},model:{value:n.toExamine.tm_ts_IsPass,callback:function(t){n.$set(n.toExamine,"tm_ts_IsPass",t)},expression:"toExamine.tm_ts_IsPass"}},n._l(n.isPass,function(n){return e("el-option",{key:n.value,attrs:{label:n.label,value:n.value}})}))],1),n._v(" "),e("el-form-item",{directives:[{name:"show",rawName:"v-show",value:n.isShow,expression:"isShow"}],attrs:{label:"审核失败原因:","label-width":n.formLabelWidth}},[e("el-input",{model:{value:n.toExamine.tm_ts_FailReason,callback:function(t){n.$set(n.toExamine,"tm_ts_FailReason",t)},expression:"toExamine.tm_ts_FailReason"}})],1)],1),n._v(" "),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(t){n.toExamineDialog=!1}}},[n._v("取 消")]),n._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:n.toExamineSubmit}},[n._v("确 定")])],1)],1),n._v(" "),e("div",{staticClass:"block",staticStyle:{"text-align":"right","padding-bottom":"50px"}},[e("el-pagination",{attrs:{"page-size":10,layout:"prev, pager, next",total:n.total},on:{"current-change":n.handleCurrentChange}})],1)],1)])},staticRenderFns:[]};var i=e("VU/8")(a,o,!1,function(n){e("GaQL")},"data-v-72db6060",null);t.default=i.exports},GaQL:function(n,t,e){var s=e("79gu");"string"==typeof s&&(s=[[n.i,s,""]]),s.locals&&(n.exports=s.locals);e("rjj0")("ebe1079a",s,!0)}});