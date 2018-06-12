<template>
  <div>
    <div id="wrap" class="clearfix">
      <h1 class="userClass">系统总菜单</h1>
      <!--查询-->
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>系统菜单筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-input type="text" v-model="menuName" auto-complete="off" placeholder="请输入系统菜单名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
            <el-button type="primary" @click="addAdminSystemMenu">添加</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--数据展示-->
      <el-table
        :data="adminSystemMenuList"
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column
          prop="sm_si_ID"
          align="center"
          label="菜单ID"
        >
        </el-table-column>
        <el-table-column
          prop="sm_si_Name"
          align="center"
          label="菜单名称"
        >
        </el-table-column>
        <el-table-column
          prop="sm_si_GoURL"
          align="center"
          label="跳转路径"
        >
        </el-table-column>
        <el-table-column
          prop="sm_si_ImportNotice"
          align="center"
          label="重要提示"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="updateAdminSystemMenu(scope.row.sm_si_ID)">修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteAdminSystemMenu(scope.row.sm_si_ID)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--添加系统总菜单-->
      <el-dialog title="添加系统总菜单" :visible.sync="addDialog">
        <el-form :model="addOptions">
          <el-form-item label="菜单名称:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.sm_si_Name"></el-input>
          </el-form-item>
          <el-form-item label="跳转路径:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.sm_si_GoURL"></el-input>
          </el-form-item>
          <el-form-item label="重要提示:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.sm_si_ImportNotice"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addAdminSystemMenuSubmit">确 定</el-button>
        </div>
      </el-dialog>

      <!--修改系统总菜单-->
      <el-dialog title="修改系统总菜单" :visible.sync="updateDialog">
        <el-form :model="addOptions">
          <el-form-item label="菜单名称:" :label-width="formLabelWidth">
            <el-input v-model="updateAdminSystemMenuObj.sm_si_Name"></el-input>
          </el-form-item>
          <el-form-item label="跳转路径:" :label-width="formLabelWidth">
            <el-input v-model="updateAdminSystemMenuObj.sm_si_GoURL"></el-input>
          </el-form-item>
          <el-form-item label="重要提示:" :label-width="formLabelWidth">
            <el-input v-model="updateAdminSystemMenuObj.sm_si_ImportNotice"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateDialog = false">取 消</el-button>
          <el-button type="primary" @click="updateAdminSystemMenuSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    name: '',
    data(){
      return {
        menuName:'',
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
            "sm_si_Name": "",
            "sm_si_GoURL": "",
            "sm_si_ImportNotice": ""
          }
        }
      }
    },
    computed: mapGetters([
      'adminSystemMenuList',
      'updateAdminSystemMenuObj'
    ]),
    methods: {
      initData(name){
        if(!name){
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "isDelete": 0
          };
          this.$store.dispatch('initAdminSystemMenu',options)
        }else{
          if(this.adminSystemMenuList.length){
            this.$store.commit('filterAdminSystemMenu',name)
          }
        }
      },
      //查询
      search(){
        this.initData(this.menuName)
      },
      //添加
      addAdminSystemMenu(){
        this.$store.commit('setTranstionFalse');
        this.addDialog = true;
      },
      //添加提交
      addAdminSystemMenuSubmit(){
        this.$store.dispatch('AddAdminSystemMenu',this.addOptions)
        .then((succ)=>{
          this.$notify({
            message: succ,
            type: 'success'
          });
          this.initData();
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          });
        });
        this.addDialog = false
      },
      //修改
      updateAdminSystemMenu(id){
        this.$store.commit('setTranstionFalse');
        this.updateDialog = true;
        this.$store.commit('initUpdateAdminSystemMenuObj',id)
      },
      //修改提交
      updateAdminSystemMenuSubmit(){
        delete this.updateAdminSystemMenuObj.sysChildList
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": this.updateAdminSystemMenuObj
        };

        this.$store.dispatch('UpdateAdminSystemMenu',updateOptions)
          .then((succ)=>{
            this.$notify({
              message: succ,
              type: 'success'
            });
            this.initData();
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
        this.updateDialog = false;
      },
      //删除
      deleteAdminSystemMenu(id){
        let deleteOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "siID": id
        };
        this.$store.dispatch('DeleteAdminSystemMenu',deleteOptions)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData()
          }, err => {
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
