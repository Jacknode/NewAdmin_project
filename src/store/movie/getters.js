/**
 * Created by leibo on 18/5/2.
 */
export default {
  movieTypeList: state => state.movieTypeList,//微电影类型
  updateMovieTypeObj: state => state.updateMovieTypeObj,//修改微电影类型

  movieAudit: state => state.movieAudit,//微电影审核
  updateMovieReviewObj: state => state.updateMovieReviewObj,//修改微电影类型
  VMovieTypeList: state => state.VMovieTypeList,//微电影审核查询所需分类
}
