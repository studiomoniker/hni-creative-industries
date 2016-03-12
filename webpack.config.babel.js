var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var webpack = require('webpack');

var extractCss = new ExtractTextPlugin('main.css');

const banner = `  <!--
    
    
    <%= pkg.name %> - <%= pkg.description %>
    
    version <%= pkg.version %>
    
    with love from Moniker
    
    studiomoniker.com – @studiomoniker.com – github.com/studiomoniker
    
    
  -->`;

module.exports = {
   context: __dirname,
   entry  : ['./src/app.js', './style/main.scss'],
   output : {
      path    : __dirname + '/dist',
      filename : 'main.js'
   },
   module : {
      loaders: [
        {
           test  : /.js$/,
           loader : 'babel-loader',
           query: {
            presets: ['es2015']
           }
        },
        {
           test: /\.json$/,
           loader: 'json-loader'
        },
        {
          test: /\.scss$/,
          loader: extractCss.extract('style', 'css!postcss-loader!sass')
        },
        {
          test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
          loader: 'file-loader'
        }
      ]
   },
   postcss: function () {
      return [
        autoprefixer({
          browsers: ['last 2 versions'],
          cascade: false
        }),
        precss
      ];
   },
   plugins: [
       new webpack.DefinePlugin({
        'process.env': Object
          .keys(process.env)
          .reduce(function(o, k) {
            o[k] = JSON.stringify(process.env[k]);
            return o;
          }, {})
        }),
      extractCss,
      new CopyWebpackPlugin(
        [
          { from: 'assets' }
        ],
        {
           ignore: [
              'index.html',
              { dot: false }
           ]
        }
      ),
      new HtmlWebpackPlugin({
        template: './index.html',
        pkg: require('./package.json'),
        inject: false
      })
   ]
};
