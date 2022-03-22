<template>
  <div class="login-page">
    <div class="login-form">
      <div class="login-title">登录</div>
      <el-form :model="loginForm">
        <el-form-item>
          <el-input
            placeholder="请输入账号"
            prefix-icon="el-icon-user-solid"
            v-model="loginForm.username"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-model="loginForm.password"
            show-password
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="login"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      this.$router.push({ path: "/index" });
    },
  },
};
</script>
