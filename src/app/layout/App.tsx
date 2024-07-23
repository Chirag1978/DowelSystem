import React, { useEffect } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import { observer } from "mobx-react-lite";
import { Route, Switch, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import { ToastContainer } from "react-toastify";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import { useStore } from "../stores/store";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../common/modals/ModalContainer";
import ProfilePage from "../../features/profiles/ProfilePage";
import PrivateRoute from "./PrivateRoute";
import RegisterSuccess from "../../features/users/registration/RegisterSuccess";
import ConfirmEmail from "../../features/users/registration/ConfirmEmail";
import { useTranslation } from "react-i18next";
// import '../../app/common/i18n/i18n.ts'
import ChangePassword from "../../features/users/passwordchange/ChangePassword";
import ForgotPassword from "../../features/users/passwordchange/ForgotPassword";
import Details from "../../features/users/form/Details";
import Footer from "./Footer";

function App() {
  const location = useLocation();
  const { commonStore, userStore } = useStore();
  const { t } = useTranslation(["common", "translation"]);

  // const { getUser } = userStore;
  //const { token, setAppLoaded } = commonStore;

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      //   userStore.getFacebookLoginStatus().then(() =>
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded)
    return <LoadingComponent content={t("loading", { ns: "common" })} />;

  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar />
      <ModalContainer />
      <>
        <NavBar />
        <Route exact path="/" component={HomePage} />
        <Route
          path={"/(.+)"}
          render={() => (
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route path="/server-error" component={ServerError} />
                <Route path="/forgotpassword" component={ForgotPassword} />
                <Route
                  path="/account/registerSuccess"
                  component={RegisterSuccess}
                />
                <Route path="/account/verifyEmail" component={ConfirmEmail} />
                <Route path="/userdetails" component={Details} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          )}
        />
        {/* <Footer /> */}
      </>
    </>
  );
}

export default observer(App);
