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
        <router-link
          :to="item.path"
          v-for="item in menuRoutes"
          :key="item.path"
          active-class="router-link-active"
        >
          <el-menu-item
            :index="cItem.meta.title"
            v-for="cItem in item.children"
            :key="cItem.meta.title"
          >
            <i :class="cItem.meta.icon"></i>
            <span slot="title">{{ cItem.meta.title }}</span>
          </el-menu-item>
        </router-link>
      </el-menu>
      <el-container>
        <el-header class="layout-header">
          <div class="header-left">
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
            <!-- 面包屑 -->
            <el-breadcrumb separator="/" class="breadcrumb-container">
              <el-breadcrumb-item :to="isCurrentRoute ? { path: '/index' } : ''"
                >首页</el-breadcrumb-item
              >
              <el-breadcrumb-item v-if="isCurrentRoute">{{
                isCurrentRoute.meta.title
              }}</el-breadcrumb-item>
            </el-breadcrumb>
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
import { routes } from "router";
export default {
  name: "layout",
  data() {
    return {
      isCollapse: false,
      defaultActive: "首页",
      isCurrentRoute: null,
    };
  },
  computed: {
    menuRoutes() {
      return routes.filter((item) => item.children);
    },
  },
  mounted() {
    this.defaultActive = this.$route.meta.title;
    if (this.$route.meta.title != "首页") {
      this.isCurrentRoute = this.$route;
    } else {
      this.isCurrentRoute = null;
    }
  },
  watch: {
    $route() {
      this.defaultActive = this.$route.meta.title;
      if (this.$route.meta.title != "首页") {
        this.isCurrentRoute = this.$route;
      } else {
        this.isCurrentRoute = null;
      }
    },
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
