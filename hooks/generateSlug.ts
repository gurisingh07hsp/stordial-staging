export const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim();
  };