# Extension API Example


This repo contains examples of the Symphony Extension API. This API allows you to write applications
which users can install. Additionally, with the extension API you can add buttons throughout the UI,
and in turn your application can listen and react to click events on those buttons.


## Prerequisites


* Have `node` and `npm` installed.
* Have port 4000 available as we'll run the demo application on this port.


## Run the example project


* Clone this repo and `cd` into the directory
* Run `npm i webpack -g`
* Run `npm i webpack-dev-server -g`
* Run `npm i`
* Run `npm run watch`
* Ensure the sample app is running by visiting https://localhost:4000/app.html
* Append "bundle=https://localhost:4000/bundle.json" as a URL param to your pods Symphony address
    * For example https://corporate.symphony.com/client/index.html?bundle=https://localhost:4000/bundle.json
* Accept the "Warning: Unauthorized App(s)" dialog
* Click on the "Applications > App Store" entry in your left nav to install the Hello World app

## Now what?

You've successfully installed the Hello World application. You'll notice a new entry on the left nav
titled "Hello." Click on this to open the app in the Symphony grid. Explore the source code in
`src/javascript` to understand how the application works.
