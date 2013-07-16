#!/bin/bash

BASE_DIR=`dirname $0`

echo ""
echo "Starting e2e test suite"
echo "-------------------------------------------------------------------"

$BASE_DIR/../node_modules/protractor/bin/protractor $BASE_DIR/../config/protractorConf.js %*

echo "e2e test suite complete"
