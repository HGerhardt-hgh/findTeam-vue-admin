<template>
  <div class="app-container">
    讲师表单

    <el-table-column
        label="序号"
        width="100"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
     <el-form label-width="120px">
      <el-form-item label="年级名称">
        <el-input v-model="grade.name"/>
      </el-form-item>
     
  
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
import teacherApi from '@/api/edu/teacher'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

export default {
  components: { ImageCropper, PanThumb },
  data(){
    return {
       teacher:{
        name: '',
        sort: 0,
        level: 1,
        career: '',
        intro: '',
        avatar: ''
       },

       //上传弹框组件是否显示
      imagecropperShow:false,
      imagecropperKey:0,//上传组件key值
      BASE_API:process.env.BASE_API, //获取dev.env.js里面地址
       saveBtnDisabled:false  // 保存按钮是否禁用,
  }},
  watch:{//监听
  $route(to,from){//路由变化方式
  this.init()
  }
  },
  created(){
this.init()
  },
  methods:{
close(){
  this.imagecropperShow=false//关闭上传弹框的方法
        //上传组件初始化
        this.imagecropperKey = this.imagecropperKey+1
},
//上传成功的方法
cropSuccess(data){
this.imagecropperShow=false
//上传之后接口返回图片地址
this.teacher.avatar=data.url
this.imagecropperKey=this.imagecropperKey+1
},
    //初始化
init(){

//如果有id值，则是修改，需要显示数据
if(this.$route.params&&this.$route.params.id){
  //从路径中取到id值
  const id=this.$route.params.id
  //调用方法根据id获取教师数据
  teacherApi.getTeacherInfo(id)
  .then(response=>{
    this.teacher=response.data.teacher
  })
}
else{//否则是添加

  //清空表单 
  this.teacher={}
}
},

// 按钮点击判断
saveOrUpdate(){
   //根据teacher是否有id
  if(this.teacher.id){
   this.updateTeacher()
  }
  else{
    this.saveTeacher();
  }
},

    //添加方法
    saveTeacher(){
      teacherApi.addTeacher(this.teacher)
      .then(response=>{//添加成功
        //提示信息
     this.$message({
              type: 'success',
              message: '添加成功!'
          });
          //回到列表页面 路由跳转
          this.$router.push({path:'/teacher/table'})

      })
    },
    //修改方法
    updateTeacher(){
      teacherApi.updateTeacherInfor(this.teacher)
      .then(response=>{
        //提示信息
         this.$message({
              type: 'success',
              message: '修改成功!'
          });
          //跳转到列表页面
          this.$router.push({path:'/teacher/table'})
      })
    }
  }
}
</script>