<template>
  <a-layout class="components-layout">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <div class="menu-list">
        <a-menu
          mode="inline"
          :open-keys="openKeys"
          theme="dark"
          @openChange="onOpenChange"
        >
          <a-sub-menu key="sub1">
            <span slot="title"><a-icon type="mail" /><span>Navigation One</span></span>
            <a-menu-item key="1">
              <router-link to="/login">Go to Login</router-link></a-menu-item
            >
            <a-menu-item key="2"> Option 2 </a-menu-item>
            <a-menu-item key="3"> Option 3 </a-menu-item>
            <a-menu-item key="4"> Option 4 </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <span slot="title"
              ><a-icon type="appstore" /><span>Navigation Two</span></span
            >
            <a-menu-item key="5"> Option 5 </a-menu-item>
            <a-menu-item key="6"> Option 6 </a-menu-item>
            <a-sub-menu key="sub3" title="Submenu">
              <a-menu-item key="7"> Option 7 </a-menu-item>
              <a-menu-item key="8"> Option 8 </a-menu-item>
            </a-sub-menu>
          </a-sub-menu>
          <a-sub-menu key="sub4">
            <span slot="title"
              ><a-icon type="setting" /><span>Navigation Three</span></span
            >
            <a-menu-item key="9"> Option 9 </a-menu-item>
            <a-menu-item key="10"> Option 10 </a-menu-item>
            <a-menu-item key="11"> Option 11 </a-menu-item>
            <a-menu-item key="12"> Option 12 </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </div>
    </a-layout-sider>
    <a-layout>
      <a-layout-header
        style="background: #fff; padding: 0; height: 64px"
        class="layout-header"
      >
        <div class="header-left">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
          <!-- 面包屑区域 -->
          <div class="breadcrumb">
            <a-breadcrumb separator=">">
              <a-breadcrumb-item>Home</a-breadcrumb-item>
              <a-breadcrumb-item href=""> Application Center </a-breadcrumb-item>
              <a-breadcrumb-item href=""> Application List </a-breadcrumb-item>
              <a-breadcrumb-item>An Application</a-breadcrumb-item>
            </a-breadcrumb>
          </div>
        </div>

        <div class="user-avatar">
          <a-dropdown :placement="'bottomCenter'">
            <a-avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              @click="(e) => e.preventDefault()"
              ><a-icon type="down" />
            </a-avatar>
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;" @click="logout">退出登录</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        Content
        <!-- <router-view /> -->
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
      rootSubmenuKeys: ["sub1", "sub2", "sub4"],
      openKeys: ["sub1"],
    };
  },
  methods: {
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find((key) => this.openKeys.indexOf(key) === -1);
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>
<style lang="less" scoped>
@import url("../../assets/css/home.less");
.components-layout {
  height: 100vh;
}
.components-layout .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
  // display: inline-block;
}

.components-layout .trigger:hover {
  color: #1890ff;
}

.components-layout .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.layout-header .header-left {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.layout-header .breadcrumb {
  height: 32px;
  line-height: 32px;
  margin: 16px;
}
.layout-header .user-avatar {
  margin-right: 50px;
}
</style>
