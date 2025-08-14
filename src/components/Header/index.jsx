"use client";
import { useUserStore } from "@/store/user";
import DarkModeSwitch from "../../theme/darkModeSwitch";
import LocaleSwitch from "@/components/LocaleSwitch";
// import Logo from '/images/logo.png';
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Menu from "@/components/Menu";
import { Button, Flex, Typography } from "antd";
import styled, { keyframes, useTheme } from "styled-components";
import {
  CloseOutlined,
  LogoutOutlined,
  MenuOutlined,
  PhoneOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import fetchWithAuth from "@/utils/fetchWithAuth";
const rotateIcon = keyframes`
  0% {
    opacity: 0;
    transform: rotate(0deg);
  }
  100% {
    opacity: 1;
    transform: rotate(180deg);
  }
`;
const Wrapper = styled(Flex)`
  & {
    padding: 12px;
    position: sticky;
    top: 0;
    z-index: 999;
    background-color: var(--ant-color-primary);
  }
  .icon-enter {
    animation: ${rotateIcon} 0.7s forwards;
  }
`;
const ToggleMenuButton = styled.div`
  height: 2px;
  width: 24px;
  background-color: #fff;
  position: relative;
  &.opened {
    background-color: var(--ant-default-bg);
  }
  &:before {
    content: "";
    height: 2px;
    width: 24px;
    background-color: #fff;
    left: 0;
    top: -8px;
    display: block;
    position: absolute;
    transition-property: margin, transform;
    transition-duration: 0.2s;
    transition-delay: 0.2s, 0s;
  }
  &:after {
    content: "";
    display: block;
    height: 2px;
    width: 24px;
    background-color: #fff;
    left: 0;
    bottom: -8px;
    position: absolute;
    transition-property: margin, transform;
    transition-duration: 0.2s;
    transition-delay: 0.2s, 0s;
  }
  &.opened:before {
    transform: rotate(45deg);
    top: 0px;
  }
  &.opened:after {
    transform: rotate(-45deg);
    bottom: 0px;
  }
`;
export default function Header() {
  const userInfo = useUserStore((state) => state.info);
  const [menuOpen, setMenuOpen] = useState(false);
  const [iconClass, setIconClass] = useState("");
  const theme = useTheme();
  const router = useRouter();
  const logout = async () => {
    await fetchWithAuth("/api/logout", { method: "POST" });
    router.push("/login");
  };
  return (
    <Wrapper
      justify="space-between"
      align="center"
      className="scroll-caculate-item"
    >
      <Image
        src={`/${theme?.name}/logo.png`}
        alt="logo"
        width={50}
        height={50}
      />
      <Flex className="hideMobile" flex={1} justify="center">
        <Menu hidden={false} onMenuItemClick={() => {}} />
      </Flex>
      {menuOpen && (
        <Menu
          hidden={!menuOpen}
          onMenuItemClick={() => {
            setMenuOpen(false);
          }}
        />
      )}
      <Flex align="center" gap={theme.sizeSM} justify="end">
        <Flex
          gap={16}
          className="hideMobile"
          align="center"
          style={{ marginLeft: "16px" }}
        >
          {/* <DarkModeSwitch />
          <LocaleSwitch /> */}
        </Flex>
        <Button
        title="logout"
          className=""
          type="link"
          icon={<LogoutOutlined />}
          onClick={logout}
        ></Button>
        <Typography.Text
          className="hideMobile"
          style={{ color: "var(--ant-color-link-hover)" }}
        >
          {userInfo?.userName}
        </Typography.Text>
      </Flex>

      <Button
        size="large"
        type="link"
        // id="toggleMenuButton"
        className="showOnMobile"
        onClick={() => {
          setIconClass("icon-enter");
          setMenuOpen((prev) => !prev);
        }}
        onAnimationEnd={() => setIconClass("")}
      >
        <ToggleMenuButton className={menuOpen ? "opened" : "closed"} />
      </Button>
    </Wrapper>
  );
}
