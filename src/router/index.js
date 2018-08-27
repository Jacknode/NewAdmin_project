// import Vue from 'vue'
// import Router from 'vue-router'

Vue.use(VueRouter)
const _import = require('./_import_' + process.env.NODE_ENV);

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading


/* Layout */
import Layout from '../views/layout/Layout';

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  { path: '/login',name:'Login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  {path: '/404', component: () => import('@/views/404'), hidden: true},
  { path: '/', component: _import('login/index'), hidden: true },
  /**
   *  首页
   **/
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component:  () => import('@/views/dashboard'),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
    }]
  },
  /**
   * 利润管理
   */
  {
    path: '/admin',
    component: Layout,
    name: 'Admin',
    // hidden:true,
    // alwaysShow: true,
    meta: {title: 'admin', icon: 'profit'},
    children: [
      {
        path: 'adminVendorProfit',
        name: 'AdminVendorProfit',
        component: () => import('@/views/admin/AdminVendorProfit'),
        meta: {title: 'adminVendorProfit'}
      },
      // {
      //   path: 'adminAgentsProfit',
      //   name: 'AdminAgentsProfit',
      //   component: () => import('@/views/admin/AdminAgentsProfit'),
      //   meta: {title: 'adminAgentsProfit'}
      // },{
      //   path: 'adminHuileyouReturn',
      //   name: 'AdminHuileyouReturn',
      //   component: () => import('@/views/admin/AdminHuileyouReturn'),
      //   meta: {title: 'adminHuileyouReturn'}
      // },

    ]
  },
  /**
   * 审核管理
   */
  {
    path: '/audit',
    component: Layout,
    name: 'Audit',
    // hidden:true,
    // alwaysShow: true,
    meta: {title: 'audit', icon: 'Audit'},
    children: [
      // {
      //   path: 'adminAgents',
      //   name: 'AdminAgents',
      //   component: () => import('@/views/admin/AdminAgents'),
      //   meta: {title: 'adminAgents'}
      // },
      {
        path: 'adminSupplier',
        name: 'AdminSupplier',
        component: () => import('@/views/admin/AdminSupplier'),
        meta: {title: 'adminSupplier'}
      },{
        path: 'adminProductAudit',
        name: 'AdminProductAudit',
        component: () => import('@/views/admin/AdminProductAudit'),
        meta: {title: 'adminProductAudit'}
      },

    ]
  },
  /**
   * 积分管理
   */
  {
    path: '/integral',
    component: Layout,
    name: 'Integral',
    // hidden:true,
    // alwaysShow: true,
    meta: {title: 'integral', icon: 'integral'},
    children: [
      {
        path: 'adminIntegralWeight',
        name: 'AdminIntegralWeight',
        component: () => import('@/views/admin/AdminIntegralWeight'),
        meta: {title: 'adminIntegralWeight'}
      },{
        path: 'adminIntegralType',
        name: 'AdminIntegralType',
        component: () => import('@/views/admin/AdminIntegralType'),
        meta: {title: 'adminIntegralType'}
      }
    ]
  },
  /**
   * 广告管理
   */
  {
    path: '/advertisement',
    component: Layout,
    name: 'Advertisement',
    // hidden:true,
    // alwaysShow: true,
    meta: {title: 'advertisement', icon: 'advertising'},
    children: [
      {
        path: 'adType',
        name: 'AdType',
        component: () => import('@/views/Advertisements/AdType'),
        meta: {title: 'adType'}
      },{
        path: 'adChargeWay',
        name: 'AdChargeWay',
        component: () => import('@/views/Advertisements/AdChargeWay'),
        meta: {title: 'adChargeWay'}
      },{
        path: 'adTypeChargeMode',
        name: 'AdTypeChargeMode',
        component: () => import('@/views/Advertisements/AdTypeChargeMode'),
        meta: {title: 'adTypeChargeMode'}
      },{
        path: 'adPosition',
        name: 'AdPosition',
        component: () => import('@/views/Advertisements/AdPosition'),
        meta: {title: 'adPosition'}
      },{
        path: 'adApply',
        name: 'AdApply',
        component: () => import('@/views/Advertisements/AdApply'),
        meta: {title: 'adApply'}
      }
    ]
  },
  /**
   * 门票管理
   */
  {
    path: '/ticket',
    component: Layout,
    name: 'Ticket',
    // hidden:true,
    // alwaysShow: true,
    meta: {title: 'ticket', icon: 'ticket'},
    children: [
      {
        path: 'ticketTheme',
        name: 'TicketTheme',
        component: () => import('@/views/ticket/ticketTheme'),
        meta: {title: 'ticketTheme'}
      }
      ,
      {
        path: 'ticketToExamine',
        name: 'TicketToExamine',
        component: () => import('@/views/ticket/TicketToExamine'),
        meta: {title: 'ticketToExamine'}
      },
      {
        path: 'ticketToExamineShowHomePage',
        name: 'TicketToExamineShowHomePage',
        component: () => import('@/views/ticket/TicketToExamineShowHomePage'),
        meta: {title: 'ticketToExamineShowHomePage'}
      },{
        path: 'ticketHomePageBigPicture',
        name: 'TicketHomePageBigPicture',
        component: () => import('@/views/ticket/TicketHomePageBigPicture'),
        meta: {title: 'ticketHomePageBigPicture'}
      },{
        path: 'ticketHomePageSmallPicture',
        name: 'TicketHomePageSmallPicture',
        component: () => import('@/views/ticket/TicketHomePageSmallPicture'),
        meta: {title: 'ticketHomePageSmallPicture'}
      }
    ]
  },
  /**
   * 酒店管理
   */
  {
    path: '/hotel',
    component: Layout,
    name: 'Hotel',
    // hidden:true,
    // alwaysShow: true,
    meta: {title: 'hotel', icon: 'hotel'},
    children: [
      {
        path: 'hotelImageType',
        name: 'HotelImageType',
        component: () => import('@/views/hotel/HotelImageType'),
        meta: {title: 'hotelImageType'}
      },{
        path: 'hotelRecommendType',
        name: 'HotelRecommendType',
        component: () => import('@/views/hotel/HotelRecommendType'),
        meta: {title: 'hotelRecommendType'}
      },{
        path: 'hotelThemeCategory',
        name: 'HotelThemeCategory',
        component: () => import('@/views/hotel/HotelThemeCategory'),
        meta: {title: 'hotelThemeCategory'}
      },{
        path: 'hotelFacilities',
        name: 'HotelFacilities',
        component: () => import('@/views/hotel/HotelFacilities'),
        meta: {title: 'hotelFacilities'}
      },{
        path: 'hotelRoomFacilities',
        name: 'HotelRoomFacilities',
        component: () => import('@/views/hotel/HotelRoomFacilities'),
        meta: {title: 'hotelRoomFacilities'}
      },{
        path: 'hotelIconGallery',
        name: 'HotelIconGallery',
        component: () => import('@/views/hotel/HotelIconGallery'),
        meta: {title: 'hotelIconGallery'}
      },{
        path: 'hotelFacilitiesType',
        name: 'HotelFacilitiesType',
        component: () => import('@/views/hotel/HotelFacilitiesType'),
        meta: {title: 'hotelFacilitiesType'}
      },{
        path: 'hotelRoomFacilitiesType',
        name: 'HotelRoomFacilitiesType',
        component: () => import('@/views/hotel/HotelRoomFacilitiesType'),
        meta: {title: 'hotelRoomFacilitiesType'}
      },{
        path: 'hotelCityRecommendType',
        name: 'HotelCityRecommendType',
        component: () => import('@/views/hotel/HotelCityRecommendType'),
        meta: {title: 'hotelCityRecommendType'}
      }
    ]
  },
  /**
   * 美食管理
   */
  {
    path: '/food',
    component: Layout,
    name: 'Food',
    // hidden:true,
    // alwaysShow: true,
    meta: {title: 'food', icon: 'food'},
    children: [
      {
        path: 'foodRecommendStoreType',
        name: 'FoodRecommendStoreType',
        component: () => import('@/views/food/FoodRecommendStoreType'),
        meta: {title: 'foodRecommendStoreType'}
      },{
        path: 'foodAttributeListType',
        name: 'FoodAttributeListType',
        component: () => import('@/views/food/FoodAttributeListType'),
        meta: {title: 'foodAttributeListType'}
      },{
        path: 'foodReviewStoreInformation',
        name: 'FoodReviewStoreInformation',
        component: () => import('@/views/food/FoodReviewStoreInformation'),
        meta: {title: 'foodReviewStoreInformation'}
      }
      ,
      {
        path: 'foodHomePagePicture',
        name: 'FoodHomePagePicture',
        component: () => import('@/views/food/FoodHomePagePicture'),
        meta: {title: 'foodHomePagePicture'}
      }
    ]
  },
  /**
   * 租车管理
   */
  {
    path: '/car',
    component: Layout,
    name: 'Car',
    // hidden:true,
    // alwaysShow: true,
    meta: {title: 'car', icon: 'car'},
    children: [
      {
        path: 'carRent',
        name: 'carRent',
        component: () => import('@/views/car/CarRent'),
        meta: {title: 'carRent'}
      },
      {
        path: 'carProperties',
        name: 'carProperties',
        component: () => import('@/views/car/CarProperties'),
        meta: {title: 'carProperties'}
      },
      {
        path: 'carCityLandmarks',
        name: 'CarCityLandmarks',
        component: () => import('@/views/car/CarCityLandmarks'),
        meta: {title: 'carCityLandmarks'}
      }
    ]
  },
  /**
   * 微电影管理
   */
  {
    path: '/movie',
    component: Layout,
    name: 'Movie',
   // hidden:true,
    alwaysShow: true,
    meta: {title: 'movie', icon: 'movie'},
    children: [
      {
        path: 'movieReview',
        name: 'MovieReview',
        component: () => import('@/views/movie/MovieReview'),
        meta: {title: 'movieReview'}
      },
      /*{
        path: '/movieType',
        name: '/MovieType',
=======
      {
        path: 'movieType',
        name: 'MovieType',
>>>>>>> Stashed changes
        component: () => import('@/views/movie/MovieType'),
        meta: {title: 'movieType'}
      }*/
     ]
  },
  /**
   * 教育
   */
  {
    path: '/education',
    component: Layout,
    name: 'Education',
   // hidden:true,
    alwaysShow: true,
    meta: {title: 'education', icon: 'edit'},
    children: [

      {
        path: 'educationVideoTypeManagement',
        name: 'EducationVideoTypeManagement',
        component: () => import('@/views/education/educationVideoTypeManagement'),
        meta: {title: 'educationVideoTypeManagement'}
      },
      {
        path: 'educationHomePageBigImage',
        name: 'EducationHomePageBigImage',
        component: () => import('@/views/education/educationHomePageBigImage'),
        meta: {title: 'educationHomePageBigImage'}
      },
      {
        path: 'educationCourseRecommendCheck',
        name: 'EducationCourseRecommendCheck',
        component: () => import('@/views/education/educationCourseRecommendCheck'),
        meta: {title: 'educationCourseRecommendCheck'}
      },
      {
        path: 'educationVideoManagement',
        name: 'EducationVideoManagement',
        component: () => import('@/views/education/educationVideoManagement'),
        meta: {title: 'educationVideoManagement'}
      },
      {
        path: 'educationOrderManagement',
        name: 'EducationOrderManagement',
        component: () => import('@/views/education/educationOrderManagement'),
        meta: {title: 'educationOrderManagement'}
      },
      {
        path: 'educationUserInfoManagement',
        name: 'EducationUserInfoManagement',
        component: () => import('@/views/education/educationUserInfoManagement'),
        meta: {title: 'educationUserInfoManagement'}
      },

     {
        path: 'educationAuditRecommend',
        name: 'EducationAuditRecommend',
        component: () => import('@/views/education/educationAuditRecommend'),
        meta: {title: 'educationAuditRecommend'}
      },

    ]
  },

  /**
   * 上传app
   */

  {
    path: '/app',
    component: Layout,
    name: 'App',
    // hidden:true,
     alwaysShow: true,
    meta: {title: 'app', icon: 'zip'},
    children: [
      {
        path: 'uploadApp',
        name: 'UpdateApp',
        component: () => import('@/views/App/UploadApp'),
        meta: {title: 'uploadApp',icon: 'documentation'}
      },

      // {
      //   path: '/movieType',
      //   name: '/MovieType',
      //   component: () => import('@/views/movie/MovieType'),
      //   meta: {title: 'movieType'}
      // }
    ]
  },



  {path: '*', redirect: '/404', hidden: true}
];

export default new VueRouter({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

export const asyncRouterMap =[

]

