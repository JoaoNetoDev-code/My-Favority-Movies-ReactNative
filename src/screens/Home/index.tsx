import { View, Text, TextInput, FlatList, ActivityIndicator } from "react-native";
import styles from "./styles";
import { MagnifyingGlass } from "phosphor-react-native";
import { useEffect, useState } from "react";
import api from "../../service/api";
import CardMovies from "../../components/CardMovies";
import { useNavigation } from "@react-navigation/native";

interface Movie {
  id: number,
  title: string,
  poster_path: string;
  overview: string;
}

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [noResult, setNoResult] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchResultMovies, setSearchResultMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    loadMoreData();
  },[]);

  const loadMoreData = async () => {
    const {data} = await api.get("/movie/popular", {
      params: {page}
    });
    setMovies([...movies, ...data.results]);
    setPage(page +1)
  }

  const searchMovies = async (query: string) => {
    setLoading(true);
    const {data} = await api.get("/search/movie", {
      params: {query  }
    });

    if (!data.results.length) {
      setNoResult(true);
      setLoading(false);
      setSearchResultMovies([]);
    } else {
      setNoResult(false);
      setSearchResultMovies(data.results)
      setLoading(false);
    }
  }

  const handleSearch = (search:string) => {
    setSearch(search);
    if (search.length > 2) {
      searchMovies(search)
    } else {
      setSearchResultMovies([])
    }
  };

  const navigation = useNavigation();

  const renderMovieItem = ({item}: {item: Movie}) => (
    <CardMovies data={item} onPress={() => navigation.navigate("details", {movieId: item.id}) }/>
  )
  const movieData = search.length > 2 ? searchResultMovies : movies;

  return (
    <View style={styles.container}>
    <View style={styles.header}>
    <Text style={styles.headerText}>Oque você quer assistir Hoje?</Text>  
    <View style={styles.containerInput}>
        <TextInput
          onChangeText={handleSearch}
          value={search}
          placeholder="Buscar"
          placeholderTextColor="#FFF"
          style={styles.input}/>

        <MagnifyingGlass
          color="#FFF"
          size={25}
          weight="light" />
      </View>
      {noResult && (
        <Text style={styles.noResult}>
          Nenhum resultado encontrado para...
          "{search}"
        </Text>
      )}
    </View>
      <View>
        <FlatList
          data={movieData}
          numColumns={3}
          renderItem={renderMovieItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: 15,
            paddingBottom: 100,
            alignItems: "center"
          }}
          onEndReached={() => loadMoreData()}
          onEndReachedThreshold={0.5}
        />
        {loading && <ActivityIndicator size={50} color={'#0296e5'}/>}
      </View>
    </View>
  )
}