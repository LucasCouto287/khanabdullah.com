"use strict";

// the base time for all the setTimeout functions
var timeoutBase = 500;
var headline = document.getElementById("main-heading");
// apply function whether it's the user's first visit or not
var notFirstVisit = function notFirstVisit(boolean) {
  var span = document.getElementById("notFirstVisit");
  // if it isn't the user's first visit, display the "again" in the headline
  if (boolean === true) {
    span.classList.remove("hide");
    headline.setAttribute("data-text", "Hello again, stranger.");
  }
  // if it is the user's first time, then set the localStorage variable for next time
  else {
      localStorage.noFirstVisit = true;
    }
};
// apply animations to the homepage headline
setTimeout(function () {
  // check if it is user's first visit (depending on that, display or hide the "again" span)
  !localStorage.noFirstVisit ? notFirstVisit(false) : notFirstVisit(true);
  // show the headline
  headline.classList.remove("hide");
  headline.classList.add("fadeIn", "animated", "glitch");
}, timeoutBase + 1100);
// XHR Prmoise function to GET json data
var getJSON = function getJSON(url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "json";
    xhr.onload = function () {
      var status = xhr.status;
      status == 200 ? resolve(xhr.response) : reject({
        status: xhr.status
      });
    };
    xhr.onerror = function () {
      reject({
        status: xhr.status
      });
    };
    xhr.send();
  });
};
// generic function to apply fade in animation to any element on the page
var fadeIn = function fadeIn(element) {
  element.classList.remove("hide");
  element.classList.add("fadeIn", "animated");
};
// alternative: https://ipapi.co/json
var getIpData = getJSON("https://ipinfo.io/json");
// DOM variables for the intro paragraph only
var introText = document.getElementById("intro-text"),
    clientInfoIP = document.getElementById("ip-address"),
    clientInfoBrowser = document.getElementById("browser"),
    clientInfoSystem = document.getElementById("operating-system"),
    clientInfoPlace = document.getElementById("place");
// DOM variables for the about paragraph
var aboutText = document.getElementById("about-text");
// function to set the text of the elements defined above using
// the data from client.js and the JSON ip data
var clientJS = new ClientJS();
var showIntro = function showIntro(ipInfo) {
  setTimeout(function () {
    clientInfoIP.innerHTML = ipInfo.ip;
    if (/Edge\/12./i.test(navigator.userAgent))
      // apparently Edge likes to think it's Chrome; according to the user agent...
      clientInfoBrowser.innerHTML = "Edge";else clientInfoBrowser.innerHTML = clientJS.getBrowser();
    clientInfoSystem.innerHTML = clientJS.getOS();
    clientInfoPlace.innerHTML = ipInfo.city + "," + "\xa0" + ipInfo.country;
    fadeIn(introText);
  }, timeoutBase + 4000);
};
// if getting the JSON was successful, show the intro paragraph
// (if there was an error, keep the paragraph hidden and display a friendly console message)
getIpData.then(function (ipInfo) {
  if (ipInfo.ip != undefined && clientJS.getBrowser() !== "") showIntro(ipInfo);
}).catch(function (error) {
  console.log("Hmmm, it seems like there\'s an issue... \n" + " - running error handler to hide intro text (and continue to display other content)");
});
// setTimeout to display the footer and the links div, which is why we hid it in the first place.
// the timeout time is based on the intro paragraph being hidden or not.
setTimeout(function () {
  var aboutMe = document.getElementById("about-me"),
      footer = document.getElementById("footer"),
      links = document.getElementById("links");
  setTimeout(function () {
    fadeIn(aboutMe);
    fadeIn(aboutText);
    fadeIn(footer);
    fadeIn(links);
    footer.ondragstart = function () {
      return false;
    };
  }, introText.classList.contains("hide") == false && clientInfoBrowser.innerHTML !== "" ? timeoutBase * 17 : timeoutBase);
}, timeoutBase * 12);