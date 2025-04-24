
<script setup lang="ts">
import fetchUser from '@/actions/fetchUser';
import DataUser from '@/composables/DataUser.vue';
import type { User } from '@/types/userType';
import { onMounted, ref, type Ref } from 'vue';


const user:Ref<User | null> =  ref(null)
onMounted(async()=>{
    const res = await fetchUser.getUser()
    user.value = res.data.data
})
</script>

<template>
    <div class="w-[80%] flex justify-center">
      <div class="flex flex-wrap justify-center gap-6 w-full max-w-6xl px-4 py-8">
        <DataUser title="Admin information">
          <div class="flex flex-col gap-2">
            <h1 class="text-lg font-semibold">Name</h1>
            <p class="text-sm text-gray-500">{{ user?.name }}</p>
          </div>
        </DataUser>
  
        <DataUser title="user information">
          <div class="flex flex-col gap-2">
            <h1 class="text-lg font-semibold">Email</h1>
            <p class="text-sm text-gray-500">p</p>
          </div>
        </DataUser>
      </div>
    </div>
  </template>
  
  
