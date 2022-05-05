import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const RepeatOrder = React.lazy(() =>
  import("./views/pages/repeatOrder/RepeatOrder")
);
const ComponentToPrint = React.lazy(() =>
  import("./views/pages/repeatOrder/ComponentToPrint")
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
  {path: "/print", exact: true, name: "test",component: ComponentToPrint},
];


export default routes;
