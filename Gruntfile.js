var fs = require('fs');

module.exports = function(grunt) {
  // Define root paths to 3party assets and this app's custom assets:
  var gruntBowerDir = './grunt-bower-lib';
  var customAssetsDir = './assets';

  // Order critical list of 3rd party & custom dependencies,
  // list in correct order (i.e. jQuery first for 3rd party)
  // and paths relative to the Bower ./components directory.
  // CRITICAL: Make sure jQuery is first in your components.json file.
  // Also TODO: if there is an order dependency WITHIN a components 
  // directory (for example jquery.validation has an additional-methods.js
  // that requires jquery.validate.js to load first), need a way
  // to manually override in that case. Ignoring for now and not using
  // components with those inner dependencies.
  var bowerJs = [];
  var bowerCss = [];
  var bowerComps = grunt.file.readJSON('component.json');
  Object.keys(bowerComps.dependencies).forEach(function(comp) {
    bowerJs.push(gruntBowerDir + '/' + comp + '/*.js');
    bowerCss.push(gruntBowerDir + '/' + comp + '/*.css');
  });

  // Initialize Grunt configuration:
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower: {
      install: {
        options: {
          targetDir: gruntBowerDir
        }
      }
    },   
    jshint: {
      // define the files to lint
      files: ['Gruntfile.js'],
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
    },     
    concat: {
      options: {
        stripBanners: false,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      '3party-js': {
        src: bowerJs,
        dest: gruntBowerDir + '/3party/3party.js'
      },
      '3party-css': {
        src: bowerCss,
        dest: gruntBowerDir + '/3party/3party.css'
      },
      'custom-js': {
        src: [
          customAssetsDir + '/js/*.js'
        ],
        dest: gruntBowerDir + '/<%= pkg.name %>/<%= pkg.name %>.js'
      },
      'custom-css': {
        src: [
          customAssetsDir + '/css/*.css'
        ],
        dest: gruntBowerDir + '/<%= pkg.name %>/<%= pkg.name %>.css'
      }            
    },    
    min: {
      dist: {
        files: {
          './public/dist/js/3party.min.js': gruntBowerDir + '/3party/3party.js',
          './public/dist/js/<%= pkg.name %>.min.js': gruntBowerDir + '/<%= pkg.name %>/<%= pkg.name %>.js'
        }
      }
    },
    cssmin: {
      dist: {
        files: {
          './public/dist/css/3party.min.css': gruntBowerDir + '/3party/3party.css',
          './public/dist/css/<%= pkg.name %>.min.css': gruntBowerDir + '/<%= pkg.name %>/<%= pkg.name %>.css'
        }
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, cwd: customAssetsDir + '/img/', src: ['**'], dest: './public/dist/img/', filter: 'isFile'},
          {expand: true, cwd: customAssetsDir + '/ico/', src: ['**'], dest: './public/dist/ico/', filter: 'isFile'}
        ]
      }      
    }
  });

  // Load libs
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-yui-compressor');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Register the default tasks
  grunt.registerTask('default', [
    'bower:install', 
    'jshint', 
    'concat',
    'min',
    'cssmin',
    'copy'
    ]
  );
};