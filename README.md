[![Build Status](https://travis-ci.org/symphonyoss/extension-api-examples.svg)](https://travis-ci.org/symphonyoss/extension-api-examples)
[![Dependencies](https://www.versioneye.com/user/projects/578010725bb1390040177cb0/badge.svg?style=flat-square)](https://www.versioneye.com/user/projects/578010725bb1390040177cb0#tab-dependencies)

# Extension API Example


This repo contains examples of the Symphony Extension API. This API allows you to write applications
which users can install. Additionally, with the extension API you can add buttons throughout the UI,
and in turn your application can listen and react to click events on those buttons.


## Prerequisites


* Have `node` and `npm` installed.
* Have port 4000 available as we'll run the demo application on this port.
* If you are planning to use Chrome to run the Hello World app, you will need to first enable the #allow-insecure-localhost flag in Chrome. To do this, go to chrome://flags and enable the setting called "Allow invalid certificates for resources loaded from localhost". 

## Run the example project


* Clone this repo and `cd` into the directory
* Run `npm i webpack -g`
* Run `npm i webpack-dev-server -g`
	* If you have trouble running the webpack-dev-server over HTTPS, check out the --https option described here: https://webpack.github.io/docs/webpack-dev-server.html
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

## A note on entity renderers 

The Hello World app subscribes to the ‘entity’ Service of the Extension API, which allows the application to render Structured Objects. To use the service to render your own Structured Objects, you’ll need to send either a JCurl or Postman POST messagev4 to a room in the pod where you’ll be running the application. Here is an example of a REST payload that can be used to send a custom entity that will be rendered by the app:

```
{
     message: "<messageML><div class="entity" data-entity-id="timer"><b><i>Please install the Hello World application to
               render this entity.</i></b></div></messageML>"
     data: {
         "timer": {
               "type": "com.symphony.timer",
               "version":  "1.0"
          }
     }    
}
```

When the message is sent, the default rendering will be “Please install the Hello World application to render this entity.” However, the following function tells the message controller render method to look for messages containing a Structured Object of the type ‘com.symphony.timer’:

`entityService.registerRenderer( "com.symphony.timer",{}, "message:controller");`

When the app is running, that default rendering will be superseded by the custom template in controller.js. For more information about the message format for Structured Objects, see https://rest-api.symphony.com/docs/objects#sending-structured-objects-in-messages.


