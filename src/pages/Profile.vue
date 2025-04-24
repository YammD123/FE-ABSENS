<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Sheet from "@/composables/Sheet.vue";
import { toast } from "vue-sonner";

function submit() {
  toast.success('aasasas')
}


</script>

<template>
  <Sheet
    triger="Edit Profile"
    decription="Make changes to your profile here. You can change your name, photo and password here."
    title="Edit Profile"
  >
    <div class="px-3">
      <div  class="flex flex-col gap-2">
        <Label>Email</Label>
        <Input placeholder="Email" />
      </div>
      <div  class="flex flex-col gap-2">
        <Label>Password</Label>
        <Input placeholder="Password" />
      </div>
    </div>
    <template #close>
      <Button>PP</Button>
    </template>
  </Sheet>
  <Button @click="submit">Submit</Button>
</template>
