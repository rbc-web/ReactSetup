#  A Basic React Setup
This is my attempt in automating a build process for a React Application and my response to a couple issues that came about when working on a personal project.

<!-- TOC START min:2 max:6 link:true asterisk:false update:true -->
- [Overview](#overview)
- [Assumptions](#assumptions)
- [Download Project](#download-project)
- [Install Dependencies](#install-dependencies)
- [Set Environment Variables](#set-environment-variables)
	- [Create Environment Variable File](#create-environment-variable-file)
	- [Add Environment Variables](#add-environment-variables)
- [Edit webpack Config File](#edit-webpack-config-file)
	- [Changing the App's Name](#changing-the-apps-name)
		- [Different name for CSS bundle?](#different-name-for-css-bundle)
- [Build Project](#build-project)
	- [Done](#done)
- [Documentation](#documentation)
- [Issues and Response](#issues-and-response)
	- [Reduced number of files](#reduced-number-of-files)
	- [Compatible with some older browsers](#compatible-with-some-older-browsers)
	- [Reduce edits to index.html](#reduce-edits-to-indexhtml)
	- [localize CSS class names and avoid naming collisions](#localize-css-class-names-and-avoid-naming-collisions)
	- [JS Errors](#js-errors)
	- [Saving Credentials/localized info](#saving-credentialslocalized-info)
	- [Dev and Prod Environments](#dev-and-prod-environments)
<!-- TOC END -->


## Overview
1. Download Project
1. Install Dependencies
1. Set Environment Variables
1. Edit webpack Config File
1. Build Project

## Assumptions
* Node.js is installed, this project was developed with version `8.14.0` installed.
* Npm is installed, this project was developed with version `6.4.1` installed.
* Terminal like interface is used to build this project.
* Some understanding of webpack.

## Download Project
Clone project into desired directory.

```Shell Session
$ cd ./nameOfDirectory
$ git clone https://github.com/rbc-web/basic-react-setup.git
```

## Install Dependencies
In the directory of the project, `basic-react-setup`, run the following command.

```Shell Session
$ npm install
```
*Do not build the project at this point*

## Set Environment Variables
To build the project, environment variables must be set.

**List of Environment Variables:**
* ROOT_DIRNAME

**ROOT_DIRNAME:** Contains the path to the project folder. If using terminal, can use `pwd` to print out the path of current directory.

### Create Environment Variable File
Using whichever editor, create a file called `.env`, this file will contain our environment variables.

### Add Environment Variables
Add the Environment variables onto the .env file and their values.

**E.g. of .env file**
```
ROOT_DIRNAME=/Users/SomeOne/some/folder/your/projects/basic-react-setup
```

For extra insurance, check the .env.example file, it should contain the environment variables being used.

## Edit webpack Config File
### Changing the App's Name
By default, webpack will produce two files. One called `nameOfYourApp.bundle.js` and the other `nameOfYourApp.css`. One contains the bundled React Application and the other is the concatenation of all our individual CSS files.

To change the name of the produced bundle, open and edit `webpack.config.js` under the `configFiles` folder.

```JavaScript
module.exports = {
  mode: env,
  devtool: (ENV.isDev())? 'eval-source-map': false,
  context: path.resolve(process.env.ROOT_DIRNAME, 'components'),
  entry: {
      nameOfYourApp: ['./App.js']
  },
}
```
Change `nameOfYourApp` to your desired name. This will have the effect of changing both the produced JS and the CSS file.

#### Different name for CSS bundle?

Edit the plugins property.

```JavaScript
plugins:[
  new CleanWebpackPlugin({verbose: true}), //should 'clean' everything in output.path folder

  new MiniCssExtractPlugin({
    filename: "./css/[name].css",
  }),

  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.resolve(process.env.ROOT_DIRNAME, 'index.html'),
  }),

],
```
Under the MiniCssExtractPlugin, change the filename property to the desired name. `[name]` is a placeholder for the name we have given our application, in our case that would be `nameOfYourApp`.

## Build Project

```Shell
$ npm run buildFront
```
The above command runs `webpack --config ./configFiles/webpack.config.js`, the command itself is defined in `package.json`.

By running our config file, a `build` folder is created if one does not already exist. A `javascript`, and `css` folder is created inside the `build` folder, with in their respective bundle.

An `index.html` files is also created when running the above command. Our React application will be loaded onto this file. `index.html` contains links to the produced bundles regardless of their name.

During the execution of the above command, the build folder is first emptied. Meaning whatever is contained in the build folder will be deleted.

### Done
At this point, you should have a workable React Setup.


## Documentation
[FAQs](./docs/faq.md)

[Do it yourself Setup](./docs/diy-setup.md)


## Issues and Response
The following are some design issues that I encountered and my response to them.

### Reduced number of files
Used webpack to bundle js and css files.

### Compatible with some older browsers
Used babel to transpile code and provide polyfills when needed. Babel's configuration can be found in webpack.config.js.

### Reduce edits to index.html
Automated the insertion of links to bundles in index.html.

### localize CSS class names and avoid naming collisions
Names are appended with hashes during dev environment and completely replaced with hashes during prod environment (obfuscation).

### JS Errors
When an error occurred in one of the JS files the error message was relative to the bundled file, not the source file. So, enable source-maps during dev environment.

### Saving Credentials/localized info
Needed to save username and password to a database and couldn't leave that in the source code. So, added usage of environment variables.

Didn't want paths that were specific to a local environment to be part of the source code so, used environment variables as placeholders for those paths.

### Dev and Prod Environments
I wanted source maps, error messages, readable css class names, etc. to be available only during development and not when served to the public so, automated switching between the two environments.
