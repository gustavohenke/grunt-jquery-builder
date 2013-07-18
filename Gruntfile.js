module.exports = function( grunt ) {
    "use strict";

    grunt.initConfig({
        jscs: {
            all: "<%= jshint.all %>"
        },
        jshint: {
            options: {
                jshintrc: ".jshintrc"
            },

            all: [ "Gruntfile.js", "tasks/*.js" ]
        },
        jquery: {
            dist: {
                output: "tmp",
                versions: "<%= jquery.dev.versions %>"
            },
            dev: {
                options: {
                    prefix: "dev.",
                    minify: false
                },
                output: "tmp",
                versions: [ "2.0.3", "invalid-version" ]
            }
        },
        simplemocha: {
            options: {
                ui: "tdd",
                reporter: "dot"
            },
            all: {
                src: [ "tests/*.js" ]
            }
        },
        clean: {
            tmp: [ "tmp/" ]
        }
    });

    // Register our tasks
    grunt.loadTasks( "tasks" );

    // All our dependencies
    grunt.loadNpmTasks( "grunt-contrib-jshint" );
    grunt.loadNpmTasks( "grunt-contrib-clean" );
    grunt.loadNpmTasks( "grunt-jscs-checker" );
    grunt.loadNpmTasks( "grunt-simple-mocha" );

    grunt.registerTask( "default", [ "jshint", "jscs", "jquery", "simplemocha", "clean" ] );
};