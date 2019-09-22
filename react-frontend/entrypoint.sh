#!/bin/bash

cd /react

install () {
  npm install
}

test_install () {
  if [ -z "$(ls -A node_modules)" ]; then
    install
  fi
}

start () {
  npm start
}

build () {
  npm run-script build
}

lint () {
  npx eslint .
}

development () {
  install
  start
}

production () {
  if [ "$PUBLIC_URL" = "" ]; then
    echo 'ERROR: Need to specify a PUBLIC_URL';
  fi

  install
  build
}

package_release () {
  #production
  version

  NAME="release"
  cd build
  tar -cf ../$NAME.tar *
  cd ..
  chmod 777 $NAME.tar
}

# Prefer parameters to environment
case $1 in
  lint)
    test_install
    lint
    exit;;
  bash)
    /bin/bash
    exit;;
  development)
    development
    exit;;
  production)
    production
    exit;;
  package_dev)
    package_dev
    exit;;
  package_release)
    package_release
    exit;;
esac

case $REACT_APP_ENVIRONMENT in
  development)
    development
    exit;;
  production)
    production
    exit;;
esac
