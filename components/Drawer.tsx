import React, { Dispatch, ReactNode, SetStateAction, useRef, useState } from 'react';
import { DrawerLayoutAndroid, Text, StyleSheet, View, Pressable, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import addNote from '../Helper/addNote';
interface Props {
	theRoute: string;
	children: ReactNode;
	updateList: Dispatch<SetStateAction<any[]>>;
}
export default function Drawer({ children, theRoute, updateList }: Props) {
	const drawer = useRef<any>(null);
	const [val, setval] = useState<string>('');
	const navigationView = () => (
		<View style={[styles.container, styles.navigationContainer]}>
			<View style={styles.paragraph}>
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
					style={{
						flex: 1,
						alignItems: 'flex-start',
						justifyContent: 'flex-start',
						textAlign: 'left',
						textAlignVertical: 'top',
					}}
				/>
			</View>
			<Pressable
				style={styles.theButton}
				onPress={() => {
					addNote({ noteVal: val, page: theRoute, updateList: updateList });
					drawer.current.closeDrawer();
				}}
			>
				<Text style={styles.buttonText}>
					<Icon name="pluscircleo" size={50} color="#34d399" />
				</Text>
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
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
	},
	navigationContainer: {
		borderRadius: 10,
		borderColor: 'transparent',
		backgroundColor: '#475569b3',
	},
	paragraph: {
		padding: 11,
		fontSize: 15,
		width: '100%',
		height: '70%',
		borderRadius: 10,
		backgroundColor: 'white',
	},
	theButton: {
		marginTop: 22,
	},
	buttonText: {
		fontWeight: 'bold',
	},
});
