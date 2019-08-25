const fs = require("fs")
const path = require("path")
const archiver = require("archiver")
const packageInfo = require("./package.json")

const buildDir = "build"
const distDir = "dist"

const createPackageForBrowser = async browserName =>
  new Promise((resolve, reject) => {
    let packageFileName = `${packageInfo.name}-${packageInfo.version}-${browserName}.zip`
    let packagePath = path.join(distDir, packageFileName)

    let outputStream = fs.createWriteStream(packagePath)

    let archive = archiver("zip", {
      zlib: { level: 9 }
    })

    archive.on("warning", err => reject(err))
    archive.on("error", err => reject(err))

    outputStream.on("close", () => resolve())

    archive.pipe(outputStream)
    archive.directory(`${buildDir}/${browserName}`, false)
    archive.finalize()
  })

;(async () => {
  await createPackageForBrowser("chrome")
  await createPackageForBrowser("firefox")

  console.log(`Extension packages successfully created at ${new Date()}.`)
})()
