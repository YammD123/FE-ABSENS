<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Ellipsis } from 'lucide-vue-next';
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <slot name="trigger"/>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
        <slot name="content"/>
    </DropdownMenuContent>
  </DropdownMenu>
</template>