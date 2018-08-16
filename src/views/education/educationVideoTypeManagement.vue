<template>
  <div>
    <div id="wrap" class="clearfix">
      <h1 class="userClass">教育视频类型</h1>
      <!--查询栏-->
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>教育分类查询:</span>
          </el-form-item>
          <el-form-item>
            <el-input v-model="siteNum" size="mini"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search" size="mini">查询</el-button>
            <el-button type="primary" @click="Add" size="mini">新增</el-button>
            <el-button type="primary" @click="AddParent" size="mini">新增父级</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--数据展示-->
      <el-table
        :data="educationTypeManagement"
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column
          label="视频类型编号"
          align="center"
          prop="ed_te_ID">
        </el-table-column>
        <el-table-column
          label="视频类型名称"
          align="center"
          prop="ed_te_Name">
        </el-table-column>
        <el-table-column
          label="视频类型父编码名称"
          align="center"
          prop="ed_te_ParentName">
        </el-table-column>
        <el-table-column label="操作" align="center" style="width: 1000px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="update(scope.row)">修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="Delete(scope.row.ed_te_ID)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--添加教育类型-->
      <el-dialog title="添加视频类型" :visible.sync="addDialog">
        <el-form :model="addOptions">
          <el-form-item label="视频类型父编码: " :label-width="formLabelWidth" >
            <el-cascader
              v-model="arr1"
              :options="selectTypeAllInfo"
              change-on-select
              filterable
            ></el-cascader>
          </el-form-item>
          <el-form-item label="视频类型: " :label-width="formLabelWidth">
            <el-input v-model='addOptions.data.ed_te_Name' placeholder="请输入内容"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>
      <!--添加父级-->
      <el-dialog title="添加视频类型" :visible.sync="addDialogParent">
        <el-form :model="addOptionsParent">
          <el-form-item label="视频类型: " :label-width="formLabelWidth">
            <el-input v-model='addOptionsParent.data.ed_te_Name' placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialogParent = false">取 消</el-button>
          <el-button type="primary" @click="addParentSubmit">确 定</el-button>
        </div>
      </el-dialog>
      <!--修改教育分类-->
      <el-dialog title="修改教育分类" :visible.sync="updateDialog">
        <el-form :model="updateObj">
          <el-form-item label="教育父编码:" :label-width="formLabelWidth" >
            <el-cascader
              v-model="arr2"
              :options="selectTypeAllInfo"
              change-on-select
              filterable
            ></el-cascader>
          </el-form-item>
          <el-form-item label="教育分类: " :label-width="formLabelWidth">
            <el-input v-model='updateObj.ed_te_Name' placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateDialog = false">取 消</el-button>
          <el-button type="primary" @click="updateSubmit">确 定</el-button>
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
  import {getNewStr} from '@/assets/js/public'
  export default{
    name: '',
    data(){
      return {
        total:0,
        arr1:[],
        arr2:[],
        siteNum:'',
        updateObj:{},
        isLoading:false,
        addDialog:false,
        updateDialog:false,
        addDialogParent:false,
        formLabelWidth: '120px',
        addOptionsParent:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "ed_te_Name": "",//分类名称
            "ed_te_ParentID": 0,//分类编号父编号
            'ed_te_ParentName': ''
          }
        },
        addOptions: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "ed_te_Name": "",//分类名称
            "ed_te_ParentID": '',//分类编号父编号
            'ed_te_ParentName': ''
          }
        },
      }
    },
    computed: mapGetters([
     'educationTypeManagement',
      'selectTypeAllInfo',

    ]),
    created(){
      this.initData(this.siteNum),
        this.initSelectTypeAllInfo()
    },
    methods: {
      //分页
      handleCurrentChange(num) {
        this.initData(this.siteNum, num)
      },
      //查询所有类型
      initSelectTypeAllInfo(){
        let options1 = {
          "loginUserID": "huileyou",  //惠乐游用户ID
          "loginUserPass": "123",  //惠乐游用户密码
          "operateUserID": "",//操作员编码
          "operateUserName": "",//操作员名称
          "pcName": "",//机器码
          "ed_vt_ID": '0'
        };
        return this.$store.dispatch('initSelectTypeAllInfo', options1)
//        this.initData(this. siteNum)
      },

      //初始化数据
      initData(id, page) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "ed_te_ID": id,//分类编号
          "ed_te_Name": "",//分类名称
          "ed_te_ParentID": "",//分类编号父编号
          "page": page ? page : 1,//页码
          "rows": 5//条数
        };
        this.$store.dispatch("initEducationTypeManagement", options)
          .then((total) => {
            this.total = total;
          }, (err) => {
            this.$notify({
              message: err,
              type: "error"
            });
          });
      },
      //新增
      Add(){
        this.initData(this.siteNum);
        this.addDialog=true
      },
      //添加提交
      addSubmit() {
        this.addOptions.data.ed_te_ParentID = this.arr1[this.arr1.length-1];
        this.$store.dispatch('addEducationTypeManagement', this.addOptions)
          .then((suc) => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.siteNum)//调用初始化
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
        this.addDialog = false;
      },

      // 添加父级（第一级）
      AddParent(){
        this.addDialogParent = true
      },
      //添加父编码提交
      addParentSubmit(){

        this.$store.dispatch('addEducationTypeManagement', this.addOptionsParent)
          .then((suc) => {
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
        this.addDialogParent = false;
      },
      //修改
      update(obj){
        this.updateObj = obj
        this.updateDialog = true
        //  this.$store.commit('setTranstionFalse');
      },
      //修改提交
      updateSubmit() {
        this.updateObj.ed_te_ParentID = this.arr2[this.arr2.length-1];
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": this.updateObj,
        };
        this.$store.dispatch('updateEducationTypeManagement', updateOptions)
          .then((suc) => {
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
        this.updateDialog = false;
      },
      //教育分类查询
      search(){

        this.initData(this.siteNum)
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
            "ed_te_ID": id,//分类编号
          }
        }
        this.$store.dispatch('DeleteEducationTypeManagement', deleteOptions)
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
    }
  }
</script>
<style scoped>
</style>
