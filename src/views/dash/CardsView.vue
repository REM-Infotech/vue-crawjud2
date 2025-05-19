<script setup lang="ts">
import { BCard, BCardText, BButton } from 'bootstrap-vue-next'
</script>

<template>
  <BCard
  title="Card Title"
  img-src="https://picsum.photos/600/300/?image=25"
  img-alt="Image"
  img-top
  tag="article"
  style="max-width: 20rem"
>
  <BCardText>
    Some quick example text to build on the card title and make up the bulk of the card's content.
  </BCardText>
  <BButton href="#" variant="primary">Go somewhere</BButton>
</BCard>
</template>
