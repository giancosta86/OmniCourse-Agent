const dateTime = (() => {
  const DurationRegex = /([\d.]+)\s*h(?:\S*)?\s*([\d.]+)?\s*m(?:\S*)?|([\d.]+)\s*(h)(?:\S*)?|([\d.]+)?\s*(m)(?:\S*)/i

  const formatIsoDate = date => date.toISOString().substring(0, 10)

  const parseUtcDate = dateString => {
    let utcDateString = dateString + " 00:00:00 GMT"

    let epochMilliseconds = Date.parse(utcDateString)

    if (!epochMilliseconds || isNaN(epochMilliseconds)) {
      return
    }

    return new Date(epochMilliseconds)
  }

  const parseDurationMinutes = durationString => {
    let matchResult = DurationRegex.exec(durationString)

    if (!matchResult) {
      return
    }

    let mainGroup = matchResult[1] || matchResult[3] || matchResult[5]
    let secondaryGroup = matchResult[2] || matchResult[4] || matchResult[6]

    switch (secondaryGroup) {
      case "h": {
        let hours = parseFloat(mainGroup)
        return Math.round(hours * 60)
      }

      case "m": {
        let minutes = parseInt(mainGroup)
        return minutes
      }

      default: {
        let hours = parseFloat(mainGroup)
        let minutes = parseInt(secondaryGroup)

        return Math.round(hours * 60 + minutes)
      }
    }
  }

  return {
    formatIsoDate,
    parseUtcDate,
    parseDurationMinutes
  }
})()
