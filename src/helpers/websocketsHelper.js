import ActionCable from "actioncable"

const createConsumer = (function() {
  let consumer

  return () => {
    if (!consumer) {
      consumer = ActionCable.createConsumer("ws://localhost:3000/cable")
    }

    return consumer
  }
})()

const createSubscription = (channel, onReceived) => {
  const consumer = createConsumer()
  consumer.subscriptions.create({channel}, {received: onReceived})
}

const helper = {
  createSubscription
}

export default helper
