suite( "grunt-jquery-builder", function() {
    "use strict";

    var fs = require( "fs" );
    var assert = require( "assert" );

    test( "filename prefix", function() {
        assert( fs.existsSync( "tmp/dev.2.0.3.js" ) );
    });

    test( "minify", function() {
        var devString = "( window );";
        var min = fs.readFileSync( "tmp/2.0.3.js", "utf8" );
        var dev = fs.readFileSync( "tmp/dev.2.0.3.js", "utf8" );

        assert.notStrictEqual( min, dev );
        assert.strictEqual( min.indexOf( devString ), -1 );
        assert.notStrictEqual( dev.indexOf( devString ), -1 );
    });

    test( "versions downloaded", function() {
        assert( !fs.existsSync( "tmp/invalid-version.js" ) );
        assert( !fs.existsSync( "tmp/dev.invalid-version.js" ) );
    });
});