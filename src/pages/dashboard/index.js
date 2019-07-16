import React, { Component, Fragment } from 'react'
import { connect } from 'dva'
import { Card, Button } from 'antd'
import TimerEnhance from '@/utils/TimerEnhance'

import styles from './index.less'

@connect(({ dashboard, app }) => ({
  dashboard,
  app,
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
      <div style={{ height: 3000 }}>
        <Card bordered={false} bodyStyle={{ padding: 0 }}>
          <Button onClick={() => this.props.app.scrollContainerTo(5000)}>go to 1000</Button>
        </Card>
        <div style={{ height: 300, backgroundColor: 'red' }} />
        <div style={{ height: 300, backgroundColor: 'green' }} />
        <div style={{ height: 300, backgroundColor: 'yellow' }} />

        <div style={{ height: 300, backgroundColor: 'red' }} />
        <div style={{ height: 300, backgroundColor: 'green' }} />
        <div style={{ height: 300, backgroundColor: 'yellow' }} />

        <div style={{ height: 300, backgroundColor: 'red' }} />
        <div style={{ height: 300, backgroundColor: 'green' }} />
        <div style={{ height: 300, backgroundColor: 'yellow' }} />

        <div style={{ height: 300, backgroundColor: 'red' }} />
        <div style={{ height: 300, backgroundColor: 'green' }} />
        <div style={{ height: 300, backgroundColor: 'yellow' }} />
        <div style={{ height: 300, backgroundColor: 'red' }} />
        <div style={{ height: 300, backgroundColor: 'green' }} />
        <div style={{ height: 300, backgroundColor: 'yellow' }} /><div style={{ height: 300, backgroundColor: 'red' }} />
        <div style={{ height: 300, backgroundColor: 'green' }} />
        <div style={{ height: 300, backgroundColor: 'yellow' }} /><div style={{ height: 300, backgroundColor: 'red' }} />
        <div style={{ height: 300, backgroundColor: 'green' }} />
        <div style={{ height: 300, backgroundColor: 'yellow' }} /><div style={{ height: 300, backgroundColor: 'red' }} />
        <div style={{ height: 300, backgroundColor: 'green' }} />
        <div style={{ height: 300, backgroundColor: 'yellow' }} /><div style={{ height: 300, backgroundColor: 'red' }} />
        <div style={{ height: 300, backgroundColor: 'green' }} />
        <div style={{ height: 300, backgroundColor: 'yellow' }} /><div style={{ height: 300, backgroundColor: 'red' }} />
        <div style={{ height: 300, backgroundColor: 'green' }} />
        <div style={{ height: 300, backgroundColor: 'yellow' }} /><div style={{ height: 300, backgroundColor: 'red' }} />
        <div style={{ height: 300, backgroundColor: 'green' }} />
        <div style={{ height: 300, backgroundColor: 'yellow' }} /><div style={{ height: 300, backgroundColor: 'red' }} />
        <div style={{ height: 300, backgroundColor: 'green' }} />
        <div style={{ height: 300, backgroundColor: 'yellow' }} /><div style={{ height: 300, backgroundColor: 'red' }} />
        <div style={{ height: 300, backgroundColor: 'green' }} />
        <div style={{ height: 300, backgroundColor: 'yellow' }} /><div style={{ height: 300, backgroundColor: 'red' }} />
        <div style={{ height: 300, backgroundColor: 'green' }} />
        <div style={{ height: 300, backgroundColor: 'yellow' }} /><div style={{ height: 300, backgroundColor: 'red' }} />
        <div style={{ height: 300, backgroundColor: 'green' }} />
        <div style={{ height: 300, backgroundColor: 'yellow' }} /><div style={{ height: 300, backgroundColor: 'red' }} />
        <div style={{ height: 300, backgroundColor: 'green' }} />
        <div style={{ height: 300, backgroundColor: 'yellow' }} /><div style={{ height: 300, backgroundColor: 'red' }} />
        <div style={{ height: 300, backgroundColor: 'green' }} />
        <div style={{ height: 300, backgroundColor: 'yellow' }} />
      </div>
    )
  }
}

export default Dashboard
