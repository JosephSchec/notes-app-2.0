import React, { Dispatch, ReactChild, ReactChildren, SetStateAction, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';

interface Props {
	refresh: boolean;
	setRefresh: Dispatch<SetStateAction<boolean>>;
	children: ReactChild | ReactChildren;
}

export const VirtualizedView = ({ children, refresh, setRefresh }: Props) => {
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = () => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
			setRefresh(!refresh);
		}, 2000);
	};

	return (
		<FlatList
			data={[]}
			ListEmptyComponent={null}
			keyExtractor={() => 'dummy'}
			renderItem={null}
			className="h-full flex-1 bg-brand-dark"
			refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
			ListHeaderComponent={() => <>{children}</>}
		/>
	);
};
