import React from "react";
import ProLayout, { PageContainer, DefaultFooter } from "@ant-design/pro-layout";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { Avatar, Dropdown } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  // Функция для рендера меню пользователя
  const menu = [
    {
      key: "profile",
      label: "Профиль",
    },
    {
      key: "settings",
      label: "Настройки",
    },
    {
      key: "logout",
      label: "Выйти",
      onClick: () => {
        // Добавьте здесь логику для выхода из системы
      },
    },
  ];

  // Определение элементов меню для ProLayout
  const menuItems = [
    {
      path: "/",
      name: "Главная",
      icon: <HomeOutlined />,
    },
    {
      path: "/2",
      name: "Главная 2",
      icon: <HomeOutlined />,
    },
    // Добавьте дополнительные пункты меню здесь
  ];

  return (
    <ProLayout
      title="Админ Панель"
      logo="https://placehold.co/120x60"
      onMenuHeaderClick={() => navigate("/")}
      menuItemRender={(item, dom) => (item.path ? <Link to={item.path}>{dom}</Link> : dom)}
      breadcrumbRender={(routers = []) => [
        {
          path: "/",
          breadcrumbName: "Главная",
        },
        ...routers,
      ]}
      itemRender={(route, _params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? <Link to={paths.join("/")}>{route.breadcrumbName}</Link> : <span>{route.breadcrumbName}</span>;
      }}
      menuDataRender={() => menuItems}
      actionsRender={() => [
        <div>
          <Dropdown menu={{ items: menu }}>
            <Avatar style={{ backgroundColor: "#87d068" }} icon={<UserOutlined />} />
          </Dropdown>
        </div>,
      ]}
      footerRender={() => (
        <DefaultFooter
          links={[
            {
              key: "Ant Design Pro",
              title: "Ant Design Pro",
              href: "https://pro.ant.design",
              blankTarget: true,
            },
            // Добавьте дополнительные ссылки здесь
          ]}
        />
      )}
    >
      <PageContainer>
        <Outlet /> {/* Здесь будут отображаться ваши страницы */}
      </PageContainer>
    </ProLayout>
  );
};

export default AdminLayout;
