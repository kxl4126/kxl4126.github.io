// import React from 'react';
// import ReactDOM from 'react-dom';
// import '../style.css';
const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    return (
        <form action="" method="get">
  <div className="product-search">
      <div className="search-element">
        <label className="search-label">Education:</label>
        <input className="search-input" list = "college_list" type="text" placeholder="College/University" name="query"/>
      </div>
      <div className="search-element">
        <label className="search-label">Previous Company:</label>
        <input className="search-input" type="text" placeholder="Company" name="location"/>
      </div>
      <div className="search-element">
        <label className="search-label">Desired Position:</label>
        <input className="search-input" type="text" placeholder="Position" name="query"/>
      </div>
      <div className="search-element">
        <label className="search-label">Location:</label>
        <input className="search-input" type="text" placeholder="Location" name="query"/>
      </div>
      <div id = "search-btn-element">
         <a type="submit" className="search-button">Search</a>
      </div>
  </div>
    </form>
    )
  }
}

const domContainer = document.querySelector('#search-bar-test');
ReactDOM.render(<LikeButton />, document.getElementById('search-bar-test'));