const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = {
    ...defaultConfig,
    entry: {
        'blocks/hero-section/index': path.resolve(__dirname, 'src/blocks/hero-section/index.js'),
        'blocks/features-section/index': path.resolve(__dirname, 'src/blocks/features-section/index.js'),
        'blocks/about-layout-one/index': path.resolve(__dirname,'src/blocks/about-layout-one/index.js'),
        'blocks/about-layout-two/index': path.resolve(__dirname,'src/blocks/about-layout-two/index.js'), 
        'blocks/about-layout-three/index': path.resolve(__dirname,'src/blocks/about-layout-three/index.js'), 
        'blocks/goals-layout-one/index': path.resolve(__dirname,'src/blocks/goals-layout-one/index.js'), 
        'blocks/columns-block/index' : path.resolve(__dirname,'src/blocks/columns-block/index.js'),
        'blocks/footer-block/index' : path.resolve(__dirname,'src/blocks/footer-block/index.js'), 
        'blocks/ultimate-about/index' : path.resolve(__dirname,'src/blocks/ultimate-about/index.js'), 
        'blocks/vision-mission/index' : path.resolve(__dirname,'src/blocks/vision-mission/index.js'), 
        'blocks/mission-values-layout/index' : path.resolve(__dirname,'src/blocks/mission-values-layout/index.js'), 
        'blocks/therapy-hero/index' : path.resolve(__dirname,'src/blocks/therapy-hero/index.js'),     
        'blocks/flex-container/index' : path.resolve(__dirname,'src/blocks/flex-container/index.js'),   
        'blocks/dynamic-content/index' : path.resolve(__dirname,'src/blocks/dynamic-content/index.js'), 
        'blocks/dynamic-block/index' : path.resolve(__dirname,'src/blocks/dynamic-block/index.js'),
        'blocks/column-list/index' : path.resolve(__dirname,'src/blocks/column-list/index.js'),
        'index': path.resolve(__dirname, 'src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
    }
};