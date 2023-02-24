import { useState } from "react"
import usersHelper from "../helpers/usersHelper"

function ChatApp(props) {
  const [message, setMessage] = useState("")

  const sendMessage = () => {
    if (message.trim().length === 0) return

    props.sendMessage({user: props.user, message: {content: message.trim()}})
    setMessage("")
  }

  const namesById = usersHelper.keyNamesById(props.users)
  const [online, offline] = usersHelper.partitionByOnline(props.users, props.user)

  return (
    <div style={{display: 'flex', flex: 1, flexDirection: 'column', backgroundColor: 'pink'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', backgroundColor: 'cornsilk'}}>
        <div>
          <b>Welcome, {props.user.username}</b>
        </div>

        <div>
          <button onClick={() => props.logout({user: props.user})}>Log Out</button>
        </div>
      </div>

      <div style={{display: 'flex', flex: 1}}>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'aquamarine'}}>
          <div style={{flex: 1}}>
            <div>&lt;ONLINE&gt;</div>
            {online}
          </div>

          <div>
            <div>&lt;OFFLINE&gt;</div>
            {offline}
          </div>
        </div>

        <div style={{display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
          <div>
            {props.messages.map(m => <div key={m.id}>[{namesById[m.user_id]}] {m.content}</div>)}
          </div>

          <div style={{display: 'flex', height: '30px'}}>
            <input
              style={{flex: 1}}
              placeholder="Message" type="text"
              onChange={e => setMessage(e.target.value)}
              onKeyUp={e => e.key === "Enter" && sendMessage()}
              value={message}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatApp
