/**
 * Created by LiuXiang on 18/04/09.
 */
// import request from "request";
import {getNewStr} from '@/assets/js/public'
import request from '@/utils/request'

export default {

  /**
   * 教育视频类型初始化
   */
  initEducationTypeManagement({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/EducationType/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(Number(data.totalRows));
            commit('initEducationTypeManagement', data.data.reverse())
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },

  /**
   *查询类型信息
   */
  initSelectTypeAllInfo({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/EducationType/IndexClassification', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;

          if (Number(data.resultcode) == 200) {
            relove(Number(data.totalRows));
            commit('initSelectTypeAllInfo', data.data.reverse())
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },



  /**
   * 添加教育
   */

  addEducationTypeManagement(store, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/EducationType/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data => {
        var data = data.data;

        if (Number(data.resultcode) == 200) {
          relove(data.resultcontent)
        } else {
          reject(data.resultcontent)
        }
      })
    })
  },

  /**
   * 修改分类
   */
  updateEducationTypeManagement(store, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/EducationType/Update', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data => {
        var data = data.data;

        if (Number(data.resultcode) == 200) {
          relove(data.resultcontent)
        } else {
          reject(data.resultcontent)
        }
      })
    })
  },

  /**
   * 删除视频类型
   */

  DeleteEducationTypeManagement(store, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/EducationType/Delete', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          relove(data.resultcontent)
        } else {
          reject(data.resultcontent)
        }
      })
    })
  },

  /**
   * 查询课程
   */
  searchCourseAction({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/EdSeries/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;

          if (Number(data.resultcode) == 200) {
            relove(Number(data.totalRows));
            commit('searchCourseAction', data.data.reverse())
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  /**
   * 审核视频初始化
   */
  initAdminEducationAuditVideo({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/EdValidate/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;

          if (Number(data.resultcode) == 200) {
            relove(Number(data.totalRows));
            commit('initAdminEducationAuditVideo', data.data.reverse())
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  /**
   * 教育审核推荐初始化
   */
  initAdminEducationAuditRecommend({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/EdVedio/SelectRecommend', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;

          if (Number(data.resultcode) == 200) {
            commit('initAdminEducationAuditRecommend',data.data.reverse());
            relove(Number(data.totalRows))
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  /**
   * 初始化首页大图
   */
  initEducationHomePageBigImage({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/EdSeries/SelectApply', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initEducationHomePageBigImage',data.data.reverse());
            relove(Number(data.totalRows))
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },

  /**
   * 初始化用户信息
   */
  initEducationUserInfoAction({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/EWebPage/SelectFrozen', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          console.log('data:',data)
          if (Number(data.resultcode) == 200) {
            commit('initEducationUserInfoAction',data.scoreTypeLists);
            relove(Number(data.totalRows))
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },

  /**
   * 审核视频
   */
  educationApprovalHomePageBigImage(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/EdSeries/UpdateRecommend', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          relove(data.resultcontent)
        } else {
          reject(data.resultcontent)
        }
      })
    })
  },
  /**
   * 教育用户冻结
   */
  whetherFreezeAction(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/EWebPage/UpdateFrozen', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          relove(data.resultcontent)
        } else {
          reject(data.resultcontent)
        }
      })
    })
  },
  /**
   * 教育视频审核表审核
   */
  educationApprovalVideo(store, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/EdValidate/ValiateVedio', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          relove(data.resultcontent)
        } else {
          reject(data.resultcontent)
        }
      })
    })
  },
  /**
   * 教育视频推荐审核
   */
    educationApprovalVideoRecoment(store, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/EdVedio/Recommend', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          relove(data.resultcontent)
        } else {
          reject(data.resultcontent)
        }
      })
    })
  },
  /**
   * 教育课程推荐审核
   */
  educationCourseRecommendAction(store, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/EdSeries/SeriesRecommend', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          relove(data.resultcontent)
        } else {
          reject(data.resultcontent)
        }
      })
    })
  },
  /**
   * 教育课程推荐审核初始化e
   */
  initEducationCourseRecommendAction({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/EdSeries/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          console.log('data:',data)
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initEducationCourseRecommendAction',data.data.reverse());
            relove(Number(data.totalrows))
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  /**
   * 教育课程推荐申请
   */
  initEducationCourseRecommend(store, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/EdSeries/SelectApply', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          relove(data.resultcontent)
        } else {
          reject(data.resultcontent)
        }
      })
    })
  },
  /**
   * 教育订单查询
   */
  initEducationOrderManagement({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/EdOrderInfo/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            for (let i = 0; i < data.data.length; i++) {
              if (data.data[i].ed_oi_PayState == 0) {
                data.data[i].ed_oi_PayState = '未支付'
              }
              if (data.data[i].ed_oi_PayState == 1) {
                data.data[i].ed_oi_PayState = '已支付'
             }

              // if (data.data[i].ed_oi_status == 0) {
              //   data.data[i].ed_oi_status = '未冻结'
              // }
              // if (data.data[i].ed_oi_status == 1) {
              //   data.data[i].ed_oi_status = '已冻结'
              // }
            };
            commit('initEducationOrderManagement',data.data.reverse());
            relove(Number(data.totalRows))
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  /**
   * 教育订单删除
   */
  deleteEducationOrderManagement(store, data) {
    return new Promise((relove, reject) => {
      request.post(getNewStr + '/EdOrderInfo/Delete', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          relove(data.resultcontent)
        } else {
          reject(data.resultcontent)
        }
      })
    })
  },
  /**
   * 冻结订单
   */
  frozenEducationOrder(store, data) {
  return new Promise((relove, reject) => {
    request.post(getNewStr + '/EdOrderInfo/Freeze', JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(data => {
      var data = data.data;

      if (Number(data.resultcode) == 200) {
        relove(data.resultcontent)
      } else {
        reject(data.resultcontent)
      }
    })
  })
},
}
