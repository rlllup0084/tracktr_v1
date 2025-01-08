import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const targetApiUrl = req.nextUrl.searchParams.get('target');
  const targetToken = req.nextUrl.searchParams.get('token');
  const authType = req.nextUrl.searchParams.get('authType') || 'basic';
  const targetPath = req.nextUrl.pathname.split('/api/proxy/')[1];

  if (!targetApiUrl) {
    return new NextResponse('Missing target parameter', { status: 400 });
  }

  try {
    const url = new URL(targetPath, targetApiUrl);
    
    req.nextUrl.searchParams.forEach((value, key) => {
      if (!['target', 'token', 'authType'].includes(key)) {
        url.searchParams.set(key, value);
      }
    });

    const response = NextResponse.rewrite(url);

    response.headers.set('Accept', 'application/json');

    if (targetToken) {
      switch (authType.toLowerCase()) {
        case 'basic':
          response.headers.set('Authorization', `Basic ${targetToken}`);
          break;
        case 'bearer':
          response.headers.set('Authorization', `Bearer ${targetToken}`);
          break;
        case 'apikey':
          response.headers.set('X-API-Key', targetToken);
          break;
      }
    }

    return response;
  } catch (error) {
    console.log(error);
    return new NextResponse('Invalid target URL', { status: 400 });
  }
}

export const config = {
  matcher: ['/api/proxy/:path*'],
};