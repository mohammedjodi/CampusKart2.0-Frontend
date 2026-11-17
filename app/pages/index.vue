<template>
    <br>
    <!-- Base Buttons -->
    <BaseButton variant="primary" size="md" @click="postAd" >SELL</BaseButton>
    <BaseButton variant="outline" :loading="true" size="lg">View</BaseButton>
    <BaseButton variant="primary" size="lg" :loading="true" >View</BaseButton>
    <BaseButton variant="danger" size="lg" :loading="false" > 
        <template #icon>
            <Trash class="w-4 h-4 mr-2" />
        </template>
        Delete
    </BaseButton>
    <!-- Base Inputs -->
     <BaseInput v-model="email" label="Email" type="email" placeholder="you@school.edu" :error="emailError" required />

    <BaseInput v-model="search" label="Search" placeholder="Search products..." required>
        <template #leftIcon> <Search/> </template>
    </BaseInput>
        {{ search }}
    
</template>
<script setup>
import { Trash , Search } from 'lucide-vue-next';
import BaseButton from '~/components/common/BaseButton.vue'
import BaseInput from '~/components/common/BaseInput.vue';

const emailError  = ref("Error");

const search= ref("");

console.log(search.value)


function postAd($event){
    console.log($event);
}


</script>