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
  Globe,
  BookOpen,
  Target,
  Building,
  Calendar
} from 'lucide-react';

interface PolicySource {
  id: string;
  name: string;
  url: string;
  type: '官网' | '数据库';
  status: 'active' | 'inactive';
  lastRun: string;
  nextRun: string;
  documentsCollected: number;
}

const mockSources: PolicySource[] = [
  {
    id: '1',
    name: '中国政府法制信息网',
    url: 'https://www.gov.cn/zhengce',
    type: '官网',
    status: 'active',
    lastRun: '2024-01-15 14:30',
    nextRun: '2024-01-16 14:30',
    documentsCollected: 89,
  },
  {
    id: '2',
    name: '国务院政策文件库',
    url: 'https://www.gov.cn/zhengce/zcwjk',
    type: '官网',
    status: 'active',
    lastRun: '2024-01-15 10:22',
    nextRun: '2024-01-16 10:22',
    documentsCollected: 156,
  },
  {
    id: '3',
    name: '北大法宝数据库',
    url: 'https://www.pkulaw.com',
    type: '数据库',
    status: 'inactive',
    lastRun: '2024-01-14 16:45',
    nextRun: '-',
    documentsCollected: 234,
  },
];

const collectionPeriods = [
  { label: '每小时', value: 'hourly' },
  { label: '每天', value: 'daily' },
  { label: '每周', value: 'weekly' },
  { label: '每月', value: 'monthly' },
];

const domains = [
  '人工智能',
  '金融科技',
  '医疗健康',
  '新能源',
  '半导体',
  '生物医药',
  '新材料',
  '先进制造',
  '大数据',
  '云计算'
];

export default function PolicySearchPage() {
  const [sources, setSources] = useState<PolicySource[]>(mockSources);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [period, setPeriod] = useState('daily');
  const [selectedDomains, setSelectedDomains] = useState<string[]>(['人工智能', '金融科技']);
  const [newName, setNewName] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const toggleDomain = (domain: string) => {
    setSelectedDomains(prev =>
      prev.includes(domain)
        ? prev.filter(d => d !== domain)
        : [...prev, domain]
    );
  };

  const toggleSourceStatus = (id: string) => {
    setSources(sources.map(source =>
      source.id === id
        ? { ...source, status: source.status === 'active' ? 'inactive' : 'active' }
        : source
    ));
  };

  const deleteSource = (id: string) => {
    setSources(sources.filter(source => source.id !== id));
  };

  const handleAddSource = () => {
    if (!newName.trim() || !newUrl.trim()) return;

    if (sources.length >= 10) {
      alert('最多只能配置10个网址');
      return;
    }

    const newSource: PolicySource = {
      id: Date.now().toString(),
      name: newName,
      url: newUrl,
      type: '官网',
      status: 'active',
      lastRun: '-',
      nextRun: '待执行',
      documentsCollected: 0,
    };

    setSources([newSource, ...sources]);
    setNewName('');
    setNewUrl('');
    setShowAddModal(false);
  };

  const handleManualCollect = (id: string) => {
    alert('开始手动采集...');
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">政策法规查询智能体</h1>
        <p className="text-gray-500 mt-1">采集相关网址，调用LLM智能联网检索政策法规信息</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">已配置来源</p>
              <p className="text-3xl font-bold text-gray-900">{sources.length}/10</p>
              <p className="text-xs text-gray-400">最多10个</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">运行中</p>
              <p className="text-3xl font-bold text-green-600">
                {sources.filter(s => s.status === 'active').length}
              </p>
              <p className="text-xs text-gray-400">活跃监测任务</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">已采集文档</p>
              <p className="text-3xl font-bold text-blue-600">
                {sources.reduce((sum, s) => sum + s.documentsCollected, 0)}
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
              <CardTitle className="text-lg">来源配置管理</CardTitle>
              <CardDescription>管理已配置的政策法规采集来源</CardDescription>
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
                disabled={sources.length >= 10}
              >
                <Plus className="w-4 h-4 mr-2" />
                添加来源
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sources.map((source) => (
              <div
                key={source.id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="w-5 h-5 text-orange-600" />
                      <h3 className="font-semibold text-gray-900">{source.name}</h3>
                      <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-300 text-xs">
                        {source.type}
                      </Badge>
                      <Badge variant={source.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                        {source.status === 'active' ? '运行中' : '已停止'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                      <span className="flex items-center gap-1">
                        <Globe className="w-4 h-4" />
                        {source.url}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        已采集 {source.documentsCollected} 篇
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        上次运行: {source.lastRun}
                      </span>
                      <span className="flex items-center gap-1">
                        <Zap className="w-4 h-4" />
                        下次运行: {source.nextRun}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleManualCollect(source.id)}
                      disabled={source.status !== 'active'}
                    >
                      <Play className="w-4 h-4 mr-1" />
                      手动采集
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleSourceStatus(source.id)}
                    >
                      {source.status === 'active' ? (
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
                      onClick={() => deleteSource(source.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {sources.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>暂无来源配置</p>
                <p className="text-sm">点击"添加来源"按钮开始配置</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 采集规则说明 */}
      <Card className="border-0 shadow-sm bg-gradient-to-r from-orange-50 to-amber-50">
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
                <Globe className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">官方渠道</p>
                <p className="text-sm text-gray-600 mt-1">
                  采集国家及地方政府官网政策文件
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Target className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">LLM智能检索</p>
                <p className="text-sm text-gray-600 mt-1">
                  调用大模型智能联网检索特定领域政策
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

      {/* 添加来源弹窗 */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>添加采集来源</CardTitle>
              <CardDescription>配置新的政策法规采集来源</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">来源名称</label>
                <Input
                  placeholder="例如：中国政府法制信息网"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">网站URL</label>
                <Input
                  placeholder="https://example.com"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <AlertCircle className="w-4 h-4" />
                <span>最多只能配置10个网址</span>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAddModal(false)}>
                  取消
                </Button>
                <Button onClick={handleAddSource}>
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
          <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>全局采集设置</CardTitle>
              <CardDescription>配置采集周期和领域范围</CardDescription>
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
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">关注领域（多选）</label>
                <div className="flex flex-wrap gap-2">
                  {domains.map((domain) => (
                    <Badge
                      key={domain}
                      variant={selectedDomains.includes(domain) ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => toggleDomain(domain)}
                    >
                      {domain}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  选择关注领域，系统将优先采集相关领域的政策法规
                </p>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-500 bg-gray-50 p-3 rounded-md">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <p>
                  系统将根据设定时间采集相关网址，并调用LLM智能联网检索国内特定领域的国家及地方政策法规信息
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
