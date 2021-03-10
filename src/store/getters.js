import Song from 'common/js/song'
export const singer = state => state.singer

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playlist = state => state.playlist

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

export const currentSong = (state) => {
  if(state.currentIndex >=0){
    return new Song(state.playlist[state.currentIndex],state.currentIndex) 
  }else{
    return {}
  }
}

export const disc = state => state.disc

export const topList = state => state.topList

export const searchHistory = state => state.searchHistory

export const playHistory = state => state.playHistory

export const favoriteList = state => state.favoriteList;

export const showLogin = state => state.showLogin;

export const userData = state => state.userData;

export const token = state => state.token;
