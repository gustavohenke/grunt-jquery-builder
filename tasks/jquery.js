module.exports = function( grunt ) {
    "use strict";

    var _ = grunt.util._;
    var defaults = {
        minify: true,

        // This will be prepended in the final filename.
        // Useful for creating, for example, jquery-2.0.3.js.
        prefix: ""
    };

    function normalize( arr ) {
        var obj = {};
        _.unique( arr ).forEach(function( ver ) {
            obj[ ver ] = "";
        });

        return obj;
    }

    grunt.registerMultiTask( "jquery", "", function() {
        var args, excludes, size;
        var i = 0;
        var done = this.async();
        var options = this.options( defaults );
        var versions = this.data.versions;
        var outputDir = this.data.output;

        // This is created here to avoid re-resolving the file in each iteration
        var spawnArgs = [ require.resolve( "jquery-builder/bin/builder" ) ];

        // Do we have an array? If yes, then no excludes will be made
        if ( Array.isArray( versions ) ) {
            versions = normalize( versions );
        }

        // Cache the size of the object, so no need to recalculate every callback
        size = _.size( versions );

        if ( size === 0 ) {
            grunt.log.writeln( "No jQuery versions found" );

            // Nothing to create
            return;
        }

        if ( options.minify ) {
            spawnArgs.push( "--minify" );
        }

        function callback( version ) {
            return function( error, result ) {
                var path = "";

                // Simple regex to discover if we reached an github 404 page
                var gh404 = /^Not found$/i;

                i++;
                result = String( result );

                if ( !error && !gh404.test( result ) ) {
                    if ( typeof outputDir === "string" && outputDir ) {
                        path += outputDir + "/";
                    }
                    path += options.prefix + version + ".js";

                    grunt.file.write( path, String( result ) );
                    grunt.log.ok( "Created " + path );
                } else if ( error ) {
                    grunt.fatal( error );
                }
                // else, maybe mispelled jquery version?

                if ( i === size ) {
                    done();
                }
            };
        }

        for ( var v in versions ) {
            args = spawnArgs.slice();
            args.push( "--version", v );

            excludes = versions[ v ];
            if ( Array.isArray( excludes ) ) {
                excludes = excludes.join( "," );
            } else if ( typeof excludes !== "string" ) {
                continue;
            }

            if ( excludes.length ) {
                args.push( "--exclude", excludes );
            }

            grunt.util.spawn({
                cmd: process.execPath,
                args: args
            }, callback( v ) );
        }
    });
};