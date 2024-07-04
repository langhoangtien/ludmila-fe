import { HOST_API } from 'src/config-global';

export const encodeData = (data) => encodeURIComponent(JSON.stringify(data));
export const convertImagePathToUrl = (filePath, dimension) => {
  if (!filePath) return undefined;
  return `${HOST_API}/files${dimension ? `/${dimension}x${dimension}` : ''}/${filePath}`;
};

export const convertImageUrlToPath = (url = '') => (url ? url.split('/').pop() : undefined);

export function makeProductVariantsFromAttributes(attributes) {
  return attributes.reduce(
    (acc, item) =>
      acc.flatMap((variant) =>
        item.values.map((value) =>
          Array.isArray(variant)
            ? [...variant, { name: item.name, value }]
            : [
                { name: variant.name, value: variant.value },
                { name: item.name, value },
              ]
        )
      ),
    [[]]
  );
}
