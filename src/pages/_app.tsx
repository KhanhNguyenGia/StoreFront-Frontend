import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import store from '../store/store';
import { Nunito } from '@next/font/google';
import { SessionProvider } from 'next-auth/react';

// core
import 'primereact/resources/primereact.min.css';
// tailwind theme
import '../../node_modules/primereact/resources/themes/tailwind-light/theme.css';
// icon
import 'primeicons/primeicons.css';
import '@/styles/globals.css';

const nunito = Nunito({ subsets: ['vietnamese', 'latin'], variable: '--font-family' });

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<SessionProvider session={session}>
			{/* <Provider store={store}> */}
			<style jsx global>
				{`
					html,
					.p-component {
						font-family: ${nunito.style.fontFamily};
					}
				`}
			</style>
			<Component {...pageProps} />
			{/* </Provider> */}
		</SessionProvider>
	);
}
