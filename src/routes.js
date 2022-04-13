import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const RepeatOrder = React.lazy(() =>
  import("./views/pages/repeatOrder/ReapeatOrder")
);

const routes = [
  { path: "/", exact: true, name: "Master" },
  { path: "/dashboard", exact: true, name: "Dashboard", component: Dashboard },
  {
    path: "/repeat-order",
    exact: true,
    name: "Repeat Order",
    component: RepeatOrder,
  },
];


export default routes;
