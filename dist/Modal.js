"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
require("./Modal.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var Modal = function Modal(_ref) {
  var _ref$style = _ref.style,
    style = _ref$style === void 0 ? {} : _ref$style,
    isOpen = _ref.isOpen,
    onClose = _ref.onClose,
    children = _ref.children,
    _ref$clickOutsideClos = _ref.clickOutsideClose,
    clickOutsideClose = _ref$clickOutsideClos === void 0 ? true : _ref$clickOutsideClos,
    _ref$closeExisting = _ref.closeExisting,
    closeExisting = _ref$closeExisting === void 0 ? true : _ref$closeExisting,
    _ref$disableEscClose = _ref.disableEscClose,
    disableEscClose = _ref$disableEscClose === void 0 ? false : _ref$disableEscClose,
    _ref$closeTriggers = _ref.closeTriggers,
    closeTriggers = _ref$closeTriggers === void 0 ? [] : _ref$closeTriggers,
    _ref$content = _ref.content,
    content = _ref$content === void 0 ? {
      title: "Default Title",
      message: "Default message content.",
      buttonText: "Close"
    } : _ref$content,
    _ref$customClass = _ref.customClass,
    customClass = _ref$customClass === void 0 ? "" : _ref$customClass;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isMounted = _useState2[0],
    setIsMounted = _useState2[1];
  var overlayRef = (0, _react.useRef)(null); // Create a ref for the overlay element
  var triggerRefs = (0, _react.useRef)(new Map()); // Define triggerRefs to manage trigger elements

  var closeAllModals = function closeAllModals() {
    document.querySelectorAll(".modal-overlay.open").forEach(function (el) {
      el.classList.remove("open");
    });
  };
  (0, _react.useEffect)(function () {
    if (isOpen) {
      if (closeExisting) {
        closeAllModals();
      }
      setIsMounted(true);
    } else {
      setIsMounted(false);
    }
  }, [isOpen, closeExisting]);

  // Separate useEffect for adding/removing "open" class
  (0, _react.useEffect)(function () {
    if (isMounted) {
      var overlay = overlayRef.current; // Access the current DOM node

      if (overlay) {
        overlay.classList.add("open");
      }
    } else {
      var _overlay = overlayRef.current;
      if (_overlay) {
        _overlay.classList.remove("open");
      }
    }
  }, [isMounted]); // Add/remove class based on isMounted

  (0, _react.useEffect)(function () {
    var handleTriggerClick = function handleTriggerClick(event) {
      event.preventDefault();
      onClose();
    };
    if (isMounted) {
      closeTriggers.forEach(function (triggerId) {
        var element = document.querySelector(triggerId);
        if (element) {
          element.addEventListener("click", handleTriggerClick);
          triggerRefs.current.set(triggerId, element);
        }
      });
    }
    var cleanupRefs = new Map(triggerRefs.current);
    return function () {
      cleanupRefs.forEach(function (element) {
        if (element) {
          element.removeEventListener("click", handleTriggerClick);
        }
      });
    };
  }, [isMounted, closeTriggers, onClose]);
  (0, _react.useEffect)(function () {
    var handleKeyDown = function handleKeyDown(event) {
      if (event.key === "Escape" && isOpen && !disableEscClose) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return function () {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, disableEscClose]);
  if (!isMounted) return null;
  return /*#__PURE__*/_react["default"].createElement("div", {
    ref: overlayRef // Attach the ref to the overlay element
    ,
    className: "modal-overlay ".concat(customClass),
    onClick: clickOutsideClose ? onClose : null
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "modal-content",
    onClick: function onClick(e) {
      return e.stopPropagation();
    },
    style: style
  }, /*#__PURE__*/_react["default"].createElement("button", {
    className: "close-button",
    onClick: onClose
  }, "\xD7"), content.title && /*#__PURE__*/_react["default"].createElement("h2", null, content.title), content.message && /*#__PURE__*/_react["default"].createElement("p", null, content.message), content.buttonText && /*#__PURE__*/_react["default"].createElement("button", {
    onClick: onClose
  }, content.buttonText), children));
};

// Définir les types de prop et indiquer les props obligatoires
Modal.propTypes = {
  isOpen: _propTypes["default"].bool.isRequired,
  // Obligatoire pour déterminer si la modale est visible
  onClose: _propTypes["default"].func.isRequired,
  // Obligatoire pour gérer la fermeture de la modale
  clickOutsideClose: _propTypes["default"].bool,
  closeExisting: _propTypes["default"].bool,
  disableEscClose: _propTypes["default"].bool,
  closeTriggers: _propTypes["default"].arrayOf(_propTypes["default"].string),
  content: _propTypes["default"].shape({
    title: _propTypes["default"].string,
    message: _propTypes["default"].string,
    buttonText: _propTypes["default"].string
  }),
  customClass: _propTypes["default"].string,
  style: _propTypes["default"].object,
  children: _propTypes["default"].node
};
var _default = exports["default"] = Modal;