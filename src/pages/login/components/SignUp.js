import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input, Row } from 'antd'
import {
  checkUserNameValid,
  checkPasswordValid,
  checkConfirmPasswordValid,
  checkPhoneValid,
} from '@/utils/user'

const FormItem = Form.Item
@Form.create()
class SignUp extends Component {
  // 点击确定提交
  handleSubmit = () => {
    const { form, handleSubmit } = this.props
    const { validateFieldsAndScroll } = form
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return false
      }
      const { username, password, confirmPass, phone, email } = values

      if (!checkUserNameValid(username)) return false
      if (!checkPasswordValid(password)) return false
      if (!checkConfirmPasswordValid(password, confirmPass)) return false

      handleSubmit({
        username,
        password,
        phone,
        email,
      })
    })
  }

  handleValidateConfirmPass = (rule, value, callback) => {
    const { form } = this.props
    const { getFieldValue } = form
    const password = getFieldValue('password')
    if (password === value) {
      callback()
    } else {
      callback('两次密码输入不一致')
    }
  }

  handleValidatePhone = (rule, value, callback) => {
    if (/^1[0-9]{10}$/.test(value)) {
      callback()
    } else {
      callback('手机号格式不正确')
    }
  }

  render() {
    const { loading, form } = this.props
    const { getFieldDecorator } = form
    return (
      <form>
        <FormItem hasFeedback>
          {getFieldDecorator('email', {
            rules: [
              {
                required: true,
                message: '邮箱格式不正确',
                type: 'email',
              },
            ],
          })(<Input onPressEnter={this.handleSubmit} placeholder="邮箱" maxLength={100} />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('phone', {
            rules: [
              {
                required: true,
                validator: this.handleValidatePhone,
              },
            ],
          })(<Input onPressEnter={this.handleSubmit} placeholder="手机号" maxLength={11} />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: '用户名不符合规范',
                pattern: /^[\w]{1,30}$/,
              },
            ],
          })(<Input onPressEnter={this.handleSubmit} placeholder="用户名" maxLength={30} />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '密码长度为6到30位',
                pattern: /^[\w]{6,30}$/,
              },
            ],
          })(
            <Input
              type="password"
              onPressEnter={this.handleSubmit}
              placeholder="密码"
              maxLength={30}
            />,
          )}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('confirmPass', {
            rules: [
              {
                required: true,
                validator: this.handleValidateConfirmPass,
              },
            ],
          })(
            <Input
              type="password"
              onPressEnter={this.handleSubmit}
              placeholder="确认密码"
              maxLength={30}
            />,
          )}
        </FormItem>
        <Row>
          <Button type="primary" onClick={this.handleSubmit} loading={loading}>
            确定
          </Button>
        </Row>
      </form>
    )
  }
}

SignUp.propTypes = {
  loading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default SignUp
