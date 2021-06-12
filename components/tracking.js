import { useEffect } from "react";
import { useRouter } from "next/router";
import * as gtag from "../lib/gtag";
import * as gtm from "../lib/gtm";

const handleRouteChange = (url) => {
	gtag.pageview(url);
    gtm.pageview(url);
};

const Tracking = ({ children }) => {
	const router = useRouter();

	useEffect(() => {
        // gtag.pageview('/');
        // gtm.pageview('/');

		router.events.on("routeChangeComplete", handleRouteChange);
		return () => {
			router.events.off("routeChangeComplete", handleRouteChange);
		};
	}, [router.events]);

	return children;
};

export default Tracking;
