import React from 'react';
import SigninPromoRenderer from './SigninPromoRenderer';
import UnauthorizedRenderer from './UnauthorizedRenderer';

import { useUserInfo } from '@/hooks';

export default function AuthWrapper({ children, requiredRole = 'user' }) {
  const { userInfo } = useUserInfo();
  const hasPermission = () => {
    if (!userInfo.accessToken) return false; 

    if (requiredRole === 'admin' && userInfo.role !== 'admin') {
      return false;
    } else if (requiredRole === 'staff' && !['admin', 'staff'].includes(userInfo.role)) {
      return false;
    }

    return true;
  };

  if (!userInfo.accessToken) {
    return <SigninPromoRenderer />;
  } else if (!hasPermission()) {
    return <UnauthorizedRenderer />;
  }

  return <>{children}</>;
}
