webpackJsonp([11],{FDiI:function(n,t,e){(n.exports=e("FZ+f")(!1)).push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},IPuO:function(n,t,e){var a=e("FDiI");"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);e("rjj0")("2037fd35",a,!0)},LVOX:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=e("//Fk"),i=e.n(a),s=e("NYxO"),o={computed:Object(s.b)(["ticketHomePageBigPictureList","showTopList"]),data:function(){return{total:0,bigImageDialog:!1,bigImage:"",scenicSpotId:"",addDialog:!1,formLabelWidth:"120px",addOptions:{tm_ts_Code:"",tm_tbi_Image:"",tm_tbi_Remark:""},updateDialog:!1,updateData:{}}},methods:{handleCurrentChange:function(n){this.initData(n)},uploadImg:function(n){return new i.a(function(t,e){lrz(n).then(function(n){t(n.base64.split(",")[1])})})},uploadToOSS:function(n){return new i.a(function(t,e){var a=new FormData;a.append("fileToUpload",n);var i=new XMLHttpRequest;i.open("POST","http://webservice.1000da.com.cn/OSSFile/PostToOSS"),i.send(a),i.onreadystatechange=function(){if(4==i.readyState&&200==i.status){if(i.responseText){var n=i.responseText;t(JSON.parse(n))}}else console.log(i.responseText)}})},uploaNode:function(){var n=this;setTimeout(function(){n.$refs.upload&&n.$refs.upload.addEventListener("change",function(t){for(var e=0;e<n.$refs.upload.files.length;e++)n.uploadToOSS(n.$refs.upload.files[e]).then(function(t){t?n.addOptions.tm_tbi_Image=t.data:n.$notify({message:"图片地址不存在!",type:"error"})})})},30)},initTicketList:function(){var n=this;this.$store.dispatch("initScenicSpotList",{loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",tm_ts_Code:"",tm_ts_Name:"",tm_ts_TradeInfoID:"",tm_ts_ThemeTypeID:"",tm_ts_IsHot:"",tm_ts_ShowTop:"",tm_ts_ShowTopIsAgree:"",tm_ts_IsPass:"",tm_ts_IsDelete:0,page:1,rows:1e4}).then(function(){},function(t){n.$notify({message:t,type:"error"})})},initData:function(n){var t=this,e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",tm_tbi_ID:"",tm_ts_Code:n||"",tm_tbi_IsDelete:"0"};this.$store.dispatch("initTicketHomePageBigPicture",e).then(function(){},function(n){t.$notify({message:n,type:"error"})})},search:function(){this.initData(this.scenicSpotId)},bigPicture:function(n){this.$store.commit("setTranstionFalse"),this.bigImageDialog=!0,this.bigImage=n},add:function(){this.$store.commit("setTranstionFalse"),this.addDialog=!0,this.uploaNode()},addSubmit:function(){var n=this,t={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:this.addOptions};this.$store.dispatch("addTicketHomePageBigPicture",t).then(function(t){n.$notify({message:t,type:"success"}),n.initData()},function(t){n.$notify({message:t,type:"error"})}),this.addDialog=!1},update:function(n){this.addOptions.tm_tbi_Image="",this.uploaNode(),this.updateDialog=!0,this.$store.commit("setTranstionFalse"),this.updateData=n},updateSubmit:function(){var n=this;this.addOptions.tm_tbi_Image&&(this.updateData.tm_tbi_Image=this.addOptions.tm_tbi_Image);var t={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:this.updateData};this.$store.dispatch("updateTicketHomePageBigPicture",t).then(function(t){n.$notify({message:t,type:"success"}),n.initData()},function(t){n.$notify({message:t,type:"error"})}),this.updateDialog=!1},Delete:function(n){var t=this,e={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",data:{tm_tbi_ID:n||""}};this.$store.dispatch("deleteTicketHomePageBigPicture",e).then(function(n){t.$notify({message:n,type:"success"}),t.initData()},function(n){t.$notify({message:n,type:"error"})})}},created:function(){this.initTicketList(),this.initData()}},l={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",[e("div",{staticClass:"clearfix",attrs:{id:"wrap"}},[e("h1",{staticClass:"userClass"},[n._v("首页展示大图")]),n._v(" "),e("el-col",{staticClass:"formSearch",attrs:{span:24}},[e("el-form",{attrs:{inline:!0}},[e("el-form-item",[e("span",[n._v("景点名称筛选:")])]),n._v(" "),e("el-form-item",[e("el-select",{attrs:{placeholder:"请选择",size:"small"},model:{value:n.scenicSpotId,callback:function(t){n.scenicSpotId=t},expression:"scenicSpotId"}},n._l(n.showTopList,function(n){return e("el-option",{key:n.tm_ts_Code,attrs:{label:n.tm_ts_Name,value:n.tm_ts_Code}})}))],1),n._v(" "),e("el-form-item",[e("el-button",{attrs:{type:"primary",size:"small"},on:{click:n.search}},[n._v("查询")]),n._v(" "),e("el-button",{attrs:{type:"primary",size:"small"},on:{click:n.add}},[n._v("添加")])],1)],1)],1),n._v(" "),e("div",{staticClass:"block",staticStyle:{float:"right",padding:"10px 0"}},[e("el-pagination",{directives:[{name:"show",rawName:"v-show",value:n.total,expression:"total"}],attrs:{"page-size":5,layout:"total, prev, pager, next",total:n.total},on:{"current-change":n.handleCurrentChange}})],1),n._v(" "),e("el-table",{staticStyle:{width:"100%"},attrs:{data:n.ticketHomePageBigPictureList,stripe:""}},[e("el-table-column",{attrs:{align:"center",prop:"tm_ts_Name",label:"景点名称"}}),n._v(" "),e("el-table-column",{attrs:{align:"center",label:"展示图片"},scopedSlots:n._u([{key:"default",fn:function(t){return[e("img",{attrs:{src:t.row.tm_tbi_Image,width:"89",height:"29"},on:{click:function(e){n.bigPicture(t.row.tm_tbi_Image)}}})]}}])}),n._v(" "),e("el-table-column",{attrs:{align:"center",prop:"tm_tbi_Remark",label:"备注"}}),n._v(" "),e("el-table-column",{attrs:{label:"操作"},scopedSlots:n._u([{key:"default",fn:function(t){return[e("el-button",{attrs:{type:"success",size:"mini"},on:{click:function(e){n.update(t.row)}}},[n._v("\n            修改\n          ")]),n._v(" "),e("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(e){n.Delete(t.row.tm_tbi_ID)}}},[n._v("\n            删除\n          ")])]}}])})],1),n._v(" "),e("el-dialog",{attrs:{title:"查看大图",visible:n.bigImageDialog,width:"50%"},on:{"update:visible":function(t){n.bigImageDialog=t}}},[e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:n.bigImage,expression:"bigImage"}],attrs:{width:"100%",height:"100%"}}),n._v(" "),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(t){n.bigImageDialog=!1}}},[n._v("关闭")])],1)]),n._v(" "),e("el-dialog",{attrs:{title:"添加首页展示大图",visible:n.addDialog},on:{"update:visible":function(t){n.addDialog=t}}},[e("el-form",{attrs:{model:n.addOptions}},[e("el-form-item",{attrs:{label:"景点名称:","label-width":n.formLabelWidth}},[e("el-select",{attrs:{placeholder:"请选择",size:"small"},model:{value:n.addOptions.tm_ts_Code,callback:function(t){n.$set(n.addOptions,"tm_ts_Code",t)},expression:"addOptions.tm_ts_Code"}},n._l(n.showTopList,function(n){return e("el-option",{key:n.tm_ts_Code,attrs:{label:n.tm_ts_Name,value:n.tm_ts_Code}})}))],1),n._v(" "),e("el-form-item",{attrs:{label:"展示图片地址:","label-width":n.formLabelWidth}},[e("a",{staticClass:"file",attrs:{href:"javascript:;"}},[n._v("展示图片上传\n            "),e("input",{ref:"upload",attrs:{type:"file",name:"",accept:"image/*"}})]),n._v(" "),e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:n.addOptions.tm_tbi_Image,expression:"addOptions.tm_tbi_Image"},{name:"show",rawName:"v-show",value:n.addOptions.tm_tbi_Image,expression:"addOptions.tm_tbi_Image"}],attrs:{width:"192",height:"120"}})]),n._v(" "),e("el-form-item",{attrs:{label:"备注:","label-width":n.formLabelWidth}},[e("el-input",{attrs:{placeholder:"请输入主题介绍",type:"textarea",rows:4},model:{value:n.addOptions.tm_tbi_Remark,callback:function(t){n.$set(n.addOptions,"tm_tbi_Remark",t)},expression:"addOptions.tm_tbi_Remark"}})],1)],1),n._v(" "),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(t){n.addDialog=!1}}},[n._v("取 消")]),n._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:n.addSubmit}},[n._v("确 定")])],1)],1),n._v(" "),e("el-dialog",{attrs:{title:"修改首页展示大图",visible:n.updateDialog},on:{"update:visible":function(t){n.updateDialog=t}}},[e("el-form",{attrs:{model:n.updateData}},[e("el-form-item",{attrs:{label:"景点名称:","label-width":n.formLabelWidth}},[e("el-select",{attrs:{placeholder:"请选择",size:"small"},model:{value:n.updateData.tm_ts_Code,callback:function(t){n.$set(n.updateData,"tm_ts_Code",t)},expression:"updateData.tm_ts_Code"}},n._l(n.showTopList,function(n){return e("el-option",{key:n.tm_ts_Code,attrs:{label:n.tm_ts_Name,value:n.tm_ts_Code}})}))],1),n._v(" "),e("el-form-item",{attrs:{label:"展示图片地址:","label-width":n.formLabelWidth}},[e("a",{staticClass:"file",attrs:{href:"javascript:;"}},[n._v("展示图片上传\n            "),e("input",{ref:"upload",attrs:{type:"file",name:"",accept:"image/*"}})]),n._v(" "),e("p",[n._v("如果不上传默认为原来的图片")]),n._v(" "),e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:n.addOptions.tm_tbi_Image,expression:"addOptions.tm_tbi_Image"},{name:"show",rawName:"v-show",value:n.addOptions.tm_tbi_Image,expression:"addOptions.tm_tbi_Image"}],attrs:{width:"192",height:"120"}})]),n._v(" "),e("el-form-item",{attrs:{label:"备注:","label-width":n.formLabelWidth}},[e("el-input",{attrs:{placeholder:"请输入主题介绍",type:"textarea",rows:4},model:{value:n.updateData.tm_tbi_Remark,callback:function(t){n.$set(n.updateData,"tm_tbi_Remark",t)},expression:"updateData.tm_tbi_Remark"}})],1)],1),n._v(" "),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(t){n.updateDialog=!1}}},[n._v("取 消")]),n._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:n.updateSubmit}},[n._v("确 定")])],1)],1)],1)])},staticRenderFns:[]};var r=e("VU/8")(o,l,!1,function(n){e("IPuO")},"data-v-763c38cb",null);t.default=r.exports}});