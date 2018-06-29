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
          label="美食首页展示图片编号"
          prop="fd_st_ID">
        </el-table-column>

        <el-table-column
          align="center"
          label="店面名称"
          prop="fd_sf_ProductName">
        </el-table-column>
        <el-table-column
          align="center"
          label="产品名称"
          prop="fd_sfp_Name">
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
            <el-input v-model="updateObj.data.fd_st_ID" :disabled="isDisabled"></el-input>
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
          <!--v-show="isShow"-->
          <el-form-item label="选择店面产品:" :label-width="formLabelWidth" >
            <el-select v-model="updateStoreProduct" placeholder="请选择">
              <el-option
                v-for="item in storeProductDataList"
                :key="item.fd_sfp_ID"
                :label="item.fd_sfp_Name"
                :value="item.fd_sfp_ID">
              </el-option>
            </el-select>

          </el-form-item>

          <el-form-item label="上传图片:" :label-width="formLabelWidth">
            <img v-lazy="updatePicUrl" width="192" height="120" v-show="updatePicUrl">
            <div>
              <a href="javascript:;" class="file">请选择图片
                <input type="file" name="" ref="updateUploadImg" accept="image/*">
              </a>
            </div>
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

  export default {
    computed: mapGetters([
      'foodHomePagePictureList',
      'initFoodReviewStoreInformationList',
      'storeProductDataList'
    ]),
    data() {
      return {
        storeId: '',
/*        //默认店面产品为不展示
        isShow: false,*/
        //修改店面产品
        updateStoreProduct: '',
        //修改图片地址
        updatePicUrl: '',
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
        updateObj: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "fd_st_ID": "",//展示大图编码
            "fd_st_ProductID": "",//店面产品编码
            "fd_st_ImageURL": "",//图片地址
          }
        },
        isDisabled: true,
      }
    },
    methods: {
      //分页
      handleCurrentChange(num) {
        this.initData(num)
      },
      //图片上传OSS
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
      //上传图片
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
      changeStore() {
        this.initStoreProductData(this.storeId)
/*        if(this.storeId){
          this.isShow=true;
        };*/
      },
      //初始化店面信息
      initStoreData() {
        let selectStoreFrontInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
//          "fd_sf_ID": "2",//店面编号
//          "fd_sf_TypeID": "4",//分类编号
          //"fd_sf_MansID": "32",//用餐人数编号
//          "fd_sf_ProductName": "米兰主题派对火锅",//产品名称 like
          //"fd_sf_Provice": "四川省",//省
//          "fd_sf_City": "泸州市",//市
          //"priceFrom": "21",//人均价格大于
          //"priceTo":"50",//人均价格小于
          //"fd_sf_Phone": "1",//联系电话
          //"fd_sf_TradeID": "1",//供应商编码
//          "page": "1",
//          "rows":"5",

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
        console.log(id)
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
        console.log(rowData)
        this.updateObj.data.fd_st_ProductID=rowData.fd_sf_ID;
        this.updateObj.data.fd_st_ImageURL=rowData.fd_st_ImageURL;
        this.storeId=rowData.fd_sf_ID;
        this.updateStoreProduct=rowData.fd_st_ProductID;
        this.changeStore();
        this.updatePicUrl=rowData.fd_st_ImageURL;
//        this.uploaNode();
        this.$store.commit('setTranstionFalse');
        this.updateDialog = true;
      },
      //修改提交
      updateSubmit() {
        console.log(this.updateObj)
//        this.updateObj.data.fd_st_ID=rowData.fd_st_ID;
/*        if (this.addOptions.fd_st_ImageURL) {
          this.updateObj.fd_st_ImageURL = this.addOptions.fd_st_ImageURL
        };
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
          })*/
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
