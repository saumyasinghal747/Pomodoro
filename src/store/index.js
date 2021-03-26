import Vue from 'vue'
import Vuex from 'vuex'
import {Task} from '../plugins/definitions';
import VuexPersistence from 'vuex-persist'
Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

const ring = new Audio('/audios/kichen-timer.mp3')

export default new Vuex.Store({
  state: {
    tasks:[],
    status:'pomo', // has type status
    isPaused:false,
    timer: 25*60*1000, // this should be a timer counting backwards
    focusedTask:null,
    settings:{
      duration: {
        pomo:25,
        short:5,
        long:15
      },
      breakInterval:4, // every fourth break is long
      autoplay:true,
      alarm: true
       // amount of short breaks had
    },
    errorLog:'',
    breakCounter:0
  },
  mutations: {
    addTask: function(state, {name, note, pomodoros}) {
      state.tasks.push(new Task(name, pomodoros, note));
    },
    selectTask: function(state, index){
      state.focusedTask = state.tasks[index]
    },
    setDurations(state, {type, value}){
      state.settings.duration[type] = value;
    },
    setAutoplay(state, value){
      state.settings.autoplay = value;
    },
    setBreakInterval(state, value){
      state.settings.breakInterval = value;
    },
    setSettings(state, value){
      state.settings = value;
    }
  },
  actions: {
    selectTask: function({commit,dispatch}, index){
      commit('selectTask', index);
      dispatch('updateRP');

    },

    removeTask: function ({state, dispatch},taskID){
        const index = state.tasks.findIndex((task)=>{return task.id === taskID});
        state.tasks.splice(index, 1);
        if (state.focusedTask.id === taskID) state.focusedTask = null;
      dispatch('updateRP');
    },
    decrementTime({state, dispatch}){
      if (state.isPaused) return;
      state.timer -= 1000; // going a minute a second just to
      //state.errorLog = state.timer;
      // pause the timer once it finishes
      if (state.timer <= 0) dispatch('theTimerEnded');
    },
    theTimerEnded({state, dispatch}){
      //console.log('hiiii')

      state.isPaused = true;
      // pause stuff while we work on it
      switch (state.status) {
        case "short":
          state.status = "pomo";
          state.breakCounter++;
          break
        case "long":
          state.status = "pomo";
          state.breakCounter = 0;
          break
        case "pomo":
          state.status = (state.breakCounter === 3)? 'long': 'short';
          break
      }
      state.timer = state.settings.duration[state.status]*60*1000;
      if (state.settings.autoplay)  state.isPaused = false;
      if (state.settings.alarm) ring.play();

      dispatch('updateRP'); // very important lol

    },
    togglePause({state, dispatch}){
      state.isPaused = !state.isPaused;
      dispatch('updateRP'); // very important
    },
    updateRP({state, getters}){
      // dispatch an object to electron
      // if we have isPaused, then clear the rich presence and return
      // anything else, just set stuff
      // we need to send the state, the end timestamp
      console.log('something changed')

      ipcRenderer.send('RPUpdate', {
        endTimestamp: Date.now()+state.timer, // this should stay equal,
        state: {pomo:'Working',short:'5 minute break', long:'15 minute break'}[state.status],
        details: getters.title,
        instance: true,
        paused: state.isPaused
      })

    }
  },
  getters:{
    title(state) {
      return (state.status === 'pomo' ? (state.focusedTask || {name: 'Working'}).name : 'Taking a Break')
    }

  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})

