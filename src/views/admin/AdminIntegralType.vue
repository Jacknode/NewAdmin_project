<template>
  <div>
    <section id="wrap">
      <h1 class="userClass">积分类型信息</h1>
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
          </el-form-item>
        </el-form>
      </el-col>
      <!--数据展示-->
      <el-table
        :data="adminIntegralTypeList"
        highlight-current-row
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column
          label="积分类型编号"
          prop="sm_ust_ID"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="积分类型名称"
          prop="sm_ust_Name"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="积分类型备注"
          prop="sm_ust_Remark"
          align="center"
        >
        </el-table-column>
        <el-table-column label="操作"  align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="Update(scope.row.sm_ust_ID)">修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="Delete(scope.row.sm_ust_ID)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>


      <!--添加-->
      <el-dialog title="添加积分类型" :visible.sync="addDialog">
        <el-form :model="addOptions">
          <el-form-item label="积分权重:" :label-width="formLabelWidth">
            <el-select v-model="addOptions.data.sm_ust_HeightID" placeholder="请选择">
              <el-option
                v-for="item in adminIntegralWeightList"
                :key="item.sm_hm_ID"
                :label="item.sm_hm_HeightName"
                :value="item.sm_hm_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="积分类型名称:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.sm_ust_Name" placeholder="请输入积分类型名称"></el-input>
          </el-form-item>
          <el-form-item label="积分类型备注:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.sm_ust_Remark" placeholder="请输入积分类型备注"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addAdminIntegralTypeSubmit">确 定</el-button>
        </div>
      </el-dialog>

      <!--修改-->
      <el-dialog title="修改积分类型" :visible.sync="updateDialog">
        <el-form :model="updateAdminIntegralTypeObj">
          <el-form-item label="积分权重:" :label-width="formLabelWidth">
            <el-select v-model="updateAdminIntegralTypeObj.sm_ust_HeightID" placeholder="请选择">
              <el-option
                v-for="item in adminIntegralWeightList"
                :key="item.sm_hm_ID"
                :label="item.sm_hm_HeightName"
                :value="item.sm_hm_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="积分类型名称:" :label-width="formLabelWidth">
            <el-input v-model="updateAdminIntegralTypeObj.sm_ust_Name" placeholder="请输入积分类型名称"></el-input>
          </el-form-item>
          <el-form-item label="积分类型备注:" :label-width="formLabelWidth">
            <el-input v-model="updateAdminIntegralTypeObj.sm_ust_Remark" placeholder="请输入积分类型备注"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateDialog = false">取 消</el-button>
          <el-button type="primary" @click="updateAdminIntegralTypeSubmit">确 定</el-button>
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
            "sm_ust_HeightID": '',
            "sm_ust_Name": "",
            "sm_ust_Remark": "",
          }
        }
      }
    },
    computed: mapGetters([
      'adminIntegralTypeList',
      'adminIntegralWeightList',
      'updateAdminIntegralTypeObj'
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
          "page": page?page:1,
          "rows": 5,
        };
        this.isLoading = true;
        this.$store.dispatch('initAdminIntegralType',options)
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
      //添加
      Add(){
        this.$store.commit('setTranstionFalse');
        this.addDialog = true
      },
      //添加提交
      addAdminIntegralTypeSubmit(){
        this.$store.dispatch('AddAdminIntegralTypeSubmit',this.addOptions)
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
          });
        this.addDialog = false;
      },
      //修改
      Update(id){
        this.$store.commit('setTranstionFalse');
        this.updateDialog = true;
        this.$store.commit('initUpdateAdminIntegralTypeObj',id)
      },
      //修改提交
      updateAdminIntegralTypeSubmit(){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "sm_ust_ID": this.updateAdminIntegralTypeObj.sm_ust_ID,
            "sm_ust_HeightID": this.updateAdminIntegralTypeObj.sm_ust_HeightID,
            "sm_ust_Name": this.updateAdminIntegralTypeObj.sm_ust_Name,
            "sm_ust_Remark": this.updateAdminIntegralTypeObj.sm_ust_Remark,
          }
        };
        this.$store.dispatch('UpdateAdminIntegralTypeSubmit',options)
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
          });
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
        };
        this.$store.dispatch('DeleteAdminIntegralType',options)
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
