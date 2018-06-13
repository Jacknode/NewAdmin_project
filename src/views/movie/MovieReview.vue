<template>
  <div>
    <section id="wrap">
      <h1 class="userClass">微电影类型审核</h1>
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>微电影审核筛选:</span>
          </el-form-item>
          <el-form-item>
            <!--<el-input type="text" v-model="filmName" auto-complete="off" placeholder="请选择微电影" size="small"></el-input>-->
            <el-select v-model="filmName" placeholder="请选择审核状态" size="small">
              <el-option
                v-for="item in filmType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>

            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search" size="small">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--数据展示-->
      <el-table
        :data="movieAudit"
        highlight-current-row
        v-loading=""
        style="width: 100%">
        <el-table-column type="expand">

          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="作者：">
                <span>{{ props.row.vf_ve_Content.vf_vo_AuthorID }}</span>
              </el-form-item>
              <el-form-item label="时长:">
                <span>{{ props.row.vf_ve_Content.vf_vo_Time}}分钟</span>
              </el-form-item>
              <el-form-item label="大小:">
                <span>{{ props.row.vf_ve_Content.vf_vo_Size}}M</span>
              </el-form-item>
              <el-form-item label="文件扩展名:">
                <span>{{ props.row.vf_ve_Content.vf_vo_Extend}}</span>
              </el-form-item>
              <el-form-item label="文件地址:">
                <span>{{ props.row.vf_ve_Content.vf_vo_FileURL}}</span>
              </el-form-item>

              <el-form-item label="视频标题:">
                <span>{{ props.row.vf_ve_Content.vf_vo_Title}}</span>

              </el-form-item>
              <el-form-item label="视频图片:">
                <span>{{ props.row.vf_ve_Content.vf_vo_ImageURL}}</span>

              </el-form-item>
              <el-form-item label="创建时间:">
                <span>{{ props.row.vf_ve_Content.vf_ve_CreateTime}}</span>
              </el-form-item>
              <el-form-item label="视频详情:">
                <span>{{ props.row.vf_ve_Content.vf_vo_Remark}}</span>
              </el-form-item>
              <el-form-item label="视频简介:">
                <span>{{ props.row.vf_ve_Content.vf_vo_Introduce}}</span>
              </el-form-item>

            </el-form>
          </template>

        </el-table-column>
        <el-table-column
          label="审核表编号"
          prop="vf_ve_ID">
        </el-table-column>
        <el-table-column
          label="视频类型"
          prop="vf_ve_TypeName">

        </el-table-column>
        <el-table-column
          label="创建时间"
          prop="vf_ve_CreateTime">
          <template slot-scope="props">
            <span>{{ props.row.vf_ve_Content.vf_vo_CreateTime}}</span>
            <!--<span> {{approvalOptions.vf_ve_CreateTime}}</span>-->
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              v-show="scope.row.ts_tg_IsPass!=1"
              @click="approval(scope.row.vf_ve_ID)">审核
            </el-button>

            <el-button
              size="mini"
              type="primary"
              @click="Update(scope.row)">修改
            </el-button>
          </template>
        </el-table-column>
      </el-table>
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
    </section>

    <!--审核状态-->
    <el-dialog title="审核状态" :visible.sync="approvalStatusDialog">
      <el-form :model="approvalOptions">
        <el-form-item label="审核状态:" :label-width="formLabelWidth">
          <el-radio v-model="approvalOptions.IsPass" label="1">功审核成</el-radio>
          <el-radio v-model="approvalOptions.IsPass" label="2">审核失败</el-radio>
        </el-form-item>
        <el-form-item label="审核失败原因:" :label-width="formLabelWidth" v-show="approvalOptions.IsPass!=1">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 6}"
            placeholder="请输入内容"
            v-model="approvalOptions.failReason">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="approvalStatusDialog = false">取 消</el-button>
        <el-button type="primary" @click="approvalStatusSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改审核表-->
    <el-dialog title="修改微电影审核" :visible.sync="updateDialog">

      <el-form :model="updateObj">

        <el-form-item label="作者:" :label-width="formLabelWidth">
          <el-input v-model="updateObj.data.vf_ve_Content.vf_vo_AuthorID" placeholder="作者"></el-input>
        </el-form-item>

        <el-form-item label="大小:" :label-width="formLabelWidth">
          <el-input v-model="updateObj.data.vf_ve_Content.vf_vo_Size" placeholder="大小"></el-input>
        </el-form-item>
        <el-form-item label="时长:" :label-width="formLabelWidth">
          <el-input v-model="updateObj.data.vf_ve_Content.vf_vo_Time" placeholder="时长"></el-input>
        </el-form-item>
        <el-form-item label="文件地址:" :label-width="formLabelWidth">
          <el-input v-model="updateObj.data.vf_ve_Content.vf_vo_FileURL" placeholder="文件地址"></el-input>
        </el-form-item>
        <el-form-item label="文件扩展名:" :label-width="formLabelWidth">
          <el-input v-model="updateObj.data.vf_ve_Content.vf_vo_Extend" placeholder="文件扩展名"></el-input>
        </el-form-item>
        <el-form-item label="视频图片:" :label-width="formLabelWidth">
          <el-input v-model="updateObj.data.vf_ve_Content.vf_vo_ImageURL" placeholder="视频图片"></el-input>
        </el-form-item>
        <el-form-item label="视频标题:" :label-width="formLabelWidth">
          <el-input v-model="updateObj.data.vf_ve_Content.vf_vo_Title" placeholder="视频标题"></el-input>
        </el-form-item>
        <el-form-item label="创建时间:" :label-width="formLabelWidth">
          <el-input v-model="updateObj.data.vf_ve_CreateTime" placeholder="创建时间"></el-input>
        </el-form-item>
        <el-form-item label="视频详情:" :label-width="formLabelWidth">
          <el-input v-model="updateObj.data.vf_ve_Content.vf_vo_Remark" placeholder="视频详情"></el-input>
        </el-form-item>
        <el-form-item label="视频简介:" :label-width="formLabelWidth">
          <el-input v-model="updateObj.data.vf_ve_Content.vf_vo_Introduce" placeholder="视频详情"></el-input>
        </el-form-item>
        <el-form-item label="编号分类:" :label-width="formLabelWidth">
          <el-input v-model="updateObj.data.vf_ve_Content.vf_te_IDs" placeholder="编号分类"></el-input>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="updateDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    name: '',
    data(){
      return {
        updateObj: {
          "loginUserID": "huileyou",  //惠乐游用户ID
          "loginUserPass": "123",  //惠乐游用户密码
          "operateUserID": "",  //操作员编码
          "operateUserName": "",  //操作员名称
          "pcName": "",  //机器码
          "data": {
            "vf_ve_ID": "",  //审核表编号
            "vf_ve_Type": "",  //视频类型
            "vf_ve_Content": {  //审核表内容
              "vf_vo_Time": "",  //时长
              "vf_vo_Size": "",  //大小
              "vf_vo_Extend": "",  //文件扩展名
              "vf_vo_FileURL": "",  //文件地址
              "vf_vo_AuthorID": "",  //作者
              "vf_vo_Title": "视频标题",  //标题
              "vf_vo_ImageURL": "",  //视频图片
              "vf_vo_CreateTime": "",  //创建时间
              "vf_vo_Introduce": "",  //简介
              "vf_vo_Remark": "",  //详情
              "vf_te_IDs": ""
            }
          }

        },
        updateDialog: false,
        filmName: "",
        total: 0,
        filmType: [{
          value: "0",
          label: '微电影'
        }, {
          value: "1",
          label: '广告视频'
        },
          {
            value: "2",
            label: '教育视频'
          }
        ],
        approvalOptions: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "vf_ve_ID": "",//审核表编号
          "vf_ve_Type": "",//视频类型
          "vf_ve_Content": "",//审核表内容
          "vf_ve_CreateTime": "",//创建时间
          // "goodID": '',//商户号
          "IsPass": '1',

          failReason: '',//审核失败原因
        },
        checkOption: {
          "loginUserID": "huileyou",  //惠乐游用户ID
          "loginUserPass": "123",  //惠乐游用户密码
          "operateUserID": "",//操作员编码
          "operateUserName": "",//操作员名称
          "pcName": "",  //机器码
          "vf_ve_ID": "",//审核表编号
          "vf_vo_PasserID": ""//审核员编码
        },
        deleteOption: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",//操作员编码
          "operateUserName": "",//操作员名称
          "pcName": "",
          "data": {
            "vf_ve_ID": "",//审核表编号
          }

        },
        formLabelWidth: '120px',

        isLoading: false,
        approvalStatusDialog: false,

      }
    },
    computed: mapGetters([
      'movieAudit',
      'updateMovieReviewObj'

    ]),

    created(){
      this.initData(this.filmName)
    },
    methods: {
      //分页
      handleCurrentChange(num){
        this.initData(this.filmName, num)

      },
      handleSelect(item) {

      },
      initData(name, page){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",//操作员编码
          "operateUserName": "",//操作员名称
          "pcName": "",
          "vf_ve_ID": "",//审核表编号
          "vf_ve_Type": name ? name : "",//视频类型
          "page": page ? page : 1,//页码
          "rows": 5//条数

        }

        this.isLoading = true;
        this.$store.dispatch('initMovieAudit', options)
        .then(data => {
          this.total = data;
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
        this.initData(this.filmName)
      },
      //审核
      approval(id){

        this.deleteOption.data.vf_ve_ID = id;
        this.checkOption.vf_ve_ID = id;
        this.$store.commit('setTranstionFalse');
        this.approvalStatusDialog = true;

      },
      //审核提交
      approvalStatusSubmit(){


        if (this.approvalOptions.IsPass == 1) {
          //审核成功添加到审核表
          this.$store.dispatch('AuditSubmitOk', this.checkOption)
          .then(success => {
            this.$notify({
              message: success,
              type: 'success'
            });
            this.initData(this.id)
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
          this.approvalStatusDialog = false;
        } else {

          // 审核失败直接删除

          this.$store.dispatch('AuditSubmitNo', this.deleteOption)

          .then(success => {
            this.$notify({
              message: success,
              type: 'success'
            });
            this.initData(this.id)
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
          this.approvalStatusDialog = false;

        }
        //   this.approvalOptions.goodID = this.sm_ai_ID
      },
      //checkType,微电影状态改成对应的名字
      check(){

        //if(movieAudit.vf_ve_Type){}
      },
      //修改
      Update(rowData){
        this.updateObj.data = rowData;
        this.updateDialog = true;
        this.$store.commit('setTranstionFalse', this.updateObj);
        this.$store.commit('initUpdateMovieReviewObj', rowData)
      },
      //修改提交
      updateSubmit(){

        this.$store.dispatch('UpdateMovieReview', this.updateObj)
        .then((suc) => {
          this.$notify({
            message: suc,
            type: 'success'
          });
          this.initData(this.filmName)
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          });
        });
        this.updateDialog = false
      },
    },
  }
</script>
<style scoped>
</style>
