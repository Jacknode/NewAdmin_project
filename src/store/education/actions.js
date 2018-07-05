/**
 * Created by LiuXiang on 18/04/09.
 */
// import axios from "axios";
import {getNewStr} from '@/assets/js/public'

export default {

  /**
   * 教育视频类型初始化
   */
  initEducationTypeManagement({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/EducationType/Select', JSON.stringify(data), {
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
      axios.post(getNewStr + '/EducationType/IndexClassification', JSON.stringify(data), {
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
      axios.post(getNewStr + '/EducationType/Insert', JSON.stringify(data), {
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
      axios.post(getNewStr + '/EducationType/Update', JSON.stringify(data), {
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
      axios.post(getNewStr + '/EducationType/Delete', JSON.stringify(data), {
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
   * 审核视频初始化
   */
  initAdminEducationAuditVideo({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/EdValidate/Select', JSON.stringify(data), {
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
      axios.post(getNewStr + '/EdValidate/SelectTJ', JSON.stringify(data), {
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
   * 审核视频
   */
  educationApprovalVideo(store, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/EdValidate/ValiateVedio', JSON.stringify(data), {
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
      axios.post(getNewStr + '/EdOrderInfo/Select', JSON.stringify(data), {
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
      axios.post(getNewStr + '/EdOrderInfo/Delete', JSON.stringify(data), {
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
