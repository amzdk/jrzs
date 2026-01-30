'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertTriangle,
  TrendingDown,
  Newspaper,
  Building2,
  Globe,
  Shield,
  FileText,
  Activity,
  Clock,
  Search,
  Filter,
  RefreshCw,
  Bell,
  Eye,
  Sparkles,
  Download,
  Calendar,
  BarChart3,
  AlertCircle,
  CheckCircle2,
  XCircle,
  AlertOctagon,
  Target,
  Zap,
  Plus,
  Star,
  MessageSquare,
  Share2,
  MoreVertical,
  ChevronRight,
  DollarSign,
  LayoutList,
  Grid3X3
} from 'lucide-react';

// 工商负面信息接口
interface BusinessNegativeInfo {
  id: string;
  companyName: string;
  type: 'lawsuit' | 'execution' | 'abnormal' | 'penalty';
  title: string;
  description: string;
  date: string;
  severity: 'high' | 'medium' | 'low';
  aiSummary: string;
  impact: string;
}

// 互联网舆情信息接口
interface InternetSentimentInfo {
  id: string;
  companyName: string;
  platform: 'news' | 'social' | 'forum' | 'blog';
  title: string;
  content: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  date: string;
  source: string;
  views: number;
  comments: number;
  aiSummary: string;
}

// 行业情报接口
interface IndustryIntelligence {
  id: string;
  category: 'news' | 'funding' | 'tech' | 'competitor';
  title: string;
  description: string;
  industry: string;
  date: string;
  source: string;
  aiSummary: string;
  impact: 'high' | 'medium' | 'low';
}

// 政策风险接口
interface PolicyRisk {
  id: string;
  title: string;
  type: 'national' | 'local' | 'regulatory';
  description: string;
  department: string;
  date: string;
  status: 'draft' | 'released' | 'implemented';
  affectedIndustries: string[];
  aiSummary: string;
  riskLevel: 'high' | 'medium' | 'low';
}

// 企业接口
interface Company {
  id: string;
  name: string;
  code?: string;
  industry: string;
  isMonitored: boolean;
  addedAt?: string;
}

// 模拟数据
const mockBusinessNegativeData: BusinessNegativeInfo[] = [
  {
    id: '1',
    companyName: '智谱华章',
    type: 'lawsuit',
    title: '知识产权侵权纠纷',
    description: '公司因专利权被诉至法院，案件正在审理中',
    date: '2024-01-22',
    severity: 'high',
    aiSummary: '智谱华章卷入知识产权侵权纠纷，案件已立案。该纠纷可能涉及核心技术专利，需密切关注案件进展，评估对公司业务的潜在影响。建议法务部门积极应对，同时评估备用技术方案。',
    impact: '可能影响核心业务的正常运营，需密切关注案件进展',
  },
  {
    id: '2',
    companyName: '商汤科技',
    type: 'execution',
    title: '被执行人记录',
    description: '因未按时履行法院判决，被列为被执行人',
    date: '2024-01-20',
    severity: 'high',
    aiSummary: '商汤科技新增被执行人记录，金额约500万元。需立即核实具体情况，判断是否影响公司信用和正常经营。建议财务部门和法务部门协同处理。',
    impact: '可能影响企业信用评级，需及时处理',
  },
  {
    id: '3',
    companyName: '旷视科技',
    type: 'abnormal',
    title: '经营异常名录',
    description: '因未按规定报送年度报告，被列入经营异常名录',
    date: '2024-01-18',
    severity: 'medium',
    aiSummary: '旷视科技因未按时报送年报被列入经营异常名录，属于一般性工商异常。建议尽快补报年报，移出异常名录，避免影响企业信用和招投标。',
    impact: '影响企业信用，需尽快补报年报',
  },
];

const mockInternetSentimentData: InternetSentimentInfo[] = [
  {
    id: '1',
    companyName: '智谱华章',
    platform: 'news',
    title: '智谱华章获新一轮融资，估值达500亿',
    content: '智谱华章宣布完成新一轮融资，估值达到500亿人民币，投资方包括多家知名机构...',
    sentiment: 'positive',
    date: '2024-01-22',
    source: '财经网',
    views: 125000,
    comments: 856,
    aiSummary: '智谱华章融资新闻获得广泛关注，整体舆情积极正面。市场对其估值和未来发展持乐观态度。建议抓住利好时机，加强品牌宣传，吸引更多优质人才和合作伙伴。',
  },
  {
    id: '2',
    companyName: '商汤科技',
    platform: 'social',
    title: '用户反馈商汤AI产品存在隐私问题',
    content: '多位用户在微博等社交平台反映商汤科技的人脸识别产品存在隐私泄露风险...',
    sentiment: 'negative',
    date: '2024-01-21',
    source: '微博',
    views: 89600,
    comments: 2341,
    aiSummary: '商汤科技面临隐私问题的负面舆情，用户关注度较高。建议立即启动公关预案，发布官方声明澄清事实，同时加强产品隐私保护措施，避免舆情进一步发酵。',
  },
  {
    id: '3',
    companyName: '旷视科技',
    platform: 'forum',
    title: '旷视医疗AI技术获行业认可',
    content: '在医疗AI领域的技术研讨会上，旷视的技术方案获得专家高度评价...',
    sentiment: 'positive',
    date: '2024-01-20',
    source: '知乎',
    views: 45000,
    comments: 328,
    aiSummary: '旷视科技在医疗AI领域获得专业认可，舆情积极正面。建议加强该领域的市场推广，与医疗机构建立更多合作关系，巩固行业领先地位。',
  },
];

const mockIndustryIntelligence: IndustryIntelligence[] = [
  {
    id: '1',
    category: 'news',
    title: '人工智能行业2024年发展趋势预测',
    description: '权威机构发布AI行业年度报告，预测大模型应用将加速落地...',
    industry: '人工智能',
    date: '2024-01-22',
    source: '中国信通院',
    aiSummary: '行业报告预测2024年AI大模型应用将迎来爆发式增长，重点关注垂直领域的场景落地。建议投研团队关注大模型在企业服务、医疗、金融等领域的应用机会。',
    impact: 'high',
  },
  {
    id: '2',
    category: 'funding',
    title: '本周AI领域融资事件汇总',
    description: '本周人工智能领域共完成12起融资，总额约45亿元...',
    industry: '人工智能',
    date: '2024-01-21',
    source: '36氪',
    aiSummary: '本周AI融资市场活跃，大模型和应用层企业受到资本青睐。建议关注融资企业的技术路径和商业模式，评估投资机会。',
    impact: 'high',
  },
  {
    id: '3',
    category: 'tech',
    title: '多模态大模型技术取得新突破',
    description: '多家科技公司发布多模态大模型，在图文理解方面表现优异...',
    industry: '人工智能',
    date: '2024-01-20',
    source: '机器之心',
    aiSummary: '多模态大模型技术突破为AI应用带来新可能，建议关注相关技术发展趋势及其对已投企业的影响。',
    impact: 'medium',
  },
  {
    id: '4',
    category: 'competitor',
    title: '竞争对手产品发布情况',
    description: '同行业多家企业发布新产品，市场竞争加剧...',
    industry: '人工智能',
    date: '2024-01-19',
    source: '行业研究',
    aiSummary: '竞争对手加速产品发布，市场竞争日趋激烈。建议关注竞争对手的产品策略，评估对已投企业的影响。',
    impact: 'medium',
  },
];

const mockPolicyRisk: PolicyRisk[] = [
  {
    id: '1',
    title: '人工智能算法管理规定',
    type: 'national',
    description: '国家网信办发布《人工智能算法管理规定》，对算法推荐系统提出新要求...',
    department: '国家网信办',
    date: '2024-01-22',
    status: 'released',
    affectedIndustries: ['人工智能', '互联网', '金融科技'],
    aiSummary: '新规对算法推荐系统提出了透明度、公平性等要求，可能影响已投企业的产品设计和商业模式。建议法务和产品团队深入研究政策内容，评估合规风险。',
    riskLevel: 'high',
  },
  {
    id: '2',
    title: '数据安全法实施细则',
    type: 'regulatory',
    description: '工信部发布数据安全法实施细则，明确数据处理合规要求...',
    department: '工信部',
    date: '2024-01-20',
    status: 'released',
    affectedIndustries: ['人工智能', '大数据', '云计算'],
    aiSummary: '数据安全细则对数据处理提出了更严格的要求，建议已投企业加强数据合规管理，避免因违规受到处罚。',
    riskLevel: 'high',
  },
  {
    id: '3',
    title: '地方AI产业扶持政策',
    type: 'local',
    description: '深圳市发布人工智能产业发展扶持政策，提供资金支持...',
    department: '深圳市政府',
    date: '2024-01-18',
    status: 'implemented',
    affectedIndustries: ['人工智能'],
    aiSummary: '深圳市AI产业扶持政策为已投企业带来发展机遇，建议积极申请相关政策支持，加速业务发展。',
    riskLevel: 'low',
  },
];

const mockCompanies: Company[] = [
  {
    id: '1',
    name: '智谱华章科技有限公司',
    code: 'ZHIPUAI',
    industry: '人工智能',
    isMonitored: true,
    addedAt: '2024-01-15',
  },
  {
    id: '2',
    name: '商汤科技有限公司',
    code: '0020',
    industry: '人工智能',
    isMonitored: true,
    addedAt: '2024-01-10',
  },
  {
    id: '3',
    name: '旷视科技有限公司',
    code: 'MEGVII',
    industry: '人工智能',
    isMonitored: true,
    addedAt: '2024-01-08',
  },
  {
    id: '4',
    name: '比亚迪股份有限公司',
    code: '002594',
    industry: '新能源汽车',
    isMonitored: false,
  },
  {
    id: '5',
    name: '宁德时代新能源科技股份有限公司',
    code: '300750',
    industry: '新能源电池',
    isMonitored: false,
  },
  {
    id: '6',
    name: '蔚来汽车科技（安徽）有限公司',
    code: 'NIO',
    industry: '新能源汽车',
    isMonitored: false,
  },
  {
    id: '7',
    name: '小鹏汽车有限公司',
    code: '9868',
    industry: '新能源汽车',
    isMonitored: false,
  },
  {
    id: '8',
    name: '理想汽车',
    code: 'LI',
    industry: '新能源汽车',
    isMonitored: false,
  },
];

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      {children}
    </label>
  );
}

export default function SentimentPage() {
  const [activeTab, setActiveTab] = useState('business-negative');
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isCompanyDialogOpen, setIsCompanyDialogOpen] = useState(false);
  const [companies, setCompanies] = useState<Company[]>(mockCompanies);
  const [companySearchQuery, setCompanySearchQuery] = useState('');

  // 筛选逻辑
  const getFilteredBusinessData = () => {
    return mockBusinessNegativeData.filter(item => {
      const matchCompany = selectedCompany === 'all' || item.companyName === selectedCompany;
      const matchSeverity = selectedSeverity === 'all' || item.severity === selectedSeverity;
      const matchSearch = !searchQuery || item.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCompany && matchSeverity && matchSearch;
    });
  };

  const getFilteredInternetData = () => {
    return mockInternetSentimentData.filter(item => {
      const matchCompany = selectedCompany === 'all' || item.companyName === selectedCompany;
      const matchSearch = !searchQuery || item.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCompany && matchSearch;
    });
  };

  const getFilteredIndustryData = () => {
    return mockIndustryIntelligence.filter(item => {
      const matchSearch = !searchQuery || item.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSearch;
    });
  };

  const getFilteredPolicyData = () => {
    return mockPolicyRisk.filter(item => {
      const matchSearch = !searchQuery || item.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSearch;
    });
  };

  // 企业筛选
  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(companySearchQuery.toLowerCase()) ||
    (company.code && company.code.toLowerCase().includes(companySearchQuery.toLowerCase()))
  );

  // 显示逻辑：搜索时显示所有匹配的企业（包括未监测），不搜索时只显示已监测的企业
  const displayedCompanies = companySearchQuery.trim() !== ''
    ? filteredCompanies
    : filteredCompanies.filter((c) => c.isMonitored);

  const handleToggleMonitoring = (companyId: string) => {
    setCompanies((prev) =>
      prev.map((company) =>
        company.id === companyId
          ? { ...company, isMonitored: !company.isMonitored, addedAt: !company.isMonitored ? new Date().toISOString().split('T')[0] : company.addedAt }
          : company
      )
    );
  };

  // 渲染工商负面跟踪卡片
  const renderBusinessNegativeCard = (item: BusinessNegativeInfo) => {
    const typeLabels = {
      lawsuit: { label: '诉讼案件', icon: Shield, color: 'bg-red-50 text-red-600' },
      execution: { label: '被执行', icon: AlertCircle, color: 'bg-orange-50 text-orange-600' },
      abnormal: { label: '经营异常', icon: AlertTriangle, color: 'bg-yellow-50 text-yellow-600' },
      penalty: { label: '行政处罚', icon: XCircle, color: 'bg-purple-50 text-purple-600' },
    };

    const severityLabels = {
      high: { label: '高风险', color: 'bg-red-100 text-red-700' },
      medium: { label: '中风险', color: 'bg-yellow-100 text-yellow-700' },
      low: { label: '低风险', color: 'bg-green-100 text-green-700' },
    };

    const typeInfo = typeLabels[item.type];

    return (
      <Card key={item.id} className="border-0 shadow-sm hover:shadow-lg transition-all cursor-pointer" onClick={() => {
        setSelectedItem(item);
        setIsDetailDialogOpen(true);
      }}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className={typeInfo.color}>
                  <typeInfo.icon className="w-3 h-3 mr-1" />
                  {typeInfo.label}
                </Badge>
                <Badge className={severityLabels[item.severity].color}>
                  {severityLabels[item.severity].label}
                </Badge>
              </div>
              <CardTitle className="text-lg">{item.title}</CardTitle>
              <CardDescription className="mt-1 flex items-center gap-2">
                <Building2 className="w-3 h-3" />
                {item.companyName}
                <span>•</span>
                <Clock className="w-3 h-3" />
                {item.date}
              </CardDescription>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon">
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
          <Separator />
          <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
            <Sparkles className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-blue-700 font-medium mb-1">AI智能分析</p>
              <p className="text-xs text-gray-700 line-clamp-2">{item.aiSummary}</p>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            <span className="font-medium">影响评估：</span>
            {item.impact}
          </div>
        </CardContent>
      </Card>
    );
  };

  // 渲染互联网舆情卡片
  const renderInternetSentimentCard = (item: InternetSentimentInfo) => {
    const platformLabels = {
      news: { label: '新闻', icon: Newspaper, color: 'bg-blue-50 text-blue-600' },
      social: { label: '社交媒体', icon: MessageSquare, color: 'bg-green-50 text-green-600' },
      forum: { label: '论坛', icon: MessageSquare, color: 'bg-purple-50 text-purple-600' },
      blog: { label: '博客', icon: FileText, color: 'bg-orange-50 text-orange-600' },
    };

    const sentimentLabels = {
      positive: { label: '正面', color: 'bg-green-100 text-green-700', icon: CheckCircle2 },
      negative: { label: '负面', color: 'bg-red-100 text-red-700', icon: XCircle },
      neutral: { label: '中性', color: 'bg-gray-100 text-gray-700', icon: AlertCircle },
    };

    const platformInfo = platformLabels[item.platform];
    const sentimentInfo = sentimentLabels[item.sentiment];

    return (
      <Card key={item.id} className="border-0 shadow-sm hover:shadow-lg transition-all cursor-pointer" onClick={() => {
        setSelectedItem(item);
        setIsDetailDialogOpen(true);
      }}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className={platformInfo.color}>
                  <platformInfo.icon className="w-3 h-3 mr-1" />
                  {platformInfo.label}
                </Badge>
                <Badge className={sentimentInfo.color}>
                  <sentimentInfo.icon className="w-3 h-3 mr-1" />
                  {sentimentInfo.label}
                </Badge>
              </div>
              <CardTitle className="text-lg">{item.title}</CardTitle>
              <CardDescription className="mt-1 flex items-center gap-2">
                <Building2 className="w-3 h-3" />
                {item.companyName}
                <span>•</span>
                <Globe className="w-3 h-3" />
                {item.source}
                <span>•</span>
                <Clock className="w-3 h-3" />
                {item.date}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-gray-600 line-clamp-2">{item.content}</p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {item.views.toLocaleString()} 浏览
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="w-3 h-3" />
              {item.comments.toLocaleString()} 评论
            </span>
          </div>
          <Separator />
          <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
            <Sparkles className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-blue-700 font-medium mb-1">AI智能分析</p>
              <p className="text-xs text-gray-700 line-clamp-2">{item.aiSummary}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  // 渲染行业情报卡片
  const renderIndustryCard = (item: IndustryIntelligence) => {
    const categoryLabels = {
      news: { label: '行业资讯', icon: Newspaper, color: 'bg-blue-50 text-blue-600' },
      funding: { label: '融资动态', icon: DollarSign, color: 'bg-green-50 text-green-600' },
      tech: { label: '技术突破', icon: Zap, color: 'bg-purple-50 text-purple-600' },
      competitor: { label: '竞品动态', icon: Target, color: 'bg-orange-50 text-orange-600' },
    };

    const impactLabels = {
      high: { label: '高影响', color: 'bg-red-100 text-red-700' },
      medium: { label: '中影响', color: 'bg-yellow-100 text-yellow-700' },
      low: { label: '低影响', color: 'bg-green-100 text-green-700' },
    };

    const categoryInfo = categoryLabels[item.category];

    return (
      <Card key={item.id} className="border-0 shadow-sm hover:shadow-lg transition-all cursor-pointer" onClick={() => {
        setSelectedItem(item);
        setIsDetailDialogOpen(true);
      }}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className={categoryInfo.color}>
                  <categoryInfo.icon className="w-3 h-3 mr-1" />
                  {categoryInfo.label}
                </Badge>
                <Badge className={impactLabels[item.impact].color}>
                  {impactLabels[item.impact].label}
                </Badge>
              </div>
              <CardTitle className="text-lg">{item.title}</CardTitle>
              <CardDescription className="mt-1 flex items-center gap-2">
                <Target className="w-3 h-3" />
                {item.industry}
                <span>•</span>
                <Globe className="w-3 h-3" />
                {item.source}
                <span>•</span>
                <Clock className="w-3 h-3" />
                {item.date}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
          <Separator />
          <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
            <Sparkles className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-blue-700 font-medium mb-1">AI智能分析</p>
              <p className="text-xs text-gray-700 line-clamp-2">{item.aiSummary}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  // 渲染政策风险卡片
  const renderPolicyRiskCard = (item: PolicyRisk) => {
    const typeLabels = {
      national: { label: '国家政策', icon: Star, color: 'bg-blue-50 text-blue-600' },
      local: { label: '地方政策', icon: Building2, color: 'bg-green-50 text-green-600' },
      regulatory: { label: '监管政策', icon: Shield, color: 'bg-purple-50 text-purple-600' },
    };

    const statusLabels = {
      draft: { label: '草案', color: 'bg-gray-100 text-gray-700' },
      released: { label: '已发布', color: 'bg-blue-100 text-blue-700' },
      implemented: { label: '已实施', color: 'bg-green-100 text-green-700' },
    };

    const riskLabels = {
      high: { label: '高风险', color: 'bg-red-100 text-red-700' },
      medium: { label: '中风险', color: 'bg-yellow-100 text-yellow-700' },
      low: { label: '低风险', color: 'bg-green-100 text-green-700' },
    };

    const typeInfo = typeLabels[item.type];

    return (
      <Card key={item.id} className="border-0 shadow-sm hover:shadow-lg transition-all cursor-pointer" onClick={() => {
        setSelectedItem(item);
        setIsDetailDialogOpen(true);
      }}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className={typeInfo.color}>
                  <typeInfo.icon className="w-3 h-3 mr-1" />
                  {typeInfo.label}
                </Badge>
                <Badge className={statusLabels[item.status].color}>
                  {statusLabels[item.status].label}
                </Badge>
                <Badge className={riskLabels[item.riskLevel].color}>
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  {riskLabels[item.riskLevel].label}
                </Badge>
              </div>
              <CardTitle className="text-lg">{item.title}</CardTitle>
              <CardDescription className="mt-1 flex items-center gap-2">
                <Shield className="w-3 h-3" />
                {item.department}
                <span>•</span>
                <Clock className="w-3 h-3" />
                {item.date}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
          <div className="flex flex-wrap gap-2">
            {item.affectedIndustries.map((industry, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {industry}
              </Badge>
            ))}
          </div>
          <Separator />
          <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
            <Sparkles className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-blue-700 font-medium mb-1">AI智能分析</p>
              <p className="text-xs text-gray-700 line-clamp-2">{item.aiSummary}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  // 工商负面信息表格行渲染
  const renderBusinessNegativeRow = (item: BusinessNegativeInfo) => {
    const typeLabels = {
      lawsuit: { label: '诉讼案件', color: 'bg-red-50 text-red-700' },
      execution: { label: '被执行', color: 'bg-orange-50 text-orange-700' },
      abnormal: { label: '经营异常', color: 'bg-yellow-50 text-yellow-700' },
      penalty: { label: '行政处罚', color: 'bg-purple-50 text-purple-700' }
    };

    const severityLabels = {
      high: { label: '高', color: 'bg-red-100 text-red-700' },
      medium: { label: '中', color: 'bg-yellow-100 text-yellow-700' },
      low: { label: '低', color: 'bg-green-100 text-green-700' }
    };

    const typeInfo = typeLabels[item.type];
    const severityInfo = severityLabels[item.severity];

    return (
      <TableRow key={item.id} className="cursor-pointer hover:bg-gray-50" onClick={() => {
        setSelectedItem(item);
        setIsDetailDialogOpen(true);
      }}>
        <TableCell className="font-medium">{item.companyName}</TableCell>
        <TableCell>
          <Badge className={typeInfo.color}>{typeInfo.label}</Badge>
        </TableCell>
        <TableCell>{item.title}</TableCell>
        <TableCell>
          <Badge className={severityInfo.color}>{severityInfo.label}</Badge>
        </TableCell>
        <TableCell>{item.date}</TableCell>
        <TableCell className="text-right">
          <Button variant="ghost" size="sm">
            <Eye className="w-4 h-4" />
          </Button>
        </TableCell>
      </TableRow>
    );
  };

  // 互联网舆情表格行渲染
  const renderInternetSentimentRow = (item: InternetSentimentInfo) => {
    const sentimentLabels = {
      positive: { label: '正面', color: 'bg-green-100 text-green-700' },
      negative: { label: '负面', color: 'bg-red-100 text-red-700' },
      neutral: { label: '中性', color: 'bg-gray-100 text-gray-700' }
    };

    const sentimentInfo = sentimentLabels[item.sentiment];

    return (
      <TableRow key={item.id} className="cursor-pointer hover:bg-gray-50" onClick={() => {
        setSelectedItem(item);
        setIsDetailDialogOpen(true);
      }}>
        <TableCell className="font-medium">{item.companyName}</TableCell>
        <TableCell>{item.title}</TableCell>
        <TableCell>{item.source}</TableCell>
        <TableCell>
          <Badge className={sentimentInfo.color}>{sentimentInfo.label}</Badge>
        </TableCell>
        <TableCell>{item.views.toLocaleString()}</TableCell>
        <TableCell>{item.date}</TableCell>
        <TableCell className="text-right">
          <Button variant="ghost" size="sm">
            <Eye className="w-4 h-4" />
          </Button>
        </TableCell>
      </TableRow>
    );
  };

  // 行业情报表格行渲染
  const renderIndustryRow = (item: IndustryIntelligence) => {
    const categoryLabels = {
      news: { label: '新闻', color: 'bg-blue-100 text-blue-700' },
      funding: { label: '融资', color: 'bg-green-100 text-green-700' },
      tech: { label: '技术', color: 'bg-purple-100 text-purple-700' },
      competitor: { label: '竞品', color: 'bg-orange-100 text-orange-700' }
    };

    const impactLabels = {
      high: { label: '高', color: 'bg-red-100 text-red-700' },
      medium: { label: '中', color: 'bg-yellow-100 text-yellow-700' },
      low: { label: '低', color: 'bg-green-100 text-green-700' }
    };

    const categoryInfo = categoryLabels[item.category];
    const impactInfo = impactLabels[item.impact];

    return (
      <TableRow key={item.id} className="cursor-pointer hover:bg-gray-50" onClick={() => {
        setSelectedItem(item);
        setIsDetailDialogOpen(true);
      }}>
        <TableCell className="font-medium">{item.title}</TableCell>
        <TableCell>{item.industry}</TableCell>
        <TableCell>
          <Badge className={categoryInfo.color}>{categoryInfo.label}</Badge>
        </TableCell>
        <TableCell>{item.source}</TableCell>
        <TableCell>
          <Badge className={impactInfo.color}>{impactInfo.label}</Badge>
        </TableCell>
        <TableCell>{item.date}</TableCell>
        <TableCell className="text-right">
          <Button variant="ghost" size="sm">
            <Eye className="w-4 h-4" />
          </Button>
        </TableCell>
      </TableRow>
    );
  };

  // 政策风险表格行渲染
  const renderPolicyRiskRow = (item: PolicyRisk) => {
    const typeLabels = {
      national: { label: '国家政策', color: 'bg-blue-100 text-blue-700' },
      local: { label: '地方政策', color: 'bg-green-100 text-green-700' },
      regulatory: { label: '监管政策', color: 'bg-purple-100 text-purple-700' }
    };

    const statusLabels = {
      draft: { label: '草案', color: 'bg-gray-100 text-gray-700' },
      released: { label: '已发布', color: 'bg-blue-100 text-blue-700' },
      implemented: { label: '已实施', color: 'bg-green-100 text-green-700' }
    };

    const riskLabels = {
      high: { label: '高', color: 'bg-red-100 text-red-700' },
      medium: { label: '中', color: 'bg-yellow-100 text-yellow-700' },
      low: { label: '低', color: 'bg-green-100 text-green-700' }
    };

    const typeInfo = typeLabels[item.type];
    const statusInfo = statusLabels[item.status];
    const riskInfo = riskLabels[item.riskLevel];

    return (
      <TableRow key={item.id} className="cursor-pointer hover:bg-gray-50" onClick={() => {
        setSelectedItem(item);
        setIsDetailDialogOpen(true);
      }}>
        <TableCell className="font-medium">{item.title}</TableCell>
        <TableCell>{item.department}</TableCell>
        <TableCell>
          <Badge className={typeInfo.color}>{typeInfo.label}</Badge>
        </TableCell>
        <TableCell>
          <Badge className={statusInfo.color}>{statusInfo.label}</Badge>
        </TableCell>
        <TableCell>
          <Badge className={riskInfo.color}>{riskInfo.label}</Badge>
        </TableCell>
        <TableCell>{item.date}</TableCell>
        <TableCell className="text-right">
          <Button variant="ghost" size="sm">
            <Eye className="w-4 h-4" />
          </Button>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* 详情 Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">详情查看</DialogTitle>
            <DialogDescription>AI智能体基于大语言模型生成的内容</DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-gray-600" />
                <span className="font-medium">{selectedItem.companyName || selectedItem.industry || selectedItem.department}</span>
                <span>•</span>
                <Clock className="w-4 h-4 text-gray-600" />
                <span>{selectedItem.date}</span>
              </div>
              <h3 className="text-lg font-semibold">{selectedItem.title}</h3>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">{selectedItem.description || selectedItem.content}</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-700">AI智能分析</span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{selectedItem.aiSummary}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  导出报告
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="w-4 h-4 mr-2" />
                  分享
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* 企业管理 Dialog */}
      <Dialog open={isCompanyDialogOpen} onOpenChange={setIsCompanyDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>监控企业管理</DialogTitle>
            <DialogDescription>查看已监测企业，或搜索企业名称添加新企业到监测列表</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* 搜索框 */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="搜索企业名称或代码，添加新企业..."
                value={companySearchQuery}
                onChange={(e) => setCompanySearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* 企业列表 */}
            <div className="border rounded-lg divide-y max-h-[400px] overflow-y-auto">
              {displayedCompanies.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Building2 className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>{companySearchQuery ? '未找到匹配的企业' : '暂无监测企业，请搜索添加'}</p>
                </div>
              ) : (
                displayedCompanies.map((company) => (
                  <div
                    key={company.id}
                    className="p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{company.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            {company.code && (
                              <Badge variant="outline" className="text-xs">
                                {company.code}
                              </Badge>
                            )}
                            <span className="text-xs text-gray-500">{company.industry}</span>
                          </div>
                          {company.addedAt && (
                            <p className="text-xs text-gray-400 mt-1">添加于 {company.addedAt}</p>
                          )}
                        </div>
                      </div>
                      <Button
                        variant={company.isMonitored ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleToggleMonitoring(company.id)}
                        className={company.isMonitored ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}
                      >
                        {company.isMonitored ? (
                          <>
                            <XCircle className="w-4 h-4 mr-1" />
                            取消监测
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4 mr-1" />
                            添加监测
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* 统计信息 */}
            <div className="flex items-center justify-end text-sm text-gray-500 pt-2 border-t">
              <span>已监测 {companies.filter((c) => c.isMonitored).length} 家企业</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">AI 舆情监控</h1>
          <p className="text-gray-500 mt-1">
            基于AI大模型实时监控已投企业舆情、工商负面信息、行业情报和政策风险
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setIsCompanyDialogOpen(true)}
          >
            <Building2 className="w-4 h-4 mr-2" />
            监控企业管理
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
            <RefreshCw className="w-4 h-4 mr-2" />
            刷新数据
          </Button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">工商负面</p>
                <p className="text-3xl font-bold text-red-600">{mockBusinessNegativeData.length}</p>
                <p className="text-xs text-gray-500">高风险事件 2 起</p>
              </div>
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">互联网舆情</p>
                <p className="text-3xl font-bold text-blue-600">{mockInternetSentimentData.length}</p>
                <p className="text-xs text-gray-500">负面舆情 1 条</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">行业情报</p>
                <p className="text-3xl font-bold text-green-600">{mockIndustryIntelligence.length}</p>
                <p className="text-xs text-gray-500">高影响信息 2 条</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <Newspaper className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">政策风险</p>
                <p className="text-3xl font-bold text-purple-600">{mockPolicyRisk.length}</p>
                <p className="text-xs text-gray-500">高风险政策 2 项</p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 主要内容 */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="business-negative">工商负面跟踪</TabsTrigger>
            <TabsTrigger value="internet-sentiment">互联网舆情跟踪</TabsTrigger>
            <TabsTrigger value="industry-intelligence">行业情报聚合</TabsTrigger>
            <TabsTrigger value="policy-risk">政策风险跟踪</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <div className="flex items-center border rounded-md">
              <Button
                variant={viewMode === 'card' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('card')}
                className="rounded-r-none"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'table' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('table')}
                className="rounded-l-none"
              >
                <LayoutList className="w-4 h-4" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="搜索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-64"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* 已投企业舆情 - 工商负面跟踪 */}
        <TabsContent value="business-negative" className="mt-6">
          <div className="mb-4 flex items-center gap-4">
            <Select value={selectedCompany} onValueChange={setSelectedCompany}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="选择企业" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部企业</SelectItem>
                <SelectItem value="智谱华章">智谱华章</SelectItem>
                <SelectItem value="商汤科技">商汤科技</SelectItem>
                <SelectItem value="旷视科技">旷视科技</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="风险等级" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部等级</SelectItem>
                <SelectItem value="high">高风险</SelectItem>
                <SelectItem value="medium">中风险</SelectItem>
                <SelectItem value="low">低风险</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {viewMode === 'card' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getFilteredBusinessData().map(renderBusinessNegativeCard)}
            </div>
          ) : (
            <Card className="border-0 shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>企业名称</TableHead>
                    <TableHead>类型</TableHead>
                    <TableHead>标题</TableHead>
                    <TableHead>风险等级</TableHead>
                    <TableHead>日期</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getFilteredBusinessData().map(renderBusinessNegativeRow)}
                </TableBody>
              </Table>
            </Card>
          )}
        </TabsContent>

        {/* 已投企业舆情 - 互联网舆情跟踪 */}
        <TabsContent value="internet-sentiment" className="mt-6">
          <div className="mb-4">
            <Select value={selectedCompany} onValueChange={setSelectedCompany}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="选择企业" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部企业</SelectItem>
                <SelectItem value="智谱华章">智谱华章</SelectItem>
                <SelectItem value="商汤科技">商汤科技</SelectItem>
                <SelectItem value="旷视科技">旷视科技</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {viewMode === 'card' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getFilteredInternetData().map(renderInternetSentimentCard)}
            </div>
          ) : (
            <Card className="border-0 shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>企业名称</TableHead>
                    <TableHead>标题</TableHead>
                    <TableHead>来源</TableHead>
                    <TableHead>情感</TableHead>
                    <TableHead>浏览量</TableHead>
                    <TableHead>日期</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getFilteredInternetData().map(renderInternetSentimentRow)}
                </TableBody>
              </Table>
            </Card>
          )}
        </TabsContent>

        {/* 已投企业宏观监测 - 行业情报聚合 */}
        <TabsContent value="industry-intelligence" className="mt-6">
          <div className="mb-4">
            <Select defaultValue="all">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="选择分类" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部分类</SelectItem>
                <SelectItem value="news">行业资讯</SelectItem>
                <SelectItem value="funding">融资动态</SelectItem>
                <SelectItem value="tech">技术突破</SelectItem>
                <SelectItem value="competitor">竞品动态</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {viewMode === 'card' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getFilteredIndustryData().map(renderIndustryCard)}
            </div>
          ) : (
            <Card className="border-0 shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>标题</TableHead>
                    <TableHead>行业</TableHead>
                    <TableHead>分类</TableHead>
                    <TableHead>来源</TableHead>
                    <TableHead>影响</TableHead>
                    <TableHead>日期</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getFilteredIndustryData().map(renderIndustryRow)}
                </TableBody>
              </Table>
            </Card>
          )}
        </TabsContent>

        {/* 已投企业宏观监测 - 政策风险跟踪 */}
        <TabsContent value="policy-risk" className="mt-6">
          <div className="mb-4">
            <Select defaultValue="all">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="选择类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部类型</SelectItem>
                <SelectItem value="national">国家政策</SelectItem>
                <SelectItem value="local">地方政策</SelectItem>
                <SelectItem value="regulatory">监管政策</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {viewMode === 'card' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getFilteredPolicyData().map(renderPolicyRiskCard)}
            </div>
          ) : (
            <Card className="border-0 shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>标题</TableHead>
                    <TableHead>部门</TableHead>
                    <TableHead>类型</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>风险等级</TableHead>
                    <TableHead>日期</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getFilteredPolicyData().map(renderPolicyRiskRow)}
                </TableBody>
              </Table>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
