import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input, Row } from 'antd'
import { checkEmailValid, checkPasswordValid, checkConfirmPasswordValid } from '@/utils/user'
import { messSuccess } from '@/utils/message'

const FormItem = Form.Item
@Form.create()
class ForgetPass extends Component {
  // 点击确定提交
  handleSubmit = () => {
    const { form, handleSubmit } = this.props
    const { validateFieldsAndScroll, resetFields } = form
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return false
      }
      const { email, password, confirmPass } = values

      if (!checkEmailValid(email)) return false
      if (!checkPasswordValid(password)) return false
      if (!checkConfirmPasswordValid(password, confirmPass)) return false

      handleSubmit(
        {
          email,
          password,
        },
        () => {
          resetFields()
          messSuccess('请前往邮箱确认身份信息')
        }
      )
    })
  }

  handleInputConfirmPass = (rule, value, callback) => {
    const { form } = this.props
    const { getFieldValue } = form
    const password = getFieldValue('password')
    if (password === value) {
      callback()
    } else {
      callback('两次密码输入不一致')
    }
  }

  render() {
    const that = this
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
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '密码长度为6到30位',
                pattern: /^[\w]{6,30}$/,
              },
            ],
          })(<Input type="password" onPressEnter={this.handleSubmit} placeholder="密码" maxLength={30} />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('confirmPass', {
            rules: [
              {
                required: true,
                validator: that.handleInputConfirmPass,
              },
            ],
          })(<Input type="password" onPressEnter={this.handleSubmit} placeholder="确认密码" maxLength={30} />)}
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

ForgetPass.propTypes = {
  loading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default ForgetPass
