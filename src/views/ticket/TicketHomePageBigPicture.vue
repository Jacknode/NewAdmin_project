<template>
  <div>
    <div id="wrap" class="clearfix">
      <h1 class="userClass">首页展示大图</h1>

      <!--搜索-->

      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>景点名称筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-select v-model="scenicSpotId" placeholder="请选择" size="small">
              <el-option
                v-for="item in showTopList"
                :key="item.tm_ts_Code"
                :label="item.tm_ts_Name"
                :value="item.tm_ts_Code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search" size="small">查询</el-button>
            <el-button type="primary" @click="add" size="small">添加</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--分页-->
      <div class="block" style="float: right;padding: 10px 0">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="5"
          layout="total, prev, pager, next"
          :total="total"
          v-show="total"
        >
        </el-pagination>
      </div>
      <!--数据展示-->

      <el-table
        :data="ticketHomePageBigPictureList"
        stripe
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column
          align="center"
          prop="tm_ts_Name"
          label="景点名称">
        </el-table-column>
        <el-table-column
          align="center"
          label="展示图片">
          <template slot-scope="scope">
            <img  v-lazy="scope.row.tm_tbi_Image" width="89" height="29" @click="bigPicture(scope.row.tm_tbi_Image)">
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="tm_tbi_Remark"
          label="备注">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="update(scope.row)">
              修改
            </el-button>
            <el-button type="danger" size="mini" @click="Delete(scope.row.tm_tbi_ID)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--放大图片-->

      <el-dialog title="查看大图" :visible.sync="bigImageDialog" width="50%">
        <img v-lazy="bigImage" width="100%" height="100%">
        <span slot="footer" class="dialog-footer">
          <el-button @click="bigImageDialog = false">关闭</el-button>
        </span>
      </el-dialog>


      <!--添加首页展示大图-->

      <el-dialog title="添加首页展示大图" :visible.sync="addDialog">
        <el-form :model="addOptions">
          <el-form-item label="景点名称:" :label-width="formLabelWidth">
            <el-select v-model="addOptions.tm_ts_Code" placeholder="请选择" size="small">
              <el-option
                v-for="item in showTopList"
                :key="item.tm_ts_Code"
                :label="item.tm_ts_Name"
                :value="item.tm_ts_Code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="展示图片地址:" :label-width="formLabelWidth">
            <a href="javascript:;" class="file">展示图片上传
              <input type="file" name="" ref="upload" accept="image/*">
            </a>
            <img v-lazy="addOptions.tm_tbi_Image" width="192" height="120" v-show="addOptions.tm_tbi_Image">
          </el-form-item>
          <el-form-item label="备注:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.tm_tbi_Remark" placeholder="请输入主题介绍" type="textarea" :rows="4"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>

      <!--修改首页展示大图-->

      <el-dialog title="修改首页展示大图" :visible.sync="updateDialog">
        <el-form :model="updateData">
          <el-form-item label="景点名称:" :label-width="formLabelWidth">
            <el-select v-model="updateData.tm_ts_Code" placeholder="请选择" size="small">
              <el-option
                v-for="item in showTopList"
                :key="item.tm_ts_Code"
                :label="item.tm_ts_Name"
                :value="item.tm_ts_Code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="展示图片地址:" :label-width="formLabelWidth">
            <a href="javascript:;" class="file">展示图片上传
              <input type="file" name="" ref="upload" accept="image/*">
            </a>
            <p>如果不上传默认为原来的图片</p>
            <img v-lazy="addOptions.tm_tbi_Image" width="192" height="120" v-show="addOptions.tm_tbi_Image">
          </el-form-item>
          <el-form-item label="备注:" :label-width="formLabelWidth">
            <el-input v-model="updateData.tm_tbi_Remark" placeholder="请输入主题介绍" type="textarea" :rows="4"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateDialog = false">取 消</el-button>
          <el-button type="primary" @click="updateSubmit">确 定</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {getNewStr} from '@/assets/js/public'

  export default {
    computed: mapGetters([
      'ticketHomePageBigPictureList',
      'showTopList'
    ]),
    data() {
      return {
        total:0,
        bigImageDialog: false,
        bigImage: '',
        scenicSpotId: '',
        addDialog: false,
        formLabelWidth: '120px',
        addOptions: {
          "tm_ts_Code": "",//景点编号
          "tm_tbi_Image": "",//大图路径
          "tm_tbi_Remark": "",//备注
        },
        isLoading:false,
        updateDialog: false,
        updateData: {},
      }
    },
    methods: {
      //分页
      handleCurrentChange(num){
        this.initData(num)
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
        setTimeout(() => {
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
                        this.addOptions.tm_tbi_Image = data.data;
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
      //初始化景点列表
      initTicketList() {
        let getTourSite = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "tm_ts_Code": "",//景点编码(主键)
          "tm_ts_Name": "",//景点名称
          "tm_ts_TradeInfoID": "",//供应商编码
          "tm_ts_ThemeTypeID": "",//主题编码
          "tm_ts_IsHot": "",//是否热门景点（0普通1热门）
          "tm_ts_ShowTop": "",//是否展示首页（0否，1是）
          "tm_ts_ShowTopIsAgree": "",//惠乐游审核是否首页显示(0审核中1通过审核2未通过审核)
          "tm_ts_IsPass": "",//是否通过审核(0审核中1通过审核2未通过审核)
          "tm_ts_IsDelete": 0,//是否删除(0不删除1删除)
          "page": 1,
          "rows": 10000
        };
        this.$store.dispatch('initScenicSpotList', getTourSite)
          .then(() => {
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },

      //初始化首页大图
      initData(id) {
        let selectTopBigImageInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "tm_tbi_ID": "",//首页大图编号
          "tm_ts_Code": id ? id : "",//景点编号
          "tm_tbi_IsDelete": "0"
        };
        this.isLoading = true;
        this.$store.dispatch('initTicketHomePageBigPicture', selectTopBigImageInfo)
          .then(() => {
            this.isLoading = false;
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },
      //查询
      search() {
        this.initData(this.scenicSpotId);
      },
      //图片放大
      bigPicture(url) {
        this.$store.commit('setTranstionFalse');
        this.bigImageDialog = true;
        this.bigImage = url;
      },
      //添加按钮
      add() {
        this.$store.commit('setTranstionFalse');
        this.addDialog = true;
        this.uploaNode();
      },
      //添加提交
      addSubmit() {
        let insertTopBigImageInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": this.addOptions
        };
        this.$store.dispatch('addTicketHomePageBigPicture', insertTopBigImageInfo)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData();
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
        this.addDialog = false;
      },
      //修改
      update(rowData) {
        this.addOptions.tm_tbi_Image = '';
        this.uploaNode();
        this.updateDialog = true;
        this.$store.commit('setTranstionFalse');
        this.updateData = rowData;
      },
      //修改提交
      updateSubmit() {
        if (this.addOptions.tm_tbi_Image) {
          this.updateData.tm_tbi_Image = this.addOptions.tm_tbi_Image
        }
        let updateTopBigImageInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": this.updateData
        };
        this.$store.dispatch('updateTicketHomePageBigPicture', updateTopBigImageInfo)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData();
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
        this.updateDialog = false;
      },
      //删除
      Delete(id) {
        let deleteTopBigImageInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "tm_tbi_ID": id ? id : '',//首页大图编号
          }
        };
        this.$store.dispatch('deleteTicketHomePageBigPicture', deleteTopBigImageInfo)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData();
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },
    },
    created() {
      this.initTicketList();
      this.initData();
    }
  }
</script>
<style scoped>
</style>
