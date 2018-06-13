<template>
  <div>
    <section id="wrap">
      <h1 class="userClass">代理商利润管理</h1>

      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>代理商利润筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-input type="text" v-model="userName" auto-complete="off" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search" size="small">查询</el-button>
            <!--<el-button type="primary" @click="next">下一步</el-button>-->
            <el-button type="primary" @click="addAdminAgentsProfit" size="small">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--数据展示-->
      <el-table
        :data="adminAgentsProfitList"
        highlight-current-row
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column
          align="center"
          label="利润编号"
          sortable
          prop="sm_al_ID"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="合作类型"
          prop="sm_cp_Name"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="代理级别"
          prop="sm_al_ProxyLevel"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="利润比例"
        >
          <template slot-scope="scope">
            <span>{{parseInt(scope.row.sm_al_Percent*100)}}%</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"  align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="Update(scope.row.sm_al_ID)">修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="Delete(scope.row.sm_al_ID)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--分页-->
      <div class="block" style="float: right;padding: 10px 0">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="5"
          layout="total, prev, pager, next"
          :total="total"
          v-show="total"
        >
        </el-pagination>
      </div>

      <!--添加代理商利润-->
      <el-dialog title="添加代理商利润" :visible.sync="addDialog">
        <el-form :model="addOptions">
          <el-form-item label="合作类型:" :label-width="formLabelWidth">
            <el-select v-model="addOptions.data.sm_cp_ID" placeholder="请选择合作类型">
              <el-option
                v-for="item in partnershipTypeList"
                :key="item.sm_cp_ID"
                :label="item.sm_cp_Name"
                :value="item.sm_cp_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="代理级别:" :label-width="formLabelWidth">
            <el-radio-group v-model="addOptions.data.sm_al_ProxyLevel">
              <el-radio :label="1">一级代理</el-radio>
              <el-radio :label="2">二级代理</el-radio>
              <el-radio :label="3">三级代理</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="提成利润:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.sm_al_Percent" placeholder="请输入数字" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addAdminVendorProfitSubmit">确 定</el-button>
        </div>
      </el-dialog>

      <!--修改代理商利润-->
      <el-dialog title="修改代理商利润" :visible.sync="updateDialog">
        <el-form :model="updateAdminAgentsProfitObj">
          <el-form-item label="合作类型:" :label-width="formLabelWidth">
            <el-select v-model="updateAdminAgentsProfitObj.sm_cp_ID" placeholder="请选择合作类型">
              <el-option
                v-for="item in partnershipTypeList"
                :key="item.sm_cp_ID"
                :label="item.sm_cp_Name"
                :value="item.sm_cp_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="代理级别:" :label-width="formLabelWidth">
            <el-radio-group v-model="updateAdminAgentsProfitObj.sm_al_ProxyLevel">
              <el-radio :label="1">一级代理</el-radio>
              <el-radio :label="2">二级代理</el-radio>
              <el-radio :label="3">三级代理</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="提成利润:" :label-width="formLabelWidth">
            <el-input v-model="updateAdminAgentsProfitObj.sm_al_Percent" placeholder="请输入数字" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateDialog = false">取 消</el-button>
          <el-button type="primary" @click="updateAdminVendorProfitSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </section>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    name: '',
    data(){
      return {
        userName:'',
        total:0,
        isLoading:false,
        addDialog:false,//添加弹窗
        updateDialog:false,//修改弹窗
        formLabelWidth:'120px',
        addOptions:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "sm_cp_ID": '',//合作类型
            "sm_al_ProxyLevel": '',//(1.区域代理,2.省代理,3市代理)
            "sm_al_Percent": '',
          }
        }
      }
    },
    computed: mapGetters([
      'partnershipTypeList',
      'adminAgentsProfitList',
      'updateAdminAgentsProfitObj'
    ]),
    created(){
      this.initData(1)
      //查询合作类型
      let options = {
        "loginUserID": "huileyou",
        "loginUserPass": "123",
        "operateUserID": "",
        "operateUserName": "",
        "pcName": "",
        "sm_cp_ID": "",
        "sm_cp_Name": "",
        "sm_cp_IsDelete": 0
      };
       this.$store.dispatch('initPartnershipType',options)
        .then(()=>{},err=>{
           this.$notify({
             message: err,
             type: 'error'
           });
         })
    },
    methods: {
      //分页
      handleCurrentChange(num){
        this.initData(num)
      },
      initData(page){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "sm_al_ID": "",//级别编码
          "sm_cp_ID": "",//合作类型编码
          "sm_al_ProxyLevel": "",//代理商级别(1.区域代理,2.省代理,3市代理)
          "page": page?page:1,
          "rows": 5,
        }
        this.isLoading = true;
        this.$store.dispatch('initAdminAgentsProfit',options)
        .then(total=>{
          this.total = total;
          this.isLoading = false;
        },err=>{
          this.$notify({
            message: err,
            type: 'error'
          });
        })
      },
      //查询
      search(){
        this.initData(1)
      },
      //添加
      addAdminAgentsProfit(){
        this.addDialog = true;
        this.$store.commit('setTranstionFalse');
      },
      //添加提交
      addAdminVendorProfitSubmit(){
        if(Number(this.addOptions.data.sm_al_Percent)>=1||Number(this.addOptions.data.sm_al_Percent)<0||isNaN(this.addOptions.data.sm_al_Percent)){
          this.$notify({
            message: '提成比例请输入0~1的小数',
            type: 'error'
          });
          return
        }
        this.$store.dispatch('AddAdminVendorProfit',this.addOptions)
        .then((suc)=>{
          this.$notify({
            message: suc,
            type: 'success'
          });
          this.initData(1)
        },err=>{
          this.$notify({
            message: err,
            type: 'error'
          });
        })
        this.addDialog = false;
      },
      //修改
      Update(id){
        this.updateDialog = true;
        this.$store.commit('setTranstionFalse');
        this.$store.commit('initUpdateAdminAgentsProfitObj',id)
      },
      //修改提交
      updateAdminVendorProfitSubmit(){
        if(Number(this.updateAdminAgentsProfitObj.sm_al_Percent)>=1||Number(this.updateAdminAgentsProfitObj.sm_al_Percent)<0||isNaN(this.updateAdminAgentsProfitObj.sm_al_Percent)){
          this.$notify({
            message: '提成比例请输入0~1的小数',
            type: 'error'
          });
          return
        }
        delete this.updateAdminAgentsProfitObj.sm_cp_Name
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": this.updateAdminAgentsProfitObj
        }
        this.$store.dispatch('UpdateAdminVendorProfit',options)
        .then((suc)=>{
          this.$notify({
            message: suc,
            type: 'success'
          });
          this.initData(1)
        },err=>{
          this.$notify({
            message: err,
            type: 'error'
          });
        })
        this.updateDialog = false;
      },
      //删除
      Delete(id){
        let deleteOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "ID": id////级别编码
        }
        this.$store.dispatch('DeleteAdminVendorProfit',deleteOptions)
          .then((suc)=>{
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(1)
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
