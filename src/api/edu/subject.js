import request from '@/utils/request'
export default {
  // 1 课程分类列表
  getSubjectTreeApi() {
    return request({
      url: '/eduService/subject/subjectTree',
      method: 'get'
    })
  }
}
