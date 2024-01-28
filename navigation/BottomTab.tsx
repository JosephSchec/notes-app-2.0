import { TodoScreen, LinkScreen } from '../screens';
import { RootTabParamList, RootTabScreenProps } from '../types';
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '../constants/Colors';
import { useColorScheme } from '../hooks';
const BottomTab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabNavigator() {
	const colorScheme = useColorScheme();
	return (
		<BottomTab.Navigator
			initialRouteName="Todo"
			screenOptions={{
				headerStyle: {
					backgroundColor: '#0f172a',
				},
				headerTitleStyle: {
					textDecorationLine: 'underline',
					textDecorationColor: 'red',
					fontWeight: 'bold',
				},

				headerShadowVisible: true,
				headerTintColor: '#6ee7b7',

				tabBarActiveTintColor: Colors[colorScheme].tint,
				tabBarActiveBackgroundColor: '#334155',
				tabBarInactiveBackgroundColor: '#0f172a',
			}}
		>
			<BottomTab.Screen
				name="Todo"
				component={TodoScreen}
				options={({ navigation }: RootTabScreenProps<'Todo'>) => ({
					title: 'Todo',
					tabBarIcon: ({ color }) => <TabBarIcon name="check-square" color={'#6ee7b7'} />,
					tabBarLabel: 'Todo',
				})}
			/>
			<BottomTab.Screen
				name="Links"
				component={LinkScreen}
				options={{
					title: 'Links',
					tabBarIcon: ({ color }) => <TabBarIcon name="link" color={'#6ee7b7'} />,
				}}
			/>
		</BottomTab.Navigator>
	);
}

function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>['name'];
	color: string;
}) {
	return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
