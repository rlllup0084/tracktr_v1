import { NextRequest } from 'next/server';
// middleware.ts
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // 1. Extract the target API URL and path from the request
  const targetApiUrl = req.nextUrl.searchParams.get('target');
  const targetToken = req.nextUrl.searchParams.get('token');
  const targetPath = req.nextUrl.pathname.split('/api/proxy/')[1];

  if (!targetApiUrl) {
    return new NextResponse('Missing target parameter', { status: 400 });
  }

  // 2. Construct the URL for the target API
  const url = new URL(targetPath, targetApiUrl);

  // 3. Rewrite the request to the target API
  const response = NextResponse.rewrite(url);

  // how to pass this Authorization: 'Basic ' + btoa(`${username}:${password}`),
  // 4. (Optional) Add headers to the request
  // response.headers.set('Authorization', 'Bearer ' + process

console.log("targetToken", targetToken);
  // (Optional) Modify headers, etc. if needed
  response.headers.set('Accept', 'application/json');
  response.headers.set('Authorization', `basic ${targetToken}`);

  // console log resopnse
  console.log('Response', response);

  return response;
}

export const config = {
  matcher: ['/api/proxy/:path*'],
};
