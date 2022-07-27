import request from '@/utils/request'

export default {
  getTeacherListPage(current, limit, teacherQueryVo) {
    console.log(teacherQueryVo)
    return request({
      // url: '/eduService/edu-teacher/pageTeacher/' + current + '/' + limit,
      url: `/eduService/edu-teacher/pageTeacher/${current}/${limit}`,
      method: 'post',
      // data 表示把对象变为json传递
      data: teacherQueryVo
    })
  },
  removeTeacherByIdRequest(id) {
    return request({
      url: `/eduService/edu-teacher/${id}`,
      method: 'delete'
    })
  }
}
