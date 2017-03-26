module.exports = function(grunt){

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        postcss: {
            options: {
            map: true, // inline sourcemaps
            processors: [
                require('precss'), //SASS like markup
                require('pixrem')(), // add fallbacks for rem units
                require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
                require('cssnano')() // minify the result
            ]
            },
            dist: {
                src: 'src/postcss/concat.css',
                dest: 'dist/css/style.css'
            }
        },
        uglify: {
            options: {
            mangle: false,
            compress: {
                    drop_console: true
                }
            },
            my_target: {
                files: {
                    'dist/scripts/build.min.js': ['src/js/*.js']
                }
            }
        },
        watch: {
            scripts: {
                files: 'src/js/*.js',
                tasks: ['uglify' , 'connect'],
                options: {
                event: ['added', 'deleted', 'changed'],
                },
            },
            css: {
                files: ['src/postcss/*.css', '!src/postcss/concat.css'],
                tasks: ['postcss' , 'concat_css' ,'connect']
            },
            html:{
                files: 'src/index.html',
                tasks: ['copy'],
                options: {
                }
            }
        },
        concat_css: {
            options: {},
            all: {
            src: ["src/postcss/*.css", "src/postcss/**/*.css", "!src/postcss/concat.css" ],
            dest: "src/postcss/concat.css"
            }
        },
        copy: {
            main: {
                    files: [
                    // makes all src relative to cwd
                    {expand: true, cwd: 'src/', src: ['index.html'], dest: 'dist/'}
                    ]
                },
            },
        connect: {
            server: {
            options: {
                port: 8080,
                hostname: '*',
                base: 'dist',
                livereload: true,
                useAvailablePort:true
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.registerTask('default', ['concat_css', 'uglify' , 'copy', 'postcss', 'connect', 'watch']);

}