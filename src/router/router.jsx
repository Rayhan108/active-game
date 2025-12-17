import { createBrowserRouter } from "react-router-dom";


import DashboardPage from "../pages/DashboardPage/DashboardPage";
import Main from "../layout/Main";
import PrivetRoutes from "./PrivateRoutes";
import { AllUsers } from "../pages/AllUsers/AllUsers";
import Avatar from "../pages/Avatar/Avatar";
import Ads from "../pages/Ads/Ads";
import RefferalRewards from "../pages/RefferalRewards/RefferalRewards";

import Privacy from "../pages/Privacy/Privacy";
import Terms from "../pages/Terms/Terms";
import Contact from "../pages/Contact/Contact";
import Faq from "../pages/Faq/Faq";
import { Admin } from "../pages/Admin/Admin";
import Profile from "../pages/Profile/Profile";
import ChangePassword from "../pages/ChangePassword/ChangePassword";
import ForgetPassword from "../pages/ForgetPassword/ForgetPassword";

const router = createBrowserRouter([
//   {
//     path: "/sign-in",
//     element: <Signin />,
//   },
//   {
//     path: "/verify",
//     element: <Verify />,
//   },
//   {
//     path: "/passReset",
//     element: <PassReset />,
//   },
//   {
//     path: "/forget-password",
//     element: <ForgotPass />,
//   },
//   {
//     path: "/setPass",
//     element: <SetPass />,
//   },
  {
    path: "/",
    element: <PrivetRoutes><Main></Main></PrivetRoutes>,
    // errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
      {
        path: "/allUsers",
        element: <AllUsers />,
      },
   
      {
        path: "/avatar",
        element: <Avatar />,
      },
      {
        path: "/referral-reward",
        element: <RefferalRewards />,
      },
      {
        path: "/ads",
        element: <Ads/>,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/changePassword",
        element: <ChangePassword />,
      },
      {
        path: "/forgetPassword",
        element: <ForgetPassword />,
      },
      {
        path: "/settings/privacy-policy",
        element: <Privacy />,
      },
      {
        path: "/settings/terms",
        element: <Terms />,
      },
      {
        path: "/settings/contact-us",
        element: <Contact />,
      },
      {
        path: "/settings/faq",
        element: <Faq/>,
      },
   
    ],
  },
]);
export default router;
