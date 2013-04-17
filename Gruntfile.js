module.exports = function(grunt) {
  // Define root paths to 3party assets and this app's custom assets:
  var gruntBowerDir = './grunt-bower-lib';
  var customAssetsDir = './assets';

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
        src: [
          gruntBowerDir + '/jquery/jquery.js',
          gruntBowerDir + '/jquery.validation/jquery.validate.js',
          gruntBowerDir + '/jquery.validation/additional-methods.js',
          gruntBowerDir + '/jquery.scrollTo/jquery.scrollTo.js',        
          gruntBowerDir + '/bootstrap/bootstrap.js'
        ],
        dest: gruntBowerDir + '/3party/3party.js'
      },
      '3party-css': {
        src: [
          gruntBowerDir + '/bootstrap/bootstrap.css'
        ],
        dest: gruntBowerDir + '/3party/3party.css'
      },
      'custom-js': {
        src: [
          customAssetsDir + '/js/common.js',
          customAssetsDir + '/js/home-page.js',
          customAssetsDir + '/js/signup.js'
        ],
        dest: gruntBowerDir + '/<%= pkg.name %>/<%= pkg.name %>.js'
      },
      'custom-css': {
        src: [
          customAssetsDir + '/css/common.css',
          customAssetsDir + '/css/home-page.css',
          customAssetsDir + '/css/signup.css',
          customAssetsDir + '/css/nav-bar.css'
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