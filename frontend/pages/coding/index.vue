<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card
        class="mx-auto"
        max-width="500"
      >
        <v-card-text class="pa-16">
          "Programming isn't about what you know; it's about what you can figure out.”
        </v-card-text>
        <v-fade-transition>
          <v-overlay
            v-if="true | hover"
            absolute
            color="#036358"
          >
            <span style="font-family:cursive;color:black" class="pt-16">Will BE coming soon..</span>
          </v-overlay>
        </v-fade-transition>
      </v-card>
    </template>
  </v-hover>
</template>