<template>
  <div>
    <section id="wrap">
      <h1 class="userClass">首页展示图片</h1>

      <!--添加-->

      <div style="text-align: right; padding-right: 50px;">
        <el-button type="primary" @click="add">添加</el-button>
      </div>

      <!--数据展示-->

      <el-table
        :data="foodHomePagePictureList"
        highlight-current-row
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column
          align="center"
          label="图片编号"
          prop="fd_st_ID">
        </el-table-column>

        <el-table-column
          align="center"
          label="店面编号"
          prop="fd_st_ProductID">
        </el-table-column>
        <el-table-column
          align="center"
          label="图片">
          <template slot-scope="scope">
            <img v-lazy="scope.row.fd_st_ImageURL" width="120" height="80" @click="bigImage(scope.row.fd_st_ImageURL)">
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="update(scope.row)">修改
            </el-button>
            <el-button
              v-show="true"
              size="mini"
              type="danger"
              @click="Delete(scope.row.fd_st_ID)">删除
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

      <!--展示大图-->

      <el-dialog
        title="大图"
        :visible.sync="bigImgDialog"
        width="50%">
        <img v-lazy="imgUrl" width="100%">
        <span slot="footer" class="dialog-footer">
         <el-button @click="bigImgDialog = false">取 消</el-button>
        </span>
      </el-dialog>

      <!--添加-->

      <el-dialog title="添加首页展示图片" :visible.sync="addDialog">
        <el-form :model="addOptions">
          <el-form-item label="选择店面:" :label-width="formLabelWidth">
            <el-select v-model="storeId" placeholder="请选择" @change="changeStore">
              <el-option
                v-for="item in initFoodReviewStoreInformationList"
                :key="item.fd_sf_ID"
                :label="item.fd_sf_ProductName"
                :value="item.fd_sf_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择店面产品:" :label-width="formLabelWidth">
            <el-select v-model="addOptions.fd_st_ProductID" placeholder="请选择">
              <el-option
                v-for="item in storeProductDataList"
                :key="item.fd_sfp_ID"
                :label="item.fd_sfp_Name"
                :value="item.fd_sfp_ID">
              </el-option>
            </el-select>

          </el-form-item>

          <el-form-item label="上传图片:" :label-width="formLabelWidth">
            <a href="javascript:;" class="file">展示图片上传
              <input type="file" name="" ref="upload" accept="image/*">
            </a>
            <img v-lazy="addOptions.fd_st_ImageURL" width="192" height="120" v-show="addOptions.fd_st_ImageURL">
          </el-form-item>

        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>

      <!--修改-->

      <el-dialog title="修改首页展示图片" :visible.sync="updateDialog">
        <el-form :model="updateObj">
          <el-form-item label="图片编号:" :label-width="formLabelWidth">
            <el-input v-model="updateObj.fd_st_ID" :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="选择店面:" :label-width="formLabelWidth">
            <el-select v-model="storeId" placeholder="请选择" @change="changeStore">
              <el-option
                v-for="item in initFoodReviewStoreInformationList"
                :key="item.fd_sf_ID"
                :label="item.fd_sf_ProductName"
                :value="item.fd_sf_ID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择店面产品:" :label-width="formLabelWidth">
            <el-select v-model="updateObj.fd_st_ProductID" placeholder="请选择">
              <el-option
                v-for="item in storeProductDataList"
                :key="item.fd_sfp_ID"
                :label="item.fd_sfp_Name"
                :value="item.fd_sfp_ID">
              </el-option>
            </el-select>

          </el-form-item>

          <el-form-item label="上传图片:" :label-width="formLabelWidth">
            <a href="javascript:;" class="file">展示图片上传
              <input type="file" name="" ref="upload" accept="image/*">
            </a>
            <p>如果不上传图片,默认为原来的图片</p>
            <img v-lazy="addOptions.fd_st_ImageURL" width="192" height="120" v-show="addOptions.fd_st_ImageURL">
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

  export default {
    computed: mapGetters([
      'foodHomePagePictureList',
      'initFoodReviewStoreInformationList',
      'storeProductDataList'
    ]),
    data() {
      return {
        storeId: '',
        isLoading: false,
        total: 0,
        imgUrl: '',
        bigImgDialog: false,
        addDialog: false,
        addOptions: {
          "fd_st_ProductID": "",//店面产品编码
          "fd_st_ImageURL": "",//图片地址
        },
        formLabelWidth: '120px',
        updateDialog: false,
        updateObj: {},
        isDisabled: true,
      }
    },
    methods: {
      //分页
      handleCurrentChange(num) {
        this.initData(num)
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
          xhr.open("POST", "http://webservice.1000da.com.cn/OSSFile/PostToOSS");
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
        setTimeout(() => {
          this.addOptions.fd_st_ImageURL = '';
          if (this.$refs.upload) {
            this.$refs.upload.addEventListener('change', data => {
              for (var i = 0; i < this.$refs.upload.files.length; i++) {
                // this.uploadImg(this.$refs.upload.files[i]).then(data => {
                //   this.$store.dispatch('uploadAdminImgs', {
                //     imageData: data
                //   })
                this.uploadToOSS(this.$refs.upload.files[i])
                    .then(data => {
                      if (data) {
                        this.addOptions.fd_st_ImageURL = data.data;
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
      //选择店面
      changeStore(id) {
        this.initStoreProductData(id)
      },
      //初始化店面信息
      initStoreData() {
        let selectStoreFrontInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
        };
        this.$store.dispatch('initFoodReviewStoreInformation', selectStoreFrontInfo)
          .then(() => {
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })
      },
      //初始化店面产品
      initStoreProductData(id) {
        let selectStoreFrontProductInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "fd_sfp_StoreFrontID": id ? id : '',//店面编号
        };
        this.$store.dispatch('initStoreProductData', selectStoreFrontProductInfo)
          .then(() => {
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })
      },

      //大图
      bigImage(urlData) {
        this.$store.commit('setTranstionFalse');
        this.bigImgDialog = true;
        this.imgUrl = urlData;
      },
      //初始化数据
      initData(num) {
        let selectShowTopInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "page": num?num:'',
          "rows": "10",
          "fd_st_ID": "",//展示大图编码
        };
        this.isLoading = true;
        this.$store.dispatch('initFoodHomePagePicture', selectShowTopInfo)
          .then(total => {
            this.isLoading = false;
            this.total = total;
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })
      },
      //添加
      add() {
        this.uploaNode();
        this.$store.commit('setTranstionFalse');
        this.addDialog = true;
      },
      //添加提交
      addSubmit() {
        let insertShowTopInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": this.addOptions
        };
        this.$store.dispatch('addFoodHomePagePicture', insertShowTopInfo)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            })
            this.initData();
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })
        this.addDialog = false;
      },
      //修改
      update(rowData) {
        this.uploaNode();
        this.$store.commit('setTranstionFalse');
        this.updateDialog = true;
        this.updateObj = rowData;
        this.updateObj.fd_st_ProductID = '';
      },
      //修改提交
      updateSubmit() {
        if (this.addOptions.fd_st_ImageURL) {
          this.updateObj.fd_st_ImageURL = this.addOptions.fd_st_ImageURL
        }
        ;
        let updateShowTopInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": this.updateObj
        };
        this.$store.dispatch('updateFoodHomePagePicture', updateShowTopInfo)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            })
            this.initData();
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })
        this.updateDialog = false;
      },
      //删除
      Delete(id) {
        let deleteShowTopInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "fd_st_ID": id ? id : '',//展示大图编码
          }
        };
        this.$store.dispatch('deleteFoodHomePagePicture', deleteShowTopInfo)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            })
            this.initData();
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            })
          })
      },
    },
    created() {
      this.initData();
      this.initStoreData();
    }
  }
</script>
<style scoped>
</style>
