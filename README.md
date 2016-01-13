# 'Boilerplate' for AngularJS + Sails.js 

### Why?
Modern web applications has separated front- and backend sides to use. This 'boilerplate' present one way to make
<em>your</em> application which have fully separated back- and frontend sides. And really this is more than just a
boilerplate, proper term would be 'example application'.

### Main goals of this boilerplate
* Separate back- and frontend development
* Authenticate with backend (possible multiple ways: local, ~~github, twitter,~~ etc.)
* Power of AngularJS + WebSockets
* Simple examples how to use these
* Provide real start point of new applications

### Directory structure
* ```backend``` = Sails.js server, just API nothing else [repository](https://github.com/tarlepp/angular-sailsjs-boilerplate-backend)
* ```frontend``` = Angular SPA, just frontend side [repository](https://github.com/tarlepp/angular-sailsjs-boilerplate-frontend)

Also note that these 'directories' are just submodules to another repos

#### Backend
[![GitHub version](https://badge.fury.io/gh/tarlepp%2Fangular-sailsjs-boilerplate-backend.svg)](https://badge.fury.io/gh/tarlepp%2Fangular-sailsjs-boilerplate-backend)
[![Build Status](https://travis-ci.org/tarlepp/angular-sailsjs-boilerplate-backend.png?branch=master)](https://travis-ci.org/tarlepp/angular-sailsjs-boilerplate-backend)
[![Dependency Status](https://david-dm.org/tarlepp/angular-sailsjs-boilerplate-backend.svg)](https://david-dm.org/tarlepp/angular-sailsjs-boilerplate-backend)
[![devDependency Status](https://david-dm.org/tarlepp/angular-sailsjs-boilerplate-backend/dev-status.svg)](https://david-dm.org/tarlepp/angular-sailsjs-boilerplate-backend#info=devDependencies)

For backend side this boilerplate uses Sails.js (imho awesome). See more info at https://github.com/balderdashy/sails
I have just done some small tweaks to generic workflow of sails nothing else. Backend side of this 'boilerplate' is 
served on separate repository https://github.com/tarlepp/angular-sailsjs-boilerplate-backend

#### Frontend
[![GitHub version](https://badge.fury.io/gh/tarlepp%2Fangular-sailsjs-boilerplate-frontend.svg)](https://badge.fury.io/gh/tarlepp%2Fangular-sailsjs-boilerplate-frontend)
[![Build Status](https://travis-ci.org/tarlepp/angular-sailsjs-boilerplate-frontend.png?branch=master)](https://travis-ci.org/tarlepp/angular-sailsjs-boilerplate-frontend)
[![Dependency Status](https://david-dm.org/tarlepp/angular-sailsjs-boilerplate-frontend.svg)](https://david-dm.org/tarlepp/angular-sailsjs-boilerplate-frontend)
[![devDependency Status](https://david-dm.org/tarlepp/angular-sailsjs-boilerplate-frontend/dev-status.svg)](https://david-dm.org/tarlepp/angular-sailsjs-boilerplate-frontend#info=devDependencies)

Boilerplate uses slush-angular for frontend (AngularJS using Google Angular App Structure Recommendations).
See more info at https://github.com/slushjs/slush-angular This library is awesome to distribute frontend. Frontend side 
of this 'boilerplate' is served on separate repository https://github.com/tarlepp/angular-sailsjs-boilerplate-frontend

### Used libraries, guides, etc.
* Sails.js, http://sailsjs.org/
* slush-angular, https://github.com/slushjs/slush-angular
* AngularJS, https://angularjs.org/
* Bootstrap, http://getbootstrap.com/
* Techniques for authentication in AngularJS applications, https://medium.com/opinionated-angularjs/7bbf0346acec
* Json Web Tokens, http://angular-tips.com/blog/2014/05/json-web-tokens-examples/

### Installation
First of all you have to install <code>npm</code> and <code>node.js</code> to your box. Installation instructions can
be found [here](http://sailsjs.org/#/getStarted?q=what-os-do-i-need).

After that you need to install <code>bower</code>, <code>gulp</code> and <code>sails</code> main packages to make all 
things to happen. These can be installed with following commands on your *nix box.
<pre>
sudo npm install bower -g
sudo npm install gulp -g
sudo npm install sails -g
</pre>

After that you need to download codes of this project to your computer, please follow instructions below.

#### Back- and frontend installation
Navigate yourself to directory where you downloaded or cloned this repo and run following command on shell:
<pre>
npm install
</pre>

That will install all needed packages for back- and frontend. If this won't work you could try first to initialize
back- and frontend submodules with following command:

<pre>
git submodule update --init --recursive
</pre>

Also you might need to run ```npm install``` command on each of those directories (<code>backend</code> and 
<code>frontend</code>).

#### Configuration
You can configure your <code>backend</code> and <code>frontend</code> applications to use your environment specified 
settings. Basically by default you don't need to make any configurations at all. With default configuration backend will 
be run on http://localhost:1337 and frontend on http://localhost:3001 (development) http://localhost:3000 (production).

##### Backend
There is an example of backend configuration file on following path.

<pre>
/backend/config/local_example.js
</pre>

Just copy this to <code>/backend/config/local.js</code> and make necessary changes to it. Note that this 
<code>local.js</code> file is in .gitignore so it won't go to VCS at any point.

##### Frontend
There is an example of front configuration file on following path.

<pre>
/frontend/config/config_example.json
</pre>

Just copy this to <code>/frontend/config/config.json</code> and make necessary changes to it. Note that this 
<code>config.json</code> file is in .gitignore so it won't go to VCS at any point.

##### Notes
If you're changing your backend API url to another than <code>http://localhost:1337</code> you need to make 
<code>frontend/config/config.json</code> with proper content on it. Use that example file as start.

### Running of this project
You have to start both <code>backend</code> and <code>frontend</code> servers to run this project. You can do this
by running following command on your project root directory:

<pre>
npm start
</pre>

This will start back- and frontend applications for you. And if you need to start those separately see following docs
about that.

#### Backend
<pre>
cd backend
sails lift
</pre>

This will start sails.js server on defined port. By default this is accessible from http://localhost:1337 url. If you 
try that with your browser you should only see page that contains <code>Not Found</code> message on it. This means that
everything is ok.

#### Frontend

##### Development #####
<pre>
cd frontend
gulp serve
</pre>

This will start simple web server that you can use within developing frontend side. By default this is accessible from 
http://localhost:3001 url. You should be see login page if you try that url with your browser.

##### Deployment #####
As in production
<pre>
cd frontend
gulp dist
</pre>

This will create a deployment code to ```frontend/dist``` folder. After that you can serve those static HTML, CSS, 
Javascript and asset files by any web server you like (Apache, nginx, IIS, etc.). For testing this production ready code
you can also use ```gulp production``` command which will serve those dist files. By default this is accessible from
http://localhost:3000 url.

### Possible failures
Below is small list of possible failures that can occur while trying this POC.

<ol>
    <li>Sails won't lift and you get error message like: <code>Fatal error: watch ENOSPC</code>
        <ul>
            <li>http://stackoverflow.com/questions/16748737/grunt-watch-error-waiting-fatal-error-watch-enospc</li>
            <li>tl;dr just run <code>npm dedupe</code> 
        </ul>
    </li>
    <li>Frontend side is missing some 3rd party libraries. eg. browser console is full of some errors.
        <ul>
            <li>Try to install bower packages manually by command <code>bower install</code> in <code>frontend</code> directory.
        </ul>        
    </li>
</ol>

## Demo
This might be up and running... or not. http://wunder.sytes.net:3000/

## Who is using this?
* All in my own sails.js projects, @tarlepp
* [Hackday 2015 - infoTV](https://github.com/ProtaconSolutions/hackday-2015)
* [Liukko-POC](https://github.com/ProtaconSolutions/Liukko-POC)
* [switch168](https://github.com/switch168)
* [home-dashboard](https://github.com/Hekku2/home-dashboard)

If you're using this please make PR and add your project to this list.

## Author
Tarmo Leppänen

## License
The MIT License (MIT)

Copyright (c) 2015 Tarmo Leppänen
