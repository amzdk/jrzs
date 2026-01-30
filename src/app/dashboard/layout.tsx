'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Menu,
  Bell,
  LogOut,
  User,
  Settings,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Database,
  Sparkles,
  Globe,
  Cpu,
  Building2,
  Newspaper,
  Clock,
  Search,
  BookOpen
} from 'lucide-react';

const navigation = [
  {
    title: '新对话',
    href: '/dashboard',
    icon: MessageSquare,
  },
  {
    title: '智能体功能',
    icon: Sparkles,
    items: [
      {
        title: '全域数据检索',
        href: '/dashboard/agents/global-search',
        icon: Search,
      },
      {
        title: '企业深度画像',
        href: '/dashboard/agents/company-profile',
        icon: Building2,
      },
      {
        title: '政策法规查询',
        href: '/dashboard/agents/policy-search',
        icon: BookOpen,
      },
      {
        title: '投研信息采集',
        href: '/dashboard/agents/research-collection',
        icon: Newspaper,
      },
      {
        title: '公众号文章采集',
        href: '/dashboard/agents/wechat-collection',
        icon: MessageSquare,
      },
    ],
  },
];

// 对话历史数据
const conversationHistory = [
  { id: 1, title: '查询上海AI企业', time: '10分钟前', icon: Search },
  { id: 2, title: '企业深度画像分析', time: '1小时前', icon: Building2 },
  { id: 3, title: '政策法规查询', time: '2小时前', icon: BookOpen },
  { id: 4, title: '投研信息采集', time: '3小时前', icon: Newspaper },
];


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [username, setUsername] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string>('系统管理');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      router.push('/login');
    } else {
      const storedUsername = localStorage.getItem('username');
      setUsername(storedUsername || '用户');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    router.push('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 桌面端侧边栏 */}
      <aside className={`hidden lg:flex flex-col border-r bg-white transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <Database className="w-6 h-6 text-white" />
          </div>
          {!isCollapsed && (
            <div className="ml-3">
              <h1 className="text-lg font-bold text-gray-900">AI 智能投研</h1>
              <p className="text-xs text-gray-500">金融科技平台</p>
            </div>
          )}
        </div>

        {/* 导航菜单 */}
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const hasSubmenu = 'items' in item;
              const isExpanded = expandedMenu === item.title;

              if (hasSubmenu) {
                // 有子菜单的项
                const isAnySubItemActive = item.items?.some(subItem => pathname === subItem.href);

                return (
                  <div key={item.title}>
                    <button
                      onClick={() => setExpandedMenu(isExpanded ? '' : item.title)}
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                        isAnySubItemActive || isExpanded
                          ? 'bg-blue-50 text-blue-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      title={isCollapsed ? item.title : ''}
                    >
                      <item.icon className={`w-5 h-5 flex-shrink-0 ${isAnySubItemActive || isExpanded ? 'text-blue-600' : 'text-gray-500'}`} />
                      {!isCollapsed && (
                        <>
                          <span className="truncate">{item.title}</span>
                          <ChevronDown
                            className={`w-4 h-4 ml-auto text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                          />
                        </>
                      )}
                    </button>

                    {/* 子菜单 */}
                    {(!isCollapsed || isExpanded) && item.items && (
                      <div className={`ml-4 mt-1 space-y-1 overflow-hidden transition-all ${isExpanded ? 'max-h-96' : 'max-h-0'}`}>
                        {item.items.map((subItem) => {
                          const isSubActive = pathname === subItem.href;
                          return (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                                isSubActive
                                  ? 'bg-blue-100 text-blue-700 font-medium'
                                  : 'text-gray-600 hover:bg-gray-100'
                              }`}
                              title={isCollapsed ? subItem.title : ''}
                            >
                              <subItem.icon className={`w-4 h-4 flex-shrink-0 ${isSubActive ? 'text-blue-600' : 'text-gray-400'}`} />
                              {!isCollapsed && <span className="truncate">{subItem.title}</span>}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              // 普通项
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  title={isCollapsed ? item.title : ''}
                >
                  <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                  {!isCollapsed && (
                    <>
                      <span className="truncate">{item.title}</span>
                    </>
                  )}
                </Link>
              );
            })}

            {/* 横向隔离线 */}
            <Separator className="my-4" />

            {/* 对话历史 */}
            <div>
              <h3 className="px-3 py-2 text-sm font-medium text-gray-500">对话历史</h3>
              <div className="space-y-1">
                {conversationHistory.map((conversation) => (
                  <Link
                    key={conversation.id}
                    href="/dashboard/qa"
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all hover:bg-gray-100 text-gray-700`}
                  >
                    <conversation.icon className="w-4 h-4 flex-shrink-0 text-gray-400" />
                    <div className="flex-1 min-w-0">
                      <span className="block truncate">{conversation.title}</span>
                      <span className="text-xs text-gray-400">{conversation.time}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </ScrollArea>

        {/* 底部用户信息 */}
        <div className="border-t p-3 space-y-2">
          <Link
            href="/dashboard/knowledge"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all"
          >
            <Database className="w-5 h-5 text-gray-500" />
            {!isCollapsed && <span className="truncate">知识库管理</span>}
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all"
          >
            <Cpu className="w-5 h-5 text-gray-500" />
            {!isCollapsed && <span className="truncate">系统配置</span>}
          </Link>
          <Button
            variant="ghost"
            className={`w-full justify-start px-3 py-2 text-gray-700 hover:bg-gray-100 ${isCollapsed ? 'px-3' : ''}`}
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 text-gray-500" />
            {!isCollapsed && <span className="truncate">退出登录</span>}
          </Button>
        </div>

        {/* 折叠按钮 */}
        <div className="border-t p-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>
        </div>
      </aside>

      {/* 移动端侧边栏 */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <div className="h-16 flex items-center px-4 border-b">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Database className="w-6 h-6 text-white" />
            </div>
            <div className="ml-3">
              <h1 className="text-lg font-bold text-gray-900">AI 智能投研</h1>
              <p className="text-xs text-gray-500">金融科技平台</p>
            </div>
          </div>

          <ScrollArea className="flex-1 px-3 py-4">
            <nav className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                const hasSubmenu = 'items' in item;
                const isExpanded = expandedMenu === `mobile-${item.title}`;

                if (hasSubmenu) {
                  // 有子菜单的项
                  const isAnySubItemActive = item.items?.some(subItem => pathname === subItem.href);

                  return (
                    <div key={item.title}>
                      <button
                        onClick={() => setExpandedMenu(isExpanded ? '' : `mobile-${item.title}`)}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                          isAnySubItemActive || isExpanded
                            ? 'bg-blue-50 text-blue-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <item.icon className={`w-5 h-5 flex-shrink-0 ${isAnySubItemActive || isExpanded ? 'text-blue-600' : 'text-gray-500'}`} />
                        <span className="truncate">{item.title}</span>
                        <ChevronDown
                          className={`w-4 h-4 ml-auto text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        />
                      </button>

                      {/* 子菜单 */}
                      {item.items && (
                        <div className={`ml-4 mt-1 space-y-1 overflow-hidden transition-all ${isExpanded ? 'max-h-96' : 'max-h-0'}`}>
                          {item.items.map((subItem) => {
                            const isSubActive = pathname === subItem.href;
                            return (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                                  isSubActive
                                    ? 'bg-blue-100 text-blue-700 font-medium'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                              >
                                <subItem.icon className={`w-4 h-4 flex-shrink-0 ${isSubActive ? 'text-blue-600' : 'text-gray-400'}`} />
                                <span className="truncate">{subItem.title}</span>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                // 普通项
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                    <span className="truncate">{item.title}</span>
                  </Link>
                );
              })}

              {/* 横向隔离线 */}
              <Separator className="my-4" />

              {/* 对话历史 */}
                <div>
                  <h3 className="px-3 py-2 text-sm font-medium text-gray-500">对话历史</h3>
                  <div className="space-y-1">
                    {conversationHistory.map((conversation) => (
                      <Link
                        key={conversation.id}
                        href="/dashboard/qa"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all hover:bg-gray-100 text-gray-700`}
                      >
                        <conversation.icon className="w-4 h-4 flex-shrink-0 text-gray-400" />
                        <div className="flex-1 min-w-0">
                          <span className="block truncate">{conversation.title}</span>
                          <span className="text-xs text-gray-400">{conversation.time}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* 底部功能 */}
                <div className="mt-6 space-y-2">
                  <Link
                    href="/dashboard/knowledge"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all"
                  >
                    <Database className="w-5 h-5 text-gray-500" />
                    <span className="truncate">知识库管理</span>
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all"
                  >
                    <Cpu className="w-5 h-5 text-gray-500" />
                    <span className="truncate">系统配置</span>
                  </Link>
                </div>
            </nav>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 顶部导航栏 */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            {/* 移动端菜单按钮 */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            
            {/* 面包屑导航 */}
            <div className="flex items-center text-sm text-gray-600">
              <span>首页</span>
              {pathname !== '/dashboard' && (
                <>
                  <ChevronRight className="w-4 h-4 mx-2" />
                  <span className="text-gray-900 font-medium">
                    {(() => {
                      // 先尝试在一级菜单中找到
                      const topLevelItem = navigation.find(item => item.href === pathname);
                      if (topLevelItem) return topLevelItem.title;

                      // 再在子菜单中查找
                      for (const item of navigation) {
                        if ('items' in item && item.items) {
                          const subItem = item.items.find(sub => sub.href === pathname);
                          if (subItem) return `${item.title} / ${subItem.title}`;
                        }
                      }

                      return '页面';
                    })()}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* 通知按钮 */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Button>

            <Separator orientation="vertical" className="h-6" />

            {/* 用户信息 - 点击跳转到账户设置 */}
            <Link href="/dashboard/preferences" className="flex items-center gap-3 hover:bg-gray-100 rounded-lg px-2 py-1 transition-all">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden sm:block text-sm">
                <p className="font-medium text-gray-900">{username}</p>
                <p className="text-xs text-gray-500">账户设置</p>
              </div>
            </Link>
          </div>
        </header>

        {/* 内容区域 */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
