export function getPostPath(slug) {
  return `/posts/${encodeURIComponent(slug.normalize("NFC"))}`;
}

export function getCategoryPath(slug) {
  return `/categories/${encodeURIComponent(slug.normalize("NFC"))}`;
}

export function getTagPath(slug) {
  return `/tags/${encodeURIComponent(slug.normalize("NFC"))}`;
}
