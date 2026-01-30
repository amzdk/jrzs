'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Clock,
  Play,
  Pause,
  Trash2,
  Plus,
  Settings,
  Database,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Zap,
  MessageSquare,
  Target,
  Building,
  Calendar
} from 'lucide-react';

interface OfficialAccount {
  id: string;
  name: string;
  accountId: string;
  topics: string[];
  status: 'active' | 'inactive';
  lastRun: string;
  nextRun: string;
  articlesCollected: number;
}

const mockAccounts: OfficialAccount[] = [
  {
    id: '1',
    name: 'AI研究院',
    accountId: 'AI-Research-CN',
    topics: ['人工智能', '金融科技'],
    status: 'active',
    lastRun: '2024-01-15 14:30',
    nextRun: '2024-01-16 14:30',
    articlesCollected: 234,
  },
  {
    id: '2',
    name: '投研观察',
    accountId: 'investment-insight',
    topics: ['医疗健康', '新能源'],
    status: 'active',
    lastRun: '2024-01-15 10:22',
    nextRun: '2024-01-16 10:22',
    articlesCollected: 156,
  },
  {
    id: '3',
    name: '企业动态',
    accountId: 'company-daily',
    topics: ['半导体'],
    status: 'inactive',
    lastRun: '2024-01-14 16:45',
    nextRun: '-',
    articlesCollected: 89,
  },
];

const collectionPeriods = [
  { label: '每小时', value: 'hourly' },
  { label: '每天', value: 'daily' },
  { label: '每周', value: 'weekly' },
];

const availableTopics = [
  '人工智能',
  '金融科技',
  '医疗健康',
  '新能源',
  '半导体',
  '生物医药',
  '新材料',
  '先进制造'
];

export default function WechatCollectionPage() {
  const [accounts, setAccounts] = useState<OfficialAccount[]>(mockAccounts);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [period, setPeriod] = useState('daily');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [newName, setNewName] = useState('');
  const [newAccountId, setNewAccountId] = useState('');

  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev =>
      prev.includes(topic)
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const toggleAccountStatus = (id: string) => {
    setAccounts(accounts.map(account =>
      account.id === id
        ? { ...account, status: account.status === 'active' ? 'inactive' : 'active' }
        : account
    ));
  };

  const deleteAccount = (id: string) => {
    setAccounts(accounts.filter(account => account.id !== id));
  };

  const handleAddAccount = () => {
    if (!newName.trim() || !newAccountId.trim()) return;

    if (accounts.length >= 10) {
      alert('最多只能配置10个公众号');
      return;
    }

    const newAccount: OfficialAccount = {
      id: Date.now().toString(),
      name: newName,
      accountId: newAccountId,
      topics: selectedTopics,
      status: 'active',
      lastRun: '-',
      nextRun: '待执行',
      articlesCollected: 0,
    };

    setAccounts([newAccount, ...accounts]);
    setNewName('');
    setNewAccountId('');
    setSelectedTopics([]);
    setShowAddModal(false);
  };

  const handleManualCollect = (id: string) => {
    alert('开始手动采集...');
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">公众号文章采集智能体</h1>
        <p className="text-gray-500 mt-1">按设定时间自动监测指定公众号，抓取相关文章内容</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">已配置公众号</p>
              <p className="text-3xl font-bold text-gray-900">{accounts.length}/10</p>
              <p className="text-xs text-gray-400">最多10个</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">运行中</p>
              <p className="text-3xl font-bold text-green-600">
                {accounts.filter(a => a.status === 'active').length}
              </p>
              <p className="text-xs text-gray-400">活跃监测任务</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">已采集文章</p>
              <p className="text-3xl font-bold text-blue-600">
                {accounts.reduce((sum, a) => sum + a.articlesCollected, 0)}
              </p>
              <p className="text-xs text-gray-400">累计总数</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">采集周期</p>
              <p className="text-3xl font-bold text-purple-600">每天</p>
              <p className="text-xs text-gray-400">当前设置</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 配置管理 */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">公众号配置管理</CardTitle>
              <CardDescription>管理已配置的公众号和采集规则</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setShowSettingsModal(true)}
              >
                <Settings className="w-4 h-4 mr-2" />
                全局设置
              </Button>
              <Button
                onClick={() => setShowAddModal(true)}
                disabled={accounts.length >= 10}
              >
                <Plus className="w-4 h-4 mr-2" />
                添加公众号
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {accounts.map((account) => (
              <div
                key={account.id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="w-5 h-5 text-green-600" />
                      <h3 className="font-semibold text-gray-900">{account.name}</h3>
                      <Badge variant={account.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                        {account.status === 'active' ? '运行中' : '已停止'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                      <span className="flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        账号ID: {account.accountId}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        已采集 {account.articlesCollected} 篇
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {account.topics.map((topic, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        上次运行: {account.lastRun}
                      </span>
                      <span className="flex items-center gap-1">
                        <Zap className="w-4 h-4" />
                        下次运行: {account.nextRun}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleManualCollect(account.id)}
                      disabled={account.status !== 'active'}
                    >
                      <Play className="w-4 h-4 mr-1" />
                      手动采集
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleAccountStatus(account.id)}
                    >
                      {account.status === 'active' ? (
                        <>
                          <Pause className="w-4 h-4 mr-1" />
                          停止
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-1" />
                          启动
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteAccount(account.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {accounts.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>暂无公众号配置</p>
                <p className="text-sm">点击"添加公众号"按钮开始配置</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 采集规则说明 */}
      <Card className="border-0 shadow-sm bg-gradient-to-r from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            采集规则说明
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">行业相关</p>
                <p className="text-sm text-gray-600 mt-1">
                  自动抓取包含关注行业的文章
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">企业/项目</p>
                <p className="text-sm text-gray-600 mt-1">
                  智能识别企业名称和项目信息
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Database className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">自动入库</p>
                <p className="text-sm text-gray-600 mt-1">
                  采集后自动向量化入知识库
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 添加公众号弹窗 */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>添加公众号</CardTitle>
              <CardDescription>配置新的公众号采集规则</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">公众号名称</label>
                <Input
                  placeholder="例如：AI研究院"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">公众号ID</label>
                <Input
                  placeholder="例如：AI-Research-CN"
                  value={newAccountId}
                  onChange={(e) => setNewAccountId(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">关注主题（可选）</label>
                <div className="flex flex-wrap gap-2">
                  {availableTopics.map((topic) => (
                    <Badge
                      key={topic}
                      variant={selectedTopics.includes(topic) ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => toggleTopic(topic)}
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  选择关注主题，系统将优先采集相关内容
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <AlertCircle className="w-4 h-4" />
                <span>最多只能配置10个公众号</span>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAddModal(false)}>
                  取消
                </Button>
                <Button onClick={handleAddAccount}>
                  <Plus className="w-4 h-4 mr-2" />
                  添加
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 全局设置弹窗 */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>全局采集设置</CardTitle>
              <CardDescription>配置采集周期</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">采集周期</label>
                <select
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  {collectionPeriods.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-500 bg-gray-50 p-3 rounded-md">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <p>
                  系统将自动抓取包含关注行业、项目或企业的文章内容，并向量化入知识库
                </p>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowSettingsModal(false)}>
                  取消
                </Button>
                <Button onClick={() => setShowSettingsModal(false)}>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  保存设置
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
