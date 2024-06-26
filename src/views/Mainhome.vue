<template>
    <Layout>
      <router-view />
    </Layout>
  </template>
  
  <script>
  import Layout from '../components/Layout.vue';
  
  export default {
    name: 'Mainhome',
    components: {
      Layout
    }
  };
  </script>
  
  <style scoped>
  .home-content {
    padding: 20px;
  }
  </style>
  