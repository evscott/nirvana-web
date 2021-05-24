import React from "react";
import { Switch, Route, Router as Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import Startup from "./components/Startup";
import * as ROUTES from "./routes";
import NoMatchPage from "./components/pages/404/NoMatchPage";
import DashboardPage from "./components/pages/dashboard/DashboardPage";
import AboutPage from "./components/pages/about/AboutPage";
import ShroomsPage from "./components/pages/shrooms/ShroomsPage";
import AcidPage from "./components/pages/acid/AcidPage";
import ShoppingCartPage from "./components/pages/checkout/ShoppingCartPage";
import ShippingPage from "./components/pages/checkout/ShippingPage";
import ReviewOrderPage from "./components/pages/checkout/ReviewOrderPage";
import ContactUsPage from "./components/pages/contact/ContactUsPage";
import OrderConfirmationPage from "./components/pages/checkout/OrderConfirmationPage";


const history = createBrowserHistory();

function App() {
  return (
      <Startup>
        <Router history={history}>
          <CssBaseline />
          <Switch>
            <Route exact path={ROUTES.DASHBOARD_ROUTE} component={DashboardPage}/>
            <Route exact path={ROUTES.ABOUT_ROUTE} component={AboutPage}/>
            <Route exact path={ROUTES.SHROOMS_ROUTE} component={ShroomsPage}/>
            <Route exact path={ROUTES.ACID_ROUTE} component={AcidPage}/>
            <Route exact path={ROUTES.SHOPPING_CART_ROUTE} component={ShoppingCartPage}/>
            <Route exact path={ROUTES.SHIPPING_ROUTE} component={ShippingPage}/>
            <Route exact path={ROUTES.REVIEW_ORDER_ROUTE} component={ReviewOrderPage}/>
              <Route exact path={ROUTES.ORDER_CONFIRMATION_ROUTE} component={OrderConfirmationPage}/>
              <Route exact path={ROUTES.CONTACT_ROUTE} component={ContactUsPage}/>
            <Route>
                <NoMatchPage/>
            </Route>
          </Switch>
        </Router>
      </Startup>
  );
}

export default App;