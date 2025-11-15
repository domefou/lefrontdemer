import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import '../styles/app.scss';


import NavBar from "./navBar";
import NavBarUser from "./connect/navBarUser";
import NavBarAdmin from "./connect/navBarAdmin";

import Footer from "./footer";
import FooterUser from "./connect/footerUser";
import FooterAdmin from "./connect/footerAdmin";

const Layout = ({ children }) => {
    const { user } = useContext(AuthContext);

    let footer;
    let nav;
    if (!user) {
        nav = <NavBar />;
        footer = <Footer />;
    } else if (user.role === "admin") {
        nav = <NavBarAdmin />;
        footer = <FooterAdmin />
    } else {
        nav = <NavBarUser />;
        footer = <FooterUser />
    }



    return (
        <div className="main">
            {nav}
            {children}
            {footer}
        </div>
    );
};

export default Layout;
