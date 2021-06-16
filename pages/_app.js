import "../styles/global.css";
import Head from 'next/head';
import Tracking from "../components/tracking";

export default function App({ Component, pageProps }) {
	return (
		<Tracking>
		    <Head>
				<title>David Zhang | Full Stack Developer</title>
			</Head>
			<Component {...pageProps} />
		</Tracking>
	);
}
