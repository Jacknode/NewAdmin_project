<template>
  <div>
    <section id="wrap">
      <h1 class="userClass">酒店主题类别</h1>
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>主题类别名称筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-input type="text" v-model="categoryName" auto-complete="off" placeholder="主题类别名称" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search" size="small">查询</el-button>
            <el-button type="primary" @click="Add" size="small">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--数据展示-->
      <el-table
        :data="hotelThemeCategoryList"
        highlight-current-row
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column
          align="center"
          label="类别编码"
          prop="ht_tt_ThemeID">
        </el-table-column>
        <el-table-column
          align="center"
          label="类别名称"
          prop="ht_tt_Name">
        </el-table-column>
        <el-table-column
          align="center"
          label="是否热门"
          prop="ht_tt_IsHot">
          <template slot-scope="props">
            <span>{{props.row.ht_tt_IsHot | getHotName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="Update(scope.row.ht_tt_ThemeID)">修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="Delete(scope.row.ht_tt_ThemeID)">删除
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

      <!--添加主题类别-->
      <el-dialog title="添加主题类别" :visible.sync="addDialog">
        <el-form :model="addOptions">
          <el-form-item label="主题类别名称:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.ht_tt_Name" placeholder="请输入主题类别名称"></el-input>
          </el-form-item>
          <el-form-item label="是否热门:" :label-width="formLabelWidth">
            <el-switch
              v-model="addOptions.data.ht_tt_IsHot"
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

      <!--修改主题类别-->
      <el-dialog title="修改主题类别" :visible.sync="updateDialog">
        <el-form :model="updateHotelThemeCategoryObj">
          <el-form-item label="主题类别名称:" :label-width="formLabelWidth">
            <el-input v-model="updateHotelThemeCategoryObj.ht_tt_Name" placeholder="请输入主题类别名称"></el-input>
          </el-form-item>
          <el-form-item label="是否热门:" :label-width="formLabelWidth">
            <el-switch
              v-model="updateHotelThemeCategoryObj.ht_tt_IsHot"
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
        categoryName:'',
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
            "ht_tt_Name": "",//主题名称
            "ht_tt_IsHot": "",//
          }
        }
      }
    },
    computed: mapGetters([
      'hotelThemeCategoryList',
      'updateHotelThemeCategoryObj'
    ]),
    created(){
      this.initData('',1);
    },
    methods: {
      //分页
      handleCurrentChange(num){
        this.initData(this.categoryName,num);
      },
      //查询
      search(){
        this.initData(this.categoryName,1)
      },
      //初始化
      initData(name,page){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "ht_tt_ThemeID": "",//主题ID
          "ht_tt_Name": name?name:'',//主题名称
          "ht_tt_IsHot": "",//是否热门
          "page":page?page:1,//页码编号
          "rows":"5",//单页显示数量
        }
        this.isLoading = true;
        this.$store.dispatch('initHotelThemeCategory',options)
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
        this.$store.dispatch('AddHotelThemeCategory',this.addOptions)
          .then((suc)=>{
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.categoryName,1)
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
        this.$store.commit('initUpdateHotelThemeCategory',id);
      },
      //修改提交
      updateSubmit(){
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "data": this.updateHotelThemeCategoryObj
        }
        this.$store.dispatch('UpdateHotelThemeCategory',updateOptions)
          .then((suc)=>{
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.categoryName,1)
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
            "ht_tt_ThemeID": id//图片类型编码
          }
        };
        this.$store.dispatch('DeleteHotelThemeCategory',deleteOptions)
        .then((suc)=>{
          this.$notify({
            message: suc,
            type: 'success'
          });
          this.initData(this.categoryName,1)
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
