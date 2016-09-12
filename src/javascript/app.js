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

// Create our own local service pertaining to the application module
// We have namespaced local services with "hello:"
var helloAppService = SYMPHONY.services.register("hello:app");

SYMPHONY.remote.hello().then(function(data) {

    // Set the theme of the app module
    var themeColor = data.themeV2.name;
    var themeSize = data.themeV2.size;
    document.body.className += " " + themeColor + " " + themeSize;

    SYMPHONY.application.connect("hello", ["modules", "applications-nav", "ui", "share"], ["hello:app"]).then(function(response) {

        // The userReferenceId is an anonymized random string that can be used for uniquely identifying users.
        // The userReferenceId persists until the application is uninstalled by the user. 
        // If the application is reinstalled, the userReferenceId will change.
        var userId = response.userReferenceId;
        
        // Subscribe to Symphony's services
        var modulesService = SYMPHONY.services.subscribe("modules");
        var navService = SYMPHONY.services.subscribe("applications-nav");
        var uiService = SYMPHONY.services.subscribe("ui");
        var shareService = SYMPHONY.services.subscribe("share");

        // MODULE: Add a menu item to our module
        modulesService.addMenuItem("hello", "About Hello World App", "hello-menu-item");
        modulesService.setHandler("hello", "hello:app");

        // LEFT NAV: Update the left navigation item's badge count when the "Increment Unread Badge Count" button is clicked using the navService's count method.
        var incrementButton = document.getElementById("increment");
        var count = 0;
        // Bind a click event handler
        incrementButton.addEventListener("click", function(){
            count++;
            navService.count("hello-nav", count);
        });

        // SHARE: Trigger Symphony's share modal when the "Share" button is clicked
        var shareButton = document.getElementById("share");
        var articleOptions = {
            "title": document.getElementById("article-title").innerHTML,
            "subTitle": document.getElementById("article-subtitle").innerHTML,
            "blurb": document.getElementById("article-blurb").innerHTML,
            "id": document.getElementById("article-id").innerHTML               
        };
        shareButton.addEventListener("click", function(){
            shareService.share(
                "article",
                articleOptions
            );
        });

        // UI CASHTAG: If the app is opened in the context of a cashtag, show the cashtag in the text box on the app.
        // window.location.search returns the querystring part of a URL. Use substring to omit the leading ?.
        var querystring = window.location.search.substring(1);
        // Use regex to check if the querystring includes "cashtag"
        if (querystring && /cashtag/.test(querystring)) {
            // Split the querystring into a list of pairs
            var urlParams = querystring.split('&');
            for (var i = 0; i < urlParams.length; i++) {
                var pair = urlParams[i].split('=');
                // Check if the key of one of the pairs is cashtag (there should always be such a pair)
                if(pair[0] == 'cashtag') {
                    // Use substring to omit the leading "%24" (url encoding of $)
                    var cashtag = pair[1].substring(3);
                    document.getElementById("cashtag").value = cashtag;
                }
            }
        } 
        // SHARE: If the app is opened in the context of an article, show the articleId in the text box on the app.
        // @TODO(anjana): Refactor this redundant code
        else if (querystring && /article/.test(querystring)) {
            var urlParams = querystring.split('&');
            for (var i = 0; i < urlParams.length; i++) {
                var pair = urlParams[i].split('=');
                if(pair[0] == 'article') {
                    var articleId = pair[1];
                    document.getElementById("article").value = articleId;
                }
            }
        }

        // Implement methods on the application module service
        helloAppService.implement({
            // If the menu item is selected, display the About text 
            menuSelect: function(itemId) {
                if (itemId == "hello-menu-item") {
                    document.getElementById("about-hello-world-app").className = "";
                }
            }
        });

    }.bind(this))
}.bind(this));
