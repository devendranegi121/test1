import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route 
} from "react-router-dom";
import Header from "./components/header/Header";
import HomePage from "./pages/homePage/HomePage";
import NewAdjustments from "./pages/newAdjustments/NewAdjustments";
import AdjustmentsPage from "./pages/adjustmentsPage/AdjustmentsPage";
import ApproverPage from "./pages/approverPage/ApproverPage";
import RequestAudit from "./pages/requestAudit/RequestAudit";
import AuditList from "./pages/auditList/AuditList";
import AdjusterRequestAudit from "./pages/requestAudit/AdjusterRequestAudit";

export default function App(props) {
  const [users, setUsers] = useState([])
  const [loginUser, setLoginUser] = useState(null)

  useEffect(() => {
    const listUsers = [
      {
        name: "Adjuster",
        role: "Adjuster",
        label: "Adjuster Management Global"
      },
      {
        name: "Approver",
        role: "Approver",
        label: "Approver Management Global"
      },
      {
        name: "Others",
        role: "Others",
        label: "Other User"
      }
    ]

    setUsers(listUsers);
    setLoginUser();
  }, [])

  const changeUser = (role) => {
    console.log(role, users )
    setLoginUser("")
    localStorage.setItem("token", "102")
    users.map(user => {
      if (user.role === role) {
        setLoginUser(user);
      }
    })

  }
  return (
    <Router>

      <div>
        <Route>
          <Header loginUser={loginUser} changeUser={changeUser} />
        </Route>
        {loginUser &&
          <div>

            <Switch>
              <Route path="/about">
                <HomePage loginUser={loginUser} />
              </Route>

              <Route path="/adjustment">
                <AdjustmentsPage />
              </Route>
              <Route path="/new-adjustments">
                <NewAdjustments loginUser={loginUser} />
              </Route>
              <Route path="/approver">
                <RequestAudit />
              </Route>

              <Route path="/audit-list">
                <AuditList />
              </Route>

              <Route path="/request-audit">
                <ApproverPage  />
              </Route>

              
              
              <Route path="/adjuster-request-audit">
                <AdjusterRequestAudit />
              </Route>

              <Route path="/">
                <HomePage loginUser={loginUser} />
              </Route>
            </Switch>
          </div>
        }

        {!loginUser &&
          <div className="container ">
            <div className="row">
              <div className="col-sm-12">
                <div className="alert alert-info alert-dismissible fade in">

                  <strong>Welcome!</strong> Please login.
                </div>
              </div>
            </div>
          </div>

        }
      </div>

    </Router>
  );
}


