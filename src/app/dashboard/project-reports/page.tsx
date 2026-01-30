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
  FileText,
  Plus,
  Download,
  Eye,
  Trash2,
  Edit,
  Calendar,
  TrendingUp,
  Clock,
  Filter,
  Search,
  Sparkles,
  BarChart3,
  Target,
  Users,
  DollarSign,
  Building2,
  File,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

interface ProjectReport {
  id: string;
  title: string;
  type: 'investment' | 'research' | 'due_diligence' | 'annual';
  projectName: string;
  companyName: string;
  createdAt: string;
  createdBy: string;
  status: 'draft' | 'completed';
  progress: number;
  template: string;
}

const mockReports: ProjectReport[] = [
  {
    id: '1',
    title: '智谱华章A轮融资尽调报告',
    type: 'due_diligence',
    projectName: '智谱华章A轮融资项目',
    companyName: '智谱华章科技有限公司',
    createdAt: '2024-01-22',
    createdBy: '张三',
    status: 'completed',
    progress: 100,
    template: '标准尽调模板',
  },
  {
    id: '2',
    title: '2024年人工智能行业研究报告',
    type: 'research',
    projectName: 'AI行业分析',
    companyName: '-',
    createdAt: '2024-01-20',
    createdBy: '李四',
    status: 'completed',
    progress: 100,
    template: '行业研究模板',
  },
  {
    id: '3',
    title: '商汤科技投资价值分析报告',
    type: 'investment',
    projectName: '商汤科技Pre-IPO轮投资',
    companyName: '商汤科技股份有限公司',
    createdAt: '2024-01-18',
    createdBy: '王五',
    status: 'draft',
    progress: 65,
    template: '投资价值分析模板',
  },
];

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      {children}
    </label>
  );
}

export default function ProjectReportsPage() {
  const [reports, setReports] = useState<ProjectReport[]>(mockReports);
  const [activeTab, setActiveTab] = useState('reports');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const reportTypeMap = {
    investment: { label: '投资分析', icon: TrendingUp, color: 'bg-blue-50 text-blue-600' },
    research: { label: '行业研究', icon: BarChart3, color: 'bg-green-50 text-green-600' },
    due_diligence: { label: '业务尽调', icon: Search, color: 'bg-purple-50 text-purple-600' },
    annual: { label: '年度报告', icon: Calendar, color: 'bg-orange-50 text-orange-600' },
  };

  const filteredReports = reports.filter(report =>
    report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* 创建报告 Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>创建AI项目报告</DialogTitle>
            <DialogDescription>基于AI智能体自动生成项目报告</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="reportTitle">报告标题</Label>
              <Input id="reportTitle" placeholder="输入报告标题" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reportType">报告类型</Label>
                <Select>
                  <SelectTrigger id="reportType">
                    <SelectValue placeholder="选择类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="investment">投资分析</SelectItem>
                    <SelectItem value="research">行业研究</SelectItem>
                    <SelectItem value="due_diligence">业务尽调</SelectItem>
                    <SelectItem value="annual">年度报告</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="template">报告模板</Label>
                <Select>
                  <SelectTrigger id="template">
                    <SelectValue placeholder="选择模板" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">标准模板</SelectItem>
                    <SelectItem value="investment">投资分析模板</SelectItem>
                    <SelectItem value="due_diligence">尽调模板</SelectItem>
                    <SelectItem value="industry">行业研究模板</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="projectName">项目名称</Label>
                <Input id="projectName" placeholder="输入项目名称" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyName">企业名称</Label>
                <Input id="companyName" placeholder="输入企业名称" />
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
              <Sparkles className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <p className="text-sm text-blue-700">AI智能体将自动从知识库中提取相关数据，生成完整的报告内容</p>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                取消
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                <Sparkles className="w-4 h-4 mr-2" />
                生成报告
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">AI 项目报告</h1>
          <p className="text-gray-500 mt-1">
            基于AI智能体自动生成项目报告、行业研究报告，支持自定义模版和评分模型
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            刷新
          </Button>
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            创建报告
          </Button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">报告总数</p>
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
                <p className="text-sm font-medium text-gray-500">已完成</p>
                <p className="text-3xl font-bold text-green-600">
                  {reports.filter(r => r.status === 'completed').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">草稿</p>
                <p className="text-3xl font-bold text-orange-600">
                  {reports.filter(r => r.status === 'draft').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                <File className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">本月新增</p>
                <p className="text-3xl font-bold text-purple-600">3</p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 主要内容 */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="reports">报告列表</TabsTrigger>
            <TabsTrigger value="templates">报告模板</TabsTrigger>
            <TabsTrigger value="history">生成历史</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="搜索报告..."
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

        <TabsContent value="reports" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredReports.map((report) => {
              const typeInfo = reportTypeMap[report.type];
              return (
                <Card key={report.id} className="border-0 shadow-sm hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className={typeInfo.color}>
                            <typeInfo.icon className="w-3 h-3 mr-1" />
                            {typeInfo.label}
                          </Badge>
                          <Badge variant={report.status === 'completed' ? 'default' : 'secondary'}>
                            {report.status === 'completed' ? '已完成' : '草稿'}
                          </Badge>
                        </div>
                        <CardTitle className="text-base">{report.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {report.projectName}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {report.status === 'draft' && report.progress < 100 && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500">生成进度</span>
                          <span className="text-blue-600 font-medium">{report.progress}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all"
                            style={{ width: `${report.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-gray-500">企业</p>
                        <p className="font-medium truncate">{report.companyName}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">创建人</p>
                        <p className="font-medium">{report.createdBy}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-gray-500">创建时间</p>
                        <p className="font-medium">{report.createdAt}</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="w-4 h-4 mr-1" />
                        查看
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Edit className="w-4 h-4" />
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
        </TabsContent>

        <TabsContent value="templates" className="mt-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>报告模板管理</CardTitle>
                  <CardDescription>管理和自定义报告生成模板</CardDescription>
                </div>
                <Button variant="outline" className="gap-2">
                  <Plus className="w-4 h-4" />
                  新建模板
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-6 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">标准模板</p>
                      <p className="text-xs text-gray-500">适用于通用场景</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    包含项目概况、投资分析、风险评估等标准章节
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">编辑</Button>
                    <Button variant="outline" size="sm">预览</Button>
                  </div>
                </div>

                <div className="p-6 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">投资分析模板</p>
                      <p className="text-xs text-gray-500">专注于投资决策</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    包含投资逻辑、估值分析、退出方案等投资相关内容
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">编辑</Button>
                    <Button variant="outline" size="sm">预览</Button>
                  </div>
                </div>

                <div className="p-6 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                      <Search className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">尽调模板</p>
                      <p className="text-xs text-gray-500">用于业务尽调</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    包含工商信息、财务分析、法律风险等尽调内容
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">编辑</Button>
                    <Button variant="outline" size="sm">预览</Button>
                  </div>
                </div>

                <div className="p-6 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium">行业研究模板</p>
                      <p className="text-xs text-gray-500">用于行业分析</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    包含市场规模、竞争格局、发展趋势等行业分析内容
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">编辑</Button>
                    <Button variant="outline" size="sm">预览</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>生成历史</CardTitle>
              <CardDescription>查看AI报告生成历史记录</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredReports.map((report) => (
                  <div key={report.id} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">{report.title}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            {report.companyName} • {report.type}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={report.status === 'completed' ? 'default' : 'secondary'}>
                            {report.status === 'completed' ? '已完成' : '草稿'}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                        <span>创建人: {report.createdBy}</span>
                        <span>创建时间: {report.createdAt}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
