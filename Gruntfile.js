module.exports = function(grunt) {
    grunt.initConfig({
        connect: {
            server: {
                options: {
                    keepalive: true,
                    port: 1337,
                    base: 'www'
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Default task(s).
    grunt.registerTask('default', ['connect']);

};
