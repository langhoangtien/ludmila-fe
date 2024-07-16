import { HOST_API } from 'src/config-global';

export const endpoints = {
  home: {
    selectInfo: `${HOST_API}/home/select-info`,
    root: `${HOST_API}/home`,
    menu: `${HOST_API}/home/menu`,
  },

  file: `${HOST_API}/files`,
  chat: `${HOST_API}/chat`,
  kanban: `${HOST_API}/kanban`,
  calendar: '/calendar',
  auth: {
    me: `${HOST_API}/auth/me`,
    login: `${HOST_API}/auth/email/login`,
    email: `${HOST_API}/auth/email/login`,
    facebook: `${HOST_API}/auth/facebook/login`,
    google: `${HOST_API}/auth/google/login`,
    register: `${HOST_API}/auth/email/register`,
    forgotPassword: `${HOST_API}/auth/forgotpassword`,
  },
  mail: {
    list: `${HOST_API}/mail/list`,
    details: `${HOST_API}/mail/details`,
    labels: `${HOST_API}/mail/labels`,
  },
  post: {
    list: `${HOST_API}/post/list`,
    details: `${HOST_API}/post/details`,
    latest: `${HOST_API}/post/latest`,
    search: `${HOST_API}/post/search`,
  },
  product: {
    list: `${HOST_API}/products`,
    search: `${HOST_API}/products/s`,
    removeMany: `${HOST_API}/products/remove-many`,
  },
  comment: {
    list: `${HOST_API}/comments`,
  },
  category: {
    list: `${HOST_API}/categories`,
    search: `${HOST_API}/categories/s`,
    removeMany: `${HOST_API}/categories/remove-many`,
  },
  country: {
    list: `${HOST_API}/countries`,
    search: `${HOST_API}/countries/s`,
    removeMany: `${HOST_API}/countries/remove-many`,
  },
  brand: {
    list: `${HOST_API}/brands`,
    search: `${HOST_API}/brands/s`,
    removeMany: `${HOST_API}/brands/remove-many`,
  },
  order: {
    list: `${HOST_API}/orders`,
    me: `${HOST_API}/orders/me`,
    removeMany: `${HOST_API}/orders/remove-many`,
  },
  customer: {
    list: `${HOST_API}/customers`,
    search: `${HOST_API}/customers/s`,
    removeMany: `${HOST_API}/customers/remove-many`,
  },
  invoice: {
    list: `${HOST_API}/invoices`,
    search: `${HOST_API}/invoices/s`,
    removeMany: `${HOST_API}/invoices/remove-many`,
  },
};

export async function fetchData(url = '', data, method) {
  if (data) {
    const response = await fetch(url, {
      method: method?.toUpperCase() ?? 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
  const response = await fetch(url);
  return response.json();
}

export async function fetchDataWithToken(url = '', data, method) {
  if (data) {
    try {
      const response = await fetch(url, {
        method: method?.toUpperCase() ?? 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
      });
      return response.json();
    } catch (error) {
      throw new Error(error);
    }
  }
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  });
  return response.json();
}
