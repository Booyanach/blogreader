# Blogreader

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.28.3.

To install it, run `npm install` in the root folder of the application.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to GitHub Pages

Run `ng github-pages:deploy` to deploy to GitHub Pages.

## Decisions

* Initially I had decided to use an `Observable` with a paired `Observer` object on the `StateService`.
* This set me back quite a bit until I noticed that `EventEmitter` was in fact a `Subscriber` (ie, observable and observer) which finally helped me get the unit tests running.

* I wanted to store the data in session or via cookies but due to the setback with the `EventEmitter` issues I had to drop this idea.
