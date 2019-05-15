import React, { Component } from 'react';
import SideNavigation from '../components/SideNavigation';
import '../styles/style.css';
import { withRouter } from 'react-router';
import data from '../data.json';
import BackButton from '../components/BackButton';
import ForthButton from '../components/ForthButton';

class LearningGoals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textIndex: 0,
      panels: [],
      decisions: [],
      nextPageIDs: [],
      nextPages: [],
    };
    this.nextText = this.nextText.bind(this);
    this.previousText = this.previousText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.redirectToNextPage = this.redirectToNextPage.bind(this);
    this.replaceUsername = this.replaceUsername.bind(this);
  }

  componentDidMount() {
    const { ID } = this.props.location.state;
    const { addingPages } = this.props;
    addingPages(ID);
    const dataString = JSON.stringify(data);
    let jsonData = JSON.parse(dataString);
    const filteredJSON = jsonData.filter(values => values.id === ID);
    const nextPageIDs = filteredJSON[0].nextPageIDs;
    this.setState({
      panels: filteredJSON[0].panels,
      decisions: filteredJSON[0].decisions,
      headline: filteredJSON[0].headline,
      nextPages: filteredJSON[0].nextPage,
      nextPageIDs: nextPageIDs,
    }, () => this.replaceUsername())
  }

  replaceUsername() {
     const {panels} = this.state;
     const username = localStorage.getItem('username');
     let usernameParsed = JSON.parse(username);
     const newPanels = panels.map( (panel) => {
        return panel.replace('{username}', usernameParsed);
     });
     this.setState({panels : newPanels});
  }

  redirectToNextPage(index) {
    const { history } = this.props;
    const { nextPageIDs, nextPages } = this.state;
    history.push({
      pathname: nextPages[index],
      state: { ID: nextPageIDs[index] },
    });
  }

  handleSubmit(event) {
    this.props.setUserName(this.state.username);
    this.props.goToNextPage(this.props.nextPage);
    event.preventDefault();
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
        return {textIndex: prevState.textIndex -1 }
     })
    }
  }

  render() {
    const { panels, textIndex, headline, decisions } = this.state;

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
                      {
                        decisions.map((decision, index) => {
                          return (
                            <button onClick={() => this.redirectToNextPage(index)}>{decision}</button>
                          )
                        })
                      }
                    </div>
                  ))
          }
          <p></p>
        </div>
      </div>
    );
  }
}

export default withRouter(LearningGoals);
