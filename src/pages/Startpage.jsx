import React, { Component } from 'react';
import SideNavigation from '../components/SideNavigation';
import '../styles/style.css';
import { withRouter } from 'react-router';
import data from './Start.json';

class Startpage extends Component {
 constructor(props) {
    super(props);
    this.state = {
      username: '',
      textIndex: 0,
      panels: [],
      headline: ''
    };
    this.nextText = this.nextText.bind(this);
    this.previousText = this.previousText.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    const dataString = JSON.stringify(data);
    let jsonData = JSON.parse(dataString);
    console.log(jsonData);
    this.setState({
      panels: jsonData[0].panels,
      headline: jsonData[0].headline
    })
  }

  redirectToNextPage(){
    const {history} = this.props;
    history.push("/story");
  }

  handleChange(event) {
    this.setState({username: event.target.value});
  }

  handleSubmit(event) {
    this.props.setUserName(this.state.username);
    this.props.goToNextPage(this.props.nextPage);
    event.preventDefault();
  }

  nextText() {
    const {panels, textIndex} = this.state
    const theSize = panels.length-1;
    if(textIndex >= 0 && textIndex < theSize){
        this.state.textIndex++;
        this.setState({textIndex: this.state.textIndex});
    }
  }

  previousText() {
    const theSize = this.state.panels.length-1;
    if(this.state.textIndex > 0 && this.state.textIndex <= theSize){
        this.state.textIndex--;
        this.setState({textIndex: this.state.textIndex});
    }
  }

  render() {
    const {panels, textIndex, headline} = this.state;

    return (
      <div className="Startpage">
        <SideNavigation/>
        <div className="pagecontent">
          <h1>
              {headline}
          </h1>
            <p>
              {panels[textIndex]}
            </p>
          <button onClick={this.previousText} className="BackButton">
            <svg width="21px" height="36px" viewBox="0 0 21 36" version="1.1">
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Enter-your-name_v2" transform="translate(-787.000000, -903.000000)" stroke="#FFFFFF" stroke-width="3">
                        <g id="next_btn" transform="translate(767.000000, 888.000000)">
                            <polyline id="Path" transform="translate(31.500000, 33.000000) scale(-1, 1) rotate(-270.000000) translate(-31.500000, -33.000000) " points="15.5 41.5 31.5 24.5 31.5 24.5 47.5 41.5"></polyline>
                        </g>
                    </g>
                </g>
            </svg>
          </button>
          <button onClick={this.nextText} className="ForthButton">
            <svg width="21px" height="35px" viewBox="0 0 21 35" version="1.1">
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Enter-your-name_v2" transform="translate(-876.000000, -904.000000)" stroke="#FFFFFF" stroke-width="3">
                        <g id="next_btn" transform="translate(851.000000, 888.000000)">
                            <polyline id="Path" transform="translate(35.000000, 33.500000) rotate(-270.000000) translate(-35.000000, -33.500000) " points="19 42 35 25 35 25 51 42"></polyline>
                        </g>
                    </g>
                </g>
            </svg>
          </button>
          <p></p>
          <form onSubmit={this.handleSubmit}>
            <label>
              Enter your name:
              <input type="text" value={this.state.username} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Let's go" onClick={() => this.redirectToNextPage()}/>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Startpage);
