<!-- 表格 -->
<template>
  <div class="app-container">
    讲师列表
    <el-form :inline="true" :model="teacherQueryVo" class="demo-form-inline">
      <el-form-item label="讲师姓名">
        <el-input v-model="teacherQueryVo.name" placeholder="讲师姓名" />
      </el-form-item>
      <el-form-item label="讲师等级">
        <el-select v-model="teacherQueryVo.level" placeholder="活动区域">
          <el-option label="高级讲师" value="1" />
          <el-option label="首席讲师" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker v-model="teacherQueryVo.beginTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="创建时间" />
      </el-form-item>
      <el-form-item label="创截止时间">
        <el-date-picker v-model="teacherQueryVo.endTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="创建时间" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchData()">查询</el-button>
      </el-form-item>
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
      <el-table-column prop="name" label="名称" width="80" />
      <el-table-column prop="level" label="头衔" width="80" />
      <!-- <el-table-column label="头衔" width="80">
        <template slot-scope="scope">
          {{ scope.row.level === 1 ? "高级讲师" : "首席讲师" }}
        </template>
      </el-table-column> -->
      <el-table-column prop="intro" width="500" label="资历" />
      <el-table-column prop="gmtCreate" label="添加时间" width="160" />
      <el-table-column prop="sort" label="排序" width="60" />
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/teacher/edit/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeTeacherById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
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
import teacher from '@/api/edu/teacher'
export default {
  data() {
    return {
      page: 1,
      limit: 5,
      teacherQueryVo: {},
      total: 0,
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // fetchData(page = 1) {
    //   this.page = page
    //   teacher
    //     .getTeacherListPage(this.page, this.limit, this.teacherQueryVo)
    //     .then((response) => {
    //       const {
    //         data
    //       } = response
    //       this.total = data.total
    //       this.list = data.records
    //       for (let i = 0; i < this.list.length; i++) {
    //         this.list[i].level === 1
    //           ? (this.list[i].level = '首席')
    //           : (this.list[i].level = '金牌')
    //       }
    //       this.listLoading = false
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     })
    // },
    async fetchData(page = 1) {
      this.page = page
      const { data } = await teacher.getTeacherListPage(this.page, this.limit, this.teacherQueryVo)
      this.total = data.total
      this.list = data.records
      for (let i = 0; i < this.list.length; i++) {
        this.list[i].level === 1
          ? (this.list[i].level = '首席')
          : (this.list[i].level = '金牌')
      }
      this.listLoading = false
    },

    resetData() {
      this.teacherQueryVo = {}
    },
    removeTeacherById(id) {
      this.$confirm('确认删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        teacher.removeTeacherByIdRequest(id).then((response) => {
          // const { data } = response;
          if (response.code === 20000) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.fetchData()
          }
        })
      })
        .catch(() => {
          // this.$message({
          //     type: 'info',
          //     message: '已取消删除'
          // });
        })
    }
  }
}
</script>
