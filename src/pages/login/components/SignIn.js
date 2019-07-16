import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input, Row } from 'antd'
import { checkUserNameValid, checkPasswordValid } from '@/utils/user'

const FormItem = Form.Item
@Form.create()
class SignIn extends Component {
  // 点击确定提交
  handleSubmit = () => {
    const { form, handleSubmit } = this.props
    const { validateFieldsAndScroll } = form
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return false
      }
      const { username, password } = values

      if (!checkUserNameValid(username)) return false
      if (!checkPasswordValid(password)) return false

      handleSubmit({
        username,
        password,
      })
    })
  }

  render() {
    const { loading, form } = this.props
    const { getFieldDecorator } = form
    return (
      <form>
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
        <Row>
          <Button type="primary" onClick={this.handleSubmit} loading={loading}>
            确定
          </Button>
        </Row>
      </form>
    )
  }
}

SignIn.propTypes = {
  loading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default SignIn
