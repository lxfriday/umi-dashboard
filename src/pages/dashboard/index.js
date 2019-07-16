import React, { Component, Fragment } from 'react'
import { connect } from 'dva'
import { Card } from 'antd'
import TimerEnhance from '@/utils/TimerEnhance'

import styles from './index.less'

@connect(({ dashboard }) => ({
  dashboard,
}))
@TimerEnhance
class Dashboard extends Component {
  componentDidMount() {
    this.getData()

    // 5 秒自动刷新数据
    this.setInterval(this.getData, 1000 * 300)
  }

  getData = () => {
    console.log('get data')
  }

  render() {
    return (
      <Fragment>
        <Card bordered={false} bodyStyle={{ padding: 0 }}>
          hello
        </Card>
      </Fragment>
    )
  }
}

export default Dashboard
