<script setup lang="ts">
import Dialogg from '@/composables/Dialogg.vue';
import { Button } from '@/components/ui/button'
import { DialogDescription, DialogTitle } from './ui/dialog';
import { Plus, Trash } from 'lucide-vue-next';
import { useModalStore } from '@/stores/modal';
import { useUserStore } from '@/stores/user';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { onMounted, reactive, ref } from 'vue';
import { toast } from 'vue-sonner';

const modalStore = useModalStore()
const userStore = useUserStore()
const roleItems = [
    {
        name:'admin',
        value:'ADMIN'
    },
    {
        name:'user',
        value:'USER'
    }
]
const datas = reactive({role:'', name:'', email:'', password:''})
async function hadleAddUser(){
    try {
        
        if(!datas.email || !datas.name || !datas.password || !datas.role){
            toast.error('data tidak boleh kosong')
            return
        }
       await userStore.addUser(datas)
        modalStore.closeModal()
        await userStore.fetchAllDataUser(datas.role)
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'User berhasil ditambahkan',
        })
    } catch (error:any) {
        const status = error.response?.status
        modalStore.closeModal()
        if(status === 400){
            Swal.fire({
                icon: 'error',
                title: 'Error',
            })
        }
    }
}
</script>

<template>
    <Dialogg :is-open="modalStore.isOpen('addUser')">
        <template #trigger>
            <Button @click="modalStore.openModal('addUser')" class="bg-green-700" >
                <Plus  class="h-4 w-4 mr-2" />
                Add User
            </Button>
        </template>
        <template #content>
            <DialogTitle class="text-center">Add User</DialogTitle>
            <DialogDescription >Apakah anda ingin benar benar menambahkan user?</DialogDescription>
            <Input v-model="datas.name" placeholder="nama"/>
            <Input v-model="datas.email" type="email" placeholder="email"/>
            <Input v-model="datas.password" type="password" placeholder="password"/>
            <Select v-model="datas.role">
                <SelectTrigger>
                    <SelectValue placeholder="pilih role yang anda inginkan" />
                </SelectTrigger>
                <SelectContent>
                    <SelectLabel>Role</SelectLabel>
                    <SelectGroup>
                        <SelectItem v-for="role in roleItems" :key="role.name" :value="role.value">
                            {{ role.name }}
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </template>
        <template #footer>
            <div class="flex flex-row gap-3">
                <Button @click="modalStore.closeModal" variant="outline">Cancel</Button>
                <Button class="bg-green-600 hover:bg-gray-950/80" @click="hadleAddUser" variant="destructive">Save</Button>
            </div>
        </template>
    </Dialogg>
</template>
