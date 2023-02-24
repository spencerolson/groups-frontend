import './App.css'
import { useEffect, useState } from "react"
import ChatApp from './components/ChatApp'
import JoinChat from './components/JoinChat'
import API from './helpers/api'
import websocketsHelper from './helpers/websocketsHelper'

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("currentUser") || '{"username":null}'))
  const [users, setUsers] = useState([])
  const [messages, setMessages] = useState([])

  const handleUserAdded = user => {
    setUsers(prevUsers => {
      const res = prevUsers.reduce((acc, u) => {
        acc[u.id] = u
        return acc
      }, {})
      res[user.id] = user
      return Object.values(res)
    })
  }

  const handleMessageAdded = message => {
    setMessages(prevMessages => [...prevMessages, message])
  }

  const createSubscriptions = () => {
    websocketsHelper.createSubscription('MessagesChannel', handleMessageAdded)
    websocketsHelper.createSubscription('UsersChannel', handleUserAdded)
  }

  const initializeUsers = async () => setUsers(await API.fetchUsers())
  const initializeMessages = async () => setMessages(await API.fetchMessages())

  useEffect(createSubscriptions, [])
  useEffect(() => { initializeUsers() }, [])
  useEffect(() => { initializeMessages() }, [])

  const saveAndSetUser = async data => {
    let currentUser
    if (!data.user.id) {
      currentUser = await API.addNewUser(data)
    } else {
      await API.logout(data)
      currentUser = {}
    }
    localStorage.setItem("currentUser", JSON.stringify(currentUser))
    setUser(currentUser)
  }

  return (
    <>
      {user.id
        ? <ChatApp user={user} users={users} messages={messages} logout={saveAndSetUser} sendMessage={API.sendUserMessage} />
        : <JoinChat login={saveAndSetUser} />}
    </>
  )
}

export default App
