import React, { Component } from 'react'
import { connect } from 'dva'
import TimerEnhance from '@/utils/TimerEnhance'

import secureGetValue from '@lxfriday/get-object-value'

@connect(({ dashboard, app }) => ({
  dashboard,
  app,
}))
@TimerEnhance
class Dashboard extends Component {
  render() {
    const obj = {
      a: {
        b: {
          c: {
            d: {
              e: 'abcde',
            },
          },
        },
      },
    }

    console.log('result => ', secureGetValue(obj, ['a', 'b', 'c', 'd', 'e', 'f'], 'not found'))

    return <div>hello</div>
  }
}

export default Dashboard
