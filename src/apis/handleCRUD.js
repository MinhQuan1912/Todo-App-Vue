const BASE_URL = 'http://localhost:3000/tasks'

const findAll = async () => {
  try {
    const response = await fetch(BASE_URL)
    if (!response.ok) {
      throw new Error(`Loi: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error(error)
  }
}
const addTask = async (task) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
    if (!response.ok) {
      throw new Error(`Loi: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error(error)
  }
}
const deleteTask = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      throw new Error(`Loi: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error(error)
  }
}
const findById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`)
    if (!response.ok) {
      throw new Error(`Loi: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error(error)
  }
}
const changeTask = async (id, task) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
    if (!response.ok) {
      throw new Error(`Loi: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error(error)
  }
}
export default {
  findAll,
  addTask,
  deleteTask,
  findById,
  changeTask,
}
