import { Text, View, StyleSheet, TouchableOpacity, Image, ActivityIndicator, ScrollView  } from "react-native"
import { useEffect, useState, } from "react";
import MovieDetailsType, { RouterPropsType } from "../../@types/MoviesDetails";
import { useNavigation, useRoute } from "@react-navigation/native";
import api from "../../service/api";
import { BookmarkSimple, CalendarBlank, CaretLeft, Clock, Star } from "phosphor-react-native";

const Details = () => {
  const [moviesDetails, setMoviesDetails] = useState<MovieDetailsType | null>(null);
  
  const [loading, setLoading] = useState(false);
  
  const navigation = useNavigation();
  
  const route = useRoute();

  const { movieId } = route.params as RouterPropsType;
  
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true)
        const response = await api.get(`/movie/${movieId}`);
        setMoviesDetails(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false)
        console.log(err);
      }
    }
    fetchMovieDetails();

  },[movieId]);


  const getYear = (data: string): number => {
    const ano = new Date(data).getFullYear();
    return ano;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
        onPress={() => navigation.goBack()}
        >
          <CaretLeft color="#FFF" size={32} weight="thin"/>
        </TouchableOpacity>
        <Text style={styles.headerText}>Detalhes</Text>
        <TouchableOpacity>
          <BookmarkSimple color="#FFF" size={32} weight="thin"/>
        </TouchableOpacity>
      </View>
      {loading && <ActivityIndicator size="large" color="#FFF"/>}
      
      {!loading && <>
        <View>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${moviesDetails?.backdrop_path}`
            }}
            style={styles.detailsImage}
          />
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${moviesDetails?.poster_path}`
            }}
            style={styles.detailsPosterImage}
          />
          <Text style={styles.detailsTitleMovie}>{moviesDetails?.title}</Text>
          <View style={styles.descrition}>
            <View style={styles.descritionGroup}>
              <CalendarBlank color="#92929D" size={25} weight="thin"/>
              <Text style={styles.descriptionText}>
                {getYear(moviesDetails?.release_date)}
              </Text>
            </View>

            <View style={styles.descritionGroup}>
              <Clock color="#92929D" size={25} weight="thin"/>
              <Text style={styles.descriptionText}>
                {`${moviesDetails?.runtime} minutos`}
              </Text>
            </View>

            <View style={styles.descritionGroup}>
              <Star
                color={
                  moviesDetails?.vote_average.toFixed(2) >= '7' ? "#FF8700" : "#92929D" }
                size={25}
                weight={
                  moviesDetails?.vote_average.toFixed(2) >= '7' ? "duotone" : "thin"
                }
              />
              <Text style={[
                moviesDetails?.vote_average.toFixed(2)
                >= '7' ? styles.descriptionText1 : styles.descriptionText
              ]}>
                {moviesDetails?.vote_average.toFixed(1)}
              </Text>
            </View>
          </View>
      </View>

      <ScrollView style={styles.about}>
        <Text style={styles.aboutTextTitle}>Snopse</Text>
        <Text style={styles.aboutText}>{
          moviesDetails?.overview === ''
          ? 'Ops! Parece que esse filme não tem descrição'
          : moviesDetails?.overview}</Text>
      </ScrollView>
      </>}
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E'
  },

  header: {
    paddingTop: 30,
    height: 115,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  headerText: {
    color: "#FFF",
    fontWeight: '700',
    fontSize: 18,
  },

  detailsImage: {
    position: 'absolute',
    width: '100%',
    height: 210,
  },

  detailsPosterImage: {
    width: 100,
    height: 160,
    borderRadius: 16,
    left: 29,
    right: 251,
    top: 140,
  },

  detailsTitleMovie: {
    position: "absolute",
    height: 50,
    left: 140,
    right: 32,
    top: 240,
    color: '#FFF',
    fontSize: 18,
    lineHeight: 27,
    fontWeight: '700',
  },

  descrition: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 170,
  },

  descritionGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },

  descriptionText: {
    marginRight: 10,
    color: "#92929D",
  },

  descriptionText1: {
    marginRight: 10,
    color: "#FF8700",
  },
  
  about: {
    padding: 20,
  },

  aboutTextTitle: {
    fontSize:20,
    color: "#FFF",
    textAlign: 'justify',
  },

  aboutText: {
    marginBottom: 25,
    color: "#FFF",
    textAlign: 'justify',
  }
})

export default Details;
