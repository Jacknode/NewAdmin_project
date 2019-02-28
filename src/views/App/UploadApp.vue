<template>
  <section id="wrap">
    <h1 class="userClass" style="font-size: 20px;font-weight: bold;">上传App</h1>
    <el-col :span="24" class="formSearch">
      <el-form :inline="true">
        <el-form-item>
          <!--<span>图片类型名称筛选:</span>-->
        </el-form-item>
        <el-form-item>
          <!--<el-input type="text" v-model="imageName" auto-complete="off" placeholder="图片类型名称" size="small"></el-input>-->
        </el-form-item>
        <el-form-item  style="float: right;">
          <!--<el-button type="primary" @click="search" size="small">查询</el-button>-->
          <el-button type="primary" @click="uploadApp" size="small">上传</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--数据展示-->
    <el-table
      :data="uploadAppList"
      highlight-current-row
      v-loading="isLoading"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="发布管理员ID:">
              <span>{{ props.row.sm_as_ManagerID}}</span>
            </el-form-item>
            <el-form-item label="名称:">
              <span>{{ props.row.sm_as_Name}}</span>
            </el-form-item>
            <el-form-item label="AppID:">
              <span>{{ props.row.sm_as_AppID}}</span>
            </el-form-item>
            <el-form-item label="应用程序图标:">
              <span>{{ props.row.sm_as_Image}}</span>
            </el-form-item>
            <el-form-item label="大小:">
              <span>{{ props.row.sm_as_Size}}</span>
            </el-form-item>
            <el-form-item label="下载地址:">
              <a :href="props.row.sm_as_DownLoadUrl" style="cursor: pointer;color: #f60">点击下载</a>
            </el-form-item>
            <el-form-item label="app类型:">
              <span>{{ props.row.sm_as_Type | getAppType}}</span>
            </el-form-item>
            <el-form-item label="审核状态:">
              <span>{{ props.row.sm_as_Statue | getStatue }}</span>
            </el-form-item>
            <el-form-item label="版本号:">
              <span>{{ props.row.sm_as_VersionNo }}</span>
            </el-form-item>
            <el-form-item label="文字描述:">
              <span>{{ props.row.sm_as_Describe }}</span>
            </el-form-item>
            <el-form-item label="审核员编码:">
              <span>{{ props.row.sm_as_ValidateUserID }}</span>
            </el-form-item>
            <el-form-item label="审核日期:">
              <span>{{ props.row.sm_as_ValidateDate }}</span>
            </el-form-item>
            <el-form-item label="审核未通过原因:">
              <span>{{ props.row.sm_as_FailedReason }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="App编号"
        prop="sm_as_ID">
      </el-table-column>
      <el-table-column
        align="center"
        label="版本号"
        prop="sm_as_VersionNo">
      </el-table-column>
      <el-table-column
        align="center"
        label="发布日期"
      >
        <template slot-scope="scope">
          <span>{{scope.row.sm_as_OutDate | getUseTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="Delete(scope.row.sm_as_ID)">删除
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

    <!--上传-->
    <el-dialog title="上传App" :visible.sync="addDialog">
      <el-form :model="options">
        <el-form-item label="名称:" :label-width="formLabelWidth">
          <el-input v-model="options.data.sm_as_Name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="AppID:" :label-width="formLabelWidth">
          <el-input v-model="options.data.sm_as_AppID" placeholder="请输入AppID"></el-input>
        </el-form-item>
        <el-form-item label="App类型:" :label-width="formLabelWidth">
          <el-select v-model="options.data.sm_as_Type" placeholder="请选择">
            <el-option
              v-for="item in appOptions"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="版本号:" :label-width="formLabelWidth">
          <el-input v-model="options.data.sm_as_VersionNo" placeholder="请输入版本号"></el-input>
        </el-form-item>
        <el-form-item label="文字描述:" :label-width="formLabelWidth">
          <el-input v-model="options.data.sm_as_Describe" placeholder="请输入文字描述"></el-input>
        </el-form-item>
        <el-form-item label="上传App:" :label-width="formLabelWidth">
          <a href="javascript:;" class="file">上传App
            <input type="file" name="" ref="upload"  multiple>
          </a>
          <p style="overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;text-align: center" v-loading="isLoading">{{options.data.sm_as_DownLoadUrl}}</p>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {getNewStr} from '@/assets/js/public'
  export default{
    name: '',
    data(){
      return {
        addDialog:false,
        isLoading:false,
        total:0,
        formLabelWidth:'120px',
        appOptions:[
          {
            name:'android',
            value:'0'
          },
          {
            name:'ios',
            value:'1'
          },
          {
            name:'电脑',
            value:'2'
          }
        ],
        options:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "lianglile",
          "operateUserName": "",
          "pcName": "",
          "data": {
            sm_as_AppID:'',
            "sm_as_Name": "",//名称
            "sm_as_Image": "",//应用程序图标
            "sm_as_Type": "",//app类型  0 android 1苹果 2 电脑
            "sm_as_DownLoadUrl":"",//下载地址
            "sm_as_Size":"",//应用程序大小
            "sm_as_VersionNo": "",//版本号
            "sm_as_Describe": "",//文字描述
          }
        }
      }
    },
    computed: mapGetters([
      'uploadAppList'
    ]),
    created(){
      this.initData(1)
    },
    methods: {
      //删除
      Delete(id){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "huileyou",
          "operateUserName": "",
          "pcName": "",
          "token": "",
          "data": {
            "sm_as_ID":id,//系统信息编码
          }
        }
        this.$store.dispatch('DeleteApp',options)
        .then(()=>{
          this.initData(1)
        },err=>{
          console.log(err)
        })
      },
      handleCurrentChange(num){
        this.initData(num)
      },
      initData(page){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "page":page?page:1,
          "rows":"5",
          //"sm_as_ID": "1",//系统信息编码
          "sm_as_ManagerID": "lianglile",//发布管理员ID
          //"sm_as_Name": "1",//名称
          //"outDateFrom": "1",//发布日期
          //"outDateTo": "1",//发布日期
          //"sm_as_Type": "1",//app类型
          //"sm_as_VersionNo": "1",//版本号
          //"sm_as_Statue": "1",//审核状态
          //"sm_as_ValidateUserID":"2",//审核员编码
        };
        this.isLoading = true;
        this.$store.dispatch('initUploadApp',options)
          .then((total)=>{
            this.total = total;
            this.isLoading = false;
          },err=>{
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },
      uploaNode() {
       setTimeout(()=>{
         if(this.$refs.upload){
           this.$refs.upload.addEventListener('change', () => {
             let file = this.$refs.upload.files[0];
             if(file){
               if (file.size > 1024 * 1024)
                 this.options.data.sm_as_Size = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
               else
                 this.options.data.sm_as_Size = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
             }
             this.isLoading = true;
             this.options.data.sm_as_DownLoadUrl = '加载中...'
             var fd = new FormData();
             fd.append("file", file);
             var xhr = new XMLHttpRequest();
             xhr.open("POST", getNewStr+"/OSSFile/PostToService");
             xhr.send(fd);
             xhr.onreadystatechange = ()=>{
               if (xhr.readyState == 4 && xhr.status == 200) {
                 this.isLoading = false;
                 let obj = JSON.parse(xhr.responseText);
                 this.options.data.sm_as_DownLoadUrl = obj.data;
               }
             }
           })
         }
       },30)

      },
      //上传
      uploadApp(){
        for(let attr in this.options.data){
          this.options.data[attr] = ''
        }
        this.addDialog = true;
        this.$store.commit('setTranstionFalse');
        this.uploaNode()
      },
      //提交
      addSubmit(){
        this.$store.dispatch('AddUploadApp',this.options)
          .then((suc)=>{
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(1)
          },err=>{
            this.$notify({
              message: err,
              type: 'error'
            });
          });
        this.addDialog = false;
      }
    },
  }
</script>
<style scoped>

</style>
