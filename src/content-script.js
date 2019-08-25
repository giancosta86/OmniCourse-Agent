;(() => {
  const portal = Portal()
  const courseDetector = CourseDetector(portal)

  let descriptorPromise = courseDetector.scanPageForCourse()
  let latestParsedUrl = window.location.href

  const handleDescriptorRequest = async () => {
    let currentUrl = window.location.href

    if (currentUrl != latestParsedUrl) {
      descriptorPromise = courseDetector.scanPageForCourse()
      latestParsedUrl = currentUrl
    }

    let descriptor = await descriptorPromise

    platform.sendMessage({
      type: MessageType.DescriptorResponse,
      url: currentUrl,
      descriptor
    })
  }

  platform.listen(message => {
    switch (message.type) {
      case MessageType.DescriptorRequest:
        handleDescriptorRequest()
        break
    }
  })

  platform.sendMessage({ type: MessageType.ShowPopup })
})()
