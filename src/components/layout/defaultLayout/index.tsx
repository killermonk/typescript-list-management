import * as React from "react";
import { LayoutProps } from "./defaultLayout";
import Header from "@components/headers/defaultHeader";
import Footer from "@components/footers/defaultFooter";
import "./defaultLayout.scss";

const DefaultLayout : React.FunctionComponent<LayoutProps> = (props: LayoutProps) => {
    return (
        <div className="body bg-light">
            <Header/>
            <main role="main">
                { props.children }
            </main>
            <Footer/>
        </div>
    );
}


export default DefaultLayout;