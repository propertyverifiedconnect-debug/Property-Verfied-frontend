"use client";

import useRedirectByRole from '@/hooks/useRedirectByRole';
import MiddlewareLoader from '@/components/shared/middleware-loader';
import AdminDashboard from '@/components/layout/admin-menu';
import Nav from '@/components/layout/nav';



function Page() {
  const loading = useRedirectByRole();

   if (loading) {
    return <MiddlewareLoader/>; // or a spinner
  }
  return (
    <>
    <Nav/>
    <div className='h-screen w-full py-15 bg-[#CDE4F9]  flex-col'>
          <AdminDashboard/>

    </div>
    </>
  )
}

export default Page