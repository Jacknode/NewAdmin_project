/**
 * Created by leibo on 18/5/2.
 */
//import request from 'request'
import {getNewStr} from '@/assets/js/public'
import request from '@/utils/request'


export default {
  /********************************************微电影类型*********************************************************/
  //微电影类型数据
  initMovieTypeList({commit},data){
    return new Promise((relove, reject) => {
      request.post(getNewStr+'/Type/Select',JSON.stringify(data),{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data=>{
        var data = data.data;
        if(Number(data.resultcode)==200){
          commit('initMovieTypeList',data.data2)
          relove(Number(data.totalRows))

        }else{
          reject(data.resultcontent)
        }
      })
    })
  },
  //添加微电影类型
  AddMovieType(store,data){
    return new Promise((relove, reject) => {
      request.post(getNewStr+'/Type/Insert',JSON.stringify(data),{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data=>{

        var data = data.data;
        console.log(data.resultcode)
        if(data.resultcode==200){
          relove(data.resultcontent)
        }else{
          reject(data.resultcontent)
        }
      })
    })
  },
  //修改微电影类型
  UpdateMovieType(store,data){
    return new Promise((relove, reject) => {
      request.post(getNewStr+'/Type/Update',JSON.stringify(data),{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data=>{
        var data = data.data;
        if(Number(data.resultcode)==200){
          relove(data.resultcontent)
        }else{
          reject(data.resultcontent)
        }
      })
    })
  },
  //删除
  DeleteMovieType(store,data){
    return new Promise((relove, reject) => {
      request.post(getNewStr+'/Type/Delete',JSON.stringify(data),{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data=>{
        var data = data.data;
        if(Number(data.resultcode)==200){
          relove(data.resultcontent)
        }else{
          reject(data.resultcontent)
        }
      })
    })
  },
  /********************************************微电影审核*******************************************************/
  initMovieAudit({commit},data){

    return new Promise((relove, reject) => {
      request.post(getNewStr+'/Validate/Select',JSON.stringify(data),{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data=>{

        var data = data.data;
        if(Number(data.resultcode)==200){

         //  for (let i=0;i<data.data.length;i++){
         // console.log(JSON.parse(data.data[i].vf_ve_Content))
         //  let str = JSON.parse(data.data[i].vf_ve_Content)
         //
         //    data.data[i].vf_ve_Content = str;
         //  }
         //  console.log(data.data)
          commit('initMovieAudit',data.data)
          relove(Number(data.totalRows))

        }else{
          reject(data.resultcontent)
        }
      })
    })
  },
  //初始化（查询）微电影分类
  initVMovieSorting({commit}, data) {
    return new Promise(function (relove, reject) {
      request.post(getNewStr + '/Type/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          console.log(111,data)
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(Number(data.totalRows));
            commit('initVMovieSorting', data.data2)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },

  //审核成功
AuditSubmitOk(store,data){
  return new Promise((relove, reject) => {
    request.post(getNewStr+'/Validate/ValiateVedio',JSON.stringify(data),{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(data=>{
      //   console.log(data)
      var data = data.data;
      if(data.resultcode==200){
        relove(data.resultcontent)
      }else{
        reject(data.resultcontent)
      }
    })
  })
},
//审核失败
AuditSubmitNo(store,data){

  return new Promise((relove, reject) => {
    request.post(getNewStr+'/Validate/Delete',JSON.stringify(data),{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(data=>{
      console.log(22)
      var data = data.data;
      if(Number(data.resultcode)==200){
        relove(data.resultcontent)
      }else{
        reject(data.resultcontent)
      }
    })
  })
},
 //修改微电影审核
  UpdateMovieReview(store,data){
      return new Promise((relove, reject) => {
        request.post(getNewStr+'/Validate/Update',JSON.stringify(data),{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(data=>{
          var data = data.data;
          console.log(data)
          if(Number(data.resultcode)==200){
            relove(data.resultcontent)
          }else{
            reject(data.resultcontent)
          }
        })
      })
    },
}


