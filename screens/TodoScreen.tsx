import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import Animated, { LightSpeedInLeft } from 'react-native-reanimated';
import { Drawer, VirtualizedView } from '../components';
import { getTodoNotes } from '../GraphQl/Queries';
import { SwipeListView } from 'react-native-swipe-list-view';
import { deleteNoteByVal } from '../GraphQl/Mutations';
import { FontAwesome } from '@expo/vector-icons';
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
				if (json) {
					setTheTodos(json);
					setRefreshOnce(() => true);
				}

				setTimeout(() => {
					if (!refreshedOnce) {
						setRefreshOnce(true);
					}
				}, 100);
			})();
		} catch (error) {}
	}, [refresh]);

	/*let eachOne = theTodos.map(td => {
    return (
      <Animated.Text key={td.id} style={styles.todo} entering={LightSpeedInLeft}>{td.note.toString()}</Animated.Text>
    )
  })*/

	const copyToClip = async (value: string) => value && (await Clipboard.setStringAsync(value));

	return (
		<>
			<Drawer theRoute="/" updateList={setTheTodos}>
				<VirtualizedView refresh={refresh} setRefresh={setRefresh}>
					<ScrollView className="h-full flex-1 bg-brand-dark">
						<SwipeListView
							data={theTodos}
							renderItem={(data, _rowMap) => (
								<Animated.Text
									key={data.item.id}
									className="mx-1 mb-4
									 flex-1 rounded bg-brand-light px-4 py-2 text-lg
									  font-semibold text-brand-green"
									onPress={() => copyToClip(data.item.note)}
									entering={!refreshedOnce && !refresh ? LightSpeedInLeft : noAnimation}
								>
									{data.item.note}
								</Animated.Text>
							)}
							renderHiddenItem={(data, rowMap) => (
								<View className="mb-4 ml-1 h-4 w-full flex-1 justify-center bg-transparent pr-2">
									<Animated.Text
										className="text-right"
										onPress={async () => {
											await deleteNoteByVal(data.item.note);
											let newTodos = theTodos.filter((t) => t.note !== data.item.note);
											setTheTodos(newTodos);
										}}
										entering={!refreshedOnce && !refresh ? animateOpacity : noAnimation}
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
