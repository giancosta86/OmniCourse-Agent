const Portal = () => {
  const UrlRegex = /^(https:\/\/www.linkedin.com\/learning\/[^\/]+)/

  const getTitle = async () =>
    parsing.getTitle(
      ".upsell-title",
      "[data-tracking-control-name='course_title']",
      "[data-control-name='header_card_title']"
    )

  const getMinutes = async () =>
    parsing.getMinutes(
      ".upsell-meta-duration",
      ".course-sidebar-upsell__meta-duration",
      ".duration:nth-child(2)",
      ".card-content-meta-list li:nth-child(2)"
    )

  const getUrl = async () => {
    let mainUrl = await parsing.getMainUrl()

    let urlMatch = UrlRegex.exec(mainUrl)

    return urlMatch ? urlMatch[1] : null
  }

  const getCompletionDate = async () =>
    parsing.getCompletionDate(".course-info__add-to-profile-headline")

  const getCertificateUrl = async () => null

  return {
    getTitle,
    getMinutes,
    getUrl,
    getCompletionDate,
    getCertificateUrl
  }
}
