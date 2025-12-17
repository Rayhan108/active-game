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

import Login from "../pages/Auth/Login/Login";
import ResetPass from "../pages/Auth/ResetPass/ResetPass";
import Otp from "../pages/Auth/Otp/Otp";
import ForgetPass from "../pages/Auth/ForgetPass/ForgetPass";


const router = createBrowserRouter([
  {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/otp",
        element: <Otp/>,
      },
      {
        path: "/forgetPass",
        element: <ForgetPass/>,
      },
      {
        path: "/resetPass",
        element: <ResetPass/>,
      },
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
