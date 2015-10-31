# POWER OVERWHELMING!!!!

Power Overwhelming is an open source project to help you find your potential archon partner. If you'd like to contribute, Power Overwhelming can be found on Github.

The app is built using Component-style AngularJS and Firebase.  


## Installation

### Machine Requirements

Setup assumes you have the following NodeJS tools already installed on your machine at a global level

- npm
- Bower
- Grunt

### Firebase

We use [Firebase](https://www.firebase.com/) for the backend, mostly for the real-time presence functionality (aka. showing who's online). The app includes a link to _our_ instances, which you are free to use. **

**NOTE:** It's probably best to signup for your own dev instance - it's free.  Otherwise, feel free to use our dev instance (https://po-dev-instance.firebaseio.com/).

**Important:** Please don't use our production one - we're trusting you here ;)


### Dev setup

1. Clone this repository

2. Run `$: npm install` to install dependencies

3. Update `Gruntfile.js` and set the firebase instance to your own.

    ```js
    ngconstant: {
      options: {
        name: '<%= config.name %>',
        wrap: "(function(){'use strict';\n\n{%= __ngModule %}})();",
        deps: false,
        space: '  '
      },
      dev: {
        options: {
          dest: '<%= config.app %>/config.js',
        },
        constants: {
          FIREBASE_URL: 'https://<YOUR_INSTANCE>.firebaseio.com/'
        }
      },
    ```

4. Run the app using `$: grunt serve`


### Building for production

Run `$: grunt build`.  The app will be compiled into the `dist` folder. You can then upload these files to your own server.



## About Us

If you have any questions, comments, suggestions or discussion topics, come find us on Reddit at [/r/poweroverwhelming](https://www.reddit.com/r/poweroverwhelming).


### Contributors

- Frank Lee ([GH](https://github.com/lee-frank))
- JJ Hiew ([GH](https://github.com/jjhiew)), PowderKeg Labs


## License

MIT

StarCraft is a trademark or registered trademark of Blizzard Entertainment, Inc., in the U.S. and/or other countries
