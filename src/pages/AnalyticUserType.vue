<script setup lang="ts">
import { useSessionStore } from '@/stores/session';
import { useUserStore } from '@/stores/user';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter()
const  id = router.currentRoute.value.params.id as string
const userStore = useUserStore()
const sessionStore = useSessionStore()
const userDatas : any = ref([])



onMounted(async()=>{
    userDatas.value = await userStore.fetchAllDataUser(id.toUpperCase())
})
</script>


<template >
    <main class="p-4">
        <div v-if="sessionStore.user?.roles === 'ADMIN'">
            <h1>assddddddddddddddddddddddddddd</h1>
        </div>
        <div v-for="user in userDatas" :key="user.id" class="flex gap-4 items-center bg-white shadow-md rounded-lg p-4 mb-4">
            <div class="text-lg font-semibold">{{ user.name }}</div>
            <div class="text-sm text-gray-500">{{ user.email }}</div>
            <div class="text-sm text-gray-500">{{ user.role }}</div>
    
        </div>
    </main>
</template>