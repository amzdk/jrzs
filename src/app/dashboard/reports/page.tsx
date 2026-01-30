'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  FileText,
  Plus,
  Download,
  Eye,
  Trash2,
  Edit,
  Calendar,
  TrendingUp,
  Activity,
  Clock,
  Filter,
  Search,
  Sparkles,
  Target,
  Users,
  DollarSign,
  Building2,
  Settings,
  Play,
  Pause,
  Check,
  MoreVertical,
  AlertCircle,
  LayoutGrid,
  Table
} from 'lucide-react';

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      {children}
    </label>
  );
}

interface Report {
  id: string;
  title: string;
  type: 'daily' | 'weekly' | 'monthly' | 'custom';
  industry: string;
  companies: string[];
  createdAt: string;
  createdBy: string;
  status: 'draft' | 'completed';
  summary: string;
  highlights: string[];
  keyData: {
    marketSize: string;
    growthRate: string;
    fundingCount: number;
    avgValuation: string;
  };
}

interface ScheduledReport {
  id: string;
  name: string;
  type: 'daily' | 'weekly' | 'monthly';
  industry: string;
  scheduleTime: string;
  dataSources: string[];
  status: 'active' | 'paused';
  lastRun: string;
  nextRun: string;
  createdBy: string;
}

const mockReports: Report[] = [
  {
    id: '1',
    title: '人工智能行业周报（第42期）',
    type: 'weekly',
    industry: '人工智能',
    companies: ['智谱华章', '商汤科技', '旷视科技'],
    createdAt: '2024-01-22',
    createdBy: 'AI智能体',
    status: 'completed',
    summary: '本周人工智能行业融资活跃，大模型应用落地加速，多家企业发布新产品',
    highlights: [
      '智谱华章完成新一轮融资，估值达到500亿',
      '商汤科技发布新一代视觉大模型',
      '旷视科技在医疗AI领域取得突破',
    ],
    keyData: {
      marketSize: '2800亿',
      growthRate: '35.6%',
      fundingCount: 12,
      avgValuation: '18.5亿',
    },
  },
  {
    id: '2',
    title: '新能源汽车行业月报（2024年1月）',
    type: 'monthly',
    industry: '新能源汽车',
    companies: ['比亚迪', '蔚来', '小鹏'],
    createdAt: '2024-01-20',
    createdBy: 'AI智能体',
    status: 'completed',
    summary: '1月新能源汽车销量创新高，政策利好持续释放',
    highlights: [
      '比亚迪月销量突破20万辆',
      '蔚来交付量创历史新高',
      '小鹏推出全新车型',
    ],
    keyData: {
      marketSize: '5800亿',
      growthRate: '28.3%',
      fundingCount: 5,
      avgValuation: '45.2亿',
    },
  },
  {
    id: '3',
    title: '生物医药行业日报',
    type: 'daily',
    industry: '生物医药',
    companies: ['药明康德', '恒瑞医药'],
    createdAt: '2024-01-22',
    createdBy: 'AI智能体',
    status: 'completed',
    summary: '今日生物医药行业动态，创新药审批加速',
    highlights: [
      '药明康德获FDA批准',
      '恒瑞医药新药进入临床III期',
    ],
    keyData: {
      marketSize: '3200亿',
      growthRate: '15.2%',
      fundingCount: 3,
      avgValuation: '22.8亿',
    },
  },
];

const mockScheduledReports: ScheduledReport[] = [
  {
    id: '1',
    name: '人工智能行业周报',
    type: 'weekly',
    industry: '人工智能',
    scheduleTime: '每周一 09:00',
    dataSources: ['知识库', '工商数据', '互联网舆情'],
    status: 'active',
    lastRun: '2024-01-22 09:00',
    nextRun: '2024-01-29 09:00',
    createdBy: '张三',
  },
  {
    id: '2',
    name: '新能源汽车日报',
    type: 'daily',
    industry: '新能源汽车',
    scheduleTime: '每天 08:00',
    dataSources: ['知识库', '新闻资讯', '政策法规'],
    status: 'active',
    lastRun: '2024-01-22 08:00',
    nextRun: '2024-01-23 08:00',
    createdBy: '李四',
  },
  {
    id: '3',
    name: '生物医药行业月报',
    type: 'monthly',
    industry: '生物医药',
    scheduleTime: '每月1日 10:00',
    dataSources: ['知识库', '研究报告', '工商数据'],
    status: 'paused',
    lastRun: '2024-01-01 10:00',
    nextRun: '2024-02-01 10:00',
    createdBy: '王五',
  },
];

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [activeTab, setActiveTab] = useState('list');
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false);
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false);
  const [scheduledReports, setScheduledReports] = useState<ScheduledReport[]>(mockScheduledReports);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: '',
    end: ''
  });

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.industry.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDate = (!dateRange.start || report.createdAt >= dateRange.start) &&
                        (!dateRange.end || report.createdAt <= dateRange.end);
    
    return matchesSearch && matchesDate;
  });

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Dialog */}
      <Dialog open={isGenerateDialogOpen} onOpenChange={setIsGenerateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>生成投研简报</DialogTitle>
            <DialogDescription>配置简报生成参数，AI智能体将自动生成报告</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reportType">简报类型</Label>
                <Select>
                  <SelectTrigger id="reportType">
                    <SelectValue placeholder="选择类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">日报</SelectItem>
                    <SelectItem value="weekly">周报</SelectItem>
                    <SelectItem value="monthly">月报</SelectItem>
                    <SelectItem value="custom">自定义</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">行业</Label>
                <Select>
                  <SelectTrigger id="industry">
                    <SelectValue placeholder="选择行业" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ai">人工智能</SelectItem>
                    <SelectItem value="ev">新能源汽车</SelectItem>
                    <SelectItem value="bio">生物医药</SelectItem>
                    <SelectItem value="finance">金融科技</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="companies">关注企业</Label>
              <Input id="companies" placeholder="输入企业名称，多个用逗号分隔" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeRange">时间范围</Label>
              <div className="grid grid-cols-2 gap-4">
                <Input id="startDate" type="date" />
                <Input id="endDate" type="date" />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">分析维度</p>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-sm">市场动态</span>
                </label>
                <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-sm">融资情况</span>
                </label>
                <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-sm">政策法规</span>
                </label>
                <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-sm">企业动态</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsGenerateDialogOpen(false)}>
                取消
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                <Sparkles className="w-4 h-4 mr-2" />
                生成简报
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>



      {/* 新增/编辑任务 Dialog */}
      <Dialog open={isAddTaskDialogOpen} onOpenChange={setIsAddTaskDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>新增定期简报任务</DialogTitle>
            <DialogDescription>配置自动生成简报的参数和执行计划</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="taskName">任务名称</Label>
              <Input id="taskName" placeholder="例如：人工智能行业周报" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="taskType">简报类型</Label>
                <Select>
                  <SelectTrigger id="taskType">
                    <SelectValue placeholder="选择类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">日报</SelectItem>
                    <SelectItem value="weekly">周报</SelectItem>
                    <SelectItem value="monthly">月报</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="taskIndustry">行业</Label>
                <Select>
                  <SelectTrigger id="taskIndustry">
                    <SelectValue placeholder="选择行业" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ai">人工智能</SelectItem>
                    <SelectItem value="ev">新能源汽车</SelectItem>
                    <SelectItem value="bio">生物医药</SelectItem>
                    <SelectItem value="finance">金融科技</SelectItem>
                    <SelectItem value="semiconductor">半导体</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="scheduleTime">执行时间</Label>
                <Input id="scheduleTime" type="time" defaultValue="09:00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="scheduleDay">执行日期（周报/月报）</Label>
                <Select>
                  <SelectTrigger id="scheduleDay">
                    <SelectValue placeholder="选择日期" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monday">每周一</SelectItem>
                    <SelectItem value="tuesday">每周二</SelectItem>
                    <SelectItem value="wednesday">每周三</SelectItem>
                    <SelectItem value="thursday">每周四</SelectItem>
                    <SelectItem value="friday">每周五</SelectItem>
                    <SelectItem value="month1">每月1日</SelectItem>
                    <SelectItem value="month15">每月15日</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">数据源</p>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-sm">知识库（行业报告）</span>
                </label>
                <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-sm">新闻资讯</span>
                </label>
                <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-sm">工商数据API</span>
                </label>
                <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-sm">互联网舆情</span>
                </label>
                <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-sm">政策法规</span>
                </label>
                <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-sm">公众号文章</span>
                </label>
              </div>
            </div>

            <div className="p-3 bg-blue-50 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-700">
                AI智能体将根据设定的数据源，自动聚合知识库最新的行业报告、新闻资讯等信息，生成完整的投研简报
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsAddTaskDialogOpen(false)}>
                取消
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                <Check className="w-4 h-4 mr-2" />
                创建任务
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">AI 投研简报</h1>
        <p className="text-gray-500 mt-1">
          AI智能体自动生成行业投研简报，包含市场动态、融资情况、政策法规等信息
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">简报总数</p>
                <p className="text-3xl font-bold text-gray-900">{reports.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">本周新增</p>
                <p className="text-3xl font-bold text-green-600">12</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">覆盖行业</p>
                <p className="text-3xl font-bold text-purple-600">8</p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">关注企业</p>
                <p className="text-3xl font-bold text-orange-600">156</p>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 主要内容 */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="list">简报列表</TabsTrigger>
            <TabsTrigger value="schedule">定期配置</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="搜索简报..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-64"
              />
            </div>
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <Input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="border-0 p-0 h-auto text-sm focus-visible:ring-0"
              />
              <span className="text-gray-400">-</span>
              <Input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="border-0 p-0 h-auto text-sm focus-visible:ring-0"
              />
              {(dateRange.start || dateRange.end) && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setDateRange({ start: '', end: '' })}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              )}
            </div>
            <Button
              onClick={() => setIsGenerateDialogOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              生成简报
            </Button>
            <div className="flex border rounded-lg overflow-hidden">
              <Button
                variant={viewMode === 'card' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('card')}
                className="rounded-none border-r"
              >
                <LayoutGrid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'table' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('table')}
                className="rounded-none"
              >
                <Table className="w-4 h-4" />
              </Button>
            </div>

          </div>
        </div>

        <TabsContent value="schedule" className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">定期简报任务</h2>
              <p className="text-sm text-gray-500">管理自动生成的定期简报任务</p>
            </div>
            <Button
              onClick={() => setIsAddTaskDialogOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              新增任务
            </Button>
          </div>

          <div className="space-y-3">
            {scheduledReports.map((task) => (
              <div key={task.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{task.name}</h3>
                      <Badge variant={task.status === 'active' ? 'default' : 'secondary'}>
                        {task.status === 'active' ? '运行中' : '已暂停'}
                      </Badge>
                      <Badge variant="outline">
                        {task.type === 'daily' ? '日报' : task.type === 'weekly' ? '周报' : '月报'}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="text-gray-500">行业：</span>
                        {task.industry}
                      </div>
                      <div>
                        <span className="text-gray-500">执行时间：</span>
                        {task.scheduleTime}
                      </div>
                      <div>
                        <span className="text-gray-500">上次运行：</span>
                        {task.lastRun}
                      </div>
                      <div>
                        <span className="text-gray-500">下次运行：</span>
                        <span className="text-blue-600 font-medium">{task.nextRun}</span>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs text-gray-500">数据源：</span>
                      {task.dataSources.map((source, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {source}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setScheduledReports(scheduledReports.map(r =>
                          r.id === task.id
                            ? { ...r, status: r.status === 'active' ? 'paused' : 'active' }
                            : r
                        ));
                      }}
                    >
                      {task.status === 'active' ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setScheduledReports(scheduledReports.filter(r => r.id !== task.id));
                      }}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list" className="mt-6 space-y-4">
          {viewMode === 'card' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredReports.map((report) => (
                <Card key={report.id} className="border-0 shadow-sm hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{report.type === 'daily' ? '日报' : report.type === 'weekly' ? '周报' : report.type === 'monthly' ? '月报' : '自定义'}</Badge>
                          <Badge variant={report.status === 'completed' ? 'default' : 'secondary'}>
                            {report.status === 'completed' ? '已完成' : '草稿'}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{report.title}</CardTitle>
                        <CardDescription className="mt-1 flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          {report.createdAt}
                          <span>•</span>
                          {report.industry}
                        </CardDescription>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600 line-clamp-2">{report.summary}</p>

                    <Separator />

                    <div>
                      <p className="text-xs text-gray-500 mb-2">重点关注企业</p>
                      <div className="flex flex-wrap gap-2">
                        {report.companies.map((company, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {company}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">市场规模</span>
                        <span className="font-medium text-gray-900">{report.keyData.marketSize}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-gray-600">增长率</span>
                        <span className="font-medium text-green-600">{report.keyData.growthRate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Activity className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">融资事件</span>
                        <span className="font-medium text-gray-900">{report.keyData.fundingCount}起</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Target className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">平均估值</span>
                        <span className="font-medium text-gray-900">{report.keyData.avgValuation}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-0 shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">简报标题</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">类型</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">行业</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">创建日期</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">企业数量</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">市场规模</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">增长率</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">状态</th>
                      <th className="text-right px-4 py-3 text-sm font-medium text-gray-600">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReports.map((report) => (
                      <tr key={report.id} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-900">{report.title}</div>
                          <div className="text-xs text-gray-500 mt-1 line-clamp-1">{report.summary}</div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="outline">{report.type === 'daily' ? '日报' : report.type === 'weekly' ? '周报' : report.type === 'monthly' ? '月报' : '自定义'}</Badge>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{report.industry}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{report.createdAt}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{report.companies.length}家</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{report.keyData.marketSize}</td>
                        <td className="px-4 py-3">
                          <span className="text-sm text-green-600 font-medium">{report.keyData.growthRate}</span>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant={report.status === 'completed' ? 'default' : 'secondary'}>
                            {report.status === 'completed' ? '已完成' : '草稿'}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </TabsContent>


      </Tabs>
    </div>
  );
}
