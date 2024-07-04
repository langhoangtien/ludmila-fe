export function middleware(request) {
  const currentUser = request.cookies.get('currentUser');

  if (!currentUser && request.nextUrl.pathname.startsWith('/e-commerce/account')) {
    return Response.redirect(new URL('/login', request.url));
  }
}
