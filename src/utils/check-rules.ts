import { NotFoundException } from '@nestjs/common'

export default async function checkRule(
  fieldOnValue: number,
  fieldOnOperator: string,
  fieldOnConditionValue: number,
  fieldForValue?: number,
  fieldForOperator?: string,
  fieldForConditionValue?: number,
) {
  const isFieldOnCorrect = isFieldCorrect(fieldOnValue, fieldOnOperator, fieldOnConditionValue)

  if (fieldForValue != null && fieldForOperator != null && fieldForConditionValue != null) {
    if (isFieldOnCorrect) {
      const isFieldForCorrect = !isFieldCorrect(
        fieldForValue,
        fieldForOperator,
        fieldForConditionValue,
      )

      return isFieldForCorrect
    } else {
      return false
    }
  } else {
    const isFieldOnCorrect = isFieldCorrect(fieldOnValue, fieldOnOperator, fieldOnConditionValue)

    return isFieldOnCorrect
  }
}

function isFieldCorrect(
  fieldValue: number,
  fieldOperator: string,
  fieldConditionValue: number,
): boolean {
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
