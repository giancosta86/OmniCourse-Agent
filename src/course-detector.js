const CourseDetector = portal => {
  const scanPageForCourse = () =>
    Promise.all([
      portal.getTitle(),
      portal.getMinutes(),
      portal.getUrl(),
      portal.getCompletionDate(),
      portal.getCertificateUrl()
    ]).then(([title, minutes, url, completionDate, certificateUrl]) => ({
      title,
      minutes,
      url,
      completionDate,
      certificateUrl
    }))

  return {
    scanPageForCourse
  }
}
