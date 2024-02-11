import { Pressable } from 'react-native';
import { Text, View } from '../components';
import { RootStackScreenProps } from '../types';
type NavType = RootStackScreenProps<'NotFound'>;
export const NotFoundScreen = ({ navigation }: NavType) => {
	return (
		<View className="flex-1 items-center justify-center p-4">
			<Text className="text-lg font-bold">This screen doesn't exist.</Text>
			<Pressable onPress={() => navigation.replace('Root')} className="mt-2 pt-2">
				<Text className="text-brand-green ">Go to home screen!</Text>
			</Pressable>
		</View>
	);
};
