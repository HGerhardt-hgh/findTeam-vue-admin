import request from '@/utils/request'

export default{

    //1.添加课程
    addCourseInfo(courseInfo){
        return request({
            url: '/eduservice/course/addCourseInfo',
            method: 'post',
            data:courseInfo
          })
    },
    
     //2 查询所有讲师
     getListTeacher() {
        return request({
            url: '/eduservice/teacher/findAll',
            method: 'get'
          })
    },
    //根据课程id查询课程基本信息
    getCourseInfoId(id) {
        return request({
            url: '/eduservice/course/getCourseInfo/'+id,
            method: 'get'
          })
    },
    //修改课程信息
    updateCourseInfo(courseInfo) {
        return request({
            url: '/eduservice/course/updateCourseInfo',
            method: 'post',
            data: courseInfo
          })
    },
    //根据课程id查询课程发布信息
    getCoursePublish(courseId){
        return request({
            url: '/eduservice/course/getCoursePublishInfo/'+courseId,
            method: 'get'  
          })
    },
    //发布课程
    publishCourse(courseId){
        return request({
            url: '/eduservice/course/publishCourse/'+courseId,
            method: 'get'  
          })
    },
    //根据条件查询课程列表信息
    //current当前页 limit每页记录数 courseQuery条件对象
    getCourseListPage(current,limit,courseQuery){
        return request({
           
           url:`/eduservice/course/pageCourseCondition/${current}/${limit}`,
            method: 'post',
            data:courseQuery
          })
    },
    //删除课程信息
    deleteCourseId(id) {
        return request({
            url: `/eduservice/course/${id}`,
            method: 'delete'
          })
    }
}