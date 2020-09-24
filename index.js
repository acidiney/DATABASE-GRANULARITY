var db = new Dexie("DBTest");
db.version(1).stores({
    todos: '++id,completed,title,userId'
});

function checkNetworkState () {
  return !navigator.onLine
}

//////////////////////////////////////////

const target = {
  online: {
    todos: function () {
      fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => {
        db.todos.bulkPut(json)
          .then(() => {
            console.log('DB Local Updated')
          })
        return json
      })
      .then(json => console.log(json))
    }
  },

  offline: {
    todos: function () {
      db.todos.toArray(function (todos) {
         console.log(todos.map(JSON.stringify).join('\n'));
      })
    }
  }
}
const handler = {
  get: function (obj, prop) {
    if (checkNetworkState()) return obj.online[prop]
    return obj.offline[prop]
  }
}

let api = new Proxy(target, handler);
api.todos()
