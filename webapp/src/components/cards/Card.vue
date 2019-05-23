<template>
  <div class="gc-card">
    <div class="gc-card-body">
      <el-row :gutter="20">
        <el-col :span="12" class="content-area">
          <slot name="body"></slot>
        </el-col>
        <el-col :span="12" class="text-area">
          <div class="header">
            <slot name="header"></slot>
          </div>
          <div class="text">
            <slot name="text"></slot>
          </div>
        </el-col>
      </el-row>

      <el-row class="footer">
        <slot name="footer"></slot>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'gc-card'
  }
</script>

<style lang="scss" scoped>
  @import '../../styles/colors';

  .gc-card {
    border-radius: 6px;
    box-shadow: 0 2px 2px hsla(38,16%,76%,.5);
    background-color: #fff;
    margin-bottom: 20px;
    position: relative;
    z-index: 1;
    border: none;
    min-width: 3rem;
    min-height: 2rem;

    .gc-card-body {
      padding: 30px 30px;

      .text-area {
        text-align: right;
        color: $color-text-primary;
        .header {
          font-size: 1.2rem;
          margin-bottom: 10px;
        }
        .text {
          font-size: 1.5rem;
        }
      }

      .footer {
        margin-top: 1.5rem;
        padding-top: 0.5rem;
        border-top: 1px solid $color-text-secondary;
        color: $color-text-secondary;
        text-align: right;
        font-size: 0.9rem;
      }
    }
  }
</style>
