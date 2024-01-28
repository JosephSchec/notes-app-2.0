import React, { Dispatch, ReactNode, SetStateAction, useRef, useState } from 'react';
import { DrawerLayoutAndroid, View, Pressable, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import addNote from '../Helper/addNote';
interface Props {
	theRoute: string;
	children: ReactNode;
	updateList: Dispatch<SetStateAction<any[]>>;
}
export const Drawer = ({ children, theRoute, updateList }: Props) => {
	const drawer = useRef<any>(null);
	const [val, setval] = useState<string>('');
	const navigationView = () => (
		<View className="flex-1 items-center  rounded-lg border-transparent bg-brand-light p-2">
			<View className="h-3/4 w-full rounded-md bg-white p-2">
				<TextInput
					multiline={true}
					numberOfLines={10}
					onChangeText={(text) => setval(text)}
					editable={true}
					autoFocus={true}
					selectTextOnFocus={true}
					textAlign="left"
					placeholder={`in ${theRoute}`}
					value={val}
					className="h-full flex-1 content-start items-start justify-start align-top"
				/>
			</View>
			<Pressable
				className="mt-8"
				onPress={() => {
					addNote({ noteVal: val, page: theRoute, updateList });
					drawer.current.closeDrawer();
				}}
			>
				<Icon name="pluscircleo" size={50} color="#34d399" />
			</Pressable>
		</View>
	);

	return (
		<DrawerLayoutAndroid
			ref={drawer}
			drawerWidth={300}
			drawerPosition="right"
			drawerBackgroundColor="transparent"
			renderNavigationView={navigationView}
			onDrawerClose={() => setval('')}
		>
			{children}
		</DrawerLayoutAndroid>
	);
};
