import readlineSync from 'readline-sync'
import { login, instance } from './api';
import user from '../user.json'

async function testNet() {
  const res = await instance.get('https://wallhaven.cc/')
  if(res.status === 200) {
    return true
  }
  return false
}

async function goLogin() {
  // const username = readlineSync.question('input username: ')
  // const password = readlineSync.question('input password: ')
  const username = user.username
  const password = user.password
  const _token = '6JYAlqB4ldB0Ce197oqFXrJ06yoyIuLHAlnIxkzn'
  console.log({ username, password });
  // try{
  //   const res = await login({ username, password, _token })
  //   console.log(res.status);
  // }catch(e){
  //   console.log(e);
  // }
}


; (async () => {
  const isNetWork = await testNet()
  if(isNetWork){
    console.log('网络可用');
  }else{
    console.log('网络不可用,需要科学上网');
    return
  }

  await goLogin()
})()