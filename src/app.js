var React = require('react');
var ReactDOM = require('react-dom');

var NavigationController = require('components/navigation/navigationController.jsx');

$(function() {
    ReactDOM.render(React.createElement(NavigationController), $('.wrapper')[0])
});