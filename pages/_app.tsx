import {FC} from "react";
import {AppProps} from "next/app";
import {Provider} from "react-redux";
import {wrapper} from "../store";
import {SnackbarProvider} from "notistack";

// Object.assign(globalThis, {
//     fetch,
//     Headers,
//     Request,
//     Response,
//     AbortController,
// });

const MyApp: FC<AppProps> = ({Component, ...rest}) => {
    const {store, props} = wrapper.useWrappedStore(rest);
    return (
        <SnackbarProvider maxSnack={3} preventDuplicate>
            <Provider store={store}>
                <Component {...props.pageProps} />
            </Provider>
        </SnackbarProvider>
    )
}

export default MyApp