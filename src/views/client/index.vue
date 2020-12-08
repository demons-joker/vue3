<template>
  <div class="indexBox">
    <div class="chsbox">
      <a-button type="primary" @click="add"> 新增 </a-button>
      <a-date-picker @change="onChangeDate" />
    </div>

    <a-table
      :rowKey="(record) => record.id"
      class="tableBox"
      :columns="columns"
      :data-source="userList"
      :pagination="pagination"
      bordered
      @change="changeParam"
    >
      <template v-slot:operation="{ record }">
        <a-button @click="showEdit(record)" type="primary">编辑</a-button>

        <a-popconfirm
          title="确定删除选择用户？"
          ok-text="确定"
          cancel-text="取消"
          @confirm="deleteUser(record)"
        >
          <a-button type="danger">删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>

    <a-modal
      wrapClassName="formboxModal"
      :title="modalTitle"
      :width="800"
      v-model:visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="resetForm"
    >
      <div class="formbox">
        <a-form
          ref="ruleForm"
          :rules="rules"
          :model="form"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-item label="姓名" name="userName">
            <a-input v-model:value="form.userName" placeholder="请输入姓名" />
          </a-form-item>
          <a-form-item label="性别">
            <a-select v-model:value="form.gender" placeholder="请选择性别">
              <a-select-option value="男">男</a-select-option>
              <a-select-option value="女">女</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="电话" name="phone">
            <a-input v-model:value="form.phone" />
          </a-form-item>
          <a-form-item label="日期" name="createDate">
            <a-date-picker
              v-model:value="form.createDate"
              placeholder="请选择月份"
              style="width: 100%"
            />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>
<script>
import {
  getClientList,
  getClient,
  addClient,
  deleteClientById,
  updateClientInfo,
} from "../../services/client";
import moment from "moment";
export default {
  data() {
    return {
      userList: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
      },
      modalTitle: "新增",
      params: {
        date: undefined,
        gender: undefined,
      },
      visible: false,
      confirmLoading: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      columns: [
        {
          title: "姓名",
          dataIndex: "userName",
        },
        {
          title: "性别",
          dataIndex: "gender",
          filterMultiple: false,
          filters: [
            { text: "男", value: "男" },
            { text: "女", value: "女" },
          ],
        },
        {
          title: "电话",
          dataIndex: "phone",
        },
        {
          title: "创建时间",
          dataIndex: "createDate",
        },
        {
          title: "操作",
          dataIndex: "operation",
          align: "center",
          width: "180",
          slots: { customRender: "operation" },
        },
      ],
      form: {
        id: "",
        userName: "",
        phone: "",
        gender: "",
        remark: "",
        createDate: "",
      },
      rules: {
        userName: [
          {
            required: true,
            message: "请填写姓名",
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (
                /^((((d{3,4})|d{3,4})?d{7,8})|(1[3-9][0-9]{9}))$/.test(value)
              ) {
                return Promise.resolve();
              } else {
                return Promise.reject("请输入正确的电话号码");
              }
            },
            message: "请输入正确的电话号码",
            trigger: "blur",
          },
        ],
        date: [
          {
            required: true,
            message: "请选择日期",
            trigger: "blur",
            type: "object",
          },
        ],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /**
     * 删除用户
     */
    deleteUser(row) {
      deleteClientById({ userId: row.id }).then((res) => {
        if (res.code == 200) {
          this.$message.success("删除成功");
          this.getList();
        }
      });
    },
    /**
     * 编辑弹窗
     */
    showEdit(row) {
      this.confirmLoading = true;
      getClient({ userId: row.id }).then((res) => {
        if (res.code == 200) {
          this.confirmLoading = false;
          this.modalTitle = "修改";
          this.form = res.data;
          this.form.date = moment(this.form.date, "YYYY-MM-DD");
          this.visible = true;
        }
      });
    },
    /**
     * 新增按钮
     */
    add() {
      this.resetForm();
      this.visible = true;
      this.confirmLoading = false;
    },
    /**
     * 新增or修改用户
     */
    handleOk() {
      if (this.form.id) {
        this.$refs.ruleForm
          .validate()
          .then(() => {
            this.form.date = this.form.date.format("YYYY-MM-DD");
            updateClientInfo(this.form).then((res) => {
              this.$message.success("修改成功");
              this.resetForm();
              this.getList();
            });
          })
          .catch((error) => {
            this.$message.error("填写错误");
          });
      } else {
        this.$refs.ruleForm
          .validate()
          .then(() => {
            this.form.date = this.form.date.format("YYYY-MM-DD");
            addClient(this.form).then((res) => {
              this.$message.success("新增成功");
              this.resetForm();
              this.getList();
            });
          })
          .catch((error) => {
            this.$message.error("填写错误");
          });
      }
    },
    /**
     * 重置表单
     */
    resetForm() {
      this.$refs.ruleForm.resetFields();
      this.visible = false;
    },
    /**
     * 获取用户列表
     */
    getList() {
      const params = Object.assign(
        {
          pageNum: this.pagination.current,
          pageSize: this.pagination.pageSize,
        },
        this.params
      );
      getClientList(params).then((res) => {
        if (res.code == 200) {
          this.userList = res.list || [];
          this.pagination.total = res.count || 0;
        }
      });
    },
    /**
     * 日期选择
     */
    onChangeDate(date, dateString) {
      this.params.date = dateString;
      this.getList();
    },
    /**
     * 关键字分页查询
     */
    changeParam(pagination, filters, sorter, { currentDataSource }) {
      if (filters.gender) {
        this.params.gender = filters.gender[0];
      }
      this.pagination.current = pagination.current;
      this.getList();
    },
  },
};
</script>
<style lang="scss" scoped>
.indexBox {
  width: 100%;
  padding: 50px;
  height: 100vh;
  .chsbox {
    width: 100%;
    padding-bottom: 20px;
    display: flex;
    justify-content: space-between;
  }
}
.formboxModal {
  .formbox {
    width: 100%;
  }
}
</style>
