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


    <!-- Page container -->
    <div class="page-container">

      <!-- Page content -->
      <div class="page-content">

        <!-- Main sidebar 左边导航栏开始-->
        <div class="sidebar sidebar-main">
          <div class="sidebar-content">

            <!-- User menu -->
            <div class="sidebar-user">
              <div class="category-content">
                <div class="media">
                  <a href="javascript:;" class="media-left">
                    <!--<img src="assets/images/placeholder.jpg" class="img-circle img-sm" alt="">-->
                  </a>
                  <div class="media-body">
                    <span class="media-heading text-semibold">欢迎您:{{qiankeUser?qiankeUser:''}}</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- /user menu -->


            <!-- Main navigation -->
            <div class="sidebar-category sidebar-category-visible">
              <div class="category-content no-padding">

                <!-------------------------------------管理员------------------------------------------------------>


                <ul class="navigation navigation-main navigation-accordion">
                  <!-- Main -->
                  <li class="navigation-header"><span>Main</span> <i class="icon-menu" title="Main pages"></i></li>
                  <!--境外查询-->
                  <li>
                    <a href="javascript:;"><i class=" icon-home"></i> <span>利润管理</span></a>
                    <ul>

                      <li>
                        <router-link to="/home/adminVendorProfit">供应商利润管理</router-link>
                      </li>
                      <li>
                        <router-link to="/home/adminAgentsProfit">代理商利润管理</router-link>
                      </li>
                      <li>
                        <router-link to="/home/adminHuileyouReturn">惠乐游收益管理</router-link>
                      </li>
                      <!--<li>-->
                        <!--<router-link to="/home/adminGroupTour">跟团游栏目管理</router-link>-->
                      <!--</li>-->
                      <!--<li>-->
                        <!--<router-link to="/home/adminBusinessLicense">商户营业执照管理</router-link>-->
                      <!--</li>-->
                      <!--<li>-->
                        <!--<router-link to="/home/adminProductMenu">产品线路总菜单</router-link>-->
                      <!--</li>-->
                      <!--<li>-->
                        <!--<router-link to="/home/adminSystemMenu">系统菜单管理</router-link>-->
                      <!--</li>-->
                      <!--<li>-->
                      <!--<router-link to="/home/adminCommentsType">评论类型管理</router-link>-->
                      <!--</li>-->
                    </ul>
                  </li>
                  <li>
                    <a href="javascript:;"><i class="icon-shield-check"></i> <span>审核管理</span></a>
                    <ul>
                      <li>
                        <router-link to="/home/adminAgents">代理商信息审核管理</router-link>
                      </li>
                      <li>
                        <router-link to="/home/adminSupplier">供应商信息审核管理</router-link>
                      </li>
                      <li>
                        <router-link to="/home/adminProductAudit">供应商产品审核管理</router-link>
                      </li>
                    </ul>
                  </li>
                  <!-- /main -->
                  <li>
                    <a href="javascript:;"><i class=" icon-droplet"></i> <span>积分管理</span></a>
                    <ul>
                      <li>
                        <router-link to="/home/adminIntegralWeight">积分权重管理</router-link>
                      </li>
                      <li>
                        <router-link to="/home/adminIntegralType">积分类型管理</router-link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="javascript:;"><i class="icon-twitter"></i> <span>广告管理</span></a>
                    <ul>
                      <li>
                        <router-link to="/home/adType">广告类型</router-link>
                      </li>
                      <li>
                        <router-link to="/home/adChargeWay">广告收费方式</router-link>
                      </li>
                      <li>
                        <router-link to="/home/adTypeChargeMode">广告类型收费方式</router-link>
                      </li>
                      <li>
                        <router-link to="/home/adPosition">广告位置</router-link>
                      </li>
                      <li>
                        <router-link to="/home/adApply">广告申请</router-link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="javascript:;"><i class="icon-ticket"></i> <span>门票管理</span></a>
                    <ul>
                      <li>
                        <router-link to="/home/ticketTheme">门票主题管理</router-link>
                      </li>
                      <li>
                        <router-link to="/home/ticketToExamine">门票审核景点</router-link>
                      </li>
                      <li>
                        <router-link to="/home/ticketToExamineShowHomePage">门票审核景点展示首页</router-link>
                      </li>
                      <li>
                        <router-link to="/home/ticketHomePageBigPicture">门票首页显示大图</router-link>
                      </li>
                      <li>
                        <router-link to="/home/ticketHomePageSmallPicture">门票首页显示小图</router-link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="javascript:;"><i class="icon-people"></i> <span>酒店管理</span></a>
                    <ul>
                      <li>
                        <router-link to="/home/hotelImageType">酒店图片类型管理</router-link>
                      </li>
                      <li>
                        <router-link to="/home/hotelRecommendType">酒店推荐类型管理</router-link>
                      </li>
                      <li>
                        <router-link to="/home/hotelThemeCategory">酒店主题类别管理</router-link>
                      </li>
                      <li>
                        <router-link to="/home/hotelFacilities">酒店设施管理</router-link>
                      </li>
                      <li>
                        <router-link to="/home/hotelRoomFacilities">酒店房间设施管理</router-link>
                      </li>
                      <li>
                        <router-link to="/home/hotelIconGallery">酒店图标库管理</router-link>
                      </li>
                      <li>
                        <router-link to="/home/hotelFacilitiesType">酒店设施类型管理</router-link>
                      </li>
                      <li>
                        <router-link to="/home/hotelRoomFacilitiesType">酒店房间设施类型管理</router-link>
                      </li>
                      <li>
                        <router-link to="/home/hotelCityRecommendType">酒店城市推荐类型管理</router-link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="javascript:;"><i class="icon-coin-yen"></i> <span>美食管理</span></a>
                    <ul>
                      <li>
                        <router-link to="/home/foodRecommendStoreType">美食推荐店铺管理</router-link>
                      </li>
                      <li>
                        <router-link to="/home/foodAttributeListType">美食属性表管理</router-link>
                      </li>
                      <li>
                        <router-link to="/home/foodReviewStoreInformation">美食审核店面信息管理</router-link>
                      </li>
                      <li>
                        <router-link to="/home/foodHomePagePicture">美食首页展示图片管理</router-link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="javascript:;"><i class="icon-ticket"></i> <span>租车管理</span></a>
                    <ul>
                      <li>
                        <router-link to="/home/carRent">租车汽车管理</router-link>
                      </li>
                      <li>
                        <router-link to="/home/carProperties">租车属性管理</router-link>
                      </li>
                      <li>
                        <router-link to="/home/carCityLandmarks">租车城市地标管理</router-link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="javascript:;"><i class="icon-ticket"></i> <span>微电影管理</span></a>
                    <ul>
                      <li>
                        <router-link to="/home/movieReview">微电影审核管理</router-link>
                      </li>
                      <li>
                        <router-link to="/home/movieType">微电影类型管理</router-link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="javascript:;"><i class="icon-ticket"></i> <span>上传App</span></a>
                    <ul>
                      <li>
                        <router-link to="/home/uploadApp">上传管理</router-link>
                      </li>
                      <li>
                        <router-link to="/home/demo">上传demo</router-link>
                      </li>
                      <li>
                        <router-link to="/home/demo1">测试</router-link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <!-- /main navigation-->

          </div>
        </div>
        <!-- /main sidebar  左边导航栏结束-->
        <!--右边内容-->
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
        <!--右边内容结束-->
        <!-- /dashboard content -->


        <!-- Footer -->
        <div class="footer text-muted">

        </div>
        <!-- /footer -->

      </div>
      <!-- /content area -->

    </div>
    <!-- /main content -->

  </div>
  <!-- /page content -->
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
  .el-loading-spinner .circular {
    margin-left: 50%;
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
