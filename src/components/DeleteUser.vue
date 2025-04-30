<script setup lang="ts">
import Dialogg from '@/composables/Dialogg.vue';
import { Button } from '@/components/ui/button'
import { DialogTitle } from './ui/dialog';
import { Trash } from 'lucide-vue-next';
import { useModalStore } from '@/stores/modal';
import { toast } from 'vue-sonner';
import { useUserStore } from '@/stores/user';

const props = defineProps<{
    userId: string,
    userEmail: string
}>()

const modalStore = useModalStore()
const userStore = useUserStore()
async function handleDeleteUser() {
    try {
        await userStore.deleteUser(props.userId)
        toast.success("berhasil menghapus user")
    } catch (error:any) {
        const status = error.respone?.status
        if (status === 400) {
            toast.error("gagal menghapus user")
            return
        }
    }finally {
        modalStore.closeModal()
    }
}
</script>

<template>
    <Dialogg :is-open="modalStore.isOpen('deleteUser')">
        <template #trigger>
            <Button @click="modalStore.openModal('deleteUser')" variant="destructive" class="w-full">
                <Trash  class="h-4 w-4 mr-2" />
                Delete
            </Button>
        </template>
        <template #content>
            <DialogTitle class="text-center">Delete User</DialogTitle>
            <p class=" text-sm text-muted-foreground">
              Apakah kamu yakin ingin menghapus user ini dengan email : {{ props.userEmail }}
            </p>
        </template>
        <template #footer>
            <div class="flex flex-row gap-3">
                <Button @click="modalStore.closeModal" variant="outline">Cancel</Button>
                <Button @click="handleDeleteUser" variant="destructive">Delete</Button>
            </div>
        </template>
    </Dialogg>
</template>
