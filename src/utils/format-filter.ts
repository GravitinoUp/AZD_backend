import { Like } from 'typeorm'

export function formatFilter(obj: any) {
  Object.keys(obj).forEach((key) => {
    let value = obj[key]
    if (typeof value !== 'object') {
      if (typeof value == 'string' || value instanceof String) {
        value = Like(`%${value}%`)
      }
    } else {
      value = formatFilter(value)
    }

    obj[key] = value
  })

  return obj
}
