const fs = require("fs")
const path = require("path")
const { promisify } = require("util")
const packageInfo = require("./package.json")

const cpr = promisify(require("cpr"))
const svg2img = promisify(require("svg2img"))
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const copySourceFiles = async targetDir =>
  await cpr("src", targetDir, { deleteFirst: true })

const overwriteExtensionManifest = async (
  manifestDir,
  additionalManifestProcessor
) => {
  let manifestPath = path.join(manifestDir, "manifest.json")

  let manifestData = await readFile(manifestPath)
  let manifest = JSON.parse(manifestData)

  basicManifestProcessor(manifest)

  if (additionalManifestProcessor) {
    additionalManifestProcessor(manifest)
  }

  let newManifestData = JSON.stringify(manifest)
  await writeFile(manifestPath, newManifestData)
}

const basicManifestProcessor = manifest => {
  manifest.version = packageInfo.version
}

const chromeManifestProcessor = manifest => {
  manifest.background.persistent = false
}

const firefoxManifestProcessor = manifest => {
  manifest.browser_specific_settings = {
    gecko: {
      id: "omnicourse-agent@gianlucacosta.info"
    }
  }
}

const createIcons = async rootDir => {
  const iconSizes = [16, 32, 48, 128]
  const imagesPath = path.join(rootDir, "images")

  for (let iconSize of iconSizes) {
    let buffer = await svg2img("mainIcon.svg", {
      width: iconSize,
      height: iconSize
    })

    let iconPath = path.join(imagesPath, `mainIcon${iconSize}.png`)

    await writeFile(iconPath, buffer)
  }
}

const createBuildForBrowser = async (browserName, customManifestProcessor) => {
  const buildDir = "build"
  let targetDir = path.join(buildDir, browserName)

  await copySourceFiles(targetDir)
  await overwriteExtensionManifest(targetDir, customManifestProcessor)
  await createIcons(targetDir)
}

;(async () => {
  await createBuildForBrowser("chrome", chromeManifestProcessor)
  await createBuildForBrowser("firefox", firefoxManifestProcessor)

  console.log(`Latest build completed at: ${new Date()}.`)
})()
