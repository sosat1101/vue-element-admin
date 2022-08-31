import request from '@/utils/request'
export default {
  // 1 保存课程
  saveCourseInfoApi(courseInfo) {
    return request({
      url: `/eduService/course/addCourseInfo`,
      method: 'post',
      data: courseInfo
    })
  },
  getAllTeacherListApi() {
    return request({
      url: '/eduService/edu-teacher/getAll',
      method: 'get'
    })
  }

}

