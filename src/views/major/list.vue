
<template>

  <div class="app-container">

    专业列表

    
    <!-- 表格 -->
    <el-table
      :data="list"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="序号"
        width="100"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="name" label="名称" width="80" />

     

      <el-table-column prop="createTime" label="添加时间" width="160"/>


      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/major/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
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
//引入调用teacher.js文件
import major from '@/api/major'

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
   }
  },
  created(){
this.getList()
  },
  methods:{
  //讲师列表的方法
  getList(page=1){
    this.page=page
    major.getMajorListPage(this.page,this.limit)
    .then(response=>{
      this.list=response.data.rows
      this.total=response.data.total
      console.log(this.list)   
                    console.log(this.total)
    })
  },
  resetData() {//清空的方法
            //查询所有讲师数据
            this.getList()
        },
        //删除讲师的方法
        removeDataById(id) {
            this.$confirm('此操作将永久删除年级记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {  //点击确定，执行then方法
                //调用删除的方法
                major.deleteMajor(id)
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