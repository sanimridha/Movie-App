import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import axios from "axios";

const MovieCart = item => {
    const [movie, setMovie] = useState([]);
    console.log("item from clild", item.item);

    return (
        <View style={{ borderWidth: 1, borderColor: "gray" }}>
            <Text style={{ padding: 20 }}>{item?.item?.title}</Text>
            {/* <Text>{movie?.title}</Text> */}
        </View>
    );
};

export default MovieCart;

const styles = StyleSheet.create({});
