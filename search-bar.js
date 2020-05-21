var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import React from 'react';
// import ReactDOM from 'react-dom';
// import '../style.css';
var e = React.createElement;

var LikeButton = function (_React$Component) {
  _inherits(LikeButton, _React$Component);

  function LikeButton(props) {
    _classCallCheck(this, LikeButton);

    var _this = _possibleConstructorReturn(this, (LikeButton.__proto__ || Object.getPrototypeOf(LikeButton)).call(this, props));

    _this.state = { liked: false };
    return _this;
  }

  _createClass(LikeButton, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "form",
        { action: "", method: "get" },
        React.createElement(
          "div",
          { className: "product-search" },
          React.createElement(
            "div",
            { className: "search-element" },
            React.createElement(
              "label",
              { className: "search-label" },
              "Education:"
            ),
            React.createElement("input", { className: "search-input", list: "college_list", type: "text", placeholder: "College/University", name: "query" })
          ),
          React.createElement(
            "div",
            { className: "search-element" },
            React.createElement(
              "label",
              { className: "search-label" },
              "Previous Company:"
            ),
            React.createElement("input", { className: "search-input", type: "text", placeholder: "Company", name: "location" })
          ),
          React.createElement(
            "div",
            { className: "search-element" },
            React.createElement(
              "label",
              { className: "search-label" },
              "Desired Position:"
            ),
            React.createElement("input", { className: "search-input", type: "text", placeholder: "Position", name: "query" })
          ),
          React.createElement(
            "div",
            { className: "search-element" },
            React.createElement(
              "label",
              { className: "search-label" },
              "Location:"
            ),
            React.createElement("input", { className: "search-input", type: "text", placeholder: "Location", name: "query" })
          ),
          React.createElement(
            "div",
            { id: "search-btn-element" },
            React.createElement(
              "a",
              { type: "submit", className: "search-button" },
              "Search"
            )
          )
        )
      );
    }
  }]);

  return LikeButton;
}(React.Component);

var domContainer = document.querySelector('#search-bar-test');
ReactDOM.render(React.createElement(LikeButton, null), document.getElementById('search-bar-test'));