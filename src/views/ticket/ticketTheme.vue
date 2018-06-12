<template>
  <div>
    <section id="wrap">
      <h1 class="userClass">门票主题</h1>
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>门票主题名称筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-input type="text" v-model="themeName" auto-complete="off" placeholder="门票主题名称" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search" size="small">查询</el-button>
            <el-button type="primary" @click="Add" size="small">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--数据展示-->
      <el-table
        :data="ticketThemeList"
        highlight-current-row
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column
          align="center"
          label="景点主题编码"
          prop="tm_tt_ID">
        </el-table-column>
        <el-table-column
          align="center"
          label="景点主题名称"
          prop="tm_tt_Name">
        </el-table-column>
        <el-table-column
          align="center"
          label="景点主题简介"
          prop="tm_tt_Remark">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="Update(scope.row.tm_tt_ID)">修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="Delete(scope.row.tm_tt_ID)">删除
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

      <!--添加门票主题-->
      <el-dialog title="添加门票主题" :visible.sync="addDialog">
        <el-form :model="addOptions">
          <el-form-item label="主题名称:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.tm_tt_Name" placeholder="请输入主题名称" ></el-input>
          </el-form-item>
          <el-form-item label="主题介绍:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.tm_tt_Remark" placeholder="请输入主题介绍" type="textarea" :rows="4"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>

      <!--修改门票主题-->
      <el-dialog title="修改门票主题" :visible.sync="updateDialog">
        <el-form :model="updateTicketThemeObj">
          <el-form-item label="主题编码:" :label-width="formLabelWidth">
            <el-input v-model="updateTicketThemeObj.tm_tt_ID" placeholder="请输入主题编码"  :disabled="isOff"></el-input>
          </el-form-item>
          <el-form-item label="主题名称:" :label-width="formLabelWidth">
            <el-input v-model="updateTicketThemeObj.tm_tt_Name" placeholder="请输入主题名称" ></el-input>
          </el-form-item>
          <el-form-item label="主题介绍:" :label-width="formLabelWidth">
            <el-input v-model="updateTicketThemeObj.tm_tt_Remark" placeholder="请输入主题介绍" type="textarea" :rows="4"></el-input>
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
        themeName:'',
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
            "tm_tt_Name": "",
            "tm_tt_Remark": ""
          }
        }
      }
    },
    computed: mapGetters([
      'ticketThemeList',
      'updateTicketThemeObj'
    ]),
    created(){

    },
    methods: {
      //分页
      handleCurrentChange(num){
        this.initData(this.themeName,num)
      },
      //查询
      search(){
        this.initData(this.themeName)
      },
      initData(name,page){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "ttID": "",
          "ttName": name?name:'',
          "isDelete": 0,
          "page": page?page:1,
          "rows": 5
        };
        this.isLoading = true;
        this.$store.dispatch('initTicketTheme',options)
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
        this.addDialog = true;
        this.$store.commit('setTranstionFalse');
      },
      //添加提交
      addSubmit(){
        this.$store.dispatch('AddTicketTheme',this.addOptions)
        .then((suc)=>{
          this.$notify({
            message: suc,
            type: 'success'
          });
          this.initData(this.themeName)
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
        this.$store.commit('initUpdateTicketTheme',id)
      },
      //修改提交
      updateSubmit(){
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": this.updateTicketThemeObj
        };
        this.$store.dispatch('UpdateTicketTheme',updateOptions)
        .then((suc)=>{
          this.$notify({
            message: suc,
            type: 'success'
          });
          this.initData(this.themeName)
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
          "ttID": id
        };
        this.$store.dispatch('DeleteTicketTheme',deleteOptions)
        .then((suc)=>{
          this.$notify({
            message: suc,
            type: 'success'
          });
          this.initData(this.themeName)
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
