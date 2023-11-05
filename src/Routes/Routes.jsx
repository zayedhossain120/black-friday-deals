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
import Category from "../Pages/Category/Category";
import Network from "../Pages/Network/Network";
import ProductCreate from "../Pages/ProductCreate/ProductCreate";
import ProductDeal from "../Pages/Post/ProductDeal/ProductDeal";
import Campaign from "../Pages/Campaign/Campaign";
import ViewCampaign from "../Pages/Campaign/ViewCampaign/ViewCampaign";
import CreateCampaign from "../Pages/CreateCampaign/CreateCampaign";
import ViewCampaignOutlet from "../Pages/Campaign/ViewCampaign/ViewCampaignOutletShowPosts/ViewCampaignOutletShowPosts";
import fetchBrandDataAtRouterLevel from "../Utils/variables/fetchBrandDataAtRouterLevel";
import Brand from "../Pages/Brand/Brand";
import fetchCampaignDataAtRouterLevel from "../Utils/variables/fetchCampaignDataAtRouterLevel";
import ViewBrand from "../Pages/Brand/ViewBrand/ViewBrand";
import EditBrand from "../Pages/EditBrand/EditBrand";
import EditBrandHowToUse from "../Pages/EditBrand/EditBrandHowToUse/EditBrandHowToUse";
import CreateBrand from "../Pages/CreateBrand/CreateBrand";
import CreateBrandHowToUse from "../Pages/CreateBrand/CreateBrandHowToUse/CreateBrandHowToUse";

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
          path: "/brands",
          element: <Brand />,
        },
        {
          path: "/brands/:id/",
          loader: async ({ params }) => fetchBrandDataAtRouterLevel(params.id),
          element: <ViewBrand />,
          children: [
            {
              path: "",
              loader: async ({ params }) =>
                fetchBrandDataAtRouterLevel(params.id),
              element: <ViewStoreOutlet query={`${hasValidity()}`} />,
            },
            {
              path: "coupons",
              loader: async ({ params }) =>
                fetchBrandDataAtRouterLevel(params.id),
              element: (
                <ViewStoreOutlet query={`${hasValidity()}&postType=Coupon`} />
              ),
            },
            {
              path: "deals",
              loader: async ({ params }) =>
                fetchBrandDataAtRouterLevel(params.id),
              element: (
                <ViewStoreOutlet query={`${hasValidity()}&postType=Deal`} />
              ),
            },
            {
              path: "voucher",
              loader: async ({ params }) =>
                fetchBrandDataAtRouterLevel(params.id),
              element: (
                <ViewStoreOutlet query={`${hasValidity()}&postType=Voucher`} />
              ),
            },
            {
              path: "expired",
              loader: async ({ params }) =>
                fetchBrandDataAtRouterLevel(params.id),
              element: (
                <ViewStoreOutlet query={`expireDate[lt]=${new Date()}`} />
              ),
            },
          ],
        },
        {
          path: "/brands/edit/:id",
          element: <EditBrand />,
        },
        {
          path: "/brands/edit/howtouse/:id",
          loader: async ({ params }) => fetchBrandDataAtRouterLevel(params.id),
          element: <EditBrandHowToUse />,
        },
        {
          path: "/brands/create",
          element: <CreateBrand />,
        },
        {
          path: "/brands/create/howtouse/:id",
          element: <CreateBrandHowToUse />,
        },
        {
          path: "/campaign",
          element: <Campaign />,
        },
        {
          path: "/campaign/:id/",
          loader: async ({ params }) =>
            fetchCampaignDataAtRouterLevel(params.id),
          element: <ViewCampaign />,
          children: [
            {
              path: "",
              loader: async ({ params }) =>
                fetchCampaignDataAtRouterLevel(params.id),
              element: <ViewCampaignOutlet query={`${hasValidity()}`} />,
            },
            {
              path: "deal",
              loader: async ({ params }) =>
                fetchCampaignDataAtRouterLevel(params.id),
              element: (
                <ViewCampaignOutlet query={`${hasValidity()}&postType=deal`} />
              ),
            },
            {
              path: "coupon",
              loader: async ({ params }) =>
                fetchCampaignDataAtRouterLevel(params.id),
              element: (
                <ViewCampaignOutlet
                  query={`${hasValidity()}&postType=coupon`}
                />
              ),
            },
            {
              path: "expired",
              loader: async ({ params }) =>
                fetchCampaignDataAtRouterLevel(params.id),
              element: (
                <ViewCampaignOutlet query={`expireDate[lt]=${new Date()}`} />
              ),
            },
            {
              path: "voucher",
              loader: async ({ params }) =>
                fetchCampaignDataAtRouterLevel(params.id),
              element: (
                <ViewCampaignOutlet query={`${new Date()}=&postType=voucher`} />
              ),
            },
          ],
        },
        {
          path: "/campaign/create",
          element: <CreateCampaign />,
        },
        {
          path: "/store",
          element: <OnlineStore />,
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
                <ViewStoreOutlet query={`${hasValidity()}&postType=Coupon`} />
              ),
            },
            {
              path: "deals",
              loader: async ({ params }) =>
                fetchStoreDataAtRouterLevel(params.id),
              element: (
                <ViewStoreOutlet query={`${hasValidity()}&postType=Deal`} />
              ),
            },
            {
              path: "voucher",
              loader: async ({ params }) =>
                fetchStoreDataAtRouterLevel(params.id),
              element: (
                <ViewStoreOutlet query={`${hasValidity()}&postType=Voucher`} />
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
          path: "/retailer/category",
          element: <Category />,
        },
        {
          path: "/retailer/network",
          element: <Network />,
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
              path: "voucher",
              element: (
                <PostOutlet query={`${hasValidity()}&postType=voucher`} />
              ),
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
          path: "/product/create",
          element: <ProductCreate />,
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
        {
          path: "/productdeal",
          element: <ProductDeal />,
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
