@echo off

REM Windows script for running client e2e tests
REM You have to run server and capture some browser first
REM
REM Requirements:
REM - NodeJS (http://nodejs.org/)
REM - Protractor (npm install -g Protractor)
REM - Selenium (https://code.google.com/p/selenium/downloads/list)
REM - Java JRE
REM - ChromeDriver (http://code.google.com/p/chromedriver/downloads/list)
set BASE_DIR=%~dp0

cls
node "%BASE_DIR%\..\node_modules\protractor\bin\protractor" "%BASE_DIR%\..\config\protractor.conf.js" %*

@echo e2e test suite complete




