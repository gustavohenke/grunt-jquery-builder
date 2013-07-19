# grunt-jquery-builder [![Build Status](https://travis-ci.org/gustavohenke/grunt-jquery-builder.png?branch=master)](https://travis-ci.org/gustavohenke/grunt-jquery-builder)
> Creates custom builds of jQuery using the [jQuery Builder tool](http://projects.jga.me/jquery-builder/)

## Getting started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-jquery-builder --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks("grunt-jquery-builder");
```

## jquery task
_Run this task with the `grunt jquery` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Options

#### prefix
Type: `String`
Default: _empty string_

An string to preceed the version + extension in the file name. For example, if "jquery-" is provided, then a file "jquery-2.0.3.js" will be created for the version 2.0.3.
If empty, only "2.0.3.js" will be created.

#### minify
Type: `Boolean`
Default: true

Whether the minified versions of jQuery should be used.


### Usage examples

Defining modules to be excluded for each version:

```js
jquery: {
  dist: {
    versions: {
      // Remove everything we don't need from 2.x versions
      "2.0.3": [ "ajax", "deprecated", "sizzle" ],
      
      // We can't remove sizzle from 1.x versions, so let's not specify it
      "1.8.0": [ "ajax", "deprecated" ],
      
      // We can even specify it as a string
      "1.9.0": "ajax, deprecated"
    }
  }
}
```

Defining that all versions will use the complete build and will be created in the "lib/jquery" directory:

```js
jquery: {
  dist: {
    output: "lib/jquery",
    versions: [ "2.0.0", "1.10.0", "1.9.0", "1.8.0" ]
  }
}
```

Specifying an prefix for the created files and disabling minification:

```js
jquery: {
  dev: {
    options: {
      prefix: "jquery-",
      minify: false
    },
    output: "lib",
    versions: [ "2.0.0", "1.10.0", "1.9.0", "1.8.0" ]
  }
}
```
