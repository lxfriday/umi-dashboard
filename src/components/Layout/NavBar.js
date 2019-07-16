import React, { PureComponent } from 'react'
import { Tooltip, Button } from 'antd'
import classnames from 'classnames'
import styles from './NavBar.less'
import img_user from '@/assets/user_128x128.jpg'
import img_logout from '@/assets/logout_128x128.png'
import { getPageTitle } from '@/utils/routes'

class NavBar extends PureComponent {
  render() {
    const { user, locationPathname, handleLogout } = this.props
    const username = user.username
    const title = getPageTitle(locationPathname)

    // 右侧用户的卡片
    const userToolTip = (
      <div className={styles.toolTipWrapper}>
        <div className={styles.contentWrapper}>
          <div className={styles.avatarAndUsername}>
            <img src={img_user} alt="用户" className={styles.avatar} />
            <span className={styles.username}>{username}</span>
          </div>
        </div>
        <div className={styles.blankWrapper}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={styles.bottomWrapper} onClick={handleLogout}>
          退出登录
        </div>
      </div>
    )

    return (
      <div className={styles.container}>
        {/* 左边的标题 */}
        <span className={styles.title}>{title}</span>
        <div className={styles.rightWrapper}>
          <Tooltip placement="left" title={userToolTip} overlayClassName={styles.overLay}>
            <img src={img_user} alt="用户" className={styles.avatar} />
          </Tooltip>
        </div>
      </div>
    )
  }
}

NavBar.propTypes = {}

export default NavBar
