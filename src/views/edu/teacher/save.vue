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
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import teacherApi from '@/api/edu/teacher'
export default {
  data() {
    return {
      teacher: {
        sort: 0
      },
      saveBtnDisabled: false
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
