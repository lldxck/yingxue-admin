<template>
  <div class="video-page">
    <div class="search-container">
      <el-input v-model="id" placeholder="视频ID"></el-input>
      <el-input v-model="name" placeholder="视频名称"></el-input>
      <el-cascader
        v-model="category_id"
        :options="categoryOptions"
        :props="defaultProps"
        :show-all-levels="false"
        @change="handleChange"
        @visible-change="visibleChange"
      ></el-cascader>
      <el-input v-model="uploader_name" placeholder="up主名称"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="search"
        >搜索</el-button
      >
    </div>
    <el-table :data="data" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="80"> </el-table-column>
      <el-table-column prop="title" label="标题" width="120"> </el-table-column>
      <el-table-column label="封面" width="140">
        <template slot-scope="scope">
          <img :src="scope.row.cover" alt style="width: 80px; height: 80px" />
        </template>
      </el-table-column>
      <el-table-column prop="intro" label="简介"> </el-table-column>
      <el-table-column prop="uploaderName" label="up主" width="120">
      </el-table-column>
      <el-table-column prop="categoryName" label="分类" width="120">
      </el-table-column>
    </el-table>
    <div class="pagination-container" v-if="totalCount > 0">
      <el-pagination
        background
        layout="sizes,prev, pager, next"
        :total="totalCount"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        @size-change="sizeChange"
        @current-change="currentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { videos } from "services/video";
import { categorys } from "services/category";
export default {
  name: "videoPage",
  data() {
    return {
      id: "",
      name: "",
      category_id: [],
      uploader_name: "",
      categoryOptions: [],
      data: [],
      pageSizes: [1, 2, 10],
      pageSize: 10,
      pageIndex: 1,
      totalCount: 0,
      defaultProps: {
        value: "id",
        label: "name",
        checkStrictly: true,
      },
    };
  },
  mounted() {
    this.categorys();
    this.list();
  },
  methods: {
    categorys() {
      categorys().then((res) => {
        if (res.code == this.$statusCode.SUCCESS) {
          this.categoryOptions = this.$utils.toTree(res.data, false);
        } else {
          this.$utils.showMessage(this.$status.ERROR, res.message);
        }
      });
    },
    list() {
      const params = {};
      const cId = [...this.category_id];
      params.id = this.id;
      params.name = this.name;
      params.category_id = cId.length == 0 ? "" : cId.pop();
      params.uploader_name = this.uploader_name;
      params.page = this.pageIndex;
      params.per_page = this.pageSize;
      videos(params).then((res) => {
        if (res.code == this.$statusCode.SUCCESS) {
          this.data = res.data.records;
          this.totalCount = res.data.totalCount;
        } else {
          this.$utils.showMessage(this.$status.ERROR, res.message);
        }
      });
    },
    sizeChange(val) {
      this.pageSize = val;
      this.list();
    },
    currentChange(val) {
      this.pageIndex = val;
      this.list();
    },
    search() {
      this.list();
    },
    handleChange(value) {
      console.log(value);
    },
    visibleChange(val) {
      console.log(val);
      console.log(this.category_id);
    },
  },
};
</script>
