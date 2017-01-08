'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Leaderboard = function (_React$Component) {
  _inherits(Leaderboard, _React$Component);

  function Leaderboard() {
    _classCallCheck(this, Leaderboard);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this));

    _this.state = {
      recent: [],
      alltime: [],
      recentNow: null
    };
    return _this;
  }

  Leaderboard.prototype.componentDidMount = function componentDidMount() {
    var self = this;
    fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent').then(function (response) {
      response.json().then(function (data) {
        self.setState({
          recent: data,
          recentNow: true
        });
      });
    }).catch(function (err) {
      console.log('error', err);
    });
    fetch('https://fcctop100.herokuapp.com/api/fccusers/top/alltime').then(function (response) {
      response.json().then(function (data) {
        self.setState({
          alltime: data
        });
      });
    }).catch(function (err) {
      console.log('error', err);
    });
  };

  Leaderboard.prototype.handleToggle = function handleToggle() {
    if (this.state.recentNow) {
      this.setState({ recentNow: false });
    } else {
      this.setState({ recentNow: true });
    }
  };

  Leaderboard.prototype.render = function render() {
    var iconSpan,
        data = [];
    if (this.state.recentNow == true) {
      data = this.state.recent;
    } else {
      data = this.state.alltime;
    }
    return React.createElement(
      'div',
      null,
      React.createElement(Header, null),
      React.createElement(
        'div',
        { className: 'col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3' },
        React.createElement(
          'div',
          { className: 'header' },
          'Leaderboard in Points'
        ),
        React.createElement(
          'table',
          { className: 'table table-striped' },
          React.createElement(SetHeader, { toggleEvent: this.handleToggle.bind(this), recentNow: this.state.recentNow }),
          React.createElement('div', null),
          React.createElement(SetBody, { tableData: data })
        )
      )
    );
  };

  return Leaderboard;
}(React.Component);

var SetHeader = function (_React$Component2) {
  _inherits(SetHeader, _React$Component2);

  function SetHeader() {
    _classCallCheck(this, SetHeader);

    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }

  SetHeader.prototype.render = function render() {
    return React.createElement(
      'thead',
      { className: 'tableHead' },
      React.createElement(
        'tr',
        null,
        React.createElement(
          'th',
          null,
          '#'
        ),
        React.createElement(
          'th',
          { className: 'hidden-xs' },
          'Camper'
        ),
        React.createElement(
          'th',
          null,
          'Name'
        ),
        React.createElement(
          'th',
          { onClick: this.props.toggleEvent, className: 'sortBy' },
          'Past 30 Days ',
          this.props.recentNow ? React.createElement('span', { className: 'glyphicon glyphicon-menu-down' }) : React.createElement('span', { className: 'glyphicon glyphicon-menu-up' })
        ),
        React.createElement(
          'th',
          { onClick: this.props.toggleEvent, className: 'sortBy' },
          'All Time ',
          !this.props.recentNow ? React.createElement('span', { className: 'glyphicon glyphicon-menu-down' }) : React.createElement('span', { className: 'glyphicon glyphicon-menu-up' })
        )
      )
    );
  };

  return SetHeader;
}(React.Component);

var SetBody = function (_React$Component3) {
  _inherits(SetBody, _React$Component3);

  function SetBody() {
    _classCallCheck(this, SetBody);

    return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
  }

  SetBody.prototype.render = function render() {
    return React.createElement(
      'tbody',
      { className: 'tableBody' },
      this.props.tableData.map(function (val, i) {
        return React.createElement(
          'tr',
          null,
          React.createElement(
            'td',
            null,
            i + 1
          ),
          React.createElement(
            'td',
            { className: 'hidden-xs' },
            React.createElement('img', { src: val.img, className: 'img-circle camperImg' })
          ),
          React.createElement(
            'td',
            null,
            React.createElement(
              'a',
              { target: 'blank', href: "https://www.freecodecamp.com/" + val.username },
              val.username
            )
          ),
          React.createElement(
            'td',
            null,
            val.recent
          ),
          React.createElement(
            'td',
            null,
            val.alltime
          )
        );
      })
    );
  };

  return SetBody;
}(React.Component);

var Header = function (_React$Component4) {
  _inherits(Header, _React$Component4);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, _React$Component4.apply(this, arguments));
  }

  Header.prototype.render = function render() {
    return React.createElement(
      'header',
      null,
      React.createElement(
        'a',
        { href: 'https://www.freecodecamp.com' },
        React.createElement('img', { className: 'fcclogo', src: 'https://s3.amazonaws.com/freecodecamp/freecodecamp_logo.svg', alt: 'FreeCodeCamp logo' })
      )
    );
  };

  return Header;
}(React.Component);

ReactDOM.render(React.createElement(Leaderboard, null), document.getElementById('displayIt'));