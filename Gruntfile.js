module.exports = function(grunt) {
  // require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-regarde');

  grunt.initConfig({
    sass: {
      dist: {
        files: {
          'css/style.css': 'css/style.scss'
        }
      }
    },
    watch: {
      files: ['**/*.html'],
      options: {
        livereload: true
      },
      // scripts: {
      //   files: ['**/*.js'],
      //   tasks: ['jshint'],
      //   options: {
      //     spawn: false,
      //   },
      // },
      css: {
        files: '**/*.scss',
        tasks: ['sass'],
        options: {
          livereload: false,
        },
      }
    },
    connect: {
      all: {
        options:{
          port: 3000,
          hostname: "0.0.0.0",
          // Prevents Grunt to close just after the task (starting the server) completes
          // This will be removed later as `watch` will take care of that
          // keepalive: true,
          middleware: function(connect, options) {

            return [

              // Load the middleware provided by the livereload plugin
              // that will take care of inserting the snippet
              require('grunt-contrib-livereload/lib/utils').livereloadSnippet,

              // Serve the project folder
              connect.static(options.base)
            ];
          }
        }
      }
    },
    open: {
      all: {
        // Gets the port from the connect configuration
        path: 'http://localhost:<%= connect.all.options.port%>'
      }
    },
    regarde: {
      all: {
        // This'll just watch the index.html file, you could add **/*.js or **/*.css
        // to watch Javascript and CSS files too.
        files:['index.html', '**/*.css'],
        // This configures the task that will run when the file change
        tasks: ['livereload']
      }
    }
  });

  grunt.registerTask('server',[
    'livereload-start',
    'connect',
    // Connect is no longer blocking other tasks, so it makes more sense to open the browser after the server starts
    // 'open',
    // Starts monitoring the folders and keep Grunt alive
    'regarde'
  ]);

  grunt.registerTask('default', ['server']);
};