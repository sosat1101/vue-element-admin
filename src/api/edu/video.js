import request from '@/utils/request'
export default {
  // 1 添加课程小节
  addVideo(video) {
    return request({
      url: '/eduService/edu-video/addVideo',
      method: 'post',
      data: video
    })
  },
  // 修改章节
  edit(video) {
    return request({
      url: `/eduService/edu-video/edit`,
      method: 'post',
      data: video
    })
  },
  // 删除章节
  deleteVideo(id) {
    return request({
      url: `/eduService/edu-video/${id}`,
      method: 'delete'
    })
  }
}
