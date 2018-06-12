<template>
<div>
  <div class="navbar navbar-inverse">
    <div class="navbar-header">
      <a class="navbar-brand" href="javascript:;">惠乐游后台管理系统</a>
      <ul class="nav navbar-nav visible-xs-block">
        <li><a data-toggle="collapse" data-target="#navbar-mobile"><i class="icon-tree5"></i></a></li>
        <li><a class="sidebar-mobile-main-toggle"><i class="icon-paragraph-justify3"></i></a></li>
      </ul>
    </div>
    <div class="navbar-collapse collapse" id="navbar-mobile">
      <ul class="nav navbar-nav">
        <li><a class="sidebar-control sidebar-main-toggle hidden-xs"><i class="icon-paragraph-justify3"></i></a></li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li class="dropdown dropdown-user">
          <a class="dropdown-toggle" data-toggle="dropdown">
            <!--<img src="assets/images/placeholder.jpg" alt="">-->
            <span>管理员</span>
            <i class="caret"></i>
          </a>
          <ul class="dropdown-menu dropdown-menu-right">
            <li @click="getUser"><a href="javascript:;"><i class="icon-user-plus"></i>{{qiankeUser?qiankeUser:''}}</a>
            </li>
            <li @click="Quit"><a href="javascript:;"><i class="icon-switch2"></i>退出</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
  <!-- /main navbar -->
  <el-container>
    <el-aside width="200px">
      <span style="background: #28343a;display: block;width: 199px;color: #fff;line-height: 60px;text-align: center;">欢迎您:{{qiankeUser?qiankeUser:''}}</span>
      <!-- 导航-->
      <el-menu
        default-active="1"
        :unique-opened="true"
        class="el-menu-vertical-demo"
        background-color="#28343a"
        text-color="rgba(255,255,255,0.75)"
        :router="true"
        active-text-color="#ffd04b">
        <el-submenu index="1">
          <template slot="title">
            <link href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
            <i class="fa fa-money"></i>

            <span>利润管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/home/adminVendorProfit">供应商利润管理</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/home/adminAgentsProfit">代理商利润管理</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/home/adminHuileyouReturn">惠乐游收益管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="fa fa-user-o"></i>
            <span>审核管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/home/adminAgents">代理商信息审核管理</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/home/adminSupplier">供应商信息审核管理</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/home/adminProductAudit">供应商产品审核管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="fa fa-gift"></i>
            <span>积分管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/home/adminIntegralWeight">积分权重管理</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/home/adminIntegralType">积分类型管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="icon-twitter"></i>
            <span>广告管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/home/adType">广告类型</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/home/adChargeWay">广告收费方式</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/home/adTypeChargeMode">广告类型收费方式</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/home/adPosition">广告位置</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/home/adApply">广告申请</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="5">
        <template slot="title">
          <i class="icon-ticket"></i>
          <span>门票管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/home/ticketTheme">门票主题管理</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/home/ticketToExamine">门票审核景点</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/home/ticketToExamineShowHomePage">门票审核景点展示首页</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/home/ticketHomePageBigPicture">门票首页显示大图</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/home/ticketHomePageSmallPicture">门票首页显示小图</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
        <el-submenu index="6">
          <template slot="title">
            <i class="fa fa-hotel"></i>
            <span>酒店管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/home/hotelImageType">酒店图片类型管理</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/home/hotelRecommendType">酒店推荐类型管理</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/home/hotelThemeCategory">酒店主题类别管理</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/home/hotelFacilities">酒店设施管理</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/home/hotelRoomFacilities">酒店房间设施管理</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/home/hotelIconGallery">酒店图标库管理</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/home/hotelFacilitiesType">酒店设施类型管理</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/home/hotelRoomFacilitiesType">酒店房间设施类型管理</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
          <el-menu-item index="/home/hotelCityRecommendType">酒店城市推荐类型管理</el-menu-item>
          </el-menu-item-group>



        </el-submenu>
        <el-submenu index="7">
          <template slot="title">
            <i class="fa fa-cutlery"></i>
            <span>美食管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/home/foodRecommendStoreType">美食推荐店铺管理</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/home/foodAttributeListType">美食属性表管理</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/home/foodReviewStoreInformation">美食审核店面信息管理</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/home/foodHomePagePicture">美食首页展示图片管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="8">
          <template slot="title">
            <i class="fa fa-car"></i>
            <span>租车管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/home/carRent">租车汽车管理</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/home/carProperties">租车属性管理</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/home/carCityLandmarks">租车城市地标管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="9">
        <template slot="title">
          <i class="fa fa-film"></i>
          <span>微电影管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/home/movieReview">微电影审核管理</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/home/movieType">微电影类型管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
        <el-submenu index="10">
          <template slot="title">
            <i class="fa fa-cloud-upload"></i>
            <span>上传App</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/home/uploadApp">上传管理</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/home/demo">上传demo</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
     </el-aside>
    <!-- /main sidebar  左边导航栏结束-->
    <!--右边内容-->
     <el-main>
       <div class="content-wrapper">

         <div class="content"
              :class="{ 'animated': transtionActive.isActive, 'fadeIn': transtionActive.isRotateInDownRight }">
           <!-- Page length options -->
           <!-- /page length options -->
           <router-view name="User"></router-view>

           <!-- Footer -->
           <!--<div class="footer text-muted">-->
           <!--&copy; 2015. <a href="#">Limitless Web App Kit</a> by <a href="http://themeforest.net/user/Kopyov" target="_blank">Eugene Kopyov</a>-->
           <!--</div>-->
           <!-- /footer -->
         </div>
       </div>
    </el-main>
  </el-container>
</div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    name: '',
    data(){
      return {
        qiankeUser: '',
//        isAdmin:true
      }
    },
    computed: mapGetters([
      'transtionActive',
      'hotelRecommendTypeAllList',
      'hotelFacilitiesTypeAllList'
    ]),
    created(){
      if (!sessionStorage.getItem('index')) {
        sessionStorage.setItem('index', '0')
      }
      if(!this.hotelRecommendTypeAllList.length||!this.hotelFacilitiesTypeAllList.length){
        this.initData().then(()=>{
        },err=>{
          this.$notify({
            message: err,
            type: 'error'
          });
        })
      }


//      //初始化跟团游栏目
//      this.$store.dispatch('initGroupTour',options)
    },
    mounted(){
      let user = JSON.parse(sessionStorage.getItem('admin'));
      if (!user) {
        this.$router.push({name: 'Login'})
      }
      this.qiankeUser = user.sm_mr_Name;

      //跟团游栏目
      let AdminOptions = {
        "loginUserID": "huileyou",
        "loginUserPass": "123",
        "operateUserID": "",
        "operateUserName": "",
        "pcName": "",
        isDelete: '0',
        groupName: ''
      };
//      this.$store.dispatch('initHomeAdminGroupTour', AdminOptions)
    },
    watch: {
      '$route' (to, from) {
//        this.$store.commit('clearData')
//        if (to.path == '/home/adminAllFunction2') {
//          this.$router.push({name: 'AdminBusinessInformation'})
//        }
        // 对路由变化作出响应...
        if (this.transtionActive.isActive && this.transtionActive.isRotateInDownRight) {
          this.$store.commit('setTranstionFalse')
        }
        setTimeout(() => {
          this.$store.commit('oPTranstionFalse')
        }, 10)
      }
    },
    methods: {
      async initData(){
        //推荐类型所有
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "ht_it_ID": "",//推荐类型ID
          "ht_it_Name": "",//推荐类型名称
          "ht_it_ParentID": "",//推荐类型父ID
        };
        await this.$store.dispatch('initHotelRecommendTypeAll',options)

        //设施类型
        let optionsType = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "ht_ht_ID": "",//设施类型Id
          "ht_ht_Name":'',//设施类型名称
          page:1,
          rows:50
        };
        await this.$store.dispatch('initHotelFacilitiesTypeAll',optionsType)

        //房间设施类型所有
        let roomOptionsType = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "ht_rht_ID": "",//房间设施类型ID
          "ht_rht_Name": "",//类型名称
        }
        await this.$store.dispatch('initHotelRoomFacilitiesTypeAll',roomOptionsType)

//        let newOptions = {
//          "loginUserID": "huileyou",
//          "loginUserPass": "123",
//          "operateUserID": "",
//          "operateUserName": "",
//          "pcName": "",
//          //"sm_hm_ID": 1,
//          //"sm_hm_HeightName": "",
//          "sm_hm_IsDelete": 0
//        }
//        await this.$store.dispatch('initAdminIntegralWeight',newOptions)

      },
      //退出
      Quit(){
        this.$router.push({name: 'Login'})
      },
      //用户信息
      getUser(){
        this.$router.push({name: 'AdminBusinessInformation'})
      },

    }
  }
</script>
<style>
  .navbar-inverse{
    background-color: #28343a;
    border-color:#28343a;
  }
  .navbar{
    margin-bottom: 0;
    border-radius: 0;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 1400px;
  }
  .el-main{
    padding: 0;
  }
  .el-loading-spinner .circular {
    /*margin-left: 50%;*/
  }

  .edui-default {
    z-index: 3000 !important;
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  #wrap {
    overflow: hidden;
    background: #fff;
  }

  .formSearch {
    padding: 20px 0 0 20px;
  }

  .userClass {
    padding: 20px 0 0 20px;
    font-size: 18px;
  }

  .file {
    position: relative;
    display: inline-block;
    background: #409EFF;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #fff;
    text-decoration: none;
    text-indent: 0;
    font-size: 12px;
    line-height: 20px;
  }

  .file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
  }
</style>
