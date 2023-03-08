/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  font-family: 'Sanchez', serif;\n  margin: 0;\n  text-align: center;\n}\n\nhtml {\n  width: 100vw;\n  height: 100vh;\n  top: 0;\n  background-image: url(\"https://thumbs.dreamstime.com/b/pink-plastered-concrete-wall-texture-painted-built-structure-grungy-uneven-plaster-abstract-background-shabby-155634485.jpg\");\n}\n\n.error-page {\n  height: 100vmin;\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  background-image: url(https://images-prod.dazeddigital.com/786/azure/dazed-prod/1120/5/1125152.jpg);\n  background-size: cover;\n  align-items: flex-start;\n}\n\n.error-page > p {\n  margin-top: 5vmin;\n  font-size: xx-large;\n  color: red;\n  background: #ffffff8f;\n  width: 50%;\n  padding: 5vmin;\n  border-radius: 25px;\n}\n\n.user-instructions-page {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  top: 0;\n  left: 0;\n  background-color: rgba(0 0 0 / 40%);\n  height: 100%;\n  width: 100%;\n  z-index: 2;\n  position: fixed;\n  overflow: hidden;\n}\n\n.instructions-background {\n  height: 50vmin;\n  width: 50vmin;\n  background-color: #ffdbe9;\n  margin-top: 3vmin;\n  overflow: auto;\n  padding: 2vmin;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-evenly;\n  border-radius: 100px;\n}\n\n.instructions-username {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.instructions-password {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.login-page {\n  height: 100vh;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.login-logo {\n  object-fit: contain;\n  height: 30vh;\n  margin: 1em;\n}\n\n.login-form {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: center;\n  width: 100%;\n}\n\n.login-form > label,\n.filter-form > label,\n.date-selection > label {\n  background: #fcc3d38f;\n  padding: 0.3vmin;\n  border-radius: 5px;\n}\n\n.login-form > input {\n  margin: 1vmin;\n  margin-bottom: 2vmin;\n  width: 15vmin;\n  text-align: center;\n}\n\n@keyframes shake {\n  0% { transform: translate(1px, 1px) rotate(0deg); }\n  10% { transform: translate(-1px, -2px) rotate(-1deg); }\n  20% { transform: translate(-3px, 0px) rotate(1deg); }\n  30% { transform: translate(3px, 2px) rotate(0deg); }\n  40% { transform: translate(1px, -1px) rotate(1deg); }\n  50% { transform: translate(-1px, 2px) rotate(-1deg); }\n  60% { transform: translate(-3px, 1px) rotate(0deg); }\n  70% { transform: translate(3px, 1px) rotate(-1deg); }\n  80% { transform: translate(-1px, -1px) rotate(1deg); }\n  90% { transform: translate(1px, 2px) rotate(0deg); }\n  100% { transform: translate(1px, -2px) rotate(-1deg); }\n}\n\n.shake {\n  animation: shake 0.5s;\n}\n\n.login-error-text {\n  color: red;\n  font-size: large;\n  background: #d3d3d380;\n  padding: 0.5vmin;\n  border-radius: 20px;\n}\n\nbutton {\n  border-radius: 3px;\n  background-color: #510056;\n  color: #e3bc66;\n  width: 12vmin;\n  height: 4vmin;\n  transition: background-color 1s;\n}\n\nbutton:hover {\n  cursor: pointer;\n  background-color: #e3bc66;\n  color: #510056;\n}\n\n.logo {\n  position: fixed;\n  top: 0;\n  left: 0;\n  object-fit: contain;\n  height: 15vmin;\n  margin: 1em;\n}\n\nheader {\n  position: fixed;\n  top: 0;\n  height: 20vh;\n  width: 100vw;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  z-index: 1;\n  background-color: #510056;\n  color: #e3bc66;\n  text-shadow: 1px 1px 2px black;\n  justify-content: center;\n}\n\n.header-text {\n  width: 40%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-evenly;\n}\n\n.user-search-form {\n  display: flex;\n  flex-direction: column;\n  position: fixed;\n  top: 11.7vmin;\n  right: 1vmin;\n  align-items: center;\n}\n\n.user-search-form > \ninput, button {\n  width: 12vmin;\n  margin: 0;\n}\n\n.logout-button {\n  position: fixed;\n  top: 0;\n  right: 1vmin;\n}\n\nmain {\n  width: 100vw;\n  height: 80vh;\n  margin-top: 20vh;\n  display: flex;\n  overflow: hidden;\n}\n\n.modal-section {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  top: 0;\n  left: 0;\n  background-color: rgba(0 0 0 / 40%);\n  height: 100%;\n  width: 100%;\n  z-index: 2;\n  position: fixed;\n  overflow: hidden;\n}\n\n.modal {\n  height: 86vmin;\n  width: 80vmin;\n  background-color: #ffdbe9;\n  margin-top: 3vmin;\n  overflow: auto;\n  padding: 2vmin;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  border-radius: 150px;\n}\n\n.modal > p {\n  margin: 2vh 0 2vh 0;\n  text-align: center;\n}\n\n.modal > img {\n  width: 75%;\n  border-radius: 80px;\n}\n\n.modal > h3 {\n  text-align: center;\n  height: auto;\n  margin-bottom: 2vh;\n  font-size: x-large;\n}\n\n.modal-room-info {\n  display: flex;\n  margin-top: 2vh;\n  text-transform: capitalize;\n  width: 100%;\n  justify-content: space-evenly;\n}\n\n.room-info-icons {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  width: auto;\n}\n\n.room-info-icons > p {\n  margin-left: .8vmin;\n}\n\nh2, \nh1 {\n  color: #e3bc66;\n  text-shadow: 3px 2px 2px black;\n  text-align: center;\n}\n\n.left-side-create, \n.right-side-booked {\n  width: 50vw;\n  height: 80vh;\n  margin: 0;\n  padding: 0;\n  z-index: 1;\n}\n\n.right-side-booked {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-evenly;\n}\n\n.date-selection {\n  height: 25%;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\n.date-selection > label, \ninput, \nbutton {\n  margin: 1vmin;\n}\n\n.date-selection > label {\n  font-size: larger;\n}\n\n.room-options {\n  height: 70%;\n  width: 100%;\n}\n\n.filter-form {\n  margin: 0;\n  height: 20%;\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n}\n\n.filters {\n  cursor: pointer;\n}\n\n.sorry-message {\n  text-align: center;\n  margin-top: 20vmin;\n}\n\n.reservation-date {\n  cursor: pointer;\n}\n\n.filter-form > label, \nselect {\n  margin: 1vmin;\n}\n\n.mini-room-cards {\n  height: 81%;\n  width: auto;\n  margin: 0;\n  margin-left: 1vmin;\n  overflow: auto;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: center;\n  border: 8px ridge #e3bc66;\n  background-color:#fcc3d3;\n  box-shadow: 3px 2px 5px rgb(0 0 0);\n}\n\n.mini-room {\n  display: flex;\n  flex-direction: row;\n  width: 80%;\n  justify-content: space-between;\n  align-items: center;\n  margin: 1vh;\n  border-radius: 4px;\n  background-color: #ffffff2e;\n  cursor: pointer;\n}\n\n.mini-room-left, \n.mini-room-right {\n  display: flex;\n  flex-direction: column;\n  width: 50%;\n  height: 100%;\n}\n\n.mini-room-right > h3 {\n  width: 100%;\n  height: 100%;\n}\n\n.mini-room-left > p, \nh3 {\n  text-transform: capitalize;\n  height: 50%;\n  padding: 1vmin;\n}\n\n.user-spent-header {\n  font-size: large;\n  background: #ffdbe985;\n  border-radius: 6px;\n  text-shadow: none;\n  color: black;\n  padding: 0.7vmin;\n}\n\n.upcoming-reservations, \n.past-reservations {\n  height: 38%;\n  width: 94%;\n  margin: 0;\n  margin-left: .5vmin;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: center;\n  border: 8px ridge #e3bc66;\n  background-color:#fcc3d3;\n  box-shadow: 3px 2px 5px rgb(0 0 0);\n}\n\n.past-minis, \n.upcoming-minis {\n  width: 100%;\n  height: 100%;\n  padding: 0;\n  overflow: auto;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: center;\n}\n\n.mini-room-booked {\n  display: flex;\n  width: 80%;\n  margin: 1vmin;\n  justify-content: space-between;\n  border-radius: 4px;\n  background-color: #ffffff2e;\n}\n\n.delete-reservation {\n  height: auto;\n  margin-right: 28%;\n}\n\n.mini-room-booked > h3 {\n  width: 50%;\n  height: 100%;\n  padding: 1vmin;\n}\n\n.upcoming-minis > .mini-room-booked > h3 {\n  width: 50%;\n  height: 100%;\n  padding: 1vmin;\n  cursor: pointer;\n}\n\n.hidden {\n  display: none;\n}\n\n@media only screen and (max-device-width: 600px) {\n\n  .instructions-background {\n    height: 93vmin;\n    width: 93vmin;\n    border-radius: 10px;\n    overflow: hidden;\n  }\n\n  .login-page {\n    justify-content: center;\n  }\n\n  .login-logo {\n    height: 20vh;\n  }\n\n  button {\n    width: 40vmin;\n    height: 20vmin;\n  }\n\n\n  button:hover {\n    background-color: #e3bc66;\n    color: #510056;\n  }\n\n  .login-form > input {\n    width: 40vmin;\n    height: 7vmin;\n  }\n\n  header {\n    z-index: 2;\n    height: 40vmin;\n  }\n\n  .header-text {\n    width: 100%;\n    font-size: small;\n    display: flex;\n    justify-content: center;\n  }\n\n  .logo {\n    position: relative;\n    height: 15vmin;\n    margin: 2vmin;\n  }\n\n  .logout-button,\n  .user-search-form > button {\n    width: 20vmin;\n    height: 10vmin;\n  }\n\n  .user-search-form {\n    display: flex;\n    flex-direction: column;\n    position: fixed;\n    top: 1vmin;\n    left: 1vmin;\n    align-items: flex-start;\n    width: 26vmin;\n  }\n\n  .user-search-form > input {\n    width: 22vmin;\n  }\n\n  main {\n    z-index: 1;\n    width: 100vw;\n    height: 100vh;\n    margin-top: 22vh;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    overflow: auto;\n  }\n\n  .left-side-create,\n  .right-side-booked {\n    width: 100vmin;\n  }\n\n  .right-side-booked {\n    margin-top: 20vmin;\n  }\n\n  .date-selection {\n    height: auto;\n  }\n\n  .date-selection > button {\n    height: 10vmin;\n  }\n\n  .mini-room-cards {\n    margin-left: 0;\n  }\n\n  .mini-room,\n  .mini-room-booked  {\n    width: 95%;\n  }\n\n  .upcoming-reservations, \n  .past-reservations {\n    width: 97vmin;\n  }\n\n  .modal {\n    border-radius: 10px;\n    height: auto;\n  }\n\n  .modal > img {\n    width: 85%;\n    border-radius: 10px;\n  }\n\n\n  .hidden {\n    display: none;\n  }\n}\n", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"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","sourcesContent":["* {\n  font-family: 'Sanchez', serif;\n  margin: 0;\n  text-align: center;\n}\n\nhtml {\n  width: 100vw;\n  height: 100vh;\n  top: 0;\n  background-image: url(\"https://thumbs.dreamstime.com/b/pink-plastered-concrete-wall-texture-painted-built-structure-grungy-uneven-plaster-abstract-background-shabby-155634485.jpg\");\n}\n\n.error-page {\n  height: 100vmin;\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  background-image: url(https://images-prod.dazeddigital.com/786/azure/dazed-prod/1120/5/1125152.jpg);\n  background-size: cover;\n  align-items: flex-start;\n}\n\n.error-page > p {\n  margin-top: 5vmin;\n  font-size: xx-large;\n  color: red;\n  background: #ffffff8f;\n  width: 50%;\n  padding: 5vmin;\n  border-radius: 25px;\n}\n\n.user-instructions-page {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  top: 0;\n  left: 0;\n  background-color: rgba(0 0 0 / 40%);\n  height: 100%;\n  width: 100%;\n  z-index: 2;\n  position: fixed;\n  overflow: hidden;\n}\n\n.instructions-background {\n  height: 50vmin;\n  width: 50vmin;\n  background-color: #ffdbe9;\n  margin-top: 3vmin;\n  overflow: auto;\n  padding: 2vmin;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-evenly;\n  border-radius: 100px;\n}\n\n.instructions-username {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.instructions-password {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.login-page {\n  height: 100vh;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.login-logo {\n  object-fit: contain;\n  height: 30vh;\n  margin: 1em;\n}\n\n.login-form {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: center;\n  width: 100%;\n}\n\n.login-form > label,\n.filter-form > label,\n.date-selection > label {\n  background: #fcc3d38f;\n  padding: 0.3vmin;\n  border-radius: 5px;\n}\n\n.login-form > input {\n  margin: 1vmin;\n  margin-bottom: 2vmin;\n  width: 15vmin;\n  text-align: center;\n}\n\n@keyframes shake {\n  0% { transform: translate(1px, 1px) rotate(0deg); }\n  10% { transform: translate(-1px, -2px) rotate(-1deg); }\n  20% { transform: translate(-3px, 0px) rotate(1deg); }\n  30% { transform: translate(3px, 2px) rotate(0deg); }\n  40% { transform: translate(1px, -1px) rotate(1deg); }\n  50% { transform: translate(-1px, 2px) rotate(-1deg); }\n  60% { transform: translate(-3px, 1px) rotate(0deg); }\n  70% { transform: translate(3px, 1px) rotate(-1deg); }\n  80% { transform: translate(-1px, -1px) rotate(1deg); }\n  90% { transform: translate(1px, 2px) rotate(0deg); }\n  100% { transform: translate(1px, -2px) rotate(-1deg); }\n}\n\n.shake {\n  animation: shake 0.5s;\n}\n\n.login-error-text {\n  color: red;\n  font-size: large;\n  background: #d3d3d380;\n  padding: 0.5vmin;\n  border-radius: 20px;\n}\n\nbutton {\n  border-radius: 3px;\n  background-color: #510056;\n  color: #e3bc66;\n  width: 12vmin;\n  height: 4vmin;\n  transition: background-color 1s;\n}\n\nbutton:hover {\n  cursor: pointer;\n  background-color: #e3bc66;\n  color: #510056;\n}\n\n.logo {\n  position: fixed;\n  top: 0;\n  left: 0;\n  object-fit: contain;\n  height: 15vmin;\n  margin: 1em;\n}\n\nheader {\n  position: fixed;\n  top: 0;\n  height: 20vh;\n  width: 100vw;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  z-index: 1;\n  background-color: #510056;\n  color: #e3bc66;\n  text-shadow: 1px 1px 2px black;\n  justify-content: center;\n}\n\n.header-text {\n  width: 40%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-evenly;\n}\n\n.user-search-form {\n  display: flex;\n  flex-direction: column;\n  position: fixed;\n  top: 11.7vmin;\n  right: 1vmin;\n  align-items: center;\n}\n\n.user-search-form > \ninput, button {\n  width: 12vmin;\n  margin: 0;\n}\n\n.logout-button {\n  position: fixed;\n  top: 0;\n  right: 1vmin;\n}\n\nmain {\n  width: 100vw;\n  height: 80vh;\n  margin-top: 20vh;\n  display: flex;\n  overflow: hidden;\n}\n\n.modal-section {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  top: 0;\n  left: 0;\n  background-color: rgba(0 0 0 / 40%);\n  height: 100%;\n  width: 100%;\n  z-index: 2;\n  position: fixed;\n  overflow: hidden;\n}\n\n.modal {\n  height: 86vmin;\n  width: 80vmin;\n  background-color: #ffdbe9;\n  margin-top: 3vmin;\n  overflow: auto;\n  padding: 2vmin;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  border-radius: 150px;\n}\n\n.modal > p {\n  margin: 2vh 0 2vh 0;\n  text-align: center;\n}\n\n.modal > img {\n  width: 75%;\n  border-radius: 80px;\n}\n\n.modal > h3 {\n  text-align: center;\n  height: auto;\n  margin-bottom: 2vh;\n  font-size: x-large;\n}\n\n.modal-room-info {\n  display: flex;\n  margin-top: 2vh;\n  text-transform: capitalize;\n  width: 100%;\n  justify-content: space-evenly;\n}\n\n.room-info-icons {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  width: auto;\n}\n\n.room-info-icons > p {\n  margin-left: .8vmin;\n}\n\nh2, \nh1 {\n  color: #e3bc66;\n  text-shadow: 3px 2px 2px black;\n  text-align: center;\n}\n\n.left-side-create, \n.right-side-booked {\n  width: 50vw;\n  height: 80vh;\n  margin: 0;\n  padding: 0;\n  z-index: 1;\n}\n\n.right-side-booked {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-evenly;\n}\n\n.date-selection {\n  height: 25%;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\n.date-selection > label, \ninput, \nbutton {\n  margin: 1vmin;\n}\n\n.date-selection > label {\n  font-size: larger;\n}\n\n.room-options {\n  height: 70%;\n  width: 100%;\n}\n\n.filter-form {\n  margin: 0;\n  height: 20%;\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n}\n\n.filters {\n  cursor: pointer;\n}\n\n.sorry-message {\n  text-align: center;\n  margin-top: 20vmin;\n}\n\n.reservation-date {\n  cursor: pointer;\n}\n\n.filter-form > label, \nselect {\n  margin: 1vmin;\n}\n\n.mini-room-cards {\n  height: 81%;\n  width: auto;\n  margin: 0;\n  margin-left: 1vmin;\n  overflow: auto;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: center;\n  border: 8px ridge #e3bc66;\n  background-color:#fcc3d3;\n  box-shadow: 3px 2px 5px rgb(0 0 0);\n}\n\n.mini-room {\n  display: flex;\n  flex-direction: row;\n  width: 80%;\n  justify-content: space-between;\n  align-items: center;\n  margin: 1vh;\n  border-radius: 4px;\n  background-color: #ffffff2e;\n  cursor: pointer;\n}\n\n.mini-room-left, \n.mini-room-right {\n  display: flex;\n  flex-direction: column;\n  width: 50%;\n  height: 100%;\n}\n\n.mini-room-right > h3 {\n  width: 100%;\n  height: 100%;\n}\n\n.mini-room-left > p, \nh3 {\n  text-transform: capitalize;\n  height: 50%;\n  padding: 1vmin;\n}\n\n.user-spent-header {\n  font-size: large;\n  background: #ffdbe985;\n  border-radius: 6px;\n  text-shadow: none;\n  color: black;\n  padding: 0.7vmin;\n}\n\n.upcoming-reservations, \n.past-reservations {\n  height: 38%;\n  width: 94%;\n  margin: 0;\n  margin-left: .5vmin;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: center;\n  border: 8px ridge #e3bc66;\n  background-color:#fcc3d3;\n  box-shadow: 3px 2px 5px rgb(0 0 0);\n}\n\n.past-minis, \n.upcoming-minis {\n  width: 100%;\n  height: 100%;\n  padding: 0;\n  overflow: auto;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: center;\n}\n\n.mini-room-booked {\n  display: flex;\n  width: 80%;\n  margin: 1vmin;\n  justify-content: space-between;\n  border-radius: 4px;\n  background-color: #ffffff2e;\n}\n\n.delete-reservation {\n  height: auto;\n  margin-right: 28%;\n}\n\n.mini-room-booked > h3 {\n  width: 50%;\n  height: 100%;\n  padding: 1vmin;\n}\n\n.upcoming-minis > .mini-room-booked > h3 {\n  width: 50%;\n  height: 100%;\n  padding: 1vmin;\n  cursor: pointer;\n}\n\n.hidden {\n  display: none;\n}\n\n@media only screen and (max-device-width: 600px) {\n\n  .instructions-background {\n    height: 93vmin;\n    width: 93vmin;\n    border-radius: 10px;\n    overflow: hidden;\n  }\n\n  .login-page {\n    justify-content: center;\n  }\n\n  .login-logo {\n    height: 20vh;\n  }\n\n  button {\n    width: 40vmin;\n    height: 20vmin;\n  }\n\n\n  button:hover {\n    background-color: #e3bc66;\n    color: #510056;\n  }\n\n  .login-form > input {\n    width: 40vmin;\n    height: 7vmin;\n  }\n\n  header {\n    z-index: 2;\n    height: 40vmin;\n  }\n\n  .header-text {\n    width: 100%;\n    font-size: small;\n    display: flex;\n    justify-content: center;\n  }\n\n  .logo {\n    position: relative;\n    height: 15vmin;\n    margin: 2vmin;\n  }\n\n  .logout-button,\n  .user-search-form > button {\n    width: 20vmin;\n    height: 10vmin;\n  }\n\n  .user-search-form {\n    display: flex;\n    flex-direction: column;\n    position: fixed;\n    top: 1vmin;\n    left: 1vmin;\n    align-items: flex-start;\n    width: 26vmin;\n  }\n\n  .user-search-form > input {\n    width: 22vmin;\n  }\n\n  main {\n    z-index: 1;\n    width: 100vw;\n    height: 100vh;\n    margin-top: 22vh;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    overflow: auto;\n  }\n\n  .left-side-create,\n  .right-side-booked {\n    width: 100vmin;\n  }\n\n  .right-side-booked {\n    margin-top: 20vmin;\n  }\n\n  .date-selection {\n    height: auto;\n  }\n\n  .date-selection > button {\n    height: 10vmin;\n  }\n\n  .mini-room-cards {\n    margin-left: 0;\n  }\n\n  .mini-room,\n  .mini-room-booked  {\n    width: 95%;\n  }\n\n  .upcoming-reservations, \n  .past-reservations {\n    width: 97vmin;\n  }\n\n  .modal {\n    border-radius: 10px;\n    height: auto;\n  }\n\n  .modal > img {\n    width: 85%;\n    border-radius: 10px;\n  }\n\n\n  .hidden {\n    display: none;\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/hotel-logo.png");

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/single.png");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/suite.png");

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/junior-suite.png");

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/residential-suite.png");

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class User {
  constructor(userData) {
    this.id = userData.id;
    this.name = userData.name;
    this.userName = `customer${userData.id}`;
    this.password = 'overlook2021';
    this.bookings = [];
    this.totalSpent = 0;
    this.totalRewards = 0;
  }

  getBookings(allBookingData) {
    return this.bookings = allBookingData.filter(booking => booking.userID === this.id);
  }

  calculateTotalSpent(allRooms) {
    this.totalSpent = this.bookings.reduce((acc, booking) => {
      acc += allRooms.find(room => room.number === booking.roomNumber).costPerNight
      return acc;
    }, 0);
    
    this.calculateRewards();

    return Math.round(this.totalSpent);
  }

  calculateRewards() {
    this.totalRewards = Math.floor(this.totalSpent * .05);
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (User);

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Booking {
  constructor(bookingData) {
    this.id = bookingData.id;
    this.userID = bookingData.userID;
    this.date = bookingData.date;
    this.roomNumber = bookingData.roomNumber;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Booking);

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function apiRequest(request, path, userID, date, roomNumber) {
  return fetch(`https://overlook-api-jfogiato.vercel.app/api/v1/${path}`, {
    method: request,
    body: userID ? JSON.stringify({ "userID": userID, "date": date, "roomNumber": roomNumber }) : null,
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
    .catch(err => console.log(err));
}

const getAllData = () => {
  return Promise.all([
    apiRequest('GET', 'customers'),
    apiRequest('GET', 'rooms'),
    apiRequest('GET', 'bookings')
  ]);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ apiRequest, getAllData });

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Booking__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _Room__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);
/* harmony import */ var _User__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);




class BookingRepository {
  constructor(bookings, rooms, users) {
    this.bookings = bookings.map(booking => new _Booking__WEBPACK_IMPORTED_MODULE_0__.default(booking));
    this.rooms = rooms.map(room => new _Room__WEBPACK_IMPORTED_MODULE_1__.default(room));
    this.users = users.map(user => new _User__WEBPACK_IMPORTED_MODULE_2__.default(user));
    this.availableRooms = [];
  }

  getAvailableRooms(date) {
    let unavailableRooms = this.bookings.reduce((acc, booking) => {
      if (booking.date === date) {
        acc.push(booking.roomNumber);
      }
      return acc;
    }, []);

    this.availableRooms = this.rooms.reduce((acc, room) => {
        if (!unavailableRooms.includes(room.number)) {
          acc.push(room);
        }
      return acc;
    }, []);

    return this.availableRooms;
  }

  getTotalBookedDollars(date) {
    return Math.round(this.bookings.reduce((acc, booking) => {
      if(booking.date === date) {
        this.rooms.forEach(room => {
          if (room.number === booking.roomNumber) {
            acc += room.costPerNight;
          }
        });
      }
      return acc;
    }, 0));
  }

  getUserInfo(name) {
    return this.users.find(user => user.name === name);
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BookingRepository);

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Room {
  constructor(roomData) {
    this.number = roomData.number;
    this.roomType = roomData.roomType;
    this.bidet = roomData.bidet;
    this.bedSize = roomData.bedSize;
    this.numBeds = roomData.numBeds;
    this.costPerNight = roomData.costPerNight;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Room);

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _images_hotel_logo_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _images_single_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _images_suite_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var _images_junior_suite_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _images_residential_suite_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(10);
/* harmony import */ var _classes_User__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(11);
/* harmony import */ var _classes_Booking__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(12);
/* harmony import */ var _api_calls__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(13);
/* harmony import */ var _classes_BookingRepository__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(14);
// IMPORTS 📥 -----------------------------------------------











// DOM VARIABLES - ELEMENTS 🖥️ 🌱 -----------------------------------------------
const instructionsPage = document.getElementById("userInstructionsPage");
const errorPage = document.getElementById("errorPage");
const loginPage = document.getElementById("loginPage");
const loginErrorText = document.getElementById("loginErrorText");
const header = document.querySelector("header");
const userNameDisplay = document.getElementById("userNameDisplay");
const subHeader = document.getElementById("subHeader");
const userSpentHeader = document.getElementById("userSpentHeader");
const main = document.querySelector("main");
const modalSection = document.getElementById("modalSection");
const miniRoomCards = document.getElementById("miniRoomCards");
const upcomingMinis = document.getElementById("upcomingMinis");
const pastMinis = document.getElementById("pastMinis");

// DOM VARIABLES - BUTTONS AND INPUTS 🔠 🔢 ----------------------------------------
const instructionsButton = document.getElementById("instructionsButton");
const loginForm = document.getElementById("loginForm");
const userName = document.getElementById("userName");
const password = document.getElementById("password");
const logoutButton = document.getElementById("logoutButton");
const userSearchForm = document.getElementById("userSearchForm");
const userSearchValue = document.getElementById("userSearchValue");
const searchButton = document.getElementById("searchButton");
const reservationDate = document.getElementById("reservationDate");
const filterForm = document.getElementById("filterForm");
const filter = document.getElementById("filters");

// GLOBAL VARIABLES 🌍 -----------------------------------------------
let currentUser, bookingRepo;
const roomDescriptions = {
  "residential suite": ["Very posh suite with fancy stuff.", "./images/residential-suite.png"],
  "suite": ["Slightly less posh with less fancy stuff.", "./images/suite.png"],
  "junior suite": ["Like the regular suite, but more junior.", "./images/junior-suite.png"],
  "single room": ["You're broke and single too, huh?", "./images/single.png"]
};

// EVENT LISTENERS 👂 -----------------------------------------------
window.addEventListener("load", () => {
  _api_calls__WEBPACK_IMPORTED_MODULE_8__.default.getAllData()
    .then(data => {
      bookingRepo = new _classes_BookingRepository__WEBPACK_IMPORTED_MODULE_9__.default(data[2].bookings, data[1].rooms, data[0].customers);
    });
});

instructionsButton.addEventListener("click", () => {
  hide(instructionsPage);
});

loginForm.addEventListener("submit", e => {
  e.preventDefault();

  let userNameAttempt = userName.value;
  let passwordAttempt = password.value;
  let userNameString = userNameAttempt.split(/[0-9]/)[0];
  let userNumber = parseInt(userNameAttempt.match(/\d+/g));
  let isUser = (userNameString === 'customer' || userNameString === 'manager');
  let isValidPassword = passwordAttempt === 'overlook2021';
  let isManager = userName.value === 'manager';
  let isValidUserNumber = isManager ? true : (userNumber >= 1 && userNumber <= 50);
  let isValidUser = (userNameAttempt && isUser && isValidPassword && isValidUserNumber);

  if (!isValidPassword) {
    unsuccessfulLogin("password");
  } else if (!isValidUser) {
    unsuccessfulLogin("username");
  } else if (isValidUser && isManager) {
    updateSpentRewardsHeader(userNameAttempt);
    updateuserNameDisplay({name: 'Manager'});
    show(userSearchForm);
    successfulLogin();
  } else if (isValidUser && isValidUserNumber) {
    _api_calls__WEBPACK_IMPORTED_MODULE_8__.default.apiRequest("GET", `customers/${userNumber}`)
      .then(data => {
        currentUser = new _classes_User__WEBPACK_IMPORTED_MODULE_6__.default(data);
        currentUser.getBookings(bookingRepo.bookings);
        currentUser.calculateTotalSpent(bookingRepo.rooms);
        updateSpentRewardsHeader(currentUser);
        updateuserNameDisplay(currentUser);
        generateReservations(currentUser.bookings);
        successfulLogin();
      })
      .catch( () => showUserFetchError());
  } 
});

searchButton.addEventListener("click", e => {
  e.preventDefault();
  if (reservationDate.value) {
    let availableRooms = bookingRepo.getAvailableRooms(convertDateDashes(reservationDate.value));
    generateAvailableRooms(availableRooms);
    show(filterForm);
  } else {
    showUserSearchError();
  }
});

logoutButton.addEventListener("click", logout);

filter.addEventListener("change", e => {
  e.preventDefault();
  filterAvailableRooms(filter.value, bookingRepo.availableRooms);
});

miniRoomCards.addEventListener("click", e => {
  if (e.target.id !== "miniRoomCards") {
    triggerModal(e);
  }
});

miniRoomCards.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    triggerModal(e);
  }
});

modalSection.addEventListener("click", e => {
  e.target.id === "modalSection" ? hide(modalSection) : null;
});

userSearchForm.addEventListener("submit", e => {
  e.preventDefault();
  currentUser = bookingRepo.getUserInfo(userSearchValue.value);
  let userBookings = currentUser.getBookings(bookingRepo.bookings);
  generateReservations(userBookings);
  currentUser.calculateTotalSpent(bookingRepo.rooms);
  updateUserSpentHeader(currentUser);
  show(userSpentHeader);
});

upcomingMinis.addEventListener('click', e => {
  if (e.target.id !== 'upcomingMinis') {
    let currentMiniCard = e.target.parentNode;
    let deleteButton = currentMiniCard.children[1]
    hide(currentMiniCard.children[0]);
    show(currentMiniCard.children[1]);
    deleteButton.addEventListener('click', () => {
      deleteBooking(currentMiniCard.id);
    });
  }
});

// FUNCTIONS ⚙️ -----------------------------------------------
function bookRoom(room, user) {
  let date = convertDateDashes(reservationDate.value);
  _api_calls__WEBPACK_IMPORTED_MODULE_8__.default.apiRequest("POST", "bookings", user.id, date, room.number)
    .then(() => {
      _api_calls__WEBPACK_IMPORTED_MODULE_8__.default.apiRequest("GET", "bookings")
        .then(response => {
          bookingRepo.bookings = response.bookings.map(booking => new _classes_Booking__WEBPACK_IMPORTED_MODULE_7__.default(booking));
          currentUser.getBookings(bookingRepo.bookings);
          currentUser.calculateTotalSpent(bookingRepo.rooms);
          userNameDisplay.innerText === "Manager"
            ? updateSpentRewardsHeader("manager")
            : updateSpentRewardsHeader(currentUser);
          generateReservations(currentUser.bookings);
          hide(modalSection);
          generateAvailableRooms(bookingRepo.getAvailableRooms(convertDateDashes(reservationDate.value)));
        })
        .catch( () => showUserFetchError());
    })
    .catch( () => showUserFetchError());
}

function deleteBooking(id) {
  _api_calls__WEBPACK_IMPORTED_MODULE_8__.default.apiRequest("DELETE", `bookings/${id}`)
    .then(() => {
      _api_calls__WEBPACK_IMPORTED_MODULE_8__.default.apiRequest("GET", "bookings")
        .then(data => {
          bookingRepo.bookings = data.bookings.map(booking => new _classes_Booking__WEBPACK_IMPORTED_MODULE_7__.default(booking));
          currentUser.getBookings(bookingRepo.bookings);
          currentUser.calculateTotalSpent(bookingRepo.rooms);
          userNameDisplay.innerText === "Manager"
            ? updateSpentRewardsHeader("manager")
            : updateSpentRewardsHeader(currentUser);
          generateReservations(currentUser.bookings);
        })
        .catch( () => showUserFetchError());
    })
    .catch( () => showUserFetchError());
}

function generateModal(roomList, roomNumber) {
  let room = roomList.find(room => room.number === parseInt(roomNumber));
  let multiplier = room.bedSize === "twin" ? 1 : 2;
  let bidet = room.bidet ? "Bidet" : "";
  modalSection.innerHTML = "";
  modalSection.innerHTML = `
    <section class="modal" id="modal">
      <h3 tabindex="0">${room.roomType}</h3>
      <img src=${roomDescriptions[room.roomType][1]} alt="Hotel Room" tabindex="0">
      <div class="modal-room-info" id="modalRoomInfo">
        <div class="room-info-icons">
          <span class="material-symbols-outlined">person</span>
          <p tabindex="0">${room.numBeds * multiplier}</p>
        </div>
        <div class="room-info-icons">
          <span class="material-symbols-outlined">bed</span>
          <p tabindex="0">${room.numBeds} ${room.bedSize}</p>
        </div>
      </div>
      <p tabindex="0">${roomDescriptions[room.roomType][0]}</p>
      <button id="bookButton">Book it.</button>
    </section>
  `;
  if (bidet) {
    document.getElementById("modalRoomInfo").innerHTML += `
    <div class="room-info-icons">
      <span class="material-symbols-outlined">sprinkler</span>
      <p tabindex="0">Bidet</p>
    </div>
    `;
  }
  let bookButton = document.getElementById("bookButton");
  setTimeout(() => bookButton.focus());
  bookButton.addEventListener("click", () => {
    bookRoom(room, currentUser);
  });
}

function triggerModal(e) {
  let roomNumber = e.target.parentNode.parentNode.id;
  generateModal(bookingRepo.availableRooms, roomNumber);
  show(modalSection);
}

function generateAvailableRooms(rooms) {
  miniRoomCards.innerHTML = "";
  if (rooms.length) {
    rooms.forEach(room => {
      let bed = room.numBeds > 1 ? "beds" : "bed";
      miniRoomCards.innerHTML += `
      <div class="mini-room" id="${room.number}">
        <div class="mini-room-left">
          <h3 tabindex="0">${room.roomType}</h3>
          <p tabindex="0">${room.numBeds} ${room.bedSize} ${bed}</p>
        </div>
        <div class="mini-room-right">
          <h3 tabindex="0">$${room.costPerNight}/night</h3>
        </div>
      </div>
      `;
    })
  } else {
    miniRoomCards.innerHTML = `<div class="sorry-message" tabindex="0">Hmpf. It appears that we do not have a room that matches your search. Please try a different search criteria.</div>`;
  }
}

function generateReservations(bookings) {
  let today = Date.now() - 86400000;
  let futureReservations = bookings.filter(booking => {
    return Date.parse(booking.date) > today;
  }).sort((a, b) => new Date(b.date) - new Date(a.date));
  let pastReservations = bookings.filter(booking => {
    return Date.parse(booking.date) < today;
  }).sort((a, b) => new Date(b.date) - new Date(a.date));

  upcomingMinis.innerHTML = "";
  futureReservations.forEach(reservation => {
    upcomingMinis.innerHTML += `
    <div class="mini-room-booked" id="${reservation.id}">
      <h3 tabindex="0">Room ${reservation.roomNumber}</h3>
      <button class="delete-reservation hidden"id="deleteReservation">Delete.</button>
      <h3 tabindex="0">${reservation.date}</h3>
    </div>
    `;
  });
  pastMinis.innerHTML = "";
  pastReservations.forEach(reservation => {
    pastMinis.innerHTML += `
    <div class="mini-room-booked" id="${reservation.id}">
      <h3 tabindex="0">Room ${reservation.roomNumber}</h3>
      <h3 tabindex="0">${reservation.date}</h3>
    </div>
    `;
  });
}

function filterAvailableRooms(type, rooms) {
  let filteredRooms = rooms.filter(room => room.roomType === type.toLowerCase());
  generateAvailableRooms(filteredRooms);
}

function updateuserNameDisplay(user) {
  userNameDisplay.innerText = user.name;
}

function updateUserSpentHeader(user) {
  userSpentHeader.innerText = `${user.name} has spent $${convertSpent(user.totalSpent)} at the Grand Budapest Hotel.`;
}

function updateSpentRewardsHeader(user) {
  if (user === "manager") {
    let today = convertDateDashes(new Date(Date.now()).toISOString().split("T")[0]);
    let totalBookedToday = bookingRepo.getTotalBookedDollars(today);
    let percentRoomsBooked = ((1 - ((bookingRepo.getAvailableRooms(today).length) / bookingRepo.rooms.length)));
    subHeader.innerText = `Today's revenue is $${totalBookedToday} and we are ${Math.round(percentRoomsBooked * 100)}% full.`;
  } else {
    let totalSpent = convertSpent(user.totalSpent);
    let totalRewards = user.totalRewards;
    subHeader.innerText = `You have spent $${totalSpent} and accrued ${totalRewards} reward points.`;
  }
}

function successfulLogin() {
  hide(loginPage);
  show(header);
  show(main);
  setFormDate();
}

function setFormDate() {
  let today = new Date(Date.now()).toISOString().split("T")[0];
  reservationDate.setAttribute("min", today);
}

function logout() {
  show(loginPage);
  hide(header);
  hide(main);
  hide(userSearchForm);
  hide(userSpentHeader);
  hide(filterForm)
  upcomingMinis.innerHTML = "";
  pastMinis.innerHTML = "";
  miniRoomCards.innerHTML = "";
}

function unsuccessfulLogin(reason) {
  if (reason === "password") {
    loginErrorText.innerText = "Please enter a valid password";
  } else if (reason === "username") {
    loginErrorText.innerText = "Please enter a valid username";
  }
  show(loginErrorText);
  loginErrorText.classList.add("shake");
  setTimeout(() => {
    hide(loginErrorText);
    resetLoginForm();
    loginErrorText.innerText = "";
  }, 1000);
}

function convertDateDashes(date) {
  return date.replace(/-/g, "/");
}

function convertSpent(stringNum) {
  return new Intl.NumberFormat().format(stringNum);
}

function showUserFetchError() {
  hide(loginPage);
  show(errorPage);
}

function showUserSearchError() {
  miniRoomCards.innerHTML = `<div class="sorry-message" tabindex="0">Please select a date to show available rooms.</div>`;
  setTimeout(() => miniRoomCards.innerHTML = "", 1500);
}

function resetLoginForm() {
  userName.value = "";
  password.value = "";
}

function hide(element) {
  element.classList.add("hidden");
}

function show(element) {
  element.classList.remove("hidden");
}
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map