import { Outlet } from "react-router";
import Header from "../core-components/header";
import MainContent from "../core-components/main-content";
import Footer from "../core-components/footer";
import Container from "../components/container";

export default function LayoutMain() {
  return (
    <>
      <Header />

      <MainContent>
        <Container className="space-y-8">
          <Outlet />
        </Container>
      </MainContent>

      <Footer />
    </>
  );
}
