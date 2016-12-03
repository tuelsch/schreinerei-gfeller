var path = require('path');

/*
 *  Instructions:
 *  =============
 *  
 *	1. All paths beneath are relative to gulpfile.js unless
 *	   a comment says otherwise. If gulpfile.js is a folder,
 *	   think of it as a file, gulp treats it the same way.
 *	   
 *	2. If you don't want a task to be running,
 *	   comment out or delete its options.
 *	   
 *	3. Modify dest and webroot to your liking and you are good
 *	   to go, if your folder structure meets the defaults set.
 */

var source = './schreinerei-gfeller/Frontend';

// Output folder for assets, relative to gulpfile.js
var destination = './schreinerei-gfeller/Assets';

// Route to your asset folder from a browser point of view
var webroot = '/Assets';

var options = {

	// Project name (used as the console title)
	name: 'schreinerei-gfeller',

	// All targeted files get simply copied to destination
	// folder.
	static: {
		src: source + '/static/**'
	},

	sass: {
		src: source + '/sass/**/*.scss',
		main: source + '/sass/main.scss',
		dest: destination + '/css',
		
		options: {
			nodeSass: {
				includePaths: ['node_modules'],
			},
			autoprefixer: {
				browsers: ['last 2 versions']
			},
			sourcemaps: {
				sourceMappingURLPrefix: webroot + '/css'
			}
		}
	},

	svgSprite: {
		src: source + '/svg/**/*.svg',
		dest: './',
		svgDest: destination + '/svg/svg-sprite.svg',
		lessDest: source + '/sass/core/svg-sprite.scss',
		htmlDest: destination + '/svg-sprite.html'
	},

	// Javascript bundles
	webpack: {

		// Define where your javascript source files lie
		src: source + '/js/**/*.js',

		// Define entry points for your scripts.
		// Use paths starting with './' (this folder)
		// or '../' (this folders parent)
		entry: {
			app: source + '/js/app.js'
		},

		// Set resolve paths
		resolve: {
			extensions: ['', '.js', '.vue'],
			root: [path.resolve(source + '/js')],
			alias: {
				'modules': path.resolve(__dirname, '../schreinerei-gfeller/Frontend/js/modules'),
			},
		},

		// Destination folder
		output: {
			path: destination + '/js/',
			publicPath: webroot
		},

		module: {
			loaders: [
				{
					test: /\.js$/,
					loader: 'babel-loader',
					exclude: /node_modules/,
					query: {
						presets: ['es2015']
					}
				}
			]
		},

		// Use common chunks plugin?
		commonChunks: false

		// For all other options, it is recommended you look
		// at the more detailed options file at /gulpfile.js/options/webpack.js
	},

	// Jade to HTML
	jade: {

		// Jade files to watch for changes
		src: source + '/jade/**/*.jade',

		// Destination for html files
		dest: destination,

		// Entry points for views resulting in HTML pages
		views: source + '/jade/views/**/*.jade',

		// Options to pass to gulp-jade
		options: {
			pretty: true
		}
	},

	// SVG icons to webfont
	fonticons: {

		// SVG files to watch for changes
		src: source + '/svg/**/*.svg',

		// Destination for font files
		dest: destination + '/fonts',

		// Destination folder for the less files
		// containing the mixin
		lessDest: source + '/sass/core/',

		// Where the browser can find your font files
		root: webroot + '/fonts'
	},

	tinypng: {
		//change api key!
		apikey: "37Y9xQpd3cb1fGBVOfwRSS-D3Ktmi_K7",
		// SVG files to watch for changes
		src: source + '/tinypng/**/*.{png,jpg,jpeg,PNG,JPG,JPEG}',
		// Destination folder for the less files
		// containing the mixin
		dest: source + '/static/img'
	},

	// Static webserver and livereload
	browserSync: {

		// If you have static html, css and js files and no server,
		// you can use browserSync as your static file server:
		//server: { baseDir: destination },

		// If you already have a server running,
		// you can use browserSync as a proxy, like:
		proxy: 'http://localhost:56844/',
		
		// Wether to open new tab on start or not
		open: false,
		logFileChanges: false
	},

	// These are required for the 
	// extended options, do not alter
	dest: destination,
	webroot: webroot,
	src: source
};

// Export them options
module.exports = options;