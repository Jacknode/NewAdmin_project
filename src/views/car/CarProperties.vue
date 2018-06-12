<!--<template>-->
  <!--<section id="wrap">-->
    <!--<h1 class="userClass">汽车属性</h1>-->
    <!--<el-col :span="24" class="formSearch">-->
      <!--<el-form :inline="true">-->
        <!--<el-form-item>-->
          <!--<span>汽车属性名称筛选:</span>-->
        <!--</el-form-item>-->
        <!--<el-form-item>-->
          <!--<el-input type="text" v-model="carName" auto-complete="off" placeholder="属性名称" size="small"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item>-->
          <!--<el-button type="primary" @click="search" size="small">查询</el-button>-->
          <!--<el-button type="primary" @click="Add" size="small">新增</el-button>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
    <!--</el-col>-->

    <!--&lt;!&ndash;数据展示&ndash;&gt;-->
    <!--<el-table-->
      <!--:data="carPropertiesList"-->
      <!--highlight-current-row-->
      <!--v-loading="isLoading"-->
      <!--style="width: 100%">-->
      <!--<el-table-column-->
        <!--align="center"-->
        <!--label="属性编号"-->
        <!--prop="cr_cra_Id">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--align="center"-->
        <!--label="属性名称"-->
        <!--prop="cr_cra_Name">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--align="center"-->
        <!--label="属性父名称"-->
        <!--prop="cr_cra_PName">-->
      <!--</el-table-column>-->
      <!--<el-table-column label="操作" align="center">-->
        <!--<template slot-scope="scope">-->
          <!--<el-button-->
            <!--size="mini"-->
            <!--type="primary"-->
            <!--@click="Update(scope.row)">修改-->
          <!--</el-button>-->
          <!--<el-button-->
            <!--size="mini"-->
            <!--type="danger"-->
            <!--@click="Delete(scope.row.cr_cra_Id)">删除-->
          <!--</el-button>-->
        <!--</template>-->
      <!--</el-table-column>-->
    <!--</el-table>-->


    <!--&lt;!&ndash;分页&ndash;&gt;-->
    <!--<div class="block" style="float: right;">-->
      <!--<el-pagination-->
        <!--@current-change="handleCurrentChange"-->
        <!--:page-size="10"-->
        <!--layout="total, prev, pager, next"-->
        <!--:total="total"-->
        <!--v-show="total"-->
      <!--&gt;-->
      <!--</el-pagination>-->
    <!--</div>-->

    <!--&lt;!&ndash;添加属性&ndash;&gt;-->
    <!--<el-dialog title="添加属性" :visible.sync="addDialog">-->
      <!--<el-form :model="addOptions">-->
        <!--<el-form-item label="推荐父属性选择:" :label-width="formLabelWidth">-->
          <!--<el-select v-model="addOptions.data.cr_car_PId" placeholder="请选择">-->
            <!--<el-option-->
              <!--v-for="item in carPropertiesAllList"-->
              <!--:key="item.cr_cra_Id"-->
              <!--:label="item.cr_cra_Name"-->
              <!--:value="item.cr_cra_Id">-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="属性名称:" :label-width="formLabelWidth">-->
          <!--<el-input v-model="addOptions.data.cr_cra_Name" placeholder="请输入属性名称"></el-input>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
      <!--<div slot="footer" class="dialog-footer">-->
        <!--<el-button @click="cancel">取 消</el-button>-->
        <!--<el-button type="primary" @click="addSubmit">确 定</el-button>-->
      <!--</div>-->
    <!--</el-dialog>-->

    <!--&lt;!&ndash;修改属性&ndash;&gt;-->
    <!--<el-dialog title="修改属性" :visible.sync="updateDialog">-->
      <!--<el-form :model="updateOptions">-->
        <!--<el-form-item label="推荐父属性选择:" :label-width="formLabelWidth">-->
          <!--<el-select v-model="updateOptions.cr_car_PId" placeholder="请选择">-->
            <!--<el-option-->
              <!--v-for="item in carPropertiesAllList"-->
              <!--:key="item.cr_cra_Id"-->
              <!--:label="item.cr_cra_Name"-->
              <!--:value="item.cr_cra_Id">-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="属性名称:" :label-width="formLabelWidth">-->
          <!--<el-input v-model="updateOptions.cr_cra_Name" placeholder="请输入属性名称"></el-input>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
      <!--<div slot="footer" class="dialog-footer">-->
        <!--<el-button @click="cancel">取 消</el-button>-->
        <!--<el-button type="primary" @click="updateSubmit">确 定</el-button>-->
      <!--</div>-->
    <!--</el-dialog>-->
  <!--</section>-->
<!--</template>-->
<!--<script>-->
  <!--import {mapGetters} from 'vuex'-->
  <!--export default{-->
    <!--name: '',-->
    <!--data(){-->
      <!--return {-->
        <!--carName:'',-->
        <!--total:0,-->
        <!--isLoading:false,-->
        <!--addDialog:false,-->
        <!--updateDialog:false,-->
        <!--formLabelWidth:'120px',-->
        <!--updateOptions:{},-->
        <!--addOptions:{-->
          <!--"loginUserID": "huileyou",-->
          <!--"loginUserPass": "123",-->
          <!--"operateUserID": "操作员编码",-->
          <!--"operateUserName": "操作员名称",-->
          <!--"pcName": "",-->
          <!--"data": {-->
            <!--"cr_cra_Name": "",//属性名称-->
            <!--"cr_car_PId": "",//属性父ID-->
          <!--}-->
        <!--}-->
      <!--}-->
    <!--},-->
    <!--computed: mapGetters([-->
      <!--'carPropertiesList',-->
      <!--'carPropertiesAllList'-->
    <!--]),-->
    <!--created(){-->
      <!--this.initData('',1)-->
      <!--this.initData('')-->
    <!--},-->
    <!--methods: {-->
      <!--//修改取消-->
      <!--cancel(){-->
        <!--this.initData('', 1);-->
        <!--this.addDialog = false;-->
        <!--this.updateDialog = false;-->
      <!--},-->
      <!--//分页-->
      <!--handleCurrentChange(num){-->
        <!--this.initData('',num)-->
      <!--},-->
      <!--initData(name,page){-->
        <!--let options = {-->
          <!--"loginUserID": "huileyou",-->
          <!--"loginUserPass": "123",-->
          <!--"operateUserID": "操作员编码",-->
          <!--"operateUserName": "操作员名称",-->
          <!--"pcName": "",-->
          <!--"cr_cra_Id": "",//属性编号-->
          <!--"cr_cra_Name": name?name:'',//属性名称-->
          <!--"cr_car_PId": "",//属性父ID-->
        <!--};-->
        <!--this.isLoading = true;-->
        <!--if(page){-->
          <!--options.page = page?page:1;-->
          <!--options.rows =  10;-->
          <!--this.$store.dispatch('initCarProperties',options)-->
          <!--.then(total=>{-->
            <!--this.total = total;-->
            <!--this.isLoading = false;-->
          <!--},err=>{-->
            <!--this.$notify({-->
              <!--message: err,-->
              <!--type: 'error'-->
            <!--});-->
          <!--})-->
        <!--}else{-->
          <!--options.cr_car_PId = 0;-->
          <!--this.$store.dispatch('initCarProperties',options)-->
          <!--.then(()=>{-->
            <!--this.isLoading = false;-->
          <!--},err=>{-->
            <!--this.$notify({-->
              <!--message: err,-->
              <!--type: 'error'-->
            <!--});-->
          <!--})-->
        <!--}-->
      <!--},-->
      <!--//查询-->
      <!--search(){-->
        <!--this.initData(this.carName,1)-->
      <!--},-->
      <!--Add(){-->
        <!--this.$store.commit('setTranstionFalse');-->
        <!--this.addDialog = true;-->
      <!--},-->
      <!--//添加提交-->
      <!--addSubmit(){-->
        <!--this.$store.dispatch('AddCarProperties',this.addOptions)-->
        <!--.then((suc)=>{-->
          <!--this.$notify({-->
            <!--message: suc,-->
            <!--type: 'success'-->
          <!--});-->
          <!--this.initData(this.carName,1)-->
        <!--},err=>{-->
          <!--this.$notify({-->
            <!--message: err,-->
            <!--type: 'error'-->
          <!--});-->
        <!--});-->
        <!--this.addDialog = false;-->
      <!--},-->
      <!--//修改-->
      <!--Update(obj){-->
        <!--this.updateOptions = obj;-->
        <!--this.$store.commit('setTranstionFalse');-->
        <!--this.updateDialog = true;-->
      <!--},-->
      <!--//修改提交-->
      <!--updateSubmit(){-->
        <!--let updateOptions = {-->
          <!--"loginUserID": "huileyou",-->
          <!--"loginUserPass": "123",-->
          <!--"operateUserID": "操作员编码",-->
          <!--"operateUserName": "操作员名称",-->
          <!--"pcName": "",-->
          <!--"data": {-->
            <!--"cr_cra_Id": this.updateOptions.cr_cra_Id,//属性编号-->
            <!--"cr_cra_Name": this.updateOptions.cr_cra_Name,//属性名称-->
            <!--"cr_car_PId": this.updateOptions.cr_car_PId,//属性父ID-->
          <!--}-->
        <!--};-->
        <!--this.$store.dispatch('UpdateCarProperties',updateOptions)-->
        <!--.then((suc)=>{-->
          <!--this.$notify({-->
            <!--message: suc,-->
            <!--type: 'success'-->
          <!--});-->
          <!--this.initData('',1)-->
        <!--},err=>{-->
          <!--this.$notify({-->
            <!--message: err,-->
            <!--type: 'error'-->
          <!--});-->
        <!--});-->
        <!--this.updateDialog = false;-->
      <!--},-->
      <!--//删除-->
      <!--Delete(id){-->
        <!--let deleteOptions = {-->
          <!--"loginUserID": "huileyou",-->
          <!--"loginUserPass": "123",-->
          <!--"operateUserID": "",-->
          <!--"operateUserName": "",-->
          <!--"pcName": "",-->
          <!--"data": {-->
            <!--"cr_cra_Id": id//属性编号-->
          <!--}-->
        <!--};-->
        <!--this.$store.dispatch('DeleteCarProperties',deleteOptions)-->
        <!--.then((suc)=>{-->
          <!--this.$notify({-->
            <!--message: suc,-->
            <!--type: 'success'-->
          <!--});-->
          <!--this.initData('',1)-->
        <!--},err=>{-->
          <!--this.$notify({-->
            <!--message: err,-->
            <!--type: 'error'-->
          <!--});-->
        <!--});-->
      <!--}-->
    <!--},-->
  <!--}-->
<!--</script>-->
<!--<style scoped>-->

<!--</style>-->
