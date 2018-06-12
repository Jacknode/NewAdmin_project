<template>
  <div>
    <!--美食推荐店铺-->
    <section id="wrap">
      <h1 class="userClass">审核推荐店铺</h1>

      <!--数据展示-->
      <el-table
        :data="foodRecommendStoreTypeList"
        highlight-current-row
        v-loading="isLoading"
        style="width: 100%; margin-top: 20px;">
        <el-table-column
          align="center"
          label="推荐店面编码"
          prop="fd_is_ID">
        </el-table-column>
        <el-table-column
          align="center"
          label="店铺名称"
          prop="fd_sf_ProductName">
        </el-table-column>
        <el-table-column
          align="center"
          label="店铺介绍"
          prop="fd_sf_Introduce">
        </el-table-column>
        <el-table-column
          align="center"
          label="店铺图片"
          prop="fd_pi_ImageUrl"
        >
          <template slot-scope="scope">
            <img height="50" width="100" v-lazy="scope.row.fd_pi_ImageUrl" @click="bigImage(scope.row.fd_pi_ImageUrl)">
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="apply(scope.row.fd_is_ID)">{{scope.row.fd_is_PassState | getCheck}}
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
        :visible.sync="bigImageDialog"
        width="50%">
        <img v-lazy="imgUrl" width="100%">
        <span slot="footer" class="dialog-footer">
          <el-button @click="bigImageDialog = false">取 消</el-button>
        </span>
      </el-dialog>

      <!--审核-->

      <el-dialog title="审核推荐店面" :visible.sync="applyDialog">
        <el-form :model="applyOptions">
          <el-form-item label="推荐店面编码:" :label-width="formLabelWidth">
            <el-input v-model="applyOptions.fd_is_ID" :disabled="isDisabled"></el-input>
          </el-form-item>

          <el-form-item label="审核状态:" :label-width="formLabelWidth">
            <el-select v-model="applyOptions.fd_is_PassState" @change="changeType">
              <el-option
                v-for="item in statOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="失败原因:" :label-width="formLabelWidth" v-show="isLose">
            <el-input v-model="applyOptions.fd_is_FailedReason"></el-input>
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
    data() {
      return {
        statOptions: [
          {
            value: 1,
            label: '通过'
          },
          {
            value: 2,
            label: '未通过'
          }
        ],
        total: 0,
        isLoading: false,
        formLabelWidth: '120px',
        storeId: '',
        imgUrl: '',
        bigImageDialog: false,
        applyDialog: false,
        applyOptions: {
          "fd_is_ID": "",//推荐店面编码
          "fd_is_PassState": "",//审核通过状态  1通过 2未通过
          "fd_is_FailedReason": ""//审核失败原因
        },
        isDisabled: true,
        isLose: false,
      }
    },
    computed: mapGetters([
      'foodRecommendStoreTypeList',
    ]),
    created() {
      this.initData()
    },
    methods: {
      changeType(id) {
        if (id == 1) {
          this.isLose = false;
        } else {
          this.isLose = true;
        }
      },
      //分页
      handleCurrentChange(num) {
        this.initData(num)
      },
      //初始化数据
      initData(num) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "fd_is_ID": "",//推荐店面编码
          "fd_is_ShopID": "",//店面编号
          rows: 5,
          page: num ? num : 1
        };
        this.isLoading = true;
        this.$store.dispatch('initIntroduceShopInfo', options)
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
        this.initData()
      },
      //展示大图
      bigImage(urlData) {
        this.$store.commit('setTranstionFalse');
        this.bigImageDialog = true;
        this.imgUrl = urlData;
      },
      //审核
      apply(id) {
        this.$store.commit('setTranstionFalse');
        this.applyOptions.fd_is_ID = id;
        this.applyDialog = true;
      },
      //审核提交
      applySubmit() {
        let validateIntroduceShopInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "fd_is_ID": this.applyOptions.fd_is_ID,//推荐店面编码
          "fd_is_PassState": this.applyOptions.fd_is_PassState,//审核通过状态  1通过 2未通过
          "fd_is_FailedReason": this.applyOptions.fd_is_FailedReason//审核失败原因
        };
        this.$store.dispatch('applyStoreSubmit', validateIntroduceShopInfo)
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
        this.applyDialog = false;
      },
    }
  }
</script>
<style scoped>

</style>
