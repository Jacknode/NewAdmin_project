<template>
  <div>
    <section id="wrap">
      <h1 class="userClass">酒店设施管理</h1>
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>设施名称筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-input type="text" v-model="facilitiesName" auto-complete="off" placeholder="设施名称" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search" size="small">查询</el-button>
            <el-button type="primary" @click="Add" size="small">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--数据展示-->
      <el-table
        :data="hotelFacilitiesList"
        highlight-current-row
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column
          align="center"
          label="设施编码"
          prop="ht_hd_ID">
        </el-table-column>
        <el-table-column
          align="center"
          label="设施名称"
          prop="ht_hd_Name">
        </el-table-column>
        <el-table-column
          align="center"
          label="设施类型名称"
          prop="ht_hd_HardTypeName">
        </el-table-column>
        <el-table-column
          align="center"
          label="是否热门"
          prop="ht_tt_IsHot">
          <template slot-scope="props">
            <span>{{props.row.ht_hd_IsHot | getHotName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="备注"
          prop="ht_hd_Remark">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="Update(scope.row.ht_hd_ID)">修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="Delete(scope.row.ht_hd_ID)">删除
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

      <!--添加设施-->
      <el-dialog title="添加设施" :visible.sync="addDialog">
        <el-form :model="addOptions">
          <el-form-item label="设施类型选择:" :label-width="formLabelWidth">
            <el-select v-model="addOptions.data.ht_hd_HardTypeID" placeholder="请选择" size="small">
              <el-option
                v-for="item in hotelFacilitiesTypeAllList"
                :key="item.ht_ht_ID"
                :label="item.ht_ht_Name"
                :value="item.ht_ht_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设施名称:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.ht_hd_Name" placeholder="请输入设施名称"></el-input>
          </el-form-item>
          <el-form-item label="是否热门:" :label-width="formLabelWidth">
            <el-switch
              v-model="addOptions.data.ht_hd_IsHot"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="1"
              inactive-value="0">
            </el-switch>
          </el-form-item>
          <el-form-item label="备注:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.ht_hd_Remark" placeholder="请输入备注"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>

      <!--修改设施-->
      <el-dialog title="修改设施" :visible.sync="updateDialog">
        <el-form :model="addOptions">
          <el-form-item label="设施类型选择:" :label-width="formLabelWidth">
            <el-select v-model="updateHotelFacilitiesObj.ht_hd_HardTypeID" placeholder="请选择" size="small">
              <el-option
                v-for="item in hotelFacilitiesTypeAllList"
                :key="item.ht_ht_ID"
                :label="item.ht_ht_Name"
                :value="item.ht_ht_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设施名称:" :label-width="formLabelWidth">
            <el-input v-model="updateHotelFacilitiesObj.ht_hd_Name" placeholder="请输入设施名称"></el-input>
          </el-form-item>
          <el-form-item label="是否热门:" :label-width="formLabelWidth">
            <el-switch
              v-model="updateHotelFacilitiesObj.ht_hd_IsHot"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="1"
              inactive-value="0">
            </el-switch>
          </el-form-item>
          <el-form-item label="备注:" :label-width="formLabelWidth">
            <el-input v-model="updateHotelFacilitiesObj.ht_hd_Remark" placeholder="请输入备注"></el-input>
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
        facilitiesName:'',
        total:0,
        isLoading:false,
        addDialog:false,
        updateDialog:false,
        formLabelWidth:'120px',
        addOptions:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "ht_hd_Name": "",//设施名称
            "ht_hd_HardTypeID": "",//设施类型ID
            "ht_hd_IsHot": "",//是否热门
            "ht_hd_Remark": "",//备注
          }
        }

      }
    },
    computed: mapGetters([
      'hotelFacilitiesList',
      'hotelFacilitiesTypeAllList',
      'updateHotelFacilitiesObj'
    ]),
    created(){
      this.initData('',1)
    },
    methods: {
      //分页
      handleCurrentChange(num){
        this.initData(this.facilitiesName,num)
      },
      initData(name,page){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "ht_hd_ID": "",//设施编码
          "ht_hd_Name": name?name:'',//设施名称
          "ht_hd_HardTypeID": "",//设施类型ID
          "ht_hd_IsHot": "",//是否热门
          "page":page?page:1,//页码编号
          "rows":"5",//单页显示数量
        };
        this.isLoading = true;
        this.$store.dispatch('initHotelFacilities',options)
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
        this.initData(this.facilitiesName,1)
      },
      //添加
      Add(){
        this.addDialog = true;
        this.$store.commit('setTranstionFalse');
      },
      //添加提交
      addSubmit(){
        this.$store.dispatch('AddHotelFacilities',this.addOptions)
          .then((suc)=>{
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.facilitiesName,1)
          },err=>{
            this.$notify({
              message: err,
              type: 'error'
            });
          });
        this.addDialog = false;
      },
      //修改
      Update(id){
        this.updateDialog = true;
        this.$store.commit('setTranstionFalse');
        this.$store.commit('initUpdateHotelFacilities',id);
      },
      //修改提交
      updateSubmit(){
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": this.updateHotelFacilitiesObj
        };
v
        this.updateDialog = false;
      },
      //删除
      Delete(id){
        let deleteOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "data": {
            "ht_hd_ID": id//设施编码
          }
        };
        this.$store.dispatch('DeleteHotelFacilities',deleteOptions)
        .then((suc)=>{
          this.$notify({
            message: suc,
            type: 'success'
          });
          this.initData(this.facilitiesName,1)
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
