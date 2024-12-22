import Providers from './providers';

export const metadata = {
	title: 'TinyGS Map'
};

export default function RootLayout({ children }) {
	return <Providers>{children}</Providers>;
}
