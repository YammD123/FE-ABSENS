<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import router from "@/router";
import { useSessionStore } from "@/stores/session";
import { LogOut } from "lucide-vue-next";
import { toast } from "vue-sonner";
import { useProfileStore } from "@/stores/profile";
import { onMounted } from "vue";

const session = useSessionStore()
const useProfile = useProfileStore()
const handleLogout = async () => {
  try {
    await session.logOut()
    toast.success('Logout Success')
    router.push('/')
  } catch (error) {
    console.log(error)
  }
}
onMounted(async () => {
  await useProfile.fetchProfile()
})
</script>

<template>
  <div class="relative min-h-screen">
    <Button
      variant="destructive"
      class="fixed top-4 right-4 z-10"
      @click="handleLogout"
    >
      <LogOut class="w-4 h-4 mr-2" />
      Log Out
    </Button>

    <div v-if="useProfile.data.user" class="flex flex-col items-center justify-center h-screen gap-4 text-center">
      <Avatar class="w-24 h-24">
        <AvatarImage :src="useProfile.data.avatar_image" alt="@unovue" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div>
        <h2 class="text-xl font-semibold">{{ useProfile.data.user.name || 'Nama Pengguna' }}</h2>
        <p class="text-gray-500">{{ useProfile.data.user.email || 'email@example.com' }}</p>
      </div>
    </div>
  </div>
</template>
