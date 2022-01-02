import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import axios from "axios";

const MovieCart = ({ MovieId }) => {
    const [movie, setMovie] = useState([]);

    const fetchMovieById = async () => {
        const options = {
            method: "GET",
            url: `https://data-imdb1.p.rapidapi.com/movie/id/${MovieId}/`,
            headers: {
                "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
                "x-rapidapi-key":
                    "46bc852a24msh0571452aa28f50bp177650jsn2fbdc100b8be",
            },
        };
        // setisLoading(true);
        await axios
            .request(options)
            .then(function (response) {
                console.log("Movie Description", response?.data);
                setMovie(response?.data || []);
                // setisLoading(false);
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    return (
        <View style={{ borderWidth: 1, borderColor: "gray" }}>
            <View style={{ padding: 10 }}>
                <Text>{movie?.plot}</Text>
                <Text>{movie?.title}</Text>
            </View>
        </View>
    );
};

export default MovieCart;

const styles = StyleSheet.create({});
