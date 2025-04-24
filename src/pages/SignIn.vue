<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Auth from '@/composables/Auth.vue';
import { Button } from '@/components/ui/button';
import { ref, type Ref } from 'vue';
import authForm from '@/actions/authForm';
import { toast } from 'vue-sonner';
import router from '@/router';

const data : Ref<{email: string, password: string}> = ref({email: '', password: ''})


async function submit() {
    try {
        if (!data.value.email || !data.value.password) {
            toast.error('email dan password harus diisi')
            return
        }
       await authForm.authFormSignIn(data.value)
       router.push('/dashboard')
        toast.success('berhasil login')
    } catch (error:any) {
        const status = error.response?.status
        if (status === 400) {
            toast.error("password salah")
            return
        }
        if (status === 404) {
            toast.error("email tidak ditemukan")
            return
        }
    }
}
</script>

<template>
    <Auth title="Sign In">
        <form @submit.prevent="submit" class="flex flex-col gap-8">
            <div class="flex flex-col gap-2">
                <Label >Email</Label>
                <Input v-model="data.email" placeholder="Email" />
            </div>
            <div  class="flex flex-col gap-2">
                <Label>Password</Label>
                <Input v-model="data.password" placeholder="Password" />
            </div>
            <Button>Sign In</Button>
        </form>
    </Auth>
</template>