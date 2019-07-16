import { GET, POST, PUT, DELETE, urlBase } from './base'

// 获取测定站信息
export async function getStationListService() {
  return await GET(urlBase + '/admin/dashboard/stationinfo/')
}

// 获取种猪信息列表
export async function getPigInfoListService(data) {
  return await POST(urlBase + '/admin/piginfo/', data)
}

// 导出种猪信息
export async function exportDataService(data) {
  return await POST(urlBase + '/admin/piginfo/export/', data)
}

// 获取错误码列表
export async function fetchErrorcodeListService() {
  return await GET(urlBase + '/admin/errorcode/')
}

// 添加错误码
export async function addErrorcodeService(data) {
  return await POST(urlBase + '/admin/errorcode/', data)
}

// 更改错误码
export async function updateErrorcodeService(data) {
  return await PUT(urlBase + '/admin/errorcode/', data)
}

// 删除错误码
export async function deleteErrorcodeService(data) {
  return await DELETE(urlBase + '/admin/errorcode/', data)
}

// 删除错误码
export async function getStationAssessmentListService(data) {
  // return await DELETE(urlBase + '/admin/errorcode/', data);
}
