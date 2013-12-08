module.exports = ->
  # Project configuration
  @initConfig
    pkg: @file.readJSON 'package.json'

    # CoffeeScript compilation
    coffee:
      src:
        options:
          bare: true
        expand: true
        cwd: 'src'
        src: ['**.coffee']
        dest: 'lib'
        ext: '.js'
      spec:
        options:
          bare: true
        expand: true
        cwd: 'spec'
        src: ['**.coffee']
        dest: 'spec'
        ext: '.js'

    
    exec:
      main_install:
        command: './node_modules/.bin/component install'
      main_build:
        command: './node_modules/.bin/component build -o browser -n interpolator -c'
      standalone_build:
        command: './node_modules/.bin/component build -o . -n interpolator -c --standalone interpolator'

    # JavaScript minification for the browser
    uglify:
      options:
        report: 'min'
      src:
        files:
          './browser/interpolator.min.js': ['./browser/interpolator.js']

    # Automated recompilation and testing when developing
    watch:
      files: ['**/*.coffee']
      tasks: ['build']

    # BDD tests on Node.js
    cafemocha:
      nodejs:
        src: ['spec/*.coffee']
        options:
          reporter: 'dot'

    # Coding standards
    coffeelint:
      components: 
        files:
          src: ['components/*.coffee', 'lib/*.coffee']
        options:
          max_line_length:
            value: 80
            level: 'ignore'

  # Grunt plugins used for building
  @loadNpmTasks 'grunt-contrib-coffee'
  @loadNpmTasks 'grunt-exec'
  @loadNpmTasks 'grunt-contrib-uglify'

  # Grunt plugins used for testing
  @loadNpmTasks 'grunt-contrib-watch'
  @loadNpmTasks 'grunt-cafe-mocha'
  @loadNpmTasks 'grunt-coffeelint'

  # Our local tasks
  @registerTask 'build', ['coffee', 'exec:main_install', 'exec:main_build', 'exec:standalone_build']

  #@registerTask 'test', 

  @registerTask 'default', ['build']
