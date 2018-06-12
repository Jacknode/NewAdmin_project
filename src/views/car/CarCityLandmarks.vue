<template>
  <section id="wrap">
    <h1 class="userClass">城市地标</h1>
    <el-col :span="24" class="formSearch">
      <el-form :inline="true">
        <el-form-item>
          <span>地标类型筛选:</span>
        </el-form-item>
        <el-form-item>
          <!--<el-input type="text" v-model="carName" auto-complete="off" placeholder="属性名称" size="small"></el-input>-->
          <el-select v-model="typeID" placeholder="请选择">
            <el-option
              v-for="item in carCityLandmarksBasisTypeList"
              :key="item.cr_cra_Id"
              :label="item.cr_cra_Name"
              :value="item.cr_cra_Id">
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
      :data="carCityLandmarksList"
      highlight-current-row
      v-loading="isLoading"
      style="width: 100%">
      <el-table-column
        align="center"
        label="城市地标ID"
        prop="cr_cl_Id">
      </el-table-column>
      <el-table-column
        align="center"
        label="城市名称"
        prop="cr_cl_CityName">
      </el-table-column>
      <el-table-column
        align="center"
        label="地标名称"
        prop="cr_cl_Name">
      </el-table-column>
      <el-table-column
        align="center"
        label="地标类型名称"
        prop="cr_cl_AttrName">
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
            @click="Delete(scope.row.cr_cl_Id)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <div class="block" style="float: right;">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="total"
        v-show="total"
      >
      </el-pagination>
    </div>

    <!--添加城市地标-->
    <el-dialog title="添加城市地标" :visible.sync="addDialog">
      <el-form :model="addOptions">
        <el-form-item label="省:" :label-width="formLabelWidth">
          <el-select v-model="proviceID" placeholder="请选择省" size="mini" @change="changeProvice">
            <el-option
              v-for="item in carProvinceDataList"
              :key="item.sm_af_AreaID"
              :label="item.sm_af_AreaName"
              :value="item.sm_af_AreaID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="市:" :label-width="formLabelWidth">
          <el-select v-model="addOptions.data.cr_cl_CityId" placeholder="请选择市" size="mini">
            <el-option
              v-for="item in carCityDataList"
              :key="item.sm_af_AreaID"
              :label="item.sm_af_AreaName"
              :value="item.sm_af_AreaID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地标类型:" :label-width="formLabelWidth">
          <el-select v-model="addOptions.data.cr_cl_AttrId" placeholder="请选择市" size="mini">
            <el-option
              v-for="item in carCityLandmarksBasisTypeList"
              :key="item.cr_cra_Id"
              :label="item.cr_cra_Name"
              :value="item.cr_cra_Id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地标名称:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.cr_cl_Name" placeholder="请输入地标名称"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改城市地标-->
    <el-dialog title="修改城市地标" :visible.sync="updateDialog">
      <el-form :model="updateOptions">
        <el-form-item label="省:" :label-width="formLabelWidth">
          <el-select v-model="proviceID" placeholder="请选择省" size="mini" @change="changeProvice">
            <el-option
              v-for="item in carProvinceDataList"
              :key="item.sm_af_AreaID"
              :label="item.sm_af_AreaName"
              :value="item.sm_af_AreaID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="市:" :label-width="formLabelWidth">
          <el-select v-model="updateOptions.cr_cl_CityId" placeholder="请选择市" size="mini">
            <el-option
              v-for="item in carCityDataList"
              :key="item.sm_af_AreaID"
              :label="item.sm_af_AreaName"
              :value="item.sm_af_AreaID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地标类型:" :label-width="formLabelWidth">
          <el-select v-model="updateOptions.cr_cl_AttrId" placeholder="请选择市" size="mini">
            <el-option
              v-for="item in carCityLandmarksBasisTypeList"
              :key="item.cr_cra_Id"
              :label="item.cr_cra_Name"
              :value="item.cr_cra_Id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地标名称:" :label-width="formLabelWidth">
          <el-input v-model="updateOptions.cr_cl_Name" placeholder="请输入地标名称"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="updateSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    name: '',
    data(){
      return {
        typeID: '',
        total: 0,
        proviceID:'',
        isLoading: false,
        addDialog: false,
        updateDialog: false,
        formLabelWidth: '120px',
        updateOptions: {},
        addOptions:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "data": {
            "cr_cl_CityId": "",//城市ID
            "cr_cl_Name": "",//地标名称
            "cr_cl_AttrId": "",//地标类型Id
          }
        }
      }
    },
    computed: mapGetters([
      'carCityLandmarksBasisTypeList',
      'carCityLandmarksList',
      'carProvinceDataList',
      'carCityDataList'
    ]),
    created(){
      this.initCarBasis().then(() => {
        this.initData('', 1)
      }, err => {
        console.log(err)
      })
    },
    methods: {
      //查询
      search(){
        this.initData(this.typeID, 1);
      },
      //分页
      handleCurrentChange(num){
        this.initData(this.typeID, num);
      },
      //初始化基础数据
      async initCarBasis(){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "page": "",//分页号
          "rows": "",//单页显示数据量
          "cr_cra_Id": "",//属性编号
          "cr_cra_Name": "",//属性名称
          "cr_car_PId": "6",//属性父ID
        };
        await this.$store.dispatch('initCarCityLandmarksBasisType', options)

        let cityOptions = {
          areaPid: 3337
        };
        await this.$store.dispatch('initCarProvinceData', cityOptions)
      },
      //选中省
      changeProvice(){
        let options = {
          areaPid:this.proviceID
        }
        this.$store.dispatch('initCarCityData', options)
      },
      //修改取消
      cancel(){
        this.initData('', 1);
        this.addDialog = false;
        this.updateDialog = false;
      },
      initData(typeID, page){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "page": page ? page : 1,//分页号
          "rows": "10",//单页显示数据量
          "cr_cl_Id": "",//城市地标ID
          "cr_cl_CityId": "",//城市ID
          "cr_cl_AttrId": typeID ? typeID : '',//地标类型Id
        };
        this.isLoading = true;
        this.$store.dispatch('initCarCityLandmarks', options)
        .then(total => {
          this.total = total;
          this.isLoading = false;
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          });
        })
      },
      //添加
      Add(){
        this.$store.commit('setTranstionFalse');
        this.addDialog = true;
      },
      //添加提交
      addSubmit(){
        this.$store.dispatch('AddCarCityLandmarks',this.addOptions)
        .then((suc)=>{
          this.$notify({
            message: suc,
            type: 'success'
          });
          this.initData(this.typeID,1)
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
        this.updateOptions = obj;
        this.$store.commit('setTranstionFalse');
        this.updateDialog = true;
      },
      //修改提交
      updateSubmit(){
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "data": {
            "cr_cl_Id": this.updateOptions.cr_cl_Id,//城市地标ID
            "cr_cl_CityId": this.updateOptions.cr_cl_CityId,//城市ID
            "cr_cl_Name": this.updateOptions.cr_cl_Name,//地标名称
            "cr_cl_AttrId": this.updateOptions.cr_cl_AttrId,//地标类型Id
          }
        };
        this.$store.dispatch('UpdateCarCityLandmarks',updateOptions)
        .then((suc)=>{
          this.$notify({
            message: suc,
            type: 'success'
          });
          this.initData(this.typeID,1)
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
            "cr_cl_Id": id//城市地标ID
          }
        };
        this.$store.dispatch('DeleteCarCityLandmarks',deleteOptions)
        .then((suc)=>{
          this.$notify({
            message: suc,
            type: 'success'
          });
          this.initData('',1)
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
