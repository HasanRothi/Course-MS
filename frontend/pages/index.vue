<template >
  <div>
    <v-row>
    <v-carousel>
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      reverse-transition="scroll-x-reverse-transition"
      transition="scroll-x-transition"
    ></v-carousel-item>
  </v-carousel>
  </v-row>
  <v-row >
    <v-col  cols="12"
          md="3" v-for="(icon,i) in icons" :key="i">
         <v-hover
        v-slot="{ hover }"
        open-delay="200"
      >
        <v-card
          :elevation="hover ? 16 : 2"
          :class="{ 'on-hover': hover }"  
          outlined
        >
          <v-card-text class="text-center">
            <h3 style="font-family:cursive"><i>{{icon}}</i></h3>
          </v-card-text>
        </v-card>
      </v-hover>
    </v-col>
  </v-row>
  </div>
</template>
<script>
import img1 from '../assets/slider-img/img1.jpg'
import img2 from '../assets/slider-img/img2.jpg'
import img3 from '../assets/slider-img/img3.jpg'
import img4 from '../assets/slider-img/img4.jpg'
  export default {
     head() {
    return {
      title: `Course-MS | HOME`
    };
  },
    data () {
      return {
        picker : null,
        icons:["UnderGraduate Program","Graduate Program","Apply Online","Adminssion Info"],
        items: [
           {
            src:img2 ,
          },
          {
            src: img3,
          },
          {
            src: img4,
          },
          {
            src: img1,
          },
         
        ],
      }
    },
  }
</script>