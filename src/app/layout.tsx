import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'AI 智能投研平台',
    template: '%s | AI 智能投研平台',
  },
  description:
    '基于人工智能的智能投研平台，提供企业深度画像、全域数据检索、投研信息采集等一站式解决方案',
  keywords: [
    'AI 智能投研平台',
    '人工智能',
    '投研分析',
    '企业画像',
    '数据检索',
    '投研信息采集',
    '智能分析',
    '投资决策',
  ],
  authors: [{ name: 'AI 智能投研平台团队' }],
  openGraph: {
    title: 'AI 智能投研平台',
    description:
      '基于人工智能的智能投研平台，提供企业深度画像、全域数据检索、投研信息采集等一站式解决方案',
    url: 'http://localhost:3000',
    siteName: 'AI 智能投研平台',
    locale: 'zh_CN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <html lang="en">
      <body className={`antialiased`}>
        {isDev && <Inspector />}
        {children}
      </body>
    </html>
  );
}
