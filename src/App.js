import React, { Component } from 'react';
import StartPage from './pages/Startpage';
import Jailpage from './pages/Jailpage';
import {Route, Router} from 'react-router-dom';
import './App.scss';
import { createBrowserHistory } from "history";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faTimes, faCog } from '@fortawesome/free-solid-svg-icons';
import NoDesicion from './pages/TemplateNoDesicion';
import EnterName from './pages/EnterName.jsx';
import TemplateDecision from './pages/TemplateDecision';
import MatchTheLicense from './games/MatchTheLicense';
import UsingTheImage from './games/UsingThePicture';
import WelcomePage from './pages/WelcomePage';
import FindTheLicense from './games/FindTheLicense';
import Imprint from './pages/Imprint';
import Overview from './pages/Overview';
import Resources from './pages/Resources';
import JailGameOne from './games/JailGameOne';
import JailGameTwo from './games/JailGameTwo';
import GamesOverview from './pages/GamesOverview';

const history = createBrowserHistory()
library.add(faBars);
library.add(faTimes);
library.add(faCog);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visitedPages: 1,
    };

    this.addingPages = this.addingPages.bind(this);
  }

  addingPages = (ID) => {
    const visitedPages = localStorage.getItem('visitedPages');
    let visitedPagesParsed = JSON.parse(visitedPages);
    if(visitedPages.indexOf(ID) === -1){
      visitedPagesParsed.push(ID);
    }
    localStorage.setItem('visitedPages', JSON.stringify(visitedPagesParsed));
  }

  render() {
    return (
      <Router history={history}>
          <Route exact path="/" component={() => <StartPage addingPages={this.addingPages}/>}/>
          <Route exact path="/learninggoals" component={() => <WelcomePage addingPages={this.addingPages}/>}/>
          <Route exact path="/entername" component={() => <EnterName addingPages={this.addingPages}/>}/>
          <Route exact path="/introduction" component={() => <TemplateDecision addingPages={this.addingPages}/>}/>
          <Route exact path="/imagesfrominternet" component={() => <TemplateDecision addingPages={this.addingPages}/>}/>
          <Route exact path="/searchingonline" component={() => <TemplateDecision addingPages={this.addingPages}/>}/>
          <Route exact path="/understandingsource" component={() => <TemplateDecision addingPages={this.addingPages}/>}/>
          <Route exact path="/usingfreelicenses" component={() => <TemplateDecision addingPages={this.addingPages}/>}/>
          <Route exact path="/findingauthor" component={() => <TemplateDecision addingPages={this.addingPages}/>}/>
          <Route exact path="/usingwiki" component={() => <TemplateDecision addingPages={this.addingPages}/>}/>
          <Route exact path="/copyrightinfo" component={() => <TemplateDecision addingPages={this.addingPages}/>}/>
          <Route exact path="/understandthelicense" component={() => <NoDesicion addingPages={this.addingPages}/>}/>
          <Route exact path="/usetheimage" component={() => <TemplateDecision addingPages={this.addingPages}/>}/>
          <Route exact path="/creatingnotice" component={() => <TemplateDecision addingPages={this.addingPages}/>}/>
          <Route exact path="/generatelicensenotice" component={() => <UsingTheImage addingPages={this.addingPages}/>}/>
          <Route exact path="/dontusetheimage" component={() => <TemplateDecision addingPages={this.addingPages}/>}/>
          <Route exact path="/usingsearchengines" component={() => <TemplateDecision addingPages={this.addingPages}/>}/>
          <Route exact path="/creatingnotice2" component={() => <NoDesicion addingPages={this.addingPages}/>}/>
          <Route exact path="/usinggoogle" component={() => <TemplateDecision addingPages={this.addingPages}/>}/>
          <Route exact path="/success" component={() => <TemplateDecision addingPages={this.addingPages}/>}/>
          <Route exact path="/finish" component={() => <NoDesicion addingPages={this.addingPages}/>}/>
          <Route exact path="/matchthelicense" component={() => <MatchTheLicense addingPages={this.addingPages}/>}/>
          <Route exact path="/collectinfo" component={() => <TemplateDecision addingPages={this.addingPages}/>}/>
          <Route exact path="/jail" component={() => <Jailpage addingPages={this.addingPages}/>}/>
          <Route exact path="/attributionGenerator" component={() => <NoDesicion addingPages={this.addingPages}/>}/>
          <Route exact path="/understandusecase" component={() => <FindTheLicense addingPages={this.addingPages}/>}/>
          <Route exact path="/imprint" component={() => <Imprint addingPages={this.addingPages}/>}/>
          <Route exact path="/overview" component={() => <Overview addingPages={this.addingPages}/>}/>
          <Route exact path="/resources" component={() => <Resources addingPages={this.addingPages}/>}/>
          <Route exact path="/jailgame1" component={() => <JailGameOne ID={105} cssGameClass="pagecontent" cssLaywerClass="pagecontent jailgame" showNavigation={true}/>}/>
          <Route exact path="/jailgame2" component={() => <JailGameTwo ID={106} cssGameClass="pagecontent" cssLaywerClass="pagecontent jailgame" showNavigation={true}/>}/>
          <Route exact path="/games" component={() => <GamesOverview/>}/>
      </Router>
    );
  }
}

export default App;
