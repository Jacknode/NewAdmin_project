<template>
  <div>
    <!--美食属性表-->
    <section id="wrap">
      <h1 class="userClass">属性类型</h1>
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>美食属性类型筛选:</span>
          </el-form-item>

          <el-form-item label="" :label-width="formLabelWidth">
            <el-select v-model="imageName" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="search" size="small">查询</el-button>
            <el-button type="primary" @click="Add" size="small">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--数据展示-->
      <el-table
        :data="foodAttributeTypeList"
        highlight-current-row
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column
          align="center"
          label="编码"
          prop="propertyID">
        </el-table-column>

        <el-table-column
          align="center"
          label="名称"
          prop="propertyName">
        </el-table-column>
        <el-table-column
          align="center"
          label="所属类型"
          prop="parentName">
        </el-table-column>
        <el-table-column
          align="center"
          label="英文名称"
          prop="letterName">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="Update(scope.row)">修改
            </el-button>
            <el-button
              v-show="true"
              size="mini"
              type="danger"
              @click="Delete(scope.row.propertyID)">删除
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

      <!--添加属性名称-->
      <el-dialog title="添加美食属性" :visible.sync="addDialog">
        <el-form :model="addOptions">
          <el-form-item label="名称:" :label-width="formLabelWidth">
            <el-input v-model="addOptions.data.fd_py_Name" placeholder="请输入属性名称"></el-input>
          </el-form-item>

          <el-form-item label="美食属性:" :label-width="formLabelWidth">
            <el-select v-model="addOptions.data.fd_py_ParentID" placeholder="请选择美食属性">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>

      <!--修改属性名称-->
      <el-dialog title="修改美食属性名称" :visible.sync="updateDialog">
        <el-form :model="updateFoodAttributeTypeOptions">
          <el-form-item label="编号:" :label-width="formLabelWidth">
            <el-input v-model="updateFoodAttributeTypeOptions.data.fd_py_ID" :disabled="isOff"
                      placeholder="请输入编号"></el-input>
          </el-form-item>
          <el-form-item label="属性名称:" :label-width="formLabelWidth">
            <el-input v-model="updateFoodAttributeTypeOptions.data.fd_py_Name" placeholder="请输入属性名称"></el-input>
          </el-form-item>
          <el-form-item label="美食属性:" :label-width="formLabelWidth">
            <el-select v-model="updateFoodAttributeTypeOptions.data.fd_py_ParentID" placeholder="请选择美食属性">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
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
    data() {
      return {
        updateFoodAttributeTypeOptions: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "fd_py_ID": "",//编号
            "fd_py_Name": "",//名称
            "fd_py_ParentID": "",//父编码
          }
        },
        options: [
          {
            name: '美食类型',
            value: '1'
          },
          {
            name: '用餐人数',
            value: '28'
          },
        ],
        //初始化
        imageName: '',
        isOff: '',
        total: 0,
        isLoading: false,
        updateDialog: false,
        formLabelWidth: '120px',
        addDialog: false,
        addOptions: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "fd_py_Name": "",//名称
            "fd_py_ParentID": "",//父编码
          },
          fd_py_ParentID: '',
        },
      }
    },
    computed: mapGetters([
      'foodAttributeTypeList',
    ]),
    created() {
      this.initData('', 1)
    },
    methods: {
      //分页

      handleCurrentChange(num) {
        this.initData(this.imageName, num)
      },

      initData(name, page) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "fd_py_ParentID": name ? name : '',//父编码
          "page": page ? page : "1",
          "rows": "5",

        };
        this.isLoading = true;
        this.$store.dispatch('initFoodAttributeListType', options)
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
      search() {
        this.initData(this.imageName, 1)
      },


      //添加
      Add() {
        this.addDialog = true;
        this.$store.commit('setTranstionFalse');
      },
      //添加提交
      addSubmit() {
        //actions提交的数据接口
        this.$store.dispatch('AddFoodAttributeListType', this.addOptions)
          .then((suc) => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.imageName, 1) //调用初始化
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
        this.addDialog = false;
      },
      //修改
      Update(rowData) {
        this.updateDialog = true;
        this.$store.commit('setTranstionFalse');
        this.updateFoodAttributeTypeOptions.data.fd_py_ParentID = "";
        this.updateFoodAttributeTypeOptions.data.fd_py_ID = rowData.propertyID;
        this.updateFoodAttributeTypeOptions.data.fd_py_Name = rowData.propertyName;
      },
      //修改提交
      updateSubmit() {
        this.$store.dispatch('initUpdateFoodAttributeType', this.updateFoodAttributeTypeOptions)
          .then((suc) => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.imageName, 1)
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          });
        this.updateDialog = false;
      },
      //删除
      Delete(id) {
        let deleteOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "fd_py_ID": id ? id : '',//编号
          }
        };
        this.$store.dispatch('deleteFoodAttributeType',deleteOptions)
          .then((suc) => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData(this.imageName,1)
          }, err => {
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
