<template>
  <div>
    <div id="wrap" class="clearfix">
      <h1 class="userClass">教育首页大图管理</h1>
      <!--查询栏-->
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>课程名称:</span>
          </el-form-item>
          <el-form-item>
            <el-input v-model="homPageName" size="mini"></el-input>
          </el-form-item>
          <el-form-item>
            <span>审核状态查询:</span>
          </el-form-item>
          <el-form-item>
            <el-select v-model="applyState" placeholder="请选择">
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
        :data="adminEducationHomePageBigImageList"
        style="width: 100%">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">

                      <el-form-item label="添加订单的产品编码:">
                        <span>{{ props.row.ed_ss_ID}}</span>
                      </el-form-item>
                      <el-form-item label="课程名称:">
                        <span>{{ props.row.ed_ss_ID}}</span>
                      </el-form-item>
                      <el-form-item label="连载状态:">
                        <span>{{ props.row.ed_ss_WriteState}}</span>
                      </el-form-item>
                      <el-form-item label="系列图片:">
                        <span>{{ props.row.ed_ss_SeriesImageURL}}</span>
                      </el-form-item>
                      <el-form-item label="作者:">
                        <span>{{ props.row.ed_ss_AuthorID}}</span>
                      </el-form-item>
                      <el-form-item label="课程价格:">
                        <span>{{ props.row.ed_ss_Price}}</span>
                      </el-form-item>
                      <el-form-item label="是否收费:">
                        <span>{{ props.row.ed_ss_GetFee}}</span>
                      </el-form-item>
                      <el-form-item label="创建时间:">
                        <span>{{ props.row.ed_ss_CreateTime}}</span>
                      </el-form-item>
                      <el-form-item label="完载时间:">
                        <span>{{ props.row.ed_ss_OverTime}}</span>
                      </el-form-item>
                      <el-form-item label="更新时间:">
                        <span>{{ props.row.ed_ss_UpdateTime}}</span>
                      </el-form-item>
                      <el-form-item label="分类编号:">
                        <span>{{ props.row.ed_ss_Type}}</span>
                      </el-form-item>
                      <el-form-item label="推荐首页大图:">
                        <span>{{ props.row.es_ss_Recommend}}</span>
                      </el-form-item>

                    </el-form>
                  </template>
                </el-table-column>

                <el-table-column
                  label="课程名称"
                  align="center"
                  prop="ed_ss_Name">
                </el-table-column>
                <el-table-column
                  label="推荐状态"
                  align="center"
                  prop="es_ss_Recommend">
                  <template slot-scope="props">
                    <span>{{props.row.es_ss_Recommend | getEducationHomePageApplyStates}}</span>
                  </template>
                </el-table-column>


        <el-table-column label="操作" align="center" style="width: 1000px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="approval(scope.row)">推荐状态修改
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
      <!--审核-->
      <el-dialog title="修改教育首页大图" :visible.sync="approvalStatusDialog">
        <el-form :model="approvalObj">
<!--          <el-form-item label="选择课程名称:" :label-width="formLabelWidth">
            <el-select v-model="courseName" placeholder="请选择">
              <el-option
                v-for="item in educationcourseList"
                :key="item.ed_ss_ID"
                :label="item.ed_ss_IDName"
                :value="item.ed_ss_ID">
              </el-option>
            </el-select>
          </el-form-item>-->
          <el-form-item label="审核状态:" :label-width="formLabelWidth">
            <el-select v-model="approvalStatu" placeholder="请选择">
              <el-option
                v-for="item in approvalStatusList"
                :key="item.approvalStatuId"
                :label="item.approvalStatuName"
                :value="item.approvalStatuId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateDialog = false">取 消</el-button>
          <el-button type="primary" @click="approvalStatusSubmit">确 定</el-button>
        </div>
      </el-dialog>
      <!--添加-->
<!--      <el-dialog title="添加课程" :visible.sync="addDialog">
&lt;!&ndash;        <el-form :model="addOptions">
          <el-form-item label="微电影父编码号" :label-width="formLabelWidth">
            <el-select v-model="addOptions.data.vf_te_ParentID" placeholder="请选择微电影">
              <el-option
                v-for="item in movieTypeList"
                :key="item.vf_te_ID"
                :label="item.vf_te_ParentID"
                :value="item.vf_te_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="微电影名称:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.vf_te_Name" placeholder="微电影名称" ></el-input>
          </el-form-item>
          &lt;!&ndash;<el-form-item label="创建时间:" :label-width="formLabelWidth">&ndash;&gt;
          &lt;!&ndash;<el-date-picker&ndash;&gt;
          &lt;!&ndash;v-model="addOptions.data.sm_at_CreateTime"&ndash;&gt;
          &lt;!&ndash;type="date"&ndash;&gt;
          &lt;!&ndash;placeholder="选择日期">&ndash;&gt;
          &lt;!&ndash;</el-date-picker>&ndash;&gt;
          &lt;!&ndash;</el-form-item>&ndash;&gt;
          &lt;!&ndash;<el-form-item label="收费金额:" :label-width="formLabelWidth">&ndash;&gt;
          &lt;!&ndash;<el-input v-model="addOptions.data.sm_at_Cost" placeholder="请输入收费金额" ></el-input>&ndash;&gt;
          &lt;!&ndash;</el-form-item>&ndash;&gt;
          &lt;!&ndash;<el-form-item label="备注:" :label-width="formLabelWidth">&ndash;&gt;
          &lt;!&ndash;<el-input v-model="addOptions.data.sm_at_Remark" placeholder="请输入备注" type="textarea" :rows="4"></el-input>&ndash;&gt;
          &lt;!&ndash;</el-form-item>&ndash;&gt;
        </el-form>&ndash;&gt;
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>-->
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
        approvalStatu: '',//审核状态
        homPageName: '',//首页大图名称
        applyState: '',//首页大图审核状态查询
        courseName: '',//课程名称
        value: '',
        value1: '',
        total: 0,
        addDialog: false,
        formLabelWidth: '120px',
        approvalStatusDialog:false,
        updateDialog:false,
        applyStates:[
          {stateId:3,
          stateName:"未推荐"},
          {stateId:1,
            stateName:"申请推荐中"},
          {stateId:2,
            stateName:"以通过推荐申请"},
        ],
        approvalObj:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token":"",
          "ed_ss_ID": "",//课程编号
          "es_ss_Recommend": "",   //推荐首页大图（0未推荐，1申请推荐中，2以通过推荐申请）
        },
        approvalStatusList:[
          {
            approvalStatuId:0,
            approvalStatuName:"未推荐",
          },
          {
            approvalStatuId:1,
            approvalStatuName:"申请推荐中",
          },
          {
            approvalStatuId:2,
            approvalStatuName:"已通过推荐申请",
          },
        ],
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
      'adminEducationHomePageBigImageList',//首页大图列表
      'educationcourseList',//课程
    ]),
    created(){
      this.initData(this.input)
    },
    methods: {
      // 分页
      handleCurrentChange(num) {
        this.initData(this.siteNum, num)
      },
      //初始化
      initData(courseId, recommend) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token":"",
//          "page": "1",          //页码
//          "rows": "1",         //展示行数
          "ed_ss_ID": courseId?courseId:"",//课程编号
          "es_ss_Recommend": recommend?recommend:"2",   //推荐首页大图（0未推荐，1申请推荐中，2以通过推荐申请）

        }
        this.isLoading = true;
        console.log(options)
        this.$store.dispatch('initEducationHomePageBigImage', options)
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
        this.initData(this.homPageName,this.applyState)
      },
      //审核,推荐状态修改
      approval(obj){
        console.log(obj)
        //修改的课程编码
        this.approvalObj.ed_ss_ID=obj.ed_ss_ID;
        //查询课程
        this.searchCourse();
//        let admin = JSON.parse(sessionStorage.getItem('admin'));
        this.approvalStatusDialog=true
//        this.approvalOptions.ed_ve_ID=id;
//        this.approvalOptions.ed_vo_PasserID=admin.sm_ui_ID
      },
      //审核提交
      approvalStatusSubmit(){
        this.approvalObj.es_ss_Recommend=this.approvalStatu;
        console.log(this.approvalObj);
                this.isLoading = true;
                this.$store.dispatch("educationApprovalHomePageBigImage", this.approvalObj)
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
      //查询课程
      searchCourse(){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token":"",
          "page": "1",
          "rows": "10",
          "ed_ss_ID": "27",//课程编号
          "ed_ss_Name": "",//课程名称
          "ed_ss_WriteState": "0",//连载状态（0连载中1完结)
          "ed_ss_AuthorID": "",//作者
          // "ed_ss_Price": "1",//课程价格
          "ed_ss_GetFee": "",//是否收费（0不收费，1要收费）
          "ed_SS_Type": "",//分类编号
        };
        this.isLoading = true;
        this.$store.dispatch('searchCourseAction', options)
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
    }
  }
</script>
<style scoped>
</style>
