"use client";
// @ts-ignore
import React, { useEffect } from "react";
import { useFormState } from "react-dom";
// @ts-ignore
import { API_IAM } from "@/apiUrls/iam";
import { login } from "@/app/actions/iam";
import { getErrorMessage } from "@/services/api";
import { UserServices } from "@/services/iam";
import { LoginInputs } from "@/services/iam/type";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Carousel,
  Flex,
  Form,
  Input,
  Typography,
  message,
} from "antd";
import Image from "next/image";
import Link from "next/link";
import logo1 from "public/login_1.jpg";
import logo2 from "public/login_2.jpg";
import logo3 from "public/login_3.jpg";
import { SubmitHandler, useForm } from "react-hook-form";
import styled, { useTheme } from "styled-components";
import SubmitButton from "./submitButton";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCookies } from "react-cookie";
const Slide = styled(Carousel)`
  & .slick-track {
    height: 100vh;
  }
  & img {
    height: 100%;
    width: 100%;
  }
`;
const initialState = {
  username: null,
  password: null,
};
export default function LoginForm() {
  const t = useTranslations();
  const [cookies, setCookie] = useCookies();
  const [state, formAction] = useFormState(login, initialState);
  const [messageApi, contextHolder] = message.useMessage();
  const theme = useTheme();
  const router = useRouter();
  const onFinish = async (values: any) => {
    //formAction(values);
    try {
      const res = await UserServices.login(values);
      // debugger;
      // setCookie('token', res.accessToken, {
      //   // httpOnly: true,
      //   // path: '/',
      //   // sameSite: 'lax',
      // });
      // setCookie('refresh_token', res.refreshToken);
      router.push("/");
    } catch (ex: any) {
      message.error(getErrorMessage(ex));
    }

    // console.log('Received values of form: ', values);
  };
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm<LoginInputs>();
  // const onSubmit: SubmitHandler<LoginInputs> = (data) => console.log(data);
  return (
    // <Form action={formAction}>
    // {/* <label htmlFor="username">Tên đăng nhập</label>
    // <input type="text" id="username" name="username" required />
    // <label htmlFor="password">Mật khẩu</label>
    // <input type="text" id="password" name="password" required />
    // <SubmitButton />
    // <p aria-live="polite" className="sr-only" role="status">
    //   {state?.message}
    // </p> */}
    <Flex>
      {/* <div style={{ height: "100vh", minWidth: "30px", flex: 1 }}>
        <Slide>
          <div>
            <Image
              loading="lazy"
              src={logo1}
              alt="ảnh 1"
              // sizes="(max-width:768px) 768px 768px"
            />
          </div>
          <div>
            <Image loading="lazy" src={logo2} alt="ảnh 2" />
          </div>
          <div>
            <Image loading="lazy" src={logo3} alt="ảnh 3" />
          </div>
        </Slide>
      </div> */}
      <Flex
        align="center"
        justify="center"
        style={{
          minHeight: "100vh",
          width: "100%",
          justifyContent: "center",
          backgroundImage: "url(/light/background.svg)",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Card bordered={false}>
          <Form
            style={{
              width: "400px",
              padding: theme.token.sizeMD,
              backgroundColor: "#fff",
            }}
            // action={formAction}
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            {/* <Typography.Title level={4}>{t("login-title")}</Typography.Title> */}
            <Image
              src={"/images/Islamic_Bank_of_Thailand_Logo.png"}
              width={360}
              height={90}
              alt="Islamic Bank"
              style={{ marginBottom: theme.token.sizeMD }}
            ></Image>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                size="large"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                size="large"
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            {/* <Form.Item>
          <a className="login-form-forgot" href="#">
            Forgot password
          </a>
        </Form.Item> */}
            <Form.Item>
              <SubmitButton />
            </Form.Item>
          </Form>
        </Card>
      </Flex>
    </Flex>
  );
}
