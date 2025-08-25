<p align="center">
  <img src="./public/icon-128.png" alt="Project Logo" width="80"/>
</p>

<h1 align="center">Filtro</h1>

<p align="center">
  A Chrome and Firefox extension for filtering Product Hunt.
</p>

<a href="https://www.producthunt.com/products/filtro?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-filtro" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1006545&theme=light&t=1755524303781" alt="Filtro - Your&#0032;Product&#0032;Hunt&#0032;Filter | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>
&nbsp;&nbsp;
<a href="https://chromewebstore.google.com/detail/lolkfifhhidofpnnkjjeedgcgblklfbj/" target="_blank">
<img src="https://developer.chrome.com/static/docs/webstore/branding/image/HRs9MPufa1J1h5glNhut.png"
       alt="Get it on Chrome Web Store"
       style="height: 58px;" />
</a>
&nbsp;&nbsp;
<a href="https://addons.mozilla.org/en-US/firefox/addon/filtro/" target="_blank">
<img src="https://blog.mozilla.org/addons/files/2015/11/get-the-addon.png" 
       alt="Get it on Firefox Add-ons" 
       style="height: 58px;" />
</a>

---

## 📖 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Installation](#-installation)

---

## 📌 About

Product Hunt doesn’t provide filters for its product lists, which makes it hard to find the products you actually care about. This extension makes it easier to remove irrelevant products so you can focus only on what matters to you.

---

## ✨ Features

- Filter based on texts from: Title, Description, Tags, URL
- Filter "Coming Soon" products
- Filter "Homepage" products
- Filter "Archived" products

---

## ⚙️ Installation

#### Chrome

You can install this extension from the [Chrome Web Store](https://chromewebstore.google.com/detail/lolkfifhhidofpnnkjjeedgcgblklfbj/) or:

1. Download from the [latest](https://github.com/AlecBlance/Filtro/releases) release.
2. Extract the downloaded zip file
3. On the top right of the Chrome browser, click the three dots.
4. Select `Extension > Manage Extensions`, and enable `Developer Mode`
5. Click `Load unpacked`, and look for the extracted zip file.

#### Firefox

You can install this extension from the [Firefox add-ons](https://addons.mozilla.org/en-US/firefox/addon/filtro/) or:

1. Download from the [latest](https://github.com/AlecBlance/Filtro/releases) release.
2. Extract the downloaded zip file
3. In your firefox browser, navigate to `about:debugging > This Firefox > "Load Temporary Addon"`
4. Select the `manifest.json` within the extracted zip file

## Build from source

1. Clone the repository, and navigate to the S3BucketList folder
2. Install [pnpm](https://pnpm.io/installation)
3. Do `pnpm i` to install the required modules
4. Do `pnpm zip` for chrome-compatible version or `pnpm zip:firefox` for firefox-compatible version.
5. A zip file will be created in the `dist/` folder
6. Follow the manual installation steps above on how to install the extension.

