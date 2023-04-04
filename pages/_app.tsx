import React, {useEffect} from "react";
import {AppProps} from "next/app";
import {Provider} from "react-redux";
import {wrapper} from "../store";
import {SnackbarProvider} from "notistack";


const MyApp = ({ Component, ...rest }: AppProps) => {
    const { store, props } = wrapper.useWrappedStore(rest);

    useEffect(() => {
        //console.log("store has changed");
    }, [store]);

    return (
        <SnackbarProvider maxSnack={3} preventDuplicate>
                <Provider store={store}>
                    <Component {...props.pageProps} />
                </Provider>
        </SnackbarProvider>
    )
}

export default MyApp

// MyApp.getInitialProps = wrapper.getInitialAppProps(store => async ({ ctx, Component }) => {
//     try {
// //контент
//     } catch (err) {
//         //контент
//     }
//
//     return {
//         pageProps: Component.getInitialProps ? await Component.getInitialProps({ ...ctx, store }) : {}
//     }
// })