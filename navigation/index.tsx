import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ColorSchemeName } from 'react-native';
import { NotFoundScreen } from '../screens';
import LinkingConfiguration from './LinkingConfiguration';
import React from 'react';
import BottomTab from './BottomTab';
import { RootStackParamList } from '../types';
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
	return (
		<>
			<NavigationContainer
				linking={LinkingConfiguration}
				theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
			>
				<RootNavigator />
			</NavigationContainer>
		</>
	);
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
	return (
		<>
			<Stack.Navigator
				screenOptions={{
					contentStyle: {
						backgroundColor: '#red',
					},
				}}
			>
				<Stack.Screen name="Root" component={BottomTab} options={{ headerShown: false }} />
				<Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
			</Stack.Navigator>
		</>
	);
}
