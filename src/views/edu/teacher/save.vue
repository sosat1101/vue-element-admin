<template>
  <div class="app-container">
    添加讲师
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name" />
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model.number="teacher.sort" controls-position="right" :min="1" />
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <!--

            数据类型一定要和取出的json中的一致，否则没法回填

            因此，这里value使用动态绑定的值，保证其数据类型是number

          -->
          <el-option :value="1" label="高级讲师" />
          <el-option :value="2" label="首席讲师" />
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career" />
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea" />
      </el-form-item>
      <!-- 讲师头像：TODO -->

      <!-- 讲师头像 -->
      <el-form-item label="讲师头像">
        <!-- 头衔缩略图 -->
        <pan-thumb :image="teacher.avatar" />
        <!-- 文件上传按钮 -->
        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像
        </el-button>
        <!--
v-show：是否显示上传组件
:key：类似于id，如果一个页面多个图片上传控件，可以做区分
:url：后台上传的url地址
@close：关闭上传组件
@crop-upload-success：上传成功后的回调 -->
        <image-cropper
          v-show="imagecropperShow"
          :key="imagecropperKey"
          :width="300"
          :height="300"
          :url="BASE_API + '/eduOss/fileOss/upload'"
          field="avatar"
          @close="close"
          @crop-upload-success="cropSuccess"
        />
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import teacherApi from '@/api/edu/teacher'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      teacher: {
        sort: 0
      },
      saveBtnDisabled: false,
      imagecropperShow: false,
      imagecropperKey: 0,
      BASE_API: process.env.VUE_APP_BASE_API

    }
  },
  watch: {
    $route(to, form) {
      console.log('watch $route')
      // this.init()
    }
  },
  created() {
    // this.fetchData()
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id
      this.fetchDataById(id)
    }
  },
  methods: {
    close() {
      this.imagecropperShow = false
    },
    cropSuccess(data) {
      this.teacher.avatar = data
      this.close()
    },

    // 根据讲师id查询方法
    async fetchDataById(id) {
      const { data } = await teacherApi.getTeacherById(id)
      this.teacher = data
    },
    saveOrUpdate() {
      this.saveBtnDisabled = true
      if (this.teacher.id == null) {
        this.saveData()
      } else {
        this.updateData()
      }
    },
    async saveData() {
      const {
        code
      } = await teacherApi.saveTeacher(this.teacher)
      if (code === 20000) {
        // 提示信息
        this.$message({
          type: 'success',
          message: '添加成功'
        })
        // 回到列表页面
        this.$router.push({ path: '/teacher/index' })
      }
    },
    async updateData() {
      const { code } = await teacherApi.updateTeacher(this.teacher)
      if (code === 20000) {
        // 提示信息
        this.$message({
          type: 'success',
          message: '更新成功'
        })
        // 回到列表页面
        this.$router.push({ path: '/teacher/index' })
      }
    }
  }
}
</script>
