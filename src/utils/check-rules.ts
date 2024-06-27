import { NotFoundException } from '@nestjs/common'

export default async function checkRule(
  fieldValue: number,
  fieldOperator: string,
  fieldConditionValue: number,
) {
  switch (fieldOperator) {
    case '=':
      return !(fieldValue === fieldConditionValue)
    case '>':
      return !(fieldValue > fieldConditionValue)
    case '>=':
      return !(fieldValue >= fieldConditionValue)
    case '<':
      return !(fieldValue < fieldConditionValue)
    case '<=':
      return !(fieldValue <= fieldConditionValue)
    default:
      throw new NotFoundException('OPERATOR_NOT_FOUND')
  }
}
