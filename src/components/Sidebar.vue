<template>
  <div class="sidebar-container">
    <div class="menu-top">
      <a 
        v-for="(item, index) in menuItems" 
        :key="index" 
        :href="item.href" 
        :class="['menu-item', { active: activeItem === index }]" 
        @click="setActive(index)">
        <font-awesome-icon :icon="item.icon" class="menu-icon" />
        <span>{{ item.name }}</span>
      </a>
    </div>
    <div class="menu-bottom">
      <a 
        v-for="(item, index) in bottomItems" 
        :key="index" 
        :href="item.href" 
        :class="['menu-item', { active: activeItem === index + menuItems.length }]" 
        @click="setActive(index + menuItems.length)">
        <font-awesome-icon :icon="item.icon" class="menu-icon" />
        <span>{{ item.name }}</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      activeItem: 0,
      menuItems: [
        { name: 'Dashboard', icon: ['fas', 'home'], href: '#' },
        { name: 'Search', icon: ['fas', 'search'], href: '#' },
        { name: 'Insights', icon: ['fas', 'chart-bar'], href: '#' },
        { name: 'Docs', icon: ['fas', 'file-alt'], href: '#' },
        { name: 'Products', icon: ['fas', 'box'], href: '#' },
        { name: 'Settings', icon: ['fas', 'cog'], href: '#' },
        { name: 'Messages', icon: ['fas', 'comments'], href: '#' },
      ],
      bottomItems: [
        { name: 'Account', icon: ['fas', 'user'], href: '#' },
      ]
    };
  },
  methods: {
    setActive(index) {
      this.activeItem = index;
    }
  }
}
</script>

<style scoped>
.sidebar-container {
  position: fixed;
  height: 100vh;
  width: 60px;
  background-color: #2e3a8c;
  transition: width 0.5s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.sidebar-container:hover {
  width: 200px;
}
.sidebar-container .menu-item {
  display: flex;
  align-items: center;
  padding: 20px;
  color: white;
  cursor: pointer;
  overflow: hidden;
  text-decoration: none; /* 确保链接没有下划线 */
  transition: background-color 0.3s ease, color 0.3s ease;
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
  transition: margin-right 0.5s ease;
}
.sidebar-container .menu-item span {
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.5s ease, width 0.5s ease;
}
.sidebar-container:hover .menu-item span {
  opacity: 1;
}
.menu-top, .menu-bottom {
  display: flex;
  flex-direction: column;
}
</style>
