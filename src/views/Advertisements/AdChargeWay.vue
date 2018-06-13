<template>
  <div>
    <section id="wrap">
      <h1 class="userClass">广告收费方式</h1>

      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>广告收费方式筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-input type="text" v-model="userName" auto-complete="off"size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search" size="small">查询</el-button>
            <el-button type="primary" @click="add" size="small">增加</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--数据展示-->
      <el-table
        :data="adChargeWayList"
        highlight-current-row
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column
          align="center"
          label="收费方式编码"
          prop="sm_icw_ID">
        </el-table-column>
        <el-table-column
          align="center"
          label="收费方式名称"
          prop="sm_icw_Name">
        </el-table-column>
        <el-table-column
          align="center"
          label="备注"
          prop="sm_icw_Remark">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="Update(scope.row.sm_icw_ID)">修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="Delete(scope.row.sm_icw_ID)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--添加-->
      <el-dialog title="添加广告类型" :visible.sync="addDialog">
        <el-form :model="addOptions">
            <el-form-item label="收费方式名称" :label-width="formLabelWidth">
              <el-select v-model="addOptions.data.sm_icw_Name" placeholder="请选择收费方式名称">
                <el-option label="按日收费" value="按日收费"></el-option>
                <el-option label="点击量" value="点击量"></el-option>
                <el-option label="下载量" value="下载量"></el-option>
              </el-select>
            </el-form-item>
          <el-form-item label="备注:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.sm_icw_Remark" placeholder="请输入备注" type="textarea" :rows="4"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>
      <!--修改-->
      <el-dialog title="修改支付方式" :visible.sync="updateDialog">
        <el-form :model="updateAdChargeWayObj">
          <el-form-item label="支付方式编码:" :label-width="formLabelWidth">
            <el-input v-model="updateAdChargeWayObj.sm_icw_ID" placeholder="请输入支付方式编码"  :disabled="isOff"></el-input>
          </el-form-item>
          <el-form-item label="支付方式名称" :label-width="formLabelWidth">
            <el-select v-model="updateAdChargeWayObj.sm_icw_Name" placeholder="请选择广告支付方式名称">
              <el-option label="按日收费" value="按日收费"></el-option>
              <el-option label="点击量" value="点击量"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注:" :label-width="formLabelWidth">
            <el-input v-model="updateAdChargeWayObj.sm_icw_Remark" placeholder="请输入备注" type="textarea" :rows="4"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateDialog = false">取 消</el-button>
          <el-button type="primary" @click="updateSubmit">确 定</el-button>
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
        isLoading:false,
        total:0,
        formLabelWidth:'120px',
        userName:'',
        isOff:true,
        addDialog:false,//添加弹窗
        updateDialog:false,//修改弹窗
        addOptions:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "sm_icw_ID": "1",//收费方式编码
            "sm_icw_Name": "",//收费方式名称
            "sm_icw_Remark": "",//备注
          }
        },//添加参数
      }
    },
    computed: mapGetters([
      'adChargeWayList',
      'updateAdChargeWayObj'
    ]),
    created(){
      this.initData('')
      this.initContent().then(()=>{},err=>{
        this.$notify({
          message: err,
          type: 'error'
        });
      })
    },
    methods: {

      async initContent(){
        //查询合作类型
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "sm_icw_ID": "",//收费方式编码
          "sm_icw_Name": "",//收费方式名称
          "sm_icw_Remark": "",//备注
        };
        await this.$store.dispatch('initAdChargeWayList',options)
      },
      //分页
      handleCurrentChange(num){
        this.initData(num)
      },
      //初始化
      initData(name,page){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "sm_icw_ID": "",//收费方式编码
          "sm_icw_Name": name?name:"",//收费方式名称
          "sm_icw_Remark": "",//备注
          "page": page?page:1,
          "rows": 5,
        }
        this.isLoading = true;
        this.$store.dispatch('initAdChargeWayList',options)
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
        this.initData(this.userName)
      },
      add(){
        this.addDialog=true;
        this.$store.commit('setTranstionFalse')
      },
      addSubmit(){
        this.$store.dispatch('addAdChargeWay',this.addOptions)
          .then((suc)=>{
            this.$notify({
              message:suc,
              type:"success"
            });
            this.initData(this.userName)
          },(err)=>{
            this.$notify({
              message:err,
              type:"error"
            })
          })
        this.addDialog=false;
      },
      Update(id){
        this.updateDialog=true;
        this.$store.commit('setTranstionFalse');
        this.$store.commit('initUpdateAdChargeWayObj',id)
      },
      updateSubmit(){
        let updateOptions={
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": this.updateAdChargeWayObj
        }
        // updateOptions.data.sm_icw_ID = updateOptions.data.sm_icw_ID+''
        this.$store.dispatch('UpdateAdChargeWay',updateOptions)
          .then((suc)=>{
            this.$notify({
              message:suc,
              type:"success"
            });
            this.initData(this.userName)
          },(err)=>{
            this.$notify({
              message:err,
              type:"error"
            })
          })
        this.updateDialog=false;
      },
      Delete(id){
        let deleteOptions={
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "sm_icw_ID": id,//收费方式编码
          }

        };
        this.$store.dispatch('deleteAdChargeWay',deleteOptions)
          .then((suc)=>{
            this.$notify({
              message:suc,
              type:"success"
            });
            this.initData(this.userName)
          },(err)=>{
            this.notify({
              message:err,
              type:"error"
            })
          })
      }
    },
  }
</script>
<style scoped>

</style>
