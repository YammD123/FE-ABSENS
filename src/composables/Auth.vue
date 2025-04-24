<template>
    <div class="flex justify-center items-center h-screen">
        <Card class="container max-w-lg">
            <CardHeader>
                <CardTitle class="text-center font-semibold text-xl italic">{{ title }}</CardTitle>
            </CardHeader>
            <CardContent>
                <slot/>
            </CardContent>
        </Card>
    </div>
</template>

<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

defineProps<{
    title:string
}>()

</script>