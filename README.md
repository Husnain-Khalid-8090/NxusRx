# REACT JS Example code snippet

Example React JS Project with webpack and redux. 


* ```git clone https://github.com/nithinsayone/REACT_TEMPLATE.git```
* run ```npm install``` to install all depencies
* run ```npm start``` and visit ```http:\\localhost:8080```

### Features

* Functional components with hooks
* Webpack bundler
* Redux state management integration
* API calls example with Axios and redux state updates
* Offline first data persistence

## Project Structure

`src/app/` contains all the project files.

```
|src
|_index.html
|_index.js
|_index.scss
|_app
|___assets
|____fonts
|_____static font files
|____images
|_____static images
|____modules
|_____standalone modules (eg Auth, Dashboard etc)
|______styles
|________module styles
|______container
|________module presentational component
|____redux (redux setup)
|______reducers (reducers object)
|______store (redux store and persistor definition)
|____router
|______js (app routes and definition)
|____shared
|_____components
|_______js (reusable components definition)
|_____constants (app constants)
|_______actionTypes (redux action types)
|_______urls (api endpoints)
|_____api
|_______api (api/ network calls)
|_____config
|_______api configuration (api axios configuration)
|_____utils (shared utility functions)
```

### Install the dependencies

* ```make dep```   or   ```yarn```   or   ```npm i```

### Run

* ```make```  or  ```yarn start```  or  ```npm start```


### Build

* ```make build```  or  ```yarn build```  or  ```npm run build``` 
* build saved to the ```dist``` folder


## Libraries and tools used
* React JS
* Webpack
* Redux
* Axios
* Bootstrap
* React Bootstrap
* Redux Persist
* Babel
* ESLint - lint tool
* Husky
* Jest


