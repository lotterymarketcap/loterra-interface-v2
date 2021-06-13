/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([["components_ConnectedButton_js"],{

/***/ "./components/ConnectedButton.js":
/*!***************************************!*\
  !*** ./components/ConnectedButton.js ***!
  \***************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ ConnectedButton; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Users_0xantman_Developer_loterra_loterra_interface_v2_react_node_modules_next_node_modules_babel_runtime_helpers_esm_objectDestructuringEmpty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/next/node_modules/@babel/runtime/helpers/esm/objectDestructuringEmpty */ \"./node_modules/next/node_modules/@babel/runtime/helpers/esm/objectDestructuringEmpty.js\");\n/* harmony import */ var _terra_money_wallet_provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @terra-money/wallet-provider */ \"./node_modules/@terra-money/wallet-provider/index.js\");\n/* harmony import */ var _terra_money_wallet_provider__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_terra_money_wallet_provider__WEBPACK_IMPORTED_MODULE_2__);\n/* module decorator */ module = __webpack_require__.hmd(module);\n\n\n\n\nvar _jsxFileName = \"/Users/0xantman/Developer/loterra/loterra-interface-v2-react/components/ConnectedButton.js\",\n    _s = $RefreshSig$();\n\n\nfunction ConnectedButton(_ref) {\n  _s();\n\n  var _this = this;\n\n  (0,_Users_0xantman_Developer_loterra_loterra_interface_v2_react_node_modules_next_node_modules_babel_runtime_helpers_esm_objectDestructuringEmpty__WEBPACK_IMPORTED_MODULE_1__.default)(_ref);\n\n  var _useWallet = (0,_terra_money_wallet_provider__WEBPACK_IMPORTED_MODULE_2__.useWallet)(),\n      status = _useWallet.status,\n      network = _useWallet.network,\n      wallets = _useWallet.wallets,\n      availableConnectTypes = _useWallet.availableConnectTypes,\n      connect = _useWallet.connect,\n      disconnect = _useWallet.disconnect;\n\n  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"section\", {\n      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"pre\", {\n        children: JSON.stringify({\n          status: status,\n          network: network,\n          wallets: wallets,\n          availableConnectTypes: availableConnectTypes\n        }, null, 2)\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 16,\n        columnNumber: 9\n      }, this)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 15,\n      columnNumber: 7\n    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"section\", {\n      style: {\n        margin: \"20px 0\"\n      },\n      children: status === _terra_money_wallet_provider__WEBPACK_IMPORTED_MODULE_2__.WalletStatus.WALLET_NOT_CONNECTED ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: availableConnectTypes.map(function (connectType) {\n          return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n            onClick: function onClick() {\n              return connect(connectType);\n            },\n            children: [\"Connect with \", connectType]\n          }, connectType, true, {\n            fileName: _jsxFileName,\n            lineNumber: 34,\n            columnNumber: 15\n          }, _this);\n        })\n      }, void 0, false) : status === _terra_money_wallet_provider__WEBPACK_IMPORTED_MODULE_2__.WalletStatus.WALLET_CONNECTED ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n        onClick: function onClick() {\n          return disconnect();\n        },\n        children: \"Disconnect\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 40,\n        columnNumber: 11\n      }, this) : null\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 30,\n      columnNumber: 7\n    }, this)]\n  }, void 0, true);\n}\n\n_s(ConnectedButton, \"tQlFYU2uGGX7sZ2/qjQBbXQyQEQ=\", false, function () {\n  return [_terra_money_wallet_provider__WEBPACK_IMPORTED_MODULE_2__.useWallet];\n});\n\n_c = ConnectedButton;\n\nvar _c;\n\n$RefreshReg$(_c, \"ConnectedButton\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9Db25uZWN0ZWRCdXR0b24uanM/ZTFkYyJdLCJuYW1lcyI6WyJDb25uZWN0ZWRCdXR0b24iLCJ1c2VXYWxsZXQiLCJzdGF0dXMiLCJuZXR3b3JrIiwid2FsbGV0cyIsImF2YWlsYWJsZUNvbm5lY3RUeXBlcyIsImNvbm5lY3QiLCJkaXNjb25uZWN0IiwiSlNPTiIsInN0cmluZ2lmeSIsIm1hcmdpbiIsIldhbGxldFN0YXR1cyIsIm1hcCIsImNvbm5lY3RUeXBlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBRWUsU0FBU0EsZUFBVCxPQUE2QjtBQUFBOztBQUFBOztBQUFBOztBQUFBLG1CQVF0Q0MsdUVBQVMsRUFSNkI7QUFBQSxNQUV4Q0MsTUFGd0MsY0FFeENBLE1BRndDO0FBQUEsTUFHeENDLE9BSHdDLGNBR3hDQSxPQUh3QztBQUFBLE1BSXhDQyxPQUp3QyxjQUl4Q0EsT0FKd0M7QUFBQSxNQUt4Q0MscUJBTHdDLGNBS3hDQSxxQkFMd0M7QUFBQSxNQU14Q0MsT0FOd0MsY0FNeENBLE9BTndDO0FBQUEsTUFPeENDLFVBUHdDLGNBT3hDQSxVQVB3Qzs7QUFVMUMsc0JBQ0U7QUFBQSw0QkFDRTtBQUFBLDZCQUNFO0FBQUEsa0JBQ0dDLElBQUksQ0FBQ0MsU0FBTCxDQUNDO0FBQ0VQLGdCQUFNLEVBQU5BLE1BREY7QUFFRUMsaUJBQU8sRUFBUEEsT0FGRjtBQUdFQyxpQkFBTyxFQUFQQSxPQUhGO0FBSUVDLCtCQUFxQixFQUFyQkE7QUFKRixTQURELEVBT0MsSUFQRCxFQVFDLENBUkQ7QUFESDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREY7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQURGLGVBZ0JFO0FBQVMsV0FBSyxFQUFFO0FBQUVLLGNBQU0sRUFBRTtBQUFWLE9BQWhCO0FBQUEsZ0JBQ0dSLE1BQU0sS0FBS1MsMkZBQVgsZ0JBQ0M7QUFBQSxrQkFDR04scUJBQXFCLENBQUNPLEdBQXRCLENBQTBCLFVBQUNDLFdBQUQ7QUFBQSw4QkFDekI7QUFBMEIsbUJBQU8sRUFBRTtBQUFBLHFCQUFNUCxPQUFPLENBQUNPLFdBQUQsQ0FBYjtBQUFBLGFBQW5DO0FBQUEsd0NBQ2dCQSxXQURoQjtBQUFBLGFBQWFBLFdBQWI7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFEeUI7QUFBQSxTQUExQjtBQURILHVCQURELEdBUUdYLE1BQU0sS0FBS1MsdUZBQVgsZ0JBQ0Y7QUFBUSxlQUFPLEVBQUU7QUFBQSxpQkFBTUosVUFBVSxFQUFoQjtBQUFBLFNBQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGNBREUsR0FFQTtBQVhOO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFoQkY7QUFBQSxrQkFERjtBQWdDRDs7R0ExQ3VCUCxlO1VBUWxCQyxtRTs7O0tBUmtCRCxlIiwiZmlsZSI6Ii4vY29tcG9uZW50cy9Db25uZWN0ZWRCdXR0b24uanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VXYWxsZXQsIFdhbGxldFN0YXR1cyB9IGZyb20gXCJAdGVycmEtbW9uZXkvd2FsbGV0LXByb3ZpZGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENvbm5lY3RlZEJ1dHRvbih7fSkge1xuICBjb25zdCB7XG4gICAgc3RhdHVzLFxuICAgIG5ldHdvcmssXG4gICAgd2FsbGV0cyxcbiAgICBhdmFpbGFibGVDb25uZWN0VHlwZXMsXG4gICAgY29ubmVjdCxcbiAgICBkaXNjb25uZWN0LFxuICB9ID0gdXNlV2FsbGV0KCk7XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPHNlY3Rpb24+XG4gICAgICAgIDxwcmU+XG4gICAgICAgICAge0pTT04uc3RyaW5naWZ5KFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdGF0dXMsXG4gICAgICAgICAgICAgIG5ldHdvcmssXG4gICAgICAgICAgICAgIHdhbGxldHMsXG4gICAgICAgICAgICAgIGF2YWlsYWJsZUNvbm5lY3RUeXBlcyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgMlxuICAgICAgICAgICl9XG4gICAgICAgIDwvcHJlPlxuICAgICAgPC9zZWN0aW9uPlxuXG4gICAgICA8c2VjdGlvbiBzdHlsZT17eyBtYXJnaW46IFwiMjBweCAwXCIgfX0+XG4gICAgICAgIHtzdGF0dXMgPT09IFdhbGxldFN0YXR1cy5XQUxMRVRfTk9UX0NPTk5FQ1RFRCA/IChcbiAgICAgICAgICA8PlxuICAgICAgICAgICAge2F2YWlsYWJsZUNvbm5lY3RUeXBlcy5tYXAoKGNvbm5lY3RUeXBlKSA9PiAoXG4gICAgICAgICAgICAgIDxidXR0b24ga2V5PXtjb25uZWN0VHlwZX0gb25DbGljaz17KCkgPT4gY29ubmVjdChjb25uZWN0VHlwZSl9PlxuICAgICAgICAgICAgICAgIENvbm5lY3Qgd2l0aCB7Y29ubmVjdFR5cGV9XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC8+XG4gICAgICAgICkgOiBzdGF0dXMgPT09IFdhbGxldFN0YXR1cy5XQUxMRVRfQ09OTkVDVEVEID8gKFxuICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gZGlzY29ubmVjdCgpfT5EaXNjb25uZWN0PC9idXR0b24+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgPC9zZWN0aW9uPlxuICAgIDwvPlxuICApO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/ConnectedButton.js\n");

/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/esm/objectDestructuringEmpty.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/esm/objectDestructuringEmpty.js ***!
  \***********************************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ _objectDestructuringEmpty; }\n/* harmony export */ });\nfunction _objectDestructuringEmpty(obj) {\n  if (obj == null) throw new TypeError(\"Cannot destructure undefined\");\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL25leHQvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL29iamVjdERlc3RydWN0dXJpbmdFbXB0eS5qcz84MTgzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBZTtBQUNmO0FBQ0EiLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvbmV4dC9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vb2JqZWN0RGVzdHJ1Y3R1cmluZ0VtcHR5LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX29iamVjdERlc3RydWN0dXJpbmdFbXB0eShvYmopIHtcbiAgaWYgKG9iaiA9PSBudWxsKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGRlc3RydWN0dXJlIHVuZGVmaW5lZFwiKTtcbn0iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/next/node_modules/@babel/runtime/helpers/esm/objectDestructuringEmpty.js\n");

/***/ }),

/***/ "?a449":
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (function() {

/* (ignored) */

/***/ }),

/***/ "?8131":
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (function() {

/* (ignored) */

/***/ }),

/***/ "?3fc0":
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/***/ (function() {

/* (ignored) */

/***/ }),

/***/ "?f9d4":
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (function() {

/* (ignored) */

/***/ }),

/***/ "?7a28":
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (function() {

/* (ignored) */

/***/ }),

/***/ "?ed1b":
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/***/ (function() {

/* (ignored) */

/***/ }),

/***/ "?d17e":
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/***/ (function() {

/* (ignored) */

/***/ })

}]);