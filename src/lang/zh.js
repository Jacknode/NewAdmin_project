export default {
  route: {
    dashboard: '首页',
    introduction: '简述',


    admin:'利润管理',
    adminVendorProfit:'供应商利润管理',
    adminAgentsProfit:'代理商利润管理',
    adminHuileyouReturn:'惠乐游收益管理',
    audit:'审核管理',
    adminAgents:'代理商信息审核管理',
    adminSupplier:'供应商信息审核管理',
    adminProductAudit:'供应商产品审核管理',

    integral:'积分管理',
    adminIntegralWeight:'积分权重管理',
    adminIntegralType:'积分类型管理',
    advertisement:'广告管理',
    adType:'广告类型',
    adChargeWay:'广告收费方式',
    adTypeChargeMode:'广告类型收费方式',
    adPosition:'广告位置',
    adApply:'广告申请',

    ticket:'门票管理',
    ticketTheme:'门票主题管理',
    ticketToExamine:'门票审核景点',
    ticketToExamineShowHomePage:'门票审核景点展示',
    ticketHomePageBigPicture:'门票首页显示大图',
    ticketHomePageSmallPicture:'门票首页显示小图',

    hotel:'酒店管理',
    hotelImageType:'酒店图片类型管理',
    hotelRecommendType:'酒店推荐类型管理',
    hotelThemeCategory:'酒店主题类别管理',
    hotelFacilities:'酒店设施管理',
    hotelRoomFacilities:'酒店房间设施管理',
    hotelIconGallery:'酒店图标库管理',
    hotelFacilitiesType:'酒店设施类型管理',
    hotelRoomFacilitiesType:'酒店房间设施类型管理',
    hotelCityRecommendType:'酒店城市推荐类型管理',
    food:'美食管理',
    foodRecommendStoreType:'美食推荐店铺管理',
    foodAttributeListType:'美食属性表管理',
    foodReviewStoreInformation:'美食审核店面信息管理',
    foodHomePagePicture:'美食首页展示图片管理',

    car:'租车管理',
    carRent:'租车汽车管理',
    carProperties:'租车属性管理',
    carCityLandmarks:'租车城市地标管理',

    movie:'微电影管理',
    movieReview:'微电影审核管理',
    movieType:'微电影类型管理',



    education:'教育管理',
    educationAuditRecommend:'教育视频推荐审核',
    educationHomePageBigImage:'教育首页大图管理',
    educationVideoTypeManagement:'教育视频类型管理',
    educationVideoManagement:'教育视频审核管理',
    educationOrderManagement:'教育订单管理',
    educationUserInfoManagement:'教育用户信息管理',
    educationCourseRecommendCheck:'教育课程推荐审核',




    app:'app管理',
    uploadApp:'App上传',




    adverts:'广告后台管理',
    documentation: '文档',
    guide: '引导页',
    VendorInformation:'供应商信息',
    productLine:'产品线路信息',
    ProductLineManagement:'产品线路',
    adminMerchantProducts:'商家产品信息',
    permission: '权限测试页',
    pagePermission: '页面权限',
    directivePermission: '指令权限',
    icons: '图标',
    components: '组件',
    componentIndex: '介绍',
    tinymce: '富文本编辑器',
    markdown: 'Markdown',
    jsonEditor: 'JSON编辑器',
    dndList: '列表拖拽',
    splitPane: 'Splitpane',
    avatarUpload: '头像上传',
    dropzone: 'Dropzone',
    sticky: 'Sticky',
    countTo: 'CountTo',
    componentMixin: '小组件',
    backToTop: '返回顶部',
    dragDialog: '拖拽 Dialog',
    dragKanban: '可拖拽看板',
    charts: '图表',
    keyboardChart: '键盘图表',
    lineChart: '折线图',
    mixChart: '混合图表',
    example: '综合实例',
    Table: 'Table',
    dynamicTable: '动态Table',
    dragTable: '拖拽Table',
    inlineEditTable: 'Table内编辑',
    complexTable: '综合Table',
    treeTable: '树形表格',
    customTreeTable: '自定义树表',
    tab: 'Tab',
    form: '表单',
    createArticle: '创建文章',
    editArticle: '编辑文章',
    articleList: '文章列表',
    errorPages: '错误页面',
    page401: '401',
    page404: '404',
    errorLog: '错误日志',
    excel: 'Excel',
    exportExcel: 'Export Excel',
    selectExcel: 'Export Selected',
    uploadExcel: 'Upload Excel',
    zip: 'Zip',
    exportZip: 'Export Zip',
    theme: '换肤',
    clipboardDemo: 'Clipboard',
    i18n: '国际化'
  },
  navbar: {
    logOut: '退出登录',
    dashboard: '首页',
    github: '项目地址',
    screenfull: '全屏',
    theme: '换肤'
  },
  login: {
    title: '系统登录',
    logIn: '登录',
    username: '账号',
    password: '密码',
    any: '随便填',
    thirdparty: '第三方登录',
    thirdpartyTips: '本地不能模拟，请结合自己业务进行模拟！！！'
  },
  documentation: {
    documentation: '文档',
    github: 'Github 地址'
  },
  permission: {
    roles: '你的权限',
    switchRoles: '切换权限'
  },
  guide: {
    description: '引导页对于一些第一次进入项目的人很有用，你可以简单介绍下项目的功能。本 Demo 是基于',
    button: '打开引导'
  },
  components: {
    documentation: '文档',
    tinymceTips: '富文本是管理后台一个核心的功能，但同时又是一个有很多坑的地方。在选择富文本的过程中我也走了不少的弯路，市面上常见的富文本都基本用过了，最终权衡了一下选择了Tinymce。更详细的富文本比较和介绍见',
    dropzoneTips: '由于我司业务有特殊需求，而且要传七牛 所以没用第三方，选择了自己封装。代码非常的简单，具体代码你可以在这里看到 @/components/Dropzone',
    stickyTips: '当页面滚动到预设的位置会吸附在顶部',
    backToTopTips1: '页面滚动到指定位置会在右下角出现返回顶部按钮',
    backToTopTips2: '可自定义按钮的样式、show/hide、出现的高度、返回的位置 如需文字提示，可在外部使用Element的el-tooltip元素',
    imageUploadTips: '由于我在使用时它只有vue@1版本，而且和mockjs不兼容，所以自己改造了一下，如果大家要使用的话，优先还是使用官方版本。'
  },
  table: {
    dynamicTips1: '固定表头, 按照表头顺序排序',
    dynamicTips2: '不固定表头, 按照点击顺序排序',
    dragTips1: '默认顺序',
    dragTips2: '拖拽后顺序',
    title: '标题',
    importance: '重要性',
    type: '类型',
    remark: '点评',
    search: '搜索',
    add: '添加',
    export: '导出',
    reviewer: '审核人',
    id: '序号',
    date: '时间',
    author: '作者',
    readings: '阅读数',
    status: '状态',
    actions: '操作',
    edit: '编辑',
    publish: '发布',
    draft: '草稿',
    delete: '删除',
    cancel: '取 消',
    confirm: '确 定'
  },
  errorLog: {
    tips: '请点击右上角bug小图标',
    description: '现在的管理后台基本都是spa的形式了，它增强了用户体验，但同时也会增加页面出问题的可能性，可能一个小小的疏忽就导致整个页面的死锁。好在 Vue 官网提供了一个方法来捕获处理异常，你可以在其中进行错误处理或者异常上报。',
    documentation: '文档介绍'
  },
  excel: {
    export: '导出',
    selectedExport: '导出已选择项',
    placeholder: '请输入文件名(默认excel-list)'
  },
  zip: {
    export: '导出',
    placeholder: '请输入文件名(默认file)'
  },
  theme: {
    change: '换肤',
    documentation: '换肤文档',
    tips: 'Tips: 它区别于 navbar 上的 theme-pick, 是两种不同的换肤方法，各自有不同的应用场景，具体请参考文档。'
  },
  tagsView: {
    close: '关闭',
    closeOthers: '关闭其它',
    closeAll: '关闭所有'
  }
}
