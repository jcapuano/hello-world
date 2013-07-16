@echo off

REM Windows script for running server unit tests
REM Requirements:
REM - NodeJS (http://nodejs.org/)
REM - Mocha (npm install -g mocha)

set BASE_DIR=%~dp0
node "%BASE_DIR%\..\node_modules\mocha\bin\mocha" -R xunit "%BASE_DIR%\..\test\unit\server" --globals "NODE_CONFIG,exportscoffeeScript" > "%BASE_DIR%\..\test\out\unit_server.xml"
