import React, {  Dispatch, ReactChild, ReactChildren, SetStateAction,  useState } from 'react'
import { StyleSheet, FlatList, RefreshControl } from 'react-native';


interface Props {
    refresh: boolean,
    setRefresh: Dispatch<SetStateAction<boolean>>,
    children: ReactChild | ReactChildren
}

export default function VirtualizedView({ children, refresh, setRefresh }: Props) {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false)
            setRefresh(!refresh)
        }, 2000)
    };


    return (
        <FlatList
            data={[]}
            ListEmptyComponent={null}
            keyExtractor={() => "dummy"}
            renderItem={null}
            style={styles.container}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
            ListHeaderComponent={() => (
                <>{children}</>
            )}
        />
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        backgroundColor: '#0f172a'
    }
})