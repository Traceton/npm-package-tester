# Node-Treker

### :rocket: Node-Treker is a small npm package for people using node.js, express, and mongoose to create a RESTFUL api.

### basic use guide:

#### :heavy_exclamation_mark: express, mongoose and dotenv are not required packages, but are what is supported here. :heavy_exclamation_mark:

## Install and setup:

### navigate to your desired directory

### use npm init Your-App-Name-Here

### Next, install the packages below for best compatibility:

### npm i dotenv express mongoose

### npm i node-treker nodemon --save-dev

### Next, navigate to your package.json file and copy the node-treker script given here:

```
### "scripts": {
    "node-trecker": "node node_modules/node-treker/index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }


## How To Use:

### Before running any commands you must start node-treker from the terminal inside of your apps directory:

### npm run node-treker

## Current Available commands:

### Generate a basic node.js/express server with env file.
#### generate empty-server

### Generate a empty node.js/express router
#### generate empty-router

### Generate a router with a model:
#### Format: generate router-with-model model-name field-name:data-type field-name:data-type
#### Example: generate router-with-model user id:Number firstName:String lastName:String

### Generate a mongoose model:
#### Format: generate model model-name field-name:data-type field-name:data-type
#### Example: generate model user id:Number firstName:String lastName:String

### Generate a router:
#### Format: generate router router-name/model-name field-name:data-type field-name:data-type
#### Example: generate router user id:Number firstName:String lastName:String

### Generate a rest file with tests:
#### Format: generate tests router-name/model-name field-name:data-type field-name:data-type
#### Example: generate tests user id:Number firstName:String lastName:String

```
