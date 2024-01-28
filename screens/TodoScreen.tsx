import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import Animated, { LightSpeedInLeft } from 'react-native-reanimated';
import Drawer from '../components/Drawer';
import { getTodoNotes } from '../GraphQl/Queries';
import { SwipeListView } from 'react-native-swipe-list-view';
import { deleteNoteByVal } from '../GraphQl/Mutations';
import { FontAwesome } from '@expo/vector-icons';
import VirtualizedView from '../components/VirtualizedView';
import * as Clipboard from 'expo-clipboard';
import { animateOpacity, noAnimation } from '../hooks/useAnimate';
export const TodoScreen = () => {
	const [theTodos, setTheTodos] = useState<any[]>([]);
	const [refresh, setRefresh] = useState<boolean>(false);
	const [refreshedOnce, setRefreshOnce] = useState<boolean>(false);

	useEffect(() => {
		try {
			(async () => {
				let todos = await getTodoNotes();
				let json = todos.data.neon_notes;
				setTheTodos(json);
			})();
		} catch (error) {}
	}, [refresh]);

	setTimeout(() => {
		setRefreshOnce(true);
	}, 1000);
	/*let eachOne = theTodos.map(td => {
    return (
      <Animated.Text key={td.id} style={styles.todo} entering={LightSpeedInLeft}>{td.note.toString()}</Animated.Text>
    )
  })*/

	const copyToClip = async (value: string) => value && (await Clipboard.setStringAsync(value));
	const animate = animateOpacity;
	const dontAnimate = noAnimation;

	return (
		<>
			<Drawer theRoute="/" updateList={setTheTodos}>
				<VirtualizedView refresh={refresh} setRefresh={setRefresh}>
					<ScrollView style={styles.container}>
						<SwipeListView
							data={theTodos}
							renderItem={(data, rowMap) => (
								<Animated.Text
									key={data.item.id}
									style={styles.todo}
									onPress={() => copyToClip(data.item.note)}
									entering={!refreshedOnce && !refresh ? LightSpeedInLeft : dontAnimate}
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
											let newTodos = theTodos.filter((t) => t.note !== data.item.note);
											setTheTodos(newTodos);
										}}
										entering={!refreshedOnce && !refresh ? animate : dontAnimate}
									>
										<FontAwesome name="trash" size={22} color="red" />
									</Animated.Text>
								</View>
							)}
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

	todo: {
		backgroundColor: '#334155',
		color: '#6ee7b7',
		fontWeight: '600',
		marginLeft: 5,
		fontSize: 15,
		borderRadius: 6,
		marginBottom: 10,
		padding: 15,
		width: '98%',
		alignSelf: 'flex-start',
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
