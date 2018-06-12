<template>
  <div>
    <section id="wrap">
      <h1 class="userClass">广告申请管理</h1>

      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <!--<el-form-item>-->
            <!--<span>广告申请名称筛选:</span>-->
          <!--</el-form-item>-->
          <!--<el-form-item>-->
            <!--<el-input type="text" v-model="adApply" auto-complete="off"  placeholder="广告申请" size="small"></el-input>-->
          <!--</el-form-item>-->
          <el-form-item>
            <el-button type="primary" @click="search" size="small">查询</el-button>
            <el-button type="primary" @click="Add" size="small">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--数据展示-->
      <el-table v-loading="isLoading" :data="adApplyList" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="申请广告编码">
                <span>{{ props.row.sm_aa_ID }}</span>
              </el-form-item>
              <el-form-item label="位置信息编码">
                <span>{{ props.row.sm_aa_LocationID }}</span>
              </el-form-item>
              <el-form-item label="广告类型编码 ID">
                <span>{{ props.row.sm_aa_AdviertiseTypeID }}</span>
              </el-form-item>
              <el-form-item label="供应商编码 ID">
                <span>{{ props.row.sm_aa_AgentID }}</span>
              </el-form-item>
              <el-form-item label="广告图片">
                <img :src="item" v-for="item in props.row.sm_aa_Images" width="80" height="50" alt="">
              </el-form-item>
              <el-form-item label="广告描述">
                <span>{{ props.row.sm_aa_Describe }}</span>
              </el-form-item>
              <el-form-item label="产品ID">
                <span>{{ props.row.sm_aa_ProductID }}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.sm_aa_CreateTime | getNewDate}}</span>
              </el-form-item>
              <el-form-item label="审核时间">
                <span>{{ props.row.sm_aa_PassTime | getNewDate}}</span>
              </el-form-item>
              <el-form-item label="审核状态">
                <span>{{ props.row.sm_aa_PassState | getAdApplyPass}}</span>
              </el-form-item>
              <el-form-item label="审核失败原因">
                <span>{{ props.row.sm_aa_FailedReason }}</span>
              </el-form-item>
              <el-form-item label="备注">
                <span>{{ props.row.sm_aa_Remark }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="审核状态"
          prop="sm_aa_PassState">
          <template slot-scope="props">
            <span>{{props.row.sm_aa_PassState | getAdApplyPass}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="广告描述"
          prop="sm_aa_Describe">
        </el-table-column>
        <el-table-column
          label="备注"
          prop="sm_aa_Remark">
        </el-table-column>
        <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="Update(scope.row.sm_aa_ID)">修改
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="Delete(scope.row.sm_aa_ID)">删除
              </el-button>
            </template>
          </el-table-column>
      </el-table>
      <!--添加-->
      <el-dialog title="添加广告申请" :visible.sync="addDialog">
        <el-form :model="addOptions">
          <!--<el-form-item label="申请广告编码:" :label-width="formLabelWidth">-->
            <!--<el-input v-model="addOptions.data.sm_aa_ID" placeholder="请输入申请广告编码" ></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="广告类型:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.sm_aa_AdviertiseTypeID" placeholder="请输入广告类型编码" ></el-input>
          </el-form-item>
          <el-form-item label="位置信息编码:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.sm_aa_LocationID" placeholder="位置信息编码" ></el-input>
          </el-form-item>
          <el-form-item label="供应商编码:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.sm_aa_AgentID" placeholder="供应商编码" ></el-input>
          </el-form-item>
          <el-form-item label="广告图片:" :label-width="formLabelWidth">
            <a href="javascript:;" class="file">推荐类型图片上传
              <input type="file" name="" ref="upload" accept="image/*" multiple>
            </a>
            <img src="" alt="" v-lazy="item"  v-show="ImageURL.length" v-for="item in ImageURL" style="width: 100px;height: 100px">
          </el-form-item>
          <el-form-item label="广告描述:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.sm_aa_Describe" placeholder="广告描述" ></el-input>
          </el-form-item>
          <el-form-item label="产品ID:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.sm_aa_ProductID" placeholder="产品ID" ></el-input>
          </el-form-item>
          <el-form-item label="创建时间:" :label-width="formLabelWidth">
            <el-date-picker
              v-model="addOptions.data.sm_aa_CreateTime"
              type="date"
              placeholder="创建时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="审核状态:" :label-width="formLabelWidth">
            <el-select v-model="addOptions.data.sm_aa_PassState"
              placeholder="审核状态"
              @change="OnChange"
            >
              <el-option
                v-for="item in passOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审核时间:" :label-width="formLabelWidth">
            <el-date-picker
              v-model="addOptions.data.sm_aa_PassTime"
              type="date"
              placeholder="审核时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="审核员编码:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.sm_aa_OperateCode" placeholder="审核员编码" ></el-input>
          </el-form-item>
          <el-form-item label="审核失败原因:" :label-width="formLabelWidth" v-show="isShow">
            <el-input v-model="addOptions.data.sm_aa_FailedReason" placeholder="审核失败原因" ></el-input>
          </el-form-item>
          <el-form-item label="备注:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.sm_aa_Remark" placeholder="请输入备注" type="textarea" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>
      <!--修改-->
      <el-dialog title="修改广告申请" :visible.sync="updateDialog">
        <el-form :model="updateAdApplyObj">
          <el-form-item label="申请广告编码:" :label-width="formLabelWidth">
            <el-input v-model="updateAdApplyObj.sm_aa_ID" :disabled="isOff" placeholder="请输入申请广告编码"  ></el-input>
          </el-form-item>
          <!--<el-form-item label="广告类型编码:" :label-width="formLabelWidth">-->
            <!--<el-input v-model="updateAdApplyObj.sm_aa_AdviertiseTypeID" placeholder="请输入广告类型编码" ></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="位置信息编码:" :label-width="formLabelWidth">-->
            <!--<el-input v-model="updateAdApplyObj.sm_aa_LocationID" placeholder="请输入位置信息编码"  ></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="供应商编码:" :label-width="formLabelWidth">-->
            <!--<el-input v-model="updateAdApplyObj.sm_aa_AgentID" placeholder="供应商编码"  ></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="广告图片:" :label-width="formLabelWidth">
            <a href="javascript:void(0);" class="file">推荐类型图片上传
              <input type="file" name="" ref="upload1" accept="image/*" multiple>
            </a>
            <img src="" alt="" v-lazy="item"  v-show="ImageURL1.length" v-for="item in ImageURL1" style="width: 100px;height: 100px">
          </el-form-item>
          <el-form-item label="广告描述:" :label-width="formLabelWidth">
            <el-input v-model="updateAdApplyObj.sm_aa_Describe" placeholder="请输入广告描述" ></el-input>
          </el-form-item>
          <el-form-item label="产品ID:" :label-width="formLabelWidth">
            <el-input v-model="updateAdApplyObj.sm_aa_ProductID" placeholder="请输入产品ID"  ></el-input>
          </el-form-item>
          <el-form-item label="创建时间:" :label-width="formLabelWidth">
            <el-input v-model="updateAdApplyObj.sm_aa_CreateTime" placeholder="请输入创建时间" ></el-input>
          </el-form-item>
          <el-form-item label="审核状态:" :label-width="formLabelWidth">
            <el-select v-model="updateAdApplyObj.sm_aa_PassState" placeholder="审核状态" @change="OnChangeUpdate">
              <el-option v-for="item in updatePassOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审核时间:" :label-width="formLabelWidth">
            <el-input v-model="updateAdApplyObj.sm_aa_PassTime" placeholder="请输入审核时间"  ></el-input>
          </el-form-item>
          <!--<el-form-item label="审核员编码:" :label-width="formLabelWidth">-->
            <!--<el-input v-model="updateAdApplyObj.sm_aa_OperateCode" placeholder="请输入审核员编码"  ></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="审核失败原因:" :label-width="formLabelWidth" v-show="isShow1">
            <el-input v-model="updateAdApplyObj.sm_aa_FailedReason" placeholder="请输入审核失败原因" ></el-input>
          </el-form-item>
          <el-form-item label="备注:" :label-width="formLabelWidth">
            <el-input v-model="updateAdApplyObj.sm_aa_Remark" placeholder="请输入备注" type="textarea" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateDialog = false">取 消</el-button>
          <el-button type="primary" @click="updateAdApplySubmit">确 定</el-button>
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
        isOff:false,
        value:0,
        isShow:true,
        isShow1:true,
        ImageURL:[],
        ImageURL1:[],
        isLoading:false,
        total:0,
        formLabelWidth:'120px',
        adApply:'',
        addDialog:false,//添加弹窗
        updateDialog:false,//修改弹窗
        addOptions:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "sm_aa_ID": "",//申请广告编码
            "sm_aa_AdviertiseTypeID": "",//广告类型编码
            "sm_aa_LocationID": "",//位置信息编码
            "sm_aa_AgentID": "",//供应商编码
            "sm_aa_Image": "",//广告图片
            "sm_aa_Describe": "",//广告描述
            "sm_aa_ProductID": "",//产品ID
            "sm_aa_CreateTime": "",//创建时间
            "sm_aa_PassState": "",//审核状态
            "sm_aa_PassTime": "",//审核时间
            "sm_aa_OperateCode": "",//审核员编码
            "sm_aa_FailedReason": "",//审核失败原因
            "sm_aa_Remark": "",//备注
          }
        },//添加参数
        passOptions: [{
          value: '3',
          label: '审核中'
        }, {
          value: '1',
          label: '通过'
        }, {
          value: '2',
          label: '不通过'
        }],
        updatePassOptions:[{
        value: '3',
        label: '审核中'
      }, {
        value: '1',
        label: '通过'
      }, {
        value: '2',
        label: '不通过'
      }],
      }
    },
    computed: mapGetters([
      'adApplyList',
      'updateAdApplyObj'
    ]),
    created(){
      this.initData()
      this.initContent().then(()=>{},err=>{
        this.$notify({
          message: err,
          type: 'error'
        });
      })
    },
    methods: {
      async initContent(){
        //查询合作类型
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "sm_aa_ID": "",//申请广告编码
          "sm_aa_AdviertiseTypeID": "",//广告类型编码
          "sm_aa_LocationID": "",//位置信息编码
          "sm_aa_AgentID": "",//供应商编码
          "sm_aa_Image": "",//广告图片
          "sm_aa_Describe": "",//广告描述
          "sm_aa_ProductID": "",//产品ID
          "sm_aa_CreateTime": "",//创建时间
          "sm_aa_PassState": "",//审核状态
          "sm_aa_PassTime": "",//审核时间
          "sm_aa_OperateCode": "",//审核员编码
          "sm_aa_FailedReason": "",//审核失败原因
          "sm_aa_Remark": "",//备注
        };
        await this.$store.dispatch('initPartnershipType',options)
      },
      //初始化
      initData(){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "sm_aa_ID": "",//申请广告编码
          "sm_aa_AdviertiseTypeID": "",//广告类型编码
          "sm_aa_LocationID": "",//位置信息编码
          "sm_aa_AgentID": "",//供应商编码
          "sm_aa_Image": "",//广告图片
          "sm_aa_Describe": "",//广告描述
          "sm_aa_ProductID": "",//产品ID
          "sm_aa_CreateTime": "",//创建时间
          "sm_aa_PassState": "",//审核状态
          "sm_aa_PassTime": "",//审核时间
          "sm_aa_OperateCode": "",//审核员编码
          "sm_aa_FailedReason": "",//审核失败原因
          "sm_aa_Remark": "",//备注
        }
        this.isLoading = true;
        this.$store.dispatch('initAdApply',options)
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
        this.initData()
      },
      //添加
      Add(){
        //清空上一次添加的数据
        let obj = this.addOptions.data;
        for(var i in obj){
          obj[i]=""
        };
        this.addDialog = true;
        this.$store.commit('setTranstionFalse');
        this.uploaNode();
      },
      //添加提交
      addSubmit(){
        //图片提交时赋值
        this.addOptions.data.sm_aa_Image = this.ImageURL.join(',');
        this.$store.dispatch('AddAdApply',this.addOptions)
          .then((suc)=>{
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
        this.addDialog = false;
      },
      //申请状态
      OnChange(){
        if(this.addOptions.data.sm_aa_PassState==0|this.addOptions.data.sm_aa_PassState==1){
          this.isShow=false;
        }
        else this.isShow=true;
      },
      OnChangeUpdate(){
        if(this.updateAdApplyObj.sm_aa_PassState==0|this.updateAdApplyObj.sm_aa_PassState==1){
          this.isShow1=false;
        }
        else this.isShow1=true;
      },
      //图片转二进制
      uploadImg(file) {
        return new Promise((relove, reject) =>{
          lrz(file)
            .then(data => {
              relove(data.base64.split(',')[1])
            })
        })
      },
      uploadToOSS(file) {
        return new Promise((relove,reject)=>{
          var fd = new FormData();
          fd.append("fileToUpload", file);
          var xhr = new XMLHttpRequest();
          xhr.open("POST", "http://webservice.1000da.com.cn/OSSFile/PostToOSS");
          xhr.send(fd);
          xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
              if (xhr.responseText) {
                var data = xhr.responseText
                relove(JSON.parse(data))
              }
            }else{
              console.log(xhr.responseText)
//               if (xhr.responseText) {
//                 var data = xhr.responseText;
//                 reject(JSON.parse(data).resultcontent)
//               }
            }
          }
        })
      },
      uploaNode() {
        this.ImageURL = [];
        this.ImageURL1 = [];
        setTimeout(() => {
          if (this.$refs.upload) {
            this.$refs.upload.addEventListener('change', data => {
              for (var i = 0; i < this.$refs.upload.files.length; i++) {
                // this.uploadImg(this.$refs.upload.files[i]).then(data => {
                //   this.$store.dispatch('adApplyUploadAdminImgs', {
                //     imageData: data
                //   })
                this.uploadToOSS(this.$refs.upload.files[i])
                    .then(data => {
                      if (data) {
                        this.ImageURL.push(data.data);
                      } else {
                        this.$notify({
                          message: '图片地址不存在!',
                          type: 'error'
                        });
                      }
                    })
                // })
              }
            })
          }
          if (this.$refs.upload1) {
            this.$refs.upload1.addEventListener('change', data => {
              for (var i = 0; i < this.$refs.upload1.files.length; i++) {
                // this.uploadImg(this.$refs.upload1.files[i]).then(data => {
                //   this.$store.dispatch('adApplyUploadAdminImgs', {
                //     imageData: data
                //   })
                this.uploadToOSS(this.$refs.upload1.files[i])
                    .then(data => {
                      if (data) {
                        this.ImageURL1.push(data.data);
                      } else {
                        this.$notify({
                          message: '图片地址不存在!',
                          type: 'error'
                        });
                      }
                    })
                // })
              }
            })
          }
        }, 30)
      },
      // uploaNode() {
      //   this.ImageURL = [];
      //   this.ImageURL1 = [];
      //   setTimeout(() => {if (this.$refs.upload) {this.$refs.upload.addEventListener('change', data => {for (var i = 0; i < this.$refs.upload.files.length; i++) {
      //             this.uploadImg(this.$refs.upload.files[i]).then(
      //               data => {
      //                 console.log("data:"+data)
      //                 this.$store.dispatch('adApplyUploadAdminImgs', {imageData: data})
      //                 .then(data => {if (data) {
      //                     this.ImageURL = [];
      //                     this.ImageURL1 = [];
      //                     this.ImageURL.push(data.data);
      //                   this.ImageURL1.push(data.data);
      //                 } else {this.$notify({message: '图片地址不存在!', type: 'error'});
      //                   }
      //                 })
      //             })
      //           }
      //         })}}, 1000)
      // },
      //修改
      Update(id){
        this.updateDialog = true;
        this.$store.commit('setTranstionFalse');
        this.$store.commit('initUpdateAdApply',id);
        this.updateAdApplyObj.sm_aa_PassState="";
        this.uploaNode();
      },
      //修改提交
      updateAdApplySubmit(){
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": this.updateAdApplyObj
        };
        updateOptions.data.sm_aa_Image = this.ImageURL1.join(',');
        this.$store.dispatch('UpdateAdApplyObj',updateOptions)
          .then((suc)=>{
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.adApply)
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
            "sm_aa_ID": id,//申请广告编码
          }
        };
        this.$store.dispatch('DeleteAdApply',deleteOptions)
          .then((suc)=>{
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.adApply)
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
