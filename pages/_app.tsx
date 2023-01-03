import {FC} from "react";
import {AppProps} from "next/app";
import {Provider} from "react-redux";
import {wrapper} from "../store";

const MyApp: FC<AppProps> = ({Component, ...rest}) => {
    const {store, props} = wrapper.useWrappedStore(rest);
    return (
        <Provider store={store}>
            <Component {...props.pageProps} />
    </Provider>
)}

export default MyApp