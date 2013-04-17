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
    clean: {
      prod: {
        src: ['./public/dist/']
      },
      dev: {
        src: ['./public/dist-dev/']
      }
    },
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
      prod: {
        files: [
          {expand: true, cwd: customAssetsDir + '/img/', src: ['**'], dest: './public/dist/img/', filter: 'isFile'},
          {expand: true, cwd: customAssetsDir + '/ico/', src: ['**'], dest: './public/dist/ico/', filter: 'isFile'},
          {expand: true, cwd: customAssetsDir + '/fonts/', src: ['**'], dest: './public/dist/fonts/', filter: 'isFile'}
        ]
      },
      dev: {
        files: [
          {expand: true, cwd: gruntBowerDir + '/3party/', src: ['3party.js'], dest: './public/dist-dev/js/', filter: 'isFile'},
          {expand: true, cwd: gruntBowerDir + '/3party/', src: ['3party.css'], dest: './public/dist-dev/css/', filter: 'isFile'},
          {expand: true, cwd: gruntBowerDir + '/<%= pkg.name %>/', src: ['<%= pkg.name %>.js'], dest: './public/dist-dev/js/', filter: 'isFile'},
          {expand: true, cwd: gruntBowerDir + '/<%= pkg.name %>/', src: ['<%= pkg.name %>.css'], dest: './public/dist-dev/css/', filter: 'isFile'},          
          {expand: true, cwd: customAssetsDir + '/img/', src: ['**'], dest: './public/dist-dev/img/', filter: 'isFile'},
          {expand: true, cwd: customAssetsDir + '/ico/', src: ['**'], dest: './public/dist-dev/ico/', filter: 'isFile'},
          {expand: true, cwd: customAssetsDir + '/fonts/', src: ['**'], dest: './public/dist-dev/fonts/', filter: 'isFile'}
        ]
      }     
    }, 
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['dev']
    }
  });

  // Load libs
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-yui-compressor');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Register the default tasks
  grunt.registerTask('default', [
    'clean',
    'bower:install', 
    'jshint', 
    'concat',
    'min',
    'cssmin',
    'copy:prod'
    ]
  );

  // Developer tasks (not for production): 
  grunt.registerTask('dev', [
    'clean:dev',
    'bower:install', 
    'jshint',
    'concat',
    'copy:dev'
  ]);
};