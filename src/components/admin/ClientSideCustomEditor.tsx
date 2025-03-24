'use client'

import dynamic from 'next/dynamic';

const ClientSideCustomEditor = dynamic( () => import( '@/components/admin/MyCKEditor' ), { ssr: false } );

export default ClientSideCustomEditor;
