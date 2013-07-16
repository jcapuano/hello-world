@echo off

REM Windows script for running client unit tests
REM You have to run server and capture some browser first
REM
REM Requirements:
REM - NodeJS (http://nodejs.org/)
REM - Karma (npm install -g karma)

set BASE_DIR=%~dp0
node "%BASE_DIR%\..\node_modules\karma\bin\karma" start "%BASE_DIR%\..\config\karma.conf.js" %*
