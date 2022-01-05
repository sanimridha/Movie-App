import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
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
                // console.log("movie details response", response?.data);
                setMovieData(response?.data);
                setGenreArray(response?.data?.genres);
                setisLoading(false);
            })
            .catch(function (error) {
                console.error(error);
            });
    };
    const ImageComponent = ({ uri }) => (
        <ImageBackground
            source={{
                uri: uri,
            }}
            resizeMode="cover"
            style={styles.ImageBackground}
        >
            <TouchableOpacity
                activeOpacity={0.7}
                style={styles.ImageBackTouchable}
            >
                <AntDesign name="play" size={60} color="white" />
                <Text style={styles.ImageBackText}>Play Trailer</Text>
            </TouchableOpacity>
        </ImageBackground>
    );
    const MovieInfoItems = ({ title, value }) => (
        <View>
            <Text style={styles.infoTitle}>{title}</Text>
            <Text style={styles.infoValue}>{value}</Text>
        </View>
    );
    if (isLoading) {
        return (
            <View style={styles.activityContainer}>
                <ActivityIndicator size={"small"} color={"skyblue"} />
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <ImageComponent uri={`${IMAGE_PATH}${MovieData?.backdrop_path}`} />
            <View style={styles.semiContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.movieTitleView}>
                        <Text style={styles.titleText}>{MovieData?.title}</Text>
                        <TouchableOpacity activeOpacity={0.5}>
                            <Ionicons
                                name="md-bookmark-outline"
                                size={22}
                                color="black"
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.ratingView}>
                        <AntDesign name="star" size={12} color={Colors.star} />
                        <Text style={{ color: "gray" }}>
                            {MovieData?.vote_average + "/10 IMDb"}
                        </Text>
                    </View>
                    <View style={styles.genresView}>
                        {genreArray?.map((item, index) => (
                            <Text key={index} style={styles.genresText}>
                                {item?.name}
                            </Text>
                        ))}
                    </View>
                    <View style={styles.infoView}>
                        <MovieInfoItems
                            title={"Length"}
                            value={MovieData?.runtime + " mins"}
                        />
                        {MovieData.spoken_languages && (
                            <MovieInfoItems
                                title={"Language"}
                                value={MovieData?.spoken_languages[0]?.name}
                            />
                        )}
                        <MovieInfoItems
                            title={"Votes"}
                            value={MovieData?.vote_count}
                        />
                    </View>
                    <View>
                        <Text style={styles.descView}>Description</Text>
                        <Text style={styles.descText}>
                            {MovieData?.overview}
                        </Text>
                    </View>
                    <View>
                        <View style={styles.pcView}>
                            <Text style={styles.descView}>
                                Production Company
                            </Text>
                            <TouchableOpacity activeOpacity={0.5}>
                                <Text style={styles.pcSeeMore}>see more</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            {MovieData.production_companies && (
                                <>
                                    <Image
                                        source={{
                                            uri: `${IMAGE_PATH}${MovieData?.production_companies[0].logo_path}`,
                                        }}
                                        style={styles.pcLogo}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.infoTitle}>
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
    },
    activityContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
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
    ImageBackground: {
        height: 300,
        alignItems: "center",
        justifyContent: "center",
    },
    ImageBackTouchable: {
        height: 130,
        backgroundColor: Colors.transparentDark,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
    },
    ImageBackText: {
        padding: 15,
        fontSize: 17,
        fontWeight: "bold",
        color: "white",
    },
    semiContainer: {
        flex: 1,
        paddingHorizontal: 20,
        top: -20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    movieTitleView: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    titleText: {
        fontSize: 20,
        fontWeight: "600",
        width: "70%",
    },
    ratingView: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "transparent",
        paddingVertical: 10,
    },
    genresView: {
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: "transparent",
    },
    genresText: {
        textTransform: "uppercase",
        paddingHorizontal: 5,
        color: Colors.genreyText,
        backgroundColor: Colors.genreyBackground,
        borderRadius: 5,
        margin: 2,
        overflow: "hidden",
        fontSize: 14,
    },
    infoView: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    infoTitle: { color: "gray" },
    infoValue: { fontWeight: "600", paddingTop: 3 },
    descView: {
        fontSize: 17,
        fontWeight: "bold",
        paddingVertical: 5,
    },
    descText: { color: "gray", lineHeight: 22 },
    pcView: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        alignItems: "center",
    },
    pcSeeMore: {
        color: "gray",
        fontSize: 13,
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: "gray",
        padding: 2,
        paddingHorizontal: 7,
    },
    pcLogo: {
        height: 50,
        marginRight: "80%",
        marginBottom: 5,
    },
});
