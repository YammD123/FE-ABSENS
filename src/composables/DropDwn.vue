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
            <Ellipsis class="h-4 w-4" />
    </DropdownMenuTrigger>
    <DropdownMenuContent>
        <slot name="content"/>
    </DropdownMenuContent>
  </DropdownMenu>
</template>