<template>
  <div id="app">
    <!-- 功能按钮 -->
    <div class="button-area">
      <el-button
        v-if="this.buttonName[0]"
        type="primary"
        @click="addClassification"
        >{{ this.buttonName[0] }}</el-button>
      <el-button v-if="this.buttonName[1]" type="primary" @click="addProduct">{{
        this.buttonName[1]
      }}</el-button>
    </div>
    <!-- 树形结构列表 -->
    <div class="table-area">
      <el-table
        :data="tableData"
        ref="singleTable"
        @cell-click="setCurrent"
        @cell-dblclick="editName"
        v-loading="loading"
        style="width: 100%;margin-bottom: 20px;"
        highlight-current-row
        row-key="id"
        :border="this.border"
        :fit="fit"
        :default-expand-all="expandAll"
        :tree-props="{ children: 'childs' }"
      >
        <el-table-column
          prop="name"
          :label="this.tableHead.name"
          minWidth="210"
          :show-overflow-tooltip="this.showTooltip"
        >
        </el-table-column>
        <el-table-column
          prop="description"
          :label="this.tableHead.describe"
          minWidth="167"
          align="center"
          :show-overflow-tooltip="this.showTooltip"
        >
        </el-table-column>
        <el-table-column
          v-if="this.tableHead.type"
          prop="typeName"
          :label="this.tableHead.type"
          minWidth="117"
          align="center"
          :show-overflow-tooltip="this.showTooltip"
        >
        </el-table-column>
        <el-table-column
          v-if="this.tableHead.leval"
          prop="levalName"
          :label="this.tableHead.leval"
          minWidth="117"
          align="center"
          :show-overflow-tooltip="this.showTooltip"
        >
        </el-table-column>
        <el-table-column
          :prop="this.tableHead.indexCount"
          :label="this.tableHead.count"
          minWidth="100"
          align="center"
          :show-overflow-tooltip="this.showTooltip"
        >
        </el-table-column>
        <el-table-column
          :prop="this.tableHead.dimensionCount"
          :label="this.tableHead.dimensionsNumber"
          minWidth="100"
          align="center"
          :show-overflow-tooltip="this.showTooltip"
        >
        </el-table-column>
        <el-table-column
          prop="creatorErp"
          label="创建人"
          minWidth="160"
          align="center"
          :show-overflow-tooltip="this.showTooltip"
        >
        </el-table-column>
        <el-table-column
          prop="createdDate"
          label="最近更新时间"
          minWidth="176"
          align="center"
          :show-overflow-tooltip="this.showTooltip"
          sortable
        >
        </el-table-column>
        <el-table-column
          label="操作"
          minWidth="150"
          align="center"
          :show-overflow-tooltip="this.showTooltip"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="openDeleteItem(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹框 -->
    <div>
      <el-dialog
        :title="this.form.title"
        :visible.sync="dialogFormVisible"
        @close="closeDialog"
      >
        <el-form :model="form" :rules="inner2Rules" ref="formItem">
          <el-form-item
            :label="this.tableHead.name"
            prop="name"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="form.name"
              autocomplete="off"
              :clearable="true"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="this.tableHead.describe"
            prop="description"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="form.description"
              autocomplete="off"
              :clearable="true"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelRequest">取 消</el-button>
          <el-button type="primary" @click="addRequest">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
// import './element-variables.scss'

export default {
  name: 'management',
  props: {
    buttonName: {
      type: Array,
      // required: true,
    },
    url: {
      type: Object,
      required: true,
    },
    tableHead: {
      type: Object,
      // required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
  },
  data() {
    const checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入名称'));
      }
      setTimeout(() => {
        if (!/^[\da-zA-Z_\u4e00-\u9fa5]{1,20}$/.test(value)) {
          callback(new Error('1-20个字符，可由中文、字母、下划线和数字组成'));
        } else {
          callback();
        }
      }, 100);
      return true;
    };
    const checkDescription = (rule, value, callback) => {
      // if (!value) {
      //   return callback(new Error('请输入描述'))
      // }
      setTimeout(() => {
        if (!/^.{0,100}$/.test(value)) {
          callback(new Error('0-100个字符组成'));
        } else {
          callback();
        }
      }, 100);
    };
    return {
      tableData: [],
      indexRow: {}, // 当前操作的内容行
      expandAll: false,
      dialogFormVisible: false,
      form: {
        name: '',
        id: '',
        delivery: false,
        description: '',
        title: '',
        parentId: 0,
      },
      formLabelWidth: '120px',
      border: true,
      fit: true,
      loading: true,
      routeName: '',
      showTooltip: true,
      inner2Rules: {
        name: [{ required: true, validator: checkName, trigger: 'blur' }],
        description: [
          { required: false, validator: checkDescription, trigger: 'blur' },
        ],
      },
      delItem: {}, // 要被删除的对象
      dialogSureVisible: false,
    };
  },
  methods: {
    // 请求列表
    async requestList() {
      const response = await this.$api.post(
        `/dataFocus${this.url.req}`,
        '请求',
        false,
      );
      if (response.result === '1') {
        this.tableData = response.data;
        this.loading = false;
        this.tableData = this.delWithData(this.tableData);
      } else {
        this.$message({
          showClose: true,
          message: response.msg,
          type: 'error',
        });
      }
    },
    delWithData(item) {
      if (this.routeName === 'businessCategory') {
        item.forEach(i => {
          i.typeName = '业务大类';
          if (i.childs) {
            this.appendChidBuss(i.childs);
          }
        });
        return item;
      } else if (this.routeName === 'indexClassification') {
        this.appendChidLeval(item);
        return item;
      } else {
        return item;
      }
    },
    appendChidBuss(item) {
      item.forEach(i => {
        i.typeName = '产品归属';
        if (i.childs) {
          this.appendChidBuss(i.childs);
        }
      });
    },
    appendChidLeval(item) {
      item.forEach(i => {
        i.levalName = '一级';
        if (i.childs) {
          i.childs.forEach(j => {
            j.levalName = '二级';
            if (j.childs) {
              j.childs.forEach(k => {
                k.levalName = '三级';
              });
            }
          });
        }
      });
    },
    // 添加大类按钮
    addClassification() {
      this.dialogFormVisible = true;
      this.form.title = this.buttonName[0];
      this.indexRow = {};
      this.form.name = '';
      this.form.id = '';
      this.form.description = '';
      this.form.parentId = 0;
    },
    // 添加产品归属/添加子主题
    addProduct() {
      if (this.indexRow.levelNo >= 3) {
        return this.$message.error('子主题最多三级，无法继续添加！');
      } else if (!this.indexRow.id) {
        return this.$message.error(this.tableHead.errMesg);
      } else if (this.tableHead.code) {
        if (this.indexRow.parentId) {
          return this.$message.error(this.tableHead.errMesg);
        } else {
          this.dialogFormVisible = true;
          this.form.name = '';
          this.form.description = '';
          this.form.title = this.buttonName[1];
          this.form.parentId = this.indexRow.id;
          this.form.id = '';
        }
      } else {
        this.dialogFormVisible = true;
        this.form.title = this.buttonName[1];
        this.form.parentId = this.indexRow.id;
        this.form.name = '';
        this.form.description = '';
        this.form.id = '';
      }
      return true;
    },
    // 添加操作行
    setCurrent(row) {
      this.indexRow = row;
      // this.form.title = this.indexRow.type ? '产品归属' : '业务大类'
      this.form.name = '';
      this.form.description = '';
    },
    // 修改名称/修改描述
    editName(key) {
      this.form.title = '修改';
      this.setCurrent(key);
      this.dialogFormVisible = true;
      // this.$refs.formItem.resetFields()
      this.form.name = key.name;
      this.form.description = key.description;
      this.form.id = key.id;
      this.form.parentId = key.parentId;
    },
    // 确定完成按钮发请求
    addRequest() {
      this.$refs.formItem.validate(async valid => {
        if (valid) {
          const newObj = {
            name: this.form.name,
            description: this.form.description,
            parentId: this.form.parentId,
            id: this.form.id,
          };
          // 发请求
          const response = await this.$api.post(
            `/dataFocus${this.url.edit}`,
            newObj,
            '请求',
            false,
          );
          if (response.result === '1') {
            this.$message({
              message: '保存成功！',
              type: 'success',
            });
            this.requestList();
            this.form.name = '';
            this.form.description = '';
            this.form.parentId = 0;
            this.form.id = '';
            this.loading = false;
            this.dialogFormVisible = false;
            this.indexRow = {};
          } else {
            this.$message.error(response.msg);
          }
        }
      });
    },
    // 取消按钮发请求
    cancelRequest() {
      this.dialogFormVisible = false;
      // this.form.name = ''
      // this.form.description = ''
      this.indexRow = {};
      this.form.id = '';
      this.$refs.formItem.resetFields();
    },
    closeDialog() {
      this.requestList();
      this.$refs.singleTable.setCurrentRow();
    },
    // 删除按钮
    openDeleteItem(key) {
      this.delItem = key;
      // this.dialogSureVisible = true
      if (this.delItem.indexCount === 0 || this.delItem.dimensionCount === 0) {
        this.$confirm('删除后将不能够使用，确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(async () => {
          const response = await this.$api.post(
            `/dataFocus${this.url.del}`,
            { id: this.delItem.id },
            '请求',
            false,
          );
          if (response.result === '1') {
            this.$message({
              message: '删除成功！',
              type: 'success',
            });
            this.delItem = {};
            this.indexRow = {};
            this.requestList();
          } else {
            this.$message({
              showClose: true,
              message: response.msg,
              type: 'error',
            });
            this.delItem = {};
            this.indexRow = {};
            this.requestList();
            this.$refs.singleTable.setCurrentRow();
          }
        });
      } else {
        this.$alert(`${this.tableHead.count}不为0，不可删除！`, '提示', {
          confirmButtonText: '确定',
          type: 'warning',
        });
        this.delItem = {};
        this.indexRow = {};
        this.requestList();
      }
    },
  },
  mounted() {
    this.routeName = this.$route.name;
    this.requestList();
  },
};
</script>
<style scoped>
#app {
  padding: 0 15px 15px 15px;
  background: #fff;
}
.table-area {
  border-right: none;
  background: #fff;
}
.el-table th > .cell {
  font-family: "微软雅黑 Bold", "微软雅黑";
  font-weight: 700;
  font-style: normal;
  font-size: 12px;
  color: #656565;
}
.el-table thead th {
  height: 51px;
  text-align: center;
  padding: 0;
}
.el-table__row {
  height: 49px;
}
.el-table,
.el-table__expanded-cell {
  background: #f5f5f5;
  border-right: none;
}
.text-center {
  width: 80%;
  text-align: center;
}
.el-table--enable-row-transition .el-table__body td {
  padding: 0;
}
.dialog-footer {
  display: flex;
  justify-content: center;
}
</style>
