<template>
    <div>
        <h1>欢迎来到主页</h1>
        <div>
            <!-- 显示/隐藏数据按钮 -->
            <button @click="toggleMessage">
                {{ showMessage ? '隐藏' : '显示' }}
            </button>
            <!-- 添加用户按钮 -->
            <button @click="showAddDialog = true" class="plusButton">
                <svg class="plusIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                    <g mask="url(#mask0_21_345)">
                    <path d="M13.75 23.75V16.25H6.25V13.75H13.75V6.25H16.25V13.75H23.75V16.25H16.25V23.75H13.75Z"></path>
                    </g>
                </svg>
            </button>
            <!-- 学生数据表 -->
            <table v-if="showMessage" style="width: 100%">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>姓名</th>
                        <th>用户名</th>
                        <th>密码</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="student in students" :key="student.id">
                        <td>{{ student.id }}</td>
                        <td>{{ student.name }}</td>
                        <td>{{ student.username }}</td>
                        <td>{{ student.password }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- 添加用户模态框 -->
        <div v-if="showAddDialog" class="modal">
            <div class="modal-content">
                <span class="close" @click="showAddDialog = false">&times;</span>
                <h2>添加用户</h2>
                <form @submit.prevent="addStudent">
                    <div>
                        <label for="name">姓名</label>
                        <input type="text" id="name" v-model="newStudent.name">
                    </div>
                    <div>
                        <label for="username">用户名</label>
                        <input type="text" id="username" v-model="newStudent.username">
                    </div>
                    <div>
                        <label for="password">密码</label>
                        <input type="password" id="password" v-model="newStudent.password">
                    </div>
                    <button type="submit">添加</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Home',
    mounted() {
        document.title = '主页';
    },
    data() {
        return {
            students: [],
            showMessage: false,
            showAddDialog: false,
            newStudent: {
                name: '',
                username: '',
                password: '',
            },
        };
    },
    methods: {
        async getMessage() {
            try {
                const response = await axios.get('http://localhost:8080/students');
                this.students = response.data;
            } catch (error) {
                console.error('获取数据失败:', error);
            }
        },
        toggleMessage() {
            this.showMessage = !this.showMessage;
            if (this.showMessage) {
                this.getMessage();
            }
        },
        async addStudent() {
            try {
                console.log('开始添加用户:', this.newStudent); // 调试输出，验证按钮点击有效
                const response = await axios.post('http://localhost:8080/add', this.newStudent);
                console.log('添加用户成功:', response.data); // 添加成功日志
                this.students.push(response.data);
                this.showAddDialog = false;
                this.newStudent = { name: '', username: '', password: '' };
            } catch (error) {
                console.error('添加用户失败:', error);
            }
        },
    },
};
</script>

<style scoped>
h1 {
    text-align: center;
}

button {
    margin: 10px;
}

table {
    width: 80%;
    border-collapse: collapse;
    background-color: #eee0e0;
}

th, td {
    border: 3px solid #000000;
    padding: 8px;
}

th {
    background-color: #f2f2f2;
    text-align: left;
}

.modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
    background-color: #fefefe;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 500px;
}

.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
}
/* Note that you only needs to edit the config to customize the button! */

.plusButton {
  --plus_sideLength: 2.5rem;
  --plus_topRightTriangleSideLength: 0.9rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
  width: var(--plus_sideLength);
  height: var(--plus_sideLength);
  background-color: #000000;
  overflow: hidden;
}

.plusButton::before {
  position: absolute;
  content: "";
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  border-width: 0 var(--plus_topRightTriangleSideLength) var(--plus_topRightTriangleSideLength) 0;
  border-style: solid;
  border-color: transparent white transparent transparent;
  transition-timing-function: ease-in-out;
  transition-duration: 0.2s;
}

.plusButton:hover {
  cursor: pointer;
}

.plusButton:hover::before {
  --plus_topRightTriangleSideLength: calc(var(--plus_sideLength) * 2);
}

.plusButton:focus-visible::before {
  --plus_topRightTriangleSideLength: calc(var(--plus_sideLength) * 2);
}

.plusButton>.plusIcon {
  fill: white;
  width: calc(var(--plus_sideLength) * 0.7);
  height: calc(var(--plus_sideLength) * 0.7);
  z-index: 1;
  transition-timing-function: ease-in-out;
  transition-duration: 0.2s;
}

.plusButton:hover>.plusIcon {
  fill: black;
  transform: rotate(180deg);
}

.plusButton:focus-visible>.plusIcon {
  fill: black;
  transform: rotate(180deg);
}
</style>