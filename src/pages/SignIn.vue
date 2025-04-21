<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Auth from '@/composables/Auth.vue';
import { Button } from '@/components/ui/button';
import { ref, type Ref } from 'vue';
import authForm from '@/actions/authForm';


const data : Ref<{email: string, password: string}> = ref({email: '', password: ''})
function submit() {
    try {
        authForm.authFormSignIn(data.value)
    } catch (error) {
        console.log(error)
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
            <div class="flex flex-col gap-2">
                <Label>Password</Label>
                <Input v-model="data.password" placeholder="Password" />
            </div>
            <Button>Sign In</Button>
        </form>
    </Auth>
</template>