import request from '@/utils/request'
export default {
  // 1 根据课程ID获取章节和小节
  getAllChapterVideo(courseId) {
    return request({
      url: `/eduService/chapter/getChapterVideo/${courseId}`,
      method: 'get'
    })
  }
}
