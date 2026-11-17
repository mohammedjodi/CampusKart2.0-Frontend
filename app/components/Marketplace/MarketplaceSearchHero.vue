<template>
    <section class="search-hero">
        <div class="search-hero__content">

            <h1 class="search-hero__title">
                What are you looking for?
            </h1>

            <form class="search-hero__form" @submit.prevent="onSearch">
                <!-- Location Selector -->
                <button type="button" class="search-hero__location" aria-label="Select location">
                    All Nigeria
                    <ChevronDown :size="16" />
                </button>

                <!-- Search Input -->
                <div class="search-hero__input-wrapper">
                    <input
                        v-model="query"
                        type="search"
                        placeholder="I am looking for..."
                        aria-label="Search products"
                        class="search-hero__input"
                    />
                    <button type="submit" class="search-hero__button" aria-label="Search">
                        <Search :size="20" />
                    </button>
                </div>
            </form>

        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import { Search, ChevronDown } from 'lucide-vue-next'

const query = ref('')

const onSearch = () => {
  if (!query.value.trim()) return
  // TODO: navigate to /search?q=...
  // Example: navigateTo({ path: '/search', query: { q: query.value.trim() } })
  console.log('Search:', query.value.trim())
}
</script>

<style scoped>
.search-hero {
    width: 100%;
    padding: 32px 0 88px;
}

.search-hero__content {
    width: 100%;
    max-width: 1240px;
    height: 100%;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    box-sizing: border-box;
}

.search-hero__title {
    font-size: 20px;
    font-weight: 700;
    color: var(--ck-text-light);
    margin: 0;
    text-align: center;
}

.search-hero__form {
    display: flex;
    align-items: stretch; 
    gap: 10px;
    width: 100%;
    max-width: 820px; 
    margin: 0 auto;
    box-sizing: border-box;
}

.search-hero__location {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    height: 50px; 
    padding: 0 16px;
    background: var(--ck-card);
    color: var(--ck-text-muted);
    border: none;
    border-radius: var(--ck-radius-sm);
    white-space: nowrap;
    flex-shrink: 0;
    cursor: pointer;
    box-sizing: border-box;
}

.search-hero__input-wrapper {
    display: flex;
    align-items: stretch;
    flex: 1;
    min-width: 0;
    height: 50px;
    background: var(--ck-card);
    border-radius: var(--ck-radius-sm);
    overflow: hidden;
}

.search-hero__input {
    flex: 1;
    min-width: 0;
    height: 100%;
    padding: 0 16px;
    border: none;
    outline: none;
    color: var(--ck-text);
    background: transparent;
    font-size: 15px;
    box-sizing: border-box;
}

.search-hero__input::placeholder {
    color: var(--ck-text-muted);
}

.search-hero__button {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
    width: 56px;
    height: 100%;
    background: var(--ck-green);
    border: none;
    color: var(--ck-text-light);
    cursor: pointer;
}

/* Mobile - like Jiji: stack location on top */
@media (max-width: 768px) {
    .search-hero {
        padding: 24px 0 32px;
    }

    .search-hero__content {
        padding: 0 12px;
        gap: 14px;
    }

    .search-hero__title {
        font-size: 17px;
    }

    .search-hero__form {
        flex-direction: row;
        gap: 6px;
        max-width: 100%;
    }

    .search-hero__location {
        height: 46px;
        padding: 0 10px;
        font-size: 12px;
        gap: 4px;
        flex-shrink: 0;
        max-width: 110px;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .search-hero__input-wrapper {
        height: 46px;
        flex: 1;
        min-width: 0;
    }

    .search-hero__input {
        font-size: 14px;
        padding: 0 10px;
    }

    .search-hero__button {
        width: 46px;
        flex-shrink: 0;
    }
}

@media (max-width: 420px) {
    .search-hero__location {
        max-width: 92px;
        font-size: 11px;
        padding: 0 8px;
    }

    .search-hero__input::placeholder {
        font-size: 13px;
    }

    .search-hero__button {
        width: 42px;
    }
}
</style>