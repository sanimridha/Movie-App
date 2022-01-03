import {
    ActivityIndicator,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
} from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import axios from "axios";
import { useEffect, useState } from "react";
import MovieCart from "../components/MovieCart";
import { API_BASE_URL, AUTH_KEY, IMAGE_PATH } from "../config";
import Layout from "../constants/Layout";
import Colors from "../constants/Colors";

export default function HomeScreen({ navigation }: RootTabScreenProps<"Home">) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    useEffect(() => {
        FetchMovies();
    }, []);
    const FetchMovies = async () => {
        const options = {
            method: "GET",
            url: `${API_BASE_URL}${AUTH_KEY}`,
            // url: "https://data-imdb1.p.rapidapi.com/movie/id/tt0086250/",
        };
        await axios
            .request(options)
            .then(function (response) {
                console.log("Home", response?.data);
                setMovies(response?.data?.results);
            })
            .catch(function (error) {
                console.error(error);
            });
    };
    // const renderItem = ({item}) => {
    //   return(
    //       <View style={{}}>

    //       </View>
    //   )
    // }

    return (
        <View style={styles.container}>
            {/* {isLoading ? (
                <ActivityIndicator
                    size={"small"}
                    color={"skyblue"}
                    style={{ flex: 1, alignItems: "center" }}
                />
            ) : ( */}
            <>
                <Text style={styles.title}>Movies</Text>
                {/* <ScrollView>
                    {movies.map((item, index) => (
                        <MovieCart MovieId={item?.imdb_id} />
                    ))}
                </ScrollView> */}
                <FlatList
                    data={movies}
                    keyExtractor={(item, index) => item?.id}
                    numColumns={3}
                    renderItem={item => (
                        <View
                            style={{
                                width: Layout.window.width / 3.5,
                                height: 170,
                                borderWidth: 1,
                                borderColor: Colors.dark,
                                margin: 5,
                            }}
                        >
                            <Image
                                source={{
                                    uri: `${IMAGE_PATH}${item?.item?.backdrop_path}`,
                                }}
                                style={{ height: "90%", width: "100%" }}
                                resizeMode="stretch"
                            />
                            <Text style={{ padding: 10 }}>
                                {item?.item?.vote_average}
                            </Text>
                        </View>
                    )}
                />
            </>
            {/* )} */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        // alignItems: "center",
        // justifyContent: "center",
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
});
