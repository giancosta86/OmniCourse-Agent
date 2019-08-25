const showDescriptor = descriptor => {
  let formattedDescriptor = formatDescriptor(descriptor)

  let descriptorArea = document.querySelector("#descriptor-area")
  descriptorArea.value = formattedDescriptor
  descriptorArea.classList.remove("off-screen")

  document.querySelector("#copy-button").classList.remove("off-screen")

  document.querySelector("#waiting-box").remove()
}

const formatDescriptor = descriptor => {
  if (!descriptor || !descriptor.title || !descriptor.minutes) {
    return "(not enough information for an OmniCourse descriptor)"
  }

  let descriptorToPrint = {}

  for (let [key, value] of Object.entries(descriptor)) {
    if (value) {
      descriptorToPrint[key] = value
    }
  }

  return JSON.stringify(descriptorToPrint, null, 2)
}

window.addEventListener("load", () => {
  document.querySelector("#copy-button").addEventListener("click", () => {
    let descriptorArea = document.querySelector("#descriptor-area")

    descriptorArea.select()
    document.execCommand("copy")

    window.close()
  })

  platform.queryActiveTab(tab => {
    let tabUrl = tab.url

    platform.listen(message => {
      switch (message.type) {
        case MessageType.DescriptorResponse:
          if (message.url == tabUrl) {
            showDescriptor(message.descriptor)
          }
          break
      }
    })

    platform.sendMessageToTab(tab.id, {
      type: MessageType.DescriptorRequest
    })
  })
})
