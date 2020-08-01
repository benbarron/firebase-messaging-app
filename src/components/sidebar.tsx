import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { ReduxState } from '../redux/state';
import { Menu } from 'antd';
import { AppstoreOutlined, UsergroupAddOutlined, SettingOutlined } from '@ant-design/icons';

interface SideBarProps extends RouteComponentProps {
  collapsed: boolean;
}

const SideBar: FC<SideBarProps> = (props: SideBarProps): JSX.Element => {
  return (
    <>
      <Menu
        className='sidenav'
        onClick={() => true}
        defaultOpenKeys={[]}
        mode='inline'
        inlineCollapsed={props.collapsed}
      >
        <Menu.SubMenu
          key='sub1'
          title={
            <span>
              <UsergroupAddOutlined />
              <span>Groups</span>
            </span>
          }
        >
          <Menu.Item key='1'>Group 1</Menu.Item>
          <Menu.Item key='2'>Group 2</Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu
          key='sub4'
          title={
            <span>
              <SettingOutlined />
              <span>Settings</span>
            </span>
          }
        >
          <Menu.Item key='9'>Setting 1</Menu.Item>
          <Menu.Item key='10'>Option 2</Menu.Item>
          <Menu.Item key='11'>Option 3</Menu.Item>
          <Menu.Item key='12'>Option 4</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </>
  );
};

const mapStateToProps = (state: ReduxState) => ({});

const mapDispatchToProps = {};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideBar));
