const Portal = () => {
  const LowerCaseVideoSuffix = "[video]"

  const getTitle = async () => {
    let actualTitle = await parsing.getTitle()

    if (!actualTitle) {
      return
    }

    return actualTitle.toLowerCase().endsWith(LowerCaseVideoSuffix)
      ? actualTitle
          .substring(0, actualTitle.length - LowerCaseVideoSuffix.length)
          .trim()
      : actualTitle
  }

  const getMinutes = async () => parsing.getMinutes(".course-length")

  const getUrl = async () => parsing.getMainUrl()

  const getCompletionDate = async () => parsing.getCompletionDate()

  const getCertificateUrl = async () => null

  return {
    getTitle,
    getMinutes,
    getUrl,
    getCompletionDate,
    getCertificateUrl
  }
}
