<template>
  <div>
    <section id="wrap">
      <h1 class="userClass">积分权重信息</h1>
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <!--<el-form-item>-->
            <!--<span>积分权重名称筛选:</span>-->
          <!--</el-form-item>-->
          <!--<el-form-item>-->
            <!--<el-input type="text" v-model="scoreName" auto-complete="off" placeholder="积分权重名称" size="small"></el-input>-->
          <!--</el-form-item>-->
          <el-form-item  style="float: right;padding-right: 20px">
            <el-button type="primary" @click="search" size="small">查询</el-button>
            <el-button type="primary" @click="Add" size="small">新增</el-button>
            <!--<button type="button" class="btn btn-primary">默认按钮</button>-->
          </el-form-item>
        </el-form>
      </el-col>
      <!--数据展示-->
      <el-table
        :data="adminIntegralWeightList"
        highlight-current-row
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column
          label="积分权重编号"
          prop="sm_hm_ID"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="积分权重名称"
          prop="sm_hm_HeightName"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="积分权重比例"
          prop="sm_hm_Percent"
          align="center"
        >
        </el-table-column>
        <el-table-column label="操作"  align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="Update(scope.row.sm_hm_ID)">修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="Delete(scope.row.sm_hm_ID)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--添加-->
      <el-dialog title="添加积分权重" :visible.sync="addDialog">
        <el-form :model="addOptions">
          <el-form-item label="积分权重名称:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.sm_hm_HeightName" placeholder="请输入积分权重名称"></el-input>
          </el-form-item>
          <el-form-item label="积分权重比例:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.sm_hm_Percent" placeholder="请输入积分权重比例"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addAdminIntegralWeightSubmit">确 定</el-button>
        </div>
      </el-dialog>
      <!--修改-->
      <el-dialog title="修改积分权重" :visible.sync="updateDialog">
        <el-form :model="updateAdminIntegralWeightObj">
          <el-form-item label="积分权重编号:" :label-width="formLabelWidth">
            <el-input v-model="updateAdminIntegralWeightObj.sm_hm_ID" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="积分权重名称:" :label-width="formLabelWidth">
            <el-input v-model="updateAdminIntegralWeightObj.sm_hm_HeightName" placeholder="请输入积分权重名称"></el-input>
          </el-form-item>
          <el-form-item label="积分权重比例:" :label-width="formLabelWidth">
            <el-input v-model="updateAdminIntegralWeightObj.sm_hm_Percent" placeholder="请输入积分权重比例"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateDialog = false">取 消</el-button>
          <el-button type="primary" @click="updateAdminIntegralWeightSubmit">确 定</el-button>
        </div>
      </el-dialog>
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
    </section>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    name: '',
    data(){
      return {
        total:0,
        scoreName:'',//权重名称
        isLoading:false,
        formLabelWidth:'120px',
        addDialog:false,//添加弹窗
        updateDialog:false,//修改弹窗
        addOptions:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "sm_hm_HeightName": "",
            "sm_hm_Percent": "",
          }
        }
      }
    },
    computed: mapGetters([
      'adminIntegralWeightList',
      'updateAdminIntegralWeightObj'
    ]),
    created(){
      this.initData('')
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
          //"sm_hm_ID": 1,
          //"sm_hm_HeightName": "",
          "sm_hm_IsDelete": 0,
          "page": page?page:1,
          "rows": 5,
        }
        this.isLoading = true;
        this.$store.dispatch('initAdminIntegralWeight',options)
        .then((total)=>{
        this.total = Number(total);
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
        this.initData()
      },
      Add(){
        this.$store.commit('setTranstionFalse');
        this.addDialog = true
      },
      //添加提交
      addAdminIntegralWeightSubmit(){
        this.$store.dispatch('AddAdminIntegralWeightSubmit',this.addOptions)
        .then((suc)=>{
          this.$notify({
            message: suc,
            type: 'success'
          });
          this.initData()
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
        this.$store.commit('setTranstionFalse');
        this.updateDialog = true;
        this.$store.commit('initUpdateAdminIntegralWeightObj',id)
      },
      //修改提交
      updateAdminIntegralWeightSubmit(){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "sm_hm_ID": this.updateAdminIntegralWeightObj.sm_hm_ID,
            "sm_hm_HeightName": this.updateAdminIntegralWeightObj.sm_hm_HeightName,
            "sm_hm_Percent": this.updateAdminIntegralWeightObj.sm_hm_Percent,
          }
        }
        this.$store.dispatch('UpdateAdminIntegralWeightSubmit',options)
        .then((suc)=>{
          this.$notify({
            message: suc,
            type: 'success'
          });
          this.initData()
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
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "ID": id
        }
        this.$store.dispatch('DeleteAdminIntegralWeight',options)
        .then((suc)=>{
          this.$notify({
            message: suc,
            type: 'success'
          });
          this.initData()
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
