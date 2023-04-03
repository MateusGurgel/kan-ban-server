import Bouncer from '@ioc:Adonis/Addons/Bouncer'
import Kanban from 'App/Models/Kanban'
import User from 'App/Models/User'

export const { actions } = Bouncer.define('accessKanban', (user: User, owner: User) => {
  return owner.id === user.id
}).define('accessTask', (user: User, father: Kanban) => {
  return user.id === father.userId
})

export const { policies } = Bouncer.registerPolicies({})
