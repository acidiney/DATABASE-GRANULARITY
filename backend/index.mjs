import sqlite from 'sqlite-sync'
import cors from 'cors'
import express from 'express'

function createDatabase() {
  function initDatabase() {
    const db = sqlite.connect('todos.sqlite');
    db.run("CREATE TABLE todos (id  INTEGER PRIMARY KEY AUTOINCREMENT, todo TEXT NOT NULL, done BOOL DEFAULT FALSE );");
    return db
  }

  const db = initDatabase()

  return {
    select: function () {
      return db.run("SELECT * FROM todos");
    },
    findOne: function (id) {
      return db.run(`SELECT * FROM todos WHERE id = ?`, [id])
    },
    create: function ({ todo, done = false }) {
      return db.insert('todos', { todo, done });
    },
    update: function (body, id) {
      return db.update('todos', body, { id })
    },
    delete: function (id) {
      return db.delete('todos', { id })
    }
  }
}

function createServer() {
  const app = express()
  app.use(cors())
  app.use(express.json())

  const db = createDatabase()

  app.get('/todos', function (req, res) {
    const todos = db.select()
    return res.json(todos)
  })

  app.post('/todos', function (req, res) {
    const body = req.body
    const todo = db.create({ todo: body.todo })
    return res.json(todo)
  })

  app.patch('/todos', function (req, res) {
    const { todos = [] } = req.body
    todos.forEach(todo => {
      if(todo.created) {
        db.create({ todo: todo.todo, done: todo.done })
        return
      }

      if (todo.removed) {
        db.delete(todo.id)
        return
      }

      db.update({ done: todo.done }, todo.id)
    });
    return res.json(todos)
  })


  app.put('/todos/:id', function (req, res) {
    const { id } = req.params
    const todo = db.findOne(id)[0]
    todo.done = !todo.done
    db.update({ done: todo.done }, todo.id)
    return res.json([todo])
  })

  app.delete('/todos/:id', function (req, res) {
    const { id } = req.params
    db.delete(id)
    return res.json({
      message: 'ok'
    })
  })

  

  return app
}

const server = createServer()


server.listen(3000)