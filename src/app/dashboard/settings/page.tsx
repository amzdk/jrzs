'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Settings,
  Database,
  Globe,
  Monitor,
  Key,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  Activity,
  Clock,
  HardDrive,
  Zap,
  Server,
  Users,
  Lock,
  Save,
  RefreshCw,
  AlertTriangle,
  Info,
  Cpu,
  TrendingUp,
  BarChart3,
  DollarSign,
  FileText,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Download,
  Sparkles,
  Cpu as CpuIcon
} from 'lucide-react';

// 模型配置接口
interface ModelConfig {
  id: string;
  name: string;
  provider: 'qwen' | 'gemini' | 'openai' | 'custom';
  modelName: string;
  apiKey: string;
  status: 'active' | 'inactive' | 'error';
  maxTokens: number;
  temperature: number;
  createdAt: string;
  lastUsed: string;
}

// Token计费接口
interface TokenUsage {
  id: string;
  userId: string;
  userName: string;
  modelName: string;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  cost: number;
  timestamp: string;
}

// 系统状态接口
interface SystemStatus {
  cpu: number;
  memory: number;
  disk: number;
  uptime: string;
  activeUsers: number;
}

// 日志接口
interface LogEntry {
  id: string;
  type: 'info' | 'warning' | 'error';
  message: string;
  timestamp: string;
  user: string;
}

// 模拟数据
const mockModels: ModelConfig[] = [
  {
    id: '1',
    name: '千问-turbo',
    provider: 'qwen',
    modelName: 'qwen-turbo',
    apiKey: 'sk-xxxxxxxx',
    status: 'active',
    maxTokens: 4000,
    temperature: 0.7,
    createdAt: '2024-01-10',
    lastUsed: '2024-01-22 10:30',
  },
  {
    id: '2',
    name: 'Gemini Pro',
    provider: 'gemini',
    modelName: 'gemini-pro',
    apiKey: 'AIzaSyxxxxxxxx',
    status: 'active',
    maxTokens: 8000,
    temperature: 0.8,
    createdAt: '2024-01-15',
    lastUsed: '2024-01-22 09:15',
  },
  {
    id: '3',
    name: 'GPT-4',
    provider: 'openai',
    modelName: 'gpt-4',
    apiKey: 'sk-xxxxxxxx',
    status: 'inactive',
    maxTokens: 8000,
    temperature: 0.7,
    createdAt: '2024-01-08',
    lastUsed: '2024-01-20 15:45',
  },
];

const mockTokenUsage: TokenUsage[] = [
  {
    id: '1',
    userId: '1',
    userName: '张三',
    modelName: 'qwen-turbo',
    promptTokens: 1500,
    completionTokens: 800,
    totalTokens: 2300,
    cost: 0.023,
    timestamp: '2024-01-22 10:30:00',
  },
  {
    id: '2',
    userId: '2',
    userName: '李四',
    modelName: 'gemini-pro',
    promptTokens: 2000,
    completionTokens: 1200,
    totalTokens: 3200,
    cost: 0.064,
    timestamp: '2024-01-22 09:15:00',
  },
  {
    id: '3',
    userId: '1',
    userName: '张三',
    modelName: 'qwen-turbo',
    promptTokens: 1800,
    completionTokens: 900,
    totalTokens: 2700,
    cost: 0.027,
    timestamp: '2024-01-22 08:00:00',
  },
  {
    id: '4',
    userId: '3',
    userName: '王五',
    modelName: 'gemini-pro',
    promptTokens: 2500,
    completionTokens: 1500,
    totalTokens: 4000,
    cost: 0.080,
    timestamp: '2024-01-22 07:30:00',
  },
  {
    id: '5',
    userId: '2',
    userName: '李四',
    modelName: 'gpt-4',
    promptTokens: 3000,
    completionTokens: 2000,
    totalTokens: 5000,
    cost: 0.300,
    timestamp: '2024-01-22 06:00:00',
  },
  {
    id: '6',
    userId: '1',
    userName: '张三',
    modelName: 'qwen-turbo',
    promptTokens: 1200,
    completionTokens: 600,
    totalTokens: 1800,
    cost: 0.018,
    timestamp: '2024-01-22 05:30:00',
  },
  {
    id: '7',
    userId: '3',
    userName: '王五',
    modelName: 'gemini-pro',
    promptTokens: 2200,
    completionTokens: 1300,
    totalTokens: 3500,
    cost: 0.070,
    timestamp: '2024-01-22 05:00:00',
  },
];

// 按模型统计Token使用情况
const modelTokenStats = {
  'qwen-turbo': {
    name: '千问-turbo',
    provider: 'qwen',
    icon: Sparkles,
    color: 'bg-blue-50 text-blue-600',
    totalTokens: 6800,
    promptTokens: 4500,
    completionTokens: 2300,
    cost: 0.068,
    usageCount: 3,
    activeUsers: 2,
  },
  'gemini-pro': {
    name: 'Gemini Pro',
    provider: 'gemini',
    icon: CpuIcon,
    color: 'bg-purple-50 text-purple-600',
    totalTokens: 10700,
    promptTokens: 6700,
    completionTokens: 4000,
    cost: 0.214,
    usageCount: 3,
    activeUsers: 3,
  },
  'gpt-4': {
    name: 'GPT-4',
    provider: 'openai',
    icon: Zap,
    color: 'bg-green-50 text-green-600',
    totalTokens: 5000,
    promptTokens: 3000,
    completionTokens: 2000,
    cost: 0.300,
    usageCount: 1,
    activeUsers: 1,
  },
};

const mockSystemStatus: SystemStatus = {
  cpu: 45,
  memory: 62,
  disk: 58,
  uptime: '15天 8小时',
  activeUsers: 12,
};

const mockLogs: LogEntry[] = [
  {
    id: '1',
    type: 'info',
    message: '模型服务启动成功',
    timestamp: '2024-01-22 10:00:00',
    user: '系统',
  },
  {
    id: '2',
    type: 'warning',
    message: 'API调用频率超过阈值',
    timestamp: '2024-01-22 09:45:00',
    user: '系统',
  },
  {
    id: '3',
    type: 'info',
    message: '用户登录成功',
    timestamp: '2024-01-22 09:30:00',
    user: '张三',
  },
  {
    id: '4',
    type: 'error',
    message: '模型调用失败: 配额不足',
    timestamp: '2024-01-22 09:15:00',
    user: '系统',
  },
];

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      {children}
    </label>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [isModelDialogOpen, setIsModelDialogOpen] = useState(false);
  const [models, setModels] = useState<ModelConfig[]>(mockModels);

  // 模型提供商映射
  const providerMap = {
    qwen: { label: '千问', icon: Sparkles, color: 'bg-blue-50 text-blue-600' },
    gemini: { label: 'Gemini', icon: CpuIcon, color: 'bg-purple-50 text-purple-600' },
    openai: { label: 'OpenAI', icon: Zap, color: 'bg-green-50 text-green-600' },
    custom: { label: '自定义', icon: Database, color: 'bg-orange-50 text-orange-600' },
  };

  // 计算总Token和成本
  const totalTokens = mockTokenUsage.reduce((sum, item) => sum + item.totalTokens, 0);
  const totalCost = mockTokenUsage.reduce((sum, item) => sum + item.cost, 0);
  const monthlyCost = totalCost * 30; // 假设月度成本

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* 添加模型 Dialog */}
      <Dialog open={isModelDialogOpen} onOpenChange={setIsModelDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>配置模型服务</DialogTitle>
            <DialogDescription>添加新的LLM模型服务</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="modelName">模型名称</Label>
                <Input id="modelName" placeholder="输入模型名称" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="provider">模型提供商</Label>
                <Select>
                  <SelectTrigger id="provider">
                    <SelectValue placeholder="选择提供商" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="qwen">千问</SelectItem>
                    <SelectItem value="gemini">Gemini</SelectItem>
                    <SelectItem value="openai">OpenAI</SelectItem>
                    <SelectItem value="custom">自定义</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="apiKey">API密钥</Label>
              <Input id="apiKey" type="password" placeholder="输入API密钥" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maxTokens">最大Token数</Label>
                <Input id="maxTokens" type="number" defaultValue={4000} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="temperature">温度参数</Label>
                <Input id="temperature" type="number" step="0.1" defaultValue={0.7} />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsModelDialogOpen(false)}>
                取消
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                <Plus className="w-4 h-4 mr-2" />
                添加模型
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">系统配置</h1>
        <p className="text-gray-500 mt-1">
          管理系统配置、模型服务、Token计费和系统监控
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="general">通用设置</TabsTrigger>
          <TabsTrigger value="models">模型服务</TabsTrigger>
          <TabsTrigger value="tokens">Token计费</TabsTrigger>
          <TabsTrigger value="logs">系统日志</TabsTrigger>
          <TabsTrigger value="monitor">系统监控</TabsTrigger>
        </TabsList>

        {/* 通用设置 */}
        <TabsContent value="general" className="mt-6 space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>系统基本信息</CardTitle>
              <CardDescription>配置系统的基本信息</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="systemName">系统名称</Label>
                  <Input id="systemName" defaultValue="AI智能投研平台" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="systemVersion">系统版本</Label>
                  <Input id="systemVersion" defaultValue="v1.0.0" disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminEmail">管理员邮箱</Label>
                  <Input id="adminEmail" type="email" defaultValue="admin@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">时区</Label>
                  <select id="timezone" className="w-full px-3 py-2 border rounded-md">
                    <option value="Asia/Shanghai">Asia/Shanghai (UTC+8)</option>
                    <option value="America/New_York">America/New_York (UTC-5)</option>
                    <option value="Europe/London">Europe/London (UTC+0)</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                  <Save className="w-4 h-4 mr-2" />
                  保存设置
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>系统状态</CardTitle>
              <CardDescription>系统运行状态</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">服务状态</p>
                    <p className="text-xs text-gray-500">正常运行</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                  <Activity className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">CPU使用率</p>
                    <p className="text-xs text-gray-500">{mockSystemStatus.cpu}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                  <HardDrive className="w-6 h-6 text-purple-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">内存使用</p>
                    <p className="text-xs text-gray-500">{mockSystemStatus.memory}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
                  <Server className="w-6 h-6 text-orange-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">在线用户</p>
                    <p className="text-xs text-gray-500">{mockSystemStatus.activeUsers}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 模型服务 */}
        <TabsContent value="models" className="mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">模型配置</h2>
              <p className="text-sm text-gray-500">管理已接入的LLM模型服务</p>
            </div>
            <Button onClick={() => setIsModelDialogOpen(true)} className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
              <Plus className="w-4 h-4 mr-2" />
              添加模型
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {models.map((model) => {
              const providerInfo = providerMap[model.provider];
              return (
                <Card key={model.id} className="border-0 shadow-sm hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className={providerInfo.color}>
                            <providerInfo.icon className="w-3 h-3 mr-1" />
                            {providerInfo.label}
                          </Badge>
                          {model.status === 'active' ? (
                            <Badge className="bg-green-50 text-green-700">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              活跃
                            </Badge>
                          ) : model.status === 'inactive' ? (
                            <Badge variant="secondary">未激活</Badge>
                          ) : (
                            <Badge variant="destructive">
                              <XCircle className="w-3 h-3 mr-1" />
                              错误
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-base">{model.name}</CardTitle>
                        <CardDescription className="mt-1">{model.modelName}</CardDescription>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-gray-500">最大Token</p>
                        <p className="font-medium">{model.maxTokens.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">温度</p>
                        <p className="font-medium">{model.temperature}</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>最后使用: {model.lastUsed}</span>
                      <span>创建于: {model.createdAt}</span>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="w-3 h-3 mr-1" />
                        编辑
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Activity className="w-3 h-3 mr-1" />
                        测试
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>支持的模型提供商</CardTitle>
              <CardDescription>系统支持的LLM模型服务</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg text-center">
                  <Sparkles className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="font-medium">千问</p>
                  <p className="text-xs text-gray-500 mt-1">阿里云通义千问</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <CpuIcon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="font-medium">Gemini</p>
                  <p className="text-xs text-gray-500 mt-1">Google Gemini</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <Zap className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="font-medium">OpenAI</p>
                  <p className="text-xs text-gray-500 mt-1">GPT系列模型</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <Database className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <p className="font-medium">自定义</p>
                  <p className="text-xs text-gray-500 mt-1">接入其他模型</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Token计费 */}
        <TabsContent value="tokens" className="mt-6 space-y-6">
          {/* 总体统计卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-500">今日Token消耗</p>
                    <p className="text-3xl font-bold text-blue-600">{totalTokens.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Key className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-500">今日成本</p>
                    <p className="text-3xl font-bold text-green-600">
                      ¥{totalCost.toFixed(4)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-500">月度预估成本</p>
                    <p className="text-3xl font-bold text-purple-600">
                      ¥{monthlyCost.toFixed(2)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-500">模型数量</p>
                    <p className="text-3xl font-bold text-orange-600">
                      {Object.keys(modelTokenStats).length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                    <Server className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 按模型维度统计 */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>模型Token消耗统计</CardTitle>
                  <CardDescription>按模型维度统计Token消耗和成本</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    导出报表
                  </Button>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    刷新
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(modelTokenStats).map(([modelId, stats]) => (
                  <Card key={modelId} className="border hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 ${stats.color.split(' ')[0]} rounded-xl flex items-center justify-center`}>
                            <stats.icon className={`w-6 h-6 ${stats.color.split(' ')[1]}`} />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{stats.name}</h3>
                            <p className="text-sm text-gray-500">调用次数: {stats.usageCount} 次</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-600">¥{stats.cost.toFixed(4)}</p>
                          <p className="text-sm text-gray-500">{stats.totalTokens.toLocaleString()} tokens</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-500 mb-1">Prompt Tokens</p>
                          <p className="text-lg font-semibold">{stats.promptTokens.toLocaleString()}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-500 mb-1">Completion Tokens</p>
                          <p className="text-lg font-semibold">{stats.completionTokens.toLocaleString()}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-500 mb-1">活跃用户</p>
                          <p className="text-lg font-semibold">{stats.activeUsers}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-500 mb-1">平均Token/次</p>
                          <p className="text-lg font-semibold">
                            {Math.round(stats.totalTokens / stats.usageCount).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Token占比</span>
                          <span className="font-medium">
                            {((stats.totalTokens / totalTokens) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all"
                            style={{ width: `${(stats.totalTokens / totalTokens) * 100}%` }}
                          />
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <p className="text-xs text-gray-500">
                          单位成本: ¥{(stats.cost / stats.totalTokens * 1000).toFixed(6)} / 1K tokens
                        </p>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          查看详情
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Token使用明细 */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Token使用明细</CardTitle>
                  <CardDescription>查看详细的Token消耗记录</CardDescription>
                </div>
                <div className="flex gap-2">
                  <select className="px-3 py-2 border rounded-md text-sm">
                    <option value="all">全部模型</option>
                    <option value="qwen-turbo">千问-turbo</option>
                    <option value="gemini-pro">Gemini Pro</option>
                    <option value="gpt-4">GPT-4</option>
                  </select>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    导出
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockTokenUsage.map((usage) => {
                  const modelStats = modelTokenStats[usage.modelName as keyof typeof modelTokenStats];
                  return (
                    <div key={usage.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 ${modelStats.color.split(' ')[0]} rounded-lg flex items-center justify-center`}>
                          <modelStats.icon className={`w-5 h-5 ${modelStats.color.split(' ')[1]}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{usage.userName}</p>
                            <span className="text-gray-400">•</span>
                            <p className="text-sm text-gray-600">{usage.modelName}</p>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{usage.timestamp}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Prompt</p>
                          <p className="font-medium text-sm">{usage.promptTokens.toLocaleString()}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Completion</p>
                          <p className="font-medium text-sm">{usage.completionTokens.toLocaleString()}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500">总计</p>
                          <p className="font-semibold">{usage.totalTokens.toLocaleString()}</p>
                        </div>
                        <div className="text-right min-w-[80px]">
                          <p className="font-semibold text-green-600">¥{usage.cost.toFixed(4)}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* 月度成本报表 */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>月度成本报表</CardTitle>
              <CardDescription>月度Token消耗和成本统计</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">月度成本趋势图表</p>
                  <p className="text-xs text-gray-400 mt-1">显示近6个月的Token消耗和成本变化</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 系统日志 */}
        <TabsContent value="logs" className="mt-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>系统日志</CardTitle>
                  <CardDescription>查看系统运行日志</CardDescription>
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

        {/* 系统监控 */}
        <TabsContent value="monitor" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>CPU使用率</CardTitle>
                <CardDescription>实时CPU使用情况</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <Activity className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">CPU使用率</p>
                    <p className="text-2xl font-bold text-blue-600">{mockSystemStatus.cpu}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>内存使用率</CardTitle>
                <CardDescription>实时内存使用情况</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <HardDrive className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">内存使用率</p>
                    <p className="text-2xl font-bold text-purple-600">{mockSystemStatus.memory}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>磁盘使用</CardTitle>
                <CardDescription>磁盘空间使用情况</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <Server className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">磁盘使用率</p>
                    <p className="text-2xl font-bold text-orange-600">{mockSystemStatus.disk}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>系统运行时间</CardTitle>
                <CardDescription>系统持续运行时间</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <Clock className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">运行时间</p>
                    <p className="text-2xl font-bold text-green-600">{mockSystemStatus.uptime}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>API调用统计</CardTitle>
              <CardDescription>API接口调用情况</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <Globe className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">API调用趋势</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
