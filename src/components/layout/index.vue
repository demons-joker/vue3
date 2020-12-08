
  <template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" />
      <a-menu theme="dark" v-model:selectedKeys="selectedKeys" mode="inline">
        <a-menu-item key="1">
          <router-link to="/index">
            <car-outlined />
            <span>司机管理</span>
          </router-link>
        </a-menu-item>
        <!-- <a-menu-item key="2"
          >
          <router-link to="/client">
          <user-outlined />
          <span>客户管理</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="3">
          <solution-outlined />
          <span>订单管理</span>
        </a-menu-item>
        <a-menu-item key="4">
          <shopping-cart-outlined />
          <span>交易记录</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <template #title>
            <span><setting-outlined /><span>系统管理</span></span>
          </template>
          <a-menu-item key="5">用户管理</a-menu-item>
          <a-menu-item key="6">角色管理</a-menu-item>
          <a-menu-item key="7">菜单管理</a-menu-item>
        </a-sub-menu> -->
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <router-view class="main"></router-view>
    </a-layout>
  </a-layout>
</template>
<script>
import {
  // ShoppingCartOutlined,
  // UserOutlined,
  CarOutlined,
  // SolutionOutlined,
  // SettingOutlined,
} from "@ant-design/icons-vue";

export default {
  components: {
    // ShoppingCartOutlined,
    // UserOutlined,
    CarOutlined,
    // SolutionOutlined,
    // SettingOutlined,
  },
  data() {
    return {
      collapsed: false,
      selectedKeys: ["1"],
    };
  },
};
</script>

<style lang="scss" scope>
.main {
  width: 100%;
  background-color: #fff;
}
</style>