import { createContext, useState } from 'react';

const FavoritesContext = createContext({ // initial context, default values
  favorites: [],
  totalFavorites: 0,
  addFavorite: (favoriteMeetup) => { },
  removeFavorite: (meetupId) => { },
  itemIsFavorite: (meetupId) => { },
});
export function FavoritesContextProvider(props) {
  const [userFavorites, setUserFavorites] = useState([]);

  function addFavoriteHandler(favoriteMeetup) {
    setUserFavorites((prevUserFavorites) => { //returns always the previous state with this function
      return prevUserFavorites.concat(favoriteMeetup);
    });
  }
  function removeFavoriteHandler(meetupId) {
    setUserFavorites(prevUserFavorites => {
      return prevUserFavorites.filter(meetup => meetup.id !== meetupId);
    });
  }
  function itemIsFavoriteHandler(meetupId) {
    return userFavorites.some(meetup => meetup.id === meetupId);
  }

  // all handlers and state values of the context!
  const context = {
    favorites: userFavorites,
    totalFavorites: userFavorites.length,
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    itemIsFavorite: itemIsFavoriteHandler
  };

  return <FavoritesContext.Provider value={context}>
    {props.children}
  </FavoritesContext.Provider>
}

export default FavoritesContext;
