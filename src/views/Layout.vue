<template>
  <div class="layout-page">
    <el-container>
      <el-menu
        default-active="1-4-1"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">导航一</span>
          </template>
          <el-menu-item-group>
            <span slot="title">分组一</span>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <span slot="title">选项4</span>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
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
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              个人中心<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-plus">个人中心</el-dropdown-item>
              <el-dropdown-item icon="el-icon-check">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main><router-view /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "layout",
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    handleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>
