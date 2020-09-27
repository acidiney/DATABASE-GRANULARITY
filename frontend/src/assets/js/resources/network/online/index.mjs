import { API_URL } from '../../../constants.mjs'
import { insertData, diffData, updateTodoLocal, removeTodo, deleteAll } from '../../database/index.mjs'
import event from '../../event.js'

const requestModifier = (response) => response.json()
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const online = {
  createTodo: (todo) => {
    return fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify({
        todo
      }),
      headers: myHeaders
    })
    .then(() => {
      event.emit('reload')
    })
  },
  todos: () => {
    return fetch(API_URL)
      .then(requestModifier)
      .then((data) => data.map(todo => ({
        ...todo,
        diff: false
      })))
      .then(insertData)
  },
  updateTodo: (id) => {
    return fetch(API_URL + `/${id}`, {
      method: 'PUT'
    })
      .then(requestModifier)
      .then(todos => todos.map(todo => ({
        ...todo,
        diff: false
      })))
      .then(updateTodoLocal)
  },
  deleteTodo: (id) => {
    return fetch(API_URL + `/${id}`, {
      method: 'DELETE'
    })
      .then(requestModifier)
      .then(() => {
        removeTodo(id)
        event.emit('reload')
      })
  },
  sync: async () => {
    console.log('[app]> sync...')

    const todosWithDiff = await diffData()
    return fetch(API_URL, {
      method: 'PATCH',
      body: JSON.stringify({
        todos: todosWithDiff
      }),
      headers: myHeaders
    })
      .then(requestModifier)
      .then(todos => todos.map(todo => ({
        ...todo,
        diff: false
      })))
      .finally(() => {
        deleteAll()
        event.emit('reload')
        console.log('[app]> sync end :-)')
      })
  }
}

export default online