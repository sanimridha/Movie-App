import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TextInput } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import MovieCart from "../components/MovieCart";
import { Text, View } from "../components/Themed";
import { AUTH_KEY } from "../config";
import Colors from "../constants/Colors";

export default function SearchScreen() {
    const [value, setvalue] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        handleSearch(value);
    }, [value]);

    const handleSearch = async data => {
        console.log(data);
        const options = {
            method: "GET",
            url: `https://api.themoviedb.org/3/search/movie?api_key=${AUTH_KEY}&query=${data}`,
        };
        // setisLoading(true);
        await axios
            .request(options)
            .then(function (response) {
                console.log("searched", response?.data?.results);
                setSearchResults(response?.data?.results);
                // setisLoading(false);
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    return (
        <View style={styles.container}>
            <View
                style={{
                    height: 45,
                    // borderWidth: 1,
                    borderColor: "gray",
                    flexDirection: "row",
                    alignItems: "center",
                    borderRadius: 10,
                    backgroundColor: "#F5F6FA",
                    padding: 10,
                    marginTop: 10,
                }}
            >
                <Feather name="search" size={24} color="gray" />
                <TextInput
                    placeholder="Search...ex(The Avengers)"
                    value={value}
                    onChangeText={setvalue}
                    autoFocus
                    style={{ flex: 1, marginLeft: 5 }}
                    autoCorrect={false}
                />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {searchResults.length > 0 &&
                    searchResults?.map(item => <MovieCart item={{ item }} />)}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: "center",
        // justifyContent: "center",
        paddingHorizontal: 10,
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
