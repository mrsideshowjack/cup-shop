<template>
<div id="SidebarToggle">
  <span>Consentua Info </span>
   <el-switch v-model="open" ></el-switch>
</div>
</template>

<script>
  export default {
    name: 'sidebar-toggle',
    computed: {
      open:{
        get: function () {
          return this.$store.state.sidebarOpen
        },
        set: function () {
          this.$store.dispatch('toggleSidebar')
        }
      }
    }
  }
</script>
<style scoped>
#SidebarToggle{
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 170px;
  border: 1px solid #dcdfe6;
  background: #fff;
  color: #606266;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  margin: 0.5rem;
}
</style>

