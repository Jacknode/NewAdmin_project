<template>
  <div>
    <section id="wrap">
      <h1 class="userClass">供应商信息</h1>
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>供应商名称筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-input type="text" v-model="userName" auto-complete="off" placeholder="商户名称"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
            <!--<el-button type="primary" @click="next">下一步</el-button>-->
            <!--<el-button type="primary" @click="addAdminBusinessInformation">新增</el-button>-->
          </el-form-item>
        </el-form>
      </el-col>

      <el-table
        :data="adminBusinessInformationList"
        highlight-current-row
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商家编号:">
                <span>{{ props.row.ts_tb_UserID }}</span>
              </el-form-item>
              <el-form-item label="商家简称:">
                <span>{{ props.row.ts_tb_Name }}</span>
              </el-form-item>
              <el-form-item label="商家全称:">
                <span>{{ props.row.ts_tb_FullName }}</span>
              </el-form-item>
              <el-form-item label="商家身份证号码:">
                <span>{{ props.row.ts_tb_CertNo }}</span>
              </el-form-item>
              <el-form-item label="商家手机号码:">
                <span>{{ props.row.ts_tb_TelePhone }}</span>
              </el-form-item>
              <el-form-item label="商家固定电话号码:">
                <span>{{ props.row.ts_tb_FixedPhone }}</span>
              </el-form-item>
              <el-form-item label="详细地址:">
                <el-popover
                  ref="popover1"
                  placement="top-start"
                  trigger="hover"
                  :content="props.row.ts_tb_Address">
                </el-popover>
                <el-button v-popover:popover1>移入查看</el-button>
              </el-form-item>
              <el-form-item label="所属国家:">
                <span>{{ props.row.ts_tb_Country }}</span>
              </el-form-item>
              <el-form-item label="所属省市:">
                <span>{{ props.row.ts_tb_Provice + props.row.ts_tb_City + "市" + props.row.ts_tb_Contry + "县"}}</span>
              </el-form-item>
              <el-form-item label="地址描述:">
                <!--<span>{{ props.row.ta_tg_Describe }}</span>-->
                <el-popover
                  ref="popover1"
                  placement="top-start"
                  trigger="hover"
                  :content="props.row.ts_tb_AddressDescribe">
                </el-popover>
                <el-button v-popover:popover1>移入查看</el-button>
              </el-form-item>
              <el-form-item label="经度:">
                <span>{{ props.row.ts_tb_Longitude + "°" }}</span>
              </el-form-item>
              <el-form-item label="纬度:">
                <span>{{ props.row.ts_tb_Latitude + "°" }}</span>
              </el-form-item>
              <el-form-item label="级别:">
                <span>{{ props.row.ts_tb_Level }}</span>
              </el-form-item>
              <el-form-item label="门店图片:">
                <img :src="item" alt="" v-for="item in props.row.ts_tb_ShowImage"
                     style="width: 100px;height: 100px;margin-right: 10px">
                <!--<p v-for="item in props.row.ts_tb_ShowImage">{{ item }}</p>-->
              </el-form-item>
              <el-form-item label="展示图片:">
                <img :src="item" alt="" v-for="item in props.row.ts_tb_StoreImageURL"
                     style="width: 100px;height: 100px">
              </el-form-item>
              <el-form-item label="到期时间:">
                <span>{{ props.row.ts_tb_EndTime }}</span>
              </el-form-item>
              <!--<el-form-item label="描述html:">-->
              <!--<span>{{ props.row.ta_tg_Describe }}</span>-->
              <!--</el-form-item>-->
              <el-form-item label="备注:">
                <!--<span>{{ props.row.ta_tg_Remark }}</span>-->
                <el-popover
                  ref="popover1"
                  placement="top-start"
                  trigger="hover"
                  :content="props.row.ts_tb_Remark">
                </el-popover>
                <el-button v-popover:popover1>移入查看</el-button>
              </el-form-item>
              <el-form-item label="营业执照编码:">
                <span>{{ props.row.ts_tb_LicenceCode }}</span>
              </el-form-item>
              <el-form-item label="门店图片:">
                <span>{{ props.row.tb_StoreImageURL}}</span>
              </el-form-item>
              <el-form-item label="开户银行:">
                <span>{{ props.row.ts_tb_Bank}}</span>
              </el-form-item>
              <el-form-item label="对公银行卡号:">
                <span>{{ props.row.ts_tb_CardNo}}</span>
              </el-form-item>
              <el-form-item label="创建时间:">
                <span>{{ props.row.ts_tb_CreateTime }}</span>
              </el-form-item>
              <el-form-item label="审核状态:">
                <span>{{ props.row.ts_tb_Check | getCheck}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="商家编号"
          prop="ts_tb_UserID">
        </el-table-column>
        <el-table-column
          label="商家名称"
          prop="ts_tb_Name">
        </el-table-column>
        <el-table-column
          label="商家手机号码"
          prop="ts_tb_TelePhone">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="updateAdminBusinessInformation(scope.row.ts_tb_UserID)">修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteAdminBusinessInformation(scope.row.ts_tb_UserID )">删除
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
    </section>
    <el-dialog title="修改商户" :visible.sync="updateAdminBusinessInformationDialog">
      <el-form :model="updateAdminBusinessInformationObj">
        <el-form-item label="商户编号:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminBusinessInformationObj.ts_tb_UserID" placeholder="请输入商户编号"></el-input>
        </el-form-item>
        <el-form-item label="商家简称:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminBusinessInformationObj.ts_tb_Name" placeholder="请输入商家简称"></el-input>
        </el-form-item>
        <el-form-item label="商家全称:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminBusinessInformationObj.ts_tb_FullName" placeholder="请输入商家全称"></el-input>
        </el-form-item>
        <el-form-item label="商家身份证号码:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminBusinessInformationObj.ts_tb_CertNo" placeholder="请输入商家身份证号码"></el-input>
        </el-form-item>
        <el-form-item label="商家手机号码:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminBusinessInformationObj.ts_tb_TelePhone" placeholder="请输入商家手机号码"></el-input>
        </el-form-item>
        <el-form-item label="商家固定电话号码:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminBusinessInformationObj.ts_tb_FixedPhone" placeholder="请输入商家固定电话号码"></el-input>
        </el-form-item>
        <el-form-item label="国家:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminBusinessInformationObj.ts_tb_Country" placeholder="请输入国家"></el-input>
        </el-form-item>
        <el-form-item label="省:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminBusinessInformationObj.ts_tb_Provice" placeholder="请输入省"></el-input>
        </el-form-item>
        <el-form-item label="所属市:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminBusinessInformationObj.ts_tb_City" placeholder="请输入所属市"></el-input>
        </el-form-item>
        <el-form-item label="所属县:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminBusinessInformationObj.ts_tb_Contry" placeholder="请输入所属县"></el-input>
        </el-form-item>
        <el-form-item label="详细地址:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminBusinessInformationObj.ts_tb_Address" placeholder="请输入详细地址"></el-input>
        </el-form-item>
        <el-form-item label="地址描述:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminBusinessInformationObj.ts_tb_AddressDescribe" placeholder="请输入地址描述"></el-input>
        </el-form-item>
        <el-form-item label="获取经纬度" :label-width="formLabelWidth" :required="isOff">
          <!--<el-input v-model="AddOptions.data.tm_ts_Longitude" auto-complete="off"></el-input>-->
          <el-button type="primary" @click="openMap">获取经纬度</el-button>
          <span
            style="padding-right: 20px">经度:{{updateAdminBusinessInformationObj.ts_tb_Longitude}}°</span><span>纬度:{{updateAdminBusinessInformationObj.ts_tb_Latitude}}°</span>
        </el-form-item>
        <el-form-item label="级别:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminBusinessInformationObj.ts_tb_Level" placeholder="请输入级别"></el-input>
        </el-form-item>
        <el-form-item label="营业执照编码:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminBusinessInformationObj.ts_tb_LicenceCode" placeholder="请输入营业执照编码"></el-input>
        </el-form-item>
        <el-form-item label="商家开户银行:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminBusinessInformationObj.ts_tb_Bank" placeholder="请输入商家开户银行"></el-input>
        </el-form-item>
        <el-form-item label="商家对公银行卡号:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminBusinessInformationObj.ts_tb_CardNo" placeholder="请输入商家对公银行卡号"></el-input>
        </el-form-item>
        <el-form-item label="展示图片地址:" :label-width="formLabelWidth">
          <a href="javascript:;" class="file">展示图片上传
            <input type="file" name="" ref="upload" accept="image/*" multiple>
          </a>
          <p v-for="item in ImageURL" v-show="ImageURL.length">{{item ? item : ""}}</p>
        </el-form-item>
        <el-form-item label="商家门店图片:" :label-width="formLabelWidth">
          <a href="javascript:;" class="file">门店图片上传
            <input type="file" name="" ref="upload1" accept="image/*" multiple>
          </a>
          <p v-for="item in ImageURL1" v-show="ImageURL1.length">{{item ? item : ""}}</p>
        </el-form-item>
        <el-form-item label="到期时间:" :label-width="formLabelWidth">
          <el-date-picker
            v-model="updateAdminBusinessInformationObj.ts_tb_EndTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="审核状态:" :label-width="formLabelWidth">
          <el-select v-model="updateAdminBusinessInformationObj.ts_tb_Check" placeholder="请选择审核状态">
            <el-option
              v-for="item in checkOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span>(0:审核中,1:通过,2:未通过)</span>
        </el-form-item>
        <el-form-item label="备注:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminBusinessInformationObj.ts_tb_Remark" placeholder="请输入内容" type="textarea"
                    :autosize="{ minRows: 6, maxRows: 10}"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateAdminBusinessInformationDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateAdminBusinessInformationSubmit">确 定</el-button>
      </div>
    </el-dialog>


    <!--地图-->
    <div class="mapJW" v-show="isMap">
      <div id="allmap">
      </div>
      <el-form ref="form" :model="form"
               style="z-index: 9990;position: absolute;background: #fff;bottom: 30px;left: 0;padding: 10px 30px;">
        <el-form-item label="经度">
          <el-input v-model="form.x"></el-input>
        </el-form-item>
        <el-form-item label="纬度">
          <el-input v-model="form.y"></el-input>
        </el-form-item>
        <el-button type="primary" @click="searchMap">查询</el-button>
        <el-button type="success" @click="mapSubmit">提交</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    name: '',
    data() {
      return {
        checkOptions: [{
          value: '0',
          label: '审核中'
        }, {
          value: '1',
          label: '通过'
        }, {
          value: '2',
          label: '未通过'
        }],
        isOff: true,
        isMap: false,
        formLabelWidth: '120px',
        userName: '',
        isLoading: false,
        ImageURL: [],
        ImageURL1: [],
        addAdminBusinessInformationDialog: false,//添加弹窗
        updateAdminBusinessInformationDialog: false,//修改弹窗
        addOptions: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "phone": "",
          "validateNo": "",
          "userpassword": ""
        },
        total: 0,
        form: {
          x: '',
          y: ''
        }
      }
    },
    computed: mapGetters([
      'adminBusinessInformationList',
      'updateAdminBusinessInformationObj'
    ]),
    methods: {
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
                //   this.$store.dispatch('uploadAdminImgs', {
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
      //提交
      mapSubmit() {
        this.isMap = false;
        this.updateAdminBusinessInformationObj.ts_tb_Longitude = this.form.x;
        this.updateAdminBusinessInformationObj.ts_tb_Latitude = this.form.y;
      },
      //查询地图
      searchMap() {
        var map = new BMap.Map("allmap");
        map.centerAndZoom(new BMap.Point(116.331398, 39.897445), 11);
        map.enableScrollWheelZoom(true);
        map.clearOverlays();
        var new_point = new BMap.Point(this.form.x, this.form.y);
        var marker = new BMap.Marker(new_point);  // 创建标注
        map.addOverlay(marker);              // 将标注添加到地图中
        map.panTo(new_point);
      },
      //打开地图
      openMap() {
        this.isMap = true
      },
//      初始化数据
      initData(name, page) {
        let initOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "tbUserID": "",
          "tbName": name ? name : '',
          "isDelete": 0,
          "page": page ? page : 1,
          "rows": 5
        };
        this.isLoading = true;
        this.$store.dispatch('initAdminBusinessInformation', initOptions)
          .then((totalrows) => {
            this.total = totalrows;
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
        this.initData(this.userName.trim(), 1)
      },
      //分页
      handleCurrentChange(num) {
        this.initData(this.userName.trim(), num)
      },
      //添加
//      addAdminBusinessInformation(){
//        this.$store.commit('setTranstionFalse');
//        this.addAdminBusinessInformationDialog = true;
//      },
      //修改
      updateAdminBusinessInformation(id) {
        this.$store.commit('setTranstionFalse');
        this.updateAdminBusinessInformationDialog = true;
        this.$store.commit('initUpdateAdminBusinessInformationObj', id)
        this.uploaNode()
      },
      //修改提交
      updateAdminBusinessInformationSubmit() {
        this.updateAdminBusinessInformationObj.ts_tb_ShowImage = this.ImageURL.join(',');
        this.updateAdminBusinessInformationObj.ts_tb_StoreImageURL = this.ImageURL1.join(',');
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": this.updateAdminBusinessInformationObj
        };
        this.$store.dispatch('UpdateAdminBusinessInformation', updateOptions)
          .then(() => {
            this.$notify({
              message: '修改成功!',
              type: 'success'
            });
            this.initData(this.userName.trim(), 1)
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
        this.updateAdminBusinessInformationDialog = false;
      },
      //删除
      deleteAdminBusinessInformation(id) {
        let deleteOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "tbUserID": id
        };
        this.$store.dispatch('DeleteAdminBusinessInformation', deleteOptions)
          .then(() => {
            this.$notify({
              message: '删除成功!',
              type: 'success'
            });
            this.initData(this.userName.trim(), 1)
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
      }
    },
    mounted() {
      var _this = this;
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function (r) {
        _this.form.x = r.point.lng;
        _this.form.y = r.point.lat;
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          var map = new BMap.Map("allmap");
          // var point = new BMap.Point(116.400244, 39.92556);
          map.centerAndZoom(r.point, 12); //定义地图等级，就是放大倍数
          map.enableScrollWheelZoom(true); //启用地图滚轮放大缩小
          var marker = new BMap.Marker(r.point);// 创建标注

          map.addOverlay(marker);  // 将标注添加到地图中
          map.panTo(r.point);
          // alert('您的位置：' + r.point.lng + ',' + r.point.lat);

          marker.enableDragging(); //标注可拖拽
          //marker.disableDragging();           // 不可拖拽

          // 开启事件监听
          marker.addEventListener("dragend", function (e) {

            var x = e.point.lng; //经度
            var y = e.point.lat; //纬度
//            alert("拖到的地点的经纬度：" + x + "，" + y);
            _this.form.x = x;
            _this.form.y = y;
          });
        }
        else {
          alert('failed' + this.getStatus());
        }
      }, {enableHighAccuracy: true})
    },
  }
</script>
<style scoped>

  #allmap {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 9900;
    margin-top: -50px;
    font-family: "微软雅黑";
  }
</style>
