/**
* Licensed to the Symphony Software Foundation (SSF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The SSF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
**/

// Create our own local controller service.
// We have namespaced local services with "hello:"
var helloControllerService = SYMPHONY.services.register("hello:controller");

// This is the message controller service, to be used for static and dynamic rendering
var messageControllerService = SYMPHONY.services.register("message:controller");

// All Symphony services are namespaced with SYMPHONY
SYMPHONY.remote.hello().then(function(data) {

    // Register our application with the Symphony client:
    // Subscribe the application to remote (i.e. Symphony's) services
    // Register our own local services
    SYMPHONY.application.register("hello", ["modules", "applications-nav", "ui", "share", "entity"], ["hello:controller", "message:controller"]).then(function(response) {

        // The userReferenceId is an anonymized random string that can be used for uniquely identifying users.
        // The userReferenceId persists until the application is uninstalled by the user. 
        // If the application is reinstalled, the userReferenceId will change.
        var userId = response.userReferenceId;

        // Subscribe to Symphony's services
        var modulesService = SYMPHONY.services.subscribe("modules");
        var navService = SYMPHONY.services.subscribe("applications-nav");
        var uiService = SYMPHONY.services.subscribe("ui");
        var shareService = SYMPHONY.services.subscribe("share");
        var entityService = SYMPHONY.services.subscribe("entity");
        entityService.registerRenderer(
            "com.symphony.timer",
            {},
            "message:controller"
        );



        // LEFT NAV: Add an entry to the left navigation for our application
        navService.add("hello-nav", "Hello World App", "hello:controller");

        // LEFT NAV: Add an extra left navigation item that can be removed by clicking on the "Remove Left Nav Item Button"
        navService.add("hello-nav-remove", "Removable Left Nav Item", "hello:controller");

        // UI: Add elements to the Symphony user interface: 
        // buttons on IMs/MIMs/rooms, links on cashtag/hashtag hover cards and settings
        uiService.registerExtension("single-user-im", "hello-im", "hello:controller", {label: "IM Button", data: {"datetime": Date()}});
        uiService.registerExtension("multi-user-im", "hello-mim", "hello:controller", {label: "MIM Button"});
        uiService.registerExtension("room", "hello-room", "hello:controller", {label: "Room Button"});
        uiService.registerExtension("profile", "hello-profile", "hello:controller", {label: "Profile Button"});
        uiService.registerExtension("hashtag", "hello-hashtag", "hello:controller", {label: "Hashtag Link"});
        uiService.registerExtension("cashtag", "hello-cashtag", "hello:controller", {label: "Cashtag Link"});
        uiService.registerExtension("settings", "hello-settings", "hello:controller", {label: "Settings Link"});

        // SHARE: Set the controller that implements the "link" method invoked when shared articles are clicked on.
        shareService.handleLink("article", "hello:controller");

        // Implement some methods on our local service. These will be invoked by user actions.
        helloControllerService.implement({

            // LEFT NAV & MODULE: When the left navigation item is clicked on, invoke Symphony's module service to show our application in the grid
            select: function(id) {
                if (id == "hello-nav") {
                    // Focus the left navigation item when clicked
                    navService.focus("hello-nav");
                }

                modulesService.show("hello", {title: "Hello World App"}, "hello:controller", "https://localhost:4000/app.html", {
                    // You must specify canFloat in the module options so that the module can be pinned
                    "canFloat": true,
                });
                // Focus the module after it is shown
                modulesService.focus("hello");
            },

            // UI: Execute the following when UI extensions are clicked.
            trigger: function(uiClass, id, payload, data) {
                if (uiClass == "single-user-im") {
                    console.log('IM button was clicked on ' + data.datetime + '.');
                } else if (uiClass == "multi-user-im") {
                    console.log('MIM button was clicked.');
                } else if (uiClass == "room") {
                    console.log('Room button was clicked.');
                } else if (uiClass == "profile") {
                    console.log('Profile button was clicked.');
                } else if (uiClass == "hashtag") {
                    console.log('Hashtag link was clicked.');
                } else if (uiClass == "cashtag") {
                    // Open our app in the context of the cashtag:
                    // Put the cashtag in the module title.
                    // Include the cashtag in the URL parameters.
                    var cashtag = payload.entity.name;
                    var moduleTitle = "Hello World App: " + cashtag;
                    modulesService.show("hello-cashtag", {title: moduleTitle}, "hello:controller", "https://localhost:4000/app.html?cashtag=" + cashtag, {
                        "canFloat": true,
                        // Use parentModuleId to open a new module without closing the original module ("hello")
                        "parentModuleId": "hello"
                    });
                    modulesService.focus("hello-cashtag");
                } else if (uiClass == "settings") {
                    console.log('Settings link was clicked.')
                }
                console.dir(payload);
            },

            // SHARE: Open our app in the context of an article:
            // Put the article in the moudle title.
            // Include the article in the URL parameters.
            link: function(type, articleId) {
                if(type == "article") {
                    var moduleTitle = "Hello World App: " + articleId;
                    modulesService.show("hello-article", {title: moduleTitle}, "hello:controller", "https://localhost:4000/app.html?article=" + articleId, {
                        "canFloat": true,
                        // Use parentModuleId to open a new module without closing the original module ("hello")
                        "parentModuleId": "hello"
                    });
                    modulesService.focus("hello-article");
                }
            },
        });

        // The list of entities to track for dynamic rendering each entity individually
        messageControllerService.tracked = {};

        // Implement some methods to render the structured objects sent by the app to our specified thread
        messageControllerService.implement({

            // Calculate how much time has passed since the entity's initial render
            calculateDifference: function(initial, current) {
                var ms = current-initial;
                var hrs = Math.floor(ms/1000/60/60);
                ms -= hrs * 1000 * 60 * 60;
                var min = Math.floor(ms/1000/60);
                ms -= min * 1000 * 60;
                var sec = Math.floor(ms/1000);
                var days = Math.floor(hrs/24);
                var yrs = Math.floor(days/365);
                days-=yrs*365;
                hrs-=((yrs*365*24)+(days*24));
                var diff = {
                    sec : sec,
                    min : min,
                    hrs : hrs,
                    days : days,
                    yrs : yrs
                 };
               return diff;
            },

            // Track each entity indexed by its instance id
            track: function(entity) {
                this.tracked[entity.instanceId] = entity;
            },

            // Rerender a tracked entity every 'tick'
            tick: function(instanceId) {
                  entity = this.tracked[instanceId];
                  this.rerender(entity);
            },

            // Use the entity data to update the rendering of the message through the entity service
            rerender: function(tracked) {
                var entityData = tracked.entityData;
                var timeData = this.getTimeData(entityData);

                return entityService.update(timeData.entityInstanceId, timeData.template, timeData.data);
            },

            // Render the message sent by the app
            render: function(type, entityData) {
                var version = entityData.version;
                // Generate a id for each entity (unique enough for sampling purposes)
                // Consider how to translate uuids as list indexing for more robust id marking
                var instanceId = Math.floor(Math.random()*1000000);
                entityData.instanceId = instanceId;
                var renderTime = new Date();
                entityData.renderTime = renderTime;

                // Static rendering
                if(version == "1.0") {
                    return this.getTimeData(entityData);

                // Dynamic rendering
                } else if (version == "2.0") {
                    // Track each entity
                    setTimeout(function () {
                        this.track({instanceId: instanceId, entityData: entityData});
                    }.bind(this), 1000);


                    // Render the countdown every 5 seconds
                    this.interval = setInterval(function () {
                        this.tick(instanceId)
                    }.bind(this), 1000);
                    return this.getTimeData(entityData);
                }
            },

            // Render the template using the current timestamp and the specified date from entity data
            getTimeData: function(entityData) {
                var renderTime = entityData.renderTime;
                var current = new Date();
                var diff = this.calculateDifference(renderTime, current);
                var template;
                if( entityData.version === "1.0" ) {
                    template = `<messageML>
                                  <card>
                                      <div>The time at the initial rendering was <b><text id="timeAtRender"/></b></div>
                                  </card>
                               </messageML>`
                } else if( entityData.version === "2.0" ) {
                    template = `<messageML>
                                  <card>
                                      <div>The time from the initial rendering at <b><text id="timeAtRender"/></b> is 
                                      <span class='tempo-bg-color--theme-primary'><text id="years"/></span> years, 
                                      <span class='tempo-bg-color--theme-primary'><text id="hrs"/></span> days, 
                                      <span class='tempo-bg-color--theme-primary'><text id="min"/></span> minutes, and
                                      <span class='tempo-bg-color--theme-accent'><text id="sec"/></span> seconds</div>
                                  </card>
                               </messageML>`
                }
                return {
                    // Use a custom template to utilise data sent with the message in entityData in our messageML message
                    template: template,
                    data: {
                        years: "" + diff.yrs,
                        days: "" + diff.days,
                        hrs: "" + diff.hrs,
                        min: "" + diff.min,
                        sec: "" + diff.sec,
                        timeAtRender: renderTime.toLocaleTimeString() + " on  " + renderTime.toLocaleDateString()
                    }
                }
            }
        });
    }.bind(this))
}.bind(this));