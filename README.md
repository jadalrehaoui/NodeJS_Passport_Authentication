**About this repo**

<<<<<<< HEAD
=======
npm => passport v0.4.1 the newer versions need different implementation
console.cloud.google.com => create a project

**About this repo**

>>>>>>> af3454c7651dcc34a0df39951d78345aa4656ba9
Hello everyone, Glad you found this repo as it will saves you time implementing the authentication for you NodeJS/ExpressJS server

This repo is using passport module, not the newest, the 0.4.1 version, if you by mistake installed the new one just change the version in package.json and npm install --save again so you get the specific version.

This implementation uses cookies and session just to keep in mind

You will need to setup a google account, and go to console.cloud.google.com to create a new project.
A database is needed, as per client request I am using MongoDB, also an account is needed to create your database project.

In this tutorial I will only go through how to setup the google auth application, but for the mongoDB setup I will not because it is straight forward. Just go to mongoDB, create an account, create a project, get the connection string, add your password to the connection string and voila you got it set up.

if you cloned this repo make sure to update the keys.js file located under config folder

**IMPORTANT**

npm => passport v0.4.1 the newer versions need different implementation
console.cloud.google.com => create a project

**LET'S DIVE IN**

Before you clone,
*know that we are going to redirect the users from our page to google's login page so they login there and the login will get redirected to us with their information*

* Go to console.google.cloud.com
* Create a project, name it whatever you like of course (You will find a create project next to page title)
* select the project you just created
* Go to the Hamburger button and under APIs & Services select OAuth Consent Screen
* Select external and hit create
* type in a name, a user support email, and a contact email (Developer contact information)
* hit save and continue
* nothing to add in the scope hit save and continue
* nothing is test users hit save and continue
* summary page hit back to dashboard

Now you have the consent screen set up, you can add a logo, in this step if you want google to show your logo in their login screen as for many more configurations.

*Here we are going to configure the api so we have some routes to communicate with google*

* in the left menu, click on credentials
* create credentials, select OAuth Client ID
* Application type = web application
* you can leave the name as it is, or change it it's up to you
* click on add URI under Authorized JavaScript origins and type http://localhost:3000 as this will be our server running locally on port 3000
* click on add URI under Authorized redirect URIs and type http://localhost:3000/api/auth/google/callback as this will be the route where we are going to listen to google's response when the user authenticates

*Note the Authorized redirect URIs is sensitive you need to have it configured in the server later on, know that if you change this you'll have to change it in the server in the passport service*

*Note you can add more than 1 uri so it can be your production uri as an Authorized Javascript origins without /
and the callback can be other that localhost but it has to be the same route meaning /api/auth/google/callback*

* click create

*VERY IMPORTANT a pop up will show on the screen with Your Client ID and Your Client Secret you need to save these somewhere really safe and do not push them to github or any type of VCS but your server on the cloud will need them to authenticate users with google*

* copy these two and add them respectively in config/keys.js
GOOGLE_ClientID: "<HERE>",
GOOGLE_ClientSecret: "<HERE>"

**DONE with google configuration**

Now you can clone Hooray !

Now you can go to mongodb.com and create a database and get the connectionString and add it to config/keys.js in the MONGO_DB_URI: "<HERE>"

in the command line run
* npm install --save
* npm run dev

**TESTING**

In your browser go to http://localhost:3000/api/auth/google
You will be redirected to Google login page
login with your google credentials, once you hit sign in you will be redirected to http://localhost:3000/api/auth/google/callback?code=<code>&scope=<scope>&authuser=<authuser>&prompt=<prompt>
a long url
once there type in your browser http://localhost:3000/api/auth/user here you should see a json containing googleID and a name

contact me if you need more details

Thanks and happy coding !
