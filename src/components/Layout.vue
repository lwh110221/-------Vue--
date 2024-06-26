<template>
  <div class="layout-container">
    <div class="topbar-container">
      <div class="brand">
        来了老弟
      </div>
      <div class="user-info">
        <font-awesome-icon :icon="['fas', 'user']" class="user-icon" />
        <span class="username">{{ name }}</span>&nbsp;&nbsp;&nbsp;
        <el-button @click="logout" type="primary">退出</el-button>
      </div>
    </div>
    <div class="main-content">
      <div class="sidebar-container">
        <div class="menu-top">
          <router-link 
            v-for="(item, index) in menuItems" 
            :key="index" 
            :to="item.href" 
            :class="['menu-item', { active: activeItem === index }]" 
            @click.native="setActive(index)">
            <font-awesome-icon :icon="item.icon" class="menu-icon" />
            <span>{{ item.name }}</span>
          </router-link>
        </div>
        <div class="menu-bottom">
          <router-link 
            v-for="(item, index) in bottomItems" 
            :key="index" 
            :to="item.href" 
            :class="['menu-item', { active: activeItem === index + menuItems.length }]" 
            @click.native="setActive(index + menuItems.length)">
            <font-awesome-icon :icon="item.icon" class="menu-icon" />
            <span>{{ username }}</span>
          </router-link>
        </div>
      </div>
      <div class="content">
        <router-view /> <!-- 用于显示当前路由的组件 -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return {
      activeItem: 0,
      username: '————',
      menuItems: [
        { name: '首页', icon: ['fas', 'home'], href: '/main/home' },
        { name: '测试', icon: ['fas', 'search'], href: '/main/search' },
      ],
      bottomItems: [
        { name: 'Account', icon: ['fas', 'user'], href: '#' },
      ]
    };
  },
  created() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.name = user.name;
      this.username= user.username;
    }
  },
  methods: {
    setActive(index) {
      this.activeItem = index;
    },
    logout() {
      localStorage.removeItem('user');
      this.$router.push('/');
    }
  }
}
</script>


<style scoped>
/* 布局样式 */
.layout-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* 顶部栏样式 */
.topbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2e3a8c;
  padding: 10px 20px;
  color: white;
}
.topbar-container .brand {
  font-size: 24px;
  font-weight: bold;
}
.topbar-container .user-info {
  display: flex;
  align-items: center;
}
.topbar-container .user-icon {
  font-size: 24px;
  margin-right: 10px;
}
.topbar-container .username {
  font-size: 18px;
  font-weight: bold;
}

/* 侧边栏样式 */
.sidebar-container {
  height: calc(100vh - 60px); 
  width: 130px;
  background-color: #2e3a8c;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.sidebar-container .menu-item {
  display: flex;
  align-items: center;
  padding: 20px;
  color: rgb(255, 255, 255);
  cursor: pointer;
  overflow: hidden;
  text-decoration: none; 
  transition: background-color 0.3s ease, color 0.3s ease;
}
.sidebar-container .menu-item .itemname {
  font-weight: bolder;
}
.sidebar-container .menu-item:hover {
  background-color: #3949ab;
}
.sidebar-container .menu-item.active {
  background-color: #1a237e;
  color: #ffeb3b; /* 你可以根据需要调整突出显示的颜色 */
}
.sidebar-container .menu-item .menu-icon {
  font-size: 24px;
  margin-right: 16px;
}
.sidebar-container .menu-item span {
  white-space: nowrap;
}
.menu-top, .menu-bottom {
  display: flex;
  flex-direction: column;
}

/* 主内容区域样式 */
.main-content {
  display: flex;
  flex: 1;
  flex-direction: row;
  overflow: hidden;
}
.content {
  flex: 1;
  padding: 20px;
  overflow-y: auto; /* 仅在内容区域启用垂直滚动 */
}
</style>
