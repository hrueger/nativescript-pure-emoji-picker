/*
// Snapshot the ~/app.css and the theme
const application = require("application");
require("ui/styling/style-scope");
const appCssContext = require.context("~/", false, /^\.\/app\.(css|scss|less|sass)$/);
global.registerWebpackModules(appCssContext);
application.loadAppCss();

require("./vendor-platform");

require("reflect-metadata");
require("@angular/platform-browser");
require("@angular/core");
require("@angular/common");
require("@angular/forms");
require("@angular/http");
require("@angular/router");

require("nativescript-angular/platform-static");
require("nativescript-angular/forms");
require("nativescript-angular/router");*/

// Snapshot the ~/app.css and the theme
import * as application from "application";
import "ui/styling/style-scope";
const appCssContext = require.context("~/", false, /^\.\/app\.(css|scss|less|sass)$/);
global.registerWebpackModules(appCssContext);
application.loadAppCss();

import "@angular/common";
import "@angular/core";
import "@angular/forms";
import "@angular/http";
import "@angular/platform-browser";
import "@angular/router";
import "nativescript-angular/forms";
import "nativescript-angular/platform-static";
import "nativescript-angular/router";
import "reflect-metadata";
import "./vendor-platform";
