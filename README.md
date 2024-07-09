
# Welcome to our StartHack Project

Welcome to our Starthack repository. This project follows the **Fintech** branch and is an **express.js** application hosted at [Starthack Project.](https://start-hack-git-master-guitarbands-projects.vercel.app/)

For the purposes of this hackathon, we have also included instructions for hosting this application locally in order to examine and test its features and functionality


# Local Hosting

This application is runs on node.js, and as such can be locally hosted for testing purposes.

## Installation

To begin with, you'll need to ensure your device has **node.js** and **npm** installed. Visit the [official node.js website](https://nodejs.org/en/download/package-manager) to install both of these onto your device

## Setup

To begin with, clone this repository and navigate to folder. Then right click on any empty space and select **Open in terminal** to get started.



### Install necessary modules

This project makes use of multiple external modules to ensure it can run effectively. In your terminal, write the code below to install these modules in your environment.

```bash
npm i cookie-parser cors debug ejs express express-openid-connect http-errors mongodb morgan qrcode vercel
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

# Guide

This project consists of a landing page and a main app page. The landing page features content regarding the application and what it offers, along with our goals for the future. Once you have explored the landing page, head to the login tab to open your portfolio.

> If this is your first time using this application, please create an account by clicking the link at the bottom of the login page

## Portfolio

The portfolio displays your available balance and portfolio value, along with the status of your investments to allow you to easily track the performance of the companies you've entrusted your money to.

## Explore

The explore page features a list of the top 100 ESG scored companies, allowing you to search for a specific one by company code.

## Settings

This page will contain settings the user can change, such as ui colours, etc.


# API v1

This application comes with a few callable API's that can be used to obtain information regarding your own account, or to retrieve basic company details.

## Account  <code>/api/v1/accounts/me</code>
This endpoint requires a user to enter there authorization token. To retrieve this, head to your Profile page by clicking your username and copy the provided user ID.

## Company <code>/api/v1/company</code>
This endpoint is a query endpoint, and requires the user to provide a **name** query when parsing the request. This query can either be in the form of a company code, or simply writing **all** to receive all available information.

> Example query : /api/v1/company?name=KER.PA

## Starthack Resources
[Figma](https://www.figma.com/proto/pFNbDM74gc9PBrvCrXOfUD/StartHackFigma?node-id=2-2&t=CdYN8SIUFHwJtiZ1-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2%3A2)

[Presentation](https://docs.google.com/presentation/d/13mzck8nvZU00G6x57ygHoGHpLyiNNkE5RBE0k9qeJJc/edit?usp=sharing)
