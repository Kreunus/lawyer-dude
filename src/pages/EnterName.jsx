import React, { Component } from 'react';
import SideNavigation from '../components/SideNavigation';
import '../styles/style.css';
import { withRouter } from 'react-router';
import data from '../data.json';
import ForthButton from '../components/ForthButton';
import BackButton from './../components/BackButton';

class EnterName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textIndex: 0,
      panels: [],
      headline: '',
      nextPageID: 0,
      nextPage: '',
      username : ''
    };
    this.nextText = this.nextText.bind(this);
    this.previousText = this.previousText.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.redirectToNextPage = this.redirectToNextPage.bind(this);
  }

  componentDidMount() {
    const { ID } = this.props.location.state;
    const { addingPages } = this.props;
    addingPages(ID);
    const dataString = JSON.stringify(data);
    let jsonData = JSON.parse(dataString);
    const filteredJSON = jsonData.filter(values => values.id === ID);
    const nextPageID = filteredJSON[0].nextPageIDs;
    this.setState({
      panels: filteredJSON[0].panels,
      headline: filteredJSON[0].headline,
      nextPage: filteredJSON[0].nextPage,
      nextPageID: nextPageID,
    })
  }

  redirectToNextPage(event){
    localStorage.setItem('username', JSON.stringify(this.state.username));
    const {history} = this.props;
    this.setState({username: event.target.value});
    const {nextPageID, nextPage} = this.state;
    history.push({
      pathname: nextPage,
      state: { ID: nextPageID },
    });
  }

  handleChange(event) {
      this.setState({username: event.target.value});
  }

  nextText() {
    const { panels, textIndex } = this.state
    const theSize = panels.length - 1;
    if (textIndex >= 0 && textIndex < theSize) {
      this.setState(prevState => {
        return {textIndex: prevState.textIndex + 1}
     })
    }
  }

  previousText() {
    const theSize = this.state.panels.length - 1;
    if (this.state.textIndex > 0 && this.state.textIndex <= theSize) {
      this.setState(prevState => {
        return {textIndex: prevState.textIndex - 1}
     })
    }
  }



  render() {
    const { panels, textIndex, headline } = this.state;

    return (
      <div className="Startpage">
        <button onClick={() => this.props.history.goBack()}>Go Back</button>
        <SideNavigation />
        <div className="pagecontent">
          <h1>
            {headline}
          </h1>
          <p>
            {panels[textIndex]}
          </p>
          {
            textIndex === 0 ? (
              <div>
                <ForthButton nextText={this.nextText} />
              </div>
            ) : (
                textIndex + 1 < panels.length ? (
                  <div>
                  <BackButton previousText={this.previousText} />
                  <ForthButton nextText={this.nextText} />
                </div>
                ) : (
                  <div>
                  <form onSubmit={(event) => this.redirectToNextPage(event)}>
                    <label>
                      Enter your name:
                      <input type="text" value={this.state.username} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Let's go"/>
                  </form>
                </div>
                  ))
          }
          <p></p>
        </div>
      </div>
    );
  }
}

export default withRouter(EnterName);