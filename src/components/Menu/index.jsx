'use client';
import React from 'react';
import { menuData } from './constant';
import MenuItem from './menuItem';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { Flex } from 'antd';
import DarkModeSwitch from '@/theme/darkModeSwitch';
import LocaleSwitch from '../LocaleSwitch';
const MenuContainer = styled.ul`
  ${(props) => `
    text-transform: uppercase;
    display: flex;   
   gap: 8px;
   margin:0;
  .menu-item {
    padding: 12px;
    text-decoration: none;
    color:${props.theme.colorLink};
    &:hover {
      color: ${props.theme.colorLinkHover};
    }
  }
    @media(max-width:768px){
      &{
          flex-direction: column;
          margin:0;
          position: fixed;
          left: 0px;
          top: 65px;
          width: 100%;
          background: #101624;
          z-index:2;
          padding:16px;
          animation: all 0.5s ease-in-out;
      }
      &.hide{
        display:none;
      }
    }
`}
`;
export default function Menu({ hiden, onMenuItemClick }) {
  return (
    <MenuContainer
      className={hiden ? 'hide' : ''}
      data-aos="fade-down"
      data-aos-duration="1000"
    >
      {menuData.map((item) => (
        <MenuItem item={item} key={item.key} onClick={onMenuItemClick} />
      ))}
      <Flex
        gap={16}
        className="showOnMobile"
        align="center"
        justify="end"
        style={{ marginLeft: '16px' }}
      >
        <DarkModeSwitch />
        <LocaleSwitch />
      </Flex>
    </MenuContainer>
  );
}
