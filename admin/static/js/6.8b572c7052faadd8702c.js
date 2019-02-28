webpackJsonp([6],{Bujv:function(n,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var t=e("SJI6"),s={name:"",data:function(){return{approvalStatusDialog:!1,statusValue:-1,total:0,userName:"",isLoading:!1,status:1,page:0,sm_ai_ID:"",formLabelWidth:"120px",approvalOptions:{loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",sm_ai_ID:"",IsPass:"1",payPercent:"",failReason:"",agentCode:"",agentPassword:"",reviewPerson:"huileyou"},ApprovalStatus:[{value:-1,label:"所有"},{value:0,label:"待审核"},{value:1,label:"审核成功"},{value:2,label:"审核失败"}]}},computed:Object(t.mapGetters)(["adminSupplierList"]),created:function(){this.initData("",1)},methods:{handleCurrentChange:function(n){this.page=n,this.statusValue||0===this.statusValue?this.initData(this.userName.trim(),n,this.statusValue):this.initData(this.userName.trim(),n)},initData:function(n,a,e){var t=this,s={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",userName:n||"",sm_ai_IsPass:e||-1,sm_ai_ID:"0",page:a||1,rows:5};0==e&&(s.sm_ai_IsPass=0),this.isLoading=!0,this.$store.dispatch("initAdminSupplier",s).then(function(n){t.total=Number(n.totalrows),t.isLoading=!1},function(n){t.$notify({message:n,type:"error"})})},search:function(){this.initData(this.userName.trim(),1,this.statusValue)},approval:function(n){this.$store.commit("setTranstionFalse"),this.approvalStatusDialog=!0,this.sm_ai_ID=n},approvalStatusSubmit:function(){var n=this;Number(this.approvalOptions.payPercent)>=1?this.$notify({message:"提成比例请输入小于1的小数",type:"error"}):(1==this.approvalOptions.IsPass&&(this.approvalOptions.failReason=""),2==this.approvalOptions.IsPass&&(this.approvalOptions.payPercent=""),this.approvalOptions.sm_ai_ID=this.sm_ai_ID,this.$store.dispatch("GetApproval",this.approvalOptions).then(function(a){n.$notify({message:a,type:"success"}),n.initData(n.userName,1,n.statusValue)},function(a){n.$notify({message:a,type:"error"})}),this.approvalStatusDialog=!1)}}},l={render:function(){var n=this,a=n.$createElement,e=n._self._c||a;return e("div",[e("section",{attrs:{id:"wrap"}},[e("h1",{staticClass:"userClass"},[n._v("供应商信息")]),n._v(" "),e("el-col",{staticClass:"formSearch",attrs:{span:24}},[e("el-form",{attrs:{inline:!0}},[e("el-form-item",[e("span",[n._v("供应商名称筛选:")])]),n._v(" "),e("el-form-item",[e("el-input",{attrs:{type:"text","auto-complete":"off",placeholder:"供应商名称",size:"small"},model:{value:n.userName,callback:function(a){n.userName=a},expression:"userName"}})],1),n._v(" "),e("el-form-item",[e("el-select",{attrs:{placeholder:"请选择审核状态",size:"small"},model:{value:n.statusValue,callback:function(a){n.statusValue=a},expression:"statusValue"}},n._l(n.ApprovalStatus,function(n){return e("el-option",{key:n.value,attrs:{label:n.label,value:n.value}})}))],1),n._v(" "),e("el-form-item",[e("el-button",{attrs:{type:"primary",size:"small"},on:{click:n.search}},[n._v("查询")])],1)],1)],1),n._v(" "),e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:n.isLoading,expression:"isLoading"}],staticStyle:{width:"100%"},attrs:{data:n.adminSupplierList,"highlight-current-row":""}},[e("el-table-column",{attrs:{type:"expand"},scopedSlots:n._u([{key:"default",fn:function(a){return[e("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:""}},[e("el-form-item",{attrs:{label:"供应商编号:"}},[e("span",[n._v(n._s(a.row.sm_ai_ID))])]),n._v(" "),e("el-form-item",{attrs:{label:"供应商手机号码:"}},[e("span",[n._v(n._s(a.row.sm_ai_Telephone))])]),n._v(" "),e("el-form-item",{attrs:{label:"公司名称:"}},[e("span",[n._v(n._s(a.row.sm_ai_GoodName))])]),n._v(" "),e("el-form-item",{attrs:{label:"公司地址:"}},[e("span",[n._v(n._s(a.row.sm_ai_Address))])]),n._v(" "),e("el-form-item",{attrs:{label:"注册成立时间:"}},[e("span",[n._v(n._s(a.row.sm_ai_RegTime))])]),n._v(" "),e("el-form-item",{attrs:{label:"注册资金:"}},[e("span",[n._v(n._s(a.row.sm_ai_RegMoney)+"万元")])]),n._v(" "),e("el-form-item",{attrs:{label:"公司规模:"}},[e("span",[n._v(n._s(a.row.sm_ai_CompanyPersons))])]),n._v(" "),e("el-form-item",{attrs:{label:"结算币种:"}},[e("span",[n._v(n._s(a.row.sm_ai_BalanceCurrencyName))])]),n._v(" "),e("el-form-item",{attrs:{label:"优势产品说明:"}},[e("span",[n._v(n._s(a.row.sm_ai_GoodIntroduce))])]),n._v(" "),e("el-form-item",{attrs:{label:"已合作的网销渠道:"}},[e("span",[n._v(n._s(a.row.sm_ai_PartnerWay))])]),n._v(" "),e("el-form-item",{attrs:{label:"是否三证合一:"}},[e("span",[n._v(n._s(n._f("getIncludeCert")(a.row.sm_ai_IncludeCert)))])]),n._v(" "),e("el-form-item",{attrs:{label:"营业执照号:"}},[e("span",[n._v(n._s(a.row.sm_ai_CertNo))])]),n._v(" "),e("el-form-item",{attrs:{label:"证件有效期 :"}},[e("span",[n._v(n._s(a.row.sm_ai_CertExpireTo))])]),n._v(" "),e("el-form-item",{attrs:{label:"营业执照扫描件 :"}},n._l(a.row.sm_ai_CertImage,function(n){return e("img",{directives:[{name:"show",rawName:"v-show",value:a.row.sm_ai_CertImage.length,expression:"props.row.sm_ai_CertImage.length"}],staticStyle:{width:"100px",height:"100px"},attrs:{src:n,alt:""}})})),n._v(" "),e("el-form-item",{attrs:{label:"税务登记号 :"}},[e("span",[n._v(n._s(a.row.sm_ai_FeeNo))])]),n._v(" "),e("el-form-item",{attrs:{label:"税务登记证扫描件 :"}},n._l(a.row.sm_ai_FeeImage,function(n){return e("img",{directives:[{name:"show",rawName:"v-show",value:a.row.sm_ai_FeeImage.length,expression:"props.row.sm_ai_FeeImage.length"}],staticStyle:{width:"100px",height:"100px"},attrs:{src:n,alt:""}})})),n._v(" "),e("el-form-item",{attrs:{label:"审核状态 :"}},[e("span",[n._v(n._s(n._f("getPass")(a.row.sm_ai_IsPass)))])]),n._v(" "),e("el-form-item",{attrs:{label:"审核失败原因:"}},[e("span",[n._v(n._s(a.row.sm_ai_FailReason))])]),n._v(" "),e("el-form-item",{attrs:{label:"创建时间 :"}},[e("span",[n._v(n._s(a.row.sm_ai_CreateTime))])])],1)]}}])}),n._v(" "),e("el-table-column",{attrs:{label:"供应商编号",prop:"sm_ai_ID"}}),n._v(" "),e("el-table-column",{attrs:{label:"供应商名称",prop:"userName"}}),n._v(" "),e("el-table-column",{attrs:{label:"供应商手机号码",prop:"sm_ai_Telephone"}}),n._v(" "),e("el-table-column",{attrs:{label:"操作"},scopedSlots:n._u([{key:"default",fn:function(a){return[1!=a.row.sm_ai_IsPass?e("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(e){n.approval(a.row.sm_ai_ID)}}},[n._v("审核\n          ")]):e("span",[n._v("已审核")])]}}])})],1),n._v(" "),e("div",{staticClass:"block",staticStyle:{float:"right"}},[e("el-pagination",{directives:[{name:"show",rawName:"v-show",value:n.total,expression:"total"}],attrs:{"page-size":5,layout:"total, prev, pager, next",total:n.total},on:{"current-change":n.handleCurrentChange}})],1)],1),n._v(" "),e("el-dialog",{attrs:{title:"审核状态",visible:n.approvalStatusDialog},on:{"update:visible":function(a){n.approvalStatusDialog=a}}},[e("el-form",{attrs:{model:n.approvalOptions}},[e("el-form-item",{attrs:{label:"审核状态:","label-width":n.formLabelWidth}},[e("el-radio",{attrs:{label:"1"},model:{value:n.approvalOptions.IsPass,callback:function(a){n.$set(n.approvalOptions,"IsPass",a)},expression:"approvalOptions.IsPass"}},[n._v("审核成功")]),n._v(" "),e("el-radio",{attrs:{label:"2"},model:{value:n.approvalOptions.IsPass,callback:function(a){n.$set(n.approvalOptions,"IsPass",a)},expression:"approvalOptions.IsPass"}},[n._v("审核失败")])],1),n._v(" "),e("el-form-item",{directives:[{name:"show",rawName:"v-show",value:1!=n.approvalOptions.IsPass,expression:"approvalOptions.IsPass!=1"}],attrs:{label:"审核失败原因:","label-width":n.formLabelWidth}},[e("el-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:6},placeholder:"请输入内容"},model:{value:n.approvalOptions.failReason,callback:function(a){n.$set(n.approvalOptions,"failReason",a)},expression:"approvalOptions.failReason"}})],1),n._v(" "),e("el-form-item",{directives:[{name:"show",rawName:"v-show",value:2!=n.approvalOptions.IsPass,expression:"approvalOptions.IsPass!=2"}],attrs:{label:"提成比例:","label-width":n.formLabelWidth}},[e("el-input",{attrs:{placeholder:"请输入数字",type:"number"},model:{value:n.approvalOptions.payPercent,callback:function(a){n.$set(n.approvalOptions,"payPercent",a)},expression:"approvalOptions.payPercent"}})],1)],1),n._v(" "),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(a){n.approvalStatusDialog=!1}}},[n._v("取 消")]),n._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:n.approvalStatusSubmit}},[n._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var o=e("VU/8")(s,l,!1,function(n){e("Lt0A")},"data-v-aaca84f2",null);a.default=o.exports},Lt0A:function(n,a,e){var t=e("ZnAF");"string"==typeof t&&(t=[[n.i,t,""]]),t.locals&&(n.exports=t.locals);e("rjj0")("846c260e",t,!0)},ZnAF:function(n,a,e){(n.exports=e("FZ+f")(!1)).push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])}});