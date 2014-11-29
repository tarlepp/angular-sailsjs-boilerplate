# Boilerplate for AngularJS + Sails.js [![Build Status](https://travis-ci.org/tarlepp/angular-sailsjs-boilerplate.png?branch=master)](https://travis-ci.org/tarlepp/angular-sailsjs-boilerplate)
### Why?
Modern web applications has separated front- and backend sides to use. This boilerplate present one way to make
<em>your</em> application which have fully separated back- and frontend sides.

### Main goals of this boilerplate
* Separate back- and frontend development
* Light frontend application
* Authenticate with backend (possible multiple ways: local, github, twitter, etc.)
* Power of AngularJS + WebSockets
* Simple examples how to use these

### Directory structure
```
backend/    = Sails.js server, just API nothing else
frontend/   = Slush-angular, just frontend side
```

#### Backend
For backend side this boilerplate uses Sails.js (imho awesome). See more info at https://github.com/balderdashy/sails
I have just done some small tweaks to generic workflow of sails nothing else.

#### Frontend
Boilerplate uses slush-angular for frontend (AngularJS using Google Angular App Structure Recommendations).
See more info at https://github.com/slushjs/slush-angular This library is awesome to distribute frontend.

### Used libraries, guides, etc.
* Sails.js, http://sailsjs.org/
* slush-angular, https://github.com/slushjs/slush-angular
* AngularJS, https://angularjs.org/
* Bootstrap, http://getbootstrap.com/
* Techniques for authentication in AngularJS applications, https://medium.com/opinionated-angularjs/7bbf0346acec
* Json Web Tokens, http://angular-tips.com/blog/2014/05/json-web-tokens-examples/

### Installation
First of all you have to install <code>npm</code> to your box. Also you need <code>node.js</code> installed to your box.
And when you have installed those you have to run following commands. Those will install the main packages that you
need to run this application.
<pre>
npm install bower -g
npm install slush -g
npm install sails -g
</pre>

After you have fetched codes of this project to your computer, please follow instructions below.

#### Setup
Change your <code>/frontend/src/app/index.html</code> file, locate <code>io.sails.url</code> and but your backend
URL address there. Also you have add your own <code>local.js</code> to your backend side. There is an example file
for that <code>/backend/config/local_example.js</code>, just copy that file to <code>/backend/config/local.js</code>
file and make necessary changes and you're ready to go.

#### Backend
<pre>
cd backend
npm install
</pre>

#### Frontend
<pre>
cd frontend
npm install
bower install
</pre>

##### Notes
If you're changing your backend API url to another than <code>http://localhost:1337</code> you need to make 
<code>frontend/config/config.json</code> with proper content on it. Use that example file as start.

### Running of this project
You have to start both <code>backend</code> and <code>frontend</code> servers to run this project. These can
be started

#### Backend
<pre>
cd backend
sails lift
</pre>

#### Frontend
As in development
<pre>
cd frontend
gulp serve
</pre>

As in production
<pre>
cd frontend
gulp dist
gulp production
</pre>

## Demo
This might be up and running... or not.
http://wunder.sytes.net:3000/

## Who is using this?

## Author
Tarmo Leppänen

## License
The MIT License (MIT)

Copyright (c) 2014 Tarmo Leppänen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
