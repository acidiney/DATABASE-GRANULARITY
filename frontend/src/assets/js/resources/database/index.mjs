import Dexie from 'dexie'

import { DB_VERSION } from '../../constants.mjs'

export const db = new Dexie("DBPOC");

export function loadDatabase() {
  db.version(DB_VERSION).stores({
    todos: '++id,todo,done,diff,removed,created'
  })
  console.log('[Database]> loaded ...')
}

export const insertData = async (data) => {
  db.todos.bulkPut(data)
    .then(() => {
      console.log('[Database]> Updated')
    })
  return data
}

export const deleteAll = async () => {
  await db.todos.where("done").anyOf(1, 0).delete()
}

export const select = () => db.todos.toArray()

export const diffData = () => db.todos.where('diff').equals(1).toArray();

export const updateTodoLocal = (todos) => {
  todos.forEach(todo => {
    db.todos.where('id').equals(todo.id).modify({ done: todo.done, diff: todo.diff ? 1 : 0, removed: todo.removed, created: todo.created });
  });
}
export const removeTodo = (id) => {
  db.todos.where('id').equals(id).delete()
}