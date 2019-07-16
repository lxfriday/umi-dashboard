/**
 * 错误码，定位错误
 * @author lxfriday
 */

const errorNoti = 'error at: '

export default {
  // models/app
  models__app__signInEffect: errorNoti + 'models/app/signInEffect',
  models__app__signUpEffect: errorNoti + 'models/app/signUpEffect',
  models__app__forgetPassEffect: errorNoti + 'models/app/forgetPassEffect',

  // models/dashboard
  models__dashboard__fetchStationList: errorNoti + 'models/dashboard/fetchStationList',
}
