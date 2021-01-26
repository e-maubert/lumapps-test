import axios from 'axios';
/*
const instance = axios.create({
  baseURL: 'https://gateway.marvel.com/v1/public/',
  timeout: 1000,
});
*/
const baseQueryParams = {
  baseURL: 'https://gateway.marvel.com:443/v1/public/',
  apikey: process.env.REACT_APP_MARVEL_API_KEY,
};

export default {
  getCharacters: (offset, perPage) =>
    axios({
        'method':'GET',
        'url':baseQueryParams.baseURL+`characters`,
        'headers': {
            'content-type':'application/octet-stream',
        },
        'params': {
            'limit':perPage,
            'offset':offset,
            'apikey':baseQueryParams.apikey
        },
    }),
  getCharacter: (id) =>
    axios({
      'method':'GET',
      'url':baseQueryParams.baseURL+`characters/`+id,
      'headers': {
          'content-type':'application/octet-stream',
      },
      'params': {
          'apikey':baseQueryParams.apikey
      },
  })
}