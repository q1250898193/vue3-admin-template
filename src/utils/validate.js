// 常用表单校验规则（Element Plus form 用）
export const validators = {
  // 手机号
  phone: (rule, value, callback) => {
    if (!value) return callback()
    if (!/^1[3-9]\d{9}$/.test(value)) callback(new Error('请输入正确的手机号'))
    else callback()
  },
  // 邮箱
  email: (rule, value, callback) => {
    if (!value) return callback()
    if (!/^[\w.-]+@[\w.-]+\.\w+$/.test(value)) callback(new Error('请输入正确的邮箱'))
    else callback()
  },
  // 身份证
  idCard: (rule, value, callback) => {
    if (!value) return callback()
    if (!/^\d{17}[\dXx]$/.test(value)) callback(new Error('请输入正确的身份证号'))
    else callback()
  }
}

// 非空校验
export const required = (message = '不能为空') => ({ required: true, message, trigger: 'blur' })
