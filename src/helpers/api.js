const addNewUser = async data => {
  const res = await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({user: {status: "available", username: data.user.username}}),
  });

  return res.json();
};

const logout = async data => {
  return await fetch(
    `http://localhost:3000/users/${data.user.id}/logout`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    }
  )
}

const sendUserMessage = async data => {
  const res = await fetch(
    `http://localhost:3000/users/${data.user.id}/add_message`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: data.user.id,
        message: data.message.content,
      }),
    }
  );

  return res
};

const fetchUsers = async () => {
  const res = await fetch(
    "http://localhost:3000/users",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    }
  )

  return res.json()
}

const fetchMessages = async () => {
  const res = await fetch(
    "http://localhost:3000/messages",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    }
  )

  return res.json()
}

const api = {
  addNewUser,
  fetchMessages,
  fetchUsers,
  logout,
  sendUserMessage,
}

export default api
