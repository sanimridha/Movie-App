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
    const getGenresByID = id => {
        if (id == "28") {
            return "Action";
        }
        if (id == "12") {
            return "Adventure";
        }
        if (id == "16") {
            return "Animation";
        }
        if (id == "35") {
            return "Comedy";
        }
        if (id == "80") {
            return "Crime";
        }
        if (id == "99") {
            return "Documentary";
        }
        if (id == "18") {
            return "Drama";
        }
        if (id == "10751") {
            return "Family";
        }
        if (id == "14") {
            return "Fantasy";
        }
        if (id == "36") {
            return "History";
        }
        if (id == "27") {
            return "Horror";
        }
        if (id == "10402") {
            return "Music";
        }
        if (id == "9648") {
            return "Mystery";
        }
        if (id == "10749") {
            return "Romance";
        }
        if (id == "878") {
            return "Science Fiction";
        }
        if (id == "10770") {
            return "TV Movie";
        }
        if (id == "53") {
            return "Thriller";
        }
        if (id == "10752") {
            return "War";
        }
        if (id == "37") {
            return "Western";
        } else {
            return "Other";
        }
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
                <FlatList
                    data={movies}
                    keyExtractor={(item, index) => item?.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={item => {
                        const genres = [];
                        {
                            item?.item?.genre_ids.map(function (item) {
                                console.log(item);
                                genres.push(getGenresByID(item));
                            });
                        }
                        return (
                            <View
                                style={{
                                    // height: 150,
                                    // borderWidth: 1,
                                    borderColor: Colors.dark,
                                    margin: 5,
                                    borderRadius: 10,

                                    flexDirection: "row",
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.1,
                                    shadowRadius: 3.84,
                                    elevation: 5,
                                }}
                            >
                                <Image
                                    source={{
                                        uri: `${IMAGE_PATH}${item?.item?.poster_path}`,
                                    }}
                                    style={{
                                        height: 140,
                                        width: 100,
                                        borderRadius: 10,
                                        alignSelf: "center",
                                    }}
                                    resizeMode="cover"
                                />
                                <View
                                    style={{
                                        paddingLeft: 15,
                                        maxWidth: "70%",
                                        justifyContent: "space-between",
                                        paddingVertical: 15,
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontWeight: "bold",
                                            width: 170,
                                        }}
                                    >
                                        {item?.item?.title}
                                    </Text>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}
                                    >
                                        <AntDesign
                                            name="star"
                                            size={12}
                                            color={Colors.star}
                                        />
                                        <Text style={{ color: "gray" }}>
                                            {item?.item?.vote_average +
                                                "/10 IMDb"}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            flexWrap: "wrap",
                                        }}
                                    >
                                        {genres?.map(item => (
                                            <Text
                                                style={{
                                                    textTransform: "uppercase",
                                                    paddingHorizontal: 5,
                                                    color: Colors.genreyText,
                                                    backgroundColor:
                                                        Colors.genreyBackground,
                                                    borderRadius: 5,
                                                    margin: 2,
                                                    overflow: "hidden",
                                                    fontSize: 11,
                                                }}
                                            >
                                                {item}
                                            </Text>
                                        ))}
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}
                                    >
                                        <AntDesign
                                            name="clockcircleo"
                                            size={12}
                                            color={"gray"}
                                        />
                                        <Text style={{ color: "gray" }}>
                                            {" " + item?.item?.release_date}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        );
                    }}
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
