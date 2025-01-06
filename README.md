🔒👤✅ dev_web0n

## Getting started

Install dev_web0n:

npm i dev_web0n

A brief description of what the project is about.

## Setup Instructions

### 1. Create the JavaScript File

Create a `.js` file, which can be either `app.js` or `index.js`.

Use the following code snippet to set up:

const dev_web0n = require('dev_web0n');

dev_web0n({
dir: \_\_dirname,
port: 8000,
auth: true
});

`'port' refers to the port number, and 'auth' indicates whether authentication will be checked. If set to 'true,' authentication will be enforced; otherwise, if set to 'false,' it will not be checked.`

### 2. Create the `info.config` File

You will need to create an `info.config` file. In this file, add the route name and the respective property names. For example:

// info.config
product = [title, description, price]
student = [roll, shift, department]

and run the server with 'node app.js' or 'node index.js'.

node app.js

# or

node index.js

After running, you will see a folder named data.

And if you hit http://localhost:port/product or http://localhost:port/student, you will be able to access their properties.

📢 but wait !
"If you set 'auth: true,' you must include `{Authorization: 'tcr tokenId'}` in the headers."

### Sending tcr Token

```javascript
headers: {
    Authorization: `tcr YOUR_TOKEN`
}

## Authentication flow 🔑

## Register 👥

registers a new user :

POST /signup

name, email and password are required in the request body :

POST /signup
{
"name": "deomName",
"email": "deomEmail@email.com",
"password": "sdfa@21SF"
}

The password is encrypted by bcryptjs.

You will receive a response after signing up, as shown in the example below.
{
  "name": "******",
  "email": "****@gamil.com",
  "id": "*****",
  "tokenId": "S79aqtsHEPUDioqdcP31rzKa2U",
  "accessTime": "*****",
  "isTrue": true,
  "message": "Signup successful! 🎉✅🚀 Welcome aboard!"
}

User Login Endpoint 🛂

POST /login

Required:
email
password
Please ensure both fields are provided.

Example Request:
POST /login
{
  "email": "olivier@mail.com",
  "password": "bestPassw0rd"
}
You will receive a response upon logging in, as shown in the example below.

{
  "name": "*****",
  "email": "*****@gamil.com",
  "id": "*****",
  "tokenId": "pvwkiXCCMZdyZwvVS3MxGfvBGx",
  "accessTime": "*****"
}

Adding Additional Custom Routes:

You can also include additional standard custom routes if needed:
// info.config
demo = [demoTitle, demoDescription, demoPrice]

⏳ Hold on!

You will need to update the info.config file to do this.

Please do not directly add routes or properties to the `db.json` file. First, update the `info.config` file, then make changes to the `db.json` file. The `info.config` file acts like a schema.


```
