import { useState } from "react";

function JoinChat(props) {
  const [name, setName] = useState('')
  const login = () => props.login({user: {id: null, username: name}})
  return (
    <div style={{display: 'flex', flex: 1, backgroundColor: 'pink', justifyContent: 'center', alignItems: 'center'}}>
      <div>
        <span>Username:</span>
        <input
          onChange={e => setName(e.target.value)}
          onKeyUp={e => e.key === "Enter" && login()}
          placeholder="enter username" type="text"
          value={name}
        />
      </div>
      <div>
        <button
          onClick={login}>Join</button>
      </div>
    </div>
  );
}

export default JoinChat;
