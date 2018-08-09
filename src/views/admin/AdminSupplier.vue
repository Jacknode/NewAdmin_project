<template>
  <div>
    <section id="wrap">
      <h1 class="userClass">供应商信息</h1>
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>供应商名称筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-input type="text" v-model="userName" auto-complete="off" placeholder="供应商名称" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="statusValue" placeholder="请选择审核状态" size="small">
              <el-option
                v-for="item in ApprovalStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search" size="small">查询</el-button>
            <!--<el-button type="primary" @click="next">下一步</el-button>-->
            <!--<el-button type="primary" @click="addAdminBusinessInformation">新增</el-button>-->
          </el-form-item>
        </el-form>
      </el-col>

      <!--数据展示-->
      <el-table
        :data="adminSupplierList"
        highlight-current-row
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="供应商编号:">
                <span>{{ props.row.sm_ai_ID }}</span>
              </el-form-item>
              <!--<el-form-item label="供应商商户号:">-->
              <!--<span>{{ props.row.agentInfo.sm_ai_AgentID }}</span>-->
              <!--</el-form-item>-->
              <!--<el-form-item label="供应商名称:">-->
              <!--<span>{{ props.row.agentInfo.sm_ai_Name }}</span>-->
              <!--</el-form-item>-->
              <el-form-item label="供应商手机号码:">
                <span>{{ props.row.sm_ai_Telephone }}</span>
              </el-form-item>
              <!--<el-form-item label="性别:">-->
              <!--<span>{{ props.row.sm_ai_Sex | getSex }}</span>-->
              <!--</el-form-item>-->
              <!--<el-form-item label="固定电话:">-->
              <!--<span>{{ props.row.sm_ai_FixPhoneAreaCode + "-" + props.row.agentInfo.sm_ai_FixPhoneContryCode}}</span>-->
              <!--</el-form-item>-->
              <!--<el-form-item label="QQ:">-->
              <!--<span>{{ props.row.sm_ai_QQ }}</span>-->
              <!--</el-form-item>-->
              <!--<el-form-item label="传真:">-->
              <!--<span>{{ props.row.sm_ai_FaxNo}}</span>-->
              <!--</el-form-item>-->
              <!--<el-form-item label="电子邮箱:">-->
              <!--<span>{{ props.row.sm_ai_Email}}</span>-->
              <!--</el-form-item>-->
              <el-form-item label="公司名称:">
                <span>{{ props.row.sm_ai_GoodName}}</span>
              </el-form-item>
              <!--<el-form-item label="获许经营范围:">-->
              <!--<span v-for="item in props.row.agentInfoScopeList" style="margin-right: 10px">{{item.sm_ts_Name}}</span>-->
              <!--</el-form-item>-->
              <el-form-item label="公司地址:">
                <span>{{ props.row.sm_ai_Address}}</span>
              </el-form-item>
              <el-form-item label="注册成立时间:">
                <span>{{ props.row.sm_ai_RegTime}}</span>
              </el-form-item>
              <el-form-item label="注册资金:">
                <span>{{ props.row.sm_ai_RegMoney}}万元</span>
              </el-form-item>
              <el-form-item label="公司规模:">
                <span>{{ props.row.sm_ai_CompanyPersons}}</span>
              </el-form-item>
              <el-form-item label="结算币种:">
                <span>{{ props.row.sm_ai_BalanceCurrencyName}}</span>
              </el-form-item>
              <!--<el-form-item label="合作类型:">-->
              <!--<span v-for="item in props.row.agentInfoTypeList" style="margin-right: 10px">{{item.sm_cp_PartnerTypeName}}</span>-->
              <!--</el-form-item>-->

              <el-form-item label="优势产品说明:">
                <span>{{ props.row.sm_ai_GoodIntroduce}}</span>
              </el-form-item>
              <el-form-item label="已合作的网销渠道:">
                <span>{{ props.row.sm_ai_PartnerWay}}</span>
              </el-form-item>
              <el-form-item label="是否三证合一:">
                <span>{{ props.row.sm_ai_IncludeCert | getIncludeCert}}</span>
              </el-form-item>
              <el-form-item label="营业执照号:">
                <span>{{ props.row.sm_ai_CertNo}}</span>
              </el-form-item>
              <el-form-item label="证件有效期 :">
                <span>{{ props.row.sm_ai_CertExpireTo}}</span>
              </el-form-item>
              <el-form-item label="营业执照扫描件 :">
                <img :src="item" alt="" v-for="item in props.row.sm_ai_CertImage"
                     style="width: 100px;height: 100px" v-show="props.row.sm_ai_CertImage.length">
              </el-form-item>
              <el-form-item label="税务登记号 :">
                <span>{{ props.row.sm_ai_FeeNo}}</span>
              </el-form-item>
              <el-form-item label="税务登记证扫描件 :">
                <img :src="item" alt="" v-for="item in props.row.sm_ai_FeeImage"
                     style="width: 100px;height: 100px" v-show="props.row.sm_ai_FeeImage.length">
              </el-form-item>
              <el-form-item label="审核状态 :">
                <span>{{ props.row.sm_ai_IsPass | getPass}}</span>
              </el-form-item>
              <el-form-item label="审核失败原因:">
                <span>{{ props.row.sm_ai_FailReason}}</span>
              </el-form-item>
              <el-form-item label="创建时间 :">
                <span>{{ props.row.sm_ai_CreateTime}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="供应商编号"
          prop="sm_ai_ID">
        </el-table-column>
        <el-table-column
        label="供应商名称"
        prop="userName">
        </el-table-column>
        <el-table-column
          label="供应商手机号码"
          prop="sm_ai_Telephone">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              v-if="scope.row.sm_ai_IsPass!=1"
              @click="approval(scope.row.sm_ai_ID)">审核
            </el-button>
            <span v-else>已审核</span>
            <!--<el-button-->
            <!--size="mini"-->
            <!--type="danger"-->
            <!--@click="deleteAdminSupplier(scope.row.agentInfo.sm_ai_ID)">删除-->
            <!--</el-button>-->
          </template>
        </el-table-column>
      </el-table>

      <!--分页-->
      <div class="block" style="float: right;">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="total"
          v-show="total"
        >
        </el-pagination>
      </div>
    </section>

    <el-dialog title="审核状态" :visible.sync="approvalStatusDialog">
      <el-form :model="approvalOptions">
        <el-form-item label="审核状态:" :label-width="formLabelWidth">
          <el-radio v-model="approvalOptions.IsPass" label="1">审核成功</el-radio>
          <el-radio v-model="approvalOptions.IsPass" label="2">审核失败</el-radio>
        </el-form-item>
        <el-form-item label="审核失败原因:" :label-width="formLabelWidth" v-show="approvalOptions.IsPass!=1">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 6}"
            placeholder="请输入内容"
            v-model="approvalOptions.failReason">
          </el-input>
        </el-form-item>
        <el-form-item label="提成比例:" :label-width="formLabelWidth" v-show="approvalOptions.IsPass!=2">
          <el-input v-model="approvalOptions.payPercent" placeholder="请输入数字" type="number"></el-input>
        </el-form-item>
        <!--<el-form-item label="供应商密码:" :label-width="formLabelWidth" v-show="approvalOptions.IsPass!=2">-->
        <!--<el-input v-model="approvalOptions.agentPassword" placeholder="请输入商户编号"></el-input>-->
        <!--</el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="approvalStatusDialog = false">取 消</el-button>
        <el-button type="primary" @click="approvalStatusSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    name: '',
    data() {
      return {
        approvalStatusDialog: false,//审核状态
        statusValue: '',
        total: 0,
        userName: '',
        isLoading: false,
        status: 1,//审核成功
        sm_ai_ID: '',//供应商编号
        formLabelWidth: '120px',
        approvalOptions: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "sm_ai_ID": '',    //商户号
          "IsPass": '1',
          payPercent: '',
          failReason: '',//审核失败原因
          "agentCode": "",//供应商商号
          "agentPassword": "",//供应商密码
          "reviewPerson": "huileyou"
        },
        ApprovalStatus: [
          {
            value: 0,
            label: '待审核'
          },
          {
            value: 1,
            label: '审核成功'
          },
          {
            value: 2,
            label: '审核失败'
          },
        ],//审核状态
      }
    },
    computed: mapGetters([
      'adminSupplierList'
    ]),
    created() {
      this.initData('', 1)
    },
    methods: {
      //分页
      handleCurrentChange(num) {
        this.initData(this.userName.trim(), num,this.statusValue)
      },
      initData(name, page, status) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          userName:name?name:'',
          "sm_ai_ID": '',
          "page": page?page:1,
          "rows": 10,

        };
        if (status == 0) {
          options.sm_ai_IsPass = 0;
        }
        this.isLoading = true;
        this.$store.dispatch('initAdminSupplier', options)
          .then(data => {
            this.total = Number(data.totalrows);
            this.isLoading = false;
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },
      //查询
      search() {
        console.log()
        this.initData(this.userName.trim(), 1, this.statusValue)
      },
      //审核
      approval(id) {
        this.$store.commit('setTranstionFalse');
        this.approvalStatusDialog = true;
        this.sm_ai_ID = id;
      },
      //审核提交
      approvalStatusSubmit() {
        if (Number(this.approvalOptions.payPercent) >= 1) {
          this.$notify({
            message: '提成比例请输入小于1的小数',
            type: 'error'
          });
          return
        }
        if (this.approvalOptions.IsPass == 1) {
          this.approvalOptions.failReason = ''
        }
        if (this.approvalOptions.IsPass == 2) {
          this.approvalOptions.payPercent = ''
        }

        this.approvalOptions.sm_ai_ID = this.sm_ai_ID
        this.$store.dispatch('GetApproval', this.approvalOptions)
          .then(success => {
            this.$notify({
              message: success,
              type: 'success'
            });
            this.initData(this.userName.trim())
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
        this.approvalStatusDialog = false;
      }
    },
  }
</script>
<style scoped>

</style>
