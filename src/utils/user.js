import { messErr } from '@/utils/message'
import emailValidator from 'email-validator'

/**
 * 检查用户名是否合法，长度为30位以内
 * @param username
 * @returns {boolean}
 */
export function checkUserNameValid(username) {
  if (!/^[\w]{1,30}$/.test(username)) {
    messErr('用户名最长为30位')
    return false
  }
  return true
}

/**
 * 检查手机号是否合法
 * @param phone
 * @returns {boolean}
 */
export function checkPhoneValid(phone) {
  if (!/^1[0-9]{10}$/.test(phone)) {
    messErr('手机号为11位数字')
    return false
  }
  return true
}

/**
 * 检查密码是否合法，长度为6位到25位
 * @param password
 * @returns {boolean}
 */
export function checkPasswordValid(password) {
  if (!/^[\w]{6,30}$/.test(password)) {
    messErr('密码长度为6到30位')
    return false
  }
  return true
}

/**
 * 检查两次输入的密码是否一致
 * @param confirm
 * @param pass
 * @returns {boolean}
 */
export function checkConfirmPasswordValid(confirm, pass) {
  if (confirm !== pass) {
    messErr('两次输入的密码不一致')
    return false
  }
  return true
}

/**
 * 检查邮箱是否合法
 * @param email
 * @returns {boolean}
 */
export function checkEmailValid(email) {
  if (!emailValidator.validate(email)) {
    messErr('邮箱格式不正确')
    return false
  }
  return true
}
