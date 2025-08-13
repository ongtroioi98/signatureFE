import Counter from "@/components/Counter/wrap";
import Header from "@/components/Header";
import Portfolio from "@/pagesComponent/portfolio";
import StartUpChecker from "@/components/startupChecker";
import { getTranslations } from "next-intl/server";
import MainLayout from "@/components/layouts/main";
import { Card, Flex, Typography } from "antd";
import SignatureTable from "@/pagesComponent/Signature";
export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "vi" }];
}
export default async function Page({ params: { locale } }) {
  // const t = await getTranslations();
  console.log("page render....");
  return (
    <>
      {/* <Header /> */}
      <Flex
        id="topBackgroundImage"
        style={{
          height: "100vh",
          width: "100%",
          // maxWidth: '1200px',
          margin: "auto",
        }}
        vertical
      >
        <StartUpChecker />
        {/* <Portfolio /> */}
      </Flex>
      {/* <Flex
        vertical
        gap={60}
        style={{
          backgroundColor: "var(--ant-default-bg)",
          justifyContent: "center",
        }}
      > */}
      <Flex gap={16}>
        <Card style={{ minWidth: "40%" }} bordered={false}>
          <h3>
            <b>Demonstration Flows Flow 1</b>
          </h3>
          <p>
            – Signature Image Upload Demonstrates the ability for authorized
            users to log into the system, select customer or employee signature
            images, and securely upload them. The images are stored in the
            database and linked to the relevant user record for future
            verification.
          </p>
          <h3>
            <b> Flow 2 – System Integration via SFTP </b>
          </h3>
          <p>
            Showcases integration with external systems through secure SFTP file
            transfer. At a scheduled time, files are automatically retrieved
            from a source location and transferred to the designated SFTP
            destination, enabling seamless data exchange.
          </p>
          <h3>
            <b> Flow 3 – Maker–Checker–Approver for Signature Verification</b>
          </h3>
          <p>
            Illustrates the end-to-end approval workflow. An authorized user
            searches for a customer signature by ID, obtains necessary approval
            to access it, and initiates an AI-powered similarity check. The
            system compares the retrieved signature against the reference image,
            applying a predefined threshold. If the similarity score falls below
            the threshold, the system flags the result for further review.
          </p>
        </Card>
        <Card bordered={false} style={{ width: "60%" }}>
          <SignatureTable />
        </Card>
      </Flex>

      {/* </Flex> */}
    </>
  );
}
