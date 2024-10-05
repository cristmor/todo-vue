
# TODO-Vue App
TODO-Vue is a tasks tracking web app. This web app allows a user to create, delete, and sort tasks.
    
## Tech Stack

**Client:** Vue.js, TailwindCSS, Axios

**Server:** Node.js, Express.js, Mongoose

**Datebase:** MongDB


## Installation

1. Clone repo:
```bash
  git clone https://github.com/cristmor/todo-vue.git
```

2. Install server dependencies (Back-end):
```bash
  cd client
  npm install
```

3. Install client dependencies (front-end):
```bash
  cd server
  npm install
```

4. Add MongeDB connection in **/server/index.js**:
```javascript
// Database
  mongoose.connect("<add-datebase-connection-url-here>").then(() => {
	console.log("Connected to database!");
  }).catch(() => {
  	console.error("Connected failed!");
  })
```

5. Add back-end connection in **/client/App.vue**:
```javascript
  const backend = ref("<add-back-end-connection-url-here>")
```

## Usage
1. Start server (Back-end):
```bash
  cd server
  npm start
```
2. Start client (Front-end):
```bash
  cd client
  npm start
```

## Web App

![App Screenshot](https://github.com/cristmor/todo-vue/blob/main/client/public/readme-edit.gif)
