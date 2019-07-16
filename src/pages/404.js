import React, { createElement } from 'react'
import classNames from 'classnames'
import { Button } from 'antd'
import styles from './404.less'

const config = {
  img: 'https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg',
  title: '404',
  desc: '抱歉，你访问的页面不存在',
}

class Exception extends React.PureComponent {
  static defaultProps = {
    backText: '前往首页',
    redirect: '/dashboard',
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { backText, redirect } = this.props
    const clsString = classNames(styles.exception)
    return (
      <div className={clsString}>
        <div className={styles.imgBlock}>
          <div className={styles.imgEle} style={{ backgroundImage: `url(${config.img})` }} />
        </div>
        <div className={styles.content}>
          <h1>{config.title}</h1>
          <div className={styles.desc}>{config.desc}</div>
          <div className={styles.actions}>
            {createElement(
              'a',
              {
                href: redirect,
              },
              <Button type="primary">{backText}</Button>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Exception
