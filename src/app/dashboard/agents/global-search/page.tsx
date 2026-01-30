'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Sparkles,
  Globe,
  Building2,
  BookOpen,
  Clock,
  TrendingUp,
  ArrowRight,
  ChevronRight,
  Brain,
  FileText
} from 'lucide-react';

interface SearchResult {
  source: string;
  title: string;
  content: string;
  score?: number;
}

interface QueryHistory {
  id: string;
  query: string;
  timestamp: string;
  resultCount: number;
}

const mockHistory: QueryHistory[] = [
  {
    id: '1',
    query: '查找上海 AI 企业',
    timestamp: '2024-01-15 14:30',
    resultCount: 156,
  },
  {
    id: '2',
    query: '北京金融科技公司注册资本排行',
    timestamp: '2024-01-15 10:22',
    resultCount: 89,
  },
  {
    id: '3',
    query: '2023年人工智能相关政策法规',
    timestamp: '2024-01-14 16:45',
    resultCount: 234,
  },
  {
    id: '4',
    query: '深圳独角兽企业名单',
    timestamp: '2024-01-14 09:15',
    resultCount: 45,
  },
  {
    id: '5',
    query: '新能源汽车产业链企业分布',
    timestamp: '2024-01-13 18:30',
    resultCount: 312,
  },
];

export default function GlobalSearchPage() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [history, setHistory] = useState<QueryHistory[]>(mockHistory);
  const [showHistory, setShowHistory] = useState(true);

  const handleSearch = () => {
    if (!query.trim()) return;

    setIsSearching(true);

    // 模拟搜索
    setTimeout(() => {
      const newHistory: QueryHistory = {
        id: Date.now().toString(),
        query,
        timestamp: new Date().toLocaleString('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        }),
        resultCount: Math.floor(Math.random() * 500) + 50,
      };

      setHistory([newHistory, ...history]);
      setIsSearching(false);
      setShowHistory(false);
    }, 2000);
  };

  const handleHistoryClick = (item: QueryHistory) => {
    setQuery(item.query);
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">全域数据智能检索智能体</h1>
        <p className="text-gray-500 mt-1">全域联合检索，支持自然语言提问</p>
      </div>

      {/* 搜索区域 */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              请输入您的查询
            </label>
            <Textarea
              placeholder="例如：查找上海 AI 企业，注册资本在1000万以上，成立时间在2020年之后"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Brain className="w-4 h-4" />
              <span>AI 智能理解您的查询意图</span>
            </div>
            <Button onClick={handleSearch} disabled={isSearching || !query.trim()}>
              {isSearching ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                  检索中...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  开始检索
                </>
              )}
            </Button>
          </div>

          {/* 数据源说明 */}
          <div className="bg-blue-50 rounded-lg p-4 space-y-2">
            <p className="text-sm font-medium text-blue-900">数据源</p>
            <div className="flex flex-wrap gap-3">
              <Badge variant="outline" className="bg-white border-blue-200 text-blue-700">
                <BookOpen className="w-3 h-3 mr-1" />
                企业内部知识库
              </Badge>
              <Badge variant="outline" className="bg-white border-green-200 text-green-700">
                <Building2 className="w-3 h-3 mr-1" />
                工商数据API
              </Badge>
              <Badge variant="outline" className="bg-white border-purple-200 text-purple-700">
                <Globe className="w-3 h-3 mr-1" />
                LLM智能联网检索
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 查询历史 */}
      {showHistory && (
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="w-5 h-5" />
                查询历史
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowHistory(false)}
              >
                收起
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                  onClick={() => handleHistoryClick(item)}
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Search className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 line-clamp-1">
                      {item.query}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.timestamp} · {item.resultCount} 条结果
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 模拟结果展示（仅在搜索后显示） */}
      {!showHistory && query && (
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="w-5 h-5" />
              检索结果
            </CardTitle>
            <CardDescription>
              为"{query}"找到相关结果
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <TrendingUp className="w-4 h-4" />
                <span>已综合分析多个数据源，为您呈现最佳结果</span>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-900 mb-2">AI 智能总结</p>
                    <p className="text-sm text-green-800">
                      根据检索结果，已为您找到相关企业信息。建议您可以进一步查看企业详情、股权结构、知识产权等深度数据。点击下方的"企业 360° 深度画像"可以获取更全面的信息。
                    </p>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full gap-1" asChild>
                <a href="/dashboard/agents/company-profile">
                  查看企业 360° 深度画像
                  <ArrowRight className="w-3 h-3" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
