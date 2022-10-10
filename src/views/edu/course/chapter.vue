<!-- eslint-disable vue/html-closing-bracket-newline -->
<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>
    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="最终发布" />
    </el-steps>

    <el-button type="text" @click="openChapterDialog()">添加章节</el-button>
    <ul class="chapterList">
      <li
        v-for="(chapter) in chapterVideoList"
        :key="chapter.id"
      >
        <!-- <p> -->
        {{ chapter.title }}
        <span class="acts">
          <el-button style="" type="text" @click="showVideoDia(chapter.id)">添加小节</el-button>
          <el-button style="" type="text" @click="openEditChatper(chapter)">编辑</el-button>
          <el-button type="text" @click="removeChapter(chapter.id)">删除</el-button>
        </span>
        <!-- </p> -->
        <ul class="chapterList videoList">
          <li v-for="(videoItem) in chapter.videoVoList" :key="videoItem.id">
            <!-- <p> -->
            {{ videoItem.title }}
            <span class="acts">
              <el-button style="" type="text" @click="openEditVideo(videoItem.id)">编辑</el-button>
              <el-button type="text" @click="removeVideo(videoItem.id)">删除</el-button>
            </span>
            <!-- </p> -->
          </li>
        </ul>
      </li>
    </ul>
    <el-dialog title="添加章节" :visible.sync="dialogFormVisible">
      <el-form :model="chapterInput">
        <el-form-item label="章节标题" :label-width="formLabelWidth">
          <el-input v-model="chapterInput.title" autocomplete="off" />
        </el-form-item>
        <el-form-item label="章节排序" :label-width="formLabelWidth">
          <el-input-number v-model="chapterInput.sort" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加和修改小节表单 -->
    <el-dialog :visible.sync="dialogVideoFormVisible" title="添加小节">
      <el-form :model="videoInput" label-width="120px">
        <el-form-item label="小节标题">
          <el-input v-model="videoInput.title" />
        </el-form-item>
        <el-form-item label="小节排序">
          <el-input-number v-model="videoInput.sort" :min="0" controls-position="right" />
        </el-form-item>
        <el-form-item label="是否免费">
          <el-radio-group v-model="videoInput.free">
            <el-radio :label="true">免费</el-radio>
            <el-radio :label="false">默认</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传视频">
          <!-- TODO -->
          <el-upload
            :on-success="handleVodUploadSuccess"
            :on-remove="handleVodRemove"
            :before-remove="beforeVodRemove"
            :on-exceed="handleUploadExceed"
            :name="videoFile"
            :file-list="fileList"
            :action="BASE_API+'/eduvod/video/uploadAliyun'"
            :limit="1"
            multiple
            class="upload-demo">
            <el-button size="small" type="primary">上传视频</el-button>
            <el-tooltip placement="right-end">
              <div slot="content">最大支持1G，<br>
                支持3GP、ASF、AVI、DAT、DV、FLV、F4V、<br>
                GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、<br>
                MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、<br>
                SWF、TS、VOB、WMV、WEBM 等视频格式上传</div>
              <i class="el-icon-question" />
            </el-tooltip>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdateVideo">确 定</el-button>
      </div>
    </el-dialog>

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
import videoApi from '@/api/edu/video'
export default {
  data() {
    return {
      BASE_API: process.env.VUE_APP_BASE_API,
      video: {
        title: '',
        sort: 0,
        videoSourceId: '',
        videoOriginalName: ''
      },
      active: 1,
      saveBtnDisabled: false,
      chapterVideoList: [],
      chapterInput: {},
      courseId: '',
      dialogFormVisible: false,
      dialogVideoFormVisible: false,
      videoInput: {},
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      fileList: []
    }
  },
  created() {
    // this.courseId = this.$route.path.split('/')[3]
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id
      this.getChapterVideo()
    }
  },
  methods: {
    openEditVideo() {

    },
    beforeVodRemove(file, fileList) {
      return this.$confirm(`确认删除${file.name}吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger'
      })
    },
    handleVodRemove() {
      videoApi.deleteAliyunVideo(this.videoInput.videoSourceId).then(res => {
        if (res.code === 20000) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.fileList = []
        }
      })
    },
    // 上传视频成功调用的方法
    handleVodUploadSuccess(response, file, fileList) {
      response.data.id = this.videoInput.videoSourceId
      this.videoInput.videoSourceId = response.data.videoId
      this.videoInput.videoOriginalName = response.data.videoOriginalName
      // 上传视频名称赋值
    },
    handleUploadExceed() {
      this.$message.warning('想要重新上传视频，请先删除已上传的视频')
    },
    // =================================小节操作=================================================
    showVideoDia(chapterId) {
      this.dialogVideoFormVisible = true
      this.videoInput.chapterId = chapterId
      this.videoInput.courseId = this.courseId
    },
    saveOrUpdateVideo() {
      videoApi.addVideo(this.videoInput).then(response => {
        if (response.code === 20000) {
          this.$message({
            type: 'success',
            message: '添加小节信息成功!'
          })
          this.dialogVideoFormVisible = false
          this.getChapterVideo()
        }
      })
    },
    removeVideo(id) {
      this.$confirm('确认删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        videoApi.deleteVideo(id).then(response => {
          if (response.code === 20000) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getChapterVideo()
          }
        })
      })
    },
    // =================================章节操作=================================================
    openEditChatper(chapter) {
      console.log('openEditChatper')
      console.log(chapter)
      this.dialogFormVisible = true
      this.chapterInput = chapter
    },
    openChapterDialog() {
      this.dialogFormVisible = true
      this.chapterInput = {}
    },
    removeChapter(id) {
      this.$confirm('确认删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        chapter.deleteChapter(id).then((response) => {
          // const { data } = response;
          if (response.code === 20000) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getChapterVideo()
          }
        })
      })
      console.log('我是异步哦')
    },
    addChapter() {
      this.chapterInput.courseId = this.courseId
      chapter.addChapter(this.chapterInput).then(response => {
        this.dialogFormVisible = false
        this.$message({
          type: 'success',
          message: '添加章节信息成功!'
        })
        this.getChapterVideo()
      })
    },
    updateChapter() {
      this.chapterInput.courseId = this.courseId
      chapter.edit(this.chapterInput).then(response => {
        this.dialogFormVisible = false
        this.$message({
          type: 'success',
          message: '修改章节信息成功!'
        })
        this.getChapterVideo()
      })
    },
    saveOrUpdate() {
      if (this.chapterInput.id != null) {
        console.log('更新')
        this.updateChapter()
      } else {
        this.addChapter()
      }
    },
    getChapterVideo() {
      this.chapterVideoList = chapter.getAllChapterVideo(this.courseId)
        .then(response => {
          this.chapterVideoList = response.data
        })
    },
    previous() {
      this.$router.push({
        path: `/course/info/${this.courseId}`
      })
    },
    next() {
      // if (this.active++ > 2) this.active = 0
      this.$router.push({
        path: `/course/publish/${this.courseId}`
      })
    }
  }
}
</script>

<style scoped>
.chapterList {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}

.chapterList li {
  position: relative;
}

.chapterList p {
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #DDD;
}

.chapterList .acts {
  float: right;
  font-size: 14px;
}

.videoList {
  padding-left: 50px;
}

.videoList p {
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #DDD;
}
</style>
