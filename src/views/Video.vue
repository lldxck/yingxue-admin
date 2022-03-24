<template>
  <div class="video-page">
    <div class="search-container">
      <el-input v-model="id" placeholder="视频ID"></el-input>
      <el-input v-model="name" placeholder="视频名称"></el-input>
      <el-select v-model="category_id" placeholder="请选择分类">
        <el-option
          v-for="item in categoryData"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <el-input v-model="uploader_name" placeholder="up主名称"></el-input>
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
    </div>
    <el-table :data="data" border style="width: 100%">
      <el-table-column prop="date" label="ID" width="80"> </el-table-column>
      <el-table-column prop="name" label="标题" width="80"> </el-table-column>
      <el-table-column prop="name" label="封面" width="80"> </el-table-column>
      <el-table-column prop="name" label="简介"> </el-table-column>
      <el-table-column prop="address" label="up主" width="80">
      </el-table-column>
      <el-table-column prop="address" label="分类" width="80">
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
      category_id: "",
      uploader_name: "",
      categoryData: [],
      data: [],
      pageSizes: [1, 2, 10],
      pageSize: 10,
      pageIndex: 1,
      totalCount: 0,
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
          this.categoryData = res.data.records;
        } else {
          this.$utils.showMessage(this.$status.ERROR, res.message);
        }
      });
    },
    list() {
      const params = {};
      params.id = this.id;
      params.name = this.name;
      params.category_id = this.category_id;
      params.uploader_name = this.uploader_name;
      params.page = this.pageIndex;
      params.per_page = this.pageSize;
      videos(params).then((res) => {
        if (res.code == this.$statusCode.SUCCESS) {
          this.data = res.data.records;
        } else {
          this.$utils.showMessage(this.$status.ERROR, res.message);
        }
      });
    },
    sizeChange(val) {
      this.pageIndex = val;
      this.list();
    },
  },
};
</script>
