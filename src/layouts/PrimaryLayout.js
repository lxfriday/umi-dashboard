import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withRouter from 'umi/withRouter'
import { connect } from 'dva'
import { Layout } from 'antd'
import { MyLayout } from '@/components'
import Error from '../pages/404'
import { pathMatchRegexp } from '@/utils'
import styles from './PrimaryLayout.less'

const { Content } = Layout
const { Sider, NavBar } = MyLayout

@withRouter
@connect(({ app, loading }) => ({ app, loading }))
class PrimaryLayout extends Component {
  // 检测用户是否已经登录了
  checkUserLoggedIn = () => {
    return this.props.loggedIn
  }

  // 点击退出登录
  handleLogout = () => {
    this.props.dispatch({
      type: 'app/logoutEffect',
    })
  }

  render() {
    const { app, location, children } = this.props
    const { theme, routeList, openKeys, user, locationPathname } = app

    // MenuParentId is equal to -1 is not a available menu.
    const menus = routeList.filter(_ => _.menuParentId !== '-1' && !_.hide)

    const currentRoute = routeList.find(_ => _.route && pathMatchRegexp(_.route, location.pathname))

    const pageExist = !!currentRoute // 访问不存在的页面则是 false

    const siderProps = {
      theme,
      menus,
      openKeys,
    }

    const navbarProps = {
      user: user,
      locationPathname,
      handleLogout: this.handleLogout,
    }

    return (
      <Fragment>
        <Layout>
          <Sider {...siderProps} />
          <div className={styles.container} id="primaryLayout">
            {/*<Loader fullScreen={false} spinning={loading.global} />*/}
            <NavBar {...navbarProps} />
            <Content className={styles.content}>
              {pageExist ? children : <Error location={location} />}
            </Content>
          </div>
        </Layout>
      </Fragment>
    )
  }
}

PrimaryLayout.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
}

export default PrimaryLayout
