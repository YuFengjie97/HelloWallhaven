import readlineSync from 'readline-sync'

function login() {
  const username = readlineSync.question('输入用户名')
  console.log('hello ', username);
}

login()