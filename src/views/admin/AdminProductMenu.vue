<template>
  <div>
    <section id="wrap">
      <h1>产品线路总菜单</h1>
      <!--查询-->
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>菜单ID筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-input type="text" v-model="meunIdValue" auto-complete="off" placeholder="请输入菜单ID"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
            <el-button type="primary" @click="addProductMenu">添加</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--数据展示-->
      <el-table
        :data="adminProductMenuList"
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column
          prop="ts_mu_ID"
          align="center"
          label="菜单ID"
        >
        </el-table-column>
        <el-table-column
          prop="ts_mu_Name"
          align="center"
          label="菜单名称"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--添加菜单-->
      <el-dialog title="添加菜单" :visible.sync="addProductMenuBox">
        <el-form :model="addProductMenuObj" :label-width="formLabelWidth">
          <el-form-item label="菜单名称:">
            <el-input v-model="addProductMenuObj.tsMuName" placeholder="请输入菜单名称"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addProductMenuBox = false">取 消</el-button>
          <el-button type="primary" @click="addProductMenuBoxSubmit">确 定</el-button>
        </div>
      </el-dialog>
      <!--修改菜单-->
      <el-dialog title="添加菜单" :visible.sync="updateProductMenuBox">
        <el-form :model="updateMenuObj" :label-width="formLabelWidth">
          <el-form-item label="菜单ID:">
            <el-input v-model="updateMenuObj.ts_mu_ID" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="菜单名称:">
            <el-input v-model="updateMenuObj.ts_mu_Name"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateProductMenuBox = false">取 消</el-button>
          <el-button type="primary" @click="updateProductMenuSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </section>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    name: '',
    computed: mapGetters([
      'adminProductMenuList',
      'updateMenuObj'
    ]),
    data() {
      return {
        meunIdValue: '',
        addProductMenuObj:{
          tsMuName:''
        },
        addProductMenuBox:false,
        isLoading:false,
        formLabelWidth:'120px',
        updateProductMenuObj:{

        },
        updateProductMenuBox:false,
      }
    },
    methods: {
      initData() {
        var selectMenu = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "menuID": this.meunIdValue ? this.meunIdValue : '',
          "isDelete": 0
        };
        this.isLoading = true;
        this.$store.dispatch('AdminProductMenu', selectMenu)
          .then(()=>{
            this.isLoading = false;
          },err=>{
            this.$notify({
              message: err,
              type: 'error'
            });
          });
      },
      search() {
        this.initData()
      },
//      添加菜单
      addProductMenu(){
        this.$store.commit('setTranstionFalse');
        this.addProductMenuBox = true;
      },
      addProductMenuBoxSubmit() {
        var Insert = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "data": {
            "ts_mu_Name": this.addProductMenuObj.tsMuName,
          }
        };
        this.$store.dispatch("addProductMenu",Insert)
          .then(suc=>{
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.addProductMenuBox = false;
          },err=>{
            this.$notify({
              message: err,
              type: 'error'
            });
          })
        this.initData();
      },
      //修改菜单
      handleEdit(id){
        this.$store.commit('setTranstionFalse');
        this.$store.commit('initUpdateMenu',id.ts_mu_ID)
        this.updateProductMenuBox = true;
      },
      updateProductMenuSubmit(){
        var updateMenu = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "productID": this.updateMenuObj.ts_mu_ID
        }
        this.$store.dispatch('updateProductMenuSubmit',updateMenu)
          .then(suc=>{
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
          })
        this.updateProductMenuBox = false;
      },
      handleDelete(id){
        var deleteMenuObj = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "menuID": id.ts_mu_ID

        }
        this.$store.dispatch("deleteMenu",deleteMenuObj)
          .then(suc=>{
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
          })
      }
    },
    mounted() {
    }
  }
</script>
<style>
  h1 {
    padding: 20px;
    font-size: 18px;
  }
</style>
