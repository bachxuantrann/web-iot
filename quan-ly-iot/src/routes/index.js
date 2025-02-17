import LayoutDefault from "../layout/layoutDefault";
import Dashboard from "../pages/dashboard";
import Error404 from "../pages/Error404";
import HistoryData from "../pages/HistoryData";
import HistoryDevice from "../pages/HistoryDevice";
import Profile from "../pages/profile";
export const routes = [
    {
        path: "/",
        element: <LayoutDefault />,
        children: [
            {
                path: "/",
                element: <Dashboard />,
            },
            {
                path: "/lich-su-thiet-bi/:name",
                element: <HistoryDevice />,
            },
            {
                path: "/lich-su-thong-so",
                element: <HistoryData />,
            },
            {
                path: "/trang-ca-nhan",
                element: <Profile />,
            },
            {
                path: "*",
                element: <Error404 />,
            },
        ],
    },
];
