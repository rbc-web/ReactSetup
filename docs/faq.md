# Questions
Some questions that may pop up when interpreting the codebase.

<!-- TOC START min:2 max:6 link:true asterisk:false update:true -->
- [Why have an environment variable for the project's path, ROOT_DIRNAME?](#why-have-an-environment-variable-for-the-projects-path-root_dirname)
- [How to access environment variables?](#how-to-access-environment-variables)
- [What is the .env.example file?](#what-is-the-envexample-file)
- [What does the `modules` option in `css-loader` do?](#what-does-the-modules-option-in-css-loader-do)
- [What is the meaning behind the babel's target string?](#what-is-the-meaning-behind-the-babels-target-string)
- [What is Firefox ESR?](#what-is-firefox-esr)
- [Reason behind Babel's targets?](#reason-behind-babels-targets)
<!-- TOC END -->

## Why have an environment variable for the project's path, ROOT_DIRNAME?
To use an alias in webpack's configuration. Essentially by doing so, we are allowed to the following

```JavaScript
import HelloWorld from 'nameOfYourApp/components/HelloWorld/HelloWorld.js';

```
instead of

```JavaScript
import HelloWorld from 'Users/SomeOne/some/folder/your/projects/ReactSetup/components/HelloWorld/HelloWorld.js'
```
Where `nameOfYourApp` is an alias for `Users/SomeOne/some/folder/your/projects/ReactSetup`

## How to access environment variables?
Eg.  
`process.env.ROOT_DIRNAME`

Do note that `process.env` is in the context of being used in node.js, which is not the browser. So, the above snippet should not work
for the React Components in the `components` folder.

## What is the .env.example file?

The `.env.example` file should contain the environment variables being used in the project. `.env.example`, is used by `dotenv-safe` to compare it with `.env` and warn you of any missing variables. The variables in `.env.example` do not contain any values, the values are contain in the `.env` file.

**E.g of .env.example file**
```
ROOT_DIRNAME=
```

## What does the `modules` option in `css-loader` do?

The modules option allows CSS Modules specs, meaning we can 'import' our css file as a module. To localize the css property names and avoid naming collisions, the names are hashed in production and in dev they are prepended with the name of the file and appended with a hash. But, in order to do localIdentName option must be used, to specify the naming style.

**E.g.**

```JavaScript
{
  loader: "css-loader",
  options: {
    modules: {
      localIdentName:(ENV.isDev()) ? '[name]__[local]--[hash:base64:5]': '[hash:base64]'
    }
  },
}
```
Meanings for place holders, `[name] [local]` etc. can be found [here](https://github.com/webpack/loader-utils#interpolatename)

[more info on modules option](https://github.com/webpack-contrib/css-loader#modules)

## What is the meaning behind the babel's target string?
[Babel's doc](https://babeljs.io/docs/en/babel-preset-env#targets)

[Can read about it here](https://github.com/browserslist/browserslist)


## What is Firefox ESR?
Firefox Extended Support Release, inteded for large organizations, that need to setup and maintain Firefox for the long term. Does not come with the latest features, but has security and stability.

[More Info](https://support.mozilla.org/en-US/kb/switch-to-firefox-extended-support-release-esr)

## Reason behind Babel's targets?

Babel targets is `> 0.2%, last 1 version, not dead, Firefox ESR`.

If changing from default recommended target is `> 0.2%, last 1 version, not dead,`
[more info](https://github.com/browserslist/browserslist#best-practices)
