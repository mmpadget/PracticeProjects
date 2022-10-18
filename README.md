# PolyDraw
Video game

## Installation

To launch the web page open `index.html`

For development, the project is setup for live-server. Live-server is a front-end development server with live reload capability. To learn more visit:

https://www.npmjs.com/package/live-server

https://github.com/tapio/live-server

To install live-server locally in this project using the command line enter `npm i`

Alternately, to install live-server globally enter `npm install -g live-server`

## Development

Issue the command `live-server` in this project's root directory.
* Alternately enter `npm start` for default configuration
* Enter `npm run dev` for live-server to open in Chrome with suppressed logging
* These commands are defined in `package.json`

## Uninstall

You can use `npm list` to check local or `npm list -g` for global project packages.

To uninstall live-server, navigate to this project's root directory, then enter `npm uninstall live-server`

To uninstall live-server globally enter `npm uninstall -g live-server`

If you accidentally installed with `npx live-server` then to uninstall visit `~/.npm/_npx` and delete the generated folder (or navigate to that directory and enter `npm uninstall live-server`).

## Compatibility

If your browser is having issues loading JavaScript module scripts (i.e. ES6 modules) using `<script type="module">` try Babel as a solution.

https://caniuse.com/es6-module

https://babeljs.io/docs/en/

