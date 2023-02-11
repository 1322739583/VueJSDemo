 import Vue from 'vue'
 import Vuex from 'vuex'
import { getAllSongs } from '../services'

 Vue.use(Vuex)

 export default new Vuex.Store({
       state:{
           artistAllSongs:[]
       },
       actions:{
          async fetchAllSongs(store,artistId){
             const res=await  getAllSongs(artistId)
             console.log("fetchAllSongs res:",res);
             store.commit("updateArtistAllSongs",res.data) 
           }
       },
       mutations:{
           updateArtistAllSongs(state,songs){
                  state.artistAllSongs=songs
           }
       }
 })
