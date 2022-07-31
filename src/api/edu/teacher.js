import request from '@/utils/request'

export default {
  getTeacherListPage(current, limit, teacherQueryVo) {
    return request({
      url: `/eduService/edu-teacher/pageTeacher/${current}/${limit}`,
      method: 'post',
      data: teacherQueryVo
    })
  },
  removeTeacherByIdRequest(id) {
    return request({
      url: `/eduService/edu-teacher/${id}`,
      method: 'delete'
    })
  },
  saveTeacher(teacher) {
    return request({
      url: `/eduService/edu-teacher/addTeacher`,
      method: 'post',
      data: teacher
    })
  },
  getTeacherById(id) {
    return request({
      url: `/eduService/edu-teacher/getTeacher/${id}`,
      method: 'get'
    })
  },
  updateTeacher(teacher) {
    return request({
      url: `/eduService/edu-teacher/update`,
      method: 'put',
      data: teacher
    })
  }
}
