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
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Database,
  Upload,
  FileText,
  Folder,
  Globe,
  Building2,
  Sparkles,
  Search,
  Plus,
  Trash2,
  Edit,
  Eye,
  Filter,
  RefreshCw,
  Download,
  ChevronRight,
  ChevronDown,
  Tag,
  Clock,
  File,
  FileSpreadsheet,
  FileCode,
  FileJson,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Activity,
  BarChart3,
  Zap,
  Target,
  Users,
  TrendingUp,
  MapPin,
  Calendar,
  Award,
  Briefcase,
  FolderOpen,
  FolderTree,
  Link,
  ArrowRight,
  MoreVertical,
  Settings,
  Play,
  Pause,
  AlertTriangle,
  MessageSquare
} from 'lucide-react';

// 文档类型接口
interface Document {
  id: string;
  name: string;
  type: 'investment_intent' | 'project_report' | 'due_diligence' | 'investment_advice' | 'research_report';
  fileName: string;
  fileSize: string;
  uploadTime: string;
  status: 'uploading' | 'vectorizing' | 'completed' | 'failed';
  uploader: string;
  tags: Tag[];
  vectorProgress: number;
  aiAnalysis?: string;
}

// 标签接口
interface Tag {
  id: string;
  category: 'region' | 'industry' | 'company' | 'funding_stage' | 'year' | 'patent' | 'custom';
  name: string;
  value: string;
}

// 向量化任务接口
interface VectorTask {
  id: string;
  documentId: string;
  documentName: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  chunks: number;
  vectorCount: number;
  startTime: string;
  endTime?: string;
}

// 公网知识库接口
interface PublicKnowledge {
  id: string;
  source: 'research' | 'wechat' | 'policy' | 'sentiment';
  sourceName: string;
  title: string;
  description: string;
  itemCount: number;
  updateTime: string;
  status: 'active' | 'inactive' | 'updating';
}

// 工商数据接口
interface BusinessData {
  id: string;
  companyName: string;
  creditCode: string;
  legalPerson: string;
  registeredCapital: string;
  establishDate: string;
  status: string;
  industry: string;
  region: string;
  updateTime: string;
}

// 文件接口
interface ProjectFile {
  id: string;
  name: string;
  fileName: string;
  fileSize: string;
  uploadTime: string;
  uploader: string;
}

// 已投项目档案接口
interface Project {
  id: string;
  projectName: string;
  companyName: string;
  investmentAmount: string;
  investmentDate: string;
  equityRatio: string;
  fundingStage: string;
  industry: string;
  region: string;
  status: 'invested' | 'exited' | 'monitoring';
  documents: number;
  files: ProjectFile[];
  tags: string[];
  description: string;
}

// 模拟数据
const mockDocuments: Document[] = [
  {
    id: '1',
    name: '智谱华章投资意向书',
    type: 'investment_intent',
    fileName: '智谱华章投资意向书.pdf',
    fileSize: '15.2MB',
    uploadTime: '2024-01-22 10:30',
    status: 'completed',
    uploader: '张三',
    tags: [
      { id: '1', category: 'company', name: '企业', value: '智谱华章' },
      { id: '2', category: 'industry', name: '行业', value: '人工智能' },
      { id: '3', category: 'funding_stage', name: '融资阶段', value: 'C轮' },
      { id: '4', category: 'region', name: '地域', value: '北京' },
    ],
    vectorProgress: 100,
    aiAnalysis: '该投资意向书详细阐述了投资智谱华章的战略意图、投资金额、股权分配等关键信息，建议重点关注估值模型和退出机制条款。',
  },
  {
    id: '2',
    name: '商汤科技立项报告书',
    type: 'project_report',
    fileName: '商汤科技立项报告书.docx',
    fileSize: '8.5MB',
    uploadTime: '2024-01-21 14:20',
    status: 'completed',
    uploader: '李四',
    tags: [
      { id: '5', category: 'company', name: '企业', value: '商汤科技' },
      { id: '6', category: 'industry', name: '行业', value: '人工智能' },
      { id: '7', category: 'year', name: '年份', value: '2024' },
    ],
    vectorProgress: 100,
  },
  {
    id: '3',
    name: '旷视科技业务尽调报告',
    type: 'due_diligence',
    fileName: '旷视科技业务尽调报告.pdf',
    fileSize: '25.3MB',
    uploadTime: '2024-01-20 09:15',
    status: 'vectorizing',
    uploader: '王五',
    tags: [
      { id: '8', category: 'company', name: '企业', value: '旷视科技' },
      { id: '9', category: 'industry', name: '行业', value: '人工智能' },
      { id: '10', category: 'patent', name: '专利技术', value: '计算机视觉' },
    ],
    vectorProgress: 65,
  },
];

const mockVectorTasks: VectorTask[] = [
  {
    id: '1',
    documentId: '3',
    documentName: '旷视科技业务尽调报告',
    status: 'processing',
    progress: 65,
    chunks: 128,
    vectorCount: 83,
    startTime: '2024-01-20 09:20',
  },
  {
    id: '2',
    documentId: '1',
    documentName: '智谱华章投资意向书',
    status: 'completed',
    progress: 100,
    chunks: 56,
    vectorCount: 56,
    startTime: '2024-01-22 10:31',
    endTime: '2024-01-22 10:35',
  },
];

const mockPublicKnowledge: PublicKnowledge[] = [
  {
    id: '1',
    source: 'research',
    sourceName: '投研信息采集智能体',
    title: '行业研究报告库',
    description: '收集各行业研究报告、市场分析、竞争格局分析等',
    itemCount: 3456,
    updateTime: '2024-01-22 10:00',
    status: 'active',
  },
  {
    id: '2',
    source: 'wechat',
    sourceName: '公众号文章采集智能体',
    title: '公众号文章库',
    description: '采集行业相关公众号文章，获取行业动态和观点',
    itemCount: 12580,
    updateTime: '2024-01-22 11:30',
    status: 'active',
  },
  {
    id: '3',
    source: 'policy',
    sourceName: '政策法规查询智能体',
    title: '政策法规库',
    description: '国家及地方政策法规、行业监管规定等',
    itemCount: 856,
    updateTime: '2024-01-22 09:00',
    status: 'active',
  },
  {
    id: '4',
    source: 'sentiment',
    sourceName: '互联网舆情监测智能体',
    title: '舆情信息库',
    description: '互联网舆情信息、媒体报道、社交媒体数据等',
    itemCount: 23456,
    updateTime: '2024-01-22 12:00',
    status: 'updating',
  },
];

const mockBusinessData: BusinessData[] = [
  {
    id: '1',
    companyName: '智谱华章科技有限公司',
    creditCode: '91110108MA01KX3X1Y',
    legalPerson: '唐杰',
    registeredCapital: '5000万人民币',
    establishDate: '2019-04-15',
    status: '开业',
    industry: '软件和信息技术服务业',
    region: '北京市海淀区',
    updateTime: '2024-01-20',
  },
  {
    id: '2',
    companyName: '商汤科技股份有限公司',
    creditCode: '91310000MA1FL5HA4D',
    legalPerson: '徐立',
    registeredCapital: '350000万人民币',
    establishDate: '2014-11-20',
    status: '开业',
    industry: '软件和信息技术服务业',
    region: '上海市浦东新区',
    updateTime: '2024-01-18',
  },
];

const mockProjects: Project[] = [
  {
    id: '1',
    projectName: '智谱华章A轮融资项目',
    companyName: '智谱华章科技有限公司',
    investmentAmount: '2.5亿元',
    investmentDate: '2023-06-15',
    equityRatio: '15%',
    fundingStage: 'A轮',
    industry: '人工智能',
    region: '北京',
    status: 'invested',
    documents: 28,
    files: [
      {
        id: 'f1',
        name: '智谱华章商业计划书',
        fileName: '智谱华章商业计划书.pdf',
        fileSize: '10.5MB',
        uploadTime: '2023-06-10',
        uploader: '张三',
      },
      {
        id: 'f2',
        name: '智谱华章技术架构文档',
        fileName: '智谱华章技术架构文档.docx',
        fileSize: '5.2MB',
        uploadTime: '2023-06-12',
        uploader: '李四',
      },
      {
        id: 'f3',
        name: '智谱华章尽调报告',
        fileName: '智谱华章尽调报告.pdf',
        fileSize: '15.8MB',
        uploadTime: '2023-06-14',
        uploader: '王五',
      },
    ],
    tags: ['大模型', 'NLP', '企业服务'],
    description: '智谱华章是国内领先的大语言模型研发企业，拥有GLM系列模型技术，在自然语言处理领域具有核心技术优势。',
  },
  {
    id: '2',
    projectName: '商汤科技Pre-IPO轮投资项目',
    companyName: '商汤科技股份有限公司',
    investmentAmount: '5亿元',
    investmentDate: '2021-11-20',
    equityRatio: '8%',
    fundingStage: 'Pre-IPO',
    industry: '人工智能',
    region: '上海',
    status: 'invested',
    documents: 45,
    files: [
      {
        id: 'f4',
        name: '商汤科技投资意向书',
        fileName: '商汤科技投资意向书.pdf',
        fileSize: '8.3MB',
        uploadTime: '2021-10-05',
        uploader: '赵六',
      },
      {
        id: 'f5',
        name: '商汤科技财务报表',
        fileName: '商汤科技财务报表.xlsx',
        fileSize: '3.7MB',
        uploadTime: '2021-10-15',
        uploader: '孙七',
      },
    ],
    tags: ['计算机视觉', 'AI芯片', '智慧城市'],
    description: '商汤科技是人工智能算法领域的领军企业，在计算机视觉、深度学习平台等领域拥有丰富技术积累和商业化经验。',
  },
];

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      {children}
    </label>
  );
}

export default function KnowledgePage() {
  const [activeTab, setActiveTab] = useState('management');
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [isTagDialogOpen, setIsTagDialogOpen] = useState(false);
  const [isProjectFileDialogOpen, setIsProjectFileDialogOpen] = useState(false);
  const [isProjectFilesDialogOpen, setIsProjectFilesDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFolder, setExpandedFolder] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>(mockProjects);

  // 文档类型映射
  const documentTypeMap = {
    investment_intent: { label: '投资意向书', icon: Briefcase, color: 'bg-blue-50 text-blue-600' },
    project_report: { label: '立项报告书', icon: FileText, color: 'bg-green-50 text-green-600' },
    due_diligence: { label: '业务尽调报告', icon: Search, color: 'bg-purple-50 text-purple-600' },
    investment_advice: { label: '投资建议书', icon: TrendingUp, color: 'bg-orange-50 text-orange-600' },
    research_report: { label: '投研分析报告', icon: BarChart3, color: 'bg-red-50 text-red-600' },
  };

  // 标签分类映射
  const tagCategoryMap = {
    region: { label: '地域', icon: MapPin, color: 'bg-blue-100 text-blue-700' },
    industry: { label: '行业', icon: Target, color: 'bg-green-100 text-green-700' },
    company: { label: '企业', icon: Building2, color: 'bg-purple-100 text-purple-700' },
    funding_stage: { label: '融资阶段', icon: TrendingUp, color: 'bg-orange-100 text-orange-700' },
    year: { label: '年份', icon: Calendar, color: 'bg-red-100 text-red-700' },
    patent: { label: '专利技术', icon: Award, color: 'bg-cyan-100 text-cyan-700' },
    custom: { label: '自定义', icon: Tag, color: 'bg-gray-100 text-gray-700' },
  };

  // 公网知识库映射
  const publicKnowledgeMap = {
    research: { label: '投研信息采集', icon: Search, color: 'bg-blue-50 text-blue-600' },
    wechat: { label: '公众号文章采集', icon: Globe, color: 'bg-green-50 text-green-600' },
    policy: { label: '政策法规查询', icon: FileText, color: 'bg-purple-50 text-purple-600' },
    sentiment: { label: '互联网舆情监测', icon: Activity, color: 'bg-orange-50 text-orange-600' },
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* 上传文档 Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>上传投研文档</DialogTitle>
            <DialogDescription>上传投资意向书、立项报告书、业务尽调报告、投资建议书、投研分析报告等文档</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-sm text-gray-600 mb-2">拖拽文件到此处，或点击选择文件</p>
              <p className="text-xs text-gray-400">支持 PDF、Word、Excel、JSON 等格式，单个文件不超过 100MB</p>
              <Input type="file" className="hidden" multiple />
            </div>

            <div className="space-y-2">
              <Label htmlFor="docType">文档类型</Label>
              <Select>
                <SelectTrigger id="docType">
                  <SelectValue placeholder="选择文档类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="investment_intent">投资意向书</SelectItem>
                  <SelectItem value="project_report">立项报告书</SelectItem>
                  <SelectItem value="due_diligence">业务尽调报告</SelectItem>
                  <SelectItem value="investment_advice">投资建议书</SelectItem>
                  <SelectItem value="research_report">投研分析报告</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
              <Sparkles className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <p className="text-sm text-blue-700">上传后系统将自动进行数据清洗、切片与向量化处理，并提取知识标签</p>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                取消
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                <Upload className="w-4 h-4 mr-2" />
                开始上传
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 已投项目档案 Dialog */}
      <Dialog open={isProjectDialogOpen} onOpenChange={setIsProjectDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>新增已投项目档案</DialogTitle>
            <DialogDescription>记录已投项目的详细业务信息，形成结构化数据</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="investmentAmount">投资金额</Label>
                <Input id="investmentAmount" placeholder="输入投资金额" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="equityRatio">股权比例</Label>
                <Input id="equityRatio" placeholder="输入股权比例" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="investmentDate">投资日期</Label>
                <Input id="investmentDate" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fundingStage">融资阶段</Label>
                <Select>
                  <SelectTrigger id="fundingStage">
                    <SelectValue placeholder="选择融资阶段" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seed">种子轮</SelectItem>
                    <SelectItem value="angel">天使轮</SelectItem>
                    <SelectItem value="preA">Pre-A轮</SelectItem>
                    <SelectItem value="A">A轮</SelectItem>
                    <SelectItem value="B">B轮</SelectItem>
                    <SelectItem value="C">C轮</SelectItem>
                    <SelectItem value="preIPO">Pre-IPO</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">项目描述</Label>
              <Input id="description" placeholder="输入项目描述" />
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsProjectDialogOpen(false)}>
                取消
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                <Plus className="w-4 h-4 mr-2" />
                创建档案
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 标签管理 Dialog */}
      <Dialog open={isTagDialogOpen} onOpenChange={setIsTagDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>知识标签管理</DialogTitle>
            <DialogDescription>管理AI自动提取的标签，支持手动修改</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedDocument && selectedDocument.tags.map((tag) => {
              const categoryInfo = tagCategoryMap[tag.category];
              return (
                <div key={tag.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  <categoryInfo.icon className="w-4 h-4 text-gray-500" />
                  <span className="text-xs text-gray-500">{categoryInfo.label}:</span>
                  <Input defaultValue={tag.value} className="flex-1 h-8" />
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              );
            })}
            <Button variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              添加自定义标签
            </Button>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsTagDialogOpen(false)}>
                取消
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                <Save className="w-4 h-4 mr-2" />
                保存修改
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 项目文件上传 Dialog */}
      <Dialog open={isProjectFileDialogOpen} onOpenChange={setIsProjectFileDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>上传项目文件</DialogTitle>
            <DialogDescription>为项目上传相关文件，如商业计划书、财务报表、尽调报告等</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-sm text-gray-600 mb-2">拖拽文件到此处，或点击选择文件</p>
              <p className="text-xs text-gray-400">支持 PDF、Word、Excel、JSON 等格式，单个文件不超过 100MB</p>
              <Input type="file" className="hidden" multiple />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fileName">文件名称</Label>
              <Input id="fileName" placeholder="输入文件名称" />
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsProjectFileDialogOpen(false)}>
                取消
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                <Upload className="w-4 h-4 mr-2" />
                开始上传
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 项目文件查看 Dialog */}
      <Dialog open={isProjectFilesDialogOpen} onOpenChange={setIsProjectFilesDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {selectedProject && `${selectedProject.projectName} - 文件列表`}
            </DialogTitle>
            <DialogDescription>查看和管理项目相关文件</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">文件列表</h3>
              <Button
                onClick={() => {
                  setIsProjectFilesDialogOpen(false);
                  setIsProjectFileDialogOpen(true);
                }}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
              >
                <Upload className="w-4 h-4 mr-2" />
                上传文件
              </Button>
            </div>

            {selectedProject && selectedProject.files.length > 0 ? (
              <div className="space-y-3">
                {selectedProject.files.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <File className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-gray-500">{file.fileName} • {file.fileSize}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-gray-500">
                        <span>{file.uploadTime}</span>
                        <span className="mx-2">•</span>
                        <span>{file.uploader}</span>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <File className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p>该项目暂无文件</p>
                <Button
                  className="mt-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                  onClick={() => {
                    setIsProjectFilesDialogOpen(false);
                    setIsProjectFileDialogOpen(true);
                  }}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  上传文件
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">知识库管理</h1>
          <p className="text-gray-500 mt-1">
            私域知识库构建、公网知识库管理、工商数据集成、知识标签化提取
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            刷新
          </Button>
          <Button
            onClick={() => setIsUploadDialogOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
          >
            <Upload className="w-4 h-4 mr-2" />
            上传文档
          </Button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">私域文档</p>
                <p className="text-2xl font-bold text-gray-900">{mockDocuments.length}</p>
              </div>
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">向量化数据</p>
                <p className="text-2xl font-bold text-green-600">
                  {mockVectorTasks.reduce((sum, task) => sum + task.vectorCount, 0)}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">知识标签</p>
                <p className="text-2xl font-bold text-purple-600">
                  {mockDocuments.reduce((sum, doc) => sum + doc.tags.length, 0)}
                </p>
              </div>
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <Tag className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">公网知识</p>
                <p className="text-2xl font-bold text-orange-600">
                  {mockPublicKnowledge.reduce((sum, item) => sum + item.itemCount, 0).toLocaleString()}
                </p>
              </div>
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">工商数据</p>
                <p className="text-2xl font-bold text-cyan-600">{mockBusinessData.length}</p>
              </div>
              <div className="w-10 h-10 bg-cyan-50 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-cyan-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 主要内容 */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="management">知识库管理</TabsTrigger>
          <TabsTrigger value="private">私域知识库</TabsTrigger>
          <TabsTrigger value="vectorization">数据向量化</TabsTrigger>
          <TabsTrigger value="public">公网知识库</TabsTrigger>
          <TabsTrigger value="business">工商数据库</TabsTrigger>
          <TabsTrigger value="projects">已投项目档案</TabsTrigger>
        </TabsList>

        {/* 私域知识库 */}
        <TabsContent value="private" className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="搜索文档..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="文档类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部类型</SelectItem>
                  <SelectItem value="investment_intent">投资意向书</SelectItem>
                  <SelectItem value="project_report">立项报告书</SelectItem>
                  <SelectItem value="due_diligence">业务尽调报告</SelectItem>
                  <SelectItem value="investment_advice">投资建议书</SelectItem>
                  <SelectItem value="research_report">投研分析报告</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>文档名称</TableHead>
                    <TableHead>类型</TableHead>
                    <TableHead>文件信息</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>上传人</TableHead>
                    <TableHead>标签</TableHead>
                    <TableHead>上传时间</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockDocuments.map((doc) => {
                    const typeInfo = documentTypeMap[doc.type];
                    return (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium">{doc.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={typeInfo.color}>
                            <typeInfo.icon className="w-3 h-3 mr-1" />
                            {typeInfo.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="flex items-center gap-1">
                              <File className="w-3 h-3 text-gray-400" />
                              <span className="text-gray-600">{doc.fileName}</span>
                            </div>
                            <span className="text-gray-500">{doc.fileSize}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {doc.status === 'completed' ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              已向量化
                            </Badge>
                          ) : doc.status === 'vectorizing' ? (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700">
                              <Activity className="w-3 h-3 mr-1" />
                              向量化中 {doc.vectorProgress}%
                            </Badge>
                          ) : (
                            <Badge variant="outline">
                              <Clock className="w-3 h-3 mr-1" />
                              处理中
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>{doc.uploader}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1 max-w-[200px]">
                            {doc.tags.slice(0, 3).map((tag) => {
                              const categoryInfo = tagCategoryMap[tag.category];
                              return (
                                <Badge key={tag.id} variant="outline" className={`${categoryInfo.color} text-xs`}>
                                  {tag.value}
                                </Badge>
                              );
                            })}
                            {doc.tags.length > 3 && (
                              <Badge variant="outline" className="text-xs">+{doc.tags.length - 3}</Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{doc.uploadTime}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => {
                              setSelectedDocument(doc);
                              setIsTagDialogOpen(true);
                            }}>
                              <Tag className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 数据向量化 */}
        <TabsContent value="vectorization" className="mt-6">
          <div className="space-y-6">
            <div>
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>向量化任务列表</CardTitle>
                  <CardDescription>查看和管理文档向量化处理任务</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>文档名称</TableHead>
                        <TableHead>状态</TableHead>
                        <TableHead>进度</TableHead>
                        <TableHead>切片数</TableHead>
                        <TableHead>向量数</TableHead>
                        <TableHead>开始时间</TableHead>
                        <TableHead>完成时间</TableHead>
                        <TableHead>操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockVectorTasks.map((task) => (
                        <TableRow key={task.id}>
                          <TableCell className="font-medium">{task.documentName}</TableCell>
                          <TableCell>
                            {task.status === 'processing' ? (
                              <Badge className="bg-blue-50 text-blue-700">
                                <Activity className="w-3 h-3 mr-1" />
                                处理中
                              </Badge>
                            ) : (
                              <Badge className="bg-green-50 text-green-700">
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                已完成
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="w-32">
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span className="text-gray-600">{task.progress}%</span>
                              </div>
                              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className={`h-full transition-all ${task.status === 'completed' ? 'bg-green-500' : 'bg-gradient-to-r from-blue-500 to-cyan-500 animate-pulse'}`}
                                  style={{ width: `${task.progress}%` }}
                                />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{task.chunks}</TableCell>
                          <TableCell>{task.vectorCount}</TableCell>
                          <TableCell>{task.startTime}</TableCell>
                          <TableCell>{task.endTime || '-'}</TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="icon">
                                <Eye className="w-4 h-4" />
                              </Button>
                              {task.status === 'processing' && (
                                <Button variant="ghost" size="icon">
                                  <Pause className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            {/* 向量化提示 */}
            <div className="text-sm text-gray-600">
              <p>向量化流程：文档上传后自动进行清洗、切片并转换为向量数据存入数据库，支持后续语义检索和智能问答。</p>
            </div>
          </div>
        </TabsContent>

        {/* 公网知识库 */}
        <TabsContent value="public" className="mt-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>知识库名称</TableHead>
                    <TableHead>来源</TableHead>
                    <TableHead>描述</TableHead>
                    <TableHead>数据条数</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>更新时间</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPublicKnowledge.map((item) => {
                    const sourceInfo = publicKnowledgeMap[item.source];
                    return (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.title}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={sourceInfo.color}>
                            <sourceInfo.icon className="w-3 h-3 mr-1" />
                            {sourceInfo.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-md">{item.description}</TableCell>
                        <TableCell>{item.itemCount.toLocaleString()}</TableCell>
                        <TableCell>
                          {item.status === 'active' ? (
                            <Badge className="bg-green-50 text-green-700">活跃</Badge>
                          ) : item.status === 'updating' ? (
                            <Badge className="bg-blue-50 text-blue-700">更新中</Badge>
                          ) : (
                            <Badge variant="secondary">未激活</Badge>
                          )}
                        </TableCell>
                        <TableCell>{item.updateTime}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <RefreshCw className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Settings className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 工商数据库 */}
        <TabsContent value="business" className="mt-6">
          <div className="mb-4 flex items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="搜索企业..." className="pl-9 w-64" />
            </div>
          </div>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>企业名称</TableHead>
                    <TableHead>统一社会信用代码</TableHead>
                    <TableHead>法定代表人</TableHead>
                    <TableHead>注册资本</TableHead>
                    <TableHead>成立日期</TableHead>
                    <TableHead>行业</TableHead>
                    <TableHead>地区</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>更新时间</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockBusinessData.map((data) => (
                    <TableRow key={data.id}>
                      <TableCell className="font-medium">{data.companyName}</TableCell>
                      <TableCell className="font-mono text-xs">{data.creditCode}</TableCell>
                      <TableCell>{data.legalPerson}</TableCell>
                      <TableCell>{data.registeredCapital}</TableCell>
                      <TableCell>{data.establishDate}</TableCell>
                      <TableCell>{data.industry}</TableCell>
                      <TableCell>{data.region}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          {data.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{data.updateTime}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <RefreshCw className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 知识库管理 */}
        <TabsContent value="management" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* 左侧目录树 */}
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">知识库目录</CardTitle>
                  <CardDescription>按来源查看知识库</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <button
                      onClick={() => setExpandedFolder('private')}
                      className="w-full flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg text-left"
                    >
                      <div className="flex items-center gap-2">
                        {expandedFolder === 'private' ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        <FolderOpen className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium">私域知识库</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">{mockDocuments.length}</Badge>
                    </button>

                    {expandedFolder === 'private' && (
                      <div className="ml-6 space-y-1">
                        <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
                          <Folder className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">投资意向书</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
                          <Folder className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">立项报告书</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
                          <Folder className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">业务尽调报告</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
                          <MessageSquare className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">对话报告</span>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => setExpandedFolder('public')}
                      className="w-full flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg text-left"
                    >
                      <div className="flex items-center gap-2">
                        {expandedFolder === 'public' ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        <Globe className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium">公网知识库</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">{mockPublicKnowledge.length}</Badge>
                    </button>

                    {expandedFolder === 'public' && (
                      <div className="ml-6 space-y-1">
                        {mockPublicKnowledge.map((item) => {
                          const sourceInfo = publicKnowledgeMap[item.source];
                          return (
                            <div key={item.id} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
                              <sourceInfo.icon className="w-4 h-4 text-gray-500" />
                              <span className="text-sm">{sourceInfo.label}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    <button className="w-full flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg text-left">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-cyan-600" />
                        <span className="text-sm font-medium">工商数据库</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">{mockBusinessData.length}</Badge>
                    </button>

                    <button className="w-full flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg text-left">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium">已投项目档案</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">{projects.length}</Badge>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 右侧内容 */}
            <div className="lg:col-span-3">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>知识检索</CardTitle>
                      <CardDescription>多维度筛选和检索知识库内容</CardDescription>
                    </div>
                    <Button variant="outline">
                      <Filter className="w-4 h-4 mr-2" />
                      筛选
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="搜索知识库内容，支持语义检索..."
                      className="pl-9"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Badge variant="outline" className="gap-1 cursor-pointer hover:bg-gray-100">
                        地域 <XCircle className="w-3 h-3" />
                      </Badge>
                      <Badge variant="outline" className="gap-1 cursor-pointer hover:bg-gray-100">
                        行业 <XCircle className="w-3 h-3" />
                      </Badge>
                      <Badge variant="outline" className="gap-1 cursor-pointer hover:bg-gray-100">
                        融资阶段 <XCircle className="w-3 h-3" />
                      </Badge>
                      <Badge variant="outline" className="gap-1 cursor-pointer hover:bg-gray-100">
                        年份 <XCircle className="w-3 h-3" />
                      </Badge>
                    </div>

                    <div className="text-center py-8 text-gray-500">
                      <Search className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                      <p>输入关键词开始检索知识库</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* 已投项目档案 */}
        <TabsContent value="projects" className="mt-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="搜索项目..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-64"
              />
            </div>
            <Button
              onClick={() => setIsProjectDialogOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              新增档案
            </Button>
          </div>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>项目名称</TableHead>
                    <TableHead>企业名称</TableHead>
                    <TableHead>投资金额</TableHead>
                    <TableHead>股权比例</TableHead>
                    <TableHead>投资日期</TableHead>
                    <TableHead>融资阶段</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>文档数</TableHead>
                    <TableHead>标签</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">{project.projectName}</TableCell>
                      <TableCell>{project.companyName}</TableCell>
                      <TableCell>{project.investmentAmount}</TableCell>
                      <TableCell>{project.equityRatio}</TableCell>
                      <TableCell>{project.investmentDate}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{project.fundingStage}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={project.status === 'invested' ? 'bg-green-50 text-green-700' : project.status === 'exited' ? 'bg-blue-50 text-blue-700' : 'bg-yellow-50 text-yellow-700'}>
                          {project.status === 'invested' ? '已投' : project.status === 'exited' ? '已退出' : '监控中'}
                        </Badge>
                      </TableCell>
                      <TableCell>{project.documents}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1 max-w-[150px]">
                          {project.tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {project.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs">+{project.tags.length - 2}</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => {
                              setSelectedProject(project);
                              setIsProjectFilesDialogOpen(true);
                            }}
                          >
                            <FileText className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const DollarSign = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const Save = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);
