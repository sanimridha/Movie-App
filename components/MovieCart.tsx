import { Image, StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "../components/Themed";
import { useEffect, useState } from "react";
import { IMAGE_PATH } from "../config";
import Colors from "../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { getGenresByID } from "../Services";
import { useNavigation } from "@react-navigation/native";

const MovieCart = ({ item, index }) => {
    const navigation = useNavigation();
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
            // key={index}
            activeOpacity={0.5}
            style={styles.touchContainer}
            onPress={() => {
                navigation.navigate("Details", item?.item?.id);
            }}
        >
            <Image
                source={{
                    uri: `${IMAGE_PATH}${item?.item?.poster_path}`,
                }}
                style={styles.image}
                resizeMode="cover"
            />
            <View style={styles.rightSecionContainer}>
                <Text style={styles.title}>{item?.item?.title}</Text>
                <View style={styles.ratingView}>
                    <AntDesign name="star" size={12} color={Colors.star} />
                    <Text style={styles.gray}>
                        {item?.item?.vote_average + "/10 IMDb"}
                    </Text>
                </View>
                <View style={styles.genreView}>
                    {genres?.map((item, index) => (
                        <Text key={index} style={styles.genreText}>
                            {item}
                        </Text>
                    ))}
                </View>
                <View style={styles.genreView}>
                    <AntDesign name="clockcircleo" size={12} color={"gray"} />
                    <Text style={styles.gray}>
                        {" " + item?.item?.release_date}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default MovieCart;

const styles = StyleSheet.create({
    touchContainer: {
        margin: 5,
        borderRadius: 10,
        flexDirection: "row",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 0.84,
        elevation: 5,
        backgroundColor: "white",
    },
    image: {
        height: 140,
        width: 100,
        borderRadius: 10,
        alignSelf: "center",
    },
    rightSecionContainer: {
        paddingLeft: 15,
        maxWidth: "70%",
        justifyContent: "space-between",
        paddingVertical: 14,
        backgroundColor: "transparent",
    },
    title: {
        fontWeight: "bold",
        width: 170,
    },
    ratingView: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "transparent",
    },
    gray: { color: "gray" },
    genreView: {
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: "transparent",
    },
    genreText: {
        textTransform: "uppercase",
        paddingHorizontal: 5,
        color: Colors.genreyText,
        backgroundColor: Colors.genreyBackground,
        borderRadius: 5,
        margin: 2,
        overflow: "hidden",
        fontSize: 11,
    },
});
