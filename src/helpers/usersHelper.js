const keyNamesById = users => (
  users.reduce((acc, u) => (
    {...acc, [u.id]: u.username}
  ), {})
)

const partitionByOnline = (users, user) => (
  users.reduce((acc, u) => {
    const styles = {}
    if (u.id === user.id) styles["backgroundColor"] = "lime"

    const idx = u.status === "available" ? 0 : 1
    acc[idx].push(<div style={styles} key={u.id}>{u.username}</div>)
    return acc
  }, [[], []])
)

const helper = {
  keyNamesById,
  partitionByOnline
}
export default helper
