<script lang="ts" setup>
const appConfig = useAppConfig()

const indexName = appConfig.ecommerce.indexName

const sortingOptions = [
  { value: `${indexName}`, label: 'Featured' },
  { value: `${indexName}:integer_custom_field:asc`, label: 'Integer custom field: Low to High' },
  { value: `${indexName}:integer_custom_field:desc`, label: 'Integer custom field: High to Low' },
  // { value: `${indexName}:rating:desc`, label: 'Rating: High to Low' }
]
</script>

<template>
  <MeiliSearchProvider :index-name="indexName">
    <TheNavbar class="mb-5 shadow-l">
      <template #search>
        <MeiliSearchBar />
      </template>
    </TheNavbar>
    <div class="container mb-5">
      <div class="filters">
        <MeiliSearchFacetFilter attribute="selection_multi_custom_field" initial-sort-by="name" class="mb-5" />
        <!-- <MeiliSearchFacetFilter attribute="brand" initial-sort-by="count" class="mb-5" /> -->
        <MeiliSearchRangeFilter attribute="integer_custom_field" class="mb-5" />
        <!-- <MeiliSearchRatingFilter attribute="rating_rounded" label="Rating" /> -->
      </div>
      <div class="results">
        <div class="mb-5 results-meta">
          <MeiliSearchStats />
          <MeiliSearchSorting :options="sortingOptions" />
        </div>
        <MeiliSearchLoadingProvider v-slot="{ isSearchStalled }" class="mb-5">
          <div v-show="isSearchStalled" style="height: 80vh; display: flex; flex-direction: column;">
            <LoadingIndicator class="m-auto" />
          </div>
          <MeiliSearchResults v-show="!isSearchStalled" />
        </MeiliSearchLoadingProvider>
      </div>
    </div>
  </MeiliSearchProvider>
</template>

<style src="~/assets/css/components/home.css" scoped />
