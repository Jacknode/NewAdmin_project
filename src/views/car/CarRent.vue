<template>
  <section id="wrap">
    <h1 class="userClass">租车汽车管理</h1>
    <el-col :span="24" class="formSearch">
      <el-form :inline="true">
        <el-form-item>
          <span>汽车名称筛选:</span>
        </el-form-item>
        <el-form-item>
          <el-input type="text" v-model="carName" auto-complete="off" placeholder="汽车名称" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" size="small">查询</el-button>
          <el-button type="primary" @click="Add" size="small">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--数据展示-->
    <el-table
      :data="carRentList"
      highlight-current-row
      v-loading="isLoading"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="汽车编码:">
              <span>{{ props.row.cr_crc_Id }}</span>
            </el-form-item>
            <el-form-item label="汽车名称:">
              <span>{{ props.row.cr_crc_Name }}</span>
            </el-form-item>
            <el-form-item label="手自排:">
              <span>{{ props.row.cr_crc_VariableSpeed | getVariableSpeed}}</span>
            </el-form-item>
            <el-form-item label="排量:">
              <span>{{ props.row.cr_crc_Displacement }}</span>
            </el-form-item>
            <el-form-item label="座位数:">
              <span>{{ props.row.cr_crc_SeatNumber }}</span>
            </el-form-item>
            <el-form-item label="图片:">
              <img v-lazy="props.row.cr_crc_ImagePath" alt="" style="width: 100px;height: 100px;">
            </el-form-item>
            <el-form-item label="品牌:">
              <span>{{ props.row.cr_crc_BrandName }}</span>
            </el-form-item>
            <el-form-item label="车身结构:">
              <span>{{ props.row.cr_crc_StructureName }}</span>
            </el-form-item>
            <el-form-item label="车型组:">
              <span v-for="item in props.row.ModelGroup">{{ item.cr_cra_AttrName }}</span>
            </el-form-item>
            <el-form-item label="入库时间:">
              <span>{{ props.row.cr_crc_CreateTime }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="汽车编码"
        prop="cr_crc_Id">
      </el-table-column>
      <el-table-column
        align="center"
        label="汽车名称"
        prop="cr_crc_Name">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="Update(scope.row)">修改
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="Delete(scope.row.cr_crc_Id)">删除
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

    <!--添加汽车-->
    <el-dialog title="添加汽车" :visible.sync="addDialog">
      <el-form :model="addOptions">
        <el-form-item label="汽车名称:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.cr_crc_Name" placeholder="请输入汽车名称"></el-input>
        </el-form-item>
        <el-form-item label="手自排:" :label-width="formLabelWidth">
          <el-select v-model="addOptions.data.cr_crc_VariableSpeed" placeholder="请选择">
            <el-option
              v-for="item in variableSpeedList"
              :key="item.v"
              :label="item.name"
              :value="item.v">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排量:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.cr_crc_Displacement"></el-input>
        </el-form-item>
        <el-form-item label="座位数:" :label-width="formLabelWidth">
          <el-input v-model="addOptions.data.cr_crc_SeatNumber"></el-input>
        </el-form-item>
        <el-form-item label="品牌:" :label-width="formLabelWidth">
          <el-select v-model="addOptions.data.cr_crc_BrandId" placeholder="请选择">
            <el-option
              v-for="item in carBrandsList"
              :key="item.cr_cra_Id"
              :label="item.cr_cra_Name"
              :value="item.cr_cra_Id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车身结构:" :label-width="formLabelWidth">
          <el-select v-model="addOptions.data.cr_crc_Structure" placeholder="请选择">
            <el-option
              v-for="item in carBodyStructureList"
              :key="item.cr_cra_Id"
              :label="item.cr_cra_Name"
              :value="item.cr_cra_Id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车型组:" :label-width="formLabelWidth">
          <el-select v-model="CarList" placeholder="请选择" multiple>
            <el-option
              v-for="item in carModelGroupList"
              :key="item.cr_cra_Id"
              :label="item.cr_cra_Name"
              :value="item.cr_cra_Id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="汽车图片:" :label-width="formLabelWidth">
          <a href="javascript:;" class="file">上传图片
            <input type="file" name="" ref="upload" accept="image/*" multiple>
          </a>
          <img src="" alt="" v-lazy="item" v-show="ImageURL.length" v-for="item in ImageURL"
               style="width: 100px;height: 100px">
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改汽车-->
    <el-dialog title="修改汽车" :visible.sync="updateDialog">
      <el-form :model="updateOptions">
        <el-form-item label="汽车名称:" :label-width="formLabelWidth">
          <el-input v-model="updateOptions.cr_crc_Name" placeholder="请输入汽车名称"></el-input>
        </el-form-item>
        <el-form-item label="手自排:" :label-width="formLabelWidth">
          <el-select v-model="updateOptions.cr_crc_VariableSpeed" placeholder="请选择">
            <el-option
              v-for="item in variableSpeedList"
              :key="item.v"
              :label="item.name"
              :value="item.v">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排量:" :label-width="formLabelWidth">
          <el-input v-model="updateOptions.cr_crc_Displacement"></el-input>
        </el-form-item>
        <el-form-item label="座位数:" :label-width="formLabelWidth">
          <el-input v-model="updateOptions.cr_crc_SeatNumber"></el-input>
        </el-form-item>
        <el-form-item label="品牌:" :label-width="formLabelWidth">
          <el-select v-model="updateOptions.cr_crc_BrandId" placeholder="请选择">
            <el-option
              v-for="item in carBrandsList"
              :key="item.cr_cra_Id"
              :label="item.cr_cra_Name"
              :value="item.cr_cra_Id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车身结构:" :label-width="formLabelWidth">
          <el-select v-model="updateOptions.cr_crc_Structure" placeholder="请选择">
            <el-option
              v-for="item in carBodyStructureList"
              :key="item.cr_cra_Id"
              :label="item.cr_cra_Name"
              :value="item.cr_cra_Id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车型组:" :label-width="formLabelWidth">
          <el-select v-model="CarList" placeholder="请选择" multiple>
            <el-option
              v-for="item in carModelGroupList"
              :key="item.cr_cra_Id"
              :label="item.cr_cra_Name"
              :value="item.cr_cra_Id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="汽车图片:" :label-width="formLabelWidth">
          <a href="javascript:;" class="file">上传图片
            <input type="file" name="" ref="updateUploadInput" accept="image/*" multiple>
          </a>
          <img src="" alt="" v-lazy="item" v-show="ImageURL1.length" v-for="item in ImageURL1"
               style="width: 100px;height: 100px">
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="updateSubmit">确 定</el-button>
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
        carName: '',
        ImageURL: [],
        ImageURL1: [],
        addDialog: false,
        total: 0,
        isLoading: false,
        variableSpeedList:[
          {
            name:'自动挡',
            v:'1'
          },
          {
            name:'手动挡',
            v:'2'
          }
        ],
        updateDialog: false,
        formLabelWidth: '120px',
        updateOptions:{},
        addOptions: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "data": {
            "cr_crc_Name": "",//汽车名称
            "cr_crc_VariableSpeed": "",//1自动挡  2手动挡
            "cr_crc_Displacement": "",//排量
            "cr_crc_SeatNumber": "",//座位数
            "cr_crc_ImagePath": "",//图片
            "cr_crc_BrandId": "",//品牌
            "cr_crc_Structure": "",//车身结构
            "cr_crc_CreateTime": "",//入库时间
            ModelGroup:''
          }
        },
        CarList:[]
      }
    },
    computed: mapGetters([
      'carRentList',
      'carBrandsList',
      'carBodyStructureList',
      'carModelGroupList'
    ]),
    created(){
      this.initProperties().then(()=>{
        this.initData('', 1)
      },err=>{
        this.$notify({
          message: err,
          type: 'error'
        });
      })
    },
    methods: {
      initItem(PId){
        return {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "page": "",//分页号
          "rows": "",//单页显示数据量
          "cr_cra_Id": "",//属性编号
          "cr_cra_Name": "",//属性名称
          "cr_car_PId": PId,//属性父ID
        }
      },
      async initProperties(){
        //品牌
        await this.$store.dispatch('initCarBrands',this.initItem(1));
        //车身结构
        await this.$store.dispatch('initCarBrands',this.initItem(4))
        //车型租
        await this.$store.dispatch('initCarBrands',this.initItem(2))
      },
      //分页
      handleCurrentChange(num){
        this.initData('', num);
      },
      //修改取消
      cancel(){
        this.initData('', 1);
        this.addDialog = false;
        this.updateDialog = false;
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
          xhr.open("POST", getNewStr+"/OSSFile/PostToOSS",true);
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
          if (this.$refs.upload) {
            this.$refs.upload.addEventListener('change', data => {
              for (var i = 0; i < this.$refs.upload.files.length; i++) {
                // this.uploadImg(this.$refs.upload.files[i]).then(data => {
                //   this.$store.dispatch('carUploadAdminImgs', {
                //     imageData: data
                //   })
                this.uploadToOSS(this.$refs.upload.files[i])
                  .then(data => {
                    if (data) {
                      this.ImageURL = []
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
          if (this.$refs.updateUploadInput) {
            this.$refs.updateUploadInput.addEventListener('change', data => {
              for (var i = 0; i < this.$refs.updateUploadInput.files.length; i++) {
                // this.uploadImg(this.$refs.updateUploadInput.files[i]).then(data => {
                //   this.$store.dispatch('carUploadAdminImgs', {
                //     imageData: data
                //   })
                this.uploadToOSS(this.$refs.updateUploadInput.files[i])
                  .then(data => {
                    if (data) {
                      this.ImageURL1 = [];
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
      initData(name, page){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "page": page ? page : 1,//分页号
          "rows": "10",//单页显示数据量
          "cr_crc_Id": "",//汽车编号
          "cr_crc_Name": name ? name : '',//汽车名称
          "cr_crc_VariableSpeed": "",//1自动挡  2手动挡
          "cr_crc_Displacement": "",//排量
          "cr_crc_SeatNumber": "",//座位数
          "cr_crc_ImagePath": "",//图片
          "cr_crc_BrandId": "",//品牌
          "cr_crc_Structure": "",//车身结构
          "cr_crc_CreateTime": "",//入库时间
        };
        this.isLoading = true;
        this.$store.dispatch('initCarRent', options)
        .then(total => {
          this.total = total;
          this.isLoading = false;
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          });
        })
      },
      //查询
      search(){
        this.initData(this.carName, 1);
      },
      //添加
      Add(){
        this.ImageURL = [];
        this.$store.commit('setTranstionFalse');
        for(var attr in this.addOptions.data){
          this.addOptions.data[attr] = '';
        }
        this.uploaNode();
        this.addDialog = true;
      },
      addSubmit(){
        this.addOptions.data.ModelGroup = this.CarList.join(',')
        this.addOptions.data.cr_crc_ImagePath = this.ImageURL.join(',');
        this.$store.dispatch('AddCarRent',this.addOptions)
          .then((suc)=>{
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData('',1)
          },err=>{
            this.$notify({
              message: err,
              type: 'error'
            });
          });
        this.addDialog = false;
      },
      //修改
      Update(obj){
        this.uploaNode();
        this.updateOptions = obj;
        this.$store.commit('setTranstionFalse');
        this.updateDialog = true;
      },
      //修改提交
      updateSubmit(){
        this.updateOptions.ModelGroup = this.CarList.join(',');
        this.updateOptions.cr_crc_ImagePath = this.ImageURL1.join(',');
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "data":  this.updateOptions
        };
        this.$store.dispatch('UpdateCarRent',updateOptions)
        .then((suc)=>{
          this.$notify({
            message: suc,
            type: 'success'
          });
          this.initData('',1)
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
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "cr_crc_Id": id//汽车编号
          }
        };
        this.$store.dispatch('DeleteCarRent',deleteOptions)
        .then((suc)=>{
          this.$notify({
            message: suc,
            type: 'success'
          });
          this.initData('',1)
        },err=>{
          this.$notify({
            message: err,
            type: 'error'
          });
        });
      }
    }
  }
</script>
<style scoped>

</style>
