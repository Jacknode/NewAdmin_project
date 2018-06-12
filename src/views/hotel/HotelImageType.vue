<template>
  <div>
    <section id="wrap">
      <h1 class="userClass">酒店图片类型</h1>
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>图片类型名称筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-input type="text" v-model="imageName" auto-complete="off" placeholder="图片类型名称" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search" size="small">查询</el-button>
            <el-button type="primary" @click="Add" size="small">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--数据展示-->
      <el-table
        :data="hotelImageTypeList"
        highlight-current-row
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column
          align="center"
          label="图片类型编码"
          prop="ht_it_ID">
        </el-table-column>
        <el-table-column
          align="center"
          label="图片类型名称"
          prop="ht_hi_Name">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="Update(scope.row.ht_it_ID)">修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="Delete(scope.row.ht_it_ID)">删除
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

      <!--添加酒店图片类型-->
      <el-dialog title="添加酒店图片类型" :visible.sync="addDialog">
        <el-form :model="addOptions">
          <el-form-item label="图片类型名称:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.ht_hi_Name" placeholder="请输入图片类型名称"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>

      <!--修改酒店图片类型-->
      <el-dialog title="修改酒店图片类型" :visible.sync="updateDialog">
        <el-form :model="updateHotelImageTypeObj">
          <el-form-item label="图片类型名称:" :label-width="formLabelWidth">
            <el-input v-model="updateHotelImageTypeObj.ht_hi_Name" placeholder="请输入图片类型名称"></el-input>
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
        addDialog:false,
        addOptions:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "ht_hi_Name": "",//图片类型名称
          }
        },
        imageName:'',
        total:0,
        isLoading:false,
        updateDialog:false,
        formLabelWidth:'120px'
      }
    },
    computed: mapGetters([
      'hotelImageTypeList',
      'updateHotelImageTypeObj'
    ]),
    created(){
      this.initData('',1)
    },
    methods: {
      //分页
      handleCurrentChange(num){
        this.initData(this.imageName,num)
      },
      //初始化数据
      initData(name,page){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "ht_it_ID": "",//图片类型编码
          "ht_hi_Name": name?name:'',//图片类型名称
          "page": page?page:1,
          "rows": 5
        };
        this.isLoading = true;
        this.$store.dispatch('initHotelImageType',options)
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
        this.initData(this.imageName,1)
      },
      //添加
      Add(){
        this.addDialog = true;
        this.$store.commit('setTranstionFalse');
      },
      //添加提交
      addSubmit(){
        this.$store.dispatch('AddHotelImageType',this.addOptions)
          .then((suc)=>{
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.imageName,1)
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
        this.$store.commit('initUpdateHotelImageType',id)
      },
      //修改提交
      updateSubmit(){
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "data": this.updateHotelImageTypeObj
        };
        this.$store.dispatch('UpdateHotelImageType',updateOptions)
          .then((suc)=>{
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.imageName,1)
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
            "operateUserName": "lb",
            "pcName": "",
            "data": {
              "ht_it_ID": id//图片类型编码
            }
          };
        this.$store.dispatch('DeleteHotelImageType',deleteOptions)
        .then((suc)=>{
          this.$notify({
            message: suc,
            type: 'success'
          });
          this.initData(this.imageName,1)
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
