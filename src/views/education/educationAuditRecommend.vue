<template>
  <div>
    <div id="wrap" class="clearfix">
      <h1 class="userClass">教育审核视频推荐</h1>

      <!--查询栏-->

      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>审核视频推荐:</span>
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
        :data="adminEducationAuditRecommend"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">

              <el-form-item label="教育推荐审核ID:">
                <span>{{ props.row.ed_ve_Content.ed_re_ID}}</span>
              </el-form-item>
              <el-form-item label="被推荐者编码:">
                <span>{{ props.row.ed_ve_Content.ed_re_PropertiesID}}</span>
              </el-form-item>
              <el-form-item label="推荐名称:">
                <span>{{ props.row.ed_ve_Content.ed_re_Name}}</span>
              </el-form-item>
              <el-form-item label="推荐图片:">
                <template slot-scope="scope">
                <img v-lazy="props.row.ed_ve_Content.ed_re_SeriesImageURL" alt="" style="width: 100px;height: 100px;">
                </template>
                <span>{{ props.row.ed_ve_Content.ed_re_SeriesImageURL}}</span>
              </el-form-item>

              <el-form-item label="教育推荐类型:">
                <span>{{ props.row.ed_ve_Content.ed_re_Difference}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="审核表编号"
          align="center"
          prop="ed_ve_ID">
        </el-table-column>
        <el-table-column
          label="视频类型"
          align="center"
          prop="ed_ve_Type">
        </el-table-column>
        <el-table-column
          label="创建时间"
          align="center"
          prop="ed_ve_CreateTime">
        </el-table-column>
        <el-table-column
          label="类型名称"
          align="center"
          prop="ed_ve_TypeName">
        </el-table-column>
        <el-table-column label="操作" align="center" style="width: 1000px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="approval(scope.row.ed_ve_ID)">审核
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
      <!--审核状态-->
      <el-dialog title="审核状态" :visible.sync="approvalStatusDialog">
        <el-form :model="approvalOptions">
          <el-form-item label="审核状态:" :label-width="formLabelWidth">
            <el-radio v-model="approvalOptions.ed_ve_State" label="0">功审核成</el-radio>
            <el-radio v-model="approvalOptions.ed_ve_State" label="1">审核失败</el-radio>
          </el-form-item>
          <el-form-item label="审核失败原因:" :label-width="formLabelWidth" v-show="approvalOptions.ed_ve_State!=0">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 6}"
              placeholder="请输入内容"
              v-model="approvalOptions.ed_ve_Remarks">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="approvalStatusDialog = false">取 消</el-button>
          <el-button type="primary" @click="approvalStatusSubmit">确 定</el-button>
        </div>
      </el-dialog>
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
        siteNum: '',
        value: '',
        value1: '',
        total: 0,
        addDialog: false,
        formLabelWidth: '120px',
        approvalStatusDialog:false,
        approvalOptions:{
          "loginUserID": "huileyou",  //惠乐游用户ID
          "loginUserPass": "123",  //惠乐游用户密码
          "operateUserID": "",//操作员编码
          "operateUserName": "",//操作员名称
          "pcName": "",  //机器码
          "ed_ve_ID": '',//审核表编号
          "ed_vo_PasserID": '',//审核员编码
          "ed_ve_State": '0',//审核状态(0通过1不通过）
          'ed_ve_Remarks':'',//不通过原因
        },
        options: [{
          value1: '0',
          label: '视频'
        }, {
          value1: '1',
          label: '系列'
        },],
       }
      },
    computed: mapGetters([
      'adminEducationAuditRecommend',
    ]),
    created(){
      //let admin = JSON.parse(sessionStorage.getItem('admin'));
      this.initData(this.input)
    },
    methods: {


      // 分页
      handleCurrentChange(num) {
        this.initData(this.siteNum, num)
      },

      //初始化
      initData(id, page) {
        let options = {
          "loginUserID": "huileyou",  //惠乐游用户ID
          "loginUserPass": "123",  //惠乐游用户密码
          "operateUserID": "",//操作员编码
          "operateUserName": "",//操作员名称
          "pcName": "",  //机器码
          "ed_ve_ID": id,//审核表编号
          "ed_ve_Type": "",//视频类型
          "ed_vo_AuthorID": "",//作者ID
          "page": page ? page : 1,//页码编号
          "rows": "5",//单页显示数量
        }
        this.isLoading = true;
        this.$store.dispatch('initAdminEducationAuditRecommend', options)
          .then((total) => {
            this.total = total
            this.isLoading = false
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },
      //查询
      search() {
        this.initData(this.siteNum)
      },

      approval(id){

        let admin = JSON.parse(sessionStorage.getItem('admin'));
        console.log(admin)
        this.approvalStatusDialog=true
        this.approvalOptions.ed_ve_ID=id;
        this.approvalOptions.ed_vo_PasserID=admin.sm_ui_ID
      },
      //审核提交
      approvalStatusSubmit(){
        this.isLoading = true;
        this.$store.dispatch("educationApprovalVideo", approvalOptions)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.input)
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
        this.approvalStatusDialog=false
      },

    }
  }
</script>
<style scoped>
</style>
