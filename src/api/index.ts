import axios from 'axios'
import fs from 'fs-extra'
import { r } from '../utils';

function readCookie() {
  try {
    const isExists = fs.existsSync(r('cookie.txt'))
    if (isExists) {
      const res = fs.readFileSync(r('cookie.txt'), 'utf-8')
      return res
    } else {
      return undefined
    }
  } catch (e) {
    console.error('读取cookie失败', e)
  }
}

function writeCookie(data: string) {
  try {
    fs.writeFileSync(r('cookie.txt'), data, 'utf-8')
  } catch (e) {
    console.error('写入cookie失败')
  }
}

export const instance = axios.create({
  headers: (() => {
    return {
      'Cookie': readCookie(),
      'origin': 'https://wallhaven.cc',
      'referer': 'https://wallhaven.cc',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
    }
  })(),
  timeout: 10000
})

// 每次请求自动通过响应头更新cookie
instance.interceptors.response.use(function (res) {
  const setCookie = (res.headers['set-cookie'] ?? []).join(';')
  instance.defaults.headers['Cookie'] = setCookie

  writeCookie(setCookie)

  return res;
}, function (error) {
  return Promise.reject(error);
});

export function login(data: { username: string, password: string, _token: string }) {
  return instance.post('https://wallhaven.cc/auth/login', data)
}

export function getPage(url: string) {
  return instance.get(url)
}