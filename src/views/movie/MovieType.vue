<template>
  <div>
    <section id="wrap">
      <h1 class="userClass">微电影类型管理</h1>
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>微电影类型名称筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-input type="text" v-model="movieTypeName" auto-complete="off" placeholder="微电影类型名称" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search" size="small">查询</el-button>
            <el-button type="primary" @click="add" size="small">增加</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--数据展示-->
      <el-table
        :data="movieTypeList"
        highlight-current-row
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column
          align="center"
          sortable
          label="电影类型编号"
          prop="vf_te_ID">
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          label="电影类型名称"
          prop="vf_te_Name">
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          label="分类编号父编号"
          prop="vf_te_ParentID">
        </el-table-column>


        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="Update(scope.row.vf_te_ID)">修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="Delete(scope.row.vf_te_ID)">删除
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

      <!--添加-->

      <el-dialog title="添加微电影类型" :visible.sync="addDialog">
        <el-form :model="addOptions">

          <el-form-item label="微电影父编码号" :label-width="formLabelWidth">
            <el-select v-model="addOptions.data.vf_te_ParentID" placeholder="请选择微电影">
              <el-option
                v-for="item in movieTypeList"
                :key="item.vf_te_ID"
                :label="item.vf_te_ParentID"
                :value="item.vf_te_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="微电影名称:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.vf_te_Name" placeholder="微电影名称" ></el-input>
          </el-form-item>
          <!--<el-form-item label="创建时间:" :label-width="formLabelWidth">-->
            <!--<el-date-picker-->
              <!--v-model="addOptions.data.sm_at_CreateTime"-->
              <!--type="date"-->
              <!--placeholder="选择日期">-->
            <!--</el-date-picker>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="收费金额:" :label-width="formLabelWidth">-->
            <!--<el-input v-model="addOptions.data.sm_at_Cost" placeholder="请输入收费金额" ></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="备注:" :label-width="formLabelWidth">-->
            <!--<el-input v-model="addOptions.data.sm_at_Remark" placeholder="请输入备注" type="textarea" :rows="4"></el-input>-->
          <!--</el-form-item>-->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>
      <!--修改-->
      <el-dialog title="修改微电影类型" :visible.sync="updateDialog">

        <el-form :model="updateMovieTypeObj">

          <el-form-item label="微电影父编码号" :label-width="formLabelWidth">
            <el-select v-model="updateMovieTypeObj.vf_te_ParentID" placeholder="请选择微电影">
              <el-option
                v-for="item in movieTypeList"
                :key="item.vf_te_ID"
                :label="item.vf_te_ParentID"
                :value="item.vf_te_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="微电影类型名称:" :label-width="formLabelWidth">
          <el-input v-model="updateMovieTypeObj.vf_te_Name" placeholder="微电影类型名称" ></el-input>
          </el-form-item>
          <!--<el-form-item label="微电影名称:" :label-width="formLabelWidth">-->
            <!--<el-input v-model="addOptions.data.vf_te_Name" placeholder="微电影名称" ></el-input>-->
          <!--</el-form-item>-->
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
        addDialog:false,
        movieTypeName:'',
        movieDialog:false,
        updateDialog:false,
        total:0,
        addOptions:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "vf_te_Name": "",
            "vf_te_ParentID": "",

          }
        }
      }
    },
    computed: mapGetters([
      'movieTypeList',
      'updateMovieTypeObj'
    ]),
    created(){
      this.initData(this.movieTypeName)
    },
    methods: {
      //分页
      handleCurrentChange(num){
        this.initData(this.movieTypeName,num)
      },

      //查询
      search(){
        this.initData(this.movieTypeName)
      },
      initData(name,page){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",//操作员编码
          "operateUserName": "",//操作员名称
          "pcName": "",
          "vf_te_ID": "",//分类编号
          "vf_te_Name": name?name:"",//分类名称
          "vf_te_ParentID": "",//分类编号父编号
          "page":  page?page:1,//页码
          "rows": 5//条数

        };
        this.isLoading = true;
        this.$store.dispatch('initMovieTypeList',options)
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
      add(){
        this.addDialog=true;
        this.$store.commit('setTranstionFalse')
      },
      //添加提交
      addSubmit(){
        this.$store.dispatch('AddMovieType',this.addOptions)
          .then(
            (suc)=>{
              this.$notify(
                {
                  message: suc,
                  type:"success"
                }
              );
              this.initData(this. movieTypeName)
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
        this.$store.commit('initUpdateMovieTypeObj',id)
      },
      //修改提交
      updateSubmit(){
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",//操作员编码
          "operateUserName": "",//操作员名称
          "pcName": "",
          "data": this.updateMovieTypeObj
        };
        this.$store.dispatch('UpdateMovieType',updateOptions)
          .then((suc)=>{
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.movieTypeName)
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
        console.log(id)
        let deleteOptions = {
          "loginUserID": "huileyou",  //惠乐游用户ID
          "loginUserPass": "123",  //惠乐游用户密码
          "operateUserID": "",//操作员编码
          "operateUserName": "",//操作员名称
          "pcName": "",  //机器码
          "data": {
            "vf_te_ID":id,//分类编号

          }

        };
        this.$store.dispatch('DeleteMovieType',deleteOptions)
          .then((suc)=>{
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.recommendName,1)
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
