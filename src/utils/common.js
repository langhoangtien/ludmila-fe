import { HOST_API } from 'src/config-global';

export const encodeData = (data) => encodeURIComponent(JSON.stringify(data));
export const convertImagePathToUrl = (filePath, dimension, errorImage = true) => {
  if (!filePath && errorImage) return '/assets/icons/ic_img-error.svg';
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
export const stringifyArray = (arrs) =>
  arrs
    .map((obj) => JSON.stringify(obj))
    .sort()
    .join();

export function fDateTime(date) {
  const formatter = new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    weekday: 'long',
  });

  return formatter.format(date);
}

function timeAgo(date) {
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  // Thay đổi đơn vị thời gian
  const oneMinute = 60 * 1000; // 1 phút
  const oneHour = 60 * oneMinute; // 1 giờ
  const oneDay = 24 * oneHour; // 1 ngày
  const oneMonth = 30 * oneDay; // Giả định 1 tháng = 30 ngày
  const oneYear = 365 * oneDay; // Giả định 1 năm = 365 ngày

  if (diff < oneMinute) {
    const seconds = Math.floor(diff / 1000);
    if (seconds <= 0) return 'Vừa xong';
    return seconds === 1 ? '1 giây trước' : `${seconds} giây trước`;
  }
  if (diff < oneHour) {
    const minutes = Math.floor(diff / oneMinute);
    return minutes === 1 ? '1 phút trước' : `${minutes} phút trước`;
  }
  if (diff < oneDay) {
    const hours = Math.floor(diff / oneHour);
    return hours === 1 ? '1 giờ trước' : `${hours} giờ trước`;
  }
  if (diff < oneMonth) {
    const days = Math.floor(diff / oneDay);
    return days === 1 ? '1 ngày trước' : `${days} ngày trước`;
  }
  if (diff < oneYear) {
    const months = Math.floor(diff / oneMonth);
    return months === 1 ? '1 tháng trước' : `${months} tháng trước`;
  }
  const years = Math.floor(diff / oneYear);
  return years === 1 ? '1 năm trước' : `${years} năm trước`;
}

export const timeFormat = (d) => {
  const date = new Date(d);
  const raw = fDateTime(date);
  const time = timeAgo(date);
  return { raw, time };
};

export const mappedProduct = (product) => {
  const varitants = product.variants.map((variant) => {
    const image = convertImagePathToUrl(variant.image, 250, false);
    return {
      ...variant,
      image,
    };
  });
  return {
    ...product,
    image: convertImagePathToUrl(product.image, 250),
    variants: varitants,
  };
};
