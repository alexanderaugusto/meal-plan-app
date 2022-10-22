import { db } from '../config/db'
import { UserProps } from '../types/UserType'
import helper from '../utils/helper'

function add(user: UserProps) {
  user.id = helper.generateUUID()
  localStorage.setItem('userId', user.id)
  return db.user.add(user)
}

function update(user: UserProps) {
  return db.user.update(user.id, user)
}

function getById(id: string) {
  return db.user.get(id)
}

const userService = {
  add,
  update,
  getById
}

export default userService

