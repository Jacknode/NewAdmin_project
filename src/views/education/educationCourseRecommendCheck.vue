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
<!--            <el-select v-model="applyStates" placeholder="请选择">
              <el-option
                v-for="item in applyStates"
                :key="item.stateId"
                :label="item.stateName"
                :value="item.stateId">
              </el-option>
            </el-select>-->
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search" size="mini">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--数据展示-->
      <el-table
        :data="EducationCourseRecommendCheck"
        highlight-current-row
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="课程编码:">
                <span>{{ props.row.ed_ss_ID }}</span>
              </el-form-item>
              <el-form-item label="课程名称:">
                <span>{{ props.row.ed_ss_IDName }}</span>
              </el-form-item>
              <el-form-item label="连载状态:">
                <span>{{ props.row.ed_ss_WriteState | getEducationCourseWriteState}}</span>
              </el-form-item>
              <el-form-item label="课程首页大图:">
                <img :src="props.row.ed_ss_SeriesImageURL" alt="" style="height: 50px;width: 100px">
              </el-form-item>
              <el-form-item label="课程价格:">
                <span>{{ props.row.ed_ss_Price}}</span>
              </el-form-item>
              <el-form-item label="创建时间:">
                <span>{{ props.row.ed_ss_CreateTime }}</span>
              </el-form-item>
              <el-form-item label="完载时间:">
                <span>{{ props.row.ed_ss_OverTime }}</span>
              </el-form-item>
              <el-form-item label="更新时间:">
                <span>{{ props.row.ed_ss_UpdateTime }}</span>
              </el-form-item>
              <el-form-item label="课程分类名称:">
                <span>{{ props.row.ed_ss_Typename }}</span>
              </el-form-item>
              <el-form-item label="作者名称:">
                <span>{{ props.row.ed_vo_AuthorName }}</span>
              </el-form-item>
              <el-form-item label="首页大图推荐状态:">
                <span>{{ props.row.es_ss_Recommend | getEducationCourseHomepageBigImageRecomentStates}}</span>
              </el-form-item>
              <el-form-item label="课程推荐状态:">
                <span>{{ props.row.ed_ss_Course | getEducationCourseHomepageBigImageRecomentStates}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

        <el-table-column
          label="课程名称"
          align="center"
          prop="ed_ss_IDName">
        </el-table-column>
        <el-table-column
          align="center"
          label="首页大图状态"
          prop="es_ss_Recommend">
          <template slot-scope="scope">
            {{scope.row.es_ss_Recommend | getEducationCourseHomepageBigImageRecomentStates}}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="课程推荐状态">
          <template slot-scope="scope">
            {{scope.row.ed_ss_Course | getEducationCourseRecomentStates}}
          </template>
        </el-table-column>
        <el-table-column label="操作"   align="center">
          <template slot-scope="scope">
            <el-button
              v-show="scope.row.ed_ss_Course==1"
              size="mini"
              type="primary"
              @click="approval(scope.row)">课程推荐审核
            </el-button>
            <el-button
              size="mini"
              type="primary"
              @click="Update(scope.row)">修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="Delete(scope.row.ed_ss_ID)">删除
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
            <el-radio v-model="approvalOptions.ed_ss_Course" label="2">功审核成</el-radio>
            <el-radio v-model="approvalOptions.ed_ss_Course" label="3">审核失败</el-radio>
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
        isLoading: false,
        formLabelWidth: '120px',
        approvalStatusDialog:false,
        approvalOptions:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token":"",
          "ed_ss_ID": "71",                                 //申请推荐的课程编码
          "ed_ss_Course": "2",                          //是否推荐(3未推荐，1申请推荐，2通过推荐)
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
      'EducationCourseRecommendCheck',//教育课程推荐审核
    ]),
    created(){
      this.initData()
    },
    methods: {
      //教育课程推荐初始化
      initData(page) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token":"",
          "page":page?page: "1",
          "rows": "5",
          "ed_ss_ID": "",//课程编号
          "ed_ss_Name": "",//课程名称
          "ed_ss_WriteState": "",//连载状态（0连载中1完结)
          "ed_ss_AuthorID": "",//作者
          "ed_SS_Type": "",//分类编号
          "es_ss_Recommend": "",  //推荐首页大图推荐状态（3未推荐，1申请推荐中，2以通过推荐申请）
          "ed_ss_Course":"",     //课程推荐状态（3未推荐，1申请推荐中，2以通过推荐申请）
        };
        this.isLoading = true;
        console.log('options:',options);
        this.$store.dispatch("initEducationCourseRecommendAction", options)
          .then((total) => {
            this.total = total;
            this.isLoading = false;
          }, (err) => {
            this.$notify({
              message: err,
              type: "error"
            });
          });
      },
      // 分页
      handleCurrentChange(num) {
        this.initData(num)
      },
      //查询
      search() {
        this.initData(this.siteNum)
      },
      //课程推荐审核
      approval(id){
        console.log('id:',id)
        this.approvalOptions.ed_ss_Course=id.ed_ss_Course;
        this.approvalStatusDialog=true
      },
      //课程推荐审核提交
      approvalStatusSubmit(){
        this.isLoading = true;
        console.log('approvalOptions:',this.approvalOptions);
        this.$store.dispatch("educationCourseRecommendAction", this.approvalOptions)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData()
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
