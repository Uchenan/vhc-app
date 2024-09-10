<template>
    <div class="pt-12 w-11/12 md:w-10/12">
      <!-- {{ $store.getters['applicant/details'] }} -->
      <div class="p-4 mx-auto backdrop-blur-sm dark:bg-gray-600 rounded-2xl shadow-xl flex flex-col space-x-2 h-5/6 md:h-4/5">
        <span class="text-xl font-medium text-secondary text-center block md:hidden">Applicant Form </span>
        <div class="border-b-2 px-4 py-2 flex justify-between items-center">
          <span class="text-xl font-medium text-secondary hidden md:block">Applicant Form </span>
          <i class="mdi text-2xl block md:hidden"
           :class="(sidePane)? ' mdi-close' : 'mdi-menu'" @click="sidePane = !sidePane"></i>
          <div>
            <span class="px-2 md:px-4 mx-2 py-1 text-sm md:py-1">Gen ID : <b> {{ $store.getters['applicant/details'].gen_id }} </b></span> 
            <button class="px-2 md:px-4 mx-2 py-1 text-sm md:py-1 bg-gray-500 text-white rounded" v-show="applicant.available_for_check === false" @click="saver">Save</button> 
          </div>
        </div> 
        <!-- <div> {{ `${$store.getters['applicant/details'].info.bio.surname} ${$store.getters['applicant/details'].info.bio.other_names}` }} </div> -->
        <div v-if="!underReview"  class="flex h-full overflow-hidden relative">
          <!-- SIDE PANE -->
          <div class="w-56 pt-4 md:static border-r-2 overflow-y-auto scrollbar md:block" 
            :class="(sidePane)? 'w-full' : 'hidden'">
            <img class="h-26 w-36 mb-4" src="/school_img.png" alt="Vicegerents Logo">
            
            <!-- MENU SECTION -->
            <span class="block my-2 py-2 pl-2 w-full hover:cursor-pointer hover:bg-gray-200"
            v-for="(value, index) in menu" :key="index" @click="change_display(value.value)"
            :class="(display == value.value)? 'bg-gray-200' : ''">
              <i :class="'mr-2 mdi mdi-' + value.icon"></i> {{ value.name }}
            </span> 
          </div>

          <div class="w-full p-2 px-4 overflow-auto scrollbar" :class="(sidePane)? 'hidden' : 'block'">
          <!-- DISPLAY ARENA  -->
            <BioComponent v-if="display == 'bio'" @save="saver" /> 
            <AccountComponent v-else-if="display == 'account'" @save="saver" /> 
            <FatherComponent v-else-if="display == 'father'" @save="saver" /> 
            <MotherComponent v-else-if="display == 'mother'" @save="saver"/> 
            <SponsorComponent v-else-if="display == 'sponsor'" @save="saver" /> 
            <AllegianceComponent v-else-if="display == 'allegiance'" @save="saver" /> 
            <AcceptanceComponent v-else-if="display == 'acceptance'" @save="saver" /> 
            <SignOutComponent v-else-if="display == 'sign_out'" @yes="signOut" @no="display = 'welcome'" /> 
            <PhotoComponent v-else-if="display == 'photo'" /> 
            <WelcomeComponent @submit="submit" :underReview="underReview" v-else /> 
          </div>
        </div>
        
        <div v-else-if="applicant.ref_id !== '' && applicant.password !== '' " class="flex flex-col items-center mt-6">
          <i class="mdi mdi-party-popper" style="font-size: 70px;"></i>
          <h2>You have been Enrolled Successfully</h2>
          <h2 class="text-4xl font-bold text-primary">Congratulations!!! </h2>

          <div class="my-4 flex flex-col items-center">
              <span>Ref ID => <b>{{ applicant.ref_id }}</b> </span>
              <span>Password => <b>{{ applicant.password }}</b> </span>
          </div>
          
          
          <span class="border-t-2">Pen down your login details securely</span>
          <button class="btn-1 mt-2" @click="login">Proceed to Login<i class="mdi mdi-chevron-right ml-2"></i></button>
        </div>
        
        <div v-else class="flex flex-col items-center justify-center mt-6">
          <i class="mdi mdi-text-box-search-outline text-primary"  style="font-size: 70px"></i>
          <h2 class="text-center">Your data have been submitted to the admin and is under review. <br /><b> Please check back later for admission status </b></h2>

          <button class="btn-1 bg-danger mt-6" @click="signOut"><i class="mdi mdi-logout"></i>Log out </button>
        </div>
      </div>

    </div>
</template>

<script>
import BioComponent from "@/components/apply_parts/BioComponent.vue"
import AccountComponent from "@/components/apply_parts/AccountComponent.vue"
import FatherComponent from "@/components/apply_parts/FatherComponent.vue"
import MotherComponent from "@/components/apply_parts/MotherComponent.vue"
import SponsorComponent from "@/components/apply_parts/SponsorComponent.vue"
import AllegianceComponent from "@/components/apply_parts/AllegianceComponent.vue"
import AcceptanceComponent from "@/components/apply_parts/AcceptanceComponent.vue"
import WelcomeComponent from "@/components/apply_parts/WelcomeComponent.vue"
import PhotoComponent from "@/components/apply_parts/PhotoComponent.vue"
import SignOutComponent from "@/components/apply_parts/SignOutComponent.vue"

import { openModal } from "jenesius-vue-modal"
import ModalComponent from "@/components/ModalComponent.vue"
import ConfirmComponent from "@/components/ConfirmComponent.vue"

export default {
  data(){
    return {
      display: "welcome",
      menu: [
        {name: "Home", value: "welcome", icon: "home-circle"},
        {name: "Bio", value: "bio", icon: "account"},
        {name: "Account", value: "account", icon: "account-school"},
        {name: "Father's Info", value: "father", icon: "face-man"},
        {name: "Mother's Info", value: "mother", icon: "face-woman"},
        {name: "Sponsor's Info", value: "sponsor", icon: "help"},
        {name: "Photo Uploads", value: "photo", icon: "help"},
        {name: "Allegiance", value: "allegiance", icon: "file-document"},
        {name: "Acceptance", value: "acceptance", icon: "file-check"},
        {name: "Sign Out", value: "sign_out", icon: "logout"},
      ], 
      sidePane: false,
      underReview: false 
    }
  },
  components: {
    BioComponent, AccountComponent, FatherComponent, 
    MotherComponent, SponsorComponent, AllegianceComponent, 
    WelcomeComponent, AcceptanceComponent, PhotoComponent, SignOutComponent
  },
  computed: {
    applicant(){
      return this.$store.getters['applicant/details']
    }
  }, 
  mounted() {
    this.$store.commit("deactivateLoadingState");
    if(this.applicant.available_for_check === true){
      this.underReview = true 
    } else {
      this.underReview = false 
    }
  },
  methods: {
    change_display(val){
      this.display = val
      this.sidePane = false  
    },
    saver(){
      this.$store.dispatch('applicant/update').then(doc => {
        if(doc == true){
          openModal(ModalComponent, {modal_type: "success", modal_body: "Details saved successfully"})
        }else {
          openModal(ModalComponent, {modal_type: "failed", modal_body: "An error occurred! Check Internet Connection"})
        }
      }).catch(() => {
          openModal(ModalComponent, {modal_type: "failed", modal_body: "An error occurred! Check Internet Connection"})
      }).finally(() => {
        this.display = "welcome"
      })
    },
    async submit(){
      const modal = await openModal(ConfirmComponent, {file_body: "Are you sure you are ready to submit your data to the management for review? If not, you can save instead"})
      modal.on('return', (value) => {
        if(value == false){
          console.log("here")
          modal.close()
        } else {
          this.applicant.available_for_check = true 
          this.saver()
          this.$router.go(0)
        }
      })
    },
    signOut(){
      this.$store.commit('applicant/UNSET_APPLICANT')
      this.$router.push({name: "applyLogin"})
      openModal(ModalComponent, {modal_type: "success", modal_body: "Do have a wonderful day!"})

    },

    login(){
      this.$store.commit('applicant/UNSET_APPLICANT')
      this.$router.push({name: "login"})
    }
  }
};
</script>
