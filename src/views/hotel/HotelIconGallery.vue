<template>
  <div>
    <section id="wrap">
      <h1 class="userClass">酒店图标库</h1>
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>图标名称筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-input type="text" v-model="iconName" auto-complete="off" placeholder="图标名称" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search" size="small">查询</el-button>
            <el-button type="primary" @click="Add" size="small">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--数据展示-->
      <el-table
        :data="hotelIconGalleryList"
        highlight-current-row
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column
          align="center"
          label="图标编码"
          prop="ht_ie_ID">
        </el-table-column>
        <el-table-column
          align="center"
          label="图标名称"
          prop="ht_ie_Name">
        </el-table-column>
        <!--<el-table-column-->
          <!--align="center"-->
          <!--label="图片路径"-->
          <!--prop="ht_ie_Image">-->
        <!--</el-table-column>-->
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="Update(scope.row.ht_ie_ID)">修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="Delete(scope.row.ht_ie_ID)">删除
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

      <!--添加图标-->
      <el-dialog title="添加图标" :visible.sync="addDialog">
        <el-form :model="addOptions">
          <el-form-item label="图标名称:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.ht_ie_Name" placeholder="请输入图标名称"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>

      <!--修改图标-->
      <el-dialog title="修改图标" :visible.sync="updateDialog">
        <el-form :model="updateHotelIconGalleryObj">
          <el-form-item label="图标名称:" :label-width="formLabelWidth">
            <el-input v-model="updateHotelIconGalleryObj.ht_ie_Name" placeholder="请输入图标名称"></el-input>
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
        iconName:'',
        ImageURL:[],
        ImageURL1:[],
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
            "ht_ie_Name": "",//图标名称
            "ht_ie_Image": "",//图标
            "ht_id_Remark": "",//备注
          }
        }
      }
    },
    computed: mapGetters([
      'hotelIconGalleryList',
      'updateHotelIconGalleryObj'
    ]),
    created(){
      this.initData('',1)
    },
    methods: {
      //分页
      handleCurrentChange(num){
        this.initData(this.iconName,num)
      },
      //查询
      search(){
        this.initData(this.iconName)
      },
      //初始化
      initData(name,page){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "ht_ie_ID": "",//图标库ID
          "ht_ie_Name": name?name:'',//图标名称
          "ht_ie_Image": '',//图标
          "ht_id_Remark": "",//备注
          page:page?page:1,
          rows:'5'
        }
        this.isLoading = true;
        this.$store.dispatch('initHotelIconGallery',options)
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
        this.addDialog = true;
        this.$store.commit('setTranstionFalse');
      },
      //添加提交
      addSubmit(){
        this.$store.dispatch('AddHotelIconGallery',this.addOptions)
          .then((suc)=>{
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.iconName,1)
          },err=>{
            this.$notify({
              message: err,
              type: 'error'
            });
          });
        this.addDialog = false;
      },
      Update(id){
        this.$store.commit('initUpdateHotelIconGallery',id);
        this.updateDialog = true;
        this.$store.commit('setTranstionFalse');

      },
      //修改提交
      updateSubmit(){
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "data": this.updateHotelIconGalleryObj
        };
        this.$store.dispatch('UpdateHotelIconGallery',updateOptions)
          .then((suc)=>{
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.iconName,1)
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
            "ht_ie_ID": id//图标库ID
          }
        };
        this.$store.dispatch('DeleteHotelIconGallery',deleteOptions)
          .then((suc)=>{
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.iconName,1)
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
