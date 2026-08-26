'use client';

export const getToken = async()=> {
     const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/get-token/`,
        {
            method: "GET",
            credentials: "include",
        }
        );
        const dat = await res.json();
        return dat.token
}