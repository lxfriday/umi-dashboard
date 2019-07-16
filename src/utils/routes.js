const routes = [
  {
    id: '0',
    name: 'index',
    route: '/',
    hide: true, // 不显示 重定向到 /dashboard
  },
  {
    id: 'smooth-scroll-to',
    name: '1、smooth-scroll-to',
    route: '/smooth-scroll-to',
  },
  {
    id: 'get-object-value',
    name: '2、get-object-value',
    route: '/get-object-value',
  },
  {
    id: 'graphanalyse',
    name: '2、图表统计', // 图表分析
    route: '/graphanalyse',
  },
  {
    id: 'graphanalyse_dancicaishiliang',
    menuParentId: 'graphanalyse',
    name: '2-1、表格', // 单次采食量
    route: '/graphanalyse/dancicaishiliang',
  },
]

/**
 * 依据 pathname 获取页面的标题
 * @param pathname
 * @returns {string}
 */
export function getPageTitle(pathname) {
  let title = ''
  routes.forEach(v => {
    if (v.route === pathname) {
      title = v.name
    }
  })

  return title
}

export default routes
