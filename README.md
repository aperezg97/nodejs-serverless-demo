# NodeJS Serverless email sender function

Serverless function to send emails using SendGrid (initially it was set up to use SMTP).

---
## Requirements

For development, you will only need Node.js and a node global package, Yarn, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Linux

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v14.16.0

    $ npm --version
    6.14.11

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###
### Yarn installation
  After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn


# General set up

## .env values

This project uses `serverless-dotenv-plugin` which takes care of .env file on local devlepment. 
It will look for the default file `.env`, or the based the the stage ie. `.env.local`. 
Please take `.env.example` as starting point.

## Running the project

To run the serverless function locally can be done by:

    $ SLS_DEBUG=* serverless offline start

## Serverless deployment

For deployment you will need to set up the serverless CLI locally. Then you can run this command to deploy it:

    $ SLS_DEBUG=* serverless deploy -s staging

