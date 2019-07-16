import { POST, urlBase } from './base'

// 注册
export async function signUpService(data) {
  return await POST(urlBase + '/admin/login/signup/', data)
}

// 登录
export async function signInService(data) {
  return await POST(urlBase + '/admin/login/signin/', data)
}

// 忘记密码
export async function forgetPassService(data) {
  return await POST(urlBase + '/admin/login/forget_pass/', data)
}
