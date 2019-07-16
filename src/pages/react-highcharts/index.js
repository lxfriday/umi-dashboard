import React from 'react'
// https://github.com/kirjs/react-highcharts/blob/master/src/chartsFactory.jsx 源码地址
// https://api.highcharts.com.cn/highcharts#tooltip.enabled  api doc
import ReactHighcharts from 'react-highcharts'
import { Card } from 'antd'

// 图标线条颜色
const colors = ['rgb(99,184,255)', 'rgb(255,114,86)', 'rgb(255,193,37)', 'rgb(46,139,87)', 'rgb(255,174,185)', 'rgb(171,130,255)']

const data = {
  对数折线图: [
    {
      data: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512],
      pointStart: 1,
      name: '1-2-4',
      marker: {
        enabled: false,
      },
    },
    {
      data: [1, 3, 9, 27, 81, 243, 729, 2187, 6561, 19683],
      pointStart: 1,
      name: '1-3-9',
    },
    {
      data: [1, 5, 25, 125, 625, 3125, 15625, 78125, 390625, 1953125],
      pointStart: 1,
      name: '1-5-25',
    },
  ],
}

const graphConfig = {
  对数折线图: {
    chartType: 'line',
    title: '对数折线图展示示例', // 图标标题
    titleLeftMargin: 215,
    xKeys: ['对数折线图', 'xdata'], // 获取 x 轴数据的键名
    yKeys: ['对数折线图', 'ydata'], // 获取 y 轴数据的键名
    xUnit: 'x 轴单位', // x 轴单位
    xType: 'logarithmic', // x 轴类型
    xRanges: null, // x 轴范围
    xTickInterval: 1, // x 轴刻度间距
    xReversed: false, // x 轴是否反转
    yType: 'logarithmic', // y 轴类型
    yUnit: 'y 轴单位', // y 轴单位
    yRanges: null, // x 轴范围
    yTickInterval: null, //  轴刻度间距
    yReversed: false, // y 轴是否反转
    tooltip: {
      headerFormat: '<b>{series.name}</b><br />',
      pointFormat: 'x = {point.x}, y = {point.y}',
    },
  }
}

function ConfigGraphDemo({ graphConfig, seriesData }) {
  const {
    chartType,
    title, // 图标标题
    xUnit, // x 轴单位
    xType, // x 轴类型  "linear", "logarithmic", "datetime" 或者 "category"之一，分别表示 “线性轴”、“对数轴”、“时间轴”、“分类轴”。
    xRanges, // x 轴范围
    xTickInterval,
    xReversed,
    yType, // y 轴类型
    yUnit, // y 轴单位
    yRanges, // x 轴范围
    yTickInterval,
    yReversed,
    tooltip,
  } = graphConfig
  const [xMin, xMax] = xRanges || [null, null]
  const [yMin, yMax] = yRanges || [null, null]
  // 标题的左边距，用于标题和图标居中对齐

  const config = {
    // 不显示标题，自己定制标题效果
    title: {
      text: title,
    },
    // 去除商标信息
    credits: {
      enabled: false,
    },
    colors,
    tooltip,
    chart: {
      // 绘图区域设置
      type: chartType,
      plotBorderWidth: 1,
      plotBorderColor: '#000',
    },
    xAxis: {
      type: xType,
      title: {
        text: xUnit,
      },
      tickLength: 4,
      tickColor: '#000',
      lineColor: '#000',
      min: xMin,
      max: xMax,
      reversed: xReversed || false,
      // tickPositions: [100, 1000, 2000, 4000, 8000], // 无效
      tickInterval: xTickInterval,
      // showLastLabel: true,
      // endOnTick: true,
      // 覆盖默认 labels 写法, 原：1k 2k 3k
      labels: {
        style: {
          color: '#000',
          fontSize: 10,
        },
        formatter() {
          return this.value
        },
      },
    },
    yAxis: {
      type: yType,
      tickInterval: yTickInterval,
      tickLength: 3,
      tickColor: '#000',
      min: yMin,
      max: yMax,
      reversed: yReversed || false,
      title: {
        text: yUnit,
      },
      labels: {
        style: {
          color: '#000',
          fontSize: 10,
        },
        formatter() {
          return this.value
        },
      },
    },
    legend: {
      itemWidth: 200,
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
    },
    series: seriesData,
    // series: selTestList.map(key => ({
    //   // Highcharts error #15: www.highcharts.com/errors/15
    //   data: xReversed ? graphData[key].reverse() : graphData[key],
    //   pointStart: 100,
    //   name: key,
    //   // 不显示 marker 点，每个坐标点的 marker
    //   marker: {
    //     enabled: false,
    //   },
    // })),
  }

  return (
    <Card bordered={false} style={{ marginBottom: 16 }}>
      <div style={{ width: 800, margin: '50px 0' }}>
        <ReactHighcharts config={config} />
      </div>
    </Card>
  )
}

class Index extends React.Component {
  render() {
    return (
      <div>
        {Object.keys(data).map((k, i) => (
          <ConfigGraphDemo key={i} graphConfig={graphConfig[k]} seriesData={data[k]} />
        ))}
      </div>
    )
  }
}

export default Index
