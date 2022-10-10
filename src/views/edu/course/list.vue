<template>
  <div class="app-container">
    课程列表
    <el-form :inline="true" :model="course" class="demo-form-inline">
      <el-form-item label="课程名称">
        <el-input v-model="course.title" placeholder="课程名称" />
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="course.status" clearable placeholder="课程状态">
          <el-option value="Normal" label="已发布" />
          <el-option value="Draft" label="未发布" />
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="fetchData()">查询</el-button>
      <el-form-item>
        <el-button type="primary" @click="resetData()">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="listLoading" :data="list" element-loading-text="数据加载中" border fit highlight-current-row>
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="title" label="课程名称" width="150" />
      <el-table-column label="课程状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.status === 'Draft' ? "未发布" : "已发布" }}
        </template>
      </el-table-column>
      <el-table-column prop="viewCount" label="浏览次数" width="80" />
      <el-table-column prop="lessonNum" width="100" label="课时数" />
      <el-table-column prop="gmtCreate" label="添加时间" width="160" />
      <el-table-column label="操作" width="300" align="center">
        <template slot-scope="scope">
          <router-link :to="'/teacher/edit/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑课程的基本信息</el-button>
          </router-link>
          <router-link :to="'/teacher/edit/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑课程大纲</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeTeacherById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="fetchData"
    />
  </div>
</template>

<script>
import courseApi from '@/api/edu/course'
export default {
  data() {
    return {
      page: 1,
      limit: 5,
      course: {},
      total: 0,
      list: [],
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData(page = 1) {
      console.log('page')
      console.log(page)
      this.page = page
      const { data } = await courseApi.getPageList(this.page, this.limit, this.course)
      this.list = data.records
      this.listLoading = false
      this.total = data.total
    },
    resetData() {
      this.course = {}
    }
  }
}
</script>
