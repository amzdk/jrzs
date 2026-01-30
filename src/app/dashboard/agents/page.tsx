'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Search,
  Sparkles,
  ArrowRight,
  Filter,
  Clock,
  TrendingUp,
  Play,
  Pause,
  Zap,
  Globe,
  Building2,
  FileText,
  MessageSquare,
  BookOpen
} from 'lucide-react';

interface Agent {
  id: string;
  title: string;
  description: string;
  shortDesc: string;
  icon: any;
  color: string;
  href: string;
  status: 'active' | 'stopped';
  usage: '高' | '中' | '低';
  lastRun: string;
}

const agents: Agent[] = [
  {
    id: '1',
    title: '全域数据智能检索智能体',
    shortDesc: '全域联合检索',
    description: '支持自然语言提问（如"查找上海 AI 企业"），同时检索企业内部知识库、工商数据API以及LLM智能联网检索，汇总给出综合结果。展示查询历史。',
    icon: Search,
    color: 'from-blue-500 to-cyan-500',
    href: '/dashboard/agents/global-search',
    status: 'active',
    usage: '高',
    lastRun: '10分钟前',
  },
  {
    id: '2',
    title: '企业 360° 深度画像智能体',
    shortDesc: '企业深度尽调',
    description: '支持在筛选结果基础上，进一步查看企业的注册资本、股东结构、知识产权数量等详情，调取工商数据API基于LLM模型总结结果。展示查询历史。',
    icon: Building2,
    color: 'from-indigo-500 to-purple-500',
    href: '/dashboard/agents/company-profile',
    status: 'active',
    usage: '高',
    lastRun: '30分钟前',
  },
  {
    id: '3',
    title: '投研信息采集智能体',
    shortDesc: '投研信息采集',
    description: '按设定时间自动采集相关网站（不超过10个），搜索下载多类型的相关内容，筛选包含相关行业、企业的报告，自动下载并向量化入知识库。行业相关数据进入行业知识库、企业相关数据进入企业知识库。',
    icon: FileText,
    color: 'from-green-500 to-emerald-500',
    href: '/dashboard/agents/research-collection',
    status: 'active',
    usage: '中',
    lastRun: '2小时前',
  },
  {
    id: '4',
    title: '公众号文章采集智能体',
    shortDesc: '公众号文章采集',
    description: '按设定时间自动监测指定公众号（不超过10个），抓取包含关注行业、项目或企业的文章内容，并向量化入知识库。支持对已经配置的进行管理。',
    icon: MessageSquare,
    color: 'from-pink-500 to-rose-500',
    href: '/dashboard/agents/wechat-collection',
    status: 'active',
    usage: '中',
    lastRun: '1小时前',
  },
  {
    id: '5',
    title: '政策法规查询智能体',
    shortDesc: '政策法规监测',
    description: '根据设定时间采集相关网址，以及调用LLM智能联网检索国内特定领域的国家及地方政策法规信息，并向量化入知识库。支持对已经配置的进行管理。',
    icon: BookOpen,
    color: 'from-orange-500 to-amber-500',
    href: '/dashboard/agents/policy-search',
    status: 'active',
    usage: '中',
    lastRun: '3小时前',
  },
];

const usageColors = {
  '高': 'bg-red-100 text-red-700 border-red-200',
  '中': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  '低': 'bg-green-100 text-green-700 border-green-200',
};

export default function AgentsDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [agentsList, setAgentsList] = useState<Agent[]>(agents);

  const filteredAgents = agentsList.filter(agent => {
    const matchesSearch = agent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const toggleAgentStatus = (agentId: string) => {
    setAgentsList(agents.map(agent =>
      agent.id === agentId
        ? { ...agent, status: agent.status === 'active' ? 'stopped' : 'active' }
        : agent
    ));
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">AI 智能体目录</h1>
        <p className="text-gray-500 mt-1">查看或管理各种智能体，支持用户查看和管理智能体</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">智能体总数</p>
                <p className="text-3xl font-bold text-gray-900">{agents.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">运行中</p>
                <p className="text-3xl font-bold text-green-600">
                  {agents.filter(a => a.status === 'active').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <Play className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">高使用率</p>
                <p className="text-3xl font-bold text-orange-600">
                  {agents.filter(a => a.usage === '高').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 搜索和筛选 */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="搜索智能体..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <Button
                variant={searchQuery === '' ? 'default' : 'outline'}
                size="sm"
              >
                全部
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 智能体列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAgents.length === 0 ? (
          <Card className="col-span-full border-0 shadow-sm">
            <CardContent className="py-16">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">未找到匹配的智能体</h3>
                  <p className="text-gray-500 text-sm">请尝试其他搜索关键词</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredAgents.map((agent) => (
            <Card key={agent.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${agent.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <agent.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{agent.title}</CardTitle>
                      <CardDescription className="mt-1">{agent.shortDesc}</CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleAgentStatus(agent.id)}
                  >
                    {agent.status === 'active' ? (
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
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 line-clamp-2">
                  {agent.description}
                </p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-gray-500">
                      <Clock className="w-3 h-3" />
                      {agent.lastRun}
                    </span>
                    <Badge variant="outline" className={usageColors[agent.usage]}>
                      使用率: {agent.usage}
                    </Badge>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-1"
                  asChild
                >
                  <a href={agent.href}>
                    进入智能体
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
