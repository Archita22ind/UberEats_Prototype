import { Route } from "react-router-dom";
import React from "react";
import { getSessionCookie } from "./session";
import MainHeader from "./mainHeader";

const ProtectedRouter = ({ history }) => {
  const session = getSessionCookie();
  if (session.primaryID === undefined) {
    console.log("I am in protected Router");
    history.push("/");
    return <div></div>;
  } else {
    return (
      <>
        <Route
          path="/restaurantDetails"
          render={() => <MainHeader tab={"restaurantDetails"} />}
        />
        <Route
          path="/restaurantSearch"
          render={() => <MainHeader tab={"restaurantSearch"} />}
        />
        <Route
          path="/favorites"
          render={() => <MainHeader tab={"favorites"} />}
        />
        <Route
          path="/profileInfo"
          render={() => <MainHeader tab={"profile"} />}
        />
        <Route path="/orders" render={() => <MainHeader tab={"orders"} />} />
        <Route
          path="/restaurantOrders"
          render={() => <MainHeader tab={"restaurantOrders"} />}
        />
        <Route
          path="/checkout"
          render={() => <MainHeader tab={"checkout"} />}
        />
      </>
    );
  }
};

export default ProtectedRouter;
