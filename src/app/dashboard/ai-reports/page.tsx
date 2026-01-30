'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import {
  FileText,
  Plus,
  Play,
  Trash2,
  Edit,
  Clock,
  Download,
  CheckCircle2,
  AlertCircle,
  Database,
  TrendingUp,
  Settings,
  Sparkles,
  Target,
  Weight,
  Copy,
  Save
} from 'lucide-react';

interface ReportTemplate {
  id: string;
  name: string;
  type: 'project' | 'industry';
  description: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  usageCount: number;
}

interface ScoreModel {
  id: string;
  name: string;
  description: string;
  dimensions: {
    id: string;
    name: string;
    weight: number;
    prompt: string;
  }[];
  createdAt: string;
  updatedAt: string;
  usageCount: number;
}

interface GeneratedReport {
  id: string;
  title: string;
  type: 'project' | 'industry';
  projectName?: string;
  industry?: string;
  status: 'generating' | 'completed' | 'failed';
  createdAt: string;
  completedAt?: string;
  progress?: number;
}

const mockTemplates: ReportTemplate[] = [
  {
    id: '1',
    name: '项目概要报告模版',
    type: 'project',
    description: '用于快速生成投资项目的基本概要信息',
    content: `# 项目概要报告

## 项目基本信息
- 项目名称：{{projectName}}
- 所属行业：{{industry}}
- 投资阶段：{{stage}}

## 项目亮点
- 核心优势1
- 核心优势2
- 核心优势3

## 风险提示
- 主要风险1
- 主要风险2

## 投资建议
[根据以上分析给出建议]`,
    createdAt: '2024-01-15 10:00',
    updatedAt: '2024-01-20 14:30',
    usageCount: 45,
  },
  {
    id: '2',
    name: '行业研究报告模版',
    type: 'industry',
    description: '用于生成行业深度研究报告',
    content: `# {{industry}}行业研究报告

## 行业概况
- 行业定义与分类
- 市场规模与发展历程
- 产业链分析

## 市场分析
- 市场规模与增长趋势
- 竞争格局分析
- 主要参与者

## 发展趋势
- 技术发展趋势
- 政策环境分析
- 未来展望

## 投资机会
[基于市场分析的投资机会]`,
    createdAt: '2024-01-10 09:00',
    updatedAt: '2024-01-18 16:00',
    usageCount: 32,
  },
];

const mockScoreModels: ScoreModel[] = [
  {
    id: '1',
    name: 'A轮项目评分模型',
    description: '适用于A轮融资项目的综合评估',
    dimensions: [
      { id: '1', name: '市场规模', weight: 25, prompt: '评估目标市场规模、增长率及市场潜力' },
      { id: '2', name: '团队背景', weight: 30, prompt: '评估核心团队经验、能力和执行力' },
      { id: '3', name: '技术壁垒', weight: 20, prompt: '评估技术优势、专利情况和技术壁垒' },
      { id: '4', name: '商业模式', weight: 15, prompt: '评估商业模式可持续性和盈利能力' },
      { id: '5', name: '竞品分析', weight: 10, prompt: '评估竞争态势和差异化优势' },
    ],
    createdAt: '2024-01-12 10:00',
    updatedAt: '2024-01-22 11:30',
    usageCount: 28,
  },
  {
    id: '2',
    name: 'B轮项目评分模型',
    description: '适用于B轮融资项目的成熟度评估',
    dimensions: [
      { id: '1', name: '营收增长', weight: 30, prompt: '评估营收增长率、客户留存和扩张能力' },
      { id: '2', name: '市场份额', weight: 25, prompt: '评估市场占有率和竞争地位' },
      { id: '3', name: '运营效率', weight: 20, prompt: '评估成本控制、运营效率和利润率' },
      { id: '4', name: '团队扩展', weight: 15, prompt: '评估团队建设能力和组织架构' },
      { id: '5', name: '财务健康', weight: 10, prompt: '评估现金流、负债情况和融资需求' },
    ],
    createdAt: '2024-01-14 14:00',
    updatedAt: '2024-01-21 09:00',
    usageCount: 15,
  },
];

// 知识库接口
interface KnowledgeBase {
  id: string;
  name: string;
  type: 'private' | 'public';
  category: string;
  description: string;
  documentCount: number;
  updatedAt: string;
}

const mockKnowledgeBases: KnowledgeBase[] = [
  {
    id: '1',
    name: 'AI行业研究知识库',
    type: 'private',
    category: '行业研究',
    description: '包含人工智能行业的研究报告、行业分析等内容',
    documentCount: 156,
    updatedAt: '2024-01-22',
  },
  {
    id: '2',
    name: '已投项目档案',
    type: 'private',
    category: '投资档案',
    description: '包含所有已投项目的尽调报告、投资协议等',
    documentCount: 89,
    updatedAt: '2024-01-21',
  },
  {
    id: '3',
    name: '政策法规知识库',
    type: 'public',
    category: '政策法规',
    description: '包含国家及地方相关政策法规文件',
    documentCount: 234,
    updatedAt: '2024-01-20',
  },
  {
    id: '4',
    name: '竞品分析库',
    type: 'private',
    category: '市场研究',
    description: '包含主要竞争对手的产品分析、市场表现等',
    documentCount: 67,
    updatedAt: '2024-01-19',
  },
  {
    id: '5',
    name: '融资案例库',
    type: 'private',
    category: '投资案例',
    description: '包含过往融资项目的案例分析',
    documentCount: 123,
    updatedAt: '2024-01-18',
  },
];

const mockReports: GeneratedReport[] = [
  {
    id: '1',
    title: '智谱华章项目概要报告',
    type: 'project',
    projectName: '智谱华章',
    status: 'completed',
    createdAt: '2024-01-20 10:00',
    completedAt: '2024-01-20 10:05',
  },
  {
    id: '2',
    title: '人工智能行业研究报告',
    type: 'industry',
    industry: '人工智能',
    status: 'completed',
    createdAt: '2024-01-19 14:00',
    completedAt: '2024-01-19 14:08',
  },
];

export default function AIReportsPage() {
  const [activeTab, setActiveTab] = useState('generate');
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [isScoreDialogOpen, setIsScoreDialogOpen] = useState(false);
  const [reportType, setReportType] = useState<'project' | 'industry'>('project');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [selectedKnowledgeBases, setSelectedKnowledgeBases] = useState<string[]>([]);
  const [reports, setReports] = useState<GeneratedReport[]>(mockReports);
  const [templates, setTemplates] = useState<ReportTemplate[]>(mockTemplates);
  const [scoreModels, setScoreModels] = useState<ScoreModel[]>(mockScoreModels);

  return (
    <>
      {/* Dialogs */}
      <Dialog open={isGenerateDialogOpen} onOpenChange={setIsGenerateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>生成项目报告</DialogTitle>
            <DialogDescription>配置报告生成参数，调用文档生成智能体自动生成报告</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="reportType">报告类型</Label>
              <Select value={reportType} onValueChange={(value: 'project' | 'industry') => setReportType(value)}>
                <SelectTrigger id="reportType">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="project">项目概要报告</SelectItem>
                  <SelectItem value="industry">行业研究报告</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {reportType === 'project' && (
              <div className="space-y-2">
                <Label htmlFor="projectName">项目名称</Label>
                <Input id="projectName" placeholder="输入项目名称" />
              </div>
            )}

            {reportType === 'industry' && (
              <div className="space-y-2">
                <Label htmlFor="industry">行业名称</Label>
                <Input id="industry" placeholder="输入行业名称" />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="template">选择模版</Label>
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger id="template">
                  <SelectValue placeholder="选择报告模版" />
                </SelectTrigger>
                <SelectContent>
                  {templates
                    .filter(t => t.type === reportType)
                    .map(template => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="scoreModel">选择评分模型（可选）</Label>
              <Select value="" onValueChange={() => {}}>
                <SelectTrigger id="scoreModel">
                  <SelectValue placeholder="选择评分模型" />
                </SelectTrigger>
                <SelectContent>
                  {scoreModels.map(model => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="knowledgeBases">选择知识库（可选）</Label>
              <div className="border rounded-lg p-3 space-y-2 max-h-80 overflow-y-auto">
                {mockKnowledgeBases.map(kb => (
                  <label key={kb.id} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedKnowledgeBases.includes(kb.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedKnowledgeBases([...selectedKnowledgeBases, kb.id]);
                        } else {
                          setSelectedKnowledgeBases(selectedKnowledgeBases.filter(id => id !== kb.id));
                        }
                      }}
                      className="mt-0.5"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{kb.name}</span>
                        <Badge variant="outline" className="text-xs">{kb.category}</Badge>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{kb.description}</p>
                      <p className="text-xs text-gray-400 mt-1">{kb.documentCount} 个文档 • 更新于 {kb.updatedAt}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsGenerateDialogOpen(false)}>
                取消
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                <Sparkles className="w-4 h-4 mr-2" />
                开始生成
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>创建报告模版</DialogTitle>
            <DialogDescription>创建自定义报告模版，支持变量占位符</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="templateName">模版名称</Label>
                <Input id="templateName" placeholder="例如：项目概要报告模版" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="templateType">模版类型</Label>
                <Select>
                  <SelectTrigger id="templateType">
                    <SelectValue placeholder="选择类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="project">项目概要模版</SelectItem>
                    <SelectItem value="industry">行业研究报告模版</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="templateDesc">模版描述</Label>
              <Input id="templateDesc" placeholder="描述该模版的用途" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="templateContent">模版内容</Label>
              <Textarea
                id="templateContent"
                placeholder="输入模版内容，支持变量占位符，如：{{projectName}}、{{industry}}等"
                rows={12}
                className="font-mono text-sm"
              />
              <p className="text-xs text-gray-500">提示：使用 {'{{变量名}}'} 作为变量占位符</p>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsTemplateDialogOpen(false)}>
                取消
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                <Save className="w-4 h-4 mr-2" />
                保存模版
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isScoreDialogOpen} onOpenChange={setIsScoreDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>创建评分模型</DialogTitle>
            <DialogDescription>配置项目评分维度和权重，生成评分提示词</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="modelName">模型名称</Label>
                <Input id="modelName" placeholder="例如：A轮项目评分模型" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="modelDesc">模型描述</Label>
              <Input id="modelDesc" placeholder="描述该模型的适用场景" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>评分维度</Label>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  添加维度
                </Button>
              </div>

              {[
                { name: '维度1', weight: 20 },
                { name: '维度2', weight: 30 },
                { name: '维度3', weight: 25 },
                { name: '维度4', weight: 25 },
              ].map((dimension, index) => (
                <Card key={index} className="border">
                  <CardContent className="p-4 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <Label htmlFor={`dimension-${index}`}>维度名称</Label>
                        <Input id={`dimension-${index}`} defaultValue={dimension.name} />
                      </div>
                      <div className="w-32">
                        <Label htmlFor={`weight-${index}`}>权重</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id={`weight-${index}`}
                            type="number"
                            defaultValue={dimension.weight}
                            className="w-16"
                          />
                          <span className="text-sm text-gray-500">%</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor={`prompt-${index}`}>评分提示词</Label>
                      <Textarea
                        id={`prompt-${index}`}
                        placeholder="输入该维度的评分标准和提示词"
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-900">AI辅助生成</span>
              </div>
              <p className="text-sm text-blue-800">
                点击下方按钮，使用大语言模型智能生成评分提示词
              </p>
              <Button
                variant="outline"
                className="mt-3 border-blue-300 text-blue-700 hover:bg-blue-100"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                AI生成提示词
              </Button>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsScoreDialogOpen(false)}>
                取消
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                <Save className="w-4 h-4 mr-2" />
                保存模型
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 页面内容 */}
      <div className="p-4 lg:p-6 space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">AI 项目报告</h1>
        <p className="text-gray-500 mt-1">
          智能生成项目报告、行业研究报告，支持自定义模版和评分模型
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">已生成报告</p>
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
                <p className="text-sm font-medium text-gray-500">报告模版</p>
                <p className="text-3xl font-bold text-gray-900">{templates.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                <Settings className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">评分模型</p>
                <p className="text-3xl font-bold text-gray-900">{scoreModels.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">模版使用</p>
                <p className="text-3xl font-bold text-gray-900">
                  {templates.reduce((sum, t) => sum + t.usageCount, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 主要内容 */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="generate">报告生成</TabsTrigger>
          <TabsTrigger value="templates">模版管理</TabsTrigger>
          <TabsTrigger value="score-models">评分卡管理</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">报告生成</h2>
              <p className="text-sm text-gray-500 mt-1">调用文档生成智能体自动生成项目报告、行业研究报告</p>
            </div>
            <Button
              onClick={() => setIsGenerateDialogOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              一键生成报告
            </Button>
          </div>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>已生成报告</CardTitle>
              <CardDescription>查看和下载已生成的报告</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reports.map((report) => (
                  <div key={report.id} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900">{report.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {report.type === 'project' ? '项目报告' : '行业报告'}
                        </Badge>
                        <Badge
                          variant={report.status === 'completed' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {report.status === 'completed' ? '已完成' : report.status === 'generating' ? '生成中' : '失败'}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {report.completedAt
                          ? `完成于 ${report.completedAt}`
                          : `创建于 ${report.createdAt}`}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        下载
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">模版管理</h2>
              <p className="text-sm text-gray-500 mt-1">管理项目概要模版、行业研究报告模版</p>
            </div>
            <Button
              onClick={() => setIsTemplateDialogOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              创建模版
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((template) => (
              <Card key={template.id} className="border-0 shadow-sm">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">
                          {template.type === 'project' ? '项目概要' : '行业研究'}
                        </Badge>
                        <Badge variant="secondary" className="gap-1">
                          <Clock className="w-3 h-3" />
                          使用 {template.usageCount} 次
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="mt-2">{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-3 font-mono text-xs text-gray-600">
                      {template.content.substring(0, 150)}...
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>更新于 {template.updatedAt}</span>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4 mr-1" />
                          编辑
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Copy className="w-4 h-4 mr-1" />
                          复制
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="score-models" className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">评分卡管理</h2>
              <p className="text-sm text-gray-500 mt-1">自定义评分模型，配置维度权重和评分提示词</p>
            </div>
            <Button
              onClick={() => setIsScoreDialogOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              创建评分模型
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scoreModels.map((model) => (
              <Card key={model.id} className="border-0 shadow-sm">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{model.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className="gap-1">
                          <Target className="w-3 h-3" />
                          {model.dimensions.length} 个维度
                        </Badge>
                        <Badge variant="outline" className="gap-1">
                          <Clock className="w-3 h-3" />
                          使用 {model.usageCount} 次
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="mt-2">{model.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {model.dimensions.map((dimension) => (
                      <div key={dimension.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{dimension.name}</span>
                          <Badge variant="outline" className="gap-1">
                            <Weight className="w-3 h-3" />
                            {dimension.weight}%
                          </Badge>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 rounded-full"
                            style={{ width: `${dimension.weight}%` }}
                          />
                        </div>
                      </div>
                    ))}
                    <Separator />
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>更新于 {model.updatedAt}</span>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4 mr-1" />
                          编辑
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Copy className="w-4 h-4 mr-1" />
                          复制
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
    </>
  );
}
