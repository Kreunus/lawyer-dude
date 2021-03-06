import React, { Component } from "react";
import { withRouter } from "react-router";
import data from '../data.json';
import { ReactComponent as DragIcon } from '../images/drag_icon.svg';
import { ReactComponent as TrueFalseIcon } from '../images/true-false_icon.svg';
import { ReactComponent as UseCaseIcon } from '../images/usecase_icon.svg';
import { ReactComponent as MatchIcon } from '../images/switch_icon.svg';
import SettingsButton from "../components/SettingsButton";

class GamesOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
        nextPages: [],
        nextPageIDs: [],
    };
    this.redirectToNextPage = this.redirectToNextPage.bind(this);
  }

  componentDidMount() {
    const { ID } = this.props.location.state;
    const dataString = JSON.stringify(data);
    let jsonData = JSON.parse(dataString);
    const filteredJSON = jsonData.filter(values => values.id === ID);
    localStorage.removeItem('visitedPages');
    localStorage.setItem('visitedPages', JSON.stringify(filteredJSON));
    const nextPageIDs = filteredJSON[0].nextPageIDs;
    this.setState({
      nextPages: filteredJSON[0].nextPage,
      nextPageIDs: nextPageIDs,
    })
  }


  redirectToNextPage(index) {
    const { history } = this.props;
    const { nextPageIDs, nextPages } = this.state;

    history.push({
      pathname: nextPages[index],
      state: { ID: nextPageIDs[index] },
    });
  }


  render() {
    return (
      <div className="Startpage GamesOverview">
        <SettingsButton goBack={() => this.props.history.goBack()} />
        <div className="startpagecontent overviewpagecontent">
          <button className="game-back-btn" onClick={() => this.redirectToNextPage(0)}> 
              Return to overview
          </button>
          <h1 className="headline">Games</h1>
          <div className="container">
            <div className="row">
                <div className="gameContentBox col">
                    <div className="iconcontainer">
                      <MatchIcon className="boxicon" />
                      <h3 className="headline">Match the License</h3>
                    </div>
                    <button className="StartButton hover" onClick={() => this.redirectToNextPage(1)}>PLAY</button>
                </div>
                <div className="gameContentBox col">
                    <div className="iconcontainer">
                      <UseCaseIcon className="boxicon" />
                      <h3 className="headline">Understand the use case</h3>
                    </div>
                    <button className="StartButton hover" onClick={() => this.redirectToNextPage(2)}>PLAY</button>
                </div>
            </div>

            <div className="row">
                <div className="gameContentBox col">
                    <div className="iconcontainer">
                      <TrueFalseIcon className="boxicon" />
                      <h3 className="headline">True or false?</h3>
                    </div>
                    <button className="StartButton hover" onClick={() => this.redirectToNextPage(3)} >PLAY</button>
                </div>
                <div className="gameContentBox col">
                    <div className="iconcontainer">
                      <DragIcon className="boxicon" />
                      <h3 className="headline">Drop the icon!</h3>
                    </div>
                    <button className="StartButton hover" onClick={() => this.redirectToNextPage(4)}>PLAY</button>
                </div>
            </div>
          </div>  
        </div>
      </div>
    );
  }
}

export default withRouter(GamesOverview);
