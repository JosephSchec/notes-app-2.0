import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Drawer from '../components/Drawer';
import Animated, { LightSpeedInLeft } from 'react-native-reanimated';
import { getLinks } from '../GraphQl/Queries';
import VirtualizedView from '../components/VirtualizedView';
import { FontAwesome } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { deleteNoteByVal } from '../GraphQl/Mutations';
import { animateOpacity, noAnimation } from '../hooks/useAnimate';
import * as WebBrowser from 'expo-web-browser';
export const LinkScreen = () => {
	const [theLinks, setTheLinks] = useState<any[]>([]);
	const [refresh, setRefresh] = useState(false);
	const [refreshedOnce, setRefreshOnce] = useState<boolean>(false);

	useEffect(() => {
		(async () => {
			let todos = await getLinks();
			let json = todos.data.neon_notes;
			setTheLinks(json);
		})();
	}, [refresh]);

	setTimeout(() => {
		setRefreshOnce(true);
	}, 1000);
	const linkPressed = async (l: string) => {
		//Linking.openURL
		return await WebBrowser.openBrowserAsync(l);
	};
	/*let eachOne = theLinks.map(td => {
    return (
      <Animated.View key={td.link} style={styles.linkCont} entering={LightSpeedInLeft}>
        <Animated.Text style={styles.link} onPress={() => Linking.openURL(td.link)}>{td.link.toString()}</Animated.Text>
      </Animated.View>
    )
  })*/
	const animate = animateOpacity;
	const dontAnimate = noAnimation;
	return (
		<>
			<Drawer theRoute="/linklist" updateList={setTheLinks}>
				<VirtualizedView setRefresh={setRefresh} refresh={refresh}>
					<ScrollView style={styles.container}>
						<SwipeListView
							data={theLinks}
							renderItem={(data, rowMap) => (
								<Animated.Text
									key={data.item.id}
									style={styles.link}
									entering={!refreshedOnce && !refresh ? LightSpeedInLeft : dontAnimate}
									onPress={() => linkPressed(data.item.link)}
								>
									{data.item.note}
								</Animated.Text>
							)}
							renderHiddenItem={(data, rowMap) => (
								<View style={styles.swipe}>
									<Animated.Text
										style={{ textAlign: 'right' }}
										onPress={async () => {
											await deleteNoteByVal(data.item.note);
											let newLinks = theLinks.filter((t) => t.note !== data.item.note);
											setTheLinks(newLinks);
										}}
										entering={!refreshedOnce && !refresh ? animate : dontAnimate}
									>
										<FontAwesome name="trash" size={22} color="red" />
									</Animated.Text>
								</View>
							)}
							disableRightSwipe={true}
							rightOpenValue={-75}
						/>
					</ScrollView>
				</VirtualizedView>
			</Drawer>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: '100%',
		backgroundColor: '#0f172a',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	link: {
		backgroundColor: '#334155',
		color: '#6ee7b7',
		fontWeight: '600',
		marginLeft: 5,
		fontSize: 15,
		borderRadius: 6,
		marginBottom: 10,
		padding: 15,
		width: '98%',
		alignSelf: 'center',
	},
	swipe: {
		flex: 1,
		justifyContent: 'center',
		marginLeft: 5,
		fontSize: 15,
		borderRadius: 6,
		marginBottom: 10,
		padding: 15,
		backgroundColor: 'transparent',
		height: 50,
		width: '100%',
	},
});
