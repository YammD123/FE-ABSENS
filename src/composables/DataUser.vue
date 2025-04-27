<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

defineProps<{
  title: string
}>();
</script>

<template>
  <div class="w-96 card">
    <Card
     class="w-full min-w-[600px] max-h-[190px] bg-white shadow-md rounded-lg overflow-hidden transition duration-300 hover:shadow-xl"
   >
     <CardHeader>
       <CardTitle class="text-center text-lg italic opacity-80">{{ title }}</CardTitle>
     </CardHeader>
     <CardContent class="overflow-y-auto max-h-[220px]">
       <slot />
     </CardContent>
   </Card>
  </div>
  
</template>