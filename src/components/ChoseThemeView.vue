<script setup lang="ts">
import "@/assets/scripts/color-modes.js";
import ThemeIcons from "./icons/ThemeIcons.vue";
</script>

<template>
  <ThemeIcons />
  <div class="dropdown position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle">
    <button
      class="btn btn-bd-primary py-2 dropdown-toggle d-flex align-items-center"
      id="bd-theme"
      type="button"
      aria-expanded="false"
      data-bs-toggle="dropdown"
      aria-label="Toggle theme (auto)"
    >
      <svg class="bi my-1 theme-icon-active" aria-hidden="true">
        <use href="#circle-half"></use>
      </svg>
      <span class="visually-hidden" id="bd-theme-text">Toggle theme</span>
    </button>
    <ul class="dropdown-menu dropdown-menu-end shadow" aria-labelledby="bd-theme-text">
      <li>
        <button
          type="button"
          class="dropdown-item d-flex align-items-center"
          data-bs-theme-value="light"
          aria-pressed="false"
        >
          <svg class="bi me-2 opacity-50" aria-hidden="true">
            <use href="#sun-fill"></use>
          </svg>
          Light
          <svg class="bi ms-auto d-none" aria-hidden="true">
            <use href="#check2"></use>
          </svg>
        </button>
      </li>
      <li>
        <button
          type="button"
          class="dropdown-item d-flex align-items-center"
          data-bs-theme-value="dark"
          aria-pressed="false"
        >
          <svg class="bi me-2 opacity-50" aria-hidden="true">
            <use href="#moon-stars-fill"></use>
          </svg>
          Dark
          <svg class="bi ms-auto d-none" aria-hidden="true">
            <use href="#check2"></use>
          </svg>
        </button>
      </li>
      <li>
        <button
          type="button"
          class="dropdown-item d-flex align-items-center active"
          data-bs-theme-value="auto"
          aria-pressed="true"
        >
          <svg class="bi me-2 opacity-50" aria-hidden="true">
            <use href="#circle-half"></use>
          </svg>
          Auto
          <svg class="bi ms-auto d-none" aria-hidden="true">
            <use href="#check2"></use>
          </svg>
        </button>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
@import "bootstrap";

.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}
@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
.b-example-divider {
  width: 100%;
  height: 3rem;
  background-color: #0000001a;
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow:
    inset 0 0.5em 1.5em #0000001a,
    inset 0 0.125em 0.5em #00000026;
}
.b-example-vr {
  flex-shrink: 0;
  width: 1.5rem;
  height: 100vh;
}
.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}
.nav-scroller {
  position: relative;
  z-index: 2;
  height: 2.75rem;
  overflow-y: hidden;
}
.nav-scroller .nav {
  display: flex;
  flex-wrap: nowrap;
  padding-bottom: 1rem;
  margin-top: -1px;
  overflow-x: auto;
  text-align: center;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}
.btn-bd-primary {
  --bd-violet-bg: #712cf9;
  --bd-violet-rgb: 112.520718, 44.062154, 249.437846;
  --bs-btn-font-weight: 600;
  --bs-btn-color: var(--bs-white);
  --bs-btn-bg: var(--bd-violet-bg);
  --bs-btn-border-color: var(--bd-violet-bg);
  --bs-btn-hover-color: var(--bs-white);
  --bs-btn-hover-bg: #6528e0;
  --bs-btn-hover-border-color: #6528e0;
  --bs-btn-focus-shadow-rgb: var(--bd-violet-rgb);
  --bs-btn-active-color: var(--bs-btn-hover-color);
  --bs-btn-active-bg: #5a23c8;
  --bs-btn-active-border-color: #5a23c8;
}
.bd-mode-toggle {
  z-index: 1500;
}
.bd-mode-toggle .bi {
  width: 1em;
  height: 1em;
}
.bd-mode-toggle .dropdown-menu .active .bi {
  display: block !important;
}
</style>
