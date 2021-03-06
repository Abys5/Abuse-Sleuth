import { AppShell } from "@abuse-sleuth/ui";

import Header from "@components/nav/Header";

const DefaultLayout: React.FC = (props) => {
    return (
        <AppShell
            sx={(theme) => ({
                height: "100vh",
            })}
            padding={0}
            header={<Header />}>
            {props.children}
        </AppShell>
    );
};

export default DefaultLayout;
