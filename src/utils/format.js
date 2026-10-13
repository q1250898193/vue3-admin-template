// 日期格式化
export function formatDate(date, fmt = 'YYYY-MM-DD HH:mm:ss') {
  if (!date) return '-'
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hour = String(d.getHours()).padStart(2, '0')
  const minute = String(d.getMinutes()).padStart(2, '0')
  const second = String(d.getSeconds()).padStart(2, '0')
  return fmt
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hour)
    .replace('mm', minute)
    .replace('ss', second)
}

// 金额格式化（分 -> 元，千分位）
export function formatMoney(fen) {
  if (fen == null) return '-'
  return (fen / 100).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

// 文件名脱敏：长字符串截断
export function truncate(str, len = 20) {
  if (!str) return ''
  return str.length > len ? str.slice(0, len) + '...' : str
}
