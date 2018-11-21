const mix = require('laravel-mix');

mix.setPublicPath('./')
   .js('src/index.js', 'dist/VRouteHelper.js');
