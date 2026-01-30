'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Search,
  MessageSquare,
  Sparkles,
  Upload,
  Plus,
  ChevronDown,
  Building2,
  BookOpen,
  Newspaper,
  Globe,
  Paperclip,
  Cpu,
  Send,
  FileText,
  AlertTriangle,
  BarChart3,
  TrendingUp,
  ScrollText
} from 'lucide-react';
import Link from 'next/link';

const quickActions = [
  {
    id: 1,
    title: '全域数据检索',
    description: '自然语言提问，多源数据联合检索',
    icon: Search,
    href: '/dashboard/agents/global-search',
  },
  {
    id: 2,
    title: '企业深度画像',
    description: '企业深度尽调，全面了解企业信息',
    icon: Building2,
    href: '/dashboard/agents/company-profile',
  },
  {
    id: 3,
    title: '政策法规查询',
    description: '智能检索国家及地方政策法规',
    icon: BookOpen,
    href: '/dashboard/agents/policy-search',
  },
  {
    id: 4,
    title: '投研信息采集',
    description: '自动采集投研网站报告并入库',
    icon: Newspaper,
    href: '/dashboard/agents/research-collection',
  },
];

const models = [
  { value: 'qianwen', label: '千问-turbo' },
  { value: 'gemini', label: 'Gemini Pro' },
  { value: 'gpt4', label: 'GPT-4' },
];

const skills = [
  { id: 'industry-brief', name: '行业视角简报', icon: FileText },
  { id: 'business-negative', name: '工商负面跟踪', icon: AlertTriangle },
  { id: 'internet-sentiment', name: '互联网舆情跟踪', icon: BarChart3 },
  { id: 'industry-intelligence', name: '行业情报聚合', icon: TrendingUp },
  { id: 'policy-risk', name: '政策风险跟踪', icon: ScrollText },
];

export default function DashboardPage() {
  const [inputValue, setInputValue] = useState('');
  const [selectedModel, setSelectedModel] = useState('qianwen');
  const [selectedKnowledge, setSelectedKnowledge] = useState('all');
  const [enableWebSearch, setEnableWebSearch] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    // 处理提交逻辑
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      {/* 页面标题 */}
      <div className="py-6 px-4 lg:px-6">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">AI 智能投研平台</h1>
          </div>
          <p className="text-gray-500 max-w-2xl">
            基于人工智能的智能投研平台，提供企业深度画像、全域数据检索、投研信息采集等一站式解决方案
          </p>
        </div>
      </div>

      {/* 主要内容区 */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 lg:px-6">
        <div className="w-full max-w-3xl">
          {/* AI对话框 */}
          <Card className="border border-gray-200 rounded-2xl shadow-sm">
            <CardContent className="p-4">
              {/* 融合式输入框 */}
              <form onSubmit={handleSubmit}>
                {/* 技能栏 */}
                <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-2">
                  {skills.map((skill) => {
                    const SkillIcon = skill.icon;
                    return (
                      <button
                        key={skill.id}
                        type="button"
                        onClick={() => setInputValue((prev) => prev + `@${skill.name} `)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors whitespace-nowrap"
                      >
                        <SkillIcon className="w-4 h-4" />
                        <span>{skill.name}</span>
                      </button>
                    );
                  })}
                </div>
                
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="和我聊聊天吧"
                  className="w-full min-h-[80px] max-h-[200px] border-0 resize-none focus-visible:ring-0 text-base text-gray-900 placeholder:text-gray-400 bg-transparent outline-none"
                />

                {/* 底部功能栏 */}
                <div className="flex items-center justify-between mt-2">
                  {/* 左侧功能按钮 */}
                  <div className="flex items-center gap-2">
                    {/* 上传文件 */}
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <Paperclip className="w-4 h-4" />
                    </button>

                    {/* 模型选择 */}
                    <Select value={selectedModel} onValueChange={setSelectedModel}>
                      <SelectTrigger className="h-8 border-0 bg-transparent hover:bg-gray-100 px-2 text-sm text-gray-600 focus:ring-0">
                        <Cpu className="w-4 h-4 mr-1.5" />
                        <SelectValue placeholder="模型" />
                      </SelectTrigger>
                      <SelectContent>
                        {models.map((model) => (
                          <SelectItem key={model.value} value={model.value}>
                            {model.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* 知识库选择 */}
                    <Select value={selectedKnowledge} onValueChange={setSelectedKnowledge}>
                      <SelectTrigger className="h-8 border-0 bg-transparent hover:bg-gray-100 px-2 text-sm text-gray-600 focus:ring-0">
                        <Sparkles className="w-4 h-4 mr-1.5" />
                        <SelectValue placeholder="知识库" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全部知识库</SelectItem>
                        <SelectItem value="industry">行业报告</SelectItem>
                        <SelectItem value="company">企业数据</SelectItem>
                        <SelectItem value="policy">政策法规</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* 联网开关 */}
                    <button
                      type="button"
                      onClick={() => setEnableWebSearch(!enableWebSearch)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg transition-colors ${
                        enableWebSearch
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Globe className="w-4 h-4" />
                      <span>联网</span>
                    </button>
                  </div>

                  {/* 右侧发送按钮 */}
                  <Button
                    type="submit"
                    disabled={!inputValue.trim()}
                    size="icon"
                    className="h-10 w-10 rounded-full bg-gray-400 hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4 text-white" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* 快速操作 */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">快速操作</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action) => (
                <Link key={action.id} href={action.href}>
                  <Card className="border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                          <action.icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{action.title}</h3>
                          <p className="text-sm text-gray-500 mt-1">{action.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* 提示信息 */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>提示：您可以直接在对话框中输入问题，或选择快速操作进入相应功能</p>
          </div>
        </div>
      </div>
    </div>
  );
}
