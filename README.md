# Welcome to our StartHack Project

Welcome to our starthack repository. This project follows the **Fintech** branch and is an *express.js* application hosted at [Starthack Project.](https://start-hack.vercel.app/)

For the purposes of this hackathon, we have also included instructions for hosting this application locally in order to examine and test its features and functionality


# Local Hosting

StackEdit stores your files in your browser, which means all your files are automatically saved locally and are accessible **offline!**

## Installation

To begin with, you'll need to ensure your device has **node.js** and **npm** installed. Visit the [official node.js website](https://nodejs.org/en/download/package-manager) to install both of these onto your device

## Setup

To begin with, clone this repository and navigate to folder. Then right click on any empty space and select **Open in terminal** to get started.



### Install necessary modules

This project makes use of multiple external modules to ensure it can run effectively. In your terminal, write the code below to install these modules in your environment.

```bash
npm i express cookie-parser morgan qrcode cors mongodb ejs debug http-errors
```

### Starting the server

In order to start the server on your local device, run the following code in your terminal:
```bash
npm start
```
Now navigate to <code>localhost:3000</code> in any web browser and voila!


### Errors

If you encounter any errors during this process, there are a few possible reasons for them occurring.
<ol>
<li>
Ensure that your terminal is opened in the <code>Starthack</code> folder before running any npm installations or starting the server. This is to ensure the packages are installed in the same directory as the code and as such can run properly
</li>
<li>
It is possible that some packages are out of date. In order to resolve this, run the following command in your terminal: <code>npm audit fix --force</code>
</li>
</ol>
