"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Menu = require("./Menu");

var _Menu2 = _interopRequireDefault(_Menu);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContextMenu = function (_Component) {
  _inherits(ContextMenu, _Component);

  function ContextMenu(props) {
    _classCallCheck(this, ContextMenu);

    var _this = _possibleConstructorReturn(this, (ContextMenu.__proto__ || Object.getPrototypeOf(ContextMenu)).call(this, props));

    _this.state = { display: false, position: { x: 0, y: 0 } };

    _this.handleBlurWindow = _this.handleBlurWindow.bind(_this);
    _this.handleClickDoc = _this.handleClickDoc.bind(_this);
    _this.handleClick = _this.handleClick.bind(_this);

    return _this;
  }

  _createClass(ContextMenu, [{
    key: "handleBlurWindow",
    value: function handleBlurWindow() {

      this.setState({ display: false });
    }
  }, {
    key: "handleClickDoc",
    value: function handleClickDoc(e) {

      if (!(0, _utils.isChildOf)(e.target, _reactDom2.default.findDOMNode(this.menu))) this.setState({ display: false });
    }
  }, {
    key: "handleClick",
    value: function handleClick(e) {

      if (e.which !== 3) return;

      e.stopPropagation();

      this.setState({ display: true });

      this.setPosition(e);
    }
  }, {
    key: "preventDefault",
    value: function preventDefault(e) {

      e.preventDefault();
    }
  }, {
    key: "setPosition",
    value: function setPosition(e) {

      var menu = _reactDom2.default.findDOMNode(this.menu);
      var parent = menu && menu.offsetParent;
      var dimParent = parent && parent.getBoundingClientRect();

      if (!menu) return;

      var x = e.clientX - dimParent.left;
      var y = e.clientY - dimParent.top;

      if (e.clientX + menu.offsetWidth > window.innerWidth) {

        x -= menu.offsetWidth;
        if (x < 0) x = window.innerWidth - menu.offsetWidth;
      }

      if (e.clientY + menu.offsetHeight > window.innerHeight) {

        y -= menu.offsetHeight;
        if (y < 0) y = window.innerHeight - menu.offsetHeight;
      }

      this.setState({ position: { x: x, y: y } });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {

      this.container.addEventListener("mouseup", this.handleClick);
      this.container.addEventListener("contextmenu", this.preventDefault);
      document.addEventListener("mouseup", this.handleClickDoc);
      window.addEventListener("blur", this.handleBlurWindow);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {

      this.container.removeEventListener("mouseup", this.handleClick);
      this.container.removeEventListener("contextmenu", this.preventDefault);
      document.removeEventListener("mouseup", this.handleClickDoc);
      window.removeEventListener("blur", this.handleBlurWindow);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          children = _props.children,
          rest = _objectWithoutProperties(_props, ["children"]);

      if (_react2.default.Children.count(children) !== 2) throw new Error("You should have exactly 2 children");

      var elmts = _react2.default.Children.toArray(children);

      var menu = elmts[0].type === _Menu2.default ? elmts[0] : elmts[1];
      var container = elmts[0].type === _Menu2.default ? elmts[1] : elmts[0];

      if (this.state.display) {

        menu = _react2.default.cloneElement(menu, {
          ref: function ref(elmt) {
            return _this2.menu = elmt;
          },
          style: {
            left: this.state.position.x,
            top: this.state.position.y
          }
        });
      } else menu = null;

      return _react2.default.cloneElement(container, _extends({
        ref: function ref(elmt) {
          return _this2.container = elmt;
        }
      }, rest), menu);
    }
  }]);

  return ContextMenu;
}(_react.Component);

ContextMenu.propTypes = { children: _react.PropTypes.node };

exports.default = ContextMenu;