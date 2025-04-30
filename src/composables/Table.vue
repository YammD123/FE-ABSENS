<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableHeader,
} from '@/components/ui/table'


</script>

<template>
  <Table>
    <TableCaption>This is a caption.</TableCaption>
    <TableHeader>
        <slot name="header" />
    </TableHeader>
    <TableBody>
        <slot name="body"/>
    </TableBody>
  </Table>
</template>