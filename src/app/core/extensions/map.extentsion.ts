Map.prototype.toSanitizedURLFilters = function toSanitizedURLFilter() {
  let sanitizedFilter = '';
  this.forEach((value: string, key: string) => {
    sanitizedFilter += `&${key}=${value}`;
  });
  return sanitizedFilter.substring(1);
};

Map.prototype.toJson = function toJson() {
  return JSON.stringify(Array.from(this.entries()));
};
