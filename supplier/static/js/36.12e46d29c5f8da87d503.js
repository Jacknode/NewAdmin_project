webpackJsonp([36],{H2GC:function(n,e,t){(n.exports=t("FZ+f")(!1)).push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},b0GZ:function(n,e,t){var s=t("H2GC");"string"==typeof s&&(s=[[n.i,s,""]]),s.locals&&(n.exports=s.locals);t("rjj0")("8ef901ee",s,!0)},nJiR:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=t("NYxO"),a={name:"",data:function(){return{formLabelWidth:"120px",userName:"",isLoading:!1,total:0,approvalStatusDialog:!1,proxyID:"",options:{loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",proxyID:"",isPass:"1",failReason:"",getPercent:"",reviewPerson:"huileyou"}}},computed:Object(s.b)(["adminAgentsList"]),created:function(){this.initData("",1)},methods:{handleSelect:function(n,e){},agents:function(n){this.$store.commit("setTranstionFalse"),this.approvalStatusDialog=!0,this.proxyID=n},agentsStatusSubmit:function(){var n=this;Number(this.options.getPercent)>=1?this.$notify({message:"提成比例请输入小于1的小数",type:"error"}):(1==this.options.isPass&&(this.options.failReason=""),2==this.options.isPass&&(this.options.getPercent=""),this.options.proxyID=this.proxyID,this.$store.dispatch("checkProxyInfo",this.options).then(function(e){n.$notify({message:e,type:"success"}),n.initData(n.userName.trim())},function(e){n.$notify({message:e,type:"error"})}),this.approvalStatusDialog=!1)},handleCurrentChange:function(n){this.initData("",n)},search:function(){this.initData(this.userName.trim())},initData:function(n,e){var t=this,s={loginUserID:"huileyou",loginUserPass:"123",operateUserID:"",operateUserName:"",pcName:"",proxyID:"",proxyName:n||"",page:e||1,row:5};this.isLoading=!0,this.$store.dispatch("initAdminAgents",s).then(function(n){t.total=Number(n.totalrows),t.isLoading=!1},function(n){t.$notify({message:n,type:"error"})})}}},o={render:function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",[t("section",{attrs:{id:"wrap"}},[t("h1",{staticClass:"userClass"},[n._v("代理商信息")]),n._v(" "),t("el-col",{staticClass:"formSearch",attrs:{span:24}},[t("el-form",{attrs:{inline:!0}},[t("el-form-item",[t("span",[n._v("代理商名称筛选:")])]),n._v(" "),t("el-form-item",[t("el-input",{attrs:{type:"text","auto-complete":"off",placeholder:"代理商名称",size:"small"},model:{value:n.userName,callback:function(e){n.userName=e},expression:"userName"}})],1),n._v(" "),t("el-form-item",[t("el-button",{attrs:{type:"primary",size:"small"},on:{click:n.search}},[n._v("查询")])],1)],1)],1),n._v(" "),t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:n.isLoading,expression:"isLoading"}],staticStyle:{width:"100%"},attrs:{data:n.adminAgentsList,"highlight-current-row":""}},[t("el-table-column",{attrs:{type:"expand"},scopedSlots:n._u([{key:"default",fn:function(e){return[t("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:""}},[t("el-form-item",{attrs:{label:"代理商编码:"}},[t("span",[n._v(n._s(e.row.sm_pi_ProxyInfoID))])]),n._v(" "),t("el-form-item",{attrs:{label:"代理商名称:"}},[t("span",[n._v(n._s(e.row.sm_pi_Name))])]),n._v(" "),t("el-form-item",{attrs:{label:"代理商身份证:"}},[t("span",[n._v(n._s(e.row.sm_pi_CertNo))])]),n._v(" "),t("el-form-item",{attrs:{label:"手机号码:"}},[t("span",[n._v(n._s(e.row.sm_pi_Telephone))])]),n._v(" "),t("el-form-item",{attrs:{label:"QQ:"}},[t("span",[n._v(n._s(e.row.sm_pi_QQ))])]),n._v(" "),t("el-form-item",{attrs:{label:"电子邮箱:"}},[t("span",[n._v(n._s(e.row.sm_pi_Email))])]),n._v(" "),t("el-form-item",{attrs:{label:"性别:"}},[t("span",[n._v(n._s(n._f("getSex")(e.row.sm_pi_Sex)))])]),n._v(" "),t("el-form-item",{attrs:{label:"地址:"}},[t("span",[n._v(n._s(e.row.sm_pi_Address))])]),n._v(" "),t("el-form-item",{attrs:{label:"注册成立时间:"}},[t("span",[n._v(n._s(e.row.sm_pi_RegTime))])]),n._v(" "),t("el-form-item",{attrs:{label:"注册资金:"}},[t("span",[n._v(n._s(e.row.sm_pi_RegMoney))])]),n._v(" "),t("el-form-item",{attrs:{label:"营业执照号:"}},[t("span",[n._v(n._s(e.row.sm_pi_CertNo))])]),n._v(" "),t("el-form-item",{attrs:{label:"证件有效期:"}},[t("span",[n._v(n._s(e.row.sm_pi_CertExpireTo))])]),n._v(" "),t("el-form-item",{attrs:{label:"营业执照扫描件 :"}},n._l(e.row.sm_pi_CertImage,function(n){return t("img",{directives:[{name:"show",rawName:"v-show",value:e.row.sm_pi_CertImage.length,expression:"props.row.sm_pi_CertImage.length"}],staticStyle:{width:"100px",height:"100px"},attrs:{src:n,alt:""}})})),n._v(" "),t("el-form-item",{attrs:{label:"税务登记号 :"}},[t("span",[n._v(n._s(e.row.sm_pi_FeeNo))])]),n._v(" "),t("el-form-item",{attrs:{label:"税务登记证扫描件 :"}},n._l(e.row.sm_pi_FeeImage,function(n){return t("img",{directives:[{name:"show",rawName:"v-show",value:e.row.sm_pi_FeeImage.length,expression:"props.row.sm_pi_FeeImage.length"}],staticStyle:{width:"100px",height:"100px"},attrs:{src:n,alt:""}})}))],1)]}}])}),n._v(" "),t("el-table-column",{attrs:{label:"代理商编码",prop:"sm_pi_ProxyInfoID"}}),n._v(" "),t("el-table-column",{attrs:{label:"代理商名称",prop:"sm_pi_Name"}}),n._v(" "),t("el-table-column",{attrs:{label:"代理商手机号码",prop:"sm_pi_Telephone"}}),n._v(" "),t("el-table-column",{attrs:{label:"操作"},scopedSlots:n._u([{key:"default",fn:function(e){return[t("el-button",{directives:[{name:"show",rawName:"v-show",value:1!=e.row.sm_pi_IsPass,expression:"scope.row.sm_pi_IsPass!=1"}],attrs:{size:"mini",type:"primary"},on:{click:function(t){n.agents(e.row.sm_pi_ProxyInfoID)}}},[n._v("审核\n          ")])]}}])})],1),n._v(" "),t("div",{staticClass:"block",staticStyle:{float:"right"}},[t("el-pagination",{directives:[{name:"show",rawName:"v-show",value:n.total,expression:"total"}],attrs:{"page-size":5,layout:"total, prev, pager, next",total:n.total},on:{"current-change":n.handleCurrentChange}})],1)],1),n._v(" "),t("el-dialog",{attrs:{title:"审核状态",visible:n.approvalStatusDialog},on:{"update:visible":function(e){n.approvalStatusDialog=e}}},[t("el-form",{attrs:{model:n.options}},[t("el-form-item",{attrs:{label:"审核状态:","label-width":n.formLabelWidth}},[t("el-radio",{attrs:{label:"1"},model:{value:n.options.isPass,callback:function(e){n.$set(n.options,"isPass",e)},expression:"options.isPass"}},[n._v("审核成功")]),n._v(" "),t("el-radio",{attrs:{label:"2"},model:{value:n.options.isPass,callback:function(e){n.$set(n.options,"isPass",e)},expression:"options.isPass"}},[n._v("审核失败")])],1),n._v(" "),t("el-form-item",{directives:[{name:"show",rawName:"v-show",value:1!=n.options.isPass,expression:"options.isPass!=1"}],attrs:{label:"审核失败原因:","label-width":n.formLabelWidth}},[t("el-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:6},placeholder:"请输入内容"},model:{value:n.options.failReason,callback:function(e){n.$set(n.options,"failReason",e)},expression:"options.failReason"}})],1),n._v(" "),t("el-form-item",{directives:[{name:"show",rawName:"v-show",value:2!=n.options.isPass,expression:"options.isPass!=2"}],attrs:{label:"提成比例:","label-width":n.formLabelWidth}},[t("el-input",{attrs:{placeholder:"请输入数字",type:"number"},model:{value:n.options.getPercent,callback:function(e){n.$set(n.options,"getPercent",e)},expression:"options.getPercent"}})],1)],1),n._v(" "),t("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(e){n.approvalStatusDialog=!1}}},[n._v("取 消")]),n._v(" "),t("el-button",{attrs:{type:"primary"},on:{click:n.agentsStatusSubmit}},[n._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var i=t("VU/8")(a,o,!1,function(n){t("b0GZ")},"data-v-0fbfeb96",null);e.default=i.exports}});