const apiUrl = 'https://todoo.5xcamp.us';
const input = document.querySelector('.txt_input');
const addBTN = document.querySelector('.btn_add');
const list = document.querySelector('.list');
const userName = document.querySelector('#username');
let data = [];

// 取得todolist列表
function getTodo() {
  axios.get(`${apiUrl}/todos`, {
    headers: {
      Authorization: localStorage.token,
    }
  })
  .then((res) => {
    data = res.data.todos;
    updateList();
  })
  .catch((err) => {
    console.log(err.response.data.message);
  })
}

if (location.pathname == '/todolist.html') {
  getTodo();
  userName.textContent = `${localStorage.username}`;
}


// 渲染
function renderData(showData) {
  let str = '';
  showData.forEach(function(item) {
    str += `<li data-id="${item.id}">
            <label class="checkbox">
            <input type="checkbox" ${item.check} ${item.completed_at}/>
            <span>${item.content}</span>
            </label>
            <a href="#" class="delete"></a>
          </li>`
  })
  list.innerHTML = str;
  console.log(data);
}


// 新增按鈕監聽
addBTN.addEventListener('click', keyIn)
input.addEventListener('keypress', function(e){
  if (e.key === 'Enter'){
    keyIn();
  }
});

function keyIn() {
  if (input.value.trim() === ''){
    alert('Please insert your data');
    return;
  }
  axios.post(`${apiUrl}/todos`, {
    todo: {
      content: input.value,
    }
  },
  {
    headers: {
      Authorization: localStorage.token,
    }
  })
  .then((res) => {
    getTodo();
    let obj = {};
    obj.content = input.value;
    obj.check = '';
    data.push(obj);
    input.value = '';
    updateList();
  })
  .catch((err) => {
    alert(err.response.data.message);
  })
}

// 刪除、切換狀態
list.addEventListener('click', (e) => {
  let listId = e.target.closest('li').dataset.id;
  if (e.target.getAttribute('class') == 'delete'){
    e.preventDefault();

    axios.delete(`${apiUrl}/todos/${listId}`,{
      headers: {
        Authorization: localStorage.token,
      }
    })
    .then ((res) => {
      alert('Delete Complete');
    })
    .catch((err) => {
      alert(err.response.data.message);
    })

    let index = data.findIndex((item) => item.id === listId);
    data.splice(index, 1);
    updateList();
  }
  else {
    data.forEach((item) => {
      if (item.id === listId){
        axios.patch(`${apiUrl}/todos/${listId}/toggle`,
          {},
          {
            headers: {
              Authorization: localStorage.token,
            }
          }
        )
        .then((res) => {
          data.forEach((item,index) => {
            if (item.id === res.data.id) {
              data[index].completed_at = res.data.completed_at;
              if (item.check == 'checked'){
                item.check = '';
              } else {
                item.check = 'checked';
              }
            }
          })
          updateList();
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
      }
    })
  }
  console.log(data);
})


// 切換畫面 
const tab = document.querySelector('.tab');
let tabStatus = 'all';

tab.addEventListener('click', (e) => {
  tabStatus = e.target.dataset.tab;
  let tabs = document.querySelectorAll('.tab li');
  tabs.forEach((item) => {
    item.setAttribute('class', '')
  });
  e.target.setAttribute('class', 'active');
  updateList();
})

function updateList() {
  let newData = [];
  if (tabStatus === 'all') {
    newData = data;
  }
  else if (tabStatus === 'incomplete') {
    newData = data.filter((item) => item.completed_at === null);
  }
  else {
    newData = data.filter((item) => item.completed_at !== null);
  }

  const count = document.querySelector('#inc-count');
  let countlength = data.filter((item) => item.completed_at === null);
  count.textContent = countlength.length;

  renderData(newData);
}


// 刪除已完成
const clearAll = document.querySelector('#clearall');

clearAll.addEventListener('click', (e) => {
  e.preventDefault();
  let deleteData = data.filter((item) => item.completed_at !== null);
  deleteData.forEach((item) => {
    axios.delete(`${apiUrl}/todos/${item.id}`,{
      headers: {
        Authorization: localStorage.token,
      }
    })
    .then((res) => {
      alert(res.data.message);
    })
    .catch((err) => {
      alert(err.response.data.message);
    })

    data = data.filter((item) => item.completed_at === null);
    updateList();
    getTodo();
  })
})


// 登出
const logoutBTN = document.querySelector('#logout');

logoutBTN.addEventListener('click', function(e) {
  e.preventDefault();

  axios.delete(`${apiUrl}/users/sign_out`,{
    headers: {
      Authorization: localStorage.token,
    }
  })
  .then((res) => {
    alert(res.data.message);
    location.assign('index.html')
  })
  .catch((err) => {
    alert(err.res.data.message);
  })
})