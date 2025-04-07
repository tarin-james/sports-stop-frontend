import { Footer } from "./Footer";
import { Header } from "./Header";
import AuthProvider from "../auth/AuthProvider";

export function Layout({ children }) {
  return (
    <AuthProvider>
      <Header></Header>
      {children}
      <Footer></Footer>
    </AuthProvider>
  );
}
