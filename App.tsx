import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme } from './hooks';

import Navigation from './navigation';

export default function App() {
	const colorScheme = useColorScheme();

	return (
		<SafeAreaProvider>
			<Navigation colorScheme={colorScheme} />
			<StatusBar />
		</SafeAreaProvider>
	);
}
