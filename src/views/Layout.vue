<template>
  <div class="layout-page">
    <el-container>
      <el-menu
        :default-active="defaultActive"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-document"></i>
          <span slot="title">分类</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-setting"></i>
          <span slot="title">用户</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">视频</span>
        </el-menu-item>
      </el-menu>
      <el-container>
        <el-header class="layout-header">
          <div>
            <el-button
              icon="el-icon-s-unfold"
              v-if="isCollapse"
              @click="handleCollapse"
            ></el-button>
            <el-button
              icon="el-icon-s-fold"
              v-else
              @click="handleCollapse"
            ></el-button>
          </div>
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              个人中心<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-plus" command="1"
                >个人中心</el-dropdown-item
              >
              <el-dropdown-item icon="el-icon-check" command="2"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main><router-view /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { loginOut } from "services/login";
export default {
  name: "layout",
  data() {
    return {
      isCollapse: false,
      defaultActive: "1",
    };
  },
  methods: {
    handleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    loginOut() {
      const token = JSON.parse(localStorage.getItem("loginInfo")).token;
      console.log(token);
      loginOut(token).then((res) => {
        if (res.code == this.$statusCode.SUCCESS) {
          localStorage.removeItem("loginInfo");
          this.$router.replace({ path: "/login" });
        } else {
          this.$utils.showMessage(this.$status.ERROR, res.message);
        }
      });
    },
    handleCommand(command) {
      switch (command) {
        case "1":
          break;
        case "2":
          this.loginOut();
          break;
        default:
          break;
      }
    },
  },
};
</script>
