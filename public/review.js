// @ts-nocheck

const deleteIconSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
  class="bi bi-trash text-danger" viewBox="0 0 16 16" data-darkreader-inline-fill=""
  style="--darkreader-inline-fill:currentColor;">
  <path
    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z">
  </path>
  <path fill-rule="evenodd"
    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z">
  </path>
  </svg>
  `
const editIconSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
  class="bi bi-pencil-square text-success" viewBox="0 0 16 16" data-darkreader-inline-fill=""
  style="--darkreader-inline-fill:currentColor;">
  <path
    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z">
  </path>
  <path fill-rule="evenodd"
    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z">
  </path>
  </svg>
  `

let todoArr = []
const uri = 'http://localhost:3000/api/v1/todo'
const JWT_KEY_NAME = 'jwt'
/* show & hide error message */
const errorMsg = document.querySelector('.danger')
const errorMsgText = document.querySelector('.text-error')
//const userEmailPlaceholder = document.querySelector('#user-email')
//const logoutBtn = document.querySelector('#logout')

const showErrorMsg = err => {
  errorMsgText.innerText =
    err.message || 'Error while deleting the to-do from list'
  errorMsg.style.display = 'block'
  console.error(err.message)
}
const hideErrorMsg = () => (errorMsg.style.display = 'none')

const getJWT = () => localStorage.getItem(JWT_KEY_NAME)

window.addEventListener('load', async () => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getJWT()
    }
  }
  try {
    const response = await fetch(uri, options)
    const data = await response.json()

    if (Array.isArray(data)) {
      todoArr = data
      const lastIndex = data.length - 1
      data.forEach(t => {
        createTodo(t)
      })
    }

    
  } catch (err) {
    showErrorMsg(err)
  }
})

const saveTodo = async todo => {
  return new Promise(async (resolve, reject) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getJWT()
      },
      body: JSON.stringify(todo)
    }
    try {
      const response = await fetch(uri, options)
      const data = await response.json()
      hideErrorMsg()
      resolve(data) // return data
    } catch (err) {
      showErrorMsg(err)
      reject(err) // throw err
    }
  })
}

const editToDo = async todo => {
  return new Promise(async (resolve, reject) => {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getJWT()
      },
      body: JSON.stringify(todo)
    }
    try {
      const response = await fetch(`${uri}/${todo._id}`, options)
      const data = await response.json()
      resolve(data)
      hideErrorMsg()
    } catch (err) {
      showErrorMsg(err)
      reject(err)
    }
  })
}

const toggleIsCompleted = (id, todoText, evt) => {
  const index = todoArr.findIndex(todo => todo._id === id)
  if (index !== -1) {
    todoArr[index].isCompleted = !todoArr[index].isCompleted
    editToDo(todoArr[index])
      .then(() => {
        // no action
      })
      .catch(err => {
        todoArr[index].isCompleted = !todoArr[index].isCompleted
        evt.target.checked = todoArr[index].isCompleted
        showErrorMsg(err)
      })
      .finally(() => {
        todoArr[index].isCompleted
          ? todoText.classList.add('strike')
          : todoText.classList.remove('strike')
      })
  }
}

const deleteTodo = async id => {
  return new Promise(async (resolve, reject) => {
    const index = todoArr.findIndex(todo => todo._id === id)
    if (index !== -1) {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: getJWT()
        }
      }
      try {
        const response = await fetch(`${uri}/${id}`, options)
        await response.json()
        hideErrorMsg()
        resolve()
      } catch (err) {
        showErrorMsg(err)
        reject(error)
      }
    }
  })
}

const editTodoText = (id, todo) => {
  const index = todoArr.findIndex(todo => todo._id === id)
  if (index !== -1) {
    const prevToDoText = todoArr[index].toDo
    editToDo({ ...todoArr[index], toDo: todo.textContent })
      .then(() => {
        todoArr[index].toDo = todo.textContent
      })
      .catch(err => {
        todoArr[index].toDo = prevToDoText
        todo.textContent = prevToDoText
        showErrorMsg(err)
      })
  }
}

/* add to do component */
const todoUserText = document.querySelector('#add-todo')
const addTodoBtn = document.querySelector('#add-todo-btn')
todoUserText.addEventListener('focus', () => hideErrorMsg())

/* todo list */
const todoList = document.querySelector('#todo-list')

const createTodo = todo => {
  const { toDo: userInputText, _id: id, isCompleted, userName } = todo

  if (!userInputText || !id || typeof isCompleted !== 'boolean') {
    return
  }
  /* <li></li> */
  const todoLi = document.createElement('li')
  todoLi.classList.add('list-group-item')

  /* <div></div> */
  const todoMainDiv = document.createElement('div')
  todoMainDiv.classList.add(
    'd-flex',
    'align-items-center',
    'justify-content-between',
    'my-1'
  )
  todoLi.appendChild(todoMainDiv)

  /* <div></div> */
  const leftDiv = document.createElement('div')
  leftDiv.classList.add('d-flex')
  todoMainDiv.appendChild(leftDiv)

  /* <div></div> */
  const rightDiv = document.createElement('div')
  todoMainDiv.appendChild(rightDiv)

  /* <input type='checkbox'> */
  const markCompleteCb = document.createElement('input')
  markCompleteCb.setAttribute('type', 'checkbox')
  markCompleteCb.setAttribute('id', id)
  markCompleteCb.classList.add('form-check-input')
  markCompleteCb.checked = isCompleted
  const cbId = markCompleteCb.getAttribute('id')

  /* <p></p> */
  const todoText = document.createElement('p')
  todoText.innerText = userInputText
  todoText.classList.add('ms-3')
  todoText.setAttribute('contenteditable', true)
  leftDiv.appendChild(markCompleteCb)
  leftDiv.appendChild(todoText)
  if (isCompleted) todoText.classList.add('strike')

  markCompleteCb.addEventListener('click', evt => {
    toggleIsCompleted(cbId, todoText, evt)
  })

  /* <span></span> */
  const deleteBtn = document.createElement('span')
  deleteBtn.innerHTML = deleteIconSVG
  rightDiv.appendChild(deleteBtn)

  deleteBtn.addEventListener('click', () => {
    deleteTodo(cbId)
      .then(() => todoLi.remove())
      .catch(err => showErrorMsg(err))
  })

  /* <span></span> */
  const editBtn = document.createElement('span')
  editBtn.innerHTML = editIconSVG
  rightDiv.appendChild(editBtn)

  editBtn.addEventListener('click', () => {
    todoText.setAttribute('contenteditable', true)
    todoText.focus()
    hideErrorMsg()
  })

  todoText.addEventListener('focus', () => {
    hideErrorMsg()
  })
  todoText.addEventListener('blur', () => {
    if (!todoText.textContent) {
      deleteTodo(cbId)
        .then(() => todoLi.remove())
        .catch(err => showErrorMsg(err))
      return
    }
    todoText.setAttribute('contenteditable', false)
    editTodoText(cbId, todoText)
  })
  /* <ul></ul> */
  todoList.appendChild(todoLi)

  // img.setAttribute('src', book.coverPhoto)
}

/* Add to do event handling */
addTodoBtn.addEventListener('click', () => {
  if (!todoUserText.value) return
  saveTodo({ toDo: todoUserText.value })
    .then(todo => {
      createTodo(todo)
      todoUserText.value = ''
      todoArr.push(todo)
    })
    .catch(err => showErrorMsg(err))
})



