const parsing = (() => {
  const RetryCount = 45
  const RetryIntervalInMilliseconds = 100

  const getElementSync = (...selectors) => {
    for (let selector of selectors) {
      let element = document.querySelector(selector)

      if (element) {
        return element
      }
    }
  }

  const getElement = async (...selectors) =>
    new Promise(resolve => {
      if (!selectors.length) {
        resolve(null)
        return
      }

      const tryToGetElement = attemptOrdinal => {
        let element = getElementSync(...selectors)

        if (element) {
          resolve(element)
        } else if (attemptOrdinal == RetryCount) {
          resolve(null)
        } else {
          setTimeout(
            () => tryToGetElement(attemptOrdinal + 1),
            RetryIntervalInMilliseconds
          )
        }
      }

      tryToGetElement(1)
    })

  const getText = async (...selectors) => {
    let targetElement = await getElement(...selectors)

    if (targetElement) {
      let textValue = targetElement.content
        ? targetElement.content
        : targetElement.innerText

      return textValue.trim()
    }
  }

  const getTitle = (...selectors) =>
    getText(...[].concat(selectors).concat(["head meta[property='og:title']"]))

  const getMinutes = async (...selectors) => {
    let durationString = await getText(...selectors)

    if (durationString) {
      return dateTime.parseDurationMinutes(durationString)
    }
  }

  const getCompletionDate = async (...selectors) => {
    let completionDateString = await getText(...selectors)

    let completionDate = completionDateString
      ? dateTime.parseUtcDate(completionDateString)
      : new Date()

    let actualCompletionDate = completionDate ? completionDate : new Date()

    return dateTime.formatIsoDate(actualCompletionDate)
  }

  const getMainUrl = async () =>
    `${window.location.origin}${window.location.pathname}`

  return {
    getElement,
    getText,
    getTitle,
    getMinutes,
    getCompletionDate,
    getMainUrl
  }
})()
