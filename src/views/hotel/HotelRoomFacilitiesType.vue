<template>
  <div>
    <section id="wrap">
      <h1 class="userClass">酒店房间设施类型</h1>
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>房间设施类型名称筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-input type="text" v-model="roomName" auto-complete="off" placeholder="房间设施类型名称" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search" size="small">查询</el-button>
            <el-button type="primary" @click="Add" size="small">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--数据展示-->
      <el-table
        :data="hotelRoomFacilitiesTypeList"
        highlight-current-row
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column
          align="center"
          label="房间设施类型编码"
          prop="ht_rht_ID">
        </el-table-column>
        <el-table-column
          align="center"
          label="房间设施类型名称"
          prop="ht_rht_Name">
        </el-table-column>
        <!--<el-table-column-->
          <!--align="center"-->
          <!--label="是否启用"-->
        <!--&gt;-->
          <!--<template slot-scope="scope">-->
            <!--<span>{{scope.row.ht_rht_IsDelete | getHotName}}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="Update(scope.row.ht_rht_ID)">修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="Delete(scope.row.ht_rht_ID)">删除
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

      <!--添加房间设施类型-->
      <el-dialog title="添加房间设施类型" :visible.sync="addDialog">
        <el-form :model="addOptions">
          <el-form-item label="设施类型名称:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.ht_rht_Name" placeholder="请输入房间设施类型名称"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>

      <!--修改房间设施类型-->
      <el-dialog title="修改房间设施类型" :visible.sync="updateDialog">
        <el-form :model="updateHotelRoomFacilitiesTypeObj">
          <el-form-item label="设施类型名称:" :label-width="formLabelWidth">
            <el-input v-model="updateHotelRoomFacilitiesTypeObj.ht_rht_Name" placeholder="请输入房间设施类型名称"></el-input>
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
        roomName:'',
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
            "ht_rht_Name": '',//类型名称
            "ht_rht_IsDelete": "0",//是否启用
          }
        }
      }
    },
    computed: mapGetters([
      'hotelRoomFacilitiesTypeList',
      'updateHotelRoomFacilitiesTypeObj'
    ]),
    created(){
      this.initData('',1)
    },
    methods: {
      //分页
      handleCurrentChange(num){
        this.initData(this.roomName,num)
      },
      //初始化
      initData(name,page){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "ht_rht_ID": "",//房间设施类型ID
          "ht_rht_Name": name?name:'',//类型名称
          "page":page?page:1,//页码编号
          "rows":"5",//单页显示数量
        };
        this.isLoading = true;
        this.$store.dispatch('initHotelRoomFacilitiesType',options)
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
        this.initData(this.roomName,1)
      },
      //添加
      Add(){
        this.addDialog = true;
        this.$store.commit('setTranstionFalse');
      },
      //添加提交
      addSubmit(){
        this.$store.dispatch('AddHotelRoomFacilitiesType',this.addOptions)
          .then((suc)=>{
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.roomName,1)
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
        this.$store.commit('initUpdateHotelRoomFacilitiesType',id);
      },
      //修改提交
      updateSubmit(){
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "data": this.updateHotelRoomFacilitiesTypeObj
        };
        this.$store.dispatch('UpdateHotelRoomFacilitiesType',updateOptions)
          .then((suc)=>{
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.roomName,1)
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
            "ht_rht_ID": id//设施编码
          }
        };
        this.$store.dispatch('DeleteHotelRoomFacilitiesType',deleteOptions)
        .then((suc)=>{
          this.$notify({
            message: suc,
            type: 'success'
          });
          this.initData(this.roomName,1)
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
