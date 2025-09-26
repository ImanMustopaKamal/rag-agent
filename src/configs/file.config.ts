export const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const ALLOWED_FILE_EXTENSION = ".md";

export const formatFileSize = (bytes: number): string => {
  return `${bytes / (1024 * 1024)}MB`;
};