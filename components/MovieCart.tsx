import {
    ActivityIndicator,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableOpacity,
} from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL, AUTH_KEY, IMAGE_PATH } from "../config";
import Layout from "../constants/Layout";
import Colors from "../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { getGenresByID } from "../Services";

const MovieCart = ({ item, index }) => {
    const [genreArray, setGenreArray] = useState([]);
    const genres = [];

    useEffect(() => {
        setGenreArray(item?.item?.genre_ids);
    }, []);

    const data = genreArray?.map(function (item) {
        genres.push(getGenresByID(item));
    });

    return (
        <TouchableOpacity
            key={index}
            activeOpacity={0.5}
            style={{
                margin: 5,
                borderRadius: 10,
                flexDirection: "row",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 0.84,
                elevation: 5,
                backgroundColor: "white",
            }}
            onPress={() => {}}
        >
            <>
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
                        paddingVertical: 14,
                        backgroundColor: "transparent",
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
                            backgroundColor: "transparent",
                        }}
                    >
                        <AntDesign name="star" size={12} color={Colors.star} />
                        <Text style={{ color: "gray" }}>
                            {item?.item?.vote_average + "/10 IMDb"}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            backgroundColor: "transparent",
                        }}
                    >
                        {genres?.map((item, index) => (
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
                            backgroundColor: "transparent",
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
            </>
        </TouchableOpacity>
    );
};

export default MovieCart;

const styles = StyleSheet.create({});
