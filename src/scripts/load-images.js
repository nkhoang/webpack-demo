import imagesLoaded from "imagesloaded";

class ImageLoader {
    constructor(imageContainerSelector, statusSelector) {
        this.container = $(imageContainerSelector)[0];
        this.statusElem = $(statusSelector)[0];
        this.progressElem = $(statusSelector + ' progress')[0];
        this.loadedImageCount = 0;
        this.imageCount = 0;
        this.supportsProgress = this.progressElem &&
            // IE does not support progress
            this.progressElem.toString().indexOf('Unknown') === -1;
        // provide jQuery argument
        imagesLoaded.makeJQueryPlugin($);
    }

    addImages() {
        // add new images
        let fragment = this.getItemsFragment();
        this.container.insertBefore(fragment, this.container.firstChild);
        // use ImagesLoaded
        let imgLoad = imagesLoaded(this.container);
        imgLoad.on('progress', (imgload, image) => {
            this.onProgress(image);
        });
        imgLoad.on('always', () => {
            this.onAlways();
        });
        // reset progress counter
        this.imageCount = imgLoad.images.length;
        this.resetProgress();
        this.updateProgress(0);
    }

    updateProgress(value) {
        if (this.supportsProgress) {
            $(this.progressElem).attr('value', value);
        } else {
            // if you don't support progress elem
            this.setText(this.statusElem, value + ' / ' + this.imageCount);
        }
    }

    resetProgress() {
        $(this.statusElem).css('opacity', 1);

        this.loadedImageCount = 0;

        if (this.supportsProgress) {
            $(this.progressElem).attr('max', this.imageCount);
        }
    }

    // triggered after each item is loaded
    onProgress(image) {
        // change class if the image is loaded or broken
        image.img.parentNode.className = image.isLoaded ? '' : 'is-broken';
        // update progress element
        this.loadedImageCount++;
        this.updateProgress(this.loadedImageCount);
    }

    onAlways() {
        $(this.statusElem).css('opacity', 0);
    }

    getItemsFragment() {
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < 7; i++) {
            var item = this.getImageItem();
            fragment.appendChild(item);
        }
        return fragment;
    }

    getImageItem() {
        let item = document.createElement('li');
        item.className = 'is-loading';
        let img = document.createElement('img');
        let size = Math.random() * 3 + 1;
        let width = Math.random() * 110 + 100;
        width = Math.round(width * size);
        let height = Math.round(140 * size);
        let rando = Math.ceil(Math.random() * 1000);
        // 10% chance of broken image src
        // random parameter to prevent cached images
        img.src = '//lorempixel.com/' + width + '/' + height + '/' + '?' + rando;
        item.appendChild(img);
        return item;
    }


    setText(elem, value) {
        let docElem = document.documentElement;
        let textSetter = !docElem.textContent ? 'textContent' : 'innerText';

        elem[textSetter] = value;
    }
}

export default ImageLoader;