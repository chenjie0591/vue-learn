<template>
  <div>
    <h3>4等分布局</h3>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="content">1</div>
      </el-col>
      <el-col :span="6">
        <div class="content">2</div>
      </el-col>
      <el-col :span="6">
        <div class="content">3</div>
      </el-col>
      <el-col :span="6">
        <div class="content">4</div>
      </el-col>
    </el-row>
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.content {
  background-color: #000;
  color: #ffffff;
}

.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>