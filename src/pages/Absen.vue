<script setup lang="ts">
import AdminAddAbsen from '@/components/AdminAddAbsen.vue';
import UserAbsen from '@/components/UserAbsen.vue';
import { useSessionStore } from '@/stores/session';

const useSession = useSessionStore()

</script>


<template>
    <main class="px-4">
        <div v-if="useSession.user?.roles === 'ADMIN'">
            <AdminAddAbsen />
        </div>
        <div v-else>
            <UserAbsen/>
        </div>
    </main>
</template>