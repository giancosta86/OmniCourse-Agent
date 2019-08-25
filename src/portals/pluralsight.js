const Portal = () => {
  const getTitle = async () => parsing.getTitle()

  const getMinutes = async () =>
    parsing.getMinutes("#course-description-tile-info > div:last-child")

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
