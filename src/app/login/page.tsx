'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lock, User, ArrowRight, Shield, TrendingUp, Database, Smartphone, MessageSquare, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  
  // 账号密码登录状态
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAccountLoading, setIsAccountLoading] = useState(false);
  
  // 手机验证码登录状态
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [isPhoneLoading, setIsPhoneLoading] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // 账号密码登录
  const handleAccountLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAccountLoading(true);
    
    // 模拟登录过程
    setTimeout(() => {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
      router.push('/dashboard');
    }, 1000);
  };

  // 手机验证码登录
  const handlePhoneLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPhoneLoading(true);
    
    // 模拟登录过程
    setTimeout(() => {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', phone);
      router.push('/dashboard');
    }, 1000);
  };

  // 发送验证码
  const handleSendCode = () => {
    if (!phone || !/^1[3-9]\d{9}$/.test(phone)) {
      alert('请输入正确的手机号码');
      return;
    }
    
    setIsSendingCode(true);
    
    // 模拟发送验证码
    setTimeout(() => {
      setIsSendingCode(false);
      setCountdown(60);
      
      // 倒计时
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 relative z-10">
        {/* 左侧：品牌展示 */}
        <div className="hidden lg:flex flex-col justify-center space-y-8 text-white">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">AI 智能投研平台</h1>
                <p className="text-blue-200 text-sm">金融科技 · 智能决策</p>
              </div>
            </div>
            <p className="text-lg text-blue-100 leading-relaxed">
              基于人工智能的智能投研平台，提供企业深度画像、全域数据检索、投研信息采集等一站式解决方案
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
              <div className="w-10 h-10 bg-blue-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">企业深度画像</h3>
                <p className="text-sm text-blue-200">360°企业尽调，全面掌握企业信息</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
              <div className="w-10 h-10 bg-cyan-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">智能检索</h3>
                <p className="text-sm text-blue-200">全域数据联合检索，精准匹配需求</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
              <div className="w-10 h-10 bg-indigo-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">信息采集</h3>
                <p className="text-sm text-blue-200">自动化采集多源数据，智能入库</p>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧：登录表单 */}
        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
            <CardHeader className="space-y-2 pb-6">
              <CardTitle className="text-2xl font-bold text-center">登录系统</CardTitle>
              <CardDescription className="text-center text-base">
                选择登录方式以访问平台
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="account" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="account" className="gap-2">
                    <User className="w-4 h-4" />
                    账号登录
                  </TabsTrigger>
                  <TabsTrigger value="phone" className="gap-2">
                    <Smartphone className="w-4 h-4" />
                    手机登录
                  </TabsTrigger>
                </TabsList>

                {/* 账号密码登录 */}
                <TabsContent value="account">
                  <form onSubmit={handleAccountLogin} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-sm font-medium">
                        用户名
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="username"
                          type="text"
                          placeholder="请输入用户名"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="pl-10 h-11"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-medium">
                        密码
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="请输入密码"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 h-11"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                        <span className="text-muted-foreground">记住我</span>
                      </label>
                      <a href="#" className="text-blue-600 hover:underline">
                        忘记密码？
                      </a>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-11 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium"
                      disabled={isAccountLoading}
                    >
                      {isAccountLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          登录中...
                        </>
                      ) : (
                        <>
                          登录系统
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>

                {/* 手机验证码登录 */}
                <TabsContent value="phone">
                  <form onSubmit={handlePhoneLogin} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium">
                        手机号码
                      </Label>
                      <div className="relative">
                        <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="请输入手机号码"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="pl-10 h-11"
                          maxLength={11}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="code" className="text-sm font-medium">
                        验证码
                      </Label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="code"
                            type="text"
                            placeholder="请输入验证码"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="pl-10 h-11"
                            maxLength={6}
                            required
                          />
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleSendCode}
                          disabled={isSendingCode || countdown > 0}
                          className="px-4 h-11 whitespace-nowrap"
                        >
                          {isSendingCode ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : countdown > 0 ? (
                            `${countdown}秒后重发`
                          ) : (
                            '获取验证码'
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center text-sm">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                        <span className="text-muted-foreground">我已阅读并同意</span>
                      </label>
                      <a href="#" className="text-blue-600 hover:underline ml-1">
                        用户协议
                      </a>
                      <span className="text-muted-foreground">和</span>
                      <a href="#" className="text-blue-600 hover:underline ml-1">
                        隐私政策
                      </a>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-11 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium"
                      disabled={isPhoneLoading}
                    >
                      {isPhoneLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          登录中...
                        </>
                      ) : (
                        <>
                          登录系统
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-center text-sm text-muted-foreground">
                  演示账号：admin / 123456 或 手机号：13800138000 / 验证码：123456
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
