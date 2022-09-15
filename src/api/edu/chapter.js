import request from '@/utils/request'
export default {
  // 1 根据课程ID获取章节和小节
  getAllChapterVideo(courseId) {
    return request({
      url: `/eduService/chapter/getChapterVideo/${courseId}`,
      method: 'get'
    })
  },
  // 根据id获取章节信息
  getChapterInfo(chapterId) {
    return request({
      url: `/eduService/chapter/getChapterInfo/${chapterId}`,
      method: 'get'
    })
  },
  // 添加章节
  addChapter(eduChapter) {
    return request({
      url: `/eduService/chapter/addChapter`,
      method: 'post',
      data: eduChapter
    })
  },
  // 修改章节
  edit(eduChapter) {
    return request({
      url: `/eduService/chapter/edit`,
      method: 'post',
      data: eduChapter
    })
  },
  // 删除章节
  deleteChapter(id) {
    return request({
      url: `/eduService/chapter/${id}`,
      method: 'delete'
    })
  }
}
