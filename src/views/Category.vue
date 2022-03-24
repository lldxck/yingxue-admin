<template>
  <div class="category-page">
    <div class="operate-btn">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="add"
        >添加</el-button
      >
    </div>
    <el-dialog title="添加" :visible.sync="categoryDialog">
      <el-form :model="category">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="category.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="父级分类" :label-width="formLabelWidth">
          <el-select
            v-model="category.parent_id"
            placeholder="请选择父级分类，不选时为根分类"
          >
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in categoryOneData"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { categoryAdd, categoryOne } from "services/category";
export default {
  name: "category",
  data() {
    return {
      categoryDialog: false,
      formLabelWidth: "100px",
      categoryOneData: [],
      category: {
        name: "",
        parent_id: "",
      },
    };
  },
  mounted() {
    this.categoryOne();
  },
  methods: {
    categoryOne() {
      categoryOne().then((res) => {
        if (res.code == this.$statusCode.SUCCESS) {
          this.categoryOneData = res.data;
        } else {
          this.$utils.showMessage(this.$status.ERROR, res.message);
        }
      });
    },
    add() {
      this.category = {
        name: "",
        parent_id: "",
      };
      this.categoryOne();
      this.categoryDialog = true;
    },
    cancel() {},
    submit() {
      const params = {};
      params.name = this.category.name;
      if (this.category.parent_id) {
        params.parent_id = this.category.parent_id;
      }
      categoryAdd(JSON.stringify(params)).then((res) => {
        if (res.code == this.$statusCode.SUCCESS) {
          this.$utils.showMessage(this.$status.SUCCESS, res.message);
          this.categoryDialog = false;
        } else {
          this.$utils.showMessage(this.$status.ERROR, res.message);
        }
      });
    },
  },
};
</script>
