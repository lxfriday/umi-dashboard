import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Form } from 'antd'
import { GlobalFooter } from 'ant-design-pro'
import ReactHelmet from 'react-helmet'
import config from '@/utils/config'
import { messErr } from '@/utils/message'

import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import ForgetPass from './components/ForgetPass'
import Particle from './components/Particle'

import styles from './index.less'

@connect(({ loading }) => ({ loading }))
@Form.create()
class Login extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      type: 'signin', // signin || signup || forgetpass
    }
  }

  // 提交表单
  handleOk = () => {
    const { dispatch, form } = this.props
    const { type } = this.state
    const { validateFieldsAndScroll } = form
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }

      const { username, password, confirmpassword } = values

      if (!this.checkUserNameValid(username)) return false
      if (!this.checkPasswordValid(password)) return false

      if (type === 'signin') {
        dispatch({
          type: 'login/signInEffect',
          payload: {
            data: {
              username: username,
              password: password,
            },
          },
        })
      } else {
        if (password !== confirmpassword) {
          messErr('两次密码输入不一致!!')
          return
        }
        dispatch({
          type: 'login/signUpEffect',
          payload: {
            data: {
              username,
              password,
            },
          },
        })
      }
    })
  }

  handleChangeType = type => {
    this.setState({ type })
  }

  // 用户点击登录
  handleSignIn = data => {
    // data => { username, password }
    this.props.dispatch({
      type: 'app/signInEffect',
      payload: {
        data,
      },
    })
  }

  // 用户点击注册
  handleSignUp = data => {
    // data => { username, password }
    this.props.dispatch({
      type: 'app/signUpEffect',
      payload: {
        data: {
          username: data.username,
          password: data.password,
          phone: data.phone,
          email: data.email,
        },
      },
    })
  }

  // 用户在忘记密码的输入框输入了信息，点击确定，提交忘记密码的内容
  handleForgetPass = (data, cb) => {
    // data => { email, password }
    this.props.dispatch({
      type: 'app/forgetPassEffect',
      payload: {
        data: {
          email: data.email,
          password: data.password,
        },
        cb,
      },
    })
  }

  render() {
    const { loading } = this.props
    const { type } = this.state

    const signInProps = {
      loading: loading.effects['signIn'] || false,
      handleSubmit: this.handleSignIn,
    }
    const signUpProps = {
      loading: loading.effects['signUp'] || false,
      handleSubmit: this.handleSignUp,
    }
    const forgetPassProps = {
      loading: loading.effects['forgetPass'] || false,
      handleSubmit: this.handleForgetPass,
    }

    return (
      <Fragment>
        <ReactHelmet>
          <title>{type === 'signin' ? '登录' : '注册'}</title>
        </ReactHelmet>
        <Particle />
        <div
          className={styles.container}
          style={{
            height: type === 'signin' ? 320 : type === 'signup' ? 500 : 380,
            marginTop: type === 'signup' ? -240 : -160,
          }}>
          <div className={styles.logo}>
            <span>
              {config.siteName} | {type === 'signin' ? '登录' : type === 'signup' ? '注册' : '忘记密码'}
            </span>
          </div>
          <Row>
            {type === 'signin' && <SignIn {...signInProps} />}
            {type === 'signup' && <SignUp {...signUpProps} />}
            {type === 'forgetpass' && <ForgetPass {...forgetPassProps} />}
            <p className={styles.bottomWrapper}>
              {type !== 'signup' && (
                <span className={styles.toggle} onClick={() => this.handleChangeType('signup')}>
                  注册
                </span>
              )}
              {type !== 'signin' && (
                <span className={styles.toggle} onClick={() => this.handleChangeType('signin')}>
                  登录
                </span>
              )}
              {type !== 'forgetpass' && (
                <span className={styles.toggle} onClick={() => this.handleChangeType('forgetpass')}>
                  忘记密码
                </span>
              )}
            </p>
          </Row>
        </div>
        <div className={styles.footer}>
          <GlobalFooter copyright={config.copyright} style={{ color: '#cccccc' }} />
        </div>
      </Fragment>
    )
  }
}

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Login
