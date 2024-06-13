const apiUrl = 'https://todoo.5xcamp.us';
const loginMail = document.querySelector('#loginemail');
const loginPwd = document.querySelector('#loginpwd');
const loginBTN = document.querySelector('#loginBTN');
// let token = '';

loginBTN.addEventListener('click',function(e){
  e.preventDefault();
  if (loginMail.value.trim() == '' || loginPwd.value.trim() == ''){
    alert('Please input your email or password');
    return;
  }

  let item = {};
  item.email = loginMail.value;
  item.password = loginPwd.value;

  axios.post(`${apiUrl}/users/sign_in`,{user:item})
    .then(response => {
      token = response.headers.authorization;
      localStorage.setItem('token', token);
      let loginUser = response.data.nickname;
      localStorage.setItem("username", loginUser);
      
      alert(response.data.message);
      alert(`Login successful! Welcome, ${loginUser}!`);
      location.assign('todolist.html');
    })
    .catch(err => {
      alert(err.response.data.error);
      console.log(err);
      console.log(err.response.data.error);
    })
});