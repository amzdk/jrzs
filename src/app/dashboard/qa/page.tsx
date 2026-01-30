'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
  Send,
  Sparkles,
  FileText,
  TrendingUp,
  BarChart3,
  DollarSign,
  Building2,
  AlertCircle,
  Lightbulb,
  Clock,
  Bot,
  User,
  Copy,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  Zap,
  Globe,
  MoreVertical,
  Paperclip,
  Cpu,
  BrainCircuit,
  AlertTriangle,
  ScrollText,
  Eye,
  Download,
  Edit
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const suggestedQuestions = [
  '2024年人工智能行业市场规模是多少？',
  '最近一个月有哪些企业完成了融资？',
  '新能源汽车行业的最新政策有哪些？',
  '智谱华章公司的基本信息是什么？',
];

const skills = [
  { id: 'industry-brief', name: '行业视角简报', icon: FileText },
  { id: 'business-negative', name: '工商负面跟踪', icon: AlertTriangle },
  { id: 'internet-sentiment', name: '互联网舆情跟踪', icon: BarChart3 },
  { id: 'industry-intelligence', name: '行业情报聚合', icon: TrendingUp },
  { id: 'policy-risk', name: '政策风险跟踪', icon: ScrollText },
];

export default function QAPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: '您好！我是AI投研精灵，可以帮助您进行投研相关的智能问答。您可以询问行业分析、企业信息、融资情况、政策解读等内容。试试点击下方推荐问题，或者直接输入您的问题。',
      timestamp: new Date(),
    },
    {
      id: '2',
      type: 'user',
      content: '@行业视角简报 帮我整理机器人行业简报',
      timestamp: new Date(),
    },
    {
      id: '3',
      type: 'assistant',
      content: '根据最新数据，为您整理了机器人行业简报：',
      timestamp: new Date(),
    },
    {
      id: '4',
      type: 'assistant',
      content: JSON.stringify({
        type: 'industryReport',
        data: {
          title: '机器人行业简报',
          date: '2024-01-22',
          summary: '机器人行业持续快速发展，市场规模突破1500亿元，同比增长23.5%。工业机器人、服务机器人和特种机器人三大领域均呈现良好发展态势。',
          market: {
            size: '1523亿元',
            growth: '23.5%',
            segments: [
              { name: '工业机器人', share: '58%', growth: '18.2%' },
              { name: '服务机器人', share: '25%', growth: '32.7%' },
              { name: '特种机器人', share: '17%', growth: '27.3%' }
            ]
          },
          keyCompanies: [
            { name: '大疆创新', focus: '消费级无人机', marketShare: '70%' },
            { name: '埃斯顿', focus: '工业机器人', marketShare: '12%' },
            { name: '科沃斯', focus: '家用服务机器人', marketShare: '45%' },
            { name: '石头科技', focus: '智能清洁机器人', marketShare: '30%' }
          ],
          trends: [
            'AI技术融合加速，智能机器人成为主流',
            '人形机器人研发取得重大突破',
            '行业应用场景不断拓展',
            '国产化率持续提升，核心零部件自主可控'  
          ],
          challenges: [
            '核心技术研发投入大，周期长',
            '高端人才短缺',
            '行业标准有待完善',
            '市场竞争加剧'
          ],
          opportunities: [
            '制造业升级带来工业机器人需求增长',
            '老龄化社会催生服务机器人市场',
            '特种作业领域需求持续释放',
            '智能网联赋能机器人新功能'
          ]
        }
      }),
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedModel, setSelectedModel] = useState('doubao-pro');
  const [selectedKnowledge, setSelectedKnowledge] = useState('all');
  const [enableWebSearch, setEnableWebSearch] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `根据最新数据，关于"${userMessage.content}"的分析如下：

📊 市场数据
- 市场规模：2800亿元
- 同比增长：35.6%
- 企业数量：1,234家

💰 融资情况
- 本月融资事件：12起
- 融资总额：58.6亿元
- 平均估值：18.5亿元

📈 趋势预测
- 未来三年预计保持30%以上的年增长率
- AI大模型应用落地加速
- 行业整合趋势明显

建议关注头部企业和技术创新型企业。

---
${enableWebSearch ? '🌐 已启用联网搜索，数据来源于实时网络' : ''}
📚 知识库：${selectedKnowledge === 'all' ? '全部知识库' : selectedKnowledge}
🤖 模型：${selectedModel}`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleNewConversation = () => {
    setMessages([
      {
        id: Date.now().toString(),
        type: 'assistant',
        content: '您好！我是AI投研精灵，可以帮助您进行投研相关的智能问答。您可以询问行业分析、企业信息、融资情况、政策解读等内容。试试点击下方推荐问题，或者直接输入您的问题。',
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">AI 投研精灵</h1>
          <p className="text-gray-500 mt-1">
            智能问答助手，快速获取投研信息、行业分析、企业数据
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <Zap className="w-3 h-3" />
            在线
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        {/* 对话区域 */}
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-sm h-[calc(100vh-200px)] flex flex-col">
            <CardHeader className="flex-shrink-0 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">AI投研精灵</CardTitle>
                    <p className="text-xs text-gray-500">基于大语言模型，提供投研咨询服务</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={handleNewConversation}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  新对话
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex-1 p-0 overflow-hidden">
              <ScrollArea ref={scrollAreaRef} className="h-full p-4">
                <div className="space-y-4">
                  {messages.map((message) => {
                    // 检查是否为行业报告类型消息
                    let isIndustryReport = false;
                    let reportData = null;
                    
                    if (message.type === 'assistant') {
                      try {
                        const parsedContent = JSON.parse(message.content);
                        if (parsedContent.type === 'industryReport') {
                          isIndustryReport = true;
                          reportData = parsedContent.data;
                        }
                      } catch (e) {
                        // 不是JSON格式，正常显示
                      }
                    }
                    
                    return (
                      <div
                        key={message.id}
                        className={`flex items-start gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {message.type === 'assistant' && (
                          <Avatar className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-600 flex-shrink-0">
                            <AvatarFallback>
                              <Bot className="w-4 h-4 text-white" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        
                        {isIndustryReport && reportData ? (
                          // 行业报告卡片
                          <div className="max-w-[80%] rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden">
                            {/* 报告头部 */}
                            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4">
                              <h3 className="text-lg font-bold">{reportData.title}</h3>
                              <p className="text-sm opacity-90">{reportData.date}</p>
                            </div>
                            
                            {/* 报告内容 */}
                            <div className="p-4">
                              {/* 摘要 */}
                              <div className="mb-4">
                                <h4 className="font-medium text-gray-900 mb-2">摘要</h4>
                                <p className="text-sm text-gray-700">{reportData.summary}</p>
                              </div>
                              
                              {/* 市场数据 */}
                              <div className="mb-4">
                                <h4 className="font-medium text-gray-900 mb-2">市场数据</h4>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <div className="bg-gray-50 p-2 rounded">
                                    <span className="text-gray-500">市场规模:</span>
                                    <span className="font-medium ml-1">{reportData.market.size}</span>
                                  </div>
                                  <div className="bg-gray-50 p-2 rounded">
                                    <span className="text-gray-500">同比增长:</span>
                                    <span className="font-medium ml-1 text-green-600">{reportData.market.growth}</span>
                                  </div>
                                </div>
                                
                                {/* 细分市场 */}
                                <div className="mt-3">
                                  <h5 className="text-xs font-medium text-gray-600 mb-2">细分市场占比</h5>
                                  <div className="space-y-1">
                                    {reportData.market.segments.map((segment: any, index: number) => (
                                      <div key={index} className="flex items-center justify-between text-sm">
                                        <span>{segment.name}</span>
                                        <div className="flex items-center gap-2">
                                          <span className="font-medium">{segment.share}</span>
                                          <span className="text-xs text-green-600">↑{segment.growth}</span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              
                              {/* 重点企业 */}
                              <div className="mb-4">
                                <h4 className="font-medium text-gray-900 mb-2">重点企业</h4>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  {reportData.keyCompanies.map((company: any, index: number) => (
                                    <div key={index} className="bg-gray-50 p-2 rounded">
                                      <p className="font-medium">{company.name}</p>
                                      <p className="text-xs text-gray-600">{company.focus}</p>
                                      <p className="text-xs text-gray-600">市场份额: {company.marketShare}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              {/* 趋势与挑战 */}
                              <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                  <h4 className="font-medium text-gray-900 mb-2">发展趋势</h4>
                                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                    {reportData.trends.map((trend: string, index: number) => (
                                      <li key={index}>{trend}</li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <h4 className="font-medium text-gray-900 mb-2">面临挑战</h4>
                                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                    {reportData.challenges.map((challenge: string, index: number) => (
                                      <li key={index}>{challenge}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                              
                              {/* 发展机遇 */}
                              <div className="mb-4">
                                <h4 className="font-medium text-gray-900 mb-2">发展机遇</h4>
                                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                  {reportData.opportunities.map((opportunity: string, index: number) => (
                                    <li key={index}>{opportunity}</li>
                                  ))}
                                </ul>
                              </div>
                              
                              {/* 操作按钮 */}
                              <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                                <Button variant="outline" size="sm" className="flex-1">
                                  <Eye className="w-3 h-3 mr-1" />
                                  查看报告
                                </Button>
                                <Button variant="outline" size="sm" className="flex-1">
                                  <Download className="w-3 h-3 mr-1" />
                                  下载报告
                                </Button>
                                <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                                  <Edit className="w-3 h-3 mr-1" />
                                  修改后下载
                                </Button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          // 普通消息
                          <div
                            className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                              message.type === 'user'
                                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}
                          >
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            {message.type === 'assistant' && (
                              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-200">
                                <Button variant="ghost" size="sm" className="h-6 text-xs">
                                  <Copy className="w-3 h-3 mr-1" />
                                  复制
                                </Button>
                                <Button variant="ghost" size="sm" className="h-6 text-xs">
                                  <ThumbsUp className="w-3 h-3 mr-1" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-6 text-xs">
                                  <ThumbsDown className="w-3 h-3 mr-1" />
                                </Button>
                              </div>
                            )}
                          </div>
                        )}
                        
                        {message.type === 'user' && (
                          <Avatar className="w-8 h-8 bg-gray-600 flex-shrink-0">
                            <AvatarFallback>
                              <User className="w-4 h-4 text-white" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    );
                  })}
                  {isTyping && (
                    <div className="flex items-start gap-3 justify-start">
                      <Avatar className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-600">
                        <AvatarFallback>
                          <Bot className="w-4 h-4 text-white" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-gray-100 rounded-2xl px-4 py-3">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>

            <div className="flex-shrink-0 border-t p-4 space-y-3">
              {/* 推荐问题 */}
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInputValue(question);
                      inputRef.current?.focus();
                    }}
                    className="text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 transition-colors flex items-center gap-2"
                  >
                    <Lightbulb className="w-3 h-3 text-yellow-600 flex-shrink-0" />
                    <span className="line-clamp-1">{question}</span>
                  </button>
                ))}
              </div>

              {/* 融合式对话框 */}
              <div className="border rounded-2xl p-4 bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
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
                
                {/* 输入框 */}
                <textarea
                  ref={inputRef as any}
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
                        <SelectItem value="doubao-pro">豆包Pro</SelectItem>
                        <SelectItem value="doubao-lite">豆包Lite</SelectItem>
                        <SelectItem value="deepseek">DeepSeek</SelectItem>
                        <SelectItem value="kimi">Kimi</SelectItem>
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
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isTyping}
                    size="icon"
                    className="h-10 w-10 rounded-full bg-gray-400 hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4 text-white" />
                  </Button>
                </div>
              </div>
              <p className="text-xs text-gray-400 text-center">
                AI投研精灵基于大语言模型，回答仅供参考，建议结合专业判断
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
