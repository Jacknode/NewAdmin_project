<template>
  <div>
    <section id="wrap">
      <h1 class="userClass">教育视频管理</h1>
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>视频筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-input
              placeholder="请输入内容"
              v-model="input"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search" size="mini">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--数据展示-->
      <el-table
        :data="adminEducationAuditList"
        highlight-current-row
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="视频编号:">
                <span>{{ props.row.ed_ve_Content.ed_vo_ID }}</span>
              </el-form-item>
              <el-form-item label="视频时长:">
                <span>{{ props.row.ed_ve_Content.ed_vo_Time }}秒</span>
              </el-form-item>
              <el-form-item label="视频大小:">
                <span>{{ props.row.ed_ve_Content.ed_vo_Size}}KB</span>
              </el-form-item>
              <el-form-item label="文件扩展名:">
                <span>{{ props.row.ed_ve_Content.ed_vo_Extend}}</span>
              </el-form-item>
              <el-form-item label="视频文件地址:">
                <video :src="props.row.ed_ve_Content.ed_vo_FileURL" width="320" height="240" controls="controls"></video>
              </el-form-item>
              <el-form-item label="作者ID:">
                <span>{{ props.row.ed_ve_Content.ed_vo_AuthorID}}</span>
              </el-form-item>
              <el-form-item label="视频标题:">
                <span>{{ props.row.ed_ve_Content.ed_vo_Title}}</span>
              </el-form-item>
              <el-form-item label="视频图片:">
                <span>{{ props.row.ed_ve_Content.ed_vo_ImageURL}}</span>
              </el-form-item>
              <el-form-item label="首页大图:">
                <span>{{ props.row.ed_ve_Content.ed_vo_TomImageURL}}</span>
              </el-form-item>
              <el-form-item label="创建时间:">
                <span>{{ props.row.ed_ve_Content.ed_vo_CreateTime}}</span>
              </el-form-item>
              <el-form-item label="视频简介:">
                <span>{{ props.row.ed_ve_Content.ed_vo_Introduce}}</span>
              </el-form-item>
              <el-form-item label="视频详情:">
                <span>{{ props.row.ed_ve_Content.ed_vo_Remark}}</span>
              </el-form-item>
              <el-form-item label="视频作者:">
                <span>{{ props.row.ed_ve_Content.ed_vo_AuthorName}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="视频编号"
          align="center"
          prop="ed_ve_ID">
        </el-table-column>
        <el-table-column
          label="视频作者"
          align="center"
          prop="ed_ve_Content.ed_vo_AuthorName">
        </el-table-column>
        <el-table-column
          label="视频名称"
          align="center"
          prop="ed_ve_Content.ed_vo_Title">
        </el-table-column>
        <el-table-column
          align="center"
          label="视频类型名称"
          prop="ed_ve_TypeName">
        </el-table-column>
        <el-table-column
          label="审核创建时间"
          align="center"
          prop="ta_tg_CreateDateTime">
          <template slot-scope="props">
            <span>{{props.row.ta_tg_CreateDateTime | getUseTime}}</span>
          </template>
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
    </section>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {getNewStr} from '@/assets/js/public'
  export default{
    name: '',
    data(){
      return {
        input:'',
        value: '',
        total:0,
        admin:'',
        isLoading:'',
        formLabelWidth:'120px',
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
      }
    },
    computed: mapGetters([
      'adminEducationAuditList',
    ]),
    created(){
      this.initData(this.input)
    },
    methods: {
      //分页
      handleCurrentChange(num) {
        this.initData(this.input, num)
      },
      //审核视频chushih
      initData(id, page) {
        let options = {
          "loginUserID": "huileyou",  //惠乐游用户ID
          "loginUserPass": "123",  //惠乐游用户密码
          "operateUserID": "",//操作员编码
          "operateUserName": "",//操作员名称
          "pcName": "",  //机器码
          "ed_ve_ID": id,//审核表编号
          "ed_ve_Type": "",//视频类型
          "ed_vo_AuthorID": this.admin.sm_ui_ID,//作者ID
          "page": page ? page : 1,//页码
          "rows": 5//条数
        };
        this.isLoading = true;
        this.$store.dispatch("initAdminEducationAuditVideo", options)
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
      //教育视频审核查询
      search() {
        console.log(this.adminEducationAuditList)
        this.initData(this.input)
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
