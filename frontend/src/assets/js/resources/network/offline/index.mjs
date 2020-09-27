import { select, updateTodoLocal, insertData } from '../../database/index.mjs'
import event from '../../event.js'

const offline = {
  createTodo(todo) {
    return (new Promise(function () {
      insertData([{ todo, created: 1, diff: 1, done: 0 }])
      event.emit('reload')
    }))
  },
  todos: function () {
    console.log('[Database]> Query local data')
    return select()
  },
  updateTodo: (id, done) => {
    done = !done
    updateTodoLocal([{ id, done, diff: true }])
    event.emit('reload')
  },
  deleteTodo(id) {
    updateTodoLocal([{ id, removed: 1, diff: true, done: 1 }])
    event.emit('reload')

  },
}
export default offline