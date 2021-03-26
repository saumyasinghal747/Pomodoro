<template>
  <v-app style="height:100%;width: 100%" :style="{backgroundColor: color}">
    <v-app-bar
      app
      color="transparent primary--text"
      flat

      dark
    >

      <div class="d-flex align-center">
        <v-app-bar-title class="white--text" >Pomodoro</v-app-bar-title>
      </div>
      <v-spacer></v-spacer>

      <v-dialog
          v-model="settingsDialog"
          persistent
          max-width="600px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn elevation="0" :color="color + ' lighten-2'"  class="mt-4" v-bind="attrs"
                 v-on="on">
            <v-icon class="mr-2">mdi-cog</v-icon> Settings
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline"><v-icon class="mr-2">mdi-cog</v-icon>Settings</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                    cols="4"
                >
                  <v-text-field
                      v-model="settings.duration.pomo"
                      label="Pomo"
                      required
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="4"
                >
                  <v-text-field
                      v-model="settings.duration.short"
                      label="Short Break"
                      required
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="4"
                >
                  <v-text-field
                      v-model="settings.duration.long"
                      label="Long Break"
                      required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                    cols="4"
                >
                  <v-switch
                  v-model="settings.autoplay"
                  :color="color"
                  label="Autostart"

                  >
                  </v-switch>
                </v-col>
                <v-col
                    cols="4"
                >
                  <v-switch
                      v-model="settings.alarm"
                      :color="color"
                      label="Alarm"

                  >
                  </v-switch>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                      v-model="settings.breakInterval"
                      label="Long break interval"
                  >
                  </v-text-field>
                </v-col>

              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                :color="color"
                text
                @click="settingsDialog = false"
            >
              Close
            </v-btn>
            <v-btn
                v-show="false"
                :color="color"
                text
                @click="newTask"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app-bar>

    <v-main>
      <div class="text-center pt-15 pb-15">
          <h1 class="display-2 white--text">{{ new Date($store.state.timer) | moment("mm:ss") }}</h1>


        <v-btn
            @click="$store.dispatch('togglePause')"
            class="ma-2 my-10"
            icon
            text
            large
            color="white lighten-2"
        >
          <v-icon v-if="$store.state.isPaused">mdi-play</v-icon>
          <v-icon v-if="!$store.state.isPaused">mdi-pause</v-icon>
        </v-btn>


        <v-list :color="color + ' lighten-5'" elevation="2" rounded class="mx-16">
          <v-list-item-group
              v-model="selectedItem"
              :color="color + ' darken-2'"
          >

            <v-list-item
                v-for="task of $store.state.tasks"
                :key="task.id"
            >
              <v-list-item-icon>0/{{task.pomodoros}}</v-list-item-icon>
              <v-list-item-title>{{task.name}}</v-list-item-title>
              <v-list-item-action><v-btn @click="$store.dispatch('removeTask',task.id)" color="green" icon><v-icon>mdi-check</v-icon></v-btn></v-list-item-action>
            </v-list-item>


          </v-list-item-group>

          <v-dialog
              v-model="newtaskdialog"
              persistent
              max-width="600px"
          >
            <template v-slot:activator="{ on, attrs }">
                  <v-btn class="mt-4" v-bind="attrs"
                         v-on="on">
                    <v-icon>mdi-plus</v-icon> New task
                  </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">New Task</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          v-model="newTaskData.name"
                          label="Title"
                          required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                          v-model="newTaskData.note"
                          label="Note"
                      ></v-textarea>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                    >
                      <v-slider
                          v-model="newTaskData.pomos"
                          label="Pomodoros"
                          min="1"
                          max="10"
                          step="1"
                          thumb-color="red"
                          thumb-label="always"
                      ></v-slider>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="newtaskdialog = false"
                >
                  Close
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="newTask"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>


        </v-list>

      </div>

      <v-card v-if="false">
        <v-card-text>{{$store.state.errorLog}}</v-card-text>
      </v-card>
      <v-title :suffix="title" :title="new Date($store.state.timer) | moment('mm:ss')"></v-title>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import VTitle from "@/components/vTitle";

export default {
  name: 'App',

  components: {
    VTitle,
    HelloWorld,
  },

  data(){ return {
    selectedItem:null,
    newtaskdialog:false,
    newTaskData:{
      name:'',
      note:'',
      pomos:1
    },
    settingsDialog: false,
    settings: this.$store.state.settings
    //
  }},
  computed:{

    title(){
      return (this.$store.state.status === 'pomo' ? (this.$store.state.focusedTask || {name: 'Working'}).name : 'Taking a Break')
    },

    color(){
      switch (this.$store.state.status) {
        case "short":
          return 'teal'
        case "long":
          return 'lightblue'
        case "pomo":
          return 'orange'
      }
    }

  },
  methods:{
    newTask(){
      if (this.name){
        return;
      }

      this.$store.commit('addTask', {name:this.newTaskData.name, note:this.newTaskData.note, pomodoros:this.newTaskData.pomos})
      this.newTaskData = {
        name:'',
        note:'',
        pomos:1
      }
      this.newtaskdialog = false;
    }
  },
  watch:{
    selectedItem:{
      immediate: true,
      handler(val){
        this.$store.dispatch('selectTask', val)

      }
    },
    settings:{
      immediate: true,
      handler(val){
        this.$store.commit('setSettings', val)
      }
    }
  }
};
</script>
