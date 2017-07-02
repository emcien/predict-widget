<p align="center">
  <img src="http://emcien.com/wp-content/uploads/2016/02/emcien_logo2.png">
</p>

# Emcien Prediction Widget

This is a reference implementation of a visualization based on the Emcien API. 


* [Development Setup](#development-setup)
* [Production Deployment](#production-deployment)
* [File Structure](#file-structure)
* [Solution Design](#solution-design)

## Development Setup

*Note*: There is no compilation step for this reference app. It's written entirely in plain ES5 syntax. However in order to develop locally, you may need a local web server. 

* Clone the repo
* Install npm dependencies (only used to get a local web server)
* Run `npm start`
* Open `localhost:8080`

To run in development:

* Start the development server with `npm start`

*Note* The development server does not hot reload, so you'll have to refresh manually.

## Production Deployment
Simply upload all of the files in the `src` directory to a web host. It should simply work!

## File Structure 
```
src/
├── css
│   └── style.css - Custom CSS styles
├── favicon.ico - Site Favicon
├── index.html - Default single HTML page loaded
└── js
    ├── emcienPrediction.js - Main handlers for data retrieval and UI updates
    └── lib
        ├── emcienApi.js - Helpers for API calls
        ├── emcienConfigForm.js - Helpers to manage the Config Form
        ├── emcienDataTable.js - Helpers to manage the Data Table
        └── emcienOutcomeOptions.js - Helper to manage the outcome dropdown
```

## Solution Design

This reference application can really be thought of as being composed of three parts:

<p align="center">
  <img src="./screenshot.png">
</p>

* Config Form - Submitting the Config Form queries the Outcomes API (`reports/{report_id}/outcomes`) to retrieve the outcomes for a particular report and populates the Outcome Options dropdown

* Outcome Options - Selecting a specific outcome queries the Outcomes API again (`reports/{report_id/outcomes/{outcome_id}/categories`) to retrieve the categories and populates the Data Table

* Data Table - Displays the category data and impact

