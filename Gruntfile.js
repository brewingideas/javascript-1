module.exports = function(grunt) {

    // Project configuration
    grunt.initConfig({
        
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                esversion: 6,
                globals: {
                    jQuery: true
                },
                ignores: ['tests/helpers/third-party/**/*.js']
            },
            all: ['Gruntfile.js', 'src/**/*.js', 'tests/**/*.js']
        },
        
        shell: {
            options: {
                stderr: true
            },
            test: {
                command: 'npm t'
            },
            karma: {
                command: 'karma run tests/support/karma.conf.js'
            },
            intern: {
                command: './node_modules/.bin/intern-client config=tests/support/intern'
            }
        },
        
        watch: {
            development: {
                files: ['src/**/*.js', 'tests/**/*.js'],
                tasks: ['jshint', 'shell:test']
            },
            karma: {
                files: ['src/**/*.js', 'tests/**/*.js'],
                tasks: ['jshint', 'shell:karma']
            },
            intern: {
                files: ['src/**/*.js', 'tests/**/*.js'],
                tasks: ['jshint', 'shell:intern']
            }
        }
        
    });
    
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.registerTask('default', ['jshint:all', 'shell:test']);
    grunt.registerTask('karma', ['jshint:all', 'shell:karma']);
    grunt.registerTask('intern', ['jshint:all', 'shell:intern']);

};
