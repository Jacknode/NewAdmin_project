<template>
  <div>
    <section id="wrap">
      <h1 class="userClass">广告类型收费方式</h1>
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item label="广告类型名称:" :label-width="formLabelWidth">
            <el-select v-model="adTypeName"  placeholder="请选择广告类型名称">
              <el-option
                v-for="item in adTypeList"
                :key="item.sm_at_ID"
                :label="item.sm_at_Name"
                :value="item.sm_at_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="收费方式:" :label-width="formLabelWidth">
            <el-select v-model="adPayWay"  placeholder="请选择广告收费方式">
              <el-option
                v-for="item in adChargeWayList"
                :key="item.sm_icw_ID"
                :label="item.sm_icw_Name"
                :value="item.sm_icw_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search" size="small">查询</el-button>
            <el-button type="primary" @click="Add" size="small">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--数据展示-->
      <el-table
        :data="adTypeChargeModeList"
        highlight-current-row
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column
          align="center"
          label="广告类型收费方式标识"
          prop="sm_aicw_ID">
        </el-table-column>
        <el-table-column
          align="center"
          label="广告类型"
          prop="sm_at_Name">
        </el-table-column>
        <el-table-column
          align="center"
          label="收费方式"
          prop="sm_icw_Name">
        </el-table-column>
        <el-table-column
          align="center"
          label="备注"
          prop="sm_aicw_Remark">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="Update(scope.row)">修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="Delete(scope.row.sm_aicw_ID)">删除
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

      <!--添加广告类型收费方式-->
      <el-dialog title="添加广告类型收费方式" :visible.sync="addDialog">
        <el-form :model="addOptions">
          <el-form-item label="标识:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.sm_aicw_ID" placeholder="请输入广告类型收费方式标识" :disabled="isOff" ></el-input>
          </el-form-item>
          <el-form-item label="广告类型名称:" :label-width="formLabelWidth">
            <el-select v-model="adTypeName"  placeholder="请选择广告类型名称">
              <el-option
                v-for="item in adTypeList"
                :key="item.sm_at_ID"
                :label="item.sm_at_Name"
                :value="item.sm_at_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="收费方式:" :label-width="formLabelWidth">
            <el-select v-model="adPayWay"  placeholder="请选择广告收费方式">
              <el-option
                v-for="item in adChargeWayList"
                :key="item.sm_icw_ID"
                :label="item.sm_icw_Name"
                :value="item.sm_icw_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.sm_aicw_Remark" placeholder="请输入备注" type="textarea" :rows="4"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>

      <!--修改广告类型收费方式-->
      <el-dialog title="修改广告类型收费方式" :visible.sync="updateDialog">
        <el-form :model="updateAdTypeChargeWayObj">
          <el-form-item label="广告类型收费方式标识:" :label-width="formLabelWidth">
            <el-input v-model="updateAdTypeChargeWayObj.data.sm_aicw_ID" placeholder="广告类型收费方式标识"  :disabled="isOff"></el-input>
          </el-form-item>
          <el-form-item label="广告类型名称:" :label-width="formLabelWidth">
            <el-select v-model="adTypeName"  placeholder="请选择广告类型名称">
              <el-option
                v-for="item in adTypeList"
                :key="item.sm_at_ID"
                :label="item.sm_at_Name"
                :value="item.sm_at_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="收费方式:" :label-width="formLabelWidth">
            <el-select v-model="adPayWay"  placeholder="请选择广告收费方式">
              <el-option
                v-for="item in adChargeWayList"
                :key="item.sm_icw_ID"
                :label="item.sm_icw_Name"
                :value="item.sm_icw_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注:" :label-width="formLabelWidth">
            <el-input v-model="updateAdTypeChargeWayObj.data.sm_aicw_Remark" placeholder="备注" type="textarea" :rows="4"></el-input>
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
        adTypeChargeMode:'',
        //广告类型名称
        adTypeName:'',
        //广告收费方式
        adPayWay:'',
        addDialog:false,
        updateDialog:false,
        total:0,
        updateAdTypeChargeWayObj:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "sm_aicw_ID": "",//广告类型收费方式标识
            "sm_icw_ID": "",//收费方式编码
            "sm_at_ID": "",//广告类型编码
            "sm_aicw_Remark": "",//备注
          }
        },
        addOptions:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "page": "1",
            "rows": "4",
            "sm_aicw_ID": "",//广告类型收费方式标识
            "sm_icw_ID": "",//收费方式编码
            "sm_at_ID": "",//广告类型编码
            "sm_aicw_Remark": "",//备注
          }
        },
      }
    },
    computed: mapGetters([
      'adTypeChargeModeList',
//      'updateAdTypeChargeModeObj',
      'adTypeList',
      'adChargeWayList'
    ]),
    created(){
      this.initData();
      //查询广告类型名称
      this.searchADTypeName();
      //查询广告收费方式
      this.searchADChargeWay();
    },
    methods: {
      //查询广告类型名称
      searchADTypeName(){
        let option ={
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "page": "1",
          "rows": "10",
          "sm_at_ID": "",//广告类型编号
          "sm_at_Name": "",//广告类型名称
          "sm_at_Cost": "",//收费金额
          "sm_at_Remark": "",//备注
        };
        this.$store.dispatch("initAdTypeList",option)
          .then(() => {
          }, (err) => {
            this.$notify({
              message: err,
              type: "error"
            });
          });
      },
      //查询收费方式
      searchADChargeWay(){
        let option ={
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "sm_icw_ID": "",//收费方式编码
          "sm_icw_Name": "",//收费方式名称
          "sm_icw_Remark": "",//备注
        };
        this.$store.dispatch("initAdChargeWayList",option)
          .then(() => {
          }, (err) => {
            this.$notify({
              message: err,
              type: "error"
            });
          });
      },
      //分页
      handleCurrentChange(num){
        this.initData(this.adTypeChargeMode,num)
      },
      //查询
      search(){
        this.initData(this.adTypeName,this.adPayWay,1)
      },
      initData(chargeWay,adType,page){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "sm_aicw_ID":"",//广告类型收费方式标识
          "sm_icw_ID": chargeWay?chargeWay+'':"",//收费方式编码
          "sm_at_ID": adType?adType+'':'',//广告类型编码
          "sm_aicw_Remark": "",//备注
          "page": page?page:1,
          "rows": 4
        };
        this.isLoading = true;
        this.$store.dispatch('initAdTypeChargeMode',options)
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
        this.adTypeName='';
        this.adPayWay='';
        let obj = this.addOptions.data;
        obj.sm_icw_ID ='';
        obj.sm_at_ID ='';
        obj.sm_aicw_Remark ='';
        this.addDialog = true;
        this.$store.commit('setTranstionFalse');
      },
      //添加提交 adTypeName adPayWay
      addSubmit(){
        this.addOptions.data.sm_at_ID=this.adTypeName;
        this.addOptions.data.sm_icw_ID=this.adPayWay;
        this.$store.dispatch('AddAdTypeChargeMode',this.addOptions)
          .then((suc)=>{
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData()
          },err=>{
            this.$notify({
              message: err,
              type: 'error'
            });
          });
        this.addDialog = false;
      },
      //修改
      Update(obj){
        this.adTypeName=obj.sm_at_ID;
        this.adPayWay=obj.sm_icw_ID;
        this.updateAdTypeChargeWayObj.data.sm_aicw_ID=obj.sm_aicw_ID;
        this.updateAdTypeChargeWayObj.data.sm_aicw_Remark=obj.sm_aicw_Remark;
        this.updateAdTypeChargeWayObj.data.sm_at_ID=obj.sm_at_ID;
        this.updateAdTypeChargeWayObj.data.sm_icw_ID=obj.sm_icw_ID;
        this.updateDialog = true;
        this.$store.commit('setTranstionFalse');
//        this.$store.commit('initUpdateAdTypeChargeMode',id)
      },
      //修改提交
      updateSubmit(){
        this.updateAdTypeChargeWayObj.data.sm_at_ID=this.adTypeName;
        this.updateAdTypeChargeWayObj.data.sm_icw_ID=this.adPayWay;
        this.$store.dispatch('UpdateAdTypeChargeMode',this.updateAdTypeChargeWayObj)
          .then((suc)=>{
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData()
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
          "data": {
            "sm_aicw_ID": id,//广告类型收费方式标识
          }
        };
        this.$store.dispatch('DeleteAdTypeChargeMode',deleteOptions)
          .then((suc)=>{
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.adTypeChargeMode)
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
