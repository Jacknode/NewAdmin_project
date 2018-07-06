<template>
  <div>
    <div id="wrap" class="clearfix">
      <h1 class="userClass">教育订单</h1>

      <!--查询栏-->

      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>订单筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-input v-model="siteNum" size="mini"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search" size="mini">查询</el-button>

          </el-form-item>
        </el-form>
      </el-col>

      <!--数据展示-->

      <el-table
        :data="educationOrderManagement"
        style="width: 100%">

        <el-table-column
          label="系列标号"
          align="center"
          prop="ed_ss_ID">
        </el-table-column>
        <el-table-column
          label="订单产品名称"
          align="center"
          prop="ed_ss_IDName">
        </el-table-column>
        <el-table-column
          label="用户编码"
          align="center"
          prop="ed_oi_UserIF">
        </el-table-column>
        <el-table-column
          label="支付状态"
          align="center"
          prop="ed_oi_PayState">
        </el-table-column>
        <el-table-column label="操作" align="center" style="width: 1000px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="frozen(scope.row)">{{scope.row.ed_oi_status | getFrozenStatus}}
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="Delete(scope.row.ed_oi_ID)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>



      <el-dialog title="冻结订单" :visible.sync="frozenDialog">
        <el-form :model="frozenOptions">
          <el-form-item label="冻结确认:" :label-width="formLabelWidth">
            <el-radio v-model="frozenOptions.ed_oi_status" label="1" >冻结</el-radio>
            <!--<el-radio v-model="frozenOptions.ed_oi_status" label="0">解冻</el-radio>-->

          </el-form-item>


        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="frozenDialog = false">取 消</el-button>
          <el-button type="primary" @click="frozenSubmit">确 定</el-button>
        </div>
      </el-dialog>


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
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    name: '',
    data(){
      return {
        total:0,
        siteNum:'',
        radio:1,
        formLabelWidth: '120px',
        frozenDialog:false,
        addDialog:false,

        frozenOptions: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "page": "1",
          "rows": "10",

          "ed_oi_ID": "",//系列编号
          "ed_oi_PasserID":"",  //管理员编码
          "ed_oi_status":"", //冻结状态（0未冻结，1冻结确认）
        },
        addOptions:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "ed_ss_ID": "",//系列编号
            "ed_oi_UserIF": "",//用户编码
            "ed_oi_AgentID": "",//供应商编码
            "ed_oi_Price": "",//订单价格
            "ed_oi_PayState": "",//支付状态（1未支付，2已支付)
            "ed_oi_Difference": "",//视频和系列的区分（1视频，2系列）
          }
        },
      }
    },
    computed: mapGetters([
      'educationOrderManagement'
    ]),
    created(){

      this.initData(this.siteNum)
    },
    methods: {

      //分页
      handleCurrentChange(num){
        this.initData(this.siteNum,num)
      },
      //初始化
      initData(id,page){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "ed_ss_ID": id,//系列编号
          "ed_oi_UserIF": "",//用户编码
          "ed_oi_PayState": "",//支付状态（1未支付，2已支付)
          "ed_oi_Difference": "",//视频和系列的区分（1视频，2系列）
          "page":page?page:1,//页码编号
          "rows":"5",//单页显示数量
        }
        this.isLoading = true;
        this.$store.dispatch('initEducationOrderManagement',options)
          .then((total) => {
            this.total = total
            this.isLoading  = false
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },
      //查询
      search(){
        this.initData(this.siteNum)
      },
      //冻结
      frozen(val){
        console.log(val)
        let admin = JSON.parse(sessionStorage.getItem('admin'));
        this.frozenOptions.ed_oi_PasserID =admin.sm_ui_ID;
        this.frozenOptions.ed_oi_ID=val.ed_oi_ID,
        this.frozenDialog=true

  },
      //冻结提交
      frozenSubmit(){
        this.$store.dispatch('frozenEducationOrder',this.frozenOptions)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.siteNum)
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
        this.frozenDialog=false
      },
      //删除
      Delete(id){
        let deleteOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "ed_oi_ID": id,//标识
          }
        };
        this.$store.dispatch('deleteEducationOrderManagement',deleteOptions)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.siteNum)
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
      },
    },
  }
</script>
<style scoped>

</style>
