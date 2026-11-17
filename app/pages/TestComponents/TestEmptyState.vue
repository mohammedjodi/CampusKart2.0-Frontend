<template>
    <br>
    <br>
    <CommonEmptyState
        title="No phones found"
        message="Try clearing your filters or searching for something else."
        action-label="Add Product"
        @action="selectedCategory = 'all'"
    />
</template>