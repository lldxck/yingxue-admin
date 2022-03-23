<template>
  <div class="user-page">
    <div class="search-container">
      <el-input v-model="id" placeholder="用户ID"></el-input>
      <el-input v-model="name" placeholder="用户名称"></el-input>
      <el-input v-model="phone" placeholder="手机号"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="search"
        >搜索</el-button
      >
    </div>
    <el-table :data="data" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="180"> </el-table-column>
      <el-table-column prop="name" label="用户名" width="180">
      </el-table-column>
      <el-table-column prop="avatar" label="头像" width="180">
      </el-table-column>
      <el-table-column prop="intro" label="简介"> </el-table-column>
      <el-table-column prop="phone" label="手机号" width="220">
      </el-table-column>
      <el-table-column prop="openid" label="微信openid" width="220">
      </el-table-column>
    </el-table>
    <div class="pagination-container" v-if="totalCount > 0">
      <el-pagination
        background
        layout="sizes,prev, pager, next"
        :total="totalCount"
        :page-size="pageSize"
        :page-sizes="pageSizes"
        @size-change="sizeChange"
        @current-change="currentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { users } from "services/user";
export default {
  name: "user",
  data() {
    return {
      data: [],
      id: "",
      name: "",
      phone: "",
      pageIndex: 1,
      pageSize: 1,
      totalCount: 0,
      pageSizes: [1, 2, 10],
    };
  },
  mounted() {
    this.list();
  },
  methods: {
    list() {
      const params = {};
      params.page = this.pageIndex;
      params.per_page = this.pageSize;
      params.id = this.id;
      params.name = this.name;
      params.phone = this.phone;
      users(params).then((res) => {
        if (res.code == this.$statusCode.SUCCESS) {
          this.data = res.data.records;
          this.totalCount = res.data.totalCount;
        } else {
          this.$utils.showMessage(this.$status.ERROR, res.message);
        }
      });
    },
    search() {
      this.list();
    },
    currentChange(val) {
      this.pageIndex = val;
      this.list();
    },
    sizeChange(val) {
      this.pageSize = val;
      this.list();
    },
  },
};
</script>
