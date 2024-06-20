export const RolesEnum = {
  USER: 1,
  ADMIN: 2,
}

export const PurchaseStepsEnum = {
  APPLICATIONS: 1,
  COMISSION_WORK: 2,
  COMPLETED: 3,
  ENDED: 4,
}

export const LimitStatusesEnum = {
  CREATED: 1,
  ON_APPROVAL: 2,
  APPROVED: 3,
  DECLINED: 4,
}

export const PlanStatusesEnum = {
  IN_PREPARATION: 1,
  ON_APPROVAL: 2,
  FOR_REVISION: 3,
  SENT_FOR_CONTROL: 4,
  NOT_ACCEPTED_FOR_CONTROL: 5,
  AT_CONTROL: 6,
  CONTROL_FAILED: 7,
  POSTED: 8,
}

export const EntitiesEnum = {
  PLANS: 1,
  LIMITS: 2,
  PURCHASES: 3,
  TECH_TASKS: 4,
  DOCUMENTS: 5,
}

export const CacheRoutes = {
  AGREEMENT: 'agreement',
  AGREEMENT_STATUS: 'agreement-status',
  BRANCH: 'branch',
  COMMERCIAL_OFFER: 'commercial-offer',
  CURRENCY: 'currency',
  DOCUMENT_TYPE: 'document-type',
  DOCUMENT: 'document',
  ENTITY: 'entity',
  KBK: 'kbk',
  KOSGU: 'kosgu',
  LIMIT: 'limit',
  LIMIT_EVENT: 'limit-event',
  LIMIT_STATUS: 'limit-status',
  OKEI: 'okei',
  OKPD: 'okpd',
  ORGANIZATION: 'organization',
  ORGANIZATION_TYPE: 'organization_type',
  PERMISSION: 'permission',
  PERSON: 'person',
  PURCHASE: 'purchase',
  PURCHASE_EVENT: 'purchase-event',
  PLAN: 'plan',
  PLAN_POSITION: 'plan-position',
  PLAN_EVENT: 'plan-event',
  PLAN_STATUS: 'plan-status',
  PLAN_WAY: 'plan-way',
  PRODUCT: 'product',
  PROPERTY: 'property',
  PURCHASE_STEP: 'purchase-step',
  PURCHASE_TYPE: 'purchase-type',
  ROLE: 'role',
  ROLE_AGREEMENT: 'role-agreement',
  ROLE_PERMISSION: 'role-permission',
  TECHNICAL_TASK: 'technical-task',
  USER: 'user',
}

export const DefaultPagination = {
  COUNT: 50,
  PAGE: 1,
}
