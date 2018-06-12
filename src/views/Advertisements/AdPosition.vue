<template>
  <div>
    <section id="wrap">
      <h1 class="userClass">广告位置管理</h1>

      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>广告位置名称筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-input type="text" v-model="adPosition" auto-complete="off"  placeholder="广告位置名称" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search" size="small">查询</el-button>
            <el-button type="primary" @click="Add" size="small">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--数据展示-->
      <el-table
        :data="adPositionList"
        highlight-current-row
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column
          align="center"
          label="位置信息编码"
          prop="sm_pi_ID">
        </el-table-column>
        <el-table-column
          align="center"
          label="位置编码"
          prop="sm_pi_LocationNo">
        </el-table-column>
        <el-table-column
          align="center"
          label="最大广告数"
          prop="sm_pi_MaxNo">
        </el-table-column>
        <el-table-column
          align="center"
          label="位置名称"
          prop="sm_pi_Name">
        </el-table-column>
        <el-table-column
          align="center"
          label="备注"
          prop="sm_pi_Remark">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="Update(scope.row.sm_pi_ID)">修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="Delete(scope.row.sm_pi_ID)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--添加-->
      <el-dialog title="添加广告位置" :visible.sync="addDialog">
        <el-form :model="addOptions">
          <el-form-item label="位置信息编码:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.sm_pi_ID" placeholder="请输入位置信息编码" ></el-input>
          </el-form-item>
          <el-form-item label="位置编码:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.sm_pi_LocationNo" placeholder="请输入位置编码" ></el-input>
          </el-form-item>
          <el-form-item label="最大广告数:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.sm_pi_MaxNo" placeholder="最大广告数" ></el-input>
          </el-form-item>
          <el-form-item label="位置名称:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.sm_pi_Name" placeholder="位置名称" ></el-input>
          </el-form-item>
          <el-form-item label="备注:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.sm_pi_Remark" placeholder="请输入备注" type="textarea" :rows="4"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addAdPositionSubmit">确 定</el-button>
        </div>
      </el-dialog>

      <!--修改-->
      <el-dialog title="修改广告位置" :visible.sync="updateDialog">
        <el-form :model="updateAdPositionObj">
          <el-form-item label="位置信息编码:" :label-width="formLabelWidth">
            <el-input v-model="updateAdPositionObj.sm_pi_ID" placeholder="请输入广告位置信息编码"  :disabled="isOff"></el-input>
          </el-form-item>
          <el-form-item label="位置编码:" :label-width="formLabelWidth">
            <el-input v-model="updateAdPositionObj.sm_pi_LocationNo" placeholder="位置编码" ></el-input>
          </el-form-item>
          <el-form-item label="最大广告数:" :label-width="formLabelWidth">
            <el-input v-model="updateAdPositionObj.sm_pi_MaxNo" placeholder="最大广告数" ></el-input>
          </el-form-item>
          <el-form-item label="位置名称:" :label-width="formLabelWidth">
            <el-input v-model="updateAdPositionObj.sm_pi_Name" placeholder="最大广告数" ></el-input>
          </el-form-item>
          <el-form-item label="备注:" :label-width="formLabelWidth">
            <el-input v-model="updateAdPositionObj.sm_pi_Remark" placeholder="备注" type="textarea" :rows="4"></el-input>
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
        isLoading:false,
        total:0,
        formLabelWidth:'120px',
        adPosition:'',
        addDialog:false,//添加弹窗
        updateDialog:false,//修改弹窗
        addOptions:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "sm_pi_ID": "1",//位置信息编码
            "sm_pi_LocationNo": "1",//位置编码
            "sm_pi_MaxNo": "",//最大广告数
            "sm_pi_Name": "",//位置名称
            "sm_pi_Remark": "",//备注
          }
        },//添加参数
      }
    },
    computed: mapGetters([
      'updateAdPositionObj',
      'adPositionList',
    ]),
    created(){
      this.initData(this.adPosition)
    },
    methods: {
      //初始化
      initData(name){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "sm_pi_ID": "",//位置信息编码
          "sm_pi_LocationNo": "",//位置编码
          "sm_pi_MaxNo": "",//最大广告数
          "sm_pi_Name": name?name:'',//位置名称
          "sm_pi_Remark": "",//备注
        }
        this.isLoading = true;
        this.$store.dispatch('initAdPosition',options)
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
        this.initData(this.adPosition)
      },
      //添加
      Add(){
        this.addDialog = true;
        this.$store.commit('setTranstionFalse');
      },
      //添加提交
      addAdPositionSubmit(){
        this.$store.dispatch('AddAdPosition',this.addOptions)
          .then((suc)=>{this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.adPosition)
          },err=>{
            this.$notify({
              message: err,
              type: 'error'
            });
          })
        this.addDialog = false;
      },
      //修改
      Update(id){
        this.updateDialog = true;
        this.$store.commit('setTranstionFalse');
        this.$store.commit('initUpdateAdPositionObj',id)
      },
      //修改提交
      updateSubmit(){
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": this.updateAdPositionObj
        };
        this.$store.dispatch('UpdateAdPosition',updateOptions)
          .then((suc)=>{
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.adPosition)
          },err=>{
            this.$notify({
              message: err,
              type: 'error'
            });
          });
        this.updateDialog = false
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
            "sm_pi_ID": id,//位置信息编码
          }
        };
        this.$store.dispatch('DeleteAdPosition',deleteOptions)
          .then((suc)=>{
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.adPosition)
          },err=>{
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
