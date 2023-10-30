import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Store from "../Pages/Store/Store";
import Post from "../Pages/Post/Post";
import Carousel from "../Pages/Carousel/Carousel";
import Members from "../Pages/Members/Members";
import Administrators from "../Pages/Administrators/Administrators";
import NotFound from "../Pages/NotFound/NotFound";
import DynamicPost from "../Pages/Post/DynamicPost/DynamicPost";
import PostOutlet from "../Pages/Post/PostOutlet/PostOutlet";
import PostFilteredStoreProvider from "../Contexts/PostContext/PostFilteredStoreProvider";
import { hasValidity } from "../Utils/hasValidity";
import Login from "../Pages/Login/Login";
import PrivateRoute from "../Components/PrivateRoute/PrivateRoute";
import EditStore from "../Pages/EditStore/EditStore";
import AddNewPost from "../Pages/Post/AddNewPost/AddNewPost";
import InActiveUser from "../Pages/Login/InActiveUser/InActiveUser";
import Secured from "../Pages/Login/Secured/Secured";
import CreateStore from "../Pages/CreateStore/CreateStore";
import EditPost from "../Pages/Post/EditPost/EditPost";
import ViewStore from "../Pages/Store/ViewStore/ViewStore";
import EditStoreHowToUse from "../Pages/EditStore/EditStoreHowToUse/EditStoreHowToUse";
import CreateStoreHowToUse from "../Pages/CreateStore/CreateStoreHowToUse/CreateStoreHowToUse";
import fetchStoreDataAtRouterLevel from "../Utils/fetchDataAtRouterLevel";
import ViewStoreOutlet from "../Pages/Store/ViewStore/ViewStoreOutletShowPosts/ViewStoreOutletShowPosts";
import ViewStoreOutletHowToUse from "../Pages/Store/ViewStore/ViewStoreOutletHowToUse/ViewStoreOutletHowToUse";
import PostModalsProvider from "../Contexts/PostModalContext/PostModalContext";
import OnlineStore from "../Pages/OnlineStore/OnlineStore";
import Brand from "../Pages/Brand/Brand";
import DemoMenu from "../Pages/DemoMenu";

const Routes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <PrivateRoute>
          <PostModalsProvider>
            <MainLayout />
          </PostModalsProvider>
        </PrivateRoute>
      ),
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/onlinestore",
          element: <OnlineStore />,
        },
        {
          path: "/brands",
          element: <Brand />,
        },
        {
          path: "demomenu",
          element: <DemoMenu />,
        },
        {
          path: "/store",
          element: <Store />,
        },
        {
          path: "/store/:id/",
          loader: async ({ params }) => fetchStoreDataAtRouterLevel(params.id),
          element: <ViewStore />,
          children: [
            {
              path: "",
              loader: async ({ params }) =>
                fetchStoreDataAtRouterLevel(params.id),
              element: <ViewStoreOutlet query={`${hasValidity()}`} />,
            },
            {
              path: "coupons",
              loader: async ({ params }) =>
                fetchStoreDataAtRouterLevel(params.id),
              element: (
                <ViewStoreOutlet query={`${hasValidity()}&postType=coupon`} />
              ),
            },
            {
              path: "deals",
              loader: async ({ params }) =>
                fetchStoreDataAtRouterLevel(params.id),
              element: (
                <ViewStoreOutlet query={`${hasValidity()}&postType=deal`} />
              ),
            },
            {
              path: "expired",
              loader: async ({ params }) =>
                fetchStoreDataAtRouterLevel(params.id),
              element: (
                <ViewStoreOutlet query={`expireDate[lt]=${new Date()}`} />
              ),
            },
            {
              path: "howtouse",
              loader: async ({ params }) =>
                fetchStoreDataAtRouterLevel(params.id),
              element: <ViewStoreOutletHowToUse />,
            },
          ],
        },
        {
          path: "/store/create",
          element: <CreateStore />,
        },
        {
          path: "/store/create/howtouse/:id",
          element: <CreateStoreHowToUse />,
        },
        {
          path: "/store/edit/:id",
          element: <EditStore />,
        },
        {
          path: "/store/edit/howtouse/:id",
          loader: async ({ params }) => fetchStoreDataAtRouterLevel(params.id),
          element: <EditStoreHowToUse />,
        },
        {
          path: "/post",
          element: (
            <PostFilteredStoreProvider>
              <Post />
            </PostFilteredStoreProvider>
          ),
          children: [
            {
              path: "",
              element: <PostOutlet query={`${hasValidity()}`} />,
            },
            {
              path: "coupons",
              element: (
                <PostOutlet query={`${hasValidity()}&postType=coupon`} />
              ),
            },
            {
              path: "deals",
              element: <PostOutlet query={`${hasValidity()}&postType=deal`} />,
            },
            {
              path: "expired",
              element: <PostOutlet query={`expireDate[lt]=${new Date()}`} />,
            },
          ],
        },
        {
          path: "/post/create",
          element: <AddNewPost />,
        },
        {
          path: "/post/editpost/:id",
          element: <EditPost />,
        },

        {
          path: "/post/:id",
          element: <DynamicPost />,
        },
        {
          path: "/carousel",
          element: <Carousel />,
        },

        {
          path: "/members",
          element: <Members />,
        },
        {
          path: "/administrators",
          element: <Administrators />,
        },

        {
          path: "/howtouse",
          element: <CreateStoreHowToUse />,
        },
      ],
    },
    {
      path: "/inactive",
      element: <InActiveUser />,
    },
    {
      path: "/secured",
      element: <Secured />,
    },
    {
      path: "/login",
      element: <Login></Login>,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Routes;
