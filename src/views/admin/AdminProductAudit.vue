<template>
  <div>
    <section id="wrap">
      <h1 class="userClass">供应商产品审核</h1>
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>产品标题筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-autocomplete
              size="small"
              style="width: 150px"
              v-model="userName"
              :fetch-suggestions="querySearchAsync"
              placeholder="请选择供应商"
              @select="handleSelect"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search" size="small">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--数据展示-->
      <el-table
        :data="adminProductAuditList"
        highlight-current-row
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="供应商商户号:">
                <span>{{ props.row.ta_tg_TradeID }}</span>
              </el-form-item>
              <el-form-item label="产品标题:">
                <el-popover
                  ref="popover1"
                  placement="top-start"
                  trigger="hover"
                  :content="props.row.ta_tg_Title">
                </el-popover>
                <el-button v-popover:popover1 size="small">移入查看</el-button>
              </el-form-item>
              <el-form-item label="所属国家:">
                <span>{{ props.row.ts_tg_Country }}</span>
              </el-form-item>
              <el-form-item label="所属省市:">
                <span>{{ props.row.ts_tg_Provice+props.row.ts_tg_City}}</span>
              </el-form-item>
              <el-form-item label="产品描述:">
                <el-popover
                  ref="popover1"
                  placement="top-start"
                  trigger="hover"
                  :content="props.row.ta_tg_Describe">
                </el-popover>
                <el-button v-popover:popover1 size="small">移入查看</el-button>
              </el-form-item>
              <el-form-item label="成团地点:">
                <span>{{ props.row.ts_tg_GroupSite }}</span>
              </el-form-item>
              <el-form-item label="展示图片地址:">
                <img :src="item" alt="" v-for="item in props.row.ta_tg_ShowImages" style="width: 100px;height: 100px;margin-right: 10px">
              </el-form-item>
              <el-form-item label="产品创建时间:">
                <span>{{ props.row.ta_tg_CreateDateTime | getUseTime}}</span>
              </el-form-item>
              <el-form-item label="备注:">
                <el-popover
                  ref="popover1"
                  placement="top-start"
                  trigger="hover"
                  :content="props.row.ta_tg_Remark">
                </el-popover>
                <el-button v-popover:popover1 size="small">移入查看</el-button>
              </el-form-item>
              <!--<el-form-item label="是否展示首页:">-->
              <!--<span>{{ props.row.ts_tg_ShowTop==0?"否":"是" }}</span>-->
              <!--</el-form-item>-->
              <el-form-item label="是否精选:">
                <span>{{ props.row.ts_tg_Special==0?"非精选":"精选" }}</span>
              </el-form-item>
              <el-form-item label="境外线路:">
                <span>{{ props.row.ts_tg_LongOut | getLongOut }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="供应商商户号"
          prop="ta_tg_TradeID">
        </el-table-column>
        <el-table-column
          label="产品编码"
          prop="ta_tg_ID">
        </el-table-column>
        <el-table-column
          label="产品标题"
          prop="ta_tg_Title">
        </el-table-column>

        <el-table-column
          label="创建时间"
          prop="ta_tg_CreateDateTime">
          <template slot-scope="props">
            <span>{{props.row.ta_tg_CreateDateTime | getUseTime}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              v-show="scope.row.ts_tg_IsPass!=1"
              @click="approval(scope.row.ta_tg_ID)">审核
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

    </section>
    <el-dialog title="审核状态" :visible.sync="approvalStatusDialog">
      <el-form :model="approvalOptions">
        <el-form-item label="审核状态:" :label-width="formLabelWidth">
          <el-radio v-model="approvalOptions.IsPass" label="1">审核成功</el-radio>
          <el-radio v-model="approvalOptions.IsPass" label="2">审核失败</el-radio>
        </el-form-item>
        <el-form-item label="审核失败原因:" :label-width="formLabelWidth" v-show="approvalOptions.IsPass!=1">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 6}"
            placeholder="请输入内容"
            v-model="approvalOptions.failReason">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="approvalStatusDialog = false">取 消</el-button>
        <el-button type="primary" @click="approvalStatusSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    name: '',
    data(){
      return {
        formLabelWidth:'120px',
        approvalOptions:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "goodID": '',    //商户号
          "IsPass": '1',
          failReason:'',//审核失败原因
        },
        total:0,
        userName:'',
        restaurants:[],
        timeout:null,
        isLoading:false,
        sm_ai_ID:'',
        approvalStatusDialog:false,
        ID:''
      }
    },
    computed: mapGetters([
      'adminProductAuditList'
    ]),
    created(){
      this.initData(this.userName.trim())
    },
    methods: {
      //分页
      handleCurrentChange(num){
        this.initData(this.ID,num)
      },
      //选中产品
      handleSelect(item) {
//        this.addOptions.ts_pt_Product_LineID = item.id;
//        this.updateAdminLinePrepareObj.ts_pt_Product_LineID = item.id;
        this.userName = item.value;
        this.ID = item.id
//        let options = {
//          loginUserID: 'huileyou',
//          loginUserPass: 123,
//          goodID: item.id ? item.id : ''
//        };
//        this.$store.dispatch('initAdminProductLine', options)
      },
      loadAll(num,name) {
        return new Promise((relove, reject) => {
          var _this = this;

          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            sm_ai_Name:name?name:'',
            "sm_ai_ID": '',
            "page": num?num:1,
            "rows": 20,
          };
          this.$store.dispatch('initAdminSupplier',options)
            .then((data) => {
              relove(data)
            }, err => {
              this.$notify({
                message: err,
                type: 'error'
              });
            })
        })
      },
      querySearchAsync(queryString, cb) {
        this.loadAll(1, queryString).then(data => {
          var data = data.data;
<<<<<<< HEAD
          data = data.map(item => {
            return {
              id: item.sm_ai_ID,
              value: item.userName
=======
          //   console.log(data)
          data = data.map(item => {
            return {
              //  id: item.agentInfo.sm_ai_AgentID,
              //  value: item.agentInfo.sm_ai_Name
>>>>>>> 54ffa6f8a4deca06138756f85896d001e4859d2a
            }
          })
          this.restaurants = data;
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            cb(this.restaurants);
          }, 10);
        })
      },
      initData(name,page){
        let options = {
          // "loginUserID": "huileyou",
          // "loginUserPass": "123",
          // "operateUserID": "",
          // "operateUserName": "",
          // "pcName": "",
          // "tradeID": "",
          // "ID": "270",
          // "isDelete": 0,
          // "page": page?page:1,
          // "rows": 10,
          // "goodTitle": name?name:'',
          // "isPass": 1,
          // "isLongOut": 1,//跟团类型 0国内跟团  1周边跟团 2出境长线 3出境短

          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "tradeID":'',
          "goodTitle": name?name:'',
          "pcName": "",
          "ID": '',
          "isDelete": 0,
          "page": page?page:1,
          "rows": 10
        }
        this.isLoading = true;
        this.$store.dispatch('initAdminProductAudit',options)
          .then(data=>{
            this.total = Number(data.totalRows);
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
        this.initData(this.userName.trim())
      },
      //审核
      approval(id){
        this.$store.commit('setTranstionFalse');
        this.approvalStatusDialog = true;
        this.sm_ai_ID = id;
      },
      //审核提交
      approvalStatusSubmit(){
        this.approvalOptions.goodID = this.sm_ai_ID
        this.$store.dispatch('getProductAuditStatus',this.approvalOptions)
          .then(success=>{
            this.$notify({
              message: success,
              type: 'success'
            });
            this.initData(this.userName.trim())
          },err=>{
            this.$notify({
              message: err,
              type: 'error'
            });
          })
        this.approvalStatusDialog = false;
      }
    },
  }
</script>
<style scoped>

</style>
