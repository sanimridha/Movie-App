import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import axios from "axios";
import { useEffect, useState } from "react";
import MovieCart from "../components/MovieCart";

export default function HomeScreen({ navigation }: RootTabScreenProps<"Home">) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    useEffect(() => {
        fetchMovieList();
    }, []);
    const fetchMovieList = async () => {
        const options = {
            method: "GET",
            url: "https://data-imdb1.p.rapidapi.com/movie/byGen/Drama/",
            // url: "https://data-imdb1.p.rapidapi.com/movie/id/tt0086250/",
            headers: {
                "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
                "x-rapidapi-key":
                    "46bc852a24msh0571452aa28f50bp177650jsn2fbdc100b8be",
            },
        };
        setisLoading(true);
        await axios
            .request(options)
            .then(function (response) {
                console.log(response?.data);
                setMovies(response?.data?.results || []);
                setisLoading(false);
            })
            .catch(function (error) {
                console.error(error);
            });
    };

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
                <ScrollView>
                    {movies.map((item, index) => (
                        <MovieCart MovieId={item?.imdb_id} />
                    ))}
                </ScrollView>
            </>
            {/* )} */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
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
