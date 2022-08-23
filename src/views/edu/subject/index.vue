<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="输入关键字进行过滤" />

    <el-tree ref="tree" class="filter-tree" :data="data" :props="defaultProps" default-expand-all :filter-node-method="filterNode" />
  </div>
</template>

<script>
import subject from '@/api/edu/subject'
export default {
  data() {
    return {
      filterText: '',
      data: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },

  created() {
    this.getSubjectTree()
  },
  methods: {
    async getSubjectTree() {
      const {
        data
      } = await subject.getSubjectTreeApi()
      this.data = data
    },

    filterNode(value, data) {
      if (!value) return true
      return data.title.indexOf(value) !== -1
    }
  }
}
</script>
