import "./App.css";
import { DiscoverSalaries } from "./components/salaries/discoverSalaries";
import { DiscoverInterview } from "./components/interview/discoverInterviews";
import { ReviewForm } from "./components/reviewForm";
import { SignInPage } from "./components/SignInPage/SignInPage";
import { CompanyPage } from "./components/CompanySection/CompanyPage";
import { JobsList } from "./components/JobsListPage/JobsList";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./components/After_Sign_In/Dashboard";
import CoDashboard from "./components/After_Sign_In/CoDashboard";
import Profile from "./components/Profile_Page/Profile";
import { ShowCompareCompanies } from "./components/compareCompanies/compareCompany";
import { CompareCompany } from "./components/CompanySection/CompareCompany";
import { DiscoverCompanies } from "./components/CompanySection/DiscoverCompanies";
import { GdforEmp } from "./components/GdforEmployers/GdforEmp";
import { Postjob } from "./components/Postjob/Postjob";
import { CompanyDetails } from "./components/companyOverview/companyOverview";
import { AddCompany } from "./components/company/AddCompany";
import { PromptForm } from "./components/AIGenerator/PromptForm";
import { CandidateExam } from "./components/Exam/CandidateExam";
import { ExamHr } from './components/AIGenerator/ExamHr';
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (
    <AuthProvider>
      <div className="App">
        <Switch>
          <Route exact path="/" component={SignInPage} />
          <Route exact path="/SignIn" component={SignInPage} />
          <Route exact path="/companyDetails" component={CompanyDetails} />
          <Route exact path="/companies" component={DiscoverCompanies} />
          <Route exact path="/dicoverSalaries" component={DiscoverSalaries} />
          <Route exact path="/discoverInterview" component={DiscoverInterview} />
          <Route exact path="/reviewForm" component={ReviewForm} />
          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
          <ProtectedRoute exact path="/co-dashboard" component={CoDashboard} />
          <ProtectedRoute exact path="/Profile" component={Profile} />
          <ProtectedRoute exact path="/CompareCompany" component={CompareCompany} />
          <ProtectedRoute exact path="/ShowComparison" component={ShowCompareCompanies} />
          <ProtectedRoute exact path="/jobsList" component={JobsList} />
          <ProtectedRoute exact path="/forEmployers" component={GdforEmp} />
          <ProtectedRoute exact path="/postJob" component={Postjob} />
          <ProtectedRoute exact path="/addCompany" component={AddCompany} />
          {/* <Route exact path="/ai" component={ExamHr} /> */}
          <Route path="/candidate/exam/:jobId" component={CandidateExam} />


          <Route exact path="/ai" component={ExamHr} />
        </Switch>
      </div>
    </AuthProvider>
  );
}

export default App;