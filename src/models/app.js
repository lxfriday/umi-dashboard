import router from 'umi/router'
import store from 'store'
import routeList from '@/utils/routes'
import storage from '@/utils/storage'
import sysErrorCode from '@/utils/sysErrorCode'
import { signInService, signUpService, forgetPassService } from '@/services/login'
import { notiErr, notiSuccess } from '@/utils/notification'

export default {
  namespace: 'app',
  state: {
    loggedIn: false, // 是否已经登录了
    user: {
      username: 'lxfriday',
    },
    // username: 'lxfriday',
    // token: 'asdsjfjskdfhjksdbfkjsdbfkbj',
    // rank: 'super', //  'super' || 'common'
    routeList,
    locationPathname: '',
    locationQuery: {},
    theme: 'light',
    openKeys: ['graphanalyse'], // 侧边栏菜单打开状态的 keys
    scrollContainerTo: () => {},
  },
  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen(location => {
        // 页面跳转的时候检查用户是否已经登录
        // if (location.pathname !== '/login') {
        //   dispatch({
        //     type: 'checkUserLoggedInEffect',
        //   })
        // }

        // 每次路由变化都将变化后的路由信息保存
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: location.query,
          },
        })
      })
    },
  },
  effects: {
    *signInEffect(
      {
        payload: { data },
      },
      { call, put }
    ) {
      try {
        const result = yield call(signInService, {
          username: data.username,
          password: data.password,
        })
        if (result && result.success && result.data) {
          const rdata = result.data

          yield put({
            type: 'signInReducer',
            payload: {
              // user: {
              //   username: '',
              //   token: '',
              //   rank: 'common', //  'super' || 'common'
              // },
              user: rdata.user,
              loggedIn: true,
            },
          })

          store.set(storage.user, JSON.stringify(rdata.user))

          router.push({
            pathname: '/',
          })
        } else {
          notiErr(result.err_msg)
        }
      } catch (e) {
        notiErr('内部错误')
        console.log(sysErrorCode.models__app__signInEffect)
      }
    },
    *signUpEffect(
      {
        payload: { data },
      },
      { call, put }
    ) {
      try {
        const result = yield call(signUpService, {
          username: data.username,
          password: data.password,
          email: data.email,
          phone: data.phone,
        })

        if (result && result.success && result.data) {
          const rdata = result.data

          yield put({
            type: 'signUpReducer',
            payload: {
              // user: {
              //   username: '',
              //   token: '',
              //   rank: 'common', //  'super' || 'common'
              // },
              user: rdata.user,
              loggedIn: true,
            },
          })

          store.set(storage.user, JSON.stringify(rdata.user))

          router.push({
            pathname: '/',
          })
        } else {
          notiErr(result.err_msg)
        }
      } catch (e) {
        notiErr('内部错误')
        console.log(sysErrorCode.models__app__signUpEffect)
      }
    },
    // 忘记密码，输入信息之后，点击确定
    *forgetPassEffect(
      {
        payload: { data, cb },
      },
      { call }
    ) {
      try {
        const result = yield call(forgetPassService, {
          email: data.email,
          password: data.password,
        })

        if (result && result.success) {
          cb && cb()
        } else {
          notiErr(result.err_msg)
        }
      } catch (e) {
        notiErr('内部错误')
        console.log(sysErrorCode.models__app__forgetPassEffect)
      }
    },
    // 退出登录状态
    *logoutEffect(_, { put }) {
      store.remove(storage.user)
      router.push('/login')
      notiSuccess('已经成功退出登录！')
      yield put({
        type: 'logoutReducer',
      })
    },
    // 检查用户是否已经登录，没有登录则跳转到登录页面去
    // *checkUserLoggedInEffect(_, { select, put }) {
    //   // 判定用户的身份信息
    //   const userInfo = store.get(storage.user) || null
    //   if (!userInfo) {
    //     router.push('/login')
    //   }
    //   yield put({
    //     type: 'applyUser',
    //     payload: {
    //       ...JSON.parse(userInfo),
    //     },
    //   })
    // },
  },
  reducers: {
    addContainerScroller(state, { payload }) {
      return {
        ...state,
        scrollContainerTo: payload.scrollContainerTo,
      }
    },
    signInReducer(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
    signUpReducer(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
    logoutReducer(state) {
      return {
        ...state,
        user: null,
        loggedIn: false,
      }
    },
    applyUser(state, { payload }) {
      return {
        ...state,
        user: {
          ...payload,
        },
      }
    },
  },
}
