// import axios from 'axios'

export function login(userInfo) {
  return axios({
    url: 'http://192.168.3.4/UserInfo/Login',
    method: 'post',
    data: JSON.stringify(userInfo),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

