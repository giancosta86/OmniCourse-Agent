# OmniCourse-Agent

_Browser extension for OmniCourse descriptors_

## Introduction

![Screenshot](screenshots/descriptor.png)

**OmniCourse-Agent** is a browser extension that can generate an [OmniCourse](https://github.com/giancosta86/OmniCourse) descriptor while you are visiting a course webpage.

## Usage

1. Browse to the page of a course published by a supported provider

1. The OmniCourse button in the toolbar becomes active

1. Click on the OmniCourse button

1. OmniCourse-Agent will try to gather enough information - consequently generating a course descriptor. In particular, the _title_ and the _duration_ are mandatory

1. Copy the generated descriptor to the clipboard

**Please, note**: when missing, some fields could be initialized to a sensible default value - for example, **completionDate** defaults to _the current date_.

## Installation

At present, OmniCourse-Agent is not on browser extension portals - its artifacts are published on GitHub as dedicated releases.

### Chrome

1. Download the **-chrome.zip** file from OmniCourse-Agent's release page

1. Decompress the zip file on your file system

1. In Chrome, open the ["extensions" page](chrome://extensions)

1. Enable the **Developer mode**

1. Click on **Load unpacked**

1. Select the directory created by the zip file

### Firefox

1. Download the **.xpi** file from OmniCourse-Agent's release page

1. In Firefox, open the ["add-ons" page](about:addons)

1. Click on the menu next to _Manage your extensions_ and select **Install Add-On from file...**

1. Select the downloaded file

1. Confirm

## Supported providers

OmniCourse-Agent now supports the following course portals:

- [Pluralsight](https://www.pluralsight.com/)

- [Udemy](https://www.udemy.com/)

- [Packt](https://www.packtpub.com/)

- [LinkedIn](https://www.linkedin.com/learning/)

## Privacy policy

OmniCourse-Agent is designed to parse course pages to create OmniCourse descriptors: consequently, it does not store and does not upload any personal information.

## Referenced components

### npm libraries

- [archiver](https://www.npmjs.com/package/archiver)
- [cpr](https://www.npmjs.com/package/cpr)
- [mkdirp](https://www.npmjs.com/package/mkdirp)
- [rimraf](https://www.npmjs.com/package/rimraf)
- [svg2img](https://www.npmjs.com/package/svg2img)
- [watch](https://www.npmjs.com/package/watch)

### Images

- [Rainbow loader](https://icons8.com/preloaders/en/circular/rainbow/) from [Preloaders.net](https://icons8.com/preloaders/)

## Further references

- [OmniCourse](https://github.com/giancosta86/OmniCourse) - React component for drill-down chart analysis of online courses
