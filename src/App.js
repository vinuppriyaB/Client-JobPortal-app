import "./App.css";
import HomePage from "./pages/HomePage";
import { Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import RecruiterPage from "./pages/RecruiterPage";
import CandidatePage from "./pages/CandidatePage";
import PostJob from "./component/PostJob/PostJob";
import RecruiterJobPostedList from "./component/RecruiterJobPostedListPage/RecruiterJobPostedList";
import RecruiterDetailsupdate from "./component/RecruiterDetailsupdate/RecruiterDetailsupdate";
import CandidateDetailsUpdate from "./component/CandidateDetailsUpdate/CandidateDetailsUpdate";
import CandidateJobList from "./component/CandidateJobList/CandidateJobList";
import RecruiterPostUpdate from "./component/RecruiterPostUpdate/RecruiterPostUpdate";
import CandidateUpdatePage from "./pages/CandidateUpdatePage";
import RecruiterUpdatePage from "./pages/RecruiterUpdatePage";
import RecruiterJobPostPage from "./pages/RecruiterJobPostPage";
import CandidatesList from "./component/CandidatesDetails/CandidatesList";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/register">
          <RegistrationPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/recruiter">
          <RecruiterPage />
        </Route>
        <Route path="/candidate">
          <CandidatePage />
        </Route>
        <Route path="/postjob">
          <RecruiterJobPostPage />
        </Route>

        <Route path="/recruiters/updatedetail">
          <RecruiterUpdatePage />
        </Route>
        <Route path="/candidates/updatedetail">
          <CandidateUpdatePage />
        </Route>
        <Route path="/editrecruiterpost/:id">
          <RecruiterPostUpdate />
        </Route>
        <Route path="/candidatedetail/:id">
          <CandidatesList />
        </Route>
      </Switch>
    </div>
  );
}
export default App;

// <Route path="/recruiterjoblist">
//   <RecruiterJobPostedList />
// </Route>;
// <Route path="/candidatejoblist">
//   <CandidatePage />
//   <CandidateJobList />
// </Route>
