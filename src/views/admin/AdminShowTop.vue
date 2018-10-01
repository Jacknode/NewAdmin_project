<template>
  <section id="wrap">
    <h1 class="userClass">供应商产品审核</h1>
    <el-col :span="24" class="formSearch">
      <el-form :inline="true">
        <el-form-item>
          <span>产品编码筛选:</span>
        </el-form-item>
        <el-form-item>
          <el-input v-model="options.ta_tg_ID" placeholder="请输入编号" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" size="small">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table
      :data="adminShowTopList"
      highlight-current-row
      v-loading="isLoading"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商户编号:">
              <span>{{ props.row.ta_tg_TradeID }}</span>
            </el-form-item>
            <el-form-item label="产品标题:">
              <!--<el-popover-->
              <!--ref="popover1"-->
              <!--placement="top-start"-->
              <!--trigger="hover"-->
              <!--:content="props.row.ta_tg_Title">-->
              <!--</el-popover>-->
              <!--<el-button v-popover:popover1 size="small">移入查看</el-button>-->
              <span>{{props.row.ta_tg_Title}}</span>
            </el-form-item>
            <el-form-item label="推荐价格:">
              <span>¥ {{ props.row.ts_tg_lowestPrice}}</span>
            </el-form-item>
            <el-form-item label="首页展示状态:">
              <span>{{ props.row.ts_tg_ShowTop | getShowTop}}</span>
            </el-form-item>
            <!--<el-form-item label="所属国家:">-->
            <!--<span>{{ props.row.ts_tg_Country }}</span>-->
            <!--</el-form-item>-->
            <el-form-item label="所属省市:">
              <span>{{ props.row.ts_tg_Provice + props.row.ts_tg_City}}</span>
            </el-form-item>
            <el-form-item label="产品类型:">
              <span>{{ props.row.ts_tg_Type | getTrandeType}}</span>
            </el-form-item>
            <el-form-item label="审核状态:">
              <span>{{ props.row.ts_tg_IsPass | getIsPass}}</span>
            </el-form-item>

            <el-form-item label="产品图片地址:">
              <img v-for="item,index in props.row.ta_tg_ShowImages" :src="item" alt="" :key="index" width="300"
                   height="150" @click="$seeImage">

            </el-form-item>
            <el-form-item label="产品创建时间:">
              <span>{{ props.row.ta_tg_CreateDateTime }}</span>
            </el-form-item>
            <el-form-item label="备注:">
              <!--<el-popover-->
              <!--ref="popover1"-->
              <!--placement="top-start"-->
              <!--trigger="hover"-->
              <!--:content="props.row.ta_tg_Remark">-->
              <!--</el-popover>-->
              <!--<el-button v-popover:popover1 size="small">移入查看</el-button>-->
              <span>{{props.row.ta_tg_Remark}}</span>
            </el-form-item>
            <!--<el-form-item label="是否展示首页:">-->
            <!--<span>{{ props.row.ts_tg_ShowTop==0?"否":"是" }}</span>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="是否精选:">-->
            <!--<span>{{ props.row.ts_tg_Special==0?"非精选":"精选" }}</span>-->
            <!--</el-form-item>-->
            <el-form-item label="跟团类型:">
              <span>{{ props.row.ts_tg_LongOut | getNewLongOut }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="产品编码"
        prop="ta_tg_ID">
      </el-table-column>
      <el-table-column
        label="产品标题"
        prop="ta_tg_Title">
      </el-table-column>
      <el-table-column
        label="创建时间"
        prop="ta_tg_CreateDateTime">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            v-show="scope.row.ts_tg_ShowTop!=1"
            @click="toExamine(scope.row)">审核
          </el-button>
          <span v-show="scope.row.ts_tg_ShowTop==1">已通过</span>
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
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    name: '',
    data(){
      return {
        isLoading:false,
        total:0,
        options:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "page": "1",
          "rows": "5",
          "ta_tg_ID": "",//推荐产品编码
        }
      }
    },
    computed: mapGetters([
      'adminShowTopList'
    ]),
    created(){
      this.initData()
    },
    methods: {
      //分页
      handleCurrentChange(num){
        this.initData(num)
      },
      //初始化数据
      initData(page){
        this.isLoading = true;
        this.options.page = page?page:1;
        this.$store.dispatch('initAdminShowTop',this.options)
        .then((total)=>{
          this.total = total
          this.isLoading = false;
        },err=>{
          this.isLoading = false;
          this.$notify({
            message: err,
            type: 'error'
          });
        })
      },
      //审核
      toExamine(obj){
        obj.ts_tg_ShowTop =1;
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": obj
        };
        this.$store.dispatch('UpdateAdminMerchantProducts', updateOptions)
        .then(() => {
          this.$notify({
            message: '审核成功!',
            type: 'success'
          });
          this.initData(1);
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          });
        });
      },
      //查询
      search(){
        this.initData()
      }
    },
  }
</script>
<style scoped>

</style>
