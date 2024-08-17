class Movies:

    def __init__(self):
        self.movie_data = []

    def add_movie_data(self, title, overview, vote_average):
        movie_data = {
            'title': title,
            'overview': overview,
            'vote_average': vote_average
        }
        self.movie_data.append(movie_data)

    def get_movie_data_by_id(self, movie_id):
        print(f"{movie_id}의 영화 데이터를 가져오고있습니다.")
        response = requests.get(
            f"https://nomad-movies.nomadcoders.workers.dev/movies/{movie_id}")
        movie_data = response.json()

        title = movie_data.get('title')
        overview = movie_data.get('overview')
        vote_average = movie_data.get('vote_average')

        if(title is None and overview is None and vote_average is None):
            raise ValueError(f"영화 ID {movie_id}의 데이터에서 'title', 'overview', 'vote_average'가 모두 누락되었습니다.")
        self.add_movie_data(movie_data, title,overview)    

    def get_movie_data_by_ids(self, movie_ids):
        for movie_id in movie_ids:
            try:
                self.get_movie_data_by_id(movie_id)
            except ValueError as error:
                print(error)
                
    def print_movie_data(self):
        print(self.movie_data)


movies = Movies()
movies.get_movie_data_by_ids(movie_ids)
movies.print_movie_data()
