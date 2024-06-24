<template>
    <div class="topbar-container">
      <div class="brand">
        MyBrand
      </div>
      <div class="user-info">
        <font-awesome-icon :icon="['fas', 'user']" class="user-icon" />
        <span class="username">John Doe</span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Topbar',
    data() {
      return {
        // 这里你可以添加更多的用户信息
        username: 'John Doe'
      };
    }
  }
  </script>
  
  <style scoped>
  .topbar-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #2e3a8c;
    padding: 10px 20px;
    color: white;
  }
  .brand {
    font-size: 24px;
    font-weight: bold;
  }
  .user-info {
    display: flex;
    align-items: center;
  }
  .user-icon {
    font-size: 24px;
    margin-right: 10px;
  }
  .username {
    font-size: 18px;
  }
  </style>
  