<template>

            <CommonBaseBadge variant="new">New</CommonBaseBadge>
            <CommonBaseBadge variant="used">Used</CommonBaseBadge>
            <CommonBaseBadge variant="sold">Sold</CommonBaseBadge>
            <CommonBaseBadge variant="default">Negotiable</CommonBaseBadge>
            <CommonBaseBadge variant="success">Success</CommonBaseBadge>
            <CommonBaseBadge variant="warning">Warning</CommonBaseBadge>
            <CommonBaseBadge variant="danger">Danger</CommonBaseBadge>

</template>
<script setup>

    useHead({
        title: 'Test BaseBadge',
        meta: [
            { name: 'description', content: 'Test BaseBadge component' },
        ],
    });

    
    // import BaseBadge from '~/components/common/BaseBadge.vue';
</script>