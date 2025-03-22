'use client'

import dynamic from 'next/dynamic';

const ClientSideCustomEditor = dynamic( () => import( '@/components/admin/CustomEditor' ), { ssr: false } );

export default ClientSideCustomEditor;
