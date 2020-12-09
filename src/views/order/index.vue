<template>
  <div class="indexBox">
    <div class="chsbox">
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
    </a-table>
  </div>
</template>
<script>
import * as fs from "fs";
import {
  getOrderInfoList,
} from "../../services/order";
import {
  deleteDriverById,
  getDriver,
  updateDriverInfo,
} from "../../services/driver";
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
      modalTitle: "审核",
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
          title: "订单号",
          dataIndex: "order_code",
        },
        {
          title: "微信id",
          dataIndex: "wxId",
        },
        {
          title: "金额(元)",
          dataIndex: "total",
        },
        {
          title: "下单时间",
          dataIndex: "createDate",
        },
      ],
      form: {
        id: "",
        userName: "",
        phone: "",
        gender: "",
        age: "",
        status: "",
        carLicensePic: "",
        drivingLicensePic: "",
      },
      carLicensePic: "",
      drivingLicensePic: "",
      rules: {
        name: [
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
              if (/^((((d{3,4})|d{3,4})?d{7,8})|(1[3-9][0-9]{9}))$/.test(value)) {
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
      getOrderInfoList(params).then((res) => {
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
