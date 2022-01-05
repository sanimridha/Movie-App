import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
    Image,
    ImageBackground,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { API_BASE_URL, AUTH_KEY, IMAGE_PATH } from "../config";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { getGenresByID } from "../Services";

export default function DetailsScreen(props) {
    const MovieID = props?.route?.params;
    const [isLoading, setisLoading] = useState(false);
    const [MovieData, setMovieData] = useState([]);
    const [genreArray, setGenreArray] = useState([]);

    useEffect(() => {
        if (MovieID) {
            getMovieDetails();
        }
    }, []);

    const getMovieDetails = async () => {
        const options = {
            method: "GET",
            url: `https://api.themoviedb.org/3/movie/${MovieID}?api_key=${AUTH_KEY}`,
        };
        setisLoading(true);
        await axios
            .request(options)
            .then(function (response) {
                console.log("movie details response", response?.data);
                setMovieData(response?.data);
                setGenreArray(response?.data?.genres);
                setisLoading(false);
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={{
                    uri: `${IMAGE_PATH}${MovieData?.backdrop_path}`,
                }}
                resizeMode="cover"
                style={{
                    height: 270,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={{
                        height: 130,
                        // width: 80,
                        backgroundColor: Colors.transparentDark,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 10,
                    }}
                >
                    <AntDesign name="play" size={60} color="white" />
                    <Text
                        style={{
                            padding: 15,
                            fontSize: 17,
                            fontWeight: "bold",
                            color: "white",
                        }}
                    >
                        Play Trailer
                    </Text>
                </TouchableOpacity>
            </ImageBackground>

            <View
                style={{
                    paddingHorizontal: 20,
                    top: -20,
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    flex: 1,
                }}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View
                        style={{
                            marginTop: 20,
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: "600",
                                width: "70%",
                            }}
                        >
                            {MovieData?.title}
                        </Text>
                        <TouchableOpacity activeOpacity={0.5}>
                            <Ionicons
                                name="md-bookmark-outline"
                                size={22}
                                color="black"
                            />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            backgroundColor: "transparent",
                            paddingVertical: 10,
                        }}
                    >
                        <AntDesign name="star" size={12} color={Colors.star} />
                        <Text style={{ color: "gray" }}>
                            {MovieData?.vote_average + "/10 IMDb"}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            backgroundColor: "transparent",
                        }}
                    >
                        {genreArray?.map((item, index) => (
                            <Text
                                key={index}
                                style={{
                                    textTransform: "uppercase",
                                    paddingHorizontal: 5,
                                    color: Colors.genreyText,
                                    backgroundColor: Colors.genreyBackground,
                                    borderRadius: 5,
                                    margin: 2,
                                    overflow: "hidden",
                                    fontSize: 14,
                                }}
                            >
                                {item?.name}
                            </Text>
                        ))}
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingVertical: 15,
                            paddingHorizontal: 20,
                        }}
                    >
                        <View>
                            <Text style={{ color: "gray" }}>Length</Text>
                            <Text style={{ fontWeight: "600", paddingTop: 3 }}>
                                {MovieData?.runtime + " mins"}
                            </Text>
                        </View>
                        <View>
                            <Text style={{ color: "gray" }}>Language</Text>
                            {MovieData.spoken_languages && (
                                <Text
                                    style={{ fontWeight: "600", paddingTop: 3 }}
                                >
                                    {MovieData?.spoken_languages[0]?.name}
                                </Text>
                            )}
                        </View>
                        <View>
                            <Text style={{ color: "gray" }}>Votes</Text>
                            <Text style={{ fontWeight: "600", paddingTop: 3 }}>
                                {MovieData?.vote_count}
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Text
                            style={{
                                fontSize: 17,
                                fontWeight: "bold",
                                paddingVertical: 5,
                            }}
                        >
                            Description
                        </Text>
                        <Text style={{ color: "gray", lineHeight: 22 }}>
                            {MovieData?.overview}
                        </Text>
                    </View>
                    <View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                paddingVertical: 10,
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 17,
                                    fontWeight: "bold",
                                }}
                            >
                                Production Company
                            </Text>
                            <TouchableOpacity activeOpacity={0.5}>
                                <Text
                                    style={{
                                        color: "gray",
                                        fontSize: 13,
                                        borderWidth: 0.5,
                                        borderRadius: 10,
                                        borderColor: "gray",
                                        padding: 2,
                                        paddingHorizontal: 7,
                                    }}
                                >
                                    see more
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            {MovieData.production_companies && (
                                <>
                                    <Image
                                        source={{
                                            uri: `${IMAGE_PATH}${MovieData.production_companies[0].logo_path}`,
                                        }}
                                        style={{
                                            height: 50,
                                            // position: "absolute",
                                            marginRight: "80%",
                                            marginBottom: 5,
                                        }}
                                        resizeMode="contain"
                                    />
                                    <Text style={{ color: "gray" }}>
                                        {
                                            MovieData?.production_companies[0]
                                                .name
                                        }
                                    </Text>
                                </>
                            )}
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: "center",
        // justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});
