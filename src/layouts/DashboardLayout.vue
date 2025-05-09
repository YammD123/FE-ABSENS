<script setup lang="ts">
import { useSessionStore } from "@/stores/session";
import { ChartSpline, CircleUser, ClipboardPenLine, Search, Settings } from "lucide-vue-next";
import { useRoute } from "vue-router";

const route = useRoute()
const useSession= useSessionStore()
const items = [
  {
    title: "Profile",
    url: "/dashboard",
    icon: CircleUser,
  },
  {
    title: "Absen",
    url: "/dashboard/absen",
    icon: ClipboardPenLine,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];
if (useSession.user?.roles === "ADMIN"){
  items.splice(1, 0,{
    title: "Analytic",
    url: "/dashboard/analytic",
    icon: ChartSpline,
  })
}

function isActive(url:string){
  if (url === '/dashboard') {
    return route.path === url
  }
  return route.path.startsWith(url)
}
</script>

<template>
  <div class="flex gap-2">
    <!-- Sidebar dengan Gradient Biru -->
    <aside class="fixed top-0 left-0 h-screen bg-gradient-to-b from-blue-600 to-blue-900 w-52 border-r shadow-sm p-4 flex flex-col gap-4">
      <h2 class="text-lg font-semibold px-2 text-white">Application</h2>
      <nav class="flex flex-col gap-1">
        <RouterLink
          v-for="item in items"
          :key="item.title"
          :to="item.url"
          :class="['flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-blue-800 transition-colors', isActive(item.url) ? 'bg-blue-950' : 'text-white']"
        >
          <div class="flex gap-4">
            <component :is="item.icon" class="w-5 h-5 text-white" />
            <span class="text-white">{{ item.title }}</span>
          </div>
        </RouterLink>
      </nav>
    </aside>

    <!-- Konten Utama, tambahkan padding kiri untuk menghindari tertutupnya sidebar -->
    <div class="pl-52 w-full">
      <RouterView v-slot="{Component}">
        <KeepAlive>
          <component :is="Component" v-if="$route.meta.keepAlive" />
        </KeepAlive>
        <component :is="Component" v-if="!$route.meta.keepAlive" />
      </RouterView>
    </div>
  </div>
</template>
