<template>
  <!-- 入口文件 -->
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo" />

      <a-menu
        theme="dark"
        mode="inline"
        :selectedKeys="selectedKeys"
        :default-selected-keys="[$route.path]"
        :inline-collapsed="collapsed"
        @select="selectMenuItem"
      >
        <template v-for="item in menuList">
          <a-sub-menu :key="item.pageUrl" v-if="item.children.length > 0">
            <span slot="title"
              ><a-icon type="user" /><span>{{ item.menuName }}</span></span
            >
            <a-menu-item v-for="sun in item.children" :key="sun.pageUrl">
              <router-link :to="item.pageUrl">
                {{ sun.menuName }}
              </router-link>
            </a-menu-item>
          </a-sub-menu>

          <a-menu-item :key="item.pageUrl" v-else>
            <router-link :to="item.pageUrl">
              <a-icon type="video-camera" />
              <span>{{ item.menuName }}</span>
            </router-link>
          </a-menu-item>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <keep-alive>
        <a-layout-content
          :style="{
            margin: '24px 16px',
            padding: '24px',
            background: '#fff',
            minHeight: '280px',
          }"
        >
          <!-- 面包屑 -->
          <a-breadcrumb
            :routes="routes"
            style="background-color: #f0f2f5; padding: 10px 0"
            separator=">"
          >
            <template slot="itemRender" slot-scope="{ route, params, routes }">
              <span v-if="routes.length === 1">
                {{ route.meta.title }}
              </span>
              <!-- <router-link v-else :to="`${route.path}`">
                {{ route.meta.title }}
              </router-link> -->
            </template>
          </a-breadcrumb>
          <transition>
            <router-view />
          </transition>
        </a-layout-content>
      </keep-alive>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
      selectedKeys: ["/admin"],
      menuList: [
        {
          id: "0",
          menuName: "首页11",
          pageUrl: "/admin",
          title: "首页",
          children: [],
        },
        {
          id: "1",
          menuName: "文章管理",
          pageUrl: "/wzgl",
          title: "文章",
          children: [
            {
              id: "1-1",
              menuName: "文章概览",
              pageUrl: "/wzgl",
              title: "文章概览",
            },
          ],
        },
        {
          id: "2",
          menuName: "人员管理",
          pageUrl: "/rygl",
          title: "人员",
          children: [],
        },
        {
          id: "3",
          menuName: "系统设置",
          pageUrl: "/xtgl",
          title: "系统",
          children: [],
        },
      ],
      routes: [],
    };
  },
  created() {
    this.routes = this.$route.matched.filter((item) => item.meta.title);
  },
  methods: {
    selectMenuItem(item, key) {
      console.log(item, key);
      console.log("11");
      this.$router.push({ path: key });
    },
  },
  watch: {
    // 监听路由变化
    $route(e) {
      this.routes = e.matched.filter((items) => items.meta.title);
      this.selectedKeys = [e.path];
    },
  },
};
</script>
<style scoped="scoped">
#components-layout-demo-custom-trigger {
  height: 100vh;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
