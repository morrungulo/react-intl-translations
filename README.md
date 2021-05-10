# React Translations

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Purpose

My cousin who works mostly as a frontend software developer asked me whether I could write him a tool to edit side-by-side JSON translations to be used with https://react.i18next.com/. I thought to myself, why not as a first attempt at React?

## Improved version

Further requests came in which needed to be implemented:

* add a backend to serve the files
* cannot close modified file
* tooltips
* better experience

Those have been implemented, however we could improve this further with:

* Authentication (cookies, sessions)
* Improve the JSON Editor (make it a bit more customizable)

One of the overall goals was to keep this application simple and its use also very simple - I am a firm believer in the [KISS principle](https://en.wikipedia.org/wiki/KISS_principle).

## Backend

I built a simple Node.js backend without authentication which serves the JSON files. Take a look at the `backend/.env.example` file for options. Copy this file,

`cp .env.example .env`

modify it accordingly, and then start the backend by executing:

#### `npm build`

#### `npm start`

Take note that [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) is set by default to `*`. It is best to specify your *Frontend* `URL` to make sure no unauthorized accesses occur.

## Frontend

The frontend is still in React, this time using UX components from Material UI. You will need to specify the `URL` and `PORT` of the backend (check the file `frontend/src/constants/index.js` on how to do it).
Start the frontend by executing:

#### `npm build`

#### `npm start`

## 

## Test data

Use the test data located in the `data` directory.

## Improvements

Very few! :-)