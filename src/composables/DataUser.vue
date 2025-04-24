<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


defineProps<{
    title: string
}>()

</script>

<template>
    <Card
      class="w-full sm:w-[45%] min-w-[280px] max-h-[190px] bg-white shadow-md rounded-lg overflow-hidden transition duration-300 hover:shadow-xl"
    >
      <CardHeader>
        <CardTitle class="text-center text-lg italic opacity-80">{{ title }}</CardTitle>
      </CardHeader>
      <CardContent class="overflow-y-auto max-h-[220px]">
        <slot />
      </CardContent>
    </Card>
  </template>
  
  
  