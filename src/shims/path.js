export const basename = path => {
  if (typeof path !== 'string') {
    return ''
  }
  const normalized = path.replace(/\\/g, '/')
  const parts = normalized.split('/').filter(Boolean)
  return parts[parts.length - 1] || ''
}

export default {
  basename
}
