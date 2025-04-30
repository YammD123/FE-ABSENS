<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'

const props = defineProps<{
    isOpen: boolean
}>()
</script>

<template>
  <Dialog :open="props.isOpen" >
    <DialogTrigger as-child>
        <slot name="trigger" />
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
        <slot name="content"/>
      <DialogFooter>
        <slot name="footer"/>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>