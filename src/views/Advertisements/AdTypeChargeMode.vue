<template>
  <div>
    <section id="wrap">
      <h1 class="userClass">广告类型收费方式</h1>
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>广告类型收费方式筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-input type="text" v-model="adTypeChargeMode" auto-complete="off" placeholder="广告类型收费方式标识" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search" size="small">查询</el-button>
            <el-button type="primary" @click="Add" size="small">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--数据展示-->
      <el-table
        :data="adTypeChargeModeList"
        highlight-current-row
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column
          align="center"
          label="广告类型收费方式标识"
          prop="sm_aicw_ID">
        </el-table-column>
        <el-table-column
          align="center"
          label="广告类型编码"
          prop="sm_at_ID">
        </el-table-column>
        <el-table-column
          align="center"
          label="收费方式编码"
          prop="sm_icw_ID">
        </el-table-column>
        <el-table-column
          align="center"
          label="广告类型"
          prop="sm_icw_Name">
        </el-table-column>
        <el-table-column
          align="center"
          label="备注"
          prop="sm_aicw_Remark">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="Update(scope.row.sm_aicw_ID)">修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="Delete(scope.row.sm_aicw_ID)">删除
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

      <!--添加广告类型收费方式-->
      <el-dialog title="添加广告类型收费方式" :visible.sync="addDialog">
        <el-form :model="addOptions">
          <el-form-item label="标识:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.sm_aicw_ID" placeholder="请输入广告类型收费方式标识" :disabled="isOff" ></el-input>
          </el-form-item>
          <el-form-item label="广告类型编码:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.sm_at_ID" placeholder="请输入广告类型编码"></el-input>
          </el-form-item>
          <el-form-item label="收费方式编码:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.sm_icw_ID" placeholder="请输入收费方式编码"></el-input>
          </el-form-item>
          <el-form-item label="备注:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.sm_aicw_Remark" placeholder="请输入备注" type="textarea" :rows="4"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>

      <!--修改广告类型收费方式-->
      <el-dialog title="修改广告类型收费方式" :visible.sync="updateDialog">
        <el-form :model="updateAdTypeChargeModeObj">
          <el-form-item label="标识:" :label-width="formLabelWidth">
            <el-input v-model="updateAdTypeChargeModeObj.sm_aicw_ID" placeholder="请输入广告类型收费方式标识"  :disabled="isOff"></el-input>
          </el-form-item>
          <el-form-item label="收费方式编码:" :label-width="formLabelWidth">
            <el-input v-model="updateAdTypeChargeModeObj.sm_icw_ID" placeholder="收费方式编码" ></el-input>
          </el-form-item>
          <el-form-item label="广告类型编码:" :label-width="formLabelWidth">
            <el-input v-model="updateAdTypeChargeModeObj.sm_at_ID" placeholder="广告类型编码" ></el-input>
          </el-form-item>
          <el-form-item label="备注:" :label-width="formLabelWidth">
            <el-input v-model="updateAdTypeChargeModeObj.sm_aicw_Remark" placeholder="备注" type="textarea" :rows="4"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateDialog = false">取 消</el-button>
          <el-button type="primary" @click="updateSubmit">确 定</el-button>
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
        isOff:true,
        formLabelWidth:'120px',
        isLoading:false,
        adTypeChargeMode:'',
        addDialog:false,
        updateDialog:false,
        total:0,
        addOptions:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "page": "1",
            "rows": "4",
            "sm_aicw_ID": "1",//广告类型收费方式标识
            "sm_icw_ID": "",//收费方式编码
            "sm_at_ID": "",//广告类型编码
            "sm_aicw_Remark": "",//备注
          }
        },
      }
    },
    computed: mapGetters([
      'adTypeChargeModeList',
      'updateAdTypeChargeModeObj'
    ]),
    created(){
      this.initData(this.adTypeChargeMode)
    },
    methods: {
      //分页
      handleCurrentChange(num){
        this.initData(this.adTypeChargeMode,num)
      },
      //查询
      search(){
        this.initData(this.adTypeChargeMode)
      },
      initData(name,page){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "sm_aicw_ID": name?name:"",//广告类型收费方式标识
          "sm_icw_ID": "",//收费方式编码
          "sm_at_ID": '',//广告类型编码
          "sm_aicw_Remark": "",//备注
          "page": page?page:1,
          "rows": 4
        };
        this.isLoading = true;
        this.$store.dispatch('initAdTypeChargeMode',options)
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
      //添加
      Add(){
        let obj = this.addOptions.data;
        obj.sm_icw_ID ='';
        obj.sm_at_ID ='';
        obj.sm_aicw_Remark ='';
        this.addDialog = true;
        this.$store.commit('setTranstionFalse');
      },
      //添加提交
      addSubmit(){
        this.$store.dispatch('AddAdTypeChargeMode',this.addOptions)
          .then((suc)=>{
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.adTypeChargeMode)
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
        this.updateDialog = true;
        this.$store.commit('setTranstionFalse');
        this.$store.commit('initUpdateAdTypeChargeMode',id)
      },
      //修改提交
      updateSubmit(){
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          // "data": this.updateAdTypeChargeModeObj
          "data": {
            "sm_aicw_ID":this.updateAdTypeChargeModeObj.sm_aicw_ID,
            "sm_aicw_Remark":this.updateAdTypeChargeModeObj.sm_aicw_Remark,
            "sm_at_ID":this.updateAdTypeChargeModeObj.sm_at_ID,
            "sm_icw_ID":this.updateAdTypeChargeModeObj.sm_icw_ID,
          }

        };
        this.$store.dispatch('UpdateAdTypeChargeMode',updateOptions)
          .then((suc)=>{
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.adTypeChargeMode)
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
        let deleteOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "sm_aicw_ID": id,//广告类型收费方式标识
          }
        };
        this.$store.dispatch('DeleteAdTypeChargeMode',deleteOptions)
          .then((suc)=>{
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.adTypeChargeMode)
          },err=>{
            this.$notify({
              message: err,
              type: 'error'
            });
          });
      }
    },
  }
</script>
<style scoped>

</style>
