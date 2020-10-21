
<template>

  <div class="app-container">

    讲师列表
 <!--查询表单,inline变为一行-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="courseQuery.title" placeholder="课程名"/>
      </el-form-item>

     <el-form-item>
        <el-select v-model="courseQuery.status" clearable placeholder="课程状态">
          <el-option value="Normal" label="已发布"/>
          <el-option value="Draft" label="未发布"/>
        </el-select>
        
      </el-form-item>

     
      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" icon="el-icon-delete" @click="resetData()">清空</el-button>
    </el-form>
    
    <!-- 表格 -->
    <el-table
      :data="list"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="名称" width="300" />

      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.status==='Draft'?'未发布':'已发布' }}
        </template>
      </el-table-column>

      <el-table-column prop="price" label="价格" width="80" />


      <el-table-column prop="gmtCreate" label="添加时间" width="160"/>

     

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <router-link :to="'/course/info/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑课程基本信息</el-button>
          </router-link>

       <router-link :to="'/course/chapter/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑课程大纲</el-button>
          </router-link>

          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->

    <el-pagination

      :current-page="page"

      :page-size="limit"

      :total="total"

      style="padding: 30px 0; text-align: center;"

      layout="total, prev, pager, next, jumper"

      @current-change="getList"

    />
     
   
  </div>

   
     
</template>
<script>

import course from '@/api/edu/course'

export default {
  //写代码核心位置
  // data:{

  // },
  data(){//另外一种形式
   return {
 list:null,//查询之后接口返回集合
          page:1,//当前页
          limit:4,//每页记录数
          total:0,//总记录数
          courseQuery:{} //条件封装对象
   }
  },
  created(){
this.getList()
  },
  methods:{
  //讲师列表的方法
  getList(page=1){
    this.page=page
    course.getCourseListPage(this.page,this.limit,this.courseQuery)
    .then(response=>{
      this.list=response.data.rows
      this.total=response.data.total
      console.log(this.list)   
                    console.log(this.total)
    })
  },
  resetData() {//清空的方法
            //表单输入项数据清空
            this.courseQuery = {}
           
            this.getList()
        },
        //删除课程的方法
        removeDataById(id) {
            this.$confirm('此操作将永久删除课程记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {  //点击确定，执行then方法
                //调用删除的方法
                course.deleteCourseId(id)
                    .then(response =>{//删除成功
                    //提示信息
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    //回到列表页面
                    this.getList()
                })
            }) //点击取消，执行catch方法
        }
}}
</script>