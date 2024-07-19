<template>
    <div>
        <div>
            <!-- 搜索框和按钮 -->
            <div class="search">
                <input type="text" v-model="searchName" placeholder="搜索姓名">
                <button @click="search">搜索</button>
            </div>
            <!-- 添加用户按钮 -->
            <button @click="showAddDialog = true" class="plusButton">添加</button>
            <!-- 学生数据表 -->
            <table v-if="students.length > 0" style="width: 100%">
                <thead>
                    <tr>
                        <th>姓名</th>
                        <th>用户名</th>
                        <th>密码</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="student in students" :key="student.id">
                        <td>{{ student.name }}</td>
                        <td>{{ student.username }}</td>
                        <td>{{ student.password }}</td>
                        <td>
                            <button @click="deleteStudent(student.id)">删除</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-else>没有搜索到</div>
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
    data() {
        return {
            students: [],
            showAddDialog: false,
            searchName: '',
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
        async addStudent() {
            try {
                console.log('开始添加用户:', this.newStudent);
                const response = await axios.post('http://localhost:8080/students/add', this.newStudent);
                console.log('添加用户成功:', response.data);
                this.students.push(response.data);
                this.showAddDialog = false;
                this.newStudent = { name: '', username: '', password: '' };
            } catch (error) {
                console.error('添加用户失败:', error);
            }
        },
        async search() {
            try {
                const response = await axios.get('http://localhost:8080/students/search', {
                    params: { name: this.searchName }
                });
                this.students = response.data;
            } catch (error) {
                console.error('搜索失败:', error);
            }
        },
        async deleteStudent(id) {
            try {
                await axios.delete(`http://localhost:8080/students/${id}`);
                this.students = this.students.filter(student => student.id !== id);
                alert('删除成功!'); 
            } catch (error) {
                console.error('删除用户失败:', error);
            }
        }
    },
    mounted() {
        this.getMessage();
    }
};
</script>

<style scoped>
/* 标题样式 */
h1 {
    text-align: center;
    color: #333;
    margin-top: 20px;
}

/* 按钮样式 */
button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin: 10px;
    font-size: 16px;
}

button:hover {
    background-color: #45a049;
}

.plusButton {
    background-color: #008CBA;
}

/* 搜索框样式 */
.search {
    display: flex;
    justify-content: center;
    margin: 20px 0;
}

.search input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
    width: 200px;
    box-sizing: border-box;
}

.search button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.search button:hover {
    background-color: #45a049;
}

/* 表格样式 */
table {
    width: 80%;
    margin: 20px auto;
    border-collapse: collapse;
    box-shadow: 0 2px 3px rgba(0,0,0,0.1);
}

th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}
td{
    color: #0e4bcf;
    font-weight: bold;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
th {
    background-color: #f2f2f2;
    color: #333;
}

tbody tr:hover {
    background-color: #f1f1f1;
}

/* 模态框样式 */
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
    background-color: rgba(0,0,0,0.4);
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    width: 300px;
    text-align: center;
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

/* 表单样式 */
form div {
    margin: 15px 0;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

input[type="text"],
input[type="password"] {
    width: calc(100% - 20px);
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
}

button[type="submit"] {
    background-color: #4CAF50;
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: white;
    font-size: 16px;
}

button[type="submit"]:hover {
    background-color: #45a049;
}
</style>