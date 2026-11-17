<template>
    <nav class="navbar">
        <div class="navbar__content">

            <!-- Hamburger - Mobile only -->
            <button class="navbar__hamburger" @click="isOpen = true" aria-label="Menu" :aria-expanded="isOpen">
                <Menu :size="24" />
            </button>

            <!-- Logo -->
            <NuxtLink to="/" class="navbar__logo">
                <img src="/images/Logo.png" alt="CampusKart">
            </NuxtLink>

            <!-- Slogan - Desktop -->
            <p class="navbar__slogan">
                BUY & SELL ON CAMPUS
            </p>

            <!-- Actions - Desktop -->
            <div class="navbar__actions">
                <NuxtLink to="/login" class="navbar__link">Sign in</NuxtLink>
                <span class="navbar__divider">|</span>
                <NuxtLink to="/register" class="navbar__link">Registration</NuxtLink>
                <NuxtLink to="/products/create" class="navbar__sell">SELL</NuxtLink>
            </div>

            <!-- SELL - Mobile only -->
            <NuxtLink to="/products/create" class="navbar__sell navbar__sell--mobile">
                SELL
            </NuxtLink>

        </div>

        <!-- Overlay -->
        <Transition name="fade">
            <div v-if="isOpen" class="sidebar__overlay" @click="close" />
        </Transition>

        <!-- Sidebar - Slides from left -->
        <Transition name="slide">
            <aside v-if="isOpen" class="sidebar">
                <div class="sidebar__header">
                    <img src="/images/Logo.png" alt="CampusKart">
                    <button class="sidebar__close" @click="close" aria-label="Close menu">
                        <X :size="22" />
                    </button>
                </div>

                <div class="sidebar__links">
                    <NuxtLink to="/login" class="sidebar__link" @click="close">
                        <User :size="20" /> Sign in
                    </NuxtLink>
                    <NuxtLink to="/register" class="sidebar__link" @click="close">
                        <UserPlus :size="20" /> Registration
                    </NuxtLink>
                    <NuxtLink to="/products/create" class="sidebar__link sidebar__link--green" @click="close">
                        <Plus :size="20" /> Post an Ad
                    </NuxtLink>
                </div>

                <div class="sidebar__divider" />

                <p class="sidebar__label">CATEGORIES</p>
                <div class="sidebar__links">
                    <NuxtLink to="/" class="sidebar__link" @click="close">All Categories</NuxtLink>
                    <NuxtLink to="/" class="sidebar__link" @click="close">Phones & Tablets</NuxtLink>
                    <NuxtLink to="/" class="sidebar__link" @click="close">Laptops</NuxtLink>
                    <NuxtLink to="/" class="sidebar__link" @click="close">Hostel Items</NuxtLink>
                    <NuxtLink to="/" class="sidebar__link" @click="close">Fashion</NuxtLink>
                </div>

                <p class="sidebar__slogan">BUY & SELL ON CAMPUS</p>
            </aside>
        </Transition>
    </nav>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'
import { Menu, X, User, UserPlus, Plus } from 'lucide-vue-next'

const isOpen = ref(false)

const close = () => { isOpen.value = false }

// Handle Escape key to close the sidebar
const onKeydown = (e) => {
  if (e.key === 'Escape') close()
}

// Watch for changes in isOpen to manage body overflow and keydown event listener
watch(isOpen, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
  if (val) {
    window.addEventListener('keydown', onKeydown)
  } else {
    window.removeEventListener('keydown', onKeydown)
  }
})

// Cleanup on component unmount
onUnmounted(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped>
.navbar {
    width: 100%;
    border-bottom: 1px solid var(--color-logo);
    position: sticky;
    top: 0;
    z-index: 50;
}

.navbar__content {
    width: 100%;
    max-width: 1240px;
    margin: 0 auto;
    padding: 0 20px;
    min-height: 72px;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 20px;
    box-sizing: border-box;
}

.navbar__hamburger {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--ck-text);
    padding: 4px;
}

.navbar__logo { justify-self: start; display: flex; align-items: center; }
.navbar__logo img { height: 40px; width: auto; object-fit: contain; display: block; }

.navbar__slogan {
    justify-self: center;
    text-align: center;
    color: var(--ck-text);
    font-weight: 600;
    font-size: 13px;
    letter-spacing: 1.5px;
    line-height: 1.2;
    margin: 0;
    white-space: nowrap;
}

.navbar__actions {
    justify-self: end;
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 13px;
}

.navbar__link { color: var(--ck-text-light); text-decoration: none; white-space: nowrap; }
.navbar__link:hover { color: var(--ck-green); }
.navbar__divider { color: var(--ck-text-light-muted); }

.navbar__sell {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 105px;
    height: 42px;
    padding: 0 20px;
    margin-left: 8px;
    background: var(--ck-green);
    color: var(--ck-text-light);
    border-radius: var(--ck-radius-sm);
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 0.5px;
    text-decoration: none;
}

.navbar__sell--mobile { display: none; }

/* ---------- SIDEBAR ---------- */
.sidebar__overlay {
    position: fixed;
    inset: 0;
    background: var(--ck-overlay);
    z-index: 60;
}

.sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 280px;
    max-width: 85vw;
    background: var(--ck-sidebar-bg);
    z-index: 70;
    display: flex;
    flex-direction: column;
    box-shadow: var(--ck-shadow-hover);
    overflow-y: auto;
}

.sidebar__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border-bottom: 1px solid var(--color-logo);
}

.sidebar__header img {
    height: 32px;
    object-fit: contain;
}

.sidebar__close {
    border: none;
    /* background: var(--ck-primaryp-dark); */
    color: var(--ck-text);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.sidebar__links {
    display: flex;
    flex-direction: column;
    padding: 8px 0;
}

.sidebar__link {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 16px;
    color: var(--ck-text);
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
}

.sidebar__link--green {
    color: var(--ck-green);
    font-weight: 700;
}

.sidebar__divider {
    height: 1px;
    background: var(--color-logo);
    margin: 8px 16px;
}

.sidebar__label {
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 1.5px;
    color: var(--ck-text-muted);
    padding: 12px 16px 4px;
    margin: 0;
}

.sidebar__slogan {
    margin-top: auto;
    text-align: center;
    font-size: 11px;
    letter-spacing: 1.5px;
    font-weight: 600;
    color: var(--ck-text-light-muted);
    padding: 20px;
}

/* ---------- ANIMATIONS ---------- */
.slide-enter-active, .slide-leave-active {
    transition: transform 0.3s ease;
}
.slide-enter-from, .slide-leave-to {
    transform: translateX(-100%);
}
.slide-enter-to, .slide-leave-from {
    transform: translateX(0);
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to { opacity: 0; }
.fade-enter-to, .fade-leave-from { opacity: 1; }

/* ---------- RESPONSIVE ---------- */
@media (max-width: 768px) {
    .navbar__content {
        grid-template-columns: auto 1fr auto;
        min-height: 60px;
        padding: 0 12px;
        gap: 10px;
    }
    .navbar__hamburger { display: flex; justify-self: start; }
    .navbar__slogan { display: none; }
    .navbar__logo { justify-self: center; }
    .navbar__logo img { height: 32px; }
    .navbar__actions { display: none; }
    .navbar__sell--mobile {
        display: flex;
        justify-self: end;
        min-width: 70px;
        height: 36px;
        padding: 0 12px;
        margin-left: 0;
        font-size: 12px;
    }
}

@media (max-width: 420px) {
    .navbar__logo img { height: 28px; }
    .navbar__sell--mobile { min-width: 60px; height: 34px; }
}
</style>