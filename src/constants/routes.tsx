import Home from "../pages/home/home";
import Members from "../pages/members/members";
import Payments from "../pages/payments/payments";

import Pos from "../pages/pos/pos";

import VisitHistories from "../pages/visitHistories/visitHistories";

export const routes = [
    {
        key: 0,
        path: "/",
        element: <Home />
    },
    {
        key: 1,
        path: "/members",
        element: <Members />
    },
    {
        key: 2,
        path: "/pos",
        element: <Pos />
    },
    {
        key: 3,
        path: "/visit-history",
        element: <VisitHistories />
    },
    {
        key: 4,
        path: "/payments",
        element: <Payments />
    },
]