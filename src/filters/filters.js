/**
 *格式化时间
 *yyyy-MM-dd hh:mm:ss
 */
export function setTime (list_reply) {
  const yy = list_reply.getFullYear()
  const MM = (list_reply.getMonth() + 1).toString().padStart(2, '0')
  const dd = list_reply
    .getDate()
    .toString()
    .padStart(2, '0')
  const hh = list_reply
    .getHours()
    .toString()
    .padStart(2, '0')
  const ff = list_reply
    .getMinutes()
    .toString()
    .padStart(2, '0')
  const mm = list_reply
    .getSeconds()
    .toString()
    .padStart(2, '0')
  return `${yy}.${MM}.${dd}`
}
export function setTime2 (list_reply) {
  const hh = list_reply
    .getHours()
    .toString()
    .padStart(2, '0')
  const ff = list_reply
    .getMinutes()
    .toString()
    .padStart(2, '0')
  const mm = list_reply
    .getSeconds()
    .toString()
    .padStart(2, '0')
  return `${hh}:${ff}`
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}
/*
 * 隐藏用户手机号中间四位
 */
export function hidePhone (phone) {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}
// 最多保留两位小数
export function formatMomey (num) {
  return Math.round(num * 100) / 100
}
export const warnType = val => {
  if (val === 0) {
    return '超高温'
  } else if (val === 1) {
    return '超低温'
  } else if (val === 2) {
    return '超湿度'
  } else {
    return '低湿度'
  }
}
export const timeSFM = val => {
  if (!val) {
    return '未确认'
  }
  const arr = val.split(' ')
  return arr[1]
}
export const timeSFM1 = val => {
  const arr = val.split(' ')
  return arr[0]
}
export const warning = val => {
  if (!val) {
    return '无异常'
  }
  return val.replace(/告警/g, ' ')
}
