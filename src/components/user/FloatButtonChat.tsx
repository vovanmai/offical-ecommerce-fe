'use client';
import { USER_PRIMARY_COLOR } from "@/constants/common"

import Image from 'next/image';
import {Dropdown } from 'antd';
import Link from 'next/link'

import React from 'react';
import type { MenuProps } from 'antd';

import type { CSSProperties } from 'react';

const items: MenuProps['items'] = [
  {
    key: 'messenger',
    label: (
      <Link 
        href="https://m.me/htx.lamsfarm" 
        target="_blank" 
        rel="noopener noreferrer"
        style={{
            display: 'flex',
            fontWeight: 'bold',
            alignItems: 'center',
            gap: 8,
        }}
        >
        <Image
          src="/messenger.webp"
          alt="Hỗ trợ qua Messenger"
          height={32}
          width={32}
        />
        Messenger
      </Link>
    ),
  },
  {
    key: 'zalo',
    label: (
      <Link 
        href="https://zalo.me/0866363652" 
        target="_blank" 
        rel="noopener noreferrer"
        style={{
            display: 'flex',
            fontWeight: 'bold',
            alignItems: 'center',
            gap: 8,
        }}
        >
        <Image
        src="/zalo.webp"
        alt="Hỗ trợ qua Zalo"
        height={32}
        width={32}
      />
      Chat Zalo
      </Link>
    ),
  },
];

export default function FloatButtonChat() {

  return (
    <Dropdown menu={{ items }} placement="topRight" arrow>
        <div
            className="float-button-chat"
            style={{
            position: "fixed",
            bottom: 60,
            right: 40,
            backgroundColor: USER_PRIMARY_COLOR,
            color: "#fff",
            height: 64,
            width: 64,
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            cursor: "pointer",
            zIndex: 1000,
            }}
        >
            <Image
                src="/chat.webp"
                alt="Liên hệ Hợp tác xã Lam'sFarm"
                height={32}
                width={32}
            />
        </div>
    </Dropdown>
  );
}
