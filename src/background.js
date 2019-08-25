;(() => {
  const showPopup = () => {
    platform.queryActiveTab(tab => {
      platform.showPageAction(tab.id)
    })
  }

  platform.listen(message => {
    switch (message.type) {
      case MessageType.ShowPopup:
        showPopup()
        break
    }
  })
})()
