<script setup lang="ts">
import { Button } from '@/components/ui/button'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'


defineProps<{
    title: string
    decription?: string
    triger: string
}>()
</script>

<template>
  <Sheet class="flex-none">
    <SheetTrigger as-child>
      <Button variant="outline">
        {{ triger }}
      </Button>
    </SheetTrigger>
    <SheetContent>
        <SheetHeader>
          <SheetTitle>{{ title }}</SheetTitle>
          <SheetDescription>{{ decription }}</SheetDescription>
        </SheetHeader>
        <slot/>
      <SheetFooter>
        <SheetClose as-child>
            <slot name="close"/>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>