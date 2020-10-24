import request from '@/utils/request'

export default{

    //1.讲师列表（分页条件查询）
    //current当前页 limit每页记录数
    getMajorListPage(current,limit){
        return request({
           // url: '/eduservice/teacher/pageTeacherCondition/'+current+"/"+limit,
           url:`/major/pageListMajor/${current}/${limit}`,
            method: 'get',
          })
    },
    //删除专业
    deleteMajor(id) {
        return request({
            url: `/major/${id}`,
            method: 'delete'
          })
    },
    //添加专业
    addMajor(grade){
        return request({
            url:'/major/addMajor',
            method:'post',
            data:teacher
        })
    },
   
    //修改专业
    updateMajor(major){
        return request({
            url:'/major/updateMajor',
            method:'post',
            data:major
        })
    }
}