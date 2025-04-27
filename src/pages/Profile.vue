<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Sheet from "@/composables/Sheet.vue";
import router from "@/router";
import { useSessionStore } from "@/stores/session";
import { LogOut } from "lucide-vue-next";
import { toast } from "vue-sonner";



//variables
const session = useSessionStore()



//functions
const handleLogout = async ()=>{
  try {
    await session.logOut()
    toast.success('Logout Success')
    router.push('/')
  } catch (error) {
    console.log(error)
  }
}
</script>
<template>
  <div class="relative min-h-screen">
    <Button
      variant="destructive"
      class="fixed top-4 right-4 z-10"
      @click="handleLogout"
    >
      <LogOut class="w-4 h-4"/>
      LogOut
    </Button>

    <div class="flex flex-col gap-4 p-4">
      <Sheet
        triger="Edit Profile"
        decription="Make changes to your profile here. You can change your name, photo and password here."
        title="Edit Profile"
      >
        <div class="px-3">
          <div class="flex flex-col gap-2">
            <Label>Email</Label>
            <Input placeholder="Email" />
          </div>
          <div class="flex flex-col gap-2">
            <Label>Password</Label>
            <Input placeholder="Password" />
          </div>
        </div>
        <template #close>
          <Button>PP</Button>
        </template>
      </Sheet>
    </div>
  </div>
</template>