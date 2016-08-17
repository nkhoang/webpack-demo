import "bootstrap/dist/css/bootstrap.min.css";
require('bootstrap-loader');
require('styles/index');

$('#add-btn').click(() => {
    require(['scripts/load-images'], (ImageLoader) => {
        let imageLoader = new ImageLoader.default('#image-container', '#status');

        imageLoader.addImages();
    });
});

$('#reset-btn').click(()=> {
    $('#image-container').empty();
});

