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
import { AntDesign } from "@expo/vector-icons";

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
                {/* <Text style={styles.title}>Movies</Text> */}
                <FlatList
                    data={movies}
                    keyExtractor={(item, index) => item?.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={item => <MovieCart item={item} />}
                />
            </>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 8,
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
