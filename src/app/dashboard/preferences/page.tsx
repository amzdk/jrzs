'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  User,
  Shield,
  Bell,
  Activity,
  Clock,
  HardDrive,
  Zap,
  Server,
  Users,
  Lock,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  AlertTriangle,
  Info,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  Mail,
  MapPin,
  Calendar
} from 'lucide-react';

interface UserAccount {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  createdAt: string;
  lastLogin: string;
}

interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'viewer';
  status: 'active' | 'inactive';
  createdAt: string;
  lastLogin: string;
}

interface LogEntry {
  id: string;
  type: 'info' | 'warning' | 'error';
  message: string;
  timestamp: string;
  user: string;
}

const mockCurrentUser: UserAccount = {
  id: '1',
  name: '张三',
  email: 'zhangsan@example.com',
  role: '管理员',
  createdAt: '2024-01-01',
  lastLogin: '2024-01-22 10:30',
};

const mockUsers: SystemUser[] = [
  {
    id: '1',
    name: '张三',
    email: 'zhangsan@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-01',
    lastLogin: '2024-01-22 10:30',
  },
  {
    id: '2',
    name: '李四',
    email: 'lisi@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2024-01-05',
    lastLogin: '2024-01-22 09:15',
  },
  {
    id: '3',
    name: '王五',
    email: 'wangwu@example.com',
    role: 'viewer',
    status: 'inactive',
    createdAt: '2024-01-10',
    lastLogin: '2024-01-20 15:45',
  },
];

const mockLogs: LogEntry[] = [
  {
    id: '1',
    type: 'info',
    message: '用户登录成功',
    timestamp: '2024-01-22 10:30:15',
    user: '张三',
  },
  {
    id: '2',
    type: 'warning',
    message: 'API调用频率过高',
    timestamp: '2024-01-22 10:25:30',
    user: '系统',
  },
  {
    id: '3',
    type: 'info',
    message: '知识库文档上传成功',
    timestamp: '2024-01-22 10:20:00',
    user: '李四',
  },
];

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      {children}
    </label>
  );
}

export default function PreferencesPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [users, setUsers] = useState<SystemUser[]>(mockUsers);

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* 添加用户 Dialog */}
      <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>添加用户</DialogTitle>
            <DialogDescription>添加新用户到系统</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="userName">用户名</Label>
              <Input id="userName" placeholder="输入用户名" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userEmail">邮箱</Label>
              <Input id="userEmail" type="email" placeholder="输入邮箱地址" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userRole">角色</Label>
              <select id="userRole" className="w-full px-3 py-2 border rounded-md">
                <option value="admin">管理员</option>
                <option value="user">普通用户</option>
                <option value="viewer">只读用户</option>
              </select>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsUserDialogOpen(false)}>
                取消
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                <Plus className="w-4 h-4 mr-2" />
                添加用户
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">设置</h1>
        <p className="text-gray-500 mt-1">
          管理个人账户、系统配置、安全和通知设置
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="profile">个人资料</TabsTrigger>
          <TabsTrigger value="account">账户安全</TabsTrigger>
          <TabsTrigger value="users">用户管理</TabsTrigger>
          <TabsTrigger value="notifications">通知设置</TabsTrigger>
          <TabsTrigger value="logs">操作日志</TabsTrigger>
        </TabsList>

        {/* 个人资料 */}
        <TabsContent value="profile" className="mt-6 space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>个人信息</CardTitle>
              <CardDescription>管理您的个人资料和联系方式</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarFallback className="text-3xl bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
                    {mockCurrentUser.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline">更换头像</Button>
                  <p className="text-xs text-gray-500 mt-2">支持 JPG、PNG 格式，最大 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="displayName">显示名称</Label>
                  <Input id="displayName" defaultValue={mockCurrentUser.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">邮箱地址</Label>
                  <Input id="email" type="email" defaultValue={mockCurrentUser.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">手机号码</Label>
                  <Input id="phone" placeholder="输入手机号码" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">部门</Label>
                  <Input id="department" placeholder="输入部门名称" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">个人简介</Label>
                <textarea
                  id="bio"
                  className="w-full px-3 py-2 border rounded-md min-h-[100px]"
                  placeholder="介绍一下你自己..."
                />
              </div>

              <div className="flex justify-end">
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                  <Save className="w-4 h-4 mr-2" />
                  保存更改
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>账户信息</CardTitle>
              <CardDescription>您的账户基本信息</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <User className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-500">角色</p>
                    <p className="font-medium">{mockCurrentUser.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-500">注册时间</p>
                    <p className="font-medium">{mockCurrentUser.createdAt}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Clock className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-500">最后登录</p>
                    <p className="font-medium">{mockCurrentUser.lastLogin}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 账户安全 */}
        <TabsContent value="account" className="mt-6 space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>修改密码</CardTitle>
              <CardDescription>定期修改密码有助于保护账户安全</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">当前密码</Label>
                <div className="relative">
                  <Input id="currentPassword" type="password" placeholder="输入当前密码" />
                  <Eye className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 cursor-pointer" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">新密码</Label>
                <div className="relative">
                  <Input id="newPassword" type="password" placeholder="输入新密码" />
                  <EyeOff className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 cursor-pointer" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">确认新密码</Label>
                <div className="relative">
                  <Input id="confirmPassword" type="password" placeholder="再次输入新密码" />
                  <EyeOff className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 cursor-pointer" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                  <Save className="w-4 h-4 mr-2" />
                  更新密码
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>双因素认证</CardTitle>
              <CardDescription>启用双因素认证提高账户安全性</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium">短信验证</p>
                    <p className="text-sm text-gray-500">通过手机短信接收验证码</p>
                  </div>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium">邮箱验证</p>
                    <p className="text-sm text-gray-500">通过邮箱接收验证码</p>
                  </div>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium">验证器应用</p>
                    <p className="text-sm text-gray-500">使用验证器应用生成验证码</p>
                  </div>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>活跃会话</CardTitle>
              <CardDescription>管理您所有设备的登录会话</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg bg-green-50">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium">当前设备</p>
                      <p className="text-sm text-gray-500">Chrome • Windows • 北京</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700">当前</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium">MacBook Pro</p>
                      <p className="text-sm text-gray-500">Safari • macOS • 上海</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    撤销
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium">iPhone</p>
                      <p className="text-sm text-gray-500">Safari • iOS • 广州</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    撤销
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 用户管理 */}
        <TabsContent value="users" className="mt-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>用户管理</CardTitle>
                  <CardDescription>管理系统用户和权限</CardDescription>
                </div>
                <Button onClick={() => setIsUserDialogOpen(true)} className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                  <Plus className="w-4 h-4 mr-2" />
                  添加用户
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                        {user.role === 'admin' ? '管理员' : user.role === 'user' ? '用户' : '只读'}
                      </Badge>
                      <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                        {user.status === 'active' ? '活跃' : '未激活'}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-500">
                      <p>最后登录: {user.lastLogin}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 通知设置 */}
        <TabsContent value="notifications" className="mt-6 space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>通知方式</CardTitle>
              <CardDescription>配置接收通知的方式</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium">邮件通知</p>
                    <p className="text-sm text-gray-500">通过邮件接收系统通知</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium">浏览器通知</p>
                    <p className="text-sm text-gray-500">在浏览器中显示通知</p>
                  </div>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium">短信通知</p>
                    <p className="text-sm text-gray-500">通过短信接收紧急通知</p>
                  </div>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>通知类型</CardTitle>
              <CardDescription>选择需要接收的通知类型</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span className="font-medium">系统更新</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span className="font-medium">安全警告</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span className="font-medium">任务完成</span>
                <Switch />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span className="font-medium">错误报告</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span className="font-medium">每周报告</span>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 操作日志 */}
        <TabsContent value="logs" className="mt-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>操作日志</CardTitle>
                  <CardDescription>查看账户操作历史</CardDescription>
                </div>
                <Button variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  刷新
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockLogs.map((log) => (
                  <div
                    key={log.id}
                    className={`flex items-start gap-3 p-3 rounded-lg ${
                      log.type === 'error' ? 'bg-red-50 border border-red-200' :
                      log.type === 'warning' ? 'bg-yellow-50 border border-yellow-200' :
                      'bg-blue-50 border border-blue-200'
                    }`}
                  >
                    {log.type === 'error' ? (
                      <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    ) : log.type === 'warning' ? (
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    ) : (
                      <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-sm">{log.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {log.user} • {log.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
