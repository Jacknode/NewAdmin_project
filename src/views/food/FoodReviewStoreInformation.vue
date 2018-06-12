<template>
  <div>
    <!--美食审核店面信息-->
    <section id="wrap">
      <h1 class="userClass">店面信息管理</h1>

      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>店面名称筛选:</span>
          </el-form-item>

          <el-form-item>
            <el-input type="text" v-model="storeName" auto-complete="off" placeholder="请输入店面名称" size="small"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="search" size="small">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--数据展示-->
      <el-table
        :data="initFoodReviewStoreInformationList"
        highlight-current-row
        v-loading="isLoading"
        style="width: 100%">

        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">

              <el-form-item label="店面编号:">
                <span>{{ props.row.fd_sf_ID }}</span>
              </el-form-item>
              <el-form-item label="分类编号:">
                <span>{{ props.row.fd_sf_TypeID }}</span>
              </el-form-item>
              <el-form-item label="商家编号:">
                <span>{{ props.row.fd_py_Name }}</span>
              </el-form-item>
              <el-form-item label="用餐人数编号:">
                <span>{{ props.row.fd_sf_MansID }}</span>
              </el-form-item>
              <el-form-item label="产品名称:">
                <span>{{ props.row.fd_sf_ProductName }}</span>
              </el-form-item>
              <el-form-item label="地址描述:">
                <span>{{ props.row.fd_sf_Address }}</span>
              </el-form-item>
              <el-form-item label="经度:">
                <span>{{ props.row.fd_sf_Lng }}</span>
              </el-form-item>
              <el-form-item label="纬度:">
                <span>{{ props.row.fd_sf_Lat }}</span>
              </el-form-item>
              <el-form-item label="省:">
                <span>{{ props.row.fd_sf_Provice }}</span>
              </el-form-item>
              <el-form-item label="市:">
                <span>{{ props.row.fd_sf_City }}</span>
              </el-form-item>
              <el-form-item label="人均价格:">
                <span>{{ props.row.fd_sf_AvgPrice }}</span>
              </el-form-item>
              <el-form-item label="营业时间:">
                <span>{{ props.row.fd_sf_OpenTime }}</span>
              </el-form-item>
              <el-form-item label="联系电话:">
                <span>{{ props.row.fd_sf_Phone }}</span>
              </el-form-item>
              <el-form-item label="是否有WAFI:">
                <span>{{ props.row.fd_sf_HasWafi }}</span>
              </el-form-item>
              <el-form-item label="供应商编码:">
                <span>{{ props.row.fd_sf_TradeID }}</span>
              </el-form-item>
              <el-form-item label="交通信息:">
                <span>{{ props.row.fd_sf_TransInfo }}</span>
              </el-form-item>
              <el-form-item label="介绍:">
                <span>{{ props.row.fd_sf_Introduce }}</span>
              </el-form-item>
              <el-form-item label="审核状态:">
                <span>{{ props.row.fd_sf_PassStatus }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="店面编号"
          prop="fd_sf_ID">
        </el-table-column>
        <el-table-column
          align="center"
          label="店面名称"
          prop="fd_sf_ProductName">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="apply(scope.row.fd_sf_ID)">{{scope.row.fd_sf_PassStatus}}
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

      <!--审核弹窗-->

      <el-dialog title="添加美食属性" :visible.sync="applyDialog">
        <el-form :model="applyOptions">

          <el-form-item label="审核状态:" :label-width="formLabelWidth">
            <el-select v-model="applyOptions.fd_sf_PassStatus" placeholder="请选择" @change="changeLoes">
              <el-option
                v-for="item in applyState"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="失败原因:" :label-width="formLabelWidth" v-show="showLose">
            <el-input v-model="applyOptions.fd_sf_FailedReason"></el-input>
          </el-form-item>

        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="applyDialog = false">取 消</el-button>
          <el-button type="primary" @click="applySubmit">确 定</el-button>
        </div>
      </el-dialog>

    </section>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    name: '',
    data() {
      return {
        addDialog: false,
        storeName: '',
        total: 0,
        isLoading: false,
        updateDialog: false,
        formLabelWidth: '120px',
        applyState: [
          {
            value: 0,
            label: '审核中'
          },
          {
            value: 1,
            label: '审核成功'
          },
          {
            value: 2,
            label: '审核失败'
          },
        ],
        applyOptions: {
          "fd_sf_ID": "",//店面编号
          "fd_sf_PassStatus": "",//审核  0审核中 1审核成功  2审核失败
          "fd_sf_FailedReason": ""//审核失败原因
        },
        applyDialog: false,
        showLose: false,
      }
    },
    computed: mapGetters([
      'initFoodReviewStoreInformationList',
    ]),
    created() {
      this.initData(name, 1)
    },
    methods: {
      //选择状态
      changeLoes(id) {
        if (id == 2) {
          this.showLose = true;
        } else {
          this.showLose = false;
        }
      },
      //分页
      handleCurrentChange(num) {
        this.initData(this.storeName, num)
      },
      //初始化数据
      initData(name, page) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "fd_sf_ProductName": name ? name : "",//产品名称 like
          "page": page ? page : "1",
          "rows": "10",
        };
        this.isLoading = true;
        this.$store.dispatch('initFoodReviewStoreInformation', options)
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
        this.initData(this.storeName, "1")
      },
      //审核
      apply(id) {
        this.$store.commit('setTranstionFalse');
        this.applyDialog = true;
        this.applyOptions.fd_sf_ID = id;
      },
      applySubmit() {
        let validateStoreFront = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "1",
          "operateUserName": "",
          "pcName": "",
          "fd_sf_ID": this.applyOptions.fd_sf_ID,//店面编号
          "fd_sf_PassStatus": this.applyOptions.fd_sf_PassStatus,//审核  0审核中 1审核成功  2审核失败
          "fd_sf_FailedReason": this.applyOptions.fd_sf_FailedReason//审核失败原因
        }
        this.$store.dispatch('applyFoodReviewStoreInformation',validateStoreFront)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData()
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
        this.applyDialog = false;
      }
    },
  }
</script>
<style scoped>

</style>


