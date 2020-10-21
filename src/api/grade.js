import request from '@/utils/request'

export default{

    //1.讲师列表（分页条件查询）
    //current当前页 limit每页记录数
    getGradeListPage(current,limit){
        return request({
           // url: '/eduservice/teacher/pageTeacherCondition/'+current+"/"+limit,
           url:`/grade/pageListGrade/${current}/${limit}`,
            method: 'get',
          })
    },
    //删除年级
    deleteGrade(id) {
        return request({
            url: `/grade/${id}`,
            method: 'delete'
          })
    },
    //添加年级
    addGrade(grade){
        return request({
            url:'/grade/addGrade',
            method:'post',
            data:teacher
        })
    },
   
    //修改年级
    updateGrade(grade){
        return request({
            url:'/grade/updateGrade',
            method:'post',
            data:grade
        })
    }
}