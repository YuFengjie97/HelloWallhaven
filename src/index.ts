import { login, instance, getPage } from './api';
import * as cheerio from 'cheerio';
import user from '../user.json'


type Pic = {
  previewUrl: string
  ext: string
  name: string
  url: string
}



/**
 * 在进入login页面时,
 * 1. 从生成的页面中的表单html元素input获取_token
 */
async function getToken() {
  try {
    const res = await instance.get('https://wallhaven.cc/login')
    if (res.status === 200) {
      const html = res.data

      const $ = cheerio.load(html)
      const $token = $('input[name=_token]')
      const token = $token.attr('value')

      if (!token) {
        throw Error('login页面不存在token')
      }
      return token
    } else {
      throw Error('login页面,状态码不为200')
    }
  } catch (e) {
    console.error('login页面,访问失败')
    throw e
  }
}

async function goLogin() {
  // const username = readlineSync.question('input username: ')
  // const password = readlineSync.question('input password: ')

  const username = user.username
  const password = user.password
  const token = await getToken()
  console.log({ username, password, token });

  try {
    const res = await login({ username, password, _token: token })
    if (res.status === 200) {
      console.log('-------登录成功-------');
    } else {
      console.log(`------登录失败--状态码: ${res.status}-----`)
    }
  } catch (e) {
    console.log(`------登录失败------`);
  }
}

function getPicFromPage(html: string) {
  const $ = cheerio.load(html)
  const pics = $('figure.thumb')
  const res: Pic[] = []
  pics.each(function () {
    const previewUrl = $(this).find('a.preview').attr('href') as string
    const ext = $(this).find('span.png').length > 0 ? 'png' : 'jpg'
    const hash = (() => {
      const res = previewUrl?.match(/(?<=\/w\/).*/)
      if (res) {
        return res[0]
      }
      return ''
    })()
    const hashHead = hash.slice(0, 2)
    let url = previewUrl
    url = url?.replace(/wallhaven.cc/, 'w.wallhaven.cc')
    url = url?.replace(/\/w\//, `/full/${hashHead}/wallhaven-`)
    url += `.${ext}`
    res.push({
      previewUrl,
      ext,
      name: hash,
      url,
    })
  })
  return res
}


; (async () => {
  // await goLogin()

  const nsfw = 'https://wallhaven.cc/search?q=pussy&categories=111&purity=110&sorting=favorites&order=desc&ai_art_filter=0&page=1'
  const res = await getPage(nsfw)

  const arr = getPicFromPage(res.data)
  console.log(arr);
})()