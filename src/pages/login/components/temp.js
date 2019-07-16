import React, { Component } from 'react'
import styles from './SignIn.less'
import { Button, Form, Input, Row } from 'antd'

const FormItem = Form.Item
@Form.create()
class SignIn extends Component {
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
              },
            ],
          })(<Input onPressEnter={this.handleOk} placeholder="手机号" maxLength={11} />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '密码不符合规范',
              },
            ],
          })(
            <Input
              type="password"
              onPressEnter={this.handleOk}
              placeholder="密码"
              maxLength={25}
            />,
          )}
        </FormItem>
        {type === 'signup' && (
          <FormItem hasFeedback>
            {getFieldDecorator('confirmpassword', {
              rules: [
                {
                  required: type === 'signup',
                  message: '确认密码不能为空',
                },
              ],
            })(
              <Input
                type="password"
                onPressEnter={this.handleOk}
                placeholder="确认密码"
                maxLength={25}
              />,
            )}
          </FormItem>
        )}
        <Row>
          <Button type="primary" onClick={this.handleOk} loading={loading.effects.login}>
            确定
          </Button>
        </Row>
      </form>
    )
  }
}

export default SignIn
