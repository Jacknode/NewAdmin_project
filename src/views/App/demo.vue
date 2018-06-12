<template>
  <div>
    <section id="wrap">
      <h1 class="userClass" style="font-size: 20px;font-weight: bold;">上传App</h1>
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <el-form-item>
            <!--<span>图片类型名称筛选:</span>-->
          </el-form-item>
          <el-form-item>
            <!--<el-input type="text" v-model="imageName" auto-complete="off" placeholder="图片类型名称" size="small"></el-input>-->
          </el-form-item>
          <el-form-item style="float: right;">
            <!--<el-button type="primary" @click="search" size="small">查询</el-button>-->
            <el-button type="primary" @click="uploadApp" size="small">上传</el-button>
            <a href="javascript:;" class="file">选择视频
              <input type="file" name="" ref="upload1" multiple>
            </a>
          </el-form-item>
        </el-form>
      </el-col>


      <!--上传-->
      <el-dialog title="上传App" :visible.sync="addDialog">
        <el-form :model="options">
          <el-form-item label="视频标题:" :label-width="formLabelWidth">
            <el-input v-model="options.imageTitle" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="视频描述:" :label-width="formLabelWidth">
            <el-input v-model="options.describe" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="上传App:" :label-width="formLabelWidth">
            <a href="javascript:;" class="file">上传App
              <input type="file" name="" ref="upload" multiple>
            </a>
            <p style="overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;text-align: center" v-loading="isLoading"></p>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </section>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'


  export default{
    name: '',
    data(){
      return {
        addDialog: false,
        isLoading: false,
        total: 0,
        formLabelWidth: '120px',
        options: {
          "imageTitle": "",//视频标题
          "describe": "",//视频描述
          "filename": "",//视频名称  必须带扩展名
          "tag": "",//视频标签,多个用逗号分隔(可选)
          "cateid": "0",//分类ID(可选)
          "imageshow": "http://image.1000da.com.cn/image/1.jpg"//封面展示
        },
        uploader: {}
      }
    },
    computed: mapGetters([
      'uploadAppList'
    ]),
    mounted(){

    },
    methods: {
      //上传
      uploadApp(){
        this.addDialog = true;
        this.$store.commit('setTranstionFalse');
        this.uploaNode()
      },
      addSubmit(){
        this.$http.post('http://image.1000da.com.cn/PostImage/PlayVedioUpload', JSON.stringify(this.options), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(data => {
          var data = data.data;
          let resulte = JSON.parse(data.data);
          var uploader = new AliyunUpload.Vod({
            // 文件上传失败
            'onUploadFailed': function (uploadInfo, code, message) {
              console.log("onUploadFailed: file:" + uploadInfo.file.name + ",code:" + code + ", message:" + message);
            },
            // 文件上传完成
            'onUploadSucceed': function (uploadInfo) {
              console.log("onUploadSucceed: " + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object);
            },
            // 文件上传进度
            'onUploadProgress': function (uploadInfo, totalSize, loadedPercent) {
              console.log("onUploadProgress:file:" + uploadInfo.file.name + ", fileSize:" + totalSize + ", percent:" + (loadedPercent * 100.00).toFixed(2) + "%");
            },
            // STS临时账号会过期，过期时触发函数
            'onUploadTokenExpired': function (uploadInfo) {
              console.log("onUploadTokenExpired");
            },
            onUploadCanceled: function (uploadInfo) {
              console.log("onUploadCanceled:file:" + uploadInfo.file.name);
            },
            // 开始上传
            'onUploadstarted': function (uploadInfo) {
              if (!uploadInfo.videoId)//这个文件没有上传异常
              {
                console.log("onUploadStarted:" + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object);
                //实际环境中调用调用点播的获取上传凭证接口
                uploader.setUploadAuthAndAddress(uploadInfo, resulte.UploadAuth, resulte.UploadAddress, resulte.VideoId);
              }
              else//如果videoId有值，根据videoId刷新上传凭证
              {
                //实际环境中调用点播的刷新上传凭证接口，获取凭证
                uploader.setUploadAuthAndAddress(uploadInfo, resulte.UploadAuth, resulte.UploadAddress);
              }


//              uploader.setUploadAuthAndAddress(uploadInfo, resulte.uploadAuth, resulte.uploadAddress,resulte.videoId);
            },
            'onUploadEnd': function (uploadInfo) {
              console.log("onUploadEnd: uploaded all the files");
            }
          });
          this.uploaNode(uploader, resulte);
          console.log(resulte)
          this.addDialog = false;
        })
      },
      uploaNode(uploader, resulte) {
        setTimeout(() => {
          if (this.$refs.upload) {
            this.$refs.upload.addEventListener('change', () => {
              let file = this.$refs.upload.files[0];
              this.options.filename = file.name
            })
          }
          if (this.$refs.upload1) {
            this.$refs.upload1.addEventListener('change', () => {
              let file = this.$refs.upload1.files[0];
              var userData;
              if (resulte) {
                userData = '{"Vod":{"UserData":{"IsShowWaterMark":"false","Priority":"7"}}}';
              } else {
                userData = {
                  "Vod": {
                    "Title": this.options.imageTitle,
                    "Description": this.options.describe,
                    "CateId": "0",
                    "Tags": "",
                    "UserData": "user data"
                  }
                };
              }
              if (uploader && resulte) {
                console.log(userData)
                uploader.addFile(file, null, null, null, userData);
                this.startUpLoad(uploader)
              }
            })
          }
        }, 30)

      },
      startUpLoad(uploader){
        console.log(uploader)
        uploader.startUpload();
      }
    },
  }
</script>
<style scoped>
#wrap{
  width: 100%;
}
</style>
