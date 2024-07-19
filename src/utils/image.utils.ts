/**
 * Makes a Blob-like object that can be used to upload as a file.
 * @param imageUri The URI of the image to fetch.
 * @returns Blob-like object
 */

export const makeImage = (imageUri: string): { uri: string; name: string; type: string } => {
  const uriParts = imageUri.split('.');
  const fileType = uriParts[uriParts.length - 1];

  // Check if fileType is valid (optional)
  if (!fileType || !['jpg', 'jpeg', 'png', 'gif'].includes(fileType.toLowerCase())) {
    throw `Unsupported file type:, ${fileType}`;
  }

  return {
    uri: imageUri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  };
};
