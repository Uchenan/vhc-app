<template>
  <div
    :style="'background:' + 'url(' + selected_img + '); background-size: contain;'"
    class="tweask w-screen h-screen flex justify-center back">
      <router-view></router-view>
      
  </div>
</template>

<script>
import bgImage from "@/assets/imgs/random_imgs/bg_two.png";

export default {
  data() {
    return {
      // imgs: [
      //     "https://res.cloudinary.com/dwgq7rnz2/image/upload/v1724561091/pngegg_4_fnyyzb.png",
      //     "https://res.cloudinary.com/dwgq7rnz2/image/upload/v1724561104/pngegg_5_y79r6d.png",
      //     "https://res.cloudinary.com/dwgq7rnz2/image/upload/v1724561101/pngegg_8_b7i7kt.png",
      //     "https://res.cloudinary.com/dwgq7rnz2/image/upload/v1724563770/pngegg_4_pyjljb.png",
      //     "https://res.cloudinary.com/dwgq7rnz2/image/upload/v1724563769/pngegg_6_crggh4.png",
      //     "https://res.cloudinary.com/dwgq7rnz2/image/upload/v1724563768/pngegg_5_tarbwv.png"
      // ],
      selected_img: bgImage,
    };
  },
  mounted() {
    // switching the image continuously
    // setInterval(() => {
    //     let random = Math.floor(Math.random() * this.imgs.length)
    //     this.selected_img = this.imgs[random]
    // }, 7000)
  },
};
</script>

<style scoped>
.tweak {
  transition-property: background;
  transition-duration: 0.5s;
}
</style>
