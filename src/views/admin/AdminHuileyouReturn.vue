<template>
  <div id="wrap" class="clearfix">
    <h1 class="userClass">惠乐游收益</h1>

    <!--数据展示-->
    <el-table
      :data="adminHuileyouReturnList"
      highlight-current-row
      v-loading="isLoading"
      show-summary
      :summary-method="getSummaries"
      style="width: 100%;padding-top: 50px">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="订单号:">
              <span>{{props.row.ts_to_OrderID }}</span>
            </el-form-item>
            <el-form-item label="下单时间:">
              <span>{{props.row.ts_to_PayTime | getUseTime }}</span>
            </el-form-item>
            <el-form-item label="订单利润:">
              <span>{{props.row.orderIncome }}元</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="供应商编号"
        align="center">
        <template slot-scope="props">
          <span>{{props.row.agentInfoID}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="订单价格"
        align="center"
        prop="ts_to_SumPrice"
      >
        <!--<template slot-scope="props">-->
        <!--<span>{{props.row.ts_to_SumPrice}}元</span>-->
        <!--</template>-->
      </el-table-column>

      <el-table-column
        label="供应商提成比例"
        align="center"
      >
        <template slot-scope="props">
          <span>{{props.row.agentFee}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="供应商获利"
        align="center"
        prop="orderfeePrice"
      >
        <!--<template slot-scope="props">-->
        <!--<span>{{props.row.orderfeePrice}}元</span>-->
        <!--</template>-->
      </el-table-column>
      <el-table-column
        label="代理商提成比例"
        align="center"
      >
        <template slot-scope="props">
          <span>{{props.row.proxyFee}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="代理商获利"
        align="center"
        prop="proxySumPrice"
      ></el-table-column>
      <el-table-column
        label="惠乐游获利"
        align="center"
        prop="huileyouSumPrice"
      ></el-table-column>
      <!--<el-table-column-->
        <!--label="下单时间"-->
        <!--align="center"-->
      <!--&gt;-->
        <!--<template slot-scope="props">-->
          <!--<span>{{props.row.ts_to_PayTime | getUseTime}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column label="操作">-->
      <!--<template slot-scope="scope">-->
      <!--<el-button-->
      <!--size="mini"-->
      <!--type="primary"-->
      <!--@click="updateAdminUserInfo(scope.row.agentInfoID)">修改-->
      <!--</el-button>-->
      <!--</template>-->
      <!--</el-table-column>-->
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
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    name: '',
    data(){
      return {
        total:0,
        isLoading:false,
        id:''
      }
    },
    computed: mapGetters([
      'adminHuileyouReturnList'
    ]),
    created(){
      let userInfo = JSON.parse(sessionStorage.getItem('admin'))
      if(!userInfo){
        this.$router.push({name:'Login'})
        return
      }
//      this.id = userInfo.sm_pi_ProxyInfoID
      this.initData(1)
    },
    methods: {
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = 'N/A';
          }
        });
        return sums;
      },
      //初始化
      initData(page){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "agentType": "0",     //查询指定供应商类型下的订单
          "balanceState": "",//结算状态
          "agentID": "",//供应商编码
          //"proxyID": "18111729770"//代理商编码
          "page": page?page:1,
          "rows": 5
        }
        this.isLoading = true;
        this.$store.dispatch('initAdminHuileyouReturn',options)
        .then(total => {
          this.total = total;
          this.isLoading = false
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          });
          this.isLoading = false
        })
      },
      //分页
      handleCurrentChange(num){
        this.initData(num)
      }
    },
  }
</script>
<style scoped>

</style>
