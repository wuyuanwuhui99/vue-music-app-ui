import {getLyric} from 'api/song'
import {ERR_OK} from 'api/config'
import {Base64} from 'js-base64'

export default class Song {
  constructor({id, mid, singer, name, album ,albummid ,duration, image,localImage, url,kugouUrl="",lyric,playMode="",localUrl="",paly_mode,updateTime,createTime}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.albummid = albummid
    this.duration = duration
    this.image = image
    this.url = url
    this.kugouUrl = kugouUrl;
    this.playMode= playMode;
    this.localUrl = localUrl;
    this.lyric = lyric;
    this.paly_mode = paly_mode;
    this.updateTime = updateTime;
    this.createTime = createTime;
    this.localImage = localImage;
  }

  getLyric() {
    return new Promise((resolve, reject) => {
      if(this.lyric){
          this.lyric = decodeURIComponent(this.lyric);
          resolve(this.lyric)
      }else{
          getLyric(this.mid).then((res) => {
              this.lyric = Base64.decode(res.lyric)
              resolve(this.lyric)
          })
      }
    })
  }
}

export function createSong(musicData) {
  return new Song({
    id: musicData.songid || musicData.id,
    mid: musicData.songmid || musicData.mid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname || musicData.name,
    album: musicData.albumname||musicData.album.name,
    albummid: musicData.albummid || musicData.album.mid,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid||musicData.album.mid}.jpg?max_age=2592000`,
    url:""
  })  
}

export function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}

