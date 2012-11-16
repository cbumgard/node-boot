_Visit http://node-boot.herokuapp.com/ for a live demo!_

What is __node-boot__?
==================

__node-boot__ is a starting point for developing a web application based on a proven node.js stack:

- [express]
- [jade view templates]
- [Twitter Bootstrap]
- [MongoDB] & [Mongoose] (app data)
- [Redis] (sessions)
- [Winston] (async logging)
- [Passport OAuth]

[express]: http://expressjs.com/
[jade view templates]: http://jade-lang.com/
[Twitter Bootstrap]: http://twitter.github.com/bootstrap/
[MongoDB]: http://www.mongodb.org/
[Mongoose]: http://mongoosejs.com/
[Redis]: http://redis.io/
[Winston]: https://github.com/flatiron/winston'
[Passport OAuth]: http://passportjs.org/'

Why You Should Use It
=====================

__node-boot__ is a starting point providing a sensible, configurable, and customizable set of choices. You get a turnkey web app that provides common patterns such as environment-specific configuration files, clustering for multiple cores, SSL certificate setup, database connections, logging transports, and caching and compression of content.

The experience of building a production-ready, deployable web application involves making many choices: which technologies, what configuration settings, best practices, etc. While there is no one right set of choices, these are ones I have used in my own production web application and have found to be not only pragmatic and scalable, but a pleasure to work with. My hope is this might help you get off the ground fast so you can focus on building that awesome idea you've got in your head.

How To Start
============

Fork __node-boot__ at https://github.com/cbumgard/node-boot

Make sure you have the latest stable version of node.js and npm installed. Then just:

`$ git clone https://github.com/cbumgard/node-boot`
`$ cd node-boot/`
`$ npm install`
`$ node app.js`

You should now be able to connect to http://localhost:8000/ and see a page just like this one.

And now build your awesome web app! Please feel free to submit pull requests and contact me at cbumgard@gmail.com