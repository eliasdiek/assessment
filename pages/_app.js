import "../styles/global.css";
import Tracking from "../components/tracking";

export default function App({ Component, pageProps }) {
	return (
		<Tracking>
			<Component {...pageProps} />
		</Tracking>
	);
}
