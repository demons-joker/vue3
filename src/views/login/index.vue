<template>
  <div class="lognBox">
    <div class="snow-container">
      <div class="snow foreground"></div>
      <div class="snow foreground layered"></div>
      <div class="snow middleground"></div>
      <div class="snow middleground layered"></div>
      <div class="snow background"></div>
      <div class="snow background layered"></div>
    </div>
    <a-form
      class="formBox"
      layout="inline"
      :model="formInline"
      @submit="handleSubmit"
    >
      <a-form-item>
        <a-input v-model:value="formInline.userName" placeholder="用户名">
          <template v-slot:prefix>
            <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-model:value="formInline.password"
          type="password"
          placeholder="密码"
        >
          <template v-slot:prefix>
            <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          :disabled="formInline.userName === '' || formInline.password === ''"
          >登录</a-button
        >
        <!-- <a-button
          type="primary"
          html-type="button"
          @click="register"
          :disabled="formInline.userName === '' || formInline.password === ''"
          >注册</a-button
        > -->
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { login, register } from "../../services/login";

export default {
  components: {
    UserOutlined,
    LockOutlined,
  },
  data() {
    return {
      formInline: {
        userName: "",
        password: "",
      },
      key: "",
      encrypted: "",
    };
  },
  methods: {
    handleSubmit() {
      this.$store.dispatch("login", this.formInline).then((res) => {
        this.$router.push({ name: "home" });
      });
    },
    register() {
      register(this.formInline).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.lognBox {
  height: 100vh;
  background: url("../../../static/images/banner.jpg") no-repeat center center;
  background-size: cover;
  .formBox {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .snow-container {
    position: absolute;
    height: 100vh;
    width: 100%;
    max-width: 100%;
    top: 0;
    overflow: hidden;
    z-index: 2;
    pointer-events: none;
    .snow-container.two {
      height: 440px;
    }
    .snow {
      display: block;
      position: absolute;
      z-index: 2;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      pointer-events: none;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
      -webkit-animation: snow linear infinite;
      animation: snow linear infinite;
    }
    .snow.foreground {
      background-image: url("../../../static/images/1.png");
      -webkit-animation-duration: 15s;
      animation-duration: 15s;
    }
    .snow.foreground.layered {
      -webkit-animation-delay: 7.5s;
      animation-delay: 7.5s;
    }
    .snow.middleground {
      background-image: url("../../../static/images/2.png");
      -webkit-animation-duration: 20s;
      animation-duration: 20s;
    }
    .snow.middleground.layered {
      -webkit-animation-delay: 10s;
      animation-delay: 10s;
    }
    .snow.background {
      background-image: url("../../../static/images/3.png");
      -webkit-animation-duration: 30s;
      animation-duration: 30s;
    }
    .snow.background.layered {
      -webkit-animation-delay: 15s;
      animation-delay: 15s;
    }

    @-webkit-keyframes snow {
      0% {
        -webkit-transform: translate3d(0, -100%, 0);
        transform: translate3d(0, -100%, 0);
      }
      100% {
        -webkit-transform: translate3d(15%, 100%, 0);
        transform: translate3d(15%, 100%, 0);
      }
    }

    @keyframes snow {
      0% {
        -webkit-transform: translate3d(0, -100%, 0);
        transform: translate3d(0, -100%, 0);
      }
      100% {
        -webkit-transform: translate3d(15%, 100%, 0);
        transform: translate3d(15%, 100%, 0);
      }
    }

    @media (max-width: 1366px) {
      .snow-container {
        position: absolute;
        height: 628px;
      }
    }
    @media (max-width: 1280px) {
      .snow-container {
        position: absolute;
        height: 578px;
      }
    }
    @media (max-width: 1080px) {
      .snow-container {
        position: absolute;
        height: 498px;
      }
    }
    @media (max-width: 1054px) {
    }
    @media (max-width: 1024px) {
    }
    @media (max-width: 991px) {
      .snow-container.two {
        height: 365px;
      }
    }
    @media (max-width: 800px) {
      .snow-container {
        position: absolute;
        height: 375px;
      }
      .snow-container.two {
        height: 352px;
      }
    }
    @media (max-width: 768px) {
      .snow-container {
        position: absolute;
        height: 373px;
      }
    }
  }
}
</style>
