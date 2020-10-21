import request from '@/utils/request'

export default{

    //1.讲师列表（分页条件查询）
    //current当前页 limit每页记录数 teacherQuery条件对象
    getTeacherListPage(current,limit,teacherQuery){
        return request({
           // url: '/eduservice/teacher/pageTeacherCondition/'+current+"/"+limit,
           url:`/eduservice/teacher/pageTeacherCondition/${current}/${limit}`,
            method: 'post',
            //teacherQuery条件对象，后端使用RequestBody获取数据
            //data表示把对象转换json进行传递到接口里面
            data:teacherQuery
          })
    },
    //删除讲师
    deleteTeacherId(id) {
        return request({
            url: `/eduservice/teacher/${id}`,
            method: 'delete'
          })
    },
    //添加讲师
    addTeacher(teacher){
        return request({
            url:'/eduservice/teacher/addTeacher',
            method:'post',
            data:teacher
        })
    },
    //通过id获取教师数据
    getTeacherInfo(id){
    return request({
        url:`/eduservice/teacher/getTeacher/${id}`,
        method:'get'
    })
    },
    //修改讲师
    updateTeacherInfor(teacher){
        return request({
            url:'/eduservice/teacher/updateTeacher',
            method:'post',
            data:teacher
        })
    }
}