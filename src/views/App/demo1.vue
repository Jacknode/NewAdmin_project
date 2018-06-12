<template>
  <div>
    <el-upload
      class="upload-demo"
      action="string"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :http-request="beforeUpload"
      :on-success="success"
      list-type="picture">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <el-button size="small" type="primary" @click="getValue">获取值</el-button>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    name: '',
    data(){
      return {
        fileList: []
      }
    },
    computed: mapGetters([]),
    created(){
    },
    methods: {
      beforeUpload(item){
        var fd = new FormData();
        fd.append("fileUpload", item.file);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://image.1000da.com.cn/PostImage/PostAppStore");
        xhr.send(fd);
        xhr.onreadystatechange = ()=>{
          if (xhr.readyState == 4 && xhr.status == 200) {
            let obj = JSON.parse(xhr.responseText);
            this.fileList.push({
              url:obj.data
            })
            item.onSuccess('配时文件上传成功')
            console.log(obj)
          }
        }
      },
      handleRemove(file) {
        this.fileList = this.fileList.filter(item=>{
          if(item.uid==file.uid){
            return false;
          }
          return true;
        })
      },
      handlePreview(file) {
//        console.log(file);
      },
      success(response, file, fileList){
        console.log(response, file, fileList)
      },
      getValue(){
        console.log(this.fileList)
      }
    },
  }
</script>
<style>
  input[type="file"] {
    display: none !important;
  }

</style>
