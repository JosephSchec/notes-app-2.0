import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Drawer, VirtualizedView } from '../components';
import Animated, { LightSpeedInLeft } from 'react-native-reanimated';
import { getLinks } from '../GraphQl/Queries';
import { FontAwesome } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { deleteNoteByVal } from '../GraphQl/Mutations';
import { animateOpacity, noAnimation } from '../hooks';
import * as WebBrowser from 'expo-web-browser';
export const LinkScreen = () => {
	const [theLinks, setTheLinks] = useState<any[]>([]);
	const [refresh, setRefresh] = useState(false);
	const [refreshedOnce, setRefreshOnce] = useState<boolean>(false);

	useEffect(() => {
		(async () => {
			let todos = await getLinks();
			let json = todos.data.neon_notes;
			if (json) {
				setTheLinks(json);
			}
		})();
	}, [refresh]);

	setTimeout(() => {
		if (!theLinks.length) {
			setRefreshOnce(true);
		}
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

	return (
		<>
			<Drawer theRoute="/linklist" updateList={setTheLinks}>
				<VirtualizedView setRefresh={setRefresh} refresh={refresh}>
					<ScrollView className="h-full flex-1 bg-brand-dark">
						<SwipeListView
							data={theLinks}
							renderItem={(data, rowMap) => (
								<Animated.Text
									key={data.item.id}
									className="mx-1 mb-4
									  rounded bg-brand-light px-4 py-2
									  font-semibold text-brand-green"
									entering={!refreshedOnce && !refresh ? LightSpeedInLeft : noAnimation}
									onPress={() => linkPressed(data.item.link)}
								>
									{data.item.note}
								</Animated.Text>
							)}
							renderHiddenItem={(data, _rowMap) => (
								<View className="mb-4 ml-1 h-4 w-full flex-1 justify-center bg-transparent pr-4">
									<Animated.Text
										style={{ textAlign: 'right' }}
										onPress={async () => {
											await deleteNoteByVal(data.item.note);
											let newLinks = theLinks.filter((t) => t.note !== data.item.note);
											setTheLinks(newLinks);
										}}
										entering={!refreshedOnce && !refresh ? animateOpacity : noAnimation}
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
