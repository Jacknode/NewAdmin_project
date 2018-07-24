<template>
  <div>
    <section id="wrap">
      <h1 class="userClass">审核景点</h1>
      <!--查询-->
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <span>审核状态筛选:</span>
          </el-form-item>
          <el-form-item>
            <el-select v-model="toExamineID" placeholder="请选择审核状态" size="small">
              <el-option
                v-for="item in isPass"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="ticketName" placeholder="请输入景点名称" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search" size="small">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--数据展示-->
      <el-table
        :data="scenicSpotList"
        v-loading="isLoading"
        style="width: 100%; margin-top: 20px;">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="景点编码(主键):">
                <span>{{ props.row.tm_ts_Code }}</span>
              </el-form-item>
              <el-form-item label="景点名称:">
                <span>{{ props.row.tm_ts_Name }}</span>
              </el-form-item>
              <el-form-item label="主题名称:">
                <span>{{ props.row.tm_ts_ThemeTypeID }}</span>
              </el-form-item>
              <el-form-item label="预订须知编号:">
                <span>{{ props.row.tm_bk_ID }}</span>
              </el-form-item>
              <el-form-item label="票种编号:">
                <span>{{ props.row.tm_tm_ID }}</span>
              </el-form-item>
              <el-form-item label="洲:">
                <span>{{ props.row.tm_ts_GreatName }}</span>
              </el-form-item>
              <el-form-item label="国:">
                <span>{{ props.row.tm_ts_CountrieName }}</span>
              </el-form-item>
              <el-form-item label="省:">
                <span>{{ props.row.tm_ts_ProviceName }}</span>
              </el-form-item>
              <el-form-item label="市:">
                <span>{{ props.row.tm_ts_CityName }}</span>
              </el-form-item>
              <el-form-item label="县:">
                <span>{{ props.row.tm_ts_ContryName }}</span>
              </el-form-item>
              <el-form-item label="展示图片:">
                <img v-for="item,index in props.row.tm_ts_ShowImage" :src="item" width="300" height="150"
                     style="margin-top: 10px;">
              </el-form-item>
              <el-form-item label="介绍:">
                <span>{{ props.row.tm_ts_Introduce }}</span>
              </el-form-item>
              <el-form-item label="详细介绍:">
                <span>{{ props.row.tm_ts_Detailedintroduction }}</span>
              </el-form-item>
              <el-form-item label="详细地址:">
                <span>{{ props.row.tm_ts_Address }}</span>
              </el-form-item>
              <el-form-item label="开放时间:">
                <span>{{ props.row.tm_ts_Opentime }}</span>
              </el-form-item>
              <el-form-item label="建议游玩时间:">
                <span>{{ props.row.tm_ts_Time }}</span>
              </el-form-item>
              <el-form-item label="联系电话号码:">
                <span>{{ props.row.tm_ts_Phone }}</span>
              </el-form-item>
              <el-form-item label="经度:">
                <span>{{ props.row.tm_ts_Longitude }}</span>
              </el-form-item>
              <el-form-item label="纬度:">
                <span>{{ props.row.tm_ts_Latitude }}</span>
              </el-form-item>
              <el-form-item label="是否热门景点:">
                <span>{{ props.row.tm_ts_IsHot }}</span>
              </el-form-item>
              <el-form-item label="是否境外景点:">
                <span>{{ props.row.tm_ts_IsOversea }}</span>
              </el-form-item>
              <el-form-item label="是否当季精选:">
                <span>{{ props.row.tm_ts_IsSeasonChoice }}</span>
              </el-form-item>
              <el-form-item label="建议价格:">
                <span>{{ props.row.tm_ts_SuggestPrice }}元</span>
              </el-form-item>
              <el-form-item label="创建时间:">
                <span>{{ props.row.tm_ts_CreateTime }}</span>
              </el-form-item>
              <el-form-item label="备注:">
                <span>{{ props.row.tm_ts_Remark }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="景点名称"
          prop="tm_ts_Name">
        </el-table-column>
        <el-table-column
          label="联系电话号码"
          prop="tm_ts_Phone">
        </el-table-column>
        <el-table-column label="操作" align="center" style="width: 1000px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="look(scope.row.tm_ts_Code)">查看审核状态
            </el-button>
            <el-button
              size="mini"
              @click="toExamineS(scope.row.tm_ts_Code)"
              v-show="scope.row.tm_ts_IsPass == 0"
            >审核此景点
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--审核弹窗-->

      <el-dialog title="审核弹窗" :visible.sync="toExamineDialog">
        <el-form :model="toExamine">
          <el-form-item label="审核状态:" :label-width="formLabelWidth">
            <el-select v-model="toExamine.tm_ts_IsPass" placeholder="请选择审核状态" @change="showReason">
              <el-option
                v-for="item in isPass"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审核失败原因:" :label-width="formLabelWidth" v-show="isShow">
            <el-input v-model="toExamine.tm_ts_FailReason"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="toExamineDialog = false">取 消</el-button>
          <el-button type="primary" @click="toExamineSubmit">确 定</el-button>
        </div>
      </el-dialog>

      <!--分页-->

      <div class="block" style="text-align: right">
        <el-pagination
          :page-size="10"
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="total">
        </el-pagination>
      </div>

    </section>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: mapGetters([
      'scenicSpotList'
    ]),
    data() {
      return {
        toExamineID: '',
        ticketName: '',
        isLoading: false,
        isPass: [
          {
            value: 0,
            label: '审核中'
          },
          {
            value: 1,
            label: '通过审核'
          },
          {
            value: 2,
            label: '未通过审核'
          }
        ],
        toExamineDialog: false,
        formLabelWidth: '120px',
        toExamine: {
          "tm_ts_Code": "",
          "tm_ts_IsPass": "",
          "tm_ts_FailReason": ""
        },
        isShow: false,
        total: 0,
      }
    },
    methods: {
//      分页
      handleCurrentChange(num) {
        this.initData(num)
      },
      //初始化景点数据
      initData(num) {
        let getTourSite = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "tm_ts_Code": "",    //景点编码
          "tm_ts_Name": this.ticketName ? this.ticketName : '',//景点名称
          "tm_ts_TradeInfoID": "",//供应商编码
          "tm_ts_IsDelete": 0,//必须传
          "tm_ts_IsPass": this.toExamineID ? this.toExamineID : '',//是否通过审核(0审核中1通过审核2未通过审核)
          "tm_ts_ShowTop": "",//是否展示首页（0否，1是）
          "tm_ts_IsHot": "",//是否热门景点（0普通1热门)
          "tm_ts_ThemeTypeID": "",//主题编码
          "page": num ? num : 1,
          "rows": 10
        };
        if (this.toExamineID == 0) {
          getTourSite.tm_ts_IsPass = 0
        }
        this.isLoading = true;
        this.$store.dispatch('initScenicSpot', getTourSite)
          .then(total => {
            this.isLoading = false;
            this.total = total
          })
      },
//      搜索
      search() {
        this.initData()
      },
      //查看
      look(id) {
        let selectIsPass = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "tm_ts_Code": id
        };
        this.$store.dispatch('ticketLookToExamine', selectIsPass)
          .then(information => {
            this.$alert(information, {
              confirmButtonText: '确定'
            });
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },
      //审核
      toExamineS(id) {
        this.$store.commit('setTranstionFalse');
        this.toExamine.tm_ts_Code = id;
        this.toExamineDialog = true;
      },
      showReason() {
        if (this.toExamine.tm_ts_IsPass == 2) {
          this.isShow = true;
        } else {
          this.isShow = false;
        }
      },
      //审核提交
      toExamineSubmit() {
        let isPassValidate = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "tm_ts_Code": this.toExamine.tm_ts_Code,
          "tm_ts_IsPass": this.toExamine.tm_ts_IsPass,
          "tm_ts_FailReason": this.toExamine.tm_ts_FailReason,
        };
        this.$store.dispatch('toExamineSubmit', isPassValidate)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.toExamine.tm_ts_IsPass = '';
            this.initData();
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
        this.toExamineDialog = false;
      },
    },
    created() {
      this.initData();
    },
  }
</script>
<style scoped>
</style>
