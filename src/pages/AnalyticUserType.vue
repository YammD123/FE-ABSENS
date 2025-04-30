<script setup lang="ts">
import AddUser from "@/components/AddUser.vue";
import DeleteUser from "@/components/DeleteUser.vue";
import { Input } from "@/components/ui/input";
import { TableCell, TableHead, TableRow } from "@/components/ui/table";
import DropDwn from "@/composables/DropDwn.vue";
import Table from "@/composables/Table.vue";
import { useUserStore } from "@/stores/user";
import type { User } from "@/types/userType";
import { SearchIcon} from "lucide-vue-next";
import { computed, onMounted, ref, type Ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const id = router.currentRoute.value.params.id as string;
const userStore = useUserStore();
const userDatas: Ref<User[]> = ref([]);
const Search = ref("");
const filteredUsers = computed(() =>
  userStore.allDatas.filter((user) =>
    user.name.toLowerCase().includes(Search.value.toLowerCase())
  )
);

onMounted(async () => {
  return (userDatas.value = await userStore.fetchAllDataUser(id.toUpperCase()));
});
</script>

<template>
  <main class="p-4 w-full">
    <AddUser/>
    <div class="flex justify-between items-center relative">
      <Input class="my-4" v-model="Search" placeholder="Search" />
      <SearchIcon class="absolute right-4 top-5 text-gray-400" />
    </div>
    <Table v-if="filteredUsers.length > 0" >
      <template #header>
        <TableRow class="bg-blue-600 rounded hover:bg-blue-700">
          <TableHead class="text-white">Name</TableHead>
          <TableHead class="text-white">Email</TableHead>
          <TableHead class="text-white">Role</TableHead>
          <TableHead class="text-right  text-white">Action</TableHead>
        </TableRow>
      </template>
      <template #body>
        <TableRow class="gap-4" v-for="user in filteredUsers" :key="user.id">
          <TableCell class="py-2">{{ user.name }}</TableCell>
          <TableCell class="py-2">{{ user.email }}</TableCell>
          <TableCell class="py-2">{{ user.role }}</TableCell>
          <TableCell class="text-right py-2 pr-5">
            <DropDwn>
              <template #content>
                <DeleteUser :user-id="user.id" :user-email="user.email"/>
              </template>
            </DropDwn>
          </TableCell>
        </TableRow>
      </template>
    </Table>
    <div
      v-else
      class="flex flex-col gap-4 items-center justify-center h-screen"
    >
      <h1 class="text-2xl font-semibold">No Data Found</h1>
      <p class="text-gray-500">No data found for your search</p>
    </div>
  </main>
</template>
