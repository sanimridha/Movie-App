import { ActivityIndicator, FlatList, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import axios from "axios";
import { useEffect, useState } from "react";
import MovieCart from "../components/MovieCart";
import { API_BASE_URL, AUTH_KEY } from "../config";
import { useRef } from "react";

export default function HomeScreen({ navigation }: RootTabScreenProps<"Home">) {
    const flatListRef = useRef(null);

    const [limit] = useState(20);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [clientData, setClientData] = useState([]);
    const [serverData, serverDataLoaded] = useState([]);
    const [pending_process, setPending_process] = useState(true);
    const [loadMore, setLoadMore] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const requestToServer = async page => {
        const options = {
            method: "GET",
            url: `${API_BASE_URL}${AUTH_KEY}&page=${page}`,
        };
        await axios
            .request(options)
            .then(function (response) {
                // console.log("Home", response?.data);
                serverDataLoaded(response?.data?.results);
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    //Update with new data
    useEffect(() => {
        if (serverData.length > 0) {
            setRefresh(false);
            setClientData([...clientData, ...serverData]);
            setLoadMore(serverData.length == limit ? true : false);
            setPending_process(false);
        } else {
            setLoadMore(false);
        }
    }, [serverData]);

    //Data process by page
    useEffect(() => {
        if (serverData.length == limit || page == 1) {
            setPending_process(true);
            requestToServer(page).then(r => {
                if (page == 1) {
                    setLoading(false);
                }
            });
        }
    }, [page]);

    //Handler for load more data by scrolling
    const handleLoadMore = () => {
        if (loadMore && !pending_process) {
            setPage(page + 1);
        }
    };

    //Handler for refresh by pull refresh
    const onRefresh = () => {
        if (page !== 1) {
            serverDataLoaded([]);
            setClientData([]);
            setPage(1);
            setRefresh(true);
            setLoadMore(false);
            setPending_process(false);
        }
    };
    //Loader for load more
    const renderFooter = () => {
        return (
            <View style={styles.footer}>
                {loadMore ? (
                    <ActivityIndicator color="skyblue" style={{ margin: 15 }} />
                ) : null}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={clientData}
                style={{ height: "100%" }}
                onEndReachedThreshold={0.01}
                onEndReached={handleLoadMore}
                refreshing={refresh}
                onRefresh={() => onRefresh()}
                ListFooterComponent={renderFooter}
                showsVerticalScrollIndicator={false}
                renderItem={item => <MovieCart item={item} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
    footer: {
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
});
