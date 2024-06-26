<template>
  <div class="login-form">
    <h1>登录</h1>
    <el-form @submit.native.prevent="login">
      <el-form-item label="用户">
        <el-input v-model="username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-button type="primary" native-type="submit">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginForm',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      if (!this.username || !this.password) {
        this.$message.error('请输入用户名和密码');
        return;
      } else {
        try {
          const response = await axios.post('http://localhost:8080/login', {
            username: this.username,
            password: this.password,
          });
          localStorage.setItem('user', JSON.stringify(response.data));
          this.$router.push('/main');
        } catch (error) {
          this.$message.error('登录失败,用户名或密码错误');
          console.log(error);
        }
      }
    },
  },
};
</script>

<style scoped>
/* 登录表单容器样式 */
.login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

h1 {
    color: #333;
    margin-bottom: 20px;
    font-size: 24px;
}

.el-form {
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    width: 400px;
}

.el-form-item {
    margin-bottom: 20px;
}

.el-input {
    width: 100%;
}

.el-button {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    background-color: #409EFF;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: white;
}

.el-button:hover {
    background-color: #66b1ff;
}

.el-message {
    margin-top: 20px;
}
</style>