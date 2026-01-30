'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Building2,
  Users,
  TrendingUp,
  Clock,
  ChevronRight,
  Brain,
  Target,
  Award,
  Briefcase,
  Globe,
  CheckCircle2,
  MapPin,
  Calendar
} from 'lucide-react';

interface CompanyProfile {
  name: string;
  registrationCapital: string;
  establishedDate: string;
  location: string;
  industry: string;
  legalRepresentative: string;
  shareholders: Array<{
    name: string;
    ratio: string;
  }>;
  patents: number;
  trademarks: number;
  certifications: string[];
  risks: Array<{
    level: 'high' | 'medium' | 'low';
    description: string;
  }>;
  summary: string;
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
    query: '上海智谱华章科技有限公司',
    timestamp: '2024-01-15 14:30',
    resultCount: 1,
  },
  {
    id: '2',
    query: '北京字节跳动科技有限公司',
    timestamp: '2024-01-15 10:22',
    resultCount: 1,
  },
  {
    id: '3',
    query: '深圳腾讯科技有限公司',
    timestamp: '2024-01-14 16:45',
    resultCount: 1,
  },
  {
    id: '4',
    query: '浙江阿里巴巴集团',
    timestamp: '2024-01-14 09:15',
    resultCount: 1,
  },
];

const mockProfile: CompanyProfile = {
  name: '上海智谱华章科技有限公司',
  registrationCapital: '5000万人民币',
  establishedDate: '2019-05-15',
  location: '上海市浦东新区',
  industry: '人工智能/软件和信息技术服务',
  legalRepresentative: '张三',
  shareholders: [
    { name: '智谱华章控股集团', ratio: '65%' },
    { name: '创始人团队', ratio: '25%' },
    { name: '投资机构A', ratio: '10%' },
  ],
  patents: 156,
  trademarks: 42,
  certifications: [
    'ISO 9001质量管理体系',
    'ISO 27001信息安全管理体系',
    '国家高新技术企业',
    '软件企业认证',
  ],
  risks: [
    { level: 'low', description: '存在2起未结劳动仲裁' },
    { level: 'medium', description: '部分股东股权质押' },
  ],
  summary: '该公司是一家专注于人工智能技术研发的高新技术企业，注册资本5000万元人民币，成立于2019年。公司主要业务包括大语言模型、自然语言处理、计算机视觉等人工智能核心技术研发与应用。公司已获得国家高新技术企业认证，拥有156项专利和42项商标。整体经营状况良好，技术创新能力强，市场竞争优势明显。',
};

export default function CompanyProfilePage() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [history, setHistory] = useState<QueryHistory[]>(mockHistory);
  const [showHistory, setShowHistory] = useState(true);
  const [profile, setProfile] = useState<CompanyProfile | null>(null);

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
        resultCount: 1,
      };

      setHistory([newHistory, ...history]);
      setProfile(mockProfile);
      setIsSearching(false);
      setShowHistory(false);
    }, 2000);
  };

  const handleHistoryClick = (item: QueryHistory) => {
    setQuery(item.query);
  };

  const riskColors = {
    high: 'bg-red-100 text-red-700 border-red-200',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    low: 'bg-blue-100 text-blue-700 border-blue-200',
  };

  const riskLabels = {
    high: '高风险',
    medium: '中风险',
    low: '低风险',
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">企业 360° 深度画像智能体</h1>
        <p className="text-gray-500 mt-1">企业深度尽调，基于LLM模型总结结果</p>
      </div>

      {/* 搜索区域 */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              请输入企业名称或关键词
            </label>
            <Input
              placeholder="例如：上海智谱华章科技有限公司"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="text-base"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Brain className="w-4 h-4" />
              <span>AI 智能分析企业工商数据</span>
            </div>
            <Button onClick={handleSearch} disabled={isSearching || !query.trim()}>
              {isSearching ? (
                <>
                  <Brain className="w-4 h-4 mr-2 animate-pulse" />
                  分析中...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  开始分析
                </>
              )}
            </Button>
          </div>

          {/* 数据源说明 */}
          <div className="bg-indigo-50 rounded-lg p-4 space-y-2">
            <p className="text-sm font-medium text-indigo-900">数据源</p>
            <div className="flex flex-wrap gap-3">
              <Badge variant="outline" className="bg-white border-indigo-200 text-indigo-700">
                <Building2 className="w-3 h-3 mr-1" />
                工商数据API
              </Badge>
              <Badge variant="outline" className="bg-white border-purple-200 text-purple-700">
                <Award className="w-3 h-3 mr-1" />
                知识产权数据
              </Badge>
              <Badge variant="outline" className="bg-white border-blue-200 text-blue-700">
                <Target className="w-3 h-3 mr-1" />
                风险监测数据
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
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Search className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 line-clamp-1">
                      {item.query}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.timestamp} · {item.resultCount} 个结果
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 企业画像结果 */}
      {profile && !showHistory && (
        <div className="space-y-4">
          {/* 基础信息卡片 */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">{profile.name}</CardTitle>
              <CardDescription>企业深度画像报告</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 基础信息 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Briefcase className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">注册资本</p>
                    <p className="text-sm font-medium">{profile.registrationCapital}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">成立日期</p>
                    <p className="text-sm font-medium">{profile.establishedDate}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">所在地区</p>
                    <p className="text-sm font-medium">{profile.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">所属行业</p>
                    <p className="text-sm font-medium">{profile.industry}</p>
                  </div>
                </div>
              </div>

              {/* AI 智能总结 */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Brain className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-indigo-900 mb-2">AI 智能总结</p>
                    <p className="text-sm text-indigo-800 leading-relaxed">
                      {profile.summary}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 股权结构 */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="w-5 h-5" />
                股权结构
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {profile.shareholders.map((shareholder, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium">{shareholder.name}</span>
                    </div>
                    <Badge variant="outline">{shareholder.ratio}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 知识产权 */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="w-5 h-5" />
                知识产权
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-3xl font-bold text-blue-600">{profile.patents}</p>
                  <p className="text-sm text-blue-700">专利数量</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-3xl font-bold text-purple-600">{profile.trademarks}</p>
                  <p className="text-sm text-purple-700">商标数量</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700 mb-2">认证资质</p>
                {profile.certifications.map((cert, index) => (
                  <Badge key={index} variant="outline" className="mr-2">
                    {cert}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 风险监测 */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                风险监测
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {profile.risks.map((risk, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg ${riskColors[risk.level]}`}
                  >
                    <div className="flex items-start gap-2">
                      <Badge className={riskColors[risk.level]}>
                        {riskLabels[risk.level]}
                      </Badge>
                      <p className="text-sm flex-1">{risk.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
