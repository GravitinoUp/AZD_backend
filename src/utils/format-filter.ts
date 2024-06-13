import { ILike } from 'typeorm'

export function formatFilter(obj: any) {
  Object.keys(obj).forEach((key) => {
    let value = obj[key]
    if (typeof value !== 'object') {
      const uuidRegex = new RegExp(
        '^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$',
      )

      // TODO DATE REGEX

      if (
        (typeof value == 'string' || value instanceof String) &&
        !uuidRegex.test(value.toString())
      ) {
        value = ILike(`%${value}%`)
      }
    } else {
      value = formatFilter(value)
    }

    obj[key] = value
  })

  return obj
}
