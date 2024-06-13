// axios連接API
// 網址宣告為變數，方便未來網址改變時調整
// const apiUrl = `https://todoo.5xcamp.us`;
// let token = '';
// 測試用的token，在每天測試帳號被刪除重新建立後會不同

function signUp(email,nickname,pwd) {
  axios.post(`${apiUrl}/users`,{
    "user": {
      "email": email,
      "nickname": nickname,
      "password": pwd
    }
  })
  .then(res => console.log(res))
  .catch(error => console.log(error.response))
}

function login(email,pwd) {
  axios.post(`${apiUrl}/users/sign_in`,{
    "user": {
      "email": email,
      "password": pwd
    }
  })
  .then(res => {
    // 抓取登入用token
    // axios.defaults.headers.common['Authorization'] = res.headers.authorization; // axios會自動抓取儲存token，無需line 4 的token宣告
    token = res.headers.authorization
    console.log(res.data.message);
    alert(res.data.message);
    // location.assign('http://localhost:8080/todolist.html');
  })
  .catch(error => console.log(error.response))
}

function getTodo() {
  axios.get(`${apiUrl}/todos`) // 與下方註記的getTodo函式比對，無需加入headers的token，便能完成要求
  .then(res => console.log(res))
  .catch(error => console.log(error.response))
}
// function getTodo() {
//   axios.get(`${apiUrl}/todos`,{
//     headers: {
//       'Authorization': token
//     }
//   })
//   .then(res => console.log(res))
//   .catch(error => console.log(error.response))
// }

function addTodo(todo) {
  axios.post(`${apiUrl}/todos`,{
    'todo': {
      'content': todo
    }
  },{
      'headers': {
        'Authorization': token
      }
    })
  .then(res => console.log(res))
  .catch(err => console.log(err.response))
}

function updateTodo(todo,todoId) {
  axios.put(`${apiUrl}/todos/${todoId}`,{
    'todo': {
      'content': todo
    }
  },{
      'headers': {
      'Authorization': token
    }
  })
  .then(res => console.log(res))
  .catch(err => console.log(err.response))
}

function deleteTodo(todoId) {
  axios.delete(`${apiUrl}/todos/${todoId}`,{
    'headers': {
      'Authorization': token
    }
  })
  .then(res => console.log(res))
  .catch(err => console.log(err.response))
}

function toggleTodo(todoId) {
  axios.patch(`${apiUrl}/todos/${todoId}/toggle`,{},{ //不用更新值，故給予空物件，仍然需要帶入token
    'headers': {
      'Authorization': token
    }
  })
  .then(res => console.log(res))
  .catch(err => console.log(err.response))
}