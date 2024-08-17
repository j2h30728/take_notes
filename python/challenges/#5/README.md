# Challenge Goals:

- 오늘의 블루프린트에서 movie_ids 목록을 찾을 수 있습니다.
- 여러분이 해야할 일은 각 아이디 통과하여 API 에서 영화의 세부 정보를 가져오는 for loop 를 만드는 것 입니다.
- 사용하는 API 는 https://nomad-movies.nomadcoders.workers.dev/movies/XXXX 이며, 여기서 XXXX 는 영화 ID 입니다.
- 예를 들어, 아이디가 508883 인 동영상의 세부정보를 얻으려면, 다음 URL 을 요청합니다. https://nomad-movies.nomadcoders.workers.dev/movies/508883 (응답을 보려면 해당 URL 로 이동).
- 응답은 JSON 형식이며, JSON 을 얻으려면 다음과 같이 하시면 됩니다.

```ts
import requests

response = requests.get(....)
data = response.json()
```

- data 는 영화의 세부정보가 포함된 dictionary 가 됩니다.
- 영화의 세부정보를 얻은 후 title, overview, vote_average 를 프린트 해야 합니다.
