'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Globe,
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
  Calendar,
  FolderOpen,
  FileText,
  Building2
} from 'lucide-react';

interface CollectionConfig {
  id: string;
  url: string;
  name: string;
  type: '行业' | '企业';
  rpaModel: string;
  period: string;
  status: 'active' | 'inactive';
  lastRun: string;
  nextRun: string;
  articlesCollected: number;
}

const mockConfigs: CollectionConfig[] = [
  {
    id: '1',
    url: 'https://www.example-research.com',
    name: '某行业研究院官网',
    type: '行业',
    rpaModel: '通用网页爬取RPA',
    period: 'daily',
    status: 'active',
    lastRun: '2024-01-15 14:30',
    nextRun: '2024-01-16 14:30',
    articlesCollected: 156,
  },
  {
    id: '2',
    url: 'https://www.report-example.com',
    name: '某投研资讯平台',
    type: '行业',
    rpaModel: 'PDF文档提取RPA',
    period: 'daily',
    status: 'active',
    lastRun: '2024-01-15 10:22',
    nextRun: '2024-01-16 10:22',
    articlesCollected: 89,
  },
  {
    id: '3',
    url: 'https://www.company-research.com',
    name: '某企业研究数据库',
    type: '企业',
    rpaModel: '企业数据采集RPA',
    period: 'weekly',
    status: 'inactive',
    lastRun: '2024-01-14 16:45',
    nextRun: '-',
    articlesCollected: 234,
  },
];

const rpaModels = [
  { id: '1', name: '通用网页爬取RPA', description: '适用于普通网页内容采集' },
  { id: '2', name: 'PDF文档提取RPA', description: '适用于PDF报告文档内容提取' },
  { id: '3', name: '企业数据采集RPA', description: '适用于企业信息数据库采集' },
  { id: '4', name: '新闻资讯爬取RPA', description: '适用于新闻资讯类网站采集' },
];

const collectionPeriods = [
  { label: '每小时', value: 'hourly' },
  { label: '每天', value: 'daily' },
  { label: '每周', value: 'weekly' },
  { label: '每月', value: 'monthly' },
];

export default function ResearchCollectionPage() {
  const [configs, setConfigs] = useState<CollectionConfig[]>(mockConfigs);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [period, setPeriod] = useState('daily');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newName, setNewName] = useState('');
  const [newRpaModel, setNewRpaModel] = useState('1');
  const [newPeriod, setNewPeriod] = useState('daily');

  const topics = ['人工智能', '金融科技', '医疗健康', '新能源', '半导体'];

  const toggleConfigStatus = (id: string) => {
    setConfigs(configs.map(config =>
      config.id === id
        ? { ...config, status: config.status === 'active' ? 'inactive' : 'active' }
        : config
    ));
  };

  const deleteConfig = (id: string) => {
    setConfigs(configs.filter(config => config.id !== id));
  };

  const handleAddConfig = () => {
    if (!newUrl.trim() || !newName.trim()) return;

    if (configs.length >= 10) {
      alert('最多只能配置10个网站');
      return;
    }

    const newConfig: CollectionConfig = {
      id: Date.now().toString(),
      url: newUrl,
      name: newName,
      type: '行业',
      rpaModel: rpaModels.find(m => m.id === newRpaModel)?.name || '',
      period: newPeriod,
      status: 'active',
      lastRun: '-',
      nextRun: '待执行',
      articlesCollected: 0,
    };

    setConfigs([newConfig, ...configs]);
    setNewUrl('');
    setNewName('');
    setNewRpaModel('1');
    setNewPeriod('daily');
    setShowAddModal(false);
  };

  const handleManualCollect = (id: string) => {
    // 模拟手动采集
    alert('开始手动采集...');
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">投研信息采集智能体</h1>
        <p className="text-gray-500 mt-1">按设定时间自动采集相关网站，搜索下载多类型的相关内容</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">已配置网站</p>
              <p className="text-3xl font-bold text-gray-900">{configs.length}/10</p>
              <p className="text-xs text-gray-400">最多10个</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">运行中</p>
              <p className="text-3xl font-bold text-green-600">
                {configs.filter(c => c.status === 'active').length}
              </p>
              <p className="text-xs text-gray-400">活跃采集任务</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">已采集文档</p>
              <p className="text-3xl font-bold text-blue-600">
                {configs.reduce((sum, c) => sum + c.articlesCollected, 0)}
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
              <CardTitle className="text-lg">采集配置管理</CardTitle>
              <CardDescription>管理已配置的网站和采集规则</CardDescription>
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
                disabled={configs.length >= 10}
              >
                <Plus className="w-4 h-4 mr-2" />
                添加网站
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {configs.map((config) => (
              <div
                key={config.id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {config.type}
                      </Badge>
                      <h3 className="font-semibold text-gray-900">{config.name}</h3>
                      <Badge variant={config.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                        {config.status === 'active' ? '运行中' : '已停止'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                      <span className="flex items-center gap-1">
                        <Globe className="w-4 h-4" />
                        {config.url}
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        已采集 {config.articlesCollected} 篇
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mb-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Zap className="w-4 h-4" />
                        RPA: {config.rpaModel}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        周期: {collectionPeriods.find(p => p.value === config.period)?.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        上次运行: {config.lastRun}
                      </span>
                      <span className="flex items-center gap-1">
                        <Zap className="w-4 h-4" />
                        下次运行: {config.nextRun}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleManualCollect(config.id)}
                      disabled={config.status !== 'active'}
                    >
                      <Play className="w-4 h-4 mr-1" />
                      手动采集
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleConfigStatus(config.id)}
                    >
                      {config.status === 'active' ? (
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
                      onClick={() => deleteConfig(config.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {configs.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <FolderOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>暂无采集配置</p>
                <p className="text-sm">点击"添加网站"按钮开始配置</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 数据去向说明 */}
      <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-cyan-50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Database className="w-5 h-5" />
            数据去向
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">行业相关数据</p>
                <p className="text-sm text-gray-600 mt-1">
                  向量化后进入行业知识库，可用于行业分析、投研简报生成
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building2 className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">企业相关数据</p>
                <p className="text-sm text-gray-600 mt-1">
                  向量化后进入企业知识库，可用于企业尽调、舆情分析
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 添加网站弹窗 */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>添加采集网站</CardTitle>
              <CardDescription>配置新的网站采集规则</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">网站名称</label>
                <Input
                  placeholder="例如：某行业研究院官网"
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
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">RPA模型</label>
                <select
                  value={newRpaModel}
                  onChange={(e) => setNewRpaModel(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  {rpaModels.map((model) => (
                    <option key={model.id} value={model.id}>
                      {model.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {rpaModels.find(m => m.id === newRpaModel)?.description}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">采集周期</label>
                <select
                  value={newPeriod}
                  onChange={(e) => setNewPeriod(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  {collectionPeriods.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <AlertCircle className="w-4 h-4" />
                <span>最多只能配置10个网站</span>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAddModal(false)}>
                  取消
                </Button>
                <Button onClick={handleAddConfig}>
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
              <CardDescription>配置采集周期和主题</CardDescription>
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
                <label className="text-sm font-medium text-gray-700 mb-2 block">采集主题</label>
                <div className="flex flex-wrap gap-2">
                  {topics.map((topic) => (
                    <Badge
                      key={topic}
                      variant={selectedTopic === topic ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => setSelectedTopic(selectedTopic === topic ? '' : topic)}
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  选择关注主题，系统将优先采集相关内容
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
