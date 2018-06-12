<template>
  <div>
    <section id="wrap">
      <h1 class="userClass">广告类型管理</h1>
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>广告类型名称筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-input type="text" v-model="adTypeName" auto-complete="off" placeholder="广告类型名称" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search" size="small">查询</el-button>
            <el-button type="primary" @click="add" size="small">增加</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--数据展示-->
      <el-table
        :data="adTypeList"
        highlight-current-row
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column
          align="center"
          sortable
          label="广告类型编号"
          prop="sm_at_ID">
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          label="广告类型名称"
          prop="sm_at_Name">
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          label="收费机金额"
          prop="sm_at_Cost">
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          label="创建时间"
          prop="sm_at_CreateTime">
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          label="备注"
          prop="sm_at_Remark">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="Update(scope.row.sm_at_ID)">修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="Delete(scope.row.sm_at_ID)">删除
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
      <!--添加-->
      <el-dialog title="添加广告类型" :visible.sync="addDialog">
        <el-form :model="addOptions">
          <el-form-item label="广告类型编号:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.sm_at_ID" placeholder="广告类型编号" :disabled="isOff"></el-input>
          </el-form-item>
          <el-form-item label="广告类型名称" :label-width="formLabelWidth">
            <el-select v-model="addOptions.data.sm_at_Name" placeholder="请选择广告类型名称">
              <el-option label="微电影" value="微电影"></el-option>
              <el-option label="游戏广告" value="游戏广告"></el-option>
              <el-option label="栏目广告" value="栏目广告"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间:" :label-width="formLabelWidth">
            <el-date-picker
              v-model="addOptions.data.sm_at_CreateTime"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="收费金额:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.sm_at_Cost" placeholder="请输入收费金额" ></el-input>
          </el-form-item>
          <el-form-item label="备注:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.sm_at_Remark" placeholder="请输入备注" type="textarea" :rows="4"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>
      <!--修改-->
      <el-dialog title="修改广告类型" :visible.sync="updateDialog">
        <el-form :model="updateAdTypeObj">
          <el-form-item label="广告类型编码:" :label-width="formLabelWidth">
            <el-input v-model="updateAdTypeObj.sm_at_ID" placeholder="请输入广告类型编码"  :disabled="isOff"></el-input>
          </el-form-item>
          <el-form-item label="广告类型名称" :label-width="formLabelWidth">
            <el-select v-model="updateAdTypeObj.sm_at_Name" placeholder="请选择广告类型名称">
              <el-option label="微电影" value="微电影"></el-option>
              <el-option label="游戏广告" value="游戏广告"></el-option>
              <el-option label="栏目广告" value="栏目广告"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间:" :label-width="formLabelWidth">
            <el-date-picker
              v-model="updateAdTypeObj.sm_at_CreateTime"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="收费金额:" :label-width="formLabelWidth">
            <el-input v-model="updateAdTypeObj.sm_at_Cost" placeholder="请输入收费金额" ></el-input>
          </el-form-item>
          <el-form-item label="备注:" :label-width="formLabelWidth">
            <el-input v-model="updateAdTypeObj.sm_at_Remark" placeholder="请输入备注" type="textarea" :rows="4"></el-input>
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
        formLabelWidth:'120px',
        isLoading:false,
        adTypeName:'',
        addDialog:false,
        updateDialog:false,
        total:0,
        addOptions:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "sm_at_ID": "1",//广告类型编号
            "sm_at_Name": "",//广告类型名称
            "sm_at_CreateTime": "",//创建时间
            "sm_at_Cost": "",//收费金额
            "sm_at_Remark": "",//备注
          }
        }
      }
    },
    computed: mapGetters([
      'adTypeList',
      'updateAdTypeObj',
      'adTypeNameList'
    ]),
    created(){
      this.initData(this.adTypeName)
    },
    methods: {
      //分页
      handleCurrentChange(num){
        this.initData(this.adTypeName,num)
      },
      //查询
      search(){
        this.initData(this.adTypeName)
      },
      initData(name,page){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "sm_at_ID": "",//广告类型编号
          "sm_at_Name": name?name:"",//广告类型名称
          "sm_at_CreateTime": "",//创建时间
          "sm_at_Cost": "",//收费金额
          "sm_at_Remark": "",//备注
          "page": page?page:1,
          "rows": 10
        };
        this.isLoading = true;
        this.$store.dispatch('initAdTypeList',options)
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
      add(){
        this.addDialog=true;
        this.$store.commit('setTranstionFalse')
      },
      addSubmit(){
        this.$store.dispatch('AddAdType',this.addOptions)
          .then(
            (suc)=>{
              this.$notify(
                {
                  message: suc,
                  type:"success"
                }
              );
              this.initData(this.adTypeName)
            },
            (err)=>{
              this.$notify(
                {
                  message:err,
                  type:'error'
                }
              );
            }
            )
        this.addDialog=false;
      },
      //修改
      Update(id){
        this.updateDialog = true;
        this.$store.commit('setTranstionFalse');
        this.$store.commit('initUpdateAdTypeObj',id)
      },
      //修改提交
      updateSubmit(){
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": this.updateAdTypeObj
        };
        this.$store.dispatch('UpdateAdType',updateOptions)
          .then((suc)=>{
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.adTypeName)
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
        let deleteOptions= {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data":{
            "sm_at_ID": id,//广告类型编号
          }
        }
        this.$store.dispatch('deleteAdType',deleteOptions)
          .then(
            (suc)=>{
              this.$notify(
                {
                  message: suc,
                  type: "success"
                }
              );
              this.initData(this.adTypeName)
            },
            (err)=>{
              this.$notify(
                {
                  message:err,
                  type:"error"
                }
              )
            }
          )
      },
    },
  }
</script>
<style scoped>

</style>
