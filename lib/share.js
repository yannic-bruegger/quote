export function shareQuote(collectionId, quote) {
  return navigator.share({
    title: quote.attributes.quoted,
    text: quote.attributes.content,
    url: `/collection/?id=${collectionId}&quoteId=${quote.id}`,
  });
}

export function shareCollection(collection) {
  return navigator.share({
    title: collection.attributes.name,
    url: `/collection/?id=${collection.id}/`,
  });
}