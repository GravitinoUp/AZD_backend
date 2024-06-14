import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Auth } from 'src/modules/auth/entities/auth.entity'
import { LimitEvent } from 'src/modules/limit-event/entities/limit-event.entity'
import { Person } from 'src/modules/person/entities/person.entity'
import { PlanEvent } from 'src/modules/plan-event/entities/plan-event.entity'
import { PlanPosition } from 'src/modules/plan-position/entities/plan-position.entity'
import { PurchaseEvent } from 'src/modules/purchase-event/entities/purchase-event.entity'
import { Purchase } from 'src/modules/purchase/entities/purchase.entity'
import { RolePermission } from 'src/modules/role-permission/entities/role-permission.entity'
import { Role } from 'src/modules/role/entities/role.entity'
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm'

@Entity({ name: 'Users' })
export class User extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  user_uuid: string

  @Column()
  @ApiProperty()
  person_uuid: string

  @OneToOne(() => Person, (person) => person.user)
  @JoinColumn({ name: 'person_uuid', referencedColumnName: 'person_uuid' })
  @ApiProperty()
  person: Person

  @Column()
  @ApiProperty()
  role_id: number

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'role_id' })
  @ApiProperty()
  role: Role

  @Column({ default: true })
  @ApiProperty()
  is_active: boolean

  @Column()
  @ApiProperty()
  email: string

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  phone?: string

  @Column({ select: false })
  @ApiProperty()
  password: string

  @OneToMany(() => Auth, (auth) => auth.user, { cascade: true })
  auths: Auth[]

  @OneToMany(() => PlanPosition, (plan) => plan.user, { cascade: true })
  plan_positions: PlanPosition[]

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.user, {
    cascade: true,
  })
  role_permissions: RolePermission[]

  @OneToMany(() => PlanEvent, (planEvent) => planEvent.user, { cascade: true })
  plan_events: PlanEvent[]

  @OneToMany(() => LimitEvent, (limitEvent) => limitEvent.user, { cascade: true })
  limit_events: LimitEvent[]

  @OneToMany(() => PurchaseEvent, (purchaseEvent) => purchaseEvent.user, { cascade: true })
  purchase_events: PurchaseEvent[]

  @OneToMany(() => Purchase, (purchase) => purchase.initiator, { cascade: true })
  purchases: Purchase[]
}
