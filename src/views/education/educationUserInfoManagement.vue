<template>
  <div>
    <div id="wrap" class="clearfix">
      <h1 class="userClass">教育用户信息管理</h1>
      <!--数据搜索-->
<!--      <el-col :span="24" class="formSearch">
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
      </el-col>-->
      <!--数据展示-->
      <el-table
        :data="educationUserInfoActionList"
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column
          label="标识"
          align="center"
          prop="sm_ui_ID">
        </el-table-column>
        <el-table-column
          label="用户编码"
          align="center"
          prop="sm_ui_UserCode">
        </el-table-column>
        <el-table-column
          label="用户头像"
          align="center"
          prop="sm_ui_HeadImage">
        </el-table-column>
        <el-table-column
          label="是否冻结"
          align="center">
          <template slot-scope='scope'>
            {{scope.row.sm_ui_Freeze | getEducationUserState}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" style="width: 1000px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click=" freezeState(scope.row)">冻结
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--添加教育类型-->
<!--      <el-dialog title="添加视频类型" :visible.sync="addDialog">
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
      </el-dialog>-->
      <!--添加父级-->
<!--      <el-dialog title="添加视频类型" :visible.sync="addDialogParent">
        <el-form :model="addOptionsParent">
          <el-form-item label="视频类型: " :label-width="formLabelWidth">
            <el-input v-model='addOptionsParent.data.ed_te_Name' placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialogParent = false">取 消</el-button>
          <el-button type="primary" @click="addParentSubmit">确 定</el-button>
        </div>
      </el-dialog>-->
      <!--修改教育分类-->
<!--      <el-dialog title="修改教育分类" :visible.sync="updateDialog">
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
      </el-dialog>-->
      <!--分页-->
<!--      <div class="block" style="float: right;">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="5"
          layout="total, prev, pager, next"
          :total="total"
          v-show="total"
        >
        </el-pagination>
      </div>-->
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
      'educationUserInfoActionList',
    ]),
    created(){
      this.initData();
    },
    methods: {
      //初始化数据
      initData(account,FreeState, page) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
          "page": page?page:"1",
          "rows": "5",
          "sm_ui_UserCode":  account?account:"",    //根据账号的模糊查询
          "sm_ui_Freeze":  FreeState?FreeState:"",        //冻结状态（0未冻结，1已冻结）
        };
        console.log('options:',options)
        this.$store.dispatch("initEducationUserInfoAction", options)
          .then((total) => {
            this.total = total;
          }, (err) => {
            this.$notify({
              message: err,
              type: "error"
            });
          });
      },
      //分页
      handleCurrentChange(num) {
        this.initData(this.siteNum, num)
      },
      //冻结
      freezeState(obj){
        let uerId = obj.sm_ui_ID;
        let frezeStateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token":"",
          "sm_ui_ID": uerId?uerId:"",                      //需要修改冻结状态账号编码
          "sm_ui_Freeze": "1",                //是否冻结（0未冻结， 1已冻结）
        };
        this.$store.dispatch('whetherFreezeAction',frezeStateOptions)
          .then(
            (suc)=>{
              console.log(suc)
              this.$notify({
                type:suc,
                message:suc
              });
            },
            (err)=>{
              this.$notify({
                type:err,
                message:err
              });
            }
          );
      },
    }
  }
</script>
<style scoped>
</style>
