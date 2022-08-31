<template>

  <div class="app-container">
    <h2 style="text-align: center;">章节</h2>
    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="最终发布" />
    </el-steps>

    <el-form label-width="120px">
      <el-form-item>
        <el-button @click="previous">上一步</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next">保存并下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import chapter from '@/api/edu/chapter'
export default {
  data() {
    return {
      active: 1,
      saveBtnDisabled: false,
      chapterVideoList: []
    }
  },
  created() {
    this.getChapterVideo()
  },
  methods: {
    getChapterVideo() {
      chapter.getAllChapterVideo(1)
        .then(response => {
          this.chapterVideoList = response.data
        })
    },
    previous() {
      this.$router.push({ path: '/course/info/1' })
    },
    next() {
      // if (this.active++ > 2) this.active = 0
      this.$router.push({ path: '/course/publish/1' })
    }
  }
}
</script>
