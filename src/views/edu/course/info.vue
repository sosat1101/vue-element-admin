<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>
    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="最终发布" />
    </el-steps>

    <el-form label-width="120px">

      <el-form-item label="课程标题">
        <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写" />
      </el-form-item>

      <!-- 所属分类 TODO -->
      <el-form-item label="课程分类">
        <el-select v-model="courseInfo.subjectParentId" placeholder="一级分类" @change="subjectLevelOneChanged">
          <el-option v-for="subject in subjectTreeVo" :key="subject.id" :label="subject.title" :value="subject.id" />
        </el-select>

        <!-- 二级分类 -->
        <el-select v-model="courseInfo.subjectId" placeholder="二级分类">
          <el-option v-for="subject in subjectChildrenList" :key="subject.id" :label="subject.title" :value="subject.id" />
        </el-select>
      </el-form-item>

      <!-- 课程讲师 TODO -->
      <!-- 课程讲师 -->
      <el-form-item label="课程讲师">
        <el-select v-model="courseInfo.teacherId" placeholder="请选择">
          <el-option v-for="teacher in teacherList" :key="teacher.id" :label="teacher.name" :value="teacher.id" />
        </el-select>
      </el-form-item>

      <el-form-item label="总课时">
        <el-input-number v-model="courseInfo.lessonNum" :min="0" controls-position="right" placeholder="请填写课程的总课时数" />
      </el-form-item>

      <!-- 课程简介 TODO -->
      <el-form-item label="课程简介">
        <el-input v-model="courseInfo.description" placeholder=" " />
      </el-form-item>

      <!-- 课程封面 TODO -->
      <!-- 课程封面-->
      <el-form-item label="课程封面">
        <el-upload
          ref="upload"
          :show-file-list="false"
          :on-success="handleCoverSuccess"
          :before-upload="beforeCoverUpload"
          :action="BASE_API+'/eduOss/fileOss/upload'"
          class="avatar-uploader"
        >
          <img :src="courseInfo.cover">
        </el-upload>
      </el-form-item>

      <div>
        <tinymce v-model="content" :height="300" />
      </div>
      <!-- <div class="editor-content" v-html="content" /> -->

      <el-form-item label="课程价格">
        <el-input-number v-model="courseInfo.price" :min="0" controls-position="right" placeholder="免费课程请设置为0元" /> 元
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next">保存并下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import course from '@/api/edu/course'
import subject from '@/api/edu/subject'
import ppl from '@@/ppl.jpeg'
import Tinymce from '@/components/Tinymce'

export default {
  components: { Tinymce },
  data() {
    return {
      active: 1,
      saveBtnDisabled: false,
      courseInfo: {
        title: '',
        // 二级分类id
        subjectId: '',
        // 一级分类id
        subjectParentId: '',
        teacherId: '',
        lessonNum: 0,
        description: '',
        cover: ppl,
        price: 0
      },
      teacherList: [],
      subjectTreeVo: [],
      subjectChildrenList: [],
      BASE_API: process.env.VUE_APP_BASE_API,
      OSS_PATH: process.env.OSS_BUCKET_PATH, // 阿里云OSS地址
      content: ''
    }
  },
  created() {
    this.subjectTreeGetData()
    this.teacherListGetData()
  },
  methods: {
    async subjectTreeGetData() {
      const { data } = await subject.getSubjectTreeApi()
      this.subjectTreeVo = data
    },
    subjectLevelOneChanged() {
      for (const subject of this.subjectTreeVo) {
        if (subject.id === this.courseInfo.subjectParentId) {
          this.subjectChildrenList = subject.children
          this.courseInfo.subjectId = ''
        }
      }
    },
    async teacherListGetData() {
      const { data } = await course.getAllTeacherListApi()
      this.teacherList = data
    },
    next() {
      course.saveCourseInfoApi(this.courseInfo).then(response => {
        if (response.code === 20000) {
          this.$message({
            type: 'success',
            message: '添加课程信息成功!'
          })
          this.$router.push({
            path: `/course/chapter/${response.data.id}`
          })
        }
      })
    },
    handleCoverSuccess(res, file) {
      console.log(res)
      this.courseInfo.cover = res.data
    },
    beforeCoverUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>
<style scoped>
  .editor-content{
    margin-top: 20px;
  }
</style>
