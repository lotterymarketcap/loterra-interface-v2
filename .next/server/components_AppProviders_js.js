/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "components_AppProviders_js";
exports.ids = ["components_AppProviders_js"];
exports.modules = {

/***/ "./components/AppProviders.js":
/*!************************************!*\
  !*** ./components/AppProviders.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ AppProviders; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _terra_money_wallet_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @terra-money/wallet-provider */ \"@terra-money/wallet-provider\");\n/* harmony import */ var _terra_money_wallet_provider__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_terra_money_wallet_provider__WEBPACK_IMPORTED_MODULE_1__);\n\nvar _jsxFileName = \"/Users/0xantman/Developer/loterra/loterra-interface-v2-react/components/AppProviders.js\";\n\nconst mainnet = {\n  name: \"mainnet\",\n  chainID: \"columbus-4\",\n  lcd: \"https://lcd.terra.dev\"\n};\nconst testnet = {\n  name: \"testnet\",\n  chainID: \"tequila-0004\",\n  lcd: \"https://tequila-lcd.terra.dev\"\n};\nfunction AppProviders({\n  children\n}) {\n  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_terra_money_wallet_provider__WEBPACK_IMPORTED_MODULE_1__.WalletProvider, {\n    defaultNetwork: mainnet,\n    walletConnectChainIds: {\n      0: testnet,\n      1: mainnet\n    },\n    children: children\n  }, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 17,\n    columnNumber: 5\n  }, this);\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sb3RlcnJhLy4vY29tcG9uZW50cy9BcHBQcm92aWRlcnMuanM/MmQ4MiJdLCJuYW1lcyI6WyJtYWlubmV0IiwibmFtZSIsImNoYWluSUQiLCJsY2QiLCJ0ZXN0bmV0IiwiQXBwUHJvdmlkZXJzIiwiY2hpbGRyZW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUVBLE1BQU1BLE9BQU8sR0FBRztBQUNkQyxNQUFJLEVBQUUsU0FEUTtBQUVkQyxTQUFPLEVBQUUsWUFGSztBQUdkQyxLQUFHLEVBQUU7QUFIUyxDQUFoQjtBQU1BLE1BQU1DLE9BQU8sR0FBRztBQUNkSCxNQUFJLEVBQUUsU0FEUTtBQUVkQyxTQUFPLEVBQUUsY0FGSztBQUdkQyxLQUFHLEVBQUU7QUFIUyxDQUFoQjtBQU1lLFNBQVNFLFlBQVQsQ0FBc0I7QUFBRUM7QUFBRixDQUF0QixFQUFvQztBQUNqRCxzQkFDRSw4REFBQyx3RUFBRDtBQUNFLGtCQUFjLEVBQUVOLE9BRGxCO0FBRUUseUJBQXFCLEVBQUU7QUFDckIsU0FBR0ksT0FEa0I7QUFFckIsU0FBR0o7QUFGa0IsS0FGekI7QUFBQSxjQU9HTTtBQVBIO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFERjtBQVdEIiwiZmlsZSI6Ii4vY29tcG9uZW50cy9BcHBQcm92aWRlcnMuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBXYWxsZXRQcm92aWRlciB9IGZyb20gXCJAdGVycmEtbW9uZXkvd2FsbGV0LXByb3ZpZGVyXCI7XG5cbmNvbnN0IG1haW5uZXQgPSB7XG4gIG5hbWU6IFwibWFpbm5ldFwiLFxuICBjaGFpbklEOiBcImNvbHVtYnVzLTRcIixcbiAgbGNkOiBcImh0dHBzOi8vbGNkLnRlcnJhLmRldlwiLFxufTtcblxuY29uc3QgdGVzdG5ldCA9IHtcbiAgbmFtZTogXCJ0ZXN0bmV0XCIsXG4gIGNoYWluSUQ6IFwidGVxdWlsYS0wMDA0XCIsXG4gIGxjZDogXCJodHRwczovL3RlcXVpbGEtbGNkLnRlcnJhLmRldlwiLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQXBwUHJvdmlkZXJzKHsgY2hpbGRyZW4gfSkge1xuICByZXR1cm4gKFxuICAgIDxXYWxsZXRQcm92aWRlclxuICAgICAgZGVmYXVsdE5ldHdvcms9e21haW5uZXR9XG4gICAgICB3YWxsZXRDb25uZWN0Q2hhaW5JZHM9e3tcbiAgICAgICAgMDogdGVzdG5ldCxcbiAgICAgICAgMTogbWFpbm5ldCxcbiAgICAgIH19XG4gICAgPlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvV2FsbGV0UHJvdmlkZXI+XG4gICk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./components/AppProviders.js\n");

/***/ })

};
;