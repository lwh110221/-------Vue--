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
          this.$router.push('/home');
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
.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
}
h1 {
  margin-bottom: 20px;
}
</style>