
<template>
  <div class="app-container">
  <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="最终发布"/>
    </el-steps>
       
        <el-form label-width="120px">
 <el-form-item label="课程标题">
            <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"/>
        </el-form-item>

        <!-- 所属分类 TODO -->
        <el-form-item label="课程分类">
            <el-select
                v-model="courseInfo.subjectParentId"
                placeholder="一级分类" @change="subjectLevelOneChanged">

                <el-option
                    v-for="subject in subjectOneList"
                    :key="subject.id"
                    :label="subject.title"
                    :value="subject.id"/>

            </el-select>

            <!-- 二级分类 -->
            <el-select v-model="courseInfo.subjectId" placeholder="二级分类">
                <el-option
                    v-for="subject in subjectTwoList"
                    :key="subject.id"
                    :label="subject.title"
                    :value="subject.id"/>
            </el-select>
        </el-form-item>


        <!-- 课程讲师 TODO -->

        <!-- 课程讲师 -->
        <el-form-item label="课程讲师">
        <el-select
            v-model="courseInfo.teacherId"
            placeholder="请选择">

            <el-option
                v-for="teacher in teacherList"
                :key="teacher.id"
                :label="teacher.name"
                :value="teacher.id"/>

        </el-select>
        </el-form-item>

        <el-form-item label="总课时">
            <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="请填写课程的总课时数"/>
        </el-form-item>

        <!-- 课程简介 TODO -->
       <el-form-item label="课程简介">
            <tinymce :height="300" v-model="courseInfo.description"/>
        </el-form-item>
        <!-- 课程封面 TODO -->
        <!-- 课程封面-->
        <el-form-item label="课程封面">

            <el-upload
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :action="BASE_API+'/eduoss/fileoss'"
                class="avatar-uploader">
                <img :src="courseInfo.cover">
            </el-upload>

        </el-form-item>

        <el-form-item label="课程价格">
            <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="免费课程请设置为0元"/> 元
        </el-form-item>


              <el-form-item>
               <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存并下一步</el-button>
              </el-form-item>
        </el-form>
      </div>
</template>
<script>
import course from '@/api/edu/course'
import subject from '@/api/edu/subject'
import Tinymce from '@/components/Tinymce' //引入组件

export default {
     //声明组件
    components: { Tinymce },
data() {
        return {
           saveBtnDisabled:false,
            courseInfo:{
                title: '',
                subjectId: '',//二级分类id
                subjectParentId:'',//一级分类id
                teacherId: '',
                lessonNum: 0,
                description: '',
                cover: 'https://zyp-edu.oss-cn-beijing.aliyuncs.com/guli/u%3D2624249937%2C3113058032%26fm%3D26%26gp%3D0.jpg',
                price: 0
            },
            BASE_API: process.env.BASE_API, // 接口API地址
            teacherList:[],//封装所有的讲师
            subjectOneList:[],//一级分类
            subjectTwoList:[],//二级分类
            courseId:''//课程id
        }
},
watch:{//监听
  $route(to,from){//路由变化方式
  this.init()
  } },
created(){
 this.init()
},
methods:{
    //初始化
    init(){
   //获取路由的id值
        if(this.$route.params && this.$route.params.id) {
            this.courseId = this.$route.params.id
            this.getInfo()
        }
        else{
   //初始化所有讲师
 this.getListTeacher()
 //初始化一级分类
 this.getOneSubject()
 }
    },
    //通过id获得信息
    getInfo(){
   course.getCourseInfoId(this.courseId).then(response=>{
       //在courseInfo课程基本信息，包含 一级分类id 和 二级分类id
       this.courseInfo=response.data.courseInfo

       //得到所有分类信息，包括一级和二级的
       subject.getSubjectList().then(response=>{
          this.subjectOneList=response.data.list

          //把所有一级分类进行遍历
          for(var i=0;i<this.subjectOneList.length;i++){
              var oneSubject=this.subjectOneList[i]
              //比较当前courseInfo的id和所有一级分类的id
              if(oneSubject.id==this.courseInfo.subjectParentId){
                  //获得一级分类里面的二级分类
                  this.subjectTwoList=oneSubject.children
              }
          }
       })
          //初始化所有讲师
    this.getListTeacher()
 
   })
    },
  //上传封面成功调用的方法
        handleAvatarSuccess(res, file) {
            this.courseInfo.cover = res.data.url
        },
        //上传之前调用的方法
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg'
            const isLt2M = file.size / 1024 / 1024 < 2

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!')
            }
            return isJPG && isLt2M
        },
 //点击某个一级分类，触发change，显示对应二级分类,value就是用户点击时的一级分类id值，给框架封装好了
 subjectLevelOneChanged(value){
  //遍历所有分类
   for(var i=0;i<this.subjectOneList.length;i++) {
     //每个一级分类
     var oneSubject=this.subjectOneList[i]
     //如果一级分类的id和用户选的id一样
     if(value===oneSubject.id){
       this.subjectTwoList=oneSubject.children
         //把二级分类id值清空
      this.courseInfo.subjectId = ''
     }
   }
 },
         //查询所有的讲师
      getListTeacher() {
     course.getListTeacher().then(response=>{
      this.teacherList= response.data.items
     })  },
     
     //查询所有分类
     getOneSubject(){
     subject.getSubjectList().then(response=>{
       this.subjectOneList=response.data.list
     })
     },

//添加
add(){
      course.addCourseInfo(this.courseInfo)
                .then(response => {
                    //提示
                    this.$message({
                        type: 'success',
                        message: '添加课程信息成功!'
                    });
                    //跳转到第二步
                    this.$router.push({path:'/course/chapter/'+response.data.courseId})
                })
},
//修改
update(){
    course.updateCourseInfo(this.courseInfo)
                .then(response => {
                    //提示
                    this.$message({
                        type: 'success',
                        message: '修改课程信息成功!'
                    });
                    //跳转到第二步
                    this.$router.push({path:'/course/chapter/'+this.courseId})
                })
},

//判断添加还是修改
 saveOrUpdate() {
          if(!this.courseId){
              //添加 
              this.add()
               }
              else{
                  //修改
              this.update()
              }
        
        }
}}
</script>
<style scoped>
.tinymce-container {
  line-height: 29px;
}
</style>