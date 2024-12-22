import '@mantine/core/styles.css';
import { createTheme, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { ColorSchemeScript } from '@mantine/core';

const theme = createTheme({
	primaryColor: 'yellow',
	defaultGradient: {
		from: 'yellow',
		to: 'orange',
		deg: 45
	}
});

export default function Providers({ children }) {
	return (
		<html lang="en" {...mantineHtmlProps}>
			<head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>TinyGS Map</title>

				<ColorSchemeScript defaultColorScheme="dark" />
			</head>
			<body>
				<MantineProvider defaultColorScheme="dark" theme={theme}>
					{children}
				</MantineProvider>
			</body>
		</html>
	);
}
