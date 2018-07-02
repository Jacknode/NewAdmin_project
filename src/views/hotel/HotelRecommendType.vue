<template>
  <div>
    <section id="wrap">
      <h1 class="userClass">酒店推荐类型</h1>
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>推荐类型名称筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-input type="text" v-model="recommendName" auto-complete="off" placeholder="推荐类型名称" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search" size="small">查询</el-button>
            <el-button type="primary" @click="Add" size="small">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>

        <!--数据展示-->
        <el-table
          :data="hotelRecommendTypeList"
          highlight-current-row
          v-loading="isLoading"
          style="width: 100%">
          <el-table-column
            align="center"
            label="推荐类型编码"
            prop="ht_it_ID">
          </el-table-column>
          <el-table-column
            align="center"
            label="推荐类型名称"
            prop="ht_it_Name">
          </el-table-column>
          <el-table-column
            align="center"
            label="类型父级名称"
            prop="ht_it_ParentName">
          </el-table-column>
          <el-table-column
            align="center"
            label="推荐描述"
            prop="ht_it_Describe">
          </el-table-column>
          <el-table-column
            align="center"
            label="图片路径"
            prop="ht_it_ImagePath">
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

      <!--添加推荐类型-->
      <el-dialog title="添加推荐类型" :visible.sync="addDialog">
        <el-form :model="addOptions">
          <el-form-item label="推荐父类型选择:" :label-width="formLabelWidth">


                <el-cascader
                  :options="hotelIntroduceTypeList"
                  :props="props"
                  v-model="introduceTypeList"
                  :show-all-levels="false"

                ></el-cascader>

              <!--<el-option-->
                <!--v-for="item in hotelRecommendTypeAllList"-->
                <!--:key="item.ht_it_ID"-->
                <!--:label="item.ht_it_Name"-->
                <!--:value="item.ht_it_ID">-->
              <!--</el-option>-->

          </el-form-item>
          <el-form-item label="推荐类型名称:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.ht_it_Name" placeholder="请输入图片类型名称"></el-input>
          </el-form-item>
          <el-form-item label="推荐类型描述:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.ht_it_Describe" placeholder="请输入类型描述"></el-input>
          </el-form-item>
          <el-form-item label="推荐类型图片:" :label-width="formLabelWidth">
            <a href="javascript:;" class="file">推荐类型图片上传
              <input type="file" name="" ref="upload" accept="image/*" multiple>
            </a>
            <img src="" alt="" v-lazy="item"  v-show="ImageURL.length" v-for="item in ImageURL" style="width: 100px;height: 100px">
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>

      <!--修改推荐类型-->
      <el-dialog title="修改推荐类型" :visible.sync="updateDialog">
        <el-form :model="updateHotelRecommendTypeObj">
          <el-form-item label="推荐父类型选择:" :label-width="formLabelWidth">
            <el-select v-model="updateHotelRecommendTypeObj.ht_it_ParentID" placeholder="请选择">
              <el-option
                v-for="item in hotelRecommendTypeAllList"
                :key="item.ht_it_ID"
                :label="item.ht_it_Name"
                :value="item.ht_it_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="推荐类型名称:" :label-width="formLabelWidth">
            <el-input v-model="updateHotelRecommendTypeObj.ht_it_Name" placeholder="请输入图片类型名称"></el-input>
          </el-form-item>
          <el-form-item label="推荐类型描述:" :label-width="formLabelWidth">
            <el-input v-model="updateHotelRecommendTypeObj.ht_it_Describe" placeholder="请输入类型描述"></el-input>
          </el-form-item>
          <el-form-item label="推荐类型图片:" :label-width="formLabelWidth">
            <a href="javascript:;" class="file">推荐类型图片上传
              <input type="file" name="" ref="upload1" accept="image/*" multiple>
            </a>
            <img src="" alt="" v-lazy="item"  v-show="ImageURL1.length" v-for="item in ImageURL1" style="width: 100px;height: 100px">
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
  import {getNewStr} from '@/assets/js/public'
  export default{
    name: '',
    data(){
      return {
        fTypeID:'',
        introduceTypeList:[],
        props:{
          label:'ht_it_Name',
          value: 'ht_it_ID',
          children: 'SubList'
        },
        addOptions:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "data": {
            "ht_it_Name": "",//推荐类型名称
            "ht_it_ParentID": "",//推荐类型父ID
            "ht_it_Describe": "",//描述
            "ht_it_ImagePath": "",//
          }
        },
        ImageURL:[],
        ImageURL1:[],
        recommendName:'',
        total:0,
        isLoading:false,
        addDialog:false,
        updateDialog:false,
        formLabelWidth:'120px'
      }
    },
    computed: mapGetters([
      'hotelIntroduceTypeList',
      'hotelRecommendTypeAllList',
      'hotelRecommendTypeList',
      'updateHotelRecommendTypeObj'
    ]),
    created(){
      this.initHotelIntroduceType()
      this.initData(this.recommendName,1)
    },
    methods: {
      initHotelIntroduceType(){
        let options1 = {
          "loginUserID": "huileyou",  //惠乐游用户ID
          "loginUserPass": "123",  //惠乐游用户密码
          "operateUserID": "",//操作员编码
          "operateUserName": "",//操作员名称
          "pcName": "",        //机器码
          "ht_it_ID": ''
        };
        return this.$store.dispatch('initHotelIntroduceType', options1)
      },

      //分页
      handleCurrentChange(num){
        this.initData(this.recommendName,num);
      },
      //查询
      search(){
        this.initData(this.recommendName,1);
        this.initData(this.recommendName)
      },
      //图片转二进制
      uploadImg(file) {
        return new Promise(function (relove, reject) {
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
          xhr.open("POST", getNewStr+"/OSSFile/PostToOSS");
          xhr.send(fd);
          xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
              if (xhr.responseText) {
                var data = xhr.responseText
                relove(JSON.parse(data))
              }
            }else{
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
                //   this.$store.dispatch('hotelUploadAdminImgs', {
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
                //   this.$store.dispatch('hotelUploadAdminImgs', {
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
      //初始化
      initData(name,page){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "ht_it_ID": "",//推荐类型ID
          "ht_it_Name": name?name:"",//推荐类型名称
          "ht_it_ParentID": "",//推荐类型父ID
        };
        this.isLoading = true;
        if(page){
          options.page = page?page:1;
          options.rows =  5;
          this.$store.dispatch('initHotelRecommendType',options)
            .then(total=>{
              this.total = total;
              this.isLoading = false;
            },err=>{
              this.$notify({
                message: err,
                type: 'error'
              });
            })
        }else{
          this.$store.dispatch('initHotelRecommendTypeAll',options)
            .then(()=>{
              this.isLoading = false;
            },err=>{
              this.$notify({
                message: err,
                type: 'error'
              });
            })
        }
      },
      //添加
      Add(){
        this.addDialog = true;
        this.$store.commit('setTranstionFalse');
        this.uploaNode()
      },
      //添加提交
      addSubmit(){
        this.addOptions.data.ht_it_ImagePath = this.ImageURL.join(',')
        this.$store.dispatch('AddHotelRecommendType',this.addOptions)
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
        this.addDialog = false;
      },
      //修改
      Update(id){
        this.updateDialog = true;
        this.$store.commit('setTranstionFalse');
        this.$store.commit('initUpdateHotelRecommendType',id);
        this.uploaNode()
      },
      //修改提交
      updateSubmit(){
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "data": this.updateHotelRecommendTypeObj
        }
        updateOptions.data.sm_aa_Image = this.ImageURL1.join(',')
        this.$store.dispatch('UpdateHotelRecommendType',updateOptions)
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
            "ht_it_ID": id//图片类型编码
          }
        };
        this.$store.dispatch('DeleteHotelRecommendType',deleteOptions)
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
