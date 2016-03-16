import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';
import precss from 'precss';
import webpack from 'webpack';

const extractCss = new ExtractTextPlugin('main.css');

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
