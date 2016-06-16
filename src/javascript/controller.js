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

//create our own service
var tickerService = SYMPHONY.services.register("hello:controller");

SYMPHONY.remote.hello().then(function(data) {
    SYMPHONY.application.register("hello", ["ui", "modules", "applications-nav"], ["hello:controller"]).then(function(response) {

        //system services
        var userId = response.userReferenceId;
        var uiService = SYMPHONY.services.subscribe("ui");
        var navService = SYMPHONY.services.subscribe("applications-nav");
        var modulesService = SYMPHONY.services.subscribe("modules");

        //add an entry to the left nav
        navService.add("hello-nav", {title: "Hello App"}, "hello:controller");

        //add a button to the hovercard that appears when hovering over cashtags
        uiService.registerExtension("cashtag", "hello", "hello:controller", {label: "Hello App Demo"});

        //implement some methods on our custom service. these will be invoked by user actions
        tickerService.implement({
            select: function(id) {
                //invoke the module service to show our own application in the grid
                modulesService.show("hello", {title: "Hello App"}, "hello:controller", "https://localhost:4000/app.html", {});
            },
            trigger: function(type, id, data) {
                //open our app in the grid with a URL parameter appended, this also uses the module service
                modulesService.show("hello", {title: "Hello App Demo!"}, "hello:controller", "https://localhost:4000/app.html?cashtag=" + data.entity.name, {});
            }
        });
    }.bind(this))
}.bind(this));
