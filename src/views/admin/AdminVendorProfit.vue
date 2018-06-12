<template>
  <div>
    <section id="wrap">
      <h1 class="userClass">供应商利润管理</h1>

      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <!--<el-form-item>-->
            <!--<span>供应商利润筛选:</span>-->
          <!--</el-form-item>-->
          <!--<el-form-item>-->
            <!--<el-input type="text" v-model="userName" auto-complete="off"size="small"></el-input>-->
          <!--</el-form-item>-->
          <el-form-item>
            <!--<el-button type="primary" @click="search" size="small">查询</el-button>-->
            <!--<el-button type="primary" @click="next">下一步</el-button>-->
            <el-button type="primary" @click="addAdminVendorProfit" size="small">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--数据展示-->
      <el-table
        :data="adminVendorProfitList"
        highlight-current-row
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column
          align="center"
          sortable
          label="利润编号"
          prop="sm_apf_ID">
        </el-table-column>
        <el-table-column
          align="center"
          label="合作类型"
          prop="sm_partnerTypeName">
        </el-table-column>
        <el-table-column
          align="center"
          label="省"
          prop="sm_apf_ProviceNane">
        </el-table-column>
        <el-table-column
          align="center"
          label="市"
          prop="sm_apf_CityNane">
        </el-table-column>
        <el-table-column
          align="center"
          label="利润比例"
        >
          <template slot-scope="scope">
            <span>{{parseInt(scope.row.sm_apf_Percent*100)}}%</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"  align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="Update(scope.row.sm_apf_ID)">修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="Delete(scope.row.sm_apf_ID)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

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

      <!--添加-->
      <el-dialog title="添加供应商利润" :visible.sync="addDialog">
        <el-form :model="addOptions">
          <el-form-item label="合作类型:" :label-width="formLabelWidth">
            <el-select v-model="addOptions.data.sm_partnerTypeID" placeholder="请选择合作类型">
              <el-option
                v-for="item in partnershipTypeList"
                :key="item.sm_cp_ID"
                :label="item.sm_cp_Name"
                :value="item.sm_cp_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="省:" :label-width="formLabelWidth">
            <el-select v-model="addOptions.data.sm_apf_Provice" placeholder="请选择省"  @change="changeProvice">
              <el-option
                v-for="item in proviceList"
                :key="item.sm_af_AreaID"
                :label="item.sm_af_AreaName"
                :value="item.sm_af_AreaID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="市:" :label-width="formLabelWidth">
            <el-select v-model="addOptions.data.sm_apf_City" placeholder="请选择市">
              <el-option
                v-for="item in cityList"
                :key="item.sm_af_AreaID"
                :label="item.sm_af_AreaName"
                :value="item.sm_af_AreaID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="提成利润:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.sm_apf_Percent" placeholder="请输入数字" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addAdminVendorProfitSubmit">确 定</el-button>
        </div>
      </el-dialog>

      <!--修改-->
      <el-dialog title="修改供应商利润" :visible.sync="updateDialog">
        <el-form :model="updateAdminVendorProfitObj">
          <el-form-item label="合作类型:" :label-width="formLabelWidth">
            <el-select v-model="updateAdminVendorProfitObj.sm_partnerTypeID" placeholder="请选择合作类型">
              <el-option
                v-for="item in partnershipTypeList"
                :key="item.sm_cp_ID"
                :label="item.sm_cp_Name"
                :value="item.sm_cp_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="省:" :label-width="formLabelWidth">
            <el-select v-model="updateAdminVendorProfitObj.sm_apf_Provice" placeholder="请选择省"  @change="changeProvice">
              <el-option
                v-for="item in proviceList"
                :key="item.sm_af_AreaID"
                :label="item.sm_af_AreaName"
                :value="item.sm_af_AreaID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="市:" :label-width="formLabelWidth">
            <el-select v-model="updateAdminVendorProfitObj.sm_apf_City" placeholder="请选择市">
              <el-option
                v-for="item in cityList"
                :key="item.sm_af_AreaID"
                :label="item.sm_af_AreaName"
                :value="item.sm_af_AreaID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="提成利润:" :label-width="formLabelWidth">
            <el-input v-model="updateAdminVendorProfitObj.sm_apf_Percent" placeholder="请输入数字" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateDialog = false">取 消</el-button>
          <el-button type="primary" @click="updateAdminVendorProfitSubmit">确 定</el-button>
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
        isLoading:false,
        total:0,
        formLabelWidth:'120px',
        userName:'',
        addDialog:false,//添加弹窗
        updateDialog:false,//修改弹窗
        addOptions:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "sm_partnerTypeID": '',
            "sm_apf_Provice": '',
            "sm_apf_City": '',
            "sm_apf_Percent": '',
          }
        },//添加参数
      }
    },
    computed: mapGetters([
      'adminVendorProfitList',
      'partnershipTypeList',
      'proviceList',
      'cityList',
      'updateAdminVendorProfitObj'
    ]),
    created(){
      this.initData(1)
      this.initContent().then(()=>{},err=>{
         this.$notify({
           message: err,
           type: 'error'
         });
      })
    },
    methods: {
      //选中省
      changeProvice(){
        let options = {}
        if(this.addOptions.data.sm_apf_Provice){
          this.addOptions.data.sm_apf_City = ''
          options = {
            areaPid:this.addOptions.data.sm_apf_Provice
          }
        }else{
          this.updateAdminVendorProfitObj.sm_apf_City = ''
          options = {
            areaPid:this.updateAdminVendorProfitObj.sm_apf_Provice
          }
        }
        this.$store.dispatch('initCityList',options)
        .then(()=>{},err=>{
          this.$notify({
            message: err,
            type: 'error'
          });
        })
      },
      async initContent(){
        //查询合作类型
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "sm_cp_ID": "",
          "sm_cp_Name": "",
          "sm_cp_IsDelete": 0
        };
        await this.$store.dispatch('initPartnershipType',options)

        //省
        let proviceOptions = {
          "areaPid": 3337
        }
        await this.$store.dispatch('initProviceList',proviceOptions)

      },
      //分页
      handleCurrentChange(num){
        this.initData(num)
      },
      //初始化
      initData(page){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "sm_apf_ID": "",
          "sm_partnerTypeID": "",
          "sm_apf_Provice": "",
          "sm_apf_City": "",
          "page": page?page:1,
          "rows": 5,
        }
        this.isLoading = true;
        this.$store.dispatch('initAdminVendorProfit',options)
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
        this.initData()
      },
      //添加
      addAdminVendorProfit(){
        this.addDialog = true;
        this.$store.commit('setTranstionFalse');
      },
      //添加提交
      addAdminVendorProfitSubmit(){
        if(Number(this.addOptions.data.sm_apf_Percent)>=1||Number(this.addOptions.data.sm_apf_Percent)<0||isNaN(this.addOptions.data.sm_apf_Percent)){
          this.$notify({
            message: '提成比例请输入0~1的小数',
            type: 'error'
          });
          return
        }
        this.$store.dispatch('AddAdminVendorProfitFee',this.addOptions)
        .then((suc)=>{
          this.$notify({
            message: suc,
            type: 'success'
          });
          this.initData(1)
        },err=>{
          this.$notify({
            message: err,
            type: 'error'
          });
        })
        this.addDialog = false;
      },
      //修改
      Update(id){
        this.updateDialog = true;
        this.$store.commit('setTranstionFalse');
        this.$store.commit('initUpdateAdminVendorProfitObj',id)
      },
      //修改提交
      updateAdminVendorProfitSubmit(){
        if(Number(this.updateAdminVendorProfitObj.sm_apf_Percent)>=1
          ||Number(this.updateAdminVendorProfitObj.sm_apf_Percent)<0
          ||isNaN(this.updateAdminVendorProfitObj.sm_apf_Percent)
        ){
          this.$notify({
            message: '提成比例请输入0~1的小数',
            type: 'error'
          });
          return
        }
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": this.updateAdminVendorProfitObj
        };
        this.$store.dispatch('UpdateAdminVendorProfit',updateOptions)
        .then((suc)=>{
          this.$notify({
            message: suc,
            type: 'success'
          });
          this.initData(1)
        },err=>{
          this.$notify({
            message: err,
            type: 'error'
          });
        });
        this.updateDialog = false
      },
      //删除
      Delete(id){
        let deleteOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "ID": id
        };
        this.$store.dispatch('DeleteAdminVendorProfit',deleteOptions)
        .then((suc)=>{
          this.$notify({
            message: suc,
            type: 'success'
          });
          this.initData(1)
        },err=>{
          this.$notify({
            message: err,
            type: 'error'
          });
        })
      }
    },
  }
</script>
<style scoped>

</style>
