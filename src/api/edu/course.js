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
  },
  getCourseInfoApi(id) {
    return request({
      url: `/eduService/course/getCourseInfo/${id}`,
      method: 'get'
    })
  },
  getCourseInfoForPublishApi(id) {
    return request({
      url: `/eduService/course/getCourseInfoForPublish/${id}`,
      method: 'get'
    })
  },
  updateCourseInfo(courseInfo) {
    return request({
      url: `/eduService/course/updateCourseInfo`,
      method: 'post',
      data: courseInfo
    })
  },
  getAllCourseInfoList() {
    return request({
      url: `/eduService/course/getAllCourseInfoList`,
      method: 'get'
    })
  },
  getPageList(pageIndex, pageLimit, eduCourse) {
    return request({
      url: `/eduService/course/getPageList/${pageIndex}/${pageLimit}`,
      method: 'post',
      data: eduCourse
    })
  }
}

