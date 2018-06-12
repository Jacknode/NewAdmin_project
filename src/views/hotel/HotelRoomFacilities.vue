<template>
  <div>

    <section id="wrap">
      <h1 class="userClass">酒店房间设施管理</h1>
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>房间设施名称筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-input type="text" v-model="facilitiesName" auto-complete="off" placeholder="房间设施名称" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search" size="small">查询</el-button>
            <el-button type="primary" @click="Add" size="small">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--数据展示-->
      <el-table
        :data="hotelRoomFacilitiesList"
        highlight-current-row
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column
          align="center"
          label="房间设施编码"
          prop="ht_rh_ID">
        </el-table-column>
        <el-table-column
          align="center"
          label="房间设施名称"
          prop="ht_rh_Name">
        </el-table-column>
        <el-table-column
          align="center"
          label="房间设施类型名称"
          prop="ht_hd_HardTypeName">
        </el-table-column>
        <el-table-column
          align="center"
          label="是否热门"
        >
          <template slot-scope="props">
            <span>{{props.row.ht_rh_IsHot | getHotName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="Update(scope.row.ht_rh_ID)">修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="Delete(scope.row.ht_rh_ID)">删除
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

      <!--添加房间设施-->
      <el-dialog title="添加房间设施" :visible.sync="addDialog">
        <el-form :model="addOptions">
          <el-form-item label="房间设施类型:" :label-width="formLabelWidth">
            <el-select v-model="addOptions.data.ht_rh_RoomHardTypeID" placeholder="请选择房间设施类型" size="small">
              <el-option
                v-for="item in hotelRoomFacilitiesTypeAllList"
                :key="item.ht_rht_ID"
                :label="item.ht_rht_Name"
                :value="item.ht_rht_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设施名称:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.ht_rh_Name" placeholder="请输入设施名称"></el-input>
          </el-form-item>
          <el-form-item label="是否热门:" :label-width="formLabelWidth">
            <el-switch
              v-model="addOptions.data.ht_rh_IsHot"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="1"
              inactive-value="0">
            </el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>

      <!--修改房间设施-->
      <el-dialog title="修改房间设施" :visible.sync="updateDialog">
        <el-form :model="updateHotelRoomFacilitiesObj">
          <el-form-item label="房间设施类型:" :label-width="formLabelWidth">
            <el-select v-model="updateHotelRoomFacilitiesObj.ht_rh_RoomHardTypeID" placeholder="请选择房间设施类型" size="small">
              <el-option
                v-for="item in hotelRoomFacilitiesTypeAllList"
                :key="item.ht_rht_ID"
                :label="item.ht_rht_Name"
                :value="item.ht_rht_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设施名称:" :label-width="formLabelWidth">
            <el-input v-model="updateHotelRoomFacilitiesObj.ht_rh_Name" placeholder="请输入设施名称"></el-input>
          </el-form-item>
          <el-form-item label="是否热门:" :label-width="formLabelWidth">
            <el-switch
              v-model="updateHotelRoomFacilitiesObj.ht_rh_IsHot"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="1"
              inactive-value="0">
            </el-switch>
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
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "data": {
            "ht_rh_Name": "",//设施名称
            "ht_rh_RoomHardTypeID": "",//房间设施类型ID
            "ht_rh_IsHot": "",//是否热门
          }
        }
      }
    },
    computed: mapGetters([
      'hotelRoomFacilitiesList',
      'hotelRoomFacilitiesTypeAllList',
      'updateHotelRoomFacilitiesObj'
    ]),
    created(){
      this.initData('',1)
    },
    methods: {
      //分页
      handleCurrentChange(num){
        this.initData(this.facilitiesName,num);
      },
      initData(name,page){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "ht_rh_ID": "",//房型设施
          "ht_rh_Name": name?name:'',//设施名称
          "ht_rh_RoomHardTypeID": "",//房间设施类型ID
          "ht_rh_IsHot": "",//是否热门
          "page":page?page:1,//页码编号
          "rows":"5",//单页显示数量
        };
        this.isLoading = true;
        this.$store.dispatch('initHotelRoomFacilities',options)
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
        this.$store.dispatch('AddHotelRoomFacilities',this.addOptions)
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
        this.$store.commit('initUpdateHotelRoomFacilities',id);
      },
      //修改提交
      updateSubmit(){
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "lb",
          "pcName": "",
          "data": this.updateHotelRoomFacilitiesObj
        };
        this.$store.dispatch('UpdateHotelRoomFacilities',updateOptions)
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
            " ht_rht_ID": id//房型设施
          }
        }
        this.$store.dispatch('DeleteHotelRoomFacilities',deleteOptions)
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
