// -------------------------------------
// Cocoon JS Phaser utilities by
// http://www.html5gamedevs.com/topic/2312-ludei-cocoonjs-xml-bitmap-font-workaround/page-2#entry37140
// to fix the CocoonJS xml error "Error: Phaser.Loader. Invalid XML given"
// when loading a bitmapfont
// -------------------------------------
var TEST_FONT_JSON = false;

(function (cocoonjsphaser) {

    cocoonjsphaser.utils = {
        fixDOMParser: function () {
		console.log('cocoonjsphaser.utils.fixDOMParser starts..');
            window.DOMParser = DOMishParser;
		console.log('cocoonjsphaser.utils.fixDOMParser is ready..');
        }
    };

    function DOMishParser() { }
    DOMishParser.prototype.parseFromString = function (data) {
        return new DOMishObject(JSON.parse(data));
    };

    function DOMishAttributes() { }
    DOMishAttributes.prototype.getNamedItem = function (name) {
        return {
            nodeValue: this[name] || null
        };
    };

    function makeDOMishObject(data) {
        return new DOMishObject(data);
    }

    function DOMishObject(data) {
        this.attributes = this.convertContent(data);
        this.length = Object.keys(this.attributes).length;
    }
    DOMishObject.prototype.documentElement = document;
    DOMishObject.prototype.convertContent = function (obj) {
        var attributes = new DOMishAttributes(),
            prop;

        for (prop in obj) {
            if (obj[prop] !== null && typeof obj[prop] === 'object') {
                attributes[prop] = Array.isArray(obj[prop]) ?
                    obj[prop].map(makeDOMishObject) : new DOMishObject(obj[prop]);
            } else {
                attributes[prop] = obj[prop];
            }
        }

        return attributes;
    };
    DOMishObject.prototype.getElementsByTagName = function (name) {
        return this.attributes[name] ?
            Array.isArray(this.attributes[name]) ?
            this.attributes[name] : [this.attributes[name]] : [];
    };

    DOMishObject.prototype.getAttribute = function (name) {
        return this.attributes.getNamedItem(name).nodeValue;
    };

}(window.cocoonjsphaser = window.cocoonjsphaser || {}));

//if (navigator.isCocoonJS) {
if (TEST_FONT_JSON) {
	console.log('cocoonjsphaser.utils.fixDOMParser - fixDOMParser starts');
    cocoonjsphaser.utils.fixDOMParser();
}
