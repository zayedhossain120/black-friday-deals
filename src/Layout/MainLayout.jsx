/* eslint-disable react/prop-types */

import "./MainLayout.css";
import { Layout } from "antd";
import { Outlet } from "react-router";
import MenuBar from "../Components/Nav/MenuBar/MenuBar";
import colors from "../Utils/variables/colorVariables";
import { useViewportSize } from "@mantine/hooks";
const MainLayout = () => {
  const { Content, Sider } = Layout;
  const { width } = useViewportSize();
  return (
    <Layout
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{
          height: "100%",
          backgroundColor: colors.bgContainer,
          marginRight: "1px",
          position: width > 991 ? "relative" : "absolute",
          zIndex: "1000",
        }}
      >
        <MenuBar />
      </Sider>
      <Layout>
        <Content className="main-content-container">
          <div>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
