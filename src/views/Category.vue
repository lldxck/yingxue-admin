<template>
  <div class="category-page">
    <div class="operate-btn">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="add"
        >添加</el-button
      >
    </div>
    <el-table
      :data="data"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="name" label="名称" width="300px">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="title" :visible.sync="categoryDialog">
      <el-form :model="category">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="category.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="父级分类" :label-width="formLabelWidth">
          <el-select
            v-model="category.parentId"
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
import {
  categoryAdd,
  categoryOne,
  categorys,
  delCategory,
  updateCategory,
} from "services/category";
export default {
  name: "category",
  data() {
    return {
      categoryDialog: false,
      formLabelWidth: "100px",
      data: [],
      categoryOneData: [],
      category: {
        name: "",
        parentId: "",
      },
    };
  },
  computed: {
    title() {
      return this.category.id ? "修改" : "添加";
    },
  },
  mounted() {
    this.list();
    this.categoryOne();
  },
  methods: {
    list() {
      categorys().then((res) => {
        if (res.code == this.$statusCode.SUCCESS) {
          // 转换tree数据
          this.data = this.toTree(res.data);
          console.log(this.data);
        } else {
          this.$utils.showMessage(this.$status.ERROR, res.message);
        }
      });
    },
    toTree(data) {
      // 筛选一级数据
      const list = data.filter((item) => item.parentId == null);
      list.map((item) => {
        item.children = this.findChildren(item, data);
      });
      return list;
    },
    findChildren(cItem, data) {
      const list = data.filter((item) => item.parentId == cItem.id);
      list.map((item) => {
        item.children = this.findChildren(item, data);
      });
      return list;
    },
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
        parentId: "",
      };
      this.categoryOne();
      this.categoryDialog = true;
    },
    cancel() {
      this.categoryDialog = false;
    },
    submit() {
      const params = {};
      params.name = this.category.name;
      if (this.category.parentId) {
        params.parentId = this.category.parentId;
      }
      if (this.category.id) {
        params.id = this.category.id;
        updateCategory(JSON.stringify(params)).then((res) => {
          if (res.code == this.$statusCode.SUCCESS) {
            this.$utils.showMessage(this.$status.SUCCESS, res.message);
            this.categoryDialog = false;
            this.list();
          } else {
            this.$utils.showMessage(this.$status.ERROR, res.message);
          }
        });
      } else {
        categoryAdd(JSON.stringify(params)).then((res) => {
          if (res.code == this.$statusCode.SUCCESS) {
            this.$utils.showMessage(this.$status.SUCCESS, res.message);
            this.categoryDialog = false;
            this.list();
          } else {
            this.$utils.showMessage(this.$status.ERROR, res.message);
          }
        });
      }
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.category = row;
      this.categoryDialog = true;
    },
    handleDelete(index, row) {
      console.log(index, row);
      delCategory(row.id).then((res) => {
        if (res.code == this.$statusCode.SUCCESS) {
          this.$utils.showMessage(this.$status.SUCCESS, res.message);
          this.list();
        } else {
          this.$utils.showMessage(this.$status.ERROR, res.message);
        }
      });
    },
  },
};
</script>
