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
            <span>申请状态:</span>
          </el-form-item>
          <el-form-item>
            <el-select v-model="applyStates" placeholder="请选择">
              <el-option
                v-for="item in applyStates"
                :key="item.stateId"
                :label="item.stateName"
                :value="item.stateId">
              </el-option>
            </el-select>
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
              <el-form-item label="视频推荐编号:">
                <span>{{ props.row.ed_vo_ID}}</span>
              </el-form-item>
              <el-form-item label="时长:">
                <span>{{ props.row.ed_vo_Time}}秒</span>
              </el-form-item>
              <el-form-item label="视频大小:">
                <span>{{ props.row.ed_vo_Size}}MB</span>
              </el-form-item>
              <el-form-item label="文件扩展名:">
                <span>{{ props.row.ed_vo_Extend}}</span>
              </el-form-item>
              <el-form-item label="文件地址:">
                <video :src="props.row.ed_vo_FileURL" width="200px" height="100px" controls="controls"></video>
              </el-form-item>
              <el-form-item label="作者:">
                <span>{{ props.row.ed_vo_AuthorID}}</span>
              </el-form-item>
              <el-form-item label="分类名称:">
                <span>{{ props.row.ed_te_Type}}</span>
              </el-form-item>
              <el-form-item label="视频名称:">
                <span>{{ props.row.ed_vo_Title}}</span>
              </el-form-item>
              <el-form-item label="视频图片:">
                <img :src="props.row.ed_vo_ImageURL" alt="" width="200px" height="100px">
              </el-form-item>
              <el-form-item label="创建时间:">
              <span>{{ props.row.ed_vo_CreateTime}}</span>
              </el-form-item>
              <el-form-item label="审核人编码:">
                <span>{{ props.row.ed_vo_PasserID}}</span>
              </el-form-item>
              <el-form-item label="审核时间:">
                <span>{{ props.row.ed_vo_ValidateTime}}</span>
              </el-form-item>
              <el-form-item label="视频简介:">
                <span>{{ props.row.ed_vo_Introduce}}</span>
              </el-form-item>
              <el-form-item label="视频详情:">
                <span>{{ props.row.ed_vo_Remark}}</span>
              </el-form-item>
              <el-form-item label="适合人群:">
                <span>{{ props.row.ed_vo_Crowd}}</span>
              </el-form-item>
              <el-form-item label="学习目标:">
                <span>{{ props.row.ed_vo_Target}}</span>
              </el-form-item>
              <el-form-item label="是否推荐:">
                <span>{{ props.row.ed_vo_Recommend}}</span>
              </el-form-item>
              <el-form-item label="所属课程编码:">
                <span>{{ props.row.ed_vo_SeriesID}}</span>
              </el-form-item>
              <el-form-item label="所在系列的第几集（整数）:">
                <span>{{ props.row.ed_vo_collection}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="视频推荐编码"
          align="center"
          prop="ed_vo_ID">
        </el-table-column>
        <el-table-column
          label="视频名称"
          align="center"
          prop="ed_vo_Title">
        </el-table-column>
        <el-table-column label="操作" align="center" style="width: 1000px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="approval(scope.row.ed_vo_ID)">审核
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
            <el-radio v-model="approvalOptions.ed_vo_Recommend" label="2">功审核成</el-radio>
            <el-radio v-model="approvalOptions.ed_vo_Recommend" label="3">审核失败</el-radio>
          </el-form-item>
<!--          <el-form-item label="审核失败原因:" :label-width="formLabelWidth" v-show="approvalOptions.ed_ve_State!=0">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 6}"
              placeholder="请输入内容"
              v-model="approvalOptions.ed_ve_Remarks">
            </el-input>
          </el-form-item>-->
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
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token":"",
          "ed_vo_ID": "",                                 //申请推荐的视频编码
          "ed_vo_Recommend": "",                      //是否推荐(0未推荐，1申请推荐，2通过推荐)
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
      this.initData(this.input)
    },
    methods: {
      // 分页
      handleCurrentChange(num) {
        this.initData(num)
      },
      //初始化
      initData(page) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token":"",
          "ed_vo_Recommend": "1",                      //是否推荐(0未推荐，1申请推荐，2通过推荐)
          "page": page ? page : 1,//页码
          "rows": 8//条数
        };
        this.isLoading = true;
        this.$store.dispatch('initAdminEducationAuditRecommend', options)
          .then((total) => {
            this.total = total;
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
      //审核申请的视频推荐
      approval(id){
        this.approvalOptions.ed_vo_ID=id;
        this.approvalStatusDialog=true
      },
      //审核提交
      approvalStatusSubmit(){
        this.isLoading = true;
        console.log(111,this.approvalOptions)
        this.$store.dispatch("educationApprovalVideo", this.approvalOptions)
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
