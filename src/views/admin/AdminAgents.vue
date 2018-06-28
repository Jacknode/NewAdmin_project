<template>
  <div>
    <section id="wrap">
      <h1 class="userClass">代理商信息</h1>
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>代理商名称筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-input type="text" v-model="userName" auto-complete="off" placeholder="代理商名称" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search" size="small">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--数据展示-->
      <el-table
        :data="adminAgentsList"
        highlight-current-row
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="代理商编码:">
                <span>{{ props.row.sm_pi_ProxyInfoID }}</span>
              </el-form-item>
              <el-form-item label="代理商名称:">
                <span>{{ props.row.sm_pi_Name }}</span>
              </el-form-item>
              <el-form-item label="代理商身份证:">
                <span>{{ props.row.sm_pi_CertNo }}</span>
              </el-form-item>
              <el-form-item label="手机号码:">
                <span>{{ props.row.sm_pi_Telephone }}</span>
              </el-form-item>
              <el-form-item label="QQ:">
                <span>{{ props.row.sm_pi_QQ }}</span>
              </el-form-item>
              <el-form-item label="电子邮箱:">
                <span>{{ props.row.sm_pi_Email }}</span>
              </el-form-item>
              <el-form-item label="性别:">
                <span>{{ props.row.sm_pi_Sex | getSex }}</span>
              </el-form-item>
              <el-form-item label="地址:">
                <span>{{ props.row.sm_pi_Address }}</span>
              </el-form-item>
              <el-form-item label="注册成立时间:">
                <span>{{ props.row.sm_pi_RegTime }}</span>
              </el-form-item>
              <el-form-item label="注册资金:">
                <span>{{ props.row.sm_pi_RegMoney }}</span>
              </el-form-item>
              <el-form-item label="营业执照号:">
                <span>{{ props.row.sm_pi_CertNo }}</span>
              </el-form-item>
              <el-form-item label="证件有效期:">
                <span>{{ props.row.sm_pi_CertExpireTo }}</span>
              </el-form-item>
              <el-form-item label="营业执照扫描件 :">
                <img :src="item" alt="" v-for="item in props.row.sm_pi_CertImage"
                     style="width: 100px;height: 100px" v-show="props.row.sm_pi_CertImage.length">
              </el-form-item>
              <el-form-item label="税务登记号 :">
                <span>{{ props.row.sm_pi_FeeNo}}</span>
              </el-form-item>
              <el-form-item label="税务登记证扫描件 :">
                <img :src="item" alt="" v-for="item in props.row.sm_pi_FeeImage"
                     style="width: 100px;height: 100px" v-show="props.row.sm_pi_FeeImage.length">
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="代理商编码"
          prop="sm_pi_ProxyInfoID">
        </el-table-column>
        <el-table-column
          label="代理商名称"
          prop="sm_pi_Name">
        </el-table-column>
        <el-table-column
          label="代理商手机号码"
          prop="sm_pi_Telephone">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              v-show="scope.row.sm_pi_IsPass!=1"
              @click="agents(scope.row.sm_pi_ProxyInfoID)">审核
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <div class="block" style="float: right;">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="5"
          layout="total, prev, pager, next"
          :total="total"
          v-show="total"
        >
        </el-pagination>
      </div>
    </section>
    <el-dialog title="审核状态" :visible.sync="approvalStatusDialog">
      <el-form :model="options">
        <el-form-item label="审核状态:" :label-width="formLabelWidth">
          <el-radio v-model="options.isPass" label="1">审核成功</el-radio>
          <el-radio v-model="options.isPass" label="2">审核失败</el-radio>
        </el-form-item>
        <el-form-item label="审核失败原因:" :label-width="formLabelWidth" v-show="options.isPass!=1">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 6}"
            placeholder="请输入内容"
            v-model="options.failReason">
          </el-input>
        </el-form-item>
        <el-form-item label="提成比例:" :label-width="formLabelWidth" v-show="options.isPass!=2">
          <el-input v-model="options.getPercent" placeholder="请输入数字" type="number"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="approvalStatusDialog = false">取 消</el-button>
        <el-button type="primary" @click="agentsStatusSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    name: '',
    data(){
      return {
        formLabelWidth:'120px',
        userName:'',
        isLoading:false,
        total:0,
        approvalStatusDialog:false,
        proxyID:'',
        options :{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "proxyID": "",    //商户号
          "isPass": '1',   //1审核成功  2审核失败
          "failReason": "",//审核失败原因
          "getPercent": '',//代理商的提成比例  --可不填  不填默认从省 市  类型里面去选择
          'reviewPerson':'huileyou'
        }
      }
    },
    computed: mapGetters([
      'adminAgentsList'
    ]),
    created(){
      this.initData('',1)
    },
    methods: {
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);
      },
      //审核
      agents(id){
        this.$store.commit('setTranstionFalse');
        this.approvalStatusDialog = true;
        this.proxyID = id;
      },
      //审核提交
      agentsStatusSubmit(){
        if(Number(this.options.getPercent)>=1){
          this.$notify({
            message: '提成比例请输入小于1的小数',
            type: 'error'
        });
          return
        }
        if(this.options.isPass==1){
          this.options.failReason = ''
        }
        if(this.options.isPass==2){
          this.options.getPercent = ''
        }
        this.options.proxyID = this.proxyID
        this.$store.dispatch('checkProxyInfo',this.options)
        .then(success=>{
          this.$notify({
            message: success,
            type: 'success'
          });
          this.initData(this.userName.trim())
        },err=>{
          this.$notify({
            message: err,
            type: 'error'
          });
        })
        this.approvalStatusDialog = false;
      },
      //分页
      handleCurrentChange(num){
        this.initData('',num)
      },
      //查询
      search(){
        this.initData(this.userName.trim())
      },
      initData(name,page){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "proxyID": "",
          proxyName:name?name:'',
          "page": page?page:1,
          "row":5,
        };
        this.isLoading = true
        this.$store.dispatch('initAdminAgents',options)
        .then(data=>{
           this.total = Number(data.totalrows);
           this.isLoading = false;
        },err=>{
          this.$notify({
            message: err,
            type: 'error'
          });
        })
      }
    },
  }
</script>
<style scoped>
</style>
