module.exports = ->
  # Project configuration
  @initConfig
    pkg: @file.readJSON 'package.json'
    
    # BDD tests on Node.js
    mochaTest:
      nodejs:
        src: ['spec/**/*.coffee']
        options:
          reporter: 'spec'
    
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

    # Automated recompilation and testing when developing
    watch:
      files: ['**/*.coffee']
      tasks: ['build']

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

  # Grunt plugins used for testing
  @loadNpmTasks 'grunt-contrib-watch'
  @loadNpmTasks 'grunt-mocha-test'
  @loadNpmTasks 'grunt-coffeelint'

  # Our local tasks
  @registerTask 'build', ['coffee']

  @registerTask 'test', =>
    #@task.run 'coffeelint'
    #@task.run 'clean'
    @task.run 'build'
    @task.run 'mochaTest'

  @registerTask 'default', ['build']
