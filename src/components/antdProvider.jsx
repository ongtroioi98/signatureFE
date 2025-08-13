"use client";
import useThemeStore from "@/store/theme";
import { getTheme, THEMES } from "@/theme";
import { theme as antdTheme, ConfigProvider } from "antd";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import "@/app/globals.css";
const { useToken, darkAlgorithm } = antdTheme;
import { StompSessionProvider } from "react-stomp-hooks";

const Container = styled.div`
  & #topBackgroundImage {
    background-image: url("${(props) => props.theme.topBackgroundImage}");
    background-repeat: no-repeat;
    background-size: cover;
  }
`;
export default function AntdProvider({
  children,
  defaultTheme,
  defaultThemeData,
}) {
  const { toggleTheme, theme } = useThemeStore();
  const [themeTokens, setThemeTokens] = useState(defaultThemeData);
  const { token } = useToken();
  const [oldTheme, setOldTheme] = useState();
  function beforeConnect() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const token =
          "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbmxvY2FsIiwiYXVkIjpbIm9hdXRoMi1yZXNvdXJjZSJdLCJ1c2VyX25hbWUiOiJhZG1pbmxvY2FsIiwic2NvcGUiOlsicmVhZCJdLCJleHAiOjE3MjczMzgzNjIsImlhdCI6MTcyNzMzNDc2MiwianRpIjoiMGRlNTQxYWMtYTRhZS00ZTQ2LWE2YTEtMzFjNzM0ZTViOWFlIiwiY2xpZW50X2lkIjoiZGVhZGJlZWYtZGVhZC1iZWVmLWRlYWQtYmVlZmRlYWRiZWVmIn0.EQfhVU5q598FaEEievoG7VVinyvf_GiSAjTRNvR_96KJhAsDFMViJajzCyC1pUPlx76LYVwG9EyH3GJu7gSymreokXBcmX4YvoZN1d3mpUsGwK-Gm8YUU9WiDaIl7eXfyH0LrZYO_aENmv6XGRhxMGCZSBxIZay9Be3SbeDbdJg6j61_QWNV5WU85ppsi7hAXsy2pASY5MemCGm6cKb7fLBJPYzPt0bH-fWhCGtGNbXhClAgHZyNCdAVYOLuLFSVVB4EUhNIhQ2E7oXvO9UkJfH0S8rzbxs40O3PMZlHgepf4eJksC2UN_YOzn-KuyjBieSf_NaLyn9qqqERm2zvqA";
        this.connectHeaders = {
          Authorization: "Bearer " + token,
        };
        resolve();
      }, 1000);
    });
  }
  if (defaultTheme !== oldTheme) {
    toggleTheme(defaultTheme);
    setOldTheme(defaultTheme);
    setThemeTokens(defaultThemeData);
  }

  useEffect(() => {
    const themeData = getTheme(theme);
    setThemeTokens(themeData);
  }, [theme]);
  themeTokens.hashed = false; // fix https://github.com/ant-design/ant-design/discussions/38753 make hydrating error
  themeTokens.cssVar = true;
  if (!theme || theme == THEMES.dark) {
    // themeTokens.algorithm = darkAlgorithm;
  } else {
    themeTokens.algorithm = null;
  }
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    if (
      typeof window !== "undefined" &&
      document.getElementById("holderStyle")
    ) {
      document.getElementById("holderStyle")?.remove();
    }
    AOS.init({
      duration: 1200, // Set animation duration
      once: true, // Whether animation should happen only once,
    });
  }, []);
  return (
    <ConfigProvider theme={themeTokens}>
      <style
        id="holderStyle"
        dangerouslySetInnerHTML={{
          __html: `
                    *, *::before, *::after {
                        transition: none!important;
                    }
                    `,
        }}
      />
      <ThemeProvider theme={{ token, ...themeTokens.token }}>
        {/* <StompSessionProvider
          url={
            'https://uat-vpm.vinhomes.vn/api/notification/v0/websocket?token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbmxvY2FsIiwiYXVkIjpbIm9hdXRoMi1yZXNvdXJjZSJdLCJ1c2VyX25hbWUiOiJhZG1pbmxvY2FsIiwic2NvcGUiOlsicmVhZCJdLCJleHAiOjE3MjczMzgzNjIsImlhdCI6MTcyNzMzNDc2MiwianRpIjoiMGRlNTQxYWMtYTRhZS00ZTQ2LWE2YTEtMzFjNzM0ZTViOWFlIiwiY2xpZW50X2lkIjoiZGVhZGJlZWYtZGVhZC1iZWVmLWRlYWQtYmVlZmRlYWRiZWVmIn0.EQfhVU5q598FaEEievoG7VVinyvf_GiSAjTRNvR_96KJhAsDFMViJajzCyC1pUPlx76LYVwG9EyH3GJu7gSymreokXBcmX4YvoZN1d3mpUsGwK-Gm8YUU9WiDaIl7eXfyH0LrZYO_aENmv6XGRhxMGCZSBxIZay9Be3SbeDbdJg6j61_QWNV5WU85ppsi7hAXsy2pASY5MemCGm6cKb7fLBJPYzPt0bH-fWhCGtGNbXhClAgHZyNCdAVYOLuLFSVVB4EUhNIhQ2E7oXvO9UkJfH0S8rzbxs40O3PMZlHgepf4eJksC2UN_YOzn-KuyjBieSf_NaLyn9qqqERm2zvqA'
          }
          beforeConnect={beforeConnect}
          // header={{ 'Access-Control-Allow-Credentials': false }}
          debug={(e) => {
            console.log('debug.....', e);
          }}
        > */}
        <Container
          style={{
            // backgroundImage: "url('/images/background.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "fit-content",
            minHeight: "100%",
            width: "100%",
            visibility: !mounted ? "hidden" : "visible",
            // maxWidth: '1200px',
            margin: "auto",
          }}
        >
          {children}
        </Container>
        {/* </StompSessionProvider> */}
      </ThemeProvider>
    </ConfigProvider>
  );
}
