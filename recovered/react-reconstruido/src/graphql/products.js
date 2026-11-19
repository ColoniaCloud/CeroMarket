import { gql } from "@apollo/client";

// Las 4 queries de este archivo se recuperaron tal cual del bundle de
// producción (index-eb42d4ee.js). Repiten el mismo bloque de imagen por
// cada tipo de producto (Simple/Variable/External/Group) porque así estaban
// escritas originalmente — WPGraphQL no resuelve `image` sobre la interfaz
// `Product`, hay que pedirlo dentro de cada `... on <Tipo>`.

export const GET_PRODUCTS_FOR_CAROUSEL = gql`
  query GetProductsForCarousel {
    products(first: 12) {
      nodes {
        id
        slug
        name
        ... on SimpleProduct {
          image {
            sourceUrl
            altText
          }
        }
        ... on VariableProduct {
          image {
            sourceUrl
            altText
          }
        }
        ... on ExternalProduct {
          image {
            sourceUrl
            altText
          }
        }
        ... on GroupProduct {
          image {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_CATEGORIES = gql`
  query GetProductCategories {
    productCategories(first: 100) {
      nodes {
        id
        slug
        name
      }
    }
  }
`;

export const GET_ALL_PRODUCTS_FOR_GRID = gql`
  query GetAllProductsForGrid($first: Int!) {
    products(first: $first) {
      nodes {
        id
        slug
        name
        ... on SimpleProduct {
          productCategories {
            nodes {
              id
              slug
              name
            }
          }
          image {
            sourceUrl
            altText
          }
        }
        ... on VariableProduct {
          productCategories {
            nodes {
              id
              slug
              name
            }
          }
          image {
            sourceUrl
            altText
          }
        }
        ... on ExternalProduct {
          productCategories {
            nodes {
              id
              slug
              name
            }
          }
          image {
            sourceUrl
            altText
          }
        }
        ... on GroupProduct {
          productCategories {
            nodes {
              id
              slug
              name
            }
          }
          image {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_SLUG = gql`
  query GetProductBySlug($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      id
      name
      description
      ... on SimpleProduct {
        image {
          sourceUrl
          altText
        }
        galleryImages {
          nodes {
            sourceUrl
            altText
          }
        }
      }
      ... on VariableProduct {
        image {
          sourceUrl
          altText
        }
        galleryImages {
          nodes {
            sourceUrl
            altText
          }
        }
      }
      ... on ExternalProduct {
        image {
          sourceUrl
          altText
        }
        galleryImages {
          nodes {
            sourceUrl
            altText
          }
        }
      }
      ... on GroupProduct {
        image {
          sourceUrl
          altText
        }
        galleryImages {
          nodes {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;
