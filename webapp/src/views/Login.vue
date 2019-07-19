<template>
  <div id="login-page">
    <el-card class="box-card">

      <!-- Title -->
      <el-row>
        <el-col :span="24">
          <h3 class="title"> Login </h3>
        </el-col>
      </el-row>

      <!-- Form -->
      <el-form
        :model="formData"
        status-icon
        ref="loginForm"
        label-width="80px"
        class="login-form"
      >
        <!-- Username Input -->
        <el-form-item label="Username" prop="username">
          <el-input v-model="formData.username"></el-input>
        </el-form-item>

        <!-- Password Input -->
        <el-form-item label="Password" prop="password">
          <el-input type="password" v-model="formData.password" autocomplete="off"></el-input>
        </el-form-item>

        <!-- Submit -->
        <el-form-item>
          <el-button type="primary" @click="login">
            Log in
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "landing",
  data() {
    return {
      formData: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      const redirectTo = _.get(this.$route, "query.redirect") || "/";
      this.$store.dispatch("authenticate", this.formData);
      this.$router.push(redirectTo);
    }
  }
}
</script>

<style lang="scss" scoped>
  #login-page {
    max-width: 500px;
    margin: 0 auto;
    .title {
      text-indent: 80px;
    }
    .box-card {
      margin-top: 5rem;
      padding: 2rem;
    }
  }
</style>

