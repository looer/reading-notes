<template>
  <div data-theme="retro" class="min-h-screen bg-base-200">
    <div class="drawer lg:drawer-open">
      <input id="sidebar-drawer" type="checkbox" class="drawer-toggle" />

      <!-- Drawer content -->
      <div class="drawer-content">
        <!-- Page content -->
        <div class="flex">
          <label
            for="sidebar-drawer"
            class="btn btn-square btn-ghost drawer-button lg:hidden fixed top-4 left-4 z-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>

          <main class="flex-1 p-8 lg:pl-8">
            <NuxtPage />
          </main>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="drawer-side">
        <label for="sidebar-drawer" class="drawer-overlay"></label>
        <aside class="w-80 min-h-screen bg-base-100">
          <div class="p-4 border-b border-base-300">
            <h1 class="text-xl font-bold">My Reading Notes</h1>
          </div>
          <div class="overflow-y-auto h-[calc(100vh-4rem)]">
            <BookList />
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component imports will be handled by auto-imports
</script>

<style>
body {
  @apply antialiased;
}
</style>
