const MessageType = {
  ShowPopup: "ShowPopup",
  DescriptorRequest: "DescriptorRequest",
  DescriptorResponse: "DescriptorResponse"
}

const platform = (() => {
  const chromePlatform = {
    queryActiveTab: tabHandler =>
      chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
        if (tab) {
          tabHandler(tab)
        }
      }),

    sendMessage: message => chrome.runtime.sendMessage(message),

    sendMessageToTab: (tabId, message) =>
      chrome.tabs.sendMessage(tabId, message),

    listen: listener => chrome.runtime.onMessage.addListener(listener),

    showPageAction: tabId => chrome.pageAction.show(tabId)
  }

  const mozillaPlatform = {
    queryActiveTab: tabHandler =>
      browser.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
        if (tab) {
          tabHandler(tab)
        }
      }),

    sendMessage: message => browser.runtime.sendMessage(message),

    sendMessageToTab: (tabId, message) =>
      browser.tabs.sendMessage(tabId, message),

    listen: listener => browser.runtime.onMessage.addListener(listener),

    showPageAction: tabId => browser.pageAction.show(tabId)
  }

  return chrome ? chromePlatform : mozillaPlatform
})()
