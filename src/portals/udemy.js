const Portal = () => {
  const UrlRegex = /^(https:\/\/www\.udemy\.com\/(?:course\/)?[^\/]+\/)/
  const SharedUrlBeginning = "https://www.udemy.com/"
  const ExpectedUrlBeginning = "https://www.udemy.com/course/"

  const getTitle = async () => parsing.getTitle()

  const getMinutes = async () => {
    let overviewLink = await parsing.getElement("a[aria-label='Overview']")

    if (overviewLink) {
      overviewLink.click()
    }

    return await parsing.getMinutes(
      "[data-purpose=video-content-length]",
      "[data-purpose=course-additional-stats]"
    )
  }

  const getUrl = async () => {
    let mainUrl = await parsing.getMainUrl()
    let urlMatch = UrlRegex.exec(mainUrl)

    if (!urlMatch) {
      return
    }

    let baseUrl = urlMatch[1]

    return baseUrl.includes("/course/")
      ? baseUrl
      : baseUrl.replace(SharedUrlBeginning, ExpectedUrlBeginning)
  }

  const getCompletionDate = async () => parsing.getCompletionDate()

  const getCertificateUrl = async () => {
    let certificateTriggerElement = await parsing.getElement(
      "[data-purpose=progress-label]"
    )

    if (!certificateTriggerElement) {
      return
    }

    certificateTriggerElement.click()

    let certificateElement = await parsing.getElement(
      "[data-purpose=get-certificate]"
    )

    let certificateUrl = certificateElement ? certificateElement.href : null

    certificateTriggerElement.click()

    return certificateUrl
  }

  return {
    getTitle,
    getMinutes,
    getUrl,
    getCompletionDate,
    getCertificateUrl
  }
}
